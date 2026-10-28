# 5. Método de los coeficientes indeterminados

Para $y'' + p\,y' + q\,y = r(x)$ con $p$ y $q$ constantes ([[4. EDL no homogéneas: estructura de la solución]]). Se **propone** una $y_p$ del mismo tipo que $r(x)$, con coeficientes desconocidos; se deriva, se reemplaza en la ED y se **igualan coeficientes**.

::: claves
| $r(x)$ | $y_p$ que se propone | Se multiplica por $x$ ($x^2$) si… |
|---|---|---|
| polinomio $P_n(x)$ | $A_0x^n + A_1x^{n-1} + \dots + A_n$ (**completo**) | $0$ es raíz simple (doble) de la EC |
| $C\,e^{\alpha x}$ | $K\,e^{\alpha x}$ | $\alpha$ es raíz simple (doble) de la EC |
| $C\cos\beta x$, $C\sen\beta x$ o los dos | $a\cos\beta x + b\sen\beta x$ (**los dos**) | $\pm\beta i$ es raíz de la EC |
| suma $r_1 + r_2 + \dots$ | $y_{p_1} + y_{p_2} + \dots$ | cada sumando, por su cuenta |
| producto de los anteriores | producto del mismo tipo | algún sumando de $y_p$ está en $y_H$ |

**Regla general:** si un sumando de la $y_p$ propuesta es solución de la homogénea (es LD con un sumando de $y_H$), se multiplica la $y_p$ por $x$; si todavía choca, por $x^2$. Por eso **primero se calcula $y_H$**.
:::

::: ojo
- El polinomio propuesto va **completo** aunque a $r(x)$ le falten términos: para $r(x) = x^2$ se propone $ax^2 + bx + c$.
- Con seno o coseno se proponen **los dos**, aunque $r(x)$ tenga uno solo.
:::

## 1) $r(x)$ polinómico

Si $r(x) = P_n(x)$, polinomio de grado $n$:

$$
y_p = A_0x^n + A_1x^{n-1} + \dots + A_{n-1}x + A_n
$$

