# Phase 3 Session B — paste-ready pickup

**How to use this file:** open a new Claude Code terminal at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-b/`. Copy everything below the first horizontal rule and paste as the first message in that terminal. The sub-agent reads it, then executes 6 REWRITE briefs end-to-end against `Property/web/content/blog/`.

---

You are the Worktree B sub-agent for Track 2 Phase 3 — legacy rewrite EXECUTION. Working in the worktree branch `track2-phase3-b` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-b/`. Bucket: CGT scenarios + applied mechanics (6 REWRITE briefs across divorce / inherited / spouse / NRCGT / two-property PRR election / commercial vs residential).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take a 🟢 brief_drafted brief, you produce a fully rewritten markdown page that ships to production.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_b.md` via ABSOLUTE PATH to the MAIN REPO file (not the worktree's relative path). Same discipline for tracker (`C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md`), flags (`C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md`), discovery (`C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_b.md`).

Read first, in this order (~30 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — §0 norms, §4 brief anatomy, §7 cannibalisation protocol, §10 tracker convention, §13 sub-agent instructions, §14 manager self-awareness, §15 quality gates, §20 glossary.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — particularly §16.18 reasoning-first, §16.22+§16.27+§16.30+§16.33+§16.40 Bill-vs-enacted-Act drift pattern (13+ consecutive catches across the program), §16.14+§16.15+§16.37 absolute-path edits, §16.36 statutory-citation cross-check gate, §16.38 manager-prompt-drift, §16.41 watcher-template hygiene, §16.42 EXISTING_PAGE_STALE density (expect to surface adjacent-content STALE flags), §16.43 sub-agent STALE-sweep dispatch validated, §16.44 WebFetch summarizer can hide HTML table content, §16.45 Wave 7 HP-lock catch-list.
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

**Per-brief workflow (19 steps — full legacy-rewrite execution):**

1. **Claim:** mark 🔵 phase3_in_progress in tracker (your row in the Phase 3 dispatch table) via ABSOLUTE PATH to main repo file. Record the start timestamp.
2. **Heartbeat re-read:** before each brief, re-read `track2_page_tracker.md` Phase 3 dispatch section + `track2_site_wide_flags.md` resolution log. New flags / new Wave 7 commits could have landed between briefs.
3. **Brief re-read:** read your assigned brief end-to-end. Note every statute spine, every authority URL, every worked-example structure called out, every cross-link target.
4. **Fresh data pull:** `python -m optimisation_engine.track2.pull_page_data --slug <slug> --days 90`. Confirm GSC + GA4 baseline matches brief; flag if data shifted materially.
5. **Read existing source:** open `Property/web/content/blog/<slug>.md`. Note the legacy framing you must remove vs the GSC-signal you must preserve.
6. **Read 2-3 canonical-rewrite siblings** for structure / voice reference per the brief's cross-link list (`cgt-payment-deadlines-property-sales-2026.md` + `cgt-calculation-selling-buy-to-let-property-step-by-step.md` + `cgt-selling-buy-to-let-property-calculation-guide.md` have the freshest voice).
7. **Statute citation cross-check (§16.36 gate):** WebFetch every legislation.gov.uk URL the brief cites. Confirm URL liveness AND content. If WebFetch is denied per §16.44, note carry-forward verification source + date and proceed.
8. **HMRC manual + gov.uk URL verification:** WebFetch every HMRC manual + gov.uk URL the brief cites. Per F-7 — never cite a manual section URL without confirming 200 + content match.
9. **Competitor URL re-verification:** WebFetch the 3-5 competitor URLs the brief cites. Date-stamp at write time.
10. **Rewrite the markdown file end-to-end** to gold-reference depth (2,800-3,500 words, 12+ FAQs, full statute spine with legislation.gov.uk anchors, ≥1 table, ≥1 worked example where applicable, ≥2 internal `<aside>` CTA hooks, cluster + Wave 5/6 cross-links per brief). Practitioner voice. **NO em-dashes.** No pricing. No real client names. Frontmatter: metaTitle ≤62 chars; metaDescription ≤155 chars; preserve existing metaTitle/Description as `_prev` fields.
11. **Quality gate run:** frontmatter complete + statutes verified + HMRC URLs verified + competitor URLs verified + em-dash grep returns zero + pricing-leak grep returns zero + internal-link targets exist + house-position §N.M references valid + anti-templating + Wave collision re-scan.
12. **Build verify** at brief end or every 2-3 briefs: `cd Property/web && npm run build`. Must pass.
13. **Commit on worktree branch** (per-brief, surgical staging): `git add Property/web/content/blog/<slug>.md` + any internal-link patches. Commit message: `Track 2 Phase 3 (B): REWRITE <slug> against brief B<N>-<X>`. Body: word count + FAQ count + key flags resolved.
14. **Mark ✅ executed in tracker** via ABSOLUTE PATH. Record branch + commit hash in Branch + Commit columns AND in Phase 3 dispatch table status column.
15. **Discovery log:** append findings to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_b.md`. Numbering: D-B1, D-B2, etc.
16. **Flag log:** new flags to `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md`. Phase 3 starts at F-37.
17. **monitored_pages staging:** append to discovery log: `monitored_pages row needed: slug=<slug>, tracking_type=rewrite_post, baseline_imp=<X>, baseline_clicks=<Y>, window=90d`.
18. **Cross-worktree heartbeat:** if Wave 7 commits land between briefs, re-read Wave 7 flags before next brief.
19. **Move to next brief.**

**Hard constraints:**
- Do NOT touch any `wave5_*`, `wave6_*`, `wave7_*`, `NETNEW_PROGRAM.md`, `house_positions.md`, `topic_gaps_final.md`, or Wave-N tracker file (read-only).
- Do NOT touch any Wave-N net-new blog page in `Property/web/content/blog/` outside your 6 named legacy slugs.
- Do NOT touch worktree A's, C's, or REDIRECTS's output files.
- Do NOT touch the REDIRECT brief files.
- Do NOT auto-deploy. Vercel CLI on explicit user authorisation only.
- Do NOT use `git add .` or `git add -A`. Surgical staging only.
- Do NOT commit on main directly. Worktree branch only. Manager merges at close.
- Do NOT amend or force-push. New commits only.
- Do NOT skip build verification.

**Output to chat when complete (the user pastes this back to manager terminal):**

```
Worktree B Phase 3 close — 6 REWRITEs

Briefs executed:
- B1-C2 cgt-inherited-rental-property-calculation-uk: <commit hash>, <word count>, <FAQ count>, key flags: <list>
- B1-C1 cgt-divorce-property-transfer-tax-implications: ...
- B1-C3 cgt-property-transfer-spouse: ...
- B2-C1 non-resident-cgt-uk-property-rates-reporting: ...
- B2-C2 cgt-main-residence-election-two-properties: ...
- B2-C3 cgt-commercial-property-different-residential: ...

Build verify: PASS / FAIL (details)
URLs verified: <count> live + <count> carried-forward + <count> denied per §16.44/F-36
New flags: F-37, F-38, ... (or none)
New discoveries: D-B1, D-B2, ... (or none)
monitored_pages staging: 6 rows recorded in discovery log
Branch: track2-phase3-b at <final commit hash>
Time taken: <hours>
Open questions for manager: <list, or "none">
```

**Time estimate:** 6-9 hours for 6 REWRITE briefs at gold-reference depth (~60-90 min per brief). Take breaks; if you hit context fill mid-stream, write a heartbeat to TRACK2_PROGRAM.md §3 and hand off cleanly per §14.
