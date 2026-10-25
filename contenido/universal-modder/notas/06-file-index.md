# 6 · The file index and binary sniffing

To guess a game's engine, `um scan` looks at **file names** (Unity games ship a `UnityPlayer.dll`, Godot games a `.pck` file) and at the **first bytes** of some files (every Windows program starts with the letters `MZ`). This chapter reads the class that indexes a game folder and the functions that read binary headers.

::: claves
- `Index` walks a folder once with `os.walk` and stores **lowercase relative paths** in a list and a set.
- `dirnames[:] = [...]` changes the list **in place**, which is what tells `os.walk` to skip folders. `dirnames = [...]` would do nothing.
- `find`, `has` and `has_dir` use `fnmatch` patterns and `any()` with a generator.
- Binary headers are read with `open(path, "rb")` and decoded with `struct.unpack_from`.
- Big files are searched **in chunks**, with a small overlap so that no match is lost at a boundary.
:::

## The `Index` class

```python um/scan.py estatico
MAX_ENTRIES = 80_000
MAX_DEPTH = 6


class Index:
    """Lower-cased relative paths of a game folder (bounded walk)."""

    def __init__(self, root: Path):
        self.root = root
        self.files: list[str] = []
        self.dirs: set[str] = set()
        self.truncated = False
        base = len(str(root)) + 1
        for dirpath, dirnames, filenames in os.walk(root):
            rel = dirpath[base:].replace("\\", "/")
            depth = rel.count("/") + 1 if rel else 0
            if depth >= MAX_DEPTH:
                dirnames[:] = []
            dirnames[:] = [d for d in dirnames if d.lower() not in ("__pycache__", ".git", "shadercache")]
            for d in dirnames:
                self.dirs.add((rel + "/" + d if rel else d).lower())
            for f in filenames:
                self.files.append((rel + "/" + f if rel else f).lower())
            if len(self.files) > MAX_ENTRIES:
                self.truncated = True
                break
```

