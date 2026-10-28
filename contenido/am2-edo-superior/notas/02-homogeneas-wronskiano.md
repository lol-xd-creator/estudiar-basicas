# 2. EDL homogéneas de 2.º orden y wronskiano

$$
y'' + a_1\,y' + a_2\,y = 0 \label{h2}
$$

con $a_1$ y $a_2$ funciones de $x$ o constantes.

## 1) Combinación lineal de soluciones

::: resultado Principio de superposición
Si $y_1$ e $y_2$ son soluciones particulares de \eqref{h2}, su **combinación lineal**

$$
y = C_1\,y_1 + C_2\,y_2
$$

también es solución de \eqref{h2}.
:::

::: demostracion
Por ser soluciones: $y_1'' + a_1y_1' + a_2y_1 = 0$ e $y_2'' + a_1y_2' + a_2y_2 = 0$. Derivando $y = C_1y_1 + C_2y_2$:

$$
y' = C_1y_1' + C_2y_2' \qquad y'' = C_1y_1'' + C_2y_2''
$$

Reemplazando en la ED y reordenando:

$$
C_1\big(\hl{y_1'' + a_1y_1' + a_2y_1}\big) + C_2\big(\hlb{y_2'' + a_1y_2' + a_2y_2}\big) = 0
$$

Los dos paréntesis valen $0$, así que $y$ satisface la ED.
:::

## 2) Dependencia e independencia lineal

::: definicion LD y LI
- $y_1$ e $y_2$ son **linealmente dependientes** (LD) si su cociente es constante: $\dfrac{y_1}{y_2} = C$.
- Son **linealmente independientes** (LI) si $\dfrac{y_1}{y_2} \ne C$.
- Dos funciones **no pueden ser LI si una es la función nula**.
:::

### Wronskiano

::: definicion Determinante de Wronski (wronskiano)
$$
W(y_1;\,y_2) = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1\,y_2' - y_2\,y_1'
$$
:::

- Si $W(y_1;\,y_2) = 0 \then$ $y_1$ e $y_2$ son **LD**.
- Si $W(y_1;\,y_2) \ne 0 \then$ $y_1$ e $y_2$ son **LI**.

::: demostracion Si son LD, el wronskiano es cero
Si son LD, $y_2 = C\,y_1$:

$$
W = \begin{vmatrix} y_1 & C\,y_1 \\ y_1' & C\,y_1' \end{vmatrix} = C\,y_1\,y_1' - C\,y_1\,y_1' = 0
$$
:::

::: aclaracion
Para funciones **cualesquiera**, $W = 0$ no alcanza para asegurar que sean LD (hay contraejemplos, como $x^2$ y $x\abs{x}$). Pero cuando $y_1$ e $y_2$ son **soluciones de una misma EDL homogénea**, sí vale: $W = 0 \sii$ LD. Ese es el caso que se usa en la materia.
:::

Para $n$ funciones (soluciones de una EDL de orden $n$) el wronskiano se amplía así:

$$
W(y_1;\,y_2;\,\dots;\,y_n) = \begin{vmatrix} y_1 & y_2 & \cdots & y_n \\ y_1' & y_2' & \cdots & y_n' \\ \vdots & \vdots & & \vdots \\ y_1^{(n-1)} & y_2^{(n-1)} & \cdots & y_n^{(n-1)} \end{vmatrix}
$$

::: ejemplo $y_1 = e^{2x}$ e $y_2 = e^{-3x}$
$$
W = \begin{vmatrix} e^{2x} & e^{-3x} \\ 2e^{2x} & -3e^{-3x} \end{vmatrix} = -3e^{-x} - 2e^{-x} = -5e^{-x} \ne 0 \quad\then\quad \text{LI}
$$

Con el cociente sale lo mismo: $\dfrac{e^{2x}}{e^{-3x}} = e^{5x} \ne \cte$.
:::

## 3) Solución general

::: resultado SG de la EDL homogénea de 2.º orden
Si $y_1$ e $y_2$ son soluciones particulares **LI** de \eqref{h2}, entonces

$$
y = C_1\,y_1 + C_2\,y_2
$$

es la **solución general** de \eqref{h2}, y $C_1$ y $C_2$ son **constantes esenciales**.
:::

Con $y_1$ e $y_2$ LD no alcanza: $C_1y_1 + C_2\,(C\,y_1) = (C_1 + C\,C_2)\,y_1$ tiene **una sola** constante esencial. Por eso hacen falta dos soluciones LI.
