# Humanise Program — Reusable Engine

**Type:** Site-agnostic engine doc. Reuse VERBATIM for any niche site (property, dentists, solicitors, medical, generalist, contractors-ir35).

**Companion:** every run pairs with a **per-site state doc** (`docs/<site>/HUMANISE_PROGRAM_STATE.md`) that holds the site's specifics (counts, worklist, deploy hashes, heartbeat, how-to-resume). The engine doc is the HOW; the state doc is the WHERE-WE-ARE. The voice rulebook is `docs/_engines/VOICE_STANDARD.md`. Per-site tuning is `sites/<site>.json` "voice".

This engine turns an existing corpus into a genuinely human-voiced version **one page at a time**, with zero loss of facts and zero queries left on the floor, verified to a gold-standard bar, every page committed to git, and the whole run **resumable by a fresh agent** when context fills.

---

## 1. Purpose & when to use

**Purpose.** The corpus is factually strong but reads robotic (abstract-noun voice, meta-commentary, leaked SEO/orchestration vocabulary, signposting, padding; see `VOICE_STANDARD.md`). This engine rewrites the **voice** of each page while a deterministic guard freezes every fact, citation, link, and query.

**Use when:** a site has a corpus large enough to need a managed, resumable, self-verifying sweep, and quality must be guaranteed page-by-page (not a one-shot batch).

**Core invariant.** Python detects, scores, and verifies deterministically. Opus (4.8 only; never DeepSeek/Haiku) reasons and rewrites. A human signs off the voice once on a proof batch. **Nothing factual is ever changed**, enforced by `voice_safety_diff.py` + `track2_query_coverage.py`, not by trust.

---

## 2. Components

| Component | File | Role |
|---|---|---|
| Detector | `scripts/voice_scan.py` | Score reader-facing prose on six signals (S1 abstract-noun voice, S2 meta-commentary, S3 structural/SEO talk, S4 em-dashes, S5 signposting, S6 over-length) -> `robot_score` + band. `--all` writes the ranked manifest. Read-only. |
| Fact guard | `scripts/voice_safety_diff.py` | `snapshot` / `check` / `restore`. `check` FAILs if any figure, citation, internal link, or protected frontmatter field differs from the pre-edit snapshot. |
| Query guard | `scripts/track2_query_coverage.py` | Re-used as-is: confirms every proven-demand query the page served is still served (no queries on the floor). |
| Rewriter | `scripts/voice_rewrite.wf.js` | Per-page Opus workflow: snapshot -> humanise -> five checks -> revert/retry/escalate. Returns a structured verdict. Does NOT commit. |
| Factual backstop | `scripts/track2_independent_qa.wf.js` + `scripts/qa_verdict.py` | The existing skeptical reviewer (arithmetic re-derived, statutes re-verified) run before deploy. |
| Standard | `docs/_engines/VOICE_STANDARD.md` | The voice rulebook every stage references. |
| Config | `sites/<site>.json` "voice" | Per-site noun list, industry allowlist, weights, bands, ideal lengths. |
| Progress | `docs/<site>/humanise_tracker.md` | One row per PROCESSED page (done / escalate) + a summary. The durable, resumable record. |

---

## 3. The per-page loop

The conductor walks the prioritised worklist and, for each slug, ensures a **clean committed baseline**, then runs `voice_rewrite.wf.js` for that single page. Within the workflow:

1. **Snapshot** the exact pre-edit bytes: `python scripts/voice_safety_diff.py snapshot --slug <slug> --site <site>` -> `optimisation_engine/.cache/humanise/<site>/<slug>.before.md`. This is the rollback source.
2. **Humanise (Opus).** A senior in-niche adviser-editor reads the page and `voice_scan.py --slug <slug> --json` output, then edits the `.md` in place to the `VOICE_STANDARD.md` rules: second person; concrete role over abstract noun (except allow-listed terms and named personas); delete meta-commentary and structural/SEO talk (re-home links into natural prose, never lose one); no em-dashes; no signposting; cut padding, never pad. **Touch no fact, citation, link, or protected frontmatter field.**
3. **The five checks** (cheapest/deterministic first, fail fast):
   - **C1 Safety-diff** (deterministic): `voice_safety_diff.py check`. Every figure/citation/link/protected-frontmatter value identical. *No fact changed.*
   - **C2 Query coverage** (deterministic): `track2_query_coverage.py --slug --json`. Still serves every target query. *No query on the floor.*
   - **C3 Voice re-scan** (deterministic): `voice_scan.py --slug --json`. Band dropped to `clean`/`minor` AND `robot_score` below the pre-score. *Voice actually improved.*
   - **C4 Independent QA** (Opus, skeptical): re-derive arithmetic, re-verify statutes at legislation.gov.uk, facts current, links resolve, no cannibalisation. *Full factual backstop.*
   - **C5 Human-voice read** (Opus, fresh lens): original vs rewrite side by side. Genuinely human now AND nothing substantive lost/distorted. *Guards against "made it worse / dropped meaning".*
