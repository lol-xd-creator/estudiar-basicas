# 1. Transformación y fórmula general

Suponemos que necesitamos calcular la integral triple $\iiint_D f(x;y;z)\,\dx\,\dy\,\dz$ a través de un **cambio de variables** que simplifique los cálculos. Se usan las conclusiones vistas para el cambio de variables en integrales dobles ([[2. Relación entre los diferenciales de área]]) y una transformación de características similares:

$$
(x;y;z) = \mathbf T(u;v;w) \qquad\text{donde}\qquad \begin{cases} x = T_1(u;v;w) \\ y = T_2(u;v;w) \\ z = T_3(u;v;w) \end{cases}
$$

y además $T_1$, $T_2$ y $T_3$ tienen **derivadas parciales continuas** en un dominio $S$.

::: definicion La transformación $\mathbf T(u;v;w)$
$\mathbf T(u;v;w)$ es un campo vectorial $\R^3 \xrightarrow{\ \mathbf T\ } \R^3$ cuya correspondencia entre los puntos del dominio $S$ y los de la imagen $D$ es **1 a 1**, o sea, **biunívoca** (es decir, tiene inversa $\mathbf T^{-1}$).
:::

Entonces, para el cálculo de la integral se usa la expresión:

::: resultado Cambio de variables en integrales triples
$$
\iiint_D f(x;y;z)\,\dx\,\dy\,\dz = \iiint_S f\big(T_1(u;v;w);T_2(u;v;w);T_3(u;v;w)\big)\left|J\!\left(\frac{x\,y\,z}{u\,v\,w}\right)\right|\du\,\dd v\,\dd w
$$
:::

donde el jacobiano de la transformación es el determinante de las derivadas parciales:

$$
J\!\left(\frac{x\,y\,z}{u\,v\,w}\right) = \begin{vmatrix} \pd{x}{u} & \pd{x}{v} & \pd{x}{w} \\[4pt] \pd{y}{u} & \pd{y}{v} & \pd{y}{w} \\[4pt] \pd{z}{u} & \pd{z}{v} & \pd{z}{w} \end{vmatrix}
$$

::: observacion
Es la misma fórmula que en dobles, con una variable más: el jacobiano pasa a ser un determinante de $3 \times 3$ y el diferencial de área $\dx\,\dy$ pasa a ser el de volumen $\dx\,\dy\,\dz$.
:::

::: aclaracion
El apunte escribe "la transformación $\mathbf T(u;v;z)$"; por la definición de arriba, es $\mathbf T(u;v;w)$.
:::
