# 3. Dominios espaciales generales

Se quiere integrar $f(x;y;z)$ sobre un dominio espacial $S$, **acotado**, usando el mismo procedimiento que en integrales dobles: se encierra a $S$ con un paralelepípedo rectángulo $B$.

```grafico3d
titulo: El sólido $S$, encerrado en el paralelepípedo $B$
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
segmento (-2.6, -2.6, 1.5) (2.6, -2.6, 1.5) ; gris
segmento (2.6, -2.6, 1.5) (2.6, 2.6, 1.5) ; gris
segmento (2.6, 2.6, 1.5) (-2.6, 2.6, 1.5) ; gris
segmento (-2.6, 2.6, 1.5) (-2.6, -2.6, 1.5) ; gris
segmento (-2.6, -2.6, 5) (2.6, -2.6, 5) ; gris
segmento (2.6, -2.6, 5) (2.6, 2.6, 5) ; gris
segmento (2.6, 2.6, 5) (-2.6, 2.6, 5) ; gris
segmento (-2.6, 2.6, 5) (-2.6, -2.6, 5) ; gris
segmento (-2.6, -2.6, 1.5) (-2.6, -2.6, 5) ; gris
segmento (2.6, -2.6, 1.5) (2.6, -2.6, 5) ; gris
segmento (2.6, 2.6, 1.5) (2.6, 2.6, 5) ; gris
segmento (-2.6, 2.6, 1.5) (-2.6, 2.6, 5) ; gris
texto (2.6, 2.6, 5.3) "$B$"
texto (1.9, 1.9, 3.3) "$S$"
```

Se define la función

$$
F(x;y;z) = \begin{cases} f(x;y;z) & \text{si } (x;y;z) \text{ está en } S \\ 0 & \text{si } (x;y;z) \text{ está en } B \text{ pero no en } S \end{cases}
$$

y entonces:

::: resultado
$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iiint_B F(x;y;z)\,\dx\,\dy\,\dz
$$
:::

Para el cálculo, según cómo sea $S$, se distinguen tres casos.

## Región simple tipo 1

$S$ está entre dos superficies $z = \mu_1(x;y)$ (abajo) y $z = \mu_2(x;y)$ (arriba), sobre una región $D$ del plano $xy$:

$$
S = \{(x;y;z) \,/\, (x;y) \in D \wedge \mu_1(x;y) \le z \le \mu_2(x;y)\}
$$

```grafico3d
titulo: Tipo 1: $S$ entre $z = \mu_1(x;y)$ y $z = \mu_2(x;y)$; su sombra $D$ en el plano $xy$
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
texto (0, 0, 4.9) "$z = \mu_2(x;y)$"
texto (2.2, 0, 2.6) "$z = \mu_1(x;y)$"
texto (1.2, 1.2, 0) "$D$"
```

Con integrales sucesivas en $B = [a;b]\times[c;d]\times[p;q]$:

::: pasos
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iiint_B F(x;y;z)\,\dx\,\dy\,\dz                    // definición de $F$
  = \iint_R \dx\,\dy \int_p^q F(x;y;z)\,\dz                                              // primero se integra en $z$, con $R = [a;b]\times[c;d]$
  = \iint_R \dx\,\dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} F(x;y;z)\,\dz                       // $F = 0$ si $z < \mu_1(x;y)$ o $z > \mu_2(x;y)$
  = \iint_D \dx\,\dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f(x;y;z)\,\dz                       // $F = f$ cuando $\mu_1(x;y) \le z \le \mu_2(x;y)$
:::

::: aclaracion
El apunte dice "$F(x;y;z) = 0$ cuando $z \le \mu_1(x;y) \wedge z \ge \mu_2(x;y)$". Debe leerse con $\vee$ ("o"): ningún $z$ puede estar a la vez debajo de $\mu_1$ y arriba de $\mu_2$. Es lo mismo que en [[3. Dominios generales]] de dobles.
:::

::: resultado Tipo 1: primero se integra en $z$
$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iint_D \dx\,\dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f(x;y;z)\,\dz
$$
:::

Luego se prosigue integrando sobre $D$, y esto ya se sabe hacer:

- Si $D$ es de **tipo 1**, $D = \{(x;y) \,/\, a \le x \le b \wedge g_1(x) \le y \le g_2(x)\}$:

$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} \dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f(x;y;z)\,\dz
$$

- Si $D$ es de **tipo 2**, $D = \{(x;y) \,/\, c \le y \le d \wedge h_1(y) \le x \le h_2(y)\}$:

$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \int_c^d \dy \int_{h_1(y)}^{h_2(y)} \dx \int_{\mu_1(x;y)}^{\mu_2(x;y)} f(x;y;z)\,\dz
$$

## Región simple tipo 2

