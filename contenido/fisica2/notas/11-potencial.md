# Potencial eléctrico y diferencia de potencial

*Clase teórica del 30/06. Completado con el Serway, cap. 25 (Potencial eléctrico).*

## Trabajo

Recordatorio de mecánica: el trabajo de una fuerza en un desplazamiento es

$$
W = \vec F\cdot\Delta\vec x = F\,\Delta x\cos\theta
$$

con $\Delta x$ la distancia (el módulo del desplazamiento). Al tirar un objeto, pierde energía potencial y gana energía cinética por la aceleración; con las cargas pasa lo mismo.

## Energía potencial eléctrica

Si una carga se desplaza en un campo, hay trabajo: $\dd W = \vec F\cdot\dd\vec s$. Sobre una carga de prueba $q_0$ en un campo $\vec E$ actúa la fuerza

$$
\vec F = q_0\,\vec E
$$

Si la carga se mueve un $\dd\vec s$, el campo hace un trabajo $\vec F\cdot\dd\vec s$ y la energía potencial eléctrica cambia en menos ese trabajo:

::: pasos
\dd E_{pe} = -q_0\,\vec E\cdot\dd\vec s
\Delta E_{pe,AB} = U_B - U_A = -q_0\int_A^B \vec E\cdot\dd\vec s
:::

```grafico
titulo: Una carga positiva $q_0$ que va de $A$ a $B$ a favor del campo: gana energía cinética y pierde energía potencial
placa (-2.5, 1.2) (2.5, 1.2) ; +
placa (-2.5, -1.2) (2.5, -1.2) ; -
(0, 0.6) ; "$A$"
(0, -0.6) ; "$B$"
animar: no
```

Si la carga positiva se mueve **a favor del campo**, el campo hace trabajo positivo: al moverse **gana energía cinética y pierde energía potencial eléctrica**, $\uparrow E_c$ y $\downarrow E_{pe}$. Es como un cuerpo que cae en el campo gravitatorio (Serway, sec. 25.2).

Si un **agente externo** mueve la carga **en contra** de su movimiento natural, está aumentando su energía potencial: el agente realiza el trabajo.

## Potencial eléctrico

::: definicion Potencial eléctrico (voltaje)
Es la energía potencial por unidad de carga: un **valor propio de cada punto del campo**, que no depende de la carga de prueba.

$$
V_A = \frac{U_A}{q_0} \qquad\qquad V_B = \frac{U_B}{q_0}
$$
:::

::: definicion Diferencia de potencial
$$
\Delta V_{AB} = V_B - V_A = \frac{\Delta E_{pe,AB}}{q_0} = -\int_A^B \vec E\cdot\dd\vec s
$$
:::

**Unidades:**

$$
\frac{\text{J}}{\text{C}} = \text{V}\ \text{(volt)} \qquad\qquad [E] = \frac{[V]}{[\dd s]} = \frac{\text{V}}{\text{m}} = \frac{\text{N}}{\text{C}}
$$

::: observacion
Es raro pensar en "la energía en un punto" si no hay ninguna carga ahí: es como calcular la energía potencial de un objeto sin que el objeto esté (multiplicar la altura por la aceleración, pero sin la masa). Eso es el potencial.
:::

**Instrumentos** (un multímetro tiene los tres): el **voltímetro** mide diferencia de potencial ($\text{V}$); el **amperímetro**, intensidad de corriente ($\text{A}$); el **óhmetro**, resistencia ($\Omega$).

::: observacion
Lo que tiene sentido físico es la **diferencia** de potencial; el valor de $V$ en un punto depende de dónde se elija el cero. Se usa también el **electrón-volt**: $1\ \text{eV} = 1{,}60\times10^{-19}\ \text{J}$, la energía que gana un electrón al atravesar $1\ \text{V}$ (Serway, sec. 25.1).
:::

## Diferencia de potencial en un campo uniforme

Hay muchos casos; en la clase se dijo que **se estudia solo este, el del campo uniforme**.

**1) $\vec E \parallel \dd\vec s$**, entonces $\theta = 0°$ y $\cos\theta = 1$. Entre $A$ y $B$, separados $d$ en la dirección del campo:

