# Sitemap Gap Discovery 2026-07 v2 -- generalist (Holloway Davies)

Generated: 2026-07-08 (v2 rebuild)
Method: Competitor universe rebuild via DDG supplementation + curated curation + sitemap crawl + Jaccard < 0.30 vs 366-page inventory + audience/lead-gen judgment pass

---

## Universe rebuild

### Before (v1 -- 8 domains, 7 junk)

The v1 universe was derived from GSC head queries dominated by "construction accounting software" and "acca vs icaew" terms. This seeded the list with software vendors, Indian education sites, training providers, and news stubs. Only 1 of 8 domains was a genuine accountancy firm.

### Root cause

GSC impressions for the generalist site are skewed by two irrelevant query clusters:
- "construction/contractor accounting software" -- software comparison queries landing on the site
- "acca vs icaew" -- accountancy qualification queries

Deriving competitors from these head terms produces software review sites, training providers, and publishers -- not SME accountancy firms. The fix: supplement with DDG searches on the right queries ("small business accountant uk blog", "limited company accountant guides uk") and curate manually.

### After (v2 -- 12 curated domains)

| Domain | Type | Content signal | Notes |
|--------|------|----------------|-------|
| pulse-accountants.co.uk | London SME accountancy firm | 145 editorial pages | Confirmed v1 signal |
| theaccountancy.co.uk | UK accountancy firm blog | 3 post-sitemaps (large) | Failed sitemap fetch (WAF) -- kept for future run |
| businessaccountingbasics.co.uk | UK accounting education/guides | 128 blog posts | Bookkeeping, sole trader, tax content |
| bytestart.co.uk | UK SME startup/business guides | 252 sitemap URLs, post-sitemap | Established UK SME resource |
| a-wise.co.uk | UK accountancy firm | 425 sitemap URLs, post-sitemap | 305 content-shaped URLs crawled |
| perrysaccountants.co.uk | UK accountancy firm | 641 sitemap URLs, post-sitemap | 617 content-shaped URLs |
| crunch.co.uk | Online accountancy firm | 1,435 sitemap URLs, /knowledge | Large editorial content operation |
| informi.co.uk | UK SME business guides (Lloyds) | 1,226 sitemap URLs, articles + blog | Strong cross-topic editorial coverage |
| sandbaccountants.co.uk | London SME accountancy firm | 49 blog posts | Small but high-quality signal |
| accountsandlegal.co.uk | UK accountancy + legal firm | post-sitemap | Failed sitemap fetch (WAF) -- kept for future run |
| dnsassociates.co.uk | UK accountancy firm | blog-sitemap | Failed sitemap fetch (WAF) -- kept for future run |
| countingup.com | UK fintech/accountancy app | 622 sitemap URLs, post-sitemap | Strong editorial guides operation |

**Effective crawl:** 9 of 12 domains returned sitemap data (3 blocked by WAF). Total: 3,849 content-shaped URLs across the 9 active domains.

---

## Crawl stats

| Domain | Content URLs crawled | First-cut gaps (loose-match) | Jaccard < 0.30 survivors |
|--------|---------------------|------------------------------|--------------------------|
| pulse-accountants.co.uk | 145 | 73 | 71 |
| businessaccountingbasics.co.uk | 268 | 173 | 170 |
| bytestart.co.uk | 246 | 110 | 119 |
| a-wise.co.uk | 305 | 109 | 136 |
| perrysaccountants.co.uk | 617 | 440 | 358 |
| crunch.co.uk | 1,369 | 784 | 806 |
| informi.co.uk | 1,218 | 770 | 730 |
| sandbaccountants.co.uk | 69 | 26 | 25 |
| countingup.com | 612 | 209 | 427 |
| **TOTAL** | **3,849** | **2,694** | **2,842** |

After clustering: 1,589 topic clusters. Clusters ranked by domain coverage (how many competitors independently cover the topic) then cluster size.

---

## Recommended net-new topics (v2)

Owner is cost-conscious on the generalist site: prioritise topics with (a) multi-domain competitor signal, (b) clear lead-gen value for a generalist accountancy firm, (c) no existing page in our 366-page inventory.

v1 topics already proposed (do not re-propose): year-end checklist, HMRC enquiry guide, VAT on hospitality/food, benefit-in-kind company cars, land remediation relief, private healthcare accountants, 3PL logistics accountants.

