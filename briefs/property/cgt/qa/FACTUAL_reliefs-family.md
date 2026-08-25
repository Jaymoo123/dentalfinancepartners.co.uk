# Adversarial factual QA — reliefs / family cluster (3 pages)

Reviewer: adversarial factual QA (attempt to refute, not to confirm).
Date: 2026-08-20.
Scope: **only** the copy added in the working-tree diff (`git diff`) on each page. Pre-existing body copy was read for cross-reference and internal-consistency purposes only.
Authority: `docs/property/house_positions.md` §5 (CGT on UK residential property 2026/27), §39 (CGT on death, probate base cost), §5.A (BADR post-FHL), §13 (general do-not-write list). House positions beat every other source.

## Verdicts

| Page | Verdict | BLOCKER | ADVISORY |
|---|---|---|---|
| principal-private-residence-relief-landlords.md | **all_clear** | 0 | 3 |
| cgt-inherited-rental-property-calculation-uk.md | **all_clear** | 0 | 3 |
| cgt-calculation-selling-buy-to-let-property-step-by-step.md | **must_fix** | 2 | 3 |

---

## Checks that PASSED (attempted refutation, could not break)

**Rates and allowances, all three pages, all instances:** AEA £3,000; 18% basic / 24% higher on residential; trustees and PRs 24% throughout with no basic-rate slice; 2026/27 higher-rate threshold £50,270. All match §5 and are consistent across the three pages. No instance of 28% anywhere in the new copy.

**Final 9 months PRR deemed occupation:** stated as 9 months on every occurrence across all three pages (§5). No page writes 18 months or 36 months. The letting-period overlap is handled correctly (no double-counting of the final 9 months inside the let period).

**Letting relief:** page 3 states shared-occupation-only since 6 April 2020 and the lowest-of-three cap (£40,000 / PRR given / gain attributable to the letting) — correct per §5 and TCGA 1992 s.223B. Page 1 correctly warns that the free-floating "£40,000 lettings relief" still circulating online is no longer claimable by most sellers. Neither page writes "letting relief is available for all rental periods" (§5 do-not-write).

**60-day reporting:** all three pages state the UK-resident rule as "only where tax is actually due", and pages 1, 2 and 3 each carry the non-resident carve-out (file on every UK land disposal, tax due or not). Matches §5 exactly; the §5 do-not-write item is not tripped. Page 3's £100 fixed late-filing penalty matches §5.

**Death / probate base cost (page 2) vs §39:** "death is not a disposal" (s.62(1)); heir's base cost = open-market value at the date of death, normally the probate figure (s.62(4)); gain measured only on growth above that value, never from what the deceased paid; estate pays CGT only on what the PRs actually sell in the administration period; PR AEA = £3,000 for the tax year of death plus the two following tax years, then nil. Every one of these matches §39 line for line. The 24% PR rate is safe here because the page is explicitly 2026/27 copy (§39's "verify at write time" caveat concerns pre-6-April-2026 periods).

**IHT / CGT non-netting (page 2):** "Inheritance Tax already paid does not reduce the gain you are taxed on later" — correct on a death transfer.

**Deductible costs:** page 1 step 1 (purchase price, SDLT on purchase, legal, survey, estate agent, capital improvements) and page 3's four-item list are both correct under TCGA 1992 s.38. Page 3's mortgage treatment is right on both limbs: clearing the borrowing does not change the gain, and s.24-restricted interest is an income-tax item that cannot also reduce the gain. Page 3 correctly separates capital improvements from revenue repairs.

**BADR / roll-over (page 3):** "roll-over relief applies to assets used in a trade... a residential letting business is an investment business" and "the same reasoning is why BADR is not available on a standard buy-to-let disposal" — correct per §5 and §5.A.

