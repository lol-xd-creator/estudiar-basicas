# 8.3 Estimación por intervalos y nivel de confianza

::: ppt Intervalo de confianza (Garibaldi)
A veces una estimación puntual no da suficiente información. Un intervalo $LI < \theta < LS$ puede ser más útil y da una "garantía" de cubrir el valor a estimar. Se buscan dos estadísticas $LI$ y $LS$ tales que
$$
P(LI < \theta < LS) = 1 - \alpha
$$
- $LI < \theta < LS$ es el **intervalo de confianza del $(1-\alpha)\,100\,\%$**.
- $1 - \alpha$ es el **coeficiente** o **grado de confianza**.
- $LI$ y $LS$ son los **límites de confianza** inferior y superior. Son **variables aleatorias**, porque dependen de la muestra.
- La **longitud de medio intervalo** (el error $e$) es la **precisión** del estimador.
- Los intervalos están **centrados en la estimación** ($\bar x$), no en el parámetro: **estimación $\pm$ error**.
:::

```grafico
titulo: Nivel de confianza $1-\alpha$ y las dos colas de $\alpha/2$
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
-1.96 <= x <= 1.96, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; azul
texto (0, 0.15) "$1-\alpha$"
texto (-2.6, 0.05) "$\alpha/2$"
texto (2.6, 0.05) "$\alpha/2$"
texto (-1.96, -0.03) "$-z_{\alpha/2}$"
texto (1.96, -0.03) "$z_{\alpha/2}$"
x: -4..4
grilla: no
aspecto: libre
alto: 220
leyenda: no
```

Para el 95 % se busca en la tabla la probabilidad acumulada $0{,}975$ (a la izquierda de $z$): $z = 1{,}96$.

::: ppt Qué significa "95 % de confianza" (Garibaldi y Rimoldi)
Cerca del 95 % de las veces que se calcule el intervalo con una muestra aleatoria, el intervalo contendrá a $\mu$; un 5 % no. "Las veces" son todas las veces que se muestree y se calcule el intervalo. **Confiamos** en que el intervalo obtenido sea uno de los "buenos", pero **no podemos saber** si lo es.

Rimoldi: con 99 %, "99 veces de cada 100 el intervalo calculado contendrá el verdadero valor del parámetro".
:::

::: ojo Lo que NO significa
No es "la probabilidad de que $\mu$ esté entre 14,35 y 15,65 es 0,95". $\mu$ es un número fijo: está o no está adentro. La probabilidad se refiere al **procedimiento**, no a un intervalo ya calculado.
:::

::: ppt Confianza y precisión (Garibaldi y Rimoldi)
- **Más confianza → intervalo más largo** → menos precisión. Si $1-\alpha$ crece, $z$ crece y la longitud crece.
- **Menos confianza → intervalo más corto** → más precisión, pero más riesgo.
- La situación ideal es un intervalo **corto con confianza alta**: para eso hay que **aumentar $n$**.

Longitud $= LS - LI = 2\,z\cdot$(error estándar). En el ejemplo de la nafta: 1,31 con 95 % y 1,71 con 99 %.
:::

::: libro El ejemplo de las cinco posiciones (apunte)
Si se afirma que $\mu$ está entre $\bar x - 3\sigma_{\bar x}$ y $\bar x + 3\sigma_{\bar x}$, la afirmación es correcta siempre que $\bar x$ caiga a menos de $3\sigma_{\bar x}$ de $\mu$, lo que pasa con probabilidad $0{,}997$. Repitiendo con muchas muestras, alrededor del 99,7 % de los intervalos son correctos: eso es un intervalo con nivel de confianza del 99,7 %.

```grafico
titulo: Cinco muestras posibles: solo la que cae a más de $3\sigma_{\bar x}$ de $\mu$ no cubre a $\mu$
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
segmento (0, 0) (0, 0.42) ; punteada
segmento (-3.5, 0.47) (2.5, 0.47) ; azul ; gruesa
(-0.5, 0.47) ; "1.º" ; azul
segmento (-1.8, 0.54) (4.2, 0.54) ; azul ; gruesa
(1.2, 0.54) ; "2.º" ; azul
segmento (-0.6, 0.61) (5.4, 0.61) ; azul ; gruesa
(2.4, 0.61) ; "3.º" ; azul
segmento (-4.8, 0.68) (1.2, 0.68) ; azul ; gruesa
(-1.8, 0.68) ; "4.º" ; azul
segmento (0.5, 0.75) (6.5, 0.75) ; rojo ; gruesa
(3.5, 0.75) ; "5.º" ; rojo
texto (0, -0.04) "$\mu$"
x: -5..7
y: -0.08..0.85
grilla: no
aspecto: libre
alto: 300
leyenda: no
```

El apunte formaliza el intervalo con un estadístico $K(\hat\theta;\theta)$ de distribución tabulada y los coeficientes $K_1$, $K_2$, despejando $\theta$ de $1 - \alpha = P(K_1 \le K \le K_2)$.
:::

::: pregunta Con la misma muestra, se pasa de un intervalo del 95 % a uno del 99 %. El intervalo:
- [ ] se angosta
- [x] se ensancha
- [ ] no cambia
::: solucion Explicación
$z$ pasa de 1,96 a 2,576: el error aumenta. Más confianza cuesta precisión.
:::
:::

::: pregunta Se obtuvo $14{,}35 \le \mu \le 15{,}65$ con 95 %. ¿Cuál es la interpretación correcta?
- [ ] $P(14{,}35 \le \mu \le 15{,}65) = 0{,}95$
- [x] El 95 % de los intervalos construidos así contienen a $\mu$
- [ ] El 95 % de los datos está entre 14,35 y 15,65
::: solucion Explicación
$\mu$ es fijo: la probabilidad se refiere al procedimiento. Y el intervalo es para la media, no para los datos individuales.
:::
:::
