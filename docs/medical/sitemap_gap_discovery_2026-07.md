# Sitemap Gap Discovery 2026-07: medical (medicalaccounts.co.uk)

Generated: 2026-07-08  
Method: competitor sitemap slug inventory vs our 73-page blog inventory (Jaccard < 0.30 threshold)  
Our inventory: 73 pages  

---

## Coverage limitation

**6 of 15 competitor sitemaps failed to fetch** and are absent from this analysis:

- bw-medical.co.uk (largest specialist medical accountant in UK, 2,000+ clients)
- medicsmoney.co.uk (doctor-matching platform, likely 50+ content pages)
- aisma.org.uk (trade association, excluded from universe anyway)
- sandisoneasson.co.uk (Wilmslow/London specialist, active content programme)
- gondalaccountancy.co.uk (smaller specialist)
- rbp.co.uk (large specialist, 550 medical partnerships)

This is a material gap. bw-medical and rbp alone represent two of the highest-authority niche medical accountants in the UK. Results below reflect 9 of 15 domains in the configured competitor universe.

---

## Universe curation (sites/medical.discovery.json audit)

The configured competitor universe contains 15 domains. After review:

| Domain | Classification | Notes |
|--------|---------------|-------|
| bw-medical.co.uk | COMPETITOR_FIRM | Specialist medical accountant |
| medicsmoney.co.uk | COMPETITOR_FIRM | Doctor-accountant matching platform |
| nicholsmedical.co.uk | COMPETITOR_FIRM | Specialist medical accountant |
| aisma.org.uk | **TRADE_ASSOCIATION** | Not a competing firm. Include for topic intelligence only, not gap calculation |
| sandisoneasson.co.uk | COMPETITOR_FIRM | Specialist medical accountant |
| r-m-t.co.uk | COMPETITOR_FIRM | Large regional firm, active medical division (note: broad non-medical content also present) |
| sial-accountants.co.uk | COMPETITOR_FIRM | Specialist medical accountant |
| gondalaccountancy.co.uk | COMPETITOR_FIRM | Smaller specialist |
| rbp.co.uk | COMPETITOR_FIRM | Specialist medical accountant |
| practiceindex.co.uk | **DIRECTORY/MARKETPLACE** | GP practice directory, not a competing accountant firm. Exclude from gap calculation |
| bma.org.uk | **TRADE_BODY/PUBLISHER** | Doctor union/publisher, not a competing firm. Exclude from gap calculation |
| dma-accountancyservices.co.uk | COMPETITOR_FIRM | General-practice accountant, some medical work |
| thomasbarrie.co.uk | COMPETITOR_FIRM | Small specialist medical accountant |
| larking-gowen.co.uk | COMPETITOR_FIRM | Large East Anglian firm, dedicated medical team (note: bulk of site is non-medical) |
| kudosaccounting.co.uk | COMPETITOR_FIRM | Specialist medical accountant |

**Action for next run:** exclude aisma.org.uk, practiceindex.co.uk, bma.org.uk from gap calculation in sites/medical.discovery.json.

---

## Filtering applied

Before Jaccard comparison, URLs were excluded if they matched:
- Standard skip patterns (wp-admin, feed, contact, about, privacy, terms, tag, author)
- News/time-bound patterns (year numbers, "budget", "update", "announces", "latest")
- Non-content patterns (team, careers, jobs, testimonials, case studies, awards, events, webinars, podcasts)
- Non-medical sector patterns for large generalist firms (agriculture, charity, construction, hospitality, legal, tourism, etc.)

After filtering: 617 unique medical-adjacent candidate slugs reviewed. Most single-domain J=0.00 entries from r-m-t.co.uk and larking-gowen.co.uk were general accounting/business articles that slipped through the medical-token filter due to incidental NHS/tax keyword matches.

---

## Recommended net-new topics

These clusters pass three tests: (1) medical-specific audience fit, (2) Jaccard < 0.30 against all 73 existing pages, (3) more than surface-level demand signal or multi-competitor coverage.

---

### 1. Hospital doctors / NHS consultants tax hub

