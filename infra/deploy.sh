#!/usr/bin/env bash
#
# deploy.sh — build, start, verify, and roll back on failure.
#
#   ./infra/deploy.sh              normal deploy
#   ./infra/deploy.sh --no-pull    deploy the working tree exactly as it is
#
# TWO CONTAINERS: web and caddy. There is no database, so there is nothing to back up,
# nothing to migrate and nothing to wait for before the app can start. The steps that
# existed for those are gone, and so are the flags that governed them: --skip-backup and
# --allow-degraded-worker are named errors below rather than silent no-ops, because
# somebody's shell history still has them.
#
# Design contract:
#   * IDEMPOTENT. Running it twice in a row is a no-op deploy that ends healthy. Every step
#     is either naturally repeatable (docker build, compose up) or explicitly guarded
#     (image retagging).
#   * SAFE AFTER A PARTIAL FAILURE. A run that died between "build" and "start" leaves
#     images and containers in a state the next run can reason about: nothing is deleted,
#     the previous image tag moves only when there is genuinely a new image to replace it,
#     and a lock stops two runs interleaving.
#   * LOUD. Every step prints a UTC timestamp and what it did, so the output is a usable
#     post-mortem. Keep it:  ./infra/deploy.sh 2>&1 | tee -a /var/log/deploy.log
#
# ROLLBACK IS COMPLETE HERE, which was not true of the old stack. The only state on this
# box is Caddy's certificate store; the site itself is a pure function of the source tree.
# Restoring the previous image restores the previous site exactly, with no schema left
# ahead of it and no dump to replay.

set -euo pipefail

# --- Locations -------------------------------------------------------------------------
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_DIR}"

COMPOSE_FILE="${REPO_DIR}/docker-compose.prod.yml"
ENV_FILE="${REPO_DIR}/.env"

# --- Options ---------------------------------------------------------------------------
DO_PULL=1
for arg in "$@"; do
	case "${arg}" in
	--no-pull) DO_PULL=0 ;;
	--skip-backup)
		echo "--skip-backup was removed with the database. There is no backup step: this site stores nothing. Drop the flag and re-run." >&2
		exit 2
		;;
	--allow-degraded-worker)
		echo "--allow-degraded-worker was removed with the worker container. There is no worker to degrade; drop the flag and re-run." >&2
		exit 2
		;;
	-h | --help)
		sed -n '2,10p' "${BASH_SOURCE[0]}"
		exit 0
		;;
	*)
		echo "Unknown option: ${arg}" >&2
		exit 2
		;;
	esac
done

