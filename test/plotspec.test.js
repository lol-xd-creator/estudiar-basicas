// Pruebas del lenguaje de los gráficos: los de la guía y del contenido no
// tienen que dar errores, y casos puntuales que se rompieron alguna vez.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { parseSpec } from "../public/js/plotspec.js";

const PLOT = /^```(grafico3d|grafica3d|plot3d|grafico|grafica|plot|grafico2d|plot2d)\s*\n([\s\S]*?)\n```/gm;
const files = [
  ...readdirSync(new URL("../src/seed/", import.meta.url)).map((f) => new URL(`../src/seed/${f}`, import.meta.url)),
  ...readdirSync(new URL("../contenido/", import.meta.url)).flatMap((d) =>
    readdirSync(new URL(`../contenido/${d}/notas/`, import.meta.url)).map((f) => new URL(`../contenido/${d}/notas/${f}`, import.meta.url)),
  ),
];

test("los gráficos de la guía y del contenido no tienen errores", () => {
  let n = 0;
  for (const file of files) {
    for (const [, lang, src] of readFileSync(file, "utf8").matchAll(PLOT)) {
      const spec = parseSpec(src, lang.includes("3") ? 3 : 2);
      assert.deepEqual(spec.errors, [], `${file.pathname.split("/").pop()}:\n${src}`);
      n++;
    }
  }
  assert.ok(n >= 10, `se encontraron ${n} gráficos`);
});

test("texto con paréntesis dentro de las comillas", () => {
  const spec = parseSpec('texto (1.2, 1.5, 1.2) "$F(x)$"', 3);
  assert.deepEqual(spec.errors, []);
  assert.deepEqual(spec.items[0].p, [1.2, 1.5, 1.2]);
  assert.equal(spec.items[0].text, "$F(x)$");
  assert.deepEqual(parseSpec('texto (1, 2) "g(t) = (t, t^2)"', 2).items[0].p, [1, 2]);
});
