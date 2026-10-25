# Líneas de campo, flujo y ley de Gauss

*Clase teórica del 23/06. Completado con el Serway, cap. 23 (sec. 23.6) y cap. 24 (Ley de Gauss).*

## Líneas de campo

Las **líneas de campo** son un esquema del campo en el espacio: indican cómo se distribuye.

::: claves
- El vector campo $\vec E$ en un punto tiene módulo, dirección y sentido, y es **tangente** a la línea de campo que pasa por ese punto.
- El **número de líneas por unidad de área perpendicular** (la densidad de líneas) es **proporcional a la intensidad** del campo: donde las líneas están más juntas, el campo es más fuerte.
:::

```grafico
titulo: Carga puntual positiva: cerca de la carga las líneas están más juntas, $E_1 = E_2 > E_3$
carga (0, 0) ; +1
x: -3..3
y: -2.2..2.2
```

**Reglas para dibujar líneas de campo** (Serway, sec. 23.6):

1. Las líneas **salen de las cargas positivas** y **entran en las negativas** (o se van al infinito).
2. El número de líneas que salen o entran es **proporcional a la carga**: si $q_1 = -6$ y $q_2 = 12$, de $q_2$ salen el doble de líneas.
3. Las líneas **no se cruzan**.

```grafico
titulo: Dipolo eléctrico: las líneas salen de la $+$ y entran en la $-$
carga (-1.5, 0) ; +1
carga (1.5, 0) ; -1
x: -3.5..3.5
y: -2.2..2.2
```

```grafico
titulo: Dos cargas positivas iguales: en el medio, ahí no hay campo
carga (-1.5, 0) ; +1
carga (1.5, 0) ; +1
(0, 0) ; "$E = 0$"
x: -3.5..3.5
y: -2.2..2.2
```

## Flujo eléctrico

El número de líneas que atraviesan un área es proporcional al campo por el área perpendicular:

$$
\frac{N.^\circ\ \text{de líneas}}{A_\perp} \propto E \quad\then\quad N.^\circ\ \text{de líneas} \propto E\cdot A_\perp
$$

::: definicion Flujo eléctrico
$$
\Phi_E = E\,A_\perp = E\,A\cos\theta = \vec E\cdot\vec A \qquad [\Phi_E] = \frac{\text{N}}{\text{C}}\,\text{m}^2
$$

con $\vec A$ el **vector normal al área** (de módulo igual al área) y $\theta$ el ángulo entre $\vec E$ y $\vec A$. El flujo es proporcional al número de líneas que atraviesan el área.
:::

| Caso | $\theta$ | Flujo |
|---|---|---|
| $\vec E \parallel \vec A$ (el área enfrenta al campo) | $0°$ | máximo: $\Phi_E = E\,A$ |
| área inclinada | $\theta$ | $\Phi_E = E\,A\cos\theta$ |
| $\vec E \perp \vec A$ (el campo pasa rasante) | $90°$ | nulo: $\Phi_E = 0$ |

$$
\Phi_E = E\,A\underbrace{\cos 0°}_{1} \quad>\quad \Phi_E = E\,A\cos\theta \quad>\quad \Phi_E = E\,A\underbrace{\cos 90°}_{0}
$$

### Si el área es irregular (o el campo no es uniforme)

Se parte el área en pedacitos $\Delta\vec A_i$, en cada uno el campo es casi constante, y se suma:

$$
\Phi_E = \sum \vec E_i\cdot\Delta\vec A_i \quad\then\quad \Phi_E = \int \vec E\cdot\dd\vec A
$$

## Ley de Gauss

::: ley de Gauss
**El flujo eléctrico neto a través de una superficie cerrada es igual a la carga encerrada dividida por la permitividad del vacío:**

$$
\Phi_E = \oint \vec E\cdot\dd\vec A = \frac{q_{int}}{\varepsilon_0}
$$

$\varepsilon_0$ es la **permitividad del vacío**:

$$
\varepsilon_0 = \frac{1}{4\pi k_0} = 8{,}85\times10^{-12}\ \frac{\text{C}^2}{\text{N}\,\text{m}^2} \qquad\qquad k_0 = 9\times10^9\ \frac{\text{N}\,\text{m}^2}{\text{C}^2}
$$
:::

- Si $\Phi_E = 0$, es porque **entran y salen la misma cantidad de líneas** (no hay carga neta adentro, aunque haya campo).
- Solo vale para superficies **cerradas**.

