# 4 · Estructuras de datos

*Peso **A**: tu amigo recordó operaciones bit a bit con sets, listas contra tuplas y desempaquetado avanzado. Lo de identidad, copias y qué es hashable está en [[3 · Modelo de objetos: identidad, mutabilidad, memoria y copias]]. Resultados comprobados con Python 3.14.*

::: claves
- Los métodos que **modifican** una lista (`sort`, `append`, `extend`, `insert`, `remove`, `reverse`, `clear`) devuelven **`None`**. `sorted()` devuelve una lista nueva y `reversed()`, un **iterador**.
- `append(x)` agrega **un** elemento (aunque sea una lista); `extend(it)` agrega **cada** elemento del iterable.
- Un **índice** fuera de rango da `IndexError`; un **slice** fuera de rango, **no**: devuelve lo que haya (o `[]`).
- `(1)` es un `int`; la tupla de un elemento es **`(1,)`**: la tupla la arma **la coma**, no los paréntesis. `()` es la tupla vacía.
- **`{}` es un diccionario vacío**; el set vacío es `set()`.
- Sets con operadores: `|` unión, `&` intersección, `-` diferencia, `^` diferencia simétrica, `<=` subconjunto, `<` subconjunto propio. Los operadores exigen **sets** de los dos lados; los métodos (`union`, `update`…) aceptan cualquier iterable.
- Los dicts guardan el **orden de inserción** (garantizado desde 3.7). `d[k]` con una clave que no existe da `KeyError`; `d.get(k)` devuelve `None`.
- Recorrer un dict (o preguntar `in`) usa sus **claves**.
- En `a, *b, c = ...`, **`b` siempre es una lista**, aunque lo de la derecha sea una tupla o un string.
- `dict.fromkeys(claves, [])` comparte **la misma lista** entre todas las claves. Un `defaultdict` **crea la clave** con solo leerla con `[]`.
:::

## 1. Listas

Secuencia **ordenada** y **mutable**, que admite elementos de cualquier tipo y repetidos.

| Método | Qué hace | Devuelve |
|---|---|---|
| `append(x)` | agrega `x` al final, como **un** elemento | `None` |
| `extend(it)` | agrega cada elemento del iterable | `None` |
| `insert(i, x)` | inserta `x` en la posición `i` | `None` |
| `pop(i=-1)` | saca y devuelve el elemento `i` (por defecto, el último) | el elemento |
| `remove(x)` | saca la **primera** aparición de `x`; si no está, `ValueError` | `None` |
| `index(x)` / `count(x)` | posición de la primera aparición / cantidad de apariciones | `int` |
| `sort()` / `reverse()` | ordena / invierte **en el lugar** | `None` |
| `copy()` / `clear()` | copia superficial / vacía la lista | lista nueva / `None` |

::: ojo
**`x = lista.sort()` deja `x` en `None`.** Los métodos que modifican la lista en el lugar devuelven `None`, a propósito, para que no se confundan con los que devuelven una lista nueva. Si querés el resultado, usá `sorted(lista)`.
:::

```python
lst = [3, 1, 2]
x = lst.sort()
print(x, lst)

print(sorted([3, 1, 2]))
print(list(reversed([1, 2, 3])))   # reversed() devuelve un iterador
```

```python
a = [1, 2]
a.append([3, 4])      # un solo elemento: la lista [3, 4]
b = [1, 2]
b.extend([3, 4])      # dos elementos: 3 y 4
print(a, len(a))
print(b, len(b))

c = [1]
c.extend("hi")        # un string es iterable: agrega cada letra
print(c)
```

`lista += iterable` hace lo mismo que `extend` (por eso `d = [1]; d += "hi"` da `[1, 'h', 'i']`).

**Índices y slices.**

- Los índices negativos cuentan desde el final: `l[-1]` es el último.
- `l[inicio:fin:paso]` va de `inicio` (incluido) a `fin` (**excluido**). `l[::-1]` invierte.
- Un índice fuera de rango es `IndexError`, pero un slice fuera de rango se recorta solo.

