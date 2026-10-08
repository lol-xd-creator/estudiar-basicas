// Arranque y coordinación: árbol a la izquierda, nota a la derecha.
// La nota abierta vive en la URL (#/n/<id>) para que recargar o ir atrás
// funcione. En modo edición se guarda solo (al dejar de escribir) y con Ctrl+S.
import { api } from "./api.js";
import { Tree } from "./tree.js";
import { renderNote } from "./render.js";
import { typesetMath, mathHTML, mathError } from "./math.js";
import { enhance } from "./enhance.js";
import { mountPlots } from "./plots.js";
import { applyFormat, continueList, indent, insertSymbol, mathAt } from "./md-format.js";
import { downloadMap } from "./export.js";

const $ = (id) => document.getElementById(id);
const els = {
  app: $("app"), tree: $("tree"), results: $("results"), search: $("search"),
  placeholder: $("placeholder"), note: $("note"), crumbs: $("crumbs"), status: $("status"),
  view: $("view"), viewTitle: $("view-title"), viewBody: $("view-body"), children: $("children"), toc: $("toc"),
  edit: $("edit"), titleInput: $("title-input"), editor: $("editor"), preview: $("preview"), panes: $("edit-panes"),
  moreBtn: $("more-btn"), moreMenu: $("more-menu"), splitter: $("splitter"),
};

const state = {
  note: null, // nota abierta (con contenido)
  mode: localStorage.getItem("matematica.mode") === "edit" ? "edit" : "view",
  dirty: false,
  saveTimer: 0,
};

// ---------- árbol ----------

const isPhone = () => matchMedia("(max-width: 700px)").matches;

const tree = new Tree(els.tree, {
  onOpen: (id) => {
    if (isPhone()) setSideHidden(true);
    go(id);
  },
  onCreate: (parentId, afterId) => createNote(parentId, afterId),
  onRename: async (id, title) => {
    await flush();
    await api.update(id, { title });
    await reloadTree();
    if (state.note?.id === id) {
      state.note.title = title;
      showNote(state.note, { keepScroll: true });
    }
  },
  onDelete: (id) => deleteNote(id),
  onMove: async (id, parentId, index) => {
    try {
      await api.move(id, parentId, index);
    } catch (e) {
      alert(e.message);
    }
    await reloadTree();
    if (state.note) renderCrumbs(state.note.id);
  },
});

async function reloadTree() {
  tree.setData(await api.tree());
  if (state.note) tree.select(state.note.id);
}

// ---------- abrir y mostrar ----------

function go(id) {
  if (location.hash !== `#/n/${id}`) location.hash = `#/n/${id}`;
  else open(id);
}

async function open(id) {
  if (state.note?.id === id) return;
  await flush();
  let note;
  try {
    note = await api.get(id);
  } catch {
    showEmpty();
    return;
  }
  state.note = note;
  tree.select(id);
  showNote(note);
}

function showEmpty() {
  state.note = null;
  els.note.hidden = true;
  els.placeholder.hidden = false;
  document.title = "Estudiar matemática";
}

function showNote(note, { keepScroll = false } = {}) {
  els.placeholder.hidden = true;
  els.note.hidden = false;
  document.title = `${note.title} · Estudiar matemática`;
  renderCrumbs(note.id);
  if (state.mode === "view") renderView(note, keepScroll);
  else {
    els.titleInput.value = note.title;
    if (els.editor.value !== note.content) {
      els.editor.value = note.content;
      els.editor.setSelectionRange(0, 0);
      els.editor.scrollTop = 0;
    }
    renderPreview();
  }
  applyMode();
  setStatus("");
}

function renderCrumbs(id) {
  const path = tree.path(id);
  els.crumbs.replaceChildren(
    ...path.flatMap((n, i) => {
      const a = document.createElement("a");
      a.href = `#/n/${n.id}`;
      a.textContent = n.title;
      if (i === path.length - 1) a.setAttribute("aria-current", "page");
      return i ? [Object.assign(document.createElement("span"), { className: "crumb-sep", textContent: "/" }), a] : [a];
    }),
  );
}

