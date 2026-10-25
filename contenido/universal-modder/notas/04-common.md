# 4 · common.py: small helpers everyone shares

`common.py` is about 100 lines of small functions that the other modules import. None of them is clever, and that is the point: they hide annoying details (Windows paths, missing programs, error messages) so that the rest of the code stays readable. It is also a good file for revising basic Python: strings, `or`, exceptions, default arguments and type hints.

::: claves
- **Platform checks** with `os.name`, `sys.platform` and short-circuit `or`.
- **Path conversion** between Windows (`C:\Games`) and WSL (`/mnt/c/Games`) with string indexing and slicing.
- **`run()`** wraps `subprocess.run` and turns failures into one clear message.
- **`die()`** prints an error and calls `sys.exit()`, which **raises `SystemExit`**.
- **`need()`** imports an optional package by name and explains how to install it if it is missing.
:::

## Which system am I on?

```python um/common.py estatico
def is_windows() -> bool:
    return os.name == "nt"


def is_mac() -> bool:
    return sys.platform == "darwin"


def is_wsl() -> bool:
    if sys.platform != "linux":
        return False
    return "microsoft" in platform.release().lower() or os.path.exists("/proc/sys/fs/binfmt_misc/WSLInterop")
```

**WSL** (*Windows Subsystem for Linux*) runs Linux inside Windows. Many coding agents live there, but the games are Windows programs, so the toolkit often needs to know which side it is on.

