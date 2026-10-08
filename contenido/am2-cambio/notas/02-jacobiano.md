# 2. Relación entre los diferenciales de área

Para establecer la relación entre $\dx\,\dy$ y $\du\,\dd v$ nos concentramos en un subrectángulo $S_{ij}$, de lados $\Delta u_i$ y $\Delta v_j$ con vértice inferior izquierdo $(u_i;v_j)$, y en su imagen $D_{ij} = \mathbf T(S_{ij})$.

::: teorema Cambio de variables en integrales dobles {#cambio}
H) $(x;y) = \mathbf T(u;v)$, con $x = T_1(u;v)$ e $y = T_2(u;v)$ de derivadas parciales continuas en $S$; $\mathbf T$ biunívoca entre $S$ y $D$.
T) $\displaystyle\iint_D f(x;y)\,\dx\,\dy = \iint_S f\big(T_1(u;v);T_2(u;v)\big)\left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\du\,\dd v$
:::

::: idea
$D_{ij}$ es casi un **paralelogramo** cuyos lados son los vectores tangentes $\mathbf T_u\,\Delta u_i$ y $\mathbf T_v\,\Delta v_j$; su área es el módulo del producto vectorial, y ese módulo es el valor absoluto del **jacobiano**.
:::

::: demostracion
**1. Los lados de $D_{ij}$ son curvas.** Si hacemos $v = v_j$ constante (lado inferior de $S_{ij}$), $\mathbf T(u;v_j)$ se comporta como una función vectorial cuya imagen es una curva en el plano $xy$:

$$
\mathbf T(u;v_j) = T_1(u;v_j)\,\mathbf i + T_2(u;v_j)\,\mathbf j
$$

Su derivada en $(u_i;v_j)$ respecto de $u$ es un **vector tangente** a esa curva en el punto $(x_i;y_j) = \big(T_1(u_i;v_j);T_2(u_i;v_j)\big)$:

$$
\mathbf T_u(u_i;v_j) = \pd{T_1}{u}(u_i;v_j)\,\mathbf i + \pd{T_2}{u}(u_i;v_j)\,\mathbf j = \pd{x}{u}(u_i;v_j)\,\mathbf i + \pd{y}{u}(u_i;v_j)\,\mathbf j
$$

De igual forma, con $u = u_i$ constante (lado izquierdo de $S_{ij}$), $\mathbf T(u_i;v) = T_1(u_i;v)\,\mathbf i + T_2(u_i;v)\,\mathbf j$ es otra curva del plano $xy$, y su derivada respecto de $v$ es tangente a ella en $(x_i;y_j)$:

$$
\mathbf T_v(u_i;v_j) = \pd{x}{v}(u_i;v_j)\,\mathbf i + \pd{y}{v}(u_i;v_j)\,\mathbf j
$$

**2. Secantes ≈ tangentes.** Aproximamos $D_{ij} = \mathbf T(S_{ij})$ por el paralelogramo de los **vectores secantes**

$$
\mathbf a = \mathbf T(u_i + \Delta u_i;v_j) - \mathbf T(u_i;v_j) \qquad\wedge\qquad \mathbf b = \mathbf T(u_i;v_j + \Delta v_j) - \mathbf T(u_i;v_j)
$$

Pero las derivadas son los límites de los cocientes incrementales, cuyos numeradores son justamente $\mathbf a$ y $\mathbf b$:

$$
\mathbf T_u(u_i;v_j) = \lim_{\Delta u_i\to 0} \frac{\mathbf T(u_i + \Delta u_i;v_j) - \mathbf T(u_i;v_j)}{\Delta u_i}
\qquad
\mathbf T_v(u_i;v_j) = \lim_{\Delta v_j\to 0} \frac{\mathbf T(u_i;v_j + \Delta v_j) - \mathbf T(u_i;v_j)}{\Delta v_j}
$$

Los límites existen por tener $\mathbf T$ derivadas parciales continuas; entonces, para incrementos chicos, la derivada y el cociente incremental difieren en muy poco:

::: pasos
\mathbf a = \mathbf T(u_i + \Delta u_i;v_j) - \mathbf T(u_i;v_j) \simeq \mathbf T_u(u_i;v_j)\,\Delta u_i
\mathbf b = \mathbf T(u_i;v_j + \Delta v_j) - \mathbf T(u_i;v_j) \simeq \mathbf T_v(u_i;v_j)\,\Delta v_j
:::

