# 8 · Iteradores, generadores y decoradores

*Peso **A**: tu amigo recordó preguntas teóricas sobre las diferencias entre decoradores, iteradores y generadores. Las generator expressions están presentadas en [[7 · Control de flujo, iteración y comprensiones]], y los closures (la base de los decoradores), en [[6 · Alcance, regla LEGB y closures]]. Resultados comprobados con Python 3.14.*

::: claves
- **Iterable**: se puede recorrer; tiene `__iter__`, que devuelve un iterador (listas, strings, dicts, sets, `range`…). **Iterador**: tiene `__next__`, que da el siguiente valor o lanza **`StopIteration`**, y un `__iter__` que se devuelve **a sí mismo**.
- Una lista es iterable pero **no** es un iterador: `next([1, 2])` da `TypeError`. `iter(lista)` arma un iterador nuevo cada vez.
- **Un iterador se agota**: se recorre una sola vez. Lo mismo `map`, `zip`, `filter`, los generadores y los archivos.
- **Generador**: una función con `yield`. Llamarla **no ejecuta el cuerpo**: devuelve un objeto generador. El cuerpo avanza hasta cada `yield` con cada `next()`, y se queda **suspendido** ahí, con sus variables.
- `return valor` dentro de un generador lo **termina** (el valor viaja en `StopIteration.value`, y `list()` lo ignora). `yield from it` entrega uno por uno los valores de otro iterable.
- **Decorador**: una función que recibe una función y devuelve otra. `@deco` sobre `def f` es lo mismo que `f = deco(f)`, y se ejecuta **al definir** `f`, no al llamarla.
- **Varios decoradores:** se **aplican de abajo hacia arriba**; al llamar, se **ejecuta primero el de arriba** (el de más afuera).
- Sin **`functools.wraps`**, la función decorada pierde su `__name__` y su `__doc__` (pasan a ser los del `wrapper`).
- **Decorador con argumentos** (`@repetir(3)`): son **tres** niveles de funciones; `repetir(3)` devuelve el decorador.
:::

## 1. Iterables e iteradores

**El protocolo de iteración** tiene dos partes:

| | Tiene | Ejemplos |
|---|---|---|
| **Iterable** | `__iter__()`, que devuelve un **iterador** (o `__getitem__` con índices desde 0) | `list`, `tuple`, `str`, `dict`, `set`, `range`, archivos |
| **Iterador** | `__next__()`, que devuelve el siguiente valor o lanza `StopIteration`, y `__iter__()`, que devuelve **el mismo** iterador | lo que devuelven `iter(lista)`, `map`, `zip`, `enumerate`, los generadores |

Todo iterador es iterable, pero no todo iterable es un iterador.

```python
lista = [1, 2, 3]
it = iter(lista)                # pide un iterador a la lista
print(type(it).__name__, next(it), next(it), next(it))
print(next(it, "fin"))          # con valor por defecto, no lanza StopIteration
next(it)                        # StopIteration
```

```python
next([1, 2])                    # TypeError: 'list' object is not an iterator
```

**Lo que hace un `for` por dentro:**

```python
it = iter("ab")                 # 1) pide un iterador
while True:
    try:
        x = next(it)            # 2) pide el siguiente
    except StopIteration:       # 3) cuando se acaba, termina
        break
    print(x)
```

::: ojo
**Un iterador se agota.** Después de recorrerlo, ya no da más valores, y no avisa: un segundo `list()` devuelve `[]`. Incluso preguntar con `in` **consume** el iterador hasta encontrar el valor:

```python
it = iter([1, 2, 3])
print(next(it), list(it), next(it, "fin"))

it = iter([1, 2, 3, 4])
print(3 in it, list(it))       # in avanzó hasta el 3: solo queda el 4

z = zip("ab", [1, 2])
print(list(z), list(z))
```

Una lista, en cambio, se puede recorrer todas las veces que quieras, porque cada `for` le pide un iterador **nuevo**.
:::

**Un iterador propio**, con `__iter__` y `__next__`:

```python
class Cuenta:
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __iter__(self):
        return self              # el iterador es él mismo
    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        self.i += 1
        return self.i

c = Cuenta(3)
print(list(c), list(c))          # se agotó en el primer list()
```

## 2. Generadores

Escribir un iterador como clase es largo. Un **generador** hace lo mismo con una función que usa **`yield`**:

