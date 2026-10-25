// Resaltado de sintaxis de Python, sin dependencias. Devuelve el código ya
// escapado y partido en renglones (<span class="line">…</span>), con cada
// pieza en un <span class="tk-…">: palabras clave, funciones de fábrica,
// textos, comentarios, números, decoradores y los nombres que se definen
// con def y class. También resalta los renglones de una sesión interactiva
// (>>> / ...), dejando la salida sin colores.

const KEYWORDS = new Set(
  ("and as assert async await break class continue def del elif else except finally for from global if import " +
    "in is lambda nonlocal not or pass raise return try while with yield match case type").split(" "),
);
const CONSTANTS = new Set(["True", "False", "None", "Ellipsis", "NotImplemented", "__debug__"]);
const BUILTINS = new Set(
  ("abs aiter all anext any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex " +
    "delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help " +
    "hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord " +
    "pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type " +
    "vars zip __import__ " +
    "BaseException Exception ArithmeticError AssertionError AttributeError EOFError ImportError ModuleNotFoundError " +
    "IndexError KeyError KeyboardInterrupt LookupError MemoryError NameError NotImplementedError OSError " +
    "OverflowError RecursionError RuntimeError StopIteration StopAsyncIteration SyntaxError IndentationError " +
    "SystemExit TypeError UnboundLocalError UnicodeError ValueError ZeroDivisionError FileNotFoundError " +
    "PermissionError TimeoutError Warning DeprecationWarning UserWarning").split(" "),
);
// "match", "case" y "type" son palabras clave solo en ciertos lugares: si
// aparecen como nombre común (match = 3, type(x)), van como nombre.
const SOFT = new Set(["match", "case", "type"]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Expresión de cada pieza, en orden de prioridad.
const STRING = /(?:[rRbBuUfFtT]{1,2})?(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)/y;
const COMMENT = /#[^\n]*/y;
const NUMBER = /(?:0[xX][\da-fA-F_]+|0[oO][0-7_]+|0[bB][01_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d+)?[jJ]?)/y;
const NAME = /[\p{L}_][\p{L}\p{N}_]*/uy;
const DECORATOR = /@[\p{L}_][\p{L}\p{N}_.]*/uy;
const SPACE = /[ \t]+/y;

function at(re, src, i) {
  re.lastIndex = i;
  const m = re.exec(src);
  return m && m[0] ? m[0] : null;
}

// tokens(src) → [{ text, cls }] (cls vacío = texto sin color).
export function tokens(src) {
  const out = [];
  let i = 0;
  let prevWord = ""; // la palabra clave anterior (para el nombre después de def / class)
  let lineStart = true;
  const push = (text, cls = "") => {
    out.push({ text, cls });
    i += text.length;
  };
  while (i < src.length) {
    const c = src[i];
    if (c === "\n") {
      push("\n");
      lineStart = true;
      continue;
    }
    let t;
    if ((t = at(SPACE, src, i))) {
      push(t);
      continue;
    }
    if ((t = at(COMMENT, src, i))) {
      push(t, "tk-com");
      lineStart = false;
      continue;
    }
    if (lineStart && (t = at(DECORATOR, src, i))) {
      push(t, "tk-dec");
      lineStart = false;
      continue;
    }
    if ((t = at(STRING, src, i)) && /["']/.test(t)) {
      pushString(out, t);
      i += t.length;
      prevWord = "";
      lineStart = false;
      continue;
    }
    if (/[\d.]/.test(c) && (t = at(NUMBER, src, i)) && /\d/.test(t)) {
      push(t, "tk-num");
      prevWord = "";
      lineStart = false;
      continue;
    }
    if ((t = at(NAME, src, i))) {
      const rest = src.slice(i + t.length);
      let cls = "";
      if (prevWord === "def") cls = "tk-fn";
      else if (prevWord === "class") cls = "tk-cls";
      else if (CONSTANTS.has(t)) cls = "tk-const";
      else if (KEYWORDS.has(t) && !(SOFT.has(t) && !softIsKeyword(t, rest, lineStart))) cls = "tk-kw";
      else if (t === "self" || t === "cls") cls = "tk-self";
      else if (BUILTINS.has(t) && !/^\s*=[^=]/.test(rest) && src[i - 1] !== ".") cls = "tk-bi";
      else if (/^\s*\(/.test(rest)) cls = "tk-call";
      push(t, cls);
      prevWord = cls === "tk-kw" ? t : "";
      lineStart = false;
      continue;
    }
    push(c, /[=+\-*/%<>!&|^~@:]/.test(c) ? "tk-op" : "");
    prevWord = "";
    lineStart = false;
  }
  return out;
}

// match / case al comienzo del renglón y seguidos de algo que no es un
// operador de asignación ni un paréntesis de llamada; type como "type X = …".
function softIsKeyword(word, rest, lineStart) {
  if (!lineStart) return false;
  if (word === "type") return /^\s+[\p{L}_][\p{L}\p{N}_]*\s*(\[[^\]]*\])?\s*=[^=]/u.test(rest);
  return /^\s+[^=\s(][^\n]*:\s*(#.*)?$/m.test(rest.split("\n")[0]);
}

// En los f-strings se resaltan las {expresiones}.
function pushString(out, t) {
  const prefix = t.match(/^[rRbBuUfFtT]*/)[0];
  if (!/[fFtT]/.test(prefix)) return out.push({ text: t, cls: "tk-str" });
  let buf = "";
  let depth = 0;
  for (let k = 0; k < t.length; k++) {
    const ch = t[k];
    if (depth === 0 && ch === "{" && t[k + 1] === "{") {
      buf += "{{";
      k++;
    } else if (depth === 0 && ch === "{") {
      if (buf) out.push({ text: buf, cls: "tk-str" });
      buf = "";
      depth = 1;
      out.push({ text: "{", cls: "tk-int" });
    } else if (depth > 0 && ch === "{") {
      depth++;
      buf += ch;
    } else if (depth > 0 && ch === "}") {
      if (--depth === 0) {
        out.push(...tokens(buf));
        buf = "";
        out.push({ text: "}", cls: "tk-int" });
      } else buf += ch;
    } else buf += ch;
  }
  if (buf) out.push(depth ? { text: buf, cls: "" } : { text: buf, cls: "tk-str" });
}

// Arma el HTML renglón por renglón: una pieza que ocupa varios renglones
// (un texto entre comillas triples) se cierra y se vuelve a abrir en cada uno.
function toLines(list) {
  const lines = [[]];
  for (const { text, cls } of list) {
    const parts = text.split("\n");
    parts.forEach((p, k) => {
      if (k) lines.push([]);
      if (p) lines[lines.length - 1].push(cls ? `<span class="${cls}">${esc(p)}</span>` : esc(p));
    });
  }
  return lines.map((l) => l.join(""));
}

export function highlightPython(src) {
  return toLines(tokens(src))
    .map((l) => `<span class="line">${l || " "}</span>`)
    .join("");
}

// Sesión interactiva: los renglones con >>> o ... son código; el resto, salida.
export function highlightRepl(src) {
  return src
    .split("\n")
    .map((line) => {
      const m = line.match(/^(>>>|\.\.\.)( ?)(.*)$/);
      if (!m) return `<span class="line out">${esc(line) || " "}</span>`;
      const code = toLines(tokens(m[3])).join("");
      return `<span class="line"><span class="prompt">${esc(m[1] + m[2])}</span>${code}</span>`;
    })
    .join("");
}

// Salida de un programa o de la consola: sin colores.
export function plainLines(src) {
  return src
    .split("\n")
    .map((l) => `<span class="line">${esc(l) || " "}</span>`)
    .join("");
}
