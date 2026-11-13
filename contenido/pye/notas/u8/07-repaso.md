# 8.7 Repaso de la unidad 8

*Primero intentá responder sin mirar; después abrí la respuesta.*

## Teoría

::: ejercicio Diferencia entre estimador y estimación.
::: respuesta
El estimador es la fórmula o método ($\bar x$); como depende de la muestra, es una variable aleatoria. La estimación es el valor que toma en una muestra concreta ($\bar x = 15$).
:::
:::

::: ejercicio Enumerá y definí las propiedades de un buen estimador.
::: respuesta
- **Insesgabilidad**: $E(\hat\theta) = \theta$.
- **Eficiencia**: tiene la menor varianza (entre insesgados).
- **Consistencia**: con muestras grandes su valor se acerca al del parámetro.
- **Suficiencia**: usa toda la información de la muestra.
:::
:::

::: ejercicio ¿Qué es el riesgo en una estimación y cómo se escribe?
::: respuesta
La probabilidad de que el error supere el máximo aceptado: $\alpha = P(\lvert\bar x - \mu\rvert > e)$. La confianza es su complemento, $1 - \alpha = P(\lvert\bar x - \mu\rvert \le e)$.
:::
:::

::: ejercicio ¿Cuál es la limitación de la estimación puntual?
::: respuesta
No informa sobre la precisión, es decir, sobre la magnitud del error de muestreo. Casi seguro la estimación no coincide con el parámetro, y no se sabe por cuánto. El intervalo de confianza resuelve eso.
:::
:::

::: ejercicio Interpretá correctamente "intervalo de confianza del 95 %".
::: respuesta
Si se toman muchas muestras y con cada una se construye el intervalo, el 95 % de los intervalos contiene al parámetro. No es la probabilidad de que $\mu$ esté en **este** intervalo: $\mu$ es fijo y el intervalo ya está calculado. Hay un riesgo del 5 % de que el intervalo obtenido sea uno de los que no lo contienen.
:::
:::

::: ejercicio ¿Cómo se relacionan confianza, amplitud y tamaño de muestra?
::: respuesta
Más confianza $\then$ $z$ más grande $\then$ intervalo más ancho (menos preciso). Con $n$ fijo, solo se angosta aceptando más riesgo. Para tener las dos cosas (angosto y confiable) hay que aumentar $n$ o reducir la variabilidad.
:::
:::

::: ejercicio ¿Cuándo se usa $t$ de Student para estimar $\mu$?
::: respuesta
Cuando la población es normal, $\sigma$ es desconocida y $n < 30$. Se usa $\hat s$ y $n-1$ grados de libertad. Si $n \ge 30$, por el TCL se usa $z$ con $\hat s$.
:::
:::

## Preguntas rápidas

::: pregunta Población normal con $\sigma = 10$, $n = 25$, $\bar x = 80$. Intervalo del 95 % para $\mu$:
- [x] $[76{,}08;\ 83{,}92]$
- [ ] $[60{,}4;\ 99{,}6]$
- [ ] $[79{,}22;\ 80{,}78]$
::: solucion Explicación
$e = 1{,}96 \cdot \frac{10}{\sqrt{25}} = 3{,}92$. La segunda opción se olvidó de dividir por $\sqrt n$, y la tercera dividió por $n$ en lugar de $\sqrt n$.
:::
:::

::: pregunta Para un intervalo del 90 % con $n = 20$ y $\sigma$ desconocida (población normal), ¿qué valor de tabla se busca?
- [ ] $z_{0{,}90}$
- [ ] $t_{(20);\,0{,}95}$
- [x] $t_{(19);\,0{,}95}$
::: solucion Explicación
$t$ con $n - 1 = 19$ g. l. y probabilidad acumulada $1 - \frac{0{,}10}{2} = 0{,}95$. Da $1{,}729$.
:::
:::

::: pregunta En una muestra de 400, 80 están a favor. ¿Error estándar estimado de $\hat P$?
- [ ] $0{,}2$
- [x] $0{,}02$
- [ ] $0{,}0004$
::: solucion Explicación
$\hat P = 0{,}2$; $\sqrt{\frac{0{,}2 \cdot 0{,}8}{400}} = \sqrt{0{,}0004} = 0{,}02$.
:::
:::

::: pregunta ¿Cuál de estas acciones **angosta** un intervalo de confianza sin aumentar el riesgo?
- [ ] Bajar el nivel de confianza
- [x] Aumentar el tamaño de la muestra
- [ ] Usar $t$ en lugar de $z$
::: solucion Explicación
Bajar la confianza también lo angosta, pero aumenta el riesgo. Aumentar $n$ achica el error estándar $\frac{\sigma}{\sqrt n}$.
:::
:::

::: pregunta Error de 5, $\sigma = 20$, 95 %. ¿Tamaño de muestra?
- [ ] 16
- [x] 62
- [ ] 8
::: solucion Explicación
$n \ge \frac{1{,}96^2 \cdot 400}{25} = 61{,}5 \then 62$ (siempre se redondea para arriba).
:::
:::
