# Bing Read + SERP Feature Diff - www.medicalaccounts.co.uk

**DATA-TRUST HEADER**: Bing snapshots 2026-06-03 to 2026-07-06 (rolling trailing-window aggregates by design; matched-window comparisons only; no pre-May Bing data exists). GSC data 2026-04-01 to 2026-07-04. Google Serper API: ALL queries returned 400 "Not enough credits" - zero Google organic positions available from live probe; Google positions proxied via GSC weighted-average. Absolute counts shown throughout; rates suppressed where denominator below 20.

## 1. Bing Volume Trajectory

Four BWT snapshots exist (each a rolling trailing-window aggregate, not cumulative):

| Snapshot | Impressions | Clicks | CTR | Queries | Pages | Wt. Avg Position |
|---|---|---|---|---|---|---|
| 2026-06-03 | 142 | 15 | 10.6% (n=142) | 117 | 12 | 5.6 |
| 2026-06-12 | 286 | 25 | 8.7% (n=286) | 219 | 17 | 5.3 |
| 2026-06-24 | 520 | 47 | 9.0% (n=520) | 397 | 25 | 5.4 |
| 2026-07-06 | 706 | 70 | 9.9% (n=706) | 537 | 38 | 5.3 |

**Matched-window comparison (06-03 vs 07-06, 33-day span):**
- Impressions: +397% (142 to 706)
- Clicks: +367% (15 to 70)
- Queries: +359% (117 to 537)
- Pages with impressions: +217% (12 to 38)
- Weighted average position: -0.3 (5.6 to 5.3, slight improvement)

**Interpretation**: Growth is overwhelmingly breadth-driven. Position stays stable at 5.3-5.6 across all snapshots while pages expand from 12 to 38. New pages enter Bing at the same organic depth as established pages, meaning Bing is continuously indexing and surfacing new content at equivalent quality. This is NOT a position improvement story - it is a coverage expansion story.

**Distinct pages ever appearing in bing_query_data**: 38 pages. Cross-check: B3 index_coverage.json will reconcile this against the 73 IndexNow-submitted URLs (submitted 2026-06-03, accepted 202).

## 2. Top 15 Queries (2026-07-06 snapshot)

All queries from the latest trailing window. Maximum impressions per query: 6. All are long-tail informational queries. Zero commercial head terms appear in the top 15.

| Rank | Query | Impressions | Clicks | CTR | Avg Pos | Page |
|---|---|---|---|---|---|---|
| 1 | what are income tax allowances on nhs pension | 6 | 0 | 0% | 9.0 | nhs-pension-annual-allowance-complete-guide |
| 2 | locum a form gp | 6 | 0 | 0% | 8.0 | nhs-pension-for-locums-form-a-form-b |
| 3 | how to find out more about gp partnership as a prospective gp partner uk | 5 | 1 | 20% (n=5) | 10.0 | becoming-gp-partner-financial-implications |
| 4 | pension contribution gp | 4 | 0 | 0% | 3.0 | gp-pension-contributions-tax-relief |
| 5 | optimising my gp nhs pension | 4 | 0 | 0% | 6.0 | gp-pension-contributions-tax-relief |
| 6 | gp locum form a 2026 | 4 | 0 | 0% | 6.0 | nhs-pension-for-locums-form-a-form-b |
| 7 | gp locum a form april 2026 | 4 | 0 | 0% | 5.0 | nhs-pension-for-locums-form-a-form-b |
| 8 | nhs pensions and no pension input amount | 3 | 1 | 33% (n=3, below suppression, indicative) | 8.0 | nhs-pension-annual-allowance-complete-guide |
| 9 | can i claim income protection insurance on tax return locum gp | 3 | 0 | 0% | 2.0 | locum-doctor-tax-complete-guide |
| 10 | gmc fees 2026 | 3 | 0 | 0% | 5.0 | gp-tax-deductions-complete-list-2026 |
| 11 | does the annual allowance for pension apply to capitalisation cost in nhs? | 3 | 0 | 0% | 10.0 | nhs-pension-annual-allowance-complete-guide |
| 12 | locum a form approval practice | 3 | 0 | 0% | 8.0 | nhs-pension-for-locums-form-a-form-b |
| 13 | lcoum form a 2026/2027 [sic] | 3 | 0 | 0% | 5.0 | nhs-pension-for-locums-form-a-form-b |
| 14 | locum b form 2026 | 3 | 0 | 0% | 6.0 | nhs-pension-for-locums-form-a-form-b |
| 15 | locum form b | 3 | 0 | 0% | 3.0 | nhs-pension-for-locums-form-a-form-b |