function renderView(note, keepScroll) {
  const scroll = els.view.scrollTop;
  els.viewTitle.textContent = note.title;
  const { html, headings } = renderNote(note.content);
  els.viewBody.innerHTML = html || `<p class="muted">Nota vacía. Pasá a <b>Editar</b> para escribirla.</p>`;
  typesetMath(els.viewBody);
  enhance(els.viewBody);
  mountPlots(els.viewBody);
  renderChildren(note.id);
  renderToc(headings);
  els.view.scrollTop = keepScroll ? scroll : 0;
  viewWidth = els.viewBody.clientWidth;
}

// Las fórmulas centradas se parten según el ancho: si la ventana cambia
// bastante de ancho, se vuelve a dibujar la nota.
let viewWidth = 0;
let resizeTimer = 0;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (state.note && state.mode === "view" && Math.abs(els.viewBody.clientWidth - viewWidth) >= 40) renderView(state.note, true);
  }, 300);
});

// renderChildren lista las subnotas al pie, para seguir leyendo en orden.
function renderChildren(id) {
  const kids = tree.children(id);
  els.children.hidden = !kids.length;
  if (!kids.length) return els.children.replaceChildren();
  const h = document.createElement("h2");
  h.textContent = "Subnotas";
  const ul = document.createElement("ul");
  for (const k of kids) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#/n/${k.id}`;
    a.textContent = k.title;
    li.append(a);
    ul.append(li);
  }
  els.children.replaceChildren(h, ul);
}

// El índice lista los títulos ## y ### y también los teoremas, definiciones
// y ejemplos numerados (en el orden en que aparecen).
function renderToc(headings) {
  const items = headings.filter((h) => h.level >= 2 && h.level <= 4);
  els.toc.hidden = items.length < 3;
  els.view.classList.toggle("has-toc", items.length >= 3);
  if (items.length < 3) return els.toc.replaceChildren();
  const title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "En esta nota";
  const ul = document.createElement("ul");
  for (const h of items) {
    const li = document.createElement("li");
    li.className = "lv" + h.level + (h.kind ? " is-" + h.kind : "");
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.dataset.anchor = h.id;
    a.textContent = h.text;
    li.append(a);
    ul.append(li);
  }
  els.toc.replaceChildren(title, ul);
}

// Anclas del índice y [[links]] entre notas (sin tocar la URL de la nota).
document.addEventListener("click", (e) => {
  const anchor = e.target.closest('a[href^="#"]:not([href^="#/"]):not(.wikilink):not(.ref)');
  if (anchor) {
    e.preventDefault();
    document.getElementById(decodeURIComponent(anchor.hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const wiki = e.target.closest("a.wikilink");
  if (wiki) {
    e.preventDefault();
    const n = tree.findByTitle(wiki.dataset.noteTitle);
    if (n) go(n.id);
    else setStatus(`No existe la nota «${wiki.dataset.noteTitle}»`, "error");
  }
});

// ---------- modo vista / edición ----------

function setMode(mode) {
  if (mode === state.mode) return;
  state.mode = mode;
  localStorage.setItem("matematica.mode", mode);
  if (state.note) showNote(state.note);
  if (mode === "edit") els.editor.focus({ preventScroll: true });
}

function applyMode() {
  const edit = state.mode === "edit";
  els.view.hidden = edit;
  els.edit.hidden = !edit;
  for (const b of document.querySelectorAll(".seg [data-mode]")) b.setAttribute("aria-selected", String(b.dataset.mode === state.mode));
}

for (const b of document.querySelectorAll(".seg [data-mode]")) b.addEventListener("click", () => setMode(b.dataset.mode));

let previewFrame = 0;
function renderPreview() {
  cancelAnimationFrame(previewFrame);
  previewFrame = requestAnimationFrame(() => {
    if (els.panes.classList.contains("no-preview")) return;
    els.preview.innerHTML = renderNote(els.editor.value).html;
    const drawn = typesetMath(els.preview);
    enhance(els.preview);
    mountPlots(els.preview);
    syncPreview();
    drawn.then(syncPreview);
  });
}

$("toggle-preview").addEventListener("click", () => {
  const off = els.panes.classList.toggle("no-preview");
  localStorage.setItem("matematica.preview", off ? "off" : "on");
  renderPreview();
});
if (localStorage.getItem("matematica.preview") === "off") els.panes.classList.add("no-preview");

// ---------- guardar ----------

function markDirty() {
  state.dirty = true;
  setStatus("Sin guardar…");
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(flush, 900);
}

// flush guarda si hay cambios pendientes.
async function flush() {
  clearTimeout(state.saveTimer);
  if (!state.dirty || !state.note) return;
  state.dirty = false;
  const title = els.titleInput.value.trim() || state.note.title;
  const content = els.editor.value;
  const titleChanged = title !== state.note.title;
  setStatus("Guardando…");
  try {
    state.note = await api.update(state.note.id, { title, content });
    setStatus("Guardado");
    if (titleChanged) {
      await reloadTree();
      renderCrumbs(state.note.id);
      document.title = `${title} · Estudiar matemática`;
    }
  } catch (e) {
    state.dirty = true;
    setStatus("No se pudo guardar: " + e.message, "error");
  }
}

let statusTimer = 0;
function setStatus(text, kind = "") {
  clearTimeout(statusTimer);
  els.status.textContent = text;
  els.status.className = "status " + kind;
  if (text === "Guardado") statusTimer = setTimeout(() => (els.status.textContent = ""), 1800);
}

els.editor.addEventListener("input", () => {
  markDirty();
  renderPreview();
  onCursor();
});
els.titleInput.addEventListener("input", markDirty);
els.titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    els.editor.focus();
  }
});
window.addEventListener("beforeunload", (e) => {
  if (state.dirty) {
    flush();
    e.preventDefault();
  }
});

