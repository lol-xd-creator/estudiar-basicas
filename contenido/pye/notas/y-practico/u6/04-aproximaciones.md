# P6.4 Aproximaciones a la normal

*Guía, unidad 6: ejercicios 20, 21, 23 y 25 (los mismos que trabajan Rimoldi, Stefanich y Garibaldi).*

::: tip Pasos
1. Reconocer el modelo discreto: **binomial** (proporción fija $P$, con reposición o población grande), **Poisson** (sucesos por unidad de tiempo, $\lambda$), **hipergeométrico** (sin reposición de un lote chico).
2. Verificar que se puede aproximar: binomial e hipergeométrico con $n > 30$; Poisson con $\lambda > 20$.
3. Calcular **$E(x)$ y $\sigma$ del modelo discreto**.
4. Estandarizar $z = \frac{x - E(x)}{\sigma}$ y usar la tabla (en la materia, **sin** corrección por continuidad).
:::

::: ejercicio 6.20 · Compras en un centro comercial (binomial)
El 70 % de las personas que entran a un centro comercial compra algo. En una muestra de 50, ¿probabilidad de que como mínimo 40 compren?

::: solucion
Binomial con $n = 50 > 30$ y $P = 0{,}7$:
$$
E(x) = 50 \cdot 0{,}7 = 35 \qquad \sigma = \sqrt{50 \cdot 0{,}7 \cdot 0{,}3} = \sqrt{10{,}5} = 3{,}24
$$
$$
P(x \ge 40) = P\!\left(z \ge \frac{40 - 35}{3{,}24}\right) = P(z \ge 1{,}54) = 1 - 0{,}9382 = 0{,}0618
$$
(InfoStat, sin redondear $z$: $0{,}0614$.)

**En InfoStat:** Normal con **media 35 y varianza 10,5** → Prob $(X > 40)$. Se entra con la variable sin estandarizar.
:::
:::

::: ejercicio 6.21 · Llamadas de emergencia (Poisson)
Un servicio de salud atiende 10 llamadas por hora a la mañana. ¿Probabilidad de que atienda entre 35 y 45 llamadas en las 4 horas del turno?

::: solucion
En 4 horas, $\lambda = 40 > 20$ → normal con $E = 40$ y $\sigma = \sqrt{40} = 6{,}32$:
$$
P(35 \le x \le 45) = P\!\left(\frac{35 - 40}{6{,}32} \le z \le \frac{45 - 40}{6{,}32}\right) = P(-0{,}79 \le z \le 0{,}79) = 0{,}7852 - 0{,}2148 = 0{,}5704
$$
(InfoStat: $0{,}5708$.)

::: ojo
$\lambda$ se lleva a la unidad que pide el problema: 10 por hora → **40 en 4 horas**.
:::

**En InfoStat:** Normal con media 40 y varianza 40.
:::
:::

::: ejercicio 6.23 · Solicitudes de servicio (Poisson)
Llegan en promedio 5 solicitudes por hora. ¿Probabilidad de recibir más de 50 en un turno de 8 horas?

::: solucion
$\lambda = 5 \cdot 8 = 40$, $\ \sigma = \sqrt{40} = 6{,}32$:
$$
P(x > 50) = P\!\left(z > \frac{50 - 40}{6{,}32}\right) = P(z > 1{,}58) = 1 - 0{,}9429 = 0{,}0571
$$
(La guía, con InfoStat: $0{,}0569$.)
:::
:::

::: ejercicio 6.25 · Elementos quirúrgicos (hipergeométrico)
El 7 % de los 400 elementos quirúrgicos de un lote no cumple las especificaciones. Se toma una muestra de 40 **sin reposición**. ¿Probabilidad de que no más de 8 sean defectuosos?

::: solucion
Sin reposición y $\frac{n}{N} = \frac{40}{400} = 0{,}10 > 0{,}05$ → hipergeométrico, con $K = 0{,}07 \cdot 400 = 28$ defectuosos:
::: pasos
E(x) = n\,\frac{K}{N} = 40 \cdot 0{,}07 = 2{,}8
\sigma = \sqrt{40 \cdot 0{,}07 \cdot 0{,}93 \cdot \frac{400 - 40}{400 - 1}} = \sqrt{2{,}35} = 1{,}53
P(x \le 8) = P\!\left(z \le \frac{8 - 2{,}8}{1{,}53}\right) = P(z \le 3{,}39) = 0{,}9997
:::

::: aclaracion
La guía da $0{,}9996$ con $\sigma = 1{,}61$. Con el factor de corrección $\frac{N-n}{N-1}$ del apunte, $\sigma = 1{,}53$. Las dos dan prácticamente 1. Además, $n = 40 > 30$ permite la aproximación, aunque $E(x) = 2{,}8$ es chico.
:::

**En InfoStat:** Normal con media 2,8 y varianza 2,35 → Prob $(X \le 8)$. Para comparar con el valor exacto: **Hipergeométrica**.
:::
:::
