# Core-page analysis pack — medical / homepage

- **Page:** https://www.medicalaccounts.co.uk/
- **Source (hand-edit this):** `Medical/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **94** (3785 impressions, 90d).
- Queries the core page already owns: **84**.
- National head queries: **16**; national impressions NOT on the core page: **3**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 84 | 3691 |
| https://www.medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 4 | 22 |
| https://www.medicalaccounts.co.uk/blog/gp-accountant-services-complete-guide | blog | 5 | 8 |
| https://www.medicalaccounts.co.uk/blog/locum-tax | blog | 1 | 2 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| gp accountants | 1299 | Y |  | medicalaccounts.co.uk/ | homepage | 52.7 | 52.7 | homepage_already_owns |
| medical accountants | 355 | Y |  | medicalaccounts.co.uk/ | homepage | 55.9 | 55.9 | homepage_already_owns |
| gp practice accountants | 277 |  |  | medicalaccounts.co.uk/ | homepage | 72.3 | 72.3 | homepage_already_owns |
| specialist medical accountants | 274 | Y |  | medicalaccounts.co.uk/ | homepage | 64.8 | 64.8 | homepage_already_owns |
| medical accountants uk | 219 | Y |  | medicalaccounts.co.uk/ | homepage | 58.2 | 58.2 | homepage_already_owns |
| medical accounting | 127 |  |  | medicalaccounts.co.uk/ | homepage | 80.5 | 80.5 | homepage_already_owns |
| accounting specialists for medical professionals | 120 |  |  | medicalaccounts.co.uk/ | homepage | 51.3 | 51.3 | homepage_already_owns |
| accountants for locum doctors | 106 |  |  | medicalaccounts.co.uk/ | homepage | 60.5 | 60.5 | homepage_already_owns |
| gp accountant | 88 | Y |  | medicalaccounts.co.uk/ | homepage | 52.6 | 52.6 | homepage_already_owns |
| accountants for doctors | 81 | Y |  | medicalaccounts.co.uk/ | homepage | 66.2 | 66.2 | homepage_already_owns |
| accountants for gp practices | 78 |  |  | medicalaccounts.co.uk/ | homepage | 65.7 | 65.7 | homepage_already_owns |
| medical accountant | 68 | Y |  | medicalaccounts.co.uk/ | homepage | 70.1 | 70.1 | homepage_already_owns |
| medical accountants birmingham | 53 |  | Y | medicalaccounts.co.uk/ | homepage | 39.9 | 39.9 | homepage_already_owns |
| accounting for doctors | 46 |  |  | medicalaccounts.co.uk/ | homepage | 78.1 | 78.1 | homepage_already_owns |
| accounting for gp partners | 38 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 42.1 | 91.7 | caught_by_blog_consolidate |
| accountants for nhs doctors | 36 |  |  | medicalaccounts.co.uk/ | homepage | 59.2 | 59.2 | homepage_already_owns |
| accountant for medical professionals | 35 | Y |  | medicalaccounts.co.uk/ | homepage | 62.9 | 62.9 | homepage_already_owns |
| accountant for doctors | 31 |  |  | medicalaccounts.co.uk/ | homepage | 53.8 | 53.8 | homepage_already_owns |
| doctor accountants | 31 |  |  | medicalaccounts.co.uk/ | homepage | 63.7 | 63.7 | homepage_already_owns |
| accountants for physicians | 29 |  |  | medicalaccounts.co.uk/ | homepage | 70.2 | 70.2 | homepage_already_owns |
| accountant for physicians | 25 |  |  | medicalaccounts.co.uk/ | homepage | 54.8 | 54.8 | homepage_already_owns |
| medical accountants london | 24 |  | Y | medicalaccounts.co.uk/ | homepage | 48.3 | 48.3 | homepage_already_owns |
| medical accountant birmingham | 21 |  | Y | medicalaccounts.co.uk/ | homepage | 31.9 | 31.9 | homepage_already_owns |
| doctors accountant | 21 |  |  | medicalaccounts.co.uk/ | homepage | 58.1 | 58.1 | homepage_already_owns |
| locum doctor accountant | 20 |  |  | medicalaccounts.co.uk/ | homepage | 72.8 | 72.8 | homepage_already_owns |
| accountants for medical professionals | 17 |  |  | medicalaccounts.co.uk/ | homepage | 47.5 | 47.5 | homepage_already_owns |
| accountant for medical doctors | 15 |  |  | medicalaccounts.co.uk/ | homepage | 54.2 | 54.2 | homepage_already_owns |
| doctor accountant | 14 |  |  | medicalaccounts.co.uk/ | homepage | 60.6 | 60.6 | homepage_already_owns |
| personal tax accountants for medical | 12 |  |  | medicalaccounts.co.uk/ | homepage | 53.6 | 53.6 | homepage_already_owns |
| tax accountants for doctors | 12 | Y |  | medicalaccounts.co.uk/ | homepage | 61.4 | 61.4 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 34 | 435 | 1479 |
| H2 sections | 0 | 1 | - |
| FAQs | 3 | 0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `GP Accountants UK | Tax Specialists for Doctors` — contains head token: **gp accountants**
- H1: `Specialist Accountants for GPs & Medical Professionals` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['FAQPage', 'Organization', 'WebSite']
- Competitor frequency: {'Organization': 5, 'WebPage': 5, 'WebSite': 5, 'BreadcrumbList': 4, 'ImageObject': 3, 'Article': 2, 'FinancialService': 1, 'AccountingService': 1, 'Place': 1, 'LocalBusiness': 1, 'FAQPage': 1, 'Question': 1, 'Person': 1}
- Missing vs competitors (>=2 have it): ['Article', 'BreadcrumbList', 'ImageObject', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'step_list']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.bw-medical.co.uk | homepage | 1 | Specialist Medical Accountants, Accountants for Medical Prof | 435 | 0 | 0 | FinancialService |
| sial-accountants.co.uk | homepage | 5 | Specialist Accountants for Doctors | SIAL Accountants | 7 | 0 | 0 | AccountingService,ImageObject,Organization,Place,WebPage,WebSite |
| www.sandisoneasson.co.uk | homepage | 1 | Specialist Medical Accountants | Sandison Easson & Co. Accou | 253 | 6 | 0 | LocalBusiness |
| www.forvismazars.com | deep | 3 | Specialist Medical Accountants for Healthcare Professionals | 589 | 1 | 8 | Article |
| nicholsmedical.co.uk | homepage | 4 | Nichols & Co - Leading Medical Accountants in the UK | 10 | 0 | 0 | BreadcrumbList,FAQPage,ImageObject,Organization,Question,WebPage,WebSite |
| r-m-t.co.uk | deep | 1 | GP Practice Accountants | RMT Accountants | 1479 | 10 | 0 | Article,BreadcrumbList,Organization,Person,WebPage,WebSite |
| practiceindex.co.uk | deep | 2 | Medical Practice Accountants - Rated and Reviewed   | Practi | 734 | 4 | 0 |  |
| www.tc-group.com | deep | 4 | AISMA Medical Accountants for GPs & Practices | TC Group | 804 | 4 | 5 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.mmba.co.uk | deep | 5 | Medical Accountants for Doctors & Healthcare in UK – MMBA | 10 | 0 | 9 | BreadcrumbList,Organization,WebPage,WebSite |

_Could not fetch: ['medicsmoney.co.uk', 'aisma.org.uk', 'medicalaccountantslondon.co.uk']_