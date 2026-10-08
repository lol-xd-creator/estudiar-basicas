# 2. Coordenadas cilíndricas

La aplicación

$$
\mathbf T(r;\theta;z): \begin{cases} x = r\cos\theta \\ y = r\sen\theta \\ z = z \end{cases}
$$

transforma las coordenadas $(x;y;z)$ en las denominadas **coordenadas cilíndricas** $(r;\theta;z)$, cuya relación, para las dos primeras variables, es trigonométrica (son las polares del plano $xy$):

```grafico3d
titulo: El punto $(x;y;z)$ en cilíndricas: $r$ y $\theta$ en el plano $xy$, y la altura $z$
x: 0..2.5
y: 0..2.5
z: 0..2.5
punto (1.243, 1.567, 2) ; "$(x;y;z)$"
segmento (0, 0, 0) (1.243, 1.567, 0) ; azul ; gruesa ; ""
segmento (1.243, 1.567, 0) (1.243, 1.567, 2) ; azul ; gruesa ; ""
texto (0.85, 0.6, 0) "$r$"
texto (1.243, 1.75, 1) "$z$"
segmento (1.243, 1.567, 0) (1.243, 0, 0) ; gris ; punteada
segmento (1.243, 1.567, 0) (0, 1.567, 0) ; gris ; punteada
segmento (1.243, 1.567, 2) (0, 0, 2) ; gris ; punteada
(0.7 cos(t), 0.7 sin(t), 0) ; t: 0..0.9 ; azul
texto (0.75, 0.35, 0) "$\theta$"
```

Para que la transformación sea 1 a 1 entre los puntos de $D$ y de $S$, el rango de las variables es:

$$
\begin{cases} 0 \le r < \infty \\ 0 \le \theta < 2\pi \\ -\infty < z < \infty \end{cases}
$$

## ¿Qué variable queda igual?

La variable que se iguala a sí misma, en este caso $z = z$, se elige cuando la **proyección de $D$ sobre el plano $xy$** tiene una forma que amerita usar coordenadas polares en ese plano. Por ejemplo, un recinto cerrado por un paraboloide y un plano paralelo al plano $xy$, donde además el eje $z$ es **eje de simetría** de $D$:

```grafico3d
titulo: Paraboloide y plano $z = \text{cte}$: el eje $z$ es eje de simetría de $D$
x^2 + y^2 <= z <= 4
texto (0, 0, 4.5) "$D$"
```

## El jacobiano

::: pasos
\left|J\!\left(\frac{x\,y\,z}{r\,\theta\,z}\right)\right| = \left|\begin{vmatrix} \cos\theta & -r\sen\theta & 0 \\ \sen\theta & r\cos\theta & 0 \\ 0 & 0 & 1 \end{vmatrix}\right|      // la tercera fila y la tercera columna son las de $z = z$
  = \left|r\cos^2\theta + r\sen^2\theta\right|                                                                                                                  // desarrollando por la tercera fila
  = r
:::

Por lo tanto, cuando calculemos una integral triple mediante este cambio de variables:

::: resultado Coordenadas cilíndricas (eje $z$)
$$
\iiint_D f(x;y;z)\,\dx\,\dy\,\dz = \iiint_S f(r\cos\theta;\,r\sen\theta;\,z)\cdot r\,\dr\,\dtheta\,\dz
$$
:::

## Otros ejes de simetría

Si el eje de simetría de $D$ fuese el **eje $y$**, sería esta variable la que se iguala a sí misma, y se aplican polares en el plano $xz$:

$$
\begin{cases} x = r\cos\theta \\ y = y \\ z = r\sen\theta \end{cases}
$$

```grafico3d
titulo: Eje de simetría $y$: polares en el plano $xz$
x^2 + z^2 <= y <= 4
texto (0, 4.5, 0) "$D$"
vista: 30, 20
```

::: resultado Coordenadas cilíndricas (eje $y$)
$$
\iiint_D f(x;y;z)\,\dx\,\dy\,\dz = \iiint_S f(r\cos\theta;\,y;\,r\sen\theta)\cdot r\,\dr\,\dtheta\,\dy
$$
:::

Si el eje de simetría es el **eje $x$**, es esta variable la que se iguala a sí misma, y se aplican polares en el plano $yz$:

$$
\begin{cases} x = x \\ y = r\cos\theta \\ z = r\sen\theta \end{cases}
$$

```grafico3d
titulo: Eje de simetría $x$: polares en el plano $yz$
0 <= x <= 3, y^2 + z^2 <= 1
texto (3.4, 0, 0) "$D$"
```

::: resultado Coordenadas cilíndricas (eje $x$)
$$
\iiint_D f(x;y;z)\,\dx\,\dy\,\dz = \iiint_S f(x;\,r\cos\theta;\,r\sen\theta)\cdot r\,\dr\,\dtheta\,\dx
$$
:::

## Ejemplo 1: eje $z$

