# Track B editorial and claims QA: non-resident-landlords

File: `docs/property/_wave1/non-resident-landlords.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a (QA, Writers).
Track A (`non-resident-landlords.factual.md`) PASSED with 6 edits; all six are kept intact.
Reviewed 2026-09-27.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 123 words total and the buyer's situation is named in sentence 1, with the three opening checks by word 100. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs | PASS. 1,197 words after edits (1,200 before; the two edits net minus 3). Nothing padded to hold the band. |
| 3 | AI tells and sameness across the 15 siblings | One real duplicate found and fixed (edit 1). "This page is for you", the "You get A, B and C" triad and listicle rhythm are absent from this page. No repeated sentence template with a sibling beyond the fixed one. Detail below. |
| 4 | Thin or padded sections, FAQ answers restating the question, answers under 40 or over 120 words | PASS. FAQ answers 71, 64, 70, 64, 67 words, all inside band. No answer restates its question; each opens with the position (Tell your agent / It depends / Yes / Not necessarily / It is a common starting point). Every challenge and howWeHelp item carries its own rule or mechanism; none is filler. |
| 5 | Banned claims, case-insensitive | PASS. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal name, price or fee, "advice"/"advise", turnaround promise. "Approval usually takes around six weeks" is HMRC's processing time for NRL approval (hp 17.5), not a promise about the firm, so it stands. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spelling throughout. The only tax year quoted in the body is 2026/27 (challenges 2). |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 44 and 149. |
| 8 | Internal links: at most five, relative, exist on disk, anchor markup | PASS after edit 2. Exactly five, all relative, all now `<a href="...">text</a>`. All five verified on disk (see below). |
| 9 | Pipeline leakage | PASS. No brief text, no placeholder, no instruction residue, no map or house_positions reference in rendered fields. `sources` is the non-rendered trailing array the spec requires. |

### Sameness detail

- `intro`, before: "A specialist from the partner network starts with three things:". This is the same
  template as `holiday-let-and-serviced-accommodation` ("A specialist from our partner network starts
  with three things:") and close to `moving-property-into-a-limited-company` ("A specialist from the
  partner network starts with..."). "from our/the partner network" also appears in
  `landlord-self-assessment-and-mtd`, `property-spv-set-up` and `selling-a-buy-to-let`. Fixed at
  edit 1, which removes both the duplicated opener and one instance of the repeated network phrase.
- Closing sentence: this page ends the intro on "What comes back is a written position: ...", not the
  wave's "You get A, B and C" triad. No change needed.
- Challenge and FAQ headings are situation-specific and share no template with a sibling.

### Links verified on disk

- `/services/non-resident-landlord` -> `Property/web/src/app/services/non-resident-landlord/` EXISTS
- `/calculators/rental-income-tax-calculator` -> `Property/web/src/lib/calculators/registry.ts` EXISTS
- `/calculators/capital-gains-tax-calculator` -> `Property/web/src/lib/calculators/registry.ts` EXISTS
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` -> `Property/web/content/blog/uk-property-income-expats-tax-obligations-explained.md` EXISTS
- `/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide` -> `Property/web/content/blog/non-resident-cgt-selling-uk-property-overseas-guide.md` EXISTS

### Suspected factual errors

None. No figure, rate, date or rule was changed by this track.

## Edit log

1. `intro`: "A specialist from the partner network starts with three things:" ->
   "A specialist settles the residence position first:". Sameness fix: removes a template duplicated
   verbatim in `holiday-let-and-serviced-accommodation` and near-verbatim in
   `moving-property-into-a-limited-company`, and one use of the wave-wide "from the partner network".
   No claim changed; the three checks that follow are untouched.
2. All five internal links converted from markdown to anchors, wording unchanged:
   `[non-resident landlord service page](/services/non-resident-landlord)`,
   `[rental income tax calculator](/calculators/rental-income-tax-calculator)`,
   `[expat obligation map](/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained)`,
   `[capital gains tax calculator](/calculators/capital-gains-tax-calculator)`,
   `[full guide to non-resident CGT](/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide)`
   -> `<a href="...">text</a>`.

No other edit. Track A's six edits are all present and unaltered.

## Final measurements

- Body word count (intro + challenges + howWeHelp + faqs, tags stripped): 1,197
- Intro: 123 words, situation answered in sentence 1
- `metaTitle`: 44 characters. `metaDescription`: 149 characters
- Internal links: 5, all anchors, all resolve on disk
- JSON re-parsed clean after the edits

VERDICT: PASS
