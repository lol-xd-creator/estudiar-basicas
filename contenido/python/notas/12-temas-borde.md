# 12 · Temas de borde: complejidad, ordenamiento, concurrencia, testing y tipos

*Peso **C**: temas que pueden aparecer en un examen de Python Core, pero que nadie recordó. Alcanza con las ideas principales y los datos de las claves. Resultados comprobados con Python 3.14. Los ejemplos de hilos y de `asyncio` no se pueden ejecutar en esta app (el navegador no tiene hilos): van sin botón, con su salida real abajo.*

::: claves
- **Complejidad promedio:** `x in lista` es **O(n)**; `x in set` y `x in dict` son **O(1)**. En una lista, `append`, `pop()` y `lista[i]` son O(1), pero `insert(0, x)` y `pop(0)` son **O(n)** (para eso está `deque`).
- **Ordenar:** `sorted()` (lista nueva) o `lista.sort()` (en el lugar, devuelve `None`), las dos O(n log n). El algoritmo es **Timsort**, creado por **Tim Peters**, y es **estable**: los empates conservan su orden original.
- Ordenar tipos que no se pueden comparar (`[3, "a", 1]`) da `TypeError`.
- **GIL** (*Global Interpreter Lock*): en CPython, **un solo hilo ejecuta bytecode por vez**. Los hilos (`threading`) sirven para tareas que **esperan** (red, disco: *I/O-bound*), pero no aceleran el cálculo puro.
- Para usar **varios núcleos** en un cálculo pesado (*CPU-bound*): **`multiprocessing`** (procesos separados, cada uno con su intérprete y su GIL).
- **`asyncio`**: concurrencia en **un solo hilo**, cooperativa, con `async def` y `await`; ideal para muchas tareas de I/O a la vez.
- **`unittest`**: clases que heredan de `unittest.TestCase`, con métodos que **empiezan con `test`** y `self.assertEqual`, `assertRaises`… **pytest**: funciones `test_…` con `assert` común.
- **Type hints:** `list[int]` (3.9), `int | None` (3.10), `Optional[int]` = `Union[int, None]`. Python **no los verifica**: lo hace una herramienta aparte, como **mypy**.
:::

## 1. Complejidad de las operaciones (Big-O)

La notación **O** dice cómo crece el tiempo de una operación con la cantidad de elementos **n**: O(1) no depende de n; O(n) crece en proporción a n; O(n log n) es lo que tarda un buen ordenamiento.

| Operación | `list` | `dict` / `set` | `deque` |
|---|---|---|---|
| acceso por índice `x[i]` | O(1) | — (`d[k]`: O(1)) | O(n) en el medio |
| `x in ...` | **O(n)** | **O(1)** | O(n) |
| agregar al final (`append`, `add`, `d[k] = v`) | O(1)* | O(1) | O(1) |
| sacar el último (`pop()`) | O(1) | — | O(1) |
| agregar o sacar **al principio** (`insert(0, x)`, `pop(0)`) | **O(n)** | — | **O(1)** (`appendleft`, `popleft`) |
| borrar un valor (`remove`, `del d[k]`) | O(n) | O(1) | O(n) |
| `len()` | O(1) | O(1) | O(1) |
| ordenar | O(n log n) | — | — |

*\*O(1) "amortizado": de vez en cuando la lista crece y copia todo, pero en promedio es constante. Los O(1) de dict y set son **en promedio** (en el peor caso, con muchas colisiones de hash, son O(n)).*

```python
import timeit

datos = list(range(100_000))
conjunto = set(datos)
t_lista = timeit.timeit(lambda: 99_999 in datos, number=300)
t_set = timeit.timeit(lambda: 99_999 in conjunto, number=300)
print(f"lista: {t_lista:.4f} s   set: {t_set:.4f} s")   # el set puede marcar 0: es más rápido que el reloj
print("la lista tardó más:", t_lista > t_set)
```

::: observacion
- Una lista está guardada como un **arreglo** contiguo: insertar al principio obliga a correr todos los elementos un lugar.
- Un dict o un set usa una **tabla de hash**: calcula dónde está el elemento en lugar de recorrer.
- Armar un string con `s += parte` dentro de un bucle puede ser lento (cada vez crea un string nuevo); la forma idiomática es `"".join(partes)`.
:::

Otros módulos útiles: `bisect` (búsqueda binaria en una lista ordenada, O(log n)) y `heapq` (cola de prioridad: sacar el mínimo en O(log n)).

## 2. Ordenamiento

