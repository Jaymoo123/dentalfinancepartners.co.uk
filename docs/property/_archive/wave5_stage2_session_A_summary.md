# Wave 5 Stage 2 Session A summary (Bucket A — VAT topical-gap deepening)

**Date:** 2026-05-23
**Sub-agent:** Wave 5 Stage 2 reasoning agent for Bucket A
**Source:** `docs/property/wave5_stage1_candidates_2026-05-23.md` §Bucket A (A1-A10) + `docs/property/wave5_vat_recluster_2026-05-23.md`
**Discipline:** §16.18 reasoning-first (no scripts), §16.31 per-URL liveness, §16.35 per-write verification mandate baked into every brief

---

## Per-brief status table

| ID | Slug | URLs verified alive | URLs tentative | Closest-existing depth | Authority links | HOUSE_POSITION_CONFLICT |
|---|---|---|---|---|---|---|
| A1 | `vat-option-to-tax-commercial-property-mechanics-election-revocation` | 3 / 3 | 0 | 6 (incl. 6 on-site VAT pages) | 12 candidates | None |
| A2 | `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` | 3 / 3 | 0 | 5 (forward-links A1) | 10 candidates | None |
| A3 | `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` | 3 / 3 | 0 | 5 (forward-links A1 + A2 + A10) | 10 candidates | None |
| A4 | `vat-mixed-use-property-purchase-residential-commercial-element-apportionment` | 2 / 3 | 1 (towerstone, perm-denied during Stage 2 fetch) | 6 (incl. SDLT cross-ref + A1 + A6 + A2) | 10 candidates | None |
| A5 | `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` | 2 / 3 | 1 (geraldedelman, perm-denied during Stage 2 fetch) | 4 (forward-links A1 + A10) | 9 candidates | None |
| A6 | `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate` | 3 / 3 | 0 | 5 (incl. existing new-build + DIY + reverse-charge) | 9 candidates | None |
| A7 | `vat-developer-pre-registration-input-tax-recovery-property-development-projects` | 3 / 4 | 1 (towerstone, perm-denied during Stage 2 fetch) | 6 (forward-links A1 + A2 + A6) | 9 candidates | None |
| A8 | `vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics` | 2 / 4 | 2 (geraldedelman + property-tax-advice, perm-denied) | 4 (incl. existing TOMS page) | 8 candidates | None |
| A9 | `vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics` | 2 / 3 | 1 (geraldedelman, perm-denied during Stage 2 fetch) | 5 (incl. A6 + new-build + reverse-charge) | 10 candidates | None |
| A10 | `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework` | 3 / 4 | 1 (towerstone, perm-denied during Stage 2 fetch) | 6 (incl. existing registration page — explicit cannibal-discipline) | 10 candidates | None |

**Aggregate:** 26 / 33 competitor URLs confirmed alive at Stage 2 (78.8%). 7 tentative (21.2%), all due to **fetcher permission-denied during Stage 2 verification, NOT confirmed-dead status**. Session re-verifies at write time with httpx (which uses different transport). Even worst-case (all 7 dead), every brief has 2+ confirmed-alive primary URLs.

---

## URL liveness summary by domain

- **taxaccountant.co.uk** — 4 URLs cited, all 4 verified alive
- **ukpropertyaccountants.co.uk** — 6 URLs cited (with reuse), all verified alive (vat-and-property-dispelling-myths used as common secondary across A1/A2/A3/A4/A5/A6/A7/A9; vat-registered-property-business-pros-and-cons used in A1/A7/A10)
- **uklandlordtax.co.uk** — 2 URLs cited (A6 conversion guide + A8 Sonder), both verified alive
- **bhp.co.uk** — 1 URL (A5 dilapidations), verified alive
- **towerstone.co.uk** — 3 URLs cited (A4 mixed-use, A7 developer reclaim, A10 is-there-vat-on-rent), all 3 returned permission-denied during Stage 2 fetch (likely Cloudflare or bot-block, not site-dead); session re-verifies
- **geraldedelman.com** — 3 URLs cited (A5 vat-and-property-issues, A8 long-term-hotel-stays, A9 cladding-crisis), all 3 returned permission-denied during Stage 2 fetch; session re-verifies
- **property-tax-advice.co.uk** — 1 URL (A8 TOMS-foiled), permission-denied during Stage 2 fetch; session re-verifies

