# Editorial and claims QA (Track B) - charities `/for/cios`

File: `docs/charities/_wave1/cios.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers").
Reviewed 2026-09-27, after Track A PASS (0 edits, `qa/cios.factual.md`).
Sameness baseline: the six sibling `docs/charities/_wave1/*.json` files and the two live rows
(`cics`, `social-enterprises`) in `charities/web/src/data/charity-types.ts`.

## Findings

| # | Check | Finding | Action |
|---|---|---|---|
| 1 | Situation in the first 150 words of `intro` | Answered in the first three sentences: one regulator, no Companies House filing, the annual return and the £25,000 attachment point. Intro was 128 words on arrival. | Rule met before and after. Intro now 113 words. |
| 2 | Word band 800 to 1,200, titles and questions included | 1,197 on arrival, three words of headroom. | Trimmed to 1,175 across 6 edits, all cuts or rewordings. No figure, rate, date or rule changed. |
| 3 | AI tells and sameness | Two estate-wide stock openers: `howWeHelp[0]` opened "Your accountant prepares receipts and payments or SORP accruals accounts", which is near verbatim the same body on `trustees-and-treasurers.json` and the same opener used on four other siblings; `howWeHelp[2]` opened "A specialist reviews", which opens a body on every sibling. The `intro` closed on a four-item scope list ("This page covers the filing duties, the accounts format by band, conversion, trading subsidiaries and VAT"), the listicle variant of the banned "You get A, B and C" closer. | All three recast. The four help items now open four different ways and the intro closes on the reader's next step, not a contents list. No "This page is for", no consecutive-sentence rhythm, no bullet cadence in the bodies. |
| 4 | Duplication between challenges and FAQs | Four overlaps: challenge 3 vs FAQ 2 (both carried all four audit figures and both 2026 sets), challenge 2 vs FAQ 3 (both the £250,000/£500,000 boundary and the charitable-company rule, which FAQ 5 states a third time), challenge 4 vs FAQ 4 (conversion routes and the set-up-again list), challenge 5 vs FAQ 6 (small trading tiers). | Trimmed the first three on the side where the other already carried the point in full. Every figure survives: the 2026 audit set stays in stat 4 and FAQ 2, the companies-always-accruals rule stays in challenge 2 and FAQ 5, the conversion set-up list stays in FAQ 4 and `howWeHelp[3]`. House position 4's "both limbs together" rule is respected in both surviving statements. Challenge 5 / FAQ 6 left alone: the FAQ has to answer "does a CIO need a subsidiary" on its own and would fall under 40 words if cut. |
| 5 | Thin or padded sections | None thin. FAQ answers 59 to 73 words on arrival, all inside 40 to 120; after trimming 59 to 73. No answer restates its question. Challenge bodies 66 to 77, howWeHelp bodies 38 to 55. Shape (4 stats, 5 challenges, 4 howWeHelp, 6 FAQs) sits inside the sibling range. | No structural change. |
| 6 | Banned claims, case-insensitive | Zero hits: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, advice/advise, turnaround or speed promises. "One regulator" and "the Commission" describe the Charity Commission, not the firm. | Nothing to fix. The one "Your accountant prepares" was a sameness tell, not a banned claim, and is gone. |
| 7 | Em-dashes, British English, current rules | No em-dash or en-dash. No US spellings. Thresholds are the post-S.I. 2026/427 set, as Track A verified against `house_positions.md`. | Nothing to fix. |
| 8 | Meta lengths | `metaTitle` 49 of 60. `metaDescription` 138 of 160. | Unchanged. |
| 9 | Internal links | Five, the maximum. All relative, all `<a href="...">text</a>`, five opening and five closing tags. Re-verified on disk: `charity-structures-which-to-choose.md`, `audit-vs-independent-examination.md`, `set-up-a-charity-cio.md` under `charities/web/content/guides/`; `charity-trading-subsidiary-gift-aid.md` under `content/blog/` with `category: "Gift Aid"`, so `/blog/gift-aid/...` is right; `independent-examination-audit-checker.ts` declares `slug: "independent-examination-vs-audit-checker"`. | Unchanged. All five survived the trim. |
| 10 | Pipeline leakage | No wave, map, agent, prompt or QA reference in any rendered field. `sources` cites `house_positions.md` but is the template's non-rendered field, as the row shape specifies. | Nothing to fix. |

### Noted, not fixed

- No suspected factual errors. No figure, rate, date or rule was altered by this pass.
- Slug `cios` does not collide with the live rows in `charities/web/src/data/charity-types.ts`
  (`cics`, `social-enterprises`). The `cics` collision flagged in the `charity-registration`
  editorial review still stands and is the manager's, not this page's.

## Edit log, 6 edits

1. `intro` - cut the closing scope list "This page covers the filing duties, the accounts format by band, conversion, trading subsidiaries and VAT." and closed on "Still choosing a structure? See the structures comparison first." Removes the listicle closer. 128 to 113 words.
2. `challenges[2].body` - "For accounting years ending on or after 30 September 2026 those figures become £1.5m, or £500,000 with gross assets over £5m." to "Both of those figures rise for accounting years ending on or after 30 September 2026." The 2026 numbers are stated in full in stat 4 and FAQ 2. 71 to 61 words.
3. `challenges[3].body` - "so expect a new charity number, new bank mandates, HMRC recognition applied for again and staff moved across" to "so expect a new charity number and a set-up-again list that runs well past the accounts". FAQ 4 and `howWeHelp[3]` both carry the itemised list. 69 to 66 words.
4. `howWeHelp[0].body` - "Your accountant prepares receipts and payments or SORP accruals accounts according to..." to "Receipts and payments or SORP accruals accounts are prepared according to...", with the SORP dating and trustees' report clauses recast to match. Removes the estate-wide stock opener and a near-verbatim clash with `trustees-and-treasurers.json`. Same content, 38 to 41 words.
5. `howWeHelp[2].body` - "A specialist reviews which scrutiny level your year falls into" to "Which scrutiny level your year falls into is settled first". Second estate-wide stock opener removed. The examiner-qualification clause is untouched and still conditional, as Track A assertion 26 requires.
6. `faqs[2].answer` - cut "A charitable company prepares accruals accounts at every income level.", stated in challenge 2 and again in FAQ 5, and tightened the closing sentence to name what the check is for. 62 to 59 words, inside the band.

## Final measurements

- Words across `intro`, `challenges`, `howWeHelp` and `faqs`, titles and questions included, HTML stripped: **1,175** (band 800 to 1,200).
- `metaTitle`: **49** characters (limit 60).
- `metaDescription`: **138** characters (limit 160).
- Intro: **113** words, situation answered in the first 3 sentences.
- FAQ answer lengths: 73, 67, 59, 72, 68, 59. All inside 40 to 120.
- Internal links: **5** (limit 5), all relative anchors, all present on disk.
- Em-dashes: 0.
- JSON re-validated after the edits: parses, all eleven keys intact.

VERDICT: PASS
