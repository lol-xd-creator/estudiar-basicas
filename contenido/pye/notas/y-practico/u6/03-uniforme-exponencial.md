# P6.3 Uniforme y exponencial

*Guía, unidad 6: ejercicios 1, 26, 27, 28 y 35 (Rimoldi y Stefanich resuelven 1, 26, 27 y 28).*

::: tip Exponencial: los tres casos
Con media $\mu$ (o $\lambda = \frac1\mu$):
$$
P(x \le a) = 1 - e^{-a/\mu} \qquad P(x > a) = e^{-a/\mu} \qquad P(a < x < b) = e^{-a/\mu} - e^{-b/\mu}
$$
En la calculadora, $e^{-x}$ es **shift + ln** del número negativo.
:::

::: ejercicio 6.1 · Máquina de café (uniforme)
La cantidad diaria de café, en litros, es uniforme con $A = 7$ y $B = 10$. Probabilidad de que en un día sirva: a) como máximo 8,8 litros · b) entre 7,4 y 9,5 · c) al menos 8,5.

::: solucion
$P = \frac{\text{longitud del intervalo}}{B - A} = \frac{\text{longitud}}{3}$.

- a) $P(X \le 8{,}8) = \frac{8{,}8 - 7}{3} = 0{,}60$
- b) $P(7{,}4 < X < 9{,}5) = \frac{9{,}5 - 7{,}4}{3} = 0{,}70$
- c) $P(X \ge 8{,}5) = \frac{10 - 8{,}5}{3} = 0{,}50$

**En InfoStat:** **Uniforme (a,b)** con $a = 7$, $b = 10$. Para b): Prob $(X \le 9{,}5) = 0{,}833$ y Prob $(X \le 7{,}4) = 0{,}133$; la diferencia es $0{,}70$.
:::
:::

::: ejercicio 6.26 · Consumo de agua
El gasto mensual de agua (m³) de una familia es exponencial con $\mu = 10$. Probabilidad de que consuma: a) menos de 3 m³ · b) más de 40 m³.

::: solucion
$\lambda = \frac{1}{10} = 0{,}10$.

- a) $P(X < 3) = 1 - e^{-0{,}10 \cdot 3} = 1 - e^{-0{,}3} = 1 - 0{,}7408 = 0{,}2592$
- b) $P(X > 40) = e^{-0{,}10 \cdot 40} = e^{-4} = 0{,}0183$

**En InfoStat:** **Exponencial (lambda)** con $\lambda = 0{,}1$ → Prob $(X \le 3)$ y Prob $(X > 40)$.
:::
:::

::: ejercicio 6.27 · Reparación de autobuses
El kilometraje (en miles de km) hasta la reparación del motor es exponencial con $\mu = 80$.

a) En una flota de 300 autobuses, ¿cuántos se espera que se reparen antes de los 60.000 km?
b) ¿Probabilidad de que un autobús recorra más de 100.000 km sin reparación?

::: solucion
$\lambda = \frac{1}{80} = 0{,}0125$ (en miles de km).

- a) $P(X < 60) = 1 - e^{-60/80} = 1 - e^{-0{,}75} = 0{,}5276 \then 300 \cdot 0{,}5276 = 158{,}3 \approx 158$ autobuses.
- b) $P(X > 100) = e^{-100/80} = e^{-1{,}25} = 0{,}2865$.
:::
:::

::: ejercicio 6.28 · Espera en un centro de atención
El tiempo de espera para ser atendido es exponencial con $\mu = 5$ minutos. Probabilidad de esperar: a) a lo sumo 5 min · b) al menos 10 min · c) entre 3 y 10 min.

::: solucion
- a) $1 - e^{-5/5} = 1 - e^{-1} = 0{,}6321$
- b) $e^{-10/5} = e^{-2} = 0{,}1353$
- c) $e^{-3/5} - e^{-10/5} = 0{,}5488 - 0{,}1353 = 0{,}4135$
:::
:::

::: ejercicio 6.35 · Marcapasos (sale en parciales)
La vida de un marcapasos es exponencial con media 16 años. ¿Probabilidad de que haya que reemplazarlo antes de los 20 años? ¿Y después de los 30?

::: solucion
- $P(X < 20) = 1 - e^{-20/16} = 1 - e^{-1{,}25} = 0{,}7135$
- $P(X > 30) = e^{-30/16} = e^{-1{,}875} = 0{,}1534$

::: aclaracion
En el parcial de Sistemas de 2020 se preguntó: "si el marcapasos lleva funcionando bien 5 años, ¿probabilidad de cambiarlo antes de los 25?". La exponencial **no tiene memoria**: haber durado 5 años no cambia lo que falta, así que es la probabilidad de fallar en los próximos 20 años, $1 - e^{-20/16} = 0{,}7135$. Esta propiedad no está en el apunte teórico.
:::
:::
:::
