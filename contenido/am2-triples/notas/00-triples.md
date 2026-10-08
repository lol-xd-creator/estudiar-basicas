# Integrales triples

Integral de un campo escalar $f(x;y;z)$ sobre un sólido del espacio. Se define **en forma análoga a la integral doble**: el rectángulo pasa a ser un paralelepípedo, el área $\Delta A$ pasa a ser el volumen $\Delta V$ y la suma de Riemann es **triple**.

::: claves
- **Definición**: límite de la triple suma de Riemann $\sum\sum\sum f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk}$ cuando $\max\Delta V \to 0$. Ver [[1. Paralelepípedo rectángulo]].
- **Cálculo**: de a una variable por vez (integrales sucesivas o iteradas). Hay seis órdenes posibles y todos dan lo mismo: se elige el más sencillo. Ver [[2. Cálculo por integrales iteradas]].
- **Sólido general $S$**: tipo 1 (entre $z = \mu_1(x;y)$ y $z = \mu_2(x;y)$) se integra primero en $z$; tipo 2, primero en $x$; tipo 3, primero en $y$. Lo que queda es una integral doble sobre $D$. Ver [[3. Dominios espaciales generales]].
- **Propiedades**: las mismas que en dobles; con $f = 1$, $\iiint_S \dx\,\dy\,\dz = V(S)$. Ver [[4. Propiedades de las integrales triples]].
- **Aplicación**: volumen $V(S) = \iiint_S \dx\,\dy\,\dz$. Ver [[5. Cálculo de volumen]].
:::
