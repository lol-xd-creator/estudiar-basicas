# 6. Soluciones singulares

::: definicion Solución singular
Son las soluciones que **no** se obtienen a partir de la solución general.
:::

La EDO de 1.er orden tiene una expresión de la forma

$$
R(x;y;y') = 0 \label{sing-ed}
$$

y su solución general, la forma

$$
f(x;y;C) = 0 \label{sing-sg}
$$

Si se pudiera obtener la **envolvente** de la familia de curvas que es la SG \eqref{sing-sg}, sería una **solución singular** de \eqref{sing-ed}.

::: definicion Envolvente
$g(x;y) = 0$ es **envolvente** de una familia de curvas si en cada uno de sus puntos es **tangente** a la curva de la familia que pasa por ese punto.
:::

La envolvente y la curva comparten el punto y tienen la misma pendiente en él; por lo tanto, la envolvente **cumple la ED** \eqref{sing-ed}.

::: resultado Ecuación de la envolvente
Si existe, se obtiene **eliminando $C$** de las ecuaciones

$$
\begin{cases} f(x;y;C) = 0 \\[4pt] \pd{f}{C} = 0 \end{cases}
$$
:::

## Ejemplo

::: ejemplo La SG de una ED de 1.er orden es $y = Cx - C^2$. Hallar la solución singular de dicha ED
**a) El sistema**

$$
\begin{cases} y = Cx - C^2 \\[4pt] \pd{y}{C} = x - 2C = 0 \;\then\; x = 2C \;\then\; C = \dfrac{x}{2} \end{cases}
$$

**b) Reemplazando $C$** en la SG:

::: pasos
y = \frac{x}{2}\cdot x - \left(\frac{x}{2}\right)^2
  = \frac{x^2}{2} - \frac{x^2}{4}
  = \frac{x^2}{4}
:::

::: resultado Solución singular (envolvente)
$$
y = \frac{x^2}{4}
$$
:::

```grafico
titulo: Las rectas $y = Cx - C^2$ de la SG y su envolvente $y = \frac{x^2}{4}$, tangente a todas
y = x - 1 ; gris ; "$C = 1$"
y = -x - 1 ; gris ; "$C = -1$"
y = 2x - 4 ; gris ; "$C = 2$"
y = -2x - 4 ; gris ; "$C = -2$"
y = x^2/4 ; rojo ; gruesa ; "$y = \frac{x^2}{4}$"
(2, 1) ; ""
(-2, 1) ; ""
(4, 4) ; ""
(-4, 4) ; ""
x: -5..5
y: -5..5
```

**c) Verificación.** Para verificar, hay que hallar la ED: se elimina $C$ de la SG derivando,

$$
y' = C \quad\then\quad y = y'\,x - \left(y'\right)^2 \qquad\text{(la ED)}
$$

y se reemplaza la solución singular, con $y' = \frac{x}{2}$:

$$
\frac{x^2}{4} = \frac{x}{2}\cdot x - \left(\frac{x}{2}\right)^2 \quad\then\quad \frac{x^2}{4} = \frac{x^2}{2} - \frac{x^2}{4} = \frac{x^2}{4} \qquad\text{(verifica)}
$$

La parábola no se obtiene de la SG con ningún valor de $C$: es una solución singular.
:::
