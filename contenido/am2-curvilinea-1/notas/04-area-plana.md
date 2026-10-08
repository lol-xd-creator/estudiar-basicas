# 4. Área plana con integral curvilínea

Intentamos calcular el **área de una región plana simple $D$** limitada por una curva cerrada simple, recorrida en **sentido positivo** (antihorario), mediante una integral curvilínea.

## Si $D$ es de tipo 1

$$
D = \{(x;y) \,/\, x_1 \le x \le x_2 \wedge f_1(x) \le y \le f_2(x)\}
$$

```grafico
titulo: Tipo 1: $C_1$ abajo ($y = f_1(x)$) y $C_2$ arriba ($y = f_2(x)$), en sentido antihorario
x: -0.5..5
y: -0.4..4
(2.5 + 1.8 cos(t), 2 + 1.3 sin(t)) ; t: pi..2pi ; flecha ; azul ; "$C_1$: $y = f_1(x)$"
(2.5 + 1.8 cos(t), 2 + 1.3 sin(t)) ; t: 0..pi ; flecha ; rojo ; "$C_2$: $y = f_2(x)$"
texto (2.5, 2) "$D$"
segmento (0.7, 0) (0.7, 2) ; gris ; punteada
segmento (4.3, 0) (4.3, 2) ; gris ; punteada
texto (0.7, -0.25) "$x_1$"
texto (4.3, -0.25) "$x_2$"
```

::: demostracion $A(D) = -\oint_C y\,\dx$
Sabemos que el área de esta región mediante integral doble es:

$$
A(D) = \iint_D \dx\,\dy = \int_{x_1}^{x_2} \big[f_2(x) - f_1(x)\big]\dx = \int_{x_1}^{x_2} f_2(x)\,\dx - \int_{x_1}^{x_2} f_1(x)\,\dx \label{tipo1}
$$

siendo

$$
C = C_1 \cup C_2 \qquad\wedge\qquad C_1: \begin{cases} y = f_1(x) \\ x_1 \le x \le x_2 \end{cases} \qquad\wedge\qquad -C_2: \begin{cases} y = f_2(x) \\ x_1 \le x \le x_2 \end{cases}
$$

A la última curva se la llama $-C_2$ porque, al recorrer $x$ de $x_1$ a $x_2$, la función $f_2(x)$ se recorre **en el sentido inverso** al de $C_2$.

Se procede al revés que para calcular integrales curvilíneas: se reemplaza $f_2(x)$, con $x_1 \le x \le x_2$, por la variable $y$, indicando que se integra sobre la curva $-C_2$; y lo mismo con $f_1(x)$ en el mismo intervalo, indicando que se integra sobre $C_1$:

::: pasos
A(D) = \int_{-C_2} y\,\dx - \int_{C_1} y\,\dx                      // en \eqref{tipo1}, $f_2(x) = y$ sobre $-C_2$ y $f_1(x) = y$ sobre $C_1$
     = -\int_{C_2} y\,\dx - \int_{C_1} y\,\dx                      // propiedad 1: $\int_{-C_2} y\,\dx = -\int_{C_2} y\,\dx$
     = -\left(\int_{C_2} y\,\dx + \int_{C_1} y\,\dx\right)
     = -\oint_C y\,\dx                                              // propiedad 2: $C = C_1 \cup C_2$
:::
:::

::: resultado Tipo 1
$$
A(D) = -\oint_C y\,\dx
$$
:::

## Si $D$ es de tipo 2

$$
D = \{(x;y) \,/\, y_1 \le y \le y_2 \wedge h_1(y) \le x \le h_2(y)\}
$$

```grafico
titulo: Tipo 2: $L_2$ a la derecha ($x = h_2(y)$) y $L_1$ a la izquierda ($x = h_1(y)$), en sentido antihorario
x: -0.5..5
y: -0.4..4
(2.5 + 1.6 cos(t), 2 + 1.4 sin(t)) ; t: -pi/2..pi/2 ; flecha ; azul ; "$L_2$: $x = h_2(y)$"
(2.5 + 1.6 cos(t), 2 + 1.4 sin(t)) ; t: pi/2..3pi/2 ; flecha ; rojo ; "$L_1$: $x = h_1(y)$"
texto (2.5, 2) "$D$"
segmento (0, 0.6) (2.5, 0.6) ; gris ; punteada
segmento (0, 3.4) (2.5, 3.4) ; gris ; punteada
texto (-0.25, 0.6) "$y_1$"
texto (-0.25, 3.4) "$y_2$"
```

