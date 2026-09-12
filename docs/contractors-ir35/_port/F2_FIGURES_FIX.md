# F2: wrong and contradictory published figures, contractors-ir35 (outside `content/resources/`)

Package F2. Scope: wrong facts and arithmetic in published figures, everywhere in
`contractors-ir35/web/` **except** `content/resources/` (owned by another agent) and
`packages/web-shared/` (report only). No restructuring, no re-voicing.

**Authority used for every recompute:** `src/lib/calculators/tax2026.ts`, executed
(`tsx`), not read. The scratch harness imported the real exported functions
(`limitedTakeHome`, `umbrellaTakeHome`, `personalTax`, `corporationTax`) so every
figure below is what the site's own library actually produces. Harness deleted.

**Ledger treated as a hypothesis.** `P0C1_CLAIMS_LEDGER.md` listed 20 in-scope figure
rows for this package. 29 changes were made across 13 files; 9 defects were found that
the ledger does not list.

---

## The saving-quantity question (brief item 1), settled

The brief said only "a few thousand" matched the compute library. The coordinator's
mid-task correction said the £1,900-£2,000 instances are VERIFIED against the
`public/` workbook. **Both the library and the workbook are right and they agree
exactly.** The ledger's recompute was run at £0 expenses; the workbook's default
scenario charges £6,000.

Reproducing the workbook's default scenario (£500/day x 240 days = £120,000, salary
£12,570, expenses £6,000, umbrella margin £1,200) through `tax2026.ts`:

| | library | P0-C3 hand-recompute of the workbook |
|---|---|---|
| outside net | £71,820.95 | £71,821 |
| inside/umbrella net | £69,889.87 | £69,890 |
| **gap** | **£1,931.08** | **£1,931** |

So `£1,900-£2,000` is correct **for that scenario** and nothing was converged onto
"a few thousand" on the brief's say-so. Sweeping the library across day rates
(£250-£1,200 at 220 days, salary £6,708 or £12,570, £1,500 margin, no expenses) the
gap runs **£1,712 to £5,847**. "£10k+" and "£5,000-£15,000" are unreachable at every
point on that surface and are the two wrong values.

**The one expression now published everywhere in scope:** the model's own scenario
figure (around £1,900 to £2,000 at £500 a day over 240 days, with its assumptions
named) plus the library's honest spread (a few thousand pounds a year across most
day rates). That is consistent with, and does not contradict, the two
`content/resources/` instances this package cannot edit.

One correction to a related claim: `faq.ts` said the gap "widens as rates rise". The
library says the opposite above about £600/day (£5,577 at £600, £2,278 at £1,000,
£1,766 at £1,200), because dividends above the higher-rate threshold carry 35.75% on
top of corporation tax while PAYE flattens to 2% employee NIC. Corrected.

---

## Changes made

