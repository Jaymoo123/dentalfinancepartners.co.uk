# Track B editorial and claims QA: charities / trustees-and-treasurers

File: `docs/charities/_wave1/trustees-and-treasurers.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a (row shape, Writers, QA).
Sameness set: the other six `docs/charities/_wave1/*.json`, plus the live rows in
`charities/web/src/data/charity-types.ts` and `charity-services.ts`.
Reviewed 2026-09-27. Track A passed with 0 edits; no figure, rate, date or rule was touched here.

## Findings

| # | Check | Finding | Action |
|---|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | Intro ran to 163 words. The core answer (format, scrutiny, report, plus the thresholds) landed by roughly word 148, with the 30 September 2026 uplift clause spilling past 150. | FIXED: intro rewritten to 145 words, every figure kept. |
| 2 | Word band 800 to 1,200 incl. titles and questions | 1,199 before, at the ceiling with no headroom. | Now 1,180. |
| 3 | AI tells and sameness | No stock opener ("In today's", "Navigating"), no "You get A, B and C" closer, no listicle rhythm. Opener shape "You keep the books..." differs from the siblings' openers; challenge and howWeHelp titles do not repeat any sibling's. Overlap with `small-charities` and `cios` on the £25,000 and audit gates is subject overlap, phrased differently in each, not duplicated copy. | No change. |
| 4 | Thin or padded sections, FAQ answers | Challenge bodies 45 to 81 words, howWeHelp 43 to 57, all substantive. FAQ answers 58 to 77 words, all inside 40 to 120, none restates its question. | No change. |
| 5 | Banned claims (case-insensitive) | One hit: FAQ 5 used "Scottish charities are **regulated** by OSCR". A third-party statement, not a claim about us, but the banned list is literal and a scanner would flag it. No hit on chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, personal names, prices or fees, "advice"/"advise", or turnaround promises. "An independent examiner from the partner network" (howWeHelp 4) is the permitted wording. | FIXED: reworded to "come under OSCR under separate regulations". No rule changed. |
| 6 | Em-dashes, British English, current thresholds | No em-dash. British spelling throughout. Thresholds match Track A's verified set. | No change. |
| 7 | Meta lengths | `metaTitle` 46 of 60, `metaDescription` 142 of 160. | No change. |
| 8 | Internal links | Five, the maximum. All relative, all `<a href="...">text</a>`, all five verified on disk by Track A (calculator slug, three blog posts, one service). | No change. |
| 9 | Pipeline leakage | No agent, wave, QA or house-positions language in rendered fields. The `sources` array is spec-required and not rendered by the template. | No change. |

## Edit log

1. `intro` rewritten, 163 to 145 words. The three deciding questions are compressed into one list sentence, the redundant "Income and assets answer the first two" is dropped, "in a minute" is dropped, and the closing clause is shortened to "so check your year end". Every figure, rate and date is unchanged and still present: £250,000 receipts and payments ceiling, companies always accruals, £25,000 scrutiny gate, £1 million audit gate, £250,000 with gross assets over £3.26 million, 10 month annual return, 30 September 2026 uplift. The calculator link is kept.
2. `faqs[4].answer`: "Scottish charities are regulated by OSCR under separate regulations" to "Scottish charities come under OSCR under separate regulations". Banned word only; the OSCR position is unchanged.

Total edits: 2.

## Suspected errors passed to the manager

None. Nothing on the page reads as a figure, rate, date or rule error.

## Mechanical

Final word count 1,180 across intro, challenges, howWeHelp and faqs, section titles and FAQ questions included.
`metaTitle` 46 characters. `metaDescription` 142 characters.
Internal links 5 of 5 allowed, all well formed anchors. No em-dash. JSON re-validated, parses.

VERDICT: PASS
