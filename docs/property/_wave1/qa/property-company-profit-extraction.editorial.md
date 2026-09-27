# Track B editorial and claims QA - property-company-profit-extraction

Page: `docs/property/_wave1/property-company-profit-extraction.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a (row shape, QA, Writers).
Date: 2026-09-27. Reviewer: QA Track B (Opus). Track A PASSED; both of its edits preserved, including the widened CIHC wording ("a connected person, or to their spouse or a relative").

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered in first 150 words of `intro` | PASS. Sentence 1 names the situation (profit built up inside a property company, owner wants it out). The order rule, the three things looked at first and the deliverable all land inside 116 words. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs | PASS after trim. 1,217 in (17 over the ceiling), 1,199 out. No figure, rate, date or rule touched. |
| 3 | AI tells and sameness across the other 14 wave 1 pages | Three found and fixed (edits 2, 3, 4). One wave-level pattern noted below, not edited further. |
| 4 | Thin or padded sections | PASS. Challenge bodies 66 to 85 words, howWeHelp 46 to 59, each carrying distinct substance. Two padded sentences tightened (edits 5, 6, 7) rather than cut, since each still carries meaning. |
| 5 | FAQ answers: not restating the question, 40 to 120 words | PASS. All six answer first ("Neither on its own...", "Only where the company owes it to you.", "It can, and..."). Lengths 71 / 65 / 72 / 65 / 68 / 62. |
| 6 | Banned claims, case-insensitive | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal name / price / fee / turnaround promise. No instance of "advice" or "advise" anywhere. The page uses "reviews", "prepares", "sets out". "Your accountant prepares..." in howWeHelp 3 is the introduced firm, not a claim about us. |
| 7 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout. Stats and the first challenge lead on the 2026/27 rates. |
| 8 | Meta lengths | PASS. `metaTitle` 45 chars, `metaDescription` 157 chars. |
| 9 | Internal links | PASS. Four, all relative, all `<a href="...">text</a>`, no bare paths or markdown links. Three calculator slugs present in `Property/web/src/lib/calculators/registry.ts`, the blog post present at `Property/web/content/blog/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27.md`. |
| 10 | Pipeline leakage | PASS. No HP anchors, section signs, "verify at build" or TODOs in rendered fields. HP anchors live only in the non-rendered `sources` array, as the spec intends. |

## Sameness detail

- "This page is for you." was a verbatim duplicate of `holiday-let-and-serviced-accommodation.json` (and was cut from `selling-a-buy-to-let.json` for the same reason). Stock filler with no information in it. Deleted.
- "A specialist from our partner network" appears in four wave 1 pages verbatim. Cut here; the consent wording in howWeHelp 4 already names the partner network once, which is where it belongs.
- "You get A, B and C" closes thirteen of the fifteen intros. This page's version is a pair, not a triad, but the opener was still the wave template, so the opener alone was varied ("You finish with"). The wave-level pattern is left for the manager: if it is to be broken, it should be broken across the set, not on one page.
- Challenge and howWeHelp headings are situation-specific and share no template with siblings. No listicle rhythm; no repeated sentence openers inside the page.

## Edit log

1. `intro`: "and you want that money in your own hands without paying more tax than you need to" to "and you want it out without paying more tax than you need to". Wordy. Minus 5.
2. `intro`: deleted "This page is for you." Stock AI tell and a verbatim sibling duplicate. Minus 5.
3. `intro`: "A specialist from our partner network looks first" to "A specialist looks first". Removes the phrase shared verbatim with three siblings. Minus 4.
4. `intro`: "You get an extraction order" to "You finish with an extraction order". Varies the wave's stock closing opener. Plus 1.
5. `challenges[1].body`: "It is usually the first route to use." to "It is usually the first route." Minus 2.
6. `howWeHelp[0].body`: "because the right mix depends on income you hold outside the company" to "because the right mix depends on your income outside the company". Minus 2.
7. `howWeHelp[2].body`: "The accounts and the personal return come from the same figures." to "Accounts and personal return come from the same figures." Minus 2.
8. `faqs[5].answer`: "That sits on top of the corporation tax the company has already paid" to "That sits on top of corporation tax the company has already paid". Minus 1.

Eight edits. No figure, rate, date, rule, statute reference or link was changed. No suspected factual errors found for the manager.

## Result

Final word count: 1,199 (band 800 to 1,200).
`metaTitle`: 45 chars. `metaDescription`: 157 chars.
JSON re-validated as parsing after all edits (7 top-level keys plus `sources`, indent 2, trailing newline).

VERDICT: PASS
