# 3 · Sólidos generales: tipos 1, 2 y 3

*1.ª lectura: 5 min · con lápiz: 12 min*

Para integrar sobre un sólido $S$ **acotado**, se hace lo mismo que en dobles: se lo encierra en un paralelepípedo $B$ y se define

$$
F(x;y;z) = \begin{cases} f(x;y;z) & \text{si } (x;y;z) \text{ está en } S \\ 0 & \text{si } (x;y;z) \text{ está en } B \text{ pero no en } S \end{cases}
\qquad\Rightarrow\qquad
\iiint_S f\,\dx\,\dy\,\dz = \iiint_B F\,\dx\,\dy\,\dz
$$

La clave es **entre qué dos superficies queda el sólido**: esa variable se integra primero, y lo que queda es una integral doble sobre la **sombra** $D$ del sólido en un plano coordenado.

## Tipo 1: entre $z = \mu_1(x;y)$ y $z = \mu_2(x;y)$

$$
S = \{(x;y;z) \,/\, (x;y) \in D \wedge \mu_1(x;y) \le z \le \mu_2(x;y)\}
$$

```grafico3d
titulo: Tipo 1: $S$ entre dos superficies; su sombra $D$ en el plano $xy$
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
```

::: resultado Tipo 1: primero se integra en $z$
$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iint_D \dx\,\dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f(x;y;z)\,\dz
$$
:::

Se usa porque $F = f$ entre $\mu_1$ y $\mu_2$, y $F = 0$ afuera.

::: aclaracion
El apunte dice "$F(x;y;z) = 0$ cuando $z \le \mu_1(x;y) \wedge z \ge \mu_2(x;y)$". Debe leerse con $\vee$ ("o"): ningún $z$ puede estar a la vez debajo de $\mu_1$ y arriba de $\mu_2$. Es lo mismo que en dobles.
:::

Después se integra sobre $D$ **como en dobles**:

| Si $D$ es… | queda |
|---|---|
| tipo 1: $a \le x \le b$, $g_1(x) \le y \le g_2(x)$ | $\displaystyle\int_a^b \dx \int_{g_1(x)}^{g_2(x)} \dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f\,\dz$ |
| tipo 2: $c \le y \le d$, $h_1(y) \le x \le h_2(y)$ | $\displaystyle\int_c^d \dy \int_{h_1(y)}^{h_2(y)} \dx \int_{\mu_1(x;y)}^{\mu_2(x;y)} f\,\dz$ |

## Tipo 2: entre $x = \mu_1(y;z)$ y $x = \mu_2(y;z)$

```grafico3d
titulo: Tipo 2: la sombra $D$ está en el plano $yz$
3 - 0.7 raiz(1 - y^2 - (z-1.5)^2) <= x <= 3 + 0.7 raiz(1 - y^2 - (z-1.5)^2)
x: 0..4
vista: 40, 18
```

::: resultado Tipo 2: primero se integra en $x$
$$
\iiint_S f\,\dx\,\dy\,\dz = \iint_D \dy\,\dz \int_{\mu_1(y;z)}^{\mu_2(y;z)} f(x;y;z)\,\dx
$$
:::

## Tipo 3: entre $y = \mu_1(x;z)$ e $y = \mu_2(x;z)$

```grafico3d
titulo: Tipo 3: la sombra $D$ está en el plano $xz$
3 - 0.7 raiz(1 - x^2 - (z-1.5)^2) <= y <= 3 + 0.7 raiz(1 - x^2 - (z-1.5)^2)
y: 0..4
vista: 25, 18
```

::: resultado Tipo 3: primero se integra en $y$
$$
\iiint_S f\,\dx\,\dy\,\dz = \iint_D \dx\,\dz \int_{\mu_1(x;z)}^{\mu_2(x;z)} f(x;y;z)\,\dy
$$
:::

En los tipos 2 y 3, lo que queda se integra sobre $D$ según sea región simple tipo 1 o tipo 2 en su plano ($yz$ o $xz$).

## Ejemplo

::: ejemplo Calcular $\displaystyle\iiint_S z\sqrt{1 - y^2}\,\dx\,\dy\,\dz$, siendo $S$ el sólido encerrado por $x^2 + y^2 = 1$, $z = 0$ y $z = 1$
Intentalo antes de abrir la solución: **a)** gráfico y tipo, **b)** límites, **c)** cálculo.

::: solucion
**a)** Un cilindro de radio $1$ entre $z = 0$ y $z = 1$: tipo 1, con $D$ el círculo $x^2 + y^2 \le 1$.

```grafico3d
titulo: $0 \le z \le 1$ sobre el círculo $x^2 + y^2 \le 1$
0 <= z <= 1, x^2 + y^2 <= 1
```

**b)** Del borde $x^2 + y^2 = 1$: $x = \pm\sqrt{1 - y^2}$ (o $y = \pm\sqrt{1 - x^2}$). Con $y$ por fuera, $x$ va de $-\sqrt{1-y^2}$ a $\sqrt{1-y^2}$.

**c)**

::: pasos
I_S = \int_{-1}^{1} \dy \int_{-\sqrt{1-y^2}}^{\sqrt{1-y^2}} \dx \int_0^1 z\sqrt{1-y^2}\,\dz
    = \int_{-1}^{1} \sqrt{1-y^2}\,\dy \int_{-\sqrt{1-y^2}}^{\sqrt{1-y^2}} \dx\ \eval{\frac{z^2}{2}}{0}{1}      // $\sqrt{1-y^2}$ no depende de $x$ ni de $z$
    = \frac{1}{2}\int_{-1}^{1} \sqrt{1-y^2}\,\dy \cdot \eval{x}{-\sqrt{1-y^2}}{\sqrt{1-y^2}}
    = \frac{1}{2}\int_{-1}^{1} \sqrt{1-y^2}\cdot 2\sqrt{1-y^2}\,\dy
    = \int_{-1}^{1} \left(1 - y^2\right)\dy                                                                // la raíz desaparece
    = \eval{\left(y - \frac{y^3}{3}\right)}{-1}{1} = 1 - \frac{1}{3} - \left(-1 + \frac{1}{3}\right) = \frac{4}{3}
:::

::: resultado
$$
\iiint_S z\sqrt{1 - y^2}\,\dx\,\dy\,\dz = \frac{4}{3}
$$
:::
:::
:::
