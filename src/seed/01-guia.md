# Guía: cómo escribir matemática acá

Las notas son Markdown con fórmulas en LaTeX. Pasá a **Editar** (tecla `E`) para ver el código de esta guía. Mientras escribís, debajo del editor se ve la fórmula donde está el cursor y, si tiene un error, qué falla.

## Fórmulas

En el texto van entre signos `$`: la integral $\iint_R f(x;y)\,\dA$ sobre $R = [a;b]\times[c;d]$. Centradas, entre `$$`:

$$
\iint_R f(x;y)\,\dA = \lim_{\substack{n\to\infty \\ m\to\infty}} \sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}
$$

Con `\label{nombre}` la ecuación se numera sola y se cita con `\eqref{nombre}`:

$$
\int_c^d f(x;y)\,\dy = F(x) \label{F}
$$

Pasá el mouse por \eqref{F}: aparece la ecuación sin tener que volver arriba. Un clic lleva hasta ella.

::: claves
- Atajos: `\R` ($\R$), `\sen`, `\tg`, `\arctg`, `\dx` ($\dx$), `\dA`, `\abs{x}` ($\abs{x}$), `\eval{F(x)}{a}{b}` ($\eval{F(x)}{a}{b}$), `\pd{f}{x}` ($\pd{f}{x}$).
- Para seguir qué cambia entre un paso y el siguiente: `\hl{…}`, `\hlb{…}` y `\hlc{…}` resaltan en tres colores: $\hl{\int_a^b} F(x)\,\dx$, $\hlb{F(x)}$, $\hlc{\dx}$.
- `\cancel{x}` tacha ($\cancel{x}$) y `\underbrace{…}_{\text{nota}}` explica una parte.
:::

## Pasos: desarrollos largos que se leen

Cada renglón es un paso. Los `=` quedan alineados y, después de `//`, va **por qué** se hace ese paso. Un renglón que solo tiene `// texto` es narración.

```md
::: pasos
I_R = \int_0^2 \dy \int_1^2 x^2 y^3\,\dx
    = \int_0^2 y^3\,\dy \int_1^2 x^2\,\dx      // $y^3$ es constante para $x$
    = \int_0^2 y^3\,\dy \cdot \eval{\frac{x^3}{3}}{1}{2}
    = \frac{7}{3}\int_0^2 y^3\,\dy              // $\frac{8}{3}-\frac{1}{3}=\frac{7}{3}$
    = \frac{7}{3}\cdot\eval{\frac{y^4}{4}}{0}{2} = \frac{28}{3}
:::
```

::: pasos
I_R = \int_0^2 \dy \int_1^2 x^2 y^3\,\dx
    = \int_0^2 y^3\,\dy \int_1^2 x^2\,\dx      // $y^3$ es constante para $x$
    = \int_0^2 y^3\,\dy \cdot \eval{\frac{x^3}{3}}{1}{2}
    = \frac{7}{3}\int_0^2 y^3\,\dy              // $\frac{8}{3}-\frac{1}{3}=\frac{7}{3}$
    = \frac{7}{3}\cdot\eval{\frac{y^4}{4}}{0}{2} = \frac{28}{3}
:::

## Teoremas y demostraciones

Cajas con `:::`: `teorema`, `lema`, `proposicion`, `corolario`, `definicion`, `propiedades`, `demostracion`, `idea`, `ejemplo`, `ejercicio`, `solucion` (desplegable), `resultado` (recuadro), `observacion`, `claves`, `ojo` y `aclaracion` (lo que no sale del apunte). Se pueden anidar. Dentro de un teorema, los renglones que empiezan con `H)` y `T)` se marcan como hipótesis y tesis. Con `{#nombre}` al final del título se cita con `\ref{nombre}`.

::: teorema Integrales iteradas {#iteradas}
H) $f(x;y)$ integrable en $R = [a;b]\times[c;d]$.
T) $\displaystyle \iint_R f(x;y)\,\dx\,\dy = \int_a^b \dx \int_c^d f(x;y)\,\dy = \int_c^d \dy \int_a^b f(x;y)\,\dx$
:::

::: idea
Integrar primero en $y$ da el área $F(x)$ de un corte; sumar esos cortes en $x$ da el volumen.
:::

::: demostracion
::: pasos
V = \lim_{\max\Delta x \to 0} \sum_{i=1}^{n} F(\varepsilon_i)\,\Delta x_i   // volumen como suma de rebanadas
  = \int_a^b F(x)\,\dx                                                     // definición de integral simple
  = \int_a^b \left[\int_c^d f(x;y)\,\dy\right]\dx                          // por \eqref{F}
