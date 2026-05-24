# Track 2 Phase 3 launch prompts (legacy rewrite + redirect execution, 22 operations across 4 worktrees)

**Created:** 2026-05-24 PM by Track 2 manager.
**Purpose:** 4 sub-agent launch prompts for Phase 3 EXECUTION of the 22 briefs drafted across Trial + Batch 1 + Batch 2. User opens 4 separate Claude Code terminals, one per worktree, and pastes the matching prompt into each.

**Why separate terminals (not Agent background-mode dispatch through manager):** parallel-agent transcripts flood manager context. Each session has its own context budget (Phase 3 is the heaviest workload in the Track 2 program to date — 6 REWRITE briefs at gold-reference depth ~= 6-9 hours of sub-agent time per worktree). Manager polls main's tracker / flags / Q&A / discovery files for progress and idles otherwise.

**Why worktrees required for Phase 3 (delta from Batch 1+2):** REWRITE briefs edit `Property/web/content/blog/<slug>.md` — concurrent edits across worktrees on different slugs are conflict-free, but a shared main-branch sub-agent dispatch would risk merge conflicts on adjacent commits. The REDIRECT bundle edits a single shared file (`Property/web/src/middleware.ts` DUPLICATE_REDIRECTS map) + deletes 6 source markdowns + patches internal links sitewide; that has to be one coordinated worktree, not parallel.

**Working directories — DIFFERENT per session:** each sub-agent operates from its own worktree subdir (absolute paths in the per-session prompts below). Tracker / flags / Q&A / discovery edits ALWAYS go via the main repo absolute path (`C:/Users/user/Documents/Accounting/docs/property/...`) per §16.14/§16.15/§16.37 discipline.

---

## State delta since Batch 2 launched (what's new — read at sub-agent start)

- **Batch 2 CLOSED 2026-05-24 PM** (commit `bc75897`). 9 CGT-cluster continuation briefs at 🟢 brief_drafted across `briefs/property/track2/batch2_cgt/sub_{a,b,c}/`. 16 flags raised F-21 to F-36 + 14 discoveries D-1 to D-14. Cluster-collapse pattern proven at 5-page collapse (F-16 fully resolved at Phase 3 REDIRECT bundle).
- **Phase 3 pre-execution lifts shipped 2026-05-24 PM:** commit `dcf504f` (F-15 Manchester band-stacking → calculation walkthrough sibling), commit `da7dbe8` (D-12 TMA 1970 s.43 4-year claim → BTL CGT calculation canonical), commit `5d9259a` (D-11 paper-PPDCGT digitally-excluded route → 60-day-CGT canonical), commit `44684f5` (resolution-log housekeeping). **Source markdowns for the 6 REDIRECT slugs all remain on disk pending Phase 3 REDIRECT bundle execution.**
- **Wave 6 CLOSED 2026-05-24** (commits `3808019` → `0805d07`). 30 net-new pages on main: 10 LtdCo extraction + 10 Trusts/settlements/GROB + 10 Capital allowances (CAA 2001). New house positions §21.1 (s.455 = 35.75% per FA 2026), §22.x (NRB freeze → 2031), §22.12 (s.169E not s.169G), §25 CAA 2001 cluster.
- **Wave 7 IN PARALLEL EXECUTION as of session start:** sessions A/B/C dispatched on separate worktrees (`property-wave7-a/b/c`); Wave 7 bucket mix = RRA + EPC + BSA compliance (A) + HMRC enquiry + tax compliance ops (B) + Specialist transactional + trust depth continuation (C). **Zero CGT-cluster collision** with Phase 3 scope, but Wave 7 commits land on main concurrently — sub-agents must re-check Wave 7 heartbeat at sub-agent start.
- **NEW §16 lessons since Batch 2:** §16.45 (Wave 7 HP-lock catch-list — 12 drift catches including 2 in manager Manager_prompt; most operationally critical = EPC C 2030 NOT enacted; minimally relevant to Phase 3 CGT scope).
- **Cannibalisation Index state:** `docs/property/track2_cannib_index_2026-05-23.md` §7 Batch 1 + Batch 2 in-flight tables are still open; closed and consolidated at Phase 3 close.

---

## Pre-flight checklist (Phase 3 — manager-completed before dispatch)

- [x] **Wave state reconciled:** Wave 6 closed (commits `3808019` → `0805d07`); Wave 7 in parallel execution at sub-agent dispatch (a/b/c branches); blog .md count 466 on main HEAD `44684f5`.
- [x] **3 pre-execution lifts shipped:** F-15 + D-11 + D-12 lifts on main before the REDIRECT bundle deletes the sources. Audit trail = lift -> redirect -> delete.
- [x] **Resolution log refreshed:** F-15 marked LIFT-DONE in `track2_site_wide_flags.md` resolution section; D-11 + D-12 marked LIFT-DONE in `track2_discovery_log_batch2_sub_a.md` resolution sub-section. Commit `44684f5`.
- [x] **Worktrees created off main HEAD `44684f5`:** 4 worktrees at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-{a,b,c,redirects}` with matching branch names.
- [x] **Tracker dispatch section added** to `docs/property/track2_page_tracker.md` — slug-level Phase 3 assignment + worktree map + post-merge close tasks.
- [x] **Q&A + discovery shells created** at `docs/property/track2_phase3_questions_{a,b,c,redirects}.md` + `docs/property/track2_phase3_discovery_log_{a,b,c,redirects}.md`. Flags continue in existing `track2_site_wide_flags.md` (append-only; Phase 3 starts at F-37).
- [x] **Statute-drift discipline brief restated:** Phase 3 sub-agents must verify every statute citation against legislation.gov.uk at WRITE time per §16.36 + F-8 + F-13 + F-18 + F-23 patterns. The program has 13+ consecutive Bill-vs-enacted / statute-citation drift catches; expect to surface a 14th somewhere on adjacent statute.
- [x] **Build-verification expectation set:** every worktree branch must pass `cd Property/web && npm run build` before manager merge.
- [x] **No auto-deploy:** per memory `vercel_cli_deploy_workflow.md`, GitHub auto-deploy is OFF for niche sites. Deploy via `cd Property && vercel deploy --prod` from parent dir on explicit user authorisation only.

---

## Worktree A — CGT reliefs cluster (6 REWRITE)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-a/`

