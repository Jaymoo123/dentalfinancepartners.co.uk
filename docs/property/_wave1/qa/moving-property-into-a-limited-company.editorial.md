# Track B editorial and claims QA: moving-property-into-a-limited-company

File: `docs/property/_wave1/moving-property-into-a-limited-company.json`
Reviewed 2026-09-27, after Track A PASS (`...factual.md`, 1 edit to `sources[1]` only). No figure,
rate, date or rule touched here.

## Findings

1. **Buyer's situation, first 150 words of `intro`.** PASS. Intro is 115 words, so the whole of it
   is inside the window: who it is for (owns buy-to-lets personally, weighing a company), what a
   specialist looks at first (values and debt, how the lettings are run, the lender), what the
   reader gets (modelled cost of entry, written view of the route, the points HMRC would test).
2. **Word band.** Was 1,197. After the link markup and the trims below: 1,199. Inside 800 to 1,200.
   Nothing padded to reach it.
3. **Sameness across the other 14 wave-1 pages.** Two tells found and fixed:
   - "This page is for you if you..." also opens `holiday-let-and-serviced-accommodation` and, in a
     near variant, `property-spv-set-up`. Rewritten to direct address, which is what 12 of the 15
     pages do.
   - "A specialist ... three things" also appears in `gifting-property-to-family` ("reviews three
     things first"). The count is dropped here; the three items still read as a list.
   - "A specialist from our partner network" also appears in `property-company-profit-extraction`.
     Softened to "from the partner network". The closing "You get ..." sentence is the house
     pattern the spec asks for (what the reader gets) and was left.
   No "in today's", no "it's important to note", no rhetorical question headings (checked all 9
   `challenges` and `howWeHelp` titles), no listicle rhythm.
4. **Thin or padded sections, FAQ answers.** None thin. Five FAQ answers at 79, 77, 65, 69 and 69
   words, all inside 40 to 120, and none restates its question. Challenge and howWeHelp bodies run
   55 to 80 words each.
5. **Banned claims, case-insensitive sweep.** No "chartered", ICAEW, ACCA, CIOT, "our accountants",
   "we are accountants", "our team", "award", "regulated", no personal name, no price or fee of
   ours, no "advice" or "advise", no turnaround promise. Three near hits checked and cleared:
   "personal guarantee" and "arrangement fees" are the lender's costs with no figure attached;
   "Companies House are quick" is a description of a statutory step, not a promise by the firm.
   "Your accountant prepares" (twice) is the wording already used on four sibling pages and reads as
   the introduced firm, not a claim to be one, so it stands.
6. **Em-dashes, British English, tax year.** None. British spelling throughout. 2026/27 leads; the
   only forward year is the enacted 6 April 2027 change, which Track A verified.
7. **Meta.** `metaTitle` 46 chars, `metaDescription` 147 chars. Both describe the page for a search
   result rather than sloganeering. No change.
8. **Internal links.** Four, under the cap of five, all relative, all verified on disk:
   `Property/web/src/app/calculators/stamp-duty-calculator`,
   `.../incorporation-cost-calculator` (both also in `registry.ts`),
   `Property/web/content/blog/2027-tax-rates-incorporation-decision-property-landlords.md`,
   `Property/web/content/blog/how-to-transfer-property-into-limited-company-uk.md`.
   **Defect fixed:** all four were bare path text, neither anchors nor markdown, so they would have
   rendered as visible URLs. `Property/web/src/app/for/[slug]/page.tsx` renders `intro`, the cards
   and the FAQ answers as raw HTML (`dangerouslySetInnerHTML` / `html` props), so markdown would not
   resolve. All four converted to `<a href="...">`, consistent within the file.
9. **Pipeline leakage.** None. No section ids, no "verify at build", no TODO.

## Edit log

| # | Where | Edit | Reason |
|---|---|---|---|
| 1 | `intro` | "This page is for you if you already own buy-to-lets..." to "You already own buy-to-lets..." | shared opener with two sibling pages |
| 2 | `intro` | "You are not asking what a company is. You are asking whether" to "The real question is whether" | template filler, and it bought back the words the link markup cost |
| 3 | `intro` | "A specialist from our partner network starts with three things:" to "A specialist from the partner network starts with" | duplicate phrasing with two sibling pages |
| 4 | `challenges[0]` | bare `/calculators/stamp-duty-calculator` wrapped as an anchor, "stamp duty calculator" | bare URL would render as text |
| 5 | `howWeHelp[0]` | bare `/calculators/incorporation-cost-calculator` wrapped as an anchor | same |
| 6 | `faqs[3]` | bare blog path wrapped as an anchor, "the 2027 rates and the incorporation decision" | same |
| 7 | `faqs[4]` | bare blog path wrapped as an anchor, "step-by-step transfer sequence" | same |

Total edits: 7.

## Noted, not edited

- **Not a Track B call, for the integrator.** `StatsCounter` in the `for/[slug]` template does
  `Number(s.value) || 0`, so the two range stats ("18% / 24%" and "22% / 42% / 47%") would count to
  zero rather than render as written. This affects every wave-1 page with a range stat, not just
  this one.
- No figure, rate, date or rule looked wrong. Nothing referred back to Track A.

Final word count (intro + challenges + howWeHelp + faqs): **1,199**.
metaTitle 46 chars. metaDescription 147 chars. JSON re-parsed clean after the edits.

VERDICT: PASS