```python
def gen():
    print("start")
    yield 1
    print("middle")
    yield 2

g = gen()                        # no ejecuta nada todavía
print("created", type(g).__name__)
print(next(g))                   # corre hasta el primer yield
print(next(g))                   # sigue desde donde quedó, hasta el segundo
print(next(g, "agotado"))        # termina el cuerpo: se agotó
```

- Llamar a una función generadora devuelve un **objeto generador** (que es un iterador), sin ejecutar el cuerpo.
- Cada `next()` ejecuta hasta el próximo `yield`, devuelve ese valor y deja la función **suspendida**, conservando sus variables locales.
- Cuando el cuerpo termina, el generador lanza `StopIteration`.

```python
def contador():
    total = 0
    for x in [10, 20, 30]:
        total += x
        yield total              # total se conserva entre un next y otro

print(list(contador()))
```

**`return` en un generador** lo termina. El valor que devuelve no sale por el `for` ni por `list()`: viaja dentro de la excepción `StopIteration`.

```python
def g():
    yield 1
    return 5

print(list(g()))
it = g()
next(it)
try:
    next(it)
except StopIteration as e:
    print("StopIteration", e.value)
```

**`yield from`** entrega, uno por uno, todos los valores de otro iterable (o generador):

```python
def a():
    yield 1
    yield from [2, 3]
    yield from range(4, 6)
    yield 6

print(list(a()))
```

**Generadores infinitos.** Como son perezosos, pueden no terminar nunca: el que los usa pide solo los valores que necesita.

```python
def naturales():
    n = 0
    while True:
        yield n
        n += 1

g = naturales()
print([next(g) for _ in range(5)])
```

**Por qué conviene un generador:** no guarda todos los valores en memoria, solo su estado. Una lista de 10 000 números ocupa decenas de KB; el generador equivalente, apenas unos cientos de bytes (los números exactos dependen de la versión y de la plataforma), y no crece con la cantidad de elementos.

```python
import sys

print(sys.getsizeof([x for x in range(10000)]))
print(sys.getsizeof((x for x in range(10000))))
```

::: ojo
**En una generator expression, el primer `for` se evalúa en el momento.** Si después **reasignás** la variable, el generador sigue con el objeto original. Pero si **modificás** ese objeto antes de recorrerlo, el cambio se ve, porque el resto se calcula recién al pedir los valores:

```python
lista = [1, 2]
g = (x for x in lista)
lista = [7, 8]                  # reasignar: g ya tiene la lista original
print(list(g))

lista = [1, 2, 3]
g = (x * 10 for x in lista)
lista.append(4)                 # modificar: g lo ve
print(list(g))
```
:::

**`send()` (básico).** Además de dar valores, un generador puede **recibirlos**: `valor = yield algo`. `g.send(x)` reanuda el generador y hace que ese `yield` valga `x`. Antes del primer `send` hay que arrancarlo con `next(g)`.

```python
def eco():
    recibido = None
    while True:
        recibido = yield recibido

g = eco()
print(next(g), g.send("hola"), g.send(42))
```

Mandar un valor a un generador recién creado da `TypeError: can't send non-None value to a just-started generator`.

## 3. Iterador, generador, decorador: las diferencias

| | Qué es | Cómo se escribe |
|---|---|---|
| **Iterador** | un objeto que da valores de a uno con `next()` y se agota | una clase con `__iter__` y `__next__`, o lo que devuelven `iter()`, `map`, `zip`… |
| **Generador** | una forma cómoda de **crear iteradores** | una función con `yield`, o una generator expression |
| **Decorador** | una función que **envuelve** a otra para agregarle comportamiento sin modificar su código | una función que recibe una función y devuelve otra; se aplica con `@` |

Todo generador es un iterador. Un decorador no tiene nada que ver con la iteración: es una herramienta de funciones de orden superior.

## 4. `itertools`

| Función | Qué devuelve |
|---|---|
| `count(inicio, paso)` | `inicio, inicio + paso, …` sin fin |
| `cycle(it)` | los elementos de `it`, repetidos sin fin |
| `islice(it, n)` | los primeros `n` (como un slice, pero para iteradores) |
| `chain(a, b)` | los de `a` y después los de `b` |
| `product(a, b)` | todas las combinaciones de pares (producto cartesiano) |
| `permutations(it, r)` | las variaciones de `r` elementos (importa el orden) |
| `combinations(it, r)` | las combinaciones de `r` elementos (no importa el orden) |
| `accumulate(it)` | las sumas parciales |
| `zip_longest(a, b, fillvalue=…)` | como `zip`, pero sigue hasta el más largo |
| `groupby(it)` | grupos de elementos **consecutivos** iguales |