**Arithmetic, re-derived to the penny:**
- Page 1 worked example: 120 months owned, 72 lived in + 9 = 81 qualifying; 81/120 = 67.5%; 0.675 × £150,000 = £101,250 exempt; £48,750 − £3,000 = £45,750; × 24% = £10,980. Correct.
- Page 1 joint variant: two half-shares of £75,000, each 67.5% exempt (£50,625), each £24,375 − £3,000 = £21,375, total taxable £42,750 vs £45,750 sole. Saving = £3,000 × 24% = **£720**. The stated £720 is correct.
- Page 1 FAQ figures reproduce the body example identically (67.5%, £101,250, £48,750, £45,750, £10,980). No FAQ/body drift.
- Page 2 worked example: £310,000 − £6,000 = £304,000; − £280,000 = £24,000; − £3,000 = £21,000; × 24% = **£5,040**; × 18% = **£3,780**. Correct, and the FAQ repeats the same five figures without drift.
- Page 3 new copy carries no new numeric worked example; its cross-references to Worked Example 3 (former main residence) and Worked Example 4 (joint owners, pre-sale spouse transfer, s.58 NGNL) both resolve to real sections above the referencing text, and the list of example variants ("higher-rate landlord, a gain that straddles the bands, a former home, joint owners, and a year with losses") matches examples 1-5 on the page.

**§13 general do-not-write list:** zero em-dashes in the new copy on all three pages; no client names; no invented HMRC-attributed figures; no emoji; PRR/PPR defined at first use.

**Internal links:** all nine slugs referenced by the new copy exist in `Property/web/content/blog/`. No broken cross-links.

**§5 s.162 incorporation trap:** not touched by any of the new copy. No page asserts incorporation relief is automatic.

---

## Page 1 — principal-private-residence-relief-landlords.md — **all_clear**

New sections reviewed: the 5 new H2s ("Do you pay capital gains tax on your main residence?" through "How do you work out the capital gains tax on a home you have lived in?") plus the last 7 FAQs.

### ADVISORY 1 — ownership period measured completion-to-completion
> "**Step 2: count the months you owned it.** Completion on the purchase to completion on the sale."

