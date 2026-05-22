# Wave 3 site-wide flags

Append-only. Each flag uses format `F-N | YYYY-MM-DD HH:MMZ | TAG | session | summary` plus optional sub-bullets.

Tags: HOUSE_POSITION_CONFLICT, CANNIBAL, INTERNAL_LINK, SCHEMA, REDIRECT, POSITIONING, BUILD_BLOCKER, CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL.

---

## F-1 | 2026-05-22 22:00Z | REDIRECT + INTERNAL_LINK | manager (Stage 1 review) | Existing `renters-rights-act-2026-tax-implications-landlords` page rewrite + site-wide RRA 2026 citation back-patch

Two coupled hygiene items, **NOT Wave 3 net-new** (do these on the legacy-rebuild track between Wave 3 close and Wave 4 launch, or as a standalone pass when the user authorises):

1. **Rewrite the existing page** `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md` to reflect the actual RRA 2025 (2025 c. 26, Royal Assent 27 October 2025). The current page uses "in-passage" / "implementation from May 2026" framings that are now superseded. Depth target: anchor on house_positions §20 (RRA Wave 3 extension). Citation must use 2025 c. 26. Frontmatter slug stays at `renters-rights-act-2026-tax-implications-landlords` to preserve any organic signal (no redirect needed for the existing page itself); inside the page, the title + h1 + body update to RRA 2025.
   - Optional: 301-redirect `/renters-rights-act-2026-tax-implications-landlords` -> a new `/renters-rights-act-2025-tax-implications-landlords` slug if a clean-citation slug is preferred. Trade-off: redirect preserves equity at cost of one extra middleware entry. Defer the slug decision to whoever picks up the rewrite.

2. **Site-wide RRA-2026 citation back-patch sweep.** Other existing Property pages (city pages, landlord-essentials pillars, tax-essentials guides) may reference "RRA 2026" or "Renters Rights Act 2026" in body copy. Run a `grep -rn "Renters Rights Act 2026\|RRA 2026\|renters' rights act 2026"` across `Property/web/content/blog/*.md` and replace with the correct citation (RRA 2025, 2025 c. 26, Royal Assent 27 October 2025). One commit batch.

Why this is parked here, not in Wave 3 net-new: both items are LEGACY rewrites against existing pages, distinct from Wave 3's net-new-page mandate. The original C1 brief (`renters-rights-act-2025-tax-implications-comprehensive-update`) was swapped out to free that slot for a genuine net-new (`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`). See `docs/property/wave3_candidates_selected.md` C1 entry for the swap rationale.

---

## F-2 | 2026-05-22 23:00Z | POSITIONING | Stage 2 ATED sub-agent | Category mismatch in Wave 3 ATED briefs vs existing inventory

All four existing ATED pages on main sit under `incorporation-and-company-structures`:
- `ated-complete-guide-2026-27`
- `ated-15-percent-flat-rate-sdlt-interaction`
- `ated-rental-property-relief-mechanics`
- `ated-late-filing-penalties-mechanics`

Wave 3 brief manager-pre-fills suggest `property-types-and-specialist-tax` as the category for all 10 ATED Session A briefs. Writing the new pages into a different category from the existing inventory will fragment the ATED cluster (separate category index pages, weaker internal-link clustering, weaker topical authority signal).

Per-brief recommendation logged in each Wave 3 Session A brief's "Closest existing pages" block: session SHOULD override to `incorporation-and-company-structures` and log the override in their work-log. Manager arbitration may differ — flag is informational, sessions retain category-override authority per Wave 1 calibration.

## F-3 | 2026-05-22 23:00Z | CANNIBAL (watchpoint, not active) | Stage 2 ATED sub-agent | Three Wave 3 ATED briefs carry high cannibalisation risk against existing pillar `ated-complete-guide-2026-27`

Watchpoints documented in each brief's Closest existing pages block. Not blocking; sessions retain authority to differentiate.

1. **A2 `ated-rates-2026-27-bands-table-worked-examples`** — pillar already carries the 2026/27 band table verbatim in FAQ + body. Discipline: A2 must be reference / calculator-shaped with materially deeper per-band worked examples + CPI mechanic + PRBC walkthrough. If H2 outline mirrors pillar's "Annual Charges" section, raise CANNIBAL at write-time.
2. **A4 `ated-relief-related-persons-market-rent-test`** — existing `ated-rental-property-relief-mechanics` covers s.1122 CTA 2010 connected-person test and the "market rent does not cure connection" point in FAQ form. Discipline: A4 must be 8-12 scenario-driven family-letting cases with HMRC's stance; do NOT re-cover the statutory test in narrative form.
3. **A10 `ated-six-step-compliance-walkthrough-uk-non-natural-persons`** — process walkthrough overlaps with pillar's operational sections. Discipline: each step is one short paragraph plus cross-link to relevant Wave 3 sibling or pillar; the value is the SEQUENCE, not the depth. SCHEMA flag candidate (HowTo schema).