```python
import itertools as it

print(list(it.islice(it.count(10, 5), 3)))
print(list(it.chain([1, 2], "ab")))
print(list(it.product("ab", [0, 1])))
print(list(it.permutations("abc", 2)))
print(list(it.combinations("abc", 2)))
print(list(it.accumulate([1, 2, 3, 4])))
```

::: ojo
**`groupby` agrupa solo los elementos consecutivos.** Para agrupar todos los iguales, primero hay que ordenar:

```python
from itertools import groupby

print([(k, len(list(g))) for k, g in groupby("aabaa")])
print([(k, len(list(g))) for k, g in groupby(sorted("aabaa"))])
```
:::

## 5. Decoradores

Un decorador es una función que **recibe una función** y **devuelve otra** (casi siempre, una que envuelve a la original). La sintaxis `@` es solo un atajo:

```python
def gritar(f):
    def wrapper(*args, **kwargs):          # acepta cualquier argumento
        return f(*args, **kwargs).upper()  # llama a la original y cambia el resultado
    return wrapper

def saludo(n):
    return "hola " + n

saludo = gritar(saludo)       # esto…
print(saludo("ana"))

@gritar                       # …es lo mismo que esto
def chau(n):
    return "chau " + n

print(chau("ana"))
```

El `wrapper` es un **closure**: recuerda la `f` original. Lleva `*args, **kwargs` para servir con funciones de cualquier firma.

::: ojo
**El decorador se ejecuta al definir la función, no al llamarla.** El código del decorador (lo que está fuera del `wrapper`) corre una sola vez, cuando Python ejecuta el `def`:

```python
def deco(f):
    print("decorating", f.__name__)
    return f

@deco
def foo():
    print("foo")

print("before")
foo()
```

Y si el decorador **no devuelve nada**, la función queda reemplazada por `None`: llamarla da `TypeError: 'NoneType' object is not callable`.
:::

### Varios decoradores

Se **aplican de abajo hacia arriba** (el más cercano al `def`, primero): `@a @b def foo` es `foo = a(b(foo))`. Al **llamar**, se entra primero al de **arriba**, que es el de más afuera.

```python
def a(f):
    def w():
        return "a(" + f() + ")"
    return w

def b(f):
    def w():
        return "b(" + f() + ")"
    return w

@a
@b
def foo():
    return "x"

print(foo())
```

```python
def a(f):
    print("aplico a")
    def w():
        print("entra a")
        return f()
    return w

def b(f):
    print("aplico b")
    def w():
        print("entra b")
        return f()
    return w

@a
@b
def foo():
    print("foo")

foo()            # se aplicó b, después a; al llamar entra a, después b
```

### `functools.wraps`

La función decorada **es el `wrapper`**, así que pierde el nombre y la docstring de la original. `@functools.wraps(f)` los copia:

```python
import functools

def sin_wraps(f):
    def wrapper(*args, **kwargs):
        return f(*args, **kwargs)
    return wrapper

def con_wraps(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        return f(*args, **kwargs)
    return wrapper

@sin_wraps
def foo():
    """Doc de foo."""

@con_wraps
def bar():
    """Doc de bar."""

print(foo.__name__, foo.__doc__)
print(bar.__name__, bar.__doc__)
```

### Decoradores con argumentos

`@repetir(3)` primero **llama** a `repetir(3)`, y lo que devuelve es el decorador que se aplica. Por eso hay **tres niveles**: la función que recibe los argumentos, el decorador y el `wrapper`.

```python
def repetir(n):                  # 1) recibe el argumento
    def deco(f):                 # 2) el decorador de verdad
        def wrapper(*args, **kwargs):   # 3) lo que reemplaza a la función
            for _ in range(n):
                f(*args, **kwargs)
        return wrapper
    return deco

@repetir(3)
def hola():
    print("hola")

hola()
```

