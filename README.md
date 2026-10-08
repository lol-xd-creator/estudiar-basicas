# Estudiar matemática

Árbol de notas para estudiar análisis matemático y cálculo. Las notas son Markdown con fórmulas en LaTeX (KaTeX), hechas para que los desarrollos largos se lean mejor que en un apunte en PDF:

- **Pasos alineados** (`::: pasos`): una igualdad por renglón, los `=` en columna y, al lado de cada paso, por qué se hace.
- **Demostraciones** que se pueden seguir **paso a paso** (→ o espacio) o plegar, con teoremas numerados, hipótesis y tesis marcadas, y ∎ al final.
- **Ecuaciones numeradas** (`\label`) y citas (`\eqref`): al pasar el mouse por "(1)" aparece la ecuación.
- **Gráficos interactivos en R² y R³**, escritos como en el pizarrón: `y = 5 - x^2`, `x^2 <= y <= sqrt(x)`, `0 <= z <= 4 - x^2 - y^2, x^2 + y^2 <= 4`… Regiones, sólidos, cortes, prismas de Riemann. Se giran con el mouse.
- **Imágenes**: pegarlas o arrastrarlas al editor.
- Dos temas: **día** (papel, sin blanco) y **noche**.
- **⤓** descarga todo el mapa como un solo HTML (con fórmulas, gráficos y los dos temas) que funciona sin internet.

La nota **"Guía: cómo escribir matemática acá"** (viene de fábrica) muestra toda la sintaxis con ejemplos.

## Uso

Requiere Node 24 o más nuevo. Sin dependencias para correr.

```bash
npm start
```

Abre en <http://localhost:8091> (o doble clic en `iniciar.cmd`). Los datos quedan en `data/` (`matematica.db` + `media/`).

| Comando | Para qué |
|---|---|
| `npm start` | Arrancar la app |
| `npm run backup` | Copia de los datos en `backups/` |
| `npm run password` | Definir la contraseña (para abrirla desde otra máquina o en el VPS) |
| `npm test` | Pruebas |
| `npm install && npm run vendor` | Actualizar KaTeX y markdown-it en `public/vendor/` (solo si hace falta) |

## En un VPS

Ver [DEPLOY.md](DEPLOY.md). Puede convivir con estudiar-desarrollo en el mismo servidor.

## Estructura

| Archivo | Qué hace |
|---|---|
| `server.js` | Servidor HTTP: archivos, API JSON, imágenes, login y cabeceras de seguridad |
| `src/db.js` | Árbol de notas en SQLite (`node:sqlite`) |
| `src/auth.js` | Login de un solo usuario (scrypt + cookie firmada + límite de intentos) |
| `src/seed/` | Notas iniciales de una base vacía (la guía) |
| `public/js/render.js` | Markdown + KaTeX: fórmulas, pasos, cajas, números de ecuación, citas |
| `public/js/macros.js` | Atajos de LaTeX (`\R`, `\sen`, `\dx`, `\eval`, `\hl`…) |
| `public/js/enhance.js` | Paso a paso, plegar demostraciones y popups de citas |
| `public/js/mathexpr.js` | Expresiones de los gráficos ("como en el pizarrón"), sin `eval` |
| `public/js/plotspec.js` | Lenguaje de los gráficos: deduce el tipo de cada renglón |
| `public/js/plot2d.js`, `plot3d.js` | Dibujo en el plano y en el espacio (canvas, colores del tema) |
| `public/js/plots.js` | Monta los gráficos y los reutiliza al editar |
| `public/js/export.js`, `bundle.js` | Descarga del mapa completo en un HTML |
| `public/math.css`, `themes.css` | Estilos de lo matemático y los dos temas |
| `deploy/` | Instalación y mantenimiento en el VPS |