**Why a class?** The index is built once, and then dozens of checks ask questions about it ("is there a `UnityPlayer.dll`?", "is there a folder called `renpy`?"). A class keeps the data (`files`, `dirs`, `root`) together with the methods that query it ([[py:9.1#1|class, instance and `self`]]).

**Why lowercase?** Windows file names are case-insensitive: `UnityPlayer.dll` and `unityplayer.dll` are the same file. Storing everything in lowercase means every pattern can be written in lowercase too.

**Why limits?** A game folder can contain hundreds of thousands of files. `MAX_DEPTH` stops the walk six folders down, and `MAX_ENTRIES` stops it at 80,000 files (`80_000`: underscores in numbers are only for readability). If the limit is reached, `truncated` records it, and the report warns about it.

### How `os.walk` works

`os.walk(root)` is a **generator** ([[py:8#2|generators]]): it yields one tuple per folder, `(dirpath, dirnames, filenames)`, going down the tree. After yielding a folder, it continues into the folders **listed in `dirnames`**. That is the key to the next part.

### `dirnames[:] = ...` versus `dirnames = ...`

```python um/scan.py estatico
dirnames[:] = [d for d in dirnames if d.lower() not in ("__pycache__", ".git", "shadercache")]
```

`os.walk` keeps its own reference to the `dirnames` list and reads it to decide where to go next. To skip folders, you must **change that same list object**:

- `dirnames[:] = new_list` is **slice assignment**: it replaces the *contents* of the existing list. `os.walk` sees the change ([[py:4#1|slicing with assignment]]).
- `dirnames = new_list` only makes the local name `dirnames` point to a **new** list. The list that `os.walk` holds is untouched, and the walk would still enter `.git` ([[py:3#4|rebinding versus mutating]]).

This is exactly the kind of question the EPAM exam likes, and here it is in real code. Run it and compare:

```python walk_demo.py
import os, tempfile

root = tempfile.mkdtemp()
for rel in ["Game_Data/Managed/a.dll", ".git/objects/x", "mods/cool.txt", "UnityPlayer.dll"]:
    path = os.path.join(root, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w").close()

def walk(prune_in_place):
    seen = []
    for dirpath, dirnames, filenames in os.walk(root):
        keep = [d for d in sorted(dirnames) if d != ".git"]
        if prune_in_place:
            dirnames[:] = keep        # changes the list os.walk is using
        else:
            dirnames = keep           # only rebinds a local name
        seen.append(os.path.relpath(dirpath, root))
    return seen

print("dirnames[:] =", walk(True))
print("dirnames =   ", walk(False))
```

### Building relative paths

```python um/scan.py estatico
base = len(str(root)) + 1
...
rel = dirpath[base:].replace("\\", "/")
depth = rel.count("/") + 1 if rel else 0
```

`dirpath` is a full path such as `C:\Games\Foo\Data\Managed`. Slicing off the first `base` characters (the root plus one separator) leaves `Data\Managed`; `replace` turns it into `Data/Managed`, so patterns work the same on every system. The root itself gives `rel == ""`, which is falsy, so the conditional expression gives depth 0.

## Asking questions: `find`, `has`, `has_dir`

```python um/scan.py estatico
    def find(self, *patterns: str) -> list[str]:
        return [f for f in self.files if any(fnmatch.fnmatch(f, p) for p in patterns)]

    def has(self, *patterns: str) -> bool:
        return any(fnmatch.fnmatch(f, p) for p in patterns for f in self.files)

    def has_dir(self, *patterns: str) -> bool:
        return any(fnmatch.fnmatch(d, p) for p in patterns for d in self.dirs)
```

- **`*patterns`** collects any number of positional arguments into a tuple, so you can call `ix.has("*unityplayer.dll", "*unityplayer.so", "*unityplayer.dylib")` ([[py:5#2|types of parameters]]).
- **`fnmatch.fnmatch(name, pattern)`** matches shell-style patterns: `*` is any text, `?` is one character. `"*_data/managed/assembly-csharp.dll"` matches any Unity game's main code file.
- **`any(...)` with a generator expression** stops at the **first** `True`. A game with 50,000 files usually finds a match early, so `has` is often much faster than building a full list ([[py:7#6|generator expressions]]).
- **Two `for` clauses** in one generator read like nested loops, in the same order: first over patterns, then over files ([[py:7#5|comprehensions]]).

```python fnmatch_demo.py
import fnmatch

files = ["unityplayer.dll", "game_data/managed/assembly-csharp.dll", "game_data/globalgamemanagers", "readme.txt"]

def has(*patterns):
    return any(fnmatch.fnmatch(f, p) for p in patterns for f in files)

def find(*patterns):
    return [f for f in files if any(fnmatch.fnmatch(f, p) for p in patterns)]

print(has("*unityplayer.dll", "*unityplayer.so"))
print(find("*_data/*"))
print(has("*.pck"))
```

### A case-insensitive lookup with `next()`

The index stores lowercase names, but to **open** a file you need its real name. `path()` finds it, folder by folder:

```python um/scan.py estatico
    def path(self, rel_lower: str) -> Path:
        """Case-insensitive rel path -> real path."""
        cur = self.root
        for part in rel_lower.split("/"):
            try:
                cur = next(c for c in cur.iterdir() if c.name.lower() == part)
            except (StopIteration, OSError):
                return self.root / rel_lower
        return cur
```

`next(generator)` returns the **first** item the generator produces. If it produces nothing, `next` raises **`StopIteration`**, the same exception that ends every `for` loop internally ([[py:8#1|iterables and iterators]]). Here it is caught and turned into a fallback path.

(`next(gen, default)` would avoid the exception, as chapter 7 shows. Both styles appear in this file.)

## Reading binary headers

Many files announce what they are in their first bytes, a *magic number*. Windows programs (`.exe`, `.dll`) use the **PE** format (*Portable Executable*), which starts with `MZ`. `pe_info` reads a little more to answer two questions: is the program 32-bit or 64-bit, and is it a **.NET** program (C# code, which is much easier to mod)?

```python um/scan.py estatico
def pe_info(path: Path) -> dict | None:
    """Machine type and whether a PE file is a managed (.NET) assembly."""
    try:
        with open(path, "rb") as f:
            head = f.read(4096)
    except OSError:
        return None
    if head[:2] != b"MZ" or len(head) < 0x40:
        return None
    off = struct.unpack_from("<I", head, 0x3C)[0]
    if off + 0x100 > len(head) or head[off:off + 4] != b"PE\0\0":
        return None
    machine = struct.unpack_from("<H", head, off + 4)[0]
    opt = off + 24
    magic = struct.unpack_from("<H", head, opt)[0]
    dd = opt + (96 if magic == 0x10B else 112)
    clr_rva = struct.unpack_from("<I", head, dd + 14 * 8)[0] if dd + 15 * 8 <= len(head) else 0
    return dict(arch={0x14C: "x86", 0x8664: "x64", 0xAA64: "arm64"}.get(machine, hex(machine)), managed=clr_rva != 0)
```

- **`open(path, "rb")`** opens the file in **binary** mode: `read` returns `bytes`, not text ([[py:10#7|files]]). The `with` block closes the file even if something fails ([[py:10#6|context managers]]).
- **`b"MZ"`** is a bytes literal. Slicing bytes (`head[:2]`) gives bytes, so comparing with `b"MZ"` works.
- **`struct.unpack_from("<I", head, 0x3C)`** reads a number stored in binary. The format `"<I"` means *little-endian* (`<`), *unsigned 4-byte integer* (`I`); `"<H"` is a 2-byte one. It always returns a tuple, hence the `[0]`.
- **`0x3C`, `0x10B`**: numbers in **hexadecimal**, the usual way to write file offsets and magic values.
- The PE format says: at offset `0x3C` there is the position of the `PE\0\0` signature; after it comes the machine type; later, a table of *data directories*, and entry number 14 points to the .NET runtime header. If that entry is not zero, the program is .NET.
- **`{...}.get(machine, hex(machine))`**: a dict used as a lookup table, with a readable fallback (`'0x1c0'`) for unknown machines ([[py:4#4|dictionaries]]).

Every check returns `None` early if something looks wrong. A fingerprinting tool must survive damaged or unusual files without crashing.

You can build a fake PE header with `struct.pack` and read it back:

```python pe_demo.py
import struct

def fake_exe(machine, managed):
    head = bytearray(1024)
    head[:2] = b"MZ"
    struct.pack_into("<I", head, 0x3C, 0x80)          # where the PE header starts
    head[0x80:0x84] = b"PE\0\0"
    struct.pack_into("<H", head, 0x84, machine)        # machine type
    opt = 0x80 + 24
    struct.pack_into("<H", head, opt, 0x20B)           # PE32+ (64-bit) optional header
    struct.pack_into("<I", head, opt + 112 + 14 * 8, 0x2000 if managed else 0)
    return bytes(head)

def pe_info(head):
    if head[:2] != b"MZ":
        return None
    off = struct.unpack_from("<I", head, 0x3C)[0]
    if head[off:off + 4] != b"PE\0\0":
        return None
    machine = struct.unpack_from("<H", head, off + 4)[0]
    opt = off + 24
    magic = struct.unpack_from("<H", head, opt)[0]
    dd = opt + (96 if magic == 0x10B else 112)
    clr = struct.unpack_from("<I", head, dd + 14 * 8)[0]
    return dict(arch={0x14C: "x86", 0x8664: "x64"}.get(machine, hex(machine)), managed=clr != 0)

print(pe_info(fake_exe(0x8664, managed=True)))
print(pe_info(fake_exe(0x14C, managed=False)))
print(pe_info(fake_exe(0x1C0, managed=False)))
print(pe_info(b"#!/bin/sh"))
```

## Searching big files in chunks

To find an Unreal game's engine version, the scanner looks for a text like `++UE5+Release-5.3` inside the game's `.exe`, which can be hundreds of megabytes. Reading it all into memory would be slow and wasteful, so `grep_file` reads it **in pieces**:

```python um/scan.py estatico
def grep_file(path: Path, patterns: list[bytes], limit_mb: int = 400, budget_s: float = 6.0) -> dict[bytes, bytes]:
    """First match of each regex in a (big) binary, read in chunks, bounded by size and time."""
    found, t0, tail = {}, time.time(), b""
    try:
        with open(path, "rb") as f:
            read = 0
            while len(found) < len(patterns) and read < limit_mb << 20 and time.time() - t0 < budget_s:
                chunk = f.read(16 << 20)
                if not chunk:
                    break
                read += len(chunk)
                buf = tail + chunk
                for p in patterns:
                    if p not in found:
                        m = re.search(p, buf)
                        if m:
                            found[p] = m.group(0)
                tail = buf[-256:]
    except OSError:
        pass
    return found
```

- **`16 << 20`** shifts the number 16 left by 20 bits, which multiplies it by 2²⁰ = 1,048,576. So it is 16 MiB. `limit_mb << 20` converts megabytes to bytes the same way ([[py:2#8|bitwise operators]]).
- **Three stop conditions** in the `while`: every pattern found, too many bytes read, or the time budget (6 seconds) used up. The scan must stay fast even on a huge game.
- **`tail = buf[-256:]`**: the last 256 bytes of each chunk are kept and glued to the front of the next one. Without this, a version string that starts at the end of one chunk and finishes in the next would never match.
- **`except OSError: pass`**: if the file can't be read, the function just returns what it found (maybe nothing). Silently ignoring errors is usually bad, but here "no information" is a valid answer.

::: ojo
**Regular expressions on bytes.** The patterns are bytes literals (`rb"\+\+UE[45]\+Release-\d\.\d+"`). A `bytes` pattern only works on `bytes` data, and a `str` pattern only on `str`. Mixing them raises `TypeError`, one more example of Python's **strong typing**: it won't convert between text and bytes for you ([[py:1#6|dynamic and strong typing]]).
:::

## Reading from the end: Godot

```python um/scan.py estatico
def godot_pck(path: Path) -> str | None:
    try:
        with open(path, "rb") as f:
            head = f.read(20)
            if head[:4] == b"GDPC":
                fmt, major, minor, patch = struct.unpack_from("<4I", head, 4)
                return f"{major}.{minor}.{patch} (pack format {fmt})"
            f.seek(-12, os.SEEK_END)
            tail = f.read(12)
            if tail[8:] == b"GDPC":   # pck appended to the executable
                size = struct.unpack_from("<Q", tail, 0)[0]
                ...
    except (OSError, struct.error):
        pass
    return None
```

Godot games store their data in a `.pck` file that starts with `GDPC`. Sometimes the `.pck` is **glued to the end** of the `.exe` instead. `f.seek(-12, os.SEEK_END)` moves to 12 bytes before the end of the file, where Godot writes the size of the attached pack and the signature again.

`"<4I"` reads **four** unsigned integers at once, unpacked straight into `fmt, major, minor, patch`. `"<Q"` is an unsigned 8-byte integer, big enough for any file size.

::: nota English corner
- ***bounded walk*, *bounded by size and time*:** *bounded* = with limits. The docstrings use past participles as adjectives: *lower-cased paths*, *appended to the executable*. See [[en:15#Participle clauses|participle clauses]].
- ***Case-insensitive*:** a compound adjective with a hyphen, like *read-only*, *well-known*, *user-friendly*. See [[en:11.2#Adjetivos compuestos|compound adjectives]].
- ***would never match*:** the second conditional for an imagined situation: *"Without this, a version string... **would** never **match**"* = if we didn't keep the tail. See [[en:7#Los cuatro condicionales|conditionals]].
- ***First match of each regex*:** *each* goes with a **singular** noun (*each regex*, *each folder*), and so does *every*. See [[en:11.1#Cuantificadores|quantifiers]].
:::
