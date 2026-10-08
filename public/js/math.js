// Fórmulas con MathJax 4 y la fuente Pagella (de la misma familia que el
// texto, Palatino).
//
// render.js no dibuja las fórmulas: deja un marcador por cada una,
//   <span class="tex" data-d="1">\int_a^b f(x)\,\dx</span>
// y typesetMath(raíz) los reemplaza. Lo que ya se dibujó antes sale de un
// caché al instante (al escribir, solo se dibuja la fórmula que cambió); lo
// nuevo lo dibuja MathJax en segundo plano. Las fórmulas centradas se parten
// en renglones según el ancho disponible, así que se guardan por ancho.
//
// En el HTML descargado no hay MathJax: el caché viene precargado
// (window.__MATH_SEED) con todo lo que hace falta.

const cache = new Map();
let queue = Promise.resolve();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const mathHTML = (tex, display) => `<span class="tex" data-d="${display ? 1 : 0}">${esc(tex)}</span>`;

// Clave del caché. Las centradas dependen de cuántos em entran a lo ancho
// (de a 2.5 em, unos 40 px con la letra normal): MathJax las corta según
// eso, así que también cuenta el tamaño de letra.
function keyOf(el) {
  const tex = el.textContent;
  if (el.dataset.d !== "1") return "I:" + tex;
  const box = el.parentElement;
  const em = (box && parseFloat(getComputedStyle(box).fontSize)) || 16;
  return `D${Math.round((box?.clientWidth || 0) / em / 2.5)}:` + tex;
}

// Una nota puede definir atajos con \newcommand. Para MathJax valen en toda
// la página, así que las fórmulas de una nota con definiciones se guardan
// aparte (la clave lleva las definiciones) y, si hay algo nuevo que
// dibujar, las definiciones vuelven a pasar por MathJax antes (otra nota
// puede haber usado los mismos nombres).
const DEFINES = /\\(?:newcommand|renewcommand|def|let|DeclareMathOperator)(?![a-zA-Z])/;
const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
};

// typesetMath reemplaza los marcadores de root; devuelve una promesa que se
// cumple cuando terminó de dibujar los nuevos.
export function typesetMath(root) {
  // Mientras se mide, los recuadros de resultado ocupan todo el ancho (si no,
  // MathJax partiría la fórmula al ancho del código sin dibujar).
  root.classList.add("mjx-measuring");
  const marks = [...root.querySelectorAll("span.tex")];
  const defs = marks.filter((el) => DEFINES.test(el.textContent)).map((el) => el.textContent);
  const scope = defs.length ? hash(defs.join("\n")) + "|" : "";
  const keyed = marks.map((el) => [el, scope + keyOf(el)]);
  const missing = keyed.some(([, key]) => !cache.has(key));
  const pending = [];
  for (const [el, key] of keyed) {
    const hit = cache.get(key);
    if (hit && !(missing && DEFINES.test(el.textContent))) el.replaceWith(hit.cloneNode(true));
    else {
      el.dataset.key = key;
      pending.push(el);
    }
  }
  if (!pending.length || !globalThis.MathJax?.startup?.promise) {
    root.classList.remove("mjx-measuring");
    return Promise.resolve();
  }
  queue = queue
    .then(() => draw(pending))
    .catch((e) => console.error("MathJax:", e))
    .finally(() => root.classList.remove("mjx-measuring"));
  return queue;
}

async function draw(list) {
  const MJ = globalThis.MathJax;
  await MJ.startup.promise;
  const live = list.filter((el) => el.isConnected);
  if (!live.length) return;
  for (const el of live) {
    const tex = el.textContent;
    el.dataset.tex = tex;
    el.textContent = el.dataset.d === "1" ? `\\[${tex}\\]` : `\\(${tex}\\)`;
    // MathJax ajusta el tamaño de la fórmula a la letra que la rodea: el
    // marcador tiene que tener la del texto, no la monoespaciada.
    el.classList.add("is-drawing");
  }
  // En los pasos, una matriz (o cualquier \begin…\end) no se parte: MathJax
  // mide la celda angosta de la grilla y apretaba las columnas hasta
  // encimarlas. Esas se arman sin límite de ancho; la grilla scrollea.
  const wide = live.filter((el) => el.closest(".pasos") && /\\begin\{/.test(el.dataset.tex));
  for (const el of wide) {
    const out = await MJ.tex2chtmlPromise(el.dataset.tex, { ...MJ.getMetricsFor(el, el.dataset.d === "1"), containerWidth: 1e5 });
    el.replaceChildren(out);
  }
  // Agrega a la hoja de estilos los caracteres que usaron esas fórmulas.
  if (wide.length) MJ.startup.document.updateDocument();
  await MJ.typesetPromise(live.filter((el) => !wide.includes(el)));
  for (const el of live) {
    let out = el.querySelector("mjx-container");
    // Con una llave sin cerrar (\frac{1}{ a medio escribir) MathJax no
    // encuentra dónde termina la fórmula y la deja como texto: se convierte
    // directo, así se ve el error.
    if (!out) {
      out = await MJ.tex2chtmlPromise(el.dataset.tex, MJ.getMetricsFor(el, el.dataset.d === "1"));
      el.replaceChildren(out);
    }
    out.dataset.tex = el.dataset.tex;
    if (cache.size > 5000) cache.clear();
    cache.set(el.dataset.key, out.cloneNode(true));
    el.replaceWith(out);
  }
  // Las fórmulas ya quedaron en la página; MathJax no necesita recordarlas.
  MJ.startup.document.clear();
}

// mathError: mensaje de error de LaTeX dentro de root (o null).
export const mathError = (root) => root.querySelector("mjx-merror")?.getAttribute("data-mjx-error") || null;

// Para el HTML descargado: exportar y precargar el caché.
export const mathEntries = () => Object.fromEntries([...cache].map(([k, el]) => [k, el.outerHTML]));
function seed(entries) {
  if (!entries) return;
  const t = document.createElement("template");
  for (const [k, html] of Object.entries(entries)) {
    t.innerHTML = html;
    cache.set(k, t.content.firstElementChild);
  }
}
seed(globalThis.__MATH_SEED);

// Copiar: las fórmulas van al portapapeles como LaTeX ($…$ o $$…$$).
document.addEventListener("copy", (e) => {
  const sel = getSelection();
  if (!sel?.rangeCount) return;
  const range = sel.getRangeAt(0);
  const host = range.commonAncestorContainer;
  const inside = (host.nodeType === 1 ? host : host.parentElement)?.closest("mjx-container");
  const frag = range.cloneContents();
  if (!inside && !frag.querySelector("mjx-container")) return;
  const asTeX = (c) => (c.getAttribute("display") === "true" ? `$$${c.dataset.tex}$$` : `$${c.dataset.tex}$`);
  let text;
  if (inside) text = asTeX(inside);
  else {
    for (const c of frag.querySelectorAll("mjx-container")) c.replaceWith(asTeX(c));
    text = frag.textContent;
  }
  e.clipboardData.setData("text/plain", text);
  e.preventDefault();
});
