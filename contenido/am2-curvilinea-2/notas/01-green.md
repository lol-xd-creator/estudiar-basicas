# 1. Teorema de Green

Este teorema relaciona una **integral curvilínea** sobre una curva cerrada simple recorrida en sentido positivo con una **integral doble** sobre la región plana simple que encierra aquella curva.

::: teorema Teorema de Green {#green}
H) $C$ es una curva simple cerrada en el plano, recorrida positivamente, que encierra una región simple $D$; $\mathbf F(x;y) = \big(F_1(x;y);F_2(x;y)\big)$ tiene derivadas parciales continuas en $D$.
T) $\displaystyle\oint_C F_1(x;y)\,\dx + F_2(x;y)\,\dy = \iint_D \left(\pd{F_2}{x} - \pd{F_1}{y}\right)\dx\,\dy$
:::

::: demostracion
Se hace considerando que la región $D$ es **doblemente simple**: es una región simple de tipo 1 y de tipo 2 a la vez. El teorema queda demostrado si se prueba que

$$
\text{1)}\ \oint_C F_1(x;y)\,\dx = -\iint_D \pd{F_1}{y}\,\dx\,\dy \qquad\wedge\qquad \text{2)}\ \oint_C F_2(x;y)\,\dy = \iint_D \pd{F_2}{x}\,\dx\,\dy
$$

y se suman.

**1)** Se toma a $D$ como región simple de **tipo 1**:

$$
D = \{(x;y) \,/\, a \le x \le b \wedge f_1(x) \le y \le f_2(x)\}
$$

```grafico
titulo: Tipo 1: $C_1$ abajo ($y = f_1(x)$) y $C_2$ arriba ($y = f_2(x)$)
x: -0.5..5
y: -0.4..4
(2.5 + 1.8 cos(t), 2 + 1.3 sin(t)) ; t: pi..2pi ; flecha ; azul ; "$C_1$: $y = f_1(x)$"
(2.5 + 1.8 cos(t), 2 + 1.3 sin(t)) ; t: 0..pi ; flecha ; rojo ; "$C_2$: $y = f_2(x)$"
texto (2.5, 2) "$D$"
segmento (0.7, 0) (0.7, 2) ; gris ; punteada
segmento (4.3, 0) (4.3, 2) ; gris ; punteada
texto (0.7, -0.25) "$a$"
texto (4.3, -0.25) "$b$"
```

**a)** Empezando por el **segundo miembro** de 1):

::: pasos
-\iint_D \pd{F_1}{y}\,\dx\,\dy = -\int_a^b \dx \int_{f_1(x)}^{f_2(x)} \pd{F_1}{y}\,\dy
  = -\int_a^b \Big[F_1\big(x;f_2(x)\big) - F_1\big(x;f_1(x)\big)\Big]\dx           // $F_1$ es primitiva de $\pd{F_1}{y}$ respecto de $y$
  = \int_a^b \Big[F_1\big(x;f_1(x)\big) - F_1\big(x;f_2(x)\big)\Big]\dx \label{green-a}
:::

**b)** Para el **primer miembro** de 1), con

$$
C = C_1 \cup C_2 \qquad\wedge\qquad C_1: \begin{cases} y = f_1(x) \\ a \le x \le b \end{cases} \qquad\wedge\qquad -C_2: \begin{cases} y = f_2(x) \\ a \le x \le b \end{cases}
$$

::: pasos
\oint_C F_1(x;y)\,\dx = \int_{C_1} F_1(x;y)\,\dx + \int_{C_2} F_1(x;y)\,\dx          // propiedad 2
  = \int_{C_1} F_1(x;y)\,\dx - \int_{-C_2} F_1(x;y)\,\dx                              // propiedad 1
  = \int_a^b F_1\big(x;f_1(x)\big)\,\dx - \int_a^b F_1\big(x;f_2(x)\big)\,\dx        // sustituyendo cada curva
  = \int_a^b \Big[F_1\big(x;f_1(x)\big) - F_1\big(x;f_2(x)\big)\Big]\dx \label{green-b}
:::

Como \eqref{green-a} $=$ \eqref{green-b}:

$$
\oint_C F_1(x;y)\,\dx = -\iint_D \pd{F_1}{y}\,\dx\,\dy
$$

**2)** Se considera a $D$ como región simple de **tipo 2**:

