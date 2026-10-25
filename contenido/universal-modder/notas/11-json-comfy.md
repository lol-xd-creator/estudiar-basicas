# 11 · Walking JSON, naming files, and ComfyUI

The answer from an AI service is a JSON document, and the files you want (images, models, sounds) are URLs hidden somewhere inside it. Every model puts them in a different place. This chapter reads the **recursive generator** that finds them all, the logic that gives each file a sensible name, the parser for `key=value` arguments, and the module for **ComfyUI**, an image generator that runs on your own computer.

::: claves
- `_urls_in` walks any JSON structure with **recursion** and **`yield from`**, producing every URL with its path.
- File names are built with regular expressions and a **set** of names already used.
- `_kv` turns `key=value` and `key:=json` strings into a dict.
- `{**inp, **extra}` merges two dicts; the **later** one wins.
- ComfyUI workflows are graphs stored as dicts. `apply_set` changes a **deep copy**, never the original.
- `sorted(keys, key=lambda k: (len(k), k))` sorts numeric strings in natural order.
:::

## Finding every URL: a recursive generator

A typical result looks like this:

```text
{"images": [{"url": "https://.../a.png", "content_type": "image/png"},
            {"url": "https://.../b.png", "content_type": "image/png"}],
 "mask": {"url": "https://.../m.png"},
 "seed": 42}
```

But a 3D model returns `{"model_mesh": {"url": ...}}`, and a rigging model returns several nested objects. Instead of knowing each format, the code searches **everything**:

```python um/fal.py estatico
def _urls_in(obj, trail=""):
    """Yield (json_path, url, content_type) for every downloadable file in a result."""
    if isinstance(obj, dict):
        u = obj.get("url")
        if isinstance(u, str) and u.startswith("http"):
            yield trail, u, obj.get("content_type") or ""
        for k, v in obj.items():
            if k != "url":
                yield from _urls_in(v, f"{trail}.{k}" if trail else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from _urls_in(v, f"{trail}[{i}]")
```

