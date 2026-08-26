# Core-page analysis pack — medical / services

- **Page:** https://www.medicalaccounts.co.uk/services
- **Source (hand-edit this):** `Medical/web/src/app/services/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **24** (431 impressions, 90d).
- Queries the core page already owns: **20**.
- National head queries: **6**; national impressions NOT on the core page: **0**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 20 | 372 |
| https://www.medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 4 | 23 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| medical accounting | 127 | Y |  | medicalaccounts.co.uk/ | homepage | 80.5 | 80.5 | homepage_already_owns |
| accounting specialists for medical professionals | 120 |  |  | medicalaccounts.co.uk/ | homepage | 51.3 | 51.3 | homepage_already_owns |
| accounting for doctors | 46 | Y |  | medicalaccounts.co.uk/ | homepage | 78.1 | 78.1 | homepage_already_owns |
| accounting for gp partners | 38 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 42.1 | 91.7 | caught_by_blog_consolidate |
| bookkeeping for doctors | 18 | Y |  | medicalaccounts.co.uk/ | homepage | 71.8 | 71.8 | homepage_already_owns |
| physicians accounting | 11 |  |  | medicalaccounts.co.uk/ | homepage | 71.0 | 71.0 | homepage_already_owns |
| gp accounting | 11 |  |  | medicalaccounts.co.uk/ | homepage | 44.9 | 44.9 | homepage_already_owns |
| bookkeeping services for doctors | 10 |  |  | medicalaccounts.co.uk/ | homepage | 69.9 | 69.9 | homepage_already_owns |
| nhs gp accounting support | 8 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 12.7 | 39.0 | caught_by_blog_consolidate |
| accounting services for locum gps | 6 |  |  | medicalaccounts.co.uk/ | homepage | 59.8 | 59.8 | homepage_already_owns |
| gp practice accounting | 6 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 33.2 | 88.0 | caught_by_blog_consolidate |
| doctors accounting | 4 |  |  | medicalaccounts.co.uk/ | homepage | 86.5 | 86.5 | homepage_already_owns |
| physician accounting services | 4 |  |  | medicalaccounts.co.uk/ | homepage | 88.5 | 88.5 | homepage_already_owns |
| accounting gp | 4 |  |  | medicalaccounts.co.uk/ | homepage | 53.3 | 53.3 | homepage_already_owns |
| accounting services for doctors | 3 | Y |  | medicalaccounts.co.uk/ | homepage | 80.0 | 80.0 | homepage_already_owns |
| accounting for physicians | 3 |  |  | medicalaccounts.co.uk/ | homepage | 66.3 | 66.3 | homepage_already_owns |
| accounting for gp | 3 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 17.0 | - | caught_by_blog_consolidate |
| physician accounting | 2 |  |  | medicalaccounts.co.uk/ | homepage | 26.0 | 26.0 | homepage_already_owns |
| medical accounting services | 2 | Y |  | medicalaccounts.co.uk/ | homepage | 93.0 | 93.0 | homepage_already_owns |
| accounting for doctors uk | 1 | Y |  | medicalaccounts.co.uk/ | homepage | 51.0 | 51.0 | homepage_already_owns |
| best accounting services for medical practices | 1 |  |  | medicalaccounts.co.uk/ | homepage | 1.0 | 1.0 | homepage_already_owns |
| gp surgery accounting services | 1 |  |  | medicalaccounts.co.uk/ | homepage | 26.0 | 26.0 | homepage_already_owns |
| medical practice accounting | 1 |  |  | medicalaccounts.co.uk/ | homepage | 65.0 | 65.0 | homepage_already_owns |
| medical practice accounting officer | 1 |  |  | medicalaccounts.co.uk/ | homepage | 65.0 | 65.0 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 723 | 749.0 | 3495 |
| H2 sections | 11 | 6.5 | - |
| FAQs | 1 | 4.5 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Medical Accounting Services | GP Tax, NHS Pension Planning & Locum Tax Returns | Medical Accountants UK` — contains head token: **medical accounting**
- H1: `Medical accounting services for UK doctors` — contains head token: **medical accounting**

### Schema
- Ours: ['BreadcrumbList', 'Organization', 'Service', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 6, 'Organization': 6, 'WebSite': 6, 'WebPage': 5, 'ImageObject': 3, 'Article': 3, 'BlogPosting': 2, 'Person': 2, 'LocalBusiness': 1, 'Product': 1, 'FAQPage': 1, 'ProfessionalService': 1}
- Missing vs competitors (>=2 have it): ['Article', 'BlogPosting', 'ImageObject', 'Person', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'MISSING'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'download_form', 'pricing_block', 'video_embed']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.invensis.net | deep | 3 | Healthcare Accounting and Bookkeeping Services | Invensis | 3495 | 12 | 11 | BreadcrumbList,LocalBusiness,Organization,Product,WebPage,WebSite |
| www.doctorsmanagement.com | landing | 1 | Medical Accounting Services | DoctorsManagement | 1199 | 5 | 4 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.forvismazars.com | deep | 3 | Specialist Medical Accountants for Healthcare Professionals | 589 | 1 | 8 | Article |
| www.whizconsulting.net | blog | 3 | Accounting For Doctors:12 FAQs Every US Healthcare Professio | 10 | 0 | 14 | BlogPosting,BreadcrumbList,FAQPage,Organization,Person,ProfessionalService,WebSite |
| www.larking-gowen.co.uk | deep | 1 | Medical Accounting | Larking Gowen Chartered Accountants & B | 15 | 0 | 0 |  |
| cangafltd.com | landing | 1 | Accounting for Doctors - Cangaf Accountants : Accountants in | 3017 | 27 | 14 | Article,BlogPosting,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |
| www.accountants4nhsdoctors.co.uk | homepage | 1 | Accountants for NHS Doctors | Specialist Doctor Tax Advice | 935 | 8 | 1 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.bma.org.uk | deep | 2 | Medical accountancy and tax advice | 895 | 10 | 1 | Article |
| www.steady-co.com | deep | 2 | Medical Accounting Services | Steady | 603 | 9 | 5 |  |
| lorennancke.com | deep | 2 | Tax Consulting and Accounting for Doctors - Loren Nancke | 9 | 0 | 0 | BreadcrumbList,Organization,WebPage,WebSite |

_Could not fetch: ['bing.com', 'meruaccounting.com']_