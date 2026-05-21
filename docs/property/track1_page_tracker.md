# Property Track 1 — page rewrite tracker (first wave)

**Last consolidated update:** 2026-05-22 (orchestrator pre-launch setup)

**Total pages this wave:** 31
**Complete:** 0 · **In progress:** 0 · **Remaining:** 31
**Sessions running:** 3 parallel (A, B, C) — see `docs/sessions/property/TRACK1_SESSION_{A,B,C}_START_HERE.md`

Track 1 = NEW pages we don't yet have. Source: `docs/property/topic_gaps_final.md`. The full Track 1 universe is 429 net-new pages; this wave is the highest-priority subset (top buckets — SDLT, Ltd Co, VAT, FIC, ATED). Subsequent waves will follow.

## Status legend

- ✅ done — page written, built, FAQ schema verified, tracker updated, redirect set (if applicable)
- 🟡 in_progress — a session has claimed the page and is actively writing it (timestamp in UTC at claim time so stale claims can be detected; >4h stale + no decisions logged = abandonable)
- ⬜ todo — not yet started
- 🚫 skip — discovered to be a duplicate or no longer warranted (reason in Notes)

## Coordination rules

1. **Only edit your own assigned rows.** If a page is in your session's table below, you edit it. If not, do NOT touch.
2. **Claim ONE page at a time.** Mark `🟡 in_progress` with the UTC timestamp at claim time. Complete the page (or release the claim) before claiming the next.
3. **Mark `✅ done` immediately after build passes** and FAQ schema count matches frontmatter + redirect repointed (if applicable).
4. **Stale claim detection:** if a `🟡 in_progress` row is older than 4 hours and the brief's work-log section shows no decisions logged, the next agent can take it over (read the brief work-log to see if anything's salvageable first).
5. **If a page genuinely shouldn't exist** (becomes obviously duplicative of something else as you research), mark `🚫 skip` with a 1-line reason and flag in `docs/property/track1_site_wide_flags.md`.

## Worktree map

| Session | Worktree | Branch |
|---|---|---|
| A | `C:/Users/user/Documents/Accounting-wt-property-track1-a/` | `property-track1-a` |
| B | `C:/Users/user/Documents/Accounting-wt-property-track1-b/` | `property-track1-b` |
| C | `C:/Users/user/Documents/Accounting-wt-property-track1-c/` | `property-track1-c` |

Tracker, flags, and house positions live in the **main repo** (`Accounting/`). All three sessions edit the tracker via the main path.

## Pre-flight (orchestrator-completed)

- `docs/property/house_positions.md` — locked factual positions across SDLT / ATED / MTD / S24 / CGT / FHL / 2027 surcharge / LTA-replaced / IHT / DTAs / Companies House / RRA
- `briefs/property/track1/<slug>.md` — 31 per-page research-package briefs (research inputs + framing differentiator, NO prescribed outline)
- `docs/property/topic_gaps_final.md` — full 429 net-new candidate list (this wave is a 31-page subset; subsequent waves draw from the same source)
- `docs/property/topic_gaps_redirect_overlap.md` — redirect-overlap candidates per slug (referenced in individual briefs)
- 3 git worktrees set up
- `Accounting/optimisation_engine/analysis/detectors.py` already runs the monitored_pages regression detector weekly (Track 1 pages should be added to `monitored_pages` on launch — flagged in each brief)

---

## Session A pages (10 assigned — SDLT depth)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| A1 | sdlt-5-percent-surcharge-refund-claim-process | ⬜ todo | | |
| A2 | sdlt-six-dwellings-non-residential-election | ⬜ todo | | |
| A3 | sdlt-sub-sale-relief-mechanics | ⬜ todo | | |
| A4 | sdlt-shared-ownership-staircasing | ⬜ todo | | |
| A5 | sdlt-group-relief-for-corporate-landlord-portfolios | ⬜ todo | | |
| A6 | sdlt-on-probate-property-transfers | ⬜ todo | | |
| A7 | sdlt-non-resident-2-percent-surcharge | ⬜ todo | | |
| A8 | sdlt-refund-scams-how-to-avoid | ⬜ todo | | |
| A9 | sdlt-mixed-use-property-classification | ⬜ todo | | |
| A10 | sdlt-leasehold-extension-vs-fresh-purchase | ⬜ todo | | |

## Session B pages (8 assigned — Limited company / BTL operation)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| B1 | director-loan-account-property-company-mechanics | ⬜ todo | | |
| B2 | property-company-group-relief-corporation-tax | ⬜ todo | | |
| B3 | substantial-shareholding-exemption-property-companies | ⬜ todo | | |
| B4 | corporation-tax-marginal-relief-property-companies | ⬜ todo | | |
| B5 | transferring-fhl-portfolio-to-limited-company | ⬜ todo | | |
| B6 | incorporating-hmo-portfolio-to-limited-company | ⬜ todo | | |
| B7 | extracting-money-from-property-limited-company | ⬜ todo | | |
| B8 | close-investment-holding-company-property | ⬜ todo | | |

## Session C pages (13 assigned — VAT + FIC + ATED)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| C1 | domestic-reverse-charge-construction-vat-landlords | ⬜ todo | | |
| C2 | toms-vat-serviced-accommodation | ⬜ todo | | |
| C3 | vat-on-new-builds-residential-property | ⬜ todo | | |
| C4 | togc-vat-property-letting-business | ⬜ todo | | |
| C5 | diy-housebuilders-vat-refund-scheme | ⬜ todo | | |
| C6 | fic-complete-guide-property-wealth-transfer | ⬜ todo | | PARTIAL OVERLAP with existing /blog/incorporation-and-company-structures/family-investment-company-property-worth-it — see brief |
| C7 | fic-vs-discretionary-trust-property-comparison | ⬜ todo | | |
| C8 | fic-growth-shares-and-freezer-shares-design | ⬜ todo | | |
| C9 | fic-iht-treatment-bpr-myth | ⬜ todo | | |
| C10 | ated-complete-guide-2026-27 | ⬜ todo | | PILLAR for ATED |
| C11 | ated-rental-property-relief-mechanics | ⬜ todo | | |
| C12 | ated-15-percent-flat-rate-sdlt-interaction | ⬜ todo | | |
| C13 | ated-late-filing-penalties-mechanics | ⬜ todo | | |