**Suggested title:** "Hospital Doctor and NHS Consultant Tax Guide: Employed, Private Practice, and LtdCo"  
**Suggested slug:** `/blog/hospital-doctor-nhs-consultant-tax-guide`

Example competitor URLs:
- nicholsmedical.co.uk/hospital-doctors/ (J=0.14)
- r-m-t.co.uk/rmt-medical/hospital-doctors/ (J=0.14)
- larking-gowen.co.uk/sectors/healthcare/hospital-doctors/ (J=0.14)
- kudosaccounting.co.uk (tax planning for consultants content)

Coverage count: 3 specialist firms + confirmed SERP demand from "accounting for doctors" cluster

Rationale: We cover GP partners, salaried GPs, and locum GPs in depth. Hospital doctors (F2, SHO, registrar, SpR, consultant) are a large distinct sub-audience with different issues: PAYE tax codes with private income, honorary contracts, LtdCo structures for private practice income, GMC fee deductibility, mileage between hospital sites, and NHS pension scheme-pays mechanics at consultant income levels. No page in our inventory addresses this segment directly. Three specialists maintain dedicated landing pages for it.

Cannibalisation: none. Our `/for-locum-doctors` and locum-tax blog cover locum GPs. This is a distinct audience.

---

### 2. VAT for medical professionals (beyond GP exemption)

**Suggested title:** "VAT for Doctors and Medical Professionals: What is Exempt and What is Not"  
**Suggested slug:** `/blog/vat-medical-professionals-exempt-taxable-guide`

Example competitor URLs:
- nicholsmedical.co.uk/vat-for-medical-professionals/ (J=0.17)
- kudosaccounting.co.uk/vat-for-medical-professionals/ (J=0.17)
- kudosaccounting.co.uk/navigating-vat-for-medical-professionals-key-insights-and-pr/ (J=0.08)

Coverage count: 2 specialist firms

Rationale: Our existing `/blog/gp-vat-registration` (Jaccard 0.17 against this slug) covers GP practice VAT registration, partial exemption, and the "qualifying medical care" exemption in the GP context. The broader topic of what is VAT-exempt for doctors, consultants, and private practitioners (cosmetic, medico-legal, occupational health, aesthetic services, NHS commissioned vs private) is a distinct and wider question. Two competitors have named pages for this. Strong Bing impression signal: "vat medical exemption", "hmrc vat medical exemption", "medical vat exemption" all show served impressions on our existing VAT page, suggesting the current page is over-broad and audiences are arriving with more specific intent.

Cannibalisation: partial overlap with gp-vat-registration but distinct scope. The existing page should remain as the GP-practice-specific page; this new page targets individual practitioners (consultants, locums doing private work, aesthetics).

---

### 3. Making Tax Digital for GPs and medical practices

**Suggested title:** "Making Tax Digital for GPs and Medical Practices: MTD ITSA Guide"  
**Suggested slug:** `/blog/making-tax-digital-gp-medical-practice-itsa-guide`

Example competitor URLs:
- larking-gowen.co.uk/making-tax-digital-mtd/ (J=0.17, covers medical clients)
- r-m-t.co.uk/making-tax-digital/ (J=0.17)
- larking-gowen.co.uk/making-tax-digital-for-income-tax/ (J=0.25)
- r-m-t.co.uk/making-tax-digital-for-income-tax/ (J=0.25)

Coverage count: 2 firms with medical client bases

Rationale: MTD ITSA is mandatory from April 2026 for self-employed with income above 50k. GP partners and locums are primary affected groups. Our inventory has `/blog/gp-accounting-software` (Xero/cloud focus) but no dedicated MTD compliance guide. The posting-GMS-statements-in-Xero gap from larking-gowen also signals a bookkeeping-workflow gap that could anchor this page. Medical accountants are actively publishing this because their clients need to act now.

Cannibalisation: none. gp-accounting-software is tool-selection, not compliance obligation.

---

### 4. Director loan accounts for NHS consultants with limited companies