```python
lst = [1, 2, 3]
print(lst[5:], lst[-10:2], lst[::-1], lst[-1])
print(lst[5])         # IndexError: list index out of range
```

**Asignar a un slice** reemplaza esa parte, aunque cambie el largo:

```python
lst = [1, 2, 3, 4, 5]
lst[1:3] = ["x"]      # dos elementos reemplazados por uno
print(lst)
del lst[:2]           # borrar un tramo
print(lst)
lst[1:1] = [7, 8]     # un slice vacío: inserta sin borrar
print(lst)
```

`[1, 2] * 2` da `[1, 2, 1, 2]` (con listas adentro, ver la trampa de `[[0] * 3] * 3` en la unidad 3).

## 2. Tuplas

Secuencia **ordenada** e **inmutable**. Solo tiene dos métodos: `count` e `index`.

```python
print(type(()), type((1)), type((1,)))
t = 1, 2              # la coma arma la tupla; los paréntesis son opcionales
print(type(t), t)
```

- **Empaquetar y desempaquetar:** `t = 1, 2` empaqueta; `a, b = t` desempaqueta. Las funciones que "devuelven varios valores" devuelven una tupla.
- Por ser inmutables, son **hashables** (si lo que contienen también lo es): pueden ser claves de un diccionario.
- Ocupan menos memoria que una lista equivalente, y la inmutabilidad documenta que el dato no va a cambiar.
- Una tupla puede contener objetos mutables, y `t[1] += [4]` tiene su trampa: ver la unidad 3.

**`namedtuple`**: una tupla con nombres para cada campo.

```python
from collections import namedtuple

Punto = namedtuple("Punto", ["x", "y"])
p = Punto(1, 2)
print(p, p.x, p[1])   # por nombre o por índice
p.x = 5               # AttributeError: sigue siendo inmutable
```

## 3. Sets

Colección **sin orden** y **sin repetidos**, de elementos **hashables**. Buscar con `in` es muy rápido (O(1) en promedio, contra O(n) en una lista).

```python
x = {}
y = set()
print(type(x), type(y))   # {} es un diccionario
print({1, 1, 2})          # los repetidos se descartan
```

**Operaciones de conjuntos** con los operadores bit a bit:

| Operador | Método | Resultado |
|---|---|---|
| `a \| b` | `a.union(b)` | unión: lo que está en alguno |
| `a & b` | `a.intersection(b)` | intersección: lo que está en los dos |
| `a - b` | `a.difference(b)` | diferencia: lo que está en `a` y no en `b` |
| `a ^ b` | `a.symmetric_difference(b)` | diferencia simétrica: lo que está en uno solo |
| `a <= b` | `a.issubset(b)` | ¿`a` es subconjunto de `b`? |
| `a < b` | | ¿subconjunto **propio** (y distinto)? |

```python
s = {1, 2, 3}
t = {2, 3, 4}
print(s | t, s & t, s - t, s ^ t)
print({1, 2} <= {1, 2}, {1, 2} < {1, 2})
```

::: ojo
**Los operadores necesitan sets de los dos lados; los métodos, no.**

```python
s = {1, 2}
print(s.union([3]))   # el método acepta cualquier iterable
print(s | [3])        # TypeError: unsupported operand type(s) for |: 'set' and 'list'
```
:::

- `add(x)` agrega **un** elemento; `update(it)` agrega cada elemento de un iterable (`s.update("cd")` agrega `'c'` y `'d'`).
- `remove(x)` da `KeyError` si `x` no está; `discard(x)`, no.
- Un set no puede contener elementos no hashables: `{[1, 2]}` es `TypeError`. Por la misma razón, no puede haber un set de sets: se usa **`frozenset`**, la versión inmutable (y hashable).

