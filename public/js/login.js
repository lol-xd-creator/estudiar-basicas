// Pantalla de login: manda la contraseña y, si es correcta, vuelve a la app
// (el servidor deja la cookie de sesión).
const form = document.getElementById("login-form");
const error = document.getElementById("login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  error.textContent = "";
  const button = form.querySelector("button");
  button.disabled = true;
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.password.value }),
    });
    if (res.ok) {
      location.replace("/");
      return;
    }
    const data = await res.json().catch(() => ({}));
    error.textContent = data.error || "No se pudo ingresar.";
    form.password.select();
  } catch {
    error.textContent = "Sin conexión con el servidor.";
  } finally {
    button.disabled = false;
  }
});
