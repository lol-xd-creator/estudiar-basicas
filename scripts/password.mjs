// Genera (o cambia) la contraseña de la app y la guarda en .env junto con un
// SESSION_SECRET nuevo (lo que además cierra las sesiones abiertas).
//
//   npm run password                 pregunta la contraseña (no se ve al escribir)
//   npm run password -- --env ruta   escribe en otro archivo .env
//   npm run password -- --print      solo muestra las líneas, sin escribir
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { hashPassword } from "../src/auth.js";

const args = process.argv.slice(2);
const envPath = args.includes("--env") ? args[args.indexOf("--env") + 1] : new URL("../.env", import.meta.url);
const printOnly = args.includes("--print");

function ask(question) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(question);
    let value = "";
    const tty = stdin.isTTY;
    if (tty) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          if (tty) stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          stdout.write("\n");
          return resolve(value);
        }
        if (ch === "\u0003") process.exit(130); // Ctrl+C
        if (ch === "\u007f" || ch === "\b") value = value.slice(0, -1);
        else value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

const pass = process.env.NEW_PASSWORD || (await ask("Nueva contraseña: "));
if (pass.length < 10) {
  console.error("✖ Usá al menos 10 caracteres (va a estar expuesta a internet).");
  process.exit(1);
}
if (!process.env.NEW_PASSWORD && (await ask("Repetila: ")) !== pass) {
  console.error("✖ No coinciden.");
  process.exit(1);
}

const lines = {
  APP_PASSWORD_HASH: hashPassword(pass),
  SESSION_SECRET: randomBytes(32).toString("hex"),
};

if (printOnly) {
  for (const [k, v] of Object.entries(lines)) console.log(`${k}=${v}`);
  process.exit(0);
}

let env = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
for (const [k, v] of Object.entries(lines)) {
  const re = new RegExp(`^${k}=.*$`, "m");
  env = re.test(env) ? env.replace(re, `${k}=${v}`) : env.replace(/\n?$/, `\n${k}=${v}\n`);
}
writeFileSync(envPath, env.replace(/^\n+/, ""));
console.log(`✔ Contraseña guardada en ${envPath instanceof URL ? ".env" : envPath}. Reiniciá la app para aplicarla.`);
