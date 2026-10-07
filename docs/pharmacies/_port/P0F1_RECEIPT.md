# P0-F1 receipt: phase 0 serious-tier fix wave (my file set only)

Run 2026-10-07. No subagents. No state-changing git command. No server started or stopped.
No `next build`. Working tree already carried uncommitted edits from other packages
(`src/app/**`, `src/components/research/**`, `src/lib/schema.ts`); none of those are mine and
none were touched.

Owner ruling 2026-09-28 honoured throughout: every change below is the minimal factual
correction to an existing sentence. No rewrite, no tone or style change. Ledger rows 8
(composite testimonials) and 9 (cookie/privacy small print) untouched.

## Files changed (9)

| file | ledger rows |
|---|---|
| `pharmacies/web/src/lib/calculators/tools/locum-take-home-comparator.ts` | 1 (G1) |
| `pharmacies/web/src/lib/calculators/tools/locum-take-home-comparator.test.ts` | 1 (G1) |
| `pharmacies/web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts` | 2 (G2), 4 (G5) |
| `pharmacies/web/src/lib/calculators/tools/pharmacy-purchase-affordability.test.ts` | 2 (G2) |
| `pharmacies/web/src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.ts` | 3 (G3) |
| `pharmacies/web/src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.test.ts` | 3 (G3) |
| `pharmacies/web/public/llms.txt` | 6 (E1), 7 (C3) |
| `pharmacies/web/src/app/llms-full.txt/route.ts` | 6 (E1), 7 (C3) |
| `pharmacies/web/content/blog/drug-tariff-changes-explained.md` | 5 (F3) |
| `pharmacies/web/content/blog/pharmacy-dispensing-workload-and-density.md` | not-serious D2 |
| `docs/pharmacies/rates_ledger.json` | 1 (G9), append only |

`docs/pharmacies/house_positions.md` not changed: no house position asserts a Class 2 charge,
a personal allowance, an additional-rate threshold or the NI upper earnings limit, so there was
nothing in it to correct. Verified against it rather than edited.

---

## Row 1: locum take-home comparator, Class 2 NIC

**Finding.** The sole-trader computation deducted `CLASS2_WEEKLY (3.45) * 52 = £179.40` a year
unconditionally. Class 2 NIC is not payable: from 6 April 2024 a self-employed person with
profits above the Small Profits Threshold is treated as having paid Class 2 at nil cost (the NI
credit is given with no charge); £3.45/week is the voluntary rate for those **below** the SPT.
The in-code comment had the test inverted and then charged it regardless.

### Code change

Constant block removed and replaced with the correct statement (comment only, no live constant):

- before: `// Class 2 NIC 2026/27 (sole trader, self-employed)` / `// £3.45/week (gov.uk/self-employed-national-insurance-rates)` / `const CLASS2_WEEKLY = 3.45;`
- after: a three-line comment stating Class 2 is not charged above the SPT and voluntary below it, citing the same gov.uk page. No constant.

`soleTraderTakeHome` doc comment:

- before: `/** Sole-trader take-home: income - expenses = profit; income tax + Class 2 + Class 4 NIC. */`
- after: `/** Sole-trader take-home: income - expenses = profit; income tax + Class 4 NIC. */`

Return type: `class2NIC: number;` field removed. `const class2 = CLASS2_WEEKLY * 52;` removed,
`totalNIC = class2 + class4Main + class4Upper` becomes `totalNIC = class4Main + class4Upper`.

In-body comment:

- before: `// Class 2 NIC: £3.45/week × 52 (if profit above Small Profits Threshold £6,845 2026/27)` / `// ponytail: Class 2 SPT check omitted — at locum day rates profit is always above threshold`
- after: `// No Class 2 NIC: above the Small Profits Threshold it is credited at nil cost (see above),` / `// and at locum day rates profit is always above that threshold.`

Result row deleted entirely:

- before: `{ label: "Class 2 NIC (£3.45/week)", value: \`−${gbp(st.class2NIC)}\` },`
- after: (row removed)

Result note sentence:

- before: "Sole trader uses Class 2 NIC at £3.45/week and Class 4 NIC at 6% (£12,570-£50,270) / 2% above."
- after: "Sole trader uses Class 4 NIC at 6% (£12,570-£50,270) / 2% above; Class 2 NIC is not charged where profits exceed the Small Profits Threshold."

