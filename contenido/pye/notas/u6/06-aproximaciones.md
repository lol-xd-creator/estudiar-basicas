# 6.6 Aproximación de modelos discretos a la normal

::: idea
Cuando $n$ (o $\lambda$) es grande, la binomial, la hipergeométrica y la Poisson toman forma de campana. Entonces se calcula con la normal: se **estandariza con la esperanza y la desviación del modelo discreto**. Lo justifica el **teorema central del límite** ([[7.6 Ley de los grandes números y teorema central del límite]]).
:::

::: ppt Receta general (Rimoldi)
$$
z = \frac{x - E(x)}{DS(x)} \sim N(0;1)
$$
con $E(x)$ y $DS(x)$ **del modelo discreto** que se aproxima. En **InfoStat** se entra a la Normal con la variable $x$ **sin estandarizar** y con la media y la **varianza** del modelo discreto.

| Se puede aproximar si… | Binomial | Hipergeométrico | Poisson |
|---|---|---|---|
| Rimoldi | $n > 30$ | $n > 30$ | $\lambda > 20$ |
| Garibaldi (binomial) | $np \ge 5$ y $nq \ge 5$; muy buena si $p \approx 0{,}5$ | | |
:::

## Binomial → normal

::: ppt Binomial (Garibaldi y Rimoldi)
$$
E(x) = np \qquad \sigma = \sqrt{npq} \qquad z = \frac{x - np}{\sqrt{npq}}
$$
Lo lógico es usar la binomial; la normal es una muy buena aproximación cuando la binomial toma forma de campana simétrica, es decir, con $n$ suficientemente grande y $p$ no cercano a 0 ni a 1.
:::

::: ejemplo Accidentes en la vista (Garibaldi)
La probabilidad de que un operario sufra un accidente en la vista es $0{,}4$. Con 100 operarios, ¿probabilidad de que menos de 30 lo sufran?

::: solucion
$E(x) = 100 \cdot 0{,}4 = 40$, $\ V(x) = 100 \cdot 0{,}4 \cdot 0{,}6 = 24$.

$P(x < 30) = P\!\left(z < \frac{30 - 40}{\sqrt{24}}\right) = P(z < -2{,}04) = 1 - 0{,}9793 = 0{,}0206$
:::
:::

::: ejemplo Compras en un centro comercial (Rimoldi)
El 70 % compra algo. En 50 personas, ¿probabilidad de que al menos 40 compren?

::: solucion
$n = 50 > 30$: $\ E = 35$, $\ \sigma = \sqrt{10{,}5} = 3{,}24$. $\ P(x \ge 40) = P(z \ge 1{,}54) = 0{,}0618$ (InfoStat: $0{,}0614$).
:::
:::

## Poisson → normal

::: ppt Poisson (Garibaldi y Rimoldi)
Poisson tiene un solo parámetro, $\lambda = np$; si $n$ es grande, $\lambda$ crece y a veces no se puede usar la tabla de Poisson. Entonces ($\lambda > 20$):
$$
E(x) = V(x) = \lambda \qquad z = \frac{x - \lambda}{\sqrt{\lambda}}
$$
:::

::: ejemplo Llamadas (Rimoldi)
Llegan 10 llamadas por hora. ¿Probabilidad de entre 35 y 45 en 4 horas?

::: solucion
$\lambda = 40$, $\ \sigma = \sqrt{40} = 6{,}32$. $\ P(-0{,}79 \le z \le 0{,}79) = 0{,}5704$ (InfoStat: $0{,}5708$).
:::
:::

## Hipergeométrico → normal

::: ppt Hipergeométrico (Rimoldi)
Selección **sin reposición** de una población finita ($n/N > 0{,}05$) y $n > 30$:
$$
E(x) = n\,\frac{K}{N} \qquad V(x) = n\,\frac{K}{N}\left(1 - \frac{K}{N}\right)\frac{N-n}{N-1}
$$
:::

::: ejemplo Compras en un centro comercial, sin reposición (Rimoldi)
De 100 personas, 80 compran. Se eligen 50 personas distintas. ¿Probabilidad de que al menos 46 compren?

::: solucion
$E(x) = 50 \cdot 0{,}8 = 40$, $\ V(x) = 50 \cdot 0{,}8 \cdot 0{,}2 \cdot \frac{50}{99} = 4{,}04$. Con InfoStat (Normal con media 40 y varianza 4,04): $P(x \ge 46) = 0{,}0014$.
:::
:::

## Proporción muestral → normal

::: ppt Proporción muestral (Garibaldi)
$$
z = \frac{\hat p - P}{\sqrt{\dfrac{PQ}{n}}} \quad\text{(con reposición)}
\qquad\qquad
z = \frac{\hat p - P}{\sqrt{\dfrac{PQ}{n}\cdot\dfrac{N-n}{N-1}}} \quad\text{(sin reposición)}
$$
Se usa mucho en las unidades 7 a 9 ([[7.4 Distribución de la proporción muestral]]).
:::

::: libro Corrección por continuidad y forma de la binomial
- La binomial es simétrica si $P = Q = 0{,}5$; asimétrica a derecha si $P < Q$ y a izquierda si $P > Q$. Al crecer $n$ se vuelve simétrica.
- Al pasar de discreta a continua, el apunte suma y resta medio: $P(a \le x \le b) \approx P(a - 0{,}5 \le x' \le b + 0{,}5)$ (para $\hat P$, $\frac{1}{2n}$). Ejemplo: con $B(10;0{,}5)$, $P(2 \le x \le 4)$ da $0{,}3663$ exacta y $0{,}3630$ con la corrección.
- **En la materia, con $n > 30$ se trabaja sin corrección por continuidad**, como en todos los ejemplos de las PPT.
:::

::: pregunta Una binomial con $n = 200$ y $P = 0{,}3$. ¿Con qué se estandariza?
- [ ] $z = \frac{x - 0{,}3}{\sqrt{0{,}3 \cdot 0{,}7}}$
- [x] $z = \frac{x - 60}{\sqrt{42}}$
- [ ] $z = \frac{x - 60}{42}$
::: solucion Explicación
$E(x) = nP = 60$ y $\sigma = \sqrt{nPQ} = \sqrt{42}$. Se divide por la **desviación**, no por la varianza.
:::
:::

::: pregunta ¿Cuándo se aproxima una Poisson con la normal?
- [ ] Cuando $\lambda < 5$
- [x] Cuando $\lambda > 20$
- [ ] Siempre
::: solucion Explicación
Con $\lambda$ grande la Poisson toma forma de campana (y su tabla ya no alcanza). Se usa $E = \lambda$ y $\sigma = \sqrt\lambda$.
:::
:::
