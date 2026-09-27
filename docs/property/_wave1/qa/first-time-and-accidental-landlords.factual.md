# Track A factual QA: first-time-and-accidental-landlords

Page: `docs/property/_wave1/first-time-and-accidental-landlords.json`
Tie-breaker: `docs/property/house_positions.md` (HP). Primary law where HP is silent.
Reviewed 2026-09-27. Spec: LEADS_250_PROGRAMME_2026-09-27.md s13 S4a, QA Track A.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, stats, challenge 1, faq 1 | 5 October after the end of the tax year is the deadline to notify HMRC | TMA 1970 s.7 six-month obligation, HP 27.3; gov.uk/register-for-self-assessment | CORRECT |
| 2 | challenge 1, faq 1 | Return and payment follow by the next 31 January | TMA 1970 s.8 / s.59B; HP 19.6 final declaration 31 January | CORRECT |
| 3 | challenge 1, faq 5 | Failure to notify penalised as a percentage of tax under Schedule 41 FA 2008 | HP 27.3 | CORRECT |
| 4 | challenge 1, faq 5 | Unprompted disclosure of a non-deliberate failure within 12 months can reach nil | HP 27.3, Sch 41 para 13 unprompted floor 0% | CORRECT |
| 5 | faq 5 | Let Property Campaign is the standard disclosure route for residential landlords with undisclosed rent | HP 27.5, 27.6 (taxpayer-initiated, residential landlords, open since 2013) | CORRECT |
| 6 | intro, stats, challenge 2, howWeHelp 2, faqs 1-2 | Property allowance GBP 1,000 per person per tax year | HP 41, ITTOIA 2005 s.783BD | CORRECT |
| 7 | challenge 2, faq 1 | At or below GBP 1,000 full relief, normally nothing to report | HP 41, s.783BE / s.783BF | CORRECT |
| 8 | challenge 2 | Above that, elect the flat GBP 1,000 instead of actual expenses | HP 41, s.783BK partial relief | CORRECT |
| 9 | challenge 2, faq 2 | Per person, joint owners have one each | HP 41 | CORRECT |
| 10 | challenge 2, faq 2 | The allowance and the Section 24 reducer cannot both be used in the same tax year | HP 41, PIM4460 (verified 2026-07-09) | CORRECT (HP's narrow nil-reducer exception not stated; the page's general rule is the house position and the omission is not an error) |
| 11 | stats, challenge 3 | Section 24 credit is 20% for 2026/27 | HP 4 (20% for 2026/27 and earlier; 22% from 2027/28) | CORRECT |
| 12 | challenge 3 | Mortgage interest is not deducted from rental profit | HP 4 | CORRECT |
| 13 | challenge 3 | Cap = lowest of 20% finance costs, 20% rental profit before finance costs, 20% of income above the personal allowance | HP 4, three-part cap | CORRECT |
| 14 | challenge 3 | Restricted amount carries forward | HP 4 (carries forward indefinitely) | CORRECT |
| 15 | challenge 4 | Consent to let is a lending matter, changes neither the property business nor the notification deadline | Primary law silent; no tax assertion made, correctly framed as non-tax | CORRECT |
| 16 | stats, challenge 5, faq 4 | MTD ITSA: 6 Apr 2026 above GBP 50,000, 6 Apr 2027 above GBP 30,000, 6 Apr 2028 above GBP 20,000 | HP 3, HP 19.1 | CORRECT |
| 17 | challenge 5, faq 4 | Qualifying income is gross rent plus gross self-employment turnover, before deductions | HP 19.2 | CORRECT |
| 18 | faq 4 | GBP 52,000 rent with GBP 40,000 of costs is in scope | HP 19.2, the same worked example | CORRECT |
| 19 | challenge 5, faq 4, howWeHelp 3 | Joint owners test their own share, not the property total | HP 3, HP 19.4 | CORRECT |
| 20 | challenge 6, faq 3 | Gain apportioned across the whole period of ownership; main-residence years covered by PRR | TCGA 1992 ss.222-223; HP 5 | CORRECT |
| 21 | challenge 6, faq 3 | Final nine months always qualify where the property was at some point a main residence | HP 5 (final 9 months deemed occupation) | CORRECT |
| 22 | challenge 6 | Letting relief only where the owner shared occupation with the tenant | HP 5 (restricted from 6 Apr 2020) | CORRECT |
| 23 | challenge 6, faq 3 | Residential CGT 18% and 24% for 2026/27 | HP 5 | CORRECT |
| 24 | challenge 6, faq 3 | Annual exempt amount GBP 3,000 | HP 5 | CORRECT |
| 25 | challenge 6 | Report and pay within 60 days where tax is due | HP 5 (UK residents, where CGT is due; no filing where fully covered) | CORRECT |
| 26 | howWeHelp 4 | Partner network consent wording | `Property/web/src/config/site.ts` `leadConsentText`, first two sentences verbatim | CORRECT |
| 27 | intro | "HMRC treats you as a landlord from the first day of the tenancy, with a return, records and a deadline attached" | No source conflict; qualified two clauses later by the GBP 1,000 allowance test and again in challenge 2 and faq 1 | CORRECT (in context) |

### Internal links

| Link | On disk | Verdict |
|---|---|---|
| `/blog/landlord-tax-essentials/accidental-landlord-taxes-a-complete-guide` | `Property/web/content/blog/accidental-landlord-taxes-a-complete-guide.md`, category "Landlord Tax Essentials" mapping to that slug in `src/lib/blog.ts:146` | CORRECT |
| `/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know` | file present, same category | CORRECT |
| `/calculators/rental-income-tax-calculator` | `registry.ts` GENERIC array, `tools/rental-income-tax-calculator.ts` slug | CORRECT |
| `/calculators/section-24-calculator` | dedicated route `src/app/calculators/section-24-calculator` + registry | CORRECT |
| `/calculators/mtd-checker` | dedicated route + registry | CORRECT |

### Sources array

Eight entries. They cover every figure-bearing claim on the page: HP 3 and 19 (MTD), HP 4
(Section 24), HP 5 (CGT, PRR, letting relief, 60 days), HP 41 (property allowance and the
mutual exclusivity), HP 27.3 plus the LPC position (failure to notify), gov.uk for the
5 October registration line, `site.ts` for the consent wording, and the coverage map row.
No figure on the page is left without an entry, and no entry cites a position the page does
not use. Sources array: CORRECT.

## Edit log

No edits. No WRONG, STALE or UNSOURCED item was found, so the JSON was not modified and no
re-validation was required. Length 1,198 words, inside the 800 to 1,200 band; metaTitle 49
characters, metaDescription 153.

VERDICT: PASS
