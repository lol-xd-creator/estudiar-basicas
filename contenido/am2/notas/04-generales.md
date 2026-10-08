# 3. Dominios generales

Se quiere integrar $f(x;y)$ sobre una región $D$ más general, **acotada**: se puede encerrar en una región rectangular $R$.

```grafico3d
titulo: $f(x;y)$ sobre la región $D$, encerrada en el rectángulo $R$
z = 3 + sen(x) cos(y)/2 - (x^2 + y^2)/10 ; sobre x^2 + y^2 <= 4 ; sombra ; "$z = f(x;y)$"
segmento (-2.6, -2.6, 0) (2.6, -2.6, 0) ; gris
segmento (2.6, -2.6, 0) (2.6, 2.6, 0) ; gris
segmento (2.6, 2.6, 0) (-2.6, 2.6, 0) ; gris
segmento (-2.6, 2.6, 0) (-2.6, -2.6, 0) ; gris
texto (2.6, -2.6, 0) "$R$"
texto (0.9, 0.9, 0) "$D$"
```

Se define la función

$$
F(x;y) = \begin{cases} f(x;y) & \text{si } (x;y) \text{ está en } D \\ 0 & \text{si } (x;y) \text{ está en } R \text{ pero no en } D \end{cases}
$$

Si $F(x;y)$ es integrable sobre $R$:

::: resultado
$$
\iint_D f(x;y)\,\dx\,\dy = \iint_R F(x;y)\,\dx\,\dy
$$
:::

No importa qué rectángulo se use, siempre que contenga a $D$.

Si $f(x;y) \ge 0$, $\iint_D f(x;y)\,\dx\,\dy$ es el **volumen del sólido** que está por arriba de $D$ y por debajo de $f(x;y)$. La igualdad es razonable si se comparan las gráficas de $f$ y de $F$: $\iint_R F(x;y)\,\dx\,\dy$ es el volumen debajo de $F(x;y)$.

## Región tipo 1

$$
D = \{(x;y) \,/\, a \le x \le b \wedge g_1(x) \le y \le g_2(x)\}
$$

```grafico
titulo: Tipo 1: para cada $x$, $y$ va de $g_1(x)$ a $g_2(x)$
y = 1.4 + 0.3 sen(1.2x) ; x: 1..5 ; "$y = g_1(x)$"
y = 3.4 + 0.5 cos(1.4x) ; x: 1..5 ; "$y = g_2(x)$"
1.4 + 0.3 sen(1.2x) <= y <= 3.4 + 0.5 cos(1.4x), 1 <= x <= 5 ; "$D$"
segmento (2.6, 0) (2.6, 4.4) ; punteada ; gris
texto (2.6, -0.35) "$x$"
```

Con integrales sucesivas en $R = [a;b]\times[c;d]$:

::: pasos
\iint_D f(x;y)\,\dx\,\dy = \iint_R F(x;y)\,\dx\,\dy        // definición de $F$
  = \int_a^b \dx \int_c^d F(x;y)\,\dy                       // integrales iteradas en $R$
  = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} F(x;y)\,\dy         // $F = 0$ si $y < g_1(x)$ o $y > g_2(x)$
  = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} f(x;y)\,\dy         // $F = f$ cuando $g_1(x) \le y \le g_2(x)$
:::

::: aclaracion
El apunte dice "$F(x;y) = 0$ si $y < g_1(x) \wedge y > g_2(x)$". Debe leerse con $\vee$ ("o"): ningún $y$ puede ser a la vez menor que $g_1(x)$ y mayor que $g_2(x)$.
:::

::: resultado Tipo 1: primero se integra en $y$
$$
\iint_D f(x;y)\,\dx\,\dy = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} f(x;y)\,\dy
$$
:::

## Región tipo 2

$$
D = \{(x;y) \,/\, c \le y \le d \wedge h_1(y) \le x \le h_2(y)\}
$$

```grafico
titulo: Tipo 2: para cada $y$, $x$ va de $h_1(y)$ a $h_2(y)$
x = 2 + 0.3 sen(1.5y) ; y: 0.5..4.5 ; "$x = h_1(y)$"
x = 4 + 0.4 cos(2y) ; y: 0.5..4.5 ; "$x = h_2(y)$"
2 + 0.3 sen(1.5y) <= x <= 4 + 0.4 cos(2y), 0.5 <= y <= 4.5 ; "$D$"
segmento (0, 2.4) (5, 2.4) ; punteada ; gris
texto (-0.35, 2.4) "$y$"
```

En forma análoga:

::: resultado Tipo 2: primero se integra en $x$
$$
\iint_D f(x;y)\,\dx\,\dy = \int_c^d \dy \int_{h_1(y)}^{h_2(y)} f(x;y)\,\dx
$$
:::
