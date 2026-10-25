# 5. Ecuaciones diferenciales totales o exactas

::: definicion Ecuación diferencial total o exacta (EDT)
Una ED $M(x;y)\,\dx + N(x;y)\,\dy = 0$ es una **EDT** si $M(x;y)$ y $N(x;y)$ son funciones continuas, con derivadas parciales también continuas, que verifican

$$
\pd{N}{x} = \pd{M}{y} \label{edt}
$$

en un conjunto abierto **simplemente conexo**.
:::

La condición \eqref{edt} es la herramienta que permite **identificar** este tipo de ED. Es la condición de campo conservativo (ver [[3. Campo conservativo y función potencial]]): permite afirmar que

$$
\big(M(x;y);\ N(x;y)\big) = \left(\pd{u}{x};\ \pd{u}{y}\right) = \nabla u
$$

es un **campo gradiente** y, por lo tanto,

$$
M(x;y)\,\dx + N(x;y)\,\dy = \pd{u}{x}\,\dx + \pd{u}{y}\,\dy = \dd u = 0
$$

que es el **diferencial total** de la función potencial $u$; de ahí el nombre de la ED. Al ser $\dd u = 0$:

::: resultado Solución general de una EDT
$$
u(x;y) = C
$$
:::

Hallar la SG de este tipo de ED equivale a **encontrar la función potencial asociada**. El procedimiento es el mismo que en [[4. Cálculo de la función potencial]]; resumido:

**1) Partiendo de $M(x;y) = \pd{u}{x}$:**

::: pasos
// Integrando:
u(x;y) = \int M(x;y)\,\dx + \varphi(y) \label{edt-b}
// Derivando respecto de $y$:
\pd{u}{y}(x;y) = \frac{\partial\left[\int M(x;y)\,\dx\right]}{\partial y} + \varphi'(y) = N(x;y)
// Despejando:
\varphi'(y) = N(x;y) - \frac{\partial\left[\int M(x;y)\,\dx\right]}{\partial y}
:::

Luego se integra respecto de $y$ para obtener $\varphi(y)$, y queda la solución de la ED:

::: resultado
$$
\int M(x;y)\,\dx + \varphi(y) = C \qquad\text{(SG)}
$$
:::

**2) Partiendo de $N(x;y) = \pd{u}{y}$**, con un procedimiento análogo:

::: resultado
$$
\int N(x;y)\,\dy + \psi(x) = C \qquad\text{(SG)}
$$
:::

**3) Integrando $M(x;y)$ y $N(x;y)$ a la vez:**

$$
M(x;y) = \pd{u}{x} \;\then\; u(x;y) = \int M(x;y)\,\dx + \varphi(y)
\qquad\qquad
N(x;y) = \pd{u}{y} \;\then\; u(x;y) = \int N(x;y)\,\dy + \psi(x)
$$

y se comparan ambas expresiones para obtener $\varphi(y)$ y $\psi(x)$. Ambas soluciones son iguales, porque se trata de la misma función potencial:

::: resultado
$$
\int M(x;y)\,\dx + \varphi(y) = C = \int N(x;y)\,\dy + \psi(x) \qquad\text{(SG)}
$$
:::

## Ejemplo

::: ejemplo Calcular la SG de $2xy^3\,\dx + \left(3x^2y^2 + 2y\right)\dy = 0$ y su SP para la CI $(x;y) = (0;3)$
**a) ¿Es exacta?**

$$
M = 2xy^3 \;\then\; \pd{M}{y} = 6xy^2 \qquad\wedge\qquad N = 3x^2y^2 + 2y \;\then\; \pd{N}{x} = 6xy^2
$$

$\pd{M}{y} = \pd{N}{x}$: es una **EDT**.

**b) La función potencial**, partiendo de $M = \pd{u}{x} = 2xy^3$:

::: pasos
u = \int 2xy^3\,\dx + \varphi(y)
  = x^2y^3 + \varphi(y)                                      \label{edt-ej}
:::

Derivando respecto de $y$ e igualando a $N$:

::: pasos
\pd{u}{y} = 3x^2y^2 + \varphi'(y) = 3x^2y^2 + 2y
\then \varphi'(y) = 2y
\then \varphi(y) = y^2
:::

Reemplazando en \eqref{edt-ej}: $u(x;y) = x^2y^3 + y^2$, y $u(x;y) = C$:

::: resultado Solución general
$$
x^2y^3 + y^2 = C
$$
:::

**c) La CI.** Reemplazando $(0;3)$: $0 + 3^2 = C \then C = 9$.

::: resultado Solución particular para la CI $(0;3)$
$$
x^2y^3 + y^2 = 9
$$
:::

```grafico
titulo: La SP $x^2y^3 + y^2 = 9$, que pasa por $(0;3)$
x^2 y^3 + y^2 = 9 ; rojo ; gruesa ; ""
(0, 3) ; "$(0;3)$"
x: -3..3
y: -3.5..3.5
```

Se puede verificar derivando: $\pd{u}{x} = 2xy^3 = M$ y $\pd{u}{y} = 3x^2y^2 + 2y = N$.
:::

::: aclaracion
En la definición, el apunte escribe "$M(x;y)\,\dx + N(x;y)\,\dx = 0$"; es $N(x;y)\,\dy$. Y usa $\delta$ para las derivadas parciales; son $\partial$.
:::
