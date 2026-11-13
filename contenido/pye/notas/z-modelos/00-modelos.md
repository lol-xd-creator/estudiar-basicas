# Modelos de parcial

Cuatro parciales modelo armados a partir de los parciales viejos de la carpeta `modelosParcial`. Cada uno junta **teoría y práctica**, como se toma ahora, con lo que se repite en todos.

- [[Modelo 1]]
- [[Modelo 2]]
- [[Modelo 3]]
- [[Modelo 4]]

::: tip Cómo usarlos
- **Teoría**: son preguntas interactivas. Elegí una opción y se corrige sola, con la explicación.
- **Práctica**: resolvé en papel (o con InfoStat) y después abrí **Solución**. Cuando el ejercicio se hace con InfoStat, la solución trae los pasos del programa.
- Tomate el tiempo: los parciales de Moodle duraban **alrededor de una hora**.
:::

## De dónde salen

| Material | Año | Carrera / curso | Qué tiene |
|---|---|---|---|
| `PYE-SegundoParcial-TeoYPrac 1.pdf` (capturas) | **2020** (recuperatorio del 17/11/2020) | **Ing. en Sistemas, 2K07** (también aparece "Parcial 2k7 - 2k4") | 2.º parcial teórico y práctico, recuperatorio y "Evaluación de Complemento para la Aprobación Directa" |
| `Parcial 2_ Revisión del intento*.pdf`, `Revisión-2doParcial.pdf` | 2021 (25/06/2021) | curso "2021-2V1-1-204"; no dice la carrera | 7 intentos del parcial 2 (12 preguntas, 20 puntos) |
| `Recuperatorio*.pdf`, `revision_2dorecupDiChiazza.pdf` | 2021 (02/07/2021) | mismo curso | recuperatorio del parcial 2 |
| `Segundo Parcial_ Revisión del intento (1).pdf` | 2020 (01/09/2020) | curso "IE_PyE_2R3"; no dice la carrera | segundo parcial |
| `E4110295-….pdf` | 2021 (25/06/2021) | curso "2021-2V1-1-204" | otro intento del parcial 2 |

Se priorizó lo de **Sistemas 2K07**. Los de 2021 sirven igual, porque la parte de muestreo, estimación y dócima es la misma.

::: ojo Lo que quedó afuera
- **Correlación y regresión, análisis de varianza (ANOVA) y control estadístico de procesos** aparecen en todos los parciales de 2021, pero **no están en las unidades 6 a 9** del programa actual. No los incluí.
- En el 2.º parcial de Sistemas de **2020** también entraban **probabilidad, probabilidad condicional y modelos discretos** (binomial, Poisson, hipergeométrico): era otro programa. Quedaron solo cuando se usan con la normal (aproximaciones).
:::

## Qué tienen siempre

### Formato

Los de Moodle 2021 tienen **12 preguntas y 20 puntos**: **8 de teoría** de 1 punto (verdadero o falso, u opción múltiple) y **4 prácticas** de 3 puntos. El práctico de Sistemas 2020 tiene ejercicios con varios incisos y respuestas numéricas ("introduzca solo el valor numérico, con 2 o 4 decimales"). Los modelos de acá siguen ese formato: **8 de teoría + 4 prácticos = 20 puntos**.

### Contenidos que se repiten

| Tema | Cómo aparece | En cuántos |
|---|---|---|
| **Definición y propiedades de los estimadores** | V/F "un estimador es un valor que se calcula con datos poblacionales/muestrales…"; opción múltiple insesgado / eficiente / suficiente / consistente | todos |
| **Distribución de la media muestral y TCL** | V/F sobre $E(\bar x) = \mu$, $\sigma^2_{\bar x} = \frac{\sigma^2}{n}$, enunciado del TCL | casi todos |
| **Técnicas de muestreo** | sistemático ($k = N/n$), afijación óptima ($\sigma$ de cada estrato), razones para muestrear | casi todos |
| **Errores y potencia** | V/F sobre error tipo I, potencia, nivel de significación, dócima uniformemente más potente, curva de potencia | todos |
| **Normal** (práctico) | probabilidades, hallar $K$ o un valor para un porcentaje, $P(\lvert X - \mu\rvert \ge c)$ | todos los de Sistemas |
| **Otros continuos y aproximaciones** (práctico) | uniforme, exponencial; binomial o Poisson con la normal | todos los de Sistemas |
| **Intervalo de confianza para $\mu$** (práctico) | con datos o tabla de frecuencias, 95 % o 99 %, $t$ con $n-1$ | casi todos |
| **Intervalo o dócima con $\chi^2$** (práctico) | intervalo para $\sigma$; dócima "la varianza es menor a…" | todos los de 2021 |
| **Dócima para la media** (práctico) | "la empresa asegura que…", $z$ o $t$, decisión en términos del problema | todos |
| **Proporción y tamaño de muestra** | $E(\hat P) = P$, intervalo para $P$, qué hace falta para calcular $n$ | Sistemas 2020 |

::: aclaracion
El **intervalo para $\sigma$** y la **dócima para la varianza** con $\chi^2$ salen en todos los parciales de 2021, pero el apunte teórico de la cátedra solo los menciona. Los incluí en los modelos 3 y 4 con la fórmula y la solución completa, porque usan la $\chi^2$ que sí está en la unidad 6.
:::

## InfoStat: dónde está cada cosa

::: claves
| Para… | Menú |
|---|---|
| Probabilidades y valores de **normal, $t$, $\chi^2$, exponencial, uniforme** | **Estadísticas → Probabilidades y cuantiles**. La normal se carga con **media y varianza** (no desviación). Con el valor de $x$ da la probabilidad acumulada; con la probabilidad da el valor. |
| **Intervalo de confianza** (media, varianza, proporción) | Cargar los datos en una columna → **Estadísticas → Inferencia basada en una muestra → Intervalos de confianza** → elegir *Bilateral*, la *Confianza* y el parámetro (para la proporción, el valor que es "éxito"). |
| **Dócima para la media** | **Estadísticas → Inferencia basada en una muestra → Prueba t para una media** → valor de $H_0$ y tipo de prueba (bilateral, unilateral derecha o izquierda). Decide con el **p-valor**: si $p < \alpha$, se rechaza $H_0$. |
| **Medidas resumen** ($n$, $\bar x$, $\hat s^2$ = "Var(n-1)") | **Estadísticas → Medidas resumen** |
| **Punto crítico, $\beta$ y potencia** | **Aplicaciones → Didácticas → Gráficos de funciones de densidad continuas** → Normal con media $\mu_0$ y **varianza de la media** $\frac{\sigma^2}{n}$, "Mayores o iguales que" (o "Menores…") con $\alpha$ → da el punto crítico. **Clonar** el gráfico, cambiar la media por $\mu_1$ y marcar **Complementario** → da $\beta$ y $1-\beta$. |
:::
