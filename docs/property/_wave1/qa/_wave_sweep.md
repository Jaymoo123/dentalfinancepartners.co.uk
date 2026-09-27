# Wave 1 editorial sweep, fifteen Property audience pages

Date: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Scope: the fifteen `docs/property/_wave1/*.json` files only. No commit, no database, no code.
No figure, rate, date or rule was changed on any page.

## What changed, per page

| Page | Change |
|---|---|
| couples-splitting-rental-income | `howWeHelp2` opener varied off "Your accountant prepares" to "The comparison runs both ways". Intro closer already varied by its reviewer, left alone. |
| first-time-and-accidental-landlords | Intro closer off the "What follows is A, B and C" triad; `howWeHelp0` opener varied off "A specialist reviews"; `howWeHelp3` consent sentence removed and the item (previously a bare call to action) rewritten as a 58-word substantive point on the four facts that drive the page, title changed to "The four facts that settle the first return". |
| gifting-property-to-family | Intro closer off the "The result is A, B and C" triad; `howWeHelp3` opener varied off "Your accountant prepares", which also removed the shared sentence flagged in the sameness scan. |
| hmo-and-multi-let-landlords | Word count was 1,234, over the 1,200 band. Removed the licence-fee and unlicensed-penalty sentences from `challenges0` (both repeated verbatim in `faqs1`), the "which is why most buy to let landlords never claim" aside in `challenges3`, the superseded per-room banding sentence and the Northern Ireland rates line in `challenges2` (NI is still covered in `faqs0`), and the duplicated "A specialist reviews conversion invoices" sentence in `challenges0` (it repeats `howWeHelp0`). Link CTA reworded. |
| holiday-let-and-serviced-accommodation | `howWeHelp1` opener varied off "Your accountant prepares"; one redundant sentence cut from `challenges1` to hold the word band. |
| inherited-property | No change. Intro closer and openers already varied; invariants already clean. |
| landlord-retirement-and-succession | Intro closer reworded so it no longer shares the "That leaves..." construction with inherited-property. |
| landlord-self-assessment-and-mtd | Intro closer off the "You get A, B and C" triad. All three bare parenthesised paths converted to `<a href>` anchors: `/calculators/mtd-checker`, `/calculators/rental-income-tax-calculator`, `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-...`. This was the only page with non-anchor link syntax. |
| moving-property-into-a-limited-company | Intro closer off the "You get A, B and C" triad; `howWeHelp3` opener varied off "Your accountant prepares", which also removed the page's second same-opener item. |
| non-resident-landlords | No change. |
| portfolio-landlords-incorporating-a-partnership | `howWeHelp0` opener varied off "A specialist reviews"; `howWeHelp1` opener varied off "Your accountant prepares"; the section 162 claim deadline reworded in both `challenges2` and `faqs3` (same rule, different wording) to clear the nine shared sequences with moving-property-into-a-limited-company; one sentence cut from `challenges3` (repeated in `faqs4`) to hold the word band. |
| property-company-profit-extraction | `howWeHelp3` consent sentence removed and the item rewritten as a 55-word substantive point on the three figures the enquiry turns on, title changed to "What the enquiry needs from you". |
| property-spv-set-up | Intro closer off the "leaves you with A, B and C" triad; `howWeHelp0` opener varied off "A specialist reviews"; one sentence cut from `faqs4` to hold the word band. |
| rental-income-disclosure | Intro closer off the "You get A, B and C" triad. |
| selling-a-buy-to-let | Intro closer off the "You get A, B and C" triad. |

### Consent sentence

The consent wording appeared in exactly two `howWeHelp` bodies across the fifteen:
`first-time-and-accidental-landlords` item 4 and `property-company-profit-extraction`
item 4. Both are removed. The template renders the sentence itself in the entity block
(`PARTNER_NETWORK_SENTENCE`) and in the form, so the pages lose nothing. Both items were
call-to-action only once the sentence came out, so both were rewritten as substantive
points inside the 40 to 65 word band, drawn only from facts already on the same page
(no new figures, rules or claims).

### Repeated openers

Before: "Your accountant prepares" 12 bodies, "A specialist reviews" 8. After: 7 and 5.
No page now has two consecutive items with the same opener, and neither opener runs on
more than half the set. "A specialist from the partner network" appears twice and was
left as is.

### Link syntax and targets

