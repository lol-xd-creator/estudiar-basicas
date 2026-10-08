// Markdown → HTML para notas de matemática.
//
// markdown-it (sin HTML crudo), cargado como global desde /vendor. Las
// fórmulas quedan como marcadores que dibuja MathJax (ver math.js).
// Extras sobre el Markdown estándar:
//
//   $…$  \(…\)              fórmula en el texto
//   $$…$$  \[…\]  ```math    fórmula centrada; con \label{clave} se numera
//   \eqref{clave}  \ref{c}   cita "(n)" (al pasar el mouse muestra la ecuación)
//   ::: pasos                cadena de igualdades alineadas, una por renglón,
//   = … // justificación     con la justificación a la derecha
//   :::
//   ::: teorema Nombre {#c}  teorema, lema, proposicion, corolario, definicion,
//   :::                      demostracion, idea, ejemplo, ejercicio, solucion,
//                            propiedad, observacion, claves, resultado, ojo,
//                            aclaracion (las cajas se pueden anidar)
//   ```grafico / ```grafico3d   gráficos (ver plotspec.js)
//   ![texto|60%](url)        imagen con ancho; |invertir la oscurece de noche
//   [[Título de otra nota]]  link a otra nota del árbol
//
// renderNote(src) → { html, headings }; después de insertar el HTML hay que
// llamar a typesetMath (math.js) para dibujar las fórmulas.
import { mathHTML } from "./math.js";

const md = window.markdownit({ html: false, linkify: true, breaks: true, typographer: false });

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lineAttr = (t) => (t.map ? ` data-line="${t.map[0]}"` : "");

// ---------- fórmulas ----------

// Cambia \eqref{c} / \ref{c} dentro de una fórmula por su número, con
// atributos para el popup y el salto a la ecuación citada.
function prepare(src, env) {
  return src.replace(/\\(eq)?ref\{([^}]*)\}/g, (_, eq, k) => {
    const r = env.refs[k.trim()];
    if (!r) return eq ? "\\text{(?)}" : "\\text{??}";
    const text = r.eq && eq ? `(${r.label})` : r.label;
    return `\\data{ref=${k.trim().replace(/[,=]/g, "")},target=${r.id}}{\\text{${text}}}`;
  });
}

export function tex(src, display, env = newEnv()) {
  return mathHTML(prepare(src, env), display);
}

function newEnv() {
  return { refs: {}, headings: [], counters: {} };
}

// Bloque $$ … $$ (o \[ … \]).
md.block.ruler.before(
  "fence",
  "math_block",
  (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) return false;
    const first = state.src.slice(start, max);
    const close = first.startsWith("$$") ? "$$" : first.startsWith("\\[") ? "\\]" : null;
    if (!close) return false;
    const rest = first.slice(2);
    let content;
    let next = startLine;
    const same = rest.indexOf(close);
    if (same >= 0) {
      if (rest.slice(same + 2).trim()) return false; // $$a$$ seguido de texto: es inline
      content = rest.slice(0, same);
    } else {
      const lines = [rest];
      let found = false;
      while (++next < endLine) {
        const s = state.bMarks[next] + state.tShift[next];
        const e = state.eMarks[next];
        if (s < e && state.sCount[next] < state.blkIndent) break;
        const line = state.src.slice(s, e);
        const k = line.indexOf(close);
        if (k >= 0 && !line.slice(k + 2).trim()) {
          lines.push(line.slice(0, k));
          found = true;
          break;
        }
        lines.push(line);
      }
      if (!found) return false;
      content = lines.join("\n");
    }
    if (silent) return true;
    const token = state.push("math_block", "div", 0);
    token.block = true;
    token.content = content;
    token.map = [startLine, next + 1];
    state.line = next + 1;
    return true;
  },
  { alt: ["paragraph", "reference", "blockquote", "list"] },
);

