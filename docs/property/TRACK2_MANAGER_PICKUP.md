# Track 2 Manager Pickup — paste verbatim into a fresh Claude Opus 4.7 session at C:/Users/user/Documents/Accounting/

**Last refreshed:** 2026-05-24 PM (post-Batch-2 close).

You are taking over as Track 2 Manager for the Property Legacy Rewrite Brief Program. Track 2 runs in parallel to the Wave net-new program (Waves 1-6 shipped to main, Wave 7 in prep with HP-lock pending); both share locked house positions, voice rules, and §16 lessons. Track 2 produces rewrite briefs for ~211 untouched legacy pages on `propertytaxpartners.co.uk` (22 of original 233 already briefed across Trial + Batch 1 + Batch 2). You are fresh — read this doc, then `TRACK2_PROGRAM.md`, then resume.

**Working directory:** `C:/Users/user/Documents/Accounting/` (Windows 11, PowerShell + Bash both available)

---

## 0. Read first, in this order (~15 minutes total)

1. **This doc** end to end.
2. `docs/property/TRACK2_PROGRAM.md` — full manager doc. §0 read-first norms, §3 heartbeat (most recent state — Batch 2 close is the latest entry), §4 brief anatomy, §7 cannibalisation protocol, §9 sub-agent dispatch patterns, §10 tracker convention (POINTER into NETNEW_PROGRAM §16.14/§16.15/§15 — read those too), §13 sub-agent instructions, §14 manager self-awareness, §15 quality gates, §17 risk register, §20 glossary (includes INTENT-MISMATCH / INVISIBLE / TAIL-SIGNAL gap-mode codes).
3. `docs/property/NETNEW_PROGRAM.md` — particularly §16 lessons (Track 2 inherits all of them). §16 now extends to **§16.44** (Wave 6 close lessons §16.41 watcher-template hygiene + §16.42 EXISTING_PAGE_STALE density tracks novelty × adjacency + §16.43 sub-agent STALE-sweep dispatch validated + §16.44 WebFetch summarizer can hide HTML table content — all NEW since Track 2 Batch 1 dispatch). Track 2 now has **16 new flags continuing the Bill-vs-enacted-Act / statute-citation-drift family** (F-2, F-5, F-13, F-18, F-22, F-23 — the last is a SELF-CATCH on manager dispatch prompt at Batch 2, validating §16.38 verify-on-dispatch mandate). The program now has **13+ consecutive catches** across both tracks.
4. `docs/property/house_positions.md` — §1-§25 LOCKED. §25 (CAA 2001 capital allowances) locked 2026-05-23 for Wave 6 Bucket C. Wave 6 close added §21.1 (s.455 = 35.75% per FA 2026) + §22.x (NRB freeze → 2031) + §22.12 (s.169E not s.169G).
5. `docs/property/track2_page_tracker.md` — current state of all Track 2A rows. Trial phase (4 briefs ✅) + Batch 1 (9 briefs ✅) + **Batch 2 (9 briefs ✅ at 🟢 brief_drafted, closed 2026-05-24 PM)**.
6. `docs/property/track2_site_wide_flags.md` — full F-flag log (F-1 to F-36, plus resolution log). F-13, F-18 RESOLVED in-program; F-15 DEFERRED to Phase 3.
7. **One brief to inspect end-to-end as depth match-target:** `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. This is the gold-reference brief; sub-agent prompts should require this depth. For REWRITE-template reference: Batch 1 sub-bucket A or Batch 2 sub-bucket B. For REDIRECT-PROPOSED-template reference: Batch 1 sub-bucket B or Batch 2 sub-bucket A.

**Acknowledge the user with one short message:** *"Picked up. Track 2 state: Trial + Batch 1 + Batch 2 closed (22 briefs drafted, ~211 residual). Wave 6 closed; Wave 7 HP-lock pending. Open decisions: [number] pending. Ready for next instruction."* — nothing longer.

---

## 1. Critical norms before you do anything

- **Track 2 is parallel to the Wave program.** Read-only against every Wave file. NEVER edit `NETNEW_PROGRAM.md`, `house_positions.md`, any `wave*_*` file, or `topic_gaps_final.md`.
  - **Exception:** house position citation corrections (not position changes) — like F-18 — can be made directly by Track 2 manager. Position-shape changes go via Wave manager. F-18 set the precedent: cite "FA 2023" → "Finance (No. 2) Act 2023 c.30 s.41" — citation fix, not position change.
  - **Cross-track recommendations:** when Track 2 surfaces a recommendation for Wave-manager attention (e.g., F-10 TMA 1970 s.43 lock), file as a clearly-marked POST-WAVE-N-INPUT section appended to the closed wave's flags file. Decision #2 (2026-05-24, commit `6769942`) set the precedent.
- **Output to `track2_*`-prefixed files only.** No collisions with Wave 5/6/7 file paths.
- **Self-awareness about your own context.** When context fills, write a §3 heartbeat update to TRACK2_PROGRAM and stop. See §14 of TRACK2_PROGRAM.
- **Reasoning-first selection per §16.18.** No Jaccard scripts for cannib decisions; the LLM reasons semantically against the Cannibalisation Index.
- **URL liveness mandatory per §16.31.** Every competitor URL in a brief is fetched + status-checked + date-stamped. **Statute citations also need content verification** (§16.36 + F-8 lesson: TCGA 1992 s.4 was substituted by FA 2019, URL live but content gutted). Per §16.44, WebFetch summarizer can hide HTML table content — trust session-time captures when secondary verification path can't see the data.
- **§16.38 manager-prompt-drift discipline mandatory.** Any statutory citation YOU write into a sub-agent dispatch prompt must be verified-on-dispatch — the sub-agent instructed to verify your cite against legislation.gov.uk and surface drift catches. Batch 2 F-23 was a SELF-CATCH on the manager prompt (wrong s.224 for s.223B); the discipline held.
- **Wave heartbeat re-read at every batch start.** Open the latest wave's `wave*_page_tracker.md`, `wave*_site_wide_flags.md`, and `NETNEW_PROGRAM.md` §3 before dispatching any sub-agent batch. Wave 6 closed 2026-05-24; Wave 7 in prep (no execution yet, HP-lock pending fresh manager pickup) — minimal collision risk for Track 2 work until Wave 7 launches.

---

## 2. What's been done (state as of pickup)

### Trial phase complete (2026-05-23 PM)
- 3 hand-drafted structure-only trial briefs (airbnb DEPTH / birmingham CTR-fail / 2027-section-24 CANNIBAL) at `briefs/property/track2/trial/`
- 1 gold-reference data-complete brief (cgt-rates) at `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` — **this is the depth match-target for Phase 2+**
- 8 flags raised (F-1 to F-8) including 2 hallucinations caught (PIM4101 404; TCGA 1992 s.4 substituted by FA 2019)

### Batch 1 complete (2026-05-24 00:30Z)
- 9 briefs at `briefs/property/track2/batch1_cgt/` across 3 sub-buckets:
  - **Sub-bucket A (3 REWRITE):** cgt-deferral-strategies / reduce-cgt-property-disposal / cgt-property-sold-loss-claim-capital-losses
  - **Sub-bucket B (3 REDIRECT-PROPOSED):** all three 60-day-CGT pages collapse to rewritten canonical `cgt-payment-deadlines-property-sales-2026`
  - **Sub-bucket C (3 REWRITE):** cgt-divorce-property-transfer / cgt-inherited-rental-property-calculation / cgt-property-transfer-spouse
- 12 flags raised (F-9 to F-20). Two HIGH-severity caught hallucinations on shipped work, back-patched same day:
  - **F-13:** `cgt-payment-deadlines-property-sales-2026.md` (rewritten Session C #23) — hallucinated "sections 222 to 233 of FA 2019"; back-patched
  - **F-18:** `house_positions.md §24.4` — wrong-Act citation "FA 2023" (should be Finance (No. 2) Act 2023 c.30 s.41); back-patched in 4 locations
- New methodology findings:
  - 3 gap-mode codes added to glossary: `INTENT-MISMATCH` (cgt-rates: users want gov.uk + AI Overview captures), `INVISIBLE` (zero GSC + some GA4), `TAIL-SIGNAL` (zero GSC + zero GA4 + zero competitor signal)
  - Cluster-collapse pattern proven (sub-bucket B: 3 pages → 1 canonical)
  - D-9 hypothesis: generic-suffix slugs (`*-uk`, `*-complete-guide`, `*-2026`) more prone to Google deduplication; partially supported (4 of 5 invisible vs 1 of 5 specific-suffix; n=10 small)

### Cross-residual drift audit complete (2026-05-24 AM)
- Audited 5 drift-pattern hypotheses surfaced during Batch 1 (F-9 stale figures, F-10 missing 4-year claim deadline, F-16 60-day cluster collapse candidates, F-19 £6k 60-day threshold, F-20 non-dom-spouse framing)
- **Pattern hypothesis NARROWER than predicted.** False-positive rate on grep-only audits was ~75%. Most hits = historical context, post-abolition explainer, or correctly-clarifying.
- **Only 1 NEW page** needs back-patch outside existing Track 2 scope: `incorporate-rental-property-without-cgt.md` FAQ #4 "18% vs 28%" → "18% vs 24%" — **RESOLVED 2026-05-24** commit `5316bea`.
- F-19 and F-20 confirmed NOT site-wide; F-9 + F-20 confined to pages already in Batch 1 Phase 3 scope.
- F-10 (missing TMA 1970 s.43 4-year claim deadline) confirmed gap site-wide on 6 affected pages — recommend Wave-manager-level house-position lock, not scattered back-patches. **RECOMMENDATION FILED 2026-05-24** to `wave6_site_wide_flags.md` POST-WAVE-6-INPUT section, commit `6769942`; awaiting Wave 7+ manager lock.

### Wave 6 closed 2026-05-24 (cross-track update)
- Wave 6 closed in 10 close commits (`3808019` → `0805d07`). 30 net-new pages live on main: 10 LtdCo extraction + 10 Trusts/settlements/GROB + 10 Capital allowances (CAA 2001).
- New house positions locked: §21.1 (s.455 = 35.75% per FA 2026), §22.x (NRB freeze → 2031), §22.12 (s.169E not s.169G), §25 CAA 2001 cluster.
- New §16 lessons added: §16.41 watcher-template hygiene + §16.42 EXISTING_PAGE_STALE density × novelty × adjacency pattern + §16.43 sub-agent STALE-sweep dispatch validated + §16.44 WebFetch summarizer can hide HTML table content.
- Wave 7 IN PREP (HP-lock + Stage 1 brief generation pending fresh manager pickup). Bucket mix: RRA + EPC + BSA compliance (Bucket A) + HMRC enquiry + tax compliance ops (Bucket B) + Specialist transactional + trust depth continuation (Bucket C). **Zero CGT collision with Track 2 Batch 2.**

### Batch 2 complete (2026-05-24 PM)
- 9 briefs at `briefs/property/track2/batch2_cgt/` across 3 sub-buckets:
  - **Sub-bucket A (3 REDIRECT-PROPOSED — F-16 60-day-CGT cluster collapse continuation):** how-to-report-property-sale-hmrc-60-days + report-property-sale-hmrc-60-days-guide → `cgt-payment-deadlines-property-sales-2026` (same canonical as Batch 1 sub-bucket B trio — completes 5-page collapse) + capital-gains-tax-selling-rental-property-uk → `cgt-selling-buy-to-let-property-calculation-guide` (DIFFERENT canonical per Cannib Index §6).
  - **Sub-bucket B (3 REWRITE — CGT reliefs):** principal-private-residence-relief-landlords + rollover-relief-property-landlords + letting-relief-landlords-2026-changes.
  - **Sub-bucket C (3 REWRITE — CGT applied mechanics):** non-resident-cgt-uk-property-rates-reporting + cgt-main-residence-election-two-properties + cgt-commercial-property-different-residential.
- 16 flags raised (F-21 to F-36) + 14 discoveries (D-1 to D-14). Critical catches:
  - **F-23 (HIGH):** SELF-CATCH on manager dispatch prompt — wrong statute cite (s.224 for s.223B Lettings Relief inserted by FA 2020). §16.38 verify-on-dispatch discipline held.
  - **F-29 (HIGH):** LARGEST single stale-framing catch in Track 2. Commercial-vs-residential CGT page's entire core framing ("commercial 10%/20% vs residential 18%/24%") wiped out by Autumn Budget 2024 — TCGA s.1H now unified 18%/24% for ALL chargeable gains for individuals. Brief reframes from "different rates" to "different reliefs + different mechanics" (load-bearing pivot).
  - **F-25 (HIGH):** False FIRPTA-style conveyancer-withholding claim on NRCGT page (UK has NO such regime).
  - **F-31 + D-8 + D-10:** wrong-CT-£250k-threshold cluster wider than originally hypothesised — 4 confirmed instances across diverse page-classes (LtdCo + NRCGT-touching + commercial-vs-residential + 60-day-CGT-touching).
  - **F-35 (NEW PATTERN):** §16.42 EXISTING_PAGE_STALE density extends TO the 2026-05-21 rewrite-pass cohort, not just untouched residual. Wider radius than predicted.
- **New methodology wins:**
  - Intra-batch CANNIBAL coordination via PROACTIVE Q&A post (not reactive query) worked perfectly — Sub-bucket B posted PRR scope at brief-start; Sub-bucket C accepted differentiator with zero round-trip. Cleanest intra-batch coordination of any Track 2 batch.
  - 3 sub-agents dispatched via Agent tool background mode (user-override of saved-feedback separate-terminal pattern for this batch only — pattern not yet adopted as default; clarify with user before re-using).
  - F-16 cluster-collapse continuation hypothesis 100% validated (5-page collapse cohort, zero false positives).

### Track 2B side-program (sitemap mining)
- 65 NEW net-new candidates surfaced from 55 cached competitor sitemaps
- Output at `docs/property/track2b_competitor_sitemap_gaps_2026-05-23.md`
- Folded into `topic_gaps_final.md` as an addendum with provenance preamble
- **Wave 6 is already consuming addendum candidates** (Wave 6 Bucket C: Capital allowances + SBA + FYA — overlapping with addendum #94-#99)
- 28 of 65 candidates need new house positions locked before Wave 6+ can commission them

### Commits on `main` (Track 2 work only — Wave 5+6 + other site work also on main but separate commits)
- `0ec60ba` Track 2 Batch 1 close (30 files, 5,871 insertions)
- `a103a04` Track 2: F-13 + F-18 back-patches (2 files)
- `7be7cb0` Track 2: cross-residual drift audit
- `5316bea` Track 2 Batch 1 follow-up: Decision #1 back-patch (incorporate-rental-property-without-cgt 28% → 24%)
- `6769942` Track 2 cross-track input: Decision #2 TMA 1970 s.43 recommendation appended to wave6 flags
- `2dea735` Track 2 Batch 2 prep (10 files: Cannib Index refresh + tracker + 6 Q&A/discovery seeds + launch prompts + §3 heartbeat)
- `bc75897` Track 2 Batch 2 close (17 files, 2,808 insertions: 9 briefs + tracker + Cannib Index + flags + Q&A coordination + discovery logs + §3 heartbeat)
- Plus interspersed Wave 6 close commits (`3808019` → `0805d07`, 10 commits) and Wave 7 prep checkpoint `c1a8d92`

---

## 3. Open decisions awaiting user (you're picking up here — UPDATED 2026-05-24 PM post-Batch-2)

### Decision A: Batch 3 scope?
- **Option A — Section 24 cluster (~22 residual):** Largest intra-cluster cannibalisation pool per Cannib Index §6. High REDIRECT-PROPOSED yield expected.
- **Option B — AIA / Capital allowances cluster (~12 residual):** Cross-track interlock with Wave 6 Bucket C (Capital allowances pillar shipped 2026-05-24). 3-5 residual likely REDIRECT-PROPOSED to Wave 6 pillar; remaining REWRITE as applied/local variants. Now resolvable since Wave 6 closed.
- **Option C — City accountant cluster (~30 residual):** F-1 pricing-leak audit needed first. Bigger scope.
- **Option D — Stay in CGT-adjacent territory (~10-12 residual):** Calculator pages + Section 24-CGT-overlap + remaining specialist CGT pages (BADR/PRR-loss/non-resident-overseas-CGT) — closes CGT cluster definitively (currently 22 of 25 residual CGT pages briefed).
- **Manager recommendation:** wait for user signal. Each option has different sub-agent dispatch shape; user picks based on commercial priority.

### Decision B: §16.43 STALE-sweep sub-agent dispatch?
- Batch 2 surfaced 5 cluster-audit recommendations: F-21 Lettings pre-2020 framing cluster + F-28 + F-30 commercial Budget-2024 cluster + F-31 small-profits-rate-cluster + F-35 rewrite-cohort year-stamp cluster + F-36 WebFetch sample re-check.
- Per §16.43 these decompose well: precise grep-driven mechanical back-patches that benefit from sub-agent parallelism.
- ~15-30 min sub-agent run time. Manager context cost: low (single prompt + single report).
- **Manager recommendation:** dispatch before Batch 3 — banks the audit value while context is hot; surface any false-positives before they propagate into Batch 3 sub-agent prep.

### Decision C: Phase 3 execution scheduling?
- Phase 3 = sub-agent takes a brief, rewrites the actual markdown page. Different from brief drafting.
- **22 briefs ready for Phase 3 execution:**
  - 3 trial REWRITE (excluding gold-reference which is canonical-rewrite of same slug)
  - 6 Batch 1 REWRITE + 3 Batch 1 REDIRECT
  - 6 Batch 2 REWRITE + 3 Batch 2 REDIRECT
- Phase 3 execution session likely needs worktrees (concurrent edits to `Property/web/content/blog/` will conflict). Different shape from brief drafting (which used main, no worktrees).
- F-15 worked-example salvage + D-11/D-12 canonical-depth-up lifts happen at Phase 3 before redirect deletes the sources.
- **Manager recommendation:** bundle the 22 briefs in one Phase 3 dispatch. Needs its own scoping session — sub-agent dispatch shape is different (worktrees, middleware.ts edit coordination, monitored_pages Supabase inserts).

### Decision D: Sub-agent dispatch mode?
- Batch 1 used separate-terminals pattern (saved feedback).
- Batch 2 used Agent tool background mode (user-override; worked well — manager context stayed cheap on notification-only basis).
- Open question: revert to separate-terminals (per saved feedback) OR adopt Agent background mode as new default OR keep batch-by-batch user choice?
- **Manager recommendation:** keep batch-by-batch user choice for now. Both worked; pick whichever fits the moment. If Agent-background pattern stays clean across 2-3 more batches, consider updating the saved feedback to make it the default.

---

## 4. Workflow patterns proven in trial + Batch 1

### Dispatching a sub-bucket
- 3 sub-buckets per batch, each gets 3 pages (smaller scope than Wave's 10/bucket — pragmatic for first cluster pass)
- User opens 3 separate Claude Code terminals at `C:/Users/user/Documents/Accounting/` (NO worktrees needed for brief drafting; only writing new files into separate subdirs)
- Manager prepares launch prompts in `docs/sessions/property/TRACK2_BATCH<N>_LAUNCH_PROMPTS.md`
- Each sub-agent: read manager doc + cannib index + house positions + gold reference + Q&A discipline file path → claim row 🟡 → pull_page_data.py → WebFetch competitors + authorities → draft brief → quality gate → mark 🟢 → append discoveries + flags

### Brief format (legacy-adapted from Wave 5 template)
- 15 sections per brief. Stage 1 reasoning sections (3, 6, 10) + Stage 2 data-enriched sections (4, 5, 7, 8, 9, 11, 12) + static sections (13, 14, 15)
- §13 Universal rules and §14 19-step workflow are POINTERS into `NETNEW_PROGRAM.md` + `competitor_rewrite_playbook.md` — do NOT restate the rules in Track 2 briefs
- §4 of TRACK2_PROGRAM has the full template

### Sub-agent dispatch prompt template
- Per-sub-bucket prompts in `docs/sessions/property/TRACK2_BATCH<N>_LAUNCH_PROMPTS.md`
- Each prompt: required reading order + Q&A discipline (absolute path mantras per §16.15/§16.37) + sub-bucket assignment + output paths + per-brief workflow + hard constraints + return-summary format

### Manager polling pattern (while sub-agents run)
- Manager idles in main terminal
- Sub-agents append to: tracker (only their own rows), `track2_questions_batch<N>_sub_<x>.md` (Q&A), `track2_discovery_log_batch<N>_sub_<x>.md` (discoveries), `track2_site_wide_flags.md` (flags, append-only)
- When sub-agents finish, user pastes chat summaries to manager; manager runs end-of-batch close

### End-of-batch close protocol (7 quality gates from TRACK2_PROGRAM §15)
1. URL liveness — every competitor URL fetched + 200 status + date stamped
2. Citation reality — every statute / HMRC / gov.uk URL resolves AND content verified (not just URL liveness — §16.36 + F-8)
3. Cannibalisation snapshot match — brief cites the 2026-05-23 (or refreshed) Cannibalisation Index timestamp
4. House-position reference validity — every §N.M cited exists in current `house_positions.md`
5. Section completeness — all required Stage 2 sections present and non-empty
6. Anti-templating spot check — gap-mode diagnosis differs by page
7. Wave 5/6 collision scan — re-read `wave6_page_tracker.md` + `wave6_site_wide_flags.md` fresh at batch close

### Commit hygiene
- Surgical staging only — NEVER `git add .` or `git add -A`
- Track 2 paths to stage: `optimisation_engine/track2/`, `docs/property/TRACK2_PROGRAM.md`, `docs/property/track2_*`, `docs/sessions/property/TRACK2_*`, `briefs/property/track2/`, plus the specific files patched by F-back-patches
- 2 commits per batch typically: (1) batch deliverables, (2) any back-patches caught during batch — separate for clean audit trail
- Concurrent Wave 6 + other-site work also lands on main; respect their files (NEVER touch `wave6_*`)

---

## 5. Key files reference

### Track 2 manager-owned
- `docs/property/TRACK2_PROGRAM.md` — manager doc
- `docs/property/TRACK2_MANAGER_PICKUP.md` — this doc
- `docs/property/track2_universe_2026-05-23.md` — residual 233 pages
- `docs/property/track2_exclusion_audit_2026-05-23.md` — exclusion provenance
- `docs/property/track2_cannib_index_2026-05-23.md` — 5-source Cannibalisation Index
- `docs/property/track2_page_tracker.md` — multi-batch tracker
- `docs/property/track2_site_wide_flags.md` — F-1 to F-20 + resolution log (append-only)
- `docs/property/track2_audit_cross_residual_drift_2026-05-24.md` — audit B output
- `docs/property/track2b_competitor_sitemap_gaps_2026-05-23.md` — Track 2B candidate list (65 NEW)
- `docs/sessions/property/TRACK2_BATCH1_LAUNCH_PROMPTS.md` — Batch 1 prompts
- `optimisation_engine/track2/__init__.py` + `pull_page_data.py` — parameterised Supabase + GA4 + GSC query script

### Track 2 sub-agent-owned (per batch, per sub-bucket)
- `docs/property/track2_questions_batch<N>_sub_<x>.md` — Q&A logs (absolute path discipline)
- `docs/property/track2_discovery_log_batch<N>_sub_<x>.md` — discovery logs

### Track 2 brief outputs
- `briefs/property/track2/trial/` — 4 trial briefs (3 structure-only + 1 gold-reference)
- `briefs/property/track2/batch1_cgt/sub_{a,b,c}/` — 9 Batch 1 briefs

### Parent program — read-only
- `docs/property/NETNEW_PROGRAM.md`
- `docs/property/house_positions.md`
- `docs/property/topic_gaps_final.md` (Track 2 wrote an addendum at the end but doesn't edit the body)
- `docs/property/wave1-6_page_tracker.md` files
- `docs/property/page_rewrite_tracker.md`
- `docs/competitor_rewrite_playbook.md`

### Site code (touch only via back-patch with explicit user authorisation)
- `Property/web/content/blog/*.md` — 436 blog pages (Wave 5 shipped, may have more since)
- `Property/web/src/middleware.ts` — redirect maps (SLUG_TO_CATEGORY_MAP, DUPLICATE_REDIRECTS, LOCATION_TO_BLOG)

---

## 6. Bill-vs-enacted-Act drift family — the program's most recurrent risk

This is the highest-frequency risk pattern across both Wave and Track 2 work. **12+ consecutive catches** as of Batch 1 close. Sub-pattern variations:

- **Original Bill-vs-enacted:** asserting a Bill-form rate as enacted (the original §16.22 pattern from Waves 1-3)
- **Sections-don't-exist:** parenthetical claims about Act section numbers that don't exist (F-13: "sections 222 to 233 of FA 2019" — FA 2019 has ~94 sections)
- **Same-year-different-Act:** citing "FA 2023" when actual is "Finance (No. 2) Act 2023" (F-18; new sub-pattern surfaced 2026-05-23)
- **URL-live-content-gutted:** statute section URL resolves but operative wording removed by amendment (F-8: TCGA 1992 s.4 substituted by FA 2019)
- **Wrong-tax-term:** asserting "Companies pay 19% CGT" when they pay 19% Corporation Tax on chargeable gains (F-9)

**Mitigation discipline:** every statute citation in a Track 2 brief must be (a) URL-fetched from legislation.gov.uk within the brief drafting session, AND (b) content-verified (the section's operative wording is there and matches the brief's claim), AND (c) for "(inserted by FA X)" parentheticals, the inserting Act is verified via amendment history not assumed from year.

---

## 7. What this program does NOT do

- Does NOT execute rewrites or redirects (Phase 3 work; separate sub-agent dispatch)
- Does NOT touch Wave files (read-only)
- Does NOT edit house_positions.md position-shape content (citation fixes OK; position changes go via Wave manager)
- Does NOT touch `topic_gaps_final.md` body (Track 2B addendum at the bottom is the only Track 2 write)
- Does NOT commit on Wave feature branches
- Does NOT run pages through DataForSEO (excluded by user; GSC + competitor HTML + house positions is enough signal)
- Does NOT auto-deploy

---

## 8. Common mistakes to avoid

1. **Restating parent rules in TRACK2_PROGRAM** — §10 + §4 sections 13 + 14 are POINTERS. Don't paste the wave universal rules; they auto-propagate via pointer.
2. **`git add .` or `git add -A`** — working tree has lots of concurrent Wave 6 + other-site work. ALWAYS stage specific paths.
3. **Editing the tracker from a worktree relative path** — per §16.15 + §16.37, always absolute path. (Track 2 brief drafting doesn't use worktrees so this is less of a risk, but Phase 3 execution will.)
4. **Skipping URL content verification** — URL liveness alone is insufficient (F-8 lesson). Verify the content present at the URL matches the claim.
5. **Restating the entire workflow in each brief** — workflow is inherited via §14 pointer. Briefs only carry workflow DELTAS (legacy-rewrite step 9 + step 12 + step 13 changes).
6. **Building briefs without re-pulling GSC + GA4 first** — data refreshes between batches. Per the pre-flight checklist (TRACK2_PROGRAM §3 + tracker §"Pre-flight checklist"), always re-run ingestion scripts before dispatching.

---

## 9. The user

`jeff@emplifex.com`. Lead-gen handoff model (anonymised social proof only, no pricing on-site, no real client names). Strong infrastructure-first preference. Likes checkpointing — pause, validate, decide, proceed. No em-dashes in user-facing copy.

**Acknowledgement style:** terse. The user wants to know what's done + what's next, not a recap. One paragraph for status; bullets for decisions; tables when comparing options.

---

## Final note: cross-program awareness

Wave 6 CLOSED 2026-05-24 (10 close commits `3808019` → `0805d07`). Wave 6 Bucket C (Capital allowances + SBA + FYA) overlaps topically with Track 2's residual AIA cluster (~12 pages) — cannib resolution now executable. Expected outcome: 3-5 residual REDIRECT-PROPOSED to Wave 6 Bucket C pillar; remaining REWRITE as applied/local variants (HMO-applied, FHL-grandfathered, second-hand-assets-applied, etc.). This is a natural Batch 3 candidate if user picks Option B.

Wave 7 IN PREP as of 2026-05-24 PM. House-position lock + Stage 1 brief generation pending fresh Wave 7 manager pickup (per NETNEW_PROGRAM §3 Wave 7 prep subsection). Bucket mix: RRA + EPC + BSA compliance (A) + HMRC enquiry + tax compliance ops (B) + Specialist transactional + trust depth continuation (C). **Zero CGT cluster collision risk for Track 2 Batch 3+.** TMA 1970 territory in Wave 7 Bucket B (B1 discovery assessments TMA 1970 s.29 + B2 closure notices TMA 1970 s.28A) sits in the same statute family as Track 2's open TMA 1970 s.43 recommendation — if Wave 7 manager extends house positions for TMA territory, our recommendation may get folded in.

§16 lessons now extend through **§16.44** (Wave 6 close added §16.41 + §16.42 + §16.43 + §16.44). House positions §1-§25 LOCKED. Wave 7+ may extend to §26+ depending on bucket-mix coverage.

End of pickup doc. Read `TRACK2_PROGRAM.md` next.
