# Track B editorial and claims QA: first-contract-outside-ir35

Reviewed 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a,
"QA" and "Writers". Sibling set for the sameness check: the four other Wave 1 rows in
`docs/contractors-ir35/_wave1/` (inside-ir35, ir35-contract-review, it-contractors,
umbrella-to-limited-company) and the seven live rows in
`contractors-ir35/web/src/data/contractor-types.ts`.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Named in words 44 to 70 ("That is the situation this page is written for: a professional going limited for the first time because a genuine outside IR35 engagement is about to begin"). Intro is 149 words in total. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | FAIL on arrival at 1,202. Fixed, now 1,196. |
| 3 | AI tells and stock openers | No "This page is for" opener. No "You get A, B and C" intro closer. Section bodies open four different ways in each of `challenges` and `howWeHelp`; no stock opener on consecutive items. One tic found and fixed: "behind it" as a title or clause tail three times ("the registrations behind it", "the working practices behind it", "the paperwork behind it"). |
| 4 | Sameness against the four siblings and the seven live rows | Two echoes of `umbrella-to-limited-company`, which is the nearest neighbour page: its howWeHelp title "Formation and the registrations, in order" against this page's "Company formation and the registrations behind it", and its "the working practices behind it" against this page's intro clause. Both reworded. No sentence on this page now appears on another row. Subject overlap (VAT decision, first dividend, salary target) is inherent to the two situations and the treatments differ: umbrella covers leaving an employment mid-assignment and P45 year-to-date carry-over, this page covers a first incorporation and the ordering of the registrations. The live rows are occupation pages (IT, engineering, finance, consultants, project managers, locums) and share no phrasing with this one. |
| 5 | "Your accountant prepares" as a house formula | Used mid-sentence once here and in four of the five sibling pages. Reworded here to keep the cluster from reading as one template. |
| 6 | Thin or padded sections | None. Challenge bodies 66 to 95 words, howWeHelp bodies 50 to 68, each carrying a distinct point. |
| 7 | FAQ answers: restating the question, under 40 or over 120 words | PASS. Five answers at 76, 74, 73, 91 and 81 words. Every answer opens with the answer, not a restatement. |
| 8 | Banned claims, case-insensitive: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, "advice"/"advise", turnaround promises | PASS, zero hits. The four occurrences of "cost" are the buyer's tax cost and the limited cost trader test, never a price. "Four to six weeks is comfortable" in FAQ 1 is the buyer's own lead time before a start date, not a promise about the firm's speed. |
| 9 | Em-dashes, British English, 2026/27 leads | PASS. No em-dash. British spellings throughout ("modelled", "labour", "honour"), no -ize forms. Every year-tagged figure is 2026/27 or carries its 6 April 2026 effective date; no superseded figure appears. |
| 10 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 42 and 157 characters. |
| 11 | Internal links: at most five, relative, on disk, `<a href="...">text</a>` | PASS. Four links, all relative, all in anchor form, all verified on disk by Track A (two blog posts under the `contractor-accounting-basics` category slug, two calculator tools). |
| 12 | Pipeline leakage | PASS. No brief, map, wave, agent, prompt or house-positions reference in any rendered field. The `sources` array is the template's non-rendered field and is the right place for its citations. |
| 13 | Sources array gaps carried over from Track A | Fixed. See edit 5. |

## Edit log

| # | Field | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro`, final sentence | "A specialist reviews the contract and the working practices behind it, sets the company up..." | "A specialist checks the contract against how the work will run, sets the company up..." | Echoed `umbrella-to-limited-company` ("the working practices behind it") and started the "behind it" tic. |
| 2 | `howWeHelp[0].title` | "Company formation and the registrations behind it" | "Company formation and the tax registrations" | Echoed the umbrella row's formation title; also trims 1 word. |
| 3 | `howWeHelp[0].body` | "Your accountant prepares each filing and tracks which references have landed, so you know..." | "Each registration is tracked until its reference lands, so you know..." | Breaks the "Your accountant prepares" formula shared with four sibling pages; trims 3 words. |
| 4 | `howWeHelp[3].title` | "The first dividend, with the paperwork behind it" | "The first dividend, and its paperwork" | Third "behind it"; trims 2 words. |
| 5 | `sources[7]` | HP §11 pensions, annual allowance £60,000, carry forward | HP §14 and CA 2006 Part 23: distributable profit, board minute and dividend voucher, director loan (CA 2006 s.830 and s.836, CTA 2010 s.455) | The §11 entry cited content the page does not carry; the distributable profit and director loan assertions (challenge 3, howWeHelp 4, FAQ 3) had no entry. Both gaps named by Track A. |

No figure, rate, date or rule was changed. No suspected factual errors found; Track A recorded none outstanding.

## Final state

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,196** (band 800 to 1,200).
- `metaTitle` 42 characters, `metaDescription` 157 characters.
- Intro 149 words, situation answered by word 70.
- JSON re-parsed after every edit, parses clean.

VERDICT: PASS
