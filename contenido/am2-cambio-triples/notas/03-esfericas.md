# 3. Coordenadas esféricas

La transformación

$$
\mathbf T(\rho;\theta;\varphi): \begin{cases} x = \rho\cos\theta\,\sen\varphi \\ y = \rho\sen\theta\,\sen\varphi \\ z = \rho\cos\varphi \end{cases}
$$

transforma las coordenadas $(x;y;z)$ en las denominadas **coordenadas esféricas** $(\rho;\theta;\varphi)$, cuya relación con las coordenadas cartesianas es trigonométrica y se deduce del gráfico:

```grafico3d
titulo: El punto $(x;y;z)$ en esféricas: distancia $\rho$, ángulo $\theta$ en el plano $xy$ y ángulo $\varphi$ desde el eje $z$
x: 0..2.5
y: 0..2.5
z: 0..2.5
punto (1.0, 1.26, 1.91) ; "$(x;y;z)$"
segmento (0, 0, 0) (1.0, 1.26, 1.91) ; azul ; gruesa ; ""
texto (0.75, 0.45, 1.15) "$\rho$"
segmento (1.0, 1.26, 1.91) (1.0, 1.26, 0) ; gris ; punteada
segmento (0, 0, 0) (1.0, 1.26, 0) ; gris ; punteada
segmento (1.0, 1.26, 1.91) (0, 0, 1.91) ; gris ; punteada
(0.6 cos(t), 0.6 sin(t), 0) ; t: 0..0.9 ; azul
texto (0.7, 0.3, 0) "$\theta$"
(0.9 sin(t) cos(0.9), 0.9 sin(t) sin(0.9), 0.9 cos(t)) ; t: 0..0.7 ; ambar
texto (0.25, 0.3, 1.15) "$\varphi$"
```

Para que la transformación sea 1 a 1 entre los puntos de $D$ y de $S$, el rango de las variables es:

$$
\begin{cases} 0 \le \rho < \infty \\ 0 \le \theta < 2\pi \\ 0 \le \varphi \le \pi \end{cases}
$$

## El jacobiano

::: demostracion Cálculo de $\left|J\!\left(\frac{x\,y\,z}{\rho\,\theta\,\varphi}\right)\right|$
Con las derivadas de $x$, $y$ y $z$ respecto de $\rho$, $\theta$ y $\varphi$ (columnas, en ese orden):

$$
\left|J\!\left(\frac{x\,y\,z}{\rho\,\theta\,\varphi}\right)\right| = \left|\begin{vmatrix} \cos\theta\sen\varphi & -\rho\sen\theta\sen\varphi & \rho\cos\theta\cos\varphi \\ \sen\theta\sen\varphi & \rho\cos\theta\sen\varphi & \rho\sen\theta\cos\varphi \\ \cos\varphi & 0 & -\rho\sen\varphi \end{vmatrix}\right|
$$

**1.** Se desarrolla por la **tercera fila**, que tiene un $0$ en el medio:

$$
J = \cos\varphi\,\hl{M_1} - \rho\sen\varphi\,\hlb{M_3}
$$

con $\hl{M_1}$ el menor que queda al tachar fila 3 y columna 1, y $\hlb{M_3}$ el que queda al tachar fila 3 y columna 3.

**2.** El primer menor:

::: pasos
\hl{M_1} = \begin{vmatrix} -\rho\sen\theta\sen\varphi & \rho\cos\theta\cos\varphi \\ \rho\cos\theta\sen\varphi & \rho\sen\theta\cos\varphi \end{vmatrix}
  = -\rho^2\sen^2\theta\sen\varphi\cos\varphi - \rho^2\cos^2\theta\sen\varphi\cos\varphi
  = -\rho^2\sen\varphi\cos\varphi\left[\sen^2\theta + \cos^2\theta\right]
  = -\rho^2\sen\varphi\cos\varphi                                                       // $\sen^2\theta + \cos^2\theta = 1$