**Pattern observation:** the permission-denied URLs cluster on towerstone, geraldedelman, and property-tax-advice. These look like Cloudflare bot-protection behaviour (the fetcher couldn't access them, but they are very likely live for human-browser / httpx with proper User-Agent). Session-time httpx with `User-Agent: Mozilla/5.0` should succeed. If any specific URL is dead at session time, replacement guidance is documented in each brief (e.g., saffery.com, rsmuk.com, ukpropertyaccountants.co.uk as backup search domains for cladding-VAT; ukpropertyaccountants links for mixed-use; etc.).

---

## HOUSE_POSITION_CONFLICT signals

**Zero conflicts surfaced during Bucket A reasoning.** Expected because:
- VAT is UK-wide statute (VATA 1994); no devolved-tax overlap
- `house_positions.md` has no dedicated VAT section (the brief is the spine)
- Bucket A is statute-isolated from §15 (IHT), §18-§20 (RRA 2025), §19 (MTD ITSA), §21 (LtdCo + FIC), §22 (IHT estate planning), §23 (devolved tax)
- Per Stage 1 §Bucket-A line "OTT is England/Wales/Scotland statute (VATA is UK-wide, devolved-tax B-bucket is land-transaction-tax, not VAT)"

**Watch points** (not flags, but session attention):
- **A5 (dilapidations) and A8 (TOMS post-Sonder)** carry the highest risk of recent HMRC guidance shifts. A5 has HMRC Brief 12/2020 + Brief 2/2022 succession; A8 has Sonder UT 2025. §16.35 per-write verification mandatory on the specific case-law and brief citations.
- **A9 (cladding-remediation)** has evolving HMRC guidance post-Building Safety Act 2022 + Building Safety Levy implementation. Section ies of the brief mark this for additional verification.
- **A8 statutory citation** "VATA 1994 Sch 4A para 9" — session must verify this is the current schedule-and-paragraph reference for the 28-day rule reduced-value mechanic at write time.

---

## Cross-bucket sequencing constraints (§16.32)

**None for Bucket A.** Per Stage 1 §Bucket-A summary: VAT is statute-isolated from devolved-tax + Form 17. No A-bucket page has a cross-bucket sequencing dependency on Bucket B (devolved-tax) or Bucket C (Form 17 / joint ownership).

**Bucket-internal sequencing observations (not strict constraints):**
- A1 (OTT) is foundational. A2, A3, A4, A6, A7, A9, A10 all forward-link to A1.
- A2 (CGS) is foundational for A4 (CGS interaction with mixed-use), A7 (post-registration CGS implications). Forward-link chain.
- A10 (decision framework) is the umbrella forward-linking to A1, A3, A8. A10 should be written either FIRST (as the entry-point) or LAST (so all forward-link targets exist on disk). Recommend **LAST** in session sequence so A10's forward-links resolve cleanly at merge (mirrors Wave 4 C7 pattern per §16.32).

**Suggested session writing order:** A1 → A2 → A3 → A6 → A7 → A4 → A5 → A8 → A9 → A10 (last). Sessions can override; this is non-binding bucket-internal guidance.

---

## Anti-templating spot-checks (§10 discipline)

- **Brief 3 spot-check (A3):** PASSED. Three distinct H2 spines confirmed (A1 election → cooling-off → REE; A2 threshold → 10-intervals → adjustment formula; A3 attribution → apportionment → de-minimis → annual adjustment → special method). No templating drift.
- **Brief 6 spot-check (A6):** PASSED. Six distinct H2 spines documented in the A6 brief (A1 election spine, A2 CGS spine, A3 partial-exemption spine, A4 mixed-use apportionment spine, A5 lease-end diagnostic spine, A6 three-relief spine). No templating drift.
- **All-10 review:** 10 framing differentiators, 10 distinct H2 spines (A7 reg-111 windows, A8 28-day-rule, A9 cladding-remediation Building Safety Act, A10 decision-tree umbrella). All starkly distinct.

---

## Files emitted

10 brief files at `briefs/property/wave5/`:
1. `vat-option-to-tax-commercial-property-mechanics-election-revocation.md` (A1)
2. `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics.md` (A2)
3. `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method.md` (A3)
4. `vat-mixed-use-property-purchase-residential-commercial-element-apportionment.md` (A4)
5. `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages.md` (A5)
6. `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate.md` (A6)
7. `vat-developer-pre-registration-input-tax-recovery-property-development-projects.md` (A7)
8. `vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics.md` (A8)
9. `vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics.md` (A9)
10. `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework.md` (A10)

1 summary doc at `docs/property/wave5_stage2_session_A_summary.md` (this file).

---

## Recommendations for manager review

1. **None of the A-bucket briefs surface HOUSE_POSITION_CONFLICT signals** — no §15 / §19 / §20 / §21 / §22 lock changes required for Bucket A launch.
2. **Manager-review gate items:**
   - A4 / A5 / A7 / A8 / A9 / A10 each have 1-2 tentative URLs (permission-denied during Stage 2 fetch). All are likely Cloudflare bot-protection rather than dead pages. Session-time httpx with Mozilla UA should succeed. Manager may pre-validate these URLs via curl or browser if confidence preferred before session launch.
   - A8's statutory citation "VATA 1994 Sch 4A para 9" cited as the 28-day-rule reduced-value mechanic — manager may consider an explicit pre-wave statute verification per §16.27 (the same Bill-vs-enacted-Act drift pattern applies here, though VATA 1994 is well-settled, less prone to drift).
   - A9's "section 30A" working-title shorthand in the slug is acknowledged in the brief as a placeholder; session may revise the slug. Manager could pre-resolve to a verified statute reference if preferred.
3. **No cross-bucket constraints to add.** Bucket A is VAT-only and isolated from Bucket B (devolved-tax) and Bucket C (Form 17) via separate statute regimes.
4. **Cumulative competitor coverage:** the Bucket A briefs lean heavily on three primary firms (taxaccountant.co.uk, ukpropertyaccountants.co.uk, uklandlordtax.co.uk) for the confirmed-alive URLs. This is acceptable for a topical-gap bucket where the gap-vs-on-site is the dominant frame (per `wave5_vat_recluster_2026-05-23.md` "topical-gap exercise rather than competitor-mimic exercise"). Sessions should rely on direct HMRC sources (Notices 706, 706/2, 708, 709/3, 719, 742, 742A + manuals VATSC, VATLAND, VIT, PE, VCONST) for outline depth rather than over-relying on the three competitor firms.

---

## Status: COMPLETE

All 10 briefs emitted. Anti-templating discipline held at both spot-checks. Zero HOUSE_POSITION_CONFLICT signals. No cross-bucket constraints to add. Ready for manager review + Stage 2 sign-off.
