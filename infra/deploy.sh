#!/usr/bin/env bash
#
# deploy.sh — build, start, verify, and roll back on failure.
#
#   ./infra/deploy.sh              normal deploy
#   ./infra/deploy.sh --no-pull    deploy the working tree exactly as it is
#
# Runs two containers (web, caddy); there is no database. Idempotent, locked against
# concurrent runs, and every step logs a UTC timestamp. To keep a log:
#   ./infra/deploy.sh 2>&1 | tee -a /var/log/deploy.log
#
# Rollback restores the previous image; the only state on the box is Caddy's cert store.

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
# Concurrent deploys would race on the :previous tag. Fail fast rather than queue.
LOCK_FILE="/tmp/deploy.$(basename "${REPO_DIR}").lock"
exec 9>"${LOCK_FILE}"
if ! flock -n 9; then
	die "Another deploy is already running (lock: ${LOCK_FILE}). Wait for it, or look: ps -ef | grep deploy.sh"
fi

# --- 1. Preflight: checks before anything changes ---------------------------------------
step "Preflight"

command -v docker >/dev/null 2>&1 || die "docker is not installed or not on PATH."
docker compose version >/dev/null 2>&1 ||
	die "The docker compose plugin is missing. Install it: sudo apt-get install -y docker-compose-plugin"
docker info >/dev/null 2>&1 ||
	die "Cannot talk to the Docker daemon. Either it is not running (sudo systemctl start docker) or this user is not in the docker group (newgrp docker)."
log "docker: $(docker --version)"
log "compose: $(docker compose version --short)"

[ -f "${COMPOSE_FILE}" ] || die "Missing ${COMPOSE_FILE}"
[ -f "${ENV_FILE}" ] || die "Missing ${ENV_FILE}. Copy .env.example to .env and fill in DOMAIN and ACME_EMAIL."

# .env is sourced below, so refuse command substitution in values (it would execute).
# Comment lines are ignored.
if grep -vE '^[[:space:]]*(#|$)' "${ENV_FILE}" | grep -Eq '(\$\(|`)'; then
	die ".env has command substitution (\$( or a backtick) in a value. Remove it — .env must be literal values only."
fi

# .env decides which hostname the box serves, so keep it owner-only.
ENV_PERMS="$(stat -c '%a' "${ENV_FILE}")"
if [ "${ENV_PERMS}" != "600" ] && [ "${ENV_PERMS}" != "400" ]; then
	warn ".env is mode ${ENV_PERMS}. Fixing to 600."
	chmod 600 "${ENV_FILE}"
fi

set -a
# shellcheck disable=SC1090  # path is computed, and the file is validated above.
. "${ENV_FILE}"
set +a

# Check required variables by name for a clearer error than compose would give.
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

# Warn about leftover variables from an older stack; nothing reads them.
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

# A build needs ~3 GB (pnpm store, node_modules, .next, two image copies).
AVAIL_KB="$(df -Pk "${REPO_DIR}" | awk 'NR==2 {print $4}')"
AVAIL_GB=$((AVAIL_KB / 1024 / 1024))
log "Free disk on $(df -Ph "${REPO_DIR}" | awk 'NR==2 {print $6}'): ${AVAIL_GB} GB"
if [ "${AVAIL_GB}" -lt 3 ]; then
	die "Only ${AVAIL_GB} GB free. A build needs ~3 GB of headroom. Reclaim space first: docker system prune -af --filter 'until=168h'"
fi

# `next build` peaks well under 2 GB, but with <1 GB free and no swap it can be
# OOM-killed (exit 137) without a clear error.
MEM_AVAIL_MB="$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)"
SWAP_MB="$(awk '/SwapTotal/ {print int($2/1024)}' /proc/meminfo)"
log "Memory: ${MEM_AVAIL_MB} MB available, ${SWAP_MB} MB swap"
if [ "${MEM_AVAIL_MB}" -lt 1024 ] && [ "${SWAP_MB}" -lt 512 ]; then
	warn "Under 1 GB available and no meaningful swap. 'next build' may be OOM-killed (exit 137)."
	warn "If the build exits 137, add swap or free memory and re-run."
fi

# Validate compose config against the loaded environment.
"${COMPOSE[@]}" config --quiet ||
	die "docker-compose.prod.yml failed validation with the current .env. Nothing has been changed."
log "Compose configuration validates."

# --- 2. Record the rollback point -------------------------------------------------------
# Before the build, so :previous is the image that was actually serving. Idempotent.
step "Recording the rollback point"

ROLLBACK_AVAILABLE=0
WEB_CID="$("${COMPOSE[@]}" ps -q web 2>/dev/null || true)"
if [ -n "${WEB_CID}" ]; then
	PREV_IMAGE_ID="$(docker inspect --format '{{.Image}}' "${WEB_CID}")"
	docker image tag "${PREV_IMAGE_ID}" "${IMAGE_NAME}:previous"
	ROLLBACK_AVAILABLE=1
	log "Running image ${PREV_IMAGE_ID} tagged ${IMAGE_NAME}:previous"
