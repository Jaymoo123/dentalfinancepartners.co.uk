# Wave 12 post-restructure verification read: A3 and A9

Scope: the two surfaces whose fix round changed page structure. A3 lost an H2
(the 60-day walkthrough, compressed to one clause plus one link inside the CGT
block). A9 moved the three-bucket deductibility table out of H2 #2 into the
late CGT H2, and H2 #2 was rebuilt as plain cost content.

Five named checks run on each: seams, flow, counts, figures, links.

---

## A3 - sell-house-without-estate-agent.md

**Verdict: MUST_FIX** (one arithmetic residual I cannot repair under a
deletions-only mandate). One residual fixed. Everything else clean.

### Residual 1 - FIXED (seam, restructure-caused)

Quote, before:

> The whole process fits on one page. The sections below take the steps in turn.

The second sentence promises a section per step, in step order. Neither holds
any more. The walkthrough H2 that carried step 10 is gone (step 10 now lives as
a clause in the cost H2), and the surviving sections run out of step order
anyway: Rightmove (step 4), pricing (step 1), paperwork (steps 2 and 8),
viewings and offers (steps 6 and 7), conveyancer (step 9), misrepresentation,
cost and tax (step 10). This is the "numbering that no longer matches" class.

Action: deleted the second sentence. The paragraph now reads "The whole process
fits on one page." and the ten-step list follows unchanged. Nothing else on the
page referred to it.

### Residual 2 - NOT FIXED, needs a figure substitution (check 4)

Line 164, the total row of the sale-cost table:

> **£1,004 to £3,309** across the priced rows above, on the lower disbursement
> set. Selling with no agent at all, where the listing line is £0 to £400
> instead, comes to £900 to £3,250 all in

The first figure is right and sums to its own table. Priced rows on the
MoneySavingExpert (lower) disbursement set: listing £129-£1,599, EPC £35-£120,
conveyancing £800-£1,500, disbursements £40-£90 (£10-20 deeds + £20-50
transfers + £10-20 AML). Min 129+35+800+40 = £1,004. Max 1,599+120+1,500+90 =
£3,309. Correct.

The no-agent variant does not. Swap the listing line for £0-£400 and only that
line changes:

- Min: 0 + 35 + 800 + 40 = **£875** (page says £900)
- Max: 400 + 120 + 1,500 + 90 = **£2,110** (page says £3,250)

The top of the range is out by £1,140, which is roughly the listing line the
sentence claims to have removed. It reads as a stale figure from a pre-fix
version of the table.

Recommended replacement (one substitution, so outside a deletions-only remit):
"comes to £900 to £3,250 all in" -> "comes to £875 to £2,110 all in".
Alternative if the row is meant to stay round: delete the whole second sentence,
which loses the no-agent all-in but leaves the Route 1 saving (£3,860) intact in
the prose above and below.

### Advisory - not fixed, not restructure-caused

Line 110, opening the paperwork H2:

> Five things, and the first two hold up the marketing rather than the sale.

Only the first of the five (the EPC) is a legal precondition of marketing. Item
two is the title documents, which hold up the sale, not the listing. Arguable
rather than certainly wrong (the H2 is "before you list", so all five are
pre-listing), and untouched by the restructure, so left alone. Minimal fix if
wanted: delete ", and the first two hold up the marketing rather than the sale".

Line 17, `summary`: "This page is the process: the ten steps, the portal rule,
the paperwork." Exactly 40 words so it meets batch ruling 2 on length, but the
trailing clause is close to the banned contents-catalogue shape. Flagging only.

### Checks that passed

**Seams.** No "as we saw above", no "the table below" pointing at a moved
target, no mid-list sentence. "the rows above" in the total row resolves inside
its own table. The step-10 list item is not orphaned: its content is the 60-day
clause in the CGT block. The "The arithmetic, in six lines" lead-in still has
six bullets.

**Flow / CGT block.** The 60-day point is one clause with one link out
(`/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`), inside a
single block at the end of the cost H2. No second CGT-mechanics link in that
block. The complete-guide link sits in the pricing H2, several screens away, so
rule 13 holds. Every H2 opens on its own subject.

**Counts.** Em/en-dashes 0. FAQs 14 (band 10-14, at the ceiling). metaTitle 54.
metaDescription 144. Frontmatter parses as YAML, 18 keys. Hard statute citations
in prose 0 (regex for `s.N`, `section N`, Act/Regulations/Order + year, TCGA,
CG-manual refs, bare pincites: no hits). Portal paradox is in the "in practice"
form, no s.1(4) in prose.

