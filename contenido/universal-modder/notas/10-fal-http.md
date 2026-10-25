# 10 · fal: HTTP, retries and polling

**fal** is a web service that runs AI models: image generators, 3D model generators, music and voice models. `fal.py` talks to it **with no special library**, only `urllib` from the standard library. The module docstring says so proudly: *"plain REST, no SDK needed"*.

That makes `fal.py` a great example of how to use a web API by hand: authentication, JSON requests, retries when the network fails, file uploads with a fallback, and waiting for a job that takes minutes.

::: claves
- The API key is looked for in **several places, in order**: environment variable, key file, `.env` file.
- `_req()` builds every HTTP request and **retries** transient errors (429, 5xx) with a growing pause.
- `upload()` tries the fast route first and falls back to embedding the file in the request, even **catching `SystemExit`** to do it.
- Long jobs use a **queue**: submit, **poll** the status, then download the result.
- Every generation adds one line of JSON to a **manifest** file, so any asset can be traced.
:::

## REST in one paragraph

A **REST API** is a web service you use with plain HTTP requests. You send a **method** (`GET` to read, `POST` to create or submit), a **URL**, some **headers** (metadata, such as your API key) and maybe a **body** (usually JSON). The server answers with a **status code** (200 = OK, 404 = not found, 429 = too many requests, 500 = server error) and a body, again usually JSON.

## Finding the API key

```python um/fal.py estatico
def fal_key() -> str:
    k = os.environ.get("FAL_KEY")
    if not k and os.environ.get("FAL_KEY_FILE"):
        k = Path(os.environ["FAL_KEY_FILE"]).expanduser().read_text().strip()
    if not k:
        for env in (Path.cwd() / ".env", Path(__file__).resolve().parents[1] / ".env"):
            if env.exists():
                m = re.search(r"^\s*FAL_KEY\s*=\s*['\"]?([^'\"\s]+)", env.read_text(), re.M)
                if m:
                    k = m.group(1)
                    break
    if not k:
        die("FAL_KEY is not set. Create a key at https://fal.ai/dashboard/keys and `export FAL_KEY=...` "
            "(or put FAL_KEY=... in a .env file here)")
    return k
```

The function tries each source **only if the previous one gave nothing** (`if not k`). The order goes from most explicit to most implicit, a common convention for configuration.

- **`Path(__file__).resolve().parents[1]`**: `__file__` is the path of this module, `resolve()` makes it absolute, and `parents[1]` goes up two levels: from `um/fal.py` to the repository root.
- **The regular expression** reads a line like `FAL_KEY = "abc123"` in a `.env` file. `re.M` (*multiline*) makes `^` match at the start of **every line**, not only at the start of the text. `['\"]?` accepts an optional quote, and the group `([^'\"\s]+)` captures the key itself.
- **The error message says how to fix the problem.** This is a habit across the whole project, and it matters even more here because the reader is often an AI agent, which will follow the instructions literally.

::: ojo
**Never put secrets in code.** The key comes from the environment or from a `.env` file that is not committed. In chapter 14, `um publish check` fails if it finds a `.env` file or something that looks like a fal key in a mod folder.
:::

## `_req()`: one function for every request

```python um/fal.py estatico
def _req(method: str, url: str, body=None, headers=None, auth=True, raw=False, timeout=120):
    h = {"Accept": "application/json", **(headers or {})}
    if auth:
        h["Authorization"] = "Key " + fal_key()
    data = None
    if body is not None:
        if isinstance(body, (bytes, bytearray)):
            data = bytes(body)
        else:
            data = json.dumps(body).encode()
            h.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                payload = r.read()
                return payload if raw else (json.loads(payload) if payload else {})
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:1500]
            if e.code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(2 * (attempt + 1))
                continue
            die(f"fal {method} {url.split('?')[0]} -> HTTP {e.code}: {detail}")
        except urllib.error.URLError as e:
            if attempt < 3:
                time.sleep(2 * (attempt + 1))
                continue
            die(f"fal {method} {url}: {e.reason}")
```

### Building the headers

