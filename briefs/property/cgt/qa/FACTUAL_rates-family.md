# Factual QA: CGT rates family (adversarial review)

Reviewer pass: 2026-08-20. Scope = `git diff` only (newly added sections and FAQs).
Ground truth: `docs/property/house_positions.md` §5, §6, §17.3-17.4, §39. Supplements: FA 2009 Sch 55/Sch 56, FA 2019 Sch 2, TCGA 1992 s.28 + Sch 1B + Sch 4AA (legislation.gov.uk).

## Verdicts

| Page | Verdict (changed copy) | BLOCKER | ADVISORY |
|---|---|---|---|
| capital-gains-tax-property-complete-guide-uk.md | all_clear | 0 | 1 |
| capital-gains-tax-property-sale-uk-2026-rates-allowances.md | all_clear | 0 | 3 |
| cgt-payment-deadlines-property-sales-2026.md | must_fix | 1 | 2 |
| Cross-page / pre-existing (out of changed scope, flagged as instructed) | - | 1 | 2 |

All arithmetic in all three pages re-derived to the penny. Every worked figure checks out; see "Arithmetic re-derivation" below. No hit on the §5 do-not-write list in any changed copy (28% appears only as an explicitly dated historic rate, letting relief is correctly limited to shared occupation, the 60-day rule is correctly limited to "where tax is due" for UK residents on all three pages, s.162 is not mentioned).

---

## Page 1 — capital-gains-tax-property-complete-guide-uk.md

**Verdict: all_clear.**

Checked and correct: AEA GBP 3,000; 18%/24% for 2026/27; PRR final nine months; commercial aligned to 18%/24% since 30 October 2024; no 60-day return for UK residents on commercial or land; non-residents file for every UK land disposal regardless of tax due; companies outside the 60-day regime (Sch 2 FA 2019 applies to persons chargeable to CGT, not to companies within the charge to corporation tax); GBP 100 penalty from day 61; AEA does not carry forward; brought-forward losses restricted so the AEA is not wasted; repairs not deductible against the gain; mortgage repayment does not reduce the gain; below-market-value disposals to connected persons computed on open market value; the 60-day clock runs from completion.

### ADVISORY 1 — "Trusts get GBP 1,500" stated without qualifier in the FAQ
> "Trusts get £1,500."
(FAQ: "What is the capital gains tax allowance on property in 2026/27?")

House §5 says "GBP 1,500 for most trusts" and the page body correctly writes "Most trusts get £1,500". The FAQ drops "most". Trusts for the disabled / vulnerable beneficiaries take the full individual amount, so the unqualified FAQ is over-broad. Correction: match the body wording, "Most trusts get £1,500." Source: house §5; TCGA 1992 Sch 1 para 1 (settlements for disabled persons).

---

## Page 2 — capital-gains-tax-property-sale-uk-2026-rates-allowances.md

**Verdict: all_clear** on the changed copy. Three advisories, plus one pre-existing BLOCKER on this page recorded in the cross-page section.

Checked and correct: historic-rates table (2023/24 18/28 + 10/20 + GBP 6,000; 2024/25 split at 29/30 October 2024; 2025/26 and 2026/27 both 18/24 + GBP 3,000); 30 October 2024 as the change date; residential higher rate fell 28% to 24%; non-residential rose 10/20 to 18/24; BADR 10% to 14% (6 Apr 2025) to 18% (6 Apr 2026) per §5 and §5.A; AEA path GBP 12,300 to GBP 6,000 to GBP 3,000, GBP 3,000 applying since 6 April 2024; trustees and PRs 24% flat with no basic-rate slice (§5; written undated, which satisfies the §39 "say 24% (current)" instruction); trust AEA GBP 1,500; GBP 50,270 higher-rate threshold for 2026/27; non-resident individuals keep the GBP 3,000 AEA; non-residents file for every UK land disposal including indirect disposals of property-rich company shares; GBP 100 penalty even at nil tax; NRCGT staging 6 April 2015 residential / 6 April 2019 non-residential and indirect; default rebasing to 5 April 2015 and 5 April 2019.

