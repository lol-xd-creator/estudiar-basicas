# 7. Trayectorias ortogonales

::: definicion Curvas ortogonales y trayectorias ortogonales
- Dos curvas son **ortogonales** en un punto que pertenece a ambas si las rectas tangentes a cada una en ese punto son **perpendiculares**.
- Si una curva es ortogonal a cada una de las curvas de una familia, es una **trayectoria ortogonal** de la familia.
- Si cada curva de una familia es ortogonal a cada curva de otra familia, los dos haces son **trayectorias mutuamente ortogonales**.
:::

¿Cómo se encuentra una familia de curvas ortogonales a otra familia? El dato fundamental es que, en cada punto de corte, si $y'$ es la pendiente de una curva de una familia, entonces

$$
-\frac{1}{y'}
$$

será la pendiente de la curva de la otra familia para que sean ortogonales en ese punto.

::: resultado Procedimiento
1. Se da (o se obtiene) la ecuación de una familia de curvas: $f(x;y;C) = 0$.
2. Se busca la ED de 1.er orden de esa familia: $R(x;y;y') = 0$.
3. Se halla la ED de las trayectorias ortogonales: $R\!\left(x;y;-\frac{1}{y'}\right) = 0$.
4. Se resuelve esa ED: su solución general es la familia de curvas ortogonales buscada.
:::

## Ejemplo

::: ejemplo Dada la familia de curvas $y = Cx^2$, encontrar la familia de trayectorias ortogonales a la misma
**a) La ED de la familia.** Se obtiene eliminando $C$:

::: pasos
y' = 2Cx
\then C = \frac{y'}{2x}
\then y = \frac{y'}{2x}\,x^2                    // reemplazando en $y = Cx^2$
\then y'\,x = 2y
:::

**b) La ED de las trayectorias ortogonales**, cambiando $y'$ por $-\frac{1}{y'}$:

$$
-\frac{1}{y'}\,x = 2y \quad\then\quad x + 2y\,y' = 0
$$

**c) Resolviendo** por separación de variables:

::: pasos
x\,\dx + 2y\,\dy = 0
\then \frac{x^2}{2} + y^2 = C_1                // integrando
:::

::: resultado
$$
x^2 + 2y^2 = k \qquad\text{(SG)}
$$
:::

```grafico
titulo: Las parábolas $y = Cx^2$ y las elipses $x^2 + 2y^2 = k$: se cortan siempre en ángulo recto
y = x^2 ; azul ; "$y = Cx^2$"
y = -x^2 ; azul ; ""
y = x^2/3 ; azul ; ""
y = -x^2/3 ; azul ; ""
y = 3 x^2 ; azul ; ""
y = -3 x^2 ; azul ; ""
x^2 + 2 y^2 = 1 ; rojo ; "$x^2 + 2y^2 = k$"
x^2 + 2 y^2 = 4 ; rojo ; ""
x^2 + 2 y^2 = 9 ; rojo ; ""
x: -3.5..3.5
y: -2.6..2.6
```
:::
