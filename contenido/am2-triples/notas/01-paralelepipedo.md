# 1. Paralelepípedo rectángulo

Vamos a definir la integral triple en forma análoga a lo visto en integrales dobles. Sea $f(x;y;z)$ una función definida en el **paralelepípedo rectángulo**

$$
B = \{(x;y;z) \,/\, a \le x \le b \wedge c \le y \le d \wedge p \le z \le q\} = [a;b]\times[c;d]\times[p;q]
$$

## Partición del paralelepípedo

Se parte cada intervalo:

$$
\begin{aligned}
[a;b]&:\quad x_0 = a;\ x_1;\ x_2;\ \dots;\ x_{i-1};\ x_i;\ \dots;\ x_l = b \\
[c;d]&:\quad y_0 = c;\ y_1;\ y_2;\ \dots;\ y_{j-1};\ y_j;\ \dots;\ y_m = d \\
[p;q]&:\quad z_0 = p;\ z_1;\ z_2;\ \dots;\ z_{k-1};\ z_k;\ \dots;\ z_n = q
\end{aligned}
$$

con $\Delta x_i = x_i - x_{i-1}$, $\Delta y_j = y_j - y_{j-1}$ y $\Delta z_k = z_k - z_{k-1}$.

```grafico3d
titulo: El paralelepípedo $B$ partido en subparalelepípedos $B_{ijk}$
0 <= z <= 2, 0.5 <= x <= 2, 0.5 <= y <= 3 ; malla
texto (2, 3, 2.3) "$B$"
```

El subparalelepípedo $B_{ijk}$ tiene volumen

$$
\Delta V_{ijk} = \Delta x_i\,\Delta y_j\,\Delta z_k
$$

## Triple suma de Riemann

En cada $B_{ijk}$ se elige un punto interior $(x_{ijk};y_{ijk};z_{ijk})$ y se forma la **triple suma de Riemann**:

$$
\sum_{i=1}^{l}\sum_{j=1}^{m}\sum_{k=1}^{n} f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk}
$$

## Definición

::: definicion Integral triple sobre un paralelepípedo
Si $\max\Delta V$ es el mayor volumen de los subparalelepípedos rectángulos de la división de $B$ y tomamos límite para $l \to \infty$, $m \to \infty$, $n \to \infty$ de tal manera que $\max\Delta V \to 0$:

$$
\iiint_B f(x;y;z)\,\dV = \lim_{\substack{l\to\infty \\ m\to\infty \\ n\to\infty \\ (\max\Delta V\to 0)}} \sum_{i=1}^{l}\sum_{j=1}^{m}\sum_{k=1}^{n} f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk}
$$

si el límite existe.
:::

También se escribe $\displaystyle\iiint_B f(x;y;z)\,\dV = \iiint_B f(x;y;z)\,\dx\,\dy\,\dz$.

::: observacion
Comparado con [[1. Dominios rectangulares]] de dobles: el rectángulo $R$ pasa a ser el paralelepípedo $B$, el área $\Delta A_{ij}$ pasa a ser el volumen $\Delta V_{ijk}$, y la suma doble pasa a ser **triple**.
:::
