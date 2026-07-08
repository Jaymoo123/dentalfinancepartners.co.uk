# Sitemap Gap Discovery 2026-07 -- agency

Generated: 2026-07-08
Method: competitor sitemaps -> slug extraction -> skip filters -> Jaccard < 0.30 vs inventory -> cluster -> audience-fit judgment

**All recommendations are provisional. Do not ship until watch window closes (~2026-08-05).**

GSC data is thin (310 rows/30d); most agency pages were never indexed before the 2026-07-08 fix wave. New content volume should not increase until existing pages surface and signal data matures.

---

## Universe sanity-check

Configured competitors from agency.discovery.json:

| Domain | URLs crawled | Status | Flag/reason |
|--------|-------------|--------|-------------|
| sidekickaccounting.co.uk | 700 | KEPT | UK agency-specialist accountant, direct competitor |
| raedan.co.uk | 140 | KEPT | UK agency accountant (Xero-focused), direct competitor |
| streetsmedia.co.uk | 112 | KEPT | UK media/entertainment accountant, adjacent audience |
| perrysaccountants.co.uk | 617 | KEPT | UK accountant with agency/media clients |
| icsuk.com | 347 | KEPT | UK accountant, SME/contractor audience |
| copa.org.uk | 73 | KEPT | UK specialist tax advisory (contractor/director focus) |
| xeinadin.com | 703 | KEPT | Large UK accountancy network, general SME |
| partners-pr.co.uk | 444 | FLAGGED/EXCLUDED | PR agency serving accountants, not accountants serving agencies. Wrong direction entirely. |
| lexisnexis.co.uk | 570 | FLAGGED/EXCLUDED | Legal/compliance publisher, not an accountant or competitor. |
| polymediapr.co.uk | 191 | FLAGGED/EXCLUDED | PR agency (B2B tech/finance), not an accountancy firm. |

**Surviving universe: 7 domains, ~2,692 raw URLs.**
After skip filters and Jaccard < 0.30: 2,169 novel slugs.

Additional note on xeinadin.com: very large generalist network; many slugs cover healthcare, education, agriculture -- these will be filtered at the audience-fit stage below.
Additional note on streetsmedia.co.uk: focuses on media/entertainment/gaming (esports, TV production, film credits). Some topics relevant to creative agency founders; many are not.

---

## Recommended topic clusters (provisional. Do not ship until ~2026-08-05)

Clusters below passed three gates: (1) Jaccard < 0.30 vs existing inventory, (2) audience fit for UK digital/creative/marketing agency founders, (3) at least 2 competitor pages covering the topic (signals demand).

### 1. Agency valuation and exit planning

**Primary signals:** sidekickaccounting.co.uk has 10+ pages on agency valuation by sub-type (branding-agency-valuation-methods, creative-agency-valuation-metrics, digital-marketing-agency-valuation-methods, ai-agency-valuation-methods, agency-exit-strategy-plan, digital-marketing-agency-exit-strategy-planning). streetsmedia.co.uk has company-valuation as a standalone page. copa.org.uk covers business-asset-disposal-relief.

**Inventory check:** We have /blog/growth-and-exit/earn-out-tax-treatment-hmrc-agency-sale and /calculators/badr-cgt-calculator, but no valuation-methodology or exit-process content.

**Recommended topics (provisional):**
- "How is a marketing agency valued? Revenue multiples, EBITDA, and what buyers actually look at" (slug: `marketing-agency-valuation-methods`)
- "What multiple should I expect when selling my creative agency?" (slug: `creative-agency-sale-multiples-uk`)
- "Agency exit planning: the 18-month financial prep checklist" (slug: `agency-exit-planning-checklist`)

**Audience fit:** High. This is core agency-founder territory (lifecycle: found, grow, exit).
**SERP difficulty:** Mixed. Most SERP results for "agency valuation" are sidekick/accountancycloud style pages, not gov.uk walls. Winnable with specificity.

---

### 2. Director pay: salary sacrifice, alphabet shares, dividend waivers

**Primary signals:** raedan.co.uk covers salary-sacrifice; copa.org.uk covers different-dividends, dividend-waivers-vs-alphabet-shares; xeinadin.com covers the-real-cost-of-getting-your-salary-and-dividends-wrong-as-a-company-director. sidekickaccounting.co.uk has agency-profit-extraction-strategy and paying-yourself-agency-owner-salary-dividends.

