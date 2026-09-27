# Track A factual QA: umbrella-to-limited-company (contractors-ir35, wave 1)

Reviewed 2026-09-27 against `docs/contractors-ir35/house_positions.md` (locked 2026-06-12) and, where house positions is silent, primary law (FA 2026 c. 11, ITEPA 2003, CTA 2010, VATA 1994) and gov.uk.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | VAT registration threshold £90,000, frozen since 1 April 2024 | HP §9; VATA 1994 Sch 1 | CORRECT |
| 2 | stats | Employer NIC 15% above £5,000, funded from the assignment rate | HP §6, §12 | CORRECT |
| 3 | stats | Flat rate 16.5% for a limited cost trader | HP §9; VAT Notice 733 | CORRECT |
| 4 | stats | Umbrella PAYE joint and several liability starts 6 April 2026 | HP §12; FA 2026 s.24 / ITEPA ss.61Y-61Z2 | CORRECT (see note A) |
| 5 | intro | Figures are 2026/27; Companies House incorporation is same-day scale | HP audience line; general | CORRECT / soft claim, no figure |
| 6 | challenge 1 | Agency must agree to contract with a company, client must accept a PSC, umbrella employment ends on notice | Contractual, not statutory; consistent with HP §12 | CORRECT |
| 7 | challenge 2 | Umbrella runs PAYE cumulatively from 6 April, so part of the personal allowance and basic rate band is used | PAYE Regs 2003 cumulative basis; HP §5 bands | CORRECT |
| 8 | challenge 2 | Final payslip settles accrued holiday pay | HP §12 (holiday pay must be paid, not retained) | CORRECT |
| 9 | challenge 2 | Umbrella deductions = employer NIC 15% + Apprenticeship Levy 0.5% + margin, all from the assignment rate | HP §12 | CORRECT |
| 10 | challenge 3 | Registration compulsory above £90,000 rolling 12 months; deregistration £88,000; both frozen 1 April 2024 | HP §9 | CORRECT |
| 11 | challenge 3 | Limited cost trader test = goods under 2% of turnover or under £1,000 a year, forces 16.5%, tested every period | HP §9 | CORRECT |
| 12 | challenge 4 | Single director company with no other employees cannot claim the £10,500 Employment Allowance | HP §6; NICA 2014 | CORRECT |
| 13 | challenge 4 | Secondary threshold £5,000, LEL £6,708, LEL buys a qualifying NI year for a small slice of employer NIC | HP §6, §8 | CORRECT |
| 14 | challenge 4 | With the allowance available £12,570 is often better; no single optimal salary | HP §8 (EA fork, house stance) | CORRECT |
| 15 | challenge 4 | Dividends from post-CT profit, board minute and voucher, 10.75% / 35.75% / 39.35% from 6 April 2026 | HP §5, §8; FA 2026 s.4 / ITA 2007 s.8 | CORRECT |
| 16 | challenge 5 | Temporary workplace lost once more than 40% of working time over a period exceeding 24 months is expected; relief stops when the expectation forms | HP §10; ITEPA s.339 | CORRECT |
| 17 | challenge 5 | Inside IR35 home to client travel generally not deductible; outside keeps relief subject to the 24-month rule | HP §10 | CORRECT |
| 18 | challenge 5 | AMAP 55p first 10,000 business miles, 25p after, from 6 April 2026 | HP §10; FA 2026 ground truth | CORRECT |
| 19 | challenge 5 | Employer pension contribution free of NIC and deductible for the company | HP §11; FA 2004 s.196 | CORRECT |
| 20 | howWeHelp 2 | Identity verification sits alongside incorporation | ECCTA 2023 Companies House ID verification, compulsory for new directors/PSCs from 18 Nov 2025. HP silent | CORRECT, not in `sources` (see note B) |
| 21 | howWeHelp 3 | P45 year to date figures carried into the new payroll RTI so the code starts right | PAYE Regs 2003 | CORRECT |
| 22 | howWeHelp 4 | Filing set = accounts, CT600, confirmation statement, VAT returns, self assessment; CT position reviewable before year end while a pension contribution can still move it | HP §11 (paid basis) | CORRECT |
| 23 | faq 2 | Accrued holiday pay must be paid out, not retained; P45 carries pay and tax to date | HP §12 | CORRECT |
| 24 | faq 3 | Compulsory registration above £90,000 rolling 12 months or expected within 30 days | HP §9 | CORRECT |
| 25 | faq 4 | Limited cost trader must use 16.5%, removing most of the FRS benefit for labour only work | HP §9 house stance | CORRECT |
| 26 | faq 5 | Dividend only from distributable profit after CT provided for; earlier cash is a director's loan with a charge if outstanding after the year end | HP §14: s.455, **9 months and 1 day** | WRONG as written ("nine months"), CORRECTED |
| 27 | faq 6 | Keeping the PSC turns on the mix of outside and inside work; umbrella often simpler and cheaper for a genuinely inside engagement | HP §17.C | CORRECT |
| 28 | links | 4 blog links and 1 calculator link resolve | `contractors-ir35/web/content/blog/{switching-umbrella-to-limited-company, umbrella-company-deductions-explained, flat-rate-vat-limited-cost-trader, set-up-limited-company-contractor}.md` with categories Umbrella vs Limited Company / MTD and Compliance / Contractor Accounting Basics matching the path segments; `src/lib/calculators/tools/umbrella-vs-limited-calculator` in `registry.ts` | CORRECT, all 5 exist |
| 29 | sources | `sources` array covers every figure cited (§5, §6, §8, §9, §10, §11, §12, §14, §17) | self | CORRECT, one gap (note B) |

Note A: the stat label states only that JSL starts on 6 April 2026. It is not wrong, but no body section explains who becomes liable (the agency contracting with the end client, or the end client where there is no agency) or that the umbrella remains the employer, which is the HP §12 writing rule. No factual error, so no edit; flagged for Track B / the writer as a coverage gap on the page's headline stat.

Note B: the Companies House identity verification assertion is correct under ECCTA 2023 but house positions is silent on it and it is not in `sources`. It is an assertion, not a figure, so it was not removed. Add an ECCTA/Companies House source line if the page is re-touched.

No STALE items: every rate and threshold is on the 2026/27 footing, no 8.75%/33.75% dividends, no 13.8%/£9,100 NIC, no £85,000 VAT, no 45p mileage.

## Edit log

| # | Where | Before | After | Why |
|---|---|---|---|---|
| 1 | faqs[4].answer | "a director's loan, which carries a charge on the company if still outstanding nine months after the year end" | "a director's loan, which carries a section 455 charge on the company if still outstanding nine months and one day after the year end" | HP §14 locks the timing at 9 months and 1 day and names s.455; "nine months" is the wrong date |
| 2 | challenges[2].body | deleted "Many register voluntarily from day one, because a VAT registered client recovers the VAT anyway." | (removed) | Word band. Edit 1 pushed the page to 1,207 words against the 1,200 cap; this sentence is restated almost verbatim in faqs[2], so the deletion loses nothing. Final count 1,195 |

Edits: 2. JSON re-parsed clean after both. Word count 1,195 (band 800 to 1,200, counting section titles and questions). metaTitle 54 chars, metaDescription 152 chars. No em-dashes.

VERDICT: PASS
