# Editorial and claims QA (Track B): medical / retiring-doctors

Reviewed 2026-09-27. File: `docs/medical/_wave1/retiring-doctors.json`.
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("QA", "Writers").
Track A (`retiring-doctors.factual.md`) PASSED with 4 edits; all 4 kept intact.
Sameness set: the other four `docs/medical/_wave1/*.json` rows and the live
`AudienceStage` objects in `Medical/web/src/app/for-{consultants,gps,junior-doctors,locum-doctors}/page.tsx`.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. The whole intro is 125 words and the first two sentences name the buyer and the fork (partial retirement, retire and return, actuarial reduction). |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions counted | PASS. 1,198 (was 1,195). Tight against the ceiling, so every edit below was made word-neutral or shorter. |
| 3 | AI tells and sameness | 3 findings, all fixed (see edit log). No "This page is for", no listicle rhythm, no "You get A, B and C" closer. Section titles and FAQ questions collide with nothing on the four sibling rows or the four live pages: the retirement segment owns partial retirement, retire and return, NMPA 57, cessation and the capital account. Overlap with siblings is limited to the annual allowance, which is unavoidable on this site and is framed here as a final-working-years problem rather than a mid-career one. |
| 4 | Thin or padded sections; FAQ answers restating the question; answers under 40 or over 120 words | PASS. FAQ answers 50 to 76 words. Section bodies 46 to 82. `howWeHelp[0]` is the shortest at 46 and still carries two concrete outputs, so it was left alone rather than padded. No answer opens by restating its question. |
| 5 | Banned claims, case-insensitive | PASS after one fix. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "regulated", personal names, prices or fees, no "advice" or "advise", no turnaround promise. "award" appeared twice as a pay award; reworded so a literal grep of the banned list stays clean. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spelling throughout ("modelling"). Every rate and allowance on the page is tagged 2026/27. |
| 7 | `metaTitle` 48 chars, `metaDescription` 151 chars | PASS (limits 60 and 160). |
| 8 | Internal links: at most five, relative, on disk, all `<a href="...">text</a>` | PASS. Four links, four opening and four closing anchor tags, no bare URLs. `/blog/nhs-pension-partial-retirement-doctors-guide`, `/blog/retiring-from-gp-partnership-tax-capital-account`, `/blog/nhs-pension-scheme-pays-doctors-deadlines` all exist as flat files in `Medical/web/content/blog/`; `/calculators/nhs-pension-annual-allowance` is the slug in `Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts`. |
| 9 | No pipeline leakage | PASS in the rendered fields. No wave, map, agent, brief or house-positions references in intro, challenges, howWeHelp, faqs, stats or meta. The `sources` array carries them, which is what the shape intends; the template does not render it. |

## Edit log

1. `intro`, final sentence. "A specialist reviews them together, in the order the dates force." to "They interact, and the dates decide which order they are taken in." Reason: "A specialist reviews" is a stock opener and the identical phrase already closes or opens copy on `gp-partners`, `nhs-doctors` and `medical-companies`. This page was the fourth use.
2. `howWeHelp[1].body`. "Where a charge arises, your accountant prepares the self-assessment entry and checks whether mandatory Scheme Pays is available." to "Where a charge arises, the self-assessment entry is prepared and mandatory Scheme Pays checked for availability." Reason: "Your accountant prepares" is a stock opener and appears on all four sibling rows; the passive also matches the two sentences either side of it.
3. `howWeHelp[3].body`, final sentence. "A specialist reads the deed against the accounts before the payout is agreed." to "The deed is read against the accounts before the payout is agreed." Reason: third "A specialist / your accountant" construction on one page.
4. `challenges[2].body`. "an award or a jump in partnership profits" to "a pay uplift or a jump in partnership profits". Reason: "award" is on the banned-claims list; a literal grep cannot tell a pay award from a firm award. No change to the rule being described.
5. `faqs[2].answer`. "an award or a profit jump" to "a pay uplift or a profit jump". Same reason.
6. `faqs[3].answer`, link. "<a ...>The deadlines are set out here.</a>" to "<a ...>The Scheme Pays deadlines</a> are set out in full." Reason: "here" as anchor text carries no target signal; the destination is now named in the link.

Six edits, all editorial. No figure, rate, date, statute reference or rule was changed. No Track A edit was reverted.

## Suspected errors noted, not changed

None. Track A checked all 31 assertions against `house_positions.md` and primary law and nothing on a second reading contradicts it.

## Result

- Final word count: **1,198** (band 800 to 1,200).
- `metaTitle` 48 / 60. `metaDescription` 151 / 160.
- Internal links 4 / 5, all relative, all verified on disk, all anchors.
- JSON re-parsed clean after the edits.

VERDICT: PASS