4. **Pass** (all five): the workflow returns `status: done`; the conductor commits the single `.md` + the tracker row and pushes.
5. **Fail** (any check): `voice_safety_diff.py restore` reverts the page to the snapshot bytes; feed the specific failure back into the Humanise prompt; retry. Bounded (default 3 attempts).
6. **Exhausted**: after the cap, restore the original (nothing degraded ships), mark the tracker `escalate` with reasons, move on.

Sequential, one page at a time, by design: it keeps each commit atomic, each verification clean, and the whole run resumable.

---

## 4. Prioritisation (worst-scored among real-traffic pages)

1. `python scripts/voice_scan.py --all --site <site>` -> ranked manifest (`optimisation_engine/.cache/voice_scan_<site>.json`).
2. Join `robot_score` with GSC impressions per slug (the existing GSC pipeline / `optimisation_engine/track2/pull_page_data.py`).
3. Worklist = pages with band >= `robotic` first, then `minor`, ordered by **(has real impressions desc, robot_score desc)**. Pages scoring `clean` are skipped (no Opus spend).
4. **Exclusions:** skip any slug a concurrent agent is actively editing (record the exclusion set in the state doc) and any slug already `done`/`escalate` in the tracker.

---

## 5. Resumability — how a fresh agent picks up

The run survives context exhaustion because all state is durable:
- **The tracker** (`docs/<site>/humanise_tracker.md`, committed) records every processed page. `done` rows are never reprocessed.
- **The manifest** (`voice_scan_<site>.json`) is the ranked worklist.
- **Git history**: one commit per humanised page is a second, independent progress record.

**Resume procedure (a fresh agent runs this verbatim):**
1. Read `docs/_engines/HUMANISE_PROGRAM.md` (this file), `docs/_engines/VOICE_STANDARD.md`, and the site state doc `docs/<site>/HUMANISE_PROGRAM_STATE.md`.
2. Confirm you are in the humanise worktree (the state doc names its path) on branch `<site>-humanise`. `git -C <worktree> status`.
3. `python scripts/voice_scan.py --all --site <site>` to refresh the manifest.
4. Build the worklist (Section 4). Subtract slugs already `done`/`escalate` in the tracker and the concurrent-agent exclusion set.
5. Take the top slug and run the per-page loop (Section 3). Commit + push on `done`. Update the tracker. Repeat.
6. Update the state-doc heartbeat before stopping; write a one-line handover.

---

## 6. Git workflow

- Work in a dedicated worktree (`<repoParent>/Accounting-wt-<site>-humanise`) on branch `<site>-humanise`, so a concurrent agent in the main tree is undisturbed. Copy `.env` into the worktree (DB-dependent QA/coverage stages need it).
- **Surgical, per-page commits**: `git add <blogDir>/<slug>.md docs/<site>/humanise_tracker.md` then commit. Never `git add -A` (the working tree may carry other agents' changes). Message: `Humanise: <slug> (robot NN.N -> MM.M)`.
- Push after each page (or small group). Open a PR into the site branch / `main` when the sweep completes; the factual backstop + `predeploy_gate.py --voice` run before any deploy; deploy + IndexNow only on explicit user instruction.
- Per-page commits give granular `git revert` if any single page is judged wrong later.

---

## 7. Quality gates (irreducible)

- **The five per-page checks** (Section 3) gate every page; a page ships only if all pass.
- **Voice sign-off (once):** before the full sweep, run a proof batch (worst ~10-15 trafficked pages) and pause for explicit human sign-off on the voice. This is the one judgement gate a script cannot replace.
- **Pre-deploy:** `predeploy_gate.py --site <site> --voice` (warn-first; `--voice-strict` once the sweep completes) + the `qa_verdict` factual backstop. Deploy only on explicit user instruction.

---

## 8. Applying to a NEW site

1. Confirm `sites/<site>.json` exists with `paths.blogContentDir`; add a `voice` block (copy property's, then tune `abstractNouns` + `industryAllowlist` to the sector: dentists "associate/principal", solicitors "fee earner", etc.).
2. Add the site to the `SITES` map in `scripts/voice_rewrite.wf.js`.
3. `python scripts/voice_scan.py --selftest` then `--all --site <site>`; calibrate weights/bands against a known-good page (should score low) and a known-bad page (should score high).
4. Write `docs/<site>/HUMANISE_PROGRAM_STATE.md` from property's, and create `docs/<site>/humanise_tracker.md`.
5. Stand up the worktree, run a proof batch, get sign-off, sweep worst-first, deploy on instruction.
