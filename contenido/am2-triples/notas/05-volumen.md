# 5. Cálculo de volumen

Por la propiedad 5:

::: resultado
$$
V(S) = \iiint_S \dx\,\dy\,\dz
$$
:::

::: observacion
Si $S$ es de tipo 1, integrar primero en $z$ da $\int_{\mu_1(x;y)}^{\mu_2(x;y)} \dz = \mu_2(x;y) - \mu_1(x;y)$, y queda

$$
V(S) = \iint_D \big[\mu_2(x;y) - \mu_1(x;y)\big]\,\dx\,\dy
$$

que es la fórmula de volumen de [[5. Área y volumen]] de dobles.
:::

## Ejemplo

::: ejemplo Calcular mediante integral triple el volumen del cuerpo limitado por las superficies $x^2 + y^2 = 4$, $z = 0$, $z = y$ y $x = 0$ (primer octante)
**a) Dominio de integración**

```grafico3d
titulo: $0 \le z \le y$ sobre $D$, el cuarto de círculo $x^2 + y^2 \le 4$
0 <= z <= y, x^2 + y^2 <= 4, x >= 0, y >= 0
texto (0, 2, 2.3) "$z = y$"
```

$S$ es de tipo 1:

$$
S = \{(x;y;z) \,/\, (x;y) \in D \wedge 0 \le z \le y\}
$$

con $D$ el cuarto de círculo de radio $2$ del primer cuadrante: $0 \le x \le 2$, $0 \le y \le \sqrt{4 - x^2}$.

**b) Orden de integración:** primero $z$ (tipo 1), después $y$, por último $x$.

**c) Cálculo**

::: pasos
V(S) = \iiint_S \dx\,\dy\,\dz = \iint_D \dx\,\dy \int_0^y \dz                    // tipo 1, con $\mu_1 = 0$ y $\mu_2 = y$
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} \dy \int_0^y \dz                        // $D$ de tipo 1 en el plano $xy$
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} \eval{z}{0}{y}\,\dy
     = \int_0^2 \dx \int_0^{\sqrt{4-x^2}} y\,\dy
     = \int_0^2 \dx \, \eval{\frac{y^2}{2}}{0}{\sqrt{4-x^2}}
     = \frac{1}{2}\int_0^2 \left(4 - x^2\right)\dx                                // $\left(\sqrt{4-x^2}\right)^2 = 4 - x^2$
     = \frac{1}{2}\eval{\left(4x - \frac{x^3}{3}\right)}{0}{2}
     = \frac{1}{2}\left(8 - \frac{8}{3}\right) = \frac{8}{3}
:::

::: resultado
$$
V(S) = \frac{8}{3}
$$
:::
:::