Note: CTR rates for rows 8-15 (denominator 3-4) are below the suppression floor of 20; shown as indicative only.

## 3. Top 15 Pages (2026-07-06 snapshot)

6 pages account for 89% of all Bing impressions (629 of 706):

| Rank | Page slug | Impressions | Clicks | CTR | Queries | Imp share |
|---|---|---|---|---|---|---|
| 1 | nhs-pension-for-locums-form-a-form-b | 153 | 7 | 4.6% (n=153) | 100 | 21.7% |
| 2 | nhs-pension-annual-allowance-complete-guide | 100 | 9 | 9.0% (n=100) | 70 | 14.2% |
| 3 | gp-partner-vs-salaried-gp-tax-comparison | 88 | 13 | 14.8% (n=88) | 76 | 12.5% |
| 4 | gp-tax-deductions-complete-list-2026 | 80 | 6 | 7.5% (n=80) | 65 | 11.3% |
| 5 | gp-pension-contributions-tax-relief | 66 | 3 | 4.5% (n=66) | 51 | 9.3% |
| 6 | gp-vat-registration | 62 | 5 | 8.1% (n=62) | 57 | 8.8% |
| 7 | locum-doctor-tax-complete-guide | 27 | 3 | 11.1% (n=27) | 24 | 3.8% |
| 8 | medical-guides/ir35-for-locums | 22 | 3 | 13.6% (n=22) | 16 | 3.1% |
| 9 | locum-tax | 15 | 2 | 13.3% (n=15) | 13 | 2.1% |
| 10 | pcn-funding-network-contract-des-explained | 11 | 3 | 27.3% (n=11) | 8 | 1.6% |
| 11 | gp-partnership-tax-complete-guide | 10 | 1 | 10.0% (n=10) | 10 | 1.4% |
| 12 | qof-income-gp-practice-accounting-explained | 8 | 3 | 37.5% (n=8) | 6 | 1.1% |
| 13 | locum-doctor-expenses-what-you-can-claim | 6 | 1 | 16.7% (n=6) | 6 | 0.8% |
| 14 | medical-expenses | 6 | 0 | 0% | 2 | 0.8% |
| 15 | becoming-gp-partner-financial-implications | 5 | 1 | 20.0% (n=5) | 1 | 0.7% |

Note: CTR rates where n less than 20 (rows 9-15) are below the suppression floor; shown indicative only.

All top 6 pages have 50+ distinct queries each - deep long-tail coverage. The leading page (form A/B) drives 100 unique queries with only 7 clicks from 153 impressions: high breadth but low conversion-signal queries (admin/compliance queries, not "hire an accountant" intent).

## 4. Google vs Bing SERP Feature Diff

### 4a. Google Serper: HARD ERROR

All 12 head queries returned HTTP 400 "Not enough credits". This is a hard failure; zero Google organic position data from live SERP probes. The idempotency key was NOT written (request failed before recording), so retry is available as soon as credits are replenished.

**Google positions are proxied from GSC data** (gsc_query_data, 2026-04-01 to 2026-07-04):

| Query | GSC Impressions | GSC Clicks | GSC Weighted Position | Inference |
|---|---|---|---|---|
| gp accountants | 1311 | 0 | 54.0 | Google page 6, invisible |
| medical accountants uk | 214 | 0 | 69.1 | Google page 7, invisible |
| gp practice accountants | 130 | 0 | 82.0 | Google page 9, invisible |
| gp accountant | 91 | 0 | 61.1 | Google page 7, invisible |
| specialist medical accountants | 65 | 0 | 79.2 | Google page 8, invisible |
| medical accountants | 21 | 0 | 76.9 | Google page 8, invisible |
| accounting for gp partners | 20 | 0 | n/a | Not in GSC head-term data |
| accountants for doctors | 0 | 0 | n/a | No GSC impressions |
| locum accountant | 0 | 0 | n/a | No GSC impressions |
| accounting specialists for medical professionals | 0 | 0 | n/a | No GSC impressions |
| gp accounts specialists | 16 | 0 | n/a | Not in GSC head-term data |
| accountants for nhs doctors | 12 | 0 | n/a | Not in GSC head-term data |

