# Track 2 Manager Pickup — paste verbatim into a fresh Claude Opus 4.7 session at C:/Users/user/Documents/Accounting/

You are taking over as Track 2 Manager for the Property Legacy Rewrite Brief Program. Track 2 runs in parallel to the Wave net-new program (Waves 1-5 shipped, Wave 6 actively executing as of pickup); both share locked house positions, voice rules, and §16 lessons. Track 2 produces rewrite briefs for ~233 untouched legacy pages on `propertytaxpartners.co.uk`. You are fresh — read this doc, then `TRACK2_PROGRAM.md`, then resume.

**Working directory:** `C:/Users/user/Documents/Accounting/` (Windows 11, PowerShell + Bash both available)

---

## 0. Read first, in this order (~15 minutes total)

1. **This doc** end to end.
2. `docs/property/TRACK2_PROGRAM.md` — full manager doc. §0 read-first norms, §3 heartbeat (most recent state), §4 brief anatomy, §7 cannibalisation protocol, §9 sub-agent dispatch patterns, §10 tracker convention (POINTER into NETNEW_PROGRAM §16.14/§16.15/§15 — read those too), §13 sub-agent instructions, §14 manager self-awareness, §15 quality gates, §17 risk register, §20 glossary (includes the new INTENT-MISMATCH / INVISIBLE / TAIL-SIGNAL gap-mode codes).
3. `docs/property/NETNEW_PROGRAM.md` — particularly §16 lessons (Track 2 inherits all of them). Pay attention to §16.18 reasoning-first, §16.31 URL liveness, §16.22+§16.27+§16.30+§16.33+§16.40+ Bill-vs-enacted-Act drift family, §16.14+§16.15+§16.37 absolute-path edits, §16.41 Q&A shell template hygiene. Track 2 has SIX new flags continuing the Bill-vs-enacted drift family (F-2, F-5, F-13, F-18 → all caught and resolved by Batch 1 close; the program now has 11+ consecutive catches across both tracks).
4. `docs/property/house_positions.md` — §1-§25 LOCKED. §25 (CAA 2001 capital allowances) is the newest, locked 2026-05-23 for Wave 6 Bucket C.
5. `docs/property/track2_page_tracker.md` — current state of all Track 2A rows. Trial phase (4 briefs ✅) + Batch 1 (9 briefs ✅ at 🟢 brief_drafted).
6. `docs/property/track2_site_wide_flags.md` — full F-flag log (F-1 to F-20, plus resolution log).
7. **One brief to inspect end-to-end as depth match-target:** `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. This is the gold-reference brief; Phase 2+ sub-agent prompts should require this depth.

**Acknowledge the user with one short message:** *"Picked up. Track 2 phase: Batch 1 closed + drift audit closed, Wave 6 mid-execution. Open decisions: [number] pending. Ready for next instruction."* — nothing longer.

---

## 1. Critical norms before you do anything

- **Track 2 is parallel to the Wave program.** Read-only against every Wave file. NEVER edit `NETNEW_PROGRAM.md`, `house_positions.md`, any `wave*_*` file, or `topic_gaps_final.md`.
  - **Exception:** house position citation corrections (not position changes) — like F-18 — can be made directly by Track 2 manager. Position-shape changes go via Wave manager. F-18 set the precedent: cite "FA 2023" → "Finance (No. 2) Act 2023 c.30 s.41" — citation fix, not position change.
- **Output to `track2_*`-prefixed files only.** No collisions with Wave 5/6 file paths.
- **Self-awareness about your own context.** When context fills, write a §3 heartbeat update to TRACK2_PROGRAM and stop. See §14 of TRACK2_PROGRAM.
- **Reasoning-first selection per §16.18.** No Jaccard scripts for cannib decisions; the LLM reasons semantically against the Cannibalisation Index.
- **URL liveness mandatory per §16.31.** Every competitor URL in a brief is fetched + status-checked + date-stamped. **Statute citations also need content verification** (§16.36 + F-8 lesson: TCGA 1992 s.4 was substituted by FA 2019, URL live but content gutted).
- **Wave heartbeat re-read at every batch start.** Open `wave6_page_tracker.md`, `wave6_site_wide_flags.md`, and `NETNEW_PROGRAM.md` §3 before dispatching any sub-agent batch. Wave 6 is actively executing as of pickup; collisions possible.

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

### Cross-residual drift audit complete (2026-05-24)
- Audited 5 drift-pattern hypotheses surfaced during Batch 1 (F-9 stale figures, F-10 missing 4-year claim deadline, F-16 60-day cluster collapse candidates, F-19 £6k 60-day threshold, F-20 non-dom-spouse framing)
- **Pattern hypothesis NARROWER than predicted.** False-positive rate on grep-only audits was ~75%. Most hits = historical context, post-abolition explainer, or correctly-clarifying.
- **Only 1 NEW page** needs back-patch outside existing Track 2 scope: `incorporate-rental-property-without-cgt.md` FAQ #4 "18% vs 28%" → "18% vs 24%"
- F-19 and F-20 confirmed NOT site-wide; F-9 + F-20 confined to pages already in Batch 1 Phase 3 scope
- F-10 (missing TMA 1970 s.43 4-year claim deadline) confirmed gap site-wide on 6 affected pages — recommend Wave-manager-level house-position lock, not scattered back-patches

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
- Plus interspersed Wave 6 commits (Wave 6 actively shipping)

---

## 3. Open decisions awaiting user (you're picking up here)

### Decision 1: Back-patch `incorporate-rental-property-without-cgt.md`?
- ~2 min, 1-line FAQ fix (28% → 24% per §5 LOCKED)
- Options: (a) do it now as a 4th separate commit, (b) fold into Batch 2 sub-bucket if/when that touches CGT cluster, (c) leave for cluster-level batch later
- **Manager recommendation:** (a) quick commit now while context is hot — it's the cleanest finding from the drift audit.

### Decision 2: Lock TMA 1970 s.43 (4-year capital loss claim deadline) as a house position?
- Not currently in `house_positions.md`. Affects 6 pages (residual + 3 rewrites). Sub-bucket A's D-7 + audit B's F-10 both recommend.
- This is a Wave-manager-level decision (Track 2 doesn't lock house positions). Flag to Wave 6 manager via `wave6_*_flags.md` or wait for Wave 7+.
- **Manager recommendation:** flag to Wave 6 manager for §5.X extension; meanwhile sub-agents drafting CGT briefs cite TMA 1970 s.43 directly from legislation.gov.uk (the gov.uk loss-claim page also confirms).

### Decision 3: Batch 2 scope?
- **Option A — continue CGT cluster:** F-16 candidates (3 more 60-day-CGT pages likely future REDIRECT-PROPOSED to same canonical) + remaining residual CGT pages. Same cluster as Batch 1, predictable.
- **Option B — pivot to Section 24 cluster:** ~22 residual Section 24 pages. Largest intra-cluster cannibalisation pool (per cannib index §6). High REDIRECT-PROPOSED yield expected.
- **Option C — pivot to AIA / Capital allowances cluster:** ~12 residual + cross-track interlock with Wave 6 Bucket C (Capital allowances pillar already shipped). Some pages may become REDIRECT to Wave 6 pages once they merge to main.
- **Option D — pivot to city accountant cluster:** ~30 residual city pages. F-1 pricing-leak pattern likely site-wide here (per trial brief #2 Birmingham finding); could surface a big cluster-audit before commissioning rewrites.
- **Manager recommendation:** wait for user signal. Each option has different sub-agent dispatch shape; user picks based on commercial priority. Batch 1's CGT cluster taught us cluster-collapse is real → high-overlap clusters (Section 24, AIA, city pages) likely give more REDIRECT-PROPOSED than REWRITE.

### Decision 4: Phase 3 execution scheduling?
- Phase 3 = sub-agent takes a brief, rewrites the actual markdown page. Different from Stage 2 (brief drafting).
- Currently 13 briefs ready for Phase 3 execution: 3 trial REWRITE (excluding gold-reference which is for the same canonical-rewrite) + 6 Batch 1 REWRITE + 3 Batch 1 REDIRECT
- Phase 3 execution session likely needs worktrees (concurrent edits to `Property/web/content/blog/` will conflict). Different shape from Stage 2 brief drafting (which used main, no worktrees).
- F-15 worked-example salvage happens at Phase 3 (lift B1-B3 band-stacking example into calculation walkthrough sibling before redirect deletes the source).
- **Manager recommendation:** propose Phase 3 only after Batch 2 close so we can bundle ~18-25 briefs into one Phase 3 dispatch. Until then, briefs sit ready.

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

Wave 6 is ACTIVELY EXECUTING as of this pickup. Wave 6 Bucket C (Capital allowances + SBA + FYA) overlaps topically with Track 2's residual AIA cluster (~12 pages). When Wave 6 closes, expect to revisit the AIA cluster for REDIRECT-PROPOSED candidates (3-5 likely). Until then, leave the AIA cluster untouched in Track 2.

Wave 6 will likely also extend §16 lessons (§16.42+ probable) and may lock new house positions §26+. Track 2 inherits both automatically via pointer.

End of pickup doc. Read `TRACK2_PROGRAM.md` next.
