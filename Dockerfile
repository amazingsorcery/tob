# syntax=docker/dockerfile:1.7
#
# Multi-stage build for the Next.js 15 App Router site.
#
#   base    -> pinned Node 22 + corepack-managed pnpm, shared by every stage
#   deps    -> node_modules only (the expensive, rarely-invalidated layer)
#   builder -> `pnpm build` producing .next/standalone
#   runner  -> the only image that ships: slim, non-root, production files only
#
# Build:
#   docker build --target runner -t tob-web:current .
#
# ONE image ships. There is no `migrator` stage any more, and its absence is the point:
# this site has no database, no migrations and no seed. The stage existed to run
# `tsx db/migrate.ts` with devDependencies present; there is no db/ directory to run.
# Likewise there is no `worker` stage and never was one that worked.
#
# NO SECRETS ARE ACCEPTED OR BAKED IN. There is no ARG or ENV here that carries a
# credential, and none is needed: the build reads only files in this repository. The
# application itself reads no environment variable at run time either — the only
# configuration in the whole deployment is Caddy's DOMAIN and ACME_EMAIL. If a future build
# step ever needs a token, use a BuildKit secret mount (`RUN --mount=type=secret,id=...`)
# and never an ARG — ARG values are visible in `docker history`.

# ---------------------------------------------------------------------------------------
# base
# ---------------------------------------------------------------------------------------
# bookworm-slim rather than alpine: glibc avoids a class of musl-only bugs in native
# modules (esbuild via tsx today, sharp if it is ever added). ~40 MB larger and worth it
# for something that must run unattended for months.
#
# PINNING: this is pinned to the major line only. Pin a digest before you consider the
# deployment stable — see docs/deploy/RUNBOOK.md, "Pinning the base image".
FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    # Corepack must not stop a non-interactive build to ask about downloading pnpm.
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    # Shared and world-readable. `corepack prepare` runs as root, but the runner stage
    # switches to USER node, whose home is /home/node — a cache under /root is unreadable
    # to it and corepack then silently falls back to downloading pnpm at run time.
    COREPACK_HOME=/usr/local/corepack \
    NEXT_TELEMETRY_DISABLED=1

# corepack ships with Node 22. `corepack enable` installs the `pnpm` shim; the shim reads
# the "packageManager" field in package.json and materialises exactly that version, so the
# image and CI cannot drift from the lockfile's producer.
#
# `corepack prepare --activate` bakes the pnpm tarball into the image at BUILD time, when
# the network is known to be available. Without it the shim downloads pnpm on FIRST USE,
# at run time, which is the wrong moment to depend on npm being reachable.
RUN corepack enable \
    && corepack prepare pnpm@11.1.3 --activate \
    && chmod -R a+rX /usr/local/corepack

WORKDIR /app


# ---------------------------------------------------------------------------------------
# deps — the cache-critical stage
# ---------------------------------------------------------------------------------------
# Only the manifests are copied here, so editing a chapter or a component does NOT
# invalidate this layer and a content-only deploy skips the install entirely.
FROM base AS deps

# pnpm-workspace.yaml is copied because pnpm reads it at install time (it carries the
# build-script allowlist).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# --frozen-lockfile: fail the build rather than silently resolve a different tree.
# Dev dependencies ARE installed: the build needs typescript, tailwind and tsx. None of
# this reaches the runner stage, which copies only .next/standalone's pruned tree.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile


# ---------------------------------------------------------------------------------------
# builder
# ---------------------------------------------------------------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NODE_ENV=production gives production React, minification and the production Tailwind
# pass. It does not prune node_modules (that already happened above).
ENV NODE_ENV=production

# `pnpm build` is `tsx scripts/copy-katex-assets.ts && next build`. The first half matters
# here: `public/katex/` is GENERATED and gitignored, and every work that carries
# mathematics links `/katex/katex.min.css`. A build that skipped it would succeed, ship,
# and serve a 404 for that stylesheet — every equation on the site rendering as
# unpositioned glyphs, with no error anywhere. `tsx` is a devDependency and is present
# because the deps stage installs the full tree. The guard below asserts the result rather
# than trusting the script name to stay the same.
RUN pnpm build

