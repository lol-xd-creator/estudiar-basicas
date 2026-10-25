# 11 · Módulos, paquetes y biblioteca estándar

*Peso **C**: no lo recordó tu amigo y es menos probable, pero hay un par de preguntas clásicas (`if __name__ == "__main__"`, que un módulo se ejecuta una sola vez, `from x import *`). Resultados comprobados con Python 3.14. Algunos ejemplos crean un archivo de módulo para poder importarlo: esas líneas están marcadas.*

::: claves
- Un **módulo** es un archivo `.py`; un **paquete** es una carpeta con módulos (normalmente con un `__init__.py`).
- Un módulo **se ejecuta una sola vez**, la primera vez que se importa; después queda guardado en `sys.modules`, y los siguientes `import` reutilizan ese objeto. Para volver a ejecutarlo: `importlib.reload(mod)`.
- **`__name__`** vale `"__main__"` en el archivo que se ejecuta directamente, y el **nombre del módulo** cuando se lo importa. Por eso `if __name__ == "__main__":` separa el código que solo debe correr al ejecutar el archivo.
- `from mod import x` crea un nombre **nuevo** que apunta al objeto: si después se reasigna `mod.x`, tu `x` no cambia.
- `from mod import *` importa los nombres públicos (los que **no** empiezan con `_`), o solo los que lista `__all__` si el módulo la define. Solo se puede usar a nivel de módulo, no dentro de una función.
- Python busca los módulos en **`sys.path`**, empezando por la carpeta del script: un archivo propio llamado `random.py` **tapa** al módulo `random` de la biblioteca estándar.
- **pip** instala paquetes desde **PyPI**; un **entorno virtual** (`venv`) aísla las dependencias de cada proyecto.
- `random.randint(a, b)` incluye **los dos** extremos; `random.randrange(a, b)`, como `range`, excluye `b`.
- `json` convierte las claves a **strings** y las tuplas a **listas** (`json.loads(json.dumps(...))` no devuelve lo mismo).
- `re.match` busca **solo al principio** del texto; `re.search`, en cualquier lugar.
:::

## 1. Módulos e `import`

Un **módulo** es un archivo `.py`: sus funciones, clases y variables quedan disponibles para otros archivos con `import`.

| Forma | Qué crea |
|---|---|
| `import math` | el nombre `math`; se usa `math.sqrt(16)` |
| `import math as m` | el nombre `m` (un alias) |
| `from math import sqrt` | el nombre `sqrt`, directamente |
| `from math import sqrt as raiz` | el nombre `raiz` |
| `from math import *` | todos los nombres públicos del módulo (desaconsejado: no se sabe qué nombres llegan) |

```python
import math as m
from math import sqrt as raiz
print(m.pi > 3, raiz(16))
```

**Un módulo se ejecuta una sola vez.** La primera vez que se importa, Python ejecuta el archivo entero y guarda el módulo en `sys.modules`. Los `import` siguientes, en cualquier archivo del programa, **reutilizan** ese mismo objeto sin volver a ejecutarlo.

```python
import importlib                                  # (crea saludo.py para probar)
with open("saludo.py", "w") as f:
    f.write('print("cargando saludo")\nmensaje = "hola"\n')
importlib.invalidate_caches()

import saludo
import saludo                                     # no vuelve a ejecutarlo
from saludo import mensaje
print(mensaje, saludo.__name__)
```

Para forzar que se ejecute de nuevo: `importlib.reload(saludo)`.

## 2. `from … import` copia la referencia

`from config import x` crea en tu archivo un nombre `x` que apunta al **mismo objeto** que `config.x` en ese momento. Si después alguien **reasigna** `config.x`, tu `x` sigue apuntando al objeto viejo (es lo mismo que `b = a` y después `a = otro`):

```python
import importlib                                  # (crea config.py para probar)
with open("config.py", "w") as f:
    f.write("x = 1\n")
importlib.invalidate_caches()

from config import x
import config
config.x = 99          # reasigna el nombre dentro del módulo
print(x, config.x)     # tu x no se enteró
```

Para ver siempre el valor actual, se usa `import config` y se lee `config.x`.

## 3. `__name__` y `if __name__ == "__main__"`

Cada módulo tiene una variable `__name__`:

