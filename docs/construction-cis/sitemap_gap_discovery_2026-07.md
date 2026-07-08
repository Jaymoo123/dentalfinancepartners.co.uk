# Sitemap Gap Discovery 2026-07 -- construction-cis

Generated: 2026-07-08  
Audience: UK construction subcontractors, contractors, tradespeople (CIS-specialist angle)  
Method: competitor sitemaps extracted, slugs cross-referenced against 57 built blog posts + app routes

---

## Universe sanity-check

### Competitors in scope

| Domain | URLs extracted | Status | Notes |
|--------|---------------|--------|-------|
| taxcount.co.uk | 18 | Included | General small-business accountant, minimal CIS content; 1 relevant URL |
| cismadeeasy.co.uk | 56 | Included | CIS-named firm but content is generic business resources; 2 marginally relevant URLs |
| constructaccountants.co.uk | 45,786 | **EXCLUDED** | Domain has been hacked/compromised; entire sitemap is gambling/casino spam content. Zero usable signal. |
| accountantforconstruction.co.uk | 10 | Included | CIS-named, very thin sitemap; 0 CIS-specific blog/guide URLs |
| constructiontaxfinance.co.uk | 13 | Included | Small CIS-specialist site; 7 URLs but all are "whatiscis" slug variants (URL normalisation artefacts from a single page) |
| shortandsons.co.uk | 49 | Included | Active CIS-aware accountant blog; best content competitor in the set |
| kingsaccounting.co.uk | 10 | Included | General accountant; 3 relevant pages (construction-accounting, payroll, personal-tax) |
| e2eaccounting.co.uk | 147 | Included | Construction/general accountant blog; 17 CIS-relevant URLs |
| swift-accountants.co.uk | 32 | Included | General accountant; 9 marginally relevant (self-assessment, sole trader) |
| coxhinkins.co.uk | 187 | Included | Active blog; 30 CIS-relevant URLs including cis-payroll, cis-scheme, construction-industry-scheme |
| rousepartners.co.uk | 493 | Included | Large firm blog; 50 CIS-relevant URLs; strongest content volume in set |

### WAF failures (coverage gap)

The following 4 domains returned no sitemap data due to WAF blocking:
- danbro.co.uk (umbrella contractor/CIS firm -- significant coverage gap)
- constructionaccountants.co.uk (unknown content volume)
- gorillaaccounting.com (unknown content volume)
- hayes-accountants.co.uk (unknown content volume)

These 4 missing sitemaps mean the gap analysis understates real competitor coverage. Topics flagged as Tier 1 gaps may already be covered by danbro or gorilla. Treat all recommendations as provisional until those sitemaps are available.

### Domain flags

- **taxcount.co.uk**: general-purpose accountant, not a CIS specialist. Useful for volume signal on generic topics (self-assessment, limited company) but not a benchmark for CIS depth.
- **cismadeeasy.co.uk**: CIS-named but content is entirely generic business resources (business finance, social media, ethics). Disregard for content benchmarking.
- **kingsaccounting.co.uk**: only 10 URLs total; service pages only, no blog. Not a content competitor.
- **swift-accountants.co.uk**: general accountant, useful for self-assessment and sole trader signals only.

---

## Built inventory (57 posts)

Key slug groups already covered:

