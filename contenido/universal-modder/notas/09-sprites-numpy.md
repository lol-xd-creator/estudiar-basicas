# 9 · Sprites with NumPy

The flood fill in chapter 8 visits pixels one at a time in a Python loop. That is fine for a background, because the fill stops early. But some operations must touch **every** pixel, maybe several times: snapping each pixel to the nearest colour of a palette, for example. A 1024×1024 image has more than a million pixels, and a Python loop over them takes seconds. **NumPy** does the same work in milliseconds by operating on whole arrays at once.

This chapter is not about NumPy for its own sake. It shows the **idea** of vectorised code, and several Python concepts that come with it: slicing in several dimensions, copies versus views, and why `&` and `and` are different.

::: claves
- An image becomes an array of shape `(height, width, 4)` with `np.asarray(im)`.
- **Vectorised** operations (`a * b`, `a > 0`) work on every element at once, in fast compiled code.
- **Broadcasting** combines arrays of different shapes without loops.
- **Boolean masks** select pixels; they are combined with `&` and `|`, never with `and` / `or`.
- `np.asarray` may give a read-only **view**; `.copy()` gives an independent array.
:::

## From image to array

```python um/sprite.py estatico
def snap_palette(im, pal):
    np = need("numpy")
    a = np.asarray(im).copy()
    P = np.array(pal, np.int32)
    rgb = a[..., :3].reshape(-1, 1, 3).astype(np.int32)
    idx = ((rgb - P[None]) ** 2).sum(-1).argmin(-1)
    a[..., :3] = P[idx].reshape(a.shape[:2] + (3,)).astype(np.uint8)
    return _pil().fromarray(a, "RGBA")
```

This function makes a sprite use only the colours of a reference **palette** (for example, the 32 colours an old game uses). It is six lines, and each one is worth understanding.

### `np.asarray(im).copy()`

