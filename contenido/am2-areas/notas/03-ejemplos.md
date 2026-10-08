# 3. Ejemplos de áreas de superficies

## Ejemplo 1: plano en el primer octante

::: ejemplo Determinar el área de la parte del plano $3x + 2y + z = 6$ que está en el primer octante
**a) La superficie**

$$
S:\ z = 6 - 3x - 2y
$$

```grafico3d
titulo: El plano $3x + 2y + z = 6$ en el primer octante y su proyección $D$
z = 6 - 3x - 2y ; sobre x >= 0, y >= 0, 3x + 2y <= 6 ; sombra ; ""
texto (0.4, 0.6, 4.6) "$S$"
texto (0.6, 0.8, 0) "$D$"
```

$$
A(S) = \iint_D \sqrt{\left[f'_x\right]^2 + \left[f'_y\right]^2 + 1}\;\dx\,\dy
$$

**b) Las derivadas**

$$
f'_x = -3 \qquad\qquad f'_y = -2
$$

::: pasos
\sqrt{\left[f'_x\right]^2 + \left[f'_y\right]^2 + 1} = \sqrt{(-3)^2 + (-2)^2 + 1}
  = \sqrt{14}
:::

**c) El dominio $D$.** Es el triángulo del plano $xy$ debajo de $S$. $y$ va de $0$ hasta la recta donde el plano corta a $z = 0$:

::: pasos
3x + 2y = 6
\then y = 3 - \frac{3}{2}x
:::

$$
\begin{cases} 0 \le x \le 2 \\[2pt] 0 \le y \le 3 - \frac{3}{2}x \end{cases}
$$

**d) Cálculo**

::: pasos
A(S) = \int_0^2 \dx \int_0^{3 - \frac{3}{2}x} \sqrt{14}\,\dy
     = \sqrt{14}\int_0^2 \dx \, \eval{y}{0}{3 - \frac{3}{2}x}
     = \sqrt{14}\int_0^2 \left(3 - \frac{3}{2}x\right)\dx
     = \sqrt{14}\,\eval{\left(3x - \frac{3}{4}x^2\right)}{0}{2}
     = \sqrt{14}\,(6 - 3)
:::

::: resultado
$$
A(S) = 3\sqrt{14}
$$
:::
:::

::: observacion
Para un **plano**, la raíz es constante: el área de $S$ es esa constante por el área de $D$. Acá $D$ es un triángulo de catetos $2$ y $3$, de área $3$; por eso $A(S) = \sqrt{14}\cdot 3$.
:::

## Ejemplo 2: plano dentro de un cilindro

::: ejemplo Calcular el área de la parte del plano $2x + 5y + z = 10$ que está dentro del cilindro $x^2 + y^2 = 9$
**a) La superficie**

$$
S:\ z = 10 - 2x - 5y
$$

```grafico3d
titulo: El plano $z = 10 - 2x - 5y$ cortado por el cilindro $x^2 + y^2 = 9$
z = 10 - 2x - 5y ; sobre x^2 + y^2 <= 9 ; sombra ; ""
texto (0, 0, 0) "$D$"
vista: 35, 20
```

**b) Las derivadas**

$$
f'_x = -2 \qquad\qquad f'_y = -5
$$

::: pasos
\sqrt{\left[f'_x\right]^2 + \left[f'_y\right]^2 + 1} = \sqrt{(-2)^2 + (-5)^2 + 1}
  = \sqrt{30}
:::

**c) El dominio $D$** es el círculo $0 \le x^2 + y^2 \le 9$: conviene pasar a **polares**, con $x = r\cos\theta$, $y = r\sen\theta$ y $|J| = r$ (ver [[3. Integrales dobles en coordenadas polares]]):

$$
\begin{cases} 0 \le r \le 3 \\ 0 \le \theta \le 2\pi \end{cases}
$$

**d) Cálculo**

::: pasos
A(S) = \iint_D \sqrt{30}\,\dx\,\dy
     = \sqrt{30}\int_0^{2\pi} \dtheta \int_0^3 r\,\dr             // $r$ es $|J|$
     = \sqrt{30}\int_0^{2\pi} \dtheta \, \eval{\frac{r^2}{2}}{0}{3}
     = \frac{9}{2}\sqrt{30}\,\eval{\theta}{0}{2\pi}
:::

::: resultado
$$
A(S) = 9\sqrt{30}\,\pi
$$
:::
:::
