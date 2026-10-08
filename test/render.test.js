// Pruebas del render de notas (Markdown + marcadores de fórmula) y del
// empaquetado del HTML descargado. render.js espera markdown-it como global
// del navegador y math.js un document (para el evento de copiar): acá se
// simulan. Las fórmulas quedan como marcadores <span class="tex">; las dibuja
// MathJax en el navegador.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Script } from "node:vm";
import markdownit from "markdown-it";

globalThis.window = { markdownit };
globalThis.document = { addEventListener() {} };
const { renderNote, splitRel } = await import("../public/js/render.js");
const { bundleModules } = await import("../public/js/bundle.js");
const R = String.raw;

test("fórmulas en el texto y centradas", () => {
  const { html } = renderNote(R`La integral $\iint_R f\,\dA$ cuesta $5 y $10.` + "\n\n$$\n" + R`\int_a^b F(x)\,\dx` + "\n$$");
  assert.match(html, /<span class="tex" data-d="0">\\iint_R f\\,\\dA<\/span>/);
  assert.match(html, /class="math-display"[^>]*><span class="tex" data-d="1">/);
  assert.match(html, /cuesta \$5 y \$10/); // los precios no son fórmulas
});

test("ecuaciones numeradas y citas", () => {
  const { html } = renderNote("$$\n" + R`F(x) = 1 \label{F}` + "\n$$\n\n" + R`Por \eqref{F} y $\eqref{F}$.`);
  assert.match(html, /<div class="math-display" id="eq-f"/);
  assert.match(html, /<a href="#eq-f" class="ref" data-ref="F" data-target="eq-f">\(1\)<\/a>/);
  assert.match(html, /data-target="eq-f"[^>]*>.*\(1\)/s); // la cita dentro de una fórmula
});

test("```math se numera y se cita como $$", () => {
  const { html } = renderNote("```math\n" + R`G = 2 \label{g}` + "\n```\n\n" + R`Ver \eqref{g}.`);
  assert.match(html, /<div class="math-display" id="eq-g" data-line="0"><span class="tex" data-d="1">G = 2 \\tag\{1\}<\/span>/);
  assert.match(html, /<a href="#eq-g" class="ref" data-ref="g" data-target="eq-g">\(1\)<\/a>/);
});

test("teoremas numerados, H) / T) y referencias", () => {
  const src = "::: teorema Fubini {#fub}\nH) $f$ integrable\nT) vale\n:::\n\n::: teorema\nOtro\n:::\n\n" + R`Ver \ref{fub}.`;
  const { html, headings } = renderNote(src);
  assert.match(html, /Teorema 1<\/span> <span class="box-name">\(Fubini\)/);
  assert.match(html, /Teorema 2</);
  assert.match(html, /<p[^>]*class="ht ht-h"/);
  assert.match(html, /<p[^>]*class="ht ht-t">vale/);
  assert.match(html, /class="ref"[^>]*>Teorema 1</);
  assert.equal(headings.filter((h) => h.level === 4).length, 2);
});

test("cajas anidadas: demostración con pasos adentro", () => {
  const src = "::: demostracion\n::: pasos\nA = B // porque sí\n  = C\n:::\nFin.\n:::\nDespués.";
  const { html } = renderNote(src);
  assert.match(html, /class="box proof"/);
  assert.equal((html.match(/class="paso"/g) || []).length, 2);
  assert.match(html, /<p[^>]*>Fin\.<\/p>\n<\/div><div class="qed"/); // "Fin." queda adentro de la prueba
  assert.match(html, /<\/div><\/div>\n<p[^>]*>Después/);
});

test("pasos: relación alineada, justificación y narración", () => {
  assert.deepEqual(splitRel(R`\iint_R f = \lim \sum`), { lhs: R`\iint_R f`, rel: "=", rhs: R`\lim \sum` });
  assert.deepEqual(splitRel(R`= \int_a^b F`), { lhs: "", rel: "=", rhs: R`\int_a^b F` });
  assert.deepEqual(splitRel(R`\left( a = b \right) \le c`), { lhs: R`\left( a = b \right)`, rel: R`\le`, rhs: "c" });
  assert.deepEqual(splitRel(R`x \overset{\text{Fubini}}{=} y`), { lhs: "x", rel: R`\overset{\text{Fubini}}{=}`, rhs: "y" });
  assert.equal(splitRel(R`\left| x \right|`).rel, "");
  const { html } = renderNote("::: pasos\n// Primero:\nA = B // por $x$\n:::");
  assert.match(html, /paso is-text/);
  assert.match(html, /paso-just"><span>por <span class="tex"/);
});

test("gráficos: la figura lleva la especificación y el título", () => {
  const { html } = renderNote("```grafico3d\ntitulo: Sólido $S$\n0 <= z <= 1, x^2 + y^2 <= 1\n```");
  assert.match(html, /<figure class="plot" data-dim="3"/);
  assert.match(html, /<pre class="plot-src">/);
  assert.match(html, /<figcaption>Sólido <span class="tex"/);
});

test("el empaquetado del HTML descargado es JavaScript válido", async () => {
  const code = await bundleModules((f) => readFile(new URL(`../public/js/${f}`, import.meta.url), "utf8"));
  assert.doesNotThrow(() => new Script(code));
  assert.doesNotMatch(code, /^\s*(import|export)\s/m);
});