`np.asarray` wraps the image data as an array, often **without copying it**, and the result can be read-only. The function wants to change the pixels, so it calls `.copy()` to get its own independent array. This is the same distinction as **shallow copy versus alias** in your notes ([[py:3#5|copies]]): two names for one object, or two separate objects.

### `a[..., :3]`: slicing in several dimensions

The array has shape `(h, w, 4)`: rows, columns, channels. NumPy accepts one slice **per dimension**, separated by commas:

| Expression | Meaning | Shape |
|---|---|---|
| `a[0]` | the first row of pixels | `(w, 4)` |
| `a[:, 0]` | the first column | `(h, 4)` |
| `a[..., :3]` | every pixel, only R, G, B | `(h, w, 3)` |
| `a[..., 3]` | every pixel, only alpha | `(h, w)` |
| `a[..., 3:4]` | alpha, but keeping the last dimension | `(h, w, 1)` |

`...` (*Ellipsis*) means "all the dimensions before this one". The slicing rules are the ones you know from lists ([[py:2#10|slicing]]), applied to each axis.

### Broadcasting: every pixel against every colour

The goal is: for each pixel, find the palette colour with the smallest distance. With loops:

```text
for each pixel (1,000,000):
    for each palette colour (32):
        compute the distance
```

That is 32 million Python operations. NumPy does it with **shapes**:

| Array | Shape | What it is |
|---|---|---|
| `rgb` | `(N, 1, 3)` | N pixels, each in its own row |
| `P[None]` | `(1, K, 3)` | K palette colours, in one row |
| `rgb - P[None]` | `(N, K, 3)` | every pixel minus every colour |
| `(...) ** 2).sum(-1)` | `(N, K)` | squared distance from every pixel to every colour |
| `.argmin(-1)` | `(N,)` | for each pixel, the index of the nearest colour |

**Broadcasting** is the rule that makes `(N, 1, 3) - (1, K, 3)` work: a dimension of size 1 is stretched to match the other array, without actually copying any data. `P[None]` adds a new dimension of size 1 at the front. Finally, `P[idx]` uses the array of indexes to pick a colour for each pixel at once (*fancy indexing*).

Here is the algorithm without NumPy, in plain Python, on a few pixels. It is easy to read, but it is the slow version:

```python palette.py
palette = [(0, 0, 0), (255, 255, 255), (200, 30, 30), (30, 30, 200)]
pixels = [(250, 240, 245), (10, 20, 5), (180, 60, 40), (90, 90, 160)]

def dist2(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b))

snapped = [min(palette, key=lambda c: dist2(p, c)) for p in pixels]
for p, s in zip(pixels, snapped):
    print(p, "->", s)
```

`min(..., key=...)` returns the palette colour with the smallest distance: the same `key` idea used by `sort` ([[py:5#7|functions that take functions]]). NumPy's `argmin` does this for all pixels at once.

::: tip
**Why is NumPy faster?** Each Python operation has overhead: looking up names, checking types, creating integer objects. NumPy runs one loop **in C** over raw numbers, with no per-element overhead. The complexity is the same (N × K distances), but the constant is maybe 100 times smaller ([[py:12#1|complexity]]).
:::

## Premultiplied alpha

`pixelate` shrinks an image to true pixel art. Shrinking means averaging blocks of pixels, and there is a trap:

```python um/sprite.py estatico
    # premultiply so transparent pixels don't bleed their colour into edges
    np = need("numpy")
    a = np.asarray(im).astype(np.float32)
    a[..., :3] *= a[..., 3:4] / 255.0
    pm = Image.fromarray(a.clip(0, 255).astype(np.uint8), "RGBA").resize((tw, th), Image.BOX)
    b = np.asarray(pm).astype(np.float32)
    alpha = b[..., 3:4]
    b[..., :3] = np.where(alpha > 0, b[..., :3] * 255.0 / np.maximum(alpha, 1), 0)
```

A transparent pixel still has a colour, often white, even if you can't see it. When you average a red edge pixel with its transparent white neighbour, you get **pink**, and the shrunk sprite gets a pale halo. The fix, explained by the comment, is to **multiply each colour by its alpha first** (a transparent pixel then counts as black with zero weight), average, and divide by alpha again at the end.

- **`a[..., :3] *= a[..., 3:4] / 255.0`**: alpha has shape `(h, w, 1)` thanks to the `3:4` slice, so it broadcasts over the three colour channels. With `a[..., 3]` the shapes `(h, w, 3)` and `(h, w)` would not match.
- **`astype(np.float32)`** converts to decimals first: with 8-bit integers (0–255), `200 * 0.5` could not be stored precisely, and multiplications would overflow.
- **`np.where(condition, x, y)`** is a vectorised conditional expression: for each pixel, `x` where the condition is true, `y` where it is false. It is the array version of `x if c else y` ([[py:2#11|conditional expressions]]).
- **`np.maximum(alpha, 1)`** avoids dividing by zero.

## Boolean masks: player colours

Strategy games paint each player's units in their own colour. The game stores the sprite in grey, plus a **mask** that says which pixels take the player colour. `team_mask` builds that mask from a sprite with, say, blue accents:

```python um/sprite.py estatico
def team_mask(im, hue: str = "blue", sat_lo: float = 0.25, val_lo: float = 0.15):
    np = need("numpy")
    a = np.asarray(im).astype(np.float32)
    r, g, b = a[..., 0] / 255, a[..., 1] / 255, a[..., 2] / 255
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b)
    sat = (mx - mn) / (mx + 1e-6)
    sel = {"blue": (b >= r * 1.25) & (b >= g * 0.9), "red": (r >= g * 1.4) & (r >= b * 1.4),
           "green": (g >= r * 1.25) & (g >= b * 1.1), "magenta": (r >= g * 1.4) & (b >= g * 1.4)}[hue]
    m = np.clip((sat - sat_lo) / 0.35, 0, 1) * sel * (a[..., 3] > 0) * (mx > val_lo)
    ...
```

- **`b >= r * 1.25`** compares whole arrays and returns an array of `True`/`False` values, one per pixel: a **mask**.
- **`&` combines two masks** element by element. You **cannot** use `and` here: `and` asks for the truth value of each whole array, and NumPy refuses because "is this array true?" is ambiguous (`ValueError`). In plain Python, `and` / `or` work on truth values and return one of the operands ([[py:2#7|`and`, `or`, `not`]]); `&` and `|` are the bitwise operators, which NumPy redefines to work per element ([[py:2#8|bitwise operators]]).
- **Masks as numbers.** `* sel * (a[..., 3] > 0)` multiplies by boolean arrays: `True` counts as 1 and `False` as 0, exactly like `bool` and `int` in plain Python ([[py:2#5|booleans]]). The result is 0 wherever any condition is false.
- **`1e-6`** in `mx + 1e-6` avoids a division by zero on black pixels, a common trick with floats ([[py:2#3|floats]]).

::: ojo
**The dict computes every mask.** `{"blue": ..., "red": ..., ...}[hue]` builds **all four** masks and then keeps one. For a sprite that is fast enough, and the table is very readable. If each value were expensive, you would store functions instead (`{"blue": lambda: ..., ...}[hue]()`) so that only the chosen one runs. The same trade-off appeared with `fit`'s anchors in chapter 8.
:::

## Seamless textures with `np.roll`

A texture that **tiles** (repeats without visible seams) is useful for floors and walls. `seamless` makes one from any image:

```python um/sprite.py estatico
def seamless(im, blend: float = 0.25):
    np = need("numpy")
    a = np.asarray(im.convert("RGBA")).astype(np.float32)
    h, w = a.shape[:2]
    shifted = np.roll(np.roll(a, h // 2, 0), w // 2, 1)
    yy, xx = np.mgrid[0:h, 0:w]
    dx = np.minimum(xx, w - 1 - xx) / (w * blend)
    dy = np.minimum(yy, h - 1 - yy) / (h * blend)
    wgt = np.clip(np.minimum(dx, dy), 0, 1)[..., None]   # 0 at the original's edges -> use the shifted copy there
    out = a * wgt + shifted * (1 - wgt)
    return _pil().fromarray(out.clip(0, 255).astype(np.uint8), "RGBA")
```

- **`np.roll(a, h // 2, 0)`** shifts the image down by half its height, and the rows that fall off the bottom come back at the top. After rolling both ways, the old edges are in the middle, where they join perfectly, and the new edges come from the middle of the original.
- **`np.mgrid[0:h, 0:w]`** creates two arrays with the row number and the column number of every pixel. With them, `dx` and `dy` measure the distance to the nearest edge.
- **The blend:** near the edges the weight is 0, so the shifted copy (which tiles) is used; in the centre the weight is 1, and the original is used. In between, they fade.

`np.roll` has a plain-Python cousin you can try, rotating a list with slices:

```python roll.py
def roll(xs, k):
    k %= len(xs)
    return xs[-k:] + xs[:-k]

row = [1, 2, 3, 4, 5, 6]
print(roll(row, 3))   # the halves swap
print(roll(row, 1), roll(row, -1), roll(row, 7))
```

`k %= len(xs)` makes any shift valid: 7 is the same as 1, and -1 becomes 5, because `%` with a positive divisor always returns a non-negative number in Python ([[py:2#2|`%` with negative numbers]]).

::: nota English corner
- ***so transparent pixels don't bleed their colour into edges*:** *so* = *so that*, for a purpose: [[en:12#Finalidad|purpose connectors]]. *bleed into* = to spread into, like ink.
- ***0 at the original's edges -> use the shifted copy there*:** the possessive *'s* with a thing (*the original's edges*) is common in technical comments.
- ***Rules of thumb*:** *a rule of thumb* is a practical rule based on experience, not a strict law.
- ***the larger... the more*:** not in this code, but useful for describing it: *"**the more** pixels an image has, **the more** NumPy helps"*. See [[en:11.1#Comparativos y superlativos|comparatives]].
:::