**CIS basics and how it works:** what-is-cis, how-to-register-for-cis, cis-contractor-registration-guide, what-construction-work-is-not-cis, deemed-contractors-explained, cis-employment-status-self-employed-test, cis-for-partnerships  
**CIS refunds and reclaims:** cis-tax-refund-how-to-claim, how-much-cis-refund-will-i-get, how-long-does-cis-refund-take, cis-back-years-refund-guide, cis-limited-company-reclaim  
**Deductions and verification:** cis-deduction-rates-explained, cis-subcontractor-verification, cis-payment-deduction-statements-guide  
**Gross payment status:** cis-gross-payment-status-guide, gross-payment-status-cash-flow-guide  
**Monthly returns and compliance:** cis-monthly-return-guide, cis-nil-return-explained, cis-for-contractors-monthly-responsibilities, cis-penalties-and-appeals, cis-supply-chain-compliance-due-diligence, cis-april-2026-rule-changes  
**Structure (sole trader vs ltd):** cis-sole-trader-vs-limited-company, cis-limited-company-directors-guide, cis-for-limited-companies-eps-reclaim  
**VAT reverse charge:** vat-reverse-charge-construction, vat-reverse-charge-for-cis-contractors, vat-reverse-charge-for-cis-subcontractors  
**Software and tools:** cis-payroll-software-guide, best-cis-accounting-software, xero-cis-guide, sage-cis-guide, quickbooks-cis-guide, freeagent-cis-guide, free-cis-payroll-software, spreadsheets-vs-accounting-software-cis  
**Self-assessment and NI:** cis-self-assessment-complete-guide, cis-national-insurance-guide  
**Expenses:** allowable-expenses-cis-subcontractor, cis-invoice-splitting-labour-materials, cis-plant-hire-guide  
**Other:** cis-for-labour-agencies, cis-for-housebuilders, cis-for-property-developers, cis-and-mortgages, cis-record-keeping-guide, cis-retention-payments-guide, switching-cis-accountant-guide, cis-mistakes-that-cost-subcontractors, cis-vs-paye, cis-vs-paye-complete-comparison, cis-deadline-calendar-2026-27, mtd-income-tax-cis, citb-levy-explained, what-is-a-cis-accountant, cis-april-2026-rule-changes

Total built posts: 57. Coverage is broad. Genuine gaps are narrower than a fresh site.

---

## Tier 1 -- High-fit gaps, winnable

Topics not covered by any built page, found in competitor sitemaps, clearly CIS/construction-subcontractor-audience fit.

### 1. CIS expenses: subcontractors vs contractors (split-angle)

**Gap:** built `allowable-expenses-cis-subcontractor.md` covers the subcontractor side. No page covers **contractor-side deductible costs** (cost of engaging subcontractors, materials, site overheads). Competitors shortandsons and rousepartners both cover "claiming business expenses" and "reporting employee benefits and expenses" but not a contractor-specific CIS expenses guide.
- Proposed slug: `cis-contractor-allowable-expenses-guide`
- Cluster: CIS expenses / main contractor obligations
- Winnability: moderate -- generic expense pages are everywhere but a CIS-contractor-specific angle with worked examples is a genuine gap.

### 2. Sole trader vs limited company for CIS -- tax comparison

**Gap:** built `cis-sole-trader-vs-limited-company.md` exists BUT shortandsons has `sole-trader-or-limited-company` ranking, and coxhinkins has `sole-trader-vs-limited-company` and `how-to-set-up-a-limited-company`. The gap is a **dedicated "how to set up as a limited company CIS subcontractor" guide** covering the step-by-step mechanics (incorporation, HMRC registration, EPS reclaim setup). The existing sole-trader-vs-ltd page covers the decision; it does not cover the how-to.
- Proposed slug: `cis-limited-company-setup-guide`
- Cluster: limited company subcontractor tax
- Winnability: good -- operational how-to pages outrank comparison pages for this intent.

### 3. CIS self-assessment: payments on account

**Gap:** `cis-self-assessment-complete-guide.md` covers the full SA process but no page covers **payments on account** specifically for CIS subcontractors, which is a common source of confusion (unexpected bills in January/July). Rousepartners and shortandsons both have self-assessment FAQ and mistakes content; payments on account is consistently raised in CIS forums as a pain point.
- Proposed slug: `cis-payments-on-account-explained`
- Cluster: sole trader subcontractor tax / self-assessment
- Winnability: good -- narrow enough that general SA content does not serve it well; CIS-specific angle is a differentiator.

### 4. R&D tax credits for construction

