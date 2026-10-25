# Campo magnético de corrientes: ejercicios de la unidad 11

*Clase práctica del 20/10. Guía de trabajos prácticos, capítulo 11 (Campo de inducción magnética). La teoría está en [[Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos]].*

::: claves
- **Conductor largo (infinito):** $B = \dfrac{\mu_0\,i}{2\pi a}$, con $\mu_0 = 4\pi\times10^{-7}\ \dfrac{\text{T}\cdot\text{m}}{\text{A}}$. Las líneas de campo son **círculos** alrededor del cable.
- **Sentido:** regla de la mano derecha, pulgar en el sentido de la corriente; los dedos dan el sentido del campo. Corriente **saliente** ($\odot$): campo **antihorario**. **Entrante** ($\otimes$): **horario**.
- **Espira, en el centro:** $B = \dfrac{\mu_0\,i}{2a}$; con $N$ espiras, se multiplica por $N$.
- **Solenoide:** $B = \dfrac{\mu_0\,N\,i}{\ell} = \mu_0\,n\,i$, con $n = \dfrac{N}{\ell}$ vueltas por unidad de longitud.
- **Varios conductores:** el campo total es la **suma vectorial** de los campos de cada uno.
- **Unidad:** tesla, $\text{T}$. $1\,\mu\text{T} = 10^{-6}\,\text{T}$. (Antes se usaba $\text{Wb/m}^2$, que es lo mismo que T.)
:::

## Fórmulas de la clase

| Configuración | Campo | Comentario |
|---|---|---|
| Conductor recto **finito**, punto a distancia $a$ | $B = \dfrac{\mu_0\,i}{4\pi a}\left(\sen\theta_1 - \sen\theta_2\right)$ | $\theta_1$ y $\theta_2$: ángulos desde la perpendicular $a$ a los extremos, **con signo** (uno de cada lado) |
| Conductor recto **infinito** | $B = \dfrac{\mu_0\,i}{2\pi a}$ | sale del anterior con $\theta_1 = 90°$ y $\theta_2 = -90°$ |
| Alambre **grueso** de radio $R$, **afuera** ($r \ge R$) | $B = \dfrac{\mu_0\,i}{2\pi r}$ | igual que un cable fino |
| Alambre grueso, **adentro** ($r < R$) | $B = \dfrac{\mu_0\,i}{2\pi R^2}\,r$ | crece lineal desde $0$ en el centro |
| Espira circular de radio $a$, en el **eje** a distancia $b$ | $B = \dfrac{\mu_0\,i\,a^2}{2\left(a^2 + b^2\right)^{3/2}}$ | |
| Espira, en el **centro** ($b = 0$) | $B = \dfrac{\mu_0\,i}{2a}$ | |
| Espira, **lejos** ($b \gg a$) | $B \approx \dfrac{\mu_0\,i\,a^2}{2b^3}$ | |
| **Toroide** de $N$ vueltas, a radio $r$ | $B = \dfrac{\mu_0\,N\,i}{2\pi r}$ | solo dentro del núcleo |
| **Solenoide** de $N$ vueltas y largo $\ell$ | $B = \dfrac{\mu_0\,N\,i}{\ell} = \mu_0\,n\,i$ | uniforme adentro |

Las del conductor finito y la espira salen de Biot-Savart (Serway, sec. 30.1). Las del alambre grueso, el toroide y el solenoide salen de la **ley de Ampère** (Serway, sec. 30.3 y 30.4): $\oint \vec B\cdot\dd\vec s = \mu_0\,i$, que es para el campo magnético lo que la ley de Gauss es para el eléctrico.

```grafico
titulo: Alambre grueso de radio R: el campo crece adentro y cae como 1/r afuera
(t, t) ; t: 0..1 ; azul ; gruesa
(t, 1/t) ; t: 1..4 ; azul ; gruesa
segmento (1, 0) (1, 1) ; gris ; punteada
(1, 1) ; "$\frac{\mu_0 i}{2\pi R}$"
texto (1, -0.15) "$R$"
texto (0.35, 0.6) "$\propto r$"
texto (2.4, 0.62) "$\propto \frac{1}{r}$"
ejes: r, B
aspecto: libre
alto: 240
x: 0..4.2
y: -0.25..1.3
```