Escribir `@repetir` sin paréntesis no funciona: `repetir` recibiría la función como `n`, y la función quedaría reemplazada por `deco`.

### Un decorador con estado y decoradores de la biblioteca estándar

```python
import functools

def contar(f):
    @functools.wraps(f)
    def wrapper(*a, **k):
        wrapper.llamadas += 1     # las funciones son objetos: se les pueden poner atributos
        return f(*a, **k)
    wrapper.llamadas = 0
    return wrapper

@contar
def suma(a, b):
    return a + b

suma(1, 2); suma(3, 4)
print(suma.llamadas)
```

| Decorador | Para qué |
|---|---|
| `@property`, `@staticmethod`, `@classmethod` | métodos especiales de una clase (unidad 9) |
| `@functools.lru_cache` / `@functools.cache` | guardar los resultados ya calculados (memoización) |
| `@functools.wraps(f)` | copiar el nombre y la docstring en un decorador |
| `@dataclass` | generar `__init__`, `__repr__` y `__eq__` en una clase |
| `@abstractmethod` | marcar un método abstracto |

```python
import functools

@functools.lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(80))          # sin la caché, tardaría años
```

Un decorador también puede aplicarse a una **clase**: recibe la clase y devuelve una clase (así funciona `@dataclass`).

## Preguntas tipo examen

::: pregunta What happens when this code runs?
```python
print(next([1, 2, 3]))
```
- [ ] It prints `1`
- [ ] It prints `[1, 2, 3]`
- [x] It raises `TypeError`
- [ ] It raises `StopIteration`
::: solucion Explicación
Una lista es **iterable**, pero no es un **iterador**: no tiene `__next__`. `next()` solo funciona con iteradores: *TypeError: 'list' object is not an iterator*. Hacía falta `next(iter([1, 2, 3]))`.
:::
:::

::: pregunta What is the output of the following code?
```python
def gen():
    print("start")
    yield 1
    yield 2

g = gen()
print("created")
print(next(g))
```
- [ ] `start`, `created`, `1`
- [x] `created`, `start`, `1`
- [ ] `created`, `1`
- [ ] `start`, `1`, `created`
::: solucion Explicación
Llamar a una función con `yield` **no ejecuta su cuerpo**: solo crea el objeto generador. Por eso primero se imprime `created`. El cuerpo arranca con el primer `next()`: imprime `start` y se detiene en el `yield 1`, que es lo que devuelve `next`.
:::
:::

::: pregunta What is the output of the following code?
```python
g = (x * x for x in range(3))
print(sum(g), sum(g))
```
- [ ] `5 5`
- [x] `5 0`
- [ ] `14 14`
- [ ] It raises `StopIteration`
::: solucion Explicación
Es una generator expression: produce `0, 1, 4` una sola vez. El primer `sum` la recorre entera (5) y la **agota**; el segundo no encuentra elementos y devuelve 0, la suma vacía. `sum` maneja el `StopIteration` internamente.
:::
:::

::: pregunta What is the output of the following code?
```python
def g():
    yield 1
    return 5
    yield 2

print(list(g()))
```
- [x] `[1]`
- [ ] `[1, 5]`
- [ ] `[1, 5, 2]`
- [ ] `[1, 2]`
::: solucion Explicación
El `return` **termina** el generador: el `yield 2` nunca se alcanza. El valor del `return` (5) no se entrega como un elemento más: viaja dentro de la excepción `StopIteration` (`e.value`), y `list()` lo ignora.
:::
:::

::: pregunta What is the output of the following code?
```python
def foo():
    yield 1
    yield from [2, 3]
    yield 4

print(list(foo()))
```
- [ ] `[1, [2, 3], 4]`
- [x] `[1, 2, 3, 4]`
- [ ] `[1, 4]`
- [ ] It raises `SyntaxError`
::: solucion Explicación
`yield from iterable` entrega, **uno por uno**, todos los elementos del iterable, como si hubiera un `yield` por cada uno. Con `yield [2, 3]` (sin `from`) se habría entregado la lista entera como un solo elemento.
:::
:::

::: pregunta What is the output of the following code?
```python
def deco(f):
    print("decorating")
    return f

@deco
def foo():
    print("foo")

print("before")
foo()
```
- [ ] `before`, `decorating`, `foo`
- [x] `decorating`, `before`, `foo`
- [ ] `before`, `foo`
- [ ] `decorating`, `foo`, `before`
::: solucion Explicación
`@deco` equivale a `foo = deco(foo)`, y se ejecuta **en el momento de definir** `foo`. Por eso `decorating` sale antes que todo. Como `deco` devuelve la misma `foo`, llamarla después solo imprime `foo`.
:::
:::

