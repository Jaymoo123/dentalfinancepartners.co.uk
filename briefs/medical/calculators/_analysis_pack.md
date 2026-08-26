# Core-page analysis pack — medical / calculators

- **Page:** https://www.medicalaccounts.co.uk/calculators
- **Source (hand-edit this):** `Medical/web/src/app/calculators/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **0** (0 impressions, 90d).
- Queries the core page already owns: **0**.
- National head queries: **0**; national impressions NOT on the core page: **0**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 287 | 403.5 | 2939 |
| H2 sections | 10 | 1.5 | - |
| FAQs | 0 | 2.5 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Free Medical Tax Calculators | NHS Pension, Locum Tax & Incorporation | Medical Accountants UK` — contains head token: **NO**
- H1: `Medical tax calculators for UK doctors` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['Organization', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 4, 'FAQPage': 3, 'Article': 2, 'WebApplication': 2, 'HowTo': 2, 'Organization': 2, 'SoftwareApplication': 1, 'WebPage': 1, 'Person': 1, 'NewsArticle': 1, 'WebSite': 1}
- Missing vs competitors (>=2 have it): ['Article', 'BreadcrumbList', 'FAQPage', 'HowTo', 'WebApplication']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'MISSING'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'download_form', 'step_list', 'worked_example']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.nhsbsa.nhs.uk | landing | 1 | NHS Pensions | NHSBSA | 45 | 1 | 0 |  |
| www.nhsemployers.org | landing | 1 | Assessing annual allowance - ready reckoner tool and demonst | 2939 | 1 | 4 | Article |
| pensioncalc.co.uk | landing | 3 | NHS Pension Calculator - PensionCalc | 602 | 4 | 4 | BreadcrumbList,FAQPage,WebApplication |
| www.acctek.co.uk | deep | 4 | NHS Pension Annual Allowance Calculator 2026/27 | Locum | 1986 | 8 | 10 | BreadcrumbList,FAQPage,HowTo,SoftwareApplication,WebPage |
| pensions.gov.scot | deep | 4 | NHS Pension: How Much You’ll Get | SPPA | 1193 | 1 | 0 |  |
| ukcalculator.com | landing | 5 | Doctor Salary Calculator UK 2026 | NHS Take-Home | 2177 | 12 | 9 | Article,BreadcrumbList,FAQPage,HowTo,Organization,Person |
| www.gov.uk | blog | 5 | New NHS Pension Scheme calculators - GOV.UK | 331 | 3 | 3 | BreadcrumbList,NewsArticle |
| faq.nhsbsa.nhs.uk | deep | 7 | How is an NHS pension calculated in the 1995 and 2008 Sectio | 476 | 2 | 0 |  |
| www.net-paid.com | landing | 8 | NHS 2015 Pension Calculator | 6 | 0 | 0 |  |
| www.salarydr.com | landing | 1 | Physician Take-Home Pay Calculator | SalaryDr | 114 | 0 | 6 | Organization,WebApplication,WebSite |
| www.quilter.com | deep | 1 | Tapered Annual Allowance calculator - 2025/26 | Quilter | 243 | 4 | 2 |  |
| www.nhspensioncalc.datamek.co.uk | homepage | 1 | NHS Pension Calculator - Plan for your future | 256 | 0 | 0 |  |