| file:line | before | after | what settles it | how found |
|---|---|---|---|---|
| `src/app/page.tsx:37` | hero stat `£10k+`, "Typical annual saving outside IR35 vs umbrella" | `~£2k`, "Modelled annual saving outside IR35 vs umbrella at £500 a day" | library + workbook agree at £1,931.08 on the model's default scenario; library max gap anywhere on the rate curve is £5,847 | ledger row 20; `grep -n "£10k+"` |
| `src/app/page.tsx:143` (FAQPage JSON-LD, `buildFaqJsonLd`) | "tax savings versus umbrella are significant, typically £5,000-£15,000 a year" | "around £1,900 to £2,000 a year at £500 a day over 240 days (£6,000 of company expenses, a £1,200 umbrella margin), and a few thousand pounds a year across most contractor day rates, before accountancy fees" | same | ledger row 21; traced `faqs` array to `buildFaqJsonLd` at `page.tsx:156` |
| `src/lib/support/faq.ts:46` | "a few thousand pounds a year, and it widens as rates rise" | same quantity, now with the scenario figure, and "narrows rather than widens at the highest rates" | library rate sweep: gap falls from £5,577 at £600/day to £1,766 at £1,200/day | sweep, not in ledger |
| `src/lib/support/faq.ts:70` | "lower earnings limit of GBP6,396" | "GBP6,708 ... employer NIC of GBP256 on the GBP1,708 above the GBP5,000 secondary threshold" | HP §6 LEL £6,708; `employerNI(6708)` = £256.20 | ledger row 5; `grep -rn "6,396"` |
| `src/lib/support/faq.ts:50` | "PGMOL 2023" | "PGMOL 2024" | *PGMOL v HMRC* [2024] UKSC 29, 16 Sep 2024 (HP §2 Citations index) | ledger row 15 |
| `src/lib/support/faq.ts:80` | "For the financial year starting 1 April 2025" | "1 April 2026" | site is a 2026/27 site; FY2026 is the live year (HP §7) | **not in ledger**; read the file in full |
| `content/blog/contractor-day-rate-to-take-home.md:33` (`faqs` -> FAQPage JSON-LD) | outside £64,000-£67,000; inside "roughly £52,000 to £55,000" | outside £57,500-£58,500 (expenses £3,000-£5,000 now stated); inside "about £56,000"; cash gap "only about £1,500 to £2,500" | `limitedTakeHome({turnover:90000,salary:6708,expenses:3000..5000})` = £58,488 / £57,543; `umbrellaTakeHome({90000, margin:0})` = £56,129 | ledger row 25; JSON-LD path is `BlogPostRenderer.tsx:60-61` |
| `content/blog/contractor-day-rate-to-take-home.md:39` (`faqs` -> JSON-LD) | "corporation tax at 19% (profits below £50,000 threshold)"; take-home £52,000-£58,000 | profit "about £65,000 ... in the marginal-relief band above £50,000, so corporation tax is roughly £13,500 (an effective rate of about 20.7%, not the 19% small-profits rate)"; take-home £49,000-£51,500 | profit £65,036; `corporationTax(65036)` = £13,484.54 = 20.7%; net £49,043-£51,404 over £0-£5,000 expenses | ledger row 29 |
| `content/blog/contractor-day-rate-to-take-home.md:45` (`faqs` -> JSON-LD) | £15k pension improves net retained income "by £3,000 to £5,000" | "by about £7,900" | £15,000 as pension vs as profit: CT+dividend leaves £7,084 of it, so pension is £7,916 better (£67,821 total vs £59,904) | **not in ledger**; recomputed every figure in the file |
| `...:54` | "take-home of £67,000 or £52,000" | "£69,000 or £55,000" | £500/day x 220 days outside = £69,349; x180 umbrella (£1,560 margin) = £55,345 | ledger row 28 |
| `...:127` | "range of £62,000 to £67,000" | "£57,500 to £58,500" | as row above (this is the visible-page half of the JSON-LD mismatch; both now identical) | ledger row 26 |
| `...:145` (inside-IR35 body) | "range of £52,000 to £56,000" | "about £56,000" | `umbrellaTakeHome({90000, margin:0})` = £56,129 | ledger row 34 |
| `...:151` (umbrella body) | "range of £50,000 to £54,000" | "£55,300 to £55,700" | margin £15-£30/wk = £780-£1,560: net £55,737 / £55,345 | ledger row 31 |
| `...:168` (table, outside no pension) | "£62,000 to £67,000" | "£57,500 to £58,500" | as above | ledger row 27 |
| `...:169` (table key variables) | "CT 19% on first £50k profit" | "CT in the marginal-relief band, about 21% effective on this profit" | profit £78-83k is above the £50,000 limit; effective rate 20.7-22.0% | **not in ledger**; the row's own arithmetic contradicted the row's figure |
| `...:174` (table, with pension) | cash "£58,000 to £62,000"; "effective total value £73,000 to £77,000" | cash "£50,500 to £51,500"; "total value £65,500 to £66,500" | `limitedTakeHome({90000, 6708, expenses:15000+3000..5000})` = £51,404 / £50,460 cash, +£15,000 | ledger row 33 (+ the cash half, not in ledger) |
| `...:183` (table, umbrella) | "£50,000 to £54,000" | "£55,300 to £55,700" | as above | ledger row 30 |
| `...:189` | "gap ... roughly £20,000 to £25,000" | "roughly £10,000 to £11,000" | £65,500-£66,500 total value minus £55,300-£55,700 umbrella | ledger row 32 |
| `content/blog/director-salary-dividend-split-guide.md:128` | "At the small profits rate of 19% (this company's augmented profits are under £50,000 once the director also draws dividends ...), corporation tax is in the region of £13,877, leaving roughly £59,159" | "That £73,036 sits in the marginal-relief band above £50,000, so the small profits rate does not apply (dividends paid are not deductible and do not reduce augmented profits). Corporation tax is 25% of £73,036 less 3/200 of the £176,964 distance from the £250,000 upper limit, which is £15,605, leaving roughly £57,431" | `corporationTax(73036)` = £15,604.54 | ledger row 35 |
| `content/blog/director-salary-dividend-split-guide.md:66` | "effective rate of about 26.5%" | "effective **marginal** rate" | HP §7; the effective (average) rate never exceeds 25% | ledger row 42 |
| `content/blog/contractor-pension-carry-forward.md:128` | "saving corporation tax of £11,400 (at 19 per cent) up to £15,900 (at 26.5 per cent)" | "cutting the bill from £22,750 to £7,600, a saving of £15,150: most of the £60,000 slice sits in the marginal-relief band above £50,000, and only the last £10,000 comes off at the small-profits rate" | `corporationTax(100000)` = £22,750; `corporationTax(40000)` = £7,600 | **not in ledger**; found by arithmetic grep for 19% next to a five-figure profit |
| `content/blog/contractor-pension-carry-forward.md:158` | "£32,400 attracts dividend tax at 10.75 per cent of £3,483, leaving £28,917" | "attracts dividend tax of £2,078, leaving £30,322", with the PA and dividend allowance named | `personalTax(0, 32400).dividendTax` = £2,077.85 (HP §5 requires the £12,570 PA and £500 allowance first) | ledger row 38 |
| `content/blog/contractor-pension-carry-forward.md:160` | "corporation tax at 19 per cent (£19,000)" and "dividend tax at 10.75 per cent on the £81,000 distributed would be £8,708, leaving £72,292" | "corporation tax of £22,750 (marginal-relief band ... not the 19 per cent small-profits rate)" and "the £77,250 distributed would attract dividend tax of £13,644 (only about £37,200 falls in the basic-rate band at 10.75 per cent; the balance at 35.75 per cent), leaving £63,606" | `corporationTax(100000)` = £22,750; £100,000 - £22,750 = £77,250; `personalTax(0,77250).dividendTax` = £13,644.15 | ledger rows 36, 37 |
| `content/blog/set-up-limited-company-contractor.md:107` | "effective rate of about 26.5%" | "effective **marginal** rate" | HP §7 | **not in ledger**; `grep -rn "effective rate of about 26.5"` returned 6 locations, the ledger listed 3 |
| `content/blog/switching-umbrella-to-limited-company.md:123` | umbrella employer NIC on £120,000 "approx. £17,250" | "approx. £14,900 (15% of the grossed-up salary, not of the full assignment rate)" | £17,250 = 15% x (120,000 - 5,000), which ignores the employer-cost circularity; `umbrellaTakeHome({120000}).employerNI` = £14,932 | **not in ledger**; recomputed the table |
| `content/blog/switching-umbrella-to-limited-company.md:134` | "Approx. £22,750 on £100,000 net profit" | "Approx. £26,200 on the £113,036 net profit left after the salary and employer NIC" | the same table's own rows give £120,000 - £6,708 - £256 = £113,036; `corporationTax(113036)` = £26,204 | **not in ledger**; internal contradiction inside one table |
| `src/app/locations/[slug]/data.ts:247` (FAQPage JSON-LD) | "effective rate of about 26.5%" | "effective **marginal** rate" | HP §7 | ledger row 41 |
| `src/lib/calculators/tools/corporation-tax-calculator.ts:77` | "effective rate of about 26.5% on profits in the band" | "effective **marginal** rate ... on each extra pound of profit" | HP §7 | **not in ledger** |
| `src/lib/calculators/premium/configs/corporation-tax-planner.ts:128` | "approximately 26.5% effective rate at the midpoint" | "approximately 26.5% effective marginal rate on each extra pound" | HP §7 | ledger row 40 |
| `src/lib/calculators/premium/configs/corporation-tax-planner.ts:134` | "effective rate that rises from 19% to 25% across the band, with the midpoint at roughly 26.5%, which is higher than the headline 25%" | "effective (average) rate that rises from 19% to 25% ...: at the £150,000 midpoint it is 24.0%, and it never exceeds 25%. What exceeds the headline rate is the effective marginal rate ... roughly 26.5%" | `corporationTax(150000)` = £36,000 = 24.0% | ledger row 39 |
| `src/lib/calculators/premium/configs/salary-dividend-planner.ts:142` | "on £50,000 of dividends in the basic rate band, the difference between 8.75% and 10.75% is around £1,000" | "on £37,200 of dividends in the basic rate band (its full width after the £500 dividend allowance) ... about £744" | `BASIC_RATE_LIMIT` = £37,700, minus the £500 0%-rated allowance = £37,200; x 2% = £744 | ledger row 46 |
| `src/lib/calculators/premium/configs/salary-dividend-planner.ts:143` | "£6,708 ... preserves the qualifying year for State Pension **without triggering employer NIC**" | "for a much smaller employer NIC cost: £256, being 15% of the £1,708 above the £5,000 secondary threshold" | `employerNI(6708)` = £256.20; the same file's own £12,570 branch already says employer NIC arises above £5,000 | **not in ledger** |
| `src/data/contractor-types.ts:379` | taper "reduces the allowance from £60,000 down to £10,000 for those with adjusted income above £260,000" | full test: threshold income > £200,000 **and** adjusted income > £260,000, £1 per £2 above £260,000, £10,000 floor only at £360,000 | HP §11 | ledger row 43 |
| `src/data/contractor-types.ts:565` | "fewer than 50 employees, for financial years beginning on or after 6 April 2025" | "not more than 50 employees, met for two consecutive financial years ..." | HP §1.A | ledger row 44 |
| `src/app/ir35-status/page.tsx:185` | same | same | HP §1.A | ledger row 45 |