| | `sorted(iterable)` | `lista.sort()` |
|---|---|---|
| Recibe | **cualquier** iterable (lista, tupla, string, dict, generador…) | solo listas |
| Devuelve | una **lista nueva** | **`None`** (ordena en el lugar) |
| Parámetros | `key=…`, `reverse=…` | `key=…`, `reverse=…` |

- **Timsort** (lo creó **Tim Peters** en 2002, el mismo del Zen): mezcla de *merge sort* e *insertion sort*, O(n log n), muy rápido con datos parcialmente ordenados, y **estable**.
- **`key`** recibe una función que da, para cada elemento, el valor por el que se ordena.
- **Estable** significa que dos elementos con la misma clave quedan en el orden en que venían. Por eso se puede ordenar por varios criterios en pasos: primero por el secundario y después por el principal.

```python
data = [("b", 2), ("a", 2), ("c", 1)]
print(sorted(data, key=lambda t: t[1]))   # ("b", 2) sigue antes que ("a", 2)
print(sorted(data))                       # sin key, las tuplas se comparan elemento por elemento

personas = [("ana", 30), ("beto", 25), ("carla", 30), ("dani", 25)]
print(sorted(personas, key=lambda p: (-p[1], p[0])))   # edad descendente y, a igual edad, nombre

print(sorted(["banana", "apple", "Cherry"]))                 # las mayúsculas van antes
print(sorted(["banana", "apple", "Cherry"], key=str.lower))  # sin distinguir mayúsculas

d = {"b": 1, "a": 3, "c": 2}
print(sorted(d), sorted(d, key=d.get))    # un dict se ordena por sus claves
print(sorted([3, "a", 1]))                # TypeError: no se puede comparar str con int
```

## 3. Concurrencia: hilos, procesos y `asyncio`

| | `threading` | `multiprocessing` | `asyncio` |
|---|---|---|---|
| Qué usa | varios **hilos** en un proceso | varios **procesos** | **un hilo**, con un bucle de eventos |
| Memoria | compartida (cuidado con las condiciones de carrera: `Lock`) | separada (los datos se copian) | compartida |
| ¿Usa varios núcleos para calcular? | **no**, por el GIL | **sí** | no |
| Conviene para | tareas que **esperan** (I/O): red, disco | tareas que **calculan** (CPU) | **muchas** tareas de I/O a la vez |
| Cómo se cambia de tarea | el sistema operativo decide | cada proceso es independiente | cada tarea cede el control con `await` (cooperativa) |

**El GIL** (*Global Interpreter Lock*) es un candado de CPython: solo un hilo a la vez puede ejecutar bytecode de Python. Simplifica el manejo de memoria (el conteo de referencias), pero impide que los hilos calculen en paralelo. Mientras un hilo **espera** (una respuesta de red, la lectura de un archivo), suelta el GIL y otro puede avanzar: por eso los hilos sí sirven para I/O. Python 3.13 sumó una versión experimental **sin GIL** (PEP 703), que en 3.14 pasó a estar soportada oficialmente como opción aparte.

```python estatico
import threading

contador = 0
lock = threading.Lock()

def sumar():
    global contador
    for _ in range(10_000):
        with lock:              # sin el lock, dos hilos podrían pisarse al sumar
            contador += 1

hilos = [threading.Thread(target=sumar) for _ in range(4)]
for h in hilos:
    h.start()
for h in hilos:
    h.join()                    # esperar a que terminen
print(contador)
```

```salida
40000
```

**`asyncio`**: una función `async def` es una **corrutina**; llamarla no la ejecuta (devuelve un objeto corrutina, como pasa con los generadores). Se ejecuta con `await` dentro de otra corrutina, o con `asyncio.run(...)` desde el código común. `asyncio.gather` corre varias **concurrentemente**: mientras una espera, avanza otra.

```python estatico
import asyncio

async def tarea(nombre, espera):
    await asyncio.sleep(espera)     # mientras espera, el bucle atiende otras tareas
    return nombre

async def main():
    return await asyncio.gather(tarea("lenta", 0.2), tarea("rápida", 0.1))

print(asyncio.run(main()))          # tarda ~0,2 s en total, no 0,3
```

```salida
['lenta', 'rápida']
```

`gather` devuelve los resultados **en el orden en que se le pasaron las tareas**, no en el que terminaron.

Para no manejar hilos y procesos a mano está `concurrent.futures`, con `ThreadPoolExecutor` y `ProcessPoolExecutor`.

## 4. Testing

**`unittest`** (biblioteca estándar, estilo xUnit):

