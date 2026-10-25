# Ecuaciones diferenciales ordinarias

Las ecuaciones diferenciales surgen de manera natural al resolver problemas físicos, geométricos o de cualquier ciencia: la incógnita es una **función** $y = f(x)$ y en la ecuación intervienen sus **derivadas**.

::: claves
- **Definiciones**: orden, grado, solución general (con tantas constantes esenciales como el orden), solución particular y condición inicial. Ver [[1. Definiciones: orden, grado y solución]].
- **Las de 1.er orden y 1.er grado**, $y' = f(x;y)$ o $M\,\dx + N\,\dy = 0$, son de cuatro tipos:
  - **variables separables**: $f(x)\,\dx + g(y)\,\dy = 0$, se integra cada lado. Ver [[2. Variables separables]];
  - **homogéneas**: $f(x;y)$ homogénea de grado cero; con $u = \frac{y}{x}$ pasa a variables separables. Ver [[3. Ecuaciones homogéneas]];
  - **lineales**: $y' + p(x)\,y = r(x)$; con $y = u\,v$. La de **Bernoulli** se reduce a lineal con $z = y^{1-n}$. Ver [[4. Ecuaciones lineales y de Bernoulli]];
  - **totales o exactas**: $\pd{N}{x} = \pd{M}{y}$; la solución es la función potencial, $u(x;y) = C$. Ver [[5. Ecuaciones diferenciales totales o exactas]].
- **Solución singular**: la envolvente de la familia de soluciones; no sale de la solución general. Ver [[6. Soluciones singulares]].
- **Trayectorias ortogonales**: se cambia $y'$ por $-\frac{1}{y'}$ en la ecuación de la familia. Ver [[7. Trayectorias ortogonales]].
:::
