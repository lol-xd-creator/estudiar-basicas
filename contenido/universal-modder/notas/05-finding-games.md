# 5 · Finding installed games

`um scan --list` prints every game installed on the machine from three stores: Steam, Epic and Xbox. Each store keeps its list in a different place and format. This chapter reads the Steam part closely, because it contains a tiny **parser** written with a stack, and then looks at how the code finds a game from a fuzzy name like `terraria`.

::: claves
- Steam's files use a format called **KeyValues** (VDF). `_vdf` parses it in 17 lines with a **regular expression** and a **stack**.
- `win_folders` **caches** its result in an attribute of the function itself.
- A **set** removes duplicate folders while a **list** keeps the order.
- `resolve_game` normalises names with `re.sub` and falls back from exact to partial matches with `or`.
:::

## Steam's KeyValues format

Steam remembers where its game libraries are in a file called `libraryfolders.vdf`, and describes each installed game in an `appmanifest_<id>.acf` file. Both look like this:

```text appmanifest_105600.acf
"AppState"
{
	"appid"		"105600"
	"name"		"Terraria"
	"installdir"		"Terraria"
}
```

It is a tree: a quoted key, then either a quoted value or a block in braces `{ }` that contains more keys. Python's standard library has no parser for it, so the code includes its own.

## A parser with a stack

```python um/scan.py estatico
def _vdf(text: str) -> dict:
    """Minimal Valve KeyValues parser (libraryfolders.vdf, appmanifest_*.acf)."""
    tokens = re.findall(r'"((?:[^"\\]|\\.)*)"|([{}])', text)
    stack, cur, key = [], {}, None
    for s, brace in tokens:
        if brace == "{":
            new = {}
            cur[key] = new
            stack.append(cur)
            cur, key = new, None
        elif brace == "}":
            cur = stack.pop() if stack else cur
        elif key is None:
            key = s
        else:
            cur[key] = s.replace("\\\\", "\\")
            key = None
    return cur
```

**The regular expression** finds two kinds of *token* (meaningful pieces):

- `"((?:[^"\\]|\\.)*)"` is a quoted string. Inside the quotes it accepts any character except a quote or backslash, **or** a backslash followed by anything (an escaped character such as `\"`). The outer parentheses capture the text without the quotes.
- `([{}])` is a single brace.

The `|` joins the two alternatives. Because the pattern has **two groups**, `re.findall` returns a list of **2-tuples**: `(text, "")` for a string and `("", "{")` for a brace. The `for s, brace in tokens` loop unpacks each tuple.

**The loop** keeps three variables:

| Variable | Meaning |
|---|---|
| `cur` | the dictionary we are filling now |
| `key` | a key waiting for its value, or `None` |
| `stack` | the dictionaries we came from, to go back when a block ends |

- On `{`, a new dict is created and stored under the waiting key. The current dict is pushed on the stack, and the new one becomes current.
- On `}`, the previous dict is popped back. (`if stack else cur` protects against a malformed file with too many `}`.)
- On a string: if no key is waiting, this string **is** the key; otherwise it is the **value**.

