# Universal Modder: a guided reading

This is a guided tour of **universal-modder**, an open-source toolkit that lets AI coding agents mod PC games. You will read real Python code, written by people who use it every day, and see *why* each piece is written the way it is.

It is meant as an **alternative way to study**. Instead of reading about Python or English in the abstract, you read a real project in English, and every time the code uses a Python idea from your notes, there is a link to it.

::: claves
- **Reading time:** about 4 hours (between 3 and 5, depending on how many runnable blocks you try and how many links you follow), in 17 chapters grouped in 6 parts. Each chapter takes 10 to 20 minutes.
- **Language:** everything is in English, at a B2 level. Technical words are explained the first time they appear.
- **Code:** the excerpts come from the real repository (folder `um/`). Blocks marked **▶ Ejecutar** are small simplified versions you can run right here.
- **Links:** a link with a small arrow (↗) takes you to the exact section of your Python or English notes.
:::

## How the links work

When the text says, for example, that a function is a [[py:6#7|closure]], you can click the link. The app opens the Python note at that section, and a button appears at the top:

> **← Volver a «…»**

Click it (or press your browser's Back button) and you are back **at the same place** in this reading, ready to continue. You can follow several links in a row: the button always takes you one step back.

There are two kinds of links:

- **Python links** point to your *Python (EPAM)* notes: the concept behind the code you are reading.
- **English links** appear in the *English corner* box at the end of each chapter. They point to your *Inglés (EPAM)* notes and explain a grammar point that appears in the project's comments and documentation.

## What you will read

| Part | Chapters | What it is about |
|---|---|---|
| **I · The big picture** | 1–2 | What the project does, who uses it, and how the repository is organised. |
| **II · The CLI skeleton** | 3–4 | How typing `um scan` ends up calling a Python function; the helpers every module shares. |
| **III · Scanning games** | 5–7 | Finding installed games, reading binary files, and guessing which engine a game uses. |
| **IV · Making assets** | 8–11 | Image processing with Pillow and NumPy; talking to AI image services over HTTP. |
| **V · Windows and video** | 12–13 | Controlling other programs with `subprocess`; classes that record a game window; building videos. |
| **VI · Safety, knowledge and tests** | 14–17 | Backups, a security linter, a knowledge base of Markdown notes, the test suite, and a summary of patterns. |

## How to read it

::: tip
**Read the code before the explanation.** Each excerpt is followed by a short explanation. Try to guess what the code does first, as you would in the EPAM exam ("What is the output of the following code?"), and then check.

You don't need to read in order, but Parts I and II give context that the rest uses.
:::

- **You don't need to install anything.** You never run the real toolkit here: it needs Windows, games, Blender or an API key. The runnable blocks are standalone versions of the same ideas.
- **If a sentence is hard,** read it again slowly. The English is the same kind you will find in technical documentation, so it is good practice for the test too.
- **About the code:** universal-modder is released under the MIT licence, and the excerpts are quoted from its public repository for study.
