# 5. Área y volumen

## Área de regiones planas

Por la propiedad 5:

::: resultado
$$
A(D) = \iint_D \dx\,\dy
$$
:::

::: ejemplo Calcular el área de la figura limitada por $y = 5 - x^2$ e $y + x + 1 = 0$
```grafico
y = 5 - x^2
y = -1 - x
-1 - x <= y <= 5 - x^2 ; "$D$" ; rayado
(-2, 1) ; "$(-2;1)$"
(3, -4) ; "$(3;-4)$"
```

$D$ es de tipo 1. La amplitud de $x$ se obtiene igualando las funciones:

::: pasos
5 - x^2 = -1 - x
\Rightarrow x^2 - x - 6 = 0          // raíces: $x = -2$ y $x = 3$
:::

::: pasos
A(D) = \int_{-2}^{3} \dx \int_{-1-x}^{5-x^2} \dy
     = \int_{-2}^{3} \dx \, \eval{y}{-1-x}{5-x^2}
     = \int_{-2}^{3} \left(-x^2 + x + 6\right)\dx                                      // $(5 - x^2) - (-1 - x)$
     = \eval{\left(-\frac{x^3}{3} + \frac{x^2}{2} + 6x\right)}{-2}{3}
     = \left(-\frac{27}{3} + \frac{9}{2} + 18\right) - \left(\frac{8}{3} + \frac{4}{2} - 12\right)
     = \frac{27}{2} - \left(-\frac{22}{3}\right) = \frac{125}{6}
:::

::: resultado
$$
A(D) = \frac{125}{6}
$$
:::
:::

## Volumen de sólidos en el espacio

Si el sólido está entre $z = f_1(x;y)$ (abajo) y $z = f_2(x;y)$ (arriba), sobre la región $D$ del plano $xy$:

```grafico3d
titulo: Sólido entre $z = f_1(x;y)$ y $z = f_2(x;y)$ sobre $D$
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
```

$$
V = \iint_D f_2(x;y)\,\dx\,\dy - \iint_D f_1(x;y)\,\dx\,\dy
$$

::: resultado
$$
V = \iint_D \big[f_2(x;y) - f_1(x;y)\big]\,\dx\,\dy
$$
:::

Del mismo modo, si el sólido está entre $y = g_1(x;z)$ e $y = g_2(x;z)$ sobre una región $D$ del plano $xz$:

```grafico3d
titulo: Entre $y = g_1(x;z)$ e $y = g_2(x;z)$, con $D$ en el plano $xz$
3 - 0.7 raiz(1 - x^2 - (z-1.5)^2) <= y <= 3 + 0.7 raiz(1 - x^2 - (z-1.5)^2)
y: 0..4
vista: 25, 18
```

::: resultado
$$
V = \iint_D \big[g_2(x;z) - g_1(x;z)\big]\,\dx\,\dz
$$
:::

Y si está entre $x = h_1(y;z)$ y $x = h_2(y;z)$ sobre una región $D$ del plano $yz$:

```grafico3d
titulo: Entre $x = h_1(y;z)$ y $x = h_2(y;z)$, con $D$ en el plano $yz$
3 - 0.7 raiz(1 - y^2 - (z-1.5)^2) <= x <= 3 + 0.7 raiz(1 - y^2 - (z-1.5)^2)
x: 0..4
vista: 40, 18
```

::: resultado
$$
V = \iint_D \big[h_2(y;z) - h_1(y;z)\big]\,\dy\,\dz
$$
:::

## Ejemplo

::: ejemplo Calcular el volumen del cuerpo del primer octante limitado por $x^2 + y^2 = 9$, $z = 2x + 2$ y $z = 2$
```grafico3d
titulo: $2 \le z \le 2x + 2$ sobre $D$, el cuarto de círculo de radio 3
2 <= z <= 2x + 2, x^2 + y^2 <= 9, x >= 0, y >= 0
```

::: pasos
V(S) = \iint_D \big[f_2(x;y) - f_1(x;y)\big]\,\dx\,\dy
     = \iint_D (2x + 2 - 2)\,\dx\,\dy        // $f_2 = 2x + 2$ y $f_1 = 2$
     = \iint_D 2x\,\dx\,\dy
:::

Del borde $x^2 + y^2 = 9$ salen $x = \sqrt{9 - y^2}$ e $y = \sqrt{9 - x^2}$. Conviene integrar **primero en $x$** para eliminar la raíz del límite de integración:

::: pasos
V(S) = \int_0^3 \dy \int_0^{\sqrt{9-y^2}} 2x\,\dx
     = \int_0^3 \dy \, \eval{x^2}{0}{\sqrt{9-y^2}}
     = \int_0^3 \left(9 - y^2\right)\dy                 // $\left(\sqrt{9-y^2}\right)^2 = 9 - y^2$
     = \eval{\left(9y - \frac{y^3}{3}\right)}{0}{3} = 27 - 9
:::

::: resultado
$$
V(S) = 18
$$
:::
:::