::: demostracion $A(D) = \oint_L x\,\dy$
Con integral doble:

$$
A(D) = \iint_D \dx\,\dy = \int_{y_1}^{y_2} \big[h_2(y) - h_1(y)\big]\dy = \int_{y_1}^{y_2} h_2(y)\,\dy - \int_{y_1}^{y_2} h_1(y)\,\dy
$$

siendo

$$
L = L_1 \cup L_2 \qquad\wedge\qquad -L_1: \begin{cases} x = h_1(y) \\ y_1 \le y \le y_2 \end{cases} \qquad\wedge\qquad L_2: \begin{cases} x = h_2(y) \\ y_1 \le y \le y_2 \end{cases}
$$

Con un procedimiento análogo:

::: pasos
A(D) = \int_{L_2} x\,\dy - \int_{-L_1} x\,\dy
     = \int_{L_2} x\,\dy + \int_{L_1} x\,\dy                       // propiedad 1
     = \oint_L x\,\dy                                               // propiedad 2
:::
:::

::: resultado Tipo 2
$$
A(D) = \oint_L x\,\dy
$$
:::

## La fórmula

Como fórmula para calcular áreas planas con integrales curvilíneas, suele usarse la **semisuma** de ambos desarrollos:

::: resultado Área plana con integral curvilínea
$$
A(D) = \frac{1}{2}\oint_L -y\,\dx + x\,\dy
$$
:::

::: aclaracion
El apunte escribe $\int_C$ e $\int_L$; uso $\oint$ (la notación habitual de la integral sobre una curva **cerrada**) para remarcar que $C$ y $L$ son el borde completo de $D$, recorrido en sentido positivo. Es la misma integral.
:::

## Ejemplo

::: ejemplo Calcular, utilizando integral de línea, el área encerrada por las curvas $y^2 = 9x$ e $y = 3x$
**a) La curva.** Las curvas se cortan en $(0;0)$ y $(1;3)$. El borde $C = C_1 \cup C_2$, en sentido antihorario: $C_1$ por la recta de $(0;0)$ a $(1;3)$, y $C_2$ por la parábola de vuelta a $(0;0)$.

```grafico
(t, 3 t) ; t: 0..1 ; flecha ; azul ; "$C_1$"
((1 - t)^2, 3 (1 - t)) ; t: 0..1 ; flecha ; rojo ; "$C_2$"
3x <= y <= 3 raiz(x), 0 <= x <= 1 ; "$D$"
(0, 0) ; "$(0;0)$"
(1, 3) ; "$(1;3)$"
x: -0.4..1.8
y: -0.3..3.5
```

$$
C_1: \begin{cases} y = 3x \\ 0 \le x \le 1 \end{cases} \qquad \dy = 3\,\dx
$$

$$
-C_2: \begin{cases} x = \dfrac{y^2}{9} \\[4pt] 0 \le y \le 3 \end{cases} \qquad \dx = \frac{2}{9}y\,\dy
$$

**b) Cálculo**

Por la propiedad 2, se integra por tramos:

$$
A(D) = \frac{1}{2}\oint_C -y\,\dx + x\,\dy = \frac{1}{2}\int_{C_1} -y\,\dx + x\,\dy + \frac{1}{2}\int_{C_2} -y\,\dx + x\,\dy
$$

Sobre $C_1$ la integral se anula:

$$
\int_{C_1} -y\,\dx + x\,\dy = \int_0^1 -3x\,\dx + x\cdot 3\,\dx = 0
$$

Sobre $C_2$, $y$ va de $3$ a $0$:

::: pasos
A(D) = \frac{1}{2}\int_3^0 -y\cdot\frac{2}{9}y\,\dy + \frac{y^2}{9}\,\dy
     = \frac{1}{2}\int_3^0 \left(-\frac{2}{9}y^2 + \frac{y^2}{9}\right)\dy
     = \frac{1}{2}\int_3^0 -\frac{y^2}{9}\,\dy
     = \frac{1}{2}\,\eval{\left(-\frac{y^3}{27}\right)}{3}{0}
     = \frac{1}{2}\,(0 + 1)
:::

::: resultado
$$
A(D) = \frac{1}{2}
$$
:::

Verificación con integral doble: $\displaystyle\int_0^1 \left(3\sqrt x - 3x\right)\dx = 2 - \frac{3}{2} = \frac{1}{2}$.
:::
