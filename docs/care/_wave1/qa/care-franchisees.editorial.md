# Editorial and claims QA (Track B): care-franchisees

File: `docs/care/_wave1/care-franchisees.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers")
Sibling checked for sameness: `docs/care/_wave1/self-employed-carers-and-personal-assistants.json`, plus the live rows in `care/web/src/data/care-hubs.ts`.
Reviewed 2026-09-27. Track A passed with 0 edits.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. The whole intro is 124 words; the franchisee's dual position, the CQC duty and the fee treatment all land in the first four sentences. |
| 2 | Word band 800 to 1,200 (intro, challenges, howWeHelp, faqs, titles and questions included) | PASS. 1,195. |
| 3 | AI tells and sameness | ONE DEFECT, FIXED. See edit 1. |
| 4 | Thin or padded sections, FAQ answer length, answers restating the question | PASS. Bodies 52 to 86 words, FAQ answers 65 to 75 words, all inside 40 to 120. No answer restates its question; every one opens on the answer. |
| 5 | Banned claims, case-insensitive | PASS. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, personal name, franchisor brand name, price or fee amount, "advice"/"advise", turnaround promise. "Regulated" appears three times, each in the statutory phrase "regulated activity" (HSCA 2008), which is the allowed statutory use. |
| 6 | No em-dash, British English, current-year leads | PASS. No em-dash, no en-dash. No Americanised spellings. Rates lead on 6 April 2026 and 1 April 2026; no stale year label. |
| 7 | Meta lengths | PASS. `metaTitle` 47 of 60. `metaDescription` 152 of 160. |
| 8 | Internal links: at most five, relative, on disk, all `<a href>` anchors | PASS. Five, all anchors. `/for/care-startups` (`care/web/src/data/care-hubs.ts`), `/services/start-a-domiciliary-care-agency`, `/services/care-payroll`, `/services/selling-a-care-home` (all `care/web/src/data/care-services.ts`), `/calculators/true-cost-care-hour-calculator` (`care/web/src/lib/calculators/tools/true-cost-care-hour.ts`). Three external gov.uk and CQC links are not counted against the internal cap. |
| 9 | Pipeline leakage | PASS. No house-positions references, wave numbers, map or spec language in any rendered field. The `sources` array is the non-rendered trailing field the template ignores. |

## Findings

1. **Stock opener, howWeHelp item 2.** The body opened "Your accountant prepares the projections", one of the two openers the spec names by hand. The sibling page already opens its first howWeHelp item with "A specialist reviews", so the pattern was becoming the site's default voice. Fixed.
2. **Title did not match its body, challenge 3.** "Two fee lines run in opposite directions" promised two fee lines, but the second half of the body is about the VAT exemption making the fee stick, not a second fee. An abstract paired-concept title over a body that does not deliver it is the sameness tell the spec is after. Retitled to describe what the section says. Fixed.

Nothing else. The four challenge titles are concrete and differently shaped, the four howWeHelp titles are activity-named rather than benefit-named, the intro does not use the "You get A, B and C" closer, and no consecutive items share an opening construction.

No suspected factual errors. No figure, rate, date or rule was changed.

## Edit log

| # | Location | Before | After |
|---|---|---|---|
| 1 | `howWeHelp[1].body` | "Your accountant prepares the projections and the financial viability statement the registration needs, in the form CQC asks for, and registers the company for corporation tax and PAYE before your first shift." | "The projections and the financial viability statement the registration needs are prepared in the form CQC asks for, and the company is registered for corporation tax and PAYE before your first shift." |
| 2 | `challenges[2].title` | "Two fee lines run in opposite directions" | "The recurring fee, and the VAT that sticks to it" |

2 edits. No change to any figure, rate, date, rule, link or source.

## Final state

- Word count: 1,195 (band 800 to 1,200).
- `metaTitle` 47 chars. `metaDescription` 152 chars.
- JSON re-validated, parses.

VERDICT: PASS
