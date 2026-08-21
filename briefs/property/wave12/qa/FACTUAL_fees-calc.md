# Wave 12 adversarial factual QA: fees + calculator (A1, A2, A7, cost-of-selling-calculator)

Run 2026-08-21. Read-only pass. Ground truth: `docs/property/house_positions.md` §5, §5.B, §1.Q,
§26.14 as patched 2026-08-21 eve; per-page briefs in `briefs/property/wave12/`;
`briefs/property/wave12/_language_spec.md`; flags F-178 / F-181 / F-186 in
`docs/property/wave12_site_wide_flags.md`. Siblings read for shared arithmetic only:
`sell-house-without-estate-agent` (A3), `can-you-sell-a-house-without-an-estate-agent` (A4),
`cost-of-moving-house-uk` (A9), `online-estate-agents-uk` (A5),
`src/app/cost-of-selling-a-property/page.tsx` (pillar).

## Verdicts

| Surface | Verdict | BLOCKER | ADVISORY |
|---|---|---|---|
| A1 `how-much-do-estate-agents-charge-to-sell-a-house.md` | all_clear | 0 | 4 |
| A2 `cheapest-estate-agent-fees-uk.md` | **must_fix** | 2 | 3 |
| A7 `average-london-estate-agent-fees.md` | **must_fix** | 1 | 2 |
| CALC `src/lib/calculators/tools/cost-of-selling-calculator.ts` | **must_fix** | 1 | 5 |
| Cross-surface | **must_fix** | 0 | 3 |

Totals: **4 BLOCKER, 17 ADVISORY.**

---

## 0. THE AFTER-TAX CONVENTION, derived from §5.B, and the re-derivation result

### The convention (derived, not inherited from any brief)

§5.B fixes three things that together determine every after-tax line in this cluster.

1. **s.38(1)(c) with the exhaustive s.38(2) list** makes the SALE commission (and s.38(2)(b)
   advertising to find a buyer, and transfer/conveyance costs) deductible from the gain. Nothing
   else on a completion statement is. s.38(3) bars interest and therefore ERCs.
2. **CG14300 (F-167, verified twice 2026-08-21)**: where the VAT is not available for set-off in
   the vendor's VAT account, "the expense inclusive of VAT is to be allowed". A private seller
   deducts the **GROSS** fee. Every percentage that enters an after-tax conversion must therefore
   be the **inc-VAT** percentage, never the plus-VAT headline.
3. Relief only exists where the gain is **chargeable and not covered by PRR**.

From those, at marginal rate `r` on a chargeable, non-PRR gain:

- Net cost of a fee `F` (stated inc VAT) = `F x (1 - r)`.
- Net value of a fee saving `S` = `S x (1 - r)`.
- **Net loss from a lower sale price `G` = `G x (1 - r)`**, because a lower price reduces the gain
  by the same `G`. This is the limb the briefs kept dropping.

Two corollaries, both do-not-write items:

- **F-181 corollary.** The break-even price gap equals the cash saving at ANY rate: keep `0.76S`,
  lose `0.76G`, so break-even is `G = S`. Tax changes the SIZE OF THE PRIZE, never the price you
  have to match. "The taxable seller has a tighter break-even" is wrong.
- **F-186 corollary.** Never set an after-tax figure against a pre-tax figure in the same
  comparison. Net everything or net nothing, and say which in the sentence.