## Test suite (brief item 4)

`src/tests/assistant-journey-opener.test.ts`, suite "faqForTopic: house position accuracy
spot-checks". **No existing assertion was weakened, deleted or changed.** Ten assertions
added after the existing block, asserting the VALUE of every locked constant the FAQ set
publishes, in both currency forms the site uses:

- LEL is `GBP6,708` and **not** `6,396` (the exact gap that let the retired LEL sit in a
  green suite)
- primary threshold `GBP12,570`
- employer NIC `15%` above `GBP5,000`; not `13.8%`, not `9,100`
- dividend allowance `GBP500`, additional rate `39.35%`; not `8.75%`, not `33.75%`
- CT year tagged `1 April 2026`, not `1 April 2025`
- the `26.5%` figure phrased as a marginal-pound rate, never "effective rate of about 26.5"
- s.455 not quoting the retired `33.75%`; `GBP10,000` BIK threshold present
- AMAP `10,000` miles and **not** `45p`
- `PGMOL 2024`, not `PGMOL 2023`
- the outside-vs-umbrella gap quoted as the model's own figure, not `£10k+` / `£15,000`

`vitest run`: **419 passed, 0 failed** (was 405 before this package).

**No test was found pinning a stale value.** Checked explicitly: `grep` for `6,396`,
`62,000`, `64,000`, `10k+`, `1,900`, `13,877`, `8,708`, `3,483` across every `*.test.ts`
returns nothing, and every existing assertion stayed green after the source edits. The
prior-site failure mode (four calculators handing a doctor a wrong number with unit tests
pinning the stale values) does **not** reproduce here: `tax2026.test.ts`,
`tools.test.ts` and `premium-tools.test.ts` assert computed outputs of the clean library,
not copied prose figures.

