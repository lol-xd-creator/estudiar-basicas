# Flujo magnético, ley de Faraday y ley de Lenz

*Clase teórica del 20/10. Completado con el Serway, sec. 30.5 (Ley de Gauss en el magnetismo), cap. 31 (Ley de Faraday: sec. 31.1, 31.2, 31.3 y 31.5) y sec. 32.1 (Autoinducción). Sigue de [[Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos]].*

::: claves
- **Flujo magnético:** $\Phi_B = \vec B\cdot\vec A = B\,A\cos\theta$, en **weber**: $1\ \text{Wb} = 1\ \text{T}\cdot\text{m}^2$.
- **Gauss para el magnetismo:** $\oint \vec B\cdot\dd\vec A = 0$ siempre: no hay polos magnéticos aislados.
- **Ley de Faraday:** si el flujo cambia con el tiempo, se induce una fem: $\varepsilon_{ind} = -\dfrac{\dd\Phi_B}{\dd t}$; con $N$ espiras, $\varepsilon_{ind} = -N\,\dfrac{\dd\Phi_B}{\dd t}$.
- **El flujo cambia** si cambia $B$, el área $A$ o el ángulo $\theta$.
- **Fem de movimiento:** una barra de largo $\ell$ que se mueve con velocidad $v$ en un campo $B$: $|\varepsilon| = B\,v\,\ell$.
- **Ley de Lenz:** la corriente inducida circula en el sentido que **se opone al cambio** de flujo.
- **Generador de CA:** $\varepsilon_{ind} = N\,B\,A\,\omega\,\sen(\omega t)$, máxima $\varepsilon_{max} = N\,B\,A\,\omega$.
- **Autoinducción:** al abrir o cerrar un circuito, la corriente que cambia induce una fem en el propio circuito, que se opone al cambio.
:::

## Flujo magnético

Igual que el flujo eléctrico ([[Líneas de campo, flujo y ley de Gauss]]), el **flujo magnético** mide cuánto campo atraviesa una superficie:

$$
\Phi_E = \vec E\cdot\vec A = E\,A\cos\theta \qquad\qquad \Phi_B = \vec B\cdot\vec A = B\,A\cos\theta
$$

- $\vec A$ es el **vector área**: tiene el módulo del área y es **perpendicular** a la superficie (la normal).
- $\theta$ es el ángulo **entre $\vec B$ y $\vec A$**, es decir, entre el campo y la normal, no entre el campo y la superficie.
- Si el campo no es uniforme, se integra: $\Phi_B = \displaystyle\int \vec B\cdot\dd\vec A$.

```grafico
titulo: El campo atraviesa la espira (vista de canto); θ va entre B y la normal A
vector (-2.2, 1.2) (2.2, 1.2) ; rojo
vector (-2.2, 0.6) (2.2, 0.6) ; rojo
vector (-2.2, 0) (2.2, 0) ; rojo
vector (-2.2, -0.6) (2.2, -0.6) ; rojo
vector (-2.2, -1.2) (2.2, -1.2) ; rojo
segmento (-0.55, 1.1) (0.55, -1.1) ; azul ; gruesa
texto (-1.05, 1.42) "espira"
texto (2.4, 1.45) "$\vec B$"
vector (0, 0) (1.2, 0.6) ; verde ; gruesa ; "$\vec A$"
texto (0.75, 0.16) "$\theta$"
x: -2.6..2.8
y: -1.6..1.6
```

| Posición de la espira | $\theta$ | $\Phi_B$ |
|---|---|---|
| Normal paralela al campo (el campo la atraviesa de frente) | $0°$ | máximo: $B\,A$ |
| Inclinada | $\theta$ | $B\,A\cos\theta$ |
| Normal perpendicular al campo (el campo "le pasa por el costado") | $90°$ | $0$ |

**Unidad:** el weber.

$$
[\Phi_B] = [B]\cdot[A] = \text{T}\cdot\text{m}^2 = \text{Wb}\ \ \text{(weber)}
$$

## Ley de Gauss para el magnetismo

Para el campo eléctrico, el flujo a través de una superficie cerrada depende de la carga encerrada. Para el campo magnético, **siempre da cero**:

::: resultado Ley de Gauss en el magnetismo
$$
\Phi_B = \oint \vec B\cdot\dd\vec A = 0
$$
:::

