# 2. Variables separables

::: definicion Ecuación de variables separables (ED de VS)
Una ED es de **variables separables** si puede llegar a expresarse como

$$
f(x)\,\dx + g(y)\,\dy = 0
$$
:::

## Para la forma $y' = f(x;y)$

Si $f(x;y)$ se puede descomponer en **dos factores**, uno que depende solo de $x$ y otro solo de $y$, la ED es de VS:

$$
y' = f(x;y) = p(x)\,q(y) \quad\then\quad \frac{\dd y}{\dd x} = p(x)\,q(y) \quad\then\quad \frac{\dd y}{q(y)} = p(x)\,\dx \qquad\text{(se separan variables)}
$$

Integrando se obtiene la solución:

::: resultado
$$
\int \frac{\dd y}{q(y)} = \int p(x)\,\dx + C \qquad\text{(SG)}
$$
:::

## Para la forma $M(x;y)\,\dx + N(x;y)\,\dy = 0$

Si $M(x;y)$ y $N(x;y)$ se pueden descomponer en factores que dependen solo de $x$ y solo de $y$, la ED es de VS:

$$
p(x)\,q(y)\,\dx + m(x)\,n(y)\,\dy = 0
$$

Se separan variables dividiendo toda la ecuación por $q(y)\,m(x)$:

$$
\frac{p(x)}{m(x)}\,\dx + \frac{n(y)}{q(y)}\,\dy = 0
$$

y se integra:

::: resultado
$$
\int \frac{p(x)}{m(x)}\,\dx + \int \frac{n(y)}{q(y)}\,\dy = C \qquad\text{(SG)}
$$
:::

## Ejemplo

::: ejemplo Hallar la solución general de $y' = y^2\cos 2x$ y la solución particular para la CI $(x;y) = (\pi;1)$
**a) Separando variables**

::: pasos
\frac{\dd y}{\dd x} = y^2\cos 2x
\then \frac{\dd y}{y^2} = \cos 2x\,\dx
\then \int \frac{\dd y}{y^2} = \int \cos 2x\,\dx + C
\then -\frac{1}{y} = \frac{\sen 2x}{2} + C
:::

::: resultado Solución general
$$
\frac{\sen 2x}{2} + \frac{1}{y} = k
$$
:::

**b) La CI.** Reemplazando $(x;y) = (\pi;1)$ en la SG:

$$
\frac{\sen 2\pi}{2} + \frac{1}{1} = k \quad\then\quad k = 1
$$

::: resultado Solución particular para la CI $(\pi;1)$
$$
\frac{\sen 2x}{2} + \frac{1}{y} = 1
$$
:::

```grafico
titulo: La SP $y = \dfrac{1}{1 - \frac{\sen 2x}{2}}$, que pasa por $(\pi;1)$
y = 1/(1 - sen(2x)/2) ; rojo ; gruesa ; ""
(pi, 1) ; "$(\pi;1)$"
x: 0..6.5
y: -0.3..2.6
marcas: pi
```
:::
