# 16 · Lectura de textos técnicos

Ya leés bien: entendés casi todo si vas despacio. El problema en el examen es el **tiempo** y las **trampas** de las opciones. Esta unidad muestra qué tipos de pregunta hay, cómo resolver cada uno en menos de un minuto y cuatro textos cortos sobre IA, software y trabajo para practicar.

::: claves
- **Leé primero la pregunta**, después buscá en el texto.
- **La respuesta correcta casi nunca repite las palabras del texto:** las dice con otras (*paraphrase*). Desconfiá de la opción que copia frases textuales.
- **Opciones con *always, never, all, only, completely*** suelen ser falsas: los textos técnicos hablan con prudencia (*hedging*, unidad 15).
- **Inferencia** = lo que el texto da a entender, **no** lo que vos sabés del tema.
- **Referencia** (*"What does 'it' refer to?"*): buscá **hacia atrás** el sustantivo más cercano que concuerde en número.
- **Vocabulario en contexto:** reemplazá la palabra por cada opción y fijate cuál mantiene el sentido de **esa** oración.
:::

## Tipos de pregunta

| Tipo | Cómo aparece | Cómo se resuelve |
|---|---|---|
| **Idea principal** | *What is the main idea of the text?* / *What is the best title?* | Leé el primer y el último párrafo. Descartá las opciones demasiado **específicas** (un detalle) o demasiado **generales**. |
| **Detalle** | *According to the text, ...* / *Which of the following is mentioned?* | Buscá la palabra clave de la pregunta en el texto y leé esa oración y la siguiente. |
| **No mencionado / falso** | *Which of the following is NOT mentioned?* / *NOT true* | Tachá las que **sí** aparecen; la que queda es la respuesta. |
| **Inferencia** | *What can be inferred...?* / *The author suggests / implies that...* | La respuesta no está escrita, pero se deduce **directamente** de lo que dice el texto. No agregues información tuya. |
| **Vocabulario en contexto** | *The word "X" in paragraph 2 is closest in meaning to...* | Probá cada opción en la oración. Ojo con el significado más común de la palabra: puede no ser el de ese contexto. |
| **Referencia** | *What does "they" / "this" / "it" refer to?* | Buscá hacia atrás un sustantivo que concuerde (*they* → plural). *this* puede referirse a toda una idea. |
| **Propósito y tono** | *Why does the author mention X?* / *What is the author's attitude?* | Mirá los conectores (*however*, *for example*) y los adjetivos valorativos. Un ejemplo sirve para **ilustrar** una idea. |

::: tip
**Las señales de la estructura** (unidad 12) dicen dónde está la información:

- después de ***however, but, although*** suele venir lo que el autor **realmente** piensa;
- ***for example, such as*** traen detalles: casi nunca son la idea principal;
- ***therefore, as a result*** traen conclusiones: buen lugar para preguntas de inferencia.
:::

## Texto 1 · *Why language models make things up*

> *Large language models (LLMs) such as ChatGPT are trained to predict the next word in a sequence. After processing enormous amounts of text, they become remarkably good at producing sentences that sound natural and confident. However, sounding right is not the same as being right.*
>
> *Because these models generate text based on statistical patterns rather than a database of verified facts, they sometimes produce information that is plausible but false. Researchers call this "hallucination". A model might, for instance, invent a scientific paper that does not exist, complete with a convincing title and author names.*
>
> *Developers have proposed several ways to reduce the problem. One of the most common is retrieval-augmented generation (RAG), in which the model is given relevant documents before it answers. This grounds its response in real sources. Even so, no current technique eliminates hallucinations completely, which is why experts recommend that users verify any important information.*

::: pregunta What is the main idea of the text?
- [ ] LLMs are trained on a database of verified scientific papers.
- [x] LLMs can produce convincing but false information, and this can be reduced but not eliminated.
- [ ] Retrieval-augmented generation has completely solved the problem of hallucinations.
- [ ] ChatGPT is more reliable than other language models.
::: solucion Explicación
El texto presenta el problema (párrafos 1 y 2: suenan bien pero pueden inventar), una solución parcial (RAG) y la conclusión de que **no se elimina por completo**. La primera opción contradice el texto (*rather than a database of verified facts*), la tercera es demasiado absoluta (*completely*, cuando el texto dice *no current technique eliminates hallucinations completely*) y la cuarta no se menciona.
:::
:::