**The two-sentence statement of the convention (for the wave, per F-186's requested action):**
Net every limb of a comparison on the same basis, using the gross inc-VAT fee as the deductible
amount, so a fee, a fee saving and a sale-price change are each multiplied by `(1 - r)` and the
break-even price gap is unchanged by tax. Apply relief only where the gain is chargeable and not
covered by private residence relief, and say in the sentence which basis you are on.

### Re-derivation to the penny, all four surfaces

Every after-tax figure, percentage-net-of-relief conversion, break-even and worked line was
re-derived from the sourced inputs. **All of them are correct on the convention.** The list below
is the audit trail, not a finding list.

**A1**
- Allowable subtotal `4,260 + 300 = 4,560`; relief `4,560 x 0.24 = 1,094.40` -> "£1,094". OK.
- VAT differential `4,260 - (4,260 / 1.2) = 4,260 - 3,550 = 710`; `710 x 0.24 = 170.40` -> "£170". OK.
- Gross fee is the deduction, stated explicitly. Matches CG14300. OK.
- No percentage-net-of-relief conversion attempted, so F-178 cannot bite here. OK.

**A2**
- Cash saving `4,260 - 1,079 = 3,181`. OK.
- Lost relief `3,181 x 0.24 = 763.44` -> "£763"; real saving `3,181 - 763.44 = 2,417.56` -> "£2,418". OK.
- At 18%: `3,181 x 0.82 = 2,608.42` -> "£2,608". OK.
- After-tax column: `4,260 x 0.76 = 3,237.60` -> £3,238; `2,249 x 0.76 = 1,709.24` -> £1,709;
  `1,079 x 0.76 = 820.04` -> £820; saving `3,238 - 820 = 2,418`. Internally consistent. OK.
- Break-evens: `1,079 / 0.0142 = 75,985` -> "about £76,000"; `2,249 / 0.0142 = 158,380` ->
  "about £158,000"; `1,500 / 0.012 = 125,000`. All pure-cash, no tax claim attached. OK on F-181.
- The F-186 line: `5,000 x 0.76 = 3,800`; `3,800 - 2,418 = 1,382`. **The corrected £1,382 is
  published, not the brief's £2,582, and the £1,200 tax reduction is shown in the same sentence.**
  F-186 is closed on this page.

**A7**
- `553,870 x 1.8% = 9,969.66` -> "about £9,970". OK.
- Relief `9,969.66 x 0.24 = 2,392.72` -> "£2,393"; net `9,970 - 2,393 = 7,577`. OK.
- `1,000,000 x 1.8% = 18,000`; `18,000 x 0.24 = 4,320`; net `13,680`. OK.
- Band rows 300k/500k/750k/1m/1.5m at 1.8% = 5,400 / 9,000 / 13,500 / 18,000 / 27,000. OK.
- VAT and negotiation deltas: `0.3% x 553,870 = 1,661.61` -> "about £1,660"; `0.3% x 1m = 3,000`. OK.
- **The page carries the pound version and never prints 1.14%.** F-178 is closed on this page. The
  safe percentage form, if ever needed, is "1.8% including VAT costs about 1.37% after relief at 24%".

**CALC**
- `293,000 x 1.42% = 4,160.60`; deductible `4,160.60 + 700 + 80 = 4,940.60`; total `5,490.60`;
  share `1.8739%`. Compute + goldens agree (42/42 pass, run 2026-08-21).
- Let path: gain `293,000 - 200,000 - 4,940.60 = 88,059.40`; AEA 3,000; taxable `85,059.40`;
  unused basic band `37,700 - (50,000 - 12,570) = 270`; `270 x 0.18 = 48.60`;
  `84,789.40 x 0.24 = 20,349.46`; tax `20,398.06`; headline `25,888.66`. OK.
- Removals sensitivity `550 x 0.24 = 132`. OK.
- **The printed worked example does not reproduce this. See BLK-C1.**

**Sibling agreement.** A3 publishes £4,260 / £1,079 / £3,181 / £2,608 / £2,418 - identical to A2 and
on the same convention. A4 publishes £4,260 / £3,860 / £2,934 (`3,860 x 0.76 = 2,933.60`) and states
"the price you have to match does not change, because a lower price cuts the tax too", which is the
F-181 rule stated correctly. A9 and the pillar carry no after-tax fee conversion. **No page in the
wave publishes 1.14% or £2,582** (grepped across all of `content/blog/`, the pillar and the tool).
The convention holds estate-wide.

---

## 1. A1 `how-much-do-estate-agents-charge-to-sell-a-house.md` - all_clear

Meta 48 / 147. FAQs 14 (band 10-14). H2 9, 8 question-shaped. Em/en-dash 0. Hard statute in prose 0.
All 13 internal links resolve on disk; all 4 external links carry `rel="nofollow noopener"`.
Market figures re-verified live 2026-08-21: HOA 1.42% inc VAT / sole agency 1.2-1.8% / multi-agency
3-3.6% / range 0.9-3.6% / target 1.2% (spot-fetched, all confirmed verbatim); Which? "roughly 1.3%,
including VAT" from Rightmove 2025, range "less than 1% to as much as 3.5%", updated 08 Jun 2026
(spot-fetched, confirmed); MSE 0.75-3% plus VAT with the £2,700-£10,800 conversion (per brief).
F-183 handled correctly: the disagreement is stated on the average only and the range is given once.
§26.14 items all correct: £1,000 penalty, both approved sales schemes, no commission cap, s.18 duty
and the s.18(5)/(6) remedy in plain words, prescribed 1991 wording quoted verbatim against the brief.
§5.B items all correct: exhaustive list, direction-specific advertising limb ("advertising to find a
buyer"), removals/storage/cleaning/redemption/ERC out, interest ruled out, gross-VAT deduction, and
the exchange-versus-completion two-date trap stated the right way round.

### ADV-A1-1 (ADVISORY) - the CG15250 quotation is truncated inside quotation marks, and the omitted clause is load-bearing

**Quoted, body line 147:**
> HMRC's <a ...>capital gains manual</a> puts it in terms: "The definition is exhaustive. No other expenditure is allowable."

**And FAQ line 41:**
> "HMRC's capital gains manual puts it plainly: the definition is exhaustive, and no other expenditure is allowable."

**Why.** CG15250 (re-fetched 2026-08-21) reads: **"The definition is exhaustive. No other expenditure
is allowable unless specifically provided for by TCGA92"**. The dropped clause is the carve-out that
preserves s.38(1)(b) enhancement expenditure. Quoting a truncated sentence inside quotation marks on
the page whose entire differentiator is the exhaustiveness point invites the inference that
improvement spend is also barred, which is wrong and is the opposite of what the calculator tells the
same reader ("add what you paid to buy the property and anything you spent improving it").
Governing source: §5.B ("exhaustiveness per CG15250") plus the manual text itself.

**Drop-in fix, line 147:** replace the quoted sentence with
`"The definition is exhaustive. No other expenditure is allowable unless specifically provided for by the capital gains legislation."`
and add one clause to the following paragraph: `Money you spent genuinely improving the property is dealt with separately and is not caught by this list.`
**FAQ line 41:** drop the quotation framing, to `the definition is exhaustive and nothing outside it is an incidental cost of selling`.

### ADV-A1-2 (ADVISORY) - "roughly £660 below the market central figure" holds only against the top of the stated central band

**Quoted, line 139:**
> On a £300,000 sale that is £3,600, roughly £660 below the market central figure.

**Why.** The page's own stated central figure is a band, "1.3% to 1.42% including VAT", i.e. £3,900
to £4,260. £3,600 is £660 below £4,260 and £300 below £3,900. Naming a single delta against an
explicitly two-ended central estimate is not derivable from the page's own framing. Compare the
pillar, which anchors it correctly ("moving from 1.42% to 1.2% keeps about £640 in your pocket"), and
A9 ("1.42% is £4,164 and 1.2% is £3,519, so the negotiation is worth £645").

**Drop-in fix:** `On a £300,000 sale that is £3,600, which is £300 to £660 below the 1.3% to 1.42% central band, and £660 below the 1.42% average.`

### ADV-A1-3 (ADVISORY, shared with A2 and A7) - hard rule 13 / the CGT freeze

See §5 below. A1 carries two tax H2s (the s.38 sort and a 60-day section) where hard rule 13 asks for
one block. Recorded as a deliberate call in the page's own work log. Conductor ruling needed, not a
writer defect.

### ADV-A1-4 (ADVISORY, low) - the illustrative removals line disagrees with the calculator's default

A1 line 162 prices removals at £900; the calculator defaults to £550 and the pillar to "about £550".
Both are labelled illustrative, but a reader moving from the page to the tool sees the same line item
change by 64%. Suggest aligning A1 to £550, or sourcing both from HOA's published removals table
(see ADV-C2).

---

## 2. A2 `cheapest-estate-agent-fees-uk.md` - must_fix (2 BLOCKER)

Meta 54 / 138. FAQs 14. H2 9, 7 question-shaped. Em/en-dash 0. Hard statute in prose 0. All 11
internal links resolve. F-186 corrected on the page (£1,382 published). §26.14 handled well,
including the gov.uk-is-wrong note on the £1,000 penalty and the "no licence" correction.

### BLK-A2-1 (BLOCKER) - the compulsory £80 identity check is added to one fee row and silently dropped from the other

**Quoted, table lines 78-79:**
> | Fixed fee paid at completion | £2,249, being £150 upfront and £2,099 on completion | The £150 |
> | Fixed fee paid upfront | £1,079, being £999 plus an £80 identity check | The whole £1,079 |

**Why.** Purplebricks' own packages page (spot-fetched 2026-08-21) lists the £80 anti-money-laundering
fee as excluded from the advertised price on **both** packages, not only the upfront one. The page
therefore compares a total-cost figure against a headline figure, which is exactly what its own rule
in the next section forbids: *"Ask for one number: the total in pounds, including VAT and every item
you cannot decline"* (line 130), and exactly the inconsistent-basis defect F-186 was raised about.
Governing source: the named source itself, plus §26.14's DMCCA s.230(2)(b) total-price point the page
relies on at line 124.

**The dependent figures that move.** With the completion package correctly at **£2,329**:
- table cell -> `£2,329, being £150 upfront, £2,099 on completion and an £80 identity check`
- "what you pay if you never sell" cell -> `£230, the £150 plus the £80 identity check`
- after-tax table line 153 -> `£2,329 | £1,770` (`2,329 x 0.76 = 1,770.04`)
- break-even line 92 and FAQ line 25 -> `£2,329 divided by 0.0142 is about £164,000`
- bullet line 66 -> `£150 upfront then £2,099 at completion, plus the same £80 identity check`
The £3,181 / £2,418 / £2,608 / £76,000 figures are unaffected.

**Alternative fix if preferred:** strip the £80 from both rows, price the upfront package at £999,
and state the £80 once as an add-on that applies to every package. Either is defensible; the current
half-and-half is not.

### BLK-A2-2 (BLOCKER) - the Purplebricks prices are tiered by property value, and the page applies the entry tier to a £300,000 sale without the condition

**Quoted, line 50 and table heading:**
> On a £300,000 sale, the average percentage fee of 1.42% including VAT costs you £4,260, where a £999 fixed fee costs you £999.
> | Fee model | **What it costs you on a £300,000 sale** | ... |

**Why.** The Purplebricks packages page (spot-fetched 2026-08-21) presents its prices behind a
property-value tier selector, and only the **"Less than £200k"** tier's prices were rendered to the
fetching client. The page's own other cited source says so too: FAQ line 23 prints *"The lowest
advertised fixed fees run from £129 to £1,599"*, and the brief records MSE listing **"Purplebricks
£999 to £1,599"** - a range the body never applies. So the page's central comparison, its at-a-glance
bullet, its break-even and its whole after-tax table run a £300,000 sale on a price that the page's
own sources attach a property-value condition to, and that condition is never stated.

If the £201k-£300k tier is a different number, the headline £3,181 and £2,418 both move. At the
£1,599 top of MSE's band the saving would be £2,661 cash and £2,022 after tax.

**Drop-in fix (safe either way, no re-fetch needed):** line 84, replace
`The fixed-fee prices are Purplebricks' own published package prices as at 21 August 2026, and the percentage is the HomeOwners Alliance average.`
with
`The fixed-fee prices are Purplebricks' own published package prices as at 21 August 2026, taken from its entry price tier. Purplebricks prices by property value, and MoneySavingExpert lists its range as £999 to £1,599, so check the price shown for your own value band before you use these figures.`
**Better fix:** manually confirm the £201k-£300k tier prices on the packages page and restate the
table at the tier that matches the £300,000 worked sale.

### ADV-A2-1 (ADVISORY) - two different Which? guides are merged into one

**Quoted, line 58:**
> Which? puts the flat-fee band at £300 to £1,500 and the average nearer 1.3% including VAT, using Rightmove data, in a guide updated 8 June 2026.

**Why.** The 1.3% figure is from Which?'s "Estate agent fees and contracts" guide; the £300 to £1,500
flat-fee band is from its separate "Online estate agents: how do they work?" guide. The brief records
them as two URLs. "a guide" implies one source for both.

**Drop-in fix:** `Which? puts the average nearer 1.3% including VAT using Rightmove data, and in its separate guide to online agents puts the flat-fee band at £300 to £1,500. Both were updated on 8 June 2026.`

### ADV-A2-2 (ADVISORY, shared) - hard rule 13. See §5.

### ADV-A2-3 (ADVISORY, cross-surface) - A5 prices the same comparison differently. See §5.

---

## 3. A7 `average-london-estate-agent-fees.md` - must_fix (1 BLOCKER)

Meta 50 / 151. FAQs 12. H2 9, all 9 question-shaped. Em/en-dash 0. Hard statute in prose 0. All 14
internal links resolve; both external links carry `rel="nofollow noopener"`. Correctly does NOT link
`/calculators/capital-gains-tax-calculator` per its brief. F-178 closed: the page publishes the pound
version and never 1.14%. Source figures re-verified live 2026-08-21: Propelr "1.5% plus VAT" =
"1.8% of the sale price", updated 18 March 2026 (confirmed verbatim); Propelr's £500,000 example of
"around £9,000" matches the page's own £500,000 row. HM Land Registry England June 2026 confirmed at
£293,000 in the gov.uk release (the brief's unrounded £293,262 is the UKHPI app figure). The London
£553,870 could not be directly re-fetched (the UKHPI app is JS-rendered) but is consistent with the
same release's statement that "In London, average house prices decreased by 2.5% in the 12 months to
June 2026". Attribution on-page is correct and dated.

### BLK-A7-1 (BLOCKER) - the borough percentages are printed on the wrong VAT basis, three times, on a page whose every other percentage is inc VAT

**Quoted, three places:**
> (line 85, table) Kensington and Chelsea 1.2% to 1.5%, Barking and Dagenham 1.5% to 2.0%, on one published guide's March 2026 figures
> (line 37, FAQ 9) Kensington and Chelsea is quoted at 1.2% to 1.5% while Barking and Dagenham is quoted at 1.5% to 2.0%
> (line 25, FAQ 3) In prime central boroughs the quoted range is nearer 1.2% to 1.5%, while outer boroughs are quoted nearer 1.5% to 2.0%

**Why.** Propelr publishes those bands as **plus VAT**, and its own cash conversions prove it beyond
argument (spot-fetched 2026-08-21): Kensington and Chelsea, average value £1,300,000, fees
"1.2% - 1.5% + VAT", "£18,720 - £23,400" including VAT - which is exactly **1.44% to 1.8%** of
£1,300,000. Barking and Dagenham, average value £320,000, fees "1.5% - 2.0% + VAT",
"£5,760 - £7,680" - exactly **1.8% to 2.4%** of £320,000.

Three consequences, and the third is the reason this is a BLOCKER rather than an advisory:
1. The page's stated London norm is **1.8% including VAT**. Printing bare borough percentages
   alongside it makes prime central read as 1.2%-1.5% inc VAT, understating it by 20% and making the
   prime discount look a third larger than it is.
2. §5.B / CG14300 makes the inc-VAT basis load-bearing on this exact page, because the after-tax
   block deducts the gross fee. A plus-VAT figure sitting unlabelled inside an otherwise inc-VAT page
   is the F-178 error in a different clothing.
3. **It breaks the page's own argument.** Line 25 offers the borough spread as evidence that outer
   boroughs run higher than prime. On the true basis outer London is **1.8% to 2.4% inc VAT**, i.e.
   at or above the page's own 1.8% London norm, not "nearer 1.5% to 2.0%" against it. The page also
   already knows the right number: line 111 says "If you have been quoted 2.4% in an outer borough,
   that is not unlawful", which is 2.0% plus VAT and is unreachable from the figures printed above it.

The A7 brief §S2.2 recorded the borough figures without the "+ VAT" qualifier, so this is inherited
brief drift, not a writer invention. **Raise it as a new flag in the F-178 family.**

**Drop-in fixes.**
- line 85 (table cell): `Kensington and Chelsea 1.2% to 1.5% plus VAT, which is 1.44% to 1.8% including VAT, against Barking and Dagenham at 1.5% to 2.0% plus VAT, or 1.8% to 2.4% including VAT, on one published guide's March 2026 figures`
- line 37 (FAQ 9): `Kensington and Chelsea is quoted at 1.2% to 1.5% plus VAT, which is 1.44% to 1.8% once VAT is added, while Barking and Dagenham is quoted at 1.5% to 2.0% plus VAT, or 1.8% to 2.4% including it.`
- line 25 (FAQ 3): `In prime central boroughs the quoted range is nearer 1.44% to 1.8% including VAT, while outer boroughs are quoted nearer 1.8% to 2.4% including VAT, on one published guide's figures from March 2026. So the outer-borough quote sits at or above the London norm, and the prime central one below it.`

### ADV-A7-1 (ADVISORY) - "a little higher" understates a 27% gap, and the like-for-like national number from the same source is unused

**Quoted, FAQ 1 line 21:**
> The nearest national comparison is 1.42% including VAT, published by the HomeOwners Alliance, so London runs a little higher in percentage terms on that comparison and a lot higher in pounds.

**Why.** 1.8% against 1.42% is a 27% premium in percentage terms, which is not "a little". Propelr,
the page's own source for the 1.8%, publishes its own national comparison of "1.2% plus VAT (1.44%
including VAT)", which is the like-for-like figure from the same methodology and gives a 25% premium.
The HOA 1.42% is correctly attributed and correctly described as a sole-agency average (HOA's own
at-a-glance reads "Average sole-agency high street fee is 1.42% incl. VAT"), so the attribution is
sound; only the characterisation is soft.

**Drop-in fix:** `The nearest national comparison is 1.42% including VAT, published by the HomeOwners Alliance, so London runs about a quarter higher in percentage terms and far higher in pounds.`

### ADV-A7-2 (ADVISORY, shared) - hard rule 13. See §5. A7's own brief is the most explicit in the wave
("Freeze adjacency: no CGT rate table, no AEA explainer, no PRR mechanics, no 60-day walkthrough.
Hook paragraph plus one worked line is the ceiling"), and the page carries a tax H2 with a two-row
after-tax table plus a separate 60-day H2 that names the £3,000 annual exempt amount and links to the
armed AEA page. Recorded as deliberate calls (c) and (d) in the work log.

---

## 4. CALC `src/lib/calculators/tools/cost-of-selling-calculator.ts` - must_fix (1 BLOCKER)

Meta 50 / 150. Goldens run 2026-08-21: **42 passed, 0 failed**, so compute agrees with its goldens.
No hard statute in any user-facing string (citations live in comments; the goldens assert this). All
6 `related` hrefs resolve: `lbtt-calculator-scotland`, `ltt-calculator-wales` and
`capital-gains-tax-calculator` are registered slugs; the three blog targets exist on disk and
`epc-certificate-cost-uk` matches its `landlord-tax-essentials` category route. The s.38 split is
implemented correctly: removals never touch `deductible`, advertising does, and the golden isolates
both. `computeCgt` is the shared engine, so the chain to `capital-gains-tax-calculator` cannot drift.

### BLK-C1 (BLOCKER) - the printed worked example does not add up, and it disagrees with the tool's own output row

**Quoted, `workedExamples[0].steps`, lines 271 and 274:**
> "Estate agent fee = £293,000 x 1.42% = £4,160",
> "Costs that would come off a capital gain = £4,160 + £700 + £80 = £4,941",

**Why.** Two defects in the same two lines.
1. **£4,160 + £700 + £80 = £4,940, not £4,941.** The £4,941 is right (it comes from the unrounded
   £4,160.60), but the addition as printed is visibly wrong to any reader who checks it, on the one
   surface in this cluster whose entire promise is that the reader can check the arithmetic.
2. **£4,160 contradicts the tool's own output.** `293,000 x 1.42% = 4,160.60`, which `gbp()` renders
   as **£4,161**, and the golden pins it: `expect(cosRow(result, "Estate agent fee at 1.42% including VAT")).toBe("£4,161")`.
   A reader running the default inputs sees £4,161 in the results table and £4,160 in the worked
   example directly below it.

Governing rule: the QA gate "calculator compute agrees with its goldens and its landing copy's claims
agree with the compute". The goldens pass; the landing copy does not agree with them.

**Drop-in fix, both steps:**
```
"Estate agent fee = £293,000 x 1.42% = £4,161",
"Costs that would come off a capital gain = £4,161 + £700 + £80 = £4,941",
```
`workedExamples[1]` needs no change: its "£4,941 deductible" and every figure downstream of it are
already correct.

### ADV-C1 (ADVISORY) - the explainer and two FAQs print "about £4,160" where the tool renders £4,161

`explainer.paragraphs[0]` ("your agent bill is about £4,160"), FAQ "How much does it cost to sell a
house in the UK?" ("an estate agent at about £4,160") and FAQ "How much are estate agent fees?"
("1.42% is about £4,160"). Each is hedged with "about", so none is wrong, but three appearances of a
number one pound below the tool's own output reads as a defect. **Fix:** change all three to
"about £4,161", or to "about £4,160" only if BLK-C1's worked example is also expressed with "about"
rather than "=". The pillar (`src/app/cost-of-selling-a-property/page.tsx:93`) prints the same
"£4,160" and should move with it.

### ADV-C2 (ADVISORY) - the removals default is the only unattributed market figure on the tool

**Quoted, field help and `sourcesNote`:**
> "£550 is one published estimate rather than a market range, so treat it as a placeholder until you have a quote."
> "Removals start at £550, which is one published estimate rather than a market range."

**Why.** Every other default names its source (HOA for the fee and the conveyancing, our own EPC page
for the £80). "One published estimate" names nobody, which fails the wave gate that every market
figure traces to a named dated source and is stated with attribution. It is also the one figure a
reader is most likely to challenge.

**Drop-in fix (uses the source the tool already relies on):** HOA's cost-of-selling guide publishes a
removals table, spot-fetched 2026-08-21: £334 for a one-bedroom move of 0 to 20 miles, £731 for three
bedrooms over the same distance, £2,243 for five bedrooms over 100 miles. Restate as
`"The HomeOwners Alliance publishes £334 for a one-bedroom local move and £731 for a three-bedroom one, so £550 sits between them. Distance, volume and packing move it a long way."`
and the `sourcesNote` as
`"Removals start at £550, between the HomeOwners Alliance figures of £334 for a one-bedroom local move and £731 for a three-bedroom one."`

### ADV-C3 (ADVISORY) - the EPC is treated as flatly deductible, where §5.B does not name it and the corpus's own authority page hedges it

**Quoted, `compute` comment + `explainer.paragraphs[2]` + FAQ:**
> // ... advertising to find a buyer (s.38(2)(b)) and the EPC are in
> "The agent fee comes off, and so do the sale conveyancing, the EPC and any advertising you paid for yourself."
> "Your agent's commission, your conveyancing on the sale, any advertising you paid for to find a buyer, and the EPC you needed before you could market the house."

**Why.** §5.B's s.38(2) list is exhaustive and names six professions (surveyor, valuer, auctioneer,
accountant, agent, legal adviser), transfer or conveyance costs, advertising to find a buyer, and
valuation or apportionment costs for the computation. A domestic energy assessor is none of the six,
and the EPC is a statutory precondition of marketing rather than advertising itself. The site's own
authority page on this, `epc-certificate-cost-uk`, states the position with visible hedging:
*"Usually yes, as part of the costs of advertising to find a buyer"* and *"which is the limb the fee
normally belongs under"*. **A1 and the pillar both omit the EPC from their allowable lists
altogether**, while the calculator and A9 include it flatly. So the corpus carries three positions on
one line item, and the tool carries the strongest of the three.

This is not a lock breach (§5.B is silent on the EPC and the corpus position pre-exists), so it is
ADVISORY rather than BLOCKER, but the tool prints a hard deductible subtotal the reader is told to
carry into a CGT return.

**Drop-in fix, minimum:** hedge the FAQ and explainer to the corpus wording,
`"and the EPC you had to buy before you could market the house, which normally goes in as part of the cost of advertising for a buyer"`.
**Better:** add one line to §5.B settling the EPC for the whole corpus, and align A1 and the pillar to
whichever way it goes.

### ADV-C4 (ADVISORY) - 8 FAQs against the wave's 10-14 gate

Every blog page in this wave reports FAQ count against a stated 10-14 band. The tool carries 8, and
neither `_language_spec.md`'s calculator-landing row nor the goldens set a band for calculators.
**Fix:** conductor to confirm calculators are out of scope for the FAQ gate, or add two (natural
candidates from the SERP: "Do I pay estate agent fees if the sale falls through?" and "Is the
conveyancing fee different for a leasehold sale?").

### ADV-C5 (ADVISORY) - the tool assumes the £3,000 annual exempt amount is unused, and does not say so

`computeCgt({ ..., aeaUsed: false })` is hardcoded. The note discloses "It assumes no relief applies"
but not the AEA assumption, and a reader who has already used the allowance on another disposal gets
a tax figure £540 to £720 too low. **Fix:** append to the let-path note,
`It also assumes you have not already used your £3,000 allowance on another sale this tax year.`

### Not findings, checked and clear
- `conveyancing: 700` attributed to HOA - **confirmed**: HOA's own cost-of-selling breakdown shows
  "estate agents at £4,118, conveyancing at £700, and EPC at £60, totaling £4,878".
- `epc: 80` as "the middle of the £35 to £120 range on our own EPC cost page" - internally sourced,
  midpoint £77.50, "£80 sits in the middle" is fair.
- Zero/negative proofing, band boundary, AEA sentinel and loss cases all covered by goldens.
- `ponytail:` comment on the absent region select correctly names the ceiling and the upgrade path.

---

## 5. Cross-surface findings

### XS-1 (ADVISORY) - hard rule 13 / the CGT freeze is exceeded on three of four surfaces, each as a separately recorded deliberate deviation

`_language_spec.md` hard rule 13: *"The CGT block is one block, plain words, one pound figure, one
link out. No rate table, no annual exempt amount explainer, no PRR mechanics, no 60-day filing
walkthrough."* §3 restates it: *"After the reader's cost question is fully answered and before the
CTA. One block."*

- **A1** carries two tax H2s: the completion-statement sort (with a three-column table) and "When is
  the tax due, and why does your completion statement start a clock?" (60 days from completion,
  exchange fixes the year, plus a link to the deadlines page), and six links out. Work log entry:
  "Kept both H2 8 and H2 9".
- **A2** carries two adjacent tax H2s plus an after-tax table naming both 18% and 24%. Work log
  entry: "CGT hook sized to two adjacent blocks, not one".
- **A7** carries a tax H2 with a two-row after-tax table plus a separate 60-day H2 that names the
  £3,000 annual exempt amount and links to the armed AEA page, against its own brief's explicit
  "no AEA explainer, no 60-day walkthrough". Work log entries (c) and (d).
- **CALC** computes CGT by design and its explainer walks 18% / 24% / the £3,000 allowance; the
  calculator-landing row of the register sets no CGT ceiling.

No page restates PRR mechanics, and no page carries a rate table, so the sharpest edge of the freeze
holds. But four surfaces resolved the same collision four times, which is the F-180 / F-182 / F-184
pattern again. **Requested action:** one conductor ruling for the wave, in the same form as those
flags. Suggested: the s.38 deductibility sort is CONTENT the cluster owns and may have its own block;
the 60-day / exchange-versus-completion material is cgt1's and gets at most one sentence with a link,
never its own H2. On that ruling A1 and A7 each lose one H2 and nothing else changes.

### XS-2 (ADVISORY) - A5 and A2 price the same comparison £119 apart, for the same reason as BLK-A2-1

`online-estate-agents-uk.md:50` and `:153`: *"The fee is often £999 ... So the saving is real, and on
that sale it is roughly £3,300"* (`4,260 - 999 = 3,261`). A2 prices the identical Purplebricks
package at £1,079 including the compulsory £80 identity check and publishes £3,181. The pillar
(`page.tsx:113`) sides with A5: *"A fixed fee of £999 against 1.42% commission on a £293,000 sale is a
gap of about £3,160."* Whichever way BLK-A2-1 is resolved, resolve A5 and the pillar the same way in
the same commit, or the wave ships three numbers for one comparison.

### XS-3 (ADVISORY) - A3 and A4 disagree on what a private sale costs, and both feed the same after-tax convention

Outside my four surfaces but inside the shared-arithmetic check. `sell-house-without-estate-agent.md`
prices the do-it-yourself route at **£1,079** ("Mid range listing package £999 plus certificate £80")
and publishes a £3,181 saving. `can-you-sell-a-house-without-an-estate-agent.md` prices the same route
at **£0 to £400** (MSE, July 2026) and publishes a £3,860 saving. Both are internally consistent and
both apply the convention correctly (`3,181 x 0.76 = 2,418`; `3,860 x 0.76 = 2,934`), but they are
answering the same question with a £679 gap and neither acknowledges the other. This is the residue of
F-181, which corrected A4 and left A3 on the brief's original figure. **Requested action:** conductor
to pick one private-sale cost basis for the wave and back-patch the loser.

---

## 6. Checks run and passed with nothing to report

- **Meta lengths.** A1 48/147, A2 54/138, A7 50/151, CALC 50/150. All inside 60/155.
- **FAQ counts.** A1 14, A2 14, A7 12. All inside 10-14. (CALC 8, see ADV-C4.)
- **Em-dashes and en-dashes.** Zero on all four surfaces; the calculator golden enforces it.
- **Hard statute in prose.** Zero on all four. The calculator's citations are in source comments only
  and the golden asserts they never reach a user-facing string.
- **Internal links.** 13 + 11 + 14 blog links and 6 calculator `related` links, all resolved against
  `content/blog/`, `src/app/` and `src/lib/calculators/registry.ts`. Middleware category entries
  present for all three pages at `src/middleware.ts:23-28`.
- **External links.** 4 on A1, 2 on A7, 0 on A2; all carry `rel="nofollow noopener" target="_blank"`.
  HOA, Which?, Propelr, Purplebricks and CG15250 spot-fetched live and returned 200 on-topic.
- **§26.14 locked figures.** £1,000 non-membership penalty on all three pages; A2 carries the
  gov.uk-is-wrong correction in full including the no-licence point; the two approved sales schemes
  named correctly with the Property Redress rebrand trap handled; no commission cap asserted
  anywhere; CPUTR never cited as live; DMCCA correctly dated to 6 April 2025; SI 2014/2359 appears
  nowhere; the prescribed 1991 wording for sole selling rights, sole agency and ready, willing and
  able is quoted verbatim against the brief's captures.
- **§5.B locked positions.** Exhaustive list stated on all four; direction-specific advertising limb
  ("to find a buyer") correct everywhere; removals, storage, cleaning, cosmetic spend, mortgage
  redemption and ERCs excluded on all four; s.38(3) interest bar stated on A1, A7 and CALC; the
  gross-inc-VAT deduction stated on all four; exchange-versus-completion stated correctly on A1 and
  A7 and nowhere stated backwards. No page writes "you can deduct removal costs" or "the 60-day clock
  runs from exchange".
- **§5 locked figures.** 18% / 24% residential rates, £3,000 AEA, 60 days from completion, and
  60-day filing only where tax is due for a UK resident. All correct on every surface that states
  them; `src/lib/cgt.ts` carries 3,000 / 12,570 / 37,700 / 0.18 / 0.24 and the goldens sentinel the
  AEA against a stale £6,000 or £12,300.
- **§1.Q.** Not engaged by any of these four surfaces (part-exchange is A12's). No page asserts a
  seller-side SDLT relief.
- **F-178 and F-186 containment.** Neither "1.14%" nor "£2,582" appears anywhere in
  `Property/web/content/blog/`, the pillar or the tool.
- **Goldens.** `npx vitest run src/tests/calculator-goldens.test.ts -t "cost-of-selling"` -
  42 passed, 0 failed, 2026-08-21.
