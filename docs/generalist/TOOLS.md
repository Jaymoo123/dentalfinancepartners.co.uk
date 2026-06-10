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
| R&D Tax Credit Estimator | `lib/tools/compute/rd-credit.ts` | Inline constants — STALE intensive threshold (see below) |
| BADR CGT Calculator | `lib/tools/compute/badr-cgt.ts` | Inline constants — all match `uk-tax-rates.ts` 2025/26 |
| VAT Scheme Comparator | `lib/tools/compute/vat-scheme.ts` | Inline constants — all match `uk-tax-rates.ts` 2025/26 |

HMRC primary sources:
- Income tax + NI: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026
- BADR rates: https://www.gov.uk/capital-gains-tax/rates (and Finance Act 2024 s.2 for rate increase)
- VAT flat rate LCT: https://www.gov.uk/guidance/vat-flat-rate-scheme
- Pension allowances: https://www.gov.uk/guidance/pension-annual-allowance-carry-forward-explained
- R&D merged scheme: https://www.gov.uk/government/publications/research-and-development-tax-relief-reform


## Findings requiring user sign-off (GAP-2 golden-test gate)

### FINDING 1 — Take-Home Pay: stale student loan thresholds

The old `TakeHomePayCalculator.tsx` used 2024/25 student loan thresholds. The compute lib was extracted faithfully to pass the golden test.

| Plan | Old component | `uk-tax-rates.ts` 2025/26 | Status |
|------|--------------|--------------------------|--------|
| Plan 1 | 24,990 | 26,065 | **STALE** |
| Plan 2 | 27,295 | 28,470 | **STALE** |
| Plan 4 | 31,395 | 32,745 | **STALE** |
| Plan 5 | 25,000 | 25,000 | OK |
| Postgraduate | 21,000 | 21,000 | OK |

**Action required:** User must confirm whether to update plan 1/2/4 thresholds to 2025/26 values in `lib/tools/compute/take-home-pay.ts`.

### FINDING 2 — R&D Credit Estimator: intensive threshold and rate

The old component uses a 40% intensive threshold and a 27% intensive rate. The `uk-tax-rates.ts` file records the ERIS (Enhanced R&D Intensive Support) scheme at 30% threshold and 14.5% payable credit rate — but this is a different scheme (for loss-making SMEs only).

For the merged RDEC scheme, HMRC has not published a separate intensive credit rate. The old component carried a "directional estimate" disclaimer. Possible actions:
1. Accept the current directional model (40%/27%) as-is with the existing disclaimer.
2. Update to use the ERIS figures (30%/14.5% payable) for loss-making SMEs and 20% for profitable companies.
3. Remove the intensive distinction and use 20% flat.

**Action required:** User must confirm the correct interpretation before the intensive branch is changed.

### FINDING 3 — Employer NI component: stale label text

The `EmployerNICalculator.tsx` UI label reads "£5,000 off employer NI" — the 2024/25 Employment Allowance. The canonical 2025/26 value (from `uk-tax-rates.ts`) is £10,500. The compute lib (`employer-ni.ts`) uses the correct £10,500 from `uk-tax-rates.ts`.

The stale label is in `generalist/web/src/app/calculators/employer-ni-calculator/page.tsx` (the bespoke route) — specifically the label text "£5,000 off employer NI" and the related explainer paragraph text in the bespoke component itself.

**Action required:** Update the bespoke EmployerNICalculator component label and any page copy that references the old £5,000 figure.


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
