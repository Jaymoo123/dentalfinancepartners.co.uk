# Phase 3 Session C — paste-ready pickup

**How to use this file:** open a new Claude Code terminal at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-c/`. Copy everything below the first horizontal rule and paste as the first message in that terminal. The sub-agent reads it, then executes 4 REWRITE briefs (including the T4 special-case canonical depth-up) end-to-end against `Property/web/content/blog/`.

---

You are the Worktree C sub-agent for Track 2 Phase 3 — legacy rewrite EXECUTION. Working in the worktree branch `track2-phase3-c` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-c/`. Bucket: Trial cohort (4 REWRITE briefs across airbnb / Birmingham / 2027 Section 24 / cgt-rates — the trial picks that proved the Track 2 brief drafting pattern, now ready for execution).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take a 🟢 brief_drafted brief, you produce a fully rewritten markdown page that ships to production.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_c.md` via ABSOLUTE PATH to the MAIN REPO file. Same discipline for tracker, flags, discovery.

**KEY DIFFERENCE FROM WORKTREES A + B:**
- T1, T2, T3 briefs are **STRUCTURE-ONLY** (hand-drafted at trial phase before the gold-reference data-complete pattern was established). You must fetch GSC + GA4 + competitor data + statute citations FRESH at execution time — these briefs do not have the baked-in data the Batch 1/2 briefs have.
- T4 is the **gold-reference data-complete brief** AND a **special-case canonical-rewrite** — the slug `cgt-rates-property-2026-27-current-rates-explained` already exists as a 2026-05-21 rewritten canonical. Your Phase 3 task on T4 = depth-up REWRITE of the existing canonical AGAINST the gold-reference brief (not a fresh rewrite from scratch). Read the existing canonical carefully; preserve everything that the brief still validates; UPLIFT depth + statute spine + worked examples where the brief calls for more.

Read first, in this order (~30 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — full file.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — particularly §16.18 / §16.22 / §16.27 / §16.30 / §16.33 / §16.36 / §16.38 / §16.40-§16.45.
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
   → **GOLD-REFERENCE DATA-COMPLETE BRIEF + SPECIAL-CASE CANONICAL-REWRITE.** This is a depth-up of the existing canonical against the brief. Read the existing canonical end-to-end FIRST; note current depth and structure; then identify the specific sections the brief calls for uplift (statute spine completeness, worked-example density, INTENT-MISMATCH framing for AI-overview audience, CTR-FAIL queries at high impressions / low position the rewrite targets).
   → Statute spine: TCGA 1992 s.1A + s.1H + s.1I + s.1J (NOT s.4 — substituted by FA 2019, content gutted per F-8) + s.4BA + Sch 1 + s.169H BADR + s.169R (lifetime cap £1M post-FA 2025 — verify) — verify each at write time
   → **F-5 + F-6 fixes baked into brief:** unhedged April 2027 22/42/47 assertion needs §7 LOCKED Bill-form hedge; INTENT-MISMATCH framing means CTR-lift target tempered (5-10x not 50x to ideal-CTR baseline)
   → Cross-link partners: all 6 Batch 1/2 REWRITE outputs that the other worktrees ship (your T4 commits LAST in worktree C, so by the time you commit you can cite them by slug — but verify they're on your worktree branch's view of main; you may need to merge main into your worktree branch before T4 commit to pick up A + B's commits)

**Per-brief workflow (19 steps — full legacy-rewrite execution):**

1. **Claim:** mark 🔵 phase3_in_progress in tracker via ABSOLUTE PATH. Record start timestamp.
2. **Heartbeat re-read:** before each brief, re-read tracker + flags. New Wave 7 commits could have landed.
3. **Brief re-read:** read your assigned brief end-to-end. Note every statute spine, every authority URL, every worked-example structure called out, every cross-link target. **For T1/T2/T3: also note which data you need to fetch fresh** (these briefs are structure-only).
4. **Fresh data pull (REQUIRED for T1/T2/T3, optional for T4 since gold-reference brief already has baked data):** `python -m optimisation_engine.track2.pull_page_data --slug <slug> --days 90`. Capture GSC queries + GA4 sessions.
5. **Read existing source:** open `Property/web/content/blog/<slug>.md`. For T4 specifically: this is a DEPTH-UP not a REPLACE — preserve everything the brief still validates.
6. **Read 2-3 canonical-rewrite siblings** for structure / voice reference.
7. **Statute citation cross-check (§16.36 gate):** WebFetch every legislation.gov.uk URL. Confirm liveness AND content. For T3: verify FA 2026 Royal Assent status (this affects the Bill-vs-enacted hedge framing). For T4: verify TCGA s.169R £1M BADR lifetime cap.
8. **HMRC manual + gov.uk URL verification:** WebFetch every HMRC manual + gov.uk URL.
9. **Competitor URL verification:** WebFetch competitor URLs. For T1/T2/T3 (structure-only briefs), you'll need to DISCOVER the competitor URLs at write time — search by primary query, pick 3-5 top organic + 1-2 best-in-class authority.
10. **Rewrite (or depth-up for T4) the markdown file end-to-end** to gold-reference depth (2,800-3,500 words, 12+ FAQs, full statute spine with legislation.gov.uk anchors, ≥1 table, ≥1 worked example where applicable, ≥2 internal `<aside>` CTA hooks, cluster + Wave 5/6 cross-links). Practitioner voice. **NO em-dashes.** No pricing on-site. No real client names. Frontmatter: metaTitle ≤62 chars; metaDescription ≤155 chars; preserve existing metaTitle/Description as `_prev` fields.
11. **Quality gate run:** frontmatter + statutes verified + HMRC URLs + competitor URLs + em-dash zero + pricing-leak zero + internal-link targets exist + house-position §N.M valid + anti-templating + Wave collision scan.
12. **Build verify** at brief end or every 2-3 briefs: `cd Property/web && npm run build`. Must pass.
13. **Commit on worktree branch:** `git add Property/web/content/blog/<slug>.md` + any internal-link patches. Commit message: `Track 2 Phase 3 (C): REWRITE <slug> against brief T<N>`. Body: word count + FAQ count + key flags resolved + (for T4) preservation map of which existing canonical sections were preserved verbatim vs uplifted vs replaced.
14. **Mark ✅ executed in tracker** via ABSOLUTE PATH.
15. **Discovery log:** append findings to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_c.md`. Numbering: D-C1, D-C2, etc.
16. **Flag log:** new flags to `track2_site_wide_flags.md`. Phase 3 starts at F-37.
17. **monitored_pages staging:** append to discovery log: `monitored_pages row needed: slug=<slug>, tracking_type=rewrite_post, baseline_imp=<X>, baseline_clicks=<Y>, window=90d`.
18. **Cross-worktree heartbeat:** if Wave 7 commits land between briefs, re-read Wave 7 flags before next brief. **Before T4 specifically:** check whether worktrees A + B have merged any commits to main — if so, you may want to merge main into your branch first so T4 can cross-link to their fresh rewrites by slug.
19. **Move to next brief.**

