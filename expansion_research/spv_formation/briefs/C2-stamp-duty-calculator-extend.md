# C2 — /calculators/stamp-duty-calculator (EXTEND)

Build spec, not a writer brief. Additive change only. **Existing behaviour for existing
inputs must not change** (proved by goldens) — the new connected-party mode is an
ADDITIVE toggle, not a replacement of the current standard/additional/FTB/non-resident
logic.

## 0. Verdict + demand justification (`page_map.csv` C2, `PAGE_MAP.md` §10)

Verdict: EXTEND. "Already applies the 5% additional-dwelling surcharge to company
purchases. ADD an explicit company / connected-party mode (market-value rule, s.53 FA
2003) and the six-dwellings non-residential election flag. 1,000/mo on the company
phrasing alone, and the highest-intent entry point in the transfer cluster."

Dominant query: **stamp duty calculator limited company** — **1,000/mo**
(`page_map.csv` C2 volume column; also flagged in the task brief as the specific
demand line to state explicitly).

Variant list (from `page_map.csv` C2 `query_variants`):
- ltd company stamp duty calculator
- limited company buy to let stamp duty calculator
- spv company stamp duty calculator
- buy to let stamp duty calculator limited company gov uk

This calculator sits inside HUB 3 transfer-in, the heaviest hub in the programme
(`PAGE_MAP.md` §5: "transfer-in beats formation 4-5x in our own data"). Two transfer pages
(`sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`)
are PROTECTED/ranking 1.5-3.9 — this calculator is a TOOL that supports those pages, not a
new page competing with them; no page-level content changes are in scope here, only the
calculator.

## 1. Current field/state list and compute flow (from the code)

**Component:** `src/components/calculators/StampDutyCalculator.tsx` (bespoke, "page" and
"embed" variants). **Shared engine:** `src/lib/sdlt.ts`.

Current state (4): `price` (default 350,000), `additional` (checkbox, default true — buy-to-let
or second home, mutually exclusive with `ftb`), `ftb` (checkbox, default false — first-time
buyer, mutually exclusive with `additional`), `nonResident` (checkbox, default false, +2%
surcharge).

**Compute flow** (inline in the component, not currently in `src/lib/sdlt.ts` as a single
function — the component composes the shared band functions itself):
```
ftbReliefApplies = ftb && !additional && price <= 500_000
standard = marginalSdlt(price, ftbReliefApplies ? FTB_SDLT_BANDS : STANDARD_SDLT_BANDS)
surcharge = additional ? price * ADDITIONAL_DWELLING_SURCHARGE : 0   // 0.05
nonRes = nonResident ? price * 0.02 : 0
total = standard + surcharge + nonRes
```

Shared engine functions used: `marginalSdlt()`, `STANDARD_SDLT_BANDS`, `FTB_SDLT_BANDS`,
`ADDITIONAL_DWELLING_SURCHARGE` (all in `src/lib/sdlt.ts`). Also present in `sdlt.ts` but
NOT currently wired into this component: `additionalDwellingSdlt()` (a convenience wrapper
doing `marginalSdlt + surcharge` in one call — used by `lib/incorporation.ts` instead) and
`firstTimeBuyerSdlt()`.

## 2. Proposed new fields / mode

Add a third, mutually-exclusive-with-nothing toggle group (this one stacks WITH additional,
it does not replace it — see mechanics below): `connectedPartyMode` (boolean, default
false), plus a conditional sub-field `sixDwellingsRule` (boolean, default false, only
shown/relevant when `connectedPartyMode` is true or generally whenever price represents a
qualifying multi-dwelling transaction).

| Field | Type | Default | Help text |
|---|---|---|---|
| `connectedPartyMode` | boolean | false | "Transferring to a company you (or a connected person) control? SDLT is charged on the property's MARKET VALUE, not the price actually paid or any consideration recorded — s.53 FA 2003." |
| `marketValue` | number, shown only when `connectedPartyMode` true | = `price` initially | "The property's current open-market value. This is the figure SDLT is calculated on for a connected-party transfer, even if no cash changes hands." |
| `sixDwellingsRule` | boolean | false | "Six or more dwellings in a single transaction? Non-residential rates apply automatically instead of residential rates plus the surcharge — s.116(7) FA 2003." |

**CORRECTION applied at brief review 2026-09-01.** This field was originally specced as
`sixDwellingsRule` citing "FA 2003 Sch 6B". Both were wrong, and
`docs/property/house_positions.md` line 31 logs that exact correction (2026-05-22, verified
against legislation.gov.uk): the six-dwellings rule is **s.116(7) FA 2003**, an **automatic
statutory deeming, not an election** — there is no claim or election mechanism, the buyer
simply reports on the non-residential basis. Sch 6B para 7 is the definitional "what counts
as a dwelling" rule, and Sch 6B itself was MDR, abolished 1 June 2024. The UI must therefore
present this as "does your transaction meet the six-dwellings test?", never as "elect to be
taxed at non-residential rates". The sibling briefs U17 §6 and U18 §6 already state this
correctly; C2 was the only unit carrying the wrong framing.

## 3. Compute flow changes

**Connected-party / market-value mode (s.53 FA 2003):**
```
const chargeableAmount = connectedPartyMode ? Math.max(0, marketValue) : price;
```
Replace every downstream use of `price` in the SDLT band/surcharge calculation with
`chargeableAmount`, EXCEPT: when `connectedPartyMode` is false, `chargeableAmount === price`
exactly, so existing callers see byte-identical output (this is the additive guarantee).
The 5% company surcharge (`additional`) still applies on top when the buyer is a company —
confirm in the UI copy that `connectedPartyMode` does NOT imply `additional` automatically;
a company purchase should default `additional = true` when `connectedPartyMode` is
switched on (companies buying residential property almost always attract the
additional-dwelling surcharge), but leave it as a user-adjustable checkbox rather than a
hard lock, consistent with the existing toggle pattern.