// $…$, $$…$$ dentro del texto, \(…\), \[…\] y \ref / \eqref fuera de fórmulas.
md.inline.ruler.before("escape", "math_inline", (state, silent) => {
  const src = state.src;
  const pos = state.pos;
  const push = (content, display, end) => {
    if (!silent) {
      const t = state.push("math_inline", "math", 0);
      t.content = content;
      t.meta = { display };
    }
    state.pos = end;
    return true;
  };
  if (src[pos] === "\\") {
    const nx = src[pos + 1];
    if (nx === "(" || nx === "[") {
      const close = nx === "(" ? "\\)" : "\\]";
      const end = src.indexOf(close, pos + 2);
      if (end < 0) return false;
      return push(src.slice(pos + 2, end), nx === "[", end + 2);
    }
    const ref = src.slice(pos).match(/^\\(eq)?ref\{([^}]+)\}/);
    if (ref) {
      if (!silent) {
        const t = state.push("texref", "a", 0);
        t.meta = { key: ref[2].trim(), eq: !!ref[1] };
      }
      state.pos = pos + ref[0].length;
      return true;
    }
    return false;
  }
  if (src[pos] !== "$") return false;
  if (src[pos + 1] === "$") {
    const end = src.indexOf("$$", pos + 2);
    if (end < 0 || end === pos + 2) return false;
    return push(src.slice(pos + 2, end), true, end + 2);
  }
  if (/\s/.test(src[pos + 1] || " ")) return false;
  let end = pos + 1;
  for (;;) {
    end = src.indexOf("$", end);
    if (end < 0) return false;
    if (src[end - 1] === "\\") {
      end++;
      continue;
    }
    break;
  }
  if (end === pos + 1 || /\s/.test(src[end - 1]) || /\d/.test(src[end + 1] || "")) return false;
  return push(src.slice(pos + 1, end), false, end + 1);
});

md.renderer.rules.math_inline = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  return t.meta.display ? `<span class="math-display is-inline">${tex(t.content, true, env)}</span>` : tex(t.content, false, env);
};
md.renderer.rules.math_block = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  const id = t.meta?.anchor ? ` id="${t.meta.anchor}"` : "";
  return `<div class="math-display"${id}${lineAttr(t)}>${tex(t.content, true, env)}</div>\n`;
};
md.renderer.rules.texref = (tokens, idx, _o, env) => {
  const { key, eq } = tokens[idx].meta;
  const r = env.refs[key];
  if (!r) return `<span class="ref-missing" title="No hay ningún \\label{${esc(key)}}">${eq ? "(?)" : "??"}</span>`;
  return `<a href="#${r.id}" class="ref" data-ref="${esc(key)}" data-target="${r.id}">${esc(r.eq && eq ? `(${r.label})` : r.label)}</a>`;
};

// ---------- cajas ::: (anidables) ----------

// [clase, nombre, ¿numerada?, estilo del título]
const BOXES = {
  teorema: ["thm", "Teorema", true], lema: ["thm", "Lema", true],
  proposicion: ["thm", "Proposición", true], corolario: ["thm", "Corolario", true],
  definicion: ["def", "Definición", true],
  propiedad: ["prop", "Propiedad", false], propiedades: ["prop", "Propiedades", false],
  demostracion: ["proof", "Demostración", false], prueba: ["proof", "Demostración", false],
  idea: ["idea", "Idea", false],
  observacion: ["note", "Observación", false], nota: ["note", "Nota", false],
  ejemplo: ["example", "Ejemplo", true], ejercicio: ["exercise", "Ejercicio", true],
  solucion: ["details", "Solución", false], respuesta: ["details", "Respuesta", false], detalle: ["details", "Ver más", false],
  claves: ["key", "Claves", false], clave: ["key", "Clave", false],
  resultado: ["result", "", false], formula: ["result", "", false],
  ojo: ["warning", "Ojo", false], cuidado: ["warning", "Cuidado", false],
  tip: ["tip", "Tip", false],
  aclaracion: ["aside", "Aclaración fuera del apunte", false],
  pasos: ["pasos", "", false],
};
const THM_LIKE = new Set(["thm", "def", "prop"]);
const normKind = (w) => w.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
const OPEN_RE = /^(:{3,})\s*([\p{L}]+)(.*)$/u;

