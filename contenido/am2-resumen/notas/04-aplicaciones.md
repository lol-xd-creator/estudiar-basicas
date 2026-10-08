# 4 · Propiedades, área y volumen

*1.ª lectura: 5 min · con lápiz: 12 min*

## Propiedades

Con $f$ y $g$ integrables sobre $D$:

::: propiedades
1. **Suma:** la integral de $f + g$ es la suma de las integrales.
2. **Constante:** $\displaystyle\iint_D c\,f(x;y)\,\dx\,\dy = c\iint_D f(x;y)\,\dx\,\dy$.
3. **Unión de regiones:** si $D = D_1 \cup D_2$ (regiones simples), $\displaystyle\iint_D f = \iint_{D_1} f + \iint_{D_2} f$. Vale para más pedazos.
4. **Comparación:** si $f \ge g$ en todo $D$, $\displaystyle\iint_D f \ge \iint_D g$.
5. **Área:** si $f = 1$ en $D$, $\displaystyle\iint_D \dx\,\dy = A(D)$.
6. **Cotas:** si $m \le f(x;y) \le M$ en todo $D$, $m\,A(D) \le \displaystyle\iint_D f(x;y)\,\dx\,\dy \le M\,A(D)$.
:::

## Área de una región plana

Por la propiedad 5:

::: resultado
$$
A(D) = \iint_D \dx\,\dy
$$
:::

::: ejemplo Calcular el área de la figura limitada por $y = 5 - x^2$ e $y + x + 1 = 0$
Intentalo antes de abrir la solución. Pista del apunte: la amplitud de $x$ se obtiene **igualando las funciones**.

::: solucion
```grafico
y = 5 - x^2
y = -1 - x
-1 - x <= y <= 5 - x^2 ; "$D$" ; rayado
(-2, 1) ; "$(-2;1)$"
(3, -4) ; "$(3;-4)$"
```

$D$ es de tipo 1, entre $y = -1 - x$ (abajo) e $y = 5 - x^2$ (arriba).

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
:::

## Volumen entre dos superficies

Si el sólido está entre $z = f_1(x;y)$ (abajo) y $z = f_2(x;y)$ (arriba), sobre la región $D$ del plano $xy$, su volumen es la resta de los dos volúmenes:

::: resultado
$$
V = \iint_D \big[f_2(x;y) - f_1(x;y)\big]\,\dx\,\dy
$$
:::

```grafico3d
titulo: Sólido entre $z = f_1(x;y)$ y $z = f_2(x;y)$ sobre $D$
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
```

Lo mismo en las otras direcciones. Entre $y = g_1(x;z)$ e $y = g_2(x;z)$, sobre $D$ en el plano $xz$:

$$
V = \iint_D \big[g_2(x;z) - g_1(x;z)\big]\,\dx\,\dz
$$

Entre $x = h_1(y;z)$ y $x = h_2(y;z)$, sobre $D$ en el plano $yz$:

$$
V = \iint_D \big[h_2(y;z) - h_1(y;z)\big]\,\dy\,\dz
$$

::: ejemplo Calcular el volumen del cuerpo del primer octante limitado por $x^2 + y^2 = 9$, $z = 2x + 2$ y $z = 2$
Intentalo antes de abrir la solución: ¿cuál es la superficie de arriba, cuál la de abajo y qué región $D$ queda en el plano $xy$?

::: solucion
```grafico3d
titulo: El cuerpo: entre $z = 2$ y $z = 2x+2$, dentro de $x^2+y^2 = 9$
2 <= z <= 2x + 2, x^2 + y^2 <= 9, x >= 0, y >= 0
```

Arriba $z = 2x + 2$, abajo $z = 2$; $D$ es el cuarto de círculo $x^2 + y^2 \le 9$ del primer cuadrante.

$$
V(S) = \iint_D \big[(2x + 2) - 2\big]\,\dx\,\dy = \iint_D 2x\,\dx\,\dy
$$

Conviene integrar **primero $x$**, de $0$ a $\sqrt{9 - y^2}$, para eliminar la raíz del límite de integración:

::: pasos
V(S) = \int_0^3 \dy \int_0^{\sqrt{9-y^2}} 2x\,\dx
     = \int_0^3 \dy \, \eval{x^2}{0}{\sqrt{9-y^2}}
     = \int_0^3 \left(9 - y^2\right)\dy                 // la raíz desaparece al elevar al cuadrado
     = \eval{\left(9y - \frac{y^3}{3}\right)}{0}{3}
     = 27 - 9 = 18
:::

::: resultado
$$
V(S) = 18
$$
:::
:::
:::