**Inventory check:** We have /calculators/salary-dividend-optimiser but no explanatory blog content on alphabet shares, salary sacrifice, or dividend waivers for agency founders specifically.

**Recommended topics (provisional):**
- "Alphabet shares for agency founders: how to use them and when HMRC pushes back" (slug: `alphabet-shares-agency-founder-uk`)
- "Salary sacrifice for agency directors: pension, EV and childcare options" (slug: `salary-sacrifice-agency-director-uk`)
- "Dividend waivers: when they work and when HMRC treats them as income" (slug: `dividend-waivers-agency-director`)

**Audience fit:** High. Profit extraction mechanics are a primary concern for agency-founder limited company directors.
**SERP difficulty:** Copa.org.uk (specialist tax advisory) and sidekickaccounting rank on these. Gov.uk does not dominate. Winnable.

---

### 3. Agency billing models and revenue recognition

**Primary signals:** sidekickaccounting.co.uk has agency-billing-models-project-retainer, advisory-pricing-model-creative-agency, advisory-pricing-model-digital-marketing-agency, agency-annual-accounts-guide. No other competitor in this set covers revenue recognition explicitly.

**Inventory check:** We have /blog/agency-finance-essentials/agency-gross-profit-margin-benchmarks-by-agency-type but nothing on billing structures or revenue recognition.

**Recommended topics (provisional):**
- "Retainer vs project billing: cash flow and tax implications for UK agencies" (slug: `agency-billing-models-retainer-vs-project-tax`)
- "Revenue recognition for creative agencies: completed contract vs percentage completion" (slug: `agency-revenue-recognition-uk`)

**Audience fit:** High. Agency founders managing a mix of retainer and project income face real accounting questions here.
**SERP difficulty:** sidekickaccounting is the main competitor on these slugs, not authority sites. Winnable with deeper content.

---

### 4. IR35 and contractor/freelancer management for agencies

**Primary signals:** sidekickaccounting.co.uk has ir35-agency-contractors-guide, agency-subcontractor-management-financial-controls, should-i-hire-freelancer-contractor-employee. streetsmedia.co.uk covers can-you-fully-outsource-accounting-tax-payroll-as-a-limited-company.

**Inventory check:** We have a mention in the near-existing field (IR35 and Creative Agencies noted as nearest existing for item 11) but no dedicated IR35-for-agencies blog content confirmed in the triage data.

**Recommended topics (provisional):**
- "IR35 for digital agencies: which contractors are caught and how to test status" (slug: `ir35-digital-agency-contractor-status`)
- "Hiring freelancers vs employees as an agency: the tax and NIC cost comparison" (slug: `agency-freelancer-vs-employee-tax-cost`)

**Audience fit:** High. Agencies routinely use freelancers/contractors and misclassification is a real risk.
**SERP difficulty:** sidekickaccounting and streetsmedia present; no gov.uk wall at positions 1-3 on these variants typically.

---

### 5. Agency cash flow and funding

**Primary signals:** sidekickaccounting.co.uk has the most coverage here (agency-cash-flow-forecasting, agency-funding-recurring-revenue, agency-growth-funding-options-loans-investment-revenue, business-loans-digital-marketing-agency, are-business-loans-tax-deductible-for-agencies). 

**Inventory check:** Not covered in existing inventory from triage data.

**Recommended topics (provisional):**
- "Agency cash flow forecasting: a practical 13-week model for founders" (slug: `agency-cash-flow-forecasting-13-week`)
- "Are business loan interest payments tax deductible for an agency?" (slug: `agency-business-loan-tax-deductible-interest`)

**Audience fit:** High for the cash-flow topic; moderate for the loan-deductibility topic (foundational, but also covered by general SME content).
**SERP difficulty:** sidekickaccounting is the primary competition; no authority-site wall.

---

### 6. R&D tax credits for creative/digital agencies

**Primary signals:** streetsmedia.co.uk has creative-industry-tax-reliefs-what-youre-missing-and-how-to-claim, creative-film-theatre-rd-tax-reliefs, gaming-tax-credits-vs-rd-tax-relief-which-one-fits-your-studio-best. sidekickaccounting.co.uk has coverage.

**Inventory check:** Not present in the existing inventory from triage data.

