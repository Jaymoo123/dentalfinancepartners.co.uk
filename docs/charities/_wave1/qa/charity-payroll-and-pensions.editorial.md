# Track B editorial and claims QA: charity-payroll-and-pensions (charities)

Reviewed 2026-09-27. File: `docs/charities/_wave1/charity-payroll-and-pensions.json`.
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA" and "Writers").
Sameness baseline: the other six `docs/charities/_wave1/*.json` plus the live rows in
`charities/web/src/data/charity-types.ts` and `charity-services.ts`.
Track A verdict carried in: PASS, with the open note that the intro softened auto-enrolment
timing. That note is closed here.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered in first 150 words of `intro` | PASS. Intro is 125 words; the first sentence names the trigger (volunteers to paid staff) and the rest of the intro lists the four duties it creates |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | WAS 1,202, now **1,199**. FIXED by trimming, no figure or rule touched |
| 3 | AI tells and sameness | DEFECT. "A specialist reviews" opened `howWeHelp` 1 and closed `howWeHelp` 3 and the intro; "Your accountant prepares" opened `howWeHelp` 2. Both are the stock openers running across the charity set (`cics`, `cios`, `grant-making-trusts-and-foundations`, `small-charities`, `trustees-and-treasurers` all use one or both). FIXED: three of the four rewritten to the passive process voice, one deliberate "a specialist reviews" kept in `howWeHelp` 4 where a judgement really is being described |
| 4 | Intro closer | DEFECT, soft variant of the stock closer ("what a specialist reviews before you commit"). FIXED |
| 5 | Listicle rhythm | PASS. Challenge bodies run 47 to 63 words with varied sentence openings; no bullet-shaped prose |
| 6 | Thin or padded sections | PASS. Challenges 47 to 63 words, howWeHelp 38 to 47, no section carrying a single idea stretched |
| 7 | FAQ answers restating the question | PASS. All six answer directly from the first clause ("Yes.", "For 2026/27...", "Usually not without authority.") |
| 8 | FAQ answer length 40 to 120 words | PASS: 72, 67, 73, 67, 65, 65 |
| 9 | Banned claims, case-insensitive | Two substring hits, both FIXED. "Your accountant prepares" contains the banned string "our accountant"; "pay-award commitment" contains "award". No chartered / ICAEW / ACCA / CIOT / "we are accountants" / "our team" / "regulated" / personal name / price / fee / "advice" / "advise" / turnaround promise anywhere in the file |
| 10 | Em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout (organisation, apportionment). The tax year is stated as 2026/27 at every figure |
| 11 | `metaTitle` ≤ 60 | PASS, 38 |
| 12 | `metaDescription` ≤ 160 | PASS, 152 |
| 13 | Internal links, max five, relative, on disk, anchor form | PASS. Three, all `<a href="...">text</a>`: `/for/cics` (`charity-types.ts` slug `cics`), `/services/charity-accounts` and `/services/charity-bookkeeping` (`charity-services.ts` lines 73 and 130) |
| 14 | Pipeline leakage | PASS. No wave, map, agent, prompt or house-positions reference in any rendered field; `sources` is the non-rendered array the template ignores |

No figure, rate, date or rule was changed, and no suspected factual error was found.

## Edit log

1. `intro`: "Automatic enrolment follows within weeks" to "Automatic enrolment duties start on
   day one". Closes the Track A note; the intro now matches `challenges` 3, which correctly says
   duties begin on the day the first member of staff starts.
2. `intro`: closer "This page sets out what a first hire triggers and what a specialist reviews
   before you commit." to "Below is what a first hire triggers, and what it costs." Removes the
   stock closer and the fourth "specialist reviews".
3. `challenges` 2: "any pay-award commitment" to "any agreed pay rise". Removes the "award"
   substring; the meaning is unchanged.
4. `howWeHelp` 1: "A specialist reviews your start date, registers the PAYE scheme and produces
   the first payslips..." to "The PAYE scheme is registered against your intended start date,
   and the first payslips... go out on time."
5. `howWeHelp` 2: "Your accountant prepares the employer NIC position for 2026/27 at 15% above
   the £5,000 secondary threshold and checks eligibility..." to "The employer NIC position for
   2026/27 runs at 15% above the £5,000 secondary threshold, and eligibility... is checked".
   Removes the "our accountant" substring and the stock opener. Both figures unchanged.
6. `howWeHelp` 3: "A specialist reviews scheme choice against your payroll software and files
   the declaration." to "Scheme choice is tested against your payroll software, and the
   declaration is filed."

Six edits.

## Final measures

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,199** (was 1,202)
- `metaTitle`: 38 characters
- `metaDescription`: 152 characters
- JSON re-parsed clean after the edits

VERDICT: PASS
