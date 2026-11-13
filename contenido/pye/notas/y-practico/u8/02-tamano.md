# P8.2 Tamaño de la muestra

*Guía, unidad 8: ejercicios 2, 3, 10, 4 y 5 (también 14 b, 20 y 21; Garibaldi resuelve el 20 y el 21).*

::: tip Riesgo y confianza
Te pueden dar el **riesgo** $\alpha$ en lugar de la confianza: riesgo 2 % → confianza 98 % → $z = 2{,}326$; riesgo 4,55 % → $z = 2$; riesgo 1 % → $z = 2{,}576$.
:::

::: ejercicio 8.2 · Tamaño para una media (con InfoStat)
$X$ es normal con varianza 310. Se quiere estimar su promedio con un **riesgo del 2 %**.

a) ¿Cuántos elementos hacen falta si el error máximo es 3,5?
b) Escribí la expresión del riesgo para un error máximo de 2,5.

::: solucion
**a)** Riesgo 2 % → $z_{0{,}99} = 2{,}326$:
$$
n \ge \frac{2{,}326^2 \cdot 310}{3{,}5^2} = \frac{1677{,}2}{12{,}25} = 136{,}9 \then n = 137
$$

**b)** $P(\lvert\bar x - \mu\rvert > 2{,}5) = 0{,}02$: la probabilidad de que el error **supere** 2,5 es el riesgo.

**En InfoStat:** Estadísticas → **Cálculo del tamaño muestral** → *Para estimar una media con una precisión deseada* → confianza **98**, **amplitud del intervalo $7$** ($= 2 \times 3{,}5$), **cota superior para la varianza 310** → Enter.
:::
:::

::: ejercicio 8.3 y 8.10 · Tamaño para una media
a) Gasto en alimentos de las familias: riesgo 4,55 %, $\sigma = \$287$. ¿Qué $n$ hace falta si el error máximo es \$20? ¿Y si es \$35? ¿Por qué cambia?
b) Peso de recién nacidos de madres fumadoras: error máximo 25 g, riesgo 5 %, $\sigma = 196$ g. ¿Qué $n$ hace falta?

::: solucion
**a)** Riesgo 4,55 % → confianza 95,45 % → $z = 2$:
$$
n \ge \frac{2^2 \cdot 287^2}{20^2} = 823{,}7 \then 824 \qquad
n \ge \frac{2^2 \cdot 287^2}{35^2} = 268{,}96 \then 269
$$
Con un error permitido mayor hace falta **menos información** (menos observaciones), con el mismo riesgo y la misma $\sigma$.

**b)** $n \ge \frac{1{,}96^2 \cdot 196^2}{25^2} = 236{,}1 \then n = 237$.
:::
:::

::: ejercicio 8.4 · Cuota de mercado (tamaño para una proporción)
Una empresa quiere estimar la proporción de consumidores que compran su marca, con **riesgo del 1 %** y error máximo $0{,}02$.

a) ¿Cuántos consumidores hacen falta como mínimo?
b) ¿Y si se sabe que hay otras 3 marcas con cuotas parecidas?
c) ¿Por qué cambia? d) Expresión del riesgo.

::: solucion
Riesgo 1 % → $z = 2{,}576$.

- a) Sin información, $P = 0{,}5$: $n \ge \frac{2{,}576^2 \cdot 0{,}25}{0{,}02^2} = 4147{,}4 \then 4148$.
- b) Cuatro marcas parecidas → $P \approx 0{,}25$: $n \ge \frac{2{,}576^2 \cdot 0{,}25 \cdot 0{,}75}{0{,}0004} = 3110{,}5 \then 3111$.
- c) $P(1-P)$ es máximo en $0{,}5$. Con información previa ($P = 0{,}25$) se necesita una muestra más chica.
- d) $P(\lvert\hat P - P\rvert > 0{,}02) = 0{,}01$.

(La guía da 4145 y 3109 porque usa $z = 2{,}575$.)

**En InfoStat:** Cálculo del tamaño muestral → *Para estimar una proporción* → confianza 99, **amplitud 4** (%, es $2 \times 0{,}02$), proporción $0{,}25$.
:::
:::

::: ejercicio 8.5 · Revista de un cable
Se quiere estimar la proporción de clientes que comprarán la revista, con 5 % de riesgo y error máximo $0{,}05$. a) ¿Qué $n$ hace falta? b) ¿Y si en otras ciudades la compra el 30 %?

::: solucion
- a) $n \ge \frac{1{,}96^2 \cdot 0{,}25}{0{,}05^2} = 384{,}2 \then 385$
- b) $n \ge \frac{1{,}96^2 \cdot 0{,}3 \cdot 0{,}7}{0{,}0025} = 322{,}7 \then 323$

Riesgo: $P(\lvert\hat P - P\rvert > 0{,}05) = 0{,}05$.
:::
:::
