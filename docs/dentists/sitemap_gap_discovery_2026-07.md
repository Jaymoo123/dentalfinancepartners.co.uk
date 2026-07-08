# Sitemap Gap Discovery 2026-07 -- Dentists

Generated: 2026-07-08  
Method: competitor sitemap mining (Jaccard < 0.30 vs our 204-page inventory, cross-domain coverage ranking)  
Competitor sitemaps processed: 12 domains (3,183 total URLs across included domains)  
Surviving slugs after noise + Jaccard filter: 2,732  
Clusters formed: 1,590

This report covers the **unseen-demand (sitemap) lane only**. The GSC query lane (9 topics) is already documented in `gap_discovery_2026-07.md` and those topics are not re-proposed here.

---

## Universe curation

### Excluded

| Domain | Reason |
|--------|--------|
| dentalcpausa.com | US firm (confirmed); sitemap fetch also failed |
| goldenappleagencyinc.com | US firm (confirmed); sitemap fetch also failed |
| hivebusiness.co.uk | Sitemap fetch failed; no data available |

**Universe-curation flags:** dentalcpausa.com and goldenappleagencyinc.com were in the competitor list but are US firms with no relevance to UK dental tax/accountancy. They should be removed from `_competitor_urls.json` on next refresh. hivebusiness.co.uk failed to fetch and is a general SME accountancy firm with no apparent dental specialism -- worth reviewing whether it belongs in the universe at all.

### Included

| Domain | URLs | Signal | Notes |
|--------|------|--------|-------|
| samera.co.uk | 390 | High | Dental-specialist, strong editorial + learning center |
| djh.co.uk | 730 | High | Broad accountancy firm with dental specialism |
| hazlewoods.co.uk | 918 | High | Large regional accountant, dental + healthcare sector |
| bryden-johnson.co.uk | 752 | High | General practice accountant |
| ac-accounts.co.uk | 488 | High | General practice accountant |
| srjca.com | 273 | High | Canadian firm -- see universe note below |
| pfmdental.co.uk | 154 | High | Dental-specialist, strong signal |
| dentalaccountancy.co.uk | 62 | High | Dental-specialist |
| mccarthyaccountants.com | 168 | High | General + dental sector |
| sial-accountants.co.uk | 50 | High | Healthcare-specialist accountants |
| onlyfordentists.com | 19 | High | Dental-specialist, small site |
| nasdal.org.uk | 350 | Low | Trade association (NASDAL), kept as dental-topic signal only |

**Additional universe-curation flag:** srjca.com is a Canadian firm (Ontario). Its slugs include Canadian-specific content (CEBA loans, Ontario retirement plans, provincial tax). It was retained in the universe because it appeared in `_competitor_urls.json`, but its Canadian content inflates cluster counts for several generic clusters. Recommend removing from the dentists competitor list on next refresh.

---

## Recommended net-new topics

Topics below are new relative to our 204-page inventory AND relative to the 9 topics already recommended in the GSC query-lane report.

---

### G1 -- NHS Pension Scheme: Remedial Pension Savings Statements and Rollback

**Coverage:** 5 domains (djh.co.uk, nasdal.org.uk, pfmdental.co.uk, samera.co.uk, sial-accountants.co.uk)  
**Example competitor URLs:**
- https://samera.co.uk/newsletter/nhs-remedial-pension-savings-statements-rpss-correcting-tax-positions/
- https://pfmdental.co.uk/nhs-pensions-rollback-and-remedial-pension-saving-statements-for-nhs-dentists/
- https://www.djh.co.uk/latest-news/specialisms/dental/confirmed-nhs-pension-changes/

**Rationale:** The McCloud remedy and remedial pension savings statements (RPSS) are a live compliance burden for NHS dentists. Five dental/healthcare-specialist competitors have dedicated content on this specific sub-topic. Our existing NHS pension pages cover scheme basics and contribution rates but do not address the rollback/RPSS correction process. This is a practitioner-level question with no consumer audience, and it maps cleanly to our existing NHS pension cluster.

**Cannibalisation note:** Our `nhs-pension-scheme-essentials-for-dentists` page covers scheme structure. RPSS/rollback is a distinct sub-topic -- a new page or a clearly separated section on the existing page would not cannibalise.

---

### G2 -- Dental Practice Retirement and Exit Planning (beyond sale)

**Coverage:** 6 domains (ac-accounts.co.uk, bryden-johnson.co.uk, dentalaccountancy.co.uk, hazlewoods.co.uk, pfmdental.co.uk, samera.co.uk)  
**Example competitor URLs:**
- https://samera.co.uk/learning-center/retirement-and-transition-planning/
- https://pfmdental.co.uk/retirement-planning-focus/
- https://dentalaccountancy.co.uk/blog/dentist-pension-planning-retirement
- https://www.ac-accounts.co.uk/blog/good-retirement-planning-is-about-more-than-your-pension-and-money/

