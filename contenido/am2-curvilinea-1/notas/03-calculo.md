# 3. Cálculo de una integral de línea

Se resuelve **por sustitución**, teniendo en cuenta el **sentido de recorrido** de la curva $C$: se sustituye una o todas las variables independientes del campo vectorial por la o las ecuaciones de la curva, lo que transforma el cálculo en una **integral simple**.

::: observacion
El valor de la integral de línea depende en general, además del campo vectorial, de la **forma** y del **sentido de recorrido** de la curva $C$.
:::

Si queremos integrar $\R^2 \xrightarrow{\ \mathbf F\ } \R^2$ sobre una curva $C \subset \R^2$, la curva puede venir dada de tres formas.

## a) Curva $y = f(x)$, con $x_1 \le x \le x_2$

Al sustituir la variable $y$ del campo vectorial por la ecuación de la curva, también hay que sustituir $\dy$:

$$
\dy = f'(x)\,\dx
$$

Con todo ello:

::: pasos
I_C = \int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy
    = \int_{x_1}^{x_2} F_1\big(x;\hl{f(x)}\big)\,\dx + F_2\big(x;\hl{f(x)}\big)\,\hl{f'(x)\,\dx}      // $y = f(x)$ y $\dy = f'(x)\,\dx$
:::

::: resultado
$$
I_C = \int_{x_1}^{x_2} \Big[F_1\big(x;f(x)\big) + F_2\big(x;f(x)\big)\,f'(x)\Big]\dx
$$
:::

Queda claro que el cálculo se transformó en resolver una integral simple.

::: ejemplo Calcular $\displaystyle\int_C \left(2x^2 + 4xy\right)\dx + \left(2x^2 - y^2\right)\dy$, siendo $C$ la curva $y = x^2$ desde el punto $(1;1)$ al $(2;4)$
**a) La curva**

```grafico
y = x^2 ; x: 1..2 ; flecha ; azul ; "$C$"
(1, 1) ; "$(1;1)$"
(2, 4) ; "$(2;4)$"
x: -0.3..3
y: -0.3..4.6
```

$$
C: \begin{cases} y = x^2 \\ 1 \le x \le 2 \end{cases} \qquad\qquad \dy = 2x\,\dx
$$

**b) Cálculo**

::: pasos
I_C = \int_1^2 \left(2x^2 + 4x\cdot x^2\right)\dx + \left(2x^2 - \left(x^2\right)^2\right) 2x\,\dx
    = \int_1^2 \left(-2x^5 + 8x^3 + 2x^2\right)\dx                                                      // $2x^2 + 4x^3 + 4x^3 - 2x^5$
    = \eval{\left(-\frac{1}{3}x^6 + 2x^4 + \frac{2}{3}x^3\right)}{1}{2}
    = -\frac{1}{3}\cdot 64 + 2\cdot 16 + \frac{2}{3}\cdot 8 - \left(-\frac{1}{3} + 2 + \frac{2}{3}\right)
    = 32 - \frac{48}{3} - \frac{1}{3} - 2
    = 30 - \frac{49}{3}
:::

::: resultado
$$
I_C = \frac{41}{3}
$$
:::
:::

## b) Curva $x = f(y)$, con $y_1 \le y \le y_2$

$$
\dx = f'(y)\,\dy
$$

Con el procedimiento análogo:

::: pasos
I_C = \int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy
    = \int_{y_1}^{y_2} F_1\big(\hl{f(y)};y\big)\,\hl{f'(y)\,\dy} + F_2\big(\hl{f(y)};y\big)\,\dy      // $x = f(y)$ y $\dx = f'(y)\,\dy$
:::

::: resultado
$$
I_C = \int_{y_1}^{y_2} \Big[F_1\big(f(y);y\big)\,f'(y) + F_2\big(f(y);y\big)\Big]\dy
$$
:::

::: ejemplo Hallar el valor de $\displaystyle\int_C x^2y\,\dx + y\,\dy$, siendo $-C$: $x = y^2$ con $0 \le y \le 1$
**a) La curva.** El dato es $-C$, que va de $(0;0)$ a $(1;1)$; entonces $C$ va de $(1;1)$ a $(0;0)$, y en la integral $y$ va **de $1$ a $0$**.

```grafico
(t^2, t) ; t: 0..1 ; punteada ; gris ; "$-C$"
((1 - t)^2, 1 - t) ; t: 0..1 ; flecha ; azul ; "$C$"
(0, 0) ; "$(0;0)$"
(1, 1) ; "$(1;1)$"
x: -0.3..1.6
y: -0.3..1.4
```

$$
-C: \begin{cases} x = y^2 \\ 0 \le y \le 1 \end{cases} \qquad\qquad \dx = 2y\,\dy
$$

**b) Cálculo**

::: pasos
I_C = \int_1^0 \left(y^2\right)^2 y\cdot 2y\,\dy + y\,\dy                    // sobre $C$, $y$ va de $1$ a $0$
    = \int_1^0 \left(2y^6 + y\right)\dy
    = \eval{\left(\frac{2}{7}y^7 + \frac{y^2}{2}\right)}{1}{0}
    = 0 - \left(\frac{2}{7} + \frac{1}{2}\right)
:::

