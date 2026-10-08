#!/usr/bin/env bash
# Instalación inicial del VPS (Ubuntu 22.04/24.04 o Debian 12). Se corre UNA
# vez, como root, después de subir el código con deploy/subir.sh:
#
#   bash /opt/matematica/app/deploy/setup-vps.sh matematica.tudominio.com
#   bash /opt/matematica/app/deploy/setup-vps.sh     ← sin dominio: matematica.<IP>.sslip.io
#
# Deja: Node 24, Caddy (HTTPS automático), firewall (22/80/443), usuario
# "matematica", el servicio systemd, el .env con tu contraseña, backups
# diarios y actualizaciones de seguridad automáticas. Se puede volver a
# correr sin romper nada, y convive con otras apps instaladas igual (por
# ejemplo estudiar-desarrollo): cada una tiene su usuario, carpeta, puerto,
# servicio y su archivo en /etc/caddy/sitios/.
set -euo pipefail

if [[ $EUID -ne 0 ]]; then echo "✖ Correlo como root (sudo bash $0 …)"; exit 1; fi

APP=matematica
PORT=8091
APP_DIR=/opt/$APP/app
ENV_FILE=/opt/$APP/.env
DATA_DIR=/var/lib/$APP
BACKUP_DIR=/var/backups/$APP
HERE="$(cd "$(dirname "$0")" && pwd)"

DOMINIO="${1:-}"
if [[ -z "$DOMINIO" ]]; then
  IP="$(curl -4 -fsS https://ifconfig.me || hostname -I | awk '{print $1}')"
  DOMINIO="$APP.${IP//./-}.sslip.io"
  echo "ℹ Sin dominio: se usará https://$DOMINIO (sslip.io apunta a la IP del VPS)."
fi

echo "▶ 1/8 Paquetes del sistema"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -yq curl ca-certificates gnupg ufw unattended-upgrades debian-keyring debian-archive-keyring apt-transport-https
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "▶ 2/8 Node.js 24"
if ! node -v 2>/dev/null | grep -qE '^v(2[4-9]|[3-9][0-9])'; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -yq nodejs
fi
node -v

echo "▶ 3/8 Caddy"
if ! command -v caddy >/dev/null; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -q
  apt-get install -yq caddy
fi

echo "▶ 4/8 Usuario y carpetas"
id $APP >/dev/null 2>&1 || useradd --system --home /opt/$APP --shell /usr/sbin/nologin $APP
mkdir -p "$APP_DIR" "$DATA_DIR" "$BACKUP_DIR" /var/log/caddy
chown -R $APP:$APP "$DATA_DIR" "$BACKUP_DIR"
chmod 750 "$DATA_DIR" "$BACKUP_DIR"

echo "▶ 5/8 Configuración (.env) y contraseña"
if [[ ! -f "$ENV_FILE" ]]; then
  cat > "$ENV_FILE" <<EOF
HOST=127.0.0.1
PORT=$PORT
DATA_DIR=$DATA_DIR
COOKIE_SECURE=1
TRUST_PROXY=1
REQUIRE_AUTH=1
EOF
fi
# La app escucha en 127.0.0.1 pero Caddy la publica: la contraseña es obligatoria.
grep -q '^REQUIRE_AUTH=1' "$ENV_FILE" || echo 'REQUIRE_AUTH=1' >> "$ENV_FILE"
# Sin terminal interactiva (por ejemplo, si lo corre Claude Code) no se pide
# la contraseña: se instala todo y la app queda detenida hasta que la definas.
NEEDS_PASSWORD=0
if ! grep -q '^APP_PASSWORD_HASH=' "$ENV_FILE"; then
  if [[ -t 0 ]]; then
    echo "Elegí la contraseña para entrar a la app desde internet:"
    node "$APP_DIR/scripts/password.mjs" --env "$ENV_FILE"
  else
    NEEDS_PASSWORD=1
  fi
fi
chown root:$APP "$ENV_FILE"
chmod 640 "$ENV_FILE"

echo "▶ 6/8 Servicio de la app"
cp "$HERE/$APP.service" /etc/systemd/system/$APP.service
systemctl daemon-reload
systemctl enable $APP >/dev/null
if [[ $NEEDS_PASSWORD -eq 0 ]]; then systemctl restart $APP; fi

echo "▶ 7/8 Caddy (HTTPS) y firewall"
# Un archivo por app en /etc/caddy/sitios/; el Caddyfile principal los importa.
mkdir -p /etc/caddy/sitios
if ! grep -q '^import /etc/caddy/sitios/\*.caddy' /etc/caddy/Caddyfile 2>/dev/null; then
  [[ -f /etc/caddy/Caddyfile ]] && cp /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.antes-$(date +%Y%m%d%H%M%S)"
  echo 'import /etc/caddy/sitios/*.caddy' > /etc/caddy/Caddyfile
fi
sed "s/__DOMINIO__/$DOMINIO/" "$HERE/Caddyfile" > /etc/caddy/sitios/$APP.caddy
chown -R caddy:caddy /var/log/caddy
caddy validate --config /etc/caddy/Caddyfile >/dev/null
systemctl enable caddy >/dev/null
systemctl reload caddy || systemctl restart caddy
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null

echo "▶ 8/8 Backup diario (04:15, se guardan 14)"
cat > /etc/cron.d/$APP-backup <<EOF
15 4 * * * $APP /usr/bin/node --env-file=$ENV_FILE $APP_DIR/scripts/backup.mjs $BACKUP_DIR 14 >> /var/log/$APP-backup.log 2>&1
EOF
touch /var/log/$APP-backup.log
chown $APP:$APP /var/log/$APP-backup.log

if [[ $NEEDS_PASSWORD -eq 1 ]]; then
  echo
  echo "✔ Instalado. Falta un paso que tenés que hacer vos (la contraseña no pasa por nadie más):"
  echo "    ssh -t root@IP-DEL-VPS \"node $APP_DIR/scripts/password.mjs --env $ENV_FILE && systemctl restart $APP\""
  echo "  Después abrí https://$DOMINIO"
  exit 0
fi

sleep 2
if curl -fsS http://127.0.0.1:$PORT/api/health >/dev/null; then
  echo
  echo "✔ Listo. Abrí https://$DOMINIO"
  echo "  (el certificado HTTPS puede tardar un minuto la primera vez)"
else
  echo "✖ La app no respondió. Mirá el log con: journalctl -u $APP -n 50"
  exit 1
fi
