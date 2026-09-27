# Track A factual QA: non-resident-landlords

File: `docs/property/_wave1/non-resident-landlords.json`
Tie-breaker: `docs/property/house_positions.md` (hp). Reviewed 2026-09-27.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | 20% basic rate withheld without gross approval | hp 16.6, 17.5 | CORRECT |
| 2 | stats | 60 days to report and pay a UK land disposal, tax due or not | hp 17.4, 5 | CORRECT |
| 3 | stats | £100 a week tenant withholding threshold | hp 17.5 (=£5,200/yr) | CORRECT |
| 4 | stats | 5 April 2015 default rebasing date, residential | hp 17.4, 5 | CORRECT |
| 5 | intro | Agent may already take 20% off the rent | hp 16.6 | CORRECT |
| 6 | intro | Residence decided by the statutory residence test per tax year | hp 17.1, 17.7 | CORRECT |
| 7 | ch1 | NRL scheme statutory, ITA 2007 ss.971-972 | hp 16.6 (note: never cite FA 1995 Sch 23; page does not) | CORRECT |
| 8 | ch1 | Withholding triggered by landlord's address outside the UK | hp 16.6, 17.5 | CORRECT |
| 9 | ch1 | Agent accounts to HMRC quarterly (NRLQ) | hp 17.5 | CORRECT after edit 1 (was "withholds quarterly") |
| 10 | ch1 | Tenant over £100 a week withholds where no UK agent | hp 17.5 | CORRECT |
| 11 | ch1 | NRL1 individuals, NRL2 companies, NRL3 trustees; approval needs UK affairs up to date | hp 17.5 | CORRECT |
| 12 | ch2 | Self assessment continues for non-resident landlords | hp 17.7 | CORRECT |
| 13 | ch2 | 20/40/45 on property income for 2026/27 | hp 7 | CORRECT |
| 14 | ch2 | Section 24 reducer = 20% basic rate credit for 2026/27 | hp 4, 7 (22% only from 2027/28; page does not misstate) | CORRECT |
| 15 | ch2 | Personal allowance: UK and EEA nationals by domestic law, others by treaty | hp 17.7 | CORRECT |
| 16 | ch3 | Non-resident files within 60 days for every UK land disposal, no tax due included | hp 17.4, 5 | CORRECT |
| 17 | ch3 | Covers commercial land and indirect property-rich disposals | hp 17.4 | CORRECT |
| 18 | ch3 | UK resident files only where tax is due | hp 5 | CORRECT |
| 19 | ch3 | Residential gains 18% and 24%, £3,000 AEA | hp 5, 17.4 | CORRECT |
| 20 | ch4 | In charge: residential 6 Apr 2015, non-residential and indirect 6 Apr 2019 | hp 17.4 | CORRECT |
| 21 | ch4 | Gain defaults to market value at rebasing date | hp 17.4 (rebasing is to 5 Apr 2015 / 5 Apr 2019, not the 6 Apr commencement) | WRONG, fixed (edit 2) |
| 22 | ch4 | Alternatives are apportionment and full historic gain | hp 17.4 | CORRECT |
| 23 | ch5 | Art 6: UK keeps primary taxing rights on UK rental income and property gains | hp 16.2, 16.3 | CORRECT |
| 24 | ch5 | Treaty does not exempt; residence state relieves; Art 4 tie-breaker | hp 16.1, 16.4, 10 | CORRECT |
| 25 | ch5 | Foreign tax credit never automatic, claimed on a return | hp 16.6 do-not-write | CORRECT |
| 26 | hw1 | SRT applied each tax year; year 1 does not settle year 2 | hp 17.7, 17.1 | CORRECT |
| 27 | hw1 | Split-year treatment for the year of departure | hp 17.2 (Cases 1-3 leaving) | CORRECT |
| 28 | hw2 | Approval usually around six weeks | hp 17.5 ("~6 weeks") | CORRECT |
| 29 | hw2 | Let Property Campaign route for undeclared years | hp 27.6 | CORRECT |
| 30 | hw3 | NRL6 = certificate of tax deducted from agent to landlord | hp 17.5 | CORRECT |
| 31 | hw3 | Withheld tax set against liability, over-deductions reclaimed | hp 17.5, 16.6 | CORRECT |
| 32 | hw3 | Foreign tax credit at the final declaration | hp 19.11 | CORRECT |
| 33 | hw3 | "MTD: software checked for foreign property support" | hp 19.11 applies to FOREIGN property income (SA106), not a non-resident's UK property income; the sourced NRL point is that MTD ITSA quarterly filing continues from an overseas address | WRONG, fixed (edit 3) |
| 34 | hw4 | PRR for periods of occupation | hp 5 | CORRECT |
| 35 | hw4 | Temporary non-residence checked before fixing a sale date | hp 17.3 | CORRECT |
| 36 | faq1 | Agent must withhold once landlord is outside the UK; NRL1 for gross | hp 16.6, 17.5 | CORRECT |
| 37 | faq1 | First year abroad may be a split year | hp 17.2 | CORRECT |
| 38 | faq2 | Personal allowance by nationality or treaty, some treaties give nothing | hp 17.7 | CORRECT |
| 39 | faq3 | Yes, 60-day return even with no tax due | hp 17.4 | CORRECT |
| 40 | faq4 | UK land taxable anyway under NRCGT | hp 17.3 do-not-write, 17.4 | CORRECT |
| 41 | faq4 | Temporary non-residence: 5 years or less, UK resident in 4 of the 7 years before departure, gains taxed in the year of return | hp 17.3 | CORRECT |
| 42 | faq5 | Unprompted disclosure gets better penalty treatment | hp 27.2, 27.6 | CORRECT |

