# C3 — property-company-extraction-calculator (BUILD SPEC, not a writer brief)

Verdict: NEW C3 per PAGE_MAP.md §10 ("The deepest blog cluster on the site with no tool attached. 2026/27 dividend rates already ground truth"). Priority: P2.

This is an engineering spec for a generic calculator, following the registry pattern already used by every tool under `Property/web/src/lib/calculators/tools/`. Ponytail rule applied throughout: reuse `@/lib/corpTax` and `@/lib/dividendTax` as-is, build only the one missing piece (employer NIC on a director's salary), and do not reimplement any rate that already lives in an existing lib.

## 1. Files to touch

1. **New**: `Property/web/src/lib/calculators/tools/property-company-extraction-calculator.ts` — the tool definition (generic pattern, follows `corporation-tax-calculator.ts` / `dividend-tax-calculator.ts` as templates, both read in full for this spec).
2. **New** (only if no existing NIC engine is found at build time — confirmed absent in this research pass): `Property/web/src/lib/employerNic.ts` — smallest possible NIC helper, FA-locked constants only.
3. **Edit**: `Property/web/src/lib/calculators/registry.ts` — one import line + one array entry, following the exact pattern of the 22 existing imports/entries already there.
4. **Edit**: `Property/web/src/tests/calculator-goldens.test.ts` — one new `describe("GOLDEN: property-company-extraction-calculator ...")` block, following the exact style of the existing corporation-tax and dividend-tax golden blocks (both read in full, reproduced as reference below).

## 2. Existing engines confirmed present (reuse, do not reimplement)

- **`Property/web/src/lib/corpTax.ts`** — exports `corporationTax(profit)` and `corporationTaxEffectiveRate(profit)`. 19% small-profits rate to £50,000, 25% main rate from £250,000, marginal relief (3/200 fraction) between. Verified current file content matches house_positions.md §21.A framework.
- **`Property/web/src/lib/dividendTax.ts`** — exports `computeDividendTax({otherIncome, dividends})`, returning `{taxFree, taxable, atBasic, atHigher, atAdditional, tax}`, plus constants `DIVIDEND_ALLOWANCE` (£500), `DIV_BASIC` (0.1075), `DIV_HIGHER` (0.3575), `DIV_ADDITIONAL` (0.3935). Matches house_positions.md §21.9 (FA 2026 s.4, confirmed gov.uk 2026-05-23). Personal allowance (£12,570), basic-rate-band top (£50,270) and higher-rate threshold (£125,140) are hardcoded internally as UK-wide constants — reuse via the function, do not duplicate these numbers in the new tool.
- **No employer NIC or income-tax-on-salary lib exists anywhere in the monorepo.** Searched `src/lib` across Property and the whole repo tree for `*nic*`, `*employerNic*`, `*salary*`, `*incomeTax*` — only hits were unrelated `niche-config.test.ts` files in other niche sites. This confirms the task brief's fallback instruction applies: spec the smallest new NIC engine.

## 3. New lib: `employerNic.ts` (smallest version that works)

Scope: **employer's Class 1 secondary NIC only** (the calculator needs the cost of drawing a salary from the company, i.e. what the company pays on top of the salary — not the employee's own NIC deduction, which is a personal-side cost the calculator's "personal income tax on salary" line handles separately, see §5).

FA-locked constants (house_positions.md — employer NIC 15%/£5,000 threshold, and LEL 2026/27 context only, per the task brief's own citation):
```ts
/**
 * Employer (secondary) Class 1 National Insurance, 2025/26 onward:
 *   15% on earnings above the secondary threshold of £5,000/year (from 6 April
 *   2025, Autumn Budget 2024 measure). LEL 2026/27 is £6,708 — informational
 *   only, it does not change the employer NIC calculation (LEL governs the
 *   employee's own contribution record, not the employer charge).
 * Ignores the Employment Allowance (up to £10,500/year, most single-director
 * companies with no other employees are excluded from claiming it) — flagged
 * in the tool's note rather than modelled, since eligibility depends on facts
 * this calculator does not collect.
 */
export const EMPLOYER_NIC_RATE = 0.15;
export const EMPLOYER_NIC_SECONDARY_THRESHOLD = 5_000;

export function employerNic(salary: number): number {
  if (salary <= EMPLOYER_NIC_SECONDARY_THRESHOLD) return 0;
  return (salary - EMPLOYER_NIC_SECONDARY_THRESHOLD) * EMPLOYER_NIC_RATE;
}
```
ponytail: no Employment Allowance modelling — most single-director-company users of this calculator are excluded from claiming it anyway (no other employees); note this ceiling in the tool's `note` field rather than adding an eligibility toggle nobody asked for.

**Personal income tax on the salary itself** (needed for the "net in hand" output, §5): also missing as a lib. Rather than building a second new file, compute it inline in the tool's `compute()` using the same PA/basic/higher constants pattern already duplicated locally inside `dividendTax.ts` (£12,570 / £50,270 / £125,140), at rates 20% basic / 40% higher / 45% additional. This is a simple banded calculation, well under the "one line, or the minimum that works" threshold — do not promote it to a shared lib for a single caller. Employee NIC (the personal-side 8%/2% bands) is out of scope for this calculator's stated field list (task brief only asks for employer NIC); flag employee NIC as a known simplification in the tool's `note`, matching the pattern `dividendTax.ts` already uses for the personal-allowance taper above £100,000.

## 4. Tool definition: `property-company-extraction-calculator.ts`

```ts
import type { GenericTool } from "../types";
import { gbp } from "../format";
import { corporationTax } from "@/lib/corpTax";
import { computeDividendTax } from "@/lib/dividendTax";
import { employerNic } from "@/lib/employerNic";
```

- `slug`: `property-company-extraction-calculator`
- `category`: `"Incorporation"` (matches corporation-tax-calculator and dividend-tax-calculator's category, keeps the gallery grouping consistent)
- `oneLiner` / `metaTitle` / `metaDescription`: to be drafted by an Opus content pass at build time (content is Opus-only per standard_terms §3), but the factual content it must carry: this compares salary vs dividend extraction routes from a property company's profit at 2026/27 rates. Suggested `metaTitle`: "Property Company Extraction Calculator | Salary vs Dividends (2026/27)" (fits under ~60 chars). `metaDescription` must stay under the 155-char limit already enforced elsewhere in this codebase (see memory `medical_parked` batch-3 lesson on metaDescription length) — draft and count at write time, do not guess.

### Fields

| id | label | type | default | help |
|---|---|---|---|---|
| `companyProfit` | Company profit before extraction | currency | 60,000 | Rental profit after allowable costs, before Corporation Tax. |
| `salaryDrawn` | Salary drawn (gross, before tax) | currency | 12,570 | Paid as a company expense before Corporation Tax; deducted from profit. |
| `dividendDrawn` | Dividends drawn | currency | 20,000 | Paid from post-tax company profit; taxed personally on top. |
| `otherPersonalIncome` | Your other personal income | currency | 0 | Any income outside the company (pension, employment, other dividends) — sets your starting tax band. |
| `taxYear` | Tax year | select, default `"2026/27"` | — | Only 2026/27 is modelled (current house-position rates); field exists for UI consistency with other date-aware tools, not for a rate switch — ponytail: single-year support only, add prior-year rates when a second year is actually requested. |

### Compute logic

1. Salary is deducted from company profit before Corporation Tax (salary is a deductible company expense): `profitAfterSalary = companyProfit - salaryDrawn`.
2. Employer NIC on the salary: `employerNic(salaryDrawn)` — this is ALSO a deductible company expense, so: `profitAfterSalaryAndNic = profitAfterSalary - employerNic(salaryDrawn)`.
3. Corporation Tax on the remaining profit: `corporationTax(profitAfterSalaryAndNic)`.
4. Post-tax company profit available for dividends: `profitAfterSalaryAndNic - corporationTax(profitAfterSalaryAndNic)`. If `dividendDrawn` exceeds this, flag it in the result `note` (calculator should not silently allow drawing more than the company has), same defensive pattern as other tools' notes.
5. Personal tax on salary: banded 20/40/45% using `otherPersonalIncome` as the starting point (same stacking logic pattern as `computeDividendTax`, but for non-dividend income — implement inline per §3). **Do NOT amend `dividendTax.ts` to export its internal PA constants.** This spec is additive-only; `corpTax.ts` and `dividendTax.ts` must be left byte-for-byte untouched so no existing calculator's behaviour or golden can move. Redeclare the three band figures (£12,570 / £50,270 / £125,140) locally in the new tool file with a comment naming `dividendTax.ts` as the source of truth, and let the new golden block catch drift.
6. Dividend tax: `computeDividendTax({otherIncome: otherPersonalIncome + salaryDrawn, dividends: dividendDrawn})` — dividends stack on top of salary and other income, per `computeDividendTax`'s existing "dividends are the top slice" design (confirmed in its doc comment).
7. Outputs:
   - Total tax each route: Corporation Tax + employer NIC (company-side cost of the salary route) vs Corporation Tax on retained profit (dividend route's company-side cost).
   - Personal tax on salary drawn; personal tax on dividends drawn.
   - **Net in hand**: `salaryDrawn - personalTaxOnSalary + dividendDrawn - dividendTax.tax`.
   - **Effective rate**: total tax (company + personal) ÷ (salaryDrawn + dividendDrawn), as a percentage.
   - **Best-mix note**: a short comparative note, not a solver — e.g. "At these figures, salary up to the personal allowance plus dividends for the rest is usually the lower-tax mix; adjust the two fields to compare" (matches the site's existing pattern of `note` as guidance, not a black-box optimiser — no gradient-descent mix-finder, ponytail: the two input fields already let the user try mixes by hand, do not build a solver nobody asked for).

### Explainer, faqs

Drafted by Opus at build time, must ground every figure in `corpTax.ts` and `dividendTax.ts` (or the new `employerNic.ts`) exactly as `corporation-tax-calculator.ts`'s explainer does — no invented figures. FAQ count: match the existing tools' 3-question pattern (both templates read carry exactly 3 FAQs each) unless the writer has a specific reason to extend.

### `embedHeight`

Existing tools range 520 (corporation-tax, single field) to 640+ (dividend-tax, two fields, more result rows). This tool has 5 fields and more result rows than either template (roughly 8-10 rows vs dividend-tax's ~5) — spec `embedHeight: 780` as a starting estimate; confirm against actual rendered height at build time, same as every other tool's height was presumably tuned empirically.

## 5. Registry entry (`registry.ts`)

Add import:
```ts
import { propertyCompanyExtractionCalculator } from "./tools/property-company-extraction-calculator";
```
Add to the `GENERIC` (or equivalent) array in the same position/grouping as `corporationTaxCalculator` and `dividendTaxCalculator` (both under the "Incorporation" category block) — read the array's current ordering convention before inserting, to match rather than guess.

## 6. Goldens plan (`calculator-goldens.test.ts`)

New `describe` block, styled exactly like the existing corporation-tax and dividend-tax blocks (numbered comment header, "Defaults:" line, inline arithmetic-trace comments before each `it`). Pin 2-3 scenarios derived from the existing pinned lib functions, so the new tests are cross-checked against numbers already locked elsewhere in the same file:

1. **Defaults scenario** (companyProfit=60,000, salaryDrawn=12,570, dividendDrawn=20,000, otherPersonalIncome=0): assert `profitAfterSalaryAndNic`, `corporationTax(...)` matches the already-pinned `corporationTax` behaviour at that profit level (cross-check against the existing "GOLDEN: corporation-tax-calculator" block's known £30,000→£5,700/19% relationship, scaled), assert dividend tax matches `computeDividendTax` called directly with the same inputs the tool passes it (cross-check against the existing "GOLDEN: dividend-tax-calculator" £20,000-dividend/£30,000-other-income case as a sanity anchor, adjusting for this tool's £12,570 salary-as-other-income figure).
2. **Salary-only scenario** (dividendDrawn=0): confirms employer NIC kicks in only above £5,000 and that `employerNic(12,570)` returns `(12,570 - 5,000) * 0.15 = 1,135.50` — a direct unit-level assertion on the new `employerNic()` function, sentinel-style like the existing `DIV_BASIC`/`DIV_HIGHER` FA 2026 sentinel test.
3. **Dividend-exceeds-available-profit edge case**: dividendDrawn set above the company's post-tax profit, assert the `note` field flags it (defensive-output test, matching the pattern other tools use for boundary/edge-case goldens, e.g. the rental-yield-calculator's "zero costs" and "rounding edge" blocks).

Sentinel test to add alongside, matching the `DIV_BASIC`/`DIV_HIGHER` sentinel pattern already in the file: assert `EMPLOYER_NIC_RATE === 0.15` and `EMPLOYER_NIC_SECONDARY_THRESHOLD === 5_000`, so a silent constant regression fails the same way the dividend-rate sentinel already guards against one.

## 6a. Editorial conventions for the Opus copy pass

This is a build spec, not a writer brief, but the `oneLiner` / `metaTitle` / `metaDescription` /
`explainer` / `faqs` fields are user-facing copy and the standard conventions apply to them:
£nnn always; "per cent" in prose, % in tables and result rows; hyphenated compounds
(salary-versus-dividend mix, post-tax profit, single-director company); sentence-case headings
inside the explainer; **no em-dashes**; no templated opening; distinct FAQ answers; no build or
pipeline narration ("verify at build", house-position codes). Every figure in the explainer must
trace to `corpTax.ts`, `dividendTax.ts` or `employerNic.ts` — no invented numbers, matching how
`corporation-tax-calculator.ts`'s explainer is written.

## 6b. Additive-only guarantee (gate-review check)

Verified on disk 2026-09-01: `src/lib/corpTax.ts` and `src/lib/dividendTax.ts` exist with the
exports this spec names (`corporationTax`, `corporationTaxEffectiveRate`; `computeDividendTax`,
`DIVIDEND_ALLOWANCE`, `DIV_BASIC` 0.1075, `DIV_HIGHER` 0.3575, `DIV_ADDITIONAL` 0.3935).
`src/lib/employerNic.ts` does not exist, confirming the new-file call. `registry.ts` has the
`GENERIC: GenericTool[]` array this spec appends to. Employer NIC constants match locked ground
truth: `house_positions.md` line 1205 — secondary threshold £5,000/yr and employer NI rate 15%
above it, both in force from 6 April 2025 (Autumn Budget 2024), with the prior 13.8% figure
explicitly logged there as a stale correction (F-19). Employment Allowance £10,500 also matches.

**Nothing in this spec changes existing calculator behaviour**: one new tool file, one new lib
file, one import line plus one array entry in `registry.ts`, one new `describe` block in the
goldens. No existing lib, tool, constant or golden is edited. If a build session finds itself
editing `corpTax.ts`, `dividendTax.ts`, or any existing golden block, it has left this spec.

## 7. What this spec deliberately skips (ponytail log)

- No Employment Allowance modelling → skipped, add if a user segment that actually qualifies (multi-employee property companies) is confirmed to need it.
- No employee-side NIC (8%/2% bands) → skipped, task brief scoped this calculator to employer NIC only; flag as a known simplification in the tool's `note`.
- No multi-year rate history / tax-year selector logic → skipped, single 2026/27 year only; add when a second year is actually requested.
- No automatic best-mix solver → skipped, the two draw-amount fields already let a user compare mixes by hand; a solver is unrequested scope.
- No new shared lib file for personal income tax on salary → skipped, inlined per-tool since it has exactly one caller; promote to a shared lib only if a second tool needs the same banded-income-tax logic.
