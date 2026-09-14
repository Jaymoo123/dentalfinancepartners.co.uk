# Estate search-intent map

Source: Google Search Console API and Bing Webmaster Tools API, pulled fresh 2026-09-14. **GSC data through 2026-09-12** (28-day window 2026-08-16..2026-09-12). No stored Supabase snapshot was used.

## Read this first: the click-level blind spot

GSC site totals for the 28 days are **2,524 clicks / 269,272 impressions**. Sliced by the query dimension, GSC returns only **106 clicks (4.2%) and 78,479 impressions (29.1%)** - the rest sit behind anonymised queries. So:

- Every bucket share below is an **impression-share** measure. It is built on the ~25 percent of impressions GSC will name.
- Query-level clicks from GSC are not usable for ranking intent (72 query rows estate-wide carry a click at all). Bing fills that gap, with its own top-N bias.
- Site totals in the first table come from the empty-dimension aggregate, never from summing query rows.

## 1. Estate totals, 28 days

| site | GSC clicks 28d | GSC impr 28d | CTR | avg pos | share of estate clicks | Bing clicks 28d | Bing impr 28d | GSC clicks 90d |
|---|---|---|---|---|---|---|---|---|
| property | 1,217 | 130,631 | 0.93% | 14.0 | 48.2% | 1,942 | 69,922 | 2,729 |
| solicitors | 682 | 51,264 | 1.33% | 10.0 | 27.0% | 670 | 22,509 | 1,200 |
| generalist | 155 | 26,318 | 0.59% | 24.9 | 6.1% | 711 | 45,871 | 318 |
| dentists | 145 | 15,440 | 0.94% | 17.4 | 5.7% | 110 | 5,251 | 337 |
| construction-cis | 122 | 15,107 | 0.81% | 13.8 | 4.8% | 23 | 1,266 | 207 |
| medical | 63 | 6,799 | 0.93% | 27.1 | 2.5% | 143 | 4,339 | 141 |
| charities | 40 | 8,037 | 0.50% | 40.3 | 1.6% | 84 | 4,564 | 55 |
| pharmacies | 35 | 1,706 | 2.05% | 11.8 | 1.4% | 4 | 157 | 48 |
| care | 21 | 2,399 | 0.88% | 35.5 | 0.8% | 9 | 397 | 34 |
| ecommerce | 17 | 4,274 | 0.40% | 33.1 | 0.7% | 2 | 167 | 24 |
| agency | 10 | 1,660 | 0.60% | 43.8 | 0.4% | 44 | 2,226 | 20 |
| startups-tech | 7 | 2,441 | 0.29% | 53.0 | 0.3% | 7 | 325 | 16 |
| hospitality | 6 | 1,463 | 0.41% | 24.1 | 0.2% | 19 | 1,535 | 11 |
| contractors-ir35 | 3 | 1,318 | 0.23% | 37.8 | 0.1% | 20 | 1,145 | 10 |
| crypto | 1 | 415 | 0.24% | 28.7 | 0.0% | 5 | 96 | 4 |
| **estate** | **2,524** | **269,272** | **0.94%** | | 100% | **3,793** | **159,770** | **5,154** |

Bing 28-day figures are `GetRankAndTrafficStats` daily rows (the only correct Bing total), through 2026-09-12.

## 2. Bucket share of estate (GSC impressions, 28d)

|  | bucket | GSC queries | GSC impr | share | avg pos | Bing impr | Bing clicks | Bing click share |
|---|---|---|---|---|---|---|---|---|
| a | hire-an-accountant commercial | 716 | 16,539 | 21.1% | 41.8 | 407 | 55 | 1.8% |
| b | local commercial (town) | 524 | 5,739 | 7.3% | 40.1 | 344 | 43 | 1.4% |
| c | calculator / how much | 1,374 | 8,992 | 11.5% | 54.5 | 2,522 | 129 | 4.2% |
| d | how-to / process | 442 | 3,589 | 4.6% | 35.7 | 2,455 | 291 | 9.4% |
| e | form-code / HMRC navigational | 104 | 1,927 | 2.5% | 10.1 | 11,165 | 180 | 5.8% |
| f | rate / threshold lookup | 773 | 4,825 | 6.1% | 37.3 | 4,605 | 314 | 10.2% |
| g | decision | 454 | 2,518 | 3.2% | 28.6 | 1,770 | 385 | 12.5% |
| h | deadline / date | 78 | 669 | 0.9% | 28.7 | 173 | 35 | 1.1% |
| i | software / tool | 260 | 4,005 | 5.1% | 31.5 | 218 | 27 | 0.9% |
| j | other | 5,674 | 29,676 | 37.8% | 36.0 | 21,962 | 1,621 | 52.6% |

Bing columns come from `GetQueryStats`, a click-rich top-N slice summed across its weekly rows - use it for the intent MIX, never as a total.

## 3. Per site

### property (propertytaxpartners.co.uk)

