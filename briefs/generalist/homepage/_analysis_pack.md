# Core-page analysis pack — generalist / homepage

- **Page:** https://www.hollowaydavies.co.uk/
- **Source (hand-edit this):** `generalist/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **440** (2503 impressions, 90d).
- Queries the core page already owns: **1**.
- National head queries: **38**; national impressions NOT on the core page: **176**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 14 | 344 |
| https://www.hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 9 | 197 |
| https://www.hollowaydavies.co.uk/locations/putney | location | 40 | 183 |
| https://www.hollowaydavies.co.uk/locations/cannock | location | 13 | 153 |
| https://www.hollowaydavies.co.uk/locations/croydon | location | 5 | 86 |
| https://www.hollowaydavies.co.uk/locations/st-albans | location | 9 | 74 |
| https://www.hollowaydavies.co.uk/locations/bangor-wales | location | 7 | 70 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 1 | 68 |
| https://www.hollowaydavies.co.uk/locations/exeter | location | 13 | 66 |
| https://www.hollowaydavies.co.uk/locations/norwich | location | 19 | 66 |
| https://www.hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 3 | 57 |
| https://www.hollowaydavies.co.uk/locations/sutton | location | 12 | 52 |
| https://www.hollowaydavies.co.uk/locations/bromley | location | 9 | 52 |
| https://www.hollowaydavies.co.uk/locations/derby | location | 14 | 44 |
| https://www.hollowaydavies.co.uk/locations/salford | location | 6 | 42 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cis accountant | 227 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 74.7 | - | caught_by_blog_consolidate |
| dentist accountants near me | 78 |  | Y | hollowaydavies.co.uk/locations/grimsby | location | 75.0 | - | geo_keep_local |
| plumbers accountant | 68 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 47.8 | - | caught_by_blog_consolidate |
| veterinary accountants | 54 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 29.9 | - | caught_by_blog_consolidate |
| chartered accountants bangor | 53 |  |  | hollowaydavies.co.uk/locations/bangor-wales | location | 37.6 | - | national_caught_by_location_reassign |
| accountants for vets | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 34.2 | - | caught_by_blog_consolidate |
| vet accountant | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 26.8 | - | caught_by_blog_consolidate |
| audits accountants st albans | 38 |  | Y | hollowaydavies.co.uk/locations/st-albans | location | 66.4 | - | geo_keep_local |
| cis contractors accountant | 36 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 63.6 | - | caught_by_blog_consolidate |
| healthcare accountant sutton | 34 |  |  | hollowaydavies.co.uk/locations/sutton | location | 43.4 | - | national_caught_by_location_reassign |
| rural accountants exeter | 29 |  |  | hollowaydavies.co.uk/locations/exeter | location | 40.6 | - | national_caught_by_location_reassign |
| cis tax return accountants | 28 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 70.2 | - | caught_by_blog_consolidate |
| transport accountants croydon | 24 |  |  | hollowaydavies.co.uk/locations/croydon | location | 79.2 | - | national_caught_by_location_reassign |
| medical accountants croydon | 23 |  |  | hollowaydavies.co.uk/locations/croydon | location | 82.6 | - | national_caught_by_location_reassign |
| retail accountants croydon | 21 |  |  | hollowaydavies.co.uk/locations/croydon | location | 82.1 | - | national_caught_by_location_reassign |
| corporate accountants cardiff | 21 |  |  | hollowaydavies.co.uk/locations/cardiff | location | 75.9 | - | national_caught_by_location_reassign |
| company formation accountant | 21 |  |  | hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 15.2 | - | caught_by_blog_consolidate |
| company formation accountants | 20 |  |  | hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 20.6 | - | caught_by_blog_consolidate |
| chartered accountant service charges | 20 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown | blog | 20.4 | - | caught_by_blog_consolidate |
| self assessment accountant cannock | 19 |  |  | hollowaydavies.co.uk/locations/cannock | location | 57.0 | - | national_caught_by_location_reassign |
| accountant for builders cannock | 18 |  |  | hollowaydavies.co.uk/locations/cannock | location | 44.9 | - | national_caught_by_location_reassign |
| cis accountant peterborough | 18 |  |  | hollowaydavies.co.uk/locations/peterborough | location | 56.0 | - | national_caught_by_location_reassign |
| payroll accountant near bromley | 18 |  |  | hollowaydavies.co.uk/locations/bromley | location | 71.5 | - | national_caught_by_location_reassign |
| accountants for the photographic industry | 18 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-photographers-uk | blog | 12.9 | - | caught_by_blog_consolidate |
| construction accountant cannock | 18 |  |  | hollowaydavies.co.uk/locations/cannock | location | 41.2 | - | national_caught_by_location_reassign |
| small business accountant cannock | 18 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 46.1 | - | national_caught_by_location_reassign |
| construction industry scheme accountant | 18 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 69.6 | - | caught_by_blog_consolidate |
| new business accountant croydon | 17 |  |  | hollowaydavies.co.uk/locations/croydon | location | 88.7 | - | national_caught_by_location_reassign |
| accountants for schools and academies | 17 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accountant-for-schools-uk | blog | 77.1 | - | caught_by_blog_consolidate |
| self employed accountant cannock | 17 |  |  | hollowaydavies.co.uk/locations/cannock | location | 71.1 | - | national_caught_by_location_reassign |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 482 | 1202.5 | 2675 |
| H2 sections | 4 | 6.5 | - |
| FAQs | 4 | 3.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Holloway Davies | ICAEW chartered accountants for UK business` — contains head token: **NO**
- H1: `UK business accounting, done with conviction.` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['FAQPage', 'ProfessionalService', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 3, 'Article': 1, 'ImageObject': 1, 'Organization': 1, 'Person': 1, 'WebPage': 1, 'WebSite': 1, 'Product': 1, 'FAQPage': 1, 'LocalBusiness': 1, 'Service': 1}
- Missing vs competitors (>=2 have it): ['BreadcrumbList']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'MISSING', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['decision_matrix']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.itcontracting.com | landing | 1 | Contractor Accountants – compare fees and costs [2026] - IT  | 11 | 0 | 4 | Article,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |
| www.crunch.co.uk | deep | 2 | Online Accountants For Limited Companies | Unlimited Support | 2275 | 10 | 2 | Product |
| www.bark.com | deep | 6 | Accountants Near Me  | Tax Return Accountants  | Personal or | 2675 | 15 | 8 | BreadcrumbList,FAQPage,LocalBusiness,Service |
| www.gov.uk | landing | 6 | Set up as a sole trader: step by step - GOV.UK | 130 | 3 | 1 | BreadcrumbList |

_Could not fetch: ['theaccountancy.co.uk', 'gorillaaccounting.com', 'limitedcompanyhelp.com', 'taxassist.co.uk', 'a-wise.co.uk', 'research.com', 'e-accounts.co.uk', 'yorkshireaccountancy.co.uk']_