### TIER 1 -- High priority, clear SME lead-gen, 5+ domain signal

**GAP-V2-1: Business cash flow guide**
- Slug: `cash-flow-management-small-business-uk`
- Cluster: [8] in analysis, 5 domains covering this (a-wise, businessaccountingbasics, countingup, crunch, informi)
- Source slugs: improve-your-cash-flow, how-to-improve-cash-flow-with-an-effective-forecasting-strategy
- Gap confirmed: no cash flow page in our 366-page inventory. We have cash-basis-vs-accruals-sole-trader and cash-basis-sole-trader-loss -- distinct scope (accounting method, not management).
- Rationale: Cash flow is the primary reason SMEs seek an accountant. Business owners searching "how to improve cash flow" are close to the buying decision. 5 independent competitors cover it. Strong lead-gen conversion: visitors looking for help with cash flow = warm accountancy prospects. Audience: SME directors, sole traders running 6-figure turnovers.
- Cannibalisation: none. Our cash-basis pages are about the HMRC accounting method election, not cash flow management.
- Priority: HIGH

**GAP-V2-2: Unique Taxpayer Reference (UTR) guide**
- Slug: `unique-taxpayer-reference-utr-uk`
- Cluster: [42] in analysis, 4 domains (a-wise, bytestart, countingup, crunch)
- Source slugs: what-is-a-unique-taxpayer-reference-utr, how-to-find-and-use-your-company-utr-number
- Gap confirmed: no UTR page in inventory.
- Rationale: "What is a UTR number" and "how to find my UTR" are very high volume, top-of-funnel queries for anyone starting a business or filing their first tax return. These visitors are early in the accountancy buyer journey. The topic is evergreen, authoritative, and directly signals someone who will soon need accountancy help. 4 competitors independently have this. Simple page to build but delivers consistent top-of-funnel traffic.
- Cannibalisation: none.
- Priority: HIGH

**GAP-V2-3: Business bank account guide (separate account for SME)**
- Slug: `do-i-need-a-separate-business-bank-account-uk`
- Cluster: [12] in analysis, 5 domains (businessaccountingbasics, bytestart, crunch, informi, perrysaccountants)
- Source slugs: separate-business-bank-account, do-you-need-a-separate-bank-account-for-your-business
- Gap confirmed: no business bank account page in inventory.
- Rationale: "Do I need a business bank account as a sole trader" is a persistent SME query. 5 competitors cover it. It sits at the start of the business journey and signals someone who is newly trading -- the exact profile that needs an accountant. It naturally links to our sole trader and limited company pages. Short page, high top-of-funnel value.
- Cannibalisation: none.
- Priority: HIGH

**GAP-V2-4: VAT return filing guide (how to complete and submit)**
- Slug: `how-to-complete-and-submit-vat-return-uk`
- Cluster: [49] in analysis, 3 domains (crunch, informi, sandbaccountants)
- Source slugs: vat-return-boxes-explained, what-is-a-vat-return-and-how-to-submit-yours-via-mtd
- Gap confirmed: we have vat-flat-rate-scheme-explained, vat-threshold-2025-26, flat-rate-vat-vs-standard-vat, vat-calculation-calculator -- but no "how to complete and submit a VAT return" guide. These are different: threshold and flat-rate are structural decisions; the return guide is operational (what goes in each box, how to submit via MTD).
- Rationale: Every VAT-registered business has to submit returns quarterly. "VAT return boxes explained" and "how to submit a VAT return" are recurring operational queries. 3 competitors have this. The page naturally leads to our VAT accountant service pages. Clear commercial intent for businesses who struggle with this.
- Cannibalisation: low -- our existing VAT pages are about registration thresholds and scheme choice, not return completion.
- Priority: HIGH

**GAP-V2-5: Balance sheet explained (UK SME guide)**
- Slug: `what-is-a-balance-sheet-uk-sme`
- Cluster: [27] in analysis, 4 domains (a-wise, businessaccountingbasics, countingup, informi)
- Source slugs: what-is-a-balance-sheet-and-how-do-you-read-one, balance-sheet
- Gap confirmed: no balance sheet page in inventory. We have trial-balance-abbreviated-accounts and prepare-trial-balance-limited-company-abbreviated-accounts -- but a trial balance is not a balance sheet.
- Rationale: "What is a balance sheet" is a foundational SME query. Business owners who need to understand their balance sheet are actively engaging with their accounts -- prime accountant prospect. 4 competitors have this. Foundational content that builds topical authority around accounts and bookkeeping. Leads naturally to our accounts preparation pages.
- Cannibalisation: trial balance pages are distinct (working document, not published accounts).
- Priority: HIGH