- en el archivo que se **ejecuta directamente** (`python script.py`), vale **`"__main__"`**;
- en un archivo que se **importa**, vale el **nombre del módulo** (`"saludo"`, `"config"`…).

```python
print(__name__)        # este bloque se ejecuta directamente
```

```python
import importlib                                  # (crea modu.py para probar)
with open("modu.py", "w") as f:
    f.write('print("__name__ vale", __name__)\n'
            'if __name__ == "__main__":\n'
            '    print("corrido directo")\n')
importlib.invalidate_caches()

import modu            # importado: __name__ es "modu" y el if no se cumple
```

Por eso el código "de prueba" o el punto de entrada de un programa se escribe abajo de `if __name__ == "__main__":`: corre al ejecutar el archivo, pero **no** cuando otro lo importa para usar sus funciones.

## 4. `from mod import *` y `__all__`

- Sin `__all__`, importa todos los nombres que **no empiezan con guion bajo**.
- Si el módulo define `__all__ = [...]`, importa **solo** esos nombres.
- Solo está permitido **a nivel de módulo**: dentro de una función es `SyntaxError: import * only allowed at module level`.
- PEP 8 lo desaconseja: no queda claro de dónde sale cada nombre, y puede tapar nombres propios.

## 5. Paquetes

Un **paquete** es una carpeta que agrupa módulos. Se importan con puntos: `import paquete.sub` o `from paquete import sub`.

```text
paquete/
├── __init__.py      ← se ejecuta al importar el paquete por primera vez
├── sub.py
└── otro.py
```

- El **`__init__.py`** marca la carpeta como paquete "regular" y se ejecuta al importarlo (puede estar vacío).
- Desde Python 3.3 también existen los **paquetes de espacio de nombres** (*namespace packages*, PEP 420): carpetas **sin** `__init__.py` que igual se pueden importar.
- **Imports relativos**, dentro de un paquete: `from . import otro`, `from .sub import f`, `from .. import algo`. Fuera de un paquete (en un script que se ejecuta directamente) dan `ImportError: attempted relative import with no known parent package`.

```python
import importlib, os                              # (crea un paquete para probar)
os.makedirs("paquete", exist_ok=True)
with open("paquete/__init__.py", "w") as f:
    f.write('print("init del paquete")\n')
with open("paquete/sub.py", "w") as f:
    f.write("VALOR = 7\n")
importlib.invalidate_caches()

from paquete import sub
print(sub.VALOR)
```

## 6. Dónde busca Python los módulos

`import x` busca, en orden, en las carpetas de **`sys.path`**:

1. la carpeta del script que se está ejecutando (o la actual, en la consola);
2. las de la variable de entorno `PYTHONPATH`, si existe;
3. la biblioteca estándar;
4. `site-packages`, donde `pip` instala los paquetes de terceros.

::: ojo
**Llamar a un archivo propio como un módulo de la biblioteca estándar lo tapa.** Si en la carpeta del proyecto hay un `random.py` (o `math.py`, `json.py`…), `import random` importa **ese archivo**, porque la carpeta del script está primero en `sys.path`. Es un error muy común al aprender: el programa falla con un `AttributeError` raro, como *module 'random' has no attribute 'randint'*.

```python estatico
# archivo random.py (creado por error en la carpeta del proyecto)
def randint(a, b):
    return "soy mi archivo"

# archivo juego.py, en la misma carpeta
import random
print(random.randint(1, 6))     # soy mi archivo
```
:::

Si un módulo no existe: `ModuleNotFoundError: No module named '...'` (subclase de `ImportError`). Si el módulo existe pero no tiene el nombre que se pide: `ImportError: cannot import name '...'`.

## 7. Imports circulares

Si `ma` importa a `mb` y `mb` importa a `ma`, uno de los dos encuentra al otro **a medio ejecutar**: los nombres que todavía no se definieron no existen.

```python
import importlib                                  # (crea ma.py y mb.py para probar)
with open("ma.py", "w") as f:
    f.write("import mb\nVALOR = 1\n")
with open("mb.py", "w") as f:
    f.write("import ma\nprint(ma.VALOR)\n")
importlib.invalidate_caches()

import ma     # ma empieza, importa mb, y mb pide ma.VALOR antes de que exista
```

Se arregla reorganizando el código (sacando lo común a un tercer módulo) o importando adentro de la función que lo usa.

## 8. pip, PyPI y entornos virtuales