::: pasos
\Delta V_{AB} = -\int_A^B \vec E\cdot\dd\vec s
\Delta V_{AB} = -E\int_A^B \dd s          // $E$ es constante: sale de la integral
\Delta V_{AB} = -E\,d
:::

```grafico
titulo: $A$ y $B$ sobre la misma línea de campo, separados $d$; $C$ está a la misma altura que $B$
vector (-2.4, 1.4) (-2.4, -1.4) ; azul ; "$\vec E$"
vector (-1.6, 1.4) (-1.6, -1.4) ; azul ; ""
vector (-0.2, 1.4) (-0.2, -1.4) ; azul ; ""
vector (0.6, 1.4) (0.6, -1.4) ; azul ; ""
vector (2, 1.4) (2, -1.4) ; azul ; ""
segmento (-2.5, 0.8) (2.5, 0.8) ; gris ; punteada
segmento (-2.5, -0.8) (2.5, -0.8) ; gris ; punteada
(-1, 0.8) ; "$A$"
(-1, -0.8) ; "$B$"
(1.2, -0.8) ; "$C$"
segmento (-1, 0.8) (1.2, -0.8) ; azul ; flecha ; "$H$"
texto (2.6, -1.05) "equipotencial"
x: -3..3.4
y: -1.6..1.6

```

**2) $\vec E$ y $\dd\vec s$ forman un ángulo $\theta$**: de $A$ a $C$, recorriendo un tramo de largo $H$,

::: pasos
\Delta V_{AC} = -\int_A^C \vec E\cdot\dd\vec s
\Delta V_{AC} = -E\int \dd s\,\cos\theta
\Delta V_{AC} = -E\,H\cos\theta
\Delta V_{AC} = -E\,d                           // $\cos\theta = \frac{d}{H} \then H\cos\theta = d$
:::

Da lo mismo que ir de $A$ a $B$: **$V_C = V_B$**. Las líneas perpendiculares al campo son **líneas equipotenciales**: en todos sus puntos el potencial es igual (en el espacio, superficies equipotenciales). Solo la componente del desplazamiento que se proyecta sobre la línea de campo hace variar $V$.

::: claves
- $\Delta V = -E\,d$: el potencial **disminuye** en el sentido del campo; las líneas de campo apuntan hacia donde baja $V$.
- Moverse perpendicular al campo no cambia $V$: las equipotenciales son perpendiculares a las líneas de campo.
- Una carga **positiva** pierde energía potencial al moverse a favor del campo; una **negativa** la gana (Serway, sec. 25.2).
- Al revés, el campo se obtiene del potencial: $\vec E = -\nabla V$ (Serway, sec. 25.4). Se usa en el [[Potencial y campo: ejercicios 7.14 y 7.16]].
:::

## Ejemplos

::: ejemplo Ejemplo 1: una batería de $12\,\text{V}$ se conecta a dos placas paralelas separadas $d = 0{,}30\,\text{cm}$. Hallar el campo entre las placas
```grafico
placa (-2.5, 0.6) (2.5, 0.6) ; +
placa (-2.5, -0.6) (2.5, -0.6) ; -
texto (2.9, 0) "$12\,\text{V}$"
x: -3..3.4
y: -1.4..1.4
```

::: solucion
El campo entre las placas es uniforme, así que $|\Delta V| = |-E\,d|$:

::: pasos
\frac{\Delta V}{d} = E
E = \frac{12\,\text{V}}{0{,}0030\,\text{m}}             // $d = 0{,}30\,\text{cm} = 0{,}0030\,\text{m}$
E = 4000\ \frac{\text{V}}{\text{m}}
:::

En este caso no hace falta considerar el signo: se pide el módulo del campo. Es el ejemplo 25.1 del Serway: $E = 4{,}0\times10^3\ \text{V/m}$.
:::
:::

::: ejemplo Ejemplo 2: un protón parte del reposo en $A$, en un campo uniforme $E = 8000\ \frac{\text{V}}{\text{m}}$, y recorre $d = 0{,}50\,\text{m}$ a favor del campo hasta $B$. Hallar su rapidez en $B$
Datos: $q_{p^+} = 1{,}6\times10^{-19}\,\text{C}$, $m_p = 1{,}67\times10^{-27}\,\text{kg}$, $v_A = 0$.