## F-4 | 2026-05-22 23:00Z | INTERNAL_LINK (suggested back-links from existing to new) | Stage 2 ATED sub-agent | Wave 3 ATED additions warrant back-link patches from existing pillar / mechanics pages

After Wave 3 Session A ships and lands on main, the following existing pages should be back-patched with forward-links to the new pages (per Wave 2 F-XX pattern of session-time cross-link flagging + post-merge batch application):

- `ated-complete-guide-2026-27` (pillar): FAQ "How is the property value for ATED determined?" should link forward to **A7** (valuation rules). FAQ "Can I claim the relief retrospectively if I missed it on the original return?" should link forward to **A5** (amendment). FAQ "How do I appeal an ATED penalty?" should link forward to **A9** (appeals).
- `ated-rental-property-relief-mechanics`: should link forward to **A3** (clawback) and **A4** (related-persons / market-rent).
- `ated-late-filing-penalties-mechanics`: FAQ on appeals should link forward to **A9** (appeals deep-dive).
- `buy-to-let-limited-company-complete-guide-uk`: should link forward to **A1** (ATED overview) at the "company holding > £500k residential" decision point.

Sessions writing A1 / A3 / A4 / A5 / A7 / A9 should pre-fill these forward-link suggestions in their work-log F-XX flags for clean batch application post-merge.

## F-5 | 2026-05-22 23:00Z | FACTUAL (verification passed) | Stage 2 ATED sub-agent | House position §18.1 band figures verified against gov.uk

Cross-checked house position §18.1 2025/26 and 2026/27 ATED bands against gov.uk (https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics) and ukpropertyaccountants.co.uk/ated-rates.

**2026/27 figures verified — no discrepancy:**

| Band | House §18.1 | gov.uk | UKPA |
|---|---|---|---|
| £500,001 to £1m | £4,600 | £4,600 | £4,600 |
| £1m to £2m | £9,450 | £9,450 | £9,450 |
| £2m to £5m | £32,200 | £32,200 | £32,200 |
| £5m to £10m | £75,450 | £75,450 | £75,450 |
| £10m to £20m | £151,450 | £151,450 | £151,450 |
| Over £20m | £303,450 | £303,450 | £303,450 |

House position §18.1 is locked and trusted. No HOUSE_POSITION_CONFLICT raised. §18.4 30 April return deadline also confirmed against gov.uk. §18.5 1 April 2027 next-revaluation date confirmed against gov.uk and competitor sources.

---

## F-6 | 2026-05-22 23:30Z | HOUSE_POSITION_CONFLICT (resolved + locked) | Stage 2 MTD ITSA sub-agent | §19.7 late-payment day-triggers corrected from 31/46/91 to 15/30/31

Stage 2 MTD ITSA sub-agent verified §19.7 against the gov.uk Spring Statement 2025 HTML document. The locked position had the correct doubled percentages (3% / 3% / 10%) but the wrong day-triggers (31 / 46 / 91 = legacy FA 2021 Sch 26 schedule). The Spring Statement 2025 reform accelerated **both** percentages AND day-triggers; the corrected position is **3% from day 15, +3% from day 30, +10% per annum from day 31**. Verified verbatim from `https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html`.

**§19.7 has been corrected with a Correction logged 2026-05-22 stamp. §3 has also been corrected (one-line summary).** Sessions writing penalty content for MTD ITSA (especially B6 HMRC-letter and B8 six-changes overview but applicable to all 10 MTD briefs that mention penalty mechanics) MUST use 15 / 30 / 31 day-triggers with 3% / 3% / 10% percentages. The legacy 31 / 46 / 91 schedule at 2% / 2% / 4% remains for non-MTD income tax + VAT only.

This is the §5.2 correction process working as designed: factual catch via downstream verification, manager updates house_positions, broadcasts via wave3_site_wide_flags so sessions on read pick up the corrected position.

---

(further flags appended below as sessions discover items during write-up)
