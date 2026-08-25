# Net-New Content Program — Reusable Engine

**Type:** Site-agnostic engine doc. Reuse VERBATIM for any niche site (property, medical, dentists, solicitors, generalist, contractors-ir35).

**Companion:** Every run of this engine pairs with a **per-site state doc** that holds the site's specifics (counts, slugs, queues, stash refs, statute ground-truth, `house_positions` content, deploy hashes). The engine doc is the HOW; the state doc is the WHAT-for-this-site. Do not put site facts in this file.

This engine is the methodology behind the "wave / megawave" rolling-architecture program that, on Property, produced ~420 net-new pages. Everything below is true for any site. Where a Property fact is the clearest worked example of a mechanism, it is labelled **(example, Property)** and the rule itself is stated site-neutrally.

---

## 1. Purpose & when to use

**Purpose.** Generate large batches of net-new, ranking-grade pages that fill topic and competitor gaps for a niche lead-gen site, at high quality, with zero cannibalisation against existing pages and zero regression to existing rankings.

**Use this engine when:**
- A site has a discovered topic-gap pool (candidate slugs that competitors cover and the site does not) large enough to run in batches.
- The site has enough GSC/competitive signal to justify deepening (strongest-signal site first; do not run on a site too new to have organic data).
- The work is net-new page creation. (Rewriting existing legacy pages is a sibling program — the Track-2 ranking-grade rewrite engine — not this one.)

**Strategic constraints (apply to every site):**
- Zero cannibalisation (token-level pre-check + body-level session check + cross-session check).
- Ranking-grade quality (the six-check verification floor per page; matches or beats specialist competitors).
- No regression to existing rankings (each new page registered in a `monitored_pages`-style table with a regression detector over a fixed dwell window).
- Lead-gen handoff model: anonymised social proof only, no pricing on-page, no real client names; the LeadForm is auto-injected at the footer (never duplicated in the body).
- Voice: no em-dashes in user-facing copy (commas, parentheses, full stops, middle dots instead); semantic HTML only (no utility CSS classes in markdown body).

---

## 2. Pipeline

The program runs as a sequence of **waves** (small, ~30 pages, single fresh session per bucket) or **megawaves** (large, ~60 pages, rolling bounded-batch orchestration per lane). Both share the same conceptual phases. The megawave rolling architecture is the mature form; waves are the simpler predecessor.

```
GAP DISCOVERY  ->  WAVE COMPOSITION  ->  PREP  ->  LAUNCH/RUN  ->  WRAP  ->  DEPLOY + INDEX
```

### 2.1 Gap discovery (program-level, refreshed periodically)
Build/refresh the candidate pool: crawl competitor sitemaps, classify topical URLs, run a token-similarity check against the current existing-page inventory, and emit a narrowed candidate pool plus a delta against the prior baseline. Output is a topic-pool file plus a dated delta chain. (See §4.)

### 2.2 Wave composition
Slice the next batch from the pool. For megawaves this is mechanical: `slice-megawave` reads the topic pool, excludes already-shipped slugs, applies cluster→megawave affinity, distributes picks across three buckets/lanes (A/B/C, ~20 each), and emits `picks.yaml` plus `queue_{A,B,C}.jsonl` (one row per pick, `status: pending`). For a wave it is a user-confirmed cluster/theme + rough pick count written into `picks.yaml`.

### 2.3 Rolling-architecture phases

**PREP** — Everything before any page is written:
1. **Cannibalisation audit** of the slice against current `main` (which already contains prior waves). Manager + user audit the partial-overlap rows; any "already covered" pick is replaced.
2. **House-positions extension** — lock figures/statutes/framings for the wave's topics into the site's `house_positions` doc (the tie-breaker doc that overrides any competitor source).
3. **Stage 1 (seed briefs)** — three parallel sub-agents (one per bucket) emit brief skeletons. **Reasoning-first, not Python** (do not let an agent default to a similarity script for selection; it breaks on novel topical clusters).
4. **Stage 1b (HP-lock review)** — conductor gate. Read flags + seed briefs, verify every statutory anchor against primary sources, write HP-lock corrections to `house_positions` as isolated commits, then sign off (`stage1b_signed_off.flag`).
5. **Stage 2 (full briefs)** — three parallel sub-agents extend seeds to full briefs, with a mandatory live-URL check (WebFetch every competitor URL, confirm HTTP 200 + on-topic, delete dead/invented ones) and a mandatory statutory-citation cross-check (every section/schedule/paragraph WebFetched against primary law, verbatim title quoted back).
6. **Stage 2b (drift triage)** — conductor gate. Spot-check briefs against HP-locks for statutory mis-attribution; close any new drift flags; sign off (`stage2b_signed_off.flag`).
7. **Launch-prompt scaffold** — generate the RUN-phase prompts + per-bucket START_HERE files from the prior wave's templates; conductor edits bucket descriptions, slug lineup, drift watchpoints.

