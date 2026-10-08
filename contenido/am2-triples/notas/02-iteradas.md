# 2. Cálculo por integrales iteradas

Al igual que las integrales dobles, las integrales triples pueden resolverse mediante **integrales sucesivas o iteradas**:

::: resultado
$$
\iiint_B f(x;y;z)\,\dx\,\dy\,\dz = \int_a^b \left[\int_c^d \left(\int_p^q f(x;y;z)\,\dz\right)\dy\right]\dx = \int_a^b \dx \int_c^d \dy \int_p^q f(x;y;z)\,\dz
$$
:::

## Cómo se lee

La **primera integral que se resuelve es la de la derecha**:

::: pasos
// 1.º respecto de $z$, considerando a $x$ y a $y$ constantes
\int_p^q f(x;y;z)\,\dz                         // queda una integral doble en el dominio $R = [a;b]\times[c;d]$
// 2.º respecto de $y$, considerando a $x$ constante
\int_c^d \dy \int_p^q f(x;y;z)\,\dz             // queda una función de $x$
// 3.º respecto de $x$, sobre el intervalo $[a;b]$
\int_a^b \dx \int_c^d \dy \int_p^q f(x;y;z)\,\dz
:::

## Orden de integración

Si es posible integrar en otros órdenes de integración, **el resultado será el mismo**. En integrales triples hay **seis** órdenes de integración posibles ($3! = 6$):

$$
\dx\,\dy\,\dz \qquad \dx\,\dz\,\dy \qquad \dy\,\dx\,\dz \qquad \dy\,\dz\,\dx \qquad \dz\,\dx\,\dy \qquad \dz\,\dy\,\dx
$$

Se debe elegir aquel que se corresponda con **el cálculo más sencillo**.

## Ejemplo

::: ejemplo Calcular $\displaystyle\iiint_B xy^2z^3\,\dx\,\dy\,\dz$, donde $B$ es el recinto limitado por $x = 1$, $y = 2$, $z = 3$ y los planos coordenados
**a) Dominio de integración**

$B = [0;1]\times[0;2]\times[0;3]$:

```grafico3d
titulo: $B = [0;1]\times[0;2]\times[0;3]$
0 <= z <= 3, 0 <= x <= 1, 0 <= y <= 2
texto (1, 2, 3.3) "$B$"
```

**b) Orden de integración:** los límites son constantes, así que cualquier orden está bien. Además, el integrando es un producto de funciones de una sola variable: cada factor sale de las integrales que no son de su variable.

**c) Cálculo**

::: pasos
I_B = \int_0^1 \dx \int_0^2 \dy \int_0^3 xy^2z^3\,\dz
    = \int_0^1 x\,\dx \int_0^2 y^2\,\dy \int_0^3 z^3\,\dz                                       // $x$ e $y$ son constantes al integrar en $z$, y $x$ al integrar en $y$
    = \eval{\frac{x^2}{2}}{0}{1}\cdot\eval{\frac{y^3}{3}}{0}{2}\cdot\eval{\frac{z^4}{4}}{0}{3}
    = \frac{1}{2}\cdot\frac{8}{3}\cdot\frac{81}{4}
    = 27
:::

::: resultado
$$
\iiint_B xy^2z^3\,\dx\,\dy\,\dz = 27
$$
:::
:::