**Por qué** (Serway, sec. 30.5): las líneas de campo eléctrico **nacen y mueren en las cargas**, pero las líneas de campo magnético son **cerradas**: salen del polo norte del imán, vuelven por el polo sur y siguen **por dentro** del imán. No empiezan ni terminan en ningún punto. Entonces, en cualquier superficie cerrada (por ejemplo, una que encierre un solo polo), **entran tantas líneas como salen**.

- Esto equivale a decir que **no existen polos magnéticos aislados** (monopolos): si cortás un imán al medio, obtenés dos imanes, cada uno con su norte y su sur.
- Por eso, como se anotó en clase, **la ley de Gauss no sirve para calcular campos magnéticos** como servía para los eléctricos: el flujo neto da siempre cero y no dice nada del campo. Para eso está Biot-Savart.

## Inducción electromagnética

**La experiencia** (Serway, fig. 31.1): una espira conectada a un amperímetro (sin batería) y un imán.

| Qué se hace | Qué marca el amperímetro |
|---|---|
| Se **acerca** el imán a la espira | circula corriente en un sentido |
| El imán queda **quieto** (cerca o lejos) | **cero**: no circula corriente |
| Se **aleja** el imán | circula corriente en el sentido **contrario** |
| Se mueve la espira y el imán queda quieto | también circula corriente |

**¡Hay corriente sin batería!** Se llama **corriente inducida**, producida por una **fem inducida**. Lo que importa no es que haya campo, sino que el campo (o el flujo) **cambie**. Y cuanto más rápido cambia, más corriente: depende de la **velocidad con la que cambia el campo en el tiempo**.

Faraday también lo mostró con dos bobinas enrolladas en un anillo de hierro: al **cerrar** el interruptor de la primera, el amperímetro de la segunda se mueve un instante y vuelve a cero; al **abrirlo**, se mueve al revés. Con corriente constante, no marca nada.

## Ley de Faraday

**Cuando el flujo magnético varía en el tiempo, se produce una fem inducida:**

::: resultado Ley de inducción de Faraday
$$
\varepsilon_{ind} = -\frac{\dd\Phi_B}{\dd t} = -\frac{\dd\,(B\,A\cos\theta)}{\dd t}
$$

Si la bobina tiene $N$ espiras iguales, las fem de cada espira están en serie y se suman:

$$
\varepsilon_{ind} = -N\,\frac{\dd\Phi_B}{\dd t}
$$
:::

El signo menos es la ley de Lenz (más abajo): dice hacia dónde circula la corriente. Para calcular el **valor** de la fem se usa el módulo.

**El flujo $B\,A\cos\theta$ puede cambiar de tres maneras** (Serway, sec. 31.1):

| Qué cambia | Ejemplo |
|---|---|
| El **campo** $B$ | se acerca o aleja un imán; se prende una bobina |
| El **área** $A$ | una barra que se desliza sobre rieles (fem de movimiento) |
| El **ángulo** $\theta$ | una espira que gira en el campo (generador) |

Del área, en la clase se anotó:

- área **fija** (y campo constante) → **no** circula corriente;
- el área se **agranda** → circula corriente en un sentido;
- el área se **achica** → circula en el sentido contrario.

### Ejemplo: bobina con campo que crece (Serway, ej. 31.1)

::: ejemplo Una bobina de $N = 200$ espiras cuadradas de lado $\ell = 18\,\text{cm}$ está en un campo perpendicular a su plano, que crece de $B_0 = 0$ a $B_f = 0{,}50\,\text{T}$ en $\Delta t = 0{,}8\,\text{s}$. Calcular la fem inducida
::: solucion
El campo es perpendicular al plano: atraviesa la bobina de frente, $\theta = 0°$ y $\cos\theta = 1$. El área no cambia, así que sale de la derivada. El campo crece de forma pareja, así que $\dfrac{\dd B}{\dd t} = \dfrac{\Delta B}{\Delta t}$.

::: pasos
\varepsilon_{ind} = -N\,\frac{\dd\Phi_B}{\dd t} = -N\,\frac{\dd\,(B\,A\cos\theta)}{\dd t}
|\varepsilon_{ind}| = N\,A\,\frac{\Delta B}{\Delta t}       // $\cos 0° = 1$ y $A$ constante
= 200\cdot(0{,}18\,\text{m})^2\cdot\frac{0{,}50\,\text{T}}{0{,}8\,\text{s}}       // $A = \ell^2$
:::

