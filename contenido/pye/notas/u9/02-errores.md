# 9.2 Errores tipo I y II

::: ppt Los dos errores (Garibaldi y Rimoldi)
| Decisión | $H_0$ es verdadera | $H_0$ es falsa |
|---|---|---|
| **Aceptar $H_0$** | decisión correcta ($1 - \alpha$) | **error tipo II** ($\beta$) |
| **Rechazar $H_0$** | **error tipo I** ($\alpha$) | decisión correcta ($1 - \beta$) |

- **Error tipo I**: rechazar $H_0$ cuando es verdadera. $\ \alpha = P(\text{rechazar } H_0 \mid H_0 \text{ verdadera})$: el **nivel de significación** o **tamaño de la región crítica**. Lo fija el investigador, en valores bajos (5 %, 1 %).
- **Error tipo II**: aceptar $H_0$ cuando es falsa. $\ \beta = P(\text{aceptar } H_0 \mid H_0 \text{ falsa})$. Es **imposible calcularla sin un valor específico** de la alternativa.
- $1 - \alpha$: **nivel de confianza**. $\ 1 - \beta$: **potencia** de la prueba, la probabilidad de rechazar $H_0$ cuando es falsa (cuando una alternativa específica es verdadera). Indica la habilidad de la prueba para detectar que $H_0$ es falsa.
:::

::: ppt Propiedades (Garibaldi y Rimoldi)
1. **$\alpha$ y $\beta$ no son complementarias** (no suman 1): se refieren a distribuciones distintas. El complemento de $\alpha$ es $1-\alpha$ y el de $\beta$ es $1-\beta$.
2. **Están relacionados**: con $n$ fijo, si uno disminuye, en general el otro aumenta. No se pueden reducir los dos a la vez.
3. **Aumentar el tamaño de muestra** reduce $\alpha$ y $\beta$ simultáneamente.
4. El tamaño de la región crítica ($\alpha$) siempre se puede reducir ajustando los valores críticos.
5. **Cuanto más lejos** está el valor real del valor de $H_0$, **menor es $\beta$** (y mayor la potencia).
6. La potencia sube si se **aumenta $\alpha$** o se **aumenta $n$**.
7. El investigador elige de antemano $\alpha$ y elige la prueba que **minimiza $\beta$**.
8. El error tipo I (rechazar $H_0$ cierta) se considera **más grave** que el tipo II (Rimoldi).
:::

```grafico
titulo: $\alpha$ bajo $H_0$ (cola de rechazo) y $\beta$ bajo $H_1$ (zona de aceptación)
y = e^(-x^2/2)/sqrt(2 pi) ; "$H_0$ cierta: centrada en $\mu_0$" ; azul ; gruesa
y = e^(-(x-3)^2/2)/sqrt(2 pi) ; "$H_0$ falsa: centrada en $\mu_1$" ; rojo ; gruesa
2 <= x <= 4, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; azul
-1 <= x <= 2, 0 <= y <= e^(-(x-3)^2/2)/sqrt(2 pi) ; rayado ; rojo
segmento (2, 0) (2, 0.43) ; punteada
texto (2, 0.46) "punto crítico"
texto (2.6, 0.02) "$\alpha$"
texto (1.4, 0.06) "$\beta$"
texto (0, -0.03) "$\mu_0$"
texto (3, -0.03) "$\mu_1$"
x: -3.5..6.5
y: -0.05..0.5
grilla: no
aspecto: libre
alto: 260
```

$\alpha$ está en la **zona de rechazo** de la distribución bajo $H_0$; $\beta$ está en la **zona de aceptación** de la distribución bajo $H_1$. Si se corre el punto crítico para achicar $\alpha$, crece $\beta$.

::: libro El ejemplo del paraguas (apunte)
$H_0$: llueve; $H_1$: no llueve. Llevar el paraguas cuando llueve es correcto ($1-\alpha$); no llevarlo cuando llueve es el error tipo I ($\alpha$); llevarlo cuando no llueve es el error tipo II ($\beta$); no llevarlo cuando no llueve es correcto ($1-\beta$).
:::

::: pregunta La potencia de una prueba es la probabilidad de rechazar la hipótesis nula cuando la hipótesis alternativa es verdadera.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$1 - \beta = P(\text{rechazar } H_0 \mid H_0 \text{ falsa})$. (Pregunta de los parciales de 2021.)
:::
:::

::: pregunta El nivel de significación de un test (marcá todas las correctas):
- [x] suele ser pequeño y lo fija el investigador o un convenio generalmente aceptado
- [x] al disminuir, hace aumentar la probabilidad del error de tipo II
- [ ] es la probabilidad de no rechazar $H_0$ cuando es falsa
::: solucion Explicación
$\alpha$ lo fija el investigador; $\alpha$ y $\beta$ varían en sentido inverso. "No rechazar $H_0$ falsa" es $\beta$. (Parcial de Sistemas de 2020.)
:::
:::

::: pregunta ¿Cómo se reducen $\alpha$ y $\beta$ al mismo tiempo?
- [ ] Cambiando de prueba bilateral a lateral
- [x] Aumentando el tamaño de la muestra
- [ ] Bajando $\alpha$
::: solucion Explicación
Con más $n$ el error estándar baja y las dos distribuciones se superponen menos.
:::
:::
