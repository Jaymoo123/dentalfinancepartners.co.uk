# Track 2 REMEDIATION handover — fresh manager start-here (2026-05-29 PM)

**Read THIS first, then `docs/property/TRACK2_CITYSERVICE_AUTONOMOUS_PICKUP_2026-05-29.md` (full session state + per-cluster slug lists + engine commands).**

**Acknowledge the user with one short message**, e.g.: *"Picked up. CityService cluster (47 pages) is built + deployed, but an independent QA pass found real blocking errors on live pages that the writer-verify missed. I'm halting new clusters and remediating: verify-then-fix the confirmed issues, QA-sweep all ~40 live pages, fix the broken-links-from-lifts, redeploy. FA 2026 enactment confirmed (not an issue). Ready."* Then start remediation.

**Mode:** autonomous (user away, decides without confirmation, safest-when-uncertain) — memory `feedback_autonomous_mode`. The user is supportive and quality-focused; they explicitly asked for an independent QA and want it solid before scaling.

---

## 0. WHY YOU EXIST: live pages have real errors. Remediation is priority #1.
An independent QA (`scripts/track2_independent_qa.wf.js` — skeptical senior-UK-accountant lens, separate from the writer's own verify) on 6 risk-weighted LIVE pages returned **0 clean sign-offs, 2 minor, 4 blocking**. The writer-verify (`track2_rewrite_writer.wf.js` verify stage) was **too generous**: it said "arithmetic verified" on a page with a 2x math error and waved through a wrong-Act citation as "verified by substance." 6/6 sampled pages had issues, so assume the other ~36 shipped pages do too.

**DO NOT ship any new cluster work until the shipped pages are QA'd + remediated.** The CGT cluster apply is mid-flight (merge-verify done) but HELD — see §4.

---

## 1. GROUND TRUTH I already verified — do NOT re-litigate
- **FA 2026 IS ENACTED.** I WebFetched `legislation.gov.uk/ukpga/2026/11`: Finance Act 2026, **Royal Assent 18 March 2026**, ss.6-7 set property income rates **22%/42%/47% for 2027-28** (from 6 Apr 2027), Sch 1 amendments. The QA's **Cardiff flag claiming "FA 2026 not enacted / still Finance Bill 2025-26" is a FALSE POSITIVE** (it trusted a stale Nov-2025 technical note). All "enacted by Finance Act 2026 (Royal Assent 18 March 2026)" framing across the corpus is CORRECT — keep it. Scotland exception still holds: FA 2026 s.8/Sch 2 set Scottish property rates separately via Holyrood (so the 22/42/47 are rest-of-UK; edinburgh/aberdeen/reading already fixed for this).
- **LESSON (critical): BOTH automated layers err.** Writer-verify = too lenient; independent-QA = over-flagged Cardiff. Neither is ground truth. **Adjudicate EVERY flag yourself against legislation.gov.uk / gov.uk before fixing.** Internal-arithmetic flags you can verify by reading; statute flags need a WebFetch; link flags need a file/middleware check.

---

## 2. CONFIRMED-REAL blocking fixes (I verified these — apply them)
1. **bristol-property-accountant.md (LIVE)** — Section 24 worked example, body line ~123. Text: *"rental-attributable slice ... roughly £13,056 (the higher-rate tax on £32,640 ... less the £5,198 Section 24 credit) ... wedge ... roughly £10,396."* WRONG + self-contradictory: £13,056 = 40% × £32,640 is the figure BEFORE the credit. Post-credit = £13,056 − £5,198 = **£7,858**. The wedge £10,396 (= £13,056 − £2,660) double-counts; correct wedge = £7,858 − £2,660 = **£5,198** (= 20% × £25,990 lost relief). FIX: slice **£7,858**, wedge **£5,198**. (The company comparison £1,264 is correct; directional conclusion survives.)
2. **bristol + london: "ITA 2007 s.272A" is the WRONG ACT** (and the link `legislation.gov.uk/ukpga/2007/3/section/272A` 404s). The Section 24 finance-cost restriction is **ITTOIA 2005 ss.272A/272B** with the basic-rate reducer in ss.274A/B. Correct URL `legislation.gov.uk/ukpga/2005/5/section/272A`. bristol has it x2 in body; london at line ~82. (Same error I already fixed on milton-keynes + derby — s.272A is ITTOIA 2005, NOT ITA 2007.)
3. **london-property-accountant.md (LIVE, heavily-merged canonical):**
   - **SDLT FAQ line 19**: states total SDLT on a £600k flat is **£39,500** but its own breakdown is "£20,000 standard + £30,000 surcharge" (= £50,000) and the body (line 137) correctly totals **£50,000**. FIX: £39,500 → **£50,000**.
   - line ~82: Section 24 attributed to "Income Tax Act 2007 s.272A" → **ITTOIA 2005** (see #2).
   - line ~180: 60-day CGT cited as "TCGA 1992 Schedule 2 paragraph 6" → it is **Schedule 2 to the Finance Act 2019** (30-day window extended to 60 days for completions on/after 27 Oct 2021). VERIFY the exact cite, then fix.
   - **Broken internal links (introduced by my collapse-lift):** `/blog/property-accountant-services/how-to-choose-a-property-accountant-london` (x3, lines ~54/274/312) — VERIFIED the `-london` slug does NOT exist; correct target is `how-to-choose-a-property-accountant` (EXISTS, same category). And `/blog/non-resident-landlord-tax/non-resident-landlord-tax` (line ~215) — VERIFIED missing; correct is `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide`.
   - **ATED 2026/27 table (lines ~165-170)**: QA says figures are stale/understated. NOT yet verified — WebFetch gov.uk "ATED chargeable amounts 2026 to 2027" and correct if wrong (do not trust the QA's replacement figures blindly).
4. **what-does-a-property-accountant-do.md (LIVE, heavily-merged canonical):**
   - "15% flat rate on £500k+ company residential" → **17% since 31 Oct 2024** (Autumn Budget 2024 raised the corporate enveloping SDLT rate 15%→17%). Verify on gov.uk "SDLT: corporate bodies", then fix.
   - Body links (x2+) to `/blog/property-accountant-services/property-accountant-vs-general-accountant` — that slug was **collapsed/redirected → this same page** (301 back to itself). FIX: remove or repoint those links + the FAQ prose referencing the comparison.

---

## 3. SYSTEMATIC bug: broken-links-from-lifts (sweep required)
The collapse-lift step (`track2_apply_lifts.wf.js`) added internal links to **assumed** sibling slugs that don't exist (the two london 404s above). This likely affects other lifted canonicals + rewrites. **Sweep: grep every rewritten/lifted page's `/blog/...` internal links and confirm each resolves to a real file in `Property/web/content/blog/` OR has a middleware redirect** (`Property/web/src/middleware.ts` SLUG_TO_CATEGORY_MAP + DUPLICATE_REDIRECTS). Fix every 404. A quick script: for each href, check `content/blog/<lastsegment>.md` exists or the slug is a DUPLICATE_REDIRECTS key.

---

## 4. REMEDIATION PLAN (in order)
1. Fix the §2 confirmed issues (verify ATED + 60-day-CGT-cite + 17% against ground truth first).
2. **Run `track2_independent_qa.wf.js` across ALL ~40 live CityService pages** (Tier-1 13 + Tier-2 26 + the 2 collapse canonicals + the Phase-3/2026-05-21 canonicals that received lifts), in batches of ~10. Triage every flag (real vs false-positive, like the Cardiff one). Fix real ones.
3. Run the §3 link-resolution sweep; fix 404s.
4. `cd Property/web && npm run build` → commit (scoped) → redeploy (`VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes` from repo root). monitored_pages rows already exist (same URLs) — no re-insert.
5. ONLY THEN resume the program. **CGT cluster is mid-flight (HELD):** triage done (6 collapse + 1 rewrite) + merge-verify done (see pickup doc §"CGT cluster triage"; verdicts in the wf output — mostly confirm-with-lift). Finish CGT (apply-lifts → middleware → remove → monitor → rewrite cgt-record-keeping), then Incorporation(35), Section24(27 collapse-heavy), CapitalAllowances(21 collapse-heavy), VATcalc(4), smaller clusters.

## 5. ENGINE FIX (root cause — do before mass-producing more)
The writer's own verify stage is too lenient. **Fold the independent-QA into the pipeline as a MANDATORY pre-deploy stage** (not a sample): make the verify (a) INDEPENDENTLY recompute every worked-example number, (b) treat any dead legislation.gov.uk link as a HARD FAIL (never "verified by substance"), (c) check every internal link resolves. Update `track2_rewrite_writer.wf.js` accordingly, or chain `track2_independent_qa.wf.js` after every rewrite batch before deploy.

## 6. STATE (done + live this session)
- `/blog` 502 fixed + lead-capture feature (commits `3f587fbd`, `7da4a764`) — live, good.
- Source refresh run + PARKED (MW4 deferred ~2 weeks for GSC maturity).
- Track 2 Phase 3 monitoring gap closed (22 pages).
- Site-wide leaked-markup strip (34 pages, commit `d8301db3`) — clean.
- **CityService cluster built + deployed (47/47):** 8 collapse + 13 Tier-1 + 26 Tier-2. Commits `6e85f71c` (collapse), `22b82a40` (Tier-1), `27ec789e` (Tier-2A), `7eb620c8` (Tier-2B), `541f181c`/(pickup). **<- THESE are the pages now under remediation.**
- ~82 pages on `monitored_pages` 90-day regression watch.
- Reusable engine committed (`6f8137c3`): `track2_worklist.py`, `track2_triage.wf.js`, `track2_collapse_verify.wf.js`, `track2_apply_lifts.wf.js`, `track2_rewrite_writer.wf.js`, `track2_independent_qa.wf.js`, `insert_monitored_pages.py` + per-batch monitors, `_sb_query.py`, `strip_leaked_tool_markup.py`.

## 7. Pointers
- `docs/property/TRACK2_CITYSERVICE_AUTONOMOUS_PICKUP_2026-05-29.md` (full state, cluster slug lists, CGT mid-flight detail)
- `docs/property/house_positions.md`, `docs/competitor_rewrite_playbook.md`, `docs/property/TRACK2_PROGRAM.md`
- Memory: `feedback_autonomous_mode`, `vercel_blog_fallback_size_limit` (/blog fix), `vercel_cli_deploy_workflow`, `monitored_pages_system`, `feedback_factual_backpatch_manager_direct`.
- Parked corpus sweeps: CGT 18/24 Act-attribution consistency; FA2024→F(No.2)Act2024; non-Track-2 pricing-leak pages (~half of 108 candidates).
