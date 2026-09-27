# Factual QA (Track A): salaried-gps

File: `docs/medical/_wave1/salaried-gps.json`
Reviewed 2026-09-27 against `docs/medical/house_positions.md` (§1, §2.B, §2.C, §2.D, §6, §8, §9) and primary law.
Word count (intro + challenges + howWeHelp + faqs, titles and questions included): **1,200**, in band.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Salaried GP = employee, PAYE, Class 1 NIC, active NHS Pension member | HP §1 | CORRECT |
| 2 | intro | Locum/out-of-hours/private sessions are self-employed income | HP §1 | CORRECT |
| 3 | intro, stat 1, ch.2 | Annual allowance £60,000 for 2026/27 | HP §2.B | CORRECT |
| 4 | intro, stat 2, ch.4, faq 4 | 10-week window to pension a freelance locum period | HP §2.C (PCSE, verbatim) | CORRECT |
| 5 | intro, stat 3, ch.1, hwh.1, faq 1 | Register for self assessment by 5 October following the end of the tax year | gov.uk/register-for-self-assessment | CORRECT |
| 6 | stat 4, ch.5 | Top tiered member contribution 12.5%, 2026/27 | HP §2.C table | CORRECT |
| 7 | ch.1 | First paid session outside the contract = sole trader alongside employment | HP §1 | CORRECT |
| 8 | ch.1 | Payments on account where the bill exceeds £1,000 and under 80% collected at source, each 50% of prior year's liability | HP §8; TMA 1970 s.59A | **WRONG as written** ("balancing payment exceeds £1,000"); corrected, see edit 1 |
| 9 | ch.2 | DB measure is the pension input amount, not contributions paid | HP §2.B | CORRECT |
| 10 | ch.2 | Taper: threshold income > £200,000 AND adjusted income > £260,000, £10,000 floor | HP §2.B | CORRECT |
| 11 | ch.2 | Carry forward from the previous three tax years | HP §2.B | CORRECT |
| 12 | ch.3 | Employment expenses on the strict test; trade expenses wholly and exclusively | HP §8; ITTOIA 2005 s.34 | CORRECT |
| 13 | ch.3 | Indemnity, GMC retention fee and List 3 subscriptions deductible (no fee figure quoted) | HP §8, §12 (fee amount UNVERIFIED, correctly omitted) | CORRECT |
| 14 | ch.3, faq 3 | Mileage 55p first 10,000 business miles 2026/27, 25p after; home to first site is commuting | HP §8 | CORRECT |
| 15 | ch.4 | Form A approved by the practice, Form B to PCSE; contributions by the seventh of the following month | HP §2.C | CORRECT |
| 16 | ch.4, faq 4 | Late forms rejected; lost accrual, not a penalty | HP §2.C (verbatim PCSE) | CORRECT |
| 17 | ch.5 | Salaried GP = Type 2 medical practitioner; Type 2 self-assessment records total GP pay | HP §2.C | CORRECT |
| 18 | ch.5 | Type 2 deadline 28 February a year in arrears; 2025/26 due 28 February 2027 | HP §2.C (PCSE) | CORRECT |
| 19 | ch.5 | Tiers on pensionable pay, 5.2% to 12.5%, top band £67,669 and above, 2026/27 | HP §2.C table | CORRECT |
| 20 | ch.6 | Dividend income from a company is not NHS-pensionable | HP §2.C incorporation trap | CORRECT |
| 21 | ch.6 | Corporation tax 19% to £50,000, 25% above £250,000 | HP verification log (gov.uk CT rates, FY2026) | CORRECT |
| 22 | ch.6 | Dividend tax 10.75% / 35.75% / 39.35% for 2026/27 | HP verification log; `dividend_rates_2026_ground_truth` | CORRECT |
| 23 | hwh.2 | Class 4 NIC 6% between £12,570 and £50,270, 2% above | HP §8 | CORRECT |
| 24 | hwh.2 | No Class 2; stopped being a required payment on 6 April 2024 | HP §8 | CORRECT |
| 25 | hwh.4 | Mandatory Scheme Pays: charge > £2,000 AND NHS input > £60,000 | HP §2.D; FA 2004 s.237B | CORRECT |
| 26 | hwh.4 | Elected by 31 July in the following year; 2026/27 to 31 July 2028 | HP §2.D; FA 2004 s.237BA | CORRECT |
| 27 | faq 1 | Self-employed income reportable however small; late registration penalty | HP §8; TMA 1970 | CORRECT |
| 28 | faq 2 | Which pensionable pay sets the tier | HP §2.C (Type 2 exists precisely to reconcile total GP pay to one tier) | **WRONG as written** ("each role is assessed on its own pensionable earnings, so your salaried post keeps its tier" contradicts the Type 2 mechanic stated in the same answer and in ch.5); corrected, see edit 2 |
| 29 | faq 5 | IR35 matters once a company is involved | HP §1.A | CORRECT |
| 30 | faq 5 | VAT registration turns on taxable turnover | HP §6 (exempt medical care does not count toward the threshold; the sentence says "taxable turnover", so it is accurate as written) | CORRECT |
| 31 | faq 5 | Pension route shifts from Type 2 towards the freelance locum forms as locum work dominates | HP §2.C | CORRECT |

### Internal links (all verified on disk)

- `/blog/locum-doctor-self-assessment-filing-guide` -> `Medical/web/content/blog/locum-doctor-self-assessment-filing-guide.md` EXISTS
- `/blog/nhs-pension-for-locums-form-a-form-b` -> `Medical/web/content/blog/nhs-pension-for-locums-form-a-form-b.md` EXISTS
- `/blog/locum-doctor-limited-company-pros-and-cons` -> `Medical/web/content/blog/locum-doctor-limited-company-pros-and-cons.md` EXISTS
- `/for-locum-doctors` -> `Medical/web/src/app/for-locum-doctors/` EXISTS

### `sources` array coverage

Every figure on the page is covered. Two observations, neither a defect:

- The §9 MTD source is cited but the page carries no MTD content. Unused, not wrong. Left in place.
- The corporation tax and dividend line cites a live page file plus the estate ground truth rather than house positions. The figures match the house positions verification log (gov.uk CT rates FY2026; dividends 10.75/35.75/39.35 from 6 Apr 2026), so the figures verify even though the citation is second-hand.

## Edit log

| # | Where | Before | After | Reason |
|---|---|---|---|---|
| 1 | challenges[0].body | "where the balancing payment exceeds £1,000" | "where the prior bill exceeds £1,000" | The payments-on-account trigger is the prior year's liability not collected at source, not the balancing payment. HP §8, TMA 1970 s.59A. |
| 2 | faqs[1].answer | "and each role is assessed on its own pensionable earnings, so your salaried post keeps its tier." | "and your total GP pensionable pay across both roles sets the tier, not the salaried post alone." | The original contradicted the Type 2 mechanic stated two sentences later and in challenges[4]: the Type 2 self-assessment exists to set one tier on total GP pensionable pay. HP §2.C. |

Two edits. No figures removed. JSON re-validated after editing: parses, word count 1,200, in the 800 to 1,200 band.

VERDICT: PASS
