# Phase 3 Session A — paste-ready pickup

**How to use this file:** open a new Claude Code terminal at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-a/`. Copy everything below the first horizontal rule and paste as the first message in that terminal. The sub-agent reads it, then executes 6 REWRITE briefs end-to-end against `Property/web/content/blog/`.

---

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
    - **Voice:** practitioner-tone (not consumer-tone). Tight sentences. No filler. "we" / "our team" sparingly. **NO em-dashes** (`—` must return zero on grep). Commas, full stops, parentheses, colons, middle dots instead. No pricing on-site (no "£300-£600" / "from £1,500" ranges). No real client names. The lead-gen handoff model means the page educates, then routes a qualified reader to the contact form. The form is the conversion; the page is the demand-capture.
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
