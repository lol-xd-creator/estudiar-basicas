# 1. Dominios rectangulares

Para entender la integral doble nos apoyamos en la idea geométrica del **volumen** limitado por la superficie $z = f(x;y) \ge 0$ y los planos $z = 0$, $x = a$, $x = b$, $y = c$ e $y = d$. Para eso, $f$ debe estar **definida y acotada** en el rectángulo

$$
R = \{(x;y) \,/\, a \le x \le b \wedge c \le y \le d\} = [a;b]\times[c;d]
$$

## Partición del rectángulo

Se parte cada intervalo:

$$
\begin{aligned}
[a;b]&:\quad x_0 = a;\ x_1;\ x_2;\ \dots;\ x_{i-1};\ x_i;\ \dots;\ x_n = b \\
[c;d]&:\quad y_0 = c;\ y_1;\ y_2;\ \dots;\ y_{j-1};\ y_j;\ \dots;\ y_m = d
\end{aligned}
$$

con $\Delta x_i = x_i - x_{i-1}$ y $\Delta y_j = y_j - y_{j-1}$. El subrectángulo $R_{ij}$ tiene área $\Delta A_{ij} = \Delta x_i\,\Delta y_j$.

## Doble suma de Riemann

En cada $R_{ij}$ se elige un punto interior $(x_{ij};y_{ij})$ y se forma la **doble suma de Riemann**:

$$
\sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}
$$

Cada término es el volumen de un **paralelepípedo** rectángulo de base $\Delta A_{ij}$ y altura $f(x_{ij};y_{ij})$: la suma es una aproximación del volumen que queremos calcular.

```grafico3d
titulo: Cada prisma tiene base $\Delta A_{ij}$ y altura $f(x_{ij};y_{ij})$; la suma aproxima el volumen
z = 1.2 + x^2/5 + y^2/7 ; prismas 5x6
x: 0..2
y: 0..3
```

## Definición

::: definicion Integral doble sobre un rectángulo
Si el subrectángulo de mayor área es $\max\Delta A$ y tomamos límite para $n \to \infty$, $m \to \infty$ de tal manera que $\max\Delta A \to 0$:

$$
\iint_R f(x;y)\,\dA = \lim_{\substack{n\to\infty \\ m\to\infty \\ (\max\Delta A\to 0)}} \sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}
$$

si el límite existe. En ese caso, $f(x;y)$ es **integrable** sobre $R$, el **dominio de integración**.
:::

También se escribe $\displaystyle\iint_R f(x;y)\,\dA = \iint_R f(x;y)\,\dx\,\dy$.