### Arithmetic, hand-derived (base case £400/day x 4 days x 46 weeks, £3,000 expenses)

```
annual income  = 400 x 4 x 46                    = 73,600.00
profit         = 73,600 - 3,000                  = 70,600.00
personal allow = 12,570 (profit below £100,000)
taxable        = 70,600 - 12,570                 = 58,030.00
income tax     = 37,700 x 0.20                   =  7,540.00
               + (58,030 - 37,700) x 0.40        =  8,132.00
                                         total   = 15,672.00
Class 4 main   = (50,270 - 12,570) x 0.06        =  2,262.00
Class 4 upper  = (70,600 - 50,270) x 0.02        =    406.60
Class 2                                          =      0.00  (was 179.40)
net take-home  = 70,600 - 15,672 - 2,262 - 406.60 = 52,259.40 -> gbp "£52,259"
```

Previous pinned value £52,080 (= 52,259.40 - 179.40, rounded). Delta +£179.

### Test change

- the `"sole trader: class 2 NIC figure"` test (pinned `−£179`) is replaced by
  `"sole trader: no Class 2 NIC row (abolished for profitable traders, 6 Apr 2024)"`, which
  asserts no row label contains "Class 2" and the note no longer contains "Class 2 NIC at £3.45".
  This fails if the charge returns.
- `"sole trader: net take-home"`: `£52,080` -> `£52,259`, with the full derivation above written
  into the test as a comment, including the old figure and why it was wrong.
- header comment: `Class 2 £3.45/wk` -> `Class 2 nil (credited at nil cost above the SPT from 6 Apr 2024)`.
- `"zero income"` comment: `// profit=0, tax=0, class2=£179 → without clamp would be negative; tool clamps to £0`
  -> `// profit=0, tax=0, Class 4=£0 → £0; the clamp also holds if any fixed charge returns`.

### Row 1 second part: the five constants with no ledger entry (G9)

Checked each against `house_positions.md` before appending:

| constant | value | house position | action |
|---|---|---|---|
| `BASIC_RATE_LIMIT` | 37,700 | HP 15 (the 18%/24% CGT split boundary) | **already in the ledger** as `basic_rate_band_ceiling` = 37700; no new row needed |
| `CLASS2_WEEKLY` | 3.45 | none (no HP asserts a Class 2 charge) | constant **deleted** by the fix above; a `class2_nic_charge` = 0 row appended so the corrected position is on record |
| `PERSONAL_ALLOWANCE` | 12,570 | none | appended as `personal_allowance` |
| `ADDITIONAL_RATE_GROSS_THRESHOLD` | 125,140 | none | appended as `additional_rate_threshold` |
| `NI_UPPER_EARNINGS_LIMIT` | 50,270 | none (HP 25 covers the employer rate and secondary threshold only) | appended as `ni_upper_earnings_limit` |

Also appended `personal_allowance_taper_threshold` = 100,000, because the tool's
`personalAllowanceFor()` taper and the pinned £150k test depend on it and it had no key either.

Five rows appended, zero rows deleted or altered; `git diff --stat` on
`docs/pharmacies/rates_ledger.json` = `45 ++++`, 0 deletions. Existing shape followed exactly
(`key`, `value` as a string, `unit`, `note`, `applies_from`, `source_url`, `verified_at`).
`verified_at` is set to **2026-07-14**, matching the in-file provenance of these constants
(`locum-take-home-comparator.ts:7`, "Rates verified against gov.uk on 2026-07-14"). I did not
re-fetch gov.uk this pass, so I did not stamp today's date.

---

## Row 2: pharmacy purchase affordability, SDLT scope

**Finding.** `sdltNonResidential(price)` charged SDLT on the whole purchase price. SDLT is
charged on land and buildings only. The page's own FAQ already says so
(`:166`, "The goodwill and non-property assets are outside SDLT"), and HP 13 says goodwill
dominates pharmacy pricing, so on a leasehold deal the correct figure is nil.

**Fix chosen.** The smallest correct fix consistent with the FAQ: one new `currency` input
defaulting to 0 (the leasehold case), SDLT computed on it. The tool's field schema takes a
plain `currency` field with a default, so a new input was not disproportionate; no new
abstraction, no change to the share-deal path.

