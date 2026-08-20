# Adversarial factual QA: CGT net-new cluster + calculator copy

Reviewer: adversarial factual QA (Property Tax Partners)
Date: 2026-08-20
Scope: full-page review, all four surfaces are new
Ground truth: `docs/property/house_positions.md` §5 (CGT), §13 (general do-not-write), §17.3/§17.4 (temp non-residence, NRCGT), §18.5/§18.8 (ATED-CGT abolition), §21.A + §21.A.2 (corporation tax three-figure framework)

## Verdicts

| Page | Verdict | BLOCKER | ADVISORY |
|---|---|---|---|
| `do-limited-companies-pay-capital-gains-tax-property.md` | all_clear | 0 | 3 |
| `capital-gains-tax-second-home-sale.md` | all_clear | 0 | 2 |
| `capital-gains-tax-on-shares-uk.md` | **must_fix** | 1 | 4 |
| `capital-gains-tax-calculator.ts` (copy strings) | **must_fix** | 1 | 2 |

Two BLOCKERs total. One is an arithmetic error, one is a penalty-timing error that also puts the calculator in direct conflict with the second-home page.

---

## 1. do-limited-companies-pay-capital-gains-tax-property.md

Verdict: **all_clear** (0 BLOCKER, 3 ADVISORY)

### What was tested and passed

