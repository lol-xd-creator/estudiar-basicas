// Backup de los datos: copia consistente de la base (VACUUM INTO, seguro con
// la app corriendo) + las imágenes, en una carpeta con fecha. Conserva los
// últimos N backups.
//
//   node scripts/backup.mjs [carpeta-destino] [cantidad-a-conservar]
//   (por defecto: <DATA_DIR>/../backups y 14)
import { DatabaseSync } from "node:sqlite";
import { cpSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DATA = resolve(ROOT, process.env.DATA_DIR || "data");
const DEST = resolve(process.argv[2] || join(DATA, "..", "backups"));
const KEEP = Number(process.argv[3]) || 14;

// Con segundos: dos backups en el mismo minuto (bajar-backup.sh dos veces
// seguidas) no chocan.
const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
const target = join(DEST, `matematica-${stamp}`);
mkdirSync(target, { recursive: true });

const db = new DatabaseSync(join(DATA, "matematica.db"));
db.exec(`VACUUM INTO '${join(target, "matematica.db").replace(/'/g, "''")}'`);
db.close();
if (existsSync(join(DATA, "media"))) cpSync(join(DATA, "media"), join(target, "media"), { recursive: true });

const all = readdirSync(DEST).filter((d) => d.startsWith("matematica-")).sort();
for (const old of all.slice(0, Math.max(0, all.length - KEEP))) rmSync(join(DEST, old), { recursive: true, force: true });

console.log(`✔ Backup en ${target} (se conservan los últimos ${KEEP})`);