**Rationale:** Six competitors cover retirement/transition planning for dentists as a standalone topic, distinct from practice sale mechanics and distinct from pension scheme basics. The angle is broader: when to start planning, drawing down NHS pension vs private pensions vs investment income, phased retirement, and the tax sequencing of winding down. Our inventory has pages on selling a practice (exit mechanics) and NHS pension basics, but no content on the retirement planning journey itself.

**Cannibalisation note:** Not a cannibalisation risk. The practice-sale pages focus on transaction mechanics. The NHS pension pages focus on scheme structure and contributions. A retirement planning guide sits in its own lane.

---

### G3 -- IR35 and Employment Status for Dental Associates

**Coverage:** 4 domains (ac-accounts.co.uk, dentalaccountancy.co.uk, nasdal.org.uk, pfmdental.co.uk)  
**Example competitor URLs:**
- https://dentalaccountancy.co.uk/blog/ir35-dentists-employment-status-guide
- https://pfmdental.co.uk/check-employment-status-for-tax-cest-test/
- https://nasdal.org.uk/employment-status-of-associates/

**Rationale:** IR35 and employment-status determination for dental associates is a recurring compliance question: associates are technically self-employed but NHS performers lists and associate agreements introduce employment-status risk under IR35 and the off-payroll rules. Four dental/healthcare-specialist competitors have dedicated pages. Our `dental-associate-vs-self-employed-tax-employment-status` page covers the basic comparison but does not address IR35, the CEST test, or the NHS off-payroll context explicitly. A focused IR35-for-dental-associates page would serve a distinct query intent.

**Cannibalisation note:** Our existing associate employment-status page is about the fundamental self-employed vs employed distinction. An IR35/CEST page is a downstream question from that -- it presupposes the associate is self-employed and asks whether IR35 risk applies. Low cannibalisation risk; consider cross-linking.

---

### G4 -- Tax Classification of Dental Hygienists and Dental Care Professionals (DCPs)

**Coverage:** 3 domains (dentalaccountancy.co.uk, mccarthyaccountants.com, sial-accountants.co.uk)  
**Example competitor URLs:**
- https://www.mccarthyaccountants.com/tax-classification-of-dental-associates-dental-hygienists/
- https://dentalaccountancy.co.uk/dental-associates
- https://sial-accountants.co.uk/services/dental-associates/

**Rationale:** Dental hygienists, therapists, and other DCPs often work across multiple practices on a self-employed basis. Their tax treatment differs from associates in some respects (no NHS performer list, different contractual structures). Three dental-focused competitors address DCPs explicitly in content or service pages. Our inventory covers associate tax and the general DCP/hygienist audience is mentioned in discovery config, but no page targets hygienist-specific tax questions directly.

**Cannibalisation note:** Our associate-tax pages are pitched at associate dentists. A DCP-focused page expands audience coverage without overlapping existing content.

---

### G5 -- Dental Practice Cash Flow Forecasting

**Coverage:** 5 domains (ac-accounts.co.uk, bryden-johnson.co.uk, hazlewoods.co.uk, samera.co.uk, srjca.com)  
**Example competitor URLs:**
- https://samera.co.uk/newsletter/a-financial-growth-series-for-ambitious-dentists-cash-flow-forecasting/
- https://samera.co.uk/learning-center/free-cash-flow-spreadsheet-template/
- https://samera.co.uk/newsletter/struggling-with-cash-flow-a-finance-director-can-help-your-practice-grow-5x-faster/

**Rationale:** Cash flow forecasting for dental practices is a recurring topic at 5-domain coverage. Dental practices face unusual cash flow patterns: UDA payment timing, lab fee cycles, high capital expenditure on equipment, and NHS payment clawback exposure. Samera (dental-specialist) has multiple pieces on this, including a free template as a lead magnet. Our practice finance content covers borrowing and asset finance but not the management accounting layer (forecasting, monitoring, spotting problems early). This is a genuine practice-owner education gap.

**Cannibalisation note:** No existing page on cash flow management or forecasting. Not a cannibalisation risk.

---

### G6 -- Payroll for Dental Practices (dental-specific)

**Coverage:** 3 domains (djh.co.uk, onlyfordentists.com, samera.co.uk)  
**Example competitor URLs:**
- https://samera.co.uk/learning-center/payroll-for-dentists/
- https://www.djh.co.uk/latest-news/specialisms/dental/streamlining-payroll-for-dentists-enhancing-efficiency-compliance-and-outsourcing/
- http://www.onlyfordentists.com/payroll-for-dentists.htm