### Code change

New field inserted before `projectedAnnualProfit`:

```ts
{
  id: "premisesValue",
  label: "Premises (property) value included in the price (£)",
  type: "currency",
  default: 0,
  min: 0,
  help: "The part of the price that buys land or buildings. Leave at 0 for a leasehold pharmacy, where no property is being bought. SDLT is charged on this figure only, never on goodwill or the NHS contract.",
},
```

`compute()`:

```ts
// SDLT is charged on land and buildings only (HP 12), never on goodwill or the NHS contract.
const premisesValue = Math.min(price, Math.max(0, Number(v.premisesValue) || 0));
```

(`|| 0` keeps a direct `compute()` call with the key absent from producing `NaN`; the premises
figure is also capped at the price so it cannot exceed the consideration.)

- before: `const sdlt = sdltNonResidential(price);`
- after: `const sdlt = sdltNonResidential(premisesValue);`

Share-deal logic untouched: `stampDutyShares(price)` still charges 0.5% on the whole
consideration, which is correct.

Rows:

- new row added above the duty comparison: `{ label: "Premises (property) value in the price", value: gbp(premisesValue) }`
- before: `{ label: "Asset deal: SDLT non-residential (est.)", value: gbp(sdlt), strong: true }`
- after: `{ label: "Asset deal: SDLT on the premises element (est.)", value: gbp(sdlt), strong: true }`
- before: `{ label: "SDLT premium over share duty", value: gbp(dutyDiff) }`
- after: `{ label: "SDLT less share duty (difference)", value: gbp(dutyDiff) }`
  (consequential: with SDLT now nil on a leasehold, `dutyDiff` is routinely negative, and
  "premium" would be the wrong word for a negative number. Label only, arithmetic unchanged.)

Note sentence:

- before: "SDLT applies the non-residential bands (0% to £150,000, 2% from £150,001 to £250,000, 5% above)."
- after: "SDLT applies the non-residential bands (0% to £150,000, 2% from £150,001 to £250,000, 5% above) to the premises figure you entered only, because goodwill and the NHS contract are outside SDLT; on a leasehold deal with no property that figure is nil."

### Arithmetic, hand-derived

```
Leasehold (premises 0), price £400,000:
  SDLT  = 0                                        -> "£0"   (was £9,500)
  share = 400,000 x 0.005          =  2,000.00     -> "£2,000"  (unchanged)

Freehold, premises element £400,000:
  band 1 = 0% on first 150,000     =      0.00
  band 2 = (250,000 - 150,000) x 0.02 = 2,000.00
  band 3 = (400,000 - 250,000) x 0.05 = 7,500.00
  SDLT   =                              9,500.00   -> "£9,500"

Premises element £200,000:
  band 2 = (200,000 - 150,000) x 0.02 = 1,000.00   -> "£1,000"
```

Bands re-checked against `rates_ledger.json` `sdlt_nonresidential_top_rate` = 5% and HP 12.

### Test change

- the pinned `"SDLT bands: price above £250k triggers 5% band"` test (£9,500 on the £400k
  default) is split into two:
  - `"SDLT is nil on a leasehold deal: £400k price, no premises in the price"` — asserts `£0`,
    with the old `£9,500` named in a comment as the defect it replaces.
  - `"SDLT bands: £400k premises element triggers the 5% band"` — passes `premisesValue: 400_000`
    and still pins `£9,500`, derived by hand in the comment.
- `"SDLT only 2% band: price £200k"` -> `"SDLT only 2% band: £200k premises element"`, now passes
  `premisesValue: 200_000`, still pins `£1,000`.
- `"zero interest rate"` test: its `expect(sdlt?.value).toBe("£0")` still holds, comment changed
  from `// price=150k is exactly the zero band boundary` to `// no premisesValue entered (leasehold default 0)`.
- every `rows.find` on the old SDLT label updated to the new label.
- header comment gained: SDLT is "charged on the premises (property) element only, never on
  goodwill or the NHS contract".

### Row 4 (G5), same file: the uncited lending rate

- before: "The rate quoted by the lender. Commercial pharmacy finance rates in 2026 have varied between approximately 5% and 8% depending on lender, term and loan-to-value."
- after: "The rate quoted by the lender. The rate you are offered depends on lender, term and loan-to-value."

