# Track 2 — Batch 1 launch prompts (CGT cluster, 3 sub-buckets × 3 pages)

**Created:** 2026-05-23 PM by Track 2 manager.
**Purpose:** 3 sub-agent launch prompts for Batch 1 brief drafting. Mirrors `WAVE6_LAUNCH_PROMPTS.md` pattern. User opens 3 separate Claude Code terminals and pastes one prompt per terminal.

**Why separate terminals (not Agent dispatch through manager):** parallel-agent transcripts flood manager context. Each session has its own context budget. Manager polls main's tracker / flags / Q&A files for progress.

**No worktrees needed for Batch 1.** Brief drafting only writes new files into separate sub-bucket subdirs — no merge conflicts. Worktrees become necessary only at Phase 3 execution (when sub-agents would edit the same `Property/web/content/blog/` directory).

**Working directory for ALL 3 sessions:** `C:/Users/user/Documents/Accounting/`

**Cross-batch coordination:** sub-agents share `docs/property/track2_page_tracker.md` (only edit their own rows), `docs/property/track2_site_wide_flags.md` (append-only), and the Cannibalisation Index in-flight section. They DO NOT touch each other's sub-bucket subdirs.

---

## Sub-bucket A — CGT reliefs / planning

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket A sub-agent for Batch 1 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT reliefs / planning (3 briefs B1-A1, B1-A2, B1-A3). Output to `briefs/property/track2/batch1_cgt/sub_a/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch1_sub_a.md` via ABSOLUTE PATH. NEVER edit a relative-path copy. Same discipline for tracker, flags, and discovery log.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (§0 norms, §4 brief anatomy, §7 cannibalisation protocol, §9 sub-agent dispatch patterns, §10 tracker convention, §12 Wave 5/6 interlock, §15 quality gates, §17 risk register, §20 glossary)
2. docs/property/NETNEW_PROGRAM.md (§16.18 reasoning-first, §16.31 URL liveness, §16.22+§16.27+§16.30+§16.33+§16.40+ Bill-vs-enacted-Act drift pattern, §16.14+§16.15+§16.37 absolute-path edits, §16.41 Q&A shell template hygiene). These are inherited via the pointers in TRACK2_PROGRAM §10 + §13 + §14.
3. docs/property/house_positions.md — §1-§25 are LOCKED. Particularly for CGT-reliefs cluster: §5 (CGT on UK residential property 2026/27), §15 (IHT — landlord-relevant; for gifting reliefs), §17 (Leaving UK / expat; for non-resident CGT), §21 (LtdCo + FIC; for incorporation comparison and s.455 substitution per FA 2026 35.75% rate), §24 (Form 17 / joint ownership; for spouse-transfer reliefs).
4. docs/property/track2_cannib_index_2026-05-23.md — full file. Source of truth for cannibalisation decisions. §4 Wave 6 candidates section is VOLATILE; re-read this file at the start of your run.
5. The gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. **This is your depth match-target.** Phase 2 briefs must match this brief's data-population depth, not the earlier 3 trial briefs' structure-only depth.

**Your 3 briefs (output paths):**
- B1-A1: `briefs/property/track2/batch1_cgt/sub_a/cgt-deferral-strategies-property-investors-uk.md`
- B1-A2: `briefs/property/track2/batch1_cgt/sub_a/reduce-cgt-property-disposal-uk.md`
- B1-A3: `briefs/property/track2/batch1_cgt/sub_a/cgt-property-sold-loss-claim-capital-losses.md`

**Per-brief workflow:**
1. Mark 🟡 stage2_drafting in `docs/property/track2_page_tracker.md` (your row in the Batch 1 Sub-bucket A table) before starting work.
2. Run `python -m optimisation_engine.track2.pull_page_data --slug <slug> --days 90` to pull all Supabase data (GSC + GA4 + competitor_serps + competitor_pages + page_content_map + competitor_gap_reports). Capture every section for the brief's "Current page snapshot" and "GSC angle" sections.
3. Read the actual markdown source at `Property/web/content/blog/<slug>.md` in full.
4. **Read closest-existing siblings on-site** (the rewritten CGT siblings — see `track2_universe_2026-05-23.md` excluded list + look for `cgt-*` shipped slugs). Cross-link map at brief drafting time, not execution time.
5. **WebFetch 3-5 competitor URLs** from sitemap cache (`briefs/property/_sitemap_cache_v2/`) — search for relevant URLs first via `grep -hoE 'https://[^"]*<keyword>[^"]*' briefs/property/_sitemap_cache_v2/*.json` then WebFetch each. **Every URL must return 200 to be cited; flag dead URLs.** Per §16.31 + F-7 PIM hallucination lesson.
6. **WebFetch 3-5 authority URLs** (legislation.gov.uk / gov.uk HMRC manuals / case-law). Verify URL liveness AND statute content (per F-8 lesson: TCGA 1992 s.4 URL is live but content gutted by FA 2019; never cite a section number without confirming content present). Particular care: **s.455 rate substituted by FA 2026 from 33.75% to 35.75% effective 6 April 2026** (per Wave 6 F-9); **April 2027 surcharge §7 lock status must be verified fresh** (FA 2026 enacted may have changed Bill-vs-enacted state of those rates — confirm at write time).
7. Apply §7 cannibalisation reasoning per Track 2A status codes (REWRITE / REDIRECT-PROPOSED / SKIP-NO-ACTION / FLAG-MANAGER). Append to Cannibalisation Index §7 (in-flight section) as you decide each.
8. Draft the brief at the output path using the §4 template in TRACK2_PROGRAM.md. Match the gold-reference brief's depth (every "(pending...)" must be replaced with real data; no placeholders).
9. Run the 7 quality gates (TRACK2_PROGRAM §15) on each brief before marking it done.
10. Mark 🟢 brief_drafted in tracker. If you couldn't complete (blocker), keep 🟡 + flag via Q&A.
11. Append any discoveries to `docs/property/track2_discovery_log_batch1_sub_a.md` (absolute path).
12. Append any flags (CANNIBAL / HOUSE_POSITION_CONFLICT / STALE_FIGURES / URL_DEAD / new gap-mode etc.) to `docs/property/track2_site_wide_flags.md` (absolute path) using format `F-N | YYYY-MM-DD HH:MMZ | SEVERITY | SLUG | tag | summary`.