**Figures.** Base is a stated £300,000 worked sale, restated at each use, and
labelled "portal route" / "online agent route" where the route matters. All
trace: £4,260 = 1.42% of £300,000 (HomeOwners Alliance 2026); £1,079 = £999 flat
fee + £80 identity check (MSE, 1 July 2026); £3,181 = 4,260 - 1,079; £2,608 =
less 18%; £2,418 = less 24%; £3,860 = 4,260 - 400 (Route 1); 1.1% and 1.3%
break-even both check out; metaDescription's "£3,200 to £3,900" is the rounded
pair. Consistent with the canonical two-route set in ADJUDICATIONS rule 13,
including the unstated Route 1 after-tax pair (3,165 / 2,934) implied by "the
tax works the same way". Sole exception is residual 2 above.

**Links.** 11 internal hrefs, all resolve on disk. Blog links checked against
each target's own `category` frontmatter, all categories match the URL segment.
`/cost-of-selling-a-property` is a real route. `/calculators/cost-of-selling-
calculator` resolves via the `[slug]` route: the tool is registered in
`src/lib/calculators/registry.ts` with that slug. No prose reference to a link
that is not there.

---

## A9 - cost-of-moving-house-uk.md

**Verdict: CLEAN.** No edits made.

The move is clean in both directions. The three-bucket table now appears once,
under "Which moving costs are tax deductible?", and H2 #2 ("What does it cost to
sell your house?") carries no bucket or deductibility content at all: agent fee,
contract terms, sale solicitor, EPC, then a hand-off to the selling-side hub.

### Checks that passed

**Seams.** Both cross-references point the right way after the move. The intro
"the table below shows you every line in it" resolves to the itemised table
directly beneath it. The end of H2 #1, "Some of it comes off a tax bill now,
some is banked ... Which line does what is set out further down", is a forward
signpost to the relocated block, correct direction. Inside the block, "On the
itemised bill at the top of this page" points back at the itemised table, which
did not move. No stale "as we saw above", no mid-list sentence, no duplicated
bucket table.

**Figures.** All three bucket totals reconcile to the itemised table, which is
the stated base:

- Bucket 1, £4,944 = agent 4,164 + sale solicitor 700 + EPC 80 (the stated £80
  mid point of the £35-£120 range)
- Bucket 2, £6,513 = SDLT 4,663 + Land Registry 150 + survey 650 + purchase
  solicitor 1,050
- Bucket 3, £1,818 = mortgage fee 1,000 + valuation 150 + removals 550 +
  homebuyer insurance 78 + redirection 39.50, rounded
- Sum 13,275, matching the headline
- Downstream: £8,331 = 13,275 - 4,944; £5,534 = 4,944 + 550 + 39.50; £3,668 =
  8,331 - 4,663 with first-time buyer relief

Base stated near the figure and sourced: "the England average price of
£293,262", attributed in the source paragraph to the HM Land Registry UK House
Price Index for June 2026, with the England-only scope caveat on the stamp duty
and Land Registry lines. This differs from the pillar's £293,000 by design; the
pillar states its own base ("£293,000 on the Land Registry index") and already
reconciles the two, so no sibling conflict.

**Flow / CGT block.** One block, one link out
(`capital-gains-tax-property-complete-guide-uk`). The 60-day line is conditional
("Only where tax is actually due do a return and a payment follow"), and the
exchange-versus-completion example uses April/June, distinct from the pillar's
months. The fee order is in plain words throughout, never named as a statutory
instrument. The EPC hedge is applied in the bucket, not asserted bare.

**Counts.** Em/en-dashes 0. FAQs 13. metaTitle 47. metaDescription 149.
Frontmatter parses as YAML, 18 keys. Hard statute citations in prose 0.

**Links.** 17 internal hrefs, all resolve on disk, all blog categories match the
URL segment. Two external links (HM Land Registry UKHPI and the gov.uk fees
guidance) both carry `rel="nofollow noopener"`. No prose reference to a removed
link.

### Two observations, no action taken

1. The purchase-solicitor paragraph ("Your solicitor on the purchase costs about
   £1,050 ...") sits under the H2 "Do you need a survey?". It is buying-side
   cost content and reads as a leftover from the compound-H2 split rather than
   from the bucket-table move. The H2 does open on its own subject, so it passes
   the named check; moving the paragraph up into "What does it cost to buy the
   next one?" would be tidier but is not a deletion.
2. The EPC hedge "though no guidance names it either way" appears twice inside
   the CGT block, once in the bucket table cell and once in the closed-list
   paragraph eight lines below, plus once in the FAQs. Repetitive rather than
   wrong, and both instances came across in the move together. If it is to be
   trimmed to one, drop the clause from the table cell and keep the prose.

---

## Summary

| Page | Verdict | Residuals found | Fixed |
|---|---|---|---|
| A3 sell-house-without-estate-agent | must_fix | 2 (1 seam, 1 arithmetic) + 2 advisories | 1 |
| A9 cost-of-moving-house-uk | clean | 0 + 2 observations | 0 |

A3 cannot ship until the no-agent all-in range in the sale-cost table total row
is corrected to £875 to £2,110, or that sentence is dropped. Everything else on
both pages passes all five checks.