**GAP-V2-6: Year-end accounting checklist**
- NOTE: This was GAP-5 in v1. Including here as it was not built and remains a gap. Do not count as new.
- Confirmed still absent from inventory.

### TIER 2 -- Medium priority, clear SME fit, 3-4 domain signal

**GAP-V2-7: Partnership formation and partnership agreement**
- Slug: `how-to-set-up-a-business-partnership-uk`
- Cluster: [22] and [43] in analysis, 4 domains each (businessaccountingbasics, countingup, crunch, informi for setup; a-wise, countingup, crunch, informi for partnership business)
- Source slugs: setting-up-a-partnership, setting-up-a-partnership-why-you-need-a-partnership-agreement, what-business-partnership
- Gap confirmed: we have limited-company-vs-sole-trader pages but no partnership formation guide.
- Rationale: Partnership is the third main business structure after sole trader and limited company. We have extensive limited company and sole trader content but nothing on partnerships (other than LLP mentions in structure comparison). 4 competitors independently have this. SME audience: people considering going into business with a partner.
- Cannibalisation: none. Our structure pages are sole-trader-vs-limited only.
- Priority: MEDIUM

**GAP-V2-8: Christmas party tax exemption (employer guide)**
- Slug: `christmas-party-tax-rules-limited-company-uk`
- Cluster: [54] in analysis, 3 domains (bytestart, crunch, perrysaccountants)
- Source slugs: christmas-party-expense-exemption-for-limited-companies, christmas-party-tax-rules, claim-christmas-party-business-expense
- Gap confirmed: no Christmas party page in inventory.
- Rationale: Seasonal perennial. Every November/December, directors search this. We have p11d-benefits-in-kind-explained (covers it tangentially) but no dedicated page. Low word count needed, high traffic spike in Q4. 3 competitors have it. Also covers the annual staff events exemption more broadly.
- Cannibalisation: p11d page covers P11D form broadly; Christmas party exemption (the 150/head rule) is a specific sub-topic. Low risk.
- Priority: MEDIUM (seasonal, build by September)

**GAP-V2-9: High income child benefit charge (for business owners)**
- Slug: `high-income-child-benefit-charge-business-owners-uk`
- Cluster: [55] in analysis, 3 domains (a-wise, crunch, perrysaccountants)
- Source slugs: high-income-child-benefit-charge, high-income-child-benefit
- Gap confirmed: no HICBC page in inventory.
- Rationale: HICBC is a common trap for director-shareholders who draw salary and dividends. The income threshold affects many SME owner-managers. 3 competitors have this. The topic specifically targets our core audience (limited company directors), not employed individuals. Strong audience fit: a director whose income crosses the threshold needs an accountant to restructure drawings or file correctly.
- Cannibalisation: no existing page.
- Priority: MEDIUM

**GAP-V2-10: Corporation tax paying early and in instalments**
- Slug: `corporation-tax-paying-early-or-in-instalments-uk`
- Cluster: [44] in analysis, 4 domains (a-wise, crunch, informi, perrysaccountants)
- Source slugs: what-are-the-benefits-of-paying-corporation-tax-early, corporation-tax-paying-in-instalments, corporation-tax-deadlines-filing-and-paying
- Gap confirmed: we have corporation-tax-deadline-31-march-2026 (date-stamped, likely stale) but nothing on early payment benefits or instalment payments.
- Rationale: Larger SMEs paying corporation tax in instalments, and directors trying to reduce the interest cost by paying early, are a valuable audience (higher turnover companies). 4 competitors independently have this. Evergreen topic.
- Cannibalisation: our deadline page is about the filing deadline, not payment strategy. Low risk.
- Priority: MEDIUM

