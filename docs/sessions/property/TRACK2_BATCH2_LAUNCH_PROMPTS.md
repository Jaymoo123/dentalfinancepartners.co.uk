# Track 2 — Batch 2 launch prompts (CGT cluster continuation, 3 sub-buckets × 3 pages)

**Created:** 2026-05-24 PM by Track 2 manager.
**Purpose:** 3 sub-agent launch prompts for Batch 2 brief drafting. Mirrors Batch 1 pattern. User opens 3 separate Claude Code terminals and pastes one prompt per terminal.

**Why separate terminals (not Agent dispatch through manager):** parallel-agent transcripts flood manager context. Each session has its own context budget. Manager polls main's tracker / flags / Q&A files for progress.

**No worktrees needed for Batch 2.** Brief drafting only writes new files into separate sub-bucket subdirs — no merge conflicts. Worktrees become necessary only at Phase 3 execution.

**Working directory for ALL 3 sessions:** `C:/Users/user/Documents/Accounting/`

**Cross-batch coordination:** sub-agents share `docs/property/track2_page_tracker.md` (only edit their own rows), `docs/property/track2_site_wide_flags.md` (append-only), and the Cannibalisation Index in-flight section. They DO NOT touch each other's sub-bucket subdirs.

**Intra-batch CANNIBAL coordination CRITICAL for Batch 2:** Sub-bucket B's B2-B1 brief (PRR general) and Sub-bucket C's B2-C2 brief (s.222(5) PRR election) share PRR territory. The two sub-agents MUST coordinate via Q&A files (`track2_questions_batch2_sub_b.md` + `..._sub_c.md`) to differentiate scope or decide REDIRECT-into-each-other. Don't both draft full PRR depth.

**What's new since Batch 1 launched (state delta to read):**
- **Wave 6 CLOSED 2026-05-24** (commits `3808019` → `0805d07`). 30 new pages on main (LtdCo extraction + Trusts + Capital allowances). Cannib Index §2 now 181 net-new shipped.
- **Decision #1 resolved** (commit `5316bea`): `incorporate-rental-property-without-cgt.md` FAQ #4 back-patched 28% → 24%.
- **Decision #2 resolved** (commit `6769942`): TMA 1970 s.43 4-year claim deadline recommendation appended to wave6 flags.
- **Wave 6 F-9 s.455 → 35.75% LOCKED in §21.1.** No need for sub-agents to chase this — cite §21.1 verbatim.
- **NEW §16 lessons** (16.41 / 16.42 / 16.43 / 16.44) added at Wave 6 close — see launch prompts for the §16 reading list.
- **Cannib Index refreshed** for Wave 6 close + Batch 2 in-flight stub seeded.

---

