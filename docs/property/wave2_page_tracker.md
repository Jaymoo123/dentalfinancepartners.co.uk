# Property Wave 2 — page rewrite tracker

**Last consolidated update:** 2026-05-22 (pre-launch setup by Wave 2 prep sub-agent)

**Total pages this wave:** 30 (10 IHT + 10 DTAs + 10 Expat)
**Complete:** 0 · **In progress:** 0 · **Remaining:** 30
**Sessions running:** 3 parallel (A, B, C) — see `docs/sessions/property/WAVE2_SESSION_{A,B,C}_START_HERE.md`

Wave 2 = the second wave of NET-NEW Property pages. Theme: IHT (Session A) + DTAs (Session B) + Leaving the UK / Expat (Session C). Source: `docs/property/topic_gaps_final.md` (filtered to the three buckets, top 30 by signal). Subsequent waves draw further from the same source.

## Status legend

- ✅ done — page written, built, FAQ schema verified, **committed**, tracker updated, redirect set (if applicable)
- 🟡 in_progress — a session has claimed the page and is actively writing it (timestamp in UTC at claim time)
- ⬜ todo — not yet started
- 🚫 skip — discovered to be a duplicate or no longer warranted (reason in Notes)

## Coordination rules

1. **Only edit your own assigned rows.** If a page is in your session's table below, you edit it. If not, do NOT touch.
2. **Claim ONE page at a time.** Mark `🟡 in_progress` with the UTC timestamp at claim time.
3. **CRITICAL Wave 2 calibration:** commit on your branch (step 14) BEFORE marking ✅ done (step 16). Wave 1 had multiple tracker-ahead-of-branch drift incidents until calibrated via M-2/M-5; for Wave 2 the discipline is baked into the workflow. If your build passes but you haven't committed yet, the row stays 🟡 in_progress.
4. **Stale claim detection:** if a `🟡 in_progress` row is older than 4 hours and the brief's work-log shows no decisions logged, the next agent can take it over.
5. **If a page genuinely shouldn't exist**, mark `🚫 skip` with a 1-line reason and flag in `wave2_site_wide_flags.md`.

## Worktree map

| Session | Worktree | Branch |
|---|---|---|
| A | `C:/Users/user/Documents/Accounting-wt-property-wave2-a/` | `property-wave2-a` |
| B | `C:/Users/user/Documents/Accounting-wt-property-wave2-b/` | `property-wave2-b` |
| C | `C:/Users/user/Documents/Accounting-wt-property-wave2-c/` | `property-wave2-c` |

Tracker, flags, and house positions live in the **main repo** (`Accounting/`). All three sessions edit the tracker via the main path.

## Pre-flight (orchestrator-completed)

- `docs/property/house_positions.md` §§9-10 (headline) + §§15-17 (Wave 2 extension) — verified IHT / DTAs / Expat positions as of 2026-05-22
- `briefs/property/wave2/<slug>.md` — 30 per-page research-package briefs
- `docs/property/topic_gaps_final.md` — full candidate list (Wave 2 = 30-page subset filtered to IHT + DTAs + Expat)
- 3 git worktrees set up on branches `property-wave2-{a,b,c}` from `main` HEAD `38f0281`
- `.env` + `optimisation_engine/competitor/_db.py` copied into each worktree

---

## Session A pages (10 assigned — IHT)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| A1 | iht-property-investors-decision-framework-2026-onwards | ⬜ todo | | |
| A2 | iht-gifts-with-reservation-of-benefit-property | ⬜ todo | | |
| A3 | iht-lifetime-gifts-7-year-rule-property-taper | ⬜ todo | | |
| A4 | iht-april-2026-bpr-apr-cap-property-impact | ⬜ todo | | |
| A5 | serviced-accommodation-bpr-eligibility-pawson-test | ⬜ todo | | |
| A6 | iht-non-resident-uk-property-april-2025-residence-test | ⬜ todo | | |
| A7 | inheriting-uk-rental-property-executors-step-by-step | ⬜ todo | | |
| A8 | iht-residence-nil-rate-band-2m-taper-property-portfolios | ⬜ todo | | |
| A9 | pension-iht-april-2027-landlord-estate-planning | ⬜ todo | | |
| A10 | agricultural-property-relief-mixed-estate-1m-cap | ⬜ todo | | |