```python
s = {1}
s.discard(2)          # no pasa nada
print(s)
s.remove(2)           # KeyError: 2
```

## 4. Diccionarios

Pares **clave → valor**. Las claves tienen que ser **hashables** y no se repiten; desde Python 3.7 se garantiza que el dict guarda el **orden de inserción**.

```python
d = {"b": 1, "a": 2}
d["c"] = 3
print(list(d))          # recorrer un dict da sus claves, en orden de inserción
print("a" in d, 1 in d) # in pregunta por las CLAVES
print(1 in d.values(), ("a", 2) in d.items())
```

| Operación | Si la clave no está |
|---|---|
| `d[k]` | `KeyError` |
| `d.get(k)` / `d.get(k, defecto)` | devuelve `None` / el valor por defecto |
| `d.setdefault(k, v)` | la crea con `v` y devuelve `v` (si ya estaba, devuelve su valor y no la toca) |
| `d.pop(k)` / `d.pop(k, defecto)` | `KeyError` / devuelve el valor por defecto |
| `d.popitem()` | saca y devuelve el **último** par insertado |

```python
d = {"a": 1}
print(d.get("b"), d.get("b", 0))
print(d.setdefault("c", []), d)
print(d.pop("a"), d)
print(d["zzz"])         # KeyError: 'zzz'
```

**Combinar diccionarios:** con claves repetidas gana el de la **derecha**.

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}
print(d1 | d2)          # Python 3.9 o posterior
print({**d1, **d2})     # lo mismo, con desempaquetado
d1.update(d2)           # modifica d1 en el lugar (como d1 |= d2)
print(d1)
```

**Vistas.** `keys()`, `values()` e `items()` no devuelven listas sino **vistas**: reflejan los cambios del diccionario y no se pueden indexar.

```python
d = {"a": 1, "b": 2}
k = d.keys()
d["c"] = 3
print(len(k), k)        # la vista ve la clave nueva
print(k[0])             # TypeError: 'dict_keys' object is not subscriptable
```

::: ojo
**`dict.fromkeys(claves, valor)` usa el mismo objeto para todas las claves.** Con un valor mutable, todas comparten la misma lista:

```python
d = dict.fromkeys(["a", "b"], [])
d["a"].append(1)
print(d)                # las dos claves ven el 1
```

Para una lista distinta por clave: `{k: [] for k in ["a", "b"]}`.
:::

`dict(zip("abc", range(3)))` arma un diccionario a partir de dos secuencias. Dos diccionarios son iguales si tienen los mismos pares, **sin importar el orden**.

## 5. El módulo `collections`

| Clase | Para qué |
|---|---|
| `defaultdict(fábrica)` | un dict que, si se pide una clave que no existe con `[]`, la **crea** con `fábrica()` (`int` da 0, `list` da `[]`) |
| `Counter(iterable)` | cuenta cuántas veces aparece cada elemento; `most_common(n)` |
| `deque` | cola de dos puntas: `append`, `appendleft`, `pop`, `popleft` rápidos; `maxlen` descarta los del otro extremo |
| `namedtuple` | tupla con nombres de campo |
| `OrderedDict` | dict con `move_to_end`; para él, el orden **sí** cuenta al comparar |

```python
from collections import Counter, defaultdict, deque

c = Counter("banana")
print(c, c.most_common(1), c["z"])   # una clave que no está cuenta 0

dd = defaultdict(int)
dd["x"] += 1            # no existía: arranca en 0
print(dd["y"], len(dd)) # ¡leer dd["y"] la creó!
print(dd.get("z"), len(dd))   # get no la crea

q = deque([1, 2, 3], maxlen=3)
q.append(4)             # está lleno: se va el 1
print(q)
```

## 6. Desempaquetado avanzado

```python
a, *b, c = "hello"      # el * se lleva "lo que sobra", siempre en una lista
print(a, b, c)

first, *_ = (1, 2, 3)   # _ es una convención para "no me importa"
print(first, _)