# ---- Build output guards ---------------------------------------------------------------
# Three assertions, each covering a failure that otherwise ships as a broken site rather
# than a failed build.
#
# 1. .next/standalone exists. `next build` only emits it when next.config.ts sets
#    `output: "standalone"`. Without that setting the build "succeeds", the runner stage
#    copies nothing, and the container dies at start with an opaque MODULE_NOT_FOUND.
# 2. server.js is at the TOP of .next/standalone. Next places it at the workspace-root
#    relative path; a repo that Next decides is a monorepo (pnpm-workspace.yaml above the
#    app) nests it under a subdirectory instead. This repo is flat, so assert the flat
#    layout rather than assume it.
# 3. The KaTeX stylesheet is present. It is generated by the first half of `pnpm build`
#    and is not in the repository, so "the image has it" is a fact worth asserting rather
#    than assuming — its absence is invisible until a reader opens a chapter.
RUN set -eu; \
    if [ ! -d .next/standalone ]; then \
      echo "FATAL: .next/standalone was not produced."; \
      echo "       next.config.ts must set: output: \"standalone\""; \
      exit 1; \
    fi; \
    if [ ! -f .next/standalone/server.js ]; then \
      echo "FATAL: .next/standalone/server.js is missing. Next.js nested the standalone"; \
      echo "       output under a workspace subpath. Found instead:"; \
      find .next/standalone -maxdepth 3 -name server.js -print; \
      echo "       Fix the COPY paths in the runner stage, or set outputFileTracingRoot."; \
      exit 1; \
    fi; \
    if [ ! -f public/katex/katex.min.css ]; then \
      echo "FATAL: public/katex/katex.min.css is missing."; \
      echo "       scripts/copy-katex-assets.ts did not run or did not produce it."; \
      echo "       Every equation on the site depends on this stylesheet."; \
      exit 1; \
    fi; \
    echo "OK: standalone entrypoint present; katex $(cat public/katex/VERSION) assets present"


# ---------------------------------------------------------------------------------------
# runner — the only image that ships
# ---------------------------------------------------------------------------------------
FROM base AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    # The standalone server binds to localhost by default, which is unreachable from the
    # Caddy container. 0.0.0.0 is safe here precisely because docker-compose.prod.yml
    # publishes no port for this service — only Caddy is reachable from the internet.
    HOSTNAME=0.0.0.0

# The official node images already provide an unprivileged `node` user (uid/gid 1000).
# Reusing it is one less thing to get wrong than minting one, and it owns nothing outside
# /app.
WORKDIR /app

# --- Standalone output layout, and why each path is what it is -------------------------
#
#   .next/standalone/  -> server.js + a pruned node_modules + package.json. The whole
#                         server. Copy it to /app.
#   .next/static/      -> hashed JS/CSS chunks and the self-hosted next/font woff2 files.
#                         The tracer EXCLUDES these from standalone because they are meant
#                         to come from a CDN. There is no CDN here, so they must land at
#                         /app/.next/static — inside the .next directory that came from
#                         standalone. Getting this wrong yields a page that renders HTML
#                         and then 404s every chunk and every font.
#   public/            -> also excluded from standalone for the same reason, and also
#                         served by server.js. Carries /katex/katex.min.css and its fonts.
#
# Order matters: standalone first (it creates /app/.next), then static into it.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# Next writes to .next/cache at run time even when every route is prerendered (it keeps an
# in-memory-backed fetch cache directory). Without a writable directory owned by the
# runtime user the server logs a permission error on every write.
RUN mkdir -p .next/cache && chown -R node:node .next/cache

USER node

EXPOSE 3000

# THE FRONT PAGE IS THE HEALTH CHECK. There is no /api/health on this site and there must
# not be: every route is prerendered at build time, so an endpoint that reports "healthy"
# would be reporting on nothing but the Node process — which is exactly what a 200 from /
# already proves, without shipping a route that exists only for monitoring.
#
# `node -e` rather than curl/wget: bookworm-slim ships neither, and Node 22 has global
# fetch, so this adds no packages and no attack surface.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
