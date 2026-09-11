---
slug: alcohol-duty
tier: blog
category: "Licensed Trade"
route: /blog/licensed-trade/alcohol-duty
intent: DIY-INFORMATIONAL head-term pillar. The operator pricing a drinks list or modelling GP% wants the rate table, then wants to know which reduced rate they can reach. Feeds /services/hospitality-vat and the pubs hub.
---

# Blog: Alcohol duty, the 2026/27 rates and the two reliefs that change them

> Wave-3 high-street mechanic asset. PILLAR. Body references "the business" / "operators". CTA and brand come from config, never body copy. No em-dashes. Faceless authority. Raw-HTML body below YAML frontmatter. Quote every frontmatter value containing a colon followed by a space.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

These phrasings are the pick's `covers` array, verbatim. They are binding. Every one must appear naturally somewhere on this page, in a heading, in body prose or in an FAQ question, in the words a person would actually write. **None of them may be split out into a separate page.** Google returns substantially the same results for all of them; two of our URLs chasing one result set is cannibalisation and the house rule forbids it. If you believe a phrasing does not belong, raise a flag in the Q&A file and keep writing.

```
alcohol duty
alcohol duty budget
new alcohol duty rates uk 2025
alcohol duty increase 2026
excise duty alcohol
```

Head query: `alcohol duty`. Volume 4,160/mo. Mechanic: excise-duty. Pillar of "Alcohol and excise duty".

Note on the fifth phrasing: `excise duty alcohol` arrived here from the dropped pick `excise-duty-alcohol`, which Stage 1b killed as a CONFLICT (a synonym re-ordering, not a separate intent). This page owns it. Do not write a separate excise duty page and do not suggest one.

Note on the third phrasing: `new alcohol duty rates uk 2025` is a query people type, not a claim we make. Answer it honestly in an FAQ: the rates that applied in 2025 have been superseded by the 1 February 2026 uprating, and here are the current ones. Do not publish a 2025 rate table.

## Asset type + play

Rate-table-led pillar. The wedge against every competitor page on this term is that they publish the table and stop. This page publishes the table and then answers the two questions an operator actually has next: which of my products reach a reduced rate, and where does the duty sit in my cost of goods. The second one is the commercial hook, because a hospitality operator normally buys duty-paid, so the duty is embedded in the wholesale price rather than separately accounted for, and most content never says so.

Second wedge: the date. Alcohol duty uprates on **1 February**, not 6 April. Nearly every competing page implies tax-year timing. Saying it plainly, and saying that the current rates expire on 1 February 2027 inside the tax year, is a correctness signal no one else carries.

## Dedup evidence (MANDATORY)

- **Own site, `draught-relief-explained.md` (Licensed Trade)**: cannibalisation verdict was LINK, not merge. That page is a GP-and-pricing piece about one sub-rate. This page is the parent rate explainer covering the whole strength-based structure, all five duty bands, small producer relief and the excise category. Rule: this page states the draught rates because they belong in the rate table, then sends pricing and GP% modelling down to the draught page rather than re-deriving it. Draught relief must link back up to this page as the parent.
- **Own site, `awrs-checks.md` (Licensed Trade)**: that page is wholesaler due diligence. This page mentions AWRS in one sentence, in the context of buying duty-paid stock, and links. No overlap.
- **Generalist site (Holloway Davies)**: fenced out. Generalist pages do not author alcohol duty, duty stamps, Small Producer Relief or draught relief (generalist HP 21.9.7). This is hospitality's excise ground exclusively. No collision possible.
- **Dropped pick `excise-duty-alcohol`**: folded into this page's covers. No second URL.

## Required structure (H2 skeleton)

The boundary table never opens the page. Open in prose.