::: pregunta According to the text, why do LLMs hallucinate?
- [ ] Because they are trained on too little text.
- [ ] Because developers program them to invent information.
- [x] Because they generate text from statistical patterns, not from verified facts.
- [ ] Because they cannot produce natural-sounding sentences.
::: solucion Explicación
Pregunta de **detalle**: *Because these models generate text based on statistical patterns rather than a database of verified facts, they sometimes produce information that is plausible but false.* La respuesta lo dice con otras palabras (*paraphrase*). La primera contradice *enormous amounts of text*, y la cuarta contradice *remarkably good at producing sentences that sound natural*.
:::
:::

::: pregunta The word "grounds" in paragraph 3 is closest in meaning to:
- [ ] punishes
- [ ] separates from
- [x] bases on
- [ ] hides
::: solucion Explicación
**Vocabulario en contexto:** RAG le da documentos al modelo y eso "*grounds its response in real sources*": **apoya, basa** su respuesta en fuentes reales. *ground* también significa "suelo" o "dejar sin salir" (a un chico, a un avión), pero acá ninguno de esos sentidos funciona.
:::
:::

::: pregunta What can be inferred from the last sentence?
- [x] Users should not fully trust an LLM's answer on important matters without checking it.
- [ ] LLMs should not be used at all.
- [ ] RAG makes verification unnecessary.
- [ ] Experts never use language models.
::: solucion Explicación
**Inferencia:** si los expertos recomiendan verificar la información importante, es porque **no conviene confiar del todo** en la respuesta. La segunda y la cuarta van mucho más allá de lo que dice el texto (*at all*, *never*), y la tercera lo contradice.
:::
:::

## Texto 2 · *Technical debt*

> *The term "technical debt" was coined by programmer Ward Cunningham to describe the long-term cost of choosing a quick solution instead of a better one. Like financial debt, it is not necessarily bad: a team might deliberately take a shortcut to meet an important deadline. The problem arises when the debt is never repaid.*
>
> *Over time, quick fixes accumulate. Code becomes harder to understand, and every new feature takes longer to build because developers must work around old problems. This extra effort is often described as the "interest" on the debt.*
>
> *Successful teams treat technical debt as something to be managed rather than avoided at all costs. Many of them reserve a fixed percentage of each sprint for refactoring, and they keep a visible list of known issues so that the debt does not remain hidden. In this way, they can balance the need to deliver quickly with the need to keep the codebase healthy.*

::: pregunta According to the text, technical debt is:
- [ ] always a sign of poor programming skills.
- [x] acceptable in some situations, as long as it is eventually repaid.
- [ ] a type of financial loan that software companies take.
- [ ] something that successful teams avoid completely.
::: solucion Explicación
El texto dice *it is not necessarily bad: a team might deliberately take a shortcut... The problem arises when the debt is never repaid.* La primera y la cuarta son absolutas (*always*, *completely*) y la cuarta además contradice *managed rather than avoided at all costs*. La tercera confunde la **comparación** (*Like financial debt*) con lo que el término significa.
:::
:::

::: pregunta In paragraph 2, what does the "interest" on the debt refer to?
- [ ] The money a company pays to a bank.
- [x] The extra time and effort needed because of old quick fixes.
- [ ] The developers' interest in learning new technologies.
- [ ] The number of new features a team builds.
::: solucion Explicación
**Referencia:** *This extra effort is often described as the "interest"*. *This extra effort* remite a lo anterior: cada función nueva tarda más porque hay que esquivar problemas viejos. La primera toma el sentido financiero literal, y la tercera usa el otro significado de *interest* (interés por algo).
:::
:::

::: pregunta What does "they" refer to in "so that the debt does not remain hidden. In this way, they can balance..."?
- [ ] known issues
- [ ] sprints
- [x] successful teams
- [ ] developers who take shortcuts
::: solucion Explicación
**Referencia:** *they* es plural y es el sujeto de *can balance*; el que reserva tiempo, lleva una lista y logra equilibrar es el mismo sujeto de todo el párrafo: ***Successful teams***. *known issues* y *sprints* son plurales, pero no pueden "equilibrar" nada.
:::
:::

::: pregunta Why does the author mention reserving "a fixed percentage of each sprint"?
- [ ] To criticise teams that work too slowly.
- [x] To give an example of how teams manage technical debt.
- [ ] To show that refactoring is a waste of time.
- [ ] To explain where the term "technical debt" comes from.
::: solucion Explicación
**Propósito:** la oración anterior dice que los buenos equipos gestionan la deuda; *Many of them reserve a fixed percentage...* es un **ejemplo concreto** de esa gestión. No hay crítica en el texto, y el origen del término está en el primer párrafo.
:::
:::

## Texto 3 · *The hybrid office*

