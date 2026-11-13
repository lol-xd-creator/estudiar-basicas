// Pruebas del lenguaje de los gráficos: los de la guía y del contenido no
// tienen que dar errores, y casos puntuales que se rompieron alguna vez.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { parseSpec } from "../public/js/plotspec.js";

const PLOT = /^```(grafico3d|grafica3d|plot3d|grafico|grafica|plot|grafico2d|plot2d)\s*\n([\s\S]*?)\n```/gm;
// Las notas pueden estar en subcarpetas (por ejemplo contenido/pye/notas/u6/).
const mdEn = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? mdEn(new URL(`${d.name}/`, dir)) : d.name.endsWith(".md") ? [new URL(d.name, dir)] : [],
  );
const files = [
  ...readdirSync(new URL("../src/seed/", import.meta.url)).map((f) => new URL(`../src/seed/${f}`, import.meta.url)),
  ...readdirSync(new URL("../contenido/", import.meta.url), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).flatMap((d) =>
    mdEn(new URL(`../contenido/${d}/notas/`, import.meta.url)),
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

test("campo eléctrico: cargas, placas y campos dados por fórmula", () => {
  const spec = parseSpec(`carga (-1, 0) ; +2
carga (1, 0) ; -1
placa (-2, 1) (2, 1) ; +
placa (-2, -1) (2, -1) ; −
campo (y, -x)
carga (0, 3)`, 2);
  assert.deepEqual(spec.items.map((it) => [it.kind, it.q ?? null]), [["charge", 2], ["charge", -1], ["plate", 1], ["plate", -1], ["field", null]]);
  assert.equal(spec.items[4].fx({ x: 0, y: 3 }), 3);
  assert.match(spec.errors[0].msg, /falta el valor/);
});

test("ejes con otros nombres", () => {
  const spec = parseSpec("ejes: u, v\n1 <= x <= 3, 0 <= y <= 1", 2);
  assert.deepEqual(spec.errors, []);
  assert.deepEqual(spec.opts.nombresEjes, ["u", "v"]);
  assert.equal(parseSpec("ejes: no", 2).opts.ejes, false);
});
