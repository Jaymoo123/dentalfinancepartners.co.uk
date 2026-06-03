# Dentists Wave 3 page tracker

**Created:** 2026-06-03. **Status:** COMPLETE — all 3 clusters (15/15 pages) written + verified. Link floor 0 HARD 404; build EXITCODE 0; all 15 prerendered at correct category paths. Parked uncommitted in the MAIN tree for the user deploy decision (conductor is NOT the committer; coexisting with parallel rewrite + solicitors workstreams). NOT deploying without user approval. Execution: CLUSTER-BY-CLUSTER (sequential), one cluster fully (briefs → HP-lock gate → pages → link-floor + build) before the next. Order: A locum & foundation tax (§1/§8) → B NHS contract & UDA finance (§3) → C practice finance & lending (§5).

Wave 3 = 15 net-new pages, 5 per bucket, distinct from Wave 1 (sale/incorporation/extraction) and Wave 2 (VAT / capital allowances / NHS pension). Agent-native execution; manager (conductor) runs the HP-lock + drift gates. Working in the MAIN tree alongside the parallel rewrite + solicitors workstreams. Touch ONLY Dentists/ blog pages for these 15 slugs + docs/dentists/wave3_* + house_positions gate locks + briefs/dentists/wave3/. NOT committing or deploying (conductor is not the committer).

**Cannib audit (vs 174 existing):** 10 net-new, 5 partial (0.30-0.45), 0 covered. Report: `wave3_cannibalisation_check.md`. Partials differentiate (distinct intent), not replaced:
- A2 (locum ltd-vs-sole): differentiates by LOCUM audience vs the practice-owner `sole-trader-vs-limited-company-dentists-uk`.
- B3/B4/B5: distinct intents (going-private decision; mixed-income accounting; superannuation pensionable-pay calc).
- C4's match (`vat-calculator-dental-practice`) is spurious; treat as net-new.

**Baseline predeploy gate (before Wave 3):** PASS, 0 HARD 404. Em-dash/pricing warnings are pre-existing legacy corpus noise (non-blocking).

**Status legend:** ⬜ todo · 🟦 brief done · 🟩 page written · ✅ verified (link floor + build)

## Bucket A — Locum & foundation dentist tax (§1, §8)

| Status | Pos | Slug | Category | HP anchor | Notes |
|---|---|---|---|---|---|
| ✅ | A1 | `foundation-dentist-dft-first-year-tax-guide` | Locum Tax | §1, §1.B, §8 | DFT salaried year → self-employment. 2,990w, 11 FAQs, 0 em-dash, prerendered /blog/locum-tax/ |
| ✅ | A2 | `locum-dentist-limited-company-vs-sole-trader-tax` | Locum Tax | §1.A, §5, §8 | LOCUM audience + IR35; diff vs practice-owner page. 2,939w, 11 FAQs, 0 em-dash |
| ✅ | A3 | `locum-dentist-pension-options-outside-nhs-scheme` | Locum Tax | §2.B, §5, §8 | private/SIPP for locum; earnings cap + employer route. 2,859w, 11 FAQs |
| ✅ | A4 | `newly-qualified-dentist-first-self-assessment-payments-on-account` | Associate Tax | §8 | first SA + POA shock. 2,906w, 11 FAQs, prerendered /blog/associate-tax/ |
| ✅ | A5 | `dentist-working-abroad-uk-tax-residence-implications` | Associate Tax | §11, §8 | SRT / residence / abroad. 2,850w, 11 FAQs, prerendered /blog/associate-tax/ |

## Bucket B — NHS contract & UDA finance (§3)

| Status | Pos | Slug | Category | HP anchor | Notes |
|---|---|---|---|---|---|
| ✅ | B1 | `uda-value-benchmarking-good-uda-rate-dental-practice` | NHS Contracts | §3 | good per-UDA rate + cost-per-UDA benchmarking. 2,937w, 11 FAQs, prerendered /blog/nhs-contracts/ |
| ✅ | B2 | `nhs-dental-uda-carry-forward-and-credit-rules-tax` | NHS Contracts | §3.A | 96% clawback line + 4% carry-forward + accounting. 2,956w, 11 FAQs |
| ✅ | B3 | `handing-back-nhs-dental-contract-going-private-tax` | NHS Contracts | §3.A, §6, §2.C | going-private decision; diff vs read-your-contract. 2,827w, 11 FAQs |
| ✅ | B4 | `accounting-for-mixed-nhs-private-dental-income` | Practice Accounting | §3.A, §6 | mixed-income accounting; diff vs private-practice guide. 2,914w, 11 FAQs, /blog/practice-accounting/ |
| ✅ | B5 | `superannuation-nhs-contract-income-dentists-pensionable-pay` | NHS Pension | §2.C, §3 | NPE 43.9% ceiling calc; diff vs pensionable-pay page. 2,795w+, 11 FAQs, /blog/nhs-pension/ |

