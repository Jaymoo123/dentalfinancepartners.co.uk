# Track 2 — Cannibalisation Index

**Snapshot date:** 2026-05-23 (REFRESHED PM — Wave 5 shipped + Wave 6 launched)
**Refresh cadence:** §4 (Wave 6 candidates, volatile) refreshes at the start of every Stage 2 batch. §1, §2, §3, §5 frozen between Wave merges.

**Read this first.** Track 2A and 2B sub-agents MUST consult this index before proposing any brief / candidate. Cannib check is semantic (per §16.18 LLM-reasoning discipline). Append-only during a batch: each new draft is added to §7 in-flight section.

**Track 2A statuses:** `REWRITE` / `REDIRECT-PROPOSED` / `SKIP-NO-ACTION` / `FLAG-MANAGER`
**Track 2B statuses:** `NEW` / `DUPE-EXISTING` / `DUPE-IN-FLIGHT` / `DUPE-ALREADY-CANDIDATE`

---

## §0 What changed at this refresh (2026-05-23 PM)

- **Wave 5 SHIPPED to main 2026-05-23** (commits `8d0a21f`, `cc99faf`, `9c39ff1`). 30 new pages live: 10 VAT + 10 Devolved tax + 10 Form 17/joint ownership.
- **§1 grew by 30** (existing-page count 406 → 436).
- **§2 grew by 30** (Wave 5 candidates moved from "in flight" to "shipped"). Total net-new shipped: 151 (was 121).
- **§4 reshaped from Wave 5 candidates to Wave 6 candidates** (the new volatile list).
- **House positions extended:** §22.9-§22.15 + new **§25 CAA 2001 cluster** LOCKED 2026-05-23.
- **New lesson §16.41** added to NETNEW_PROGRAM (Q&A shell template hygiene incident).
- **Wave 6 F-9 critical catch:** s.455 rate substituted by FA 2026 (33.75% → 35.75% from 6 Apr 2026). This means **FA 2026 is now enacted** — previous "Bill-vs-enacted" flags (F-2, F-5) on the April 2027 surcharge MAY now be resolvable as "enacted" rather than "Bill-form". Track 2 sub-agents must verify §7 lock status against legislation.gov.uk at brief drafting time.
- **Universe arithmetic refreshed:** residual legacy = 436 − 31 W1 − 30 W2 − 30 W3 − 30 W4 − 30 W5 − 52 rewrites = **233 pages** (was 234; difference reconciled by Wave 5 absorbing one slug variant).

---

## §1 — 436 existing blog pages on `main` (cannib source #1)

Full slug list at `docs/property/track2_universe_2026-05-23.md` (residual 233) + `docs/property/_tmp_track2_excluded_slugs.txt` was deleted (replaced by §2 + §3 of this doc as canonical) — substitute reference: 30 Wave 5 net-new slugs (now shipped) per `wave5_page_tracker.md`.

**Quick topic-cluster reference** (post-Wave-5 merge):

| Topic cluster | Count (approx) | Where listed |
|---|---|---|
| Section 24 + finance cost | ~22 | residual |
| City / location accountants | ~50 | residual + W1 + 2026-05-21 rewrites |
| AIA / capital allowances | ~12 residual + **10 Wave 6 Bucket C shipping in-flight** | residual + Wave 6 §4 below |
| CGT (rates, AEA, 60-day, gifting) | ~25 | residual + Wave 1 + rewrites + Wave 4 IHT-CGT overlap |
| Incorporation / Ltd Co | ~30 | residual + W1 + W4 + **10 Wave 6 Bucket A extraction** |
| MTD ITSA | ~15 | residual + W3 + W4 |
| IHT (BPR, APR, RNRB, gifts, FIC) | ~20 | W2 + W4 + W1 FIC + **10 Wave 6 Bucket B trusts** |
| VAT (incl. calculators) | ~10 residual + 10 Wave 5 (shipped) | residual + W5 |
| RRA 2025 / Renters' Rights | ~12 | W3 + lead-page in residual |
| FIC | ~10 | W1 + W4 + W6 Bucket A holdco-extraction overlap |
| ATED | ~13 | W1 + W3 |
| DTA / Expat / Non-Resident | ~25 | W2 + W1 SDLT-NR + residual NRL/NRCGT |
| **Form 17 / Joint ownership / Spouse** | **10 (Wave 5 SHIPPED — now §2)** | W5 C-bucket |
| **Devolved tax (Welsh LTT / Scottish LBTT)** | **10 (Wave 5 SHIPPED — now §2)** | W5 B-bucket |
| Property accountant career / services | ~8 | residual |
| BTL mortgages | ~5 | residual + W1 |
| HMO | ~5 | residual + rewrites |