**GAP-V2-11: Double-entry bookkeeping explained**
- Slug: `double-entry-bookkeeping-explained-uk`
- Cluster: [34] in analysis, 4 domains (a-wise, businessaccountingbasics, countingup, informi)
- Source slugs: double-entry-bookkeeping, what-is-double-entry-bookkeeping
- Gap confirmed: no bookkeeping fundamentals page in inventory. We have bookkeeping-records-limited-company-6-years (record retention) but not bookkeeping concepts.
- Rationale: "What is double-entry bookkeeping" is a persistent search from business owners who are confused about their accounts. It positions us as the knowledgeable authority for someone who is realising they need help with their books. Owner is cost-conscious -- this is a short foundational page that punches above its size for topical authority.
- Cannibalisation: none.
- Priority: MEDIUM (lower than Tier 1 -- more generic, slightly lower conversion intent)

**GAP-V2-12: Late payment guidance for UK businesses**
- Slug: `late-payment-rules-small-business-uk`
- Cluster: [60] in analysis, 3 domains (countingup, crunch, informi)
- Source slugs: late-payment-reminder-templates, late-payment-is-the-problem-getting-better-or-worse-for-uk-smes
- Gap confirmed: no late payment page in inventory.
- Rationale: Late payment is a major cashflow pain point for SMEs. An accountant who helps with cashflow and credit control is positioned as the solution. 3 competitors cover it. Connects to our cashflow page (GAP-V2-1). Build these two together as a cash management cluster.
- Cannibalisation: none.
- Priority: MEDIUM

### TIER 3 -- Watch list (lower conversion, or too generic)

**Starting a business cluster** (cluster [1], 6 domains, 76 slugs): Very high volume but highly competitive (bytestart, crunch, informi, gov.uk all dominate). Starting-a-business content is costly to rank for as a small firm vs established resources. The topics are also generic. Only build if GSC data shows this working for us. Skip for now.

**Side hustle / make money online** (clusters [30], [48]): Not SME accountancy audience. These are consumer/influencer queries. We have accountant-for-influencers-uk and similar -- improving those is better than net-new pages here.

**Business insurance cluster** (clusters [31], [36], [38]): Insurance is outside the accountancy scope for Holloway Davies. Not a lead-gen topic for them.

**Covid / SEISS content** (cluster [25]): Stale. Any surviving searches are legacy. Skip.

**Business plan** (cluster [3]): Generic business advice, very competitive (Prince's Trust, Lloyds templates dominate). Not accountancy-specific enough to convert to leads.

**Companies House ID verification changes** (cluster [11]): Timely not evergreen. Covered better by ICAEW/AccountingWEB who we can't outrank. Skip.

**Sole trader insurance / employers liability** (clusters [19] item: employers-liability-insurance-sole-trader): Single items in the cluster, tangential to accounting.

---

## Honest count summary (v2)

| Stage | Count |
|-------|-------|
| Competitor domains curated | 12 (9 with sitemap data, 3 WAF-blocked) |
| Total content URLs crawled | 3,849 |
| First-cut gap candidates | 2,694 |
| Jaccard < 0.30 survivors | 2,842 |
| Clusters formed | 1,589 |
| Clusters judged (top 60 reviewed) | 60 |
| Recommended net-new Tier 1 | 5 topics (GAP-V2-1 to GAP-V2-5) |
| Recommended net-new Tier 2 | 6 topics (GAP-V2-7 to GAP-V2-12) |
| Watch/reject | remaining clusters |

Note: GAP-V2-6 (year-end checklist) is a carry-over from v1 GAP-5. Not counted as new.

---

## Next actions

1. Build Tier 1 topics first (GAP-V2-1 to GAP-V2-5) -- 5 pages, high signal, clear gaps.
2. Retry theaccountancy.co.uk, accountsandlegal.co.uk, dnsassociates.co.uk with alternative user agents or direct sitemap URLs -- all three have confirmed post-sitemaps, just WAF-blocked at crawl time. Adding them will strengthen cluster signal.
3. Tier 2 topics are lower priority given cost-conscious owner; build when Tier 1 pages are indexed.

---

## v1 note (2026-07-08 original run)

The v1 analysis (same date, earlier in session) found only 1 genuine competitor domain (pulse-accountants.co.uk) from a 8-domain universe, all others being software vendors, Indian education sites, or news stubs. From that single source, v1 proposed 8 topics: benefit-in-kind company cars, BIK cluster (health insurance/mobile/fuel), HMRC enquiry guide, VAT on hospitality/food, year-end accounting checklist, land remediation relief, 3PL logistics accountants, and private healthcare accountants. All 8 are valid and not cannibalised by the v2 proposals above. The v1 note recommended rebuilding the competitor universe -- this v2 analysis is that rebuild.
