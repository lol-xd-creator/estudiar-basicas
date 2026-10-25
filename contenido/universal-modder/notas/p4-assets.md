# Part IV · Making assets

A mod needs **assets**: sprites, textures, 3D models, sounds. AI services can generate them, but the raw output almost never fits a game as it is. The images are too big, they have a background instead of transparency, and the colours don't match the game's style. This part reads the code that fixes all that, and the code that talks to the AI services.

| Chapter | You will learn |
|---|---|
| 8 · Sprites with Pillow | Removing a background with a **flood fill** (a breadth-first search with `deque`), fitting images into frames, ceiling division with `//`, and a small factory function for the CLI. |
| 9 · Sprites with NumPy | Why loops over pixels are slow, and how NumPy works on whole arrays: slicing, broadcasting and boolean masks. |
| 10 · fal: HTTP, retries and polling | Calling a web API with `urllib`, retrying failed requests, uploading files, and waiting for a long job. |
| 11 · Walking JSON and ComfyUI | A recursive generator with `yield from`, naming output files, parsing `key=value` arguments, and editing a workflow graph without changing the original. |

Chapter 9 is the most mathematical one. If you are short of time, skim it: the Python ideas in it (slicing, copies, `&` versus `and`) also appear elsewhere.