> *When offices closed in 2020, many technology companies discovered that their employees could work productively from home. Developers, in particular, reported fewer interruptions and more time for focused work. Not everyone benefited equally, however. Junior employees often found it harder to learn without colleagues nearby, and some people felt isolated.*
>
> *As a result, most companies have now adopted a hybrid model, in which employees spend part of the week in the office and part at home. Supporters argue that this combines the best of both worlds: quiet days for deep work and office days for collaboration and mentoring. Critics, on the other hand, point out that hybrid schedules can be difficult to coordinate, especially in global teams spread across several time zones.*
>
> *There is no single right answer. What seems clear is that the traditional five-day office week is unlikely to return for most software teams.*

::: pregunta Which of the following is NOT mentioned as a disadvantage of remote or hybrid work?
- [ ] It can be harder for junior employees to learn.
- [ ] Some people may feel isolated.
- [x] Remote employees tend to be less productive.
- [ ] Hybrid schedules can be difficult to coordinate.
::: solucion Explicación
Tachá las que sí aparecen: *Junior employees often found it harder to learn*, *some people felt isolated*, *hybrid schedules can be difficult to coordinate*. La productividad **no** aparece como desventaja: el texto dice lo contrario, *employees could work productively from home*.
:::
:::

::: pregunta According to the text, why did companies adopt the hybrid model?
- [ ] Because employees refused to return to the office.
- [x] Because remote work had clear benefits but also some problems.
- [ ] Because global teams prefer working in the office.
- [ ] Because the government required it.
::: solucion Explicación
***As a result*** (párrafo 2) conecta con el párrafo 1: el trabajo remoto tuvo beneficios (menos interrupciones) **y** problemas (aprendizaje de los juniors, aislamiento). El modelo híbrido es la **consecuencia** de esas dos cosas. Las otras opciones no aparecen en el texto.
:::
:::

::: pregunta What is the author's conclusion?
- [ ] The hybrid model is the perfect solution for every company.
- [ ] Most software teams will soon return to the office five days a week.
- [x] It is unlikely that most software teams will go back to a full-time office schedule.
- [ ] Remote work should be banned for junior employees.
::: solucion Explicación
El último párrafo: *the traditional five-day office week is **unlikely** to return*. La respuesta lo dice con otras palabras. La primera contradice *There is no single right answer*, y la segunda dice lo contrario de la conclusión.
:::
:::

## Texto 4 · *The weakest link*

> *Companies spend millions on firewalls, encryption and threat detection, yet the most common way attackers get into a system has hardly changed in twenty years: they simply ask. In a phishing attack, the criminal sends an email that appears to come from a trusted source, such as a bank or a colleague, and persuades the victim to click a link or share a password.*
>
> *Modern phishing messages are far more convincing than the badly written emails of the past. Attackers now use AI tools to write fluent, personalised messages, and some even imitate the voice of a company executive in phone calls. Consequently, security experts argue that technology alone cannot solve the problem.*
>
> *Instead, they recommend regular training so that employees learn to recognise warning signs: unexpected urgency, requests for confidential information, or links to unfamiliar websites. Combined with multi-factor authentication, which makes stolen passwords far less useful, this approach significantly reduces the risk.*

::: pregunta What is the main point of the first paragraph?
- [ ] Firewalls and encryption are useless.
- [x] Despite large investments in technology, attackers often succeed by tricking people.
- [ ] Phishing attacks only target banks.
- [ ] Attacks have become much more technical in the last twenty years.
::: solucion Explicación
***yet*** (sin embargo) marca la idea central: aunque se gastan millones en tecnología, la forma más común de entrar *has hardly changed... they simply ask*. La primera es exagerada (el texto no dice que sean inútiles), la tercera confunde un **ejemplo** (*such as a bank*) con algo exclusivo, y la cuarta contradice *has hardly changed*.
:::
:::

::: pregunta The word "Consequently" in paragraph 2 introduces:
- [ ] a contrast with the previous idea.
- [ ] an example of a phishing message.
- [x] a result of the previous idea.
- [ ] a new topic unrelated to the previous one.
::: solucion Explicación
***Consequently*** = como consecuencia (unidad 12). Como los mensajes ahora son muy convincentes (gracias a la IA), los expertos concluyen que la tecnología sola no alcanza: es un **resultado** de lo anterior.
:::
:::

::: pregunta What can be inferred about multi-factor authentication?
- [ ] It prevents all phishing emails from arriving.
- [x] It protects an account even if an attacker obtains the password.
- [ ] It replaces the need for employee training.
- [ ] It is the main reason why phishing has become more convincing.
::: solucion Explicación
El texto dice que la autenticación multifactor *makes stolen passwords far less useful*: se deduce que protege la cuenta **aunque** roben la contraseña. La primera es falsa (no frena los emails), la tercera contradice *Combined with*, y la cuarta no tiene relación con el texto.
:::
:::
