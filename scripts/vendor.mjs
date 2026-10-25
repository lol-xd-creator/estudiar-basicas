// Copia las librerías del navegador desde node_modules a public/vendor.
// Se corre una vez después de `npm install` (npm run vendor); el servidor
// no necesita node_modules para funcionar.
//
// De MathJax 4 se copia el núcleo sin fuente, las extensiones de TeX (se
// cargan solas cuando una fórmula las usa) y la fuente Pagella (tipo
// Palatino, la misma familia que el texto de las notas).
//
// De Pyodide (Python compilado a WebAssembly, para ejecutar los bloques
// ```python) se copia lo justo para correr la biblioteca estándar.
import { cpSync, mkdirSync, rmSync } from "node:fs";

const out = new URL("../public/vendor/", import.meta.url);
const nm = (p) => new URL(`../node_modules/${p}`, import.meta.url);
const copy = (src, dest) => {
  cpSync(nm(src), new URL(dest, out), { recursive: true });
  console.log("vendor:", dest);
};

mkdirSync(out, { recursive: true });
rmSync(new URL("katex/", out), { recursive: true, force: true }); // motor anterior
copy("markdown-it/dist/browser/markdown-it.umd.min.js", "markdown-it.min.js");
copy("mathjax/tex-chtml-nofont.js", "mathjax/tex-chtml-nofont.js");
copy("mathjax/input/tex/extensions", "mathjax/input/tex/extensions");
copy("@mathjax/mathjax-pagella-font/chtml.js", "mathjax-pagella/chtml.js");
copy("@mathjax/mathjax-pagella-font/chtml", "mathjax-pagella/chtml");
for (const f of ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"]) {
  copy(`pyodide/${f}`, `pyodide/${f}`);
}