**Recommended topics (provisional):**
- "R&D tax credits for digital marketing agencies: what qualifies and what does not" (slug: `rd-tax-credits-digital-agency-uk`)
- "Can a creative agency claim R&D relief? The HMRC test explained" (slug: `rd-relief-creative-agency-hmrc-test`)

**Audience fit:** Moderate to high. Many agency founders are unaware they might qualify. Topics need careful framing (most marketing agencies do NOT qualify for R&D, so the page needs honest guidance not false promises).
**SERP difficulty:** streetsmedia is the primary competitor. No gov.uk domination. Winnability depends on quality and specificity.

---

### 7. Agency holding company and group structure

**Primary signals:** sidekickaccounting.co.uk has agency-holding-company-structure-guide. copa.org.uk covers incorporation-partnership-relief and sdlt-on-incorporation.

**Inventory check:** Not covered.

**Recommended topics (provisional):**
- "Should I set up a holding company for my agency? Tax benefits and risks" (slug: `agency-holding-company-structure-uk`)

**Audience fit:** High. A common milestone for growing agencies (second company, group structure, IP holding).
**SERP difficulty:** Low competition from sidekick; no authority-site wall for the agency-specific framing.

---

## Rejected clusters

| Cluster | Domain source | Reason for rejection |
|---------|--------------|---------------------|
| Media/gaming/esports tax | streetsmedia.co.uk | Audience mismatch. Agency founders = digital/creative/marketing. eSports, film tax credits, TV productions are adjacent sectors, not the target audience. |
| CIS and construction | perrysaccountants.co.uk, icsuk.com | Audience mismatch. CIS = Construction Industry Scheme. Not relevant to agency founders. |
| Location-specific accountant pages | streetsmedia.co.uk (Guildford, Cardiff, Hertfordshire) | Geo-targeting pages for a competitor's office locations. Not a content gap for agencyfounderfinance.co.uk. |
| Influencer/streamer tax | streetsmedia.co.uk | Wrong audience. Agency founders are business owners, not individual content creators. |
| General small-business tax (HMRC penalties, self-assessment, bookkeeping basics) | xeinadin.com, perrysaccountants.co.uk, icsuk.com | Too generic. Not differentiated for agency founders. Would not attract the target audience or convert leads. |
| Payroll for academies/MATs/GP practices | xeinadin.com | Wrong sector entirely. |
| Healthcare/farming/charities | xeinadin.com | Wrong sector entirely. |
| Buy-to-let / property investor content | copa.org.uk | Wrong audience. Agency founders, not property investors. |
| International: non-UK tax law (Irish CGT, US taxes) | xeinadin.com | Not relevant to UK agency founders unless framed as outbound relocation, which we already cover under UAE/Dubai. |
| VAT case law and tribunal decisions | xeinadin.com | Too technical/niche; not the right entry point for an agency founder audience. |
| Accounting software reviews (best Xero alternative, QBO vs Xero) | sidekickaccounting.co.uk | Software-comparison content; we are not positioned as a software-review site. |
| Best accounting software for [agency sub-type] (49 variants) | sidekickaccounting.co.uk | Thin permutation spam pattern. Not a fit for our quality bar. |
| Agency loan products by sub-type (AI agency loans, email agency loans) | sidekickaccounting.co.uk | Permutation spam. One good cash-flow/funding guide covers this better. |
| Valuation metrics by hyper-specific sub-type (branding-agency-valuation-metrics, influencer-agency-valuation) | sidekickaccounting.co.uk | Many are thin permutations. Consolidate into 2-3 well-researched valuation pieces (covered in Cluster 1 above). |
| Draft/internal pages (draft-dubai-landing-page, draft-dubai-landing-page-copy) | sidekickaccounting.co.uk | Staging pages accidentally in sitemap. Not content gaps. |
| Patent box | streetsmedia.co.uk | Very narrow applicability to agency founders; most creative agencies do not hold patents. |

---

## Honest count

Recommended clusters: 7
Recommended individual topics within clusters: 14
Rejected clusters: 14+

**Total net-new topic budget from sitemap gap mining: 14 provisional topics across 7 clusters.**

These 14 topics should be queued for post-watch-window evaluation (~2026-08-05), after which: (a) fresh GSC/Bing data will show whether the fix wave surfaced existing pages, (b) if existing coverage is still thin, these topics are the next build priority.

No content should be written or committed before the watch window closes.