::: demostracion Para una carga puntual
Se toma una esfera de radio $r$ con la carga $q$ en el centro (Serway, sec. 24.2). En todos los puntos de la esfera:

1. $E$ es **uniforme** (todos están a la misma distancia $r$);
2. $\vec E \parallel \dd\vec A$ (los dos son radiales): $\theta = 0°$, $\cos\theta = 1$.

::: pasos
\Phi_E = \oint \vec E\cdot\dd\vec A = E\oint \dd A          // por 1) y 2)
       = k_0\,\frac{q_{int}}{r^2}\cdot 4\pi r^2              // campo de una carga puntual y área de la esfera
       = \frac{1}{4\pi\varepsilon_0}\,q_{int}\,4\pi          // $k_0 = \frac{1}{4\pi\varepsilon_0}$
       = \frac{q_{int}}{\varepsilon_0}
:::

El resultado no depende de $r$: cualquier superficie cerrada que encierre la carga tiene el mismo flujo.
:::

## Aplicación 1: esfera sólida cargada uniformemente

Una esfera de radio $a$ con carga $Q$ repartida en todo su volumen (Serway, ej. 24.3). Por simetría, $\vec E$ es radial y su módulo depende solo de $r$: se usa una **esfera gaussiana** de radio $r$, concéntrica.

### A) Campo afuera de la esfera ($r > a$)

La esfera gaussiana encierra **toda** la carga $Q$:

::: pasos
\oint \vec E\cdot\dd\vec A = \frac{q_{int}}{\varepsilon_0}
E\oint \dd A = \frac{Q}{\varepsilon_0}
E\cdot 4\pi r^2 = \frac{Q}{\varepsilon_0}
E = \frac{Q}{4\pi\varepsilon_0\,r^2} = k_0\,\frac{Q}{r^2}
:::

Desde afuera, **es como considerar al cuerpo una sola carga** puesta en el centro: $E \propto \dfrac{1}{r^2}$.

### B) Campo adentro de la esfera ($r < a$)

Ahora la esfera gaussiana encierra solo **una parte** de la carga. Con la **densidad volumétrica de carga**

$$
\rho = \frac{Q}{V} = \frac{Q}{\frac{4}{3}\pi a^3} = \frac{q_{int}}{\frac{4}{3}\pi r^3} \quad\then\quad q_{int} = \rho\cdot\frac{4}{3}\pi r^3
$$

::: pasos
E\oint \dd A = \frac{\rho\cdot\frac{4}{3}\pi r^3}{\varepsilon_0}
E\cdot 4\pi r^2 = \frac{Q}{\frac{4}{3}\pi a^3}\cdot\frac{\frac{4}{3}\pi r^3}{\varepsilon_0}
E = \frac{Q}{4\pi\varepsilon_0}\cdot\frac{r}{a^3} = k_0\,\frac{Q\,r}{a^3}
:::

::: resultado Esfera sólida con carga uniforme
$$
E = k_0\,\frac{Q\,r}{a^3} \quad (r < a) \qquad\qquad E = k_0\,\frac{Q}{r^2} \quad (r > a) \qquad\qquad E = k_0\,\frac{Q}{a^2} \quad (r = a)
$$
:::

Adentro, $E \propto r$ (crece linealmente desde $0$ en el centro); afuera, $E \propto \dfrac{1}{r^2}$. En la superficie, $r = a$, las dos fórmulas dan lo mismo.

```grafico
titulo: $E$ en función de $r$ (con $a = 1$): lineal adentro, $\frac{1}{r^2}$ afuera
y = x ; x: 0..1 ; azul ; gruesa ; "$E = k_0\frac{Q\,r}{a^3}$"
y = 1/x^2 ; x: 1..4 ; rojo ; gruesa ; "$E = k_0\frac{Q}{r^2}$"
segmento (1, 0) (1, 1) ; gris ; punteada
texto (1, -0.12) "$a$"
x: 0..4
y: -0.2..1.3
```

## Densidades de carga

| Distribución | Densidad | Unidad |
|---|---|---|
| lineal (hilo) | $\lambda = \dfrac{Q}{L}$ | $\dfrac{\text{C}}{\text{m}}$ |
| superficial (placa) | $\sigma = \dfrac{Q}{A}$ | $\dfrac{\text{C}}{\text{m}^2}$ |
| volumétrica (esfera sólida) | $\rho = \dfrac{Q}{V}$ | $\dfrac{\text{C}}{\text{m}^3}$ |

Las aplicaciones 2 (hilo) y 3 (placa) siguen en [[Ley de Gauss: hilo infinito y placas]].
