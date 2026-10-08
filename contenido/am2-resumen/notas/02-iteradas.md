# 2 · Cómo se calcula: integrales iteradas

*1.ª lectura: 5 min · con lápiz: 12 min*

El cálculo práctico se reduce a **dos integrales simples, una después de la otra**: las integrales sucesivas o iteradas.

::: resultado Integrales iteradas en un rectángulo
Si $f(x;y)$ es integrable en $R = [a;b]\times[c;d]$:

$$
\iint_R f(x;y)\,\dx\,\dy = \int_a^b \dx \int_c^d f(x;y)\,\dy = \int_c^d \dy \int_a^b f(x;y)\,\dx
$$
:::

**Cómo se lee:** la primera integral que se resuelve es **la de la derecha**. En $\int_a^b \dx \int_c^d f(x;y)\,\dy$ se integra primero respecto de $y$, con $x$ **constante**, y al resultado se lo integra respecto de $x$.

## Por qué funciona

::: idea
Cortar el sólido con planos $x = \cte$ y sumar las rebanadas.
:::

Integrando primero en $y$ (con $x$ constante) queda una función de $x$:

$$
\int_c^d f(x;y)\,\dy = F(x)
$$

$F(x)$ es el **área del corte**: la figura debajo de la curva $C$ en el plano $x = \cte$.

```grafico3d
titulo: El corte $x = \text{cte}$: la curva $C$ y el área $F(x)$ debajo de ella
z = 2 + x^2/3 + y^2/4 ; corte x = 1.2
texto (1.2, 3.2, 5.3) "$C$"
texto (1.2, 1.5, 1.2) "$F(x)$"
x: 0..2.5
y: 0..3
```

Cada rebanada de espesor $\Delta x_i$ tiene volumen $F(\varepsilon_i)\,\Delta x_i$, con $\varepsilon_i$ en $[x_{i-1};x_i]$. Sumando y tomando límite:

::: pasos
V = \lim_{\substack{n\to\infty \\ (\max\Delta x \to 0)}} \sum_{i=1}^{n} F(\varepsilon_i)\,\Delta x_i   // suma de Riemann de las rebanadas
  = \int_a^b F(x)\,\dx                                                                            // integral simple
  = \int_a^b \dx \int_c^d f(x;y)\,\dy                                                              // reemplazando $F(x)$
:::

De la misma manera, integrando primero respecto de $x$ y al resultado respecto de $y$, se obtiene el mismo valor: por eso las dos formas del recuadro dan lo mismo.

::: observacion
Se razonó con $f \ge 0$, pero el cálculo vale igual si $f$ toma valores negativos. El resultado es entonces una suma algebraica de valores positivos y negativos, que **ya no representa un volumen**.
:::

## Ejemplo

::: ejemplo Calcular $\displaystyle\iint_R x^2y^3\,\dx\,\dy$ con $R$: $1 \le x \le 2 \wedge 0 \le y \le 2$
Intentalo antes de abrir la solución: **a)** gráfico del dominio, **b)** orden de integración, **c)** cálculo.

::: solucion
**a)** $R$ es el rectángulo $[1;2]\times[0;2]$.

```grafico
1 <= x <= 2, 0 <= y <= 2 ; "$R$"
x: -0.5..3
y: -0.5..2.6
```

**b)** Primero $x$. Con límites constantes, cualquier orden está bien.

**c)**

::: pasos
I_R = \int_0^2 \dy \int_1^2 x^2 y^3\,\dx
    = \int_0^2 y^3\,\dy \int_1^2 x^2\,\dx                // $y^3$ es constante al integrar en $x$
    = \int_0^2 y^3\,\dy \cdot \eval{\frac{x^3}{3}}{1}{2}
    = \frac{7}{3}\int_0^2 y^3\,\dy                       // $\frac{8}{3} - \frac{1}{3} = \frac{7}{3}$
    = \frac{7}{3} \cdot \eval{\frac{y^4}{4}}{0}{2}
    = \frac{7}{3} \cdot 4 = \frac{28}{3}
:::

::: resultado
$$
\iint_R x^2y^3\,\dx\,\dy = \frac{28}{3}
$$
:::
:::
:::