## Session B pages (10 assigned — DTAs)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| B1 | tax-treaties-property-investors-treaty-framework-guide | ✅ done | 2026-05-22T14:01Z | Framework pillar, 3,939 body words, 13 FAQs. OECD Art 4/6/13/23/24 map + NRCGT/NRL statutory overrides + HS304/SA106/MAP. Commit ade4711. |
| B2 | uk-us-dta-property-tax-implications-landlords | ✅ done | 2026-05-22T14:16Z | UK-US bilateral page, 2,850 body words, 12 FAQs. Saving clause (Art 1(4)) framing + 3-profile taxonomy + Sarah-Manchester worked example + FBAR/FATCA/state-tax traps. Commit ab164a6. |
| B3 | uk-france-dta-property-rental-income-cgt | ✅ done | 2026-05-22T14:22Z | UK-France bilateral page, 3,029 body words, 12 FAQs. 2008 treaty + CSG/CRDS overlay + IFI wealth tax + 1963 IHT treaty. Pierre-Brighton-to-Lyon worked example. Commit e21e13c. |
| B4 | uk-spain-dta-property-uk-resident-spanish-holiday-home | ✅ done | 2026-05-22T14:28Z | UK-Spain bilateral, 2,312 body words (intentionally under 2,500 floor; competitor median shorter), 12 FAQs. Two-way framing + post-Brexit IRNR jump + Patrimonio + Solidarity Tax + Modelo 720. Carlos worked example. Commit 7b8b241. |
| B5 | uk-india-dta-property-rental-income-treatment | ✅ done | 2026-05-22T15:30Z | UK-India bilateral, 3,280 body words, 13 FAQs, six checks pass. 1993-treaty age (Art 14 capital gains, no Art 13(4) indirect-disposal) + UK NRCGT statutory override (TCGA 1992 s.1A + HMRC INTM151010) + NRI workflow (NRL1, Article 26 personal allowance, s.90 Form 67, Schedule FA / Black Money Act). Anil/Mumbai/Leicester+Birmingham worked example. Commit 441fa46. |
| B6 | uk-uae-dta-property-no-tax-jurisdiction-asymmetry | ✅ done | 2026-05-22T15:45Z | UK-UAE bilateral, 2,812 body words, 13 FAQs, six checks pass. 2016 treaty in OECD form; UAE no-personal-tax asymmetry frames the page (credit method one-way only). Corrects "I live in a no-tax country so I don't owe UK tax" misconception. Tom/Dubai/three-property worked example shows s.24 credit narrowly absorbing higher-rate exposure. UAE Corporate Tax 2023 caveat. F-12 raised for B6↔C6 back-patch when C6 ships. Commit 2590633. |
| B7 | uk-italy-dta-tie-breaker-property-residence-disputes | ✅ done | 2026-05-22T16:05Z | UK-Italy Article 4 tie-breaker applied. 2,869 body words, 13 FAQs, six checks pass (em-dash fix on attempt 2). Cascade-focused structure (not country-by-country); 2024 TUIR Art 2 reform under Leg Dec 209/2023 + AIRE registration practice + IVIE on UK property (0.76%). Marco/Italian-national/London-Mon-Thu/Milan-family worked example resolves at Step 2 centre-of-vital-interests. F-13 raised for B7↔B8 + B7↔C2 back-patches. Commit d6f1cb2. |
| B8 | dta-tie-breaker-test-dual-residence-property-owners | ✅ done | 2026-05-22T16:30Z | Generic Article 4 cascade sub-pillar, ~4,691 body words (higher than B7's 2,869 because B8 walks all 5 cascade steps; comparable to B1 framework pillar's 3,939), 13 FAQs, six checks pass. Differentiator vs B7 (Italy applied): B7 resolves at Step 2 with split-family executive; B8 walks all 5 steps with Step 3 worked example (Daniel/UK-Portugal retired landlord, 175 UK / 178 Portuguese days, resolves at habitual abode on regularity grounds). House-position invariant reinforced: cascade does not change UK source taxation under Arts 6/13, does not displace NRCGT or NRL. F-19 raised for remaining post-merge back-patches (B7→B8 + B7→C2 + C2→B8). Commit <pending>. |
| B9 | foreign-tax-credit-uk-property-overseas-landlords | ✅ done | 2026-05-22T17:05Z | UK-resident with foreign property FTC operational page (first reverse-direction page in the DTA bucket). ~4,352 body words, 13 FAQs, six checks pass (FAQ schema 13/13, 0 em-dashes, 0 Tailwind, meta 55/148, 6/7 internal links resolve in worktree; SRT C2 link resolves post-merge under existing F-19). TIOPA 2010 Part 2 framework (s.18 treaty / s.9 unilateral / s.36 + ss.40-42 limit / s.27 deduction-alternative) + HMRC INTM161100 six basic principles + credit-limit calc in detail + SA106 box-by-box + FIG regime overlay from 6 April 2025 + Helen/UK/Lisbon-flat worked example (€13,500 net rental, £4,576 UK tax cap on UK measure, £2,860 credit, £1,716 UK net liability) + s.24/FTC mortgage counterfactual. Anti-templating: operational/computational not treaty/cascade/bilateral. F-21 raised for existing-NR-SA-page back-link. Commit <pending>. |
| B10 | uk-jersey-guernsey-isle-of-man-dtas-property-investors | ✅ done | 2026-05-22T18:00Z | Consolidated Crown Dependencies page (the only multi-jurisdiction page in the DTA bucket). ~5,146 body words (largest B-bucket page; justified by three-jurisdiction coverage + three-policy-change historical arc), 13 FAQs, six checks pass (FAQ schema 13/13, 0 em-dashes after attempt-1 fix, 0 Tailwind, meta 54/142 after attempt-1 desc shorten, 5/6 internal links resolve in worktree — A6 IHT link resolves post-merge, F-24 raised). Verified 2018 treaty dates from gov.uk (Jersey signed 2 Jul 2018 / in force 19 Dec 2018; Guernsey same signed / in force 7 Jan 2019; IoM same signed / in force 19 Dec 2018) — house position §16.5 "modern (2018+)" is correct. Three-policy-change arc framing (Sch A1 from 2017 + Art 13(4) from 2018 + April 2025 residence-based IHT) + Andrew/Jersey-resident/four-Manchester-flats worked example with maintain/collapse/restructure decision tree. Session B 10 of 10 complete. Commit <pending>. |

## Session C pages (10 assigned — Leaving the UK / Expat)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| C1 | leaving-uk-landlord-12-month-pre-departure-checklist | ⬜ todo | | |
| C2 | srt-statutory-residence-test-landlord-decision-tree | ⬜ todo | | |
| C3 | split-year-treatment-cases-1-8-landlord-departure-arrival | ⬜ todo | | |
| C4 | temporary-non-residence-5-year-cgt-recapture-property | ⬜ todo | | |
| C5 | nrl-scheme-letting-agents-quarterly-returns-mechanics | ⬜ todo | | |
| C6 | moving-to-dubai-uk-rental-property-tax-pathway | ⬜ todo | | |
| C7 | moving-to-australia-uk-rental-property-tax-pathway | ⬜ todo | | |
| C8 | non-dom-reform-april-2025-fig-regime-property-investors | ⬜ todo | | |
| C9 | returning-to-uk-after-non-residence-property-portfolio | ⬜ todo | | |
| C10 | nrcgt-indirect-disposal-property-rich-companies-shares | ⬜ todo | | |