# --- Logging ---------------------------------------------------------------------------
log() { printf '%s  %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"; }
step() { printf '\n%s  ==> %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"; }
warn() { printf '%s  WARN %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*" >&2; }
die() {
	printf '%s  FATAL %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*" >&2
	exit 1
}

# --- Single-instance lock ---------------------------------------------------------------
# Two concurrent deploys would race on the :previous tag and could leave the rollback
# pointing at the image that is already broken. `flock -n` fails immediately rather than
# queueing: a queued deploy of an older tree is worse than no deploy.
LOCK_FILE="/tmp/deploy.$(basename "${REPO_DIR}").lock"
exec 9>"${LOCK_FILE}"
if ! flock -n 9; then
	die "Another deploy is already running (lock: ${LOCK_FILE}). Wait for it, or look: ps -ef | grep deploy.sh"
fi

# =======================================================================================
# 1. Preflight — everything that can refuse before anything changes
# =======================================================================================
step "Preflight"

command -v docker >/dev/null 2>&1 || die "docker is not installed or not on PATH."
docker compose version >/dev/null 2>&1 ||
	die "The docker compose plugin is missing. Install docker-compose-plugin (RUNBOOK, 'What is on the box')."
docker info >/dev/null 2>&1 ||
	die "Cannot talk to the Docker daemon. Either it is not running (sudo systemctl start docker) or this user is not in the docker group (newgrp docker)."
log "docker: $(docker --version)"
log "compose: $(docker compose version --short)"

[ -f "${COMPOSE_FILE}" ] || die "Missing ${COMPOSE_FILE}"
[ -f "${ENV_FILE}" ] || die "Missing ${ENV_FILE}. Copy .env.example to .env and fill in DOMAIN and ACME_EMAIL."

# .env must be shell-sourceable, because it is sourced below. Command substitution in a
# value would execute as this user during the deploy, so refuse it outright rather than
# discover it the interesting way. Comment lines are stripped first: .env.example documents
# commands in prose and would otherwise reject its own documentation.
if grep -vE '^[[:space:]]*(#|$)' "${ENV_FILE}" | grep -Eq '(\$\(|`)'; then
	die ".env has command substitution (\$( or a backtick) in a value. Remove it — .env must be literal values only."
fi

# Nothing in .env is confidential today, but it is the file that decides which hostname
# this box answers for, so it stays owner-only.
ENV_PERMS="$(stat -c '%a' "${ENV_FILE}")"
if [ "${ENV_PERMS}" != "600" ] && [ "${ENV_PERMS}" != "400" ]; then
	warn ".env is mode ${ENV_PERMS}. Fixing to 600."
	chmod 600 "${ENV_FILE}"
fi

set -a
# shellcheck disable=SC1090  # path is computed, and the file is validated above.
. "${ENV_FILE}"
set +a

# Two required variables, checked by name so the error says which one rather than compose
# failing later with a substitution error.
for var in DOMAIN ACME_EMAIL; do
	if [ -z "${!var:-}" ]; then
		die "Required variable ${var} is empty in .env. See .env.example."
	fi
	case "${!var}" in
	*CHANGEME* | *REPLACE_ME* | *example.invalid*)
		die "${var} still holds the placeholder value from .env.example (${!var}). Set a real value."
		;;
	esac
done
log "Environment: DOMAIN=${DOMAIN}"

# A .env carried over from the previous deployment of this box will still carry database,
# auth and SMTP variables. Nothing reads them — the application reads no environment at
# all — so this is a warning and not a refusal. Deleting the lines is safe and tidy.
for stale_var in DATABASE_URL POSTGRES_PASSWORD POSTGRES_USER POSTGRES_DB AUTH_SECRET \
	AUTH_GITHUB_ID SMTP_HOST REDIS_URL RATE_LIMIT_SECRET ADMIN_EMAILS APP_URL; do
	if [ -n "${!stale_var:-}" ]; then
		warn "${stale_var} is set in .env and nothing reads it. This site has no database, no auth and no API. The line is safe to delete."
	fi
done

IMAGE_NAME="${IMAGE_NAME:-app-web}"
IMAGE_TAG="${IMAGE_TAG:-current}"
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-120}" # seconds to wait for a 200 on / after start
COMPOSE=(docker compose -f "${COMPOSE_FILE}")

# Disk. A build needs room for the pnpm store, node_modules, the .next output and two
# copies of the image. Running out mid-build leaves dangling layers and a confusing error.
AVAIL_KB="$(df -Pk "${REPO_DIR}" | awk 'NR==2 {print $4}')"
AVAIL_GB=$((AVAIL_KB / 1024 / 1024))
log "Free disk on $(df -Ph "${REPO_DIR}" | awk 'NR==2 {print $6}'): ${AVAIL_GB} GB"
if [ "${AVAIL_GB}" -lt 3 ]; then
	die "Only ${AVAIL_GB} GB free. A build needs ~3 GB of headroom. Reclaim space first: docker system prune -af --filter 'until=168h'"
fi

# Memory. `next build` is the largest single consumer on this box: it renders 39 pages,
# every mathematics chapter through KaTeX, in one Node process. Measured peak on this
# corpus is well under 2 GB, but a box with under 1 GB available and no swap will
# OOM-kill it (exit 137) and the error message will not say so.
MEM_AVAIL_MB="$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)"
SWAP_MB="$(awk '/SwapTotal/ {print int($2/1024)}' /proc/meminfo)"
log "Memory: ${MEM_AVAIL_MB} MB available, ${SWAP_MB} MB swap"
if [ "${MEM_AVAIL_MB}" -lt 1024 ] && [ "${SWAP_MB}" -lt 512 ]; then
	warn "Under 1 GB available and no meaningful swap. 'next build' may be OOM-killed (exit 137)."
	warn "See docs/deploy/RUNBOOK.md, 'The build was killed'."
fi

# Validate the compose file against the loaded environment before anything mutates state.
"${COMPOSE[@]}" config --quiet ||
	die "docker-compose.prod.yml failed validation with the current .env. Nothing has been changed."
log "Compose configuration validates."

# =======================================================================================
# 2. Record the rollback point
# =======================================================================================
# Done BEFORE the build, so the recorded image is genuinely the one that was serving
# traffic. Retagging is idempotent: re-running on an unchanged deployment points :previous
# at the same image again.
step "Recording the rollback point"

ROLLBACK_AVAILABLE=0
WEB_CID="$("${COMPOSE[@]}" ps -q web 2>/dev/null || true)"
if [ -n "${WEB_CID}" ]; then
	PREV_IMAGE_ID="$(docker inspect --format '{{.Image}}' "${WEB_CID}")"
	docker image tag "${PREV_IMAGE_ID}" "${IMAGE_NAME}:previous"
	ROLLBACK_AVAILABLE=1
	log "Running image ${PREV_IMAGE_ID} tagged ${IMAGE_NAME}:previous"
elif docker image inspect "${IMAGE_NAME}:previous" >/dev/null 2>&1; then
	# web is not running (first deploy, or a previous deploy left it down) but a rollback
	# tag survives from an earlier run. Keep it.
	ROLLBACK_AVAILABLE=1
	log "web is not running; keeping the existing ${IMAGE_NAME}:previous as the rollback point."
else
	log "No previously running image. This looks like a first deploy — rollback will not be available."
fi

GIT_BEFORE="$(git -C "${REPO_DIR}" rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
log "Source at: ${GIT_BEFORE}"

# =======================================================================================
# 3. Update the source
# =======================================================================================
# THREE WAYS THE CODE GETS HERE, and all three end in the same place: a tree at ${REPO_DIR}
# that the build reads.
#
#   1. --no-pull            take the tree exactly as it is. Use after a manual fix.
#   2. No .git, or a .git with no `origin`  — which is the case on this box, because the
#      repository has no remote. The tree is delivered from a workstation with
#          tar -czf - --exclude=node_modules --exclude=.next --exclude=.git . \
#            | ssh deploy@<host> 'tar -xzf - -C /opt/app'
#      and this script simply deploys what it finds. It says so rather than failing on a
#      `git pull` that could never work.
#   3. A real remote        git pull --ff-only, refusing on a dirty tree.
if [ "${DO_PULL}" -eq 0 ]; then
	step "Skipping source update (--no-pull)"
elif [ ! -d "${REPO_DIR}/.git" ]; then
	step "Source update"
	log "No .git here — deploying the tree as it stands. (Delivered by tar over ssh; see the RUNBOOK, 'Updating the site'.)"
elif ! git -C "${REPO_DIR}" remote get-url origin >/dev/null 2>&1; then
	step "Source update"
	log "A git checkout with no 'origin' remote — deploying the tree as it stands. Nothing to pull from."
else
	step "Pulling source"
	if [ -n "$(git -C "${REPO_DIR}" status --porcelain)" ]; then
		git -C "${REPO_DIR}" status --short >&2
		die "The working tree has uncommitted changes (above). Commit, stash, or run with --no-pull."
	fi
	BRANCH="$(git -C "${REPO_DIR}" rev-parse --abbrev-ref HEAD)"
	# --ff-only: refuse to create a merge commit on the server. If this fails, the server
	# has diverged from origin and a human needs to look, not a script.
	git -C "${REPO_DIR}" pull --ff-only origin "${BRANCH}"
	GIT_AFTER="$(git -C "${REPO_DIR}" rev-parse --short HEAD)"
	if [ "${GIT_BEFORE}" = "${GIT_AFTER}" ]; then
		log "Already up to date at ${GIT_AFTER}."
	else
		log "Updated ${GIT_BEFORE} -> ${GIT_AFTER} on ${BRANCH}."
	fi
fi

# =======================================================================================
# 4. Build
# =======================================================================================
step "Building the image"
# One target. The build is where a broken chapter, a failed typecheck of the renderer or a
# missing KaTeX asset stops the deploy — the Dockerfile asserts all three — and it happens
# before anything running is touched.
"${COMPOSE[@]}" build web
log "Build complete: ${IMAGE_NAME}:${IMAGE_TAG}"

# From here on, a failure must put the previous image back.
rollback() {
	local stage="$1"
	printf '\n'
	warn "=============================================================="
	warn "DEPLOY FAILED during: ${stage}"
	warn "=============================================================="
	if [ "${ROLLBACK_AVAILABLE}" -eq 1 ]; then
		warn "Rolling back to ${IMAGE_NAME}:previous"
		docker image tag "${IMAGE_NAME}:previous" "${IMAGE_NAME}:${IMAGE_TAG}"
		# --no-build so compose uses the retagged image instead of rebuilding the broken
		# source. --force-recreate so it does not decide the container is already correct.
		# caddy is recreated alongside web because it holds connections to the container it
		# dialled; leaving it pointed at one being replaced is a minute of 502s for nothing.
		if "${COMPOSE[@]}" up -d --no-build --force-recreate web caddy; then
			warn "Previous image restarted. Verify:"
			warn "  docker compose -f ${COMPOSE_FILE} ps"
			warn "  curl -fsS -o /dev/null -w '%{http_code}\\n' https://${DOMAIN}/"
			warn "Nothing else needs restoring: this site holds no data."
		else
			warn "ROLLBACK ITSELF FAILED. The site is down. Read the logs:"
			warn "  docker compose -f ${COMPOSE_FILE} logs --tail=200 web"
		fi
	else
		warn "No rollback image is available. The site may be down."
		warn "  docker compose -f ${COMPOSE_FILE} logs --tail=200 web"
	fi
	warn ""
	warn "See docs/deploy/RUNBOOK.md -> 'Triage'."
	exit 1
}

# =======================================================================================
# 5. Start
# =======================================================================================
step "Starting web and caddy"
# --remove-orphans clears containers that this compose file no longer defines. On the first
# deploy over the previous stack that is how the old db, redis and worker containers are
# removed. Their VOLUMES are untouched — `docker volume ls` still shows them afterwards, and
# removing those is a deliberate, separate act (RUNBOOK, 'Cutting over from the old stack').
"${COMPOSE[@]}" up -d --no-build --remove-orphans || rollback "starting the stack"

# =======================================================================================
# 6. Verify
# =======================================================================================
# A 200 ON / IS THE HEALTH CHECK. There is no /api/health on this site: every route is
# prerendered, so the front page answering proves the server is serving, and a dedicated
# endpoint would only report that the Node process is alive — which is the same fact,
# obtained by shipping a route that exists for nothing else.
#
# Probed from INSIDE the container. That isolates "is the app up" from "is DNS correct" and
# "did the certificate issue", which are different problems with different fixes, and it
# works before DNS has propagated. `node -e` needs no tooling in the image.
step "Verifying the site answers"

HEALTH_DEADLINE=$(($(date +%s) + HEALTH_TIMEOUT))
HEALTH_OK=0
ATTEMPT=0
while [ "$(date +%s)" -lt "${HEALTH_DEADLINE}" ]; do
	ATTEMPT=$((ATTEMPT + 1))
	if "${COMPOSE[@]}" exec -T web node -e \
		"fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok){console.error('HTTP '+r.status);process.exit(1)}console.log('HTTP '+r.status);process.exit(0)}).catch(e=>{console.error(String(e));process.exit(1)})" 2>/dev/null; then
		HEALTH_OK=1
		break
	fi
	log "  not answering yet (attempt ${ATTEMPT}); retrying in 5s"
	sleep 5
done

if [ "${HEALTH_OK}" -ne 1 ]; then
	warn "Last 80 lines of the web container log:"
	"${COMPOSE[@]}" logs --tail=80 web >&2 || true
	rollback "health check (no 200 on / within ${HEALTH_TIMEOUT}s)"
fi
log "The front page returns 200 from inside the container."

# One more asset, because its failure is silent. public/katex/ is GENERATED at build time
# and is not in the repository; if it ever stops being produced, every page still returns
# 200 and every equation on the site renders as a pile of unpositioned glyphs. Nobody
# notices that from a health check on `/`. The Dockerfile asserts the file exists in the
# image; this asserts the running container serves it.
#
# If KaTeX is ever removed from the site, delete this check in the same commit.
if "${COMPOSE[@]}" exec -T web node -e \
	"fetch('http://127.0.0.1:3000/katex/katex.min.css').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>/dev/null; then
	log "KaTeX stylesheet is served."
else
	warn "/katex/katex.min.css did not return 200. Mathematics will render unstyled on every"
	warn "chapter. This is a broken build, not a broken page — rolling back."
	rollback "KaTeX asset check"
fi

# Public path: through Caddy, over TLS, from outside. A failure here is NOT a reason to roll
# back — the application is provably healthy, so the problem is DNS, the firewall, or
# certificate issuance. Rolling the image back would fix none of them and would lose the
# deploy.
if command -v curl >/dev/null 2>&1; then
	if curl -fsS --max-time 20 -o /dev/null "https://${DOMAIN}/"; then
		log "Public check passed: https://${DOMAIN}/"
	else
		warn "The app is healthy but https://${DOMAIN}/ is not reachable from this host."
		warn "The deploy is NOT rolled back — this is an edge problem, not an app problem. Check:"
		warn "  dig +short ${DOMAIN}                                      # does it point here?"
		warn "  sudo ufw status                                           # are 80 and 443 open?"
		warn "  docker compose -f ${COMPOSE_FILE} logs --tail=100 caddy   # certificate issuance"
		warn "  See docs/deploy/RUNBOOK.md -> 'The certificate did not issue'."
	fi
else
	warn "curl is not installed; skipping the public check. Install it: sudo apt-get install -y curl"
fi

# =======================================================================================
# 7. Tidy up
# =======================================================================================
step "Cleaning up"
# Only dangling (untagged, unreferenced) layers from this build. NOT `prune -a`, which
# would delete ${IMAGE_NAME}:previous and destroy the rollback path.
docker image prune -f >/dev/null
log "Dangling build layers removed. ${IMAGE_NAME}:previous is preserved."

"${COMPOSE[@]}" ps

step "Deploy complete"
log "Source:  $(git -C "${REPO_DIR}" rev-parse --short HEAD 2>/dev/null || echo unknown)"
log "Image:   ${IMAGE_NAME}:${IMAGE_TAG}"
if [ "${ROLLBACK_AVAILABLE}" -eq 1 ]; then
	log "Rollback available: yes — see docs/deploy/RUNBOOK.md, 'Rolling back'."
else
	log "Rollback available: no (first deploy)"
fi
log "Live at: https://${DOMAIN}"
exit 0