**Suggested title:** "Director Loan Accounts for NHS Consultants: Tax Rules and Risks"  
**Suggested slug:** `/blog/director-loan-account-nhs-consultant-limited-company`

Example competitor URLs:
- nicholsmedical.co.uk/directors-loan-account-nhs-consultants/ (J=0.10)

Coverage count: 1 firm (nicholsmedical)

Rationale: We have `/blog/gp-limited-company-tax-benefits-drawbacks` and `/blog/locum-doctor-limited-company-pros-and-cons` but nothing on the mechanics of drawing money from the LtdCo once established, specifically the S.455 tax on overdrawn director loan accounts, the 9-month repayment rule, and how consultants typically use DLA to smooth income extraction alongside salary and dividends. nicholsmedical has a standalone page; this is a natural extension of our incorporation coverage. Lower volume but high specificity and high-intent audience (consultants already running LtdCos).

Cannibalisation: `/blog/gp-limited-company-tax-benefits-drawbacks` (J=0.10 against this slug). Different enough: that page covers the decision to incorporate; this covers post-incorporation cash extraction mechanics.

---

### 5. Paying family members / spouse salary for GP partners

**Suggested title:** "Paying Your Spouse or Family Members Through Your GP Practice: Tax Guide"  
**Suggested slug:** `/blog/gp-partner-paying-spouse-family-member-tax`

Example competitor URLs:
- nicholsmedical.co.uk/paying-family-members/ (J=0.00 - no inventory match)

Coverage count: 1 firm (nicholsmedical)

Rationale: Income splitting via employing a spouse or family member is a common tax-planning tactic for GP partners. HMRC scrutinises the arrangement; there are employment law and national minimum wage considerations; and it interacts with the GP's personal allowance strategy. We cover GP partnership tax broadly in `/blog/gp-partnership-tax-complete-guide` and profit-sharing in `/blog/gp-partnership-profit-sharing-tax-planning` but not the specific mechanics of paying family members. Low Jaccard (0.00) confirms genuine gap.

Cannibalisation: low. Profit-sharing page covers profit allocation between partners. This is a distinct topic: employing a spouse as a practice employee or bookkeeper, with all the PAYE/NIC/reasonableness considerations.

---

### 6. GPs and doctors moving abroad: UK tax on leaving

**Suggested title:** "GPs Moving Abroad: UK Tax Residency, NHS Pension, and What Happens When You Leave"  
**Suggested slug:** `/blog/gp-doctor-moving-abroad-uk-tax-nhs-pension`

Example competitor URLs:
- nicholsmedical.co.uk/doctors-moving-to-dubai/ (J=0.11)
- nicholsmedical.co.uk/uk-gps-moving-abroad/ (J=0.14)
- nicholsmedical.co.uk/set-up-a-medical-practice-in-dubai/ (J=0.20)
- nicholsmedical.co.uk/dubai-medical-tax-rules/ (J=0.17)

Coverage count: 1 firm (nicholsmedical), 4 pages on this theme

Rationale: Doctor emigration is a growing demand category. nicholsmedical has built a 4-page cluster around it. Our inventory has nothing on residency, domicile, non-dom status, or NHS pension treatment on leaving the UK. The NHS pension "preserved benefit vs refund" decision is non-obvious and high-stakes. One competitor currently has no competition from us in this space.

Cannibalisation: none.

---

### 7. Type 2 pension certificates for salaried GPs

**Suggested title:** "Type 2 Pension Certificates for Salaried GPs: Complete Guide to PCSE Submission"  
**Suggested slug:** `/blog/type-2-pension-certificate-salaried-gp-pcse`

Example competitor URLs:
- larking-gowen.co.uk/type-2-certificates-for-salaried-gps/ (J=0.09)

Coverage count: 1 firm

Rationale: We have strong coverage of locum Form A/Form B (our best-performing Bing content). Type 2 certification is the parallel process for salaried GPs via PCSE: pensionable pay, superannuation tiers, the annual return to NHSBSA. Our existing Form A/B page has driven strong impression share; Type 2 is the natural gap in the same audience. One competitor confirmed.