Figure removed, sentence left grammatical and minimal, standing rule on uncited market figures
applied. No other wording in the help text changed.

---

## Row 3: FP34 cash-flow estimator, the payment lag

**Finding.** The headline "Working-capital gap to bridge" was `monthlyClaimValue - advanceAmount`.
`lag` only fed a row label, so a user entering a 4-month lag saw the same gap as one entering 1.

**The tool's own stated method**, read before choosing the maths:
- `oneLiner`: "estimate the working-capital gap you need to bridge"
- `intro`: "payment arrives roughly two months later, with an advance on account in the interim"
- explainer para 2: "The gap between the advance and the full claim value must be funded from
  working capital, a cash-flow facility, or the owner's reserves" while "each month brings an
  advance for the current month's expected claim plus the net settlement for a claim two months
  prior"

That is an exposure that accrues once per month for every month of lag before the first
settlement lands. So gap = monthly shortfall x lag, which is the brief's first option and what
the explainer implies. Explainer prose left exactly as written.

### Code change

- before:
  ```ts
  // Working-capital gap = cost of funding before advance is received
  // Illustrative: the gap is the portion of monthly costs not covered by the advance
  const workingCapitalGap = monthlyClaimValue - advanceAmount;
  ```
- after:
  ```ts
  // Monthly shortfall = the part of each month's claim the advance does not cover.
  const monthlyShortfall = monthlyClaimValue - advanceAmount;
  // Working-capital gap = that shortfall accumulated across the months you wait for
  // settlement, which is what the explainer describes (HP 7: roughly a two-month lag).
  const workingCapitalGap = monthlyShortfall * lag;
  ```

New row added above the gap row, so the per-month figure the old headline showed is still on the
page under an accurate label: `{ label: "Monthly shortfall while you wait", value: gbp(monthlyShortfall) }`.

Headline tone (consequential, not cosmetic: the old threshold compared a now-multiplied figure
against one month's claim and would have read "warn" on almost every input):

- before: `tone: workingCapitalGap > monthlyClaimValue * 0.6 ? "warn" : "default",`
- after: `tone: monthlyShortfall > monthlyClaimValue * 0.6 ? "warn" : "default",`

Note sentence:

- before: "The working-capital gap shown is the portion of monthly claim value not covered by the advance while you wait for full settlement."
- after: "The working-capital gap shown is the portion of monthly claim value not covered by the advance, accumulated across the ${lag} month${lag === 1 ? "" : "s"} you wait for full settlement."

### Arithmetic, hand-derived

```
2,000 items x £10 = 20,000 claim; 50% advance = 10,000
  shortfall = 20,000 - 10,000 = 10,000
  gap       = 10,000 x 2      = 20,000   -> "£20,000"   (was £10,000)

1,000 x £8 = 8,000; 40% advance = 3,200
  shortfall = 4,800;  gap = 4,800 x 2 = 9,600   -> "£9,600"   (was £4,800)

3,000 x £12 = 36,000; 100% advance = 36,000
  shortfall = 0;      gap = 0 x 2 = 0           -> "£0"       (unchanged)

500 x £20 = 10,000; 0% advance
  shortfall = 10,000; gap = 10,000 x 2 = 20,000 -> "£20,000"  (was £10,000)

1,000 x £10 = 10,000; 50% advance; shortfall 5,000
  lag 1 -> 5,000 ; lag 4 -> 20,000              (the lag now moves the number)
```

### Test change

- header comment gained `monthlyShortfall` and `workingCapitalGap = monthlyShortfall * paymentLagMonths`.
- standard case: gap and headline `£10,000` -> `£20,000`, derivation and the old figure in a comment.
- `"40% advance: gap = 60% of claim"` -> `"40% advance: shortfall = 60% of claim, gap = shortfall x lag"`;
  now asserts the new shortfall row is `£4,800` and the gap is `£9,600`.
- `"100% advance: zero working-capital gap"`: unchanged, still `£0` (0 x lag = 0).
- `"0% advance"`: gap `£10,000` -> `£20,000`.
- new test `"the gap tracks the payment-lag input"`: lag 1 gives `£5,000`, lag 4 gives `£20,000`.
  This is the check that fails if the lag is ever dropped from the formula again.
- `"settlement row label includes lag months"`: unchanged, still passes.

---

## Row 5 (F3): the monthly refresh promise

`content/blog/drug-tariff-changes-explained.md:152`. Refresh promise removed, "As at" date kept,
rest of the sentence untouched.

- before: `<p><em>As at: July 2026. This slot is refreshed monthly. Check the <a href="...">NHSBSA Drug Tariff portal</a> for the current edition...`
- after: `<p><em>As at: July 2026. Check the <a href="...">NHSBSA Drug Tariff portal</a> for the current edition...`

---

## Row 6 (E1): llms.txt describes the affordability calculator backwards

`public/llms.txt:37`:

- before: "Models the affordable purchase price for a community pharmacy based on EBITDA, debt service, and working capital."
- after: "Takes an agreed purchase price, deposit and loan terms and returns the estimated monthly repayment, the post-tax cash cover ratio, and the stamp duty or SDLT cost of a share deal against an asset deal."

The same inversion was live in the second machine file, so it was corrected there too
(`src/app/llms-full.txt/route.ts:60`, in my set):

- before: "(affordable purchase price from EBITDA, debt service, and working capital)"
- after: "(monthly loan repayment, post-tax cash cover ratio, and share-deal against asset-deal acquisition tax, from an agreed purchase price)"

Both now match `compute()` and the tool's own `oneLiner`.

---

## Row 7 (C3/D1): reply time, 24 hours against one working day

Property's string, grepped: `within 24 hours` (`Property/web/src/app/{about:233,blog:247,contact:74,page:455+480,services:102+235+444}`,
`components/blog/InlineMiniLeadForm.tsx:17`, `components/forms/LeadForm.tsx:444`). Zero hits for
"one working day" anywhere in `Property/web/src`. So the 4 pharmacies outliers align to
"within 24 hours".

