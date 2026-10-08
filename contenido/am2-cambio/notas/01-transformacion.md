# 1. La transformación del dominio

Consideremos la necesidad de calcular una integral doble $\iint_D f(x;y)\,\dx\,\dy$ mediante un conveniente **cambio de variables** como el que sigue:

$$
(x;y) = \mathbf T(u;v) \qquad\text{donde}\qquad \begin{cases} x = T_1(u;v) \\ y = T_2(u;v) \end{cases}
$$

y además $T_1$ y $T_2$ tienen **derivadas parciales continuas** en un dominio $S$.

::: definicion La transformación $\mathbf T(u;v)$
$\mathbf T(u;v)$ es un campo vectorial $\R^2 \xrightarrow{\ \mathbf T\ } \R^2$ cuya correspondencia entre los puntos del dominio $S$ y los de la imagen $D$ es **1 a 1**, o sea, **biunívoca** (es decir, tiene inversa $\mathbf T^{-1}$).

$\mathbf T(u;v)$ hace corresponder el **contorno** de $S$ con el **contorno** de $D$.
:::

## Partición de $S$ y su imagen

Se divide $S$ en subrectángulos $S_{ij}$; sus imágenes son los $D_{ij}$:

```grafico
titulo: El dominio $S$ en el plano $uv$, partido en subrectángulos $S_{ij}$
ejes: u, v
x: -0.3..3.6
y: -0.2..1.7
1 <= x <= 3, 0.2 <= y <= 1.3 ; ""
texto (1.25, 1.15) "$S$"
segmento (1.5, 0.2) (1.5, 1.3) ; gris ; fina
segmento (2, 0.2) (2, 1.3) ; gris ; fina
segmento (2.5, 0.2) (2.5, 1.3) ; gris ; fina
segmento (1, 0.475) (3, 0.475) ; gris ; fina
segmento (1, 0.75) (3, 0.75) ; gris ; fina
segmento (1, 1.025) (3, 1.025) ; gris ; fina
poligono (2, 0.75) (2.5, 0.75) (2.5, 1.025) (2, 1.025) ; rojo ; "$S_{ij}$"
```

```grafico
titulo: Su imagen $D = \mathbf T(S)$ en el plano $xy$: cada $S_{ij}$ va a un $D_{ij}$ curvo
x: -0.3..3.3
y: -0.2..3.2
1 <= r <= 3, 0.2 <= θ <= 1.3 ; ""
texto (0.75, 2.75) "$D$"
(1.5 cos(t), 1.5 sin(t)) ; t: 0.2..1.3 ; gris ; fina ; ""
(2 cos(t), 2 sin(t)) ; t: 0.2..1.3 ; gris ; fina ; ""
(2.5 cos(t), 2.5 sin(t)) ; t: 0.2..1.3 ; gris ; fina ; ""
(t cos(0.475), t sin(0.475)) ; t: 1..3 ; gris ; fina ; ""
(t cos(0.75), t sin(0.75)) ; t: 1..3 ; gris ; fina ; ""
(t cos(1.025), t sin(1.025)) ; t: 1..3 ; gris ; fina ; ""
2 <= r <= 2.5, 0.75 <= θ <= 1.025 ; rojo ; "$D_{ij}$"
```

## Lo que falta: el diferencial de área

Hasta aquí podemos hacer la composición $f \circ \mathbf T$, reemplazando $x$ por $T_1(u;v)$ e $y$ por $T_2(u;v)$. Con ello, la integral nos queda:

$$
\iint_D f(x;y)\,\dx\,\dy = \iint_S f\big(T_1(u;v);T_2(u;v)\big)\cdot\ \hl{?}\ \du\,\dd v
$$

Tenemos que $f(x;y) = f\big(T_1(u;v);T_2(u;v)\big)$, pero para reemplazar los diferenciales de las variables cartesianas nos falta conocer su relación con las nuevas variables:

$$
\dx\,\dy = \ \hl{?}\ \du\,\dd v
$$

En otras palabras, falta la relación entre el **diferencial de área del dominio $D$** en el plano $xy$ y el **diferencial de área del dominio $S$** en el plano de las nuevas variables. Se busca en [[2. Relación entre los diferenciales de área]].
