# Python (EPAM)

Apunte para el **examen técnico de selección de EPAM Campus**, programa *Primer Paso 2026: Python + IA* (Córdoba). Esta nota es el **programa analítico**: qué temas pueden entrar y cuánto pesa cada uno. Cada unidad va a ser una subnota con lo que te pueden preguntar, la teoría justa para contestarlo, las trampas típicas y preguntas tipo examen.

::: aclaracion
**El programa es inferido: no hay temario oficial.** Sale de tres fuentes:

- lo que recuerda un amigo que rindió el examen;
- el reporte de otro candidato de EPAM (Bakú, 2026): *Python essentials, LEGB, OOP, SOLID*;
- la página del programa (campus.epam.com/en/training/6051): se dicta en inglés, piden inglés B1 y la etapa 1 arranca con "técnicas avanzadas de Python". El examen filtra **Python Core**, no Docker, la nube ni IA.

Tu amigo aclaró que le podrían haber tomado otras cosas. Por eso hay temas vecinos con peso **B** y **C**.
:::

## El examen

::: claves
- **Formato:** multiple choice, **40 preguntas en 40 minutos**: **1 minuto por pregunta**.
- **Idioma:** casi seguro en **inglés**.
- **Estilo:** preguntas teóricas, históricas y **engañosas** (*killer questions*), sobre las particularidades, la cultura y las trampas de sintaxis de Python.
- **Tipos de pregunta esperables:**
  - *"What is the output of the following code?"*, con una opción **"raises an error"**;
  - *"Which statement is **NOT** true?"*;
  - dos opciones casi iguales;
  - código con nombres sin significado (`foo`, `bar`, `baz`) para seguir el estado de las variables.
:::

::: ojo
**Fechas:**
- La inscripción cierra el **23/10**.
- Desde que te registrás tenés **3 días** para rendir el test de inglés y la evaluación técnica.
- La evaluación técnica no se puede hacer después del **30/10**.

Plan: registrarte el **23/10** y rendir dentro de esos 3 días.
:::

## Cómo leer los pesos

| Peso | Qué significa |
|---|---|
| **A** | Lo recordó tu amigo: entra casi seguro. |
| **B** | Vecino directo de un tema A, o aparece en otro reporte: muy probable. |
| **C** | Puede aparecer en un examen de Python Core: se estudia si sobra tiempo. |

| Unidad | Tema | Peso |
|---|---|---|
| 1 | Historia, cultura y filosofía de Python | A |
| 2 | Tipos, operadores y expresiones | B |
| 3 | Modelo de objetos: identidad, mutabilidad, memoria y copias | A |
| 4 | Estructuras de datos | A |
| 5 | Funciones y argumentos | A |
| 6 | Alcance (scope), regla LEGB y closures | A |
| 7 | Control de flujo, iteración y comprensiones | A |
| 8 | Iteradores, generadores y decoradores | A |
| 9 | Programación orientada a objetos | A |
| 10 | Excepciones y context managers | B |
| 11 | Módulos, paquetes y biblioteca estándar | C |
| 12 | Temas de borde: complejidad, concurrencia, testing | C |

## Unidad 1 · Historia, cultura y filosofía (A)

- **Origen:**
  - **Guido van Rossum** lo creó a fines de los 80; la primera versión pública es de **1991**.
  - El nombre viene de **Monty Python**, no de la serpiente.
  - Su antecesor fue el lenguaje **ABC**.
- **Gobierno del lenguaje:**
  - Guido fue el **BDFL** ("dictador benevolente vitalicio") hasta **2018**; hoy decide el **Steering Council**.
  - La comunidad se organiza en la **PSF** (Python Software Foundation).
- **Los PEP** (*Python Enhancement Proposals*): qué son y los que hay que conocer.
  - **PEP 8**: guía de estilo.
  - **PEP 20**: el Zen.
  - **PEP 257**: docstrings.
  - **PEP 484**: type hints.
- **El Zen de Python** (`import this`):
  - Lo escribió **Tim Peters**: 19 aforismos escritos de 20.
  - Las frases que más se preguntan.
  - *Easter eggs*: `import antigravity` y `from __future__ import braces`.
