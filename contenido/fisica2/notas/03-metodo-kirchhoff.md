# Método de Kirchhoff (EJ6)

## Pasos

1. Proponer el sentido de las corrientes.
2. Armar las ecuaciones de nudo.
3. Armar las ecuaciones de malla.
4. Resolver el sistema de ecuaciones.
5. Interpretar el resultado.

::: claves
- Entre los pasos 2 y 3 tiene que haber **la misma cantidad de ecuaciones que de incógnitas**.
- Si una incógnita da **negativa**, es porque la corriente iba en sentido opuesto al propuesto.
:::

## Ejemplo

::: ejemplo EJ6
```circuito
titulo: EJ6: corrientes propuestas $I_1$, $I_2$, $I_3$
cable (0,0) (0,4)
cable (0,4) (1.2,4)
R (1.2,4) (2.8,4) ; 2
cable (2.8,4) (4,4) (4,2)
cable (0,2) (0.5,2)
R (0.5,2) (1.7,2) ; 6
cable (1.7,2) (2.5,2)
bateria (3.3,2) (2.5,2) ; 10
cable (3.3,2) (4,2)
R (4,2) (4,0) ; 4
cable (0,0) (1.5,0)
bateria (1.5,0) (2.5,0) ; 14
cable (2.5,0) (4,0)
nodo (0,2) ; "a"
nodo (4,2) ; "d"
etiqueta (-0.35,4.35) "$b$"
etiqueta (4.35,4.35) "$c$"
etiqueta (4.35,-0.35) "$e$"
etiqueta (-0.35,-0.35) "$f$"
corriente (2.35,2) (1.85,2) ; "$I_1$"
corriente (0,1.3) (0,0.7) ; "$I_2$"
corriente (0,2.7) (0,3.3) ; "$I_3$"
```

**① Nudo $a$:**

$$
I_1 = I_2 + I_3
$$

**② Mallas**, recorridas desde $a$:

::: pasos
// malla abcda
-I_3\cdot 2\,\Omega + 10\,\text{V} - I_1\cdot 6\,\Omega = 0
// malla afeda
14\,\text{V} - I_2\cdot 4\,\Omega + 10\,\text{V} - I_1\cdot 6\,\Omega = 0
:::

**Resultados** del sistema: $I_3 = -1\,\text{A}$, $I_2 = 3\,\text{A}$, $I_1 = 2\,\text{A}$.

**Respuestas:**

| Corriente | Valor | Sentido |
|---|---|---|
| $I_1$ | $2\,\text{A}$ | el propuesto |
| $I_2$ | $3\,\text{A}$ | el propuesto |
| $I_3$ | $1\,\text{A}$ | **contrario al propuesto** (o se hace otro dibujo con la flecha dada vuelta) |
:::