::: resultado
$$
|\varepsilon_{ind}| = 4{,}05\ \text{V}
$$
:::

**Las unidades, como en el pizarrón:** $\text{T} = \dfrac{\text{N}}{\text{C}\cdot\text{m/s}}$, así que

$$
\frac{\text{m}^2\cdot\text{T}}{\text{s}} = \frac{\text{m}^2}{\text{s}}\cdot\frac{\text{N}}{\text{C}\cdot\frac{\text{m}}{\text{s}}} = \frac{\text{N}\cdot\text{m}}{\text{C}} = \frac{\text{J}}{\text{C}} = \text{V}
$$

El Serway lo redondea a $4{,}0\,\text{V}$ y agrega: si la bobina está conectada a un circuito de resistencia total $2\,\Omega$, la corriente inducida es $I = \dfrac{\varepsilon}{R} \approx 2\,\text{A}$. Si los extremos de la bobina están sueltos, hay fem pero **no circula corriente**.
:::
:::

## Fem de movimiento

Acá el campo es **constante** y lo que se mueve es el conductor (Serway, sec. 31.2).

**Una barra sola.** Una barra conductora de largo $\ell$ se mueve con velocidad $\vec v$ en un campo $\vec B$ entrante. Sus electrones se mueven con ella, así que sienten la fuerza magnética $\vec F_B = q\,\vec v\times\vec B$ a lo largo de la barra ([[Movimiento de cargas en un campo magnético]]): se acumulan en un extremo y dejan el otro positivo.

```grafico
titulo: Barra que se mueve en un campo entrante: las cargas se separan
texto (-1.6, 1.2) "×"
texto (-0.8, 1.2) "×"
texto (0.8, 1.2) "×"
texto (1.6, 1.2) "×"
texto (-1.6, 0) "×"
texto (-0.8, 0) "×"
texto (1.6, 0) "×"
texto (-1.6, -1.2) "×"
texto (-0.8, -1.2) "×"
texto (0.8, -1.2) "×"
texto (1.6, -1.2) "×"
texto (-1.9, 1.55) "$\vec B$ entrante"
segmento (0, -1) (0, 1) ; azul ; gruesa
texto (0.2, 0.85) "$+$"
texto (0.2, -0.85) "$-$"
vector (0, 0) (1, 0) ; verde ; "$\vec v$"
vector (-0.3, 0.3) (-0.3, -0.45) ; rojo ; "$\vec F_B$"
vector (-0.55, -0.45) (-0.55, 0.3) ; ambar ; "$\vec F_E$"
texto (-0.42, 0.55) "$e^-$"
x: -2.1..2.1
y: -1.6..1.8
```

La separación de cargas crea un campo eléctrico $\vec E$ dentro de la barra. Las cargas se acumulan hasta que, sobre cada electrón, la fuerza eléctrica equilibra a la magnética:

::: pasos
\textstyle\sum\vec F = \vec F_E + \vec F_B = 0 \then F_E = F_B
q\,E = q\,v\,B \then E = B\,v
\Delta V = E\,\ell       // campo uniforme en la barra
:::

::: resultado
$$
\Delta V = B\,v\,\ell
$$
:::

Mientras la barra se mueva, hay una diferencia de potencial entre sus extremos. Si se invierte el movimiento, se invierte la polaridad.

**Con rieles: un circuito que crece.** Si la barra se desliza sobre dos rieles conectados, el circuito se cierra y circula corriente. Ahora lo que cambia es el **área**: $A = \ell\,x$, donde $x$ es la posición de la barra, y $\dfrac{\dd x}{\dd t} = v$.

```grafico
titulo: Barra sobre rieles: el área encerrada crece y se induce una corriente
segmento (-2.5, 1) (1.6, 1) ; gris ; gruesa
segmento (-2.5, -1) (1.6, -1) ; gris ; gruesa
segmento (-2.5, -1) (-2.5, 1) ; gris ; gruesa ; "$R$"
segmento (0.5, -1.15) (0.5, 1.15) ; azul ; gruesa
vector (0.5, 0) (1.4, 0) ; verde ; "$\vec v$"
vector (-0.6, 1) (-1.6, 1) ; violeta ; "$I$"
texto (-2, 0.5) "×"
texto (-1, 0.5) "×"
texto (0, 0.5) "×"
texto (-2, -0.5) "×"
texto (-1, -0.5) "×"
texto (0, -0.5) "×"
texto (1.2, 0.6) "×"
texto (1.2, -0.6) "×"
segmento (-2.5, -1.45) (0.5, -1.45) ; gris ; punteada ; "$x$"
texto (0.75, 0.25) "$\ell$"
x: -3..2
y: -1.8..1.6
```

