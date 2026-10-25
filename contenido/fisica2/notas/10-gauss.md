# Ley de Gauss: hilo infinito y placas

*Clase teórica del 30/06. En tu hoja de esta clase quedaron solo los títulos de los puntos 2 y 3; el desarrollo sale de las notas de otra persona de la misma clase y del Serway, cap. 24 (Ley de Gauss).*

::: ley de Gauss
$$
\oint \vec E\cdot \dd\vec A = \frac{q_{int}}{\varepsilon_0} \qquad\qquad k_0 = \frac{1}{4\pi\varepsilon_0} = 9\times 10^9\ \frac{\text{N}\,\text{m}^2}{\text{C}^2}
$$

El flujo del campo a través de una superficie **cerrada** (gaussiana) es la carga encerrada sobre $\varepsilon_0 = 8{,}85\times10^{-12}\ \frac{\text{C}^2}{\text{N}\,\text{m}^2}$.
:::

Sirve para calcular $E$ cuando la distribución tiene **simetría**: se elige una superficie gaussiana donde $E$ sea constante en magnitud y perpendicular a la superficie (así $\oint \vec E\cdot\dd\vec A = E\oint \dd A$), o paralelo a ella (ahí no hay flujo).

La aplicación 1 (esfera sólida cargada) se vio en la clase anterior: [[Líneas de campo, flujo y ley de Gauss]].

## 2) Hilo infinito cargado uniformemente

Un hilo infinito con carga $Q$ en una longitud $L$ tiene **densidad lineal de carga**

$$
\lambda = \frac{Q}{L} \qquad \left[\frac{\text{C}}{\text{m}}\right]
$$

Por simetría, $\vec E$ es **radial** (perpendicular al hilo) y tiene el mismo valor en todos los puntos a la misma distancia $r$. La superficie gaussiana es un **cilindro** coaxial de radio $r$ y largo $\ell$:

- en la superficie lateral, $\vec E \parallel \dd\vec A$ y $E$ es constante: el flujo es $E\cdot 2\pi r\,\ell$;
- en las tapas, $\vec E \perp \dd\vec A$: no hay flujo.

```grafico
titulo: Vista de frente: el hilo sale de la pantalla y las líneas de campo son radiales
carga (0, 0) ; +1
x: -3..3
y: -2.2..2.2
```

::: pasos
\oint \vec E\cdot\dd\vec A = \frac{q_{int}}{\varepsilon_0}
E\oint \dd A = \frac{\lambda\,\ell}{\varepsilon_0}          // la carga encerrada es la del pedazo de hilo de largo $\ell$
E\,2\pi r\,\ell = \frac{\lambda\,\ell}{\varepsilon_0}       // área lateral del cilindro: $2\pi r\,\ell$
E = \frac{\lambda}{2\pi\varepsilon_0\,r}
  = 2k_0\,\frac{\lambda}{r}                                  // $\frac{1}{2\pi\varepsilon_0} = 2\cdot\frac{1}{4\pi\varepsilon_0} = 2k_0$
:::

::: resultado Campo de un hilo infinito
$$
E = \frac{\lambda}{2\pi\varepsilon_0\,r} = 2k_0\,\frac{\lambda}{r}
$$
:::

::: observacion
El campo del hilo baja como $\frac{1}{r}$, más lento que el de una carga puntual ($\frac{1}{r^2}$). Si el hilo no fuera infinito, cerca de las puntas $E$ ya no sería perpendicular ni constante sobre el cilindro, y Gauss no alcanzaría; lejos de las puntas, la fórmula es una buena aproximación (Serway, ej. 24.4).
:::

## 3) Placa cargada uniformemente

Una placa (plano infinito) con carga $Q$ en un área $A$ tiene **densidad superficial de carga**

$$
\sigma = \frac{Q}{A} \qquad \left[\frac{\text{C}}{\text{m}^2}\right]
$$

$\vec E$ es perpendicular a la placa y apunta hacia afuera **de los dos lados**. La superficie gaussiana es un cilindro chico que atraviesa la placa, con tapas de área $\pi r^2$ a los dos lados:

```grafico
titulo: Una placa positiva: el campo sale perpendicular, hacia los dos lados
placa (-2.5, 0) (2.5, 0) ; +
x: -3..3
y: -2..2
```

::: pasos
\oint \vec E\cdot\dd\vec A = \frac{q_{int}}{\varepsilon_0}
E\cdot 2\pi r^2 = \frac{\sigma\,\pi r^2}{\varepsilon_0}       // flujo por las **dos** tapas; por la superficie lateral no hay
E = \frac{\sigma}{2\varepsilon_0}
:::

::: resultado Campo de una placa infinita
$$
E = \frac{\sigma}{2\varepsilon_0}
$$
:::

::: aclaracion
En la clase quedó $E\oint \dd A = \frac{\sigma\,\pi r^2}{\varepsilon_0}$ y $E = \frac{\sigma}{\varepsilon_0}$: se contó el flujo de **una** sola tapa. Para una placa sola el campo sale por las dos tapas y da $\frac{\sigma}{2\varepsilon_0}$ (Serway, ej. 24.5; la guía también lo usa así en el ejercicio 7.3). $\frac{\sigma}{\varepsilon_0}$ es el campo justo afuera de la superficie de un **conductor** (adentro de un conductor $E = 0$, así que solo hay flujo por una tapa), y es también el campo **entre dos placas** opuestas, como se ve abajo.
:::

## Dos placas cargadas con $\sigma_1 = -\sigma_2$

Cada placa hace un campo $\frac{\sigma}{2\varepsilon_0}$: el de la positiva sale de ella y el de la negativa entra en ella.

- **Afuera** de las placas, los dos campos tienen sentidos opuestos y se cancelan: $\vec E = 0$.
- **Entre** las placas, tienen el mismo sentido (de la $+$ a la $-$) y se suman: $\vec E = \vec E_1 + \vec E_2$.

```grafico
titulo: Dos placas opuestas: campo uniforme entre ellas y nulo afuera
placa (-2.5, 1) (2.5, 1) ; +
placa (-2.5, -1) (2.5, -1) ; -
x: -3..3
y: -2..2
```

::: resultado Campo entre dos placas opuestas
$$
E = E_1 + E_2 = \frac{\sigma}{2\varepsilon_0} + \frac{\sigma}{2\varepsilon_0} = \frac{\sigma}{\varepsilon_0}
$$
:::

Es el campo de un **capacitor de placas paralelas** (ver [[Capacitancia y capacitores]]).
