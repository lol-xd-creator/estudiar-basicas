# 6.4 Modelo normal

::: idea
La campana de Gauss. Está definida por **dos parámetros**: la media $\mu$ (dónde está) y la desviación $\sigma$ (qué tan ancha es). Para no tener una tabla por cada $(\mu;\sigma)$, toda normal se **estandariza** a $z \sim N(0;1)$ y se usa una sola tabla.
:::

Garibaldi la presenta como **la distribución continua más importante de la estadística**: describe muchos fenómenos de la industria, la investigación y la naturaleza, y **la inferencia estadística se basa en ella**. También aproxima a la binomial, la Poisson y la hipergeométrica con muestras grandes ([[6.6 Aproximación de modelos discretos a la normal]]).

::: ppt Densidad
$x \sim N(\mu;\sigma)$ si
$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\;e^{-\frac{(x-\mu)^2}{2\sigma^2}} \qquad -\infty < x < +\infty
$$
con $\pi \approx 3{,}14159$ y $e \approx 2{,}71828$. En $N(\mu;\sigma)$ el primer parámetro es la **media** y el segundo la **desviación** (en InfoStat se carga la **varianza**).
:::

::: ppt Propiedades (Garibaldi y Rimoldi)
1. La **moda** (máximo de la curva) está en $x = \mu$; como es **simétrica**, media, mediana y moda coinciden en el centro.
2. Es **simétrica** respecto de $\mu$ y **acampanada** (mesocúrtica).
3. Tiene sus **puntos de inflexión** en $\mu \pm \sigma$.
4. Es **asintótica** al eje horizontal: se le acerca sin tocarlo. El rango es $-\infty < x < +\infty$.
5. El **área total** bajo la curva es 1, y el área entre $x_1$ y $x_2$ es $P(x_1 < X < x_2)$.
6. $P(X = x_i) = 0$: siempre se calcula la probabilidad de un **intervalo**.
:::

```grafico
titulo: Misma $\sigma$, distinta $\mu$: la curva se traslada
y = e^(-(x+3)^2/(2*1.5^2))/(1.5 sqrt(2 pi)) ; "$\mu=-3$" ; azul
y = e^(-x^2/(2*1.5^2))/(1.5 sqrt(2 pi)) ; "$\mu=0$" ; rojo
y = e^(-(x-3)^2/(2*1.5^2))/(1.5 sqrt(2 pi)) ; "$\mu=3$" ; verde
x: -8..8
grilla: no
aspecto: libre
alto: 260
```

```grafico
titulo: Misma $\mu$, distinta $\sigma$: más $\sigma$, más aplanada
y = e^(-x^2/(2*0.5^2))/(0.5 sqrt(2 pi)) ; "$\sigma=0{,}5$" ; rojo
y = e^(-x^2/2)/sqrt(2 pi) ; "$\sigma=1$" ; azul
y = e^(-x^2/(2*2^2))/(2 sqrt(2 pi)) ; "$\sigma=2$" ; verde
x: -6..6
grilla: no
aspecto: libre
alto: 260
```

## Normal estándar

::: ppt Estandarización
Integrar la densidad para cada $\mu$ y $\sigma$ sería imposible ("se necesitaría un sinfín de tablas"). Por eso se **estandariza**:
$$
z = \frac{x - \mu}{\sigma} \sim N(0;1)
\qquad\qquad
P(a \le x \le b) = P\!\left(\frac{a-\mu}{\sigma} \le z \le \frac{b-\mu}{\sigma}\right)
$$
La normal estándar tiene **media 0 y varianza 1**, y es la que está en la tabla.
:::

::: libro Demostración de que $E(z) = 0$ y $V(z) = 1$
$z = \frac{1}{\sigma}(x - \mu)$, con $\frac1\sigma$ y $\frac\mu\sigma$ constantes:
$E(z) = \frac{1}{\sigma}\big[E(x) - \mu\big] = 0$ y $V(z) = \frac{1}{\sigma^2}V(x) = 1$.

El apunte agrega dos propiedades: una transformación lineal $y = a + bx$ de una normal es normal, $N(a + b\mu;\ b^2\sigma^2)$; y la suma de normales independientes es normal, con media y varianza iguales a las sumas.
:::

::: ppt Cómo se usa la tabla (Rimoldi)
La **Tabla VI** da $P(z < z_i)$: acumula desde $-\infty$. Todo lo demás sale por **complemento** y **simetría**:

| Se pide | Se calcula |
|---|---|
| $P(z < a)$ | directo de la tabla |
| $P(z > a)$ | $1 - P(z < a)$, o $P(z < -a)$ por simetría |
| $P(a < z < b)$ | $P(z < b) - P(z < a)$ ("cuando ambos límites son finitos") |
| $P(\lvert x - \mu\rvert \le k\sigma)$ | $P(-k \le z \le k)$ |

En las continuas, $<$ es lo mismo que $\le$.
:::

