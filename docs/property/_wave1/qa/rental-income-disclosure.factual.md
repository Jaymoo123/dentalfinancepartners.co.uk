# Track A factual QA: rental-income-disclosure

Page: `docs/property/_wave1/rental-income-disclosure.json`
Tie-breaker: `docs/property/house_positions.md` §27.1, 27.2, 27.3, 27.5, 27.6, 27.7
Date: 2026-09-27

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Unprompted non-deliberate failure to notify can reach 0% | HP §27.3 (Sch 41 para 13) | CORRECT |
| 2 | intro | Prompted equivalent starts at 10% under Sch 41 FA 2008 | HP §27.3 | CORRECT |
| 3 | intro | Residential goes LPC, commercial or mixed-use goes DDS | HP §27.6 (no commercial LPC equivalent, use DDS) | CORRECT |
| 4 | intro | Disclosure inside the 90-day window | HP §27.6 | CORRECT |
| 5 | stats | "4, 6 or 20 years" ordinary / careless / deliberate | HP §27.1 (s.34, s.36(1), s.36(1A)) | CORRECT |
| 6 | stats | "0% to 10%" failure-to-notify floor, unprompted vs prompted | HP §27.3 | CORRECT |
| 7 | stats | 90 days to disclose and pay after acknowledgment | HP §27.6 | CORRECT |
| 8 | stats | LPC running since Sept 2013, no announced end date | HP §27.6 (9 September 2013) | CORRECT |
| 9 | ch.1 | LPC open to residential landlords, UK and non-UK resident | HP §27.6 | CORRECT |
| 10 | ch.1 | LPC excludes companies, trusts, commercial property | HP §27.6 | CORRECT |
| 11 | ch.1 | Offshore goes WDF plus Failure to Correct, penalties change sharply | HP §27.6 (FA 2017 Sch 18, 200% reducible to 100%) | CORRECT |
| 12 | ch.2 | Ordinary window 4 years, no behaviour element | HP §27.1 (TMA 1970 s.34) | CORRECT |
| 13 | ch.2 | Careless 6 years under s.36(1) | HP §27.1 | CORRECT |
| 14 | ch.2 | Deliberate 20 years under s.36(1A) | HP §27.1 | CORRECT |
| 15 | ch.2 | Offshore 12 years under s.36A, even without carelessness | HP §27.1 (FA 2019 reform, innocent-error limb) | CORRECT |
| 16 | ch.3 | Sch 41 maxima 30 / 70 / 100% | HP §27.3 Cat 1 column | CORRECT |
| 17 | ch.3 | Sch 41 unprompted floors 0% (non-deliberate, within 12 months of liability arising), 20%, 30% | HP §27.3 para 13 | CORRECT |
| 18 | ch.3 | Sch 41 prompted floors 10 / 35 / 50% | HP §27.3 para 13 | CORRECT |
| 19 | ch.3 | Sch 24 FA 2007 applies where returns were filed but wrong, 15% prompted careless floor | HP §27.2 table | CORRECT |
| 20 | ch.3 | No 12-month qualifier imported into the Sch 24 careless floor | HP §27.2 F-5 correction | CORRECT (trap avoided) |
| 21 | ch.4 | Reconstruction sources: bank statements, tenancies, agent statements, mortgage interest certificates, deposit scheme records | HP §27.7 records covered | CORRECT |
| 22 | ch.4 | Income tax records run 5 years after the 31 January following the tax year | HP §27.7 (TMA 1970 s.12B) | CORRECT |
| 23 | ch.5 | Interest runs from the original due date, is not a penalty, not reduced by coming forward | Qualitative only, no rate quoted; consistent with HP §27.6 (tax + interest + penalty on disclosure) | CORRECT |
| 24 | hwh.2 | Notification carries no penalty consequence; 90 days run from acknowledgment | HP §27.6 step (i) and (ii) | CORRECT |
| 25 | hwh.4 | Telling, helping and giving access move a penalty within its band | HMRC CH82440 quality-of-disclosure reductions; band structure at HP §27.2 / §27.3 | CORRECT |
| 26 | hwh.4 | Suspension available for a careless penalty | HP §27.2 (Sch 24 para 14, up to 2 years, deliberate cannot be suspended) | CORRECT |
| 27 | faq.1 | Unprompted test = no reason to believe HMRC had discovered or was about to | Sch 41 FA 2008 para 12(3) / Sch 24 FA 2007 para 9(2) | CORRECTED (was one limb only, see edit 1) |
| 28 | faq.1 | 0% unprompted vs 10% prompted for non-deliberate within 12 months | HP §27.3 | CORRECT |
| 29 | faq.2 | 4 / 6 / 20 plus 12-year offshore, behaviour assessed year by year | HP §27.1 practical writing rule | CORRECT |
| 30 | faq.4 | A nudge letter is not an assessment; an opened enquiry differs | HP §27.1 (s.29 discovery), §27.4 | CORRECT |
| 31 | faq.5 | Time to pay requested alongside a timely disclosure; interest continues | gov.uk time to pay, qualitative, no figures | CORRECT |
| 32 | faq.6 | Only the Contractual Disclosure Facility carries criminal immunity | HP §27.5 and §27.6 ("WDF gives immunity" is a do-not-write) | CORRECT |
| 33 | faq.6 | CoP9 60-day acceptance window | HP §27.5 | CORRECT |
| 34 | all | No promise of an HMRC outcome | "usually lowers", "often yes", "decides case by case", penalty "argued, not simply filled in" | CORRECT |

**Links on disk.** All four blog paths exist under `Property/web/content/blog/`:
`let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026.md`,
`discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29.md`,
`hmrc-nudge-letter-response-playbook-landlords-property-income.md`,
`cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation.md`.
`/calculators/rental-income-tax-calculator` resolves: `rentalIncomeTaxCalculator` is in the
`GENERIC` array of `Property/web/src/lib/calculators/registry.ts`, slug
`rental-income-tax-calculator`.

**Sources array.** Covers every figure on the page: §27.1 windows, §27.2 Sch 24 bands plus the
F-5 correction, §27.3 Sch 41 bands and the 12-month limb, §27.5 CoP9 60 days, §27.6 LPC scope
and the 90-day window, §27.7 retention, plus the coverage-map row. Two non-numeric assertions
sit just outside it (the quality-of-disclosure reductions and Sch 24 para 14 suspension, both
inside §27.2 and §27.5 territory already cited). No figure is unsourced, so nothing was removed.

**Format.** JSON parses. 1,199 words across intro, challenges, howWeHelp and faqs (band 800 to
1,200). metaTitle 46 chars, metaDescription 156 chars. No em-dashes.

## Edit log

1. `faqs[0].answer` — the unprompted test was stated with one statutory limb only ("no reason to
   believe HMRC was about to discover it"). Sch 41 FA 2008 para 12(3) and Sch 24 FA 2007 para
   9(2) both read "had discovered or are about to discover". Rewritten to "no reason to believe
   HMRC had discovered it, or was about to". Same sentence, dropped the filler word "still" to
   hold the word band.
2. `challenges[3].body` — removed the stray word "here" ("Few landlords here hold clean books"),
   needed to keep the page inside 1,200 words after edit 1. No factual change.

No other edits. No WRONG or STALE figures found.

VERDICT: PASS
