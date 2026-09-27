# Track B editorial and claims QA - gifting-property-to-family

Page: `docs/property/_wave1/gifting-property-to-family.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a (row shape, QA, Writers).
Date: 2026-09-27. Reviewer: QA Track B (Opus). Track A PASSED with 0 edits; its one ask is carried here as edit 1.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Buyer's situation answered in first 150 words of `intro` | PASS. Sentence 1 names the person and the moment (giving a property or a share of one to a child or other family member); sentence 2 names both motives; sentence 3 gives the answer that decides the page (tax lands before any money moves, market value on a connected-person gift). All inside 119 words, the whole intro. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs | PASS. 1,197 after the edits below, was 1,200. Track A's label ask sits in `stats`, which is outside the band, but the page was at the ceiling so the three band edits were made as trims rather than swaps. |
| 3 | AI tells and sameness across the other 14 wave 1 pages | Three found and fixed, see edit log. One wave-level pattern noted below, not edited. |
| 4 | Thin or padded sections | PASS. Challenge bodies 79 to 93 words, howWeHelp 61 to 67, each carrying its own substance: CGT on the disposal, the reservation rules, the s.102B(4) carve-out, SDLT on assumed debt. No section restates another; the carve-out section is the only one that could read as an extension of the reservation section and it holds distinct content (the three exits and which one allows rent-free occupation). |
| 5 | FAQ answers: not restating the question, 40 to 120 words | PASS. Six answers, 62 to 75 words. All answer first ("Yes, in almost every case.", "You can, but it usually achieves nothing for inheritance tax.", "Not on the gift itself", "It changes both taxes."). None restates its question. |
| 6 | Banned claims, case-insensitive | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal name / price or fee for our work / turnaround promise. No use of advice or advise. "price" matches only "not the nil price paid" and "a gift has no price", both describing the gift, not our work. "your accountant prepares" is used twice as the deliverable, which is the wave's established framing and not a firm claim. |
| 7 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes and zero en-dashes. British spellings throughout. Both rate mentions and the stat block lead on 2026/27; the only other dates are statutory (5 April 2031 nil-rate-band freeze, 31 October 2024 surcharge in `sources`). |
| 8 | Meta lengths | PASS. `metaTitle` 44 chars, `metaDescription` 153 chars. The description opens on the reader's situation and names the four things the page covers. |
| 9 | Internal links | PASS. Five links, the maximum allowed. All relative, all `<a href="...">text</a>`, no markdown or bare paths anywhere in the file. All five verified on disk by Track A (two calculators, three blog posts under `Property/web/content/blog/`). |
| 10 | Pipeline leakage | PASS. No build notes, section signs, TODOs or house-positions anchors in any rendered field. HP anchors appear only in the non-rendered `sources` array, as the spec intends. |

## Sameness detail

- "A specialist reviews three things first:" in the intro was the same sentence template as `landlord-self-assessment-and-mtd.json` ("A specialist from our partner network reviews three things first:"), and the "N things first" opener runs through six of the fifteen pages. Rewritten (edit 2).
- "You get a written picture of ..." duplicated `landlord-retirement-and-succession.json` ("a written picture of where the estate stands") on the same clause. Rewritten (edit 3).
- "A specialist reviews ..." opened both `howWeHelp[1]` and, in effect, the intro, and `howWeHelp[0]` already opens "A specialist from the partner network reviews". One of the two rewritten (edit 4), leaving one partner-network mention on the page, in line with the sibling reviews.
- Not edited, wave-level: ten of the fifteen pages close the intro with a "You get A, B and C" triad. This page's close was rewritten off "You get" (edit 3), but the three-part shape is kept because it is the wave's house pattern and the same call was made on `selling-a-buy-to-let`. If the pattern is to go, it should go across the set, not on one page.
- No "This page is for you", no listicle rhythm, no repeated sentence openers left inside the page. Challenge and howWeHelp headings are situation-specific and share no template with the siblings.

## Edit log

1. `stats[2].label`: "To report and pay CGT after the gift completes" to "To report and pay, where CGT is due on the gift". Track A's ask; carries the "where CGT is due" qualifier that `house_positions.md` §5 attaches to the 60-day rule. Label only, the figure is untouched, and `stats` sits outside the word band.
2. `intro`: "A specialist reviews three things first: the capital gains position on the gift," to "The review turns on the capital gains position on the gift,". Kills a sentence template shared with the MTD page. Minus 2 words.
3. `intro`: "You get a written picture of what gifting costs now, what doing nothing costs, and the filing dates." to "The result is what gifting costs now, what doing nothing costs, and the dates the filings fall due." Removes the "You get" opener and the "a written picture of" phrase shared with the retirement page. No net word change.
4. `howWeHelp[1].body`: "A specialist reviews what will actually happen after the gift:" to "The review covers what actually happens after the gift:". Removes the third "A specialist reviews" opener on one page. Minus 1 word.

No figure, rate, date or rule was changed. No suspected factual errors found for the manager.

## Result

Final word count: 1,197 across intro, challenges, howWeHelp and faqs (band 800 to 1,200).
`metaTitle`: 44 chars. `metaDescription`: 153 chars.
Internal links: 5, all relative anchors, all existing on disk.
JSON re-validated as parsing after all four edits.

VERDICT: PASS
