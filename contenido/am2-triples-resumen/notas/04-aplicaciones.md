# 4 · Propiedades y volumen

*1.ª lectura: 5 min · con lápiz: 12 min*

## Propiedades

Son las mismas que en dobles. Sean $f(x;y;z)$ y $g(x;y;z)$ integrables sobre $S$:

::: propiedades
1. $\displaystyle\iiint_S (f + g) = \iiint_S f + \iiint_S g$
2. $\displaystyle\iiint_S c\,f = c\iiint_S f$, con $c = \cte$
3. $\displaystyle\iiint_S f = \iiint_{S_1} f + \iiint_{S_2} f$, siendo $S = S_1 \cup S_2$ unión de regiones simples.
4. Si $f \ge g$ en todo $S$: $\displaystyle\iiint_S f \ge \iiint_S g$
5. Si $f = 1$ en todo $S$: $\displaystyle\iiint_S 1\,\dx\,\dy\,\dz = \iiint_S \dx\,\dy\,\dz = V(S)$, el **volumen** del recinto $S$.
6. Si $m \le f \le M$ en todo $S$: $\displaystyle m\,V(S) \le \iiint_S f \le M\,V(S)$
:::

(En todas se integra respecto de $\dx\,\dy\,\dz$.)

## Volumen

Por la propiedad 5:

::: resultado
$$
V(S) = \iiint_S \dx\,\dy\,\dz
$$
:::

::: observacion
Si $S$ es tipo 1, integrar primero $\int_{\mu_1}^{\mu_2} \dz = \mu_2 - \mu_1$ deja $\iint_D [\mu_2 - \mu_1]\,\dx\,\dy$: **la misma fórmula de volumen de dobles**.
:::

## Ejemplo

::: ejemplo Calcular con integral triple el volumen del cuerpo del primer octante limitado por $x^2 + y^2 = 4$, $z = 0$, $z = y$ y $x = 0$
Intentalo antes de abrir la solución: **a)** gráfico y tipo, **b)** límites, **c)** cálculo.

::: solucion
**a)** $S$ es tipo 1: $S = \{(x;y;z) \,/\, (x;y) \in D \wedge 0 \le z \le y\}$, con $D$ el cuarto de círculo de radio $2$ del primer cuadrante.

```grafico3d
titulo: $0 \le z \le y$ sobre el cuarto de círculo $x^2 + y^2 \le 4$
0 <= z <= y, x^2 + y^2 <= 4, x >= 0, y >= 0
```

**b)** En $D$: $0 \le x \le 2$ y $0 \le y \le \sqrt{4 - x^2}$.

**c)**

::: pasos
V(S) = \iiint_S \dx\,\dy\,\dz = \iint_D \dx\,\dy \int_0^y \dz
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} \dy \int_0^y \dz
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} \eval{z}{0}{y}\,\dy
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} y\,\dy
     = \int_0^2 \eval{\frac{y^2}{2}}{0}{\sqrt{4-x^2}}\dx
     = \frac{1}{2}\int_0^2 \left(4 - x^2\right)\dx                       // $\left(\sqrt{4-x^2}\right)^2 = 4 - x^2$
     = \frac{1}{2}\eval{\left(4x - \frac{x^3}{3}\right)}{0}{2} = \frac{1}{2}\left(8 - \frac{8}{3}\right) = \frac{8}{3}
:::

::: resultado
$$
V(S) = \frac{8}{3}
$$
:::
:::
:::
