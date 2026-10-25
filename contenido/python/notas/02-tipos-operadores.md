# 2 · Tipos, operadores y expresiones

*Peso **B**: no estaba en lo que recordó tu amigo, pero es la base de muchas preguntas "¿qué imprime?" (división con negativos, precedencia, `and`/`or`, floats). La identidad (`is`) y la mutabilidad están en [[3 · Modelo de objetos: identidad, mutabilidad, memoria y copias]]. Resultados comprobados con Python 3.14.*

::: claves
- `/` da **siempre** un `float` (`4 / 2` es `2.0`). `//` es la división **entera hacia abajo** (hacia −∞): `-7 // 2` es **`-4`**. El signo de `%` es el del **divisor**: `-7 % 2` es **`1`**.
- `**` es **asociativo a la derecha** (`2 ** 3 ** 2` es `2 ** 9` = 512) y va **antes** que el menos unario: `-2 ** 2` es **`-4`**.
- Los `int` **no tienen límite** de tamaño. Los `float` tienen errores de redondeo: `0.1 + 0.2 == 0.3` es **`False`**.
- `round()` redondea al **par** cuando está justo en el medio: `round(2.5)` es **2** y `round(3.5)` es **4**.
- `bool` es **subclase de `int`**: `True + True == 2`. `bool("False")` es `True` (un string no vacío).
- **`and` y `or` devuelven uno de los operandos**, no necesariamente `True`/`False`: `0 or "x"` es `"x"`, `5 and 0` es `0`. Cortan apenas saben el resultado (cortocircuito). Precedencia: `not` > `and` > `or`.
- Las comparaciones se **encadenan**: `1 < 3 > 2` es `(1 < 3) and (3 > 2)`. Los strings se comparan **carácter por carácter**: `"10" < "9"` es `True`.
- `==` entre tipos distintos da `False`, pero `<` entre tipos que no se pueden comparar da **`TypeError`**.
- `int("3.9")` es **`ValueError`**; `int(3.9)` es `3` (corta, no redondea).
- `"-".join([1, 2])` es **`TypeError`**: `join` solo une strings. `"a" + 1` también es `TypeError`.
- `a = b = []` crea **una sola** lista con dos nombres.
:::

## 1. Tipos numéricos

| Tipo | Ejemplos | Detalle |
|---|---|---|
| `int` | `42`, `-7`, `1_000_000`, `0b101`, `0o17`, `0xff` | **sin límite** de tamaño |
| `float` | `3.14`, `1e3`, `float("inf")`, `float("nan")` | doble precisión (IEEE 754): unos 15–17 dígitos |
| `complex` | `1 + 2j` | `.real`, `.imag`; la unidad imaginaria es `j` |
| `bool` | `True`, `False` | subclase de `int`: valen 1 y 0 |

```python
print(2 ** 100, type(2 ** 100).__name__)    # no hay desbordamiento
print(1_000_000, 0b101, 0o17, 0xff)         # el _ es solo para leer mejor
print(1e3, type(1e3).__name__)              # notación científica: siempre float
z = 1 + 2j
print(z.real, z.imag, abs(3 + 4j))
```

Al operar `int` con `float`, el resultado es `float`.

## 2. Operadores aritméticos

| Operador | Qué hace | Ejemplo |
|---|---|---|
| `+`, `-`, `*` | suma, resta, producto | |
| `/` | división **real**: siempre `float` | `7 / 2` → `3.5`; `4 / 2` → `2.0` |
| `//` | división **entera hacia abajo** (*floor*) | `7 // 2` → `3`; `-7 // 2` → `-4` |
| `%` | resto, con el signo **del divisor** | `-7 % 2` → `1`; `7 % -2` → `-1` |
| `**` | potencia | `2 ** -1` → `0.5` |
| `divmod(a, b)` | `(a // b, a % b)` | `divmod(-7, 2)` → `(-4, 1)` |

