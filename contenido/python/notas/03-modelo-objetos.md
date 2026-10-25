# 3 · Modelo de objetos: identidad, mutabilidad, memoria y copias

*Peso **A**: tu amigo recordó preguntas de `is` contra `==`, de referencias en memoria y de copia superficial contra profunda. Esta unidad explica casi todas las trampas de las demás: si entendés que **las variables son nombres que apuntan a objetos**, el resto sale solo. Resultados comprobados con Python 3.14 (CPython).*

::: claves
- **Todo es un objeto**, con **identidad** (`id()`), **tipo** (`type()`) y **valor**. Una variable es un **nombre** que apunta a un objeto; asignar (`b = a`) **no copia** nada.
- **`==` compara valores** (llama a `__eq__`); **`is` compara identidad** (¿es el mismo objeto?). `is` solo se usa con singletons: `x is None`.
- Que `a is b` dé `True` con números o strings iguales es un **detalle de implementación** (caché de enteros de −5 a 256, *interning* de strings, constantes compartidas). No hay que confiar en eso.
- **Mutables:** `list`, `dict`, `set`, `bytearray` y casi todos los objetos de clases propias. **Inmutables:** `int`, `float`, `complex`, `bool`, `str`, `bytes`, `tuple`, `frozenset`, `None`.
- Con una lista, `a += [x]` **modifica en el lugar**; `a = a + [x]` **crea otra lista**. Con inmutables, los dos crean un objeto nuevo.
- **Copia superficial** (`copy.copy`, `a[:]`, `list(a)`, `a.copy()`): contenedor nuevo, **mismos elementos adentro**. **Copia profunda** (`copy.deepcopy`): copia todo, recursivamente.
- `[[0] * 3] * 3` son **tres referencias a la misma lista**.
- CPython libera memoria por **conteo de referencias**, y un **recolector de basura** (*garbage collector*) se ocupa de los **ciclos**. `del x` borra **el nombre**, no el objeto.
- **Hashable** (puede ser clave de un dict o estar en un set): los inmutables, y una tupla solo si todo lo que contiene es hashable. `1`, `1.0` y `True` son **la misma clave**.
:::

## 1. Todo es un objeto; las variables son nombres

En Python **todo** es un objeto: números, strings, listas, funciones, clases, módulos y hasta `None`. Cada objeto tiene:

- **identidad**: no cambia mientras el objeto existe. `id(obj)` la devuelve; en CPython es su dirección de memoria;
- **tipo**: qué es y qué operaciones admite (`type(obj)`);
- **valor**: lo que contiene, que puede cambiar o no según el tipo.

Una variable **no es una caja** que guarda un valor: es una **etiqueta** pegada a un objeto. Asignar es pegar una etiqueta, y dos etiquetas pueden ir en el mismo objeto:

```python
a = [1, 2, 3]
b = a              # b es otra etiqueta para la MISMA lista
b.append(4)
print(a, a is b)
```

## 2. `is` contra `==`

```python
x = [1, 2]
y = [1, 2]
print(x == y)      # True: mismo valor
print(x is y)      # False: son dos listas distintas
```

| | `==` | `is` |
|---|---|---|
| Pregunta | ¿tienen el mismo **valor**? | ¿son el **mismo objeto**? |
| Equivale a | `a.__eq__(b)` (se puede redefinir) | `id(a) == id(b)` (no se puede redefinir) |
| Se usa para | comparar valores | `None`, `True`, `False` y otros singletons |

PEP 8 dice que las comparaciones con `None` se hacen con **`is`** o **`is not`**, nunca con `==`. Hay **un solo** `None` en todo el programa (es un *singleton*).

::: ojo
**`is` con números y strings es una trampa.** Puede dar `True` "de casualidad":

- CPython tiene preparados de antemano los **enteros de −5 a 256** (*small integer cache*): todos los `256` son el mismo objeto, pero dos `257` creados por separado no.
- Muchos strings que parecen identificadores (`"hola"`) se **internan**: se guarda una sola copia.
- Dentro de un mismo bloque de código, el compilador **reutiliza las constantes iguales**: `a = 1000` y `b = 1000` en el mismo archivo pueden ser el mismo objeto.