For per-slug checks, sub-agent reads `docs/property/track2_universe_2026-05-23.md` (residual 233) + the wave page trackers.

---

## §2 — 151 Wave 1-5 net-new shipped (cannib source #2)

All ✅ done on `main`. Trackers:
- `track1_page_tracker.md` — 31 slugs (Wave 1)
- `wave2_page_tracker.md` — 30 slugs (Wave 2)
- `wave3_page_tracker.md` — 30 slugs (Wave 3)
- `wave4_page_tracker.md` — 30 slugs (Wave 4)
- `wave5_page_tracker.md` — 30 slugs (Wave 5, **newly added 2026-05-23**)

**Wave 5 additions (now in cannib source pool, no longer volatile):**

### Wave 5 Bucket A — VAT (10):
1. vat-option-to-tax-commercial-property-mechanics-election-revocation
2. vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics
3. vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method
4. vat-mixed-use-property-purchase-residential-commercial-element-apportionment
5. vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages
6. vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate
7. vat-developer-pre-registration-input-tax-recovery-property-development-projects
8. vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics
9. vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics
10. vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework

### Wave 5 Bucket B — Devolved property tax (10):
11. welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers
12. welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics
13. welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition
14. welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland
15. welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics
16. scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide
17. scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers-six-percent
18. scottish-lbtt-first-time-buyer-relief-145k-threshold-eligibility-mechanics
19. scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision
20. scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics

### Wave 5 Bucket C — Joint ownership + Form 17 + spouse (10):
21. form-17-declaration-beneficial-interest-property-mechanics-filing-revocation
22. joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords
23. declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17
24. unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision
25. civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality
26. unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share
27. cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics
28. iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt
29. second-home-sdlt-3-percent-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules
30. retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure

**Cannib resolution for Track 2A briefs touching VAT / Devolved / Form 17 topics:** Wave 5 owns the depth. Track 2A applied-angle versions may exist (e.g., Birmingham city page may reference Form 17 spousal-split in context). Differentiate as applied-local; never restate the mechanic.

---

## §3 — 52 rewritten on 2026-05-21 (cannib source #3)

Unchanged from previous index version. Tracker: `docs/property/page_rewrite_tracker.md`. Slugs enumerated there.

**Cannib pattern:** Don't re-rewrite. If a Track 2A sub-agent proposes a brief for a slug in this section, Stage 0 audit failure → flag to manager.

---

## §4 — 30 Wave 6 candidates (cannib source #4, VOLATILE — refresh per batch)

**Snapshot:** 2026-05-23 PM, from `docs/property/wave6_page_tracker.md`. Wave 6 IS ACTIVELY EXECUTING. As of snapshot: **10 ✅ done on feature branches, 3 🟦 in flight, 17 ⬜ todo.** Refresh by re-reading wave6_page_tracker at the start of every Stage 2 batch.

### Bucket A — LtdCo extraction sequence (10):
1. extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 ✅
2. directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d ✅ (raised F-9: s.455 rate 33.75% → 35.75%)
3. property-spv-share-buyback-out-of-distributable-reserves-mechanics ⬜
4. mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment ✅
5. property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics ⬜
6. time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window ⬜
7. multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics 🟦
8. extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds ⬜
9. pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount ⬜
10. directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap ⬜ (depends on B4 + B7)

### Bucket B — Trusts + §24.7 + GROB (10):
11. putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack ✅
12. settlements-legislation-s624-s629-property-income-attribution-mechanics ✅
13. interest-in-possession-iht-treatment-iipi-iht49a-life-tenant-rental-property 🟦
14. settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules ✅
15. grob-s102-family-home-shared-occupation-s102b-uk-mechanics ⬜
16. bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors ⬜
17. settlor-interested-property-trust-grob-interaction-double-trap-mechanics ✅
18. gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics ⬜
19. gifting-property-to-minor-children-bare-trust-mechanics-tax-traps ⬜
20. intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough ⬜

