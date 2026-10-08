# 1 · La idea: la triple suma de Riemann

*1.ª lectura: 4 min · con lápiz: 6 min*

La integral triple se define **en forma análoga a la doble**. Sea $f(x;y;z)$ una función definida en el **paralelepípedo rectángulo**

$$
B = \{(x;y;z) \,/\, a \le x \le b \wedge c \le y \le d \wedge p \le z \le q\} = [a;b]\times[c;d]\times[p;q]
$$

```grafico3d
titulo: El paralelepípedo $B = [a;b]\times[c;d]\times[p;q]$
0 <= z <= 2, 0.5 <= x <= 2, 0.5 <= y <= 3 ; malla
```

## De los paralelepípedos chicos a la integral

1. **Partir** cada intervalo: $[a;b]$ en $l$ pedazos, $[c;d]$ en $m$ y $[p;q]$ en $n$, con $\Delta x_i = x_i - x_{i-1}$, $\Delta y_j = y_j - y_{j-1}$ y $\Delta z_k = z_k - z_{k-1}$. Quedan subparalelepípedos $B_{ijk}$ de volumen

$$
\Delta V_{ijk} = \Delta x_i\,\Delta y_j\,\Delta z_k
$$

2. **Elegir** un punto interior $(x_{ijk};y_{ijk};z_{ijk})$ en cada $B_{ijk}$.
3. **Sumar**: es la **triple suma de Riemann**:

$$
\sum_{i=1}^{l}\sum_{j=1}^{m}\sum_{k=1}^{n} f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk}
$$

4. **Tomar límite** con $l, m, n \to \infty$, de modo que el subparalelepípedo de mayor volumen, $\max\Delta V$, tienda a $0$.

::: resultado Integral triple
$$
\iiint_B f(x;y;z)\,\dV = \lim_{\substack{l\to\infty \\ m\to\infty \\ n\to\infty \\ (\max\Delta V\to 0)}} \sum_{i=1}^{l}\sum_{j=1}^{m}\sum_{k=1}^{n} f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk} = \iiint_B f(x;y;z)\,\dx\,\dy\,\dz
$$

si el límite existe.
:::

::: observacion
Comparado con dobles: el rectángulo pasa a ser un **paralelepípedo**, el área $\Delta A_{ij}$ pasa a ser el volumen $\Delta V_{ijk}$, y la suma es **triple**.
:::