Cannibalisation: `/blog/nhs-pension-for-locums-form-a-form-b` (Form A/B is Type 1 / locum). Distinct enough.

---

### 8. Salaried GP early-year expenses claims

**Suggested title:** "Early Career GP Expenses: What Salaried GPs Can Claim in Their First Year"  
**Suggested slug:** `/blog/salaried-gp-early-year-expenses-claims`

Example competitor URLs:
- nicholsmedical.co.uk/salaried-gps-early-year-expenses-claims/ (J=0.09)
- nicholsmedical.co.uk/early-year-expense-claim-download/ (J=0.10)

Coverage count: 1 firm (nicholsmedical, 2 pages on theme)

Rationale: Salaried GPs (F2s moving into GP training, GPST registrars) have specific HMRC flat-rate expense claims and professional subscriptions that apply from year 1. This is a high-volume early-career query type. Our `/blog/medical-professional-expenses-what-is-claimable` covers expenses broadly. A salaried/early-career specific page is more targeted and matches the search intent better.

Cannibalisation: partial overlap with `medical-professional-expenses-what-is-claimable`. Suggest treating as an improve-existing if that page can be restructured, or a separate page if the salaried-specific angle needs dedicated depth.

---

## Rejected clusters

| Cluster | Slugs | Reason |
|---------|-------|--------|
| Generic accounting | national-insurance, tax-compliance, personal-tax, international-tax, making-tax-digital (non-medical versions) | No medical-specific angle; general content we should not compete in |
| Non-medical sector content from larking-gowen / r-m-t | agriculture, charity, construction, etc. | Leaked through filter; not relevant |
| News/event content | gp-contract-changes-2024-25, gp-funding-2024-25, nhs-10-year-plan | Time-bound, news format, not evergreen |
| Firm-specific / internal | team bios, award announcements, company news, press releases | Not content gaps |
| Location pages | medical-accountants-in-london, gmc-regional variations | We already have location pages |
| Company Voluntary Arrangements (CVA) | company-voluntary-arrangements-cva | Not medical-specific, insolvency content |
| Private client trusts/probate | private-client-trusts-probate | Wealth/estate planning, not core medical accountancy |
| Family investment companies (generic) | family-investment-companies | Too generic; our recommended page #4 (DLA/consultant) is more specific |
| Tax enquiry protection | tax-enquiry-protection, tax-enquiry-protection-service | Insurance/protection product, not our content type |
| Pharmacy accountants | pharmacy-accountants | Different regulated profession, out of scope for medical site |
| GMS statements in Xero | posting-gms-statements-in-xero | Too narrow; better as a section within MTD/bookkeeping guide |
| Personally administered items boosting income | personally-administered-items-boosting-medical-practice-income | Niche GP contract topic; low search volume signal |
| Investment losses for doctors | why-doctors-dentists-lose-millions-on-investments | Financial planning/IFA territory, not accountancy |
| Dubai medical practice setup | set-up-a-medical-practice-in-dubai | Too narrow and location-specific (non-UK) |

---

## Honest count

- Competitor domains in universe: 15
- Domains with sitemaps fetched: 9 (6 failed, including bw-medical and rbp)
- Total filtered candidate slugs: 617
- Meaningful medical-specific gap clusters identified: 8 topic areas
- Net-new pages recommended: **8** (7 confirmed gaps + 1 improve-or-split decision)
- Rejected clusters: 14 named categories
- Coverage limitation: significant (bw-medical + rbp absence means highest-authority competitor content programmes not visible)

**All recommendations: provisional, hold until watch window closes (~2026-08-03)**

---

## Addendum: recovered sitemaps (2026-07-08)

**New domains analysed:** sandisoneasson.co.uk (12 sitemap URLs), gondalaccountancy.co.uk (204 sitemap URLs).

**Method:** same as above. Standard skip patterns applied (about, contact, privacy, team, careers, location pages). Remaining slugs checked for medical-specific audience fit. Jaccard < 0.30 vs 73-page inventory. All 8 existing topics excluded from consideration.