**Gap:** rousepartners has `rd-tax-claim-construction-firm` -- R&D tax credits are increasingly claimed by construction firms (novel methods, materials, systems). No built page covers this. High-value query for the audience; connects naturally to the tax planning cluster.
- Proposed slug: `rd-tax-credits-construction-subcontractors`
- Cluster: tax planning and efficiency
- Winnability: moderate -- HMRC guidance and large accountancy firms compete but a CIS-specialist angle with examples relevant to groundworkers, specialist subcontractors, etc. is genuine.
- Note: this applies most to the contractor side; verify audience fit before commissioning.

### 5. CIS for electricians / plumbers / specific trades

**Gap:** the site has `/for/[trade]` service pages but no blog content walking through "what CIS means for [trade]" in detail. Coxhinkins, e2eaccounting, and rousepartners all have construction-sector content. Shortandsons targets "subcontractor tax return help" broadly.
- The trade-specific blog angle is: "CIS for electricians: what you need to know" -- covering registration, deductions, expenses (tools, travel, PPE) and refund timeline.
- Proposed slugs (one per trade): `cis-guide-for-electricians`, `cis-guide-for-plumbers`, `cis-guide-for-scaffolders`
- Cluster: trade-specific guides
- Winnability: good -- highly specific, long-tail, commercial intent; competes mainly with local accountant pages not deep guides.
- Priority: electricians first (highest GSC signal from triage), then plumbers, scaffolders.

---

## Tier 2 -- Useful but lower priority or harder

### 6. CIS registration: how to register as a contractor (not subcontractor)

**Gap:** `how-to-register-for-cis.md` and `cis-contractor-registration-guide.md` both exist. However, the competitor angle "how to register for CIS without delays" (shortandsons) suggests there is search volume around the pain point of HMRC delays and errors in the registration process. A "CIS contractor registration: common delays and how to avoid them" angle would be additive. Low new-page priority -- this is a page improvement candidate.

### 7. CIS and working from home expenses

**Gap:** rousepartners has `working-from-home-expenses`. The `allowable-expenses-cis-subcontractor.md` page likely covers this but may not give it dedicated treatment. Could be a section expansion rather than a new page.

### 8. Year-end tax planning for CIS subcontractors

**Gap:** rousepartners has `year-end-tax-planning`; coxhinkins has `tax-planning-guide`. No dedicated year-end planning page for CIS subcontractors (timing of pension contributions before April, timing of capital allowances, use of home expenses). Connects to the tax-planning cluster.
- Proposed slug: `year-end-tax-planning-cis-subcontractors`
- Winnability: moderate -- generic tax planning pages are authoritative but CIS-specific is a gap.

### 9. Construction industry payroll services (for contractors who need to pay subcontractors)

**Gap:** coxhinkins and rousepartners both have payroll service pages and `cis-payroll` content. Built `cis-payroll-software-guide.md` covers software; no page covers **what a CIS payroll service does** (outsourced monthly return filing, deduction statements, verification). This is a commercial services page more than a blog topic, but a guide explaining the contractor's monthly obligations and what to look for in a payroll service would serve it.
- Proposed slug: `cis-payroll-service-for-contractors`
- Note: overlaps with `cis-for-contractors-monthly-responsibilities.md` -- check before commissioning.

### 10. CIS: what counts as construction work (expanded)

**Gap:** `what-construction-work-is-not-cis.md` covers exclusions. No page covers the positive case comprehensively: "what counts as construction work under CIS" with the full HMRC definition, boundary cases (decorating, landscaping, fitting out), and examples by trade. E2eaccounting and coxhinkins have general construction-industry-scheme pages.
- Proposed slug: `what-counts-as-construction-work-cis`
- Winnability: moderate -- competes with HMRC guidance; needs a worked-examples angle.

---

## Tier 3 -- Borderline, needs more research

### 11. Capital allowances for construction subcontractors

