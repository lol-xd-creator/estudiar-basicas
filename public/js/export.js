// Descarga todo el mapa como un único HTML autocontenido: árbol, todas las
// notas ya renderizadas (fórmulas incluidas), imágenes y fuentes de MathJax
// embebidas en base64, los estilos y los dos temas (día / noche). Lleva
// también el motor de gráficos y las demostraciones paso a paso, así que
// los gráficos se pueden girar igual que en la app. Funciona sin internet.
import { api } from "./api.js";
import { renderNote } from "./render.js";
import { bundleModules } from "./bundle.js";
import { typesetMath, mathHTML, mathEntries } from "./math.js";
import { parseSpec } from "./plotspec.js";
import { labelFormulas } from "./plotcommon.js";
import { parseCircuit, circuitLabels } from "./circuitspec.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const noScriptEnd = (s) => s.replace(/<\/script/gi, "<\\/script");

async function toDataURL(url) {
  const blob = await (await fetch(url)).blob();
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(blob);
  });
}

// treeHTML arma el árbol con las mismas clases que la app.
function treeHTML(kids, parentId, depth) {
  const items = kids.get(parentId) || [];
  if (!items.length) return "";
  return (
    "<ul>" +
    items
      .map((n) => {
        const has = (kids.get(n.id) || []).length > 0;
        return (
          `<li data-id="${n.id}"${has ? ' class="closed"' : ""}>` +
          `<div class="row" data-id="${n.id}" style="--depth:${depth}">` +
          `<span class="twisty${has ? "" : " is-leaf"}">${has ? "▸" : ""}</span>` +
          `<span class="icon">${has ? ICON_FOLDER : ICON_DOC}</span>` +
          `<span class="label">${esc(n.title)}</span></div>` +
          treeHTML(kids, n.id, depth + 1) +
          "</li>"
        );
      })
      .join("") +
    "</ul>"
  );
}

// El CSS de MathJax (el de las fórmulas ya dibujadas) con sus fuentes
// embebidas. Hay que llamarla después de dibujar todo: las fuentes se cargan
// a medida que las fórmulas las usan. Las reglas de los símbolos que se
// cargan sobre la marcha se agregan con insertRule, y no aparecen en el
// textContent de la hoja: por eso se lee cssRules.
async function mathCSS() {
  let css = [...window.MathJax.chtmlStylesheet().sheet.cssRules].map((r) => r.cssText).join("\n");
  const urls = [...new Set([...css.matchAll(/url\(\s*["']?([^"')]+\.woff2)["']?\s*\)/g)].map((m) => m[1]))];
  for (const u of urls) {
    const data = await toDataURL(u);
    css = css.split(u).join(data);
  }
  return css;
}

