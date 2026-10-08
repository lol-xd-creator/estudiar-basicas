# 3. Integrales dobles en coordenadas polares

La aplicación

$$
\mathbf T(r;\theta): \begin{cases} x = r\cos\theta \\ y = r\sen\theta \end{cases}
$$

transforma las coordenadas $(x;y)$ en las denominadas **coordenadas polares** $(r;\theta)$, cuya relación es trigonométrica:

```grafico
titulo: El punto $(x;y)$ con su radio $r$ y su ángulo $\theta$
x: -0.4..3
y: -0.4..2.3
segmento (0, 0) (2.4, 1.6) ; azul ; gruesa ; "$r$"
segmento (2.4, 0) (2.4, 1.6) ; gris ; punteada
segmento (0, 1.6) (2.4, 1.6) ; gris ; punteada
(0.7 cos(t), 0.7 sin(t)) ; t: 0..0.588 ; azul ; ""
texto (0.95, 0.28) "$\theta$"
(2.4, 1.6) ; "$(x;y)$"
texto (2.4, -0.25) "$x$"
texto (-0.25, 1.6) "$y$"
```

Todo punto $(x;y)$ se ubica en forma biunívoca con un **radio** de posición siempre positivo $r$ y un **ángulo** $\theta$ medido a partir del eje positivo de las $x$, dentro de los rangos

$$
\begin{cases} 0 \le r < \infty \\ 0 \le \theta < 2\pi \end{cases}
$$

## El jacobiano

::: pasos
\left|J\!\left(\frac{x\,y}{r\,\theta}\right)\right| = \left|\begin{vmatrix} \cos\theta & -r\sen\theta \\ \sen\theta & r\cos\theta \end{vmatrix}\right|      // $\pd{x}{r} = \cos\theta$, $\pd{x}{\theta} = -r\sen\theta$, $\pd{y}{r} = \sen\theta$, $\pd{y}{\theta} = r\cos\theta$
  = \left|r\cos^2\theta + r\sen^2\theta\right|
  = r                                                                                                                                          // $\cos^2\theta + \sen^2\theta = 1$ y $r \ge 0$
:::

Por lo tanto, cuando calculemos una integral doble mediante este cambio de variables:

::: resultado Coordenadas polares
$$
\iint_D f(x;y)\,\dx\,\dy = \iint_S f(r\cos\theta;\,r\sen\theta)\cdot r\,\dr\,\dtheta
$$
:::

## Ejemplo 1: se simplifican los límites y la función

::: ejemplo Calcular $\displaystyle\iint_D \sqrt{x^2 + y^2}\,\dx\,\dy$, siendo $D = \left\{(x;y) \,/\, 0 \le x \le 4 \wedge 0 \le y \le \sqrt{16 - x^2}\right\}$
**a) Dominio de integración**

```grafico
x^2 + y^2 = 16 ; gris ; punteada ; "$x^2 + y^2 = 16$"
x^2 + y^2 <= 16, x >= 0, y >= 0 ; "$D$"
x: -1..5.5
y: -1..5
```

**b) En cartesianas.** Si quisiéramos calcularla en coordenadas cartesianas:

$$
I_D = \int_0^4 \dx \int_0^{\sqrt{16-x^2}} \sqrt{x^2 + y^2}\,\dy
$$

en este planteo se detecta la **dificultad** para el cálculo.

**c) En polares.** Con $x = r\cos\theta$, $y = r\sen\theta$ y $|J| = r$:

::: pasos
\sqrt{x^2 + y^2} = \sqrt{r^2\cos^2\theta + r^2\sen^2\theta}
  = \sqrt{r^2\left(\cos^2\theta + \sen^2\theta\right)}
  = r
:::

$D$ es el cuarto de círculo de radio $4$ del primer cuadrante:

$$
\begin{cases} 0 \le r \le 4 \\ 0 \le \theta \le \frac{\pi}{2} \end{cases}
$$

**d) Cálculo**

::: pasos
\iint_D \sqrt{x^2 + y^2}\,\dx\,\dy = \int_0^{\pi/2} \dtheta \int_0^4 r \cdot r\,\dr          // el segundo $r$ es $|J|$
  = \int_0^{\pi/2} \dtheta \, \eval{\frac{r^3}{3}}{0}{4}
  = \frac{64}{3}\int_0^{\pi/2} \dtheta
  = \frac{64}{3}\,\eval{\theta}{0}{\pi/2}
  = \frac{64}{3}\cdot\frac{\pi}{2}
:::

::: resultado
$$
I_D = \frac{32}{3}\,\pi
$$
:::

Aquí se nota la simplificación de los **límites de integración** y de la **función integrando**.
:::

## Ejemplo 2: se simplifica la función

::: ejemplo Calcular $\displaystyle\iint_R \frac{xy}{\left(x^2 + y^2\right)^{3/2}}\,\dx\,\dy$, donde $R$ es el triángulo de vértices $(0;0)$, $(2;0)$ y $(2;2)$
**a) Dominio de integración**

```grafico
poligono (0, 0) (2, 0) (2, 2) ; "$R$"
x = 2 ; gris ; punteada ; ""
segmento (0, 0) (2, 0.9) ; gris ; punteada
(0, 0) ; "$(0;0)$"
(2, 0) ; "$(2;0)$"
(2, 2) ; "$(2;2)$"
x: -0.6..3
y: -0.5..2.6
```

**b) La función.** Con $x = r\cos\theta$, $y = r\sen\theta$ y $|J| = r$:

::: pasos
\frac{xy}{\left(x^2 + y^2\right)^{3/2}} = \frac{r\cos\theta\; r\sen\theta}{\left(r^2\right)^{3/2}}
  = \frac{\cos\theta\,\sen\theta}{r}                     // $\frac{r^2}{r^3} = \frac{1}{r}$
:::

**c) Los límites.** Para cada $\theta$, $r$ va desde $0$ hasta la recta $x = 2$:

::: pasos
x = 2 = r\cos\theta
\then r = \frac{2}{\cos\theta}
:::

$$
\begin{cases} 0 \le r \le \dfrac{2}{\cos\theta} \\[4pt] 0 \le \theta \le \dfrac{\pi}{4} \end{cases}
$$

**d) Cálculo**

::: pasos
I_R = \int_0^{\pi/4} \dtheta \int_0^{2/\cos\theta} \frac{\cos\theta\,\sen\theta}{r}\cdot r\,\dr    // el $r$ de $|J|$ se simplifica con el $\frac{1}{r}$
    = \int_0^{\pi/4} \cos\theta\,\sen\theta\,\dtheta \cdot \eval{r}{0}{2/\cos\theta}
    = \int_0^{\pi/4} \cos\theta\,\sen\theta \cdot \frac{2}{\cos\theta}\,\dtheta
    = 2\int_0^{\pi/4} \sen\theta\,\dtheta
    = 2\,\eval{\left(-\cos\theta\right)}{0}{\pi/4}
    = 2\left(-\frac{\sqrt 2}{2} + 1\right)
:::

::: resultado
$$
I_R = 2 - \sqrt 2
$$
:::

Aquí se nota la simplificación de la **función integrando** con las nuevas variables.
:::
