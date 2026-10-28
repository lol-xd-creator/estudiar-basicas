# 1. EDO de orden n y ecuaciones lineales

## EDO de orden $n$

::: definicion EDO de orden $n$
Tiene la forma

$$
R\big(x;\,y;\,y';\,y'';\,\dots;\,y^{(n)}\big) = 0
$$
:::

- Su **solución general** es de la forma $y = f(x;\,C_1;\,C_2;\,\dots;\,C_n)$, con **$n$ constantes esenciales**.
- Una **solución particular** necesita **$n$ condiciones iniciales** para calcular el valor de las constantes (por ejemplo, para orden 2: $y(x_0)$ e $y'(x_0)$).

## Ecuación diferencial lineal de orden $n$

::: definicion EDL de orden $n$
Es **lineal** si es de **primer grado** respecto de $y$ y de sus $n$ derivadas:

$$
a_0\,y^{(n)} + a_1\,y^{(n-1)} + \dots + a_{n-1}\,y' + a_n\,y = r(x)
$$

donde $a_0;\,a_1;\,\dots;\,a_n$ y $r(x)$ son funciones de $x$ o constantes. Para simplificar, se toma $a_0 = 1$ (se divide toda la ecuación por $a_0$).
:::

- Si $r(x) = 0$: **EDL homogénea** (EDLH).
- Si $r(x) \ne 0$: **EDL no homogénea** (EDLNH).

::: ojo
"Homogénea" acá **no** significa lo mismo que en [[3. Ecuaciones homogéneas]] de 1.er orden ($f(x;y)$ homogénea de grado cero). En las lineales, homogénea quiere decir **segundo miembro nulo**: $r(x) = 0$.
:::

::: ejemplo ¿Lineal o no?
- $y'' + 3y' - 4y = x^2$: lineal de 2.º orden, no homogénea.
- $y''' - x\,y' + y = 0$: lineal de 3.er orden, homogénea (los coeficientes pueden depender de $x$).
- $y'' + y\,y' = 0$: **no** es lineal (aparece el producto $y\,y'$).
- $y'' + (y')^2 = \sen x$: **no** es lineal ($y'$ al cuadrado).
:::
