# 7.2 Técnicas de selección de muestras

::: ppt Las dos familias (Garibaldi)
| | No probabilísticas | Probabilísticas |
|---|---|---|
| Cómo se elige | juicio del investigador o conveniencia | con principios de la teoría de probabilidad |
| ¿Se conoce la probabilidad de la muestra? | no | sí |
| ¿Se conoce el error de muestreo y la precisión del estimador? | no | sí |
| ¿Permite inferir a la población? | **no**: dan muestras **sesgadas** | **sí** |

**Sesgo**: favoritismo de alguna etapa de la recolección de datos que beneficia algunos resultados, perjudica otros y desvía las conclusiones.
:::

## Muestreo no probabilístico

::: ppt Juicio, conveniencia y cuotas (Garibaldi)
- **Discrecional o por juicio**: el investigador elige los elementos que cree más representativos. Conviene si conoce estudios anteriores o si la población es chica y conocida. *Ej.:* un jefe de estudios elige a los alumnos que cree más representativos para evaluar a un profesor.
- **Muestra disponible o por conveniencia**: se toman los elementos que están a mano. Es rápido y barato, pero no representativo. *Ej.:* las personas en la cola de un banco.
- **Por cuotas** (muy usado en encuestas de opinión), en tres fases:
  1. **Segmentación**: dividir la población en grupos exhaustivos y excluyentes (sexo, edad, región…).
  2. **Tamaño de cuotas**: cuántos individuos encuestar en cada grupo, en general proporcional a su tamaño.
  3. **Selección**: buscar participantes hasta cubrir las cuotas; acá se aleja del azar (puede ser por conveniencia).
:::

::: libro Problemas del muestreo por cuotas (apunte)
Hace falta conocer de antemano la proporción de cada grupo (por ejemplo, de un censo); si se omite una característica relevante, los resultados pueden ser muy erróneos; y con muchas características hay grupos imposibles de completar (con 4 categorías de edad, 3 de educación y 3 de ingreso hay 36 grupos).
:::

## Muestreo probabilístico

::: ppt Aleatorio simple (irrestricto aleatorio) (Garibaldi)
Es el procedimiento por excelencia, por dos propiedades:
- todas las unidades tienen **la misma oportunidad** de ser elegidas (es insesgado);
- la elección de una unidad **no influye** en la de otra (independencia).

**Pasos:** asignar una etiqueta numérica a cada individuo y elegir las etiquetas con **números aleatorios** (tabla o función). *Ej.:* de 80 pacientes numerados, los números aleatorios 12, 26, 08, 77, … dan la muestra de 10.

Es el **punto de referencia** de todos los demás métodos. Sirve para poblaciones chicas y homogéneas, y exige tener la lista de todos los elementos.
:::

::: ppt Estratificado (Garibaldi y Rimoldi)
Se separa la población en **estratos** que no se superponen y se toma una muestra aleatoria simple de cada uno. Se usa en poblaciones **heterogéneas**.

- Elementos **homogéneos dentro** del estrato (poca variabilidad) y **heterogéneos entre** estratos.
- **Por qué usarlo:** puede dar un **error de estimación menor** que el aleatorio simple del mismo tamaño, puede **reducir el costo** por observación y da estimaciones para cada subgrupo.

| Afijación | Fórmula | Cuándo |
|---|---|---|
| **Igual** | $n_i = \dfrac{n}{r}$ ($r$: cantidad de estratos) | estratos de igual peso y desviaciones parecidas |
| **Proporcional** | $n_i = \dfrac{N_i}{N}\,n$ | cada estrato participa según su tamaño |
| **Óptima (de Neyman)** | $n_i = \dfrac{N_i\,\sigma_i}{\sum N_i\,\sigma_i}\,n$ | desviaciones distintas: **la mejor**, si se tienen los datos |

En la óptima, **a mayor desvío en un estrato, más elementos se toman de él**.
:::

::: ejemplo Afijación con $n = 150$ (Rimoldi)
| Nivel | $N_i$ | $\sigma_i$ | $N_i\sigma_i$ | Igual | Proporcional | Óptima |
|---|---|---|---|---|---|---|
| Bajo | 300 | 2,1 | 630 | 50 | 30 | 29 |
| Medio | 700 | 1,4 | 980 | 50 | 70 | 45 |
| Alto | 500 | 3,3 | 1650 | 50 | 50 | 76 |
| Total | 1500 | | 3260 | 150 | 150 | 150 |

