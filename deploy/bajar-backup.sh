#!/usr/bin/env bash
# Baja a esta PC el backup más reciente del VPS (en backups/). Desde la
# carpeta del proyecto (Git Bash):
#
#   bash deploy/bajar-backup.sh root@IP-DEL-VPS
#
# Para usarlo localmente: copiá matematica.db y media/ de ese backup a data/.
set -euo pipefail

HOST="${1:?Uso: bash deploy/bajar-backup.sh usuario@ip-del-vps}"
cd "$(dirname "$0")/.."

# Backup fresco en el servidor y bajarlo.
LAST="$(ssh "$HOST" 'sudo -u matematica node --env-file=/opt/matematica/.env /opt/matematica/app/scripts/backup.mjs /var/backups/matematica 14 >/dev/null && ls -d /var/backups/matematica/matematica-* | tail -1')"
mkdir -p backups
ssh "$HOST" "tar czf - -C '$LAST' ." | { mkdir -p "backups/$(basename "$LAST")" && tar xzf - -C "backups/$(basename "$LAST")"; }
echo "✔ Backup en backups/$(basename "$LAST")"