// ---------- teclado del editor ----------

els.editor.addEventListener("keydown", (e) => {
  const mod = e.ctrlKey || e.metaKey;
  if (e.key === "Tab") {
    e.preventDefault();
    indent(els.editor, e.shiftKey);
  } else if (e.key === "Enter" && !mod && !e.shiftKey) {
    if (continueList(els.editor)) e.preventDefault();
  } else if (mod && !e.shiftKey && e.key.toLowerCase() === "b") {
    e.preventDefault();
    applyFormat(els.editor, "bold");
  } else if (mod && !e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    applyFormat(els.editor, "italic");
  } else if (mod && e.key.toLowerCase() === "m") {
    e.preventDefault();
    applyFormat(els.editor, e.shiftKey ? "display" : "math");
  }
});

// ---------- barra de fórmula y vista previa que sigue al cursor ----------

// Debajo del editor se ve renderizada la fórmula donde está el cursor (o el
// error de LaTeX, si lo hay), sin tener que buscarla en la vista previa.
let cursorFrame = 0;
function onCursor() {
  cancelAnimationFrame(cursorFrame);
  cursorFrame = requestAnimationFrame(() => {
    updateFormulaBar();
    syncPreview();
  });
}

function updateFormulaBar() {
  const bar = $("formula-bar");
  const seg = mathAt(els.editor.value, els.editor.selectionStart);
  if (!seg || !seg.src.trim()) {
    bar.hidden = true;
    return;
  }
  const src = (seg.pasos ? seg.src.replace(/&/g, " ") : seg.src).replace(/\\label\{[^}]*\}/g, "").replace(/\\(eq)?ref\{[^}]*\}/g, "(\\ast)");
  bar.hidden = false;
  bar.classList.remove("is-error");
  bar.innerHTML = mathHTML(src, seg.display);
  typesetMath(bar).then(() => {
    const err = mathError(bar);
    if (!err) return;
    bar.classList.add("is-error");
    bar.textContent = "⚠ " + err;
  });
}

// syncPreview lleva a la vista el bloque que se está editando (los bloques
// renderizados tienen data-line con su renglón de origen).
function syncPreview() {
  if (state.mode !== "edit" || els.panes.classList.contains("no-preview")) return;
  const ta = els.editor;
  const line = ta.value.slice(0, ta.selectionStart).split("\n").length - 1;
  let best = null;
  for (const el of els.preview.querySelectorAll("[data-line]")) {
    if (Number(el.dataset.line) <= line) best = el;
    else break;
  }
  if (!best) return;
  const box = els.preview.getBoundingClientRect();
  const r = best.getBoundingClientRect();
  if (r.top < box.top + 20 || r.top > box.bottom - 60) {
    els.preview.scrollTop += r.top - box.top - box.height * 0.3;
  }
}

