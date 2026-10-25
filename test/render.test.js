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

test("pasos: los & de una matriz se mantienen; los de alineación, no", () => {
  const { html } = renderNote(R`::: pasos
J &= \begin{vmatrix} a & b \\ c & d \end{vmatrix}
:::`);
  assert.match(html, /a &amp; b/);
  assert.doesNotMatch(html, /J &amp;/);
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

test("bloques de Python: colores, renglones y fuente para ejecutar", async () => {
  const { tokens, highlightPython } = await import("../public/js/pyhighlight.js");
  const kinds = (src) => tokens(src).filter((t) => t.cls).map((t) => `${t.cls}:${t.text}`);
  assert.deepEqual(kinds("def foo(x=[]):\n    return x  # ojo"), ["tk-kw:def", "tk-fn:foo", "tk-op:=", "tk-op::", "tk-kw:return", "tk-com:# ojo"]);
  assert.deepEqual(kinds("print(len('a'), None, 0x1F, 3.5e-2)"), ["tk-bi:print", "tk-bi:len", "tk-str:'a'", "tk-const:None", "tk-num:0x1F", "tk-num:3.5e-2"]);
  assert.deepEqual(kinds("@decorador\nclass Bar(Foo):"), ["tk-dec:@decorador", "tk-kw:class", "tk-cls:Bar", "tk-op::"]);
  // match/case son palabras clave solo como sentencia
  assert.ok(kinds("match x:\n    case 1:").includes("tk-kw:match"));
  assert.ok(!kinds("match = 3").includes("tk-kw:match"));
  // f-strings: la expresión entre llaves va con sus colores
  assert.deepEqual(kinds('f"a{len(b)}c"'), ['tk-str:f"a', "tk-int:{", "tk-bi:len", "tk-int:}", 'tk-str:c"']);
  // un texto de comillas triples ocupa varios renglones y se cierra en cada uno
  const html = highlightPython('s = """uno\ndos"""\nprint(s)');
  assert.equal(html.match(/class="line"/g).length, 3);
  assert.match(html, /<span class="tk-str">dos"""<\/span>/);

  const { html: fig } = renderNote("```python ejemplo.py\nx = 1 < 2\nprint(x)\n```");
  assert.match(fig, /<figure class="code is-python" data-run="1"/);
  assert.match(fig, /<span class="code-title">ejemplo\.py<\/span>/);
  assert.match(fig, /<pre class="code-src" hidden>x = 1 &lt; 2\nprint\(x\)<\/pre>/);
  assert.doesNotMatch(renderNote("```python estatico\nx\n```").html, /data-run/);
  assert.match(renderNote("```pycon\n>>> 1 + 1\n2\n```").html, /<span class="prompt">&gt;&gt;&gt; <\/span>.*<span class="line out">2<\/span>/s);
  assert.match(renderNote("```salida\nhola\n```").html, /class="code is-salida is-term"/);
});

test("preguntas de opción múltiple", () => {
  const { html, headings } = renderNote("::: pregunta ¿Qué imprime?\n- [ ] 1\n- [x] 2\n::: solucion\nPorque sí.\n:::\n:::");
  assert.match(html, /<div class="box question" id="pregunta-1"/);
  assert.match(html, /<li>\[x\] 2<\/li>/);
  assert.match(html, /<details class="box details"/);
  assert.equal(headings[0].text, "Pregunta 1. ¿Qué imprime?");
});

test("links a una sección de otra nota", () => {
  const { html } = renderNote("Ver [[6 · Alcance#4. `global` y `nonlocal`|global]] y [[Otra nota]].");
  assert.match(html, /<a href="#" class="wikilink" data-note-title="6 · Alcance" data-section="4-global-y-nonlocal">global<\/a>/);
  assert.match(html, /<a href="#" class="wikilink" data-note-title="Otra nota">Otra nota<\/a>/);
  // el id del título de destino es el mismo que busca el link
  assert.match(renderNote("## 4. `global` y `nonlocal`").html, /<h2 [^>]*id="4-global-y-nonlocal">/);
});

test("el texto de un link entre notas admite formato", () => {
  const { html } = renderNote("[[Nota#Sección|*when* + `present`]]");
  assert.match(html, /data-section="seccion">\s*<em>when<\/em> \+ <code>present<\/code><\/a>/);
});
