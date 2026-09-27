# Editorial and claims QA (Track B) — charities `/for/charity-registration`

File: `docs/charities/_wave1/charity-registration.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers").
Reviewed 2026-09-27, after Track A PASS (3 edits on Gift Aid backdating, all kept unchanged).
Sameness baseline: the six sibling `docs/charities/_wave1/*.json` files, plus the live rows in
`charities/web/src/data/charity-types.ts` (cics, social-enterprises) and `charity-services.ts`
(independent-examination, charity-accounts, charity-bookkeeping, gift-aid, charity-vat).

## Findings

| # | Check | Finding | Action |
|---|---|---|---|
| 1 | Situation in the first 150 words of `intro` | Answered in the first three sentences (who the reader is, the £5,000 gate, the CIO carve-out). Intro was 156 words, longer than it needed to be. | Trimmed to 146 words. Rule met before and after. |
| 2 | Word band 800 to 1,200 (titles and questions included) | 1,286 on arrival, 86 over. | Trimmed to 1,200 across 16 edits. No figure, rate, date or rule touched; the Track A Gift Aid clauses kept verbatim. |
| 3 | AI tells and sameness | "Your accountant prepares" opened a `howWeHelp` body here and on five of the six siblings, an estate-wide stock opener. "A specialist reviews" opened bodies on every sibling and appeared twice here (`howWeHelp[0]`, `howWeHelp[1]`). No consecutive pairs, no "This page is for", no "You get A, B and C" closer, no listicle rhythm. | Removed both stock openers from this page: `howWeHelp[2]` and `howWeHelp[0]` recast, `howWeHelp[1]`'s second "a specialist sets out" recast. The page now opens its five help items five different ways. |
| 4 | Duplication between challenges and FAQs | Four overlaps: challenge 2 structures vs FAQ 2; challenge 3 Gift Aid-is-separate vs FAQ 3; challenge 5 year end vs FAQ 5 and FAQ 6; challenge 4 income-in-first-accounts vs FAQ 4. | Duplication removed on the challenge side wherever the FAQ carried the figures, and on the FAQ side where the challenge did. Every figure survives in at least one place. |
| 5 | Thin or padded sections | None thin. FAQ answers on arrival 60 to 73 words, all inside 40 to 120; after trimming, 50 to 66. No answer restates its question. Challenge and howWeHelp bodies 38 to 73. | No structural change. Shape (6 challenges, 5 howWeHelp, 6 FAQs, 4 stats) matches `charity-payroll-and-pensions.json`. |
| 6 | Banned claims, case-insensitive | Zero hits: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, advice/advise, turnaround or speed promises. | Nothing to fix. The one former "Your accountant prepares" was a sameness tell, not a banned claim, and is gone anyway. |
| 7 | Em-dashes, British English, current thresholds | No em-dash or en-dash anywhere in the file. No US spellings. Thresholds are the post-S.I. 2026/427 set, as Track A verified. | Nothing to fix. |
| 8 | Meta lengths | `metaTitle` 45 of 60. `metaDescription` 152 of 160. | Unchanged. |
| 9 | Internal links | Five, the maximum. All relative, all `<a href="...">text</a>`, all re-verified on disk: three guides under `charities/web/content/guides/`, one blog post, one calculator tool. | Unchanged. All five survived the trim. |
| 10 | Pipeline leakage | No wave, map, house-position, agent, prompt or QA references in rendered fields. The `sources` array is the template's non-rendered field, as designed. | Nothing to fix. |

### Noted, not fixed (outside this page)

- `docs/charities/_wave1/cics.json` carries slug `cics`, which already exists as a live row in
  `charities/web/src/data/charity-types.ts`. The integrator will hit a duplicate slug. Flagged
  for the manager, not touched here.
- No suspected factual errors found. Every figure on this page was checked by Track A and none
  was altered by this pass.

## Edit log, 16 edits

All edits are cuts or rewordings of existing prose. No figure, rate, date or rule changed.

1. `intro` — cut "Tax reliefs need recognition by HMRC." as a separate sentence and folded the point into the preceding one ("the tax reliefs, Gift Aid included, depend on recognition by HMRC and not on the Commission"). Filler sentence removed.
2. `intro` — "Groups often reach us late... That is a normal starting point." joined into one clause. Cut the standalone reassurance sentence.
3. `intro` — structure list shortened to "a CIO, a charitable company, or an unincorporated association"; the Commission-and-Companies-House gloss was already carried by challenge 2 and FAQ 2.
4. `intro` — closing clause "this page is about the numbers behind the application" to "this page is the numbers behind it".
5. `intro` — "accounts that match the money already raised" to "accounts that match the money raised".
6. `challenges[0].body` — two sentences joined, "often crosses it" to "crosses it", "has to be rebuilt before anyone can say which year the duty began" to "must be rebuilt before anyone can date the duty". 63 to 59 words.
7. `challenges[1].body` — removed the CIO-versus-charitable-company regulator recital, which FAQ 2 states in full. Kept the unincorporated exposure point, the structures-guide link and the transferring-assets warning. 59 to 51 words.
8. `challenges[2].body` — "Charity tax reliefs depend on recognition by HM Revenue and Customs, a separate application naming..." to "Recognition by HM Revenue and Customs is a separate application, naming...". The reliefs point is stated in the intro and FAQ 3. 54 to 50 words.
9. `challenges[4].body` — removed the sentence restating the £25,000 and £40,000 scrutiny gate and the ten-month deadline, both stated in full in FAQ 6 and FAQ 5 respectively. Replaced with "and so is whether the accounts need outside scrutiny at all", keeping the checker link in context. 60 to 52 words.
10. `challenges[5].body` — "Funds held in a founder's personal account meanwhile create" to "Funds sitting in a founder's personal account create". Filler adverb cut.
11. `howWeHelp[0].body` — "a specialist reviews the bank records" to "the bank records... are worked through" (sameness opener), "That produces the figures" to "That gives the figures", "the opening position for the first accounts" to "for the accounts".
12. `howWeHelp[1].body` — "a specialist sets out what conversion involves" to "what conversion involves is set out" (second instance of the same stock phrase on one page); cut "so trustees choose on the facts". 51 to 44 words.
13. `howWeHelp[2].body` — "Your accountant prepares the financial sections..." to "The financial sections... are drafted together". Removes the estate-wide stock opener. 40 to 39 words.
14. `howWeHelp[3].body` — "are reviewed and set up" to "are set up"; "the small donations scheme rules separately, since that scheme carries" to "the small donations scheme, which carries". 53 to 47 words.
15. `faqs[0].answer`, `faqs[1].answer`, `faqs[2].answer` — padding cut: "without being on the register, and it will not appear in the public register of charities" to "without joining the public register of charities"; "a separate application to a separate body" to "a separate application". No figure touched.
16. `faqs[3].answer` and `faqs[4].answer` — `faqs[3]`: cut "The income still belongs in the first accounts, so", which challenge 4 states, and "presenting" from the closing line. `faqs[4]`: cut the closing "The year end set at registration fixes that whole timetable", which challenge 5 now carries alone. `faqs[5]`: "Below the gate the Charities Act requires no external scrutiny" to "Below it the Charities Act requires none". All three stay inside the 40 to 120 band.

## Final measurements

- Words across `intro`, `challenges`, `howWeHelp` and `faqs`, titles and questions included, HTML stripped: **1,200** (band 800 to 1,200).
- `metaTitle`: **45** characters (limit 60).
- `metaDescription`: **152** characters (limit 160).
- Internal links: **5** (limit 5), all relative anchors, all present on disk.
- FAQ answer lengths: 56, 60, 66, 63, 50, 65 words. All inside 40 to 120.
- Em-dashes: 0.
- JSON re-validated after the edits: parses, all eleven keys intact.

VERDICT: PASS