for (const ev of ["keyup", "click", "focus"]) els.editor.addEventListener(ev, onCursor);
els.editor.addEventListener("blur", () => setTimeout(() => ($("formula-bar").hidden = document.activeElement !== els.editor), 150));

// Imágenes: pegarlas (Ctrl+V) o arrastrarlas al editor las sube y deja el
// Markdown ![](…) donde está el cursor.
async function insertImages(files) {
  const images = [...files].filter((f) => f.type.startsWith("image/"));
  if (!images.length) return false;
  setStatus("Subiendo imagen…");
  for (const f of images) {
    try {
      const url = await api.upload(f);
      const alt = (f.name || "imagen").replace(/.[^.]+$/, "");
      els.editor.focus();
      document.execCommand("insertText", false, `![${alt}](${url})
`);
    } catch (e) {
      setStatus("No se pudo subir: " + e.message, "error");
      return true;
    }
  }
  setStatus("");
  return true;
}
els.editor.addEventListener("paste", (e) => {
  const files = e.clipboardData?.files;
  if (files?.length && [...files].some((f) => f.type.startsWith("image/"))) {
    e.preventDefault();
    insertImages(files);
  }
});
els.editor.addEventListener("dragover", (e) => {
  if ([...(e.dataTransfer?.items || [])].some((i) => i.kind === "file")) e.preventDefault();
});
els.editor.addEventListener("drop", (e) => {
  const files = e.dataTransfer?.files;
  if (!files?.length) return;
  e.preventDefault();
  // Ubicar el cursor donde se soltó no es posible en un textarea; queda donde estaba.
  insertImages(files);
});

// Click en una imagen de la vista: verla grande. Click o Esc la cierra.
els.viewBody.addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if (!img) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  const big = document.createElement("img");
  big.src = img.src;
  big.alt = img.alt;
  box.append(big);
  const close = () => {
    box.remove();
    document.removeEventListener("keydown", onKey, true);
  };
  const onKey = (ev) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      close();
    }
  };
  box.addEventListener("click", close);
  document.addEventListener("keydown", onKey, true);
  document.body.append(box);
});

for (const b of document.querySelectorAll("[data-fmt]")) {
  b.addEventListener("mousedown", (e) => e.preventDefault()); // no perder la selección
  b.addEventListener("click", () => applyFormat(els.editor, b.dataset.fmt));
}
$("box-select").addEventListener("change", (e) => {
  if (e.target.value) applyFormat(els.editor, e.target.value);
  e.target.value = "";
});
$("symbol-select").addEventListener("change", (e) => {
  if (e.target.value) insertSymbol(els.editor, e.target.value);
  e.target.value = "";
});
$("image-btn").addEventListener("click", () => $("image-file").click());
$("image-file").addEventListener("change", (e) => {
  insertImages(e.target.files);
  e.target.value = "";
});

// ---------- tamaño de letra de la nota ----------

const FONT_KEY = "matematica.fontScale";
function setFontScale(v) {
  const scale = Math.max(0.85, Math.min(1.45, Math.round(v * 100) / 100));
  document.documentElement.style.setProperty("--doc-scale", String(scale));
  try {
    localStorage.setItem(FONT_KEY, String(scale));
  } catch {}
  return scale;
}
let fontScale = setFontScale(Number(localStorage.getItem(FONT_KEY)) || 1);
for (const b of document.querySelectorAll("[data-font]")) {
  b.addEventListener("click", () => (fontScale = setFontScale(fontScale + Number(b.dataset.font) * 0.08)));
}

