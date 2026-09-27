# Editorial and claims QA (Track B): `medical-companies`

Page: `docs/medical/_wave1/medical-companies.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("QA", "Writers").
Siblings read for sameness: the other four `docs/medical/_wave1/*.json` and the four live
`AudienceStage` objects in `Medical/web/src/app/for-*/page.tsx`.
Track A (`medical-companies.factual.md`) PASSED with 1 label edit; that edit is kept untouched.
Reviewed 2026-09-27.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. The whole intro is 124 words, and the situation ("You already have the company... the question is no longer whether to incorporate but how to run it properly") lands in the first 40. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs, titles and questions included | PASS at 1,200 exactly, the ceiling. Was 1,196 on the same counter before the edits; the three edits took it to 1,201 and edit 4 brought it back to 1,200. |
| 3 | AI tells and sameness | 2 defects found, both fixed (edits 2 and 3). See below. |
| 4 | Thin or padded sections, FAQ answers restating the question, answers under 40 or over 120 words | PASS. FAQ answers 67, 62, 88, 74, 76 words, all inside 40 to 120, none restating the question. Challenge bodies 81 to 91. `howWeHelp` bodies 37 to 41, the thinnest set on the site (siblings run 40 to 69), but the page is at the word ceiling, so padding them would break check 2. Noted, not a defect. |
| 5 | Banned claims, case-insensitive | PASS. No "chartered", "ICAEW", "ACCA", "CIOT", "our accountants", "we are accountants", "our team", "award", "regulated", no personal name, no price or fee, no "advice"/"advise", no turnaround promise. One pre-existing near-miss removed: `howWeHelp[1]` opened "Your accountant prepares...", which asserts we are the reader's accountant against the partner-network model. Fixed in edit 2. The only "fee" strings are the statutory "fee-payer". |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash. British spellings throughout ("modelled"). 2026/27 is the leading tax year in intro, stats and challenge 1; 2025/26 appears only where the s.455 date band requires it. |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 46 and 155. |
| 8 | At most five internal links, relative, each exists on disk, all `<a href>` | PASS. Four links, all relative, all anchors, no other HTML tag in the file. `/blog/salary-vs-dividend-medical-limited-company-2026`, `/blog/consultant-directors-loan-account-s455-medical-company` and `/blog/surplus-cash-medical-limited-company-options` each exist at `Medical/web/content/blog/<slug>.md` (flat paths, as Medical uses). `/calculators/private-practice-incorporation` exists as `slug` in `Medical/web/src/lib/tools/configs/incorporation-calculator.ts`. |
| 9 | Pipeline leakage | PASS. No wave, map, brief, prompt or house-position reference in any rendered field. `sources` is the spec's unrendered trailing array. |

## Findings

1. **Stock openers on consecutive `howWeHelp` items.** Item 1 opened "A specialist reviews...",
   item 2 "Your accountant prepares..." - both named tells, back to back. Item 4 then opened
   "A specialist reviews" a second time. "A specialist reviews" also opens `nhs-doctors`
   `howWeHelp[1]`, so three uses of one opener across two Wave 1 pages. Fixed: one use kept
   (item 1, the site's voice sample), items 2 and 4 recast.
2. **Trailing-link rhythm in `challenges`.** Three of five bodies closed on a bare pointer
   sentence ("More in X.", "Worked through in X.", "Options in X."). Fixed: challenge 1's link
   is now inline in a sentence that carries meaning, leaving two trailing pointers, which reads
   as variation rather than a pattern.
3. **No other sameness against siblings.** Challenge titles, intro openings and FAQ questions
   are distinct from the other four Wave 1 pages and from the live `for-consultants`,
   `for-gps`, `for-junior-doctors` and `for-locum-doctors` objects. No "You get A, B and C"
   intro closer. No listicle rhythm in the intro beyond one deliberate enumeration of the four
   recurring decisions, which the page then follows as its structure.
4. **Not changed, noted only.** `metaTitle` is Title Case with no pipe, where all four siblings
   use "X | Y". Cosmetic, inside the length limit, and outside this track's checks.
5. **No suspected factual errors.** No figure, rate, date or rule was touched.

## Edit log

1. `stats[1].label` - inherited from Track A, kept as is. Not a Track B edit.
2. `challenges[0].body` - last sentence recast to inline the link and break the trailing-pointer
   rhythm. Was "More in <a ...>salary versus dividend for a medical limited company</a>."; now
   "Which way the <a ...>salary versus dividend comparison</a> falls depends on how much you
   need to draw." No figure or rule touched.
3. `howWeHelp[1].body` - "Your accountant prepares the statutory accounts and the CT600,
   reconciles... checks... and gives you the payment figure" recast to "Statutory accounts and
   the CT600 are prepared, the director's loan account reconciled to the charge date, capital
   allowances on equipment checked, and the payment figure given to you...". Removes the
   "your accountant" claim and the stock opener. Same deadline, same content.
4. `howWeHelp[3].body` - "A specialist reviews that against your intentions" to "That is tested
   against your intentions", removing the duplicate opener.
5. `challenges[0].body` - dropped the filler "actually" from the new closing sentence to bring
   the count back to the 1,200 ceiling.

Total edits: 4 (Track B). No removals of substance, no figure, rate, date or rule changed.

## Mechanical

- JSON re-validated after every edit: parses.
- Final word count over intro, challenges, howWeHelp and faqs, titles and questions included: **1,200**.
- `metaTitle` **46** characters, `metaDescription` **155** characters.
- Em-dashes: 0. Internal links: 4, all resolving.

VERDICT: PASS
