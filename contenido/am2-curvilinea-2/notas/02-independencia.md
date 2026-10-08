# 2. Independencia del camino

::: definicion Independencia del camino
Sea $\mathbf F$ un campo vectorial continuo, con derivadas parciales también continuas en un dominio. La integral de línea de $\mathbf F$ es **independiente del camino** (o trayectoria) de integración si

$$
\int_{C_1} \mathbf F\cdot\dd\mathbf S = \int_{C_2} \mathbf F\cdot\dd\mathbf S
$$

para todo par de curvas $C_1$ y $C_2$ con punto inicial $A$ y punto final $B$.
:::

En el plano: si $\mathbf F(x;y) = \big(F_1(x;y);F_2(x;y)\big)$, con derivadas parciales continuas, cumple

$$
\int_{C_1} F_1(x;y)\,\dx + F_2(x;y)\,\dy = \int_{C_2} F_1(x;y)\,\dx + F_2(x;y)\,\dy
$$

$\forall\, C_1$ y $C_2 \in \Dom(\mathbf F)$ entre $A$ y $B$, su integral de línea es independiente del camino de integración entre esos puntos.

```grafico
titulo: Dos caminos de $A$ a $B$; juntos, $C_1$ y $-C_2$ forman una curva cerrada que encierra $D$
x: -0.3..4.4
y: -0.3..3.6
(0.6 + 1.7 (1 - cos(t)) + 0.4 sin(t), 0.6 + 1.3 (1 - cos(t)) - 0.6 sin(t)) ; t: 0..pi ; flecha ; azul ; "$C_1$"
(0.6 + 1.7 (1 - cos(t)) - 0.4 sin(t), 0.6 + 1.3 (1 - cos(t)) + 0.6 sin(t)) ; t: 0..pi ; flecha ; rojo ; "$C_2$"
(0.6, 0.6) ; "$A$"
(4, 3.2) ; "$B$"
texto (2.3, 1.9) "$D$"
```

## Una forma equivalente

Si $C = C_1 \cup (-C_2)$, que es una curva **cerrada**:

::: pasos
\oint_C \mathbf F\cdot\dd\mathbf S = \int_{C_1} F_1\,\dx + F_2\,\dy + \int_{-C_2} F_1\,\dx + F_2\,\dy        // propiedad 2
  = \int_{C_1} F_1\,\dx + F_2\,\dy - \int_{C_2} F_1\,\dx + F_2\,\dy                                         // propiedad 1
:::

y las dos integrales son iguales si y solo si la diferencia es cero:

::: resultado
$$
\oint_C \mathbf F\cdot\dd\mathbf S = 0 \label{indep}
$$
:::

Esto significa que, si se cumple \eqref{indep} $\forall\, C$ (cerrada) que pase por los puntos $A$ y $B$, la integral de línea es independiente del camino de integración entre $A$ y $B$. Estos conceptos valen también para $\R^3 \xrightarrow{\ \mathbf F\ } \R^3$ con $C \subset \R^3$.

## Utilizando el teorema de Green

Si

$$
\oint_C F_1(x;y)\,\dx + F_2(x;y)\,\dy = \iint_D \left(\pd{F_2}{x} - \pd{F_1}{y}\right)\dx\,\dy = 0
$$

$\forall\, C$ que pase por los puntos $A$ y $B$, es también $\forall\, D$ según $C$; entonces el integrando tiene que ser cero:

$$
\pd{F_2}{x} - \pd{F_1}{y} = 0
$$

::: resultado Condición de independencia del camino
$$
\pd{F_2}{x} = \pd{F_1}{y}
$$
:::

Es la condición **necesaria y suficiente** para que la integral de línea sea independiente de la trayectoria de integración entre $A$ y $B$.

::: aclaracion
Para que la condición alcance (que sea suficiente), Green se tiene que poder aplicar a toda curva cerrada del dominio: el dominio debe ser **simplemente conexo** (sin agujeros), como dice el apunte más adelante para la recíproca de los campos conservativos.
:::

## Ejemplo

::: ejemplo Calcular $\displaystyle\int_C 2xy^3\,\dx + \left(3x^2y^2 - 2\right)\dy$, siendo $C$ la curva $y = x^2$ que va desde el punto $A(0;0)$ al $B(1;1)$
**a) ¿Depende del camino?**

$$
F_1 = 2xy^3 \quad\wedge\quad F_2 = 3x^2y^2 - 2 \quad\then\quad \pd{F_2}{x} = 6xy^2 = \pd{F_1}{y}
$$

Entonces $I_C$ es **independiente del camino de integración**. Lo más fácil es ir de $A$ a $B$ por **líneas paralelas a los ejes**:

```grafico
y = x^2 ; x: 0..1 ; punteada ; gris ; "$y = x^2$"
(t, 0) ; t: 0..1 ; flecha ; azul ; "$C_1$"
(1, t) ; t: 0..1 ; flecha ; rojo ; "$C_2$"
(0, 0) ; "$A(0;0)$"
(1, 1) ; "$B(1;1)$"
x: -0.3..1.6
y: -0.3..1.4
```

$$
C_1: \begin{cases} y = 0 \ \then\ \dy = 0 \\ 0 \le x \le 1 \end{cases} \qquad\qquad C_2: \begin{cases} x = 1 \ \then\ \dx = 0 \\ 0 \le y \le 1 \end{cases}
$$

**b) Cálculo**

::: pasos
I_C = \int_{C_1} \mathbf F\cdot\dd\mathbf S + \int_{C_2} \mathbf F\cdot\dd\mathbf S
    = \int_0^1 0 + (0 - 2)\cdot 0 \;+\; \int_0^1 0 + \left(3(1)^2y^2 - 2\right)\dy        // en $C_1$: $y = 0$ y $\dy = 0$; en $C_2$: $x = 1$ y $\dx = 0$
    = \eval{\left(y^3 - 2y\right)}{0}{1}
    = 1 - 2
:::

::: resultado
$$
I_C = -1
$$
:::
:::