A Python list works as a stack with `append` (push) and `pop` (take the last one) ([[py:4#1|lists]]). Both are fast, O(1), because they work at the end of the list ([[py:12#1|complexity]]).

::: idea
**Why does this work, if `cur` changes all the time?** Look at `cur[key] = new` and then `cur = new`. The new dictionary has **two names** for a moment: it is stored *inside* the parent, and `cur` also points to it. When the loop fills `cur`, it is filling the same object the parent holds. Names are labels on objects, not boxes ([[py:3#1|variables are names]], [[py:3#4|aliasing]]).
:::

Here is the real function, unchanged, with a small file:

```python vdf.py
import re

def _vdf(text):
    tokens = re.findall(r'"((?:[^"\\]|\\.)*)"|([{}])', text)
    stack, cur, key = [], {}, None
    for s, brace in tokens:
        if brace == "{":
            new = {}
            cur[key] = new
            stack.append(cur)
            cur, key = new, None
        elif brace == "}":
            cur = stack.pop() if stack else cur
        elif key is None:
            key = s
        else:
            cur[key] = s.replace("\\\\", "\\")
            key = None
    return cur

text = '''
"libraryfolders"
{
    "0" { "path" "C:\\\\Program Files (x86)\\\\Steam"  "label" "" }
    "1" { "path" "D:\\\\SteamLibrary" }
}
'''
data = _vdf(text)
print(data)
for v in data["libraryfolders"].values():
    print(v["path"])
```

## Asking Windows where the user's folders are

Saves often live in *Documents*, but on many PCs *Documents* has been moved into OneDrive. The only reliable way to know is to ask Windows. `win_folders` runs a PowerShell one-liner, and **remembers the answer**:

```python um/scan.py estatico
def win_folders() -> dict:
    """The user's Windows shell folders (Documents is often redirected into OneDrive), also from WSL."""
    if not (is_windows() or is_wsl()):
        return {}
    cache = win_folders.__dict__
    if "v" not in cache:
        ps = ("$f=[Environment]; "
              "@($f::GetFolderPath('UserProfile'),$f::GetFolderPath('MyDocuments'),$f::GetFolderPath('ApplicationData'),"
              "$f::GetFolderPath('LocalApplicationData')) -join '|'")
        exe = ps_exe()
        try:
            out = subprocess.run([exe, "-NoProfile", "-Command", ps], capture_output=True, text=True, timeout=30,
                                 cwd="/mnt/c" if is_wsl() else None).stdout.strip()
            prof, docs, roaming, local = (out.split("|") + ["", "", "", ""])[:4]
            cache["v"] = {k: to_posix(v) for k, v in dict(profile=prof, documents=docs, appdata=roaming, localappdata=local).items() if v}
        except (OSError, subprocess.TimeoutExpired):
            cache["v"] = {}
    return cache["v"]
```

Three tricks in one function:

1. **A cache in the function itself.** Functions are objects, and like most objects they have a `__dict__` where you can store attributes. `win_folders.__dict__` survives between calls, so PowerShell (which takes about a second to start) runs only once. The standard library offers the same with a decorator, `@functools.lru_cache` ([[py:8#Un decorador con estado|decorators with state]]); this version is just more explicit.
2. **Padding before unpacking.** If PowerShell returns fewer than four parts, `a, b, c, d = parts` would raise `ValueError`. Adding four empty strings and slicing `[:4]` guarantees exactly four values ([[py:4#6|unpacking]]).
3. **A dict comprehension with a filter.** `{k: to_posix(v) for k, v in ... .items() if v}` converts every path and drops the empty ones ([[py:7#5|comprehensions]]).

Also notice the adjacent string literals in `ps = ("..." "..." "...")`. Python joins strings written next to each other into one string. It is a clean way to split a long string over several lines.

## Collecting Steam folders without duplicates

```python um/scan.py estatico
def steam_roots() -> list[Path]:
    cands = []
    reg = steam_registry_root()
    if reg:
        cands.append(reg)
    if is_windows():
        cands += [Path(os.environ.get("ProgramFiles(x86)", r"C:\Program Files (x86)")) / "Steam", Path(r"C:\Program Files\Steam")]
    ...
    seen, out = set(), []
    for c in cands:
        try:
            r = c.resolve()
        except OSError:
            continue
        if (r / "steamapps").is_dir() and r not in seen:
            seen.add(r)
            out.append(r)
    return out
```

The same Steam folder can appear twice: from the registry and from the default location, maybe written differently (`C:/Steam` and `C:\steam\.`). `resolve()` turns a path into its canonical form, so equal folders become equal values.

Then comes a classic pattern: **a set to remember what was seen, a list to keep the order**. A set alone would lose the order (sets have none); a list alone would make `r not in seen` slow, O(n) per check, while a set does it in O(1) ([[py:4#3|sets]], [[py:12#1|complexity]]). Since Python 3.7 you could also write `list(dict.fromkeys(...))`, because dicts keep insertion order ([[py:4#4|dictionaries]]).

`cands += [...]` extends the list in place (for lists, `+=` works like `extend`, it doesn't create a new list: [[py:3#4|`+=` versus `=`]]).

## Reading every installed game

```python um/scan.py estatico
def steam_games() -> list[dict]:
    games, libs = [], []
    for root in steam_roots():
        libs.append(root)
        lf = root / "steamapps" / "libraryfolders.vdf"
        if lf.exists():
            data = _vdf(lf.read_text(encoding="utf-8", errors="replace"))
            for v in (data.get("libraryfolders") or {}).values():
                if isinstance(v, dict) and v.get("path"):
                    libs.append(Path(to_posix(v["path"])))
    ...
        for acf in apps.glob("appmanifest_*.acf"):
            st = _vdf(acf.read_text(encoding="utf-8", errors="replace")).get("AppState", {})
            path = apps / "common" / st.get("installdir", "")
            if st.get("installdir") and path.is_dir():
                games.append(dict(store="steam", appid=st.get("appid"), name=st.get("name"), path=str(path), ...))
    return games
```

Defensive habits worth copying:

- **`errors="replace"`** when reading text: a strange byte doesn't crash the program; it becomes `�`. A test in the project checks exactly this with game names in UTF-8.
- **`(data.get("libraryfolders") or {}).values()`**: if the key is missing, `get` returns `None`, and `None or {}` gives an empty dict, so the loop simply does nothing.
- **`isinstance(v, dict)`** before using `v` as a dict: a damaged file could have a string there.
- **`dict(store="steam", appid=...)`**: building a dict with keyword arguments. It reads more cleanly than `{"store": "steam", ...}` when all keys are simple names.

Epic is simpler: each game is a small JSON file.

```python um/scan.py estatico
def epic_games() -> list[dict]:
    base = Path(r"C:\ProgramData") if is_windows() else Path("/mnt/c/ProgramData") if is_wsl() else None
    out = []
    if base:
        for item in (base / "Epic/EpicGamesLauncher/Data/Manifests").glob("*.item"):
            try:
                d = json.loads(item.read_text(errors="replace"))
            except (json.JSONDecodeError, OSError):
                continue
            ...
```

- **Chained conditional expressions:** `A if c1 else B if c2 else None` reads as *A if c1; otherwise B if c2; otherwise None*.
- **`except (json.JSONDecodeError, OSError)`** catches two exception types with one clause, using a tuple. A broken file is skipped with `continue` instead of stopping the whole scan.

## Finding a game from a fuzzy name

`um scan terraria` must find *Terraria*; `um scan "age of empires ii"` must find *Age of Empires II: Definitive Edition*. This is `resolve_game`:

```python um/scan.py estatico
def resolve_game(query: str) -> dict:
    p = Path(to_posix(query)).expanduser()
    if p.is_dir():
        ...
        return dict(store=None, appid=None, name=p.name, path=str(p))
    q = re.sub(r"[^a-z0-9]", "", query.lower())
    games = all_games()
    exact = [g for g in games if re.sub(r"[^a-z0-9]", "", (g["name"] or "").lower()) == q or g.get("appid") == query]
    hits = exact or [g for g in games if q and q in re.sub(r"[^a-z0-9]", "", (g["name"] or "").lower() + Path(g["path"]).name.lower())]
    if not hits:
        die(f"no installed game matches {query!r}; pass the install folder instead (`um scan --list` shows what was found)")
    if len(hits) > 1:
        hits.sort(key=lambda g: len(g["name"] or ""))
    return hits[0]
```

1. If the query is an existing folder, use it directly.
2. **Normalise**: lowercase, then `re.sub(r"[^a-z0-9]", "", ...)` deletes everything that is not a letter or digit. `"Age of Empires II: DE"` becomes `"ageofempiresiide"`.
3. Look for **exact** matches first. If there are none, `exact or [...]` evaluates the second list: games whose normalised name **contains** the query. An empty list is falsy, so `or` moves to the fallback.
4. With several hits, the **shortest name wins**: if you typed `terraria` and both *Terraria* and *Terraria Soundtrack* match, you probably meant the first. `sort(key=...)` with a `lambda` decides the order ([[py:5#6|`lambda`]], [[py:12#2|sorting]]).

`(g["name"] or "")` appears three times: a game with no name (`None`) would crash `.lower()`, so `or ""` replaces it with an empty string.

```python resolve.py
import re

games = [
    {"name": "Terraria", "appid": "105600"},
    {"name": "Terraria Soundtrack", "appid": "409210"},
    {"name": "Age of Empires II: Definitive Edition", "appid": "813780"},
    {"name": None, "appid": "1"},
]

def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())

def resolve(query):
    q = norm(query)
    exact = [g for g in games if norm(g["name"]) == q or g["appid"] == query]
    hits = exact or [g for g in games if q and q in norm(g["name"])]
    if not hits:
        return None
    hits.sort(key=lambda g: len(g["name"] or ""))
    return hits[0]["name"]

for query in ["terraria", "TERRARIA!", "soundtrack", "age of empires ii", "813780", "zelda"]:
    print(f"{query!r:22} -> {resolve(query)}")
```

::: ojo
**`q and q in ...`**: if the query normalises to an empty string (for example `"???"`), `"" in "anything"` is `True`, and *every* game would match. The `q and` in front stops that: an empty `q` is falsy, so the condition is `""`, which is falsy too. A tiny guard that prevents a confusing bug.
:::

::: nota English corner
- ***is often redirected into*:** passive voice with an adverb of frequency: *"Documents **is often redirected** into OneDrive"*. The adverb goes between the auxiliary and the participle: [[en:8#La pasiva en todos los tiempos|the passive in every tense]].
- ***pass the install folder instead*:** *instead* at the end = "en su lugar". Compare *instead of* + noun or *-ing*: *"use the folder **instead of typing** the name"*. See [[en:10#El -ing como sustantivo|-ing after prepositions]].
- ***shows what was found*:** an indirect question with normal word order (*what was found*, not *what was it found*). See [[en:9#Directo e indirecto|reported speech]].
- ***Minimal*:** in the docstring *"Minimal Valve KeyValues parser"*, *minimal* means "the smallest that works", a common word in technical English.
:::