---

## Found and NOT changed

**Out of scope by instruction (`content/resources/`, owned by another agent).** Reported
here so the count is complete. The two outside-vs-umbrella saving instances,
`ir35.md:12` and `structure.md:21`, are **correct** and were the reason this package did
not converge everything onto "a few thousand". Also in those files and still open:
`pay-planning.md:31` LEL `GBP6,396`; `pay-planning.md:28` EA `GBP5,000` and the
`GBP45,000` absorption ceiling; `pay-planning.md:31` and `ir35.md:37` and
`structure.md:38` the universal "optimal salary is £12,570"; `ir35.md:26` and
`structure.md:25` "the fee-payer determines your status"; `ir35.md:20` PGMOL 2023;
`structure.md:28` liability "transfers ... as a last resort"; `structure.md:29` APSCo.
One more, **not in the ledger**: `ir35.md:12` claims "at a higher rate the absolute gap
widens", which the library contradicts above about £600/day.

**Not a figure defect (F2 is facts and arithmetic only).** Left for another package:
- `salary-dividend-planner.ts:135` "so the £12,570 salary is usually preferable" -
  breaches HP §8's "never publish a single universal optimal salary". The **number** is
  defensible (~£583/yr better at £110k turnover); the assertion is the defect. Ledger
  row 11.