All head terms: zero clicks on Google despite thousands of impressions. Site exists in Google's index for these terms at positions 54-82, well below page 1.

### 4b. Bing/DDG SERP Results

| Query | Our Bing/DDG Position | Top 5 Domains (Bing organic/paid) |
|---|---|---|
| gp accountants | **8** | hawsons.co.uk, dma-accountancyservices.co.uk, shipleysaccounting.com, gpaccountant.com, find-and-update.company-information.service.gov.uk |
| medical accountants uk | **6** | bing.com (ads x4), then organic; our position 6 in wider set |
| gp practice accountants | not in top 10 | bw-medical.co.uk, nicholsmedical.co.uk (x2), gondalaccountancy.co.uk, hilldean.com |
| specialist medical accountants | not in top 10 | sandisoneasson.co.uk, yorkshiremedicalaccountants.co.uk, bma.org.uk, medicsmoney.co.uk, aisma.org.uk |
| accountants for doctors | not in top 10 | accountants4nhsdoctors.co.uk, contractor-accountants.org.uk, jasondingcpa.com, fyple.co.uk, lorennancke.com |
| locum accountant | **8** | auditox-accountancy.uk, goforma.com, theaccountancy.co.uk, nicholsmedical.co.uk, pharmacistaccountants.co.uk |
| gp accountant | not in top 10 | accountantsbook.co.uk, medicalaccountant.ie, jcssutton.co.uk, stableexpress.co.uk, meetanaccountant.com |
| accounting specialists for medical professionals | not in top 10 | bing.com (ads x4), medicsmoney.co.uk |
| medical accountants | not in top 10 | bing.com (ads x4), then organic |
| accounting for gp partners | not in top 10 | larking-gowen.co.uk, practicebusiness.co.uk (x2), ballardsllp.com, managementinpractice.com |
| gp accounts specialists | not in top 10 | r-m-t.co.uk, diamondaccounts.co.uk, sial-accountants.co.uk, sandisoneasson.co.uk, accountsfordoctors.com |
| accountants for nhs doctors | not in top 10 | accountants4nhsdoctors.co.uk, medicsmoney.co.uk (x2), taxaccountant.co.uk, lanop.co.uk |

**Answer features on Bing** (via DDG proxy): No AI Overview / answer box / knowledge panel signals were extractable via DDG for these queries. Note: DDG is a proxy for Bing organic ranking and does not surface Bing Copilot/AI answer features. Google answer features unavailable (Serper error).

**Commercial head term competition**: Three queries ("medical accountants uk", "medical accountants", "accounting specialists for medical professionals") show bing.com ad-redirect URLs dominating the top 4-5 positions - the commercial head terms are heavily monetised on Bing. This suppresses organic opportunity but explains why positions 6-10 can still generate clicks.

## 5. Why Bing Outperforms Google: Verdict

Three mechanisms are at work, in confidence-ranked order:

### Mechanism 1: Index Coverage Asymmetry (highest confidence)

Bing has confirmed Bing-query-data entries for 38 distinct pages as of 2026-07-06. Google, by contrast, shows symptoms of near-zero page indexing for medical: Phase 2 smoke test (4 out of 4 non-homepage core pages sampled = "URL is unknown to Google"). B3 index_coverage sweep will confirm, but if this generalises, Google has indexed fewer than 10 pages versus Bing's 38.

The phantom-canonical event (46 legacy posts pointing at unregistered medicalaccountantsuk.co.uk until 2026-06-17) is the likely cause: Google likely attempted to follow canonicals to a DNS hole and consolidated or dropped coverage. Bing appears less aggressive at enforcing canonical consolidation, so it indexed content independently.