::: pasos
\varepsilon_{ind} = -\frac{\dd\Phi_B}{\dd t} = -\frac{\dd\,(B\,A\cos\theta)}{\dd t}
= -B\,\frac{\dd\,(\ell\,x)}{\dd t}       // $B$ constante, $\theta = 0°$, área $A = \ell\,x$
= -B\,\ell\,\frac{\dd x}{\dd t}
:::

::: resultado Fem de movimiento
$$
\varepsilon_{ind} = -B\,\ell\,v \qquad\qquad |\varepsilon| = B\,\ell\,v \qquad\qquad I = \frac{B\,\ell\,v}{R}
$$
:::

Es el mismo resultado que con la barra sola: dos caminos (fuerzas sobre las cargas o Faraday) para la misma fem.

::: observacion
**¿De dónde sale la energía?** No hay batería. Alguien tiene que **empujar la barra**: la barra con corriente siente una fuerza magnética $F_B = I\,\ell\,B$ que la frena, y para que siga a velocidad constante hay que aplicarle una fuerza igual. Esa potencia, $F\,v$, es la que se disipa en la resistencia (Serway, sec. 31.2).
:::

## Ley de Lenz

En la hoja quedó "la corriente inducida tiende a mantener el flujo original" y **buscar definición**. La del Serway (sec. 31.3) es:

::: definicion Ley de Lenz
La corriente inducida en una espira circula en la dirección que crea un campo magnético que **se opone al cambio** en el flujo magnético a través del área encerrada por la espira.
:::

Es decir: la corriente inducida **tiende a mantener el flujo original**. Si el flujo **aumenta**, la corriente crea un campo **en contra**; si el flujo **disminuye**, crea un campo **a favor**, para compensar. Ese es el signo menos de la ley de Faraday.

**Cómo usarla, en tres pasos:**

1. ¿Hacia dónde apunta el campo externo, y el flujo **aumenta** o **disminuye**?
2. El campo inducido va **en contra** si aumenta y **a favor** si disminuye.
3. Con la regla de la mano derecha (pulgar = campo inducido), los dedos dan el sentido de la corriente.

**Ejemplo, la barra sobre rieles:** el campo es **entrante** y el área **crece**, así que el flujo entrante aumenta. La corriente inducida tiene que crear un campo **saliente** dentro de la espira: circula en sentido **antihorario**, y por eso en el riel de arriba la corriente va hacia la izquierda, como en el dibujo. Si la barra se moviera hacia la izquierda, el flujo bajaría y la corriente sería horaria.

**Ejemplo, el imán y la espira** (Serway, ej. 31.5): al **acercar** el polo norte, el flujo hacia la espira aumenta; la corriente inducida crea un campo opuesto y la cara de la espira que mira al imán se comporta como un **polo norte**, que lo **repele**. Al **alejarlo**, esa cara se vuelve polo sur y lo **atrae**. Siempre se opone a lo que estás haciendo.

::: idea
**Lenz es conservación de la energía.** Si la corriente inducida fuera al revés, la fuerza sobre la barra la empujaría en el sentido del movimiento: la barra aceleraría, la corriente crecería, la fuerza también... energía de la nada. Por eso la corriente inducida siempre frena el cambio.
:::

## Generador de corriente alterna

Acá lo que cambia es el **ángulo** entre $\vec B$ y $\vec A$ (Serway, sec. 31.5). Una espira (o una bobina de $N$ espiras) **gira** con velocidad angular $\omega$ constante entre los polos de un imán. Sus extremos van a dos **anillos de deslizamiento** que giran con ella, y unas **escobillas** fijas, apoyadas en los anillos, la conectan al **circuito exterior**.

El ángulo crece con el tiempo, $\theta = \omega\,t$:

::: pasos
\Phi_B = B\,A\cos\theta = B\,A\cos(\omega t)
\varepsilon_{ind} = -\frac{\dd\Phi_B}{\dd t} = -B\,A\,\frac{\dd\,(\cos\omega t)}{\dd t}
= B\,A\,\omega\,\sen(\omega t)       // la derivada de $\cos(\omega t)$ es $-\omega\sen(\omega t)$
:::

::: resultado Fem de un generador de CA
$$
\varepsilon_{ind} = N\,B\,A\,\omega\,\sen(\omega t) \qquad\qquad \varepsilon_{max} = N\,B\,A\,\omega
$$
:::

::: aclaracion
En el pizarrón quedó $\varepsilon_{ind} = -B\,A\,\omega\,\sen(\omega t)$, con el signo menos. Al derivar $\cos(\omega t)$ aparece otro menos ($-\omega\sen\omega t$), y los dos se cancelan: el Serway (ec. 31.10) da $+N\,B\,A\,\omega\,\sen\omega t$. El módulo y la forma de la curva son los mismos; el signo solo depende de desde dónde se empieza a medir el ángulo.
:::

```grafico
titulo: La fem de un generador es senoidal: cambia de sentido dos veces por vuelta
y = sen(x) ; azul ; "$\varepsilon_{ind}$"
(1.5708, 1) ; "$\varepsilon_{max}$"
(3.1416, 0) ; "$0$"
ejes: ωt, ε
marcas: pi
x: 0..12.6
y: -1.4..1.4
aspecto: libre
alto: 240
```

| $\omega t$ | Posición de la espira | Flujo | Fem |
|---|---|---|---|
| $0$, $\pm\pi$ | normal **paralela** a $\vec B$ (el campo la atraviesa de frente) | máximo, pero **no cambia** en ese instante | $0$ |
| $\pm\dfrac{\pi}{2}$ | normal **perpendicular** a $\vec B$ (el campo queda en el plano de la espira) | cero, pero **cambia lo más rápido** | **máxima** |

La fem no depende de cuánto flujo hay, sino de **cuán rápido cambia**. Así se genera la corriente de la red: $\omega = 2\pi f$, con $f = 50\,\text{Hz}$ en la Argentina.

## Autoinducción

Un circuito con una batería $\varepsilon$, una resistencia $R$ y un interruptor:

```circuito
titulo: Al cerrar o abrir el interruptor, la corriente cambia y se induce una fem en el propio circuito
bateria (4,0) (4,3)
cable (4,3) (3,3)
interruptor (3,3) (1.5,3)
cable (1.5,3) (0,3) (0,1.5)
R (0,1.5) (0,0)
cable (0,0) (4,0)
corriente (0,2.4) (0,1.8) ; "$I$"
```

Al **cerrar** el interruptor, la corriente no salta de golpe de $0$ a $\dfrac{\varepsilon}{R}$: va creciendo. Mientras crece, el campo que la propia corriente genera también crece, y el flujo a través del propio circuito cambia. Por Faraday, se induce una fem **en el mismo circuito**, y por Lenz, en contra de la batería. Por eso la corriente sube **de a poco**. Al **abrir** el interruptor pasa lo contrario: la fem inducida trata de mantener la corriente.

Como anotaste en clase, **sucede apenas se abre o se cierra el interruptor**: con la corriente ya estable, no hay cambio y no hay fem autoinducida (Serway, sec. 32.1).

$$
\varepsilon_L = -L\,\frac{\dd I}{\dd t}
$$

$L$ es la **inductancia** del circuito, en **henry** ($1\,\text{H} = 1\,\text{V}\cdot\text{s/A}$). Depende de la forma del circuito, como la capacitancia depende de la forma del capacitor. Así como la resistencia se opone a la corriente, la inductancia se opone a los **cambios** de la corriente.

## Para el parcial 2

Lo que se anotó al final de la clase:

- **Una o dos preguntas de la guía.**
- **Tres ejercicios del práctico:** capacitores, circuitos y campo magnético ("quizás").
- Al margen, temas para las preguntas: potencial, flujo eléctrico, de qué dependen la resistencia óhmica y la capacitancia, y las ecuaciones.

::: aclaracion
La anotación del margen está escrita de costado y se lee a medias; los temas de arriba son la mejor lectura. Confirmalo con tus compañeros o con el profesor.
:::
