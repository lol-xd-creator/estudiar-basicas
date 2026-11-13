# Modelo 4

*20 puntos · alrededor de 1 hora · tablas normal, $t$ y $\chi^2$ (o InfoStat). Preguntas tomadas o adaptadas de los parciales de Sistemas 2020 y de Moodle 2021.*

## Teoría (1 punto cada una)

::: pregunta En una dócima lateral derecha, si el **valor p** que calcula InfoStat es mayor que el nivel de significación, el valor observado del estadístico pertenece a la zona de **no rechazo**.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$p > \alpha$ quiere decir que el resultado no es tan extremo como para caer en la región crítica: no se rechaza $H_0$. Ver [[9.3 Tipos de dócima y procedimiento]].
:::
:::

::: pregunta Un estimador es un valor que puede calcularse a partir de los datos muestrales y que proporciona información sobre el valor **de la muestra**.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
Se calcula con la muestra, pero da información sobre el **parámetro** de la población. (En Moodle 2021 salieron tres versiones de esta pregunta: con "datos poblacionales", "valor de la muestra" o "valor del parámetro". Solo la última es verdadera.)
:::
:::

::: pregunta Cuando el estimador incluye toda la información relevante de la muestra, de forma que ningún otro estimador puede agregar información, **y su varianza es mínima**, es:
- [ ] Suficiente
- [ ] Insesgado y consistente
- [x] Eficiente y suficiente
- [ ] Consistente
::: solucion Explicación
Toda la información → suficiente. Varianza mínima → eficiente.
:::
:::

::: pregunta Al disminuir $\alpha$ manteniendo el tamaño de muestra:
- [ ] disminuye $\beta$
- [x] aumenta $\beta$ y disminuye la potencia
- [ ] aumenta la potencia
- [ ] no cambia nada, porque $\alpha$ y $\beta$ no son complementarias
::: solucion Explicación
$\alpha$ y $\beta$ varían en sentido inverso (aunque no sean complementarias). La única forma de bajar las dos es aumentar $n$.
:::
:::

::: pregunta En el muestreo por conglomerados, los elementos **dentro** de cada conglomerado deben ser:
- [ ] lo más homogéneos posible
- [x] lo más heterogéneos posible, como una miniatura de la población
- [ ] de un solo estrato
::: solucion Explicación
Es lo opuesto a los estratos: heterogéneo dentro, homogéneo entre conglomerados.
:::
:::

::: pregunta Si se cuadruplica el tamaño de la muestra, el error estándar de la media:
- [ ] se divide por 4
- [x] se divide por 2
- [ ] se duplica
::: solucion Explicación
$\sigma_{\bar x} = \frac{\sigma}{\sqrt n}$ y $\sqrt{4n} = 2\sqrt n$.
:::
:::

::: pregunta En una estimación por intervalos de la proporción poblacional se utiliza:
- [ ] $z = \frac{\hat p - P}{\frac{P(1-P)}{n}}$
- [x] $z = \frac{\hat p - P}{\sqrt{\frac{P(1-P)}{n}}}$
- [ ] $z = \frac{\hat p - P}{\sqrt{P(1-P)}}$
- [ ] $z = \frac{P - \hat p}{n}$
::: solucion Explicación
Se divide por el **error estándar** de $\hat P$ (la raíz). En el intervalo, $P$ se reemplaza por $\hat P$ dentro de la raíz.
:::
:::

::: pregunta Con muestreo **sin** reposición, si $n$ es mayor que el 5 % de $N$, la varianza de $\bar x$ es:
- [ ] $\frac{\sigma^2}{n}$
- [x] $\frac{\sigma^2}{n}\cdot\frac{N-n}{N-1}$
- [ ] $\frac{\sigma}{\sqrt n}\cdot\frac{N-n}{N-1}$
::: solucion Explicación
Lleva el factor de corrección finita. La tercera mezcla la desviación con el factor sin raíz.
:::
:::

## Práctica (3 puntos cada uno)

::: ejercicio Consultas a un centro de soporte (adaptado de Sistemas 2020)
A un centro de soporte llegan en promedio **30 consultas cada 80 minutos** (proceso de Poisson).

a) ¿Probabilidad de que lleguen **más de 40** consultas en 80 minutos?
b) ¿Probabilidad de que lleguen **entre 25 y 30** consultas en 60 minutos?
c) ¿Probabilidad de que pasen **más de 5 minutos** sin ninguna consulta?

::: solucion
**a)** $\lambda = 30 > 20$ → aproximación normal ([[6.6 Aproximación de modelos discretos a la normal]]): $\sigma = \sqrt{30} = 5{,}477$.
$$
P(X > 40) = P\!\left(z > \frac{40 - 30}{5{,}477}\right) = P(z > 1{,}83) = 1 - 0{,}9664 = 0{,}0336
$$

**b)** En 60 minutos: $\lambda = 30 \cdot \frac{60}{80} = 22{,}5 > 20$, $\ \sigma = \sqrt{22{,}5} = 4{,}743$.
::: pasos
P(25 \le X \le 30) = P\!\left(\frac{25 - 22{,}5}{4{,}743} \le z \le \frac{30 - 22{,}5}{4{,}743}\right) = P(0{,}53 \le z \le 1{,}58)
  = 0{,}9429 - 0{,}7019 = 0{,}2410
:::

**c)** El tiempo entre consultas es **exponencial** ([[6.3 Modelo exponencial]]) con $\lambda = \frac{30}{80} = 0{,}375$ por minuto (media $\theta = 2{,}67$ min):
$$
P(T > 5) = e^{-0{,}375 \cdot 5} = e^{-1{,}875} = 0{,}1534
$$

