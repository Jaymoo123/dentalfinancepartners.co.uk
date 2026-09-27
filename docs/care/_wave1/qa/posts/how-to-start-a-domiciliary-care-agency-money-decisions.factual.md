# Track A factual QA: how-to-start-a-domiciliary-care-agency-money-decisions

Reviewed 2026-09-27 against `docs/care/house_positions.md` (HP rows), primary law where silent.

**Verdict: PASS.** 0 edits. 0 figures removed. Body 1,195 words.

## Assertions

| # | Assertion | Where | Authority | Grade |
|---|---|---|---|---|
| 1 | NLW £12.71 an hour, 21 and over, from 1 April 2026 | summary, KT4, intro, D4 | HP7 | CORRECT |
| 2 | £10.85 an hour for 18 to 20 | D4 | HP7 | CORRECT |
| 3 | Employer NIC 15% above the £5,000 secondary threshold | KT4, D4 | HP11 | CORRECT |
| 4 | Employment Allowance up to £10,500 a year | D4 | HP12 | CORRECT |
| 5 | Travel time between calls is working time for NMW and must be paid | KT4, FAQ5, D4 | HP6 | CORRECT |
| 6 | AMAP 55p a mile, first 10,000 business miles, from 6 April 2026 | FAQ5, D4 | HP8 | CORRECT |
| 7 | Holiday accrues at 12.07% of hours worked in each pay period, irregular hours | FAQ5, D4 | HP10 | CORRECT |
| 8 | Welfare services by a CQC-registered provider exempt under Group 7, Sch 9 VATA 1994 | KT3, FAQ3, D3 | HP1 | CORRECT |
| 9 | Exempt supplier cannot recover input VAT, budget costs VAT inclusive | KT3, D3 | HP1 | CORRECT |
| 10 | Exempt income does not count to the £90,000 threshold, taxable turnover only | FAQ3, D3 | HP3 | CORRECT |
| 11 | Partial exemption de minimis £625 a month | D3 | HP4 | CORRECT (see note 1) |
| 12 | Corporation tax 19% to £50,000, 25% above £250,000, marginal relief between | FAQ1, D1 | HP18 | CORRECT |
| 13 | Dividend rates 10.75 / 35.75 / 39.35% from 6 April 2026, £500 allowance | D1 | HP28 | CORRECT |
| 14 | MTD for Income Tax £50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028 | FAQ6, D6 | HP27 | CORRECT |
| 15 | CQC registration mandatory before the regulated activity; trading first is a criminal offence under the Health and Social Care Act 2008 | D2 | HP21 | CORRECT |
| 16 | New providers submit a financial viability statement on CQC's own template, normally prepared or validated by an accountant | FAQ2, D2 | HP22 | CORRECT |
| 17 | Rota-based self-employed carers are employees or workers in substance; HMRC audit focus; back-dated PAYE, NIC and NMW | FAQ4, D4 | HP9 | CORRECT |
| 18 | Local authority rates sit against the fair cost of care framework in the Care Act statutory guidance | D5 | HP26 | CORRECT |
| 19 | The applicant named on the CQC registration is the legal entity; a move to a company is a new registration, not an amendment | FAQ1, D1 | HP21 plus CQC registration guidance (entity-level registration) | CORRECT |
| 20 | Sole trader pays income tax and Class 4 NIC on the whole profit as it arises | D1 | ITTOIA 2005 / SSCBA 1992 s.15, HP silent | CORRECT |
| 21 | Scotland, Wales and NI register through the Care Inspectorate, Care Inspectorate Wales and the RQIA; tax, VAT and NMW are UK-wide | closing para | HP default-jurisdiction rule, primary regulators | CORRECT |

No WRONG, no STALE, no UNSOURCED. Every figure in the post traces to an HP row; nothing removed.

## Internal links, all five verified on disk

- `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` -> `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md`, category "CQC and Financial Compliance", slugifies to the path. OK
- `/blog/cqc-and-financial-compliance/cqc-registration-timeline-cash-burn-before-trading` -> same directory, same category. OK
- `/blog/payroll-and-workforce-costs/sleep-in-pay-travel-time-nmw` -> `care/web/content/blog/sleep-in-pay-travel-time-nmw.md`, category "Payroll and Workforce Costs". OK
- `/calculators/true-cost-care-hour-calculator` -> `care/web/src/lib/calculators/tools/true-cost-care-hour.ts`, `slug: "true-cost-care-hour-calculator"` at line 99. OK
- `/services/start-a-domiciliary-care-agency` -> `care/web/src/data/care-services.ts`, slug present. OK

Five links = the cap, not over it.

## Frontmatter

YAML parses. All required keys present. `date`, `dateModified` and `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set). metaTitle 48 chars, metaDescription 152 chars, summary 53 words, 6 FAQs, 5 key takeaways. Category "Business Structure and Acquisition" is verbatim from the list and slugifies to the canonical path. No em-dashes anywhere in the file.

## Notes for Track B

1. D3 states de minimis as a single limb ("exempt input tax exceeds the de minimis limit of £625 a month"). HP4 is a two-part test: £625 a month average **and** less than half of total input tax. Not wrong as written, but do not tighten it in a way that changes the figure; if the sentence is reworded, keep £625 a month.
2. Body is 1,195 words, 5 words under the ceiling. Any editorial addition must be paid for by a cut.
3. Five internal links already, so no new link can be added.
4. Do not change any figure, rate, date or rule; all 21 assertions are graded CORRECT and locked to HP rows.

## Manager

Nothing to fix elsewhere. No HP row needs amending.