:::
:::

Arriba, **Paso a paso** muestra la demostración de a un paso (→ o espacio para avanzar). La caja se cita así: \ref{iteradas}.

::: resultado
$$
\iint_D f(x;y)\,\dx\,\dy = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} f(x;y)\,\dy
$$
:::

## Gráficos en el plano

Un bloque ` ```grafico ` con un objeto por renglón, escrito como en el pizarrón. Después de `;` van opciones: una etiqueta entre comillas, un color (`rojo`, `azul`, `verde`, `ambar`, `violeta`, `rosa`, `gris`), `punteada`, `gruesa`, `rayado`, `flecha` (en una curva, marca el sentido de recorrido: hacia donde crece $x$, $y$ o $t$).

````md
```grafico
titulo: Región $D$ de tipo 1
y = 5 - x^2
y = -1 - x
-1 - x <= y <= 5 - x^2 ; "$D$" ; rayado
(-2, 1) ; "$(-2;1)$"
(3, -4) ; "$(3;-4)$"
```
````

```grafico
titulo: Región $D$ de tipo 1
y = 5 - x^2
y = -1 - x
-1 - x <= y <= 5 - x^2 ; "$D$" ; rayado
(-2, 1) ; "$(-2;1)$"
(3, -4) ; "$(3;-4)$"
```

| Escribís | Se dibuja |
|---|---|
| `y = sen(x)` · `x = y^2` | curva (también $x$ en función de $y$) |
| `x^2 + y^2 = 9` | curva implícita |
| `r = 1 + cos(θ)` | curva polar |
| `(cos(t), sen(t)) ; t: 0..pi` | curva paramétrica |
| `x^2 <= y <= sqrt(x)` · `1 <= r <= 2, 0 <= θ <= pi/2` | región (tipo 1, tipo 2, polar…) |
| `(1, 2) ; "$P$"` · `segmento (0,0) (1,1)` · `vector …` · `poligono …` · `texto (1, 2) "$D_1$"` | puntos y figuras |

Ajustes, uno por renglón: `x: -3..3`, `y: …`, `titulo: …`, `aspecto: libre`, `alto: 300`, `marcas: pi`, `grilla: no`, `leyenda: no`, `ejes: u, v` (otros nombres para los ejes). Casi nunca hacen falta: el rango sale solo. Se escribe como en la cursada: `2x`, `x y`, `sen^2(x)`, `|x|`, `raiz(x)`, `e^(-x)`. Arrastrá para mover, Ctrl + ruedita para acercar, doble clic para volver.

## Gráficos en el espacio

Lo mismo en ` ```grafico3d `. Un sólido se escribe tal cual su definición: una variable entre dos cotas y la región de la base.

````md
```grafico3d
titulo: Sólido del primer octante bajo $z = 2x+2$, sobre $z = 2$ y dentro de $x^2+y^2 = 9$
2 <= z <= 2x + 2, x^2 + y^2 <= 9, x >= 0, y >= 0
```
````

```grafico3d
titulo: Sólido del primer octante bajo $z = 2x+2$, sobre $z = 2$ y dentro de $x^2+y^2 = 9$
2 <= z <= 2x + 2, x^2 + y^2 <= 9, x >= 0, y >= 0
```

| Escribís | Se dibuja |
|---|---|
| `z = 4 - x^2 - y^2` | superficie (también `x = …`, `y = …`) |
| `z = … ; sobre x^2 + y^2 <= 4 ; sombra` | superficie sobre una región, con $D$ abajo |
| `0 <= z <= 4 - x^2 - y^2, x^2 + y^2 <= 4` | sólido entre dos superficies |
| `x^2 + y^2 = 9 ; z: 0..8` | cilindro |
| `z = … ; corte x = 1` · `z = … ; prismas 6x6` | corte (Fubini) · prismas de Riemann |
| `(u cos(v), u sen(v), u) ; u: 0..1` · `(cos(t), sen(t), t/4)` | superficie paramétrica · curva |

Arrastrá para girar; **⊤** lo muestra desde arriba.

```grafico3d
titulo: Suma de Riemann: prismas de base $\Delta A_{ij}$ y altura $f(x_{ij};y_{ij})$
z = 1 + x^2/4 + y^2/6 ; prismas 5x6
x: 0..2
y: 0..3
```

## Campo eléctrico