1. **First 60 words, the answer.** Alcohol duty is charged on the pure alcohol in the product, at a rate set by strength, under the single structure that replaced the separate beer, cider, wine and spirits regimes. The current rates took effect on 1 February 2026 and run until the next uprating on 1 February 2027. Two reliefs cut the rate: draught relief and small producer relief.
2. **The rule and its source.** Finance (No. 2) Act 2023 Part 2. Charged per litre of pure alcohol, by strength band, across all categories. Explain the litres-of-pure-alcohol arithmetic once, plainly.
3. **The 2026/27 rate table.** All bands (see figures section). Head it so the reader can see it is dated and knows when it expires.
4. **BOUNDARY TABLE: standard rate against reduced rate.** See the dedicated section below. This is the load-bearing section.
5. **Draught relief: the two conditions, and why a 20 litre container alone is not enough.** Then link down to `draught-relief-explained` for pricing.
6. **Small producer relief.** Under 8.5% ABV, small production premises, 4,500 hectolitres or less of pure alcohol in the production year (1 February to 31 January), not produced under licence. The cash discount rose at the 1 February 2026 uprating to hold its relative value.
7. **Where alcohol duty sits inside excise duty.** One short section. Excise duty is the umbrella covering alcohol, tobacco, hydrocarbon oils and biofuels, gambling duties and the Climate Change Levy. Alcohol duty is one of them. This is where `excise duty alcohol` is answered. No separate rate table, no separate page.
8. **What this actually costs you: duty in the cost of goods.** The operator buys duty-paid; the duty is inside the wholesale invoice price, not a separate ledger line. Explain what that means when the rate moves.
9. **Worked examples.** Two or three, named to a trade, with real figures.
10. **What people get wrong.** The dates section. See the misconception list below.
11. **FAQ block, 10 to 14 FAQs**, carrying the leftover covered phrasings in the words people typed.
12. **Links out.**

No calculator on this page. The answer depends on the operator's actual product ABVs and container formats, and a wrong number here is a pricing error. Send them to the draught page and the service.

## BOUNDARY TABLE (explicit spec, load-bearing)

Two columns: **"Standard rate applies"** against **"A reduced rate applies"**. Each row is one trade sitting on both sides of the line, so the reader sees what changes the rate. Minimum four row pairs, all trade-anchored:

| Standard rate applies | A reduced rate applies |
|---|---|
| A pub's 4.2% ABV bottled pale ale from the fridge, packaged, £22.58 per litre of pure alcohol | The same pub's 4.2% ABV cask pale ale on the hand pull, in a 72 pint cask connected to the bar dispense, £19.45 |
| A bar's 4.5% ABV still cider in 500ml bottles, £22.58 band pricing at the packaged rate for its category | The same bar's 4.5% ABV still cider in a 20 litre keg on a gas dispense tap, £8.95 |
| A restaurant's 12% ABV house red by the bottle, £26.61, no draught route at that strength | The same restaurant's 5.5% ABV keg session beer on tap, £19.45, because it is under 8.5% and on a qualifying system |
| A micro-brewery taproom's 9% ABV imperial stout, £30.62, above the 8.5% ABV ceiling so no draught relief at any container size | The same taproom's 4% ABV core keg beer, £19.45 draught rate, and a further small producer discount if the brewery is under 4,500 hectolitres |
| A festival bar's 20 litre bag-in-box sold for customers to self-pour, no qualifying dispense system, standard rate | The same 20 litre container connected to a pump or gas pressurised drinks tap, draught relief available |

That last pair is the one no competitor has. Keep it.

## Worked examples (two or three, trade-named, real figures)

- A pub buying a 50 litre keg of 4.2% ABV beer. Pure alcohol = 50 × 4.2% = 2.1 litres. At the draught rate of £19.45 that is £40.85 of duty in the keg. At the packaged rate of £22.58 it would be £47.42. Difference £6.57 per keg, roughly 88 pints, so about 7.5p a pint.
- The same pub's 4.5% ABV still cider, 20 litre keg on a gas dispense tap. Pure alcohol = 0.9 litres. At £8.95 that is £8.06 of duty. Show the contrast against the same cider bottled.
- A restaurant's 12% ABV wine, 75cl bottle. Pure alcohol = 0.09 litres. At £26.61 that is £2.39 of duty per bottle. Name it so a reader pricing a wine list can check their own.