```python
print(7 / 2, 4 / 2, type(4 / 2).__name__)
print(-7 // 2, -7 % 2, 7 % -2, divmod(-7, 2))
print(7 // 2.0, -7 // 2.0)      # con un float, // da un float (pero igual redondea hacia abajo)
```

::: ojo
**La división entera con negativos redondea hacia abajo, no hacia el cero.** −3,5 hacia abajo es −4, no −3. Y siempre se cumple `a == (a // b) * b + a % b`: por eso `-7 % 2` es 1 (−4 · 2 + 1 = −7). En C o Java, `-7 / 2` da −3 y `-7 % 2` da −1: Python es distinto.
:::

**Potencias:**

```python
print(2 ** 3 ** 2)    # derecha a izquierda: 2 ** (3 ** 2) = 2 ** 9
print(-2 ** 2)        # -(2 ** 2): ** va antes que el menos
print((-2) ** 2)
print(0 ** 0, pow(2, 3, 5))   # pow con tres argumentos: (2 ** 3) % 5
```

Dividir por cero, entera o real, da `ZeroDivisionError` (también `1.0 / 0`).

## 3. Floats, redondeo y `round`

Los `float` se guardan en **binario**, y la mayoría de los decimales (como 0,1) no tienen una representación exacta:

```python
print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)

import math
print(math.isclose(0.1 + 0.2, 0.3))     # comparar floats con tolerancia

from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))   # decimales exactos
```

