# 3. Campo conservativo y función potencial

::: definicion Campo conservativo y función potencial
Si $\mathbf F = \nabla f$, a $\mathbf F$ se lo llama **campo vectorial conservativo** o **gradiente**, y a la función escalar $f$ se la llama **función potencial**.
:::

## 1) Un campo conservativo cumple las igualdades cruzadas

Sea $\mathbf F$ un campo conservativo de componentes continuas y derivadas parciales también continuas en un dominio.

**a) En $\R^2 \xrightarrow{\ \mathbf F\ } \R^2$:**

$$
\mathbf F(x;y) = F_1(x;y)\,\mathbf i + F_2(x;y)\,\mathbf j = \pd{f}{x}(x;y)\,\mathbf i + \pd{f}{y}(x;y)\,\mathbf j
$$

entonces

$$
\pd{F_1}{y} = \frac{\partial^2 f}{\partial y\,\partial x} \qquad\wedge\qquad \pd{F_2}{x} = \frac{\partial^2 f}{\partial x\,\partial y}
$$

y, por el **teorema de Schwarz** (las derivadas cruzadas son iguales):

::: resultado
$$
\pd{F_2}{x} = \pd{F_1}{y} \label{cons2}
$$
:::

Significa que si $\mathbf F$ es conservativo se cumple \eqref{cons2}, y la integral de línea de $\mathbf F$ es independiente del camino de integración entre dos puntos (ver [[2. Independencia del camino]]).

**b) En $\R^3 \xrightarrow{\ \mathbf F\ } \R^3$:**

$$
\mathbf F(x;y;z) = F_1\,\mathbf i + F_2\,\mathbf j + F_3\,\mathbf k = \pd{f}{x}(x;y;z)\,\mathbf i + \pd{f}{y}(x;y;z)\,\mathbf j + \pd{f}{z}(x;y;z)\,\mathbf k
$$

entonces, también por Schwarz:

::: resultado
$$
\pd{F_1}{z} = \pd{F_3}{x} = \frac{\partial^2 f}{\partial x\,\partial z}
\qquad\wedge\qquad
\pd{F_2}{z} = \pd{F_3}{y} = \frac{\partial^2 f}{\partial y\,\partial z}
\qquad\wedge\qquad
\pd{F_2}{x} = \pd{F_1}{y} = \frac{\partial^2 f}{\partial x\,\partial y} \label{cons3}
$$
:::

Significa que si $\mathbf F$ es conservativo se cumplen las igualdades \eqref{cons3}, y la integral de línea de $\mathbf F$ es independiente del camino de integración entre dos puntos del espacio. Esto puede demostrarse con el **teorema de Stokes**, que se verá más adelante, en forma similar a lo hecho con Green para $\R^2 \xrightarrow{\ \mathbf F\ } \R^2$.

## 2) La recíproca

::: teorema Recíproca
H) Se cumplen las igualdades \eqref{cons2} (en $\R^2$) o \eqref{cons3} (en $\R^3$) en un dominio **simplemente conexo**.
T) $\mathbf F$ es un campo vectorial conservativo o gradiente.
:::

Las igualdades \eqref{cons3} se verifican cuando la **matriz jacobiana** de $\mathbf F$ es **simétrica**:

$$
J\!\left(\frac{F_1\,F_2\,F_3}{x\;y\;z}\right) = \begin{pmatrix} \pd{F_1}{x} & \hl{\pd{F_1}{y}} & \hlb{\pd{F_1}{z}} \\[6pt] \hl{\pd{F_2}{x}} & \pd{F_2}{y} & \hlc{\pd{F_2}{z}} \\[6pt] \hlb{\pd{F_3}{x}} & \hlc{\pd{F_3}{y}} & \pd{F_3}{z} \end{pmatrix}
$$

Las derivadas del **mismo color**, a un lado y al otro de la diagonal, deben ser iguales.

::: aclaracion
El apunte escribe la jacobiana con $\delta$; son las derivadas parciales $\partial$. Y la recíproca dice "también se cumple para dominios simplemente conexos": la recíproca vale **solo** si el dominio es simplemente conexo; por eso lo puse en la hipótesis.
:::

## Ejemplo

::: ejemplo Verificar si el campo vectorial $\mathbf F(x;y;z) = \left(2xy;\ x^2 + z^2;\ 2yz\right)$ es un campo gradiente
Con $F_1 = 2xy$, $F_2 = x^2 + z^2$ y $F_3 = 2yz$:

$$
J\!\left(\frac{F_1\,F_2\,F_3}{x\;y\;z}\right) = \begin{pmatrix} 2y & \hl{2x} & \hlb{0} \\ \hl{2x} & 0 & \hlc{2z} \\ \hlb{0} & \hlc{2z} & 2y \end{pmatrix}
$$

es una **matriz simétrica**; entonces $\mathbf F$ es **conservativo** (su dominio, todo $\R^3$, es simplemente conexo).
:::