Arithmetic must be shown, not asserted. Round to the penny and say you rounded.

## Figures mapped to HP + ledger

Every figure below is anchored. Do not state any alcohol duty figure not on this list.

| Figure | Anchor | Cite |
|---|---|---|
| Draught rate £19.45/litre pure alcohol, beer, spirits, wine and other fermented products, 3.5% to below 8.5% ABV | HP 16; ledger `draught_relief_beer_wine_spirits_3p5_to_8p5_abv`, applies_from 2026-02-01 | https://www.gov.uk/guidance/alcohol-duty-rates |
| Draught rate £8.95/litre, still cider and sparkling cider 3.5% to 5.5% ABV | HP 16; ledger `draught_relief_still_cider_3p5_to_8p5_abv`, applies_from 2026-02-01 | same |
| Packaged beer £22.58/litre, 3.5% to 8.4% ABV | HP 16; ledger `packaged_beer_duty_3p5_to_8p4_abv`, applies_from 2026-02-01 | same |
| Below 1.2% ABV: nil duty | HP 16 ("Products below 1.2% ABV attract zero duty") | same |
| Draught relief conditions: under 8.5% ABV AND large draught container of at least 20 litres AND incorporating or designed to connect to a qualifying dispense system (pressurised gas or pump) | HP 16, as corrected 2026-09-11; Stage 1b anchor 3 | F(No.2)A 2023 Part 2 Chapter 2 s.51, https://www.legislation.gov.uk/ukpga/2023/30/part/2/chapter/2 and https://www.gov.uk/guidance/check-if-you-can-pay-less-alcohol-duty-on-draught-products |
| Small producer relief: under 8.5% ABV, small production premises, 4,500 hectolitres or less of pure alcohol in the production year 1 Feb to 31 Jan, not produced under licence | Stage 1b anchor 3 | F(No.2)A 2023 Part 2 Chapter 3 ss.54-59, https://www.legislation.gov.uk/ukpga/2023/30/part/2/chapter/3 and https://www.gov.uk/guidance/check-if-youre-eligible-for-small-producer-relief-on-alcohol-duty |
| Rates effective on and after 1 February 2026; uprating cadence is 1 February; next window 1 February 2027 | Stage 1b anchor 3; HP 16 as corrected | https://www.gov.uk/government/publications/alcohol-duty-rates-change/alcohol-duty-uprating |
| Single strength-based structure since 1 August 2023, replacing separate beer, cider, wine and spirits regimes | Stage 1b anchor 4 | https://www.gov.uk/government/publications/reform-of-the-alcohol-duty-system/reform-of-alcohol-duty-rates-and-reliefs |
| Excise duty covers alcohol, tobacco, hydrocarbon oils and biofuels, gambling duties, Climate Change Levy | Stage 1b anchor 4 | https://www.gov.uk/government/publications/excise-tax-types-excise-duty-rates-and-supplementary-guidance/goods-liable-to-excise-duty |
| AWRS: buyer must verify the wholesaler's URN and keep records | HP 15 | https://www.gov.uk/guidance/the-alcohol-wholesaler-registration-scheme-awrs |

**Standard rates not in HP or the ledger but confirmed in Stage 1b anchor 3.** These may be stated because they are locked in the verified draft, and each must cite https://www.gov.uk/guidance/alcohol-duty-rates inline:
- below 1.2% ABV: nil
- 1.2% to below 3.5% ABV: £9.96, all categories
- 3.5% to below 8.5% ABV: £22.58 beer; £10.39 still cider and sparkling cider up to 5.5%; £26.61 spirits, wine and other fermented products, and sparkling cider 5.6% to 8.4%
- 8.5% to 22% ABV: £30.62, all categories
- above 22% ABV: £33.99, all categories
- draught 1.2% to below 3.5% ABV: £8.58