**Rationale:** Three dental-specialist competitors have explicit payroll-for-dentists content, covering NHS vs private staff mix, self-employed associate vs PAYE nurse classification, CQC staffing obligations, and auto-enrolment. This is a distinct dental-practice angle rather than generic payroll. The GSC query-lane report flagged "dental practice payroll" (5 impressions/28d) as low-priority standalone -- but the sitemap evidence across 3 dental-specialist competitors confirms it is a genuine topic that the audience seeks. Recommend as a blog post rather than a pillar.

**Cannibalisation note:** No existing payroll-focused page. Our `private-dental-practice-tax` page mentions staff costs in passing. New post would not cannibalise.

---

### G7 -- Wealth Management and Investment Planning for Dentists

**Coverage:** 3 domains (djh.co.uk, onlyfordentists.com, pfmdental.co.uk)  
**Example competitor URLs:**
- https://pfmdental.co.uk/financial-planning/wealth-management/
- https://www.djh.co.uk/our-services/wealth-management/
- http://www.onlyfordentists.com/wealth-management.htm

**Rationale:** Three dental-specialist competitors have wealth management / investment planning content targeting dentists. The angle is: how to invest practice surplus beyond the NHS pension, how to use ISAs and SIPPs alongside NHS pension, and how to structure family wealth. This is a different audience intent from pension scheme basics (contributions, annual allowance) and appeals to principal dentists with higher practice income. Our site has no investment or broader wealth-planning content.

**Cannibalisation note:** None. Our pension content is scheme-mechanic and contribution-focused. Wealth management is a distinct topic. Note: this borders on regulated financial advice territory -- any content must be framed as education and signpost FCA-regulated advisers, not give specific investment recommendations.

---

### G8 -- Buying a Car Through a Limited Company (dentist context)

**Coverage:** 3 domains (ac-accounts.co.uk, bryden-johnson.co.uk, samera.co.uk)  
**Example competitor URLs:**
- https://samera.co.uk/learning-center/buying-a-car-limited-company/
- https://www.ac-accounts.co.uk/blog/buying-a-second-hand-electric-car-for-your-business/
- https://bryden-johnson.co.uk/buying-an-electric-car-does-it-need-to-be-new/

**Rationale:** Incorporated dental principals frequently ask whether to buy a car through the company (BIK tax) vs personally (mileage allowance). Samera (dental-specialist) has a dedicated page on this. The topic is evergreen, low-competition in the dental-accountancy niche, and serves an audience the site already reaches (incorporated principals). Our existing pages cover incorporation basics and dividend/salary decisions but not company car mechanics.

**Cannibalisation note:** No existing page on company cars. Closest pages are on allowable expenses (mileage) and incorporation decisions. A company-car guide is additive, not duplicative.

---

### G9 -- Succession Planning for Dental Practice Owners

**Coverage:** 4 domains (ac-accounts.co.uk, bryden-johnson.co.uk, djh.co.uk, hazlewoods.co.uk)  
**Example competitor URLs:**
- https://www.djh.co.uk/our-services/tax/business-tax/succession-planning/
- https://www.hazlewoods.co.uk/expertise/business-accountants/tax/inheritance-tax-trusts-and-estate-planning/
- https://bryden-johnson.co.uk/pensions-and-estate-planning/

**Rationale:** Succession planning (passing a practice to family, selling to associates, or structuring the estate for inheritance tax) is a high-value topic for older principal dentists. Four competitors cover it. Our practice-sale content addresses external trade sale mechanics, but intra-family succession, gift holdover relief, and IHT planning for practice assets are not covered. These are high-intent queries from a valuable audience segment (principals aged 50+).

**Cannibalisation note:** Our practice-sale pages cover arms-length transactions. Succession/family transfer sits in a distinct lane. Some overlap with BADR pages is possible -- a cannibalisation pre-check against `business-asset-disposal-relief-dental-practice` and any IHT-related pages before building is recommended.

---

## Rejected clusters

