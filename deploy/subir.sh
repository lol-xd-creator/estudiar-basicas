#!/usr/bin/env bash
# Sube el código de la app al VPS y la reinicia. Se corre desde tu PC (Git
# Bash en Windows), en la carpeta del proyecto:
#
#   bash deploy/subir.sh root@IP-DEL-VPS
#
# No sube tus datos (data/), ni node_modules, ni .env, ni los apuntes PDF.
# Los datos se suben aparte, una vez, con deploy/subir-datos.sh.
set -euo pipefail

HOST="${1:?Uso: bash deploy/subir.sh usuario@ip-del-vps}"
cd "$(dirname "$0")/.."

echo "▶ Subiendo el código a $HOST:/opt/matematica/app"
tar czf - \
  --exclude=./node_modules --exclude=./data --exclude=./backups --exclude=./apuntes \
  --exclude=./.git --exclude=./.env --exclude=./.claude \
  . | ssh "$HOST" 'mkdir -p /opt/matematica/app && tar xzf - -C /opt/matematica/app --no-same-owner'

# Si ya está instalado, reiniciar; si no, avisar el paso siguiente.
ssh "$HOST" 'if systemctl list-unit-files matematica.service >/dev/null 2>&1 && [ -f /etc/systemd/system/matematica.service ]; then
  cp /opt/matematica/app/deploy/matematica.service /etc/systemd/system/ && systemctl daemon-reload && systemctl restart matematica
  sleep 1 && curl -fsS http://127.0.0.1:8091/api/health >/dev/null && echo "✔ App actualizada y corriendo" || { echo "✖ No respondió: journalctl -u matematica -n 50"; exit 1; }
else
  echo "ℹ Código subido. Primera vez: instalá con"
  echo "    ssh -t '"$HOST"' bash /opt/matematica/app/deploy/setup-vps.sh matematica.tudominio.com"
fi'