- **PyPI** (*Python Package Index*, pypi.org) es el repositorio público de paquetes de terceros.
- **pip** es el instalador: `pip install requests`, `pip list`, `pip freeze > requirements.txt` (anota las versiones instaladas), `pip install -r requirements.txt`.
- Un **entorno virtual** es una carpeta con su propio Python y sus propios paquetes, para que cada proyecto tenga sus versiones sin chocar con los otros ni con el sistema:

```text
python -m venv .venv            # crear el entorno
source .venv/bin/activate       # activarlo (Linux/Mac)
.venv\Scripts\activate          # activarlo (Windows)
pip install requests            # ahora se instala solo en este entorno
```

## 9. La biblioteca estándar ("batteries included")

| Módulo | Para qué |
|---|---|
| `os`, `pathlib` | archivos, carpetas y rutas; variables de entorno |
| `sys` | el intérprete: `sys.argv` (argumentos), `sys.path`, `sys.exit()`, `sys.version` |
| `math` | funciones matemáticas: `sqrt`, `floor`, `ceil`, `factorial`, `gcd`, `pi` |
| `random` | números al azar: `random`, `randint`, `choice`, `shuffle`, `sample`, `seed` |
| `datetime`, `time` | fechas, horas, duraciones |
| `json`, `csv` | leer y escribir JSON y CSV |
| `re` | expresiones regulares |
| `collections`, `itertools`, `functools` | estructuras y herramientas (unidades 4 y 8) |
| `copy` | copias superficiales y profundas (unidad 3) |
| `unittest`, `logging`, `sqlite3`, `typing` | tests, registro de eventos, base de datos SQLite, anotaciones de tipo |

**Detalles que se preguntan:**

```python
import math, random, json, re

print(math.floor(-2.5), math.ceil(-2.5), int(-2.5))   # hacia abajo, hacia arriba, hacia el cero

print(set(random.randint(1, 3) for _ in range(300)))  # incluye el 3
print(set(random.randrange(1, 3) for _ in range(300)))  # no incluye el 3
random.seed(42)                                         # con la misma semilla, la misma secuencia
a = [random.randint(1, 100) for _ in range(3)]
random.seed(42)
print(a == [random.randint(1, 100) for _ in range(3)])

s = json.dumps({1: (1, 2), "ok": True, "n": None})
print(s)               # claves a string, tupla a lista, True → true, None → null
print(json.loads(s))   # al volver no se recupera ni la clave 1 ni la tupla

print(re.match("b", "abc"), bool(re.search("b", "abc")))   # match solo mira el principio
print(re.findall(r"\d+", "a1b22c333"))
```

## Preguntas tipo examen

::: pregunta What is the value of `__name__` inside a Python file that is run directly from the command line (`python script.py`)?
- [ ] `"script"`
- [ ] `"script.py"`
- [x] `"__main__"`
- [ ] `None`
::: solucion Explicación
En el archivo que se ejecuta directamente, `__name__` vale `"__main__"`. Si ese mismo archivo se **importa** desde otro, vale el nombre del módulo (`"script"`). Por eso se usa `if __name__ == "__main__":` para el código que solo debe correr al ejecutarlo.
:::
:::

::: pregunta A module `saludo.py` contains `print("loading")`. What happens when another file runs `import saludo` twice?
- [x] `loading` is printed once
- [ ] `loading` is printed twice
- [ ] The second import raises `ImportError`
- [ ] Nothing is printed, because imports never run code
::: solucion Explicación
Un módulo se ejecuta **una sola vez**, en el primer `import`. Después queda guardado en `sys.modules`, y los siguientes `import` (de cualquier archivo) reutilizan el mismo objeto. Para volver a ejecutarlo: `importlib.reload`.
:::
:::

::: pregunta What is the output of the following code? (`config.py` contains only `x = 1`)
```python
import importlib
with open("config.py", "w") as f:
    f.write("x = 1\n")
importlib.invalidate_caches()

from config import x
import config
config.x = 99
print(x)
```
- [x] `1`
- [ ] `99`
- [ ] It raises `ImportError`
- [ ] It raises `AttributeError`
::: solucion Explicación
`from config import x` crea un nombre `x` que apunta al objeto `1`. Reasignar `config.x` cambia el nombre **dentro del módulo**, pero no el `x` de este archivo, que sigue apuntando al `1`. (Las primeras líneas solo crean el archivo `config.py` para poder probarlo.)
:::
:::