## Ejercicio 1: campo de un conductor largo

::: ejercicio Calcular, en el aire, el campo magnético en un punto a $5\,\text{cm}$ de un alambre recto y largo por el que circula una corriente de $15\,\text{A}$
::: solucion
Datos en SI: $a = 0{,}05\,\text{m}$, $i = 15\,\text{A}$.

::: pasos
B = \frac{\mu_0\,i}{2\pi a} = \frac{4\pi\times10^{-7}\cdot 15}{2\pi\cdot 0{,}05}
= \frac{2\times10^{-7}\cdot 15}{0{,}05}       // $\frac{\mu_0}{2\pi} = 2\times10^{-7}$: un atajo para todas las cuentas de cables
:::

::: resultado
$$
B = 6\times10^{-5}\ \text{T} = 60\ \mu\text{T}
$$
:::
:::
:::

## Ejercicio 2: bobina circular

::: ejercicio Una bobina circular plana de $40$ espiras tiene un diámetro de $32\,\text{cm}$. ¿Qué corriente debe circular para producir en su centro un campo de $3\times10^{-4}\,\text{Wb/m}^2$?
::: solucion
En el centro de una espira $B = \dfrac{\mu_0\,i}{2a}$, y con $N$ espiras se multiplica por $N$. El radio es la mitad del diámetro: $a = 0{,}16\,\text{m}$. Y $\text{Wb/m}^2 = \text{T}$.

::: pasos
B = N\,\frac{\mu_0\,i}{2a} \then i = \frac{2a\,B}{\mu_0\,N}
i = \frac{2\cdot 0{,}16\,\text{m}\cdot 3\times10^{-4}\,\text{T}}{4\pi\times10^{-7}\,\frac{\text{T}\cdot\text{m}}{\text{A}}\cdot 40}
:::

::: resultado
$$
i \approx 1{,}9\ \text{A}
$$
:::

::: aclaracion
El enunciado dice "un campo de $3\times10^{-4}$ webers", pero el weber es la unidad de **flujo**; el campo va en $\text{Wb/m}^2$, que es el tesla. En la hoja quedó $|E| = 3\times10^{-4}$: es $B$, el campo magnético, no $E$.
:::
:::
:::

## Ejercicio 3: solenoide

::: ejercicio Un solenoide con núcleo de aire y $2000$ espiras tiene una longitud de $60\,\text{cm}$ y un diámetro de $2\,\text{cm}$. Si circulan $5\,\text{A}$, ¿cuál es la densidad de flujo (el campo $B$) en su interior?
::: solucion
::: pasos
B = \frac{\mu_0\,N\,i}{\ell} = \frac{4\pi\times10^{-7}\cdot 2000\cdot 5}{0{,}6}
:::

::: resultado
$$
B \approx 0{,}021\ \text{T} = 21\ \text{mT}
$$
:::

El diámetro **no se usa**: dentro de un solenoide largo el campo no depende del área, solo de las vueltas por metro y la corriente. Es un dato para distraer, o para calcular el flujo $\Phi_B = B\,A$ si lo pidieran.
:::
:::

## Ejercicio 11.6: dos conductores paralelos

