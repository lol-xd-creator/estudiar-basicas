# 7 · Detecting the engine and writing the report

With an index of the folder (chapter 6), `um scan` can finally answer its main question: **which engine is this?** The answer decides everything else: which modding tools exist, which playbook the agent should read, and which route is safest. This chapter reads how that knowledge is stored, how `detect()` collects evidence, and how the final report is built.

::: claves
- Knowledge lives in **tables** (lists of tuples and dicts), not in `if` chains. Adding an engine means adding a row.
- `detect()` defines a small **inner function** `add(...)` that appends to a list of the outer function: a closure that **mutates** and therefore needs no `nonlocal`.
- **`for ... else`** runs the `else` only if the loop did **not** `break`.
- Results are sorted by score with `sort(key=...)`. The sort is **stable**, so ties keep their original order.
- `next(generator, None)` finds the first match or returns a default.
:::

## Knowledge as data

The top of the detection code is not code at all. It is data:

```python um/scan.py estatico
ANTI_CHEAT = [
    ("EasyAntiCheat", ("easyanticheat/*", "*easyanticheat*", "start_protected_game.exe", "eac_launcher.exe")),
    ("BattlEye", ("battleye/*", "*beservice*", "*_be.exe")),
    ...
]

LOADERS = [
    ("BepInEx", ("bepinex/core/*", "doorstop_config.ini", ".doorstop_version")),
    ("MelonLoader", ("melonloader/*",)),
    ...
]

ENGINES = {
    # key: (label, playbook, route)
    "unity-mono": ("Unity (Mono)", "unity.md", "BepInEx 5 (or MelonLoader) plugin in C# with HarmonyX patches; ..."),
    "unreal": ("Unreal Engine", "unreal.md", "UE4SS (Lua/C++ hooks, live property viewer) and/or pak mods in ..."),
    "godot": ("Godot", "godot.md", "recover the project with GDRE Tools; ..."),
    ...
    "native": ("Unknown native engine", "native.md", "proxy-DLL loader + function hooks (MinHook/SafetyHook), ..."),
}
```

