# 14 · Backups and the publish check

Two commands protect the user. `um backup` takes a snapshot of a folder (usually the game's saves) before anything touches it, and can put it back. `um publish check` inspects a mod folder before it is shared and fails if it contains game files, leaked keys or `.env` files. Both are short, and both are full of good habits for working with files safely.

::: claves
- Files are compared by **SHA-1 hash**, computed in 1 MiB chunks with `iter(callable, sentinel)`.
- A snapshot is a **zip** created in mode **`"x"`**: it fails if the file already exists, so two backups can never overwrite each other.
- `except BaseException:` deletes a half-written zip and **re-raises** the error with a bare `raise`.
- `diff` uses **set operations**: `-` for added and removed files, `&` for files in both.
- `publish check` finds copied game files by comparing **sizes first** and hashing only when sizes match.
:::

## Fingerprinting a folder

```python um/backup.py estatico
def _scan(src: Path) -> dict:
    files = {}
    for p in sorted(src.rglob("*")):
        if p.is_file():
            h = hashlib.sha1()
            with open(p, "rb") as f:
                for chunk in iter(lambda: f.read(1 << 20), b""):
                    h.update(chunk)
            files[p.relative_to(src).as_posix()] = dict(size=p.stat().st_size, sha1=h.hexdigest())
    return files
```

- **`src.rglob("*")`** walks the whole folder tree (*recursive glob*) and yields every path. `sorted` makes the order predictable.
- **The chunked hash** is the same `iter(lambda: f.read(...), b"")` idiom as in chapter 12: read 1 MiB at a time until `read` returns an empty bytes object.
- **`relative_to(src).as_posix()`** stores paths like `saves/world1.wld`, relative to the folder and always with `/`, so a snapshot made on Windows can be compared on Linux.

The result is a dict from relative path to size and hash: a **fingerprint** of the folder. Comparing two fingerprints tells you exactly what changed, without comparing file contents byte by byte.

## Creating a snapshot that can never overwrite another

```python um/backup.py estatico
    stamp = time.strftime("%Y%m%d-%H%M%S")
    root = _root(name)
    # Don't reuse gaps left by deleted or failed backups: a new snapshot must sort after the existing ones.
    sequences = (p.stem[len(stamp) + 1:] for p in root.glob(f"{stamp}_*.zip"))
    sequence = max((int(n) + 1 for n in sequences if n.isdecimal()), default=0)
    while True:
        # '_' sorts after the original .zip; padding keeps the latest snapshot last even after 10+ collisions.
        suffix = f"_{sequence:06d}" if sequence else ""
        out = root / f"{stamp}{suffix}.zip"
        try:
            # Exclusive creation also prevents concurrent backups from overwriting each other.
            # strict_timestamps=False: some folders (e.g. Chromium caches in .minecraft) hold pre-1980 mtimes
            z = zipfile.ZipFile(out, "x", zipfile.ZIP_DEFLATED, compresslevel=6, strict_timestamps=False)
            break
        except FileExistsError:
            sequence += 1
```

The comments here are the result of real bugs, and each line answers one:

- **Names that sort by time.** A snapshot is called `20261006-120000.zip`: year, month, day, hour, minute, second. Sorting the names **as text** puts them in chronological order, so "the latest snapshot" is just the last one in `sorted(...)`.
- **Two snapshots in the same second** get a suffix: `20261006-120000_000001.zip`. `{sequence:06d}` pads the number with zeros to six digits. Without padding, `_10` would sort before `_9` as text (the natural-sort problem from chapter 11), and "the latest" would be wrong.
- **`max(..., default=0)`**: `max` of an empty sequence raises `ValueError`; `default` gives a value for that case. The generator inside skips names that aren't numbers (`isdecimal()`).
- **Mode `"x"` (exclusive creation)** creates the file only if it **does not exist**, and raises `FileExistsError` otherwise ([[py:10#7|file modes]]). Checking `if not out.exists()` and then creating it would leave a tiny window in which another process could create the same file: a *race condition*. With `"x"`, the check and the creation are one atomic step.
- **`while True` ... `break`**: try a name; if it is taken, increase the number and try again.

```python exclusive.py
import os, tempfile

folder = tempfile.mkdtemp()
path = os.path.join(folder, "20261006-120000.zip")

with open(path, "x") as f:
    f.write("first snapshot")

try:
    open(path, "x")
except FileExistsError as e:
    print("FileExistsError:", os.path.basename(e.filename))

names = ["20261006-120000.zip", "20261006-120000_9.zip", "20261006-120000_10.zip"]
print(sorted(names))                                   # _10 before _9: wrong
print(sorted(["20261006-120000.zip", "20261006-120000_000009.zip", "20261006-120000_000010.zip"]))
print(max((int(n) for n in [] if n.isdecimal()), default=0))
```

## Cleaning up after a failure

```python um/backup.py estatico
    try:
        with z:
            for rel in files:
                z.write(s / rel, rel)
            z.writestr("_um_manifest.json", json.dumps(dict(source=str(src), created=stamp, note=note, files=files), indent=1))
    except BaseException:
        out.unlink(missing_ok=True)  # don't leave an incomplete archive as the latest snapshot
        raise
```

If anything goes wrong while writing (the disk is full, a file is locked, the user presses Ctrl+C), the half-written zip would remain, and it would sort **last**, so the next "restore the latest snapshot" would use a broken archive. The fix:

- **`except BaseException`** catches **everything**, including `KeyboardInterrupt` and `SystemExit`, which `except Exception` would miss ([[py:10#3|the exception hierarchy]]).
- **`out.unlink(missing_ok=True)`** deletes the broken file.
- **A bare `raise`** re-raises the **same** exception, with its original traceback ([[py:10#4|`raise`]]). The error is not swallowed: the program still stops and reports it. The `except` block only cleans up.

This "catch everything, clean up, re-raise" shape is one of the few good reasons to catch `BaseException`.

The manifest is stored **inside** the zip (`_um_manifest.json`), with the source folder and the fingerprint. A snapshot is self-describing: you don't need any other file to know what it contains.

## What changed? Set operations

```python um/backup.py estatico
def diff(name: str, target: str | None = None, snapshot: str | None = None) -> dict:
    zp = Path(snapshot) if snapshot else (snapshots(name) or [None])[-1]
    if not zp:
        die(f"no snapshots for {name}")
    m = _manifest(zp)
    t = Path(to_posix(target or m["source"]))
    now = _scan(t) if t.is_dir() else {}
    old = m["files"]
    res = dict(snapshot=str(zp), target=str(t),
               added=sorted(set(now) - set(old)), removed=sorted(set(old) - set(now)),
               changed=sorted(k for k in set(now) & set(old) if now[k]["sha1"] != old[k]["sha1"]))
    return res
```

- **`(snapshots(name) or [None])[-1]`**: take the last snapshot, or `None` if the list is empty. `[][-1]` would raise `IndexError`, so the `or [None]` gives a list with one harmless element.
- **`set(now)`** makes a set of the **keys** (the file paths).
- **`set(now) - set(old)`**: files that exist now but not in the snapshot: **added**. The reverse difference gives **removed**.
- **`set(now) & set(old)`**: files in both (the intersection). Among them, the **changed** ones are those whose hash differs ([[py:4#3|set operations]]).

```python diff.py
old = {"world1.wld": "aa11", "world2.wld": "bb22", "config.json": "cc33"}
now = {"world1.wld": "aa11", "world2.wld": "XX99", "player.plr": "dd44"}

print("added:  ", sorted(set(now) - set(old)))
print("removed:", sorted(set(old) - set(now)))
print("changed:", sorted(k for k in set(now) & set(old) if now[k] != old[k]))
print("either: ", sorted(set(now) | set(old)))
print("one only:", sorted(set(now) ^ set(old)))
```

## Restoring, and undoing the restore

```python um/backup.py estatico
def restore(name: str, to: str | None = None, snapshot: str | None = None, clean: bool = False, yes: bool = False):
    ...
    d = diff(name, str(t), str(zp))
    print(f"restore {zp.name} -> {t}: {len(d['changed'])} changed, {len(d['removed'])} missing, {len(d['added'])} new since" + ...)
    if not yes:
        die("re-run with --yes to do it")
    if t.is_dir():
        create(str(t), name + "-pre-restore", note=f"automatic, before restoring {zp.name}")
    ...
```

Two safety features in five lines:

1. **A dry run by default.** Without `--yes`, `restore` only **describes** what it would do, and stops. The agent (or the human) reads the summary first.
2. **The restore can be undone.** Before overwriting anything, it takes a snapshot of the current state, named `<name>-pre-restore`. If the restore was a mistake, that snapshot puts things back.

You will see the dry-run idea again in chapter 15, where `um kb pr` prints the git commands instead of running them unless you pass `--yes`.

## `publish check`: rules as regular expressions

```python um/publish.py estatico
SECRET_PATTERNS = [
    ("fal key", re.compile(r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:[0-9a-f]{32}\b")),
    ("FAL_KEY assignment", re.compile(r"FAL_KEY\s*[=:]\s*['\"]?[A-Za-z0-9:_\-]{20,}")),
    ("Anthropic key", re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}")),
    ...
    ("AWS key id", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("private key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
]
```

The same data-driven style as the engine tables in chapter 7: a list of `(label, compiled pattern)` pairs. **`re.compile`** turns a pattern into an object once, at import time, instead of every time it is used. `\b` marks a word boundary, `{8}` means exactly eight characters and `{20,}` twenty or more. Each service's keys have a recognisable shape, and one pattern describes each.

`kb.py` (chapter 15) imports these same lists to check field notes, so the rules exist in **one** place.

### Finding copied game files efficiently

The worst mistake a modder can make is to ship the game's own files. The check compares every file of the mod with every file of the game, but cleverly:

```python um/publish.py estatico
    if game:
        g = Path(to_posix(game))
        by_size: dict[int, list[Path]] = {}
        for p in g.rglob("*"):
            if p.is_file():
                try:
                    by_size.setdefault(p.stat().st_size, []).append(p)
                except OSError:
                    pass
        for f in files:
            sz = f.stat().st_size
            if sz < 64 or sz not in by_size:
                continue
            h = _sha1(f)
            for gp in by_size[sz]:
                if _sha1(gp) == h:
                    fails.append(f"game file copied verbatim: {f.relative_to(root).as_posix()}  (== {gp.relative_to(g).as_posix()})")
                    break
```

A game can have 50,000 files and 60 GB. Hashing all of them would take minutes. But **two identical files always have the same size**, and reading a size is almost free. So:

1. Group the game's files **by size** in a dict: size → list of paths. `setdefault(size, []).append(p)` creates the list the first time a size appears ([[py:4#4|`setdefault`]]).
2. For each mod file, look up its size. **Most sizes don't appear at all**, and the file is skipped without reading a single byte. (Lookup in a dict is O(1): [[py:12#1|complexity]].)
3. Only when sizes match, compute the hashes and compare.

Files under 64 bytes are skipped, because tiny files (an empty config, a one-line text) match by accident too often.

```python dupes.py
import hashlib

game = {"Content/a.xnb": b"original texture data" * 100, "Content/b.xnb": b"sound" * 50, "readme.txt": b"hello"}
mod = {"assets/my_sword.png": b"my own art" * 80, "assets/stolen.xnb": b"original texture data" * 100}

by_size = {}
for path, data in game.items():
    by_size.setdefault(len(data), []).append(path)

sha1 = lambda data: hashlib.sha1(data).hexdigest()
hashed = 0
for path, data in mod.items():
    if len(data) < 64 or len(data) not in by_size:
        continue
    hashed += 1
    for gp in by_size[len(data)]:
        if sha1(game[gp]) == sha1(data):
            print("game file copied verbatim:", path, "==", gp)
            break
print("files hashed:", hashed, "of", len(mod))
```

### Skipping folders with a set intersection

```python um/publish.py estatico
SKIP_DIRS = {".git", ".venv", "venv", "node_modules", "__pycache__", ".pytest_cache", "obj", ".vs", ".idea"}
...
    files = [p for p in root.rglob("*") if p.is_file() and not SKIP_DIRS.intersection(p.relative_to(root).parts)]
```

`p.relative_to(root).parts` splits a path into its folder names: `("src", "node_modules", "lib.js")`. If **any** of them is in `SKIP_DIRS`, the intersection is a non-empty set, which is truthy, and the file is skipped. One expression replaces a loop over the parts.

### An iterable chosen by a condition

```python um/publish.py estatico
            for label, rx in DECOMP_PATTERNS if f.suffix.lower() in CODE_EXT else ():
                m = rx.findall(txt)
                if m:
                    warns.append(f"{label} x{len(m)} in {rel} (e.g. {m[0].strip()!r})")
```

Look carefully at the `for` line: the conditional expression chooses **what to loop over**: the decompiler patterns for code files, or an empty tuple `()` for anything else, so the loop body simply never runs. It is equivalent to wrapping the loop in an `if`, written in one line.

### Exit codes

```python um/publish.py estatico
    print(f"{'FAIL' if fails else 'WARN' if warns else 'PASS'}: {len(files)} files, {len(fails)} failures, {len(warns)} warnings")
    return 1 if fails else 0


def main(a):
    raise SystemExit(check(a.mod, a.game))
```

`raise SystemExit(code)` ends the program with that **exit code**, like `sys.exit(code)`. Exit code 0 means success and 1 means failure, so the command can be used in automation: the project's CI (the system that runs checks on every change) runs `um publish check .` and blocks the change if it fails.

::: nota English corner
- ***Don't reuse gaps left by deleted or failed backups*:** *gaps left by...* is a participle clause: gaps **that were left** by deleted backups. See [[en:15#Participle clauses|participle clauses]].
- ***prevents concurrent backups from overwriting each other*:** *prevent* + object + *from* + *-ing*; and *each other* for a mutual action. See [[en:10#El -ing como sustantivo|-ing after prepositions]].
- ***It is a lint, not legal advice*:** *advice* is uncountable: *a piece of advice*, never *an advice*. See [[en:1#Contables e incontables|countable and uncountable nouns]].
- ***when in doubt ship a patch*:** *when in doubt* is a fixed reduced clause: "when you are in doubt", "ante la duda".
:::