```grafico
titulo: Simetría: $P(z < -a) = P(z > a)$
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
-3.5 <= x <= -1, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; azul
1 <= x <= 3.5, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
texto (-1, -0.03) "$-a$"
texto (1, -0.03) "$a$"
x: -3.5..3.5
grilla: no
aspecto: libre
alto: 260
leyenda: no
```

::: ejemplo Permanencia hospitalaria (Rimoldi)
$X \sim N(60;\ 15)$ días. Probabilidad de que un paciente esté internado menos de 82 días, menos de 30, más de 90, más de 50, entre 75 y 80.

::: solucion
- $P(x < 82) = P(z < 1{,}47) = 0{,}9292$ (InfoStat, sin redondear: $0{,}9288$)
- $P(x < 30) = P(z < -2) = 0{,}0228$
- $P(x > 90) = P(z > 2) = P(z < -2) = 0{,}0228$
- $P(x > 50) = P(z > -0{,}67) = P(z < 0{,}67) = 0{,}7486$
- $P(75 < x < 80) = P(1 < z < 1{,}33) = 0{,}9082 - 0{,}8413 = 0{,}0669$

**InfoStat:** Probabilidades y cuantiles → Normal con media 60 y **varianza 225**.
:::
:::

## Al revés: dada la probabilidad, hallar el valor

::: ppt Hallar $x$ o $\mu$ (Rimoldi)
Se busca la probabilidad **en el cuerpo** de la tabla, se lee $z$ y se **despeja** de la estandarización:
$$
x = \mu + z\,\sigma \qquad\qquad \mu = x - z\,\sigma
$$
Si la probabilidad dada no es "$P(z < \cdot)$", primero se lleva a esa forma con el complemento.

**Cantidades:** si piden **cuántos** elementos cumplen algo, primero la probabilidad y después $N \times P$ (500 llantas $\times\ 0{,}2415 \approx 121$).
:::

::: ejemplo Tiempo para un examen (Rimoldi)
El tiempo para terminar un examen es normal con $\mu = 70$ min y $\sigma = 12$ min. ¿Cuánto tiempo hay que dar para que el 90 % termine?

::: solucion
$P(x < x_0) = 0{,}90$. Lo más cercano a $0{,}90$ en la tabla es $0{,}8997 \then z = 1{,}28$.

$x_0 = 70 + 1{,}28 \cdot 12 = 85{,}36$ minutos. (InfoStat: $85{,}38$.)
:::
:::

::: ejemplo Hallar la media (Rimoldi)
Con $\sigma = 5$, la probabilidad de que una observación supere 21 es $0{,}14$. ¿Cuánto vale $\mu$?

::: solucion
$P(z < z_0) = 1 - 0{,}14 = 0{,}86 \then z_0 = 1{,}08$.

$1{,}08 = \frac{21 - \mu}{5} \then \mu = 21 - 1{,}08 \cdot 5 = 15{,}6$.
:::
:::

::: aclaracion
En el apunte de Stefanich este último ejemplo termina en $\mu = 14{,}60$, porque en el despeje usa $1{,}28$ en lugar del $z = 1{,}08$ que había leído en la tabla. Con $1{,}08$ da $\mu = 15{,}6$.
:::

::: libro Ejemplos del apunte con $N(100;15)$
- $P(x < 92{,}5) = P(z < -0{,}5) = 0{,}3085$; $\ P(x > 76) = P(z > -1{,}6) = 0{,}9452$; $\ P(112 < x < 128{,}5) = P(0{,}8 < z < 1{,}9) = 0{,}1832$.
- Hallar $k$: $P(z > k) = 0{,}7454 \then k = -0{,}66$; $\ P(z > k) = 0{,}1190 \then k = 1{,}18$; $\ P(z < k) = 0{,}1251 \then k = -1{,}15$.
:::

::: pregunta Si $x \sim N(50;10)$, ¿cuánto vale $P(x > 50)$?
- [x] $0{,}5$
- [ ] $0$
- [ ] Hace falta la tabla
::: solucion Explicación
50 es la media, y la normal es simétrica respecto de la media: la mitad del área queda a cada lado.
:::
:::

::: pregunta ¿Dónde tiene la curva normal sus puntos de inflexión?
- [ ] En $\mu$
- [x] En $\mu \pm \sigma$
- [ ] En $\mu \pm 2\sigma$
::: solucion Explicación
Es una de las propiedades que enumera Garibaldi. En $\mu$ está el máximo (la moda).
:::
:::

::: pregunta $P(z < -1{,}2)$ es igual a:
- [ ] $P(z < 1{,}2)$
- [x] $1 - P(z < 1{,}2)$
- [ ] $-P(z < 1{,}2)$
::: solucion Explicación
Por simetría, $P(z < -1{,}2) = P(z > 1{,}2)$, y por complemento eso es $1 - P(z < 1{,}2)$.
:::
:::
