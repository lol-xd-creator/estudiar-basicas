# Cambio de variables en integrales múltiples

A veces una integral doble $\iint_D f(x;y)\,\dx\,\dy$ se calcula más fácil con **otras variables** $(u;v)$: se reemplaza $x$ e $y$ por funciones de $u$ y $v$, y el dominio $D$ por otro dominio $S$ más sencillo.

::: claves
- **Transformación**: $(x;y) = \mathbf T(u;v)$, con $x = T_1(u;v)$ e $y = T_2(u;v)$ de derivadas parciales continuas, biunívoca entre $S$ y $D$. Ver [[1. La transformación del dominio]].
- **Jacobiano**: el diferencial de área cambia según $\dx\,\dy = \left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\du\,\dd v$. Ver [[2. Relación entre los diferenciales de área]].
- **Fórmula**: $\displaystyle\iint_D f(x;y)\,\dx\,\dy = \iint_S f\big(T_1(u;v);T_2(u;v)\big)\left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\du\,\dd v$.
- **Coordenadas polares**: $x = r\cos\theta$, $y = r\sen\theta$, con $|J| = r$. Ver [[3. Integrales dobles en coordenadas polares]].
- Un cambio de variables se hace **solo si simplifica** los límites de integración, la función a integrar o las dos cosas.
:::