::: resultado
$$
I_C = -\frac{11}{14}
$$
:::
:::

## c) Ecuaciones paramétricas de la curva

$$
C(t) = \begin{cases} x = f(t) \\ y = g(t) \end{cases} \qquad\wedge\qquad t_1 \le t \le t_2
$$

```grafico
titulo: La curva paramétrica $C(t)$, de $C(t_1)$ a $C(t_2)$
x: 0..3.6
y: 0..4.4
(1 + 0.25 t + 0.15 t^3, 0.6 + 1.6 (1 - (1 - t/2)^3) + 0.1 t^4) ; t: 0..2 ; flecha ; azul ; "$C(t)$"
(1, 0.6) ; "$C(t_1)$"
(2.7, 3.8) ; "$C(t_2)$"
```

Al reemplazar todas las variables independientes, también hay que reemplazar todos los diferenciales:

$$
\begin{cases} \dx = f'(t)\,\dt \\ \dy = g'(t)\,\dt \end{cases}
$$

Entonces:

::: pasos
I_C = \int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy
    = \int_{t_1}^{t_2} F_1\big(f(t);g(t)\big)\,f'(t)\,\dt + F_2\big(f(t);g(t)\big)\,g'(t)\,\dt
:::

::: resultado
$$
I_C = \int_{t_1}^{t_2} \Big[F_1\big(f(t);g(t)\big)\,f'(t) + F_2\big(f(t);g(t)\big)\,g'(t)\Big]\dt
$$
:::

::: ejemplo Calcular $\displaystyle\int_C xy\,\dx - y^2\,\dy$, siendo $C(t)$: $x = 3t^2$, $y = t^3$, con $0 \le t \le 1$
```grafico
(3 t^2, t^3) ; t: 0..1 ; flecha ; azul ; "$C$"
(0, 0) ; "$t = 0$"
(3, 1) ; "$t = 1$"
x: -0.3..3.6
y: -0.3..1.4
```

**a) Los diferenciales a reemplazar**

$$
\begin{cases} \dx = 6t\,\dt \\ \dy = 3t^2\,\dt \end{cases}
$$

**b) Cálculo**

::: pasos
I_C = \int_0^1 3t^2\cdot t^3\cdot 6t\,\dt - \left(t^3\right)^2\cdot 3t^2\,\dt
    = \int_0^1 \left(18t^6 - 3t^8\right)\dt
    = \eval{\left(\frac{18}{7}t^7 - \frac{1}{3}t^9\right)}{0}{1}
    = \frac{18}{7} - \frac{1}{3}
:::

::: resultado
$$
I_C = \frac{47}{21}
$$
:::
:::

## Curvas en el espacio

Para integrar $\R^3 \xrightarrow{\ \mathbf F\ } \R^3$ sobre una curva $C \subset \R^3$, la curva viene definida por sus ecuaciones paramétricas:

$$
C(t) = \begin{cases} x = f(t) \\ y = g(t) \\ z = h(t) \end{cases} \qquad\wedge\qquad t_1 \le t \le t_2
\qquad\qquad
\begin{cases} \dx = f'(t)\,\dt \\ \dy = g'(t)\,\dt \\ \dz = h'(t)\,\dt \end{cases}
$$

```grafico3d
titulo: Una curva en el espacio, de $C(t_1)$ a $C(t_2)$
(1.5 - t/2, 0.6 + 1.6 t - 0.3 t^2, 1.2 + 0.6 sen(2t)) ; t: 0..3 ; flecha ; azul ; "$C(t)$"
punto (1.5, 0.6, 1.2) ; "$C(t_1)$"
punto (0, 2.7, 1.032) ; "$C(t_2)$"
```

Entonces:

::: resultado
$$
I_C = \int_{t_1}^{t_2} \Big[F_1\big(f(t);g(t);h(t)\big)\,f'(t) + F_2\big(f(t);g(t);h(t)\big)\,g'(t) + F_3\big(f(t);g(t);h(t)\big)\,h'(t)\Big]\dt
$$
:::

::: ejemplo Hallar el valor de $\displaystyle\int_C x^2\,\dx + xy\,\dy + \dz$, siendo $C$: $(x;y;z) = (t;t^2;1)$ con $0 \le t \le 1$
**a) Los diferenciales**

$$
C(t) = \begin{cases} x = t \\ y = t^2 \\ z = 1 \end{cases} \quad\then\quad \begin{cases} \dx = \dt \\ \dy = 2t\,\dt \\ \dz = 0 \end{cases}
$$

```grafico3d
(t, t^2, 1) ; t: 0..1 ; flecha ; azul ; "$C$"
punto (0, 0, 1) ; "$t = 0$"
punto (1, 1, 1) ; "$t = 1$"
```

**b) Cálculo**

::: pasos
I_C = \int_0^1 t^2\,\dt + t\cdot t^2\cdot 2t\,\dt + 0                  // $z = 1$ es constante: $\dz = 0$
    = \int_0^1 \left(t^2 + 2t^4\right)\dt
    = \eval{\left(\frac{2}{5}t^5 + \frac{t^3}{3}\right)}{0}{1}
    = \frac{2}{5} + \frac{1}{3}
:::

::: resultado
$$
I_C = \frac{11}{15}
$$
:::
:::