Two of the four are in my set and are fixed:

- `public/llms.txt:76` before: "Specialist advice for pharmacy owners and buyers. Reply within one working day."
  after: "Specialist advice for pharmacy owners and buyers. Reply within 24 hours."
- `src/app/llms-full.txt/route.ts:86` before: "No phone lines or walk-ins; every enquiry gets a specialist reply within one working day."
  after: "No phone lines or walk-ins; every enquiry gets a specialist reply within 24 hours."

The pharmacies files already carrying the Property string were left untouched
(`components/forms/LeadForm.tsx:411,438` both read "within 24 hours").

**Could not reach (handoff, row 7):** see handoffs 1 and 2 below.

---

## Not-serious item taken: the two pharmacy counts (D2)

`content/blog/pharmacy-dispensing-workload-and-density.md`. No figure changed; both are correct
for their own dataset (10,382 = distinct dispensing contractor accounts, March 2026, from
`pharmacy-dispensing-workload.json`; 10,617 = NHSBSA Contractor Details registered contractors,
Jun 2026, from `pharmacy-density-by-region.json`). Only the dataset attribution words were added.

- `:42` before: "The number of dispensing pharmacies fell from 11,764 to 10,382, a decrease of 11.7%."
  after: "The number of pharmacies actively dispensing in the month fell from 11,764 to 10,382, a decrease of 11.7%."
- `:99` before: "England as a whole sits at 18.11 pharmacies per 100,000 population, from 10,617 pharmacies and 58,620,101 people."
  after: "England as a whole sits at 18.11 pharmacies per 100,000 population, from the 10,617 registered pharmacy contractors on NHSBSA Contractor Details (a wider count than the 10,382 actively dispensing in a single month above) and 58,620,101 people."

Everything else on the ledger's not-serious list was left alone, as instructed.

---

## Verification

```
cd pharmacies/web && npx vitest run src/lib/calculators

 ✓ src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.test.ts (6 tests) 33ms
 ✓ src/lib/calculators/tools/pharmacy-purchase-affordability.test.ts (7 tests) 33ms
 ✓ src/lib/calculators/tools/locum-take-home-comparator.test.ts (11 tests) 53ms

 Test Files  3 passed (3)
      Tests  24 passed (24)
   Duration  631ms
```

(was 21 tests before this package: +1 locum net-of-Class-2 replacement, +1 affordability
leasehold-SDLT case, +1 FP34 lag-sensitivity case.)