- **PEP 8:**
  - 4 espacios por nivel de sangría (nunca tabs mezclados con espacios).
  - Largo de línea: 79 caracteres (72 en docstrings y comentarios).
  - Nombres: `snake_case` para funciones y variables, `CapWords` para clases, `UPPER_CASE` para constantes.
  - `_interno` y `__mangled`.
  - Dos líneas en blanco entre definiciones de primer nivel.
  - Orden de los imports.
  - Comparar con `None` usando `is`.
  - Nombres que conviene evitar: `l`, `O`, `I`.
- **Principios de diseño:**
  - Legibilidad ante todo.
  - "Batteries included" (la biblioteca estándar trae de todo).
  - Una forma obvia de hacer las cosas.
  - EAFP contra LBYL (pedir perdón en lugar de pedir permiso).
  - Duck typing.
- **Tipado:** **dinámico** (el tipo es del objeto, no de la variable) y **fuerte** (no hay conversiones implícitas raras: `"1" + 1` es un error). Los type hints no se verifican al ejecutar.
- **Implementaciones:**
  - **CPython** (la de referencia, escrita en C), PyPy, Jython.
  - El código se compila a **bytecode** (`.pyc`) que después interpreta una máquina virtual.
- **Versiones:**
  - **Python 2 contra 3**: `print`, la división `/`, unicode. Python 2 dejó de tener soporte en 2020.
  - Qué trajo cada versión de Python 3: f-strings (3.6), orden de los dicts garantizado (3.7), `:=` y parámetros solo posicionales (3.8), `|` para combinar dicts (3.9), `match` (3.10).

## Unidad 2 · Tipos, operadores y expresiones (B)

