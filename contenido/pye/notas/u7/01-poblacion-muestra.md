# 7.1 Población, muestra y razones para muestrear

::: ppt Población, muestra y muestreo (Garibaldi)
- **Población**: la totalidad de elementos sobre los cuales se desea información.
- **Muestra**: una porción de la población que se usa para sacar conclusiones válidas para toda la población. **Cualquier** subconjunto de la población es una muestra de ella.
- **Muestreo**: el procedimiento con que se selecciona la muestra.
- **Muestra representativa**: reúne las características principales de la población respecto de lo que se estudia. Es **requisito** para generalizar. Lo que más importa al extraerla es **el sistema de muestreo y el tamaño de la muestra**.
:::

El apunte agrega que una población estadística queda definida por los individuos **y** la característica que se mide (los alumnos de un curso, junto con su peso o su edad).

::: ppt Parámetro, estimador y error de muestreo (Rimoldi y Garibaldi)
- **Parámetro**: medida obtenida con datos de **toda la población** ($\mu$, $\sigma^2$, $\sigma$, $P$). Es un número fijo, en general desconocido.
- **Estimador** (estadístico): medida obtenida con datos de una **muestra** ($\bar x$, $\hat s^2$, $\hat s$, $\hat P$). Varía según la muestra: es una **variable aleatoria**.
- **Estimación puntual**: el valor del estimador en una muestra determinada.
- **Error de muestreo** (o de estimación): la diferencia entre la estimación y el parámetro, $\lvert\bar x - \mu\rvert$.
:::

::: ejemplo Remuestreo con InfoStat (Rimoldi)
De un lote de 36 artículos con precio medio $\mu = 137{,}90$ se sacaron 3 muestras de 5 (Aplicaciones → Didácticas → Remuestreo, semilla 2). Las medias fueron $130{,}84$, $138{,}52$ y $139{,}88$.

Cada muestra da una media distinta (la media muestral es una variable aleatoria), y la diferencia con $137{,}90$ es el **error de muestreo**.
:::

## Razones para muestrear

::: ppt Razones (Garibaldi)
- **Mayor exactitud**: el resultado es más exacto con una muestra que con un censo, porque en el censo los **errores de observación** son mayores, mientras que los **errores de muestreo** se pueden reducir o controlar con técnicas apropiadas.
- **Costo**: una muestra suele ser más barata y puede dar resultados de mucha calidad.
- **Tiempo**: cuando la rapidez es crucial, la muestra da información oportuna.
- **Pruebas destructivas**: a veces estudiar toda la población la destruye (medir la duración de todos los tubos que fabrica una empresa).
:::

::: libro Errores de observación y de estimación (apunte)
- **De observación** (o ajenos al muestreo): falta de respuesta, errores de medición, errores al tomar, codificar o tabular el dato. Aparecen en censos y muestras.
- **De estimación** (o de muestreo): aparecen por trabajar con una parte; en un censo desaparecen. La estadística los puede **medir**; a los de observación, no.

Además, a veces el muestreo es la única opción: poblaciones infinitas o inaccesibles.
:::

::: libro Base teórica del muestreo y diseño de la muestra (apunte)
- **Diversidad**: los elementos varían entre sí, pero dentro de límites; por eso una muestra relativamente chica y al azar puede reflejar la población.
- **Regularidad**: los valores tienden a agruparse alrededor de un valor central; por eso una muestra grande difiere poco de la población. Los promedios son más estables que los valores individuales.
- **Diseño de la muestra**: definir la población (elementos, lugar y tiempo), el **marco muestral** (el listado de las unidades, sin duplicados ni faltantes), el tamaño y el estimador.
:::

::: pregunta El promedio de saldos de **todas** las cuentas de un banco es:
- [x] un parámetro
- [ ] un estimador
- [ ] una variable aleatoria
::: solucion Explicación
Se calcula con toda la población: es un parámetro, un valor fijo. El promedio de una muestra de cuentas sería un estimador.
:::
:::

::: pregunta ¿Cuáles son razones por las que se trabaja con muestras?
- [ ] Datos simples, datos repetidos
- [x] Costo, tiempo, pruebas destructivas
- [ ] Datos sensibles, censo
::: solucion Explicación
Es una pregunta de los parciales de 2021. Garibaldi agrega la **mayor exactitud**.
:::
:::
