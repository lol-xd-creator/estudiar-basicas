# 7 · Control de flujo, iteración y comprensiones

*Peso **A**: tu amigo recordó trampas al modificar un iterable dentro de un `for`, usos de `range()`, comprensiones de listas y diccionarios y generadores. Los generadores por dentro (`yield`) están en la unidad 8; el alcance propio de las comprensiones, en [[6 · Alcance, regla LEGB y closures]]. Resultados comprobados con Python 3.14.*

::: claves
- El **`else` de un `for` o `while`** se ejecuta si el bucle terminó **sin `break`**: también si no dio ni una vuelta, o si hubo `continue`.
- **`break` sale solo del bucle más interno.**
- **No modifiques una lista mientras la recorrés:** si borrás, se saltean elementos; si agregás, puede no terminar nunca. Si cambia el **tamaño** de un dict o un set mientras se lo recorre, da `RuntimeError`. Se recorre una copia (`lista[:]`) o se arma una nueva con una comprensión.
- Reasignar la variable del `for` adentro del bucle **no cambia** las vueltas que siguen.
- `range(inicio, fin, paso)`: el `fin` **no** se incluye; es **perezoso** e **inmutable**. Un paso de 0 da `ValueError`; un `float`, `TypeError`.
- En una comprensión, el **`if` solo (filtro) va al final** y el **`if-else` (expresión) va al principio**. Con dos `for`, el de la izquierda es el de **afuera**.
- `(x for x in ...)` es un **generador**, no una tupla. No existe la "comprensión de tupla": se escribe `tuple(...)`.
- En un **dict comprehension**, si una clave se repite, queda el **último** valor.
- En `match`, un nombre suelto en un `case` **captura** cualquier valor (y lo asigna); no compara contra una variable.
:::

## 1. Condicionales

```python
x = 0
if x:               # 0 vale como falso
    print("a")
elif x == 0:
    print("b")
else:
    print("c")
```

- Se puede tener cualquier cantidad de `elif` y un solo `else` opcional. Se ejecuta **solo la primera** rama verdadera.
- Dos `if` seguidos (sin `elif`) son independientes: se evalúan los dos.
- La condición puede ser **cualquier** objeto: se usa su valor de verdad (`0`, `""`, `[]`, `{}`, `None` valen como falso).
- Expresión condicional (ternario): `a if condición else b`.

### `match` / `case` (Python 3.10)

Compara un valor contra **patrones**, de arriba hacia abajo, y ejecuta el **primero** que coincide. No hay "caída" al siguiente `case` (como el `switch` de C sin `break`).

```python
def f(cmd):
    match cmd:
        case "start" | "go":          # literales, con | para varias opciones
            return "arranca"
        case ["move", x, y]:          # secuencia: desempaqueta en x e y
            return f"mueve {x},{y}"
        case {"tipo": t}:             # dict: alcanza con que tenga esa clave
            return "dict " + t
        case int(n) if n > 10:        # tipo, con una condición (guarda)
            return "grande"
        case _:                       # comodín: todo lo demás
            return "otro"

print(f("go"), f(["move", 1, 2]), f({"tipo": "a", "z": 1}), f(42), f(3))
```

::: ojo
**Un nombre suelto en un `case` no compara: captura.** `case code:` no pregunta "¿vale lo mismo que la variable `code`?": acepta **cualquier** valor y lo **asigna** a `code`.

```python
code = 404
match 200:
    case code:              # captura el 200 y pisa la variable
        print("matched", code)
print(code)
```

Para comparar contra una constante hay que usar un nombre **con punto** (`case Codes.NOT_FOUND:`) o un literal. Si un `case` que captura todo no es el último, el resto no se podría alcanzar nunca, y Python da `SyntaxError: name capture 'y' makes remaining patterns unreachable`.
:::

## 2. Bucles: `for`, `while`, `break`, `continue`, `pass`, `else`

- `for x in iterable` recorre **cualquier iterable**: una lista, un string (letra por letra), un dict (sus **claves**), un archivo (renglón por renglón)…
- `while condición` repite mientras la condición sea verdadera.
- `break` corta el bucle; `continue` salta a la próxima vuelta; `pass` no hace nada (sirve para dejar un bloque vacío).

```python
for i in range(3):
    for j in range(3):
        if j == 1:
            break           # sale del for de j; el de i sigue
        print(i, j)
```