- **Tipos básicos:** `int` (sin límite de tamaño), `float`, `complex`, `bool`, `str`, `None`, `bytes`.
- **`bool` es subclase de `int`:** `True + True == 2`, `isinstance(True, int)`.
- **Floats:** `0.1 + 0.2 != 0.3`, `round()` redondea al par (*banker's rounding*), `float("nan")`.
- **Operadores aritméticos:**
  - `/` contra `//`.
  - `//` y `%` con negativos: redondean hacia −∞ (`-7 // 2`).
  - `**` es asociativo a la derecha (`2 ** 3 ** 2`).
  - `-2 ** 2`.
- **Precedencia de operadores** y comparaciones encadenadas (`1 < x < 3`, `a == b == c`).
- **`and` / `or`:** devuelven uno de los operandos, no `True`/`False` (`0 or "x"`, `[] and 1`). Cortocircuito.
- **Falsy y truthy:** valen como falso `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`; el resto vale como verdadero.
- **Strings:**
  - Son inmutables.
  - Indexado y slicing, incluidos índices negativos y `[::-1]`.
  - Repetición (`"ab" * 3`) y `in`.
  - Métodos más comunes: `split`, `join`, `strip`, `replace`, `find` contra `index`.
- **Formato:** f-strings, `str()` contra `repr()`.
- **Conversiones:** `int("10", 2)`, `int(3.9)`, `int("3.9")`.
- **Operador morsa** `:=`.
- **Operador ternario** `a if c else b`.

## Unidad 3 · Modelo de objetos: identidad, mutabilidad, memoria y copias (A)

- **Todo es un objeto**, con identidad (`id`), tipo y valor. Las variables son **nombres** que apuntan a objetos, no cajas.
- **`is` contra `==`:**
  - `is` compara identidad y `==` compara valor.
  - Caché de enteros chicos (−5 a 256) e *interning* de strings: por qué `a is b` a veces da `True` "de casualidad".
- **Mutables e inmutables:**
  - Mutables: `list`, `dict`, `set`.
  - Inmutables: `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`.
  - Una tupla puede contener objetos mutables.
- **Asignación y aliasing:** `b = a` no copia nada. Diferencia entre `+=` y `=`: con una lista, `+=` la modifica en el lugar.
- **Paso de argumentos:** Python no pasa ni "por valor" ni "por referencia", sino por **asignación** (*call by sharing*). Una función puede modificar una lista que recibe, pero no reasignar la variable de quien la llamó.
- **Copias:**
  - **Superficial** (*shallow*): `copy.copy`, `lista[:]`, `list(x)`, `dict.copy()`.
  - **Profunda** (*deep*): `copy.deepcopy`.
  - El clásico `[[0] * 3] * 3`: repite la misma lista interna tres veces.
- **Memoria:**
  - Conteo de referencias.
  - El *garbage collector* para los ciclos.
  - `del` borra el **nombre**, no el objeto.
  - `sys.getrefcount`.
- **Hashable:** qué objetos pueden ser claves de un dict o elementos de un set, y por qué una lista no puede.

## Unidad 4 · Estructuras de datos (A)

- **Listas:**
  - Métodos que modifican y devuelven `None` (`sort`, `append`, `reverse`) contra los que devuelven algo nuevo (`sorted`, `reversed`).
  - `append` contra `extend`.
  - `insert`, `pop`, `remove`.
  - Slicing con asignación (`a[1:3] = [...]`).
- **Tuplas:**
  - La de un elemento es `(1,)`; `(1)` es un `int`.
  - Empaquetar y desempaquetar.
  - El caso `t[0] += [1]`: lanza `TypeError` **y además** modifica la lista.
  - `namedtuple`.
- **Sets:**
  - Operaciones con operadores bit a bit: `|` unión, `&` intersección, `-` diferencia, `^` diferencia simétrica.
  - `<=` (subconjunto) y `<` (subconjunto propio).
  - `{}` crea un **dict**, no un set; el conjunto vacío es `set()`.
  - No tienen orden ni duplicados.
  - `frozenset`.
- **Dicts:**
  - Las claves tienen que ser hashables.
  - Desde 3.7 mantienen el orden de inserción.
  - `get`, `setdefault`, `pop`, `update`, `|`.
  - Vistas: `keys()`, `items()`, `values()`.
  - `True`, `1` y `1.0` son la **misma** clave.
- **`collections`:** `defaultdict`, `Counter`, `deque`, `OrderedDict`.
- **Desempaquetado avanzado:**
  - `a, *b, c = ...` y `first, *_ = ...`.
  - Intercambio con `a, b = b, a`.
  - `*` y `**` al llamar a una función y al armar listas o dicts (`[*a, *b]`, `{**d1, **d2}`).

## Unidad 5 · Funciones y argumentos (A)

- **Definir, llamar y devolver:**
  - Sin `return`, la función devuelve `None`.
  - Varios valores de retorno son en realidad una tupla.
- **Tipos de parámetros y su orden:**
  - Posicionales, con valor por defecto, `*args`, solo por nombre, `**kwargs`.
  - Solo posicionales con `/` y solo por nombre con `*`.
  - Errores típicos: `got multiple values for argument`, `positional argument follows keyword argument`.
- **Valores por defecto:**
  - Se evalúan **una sola vez**, al definir la función: `def foo(x=[])`.
  - La solución idiomática: `x=None`.
  - `foo.__defaults__`.
- **Las funciones son objetos:** se pasan como argumento, se devuelven y se guardan en estructuras.
- **`lambda`:** solo admite una expresión.
- **Funciones de fábrica (built-ins):** `map`, `filter` (devuelven iteradores, no listas), `functools.reduce`, `zip` (se corta en el más corto), `enumerate`, `sorted(key=...)`, `min`/`max` con `key`, `any`/`all`, `sum`.
- **Recursión:** el límite de recursión y `RecursionError`.
- **Docstrings y anotaciones:** `__doc__`, `__annotations__`; las anotaciones no se verifican.

## Unidad 6 · Alcance (scope), regla LEGB y closures (A)

- **Regla LEGB:** el orden en que Python busca un nombre:
  - **L**ocal;
  - **E**nclosing (la función que encierra);
  - **G**lobal (el módulo);
  - **B**uilt-in.
- **Asignar hace local al nombre en toda la función**, aunque la asignación esté después: `UnboundLocalError`.
- **`global` contra `nonlocal`:**
  - `nonlocal` exige que el nombre ya exista en una función que encierra (no sirve para globales).
  - `SyntaxError` si se usa mal.
- **Leer contra modificar:** `lista.append(...)` no reasigna el nombre, así que no necesita `global`.
- **Tapar un built-in:** `list = [1, 2]` y después `list("ab")` falla.
- **Closures:**
  - La función interna recuerda las variables de la que la encierra.
  - `__closure__` y `cell_contents`.
  - Contadores con `nonlocal`.
- ***Late binding*:** `[lambda: i for i in range(3)]` devuelve tres funciones que dan 2. La solución: `lambda i=i: i`.
- **Ámbitos especiales:**
  - Las comprensiones tienen su propio ámbito.
  - La variable de un `for` sobrevive al bucle.
  - El nombre de `except ... as e` se borra al salir del bloque.
- **Funciones para inspeccionar:** `globals()`, `locals()`, `dir()`.

## Unidad 7 · Control de flujo, iteración y comprensiones (A)

- **`if`/`elif`/`else`** y `match`/`case` (3.10).
- **`for` y `while` con `else`:** el `else` corre si el bucle **no** terminó con `break`.
- **`break`, `continue` y `pass`.**
- **Modificar la lista que se recorre:**
  - Borrar elementos mientras se itera saltea elementos.
  - Agregar puede hacer el bucle infinito.
  - Cambiar el tamaño de un dict mientras se recorre: `RuntimeError`.
- **`range`:**
  - Es perezoso (no arma la lista) e inmutable.
  - Paso negativo y rangos vacíos (`range(5, 0)`).
  - `len(range(...))`, `range` con índices y slicing.
- **Comprensiones:**
  - De lista, de dict y de set.
  - Con `if` (filtro, va al final) y con `if-else` (va al principio).
  - Anidadas: en qué orden se leen los `for`.
  - Su ámbito propio.
- **Generator expressions:** `(x for x in ...)` no es una "comprensión de tupla"; `tuple(...)` sí arma una tupla.
- **`enumerate` y `zip` en los bucles** y desempaquetado en el `for`.

## Unidad 8 · Iteradores, generadores y decoradores (A)

- **Iterable contra iterador:**
  - El protocolo: `__iter__` y `__next__`.
  - `StopIteration`.
  - `iter()` y `next()`, este último con valor por defecto.
- **Un iterador se agota:** se recorre una sola vez (`map`, `zip`, generadores).
- **Generadores:**
  - Funciones con `yield` y su estado suspendido.
  - `yield from`.
  - Evaluación perezosa y ahorro de memoria.
  - `return` dentro de un generador.
  - `send` (básico).
- **Diferencias teóricas** entre iterador, generador y decorador.
- **`itertools`:** `count`, `cycle`, `chain`, `islice`, `product`, `permutations`, `groupby`.
- **Decoradores:**
  - Una función que recibe una función y devuelve otra.
  - `@deco` es lo mismo que `f = deco(f)`.
  - Decoradores con argumentos (tres niveles de funciones).
  - Varios decoradores apilados: se aplican de abajo hacia arriba.
  - `functools.wraps`.
  - Cuándo se ejecuta el decorador: al definir la función, no al llamarla.
- **Decoradores de la biblioteca estándar:** `@property`, `@staticmethod`, `@classmethod`, `@functools.lru_cache`, `@dataclass`.

## Unidad 9 · Programación orientada a objetos (A)

- **Clase e instancia:**
  - `self` es explícito.
  - `__init__` contra `__new__`.
  - Atributos de clase contra atributos de instancia: el gotcha de una lista compartida entre todas las instancias.
- **Visibilidad:**
  - `_protegido` es una convención.
  - `__privado` cambia de nombre (*name mangling*: `_Clase__privado`).
  - En Python no hay privado de verdad.
- **Métodos de instancia, de clase y estáticos.** `@property`, con su *setter*.
- **Herencia:**
  - `super()`.
  - Redefinir métodos (*override*).
  - `isinstance` contra `type() ==`; `issubclass`.
  - Todas las clases heredan de `object`.
- **Herencia múltiple y MRO:**
  - Linealización C3.
  - `Clase.__mro__` y `Clase.mro()`.
  - El problema del diamante.
  - `super()` sigue el MRO, no "va a la clase padre".
  - Cuándo no se puede armar el MRO (`TypeError`).
- **Métodos mágicos (dunder):**
  - `__str__` contra `__repr__`.
  - `__eq__` y `__hash__`: si definís `__eq__`, la clase deja de ser hashable.
  - `__len__`, `__bool__`, `__getitem__`, `__contains__`, `__iter__`, `__call__`.
  - Sobrecarga de operadores (`__add__`, `__radd__`, `__lt__`).
  - `__enter__` / `__exit__`.
  - `__del__`.
- **Clases abstractas:** `abc.ABC` y `@abstractmethod`; no se pueden instanciar.
- **Otros:** `__slots__`, dataclasses, duck typing.
- **Principios (B):** los 4 pilares de la POO (encapsulamiento, abstracción, herencia, polimorfismo) y **SOLID** (aparece en el reporte de Bakú).

## Unidad 10 · Excepciones y context managers (B)

- **Orden de ejecución:** `try` / `except` / `else` / `finally`.
- **`finally`:**
  - Se ejecuta siempre, incluso después de un `return`.
  - Un `return` dentro del `finally` pisa al anterior y se traga la excepción.
- **Jerarquía:**
  - `BaseException` contra `Exception`.
  - Por qué no conviene un `except:` pelado.
  - El orden de los `except` importa.
- **Lanzar excepciones:** `raise`, `raise ... from`, volver a lanzar con `raise`, excepciones propias (heredan de `Exception`).
- **`assert`:** se desactiva con `-O`.
- **Las excepciones típicas y cuándo salta cada una:** `TypeError`, `ValueError`, `KeyError`, `IndexError`, `AttributeError`, `NameError`, `ZeroDivisionError`, `StopIteration`.
- **`with`:**
  - El protocolo de context manager (`__enter__`, `__exit__`).
  - Si `__exit__` devuelve `True`, se suprime la excepción.
  - `contextlib.contextmanager`.
- **Archivos:** `open`, modos (`r`, `w`, `a`, `b`, `+`), con `with`.

## Unidad 11 · Módulos, paquetes y biblioteca estándar (C)

- **Imports:**
  - `import` contra `from ... import`; `as`.
  - Un módulo se ejecuta **una sola vez** aunque se importe muchas veces.
- **`if __name__ == "__main__"`.**
- **Paquetes:** `__init__.py`, `__all__` y `from x import *`; dónde busca módulos Python (`sys.path`).
- **Entorno:** `pip`, PyPI, entornos virtuales (`venv`).
- **Módulos de uso frecuente:** `os`, `sys`, `math`, `random`, `datetime`, `json`, `re` (básico), `collections`, `itertools`, `functools`, `copy`.

## Unidad 12 · Temas de borde (C)

- **Complejidad (Big-O)** de las operaciones de lista, dict y set: `in` en una lista es O(n) y en un set O(1).
- **Ordenamiento:** `sort` contra `sorted`; Timsort, que es **estable**.
- **Concurrencia:**
  - Qué es el **GIL**.
  - `threading` contra `multiprocessing` contra `asyncio`.
  - Tareas que esperan (I/O) contra tareas que calculan (CPU).
- **Testing:** `unittest`, `pytest`, `assert`.
- **Type hints:** `typing`, `Optional`, `list[int]`; mypy.

## Plan de estudio

Del 10/10 al 22/10, con las unidades A primero y en un orden donde cada una se apoya en la anterior:

| Fecha | Unidad |
|---|---|
| 10/10 | 6 · Alcance y LEGB (nota de prueba para ajustar el formato) |
| 11/10 | 5 · Funciones y argumentos |
| 12/10 | 3 · Modelo de objetos y memoria |
| 13/10 | 4 · Estructuras de datos |
| 14/10 | 7 · Control de flujo e iteración |
| 15/10 | 9 · POO (1): clases, atributos y métodos mágicos |
| 16/10 | 9 · POO (2): herencia, MRO, `super()` y SOLID |
| 17/10 | 8 · Iteradores, generadores y decoradores |
| 18/10 | 1 · Historia y cultura, y 2 · Tipos y operadores |
| 19/10 | 10 · Excepciones, y 11 · Módulos |
| 20/10 | 12 · Temas de borde, y repaso de trampas |
| 21–22/10 | Repaso: las preguntas de todas las unidades |
| 23/10 | Registro y test de inglés |
| 24–25/10 | Examen técnico (dentro de los 3 días) |

::: tip
Cada unidad va a tener la misma forma: **claves** (lo que se pregunta), **teoría justa** con código que podés ejecutar, **trampas** y **preguntas tipo examen en inglés** con la explicación en castellano. En el examen hay 1 minuto por pregunta: practicá leyendo el código **sin ejecutarlo**, y usá el botón ▶ solo para comprobar.
:::