export async function downloadMap(onProgress = () => {}) {
  onProgress("Preparando…");
  const list = await api.tree();
  const kids = new Map();
  for (const n of list) {
    const p = n.parent_id || null;
    if (!kids.has(p)) kids.set(p, []);
    kids.get(p).push(n);
  }
  for (const arr of kids.values()) arr.sort((a, b) => a.position - b.position);
  const byTitle = new Map(list.map((n) => [n.title.trim().toLowerCase(), n.id]));
  const pathOf = (id) => {
    const out = [];
    for (let n = list.find((x) => x.id === id); n; n = list.find((x) => x.id === n.parent_id)) out.unshift(n);
    return out;
  };

  // Notas renderizadas, con imágenes en base64, ids únicos y [[links]] resueltos.
  const images = new Map();
  const sections = [];
  const formulas = new Set(); // fórmulas de etiquetas de gráficos
  // Las notas se dibujan fuera de pantalla, armadas como en la página
  // descargada (.view > .doc > .md, con la letra normal) y con el ancho de
  // la vista actual: las fórmulas centradas se parten en renglones según
  // cuántos em entran a lo ancho.
  const stage = document.createElement("div");
  stage.className = "view";
  stage.style.cssText =
    "position:absolute;left:-99999px;top:0;height:auto;visibility:hidden;--doc-scale:1;" +
    `width:${document.getElementById("view")?.clientWidth || 900}px`;
  stage.innerHTML = '<article class="doc"><div class="md"></div></article>';
  document.body.append(stage);
  const div = stage.querySelector(".md");
  let i = 0;
  for (const n of list) {
    onProgress(`Notas ${++i}/${list.length}…`);
    const note = await api.get(n.id);
    div.innerHTML = renderNote(note.content).html;
    await typesetMath(div);
    for (const pre of div.querySelectorAll("figure.plot .plot-src")) {
      const dim = pre.closest("figure").dataset.dim;
      let texts;
      if (dim === "c") texts = circuitLabels(parseCircuit(pre.textContent)); // incluye las corrientes calculadas
      else {
        const spec = parseSpec(pre.textContent, Number(dim) === 3 ? 3 : 2);
        texts = [spec.opts.titulo, ...spec.items.flatMap((it) => [it.label, it.text])];
      }
      for (const t of texts) if (t) for (const f of labelFormulas(t)) formulas.add(f);
    }
    const pre = `n${i}-`;
    for (const el of div.querySelectorAll("[id]")) el.id = pre + el.id;
    for (const el of div.querySelectorAll("[data-target]")) el.dataset.target = pre + el.dataset.target;
    for (const a of div.querySelectorAll('a.ref[href^="#"]')) a.setAttribute("href", "#" + pre + a.getAttribute("href").slice(1));
    for (const img of div.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      if (!src || src.startsWith("data:")) continue;
      if (!images.has(src)) {
        try {
          images.set(src, await toDataURL(src));
        } catch {
          images.set(src, src);
        }
      }
      img.setAttribute("src", images.get(src));
    }
    for (const a of div.querySelectorAll("a.wikilink")) {
      const id = byTitle.get(a.dataset.noteTitle.trim().toLowerCase());
      if (id) a.setAttribute("href", "#" + id);
    }
    const children = (kids.get(n.id) || []).map((k) => `<li><a href="#${k.id}">${esc(k.title)}</a></li>`).join("");
    const crumbs = pathOf(n.id)
      .map((p) => `<a href="#${p.id}">${esc(p.title)}</a>`)
      .join('<span class="crumb-sep">/</span>');
    const body = div.innerHTML;
    sections.push(
      `<section class="note-x" id="${n.id}" data-crumbs="${esc(crumbs)}" hidden>` +
        `<article class="doc"><h1 class="doc-title">${esc(n.title)}</h1><div class="md">${body}</div>` +
        (children ? `<nav class="children"><h2>Subnotas</h2><ul>${children}</ul></nav>` : "") +
        `</article></section>`,
    );
  }

  stage.remove();

  // Fórmulas de las etiquetas de los gráficos: se dibujan acá y viajan en el
  // HTML (la página descargada no lleva MathJax).
  onProgress("Fórmulas de los gráficos…");
  const labels = document.createElement("div");
  labels.className = "md";
  labels.style.cssText = "position:absolute;left:-99999px;visibility:hidden";
  labels.innerHTML = [...formulas].map((f) => mathHTML(f, false)).join(" ");
  document.body.append(labels);
  await typesetMath(labels);
  labels.remove();
  const seed = Object.fromEntries(Object.entries(mathEntries()).filter(([k]) => k.startsWith("I:") && formulas.has(k.slice(2))));

  onProgress("Estilos y fuentes…");
  const text = (u) => fetch(u).then((r) => r.text());
  const css = [await mathCSS(), ...(await Promise.all(["styles.css", "math.css", "themes.css"].map(text)))].join("\n");
  onProgress("Gráficos…");
  const modules = await bundleModules((f) => text("js/" + f));
  const theme = document.documentElement.dataset.theme || "noche";
  const first = (kids.get(null) || [])[0]?.id || "";

  const html = `<!doctype html>
<html lang="es" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Estudiar matemática · mapa completo</title>
<script>try{var t=localStorage.getItem("matematica.export.theme");if(t==="noche"||t==="dia")document.documentElement.dataset.theme=t}catch(e){}</script>
<style>${css}
${EXTRA_CSS}</style>
</head>
<body>
<div class="app" id="app">
  <aside class="side" aria-label="Mapa">
    <header class="side-head">
      <span class="brand"><span class="brand-mark">∫</span> Estudiar matemática</span>
      <div class="theme-toggle" role="group" aria-label="Tema">
        <button type="button" data-theme-set="dia" title="Día">☀</button>
        <button type="button" data-theme-set="noche" title="Noche">☾</button>
      </div>
      <button type="button" class="btn-icon" id="side-hide" title="Esconder el mapa">«</button>
    </header>
    <div class="side-tools">
      <span class="spacer"></span>
      <button type="button" class="btn-icon" id="expand-all" title="Desplegar todo">⊞</button>
      <button type="button" class="btn-icon" id="collapse-all" title="Plegar todo">⊟</button>
    </div>
    <nav class="tree" id="tree">${treeHTML(kids, null, 0)}</nav>
  </aside>
  <div class="splitter"></div>
  <main class="main">
    <div class="note">
      <header class="note-head">
        <button type="button" class="btn-icon side-show" id="side-show" title="Mostrar el mapa">☰</button>
        <nav class="crumbs" id="crumbs"></nav>
      </header>
      <div class="view" id="view">${sections.join("\n")}</div>
    </div>
  </main>
</div>
<script>window.__MATH_SEED = ${noScriptEnd(JSON.stringify(seed))};</script>
<script>${noScriptEnd(modules)}</script>
<script>
(${RUNTIME.toString()})(${JSON.stringify(first)});
</script>
</body>
</html>`;

  onProgress("Descargando…");
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "estudiar-matematica.html";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  onProgress("");
}