**Hard constraints:**
- Do NOT touch any `wave5_*`, `wave6_*`, `wave7_*`, `NETNEW_PROGRAM.md`, `house_positions.md`, `topic_gaps_final.md`, or Wave-N tracker file (read-only).
- Do NOT touch any Wave-N net-new blog page in `Property/web/content/blog/` outside your 4 named slugs.
- Do NOT touch worktree A's, B's, or REDIRECTS's output files.
- Do NOT touch the REDIRECT brief files.
- Do NOT auto-deploy. Vercel CLI on explicit user authorisation only.
- Do NOT use `git add .` or `git add -A`. Surgical staging only.
- Do NOT commit on main directly. Worktree branch only.
- Do NOT amend or force-push.
- Do NOT skip build verification.

**Output to chat when complete (the user pastes this back to manager terminal):**

```
Worktree C Phase 3 close — 4 REWRITEs

Briefs executed:
- T1 airbnb-tax-uk-short-term-rental-income-taxed: <commit hash>, <word count>, <FAQ count>, key flags: <list>
- T2 birmingham-property-accountant: ...
- T3 2027-property-tax-rates-section-24-relief-uk-landlords: ...
- T4 cgt-rates-property-2026-27-current-rates-explained: <commit hash>, <word count>, <FAQ count>, key flags: <list>, **preservation map**: <which existing sections preserved vs uplifted vs replaced>

Build verify: PASS / FAIL (details)
URLs verified: <count> live + <count> carried-forward + <count> denied per §16.44/F-36
New flags: F-37, F-38, ... (or none)
New discoveries: D-C1, D-C2, ... (or none)
monitored_pages staging: 4 rows recorded in discovery log
Branch: track2-phase3-c at <final commit hash>
Time taken: <hours>
Open questions for manager: <list, or "none">
```

**Time estimate:** 6-9 hours for 4 REWRITE briefs at gold-reference depth (T1/T2/T3 need fresh data fetch which adds 30-45 min each; T4 is depth-up of existing canonical which can go faster IF current canonical is close to brief target). Take breaks; hand off if context fills.
