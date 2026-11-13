# 6.7 Distribuciones de pequeñas muestras: t y chi cuadrado

::: idea
Con muestras **grandes**, las estadísticas muestrales son (aproximadamente) normales. Con muestras **pequeñas**, o cuando **no se conoce $\sigma$**, se usan otras distribuciones derivadas de la normal y definidas por sus **grados de libertad**: la $t$ de Student y la $\chi^2$.
:::

::: ppt Grados de libertad (Rimoldi)
Cuando solo dan el **tamaño de muestra**: **grados de libertad $= n - 1$**. Tanto en la tabla $t$ como en la $\chi^2$, se entra **siempre por la fila de $n-1$**.
:::

El motivo: si $n$ números tienen que dar un promedio fijo, se eligen libremente $n - 1$ y el último queda determinado (se pierde un grado de libertad al estimar $\mu$ con $\bar x$).

## t de Student

::: ppt Propiedades (Garibaldi)
$$
\mu = 0 \qquad \sigma^2 = \frac{v}{v-2}\ \ (v > 2) \qquad v = \text{grados de libertad}
$$
- Cada curva $t$ tiene **forma de campana con centro en 0**.
- Es **más dispersa** (más aplanada) que la normal estándar.
- Al **aumentar $v$**, la dispersión **disminuye**.
- Cuando $v \to \infty$ se aproxima a la normal estándar: por eso a $z$ se la llama a veces "curva $t$ con $v = \infty$".

Se usa en estimación y pruebas de hipótesis de la **media** con $\sigma$ **desconocida** y muestra chica:
$$
t = \frac{\bar x - \mu}{\hat s/\sqrt n} \sim t_{n-1}
$$
:::

```grafico
titulo: La $t$ tiene colas más pesadas que la normal y se le acerca al crecer $v$
y = e^(-x^2/2)/sqrt(2 pi) ; "$z \sim N(0;1)$" ; gruesa
y = 1/(pi (1 + x^2)) ; "$t_1$" ; rojo ; punteada
y = 0.3676/(1 + x^2/3)^2 ; "$t_3$" ; ambar
x: -4..4
grilla: no
aspecto: libre
alto: 260
```

::: ppt Cómo se usa la tabla $t$ (Rimoldi y guía)
Acumula desde $-\infty$ (como la normal), pero se entra por la **fila $n-1$** y la probabilidad está en el encabezado de la columna. Los casos se resuelven igual que con $z$: complemento y simetría.

- $P(t > a) = 0{,}05$ con $n = 11$ → fila 10, columna $0{,}95$ → $a = 1{,}812$.
- Bilateral: $P(\lvert t\rvert > a) = 0{,}05$ → cada cola $0{,}025$ → columna $0{,}975$.
- $P(a < t < -1{,}717) = 0{,}04$ con $n = 23$: $P(t < -1{,}717) = 0{,}05$ → $P(t < a) = 0{,}01$ → $a = -2{,}508$.
:::

::: ejemplo Tabla $t$ (apunte)
::: solucion
- $P(t_{15} > 2{,}602) = 1 - 0{,}99 = 0{,}01$
- $P(\lvert t_{18}\rvert > 2{,}101) = 2\,(1 - 0{,}975) = 0{,}05$
- $P(-0{,}706 < t_8 < 1{,}86) = 0{,}95 - (1 - 0{,}75) = 0{,}70$
:::
:::

## Chi cuadrado

::: ppt Tabla chi cuadrado (Rimoldi)
- Solo toma valores **positivos** y no es simétrica.
- Fila de **$n-1$** grados de libertad; la tabla da $P(\chi^2 < a)$ y la probabilidad **encabeza la columna** donde está $a$.
- $P(\chi^2 > a) = 1 - P(\chi^2 < a)$ y $P(a < \chi^2 < b) = P(\chi^2 < b) - P(\chi^2 < a)$.

Ejemplos: $P(\chi^2_{15} < a) = 0{,}90 \then a = 22{,}3$; $\ P(\chi^2_6 > 3{,}5) = 1 - 0{,}25 = 0{,}75$; $\ P(\chi^2_{19} > a) = 0{,}025 \then a = 32{,}9$.
:::

Su uso principal es la varianza muestral: $\frac{(n-1)\hat s^2}{\sigma^2} \sim \chi^2_{n-1}$ ([[7.5 Distribución de la varianza muestral]]).

::: libro De dónde sale la $t$
La $t$ es el cociente entre una normal estándar y la raíz de una $\chi^2$ dividida por sus grados de libertad: $t = \frac{z}{\sqrt{U/\nu}}$, con $z = \frac{\bar x - \mu}{\sigma/\sqrt n}$ y $U = \frac{\sum(x_i - \bar x)^2}{\sigma^2} \sim \chi^2_{n-1}$. Al simplificar $\sigma$ queda $t = \frac{\bar x - \mu}{\hat s/\sqrt n}$. La estructura es la de $z$, pero con la desviación **muestral corregida** en lugar de la poblacional: con muestras chicas, $\hat s$ varía mucho de una muestra a otra, y esa variabilidad extra impide usar la normal.
:::

::: pregunta ¿Cuándo se usa $t$ en lugar de $z$ para la media muestral?
- [ ] Cuando la población no es normal
- [x] Cuando no se conoce $\sigma$ y la muestra es pequeña
- [ ] Cuando la muestra es grande
::: solucion Explicación
$t$ reemplaza $\sigma$ por $\hat s$. Si la muestra es grande, $\hat s$ se acerca a $\sigma$ y la $t$ se parece a la normal.
:::
:::

::: pregunta Una muestra de 20 observaciones. ¿Con cuántos grados de libertad se entra a la tabla $t$?
- [ ] 20
- [x] 19
- [ ] 18
::: solucion Explicación
$v = n - 1 = 19$.
:::
:::

::: pregunta Comparada con la normal estándar, la $t$ de Student:
- [ ] tiene media distinta de 0
- [ ] es asimétrica
- [x] es más dispersa, con varianza $\frac{v}{v - 2} > 1$
::: solucion Explicación
Tiene forma de campana centrada en 0 como $z$, pero más dispersa. Al crecer $v$, $\frac{v}{v-2} \to 1$.
:::
:::