**`round` redondea al par** cuando el número está justo en el medio (*banker's rounding*, para no sesgar las sumas):

```python
print(round(2.5), round(3.5), round(-2.5))
print(round(2.675, 2))     # 2.67: 2.675 en binario es apenas menor que 2,675
```

`float("nan")` no es igual a nada, ni a sí mismo; `0.0 == -0.0` es `True`; `float("inf")` es mayor que cualquier número.

## 4. Conversiones

```python
print(int(3.9), int(-3.9))          # corta hacia el cero (no redondea)
print(int("10", 2), int("0x1F", 16))   # con base
print(int(" 42 "))                  # tolera espacios alrededor
print(float("1e3"), str(5) + "!", list("abc"), ord("A"), chr(97))
print(int("3.9"))                   # ValueError: un string con punto no es un int
```

| Conversión | Resultado |
|---|---|
| `int(3.9)` / `int(-3.9)` | `3` / `-3` (corta hacia el cero) |
| `int("3.9")`, `int("abc")` | `ValueError` |
| `int(" 42 ")` | `42` |
| `float("1e3")` | `1000.0` |
| `bool("False")`, `bool(" ")`, `bool([0])` | `True` (no vacíos) |
| `bool(0.0)`, `bool("")`, `bool(None)` | `False` |

## 5. Booleanos y valor de verdad

**Valen como falso:** `False`, `None`, `0`, `0.0`, `0j`, `""`, `[]`, `()`, `{}`, `set()`, `range(0)`. **Todo lo demás vale como verdadero** (incluidos `"False"`, `"0"`, `" "` y `[0]`).

```python
print(True + True + True, True == 1, isinstance(True, int))
print(sum([True, False, True]))      # contar cuántos son verdaderos
print(bool("False"), bool(" "), bool(0.0), bool([0]))
```

## 6. Comparaciones

```python
print(1 < 3 > 2)          # (1 < 3) and (3 > 2)
print(1 < 2 < 3, 1 == 1.0)
print("a" < "b", "10" < "9", "B" < "a")   # carácter por carácter, por código Unicode
print(1 == "1")           # tipos distintos: False, sin error
print(1 < "a")            # TypeError: no se pueden ordenar
```

- **Comparaciones encadenadas:** `a < b < c` es `a < b and b < c`, evaluando `b` una sola vez.
- **Strings:** se comparan letra por letra según su código (`ord`). Las mayúsculas van antes que las minúsculas (`"B" < "a"`), y `"10" < "9"` porque `"1" < "9"`. Si uno es prefijo del otro, el más corto es menor.
- **Tipos distintos:** `==` da `False`, pero `<`, `>`, etc. dan `TypeError` (salvo entre números).

## 7. `and`, `or`, `not`

::: ojo
**`and` y `or` no devuelven `True`/`False`: devuelven uno de los operandos.**

- `a or b`: si `a` es verdadero, devuelve `a` (y **ni evalúa** `b`); si no, devuelve `b`.
- `a and b`: si `a` es falso, devuelve `a` (y ni evalúa `b`); si no, devuelve `b`.
- `not` sí devuelve siempre `True` o `False`.
:::

```python
print(0 or [] or "a")     # el primero verdadero (o el último, si ninguno lo es)
print(5 and 0)            # el primero falso (o el último, si todos son verdaderos)
print(None or 5, "" and "x", not 0, not "a")
nombre = ""
print(nombre or "anónimo")    # el uso típico: un valor por defecto
```

**Cortocircuito:** si con el primer operando ya alcanza, el segundo no se evalúa.

```python
def f():
    print("se evaluó f")
    return True

print(False and f())      # f no se llama
print(True or f())        # f no se llama
```

**Precedencia:** `not` > `and` > `or`.

```python
print(True or False and False)   # True or (False and False)
print(not 1 == 2)                # not (1 == 2): la comparación va antes que not
```

## 8. Operadores bit a bit (con enteros)

| Operador | Nombre | Ejemplo |
|---|---|---|
| `&` | AND | `5 & 3` → `1` (`101 & 011 = 001`) |
| `\|` | OR | `5 \| 3` → `7` |
| `^` | XOR | `5 ^ 3` → `6` |
| `~` | NOT | `~5` → `-6` (siempre `-x - 1`) |
| `<<`, `>>` | desplazamiento | `1 << 3` → `8`; `16 >> 2` → `4` |

Con sets, los mismos operadores son unión, intersección y diferencia simétrica (unidad 4).

## 9. Precedencia de operadores

De **mayor** a **menor** (los de arriba se evalúan primero):

| Nivel | Operadores |
|---|---|
| 1 | `(...)`, llamadas `f()`, índices `x[i]`, atributos `x.a` |
| 2 | `**` (de derecha a izquierda) |
| 3 | `+x`, `-x`, `~x` (unarios) |
| 4 | `*`, `/`, `//`, `%`, `@` |
| 5 | `+`, `-` |
| 6 | `<<`, `>>` |
| 7 | `&` |
| 8 | `^` |
| 9 | `\|` |
| 10 | comparaciones: `<`, `>`, `<=`, `>=`, `==`, `!=`, `in`, `not in`, `is`, `is not` |
| 11 | `not` |
| 12 | `and` |
| 13 | `or` |
| 14 | `a if c else b` |
| 15 | `lambda` |
| 16 | `:=` |

```python
print(2 + 3 * 4 ** 2)     # 2 + (3 * 16)
print(10 - 4 - 3)         # de izquierda a derecha: (10 - 4) - 3
print(2 ** 2 ** 3)        # de derecha a izquierda: 2 ** 8
```

## 10. Strings

Los strings son **secuencias inmutables** de caracteres Unicode. Se escriben con `'…'`, `"…"` o, para varios renglones, `'''…'''` / `"""…"""`.

```python
s = "Python"
print(s[1:4], s[-2:], s[::-1], s[::2])   # slicing como en las listas
print(s[10:], len(s))                    # un slice fuera de rango no da error
print("ab" * 3, "th" in s)
```

| Método | Qué hace |
|---|---|
| `split()` / `split(sep)` | sin argumento, corta por **cualquier** espacio en blanco (y descarta los vacíos); con un separador, corta ahí (y deja los vacíos) |
| `sep.join(iterable)` | une **strings** con `sep` en el medio |
| `strip()`, `lstrip()`, `rstrip()` | saca espacios de los bordes |
| `replace(a, b)` | reemplaza todas las apariciones |
| `find(x)` / `index(x)` | posición de `x`; si no está, `find` da **`-1`** e `index` da **`ValueError`** |
| `upper()`, `lower()`, `title()`, `capitalize()` | mayúsculas y minúsculas |
| `startswith()`, `endswith()`, `isdigit()`, `count()` | consultas |

```python
print("a  b c".split(), "a,,b".split(","))
print("-".join(["a", "b"]), "  hi  ".strip(), "hola".find("z"))
print("hola mundo".title(), "hola mundo".capitalize())
```

::: ojo
**Trampas con strings:**

- `"-".join([1, 2, 3])` es **`TypeError`**: `join` solo une strings (`"-".join(map(str, [1, 2, 3]))`).
- `"edad: " + 30` es **`TypeError`**: no convierte el número (`"edad: " + str(30)` o un f-string).
- Dos strings literales seguidos se **pegan al compilar**: `"a" "b" * 2` es `"ab" * 2`, o sea `"abab"`.
- Un string es inmutable: `s[0] = "x"` es `TypeError`, y los métodos devuelven un string **nuevo**.
:::

```python
print("a" "b" * 2)
```

**Strings crudos** (`r"…"`): las barras invertidas no se interpretan. `"\n"` es **un** carácter (salto de renglón); `r"\n"` son **dos** (`\` y `n`). Se usan en expresiones regulares y rutas de Windows.

### f-strings y `repr`

```python
x = 3.14159
n = 5
print(f"{x:.2f}", f"{n:03d}", f"{1000000:,}")   # formato: decimales, ceros, miles
print(f"{n=}")                                  # Python 3.8: muestra el nombre y el valor
print(str("hi"), repr("hi"), f"{'hi'!r}")       # repr muestra las comillas
```

## 11. Asignación y otras expresiones

```python
a = b = []            # UNA lista, con dos nombres
a.append(1)
print(b, a is b)

x = y = 5
x += 1                # los int son inmutables: x pasa a otro objeto, y no cambia
print(x, y)

if (n := len("hola")) > 3:        # morsa: asigna y devuelve el valor (3.8)
    print("largo", n)

edad = 7
print("par" if edad % 2 == 0 else "impar")   # expresión condicional
```

`None` es el único valor de tipo `NoneType`: lo devuelven las funciones sin `return`, y vale como falso (pero `None == False` es `False`).

## Preguntas tipo examen

::: pregunta What is the output of `print(-7 // 2, -7 % 2)`?
- [ ] `-3 -1`
- [x] `-4 1`
- [ ] `-3 1`
- [ ] `-4 -1`
::: solucion Explicación
`//` redondea **hacia abajo** (hacia −∞): −3,5 → −4. El resto toma el signo del divisor y cumple `-7 == (-4) * 2 + 1`, así que es 1. En C o Java sería `-3 -1` (redondean hacia el cero).
:::
:::

::: pregunta What is the output of `print(2 ** 3 ** 2)`?
- [ ] `64`
- [x] `512`
- [ ] `36`
- [ ] `12`
::: solucion Explicación
`**` es asociativo **a la derecha**: se calcula `3 ** 2 = 9` primero, y después `2 ** 9 = 512`. Si fuera de izquierda a derecha, sería `(2 ** 3) ** 2 = 64`.
:::
:::

::: pregunta What is the output of `print(-2 ** 2)`?
- [ ] `4`
- [x] `-4`
- [ ] `0.25`
- [ ] It raises `SyntaxError`
::: solucion Explicación
`**` tiene **más precedencia** que el menos unario de su izquierda: es `-(2 ** 2) = -4`. Para elevar el −2 hacen falta paréntesis: `(-2) ** 2` da 4.
:::
:::

::: pregunta What is the output of `print(0.1 + 0.2 == 0.3)`?
- [ ] `True`
- [x] `False`
- [ ] It raises `TypeError`
- [ ] It depends on the operating system
::: solucion Explicación
0,1 y 0,2 no tienen una representación exacta en binario, y la suma da `0.30000000000000004`. Para comparar floats se usa `math.isclose`, y para decimales exactos, `decimal.Decimal`.
:::
:::

::: pregunta What is the output of `print(True + True + True)`?
- [ ] `True`
- [ ] `TrueTrueTrue`
- [x] `3`
- [ ] It raises `TypeError`
::: solucion Explicación
`bool` es una subclase de `int`: `True` vale 1 y `False` vale 0 en las operaciones aritméticas.
:::
:::

::: pregunta What is the output of `print(0 or [] or "a", 5 and 0)`?
- [ ] `True False`
- [x] `a 0`
- [ ] `True 0`
- [ ] `a False`
::: solucion Explicación
`or` devuelve el **primer operando verdadero**: `0` y `[]` son falsos, así que devuelve `"a"`. `and` devuelve el **primer operando falso** (o el último si todos son verdaderos): `5` es verdadero, así que devuelve `0`. Ninguno convierte el resultado a `bool`.
:::
:::

::: pregunta What is the output of `print(round(2.5), round(3.5))`?
- [ ] `3 4`
- [x] `2 4`
- [ ] `2 3`
- [ ] `3 3`
::: solucion Explicación
Cuando el número está justo en el medio, `round` va al **par** más cercano (*banker's rounding*): 2,5 → 2 y 3,5 → 4. Así, al redondear muchos números, los errores no se acumulan para un mismo lado.
:::
:::

::: pregunta Which of the following expressions raise a `ValueError`? (Select all that apply)
- [x] `int("3.9")`
- [x] `int("abc")`
- [ ] `int(3.9)`
- [ ] `int(" 42 ")`
- [ ] `float("1e3")`
::: solucion Explicación
`int()` con un string acepta solo un entero escrito (con espacios alrededor, que tolera): `"3.9"` y `"abc"` dan `ValueError`. `int(3.9)` recibe un `float` y lo corta a 3. `int(" 42 ")` da 42. `float("1e3")` da 1000.0.
:::
:::

::: pregunta What is the output of `print("10" < "9")`?
- [x] `True`
- [ ] `False`
- [ ] It raises `TypeError`
- [ ] It raises `ValueError`
::: solucion Explicación
Son strings, no números: se comparan **carácter por carácter**. El primer carácter de `"10"` es `"1"`, que es menor que `"9"`, y con eso ya se decide. No hay ningún error porque los dos son del mismo tipo.
:::
:::

::: pregunta What happens when this code runs?
```python
print("-".join([1, 2, 3]))
```
- [ ] It prints `1-2-3`
- [ ] It prints `[1, 2, 3]`
- [x] It raises `TypeError`
- [ ] It raises `ValueError`
::: solucion Explicación
`str.join` solo acepta un iterable de **strings**: *TypeError: sequence item 0: expected str instance, int found*. Python no convierte los números solo (tipado fuerte). La forma correcta es `"-".join(map(str, [1, 2, 3]))`.
:::
:::

::: pregunta What is the output of the following code?
```python
a = b = []
a.append(1)
print(b)
```
- [ ] `[]`
- [x] `[1]`
- [ ] `None`
- [ ] It raises `NameError`
::: solucion Explicación
`a = b = []` crea **una sola lista** y le pone los dos nombres. Modificarla a través de `a` se ve desde `b`. Para dos listas distintas: `a, b = [], []`.
:::
:::

::: pregunta What is the output of `print(1 < 3 > 2)`?
- [x] `True`
- [ ] `False`
- [ ] It raises `SyntaxError`
- [ ] It raises `TypeError`
::: solucion Explicación
Python **encadena** las comparaciones: `1 < 3 > 2` significa `(1 < 3) and (3 > 2)`, que es `True`. No compara `True > 2` (que sería `False`), que es la trampa de la pregunta.
:::
:::

::: pregunta What is the output of `print("a" "b" * 2)`?
- [ ] `abb`
- [x] `abab`
- [ ] `a bb`
- [ ] It raises `SyntaxError`
::: solucion Explicación
Dos strings literales escritos uno al lado del otro se **pegan al compilar**, antes de evaluar cualquier operador: es `"ab" * 2`, o sea `"abab"`. Si fuera `"a" + "b" * 2`, sí daría `"abb"`, porque `*` va antes que `+`.
:::
:::
