# 1. Definición: el trabajo de una fuerza

Queremos integrar un **campo vectorial** sobre un dominio curvilíneo, en el plano o en el espacio. Para facilitar su comprensión, lo asociamos al cálculo del **trabajo** que realiza una fuerza para mover una partícula a lo largo de una curva $C$.

Como toda curva, $C$ tiene un **punto inicial**, un **punto final** y un **sentido de recorrido**.

Sea $\mathbf F(x;y) = \big(F_1(x;y);\,F_2(x;y)\big)$ un campo vectorial continuo sobre una región de $\R^2$ que contiene a $C$: cada punto de la curva tiene su propio valor del campo vectorial.

## Partición de la curva

La curva $C$ tiene punto inicial en $A$ y punto final en $B$, y la dividimos en $n$ subarcos con los puntos $A = P_0;\ P_1;\ \dots;\ P_i;\ P_{i+1};\ \dots;\ P_n = B$.

```grafico
titulo: La curva $C$ de $A$ a $B$; en $P_i$, la fuerza $\mathbf F(P_i)$ y el vector $\Delta\mathbf S_i$ hasta $P_{i+1}$
x: 0..3.6
y: -0.4..3.4
y = 2 + 0.8 (x - 2)^3 ; x: 1..3.05 ; flecha ; azul ; ""
texto (1.25, 1.95) "$C$"
(1, 1.2) ; "$A = P_0$"
(1.45, 1.87) ; "$P_1$"
(2.2, 2.006) ; "$P_i$"
(2.7, 2.274) ; "$P_{i+1}$"
(3.05, 2.926) ; "$B = P_n$"
vector (2.2, 2.006) (2.7, 2.274) ; ambar ; "$\Delta\mathbf S_i$"
vector (2.2, 2.006) (2.65, 3.05) ; verde ; "$\mathbf F(P_i)$"
segmento (2.2, 0) (2.2, 2.006) ; gris ; punteada
segmento (2.7, 0) (2.7, 2.274) ; gris ; punteada
segmento (0, 2.006) (2.2, 2.006) ; gris ; punteada
segmento (0, 2.274) (2.7, 2.274) ; gris ; punteada
texto (2.2, -0.2) "$x_i$"
texto (2.85, -0.2) "$x_i + \Delta x_i$"
```

## Trabajo sobre cada subarco

El trabajo que realiza la fuerza $\mathbf F(x;y)$ a lo largo del subarco $\overset{\frown}{P_iP_{i+1}}$ es aproximadamente el producto escalar de la fuerza en $P_i$ por el vector $\Delta\mathbf S_i = (\Delta x_i;\Delta y_i)$:

::: pasos
T_i \simeq \mathbf F(P_i)\cdot\Delta\mathbf S_i
    = \big(F_1(x_i;y_i);\,F_2(x_i;y_i)\big)\cdot(\Delta x_i;\Delta y_i)
    = F_1(x_i;y_i)\,\Delta x_i + F_2(x_i;y_i)\,\Delta y_i                  // producto escalar
:::

Sumando, el trabajo aproximado del campo de fuerzas a lo largo de $C$ es:

$$
T \simeq \sum_{i} F_1(x_i;y_i)\,\Delta x_i + F_2(x_i;y_i)\,\Delta y_i = \sum_{i} \mathbf F(P_i)\cdot\Delta\mathbf S_i
$$

## Definición

::: definicion Integral curvilínea
Si $\max\Delta S$ es la longitud del subarco más largo y hacemos $n \to \infty$ de tal manera que $\max\Delta S \to 0$, obtenemos el trabajo a lo largo de la curva $C$:

$$
T = \lim_{\substack{n\to\infty \\ (\max\Delta S\to 0)}} \sum_{i} F_1(x_i;y_i)\,\Delta x_i + F_2(x_i;y_i)\,\Delta y_i = \int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy
$$

si el límite existe.
:::

Independientemente de la aplicación que se haga, la expresión general de la integral curvilínea para campos vectoriales $\R^2 \xrightarrow{\ \mathbf F\ } \R^2$ es:

::: resultado Integral curvilínea en $\R^2$
$$
I_C = \int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy = \int_C \mathbf F(x;y)\cdot\dd\mathbf S
$$
:::

## En el espacio y en $\R^n$

Para integrar un campo vectorial $\R^3 \xrightarrow{\ \mathbf F\ } \R^3$ sobre una curva en el espacio:

::: resultado Integral curvilínea en $\R^3$
$$
I_C = \int_C F_1(x;y;z)\,\dx + F_2(x;y;z)\,\dy + F_3(x;y;z)\,\dz = \int_C \mathbf F(x;y;z)\cdot\dd\mathbf S
$$
:::

donde

$$
\mathbf F(x;y;z) = \big(F_1(x;y;z);\ F_2(x;y;z);\ F_3(x;y;z)\big) \qquad\wedge\qquad \dd\mathbf S = (\dx;\dy;\dz)
$$

La expresión más general,

$$
I_C = \int_C \mathbf F\cdot\dd\mathbf S
$$

representa la integral de línea de un campo vectorial $\R^n \xrightarrow{\ \mathbf F\ } \R^n$ sobre una curva en $\R^n$. Habitualmente $n$ vale $2$ o $3$, pero puede tomar valores mayores; en ese caso no se pueden graficar ni el campo ni la curva.