**Hard constraints (do NOT violate):**
- Do NOT touch any wave5_*, wave6_*, or NETNEW_PROGRAM file
- Do NOT touch `topic_gaps_final.md` or `house_positions.md` (read-only)
- Do NOT touch Sub-bucket B or C's output subdirs (`batch1_cgt/sub_b/`, `batch1_cgt/sub_c/`)
- Do NOT touch the trial briefs (`briefs/property/track2/trial/`) except as read-only reference
- Do NOT touch the deprecated DeepSeek-era briefs at `briefs/property/<slug>.md` top-level
- Do NOT commit anything during your run. Manager commits at batch close.

**Output to chat when complete:** brief summary listing the 3 slugs + their final Cannib status + URLs verified count + key findings (e.g., "B1-A2 was REDIRECT-PROPOSED to <sibling> because <reason>"). The user pastes this back to the manager terminal.

**Time estimate:** 90-120 minutes for 3 briefs (~30-40 min per brief at gold-reference depth).
```

---

## Sub-bucket B — CGT disposal + reporting

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket B sub-agent for Batch 1 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT disposal + reporting (3 briefs B1-B1, B1-B2, B1-B3). Output to `briefs/property/track2/batch1_cgt/sub_b/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch1_sub_b.md` via ABSOLUTE PATH. NEVER edit a relative-path copy.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (full)
2. docs/property/NETNEW_PROGRAM.md (§16.18, §16.31, §16.22/§16.27/§16.30/§16.33/§16.40+ Bill-vs-enacted, §16.14/§16.15/§16.37, §16.41)
3. docs/property/house_positions.md — particularly §5 (CGT 2026/27), §17 (NRCGT 60-day), §19 (MTD ITSA — for CGT reporting interaction), §21.1 (s.455 substitution to 35.75%).
4. docs/property/track2_cannib_index_2026-05-23.md (full)
5. The gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` — depth match-target.

**Your 3 briefs (output paths):**
- B1-B1: `briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-complete-guide.md`
- B1-B2: `briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-rule.md`
- B1-B3: `briefs/property/track2/batch1_cgt/sub_b/cgt-reporting-deadlines-property-2026.md`

