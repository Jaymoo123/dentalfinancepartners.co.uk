# Editorial and claims QA (Track B): salaried-gps

File: `docs/medical/_wave1/salaried-gps.json`
Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("QA", "Writers").
Sameness baseline: `docs/medical/_wave1/{gp-partners,medical-companies,nhs-doctors,retiring-doctors}.json` and the live `AudienceStage` objects in `Medical/web/src/app/for-{consultants,gps,junior-doctors,locum-doctors}/page.tsx`.
Track A's two edits (payments on account trigger, FAQ 2 tier answer) are kept unchanged.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside first 150 words of `intro` | PASS. Intro is 122 words total; the employment/PAYE/pension position and the self-employed second income land in the first 60. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | PASS. Was 1,200 (at cap), now **1,189**. Edits were net-reducing by design. |
| 3 | AI tells and sameness | 2 FIXED, see edits 1 and 3. No "This page is for" anywhere on the site. Challenge and howWeHelp titles are all distinct from the four siblings and the four live pages. No stock opener on consecutive items after the fixes. |
| 4 | Thin or padded sections; FAQ answers restating the question; answers 40 to 120 words | PASS. Challenge bodies 63 to 75 words, howWeHelp 43 to 60, FAQ answers 55 to 68. Two FAQs open "Yes." and "No." then answer; none restates the question. |
| 5 | Banned claims (case-insensitive): chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, advice/advise, turnaround promises | PASS, 0 hits. "GMC retention fee" is a third-party cost named without a figure, not our pricing. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout ("capitalised", "modelling"). Every rate and threshold leads 2026/27. |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 49 and 157. |
| 8 | Internal links: at most five, relative, exist on disk, all `<a href>` anchors | PASS. 4 links, all anchors, all relative, all verified: `/blog/locum-doctor-self-assessment-filing-guide`, `/blog/nhs-pension-for-locums-form-a-form-b`, `/blog/locum-doctor-limited-company-pros-and-cons` (flat blog paths, all three `.md` files present in `Medical/web/content/blog/`), `/for-locum-doctors` (`Medical/web/src/app/for-locum-doctors/` present). |
| 9 | No pipeline leakage | PASS. No wave, map, agent or house-positions language in rendered fields. `sources` is the spec's non-rendered array. |

## Edit log

| # | Where | Before | After | Reason |
|---|---|---|---|---|
| 1 | `intro` | "A specialist looks first at four things: whether" | "Four things decide what this costs you: whether" | Sameness. "A specialist" as the intro's actor also closes `retiring-doctors` ("A specialist reviews them together") and opens `howWeHelp[0]` on this same page. Removing it here leaves one use per page and no repeat inside the page. |
| 2 | `howWeHelp[1].body` | "Your accountant prepares the self assessment with employment income and tax already deducted on one side and locum profit on the other, Class 4 National Insurance at 6% ... and no Class 2, which stopped being a required payment on 6 April 2024." | "Both sides go on one return: employment income with tax already deducted, and locum profit carrying Class 4 National Insurance at 6% ... There is no Class 2, which stopped being a required payment on 6 April 2024." | Banned stock opener. "Your accountant prepares" is the verbatim opener of `howWeHelp[1]` on both `gp-partners` and `medical-companies`, i.e. the same slot on three of five pages. Figures unchanged. |
| 3 | `intro` closing sentence | "What follows covers what changes when you take work outside your contract, which costs you can deduct, and what a company would do for side income." | "The deadlines below arrive in a fixed order, and missing the pension ones costs accrual that cannot be bought back." | The "you get A, B and C" intro closer. Replaced with a concrete stake already established on the page (PCSE will not pension a period ended more than 10 weeks ago; accrual lost for good). |
| 4 | `sources` | Entry for `house_positions.md` §9 (MTD for Income Tax) | Removed | Flagged by Track A: cited but the page carries no MTD content. Seven source entries remain, still covering every figure. |

No figure, rate, date or rule was changed. No suspected factual errors beyond the two Track A already corrected.

## Final state

- Word count (intro + challenges + howWeHelp + faqs, titles and questions included): **1,189**, in the 800 to 1,200 band.
- `metaTitle` 49 characters, `metaDescription` 157 characters.
- JSON re-validated after editing: parses.

VERDICT: PASS
