# Factual QA (Track A): medical / retiring-doctors

Reviewed 2026-09-27. File: `docs/medical/_wave1/retiring-doctors.json`.
Tie-breaker: `docs/medical/house_positions.md` (§2, §2.B, §2.C, §2.D, §2.E, §4, §18).
Primary law consulted where house positions is silent.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, ch1, faq1 | Partial retirement open to all sections since 1 October 2023 | HP §2.E | CORRECT |
| 2 | intro, stats, ch1, faq1 | 20% to 100% of accrued benefits, up to two events | HP §2.E | CORRECT |
| 3 | intro, ch1, faq1 | Pensionable pay or commitment must fall at least 10% for the first 12 months | HP §2.E | CORRECT |
| 4 | ch1, faq1 | Continued accrual in the 2015 section while partially retired | HP §2.E, §2 | CORRECT |
| 5 | ch1 | Retire and return needs a break in NHS employment of at least 24 hours | NHSBSA 24-hour break guidance (HP silent) | CORRECT (was unsourced, source added) |
| 6 | ch1 title | The 24-hour break framed as a third route alongside partial retirement and retire and return | NHSBSA: it is a condition of retire and return, not a route | WRONG, fixed |
| 7 | intro, ch2, faq2 | Early benefits carry a permanent actuarial reduction; no percentage asserted anywhere | HP §2.E (do not lock a fixed %) | CORRECT |
| 8 | faq2 | Factors set by NHSBSA and the Government Actuary, revised periodically | HP §2.E | CORRECT |
| 9 | stats, ch2 | NMPA 55 now, 57 for benefits taken on or after 6 April 2028 | HP §18 | CORRECT |
| 10 | ch2 | Cited as Finance Act 2022 s.10 (not FA 2021 s.10) | HP §18 citation correction | CORRECT |
| 11 | ch2 | Access at 55 after that date needs an unqualified right under scheme rules on 4 November 2021 | HP §18 (FA 2004 Sch 36 paras 23ZB/23ZC) | CORRECT |
| 12 | ch2 | NPA 60 (1995), 65 (2008), State Pension Age (2015) | HP §2, §2.E | CORRECT (HP adds "or 65 if later" for 2015; omission is not a misstatement) |
| 13 | ch3, faq3 | DB growth measured as pension input amount, not contributions paid | HP §2.B | CORRECT |
| 14 | stats, ch3, faq3 | Annual allowance £60,000 for 2026/27 | HP §2.B, gov.uk pension schemes rates | CORRECT |
| 15 | ch3, faq3 | Taper: £1 per £2 of adjusted income above £260,000 once threshold income exceeds £200,000, £10,000 floor | HP §2.B | CORRECT |
| 16 | howWeHelp2, faq3 | Carry forward from the previous three tax years | HP §2.B | CORRECT |
| 17 | stats, howWeHelp1 | Lump sum allowance £268,275 on tax-free lump sums | HP §2.B (LTA abolished 6 Apr 2024, replaced by LSA/LSDBA) | CORRECT |
| 18 | ch3, howWeHelp3 | Scheme Pays election closes once entitled to all benefits, FA 2004 s.237B(6) | HP §2.D | CORRECT |
| 19 | howWeHelp3 | 2026/27 charge elected by 31 July 2028, FA 2004 s.237BA | HP §2.D | CORRECT |
| 20 | howWeHelp3 | Revised savings statement on or after 2 May extends to the earlier of three months from it or six years from the end of the tax year | HP §2.D | CORRECT |
| 21 | faq4 | Mandatory Scheme Pays needs charge over £2,000 AND NHS scheme input over the standard £60,000; taper-only charge is voluntary | HP §2.D | CORRECT |
| 22 | faq4 | Scheme Pays costs a permanent benefit reduction | HP §2.D (scheme-set NHSBSA/GAD factors) | CORRECT |
| 23 | ch4, faq5 | NHS goodwill unsellable since 1 April 2004, current instrument SI 2019/251 | HP §4 | CORRECT |
| 24 | ch4, faq5 | Payout is tangibles, working capital, owned premises share and capital account, never a goodwill multiple | HP §4 | CORRECT |
| 25 | ch4 | Premises often in a separate property partnership; last partner standing can hold the whole liability | HP §4 | CORRECT |
| 26 | howWeHelp4 | Type 1 certification runs a year in arrears | HP §2.C (28 February a year in arrears) | CORRECT |
| 27 | howWeHelp4 | "your last certificate falls due on 28 February after you leave" | HP §2.C: the deadline runs from the end of the pension year, not the leaving date; a 2026/27 leaver's certificate is due 28 February 2028 | WRONG, fixed |
| 28 | faq6 | Private practice, medico-legal, insurance medicals, occupational health not NHS-pensionable; dividends never pensionable | HP §2.C | CORRECT |
| 29 | faq6 | BADR 18% from 6 April 2026 against a 24% main rate for a higher-rate taxpayer | HP §4 | CORRECT |
| 30 | faq6 | £1m lifetime limit, two-year conditions | HP §4 | CORRECT |
| 31 | page-wide | Abatement is not asserted anywhere | n/a | CORRECT (no claim to check) |

No figure was left UNSOURCED after the edits, so nothing was removed. No STALE year tags: every rate and allowance is tagged 2026/27 and matches the current house position.

## Links

| Link | On disk |
|---|---|
| `/blog/nhs-pension-partial-retirement-doctors-guide` | `Medical/web/content/blog/nhs-pension-partial-retirement-doctors-guide.md` YES |
| `/blog/retiring-from-gp-partnership-tax-capital-account` | `Medical/web/content/blog/retiring-from-gp-partnership-tax-capital-account.md` YES |
| `/blog/nhs-pension-scheme-pays-doctors-deadlines` | `Medical/web/content/blog/nhs-pension-scheme-pays-doctors-deadlines.md` YES |
| `/calculators/nhs-pension-annual-allowance` | slug in `Medical/web/src/lib/tools/configs/nhs-pension-calculator.ts`, registered in `registry.ts` YES |

## Sources array

Covers HP §2, §2.B, §2.C, §2.D, §2.E, §4, §18 and the coverage map row. One gap found: the 24-hour break carried no source. Added, citing NHSBSA. Sources array now covers every rule on the page.

## Edit log

1. `challenges[0].title`: "Which route fits: partial retirement, retire and return, or a 24-hour break?" to "Which route fits: partial retirement or retire and return?" Reason: the 24-hour break is a condition of retire and return, not a third route (NHSBSA).
2. `challenges[0].body`: "with the 24-hour break sitting behind that route rather than beside it" to "breaking NHS employment for at least 24 hours, then re-engaging on new terms". Reason: states the rule instead of gesturing at it, and matches NHSBSA wording.
3. `howWeHelp[3].body`: "your last certificate falls due on 28 February after you leave" to "your final certificate falls due the 28 February after that pension year ends". Reason: HP §2.C, the deadline runs a year in arrears from the pension year end, not from the leaving date.
4. `sources`: added the NHSBSA retire-and-return / 24-hour break entry, noting house positions is silent on it.

Three content edits, one source addition. JSON re-parsed clean after the edits. Word count 1,195 (was 1,200), inside the 800 to 1,200 band with titles and questions counted. metaTitle 48 chars, metaDescription 151 chars, no em-dash.

VERDICT: PASS
