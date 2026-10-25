# Magnetismo: campo magnético y fuerza sobre una carga

*Clase teórica sin fecha en la hoja (viene después de la del 15/09). Completado con el Serway, cap. 29 (Campos magnéticos), sec. 29.1. Es el comienzo de **inducción**, que entra en el parcial 2.*

::: claves
**Parcial 2: 27 de octubre.**
:::

## Un poco de historia

- **800 a. C.**: los griegos descubren la **magnetita** ($\text{Fe}_3\text{O}_4$), que **atrae trozos de hierro**.
- **Polos magnéticos**: todo imán tiene dos polos, **norte** y **sur**. Polos **iguales se repelen** y polos **distintos se atraen**. A diferencia de las cargas, los polos no se pueden separar: si se corta un imán, cada pedazo vuelve a tener un norte y un sur.
- **La Tierra es un gran imán**: por eso la brújula apunta al norte.
- **1819–1820: relación entre la electricidad y el magnetismo.**
  - **Oersted**: una **corriente eléctrica genera un campo magnético** (desvía la aguja de una brújula).
  - **Faraday** y **Henry**: un **campo magnético** que varía **produce corriente eléctrica** (es la inducción).

```grafico
titulo: Polos distintos se atraen (N frente a S); polos iguales se repelen (N frente a N)
animar: no
poligono (-4.6, 0.9) (-3.6, 0.9) (-3.6, 1.5) (-4.6, 1.5) ; rojo ; ""
poligono (-3.6, 0.9) (-2.6, 0.9) (-2.6, 1.5) (-3.6, 1.5) ; azul ; ""
texto (-4.1, 1.2) "N"
texto (-3.1, 1.2) "S"
poligono (-1.8, 0.9) (-0.8, 0.9) (-0.8, 1.5) (-1.8, 1.5) ; rojo ; ""
poligono (-0.8, 0.9) (0.2, 0.9) (0.2, 1.5) (-0.8, 1.5) ; azul ; ""
texto (-1.3, 1.2) "N"
texto (-0.3, 1.2) "S"
vector (-2.7, 0.55) (-2, 0.55) ; verde ; ""
vector (-1.7, 0.55) (-2.4, 0.55) ; verde ; ""
poligono (1, -0.9) (2, -0.9) (2, -0.3) (1, -0.3) ; azul ; ""
poligono (2, -0.9) (3, -0.9) (3, -0.3) (2, -0.3) ; rojo ; ""
texto (1.5, -0.6) "S"
texto (2.5, -0.6) "N"
poligono (3.4, -0.9) (4.4, -0.9) (4.4, -0.3) (3.4, -0.3) ; rojo ; ""
poligono (4.4, -0.9) (5.4, -0.9) (5.4, -0.3) (4.4, -0.3) ; azul ; ""
texto (3.9, -0.6) "N"
texto (4.9, -0.6) "S"
vector (2.6, -1.25) (1.9, -1.25) ; rojo ; ""
vector (3.8, -1.25) (4.5, -1.25) ; rojo ; ""
x: -5..6
y: -1.8..2
alto: 220
```

::: aclaracion
En la hoja quedó «1300 d. C. → la Tierra es un gran imán». Según el Serway (cap. 29), en **1269** Pierre de Maricourt describió los **polos** de un imán, y la idea de que **la Tierra es un imán gigante** es de William **Gilbert**, en **1600**. En la hoja, los nombres y los descubrimientos de 1819–1820 quedaron intercalados y no queda claro cuál va con cuál: la corriente que genera campo magnético es el descubrimiento de **Oersted**; el campo que produce corriente, el de **Faraday** y **Henry**.
:::

## Campo magnético

El **campo magnético** $\vec B$ es el que rodea a un imán o a una corriente. Está **creado por**:

- un **imán permanente**;
- una **corriente eléctrica** (cargas en movimiento).

Su dirección en cada punto es hacia donde apunta la aguja de una brújula. Afuera del imán, las líneas de campo salen del polo norte y entran en el sur (Serway, sec. 29.1).

## Fuerza magnética sobre una carga

Una carga $q$ que **se mueve** con velocidad $\vec v$ dentro de un campo $\vec B$ siente una fuerza magnética $\vec F_B$. Lo que se ve en los experimentos:

1. $F_B \propto q$: es proporcional a la carga.
2. $F_B \propto v$: es proporcional a la **velocidad** de la carga. **Una carga quieta no siente fuerza magnética.**
3. Si $\vec B \parallel \vec v$ (la carga se mueve a lo largo de las líneas de campo), $F_B = 0$.
4. Si $\vec B \perp \vec v$, la fuerza es **máxima**.
5. Si $0 < \theta < 90°$ (ángulo entre $\vec v$ y $\vec B$), $0 < F_B < F_{B\,max}$.
6. $\vec F_B \perp \vec B$ y $\vec F_B \perp \vec v$: la fuerza es **perpendicular al plano que forman $\vec B$ y $\vec v$**.
7. La fuerza sobre una carga positiva es opuesta a la fuerza sobre una negativa que se mueve igual: $\vec F_B(q^+) = -\vec F_B(q^-)$.

