# Core-page analysis pack — medical / medical_guides

- **Page:** https://www.medicalaccounts.co.uk/medical-guides
- **Source (hand-edit this):** `Medical/web/src/app/medical-guides/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **2** (8 impressions, 90d).
- Queries the core page already owns: **0**.
- National head queries: **0**; national impressions NOT on the core page: **0**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 2 | 8 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| how to become a gp partner | 7 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 41.9 | - | caught_by_blog_consolidate |
| how to become gp partner | 1 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 36.0 | - | caught_by_blog_consolidate |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 421 | 1077.0 | 5115 |
| H2 sections | 2 | 2.0 | - |
| FAQs | 1 | 2.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Medical Guides | NHS Pension, GP Tax & Locum Accounting for UK Doctors | Medical Accountants UK` — contains head token: **NO**
- H1: `Medical guides for UK doctors` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['BreadcrumbList', 'Organization', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 6, 'WebSite': 6, 'Organization': 5, 'WebPage': 5, 'Article': 4, 'ImageObject': 3, 'Person': 3, 'BlogPosting': 2, 'Place': 1, 'FAQPage': 1}
- Missing vs competitors (>=2 have it): ['Article', 'BlogPosting', 'ImageObject', 'Person', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'MISSING'}

### Component / trust patterns missing vs competitors
- ['author_byline', 'pricing_block', 'video_embed', 'worked_example']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.accountants4nhsdoctors.co.uk | landing | 1 | Private Practice Tax for Doctors | Consultant & GP Tax | 1430 | 9 | 6 | BreadcrumbList,Organization,WebPage,WebSite |
| www.nhsbsa.nhs.uk | deep | 7 | Annual allowance | NHSBSA | 3922 | 6 | 0 |  |
| reflexaccounting.co.uk | landing | 1 | NHS Pension Annual Allowance Tax Charges - Reflex Accounting | 9 | 0 | 7 | BlogPosting,BreadcrumbList,ImageObject,Organization,Person,Place,WebPage,WebSite |
| www.injuryclaimcoach.com | deep | 1 | How Personal Injury Settlements are Taxed: Avoid Surprises f | 1620 | 4 | 3 | Organization,WebSite |
| contractorpayguide.uk | blog | 1 | IR35 and Locum Medical Professionals: Doctors and Nurses Gui | 915 | 5 | 1 | Article,BreadcrumbList,WebSite |
| cfo360.co.uk | landing | 1 | Financial Health Guide: Tax and Business Tips for UK Doctors | 19 | 0 | 1 | Article,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |
| www.whatthebleep.co.uk | deep | 2 | NHS Pension 101: Annual Allowance and What Doctors Should Kn | 6 | 0 | 0 | BlogPosting |
| www.accountancyally.co.uk | blog | 2 | Buying into a GP partnership: capital account and tax record | 1239 | 16 | 3 | Article,BreadcrumbList,FAQPage |
| www.iras.gov.sg | deep | 2 | IRAS | Tax Treatment of Business Expenses (M-R) | 5115 | 0 | 0 | WebPage |
| thevetservice.com | landing | 2 | IR35 & Locum Vets - How to Stay Compliant | 9 | 0 | 8 | Article,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |

_Could not fetch: ['moneywisedoctor.com', 'linkedin.com']_