**Six-dwellings automatic non-residential treatment (s.116(7) FA 2003):**
```
const sixDwellingsTotal = sixDwellingsRule
  ? marginalSdlt(chargeableAmount, NON_RESIDENTIAL_SDLT_BANDS)  // no surcharge
  : standard + surcharge; // unchanged existing path
```
This needs a NEW band table `NON_RESIDENTIAL_SDLT_BANDS` added to `src/lib/sdlt.ts`.
The bands ARE in house positions (correcting this brief's earlier "not found in the grep"
note): `docs/property/house_positions.md` line 31 gives **0% to £150,000; 2% £150,000 to
£250,000; 5% above £250,000**, and confirms **no additional-dwellings surcharge applies**
on the non-residential basis. Re-verify against gov.uk at implementation time as usual, but
do not treat this as an unsourced figure.

Because the treatment is automatic and not an election, the non-residential result is not an
optional alternative the user picks — where the six-dwellings test is met it IS the charge.
Model it as the headline total when `sixDwellingsRule` is true, and show the
residential-plus-surcharge figure alongside as a "what it would cost on the residential
basis" comparison line, not the reverse. The non-resident 2% surcharge still applies on its
own terms; the 5% additional-dwellings surcharge does not.

**Interaction with existing toggles:** `connectedPartyMode` and `sixDwellingsRule` are
each independent of `ftb` (a connected-party company transfer is never a first-time-buyer
purchase in practice, but do not hard-block it in code — just let the existing
`ftbReliefApplies = ftb && !additional && price <= 500_000` logic naturally exclude it
when `additional` is true, which it already does).

## 4. Which goldens update

`src/tests/calculator-goldens.test.ts` currently pins the underlying `sdlt.ts` functions
directly (not through the component): `additionalDwellingSdlt(100_000) === 5_000` (line
~822, "SDLT additional surcharge is 5%"), and separately `firstTimeBuyerSdlt`/`marginalSdlt`
goldens (section 9, lines ~635-660). There is a SEPARATE golden harness for the SDLT Excel
model: `scripts/resources/golden/stamp-duty.golden.ts`, which reads locked rate cells out
of the shipped workbook and cross-checks against `computeSdltScenarios()` in
`src/lib/sdltScenarios.ts` (a DIFFERENT file from `src/lib/sdlt.ts` — confirm at
implementation time whether `sdltScenarios.ts` needs the same connected-party/six-dwellings
additions to stay in sync, since the golden explicitly asserts xlsx-vs-TS parity and a
divergence here would fail that check silently until someone runs it).

New goldens to add:
- `describe("GOLDEN: connected-party market-value mode")`: existing default inputs
  (price 350,000) with `connectedPartyMode: false` must still equal the CURRENT
  `additionalDwellingSdlt`-style total exactly (regression proof). Then a case with
  `connectedPartyMode: true, marketValue: 400,000, price: 0` (modelling a nil-consideration
  transfer to a controlled company) asserting the charge is computed on the £400,000
  market value, not £0.
- `describe("GOLDEN: six-dwellings automatic non-residential treatment")`: with
  `sixDwellingsRule: false` the total must equal today's output exactly (regression proof).
  With `sixDwellingsRule: true` at a qualifying multi-dwelling price point, assert the total
  is computed on `NON_RESIDENTIAL_SDLT_BANDS` with the 5% additional-dwellings surcharge
  EXCLUDED, and that it is lower than the residential-plus-surcharge comparison figure.
- Update `scripts/resources/golden/stamp-duty.golden.ts` (or add a sibling golden script)
  only if `sdltScenarios.ts` is touched — otherwise leave it alone, since it tests a
  workbook this brief's scope does not touch.

## 5. embedHeight implications

`src/app/embed/stamp-duty-calculator` — check its fixed iframe height. Two new toggles
(connected-party mode, which conditionally reveals a `marketValue` input, plus the
six-dwellings election) add up to 2 checkbox rows (~60-70px each per the existing fieldset
pattern in the component) plus a conditional number-input row (~70-90px) when
connected-party mode is on. As with C1, prefer keeping the embed variant lean: consider
gating the two new toggles behind `variant !== "embed"` (matching the existing pattern
where `ResultGate` is already conditional on variant) if the embed height budget is tight,
so partner iframes are unaffected and the fuller mode lives only on the on-page calculator.

## 6. Page-copy additions

On `src/app/calculators/stamp-duty-calculator/page.tsx`: add a short explanatory block
near the connected-party toggle stating the s.53 FA 2003 rule in plain language (market
value, not price paid, governs the charge for connected-party transfers — this directly
serves the "buy to let stamp duty calculator limited company gov uk" variant, which reads
as someone looking for the authoritative rule, not just a number) and a one-line pointer
to `sdlt-transfer-property-company-cost` (PROTECTED page, owns the full charge
explanation) for the complete legal and worked-example treatment — the calculator answers
"how much", the blog page answers "why" and "in detail". Do not let the calculator's new
copy expand into a full explainer that competes with that protected page.

## 7. Constraint: no change to existing behaviour

`connectedPartyMode` and `sixDwellingsRule` both default to `false`, and every existing
computation path (`standard`, `surcharge`, `nonRes`, `total`, `effectiveRate`) is
unreachable-changed only when one of the new toggles is explicitly turned on. The new
golden block in section 4 (connected-party mode off) is the proof this holds; it must be
green against the CURRENT engine before the new fields are wired into the UI, exactly as
in the C1 spec.