x, *y = (1,)
print(x, y)             # puede quedar vacía, pero sigue siendo lista

a, b = 1, 2
a, b = b, a             # intercambio sin variable auxiliar
print(a, b)

(x, y), z = (1, 2), 3   # desempaquetado anidado
print(x, y, z)
```

- Solo puede haber **un** `*` a la izquierda: `*a, *b = [1, 2, 3]` es `SyntaxError`.
- Si no coinciden las cantidades: `ValueError: too many values to unpack` o `not enough values to unpack`.

**Desempaquetar para armar colecciones:**

```python
a = [1, 2]
b = (3,)
print([*a, *b, *"ok"])          # una lista con todo
print({*a, *b})                 # un set
print({**{"x": 1}, "y": 2})     # un dict
```

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
lst = [3, 1, 2]
x = lst.sort()
print(x, lst)
```
- [ ] `[1, 2, 3] [1, 2, 3]`
- [ ] `[1, 2, 3] [3, 1, 2]`
- [x] `None [1, 2, 3]`
- [ ] `None [3, 1, 2]`
::: solucion Explicación
`sort()` ordena la lista **en el lugar** y devuelve `None`, así que `x` queda en `None` y `lst` queda ordenada. Para obtener una lista ordenada sin tocar la original se usa `sorted(lst)`.
:::
:::

::: pregunta What is the output of the following code?
```python
a = [1, 2]
a.append([3, 4])
b = [1, 2]
b.extend([3, 4])
print(len(a), len(b))
```
- [ ] `4 4`
- [x] `3 4`
- [ ] `4 3`
- [ ] `3 3`
::: solucion Explicación
`append` agrega su argumento como **un único** elemento: `a` queda `[1, 2, [3, 4]]`, de largo 3. `extend` agrega **cada** elemento del iterable: `b` queda `[1, 2, 3, 4]`, de largo 4.
:::
:::

::: pregunta What is the output of `print(type(()), type((1)), type((1,)))`?
- [ ] `<class 'tuple'> <class 'tuple'> <class 'tuple'>`
- [x] `<class 'tuple'> <class 'int'> <class 'tuple'>`
- [ ] `<class 'NoneType'> <class 'int'> <class 'tuple'>`
- [ ] `<class 'tuple'> <class 'int'> <class 'list'>`
::: solucion Explicación
`()` es la tupla vacía. `(1)` es solo un `1` entre paréntesis de agrupación: un `int`. La tupla la arma **la coma**: `(1,)` (o `1,`) es una tupla de un elemento.
:::
:::

::: pregunta What is the output of the following code?
```python
s = {1, 2, 3}
t = {2, 3, 4}
print(s ^ t, s & t)
```
- [ ] `{1, 2, 3, 4} {2, 3}`
- [x] `{1, 4} {2, 3}`
- [ ] `{2, 3} {1, 4}`
- [ ] It raises `TypeError` because `^` only works with integers
::: solucion Explicación
Con sets, los operadores bit a bit son operaciones de conjuntos: `^` es la **diferencia simétrica** (lo que está en uno solo: 1 y 4) y `&` la **intersección** (lo que está en los dos: 2 y 3). `|` sería la unión.
:::
:::

::: pregunta What is the output of the following code?
```python
a, *b, c = "hello"
print(b)
```
- [ ] `ell`
- [ ] `('e', 'l', 'l')`
- [x] `['e', 'l', 'l']`
- [ ] It raises `ValueError`
::: solucion Explicación
`a` toma la primera letra y `c` la última; el `*b` se lleva todo lo del medio, y **siempre** lo guarda en una **lista**, aunque lo de la derecha sea un string o una tupla.
:::
:::

