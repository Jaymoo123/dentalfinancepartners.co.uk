# Property Wave 2 — Session C Q&A channel

Append-only. Only Session C and the manager write here.

## Lifecycle

1. Session appends a question block with `STATUS: open`.
2. Session **spawns a Monitor task** on this file watching for the `STATUS: answered` flip (see §8.4 of NETNEW_PROGRAM.md). The session keeps working on a different page or step while waiting.
3. Manager-side watcher (~20s latency) detects the open question, manager reads, drafts answer, appends `### Manager answer [TIMESTAMP]` block, flips STATUS `open` → `answered`.
4. Session-side watcher fires on the flip, session re-reads, acts, continues.

## Question format

```
## [Q-N] [YYYY-MM-DDThh:mmZ] [CATEGORY] Title  STATUS: open
- **Page being worked on:** <slug>
- **Blocker?** yes / no (yes = forward progress halted; no = continue on a different step)
- **Question:** <text>
- **My current best guess:** <text — helps manager calibrate>
```

After manager answers, the block continues with:

```
### Manager answer [YYYY-MM-DDThh:mmZ]
<text>
```

And the STATUS line at the top of the question flips to `STATUS: answered`.

## Manager-initiated notes (M-N)

Format: `## [M-N] [YYYY-MM-DDThh:mmZ] [MANAGER NOTE] Title`. Session re-reads on next poll. M-notes don't trigger the watcher (manager isn't asking themselves a question).

---

(questions below — none yet)