// Atajos globales.
document.addEventListener("keydown", (e) => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === "s") {
    e.preventDefault();
    flush();
  } else if (mod && e.key.toLowerCase() === "k") {
    e.preventDefault();
    els.search.focus();
    els.search.select();
  } else if (e.key === "Escape" && state.mode === "edit" && !document.querySelector(".ctx-menu") && els.moreMenu.hidden) {
    flush();
    setMode("view");
  } else if (e.key.toLowerCase() === "e" && !mod && state.mode === "view" && state.note && !e.target.closest("input, textarea, select, [contenteditable]")) {
    e.preventDefault();
    setMode("edit");
  }
});

// ---------- crear / borrar / descargar ----------

// createNote crea "Nueva nota" y la abre en edición con el título
// seleccionado, listo para escribir el definitivo.
async function createNote(parentId, afterId) {
  await flush();
  const note = await api.create(parentId || null, "Nueva nota");
  if (afterId) {
    const sibs = tree.children(parentId || null).map((n) => n.id);
    await api.move(note.id, parentId || null, sibs.indexOf(afterId) + 1);
  }
  if (parentId) tree.open.add(parentId);
  await reloadTree();
  state.mode = "edit";
  localStorage.setItem("matematica.mode", "edit");
  await open(note.id);
  location.hash = `#/n/${note.id}`;
  els.titleInput.focus();
  els.titleInput.select();
}

async function deleteNote(id) {
  const n = tree.nodes.get(id);
  const count = (function walk(x) {
    return tree.children(x).reduce((acc, k) => acc + 1 + walk(k.id), 0);
  })(id);
  const msg = count
    ? `¿Eliminar «${n.title}» y sus ${count} subnota${count === 1 ? "" : "s"}? No se puede deshacer.`
    : `¿Eliminar «${n.title}»? No se puede deshacer.`;
  if (!confirm(msg)) return;
  if (state.note?.id === id || tree.path(state.note?.id ?? "").some((x) => x.id === id)) {
    state.dirty = false;
    clearTimeout(state.saveTimer);
  }
  await api.remove(id);
  const wasOpen = state.note && !tree.path(state.note.id).every((x) => x.id !== id);
  await reloadTree();
  if (wasOpen) {
    const parent = n.parent_id;
    state.note = null;
    if (parent) go(parent);
    else {
      location.hash = "";
      showEmpty();
    }
  }
}

function download() {
  const n = state.note;
  if (!n) return;
  const blob = new Blob([`# ${n.title}\n\n${state.mode === "edit" ? els.editor.value : n.content}`], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = n.title.replace(/[\\/:*?"<>|]+/g, "-") + ".md";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// Menú ⋯ de la nota.
function setMenu(open) {
  els.moreMenu.hidden = !open;
  els.moreBtn.setAttribute("aria-expanded", String(open));
  if (open) els.moreMenu.querySelector("button").focus();
}
els.moreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setMenu(els.moreMenu.hidden);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".more")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !els.moreMenu.hidden) {
    setMenu(false);
    els.moreBtn.focus();
  }
});
els.moreMenu.addEventListener("click", (e) => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (!act || !state.note) return;
  setMenu(false);
  if (act === "child") createNote(state.note.id);
  if (act === "download") download();
  if (act === "delete") deleteNote(state.note.id);
});

$("new-root").addEventListener("click", () => createNote(null));
$("download-map").addEventListener("click", async () => {
  await flush();
  try {
    await downloadMap((msg) => setStatus(msg));
  } catch (e) {
    setStatus("No se pudo descargar: " + e.message, "error");
  }
});
$("expand-all").addEventListener("click", () => tree.expandAll(true));
$("collapse-all").addEventListener("click", () => tree.expandAll(false));

// ---------- búsqueda ----------