---

### Sandison Easson (12 URLs)

After skipping non-content pages (team, contact-us, training-and-talks, tax-investigation) and out-of-scope pages (dental-practice-accounting), medical-relevant service pages remaining: hospital-consultants, gp-practice, gp-federations, gp-locums, registrars.

- hospital-consultants: maps to existing topic 1. Excluded.
- gp-practice, gp-locums: core service landing pages, not content topic gaps.
- **gp-federations**: net-new. See B1 below.
- **registrars**: net-new. See B2 below.

### Gondal Accountancy (204 URLs)

After skipping: location pages (accountants-in-*), generic SME service pages (startup-business-accountants, sole-traders-accountants, bookkeeping-accountants, payroll-accountants, etc.), gig-economy pages (uber, bolt, deliveroo, etsy, etc.), ecommerce pages, and generic blog posts (Birmingham grants, furlough, SEISS, lockdown grants, general self-assessment tips).

Medical-adjacent slugs: accountants-for-medical-professionals, accountants-for-doctors, gp-surgery-accountants. These are service landing pages, not content topics. Gondal's blog contains zero medical-profession-specific editorial content; all blog posts are generic SME/landlord/self-assessment content.

**Verdict for Gondal: no net-new medical topics.**

---

### B1. GP Federations: Accounting, Tax, and Structure

**Sandison Easson slug:** `gp-federations`
**Domain count:** 1 (sandisoneasson only in recovered domains; not present in original 9-domain universe)

Rationale: GP federations are groups of GP practices that have formed a larger organisational entity, typically to bid for and deliver enhanced services (extended hours, care homes, minor surgery). Their accounting and tax position differs from individual practices: entity structure choice (Community Interest Company, limited company, or partnership), VAT on services provided between member practices, NHS pension position for staff employed by the federation rather than a constituent practice, and corporation tax if structured as a limited company. We have no content on GP federations. Sandisoneasson dedicates a service page to this segment. Audience: GP partners and practice managers involved in federation governance.

Cannibalisation: none against existing 8 topics. Closest is our GP partnership tax content, but federations are a distinct organisational tier.

---

### B2. Medical Registrars and GP Registrars: Tax During Training

**Sandison Easson slug:** `registrars`
**Domain count:** 1 (sandisoneasson only)

Rationale: Medical registrars (ST1-ST8 hospital trainees) and GP registrars (GPST1-GPST3) are employed via Health Education England / NHS deanery on PAYE, but may also have income from locum shifts, on-call supplements, and exam reimbursements. GP registrars transition to self-employment when they become GP partners. Specific questions: whether to register for self-assessment during training years, how to claim mileage between deanery-assigned hospital sites, tax treatment of study leave and course costs, and planning the transition from PAYE to self-employed. Existing topic 1 (hospital doctors) targets consultants; registrars are a distinct earlier career stage with materially different income structure.

Cannibalisation: low. Topic 1 is targeted at hospital doctors broadly but is framed around consultants, private practice, and LtdCo. Registrars are mostly PAYE with supplementary income. Write as a standalone early-career guide.

---

**Honest count: 2 additional topics recommended (B1-B2), both single-domain signal from sandisoneasson.co.uk. Confirm against bw-medical.co.uk and rbp.co.uk sitemaps when available (still failing as of original report). Gondal contributes no net-new topics.**

---

## Priority order (suggested)

1. Hospital doctor / NHS consultant tax hub (clear audience gap, 3-domain signal)
2. VAT for medical professionals beyond GP exemption (2-domain signal, ties to existing Bing traffic)
3. MTD for GPs (regulatory urgency, April 2026 mandate active)
4. GPs moving abroad / UK tax on leaving (nicholsmedical 4-page cluster = proven demand)
5. Type 2 pension certificates for salaried GPs (natural complement to our best Bing content)
6. Paying family members through GP practice (income splitting, 1-domain signal)
7. Director loan accounts for NHS consultants (1-domain, high-intent)
8. Salaried GP early-year expenses (1-domain, may be improve-existing)