- `faq.ts:64` "liability can transfer to the agency or (as a last resort) the end client"
  and "FCSA or APSCo" - HP §12 framing defects, mirroring the `content/resources/` rows.
  Unrendered module, but a live seed. Ledger rows 16-17 pattern.
- `salary-dividend-planner.ts:142` "the additional rate from 39.35% to 39.35% (unchanged
  at additional)" - clumsy, but correct.

**Unsourced-but-not-wrong (HP is silent; owner decision, ledger class 1).** Left alone:
the five accountancy-fee ranges, the two homepage testimonial figures (£14,000, £8,000),
auto-enrolment 3%, the 71p/72p pension line, QIP £1.5m, FRS sector percentages 14.5%/12%,
holiday pay 12.07%, and "two calculators can differ by £8,000 to £12,000".

**Verified correct on recompute, changed nothing:** the `contractor-day-rate-to-take-home`
billable-days FAQ; `corporation-tax-contractor-limited-company.md` (£80,000 -> £17,450 =
21.8%, £90,000 -> £20,100, £30,000 pension saves £7,950); `director-salary-dividend-split`
basic-band dividend of £43,562 at 10.75%; `switching-umbrella-to-limited-company.md:134`'s
"19% applies only up to £50,000" gloss; `outside-ir35-take-home-explained.md:188-221` and
`inside-ir35-take-home-explained.md:119-147` in full; `contractor-day-rate-calculator.ts`'s
own worked example; the mileage, VAT/FRS, carry-forward-taper and Chapter 8 examples; and
every correct statement of the 19%/£50,000 rule (roughly 30 locations) that greps
alongside the misapplications.

## `packages/web-shared/` (report only, not edited)

**Nothing found.** Only two files in the package carry a currency figure at all, and
neither is a contractor tax figure:
- `packages/web-shared/design/guards/first-sentence.ts:72-73` - `£30,000.50` inside a
  sentence-splitting test fixture.
- `packages/web-shared/tools/tools.test.ts:86,93,118-121` - `£1,020`, `£1,234,568`,
  `£999`, `£1,000`, all currency-formatter assertions.

