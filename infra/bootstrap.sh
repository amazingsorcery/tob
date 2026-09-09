#!/usr/bin/env bash
#
# One-command first deploy on a fresh Ubuntu VPS.
#
#   sudo ./infra/bootstrap.sh wrath.rip you@example.com
#
# This is docs/deploy/RUNBOOK.md "Provisioning a fresh box" and "First deploy" collapsed
# into a script. The runbook is still the reference: it explains why each step is there and
# what to do when one fails.
#
# Idempotent: safe to run again after a failure, and safe to run twice. Every step checks
# whether it has already been done.
#
# WHAT IT DELIBERATELY DOES NOT DO
#
#   * It does not disable password SSH login and it does not touch your user. Both are in
#     the runbook as manual steps, on purpose: automating them is how an operator locks
#     themselves out of a machine they have no console access to. Do them once you have
#     confirmed key-based login works.
#
#   * It does not create a swap file. The old stack's bootstrap did, because `next build`
#     was the largest thing on a 2-4 GB box. The number, measured on this corpus: the build
#     peaks around 2.5 GB across its worker processes (39 pages, three dissertations, every
#     equation through KaTeX), and Next scales those workers with CPU count, so a 2-vCPU
#     VPS peaks lower than that. The target box has 8 GB and runs two containers whose
#     limits total 768 MB. There is nothing to insure against. If you are deploying to a
#     box with less than 4 GB, add swap first — the commands are in the runbook under
#     "The build was killed".
#
#   * It generates no secrets, because there are none. The application reads no environment
#     variable at all; the .env it writes has two lines and both are for Caddy.
#
#   * It seeds nothing. There is no database.
#
set -euo pipefail

DOMAIN="${1:-}"
ACME_EMAIL="${2:-}"
APP_DIR="${APP_DIR:-/opt/app}"

die() {
	printf '\nERROR: %s\n' "$*" >&2
	exit 1
}
step() { printf '\n==> %s\n' "$*"; }
note() { printf '    %s\n' "$*"; }

[ -n "${DOMAIN}" ] || die "Usage: sudo ./infra/bootstrap.sh <domain> <email-for-tls-notices>
  e.g. sudo ./infra/bootstrap.sh wrath.rip you@example.com"
[ -n "${ACME_EMAIL}" ] || die "Second argument missing: an email address for Let's Encrypt expiry notices."
[ "$(id -u)" -eq 0 ] || die "Run with sudo."
[ -f "${APP_DIR}/docker-compose.prod.yml" ] || die "No application at ${APP_DIR}.
  Put the source tree there first, then run this again. See docs/deploy/RUNBOOK.md,
  'Getting the code onto the box'."

step "0/6  The box"
note "$(awk '/MemTotal/ {printf "%d MB RAM", int($2/1024)}' /proc/meminfo), $(df -Ph / | awk 'NR==2 {print $4}') free on /, $(nproc) vCPU"

step "1/6  System packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg ufw fail2ban unattended-upgrades >/dev/null
note "done"

step "2/6  Firewall"
# Order matters: allow SSH BEFORE enabling, or enabling the firewall ends this session and
# every future one.
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null
note "22, 80 and 443 open; everything else closed"

step "3/6  fail2ban and unattended upgrades"
systemctl enable --now fail2ban >/dev/null 2>&1 || true
dpkg-reconfigure -f noninteractive unattended-upgrades >/dev/null 2>&1 || true
note "done"

step "4/6  Docker"
if command -v docker >/dev/null 2>&1; then
	note "already installed: $(docker --version)"
else
	install -m 0755 -d /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
	chmod a+r /etc/apt/keyrings/docker.asc
	echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" \
		>/etc/apt/sources.list.d/docker.list
	apt-get update -qq
	apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >/dev/null
	systemctl enable --now docker >/dev/null
	note "installed: $(docker --version)"
fi

step "5/6  Environment file"
ENV_FILE="${APP_DIR}/.env"
if [ -f "${ENV_FILE}" ]; then
	note "${ENV_FILE} already exists — leaving it alone."
	note "Delete it and re-run if you want it regenerated."
else
	cat >"${ENV_FILE}" <<ENVEOF
# Written by infra/bootstrap.sh on $(date -u '+%Y-%m-%dT%H:%M:%SZ').
#
# Two variables, both read by Caddy, neither of them a secret. The application reads no
# environment variable at all: every page is generated at build time from content/works/.
# See .env.example for what each one does and for the optional overrides.

DOMAIN=${DOMAIN}
ACME_EMAIL=${ACME_EMAIL}
ENVEOF
	chmod 600 "${ENV_FILE}"
	note "written to ${ENV_FILE} (mode 0600)"
fi

step "6/6  Deploy"
cd "${APP_DIR}"
# --no-pull when there is no git checkout with a remote. The source can arrive by other
# means than a clone — on this deployment it arrives by tar over ssh — and deploy.sh's
# pull step would have nothing to pull from. deploy.sh detects both cases itself; passing
# the flag here makes the intent explicit for the common one.
if [ -d "${APP_DIR}/.git" ] && git -C "${APP_DIR}" remote get-url origin >/dev/null 2>&1; then
	./infra/deploy.sh
else
	note "no git remote here — deploying the tree as it stands"
	./infra/deploy.sh --no-pull
fi

cat <<DONEEOF

============================================================================
  Live at https://${DOMAIN}

  The certificate is issued on the first request, which takes 5-30 seconds.
  If it does not appear, the cause is almost always DNS or port 80:
      docker compose -f docker-compose.prod.yml logs caddy | grep -i acme

  STILL TO DO BY HAND, once you have confirmed key-based SSH works:
      docs/deploy/RUNBOOK.md -> "Provisioning a fresh box", step 2
      (disable password authentication and root login)

  Optional, recommended:
      the periodic health report — RUNBOOK, "The health timer"
============================================================================

DONEEOF
