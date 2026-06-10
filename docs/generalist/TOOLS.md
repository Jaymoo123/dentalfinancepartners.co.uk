# Generalist calculator fleet — quality bar (GAP-2)

Every figure in the calculators traces to a published HMRC source. This file documents those traces and any known limitations.

## Source tracing

All canonical rates (`UK_TAX_RATES` in `generalist/web/src/lib/uk-tax-rates.ts`) cite HMRC/gov.uk primary sources in the file's `sources` array. The compute modules for each tool import from that file or use the OLD component's inline constants (noted below).

| Tool | Compute lib | Rate source |
|------|------------|-------------|
| Salary & Dividend Optimiser | `lib/tools/compute/salary-dividend.ts` | `uk-tax-rates.ts` (all rates) |
| Take-Home Pay Calculator | `lib/tools/compute/take-home-pay.ts` | Inline constants — STALE SL thresholds (see below) |
| Employer NI & Cost-to-Hire | `lib/tools/compute/employer-ni.ts` | `uk-tax-rates.ts` |
| Pension Contribution Optimiser | `lib/tools/compute/pension.ts` | Inline constants — all match `uk-tax-rates.ts` 2025/26 |
| R&D Tax Credit Estimator | `lib/tools/compute/rd-credit.ts` | Inline constants — 30% ERIS threshold, corrected 2026-06-10 (see below) |
| BADR CGT Calculator | `lib/tools/compute/badr-cgt.ts` | Inline constants — all match `uk-tax-rates.ts` 2025/26 |
| VAT Scheme Comparator | `lib/tools/compute/vat-scheme.ts` | Inline constants — all match `uk-tax-rates.ts` 2025/26 |

HMRC primary sources:
- Income tax + NI: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026
- BADR rates: https://www.gov.uk/capital-gains-tax/rates (and Finance Act 2024 s.2 for rate increase)
- VAT flat rate LCT: https://www.gov.uk/guidance/vat-flat-rate-scheme
- Pension allowances: https://www.gov.uk/guidance/pension-annual-allowance-carry-forward-explained
- R&D merged scheme: https://www.gov.uk/government/publications/research-and-development-tax-relief-reform


## Findings from the GAP-2 golden-test gate — ALL RESOLVED (user-approved 2026-06-10)

### FINDING 1 — Take-Home Pay: stale student loan thresholds — RESOLVED

Plan 1/2/4 thresholds updated to 2025/26 in `lib/tools/compute/take-home-pay.ts` (golden tests updated deliberately):

| Plan | Old (2024/25) | Now (2025/26) |
|------|--------------|---------------|
| Plan 1 | 24,990 | **26,065** |
| Plan 2 | 27,295 | **28,470** |
| Plan 4 | 31,395 | **32,745** |
| Plan 5 | 25,000 | 25,000 (unchanged) |
| Postgraduate | 21,000 | 21,000 (unchanged) |

Source: GOV.UK student loan repayment thresholds 2025/26 (mirrored in `uk-tax-rates.ts`).

### FINDING 2 — R&D Credit Estimator — RESOLVED (option 2 adopted)

`lib/tools/compute/rd-credit.ts` now models: intensity threshold **30%** (accounting periods from 1 April 2024); intensive branch = **ERIS** (86% enhanced deduction × 14.5% payable credit ≈ 26.97p per qualifying £, payable so **no CT haircut**); standard branch = merged RDEC 20% taxable (net ~15p/£, unchanged). Page copy (intro, explainer, FAQ) updated to describe ERIS accurately. Directional-estimate disclaimer retained — real claims depend on loss position, PAYE cap, grant and connected-party rules.

Source: HMRC merged scheme + ERIS guidance (CIRD; gov.uk R&D tax relief reform pages).

### FINDING 3 — Employer NI label — RESOLVED

`EmployerNICalculator.tsx` label now reads "£10,500 off employer NI for 2025/26". The compute lib always read the canonical `uk-tax-rates.ts` value; this was label-only.


## Per-tool limitation notes

### Salary & Dividend Optimiser
- Assumes no other income, no student loan, no pension contributions, standard personal allowance.
- The optimiser tests salary in £10 increments up to min(profit, £60,000). Fine resolution — unlikely to miss the true optimum by more than a few pounds.
- Does not model the associated companies rule for corporation tax (if the director has other companies, CT thresholds may be divided).

### Take-Home Pay Calculator
- Assumes standard tax code (1257L), no benefits in kind, PAYE employment only.
- Student loan thresholds: see FINDING 1 above.
- Does not model Scottish income tax (which differs from England/Wales/NI).

### Employer NI & Cost-to-Hire (bespoke)
- Employment Allowance requires at least 2 employees and is subject to restrictions (single-director companies do not qualify if the director is the only employee for whom Class 1 secondary NICs are payable).
- Pension qualifying earnings band lower limit (£6,240) was set in 2014. Review annually.

### Pension Contribution Optimiser
- Models employer contributions only. Does not cover personal pension contributions.
- Taper calculation uses `Math.floor()` for the reduction, matching HMRC practice.
- Does not model money purchase annual allowance (MPAA, £10,000) which applies after flexibly accessing a defined contribution pension.

### R&D Tax Credit Estimator
- Directional estimate only. See FINDING 2 for the intensive threshold/rate question.
- Does not model the PAYE/NI cap (claim capped at 3× PAYE+NI liability + £20,000).
- Does not model capital expenditure restrictions or overseas contractor rules.
- Subcontractor haircut is 65% of invoiced cost (HMRC restriction, applies to connected and unconnected UK subcontractors under the merged scheme).

### BADR CGT Calculator
- Assumes higher-rate CGT (24%) on any overflow above the BADR lifetime limit.
- Does not model the CGT annual exempt amount (£3,000 for 2025/26) — actual bill is lower by CGT on the first £3,000 of gains.
- Eligibility test is a checkbox (user-attested). Actual eligibility involves business conditions and officer/employee status tests.

### VAT Scheme Comparator
- Sector flat rate used (12.5% for marketing/consulting) for non-LCT businesses. The actual sector rate varies. Users should verify their specific sector against HMRC's published list.
- Cash Accounting is mentioned in the FAQ but not modelled numerically — it is a cash-flow consideration, not a payment-amount difference.