::: ejemplo Calcular $\displaystyle\iiint_S \sqrt{x^2 + y^2}\,\dx\,\dy\,\dz$, siendo $S$ el recinto limitado por la parte superior del cono $z^2 = x^2 + y^2$ y el plano $z = 1$
**a) Dominio de integración**

```grafico3d
titulo: Entre el cono $z = \sqrt{x^2 + y^2}$ y el plano $z = 1$
raiz(x^2 + y^2) <= z <= 1
```

El eje $z$ es eje de simetría: cilíndricas con $x = r\cos\theta$, $y = r\sen\theta$, $z = z$, y $|J| = r$.

**b) La función**

$$
\sqrt{x^2 + y^2} = \sqrt{r^2} = r
$$

**c) Los límites de integración.** $z$ va del cono al plano: $\text{cono} \le z \le 1$. En el cono:

::: pasos
z^2 = x^2 + y^2
\then z = \sqrt{x^2 + y^2} = r          // parte superior: $z \ge 0$
:::

$$
r \le z \le 1 \qquad\wedge\qquad 0 \le r \le 1 \qquad\wedge\qquad 0 \le \theta \le 2\pi
$$

**d) Cálculo**

::: pasos
I_S = \int_0^{2\pi} \dtheta \int_0^1 r \cdot r\,\dr \int_r^1 \dz                  // el segundo $r$ es $|J|$
    = \int_0^{2\pi} \dtheta \int_0^1 r^2\,\dr \, \eval{z}{r}{1}
    = \int_0^{2\pi} \dtheta \int_0^1 (1 - r)\,r^2\,\dr
    = \int_0^{2\pi} \dtheta \int_0^1 \left(r^2 - r^3\right)\dr
    = \int_0^{2\pi} \dtheta \, \eval{\left(\frac{r^3}{3} - \frac{r^4}{4}\right)}{0}{1}
    = \eval{\theta}{0}{2\pi} \cdot \left(\frac{1}{3} - \frac{1}{4}\right)
    = 2\pi \cdot \frac{1}{12}
:::

::: resultado
$$
I_S = \frac{\pi}{6}
$$
:::
:::

## Ejemplo 2: eje $x$

::: ejemplo Calcular $\displaystyle\iiint_S x\,\dx\,\dy\,\dz$, siendo $S$ el recinto encerrado por $y^2 + z^2 \le x$ y $4 - (y^2 + z^2) \ge x$
**a) Dominio de integración**

```grafico3d
titulo: Entre los paraboloides $x = y^2 + z^2$ y $x = 4 - (y^2 + z^2)$
y^2 + z^2 <= x <= 4 - (y^2 + z^2)
```

$S$ es de tipo 2:

$$
S = \left\{(x;y;z) \,/\, (y;z) \in D \wedge y^2 + z^2 \le x \le 4 - \left(y^2 + z^2\right)\right\}
$$

El eje $x$ es eje de simetría: cilíndricas con $x = x$, $y = r\cos\theta$, $z = r\sen\theta$, y $|J| = r$.

**b) La función:** $x = x$.

**c) Los límites de integración.**

$$
y^2 + z^2 \le x \le 4 - \left(y^2 + z^2\right) \quad\then\quad r^2 \le x \le 4 - r^2
$$

$r$ va desde $0$ hasta el corte entre los paraboloides:

::: pasos
y^2 + z^2 = 4 - \left(y^2 + z^2\right)
\then r^2 = 4 - r^2
\then 2r^2 = 4
\then r = \sqrt 2
:::

$$
0 \le r \le \sqrt 2 \qquad\wedge\qquad 0 \le \theta \le 2\pi
$$

**d) Cálculo**

::: pasos
I_S = \int_0^{2\pi} \dtheta \int_0^{\sqrt 2} r\,\dr \int_{r^2}^{4-r^2} x\,\dx
    = \int_0^{2\pi} \dtheta \int_0^{\sqrt 2} r\,\dr \, \eval{\frac{x^2}{2}}{r^2}{4-r^2}
    = \frac{1}{2}\int_0^{2\pi} \dtheta \int_0^{\sqrt 2} r\left[\left(4 - r^2\right)^2 - r^4\right]\dr
    = \frac{1}{2}\int_0^{2\pi} \dtheta \int_0^{\sqrt 2} r\left(16 - 8r^2\right)\dr                    // $\left(4 - r^2\right)^2 = 16 - 8r^2 + r^4$
    = \frac{1}{2}\int_0^{2\pi} \dtheta \int_0^{\sqrt 2} \left(16r - 8r^3\right)\dr
    = \frac{1}{2}\int_0^{2\pi} \dtheta \, \eval{\left(8r^2 - 2r^4\right)}{0}{\sqrt 2}
    = \frac{1}{2}\,\eval{\theta}{0}{2\pi}\,(16 - 8)
    = 4 \cdot 2\pi
:::

::: resultado
$$
I_S = 8\pi
$$
:::
:::