**El `else` de los bucles** (algo propio de Python) se ejecuta cuando el bucle termina **normalmente**, es decir, sin `break`. Sirve para búsquedas: "si no lo encontré…".

```python
for n in [1, 3, 5]:
    if n % 2 == 0:
        print("even")
        break
else:                       # no hubo break: no había ningún par
    print("no even")

for x in []:                # cero vueltas: tampoco hubo break
    pass
else:
    print("else igual")
```

```python
count = 0
while count < 3:
    count += 1
    if count == 2:
        break               # con break, el else no corre
else:
    print("else")
print(count)
```

::: observacion
`continue` **no** impide el `else`: solo `break` (o un `return` o una excepción que saque del bucle). Y si un `for` no da ninguna vuelta, su variable **no se crea**: usarla después da `NameError`.
:::

**Reasignar la variable del bucle no cambia lo que viene.** En cada vuelta el `for` le asigna el valor siguiente del iterable, pise lo que pise:

```python
for i in range(3):
    print(i, end=" ")
    i = 10                  # no afecta a la próxima vuelta
print()
print(i)                    # después del bucle queda el último valor asignado
```

**`enumerate`, `zip` y desempaquetado en el `for`:**

```python
for i, (a, b) in enumerate(zip("ab", "cd"), start=1):
    print(i, a, b)

for k, v in {"x": 1}.items():
    print(k, v)
```

## 3. Modificar lo que se recorre

::: ojo
**Borrar elementos de una lista mientras se la recorre saltea elementos.** El `for` avanza por **posición**: al borrar uno, todo se corre un lugar hacia la izquierda, y el siguiente queda en la posición que ya pasó.

```python
nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)      # al borrar el primer 2, el segundo pasa a su lugar y se saltea
print(nums)
```
:::

Las dos soluciones:

```python
nums = [1, 2, 2, 3]
for n in nums[:]:           # recorrer una copia y modificar la original
    if n == 2:
        nums.remove(n)
print(nums)

print([n for n in [1, 2, 2, 3] if n != 2])   # o armar una lista nueva
```

**Agregar mientras se recorre** hace que el bucle también recorra lo nuevo (sin un límite, no termina nunca):

```python
lst = [1, 2]
for x in lst:
    if len(lst) < 6:
        lst.append(x * 10)
print(lst)
```

**Dicts y sets:** si cambia su **tamaño** mientras se los recorre, Python lo detecta y corta. Cambiar los **valores** de claves que ya existen sí se puede.

```python
d = {"a": 1, "b": 2}
for k in d:
    d[k] = 0                # cambiar valores: vale
print(d)

for k in d:
    d["c"] = 3              # agregar una clave: RuntimeError
```

## 4. `range`

`range(fin)`, `range(inicio, fin)` o `range(inicio, fin, paso)`: los enteros desde `inicio` (incluido, por defecto 0) hasta `fin` (**excluido**), de a `paso` (por defecto 1).

```python
print(list(range(10, 0, -3)))    # paso negativo: de 10 hacia abajo, sin llegar a 0
print(list(range(1, 10, 3)))
print(list(range(5, 0)))         # vacío: con paso positivo no se llega de 5 a 0
print(len(range(1, 10, 2)), range(5)[-1], range(10)[2:5])
print(5 in range(10), 10 in range(10))
```

- En Python 3, `range` **no es una lista**: es un objeto **perezoso** (no guarda los números: los calcula) e **inmutable** (`r[0] = 5` da `TypeError`). En Python 2, `range` armaba una lista y la versión perezosa era `xrange`.
- Admite `len`, índices (también negativos), slices (devuelven otro `range`) e `in`, que con enteros es inmediato.
- Solo acepta enteros: `range(0, 1, 0.5)` da `TypeError`. Un paso de 0 da `ValueError: range() arg 3 must not be zero`.

## 5. Comprensiones

Una forma corta de armar una lista, un dict o un set a partir de un iterable:

```python
cuadrados = [x * x for x in range(5)]           # lista
pares = [x for x in range(10) if x % 2 == 0]     # con filtro
letras = {c: ord(c) for c in "ab"}               # dict
restos = {x % 3 for x in range(6)}               # set
print(cuadrados, pares, letras, restos)
```

::: ojo
**¿Dónde va el `if`?**