No figure was UNSOURCED with no source available; nothing removed.

## Links on disk

- `/services/non-resident-landlord` → `Property/web/src/app/services/non-resident-landlord/` EXISTS
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` → file present, canonical carries that category path, route `src/app/blog/non-resident-landlord-tax/` EXISTS
- `/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide` → file present, canonical matches EXISTS
- `/calculators/rental-income-tax-calculator` and `/calculators/capital-gains-tax-calculator` → both slugs in `Property/web/src/lib/calculators/registry.ts` (BESPOKE imports; GENERIC array checked, no clash) EXIST

## Sources array

Covers every figure and rule used: NRL mechanics (17.5, 16.6), NRCGT and rebasing (17.4, 5), residence, split-year and temporary non-residence (17.1-17.3), personal allowance (17.7), treaty framing (16.2-16.4), rates and Section 24 (7, 4), MTD (19.11), plus gov.uk for the £100 a week threshold. No uncited assertion found. After edit 3 the 19.11 citation now supports what the sentence says.

## Edit log

1. `challenges[0].body`: "withholds basic rate tax from the rent quarterly" → "withholds basic rate tax from the rent and accounts quarterly" (hp 17.5: withholding is on payment, the NRLQ return and remittance are quarterly).
2. `challenges[3].body`: "market value at that rebasing date" → "market value on 5 April 2015 or 5 April 2019" (hp 17.4: rebasing dates are 5 April, the 6 April dates in the same sentence are commencement).
3. `howWeHelp[2].body`: "where Making Tax Digital applies the software is checked for foreign property support" → "where Making Tax Digital applies, quarterly updates continue from overseas" (hp 19.11 NRL bullet; the SA106 software point is about foreign property income, not UK property let by a non-resident).
4. `howWeHelp[2].body`: "over-deductions reclaimed rather than left with HMRC" → "over-deductions reclaimed, not left with HMRC" (word budget only, no meaning change).
5. `howWeHelp[1].body`: "so the ordering matters" → "so ordering matters" (word budget only).
6. `howWeHelp[3].body`: "the 60-day return and payment date against completion" → "the 60-day return and payment against completion" (word budget only).

Edits 4-6 were needed to hold the 800-1,200 band after edits 1-3. Post-edit body word count 1,200. JSON re-parsed clean, no em-dash, metaTitle 44, metaDescription 149.

VERDICT: PASS
