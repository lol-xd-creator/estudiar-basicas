# 3. Superficies paramétricas

Si la superficie $\sigma$ viene dada en forma paramétrica,

$$
\mathbf r(u;v) = \big(x(u;v);\ y(u;v);\ z(u;v)\big)
$$

la normal, como se vio en [[2. Flujo a través de una superficie]], es

$$
\mathbf n = \frac{\mathbf r_u \times \mathbf r_v}{|\mathbf r_u \times \mathbf r_v|}
\qquad\text{y el diferencial de superficie es}\qquad
\dd\sigma = |\mathbf r_u \times \mathbf r_v|\,\du\,\dd v
$$

Entonces:

::: pasos
\iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iint_D \mathbf F\big(\mathbf r(u;v)\big)\cdot\frac{\mathbf r_u \times \mathbf r_v}{\hl{|\mathbf r_u \times \mathbf r_v|}}\,\hl{|\mathbf r_u \times \mathbf r_v|}\,\du\,\dd v
  = \iint_D \mathbf F\big(\mathbf r(u;v)\big)\cdot(\mathbf r_u \times \mathbf r_v)\,\du\,\dd v      // simplificando
:::

::: resultado Flujo a través de una superficie paramétrica
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \mathbf F\big(\mathbf r(u;v)\big)\cdot(\mathbf r_u \times \mathbf r_v)\,\du\,\dd v
$$
:::

En esta integral se hace un **producto escalar** entre dos vectores para obtener la función escalar a integrar:

- el campo, **valuado en la superficie paramétrica**:

$$
\mathbf F\big(\mathbf r(u;v)\big) = \begin{cases} F_1\big(x(u;v);\ y(u;v);\ z(u;v)\big) \\ F_2\big(x(u;v);\ y(u;v);\ z(u;v)\big) \\ F_3\big(x(u;v);\ y(u;v);\ z(u;v)\big) \end{cases}
$$

- y el producto vectorial

$$
\mathbf r_u \times \mathbf r_v = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\[2pt] \pd{x}{u} & \pd{y}{u} & \pd{z}{u} \\[4pt] \pd{x}{v} & \pd{y}{v} & \pd{z}{v} \end{vmatrix}
$$

Hecho el producto escalar, se calcula la integral doble.

## Ejemplo

::: ejemplo Hallar el flujo de $\mathbf F(x;y;z) = (z;\,y;\,x)$ a través de la esfera de radio uno, $x^2 + y^2 + z^2 = 1$
**a) Parametrizando la esfera** (esféricas con $\rho = 1$):

$$
\mathbf r(\varphi;\theta): \begin{cases} x = \sen\varphi\cos\theta \\ y = \sen\varphi\sen\theta \\ z = \cos\varphi \end{cases} \qquad 0 \le \varphi \le \pi,\quad 0 \le \theta \le 2\pi
$$

```grafico3d
titulo: La esfera de radio $1$ y su normal hacia afuera $\mathbf r_\varphi\times\mathbf r_\theta$
(sen(u) cos(v), sen(u) sen(v), cos(u)) ; u: 0..pi ; v: 0..2pi ; ""
vector (0.5, 0.5, 0.707) (0.85, 0.85, 1.2) ; rojo ; "$\mathbf r_\varphi\times\mathbf r_\theta$"
```

$$
\Phi = \iint_\sigma \mathbf F\big(\mathbf r(\varphi;\theta)\big)\cdot(\mathbf r_\varphi \times \mathbf r_\theta)\,\dd\varphi\,\dtheta
$$

**b) El campo en la superficie**

$$
\mathbf F\big(\mathbf r(\varphi;\theta)\big) = \big(\cos\varphi;\ \sen\varphi\sen\theta;\ \sen\varphi\cos\theta\big)
$$

**c) El producto vectorial**

::: pasos
\mathbf r_\varphi \times \mathbf r_\theta = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\ \pd{x}{\varphi} & \pd{y}{\varphi} & \pd{z}{\varphi} \\ \pd{x}{\theta} & \pd{y}{\theta} & \pd{z}{\theta} \end{vmatrix}
  = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\ \cos\varphi\cos\theta & \cos\varphi\sen\theta & -\sen\varphi \\ -\sen\varphi\sen\theta & \sen\varphi\cos\theta & 0 \end{vmatrix}
:::

Desarrollando por la primera fila:

- $\mathbf i$: $\cos\varphi\sen\theta\cdot 0 - (-\sen\varphi)\sen\varphi\cos\theta = \sen^2\varphi\cos\theta$
- $\mathbf j$: $-\big[\cos\varphi\cos\theta\cdot 0 - (-\sen\varphi)(-\sen\varphi\sen\theta)\big] = \sen^2\varphi\sen\theta$
- $\mathbf k$: $\cos^2\theta\cos\varphi\sen\varphi + \sen^2\theta\cos\varphi\sen\varphi = \cos\varphi\sen\varphi$

$$
\mathbf r_\varphi \times \mathbf r_\theta = \left(\sen^2\varphi\cos\theta;\ \sen^2\varphi\sen\theta;\ \cos\varphi\sen\varphi\right)
$$

**d) Cálculo**

El producto escalar de $\mathbf F\big(\mathbf r(\varphi;\theta)\big)$ por $\mathbf r_\varphi \times \mathbf r_\theta$, componente a componente:

$$
\Phi = \int_0^{2\pi} \dtheta \int_0^\pi \left(\hl{\cos\varphi\sen^2\varphi\cos\theta} + \sen^3\varphi\sen^2\theta + \hlb{\sen^2\varphi\cos\varphi\cos\theta}\right)\dd\varphi
$$

El primer y el tercer término se anulan: $\int_0^\pi \sen^2\varphi\cos\varphi\,\dd\varphi = \eval{\frac{\sen^3\varphi}{3}}{0}{\pi} = 0$. Queda el del medio:

::: pasos
\Phi = \int_0^{2\pi} \sen^2\theta\,\dtheta \int_0^\pi \sen\varphi\left(1 - \cos^2\varphi\right)\dd\varphi            // $\sen^2\varphi = 1 - \cos^2\varphi$
  = \int_0^{2\pi} \sen^2\theta \, \eval{\left[-\cos\varphi + \frac{\cos^3\varphi}{3}\right]}{0}{\pi}\dtheta
  = \int_0^{2\pi} \sen^2\theta\left[1 - \frac{1}{3} - \left(-1 + \frac{1}{3}\right)\right]\dtheta
  = \frac{4}{3}\int_0^{2\pi} \left(\frac{1}{2} - \frac{\cos 2\theta}{2}\right)\dtheta                                         // $\sen^2\theta = \frac{1 - \cos 2\theta}{2}$
  = \frac{4}{3}\left(\eval{\frac{\theta}{2}}{0}{2\pi} - \eval{\frac{\sen 2\theta}{4}}{0}{2\pi}\right)
  = \frac{4}{3}\,\pi
:::

::: resultado
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \frac{4}{3}\,\pi
$$
:::

::: aclaracion
En el apunte, el tercer término del producto escalar figura como $\sen^2\varphi\cos\theta$ (le falta el factor $\cos\varphi$), y por eso se integra distinto. No cambia el resultado: con o sin ese factor, al integrar en $\theta$ el $\cos\theta$ da $0$ entre $0$ y $2\pi$.
:::

En [[5. Teorema de la divergencia]] se calcula el mismo flujo con una integral triple, y da lo mismo.
:::
