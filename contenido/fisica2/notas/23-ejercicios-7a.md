# Trabajo y potencial: ejercicios 7.1 a 7.5

*Clase práctica del 23/06: trabajo en campos eléctricos. Guía de trabajos prácticos, capítulo 7.*

Fórmulas (ver [[Potencial eléctrico y diferencia de potencial]]):

$$
\Delta V = E\,d \ \ \text{(campo uniforme, a lo largo del campo)} \qquad W = q\,\Delta V \qquad V = k_0\sum_i \frac{q_i}{r_i} \qquad U = k_0\sum_{i<j}\frac{q_i\,q_j}{r_{ij}}
$$

## Ejercicio 7.1

::: ejercicio Calcular el trabajo para mover una carga de $2\times10^{-4}\,\text{C}$ del punto $a$ al $d$, con $E = 400\,\text{N/C}$: a) por la trayectoria $ad$; b) por la trayectoria $abcd$
```grafico
placa (-0.5, 4) (5, 4) ; +
placa (-0.5, -0.6) (5, -0.6) ; -
vector (0, 0) (0, 1) ; azul ; ""
vector (0, 1) (2, 3) ; azul ; ""
vector (2, 3) (4, 3) ; azul ; ""
vector (0, 0) (4, 3) ; gris ; ""
(0, 0) ; "$a$"
(0, 1) ; "$b$"
(2, 3) ; "$c$"
(4, 3) ; "$d$"
segmento (4, 0) (4, 3) ; gris ; punteada ; "$3\,\text{cm}$"
segmento (0, 0) (4, 0) ; gris ; punteada ; "$4\,\text{cm}$"
animar: no
x: -0.8..5.3
y: -1..4.4

```

Pista: ¿qué parte del desplazamiento cuenta para el trabajo en un campo uniforme?

::: solucion
**Lo que cuenta es el desplazamiento a lo largo del campo.** El campo es vertical (de la placa $+$ a la $-$); de $a$ a $d$ la carga sube $3\,\text{cm}$, en contra del campo. Los $4\,\text{cm}$ horizontales son perpendiculares al campo y no aportan.

**Diferencia de potencial:**

$$
\Delta V = E\,d = 400\,\frac{\text{N}}{\text{C}}\cdot 0{,}03\,\text{m} = 12\ \text{V}
$$

**Trabajo** (de la fuerza externa que la lleva en contra del campo):

$$
W = q\,\Delta V = 2\times10^{-4}\,\text{C}\cdot 12\,\text{V} = 2{,}4\times10^{-3}\ \text{J} \qquad [\text{V}]\cdot[\text{C}] = [\text{J}]
$$

**a) Por $ad$** y **b) por $abcd$** da lo mismo, porque la fuerza eléctrica es **conservativa**: el trabajo no depende del camino. En $abcd$:

$$
W = W_{ab} + W_{bc} + W_{cd} \qquad\text{con}\qquad W_{cd} = 0
$$

porque el tramo $cd$ es horizontal, perpendicular al campo. Los tramos $ab$ y $bc$ suben en total los mismos $3\,\text{cm}$.

::: resultado
$$
W_{ad} = W_{abcd} = 2{,}4\ \text{mJ}
$$
:::

El trabajo que hace **el campo** es el opuesto, $-2{,}4\,\text{mJ}$ (la carga se mueve en contra de la fuerza eléctrica).
:::
:::

## Ejercicio 7.2

::: ejercicio El campo entre dos placas paralelas separadas $d = 1{,}8\,\text{cm}$ es uniforme y vale $2{,}4\times10^4\,\text{N/C}$. Calcular la diferencia de potencial entre las placas
::: solucion
$$
\Delta V = E\,d = 2{,}4\times10^4\,\frac{\text{N}}{\text{C}}\cdot 0{,}018\,\text{m} = 432\ \text{V}
$$

La placa negativa está a menor potencial.

::: aclaracion
En la nota de clase el resultado parece decir "$4{,}32\,\text{V}$": es $432\,\text{V}$ (hay que pasar $1{,}8\,\text{cm} = 0{,}018\,\text{m}$).
:::
:::
:::

## Ejercicio 7.4

::: ejercicio Dos cargas $q_1 = 3\,\mu\text{C}$ y $q_2 = -5\,\mu\text{C}$ están separadas $4\,\text{cm}$. Calcular a) el potencial en el punto medio y b) en qué punto entre ellas el potencial es nulo
```grafico
(0, 0) ; "$q_1 = 3\,\mu\text{C}$"
(4, 0) ; "$q_2 = -5\,\mu\text{C}$"
(2, 0) ; "medio"
segmento (0, 0) (4, 0) ; gris ; "$4\,\text{cm}$"
x: -1..5.5
y: -1..1
```

