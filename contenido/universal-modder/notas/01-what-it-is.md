# 1 · What universal-modder is

**Modding** a game means changing it: adding a weapon, a new enemy, a whole civilization, or even putting one game inside another. It is hard work. You have to find out which **engine** the game uses (Unity, Unreal, Source...), which tools the community already built, how to read the game's code, how to make art and sound, and how to test the result in the real game.

universal-modder bets that an **AI coding agent** (a program like Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot or OpenCode, which can read files and run commands) can do most of this work, if it gets three things:

1. **instructions** on how to approach the job;
2. **tools** for the parts that are tedious or technical;
3. **memory** of what other agents already learned.

The repository provides exactly those three things.

## The three ingredients

| Ingredient | Where | What it is |
|---|---|---|
| **Skills** | `skills/*/SKILL.md` | Markdown files with step-by-step instructions for the agent: how to do recon, how to reverse-engineer a file format, how to make sprites, how to record a video. |
| **The `um` command** | `um/` (Python) | A command-line tool with ten groups of commands: `scan`, `fal`, `comfy`, `sprite`, `render3d`, `video`, `win`, `backup`, `publish` and `kb`. |
| **The knowledge base** | `knowledge/` | *Field notes*: Markdown files, written by agents, that explain how a specific game was modded and which traps they found. |

The skills tell the agent **what** to do; the `um` command does the **mechanical work**; the knowledge base stops each agent from **rediscovering** the same problems.

This reading is about the second ingredient, the Python code. But you will see how the code is designed around the other two.

## The loop

The main skill, *mod-any-game*, describes the same loop for every project:

1. search the knowledge base;
2. recon (find out the engine, the anti-cheat, the existing mod loaders), then pick a **route**;
3. set up a safe lab, with the save files backed up;
4. read the actual code of the game;
5. build one small working piece (a *vertical slice*);
6. generate the assets (sprites, 3D models, sounds);
7. verify in the real game;
8. record a video;
9. package the mod;
10. write a field note for the next agent.

Most of the Python code maps to one of these steps:

| Step | Command | Chapters |
|---|---|---|
| 1, 10 | `um kb` | 15 |
| 2 | `um scan` | 5, 6, 7 |
| 3 | `um backup` | 14 |
| 6 | `um fal`, `um comfy`, `um sprite`, `um render3d` | 8, 9, 10, 11, 13 |
| 7, 8 | `um win`, `um video` | 12, 13 |
| 9 | `um publish` | 14 |

## What has been built with it

The README lists three worked examples:

- **Terraria:** a mod with a homing missile launcher, a tactical nuke, new enemies and a boss. Every sprite was generated with fal, an AI image service.
- **Age of Empires II:** a new civilization whose units were rendered from 3D models at the game's camera angle.
- **Minecraft inside GTA V:** two mods that talk to each other over a local connection, so that real Minecraft is drawn inside GTA V's world.

## The rules

The project has strict rules, and some of them are enforced **by the code itself**:

- **Only games the user owns:** single-player, multiplayer, or servers the user hosts. Never online games protected by anti-cheat, never cheats against other players, never bypassing DRM.
- **Never ship game files or decompiled code.** The command `um publish check` (chapter 14) looks for exactly that before a mod is shared.
- **Back up saves before touching them:** `um backup` (chapter 14).
- **Kill processes by exact PID, never by name pattern:** `um win kill` (chapter 12) only accepts a number.
- **Ask the human first** before moving the mouse and keyboard, installing loaders or publishing anything.

::: idea
Notice the design: a rule written in a skill is just advice, but a rule built into a tool is much harder to break by accident. When you read `kill(pid)` in chapter 12, remember that it only takes a PID **on purpose**.
:::

## Why Python?

The toolkit is a **glue** program: it reads files, calls web services, starts other programs (PowerShell, ffmpeg, Blender) and processes images. Python is good at this because the standard library already includes almost everything: `json`, `re`, `zipfile`, `hashlib`, `struct`, `urllib`, `subprocess`, `argparse`... This is the *batteries included* idea from your notes ([[py:11#9|the standard library]]).

The project needs only **three** external packages:

| Package | Used for |
|---|---|
| **Pillow** | Opening, editing and saving images (chapter 8). |
| **NumPy** | Fast operations on whole arrays of pixels or sound samples (chapter 9). |
| **PyYAML** | Reading the metadata at the top of each field note (chapter 15). |

Keeping dependencies few is itself a design choice: the agent can install and run the tool almost anywhere, and there is less that can break.

::: nota English corner
- **Imperatives for rules:** *"Never touch online clients"*, *"Back up saves"*, *"Ask first"*. Rules and instructions use the base form of the verb with no subject. In your notes, see [[en:1#El sujeto nunca se omite|the subject in English]]: imperatives are the one place where English drops it.
- ***before* + -ing:** *"Ask first **before driving** the user's mouse"*. After a preposition the verb takes *-ing*: [[en:10#El -ing como sustantivo|gerund after prepositions]].
- **Present perfect for results:** *"Other agents **may** already **have written** down the exact versions"*: a modal + perfect, for something that possibly happened before now. See [[en:6#Deducción: qué tan seguro estás|deduction with modals]].
- **Phrasal verbs:** *set up* a lab, *write down* what you learned, *back up* the saves. See [[en:13#Phrasal verbs|phrasal verbs]].
:::
