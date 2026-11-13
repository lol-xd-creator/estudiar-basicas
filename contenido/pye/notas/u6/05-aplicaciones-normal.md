# 6.5 Aplicaciones de la normal

::: ppt Regla 68 – 95 – 99,7 (Garibaldi)
Si una distribución tiene forma normal:

| Intervalo | Porcentaje de los valores |
|---|---|
| $\mu \pm 1\sigma$ | aproximadamente el **68 %** (bastante más de la mitad) |
| $\mu \pm 2\sigma$ | cerca del **95 %** |
| $\mu \pm 3\sigma$ | casi el **99,7 %** |

(El apunte da los valores exactos: 68,26 %, 95,45 % y 99,73 %.)
:::

```grafico
titulo: Regla empírica
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
-1 <= x <= 1, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; azul
segmento (-2, 0) (-2, 0.054) ; punteada
segmento (2, 0) (2, 0.054) ; punteada
segmento (-3, 0) (-3, 0.0044) ; punteada
segmento (3, 0) (3, 0.0044) ; punteada
texto (0, 0.15) "$68\%$"
texto (0, -0.03) "$\mu$"
texto (1, -0.03) "$\mu+\sigma$"
texto (2, -0.03) "$\mu+2\sigma$"
texto (3, -0.03) "$\mu+3\sigma$"
x: -3.8..3.8
grilla: no
aspecto: libre
alto: 260
leyenda: no
```

Por eso, en las unidades siguientes, $z = 2$ corresponde a una confianza del 95,45 % y $z = 3$ a una del 99,73 %.

::: libro Ejemplo del apunte: jornales de 110 operarios
Con media $69{,}5$ y $DS = 8{,}3$, los intervalos notables son $[61{,}2;\ 77{,}8]$, $[52{,}9;\ 86{,}1]$ y $[44{,}6;\ 94{,}4]$. En la tabla de frecuencias caen el 68 %, el 93 % y el 100 % de los operarios: el ejemplo confirma la regla, aunque la distribución no sea perfectamente simétrica.
:::

::: libro Puntaje típico (comparar observaciones de distribuciones distintas)
El valor estandarizado $z = \frac{x-\mu}{\sigma}$ dice **a cuántas desviaciones de la media** está una observación, sin unidades. Sirve para comparar valores de distribuciones distintas.

*Ejemplo del apunte:* un alumno del curso A ($\mu = 5{,}4$; $\sigma = 0{,}63$) sacó 6,5, y uno del curso B ($\mu = 4{,}2$; $\sigma = 0{,}34$) sacó 5,7. $z_A = 1{,}75$ y $z_B = 4{,}41$: aunque 6,5 > 5,7, el alumno B rindió mejor **en términos relativos**.
:::

::: pregunta En una distribución aproximadamente normal, ¿qué porcentaje de los datos queda **fuera** de $\mu \pm 2\sigma$?
- [ ] $32\,\%$
- [x] Alrededor del $5\,\%$
- [ ] $0{,}27\,\%$
::: solucion Explicación
Dentro de $\mu \pm 2\sigma$ está cerca del 95 %; fuera queda alrededor del 5 % (la mitad en cada cola). El 32 % queda fuera de $\mu \pm \sigma$ y el 0,3 % fuera de $\mu \pm 3\sigma$.
:::
:::