::: solucion
**a) Punto medio.** El potencial es un **escalar**: se suman los de cada carga, **con su signo**. Cada carga está a $0{,}02\,\text{m}$:

$$
V = k_0\left(\frac{q_1}{r_1} + \frac{q_2}{r_2}\right) = 9\times10^9\left(\frac{3\times10^{-6}}{0{,}02} + \frac{-5\times10^{-6}}{0{,}02}\right) = -9\times10^5\ \text{V} = -900\ \text{kV}
$$

**b) Potencial nulo.** Entre las cargas, con $r_1 + r_2 = 4\,\text{cm}$:

::: pasos
0 = k_0\left(\frac{q_1}{r_1} + \frac{q_2}{r_2}\right) \then \frac{3}{r_1} = \frac{5}{r_2}           // en $\mu\text{C}$; el signo de $q_2$ pasa al otro lado
3\,r_2 = 5\,r_1 \quad\text{y}\quad r_2 = 4 - r_1                                                        // en cm
3\,(4 - r_1) = 5\,r_1 \then 12 = 8\,r_1 \then r_1 = 1{,}5\ \text{cm}
:::

::: resultado
$$
V_{medio} = -900\ \text{kV} \qquad\qquad V = 0\ \text{a}\ 1{,}5\ \text{cm de}\ q_1\ (0{,}015\ \text{m})
$$
:::

El punto queda más cerca de la carga más chica ($q_1$), para que su potencial compense al de la más grande.
:::
:::

## Ejercicio 7.5

::: ejercicio Para la configuración de la figura, con $a = 0{,}20\,\text{m}$, $b = 0{,}40\,\text{m}$ y $q = 10\,\mu\text{C}$, calcular a) el potencial en el centro del rectángulo y b) la energía potencial del sistema
```grafico
(0, 2) ; "$q$"
(4, 2) ; "$-2q$"
(0, 0) ; "$2q$"
(4, 0) ; "$-q$"
segmento (0, 2) (4, 2) ; gris ; "$b$"
segmento (4, 2) (4, 0) ; gris
segmento (4, 0) (0, 0) ; gris
segmento (0, 0) (0, 2) ; gris ; "$a$"
segmento (0, 2) (4, 0) ; gris ; punteada
segmento (0, 0) (4, 2) ; gris ; punteada ; "$r$"
(2, 1) ; "centro"
x: -1..5
y: -0.7..2.7

```

::: solucion
**a) Centro.** Las cuatro cargas están a la misma distancia del centro (la mitad de la diagonal), así que

$$
V = \frac{k_0}{r/2}\,\big(q - 2q + 2q - q\big) = 0
$$

**b) Energía del sistema:** se suman las energías de **cada par** de cargas, $k_0\frac{q_i q_j}{r_{ij}}$. Hay $6$ pares; la diagonal mide $r = \sqrt{a^2 + b^2} = \sqrt{0{,}20} \approx 0{,}447\,\text{m}$.

| Par | Distancia | $q_i\,q_j$ |
|---|---|---|
| $q$ y $-2q$ (arriba) | $b$ | $-2q^2$ |
| $2q$ y $-q$ (abajo) | $b$ | $-2q^2$ |
| $q$ y $2q$ (izquierda) | $a$ | $2q^2$ |
| $-2q$ y $-q$ (derecha) | $a$ | $2q^2$ |
| $q$ y $-q$ (diagonal) | $r$ | $-q^2$ |
| $-2q$ y $2q$ (diagonal) | $r$ | $-4q^2$ |

::: pasos
U = k_0\,q^2\left(-\frac{4}{b} + \frac{4}{a} - \frac{5}{r}\right)
  = 9\times10^9\cdot\left(10^{-5}\right)^2\left(-\frac{4}{0{,}40} + \frac{4}{0{,}20} - \frac{5}{0{,}447}\right)            // $k_0\,q^2 = 0{,}9\ \text{N}\,\text{m}^2$
  = 0{,}9\cdot\left(-10 + 20 - 11{,}18\right)
  = 0{,}9\cdot(-1{,}18)
:::

::: resultado
$$
V_{centro} = 0 \qquad\qquad U \approx -1{,}06\ \text{J}
$$
:::

::: aclaracion
La guía llega a la misma expresión, $U = k_0\left(-\frac{4q^2}{b} - \frac{5q^2}{r} + \frac{4q^2}{a}\right)$, pero da $-1{,}22\,\text{J}$: con sus datos el valor es $-1{,}06\,\text{J}$ (revisado dos veces). En la clase quedó planteado sin la cuenta final.
:::
:::
:::