let searchSeq = 0;
els.search.addEventListener("input", async () => {
  const q = els.search.value.trim();
  const seq = ++searchSeq;
  if (!q) {
    els.results.hidden = true;
    els.tree.hidden = false;
    return;
  }
  const hits = await api.search(q);
  if (seq !== searchSeq) return;
  els.tree.hidden = true;
  els.results.hidden = false;
  if (!hits.length) {
    els.results.innerHTML = `<p class="tree-empty">Sin resultados.</p>`;
    return;
  }
  els.results.replaceChildren(
    ...hits.map((h) => {
      const a = document.createElement("a");
      a.href = `#/n/${h.id}`;
      a.className = "hit";
      const t = document.createElement("span");
      t.className = "hit-title";
      t.textContent = h.title;
      const path = tree.path(h.id).slice(0, -1).map((n) => n.title).join(" / ");
      a.append(t);
      if (path) a.append(Object.assign(document.createElement("span"), { className: "hit-path", textContent: path }));
      if (h.snippet) a.append(Object.assign(document.createElement("span"), { className: "hit-snippet", textContent: h.snippet }));
      return a;
    }),
  );
});
els.search.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    els.search.value = "";
    els.search.dispatchEvent(new Event("input"));
    els.search.blur();
  } else if (e.key === "Enter") {
    els.results.querySelector("a.hit")?.click();
  }
});

// ---------- ancho del árbol ----------

const SIDE_KEY = "matematica.sideWidth";
const setSide = (w) => {
  w = Math.max(200, Math.min(560, Math.round(w)));
  els.app.style.setProperty("--side-w", w + "px");
  return w;
};
setSide(Number(localStorage.getItem(SIDE_KEY)) || 290);
els.splitter.addEventListener("pointerdown", (e) => {
  els.splitter.setPointerCapture(e.pointerId);
  els.app.classList.add("is-resizing");
  const move = (ev) => setSide(ev.clientX);
  const up = (ev) => {
    els.splitter.removeEventListener("pointermove", move);
    els.app.classList.remove("is-resizing");
    localStorage.setItem(SIDE_KEY, setSide(ev.clientX));
  };
  els.splitter.addEventListener("pointermove", move);
  els.splitter.addEventListener("pointerup", up, { once: true });
});
els.splitter.addEventListener("keydown", (e) => {
  const cur = parseInt(getComputedStyle(els.app).getPropertyValue("--side-w"), 10);
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    localStorage.setItem(SIDE_KEY, setSide(cur + (e.key === "ArrowLeft" ? -20 : 20)));
  }
});

// ---------- mostrar / esconder el mapa ----------

function setSideHidden(hidden) {
  els.app.classList.toggle("side-hidden", hidden);
  try {
    localStorage.setItem("matematica.sideHidden", hidden ? "1" : "0");
  } catch {}
}
$("side-hide").addEventListener("click", () => setSideHidden(true));
$("side-show").addEventListener("click", () => setSideHidden(false));
document.addEventListener("keydown", (e) => {
  // Ctrl+B fuera del editor (en el editor es negrita).
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b" && !e.target.closest("textarea, input")) {
    e.preventDefault();
    setSideHidden(!els.app.classList.contains("side-hidden"));
  }
});
try {
  // En el celular el mapa arranca cerrado (se abre con ☰).
  if (isPhone() || localStorage.getItem("matematica.sideHidden") === "1") els.app.classList.add("side-hidden");
} catch {}

// ---------- tema (noche / amanecer) ----------

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("matematica.theme", theme);
  } catch {}
  syncThemeButtons();
}
function syncThemeButtons() {
  const cur = document.documentElement.dataset.theme;
  for (const b of document.querySelectorAll("[data-theme-set]")) b.setAttribute("aria-pressed", String(b.dataset.themeSet === cur));
}
for (const b of document.querySelectorAll("[data-theme-set]")) b.addEventListener("click", () => setTheme(b.dataset.themeSet));
syncThemeButtons();

// ---------- sesión ----------

api.health().then((h) => {
  if (h.auth) $("logout").hidden = false;
});
$("logout").addEventListener("click", async () => {
  await flush();
  await api.logout().catch(() => {});
  location.replace("/login");
});

// ---------- arranque ----------

function route() {
  const m = location.hash.match(/^#\/n\/([\w-]+)/);
  if (m) open(m[1]);
  else if (!location.hash) showEmpty();
}
window.addEventListener("hashchange", route);

(async () => {
  await reloadTree();
  if (location.hash.startsWith("#/n/")) route();
  else {
    const first = tree.children(null)[0];
    if (first) go(first.id);
    else showEmpty();
  }
})();