Desde Python 3.8, escribir `x is 1000` da un aviso: *SyntaxWarning: "is" with 'int' literal. Did you mean "=="?*
:::

```python
a = int("256"); b = int("256")     # int(...) crea el número en tiempo de ejecución
c = int("257"); d = int("257")
print(a is b, c is d)              # el 256 está en la caché; el 257, no

a = 1000
b = 1000
print(a is b)                      # True: constantes del mismo bloque, compartidas
```

**Un caso raro: `nan`.** El valor "no es un número" no es igual a nada, ni siquiera a sí mismo. Pero al comparar listas, Python mira primero la identidad (si es el mismo objeto, lo da por igual):

```python
x = float("nan")
print(x == x)        # False
print([x] == [x])    # True: es el mismo objeto, ni se compara el valor
```

## 3. Mutables e inmutables

Un objeto **mutable** puede cambiar su valor sin cambiar de identidad; uno **inmutable**, no: cualquier "cambio" crea otro objeto.

| Mutables | Inmutables |
|---|---|
| `list`, `dict`, `set`, `bytearray`, objetos de clases propias | `int`, `float`, `complex`, `bool`, `str`, `bytes`, `tuple`, `frozenset`, `range`, `None` |

```python
x = 5
antes = id(x)
x += 1               # int inmutable: x pasa a apuntar a otro objeto
print(id(x) == antes)

l = [1]
antes = id(l)
l += [2]             # lista mutable: se modifica la misma
print(id(l) == antes)
```

Los strings son inmutables: no se pueden cambiar de a un carácter.

```python
s = "hola"
s[0] = "H"           # TypeError: 'str' object does not support item assignment
```

**Una tupla puede contener objetos mutables.** La tupla no cambia (siempre tiene los mismos objetos), pero esos objetos sí pueden cambiar por dentro:

```python
t = (1, [2, 3])
t[1].append(4)       # se modifica la lista de adentro: vale
print(t)
t[1] = 9             # cambiar qué objeto hay en la tupla: TypeError
```

## 4. `+=` contra `=`: aliasing

Con una **lista**, `+=` llama a `__iadd__`, que la **modifica en el lugar**. En cambio `a = a + [x]` arma una lista **nueva** y le pasa la etiqueta `a`. Si hay otro nombre apuntando a la lista, la diferencia se nota:

```python
a = [1, 2]
b = a
a += [3]            # modifica la lista que comparten a y b
a = a + [4]         # crea una lista nueva: desde acá a y b son distintas
print(a, b)
```

Con un **inmutable** (número, string, tupla), `+=` no puede modificar el objeto: crea otro, igual que `=`:

```python
s = "hola"
t = s
s += "!"            # s apunta a un string nuevo; t sigue en el viejo
print(t, s, s is t)
```

::: ojo
**La trampa de la tupla con una lista adentro:** `t[1] += [4]` lanza `TypeError` **pero igual modifica la lista**. Pasa en dos pasos: primero `list.__iadd__` agrega el 4 (la lista es mutable), y después Python intenta guardar el resultado en `t[1]`, que la tupla no permite.

```python
t = (1, [2, 3])
try:
    t[1] += [4]
except TypeError as e:
    print("TypeError:", e)
print(t)            # el 4 quedó adentro
```
:::

**Lo mismo al pasar argumentos.** El parámetro es otro nombre para el mismo objeto, así que `+=` dentro de una función modifica la lista de afuera, pero no una tupla (Python pasa los argumentos "por asignación", ver [[5 · Funciones y argumentos]]):

```python
def f(lst):
    lst += [1]       # modifica la lista de quien llamó

mia = []
f(mia)
print(mia)

def g(t):
    t += (1,)        # crea una tupla nueva, local a g

tup = ()
g(tup)
print(tup)
```

## 5. Copia superficial y copia profunda

| | Qué copia | Cómo |
|---|---|---|
| **Asignación** | nada: otro nombre para el mismo objeto | `b = a` |
| **Copia superficial** (*shallow*) | el contenedor; adentro quedan **los mismos objetos** | `copy.copy(a)`, `a[:]`, `list(a)`, `a.copy()`, `[*a]`, `dict.copy()`, `{**d}` |
| **Copia profunda** (*deep*) | el contenedor **y todo lo que tiene adentro**, recursivamente | `copy.deepcopy(a)` |

