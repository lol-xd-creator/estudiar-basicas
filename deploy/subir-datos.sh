#!/usr/bin/env bash
# Sube tus notas e imágenes de esta PC al VPS (REEMPLAZA las del servidor).
# Se usa para la mudanza inicial. Desde la carpeta del proyecto (Git Bash):
#
#   bash deploy/subir-datos.sh root@IP-DEL-VPS        (--si al final: sin confirmar)
#
# Hace una copia consistente de la base local (sirve aunque la app esté
# abierta), la sube y reinicia el servicio. Antes guarda un backup de lo que
# había en el servidor.
set -euo pipefail

HOST="${1:?Uso: bash deploy/subir-datos.sh usuario@ip-del-vps}"
cd "$(dirname "$0")/.."

if [[ "${2:-}" != "--si" ]]; then
  read -r -p "Esto reemplaza las notas del servidor por las de esta PC. ¿Seguir? (s/N) " ok
  [[ "$ok" == "s" || "$ok" == "S" ]] || { echo "Cancelado."; exit 0; }
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
node --env-file-if-exists=.env scripts/backup.mjs "$TMP" 1 >/dev/null
SNAP="$(ls -d "$TMP"/matematica-* | head -1)"

echo "▶ Subiendo $(du -sh "$SNAP" | cut -f1) a $HOST"
ssh "$HOST" 'sudo -u matematica node --env-file=/opt/matematica/.env /opt/matematica/app/scripts/backup.mjs /var/backups/matematica 14 >/dev/null 2>&1 || true
systemctl stop matematica'
tar czf - -C "$SNAP" . | ssh "$HOST" 'rm -f /var/lib/matematica/matematica.db-wal /var/lib/matematica/matematica.db-shm &&
  tar xzf - -C /var/lib/matematica --no-same-owner && chown -R matematica:matematica /var/lib/matematica &&
  systemctl start matematica && sleep 1 && curl -fsS http://127.0.0.1:8091/api/health >/dev/null && echo "✔ Datos subidos y app corriendo"'
