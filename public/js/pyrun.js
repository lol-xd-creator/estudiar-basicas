// Botones de los bloques ```python ejecutables: Ejecutar, Editar y
// Restaurar. Python corre en un worker (py-worker.js) que se carga la
// primera vez que se ejecuta algo (unos 13 MB, servidos por la propia app).
// Si un programa tarda demasiado (un bucle infinito), se corta el worker y
// la próxima ejecución arranca uno nuevo.
import { highlightPython } from "./pyhighlight.js";

const TIMEOUT_MS = 10_000;

let worker = null;
let seq = 0;
const pending = new Map();

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL("./py-worker.js", import.meta.url), { type: "module" });
  worker.onmessage = (e) => {
    const p = pending.get(e.data.id);
    if (!p) return;
    pending.delete(e.data.id);
    clearTimeout(p.timer);
    p.resolve(e.data);
  };
  worker.onerror = (e) => {
    e.preventDefault();
    for (const p of pending.values()) {
      clearTimeout(p.timer);
      p.resolve({ fatal: "No se pudo cargar Python: " + (e.message || "error del worker") });
    }
    pending.clear();
    worker?.terminate();
    worker = null;
  };
  return worker;
}

let booted = false; // ya cargó Python una vez (el tiempo de corte no cuenta la carga)

function runPython(code) {
  const id = ++seq;
  const w = getWorker();
  return new Promise((resolve) => {
    const limit = booted ? TIMEOUT_MS : TIMEOUT_MS + 60_000;
    const timer = setTimeout(() => {
      pending.delete(id);
      w.terminate();
      if (worker === w) worker = null;
      booted = false;
      resolve({ timeout: true });
    }, limit);
    pending.set(id, { resolve, timer });
    w.postMessage({ id, code });
  });
}

export function mountPython(root) {
  for (const fig of root.querySelectorAll('figure.code[data-run="1"]')) setup(fig);
}

function button(text, title, cls) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = text;
  b.title = title;
  if (cls) b.className = cls;
  return b;
}

function setup(fig) {
  if (fig.dataset.pyReady) return;
  fig.dataset.pyReady = "1";
  const cap = fig.querySelector(":scope > figcaption");
  const src = fig.querySelector(":scope > .code-src");
  const original = src.textContent;
  const tools = document.createElement("span");
  tools.className = "py-tools";
  const edit = button("Editar", "Modificar el código para probar (Ctrl+Enter ejecuta)", "py-btn");
  const reset = button("Restaurar", "Volver al código original", "py-btn");
  const run = button("▶ Ejecutar", "Ejecutar el código (Ctrl+Enter si lo estás editando)", "py-btn py-run");
  reset.hidden = true;
  tools.append(edit, reset, run);
  cap.append(tools);

  const out = document.createElement("div");
  out.className = "py-out";
  out.hidden = true;

  const current = () => fig.querySelector(":scope > textarea.code-editor")?.value ?? src.textContent;

  const setCode = (code) => {
    src.textContent = code;
    fig.querySelector(":scope > pre:not(.code-src) > code").innerHTML = highlightPython(code);
    reset.hidden = code === original;
  };

  const startEdit = () => {
    const pre = fig.querySelector(":scope > pre:not(.code-src)");
    const ta = document.createElement("textarea");
    ta.className = "code-editor";
    ta.spellcheck = false;
    ta.value = src.textContent;
    ta.setAttribute("autocapitalize", "off");
    ta.setAttribute("autocomplete", "off");
    const fit = () => {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + 2 + "px";
    };
    ta.addEventListener("input", () => {
      fit();
      reset.hidden = ta.value === original;
    });
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        execute();
      } else if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end");
        ta.dispatchEvent(new Event("input"));
      } else if (e.key === "Escape") {
        stopEdit();
      }
    });
    pre.hidden = true;
    pre.after(ta);
    fit();
    ta.focus();
    edit.textContent = "Listo";
    fig.classList.add("is-editing");
  };

  const stopEdit = () => {
    const ta = fig.querySelector(":scope > textarea.code-editor");
    if (!ta) return;
    setCode(ta.value);
    ta.remove();
    fig.querySelector(":scope > pre:not(.code-src)").hidden = false;
    edit.textContent = "Editar";
    fig.classList.remove("is-editing");
  };

  const show = (cls, text, note) => {
    out.hidden = false;
    out.replaceChildren();
    const head = document.createElement("div");
    head.className = "py-out-head";
    head.textContent = note;
    const body = document.createElement("pre");
    body.className = "py-out-body " + cls;
    if (Array.isArray(text)) body.append(...text);
    else body.textContent = text;
    out.append(head, body);
  };

  const execute = async () => {
    if (run.disabled) return;
    run.disabled = true;
    run.textContent = "Ejecutando…";
    if (!booted) show("is-wait", "Cargando Python… (la primera vez tarda unos segundos)", "Salida");
    const res = await runPython(current());
    run.disabled = false;
    run.textContent = "▶ Ejecutar";
    if (res.timeout) return show("is-error", `Se cortó: tardó más de ${TIMEOUT_MS / 1000} s (¿un bucle infinito?).`, "Salida");
    if (res.fatal) return show("is-error", res.fatal, "Salida");
    booted = true;
    const parts = [];
    if (res.out) parts.push(document.createTextNode(res.out));
    if (res.err) {
      const e = document.createElement("span");
      e.className = "py-tb";
      e.textContent = res.err;
      parts.push(e);
    }
    if (!parts.length) parts.push(Object.assign(document.createElement("span"), { className: "py-empty", textContent: "(no imprimió nada)" }));
    show(res.err ? "has-error" : "", parts, `Salida · Python ${res.version} · ${res.ms} ms`);
  };

  edit.addEventListener("click", () => (fig.classList.contains("is-editing") ? stopEdit() : startEdit()));
  reset.addEventListener("click", () => {
    const ta = fig.querySelector(":scope > textarea.code-editor");
    if (ta) {
      ta.value = original;
      ta.dispatchEvent(new Event("input"));
    } else setCode(original);
    reset.hidden = true;
  });
  run.addEventListener("click", execute);
  fig.append(out);
}
