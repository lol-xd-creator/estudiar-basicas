// Cliente de la API JSON del servidor.

async function call(method, path, body) {
  const res = await fetch("/api" + path, {
    method,
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (res.status === 401) {
    // La sesión venció o no hay login: a la pantalla de ingreso.
    location.replace("/login");
    throw new Error("no autenticado");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `error ${res.status}`);
  return data;
}

export const api = {
  tree: () => call("GET", "/tree"),
  get: (id) => call("GET", `/notes/${id}`),
  create: (parent_id, title, content = "") => call("POST", "/notes", { parent_id, title, content }),
  update: (id, fields) => call("PUT", `/notes/${id}`, fields),
  move: (id, parent_id, index) => call("POST", `/notes/${id}/move`, { parent_id, index }),
  remove: (id) => call("DELETE", `/notes/${id}`),
  health: () => fetch("/api/health").then((r) => r.json()),
  logout: () => call("POST", "/logout"),
  search: (q) => call("GET", `/search?q=${encodeURIComponent(q)}`),
  // upload sube una imagen (File o Blob) y devuelve su URL (/media/…).
  upload: async (file) => {
    const res = await fetch("/api/media", { method: "POST", headers: { "Content-Type": file.type }, body: file });
    if (res.status === 401) location.replace("/login");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `error ${res.status}`);
    return data.url;
  },
};