```grafico
titulo: $D_{ij}$: secantes $\mathbf a$, $\mathbf b$ y tangentes $\mathbf T_u\,\Delta u_i$, $\mathbf T_v\,\Delta v_j$
x: 0.4..3.4
y: 0.6..3.3
# Los cuatro lados de D_ij, dibujados como curvas de Bézier.
(1 (1 - t)^2 + 1.75 · 2t(1 - t) + 2.2 t^2, 2 (1 - t)^2 + 1.85 · 2t(1 - t) + 1 t^2) ; t: 0..1 ; azul ; ""
(1 (1 - t)^2 + 1.7 · 2t(1 - t) + 1.9 t^2, 2 (1 - t)^2 + 2.3 · 2t(1 - t) + 3 t^2) ; t: 0..1 ; azul ; ""
(2.2 (1 - t)^2 + 2.9 · 2t(1 - t) + 3 t^2, 1 (1 - t)^2 + 1.4 · 2t(1 - t) + 2.2 t^2) ; t: 0..1 ; azul ; ""
(1.9 (1 - t)^2 + 2.7 · 2t(1 - t) + 3 t^2, 3 (1 - t)^2 + 2.9 · 2t(1 - t) + 2.2 t^2) ; t: 0..1 ; azul ; ""
vector (1, 2) (2.2, 1) ; verde ; "$\mathbf a$"
vector (1, 2) (1.9, 3) ; verde ; "$\mathbf b$"
vector (1, 2) (2.5, 1.7) ; ambar ; "$\mathbf T_u\,\Delta u_i$"
vector (1, 2) (2.4, 2.6) ; ambar ; "$\mathbf T_v\,\Delta v_j$"
(1, 2) ; "$\mathbf T(u_i;v_j)$"
(2.2, 1) ; "$\mathbf T(u_i + \Delta u_i;v_j)$"
(1.9, 3) ; "$\mathbf T(u_i;v_j + \Delta v_j)$"
texto (3.15, 2.2) "$D_{ij}$"
```

**3. Área del paralelogramo.** En la medida que $\Delta u_i \to 0$ y $\Delta v_j \to 0$, los vectores secantes tienden a ser tangentes; por eso el área de $D_{ij}$ se aproxima con el módulo del producto vectorial (simplificando la notación):

$$
\Delta A_{ij} \simeq \big|\mathbf T_u\,\Delta u_i \times \mathbf T_v\,\Delta v_j\big| = \big|\mathbf T_u \times \mathbf T_v\big|\,\Delta u_i\,\Delta v_j \label{area}
$$

**4. El producto vectorial es el jacobiano.**

::: pasos
\mathbf T_u \times \mathbf T_v = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\ \pd{x}{u} & \pd{y}{u} & 0 \\ \pd{x}{v} & \pd{y}{v} & 0 \end{vmatrix}
  = \begin{vmatrix} \pd{x}{u} & \pd{y}{u} \\ \pd{x}{v} & \pd{y}{v} \end{vmatrix}\mathbf k               // desarrollando por la tercera columna
  = \begin{vmatrix} \pd{x}{u} & \pd{x}{v} \\ \pd{y}{u} & \pd{y}{v} \end{vmatrix}\mathbf k               // un determinante no cambia al trasponerlo
  = J\!\left(\frac{x\,y}{u\,v}\right)\mathbf k                                                         // el jacobiano de la transformación
:::

Reemplazando en \eqref{area}:

$$
\Delta A_{ij} \simeq \left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\Delta u_i\,\Delta v_j
$$

**5. A la integral.** Con esta relación, la doble suma de Riemann queda

$$
\sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij} \simeq \sum_{j=1}^{m}\sum_{i=1}^{n} f\big(T_1(u_{ij};v_{ij});T_2(u_{ij};v_{ij})\big)\left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\Delta u_i\,\Delta v_j
$$

y tomando límite para $n \to \infty$, $m \to \infty$ de tal manera que $\max\Delta A \to 0$, se obtiene la tesis.
:::

::: resultado Cambio de variables
$$
\iint_D f(x;y)\,\dx\,\dy = \iint_S f\big(T_1(u;v);T_2(u;v)\big)\left|J\!\left(\frac{x\,y}{u\,v}\right)\right|\du\,\dd v
$$
:::

Este procedimiento puede aplicarse también al cambio de variables en **integrales triples**.

::: observacion
Un cambio de variables se realiza **solamente si simplifica** los cálculos de la integral: se deben simplificar los límites de integración, o la función a integrar, o las dos cosas a la vez.
:::