::: pregunta What is the output of the following code?
```python
def a(f):
    def w():
        return "a(" + f() + ")"
    return w

def b(f):
    def w():
        return "b(" + f() + ")"
    return w

@a
@b
def foo():
    return "x"

print(foo())
```
- [x] `a(b(x))`
- [ ] `b(a(x))`
- [ ] `a(x)`
- [ ] `x`
::: solucion Explicación
Los decoradores se aplican de **abajo hacia arriba**: `foo = a(b(foo))`. El de arriba (`a`) queda **por fuera**, así que al llamar se entra primero en `a`, que llama a lo de `b`, que llama a la `foo` original.
:::
:::

::: pregunta What is the output of the following code?
```python
def deco(f):
    def wrapper(*args, **kwargs):
        return f(*args, **kwargs)
    return wrapper

@deco
def foo():
    """Docstring of foo."""

print(foo.__name__)
```
- [ ] `foo`
- [x] `wrapper`
- [ ] `deco`
- [ ] `None`
::: solucion Explicación
Después de decorar, el nombre `foo` apunta al `wrapper` que devolvió `deco`, y ese es su `__name__` (y `foo.__doc__` es `None`). Para conservar el nombre y la docstring de la original, el `wrapper` tiene que llevar `@functools.wraps(f)`.
:::
:::

::: pregunta What is the output of the following code?
```python
it = iter([1, 2, 3])
print(next(it), list(it), next(it, "end"))
```
- [ ] `1 [1, 2, 3] end`
- [x] `1 [2, 3] end`
- [ ] `1 [2, 3] 3`
- [ ] It raises `StopIteration`
::: solucion Explicación
El primer `next` consume el 1. `list(it)` sigue desde donde quedó el iterador (2 y 3) y lo **agota**. El último `next` no tiene más elementos, pero como recibe un valor por defecto, devuelve `"end"` en lugar de lanzar `StopIteration`.
:::
:::

::: pregunta What is the output of the following code?
```python
from itertools import groupby

print([(k, len(list(g))) for k, g in groupby("aabaa")])
```
- [ ] `[('a', 4), ('b', 1)]`
- [x] `[('a', 2), ('b', 1), ('a', 2)]`
- [ ] `[('a', 2), ('b', 1)]`
- [ ] `[('a', 1), ('a', 1), ('b', 1), ('a', 1), ('a', 1)]`
::: solucion Explicación
`groupby` junta solo los elementos **consecutivos** iguales: `aa`, `b` y `aa` son tres grupos. Para agrupar todos los iguales hay que ordenar antes: `groupby(sorted("aabaa"))` da `[('a', 4), ('b', 1)]`.
:::
:::

::: pregunta Which statement about generators is TRUE?
- [ ] Calling a generator function runs its body until the end and stores all yielded values
- [x] Calling a generator function returns a generator object without running its body
- [ ] A generator can be iterated as many times as you want
- [ ] A generator function cannot contain a `return` statement
::: solucion Explicación
Al llamar a una función generadora se obtiene un objeto generador, y el cuerpo recién avanza con cada `next()` (evaluación perezosa). Como todo iterador, se **agota** después de recorrerlo una vez. Puede tener `return`: termina el generador, y su valor va en `StopIteration.value`.
:::
:::

::: pregunta What is the difference between an iterable and an iterator?
- [ ] They are the same thing in Python
- [ ] An iterator can be traversed many times; an iterable only once
- [x] An iterable returns an iterator through `__iter__`; an iterator produces values with `__next__` and is exhausted after one traversal
- [ ] Only built-in types can be iterators
::: solucion Explicación
Un **iterable** (lista, string, dict…) sabe dar un iterador nuevo cada vez que se le pide (`__iter__`), así que se puede recorrer muchas veces. Un **iterador** da los valores de a uno (`__next__`), recuerda por dónde va y se agota. Todo iterador es también iterable (su `__iter__` se devuelve a sí mismo). Cualquier clase puede ser un iterador si implementa el protocolo.
:::
:::