- **Filtro** (decide **si** el elemento entra): `if` solo, **al final**. `[x for x in range(5) if x % 2]` da `[1, 3]`.
- **Expresión condicional** (decide **qué** valor entra; entran todos): `a if c else b`, **al principio**. `[x if x % 2 else 0 for x in range(5)]` da `[0, 1, 0, 3, 0]`.
- `[x for x in range(5) if x % 2 else 0]` es un `SyntaxError`: un filtro no puede tener `else`.
:::

```python
print([x if x % 2 else 0 for x in range(5)])
print([x for x in range(5) if x % 2])
```

**Comprensiones anidadas.** Con varios `for`, se leen **en el mismo orden que si fueran bucles anidados**: el de la izquierda es el de afuera.

```python
print([(x, y) for x in range(2) for y in "ab"])
# es lo mismo que:
# for x in range(2):
#     for y in "ab":
#         ...

print([y for fila in [[1, 2], [3]] for y in fila])    # aplanar una lista de listas
print([[x * y for y in range(3)] for x in range(2)])  # una comprensión adentro de otra: arma filas
```

**Dict comprehension con claves repetidas:** cada asignación pisa la anterior, y queda el **último** valor.

```python
print({x % 3: x for x in range(6)})
```

## 6. Generator expressions

Con **paréntesis** no se arma una tupla: se arma un **generador**, que produce los valores de a uno a medida que se los piden (perezoso), y que **se agota**.

```python
g = (x for x in range(3))
print(type(g).__name__)
print(tuple(g), tuple(g))       # la segunda vez ya está agotado
print(sum(x * x for x in range(4)))   # dentro de una llamada, alcanza con los paréntesis de la función
```

- Ventaja: no guarda todos los valores en memoria (útil con millones de elementos, o si solo se necesita una suma, un `max`, un `any`…).
- Desventaja: se recorre **una sola vez** y no se puede indexar.

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
for n in [1, 3, 5]:
    if n % 2 == 0:
        print("even")
        break
else:
    print("no even")
```
- [ ] `even`
- [x] `no even`
- [ ] Nothing is printed
- [ ] It raises `SyntaxError`
::: solucion Explicación
El `else` de un `for` se ejecuta cuando el bucle termina **sin `break`**. Ningún número es par, así que nunca se llega al `break`, y al terminar corre el `else`. Es sintaxis válida: el `else` va alineado con el `for`, no con el `if`.
:::
:::

::: pregunta What is the output of the following code?
```python
count = 0
while count < 3:
    count += 1
    if count == 2:
        break
else:
    print("else")