This is the single largest driver of Bing outperformance. It is not a content quality gap - it is a technical indexing failure specific to Google.

### Mechanism 2: Authority/E-E-A-T Threshold Asymmetry (high confidence)

Google applies YMYL (Your Money Your Life) and E-E-A-T quality signals to financial/tax/medical content. For a young site (zero Google impressions before 2026-04-01) with no named expert credentials, no third-party inlinks, and no AISMA membership, Google's ranking algorithm places it at positions 54-82 behind established chartered firms (sandisoneasson, nicholsmedical, hawsons, r-m-t) even where content is relevant.

Bing's algorithm weights keyword relevance and content specificity more directly at this stage. The site's focused, specific content (locum Form A/B, NHS pension annual allowance, GP partner vs salaried comparison) achieves position 5-9 on Bing for long-tail queries and positions 6-8 on two head terms - without needing ICAEW/AISMA validation.

Competitive Bing landscape: Top 5 Bing organic spots for head terms are held by firms with 10-25 years of established domain history (sandisoneasson.co.uk dates from 2003 per BMA listing, r-m-t.co.uk has published AISMA statistics for over a decade). We appear at position 6-8 on "gp accountants" and "locum accountant" despite this.

### Mechanism 3: Bing's Blog-Content Discovery Speed (medium confidence)

Bing indexed 12 pages in the first available snapshot (2026-06-03) - the same date as the IndexNow submission (73 URLs, accepted 202). By 07-06, 38 pages have query-level data. The 33-day growth curve (12 to 38) suggests steady BWT discovery without requiring editorial link authority to trigger indexing. Google's discovery path appears blocked (phantom-canonical, unknown-to-Google status on core service pages) while Bing's followed the IndexNow submission path.

### Feature Asymmetry: Not a Material Driver

Google answer features (AI Overview, knowledge panel) cannot be confirmed without Serper credits. However, the GSC evidence (1311 impressions, zero clicks, position 54 for "gp accountants") indicates the site is not appearing in any Google answer feature either - it is simply buried in organic results page 6+. Bing Copilot/AI answer features are not observable via DDG proxy. The feature gap is real but secondary to the indexing gap.

### Summary Table

| Factor | Bing | Google (proxied via GSC) | Gap Direction |
|---|---|---|---|
| Pages with query data | 38 confirmed | ~8 in GSC query data (10-week period) | Bing 4-5x wider coverage |
| Head term positions | 6-8 on 3/12 | 54-82 on 6/12 (zero clicks) | Bing 7-10 positions better |
| Long-tail blog positions | 2-10 on NHS pension/locum queries | Unknown (not in GSC query data) | Bing wins by default |
| Total clicks in window | 70 (33-day trailing) | ~0 from head terms (all clicks from blog long-tail) | Bing wins on head |
| Weighted avg position | 5.3 | N/A (not comparable, different query sets) | - |

**Core verdict**: Bing outperforms Google for medical primarily because Google has FAILED TO INDEX the site adequately (phantom-canonical DNS hole blocked Google's canonical consolidation), not because the content is better optimised for Bing. Fix the indexing, submit the sitemap via GSC, and Google positions would be expected to improve on long-tail blog queries. Head commercial terms (gp accountants, specialist medical accountants) require authority-building beyond what content alone can deliver on Google; Bing currently bridges that gap with keyword-relevance scoring.

## 6. GetPageStats Optional Call

Skipped. The BWT `GetPageStats` + `GetPageQueryStats` cycle has already been run and data is stored in `bing_query_data`. Calling `GetPageStats` again would duplicate already-persisted data. Distinct page count (38) is derived directly from `bing_query_data`. B3 (index_coverage sweep) provides per-URL Bing indexed status as the appropriate cross-check.

## 7. Artifacts

- `.cache/medical_diag/bing_segments.json` - snapshot totals, matched-window delta, top 15 queries, top 15 pages
- `.cache/medical_diag/serp_headqueries.json` - DDG/Bing positions for 12 head queries, Serper error record, GSC proxy positions
- This file: `docs/medical/bing_read.md`