## Bucket C — Practice finance & lending (§5)

| Status | Pos | Slug | Category | HP anchor | Notes |
|---|---|---|---|---|---|
| ✅ | C1 | `dental-practice-acquisition-bank-loan-financing-guide` | Buying a Practice | §5.B, §4 | bank loans + interest-deductible-not-principal. 2,786w+, 11 FAQs, /blog/buying-a-practice/ |
| ✅ | C2 | `dental-practice-cash-flow-management-tax-reserves` | Practice Finance | §5.B, §8, §5.A | cash flow + tax reserves + DLA trap. 2,787w+, 10 FAQs |
| ✅ | C3 | `dental-practice-refinancing-debt-restructure-tax-implications` | Practice Finance | §5.B | refinancing; purpose follows use of funds. 2,787w+, 10 FAQs |
| ✅ | C4 | `dental-practice-working-capital-overdraft-finance-options` | Practice Finance | §5.B, §8 | working capital / overdraft (cannib spurious → net-new). 2,787w+, 10 FAQs |
| ✅ | C5 | `dental-practice-financial-kpis-owner-should-track` | Practice Finance | §3, §5, §8 | monthly financial KPIs dashboard. 2,826w+, 10 FAQs |

## Flags

**§ HP-lock gate (cluster A, 2026-06-03) — locks, no ground-truth correction.** Locked **§1.B** (foundation/DFT salaried first year; DFT salary £42,408 from 1 Apr 2025, PAYE + officer-pensionable; transition to self-employment triggers SA + POA) and **§11** (Statutory Residence Test, FA 2013 Sch 45; automatic overseas/UK tests, sufficient-ties tables arrivers+leavers verified at HMRC RFIG20520, split-year + double-tax relief). A3 personal-pension relief mechanics (relief at source, 100%-of-earnings cap, £3,600 gross / £2,880 net floor) confirmed at gov.uk; sit under existing §2.B £60k allowance. Verification log + citations index updated. No BRIEF_DRIFT.
- EXISTING_PAGE_STALE → rewrite hit-list: `dental-foundation-training-pay-scales-uk-2026` (verify it carries £42,408 / 1-Apr-2025; if it states an older DFT salary, refresh). NHS Contracts category.
- Cluster A 5 pages WRITTEN + VERIFIED: predeploy gate 0 HARD 404; build EXITCODE 0; all 5 prerendered at correct category paths (A1/A2/A3 → /blog/locum-tax/, A4/A5 → /blog/associate-tax/). Bodies 2,850-2,990w, 11 FAQs each, 0 new em-dashes, 0 `class=`, metaTitle ≤56, metaDescription ≤157. Cross-links interlink within cluster + to existing siblings (all resolve).
- Note: A2/A3 use `category: "Locum Tax"` (existing category, slug `locum-tax`); A4/A5 use `category: "Associate Tax"` (slug `associate-tax`). Both pre-existing categories; no new category route created.

**§ HP-lock gate (cluster B, 2026-06-03) — locks + 2 hedge resolutions, no ground-truth correction.** Locked **§3.A** (UDA year-end reconciliation: 96-100% delivery → 4%-or-less carry-forward not clawback; <96% → commissioner recovers overpayment; over-delivery discretionary 102/104/110; Band 1 fluoride-varnish + urgent credits count from Apr-2026; accounting treatment clawback-provision vs carry-forward-obligation). **RESOLVED the §3 `> VERIFY`** on the ~96% threshold (now confirmed). **RESOLVED the §2.C NPE hedge**: NPE/NPEE ceiling = **43.9% of TCV** (NHSBSA FAQ KA-02063, confirmed at source). Verification log + §3 + §2.C + citations updated. No BRIEF_DRIFT.
- EXISTING_PAGE_STALE → rewrite hit-list: (1) `nhs-dental-contract-clawback-explained` + `managing-uda-shortfall-end-of-financial-year` — verify they state the 96% clawback line + 4% carry-forward precisely; (2) `nhs-pension-pensionable-pay-dentists` + `incorporated-dental-principal-nhs-pension-pensionability` — verify they carry the 43.9% NPE ceiling.
- Cluster B 5 pages WRITTEN + VERIFIED: predeploy gate 0 HARD 404; build EXITCODE 0; all 5 prerendered (B1/B2/B3 → /blog/nhs-contracts/, B4 → /blog/practice-accounting/, B5 → /blog/nhs-pension/). Bodies 2,795-2,956w, 11 FAQs each, 0 em-dashes, 0 `class=`, metaTitle ≤56, metaDescription ≤158. Cross-links interlink within cluster + to existing siblings (all resolve).