```grafico
titulo: Casos 3, 4 y 5: con $\vec B$ hacia la derecha, solo cuenta la parte de $\vec v$ perpendicular a $\vec B$
animar: no
vector (-4.6, 1.6) (-2.4, 1.6) ; gris ; ""
vector (-4.6, 0.8) (-2.4, 0.8) ; gris ; ""
vector (-4.6, 0) (-2.4, 0) ; gris ; ""
vector (-4.6, -0.8) (-2.4, -0.8) ; gris ; ""
vector (-4.2, 0.4) (-3, 0.4) ; rojo ; "$\vec v$"
texto (-3.5, -1.5) "$\vec B \parallel \vec v$: $F_B = 0$"
vector (-1.1, 1.6) (1.1, 1.6) ; gris ; ""
vector (-1.1, 0.8) (1.1, 0.8) ; gris ; ""
vector (-1.1, 0) (1.1, 0) ; gris ; ""
vector (-1.1, -0.8) (1.1, -0.8) ; gris ; ""
vector (0, -0.4) (0, 1.2) ; rojo ; "$\vec v$"
texto (0, -1.5) "$\vec B \perp \vec v$: máxima"
vector (2.4, 1.6) (4.6, 1.6) ; gris ; ""
vector (2.4, 0.8) (4.6, 0.8) ; gris ; ""
vector (2.4, 0) (4.6, 0) ; gris ; ""
vector (2.4, -0.8) (4.6, -0.8) ; gris ; ""
vector (3, -0.4) (3.9, 0.9) ; rojo ; "$\vec v$"
texto (3.5, -1.5) "$0 < F_B < F_{max}$"
texto (4.85, 1.6) "$\vec B$"
x: -5..5.3
y: -1.9..2
alto: 240
```

Todo eso lo resume un producto vectorial:

::: resultado Fuerza magnética sobre una carga en movimiento
$$
\vec F_B = q\,\vec v \times \vec B
$$

- **Módulo**: $F_B = |q|\,v\,B\,\sen\theta$, con $\theta$ el ángulo entre $\vec v$ y $\vec B$. Con $\theta = 0°$ da $0$ (caso 3) y con $\theta = 90°$ da el máximo, $|q|\,v\,B$ (caso 4).
- **Dirección**: perpendicular al plano de $\vec v$ y $\vec B$.
- **Sentido**: **regla de la mano derecha**. Los dedos apuntan como $\vec v$ y se cierran hacia $\vec B$; el pulgar da el sentido de $\vec F_B$ para una carga **positiva**. Para una negativa, al revés.
:::

::: aclaracion
En la hoja quedó $\vec F_B = q\,\vec B \times \vec v$. El orden importa: $\vec B \times \vec v = -\vec v \times \vec B$, así que escrito así da la fuerza **al revés**. Lo correcto es $\vec F_B = q\,\vec v \times \vec B$ (Serway, ec. 29.1). El módulo, $q\,v\,B\,\sen\theta$, es el mismo.
:::

```grafico3d
titulo: $\vec F_B = q\,\vec v\times\vec B$ es perpendicular a $\vec v$ y a $\vec B$ (carga positiva)
alto: 380
vector (0, 0, 0) (2, 0, 0) ; rojo ; "$\vec v$"
vector (0, 0, 0) (1, 1.7, 0) ; azul ; "$\vec B$"
vector (0, 0, 0) (0, 0, 1.8) ; verde ; "$\vec F_B$"
poligono (0, 0, 0) (2, 0, 0) (3, 1.7, 0) (1, 1.7, 0) ; ambar ; ""
texto (0.55, 0.35, 0) "$\theta$"
x: -0.5..3
y: -0.5..2
z: 0..2
```

**Unidad**: de $F_B = q\,v\,B$ sale $[B] = \dfrac{\text{N}}{\text{C}\cdot\text{m/s}} = \dfrac{\text{N}}{\text{A}\cdot\text{m}} = \text{T}$ (**tesla**). También se usa el gauss: $1\,\text{T} = 10^4\,\text{G}$. El campo de la Tierra es de alrededor de $0{,}5\times10^{-4}\,\text{T}$ (Serway, sec. 29.1).

::: ejemplo Un electrón se mueve a $8\times10^{6}\,\text{m/s}$ por el eje $x$, en un campo magnético de $0{,}025\,\text{T}$ que forma un ángulo de $60°$ con el eje $x$ (en el plano $xy$). ¿Cuánto vale la fuerza magnética sobre el electrón y hacia dónde apunta?
::: solucion
Es el ejemplo 29.1 del Serway. **Módulo**, con $|q| = 1{,}6\times10^{-19}\,\text{C}$:

::: pasos
F_B = |q|\,v\,B\,\sen\theta
= 1{,}6\times10^{-19}\,\text{C}\cdot 8\times10^{6}\,\tfrac{\text{m}}{\text{s}}\cdot 0{,}025\,\text{T}\cdot\sen 60°
\approx 2{,}8\times10^{-14}\ \text{N}
:::

**Sentido**: $\vec v$ va por $+x$ y $\vec B$ está en el plano $xy$, así que $\vec v\times\vec B$ apunta hacia $+z$ (mano derecha). Pero el electrón es **negativo**: la fuerza va al revés, hacia $-z$.

::: resultado
$$
F_B \approx 2{,}8\times10^{-14}\ \text{N}, \text{ en el sentido } -z
$$
:::
:::
:::