:::

**3.** El segundo menor:

::: pasos
\hlb{M_3} = \begin{vmatrix} \cos\theta\sen\varphi & -\rho\sen\theta\sen\varphi \\ \sen\theta\sen\varphi & \rho\cos\theta\sen\varphi \end{vmatrix}
  = \rho\cos^2\theta\sen^2\varphi + \rho\sen^2\theta\sen^2\varphi
  = \rho\sen^2\varphi\left[\cos^2\theta + \sen^2\theta\right]
  = \rho\sen^2\varphi
:::

**4.** Juntando:

::: pasos
\left|J\right| = \left|\cos\varphi\cdot\left(-\rho^2\sen\varphi\cos\varphi\right) - \rho\sen\varphi\cdot\rho\sen^2\varphi\right|
  = \left|-\rho^2\sen\varphi\cos^2\varphi - \rho^2\sen\varphi\sen^2\varphi\right|
  = \left|-\rho^2\sen\varphi\left[\cos^2\varphi + \sen^2\varphi\right]\right|
  = \rho^2\sen\varphi                                                                    // $\sen\varphi \ge 0$ para $0 \le \varphi \le \pi$
:::
:::

Entonces:

$$
\left|J\!\left(\frac{x\,y\,z}{\rho\,\theta\,\varphi}\right)\right| = \rho^2\sen\varphi
$$

Por lo tanto, cuando calculemos una integral triple mediante este cambio de variables:

::: resultado Coordenadas esféricas
$$
\iiint_D f(x;y;z)\,\dx\,\dy\,\dz = \iiint_S f(\rho\cos\theta\sen\varphi;\,\rho\sen\theta\sen\varphi;\,\rho\cos\varphi)\cdot\rho^2\sen\varphi\,\dd\rho\,\dtheta\,\dd\varphi
$$
:::

## Ejemplo 1

::: ejemplo Calcular $\displaystyle\iiint_S \left(x^2 + y^2\right)\dx\,\dy\,\dz$, siendo $S$ la región encerrada por $x^2 + y^2 + z^2 = 4$, $z \ge 0$ y $x \ge 0$
**a) Dominio de integración**

```grafico3d
titulo: Un cuarto de esfera de radio $2$: $z \ge 0$ y $x \ge 0$
0 <= z <= raiz(4 - x^2 - y^2), x >= 0
```

Esféricas: $x = \rho\cos\theta\sen\varphi$, $y = \rho\sen\theta\sen\varphi$, $z = \rho\cos\varphi$, y $|J| = \rho^2\sen\varphi$.

**b) La función**

::: pasos
x^2 + y^2 = \left(\rho\cos\theta\sen\varphi\right)^2 + \left(\rho\sen\theta\sen\varphi\right)^2
  = \rho^2\cos^2\theta\sen^2\varphi + \rho^2\sen^2\theta\sen^2\varphi
  = \rho^2\sen^2\varphi\left(\cos^2\theta + \sen^2\theta\right)
  = \rho^2\sen^2\varphi
:::

**c) Los límites de integración.** $0 \le \rho \le \text{esfera}$:

::: pasos
x^2 + y^2 + z^2 = 4
\then \rho^2\sen^2\varphi + \rho^2\cos^2\varphi = 4
\then \rho^2\left(\cos^2\varphi + \sen^2\varphi\right) = \rho^2 = 4
\then \rho = 2
:::

$$
0 \le \rho \le 2 \qquad\wedge\qquad 0 \le \varphi \le \frac{\pi}{2} \qquad\wedge\qquad -\frac{\pi}{2} \le \theta \le \frac{\pi}{2}
$$

($\varphi \le \frac{\pi}{2}$ porque $z \ge 0$; $\theta$ entre $-\frac{\pi}{2}$ y $\frac{\pi}{2}$ porque $x \ge 0$.)

**d) Cálculo**

