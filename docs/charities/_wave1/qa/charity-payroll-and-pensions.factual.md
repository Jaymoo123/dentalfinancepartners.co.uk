# Track A factual QA: charity-payroll-and-pensions (charities)

Reviewed 2026-09-27. File: `docs/charities/_wave1/charity-payroll-and-pensions.json`.
Tie-breaker: `docs/charities/house_positions.md` positions 22 and 27; primary law on
gov.uk / legislation.gov.uk where house positions is silent. Word count 1,201, unchanged
(no factual cut was needed).

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, stats, challenges 2, howWeHelp 2, faq 2 | Employer Class 1 NIC 15% for 2026/27 | house position 27; gov.uk rates and thresholds 2026 to 2027 (fetched 09-27, "15%") | CORRECT |
| 2 | intro, stats, challenges 2, howWeHelp 2, faq 2 | Secondary threshold £5,000 a year | house position 27; same gov.uk page (£5,000/yr) | CORRECT |
| 3 | stats, faq 2 | £5,000 = £417 a month | house position 27 (£96/week, £417/month); gov.uk page states £417 monthly | CORRECT |
| 4 | intro, stats, challenges 2, howWeHelp 2, faq 1, faq 2 | Employment Allowance up to £10,500 | house position 27 | CORRECT |
| 5 | intro, stats, faq 1 | Charities including CASCs are eligible for the Employment Allowance | house position 27, quoting gov.uk claim-employment-allowance/eligibility | CORRECT |
| 6 | faq 1, howWeHelp 2 | Connected charities and companies share one Employment Allowance | gov.uk claim-employment-allowance (connected-employer rule) | CORRECT |
| 7 | faq 1 | Claimed through the payroll, reduces NIC until used up or the year ends; check eligibility each tax year | gov.uk claim-employment-allowance | CORRECT |
| 8 | faq 2 | £24,000 salary: 15% of £19,000; £10,500 allowance generally removes the charge | arithmetic on assertions 1, 2, 4 (£24,000 − £5,000 = £19,000; charge £2,850 < £10,500) | CORRECT |
| 9 | stats, challenges 3, faq 3 | Auto-enrolment: worker aged 22 to State Pension age | gov.uk workplace-pensions-employers (fetched 09-27, "aged between 22 and the State Pension age") | CORRECT |
| 10 | stats, challenges 3, faq 3 | £10,000 annual earnings trigger | same page (fetched 09-27, "earn at least £10,000 a year") | CORRECT, current for 2026/27 |
| 11 | challenges 3, intro | Minimum total contribution 8% of qualifying earnings, at least 3% from the employer | gov.uk workplace-pensions/what-you-your-employer-and-the-government-pay (fetched 09-27) | CORRECT |
| 12 | sources only | Qualifying earnings band £6,240 to £50,270 | same page, live 09-27 and still stated as current; band not repeated in the page body | CORRECT, not stale |
| 13 | challenges 3 | Duties begin on the day the first member of staff starts | TPR duties start date; gov.uk workplace-pensions-employers | CORRECT |
| 14 | challenges 3, faq 3 | Write to staff and file a declaration of compliance even if nobody is enrolled | gov.uk workplace-pensions-employers | CORRECT |
| 15 | faq 3 | A worker below the trigger can ask to join and the employer may have to contribute | gov.uk workplace-pensions-employers (entitled/non-eligible jobholders) | CORRECT |
| 16 | challenges 1, howWeHelp 1 | PAYE scheme must be open before the first payment of wages; late FPS penalties apply to charities as to any employer | gov.uk PAYE for employers; no charity carve-out in FA/penalty rules | CORRECT |
| 17 | intro, challenges 4, faq 4 | Payment for acting as a trustee needs express authority (governing document, Commission or statute) and is rare | CC11; Charities Act 2011 s185 excludes payment "in the person's capacity as a charity trustee" | CORRECT |
| 18 | faq 4 | Payment for a separate service is permitted more often, with conditions, and the trustee withdraws from the decision | Charities Act 2011 s185 conditions A to D (written agreement, best interests, minority of board, not prohibited); CC11 conflict-of-interest withdrawal | CORRECT |
| 19 | challenges 4, faq 4 | Unauthorised payment creates a recoverable benefit and a reportable issue; authorised payments are taxable and disclosed in the accounts | CC11; SORP related-party disclosure | CORRECT |
| 20 | challenges 5, faq 5 | Reimbursing a volunteer for costs actually incurred is not taxable pay | CC11 ("paying expenses to trustees is not a trustee payment or benefit"); HMRC volunteer expenses treatment | CORRECT |
| 21 | challenges 5, faq 5 | Round-sum allowances, honoraria, vouchers and mileage above the approved rate can be earnings, bringing PAYE and NIC, and can affect benefit entitlement | HMRC EIM on volunteers and round-sum allowances; AMAP approved amount | CORRECT. No mileage rate figure is stated, so the 55p from 6 Apr 2026 change cannot make the page stale |
| 22 | challenges 6 | A CIC is not a charity but is an employer in the same way | house position 22 | CORRECT |
| 23 | challenges 6 | Charity/subsidiary shared staff cost must be recharged on a defensible basis or the charity subsidises taxable trade | house positions 12 and 13 (trading subsidiary framing) | CORRECT |
| 24 | challenges 6, faq 6 | Apprenticeship levy 0.5% of an annual pay bill above £3 million | gov.uk pay-apprenticeship-levy (fetched 09-27) | CORRECT |
| 25 | challenges 6, faq 6 | £15,000 annual allowance, one allowance shared by connected charities and companies who decide how it is used | same page (fetched 09-27, "only one £15,000 allowance to share between them") | CORRECT |
| 26 | howWeHelp 1 | Employment status for a freelancer checked before the first payment | general employment-status law; no figure asserted | CORRECT |
| 27 | howWeHelp 5 | P60s, benefits-in-kind reporting, staff-cost disclosures | Charities SORP staff-cost note; PAYE year-end | CORRECT |

No WRONG, STALE or UNSOURCED figure was found.

## Links

| Link | Target | On disk |
|---|---|---|
| `/for/cics` | `charities/web/src/data/charity-types.ts` slug `cics` | present |
| `/services/charity-accounts` | `charities/web/src/data/charity-services.ts` slug `charity-accounts` | present |
| `/services/charity-bookkeeping` | same file, slug `charity-bookkeeping` | present |

## Sources array

Covered the NIC, Employment Allowance, auto-enrolment, contribution, levy and CIC
assertions. Two rule areas carried no source line: paying trustees and volunteer expenses
(assertions 17 to 21). Both are correct law, so nothing was removed; the sources array was
extended instead.

## Edit log

1. `sources`: added `https://www.gov.uk/government/publications/trustee-expenses-and-payments-cc11`
   covering assertions 17, 19 and 20.
2. `sources`: added `https://www.legislation.gov.uk/ukpga/2011/25/section/185`
   covering assertions 17 and 18.

No figure, date or rule in `intro`, `stats`, `challenges`, `howWeHelp` or `faqs` was changed.
JSON re-parsed clean after the edit (9 source entries).

## Note for Track B (not a factual defect)

The intro says automatic enrolment "follows within weeks", while `challenges` 3 correctly says
duties begin on the day the first member of staff starts. The challenge is the accurate one;
the intro reads softer than the duty. Editorial call, left alone.

VERDICT: PASS