Every internal link in every body string is now `<a href="/path">text</a>`. 46 distinct
hrefs across the set (67 anchors in total). All 46 were resolved on disk:

- blog hrefs against `Property/web/content/blog/<slug>.md` with the frontmatter category
  slugified by `Property/web/src/lib/blog.ts:slugifyCategory` (which maps `&` to `and`),
- calculator hrefs against `Property/web/src/app/calculators/*` and
  `Property/web/src/lib/calculators/tools/*.ts`, which is what the `GENERIC` array in
  `registry.ts` imports,
- `/services/non-resident-landlord` against `Property/web/src/app/services/`.

No broken target. The four bare paths remaining in `hmo-and-multi-let-landlords` sit in
the `sources` array, which the template does not render, and were left alone.

## Sameness scan

Method: all 8-word sequences across `intro`, `challenges`, `howWeHelp` and `faqs`
(titles and questions included), lower-cased, tags and punctuation stripped, compared for
every one of the 105 page pairs. Excluded as shared-by-design: the consent wording, and
statutory phrasing (Schedule 41 FA 2008, Law of Property Act 1925, FA 2003 Schedule 15,
CAA 2001 s.35, ITA 2007 s.836).

Before the sweep, three pairs exceeded two shared sequences:

| Pair | Shared | Cause | Fix |
|---|---|---|---|
| first-time-and-accidental-landlords / property-company-profit-extraction | 24 | the consent sentence in both | removed from both |
| moving-property-into-a-limited-company / portfolio-landlords-incorporating-a-partnership | 9 | the section 162 claim deadline, worded identically | reworded on portfolio (the lower-traffic page), twice, same rule |
| gifting-property-to-family / moving-property-into-a-limited-company | 3 | "the 60-day capital gains return where tax is due" | reworded on gifting (the lower-traffic page) |

After the sweep: **no pair shares more than two 8-word sequences.**

## Invariants after the sweep

| Page | Words | metaTitle | metaDescription | Links | All anchors |
|---|---:|---:|---:|---:|---|
| couples-splitting-rental-income | 1199 | 42 | 155 | 3 | yes |
| first-time-and-accidental-landlords | 1196 | 49 | 153 | 5 | yes |
| gifting-property-to-family | 1200 | 44 | 153 | 5 | yes |
| hmo-and-multi-let-landlords | 1194 | 48 | 159 | 4 | yes |
| holiday-let-and-serviced-accommodation | 1199 | 47 | 154 | 5 | yes |
| inherited-property | 1198 | 48 | 132 | 5 | yes |
| landlord-retirement-and-succession | 1193 | 44 | 154 | 4 | yes |
| landlord-self-assessment-and-mtd | 1197 | 45 | 157 | 3 | yes |
| moving-property-into-a-limited-company | 1194 | 46 | 147 | 4 | yes |
| non-resident-landlords | 1200 | 44 | 149 | 5 | yes |
| portfolio-landlords-incorporating-a-partnership | 1195 | 55 | 147 | 5 | yes |
| property-company-profit-extraction | 1199 | 45 | 157 | 4 | yes |
| property-spv-set-up | 1196 | 42 | 160 | 5 | yes |
| rental-income-disclosure | 1200 | 46 | 156 | 5 | yes |
| selling-a-buy-to-let | 1189 | 48 | 158 | 5 | yes |

All fifteen: words inside 800 to 1,200, metaTitle at or under 60, metaDescription at or
under 160, no em-dash anywhere in the file, JSON parses.

Banned claims: no hit on chartered, ICAEW, ACCA, CIOT, "our accountants", "we are
accountants", "our team", award, regulated, or any personal name. A substring scan raised
seven flags that were each read in context and are not claims: "price" and "prices" used
of property value, SDLT and mortgage pricing (gifting, hmo, inherited, retirement,
moving, spv), and "legal adviser" inside the list of allowable selling costs on
selling-a-buy-to-let. No firm pricing, no fee, no offer of advice anywhere in the set.

One defect was found and fixed that the per-page reviewers had passed:
`hmo-and-multi-let-landlords` was 1,234 words, over the band, before this sweep.

## VERDICT: READY

All fifteen pages meet every S4a invariant, no pair exceeds two shared sequences, every
internal link is an anchor resolving to a real target, and the consent sentence no longer
appears in any row body. Nothing is committed and nothing is deployed.
