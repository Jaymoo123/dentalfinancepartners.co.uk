# C1 — /calculators/incorporation-cost-calculator (EXTEND)

Build spec, not a writer brief. Additive change only. Existing behaviour for existing
inputs must not change (proved by goldens).

## 0. Verdict + demand justification (`page_map.csv` C1, `PAGE_MAP.md` §10)

Verdict: EXTEND. "ALREADY DOES incorporate-vs-personal plus CGT, SDLT, an s162 toggle,
extract/retain and break-even. It covers three of the five proposed calculators. ADD: a
professional-fees line (solicitor, valuation, lender) so it answers the total-cost-to-transfer
query set, and a running-cost line." A standalone third calculator here would cannibalise
C1 and C2 (`PAGE_MAP.md` §10: "transfer total cost | EXTEND C1 | Same tool plus a
professional-fees line. A third calculator here would cannibalise C1 and C2.").

Dominant query: **limited company vs personal buy to let calculator** (no measured
volume in `page_map.csv` C1 row; justified by hub utility and the existing tool's scope,
not a volume figure).

Variant list to satisfy (from `page_map.csv` C1 `query_variants`):
- incorporate vs personal comparison
- is it worth incorporating my buy to let calculator
- incorporation break even calculator
- cost of transferring property to limited company calculator (this is the one the
  professional-fees addition specifically targets — currently the tool answers CGT+SDLT
  upfront cost but not the solicitor/valuation/lender layer a real transfer needs)

## 1. Current field list and compute flow (from the code)

**Component:** `src/components/calculators/IncorporationCostCalculator.tsx` (bespoke,
"page" and "embed" variants). **Premium tool:** `src/lib/calculators/premium/tools/incorporation.ts`
(fuller field set, used on-page for the deeper interactive version). **Shared engine:**
`src/lib/incorporation.ts`, function `computeIncorporation()`.

Bespoke component fields (5): `propertyValue` (default 300,000), `purchasePrice` (default
200,000), `annualRentalIncome` (default 24,000), `mortgageInterest` (default 9,000),
`taxBand` (basic/higher/additional, default higher).

Premium tool fields (9): the same 5 plus `otherExpenses` (default 3,000), `extraction`
(extract/retain, default extract), `s162Relief` (yes/no, default no), `year` (2026-27 /
2027-28, default 2026-27).

**Compute flow** (`computeIncorporation()` in `src/lib/incorporation.ts`):
1. CGT on deemed market-value disposal via `computeCgt()` (shared CGT engine) → `cgtCost`
   (zeroed if `s162Relief` true).
2. SDLT via `additionalDwellingSdlt()` (shared SDLT engine, `src/lib/sdlt.ts`) → `sdltCost`.
3. `totalUpfrontCost = cgtCost + sdltCost`.
4. Personal annual position via `computeSection24()` → `personalTax`, `personalNetProfit`.
5. Company annual position: `companyProfit = rent - other - interest`; CT via
   `corporationTax()`/`corporationTaxEffectiveRate()`; dividend tax via
   `computeDividendTax()` if not retaining.
6. `annualSaving = personalTax - totalCompanyTax`; `breakEvenYears = totalUpfrontCost /
   annualSaving` (sentinel `NEVER_BREAKS_EVEN = 999` if saving ≤ 0).

Everything rounds to whole pounds via a local `round()` at the end of `computeIncorporation()`.

## 2. Proposed new fields

Add to `IncorporationInputs` in `src/lib/incorporation.ts` (all optional, all defaulting
to 0 so existing callers/tests that omit them are unaffected):

| Field | Type | Engine default | UI default | Help text |
|---|---|---|---|---|
| `solicitorFee` | number | 0 (optional) | 0 | "Conveyancing solicitor fee for the company purchase. Typical range £900-£1,800." |
| `valuationFee` | number | 0 (optional) | 0 | "Lender or RICS valuation fee for the transfer. Typically £250-£500." |
| `lenderFee` | number | 0 (optional) | 0 | "Company buy-to-let mortgage arrangement/broker fee, if refinancing into the company. Typically £1,000-£2,000." |
| `annualRunningCost` | number | 0 (optional) | 0 | "Ongoing yearly cost of running the company (accountant, Companies House filings, registered office). Shown separately from the one-off transfer cost, see `property-company-running-costs-annual-budget` for the full breakdown." |

**CORRECTION applied at brief review 2026-09-01.** This table originally gave non-zero
defaults (1,200 / 300 / 1,500 / 800) while §7 promised "optional and default to 0/undefined,
so any caller... gets byte-for-byte identical output to today". Those two statements
contradict each other: a non-zero UI default is a behaviour change for every existing
visitor, who would land on the page and see a `totalUpfrontCost` and `breakEvenYears`
different from today's without touching a control. Both engine AND UI defaults are therefore
0; the indicative ranges move into the help text, where they inform the user without
silently moving the headline number. If the manager later wants pre-filled typical fees,
that is a deliberate, separately-signed-off behaviour change, not part of this additive
extension.

Naming rationale: keep each fee itemised rather than one lump "professional fees" field,
because the brief's own variant list separates "solicitor/conveyancing, valuation,
lender/broker fees" as named line items (from the task brief), and the existing UI pattern
(SDLT calculator's checkbox rows) already itemises rather than lumps.

## 3. Compute flow changes

In `computeIncorporation()`:

```
const professionalFees = Math.max(0, i.solicitorFee ?? 0)
  + Math.max(0, i.valuationFee ?? 0)
  + Math.max(0, i.lenderFee ?? 0);
const totalUpfrontCost = cgtCost + sdltCost + professionalFees; // was cgtCost + sdltCost
```

Add `professionalFees` (rounded) to `IncorporationResult` as a new field, alongside the
existing `cgtCost`/`sdltCost`/`totalUpfrontCost`, so callers can show it as its own
breakdown row rather than folding it silently into `totalUpfrontCost`.

`annualRunningCost` does NOT change `annualSaving` (the tax-saving comparison should stay
tax-only, per the existing "annual saving" framing which is explicitly a tax comparison,
not a full P&L). Instead surface it as a SEPARATE informational row: "Annual running cost
of the company (not counted in the saving above)" so break-even math is not silently
altered by a running-cost assumption the user may want to change independently. This
keeps `breakEvenYears` and `worthwhile` untouched for existing callers (no behaviour
change), and is additive.

**IncorporationResult additions:** `professionalFees: number`, `annualRunningCost: number`
(pass-through, rounded, defaults to 0 → invisible when omitted).

## 4. Which goldens update

No existing describe block in `src/tests/calculator-goldens.test.ts` directly targets
`computeIncorporation()` or `IncorporationCostCalculator` (checked: the file tests the
underlying shared libs — `computeCgt`, `additionalDwellingSdlt`, `corporationTax`,
`computeDividendTax` — directly, not through `lib/incorporation.ts`). There is currently
NO golden pinning `computeIncorporation()`'s output. This extension should ADD one:

- New `describe("GOLDEN: computeIncorporation (defaults, no new fields)")` block asserting
  the CURRENT default-input output (propertyValue 300,000 / purchasePrice 200,000 /
  annualRentalIncome 24,000 / mortgageInterest 9,000 / taxBand higher) is UNCHANGED after
  the new fields are added and left at their zero/undefined pass-through state — this is
  the regression proof that existing behaviour did not move.
- New `describe("GOLDEN: computeIncorporation with professional fees + running cost")`
  block: same defaults plus explicitly-passed `solicitorFee: 1200, valuationFee: 300, lenderFee: 1500,
  annualRunningCost: 800` → assert `professionalFees === 3000`, `totalUpfrontCost` equals
  the old total plus 3000, `annualRunningCost === 800` (pass-through), and `breakEvenYears`
  moves proportionally to the new (larger) `totalUpfrontCost` (it SHOULD change — the
  break-even period genuinely lengthens when real transfer costs are included; this is
  the intended new-mode behaviour, not a regression).
- Approach for expected values: derive them the same way the file's other golden blocks
  do, by hand-deriving from the existing engine outputs (which are themselves already
  pinned indirectly via `computeCgt`/`additionalDwellingSdlt`/`corporationTax`/
  `computeDividendTax` goldens) plus the new arithmetic (+3000 to upfront cost), not by
  reading current live output and copying it uninspected.

## 5. embedHeight implications

Check `src/app/embed/incorporation-cost-calculator` for a fixed iframe height config (the
task brief flags this as a thing to consider). Four new number inputs added to the
bespoke component's input column will add roughly 4 x (label + input row height, ~76-92px
per existing field block per the component's Tailwind spacing) to the page variant. For
the EMBED variant specifically, prefer adding the new fields ONLY to the premium/on-page
tool (`src/lib/calculators/premium/tools/incorporation.ts`) rather than the bespoke
embed-safe `IncorporationCostCalculator.tsx`, unless the embed height is confirmed to have
headroom — check the iframe height value in the embed page/route before deciding. If the
bespoke component IS extended, the embed variant's fixed height (wherever declared) must
be bumped by the same amount or the new fields will clip/scroll inside partner iframes.

## 6. Page-copy additions

On `src/app/calculators/incorporation-cost-calculator/page.tsx`: add explanatory copy
near the new fields (or in the surrounding page prose) covering: (a) that professional
fees are typical/indicative, not a quote, consistent with the existing "Simplified
estimate... require full feasibility analysis" disclaimer already in the component; (b)
that the annual running cost is shown separately from the tax-saving comparison and links
to `property-company-running-costs-annual-budget` (U26, COVERED page, owns the annual
budget in full) for the complete breakdown; this keeps the seam from `PAGE_MAP.md` §9.4
(U03 vs the running-costs page: "Year-one setup cost vs annual run rate... only one owns
the annual budget") intact — this calculator surfaces a running-cost NUMBER but must not
try to own the full annual-budget EXPLANATION, which stays on that page.

## 7. Constraint: no change to existing behaviour

New fields are optional and default to 0/undefined, so any caller (existing tests, the
premium tool if left unmodified, any other embed) that does not pass them gets byte-for-byte
identical `totalUpfrontCost`, `annualSaving`, `breakEvenYears`, `worthwhile` to today. The
new golden block in section 4 above is the proof; it must be added BEFORE the field
additions are wired into the UI, run against the current engine to confirm it's green at
zero-new-fields, then the new-fields test added alongside.
