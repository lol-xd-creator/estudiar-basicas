# P8.4 Intervalo de confianza para la proporción

*Guía, unidad 8: ejercicios 6 y 14 (el 19 y el 23 son del mismo tipo; Garibaldi y Rimoldi resuelven el 6).*

::: ejercicio 8.6 · Estaciones de servicio
De 8000 estaciones, en una muestra de 200, 90 venden un aceite con publicidad nacional.

a) Intervalo del 95 % para la proporción, con conclusión. b) Intervalo del 99 %. c) ¿Por qué cambia la amplitud? d) Interpretá "Estimación" y "E.E." en la salida de InfoStat:

| Variable | Parámetro | Estimación | E.E. | n | LI(95%) | LS(95%) |
|---|---|---|---|---|---|---|
| Comercializan | Proporción (=1) | 0,450 | 0,035 | 200 | 0,381 | 0,519 |

::: solucion
$\hat P = \frac{90}{200} = 0{,}45$; $\ \hat\sigma_{\hat P} = \sqrt{\frac{0{,}45 \cdot 0{,}55}{200}} = 0{,}035$. ($n = 200$ es el 2,5 % de 8000: sin factor de corrección.)

**a)** $e = 1{,}96 \cdot 0{,}035 = 0{,}069 \then [0{,}381;\ 0{,}519]$. Con un 95 % de confianza, entre el 38,1 % y el 51,9 % de las estaciones venden ese aceite. El error es a lo sumo 0,069.

**b)** $e = 2{,}576 \cdot 0{,}035 = 0{,}091 \then [0{,}359;\ 0{,}541]$.

**c)** Con la misma muestra, **más confianza da un intervalo más ancho**, o sea, menos precisión.

**d)** *Estimación* $0{,}45 = \frac{90}{200}$ es la estimación puntual. *E.E.* $0{,}035$ es el error estándar estimado de $\hat P$, $\sqrt{\hat P(1-\hat P)/n}$.

**En InfoStat:** Archivo → Nueva tabla → en una columna, **110 ceros y 90 unos** → Datos → Acciones sobre columnas → Editar etiqueta ("Comercializan") → Estadísticas → Inferencia basada en una muestra → Intervalos de confianza → **Proporción**, Estimación paramétrica, Bilateral, **Éxitos valores = 1**, confianza 99 → Aceptar.
:::
:::

::: ejercicio 8.14 · Audiencia de un programa cultural
a) ¿Cuál es la población? b) Antes, el 30 % escuchaba el programa. ¿Cuántos oyentes hay que consultar con riesgo del 5 % y error máximo $0{,}05$? c) De esos oyentes, 100 escuchan el programa. Intervalo del 95 % para la proporción.

::: solucion
**a)** Los oyentes de la radio, divididos en los que escuchan el programa cultural (éxito) y los que no: una población **dicotómica**.

**b)** $n \ge \frac{1{,}96^2 \cdot 0{,}3 \cdot 0{,}7}{0{,}05^2} = 322{,}7 \then n = 323$.

**c)** $\hat P = \frac{100}{323} = 0{,}31$:
$$
e = 1{,}96\sqrt{\frac{0{,}31 \cdot 0{,}69}{323}} = 0{,}05 \qquad 0{,}26 \le P \le 0{,}36
$$
Como $n$ se calculó para un error de $0{,}05$, el error obtenido es justamente ese.
:::
:::
