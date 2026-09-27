# Track B editorial and claims QA - selling-a-buy-to-let

Page: `docs/property/_wave1/selling-a-buy-to-let.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a (row shape, QA, Writers).
Date: 2026-09-27. Reviewer: QA Track B (Opus). Track A PASSED, its edit preserved.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Buyer's situation answered in first 150 words of `intro` | PASS. Sentence 1 names the situation (selling a buy-to-let or a former let home) and the question (who to contact about CGT); the 60-day rule, the three things checked first and the deliverable all land inside 113 words. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs | PASS. 1,190 after the two edits below (was 1,199). Nothing added, so no trim was needed. |
| 3 | AI tells and sameness across the other 14 wave 1 pages | Two found and fixed, see edit log. One wave-level pattern noted below, not edited. |
| 4 | Thin or padded sections | PASS. Challenge bodies 67 to 91 words, howWeHelp 45 to 56, all carrying distinct substance. No section restates another. |
| 5 | FAQ answers: not restating the question, 40 to 120 words | PASS. All five answer first ("Not if you are...", "The earlier one.", "The sale commission yes, the early repayment charge no."). Lengths 69 / 68 / 74 / 67 / 77. |
| 6 | Banned claims, case-insensitive | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal name / price / fee for our work / turnaround promise. Note: "legal adviser" and "professional fees" appear only inside the statutory closed list of deductible selling costs, and "advertising" inside the same list. No instance of advice or advise as something the page offers. |
| 7 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout. The rates, allowance and stat block lead on 2026/27. |
| 8 | Meta lengths, written for the search result | PASS. `metaTitle` 48 chars, `metaDescription` 158 chars. The description opens on the reader's situation and names the three deliverables. |
| 9 | Internal links | PASS. Four links, all relative, all verified on disk by Track A (one calculator in `registry.ts`, three blog posts under `Property/web/content/blog/`). Consistent `<a href="...">` syntax throughout, no mixed markdown. |
| 10 | Pipeline leakage | PASS. No "verify at build", no section-sign references, no HP anchors, no TODO in rendered fields. HP anchors appear only in the non-rendered `sources` array, as the spec intends. |

## Sameness detail

- "This page is for you." was a verbatim duplicate of the same sentence in `property-company-profit-extraction.json`, and a stock opener with no information in it. Deleted (edit 1).
- "A specialist from our partner network" appeared twice inside this one page (intro and howWeHelp 1), and four other wave 1 pages use the identical phrase. One instance kept, one cut (edit 2).
- Not edited, wave-level: twelve of the fifteen pages close the intro with a "You get A, B and C" triad. It is the wave's house pattern rather than this page's defect, and breaking it on one page only would make that page the odd one out. Flagged for the manager if the pattern is to be varied, it should be varied across the set.
- Challenge and howWeHelp headings are situation-specific and share no template with the siblings. No listicle rhythm, no repeated sentence openers within the page.

## Edit log

1. `intro`: deleted the sentence "This page is for you." Stock filler and a verbatim sibling duplicate. Minus 5 words.
2. `howWeHelp[0].body`: "A specialist from our partner network reviews the ownership history" to "A specialist reviews the ownership history". Removes the second use of the same phrase inside one page. Minus 4 words.

No figure, rate, date or rule was touched. No suspected factual errors found for the manager.

## Result

Final word count: 1,190 (band 800 to 1,200).
`metaTitle`: 48 chars. `metaDescription`: 158 chars.
JSON re-validated as parsing after both edits.

VERDICT: PASS