::: solucion Cálculos
Proporcional: $n_1 = \frac{300}{1500}\,150 = 30$. Óptima: $n_3 = \frac{1650}{3260}\,150 = 75{,}9 \approx 76$. El estrato "Medio" es el más grande, pero el menos disperso: la óptima le da menos que la proporcional.
:::
:::

::: ppt Sistemático (Garibaldi y Rimoldi)
Se elige al azar un elemento entre los primeros $k$ y después **uno cada $k$**: es una muestra "de 1 en $k$".

1. **Ordenar** la población (lista) y numerarla de 1 a $N$.
2. **Razón de muestreo**: $k = \dfrac{N}{n}$.
3. Elegir **al azar** el arranque $a$ entre 1 y $k$.
4. Sumar $k$ sucesivamente: $a,\ a+k,\ a+2k, \dots$ hasta completar $n$.

*Ej. (Rimoldi):* $N = 100$, $n = 5$, $k = 20$; si $a = 4$: habitantes 4, 24, 44, 64 y 84.

**Ventajas:** más fácil de hacer en el campo (menos errores de selección) y puede dar más información por unidad de costo. **Desventaja:** si la lista tiene **periodicidad**, los resultados pueden ser deficientes.
:::

::: ppt Por conglomerados (Garibaldi)
La población se divide en grupos **heterogéneos** llamados **conglomerados**; se elige al azar una muestra de conglomerados y se estudian **todos** sus individuos (o una muestra de ellos).

- Interesa que **dentro** de cada conglomerado los individuos sean lo más **heterogéneos** posible: cada conglomerado representa a la población. Suelen tener proximidad física.
- Los conglomerados son las **unidades de muestreo**; las unidades de interés son los individuos.
- **Conviene** cuando no hay (o es muy caro armar) una lista de los elementos pero sí de los conglomerados, y cuando el costo crece con la distancia entre elementos. *Ej.:* las seccionales de una ciudad para un estudio sobre educación.
- **En dos etapas**: una muestra aleatoria de conglomerados y después una muestra aleatoria dentro de cada uno (universidades del país y estudiantes de cada una).
:::

::: ppt Comparación (Garibaldi)
| Técnica | Idea | Situación ideal |
|---|---|---|
| Aleatorio simple | todos con la misma probabilidad | referencia de todos los demás |
| Estratificado | homogéneo dentro, heterogéneo entre | mediciones iguales dentro del estrato y distintas entre estratos; varianza menor que el aleatorio simple |
| Sistemático | uno cada $k$ | cuando el aleatorio simple o el estratificado son muy caros; cuidado con la periodicidad |
| Conglomerados | heterogéneo dentro, parecido entre | conglomerados con mediciones tan distintas como sea posible pero medias iguales; reduce el costo |
:::

::: libro Más del apunte
- **Fiabilidad** (precisión, ligada a la varianza del estadístico) y **efectividad** (la misma fiabilidad al menor costo) para comparar diseños.
- Ejemplo de estratificado: la edad media de 50 alumnos en dos estratos se estima con el promedio ponderado $\bar x = \frac{\sum N_i\bar x_i}{\sum N_i} = \frac{30 \cdot 20{,}7 + 20 \cdot 25{,}5}{50} = 22{,}62$.
- Conglomerados en etapas múltiples; muestreo por áreas: para la misma precisión hace falta una muestra más grande que en el aleatorio simple.
- Si la muestra tiene que ser muy chica por costo, puede preferirse una muestra de criterio; para alta precisión y objetividad, una probabilística.
:::

::: pregunta Una población está dividida en tres niveles de ingreso con desviaciones muy distintas. ¿Qué afijación conviene?
- [ ] Igual
- [ ] Proporcional
- [x] Óptima de Neyman
::: solucion Explicación
La óptima pondera cada estrato por $N_i\sigma_i$: toma más elementos de los estratos más grandes y más dispersos. Para calcularla hace falta la desviación **de cada estrato**.
:::
:::

::: pregunta En el muestreo por conglomerados, ¿cómo deberían ser los individuos dentro de cada conglomerado?
- [ ] Lo más parecidos posible
- [x] Lo más heterogéneos posible, para que cada conglomerado represente a la población
- [ ] Da igual
::: solucion Explicación
Es al revés que en los estratos: heterogéneo **dentro** y parecido **entre** conglomerados.
:::
:::

::: pregunta ¿Cuál es la principal desventaja del muestreo sistemático?
- [ ] No usa el azar
- [x] Si la lista tiene periodicidad, puede dar resultados deficientes
- [ ] Necesita conocer las desviaciones de cada grupo
::: solucion Explicación
El arranque es al azar, pero si la población se repite cada $k$ elementos, siempre se toman los del mismo tipo.
:::
:::