$S$ está entre $x = \mu_1(y;z)$ y $x = \mu_2(y;z)$, sobre una región $D$ del plano $yz$:

$$
S = \{(x;y;z) \,/\, (y;z) \in D \wedge \mu_1(y;z) \le x \le \mu_2(y;z)\}
$$

```grafico3d
titulo: Tipo 2: $S$ entre $x = \mu_1(y;z)$ y $x = \mu_2(y;z)$; $D$ en el plano $yz$
3 - 0.7 raiz(1 - y^2 - (z-1.5)^2) <= x <= 3 + 0.7 raiz(1 - y^2 - (z-1.5)^2)
x: 0..4
vista: 40, 18
```

::: resultado Tipo 2: primero se integra en $x$
$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iint_D \dy\,\dz \int_{\mu_1(y;z)}^{\mu_2(y;z)} f(x;y;z)\,\dx
$$
:::

Luego se integra sobre $D$ según se trate de una región simple tipo 1 o tipo 2 en el plano $yz$.

## Región simple tipo 3

$S$ está entre $y = \mu_1(x;z)$ e $y = \mu_2(x;z)$, sobre una región $D$ del plano $xz$:

$$
S = \{(x;y;z) \,/\, (x;z) \in D \wedge \mu_1(x;z) \le y \le \mu_2(x;z)\}
$$

```grafico3d
titulo: Tipo 3: $S$ entre $y = \mu_1(x;z)$ e $y = \mu_2(x;z)$; $D$ en el plano $xz$
3 - 0.7 raiz(1 - x^2 - (z-1.5)^2) <= y <= 3 + 0.7 raiz(1 - x^2 - (z-1.5)^2)
y: 0..4
vista: 25, 18
```

::: resultado Tipo 3: primero se integra en $y$
$$
\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iint_D \dx\,\dz \int_{\mu_1(x;z)}^{\mu_2(x;z)} f(x;y;z)\,\dy
$$
:::

Luego se integra sobre $D$ según se trate de una región simple tipo 1 o tipo 2 en el plano $xz$.

## Ejemplo

::: ejemplo Calcular $\displaystyle\iiint_S z\sqrt{1 - y^2}\,\dx\,\dy\,\dz$, siendo $S$ el sólido encerrado por $x^2 + y^2 = 1$, $z = 0$ y $z = 1$
**a) Dominio de integración**

Un cilindro de radio $1$ entre los planos $z = 0$ y $z = 1$: es de tipo 1, con $0 \le z \le 1$ sobre el círculo $D$: $x^2 + y^2 \le 1$.

```grafico3d
titulo: $0 \le z \le 1$ sobre el círculo $x^2 + y^2 \le 1$
0 <= z <= 1, x^2 + y^2 <= 1
texto (0, 0, 1.3) "$S$"
```

Del borde $x^2 + y^2 = 1$ salen

$$
x = \pm\sqrt{1 - y^2} \qquad\qquad y = \pm\sqrt{1 - x^2}
$$

**b) Orden de integración:** primero $z$ (tipo 1); después $x$, de $-\sqrt{1-y^2}$ a $\sqrt{1-y^2}$; por último $y$, de $-1$ a $1$.

**c) Cálculo**

::: pasos
I_S = \int_{-1}^{1} \dy \int_{-\sqrt{1-y^2}}^{\sqrt{1-y^2}} \dx \int_0^1 z\sqrt{1-y^2}\,\dz
    = \int_{-1}^{1} \sqrt{1-y^2}\,\dy \int_{-\sqrt{1-y^2}}^{\sqrt{1-y^2}} \dx \, \eval{\frac{z^2}{2}}{0}{1}    // $\sqrt{1-y^2}$ no depende de $x$ ni de $z$
    = \frac{1}{2}\int_{-1}^{1} \sqrt{1-y^2}\,\dy \cdot \eval{x}{-\sqrt{1-y^2}}{\sqrt{1-y^2}}
    = \frac{1}{2}\int_{-1}^{1} \sqrt{1-y^2}\cdot 2\sqrt{1-y^2}\,\dy                                            // $\sqrt{1-y^2} - \left(-\sqrt{1-y^2}\right) = 2\sqrt{1-y^2}$
    = \int_{-1}^{1} \left(1 - y^2\right)\dy                                                                    // $\left(\sqrt{1-y^2}\right)^2 = 1 - y^2$
    = \eval{\left(y - \frac{y^3}{3}\right)}{-1}{1}
    = 1 - \frac{1}{3} - \left(-1 + \frac{1}{3}\right) = \frac{4}{3}
:::

::: resultado
$$
\iiint_S z\sqrt{1 - y^2}\,\dx\,\dy\,\dz = \frac{4}{3}
$$
:::

Dejar $y$ para el final conviene: la raíz del integrando y la de los límites de $x$ se multiplican y desaparecen.
:::