## Sub-bucket A — CGT reporting cluster-collapse (F-16 continuation)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket A sub-agent for Batch 2 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT reporting cluster-collapse continuation (3 briefs B2-A1, B2-A2, B2-A3 — F-16 candidates from Batch 1 close). Output to `briefs/property/track2/batch2_cgt/sub_a/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch2_sub_a.md` via ABSOLUTE PATH. NEVER edit a relative-path copy. Same discipline for tracker, flags, and discovery log.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (§0 norms, §4 brief anatomy, §7 cannibalisation protocol, §9 sub-agent dispatch patterns, §10 tracker convention, §12 Wave-N interlock, §15 quality gates, §17 risk register, §20 glossary)
2. docs/property/NETNEW_PROGRAM.md §16 lessons: §16.18 reasoning-first, §16.31 URL liveness, §16.22+§16.27+§16.30+§16.33+§16.40 Bill-vs-enacted-Act drift pattern (now 12+ consecutive catches), §16.14+§16.15+§16.37 absolute-path edits, §16.36 statutory-citation cross-check gate, §16.38 manager-prompt-drift-is-real, §16.41 watcher-template / first-principles diagnosis hygiene, **§16.42 EXISTING_PAGE_STALE density tracks statutory novelty + adjacent-content age** (Wave 6 close pattern — expect to surface site-wide STALE flags on adjacent residual CGT pages while reading them for cannib differentiation), **§16.43 sub-agent STALE-sweep dispatch validated** (for manager — informs Batch 2 close patterns), **§16.44 WebFetch summarizer can hide HTML table content** (trust session-time captures when secondary verification can't reproduce).
3. docs/property/house_positions.md — §1-§25 LOCKED. Critical for Sub-bucket A: §5 (CGT 2026/27 — 18%/24% residential post-FA-2024, AEA £3,000), §17 (Leaving UK / NRCGT 60-day rule + post-FA-2019 rates), §21.1 (s.455 LOCKED at 35.75% per FA 2026 — but Sub-bucket A is CGT not corporation tax, so likely not relevant unless brief touches LtdCo CGT comparator), §24 (Form 17 / joint ownership — relevant if any brief touches joint-owner 60-day mechanics).
4. docs/property/track2_cannib_index_2026-05-23.md — full file. Source of truth for cannibalisation decisions. **§7 has the Batch 2 in-flight stub with your 3 slugs already listed with hypothesis status; verify hypothesis against real GSC at brief drafting time.**
5. The gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. **This is your depth match-target.**
6. **Batch 1 sub-bucket B's three REDIRECT-PROPOSED briefs at `briefs/property/track2/batch1_cgt/sub_b/` — these are your template for REDIRECT-PROPOSED brief structure.** Your 3 briefs are likely all REDIRECT-PROPOSED (cluster-collapse continuation); use Batch 1 sub-bucket B's exact format/depth/cannib-table pattern.

**Your 3 briefs (output paths):**
- B2-A1: `briefs/property/track2/batch2_cgt/sub_a/how-to-report-property-sale-hmrc-60-days.md`
- B2-A2: `briefs/property/track2/batch2_cgt/sub_a/report-property-sale-hmrc-60-days-guide.md`
- B2-A3: `briefs/property/track2/batch2_cgt/sub_a/capital-gains-tax-selling-rental-property-uk.md`

**CRITICAL — F-16 CLUSTER COLLAPSE HYPOTHESIS:**
- B2-A1 + B2-A2 are intra-residual near-duplicates (both 60-day-CGT reporting pages); hypothesis = both REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026` (rewritten Session C #23 on 2026-05-21 — same canonical Batch 1 Sub-bucket B trio resolved to). Use GSC data to verify: pull primary queries for both, compare against the canonical's primary queries. If overlap >50%, REDIRECT. If a slug has substantial unique GSC signal not absorbed by the canonical, REWRITE.
- B2-A3 is a DIFFERENT cluster-collapse hypothesis: REDIRECT-PROPOSED to `cgt-selling-buy-to-let-property-calculation-guide` (rewritten 2026-05-21 — different canonical from the 60-day pair). Per Cannib Index §6 cross-source pair this is the natural collapse target. Verify via GSC.

**Per-brief workflow:**
1. Mark 🟡 stage2_drafting in `docs/property/track2_page_tracker.md` (your row in the Batch 2 Sub-bucket A table) before starting work — via ABSOLUTE PATH.
2. Run `python -m optimisation_engine.track2.pull_page_data --slug <slug> --days 90` to pull all Supabase data. Capture every section for the brief.
3. Read the actual markdown source at `Property/web/content/blog/<slug>.md` in full.
4. **Read the rewritten canonical's source** (`Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` for B2-A1+A2; `Property/web/content/blog/cgt-selling-buy-to-let-property-calculation-guide.md` for B2-A3) — that's your REDIRECT target; need to confirm it absorbs the residual's intent.
5. **WebFetch 3-5 competitor URLs** for the residual page's primary query. Per §16.31 + F-7 + §16.44 (WebFetch summarizer can hide table content — if a URL is suspicious, dispatch fresh fetch or flag as ambiguous).
6. **WebFetch 3-5 authority URLs** (legislation.gov.uk for TCGA s.222 / FA 2019 Sch 2 / FA 2022 Sch 5 / TMA 1970 s.43 / gov.uk consumer pages on CGT property reporting). Verify URL liveness AND statute content per §16.36 + F-8 + F-13 + F-18 patterns (the program has 12+ consecutive Bill-vs-enacted-Act drift catches — expect to surface a 13th somewhere on adjacent statute). **F-13 RESOLVED 2026-05-24 commit `a103a04`** — the canonical's FA 2019 "sections 222 to 233" hallucination is back-patched; cite the back-patched language.
7. **Cite TMA 1970 s.43 directly from legislation.gov.uk** for any brief touching the 4-year capital loss claim deadline (no house position lock yet; Track 2 recommendation filed in wave6 flags commit `6769942`).
8. Apply §7 cannibalisation reasoning per Track 2A status codes. Append your slug + decision to Cannibalisation Index §7 Batch 2 in-flight table.
9. Draft the brief at the output path using the §4 template (REDIRECT-PROPOSED variant — see F-17 Batch 1 lesson about the template feeling padded in the body-content sections + undersized in the workflow section; use the compressed form Batch 1 Sub-bucket B established).
10. Run the 7 quality gates (TRACK2_PROGRAM §15) on each brief before marking it done.
11. Mark 🟢 brief_drafted in tracker (absolute path).
12. Append discoveries to `docs/property/track2_discovery_log_batch2_sub_a.md` (absolute path). **Expect to surface EXISTING_PAGE_STALE flags per §16.42 pattern.**
13. Append flags to `docs/property/track2_site_wide_flags.md` (absolute path). Continue the F-N numbering from Batch 1's F-20 — Batch 2 starts at F-21.

**Hard constraints (do NOT violate):**
- Do NOT touch any wave5_*, wave6_*, wave7_*, or NETNEW_PROGRAM file
- Do NOT touch `topic_gaps_final.md` or `house_positions.md` (read-only)
- Do NOT touch Sub-bucket B or C's output subdirs (`batch2_cgt/sub_b/`, `batch2_cgt/sub_c/`)
- Do NOT touch the Batch 1 briefs (`briefs/property/track2/batch1_cgt/`) except as read-only reference
- Do NOT touch the trial briefs except as read-only reference
- Do NOT touch the deprecated DeepSeek-era briefs at `briefs/property/<slug>.md` top-level
- Do NOT commit anything during your run. Manager commits at batch close.

**Output to chat when complete:** brief summary listing the 3 slugs + their final Cannib status + canonical-confirmation per REDIRECT decision + URLs verified count + key findings (e.g., "B2-A1 was REDIRECT-PROPOSED to <canonical> because <GSC overlap %>"). The user pastes this back to the manager terminal.

**Time estimate:** 75-90 minutes for 3 REDIRECT-PROPOSED briefs (~25-30 min per brief — shorter than Sub-bucket B+C REWRITE briefs because REDIRECT briefs underrun the body-content template sections).
```

---

## Sub-bucket B — CGT reliefs (PRR / Rollover / Lettings) — REWRITE

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket B sub-agent for Batch 2 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT reliefs — PRR + Rollover + Lettings (3 briefs B2-B1, B2-B2, B2-B3). Output to `briefs/property/track2/batch2_cgt/sub_b/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch2_sub_b.md` via ABSOLUTE PATH. NEVER edit a relative-path copy.

**INTRA-BATCH COORDINATION (CRITICAL):** Your B2-B1 brief (PRR general) shares territory with Sub-bucket C's B2-C2 brief (`cgt-main-residence-election-two-properties`, s.222(5) election mechanics). Sub-bucket C's sub-agent will likely ask you via Q&A how you're scoping PRR — answer promptly so they can decide REWRITE-with-differentiator vs REDIRECT-INTO-yours. Suggested differentiator: B2-B1 is the general PRR theory + Lettings Relief carve-out + nominated-residence-by-default; B2-C2 is the s.222(5) ELECTION mechanics + worked landlord-with-2-properties scenario. If you internalise this differentiator from the start, B2-C2 can stay distinct without coordination overhead.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (full)
2. docs/property/NETNEW_PROGRAM.md §16 lessons: same list as Sub-bucket A — particularly §16.42 (EXISTING_PAGE_STALE density — Lettings Relief especially likely to have pre-April-2020 framing carried site-wide).
3. docs/property/house_positions.md — particularly **§5 LOCKED CGT 2026/27** (this is your primary spine — 18%/24% residential + AEA £3,000 + post-2020 Lettings Relief shared-occupation rule + Companies-pay-Corp-Tax-not-CGT). §6 (FHL post-abolition framing — relevant for rollover-on-FHL edge cases). §15 (IHT — for holdover-vs-rollover comparator pages). §24 (Form 17 / joint ownership — relevant for spousal PRR transfer). §17 (Leaving UK — for non-resident PRR loss).
4. docs/property/track2_cannib_index_2026-05-23.md — full file. **§7 Batch 2 in-flight stub has your 3 slugs with hypothesis status.**
5. The gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` — depth match-target.
6. **Batch 1 sub-bucket A's three REWRITE briefs at `briefs/property/track2/batch1_cgt/sub_a/` — these are your template for REWRITE brief depth.** Match their gold-reference data-population + statute-spine pattern.
7. **Wave 5 C-bucket forward-link partners** — pull `wave5_page_tracker.md` for C-bucket slug list, particularly C7 `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` (your B2-B1 must cross-link to this; their joint-ownership PRR angle is COMPLEMENTARY to your general-PRR brief).

**Your 3 briefs (output paths):**
- B2-B1: `briefs/property/track2/batch2_cgt/sub_b/principal-private-residence-relief-landlords.md`
- B2-B2: `briefs/property/track2/batch2_cgt/sub_b/rollover-relief-property-landlords.md`
- B2-B3: `briefs/property/track2/batch2_cgt/sub_b/letting-relief-landlords-2026-changes.md`

**CRITICAL STATUTE SPINES — verify all at brief drafting time per §16.36:**
- **B2-B1 PRR**: TCGA 1992 ss.222-226A (main residence relief framework) + s.222(5) (election — covered by B2-C2 not here) + s.224 (Lettings Relief restriction). §5 LOCKED post-2020 shared-occupation rule is the spine. **Companies-pay-Corp-Tax-not-CGT** position is locked too — don't repeat the F-9 "Companies pay 19% CGT" error.
- **B2-B2 Rollover**: TCGA 1992 s.152 (the rollover relief itself — "asset used for the purposes of a trade") + s.153 (partial reinvestment) + s.155 (qualifying asset classes). **Critical wrinkle**: rental letting is INVESTMENT (s.832 ITA-meaning of "property income") not TRADE for s.152 purposes — most landlords DON'T qualify unless they fall into the narrow FHL window (which itself was abolished from 6 April 2025 per FA 2025 Sch 5). Cross-reference Wave 6 C8 `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` for the FHL grandfathering picture. Do NOT cite s.169B for rollover — s.169B blocks HOLDOVER (s.260 / s.165), not rollover.
- **B2-B3 Lettings Relief**: TCGA 1992 s.224(1) post-FA-2020 amendment (shared-occupation required during the let period). §5 LOCKED is verbatim. Pre-April-2020 framing ("£40,000 relief if main residence at some point + later let") is OBSOLETE — sub-agent will likely surface site-wide pre-2020 framing on adjacent pages (per §16.42 + F-9 pattern) and raise EXISTING_PAGE_STALE flags. Possible REDIRECT-PROPOSED INTO B2-B1 if post-2020 Lettings is too thin standalone — verify via GSC + word-count assessment.

**Per-brief workflow:** identical to Sub-bucket A workflow steps 1-13. Q&A file is `track2_questions_batch2_sub_b.md`; discovery log is `track2_discovery_log_batch2_sub_b.md`; tracker rows are Batch 2 Sub-bucket B.

**Hard constraints:** identical to Sub-bucket A (don't touch Sub-bucket A or C output, don't touch wave files, don't touch Batch 1 briefs except as reference, don't commit).

**Output to chat when complete:** brief summary listing 3 slugs + final Cannib status + intra-batch coordination outcome with Sub-bucket C re B2-B1 vs B2-C2 PRR scope + URL verification count + key findings.

**Time estimate:** 90-120 minutes for 3 REWRITE briefs at gold-reference depth.
```

---

## Sub-bucket C — CGT applied mechanics (NRCGT / two-prop election / commercial vs residential) — REWRITE

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting/`

```
You are Sub-bucket C sub-agent for Batch 2 of the Track 2 Property Legacy Rewrite Program. Working in the main repo at `C:/Users/user/Documents/Accounting/`. Bucket: CGT applied mechanics — NRCGT + two-property PRR election + commercial vs residential (3 briefs B2-C1, B2-C2, B2-C3). Output to `briefs/property/track2/batch2_cgt/sub_c/`.

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_questions_batch2_sub_c.md` via ABSOLUTE PATH. NEVER edit a relative-path copy.

**INTRA-BATCH COORDINATION (CRITICAL):** Your B2-C2 brief (`cgt-main-residence-election-two-properties`, s.222(5) election mechanics) shares territory with Sub-bucket B's B2-B1 brief (general PRR). At the very start of your run, read Sub-bucket B's tracker row for B2-B1 (note their framing 1-liner + gap-mode hypothesis) — then either: (a) IF the differentiator is clean (B2-B1 = general PRR theory + Lettings Relief carve-out; B2-C2 = election mechanics + worked landlord-with-2-properties scenario), proceed with REWRITE on B2-C2 keeping scope tight to the election; OR (b) IF your B2-C2 GSC signal is thin (low impressions / low query count), consider REDIRECT-PROPOSED INTO B2-B1 with election mechanics absorbed as a §-section in B2-B1. Use Q&A (`track2_questions_batch2_sub_c.md`) to ask Sub-bucket B for scope clarity if needed.

Read first, in this order:
1. docs/property/TRACK2_PROGRAM.md (full)
2. docs/property/NETNEW_PROGRAM.md §16 lessons: same list as Sub-bucket A — particularly §16.42 (NRCGT page B2-C1 is highly likely to surface site-wide pre-FA-2024 28% rate carryovers on adjacent non-resident pages).
3. docs/property/house_positions.md — particularly **§5 LOCKED CGT 2026/27** (rate spine for B2-C1 + B2-C3); **§17.4 LOCKED NRCGT 60-day rule + post-FA-2019 rates** (primary spine for B2-C1 — NRCGT rates are 18%/24% post-FA-2024 NOT pre-FA-2024 28%); §24 (Form 17 / joint ownership — relevant for joint-owner PRR election); §22 (IHT — not primary, but commercial-vs-residential CGT brief B2-C3 should reference BPR commercial-vs-residential treatment for cross-link).
4. docs/property/track2_cannib_index_2026-05-23.md — full file. **§7 Batch 2 in-flight stub has your 3 slugs with hypothesis status + the explicit intra-batch CANNIBAL note.**
5. The gold-reference brief: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` — depth match-target.
6. **Batch 1 sub-bucket C's three REWRITE briefs at `briefs/property/track2/batch1_cgt/sub_c/` — your template for CGT-scenarios REWRITE depth** (divorce / inherited / spouse — gold-reference data-complete pattern at this depth).
7. **Wave 6 Bucket C briefs at `briefs/property/wave6/` for commercial-property capital-allowances cross-link partners** — relevant for B2-C3 (cite W6 C2 balancing allowance, W6 C3 SBA, W6 C5 full expensing, W6 C6 fixtures election as cross-link partners; commercial CGT page should mention commercial CA interaction).

**Your 3 briefs (output paths):**
- B2-C1: `briefs/property/track2/batch2_cgt/sub_c/non-resident-cgt-uk-property-rates-reporting.md`
- B2-C2: `briefs/property/track2/batch2_cgt/sub_c/cgt-main-residence-election-two-properties.md`
- B2-C3: `briefs/property/track2/batch2_cgt/sub_c/cgt-commercial-property-different-residential.md`

**CRITICAL STATUTE SPINES — verify all at brief drafting time per §16.36:**
- **B2-C1 NRCGT**: TCGA 1992 s.1A(3)(b) + s.14B (charge on non-residents — the post-FA-2019 architecture; the OLD s.14D / Sch B1 regime was replaced) + Sch 1 TCGA 1992 (rates by class) + TMA 1970 Sch 2 (return) + FA 2019 Sch 2 para 3 (60-day reporting and payment obligation, extended from 30 to 60 days by FA 2022). **§17.4 LOCKED** is the verbatim source. Expect EXISTING_PAGE_STALE flags on adjacent residual NR/expat pages still carrying 28% rate or 30-day reporting framing (per F-13 / F-19 pattern from Batch 1; this is a §16.42-density-expected page).
- **B2-C2 PRR election**: TCGA 1992 s.222(5) (the election itself) + s.222(6) (variation of election) + s.222(7) (election scope) + 2-year time limit in s.222(5)(a). HMRC manual CG64485+ for operational mechanics. Cross-link to Wave 5 C7 `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` (joint-ownership election angle is W5 C7's territory; your B2-C2 covers SINGLE-owner-but-2-properties election angle).
- **B2-C3 commercial vs residential CGT**: TCGA 1992 s.1H (18%/24% residential rates per FA 2024 substitution effective 6 April 2024) vs s.1I + s.1J (10%/20% non-residential rates) + Schedule 1 (definition of "residential property gain"). BADR for commercial property at s.169H+ (with reference to Wave 6 C8 grandfathered FHL BADR worked example for adjacent angle). Capital-allowances interaction at TCGA s.41 (depreciation pulled into base cost adjustment).

**Per-brief workflow:** identical to Sub-bucket A workflow steps 1-13. Q&A file is `track2_questions_batch2_sub_c.md`; discovery log is `track2_discovery_log_batch2_sub_c.md`; tracker rows are Batch 2 Sub-bucket C.

**Hard constraints:** identical to Sub-bucket A (don't touch Sub-bucket A or B output, don't touch wave files, don't touch Batch 1 briefs except as reference, don't commit).

**Output to chat when complete:** brief summary listing 3 slugs + final Cannib status + intra-batch coordination outcome with Sub-bucket B re B2-B1 vs B2-C2 PRR scope (which path was chosen) + URL verification count + key findings.

**Time estimate:** 90-120 minutes for 3 REWRITE briefs at gold-reference depth.
```

---

## Manager polling pattern (for the user)

When the 3 sub-agents are running in their terminals, the **manager session (this terminal)** can be paused. The user returns to the manager when:

1. A sub-agent posts a chat summary back — the user pastes it to manager, manager logs to TRACK2_PROGRAM §3 heartbeat
2. A Q&A file gets an entry — the user can ask the manager "answer Q-1 in sub_b's Q&A" and manager polls + answers
3. All 3 sub-agents finish — user pastes all 3 chat summaries, manager runs the 7 quality gates across all 9 briefs, commits batch, reports

**While sub-agents run, the manager is idle.** That's the design — context-cheap for the manager, parallel throughput on the briefs.

**Expected Q&A volume for Batch 2:** modest. The intra-batch CANNIBAL coordination between Sub-bucket B + Sub-bucket C is the most likely Q&A — both prompts call it out explicitly so sub-agents should self-coordinate via the Q&A files (manager only intervenes if they ask). Otherwise expect zero-Q&A per Batch 1's pattern.

---

## End-of-batch close protocol (manager — me, when sub-agents return)

1. Read all 3 Q&A files for any unanswered questions
2. Read all 3 discovery logs for cross-batch flags
3. Read `track2_site_wide_flags.md` for new F-flags raised during batch (Batch 2 starts numbering at F-21)
4. Read all 9 brief files (or spot-check 3 random + read the cannibal-resolution decisions + intra-batch CANNIBAL outcome)
5. Run 7 quality gates per TRACK2_PROGRAM §15
6. Cross-check Wave 7 prep state — any new HP locks or new clusters added that affect Batch 2 briefs?
7. Update tracker: confirm all 9 rows ✅ brief_drafted (or document blockers)
8. Update TRACK2_PROGRAM §3 heartbeat with batch close summary + flag count
9. Commit the batch: 9 brief files + tracker + flags + Q&A + discovery as one batch commit
10. Report to user with the cannibal resolutions + intra-batch CANNIBAL outcome + flag summary + Phase 2 scale decision recommendation (~22 of ~25 residual CGT briefed after Batch 2; recommend pivot to next cluster for Batch 3)

---

## Files this batch creates / updates

**Creates (per sub-bucket, in `briefs/property/track2/batch2_cgt/sub_<x>/`):**
- 3 briefs each = 9 total brief files

**Updates (shared, concurrency-safe via row-only-yours discipline):**
- `docs/property/track2_page_tracker.md` — sub-agents mark their own rows 🟡 → 🟢
- `docs/property/track2_cannib_index_2026-05-23.md` §7 Batch 2 in-flight table — sub-agents add their slug + decision

**Appends (sub-bucket isolated, no conflict):**
- `docs/property/track2_questions_batch2_sub_<x>.md` — 1 per sub-bucket
- `docs/property/track2_discovery_log_batch2_sub_<x>.md` — 1 per sub-bucket
- `docs/property/track2_site_wide_flags.md` — shared, append-only (Batch 2 starts at F-21)

**Never touches:**
- Any wave5_*, wave6_*, wave7_*, NETNEW_PROGRAM, house_positions, topic_gaps_final file
- The Batch 1 briefs at `briefs/property/track2/batch1_cgt/` (read-only reference only)
- The trial briefs at `briefs/property/track2/trial/`
- The deprecated DeepSeek briefs at `briefs/property/<slug>.md` top-level
- Each other's sub-bucket output subdirs
