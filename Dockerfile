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
# No secrets are needed or baked in. If a build step ever needs one, use a BuildKit secret
# mount (`RUN --mount=type=secret,id=...`), not an ARG (visible in `docker history`).

# ---------------------------------------------------------------------------------------
# base
# ---------------------------------------------------------------------------------------
# bookworm-slim, not alpine: glibc avoids musl-only bugs in native modules (esbuild).
# Pinned to the major line only; pin a digest for a stable deployment.
FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    # Outside /root so the `node` user in the runner can read it; otherwise corepack
    # re-downloads pnpm at run time.
    COREPACK_HOME=/usr/local/corepack \
    NEXT_TELEMETRY_DISABLED=1

# Install the pnpm shim and bake pnpm into the image at build time rather than on first use.
RUN corepack enable \
    && corepack prepare pnpm@11.1.3 --activate \
    && chmod -R a+rX /usr/local/corepack

WORKDIR /app


# ---------------------------------------------------------------------------------------
# deps — the cache-critical stage
# ---------------------------------------------------------------------------------------
# Manifests only, so content and code changes don't invalidate the install layer.
FROM base AS deps

# pnpm-workspace.yaml carries the build-script allowlist.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Dev deps are needed for the build; the runner only gets the pruned standalone tree.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile


# ---------------------------------------------------------------------------------------
# builder
# ---------------------------------------------------------------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# `pnpm build` runs scripts/copy-katex-assets.ts (generates the gitignored public/katex/)
# and then `next build`.
RUN pnpm build

# ---- Build output guards ---------------------------------------------------------------
# Fail the build instead of shipping a broken site:
# 1. .next/standalone exists (needs `output: "standalone"` in next.config.ts).
# 2. server.js is at its top level (Next nests it if it thinks this is a monorepo).
# 3. The generated KaTeX stylesheet exists.
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
    # Bind all interfaces so Caddy can reach it; compose publishes no port for this service.
    HOSTNAME=0.0.0.0

# Runs as the image's built-in unprivileged `node` user (see USER below).
WORKDIR /app

# Standalone excludes .next/static and public/ (meant for a CDN), so copy them in.
# Standalone first, since it creates /app/.next.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# Next writes to .next/cache at run time even with every route prerendered.
RUN mkdir -p .next/cache && chown -R node:node .next/cache

USER node

EXPOSE 3000

# Health check is a 200 on /. Uses Node's fetch since the slim image has no curl/wget.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
