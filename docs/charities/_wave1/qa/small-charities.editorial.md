# Editorial and claims QA (Track B) — charities `/for/small-charities`

File: `docs/charities/_wave1/small-charities.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers").
Reviewed 2026-09-27, after Track A PASS (0 edits).
Sameness baseline: the six sibling `docs/charities/_wave1/*.json` files and the live rows in
`charities/web/src/data/charity-types.ts` (cics, social-enterprises).

## Findings

| # | Check | Finding | Action |
|---|---|---|---|
| 1 | Situation in the first 150 words of `intro` | Answered in the first two sentences: who the reader is (volunteer-run charity under the examination threshold), the question (do we need an accountant at all), and the answer (nothing obliges you to). Intro is 146 words, so the whole intro sits inside the rule. | Rule met. |
| 2 | Word band 800 to 1,200, titles and questions included | 1,199 on arrival, one word from the ceiling. Every edit below had to be word-neutral or subtractive. | Held at 1,199 after 4 edits. |
| 3 | AI tells and sameness | Two estate-wide stock openers on this page: `howWeHelp[0]` opened "A specialist reviews", which opens a body on five of the six siblings; `howWeHelp[1]` opened "Your accountant prepares", which opens a body on four of them. Also a listicle rhythm in the intro: "What does still apply:" followed by four parallel noun phrases. No "This page is for", no "You get A, B and C" closer, no consecutive duplicate openers elsewhere. | Both stock openers recast. Intro colon-list broken into a shorter lead-in plus clauses that are no longer parallel. The four `howWeHelp` items now open four different ways. |
| 4 | Thin or padded sections; FAQ answers | Six FAQ answers at 74, 74, 79, 79, 82, 71 words: all inside 40 to 120, none restates its question, each opens with the answer. Challenge bodies 55 to 74 words with title, `howWeHelp` 43 to 63. Nothing thin. One padded phrase found in `howWeHelp[2]` ("Run your own numbers first"). | Padding cut; no structural change. Shape (4 stats, 5 challenges, 4 howWeHelp, 6 FAQs) matches the siblings. |
| 5 | Banned claims, case-insensitive | Zero hits across rendered fields: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, advice/advise, turnaround or speed promises. The single "fee" substring match is "feeds the Gift Aid claim". "Your accountant prepares" was a sameness tell, not a banned claim, and is gone regardless. | Nothing to fix. |
| 6 | Em-dashes, British English, current rules | No em-dash or en-dash. No US spellings. Thresholds are the post-S.I. 2026/427 set on the ENDING framing, as Track A verified. | Nothing to fix. |
| 7 | Meta lengths | `metaTitle` 45 of 60. `metaDescription` 138 of 160. | Unchanged. |
| 8 | Internal links | Five, the maximum: two in `challenges`, one in `howWeHelp`, two in `faqs`. All relative, all `<a href="...">text</a>`, all re-verified on disk (four blog files under `charities/web/content/blog/`, one calculator tool). | Unchanged; all five survived the edits. |
| 9 | Pipeline leakage | No wave, map, house-position, agent, prompt or QA reference in any rendered field. The `sources` array is the template's non-rendered field, as designed. | Nothing to fix. |

### Noted, not fixed

- No suspected factual errors. No figure, rate, date or rule was touched by this pass.
- Track A's under-inclusive wording point is now closed (edit 1).

## Edit log, 4 edits

All edits are rewordings or cuts of existing prose. No figure, rate, date or rule changed.

1. `intro` — "Below £25,000 gross income" to "At or below £25,000 gross income". The statute reads "exceeds £25,000", so a charity at exactly £25,000 is also outside scrutiny; "below" was under-inclusive by one point. Wording fix, not a figure change, as Track A flagged. +1 word.
2. `intro` — "What does still apply: the annual return within 10 months of your financial year end, accounts your trustees can stand behind, Gift Aid claims that hold up if HMRC asks to see them, and a governing document that can impose an examination the law does not." to "Plenty still applies: the annual return falls due within 10 months of your financial year end, your trustees have to stand behind the accounts, Gift Aid claims have to survive an HMRC check, and your governing document may impose an examination the law does not." Breaks the four-parallel-noun listicle rhythm. All four obligations and the 10-month deadline kept.
3. `howWeHelp[0].body` — "A specialist reviews how money currently gets recorded and puts a receipts and payments structure in place that a volunteer can keep running" to "How money currently gets recorded is worked through once, then a receipts and payments structure goes in that a volunteer can keep running". Removes the estate-wide stock opener. Word-neutral.
4. `howWeHelp[1].body` — "Your accountant prepares the accounts and the statement of assets and liabilities, then assembles what the annual return asks at your income level." to "The accounts and the statement of assets and liabilities are drawn up, then what the annual return asks at your income level is assembled." Removes the second stock opener. `howWeHelp[2].body` — "Run your own numbers first with the Gift Aid calculator" to "Run the numbers with the Gift Aid calculator" (padding, and the three words edits 1 and 2 cost).

## Final measurements

- Words across `intro`, `challenges`, `howWeHelp` and `faqs`, titles and questions included, HTML stripped: **1,199** (band 800 to 1,200).
- `intro`: 146 words, situation answered inside the first 150.
- `metaTitle`: **45** characters (limit 60).
- `metaDescription`: **138** characters (limit 160).
- Internal links: **5** (limit 5), all relative anchors, all present on disk.
- FAQ answer lengths: 74, 74, 79, 79, 82, 71 words. All inside 40 to 120.
- Em-dashes: 0.
- JSON re-validated after the edits: parses, all keys intact.

VERDICT: PASS