### Bucket C — Capital allowances + SBA + FYA (CAA 2001) (10):
21. capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework ✅
22. balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics ✅
23. structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward ✅
24. aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 ✅
25. full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 🟦
26. commercial-property-fixtures-claim-s198-election-purchase-mechanics ⬜
27. hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property ⬜
28. fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics ⬜
29. land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor ⬜
30. super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021 ⬜

**CRITICAL CROSS-TRACK INTERLOCK — Wave 6 Bucket C × Track 2A residual AIA cluster:**

Wave 6 Bucket C (Capital allowances + SBA + FYA, 10 pages) ships into the same topic neighbourhood as the Track 2A residual AIA cluster (~12 residual pages: `aia-allowance-uk-property-investors`, `aia-capital-allowance-property-landlords`, `aia-capital-allowances`, `capital-allowance-aia-property-landlords`, `capital-allowances-on-property`, `capital-allowances-on-vans`, `capital-allowances-second-hand-vans`, `can-you-claim-aia-on-second-hand-assets`, `annual-investment-allowance-2024-25`, `annual-investment-allowance-2025`, `annual-investment-allowance-landlords-uk`, `annual-investment-allowance-uk`, `writing-down-allowance-cars`, `writing-down-allowance-rates`, `what-is-aia-in-tax`, `capital-allowances-examples`, `landlord-capital-allowances-tax-relief`, `integral-features-capital-allowances`, `full-expensing-capital-allowances`, `hmo-capital-allowances-multi-tenant-landlords-claim`, `capital-allowances-commercial-property-what-can-claim`).

**Implication when Track 2 reaches the AIA cluster:** every one of those residual AIA pages will need cannibalisation re-check against the Wave 6 Bucket C net-new pillar + 9 daughters. Likely outcome: **3-5 of the 12 residual pages REDIRECT-PROPOSED to Wave 6 Bucket C pillar; remaining REWRITE as applied/local variants** (HMO-applied, FHL-grandfathered, second-hand-assets-applied, etc.). The fuller cluster resolution should wait until Wave 6 Bucket C closes (currently 4 of 10 done). **Batch 1 (CGT cluster) is safe — no Wave 6 Bucket C interlock.**

---

## §5 — Inter-wave queue back-patches (cannib source #5)

Existing pages slated for F-flag back-patches. Track 2A briefs for these MUST coordinate.

| Slug | F-flag | Status | Action for Track 2 |
|---|---|---|---|
| renters-rights-act-2026-tax-implications-landlords | F-1 PART 2 | Brief at `f1_rra_lead_page_rewrite_brief.md`; not yet executed (manual session task per NETNEW §12.2) | Track 2A brief for this slug: propose `FLAG-MANAGER` + coordinate with F-1 brief |
| mtd-quarterly-reporting-landlords-step-by-step-guide | F-9 (Wave 3 era) | Calendar-quarter alt deadlines back-patch in queue. **Verify current status against post-Wave-5 NETNEW_PROGRAM §3** | Track 2A brief: include F-9 status as PENDING / DONE per verification |
| section-24-joint-property-ownership-tax-split | F-1 (2026-05-23) | Already back-patched 2026-05-23 with §24 Form 17 framing per Wave 5 prep | Track 2A brief: cite patch-date + verify alignment with §24 |
| **(new) Various shipped Wave 1-4 pages** | F-9 (Wave 6 era) | **s.455 rate substituted by FA 2026 (33.75% → 35.75% from 6 Apr 2026).** Affects house position §21.1 + extracting-money + DLA + corporation-tax-rates pages | Track 2A briefs for any LtdCo / corporation-tax / DLA / extraction-related residual page must verify 33.75% vs 35.75% at write time |

---

## §6 — Known intra-residual cannibalisation pairs (Stage 1 attention)

Visually-similar slugs in residual 233 that likely resolve as REWRITE one + REDIRECT-PROPOSED the other.

### High-confidence near-duplicates (unchanged from previous snapshot):

