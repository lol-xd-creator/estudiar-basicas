# Pendiente: migración de KaTeX a MathJax 4

El usuario eligió **MathJax 4 con la fuente Pagella** (tipo Palatino, igual que el texto) después de comparar KaTeX, Temml y MathJax. La migración quedó a mitad de camino.

## Hecho

- `package.json` y `scripts/vendor.mjs`: MathJax 4 + `@mathjax/mathjax-pagella-font` en `public/vendor/` (KaTeX quitado).
- `public/js/mathjax-config.js` (script clásico): configuración y atajos (`\R`, `\sen`, `\dx`, `\eval`, `\hl`…). Reemplaza a `macros.js`.
- `public/js/math.js`: `render.js` deja marcadores `<span class="tex" data-d="0|1">`; `typesetMath(raíz)` los dibuja con un caché por fórmula (al escribir solo se dibuja la que cambió; las centradas se guardan por ancho, porque MathJax las parte en renglones). También copia fórmulas como LaTeX y acepta un caché precargado (`window.__MATH_SEED`) para el HTML descargado.
- `public/js/render.js`: usa `mathHTML`; las citas dentro de fórmulas usan `\data{ref=…,target=…}`.
- `plotcommon.js`, `plot2d.js`, `plot3d.js`: las etiquetas con `$…$` usan marcadores + `typesetMath(capa)`.
- `app.js`: `typesetMath` en la vista y la vista previa, barra de fórmula con `mathError`, se redibuja al cambiar el ancho de la ventana.
- `index.html` y `math.css`: estilos de `mjx-container` en vez de `.katex`.

## Hecho en la segunda tanda

- `export.js` ya usa MathJax: renderiza cada nota fuera de pantalla con el ancho de la vista, embebe el CSS de MathJax con sus `.woff2` en base64 (se leen de `sheet.cssRules`: los símbolos dinámicos se agregan con `insertRule` y no aparecen en `textContent`) y precarga las fórmulas de las etiquetas de los gráficos en `window.__MATH_SEED`.
- `bundle.js` empaqueta `math.js`; `macros.js` borrado.
- `render.test.js` busca los marcadores `span class="tex"`.
- `server.js`: ETag / 304 en los estáticos.
- `math.css`: reglas `.math-error` borradas. README actualizado.
- `mathjax-config.js`: se apagan voz / braille / explorador en `startup.ready`. Desde `options` no se apagan y arrancan un worker que la CSP bloquea, con lo que `typesetPromise` quedaba colgada para siempre.

## Falta

1. **Celular**: a 390 px de ancho `.main` queda con ancho 0 (la grilla de `#app` no tiene reglas para pantallas angostas) y no se ve nada. No es de la migración (`styles.css` no se tocó), pero hay que arreglarlo.
2. **Probar a mano en el navegador** (ya se probó: vista, descarga ⤓ con gráficos y etiquetas, notas AM2):
   - pasos (en la comparación, un `\lim` con dos renglones debajo se pisaba con la `\sum` en columna angosta);
   - recuadros de resultado (clase `mjx-measuring`);
   - barra de fórmula con error;
   - copiar fórmulas.

## Contenido

`contenido/am2/notas/` tiene las notas de AM2 (Integrales dobles), transcriptas del apunte. Para cargarlas en una base local con la app corriendo:

```bash
node contenido/am2/cargar.mjs http://localhost:8091
```