::: pregunta What is the output of the following code?
```python
d = dict.fromkeys(["a", "b"], [])
d["a"].append(1)
print(d)
```
- [ ] `{'a': [1], 'b': []}`
- [x] `{'a': [1], 'b': [1]}`
- [ ] `{'a': 1, 'b': []}`
- [ ] It raises `TypeError`
::: solucion Explicación
`fromkeys` asigna **el mismo objeto** (la única lista que se le pasó) como valor de todas las claves. Modificarla a través de `d["a"]` se ve también en `d["b"]`. Para una lista por clave: `{k: [] for k in ["a", "b"]}`.
:::
:::

::: pregunta What is the output of the following code?
```python
from collections import defaultdict

dd = defaultdict(int)
dd["x"] += 1
print(dd["y"], len(dd))
```
- [ ] It raises `KeyError`
- [ ] `0 1`
- [x] `0 2`
- [ ] `None 1`
::: solucion Explicación
Con un `defaultdict(int)`, pedir con `[]` una clave que no existe la **crea** con `int()`, que es 0. `dd["x"] += 1` crea `"x"` y la lleva a 1; `dd["y"]` crea `"y"` con 0. Quedan dos claves. Con `dd.get("y")` no se habría creado.
:::
:::

::: pregunta What is the output of the following code?
```python
lst = [1, 2, 3, 4, 5]
lst[1:3] = ["x"]
print(lst)
```
- [ ] `[1, 'x', 3, 4, 5]`
- [x] `[1, 'x', 4, 5]`
- [ ] `[1, ['x'], 4, 5]`
- [ ] It raises `ValueError`
::: solucion Explicación
Asignar a un slice **reemplaza** ese tramo (las posiciones 1 y 2: `2` y `3`) por los elementos de la lista de la derecha, aunque sean de otra cantidad. La lista se achica. Si fuera `lst[1] = ["x"]`, sí quedaría una lista adentro.
:::
:::

::: pregunta Given `s = {1, 2}`, which of the following raises a `TypeError`?
- [ ] `s.union([3])`
- [x] `s | [3]`
- [ ] `s | {3}`
- [ ] `s.update([3])`
::: solucion Explicación
Los **operadores** de conjuntos (`|`, `&`, `-`, `^`) exigen sets de los dos lados. Los **métodos** equivalentes (`union`, `update`, `intersection`…) aceptan cualquier iterable y lo convierten.
:::
:::

::: pregunta What is the output of the following code?
```python
d = {"a": 1, "b": 2}
k = d.keys()
d["c"] = 3
print(len(k))
```
- [ ] `2`
- [x] `3`
- [ ] It raises `RuntimeError`
- [ ] It raises `TypeError`
::: solucion Explicación
`keys()` no devuelve una lista copiada, sino una **vista** del diccionario: refleja los cambios que se hagan después. Al agregar `"c"`, la vista ya tiene tres claves. (`RuntimeError` salta si se cambia el tamaño del dict **mientras se lo recorre**, que no es el caso.)
:::
:::

::: pregunta Given `lst = [1, 2, 3]`, which of the following expressions raise an `IndexError`? (Select all that apply)
- [x] `lst[5]`
- [ ] `lst[5:]`
- [ ] `lst[-10:2]`
- [x] `lst[-4]`
- [ ] `lst[::-1]`
::: solucion Explicación
Un **índice** fuera de rango da `IndexError`: `5` y `-4` (la lista tiene posiciones de −3 a 2). Un **slice** nunca da `IndexError`: se recorta a lo que exista. `lst[5:]` da `[]`, `lst[-10:2]` da `[1, 2]` y `lst[::-1]` da `[3, 2, 1]`.
:::
:::

::: pregunta Which built-in type is an ordered and immutable sequence?
- [ ] `list`
- [ ] `set`
- [x] `tuple`
- [ ] `dict`
::: solucion Explicación
La **tupla** mantiene el orden y no se puede modificar. La lista también es ordenada, pero mutable. El set no tiene orden. El dict guarda el orden de inserción, pero es mutable y no es una secuencia (no se indexa por posición).
:::
:::