**LAUNCH / RUN** — Page authoring:
- Worktrees stood up (one per lane), each ff-verified to current `main`; gitignored deps (`.env`, untracked DB helper modules) copied in.
- RUN-phase sub-agents are spawned per bounded batch (default 6 picks/batch) and write pages following the per-page workflow (§ below). The orchestrator claims a batch, hydrates a prompt, spawns the sub-agent, polls for the completion marker + tracker cross-check, then loops to the next batch until the queue drains and writes a `lane_<X>_done.flag`.
- Manager arms the Q&A watcher (polls the per-session question files every ~20s for `STATUS: open`) and attends pings, replying inline.

**WRAP (close-wave)** — Validate, merge, build, back-patch:
1. **validate** — tracker all-done check.
2. **Pre-merge HP corrections** — conductor gate: for each HIGH/CRITICAL flag apply HP corrections as isolated commits.
3. **audit** — commit the audit trail (tracker + flags + discovery + Q&A).
4. **merge** — merge each lane branch into `main` (`git merge --no-ff` per lane; see §6 for why this is manual on megawaves).
5. **build** — green build verification on `main`.
6. **Post-merge back-patches** — conductor gate: for each `EXISTING_PAGE_STALE` flag, patch the named existing page (one commit per page or per mechanical sweep). Decompose into (a) in-wave forward-link patches needing live-page knowledge (manager), (b) mechanical grep+reframe sweeps (sub-agent, told NOT to commit and NOT to touch newly-merged pages), (c) middleware redirect adds (manager, single file).

**DEPLOY + INDEX** — User-gated:
- **Deploy gate** — surface a one-line close summary; wait for explicit user "deploy".
- Deploy via the site's CLI workflow (project-id swap, prod deploy from repo root, restore), then submit the new URLs to IndexNow.
- Update the program heartbeat (state doc §3) with pages shipped, flag count, wall-clock, open-question count (should be 0), deploy hash + prod URL.

### 2.4 The conductor's role at each phase
The **conductor** (a `/run-wave`-style skill or the `megawave-autopilot` state machine) is the glue across siloed sessions. It owns no content; it sequences scripts and pauses at the irreducible judgment gates. The conductor:
- Detects current state from filesystem signals (markers, lane-done flags, sign-off flags) and advances to the next gate.
- Auto-advances everything mechanical (slice, cannib, dispatch, wait-for-markers, marker synthesis, back-patch sweep, merge, build).
- **Halts at exactly three judgment gates:** Stage 1b HP-lock review, Stage 2b drift triage, deploy approval. These are conductor/user judgment that scripts cannot replicate. Skipping them scatters errors across ~30-60 pages.
- Auto-proceeds on stage-completion signals (RUN close, lane-done, marker) without asking yes/no; pauses only at the three gates.

---

## 3. Artifact types and their roles

Per-wave files live under `docs/<site>/` (named `wave<N>_*` or `megawave<N>_*`); briefs and signals under `briefs/<site>/<wave>/`. One line each:

- **discovery_log** (`*_discovery_log_session_{A,B,C}.md`) — per-session, append-only log of observations for FUTURE waves (adjacent topics, calculator/component ideas, future picks, site-wide patterns). No action needed in-wave; manager reads at close to feed the next slice.
- **site_wide_flags** (`*_site_wide_flags.md`) — shared, append-only flag log for issues that are actioned or cross-session (HOUSE_POSITION_CONFLICT/EXTENSION, BRIEF_DRIFT, EXISTING_PAGE_STALE, INTERNAL_LINK, CROSS_BUCKET, REDIRECT, SCHEMA, AUTHORITY_GAP). Flags never block. Per-bucket F-number ranges avoid collisions.
- **page_tracker** (`*_page_tracker.md`) — the load-bearing live diagnostic: one row per pick with status (todo / in-progress / done / blocked / needs-back-patch), batch, body words, FAQ count, monitored-page ID, and a one-line note. Sessions edit it in `main` via ABSOLUTE PATH (never the worktree copy). "Are sessions running right now" is answered by the tracker + `git status`, not by the Q&A files.
- **questions** (`*_questions_session_{X}.md`) — per-session Q&A channel for blockers requiring manager arbitration. Sparse by design. `## [Q-N] ... STATUS: open` → manager answers inline + flips to `answered`. Also carries manager-initiated `## [M-N]` broadcasts.
- **cannibalisation_check** (`*_cannibalisation_check.md`) — pre-wave audit of the slice vs all existing pages: net-new / partial-overlap / covered, with manager decisions on the partial rows. The PREP gate that prevents writing a page the site already has.
- **HP_LOCK drafts** (`STAGE_1B_HP_LOCK_DRAFTS.md`, `STAGE_2B_HP_LOCK_DRAFTS.md`, review packs) — staging area where the conductor drafts the house-position lock entries before committing them into the canonical `house_positions` doc at the sign-off gates.
- **queue_*.jsonl** (`briefs/<site>/<wave>/queue_{A,B,C}.jsonl`) — the per-lane work queue. One JSON row per pick (`slug`, `label`, `batch_id`, `pick_id`, `cluster`, `status`). The batch-claim primitive flips `pending`→`claimed` atomically so parallel lane orchestrators never double-claim. Reset to `pending` between phases (Stage 1 → Stage 2 → RUN).
- **topic_gaps_* delta chain** (`topic_gaps_first_cut.md` → `topic_gaps_final.md` → dated `topic_gaps_delta_*.md`) — the program-level gap-discovery output. `final` is the narrowed candidate pool; each `delta` is a dated re-sweep against a refreshed competitor universe, classified into net-new / partial / covered. Deltas are NOT merged into the pool without manager review (raw "net-new" counts are an UPPER bound, not the actionable pool — most carry overlap once re-checked against current inventory).
- **`_signals/` dir** (`briefs/<site>/<wave>/_signals/`) — orchestration scratch: per-batch prompts, launcher scripts, completion markers (`batch_<id>_done.json`), lane-done flags, stage sign-off flags, deploy flag, autopilot state.

---

## 4. Gap-analysis inputs

The candidate pool is built from three inputs, combined into the topic_gaps delta chain:

1. **Topic-gap discovery** — competitor domains are crawled for their topical URL inventory; URLs are filtered (token-count band, property/tax topic tokens, exclusions for news/marketing/foreign-language/date-prefixed/person-name slugs), then classified.
2. **Competitor sitemaps / SERP-derived universe** — the competitor universe should be SERP-frequency-derived (which domains actually rank for the site's queries, at what position) rather than a hand-curated seed list, and should be SHARED with the per-page-rewrite track's competitor pipeline. A hand-curated seed under-discovers.
3. **Cannibalisation check vs existing pages** — every candidate slug+title+h1+meta is token-compared (Jaccard) against every existing page: **≥0.55 = covered (drop); 0.30–0.55 = partial (manager review); <0.30 = net-new (keep)**. Run pre-EVERY-wave against current `main` (the inventory grows each wave). **Caveat:** token-Jaccard breaks on novel topical clusters whose slugs share few tokens with existing pages (it returns false neighbours and misses obvious ones); use reasoning (or embeddings) to regenerate closest-existing for novel clusters, and treat the static check as triage only. The body-level cannibalisation check is the session's job (read closest-existing before writing; decide applied-vs-deeper differentiation; raise a CANNIBAL flag if two existing pages substantially overlap).

---

## 5. Quality gates

### 5.1 The three conductor judgment gates (irreducible)
- **Stage 1b — HP-lock review.** Read all seed-brief flags; for each statutory anchor, verify against primary sources (legislation.gov.uk full enacted-Act PDF when per-section fetch returns only summary); write corrected HP-locks as isolated commits; sign off. The manager's own dispatch prompt is NOT authoritative — verify every statute it names too.
- **Stage 2b — drift triage.** Spot-check 3-5 full briefs per bucket against HP-locks for section/schedule/paragraph mis-attribution; close new drift flags; sign off.
- **Deploy gate.** Surface the close summary; deploy ONLY on explicit user instruction. Push back once if asked to skip a quality pause, then comply and log the skipped pause as a deliberate risk.

### 5.2 The six-check per-page floor
Every committed page must pass: 0 em-dashes in body; 0 utility CSS classes in body (semantic HTML only); FAQ schema count in built HTML == frontmatter `faqs:` array length (10-14 FAQs); meta title ≤62 chars; meta description ≤158 chars; every internal link resolves to an existing page. Body word count: non-pillar ~2,800-3,500, pillar ~3,500-4,500 (overshoot needs a work-log justification). Report BODY words (total includes frontmatter/FAQ-JSON inflation of ~1,000-1,500).

### 5.3 The Bill-vs-enacted-Act drift discipline
This is the program's signature defence and it never decays. **Any locked position drafted from announcement-era / Bill-drafting / pre-reform / "verify before relying" material is liable to drift against the enacted text by the time the next wave touches it.** The discipline is layered, every layer verifying against primary sources:
- **Pre-wave statute verification** of newly-locked or hedged positions (sub-agent, structured per-section report).
- **Stage 1b** verifies HP-lock statutory anchors AND surfaces drift in adjacent existing positions (do not fix in place; surface as a catch; manager triages).
- **Stage 2** statutory-citation cross-check catches per-page brief-seed citations that Stage 1b never sees (Stage 1a seeds carry additional citations closer to write-time).
- **Per-write** verification: every session WebFetches gov.uk/primary law for every numeric rate/threshold/allowance before committing.
- **Sessions reading old content for cannibal differentiation become drift sensors** — they raise `EXISTING_PAGE_STALE` flags on adjacent stale content; the flag→back-patch cycle is the system catching itself.

Expectations: budget the close-phase back-patch step in PROPORTION to the wave's statutory novelty (new-statute buckets surface far more `EXISTING_PAGE_STALE` flags than stable-statute buckets). A zero-Q&A wave is a **prep-quality** signal, not a zero-defect signal — drift catches still happen, they just happen at prep/write time instead of as blockers.

---

## 6. Drift patterns + fixes (orchestration failure modes)

These are mechanical orchestration drifts in the rolling architecture, distinct from the statutory drift in §5.3. All have known fixes baked into the autopilot/orchestrator; a manager picking up mid-wave should recognise them on sight.

- **Sub-agents commit to the worktree branch instead of `main` (markers/tracker drift).** Root cause: at RUN, `cwd=worktree` (page output must land in the worktree's content dir), so a sub-agent's relative-path `git add` resolves against the worktree filesystem and commits land on the worktree branch, not `main`. The orchestrator polls `main` and blocks. **Fixes:** (a) for Stage 1/Stage 2 (brief work that belongs on `main`), spawn with `cwd=repoRoot` not worktree; (b) for RUN, accept that page commits live on the worktree branch and reconcile at close via **manual `git merge --no-ff <wave>-<lane>` of each lane branch into `main`** (this is why megawave merges are done directly, not through the wave-named close script). Tracker/flags/Q&A always go to `main` via ABSOLUTE PATH regardless of cwd.
- **Worktree-only markers (gitignored `*.json`).** A sub-agent writes its completion marker to the worktree's `_signals/` dir and never commits it; the orchestrator polling `main` never sees it. **Fix:** manager copies the marker from the worktree to `main`'s signal dir, or the autopilot's marker auto-synthesis step reconstructs the canonical marker from the lane branch's commit log.
- **Marker-filename drift (`_stage2_` / `_run_` infix).** A sub-agent writes `batch_<id>_stage2_done.json` (or `_run_done.json`) while the orchestrator polls the canonical `batch_<id>_done.json`. **Fix:** one-line rename / copy to the expected name (autopilot does this automatically by checking the alt-name variants first).
- **Empty-commit / wrong-format markers.** A sub-agent puts the marker info in a commit message only (no file), or writes a YAML `.flag` instead of canonical JSON. **Fix:** manager synthesises the canonical JSON marker.
- **Post-batch silent stall.** A sub-agent goes idle after a batch closes without claiming the next. **Fix:** manager synthesises the closed batch's marker from worktree commits and restarts the lane orchestrator (it resumes from where the queue left off via the batch-claim primitive).
- **Premature tracker flip.** Manager flips a tracker row to done before the commit lands → orchestrator writes a false `lane_done.flag`. **Fix:** roll back the false flag, relaunch the lane orchestrator. Order rule: commit BEFORE marking done.
- **Watcher false-fire.** A Q&A shell template containing literal `STATUS: open` example text matches the watcher's grep on first poll. **Fix:** use non-matching placeholders in templates; or count monotonic `## [Q-N]` headings rather than STATUS lines; or initialise watcher state to the current count at arm time.

General manager discipline: when a manager assertion is challenged by direct user observation, re-verify against first-principles signals (`git status`, file mtimes, per-worktree `git log`) BEFORE re-asserting. Dirty working tree on `main` mid-wave is INTENDED (active sessions writing tracker/flags via absolute paths), not a problem.

---

## 7. Applying to a NEW site checklist

When starting this engine on the next site, reuse this doc verbatim and do the following:

1. **Write the per-site state doc** (`docs/<site>/NETNEW_PROGRAM_STATE.md` or equivalent) with: brand/domain, current page count, deployed-vs-held state, the `house_positions` doc location, and a heartbeat section (§3-style "where we are now").
2. **Confirm the site has enough signal** to justify net-new deepening (GSC organic data; a real competitive set). If too new, defer (deepen a stronger site instead).
3. **Build/refresh the gap pool** for the site: SERP-derived competitor universe → topical-URL crawl → cannibalisation check vs the site's existing inventory → `topic_gaps_final.md` + dated delta. Treat raw net-new counts as an upper bound.
4. **Create the site config** the scripts read: paths (repoRoot, docsDir, briefsDir, content/blog dir), wave sizing (batchSize, megaWaveSize), Vercel project/org IDs, and a `<site>.megawave-affinity.json` (cluster→megawave + bucket assignment).
5. **Establish the site's `house_positions` doc** — the tie-breaker for figures/statutes/framings. Seed it with the site's core ground-truth (the per-site state doc holds the actual content). This is where all statute facts live, NOT this engine doc.
6. **Verify the scripts are site-parameterised** (`-Site <key>` flows through slice / check-cannib / scaffold / orchestrator / autopilot / deploy-and-index). The Property scripts are already site-keyed; confirm the new site's config resolves.
7. **Run wave/megawave composition** (`slice-megawave -Site <site> -MegaWave 1`), then drive the conductor (`/run-wave` or `megawave-autopilot -Site <site> -MegaWave 1`) through PREP → RUN → WRAP, halting at the three judgment gates.
8. **Carry the disciplines forward verbatim:** reasoning-first brief seeding; Stage 2 URL + statutory cross-check; the layered Bill-vs-enacted-Act verification; the six-check per-page floor; absolute-path tracker/flags/Q&A; commit-before-mark-done; manual `--no-ff` lane merges; deploy only on explicit user instruction.
9. **Watch the platform deploy limits** as the corpus grows (e.g. the Vercel ISR `blog.fallback` 19.07 MB oversized-page ceiling) — record the threshold and workaround in the per-site state doc, not here, since the trigger point is site-specific.
10. **Update the site's heartbeat** at every wave close and write a handover line before stopping if context fills.


---

## 8. Coverage selection: choosing subjects by measured demand (added 2026-08-17)

This section replaces "competitors have a URL we do not" as the selection rule. It exists because a
2026-08-17 measurement showed the current rule produces pages that mostly earn nothing: across 760
Property posts, the median page earns **54 impressions in 90 days**, the mean is 390, and the top 10%
of pages hold **72% of impressions and 77% of clicks**. Volume of pages is not the problem. Selection
is.

### 8.1 The unit: an eligibility gap, not a topic gap

An eligibility gap is a subject where **we earn zero impressions on either engine** and a
**peer-authority site already ranks**. The distinction matters because two different constraints are
at work (evidence: `docs/property/STRUCTURE_VS_COMPETITORS_2026-08-17.md`):

- Where we already appear, position is gated by domain trust, and on-page changes tested null. Same
  pages sit at average position 12.0 on Google and 5.4 on Bing, which is not a content difference.
- Where we do not appear at all, eligibility comes first. You cannot be outranked on a query you were
  never eligible for. This is the part a new page fixes.

Measured on Property SDLT: of 1,600 keywords competitors rank for, **we appear on 114 (7%)** and are
absent from 1,486 (93%).

### 8.2 The selection rules (all four must hold)

1. **We are absent.** Zero impressions on the subject's keywords across GSC (90d) and Bing (91d).
2. **A peer already ranks.** At least one specialist firm (not gov.uk, MoneyHelper, MSE, a bank, a
   national brand) holds a top-20 position on the subject. This is the proof that a site of our class
   can appear at all.
3. **The demand is in the realistic band.** Subject volume between 100 and 5,000 a month per keyword.
   Above that the SERP belongs to national brands; below it there is nothing to win. (Property SDLT:
   188 keywords and 86,310 monthly searches survive all three filters, out of a 1.82M raw gap.)
4. **No page of ours is the subject already.** Checked by impressions AND by subject match, not by
   slug tokens. If a page of ours is already the subject, the correct action is EXTEND on that page,
   not a new page.

Everything failing rule 2 or 3 is recorded with its reason, never silently dropped.

### 8.3 The page spec CHANGES: length floor withdrawn

§5.2 sets 2,800-3,500 words for non-pillar and 3,500-4,500 for pillar. **That floor is withdrawn for
coverage pages.** Measured on 2026-08-17, competitor pages holding top-10 positions run **777 to
1,900 words** (provestor's SDLT silo, which holds 58 top-10 slots, runs 274 to 985), while our median
page runs 4,350. Length is not the differentiator and the floor is manufacturing the wrong shape.

Coverage page spec:

- **800 to 1,200 words.** Longer only where the subject genuinely needs it, with a work-log reason.
- **The subject is the title**, in the words people search, not the mechanism name.
- Question-shaped H2s; the answer, with the number, in the first sentence under each.
- **One current tax year leads.** Historical rates go in a subordinate block. (Property median page
  currently names five different tax years.)
- Direct address at 25+ per 1,000 words; statute references below 4 per 1,000 in the opening half.
  (Winners run 0.1 statute references per 1,000 words; our median page runs 9.3.)
- Every other §5.2 check still applies: no em-dashes, semantic HTML, FAQ schema parity, meta lengths,
  internal links resolve, and the full statute-verification discipline in §5.3.

### 8.4 Measurement and kill criteria

Cohort-based, because per-page noise is large:

- Register every page in `monitored_pages` with both engines' baselines at zero.
- **Bing at 28 days** is the first read (Bing indexes our new pages within weeks and ranks the corpus
  at 5.4 against Google's 12.0). **Google at 90 days** is the second.
- **Base rate to beat:** 26% of existing pages reach 200+ impressions per 90 days; the median page
  reaches 54.
- **Success:** cohort median above 200 impressions at 90 days, i.e. the selection rule beats a random
  page from the existing corpus by roughly 4x.
- **Kill:** cohort median below 100 impressions at 90 days. That would mean demand-based selection is
  no better than the topic-gap rule it replaced, and the programme stops rather than scaling.

Run ONE cohort of 12 to 15 pages in a single cluster before any second cohort is authorised.

### 8.5 What this costs

Data: about $0.50 per cluster for the uncapped competitor keyword harvest (DataForSEO), plus free GSC
and Bing pulls. Writing: Opus per page, per §2. No new tooling: the gap register, the ledger and the
page inventory are the same artefacts built for the rewrite track's dossier (`REWRITE_PROGRAM.md` §9),
read with a different filter.