```python
import copy

a = [[1, 2], [3]]
b = copy.copy(a)        # lista nueva, pero las sublistas son las mismas
b[0].append(9)          # modifica una sublista compartida: se ve en a
b.append([4])           # agrega a la lista nueva: no se ve en a
print(a)
print(b)

c = copy.deepcopy(a)    # todo nuevo
c[0].append(7)
print(a, c)
```

Todas las formas de copia superficial dan una lista **nueva** con **los mismos** elementos:

```python
a = [[1], [2]]
for b in (a[:], list(a), a.copy(), [*a]):
    print(b is a, b[0] is a[0])
```

::: observacion
Copiar un **inmutable** no tiene sentido (no se puede modificar), así que `copy.copy` y `copy.deepcopy` devuelven **el mismo objeto**. Con una tupla que contiene algo mutable, `deepcopy` sí arma una tupla nueva. `deepcopy` también se banca los objetos que se contienen a sí mismos (ciclos).
:::

```python
import copy

t = (1, 2, 3)
print(copy.copy(t) is t, copy.deepcopy(t) is t)   # inmutable: el mismo objeto
u = (1, [2])
print(copy.deepcopy(u) is u)                      # tiene una lista: tupla nueva
```

::: ojo
**`[[0] * 3] * 3` no arma una matriz.** El `* 3` de afuera repite **la referencia** a la misma sublista tres veces:

```python
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)                       # cambió la primera columna de las tres filas
print(grid[0] is grid[1])

ok = [[0] * 3 for _ in range(3)]  # una sublista nueva en cada vuelta
ok[0][0] = 1
print(ok)
```

En cambio `[0] * 3` está bien: repite tres referencias al `0`, pero los enteros son inmutables y no se pueden "modificar".
:::

## 6. Memoria: conteo de referencias y recolector de basura

Python maneja la memoria solo: no hay `malloc` ni `free`. CPython guarda los objetos en un **heap privado** y los libera así:

- **Conteo de referencias.** Cada objeto lleva la cuenta de cuántos nombres, listas y demás apuntan a él. Cuando la cuenta llega a **cero**, se libera en ese mismo momento. `sys.getrefcount(obj)` la muestra (con una referencia de más: la del propio argumento).
- **Recolector de basura** (módulo `gc`). El conteo no alcanza cuando hay **ciclos**: dos objetos que se apuntan entre sí nunca llegan a cero. Cada tanto, el recolector busca grupos de objetos que solo se apuntan entre ellos y los libera.

```python
import sys

a = []
base = sys.getrefcount(a)
b = a                       # una referencia más
print(sys.getrefcount(a) - base)
del b                       # una menos
print(sys.getrefcount(a) - base)
```

**`del` borra el nombre, no el objeto.** El objeto se libera solo cuando no queda ninguna referencia:

```python
a = [1, 2]
b = a
del a          # se va la etiqueta "a"; la lista sigue viva por b
print(b)
print(a)       # NameError
```

```python
class Foo:
    def __del__(self):        # se llama cuando el objeto se libera
        print("chau")

f = Foo()
g = f
del f
print("borré f")              # todavía no se liberó: queda g
del g                         # última referencia: ahora sí
print("fin")
```

::: observacion
Lo de liberar "en el momento" es de **CPython**. Otras implementaciones (PyPy, Jython) usan otros recolectores y pueden liberar más tarde. Por eso no conviene depender de `__del__` para cerrar archivos o conexiones: para eso está `with` (unidad 10). En CPython, después de que un objeto se libera, su `id` puede reutilizarlo otro objeto.
:::

## 7. Hashable

Un objeto es **hashable** si tiene un `hash()` que no cambia mientras existe y se puede comparar con `==`. Solo los hashables pueden ser **claves de un diccionario** o **elementos de un set**.

- Hashables: los inmutables (`int`, `float`, `str`, `bytes`, `tuple`, `frozenset`, `None`), y los objetos de clases propias (por defecto se comparan por identidad).
- **No** hashables: `list`, `dict`, `set`.
- Una **tupla** es hashable solo si **todo lo que contiene** es hashable: `(1, [2])` no lo es.

