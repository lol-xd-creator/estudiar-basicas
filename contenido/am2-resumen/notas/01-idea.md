# 1 · La idea: volumen y sumas de Riemann

*1.ª lectura: 4 min · con lápiz: 6 min*

La integral definida de una variable se extiende a **campos escalares**: si $f$ depende de **dos** variables, la integral es **doble**. Para entenderla se usa la idea de **volumen**: el del sólido debajo de la superficie $z = f(x;y) \ge 0$ y arriba del rectángulo

$$
R = \{(x;y) \,/\, a \le x \le b \wedge c \le y \le d\} = [a;b]\times[c;d]
$$

donde $f$ tiene que estar **definida y acotada**.

## De los prismas a la integral

1. **Partir.** $[a;b]$ en $n$ pedazos ($\Delta x_i = x_i - x_{i-1}$) y $[c;d]$ en $m$ ($\Delta y_j = y_j - y_{j-1}$). Quedan subrectángulos $R_{ij}$ de área $\Delta A_{ij} = \Delta x_i\,\Delta y_j$.
2. **Elegir** un punto $(x_{ij};y_{ij})$ dentro de cada $R_{ij}$.
3. **Sumar** los prismas de base $\Delta A_{ij}$ y altura $f(x_{ij};y_{ij})$. Es la **doble suma de Riemann**, y aproxima el volumen:

$$
\sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}
$$

4. **Tomar límite** con $n \to \infty$ y $m \to \infty$, de modo que el subrectángulo más grande, $\max\Delta A$, tienda a $0$.

```grafico3d
titulo: Cada prisma: base $\Delta A_{ij}$, altura $f(x_{ij};y_{ij})$. Su suma aproxima el volumen
z = 1.2 + x^2/5 + y^2/7 ; prismas 5x6
x: 0..2
y: 0..3
```

::: definicion Integral doble sobre un rectángulo
$$
\iint_R f(x;y)\,\dA = \lim_{\substack{n\to\infty \\ m\to\infty \\ (\max\Delta A\to 0)}} \sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}
$$

Si el límite existe, $f$ es **integrable** sobre $R$, el **dominio de integración**. También se escribe:

$$
\iint_R f(x;y)\,\dA = \iint_R f(x;y)\,\dx\,\dy
$$
:::
