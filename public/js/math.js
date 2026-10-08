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

// Clave del caché: las centradas dependen del ancho (de a 40 px).
function keyOf(el) {
  const tex = el.textContent;
  if (el.dataset.d !== "1") return "I:" + tex;
  return `D${Math.round((el.parentElement?.clientWidth || 0) / 40)}:` + tex;
}

// typesetMath reemplaza los marcadores de root; devuelve una promesa que se
// cumple cuando terminó de dibujar los nuevos.
export function typesetMath(root) {
  // Mientras se mide, los recuadros de resultado ocupan todo el ancho (si no,
  // MathJax partiría la fórmula al ancho del código sin dibujar).
  root.classList.add("mjx-measuring");
  const pending = [];
  for (const el of root.querySelectorAll("span.tex")) {
    const key = keyOf(el);
    const hit = cache.get(key);
    if (hit) el.replaceWith(hit.cloneNode(true));
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
  }
  await MJ.typesetPromise(live);
  for (const el of live) {
    const out = el.querySelector("mjx-container");
    if (!out) continue;
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
