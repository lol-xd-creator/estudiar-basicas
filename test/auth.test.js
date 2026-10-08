import { test } from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, createAuth } from "../src/auth.js";

const reqWith = (cookie) => ({ headers: { cookie } });

test("hash y verificación de contraseña", () => {
  const h = hashPassword("una-clave-larga");
  assert.match(h, /^scrypt\$/);
  assert.equal(verifyPassword("una-clave-larga", h), true);
  assert.equal(verifyPassword("otra", h), false);
  assert.equal(verifyPassword("x", "basura"), false);
});

test("login, sesión, cookie forjada y límite de intentos", () => {
  const auth = createAuth({ passwordHash: hashPassword("clave-correcta"), secret: "s", secureCookies: true });
  const ok = auth.login("1.1.1.1", "clave-correcta");
  assert.equal(ok.ok, true);
  assert.match(ok.cookie, /HttpOnly; SameSite=Strict; Max-Age=\d+; Secure/);
  const token = ok.cookie.split(";")[0];
  assert.equal(auth.isLoggedIn(reqWith(token)), true);
  assert.equal(auth.isLoggedIn(reqWith("sid=99999999999999.firmafalsa")), false);
  assert.equal(auth.isLoggedIn(reqWith("")), false);

  for (let i = 0; i < 5; i++) assert.equal(auth.login("2.2.2.2", "mal").status, 401);
  assert.equal(auth.login("2.2.2.2", "clave-correcta").status, 429);   // bloqueada
  assert.equal(auth.login("3.3.3.3", "clave-correcta").ok, true);      // otra IP sigue pudiendo
});

test("sin contraseña configurada no pide login", () => {
  const auth = createAuth({});
  assert.equal(auth.enabled, false);
  assert.equal(auth.isLoggedIn(reqWith("")), true);
});
