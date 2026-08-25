# PACK N5: net-new — plant and machinery capital allowances for manufacturers (FA 2026)

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **rates-timeline-led**, the only pack in the wave permitted to
open on a rates table). Third surface of the manufacturing hub.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `capital-allowances-for-manufacturers` (writer may refine).
- Grade NET-NEW. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- C1 gate: row 73, no C1 restriction. CLEAR.
- Ground truth: **§8** in full, which is already locked and carries the whole FA 2026 set: Annual
  Investment Allowance £1,000,000 permanent; main-rate writing-down allowance 18% reducing to 14%
  from 1 April 2026 (corporation tax) and 6 April 2026 (income tax) per FA 2026 s.28, with a
  straddling period using a hybrid time-apportioned rate; special-rate pool 6% unchanged; new 40%
  first-year allowance on new and unused main-rate plant from 1 January 2026 per FA 2026 s.29,
  available to companies and unincorporated businesses; full expensing 100% / 50% companies only;
  cars excluded from AIA and the first-year allowances; Structures and Buildings Allowance 3%.
  Cross-refs **§3** (the corporation tax it reduces), **§2** (trading profit), **§5** (balancing
  charges on disposal).
- Dossier §8 item 5 records this as a port of existing memory ground truth into house positions
  **with ordering guidance**, not a re-derivation. §8 is already locked; confirm the ordering
  guidance exists before writing.

## 2. Equity register

None (net-new).

## 3. Market keyword slice

The ledger assigns **no keyword rows** to this surface: generic capital-allowance demand is
deliberately walled off (see fences) and the manufacturing-qualified variants were not separately
measured, because the specialist pulls were gate-blocked (dossier §1, delta D1) and the tier1 pool's
21-member capital-allowance cluster was used as consensus-shape evidence rather than imported row by
row. Dossier §2 grades this topic "open" with volume "n/a this ledger".

**This is therefore an explicit coverage-over-selection surface: volume is not a gate.** The
justification is topical, not volumetric: a capital-intensive audience in the one year when the
main rate is actually changing, on the one page where the change can be worked properly. If free
autocomplete or PAA expansion is run at write time (delta **D4**), record what it returns; do not
resize the page on it.

## 4. Competitor teardown (fetched 2026-08-25, free)

No manufacturing-qualified capital-allowance page ranks in this field. Measured on the two
manufacturing pages fetched:

- **skynet `/manufacturing-accountant/`** (p11, ~2,100 words): claims to "maximise tax savings using
  capital allowances, R&D claims and manufacturing-specific reliefs" and **states not one rate, not
  one threshold and not one date.**
- **skynet `/common-manufacturing-accounting-issues/`** (p7-11, ~1,400 words): has a "Capital
  Expenditure (CapEx)" H2 whose entire numeric content is a £50,000 machinery figure used to
  illustrate depreciation. It does not distinguish depreciation from capital allowances.

The institutional tier (MHA, Azets, PKF Francis Clark) publishes FA 2026 commentary, but as firm
insight posts aimed at advisers, not as a manufacturer-facing page that works an example. That is
the gap.

## 5. Whitespace

- **The dated chronology, read correctly.** 1 January 2026 (40% first-year allowance starts),
  1 April 2026 (corporation tax main-rate WDA falls to 14%), 6 April 2026 (income tax equivalent),
  and the straddling-period hybrid rate that catches every manufacturer whose year end is not
  31 March. Nobody in the field lays it out.
- **The ordering decision, worked.** For a new and unused main-rate machine, AIA gives 100% now;
  the 40% first-year allowance gives 40% now and leaves the balance in the main pool at 14%; full
  expensing gives 100% but only to companies. Which to use depends on how much AIA is left and
  whether the £1m allowance is better saved for special-rate spend. **No competitor page in the
  cluster attempts this comparison, and it is the actual decision a factory owner faces.**
- **AIA is use-it-or-lose-it and time-apportioned for short periods**, which is a real trap for a
  manufacturer changing its year end.
- **The depreciation-versus-capital-allowances distinction**, which the best-ranked page in the
  cluster gets structurally wrong by omission.
- A recomputable 2026/27 worked example on a single machine purchase, showing all three routes side
  by side and the resulting tax difference.

