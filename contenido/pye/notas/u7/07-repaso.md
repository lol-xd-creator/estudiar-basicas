# 7.7 Repaso de la unidad 7

*Primero intentá responder sin mirar; después abrí la respuesta.*

## Teoría

::: ejercicio Diferencia entre parámetro y estadístico.
::: respuesta
El parámetro se calcula con toda la población y es constante (pero desconocido). El estadístico se calcula con una muestra y cambia de una muestra a otra: es una variable aleatoria con su propia distribución por muestreo.
:::
:::

::: ejercicio ¿Por qué una muestra puede ser **más exacta** que un censo?
::: respuesta
Porque en el censo los errores de observación son mayores, mientras que los errores de muestreo se pueden reducir o controlar con técnicas apropiadas (Garibaldi).
:::
:::

::: ejercicio Describí las tres fases del muestreo por cuotas.
::: respuesta
**Segmentación** de la población en grupos exhaustivos y excluyentes; **tamaño de las cuotas** (en general proporcional al tamaño de cada grupo); **selección** de participantes hasta cubrir las cuotas, que no es aleatoria (puede ser por conveniencia).
:::
:::

::: ejercicio ¿Cuáles son los pasos del muestreo sistemático?
::: respuesta
Ordenar la población en una lista; calcular la razón de muestreo $k = \frac{N}{n}$; elegir al azar el arranque entre 1 y $k$; sumar $k$ sucesivamente hasta completar la muestra.
:::
:::

::: ejercicio ¿Qué permite el muestreo probabilístico que el no probabilístico no?
::: respuesta
Conocer la probabilidad de cada muestra, medir el error de muestreo en términos de probabilidad (confianza o riesgo) y la precisión del estimador. Por eso permite hacer inferencias sobre la población.
:::
:::

::: ejercicio Compará estratos y conglomerados.
::: respuesta
**Estratos**: homogéneos dentro, heterogéneos entre sí; se muestrea **en todos** los estratos. Mejora la precisión. **Conglomerados**: heterogéneos dentro (miniaturas de la población), parecidos entre sí; se eligen **algunos** conglomerados al azar. Baja el costo, pero aumenta la varianza.
:::
:::

::: ejercicio ¿Qué es el factor de corrección finita y cuándo se puede omitir?
::: respuesta
$\frac{N-n}{N-1}$, que multiplica la varianza de $\bar x$ o de $\hat P$ en el muestreo sin reposición de poblaciones finitas. Se acerca a 1 cuando $N$ es grande respecto de $n$; se omite si $n \le 5\,\%$ de $N$.
:::
:::

::: ejercicio Enunciá el teorema central del límite.
::: respuesta
Cualquiera sea la población, si tiene varianza finita, $z = \frac{\bar x - \mu}{\sigma/\sqrt n}$ tiende a $N(0;1)$ cuando $n \to \infty$. En la práctica: población normal $\then$ $\bar x$ normal; población no normal y $n \ge 30$ $\then$ $\bar x$ aproximadamente normal, con media $\mu$ y error estándar $\frac{\sigma}{\sqrt n}$.
:::
:::

## Preguntas rápidas

::: pregunta ¿Cuántas muestras de tamaño 3 se pueden sacar **sin reposición** de una población de 5?
- [ ] 125
- [x] 10
- [ ] 15
::: solucion Explicación
$\binom53 = 10$. Con reposición serían $5^3 = 125$.
:::
:::

::: pregunta Se eligen 50 de 500 cuadras tomando una de cada 10, con arranque al azar. Es un muestreo:
- [ ] aleatorio simple
- [x] sistemático
- [ ] por conglomerados
::: solucion Explicación
Razón de muestreo $k = \frac{N}{n} = 10$ y arranque al azar entre las 10 primeras.
:::
:::

::: pregunta $\sigma = 20$, $n = 25$, población infinita. ¿Cuánto vale $\sigma_{\bar x}$?
- [ ] $0{,}8$
- [x] $4$
- [ ] $20$
::: solucion Explicación
$\frac{20}{\sqrt{25}} = 4$.
:::
:::

::: pregunta ¿Cuál de estas afirmaciones es **falsa**?
- [ ] $E(\bar x) = \mu$ con o sin reposición
- [ ] $E(\hat P) = P$ con o sin reposición
- [x] $\sigma_{\bar x}$ es igual con o sin reposición
::: solucion Explicación
Sin reposición se multiplica por $\sqrt{\frac{N-n}{N-1}}$, que es menor que 1: el error estándar es menor.
:::
:::

::: pregunta Entrevistar a quienes hacen cola en un banco es un muestreo:
- [ ] aleatorio simple
- [ ] por cuotas
- [x] de la muestra disponible (por conveniencia)
::: solucion Explicación
Se toma la parte de la población que está a mano. No es probabilístico: no permite inferir.
:::
:::
