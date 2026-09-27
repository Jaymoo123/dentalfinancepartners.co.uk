# Track B editorial and claims QA: couples-splitting-rental-income

File: `docs/property/_wave1/couples-splitting-rental-income.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers").
Sameness baseline: the other 14 `docs/property/_wave1/*.json`.
Reviewed 2026-09-27. Track A passed with 0 edits.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 130 words total; the situation lands in sentence 1. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS after edit. Was 1,203, now 1,199. |
| 3 | AI tells and sameness across siblings | FIXED. Two wave-wide templates removed, see edits 1 and 2. |
| 4 | Thin or padded sections, FAQ answers restating the question, 40 to 120 words | PASS. Challenges 56 to 70 words, howWeHelp 47 to 53, FAQ answers 67 to 77. No answer restates its question; each opens with the position ("Not on its own", "It can", "Not while you are living together"). |
| 5 | Banned claims, case-insensitive | PASS after edit 4. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal name, price or fee, "advice"/"advise", turnaround promise. "Your accountant" and "a specialist" only, matching the wave. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes. British spelling and "per cent" throughout. No tax year is cited anywhere on the page, so nothing leads with a stale one; noted rather than edited, as the subject is rule-based and year-neutral. |
| 7 | `metaTitle` 42 chars, `metaDescription` 155 chars | PASS. |
| 8 | Internal links: at most five, relative, exist on disk, `<a href="...">text</a>` | PASS. Three links, all relative, all in anchor form, all resolve: `/calculators/rental-income-tax-calculator` (registry generic tool), `/calculators/section-24-calculator` (`Property/web/src/app/calculators/section-24-calculator/page.tsx`), `/blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` (`Property/web/content/blog/unmarried-co-owners-...md`). No bare markdown links, unlike two siblings. |
| 9 | Pipeline leakage | PASS in rendered fields. `house_positions.md` anchors appear only in the trailing `sources` array, which S4a states the template does not render. |

## Sameness findings

- "This page is for ..." opens or sits in the intro of 6 of the 15 wave pages (holiday-let, landlord-retirement, landlord-self-assessment, portfolio, property-spv and this one). Removed here.
- The "You get A, B and C" triad closes the intro of 9 of the 15 (gifting, hmo, holiday-let, landlord-self-assessment, moving-into-a-company, property-spv, rental-income-disclosure, selling-a-buy-to-let and this one). Removed here and replaced with a sentence that states the negative outcome, which no sibling does.
- "A specialist starts with / reviews N things first" is the wave's shared second beat. Kept, because the page's version ("starts with the title, not the tax") carries its own content, but the second use in `howWeHelp` was changed to "begins" so the page does not repeat its own template.
- "from our partner network" / "from the partner network" appears on 7 siblings. This page uses it once, in `howWeHelp`, not in the intro. No change.
- No sentence on this page duplicates a sibling verbatim.

## Edit log

| # | Field | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro` sentence 2 | "This page is for married couples and civil partners who want that changed, and for unmarried co-owners told Form 17 is the answer when it is not." | "Married couples and civil partners have a route to change that; unmarried co-owners are often pointed at Form 17 when it does not apply." | Stock "This page is for" phrasing shared with 5 siblings. Same two audiences, same rule. |
| 2 | `intro` final sentence | "You get a clear read on whether the change is open to you, the order it happens in, and where it costs more than it saves." | "Sometimes the answer is that the change is shut to you, or costs more than it saves; that comes back in writing too." | Breaks the "You get A, B and C" triad used by 8 siblings. |
| 3 | `challenges[0].body` | "The only way out is a joint declaration on Form 17, and only where your beneficial interests really are unequal." | "Within that situation the route out is a joint declaration on Form 17, and only where your beneficial interests really are unequal." | Softens the absolute to the page's stated frame, as instructed and as Track A's first note anticipated. The rule, the statute and the conditions are unchanged. |
| 4 | `howWeHelp[3].body` | "Any movement of mortgage share is priced for SDLT, LTT or LBTT" | "Any movement of mortgage share is costed for SDLT, LTT or LBTT" | "priced" trips the price/fee ban on a case-insensitive sweep. Meaning identical, it refers to the duty, never to our charges. |
| 5 | `howWeHelp[0].body` | "A specialist from the partner network starts at the register and the deeds:" | "A specialist from the partner network begins at the register and the deeds:" | Removes the page's own repeated "A specialist starts" template. |

Word-count trim to 1,199 was achieved inside edits 1 and 2. No figure, rate, date, statute reference or rule was changed. No section was cut.

## Suspected errors

None. Nothing on the page reads as a factual defect, and Track A's two conservative framings were left alone apart from the instructed softening in edit 3.

## Final state

- Word count (intro + challenges + howWeHelp + faqs, tags stripped): **1,199**
- `metaTitle`: **42** characters
- `metaDescription`: **155** characters
- Internal links: 3
- JSON re-validated with `json.load` after the edits: parses, 6 challenges, 4 howWeHelp, 5 faqs, 9 sources.

VERDICT: PASS