::: ojo
$\lambda$ tiene que estar en la **misma unidad** que lo que se pregunta: por 80 min en a), por 60 min en b) y por minuto en c).
:::

**En InfoStat:** Probabilidades y cuantiles.
- a) y b) **Normal** con media $\lambda$ y **varianza $\lambda$** (en Poisson son iguales). También se puede comparar con **Poisson (lambda)** exacta.
- c) **Exponencial (lambda)** con $\lambda = 0{,}375$ → Prob $(X > 5)$.
:::
:::

::: ejercicio Dócima para la varianza (Moodle 2021)
Una empresa asegura que el tiempo de trabajo real de los operarios tiene una **varianza menor a 25 horas²**. En una muestra de 26 operarios se obtuvo una varianza de 36 horas². Con $\alpha = 0{,}05$, ¿puede ser verdadera la afirmación?

::: solucion
$H_0: \sigma^2 \le 25$ (la afirmación), $H_1: \sigma^2 > 25$. **Lateral derecha** con $\chi^2$ y $n - 1 = 25$ g. l.

$$
\chi^2 = \frac{(n-1)\,s^2}{\sigma_0^2} = \frac{25 \cdot 36}{25} = 36
\qquad
\chi^2_{(25);\,0{,}95} = 37{,}652
$$

$36 < 37{,}652$ → **no se rechaza $H_0$**: se acepta la afirmación de la empresa. Una varianza muestral de 36 no alcanza para decir que la poblacional supera 25.

::: ojo Variante del parcial
Con $n = 20$ (el otro intento): $\chi^2 = \frac{19 \cdot 36}{25} = 27{,}36 < \chi^2_{(19);\,0{,}95} = 30{,}144$ → también se acepta. Las opciones trampa usaban el $\chi^2$ de $\alpha/2$ (36,191 o 40,646, que son de una bilateral) o calculaban $\frac{25 \cdot 25}{36}$.
:::

::: aclaracion
La dócima para la varianza no está desarrollada en el apunte teórico, pero salió en todos los parciales de 2021. Usa la distribución $\frac{(n-1)\hat s^2}{\sigma^2} \sim \chi^2_{n-1}$ de la unidad 7, con el mismo procedimiento que la dócima para la media.
:::

**En InfoStat:** Probabilidades y cuantiles → **Chi cuadrado (v)** con $v = 25$ → Prob $(X > x) = 0{,}05$ → punto crítico $37{,}65$. O con $x = 36$ → Prob $(X > 36) \approx 0{,}07$, que es el valor p ($> 0{,}05$, no se rechaza).
:::
:::

::: ejercicio Dócima para la media con potencia
Una máquina llena paquetes con peso medio de 500 g y $\sigma = 12$ g. Se sospecha que llena **de menos**. En 36 paquetes, $\bar x = 496{,}5$ g. Con $\alpha = 0{,}05$:

a) Planteá y resolvé la dócima.
b) Calculá $\beta$ y la potencia si el peso medio real fuera de 495 g.

::: solucion
**a)** Lo que se sospecha va en $H_1$: $H_0: \mu = 500$, $H_1: \mu < 500$. **Lateral izquierda**, $\sigma$ conocida → normal.

::: pasos
\sigma_{\bar x} = \frac{12}{\sqrt{36}} = 2
\bar x^* = 500 - 1{,}645 \cdot 2 = 496{,}71         // punto crítico
z = \frac{496{,}5 - 500}{2} = -1{,}75 < -1{,}645
:::

$\bar x = 496{,}5 < 496{,}71$ → **se rechaza $H_0$**: hay evidencia de que la máquina llena de menos. Valor p: $P(z < -1{,}75) = 0{,}0401 < 0{,}05$.

**b)** Bajo $\mu_1 = 495$, se rechaza si $\bar x < 496{,}71$:
$$
1 - \beta = P\!\left(z < \frac{496{,}71 - 495}{2}\right) = P(z < 0{,}855) \approx 0{,}804
\qquad
\beta \approx 0{,}196
$$

**En InfoStat:** Aplicaciones → Didácticas → Gráficos de funciones de densidad continuas → Normal con media 500 y **varianza 4** → "Menores o iguales que" con $0{,}05$ → punto crítico $496{,}71$. **Clonar**, cambiar la media a 495 → potencia $\approx 0{,}80$; con **Complementario**, $\beta \approx 0{,}20$.
:::
:::

::: ejercicio Intervalo con muestra grande y tamaño de muestra
En 50 notebooks se midió la duración de la batería: $\bar x = 6{,}2$ h y $\hat s = 1{,}1$ h.

a) Intervalo del 95 % para la duración media.
b) ¿Cuántas notebooks hay que medir para que el error no supere 0,2 h, con el 95 %?

::: solucion
**a)** $\sigma$ desconocida pero $n = 50 \ge 30$ → normal (TCL) con $\hat s$:
$$
e = 1{,}96 \cdot \frac{1{,}1}{\sqrt{50}} = 0{,}305 \qquad \boxed{5{,}90 \le \mu \le 6{,}50}
$$

**b)** Con $\sigma \approx 1{,}1$ (de la muestra piloto):
$$
n \ge \frac{1{,}96^2 \cdot 1{,}1^2}{0{,}2^2} = \frac{4{,}648}{0{,}04} = 116{,}2 \then n = 117
$$

**En InfoStat:** a) con los 50 datos, Intervalos de confianza → Bilateral, 95, Media (InfoStat usa $t$ con 49 g. l., que con $n$ grande da prácticamente lo mismo). b) se calcula con la fórmula; InfoStat también tiene **Estadísticas → Cálculo del tamaño muestral**.
:::
:::