```
You are the Worktree A sub-agent for Track 2 Phase 3 — legacy rewrite EXECUTION. Working in the worktree branch `track2-phase3-a` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-a/`. Bucket: CGT reliefs cluster (6 REWRITE briefs across CGT deferral / reduce-CGT / capital losses / PRR / rollover / lettings).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take a 🟢 brief_drafted brief, you produce a fully rewritten markdown page that ships to production.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_a.md` via ABSOLUTE PATH to the MAIN REPO file (not the worktree's relative path). Same discipline for tracker (`C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md`), flags (`C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md`), discovery (`C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_a.md`). Worktree branch edits land on main when manager merges; tracker / Q&A / flags / discovery edits land on main IMMEDIATELY via the absolute paths.

Read first, in this order (~30 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — §0 norms, §4 brief anatomy, §7 cannibalisation protocol, §10 tracker convention, §13 sub-agent instructions, §14 manager self-awareness (applies to sub-agents too — if you hit context fill, hand off cleanly), §15 quality gates, §20 glossary.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — particularly §16.18 reasoning-first, §16.22+§16.27+§16.30+§16.33+§16.40 Bill-vs-enacted-Act drift pattern (13+ consecutive catches across the program), §16.14+§16.15+§16.37 absolute-path edits, §16.36 statutory-citation cross-check gate, §16.38 manager-prompt-drift, §16.41 watcher-template hygiene, §16.42 EXISTING_PAGE_STALE density (expect to surface adjacent-content STALE flags), §16.43 sub-agent STALE-sweep dispatch validated, §16.44 WebFetch summarizer can hide HTML table content, §16.45 Wave 7 HP-lock catch-list.
3. `C:/Users/user/Documents/Accounting/docs/property/house_positions.md` — particularly §5 LOCKED CGT 2026/27 (18%/24% residential + AEA £3,000 + post-2020 Lettings Relief shared-occupation rule + Companies-pay-Corp-Tax-not-CGT — do NOT repeat the F-9 "Companies pay 19% CGT" error), §6 (FHL post-abolition from 6 April 2025), §17 (Leaving UK / NRCGT — secondary), §24 (Form 17 / joint ownership / s.222(5)+(6)(a) joint-signing for couples — primary for B2-B1 PRR brief and cross-link target for B1-A2's spouse-transfer FAQ).
4. `C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md` — full file. Confirm your 6 rows + their brief paths in the Phase 3 dispatch section.
5. `C:/Users/user/Documents/Accounting/docs/property/track2_cannib_index_2026-05-23.md` — full file. §7 Batch 1 + Batch 2 in-flight tables (your rewrites land here at execution time).
6. The gold-reference brief: `C:/Users/user/Documents/Accounting/briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. **THIS IS YOUR DEPTH MATCH-TARGET FOR EVERY REWRITE.** Note the data-complete pattern: real GSC + GA4 + competitor URLs + statute spine + 12+ FAQs + worked examples + multiple house-position cross-references + verified-at-write-time URLs.
7. **Two recently-rewritten siblings as voice + structure reference:**
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` — has the D-11 lift + F-13 back-patch; the structural template for CGT pages on main as of HEAD `44684f5`
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md` — has the F-15 lift; the worked-example density target for CGT calculation pages
8. `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md` — full file. **Read F-9, F-21, F-22, F-23, F-24, F-28 + resolution log** carefully; these are pattern flags that apply directly to your 6 briefs.

**Your 6 briefs (execution order — work in this sequence so intra-cluster cross-links stack cleanly):**

1. **B1-A3** `briefs/property/track2/batch1_cgt/sub_a/cgt-property-sold-loss-claim-capital-losses.md`
   → Target file: `Property/web/content/blog/cgt-property-sold-loss-claim-capital-losses.md`
   → Cross-links the F-10 TMA 1970 s.43 4-year-claim deadline into the page (D-12 lift already in the BTL CGT calculation canonical — your page is the focused authority for the topic)

2. **B1-A1** `briefs/property/track2/batch1_cgt/sub_a/cgt-deferral-strategies-property-investors-uk.md`
   → Target: `Property/web/content/blog/cgt-deferral-strategies-property-investors-uk.md`
   → Statute spine: Sch 5B (EIS deferral) + s.152 (rollover) + s.165 (gift holdover) + s.58 (spouse) + s.162 (incorporation relief) — verify each at write time

3. **B1-A2** `briefs/property/track2/batch1_cgt/sub_a/reduce-cgt-property-disposal-uk.md`
   → Target: `Property/web/content/blog/reduce-cgt-property-disposal-uk.md`
   → **HIGH-priority F-9 fixes baked into brief:** Companies-pay-CT-not-CGT correction + post-2020 Lettings Relief framing + post-5-April-2025 FHL-BADR abolition framing

4. **B2-B1** `briefs/property/track2/batch2_cgt/sub_b/principal-private-residence-relief-landlords.md`
   → Target: `Property/web/content/blog/principal-private-residence-relief-landlords.md`
   → Statute spine: TCGA 1992 ss.222-226 + s.223B (Lettings Relief restriction post-FA 2020) + HMRC CG64200/CG64710/CG64985 — verify each at write time
   → **Intra-cluster differentiator:** general PRR theory + Lettings Relief carve-out + nominated-residence-by-default. B2-C2 (in worktree B) covers s.222(5) election mechanics specifically — DO NOT overlap. Cross-link to B2-C2 instead.