### ADVISORY 2 — straight-line apportionment offered as an alternative for non-residential rebasing
> "the default base cost is the market value at 5 April 2015 for residential property and 5 April 2019 for non-residential, so you are usually taxed only on the growth since those dates. Alternative bases (straight-line apportionment of the whole gain, or using your actual original cost) can be elected where they give a better answer."
(FAQ: "What is NRCGT and when did it start?")

The sentence applies both alternatives to both rebasing dates. Straight-line time apportionment is only available for the April 2015 residential rebasing (TCGA 1992 Sch 4AA Part 3). For non-residential land and indirect disposals rebased at 5 April 2019 (Sch 4AA Parts 4 and 5) the only alternative is the retrospective basis, i.e. computing the gain over the whole period of ownership from actual cost. Correction: attach "straight-line apportionment" to the residential 2015 route only. Source: TCGA 1992 Sch 4AA (inserted by FA 2019 Sch 1); house §17.4 states the two default rebasing dates and does not extend time apportionment to 2019.

The body section under "Your base cost is usually rebased, not what you paid" is fine as written, because it frames both alternatives around a residential example.

### ADVISORY 3 — temporary non-residence framed as catching a straightforward UK property disposal
> "If you return to the UK within five years of leaving, the temporary non-residence rules can pull gains you realised while abroad into a UK charge in the year you come back, which undoes the point of waiting."
(body, "Do non-residents pay capital gains tax on UK property?"; near-identical wording in the FAQ "Do I still pay UK CGT if I move abroad before selling?")

Both instances sit inside sections about disposing of UK property, so the reader takes "gains you realised while abroad" to mean the UK property gain. House §17.3 do-not-write: "s.10A applies to all assets including UK land (UK land is already in NRCGT; s.10A primarily matters for non-UK situs assets and pre-2015 base-cost UK gains)". The same section allows the accurate framing: s.10A "recaptures any gain that NRCGT didn't catch". As written it implies a second, avoidable charge on a gain NRCGT has already taxed in full.

Two fixes, both one clause: (a) add that a post-2015 UK residential gain is already inside NRCGT, so s.10A only reaches the part NRCGT does not (principally pre-2015 base cost and non-UK situs assets); (b) add the missing entry condition, that the individual must have been UK resident in 4 or more of the 7 tax years before departure (house §17.3, TCGA 1992 s.10A). "Within five years of leaving" alone is not the test.

### ADVISORY 4 — BADR described as reaching commercial property
> "Rollover relief and Business Asset Disposal Relief can both reach commercial property used in a trade, and neither is available on residential investment property."
(body, "What is the CGT rate on commercial property and land?"; same claim in the FAQ "Is the CGT rate different for commercial property or land?")

Business asset rollover relief (TCGA 1992 s.152) does attach to land and buildings used for a trade. BADR does not attach to a property as such: it applies to a disposal of the whole or part of a business, of business assets after cessation, of qualifying shares, or to an "associated disposal" made alongside a qualifying withdrawal from a partnership or company (TCGA 1992 ss.169H-169S). A trader selling a shop in isolation, still trading, gets no BADR. Correction: keep rollover relief as stated and rephrase BADR as reaching commercial property only as part of a business or associated disposal. Source: TCGA 1992 s.169I; house §5 confirms only that BADR does not apply to investment property.

---

## Page 3 — cgt-payment-deadlines-property-sales-2026.md

**Verdict: must_fix.**

Checked and correct: 60 days from completion, report and pay on one date; 1 June 2026 completion to 31 July 2026 deadline (re-counted: 29 days remaining in June plus 31 in July = 60); the three in-scope conditions (UK residential, tax actually due, UK resident); no filing at all for a UK resident where PRR, losses or the AEA cover the gain; non-residents file every UK land disposal including indirect disposals; GBP 100 penalty on day 61 regardless of tax size; interest from day 61; land or commercial sold by a UK resident goes on SA108 with tax due 31 January after the tax year; garden and grounds sold with a dwelling are residential and inside the 60-day rule; mixed-use driven by the residential element; PPDCGT as the interactive paper return with no extension for posting time; SA108 with SA100 by 31 January; 2026/27 disposal payable 31 January 2028; SA payments on account do not apply to CGT; the real time transaction service cannot substitute for the property return; Government Gateway sign-in plus a separate CGT on UK property account number, distinct from Self Assessment; agent services account and digital handshake; 60-day tax credited against the final SA liability.

