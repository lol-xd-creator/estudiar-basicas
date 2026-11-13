# P6.1 Tablas normal estándar y t de Student

*Guía, unidad 6: ejercicios 2, 3, 29, 30 y 31. Es el primer paso de todo: sin manejar la tabla no sale nada del resto.*

::: ejercicio 6.2 · Áreas bajo la normal estándar
Encontrá el área bajo la curva normal estándar:

a) a la izquierda de $z = 1{,}43$
b) a la derecha de $z = -0{,}89$
c) entre $z = -2{,}16$ y $z = -0{,}65$
d) a la izquierda de $z = -1{,}39$
e) a la derecha de $z = 1{,}96$
f) entre $z = -0{,}48$ y $z = 1{,}74$

::: solucion
- a) $P(z < 1{,}43) = 0{,}9236$ (directo).
- b) $P(z > -0{,}89) = P(z < 0{,}89) = 0{,}8133$ (simetría).
- c) $P(z < -0{,}65) - P(z < -2{,}16) = 0{,}2578 - 0{,}0154 = 0{,}2424$.
- d) $P(z < -1{,}39) = 1 - P(z < 1{,}39) = 1 - 0{,}9177 = 0{,}0823$.
- e) $P(z > 1{,}96) = 1 - 0{,}9750 = 0{,}0250$.
- f) $P(z < 1{,}74) - P(z < -0{,}48) = 0{,}9591 - 0{,}3156 = 0{,}6435$.

**En InfoStat:** Probabilidades y cuantiles → Normal con media 0 y varianza 1 → Valor de x → Prob $(X \le x)$ o Prob $(X > x)$.
:::
:::

::: ejercicio 6.3 · De la probabilidad al valor de $z$
Encontrá $z$ si el área bajo la normal estándar:

a) a la derecha de $z$ es $0{,}3622$
b) a la izquierda de $z$ es $0{,}1131$
c) entre $0$ y $z$ (con $z > 0$) es $0{,}4838$
d) a la izquierda de $z$ es $0{,}0228$

::: solucion
La tabla da áreas **a la izquierda**: primero se lleva todo a "$P(z < z_0) = \dots$".

- a) $P(z < z_0) = 1 - 0{,}3622 = 0{,}6378 \then z_0 = 0{,}35$.
- b) $P(z < z_0) = 0{,}1131 \then z_0 = -1{,}21$ (es menor que 0,5: $z$ negativo).
- c) $P(0 < z < z_0) = P(z < z_0) - 0{,}5 = 0{,}4838 \then P(z < z_0) = 0{,}9838 \then z_0 = 2{,}14$.
- d) $P(z < z_0) = 0{,}0228 \then z_0 = -2{,}00$.

::: aclaracion
En la guía, la respuesta de c) figura como $2{,}189$, pero con $P(z < z_0) = 0{,}9838$ (que la misma guía plantea) la tabla da $z_0 = 2{,}14$: $P(z < 2{,}14) = 0{,}9838$.
:::

**En InfoStat:** Normal (0; 1) → escribir la probabilidad acumulada en **Prob $(X \le x)$** → Calcular → aparece $z$.
:::
:::

::: ejercicio 6.29 · Valores de $t$ con 9 grados de libertad
Con la tabla $t$ y $\nu = 9$, encontrá $a$ para que:

a) el área a la derecha de $a$ sea $0{,}05$
b) el área total de las dos colas ($t < -a$ y $t > a$) sea $0{,}05$
c) el área entre $-a$ y $a$ sea $0{,}99$
d) el área a la izquierda de $-a$ sea $0{,}01$
e) el área a la izquierda de $a$ sea $0{,}90$

::: solucion
Fila de 9 grados de libertad; la columna es la probabilidad **acumulada a la izquierda**.

- a) $P(t < a) = 0{,}95 \then a = 1{,}833$.
- b) Cada cola tiene $0{,}025$: $P(t < a) = 0{,}975 \then a = 2{,}262$.
- c) Cada cola tiene $0{,}005$: $P(t < a) = 0{,}995 \then a = 3{,}250$.
- d) $P(t < -a) = 0{,}01 \then -a = -2{,}821 \then a = 2{,}821$.
- e) $P(t < a) = 0{,}90 \then a = 1{,}383$.

**En InfoStat:** Probabilidades y cuantiles → **T Student (v)** con $v = 9$ → la probabilidad en Prob $(X \le x)$ (o en Prob $(X > x)$) → Calcular.
:::
:::

::: ejercicio 6.30 y 6.31 · $t$ con el tamaño de muestra
a) Con una muestra de 11, ¿qué valor $t$ deja a la derecha $0{,}05$?
b) $P(T < 2{,}365)$ si $n = 8$.
c) $P(T > 1{,}318)$ si $n = 24$.
d) $P(-1{,}356 < T < 2{,}179)$ con 12 grados de libertad.

::: solucion
**Ojo:** si dan $n$, los grados de libertad son $n - 1$.

- a) $\nu = 10$: $P(t < a) = 0{,}95 \then a = 1{,}812$.
- b) $\nu = 7$: $2{,}365$ está en la columna $0{,}975 \then P(T < 2{,}365) = 0{,}975$.
- c) $\nu = 23$: $1{,}318$ está en la columna $0{,}90 \then P(T > 1{,}318) = 0{,}10$.
- d) $\nu = 12$: $P(T < 2{,}179) - P(T < -1{,}356) = 0{,}975 - 0{,}10 = 0{,}875$.

::: aclaracion
En la guía las respuestas están corridas: la del ejercicio 30 aparece como "29", la del 31 como "30" y la del 29 como "32". Los valores son los de arriba.
:::
:::
:::