- **It is a generator** (it uses `yield`), so it produces results one by one, as the caller asks for them ([[py:8#2|generators]]).
- **It is recursive**: for each value inside a dict or a list, it calls itself. A JSON document is a tree, and recursion is the natural way to walk a tree ([[py:5#8|recursion]]). Strings and numbers are leaves: neither branch matches, so nothing is yielded.
- **`yield from _urls_in(...)`** passes on **every** value produced by the inner call. Without it you would need `for x in _urls_in(...): yield x`.
- **`trail`** records where each URL was found, in a JSON-path style: `images[1]`, `mask`, `model.textures[0]`. The next function uses it to name the files.

Run the real function on the example:

```python urls_in.py
def _urls_in(obj, trail=""):
    if isinstance(obj, dict):
        u = obj.get("url")
        if isinstance(u, str) and u.startswith("http"):
            yield trail, u, obj.get("content_type") or ""
        for k, v in obj.items():
            if k != "url":
                yield from _urls_in(v, f"{trail}.{k}" if trail else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from _urls_in(v, f"{trail}[{i}]")

result = {
    "images": [{"url": "https://cdn/a.png", "content_type": "image/png"},
               {"url": "https://cdn/b.png", "content_type": "image/png"}],
    "mask": {"url": "https://cdn/m.png"},
    "model": {"textures": [{"url": "https://cdn/t.png"}], "url": "https://cdn/m.glb"},
    "seed": 42,
}
gen = _urls_in(result)
print(type(gen).__name__)
for path, url, ctype in gen:
    print(f"{path:20} {url:22} {ctype}")
```

Notice that `_urls_in(result)` doesn't run anything by itself: it returns a generator object. The body runs while the `for` loop asks for values.

## Naming the downloaded files

```python um/fal.py estatico
def download_outputs(result: dict, out: Path, name: str) -> list[str]:
    out.mkdir(parents=True, exist_ok=True)
    files, used, first_key, failed = [], set(), None, []
    for trail, url, ctype in _urls_in(result):
        ext = Path(urllib.parse.urlparse(url).path).suffix or EXT.get(ctype.split(";")[0], "")
        key = re.sub(r"\[\d+\]", "", trail).split(".")[-1] or "file"
        idx = re.findall(r"\[(\d+)\]", trail)
        first_key = first_key or key
        # images[0] -> name, images[1] -> name_2; other outputs (mask, thumbnail, fbx) -> name_<key>
        if key == first_key:
            stem = name if not idx or idx[-1] == "0" else f"{name}_{int(idx[-1]) + 1}"
        else:
            stem = f"{name}_{key}" + (f"_{int(idx[-1]) + 1}" if idx and idx[-1] != "0" else "")
        path = out / f"{stem}{ext}"
        n = 1
        while path.name in used:
            n += 1
            path = out / f"{stem}_{n}{ext}"
        used.add(path.name)
        try:
            ...download url to path...
        except (urllib.error.URLError, OSError) as e:  # keep going: the other outputs are still worth saving
            failed.append(f"{url} ({e})")
            continue
        files.append(str(path))
    if failed:
        ...
        die("the job finished but these outputs did not download:\n  " + "\n  ".join(failed) + ...)
    return files
```

The comment states the naming rule. For a sprite called `drone`: the first image is `drone.png`, the second `drone_2.png`, a mask `drone_mask.png`.

- **The extension** comes from the URL path if it has one, otherwise from the content type through the table `EXT` (`"image/png"` → `".png"`). `ctype.split(";")[0]` drops extra parts such as `"; charset=utf-8"`.
- **`re.sub(r"\[\d+\]", "", trail)`** deletes the indexes (`images[1]` → `images`), and `.split(".")[-1]` keeps the last name: the **key**.
- **`re.findall(r"\[(\d+)\]", trail)`** extracts the indexes as strings: `"images[1]"` → `["1"]`.
- **`while path.name in used`**: if two outputs would get the same name, add `_2`, `_3`... until it is free. `used` is a set, so each check is O(1).
- **Errors don't stop the loop.** If one download fails, it is recorded and the loop continues: the other files were already paid for. Only at the end does the function stop, listing every failure, and with the request ID so it can be retried. The project has a test for this too (`test_failed_download_keeps_the_request_id`).

```python naming.py
import re

def key_and_index(trail):
    key = re.sub(r"\[\d+\]", "", trail).split(".")[-1] or "file"
    idx = re.findall(r"\[(\d+)\]", trail)
    return key, idx

for trail in ["images[0]", "images[1]", "mask", "model.textures[2]", "[0]"]:
    print(f"{trail:18} -> {key_and_index(trail)}")
```

## Parsing `key=value` arguments

`um fal run` can call **any** model, so it can't have a predefined option for every input. Instead it accepts pairs:

```text
um fal run fal-ai/flux/dev prompt="a red potion" num_images:=2 image_url=@ref.png
```

```python um/fal.py estatico
def _kv(pairs: list[str]) -> dict:
    """key=value (string) and key:=json (number/bool/list/object); value '@file' uploads a local file."""
    out = {}
    for p in pairs or []:
        if ":=" in p:
            k, v = p.split(":=", 1)
            out[k] = json.loads(v)
        elif "=" in p:
            k, v = p.split("=", 1)
            out[k] = v
        else:
            die(f"bad argument {p!r}: use key=value or key:=json")
    return out
```

- With `=`, the value is always a **string**. With `:=`, it is parsed as **JSON**, so `2` becomes an `int`, `true` a `bool`, and `[1,2]` a list. (This `:=` is just text inside an argument; it has nothing to do with Python's walrus operator.)
- **The order of the checks matters.** `":=" in p` is tested first, because a string with `:=` also contains `=`.
- **`split(..., 1)`** splits only at the first separator, so a value can contain `=`: `prompt=a=b` gives `{"prompt": "a=b"}`.
- **`pairs or []`**: if the option was never given, argparse leaves `None`, and the loop would fail without the fallback.

```python kv.py
import json

def _kv(pairs):
    out = {}
    for p in pairs or []:
        if ":=" in p:
            k, v = p.split(":=", 1)
            out[k] = json.loads(v)
        elif "=" in p:
            k, v = p.split("=", 1)
            out[k] = v
        else:
            raise ValueError(f"bad argument {p!r}")
    return out

print(_kv(["prompt=a red potion", "num_images:=2", "loop:=true", "size:=[64, 64]", "note=a=b"]))
print(_kv(None))
```

## Recipes: merging dicts

Each recipe (`image`, `sprite`, `music`...) builds a dict of inputs and calls `generate`:

```python um/fal.py estatico
    if r == "image":
        inp = dict(prompt=args.prompt, aspect_ratio=args.aspect, resolution=args.res, num_images=args.n, seed=args.seed)
        generate(model or MODELS["image"], {**inp, **extra}, out, _name(args, args.prompt))
```

- **`{**inp, **extra}`** builds a new dict with the recipe's inputs and then the user's extra `--set` values. When a key appears in both, **the later one wins**, so the user can override any default ([[py:4#6|`**` in dict literals]]). Since Python 3.9 you can also write `inp | extra` ([[py:4#4|dictionaries]]).
- **`model or MODELS["image"]`**: use the `--model` option if given, otherwise the default model from a table at the top of the file. Model names change every few months, so keeping them in one dict makes updates a one-line change.

A default output name is made from the prompt:

```python name.py
import re

def _name(fallback):
    words = re.sub(r"[^a-z0-9 ]", "", fallback.lower()).split()[:5]
    return "_".join(words) or "asset"

print(_name("A rusty scrap drone enemy, side view facing left, 16-bit pixel art"))
print(_name("!!!"))
```

## ComfyUI: a graph in a dict

**ComfyUI** runs image models locally, on your own graphics card, with no API key. A generation is described as a **graph of nodes**: one node loads the model, another encodes the prompt, another samples the image, another saves it. In the API format, the graph is a dict:

```python um/comfy.py estatico
def txt2img(prompt: str, checkpoint: str, negative: str = NEGATIVE, width: int = 512, height: int = 512, steps: int = 25,
            cfg: float = 7.0, seed: int = 0, sampler: str = "euler", scheduler: str = "normal", n: int = 1) -> dict:
    """ComfyUI's default graph in API format (same node ids as the stock workflow)."""
    return {
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": checkpoint}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": n}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["4", 1]}},
        "3": {"class_type": "KSampler", "inputs": {"seed": seed, ..., "model": ["4", 0],
                                                    "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "um", "images": ["8", 0]}},
    }
```

- **Keys are node IDs as strings.** Each node has a `class_type` (what it does) and `inputs`.
- **`["4", 1]` is an edge of the graph**: "output number 1 of node 4". Node 4 loads a checkpoint and has three outputs (model, text encoder, image decoder); the prompt nodes take output 1, the sampler takes output 0, the decoder takes output 2.
- A function that **returns a literal dict** built from its parameters is a clean way to produce a template, with every value visible in one place.

### Changing a workflow without touching the original

Users can run any workflow saved from ComfyUI and change inputs from the command line: `--set 6.text="a blue potion" --set 3.seed:=42`.

```python um/comfy.py estatico
def apply_set(wf: dict, sets: list[str] | None) -> dict:
    """NODE.INPUT=value (a string) or NODE.INPUT:=json, NODE being a node id or title. Returns a changed copy."""
    wf = json.loads(json.dumps(wf))
    for s in sets or []:
        left, eq, val = s.partition("=")
        json_val = left.endswith(":")
        left = left[:-1] if json_val else left
        ref, dot, key = left.rpartition(".")
        if not eq or not dot or not ref or not key:
            die(f"bad --set {s!r}: use NODE.INPUT=value or NODE.INPUT:=json")
        ...
        wf[_node(wf, ref)].setdefault("inputs", {})[key] = val
    return wf
```

- **`json.loads(json.dumps(wf))`** makes a **deep copy**: the dict is turned into text and back, so every nested dict and list is new. `copy.deepcopy(wf)` would do the same ([[py:3#5|shallow and deep copies]]). A shallow copy (`dict(wf)` or `wf.copy()`) would **not** be enough: the nodes inside would still be shared, and setting an input would change the caller's workflow too. The docstring promises *"Returns a changed copy"*, and the first line keeps the promise.
- **`partition("=")`** splits at the first `=` and always returns **three** parts: before, the separator, after. If there is no `=`, the separator is `""`, which is how the code detects a bad argument (`not eq`).
- **`rpartition(".")`** does the same from the **right**: `"6.text"` → `("6", ".", "text")`, and also `"My Node.v2.text"` → `("My Node.v2", ".", "text")`.
- **`setdefault("inputs", {})[key] = val`**: get the node's `inputs` dict, creating it if missing, and set the key in one line.

```python apply_set.py
import json, copy

wf = {"6": {"class_type": "CLIPTextEncode", "inputs": {"text": "a red potion"}}}

shallow = dict(wf)
shallow["6"]["inputs"]["text"] = "changed through a shallow copy"
print(wf["6"]["inputs"]["text"])          # the original changed too!

wf["6"]["inputs"]["text"] = "a red potion"
deep = json.loads(json.dumps(wf))
deep["6"]["inputs"]["text"] = "a blue potion"
print(wf["6"]["inputs"]["text"], "|", deep["6"]["inputs"]["text"])

print("6.text".rpartition("."), "noequals".partition("="))
```

### Validating input with `all()`

```python um/comfy.py estatico
    if isinstance(wf, dict) and "nodes" in wf and "links" in wf:
        die(f"{p} is a UI workflow. In ComfyUI, save it with Export (API) and run that file")
    ...
    if not isinstance(wf, dict) or not wf or not all(isinstance(v, dict) and "class_type" in v for v in wf.values()):
        die(f"{p} is not an API-format workflow (a JSON object of nodes, each with class_type and inputs)")
```

ComfyUI can save a workflow in two formats, and users often pick the wrong one. The first check recognises the other format and says exactly which menu option to use. The second uses **`all()` with a generator**: true only if **every** node is a dict with a `class_type`. Like `any()`, `all()` stops at the first failure.

### Natural sorting of numeric strings

```python um/comfy.py estatico
    for node in sorted(history.get("outputs", {}), key=lambda k: (len(k), k)):
```

Node IDs are strings: `"9"`, `"10"`, `"25"`. Sorted as text, `"10"` comes before `"9"`, because `"1"` < `"9"`. The key `(len(k), k)` sorts by **length first**, then alphabetically: shorter numbers first, so `"9"` before `"10"`. Tuples compare element by element, which makes multi-level sorting easy ([[py:12#2|sorting]]).

```python natural_sort.py
ids = ["10", "9", "25", "3", "100"]
print(sorted(ids))
print(sorted(ids, key=lambda k: (len(k), k)))
print(sorted(ids, key=int))
```

`key=int` gives the same order here, but it fails if an ID is not a number; the tuple key works for any string.

### Waiting with a deadline

```python um/comfy.py estatico
def wait(base: str, prompt_id: str, timeout: float = 1800, poll: float = 1.0) -> dict:
    end = time.time() + timeout
    while time.time() < end:
        h = _req(base, f"/history/{prompt_id}").get(prompt_id)
        if h:
            ...
            if st.get("completed", True):
                return h
        time.sleep(poll)
    die(f"ComfyUI didn't finish in {timeout:.0f} s (prompt {prompt_id}); it is still queued or running")
```

The same polling idea as fal, written differently: compute the **deadline** once (`end`), and loop while it hasn't passed. When the `while` condition becomes false, the code after the loop runs: the timeout message.

::: nota English corner
- ***keep going: the other outputs are still worth saving*:** *keep* + *-ing* = continue; *be worth* + *-ing* = merecer la pena. Both take a gerund: [[en:10#Verbos seguidos de -ing|verbs followed by -ing]].
- ***NODE being a node id or title*:** an absolute participle construction, very compact: "where NODE is a node id or a title". See [[en:15#Participle clauses|participle clauses]].
- ***the job finished but these outputs did not download*:** *download* used without an object, like *the file didn't open*.
- ***save it with Export (API) and run that file*:** instructions as imperatives; *that file* points back to the one just mentioned.
:::
