# 6.8 Repaso de la unidad 6

*Primero intentá responder sin mirar; después abrí la respuesta.*

## Teoría

::: ejercicio ¿Por qué en una variable continua $P(x \le a) = P(x < a)$?
::: respuesta
Porque $P(x = a) = \int_a^a f(x)\,\dx = 0$: agregar o sacar un punto no cambia el área. En las discretas no pasa: $P(x = a)$ puede ser positiva.
:::
:::

::: ejercicio ¿Qué relación hay entre el modelo de Poisson y el exponencial?
::: respuesta
Si los sucesos ocurren según Poisson a un ritmo $\lambda$ por unidad de tiempo, el tiempo (o espacio) entre sucesos sucesivos, o hasta el primero, es exponencial con media $\theta = \frac1\lambda$. Poisson es discreta (cuenta sucesos); la exponencial es continua (mide tiempo). En Poisson $E = V$; en la exponencial $E = DS$.
:::
:::

::: ejercicio Nombrá tres razones por las que la normal es importante.
::: respuesta
1. Muchas variables reales se distribuyen en forma parecida a la normal.
2. La distribución muestral de muchas estadísticas (como la media) es aproximadamente normal si la muestra es grande, cualquiera sea la población.
3. Aproxima a la binomial, la Poisson y la hipergeométrica cuando crece el tamaño de la muestra.
:::
:::

::: ejercicio ¿Para qué se estandariza una variable normal?
::: respuesta
Para usar **una sola tabla**: hay infinitas normales (una por cada $\mu$ y $\sigma$), pero todas se transforman con $z = \frac{x-\mu}{\sigma}$ en la $N(0;1)$, que es la tabulada.:::
:::

::: ejercicio Enumerá las propiedades de la curva normal.
::: respuesta
Moda en $\mu$; simétrica respecto de $\mu$ (media = mediana = moda); acampanada; puntos de inflexión en $\mu \pm \sigma$; asintótica al eje horizontal; área total 1; el área entre $x_1$ y $x_2$ es la probabilidad de ese intervalo.
:::
:::

::: ejercicio Enunciá la regla 68–95–99,7.
::: respuesta
En una distribución normal, alrededor del 68 % de los valores está a menos de una desviación de la media, cerca del 95 % a menos de dos y casi el 99,7 % a menos de tres.
:::
:::

::: ejercicio ¿Con cuántos grados de libertad se entra a la tabla $t$ o $\chi^2$?
::: respuesta
Con $n - 1$, siempre en la fila de $n-1$. Se pierde un grado de libertad por estimar $\mu$ con $\bar x$.
:::
:::

::: ejercicio ¿En qué se parecen y en qué se diferencian $z$ y $t$ para la media?
::: respuesta
Las dos son $\frac{\bar x - \mu}{\text{desviación}/\sqrt n}$, simétricas respecto de 0 y acampanadas. $z$ usa $\sigma$ (conocida) y es $N(0;1)$; $t$ usa $\hat\sigma$ (estimada), tiene $n-1$ grados de libertad y es más aplanada, con $V(t) = \frac{\nu}{\nu - 2}$. Cuando $n \to \infty$, $t \to z$.
:::
:::

## Preguntas rápidas

::: pregunta La vida de un componente es exponencial con media 200 horas. ¿$P(x > 200)$?
- [ ] $0{,}5$
- [x] $e^{-1} \approx 0{,}368$
- [ ] $1 - e^{-1} \approx 0{,}632$
::: solucion Explicación
$P(x > a) = e^{-a/\theta} = e^{-200/200} = e^{-1}$. Ojo: en la exponencial la media **no** deja la mitad del área a cada lado (no es simétrica).
:::
:::

::: pregunta $x \sim N(60;4)$. ¿Qué valor está a 1,27 desviaciones **por debajo** de la media?
- [x] $54{,}92$
- [ ] $65{,}08$
- [ ] $58{,}73$
::: solucion Explicación
$x = \mu + z\sigma = 60 - 1{,}27 \cdot 4 = 54{,}92$.
:::
:::

::: pregunta Para aproximar una Poisson con la normal, ¿qué se usa como $\sigma$?
- [ ] $\lambda$
- [x] $\sqrt\lambda$
- [ ] $\sqrt{nPQ}$
::: solucion Explicación
En Poisson $V(x) = \lambda$, entonces $\sigma = \sqrt\lambda$ y $z = \frac{x - \lambda}{\sqrt\lambda}$. Se usa si $\lambda > 20$.
:::
:::

::: pregunta Una uniforme en $[7;10]$. ¿Cuál es su varianza?
- [ ] $8{,}5$
- [ ] $3$
- [x] $0{,}75$
::: solucion Explicación
$V = \frac{(b-a)^2}{12} = \frac{9}{12} = 0{,}75$. La media es $8{,}5$.
:::
:::

::: pregunta $P(z > k) = 0{,}80$. ¿Cómo es $k$?
- [x] Negativo
- [ ] Positivo
- [ ] Cero
::: solucion Explicación
Si a la derecha de $k$ queda más de la mitad del área, $k$ está a la izquierda de 0.
:::
:::

::: pregunta En la tabla $t$, $P(|t_9| > t) = 0{,}05$. ¿Con qué probabilidad acumulada se busca $t$?
- [ ] $0{,}95$
- [x] $0{,}975$
- [ ] $0{,}05$
::: solucion Explicación
El $0{,}05$ se reparte en dos colas de $0{,}025$; a la izquierda de $t$ queda $1 - 0{,}025 = 0{,}975$. Da $t = 2{,}262$.
:::
:::
