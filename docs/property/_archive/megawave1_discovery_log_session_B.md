# MegaWave 1 discovery log - Session B

Discovery format:

    ## D-N <TYPE> - one-line
    **Surfaced at:** <timestamp + page>
    **Detail:** <what>
    **Recommendation:** <future-wave bucket / back-patch / calculator / component>

Types: ADJACENT_TOPIC / CALCULATOR_IDEA / COMPONENT_IDEA / FUTURE_WAVE_PICK / SITE_WIDE_PATTERN.

---

## D-B-1 SITE_WIDE_PATTERN — Scottish + Welsh + English property-transfer-tax 4-nation comparison table needs canonical placement

**Surfaced at:** 2026-05-26 RUN-phase Pick 6 (lbtt-review-in-scotland).
**Detail:** Multiple RUN-phase MW1-B pages (Picks 1, 2, 3, 6) included substantively-similar 4-nation comparison tables of nil-rate bands / additional-dwellings surcharges / non-resident surcharges / FTB regimes / MDR status. The data is consistent (anchored on HP §23.8) but the comparison is being walked separately on each page. A single canonical "UK Four-Nation Property Transfer Tax Comparison" pillar page with each cluster page linking to it would reduce duplication risk.
**Recommendation:** FUTURE_WAVE_PICK. Add a dedicated 4-nation comparison pillar page to MW2 or MW3 sandbox. Existing MW1-B pages already cross-link to each other on the comparison topic; adding the pillar would let each cluster page narrow to its own jurisdiction's depth and link out for the comparison.

## D-B-2 COMPONENT_IDEA — Standardised LBTT vs SDLT vs LTT worked-example calculator component

**Surfaced at:** 2026-05-26 RUN-phase Pick 1 (essential-guide-for-first-time-homebuyers-in-scotland) + Pick 2 (higher-rates-LTT-complete-guide).
**Detail:** Both pages contain manual band-by-band worked examples (£150k, £180k, £225k, £275k, £350k purchase prices walked through the relevant rate ladder). The arithmetic is consistent and verified, but each page duplicates the calculation logic. A reusable "cross-nation purchase-tax calculator" widget that takes (jurisdiction, purchase-price, FTB-status, additional-dwelling-status, joint-buyer status) and returns the worked-example breakdown would improve UX and reduce duplication.
**Recommendation:** COMPONENT_IDEA for a future engineering wave. Cross-link existing MW1-A `first-time-buyer-relief-calculator` and MW1-B `ltt-calculator` calculator pages as the seed.

## D-B-3 FUTURE_WAVE_PICK — "Scottish FTB relief vs English FTB relief vs Welsh policy-absence: side-by-side worked examples across the price ladder"

**Surfaced at:** 2026-05-26 RUN-phase Pick 1 + Pick 6.
**Detail:** The cross-jurisdictional FTB comparison shows non-trivial crossover points (English FTB cheapest below £300k, Welsh policy-absence cheapest in the £200k-£225k window, Scottish FTB the only regime with a no-upper-cap structure). A dedicated worked-example page modelling FTB outcomes side-by-side at standard price points (£150k, £200k, £250k, £300k, £400k, £500k, £600k, £800k) would serve cross-border buyer audiences and the cross-jurisdictional-family planning audience.
**Recommendation:** FUTURE_WAVE_PICK. Sit upstream of the existing per-jurisdiction FTB-mechanics pages and link DOWN to each. MW2 candidate.

## D-B-4 SITE_WIDE_PATTERN — Bare-trust look-through under devolved property-transfer taxes deserves a 3-nation comparison page

**Surfaced at:** 2026-05-26 RUN-phase Pick 4 (bare-trusts-and-lbtt-relief-availability).
**Detail:** Scotland LBTT(S)A 2013 Sch 18 Part 3 has a clean look-through architecture; the SDLT equivalent at FA 2003 Sch 16 has the same broad architecture; the Welsh LTTA 2017 Sch 8 equivalent (Stage 2 verification gap) likely parallels both. A single page covering the 3-nation bare-trust treatment of property-transfer tax would serve the cross-border trust-and-nominee audience.
**Recommendation:** FUTURE_WAVE_PICK. Coordinate with cross-jurisdictional-cluster build-out in MW2/MW3. Verify Welsh statutory equivalent before drafting.