```
cd pharmacies/web && npx tsc --noEmit
EXIT:0        (no output, clean)
```

`git diff --stat docs/pharmacies/rates_ledger.json` -> `45 +++++`, 0 deletions (append only,
as required).

---

## Handoffs (outside my file set, found, not edited)

1. `pharmacies/web/src/app/about/page.tsx:26` — carries the row 7 outlier
   "We work on a fixed-fee basis and reply **within one working day**." Needs "within 24 hours"
   to match Property and the two machine files I corrected. Off limits to me (`src/app/**`).
   The same line also carries ledger row C4 (the fixed-fee promise only this site makes), which
   is an owner decision, so one edit can close both if the owner rules on C4 at the same time.
2. `pharmacies/web/src/components/calculators/MiniCapture.tsx:20` — carries the row 7 outlier
   "Reply **within one working day**". Needs "within 24 hours". Off limits to me
   (`src/components/calculators/**`). Until 1 and 2 land, the site still says both things:
   24 hours on 8 surfaces plus both machine files, one working day on these 2.
3. `pharmacies/web/src/data/pharmacy-openings-closures-index.json:4` — ledger F4, dataset says
   "updated monthly on NHSBSA publication" with no automation (last pull 2026-07-23). This IS in
   my set (`src/data/**`) but it is a minor-tier row and the brief limited me to the listed
   serious rows plus D2, so I left it. Same class as the row 5 fix I did make; a one-word
   softening would close it.
4. `pharmacies/web/src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.ts:86-89` —
   ledger G4 (minor, not in my brief): the "Full settlement (arrives month +N)" row shows the
   **full** claim value while the advance row above shows the advance, so the two read as if the
   claim is paid one and a half times. `settlementNet` is already computed at `:74` and used
   correctly in the timeline rows below, so the fix is one identifier. Not done: outside the
   listed rows. Note that the FP34 test pins this row's value at `£10,000` (`:82`), so that test
   needs updating with it.
5. `pharmacies/web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts:151,155` —
   ledger G6 (minor): "Most lenders want to see at least 1.25x" / "Most commercial lenders
   require at least 1.25x", unsourced lender-behaviour claim, twice in one file. Same standing
   rule as the row 4 figure I removed, but G6 was not on my list so the sentences stand.
6. `pharmacies/web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts:108-114` —
   ledger G7 (minor): corporation tax is computed on projected profit **before** deducting loan
   interest, so CT is overstated and the cover ratio understated. The note discloses the rates
   and the single-company assumption but not this simplification. Untouched.
7. `pharmacies/web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts:119-122` —
   ledger B5 (owner decision): three "the ranges we see most often" variants imply an observed
   deal population. Untouched, owner decision.
8. `pharmacies/web/src/app/blog/[category]/[slug]/page.tsx:124` — ledger H1: `prose-neutral` has
   no rule anywhere in the monorepo (`.prose` itself is fine, imported at `globals.css:6`). Dead
   class, delete when that file is next touched. Off limits to me.
9. `pharmacies/niche.config.json` — P0E serious 5: declares a logo asset that does not exist
   (`public/brand/logo.png` missing; a text wordmark renders instead). Stale config key, not a
   current rendering defect. Off limits to me (`niche.config.json` is not in my set).
10. `pharmacies/web/public/llms.txt:47-56` — ledger E2: currency rendered as "pound-sterling
    1 million" etc. on 11 lines of the key-facts block, where every other surface uses the pound
    sign. This file IS in my set but E2 is minor-tier and not on my list, so the 11 lines stand.
    Cosmetic for AI retrievers, one pass with a replace would close it.

Nothing in P0B's serious list (duplicate Organization `@id`, `priceRange`, embed chrome,
missing breadcrumb UI) or P0E's serious list (nested `<main>`, no skip link, `resourcesHref`
owner call, `storagePrefix` = `pfp`, missing logo asset) lives in my file set; all of it sits in
`src/app/**`, `src/components/layout|ui`, `src/lib/schema.ts` or `niche.config.json`. Checked
rather than assumed.

Note for whoever picks up the next package: the working tree already had unrelated uncommitted
edits in `src/app/**` (12 files), `src/components/research/PharmacyIndexCharts.tsx` and
`src/lib/schema.ts` when I started. They are not mine and I did not touch them.