$$
D = \{(x;y) \,/\, c \le y \le d \wedge h_1(y) \le x \le h_2(y)\}
$$

```grafico
titulo: Tipo 2: $L_2$ a la derecha ($x = h_2(y)$) y $L_1$ a la izquierda ($x = h_1(y)$)
x: -0.5..5
y: -0.4..4
(2.5 + 1.6 cos(t), 2 + 1.4 sin(t)) ; t: -pi/2..pi/2 ; flecha ; azul ; "$L_2$: $x = h_2(y)$"
(2.5 + 1.6 cos(t), 2 + 1.4 sin(t)) ; t: pi/2..3pi/2 ; flecha ; rojo ; "$L_1$: $x = h_1(y)$"
texto (2.5, 2) "$D$"
segmento (0, 0.6) (2.5, 0.6) ; gris ; punteada
segmento (0, 3.4) (2.5, 3.4) ; gris ; punteada
texto (-0.25, 0.6) "$c$"
texto (-0.25, 3.4) "$d$"
```

Teniendo en cuenta que

$$
L = L_1 \cup L_2 \qquad\wedge\qquad -L_1: \begin{cases} x = h_1(y) \\ c \le y \le d \end{cases} \qquad\wedge\qquad L_2: \begin{cases} x = h_2(y) \\ c \le y \le d \end{cases}
$$

se procede en forma similar. Los pasos son:

::: pasos
\iint_D \pd{F_2}{x}\,\dx\,\dy = \int_c^d \dy \int_{h_1(y)}^{h_2(y)} \pd{F_2}{x}\,\dx
  = \int_c^d \Big[F_2\big(h_2(y);y\big) - F_2\big(h_1(y);y\big)\Big]\dy
  = \int_{L_2} F_2(x;y)\,\dy - \int_{-L_1} F_2(x;y)\,\dy                          // sustituyendo cada curva
  = \int_{L_2} F_2(x;y)\,\dy + \int_{L_1} F_2(x;y)\,\dy                            // propiedad 1
  = \oint_L F_2(x;y)\,\dy                                                           // propiedad 2
:::

Sumando 1) y 2) queda demostrado el teorema.
:::

::: aclaracion
El apunte dice "procedemos en forma similar" para 2) y da solo el resultado; los pasos de arriba son los análogos a los de 1). También uso $\oint$ para remarcar que la curva es cerrada, como en la 1.ª parte.
:::

## Ejemplo

::: ejemplo Utilizando el teorema de Green, calcular $\displaystyle\oint_C 2xy\,\dx + y^2\,\dy$, con $C$ cerrada, formada por $y = \frac{x}{2}$ e $y = \sqrt x$
**a) Dominio.** Las curvas se cortan en $(0;0)$ y $(4;2)$; $D$ está entre la recta (abajo) y la parábola (arriba).

```grafico
(4 t, 2 t) ; t: 0..1 ; flecha ; azul ; "$C_1$"
((2 - 2 t)^2, 2 - 2 t) ; t: 0..1 ; flecha ; rojo ; "$C_2$"
x/2 <= y <= raiz(x), 0 <= x <= 4 ; "$D$"
(0, 0) ; "$(0;0)$"
(4, 2) ; "$(4;2)$"
x: -0.4..5
y: -0.4..2.6
```

Como región de tipo 2: $0 \le y \le 2$, $y^2 \le x \le 2y$.

**b) Green.** Con $F_1 = 2xy$ y $F_2 = y^2$:

$$
\pd{F_2}{x} - \pd{F_1}{y} = 0 - 2x
$$

**c) Cálculo**

::: pasos
\oint_C F_1\,\dx + F_2\,\dy = \iint_D \left(\pd{F_2}{x} - \pd{F_1}{y}\right)\dx\,\dy
  = \iint_D (0 - 2x)\,\dx\,\dy
  = -\int_0^2 \dy \int_{y^2}^{2y} 2x\,\dx
  = -\int_0^2 \dy \, \eval{x^2}{y^2}{2y}
  = -\int_0^2 \left(4y^2 - y^4\right)\dy
  = -\eval{\left(\frac{4}{3}y^3 - \frac{y^5}{5}\right)}{0}{2}
  = -\left(\frac{32}{3} - \frac{32}{5}\right) = -\frac{160 - 96}{15}
:::

::: resultado
$$
I_C = -\frac{64}{15}
$$
:::
:::