No LEL, no saving claim, no CT rate, no dividend rate, no IR35 figure of any kind. The
18 sites share no tax constant through this package; `contractors-ir35` holds all of its
own in `src/lib/calculators/tax2026.ts`.

---

## Appendix: the gap curve on the workbook's own default assumptions

Requested by the coordinator to close `content/resources/structure.md:32`. Computed
through `tax2026.ts`; assumptions identical to the run that reproduced £1,931.08:
**240 billable days, salary £12,570, £6,000 company expenses charged to the limited
route only, £1,200 umbrella margin.** Gap = limited net take-home minus umbrella net
take-home (the £6,000 of expenses is money spent, so it is not added back).

| day rate | turnover | limited net | umbrella net | **gap** |
|---|---|---|---|---|
| £250 | £60,000 | £41,753.65 | £40,461.30 | **£1,292.36** |
| £350 | £84,000 | £54,820.40 | £52,513.24 | **£2,307.15** |
| £500 | £120,000 | £71,820.95 | £69,889.87 | **£1,931.08** |
| £600 | £144,000 | £81,427.45 | £77,785.97 | **£3,641.47** |

Fuller curve on the same assumptions: £300 £2,666 | £400 £1,948 | £450 £1,589 |
£550 £3,650 | £650 £1,945 | £700 £155 | £800 **-£160** | £1,000 **-£788** |
£1,200 **-£1,251**.

**The curve is not monotonic in either direction.** It rises to £2,666 at £300, falls
to a trough of about £1,370 near £480, rises to a peak of about £3,800 near £570,
then falls steeply and crosses zero at roughly £750 a day. The two turning points are
the £100,000 personal-allowance taper: it hits the **umbrella** route first (its gross
salary crosses £100,000 at about £480/day), which widens the gap, and the **limited**
route second (total income crosses £100,000 at about £570/day), which closes it again.
Above that, corporation tax plus 35.75% on dividends overtakes PAYE flattening to 2%
employee NIC.

**The £5,577 in the earlier sweep did NOT use the default assumptions, and it was not a
low-end figure.** It was the £600/day point of a different sweep: **220 days, salary
£6,708, £0 expenses, £1,500 margin**. The "£1,712 to £5,847" range reported earlier is
the min and max of that sweep, not of the default scenario. On the default assumptions
the range across £250-£1,200 is **-£1,251 to £3,801**. Stating it plainly: the earlier
range figure was computed on non-default assumptions and should not be read as the
workbook's curve.

**The correction it motivated still holds on all three assumption sets.** "The gap
narrows rather than widens at the highest rates" is true on the default assumptions
(£3,641 at £600 to £155 at £700 to negative above ~£750), true at £0 expenses with the
default salary (£5,483 at £600 to £1,479 at £1,200), and true on the original sweep
(£5,577 to £1,766). Nothing published on the strength of it needs revisiting.

**For `content/resources/structure.md` (another agent's file, reported not edited):**
- `:32` "the gap may not cover accountant fees when the day rate is relatively low" is
  **directionally correct at the very bottom** (£1,292 at £250, against accountant fees
  the same file puts at £1,000-£3,000). But it is only true below about £280 a day: at
  £300-£350 the gap is *larger* than at the £500 default, so "low rate = small gap"
  is not a straight line and the trough is near £480, not at the bottom.
- `:21` "At GBP600 or GBP700 per day the raw gap is substantially wider and limited
  company wins clearly" is **false on the workbook's own default assumptions at £700**
  (£155, which no accountant fee covers) and the sign flips negative above about £750.
  Caveat for whoever fixes it: the flip is driven by the scenario charging £6,000 of
  expenses to the limited route and nothing to the umbrella route. At £0 expenses the
  limited route still wins at every rate, by £1,479 to £5,748. The tax curve narrows;
  it is the fixed expense asymmetry that pushes it through zero.