```python
for obj in ([1], {1: 2}, {1}, (1, [2])):
    try:
        hash(obj)
    except TypeError as e:
        print(type(obj).__name__, "->", e)
```

**Por qué una lista no puede ser clave:** si cambiara después de guardarla, cambiaría su hash y el diccionario no la encontraría más.

::: ojo
**Valores iguales dan el mismo hash, aunque sean de tipos distintos:** `1 == 1.0 == True` y los tres tienen el mismo hash. Para un diccionario son **la misma clave**: se queda la primera clave que se escribió, con el último valor.

```python
d = {1: "a", True: "b", 1.0: "c"}
print(d)
```
:::

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
foo = [1, 2, 3]
bar = foo
bar.append(4)
print(foo, foo is bar)
```
- [ ] `[1, 2, 3] False`
- [ ] `[1, 2, 3] True`
- [x] `[1, 2, 3, 4] True`
- [ ] `[1, 2, 3, 4] False`
::: solucion Explicación
`bar = foo` no copia la lista: `bar` es otro nombre para **el mismo objeto**. El `append` modifica ese objeto, y por eso el cambio se ve desde `foo`. Y como son el mismo objeto, `foo is bar` es `True`.
:::
:::

::: pregunta What is the output of the following code?
```python
a = [1, 2]
b = a
a += [3]
a = a + [4]
print(a, b)
```
- [x] `[1, 2, 3, 4] [1, 2, 3]`
- [ ] `[1, 2, 3, 4] [1, 2, 3, 4]`
- [ ] `[1, 2, 3, 4] [1, 2]`
- [ ] `[1, 2, 3] [1, 2, 3]`
::: solucion Explicación
`a += [3]` modifica **en el lugar** la lista que comparten `a` y `b`: las dos valen `[1, 2, 3]`. `a = a + [4]` arma una lista **nueva** y le pasa el nombre `a`; `b` se queda con la anterior.
:::
:::

::: pregunta In CPython, what is the output of the following code?
```python
a = int("256"); b = int("256")
c = int("257"); d = int("257")
print(a is b, c is d)
```
- [ ] `True True`
- [x] `True False`
- [ ] `False False`
- [ ] `False True`
::: solucion Explicación
CPython tiene creados de antemano los enteros de **−5 a 256** y siempre usa esos mismos objetos: los dos `256` son uno solo. El `257` está fuera de la caché, y cada `int("257")` crea un objeto nuevo. Es un **detalle de implementación**: para comparar números se usa `==`, nunca `is`.
:::
:::

::: pregunta What is the output of the following code?
```python
import copy

