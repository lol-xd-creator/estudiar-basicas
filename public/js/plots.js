// Monta los gráficos de un contenedor ya renderizado (figure.plot con su
// especificación en un <pre>). Al volver a renderizar el mismo contenedor
// (la vista previa mientras se escribe), los gráficos que no cambiaron se
// reutilizan: no se redibujan y conservan el giro o el zoom.
import { parseSpec } from "./plotspec.js";
import { Plot2D } from "./plot2d.js";
import { Plot3D } from "./plot3d.js";

const live = new Set();

export function mountPlots(root) {
  const prev = root.__plots || new Map();
  const next = new Map();
  const keep = (key, fig) => {
    if (!next.has(key)) next.set(key, []);
    next.get(key).push(fig);
  };
  for (const fig of root.querySelectorAll("figure.plot")) {
    if (fig.__plot) continue;
    const src = fig.querySelector(".plot-src")?.textContent ?? "";
    const key = fig.dataset.dim + "\n" + src;
    const old = prev.get(key)?.shift();
    if (old) {
      old.dataset.line = fig.dataset.line || "";
      fig.replaceWith(old);
      keep(key, old);
      continue;
    }
    mount(fig, src);
    keep(key, fig);
  }
  for (const list of prev.values()) for (const fig of list) unmount(fig);
  root.__plots = next;
  watchTheme();
}

function mount(fig, src) {
  const pre = fig.querySelector(".plot-src");
  if (pre) pre.hidden = true;
  const caption = fig.querySelector("figcaption");
  try {
    const spec = parseSpec(src, Number(fig.dataset.dim) === 3 ? 3 : 2);
    fig.__plot = spec.dim === 3 ? new Plot3D(fig, spec) : new Plot2D(fig, spec);
  } catch (e) {
    console.error(e);
    const err = document.createElement("div");
    err.className = "plot-errors";
    err.textContent = "No se pudo dibujar: " + e.message;
    fig.append(err);
    fig.__plot = { draw() {}, resize() {} };
  }
  if (caption) fig.append(caption);
  let width = fig.clientWidth;
  fig.__ro = new ResizeObserver(() => {
    const w = fig.clientWidth;
    if (w && Math.abs(w - width) > 1) {
      width = w;
      fig.__plot.resize();
    }
  });
  fig.__ro.observe(fig);
  live.add(fig);
}

function unmount(fig) {
  fig.__ro?.disconnect();
  live.delete(fig);
}

// Redibujar todo al cambiar de tema o cuando terminan de cargar las fuentes
// (los nombres de los ejes usan la letra de las notas).
let watching = false;
function watchTheme() {
  if (watching) return;
  watching = true;
  const redraw = () => {
    for (const fig of live) {
      if (!fig.isConnected) unmount(fig);
      else fig.__plot.draw();
    }
  };
  new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.fonts?.ready.then(redraw, () => {});
  document.addEventListener("fullscreenchange", () => {
    for (const fig of live) if (fig.isConnected) fig.__plot.resize();
  });
}