En un ` ```grafico `, las cargas y las placas dibujan solas sus líneas de campo: salen de las positivas y terminan en las negativas. Un brillo las recorre en el sentido del campo, más rápido donde el campo es más intenso.

````md
```grafico
titulo: Dipolo
carga (-1.5, 0) ; +1
carga (1.5, 0) ; -1
```
````

```grafico
titulo: Dipolo
carga (-1.5, 0) ; +1
carga (1.5, 0) ; -1
```

| Escribís | Se dibuja |
|---|---|
| `carga (0, 0) ; +2` | carga puntual (el número es la carga, con su signo) |
| `placa (-2, 1) (2, 1) ; +` | placa cargada (`+` o `−`); dos placas opuestas forman un capacitor |
| `campo (y, -x)` | un campo cualquiera, dado por sus componentes $(E_x;\,E_y)$ |

Ajustes: `lineas: 12` (más o menos líneas por carga) y `animar: no`. El botón **⏸** pausa el brillo; si el sistema tiene activado "reducir movimiento", no se anima.

## Circuitos

Un bloque ` ```circuito ` con un componente por renglón, entre puntos de una grilla ($y$ hacia arriba). Después de `;` van el valor (Ω para resistencias, V para baterías), una etiqueta entre comillas o el lado donde va la etiqueta (`arriba`, `abajo`, `izquierda`, `derecha`; si no se dice, lo de los bordes la lleva hacia afuera).

````md
```circuito
titulo: Dos mallas
cable (0,0) (0,4)
R (0,4) (4,4) ; 2
cable (4,4) (4,2)
R (0,2) (2,2) ; 6
bateria (4,2) (2,2) ; 10
R (4,2) (4,0) ; 4
bateria (0,0) (4,0) ; 14
nodo (0,2) ; "a"
corriente (0,2.6) (0,3.6) ; "$I_3$"
malla (2,3) ; horaria
```
````

```circuito
titulo: Dos mallas
cable (0,0) (0,4)
R (0,4) (4,4) ; 2
cable (4,4) (4,2)
R (0,2) (2,2) ; 6
bateria (4,2) (2,2) ; 10
R (4,2) (4,0) ; 4
bateria (0,0) (4,0) ; 14
nodo (0,2) ; "a"
corriente (0,2.6) (0,3.6) ; "$I_3$"
malla (2,3) ; horaria
```

| Escribís | Se dibuja |
|---|---|
| `R (0,0) (2,0) ; 6` | resistencia de $6\,\Omega$ |
| `bateria (0,0) (0,2) ; 12` | batería de $12\,\text{V}$, con el $+$ del lado del segundo punto; `; r=0,5` le agrega resistencia interna |
| `cable (0,2) (3,2) (3,0)` | cable de uno o más tramos |
| `capacitor` · `amperimetro` · `voltimetro` · `interruptor … ; cerrado` | otros componentes (entre dos puntos) |
| `nodo (0,2) ; "a"` · `tierra (0,0)` · `etiqueta (1,1) "texto"` | nudos, tierra y textos |
| `corriente (0,0.5) (0,1.5) ; "$I_1$"` | flecha con el sentido que proponés para la corriente |
| `malla (1,1) ; horaria` | sentido de recorrido de una malla |

**El brillo** recorre los cables en el sentido de la corriente. Si todas las resistencias y baterías tienen valor, la app resuelve el circuito con las leyes de Kirchhoff: el sentido es el real y el brillo va más rápido donde pasa más corriente. Si no, sigue tus flechas de corriente. El botón **I** muestra las corrientes calculadas: junto a cada flecha aparece su valor, y si da negativo, la corriente va al revés de lo propuesto. `flujo: electrones` invierte el brillo para ver el movimiento de los electrones.

## Imágenes

Pegalas (Ctrl+V), arrastralas al editor o usá **▣ Imagen**. En el texto alternativo, `|60%` fija el ancho e `|invertir` oscurece de noche un gráfico de fondo blanco: `![Región D|60%|invertir](/media/…)`.

## Otros atajos

- `Ctrl+M`: fórmula · `Ctrl+Shift+M`: ecuación · `Ctrl+S`: guardar · `Ctrl+K`: buscar · `Ctrl+B` (fuera del editor): esconder el mapa · `Esc`: volver a la vista.
- `[[Título de otra nota]]` enlaza otra nota del árbol.
- **A− / A+** arriba cambian el tamaño de letra; **⤓** descarga todo el mapa como un HTML con los dos temas.