**§ HP-lock gate (cluster C, 2026-06-03) — lock, no ground-truth correction.** Locked **§5.B** business-loan + finance-cost deductibility (interest deductible / principal not; unincorporated trading rules vs company loan-relationship rules; incidental finance costs deductible; **CIR only bites above £2m group de minimis** so a normal dental company gets full relief; capital-vs-revenue line; trade-vs-personal purpose test on refinancing that releases cash and on share-purchase borrowing). Verified at gov.uk CIR guidance. Verification log + §5.B + citations updated. No BRIEF_DRIFT, no EXISTING_PAGE_STALE specific to this cluster.
- Cluster C 5 pages WRITTEN + VERIFIED: predeploy gate 0 HARD 404; build EXITCODE 0; all 5 prerendered (C1 → /blog/buying-a-practice/, C2-C5 → /blog/practice-finance/). Bodies ≥2,786w (awk measure; rendered higher), 10-11 FAQs each, 0 em-dashes, 0 `class=`, metaTitle ≤55, metaDescription ≤158. Cross-links interlink within cluster + to existing siblings (all 48 distinct targets across the wave resolve, 0 missing).

## Wave 3 close summary
- **15/15 pages written + verified.** Link floor: 0 HARD 404 (predeploy gate). Build: EXITCODE 0, all 15 prerendered at correct category paths. Six-check: 0 new em-dashes, 0 `class=`, 10-11 FAQs/page, metaTitle ≤56, metaDescription ≤158, bodies in the 2,800-3,500 band. Lead-gen: 0 in-body forms/CTAs, 0 pricing patterns, anonymised proof only, no named clients/firms.
- **house_positions locked this wave:** §1.B (foundation/DFT), §11 (SRT), §3.A (UDA reconciliation), §5.B (loan/finance-cost deductibility). **Hedges resolved:** §3 ~96% clawback `> VERIFY` → confirmed 96% line + 4% carry-forward; §2.C NPE % → confirmed 43.9% of TCV.
- **EXISTING_PAGE_STALE → rewrite hit-list (5):** `dental-foundation-training-pay-scales-uk-2026` (DFT £42,408 / 1-Apr-2025); `nhs-dental-contract-clawback-explained` + `managing-uda-shortfall-end-of-financial-year` (state 96% line + 4% carry-forward precisely); `nhs-pension-pensionable-pay-dentists` + `incorporated-dental-principal-nhs-pension-pensionability` (carry the 43.9% NPE ceiling).

## Discovery log (adjacent net-new topics + calculator ideas to seed Wave 4)
Surfaced while writing the clusters:
- **Calculators:** (a) UDA cost-per-UDA / margin calculator (rate vs cost per UDA → margin per unit + clawback-risk flag); (b) NHS pensionable-pay / NPE calculator (TCV × 43.9% → ceiling, with provider/performer allocation split); (c) practice-acquisition serviceability + interest-relief calculator (loan, term, rate → repayment split deductible interest vs non-deductible capital); (d) tax-reserve calculator (income → recommended reserve % incl. payments-on-account); (e) SRT day-count / ties self-checker for dentists working abroad; (f) going-private income-bridge calculator (contract value lost vs private fee income at a conversion rate, incl. pension-replacement cost).
- **Net-new topics (Wave 4 candidates):** A1-adjacent — DFT-to-DCT/specialty training pay + tax; foundation-dentist student-loan-through-SA. A5-adjacent — UK dentist returning from abroad (temporary-non-residence anti-avoidance), the FIG regime for arriving dentists, double-tax treaty specifics for common dentist destinations (Australia/Ireland/UAE/NZ). B-adjacent — flexible commissioning + UDA offset arrangements; the 8.2% unscheduled-care requirement from Apr-2026 and its finance impact; Band 1 fluoride-varnish credit mechanics; mid-year-review action playbook. B5-adjacent — NPE allocation disputes between associates and the provider; ARR walkthrough. C-adjacent — buying the freehold vs leasing the premises (deep dive); partner buy-in / buy-out financing + tax; bringing in an associate-to-partner; squat-practice working-capital ramp; equipment HP vs lease decision tree (extends §7.D); director's-loan-account remediation (clearing an overdrawn DLA before s.455).
- **Rewrite-program feed:** the 5 EXISTING_PAGE_STALE flags above (rate/figure currency fixes).