- Si $0$ es **raíz simple** de la EC (falta el término en $y$): $y_p = x\,(A_0x^n + \dots + A_n)$.
- Si $0$ es **raíz doble** (faltan los términos en $y$ y en $y'$): $y_p = x^2\,(A_0x^n + \dots + A_n)$.

::: ejemplo $y'' + y' - 6y = 3x - 2$
**$y_H$:** $m^2 + m - 6 = 0 \then r_1 = -3;\ r_2 = 2 \then y_H = C_1e^{-3x} + C_2e^{2x}$.

**$y_p$:** $0$ no es raíz, así que $y_p = a\,x + b \then y_p' = a \then y_p'' = 0$. Reemplazando:

$$
0 + a - 6(a\,x + b) = 3x - 2 \quad\then\quad \begin{cases} -6a = 3 \then a = -\frac{1}{2} \\ a - 6b = -2 \then -\frac{1}{2} - 6b = -2 \then b = \frac{1}{4} \end{cases}
$$

::: resultado
$$
y = C_1e^{-3x} + C_2e^{2x} - \frac{1}{2}x + \frac{1}{4}
$$
:::
:::

::: ejemplo $y'' + 3y' = 8x + 5$ ($0$ raíz simple)
**$y_H$:** $m^2 + 3m = 0 \then m\,(m + 3) = 0 \then r_1 = 0;\ r_2 = -3 \then y_H = C_1 + C_2e^{-3x}$.

**$y_p$:** como $0$ es raíz simple, $y_p = x\,(a\,x + b) = a\,x^2 + b\,x \then y_p' = 2a\,x + b \then y_p'' = 2a$:

$$
2a + 3\,(2a\,x + b) = 8x + 5 \quad\then\quad \begin{cases} 6a = 8 \then a = \frac{4}{3} \\ 2a + 3b = 5 \then 3b = 5 - \frac{8}{3} \then b = \frac{7}{9} \end{cases}
$$

::: resultado
$$
y = C_1 + C_2e^{-3x} + \frac{4}{3}x^2 + \frac{7}{9}x
$$
:::

Sin multiplicar por $x$, la $y_p = a\,x + b$ tendría el sumando $b$, que es LD con $C_1$ de $y_H$, y las cuentas no cerrarían.
:::

::: ejemplo $y'' = 6x - 2$ ($0$ raíz doble)
**$y_H$:** $m^2 = 0 \then r_1 = r_2 = 0 \then y_H = C_1 + C_2\,x$.

**$y_p$:** $y_p = x^2\,(a\,x + b) = a\,x^3 + b\,x^2 \then y_p' = 3a\,x^2 + 2b\,x \then y_p'' = 6a\,x + 2b$:

$$
6a\,x + 2b = 6x - 2 \quad\then\quad a = 1;\ b = -1
$$

::: resultado
$$
y = C_1 + C_2\,x + x^3 - x^2
$$
:::

::: tip
Acá es más rápido **integrar dos veces**: $y' = 3x^2 - 2x + C_2 \then y = x^3 - x^2 + C_2x + C_1$.
:::
:::

## 2) $r(x)$ exponencial

Si $r(x) = C\,e^{\alpha x}$, se propone

$$
y_p = K\,e^{\alpha x}
$$

- Si $\alpha$ es **raíz simple** de la EC: $y_p = K\,x\,e^{\alpha x}$.
- Si $\alpha$ es **raíz doble**: $y_p = K\,x^2e^{\alpha x}$.

::: ejemplo $y'' + y' - 6y = 2e^{5x}$
$y_H = C_1e^{-3x} + C_2e^{2x}$ (como antes); $5$ no es raíz.

$y_p = K\,e^{5x} \then y_p' = 5K\,e^{5x} \then y_p'' = 25K\,e^{5x}$:

$$
25K\,e^{5x} + 5K\,e^{5x} - 6K\,e^{5x} = 2e^{5x} \quad\then\quad 24K = 2 \quad\then\quad K = \frac{1}{12}
$$

::: resultado
$$
y = C_1e^{-3x} + C_2e^{2x} + \frac{1}{12}e^{5x}
$$
:::
:::

::: ejemplo $y'' + y' - 6y = 4e^{2x}$ ($\alpha = 2$ raíz simple)
$y_H = C_1e^{-3x} + C_2e^{2x}$: $e^{2x}$ ya está en $y_H$, así que se multiplica por $x$.

$$
y_p = K\,x\,e^{2x} \quad\then\quad y_p' = K\,e^{2x} + 2K\,x\,e^{2x} \quad\then\quad y_p'' = 4K\,e^{2x} + 4K\,x\,e^{2x}
$$

Reemplazando, los términos en $x\,e^{2x}$ se cancelan ($4K + 2K - 6K = 0$):

$$
(4K\,e^{2x} + 4K\,x\,e^{2x}) + (K\,e^{2x} + 2K\,x\,e^{2x}) - 6K\,x\,e^{2x} = 4e^{2x} \quad\then\quad 5K = 4 \quad\then\quad K = \frac{4}{5}
$$

::: resultado
$$
y = C_1e^{-3x} + C_2e^{2x} + \frac{4}{5}x\,e^{2x}
$$
:::
:::

::: ejemplo $y'' - 2y' + y = 3e^{x}$ ($\alpha = 1$ raíz doble)
$y_H$: $m^2 - 2m + 1 = 0 \then r_1 = r_2 = 1 \then y_H = C_1e^{x} + C_2\,x\,e^{x}$. Tanto $e^x$ como $x\,e^x$ están en $y_H$: se multiplica por $x^2$.

$$
y_p = K\,x^2e^{x} \quad\then\quad y_p' = 2K\,x\,e^{x} + K\,x^2e^{x} \quad\then\quad y_p'' = 2K\,e^{x} + 4K\,x\,e^{x} + K\,x^2e^{x}
$$

$$
(2K\,e^{x} + 4K\,x\,e^{x} + K\,x^2e^{x}) - 2\,(2K\,x\,e^{x} + K\,x^2e^{x}) + K\,x^2e^{x} = 3e^{x} \quad\then\quad 2K = 3 \quad\then\quad K = \frac{3}{2}
$$

::: resultado
$$
y = C_1e^{x} + C_2\,x\,e^{x} + \frac{3}{2}x^2e^{x}
$$
:::
:::

## 3) $r(x)$ seno o coseno

Si $r(x) = C\cos\beta x$, $r(x) = C\sen\beta x$ o $r(x) = C\cos\beta x + D\sen\beta x$, se propone

$$
y_p = a\cos\beta x + b\sen\beta x
$$

Si $\pm\beta i$ es **raíz imaginaria** de la EC: $y_p = x\,(a\cos\beta x + b\sen\beta x)$.

::: ejemplo $y'' + y' - 6y = 10\cos x$
$y_H = C_1e^{-3x} + C_2e^{2x}$.

$y_p = a\cos x + b\sen x \then y_p' = -a\sen x + b\cos x \then y_p'' = -a\cos x - b\sen x$:

$$
(-a\cos x - b\sen x) + (-a\sen x + b\cos x) - 6\,(a\cos x + b\sen x) = 10\cos x
$$

Igualando los coeficientes de $\cos x$ y de $\sen x$:

$$
\begin{cases} -7a + b = 10 \\ -a - 7b = 0 \then a = -7b \end{cases} \quad\then\quad 49b + b = 10 \quad\then\quad b = \frac{1}{5};\ a = -\frac{7}{5}
$$

::: resultado
$$
y = C_1e^{-3x} + C_2e^{2x} - \frac{7}{5}\cos x + \frac{1}{5}\sen x
$$
:::
:::

::: ejemplo $y'' + 4y = 3\sen 2x$ ($\pm 2i$ raíz)
$y_H$: $m^2 + 4 = 0 \then m = \pm 2i \then y_H = C_1\cos 2x + C_2\sen 2x$. El $\sen 2x$ está en $y_H$: se multiplica por $x$.

$$
y_p = x\,(a\cos 2x + b\sen 2x)
$$

$$
y_p' = a\cos 2x + b\sen 2x + x\,(-2a\sen 2x + 2b\cos 2x)
$$

$$
y_p'' = -4a\sen 2x + 4b\cos 2x + x\,(-4a\cos 2x - 4b\sen 2x)
$$

Al reemplazar en $y'' + 4y$, los términos con $x$ se cancelan:

$$
-4a\sen 2x + 4b\cos 2x = 3\sen 2x \quad\then\quad \begin{cases} -4a = 3 \then a = -\frac{3}{4} \\ 4b = 0 \then b = 0 \end{cases}
$$

::: resultado
$$
y = C_1\cos 2x + C_2\sen 2x - \frac{3}{4}\,x\cos 2x
$$
:::
:::

## 4) $r(x)$ suma de funciones ya vistas

Si $r(x) = r_1(x) + r_2(x) + \dots + r_n(x)$, se propone

$$
y_p = y_{p_1} + y_{p_2} + \dots + y_{p_n}
$$

donde cada $y_{p_i}$ es la que le corresponde a $r_i(x)$ según los criterios anteriores (cada una se corrige por su cuenta).

::: ejemplo $y'' + 5y' + 4y = 2x + e^{-2x}$
$y_H$: $m^2 + 5m + 4 = 0 \then m = \dfrac{-5 \pm \sqrt{25 - 16}}{2} \then r_1 = -1;\ r_2 = -4 \then y_H = C_1e^{-4x} + C_2e^{-x}$.

$$
y_p = \underbrace{a\,x + b}_{\text{por } 2x} + \underbrace{K\,e^{-2x}}_{\text{por } e^{-2x}} \quad\then\quad y_p' = a - 2K\,e^{-2x} \quad\then\quad y_p'' = 4K\,e^{-2x}
$$

$$
4K\,e^{-2x} + 5\,(a - 2K\,e^{-2x}) + 4\,(a\,x + b + K\,e^{-2x}) = 2x + e^{-2x}
$$

$$
\begin{cases} 4K - 10K + 4K = 1 \then K = -\frac{1}{2} \\ 4a = 2 \then a = \frac{1}{2} \\ 5a + 4b = 0 \then b = -\frac{5}{8} \end{cases}
$$

::: resultado
$$
y = C_1e^{-4x} + C_2e^{-x} + \frac{1}{2}x - \frac{5}{8} - \frac{1}{2}e^{-2x}
$$
:::
:::

::: ejemplo Proponer la $y_p$ de $y'' - 4y' + 4y = \sen 2x + e^{2x}$
$y_H$: $m^2 - 4m + 4 = 0 \then r_1 = r_2 = 2 \then y_H = C_1e^{2x} + C_2\,x\,e^{2x}$.

- Por $\sen 2x$: $a\cos 2x + b\sen 2x$ ($\pm 2i$ no es raíz).
- Por $e^{2x}$: $2$ es raíz **doble**, así que $K\,x^2e^{2x}$.

::: resultado
$$
y_p = a\cos 2x + b\sen 2x + K\,x^2e^{2x}
$$

Terminando la cuenta sale $a = \frac{1}{8}$, $b = 0$ y $K = \frac{1}{2}$.
:::
:::

::: aclaracion
En el apunte, la $y_p$ de este ejemplo figura con $a\cos x$: tiene que ser $a\cos 2x$, con el mismo argumento que el seno.
:::

## 5) $r(x)$ producto de funciones ya vistas

En general se propone una $y_p$ **producto de funciones del mismo tipo**. Si algún sumando de la $y_p$ propuesta es solución de la homogénea (LD con un sumando de $y_H$), se multiplica por $x$; si sigue chocando, por $x^2$.

::: ejemplo Proponer la $y_p$ de $y'' + 2y' + 2y = e^{x}\sen x$
$y_H$: $m^2 + 2m + 2 = 0 \then m = -1 \pm i \then y_H = C_1e^{-x}\cos x + C_2e^{-x}\sen x$.

Exponencial por seno: se propone exponencial por (seno y coseno). No choca con $y_H$ ($e^{x}$ y no $e^{-x}$):

::: resultado
$$
y_p = a\,e^{x}\cos x + b\,e^{x}\sen x
$$
:::
:::

::: ejemplo Proponer la $y_p$ de $y'' - 7y' + 6y = (x - 2)\,e^{x}$
$y_H$: $m^2 - 7m + 6 = 0 \then m = \dfrac{7 \pm \sqrt{49 - 24}}{2} \then r_1 = 6;\ r_2 = 1 \then y_H = C_1e^{x} + C_2e^{6x}$.

Polinomio de grado 1 por exponencial: $(a\,x + b)\,e^{x}$. Pero el sumando $b\,e^{x}$ está en $y_H$, así que se multiplica por $x$:

::: resultado
$$
y_p = x\,(a\,x + b)\,e^{x}
$$
:::
:::

::: aclaracion
En el apunte figura $y_H = C_1e^{x} + C_2e^{7x}$, pero las raíces de $m^2 - 7m + 6 = 0$ son $1$ y $6$: es $y_H = C_1e^{x} + C_2e^{6x}$. La $y_p$ no cambia.
:::