For CGT the date of acquisition and the date of disposal are the date of the **contract**, not completion (TCGA 1992 s.28(1); for a conditional contract, the date the condition is satisfied). HMRC measures the PRR period of ownership from the acquisition date so determined (CG64920, CG14260). Completion only governs the 60-day filing clock, which is a different rule. In most sales the difference is a few weeks and washes out of the fraction, but it is wrong on principle and it is the same error that becomes a BLOCKER on page 3 (see that page's BLOCKER 2).
Correction: "From the date you exchanged contracts to buy, to the date you exchanged contracts to sell (the 60-day filing clock, separately, runs from completion)." Source: TCGA 1992 s.28; HMRC CG14260, CG64920.

### ADVISORY 2 — half-hectare framing omits that the house site counts inside the limit
> "Your garden and grounds run past half a hectare (about 1.24 acres) and you cannot show the extra land was needed for a house of that size."

The 0.5 hectare permitted area under TCGA 1992 s.222(3) **includes the site of the dwelling house itself**, so a reader with, say, 0.55 ha of garden plus the footprint of the house is further over the line than this sentence implies. HMRC HS283 puts it as "grounds of up to 5,000 square metres (a little over an acre) **including the site of the house**". The acre conversion (1.2355 acres, rounded to 1.24) is correct.
Correction: add "including the ground the house stands on". Source: TCGA 1992 s.222(3); HMRC HS283, CG64800.

### ADVISORY 3 — "no minimum period" stated without the quality-of-occupation counterweight
> "There is no minimum period you have to live somewhere before it counts as your primary residence"

Literally true (no statutory minimum) but incomplete in a way that invites the exact planning HMRC attacks: the test is the **quality and permanence** of occupation, not the calendar (Goodwin v Curtis [1998] STC 475; HMRC CG64435 onwards). Page 3's new copy gets this right ("HMRC also looks at quality of occupation rather than a fixed minimum period"), so as written the two pages are consistent in substance but page 1 is the weaker statement of the pair.
Correction: append the page-3 formulation — "there is no minimum period, but HMRC looks at the quality and permanence of the occupation, so a token stay does not create a main residence." Source: Goodwin v Curtis; HMRC CG64435.

---

## Page 2 — cgt-inherited-rental-property-calculation-uk.md — **all_clear**

New sections reviewed: the 5 new H2s ("Do you pay capital gains tax on inherited property?" through "What if the property sells for more than the probate value?") plus the last 5 FAQs. Checked line-by-line against §39; no contradiction found.

### ADVISORY 1 — "they end at death" overstates the fate of the deceased's losses
> "The deceased's unused capital losses cannot be carried into the estate. They end at death."

First sentence is right; second is wrong. Losses realised by the deceased in the **year of death** may be carried **back** against that person's chargeable gains of the three preceding tax years, latest year first (TCGA 1992 s.62(2)). For an executor of someone who had gains in the run-up to death this is a live repayment claim, and "they end at death" tells them not to look.
Correction: "cannot be carried forward into the estate, though losses of the year of death can be carried back against the deceased's own gains of the previous three tax years." Source: TCGA 1992 s.62(2); HMRC CG30430.

### ADVISORY 2 — sale below probate value does not always produce a CGT loss
> "If the property sells for less than the probate value, the seller has a capital loss instead."

True for a beneficiary selling in their own name, but the sentence sits in a paragraph that also covers executors, and for executors it can be false. Where the PRs claim IHT loss-on-sale relief on a sale of land within four years of death (IHTA 1984 s.191), the **sale price replaces the probate value for IHT**, and because that is then the value "ascertained" for IHT it also becomes the CGT base cost (TCGA 1992 s.274) — leaving no CGT loss at all. Estates routinely have to choose between the IHT relief and the CGT loss; the copy presents the CGT loss as automatic.
Correction: add "unless the executors claim IHT loss-on-sale relief on the same sale, which substitutes the sale price for the probate value and removes the CGT loss." Source: IHTA 1984 s.191; TCGA 1992 s.274; HMRC IHTM33000+, CG32224.

### ADVISORY 3 — "probate value" used flatly where the statutory test is market value at death
The opening section hedges correctly ("the open-market value of the property on the date the person died, which is normally the figure used for probate"), but four later passages then say "the probate value" without the hedge. Where no IHT is payable (spouse-exempt or below-NRB estate) the probate figure is **not ascertained for IHT** and does not bind for CGT; the base cost is the actual market value at death, which HMRC can and does challenge in both directions. This matters most for the cheap-probate-valuation case the page itself flags two paragraphs later.
Correction: keep "market value at the date of death (usually, but not always, the probate figure)" on at least the first use in each section. Source: TCGA 1992 ss.62(1), 274; §39 ("PRs are deemed to acquire estate assets at **market value** at the date of death").

Minor note, not a finding: "none from the fourth year of administration onwards" is the right outcome but mixes "years of administration" with the statutory unit, which is tax years (year of death plus the two following tax years). The next paragraph states it correctly.

---

## Page 3 — cgt-calculation-selling-buy-to-let-property-step-by-step.md — **must_fix**

New sections reviewed: the 5 new H2s ("Do you pay capital gains tax when you sell a rental property?", "What can you deduct when you sell a rental property?", "Do you have to tell HMRC when you sell a buy-to-let?", "What if you sell one buy-to-let and buy another?", "Can you avoid capital gains tax on a rental property?") plus the last 6 FAQs.

### BLOCKER 1 — brought-forward losses do NOT come off before the annual exempt amount
> "**Losses, including old ones.** A loss claimed in an earlier year and carried forward is still available, and it comes off before your annual exempt amount is applied."

Wrong, and it produces a worse answer for the reader than the law gives. The statutory order is: current-year losses are set off **in full first** (and can waste the AEA), then the **AEA** is applied, and brought-forward losses are then used **only to the extent the gains exceed the AEA** — precisely so that carried-forward losses are not wasted against exempt gain (TCGA 1992 s.1I / s.1K, rewritten from the old s.3(5)-(5C)). As written the copy tells a reader with a £15,000 brought-forward loss to burn £3,000 of it against gain the AEA would have covered for free.

This also **contradicts the same page's own Worked Example 5**, which gets it right: *"Brought-forward loss offset (only enough to bring the gain down to the AEA)... keeping £3,000 to absorb the AEA."* The new bullet and the existing example cannot both stand.

Correction: "A loss claimed in an earlier year and carried forward is still available. In-year losses come off before your annual exempt amount; brought-forward losses come off only after it, and only down to the allowance, so none of the old loss is wasted." Source: TCGA 1992 ss.1I, 1K; HMRC CG21520; and this page's own Worked Example 5.

### BLOCKER 2 — the tax-year of a disposal is fixed by exchange, not completion
> "**Timing.** Completing on 6 April rather than 5 April moves the gain into the next tax year, which gives you a fresh annual exempt amount and a fresh rate band, and pushes the payment date out by a year on the Self Assessment side."

False as a planning instruction. The time of disposal for CGT is the date the **contract** is made, not completion (TCGA 1992 s.28(1)); for a conditional contract it is the date the condition is satisfied. A landlord who exchanges in March and completes on 6 April is taxed in the **earlier** tax year, exactly the opposite of what this bullet promises. This is the single most consequential error in the batch because the copy invites the reader to act on it, and it is presented in a list headed "how to reduce your bill".

Two secondary defects in the same sentence: (a) "a fresh annual exempt amount and a fresh rate band" only helps if the current year's AEA and basic-rate band are already used; (b) "pushes the payment date out by a year" is true only where no 60-day return is required — where CGT is due, payment falls 60 days after completion in either tax year, and the page itself says so two sections earlier.

Correction: "Timing works off the **exchange** date, not completion: a contract exchanged on 6 April rather than 5 April falls in the next tax year, which can give you an unused annual exempt amount and an unused basic-rate band. It does not defer the payment date where a 60-day return is due." Source: TCGA 1992 s.28(1); HMRC CG14260; §5 (60-day rule).

### ADVISORY 1 — "comes off the gain at your marginal rate" conflates deduction with relief value
> "Every extension, conversion or new-build element that you can evidence with an invoice comes off the gain at your marginal rate."

Improvement expenditure comes off the **gain** (TCGA 1992 s.38(1)(b)); it does not come off "at a rate". The rate is what determines the value of the deduction (24p or 18p in the pound), not the mechanism. As phrased it reads as though the deduction itself is rate-adjusted.
Correction: "comes off the gain, so it is worth 24p or 18p in the pound depending on your rate." Source: TCGA 1992 s.38(1)(b).

### ADVISORY 2 — "reports the same share again on their own Self Assessment return" is stated as universal
> "Each owner then reports the same share again on their own Self Assessment return."

Only required where the owner is in Self Assessment and the reporting thresholds are met — the same thresholds the page states correctly one section earlier (gains above the AEA, or total proceeds above £50,000). An owner whose share is fully covered by the AEA and whose proceeds are under the limit has nothing to add to a return.
Correction: qualify with "where they are in Self Assessment and their gains exceed the annual exempt amount or their proceeds exceed £50,000". Source: TMA 1970 s.8; SA108 notes (£50,000 proceeds reporting limit from 2023/24). Note the £50,000 figure the page uses elsewhere is correct.

### ADVISORY 3 — "moving back in" example understates what a second occupation actually buys
> "a year back in a property you have owned for fifteen adds roughly a fifteenth of relief, plus the final nine months of deemed occupation"

The direction and the anti-avoidance warning are right, and the parallel FAQ ("two twentieths") is arithmetically consistent. The wording risks implying the final 9 months is an addition available only because of the move back in; where the property was a main residence at an earlier point, the final 9 months already qualified regardless. Minor, but it makes the move-back look better than it is in exactly the case the paragraph is arguing against.
Correction: "...adds roughly a fifteenth of relief. The final nine months already qualified if the property was ever your main residence, so the move back does not buy them a second time." Source: TCGA 1992 s.223(2)(a); §5.

---

## Cross-page consistency — no conflicts found

Shared figures were compared across all three pages: **£3,000 AEA** (identical on all three, including the joint-owner "£6,000 between a couple" framing), **18% / 24%** (identical, and each page ties the 18% to unused basic-rate band rather than to income generally), **final 9 months** (identical, no page drifts to 18 or 36 months), **£50,270** (page 3 new copy matches page 3's existing Worked Example 4), **£40,000 lettings relief cap** (page 3 states the lowest-of-three; page 1 warns the £40,000 figure is stale for most sellers — complementary, not contradictory), **60-day rule** (identical UK-resident "only where tax is due" plus non-resident "every disposal" on all three).

One **internal** inconsistency exists and is captured as page 3 BLOCKER 1: the new brought-forward-loss bullet contradicts Worked Example 5 on the same page.

The exchange-vs-completion defect appears on two pages at different severities — page 3 BLOCKER 2 (decides the tax year, reader is told to act on it) and page 1 ADVISORY 1 (measures the PRR fraction, effect usually immaterial). Fixing both together keeps the cluster consistent.

## Recommended action

Fix page 3's two BLOCKERs before publication. The five ADVISORY items are precision improvements, none of which produce a wrong number in the worked examples as they stand; batch them with the next edit to these pages.