| Cluster | Reason for rejection |
|---------|---------------------|
| Capital gains tax (7 domains, 27 slugs) | Our BADR and CGT pages cover the dental-specific angle. General CGT rate/allowance updates are news, not evergreen gaps. |
| Self-employed vs employed -- general (5 domains, 23 slugs) | Non-dental general employment content from ac-accounts, bryden-johnson. Not audience-fit for dental lead-gen. |
| Making Tax Digital (5 domains, 22 slugs) | Primarily news/update content. We have coverage on MTD basics already. Not a net-new dental topic. |
| Year-end planning (5 domains, 17 slugs) | General tax-year-end content, not dental-specific. Dated news format. |
| Selling a business -- general (5 domains, 9 slugs) | Canadian (srjca) and general business content, not dental practice sales. |
| Stamp Duty Land Tax (5 domains, 8 slugs) | General property tax topic; dental-relevance is tangential (practice property purchase covered elsewhere). |
| Business planning (5 domains, 7 slugs) | Generic startup/growth content, not dental-specific. |
| National Insurance updates (4 domains, 14 slugs) | News and update content, not dental-specific evergreen. |
| Covid-19 support (4 domains, 11 slugs) | Dated -- no longer relevant. |
| Self-assessment general (4 domains, 11 slugs) | Generic. Our self-assessment pages cover the dental-specific angle already. |
| R&D tax credits (4 domains, 5 slugs) | Not a dental-accountancy topic. Dental practices do not typically qualify for R&D relief. |
| Cookie policy / privacy policy (4 domains) | Compliance pages, not content. |
| Private school VAT (4 domains, 4 slugs) | Not dental. Filtered by audience-fit. |
| Capital allowances -- general hospitality/commercial (3 domains, 8 slugs) | General capital allowances content not dental-specific. We cover dental equipment capital allowances already. |
| Due diligence -- general (3 domains, 7 slugs) | Generic M&A content, not dental-practice-specific. |
| Audit services (3 domains, 5 slugs) | General audit, not dental niche. |
| Case studies -- general (4 domains, 7 slugs) | Firm-specific case studies, not replicable editorial content. |
| Employee ownership trusts (3 domains, 4 slugs) | Not dental-specific; niche corporate structure not typically used by dental practices. |
| Benefits in kind / payrolling BIK (3 domains, 4 slugs) | Generic employer topic; low dental-specific signal. Could fold into a future payroll post if built. |
| Business loans general (3 domains, 5 slugs) | Canadian content (srjca); generic bounce-back loans (dated). |
| Mental health in the workplace (3 domains, 3 slugs) | HR/wellbeing, not tax/accountancy. Out of scope. |
| Estate planning -- wills (3 domains, 3 slugs) | FCA-regulated territory; dental-specific only in overlap with succession (covered in G9). |
| Corporation tax associated companies (3 domains, 3 slugs) | Specific rule change (news), not dental-specific. |
| Starting a business -- general (3 domains, 3 slugs) | Generic; not dental-specific startup content. |
| Financial growth series (3 domains, 4 slugs) | Samera newsletter content; not replicable as a standalone editorial topic cluster. |
| MTD penalties (3 domains, 3 slugs) | Short-form news update, not a standalone evergreen topic. |
| Corporate finance (2 domains, 32 slugs) | djh.co.uk + hazlewoods.co.uk service pages; not dental-specific; out of scope for blog content. |
| Short-term rentals (3 domains, 3 slugs) | Not dental. |
| locations.kml (3 domains, 3 slugs) | Technical files, not content. |

---

## Prioritisation summary

Topics ranked by: dental-audience specificity, cross-domain coverage, and gap confidence.

| Priority | Topic | Coverage | Estimated content type |
|----------|-------|----------|----------------------|
| 1 | G1 -- NHS Pension RPSS / Rollback | 5 dental/healthcare domains | Blog post or extension of NHS pension pillar |
| 2 | G3 -- IR35 and Employment Status for Associates | 4 dental-specialist domains | Blog post |
| 3 | G2 -- Dental Practice Retirement Planning | 6 domains (mixed) | Blog post / guide |
| 4 | G5 -- Cash Flow Forecasting for Dental Practices | 5 domains (Samera dental-lead) | Blog post |
| 5 | G4 -- Tax Classification of DCPs and Hygienists | 3 dental-specialist domains | Blog post |
| 6 | G9 -- Succession Planning | 4 domains | Blog post |
| 7 | G6 -- Payroll for Dental Practices | 3 dental-specialist domains | Blog post |
| 8 -- owner decision needed | G7 -- Wealth Management for Dentists | 3 dental-specialist domains | Blog post / guide (FCA boundary awareness required) |
| 9 -- lower priority | G8 -- Company Car Through Ltd Company | 3 domains (Samera dental-lead) | Blog post |

---

## Notes on methodology

**Jaccard threshold:** 0.30 on slug-token sets. This is generous -- some surviving slugs are close paraphrases of existing pages but were not caught because token overlap fell just below the threshold. Each recommended topic above was manually reviewed for cannibalisation against existing inventory before inclusion.

**srjca.com inflation:** This Canadian firm inflates counts in several clusters (cash flow, business loans, selling a business). Where srjca is the only non-UK signal, that cluster was treated as 1-domain coverage for ranking purposes.

**News content:** The skip filter removed date-stamped and news-pattern slugs, but some news content from competitors (ac-accounts, bryden-johnson) survived as part of broader clusters because the slug itself is evergreen. These were filtered at the manual review stage.
