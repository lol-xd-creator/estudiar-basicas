# 9.1 Hipótesis y lógica de la dócima

::: ppt Hipótesis estadística (Garibaldi y Rimoldi)
- Una **hipótesis estadística** es una aseveración o conjetura sobre **uno o más parámetros** de una o más poblaciones (no sobre un estadístico muestral).
- Su verdad o falsedad nunca se sabe con certeza salvo que se examine toda la población. Se toma una muestra: si la evidencia es **consistente** con la hipótesis, no se la rechaza; si es **inconsistente**, se la rechaza.
- **Aceptar** una hipótesis solo quiere decir que los datos **no dan evidencia suficiente para rechazarla**.
- **$H_0$, hipótesis nula**: la que se pone a prueba. Su rechazo lleva a aceptar **$H_1$, la alternativa**.
:::

::: ppt Cómo plantear $H_0$ y $H_1$ (Garibaldi y Rimoldi)
- **Lo que se quiere demostrar va siempre en $H_1$**. El científico suele querer apoyar una opinión con fuerza, así que busca llegar a ella **rechazando $H_0$**.
- $H_0$ siempre contiene la **igualdad**: $=$, $\le$ o $\ge$.
- $H_0$ y $H_1$ son **complementarias**: entre las dos cubren todos los valores posibles del parámetro.
- **Hipótesis simple**: un valor exacto ($P = 0{,}30$). **Compuesta**: un conjunto de valores ($P \le 0{,}30$).
:::

::: ejemplo Planteos (Garibaldi y Rimoldi)
::: solucion
- "La vida media de las computadoras es de 5 años, pero sospechamos que es menor": $H_0: \mu = 5$, $H_1: \mu < 5$.
- Para mostrar que fumar **aumenta** el riesgo de cáncer: $H_0$ es "no hay aumento del riesgo", y la conclusión se alcanza **rechazándola**.
- "Las bolsas de 100 g de frutos secos en realidad no pesan 100 g": $H_0: \mu = 100$, $H_1: \mu \ne 100$.
- "El 45 % votó al partido A; creemos que ahora es menos": $H_0: P = 0{,}45$, $H_1: P < 0{,}45$.
- "¿Se puede **afirmar** que la nueva redacción del test **aumentó** las respuestas correctas (75 %)?": $H_0: P = 0{,}75$, $H_1: P > 0{,}75$.
:::
:::

::: ppt La lógica: zona de rechazo y punto crítico (Garibaldi y Rimoldi)
Si $H_0$ fuera verdadera ($\mu = \mu_0$), la diferencia entre $\bar x$ y $\mu_0$ debería ser **chica**. Si es demasiado grande, se decide a favor de $H_1$. Para saber si "es grande" se construye un **estadístico** y se fijan:

- **Punto crítico**: el valor que separa las zonas.
- **Zona de rechazo** (región crítica): valores del estimador que difieren **significativamente** de $\mu_0$. Su probabilidad, si $H_0$ es cierta, es $\alpha$.
- **Zona de aceptación** (no rechazo): valores con diferencia **poco significativa**.

Si el estimador cae en la zona de rechazo, se rechaza $H_0$, lo cual significa aceptar $H_1$.
:::

```grafico
titulo: Bajo $H_0$ cierta: zona de aceptación en el centro, zonas de rechazo en las colas
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
-4 <= x <= -1.96, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
1.96 <= x <= 4, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
texto (0, 0.15) "aceptación"
texto (-3, 0.07) "rechazo"
texto (3, 0.07) "rechazo"
texto (0, -0.03) "$\mu_0$"
texto (-1.96, -0.03) "$\bar x_1^*$"
texto (1.96, -0.03) "$\bar x_2^*$"
x: -4..4
grilla: no
aspecto: libre
alto: 220
leyenda: no
```

::: ojo
Para rechazar $H_0$, el que tiene que caer en la zona de rechazo es el **estimador** (o el estadístico) calculado con la muestra, no el parámetro: el parámetro es desconocido. (Pregunta del parcial de Sistemas de 2020.)
:::

::: libro La analogía del juicio y la definición del apunte
El apunte define la dócima como un experimento aleatorio para decidir si $H_0$ (que indica ausencia de cambios o efectos) es verdadera o falsa, midiendo el riesgo de aceptarla siendo falsa o rechazarla siendo cierta.

El razonamiento es el de un tribunal: el acusado es inocente ($H_0$) hasta que las pruebas del fiscal (la muestra) demuestren lo contrario. Si las pruebas no son contundentes, se lo declara inocente (no se rechaza $H_0$). El juez puede equivocarse condenando a un inocente (rechazar $H_0$ cierta) o absolviendo a un culpable (no rechazar $H_0$ falsa).
:::

::: pregunta Una hipótesis estadística es una aseveración o conjetura con respecto a un **estadístico muestral**.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
Es una conjetura sobre un **parámetro** de la población. (Pregunta del parcial de Sistemas de 2020.)
:::
:::

::: pregunta Se quiere **demostrar** que un nuevo proceso reduce el tiempo medio de armado (hoy 40 min). ¿Cómo se plantea?
- [ ] $H_0: \mu < 40$, $H_1: \mu = 40$
- [x] $H_0: \mu = 40$, $H_1: \mu < 40$
- [ ] $H_0: \mu \ne 40$, $H_1: \mu = 40$
::: solucion Explicación
Lo que se quiere demostrar va en $H_1$, y la igualdad en $H_0$.
:::
:::