md.block.ruler.before(
  "fence",
  "box",
  (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) return false;
    const m = state.src.slice(start, max).match(OPEN_RE);
    if (!m) return false;
    const kind = normKind(m[2]);
    if (!(kind in BOXES)) return false;
    if (silent) return true;
    // Buscar el cierre contando las cajas que se abren adentro (y sin mirar
    // dentro de bloques de código ```).
    let depth = 1;
    let next = startLine;
    let closed = false;
    let fence = null;
    while (++next < endLine) {
      const s = state.bMarks[next] + state.tShift[next];
      const e = state.eMarks[next];
      if (s < e && state.sCount[next] < state.blkIndent) break;
      const line = state.src.slice(s, e).trim();
      const f = line.match(/^(`{3,}|~{3,})(.*)$/);
      if (f) {
        if (!fence) fence = f[1];
        else if (f[1][0] === fence[0] && f[1].length >= fence.length && !f[2].trim()) fence = null;
        continue;
      }
      if (fence) continue;
      if (/^:{3,}$/.test(line)) {
        if (--depth === 0) {
          closed = true;
          break;
        }
      } else if (OPEN_RE.test(line) && normKind(line.match(OPEN_RE)[2]) in BOXES) depth++;
    }
    let title = m[3].trim();
    let anchor = null;
    const am = title.match(/\{#([\w:.-]+)\}\s*$/);
    if (am) {
      anchor = am[1];
      title = title.slice(0, am.index).trim();
    }
    if (kind === "pasos") {
      const lines = [];
      for (let l = startLine + 1; l < next; l++) lines.push(state.src.slice(state.bMarks[l] + state.tShift[l], state.eMarks[l]));
      const t = state.push("pasos", "div", 0);
      t.block = true;
      t.content = lines.join("\n");
      t.info = title;
      t.map = [startLine, next];
      state.line = next + (closed ? 1 : 0);
      return true;
    }
    const oldParent = state.parentType;
    const oldMax = state.lineMax;
    state.parentType = "box";
    state.lineMax = next;
    const open = state.push("box_open", "div", 1);
    open.block = true;
    open.map = [startLine, next];
    open.meta = { kind, title, anchor };
    state.md.block.tokenize(state, startLine + 1, next);
    const close = state.push("box_close", "div", -1);
    close.block = true;
    close.meta = { kind };
    state.parentType = oldParent;
    state.lineMax = oldMax;
    state.line = next + (closed ? 1 : 0);
    return true;
  },
  { alt: ["paragraph", "reference", "blockquote", "list"] },
);

md.renderer.rules.box_open = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  const { kind, title, num, id } = t.meta;
  const [cls, name] = BOXES[kind];
  const label = num ? `${name} ${num}` : name;
  const titleHTML = title ? md.renderInline(title, env) : "";
  const idAttr = id ? ` id="${id}"` : "";
  if (cls === "details") {
    return `<details class="box details"${idAttr}${lineAttr(t)}><summary><span class="box-kind">${title ? titleHTML : label}</span></summary><div class="box-body">\n`;
  }
  if (cls === "proof") {
    return `<div class="box proof"${idAttr}${lineAttr(t)}><div class="box-title proof-head"><span class="box-kind">${title ? titleHTML : label}</span></div><div class="box-body">\n`;
  }
  let head = "";
  if (label || titleHTML) {
    const sep = !titleHTML ? "" : THM_LIKE.has(cls) && label ? ` <span class="box-name">(${titleHTML})</span>` : label ? `<span class="box-name">. ${titleHTML}</span>` : `<span class="box-name">${titleHTML}</span>`;
    head = `<div class="box-title">${label ? `<span class="box-kind">${esc(label)}</span>` : ""}${sep}</div>`;
  }
  return `<div class="box ${cls}"${idAttr}${lineAttr(t)}>${head}<div class="box-body">\n`;
};
md.renderer.rules.box_close = (tokens, idx) => {
  const cls = BOXES[tokens[idx].meta.kind][0];
  if (cls === "details") return "</div></details>\n";
  if (cls === "proof") return `</div><div class="qed" aria-label="Fin de la demostración">∎</div></div>\n`;
  return "</div></div>\n";
};

// ---------- pasos: igualdades alineadas con justificación ----------

const REL_CMDS = new Set([
  "le", "leq", "ge", "geq", "ne", "neq", "lt", "gt", "approx", "simeq", "equiv", "cong", "sim", "propto",
  "Rightarrow", "Leftarrow", "Leftrightarrow", "iff", "implies", "impliedby", "to", "longrightarrow",
  "Longrightarrow", "subset", "subseteq", "supset", "supseteq", "leqslant", "geqslant", "mapsto", "then", "sii",
]);
const REL_CHARS = "=<>≤≥≠≈⇒⇔→";

// splitRel corta "lhs = rhs" en la primera relación de nivel 0 (fuera de
// llaves y de \left…\right). \overset{…}{=} cuenta como relación.
export function splitRel(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === "\\") {
      const m = s.slice(i + 1).match(/^[a-zA-Z]+/);
      if (!m) {
        i++;
        continue;
      }
      const cmd = m[0];
      if (depth === 0 && REL_CMDS.has(cmd)) return cut(s, i, i + 1 + cmd.length);
      if (depth === 0 && (cmd === "overset" || cmd === "stackrel" || cmd === "underset")) {
        const end = skipGroups(s, i + 1 + cmd.length, 2);
        if (end > 0) {
          const inner = s.slice(i, end);
          const last = inner.match(/\{([^{}]*)\}\s*$/)?.[1]?.trim() || "";
          if (last.length && (REL_CHARS.includes(last) || /^\\[a-zA-Z]+$/.test(last))) return cut(s, i, end);
        }
      }
      if (cmd === "left") depth++;
      else if (cmd === "right") depth--;
      else if (cmd === "begin") depth++;
      else if (cmd === "end") depth--;
      i += cmd.length;
    } else if (depth === 0 && REL_CHARS.includes(c)) {
      let j = i + 1;
      if ((c === "<" || c === ">") && s[j] === "=") j++;
      return cut(s, i, j);
    }
  }
  return { lhs: "", rel: "", rhs: s.trim() };
}
const cut = (s, a, b) => ({ lhs: s.slice(0, a).trim(), rel: s.slice(a, b).trim(), rhs: s.slice(b).trim() });
function skipGroups(s, i, n) {
  for (let g = 0; g < n; g++) {
    while (s[i] === " ") i++;
    if (s[i] !== "{") return -1;
    let d = 0;
    for (; i < s.length; i++) {
      if (s[i] === "{") d++;
      else if (s[i] === "}" && --d === 0) break;
    }
    i++;
  }
  return i;
}

// La justificación va después de "//" (no se confunde con "http://").
function splitJust(line) {
  const m = line.match(/(^|[^:])\/\/(.*)$/);
  if (!m) return [line, ""];
  return [line.slice(0, m.index + m[1].length), m[2].trim()];
}

md.renderer.rules.pasos = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  const raw = t.content.split("\n").filter((l) => l.trim());
  const rows = raw.map((line) => {
    let [math, just] = splitJust(line);
    math = math.replace(/&/g, " ").replace(/\\\\\s*$/, "").trim();
    let tag = "";
    math = math.replace(/\\label\{([^}]*)\}/, (_, k) => {
      const r = env.refs[k.trim()];
      tag = r ? `<span id="${r.id}">(${r.label})</span>` : "";
      return "";
    });
    return { math: math.trim(), just, tag, ...splitRel(math.trim()) };
  });
  let html = `<div class="pasos"${lineAttr(t)}>`;
  if (t.info) html += `<div class="pasos-title">${md.renderInline(t.info, env)}</div>`;
  rows.forEach((r, i) => {
    const justHTML = r.just ? md.renderInline(r.just, env) : "";
    if (!r.math) {
      html += `<div class="paso is-text"><div class="paso-text">${justHTML}</div></div>`;
      return;
    }
    let { lhs, rel, rhs } = r;
    // Una expresión sola seguida de un renglón que empieza con "=": va a la izquierda.
    if (!rel && rows[i + 1]?.rel && !rows[i + 1].lhs) [lhs, rhs] = [rhs, ""];
    const cell = (s) => (s ? tex("\\displaystyle " + s, false, env) : "");
    html +=
      `<div class="paso${!rel && !lhs ? " is-solo" : ""}">` +
      `<div class="paso-lhs">${cell(lhs)}</div>` +
      `<div class="paso-rel">${rel ? tex(rel, false, env) : ""}</div>` +
      `<div class="paso-rhs">${cell(rhs)}</div>` +
      `<div class="paso-just">${justHTML ? `<span>${justHTML}</span>` : ""}</div>` +
      `<div class="paso-tag">${r.tag}</div></div>`;
  });
  return html + "</div>\n";
};

// ---------- gráficos y código ----------

const PLOT2D = new Set(["grafico", "grafica", "plot", "grafico2d", "plot2d"]);
const PLOT3D = new Set(["grafico3d", "grafica3d", "plot3d"]);
const MATH_FENCE = new Set(["math", "latex", "tex"]); // pasan a math_block en "numbering"

md.renderer.rules.fence = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  const lang = normKind(t.info.trim().split(/\s+/)[0] || "");
  const code = t.content.replace(/\n$/, "");
  if (PLOT2D.has(lang) || PLOT3D.has(lang)) {
    const title = code.match(/^\s*t[ií]tulo\s*:\s*(.+)$/im)?.[1];
    return (
      `<figure class="plot" data-dim="${PLOT3D.has(lang) ? 3 : 2}"${lineAttr(t)}>` +
      `<pre class="plot-src">${esc(code)}</pre>` +
      (title ? `<figcaption>${md.renderInline(title, env)}</figcaption>` : "") +
      `</figure>\n`
    );
  }
  return `<figure class="code"${lineAttr(t)}>${lang ? `<figcaption>${esc(lang)}</figcaption>` : ""}<pre><code>${esc(code)}</code></pre></figure>\n`;
};

// ---------- imágenes: ![texto|60%|invertir](url) ----------

md.renderer.rules.image = (tokens, idx, _o, env) => {
  const t = tokens[idx];
  const [alt, ...flags] = md.renderer.renderInlineAsText(t.children, {}, env).split("|").map((s) => s.trim());
  let style = "";
  const cls = [];
  for (const f of flags) {
    if (/^\d+(\.\d+)?(%|px)$/.test(f)) style = ` style="width:${f}"`;
    else if (/^invert/i.test(f)) cls.push("is-invert");
  }
  return `<img src="${esc(t.attrGet("src"))}" alt="${esc(alt)}"${cls.length ? ` class="${cls.join(" ")}"` : ""}${style} loading="lazy">`;
};

// ---------- [[links entre notas]] ----------

md.inline.ruler.before("link", "wikilink", (state, silent) => {
  const src = state.src;
  if (src.charCodeAt(state.pos) !== 0x5b || src.charCodeAt(state.pos + 1) !== 0x5b) return false;
  const end = src.indexOf("]]", state.pos + 2);
  if (end < 0) return false;
  const inner = src.slice(state.pos + 2, end);
  if (!inner.trim() || inner.includes("\n")) return false;
  if (!silent) {
    const [target, label] = inner.split("|");
    const tok = state.push("wikilink", "", 0);
    tok.meta = { target: target.trim(), label: (label || target).trim() };
  }
  state.pos = end + 2;
  return true;
});
md.renderer.rules.wikilink = (tokens, idx) => {
  const { target, label } = tokens[idx].meta;
  return `<a href="#" class="wikilink" data-note-title="${esc(target)}">${esc(label)}</a>`;
};

const linkOpen = md.renderer.rules.link_open || ((t, i, o, e, self) => self.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const href = tokens[idx].attrGet("href") || "";
  if (/^https?:/i.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
  }
  return linkOpen(tokens, idx, opts, env, self);
};

// ---------- pasada previa: números, referencias, H) / T), ids ----------

const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "seccion";

// Dentro de un teorema, "H) …" y "T) …" en renglones seguidos son párrafos
// separados (con breaks: true quedarían en uno solo).
const HT_LINE = /\n(?=(?:H|T|Hip[oó]tesis|Tesis)\s*[):])/;
md.core.ruler.after("block", "split_ht", (state) => {
  const out = [];
  const T = state.tokens;
  for (let i = 0; i < T.length; i++) {
    const t = T[i];
    if (t.type === "paragraph_open" && T[i + 1]?.type === "inline" && HT_LINE.test(T[i + 1].content)) {
      const parts = T[i + 1].content.split(HT_LINE);
      for (const part of parts) {
        const o = new state.Token("paragraph_open", "p", 1);
        Object.assign(o, { block: true, map: t.map, level: t.level });
        const inl = new state.Token("inline", "", 0);
        Object.assign(inl, { content: part, map: t.map, level: t.level + 1, children: [] });
        const c = new state.Token("paragraph_close", "p", -1);
        Object.assign(c, { block: true, level: t.level });
        out.push(o, inl, c);
      }
      i += 2;
      continue;
    }
    out.push(t);
  }
  state.tokens = out;
});

md.core.ruler.after("split_ht", "numbering", (state) => {
  const env = state.env;
  let eq = 0;
  const stack = [];
  const used = new Map();
  const uniq = (id) => {
    const n = used.get(id) || 0;
    used.set(id, n + 1);
    return n ? `${id}-${n}` : id;
  };
  state.tokens.forEach((t, i) => {
    if (t.map && ["paragraph_open", "heading_open", "bullet_list_open", "ordered_list_open", "blockquote_open", "table_open", "hr", "code_block"].includes(t.type)) {
      t.attrSet("data-line", String(t.map[0]));
    }
    // ```math es lo mismo que $$ … $$ (también se numera con \label).
    if (t.type === "fence" && MATH_FENCE.has(normKind(t.info.trim().split(/\s+/)[0] || ""))) {
      t.type = "math_block";
      t.content = t.content.replace(/\n$/, "");
    }
    if (t.type === "math_block") {
      t.content = t.content.replace(/\\label\{([^}]*)\}/, (_, k) => {
        const n = ++eq;
        const id = uniq("eq-" + slug(k));
        env.refs[k.trim()] = { label: String(n), id, eq: true };
        t.meta = { anchor: id };
        return /\\tag\*?\{/.test(t.content) ? "" : `\\tag{${n}}`;
      });
    } else if (t.type === "pasos") {
      for (const m of t.content.matchAll(/\\label\{([^}]*)\}/g)) {
        const n = ++eq;
        env.refs[m[1].trim()] = { label: String(n), id: uniq("eq-" + slug(m[1])), eq: true };
      }
    } else if (t.type === "box_open") {
      const [cls, name, numbered] = BOXES[t.meta.kind];
      stack.push(cls);
      if (numbered) {
        const n = (env.counters[name] = (env.counters[name] || 0) + 1);
        t.meta.num = n;
        t.meta.id = uniq(slug(`${name}-${n}`));
        if (t.meta.anchor) env.refs[t.meta.anchor] = { label: `${name} ${n}`, id: t.meta.id };
        const plain = t.meta.title.replace(/\$[^$]*\$/g, "…").replace(/[*_`]/g, "");
        env.headings.push({ level: 4, text: `${name} ${n}${plain ? (THM_LIKE.has(cls) ? ` (${plain})` : `. ${plain}`) : ""}`, id: t.meta.id, kind: cls });
      } else if (t.meta.anchor) {
        t.meta.id = uniq(slug(t.meta.anchor));
        env.refs[t.meta.anchor] = { label: name, id: t.meta.id };
      }
    } else if (t.type === "box_close") {
      stack.pop();
    } else if (t.type === "paragraph_open" && THM_LIKE.has(stack[stack.length - 1])) {
      // H) … / T) … (o Hipótesis: / Tesis:) dentro de un teorema.
      const inl = state.tokens[i + 1];
      const m = inl?.content.match(/^(H|T|Hip[oó]tesis|Tesis)\s*[):]\s*/);
      if (m) {
        const h = m[1][0] === "H";
        t.attrJoin("class", h ? "ht ht-h" : "ht ht-t");
        inl.content = inl.content.slice(m[0].length);
      }
    } else if (t.type === "heading_open") {
      const text = state.tokens[i + 1].content.replace(/\$([^$]*)\$/g, "$1").replace(/[*_`]/g, "");
      const id = uniq(slug(text));
      t.attrSet("id", id);
      env.headings.push({ level: Number(t.tag[1]), text, id });
    }
  });
});

// ---------- API ----------

export function renderNote(src) {
  const text = String(src ?? "");
  const env = newEnv();
  const html = md.render(text, env);
  return { html, headings: env.headings };
}

export { md };
