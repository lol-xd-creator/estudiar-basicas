# 4. EDL no homogéneas: estructura de la solución

$$
y'' + a_1\,y' + a_2\,y = r(x) \qquad r(x) \ne 0 \label{nh}
$$

con $a_1$, $a_2$ y $r(x)$ funciones de $x$ o constantes.

::: resultado Estructura de la SG
$$
y = y_H + y_p
$$

- $y_H$: **solución general del caso homogéneo** (la misma ED con $r(x) = 0$);
- $y_p$: **una** solución particular cualquiera de \eqref{nh}.
:::

::: demostracion
$y' = y_H' + y_p'$ e $y'' = y_H'' + y_p''$. Reemplazando en \eqref{nh} y reagrupando:

$$
\big(\hl{y_H'' + a_1y_H' + a_2y_H}\big) + \big(\hlb{y_p'' + a_1y_p' + a_2y_p}\big) = r(x)
$$

- el primer paréntesis vale $0$, por ser $y_H$ solución de la homogénea;
- el segundo vale $r(x)$, por ser $y_p$ solución de la no homogénea.

Entonces $y_H + y_p$ satisface \eqref{nh}, y tiene las dos constantes esenciales de $y_H$.
:::

## Con coeficientes constantes

$$
y'' + p\,y' + q\,y = r(x) \label{nhcc}
$$

$y_H = C_1y_1 + C_2y_2$ ya se sabe calcular con la ecuación característica ([[3. Homogéneas a coeficientes constantes]]), así que la SG queda

$$
y = C_1\,y_1 + C_2\,y_2 + y_p
$$

Falta saber cómo calcular $y_p$. Hay dos métodos:

- **A) [[5. Método de los coeficientes indeterminados]]**: cuando $r(x)$ es un polinomio, una exponencial, un seno o coseno, o sumas y productos de esas funciones.
- **B) [[6. Método de variación de los parámetros]]**: sirve para cualquier $r(x)$; se usa sobre todo cuando no es de esos tipos.