### BLOCKER 1 — late-payment 5% surcharge stated as starting at three months
> "Pay late and interest runs from day 61 at HMRC's published late payment rate, with 5% surcharges stacking on top at three, six and twelve months."
(body, "When do you pay capital gains tax on property?" under "How do you pay capital gains tax to HMRC?")

The first late-payment surcharge is not at three months. Under FA 2009 Sch 56 (item 3AA covers amounts payable under FA 2019 Sch 2, i.e. the CGT on UK property return) the ladder is: 5% of the unpaid tax once it is 30 days late; a further 5% at 5 months after the penalty date (about 6 months late); a further 5% at 11 months after the penalty date (about 12 months late). "Three months" has no source in house positions or in Sch 56, and it tells a late payer they have roughly two extra months of surcharge-free grace that they do not have.

Correction: "5% surcharges stacking on top at 30 days, six months and twelve months." Source: FA 2009 Sch 56 paras 1(4) and 3(2)-(4), as applied by FA 2019 Sch 2 para 18; HMRC CG-APP18. House §5 records the 5% points at 6 and 12 months (that line is the Sch 55 late-filing ladder) and nowhere supports a three-month trigger.

Note the same confusion already exists in this page's pre-existing penalty table ("5% surcharge at day 91", under a "Days past the deadline" header while the interest row counts from completion at day 61). The new sentence should not be fixed in isolation, or the page will still read inconsistently. The table is out of the changed-copy scope; recorded below.

### ADVISORY 5 — "everything else goes on SA108" contradicts the real-time-service FAQ on the same page
> "Every other disposal, including commercial property, land, shares and overseas property, is reported on the SA108 capital gains pages of your Self Assessment tax return"
(FAQ: "How do I report capital gains tax to HMRC?")

versus, three FAQs later:
> "HMRC's real time capital gains tax service is a route for gains on other assets"

Both are in the new copy. A taxpayer not already within Self Assessment can report a non-property gain through the real time transaction service instead of registering for SA. Correction: qualify the first as "reported on the SA108 ... if you are within Self Assessment (or through HMRC's real time service if you are not)". Source: gov.uk "Report and pay your Capital Gains Tax"; HMRC CG-APP17.

### ADVISORY 6 — "two edge cases" on residential land is not the full Sch 1B set
> "Two edge cases catch people out. Land you sell together with a dwelling, including a garden or grounds that form part of that dwelling, counts as residential for this purpose and sits back inside the 60-day rule."

Correct as far as it goes, but the section asserts completeness while omitting the two Sch 1B limbs most likely to catch a landlord: land where a dwelling is in the process of being constructed or adapted counts as residential, and an interest subsisting under a contract for an off-plan purchase counts as residential. Both put an apparently "bare land" disposal back inside the 60-day rule. Correction: either drop the "two edge cases" framing or add the under-construction and off-plan limbs. Source: TCGA 1992 Sch 1B paras 1 and 4 (inserted by FA 2019 Sch 1).

---

## Cross-page consistency

Every shared figure agrees across the three pages: AEA GBP 3,000 (trusts GBP 1,500), 18%/24% residential and non-residential for 2026/27, 30 October 2024 alignment date, 28% only as historic, BADR 10/14/18, 60 days from completion, GBP 100 opening penalty, non-residents file for every UK land disposal regardless of tax due, UK residents file only where tax is due, commercial and land off the 60-day service for UK residents, 31 January 2028 for a 2026/27 SA balancing payment. No divergence found in any newly added copy.

On exchange versus completion, all newly added copy is consistent and correct: pages 1 and 3 both say the 60-day clock runs from completion rather than exchange, and page 3 correctly limits completion to the reporting and payment trigger. Two pre-existing items are the exception.

### BLOCKER 2 (pre-existing, outside the changed copy) — page 2 says the disposal date is the completion date
> "Five recurring patterns: (1) using exchange date rather than completion date as the disposal date; ..."
(page 2, pre-existing FAQ "What are the most common CGT mistakes on property sales?")

