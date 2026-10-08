// Árbol de notas (panel izquierdo), al estilo de un explorador de archivos.
//
//   click             abre la nota          doble click   renombrar
//   ▸ / ▾             despliega o pliega    botón +       nueva subnota
//   click derecho     menú (subnota, renombrar, eliminar)
//   arrastrar         sobre una fila la mete adentro; arriba o abajo de una
//                     fila la deja antes o después de ella
//   teclado           ↑ ↓ moverse, → ← desplegar/plegar, Enter abrir, F2
//
// Lo desplegado se recuerda en el navegador.

const OPEN_KEY = "matematica.treeOpen";

export class Tree {
  constructor(root, handlers) {
    this.root = root;
    this.h = handlers; // { onOpen, onCreate, onRename, onDelete, onMove }
    this.nodes = new Map();
    this.kids = new Map();
    this.selected = null;
    this.dragId = null;
    try {
      this.open = new Set(JSON.parse(localStorage.getItem(OPEN_KEY) || "[]"));
    } catch {
      this.open = new Set();
    }

    root.addEventListener("click", (e) => this.onClick(e));
    root.addEventListener("dblclick", (e) => {
      const row = e.target.closest(".row");
      if (row && e.target.closest(".label")) this.rename(row.dataset.id);
    });
    root.addEventListener("contextmenu", (e) => {
      const row = e.target.closest(".row");
      if (!row) return;
      e.preventDefault();
      this.menu(row.dataset.id, e.clientX, e.clientY);
    });
    root.addEventListener("keydown", (e) => this.onKey(e));
    root.addEventListener("dragstart", (e) => this.onDragStart(e));
    root.addEventListener("dragover", (e) => this.onDragOver(e));
    root.addEventListener("dragleave", (e) => {
      if (!root.contains(e.relatedTarget)) this.clearDrop();
    });
    root.addEventListener("drop", (e) => this.onDrop(e));
    root.addEventListener("dragend", () => {
      this.dragId = null;
      this.clearDrop();
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".ctx-menu")) this.closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeMenu();
    });
  }

  // ---------- datos ----------

  setData(list) {
    this.nodes = new Map(list.map((n) => [n.id, n]));
    this.kids = new Map();
    for (const n of list) {
      const p = n.parent_id || null;
      if (!this.kids.has(p)) this.kids.set(p, []);
      this.kids.get(p).push(n);
    }
    this.render();
  }

  children(id) {
    return this.kids.get(id ?? null) || [];
  }

  path(id) {
    const out = [];
    for (let n = this.nodes.get(id); n; n = this.nodes.get(n.parent_id)) out.unshift(n);
    return out;
  }

  findByTitle(title) {
    const t = title.trim().toLowerCase();
    for (const n of this.nodes.values()) if (n.title.trim().toLowerCase() === t) return n;
    return null;
  }

  // ---------- dibujo ----------

  render() {
    const focused = this.root.contains(document.activeElement) ? document.activeElement.closest?.(".row")?.dataset.id : null;
    const ul = this.list(null, 0);
    ul.setAttribute("role", "tree");
    this.root.replaceChildren(ul);
    if (!this.nodes.size) {
      const empty = document.createElement("p");
      empty.className = "tree-empty";
      empty.textContent = "Todavía no hay notas.";
      this.root.append(empty);
    }
    if (focused) this.rowOf(focused)?.focus();
  }

  list(parentId, depth) {
    const ul = document.createElement("ul");
    for (const n of this.children(parentId)) {
      const li = document.createElement("li");
      const hasKids = this.children(n.id).length > 0;
      const isOpen = hasKids && this.open.has(n.id);
      const row = document.createElement("div");
      row.className = "row" + (n.id === this.selected ? " is-selected" : "");
      row.dataset.id = n.id;
      row.style.setProperty("--depth", depth);
      row.draggable = true;
      row.tabIndex = n.id === this.selected || (!this.selected && depth === 0 && !ul.children.length) ? 0 : -1;
      row.setAttribute("role", "treeitem");
      if (hasKids) row.setAttribute("aria-expanded", String(isOpen));
      row.innerHTML = `
        <span class="twisty${hasKids ? "" : " is-leaf"}" aria-hidden="true">${hasKids ? (isOpen ? "▾" : "▸") : ""}</span>
        <span class="icon" aria-hidden="true">${hasKids ? (isOpen ? ICON_OPEN : ICON_FOLDER) : ICON_DOC}</span>
        <span class="label"></span>
        <button type="button" class="add" title="Nueva subnota" tabindex="-1">+</button>`;
      row.querySelector(".label").textContent = n.title;
      li.append(row);
      if (isOpen) li.append(this.list(n.id, depth + 1));
      ul.append(li);
    }
    return ul;
  }

  rowOf(id) {
    return this.root.querySelector(`.row[data-id="${CSS.escape(id)}"]`);
  }

  // select resalta la nota y despliega sus ancestros para que se vea.
  select(id) {
    this.selected = id;
    let changed = false;
    for (const n of this.path(id).slice(0, -1)) {
      if (!this.open.has(n.id)) {
        this.open.add(n.id);
        changed = true;
      }
    }
    if (changed) this.saveOpen();
    this.render();
    this.rowOf(id)?.scrollIntoView({ block: "nearest" });
  }

  toggle(id, force) {
    if (!this.children(id).length) return;
    const open = force ?? !this.open.has(id);
    if (open) this.open.add(id);
    else this.open.delete(id);
    this.saveOpen();
    this.render();
    this.rowOf(id)?.focus();
  }

  expandAll(open) {
    this.open = open ? new Set([...this.kids.keys()].filter(Boolean)) : new Set();
    this.saveOpen();
    this.render();
  }

  saveOpen() {
    try {
      localStorage.setItem(OPEN_KEY, JSON.stringify([...this.open]));
    } catch {}
  }

  // ---------- interacción ----------

  onClick(e) {
    const row = e.target.closest(".row");
    if (!row || e.target.closest("input")) return;
    const id = row.dataset.id;
    if (e.target.closest(".add")) {
      e.stopPropagation();
      this.h.onCreate(id);
    } else if (e.target.closest(".twisty")) {
      this.toggle(id);
    } else {
      this.h.onOpen(id);
    }
  }

  onKey(e) {
    const row = e.target.closest(".row");
    if (!row || e.target.closest("input")) return;
    const rows = [...this.root.querySelectorAll(".row")];
    const i = rows.indexOf(row);
    const id = row.dataset.id;
    const n = this.nodes.get(id);
    const go = (r) => {
      if (!r) return;
      rows.forEach((x) => (x.tabIndex = -1));
      r.tabIndex = 0;
      r.focus();
    };
    switch (e.key) {
      case "ArrowDown":
        go(rows[i + 1]);
        break;
      case "ArrowUp":
        go(rows[i - 1]);
        break;
      case "ArrowRight":
        if (this.children(id).length && !this.open.has(id)) this.toggle(id, true);
        else go(rows[i + 1]);
        break;
      case "ArrowLeft":
        if (this.open.has(id)) this.toggle(id, false);
        else if (n.parent_id) go(this.rowOf(n.parent_id));
        break;
      case "Enter":
        this.h.onOpen(id);
        break;
      case "F2":
        this.rename(id);
        break;
      case "Delete":
        this.h.onDelete(id);
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  // rename cambia la etiqueta por un campo de texto; Enter guarda, Esc cancela.
  rename(id) {
    const row = this.rowOf(id);
    if (!row) return;
    const label = row.querySelector(".label");
    const input = document.createElement("input");
    input.className = "rename";
    input.value = this.nodes.get(id).title;
    label.replaceWith(input);
    input.focus();
    input.select();
    let done = false;
    const finish = (save) => {
      if (done) return;
      done = true;
      const title = input.value.trim();
      if (save && title && title !== this.nodes.get(id).title) this.h.onRename(id, title);
      else this.render();
    };
    input.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") finish(true);
      if (e.key === "Escape") finish(false);
    });
    input.addEventListener("blur", () => finish(true));
  }

  menu(id, x, y) {
    this.closeMenu();
    const m = document.createElement("div");
    m.className = "ctx-menu";
    m.setAttribute("role", "menu");
    const items = [
      ["Nueva subnota", () => this.h.onCreate(id)],
      ["Nueva nota debajo", () => this.h.onCreate(this.nodes.get(id).parent_id || null, id)],
      ["Renombrar", () => this.rename(id)],
      null,
      ["Eliminar…", () => this.h.onDelete(id), "is-danger"],
    ];
    for (const it of items) {
      if (!it) {
        m.append(Object.assign(document.createElement("hr")));
        continue;
      }
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitem");
      b.textContent = it[0];
      if (it[2]) b.className = it[2];
      b.addEventListener("click", () => {
        this.closeMenu();
        it[1]();
      });
      m.append(b);
    }
    document.body.append(m);
    const r = m.getBoundingClientRect();
    m.style.left = Math.min(x, innerWidth - r.width - 8) + "px";
    m.style.top = Math.min(y, innerHeight - r.height - 8) + "px";
    m.querySelector("button").focus();
  }

  closeMenu() {
    document.querySelector(".ctx-menu")?.remove();
  }

  // ---------- arrastrar y soltar ----------

  onDragStart(e) {
    const row = e.target.closest(".row");
    if (!row) return;
    this.dragId = row.dataset.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.nodes.get(this.dragId).title);
    row.classList.add("is-dragging");
  }

  // dropTarget decide dónde caería: before / after / inside de la fila.
  dropTarget(e) {
    const row = e.target.closest(".row");
    if (!row || !this.dragId) return null;
    const id = row.dataset.id;
    // No se puede soltar sobre sí misma ni dentro de su propio subárbol.
    if (this.path(id).some((n) => n.id === this.dragId)) return null;
    const r = row.getBoundingClientRect();
    const y = (e.clientY - r.top) / r.height;
    const zone = y < 0.28 ? "before" : y > 0.72 ? "after" : "inside";
    return { row, id, zone };
  }

  onDragOver(e) {
    const t = this.dropTarget(e);
    this.clearDrop();
    if (!t) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    t.row.classList.add("drop-" + t.zone);
  }

  onDrop(e) {
    const t = this.dropTarget(e);
    this.clearDrop();
    if (!t) return;
    e.preventDefault();
    const target = this.nodes.get(t.id);
    if (t.zone === "inside") {
      this.open.add(t.id);
      this.saveOpen();
      this.h.onMove(this.dragId, t.id, this.children(t.id).filter((n) => n.id !== this.dragId).length);
      return;
    }
    const parent = target.parent_id || null;
    const sibs = this.children(parent).filter((n) => n.id !== this.dragId);
    const at = sibs.findIndex((n) => n.id === t.id) + (t.zone === "after" ? 1 : 0);
    this.h.onMove(this.dragId, parent, at);
  }

  clearDrop() {
    for (const el of this.root.querySelectorAll(".drop-before, .drop-after, .drop-inside, .is-dragging")) {
      el.classList.remove("drop-before", "drop-after", "drop-inside", "is-dragging");
    }
  }
}

const ICON_FOLDER = `<svg viewBox="0 0 16 16"><path d="M1.5 3.5h4.2l1.5 1.6h7.3v7.4h-13z"/></svg>`;
const ICON_OPEN = `<svg viewBox="0 0 16 16"><path d="M1.5 3.5h4.2l1.5 1.6h6.3v1.6H4.2l-2.7 5.8z"/><path d="M4.2 6.7h11l-2.6 5.8h-11z"/></svg>`;
const ICON_DOC = `<svg viewBox="0 0 16 16"><path d="M3.5 1.5h6l3 3v10h-9z"/><path d="M9.5 1.5v3h3M5.5 8h5M5.5 10.5h5"/></svg>`;