const EXTRA_CSS = `
.view { display: block; justify-items: normal; }
.note-x[hidden] { display: none !important; }
.tree li.closed > ul { display: none; }
.row { cursor: pointer; }
`;

// RUNTIME corre dentro del HTML descargado (se serializa con toString:
// no puede usar nada de este módulo).
function RUNTIME(first) {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const html = document.documentElement;

  // Tema
  const syncTheme = () => $$("[data-theme-set]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeSet === html.dataset.theme)));
  $$("[data-theme-set]").forEach((b) =>
    b.addEventListener("click", () => {
      html.dataset.theme = b.dataset.themeSet;
      try {
        localStorage.setItem("matematica.export.theme", b.dataset.themeSet);
      } catch (e) {}
      syncTheme();
    }),
  );
  syncTheme();

  // En el celular el mapa es un panel encima de la nota (como en la app):
  // arranca cerrado y se cierra al elegir una nota.
  const phone = () => matchMedia("(max-width: 700px)").matches;
  if (phone()) $("#app").classList.add("side-hidden");

  // Árbol
  const setOpen = (li, open) => {
    li.classList.toggle("closed", !open);
    const t = $(":scope > .row .twisty", li);
    if (t && !t.classList.contains("is-leaf")) t.textContent = open ? "▾" : "▸";
  };
  $("#tree").addEventListener("click", (e) => {
    const row = e.target.closest(".row");
    if (!row) return;
    const li = row.parentElement;
    if (e.target.closest(".twisty")) setOpen(li, li.classList.contains("closed"));
    else {
      location.hash = row.dataset.id;
      if (phone()) $("#app").classList.add("side-hidden");
    }
  });
  $("#expand-all").addEventListener("click", () => $$("#tree li").forEach((li) => $(":scope > ul", li) && setOpen(li, true)));
  $("#collapse-all").addEventListener("click", () => $$("#tree li").forEach((li) => $(":scope > ul", li) && setOpen(li, false)));

  // Mostrar / esconder el mapa
  $("#side-hide").addEventListener("click", () => $("#app").classList.add("side-hidden"));
  $("#side-show").addEventListener("click", () => $("#app").classList.remove("side-hidden"));

  // Demostraciones paso a paso y citas
  if (window.__enhance) window.__enhance(document);

  // Navegación por hash (los gráficos se montan al mostrar cada nota)
  function show() {
    const id = decodeURIComponent(location.hash.slice(1)) || first;
    const sec = document.getElementById(id);
    if (!sec || !sec.classList.contains("note-x")) return;
    $$(".note-x").forEach((s) => (s.hidden = s !== sec));
    $("#crumbs").innerHTML = sec.dataset.crumbs;
    $$(".row").forEach((r) => r.classList.toggle("is-selected", r.dataset.id === id));
    for (let li = $('#tree li[data-id="' + id + '"]'); li; li = li.parentElement.closest("li")) {
      if (li.dataset.id !== id) setOpen(li, true);
    }
    $("#view").scrollTop = 0;
    document.title = sec.querySelector(".doc-title").textContent + " · Estudiar matemática";
    if (window.__mountPlots) window.__mountPlots(sec);
  }
  window.addEventListener("hashchange", show);
  show();
}

const ICON_FOLDER = `<svg viewBox="0 0 16 16"><path d="M1.5 3.5h4.2l1.5 1.6h7.3v7.4h-13z"/></svg>`;
const ICON_DOC = `<svg viewBox="0 0 16 16"><path d="M3.5 1.5h6l3 3v10h-9z"/><path d="M9.5 1.5v3h3M5.5 8h5M5.5 10.5h5"/></svg>`;