::: pregunta If a module does not define `__all__`, which names are imported by `from module import *`?
- [ ] All names, including the ones that start with an underscore
- [x] All names that do not start with an underscore
- [ ] Only functions and classes
- [ ] No names; `__all__` is required
::: solucion Explicación
Sin `__all__`, `import *` trae todos los nombres **públicos**: los que no empiezan con `_`. Si el módulo define `__all__`, trae solo los que esa lista nombra. Igual, PEP 8 lo desaconseja.
:::
:::

::: pregunta Which values can `random.randint(1, 3)` return? (Select all that apply)
- [x] `1`
- [x] `2`
- [x] `3`
- [ ] `0`
- [ ] `4`
::: solucion Explicación
`randint(a, b)` incluye **los dos extremos**: 1, 2 o 3. Es distinto de `random.randrange(1, 3)`, que funciona como `range` y nunca devuelve el 3.
:::
:::

::: pregunta What is the output of the following code?
```python
import json

s = json.dumps({1: (1, 2)})
print(json.loads(s))
```
- [ ] `{1: (1, 2)}`
- [ ] `{1: [1, 2]}`
- [x] `{'1': [1, 2]}`
- [ ] `{'1': (1, 2)}`
::: solucion Explicación
JSON solo admite claves de tipo string, así que `json.dumps` convierte la clave `1` en `"1"`. Y no tiene tuplas: la tupla se escribe como un arreglo, que al leerse vuelve como **lista**. Por eso la ida y vuelta no devuelve el mismo objeto.
:::
:::

::: pregunta What is the output of `print(math.floor(-2.5), math.ceil(-2.5), int(-2.5))` (after `import math`)?
- [ ] `-2 -3 -2`
- [x] `-3 -2 -2`
- [ ] `-3 -2 -3`
- [ ] `-2 -2 -2`
::: solucion Explicación
`floor` redondea **hacia abajo** (−3), `ceil` **hacia arriba** (−2) e `int` **corta hacia el cero** (−2). Con números negativos, `floor` e `int` dan distinto.
:::
:::

::: pregunta What is the output of the following code?
```python
import re

print(re.match("b", "abc"), bool(re.search("b", "abc")))
```
- [ ] `<re.Match ...> True`
- [x] `None True`
- [ ] `None False`
- [ ] It raises `ValueError`
::: solucion Explicación
`re.match` busca el patrón **solo al principio** del texto: `"abc"` empieza con `a`, así que no hay coincidencia y devuelve `None`. `re.search` busca en **cualquier** lugar y encuentra la `b`.
:::
:::

::: pregunta Your project folder contains a file you wrote called `random.py`. What happens when another script in the same folder runs `import random`?
- [ ] Python imports the standard library `random` module, because it has priority
- [x] Python imports your `random.py`, because the script's folder comes first in `sys.path`
- [ ] Python raises an `ImportError` because of the name conflict
- [ ] Python imports both modules and merges them
::: solucion Explicación
Python busca en `sys.path`, y lo primero es la carpeta del script. Encuentra tu `random.py` antes que el de la biblioteca estándar y lo importa: el estándar queda **tapado**. Es un error típico que termina en algo como *module 'random' has no attribute 'randint'*.
:::
:::

::: pregunta What is the main purpose of a virtual environment (`venv`)?
- [ ] To run Python code faster
- [ ] To run Python code in a web browser
- [x] To isolate the packages and their versions for each project
- [ ] To compile Python code into an executable
::: solucion Explicación
Un entorno virtual tiene su propio intérprete y su propia carpeta de paquetes. Así, cada proyecto instala las versiones que necesita sin chocar con otros proyectos ni con los paquetes del sistema.
:::
:::

::: pregunta Which file traditionally marks a directory as a regular Python package?
- [ ] `main.py`
- [x] `__init__.py`
- [ ] `setup.py`
- [ ] `__main__.py`
::: solucion Explicación
El `__init__.py` marca la carpeta como paquete regular y se ejecuta al importarlo por primera vez (puede estar vacío). Desde Python 3.3 también hay paquetes de espacio de nombres sin `__init__.py`. `__main__.py` es otra cosa: lo que se ejecuta con `python -m paquete`.
:::
:::