- `is_wsl` returns early if the system isn't Linux at all.
- Then it tries two tests joined by **`or`**. Because `or` **short-circuits**, the second test (checking that a file exists) only runs if the first is false ([[py:2#7|`and`, `or`, `not`]]).
- `-> bool` is a **return type annotation**: documentation for humans and tools. Python doesn't check it when the program runs ([[py:12#5|type hints]]).

## Finding PowerShell

```python um/common.py estatico
def ps_exe() -> str:
    """Windows PowerShell. Falls back to its full path: an agent's PATH often lacks System32\\WindowsPowerShell\\v1.0."""
    name = "powershell.exe" if is_wsl() else "powershell"
    found = shutil.which(name)
    if found:
        return found
    if is_wsl():
        full = "/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe"
    else:
        full = os.path.join(os.environ.get("SystemRoot") or r"C:\Windows", "System32", "WindowsPowerShell", "v1.0", "powershell.exe")
    return full if os.path.exists(full) else name
```

Four small things to notice:

- **Conditional expressions:** `A if condition else B` chooses a value in one line ([[py:2#11|assignment and other expressions]]).
- **`shutil.which(name)`** searches the `PATH` for a program, like the `which` command. It returns the full path, or `None`.
- **`os.environ.get("SystemRoot") or r"C:\Windows"`** reads an environment variable with a fallback. `get` returns `None` if the variable doesn't exist, and also an empty string `""` is falsy, so `or` covers both cases.
- **`r"C:\Windows"`** is a *raw string*: backslashes are kept as they are. Without the `r`, `"\W"` would be read as an escape sequence ([[py:2#10|strings]]).

The docstring explains *why* the function exists: the agent's `PATH` often doesn't include PowerShell's folder. Good docstrings explain the reason, not just the action.

## Converting paths: string slicing in practice

Windows writes `C:\Games\Foo`; WSL sees the same folder as `/mnt/c/Games/Foo`. `to_win` converts in one direction:

```python um/common.py estatico
def to_win(path: str | Path) -> str:
    """/mnt/c/Games/x -> C:\\Games\\x (WSL); paths that are already Windows paths pass through."""
    p = str(path)
    if len(p) > 1 and p[1] == ":":
        return p
    if p.startswith("/mnt/") and len(p) > 6 and p[6] in "/" and p[5].isalpha():
        return p[5].upper() + ":\\" + p[7:].replace("/", "\\")
    if p.startswith("/mnt/") and len(p) == 6:
        return p[5].upper() + ":\\"
    if is_wsl() and shutil.which("wslpath"):
        return subprocess.run(["wslpath", "-w", p], capture_output=True, text=True).stdout.strip()
    return p
```

Take `"/mnt/c/Games/x"`. Index 5 is `"c"`, index 6 is `"/"`, and `p[7:]` is `"Games/x"`. So the result is `"C" + ":\\" + "Games\\x"`.

- **`len(p) > 6 and p[6] ...`**: the length check comes first. If the string is too short, `and` stops before `p[6]` is evaluated, so there is no `IndexError`. Short-circuiting is used here as a **guard**.
- **`str | Path`** in the annotation means "a string or a `Path`". The first line, `p = str(path)`, accepts both.
- The last option asks the real `wslpath` tool, for unusual cases. Simple cases are handled in Python, which is much faster than starting a program.

Try a simplified copy (without the `wslpath` part):

```python to_win.py
def to_win(p):
    if len(p) > 1 and p[1] == ":":
        return p
    if p.startswith("/mnt/") and len(p) > 6 and p[6] == "/" and p[5].isalpha():
        return p[5].upper() + ":\\" + p[7:].replace("/", "\\")
    if p.startswith("/mnt/") and len(p) == 6:
        return p[5].upper() + ":\\"
    return p

for p in ["/mnt/c/Games/Foo", "/mnt/d", "C:\\Already\\Windows", "/home/ana/file.txt", "/mnt/"]:
    print(f"{p!r:24} -> {to_win(p)!r}")
```

::: ojo
In the output, `'C:\\Games\\Foo'` shows **two** backslashes, but the string has only one between each folder. `!r` prints the `repr()` of the string, which escapes backslashes ([[py:2#f-strings y repr|f-strings and `repr`]]). Print the value without `!r` and you see single backslashes.
:::

## A folder for the program's own data

```python um/common.py estatico
def data_dir() -> Path:
    """Per-user state: backups, downloaded tools. Override with UM_HOME."""
    d = Path(os.environ.get("UM_HOME", Path.home() / ".universal-modder"))
    d.mkdir(parents=True, exist_ok=True)
    return d
```

- **`Path.home() / ".universal-modder"`**: the `/` operator joins paths. `Path` objects define the operator method `__truediv__`, so `/` means "join" instead of "divide". This is **operator overloading** ([[py:9.1#Operadores|operator methods]]).
- **`get(key, default)`** returns the default if the variable is missing. Note that the default `Path.home() / ...` is computed **every time**, even when `UM_HOME` exists: arguments are evaluated before the call. Here that is harmless.
- **`mkdir(parents=True, exist_ok=True)`** creates the folder and any missing parents, and does nothing if it already exists.

## Running other programs: `run()`

The toolkit constantly runs other programs: PowerShell, ffmpeg, git, Blender. `run` wraps the standard `subprocess.run`:

```python um/common.py estatico
def run(cmd: list[str], check: bool = True, capture: bool = True, timeout: float | None = None, **kw) -> subprocess.CompletedProcess:
    try:
        return subprocess.run(cmd, check=check, capture_output=capture, text=True, timeout=timeout, **kw)
    except FileNotFoundError:
        die(f"not found: {cmd[0]}")
    except subprocess.CalledProcessError as e:
        die(f"{' '.join(map(str, cmd[:3]))}... failed ({e.returncode}):\n{(e.stderr or e.stdout or '').strip()[-2000:]}")
```

- **The command is a list** (`["ffmpeg", "-i", "clip.mp4"]`), not one string. Each argument is separate, so spaces in file names are not a problem.
- **`check=True`** makes `subprocess.run` raise `CalledProcessError` if the program fails (a return code other than 0). **`text=True`** returns strings instead of bytes.
- **`**kw`** collects any extra keyword arguments, and `**kw` in the call passes them on. The caller can add, say, `cwd="/mnt/c"` without `run` knowing about it ([[py:5#2|parameters]], [[py:5#3|unpacking with `**`]]).
- **Two `except` clauses** handle two different failures: the program doesn't exist, or it ran and failed ([[py:10#1|`try` / `except`]]).
- **`[-2000:]`** keeps only the last 2,000 characters of the error output: error messages from tools like ffmpeg can be huge, and the useful part is at the end.

## Stopping with a clear message: `die()`

```python um/common.py estatico
def die(msg: str, code: int = 1):
    print(f"um: {msg}", file=sys.stderr)
    sys.exit(code)
```

Almost every error in the toolkit ends here. Two details matter:

- **`file=sys.stderr`** prints to the *error stream*, not to normal output. An agent that reads the JSON output of `um scan --json` won't get error text mixed into it.
- **`sys.exit()` doesn't just stop the program: it raises an exception, `SystemExit`.** `SystemExit` inherits from `BaseException`, **not** from `Exception`, so a normal `except Exception:` does not catch it ([[py:10#3|the exception hierarchy]]).

That second detail has a surprising use: in chapter 10, the function `upload` **catches `SystemExit` on purpose**, to try a fallback when an upload fails. And in chapter 16, the tests check errors with `pytest.raises(SystemExit)`.

```python die_demo.py
import sys

def die(msg, code=1):
    print(f"um: {msg}", file=sys.stderr)
    sys.exit(code)

try:
    die("no such game")
except Exception:
    print("caught as Exception")          # not printed
except SystemExit as e:
    print("caught SystemExit, code =", e.code)

print(issubclass(SystemExit, Exception), issubclass(SystemExit, BaseException))
```

## Optional packages: `need()`

```python um/common.py estatico
def need(module: str, pip_name: str | None = None):
    try:
        return __import__(module)
    except ImportError:
        die(f"this command needs {pip_name or module}: `pip install {pip_name or module}` (or run through bin/um, which uses uv)")
```

`__import__("numpy")` is the built-in function behind the `import` statement: it imports a module from a string and returns it. `sprite.py` writes `np = need("numpy")` **inside** the functions that use NumPy.

The result: `um scan` or `um kb` work even if NumPy or Pillow are not installed, and a command that needs them fails with a message that says exactly what to do. The import happens **when it is needed**, not when the program starts.

## Two more helpers

```python um/common.py estatico
def emit(obj, as_json: bool = False):
    if as_json or not isinstance(obj, str):
        print(json.dumps(obj, indent=2, default=str))
    else:
        print(obj)


def parse_size(s: str) -> tuple[int, int]:
    """'64x26' -> (64, 26); '128' -> (128, 128)."""
    if "x" in s.lower():
        w, h = s.lower().split("x", 1)
        return int(w), int(h)
    return int(s), int(s)
```

- **`json.dumps(..., default=str)`**: JSON only knows strings, numbers, lists, dicts, booleans and `null`. For any other object (a `Path`, a date), `json.dumps` calls the `default` function; `str` converts it to text.
- **`split("x", 1)`** splits only at the first `x`, and the result is unpacked into `w, h`. `return int(w), int(h)` returns a **tuple** ([[py:5#1|returning several values]]).

```python parse_size.py
def parse_size(s):
    if "x" in s.lower():
        w, h = s.lower().split("x", 1)
        return int(w), int(h)
    return int(s), int(s)

print(parse_size("64x26"), parse_size("128"), parse_size("1920X1080"))
try:
    parse_size("64x26x3")
except ValueError as e:
    print("ValueError:", e)
```

## `from __future__ import annotations`

Every module starts with this line. It changes how **annotations** are stored: instead of being evaluated when a function is defined, they are kept as strings and never evaluated unless a tool asks for them. That makes annotations cheaper, and lets the code use newer syntax inside them, such as `str | None`, without it ever running.

Since annotations are not checked at run time anyway ([[py:5#9|docstrings and annotations]]), nothing else changes.

::: nota English corner
- ***Falls back to*:** *"Falls back to its full path"* = uses it as a second option when the first fails. *fall back on/to* is a very common phrasal verb in technical English; a *fallback* is the noun. See [[en:13#Phrasal verbs|phrasal verbs]].
- ***often lacks*:** *lack* is a verb ("no tener, carecer de"): *"an agent's PATH often lacks System32"*. The adverb *often* goes before the main verb: [[en:1#El orden: sujeto + verbo + objeto|word order]].
- ***which uses uv*:** *"run through bin/um, **which** uses uv"*: with a comma, the relative clause adds extra information, and *that* is not allowed. See [[en:11.1#Pronombres relativos|relative pronouns]].
- ***Override with UM_HOME*:** an imperative in a docstring: "you can change it with the variable UM_HOME".
:::
