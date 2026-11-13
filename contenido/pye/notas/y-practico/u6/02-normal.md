# P6.2 Normal: probabilidades, valores y cantidades

*Guía, unidad 6: ejercicios 5, 9, 10, 11, 12, 13, 14 y 33. Son los que más salen en los parciales y los que resuelven Rimoldi y Stefanich en clase.*

::: tip Pasos
1. Identificar $\mu$ y $\sigma$ (si dan la varianza, sacar la raíz).
2. Escribir la probabilidad pedida con $x$.
3. Estandarizar: $z = \frac{x - \mu}{\sigma}$.
4. Resolver con la tabla (complemento, simetría o resta).
5. Si piden **cuántos**: multiplicar por el total. Si piden **un valor**: $x = \mu + z\sigma$.
:::

::: ejercicio 6.5 · $X \sim N(80;\ 10)$
Calculá con la tabla: a) $P(X < 100)$ · b) $P(X < 80)$ · c) $P(65 < X < 100)$ · d) $P(70 < X)$ · e) $P(85 < X < 95)$ · f) $P(\lvert X - 80\rvert < 10)$.

::: solucion
- a) $P(z < 2) = 0{,}9772$
- b) $P(z < 0) = 0{,}5$ (es la media)
- c) $P(-1{,}5 < z < 2) = 0{,}9772 - 0{,}0668 = 0{,}9104$
- d) $P(z > -1) = P(z < 1) = 0{,}8413$
- e) $P(0{,}5 < z < 1{,}5) = 0{,}9332 - 0{,}6915 = 0{,}2417$
- f) $\lvert X - 80\rvert < 10 \sii 70 < X < 90 \sii -1 < z < 1$: $\ 0{,}8413 - 0{,}1587 = 0{,}6826$

::: aclaracion
En la guía, c) aparece como $P(1{,}5 < z < 2) = 0{,}044$: se perdió el signo de $z = \frac{65 - 80}{10} = -1{,}5$. Lo correcto es $P(-1{,}5 < z < 2) = 0{,}9104$.
:::

**En InfoStat:** Normal con media 80 y **varianza 100**. Por ejemplo, para c): Prob $(X \le 100)$ − Prob $(X \le 65)$.
:::
:::

::: ejercicio 6.11 · Días de internación
La permanencia hospitalaria es normal con media 60 días y desviación 15. Probabilidad de una internación: a) mayor que 50 días · b) menor que 30 · c) entre 30 y 60 · d) más de 90.

::: solucion
$X \sim N(60;\ 15)$.

- a) $P(z > \frac{50-60}{15}) = P(z > -0{,}67) = P(z < 0{,}67) = 0{,}7486$
- b) $P(z < -2) = 0{,}0228$
- c) $P(-2 < z < 0) = 0{,}5 - 0{,}0228 = 0{,}4772$
- d) $P(z > 2) = 0{,}0228$

(La guía da a) $0{,}7475$, que es el valor exacto de InfoStat con $z = -0{,}6667$; con la tabla y $z = -0{,}67$ da $0{,}7486$.)

**En InfoStat:** Normal con media 60 y varianza 225.
:::
:::

::: ejercicio 6.9 y 6.10 · Vida útil de llantas
La vida útil de unas llantas es normal con media 38.000 km y desviación 3.000 km.

a) ¿Probabilidad de que dure como mínimo 35.000 km? · b) ¿Más de 45.000 km?
c) Se piden 500 llantas: ¿aproximadamente cuántas durarán entre 40.000 y 45.000 km? · d) ¿Cuántas más de 40.000 km?

::: solucion
- a) $P(z \ge -1) = 0{,}8413$
- b) $P(z > 2{,}33) = 1 - 0{,}9901 = 0{,}0099$
- c) $P(0{,}67 < z < 2{,}33) = 0{,}9901 - 0{,}7486 = 0{,}2415 \then 500 \cdot 0{,}2415 \approx 121$ llantas
- d) $P(z > 0{,}67) = 0{,}2514 \then 500 \cdot 0{,}2514 \approx 126$ llantas

::: ojo
"Cuántos" siempre es **total $\times$ probabilidad**, y se redondea a un entero.
:::

**En InfoStat:** Normal con media 38000 y varianza 9.000.000. (Con InfoStat, b) da $0{,}0098$ y c) $0{,}2427$, porque no redondea $z$.)
:::
:::

::: ejercicio 6.12 y 6.13 · Porcentajes y cantidades
a) Para un puesto hay que sacar al menos 500 en una prueba. Las notas son normales con media 485 y desviación 30. ¿Qué porcentaje pasa?
b) Las 7200 firmas de alimentación de una provincia tienen en promedio 23 empleados, con desviación 5 (normal). ¿Cuántas tienen menos de 15?

::: solucion
- a) $P(X \ge 500) = P(z \ge 0{,}5) = 1 - 0{,}6915 = 0{,}3085$ → el **30,85 %**.
- b) $P(X < 15) = P(z < -1{,}6) = 0{,}0548 \then 7200 \cdot 0{,}0548 = 394{,}6 \approx 395$ firmas.
:::
:::

::: ejercicio 6.14 · $X \sim N(60;\ 4)$
a) Probabilidad de valores menores que 52.
b) Probabilidad de que $X$ difiera del promedio en no más de 1,62 desviaciones.
c) El valor que está 1,27 desviaciones por debajo de la media.

::: solucion
- a) $P(z < \frac{52-60}{4}) = P(z < -2) = 0{,}0228$
- b) $P(\lvert X - \mu\rvert \le 1{,}62\sigma) = P(-1{,}62 \le z \le 1{,}62) = 0{,}9474 - 0{,}0526 = 0{,}8948$
- c) $x = \mu - 1{,}27\sigma = 60 - 1{,}27 \cdot 4 = 54{,}92$

::: ojo
En b) no hace falta $\mu$ ni $\sigma$: "a menos de $k$ desviaciones" es directamente $-k < z < k$.
:::
:::
:::

::: ejercicio 6.33 · Latas de gaseosa (sale en parciales)
Una máquina llena latas con media 34 cl y desviación 1,5 cl (normal).

a) Se desechan las latas con menos de 33 cl: ¿qué proporción se desecha?
b) ¿A qué media hay que ajustar la máquina para que solo el 1 % tenga menos de 33 cl?

::: solucion
- a) $P(X < 33) = P(z < -0{,}67) = 0{,}2514$ (InfoStat: $0{,}2525$).
- b) $P(z < z_0) = 0{,}01 \then z_0 = -2{,}33$:
$$
-2{,}33 = \frac{33 - \mu}{1{,}5} \then \mu = 33 + 2{,}33 \cdot 1{,}5 = 36{,}495 \approx 36{,}49 \text{ cl}
$$

**En InfoStat:** a) Normal (34; 2,25) → Prob $(X \le 33)$. b) Normal (0; 1) → Prob $(X \le x) = 0{,}01$ → $z = -2{,}326$, y se despeja $\mu$ a mano.

Este ejercicio aparece completo, con dos incisos más (binomial y aproximación normal), en [[Modelo 3]].
:::
:::
