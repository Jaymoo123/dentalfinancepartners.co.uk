# Core-page analysis pack — medical / for_locum_doctors

- **Page:** https://www.medicalaccounts.co.uk/for-locum-doctors
- **Source (hand-edit this):** `Medical/web/src/app/for-locum-doctors/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **10** (151 impressions, 90d).
- Queries the core page already owns: **7**.
- National head queries: **6**; national impressions NOT on the core page: **4**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 7 | 138 |
| https://www.medicalaccounts.co.uk/blog/locum-tax | blog | 2 | 4 |
| https://www.medicalaccounts.co.uk/resources/locum | core_other | 1 | 2 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accountants for locum doctors | 106 | Y |  | medicalaccounts.co.uk/ | homepage | 60.5 | 60.5 | homepage_already_owns |
| locum doctor accountant | 20 | Y |  | medicalaccounts.co.uk/ | homepage | 72.8 | 72.8 | homepage_already_owns |
| accounting services for locum gps | 6 |  |  | medicalaccounts.co.uk/ | homepage | 59.8 | 59.8 | homepage_already_owns |
| accountant for locum doctor | 4 |  |  | medicalaccounts.co.uk/ | homepage | 70.0 | 70.0 | homepage_already_owns |
| locum doctor accountant hertfordshire | 4 | Y |  | medicalaccounts.co.uk/ | homepage | 84.8 | 84.8 | homepage_already_owns |
| accounts for and locum gps | 3 |  |  | medicalaccounts.co.uk/resources/locum | core_other | 42.0 | 61.0 | caught_by_core_other |
| locum accountants | 3 | Y |  | medicalaccounts.co.uk/ | homepage | 67.5 | 67.5 | homepage_already_owns |
| locum doctor tax deductions | 2 | Y |  | medicalaccounts.co.uk/blog/locum-tax | blog | 21.5 | - | caught_by_blog_consolidate |
| locum accountant | 2 | Y |  | medicalaccounts.co.uk/blog/locum-tax | blog | 32.5 | - | caught_by_blog_consolidate |
| accounts for locum doctors | 1 |  |  | medicalaccounts.co.uk/ | homepage | 72.0 | 72.0 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1287 | 719.0 | 2507 |
| H2 sections | 5 | 5.5 | - |
| FAQs | 12 | 2.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Locum Accountant | IR35, Ltd Company & Tax Returns for Locum Doctors | Medical Accountants UK` — contains head token: **locum accountant**
- H1: `Locum accountant and tax specialists for UK locum doctors` — contains head token: **locum accountant**

### Schema
- Ours: ['BreadcrumbList', 'FAQPage', 'Organization', 'Service', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 6, 'Organization': 4, 'WebPage': 4, 'WebSite': 4, 'ImageObject': 3, 'FAQPage': 2, 'AccountingService': 1, 'Place': 1, 'Service': 1, 'FinancialService': 1, 'LocalBusiness': 1}
- Missing vs competitors (>=2 have it): ['ImageObject', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- []

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.acctek.co.uk | deep | 2 | Limited Company Accountants UK | Fixed-Fee Support | 1285 | 9 | 21 | AccountingService,BreadcrumbList,FAQPage,ImageObject,Organization,Place,Service,WebPage,WebSite |
| warr.co.uk | deep | 2 | Accounting for Locum Professionals - Warr & Co Chartered Acc | 2507 | 8 | 2 | BreadcrumbList,Organization,WebPage,WebSite |
| sial-accountants.co.uk | deep | 3 | Specialist Accounting Services for Salaried GPs and Locum Do | 9 | 0 | 2 | BreadcrumbList |
| www.bw-medical.co.uk | deep | 3 | Medical Accountants for Locum Doctors, Locum Doctor Accounta | 13 | 0 | 0 | FinancialService |
| locumstory.com | deep | 3 | Locum tenens out of residency: 5 ways to prepare as a reside | 1539 | 7 | 1 |  |
| www.freestyleaccounting.com | landing | 4 | Accountants for Locum Doctors & Pharmacists | Freestyle Acco | 0 | 0 | 5 | BreadcrumbList,ImageObject,WebPage,WebSite |
| bhp.co.uk | deep | 5 | Locum GPs - BHP, Chartered Accountants | 774 | 4 | 1 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.coreadviz.co.uk | deep | 1 | Accountant for Locum Doctor | Locum Doctor Accounting & Tax  | 664 | 8 | 5 | BreadcrumbList,FAQPage,LocalBusiness,Organization |

_Could not fetch: ['gorillaaccounting.com', 'bing.com', 'wisaccountancy.co.uk', 'medicsmoney.co.uk']_