// Activa el contenido ya insertado: demostraciones paso a paso y plegables,
// y popups de las citas \eqref / \ref. No importa nada (se reutiliza tal
// cual dentro del HTML descargado).

let active = null; // demostración en modo paso a paso que recibe el teclado

export function enhance(root) {
  for (const proof of root.querySelectorAll(".box.proof")) setupProof(proof);
  // Los ejemplos con un desarrollo en pasos también se pueden seguir de a uno.
  for (const ex of root.querySelectorAll(".box.example, .box.exercise")) {
    if (ex.querySelector(":scope > .box-body > .pasos")) setupProof(ex);
  }
}

// ---------- demostraciones ----------

function setupProof(proof) {
  if (proof.dataset.ready) return;
  proof.dataset.ready = "1";
  const head = proof.querySelector(":scope > .proof-head, :scope > .box-title");
  if (!head) return;
  const tools = document.createElement("span");
  tools.className = "proof-tools";
  const stepBtn = button("Paso a paso", "Ir mostrando un paso por vez (→ / espacio)");
  const foldBtn = button("Plegar", "Plegar o desplegar la demostración");
  tools.append(stepBtn, foldBtn);
  head.append(tools);
  stepBtn.addEventListener("click", () => (proof.classList.contains("is-stepping") ? stopSteps(proof) : startSteps(proof)));
  foldBtn.addEventListener("click", () => {
    const folded = proof.classList.toggle("is-folded");
    foldBtn.textContent = folded ? "Desplegar" : "Plegar";
    if (folded) stopSteps(proof);
  });
}

function button(text, title) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = text;
  b.title = title;
  return b;
}

// Unidades que se van revelando: cada renglón de una tabla de pasos, cada
// ítem de una lista y cada bloque suelto.
function units(proof) {
  const body = proof.querySelector(":scope > .box-body");
  const out = [];
  for (const child of body.children) {
    if (child.matches(".pasos")) out.push(...child.querySelectorAll(":scope > .paso, :scope > .pasos-title"));
    else if (child.matches("ul, ol")) out.push(...child.children);
    else out.push(child);
  }
  return out;
}

function startSteps(proof) {
  if (active && active !== proof) stopSteps(active);
  proof.classList.remove("is-folded");
  proof.classList.add("is-stepping");
  const bar = document.createElement("div");
  bar.className = "step-bar";
  const prev = button("◀", "Paso anterior (←)");
  const count = document.createElement("span");
  count.className = "step-count";
  const next = button("Siguiente ▶", "Paso siguiente (→ o espacio)");
  const all = button("Ver todo", "Mostrar la demostración completa (Esc)");
  bar.append(prev, count, next, all);
  proof.append(bar);
  proof._steps = { list: units(proof), i: 0, count, prev, next };
  prev.addEventListener("click", () => go(proof, -1));
  next.addEventListener("click", () => go(proof, 1));
  all.addEventListener("click", () => stopSteps(proof));
  proof.querySelector(".proof-tools button").textContent = "Ver todo";
  active = proof;
  go(proof, 0);
}

function stopSteps(proof) {
  if (!proof.classList.contains("is-stepping")) return;
  proof.classList.remove("is-stepping");
  proof.querySelector(":scope > .step-bar")?.remove();
  for (const u of proof._steps?.list || []) u.classList.remove("step-hidden", "step-current");
  proof.querySelector(".proof-tools button").textContent = "Paso a paso";
  if (active === proof) active = null;
}

function go(proof, delta) {
  const s = proof._steps;
  s.i = Math.max(0, Math.min(s.list.length - 1, s.i + delta));
  s.list.forEach((u, k) => {
    u.classList.toggle("step-hidden", k > s.i);
    u.classList.toggle("step-current", k === s.i);
  });
  const last = s.i === s.list.length - 1;
  proof.classList.toggle("is-last-step", last);
  s.count.textContent = `Paso ${s.i + 1} de ${s.list.length}`;
  s.prev.disabled = s.i === 0;
  s.next.disabled = last;
  active = proof;
  if (delta) s.list[s.i].scrollIntoView({ block: "nearest", behavior: "smooth" });
}

document.addEventListener("keydown", (e) => {
  if (!active || !active.isConnected || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
    e.preventDefault();
    go(active, 1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    go(active, -1);
  } else if (e.key === "Escape") {
    stopSteps(active);
  }
});

// ---------- citas: popup con la ecuación o el teorema citado ----------

let pop = null;
let popTimer = 0;

function refTarget(el) {
  const id = el.dataset.target || (el.getAttribute("href") || "").slice(1);
  return id ? document.getElementById(id) : null;
}

function previewOf(target) {
  const box = document.createElement("div");
  box.className = "ref-pop md";
  const paso = target.closest(".paso");
  if (paso) {
    const grid = document.createElement("div");
    grid.className = "pasos";
    grid.append(paso.cloneNode(true));
    box.append(grid);
  } else {
    const clone = target.cloneNode(true);
    clone.removeAttribute("id");
    clone.querySelectorAll(".proof-tools, .step-bar, figure.plot").forEach((n) => n.remove());
    box.append(clone);
  }
  return box;
}

document.addEventListener("mouseover", (e) => {
  const ref = e.target.closest?.("[data-ref]");
  if (!ref) return;
  const target = refTarget(ref);
  if (!target) return;
  clearTimeout(popTimer);
  popTimer = setTimeout(() => {
    pop?.remove();
    pop = previewOf(target);
    document.body.append(pop);
    const r = ref.getBoundingClientRect();
    const w = Math.min(pop.offsetWidth, window.innerWidth - 24);
    pop.style.left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12)) + "px";
    const below = r.bottom + 8;
    pop.style.top = (below + pop.offsetHeight > window.innerHeight ? r.top - pop.offsetHeight - 8 : below) + "px";
  }, 180);
});
document.addEventListener("mouseout", (e) => {
  if (!e.target.closest?.("[data-ref]")) return;
  clearTimeout(popTimer);
  pop?.remove();
  pop = null;
});
document.addEventListener("click", (e) => {
  const ref = e.target.closest?.("[data-ref]");
  if (!ref) return;
  const target = refTarget(ref);
  if (!target) return;
  e.preventDefault();
  pop?.remove();
  pop = null;
  const el = target.closest(".paso") || target;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
});
