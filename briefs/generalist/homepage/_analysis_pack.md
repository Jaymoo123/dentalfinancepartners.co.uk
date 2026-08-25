# Core-page analysis pack — generalist / homepage

- **Page:** https://www.hollowaydavies.co.uk/
- **Source (hand-edit this):** `generalist/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **450** (5840 impressions, 90d).
- Queries the core page already owns: **1**.
- National head queries: **43**; national impressions NOT on the core page: **522**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.hollowaydavies.co.uk/locations/cannock | location | 13 | 478 |
| https://www.hollowaydavies.co.uk/locations/bury-st-edmunds | location | 20 | 462 |
| https://www.hollowaydavies.co.uk/locations/putney | location | 39 | 333 |
| https://www.hollowaydavies.co.uk/locations/exeter | location | 23 | 306 |
| https://www.hollowaydavies.co.uk/locations/bromsgrove | location | 6 | 260 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 3 | 257 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 14 | 247 |
| https://www.hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 10 | 203 |
| https://www.hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 9 | 197 |
| https://www.hollowaydavies.co.uk/locations/croydon | location | 6 | 194 |
| https://www.hollowaydavies.co.uk/locations/st-albans | location | 9 | 159 |
| https://www.hollowaydavies.co.uk/locations/sutton | location | 16 | 147 |
| https://www.hollowaydavies.co.uk/locations/salford | location | 6 | 126 |
| https://www.hollowaydavies.co.uk/locations/cardiff | location | 7 | 104 |
| https://www.hollowaydavies.co.uk/contact | core_other | 7 | 97 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| plumbers accountant | 250 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 32.8 | - | caught_by_blog_consolidate |
| bromsgrove accountants | 124 |  |  | hollowaydavies.co.uk/locations/bromsgrove | location | 36.8 | - | national_caught_by_location_reassign |
| accountant bromsgrove | 116 |  |  | hollowaydavies.co.uk/locations/bromsgrove | location | 32.9 | - | national_caught_by_location_reassign |
| accountants bury st edmunds | 103 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 38.3 | - | national_caught_by_location_reassign |
| accountant bury st edmunds | 94 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 35.9 | - | national_caught_by_location_reassign |
| healthcare accountant sutton | 86 |  |  | hollowaydavies.co.uk/locations/sutton | location | 46.4 | - | national_caught_by_location_reassign |
| audits accountants st albans | 83 |  | Y | hollowaydavies.co.uk/locations/st-albans | location | 63.4 | - | geo_keep_local |
| dentist accountants near me | 82 |  | Y | hollowaydavies.co.uk/locations/grimsby | location | 76.7 | - | geo_keep_local |
| accountants for forex traders uk | 81 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 11.0 | - | caught_by_blog_consolidate |
| construction accountant cannock | 79 |  |  | hollowaydavies.co.uk/locations/cannock | location | 41.7 | - | national_caught_by_location_reassign |
| accountant fees 2025 | 79 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-fee-2025-26-uk-business-guide | blog | 15.0 | - | caught_by_blog_consolidate |
| accountant for builders cannock | 73 |  |  | hollowaydavies.co.uk/locations/cannock | location | 45.5 | - | national_caught_by_location_reassign |
| sole trader accountant cannock | 70 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 66.3 | - | national_caught_by_location_reassign |
| transport accountants croydon | 70 |  |  | hollowaydavies.co.uk/locations/croydon | location | 79.0 | - | national_caught_by_location_reassign |
| accountancy exeter | 68 |  |  | hollowaydavies.co.uk/locations/exeter | location | 73.0 | - | national_caught_by_location_reassign |
| accountants in bury st edmunds | 63 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 35.9 | - | national_caught_by_location_reassign |
| chartered accountant service charges | 63 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown | blog | 21.4 | - | caught_by_blog_consolidate |
| doctors and dentists accountant | 63 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountants-for-dentists | blog | 70.9 | - | caught_by_blog_consolidate |
| accountants for forex traders | 61 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 11.4 | - | caught_by_blog_consolidate |
| corporate accountants cardiff | 60 |  |  | hollowaydavies.co.uk/locations/cardiff | location | 75.1 | - | national_caught_by_location_reassign |
| vat compliance accountant edinburgh | 56 |  | Y | hollowaydavies.co.uk/locations/edinburgh | location | 57.6 | - | geo_keep_local |
| accountant for cis contractors | 55 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 72.8 | - | caught_by_blog_consolidate |
| accountants for the photographic industry | 55 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-photographers-uk | blog | 13.8 | - | caught_by_blog_consolidate |
| veterinary accountants | 54 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 29.9 | - | caught_by_blog_consolidate |
| accountants for vets | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 34.2 | - | caught_by_blog_consolidate |
| vet accountant | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 26.8 | - | caught_by_blog_consolidate |
| small business accountant cannock | 52 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 44.1 | - | national_caught_by_location_reassign |
| rural accountants exeter | 52 |  |  | hollowaydavies.co.uk/locations/exeter | location | 30.6 | - | national_caught_by_location_reassign |
| self employed accountant cannock | 52 |  |  | hollowaydavies.co.uk/locations/cannock | location | 65.2 | - | national_caught_by_location_reassign |
| healthcare accountants barnet | 51 |  |  | hollowaydavies.co.uk/locations/barnet | location | 55.2 | - | national_caught_by_location_reassign |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1345 | 68.0 | 3299 |
| H2 sections | 8 | 0.0 | - |
| FAQs | 11 | 3.5 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Small Business Accountants UK | Holloway Davies` — contains head token: **small business accountant**
- H1: `Small business accountants for UK limited companies, sole traders and contractors.` — contains head token: **small business accountant**

### Schema
- Ours: ['AccountingService', 'BreadcrumbList', 'FAQPage', 'ProfessionalService', 'Service', 'WebPage', 'WebSite']
- Competitor frequency: {'Organization': 4, 'WebPage': 4, 'WebSite': 3, 'BreadcrumbList': 2, 'FAQPage': 2, 'Article': 2, 'ImageObject': 1, 'LocalBusiness': 1, 'DefinedTermSet': 1, 'HowTo': 1, 'ProfessionalService': 1, 'Service': 1, 'ItemList': 1}
- Missing vs competitors (>=2 have it): ['Article', 'Organization']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'present', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'MISSING', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['inline_callout_aside']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| a-wise.co.uk | homepage | 1 | Online Accountants | From £10pm | Small Businesses & Persona | 0 | 0 | 0 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.qaccounting.com | deep | 4 | Accountant for Limited Company, Ltd Accountants - QAccountin | 3299 | 17 | 6 | BreadcrumbList,LocalBusiness,Organization,WebPage,WebSite |
| www.goforma.com | deep | 6 | Accountant for Sole Traders from £22/mo | GoForma | 70 | 0 | 23 | DefinedTermSet,FAQPage,HowTo,Organization,ProfessionalService,Service,WebPage |
| www.xero.com | homepage | 1 | Software & Solutions for Small Businesses | Xero UK | 618 | 15 | 1 |  |
| en.wikipedia.org | deep | 1 | E-accounting - Wikipedia | 0 | 0 | 0 | Article |
| www.contractoruk.com | deep | 1 | Accountancy Services Providers For IT Contractors | 66 | 0 | 13 | Article,FAQPage,ItemList,Organization,WebPage,WebSite |

_Could not fetch: ['bing.com', 'theaccountancy.co.uk', 'linkedin.com', 'accountsandlegal.co.uk', 'sleek.com', 'limitedcompanyhelp.com']_