## 6. Fences (binding)

- **ESTATE WALL, hard.** Generic capital allowances belong to the existing generalist core pages and
  to the other estate sites. This page addresses **manufacturing-qualified spend only**: production
  plant, machinery, tooling, factory integral features. The tier1 s5b wall list (304 enforced drops)
  is the screen. **Do not target generic phrasings** such as "capital allowances explained",
  "writing down allowance", "annual investment allowance" as standalone heads.
- **Cars are out.** Cars are excluded from AIA and the first-year allowances, and the existing
  `writing-down-allowance-cars.md` page owns that ground. One sentence stating the exclusion, then a
  link. No company-car content. See §9.
- **Structures and Buildings Allowance** gets a factual paragraph at 3% and a boundary sentence; the
  factory building itself is not this page's subject.
- **No claim-encouragement framing.** This is a rules page, not a relief-selling page. No "most
  manufacturers are missing out", no "unclaimed allowances" hook.
- **Every rate carries its effective date, without exception** (§8's writing rule: date-tag the
  main-rate WDA every time, and never state a flat 18% for periods after April 2026).
- No house-position citations in reader copy (report only): cite CAA 2001 sections, FA 2026 s.28 and
  s.29, and the gov.uk capital allowances pages instead. No em-dashes.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: capital allowances for manufacturers; what the writing-down
   allowance change means for a factory; can a manufacturer claim the 40% first-year allowance;
   AIA or full expensing on new machinery; what happens to a period straddling 1 April 2026.
2. Figures, all date-tagged and recomputable: AIA £1,000,000 permanent; main-rate WDA 18% to **14%
   from 1 April 2026 (corporation tax) / 6 April 2026 (income tax)**, FA 2026 s.28; special rate
   **6%** unchanged; **40% first-year allowance from 1 January 2026** on new and unused main-rate
   plant, FA 2026 s.29, companies and unincorporated; full expensing **100% / 50%, companies only**;
   SBA **3%**; corporation tax 25% / 19% with the £50,000 and £250,000 limits on the tax-saved line.
3. **Three-route worked comparison on one machine purchase** (AIA, 40% FYA, full expensing), plus a
   straddling-period hybrid-rate calculation. Every line re-derivable.
4. Structure follows the rates-timeline lead: a dated chronology table in the first screen. No H2
   phrasing shared with N3 or N4.
5. Links: N3, N4, the existing core capital-allowance page, `writing-down-allowance-cars`.
   Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
6. No generic capital-allowance head term appears in metaTitle or H1.

## 8. Expectation

**Coverage surface, no measured volume, and it will not be judged on volume.** The value is that
2026 is the year the main rate actually moves and a capital-intensive audience needs the ordering
answer. Realistic: long-tail impressions on manufacturing-qualified and straddling-period phrasings
within a quarter; it may never hold a head term and is not expected to. Maturity caveat: net-new,
judge at 28d Bing / 90d Google, and judge on impressions breadth rather than position. Failure
trigger: zero impressions on any manufacturing-qualified capital-allowance phrasing at 90d
post-index. **Standing risk:** if a future Finance Act moves these rates again the page needs a
dated back-patch, not a rewrite; the chronology table is built to be replaceable.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `writing-down-allowance-cars.md` | writing-down allowance, AIA, full expensing comparison | **Differentiate, do not collapse.** That page owns cars entirely (WDA by CO2, the AIA and FYA exclusion, private use, balancing adjustments). N5 states the car exclusion in one sentence and links. N5 targets no car phrasing; that page targets no manufacturing phrasing. |
| existing generalist core capital-allowance content | generic CA | Estate wall (tier1 s5b, 304 enforced drops). N5 is manufacturing-qualified only and links to the core page for the general rules. |
| `limited-company-car-tax-relief-2025-26.md`, `p11d-company-car-fuel-paid-by-director.md`, `sole-trader-vs-limited-company-tax-calculator-company-car.md` | vehicles | Out of scope. Dossier §1 already checked and excluded the company-car posts from the motor-trade cluster; the same exclusion applies here. No link, no overlap. |
| N10 (this wave) | demonstrator cars | N10 owns dealer demonstrator vehicles; N5 owns production plant. No shared phrasing. |
