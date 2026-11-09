#!/usr/bin/env bash
#
# One-command first deploy on a fresh Ubuntu VPS.
#
#   sudo ./infra/bootstrap.sh wrath.rip you@example.com
#
# Idempotent; safe to re-run after a failure.
#
# Not done here:
#   * SSH hardening (disabling password/root login). Do it by hand once key-based login
#     works, so you can't lock yourself out.
#   * Swap. The build peaks around 2.5 GB; on a box with under 4 GB RAM, add swap first.
#   * Secrets. There are none; .env only holds DOMAIN and ACME_EMAIL for Caddy.
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
  Put the source tree there first (git clone, or tar over ssh), then run this again."

step "0/6  The box"
note "$(awk '/MemTotal/ {printf "%d MB RAM", int($2/1024)}' /proc/meminfo), $(df -Ph / | awk 'NR==2 {print $4}') free on /, $(nproc) vCPU"

step "1/6  System packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ca-certificates curl gnupg ufw fail2ban unattended-upgrades >/dev/null
note "done"

step "2/6  Firewall"
# Allow SSH before enabling, or this session gets cut off.
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
# Both read by Caddy; neither is secret. See .env.example for optional overrides.

DOMAIN=${DOMAIN}
ACME_EMAIL=${ACME_EMAIL}
ENVEOF
	chmod 600 "${ENV_FILE}"
	note "written to ${ENV_FILE} (mode 0600)"
fi

step "6/6  Deploy"
cd "${APP_DIR}"
# --no-pull when there's no git remote (e.g. source delivered by tar over ssh).
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
      disable password authentication and root login in /etc/ssh/sshd_config

  Optional, recommended:
      the periodic health report — install infra/systemd/app-healthcheck.{service,timer}
============================================================================

DONEEOF