a = [[1, 2], [3]]
b = copy.copy(a)
b[0].append(9)
b.append([4])
print(a)
```
- [ ] `[[1, 2], [3]]`
- [x] `[[1, 2, 9], [3]]`
- [ ] `[[1, 2, 9], [3], [4]]`
- [ ] `[[1, 2], [3], [4]]`
::: solucion Explicación
`copy.copy` hace una copia **superficial**: `b` es una lista nueva, pero sus elementos son **las mismas sublistas** de `a`. Modificar `b[0]` modifica esa sublista compartida (se ve en `a`); agregar un elemento a `b` solo cambia la lista nueva (no se ve en `a`). Con `copy.deepcopy`, `a` habría quedado igual.
:::
:::

::: pregunta What is the output of the following code?
```python
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)
```
- [ ] `[[1, 0, 0], [0, 0, 0], [0, 0, 0]]`
- [x] `[[1, 0, 0], [1, 0, 0], [1, 0, 0]]`
- [ ] `[[1, 1, 1], [0, 0, 0], [0, 0, 0]]`
- [ ] It raises `TypeError`
::: solucion Explicación
`[[0] * 3] * 3` repite **tres referencias a la misma sublista**: las tres "filas" son un único objeto. Cambiar `grid[0][0]` cambia esa lista, que se ve en las tres posiciones. Para tres filas independientes: `[[0] * 3 for _ in range(3)]`.
:::
:::

::: pregunta What is the output of the following code?
```python
t = (1, [2, 3])
t[1].append(4)
print(t)
```
- [ ] It raises `TypeError` because tuples are immutable
- [x] `(1, [2, 3, 4])`
- [ ] `(1, [2, 3])`
- [ ] It raises `AttributeError`
::: solucion Explicación
La tupla es inmutable: siempre contiene **los mismos objetos** (el `1` y esa lista). Pero la lista de adentro es mutable y se puede modificar con sus métodos. Lo que no se puede es cambiar **qué objeto** hay en una posición (`t[1] = ...`).
:::
:::

::: pregunta Which of the following objects are hashable? (Select all that apply)
- [x] `(1, 2)`
- [x] `"abc"`
- [x] `frozenset({1, 2})`
- [ ] `[1, 2]`
- [ ] `{1: 2}`
- [ ] `(1, [2])`
::: solucion Explicación
Son hashables los inmutables: la tupla de enteros, el string y el `frozenset`. La lista y el diccionario son mutables, así que no. La tupla `(1, [2])` es inmutable, pero contiene una lista: su hash depende del de sus elementos, y la lista no tiene. Solo los hashables pueden ser claves de un dict o elementos de un set.
:::
:::

::: pregunta What is the output of the following code?
```python
d = {1: "a", True: "b", 1.0: "c"}
print(d)
```
- [ ] `{1: 'a', True: 'b', 1.0: 'c'}`
- [x] `{1: 'c'}`
- [ ] `{True: 'c'}`
- [ ] `{1.0: 'c'}`
::: solucion Explicación
`1 == True == 1.0` y los tres tienen el mismo hash, así que para el diccionario son **la misma clave**. Cada asignación reemplaza el valor, pero la clave que queda guardada es la **primera** que se escribió (`1`). El valor que queda es el último (`'c'`). Recordá que `bool` es una subclase de `int`.
:::
:::

::: pregunta What is the output of the following code?
```python
x = float("nan")
print(x == x, [x] == [x])
```
- [ ] `True True`
- [ ] `False False`
- [x] `False True`
- [ ] `True False`
::: solucion Explicación
Por definición (norma IEEE 754), `nan` no es igual a nada, ni a sí mismo: `x == x` da `False`. Pero al comparar contenedores, Python primero chequea la **identidad** de cada par de elementos (es más rápido), y como es el mismo objeto, lo da por igual sin llamar a `==`.
:::
:::

::: pregunta What is the output of the following code?
```python
s = "hola"
t = s
s += "!"
print(t, s is t)
```
- [ ] `hola! True`
- [ ] `hola! False`
- [x] `hola False`
- [ ] `hola True`
::: solucion Explicación
Los strings son **inmutables**: `s += "!"` no puede cambiar el string, así que arma uno nuevo (`"hola!"`) y le pasa el nombre `s`. `t` sigue apuntando al original. Con una lista, en cambio, `+=` la habría modificado y `t` vería el cambio.
:::
:::

::: pregunta Which statement about `del x` is TRUE?
- [ ] It immediately frees the memory of the object `x` refers to, in every case
- [x] It removes the name `x`; the object is freed only when no references to it remain
- [ ] It raises an error if other variables refer to the same object
- [ ] It sets `x` to `None`
::: solucion Explicación
`del` borra **el nombre** (la referencia). El objeto se libera cuando su conteo de referencias llega a cero: si hay otros nombres o contenedores que apuntan a él, sigue vivo. Después de `del x`, usar `x` da `NameError` (no vale `None`).
:::
:::

::: pregunta How does CPython primarily manage memory?
- [ ] The programmer must free objects manually, like in C
- [ ] Only with a garbage collector that runs periodically, like in Java
- [x] With reference counting, plus a cyclic garbage collector for reference cycles
- [ ] Objects are never freed until the program ends
::: solucion Explicación
CPython lleva la cuenta de las referencias de cada objeto y lo libera en cuanto llega a cero. Como eso no alcanza para los **ciclos** (objetos que se apuntan entre sí), el módulo `gc` corre cada tanto un recolector que los detecta y los libera. El programador no libera memoria a mano.
:::
:::
