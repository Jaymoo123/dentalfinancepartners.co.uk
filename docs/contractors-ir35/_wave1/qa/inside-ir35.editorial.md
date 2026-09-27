# Editorial and claims QA (Track B): contractors-ir35 `/for/inside-ir35`

File: `docs/contractors-ir35/_wave1/inside-ir35.json`
Reviewed: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("QA", "Writers").
Track A: PASS with 1 edit (TAAR "can recharacterise"), `inside-ir35.factual.md`. That wording is kept unchanged.
Sameness baseline: the four sibling `_wave1` JSON files and the live rows in
`contractors-ir35/web/src/data/contractor-types.ts`.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Whole intro is 101 words; the determination, the PAYE/NIC consequence and the three routes all land in the first 60. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs (titles and questions included) | WAS 1,220 (the 1,214 handed over counts slightly differently), now **1,200**. PASS. |
| 3 | AI tells and sameness | Two found and fixed: the intro closed on the stock "A specialist reviews ..." line, and "your accountant prepares" opened the working clause of both howWeHelp 1 and howWeHelp 4. No "This page is for", no "You get A, B and C" closer, no listicle rhythm. Challenge and howWeHelp openers are all distinct ("A client who", "Medium and large clients", "Home to client travel", "A dormant company", "An umbrella becomes"; "A specialist reads", "The four routes", "Trading on", "If closing", "Many contractors"). Titles do not collide with any sibling page or any live `contractor-types.ts` row; the nearest neighbours (`ir35-contract-review`, `umbrella-to-limited-company`) share subject matter but not phrasing or angle. |
| 4 | Thin or padded sections; FAQ answers restating the question; answers 40 to 120 words | PASS. Section bodies run 46 to 75 words after edits; FAQ answers 68 to 73 words, all inside the band. No answer restates its question: each opens with the verdict ("Not automatically", "Generally no", "Forty five days", "Simpler, not necessarily better", "Probably not yet", "One determination is not a finding about your history"). |
| 5 | Banned claims, case-insensitive | PASS. No "chartered", ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "award", "regulated", personal names, prices or fees, "advice" or "advise", and no turnaround promise. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash anywhere. British spelling throughout ("recharacterise", "minimise" not present but no US forms found). Rates lead on 2026/27 and later: employer NIC 15%, BADR 18% from 6 April 2026, umbrella joint and several liability from 6 April 2026. |
| 7 | Meta lengths | PASS. `metaTitle` 52 chars (limit 60), `metaDescription` 157 chars (limit 160). |
| 8 | Internal links: at most five, relative, exist on disk, `<a href="...">text</a>` | PASS. Exactly five, all relative anchors in the required form. Targets verified: `contractors-ir35/web/content/blog/sds-status-determination-statement.md` (category "IR35 Status" -> `/blog/ir35-status/`), `deemed-employment-payment-explained.md`, `challenge-ir35-determination-sds.md`, `closing-contractor-limited-company.md` (category "Limited Company Tax" -> `/blog/limited-company-tax/`), and `contractors-ir35/web/src/lib/calculators/tools/inside-ir35-take-home-calculator.ts` (`/calculators/[slug]`). Category segments confirmed against `slugifyCategory` in `contractors-ir35/web/src/app/blog/[category]/page.tsx`. |
| 9 | Pipeline leakage | PASS. No placeholders, no TODOs, no agent or wave references in rendered fields. The `sources` array is the spec-required non-rendered trailer. |

## Edit log

Eight edits, all editorial. No figure, rate, date or rule was touched.

| # | Where | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro`, final sentence | "A specialist reviews the determination and the numbers behind all three before you commit." | "The determination itself is also worth testing before you commit." | Stock AI opener named in the spec; also -3 words. |
| 2 | `howWeHelp` 1 | "your accountant prepares the written representations and tracks the 45 day window" | "the written representations are drafted and the 45 day window tracked" | First of two "your accountant prepares" clauses. |
| 3 | `howWeHelp` 4 | "your accountant prepares the reserve position, clears any director's loan ... and tests the four TAAR conditions" | "the reserve position is set out, any director's loan cleared ... and the four TAAR conditions tested" | Second instance of the same clause; -2 words. |
| 4 | `faqs` 5 | "and two of the three must be met. But the test looks back ... status normally has to change over two consecutive years" | "... The test looks back ... status normally changes over two consecutive years" | Padding; -3 words. Thresholds and the 6 April 2027 date untouched. |
| 5 | `faqs` 6 | "not a finding about your history and has no automatic backward effect. HMRC can still enquire into earlier years, which is why the record ... and any review taken at the time." | "not a finding about your history. HMRC can still enquire into earlier years, so the record ... any review taken at the time." | Restated the same point twice; -9 words. |
| 6 | `intro` | "how long the inside engagement runs" | "how long the engagement runs" | "inside" already established two sentences earlier; -1 word. |
| 7 | `challenges` 1 | "without looking at the individual engagement" | "without looking at the engagement itself" | Clearer contrast with "a whole category of roles". |
| 8 | `howWeHelp` 3 | "PAYE and VAT deregistration where relevant, and your self assessment" | "PAYE and VAT deregistration, and your self assessment" | Hedge adds nothing; -2 words. |

## Suspected errors passed to the manager

None. No figure, rate or rule in this page looked wrong on an editorial read, and Track A cleared all of them.

## Final numbers

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,200** (band 800 to 1,200).
- `metaTitle`: 52 characters.
- `metaDescription`: 157 characters.
- Internal links: 5, all resolving.
- JSON re-parsed clean after the edits.

VERDICT: PASS