::: ejercicio Dos conductores largos y paralelos, separados $10\,\text{cm}$, llevan $I_1 = 20\,\text{A}$ (saliente) e $I_2 = 30\,\text{A}$ (entrante). a) Calcular el campo $\vec B$ en los puntos $M$ ($2\,\text{cm}$ a la izquierda de $I_1$), $N$ ($4\,\text{cm}$ a la derecha de $I_1$) y $T$ ($3\,\text{cm}$ a la derecha de $I_2$). b) (Tarea) ¿Qué valor y sentido debe tener $I_2$ para que el campo en $T$ sea nulo?
```grafico
titulo: Corriente saliente: campo antihorario. Entrante: horario (escala: 1 cm del dibujo = 100 µT)
(2cos(t), 2sen(t)) ; t: 0..2pi ; gris ; punteada ; flecha
(10 + 3cos(t), -3sen(t)) ; t: 0..2pi ; gris ; punteada ; flecha
leyenda: no
texto (0, 0.45) "$I_1\ \odot$"
texto (10, 0.45) "$I_2\ \otimes$"
(0, 0) ; ""
(10, 0) ; ""
(-2, 0) ; "$M$"
(4, 0) ; "$N$"
(13, 0) ; "$T$"
vector (-2.3, 0) (-2.3, -2) ; azul ; "$B_1$"
vector (-1.7, 0) (-1.7, 0.5) ; rojo ; "$B_2$"
vector (3.7, 0) (3.7, 1) ; azul ; "$B_1$"
vector (4.3, 0) (4.3, 1) ; rojo ; "$B_2$"
vector (12.7, 0) (12.7, -2) ; rojo ; "$B_2$"
vector (13.3, 0) (13.3, 0.31) ; azul ; "$B_1$"
x: -4..16
y: -3.5..3.5
```
::: solucion
**Módulos** con $B = \dfrac{\mu_0\,I}{2\pi d} = 2\times10^{-7}\,\dfrac{I}{d}$, distancias en metros. **Sentidos** con la mano derecha: alrededor de $I_1$ (saliente) el campo gira **antihorario**, así que a su derecha apunta **arriba** y a su izquierda **abajo**. Alrededor de $I_2$ (entrante) gira **horario**: a su izquierda apunta **arriba** y a su derecha **abajo**.

**Punto $M$** ($2\,\text{cm}$ de $I_1$, $12\,\text{cm}$ de $I_2$, a la izquierda de los dos):

::: pasos
B_1 = 2\times10^{-7}\cdot\frac{20}{0{,}02} = 200\ \mu\text{T}       // abajo
B_2 = 2\times10^{-7}\cdot\frac{30}{0{,}12} = 50\ \mu\text{T}       // arriba
B_M = -200 + 50 = -150\ \mu\text{T}
:::

**Punto $N$** ($4\,\text{cm}$ de $I_1$, $6\,\text{cm}$ de $I_2$, entre los dos):

::: pasos
B_1 = 2\times10^{-7}\cdot\frac{20}{0{,}04} = 100\ \mu\text{T}       // arriba
B_2 = 2\times10^{-7}\cdot\frac{30}{0{,}06} = 100\ \mu\text{T}       // arriba
B_N = 100 + 100 = 200\ \mu\text{T}
:::

**Punto $T$** ($13\,\text{cm}$ de $I_1$, $3\,\text{cm}$ de $I_2$, a la derecha de los dos):

::: pasos
B_1 = 2\times10^{-7}\cdot\frac{20}{0{,}13} \approx 30{,}8\ \mu\text{T}       // arriba
B_2 = 2\times10^{-7}\cdot\frac{30}{0{,}03} = 200\ \mu\text{T}       // abajo
B_T = 30{,}8 - 200 \approx -169{,}2\ \mu\text{T}
:::

::: resultado
$$
\vec B_M = -150\,\hat\jmath\ \mu\text{T} \qquad \vec B_N = 200\,\hat\jmath\ \mu\text{T} \qquad \vec B_T \approx -169{,}2\,\hat\jmath\ \mu\text{T}
$$
:::

Entre los dos cables los campos se **suman** (corrientes opuestas); afuera se **restan**. La guía resuelve el punto $T$ y da $-169{,}24\,\mu\text{T}\,\hat\jmath$.

**b) (Tarea)** En $T$, $I_1$ aporta $30{,}8\,\mu\text{T}$ hacia **arriba**. Para anularlo, $I_2$ tiene que dar $30{,}8\,\mu\text{T}$ hacia **abajo**: a su derecha, eso es campo **horario**, o sea corriente **entrante** (el mismo sentido que tiene).

::: pasos
2\times10^{-7}\cdot\frac{I_2}{0{,}03} = 30{,}8\times10^{-6} \then I_2 = \frac{30{,}8\times10^{-6}\cdot 0{,}03}{2\times10^{-7}}
:::

::: resultado
$$
I_2 \approx 4{,}6\ \text{A, entrante}
$$
:::
:::
:::

::: tip
**Para los puntos sobre la recta de los cables:** el campo de cada cable es perpendicular a esa recta, así que todos los campos son verticales y se suman con signo ($+$ arriba, $-$ abajo). Si el punto no está sobre esa recta, hay que descomponer como con las fuerzas de Coulomb ([[Fuerza neta sobre una carga puntual]]).
:::