::: solucion
**Conservación de la energía:** lo que pierde de energía potencial lo gana de cinética.

::: pasos
-\Delta E_{pe} = \Delta E_c
-\Delta V\,q = \Delta E_c                                  // $\Delta E_{pe} = q\,\Delta V$
-(-E\,d)\,q = E_{cB} - E_{cA}                             // campo uniforme: $\Delta V = -E\,d$
E\,d\,q = \frac{1}{2}m\,v_B^2                              // parte del reposo: $E_{cA} = 0$
v_B = \sqrt{\frac{2\,E\,d\,q}{m}}
:::

**Cuenta:**

$$
v_B = \sqrt{\frac{2\cdot 8000\,\frac{\text{V}}{\text{m}}\cdot 0{,}50\,\text{m}\cdot 1{,}6\times10^{-19}\,\text{C}}{1{,}67\times10^{-27}\,\text{kg}}} = \sqrt{7{,}66\times10^{11}\ \frac{\text{m}^2}{\text{s}^2}} \approx 8{,}8\times10^{5}\ \frac{\text{m}}{\text{s}}
$$

::: observacion
En la clase el ejemplo quedó planteado hasta $E\,d\,q = \frac{1}{2}m\,v_B^2$, sin la cuenta final. Es como el ejemplo 25.2 del Serway, que usa un campo diez veces mayor ($8{,}0\times10^4\ \text{V/m}$) y da $v_B = 2{,}8\times10^6\ \text{m/s}$. Los datos del electrón que figuran en la clase no se usan acá.
:::
:::
:::

## Carga lanzada en un campo uniforme: tiro oblicuo

El último ejemplo de la clase: una carga que entra a un campo uniforme con una velocidad que **no** es paralela al campo sigue una trayectoria curva, y **se resuelve como un ejercicio de tiro oblicuo**. La fuerza eléctrica es constante, así que la aceleración también (Serway, sec. 23.7):

$$
\vec a = \frac{q\,\vec E}{m}
$$

Hace el papel de la gravedad: en la dirección del campo hay MRUV y en la perpendicular, MRU. Si la carga es negativa, la aceleración es **opuesta** al campo.

::: ejemplo Un electrón entra horizontalmente entre dos placas con $v_i = 3{,}00\times10^6\ \frac{\text{m}}{\text{s}}$, en un campo vertical $E = 200\ \frac{\text{N}}{\text{C}}$. Las placas miden $\ell = 0{,}100\,\text{m}$. ¿Cuánto se desvía al salir? (Serway, ej. 23.10)
Datos: $e = 1{,}6\times10^{-19}\,\text{C}$, $m_e = 9{,}11\times10^{-31}\,\text{kg}$.

```grafico
titulo: El electrón se curva como un proyectil (el campo apunta hacia arriba; la fuerza sobre el electrón, hacia abajo)
placa (-0.2, 1) (3.2, 1) ; -
placa (-0.2, -1) (3.2, -1) ; +
(3 t, 0.6 - 0.6 t^2) ; t: 0..1 ; flecha ; azul ; ""
(0, 0.6) ; "$e^-$"
animar: no
x: -0.6..3.6
y: -1.4..1.4
```

::: solucion
**Aceleración** (vertical, hacia abajo, opuesta al campo):

$$
a = \frac{e\,E}{m_e} = \frac{1{,}6\times10^{-19}\,\text{C}\cdot 200\,\frac{\text{N}}{\text{C}}}{9{,}11\times10^{-31}\,\text{kg}} \approx 3{,}51\times10^{13}\ \frac{\text{m}}{\text{s}^2}
$$

**Tiempo entre las placas** (horizontal, MRU):

$$
t = \frac{\ell}{v_i} = \frac{0{,}100\,\text{m}}{3{,}00\times10^6\,\frac{\text{m}}{\text{s}}} \approx 3{,}33\times10^{-8}\ \text{s}
$$

**Desvío vertical** (MRUV, sin velocidad vertical inicial):

$$
\Delta y = -\frac{1}{2}\,a\,t^2 = -\frac{1}{2}\cdot 3{,}51\times10^{13}\cdot\left(3{,}33\times10^{-8}\right)^2 \approx -0{,}0195\ \text{m} = -1{,}95\ \text{cm}
$$
:::
:::
