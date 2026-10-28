# 6. Método de variación de los parámetros

Sirve para cualquier $r(x)$ y se usa sobre todo cuando el segundo miembro **no** es de los tipos de [[5. Método de los coeficientes indeterminados]] (por ejemplo $\sec x$, $\tg x$, $\frac{1}{x}$, $\ln x$).

**Idea:** en $y_H = C_1y_1 + C_2y_2$ se reemplazan las constantes por **funciones** a determinar (de ahí el nombre):

$$
y_p = u\,y_1 + v\,y_2 \qquad u = u(x);\ v = v(x)
$$

::: resultado Sistema y fórmulas
$u'$ y $v'$ salen del sistema

$$
\begin{cases} u'\,y_1 + v'\,y_2 = 0 \\ u'\,y_1' + v'\,y_2' = r(x) \end{cases}
$$

resuelto por **Cramer**:

$$
u' = \frac{\begin{vmatrix} 0 & y_2 \\ r(x) & y_2' \end{vmatrix}}{W(y_1;\,y_2)} = \frac{-y_2\,r(x)}{W} \qquad v' = \frac{\begin{vmatrix} y_1 & 0 \\ y_1' & r(x) \end{vmatrix}}{W(y_1;\,y_2)} = \frac{y_1\,r(x)}{W}
$$

con $W = y_1y_2' - y_2y_1'$ ([[2. EDL homogéneas de 2.º orden y wronskiano]]). Después se integra:

$$
u = \int u'\,\dx \qquad v = \int v'\,\dx
$$

**sin constantes** ($k_1 = k_2 = 0$): por simplicidad y para no agregar sumandos LD con los de $y_H$.
:::

::: ojo
La ED tiene que estar con **coeficiente $1$ en $y''$** para que el segundo miembro sea $r(x)$. Si es $2y'' + \dots = f(x)$, se divide por $2$ y se usa $r(x) = \frac{f(x)}{2}$.
:::

::: demostracion De dónde sale el sistema
Hacen falta dos condiciones para $u$ y $v$: que $y_p$ sea solución de la ED y una **condición arbitraria** que simplifique las cuentas.

$$
y_p' = \hl{u'\,y_1 + v'\,y_2} + u\,y_1' + v\,y_2'
$$

Se elige como condición arbitraria $\hl{u'\,y_1 + v'\,y_2 = 0}$. Entonces

$$
y_p' = u\,y_1' + v\,y_2' \qquad y_p'' = u'\,y_1' + v'\,y_2' + u\,y_1'' + v\,y_2''
$$

Reemplazando en $y'' + p\,y' + q\,y = r(x)$ y agrupando:

$$
u'\,y_1' + v'\,y_2' + u\,\big(\hlb{y_1'' + p\,y_1' + q\,y_1}\big) + v\,\big(\hlb{y_2'' + p\,y_2' + q\,y_2}\big) = r(x)
$$

Los paréntesis valen $0$ porque $y_1$ e $y_2$ son soluciones de la homogénea, y queda la segunda ecuación: $u'\,y_1' + v'\,y_2' = r(x)$.
:::

::: ejemplo $y'' + y = \sec x$
**$y_H$:** $m^2 + 1 = 0 \then m = \pm i \then y_H = C_1\cos x + C_2\sen x$, con $y_1 = \cos x$ e $y_2 = \sen x$.

**Wronskiano:**

$$
W = \begin{vmatrix} \cos x & \sen x \\ -\sen x & \cos x \end{vmatrix} = \cos^2 x + \sen^2 x = 1
$$

**$u'$ y $v'$**, con $r(x) = \sec x = \frac{1}{\cos x}$:

$$
u' = \frac{\begin{vmatrix} 0 & \sen x \\ \frac{1}{\cos x} & \cos x \end{vmatrix}}{1} = -\frac{\sen x}{\cos x} = -\tg x \qquad v' = \frac{\begin{vmatrix} \cos x & 0 \\ -\sen x & \frac{1}{\cos x} \end{vmatrix}}{1} = 1
$$

**Integrando:**

$$
u = \int -\tg x\,\dx = -\int \frac{\sen x}{\cos x}\,\dx = \ln\abs{\cos x} \qquad v = \int 1\,\dx = x
$$

**$y_p = u\,y_1 + v\,y_2$:**

::: resultado
$$
y = C_1\cos x + C_2\sen x + \ln\abs{\cos x}\,\cos x + x\sen x
$$
:::
:::