- **`{"Accept": "application/json", **(headers or {})}`** creates a new dict with a default header and then **unpacks** the caller's headers into it. Later keys win, so a caller can override `Accept` ([[py:4#6|unpacking with `**`]]). `headers or {}` turns `None` into an empty dict, because `**None` is a `TypeError`.
- **`headers=None` as the default**, not `headers={}`. A mutable default is created **once**, when the function is defined, and shared by every call ([[py:5#4|default values are evaluated once]]). The function doesn't modify `headers` itself (it copies it into `h`), but `None` is the safe habit.
- **`isinstance(body, (bytes, bytearray))`** accepts a tuple of types: true if `body` is any of them.
- **`json.dumps(body).encode()`**: the body must be **bytes**, so the JSON text is encoded (UTF-8 by default).
- **`h.setdefault("Content-Type", ...)`** sets the header only if the caller didn't.

### Retrying

Networks fail. A server can be busy (**429** *Too Many Requests*) or have a temporary problem (**5xx**). For those errors, trying again a moment later usually works. The loop does this:

- **`for attempt in range(4)`**: up to four tries.
- **`return` inside `with`**: on success the function returns immediately, and the `with` block still closes the connection on the way out ([[py:10#6|context managers]]).
- **Two kinds of failure, two `except` clauses.** `HTTPError` means the server answered with an error code; `URLError` means there was no answer at all (no network, DNS failure). `HTTPError` is a subclass of `URLError`, so **the order matters**: if `URLError` came first, it would catch both ([[py:10#3|the exception hierarchy]]).
- **`time.sleep(2 * (attempt + 1))`** waits 2, 4 and then 6 seconds. Waiting longer each time (*backoff*) gives a busy server time to recover.
- **`continue`** goes to the next attempt. If the error is permanent (404, 401) or the attempts are used up, `die()` stops with the server's own message.

Here is the same pattern with a fake server that fails twice. The pause is replaced by a print so that it runs instantly:

```python retry.py
class HTTPError(Exception):
    def __init__(self, code):
        super().__init__(f"HTTP {code}")
        self.code = code

answers = [503, 429, 200]          # the fake server: two failures, then success

def fake_request():
    code = answers.pop(0)
    if code != 200:
        raise HTTPError(code)
    return {"status": "ok"}

def req():
    for attempt in range(4):
        try:
            return fake_request()
        except HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 3:
                print(f"attempt {attempt}: HTTP {e.code}, waiting {2 * (attempt + 1)} s")
                continue
            raise

print(req())
```

## Uploading a file, with a plan B

Models need input images as **URLs**, so a local file has to be uploaded first:

```python um/fal.py estatico
def upload(path: str | Path) -> str:
    """Local file -> URL fal models can read (fal storage). Small files fall back to a data URI."""
    p = Path(path)
    if not p.is_file():
        die(f"no such file: {p}")
    ctype = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
    if p.suffix.lower() == ".glb":
        ctype = "model/gltf-binary"
    data = p.read_bytes()
    try:
        return _upload_cdn(p.name, ctype, data)
    except SystemExit:  # _req already printed why
        err = "see above"
    except (urllib.error.URLError, OSError, KeyError, ValueError) as e:
        err = str(e)
    if len(data) < 8 << 20:
        print(f"fal upload failed ({err}); sending {p.name} inline as a data URI", file=sys.stderr)
        return f"data:{ctype};base64,{base64.b64encode(data).decode()}"
    die(f"could not upload {p.name} ({len(data):,} bytes) to fal storage ({err}); the data-URI fallback only covers files under 8 MiB")
```

- **`mimetypes.guess_type`** guesses the content type from the extension (`.png` → `image/png`). The standard library doesn't know `.glb` (3D models), so that case is fixed by hand.
- **`except SystemExit`**: remember from chapter 4 that `die()` raises `SystemExit`. If the upload fails inside `_req`, the error message has already been printed and `SystemExit` is on its way up. This `except` **stops it**, so the program can try plan B instead of quitting. It is rare to catch `SystemExit`, and the comment explains why it is done here.
- **The fallback: a data URI.** A small file can be sent **inside** the request as text: `data:image/png;base64,iVBORw0...`. **Base64** encodes any bytes using only 64 safe characters, at the cost of making the data about a third bigger. That is fine for an 8 MiB image, not for a video, hence the limit (`8 << 20` bytes = 8 MiB).
- **`{len(data):,}`** formats a number with thousands separators: `12,582,912` ([[py:2#f-strings y repr|f-strings]]).

```python data_uri.py
import base64

data = "Hello, fal!".encode()
uri = f"data:text/plain;base64,{base64.b64encode(data).decode()}"
print(uri)
print(base64.b64decode(uri.split(",", 1)[1]).decode())
print(f"{12582912:,} bytes", 8 << 20, len(base64.b64encode(bytes(300))))
```

## Long jobs: submit, poll, collect

Generating a 3D model can take minutes, longer than an HTTP request should stay open. So fal uses a **queue**: you submit a job and get an ID back at once; then you ask "is it ready?" again and again (**polling**); when it is, you fetch the result.

```python um/fal.py estatico
def run(endpoint: str, inp: dict, timeout: float = 1800, quiet: bool = False) -> dict:
    """Submit to the queue, poll (printing logs to stderr), return the result JSON."""
    job = submit(endpoint, inp)
    rid = job.get("request_id")
    status_url = job.get("status_url") or f"{QUEUE}/{endpoint}/requests/{rid}/status"
    response_url = job.get("response_url") or f"{QUEUE}/{endpoint}/requests/{rid}"
    t0, seen, last = time.time(), 0, ""
    while True:
        st = _req("GET", status_url + ("&" if "?" in status_url else "?") + "logs=1")
        s = st.get("status")
        logs = st.get("logs") or []
        if not quiet:
            for line in logs[seen:]:
                msg = (line or {}).get("message", "")
                if msg:
                    print(f"  [{endpoint}] {msg}", file=sys.stderr)
            ...
        seen, last = len(logs), s
        if s == "COMPLETED":
            if st.get("error"):
                die(f"{endpoint} failed: {st['error']}")
            res = _req("GET", response_url)
            res["_request_id"], res["_endpoint"] = rid, endpoint
            return res
        if time.time() - t0 > timeout:
            die(f"{endpoint}: still {s} after {timeout:.0f}s (request {rid}); check later with `um fal result {endpoint} {rid}`")
        time.sleep(1.0 if time.time() - t0 < 30 else 3.0)
```

- **`while True` with exits inside**: the loop ends with `return` (success) or `die()` (error or timeout). It is the clearest shape when there are several ways out.
- **`logs[seen:]`**: each status response contains **all** the log lines so far. Slicing from `seen` prints only the new ones. Then `seen` is updated.
- **`("&" if "?" in status_url else "?")`**: add `logs=1` to the URL correctly, whether or not it already has a query string.
- **Adaptive polling:** ask every second during the first 30 seconds, then every 3. Short jobs finish fast; long jobs don't flood the server with requests.
- **A timeout that doesn't waste work.** If the job is still running after 30 minutes, the program stops, but the message includes the request ID and the exact command to collect the result later. Nothing that was paid for is lost.

## `generate()`: the recipe every command uses

```python um/fal.py estatico
def generate(endpoint: str, inp: dict, out: str | Path, name: str, quiet=False) -> dict:
    """run + download every output file + manifest line. Returns {'files': [...], 'result': {...}}."""
    inp = {k: ([_as_url(x) for x in v] if isinstance(v, list) and k.endswith("urls") else _as_url(v) if k.endswith("url") else v)
           for k, v in inp.items() if v is not None}
    res = run(endpoint, inp, quiet=quiet)
    out = Path(out)
    files = download_outputs(res, out, name)
    rec = dict(t=time.strftime("%Y-%m-%dT%H:%M:%S"), endpoint=endpoint, name=name, request_id=res.get("_request_id"),
               seed=res.get("seed"), files=files,
               input={k: (v[:120] + "..." if isinstance(v, str) and v.startswith("data:") else v) for k, v in inp.items()})
    with open(out / "fal_manifest.jsonl", "a") as f:
        f.write(json.dumps(rec) + "\n")
    ...
```

**The first line** is one dict comprehension that does three jobs:

1. **`if v is not None`** drops options that were not given (an unused `--seed` is `None`).
2. For keys ending in **`urls`** whose value is a list, it converts **each** element with `_as_url` (local files get uploaded).
3. For keys ending in **`url`**, it converts the single value. Everything else passes unchanged.

It packs a lot into one expression; a `for` loop with `if`/`elif` would be easier to read. Real code is a mix of both styles ([[py:7#5|comprehensions]]).

**The manifest** is a file in **JSON Lines** format (`.jsonl`): one JSON object per line. Opening it in mode `"a"` (*append*) adds a line at the end without reading or rewriting the file ([[py:10#7|file modes]]). Each line records the model, the inputs, the seed and the files produced, so an asset can be traced back and regenerated. Long data URIs are cut to 120 characters so the manifest stays readable.

::: idea
**Why JSON Lines instead of one big JSON list?** To add an item to a JSON list you must read the whole file, parse it, append and write it all back. With JSON Lines you just append one line. If the program crashes in the middle, at worst the last line is broken, and every previous line is still valid.
:::

::: nota English corner
- ***no SDK needed*:** a reduced passive: *no SDK **is** needed*. Docstrings and headlines often drop the verb *to be*. See [[en:8#Activa contra pasiva|the passive]].
- ***Small files fall back to a data URI*:** present simple for something that is always true: [[en:3#Present simple|present simple]].
- ***still {s} after {timeout}s; check later with...*:** *still* = "todavía" (in progress), and an imperative to tell the user what to do next.
- ***could not upload... ; the fallback only covers files under 8 MiB*:** *under* = less than. Its opposite is *over*: *files over 8 MiB*.
- ***Create a key at... and export FAL_KEY*:** instructions as imperatives, joined with *and*.
:::