elif docker image inspect "${IMAGE_NAME}:previous" >/dev/null 2>&1; then
	# web isn't running, but an earlier :previous tag exists. Keep it.
	ROLLBACK_AVAILABLE=1
	log "web is not running; keeping the existing ${IMAGE_NAME}:previous as the rollback point."
else
	log "No previously running image. This looks like a first deploy — rollback will not be available."
fi

GIT_BEFORE="$(git -C "${REPO_DIR}" rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
log "Source at: ${GIT_BEFORE}"

# --- 3. Update the source ---------------------------------------------------------------
#   --no-pull                 deploy the tree as is.
#   no .git / no `origin`     deploy the tree as is (e.g. delivered with
#       tar -czf - --exclude=node_modules --exclude=.next --exclude=.git . \
#         | ssh deploy@<host> 'tar -xzf - -C /opt/app')
#   otherwise                 git pull --ff-only, refusing on a dirty tree.
if [ "${DO_PULL}" -eq 0 ]; then
	step "Skipping source update (--no-pull)"
elif [ ! -d "${REPO_DIR}/.git" ]; then
	step "Source update"
	log "No .git here — deploying the tree as it stands (e.g. delivered by tar over ssh)."
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
	# Never merge on the server; if this fails the checkout has diverged from origin.
	git -C "${REPO_DIR}" pull --ff-only origin "${BRANCH}"
	GIT_AFTER="$(git -C "${REPO_DIR}" rev-parse --short HEAD)"
	if [ "${GIT_BEFORE}" = "${GIT_AFTER}" ]; then
		log "Already up to date at ${GIT_AFTER}."
	else
		log "Updated ${GIT_BEFORE} -> ${GIT_AFTER} on ${BRANCH}."
	fi
fi

# --- 4. Build ---------------------------------------------------------------------------
step "Building the image"
# Fails on a broken chapter, type error or missing KaTeX asset, before anything running
# is touched.
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
		# --no-build uses the retagged image. caddy is recreated too so it drops
		# connections to the replaced container (avoids a burst of 502s).
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
	warn "To triage: docker compose -f ${COMPOSE_FILE} ps, then check the web and caddy logs."
	exit 1
}

# --- 5. Start ---------------------------------------------------------------------------
step "Starting web and caddy"
# --remove-orphans removes containers no longer in the compose file. Volumes are untouched.
"${COMPOSE[@]}" up -d --no-build --remove-orphans || rollback "starting the stack"

# --- 6. Verify --------------------------------------------------------------------------
# Health check is a 200 on / (every route is prerendered; there's no health endpoint).
# Probed from inside the container so it's independent of DNS and TLS.
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

# public/katex/ is generated at build time. If it's missing, pages still return 200 but
# maths renders unstyled, so check the running container serves it.
if "${COMPOSE[@]}" exec -T web node -e \
	"fetch('http://127.0.0.1:3000/katex/katex.min.css').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>/dev/null; then
	log "KaTeX stylesheet is served."
else
	warn "/katex/katex.min.css did not return 200. Mathematics will render unstyled on every"
	warn "chapter. This is a broken build, not a broken page — rolling back."
	rollback "KaTeX asset check"
fi

# Public check through Caddy over TLS. A failure here means DNS, firewall or certificate
# trouble, so don't roll back.
if command -v curl >/dev/null 2>&1; then
	if curl -fsS --max-time 20 -o /dev/null "https://${DOMAIN}/"; then
		log "Public check passed: https://${DOMAIN}/"
	else
		warn "The app is healthy but https://${DOMAIN}/ is not reachable from this host."
		warn "The deploy is NOT rolled back — this is an edge problem, not an app problem. Check:"
		warn "  dig +short ${DOMAIN}                                      # does it point here?"
		warn "  sudo ufw status                                           # are 80 and 443 open?"
		warn "  docker compose -f ${COMPOSE_FILE} logs --tail=100 caddy   # certificate issuance"
	fi
else
	warn "curl is not installed; skipping the public check. Install it: sudo apt-get install -y curl"
fi

# --- 7. Tidy up -------------------------------------------------------------------------
step "Cleaning up"
# Dangling layers only; `prune -a` would delete the :previous rollback image.
docker image prune -f >/dev/null
log "Dangling build layers removed. ${IMAGE_NAME}:previous is preserved."

"${COMPOSE[@]}" ps

step "Deploy complete"
log "Source:  $(git -C "${REPO_DIR}" rev-parse --short HEAD 2>/dev/null || echo unknown)"
log "Image:   ${IMAGE_NAME}:${IMAGE_TAG}"
if [ "${ROLLBACK_AVAILABLE}" -eq 1 ]; then
	log "Rollback available: yes (${IMAGE_NAME}:previous)."
else
	log "Rollback available: no (first deploy)"
fi
log "Live at: https://${DOMAIN}"
exit 0
