# 2. Propiedades de la integral curvilínea

Si $\mathbf F$ es integrable sobre la curva $C$, se cumple que:

::: propiedades
1. $\displaystyle\int_C \mathbf F\cdot\dd\mathbf S = -\int_{-C} \mathbf F\cdot\dd\mathbf S$, siendo $-C$ la misma curva $C$ pero recorrida en **sentido contrario**.
2. Si $C = C_1 \cup C_2$: $\displaystyle\int_C \mathbf F\cdot\dd\mathbf S = \int_{C_1} \mathbf F\cdot\dd\mathbf S + \int_{C_2} \mathbf F\cdot\dd\mathbf S$
:::

## Propiedad 1: sentido contrario

```grafico
titulo: $C$ y $-C$: la misma curva, recorrida en sentidos opuestos
x: -0.3..3.4
y: -0.3..3
# C va de (0.5; 0.3) a (2.8; 2.4); -C es la misma curva (corrida un poco para que se vean las dos) de vuelta.
(0.5 (1 - t)^2 + t (1 - t) + 2.8 t^2, 0.3 (1 - t)^2 + 4.4 t (1 - t) + 2.4 t^2) ; t: 0..1 ; flecha ; azul ; "$C$"
(0.75 t^2 + 1.3 t (1 - t) + 3 (1 - t)^2, 0.15 t^2 + 4.1 t (1 - t) + 2.2 (1 - t)^2) ; t: 0..1 ; flecha ; punteada ; rojo ; "$-C$"
```

Cambia el signo porque, al integrar en sentido contrario, cambia el sentido de $\dd\mathbf S$ y, por lo tanto, el signo de sus componentes diferenciales.

## Propiedad 2: unión de tramos

```grafico
titulo: $C = C_1 \cup C_2$: dos tramos con ecuaciones distintas
x: -0.3..4.3
y: -0.3..3
(4 - t, 0.5 + 1.5 (1 - (1 - t/2)^2)) ; t: 0..2 ; flecha ; azul ; "$C_1$"
(2 - t, 2 - 0.35 t^2) ; t: 0..2 ; flecha ; rojo ; "$C_2$"
```

Suele usarse cuando los tramos $C_1$ y $C_2$ tienen ecuaciones matemáticas diferentes, lo que impide hacer los cálculos con una sola integral. La propiedad vale también para una mayor cantidad de tramos.