GSC 28d: 1,217 clicks / 130,631 impr / 0.93% CTR / pos 14.0. Named-query coverage: 32,914 impr (25%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 2,842 | 14,148 | 43.0% | 17 | 33.6 |
| c calculator / how much | 732 | 5,843 | 17.8% | 0 | 56.6 |
| f rate / threshold lookup | 508 | 3,544 | 10.8% | 11 | 32.8 |
| b local commercial (town) | 199 | 1,917 | 5.8% | 2 | 22.6 |
| a hire-an-accountant commercial | 117 | 1,822 | 5.5% | 18 | 41.4 |
| d how-to / process | 150 | 1,718 | 5.2% | 0 | 18.6 |
| e form-code / HMRC navigational | 64 | 1,643 | 5.0% | 14 | 7.7 |
| g decision | 255 | 1,503 | 4.6% | 5 | 28.0 |
| h deadline / date | 53 | 531 | 1.6% | 1 | 27.7 |
| i software / tool | 50 | 245 | 0.7% | 0 | 22.6 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| what are the cheapest estate agents in the uk with fixed fees | other | 585 | 0 | 7.0 | /blog/capital-gains-tax/cheapest-estate-agent-fees-uk |
| sa105 | form-code / HMRC navig | 515 | 2 | 6.9 | /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| sdlt transfer property to limited company connected party | how-to / process | 445 | 0 | 9.4 | /blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost |
| commercial mortgage calculator | calculator / how much | 418 | 0 | 54.1 | /calculators/commercial-mortgage-calculator |
| sdlt transfer property to limited company connected party 2025 | how-to / process | 300 | 0 | 7.9 | /blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost |
| sa105 form 2026 | form-code / HMRC navig | 263 | 2 | 3.2 | /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| hmrc connected party property transfer company to personal name market value 2022 | how-to / process | 229 | 0 | 8.3 | /blog/incorporation-and-company-structures/charging-market-rent-to-own-property-company-tax-treatment |
| hmrc cgt reporting deadlines 2026 | deadline / date | 226 | 0 | 18.6 | /blog/capital-gains-tax/cgt-reporting-deadlines-property-2026 |
| selling a rental property | other | 194 | 0 | 16.5 | /blog/portfolio-management/when-to-sell-rental-property-key-indicators-landlords |
| hmrc cgt reporting requirements 2026 | how-to / process | 181 | 0 | 19.4 | /blog/capital-gains-tax/cgt-reporting-deadlines-property-2026 |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide | 94 | 5,064 | 5.0 |
| /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | 89 | 2,420 | 4.4 |
| /blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk | 64 | 10,725 | 4.7 |
| /blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide | 59 | 1,345 | 7.0 |
| /blog/capital-gains-tax/cgt-overseas-property-uk-residents-foreign-disposals | 36 | 1,743 | 6.3 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| nrl1 | form-code / HMRC navig | 18 | 704 | 5.2 |
| nrl1 form | form-code / HMRC navig | 14 | 1,204 | 4.6 |
| section 24 | other | 8 | 336 | 4.1 |
| property tax partners | hire-an-accountant com | 8 | 36 | 5.0 |
| ppr | other | 6 | 296 | 5.4 |
| sa105 | form-code / HMRC navig | 6 | 916 | 4.8 |
| integral features capital allowances | rate / threshold looku | 5 | 29 | 2.7 |
| sa 105 form 2026 | form-code / HMRC navig | 4 | 20 | 4.3 |


### solicitors (accountsforlawyers.co.uk)

GSC 28d: 682 clicks / 51,264 impr / 1.33% CTR / pos 10.0. Named-query coverage: 11,085 impr (22%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 928 | 5,595 | 50.5% | 16 | 21.9 |
| a hire-an-accountant commercial | 108 | 3,459 | 31.2% | 0 | 29.1 |
| c calculator / how much | 168 | 708 | 6.4% | 0 | 7.1 |
| f rate / threshold lookup | 66 | 451 | 4.1% | 0 | 25.8 |
| d how-to / process | 59 | 347 | 3.1% | 0 | 40.5 |
| b local commercial (town) | 77 | 272 | 2.5% | 0 | 25.5 |
| g decision | 51 | 193 | 1.7% | 0 | 14.8 |
| i software / tool | 9 | 43 | 0.4% | 0 | 18.6 |
| h deadline / date | 2 | 17 | 0.2% | 0 | 9.6 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| accountants for solicitors | hire-an-accountant com | 402 | 0 | 38.8 | /locations |
| law firm accounting | hire-an-accountant com | 348 | 0 | 21.8 | /blog |
| accounting for solicitors | hire-an-accountant com | 294 | 0 | 18.5 | /blog |
| legal accounting | hire-an-accountant com | 228 | 0 | 23.8 | /blog |
| solicitor accountants | hire-an-accountant com | 215 | 0 | 45.4 | /locations |
| solicitors accounts rules | other | 181 | 0 | 21.3 | /blog/sra-accounts-rules/sra-accounts-rules-explained-for-uk-solicitors |
| solicitor accountant | hire-an-accountant com | 170 | 0 | 53.7 | /locations |
| work in progress law firm | other | 153 | 0 | 16.3 | /blog/practice-accounting/wip-valuation-method-uk-law-firms |
| accountants for lawyers | hire-an-accountant com | 124 | 0 | 18.0 | /contact |
| sra accounts rules | other | 119 | 0 | 6.1 | /blog/sra-accounts-rules/sra-accounts-rules-explained-for-uk-solicitors |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/vat-compliance/vat-on-overseas-clients-uk-legal-services | 98 | 2,234 | 4.6 |
| /solicitor-guides/legal-aid-billing-laa-ccms | 48 | 1,971 | 7.6 |
| /blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 | 36 | 4,903 | 6.8 |
| /blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour | 32 | 5,132 | 9.0 |
| /blog/sra-compliance-trust-accounting/probate-estate-administration-client-account-sra | 30 | 1,128 | 3.8 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| colp | other | 10 | 606 | 4.4 |
| sra accounts rules | other | 9 | 1,750 | 4.1 |
| solicitors accounts rules | other | 5 | 414 | 5.2 |
| vat on client accounts uk | other | 3 | 2 | 2.0 |
| sra reporting and notification requirements | how-to / process | 3 | 5 | 3.6 |
| if a solicitor is a trustee who pays the solicitor | decision | 3 | 1 | 1.0 |
| can i deduct money from my employees wages to fund a sqe training/qualification. | decision | 3 | 2 | 2.0 |
| sra principles | other | 3 | 472 | 3.9 |


### generalist (hollowaydavies.co.uk)

GSC 28d: 155 clicks / 26,318 impr / 0.59% CTR / pos 24.9. Named-query coverage: 11,148 impr (42%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 707 | 2,995 | 26.9% | 0 | 51.2 |
| a hire-an-accountant commercial | 193 | 2,813 | 25.2% | 0 | 31.7 |
| i software / tool | 120 | 2,327 | 20.9% | 1 | 27.6 |
| c calculator / how much | 255 | 1,044 | 9.4% | 0 | 73.8 |
| b local commercial (town) | 138 | 961 | 8.6% | 0 | 46.7 |
| g decision | 74 | 415 | 3.7% | 0 | 32.1 |
| d how-to / process | 108 | 362 | 3.2% | 0 | 33.5 |
| h deadline / date | 10 | 99 | 0.9% | 0 | 33.4 |
| f rate / threshold lookup | 47 | 92 | 0.8% | 0 | 50.8 |
| e form-code / HMRC navigational | 12 | 40 | 0.4% | 0 | 61.4 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| payroll accounting | hire-an-accountant com | 490 | 0 | 28.1 | /blog/payroll-and-paye/accountant-for-payroll-uk-business-guide |
| accounting software for construction | software / tool | 293 | 0 | 26.1 | /blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors |
| accounting and payroll | hire-an-accountant com | 225 | 0 | 23.2 | /blog/payroll-and-paye/accountant-for-payroll-uk-business-guide |
| contractor accounting software | software / tool | 201 | 0 | 21.1 | /blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors |
| service charge accounts | other | 190 | 0 | 60.6 | /blog/bookkeeping-and-compliance/accounting-for-service-charges-uk-guide-2025-26 |
| accounting for traders | hire-an-accountant com | 178 | 0 | 14.8 | /blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk |
| accounting software for contractors | software / tool | 173 | 0 | 17.3 | /blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors |
| accounting software for builders | software / tool | 160 | 0 | 24.6 | /blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors |
| accounting software for construction contractors | software / tool | 157 | 0 | 20.5 | /blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors |
| accountant for payroll | hire-an-accountant com | 152 | 0 | 10.4 | /blog/payroll-and-paye/accountant-for-payroll-uk-business-guide |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/sole-trader-and-self-employment/self-assessment-tax-return-guide-stopped-trading-mid-year | 13 | 1,604 | 12.6 |
| /blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | 12 | 1,120 | 9.7 |
| /blog/bookkeeping-and-compliance/correct-confirmation-statement-error | 10 | 991 | 6.3 |
| /blog/corporation-tax/rent-charge-connected-company-corporation-tax | 10 | 220 | 5.4 |
| / | 9 | 54 | 5.2 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| capital allowances on vans | rate / threshold looku | 9 | 97 | 3.9 |
| benefit in kind | other | 7 | 978 | 5.5 |
| p11d benefits | form-code / HMRC navig | 5 | 216 | 3.2 |
| how to claim back tax overpaid uk | how-to / process | 5 | 37 | 5.7 |
| how do i get a tax refund for overpaid paye last year | how-to / process | 5 | 64 | 4.7 |
| p11d | form-code / HMRC navig | 4 | 4,851 | 7.6 |
| can i claim back overpaid tax | decision | 4 | 23 | 5.7 |
| back taxes | other | 3 | 5 | 5.6 |


### dentists (dentalfinancepartners.co.uk)

GSC 28d: 145 clicks / 15,440 impr / 0.94% CTR / pos 17.4. Named-query coverage: 5,045 impr (33%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 44 | 1,924 | 38.1% | 1 | 43.4 |
| b local commercial (town) | 51 | 1,083 | 21.5% | 0 | 47.9 |
| j other | 234 | 1,048 | 20.8% | 1 | 26.3 |
| c calculator / how much | 31 | 396 | 7.8% | 2 | 35.9 |
| d how-to / process | 20 | 372 | 7.4% | 0 | 51.9 |
| g decision | 18 | 93 | 1.8% | 0 | 37.2 |
| i software / tool | 7 | 88 | 1.7% | 0 | 7.2 |
| f rate / threshold lookup | 7 | 41 | 0.8% | 0 | 14.3 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| dental accountants | hire-an-accountant com | 464 | 0 | 44.2 | / |
| accountants for dentists | hire-an-accountant com | 412 | 0 | 42.6 | / |
| dentist accountants near me | local commercial (town | 288 | 0 | 71.8 | /locations/manchester |
| specialist dental accountants | hire-an-accountant com | 237 | 0 | 45.1 | / |
| accounting for dentists | hire-an-accountant com | 127 | 0 | 42.9 | / |
| dental accounting | hire-an-accountant com | 123 | 0 | 45.5 | / |
| specialist accountants for dentists | hire-an-accountant com | 88 | 0 | 47.9 | / |
| selling a dental practice taxes | other | 69 | 0 | 9.1 | /blog/buying-a-practice/dental-practice-goodwill-buying-selling |
| selling a dental practice taxes manchester | local commercial (town | 69 | 0 | 9.3 | /blog/buying-a-practice/dental-practice-goodwill-buying-selling |
| buying a dental practice checklist uk | other | 68 | 0 | 7.3 | /blog/buying-a-practice/practice-acquisition-financial-due-diligence |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/nhs-contracts/uda-value-explained-for-uk-dentists | 29 | 2,560 | 5.9 |
| /blog/practice-finance/sole-trader-vs-limited-company-dentists-uk | 18 | 581 | 4.7 |
| /blog/practice-accounting/laboratory-costs-dental-accounts-uk | 9 | 575 | 5.5 |
| /blog/associate-tax/dentist-pension-contributions-tax-relief-uk | 8 | 398 | 7.6 |
| /blog/locum-tax/foundation-dentist-dft-first-year-tax-guide | 8 | 121 | 5.4 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| ebitda dental practice valuation | other | 4 | 6 | 4.0 |
| vat for dentallabs | other | 3 | 4 | 3.0 |
| clawback for nhs associates how it works | other | 3 | 2 | 6.0 |
| what percentage of slary should a dentist save into a penion | rate / threshold looku | 2 | 1 | 2.0 |
| dentist superannuation uk | other | 2 | 3 | 2.0 |
| how do i report associate dentist income from off their payslips on the tax return | how-to / process | 2 | 3 | 5.0 |
| average profit of dentist praxctice owner | other | 2 | 1 | 2.0 |
| what if a dentist takes part of their pension are they still eligible for superannuation and arr | decision | 2 | 3 | 6.0 |


### construction-cis (tradetaxspecialists.co.uk)

GSC 28d: 122 clicks / 15,107 impr / 0.81% CTR / pos 13.8. Named-query coverage: 3,099 impr (21%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 46 | 1,028 | 33.2% | 0 | 33.7 |
| j other | 193 | 995 | 32.1% | 3 | 45.1 |
| i software / tool | 30 | 390 | 12.6% | 0 | 18.1 |
| b local commercial (town) | 27 | 350 | 11.3% | 0 | 42.1 |
| e form-code / HMRC navigational | 19 | 154 | 5.0% | 5 | 22.4 |
| d how-to / process | 17 | 118 | 3.8% | 0 | 69.7 |
| c calculator / how much | 11 | 34 | 1.1% | 0 | 61.3 |
| h deadline / date | 11 | 17 | 0.5% | 0 | 39.1 |
| g decision | 2 | 7 | 0.2% | 0 | 30.9 |
| f rate / threshold lookup | 2 | 6 | 0.2% | 0 | 12.8 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| accountant for tilers | hire-an-accountant com | 121 | 0 | 7.9 | /for/tilers |
| cis payroll software | software / tool | 115 | 0 | 11.3 | /blog/software-and-tools/cis-payroll-software-guide |
| accountant for plasterers | hire-an-accountant com | 104 | 0 | 11.3 | /for/plasterers |
| tilers accountant | hire-an-accountant com | 97 | 0 | 8.5 | /for/tilers |
| roofers accountant | hire-an-accountant com | 93 | 0 | 52.6 | /for/roofers |
| accountant for roofers | hire-an-accountant com | 90 | 0 | 74.2 | /for/roofers |
| accountants for roofers | hire-an-accountant com | 86 | 0 | 48.5 | /for/roofers |
| plasterers accountant | hire-an-accountant com | 86 | 0 | 17.1 | /for/plasterers |
| cis contractors accountant | hire-an-accountant com | 67 | 0 | 29.6 | /blog/cis-basics/what-is-a-cis-accountant |
| cis software free | software / tool | 63 | 0 | 20.3 | /blog/software-and-tools/cis-payroll-software-guide |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/cis-basics/what-construction-work-is-not-cis | 32 | 4,292 | 6.2 |
| /blog/cis-basics/cis-invoice-splitting-labour-materials | 18 | 869 | 5.6 |
| /cis-payment-deduction-statement-template | 11 | 393 | 19.6 |
| /blog/software-and-tools/quickbooks-cis-guide | 7 | 827 | 6.7 |
| /blog/software-and-tools/cis-payroll-software-guide | 4 | 770 | 15.1 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| trade cis carpenter | other | 2 | 2 | 1.0 |
| drainage cis | other | 2 | 1 | 4.0 |
| cis back claculator | other | 1 | 2 | 2.0 |
| cis return amendment – penalty? accounting webb | deadline / date | 1 | 1 | 7.0 |
| cest for cis workers | other | 1 | 1 | 9.0 |
| cis return dates 2026-27 | rate / threshold looku | 1 | 2 | 6.0 |
| cis or sole trader which is better | decision | 1 | 1 | 1.0 |
| deadline to pay the cis for may 2026 in uk | deadline / date | 1 | 1 | 3.0 |


### charities (trusteetax.co.uk)

GSC 28d: 40 clicks / 8,037 impr / 0.50% CTR / pos 40.3. Named-query coverage: 4,260 impr (53%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 49 | 1,274 | 29.9% | 0 | 68.8 |
| j other | 162 | 1,143 | 26.8% | 2 | 58.2 |
| b local commercial (town) | 1 | 923 | 21.7% | 0 | 59.6 |
| i software / tool | 26 | 721 | 16.9% | 0 | 46.1 |
| f rate / threshold lookup | 13 | 66 | 1.5% | 0 | 43.9 |
| d how-to / process | 23 | 65 | 1.5% | 0 | 58.6 |
| c calculator / how much | 7 | 35 | 0.8% | 0 | 84.8 |
| g decision | 17 | 28 | 0.7% | 0 | 57.6 |
| h deadline / date | 2 | 5 | 0.1% | 0 | 63.6 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| charity accountants near me | local commercial (town | 923 | 0 | 59.6 | /contact |
| charity accounting software | software / tool | 252 | 0 | 40.7 | /blog/charity-accounts-and-sorp/charity-accounting-software-compared |
| accounting for charities | hire-an-accountant com | 224 | 0 | 75.0 | /services/charity-accounts |
| accounting software for charities | software / tool | 191 | 0 | 46.9 | /blog/charity-accounts-and-sorp/charity-accounting-software-compared |
| charity audit | hire-an-accountant com | 190 | 0 | 82.8 | /guides/audit-vs-independent-examination |
| charity audits | hire-an-accountant com | 116 | 0 | 79.4 | /guides/audit-vs-independent-examination |
| do charities pay vat on investment management fees | other | 89 | 0 | 71.1 | /guides/charity-vat-guide |
| cic accounting | hire-an-accountant com | 84 | 0 | 53.1 | /for/cics |
| charity vat exemption certificate | other | 73 | 0 | 43.5 | /services/charity-vat |
| charity independent examination | hire-an-accountant com | 70 | 0 | 69.3 | /services/independent-examination |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /guides/cic-complete-guide | 12 | 894 | 20.5 |
| /guides/set-up-a-charity-cio | 6 | 288 | 25.6 |
| /blog/gift-aid/gift-aid-declaration-wording | 5 | 223 | 7.4 |
| /blog/independent-examination-and-audit/independent-examiners-report-template | 3 | 94 | 7.4 |
| /guides/charity-vat-guide | 3 | 522 | 60.5 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| how to get reduce rate vat certificate for charity in england | how-to / process | 2 | 1 | 3.0 |
| gift aid rules for sponsorship of overseas treks and wording for donors | other | 1 | 2 | 2.0 |
| can a cic offer tax efficient giving? | decision | 1 | 2 | 4.0 |
| what should a gift aid form read | other | 1 | 2 | 3.0 |
| gift aid declarations one off or all | other | 1 | 2 | 3.0 |
| charity commission, submit annual returns | how-to / process | 1 | 1 | 6.0 |
| charity commission annual return information england | other | 1 | 1 | 5.0 |
| declarationgift aid | other | 1 | 1 | 3.0 |


### medical (medicalaccounts.co.uk)

GSC 28d: 63 clicks / 6,799 impr / 0.93% CTR / pos 27.1. Named-query coverage: 3,437 impr (51%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 71 | 2,815 | 81.9% | 2 | 51.4 |
| j other | 91 | 307 | 8.9% | 0 | 25.1 |
| g decision | 14 | 124 | 3.6% | 0 | 15.1 |
| b local commercial (town) | 8 | 117 | 3.4% | 0 | 43.7 |
| c calculator / how much | 18 | 55 | 1.6% | 0 | 12.5 |
| f rate / threshold lookup | 8 | 16 | 0.5% | 0 | 54.4 |
| d how-to / process | 3 | 3 | 0.1% | 0 | 18.0 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| medical accountants | hire-an-accountant com | 425 | 0 | 34.2 | / |
| gp accountants | hire-an-accountant com | 293 | 0 | 37.3 | / |
| accountants for doctors | hire-an-accountant com | 261 | 0 | 68.1 | / |
| medical accountant | hire-an-accountant com | 213 | 0 | 63.8 | / |
| specialist medical accountants | hire-an-accountant com | 145 | 2 | 48.7 | / |
| doctor accountants | hire-an-accountant com | 108 | 0 | 57.9 | / |
| medical accounting | hire-an-accountant com | 104 | 0 | 68.6 | / |
| accountant for doctors | hire-an-accountant com | 98 | 0 | 47.9 | / |
| gp practice accountants | hire-an-accountant com | 95 | 0 | 63.3 | / |
| medical accountants uk | hire-an-accountant com | 86 | 0 | 42.6 | / |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/becoming-gp-partner-financial-implications | 16 | 813 | 6.9 |
| /blog/gp-partner-vs-salaried-gp-tax-comparison | 11 | 1,091 | 7.2 |
| /blog/buying-into-gp-partnership-capital-parity-explained | 7 | 393 | 9.2 |
| / | 6 | 3,228 | 48.0 |
| /blog/locum-tax | 5 | 345 | 8.7 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| has doctors table3 vat exemption been updated since may 2007 uk genyoutube | other | 2 | 1 | 3.0 |
| gp partner vs salaried | decision | 2 | 2 | 1.0 |
| understand gp practice capital account uk | other | 2 | 4 | 4.0 |
| nhs gp tax returns | other | 2 | 2 | 4.0 |
| pcse gp remittance advice | other | 2 | 4 | 4.0 |
| gp vat exemption letter | other | 2 | 1 | 1.0 |
| would medical practicitioner claims protection class as an allowable expense for a doctor | other | 2 | 4 | 2.0 |
| gp partnership tax bill explained | other | 2 | 2 | 2.0 |


### ecommerce (ecommercefinance.co.uk)

GSC 28d: 17 clicks / 4,274 impr / 0.40% CTR / pos 33.1. Named-query coverage: 1,781 impr (42%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 150 | 1,395 | 78.3% | 1 | 51.9 |
| a hire-an-accountant commercial | 11 | 132 | 7.4% | 0 | 84.8 |
| g decision | 9 | 96 | 5.4% | 0 | 27.4 |
| d how-to / process | 16 | 66 | 3.7% | 0 | 70.9 |
| b local commercial (town) | 7 | 42 | 2.4% | 0 | 95.4 |
| c calculator / how much | 6 | 38 | 2.1% | 0 | 40.6 |
| f rate / threshold lookup | 3 | 8 | 0.4% | 0 | 22.4 |
| e form-code / HMRC navigational | 2 | 4 | 0.2% | 0 | 9.5 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| ioss registered intermediary risk | other | 92 | 0 | 49.4 | /services/selling-into-the-eu |
| ioss intermediary uk | other | 89 | 0 | 26.5 | /vat/ioss-vs-oss |
| ioss intermediary | other | 77 | 0 | 55.4 | /services/selling-into-the-eu |
| ioss vat scheme explained | other | 56 | 0 | 45.2 | /vat/ioss-vs-oss |
| ioss vat | other | 46 | 0 | 50.9 | /vat/ioss-vs-oss |
| import one stop shop | other | 45 | 0 | 84.6 | /services/selling-into-the-eu |
| ioss uk | other | 40 | 0 | 43.4 | /vat/ioss-vs-oss |
| ecommerce finance | other | 38 | 0 | 58.1 | /terms |
| ioss and oss | other | 35 | 0 | 25.9 | /vat/ioss-vs-oss |
| oss e commerce | other | 34 | 0 | 30.0 | /vat/ioss-vs-oss |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /research/online-seller-index | 4 | 900 | 8.1 |
| /blog/amazon-and-marketplace-selling/print-on-demand-tax-uk | 3 | 150 | 7.5 |
| /services/hmrc-letter-online-sales | 3 | 145 | 28.9 |
| /vat/deemed-supplier-establishment | 3 | 111 | 13.1 |
| /blog/amazon-and-marketplace-selling/etsy-fees-vat-and-tax | 2 | 157 | 9.6 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| does a sole trader class as a private seller for ecommerce | decision | 1 | 3 | 3.0 |
| do etsy ,ebay amazon and other selling platforms inform hrmc what sellers make | other | 1 | 1 | 1.0 |
| which online selling platforms do not report to hmrc | how-to / process | 1 | 1 | 4.0 |
| uk self assessment trading allowance for online sellers | rate / threshold looku | 0 | 3 | 1.0 |
| hmrc import vat 135 | other | 0 | 1 | 4.0 |
| etsy vat on orders | other | 0 | 1 | 9.0 |
| supplier is in the eu and the goods on this invoice are dealt with under the £135 consignment rules. | other | 0 | 1 | 10.0 |
| does etsy charge for vat | other | 0 | 1 | 9.0 |


### startups-tech (foundertaxpartners.co.uk)

GSC 28d: 7 clicks / 2,441 impr / 0.29% CTR / pos 53.0. Named-query coverage: 1,708 impr (70%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 156 | 844 | 49.4% | 0 | 56.7 |
| c calculator / how much | 51 | 501 | 29.3% | 0 | 78.8 |
| i software / tool | 16 | 189 | 11.1% | 0 | 76.7 |
| d how-to / process | 25 | 142 | 8.3% | 0 | 57.7 |
| a hire-an-accountant commercial | 4 | 19 | 1.1% | 0 | 87.4 |
| e form-code / HMRC navigational | 2 | 6 | 0.4% | 0 | 37.3 |
| g decision | 3 | 4 | 0.2% | 0 | 37.2 |
| f rate / threshold lookup | 1 | 3 | 0.2% | 0 | 78.7 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| enterprise management schemes | other | 110 | 0 | 43.8 | /blog/share-schemes-and-emi/what-is-emi |
| r&d tax credit calculator | calculator / how much | 84 | 0 | 89.6 | /calculators/rd-relief-estimator |
| seis advance assurance | other | 80 | 0 | 65.6 | /services/seis-eis-advance-assurance |
| apply for seis advance assurance | how-to / process | 60 | 0 | 47.5 | /services/seis-eis-advance-assurance |
| seis advance assurance application | other | 59 | 0 | 69.3 | /services/seis-eis-advance-assurance |
| r&d tax relief calculator | calculator / how much | 58 | 0 | 90.0 | /calculators/rd-relief-estimator |
| eis advance assurance | other | 46 | 0 | 58.7 | /services/seis-eis-advance-assurance |
| emi share options tax calculator | calculator / how much | 46 | 0 | 31.8 | /calculators/emi-vs-unapproved-calculator |
| accountants for software developers | software / tool | 40 | 0 | 46.9 | /for/software-development-companies |
| seis eis advance assurance | other | 39 | 0 | 64.0 | /services/seis-eis-advance-assurance |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /calculators/emi-vs-unapproved-calculator | 3 | 116 | 27.5 |
| /blog/share-schemes-and-emi/emi-annual-return-ers-walkthrough | 1 | 15 | 34.1 |
| /blog/share-schemes-and-emi/emi-option-valuation | 1 | 22 | 9.9 |
| /blog/share-schemes-and-emi/emi-qualifying-company-rules | 1 | 81 | 7.8 |
| /calculators/rd-relief-estimator | 1 | 498 | 83.2 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| unapproved share options tax cost calculator | calculator / how much | 1 | 1 | 2.0 |
| 431 election does both need to sign | other | 1 | 1 | 8.0 |
| eis3 certificate process | how-to / process | 1 | 3 | 2.0 |
| section 431 relating to shares | other | 1 | 2 | 6.0 |
| emi disqualifying events – alterations of share capital | other | 1 | 1 | 5.0 |
| emi vs amv | decision | 1 | 1 | 3.0 |
| section431 14 days or 14 business days | other | 1 | 1 | 2.0 |
| how to determine unrestricted market value of a securities at date of grant | how-to / process | 1 | 1 | 3.0 |


### care (carehometax.co.uk)

GSC 28d: 21 clicks / 2,399 impr / 0.88% CTR / pos 35.5. Named-query coverage: 1,194 impr (50%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 7 | 436 | 36.5% | 0 | 75.5 |
| d how-to / process | 15 | 351 | 29.4% | 0 | 67.7 |
| j other | 36 | 294 | 24.6% | 0 | 40.1 |
| f rate / threshold lookup | 4 | 71 | 5.9% | 0 | 57.9 |
| c calculator / how much | 4 | 31 | 2.6% | 0 | 26.5 |
| b local commercial (town) | 1 | 8 | 0.7% | 0 | 82.0 |
| g decision | 3 | 3 | 0.3% | 0 | 35.0 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| care home accountants | hire-an-accountant com | 216 | 0 | 75.6 | /about |
| care home tax advice | hire-an-accountant com | 104 | 0 | 67.4 | /for/care-homes |
| how to set up a care agency | how-to / process | 73 | 0 | 65.2 | /services/start-a-domiciliary-care-agency |
| "cqc" "domiciliary care" "registration fee" 2024 | other | 63 | 0 | 10.5 | /calculators |
| capital allowances for care homes | rate / threshold looku | 61 | 0 | 56.9 | /services/buying-a-care-home |
| accountant for care homes | hire-an-accountant com | 58 | 0 | 86.3 | /about |
| accountants for care homes | hire-an-accountant com | 55 | 0 | 78.6 | /about |
| setting up a care agency | how-to / process | 48 | 0 | 66.1 | /services/start-a-domiciliary-care-agency |
| how to open a care agency | how-to / process | 31 | 0 | 67.6 | /services/start-a-domiciliary-care-agency |
| how to start a domiciliary care agency | how-to / process | 31 | 0 | 61.9 | /services/start-a-domiciliary-care-agency |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/business-structure-and-acquisition/business-rates-care-homes | 7 | 93 | 7.0 |
| /calculators/care-staffing-cost-margin-calculator | 3 | 190 | 10.1 |
| /blog/payroll-and-workforce-costs/sponsoring-care-workers-true-cost | 2 | 99 | 7.0 |
| /for/childrens-homes | 2 | 43 | 3.6 |
| /research/uk-care-density-quality-index | 2 | 66 | 7.2 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| find domiciliary care accountants uk | hire-an-accountant com | 2 | 1 | 2.0 |
| care worker travel costs sept 2026 | other | 2 | 1 | 1.0 |
| cost to register as a registered manager with cqc | how-to / process | 1 | 1 | 1.0 |
| registered manager cost | other | 1 | 1 | 1.0 |
| can a care home that is cqc regitered in the uk be vat registered? | decision | 1 | 2 | 4.0 |
| vat exemption or no exemption in homecare uk operating company vs servco | decision | 1 | 2 | 10.0 |
| will a care home be vat expemt if there is a nurse who does not directly supervice the care assistants | decision | 1 | 2 | 4.0 |
| hmrc vat taxable supply care homes | decision | 1 | 2 | 5.0 |


### pharmacies (pharmacytax.co.uk)

GSC 28d: 35 clicks / 1,706 impr / 2.05% CTR / pos 11.8. Named-query coverage: 331 impr (19%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 27 | 156 | 47.1% | 2 | 33.0 |
| a hire-an-accountant commercial | 1 | 90 | 27.2% | 0 | 22.8 |
| e form-code / HMRC navigational | 5 | 80 | 24.2% | 1 | 7.9 |
| c calculator / how much | 2 | 5 | 1.5% | 0 | 45.0 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| pharmacy accounting | hire-an-accountant com | 90 | 0 | 22.8 | /blog |
| fp34 | form-code / HMRC navig | 71 | 1 | 7.9 | /services/nhs-payment-reconciliation-fp34 |
| pharmacy tax | other | 40 | 2 | 13.4 | /blog |
| pharmacist tax deductions | other | 28 | 0 | 67.1 | /blog |
| pharmacist tax | other | 21 | 0 | 68.7 | /blog |
| locum pharmacist tax | other | 16 | 0 | 23.0 | /for/locum-pharmacists |
| "nm_2002_1" nomis | other | 6 | 0 | 3.2 | /research/pharmacy-density-and-workload-index |
| nhs reconciliations | other | 6 | 0 | 30.5 | /services/nhs-payment-reconciliation-fp34 |
| pharmatax | other | 5 | 0 | 33.4 | /terms |
| locum pharmacist tax calculator | calculator / how much | 4 | 0 | 47.2 | /calculators/locum-take-home-comparator |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /for/locum-pharmacists | 7 | 301 | 8.8 |
| /blog/nhs-contract-and-income/drug-tariff-changes-explained | 4 | 150 | 11.3 |
| / | 3 | 87 | 50.4 |
| /calculators/pharmacy-fp34-cash-flow-estimator | 3 | 91 | 4.9 |
| /services/pharmacy-vat-retail-schemes | 3 | 137 | 8.0 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| how does the reimbursement work for pharmacies via the drug tariff for different pack sizes of the same drug? | how-to / process | 1 | 2 | 2.0 |
| goodwill cost when buying a pharmacy | other | 1 | 2 | 2.0 |
| category m drug tariff rules | other | 1 | 1 | 8.0 |
| multiples pharmacy ownership in uk | other | 1 | 1 | 5.0 |
| nhsbsa category m clawback reconciliation accountant service uk community pharmacy | hire-an-accountant com | 0 | 2 | 2.0 |
| what is category m in terms of reinbustment | other | 0 | 1 | 4.0 |
| fp34 prescriptions | form-code / HMRC navig | 0 | 1 | 7.0 |
| drug tarrif category c explained | other | 0 | 1 | 6.0 |


### agency (agencyfounderfinance.co.uk)

GSC 28d: 10 clicks / 1,660 impr / 0.60% CTR / pos 43.8. Named-query coverage: 904 impr (54%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| f rate / threshold lookup | 102 | 506 | 56.0% | 0 | 73.5 |
| a hire-an-accountant commercial | 14 | 265 | 29.3% | 0 | 31.6 |
| c calculator / how much | 11 | 75 | 8.3% | 0 | 54.4 |
| j other | 26 | 52 | 5.8% | 0 | 68.2 |
| d how-to / process | 2 | 3 | 0.3% | 0 | 55.0 |
| g decision | 2 | 2 | 0.2% | 0 | 58.5 |
| i software / tool | 1 | 1 | 0.1% | 0 | 28.0 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| annual investment allowance | rate / threshold looku | 106 | 0 | 47.7 | /blog/tax-and-compliance/annual-investment-allowance-2024-25 |
| accountants for pr agencies | hire-an-accountant com | 101 | 0 | 22.4 | /agencies/pr-agencies |
| pr agency for accountants | hire-an-accountant com | 67 | 0 | 38.1 | /agencies/pr-agencies |
| self employed vat threshold | rate / threshold looku | 37 | 0 | 76.1 | /glossary/vat-threshold |
| accounting for pr agencies | hire-an-accountant com | 32 | 0 | 23.3 | /agencies/pr-agencies |
| vat registration threshold | rate / threshold looku | 28 | 0 | 81.0 | /glossary/vat-threshold |
| how much do you have to earn to be vat registered | calculator / how much | 27 | 0 | 56.3 | /glossary/vat-threshold |
| how much do you need to earn to be vat registered | calculator / how much | 27 | 0 | 52.0 | /glossary/vat-threshold |
| pr accounting | hire-an-accountant com | 27 | 0 | 32.2 | /agencies/pr-agencies |
| what is the vat threshold | rate / threshold looku | 26 | 0 | 97.6 | /glossary/vat-threshold |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/international-agencies/hiring-remote-employee-spain-uk-agency-tax-compliance | 3 | 69 | 6.3 |
| /blog/international-agencies/uk-permanent-establishment-for-uae-company-agency-founders | 3 | 11 | 4.3 |
| /agencies/recruitment-agencies | 1 | 31 | 16.5 |
| /blog/growth-and-exit/business-asset-disposal-relief-agency | 1 | 5 | 7.4 |
| /blog/growth-and-exit/selling-agency-tax-implications | 1 | 6 | 22.8 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| how to account retainer fees | how-to / process | 3 | 2 | 4.0 |
| ir35 status determination statements for using agency labour employer | other | 2 | 4 | 4.0 |
| recruitment uk company issues invoice for placement in dubai vat | other | 2 | 2 | 4.0 |
| foreign recruitment company invoicing a dubai company rules are there rules like in switzerland | decision | 2 | 2 | 1.0 |
| dubai uk double taxation treaty personal allowance uk | rate / threshold looku | 1 | 1 | 4.0 |
| how to split out depreciation on office fit out cost | how-to / process | 1 | 1 | 5.0 |
| phoenixing rules does it apply when the individual leaves the uk to start the same work from abrod | how-to / process | 1 | 6 | 6.0 |
| selling a car to dubai from uk | other | 1 | 2 | 1.0 |


### hospitality (hospitalitytax.co.uk)

GSC 28d: 6 clicks / 1,463 impr / 0.41% CTR / pos 24.1. Named-query coverage: 491 impr (34%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 52 | 323 | 65.8% | 0 | 45.4 |
| a hire-an-accountant commercial | 10 | 101 | 20.6% | 1 | 38.1 |
| d how-to / process | 3 | 35 | 7.1% | 0 | 35.9 |
| c calculator / how much | 4 | 14 | 2.9% | 0 | 63.2 |
| f rate / threshold lookup | 10 | 13 | 2.6% | 0 | 39.5 |
| g decision | 2 | 5 | 1.0% | 0 | 57.2 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| hospitality tax deductions | other | 63 | 0 | 24.7 | /blog |
| coffee shop accountants | hire-an-accountant com | 60 | 1 | 28.7 | /for/cafes-and-coffee-shops |
| toms vat | other | 37 | 0 | 65.7 | /services/toms-advice |
| how to set up a tronc scheme | how-to / process | 33 | 0 | 33.9 | /services/tronc-scheme-setup |
| tronc scheme | other | 28 | 0 | 59.0 | /services/tronc-scheme-setup |
| ashfield taxation services | other | 25 | 0 | 41.8 | /contact |
| accounting for bars | hire-an-accountant com | 17 | 0 | 48.1 | /blog |
| hospitality tax | other | 17 | 0 | 9.6 | /services/hospitality-vat |
| tax laws for cafe & coffee shop small businesses | other | 12 | 0 | 18.9 | /for/cafes-and-coffee-shops |
| tax laws for catering small businesses | other | 12 | 0 | 61.7 | /for/caterers-and-street-food |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /for/cafes-and-coffee-shops | 2 | 240 | 15.7 |
| /for/caterers-and-street-food | 2 | 59 | 17.7 |
| /services/hospitality-vat | 1 | 67 | 12.1 |
| /services/toms-advice | 1 | 189 | 46.5 |
| / | 0 | 46 | 51.5 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| tax on hot food and what are the rules | other | 2 | 2 | 1.0 |
| whats the mtd catagories for sole trader cafe | other | 1 | 1 | 1.0 |
| how do i chack an awrs number | how-to / process | 1 | 2 | 3.0 |
| vat on a cold sausage roll | other | 1 | 1 | 7.0 |
| are soft drinks zero vat | other | 1 | 1 | 2.0 |
| vat on hot food eaten on the premesis | other | 1 | 1 | 2.0 |
| vat cold food policy | other | 1 | 1 | 5.0 |
| machine games duty checklist | other | 1 | 2 | 6.5 |


### contractors-ir35 (contractortaxaccountants.co.uk)

GSC 28d: 3 clicks / 1,318 impr / 0.23% CTR / pos 37.8. Named-query coverage: 886 impr (67%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| a hire-an-accountant commercial | 40 | 357 | 40.3% | 0 | 42.5 |
| j other | 43 | 234 | 26.4% | 0 | 46.7 |
| c calculator / how much | 64 | 177 | 20.0% | 0 | 45.5 |
| b local commercial (town) | 15 | 66 | 7.4% | 0 | 52.5 |
| g decision | 3 | 37 | 4.2% | 0 | 82.7 |
| f rate / threshold lookup | 2 | 8 | 0.9% | 0 | 70.6 |
| d how-to / process | 1 | 7 | 0.8% | 0 | 64.3 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| contractor accounting cost uk | hire-an-accountant com | 80 | 0 | 62.6 | /blog/contractor-accounting-basics/contractor-accountant-fees-cost |
| contractor accounting cost | hire-an-accountant com | 79 | 0 | 50.1 | /blog/contractor-accounting-basics/contractor-accountant-fees-cost |
| ir35 assessment | other | 47 | 0 | 93.7 | /ir35-status |
| compare umbrella vs limited | decision | 30 | 0 | 81.6 | /blog/umbrella-vs-limited-company |
| ir35 contract review | other | 26 | 0 | 32.3 | /ir35-status |
| it contractor accounting | hire-an-accountant com | 26 | 0 | 70.4 | /for/it-contractors |
| contractor accountants london | local commercial (town | 23 | 0 | 62.1 | /locations/london |
| ir35 review | other | 20 | 0 | 33.3 | /ir35-status |
| contractor tax calculator | calculator / how much | 19 | 0 | 40.5 | /calculators |
| engineering contractor accountants | hire-an-accountant com | 18 | 0 | 18.4 | /for/engineering-contractors |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /for/legal-contractors | 1 | 16 | 23.6 |
| /locations/edinburgh | 1 | 9 | 53.4 |
| /locations/leeds | 1 | 9 | 55.3 |
| / | 0 | 15 | 26.9 |
| /about | 0 | 16 | 48.9 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| "deemed employment"  "chapter 8" | other | 2 | 5 | 5.0 |
| chapter 10 off payrollrules | other | 2 | 4 | 6.0 |
| umbrella company vs psc | decision | 1 | 2 | 5.0 |
| umbrella pay advantages and disadvantages | decision | 1 | 1 | 2.0 |
| set up a limited company in uk contracting accounting | how-to / process | 1 | 1 | 2.0 |
| paying expenses to a contractor | other | 1 | 1 | 8.0 |
| short substitution clause ir35 to add to purchase order agreement | other | 1 | 1 | 3.0 |
| my first outside ir35 contract what do i need to set up | decision | 1 | 1 | 1.0 |


### crypto (cryptotaxpartners.co.uk)

GSC 28d: 1 clicks / 415 impr / 0.24% CTR / pos 28.7. Named-query coverage: 196 impr (47%).

| bucket | queries | impr | share | clicks | avg pos |
|---|---|---|---|---|---|
| j other | 27 | 147 | 75.0% | 0 | 29.3 |
| c calculator / how much | 10 | 36 | 18.4% | 0 | 66.1 |
| g decision | 1 | 8 | 4.1% | 0 | 25.4 |
| a hire-an-accountant commercial | 1 | 4 | 2.0% | 0 | 94.5 |
| i software / tool | 1 | 1 | 0.5% | 0 | 3.0 |

Top 10 queries by impressions:

| query | bucket | impr | clicks | pos | landing page |
|---|---|---|---|---|---|
| day trading uk tax | other | 56 | 0 | 24.1 | /for/day-traders |
| day trader tax uk | other | 35 | 0 | 16.3 | /for/day-traders |
| uk crypto tax calculator | calculator / how much | 11 | 0 | 67.3 | /calculators |
| day trading tax uk | other | 10 | 0 | 22.7 | /for/day-traders |
| crypto tax calculator uk | calculator / how much | 8 | 0 | 62.0 | /calculators |
| do you pay tax on day trading uk | decision | 8 | 0 | 25.4 | /for/day-traders |
| day trading taxes | other | 5 | 0 | 23.4 | /for/day-traders |
| uk defi | other | 5 | 0 | 67.2 | /for/defi-and-staking |
| capital gains tax cryptocurrency uk calculator | calculator / how much | 4 | 0 | 79.5 | /calculators |
| crypto tax uk calculator | calculator / how much | 4 | 0 | 66.2 | /calculators |

Top landing pages by clicks:

| page | clicks | impr | pos |
|---|---|---|---|
| /blog/hmrc-disclosure-and-compliance/hmrc-crypto-nudge-letter-what-to-do | 1 | 3 | 7.7 |
| / | 0 | 13 | 23.9 |
| /about | 0 | 4 | 81.8 |
| /blog/crypto-cgt-and-disposals/crypto-isa-etn-uk-tax | 0 | 6 | 7.8 |
| /blog/crypto-cgt-and-disposals/crypto-same-day-30-day-rules-worked-example | 0 | 12 | 6.6 |

Top Bing queries by clicks (top-N slice):

| query | bucket | clicks | impr | pos |
|---|---|---|---|---|
| s104 bed and breakfasting basic example | other | 1 | 3 | 4.0 |
| what uk isas have crypto etns | other | 1 | 1 | 3.0 |
| can i trade crypto in an isa and if so with whom | decision | 1 | 1 | 5.0 |
| s104 pool 30 day bed and breakfasting creating liss | other | 1 | 1 | 4.0 |
| carf when are reports due to hmrc | other | 1 | 1 | 1.0 |
| crypto61000 | other | 0 | 1 | 9.0 |
| is crypto backed loans subject to cgt uk | other | 0 | 1 | 1.0 |
| crypto tax cgt basic rate band amount | rate / threshold looku | 0 | 1 | 2.0 |


## 4. Product-intent gaps

Queries where the searcher wants an artefact (tool, template, form, download, checklist, spreadsheet) rather than an article. Ranked by impressions.

| # | query | site | impr | clicks | pos | landing page |
|---|---|---|---|---|---|---|
| 1 | commercial mortgage calculator | property | 418 | 0 | 54.1 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 2 | sa105 form 2026 | property | 263 | 2 | 3.2 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| 3 | business mortgage calculator | property | 135 | 0 | 53.4 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 4 | commercial mortgage calculator uk | property | 122 | 0 | 53.8 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 5 | sa105 form | property | 110 | 1 | 9.9 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| 6 | commercial property mortgage calculator | property | 100 | 0 | 45.2 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 7 | business mortgage calculator uk | property | 91 | 0 | 57.9 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 8 | how much is my business worth | generalist | 89 | 0 | 82.9 | https://www.hollowaydavies.co.uk/calculators/business-valuation-calculator |
| 9 | r&d tax credit calculator | startups-tech | 84 | 0 | 89.6 | https://www.foundertaxpartners.co.uk/calculators/rd-relief-estimator |
| 10 | business valuation calculator | generalist | 79 | 0 | 69.9 | https://www.hollowaydavies.co.uk/calculators/business-valuation-calculator |
| 11 | how much is tax when buying a holiday let | property | 73 | 0 | 29.9 | https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/how-much-tax-holiday-let-property-uk |
| 12 | how much does a trainee solicitor earn | solicitors | 71 | 0 | 8.2 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |
| 13 | commercial mortgage loan calculator | property | 69 | 0 | 65.5 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 14 | how much do trainee solicitors earn | solicitors | 69 | 0 | 7.2 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |
| 15 | buying a dental practice checklist uk | dentists | 68 | 0 | 7.3 | https://www.dentalfinancepartners.co.uk/blog/buying-a-practice/practice-acquisition-financial-due-diligence |
| 16 | how much is my company worth | generalist | 64 | 0 | 79.7 | https://www.hollowaydavies.co.uk/calculators/business-valuation-calculator |
| 17 | how much is stamp duty on buy to let property | property | 64 | 0 | 63.8 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge |
| 18 | how much is stamp duty for buy to let | property | 63 | 0 | 62.8 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge |
| 19 | nrl1 form hmrc | property | 63 | 0 | 10.1 | https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide |
| 20 | commercial loan calculator | property | 61 | 0 | 70.1 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 21 | commercial property loan calculator | property | 58 | 0 | 47.2 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 22 | how much does a bridging loan cost | property | 58 | 0 | 83.9 | https://www.propertytaxpartners.co.uk/blog/property-finance/bridging-loan-rates |
| 23 | r&d tax relief calculator | startups-tech | 58 | 0 | 90.0 | https://www.foundertaxpartners.co.uk/calculators/rd-relief-estimator |
| 24 | how much is buy to let stamp duty | property | 57 | 0 | 71.0 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge |
| 25 | how much is my dental practice worth wales | dentists | 54 | 0 | 60.1 | https://www.dentalfinancepartners.co.uk/blog/buying-a-practice/dental-practice-valuation-methods-uk |
| 26 | commercial mortgages calculator | property | 54 | 0 | 70.0 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 27 | value my business calculator | generalist | 50 | 0 | 79.4 | https://www.hollowaydavies.co.uk/calculators/business-valuation-calculator |
| 28 | how much do solicitors charge per hour | solicitors | 50 | 0 | 8.9 | https://www.accountsforlawyers.co.uk/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour |
| 29 | deferred rent calculation with lease extension | property | 49 | 0 | 17.8 | https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/lease-extensions-in-the-uk-surrender-and-regrant |
| 30 | how much can you sell a dental practice for wales | dentists | 48 | 0 | 14.6 | https://www.dentalfinancepartners.co.uk/blog/buying-a-practice/dental-practice-goodwill-buying-selling |
| 31 | capital gains tax calculator wales | property | 48 | 0 | 26.8 | https://www.propertytaxpartners.co.uk/calculators |
| 32 | how much is stamp duty on buy to let | property | 48 | 0 | 64.9 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge |
| 33 | calculate commercial mortgage | property | 47 | 0 | 71.4 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 34 | how much does paralegal charge uk search volume | solicitors | 47 | 0 | 5.5 | https://www.accountsforlawyers.co.uk/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour |
| 35 | commercial real estate calculator | property | 46 | 0 | 50.3 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 36 | hsbc commercial mortgage calculator | property | 46 | 0 | 46.7 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 37 | emi share options tax calculator | startups-tech | 46 | 0 | 31.8 | https://www.foundertaxpartners.co.uk/calculators/emi-vs-unapproved-calculator |
| 38 | commercial loan calculator uk | property | 43 | 0 | 74.0 | https://www.propertytaxpartners.co.uk/calculators/commercial-mortgage-calculator |
| 39 | how much stamp duty on buy to let | property | 43 | 0 | 66.4 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge |
| 40 | hmrc sa105 form 2026 | property | 42 | 3 | 5.5 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |


### 4b. Already top-10 but answered with prose (highest-leverage)

| query | site | impr | pos | clicks | landing page |
|---|---|---|---|---|---|
| sa105 form 2026 | property | 263 | 3.2 | 2 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| sa105 form | property | 110 | 9.9 | 1 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| how much does a trainee solicitor earn | solicitors | 71 | 8.2 | 0 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |
| how much do trainee solicitors earn | solicitors | 69 | 7.2 | 0 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |
| buying a dental practice checklist uk | dentists | 68 | 7.3 | 0 | https://www.dentalfinancepartners.co.uk/blog/buying-a-practice/practice-acquisition-financial-due-diligence |
| how much do solicitors charge per hour | solicitors | 50 | 8.9 | 0 | https://www.accountsforlawyers.co.uk/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour |
| how much does paralegal charge uk search volume | solicitors | 47 | 5.5 | 0 | https://www.accountsforlawyers.co.uk/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour |
| hmrc sa105 form 2026 | property | 42 | 5.5 | 3 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| landlord bookkeeping spreadsheet | property | 38 | 5.8 | 0 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide |
| landlord accounting spreadsheet | property | 33 | 6.1 | 0 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide |
| sra calculator | solicitors | 33 | 3.8 | 0 | https://www.accountsforlawyers.co.uk/calculators/sra-client-account-reserve |
| dental practice valuation calculator wales | dentists | 32 | 3.6 | 0 | https://www.dentalfinancepartners.co.uk/calculators/practice-valuation |
| how much does it cost to buy into a gp partnership | medical | 28 | 6.2 | 0 | https://www.medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications |
| how much does a solicitor cost per hour uk | solicitors | 28 | 9.4 | 0 | https://www.accountsforlawyers.co.uk/blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour |
| dental practice valuation calculator london | dentists | 26 | 3.0 | 0 | https://www.dentalfinancepartners.co.uk/calculators/practice-valuation |
| how much do lawyers make uk | solicitors | 23 | 1.0 | 0 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |
| how much is capital gains tax on property | property | 22 | 1.0 | 0 | https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk |
| what kinds of systems integrate sales, refunds, and marketplace fees to calculate registration thresholds accurately across entities? | ecommerce | 21 | 9.2 | 0 | https://www.ecommercefinance.co.uk/vat/vat-on-marketplace-fees |
| form sa105 | property | 21 | 9.9 | 0 | https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide |
| how much do law firms charge for a cross-border acquisition? | solicitors | 21 | 8.0 | 0 | https://www.accountsforlawyers.co.uk/blog/firm-acquisition-merger/how-much-does-it-cost-to-buy-a-uk-law-firm |
| how much do trainee solicitors earn uk | solicitors | 21 | 4.7 | 0 | https://www.accountsforlawyers.co.uk/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 |


### 4c. Literal artefact words, all sites

| word | queries | impr | clicks |
|---|---|---|---|
| calculator | 672 | 5,578 | 0 |
| form | 79 | 758 | 6 |
| spreadsheet | 16 | 239 | 0 |
| checklist | 16 | 232 | 0 |
| template | 39 | 135 | 8 |
| example | 25 | 89 | 0 |
| letter | 10 | 88 | 0 |
| excel | 15 | 34 | 5 |
| download | 6 | 31 | 2 |
| pdf | 4 | 19 | 0 |
| forms | 5 | 6 | 0 |
| worksheet | 4 | 5 | 0 |
| sample | 1 | 1 | 0 |
| generator | 1 | 1 | 0 |
| tracker | 1 | 1 | 0 |


## 5. What actually gets clicked (Bing, click-level truth)

GSC will not name the queries behind 96 percent of Google clicks. Bing will. Its top-20 clicked queries across the estate:

| query | site | bucket | clicks | impr | pos |
|---|---|---|---|---|---|
| nrl1 | property | form-code / HMRC navig | 18 | 704 | 5.2 |
| nrl1 form | property | form-code / HMRC navig | 14 | 1,204 | 4.6 |
| colp | solicitors | other | 10 | 606 | 4.4 |
| sra accounts rules | solicitors | other | 9 | 1,750 | 4.1 |
| capital allowances on vans | generalist | rate / threshold looku | 9 | 97 | 3.9 |
| section 24 | property | other | 8 | 336 | 4.1 |
| property tax partners | property | hire-an-accountant com | 8 | 36 | 5.0 |
| benefit in kind | generalist | other | 7 | 978 | 5.5 |
| ppr | property | other | 6 | 296 | 5.4 |
| sa105 | property | form-code / HMRC navig | 6 | 916 | 4.8 |
| solicitors accounts rules | solicitors | other | 5 | 414 | 5.2 |
| p11d benefits | generalist | form-code / HMRC navig | 5 | 216 | 3.2 |
| how to claim back tax overpaid uk | generalist | how-to / process | 5 | 37 | 5.7 |
| how do i get a tax refund for overpaid paye last year | generalist | how-to / process | 5 | 64 | 4.7 |
| integral features capital allowances | property | rate / threshold looku | 5 | 29 | 2.7 |
| p11d | generalist | form-code / HMRC navig | 4 | 4,851 | 7.6 |
| can i claim back overpaid tax | generalist | decision | 4 | 23 | 5.7 |
| sa 105 form 2026 | property | form-code / HMRC navig | 4 | 20 | 4.3 |
| mortgage interest relief | property | other | 4 | 21 | 4.0 |
| sa105 2026 | property | form-code / HMRC navig | 4 | 107 | 4.4 |


## 6. Findings

1. **Two sites are the estate.** property and solicitors take 75 percent of Google clicks; the other 13 sites together take 25 percent, and six of them are under 20 clicks in 28 days.
2. **Calculator demand is huge and entirely unconverted.** 672 named queries containing "calculator" drew 5,578 impressions and **zero** clicks. The calculator pages exist - `/calculators/commercial-mortgage-calculator`, `/calculators/business-valuation-calculator`, `/calculators/rd-relief-estimator` - and rank at position 45-90. The gap is ranking, not inventory.
3. **Form-code navigational is the only bucket that converts.** It is 2.5 percent of named Google impressions but sits at avg position 10.1, and on Bing (where click-level data is real) nrl1, nrl1 form, sa105 and p11d are the top clicked queries estate-wide.
4. **The artefact pages that DO rank get no clicks.** landlord bookkeeping spreadsheet (pos 5.8), sra calculator (pos 3.8), dental practice valuation calculator (pos 3.0-3.6) - all top-10, all zero clicks. The searcher wants a tool and the result is a blog post.
5. **Hire-intent is 21 percent of named impressions at avg position 41.8.** The commercial queries the estate was built for are visible but nowhere near clickable.
6. **Local is thin.** 7.3 percent of impressions, avg position 40.1, and "charity accountants near me" alone (923 impressions, position 60) is 16 percent of the bucket.