```python
import unittest

def sumar(a, b):
    return a + b

class TestSumar(unittest.TestCase):          # hereda de TestCase
    def test_positivos(self):                # los métodos de test empiezan con "test"
        self.assertEqual(sumar(2, 3), 5)

    def test_error(self):
        with self.assertRaises(TypeError):   # verificar que lanza una excepción
            sumar(1, "a")

    def ayuda(self):                         # no empieza con "test": no se ejecuta
        self.fail("no es un test")

suite = unittest.TestLoader().loadTestsFromTestCase(TestSumar)
resultado = unittest.TextTestRunner(verbosity=2).run(suite)
print(resultado.testsRun, "tests,", len(resultado.failures), "fallas")
```

- Métodos de verificación: `assertEqual`, `assertNotEqual`, `assertTrue`, `assertFalse`, `assertIn`, `assertIsNone`, `assertRaises`…
- `setUp()` corre **antes de cada** test, y `tearDown()`, **después de cada** uno.
- Desde la terminal: `python -m unittest` (busca archivos `test*.py`).

**pytest** (paquete aparte, muy usado):

- Los tests son **funciones** comunes que empiezan con `test_`, en archivos `test_*.py` o `*_test.py`.
- Se usa el **`assert` común** de Python (`assert sumar(2, 3) == 5`), y pytest muestra el detalle cuando falla.
- *Fixtures* para preparar datos y `pytest.raises` para las excepciones.

**doctest**: ejemplos de consola (`>>>`) escritos en la docstring, que se verifican como tests.

## 5. Type hints

```python
from typing import Optional, Union, Any, Callable

def buscar(nombre: str, edad: int | None = None) -> list[str]:
    return [nombre]

def aplicar(f: Callable[[int], str], x: int) -> str:
    return f(x)

print(buscar.__annotations__)
print(aplicar(str, 5))
print(Optional[int] == Union[int, None], (int | None) == Optional[int])
```

| Anotación | Significa |
|---|---|
| `int`, `str`, `float`, `bool` | ese tipo |
| `list[int]`, `dict[str, int]`, `tuple[int, str]` | contenedores con el tipo de sus elementos (Python 3.9; antes, `List[int]` de `typing`) |
| `int \| str` / `Union[int, str]` | uno u otro (la forma con `\|` es de 3.10) |
| `Optional[int]` / `int \| None` | un `int` o `None` |
| `Any` | cualquier cosa |
| `Callable[[int], str]` | una función que recibe un `int` y devuelve un `str` |
| `-> None` | la función no devuelve nada |

- Son **opcionales** y Python **no los verifica** al ejecutar: `def doble(x: int)` acepta `"ja"` y devuelve `"jaja"`.
- Los usan los editores (autocompletado, avisos) y los verificadores estáticos como **mypy**.
- Quedan guardados en `__annotations__`.

## Preguntas tipo examen

::: pregunta What is the average time complexity of checking `x in s`, where `s` is a `set`?
- [x] O(1)
- [ ] O(log n)
- [ ] O(n)
- [ ] O(n log n)
::: solucion Explicación
Un set usa una **tabla de hash**: calcula el hash de `x` y va directo a donde debería estar, sin recorrer los elementos. Es O(1) en promedio (O(n) solo en el peor caso, con muchas colisiones). Lo mismo para las claves de un dict.
:::
:::

::: pregunta What is the average time complexity of checking `x in lst`, where `lst` is a `list`?
- [ ] O(1)
- [ ] O(log n)
- [x] O(n)
- [ ] O(n²)
::: solucion Explicación
Una lista no sabe dónde está cada valor: `in` la recorre de a un elemento hasta encontrarlo (o hasta el final). Si se va a preguntar muchas veces, conviene pasarla a un `set`.
:::
:::

::: pregunta Which of the following list operations is O(n)?
- [ ] `lst.append(x)`
- [ ] `lst.pop()`
- [ ] `lst[i]`
- [x] `lst.insert(0, x)`
::: solucion Explicación
Una lista es un arreglo contiguo: insertar al principio obliga a correr **todos** los elementos un lugar (lo mismo `pop(0)`). Agregar o sacar al final y acceder por índice son O(1). Para agregar y sacar rápido de los dos extremos está `collections.deque`.
:::
:::

::: pregunta What is the output of the following code?
```python
data = [("b", 2), ("a", 2), ("c", 1)]
print(sorted(data, key=lambda t: t[1]))
```
- [ ] `[('c', 1), ('a', 2), ('b', 2)]`
- [x] `[('c', 1), ('b', 2), ('a', 2)]`
- [ ] `[('a', 2), ('b', 2), ('c', 1)]`
- [ ] It raises `TypeError`
::: solucion Explicación
Ordena solo por el número: primero `("c", 1)`. `("b", 2)` y `("a", 2)` empatan, y como el ordenamiento de Python es **estable**, quedan en el orden en que venían (`"b"` antes que `"a"`). No se desempata por la letra porque la `key` no la tiene en cuenta.
:::
:::