::: pasos
I_S = \int_{-\pi/2}^{\pi/2} \dtheta \int_0^{\pi/2} \dd\varphi \int_0^2 \rho^2\sen^2\varphi \cdot \rho^2\sen\varphi\,\dd\rho          // $\rho^2\sen\varphi$ es $|J|$
    = \int_{-\pi/2}^{\pi/2} \dtheta \int_0^{\pi/2} \sen^3\varphi\,\dd\varphi \, \eval{\frac{\rho^5}{5}}{0}{2}
    = \frac{32}{5}\int_{-\pi/2}^{\pi/2} \dtheta \int_0^{\pi/2} \sen\varphi\left(1 - \cos^2\varphi\right)\dd\varphi            // $\sen^2\varphi = 1 - \cos^2\varphi$
    = \frac{32}{5}\int_{-\pi/2}^{\pi/2} \dtheta \, \eval{\left[-\cos\varphi + \frac{\cos^3\varphi}{3}\right]}{0}{\pi/2}
    = \frac{32}{5}\int_{-\pi/2}^{\pi/2} \dtheta \left[0 - \left(-1 + \frac{1}{3}\right)\right]
    = \frac{32}{5}\cdot\frac{2}{3}\cdot\eval{\theta}{-\pi/2}{\pi/2}
    = \frac{64}{15}\,\pi
:::

::: resultado
$$
I_S = \frac{64}{15}\,\pi
$$
:::
:::

## Ejemplo 2: volumen

::: ejemplo Encontrar el volumen del sólido limitado superiormente por el casquete esférico de radio $4$ e inferiormente por el cono $x^2 + y^2 = z^2$, por encima del plano $z = 0$
**a) Dominio de integración**

```grafico3d
titulo: Entre el cono $z = \sqrt{x^2 + y^2}$ y la esfera de radio $4$
raiz(x^2 + y^2) <= z <= raiz(16 - x^2 - y^2)
```

**b) Los límites de integración.** $\rho$ va de $0$ a la esfera, $\rho = 4$. El cono $z^2 = x^2 + y^2$ forma un ángulo $\varphi = \frac{\pi}{4}$ con el eje $z$, y el sólido da toda la vuelta:

$$
0 \le \rho \le 4 \qquad\wedge\qquad 0 \le \varphi \le \frac{\pi}{4} \qquad\wedge\qquad 0 \le \theta \le 2\pi
$$

**c) Cálculo**

::: pasos
V = \iiint_S \dx\,\dy\,\dz = \int_0^{2\pi} \dtheta \int_0^{\pi/4} \dd\varphi \int_0^4 \rho^2\sen\varphi\,\dd\rho          // $f = 1$: solo queda $|J|$
  = \int_0^{2\pi} \dtheta \int_0^{\pi/4} \sen\varphi\,\dd\varphi \, \eval{\frac{\rho^3}{3}}{0}{4}
  = \frac{64}{3}\int_0^{2\pi} \dtheta \, \eval{\left(-\cos\varphi\right)}{0}{\pi/4}
  = \frac{64}{3}\left(-\frac{\sqrt 2}{2} + 1\right)\cdot\eval{\theta}{0}{2\pi}
  = \frac{64}{3}\left(1 - \frac{\sqrt 2}{2}\right) 2\pi
:::

::: resultado
$$
V = \frac{64}{3}\left(2 - \sqrt 2\right)\pi
$$
:::

::: aclaracion
En el apunte, el penúltimo renglón dice $\frac{63}{3}$: es $\frac{64}{3}$, como en el renglón anterior y en el resultado. Además, el resultado está escrito como $I_S$; es el volumen $V$.
:::
:::

::: observacion
¿Por qué $\varphi = \frac{\pi}{4}$ en el cono? En esféricas, $z^2 = x^2 + y^2$ queda $\rho^2\cos^2\varphi = \rho^2\sen^2\varphi$, o sea $\tg\varphi = 1$.
:::