- **CGT vs corporation tax framing.** The page states throughout that companies do not pay CGT and that gains enter the corporation tax computation. Matches §21.A.2 do-not-write ("Companies pay CGT on property disposals" is false).
- **CT rate lock.** 19% small profits rate at augmented profits at or below £50,000; 25% main rate at or above £250,000; marginal relief in between at standard fraction 3/200; effective 26.5% on the slice. All match §21.A exactly. The page also avoids all four §21.A.2 rate-drift patterns ("19% on the first £250,000", "19% under £250,000", "25% over £50,000", "flat 26.5% calculation") and explicitly says at line 81 that 26.5% is "a result rather than an input", with the full formula (U − A) × (N ÷ A) × 3/200 shown. Correct.
- **Associated companies.** Limits divided by (1 + N), five SPVs give £10,000 / £50,000 each. Matches §21.A worked example exactly.
- **CIHC.** The expansive "let commercially" exclusion (connected person, their spouse or civil partner, a relative, a relative's spouse) is reproduced correctly per §21.A s.18N(3) wording, including the 25% at all profit levels consequence.
- **No AEA, no 18/24 for companies.** Stated at lines 65, 122, 207 and in the FAQ. Correct.
- **Worked example re-derived to the penny.** £430,000 − £11,000 − £269,000 = £150,000 gain. Plus £22,000 rent = £172,000 TTP. 25% × £172,000 = £43,000. Marginal relief (£250,000 − £172,000) × (172,000/172,000) × 3/200 = £1,170. CT payable £41,830. **Correct.** Individual comparison £147,000 × 24% = £35,280. **Correct.**
- **60-day return.** Correctly denied for UK companies, with CT600 at 12 months and payment at 9 months + 1 day (31 March 2027 year end gives 1 January 2028 and 31 March 2028). Correct.
- **ATED-CGT.** Line 192 and FAQ both state abolition from 6 April 2019 and explicitly warn off the old 28% rate. Matches §18.5 and satisfies §18.8's first do-not-write.
- **NRCGT.** Cited as TCGA 1992 s.1A (not the stale ss.14B-14H), non-residents report every disposal regardless of tax due, indirect disposals of property-rich entities included, no AEA for a non-resident company. All match §17.4.
- **Dividend extraction.** 10.75% / 35.75% / 39.35% from 6 April 2026 with £500 dividend allowance. Matches the dividend ground-truth lock.
- **§13 general list.** No em-dashes (verified by regex sweep for U+2014 and U+2013: zero hits). No client names, no invented HMRC figures.

### Findings

**ADVISORY 1.** Quoted: *"No. Limited companies pay corporation tax on chargeable gains at 19% to 25% in 2026/27, not CGT."* (metaDescription, line 13)

Why wrong: the stated range understates the top of the actual rate band. Between the £50,000 and £250,000 limits the effective rate on the marginal slice is 26.5%, which is above 25%. The page body gets this right at line 76 and line 81; only the metaDescription compresses it into a range that excludes the marginal band.

Correction: "at 19%, 25% or an effective 26.5% in the marginal band" or simply "at corporation tax rates, not CGT". Source: house positions §21.A (26.5% effective marginal rate row).

**ADVISORY 2.** Quoted: *"Deduct indexation allowance on any element of the base cost incurred before April 2018, running only as far as December 2017."* (line 97; same framing at lines 17, 27, 128, 235)

Why wrong: "before April 2018" is three months too generous as the qualifying-expenditure cut-off. The indexation factor is computed by reference to the December 2017 RPI, so expenditure incurred in January, February or March 2018 attracts nil indexation, not a partial amount. There is no numeric consequence (the mechanism self-corrects to zero), but a reader will expect a January 2018 improvement spend to index and it will not.

Correction: "on base cost incurred up to December 2017". Note the house doc's own parenthetical at §5 reads "(frozen at December 2017 since April 2018)", which describes the freeze taking effect, not the qualifying-expenditure boundary, so the page is not contradicting house positions, only reading the parenthetical too loosely. Source: house positions §5 indexation bullet.

**ADVISORY 3.** Quoted: *"Companies with profits over £1.5 million pay by quarterly instalments instead, which brings tax on a large gain forward significantly."* (line 143, repeated in FAQ line 29)

Why wrong: incomplete in a way that matters specifically for the multi-SPV audience this page targets. The £1.5m quarterly-instalment threshold is itself divided among associated companies, exactly like the £50,000 and £250,000 limits the page correctly warns about two sections earlier. A five-SPV portfolio hits instalments at £300,000 per company, not £1.5m.

Correction: add "divided by the number of associated companies, the same as the small profits limits". Source: consistency with the page's own associated-companies treatment at line 85 and house positions §21.A associated-companies divisor.

---

## 2. capital-gains-tax-second-home-sale.md

Verdict: **all_clear** (0 BLOCKER, 2 ADVISORY)

### Every worked example re-derived to the penny

**Main example (line 85 to 115).**
- £395,000 − £7,600 = £387,400 net proceeds. **Correct.**
- £387,400 − £180,000 − £2,400 − £26,000 = **£179,000 gain. Correct.**
- £179,000 − £3,000 AEA = **£176,000 taxable. Correct.**
- Income £42,000 − £12,570 PA = £29,430. £37,700 − £29,430 = **£8,270 unused basic rate band. Correct.**
- £8,270 × 18% = **£1,488.60. Correct.**
- £176,000 − £8,270 = £167,730 × 24% = **£40,255.20. Correct.**
- Total **£41,743.80. Correct.**
- Effective rate check at line 119: £41,743.80 / £179,000 = 23.32%, page says 23.3%. **Correct**, and it uses the same denominator (the gain, not the taxable gain) as the calculator's `effectiveRate`, so the two surfaces agree.
- £55,000 variant: £55,000 − £12,570 = £42,430 exceeds £37,700, so no band left; £176,000 × 24% = **£42,240. Correct.**

**PRR variant (line 130 to 137).**
- 40 months occupation + final 9 months = 49 of 200 months = **24.5%. Correct**, and there is no double-count because the occupation sits at the start of the period and the 9 months at the end.
- £179,000 × 24.5% = **£43,855. Correct.**
- £179,000 − £43,855 = **£135,145. Correct.**
- − £3,000 = **£132,145. Correct.**
- £8,270 × 18% = £1,488.60; £132,145 − £8,270 = £123,875 × 24% = **£29,730.00. Correct.**
- Total **£31,218.60**; saving £41,743.80 − £31,218.60 = **£10,525.20. Correct.**

**Joint variant (line 148 to 156).**
- £179,000 / 2 = £89,500 each. Higher earner: £89,500 − £3,000 = £86,500; £8,270 × 18% = £1,488.60; £78,230 × 24% = £18,775.20; total **£20,263.80. Correct.**
- Lower earner: £20,000 − £12,570 = £7,430 income; £37,700 − £7,430 = £30,270 band. £30,270 × 18% = £5,448.60; £86,500 − £30,270 = £56,230 × 24% = £13,495.20; total **£18,943.80. Correct.**
- Combined **£39,207.60**; saving **£2,536.20. Correct.**
- Decomposition at line 156: second AEA £3,000 × 24% = £720; extra band £30,270 × 6% = £1,816.20; £720 + £1,816.20 = £2,536.20. **Correct and internally reconciled.**

**Incidental figures.** £26,000 × 24% = £6,240 (line 79) correct. £10,000 net pension contribution grosses to £12,500, band widening × 6% = £750 (line 181) correct. 6 months + 9 months out of 180 months = 8.33%, page says "about 8%" (line 191) correct. £30,000 loss × 24% = £7,200 (line 211) correct. "up to 24 pence in the pound" (FAQ) correct.

### Other checks passed

- 18% / 24%, AEA £3,000, 60-day where tax due, non-residents on every disposal: all match §5 and §17.4.
- PRR final 9 months, s.222 to s.226 citation: matches §5.
- Letting relief restricted to shared occupation since April 2020, with an explicit warning about pre-2020 articles: matches §5 and clears the do-not-write.
- Spouse s.58 no-gain-no-loss, base cost inherited, must complete before exchange, SDLT risk on debt assumed: correct.
- Exchange sets the tax year, completion starts the 60-day clock. Handled consistently in the body (line 182), the FAQ (line 37) and the spousal-transfer condition (line 158). No contradiction anywhere on the page.
- Penalties: £100 fixed, £10/day from day 91, 5% at 6 and 12 months, interest on top (line 168). Matches §5 verbatim.
- "28% is out of date since October 2024" correction at line 207: satisfies the §5 do-not-write rather than breaching it.
- Loss claim window four years from end of the tax year of the loss; current-year losses before AEA, brought-forward losses only down to the AEA. Correct.
- FAQ on a no-income seller: personal allowance cannot be set against gains, full £37,700 band available. Correct.
- s.162 incorporation relief is never mentioned, so the "automatic" do-not-write cannot be breached.
- No em-dashes.

### Findings

**ADVISORY 1.** Quoted: *"The 5% stamp duty surcharge you paid when you bought is a different tax, though it does become an allowable cost here"* (line 61), and *"the SDLT you paid including the surcharge"* (line 72).

Why wrong: stated unconditionally, but the additional dwellings surcharge has only been 5% for transactions on or after 31 October 2024. It was 3% from 1 April 2016 and did not exist at all before that. Most readers selling a second home in 2026/27 bought before October 2024 and paid 3% or nothing. The page's own example makes this concrete and slightly awkward: £2,400 of total SDLT, legal and survey costs on a £180,000 purchase is only arithmetically possible on a pre-2016 purchase with no surcharge, which is consistent with the 200-month ownership in the PRR variant but reads oddly against the flat "5%" claim two sections earlier.

Correction: "the stamp duty surcharge you paid when you bought (5% since 31 October 2024, 3% from April 2016, nil before that)". Source: house positions §1, additional dwellings surcharge key dates.

**ADVISORY 2.** Quoted: *"the SDLT you paid including the surcharge"* (line 72, first use of the abbreviation).

Why wrong: §13 general do-not-write requires abbreviations to be defined at first use. SDLT is used from line 72 onward and only ever partially unpacked at line 217 ("SDLT in England and Northern Ireland"), never expanded to Stamp Duty Land Tax. Same issue on the companies page (line 95).

Correction: "the Stamp Duty Land Tax (SDLT) you paid". Source: house positions §13.

---

## 3. capital-gains-tax-on-shares-uk.md

Verdict: **must_fix** (1 BLOCKER, 4 ADVISORY)

### Findings

**BLOCKER 1.** Quoted: *"If you had £8,000 of unused basic-rate band, the first £8,000 would be taxed at 18% and the remaining £6,800 at 24%, giving £2,872."* (line 76)

Why wrong: the arithmetic is out by £200. £8,000 × 18% = £1,440. £6,800 × 24% = £1,632. £1,440 + £1,632 = **£3,072**, not £2,872. The £200 discrepancy is exactly the dealing costs figure from earlier in the same paragraph, so this looks like the £200 being deducted a second time after it had already reduced the gain to £17,800. Everything else in the paragraph is right: £34,000 − £16,000 − £200 = £17,800; less £3,000 = £14,800; £14,800 × 24% = £3,552 for the all-higher-rate case. The cross-check confirms it, because the 18% band should be worth £8,000 × 6% = £480 against the £3,552 figure, giving £3,072.

Correction: change "£2,872" to "£3,072". Source: house positions §5 rates (18% / 24%), arithmetic re-derived.

**ADVISORY 1.** Quoted: *"**EIS and SEIS deferral.** Subscribing for qualifying Enterprise Investment Scheme shares can defer a gain"* (line 190)

Why wrong: SEIS appears in the bold label but nowhere in the text, and the label mislabels it. SEIS does not offer deferral relief. It offers reinvestment relief, which exempts 50% of a gain reinvested in qualifying SEIS shares, subject to conditions. That is a permanent partial exemption, not a postponement, and the paragraph's whole argument ("it postpones the tax rather than removing it") does not describe SEIS at all. SEIS is also never expanded at first use, which breaches §13.

Correction: either drop SEIS from the label so it reads "EIS deferral", or add a sentence covering Seed Enterprise Investment Scheme (SEIS) reinvestment relief as a 50% exemption rather than a deferral. Source: house positions §13 (abbreviation rule); the deferral-versus-exemption distinction is a substantive relief mechanic.

**ADVISORY 2.** Quoted: *"**Use both allowances in a couple.** Each of you has £3,000. Shares held in one name can be moved into joint names before a sale so that both allowances are in play."* (line 92)

Why wrong: the no-gain-no-loss route is only available between spouses and civil partners living together under TCGA 1992 s.58. "In a couple" reads as covering unmarried partners, for whom moving shares into joint names is a disposal at market value and can itself trigger a charge. The page states the rule correctly later at line 186 ("between spouses and civil partners who live together"), so the bullet is loose rather than contradicted, but it is the version a skim-reader takes away. The second-home page states the unmarried-couple position explicitly at line 160, so this is also a softness relative to its sibling.

Correction: "Use both allowances in a married couple or civil partnership." Source: house positions §5 spouse/civil partner bullet.

**ADVISORY 3.** Quoted: *"If your total gains for the year are within the £3,000 annual exempt amount and you have no losses to claim, there is generally nothing to report on that account."* (FAQ, line 33)

Why wrong: incomplete. The Self Assessment reporting test is not gains alone. A Self Assessment filer must complete the capital gains pages where total disposal proceeds exceed £50,000 in the tax year, even where the gains are inside the annual exempt amount. The FAQ hedges with "generally" and "where the reporting conditions are met" but never names the proceeds test, which is the condition most likely to catch a share investor rebalancing a portfolio.

Correction: name the £50,000 total-proceeds reporting threshold alongside the gains test.

**ADVISORY 4.** Quoted: *"Choose \"Shares and other assets\", enter your sale value, your cost and your income"* (line 80)

Why wrong: the calculator's actual select option label is "Shares & other assets" (`capital-gains-tax-calculator.ts` line 27) and the calculator's own FAQ quotes it as "Shares & other assets" (line 127). A reader following the instruction literally looks for a label that is not on screen.

Correction: quote the option exactly as rendered, or make both surfaces use the same wording.

### What was tested and passed

- 18% / 24% on shares since 30 October 2024, stated at line 51, line 109, line 209 and the summary. Matches §5 ("Non-residential / commercial gains aligned to the same 18%/24% rates from 30 October 2024"). No stale 10%/20% anywhere.
- AEA £3,000 shared across all asset classes, one pot, does not carry forward. Correct, and the historic figures at line 86 (£12,300 pre-April 2023, £6,000 for 2023/24) match §5's reduction chain exactly.
- Trustees and personal representatives at 24% (table line 110). Matches §5.
- ISA and pension exemption, bed-and-ISA crystallising a gain, 90-day Sharesave transfer window and SAYE base cost being the discounted option price. All correct.
- Reporting: Self Assessment with payment by 31 January following, real-time CGT service as an alternative, explicitly not the 60-day return, with the single correct exception being the non-resident indirect-disposal rule for property-rich entities (line 140). Matches §5 and §17.4.
- Share matching waterfall stated in the correct statutory order: same day, then the following 30 days, then the s.104 pool, cited to TCGA 1992 ss.104, 105 and 106A. Correct.
- **Matching worked example re-derived.** 1,000 at £4 = £4,000 plus 500 at £10 = £5,000 gives a 1,500-share pool at £9,000, average £6. Correct. Sale of 600 at £12 = £7,200 proceeds, pool cost 600 × £6 = £3,600, gain £3,600, less £3,000 AEA = £600 taxable, at 24% = **£144. Correct.** Residual pool 900 shares at £5,400, still £6 a share. **Correct.** The 30-day variant: 400 repurchased at £11.50 gives £4,600 of cost against £2,400 of pool cost (400 × £6), so the gain on that slice collapses to £200. **Correct.**
- Deposit example: £22,000 − £3,000 = £19,000 × 24% = **£4,560. Correct.** Splitting across 5 April saves a second £3,000 at 24% = **£720. Correct.**
- FAQ example: £13,000 gain, £3,000 covered, £10,000 × 24% = **£2,400. Correct.**
- BADR: 18% from 6 April 2026, £1m lifetime limit, 5% ordinary share capital plus 5% of distributable profits plus 5% of winding-up assets, two-year holding, trading company only, property investment companies excluded, "narrowed to six percentage points" against 24%. All correct and matches §5's BADR rate chain (10% to 14% from 6 April 2025, 14% to 18% from 6 April 2026) and the "BADR does NOT apply to investment property" lock.
- Temporary non-residence stated as **five** years with the s.10A citation (line 202). This clears the §17.3 do-not-write, which specifically catches "temporary non-residence is 4 years".
- No indexation and no taper for individuals (line 194). Matches §5.
- Losses interchangeable across asset classes, current-year losses before the AEA, four-year claim window, carried forward indefinitely once claimed. Correct.
- Inherited shares at probate value, gifted shares at market value. Correct.
- Dividends are income not gains, but push more of a gain into the 24% band. Correct.
- No em-dashes. No invented HMRC figures. CGT defined at first use.

---

## 4. capital-gains-tax-calculator.ts (copy strings only)

Verdict: **must_fix** (1 BLOCKER, 2 ADVISORY)

Scope note: `compute` and `computeCgt` were not reviewed as logic, but `src/lib/cgt.ts` was read to verify that two copy strings are truthful, namely `effectiveRate` being "of the gain" (it is: `tax / gain`) and the constants behind the copy (AEA £3,000, PA £12,570, band £37,700, 18% / 24%). Both check out.

### Findings

**BLOCKER 1.** Quoted: *"HMRC charges a late filing penalty once the return is more than 60 days overdue, with further penalties at six and twelve months, and interest runs on the unpaid tax from day 61."* (FAQ "What happens if I miss the 60-day CGT deadline?", line 142)

Why wrong: it invents a 60-day grace period after the deadline. The £100 fixed penalty is charged as soon as the return is late, which is day 61 after completion, not once the return is a further 60 days overdue (which would be roughly day 121). The sentence also omits the daily penalties. This directly contradicts the second-home page, which states the regime correctly at line 168, so the two surfaces disagree on the same point.

Correction: "HMRC charges a £100 fixed penalty as soon as the return is late, daily penalties of £10 from day 91, and a further 5% of the tax due at six months and again at twelve months, with interest running on the unpaid tax from day 61." Source: house positions §5, late filing penalties bullet.

**ADVISORY 1.** Quoted: *"Everyone then has a capital gains tax allowance, the annual exempt amount, of £3,000 for 2026/27."* (explainer paragraph 2, line 88)

Why wrong: "everyone" is too broad. The £3,000 is the individual figure; most trusts get £1,500. The calculator models individuals so the number it uses is right, but the sentence as written is a general statement of law and it is not universally true. The companies page states the trust figure correctly at line 25 and line 122, so this is also a mild cross-page softness.

Correction: "every individual then has" or add "(£1,500 for most trusts)". Source: house positions §5 AEA bullet.

**ADVISORY 2.** Quoted (`assetType` select label, line 27): *"Shares & other assets"*, against the shares blog page's instruction to *"Choose \"Shares and other assets\""*.

Why wrong: label mismatch between the calculator UI and the page that drives traffic to it. Cosmetic, but it is the one instruction a reader follows literally. Recorded once here and once on the shares page; a single fix on either side clears both.

Correction: align the wording. The calculator's own FAQ at line 127 already uses the ampersand form, so changing the blog page is the smaller diff.

### What was tested and passed

- `oneLiner`, `metaTitle`, `metaDescription`, `intro`: 2026/27, 18% / 24%, £3,000 allowance, 60-day property deadline. All correct and mutually consistent.
- `assetType` help string: *"Rates are 18% / 24% for both since 30 October 2024. What changes is how you report: property has a 60-day deadline, shares go on Self Assessment."* Correct and matches §5.
- `costs` help string: property costs (legal, agent, SDLT, capital improvements) and shares costs (dealing costs, stamp duty on purchase). Both correct, and the property list matches the deductible list on the second-home page with no contradiction.
- `otherIncome` help string: income before the gain, sets the 18% versus 24% split. Correct stacking description.
- Shares `note`: rates aligned since 30 October 2024, Self Assessment or real-time service not the 60-day return, share matching not modelled. Correct, and the matching caveat is an honest limitation disclosure rather than a claim.
- Property `note`: assumes no PRR, 60 days from completion **where tax is due**. The "where tax is due" qualifier is present, so the §5 do-not-write ("60-day applies to all UK residents' disposals regardless of tax due") is cleared.
- Explainer paragraph 1: rates aligned across residential property, shares and other assets since 30 October 2024, stacking on income. Correct.
- Explainer paragraph 3: property 60-day account separate from Self Assessment, shares on Self Assessment with 31 January payment. Correct.
- Explainer paragraph 4: PRR and final-period relief not modelled, share matching not modelled. Honest, and consistent with the two `note` strings.
- FAQ "How much capital gains tax will I pay?": *"On a £120,000 property gain with a higher-rate income, the bill is close to £28,000."* Re-derived: £120,000 − £3,000 = £117,000 × 24% = **£28,080. Correct** ("close to £28,000" is fair).
- FAQ "What is the threshold": *"It has been £3,000 since 2024/25, so the 2025/26 capital gains tax allowance was the same figure."* **Correct.** The AEA fell to £3,000 for 2024/25 from £6,000 in 2023/24 and £12,300 before April 2023, and has stayed at £3,000 through 2025/26 and 2026/27. Matches §5 and matches the historic chain quoted on the shares page.
- FAQ "Does this calculator work for shares": alignment date, identical arithmetic, reporting split, matching-rule caveat. Correct.
- FAQ "When do I have to pay CGT on a property sale": 60 days from completion where tax is due, separate from and earlier than Self Assessment. Correct.
- FAQ "Can I transfer property to my spouse": no gain no loss, base cost inherited, two AEAs, possible 18% slice in a lower-earning spouse's band, genuine outright gift, must complete before exchange. All correct and identical in substance to the second-home page.
- FAQ "Is this an HMRC calculator": correctly disclaims. No competitor pricing claims, no "best firm" claim. Clears §13.
- No em-dashes in any copy string. The `−` in the row template is U+2212 minus inside a value string, not prose punctuation.

---

## Cross-page consistency

Every shared figure was compared across all four surfaces.

| Shared figure | Companies | Second home | Shares | Calculator | Agree |
|---|---|---|---|---|---|
| CGT rates 18% / 24% | yes | yes | yes | yes | yes |
| Alignment date 30 October 2024 | yes | yes | yes | yes | yes |
| AEA £3,000 (individual) | yes | yes | yes | yes | yes |
| AEA £1,500 trusts | yes | n/a | n/a | "everyone" (ADV) | soft |
| Personal allowance £12,570 | n/a | yes | n/a | yes (`cgt.ts`) | yes |
| Basic rate band £37,700 | n/a | yes | n/a | yes (`cgt.ts`) | yes |
| Effective rate measured against the gain | n/a | yes (23.3%) | n/a | yes (`tax / gain`) | yes |
| 60-day return only where tax is due | yes | yes | yes | yes | yes |
| Non-residents report every UK land disposal | yes | yes | yes (indirect) | n/a | yes |
| Companies pay CT on chargeable gains, not CGT | yes | yes (line 195) | yes (line 140) | n/a | yes |
| Shares report via Self Assessment, 31 January | n/a | n/a | yes | yes | yes |
| Spouse transfer s.58 no gain no loss, before exchange | yes (implied) | yes | yes | yes | yes |
| Unmarried co-owner transfer is a market-value disposal | n/a | yes | soft (ADV) | n/a | soft |
| Exchange sets the tax year, completion starts 60 days | n/a | yes | yes (trade date) | yes | yes |
| BADR not available on property investment | yes | n/a | yes | n/a | yes |
| BADR 18% from 6 April 2026, £1m limit | no rate quoted | n/a | yes | n/a | yes |
| Late filing penalty regime | n/a | £100 immediate + £10/day + 5%/5% | n/a | **"more than 60 days overdue"** | **NO** |
| 28% is historic, not current | yes (ATED-CGT) | yes (correction) | n/a | n/a | yes |
| No indexation for individuals | yes | n/a | yes | n/a | yes |
| Letting relief shared-occupation only | n/a | yes | n/a | n/a | yes |
| Calculator option label | n/a | n/a | "Shares and other assets" | "Shares & other assets" | **NO** |

Two cross-page disagreements, both already recorded as findings above: the penalty regime (calculator BLOCKER 1) and the select-option label (shares ADVISORY 4 / calculator ADVISORY 2).

## Do-not-write sweep result

- §5: all four clear. No "28%" as a current rate, no unrestricted letting relief, no unqualified 60-day claim, no "s.162 is automatic".
- §13: no em-dashes anywhere (regex sweep for U+2014 and U+2013 returned zero hits across all four files), no client names, no competitor pricing, no emoji, no invented HMRC figures. Two abbreviation-at-first-use misses recorded as advisories (SDLT, SEIS).
- §17.3 / §17.4: clear. Five-year temporary non-residence, s.1A citation, non-resident reporting on every disposal, no AEA for non-resident companies.
- §18.8: clear. ATED-CGT stated as abolished from 6 April 2019, with an explicit warning about the stale 28% figure.
- §21.A.2: clear on all seven drift patterns.

## Minimum fix list

1. Shares page line 76: **£2,872 to £3,072**.
2. Calculator FAQ line 142: rewrite the penalty sentence to £100 on lateness, £10/day from day 91, 5% at 6 and 12 months, interest from day 61.

Everything else on this report is advisory.