::: pregunta Which sorting algorithm does Python use for `sorted()` and `list.sort()`?
- [ ] Quicksort
- [ ] Heapsort
- [x] Timsort
- [ ] Bubble sort
::: solucion Explicación
**Timsort**, creado por **Tim Peters** (el autor del Zen) en 2002: una mezcla de *merge sort* e *insertion sort*, O(n log n) y **estable**. Quicksort y heapsort no son estables.
:::
:::

::: pregunta What happens when this code runs?
```python
print(sorted([3, "a", 1]))
```
- [ ] It prints `[1, 3, 'a']`
- [ ] It prints `['a', 1, 3]`
- [x] It raises `TypeError`
- [ ] It raises `ValueError`
::: solucion Explicación
Para ordenar hay que comparar con `<`, y en Python 3 no se puede comparar un `str` con un `int`: *TypeError: '<' not supported between instances of 'str' and 'int'*. (En Python 2 se podía, con un orden arbitrario.)
:::
:::

::: pregunta What is the Global Interpreter Lock (GIL) in CPython?
- [ ] A lock that prevents two programs from running Python at the same time
- [x] A mutex that allows only one thread to execute Python bytecode at a time
- [ ] A security feature that blocks access to global variables
- [ ] A lock that makes all Python code thread-safe automatically
::: solucion Explicación
El GIL hace que, dentro de un proceso, **un solo hilo** ejecute bytecode de Python por vez. Por eso los hilos no aceleran el cálculo puro. No hace que el código sea seguro entre hilos: una operación como `contador += 1` sigue necesitando un `Lock`.
:::
:::

::: pregunta In CPython, which approach lets a CPU-bound task use several CPU cores in parallel?
- [ ] `threading`
- [x] `multiprocessing`
- [ ] `asyncio`
- [ ] Generators
::: solucion Explicación
Con `multiprocessing` cada tarea corre en un **proceso** distinto, con su propio intérprete y su propio GIL, así que pueden calcular en paralelo. Los hilos están limitados por el GIL, y `asyncio` corre en un solo hilo: los dos sirven para tareas que **esperan** (I/O), no para cálculo.
:::
:::

::: pregunta Which statement about `asyncio` is TRUE?
- [ ] It runs each coroutine in a separate operating system thread
- [ ] It runs coroutines in parallel on several CPU cores
- [x] It provides cooperative concurrency in a single thread, where tasks give up control at each `await`
- [ ] Calling an `async def` function runs its body immediately
::: solucion Explicación
`asyncio` usa un **bucle de eventos** en un solo hilo: cada corrutina corre hasta un `await`, y ahí cede el control para que avance otra (concurrencia **cooperativa**). Llamar a una función `async def` no ejecuta su cuerpo: devuelve un objeto corrutina, que hay que esperar con `await` o correr con `asyncio.run`.
:::
:::

::: pregunta In `unittest`, which methods of a `TestCase` subclass are run as tests?
- [ ] All public methods
- [x] Methods whose names start with `test`
- [ ] Methods decorated with `@test`
- [ ] Only the method called `runTest` or `main`
::: solucion Explicación
El cargador de `unittest` ejecuta como test cada método cuyo nombre **empieza con `test`** (`test_suma`, `testDivision`…). Los demás son auxiliares. `setUp` y `tearDown` corren antes y después de cada test.
:::
:::

::: pregunta What does the type hint `Optional[int]` mean?
- [ ] The parameter can be omitted when calling the function
- [x] The value can be an `int` or `None`
- [ ] The value must be a positive `int`
- [ ] Python will automatically convert the value to `int`
::: solucion Explicación
`Optional[int]` es lo mismo que `Union[int, None]` o `int | None`: un `int` o `None`. No dice nada de si el parámetro es obligatorio (eso lo decide tener un valor por defecto), y Python no verifica ni convierte nada.
:::
:::

::: pregunta Which tool checks Python type hints?
- [ ] The Python interpreter, when the code runs
- [x] An external static type checker such as mypy
- [ ] `pip`, when installing a package
- [ ] The `-O` flag of the interpreter
::: solucion Explicación
Python **no** verifica las anotaciones al ejecutar: las guarda en `__annotations__` y nada más. Las controlan herramientas aparte, como **mypy**, antes de ejecutar (análisis estático), y los editores para avisar y autocompletar.
:::
:::