**Gap:** rousepartners has `annual-investment-allowance`, `super-deduction-capital-allowances`, `capital-allowance-tax-claims`. Site has no capital allowances page. But the audience (subcontractors) typically doesn't own heavy plant (if they hire, plant-hire guide exists). Worth a page if the audience includes sole traders who buy tools/equipment.
- Proposed slug: `capital-allowances-cis-subcontractors`
- Caveat: check built `allowable-expenses-cis-subcontractor.md` -- AIA may already be covered there.

### 12. Bookkeeping for construction / CIS record-keeping software

**Gap:** e2eaccounting has `bookkeeping-for-construction-industry` and `wip-construction-accounting` (WIP = work in progress accounting). Built `cis-record-keeping-guide.md` exists but may not cover WIP or job-costing concepts.
- Worth reviewing the built page before commissioning; if WIP is not covered, a short addition to the existing page is cheaper than a new one.

### 13. CIS and mortgage applications (expanded)

**Gap:** `cis-and-mortgages.md` already built. Rousepartners does not appear to have this. No Tier 3 action needed -- page exists.

---

## Rejected clusters

| Cluster | Source domains | Reason for rejection |
|---------|---------------|----------------------|
| Self-assessment how-to and deadlines (generic) | shortandsons, swift-accountants, coxhinkins | Already covered by built pages; generic SA content cannibalises specialist CIS pages |
| Payroll services for businesses (generic) | kingsaccounting, coxhinkins, rousepartners | Audience mismatch -- subcontractors are not payroll operators; contractor-side payroll is covered in Tier 2 |
| Inheritance tax planning | swift-accountants, rousepartners | Out of scope for CIS subcontractor/contractor audience |
| General VAT guides | taxcount, e2eaccounting | DRC-specific pages already built (3 pages); generic VAT is not audience-fit |
| General limited company guides | taxcount, coxhinkins | Already covered by built pages on CIS ltd company structure |
| Business finance / raising finance / franchising | cismadeeasy | Generic business content, zero CIS-audience fit |
| Casino/gambling content | constructaccountants.co.uk | Hacked domain, entire content excluded |
| cismadeeasy resource pages (banking, marketing, media, film) | cismadeeasy | Generic business directory content, no CIS topic signal |
| rousepartners news/budget content | rousepartners | News-dated content (autumn-budget-for-construction-firms, construction-sector-update); not evergreen |
| constructiontaxfinance.co.uk duplicates | constructiontaxfinance.co.uk | All 7 "CIS-relevant" URLs are URL normalisation artefacts of a single what-is-cis page |

---

## Summary counts

| Stage | Count |
|-------|-------|
| Total competitor domains | 15 (in discovery.json) |
| Domains returning data | 11 |
| WAF failures (no data) | 4 (danbro, constructionaccountants, gorillaaccounting, hayes) |
| Excluded: hacked/spam domain | 1 (constructaccountants.co.uk, 45,786 URLs) |
| Total URLs extracted (usable domains) | 1,005 |
| CIS-relevant URLs across usable domains | 149 |
| Gaps after cross-ref against 57 built posts | ~20 distinct topic signals |
| Tier 1 recommended new pages | 5 topics (7-8 pages with trade-specific variants) |
| Tier 2 candidates | 4 (some are page improvements, not new pages) |
| Tier 3 (check built pages first) | 2 |

---

## Recommended launch-pool additions

Priority order for blog_topics seeding:

1. `cis-guide-for-electricians` (T1)
2. `cis-payments-on-account-explained` (T1)
3. `cis-limited-company-setup-guide` (T1)
4. `cis-guide-for-plumbers` (T1)
5. `cis-guide-for-scaffolders` (T1)
6. `year-end-tax-planning-cis-subcontractors` (T2)
7. `cis-contractor-allowable-expenses-guide` (T1, lower volume but useful for contractor audience)
8. `rd-tax-credits-construction-subcontractors` (T1, verify audience fit first)
9. `cis-payroll-service-for-contractors` (T2, check cannibalisation with existing page)

Do not commission before verifying items 8-9 for audience fit and cannibalisation.