This says the disposal date for CGT is completion. It is not. TCGA 1992 s.28: where an asset is disposed of under a contract, the time of disposal is the time the contract is made, not the time of conveyance or transfer (for a conditional contract, when the condition is satisfied). Exchange therefore fixes the tax year of the gain and the rates that apply, which is exactly why a sale exchanging in one tax year and completing in the next is a real trap. Only the 60-day reporting and payment clock runs from completion (FA 2019 Sch 2 para 3).

Page 3 states this correctly and narrowly ("it is still the completion date that triggers the reporting and payment obligation"), so as things stand the two pages answer the same question differently and page 2 is the wrong one. Correction: rewrite the page 2 bullet as "using the completion date rather than the exchange date as the disposal date (exchange fixes the tax year; completion only starts the 60-day clock)". Source: TCGA 1992 s.28, legislation.gov.uk.

### ADVISORY 7 (pre-existing) — "payment on account" used two ways across the family
> "You must make a payment on account within 60 days, even if you expect a refund after claiming reliefs or losses." (page 2, pre-existing)

versus, in page 3's new copy:
> "Payments on account do not apply to capital gains tax, so the whole amount falls due on that one date."

Both are defensible in their own sense (the 60-day payment is statutorily a payment on account of the year's liability; Self Assessment payments on account under TMA 1970 s.59A exclude CGT), but read side by side across two pages in the same cluster they contradict. Correction: on page 3, say "Self Assessment payments on account do not apply to capital gains tax."

### ADVISORY 8 (pre-existing) — page 2 penalty FAQ misstates the filing ladder
> "Late filing penalties start at £100 and escalate, plus daily penalties after 3 months and 6 months." (page 2, pre-existing FAQ)

Daily GBP 10 penalties run for a maximum of 90 days from 3 months late, capped at GBP 900 (FA 2009 Sch 55 para 4). What arrives at 6 months is a separate penalty of the greater of 5% of the tax and GBP 300 (para 5), and again at 12 months (para 6). "Daily penalties after 3 months and 6 months" merges the two. Matches house §5. Same page family, so worth fixing with BLOCKER 1.

### ADVISORY 9 (pre-existing) — page 3 penalty table mixes two day-counting conventions
Row 1 counts from completion ("Interest accruing daily from day 61") while the header says "Days past the deadline", and the late-payment column puts the first 5% at day 91 and the second at day 181. Under the house convention (days past the filing deadline, per §5 "GBP 10/day from day 91"), the late-payment column should read 30 days, 6 months, 12 months. This is the source of BLOCKER 1; fix them together.

---

## Arithmetic re-derivation

Page 1, main worked example:
- Net proceeds 300,000 - 6,000 = **294,000**. Base cost 180,000 + 5,000 + 10,000 = **195,000**. Gain 294,000 - 195,000 = **99,000**. Correct as printed.
- 99,000 - 3,000 AEA = **96,000**. 96,000 x 24% = **23,040**. Correct.
- Lower-income variant: basic rate band 2026/27 = 50,270 - 12,570 = 37,700. 37,700 - 20,000 = **17,700** free. 17,700 x 18% = **3,186**. 96,000 - 17,700 = 78,300 x 24% = **18,792**. Total = **21,978**. Correct.
- Page 1 FAQ repeats 99,000 / 96,000 / 23,040. Consistent.
- Couple sheltering 2 x 3,000 = **6,000**. Correct.

Page 2, allowance-versus-rate comparison:
- 2022/23: 60,000 - 12,300 = 47,700 x 28% = **13,356**. Correct (28% was the residential higher rate in 2022/23).
- 2026/27: 60,000 - 3,000 = 57,000 x 24% = **13,680**. Correct.
- Difference 13,680 - 13,356 = 324 higher today, so the conclusion that the allowance cut took more than the rate cut gave back holds. Correct. (Both legs assume a higher-rate taxpayer, which is consistent across the comparison.)

Page 3, deadline dates:
- Completion 1 June 2026 + 60 days: 29 days remaining in June + 31 days in July = 60, landing **31 July 2026**. Correct as printed.
- Pre-existing example, completion Wednesday 17 June 2026 + 60 days: 13 + 31 + 16 = 60, landing **16 August 2026**, a Sunday. Both the weekday and the date check out.
- 2026/27 disposal, SA balancing payment **31 January 2028**. Correct.
