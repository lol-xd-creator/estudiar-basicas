# 6.3 Modelo exponencial

::: idea
Es el **Poisson dado vuelta**. Poisson cuenta **cuántos** sucesos hay en una unidad de tiempo; la exponencial mide **cuánto tiempo (o espacio) pasa** entre un suceso y el siguiente. Como el tiempo es continuo, la variable es continua.
:::

::: ppt Cuándo se usa (Garibaldi)
Si los sucesos ocurren según un proceso de **Poisson**, la longitud del tiempo o espacio **entre sucesos sucesivos** es exponencial. Se aplica si interesa:

- el tiempo (o espacio) **hasta el primer** suceso;
- el tiempo **entre dos sucesos sucesivos**;
- el tiempo hasta el primer suceso **después de cualquier instante elegido al azar**.

Ejemplos: tiempos entre llegadas a una instalación de servicio (**teoría de colas**), tiempo de operación hasta que un componente empieza a fallar, tiempo de atención (un médico, una farmacia, una urgencia).
:::

::: ppt Fórmulas y los tres casos (Rimoldi y apunte)
Con $\lambda$ = promedio de sucesos por unidad de tiempo y $\mu = \frac{1}{\lambda}$ = tiempo medio entre sucesos:

$$
f(x) = \lambda\,e^{-\lambda x},\ x \ge 0 \qquad E(x) = \mu = \frac1\lambda \qquad V(x) = \frac{1}{\lambda^2} \qquad DS(x) = \frac1\lambda
$$

$$
P(x \le a) = 1 - e^{-\lambda a} \qquad P(x > a) = e^{-\lambda a} \qquad P(a < x < b) = e^{-\lambda a} - e^{-\lambda b}
$$

Si dan la **media** $\mu$: $\lambda = \frac{1}{\mu}$ (Rimoldi: "$\mu = 10 \then \lambda = 0{,}10$").
:::

::: ojo
- $\lambda$ tiene que estar en **la misma unidad de tiempo** que $x$. Si llegan 5 solicitudes por hora y preguntan por media hora, $\lambda x = 5 \cdot 0{,}5 = 2{,}5$.
- En **Poisson** la esperanza es igual a la **varianza**; en la **exponencial**, la esperanza es igual a la **desviación**.
- En la calculadora, $e^{-x}$ es **shift + ln** del número negativo.
:::

```grafico
titulo: Densidad exponencial con $\lambda = 1$: los tiempos cortos son los más probables
y = e^(-x) ; x: 0..5 ; gruesa ; "$f(x) = \lambda e^{-\lambda x}$"
0 <= x <= 1, 0 <= y <= e^(-x) ; rayado ; azul
texto (0.5, 0.25) "$1 - e^{-\lambda x}$"
x: -0.3..5
grilla: no
aspecto: libre
alto: 260
```

::: ejemplo Solicitudes de reparación (Garibaldi y apunte)
Un departamento recibe en promedio 5 solicitudes por hora. Empezando a observar en cualquier momento, ¿probabilidad de recibir la primera solicitud dentro de la media hora? ¿Y pasada la media hora?

::: solucion
$\lambda = 5$ por hora $\then$ $2{,}5$ por media hora.

- $P(x < 0{,}5) = 1 - e^{-2{,}5} = 1 - 0{,}08208 = 0{,}91792$
- $P(x > 0{,}5) = e^{-2{,}5} = 0{,}08208$
:::
:::

::: ejemplo Consumo de agua (Rimoldi)
El consumo mensual de agua es exponencial con media 10 m³. ¿Probabilidad de consumir menos de 3 m³? ¿Más de 40?

::: solucion
$\lambda = \frac{1}{10} = 0{,}10$. $\quad P(x < 3) = 1 - e^{-0{,}3} = 0{,}2592$. $\quad P(x > 40) = e^{-4} = 0{,}0183$.

**InfoStat:** Probabilidades y cuantiles → Exponencial (lambda) con $\lambda = 0{,}1$.
:::
:::

::: libro De dónde sale: de Poisson a exponencial
Sea $x$ el tiempo hasta el primer suceso. Que $x > x_i$ quiere decir que **no hubo ningún suceso** en $(0;x)$, y por Poisson:
$$
P(x > x_i) = \frac{(\lambda x)^0\,e^{-\lambda x}}{0!} = e^{-\lambda x} \qquad\then\qquad F(x) = 1 - e^{-\lambda x}
$$
Se llama también **exponencial negativa** porque la densidad siempre decrece: los intervalos largos entre sucesos son menos probables que los cortos. El apunte la escribe con $\theta = \frac1\lambda$: $f(x) = \frac1\theta e^{-x/\theta}$.

*Ejemplo del apunte:* una computadora funciona sin fallas un tiempo exponencial con $\theta = 360$ h. $P(x \le 180) = 1 - e^{-0{,}5} = 0{,}39347$; $P(x > 720) = e^{-2} = 0{,}13534$.
:::

::: pregunta Llegan en promedio 10 clientes por hora a un local (Poisson). ¿Qué modelo describe el tiempo entre dos clientes y cuál es su media?
- [ ] Poisson, media 10 clientes
- [x] Exponencial, media $\frac{1}{10}$ hora (6 minutos)
- [ ] Exponencial, media 10 horas
::: solucion Explicación
El tiempo **entre** sucesos de Poisson es exponencial, con media $\frac{1}{\lambda} = \frac{1}{10}$ de hora.
:::
:::

::: pregunta En la exponencial, ¿qué dos medidas coinciden?
- [ ] La esperanza y la varianza
- [x] La esperanza y la desviación estándar
- [ ] La media y la mediana
::: solucion Explicación
$E(x) = DS(x) = \frac{1}{\lambda}$. Esperanza igual a varianza es la propiedad de Poisson.
:::
:::
