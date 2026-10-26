# TP3 de laboratorio: ley de Ohm y leyes de Kirchhoff

Resumen para la **pregunta de laboratorio del parcial** (vale 1 punto). Lo típico es *"explicar la experiencia y las fórmulas utilizadas"*. Sale de la guía de laboratorio (temas 5 y 6: *Ley de Ohm, circuitos serie, paralelo y mixto* y *Reglas de Kirchhoff*) y del pizarrón de la clase (donde figura como *TPL Nº 4*). La teoría está en [[Conexión de resistores y leyes de Kirchhoff]].

::: claves
- **Objetivo:** verificar experimentalmente la **ley de Ohm**, las fórmulas de **resistencias en serie y en paralelo** y las **leyes de Kirchhoff**, comparando lo **calculado** (teoría) con lo **medido** (práctica).
- **Materiales:** fuente de tensión continua regulable, tablero con resistencias, cables con cocodrilos y **multímetro**, usado como óhmetro, voltímetro y amperímetro.
- **Voltímetro en paralelo, amperímetro en serie** (hay que abrir el circuito), **óhmetro sin tensión**.
:::

## La experiencia, paso a paso

| Parte | Qué se hizo | Qué se verifica |
|---|---|---|
| **A** | Medir con el **óhmetro** tres resistencias por separado: $R_1$, $R_2$, $R_3$. | Sus valores reales. |
| **B** | Conectar dos y después tres resistencias **en serie** y medir la resistencia total. | $R_{ab} = R_1 + R_2 + R_3$ |
| **C** | Conectar dos y después tres **en paralelo** y medir la resistencia total. | $\dfrac{1}{R_{ab}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dfrac{1}{R_3}$ |
| **D** | **Circuito serie** con la fuente: medir la tensión de la fuente $E_T$, la caída en cada resistencia y la corriente. | $E_T = V_{R_1} + V_{R_2} + V_{R_3}$ e $I_T = I_1 = I_2 = I_3$ |
| **E** | **Circuito mixto** ($R_1$ en serie con $R_2 \parallel R_3$): medir $R_T$, las tensiones y las corrientes. | $E_T = V_{R_1} + V_{AB}$ e $I_T = I_1 = I_2 + I_3$ |

En cada parte se **calcula antes** el valor teórico (con la fuente y las resistencias), se **mide** después y se **comparan**.

```circuito
titulo: Circuito serie (parte D): el amperímetro va en serie; el voltímetro, en paralelo con cada resistencia
bateria (0,0) (0,2.4) ; "$E_T$"
amperimetro (0,2.4) (1.4,2.4)
R (1.4,2.4) (2.8,2.4) ; "$R_1$"
R (2.8,2.4) (4.2,2.4) ; "$R_2$"
cable (4.2,2.4) (5,2.4) (5,1.9)
R (5,1.9) (5,0.5) ; "$R_3$"
cable (5,0.5) (5,0) (0,0)
cable (1.4,2.4) (1.4,3.4)
voltimetro (1.4,3.4) (2.8,3.4)
cable (2.8,3.4) (2.8,2.4)
corriente (0,0.8) (0,1.6) ; "$I$"
```

```circuito
titulo: Circuito mixto (parte E): R₁ en serie con R₂ ∥ R₃; en los nudos A y B la corriente se divide y se vuelve a juntar
bateria (0,0) (0,2.4) ; "$E_T$"
amperimetro (0,2.4) (1.2,2.4)
R (1.2,2.4) (2.6,2.4) ; "$R_1$"
cable (2.6,2.4) (3.4,2.4)
cable (3.4,2.4) (3.4,1.9)
R (3.4,1.9) (3.4,0.5) ; "$R_2$"
cable (3.4,0.5) (3.4,0)
cable (3.4,2.4) (5,2.4) (5,1.9)
R (5,1.9) (5,0.5) ; "$R_3$"
cable (5,0.5) (5,0) (0,0)
nodo (3.4,2.4) ; "A"
nodo (3.4,0) ; "B"
corriente (3.4,2.3) (3.4,1.95) ; "$I_2$"
corriente (4,2.4) (4.6,2.4) ; "$I_3$"
```

## Fórmulas utilizadas

| Ley | Fórmula | Se usó para |
|---|---|---|
| **Ley de Ohm** | $V = I\cdot R \qquad R = \dfrac{V}{I}$ | calcular cada caída de tensión y cada corriente |
| **Serie** | $R_{eq} = R_1 + R_2 + R_3$ · misma $I$ · $V = V_1 + V_2 + V_3$ | partes B y D |
| **Paralelo** | $\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dfrac{1}{R_3}$ (con dos: $\dfrac{R_1 R_2}{R_1 + R_2}$) · misma $V$ · $I = I_1 + I_2 + I_3$ | partes C y E |
| **Mixto** | $R_T = R_1 + \dfrac{R_2\,R_3}{R_2 + R_3}$ | parte E |
| **1ª de Kirchhoff (nudos)** | $\sum I_{entran} = \sum I_{salen}$ → en $A$: $I_1 = I_2 + I_3$ | parte E |
| **2ª de Kirchhoff (mallas)** | en una malla cerrada, $\sum \text{fem} = \sum I\,R$ → $E_T = V_{R_1} + V_{AB}$ | partes D y E |
| **Error** (comparar teoría y práctica) | $e\% = \dfrac{\lvert V_{teórico} - V_{medido}\rvert}{V_{teórico}}\cdot 100$ | conclusiones |

Ejemplo de la guía (serie, $12\,\text{V}$ con $200$, $150$ y $50\,\Omega$): $I = \dfrac{12}{400} = 0{,}03\,\text{A}$; $V_{R_1} = 6\,\text{V}$, $V_{R_2} = 4{,}5\,\text{V}$, $V_{R_3} = 1{,}5\,\text{V}$, y $6 + 4{,}5 + 1{,}5 = 12\,\text{V}$.

## Cómo se usa el multímetro

- **Voltímetro** (selector en **VCC**, tensión continua): se conecta **en paralelo** con lo que se mide, sin abrir el circuito.
- **Amperímetro** (selector en **DCA**, corriente continua): se conecta **en serie**, **abriendo** el circuito para intercalarlo. En el tablero se pide usar la **escala de 10 A**.
- **Óhmetro** ($\Omega$): con la resistencia **sin tensión** y desconectada del circuito.
- **Antes de medir**, se hace el cálculo teórico para elegir una escala que **no supere el fondo de escala** del instrumento.
- **Si la lectura sale negativa** (en el laboratorio dio, por ejemplo, $-36{,}2$), las puntas están conectadas al revés: el valor es el mismo con el signo cambiado.

## Conclusiones y causas de error

- **Serie:** la corriente es la **misma** en todas las resistencias y las caídas de tensión **suman** la tensión de la fuente.
- **Paralelo:** la tensión es la **misma** en todas las ramas y las corrientes **suman** la corriente total.
- **Mixto:** se cumplen las dos leyes de Kirchhoff: en el nudo, $I_1 = I_2 + I_3$; en la malla, $E_T = V_{R_1} + V_{AB}$.
- Los valores medidos son **parecidos pero no iguales** a los calculados, por:
  - la **tolerancia** de las resistencias (su valor real no es exactamente el nominal);
  - la **resistencia interna** de los instrumentos (el amperímetro agrega un poco de resistencia en serie; el voltímetro deriva un poco de corriente);
  - la resistencia de **cables y contactos**;
  - la **precisión** del multímetro y la lectura;
  - el **calentamiento** de las resistencias (efecto Joule), que cambia su valor.

::: tip Respuesta modelo (para 1 punto)
*En el TP se verificaron la ley de Ohm y las leyes de Kirchhoff. Primero se midieron con el óhmetro tres resistencias, y después se conectaron en serie ($R_{eq} = R_1 + R_2 + R_3$) y en paralelo ($\frac{1}{R_{eq}} = \sum\frac{1}{R_i}$), comparando la resistencia medida con la calculada. Luego se armó un circuito serie y uno mixto con una fuente de continua: con el voltímetro en paralelo se midieron las caídas de tensión y con el amperímetro en serie, las corrientes. Se verificó que $V = I\,R$ en cada resistencia, que en la malla la suma de las caídas es igual a la fem ($E_T = \sum V_i$, 2ª ley de Kirchhoff) y que en un nudo la corriente que entra es igual a la que sale ($I_1 = I_2 + I_3$, 1ª ley). Las diferencias entre teoría y práctica se deben a la tolerancia de las resistencias, la resistencia interna de los instrumentos y la de los contactos.*
:::