- `60-day-cgt-reporting-property-sales-complete-guide` ↔ `60-day-cgt-reporting-property-sales-rule` (**both in Batch 1 sub-bucket B** — sub-agent 2 resolves)
- `2027-tax-rates-incorporation-decision-property-landlords` ↔ `2027-tax-rates-incorporation-decision-uk-landlords`
- `section-24-2027-tax-year-planning-landlords` ↔ `section-24-2027-tax-year-planning-uk-landlords` (Trial brief #3 recommended REDIRECT-PROPOSED both to T3 target)
- `section-24-higher-rate-taxpayers-2026` ↔ `section-24-higher-rate-taxpayers-changes-2027`
- `aia-allowance-uk-property-investors` ↔ `aia-capital-allowance-property-landlords` ↔ `aia-capital-allowances` ↔ `capital-allowance-aia-property-landlords` (4-way) **+ Wave 6 Bucket C cross-track**
- `annual-investment-allowance-2024-25` ↔ `annual-investment-allowance-2025` ↔ `annual-investment-allowance-landlords-uk` ↔ `annual-investment-allowance-uk` **+ Wave 6 Bucket C cross-track**
- `capital-allowances-on-vans` ↔ `capital-allowances-second-hand-vans`
- `vat-calculation-calculator` ↔ `vat-calculator` ↔ `vat-how-to-calculate` ↔ `vat-tax-calculator` (4-way; likely 3 of 4 REDIRECT-PROPOSED)
- `how-to-report-property-sale-hmrc-60-days` ↔ `report-property-sale-hmrc-60-days-guide`
- `property-accountant-near-me` ↔ `buy-to-let-accountants-near-me-guide`
- `best-property-accountant-london` ↔ `property-specialist-accountant-london` (also potential CANNIBAL with W1-rewritten `london-property-accountant`)
- `landlord-insurance-tax-deductible` ↔ `landlord-insurance-guide-types-costs-tax-deductible`
- `tax-relief-mortgage-interest-rented-property-guide` ↔ `mortgage-interest-deductible-landlords-uk-2026`
- `incorporation-case-study-5-property-portfolio-analysis` ↔ `incorporation-case-study-10-property-portfolio-200k-mortgage`

### Cross-source cannibalisation (residual ↔ excluded shipped):

- `capital-gains-tax-selling-rental-property-uk` (residual) vs `cgt-selling-buy-to-let-property-calculation-guide` (rewritten 2026-05-21)
- `2027-property-tax-rates-section-24-relief-uk-landlords` (residual; T3 trial pick) vs `2027-property-income-tax-rates-landlords-uk` (rewritten Session C #38)
- `landlord-tax-return-deadline-2026` (residual) vs `how-to-complete-landlord-self-assessment-filing-step-by-step-guide` (rewritten 2026-05-21)
- `mtd-quarterly-reporting-landlords-step-by-step-guide` (residual; F-9 back-patch target) vs `mtd-quarterly-deadlines-2026-2027-landlords` (rewritten 2026-05-21)
- **(new)** `cgt-reporting-deadlines-property-2026` (residual; Batch 1 sub-bucket B) vs `cgt-payment-deadlines-property-sales-2026` (rewritten Session C #23)

---

## §7 — Append-only in-flight (populated during Stage 2 batches)

Empty at Batch 1 start. Sub-agents append slugs as briefs are drafted.

| Slug | Sub-bucket | Drafted at | Sub-agent | Status | Notes |
|---|---|---|---|---|---|
| (Batch 1 sub-agents append below) | | | | | |
| cgt-deferral-strategies-property-investors-uk | A | 2026-05-23 | Sub-agent A | REWRITE | Clean — deferral-mechanics survey distinct from rewritten siblings; routes into rewritten gifting + spouse + LtdCo pillars; adjacent to Wave 6 in-flight gifting-to-adult-child decision tree (cross-link at execution once shipped). |
| reduce-cgt-property-disposal-uk | A | 2026-05-23 | Sub-agent A | REWRITE (with manager spot-check) | Survey-as-router framing committed to; must NOT survey-of-surveys into pillar overlap. Three stale-figure issues to correct (Companies-pay-19%-CGT error, pre-2020 Lettings Relief framing, FHL-BADR pre-abolition). |
| cgt-property-sold-loss-claim-capital-losses | A | 2026-05-23 | Sub-agent A | REWRITE | Clean — capital-losses-on-property is genuinely uncovered in rewritten siblings. Four depth additions mandatory (4-year claim deadline / negligible value / joint-ownership loss split / post-FHL-abolition treatment). |
| 60-day-cgt-reporting-property-sales-complete-guide | B | 2026-05-23 | Sub-agent B | **REDIRECT-PROPOSED** → `cgt-payment-deadlines-property-sales-2026` | Zero GSC + 2 bounced GA4 sessions. Three-way cluster collapse to rewritten canonical (with B1-B2 + B1-B3). Bundle redirects in one commit. |
| 60-day-cgt-reporting-property-sales-rule | B | 2026-05-23 | Sub-agent B | **REDIRECT-PROPOSED** → `cgt-payment-deadlines-property-sales-2026` | 107 imp / pos 17-18 cluster signal; stronger of intra-pair vs B1-B1 (newer dateModified, schema, ICAEW reviewer, 4 FAQs) but neither displaces the canonical (262 imp at pos 1-11). Three drift issues at source (FAQ #1 wrong-for-UK-residents, penalty schedule clock-conflation, "from 6 April 2026" wrong year-anchor) all resolved by redirect. |
| cgt-reporting-deadlines-property-2026 | B | 2026-05-23 | Sub-agent B | **REDIRECT-PROPOSED** → `cgt-payment-deadlines-property-sales-2026` | 11 imp / 5 queries; top query identical to canonical's top query — canonical wins 17×. CRITICAL drift in source: Summary asserts "Non-residents have a 30-day deadline" (direct §17.4 contradiction + page-internal contradiction with own body). Side-discovery: page's band-stacking worked example richer than canonical's flat-rate; manager to decide whether to lift to calculation-walkthrough sibling. |
| cgt-divorce-property-transfer-tax-implications | C | 2026-05-23 23:30Z | Sub-agent C | REWRITE | TAIL-SIGNAL (zero GSC + GA4). 3 source factual errors (post-F(No.2)A 2023 not reflected; wrong "1-year reasonable time" + "4-year PRR" claims). Explicit boundary with B1-C3 (living-together vs separating). F-18 raised (§24.4 cite drift). |
| cgt-inherited-rental-property-calculation-uk | C | 2026-05-23 23:30Z | Sub-agent C | REWRITE | TAIL-SIGNAL. 60-day £6k error + missing PR-CGT depth + missing assent decision tree. Wave 2 A7 cluster pair to strengthen (A7 already cross-links INTO this page). F-19 raised. |
| cgt-property-transfer-spouse | C | 2026-05-23 23:30Z | Sub-agent C | REWRITE | TAIL-SIGNAL. STRUCTURE-acute (1,000→2,800 word target; 2→12-14 FAQs). Wave 5 C-cluster gateway role; 9 W5 C-bucket forward-links. Stale non-dom + mixed-use framings. F-20 raised. |

**Batch 1 Sub-bucket B cluster collapse summary:** all 3 candidates resolved as REDIRECT-PROPOSED to single canonical `cgt-payment-deadlines-property-sales-2026` (rewritten Session C #23 on 2026-05-21). Combined pre-redirect cluster impressions: ~380 across 4 pages at pos 10-18 split-equity; post-redirect target consolidation to 1 page. Bundle as single commit at execution time so canonical absorbs equity in one deployment. **Critical F-13 raised on the canonical itself:** hallucinated FA 2019 "sections 222 to 233" citation needs back-patch before or during execution. Three legacy CGT-reporting siblings outside Batch 1 scope (`how-to-report-property-sale-hmrc-60-days`, `report-property-sale-hmrc-60-days-guide`) flagged for likely-future REDIRECT to same canonical in subsequent batch.

---

## Source data refs (sub-agent self-verification)

- `docs/property/track2_universe_2026-05-23.md` — residual 233
- `docs/property/track2_exclusion_audit_2026-05-23.md` — per-bucket exclusion source citation
- `docs/property/track1_page_tracker.md` — Wave 1 slugs (31)
- `docs/property/wave2_page_tracker.md` — Wave 2 slugs (30)
- `docs/property/wave3_page_tracker.md` — Wave 3 slugs (30)
- `docs/property/wave4_page_tracker.md` — Wave 4 slugs (30)
- `docs/property/wave5_page_tracker.md` — Wave 5 slugs (30, **shipped 2026-05-23**)
- `docs/property/wave6_page_tracker.md` — Wave 6 candidates (30, VOLATILE — refresh per batch)
- `docs/property/page_rewrite_tracker.md` — 52 rewrites (2026-05-21)
- `docs/property/topic_gaps_final.md` — 429 (body) + 65 (Track 2B addendum) = ~494 candidates (Track 2B input only)
- `docs/property/house_positions.md` — locked positions §1-§25
- `docs/property/NETNEW_PROGRAM.md` §16 lessons (1-41 as of 2026-05-23 PM)
- `docs/property/track2_site_wide_flags.md` — F-1 to F-8 raised during trial