- **`ANTI_CHEAT` and `LOADERS`** are lists of `(name, patterns)` pairs. A **list** keeps the order (the report shows them in that order), and **tuples** are fine for fixed, read-only records ([[py:4#2|tuples]]).
- **`("melonloader/*",)`** has a trailing comma. Without it, `("melonloader/*")` would be just a string in parentheses, and the code would loop over its *characters* ([[py:4#2|the one-element tuple]]). A classic exam trap, here doing real work.
- **`ENGINES`** is a dict from a short key (`"unity-mono"`) to a 3-tuple. Other parts of the toolkit use these keys too: the knowledge base checks that a field note's `engine:` is one of them (chapter 15).

This style is called **data-driven**. The logic that uses the tables is short and generic; the long, specific part is a table that anyone can extend without touching the logic.

### Whole names only

Some games must never be modded because they are online and competitive. The list `ONLINE_ONLY` names them, and a comment explains a bug that was fixed:

```python um/scan.py estatico
# Live-service games, matched against the whole name (see online_only): a substring test flagged Rusty Lake ("rust"),
# Battlefield 1942 and the 2009 Modern Warfare 2. ...
ONLINE_ONLY = ["valorant", "league of legends", "fortnite", ..., "rust", ...]


def _plain(name: str) -> str:
    """'Tom Clancy's Rainbow Six® Siege' -> 'tom clancy s rainbow six siege'."""
    return " ".join(re.sub(r"[^a-z0-9]+", " ", name.lower().replace("®", "").replace("™", "")).split())


def online_only(name: str) -> str | None:
    """The ONLINE_ONLY entry this game's name is, if any. Whole names only, never substrings."""
    n = _plain(name)
    return n if n in ONLINE_ONLY else None
```

The first version probably used `"rust" in name`, which is true for *Rusty Lake*, a harmless puzzle game. Now `_plain` normalises the name and `n in ONLINE_ONLY` compares **whole names**. `" ".join(text.split())` is a common idiom: `split()` without arguments splits on any run of spaces, and `join` puts single spaces back, so `"a   b "` becomes `"a b"`.

::: tip
`ONLINE_ONLY` is a list, so `n in ONLINE_ONLY` checks items one by one. With ~30 names that is instant. With thousands, a `set` would be the right choice ([[py:12#1|complexity]]).
:::

## `detect()`: collecting evidence

```python um/scan.py estatico
def detect(ix: Index) -> tuple[list[tuple[str, int, list[str], dict]], dict]:
    """-> [(engine_key, score, evidence, details)], extra facts"""
    hits: list[tuple[str, int, list[str], dict]] = []
    facts: dict = {}

    def add(key, score, ev, **det):
        hits.append((key, score, ev, det))

    # Unity
    ...
    # Unreal
    ...
    if not hits:
        add("native", 10, ["no known engine signature"])
    hits.sort(key=lambda h: -h[1])
    return hits, facts
```

Every engine check that finds something calls `add` with:

- the engine key;
- a **confidence score** from 0 to 100 (100 = certain, 70 = probable);
- a list of **evidence** (the files that prove it);
- any extra **details** as keyword arguments (`version=...`, `data_dir=...`).

### A closure that mutates

`add` is defined **inside** `detect`, and it uses `hits`, which belongs to `detect`. When Python looks up `hits` inside `add`, it follows the LEGB rule: not Local, so **E**nclosing, where it finds `detect`'s list ([[py:6#2|the LEGB rule]], [[py:6#7|closures]]).

Notice that `add` doesn't need `nonlocal hits`. It never **assigns** to `hits`; it calls `hits.append(...)`, which changes the list object. `nonlocal` is only needed to **rebind** a name of the enclosing function ([[py:6#4|`global` and `nonlocal`]]). If `add` did `hits = hits + [...]`, Python would treat `hits` as local and raise `UnboundLocalError` ([[py:6#3|assignment makes a name local]]).

**`**det`** collects any keyword arguments into a dict, so each engine can attach different details without changing `add`'s signature ([[py:5#2|`**kwargs`]]).

### Unity: comprehensions doing real work

```python um/scan.py estatico
    data_dirs = [d for d in {"/".join(f.split("/")[:-1]) for f in ix.find("*_data/globalgamemanagers", "*_data/data.unity3d", "*_data/maindata")}]
    if ix.has("*unityplayer.dll", "*unityplayer.so", "*unityplayer.dylib") or data_dirs:
        dd = data_dirs[0] if data_dirs else ""
        il2cpp = ix.has("*gameassembly.dll", "*gameassembly.so", "*gameassembly.dylib", "*il2cpp_data/metadata/global-metadata.dat")
        det = dict(data_dir=dd, version=unity_version(ix, dd) if dd else None)
        ...
        if il2cpp:
            add("unity-il2cpp", 100, ["UnityPlayer + GameAssembly / global-metadata.dat"], **det)
        else:
            add("unity-mono", 100, [...], **det)
```

- **`"/".join(f.split("/")[:-1])`** removes the last part of a path: `"game_data/maindata"` → `"game_data"`. It is the folder that contains the file.
- **The inner braces build a set** (`{... for f in ...}`): several files can live in the same folder, and the set keeps each folder once. The outer list comprehension turns it back into a list. (`list({...})` would do the same.)
- **`**det`** in the call does the opposite of `**det` in the definition: it **unpacks** a dict into keyword arguments ([[py:5#3|unpacking with `*` and `**`]]).

Unity games come in two flavours: **Mono** (the game's C# code ships as `.dll` files, easy to read and patch) and **IL2CPP** (the C# was compiled to native code, much harder). The presence of `GameAssembly.dll` decides which.

### A `lambda` with a name

```python um/scan.py estatico
            u16 = lambda t: re.escape(t.encode("utf-16-le"))  # FEngineVersion's branch name is a UTF-16 string on Windows
```

Unreal stores its version text in **UTF-16**, two bytes per character (`"U"` is `b"U\x00"`). `u16` turns a text into the bytes pattern that matches it. Assigning a `lambda` to a name works, but PEP 8 recommends a `def` instead, because the function then has a real name in error messages ([[py:5#6|`lambda`]], [[py:1#4|PEP 8]]). Real code doesn't always follow the style guide!

### `for ... else`: Godot

```python um/scan.py estatico
    pcks = ix.find("*.pck")
    for p in pcks[:3]:
        v = godot_pck(ix.path(p))
        if v:
            add("godot", 100, [p], version=v)
            break
    else:
        for exe in ix.find("*.exe", "*.x86_64")[:6]:
            v = godot_pck(ix.path(exe))
            if v:
                add("godot", 100, [f"{exe} (embedded pck)"], version=v)
                break
```

The `else` belongs to the **`for`**, not to the `if`. It runs when the loop **finishes without `break`**: here, when none of the first three `.pck` files was a Godot pack. Only then does the code try the executables, in case the pack is embedded in the `.exe` (chapter 6). If there are no `.pck` files at all, the loop runs zero times, doesn't break, and the `else` runs too ([[py:7#2|loops with `else`]]).

```python for_else.py
def find_pack(files):
    for f in files:
        if f.endswith(".pck"):
            print("  pack found:", f)
            break
    else:
        print("  no pack: try the executables")

for case in (["game.exe", "data.pck"], ["game.exe", "readme.txt"], []):
    print(case)
    find_pack(case)
```

### `setdefault`: a dict of dicts

```python um/scan.py estatico
    for e in exes:
        info = pe_info(ix.path(e))
        if info:
            facts.setdefault("executables", {})[e] = info
```

`d.setdefault(key, default)` returns `d[key]` if it exists; otherwise it stores `default` there first and returns it. So the first executable creates `facts["executables"] = {}`, and every one adds an entry to that same inner dict ([[py:4#4|dictionaries]]). `collections.defaultdict(dict)` is another way to do it ([[py:4#5|`collections`]]).

### Sorting by score

```python um/scan.py estatico
    if not hits:
        add("native", 10, ["no known engine signature"])
    hits.sort(key=lambda h: -h[1])
```

- **`not hits`**: an empty list is falsy ([[py:2#5|truth values]]). If no engine matched, the fallback "unknown native engine" is added with a low score.
- **`key=lambda h: -h[1]`** sorts by score, highest first. Using the negative number is a trick equivalent to `key=lambda h: h[1], reverse=True`.
- Python's sort (Timsort) is **stable**: entries with the same score keep the order in which they were added ([[py:12#2|sorting]]). So when two engines tie at 100, the one checked first in the code wins. The order of the checks is, quietly, part of the logic.

## `scan()`: building the report

```python um/scan.py estatico
def scan(query: str) -> dict:
    game = resolve_game(query)
    root = Path(game["path"])
    ix = Index(root)
    hits, facts = detect(ix)
    key, score, ev, det = hits[0]
    label, playbook, route = ENGINES[key]
    anti = [n for n, pats in ANTI_CHEAT if ix.has(*pats) or ix.has_dir(*[p.rstrip("/*") for p in pats if p.endswith("/*")])]
    loaders = [n for n, pats in LOADERS if ix.has(*pats) or ix.has_dir(*[p.rstrip("/*") for p in pats if p.endswith("/*")])]
    moddirs = [d for d in MOD_DIRS if d in ix.dirs]
    name = (game.get("name") or root.name)
    lname = name.lower()
    known = next((v for k, v in sorted(KNOWN.items(), key=lambda kv: -len(kv[0])) if k == lname or (k in lname and len(k) > 5)), None)
    ...
```

- **Tuple unpacking** everywhere: `hits, facts = detect(ix)`, `key, score, ev, det = hits[0]`, `label, playbook, route = ENGINES[key]` ([[py:4#6|unpacking]]).
- **`for n, pats in ANTI_CHEAT`** unpacks each `(name, patterns)` pair inside the comprehension.
- **`ix.has(*pats)`**: `pats` is a tuple, and `*` spreads it into separate arguments, matching the `*patterns` parameter from chapter 6.
- **`p.rstrip("/*")`** removes any `/` and `*` characters from the right end: `"battleye/*"` becomes `"battleye"`, a folder name for `has_dir`. Careful: `rstrip` takes a **set of characters**, not a suffix.
- **`d in ix.dirs`**: `dirs` is a set, so each check is O(1).

### The longest key wins

```python um/scan.py estatico
known = next((v for k, v in sorted(KNOWN.items(), key=lambda kv: -len(kv[0])) if k == lname or (k in lname and len(k) > 5)), None)
```

`KNOWN` maps game names to better routes than the engine default (for Terraria, use tModLoader). The problem: `"grand theft auto v"` is also inside `"grand theft auto v enhanced"`. By sorting the keys **longest first**, the most specific name is tried first. `next(gen, None)` returns the first match, or `None` if there is none, with no exception. A test in the project, `test_known_game_longest_key_wins`, protects exactly this.

### The report is a plain dict

```python um/scan.py estatico
    report = dict(
        name=name, store=game.get("store"), appid=game.get("appid"), path=str(root),
        engine=dict(key=key, label=label, confidence=score, evidence=ev, **{k: v for k, v in det.items() if v not in (None, "")}),
        other_engine_signals=[dict(key=h[0], evidence=h[2]) for h in hits[1:4]],
        anti_cheat=anti, mod_loaders_installed=loaders, mod_folders=moddirs,
        ...
    )
    return report
```

The result is just nested dicts and lists, the shapes JSON understands. That is a deliberate choice: `um scan --json` prints it with `json.dumps(r, indent=2)` for agents, and `format_report(r)` prints it as text for humans. **One data structure, two views.**

`**{k: v for k, v in det.items() if v not in (None, "")}` filters out empty details with a dict comprehension and unpacks the rest into `engine`. `hits[1:4]` lists up to three runner-up engines; slicing never fails, even if the list is shorter.

## The text view

```python um/scan.py estatico
def format_report(r: dict) -> str:
    e = r["engine"]
    lines = [f"{r['name']}" + (f"  ({r['store']} {r['appid']})" if r.get("store") else ""),
             f"  path:      {r['path']}",
             f"  engine:    {e['label']}  [{e['confidence']}%]  evidence: {', '.join(map(str, e['evidence']))}"]
    ...
    lines.append("  routes:")
    for i, rt in enumerate(r["routes"], 1):
        lines.append(f"    {i}. {rt['route']}  ({rt['why']}; read references/engines/{rt['playbook']})")
    for w in r["warnings"]:
        lines.append(f"  WARNING:   {w}")
    return "\n".join(lines)
```

- **f-strings with dict lookups** use the other kind of quote inside: `f"{r['name']}"`.
- **`enumerate(r["routes"], 1)`** numbers the routes starting at 1 instead of 0 ([[py:7#2|loops]]).
- **Build a list, join at the end.** Appending lines to a list and calling `"\n".join(lines)` once is the idiomatic (and efficient) way to build a long text, better than `+=` on a string in a loop.

And the `--list` view uses **format specifications** to align columns:

```python um/scan.py estatico
print(f"{g['store']:6} {str(g.get('appid') or ''):>10}  {g['name']}  ->  {g['path']}")
```

`:6` pads to 6 characters (text is left-aligned by default), and `:>10` right-aligns in 10 characters. The output looks like a table.

```python format_demo.py
games = [("steam", "105600", "Terraria"), ("epic", "Fortnite", "Fortnite"), ("xbox", None, "Halo")]
for store, appid, name in games:
    print(f"{store:6} {str(appid or ''):>10}  {name}")
```

::: nota English corner
- ***Older entries in a series with an online-only sibling are left to the anti-cheat scan*:** a long passive sentence: *are left to* = "se dejan en manos de". See [[en:8#Activa contra pasiva|active and passive]].
- ***a substring test flagged Rusty Lake*:** *flag* as a verb = "marcar, señalar como problema". Past simple, because it is a finished event in the past: [[en:4#Past simple|past simple]].
- ***better routes than the engine default*:** comparative + *than*. See [[en:11.1#Comparativos y superlativos|comparatives]].
- ***never mod online*:** *never* goes before the verb in an imperative.
:::
