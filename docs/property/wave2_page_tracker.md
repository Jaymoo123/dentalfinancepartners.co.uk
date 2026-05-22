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
| B1 | tax-treaties-property-investors-treaty-framework-guide | ⬜ todo | | |
| B2 | uk-us-dta-property-tax-implications-landlords | ⬜ todo | | |
| B3 | uk-france-dta-property-rental-income-cgt | ⬜ todo | | |
| B4 | uk-spain-dta-property-uk-resident-spanish-holiday-home | ⬜ todo | | |
| B5 | uk-india-dta-property-rental-income-treatment | ⬜ todo | | |
| B6 | uk-uae-dta-property-no-tax-jurisdiction-asymmetry | ⬜ todo | | |
| B7 | uk-italy-dta-tie-breaker-property-residence-disputes | ⬜ todo | | |
| B8 | dta-tie-breaker-test-dual-residence-property-owners | ⬜ todo | | |
| B9 | foreign-tax-credit-uk-property-overseas-landlords | ⬜ todo | | |
| B10 | uk-jersey-guernsey-isle-of-man-dtas-property-investors | ⬜ todo | | |

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