**CRITICAL — INTRA-BATCH CANNIBAL PAIR:**
B1-B1 and B1-B2 are **intra-residual near-duplicates** of each other (both 60-day-cgt-reporting pages). You MUST decide which is canonical and which becomes REDIRECT-PROPOSED. Use GSC primary-query data from `pull_page_data.py` to decide — whichever has stronger GSC signal becomes canonical, the other proposes redirect to it. ALSO: both may be CANNIBAL against `cgt-payment-deadlines-property-sales-2026` (rewritten Session C #23, shipped 2026-05-21). Verify against that rewritten sibling — possibly all 3 of B1-B1/B1-B2/B1-B3 should be REDIRECT-PROPOSED to the rewritten sibling. Use real GSC data to decide.

**Per-brief workflow:** identical to Sub-bucket A workflow steps 1-12. Q&A file is `track2_questions_batch1_sub_b.md`; discovery log is `track2_discovery_log_batch1_sub_b.md`; tracker rows are Batch 1 Sub-bucket B.

**Hard constraints:** identical to Sub-bucket A (don't touch Sub-bucket A or C output, don't touch wave files, don't touch trial briefs, don't commit).

**Output to chat when complete:** brief summary listing 3 slugs + final Cannib status + URL count + cannibal resolution decision for B1-B1/B1-B2 pair + key findings.

**Time estimate:** 90-120 minutes.
```

---

## Sub-bucket C — CGT scenarios (life events)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket C sub-agent for Batch 1 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT scenarios — divorce / inheritance / spouse transfer (3 briefs B1-C1, B1-C2, B1-C3). Output to `briefs/property/track2/batch1_cgt/sub_c/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch1_sub_c.md` via ABSOLUTE PATH. NEVER edit a relative-path copy.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (full)
2. docs/property/NETNEW_PROGRAM.md (§16 lessons; particularly Bill-vs-enacted pattern + §16.41)
3. docs/property/house_positions.md — particularly §5 (CGT 2026/27), §15 (IHT — landlord-relevant), §24 (Form 17 / joint ownership / spouse-mechanics — LOCKED 2026-05-23), §17 (Leaving UK; non-resident CGT for inherited property cases). **§24 is your primary locked position for B1-C3 (spouse transfer)**; the rewrite must match the §24 framing locked at Wave 5.
4. docs/property/track2_cannib_index_2026-05-23.md
5. Gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`

**Your 3 briefs (output paths):**
- B1-C1: `briefs/property/track2/batch1_cgt/sub_c/cgt-divorce-property-transfer-tax-implications.md`
- B1-C2: `briefs/property/track2/batch1_cgt/sub_c/cgt-inherited-rental-property-calculation-uk.md`
- B1-C3: `briefs/property/track2/batch1_cgt/sub_c/cgt-property-transfer-spouse.md`

**CROSS-WAVE CROSS-LINKS (mandatory at brief drafting):**
- B1-C2 (inherited rental property) must cross-link to **Wave 2 A7** `inheriting-uk-rental-property-executors-step-by-step` (shipped) — that's the executor walkthrough, this is the CGT-applied angle
- B1-C3 (spouse transfer) must cross-link to **Wave 5 C7** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` (shipped 2026-05-23) AND **Wave 5 C2** `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` (shipped 2026-05-23)
- B1-C1 (CGT on divorce) has **topic adjacency to Track 2B candidate #2** (SDLT-on-divorce) — note in discovery log for Wave 7+ planning

**Per-brief workflow:** identical to Sub-bucket A workflow steps 1-12. Q&A file is `track2_questions_batch1_sub_c.md`; discovery log is `track2_discovery_log_batch1_sub_c.md`; tracker rows are Batch 1 Sub-bucket C.

**Hard constraints:** identical to Sub-bucket A.

**Output to chat when complete:** brief summary + cross-link decisions made for each brief + key findings.

**Time estimate:** 90-120 minutes.
```

---

## Manager polling pattern (for the user)

When the 3 sub-agents are running in their terminals, the **manager session (this terminal)** can be paused. The user returns to the manager when:

1. A sub-agent posts a chat summary back — the user pastes it to manager, manager logs to TRACK2_PROGRAM §3 heartbeat
2. A Q&A file gets an entry — the user can ask the manager "answer Q-1 in sub_a's Q&A" and manager polls + answers
3. All 3 sub-agents finish — user pastes all 3 chat summaries, manager runs the 7 quality gates across all 9 briefs, commits batch, reports

**While sub-agents run, the manager is idle.** That's the design — context-cheap for the manager, parallel throughput on the briefs.

---

## End-of-batch close protocol (manager — me, when sub-agents return)

1. Read all 3 Q&A files for any unanswered questions
2. Read all 3 discovery logs for cross-batch flags
3. Read `track2_site_wide_flags.md` for new F-flags raised during batch
4. Read all 9 brief files (or spot-check 3 random + read the cannibal-resolution decisions)
5. Run 7 quality gates per TRACK2_PROGRAM §15
6. Cross-check Wave 6 state — are there new collisions or new house positions?
7. Update tracker: confirm all 9 rows ✅ brief_drafted (or document blockers)
8. Update TRACK2_PROGRAM §3 heartbeat with batch close summary + flag count
9. Commit the batch: 9 brief files + tracker + flags + Q&A + discovery as one batch commit
10. Report to user with the cannibal resolutions + flag summary + Phase 2 scale decision recommendation

---

## Files this batch creates / updates

**Creates (per sub-bucket, in `briefs/property/track2/batch1_cgt/sub_<x>/`):**
- 3 briefs each = 9 total brief files

**Updates (shared, concurrency-safe via row-only-yours discipline):**
- `docs/property/track2_page_tracker.md` — sub-agents mark their own rows 🟡 → 🟢

**Appends (sub-bucket isolated, no conflict):**
- `docs/property/track2_questions_batch1_sub_<x>.md` — 1 per sub-bucket
- `docs/property/track2_discovery_log_batch1_sub_<x>.md` — 1 per sub-bucket
- `docs/property/track2_site_wide_flags.md` — shared, append-only

**Never touches:**
- Any wave5_*, wave6_*, NETNEW_PROGRAM, house_positions, topic_gaps_final file
- The trial briefs at `briefs/property/track2/trial/`
- The deprecated DeepSeek briefs at `briefs/property/<slug>.md` top-level
- Each other's sub-bucket output subdirs