print(count)
```
- [ ] `else` and then `2`
- [x] `2`
- [ ] `else` and then `3`
- [ ] `3`
::: solucion Explicación
Cuando `count` llega a 2, el `break` corta el bucle. Como terminó por `break`, el `else` **no** se ejecuta. Queda `count = 2`.
:::
:::

::: pregunta What is the output of the following code?
```python
nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)
print(nums)
```
- [ ] `[1, 3]`
- [x] `[1, 2, 3]`
- [ ] `[1, 2, 2, 3]`
- [ ] It raises `RuntimeError`
::: solucion Explicación
El `for` avanza por **posición**. En la posición 1 encuentra el primer `2` y lo borra: todo se corre, y el segundo `2` pasa a la posición 1, que ya se recorrió. En la posición 2 ahora está el `3`. El segundo `2` se saltea y queda en la lista. Con listas no hay `RuntimeError` (eso pasa con dicts y sets que cambian de tamaño).
:::
:::

::: pregunta What is the output of `print(list(range(10, 0, -3)))`?
- [ ] `[10, 7, 4, 1, 0]`
- [x] `[10, 7, 4, 1]`
- [ ] `[]`
- [ ] `[7, 4, 1]`
::: solucion Explicación
Arranca en 10 (incluido) y baja de a 3 mientras no llegue al `fin`, que **no** se incluye: 10, 7, 4, 1. El siguiente sería −2, que ya pasó el 0.
:::
:::

::: pregunta What is the output of `print(len(range(1, 10, 2)))`?
- [ ] `4`
- [x] `5`
- [ ] `9`
- [ ] `10`
::: solucion Explicación
Los números son 1, 3, 5, 7 y 9: cinco. El 10 no se incluye (y el 11 ya se pasa). `range` admite `len` sin armar la lista.
:::
:::

::: pregunta What is the output of the following code?
```python
print([x if x % 2 else 0 for x in range(5)])
```
- [ ] `[1, 3]`
- [x] `[0, 1, 0, 3, 0]`
- [ ] `[0, 0, 0, 0, 0]`
- [ ] It raises `SyntaxError`
::: solucion Explicación
Es una **expresión condicional** al principio, no un filtro: entran los cinco elementos, y cada uno vale `x` si es impar (`x % 2` es 1, verdadero) o `0` si es par. Con el filtro al final (`[x for x in range(5) if x % 2]`) el resultado sería `[1, 3]`.
:::
:::

::: pregunta What is the output of the following code?
```python
print([(x, y) for x in range(2) for y in "ab"])
```
- [x] `[(0, 'a'), (0, 'b'), (1, 'a'), (1, 'b')]`
- [ ] `[(0, 'a'), (1, 'a'), (0, 'b'), (1, 'b')]`
- [ ] `[(0, 'a'), (1, 'b')]`
- [ ] `[[(0, 'a'), (0, 'b')], [(1, 'a'), (1, 'b')]]`
::: solucion Explicación
Los `for` se leen como bucles anidados, en orden: el primero (`x`) es el de **afuera** y el segundo (`y`) el de adentro. Para cada `x` se recorren todas las `y`. Sale una lista plana. La tercera opción sería `zip`.
:::
:::

::: pregunta What is the output of the following code?
```python
t = (x for x in range(3))
print(type(t).__name__)
```
- [ ] `tuple`
- [ ] `list`
- [x] `generator`
- [ ] `range`
::: solucion Explicación
Una comprensión entre **paréntesis** no arma una tupla: arma una **generator expression**. No existe la "comprensión de tupla"; para eso se escribe `tuple(x for x in range(3))`.
:::
:::

::: pregunta What is the output of the following code?
```python
print({x % 3: x for x in range(6)})
```
- [ ] `{0: 0, 1: 1, 2: 2}`
- [x] `{0: 3, 1: 4, 2: 5}`
- [ ] `{0: [0, 3], 1: [1, 4], 2: [2, 5]}`
- [ ] It raises `KeyError`
::: solucion Explicación
Las claves son los restos 0, 1, 2, 0, 1, 2: cada una aparece dos veces. Cada asignación **pisa** el valor anterior de esa clave, así que queda el **último**: 3, 4 y 5. Las claves conservan el orden en que se insertaron por primera vez.
:::
:::

::: pregunta What is the output of the following code?
```python
for i in range(3):
    print(i, end=" ")
    i = 10
```
- [x] `0 1 2`
- [ ] `0`
- [ ] `0 10 10`
- [ ] It runs forever
::: solucion Explicación
En cada vuelta, el `for` toma el siguiente valor de `range(3)` y se lo **asigna** a `i`, sin importar lo que se le haya asignado adentro. Reasignar `i` no cambia el iterador. (Después del bucle, `i` quedaría en 10.)
:::
:::

::: pregunta What happens when this code runs?
```python
d = {"a": 1}
for k in d:
    d["b"] = 2
```
- [ ] `d` becomes `{'a': 1, 'b': 2}`
- [ ] The loop runs forever
- [x] It raises `RuntimeError`
- [ ] It raises `KeyError`
::: solucion Explicación
Agregar una clave cambia el **tamaño** del diccionario mientras se lo recorre, y Python lo detecta: *RuntimeError: dictionary changed size during iteration*. Lo mismo con un set. Cambiar el valor de una clave que ya existe sí está permitido. La solución es recorrer una copia: `for k in list(d):`.
:::
:::

::: pregunta What is the output of the following code?
```python
code = 404
match 200:
    case code:
        print("matched", code)
```
- [ ] Nothing is printed, because 200 is not 404
- [ ] `matched 404`
- [x] `matched 200`
- [ ] It raises `SyntaxError`
::: solucion Explicación
En un `case`, un nombre suelto es un **patrón de captura**: coincide con **cualquier** valor y se lo asigna a ese nombre. No compara contra la variable `code`: la **pisa** con 200. Para comparar contra una constante se usa un literal o un nombre con punto (`case Codes.NOT_FOUND:`). No es `SyntaxError` porque es el único `case`; si hubiera otros después, sí, porque quedarían inalcanzables.
:::
:::