## HP GAPS (do NOT invent, omit or link out)

1. **No single draught relief discount percentage exists.** GOV.UK does not publish one. Stage 1b anchor 3 says so explicitly. Express draught relief as reduced rates and as a per-pint pence figure you derived on the page. Never write "draught relief gives you X% off".
2. **The cash value of the small producer relief discount is not locked.** We know the discount rose at the 1 February 2026 uprating to maintain its relative value. We do not have the tapered discount figures. Describe SPR qualitatively and link https://www.gov.uk/guidance/check-if-youre-eligible-for-small-producer-relief-on-alcohol-duty for the reader to compute their own. Do not publish an SPR rate or a taper formula.
3. **No Budget forecast.** The covered phrasing `alcohol duty budget` is answered by explaining the uprating mechanism and its 1 February cadence, not by predicting a future Budget. Never state a rate that has not taken effect.
4. **2025 rate table: omit.** Answer `new alcohol duty rates uk 2025` by saying those rates were superseded on 1 February 2026 and giving the current ones. We hold no verified 2025 table and must not reconstruct one.
5. **Duty stamps, duty suspension mechanics and the excise duty point** are not house positions. One neutral explanatory sentence is the ceiling: a hospitality operator normally buys duty-paid so the duty is embedded in the wholesale price. No procedural detail.
6. **Scotland, Wales and Northern Ireland**: alcohol duty is a UK-wide excise duty, so no devolution flag is needed on the duty itself. Do not confuse it with licensing, which is devolved. If licensing is mentioned at all, flag that Scotland operates a separate regime.

## What people get wrong (the section no competitor writes)

Each of these is verified wrong. Write them as the errors they are.

- "Alcohol duty rates run from the start of the tax year." They uprate on 1 February. The current rates took effect 1 February 2026 and expire 1 February 2027, inside 2026/27.
- "These have been the rates since August 2023." The strength-based structure dates from 1 August 2023. The cash rates do not. Quoting 2023 rates today understates your cost.
- "Any 20 litre container gets draught relief." Necessary but not sufficient. It must also incorporate or be designed to connect to a qualifying dispense system. A 20 litre bag-in-box sold for self-pour does not qualify.
- "Repackaging into smaller containers keeps the relief." It does not. Repackaging out of a draught container loses it.
- "Alcohol duty and excise duty are two different taxes." Alcohol duty is one excise duty among several.
- "Small producer relief is the old small brewers relief." It replaced and extended it from 1 August 2023 to all producers meeting the criteria, not just brewers.

## Internal links (all verified to exist)

**Out of this page:**
- `/blog/licensed-trade/draught-relief-explained` (the sub-rate, for GP% and pricing). Required, bidirectional.
- `/blog/licensed-trade/awrs-checks` (buying duty-paid stock from an approved wholesaler).
- `/blog/hospitality-accounts/gross-profit-menu-pricing` (where the duty lands in GP%).
- `/for/pubs-and-bars`
- `/services/hospitality-vat` (the hire path).

**Into this page (the conductor adds these, name them so they are not missed):**
- `draught-relief-explained.md` must gain an "up" link to this page as the parent rate explainer.
- `awrs-checks.md` should link across.

## Body length

**PILLAR: 3,500 to 4,500 body words.** Frontmatter does not count.

## Meta

- title: quote it. Contains a colon.
- metaTitle (<= 60 chars), must contain "Alcohol Duty".
- metaDescription (<= 155 chars), must carry the 1 February 2026 date. That date is the differentiator.
- h1: the dominant phrasing verbatim, so it must open with "Alcohol Duty". Not a cleverer version.
- category: `Licensed Trade` (existing, do not invent).
- FAQ count in frontmatter must equal the number of FAQs on the page. Target 10 to 14.