5. **B2-B2** `briefs/property/track2/batch2_cgt/sub_b/rollover-relief-property-landlords.md`
   → Target: `Property/web/content/blog/rollover-relief-property-landlords.md`
   → Statute spine: s.152 + s.153 + s.155 Class 1 Head A (occupied AND used for trade — most rental landlords DON'T qualify). FHL post-abolition narrows further. Cross-link to Wave 6 C8 FHL grandfathered.
   → **F-22 fix baked into brief:** unhedged April 2027 22/42/47 rate assertion at body line 96 needs the §7 LOCKED Bill-form hedge

6. **B2-B3** `briefs/property/track2/batch2_cgt/sub_b/letting-relief-landlords-2026-changes.md`
   → Target: `Property/web/content/blog/letting-relief-landlords-2026-changes.md`
   → Statute spine: s.223B (the correct cite — NOT s.224 per F-23 catch). Pre-2020 framing is OBSOLETE.
   → **F-24 fix baked into brief:** transitional-rule cut-off applies to date of DISPOSAL not date of LETTING; correct the legacy body line 96-99 error

**Per-brief workflow (19 steps — full legacy-rewrite execution):**

1. **Claim:** mark 🔵 phase3_in_progress in tracker (your row in the Phase 3 dispatch table) via ABSOLUTE PATH to main repo file. Record the start timestamp.
2. **Heartbeat re-read:** before each brief, re-read `track2_page_tracker.md` Phase 3 dispatch section + `track2_site_wide_flags.md` resolution log. New flags / new Wave 7 commits could have landed between briefs.
3. **Brief re-read:** read your assigned brief end-to-end (most are 200+ lines). Note every statute spine, every authority URL, every worked-example structure called out, every cross-link target.
4. **Fresh data pull:** `python -m optimisation_engine.track2.pull_page_data --slug <slug> --days 90` from the main repo working dir (or worktree's — module is in main; use absolute path if needed). Confirm GSC + GA4 baseline matches brief; flag if data shifted materially since brief drafting.
5. **Read existing source:** open `Property/web/content/blog/<slug>.md` (the file you are about to rewrite). Note the legacy framing you must remove vs the GSC-signal you must preserve.
6. **Read 2-3 canonical-rewrite siblings** for structure / voice reference per the brief's cross-link list. Pay particular attention to the recently-lifted-into siblings (`cgt-calculation-selling-buy-to-let-property-step-by-step.md`, `cgt-payment-deadlines-property-sales-2026.md`, `cgt-selling-buy-to-let-property-calculation-guide.md`) — those have the freshest voice + structure pattern.
7. **Statute citation cross-check (§16.36 gate):** WebFetch every legislation.gov.uk URL the brief cites. Confirm URL liveness AND content (section title + operative wording matches the brief's claim). If WebFetch is denied or summarizer hides content per §16.44, note the carry-forward verification source + date and proceed.
8. **HMRC manual + gov.uk URL verification:** WebFetch every HMRC manual + gov.uk URL the brief cites. Per F-7 (PIM4101 404 catch) — never cite a manual section URL without WebFetch confirming 200 + content match.
9. **Competitor URL re-verification:** WebFetch the 3-5 competitor URLs the brief cites. Date-stamp at write time. If denied per §16.44 / F-36, document carry-forward from brief drafting date.
10. **Rewrite the markdown file end-to-end:** REPLACE the legacy body. Target depth:
    - **Frontmatter:** title (1 line, sentence case, includes primary query verbatim), slug (unchanged), canonical (unchanged), date (today), author ("Property Tax Partners Editorial Team"), category (from brief), metaTitle (≤62 chars, ideally 50-58, primary query forward), metaDescription (≤155 chars, action-oriented, mentions year), metaTitle_prev + metaDescription_prev (preserve the existing metaTitle/Description as the _prev fields for A/B reference), altText (1 line), image (empty unless asset assigned), h1 (matches title), summary (1-3 sentences, mentions the load-bearing answer up-front), schema (empty until reviewedBy lifecycle), faqs (12+ entries; question + answer; questions verbatim from GSC where the brief surfaces them; answers 80-150 words each).
    - **Body:** 2,800-3,500 words target (gold-reference T4 is ~3,500w — match it). 8-12 H2 sections. Use H3 sub-sections under longer H2s for navigation density. Include:
      - At least 1 statute-spine paragraph naming TCGA / FA / TMA sections with hyperlinks to legislation.gov.uk
      - At least 1 worked example (numerical, with band-stacking / AEA / etc.) where applicable to topic
      - At least 1 table (comparison / timeline / band-stacking / penalty schedule / etc.)
      - At least 2 internal `<aside>` CTA hooks (mid-body and near-bottom — lead-gen handoff voice; the form at the bottom routes to a specialist; never quote prices, never name clients)
      - Cross-links to: parent pillar (CGT property complete guide) + at least 3 cluster siblings + at least 1 Wave 5/6 net-new forward link where the brief lists one
      - All statute citations rendered as `<a href="https://www.legislation.gov.uk/...">Section X</a>` with full URL
    - **Voice:** practitioner-tone (not consumer-tone). Tight sentences. No filler. "we" / "our team" sparingly. **NO em-dashes** (`—` must return zero on grep). Commas, full stops, parentheses, colons, middle dots instead. No pricing on-site (no "£300-£600" / "from £1,500" ranges). No real client names. The lead-gen handoff model means the page educates, then routes a qualified reader to the contact form. The form is the conversion — the page is the demand-capture.
11. **Quality gate run (TRACK2_PROGRAM §15 + Phase 3 deltas):**
    - [ ] Frontmatter complete and valid (FAQ count ≥12, metaTitle ≤62 chars, metaDescription ≤155 chars, all fields present)
    - [ ] All statutes verified via legislation.gov.uk at write time (URL + content)
    - [ ] All HMRC manuals + gov.uk verified live at write time
    - [ ] All competitor URLs verified live (or carried-forward from brief with explicit date-stamp)
    - [ ] Em-dash grep returns zero: `Grep` for `—` in your file
    - [ ] Pricing-leak grep returns zero: `Grep` for `£[0-9]+[-]` and `from £` and `fee` in your file
    - [ ] Internal-link grep: confirm every internal `<a href="/blog/...">` target file exists in `Property/web/content/blog/` (not 404)
    - [ ] House-position §N.M references valid (cross-check against current `house_positions.md` — F-18 / F-23 / F-27 patterns are statute-cite drift; do NOT repeat)
    - [ ] Anti-templating: re-read your gap-mode diagnosis against the brief — is it specific to this page or generic?
    - [ ] Wave 5/6/7 collision scan: re-read latest Wave-N tracker + Wave-N flags before commit
12. **Build verify** (run AT BRIEF END not after each — once you're done with all 6 briefs OR mid-stream every 2-3 briefs):
    `cd Property/web && npm run build` from the worktree's web subdir. Must pass (exit 0). If it fails, the LAST commit is the suspect — debug surgically; do NOT amend.
13. **Commit on worktree branch** (per-brief, surgical staging):
    `git add Property/web/content/blog/<slug>.md` + any internal-link patches to sibling pages
    `git commit -m "Track 2 Phase 3 (A): REWRITE <slug> against brief B<N>-<X>"`
    Include in the commit message body: word count + FAQ count + key flags resolved.
14. **Mark ✅ executed in tracker** via ABSOLUTE PATH to main repo file. Record the worktree branch + commit hash in the Branch + Commit columns of the original Batch 1/2 row tables AND in the Phase 3 dispatch table status column.
15. **Discovery log:** append any execution-time finding to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_a.md`. Numbering: D-A1, D-A2, etc.
16. **Flag log:** if you find a new pattern flag during execution, append to `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md`. Phase 3 starts at F-37.
17. **monitored_pages staging:** at brief completion, append a line to the discovery log noting "monitored_pages row needed: slug=<slug>, tracking_type=rewrite_post, baseline_imp=<X>, baseline_clicks=<Y>, window=90d". Manager batch-inserts at close.
18. **Cross-worktree heartbeat:** if you finish a brief and Wave 7 has just committed on main, re-read the Wave 7 flags file before starting your next brief. New HP-locks can affect your remaining brief's statute spine.
19. **Move to next brief.**

**Hard constraints (Phase 3 — inherits Track 2 norms):**
- Do NOT touch any `wave5_*`, `wave6_*`, `wave7_*`, `NETNEW_PROGRAM.md`, `house_positions.md`, `topic_gaps_final.md`, or Wave-N tracker file (read-only). Even if a Wave 7 page references your topic, do NOT modify the Wave 7 page; flag it in the discovery log and the Wave 7 manager will handle cross-pollination.
- Do NOT touch any Wave-N net-new blog page in `Property/web/content/blog/` outside your 6 named legacy slugs. Wave 5 + 6 outputs are immutable for Phase 3.
- Do NOT touch worktree B's, C's, or REDIRECT's output files.
- Do NOT touch the REDIRECT brief files (`briefs/property/track2/batch1_cgt/sub_b/`, `briefs/property/track2/batch2_cgt/sub_a/`).
- Do NOT auto-deploy. Vercel CLI on explicit user authorisation only.
- Do NOT use `git add .` or `git add -A`. Surgical staging only — `git add` specific files by path.
- Do NOT commit on main directly. Worktree branch only. Manager merges at close.
- Do NOT amend commits or force-push. New commits only.
- Do NOT skip the build verification step. If npm run build fails, debug — do not paper over.

**Output to chat when complete (the user pastes this back to manager terminal):**

```
Worktree A Phase 3 close — 6 REWRITEs

Briefs executed:
- B1-A3 cgt-property-sold-loss-claim-capital-losses: <commit hash>, <word count>, <FAQ count>, key flags: <list>
- B1-A1 cgt-deferral-strategies-property-investors-uk: ...
- B1-A2 reduce-cgt-property-disposal-uk: ...
- B2-B1 principal-private-residence-relief-landlords: ...
- B2-B2 rollover-relief-property-landlords: ...
- B2-B3 letting-relief-landlords-2026-changes: ...

Build verify: PASS / FAIL (details)
URLs verified: <count> live + <count> carried-forward + <count> denied per §16.44/F-36
New flags: F-37, F-38, ... (or none)
New discoveries: D-A1, D-A2, ... (or none)
monitored_pages staging: 6 rows recorded in discovery log
Branch: track2-phase3-a at <final commit hash>
Time taken: <hours>
Open questions for manager: <list, or "none">
```

**Time estimate:** 6-9 hours for 6 REWRITE briefs at gold-reference depth (~60-90 min per brief). Take breaks; if you hit context fill mid-stream, write a heartbeat to TRACK2_PROGRAM.md §3 and hand off cleanly per §14.
```

---

## Worktree B — CGT scenarios + applied mechanics (6 REWRITE)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-b/`

```
You are the Worktree B sub-agent for Track 2 Phase 3 — legacy rewrite EXECUTION. Working in the worktree branch `track2-phase3-b` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-b/`. Bucket: CGT scenarios + applied mechanics (6 REWRITE briefs across divorce / inherited / spouse / NRCGT / two-property PRR election / commercial vs residential).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take a 🟢 brief_drafted brief, you produce a fully rewritten markdown page that ships to production.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_b.md` via ABSOLUTE PATH to the MAIN REPO file (not the worktree's relative path). Same discipline for tracker (`C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md`), flags (`C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md`), discovery (`C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_b.md`).

Read first, in this order (~30 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — §0 norms, §4 brief anatomy, §7 cannibalisation protocol, §10 tracker convention, §13 sub-agent instructions, §14 manager self-awareness, §15 quality gates, §20 glossary.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — same list as Worktree A (full reading at §16.18 / §16.22 / §16.27 / §16.30 / §16.33 / §16.36 / §16.38 / §16.40-§16.45).
3. `C:/Users/user/Documents/Accounting/docs/property/house_positions.md` — particularly §5 LOCKED CGT 2026/27 (rate spine for B2-C1 + B2-C3); **§17.4 LOCKED NRCGT 60-day rule + post-FA-2019 rates** (primary spine for B2-C1 — NRCGT rates are 18%/24% post-FA-2024 NOT pre-FA-2024 28%, and there is NO mandatory conveyancer-withholding regime — F-25 false-FIRPTA catch); §24 LOCKED Form 17 / s.222(5)+(6)(a) joint-signing + s.58 spouse transfer (primary spine for B1-C1 + B1-C3 + B2-C2); §22 IHT for divorce + inherited cross-link partners; §18 ATED-related-CGT-abolished-April-2019 (cross-link from B2-C1 NRCGT page — F-25 second catch).
4. `C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md` — confirm your 6 rows + their brief paths in the Phase 3 dispatch section.
5. `C:/Users/user/Documents/Accounting/docs/property/track2_cannib_index_2026-05-23.md` — full file.
6. The gold-reference brief: `C:/Users/user/Documents/Accounting/briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. **Depth match-target.**
7. **Two recently-rewritten siblings** as voice + structure reference:
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md`
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md`
8. `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md` — full file. **Read F-18, F-19, F-20, F-25, F-26, F-27, F-29, F-30, F-31 + resolution log** carefully; these are pattern flags that apply directly to your 6 briefs (particularly F-25 false-FIRPTA + F-29 commercial-vs-residential rates pivot + F-30 Budget-2024 cluster + F-31 wrong-CT-£250k cluster).

**Your 6 briefs (execution order — work in this sequence so cross-cluster cross-links stack cleanly):**

1. **B1-C2** `briefs/property/track2/batch1_cgt/sub_c/cgt-inherited-rental-property-calculation-uk.md`
   → Target: `Property/web/content/blog/cgt-inherited-rental-property-calculation-uk.md`
   → Statute spine: TCGA 1992 s.62 (deemed acquisition at death at probate value) + s.274 (IHT-CGT interaction) + s.71 (trust deemed-disposal at appointment) — verify each
   → Wave 2 A7 (IHT pillar) cross-links INTO this page; you must STRENGTHEN the reciprocal link

2. **B1-C1** `briefs/property/track2/batch1_cgt/sub_c/cgt-divorce-property-transfer-tax-implications.md`
   → Target: `Property/web/content/blog/cgt-divorce-property-transfer-tax-implications.md`
   → Statute spine: TCGA 1992 s.58 (no-gain-no-loss between cohabiting spouses) + s.58(1A)-(1D) post-separation extension **inserted by Finance (No. 2) Act 2023 c.30 s.41(2)(6) in force 6 April 2023** (per F-18 RESOLVED — do NOT cite "FA 2023"). Pre-F(No.2)A 2023 framing is OBSOLETE.

3. **B1-C3** `briefs/property/track2/batch1_cgt/sub_c/cgt-property-transfer-spouse.md`
   → Target: `Property/web/content/blog/cgt-property-transfer-spouse.md`
   → Statute spine: TCGA 1992 s.58 + s.288 (definition of "living together" — residence-independent test). **F-20 fix baked into brief:** pre-FA-2025 "non-UK-resident spouse → CGT charged" framing is OBSOLETE; s.58 is NOT residence-conditional.
   → 9 mandatory Wave 5 C-cluster forward-links (C1-C9 except own slot)

4. **B2-C1** `briefs/property/track2/batch2_cgt/sub_c/non-resident-cgt-uk-property-rates-reporting.md`
   → Target: `Property/web/content/blog/non-resident-cgt-uk-property-rates-reporting.md`
   → Statute spine: TCGA 1992 s.1A(3)(b) + s.14B (post-FA-2019 NRCGT architecture — NOT pre-FA-2019 s.14D / Sch B1) + FA 2019 Sch 2 (60-day return) + CTA 2009 s.2(2A) (non-resident company gains at CT main rate 25% from FA 2019 — NOT ATED-related-CGT which was abolished April 2019)
   → **F-25 fixes baked into brief:** (a) 60-day rule applies for EVERY non-resident UK land disposal regardless of tax due, not "where tax is due"; (b) ATED-related-CGT abolished April 2019; (c) **REMOVE FALSE conveyancer-withholding claim** (UK has NO FIRPTA-style mandatory withholding regime — this is high-stakes reader-misleading); (d) non-resident-company section uses CT main rate framing, not small-profits-rate framing

5. **B2-C2** `briefs/property/track2/batch2_cgt/sub_c/cgt-main-residence-election-two-properties.md`
   → Target: `Property/web/content/blog/cgt-main-residence-election-two-properties.md`
   → Statute spine: TCGA 1992 s.222(5) (election; written + 2-year time limit per s.222(5)(a)) + s.222(6) (variation) + s.222(7) (election scope) + HMRC CG64485+. **DO NOT cite s.222(5)(b)** (joint-signing) — that was repealed FA 1996; the current joint-signing rule is s.222(6)(a). This brief covers SINGLE-owner-with-2-properties election; cross-link to Wave 5 C7 for the joint-ownership angle.
   → **Intra-cluster differentiator:** B2-B1 (in worktree A) covers general PRR theory + Lettings Relief carve-out; your B2-C2 covers s.222(5) election mechanics for the single-owner-with-2-properties scenario. DO NOT overlap. Cross-link to B2-B1 instead.

6. **B2-C3** `briefs/property/track2/batch2_cgt/sub_c/cgt-commercial-property-different-residential.md`
   → Target: `Property/web/content/blog/cgt-commercial-property-different-residential.md`
   → **LOAD-BEARING REFRAME REQUIRED:** the legacy body's CORE FRAMING ("commercial 10/20% vs residential 18/24%") is in DIRECT conflict with §5 LOCKED (TCGA 1992 s.1H now unifies 18%/24% for ALL chargeable gains for individuals from 30 October 2024). Your rewrite must reframe FROM "different rates" TO "different reliefs + different mechanics". F-29 catalogues the full reframe + the ~£4k saving worked example needs replacement.
   → Statute spine: TCGA 1992 s.1H (unified 18%/24%) + s.1I + s.1J (legacy commercial frame — for history only) + Schedule 1 TCGA + BADR at s.169H (14% from 6 April 2025, 18% from 6 April 2026 per §5 LOCKED — NOT 10%).
   → Densest Wave-6-cross-link integration: 5 W6 Bucket C forward-links (C2 balancing, C3 SBA, C5 FYA, C6 fixtures, C8 FHL-grandfathered) + 2 W6 other (A-series MVL, B4 holdover-blocking) — per brief, cite them all.

**Per-brief workflow:** identical 19-step legacy-rewrite execution as Worktree A (see Worktree A prompt for full step list).

**Hard constraints:** identical to Worktree A (don't touch Wave files, don't touch other worktrees' outputs, don't touch REDIRECT briefs, surgical staging, no auto-deploy, per-brief commits on worktree branch).

**Output to chat when complete:** same format as Worktree A.

**Time estimate:** 6-9 hours for 6 REWRITE briefs at gold-reference depth.
```

---

## Worktree C — Trial cohort (4 REWRITE, includes T4 special-case canonical-rewrite)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-c/`

```
You are the Worktree C sub-agent for Track 2 Phase 3 — legacy rewrite EXECUTION. Working in the worktree branch `track2-phase3-c` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-c/`. Bucket: Trial cohort (4 REWRITE briefs across airbnb / Birmingham / 2027 Section 24 / cgt-rates — the trial picks that proved the Track 2 brief drafting pattern, now ready for execution).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take a 🟢 brief_drafted brief, you produce a fully rewritten markdown page that ships to production.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_c.md` via ABSOLUTE PATH to the MAIN REPO file. Same discipline for tracker, flags, discovery.

**KEY DIFFERENCE FROM WORKTREES A + B:**
- T1, T2, T3 briefs are **STRUCTURE-ONLY** (hand-drafted at trial phase before the gold-reference data-complete pattern was established). You must fetch GSC + GA4 + competitor data + statute citations FRESH at execution time — these briefs do not have the baked-in data the Batch 1/2 briefs have.
- T4 is the **gold-reference data-complete brief** AND a **special-case canonical-rewrite** — the slug `cgt-rates-property-2026-27-current-rates-explained` already exists as a 2026-05-21 rewritten canonical. Your Phase 3 task on T4 = depth-up REWRITE of the existing canonical AGAINST the gold-reference brief (not a fresh rewrite from scratch). Read the existing canonical carefully; preserve everything that the brief still validates; UPLIFT depth + statute spine + worked examples where the brief calls for more.

Read first, in this order (~30 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — full file.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — same list as Worktree A.
3. `C:/Users/user/Documents/Accounting/docs/property/house_positions.md` — particularly §5 LOCKED CGT 2026/27 (T4 primary spine + T3 secondary on the 2027 surcharge interaction), §6 LOCKED FHL post-abolition (T1 primary spine), §7 LOCKED April 2027 property income tax surcharge (T3 primary spine — **Bill-form hedge mandatory per F-2 + F-5 + F-22**; verify against legislation.gov.uk at write time, the Finance Act 2026 may have received Royal Assent), §16 Section 24 mortgage interest restriction (T3 primary), §21 LtdCo + corporation tax mechanics (T3 + T2 secondary), §1 SDLT (T2 secondary if Birmingham brief touches property purchase mechanics).
4. `C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md` — confirm your 4 rows in the Phase 3 dispatch section.
5. `C:/Users/user/Documents/Accounting/docs/property/track2_cannib_index_2026-05-23.md` — full file.
6. **The gold-reference brief itself:** `C:/Users/user/Documents/Accounting/briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` — this is BOTH your T4 brief AND your depth match-target for T1 / T2 / T3 (which lack the gold-reference data-completeness, so you generate it at write time).
7. **The existing T4 canonical** (this is what T4 rewrites): `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-rates-property-2026-27-current-rates-explained.md` — read end-to-end; note current depth + structure + which sections the brief calls for uplift.
8. **Two recently-rewritten siblings** for voice + structure reference (same as Worktrees A + B):
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md`
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md`
9. `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md` — full file. **Read F-1 (T2 pricing-leak), F-2 (T3 Bill-vs-enacted), F-3 (T3 CANNIBAL cluster — siblings recommended REDIRECT-PROPOSED to T3 but NOT in this Phase 3 scope; flag carries forward), F-5 (T4 Bill-vs-enacted), F-6 (T4 INTENT-MISMATCH gap-mode — realistic CTR-lift target tempered), F-7 (PIM4101 hallucination — discipline for all 4 briefs), F-8 (TCGA 1992 s.4 substituted — same)** carefully.

**Your 4 briefs (execution order — work T4 LAST so the canonical depth-up benefits from any cross-link partners committed earlier in worktrees A + B):**

1. **T1** `briefs/property/track2/trial/airbnb-tax-uk-short-term-rental-income-taxed.md`
   → Target: `Property/web/content/blog/airbnb-tax-uk-short-term-rental-income-taxed.md`
   → **STRUCTURE-ONLY BRIEF — fetch GSC + GA4 + competitor data + statutes fresh.** Run `python -m optimisation_engine.track2.pull_page_data --slug airbnb-tax-uk-short-term-rental-income-taxed --days 90`.
   → Statute spine: ITA 2007 ss.836-852 (property income basics) + FA 2025 Sch 5 (FHL abolition from 6 April 2025) + VAT 1994 (registration thresholds for serviced accom over £90,000) + s.8 NI (Class 2 NIC for trading short-lets) — verify each at write time
   → INVISIBLE-page gap (zero GSC) — depth + structure + statute anchoring is the play; CTR-lift target tempered per F-11 INVISIBLE-page pattern

2. **T2** `briefs/property/track2/trial/birmingham-property-accountant.md`
   → Target: `Property/web/content/blog/birmingham-property-accountant.md`
   → **STRUCTURE-ONLY BRIEF — fetch data fresh.**
   → **F-1 critical fix:** remove all pricing references (£300-£600 / £1,500-£3,000) — agency lead-gen handoff model FORBIDS pricing on-site per memory note `agency_lead_gen_model.md`. Reframe as "we route you to a specialist" / "the contact form below routes through to..."
   → CTR-FAIL gap-mode — page has some GSC signal but converts poorly; depth + intent-match + LEAD-GEN-handoff voice is the play
   → City accountant cluster — cross-link to other city accountant pages (Leicester, London, Liverpool, Bournemouth, etc. if they exist on main); voice + structure should match if there's a cluster pattern, OR establish a pattern this page can anchor

3. **T3** `briefs/property/track2/trial/2027-property-tax-rates-section-24-relief-uk-landlords.md`
   → Target: `Property/web/content/blog/2027-property-tax-rates-section-24-relief-uk-landlords.md`
   → **STRUCTURE-ONLY BRIEF — fetch data fresh.**
   → **F-2 critical fix (Bill-vs-enacted hedging):** verify §7 LOCKED status against legislation.gov.uk at write time. Finance Act 2026 may have received Royal Assent (check) — if YES, frame as ENACTED; if NO, hedge as "announced 30 October 2024, scheduled for April 2027 subject to Finance Act 2026 receiving Royal Assent". Wave 6's F-9 confirmed s.455 35.75% IS enacted via FA 2026, but that's a different rate — verify the income-tax property surcharge specifically.
   → Statute spine: ITA 2007 s.272A (Section 24 restriction post-FA 2020) + (if enacted) Finance Act 2026 property-income surcharge sections + CTA 2010 (CT alternative for LtdCo landlords); verify each at write time
   → CANNIBAL gap-mode — F-3 catalogues 2 intra-residual near-duplicate sibling slugs that should REDIRECT-PROPOSED to this page; that's a FUTURE Phase 3+ task, not in current scope. Your job is to make T3 the cluster anchor (depth + statute + worked examples + cross-links).

4. **T4** `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`
   → Target: `Property/web/content/blog/cgt-rates-property-2026-27-current-rates-explained.md` (existing canonical, rewritten 2026-05-21)
   → **GOLD-REFERENCE DATA-COMPLETE BRIEF + SPECIAL-CASE CANONICAL-REWRITE.** This is a depth-up of the existing canonical against the brief. Read the existing canonical end-to-end FIRST; note current depth (~2,500-3,000 words?) and structure; then identify the specific sections the brief calls for uplift (statute spine completeness, worked-example density, INTENT-MISMATCH framing for AI-overview audience, CTR-FAIL queries at high impressions / low position the rewrite targets).
   → Statute spine: TCGA 1992 s.1A + s.1H + s.1I + s.1J (NOT s.4 — substituted by FA 2019, content gutted per F-8) + s.4BA + Sch 1 + s.169H BADR + s.169R (lifetime cap £1M post-FA 2025 — verify) — verify each at write time
   → **F-5 + F-6 fixes baked into brief:** unhedged April 2027 22/42/47 assertion needs §7 LOCKED Bill-form hedge; INTENT-MISMATCH framing means CTR-lift target tempered (5-10x not 50x to ideal-CTR baseline)
   → Cross-link partners: all 6 Batch 1/2 REWRITE outputs that the other worktrees ship (your T4 commits LAST in worktree C, so by the time you commit you can cite them by slug — but verify they're on your worktree branch's view of main; you may need to merge main into your worktree branch before T4 commit to pick up A + B's commits)

**Per-brief workflow:** identical 19-step legacy-rewrite execution as Worktree A (see Worktree A prompt for full step list). For T4 specifically, treat steps 5 + 10 as DEPTH-UP not REPLACE — preserve everything in the existing canonical that the brief still validates; uplift what the brief calls for.

**Hard constraints:** identical to Worktree A.

**Output to chat when complete:** same format as Worktree A — list each of 4 briefs with commit hash + word count + FAQ count + key flags resolved + URLs verified count + new flags/discoveries + monitored_pages staging.

**Time estimate:** 6-9 hours for 4 REWRITE briefs at gold-reference depth (T1/T2/T3 need fresh data fetch which adds 30-45 min each; T4 is depth-up of existing canonical which can go faster IF current canonical is close to brief target). Take breaks; hand off if context fills.
```

---

## Worktree REDIRECTS — REDIRECT bundle (6 redirects + middleware + source deletions + internal-link survey)

**Open a new Claude Code terminal at:** `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/`

```
You are the Worktree REDIRECTS sub-agent for Track 2 Phase 3 — REDIRECT bundle EXECUTION. Working in the worktree branch `track2-phase3-redirects` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/`. Bucket: 6 REDIRECT operations across the 60-day-CGT cluster collapse (5 redirects → `cgt-payment-deadlines-property-sales-2026`) + 1 cross-cluster redirect (1 → `cgt-selling-buy-to-let-property-calculation-guide`).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take 6 REDIRECT-PROPOSED briefs, you make the redirects live in middleware.ts, you delete the 6 source markdowns, you patch every internal link on the site that points to the 6 deleted slugs.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_redirects.md` via ABSOLUTE PATH. Same discipline for tracker, flags, discovery.

Read first, in this order (~20 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — §0 norms, §7 cannibalisation protocol, §10 tracker convention, §13 sub-agent instructions, §15 quality gates.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — particularly §16.14/§16.15/§16.37 absolute-path tracker edits + §16.31 URL liveness + §16.36 statutory-citation cross-check.
3. `C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md` — confirm your 6 rows in the Phase 3 dispatch section + read the post-merge close tasks.
4. `C:/Users/user/Documents/Accounting/docs/property/track2_cannib_index_2026-05-23.md` — §6 known cross-source pairs + §7 in-flight tables.
5. **The 6 REDIRECT briefs** at:
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-complete-guide.md` (B1-B1)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-rule.md` (B1-B2)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/cgt-reporting-deadlines-property-2026.md` (B1-B3) — F-15 lift already shipped on main; verify the lifted content survives in the calculation walkthrough sibling before deleting this source
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/how-to-report-property-sale-hmrc-60-days.md` (B2-A1) — D-11 lift already shipped on main; verify the lifted content survives in the 60-day-CGT canonical before deleting this source
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/report-property-sale-hmrc-60-days-guide.md` (B2-A2)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/capital-gains-tax-selling-rental-property-uk.md` (B2-A3) — D-12 lift already shipped on main; verify the lifted content survives in the BTL CGT calculation canonical before deleting this source
6. **The 2 redirect target canonicals** (read end-to-end before any redirect lands):
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` (target for B1-B1, B1-B2, B1-B3, B2-A1, B2-A2) — verify F-13 back-patch still present + D-11 lift (H3 "Filing without digital access") still present
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-selling-buy-to-let-property-calculation-guide.md` (target for B2-A3 only) — verify D-12 lift (H2 "Capital Losses on Disposal") still present
7. **The current middleware.ts** at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/src/middleware.ts` — search for `DUPLICATE_REDIRECTS` map; understand the format of existing entries; you will add 6 new entries.
8. `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md` — full file. **Read F-13 + F-14 + F-15 + F-16 + F-19 + F-21 + F-22 + F-32 + F-33 + F-34 + F-35 + resolution log** for context on cluster + canonical state.

**Your 6 REDIRECTs (2 commit bundles):**

**Commit 1 — 5 redirects to `cgt-payment-deadlines-property-sales-2026` (F-16 cluster collapse complete):**
- B1-B1: `60-day-cgt-reporting-property-sales-complete-guide` → `cgt-payment-deadlines-property-sales-2026`
- B1-B2: `60-day-cgt-reporting-property-sales-rule` → `cgt-payment-deadlines-property-sales-2026`
- B1-B3: `cgt-reporting-deadlines-property-2026` → `cgt-payment-deadlines-property-sales-2026`
- B2-A1: `how-to-report-property-sale-hmrc-60-days` → `cgt-payment-deadlines-property-sales-2026`
- B2-A2: `report-property-sale-hmrc-60-days-guide` → `cgt-payment-deadlines-property-sales-2026`

**Commit 2 — 1 redirect to `cgt-selling-buy-to-let-property-calculation-guide`:**
- B2-A3: `capital-gains-tax-selling-rental-property-uk` → `cgt-selling-buy-to-let-property-calculation-guide`

**Per-bundle workflow:**

**Pre-redirect verification (do once, for all 6):**

1. **Claim the rows:** mark all 6 Phase 3 status rows 🔵 phase3_in_progress in tracker via ABSOLUTE PATH to main repo file.
2. **Lift verification:** confirm the 3 pre-execution lifts are still present on main:
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md` — Grep for "Worked example 2a: large gain with a small unused basic-rate band" — must be present (F-15)
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-selling-buy-to-let-property-calculation-guide.md` — Grep for "Capital Losses on Disposal" + "TMA 1970 s.43" must both be present (D-12)
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` — Grep for "Filing without digital access" + "0300 200 3300" must both be present (D-11) + F-13 back-patch verify: Grep for "paragraph 3 sets the reporting and payment obligation, extended from 30 to 60 days by the Finance Act 2022" must be present
   - **If ANY of the lifts is missing on the worktree branch, do NOT proceed — STOP and flag to manager** (something has gone wrong with the worktree base or with the manager's main commits).
3. **Canonical health-check:** Read both target canonicals end-to-end. Confirm structure + voice + completeness — these are absorbing 5 + 1 redirect equities. No content edits at this step; just verification that the canonicals are ready to absorb.

**Commit 1 — 5 redirects to 60-day-CGT canonical:**

4. **Middleware edit (single edit, 5 entries):** open `Property/web/src/middleware.ts` in the worktree subdir. Locate `DUPLICATE_REDIRECTS` map. Add 5 entries — preserve the existing map's format exactly. Each entry maps the source slug to the canonical slug. Confirm Edit tool sees the EXACT existing format before adding (no whitespace drift).
5. **Delete 5 source markdowns** from `Property/web/content/blog/`:
   - `60-day-cgt-reporting-property-sales-complete-guide.md`
   - `60-day-cgt-reporting-property-sales-rule.md`
   - `cgt-reporting-deadlines-property-2026.md`
   - `how-to-report-property-sale-hmrc-60-days.md`
   - `report-property-sale-hmrc-60-days-guide.md`
   Use `git rm` for clean staging.
6. **Internal-link survey for 5 slugs:** Grep across:
   - `Property/web/content/blog/*.md` for each of the 5 deleted slugs (full-path internal `<a href>` and slug-only references)
   - `Property/web/src/**/*.tsx` for each of the 5 deleted slugs (component-level cross-references)
   - `Property/web/src/**/*.ts` for each of the 5 deleted slugs (data-file references like sitemap inputs, related-post arrays)
   Per F-11 INVISIBLE-page pattern + B2-A1's 12-GA4-sessions-vs-2-baseline finding: B2-A1's internal-link footprint is non-trivial. Expect ~10-30 hits across the 5 slugs combined. Update each occurrence to the canonical slug `cgt-payment-deadlines-property-sales-2026`.
7. **Build verify after middleware + deletions + link patches:** `cd Property/web && npm run build`. Must pass; sitemap regenerates without the 5 old slugs. Sitemap should grow shorter by 5 entries.
8. **Commit 1 (surgical):** stage the modified middleware.ts + the 5 git-rm'd source markdowns + every modified internal-link-surveyed file. Commit message: `Track 2 Phase 3 (redirects): 5-redirect bundle to cgt-payment-deadlines-property-sales-2026 canonical (F-16 cluster collapse complete)`. Include in commit body: source slug list + internal-link patch count + sitemap delta confirmation.

**Commit 2 — 1 redirect to BTL CGT calculation canonical:**

9. **Middleware edit (1 entry):** add 1 entry to `DUPLICATE_REDIRECTS` map for B2-A3.
10. **Delete 1 source markdown:** `git rm Property/web/content/blog/capital-gains-tax-selling-rental-property-uk.md`.
11. **Internal-link survey for 1 slug:** Grep across `*.md` + `*.tsx` + `*.ts` for `capital-gains-tax-selling-rental-property-uk`. Update each occurrence to `cgt-selling-buy-to-let-property-calculation-guide`.
12. **Build verify:** `cd Property/web && npm run build`. Must pass; sitemap delta = -1.
13. **Commit 2:** stage middleware + deletion + link patches. Commit message: `Track 2 Phase 3 (redirects): 1-redirect bundle to cgt-selling-buy-to-let-property-calculation-guide canonical`.

**Post-bundle:**

14. **Tracker mark-done:** mark all 6 Phase 3 status rows ✅ executed in tracker via ABSOLUTE PATH. Record both commit hashes in the Branch + Commit columns of the original Batch 1/2 sub-bucket B + sub-bucket A row tables.
15. **monitored_pages staging:** append to discovery log 6 lines for redirect_post inserts:
    - `monitored_pages row needed: source=<slug>, target=<canonical>, tracking_type=redirect_post, redirect_date=<today>, window=90d` × 6
    Manager batch-inserts at close.
16. **Cannib Index close:** append to discovery log: "F-16 cluster collapse COMPLETE — 5-page collapse to cgt-payment-deadlines-property-sales-2026; B2-A3 standalone redirect to cgt-selling-buy-to-let-property-calculation-guide. Recommend manager mark F-16 RESOLVED in track2_site_wide_flags.md resolution log + close §7 Batch 1 + Batch 2 in-flight tables in Cannibalisation Index."
17. **Discovery log final entry:** any execution-time finding (internal-link patches surprise count, build edge cases, middleware format learnings). Numbering: D-R1, D-R2, etc.
18. **Flag log:** if you find a new pattern flag during execution, append to `track2_site_wide_flags.md`. Phase 3 starts at F-37.

**Hard constraints (Phase 3 — inherits Track 2 norms):**
- Do NOT delete the 3 pre-execution-lift target canonicals (cgt-calculation-selling-buy-to-let-property-step-by-step / cgt-selling-buy-to-let-property-calculation-guide / cgt-payment-deadlines-property-sales-2026) — they're the redirect TARGETS, not sources.
- Do NOT touch any other markdown file in `Property/web/content/blog/` outside the 6 named sources.
- Do NOT touch any Wave 5/6/7 file outside the absolute-path-tracker / flags / discovery files.
- Do NOT auto-deploy.
- Do NOT use `git add .` or `git add -A`. Surgical staging only.
- Do NOT commit on main directly. Worktree branch only.
- Do NOT amend or force-push.
- Do NOT skip build verification.

**Manager merge order at close:** A → B → C → REDIRECTS. Your worktree merges LAST so that the canonical depth-ups in worktrees A + B + C (where applicable) land before the redirect bundle removes the legacy sources. If any of worktrees A/B/C hasn't merged, do NOT merge yet — flag to manager and wait.

**Output to chat when complete:**

```
Worktree REDIRECTS Phase 3 close — 6 redirects across 2 commits

Commit 1 (5 redirects to cgt-payment-deadlines-property-sales-2026): <commit hash>
- Sources deleted: B1-B1, B1-B2, B1-B3, B2-A1, B2-A2
- Middleware entries added: 5
- Internal-link patches: <count> across <file count> files
- Sitemap delta: -5

Commit 2 (1 redirect to cgt-selling-buy-to-let-property-calculation-guide): <commit hash>
- Sources deleted: B2-A3
- Middleware entries added: 1
- Internal-link patches: <count> across <file count> files
- Sitemap delta: -1

Build verify: PASS / FAIL (details)
F-16 cluster collapse: COMPLETE
Lift verifications passed: F-15 / D-11 / D-12 all present on worktree branch
monitored_pages staging: 6 rows recorded in discovery log
Branch: track2-phase3-redirects at <commit 2 hash>
Time taken: <hours>
Open questions for manager: <list, or "none">
```

**Time estimate:** 2-3 hours total. Most of the time is internal-link survey + verification (manual Grep-and-Edit across many files). The middleware edit + deletions themselves are fast.
```

---

## Manager polling pattern (for the user — between sub-agent dispatches)

When the 4 sub-agents are running in their terminals, the **manager session (main terminal)** can be paused. The user returns to the manager when:

1. **A sub-agent posts a chat summary** — the user pastes it to manager, manager logs to TRACK2_PROGRAM §3 heartbeat + cross-checks tracker rows for that worktree
2. **A Q&A file gets an entry** — the user can ask the manager "answer Q-1 in worktree A Q&A" and manager polls + answers via direct edit of the Q&A file (manager's reply also goes via absolute path)
3. **All 4 sub-agents finish** — user pastes all 4 chat summaries; manager runs the post-merge close protocol (see tracker Phase 3 dispatch section)

**While sub-agents run, the manager is idle.** That's the design — context-cheap for the manager, parallel throughput on the briefs.

**Expected Q&A volume for Phase 3:** higher than brief drafting because EXECUTION can surface in-the-moment statute-drift / build / link-survey questions. Realistic estimate: 1-3 questions per worktree across the run.

**Cross-worktree dependencies:**
- Worktree C's T4 (last brief, depth-up of existing canonical) benefits from worktrees A + B having committed first — T4 can cross-link to their fresh rewrites. If user dispatches all 4 worktrees simultaneously, T4 may merge main into its branch before the T4 commit to pick up A + B work.
- Worktree REDIRECTS merges LAST. If user dispatches worktree REDIRECTS in parallel, it should NOT commit until worktrees A + B + C have merged (manager controls merge timing).

---

## End-of-Phase-3 close protocol (manager — me, when sub-agents return)

1. Read all 4 chat summaries from user
2. Read all 4 Q&A files for any unanswered questions
3. Read all 4 discovery logs for cross-worktree flags + monitored_pages staging
4. Read `track2_site_wide_flags.md` for new F-flags raised during Phase 3 (Phase 3 starts numbering at F-37)
5. Run a 5% spot-check on each worktree's rewrites: 1 random brief per worktree, end-to-end review against the brief, including statute citation re-verification
6. Cross-check Wave 7 close state — has Wave 7 closed? are there new HP locks that affect any Phase 3 rewrite?
7. Run the 7 quality gates per TRACK2_PROGRAM §15 across all 16 REWRITEs (frontmatter, statute, internal-link, em-dash, pricing-leak, house-position, anti-templating, Wave collision)
8. Update tracker: confirm all 22 rows ✅ executed; fill in Branch + Commit columns
9. Merge worktree branches to main in order: `track2-phase3-a` → `track2-phase3-b` → `track2-phase3-c` → `track2-phase3-redirects` (REDIRECT last)
10. Final build verify on merged main: `cd Property/web && npm run build`. Must pass.
11. Batch-insert `monitored_pages` Supabase rows from discovery-log staging: 16 REWRITE rows + 6 REDIRECT rows. 90-day window from merge date.
12. Update Cannibalisation Index §7: close Batch 1 + Batch 2 in-flight tables; mark F-16 cluster fully resolved.
13. Update TRACK2_PROGRAM.md §3 heartbeat with Phase 3 close summary + commit hashes per row + new flags + monitored_pages count.
14. Report to user with the summary: 22 operations completed + new flag count + cluster-collapse outcome + monitored_pages row count + Phase 3 deploy decisions pending (timing + bundling with held W4+W5+W6 pool).

---

## Files this phase creates / updates

**Creates (per worktree):**
- 16 modified markdown files in `Property/web/content/blog/<slug>.md` (the 16 REWRITE targets)
- 1 modified `Property/web/src/middleware.ts` (DUPLICATE_REDIRECTS map gets 6 entries)
- 0 to ~30 internal-link patches across `Property/web/content/blog/*.md` + `Property/web/src/**/*.tsx`
- 6 deletions in `Property/web/content/blog/` (the REDIRECT source markdowns)

**Updates (shared, concurrency-safe via row-only-yours discipline + ABSOLUTE-PATH edits):**
- `docs/property/track2_page_tracker.md` — Phase 3 dispatch section + Branch/Commit columns
- `docs/property/track2_cannib_index_2026-05-23.md` §7 in-flight tables (closed at manager close)

**Appends (worktree isolated, no conflict):**
- `docs/property/track2_phase3_questions_{a,b,c,redirects}.md` — 1 per worktree
- `docs/property/track2_phase3_discovery_log_{a,b,c,redirects}.md` — 1 per worktree
- `docs/property/track2_site_wide_flags.md` — shared, append-only (Phase 3 starts at F-37)

**Never touches:**
- Any `wave5_*`, `wave6_*`, `wave7_*`, `NETNEW_PROGRAM`, `house_positions`, `topic_gaps_final` file (read-only)
- Any Wave-N net-new blog page in `Property/web/content/blog/`
- Other worktrees' output files
- The 4 trial briefs (worktree C exclusive) or the Batch 1/2 brief files outside each sub-agent's named scope
- Each other's Q&A / discovery log files
