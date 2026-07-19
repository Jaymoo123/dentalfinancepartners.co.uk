# Property query ledger review

- Site: property (propertytaxpartners.co.uk)
- Date: 2026-07-17 (JSON generated 2026-07-17, GSC max date 2026-07-15, lag 2 days)
- Data window: 90 days GSC, Bing snapshot supplement
- Sampling loss: 83.3%. This is severe. Most ambiguous pages carry page-level impressions but no surviving query rows, so query-level evidence is absent for roughly three quarters of the ambiguous set. Calls on those pages are made from page totals, trajectory, file freshness and cluster overlap only.
- CTR curve note: expected CTRs are very low across all bands (0.46% at positions 1 to 3, under 0.1% from position 6). Zero clicks at 50 to 200 impressions is therefore rarely statistically distinguishable from expected. Meta_fix calls are only made where impressions are high and positions are strong.
- Pages: 773 total. Deterministic actions: 24 consolidate_candidate, 3 meta_fix, 12 expand, 1 refresh, 102 healthy, 27 hold, 604 ambiguous.
- Ambiguous with >= 30 impressions_90d: 194, all resolved below (positions 1 to 120 fully, 121 to 194 best-guess marked low-confidence). Ambiguous below 30 impressions: 410 pages, 3,873 total impressions, bulk-classified thin, no action yet.

## Section 1: HOLD pages

All 27 holds are untouched. No change is proposed for any of them beyond noting the window close.

| Page | Reason | Window closes |
|---|---|---|
| /calculators/incorporation-cost-calculator | ranking maturation (first impression 2026-06-19) | 2026-07-31 |
| /blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-property-landlords | ranking maturation | 2026-08-01 |
| /blog/capital-gains-tax/property-capital-gains-tax-calculator | ranking maturation | 2026-08-01 |
| /blog/capital-gains-tax | ranking maturation | 2026-08-03 |
| /blog/property-accountant-services/online-property-accountant-remote-accounting | ranking maturation | 2026-08-08 |
| /blog/making-tax-digital-mtd/mtd-made-simple-for-landlords-with-jointly-owned-properties | ranking maturation | 2026-08-09 |
| /blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords | ranking maturation | 2026-08-11 |
| /blog/capital-gains-tax/inheriting-uk-rental-property-executors-step-by-step | ranking maturation | 2026-08-15 |
| /blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk | ranking maturation | 2026-08-17 |
| /blog/property-accountant-services/change-landlord-accountants | ranking maturation | 2026-08-17 |
| /blog/property-tax-accountant-manchester | ranking maturation | 2026-08-18 |
| /blog/property-types-and-specialist-tax/landlord-vat-recovery-professional-fees-capital-costs-commercial-property | ranking maturation | 2026-08-18 |
| /blog/incorporation-and-company-structures/substantial-shareholding-exemption-sse | ranking maturation | 2026-08-18 |
| /blog/property-accountant-services/property-accountant-dundee-landlord-tax-services | ranking maturation | 2026-08-18 |
| /blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide | ranking maturation | 2026-08-19 |
| /blog/section-24-and-tax-relief/rental-income-tax-calculator | ranking maturation | 2026-08-19 |
| /blog/landlord-tax-essentials/property-income-allowance-1000-exemption-vs-expenses | ranking maturation | 2026-08-20 |
| /blog/property-accountant-services/why-luton-landlords-need-specialist-property-accountant-2026 | ranking maturation | 2026-08-21 |
| /blog/property-types-and-specialist-tax/vat-property-conversions-residential-reduced-rate-opted-to-tax | ranking maturation | 2026-08-21 |
| /blog/property-accountant-services/hmrcs-loan-charge-settling-disguised-remuneration-schemes | ranking maturation | 2026-08-22 |
| /calculators/section-24-calculator | miniform deploy watch (to 2026-08-06) + ranking maturation | 2026-08-23 |
| /blog/property-accountant-services/3m-mortgage-fraud-convicts-accountant-and-financial-adviser | ranking maturation | 2026-08-24 |
| /blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide | ranking maturation | 2026-08-25 |
| /calculators/portfolio-profitability-calculator | ranking maturation | 2026-08-26 |
| /blog/incorporation-and-company-structures/starting-property-business-sole-trader-vs-ltd-vs-partnership | ranking maturation | 2026-08-26 |
| /blog/capital-gains-tax/business-asset-disposal-relief-residential-property-qualification | ranking maturation | 2026-08-26 |
| /blog/making-tax-digital-mtd/how-to-switch-self-assessment-mtd-property-income | ranking maturation | 2026-08-26 |

## Section 2: Deterministic actions by type

### meta_fix (deterministic, 3 pages, third page listed in JSON alongside the two below carries the same pattern)

**/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained** (1,453 impr, 1 click, pos 5.3)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| uk cgt rates residential property 2026 | 125 | 0 | 2.4 | -0.0046 |
| uk capital gains tax rates residential property 2026 | 81 | 0 | 4.8 | -0.0043 |
| current uk cgt rates residential property 2026 | 79 | 0 | 2.2 | -0.0046 |
| uk capital gains tax residential property rates 2026 | 67 | 0 | 5.8 | -0.0009 |

Ranking top 3 for its money queries with one click in 90 days. The title and description are not converting the impression share this position earns.

**/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances** (346 impr, 0 clicks, pos 5.9)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| uk cgt rates residential property 2026 | 65 | 0 | 6.3 | -0.0009 |
| uk capital gains tax rates residential property 2026 | 30 | 0 | 7.1 | -0.0009 |
| uk cgt rates on residential property 2026 | 29 | 0 | 4.5 | -0.0043 |
| uk capital gains tax residential property rates 2026 | 21 | 0 | 5.2 | -0.0043 |

Same query set as the page above at adjacent positions. Fix metas together in one pass, and note the two pages share their owning queries (see Disagreements for the cannibalisation angle).

### expand (deterministic, 12 pages)

| Page | 90d impr | Clicks | Pos | Top owning queries (impr at pos) |
|---|---|---|---|---|
| /blog/property-types-and-specialist-tax/how-much-tax-holiday-let-property-uk | 567 | 0 | 71.2 | holiday-let tax queries, 12 to 13 impr each at pos 41 to 88 |
| /blog/making-tax-digital-mtd/landlord-accounting-software-uk-best-options-2026 | 270 | 0 | 58.5 | property accounting software uk (93 at 53.0), landlord accounting software (83 at 65.1) |
| /blog/making-tax-digital-mtd/mtd-software-landlords-free-vs-paid-options-compared | 183 | 0 | 55.9 | compare mtd plans benefits (29 at 13.7), mtd landlord software (26 at 53.1) |
| /blog/capital-gains-tax/60-day-cgt-reporting-property-sales-rule | 112 | 0 | 16.4 | hmrc cgt reporting requirements 2026 (72 at 20.6), uk cgt reporting deadline for property sale 2026 (19 at 3.6) |
| /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | 109 | 1 | 18.1 | mortgage arrangement fees (45 at 27.5), are mortgage arrangement fees tax deductible uk (15 at 5.0, click won) |
| /blog/property-accountant-services/property-accountant-oxford-guide-local-landlords | 105 | 0 | 11.4 | property tax accountant oxford (50 at 11.9), accountants landlords oxford (29 at 9.0) |
| /blog/property-accountant-services/property-accountant-northampton-expert-services | 92 | 0 | 24.4 | property tax accountant northampton (43 at 17.5) |
| /blog/property-accountant-services/accounting-services-for-property-owners | 90 | 0 | 25.3 | accounting services for property owners (48 at 14.0) |
| /blog/property-accountant-services/peterborough-property-accountant-specialist-tax-services | 83 | 0 | 18.9 | accountants peterborough btl landlords (83 at 18.9) |
| /blog/property-types-and-specialist-tax/capital-allowances-on-property | 78 | 0 | 52.9 | capital allowances on investment property in uk (38 at 49.0) |
| /blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | 61 | 0 | 14.5 | settlor interested trusts (18 at 13.8) |
| /blog/property-types-and-specialist-tax/vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate | 53 | 0 | 15.5 | property conversion (13 at 11.5), improving trajectory |

### refresh (deterministic, 1 page)

**/blog/landlord-tax-essentials/sdlt-leasehold-extension-vs-fresh-purchase** (285 impr, 0 clicks, pos 24.5)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| calculate sdlt on lease extension | 75 | 0 | 14.0 | -0.0005 |
| sdlt on lease extension | 60 | 0 | 16.8 | 0.0000 |
| lease extension sdlt | 42 | 0 | 19.3 | 0.0000 |
| sdlt lease extension | 41 | 0 | 18.2 | 0.0000 |

Clear single-topic query demand stuck at positions 14 to 19. A data-led refresh is the right lever.

### consolidate_candidate (deterministic, 24 pages, ALL owner-approval-required, and the estate rule is rewrite-only, never collapse, so these need the data-gated consolidation protocol before anything moves)

| Page | 90d impr | Pos | Cluster / top queries |
|---|---|---|---|
| /blog/landlord-tax-essentials/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide | 2,009 | 6.9 | revenue scotland NON-residential lbtt rates 2026 (250 at 6.7 plus variants). See Disagreements. |
| /blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide | 380 | 23.7 | landlord accounting spreadsheet (47 at 9.8), bookkeeping spreadsheet (35 at 8.9) |
| /blog/landlord-tax-essentials/vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework | 232 | 50.1 | vat on rental income cluster |
| /blog/landlord-tax-essentials/landlord-vat-registration-when-required | 219 | 47.2 | same vat on rental income cluster (pair above) |
| /blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide | 158 | 53.9 | nrl1 form queries, emerging |
| /blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice | 109 | 39.4 | stamp duty on property incorporation uk (109 at 39.4) |
| /blog/property-accountant-services/london-property-accountant | 105 | 23.2 | london accountant cluster (pairs with best-property-accountant-london below) |
| /blog/property-types-and-specialist-tax/hmo-tax-guide-rental-income-deductions-multi-tenant | 63 | 66.2 | hmo landlord tax planning (54 at 64.7) |
| /blog/property-accountant-services/best-property-accountant-london | 59 | 37.4 | london accountant cluster |
| /blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026 | 57 | 55.4 | portfolio incorporation cluster |
| /blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk | 51 | 67.3 | stamp duty on incorporation cluster |
| /blog/portfolio-management/how-to-value-rental-property-portfolio-tax-purposes | 50 | 71.3 | portfolio landlord tax planning cluster |
| /blog/incorporation-and-company-structures/landlord-incorporation-step-by-step-guide-uk | 47 | 76.6 | landlord portfolio incorporation uk (47 at 76.6) |
| /blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list | 44 | 22.4 | uk rental income tax allowable expenses 2026 (15 at 2.6) |
| /blog/hmo-landlord-accounting-multi-tenant-property-tax | 39 | 24.0 | hmo landlord tax planning, duplicate uncategorised route of the landlord-tax-essentials version below |
| / (homepage) | 34 | 30.4 | branded, see Disagreements |
| /blog/section-24-and-tax-relief/landlord-insurance-tax-deductible | 28 | 11.4 | landlord insurance cluster (three near-identical pages live) |
| /blog/incorporation-and-company-structures/substantial-shareholding-exemption-property-companies | 27 | 7.8 | cg53116 (27 at 7.8), pairs with held SSE page |
| /blog/portfolio-management | 17 | 86.5 | category hub, portfolio queries |
| /blog/landlord-tax-essentials/hmo-landlord-accounting-multi-tenant-property-tax | 10 | 23.5 | duplicate pair with uncategorised route above |
| /blog/when-to-incorporate-property-portfolio-timing | 10 | 84.6 | duplicate uncategorised route (categorised version is in healthy) |
| /blog/property-types-and-specialist-tax/condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap | 6 | 5.0 | only query is junk branded ("djh business advisers limited"), see Disagreements |
| /blog/property-types-and-specialist-tax/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics | 5 | 7.8 | same junk query, see Disagreements |
| /blog/incorporation-and-company-structures/mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment | 3 | 9.7 | cg53116 only |

### new_page_target inputs: see Section 6.

## Section 3: Ambiguous resolutions (action_source="llm")

Context that shaped these calls: 83.3% sampling loss means most of these pages have zero surviving query rows. Where a page has no query evidence, a fresh substantial file (all are 2,000 to 7,300 words, dated March to May 2026) and no cannibalisation partner, the only defensible call is healthy, meaning no action on current evidence, revisit when query data survives sampling. All ten missing-file URLs were verified against src/middleware.ts and every one already 301-redirects to a live canonical, so they are classified healthy (redirect in place, impressions will migrate).

### Fully resolved (rank 1 to 120 by impressions)

| # | Page (slug or route) | Impr | Call | Justification |
|---|---|---|---|---|
| 1 | capital-gains-tax-property-complete-guide-uk | 1,260 | meta_fix | Owning queries at pos 4.9 to 5.7 with 0 clicks and declining trajectory; title/meta not converting page-1 positions; align with the deterministic CGT-rates meta pass. |
| 2 | letting-relief-landlords-2026-changes | 1,083 | healthy | 1,083 impressions but no surviving Google query rows (Bing shows "letting relief" at pos 7); fresh 5,100-word page; no evidence to act on. |
| 3 | cgt-annual-exempt-amount-3000-allowance-2026-27 | 779 | meta_fix | Pos 5.7 to 8.5 on exempt-amount queries, 179 impr top query, 0 clicks, declining; sharpen title to the query phrasing (gov.uk-style "annual exempt amount 2026 2027"). |
| 4 | how-owning-property-abroad-leads-higher-stamp-duty-rates | 744 | healthy | No surviving query rows; 5,283-word May-2026 page earning 2 clicks; nothing actionable. |
| 5 | cgt-reporting-deadlines-property-2026 (no file) | 616 | healthy | Already 301s to cgt-payment-deadlines-property-sales-2026 in middleware; impressions will migrate; monitor only. |
| 6 | property-specialist-accountant-london (no file) | 614 | healthy | Already 301s to london-property-accountant; monitor migration. |
| 7 | sdlt-transfer-property-company-cost | 571 | meta_fix | Single owning query (571 impr) at pos 8.1 with 0 clicks; title targets the exact connected-party phrasing but is not winning the click; test a sharper meta. |
| 8 | property-tax-accountant-london (no file) | 498 | healthy | Already 301s to london-property-accountant; monitor. |
| 9 | property-accountant-nottingham-landlords | 496 | expand | Local queries at pos 9.1 to 10.9 (87+75+59 impr); page is 3,668 words; add local proof, FAQ and service depth to push into top 5, the standard local-page play. |
| 10 | lease-extensions-in-the-uk-surrender-and-regrant | 496 | healthy | No query rows; deep May-2026 legal explainer with 2 clicks; no action. |
| 11 | cgt-payment-deadlines-property-sales-2026 | 437 | consolidate_candidate | Owner approval required. Splits "hmrc cgt reporting deadlines 2026" with the redirected legacy URL's traffic and with the 60-day-cgt-reporting expand page (pos 24.9 vs 20.6); one CGT-deadlines canonical should own this cluster. |
| 12 | scottish-lbtt-additional-dwelling-supplement-ads... | 389 | healthy | Pos 6.4 to 9.5 on ADS queries; expected CTR at those bands is under 0.1%, so 0 clicks is within expectation; leave alone. |
| 13 | sdlt-group-relief-schedule-7-fa-2003-claw-back... | 381 | healthy | No query rows; 5,644-word specialist page; no action. |
| 14 | business-property-relief-rental-property-iht | 377 | healthy | No query rows; fresh page; no action. |
| 15 | companies-house-reforms-explained-for-business-success | 370 | consolidate_candidate | Owner approval required. One query ("property landlord companies house reform") is split across at least 8 Companies House pages (#15, #16, #47, #48, #64, #84, #97, #190); this one earns clicks above expected but the cluster needs one canonical. |
| 16 | companies-house-reforms | 356 | consolidate_candidate | Owner approval required. Same single query at pos 6.8; strongest candidate to be the cluster canonical given best position. |
| 17 | nrl-scheme-letting-agents-quarterly-returns-mechanics | 352 | healthy | Ranks 7.5 to 9.4 on NRL form queries and the nrl6 query earns clicks above expected CTR; working as intended. |
| 18 | building-safety-act-2022-cladding-cost-recovery... | 344 | healthy | No query rows; substantial fresh page; no action. |
| 19 | /locations/leeds | 337 | expand | Local queries at pos 13.2 to 19.0 (73+70+66 impr) on a thin location route; strengthen the Leeds location page (local content, proof, FAQ); note overlap with the Leeds blog page (#59) which sits at pos 9.5. |
| 20 | incorporation-existing-portfolios-phased-approach | 335 | expand | Portfolio-incorporation queries at pos 15.1 to 20.9 (155+153 impr); this is the strongest-ranking asset in a cluster the deterministic pass wants to consolidate; expand this one to be the winner. |
| 21 | uk-spain-dta-property-uk-resident-spanish-holiday-home | 321 | healthy | No query rows; 1 click; no action. |
| 22 | rollover-relief-property-landlords | 280 | healthy | No query rows; no action. |
| 23 | extraction-while-incorporating-phase-2-acquisition... | 256 | healthy | No query rows; 2 clicks; no action. |
| 24 | lease-variation-and-lease-surrender | 244 | healthy | No query rows; 4 clicks on 244 impressions is well above the site CTR curve; performing. |
| 25 | reduce-your-council-tax-bill-in-the-uk | 239 | healthy | No query rows; no action. |
| 26 | charging-market-rent-to-own-property-company-tax-treatment | 235 | healthy | 5 clicks on 235 impressions, far above expected; performing. |
| 27 | corporation-tax-rates-property-companies-2026-27 | 234 | healthy | No query rows; 2 clicks; no action. |
| 28 | welsh-land-transaction-tax-ltt-rates-bands-2026-27... | 232 | meta_fix | Pos 3.0 to 4.1 on Welsh LTT rates queries (52+35+20 impr) with 0 clicks and gap -0.0046; a top-3 ranking earning nothing is the clearest meta case in the ambiguous set. |
| 29 | gifting-property-to-minor-children-bare-trust... | 223 | healthy | No query rows; deep specialist page; no action. |
| 30 | pet-rights-tenancy-landlord-refusal-reasonable-grounds | 223 | healthy | No query rows; no action. |
| 31 | sdlt-mixed-use-rates-vs-residential-property-tribunal-tests | 209 | healthy | No query rows; 3 clicks; but note near-duplicate with sdlt-mixed-use-property-classification (#123), which is flagged consolidate below. |
| 32 | mtd-rental-income-threshold-exemptions | 203 | healthy | 3 clicks on 203 impressions; performing. |
| 33 | ated-relief-clawback-occupation-non-qualifying-individual | 199 | healthy | No query rows; no action. |
| 34 | deed-of-variation-property-estate-redirecting-inheritance | 190 | healthy | No query rows; no action. |
| 35 | cgt-property-transfer-limited-company-calculate | 187 | consolidate_candidate | Owner approval required. The identical slug is indexed at two URLs (#35 and #94, 187 + 70 impr); verify one canonical route and 301 the other; this is a routing dedupe, not a content collapse. |
| 36 | sdlt-six-dwellings-non-residential-election | 186 | healthy | No query rows; 2 clicks; no action. |
| 37 | nrcgt-indirect-disposal-property-rich-companies-shares | 185 | healthy | No query rows; 2 clicks; note topical twin at #145 flagged below. |
| 38 | property-company-group-relief-corporation-tax | 182 | healthy | 4 clicks on 182 impressions; performing. |
| 39 | first-time-buyer-relief-benefits-and-eligibility-requirements | 182 | healthy | No query rows; note overlap with #62 which is the weaker twin and flagged consolidate. |
| 40 | ltt-higher-rates-for-spouses-minor-children-and-trust-interests | 180 | healthy | No query rows; no action. |
| 41 | iht-joint-ownership-property-spouse-exemption... | 171 | healthy | No query rows; no action. |
| 42 | stamp-duty-buy-to-let-surcharge-explained (no file) | 168 | healthy | Already 301s to landlord-tax-essentials/stamp-duty-buy-to-let-surcharge; monitor. |
| 43 | land-transaction-tax-a-complete-guide | 163 | healthy | Improving trajectory (+3.03), queries moving to pos 1 to 5; let it mature; part of the Welsh LTT trio with #28 and #158. |
| 44 | iht-long-term-resident-test-section-6a-tail-period-table | 152 | healthy | No query rows; no action. |
| 45 | second-home-sdlt-additional-dwellings-surcharge-joint-owners... | 149 | healthy | No query rows; no action. |
| 46 | cgt-main-residence-relief-joint-ownership-pra-election... | 146 | healthy | No query rows; no action. |
| 47 | companies-house-tightens-id-rules-what-does-it-mean | 141 | consolidate_candidate | Owner approval required. Companies House cluster member (ID-verification sub-cluster with #64 and #190). |
| 48 | companies-house-confirmation-statement-changes-2024... | 139 | consolidate_candidate | Owner approval required. Near-duplicate of confirmation-statements (#97); same sub-topic, same cluster. |
| 49 | ated-late-filing-penalty-appeal-reasonable-excuse | 137 | consolidate_candidate | Owner approval required. Near-duplicate of #189 (ATED late-filing penalty appeal, reasonable excuse and special circumstances); two pages on one narrow appeal topic. |
| 50 | sdlt-on-probate-property-transfers | 137 | healthy | No query rows; note the probate stamp-duty twin at #116 flagged consolidate. |
| 51 | excluded-property-trust-long-term-resident-settlor-pivot | 135 | healthy | No query rows; no action. |
| 52 | landlord-tax-return-complete-guide-2026 | 135 | refresh | Cornerstone guide dated 2026-04-01 with 135 impressions and 1 click and no query visibility; de-stale for the 2026/27 filing season (rates, MTD position, dates) ahead of the Jan-2027 demand peak. |
| 53 | cgt-divorce-property-transfer-tax-implications | 134 | healthy | 2 clicks; performing. |
| 54 | budgeting-voids-repairs-rental-cash-flow | 120 | healthy | No query rows; no action. |
| 55 | ated-complete-guide-2026-27 | 116 | healthy | Pos 6.9 stable on ATED rate queries; gaps within expectation at that band; leave alone. |
| 56 | reasonable-excuse-case-law-landlord-penalties-perrin-martland | 114 | healthy | No query rows; no action. |
| 57 | ated-15-percent-flat-rate-sdlt-interaction | 113 | healthy | No query rows; no action. |
| 58 | iht-gift-with-reservation-letting-children-paying-rent | 106 | healthy | No query rows; member of the GROB trio noted at #72. |
| 59 | leeds-property-accountant-specialist-tax-services | 104 | healthy | Single query "landlord tax advice leeds" at pos 9.5; expected clicks at that band about 0.07, so 0 clicks is not evidence; the Leeds push goes through /locations/leeds (#19). |
| 60 | option-to-tax-vata-1994-schedule-10-commercial-property... | 102 | healthy | No query rows; note the option-to-tax twin at #92 flagged consolidate. |
| 61 | renters-rights-act-possession-grounds-reform-section-8 | 100 | healthy | 2 clicks; performing. |
| 62 | applicable-sdlt-rates-for-first-time-buyers | 98 | consolidate_candidate | Owner approval required. Overlaps first-time-buyer-relief-benefits-and-eligibility (#39, stronger, 182 impr); two FTB SDLT pages competing. |
| 63 | uk-jersey-guernsey-isle-of-man-dtas-property-investors | 97 | healthy | 2 clicks; performing. |
| 64 | identity-verification-form | 96 | consolidate_candidate | Owner approval required. Companies House ID-verification sub-cluster with #47 and #190; three pages on one November-2025 change. |
| 65 | bare-trust-vs-nominee-company-vs-formal-trust-decision | 95 | healthy | No query rows; 1 click; no action. |
| 66 | vat-registration-threshold-90k-landlords-april-2024... | 94 | healthy | No query rows; adjacent to the deterministic VAT-on-rent consolidate pair but a distinct threshold topic; leave. |
| 67 | property-accountant-milton-keynes-landlord-guide | 93 | healthy | Local queries at pos 8.1 to 12.2 on tiny volumes (13 to 18 impr); nothing to fix. |
| 68 | ated-rental-property-relief-mechanics | 91 | healthy | No query rows; note ATED related-persons twins at #125/#144 flagged below. |
| 69 | limited-company-vs-personal-ownership-tax-comparison-2026 | 91 | consolidate_candidate | Owner approval required. Same slug also indexed at an uncategorised route (in the healthy list at 15 impr); verify canonical and 301 the duplicate route. |
| 70 | temporary-non-residence-5-year-cgt-recapture-property | 90 | healthy | 1 click; no action. |
| 71 | togc-vat-property-letting-business | 90 | healthy | No query rows; no action. |
| 72 | gift-with-reservation-of-benefit | 89 | consolidate_candidate | Owner approval required. Third generic GROB page alongside #58 (let property GROB) and #122 (s.102B family home); the generic one is the weakest angle of the trio. |
| 73 | what-repairs-can-landlords-deduct-from-rental-income | 88 | healthy | 1 click; no action. |
| 74 | multi-property-landlord-tax-planning-strategies-5-plus | 83 | expand | "portfolio landlord tax planning/strategy" at pos 13.8 to 14.1 (41+41 impr); best-positioned asset for the portfolio-planning cluster the deterministic pass flags elsewhere at pos 70+; expand this page to own the cluster. |
| 75 | section-24-relief-how-much-can-i-claim-2026 (no file) | 82 | healthy | Already 301s to section-24-calculator; monitor. |
| 76 | end-of-the-furnished-holiday-letting-regime | 81 | consolidate_candidate | Owner approval required. Identical word count and date as #77 (VAT on FHL) and overlaps #173 (FHL abolition); three FHL-sunset pages need one canonical. |
| 77 | vat-on-furnished-holiday-lettings-fhl | 80 | consolidate_candidate | Owner approval required. Pair of #76; same 4,334-word count and same-day publish suggests a near-duplicate build. |
| 78 | llp-accounts | 79 | healthy | No query rows; no action. |
| 79 | gifting-property-to-adult-children-decision-tree... | 78 | healthy | 2 clicks; performing. |
| 80 | immediate-post-death-interest-ipdi-rental-property... | 77 | healthy | No query rows; no action. |
| 81 | non-resident-cgt-uk-property-rates-reporting | 77 | healthy | No query rows; no action. |
| 82 | section-24-vs-incorporation-tax-savings (no file) | 77 | healthy | Already 301s to section-24-vs-incorporation-which-saves-more-tax; monitor. |
| 83 | manchester-property-accountant | 76 | healthy | Queries at pos 9.2 to 12.0 with emerging trajectory (+10.25); maturing on its own; but see #110 duplicate route. |
| 84 | companies-house-reforms-navigating-the-new-landscape | 76 | consolidate_candidate | Owner approval required. Fourth general Companies House reforms page in the cluster (#15, #16, #84 plus sub-clusters). |
| 85 | form-17-declaration-beneficial-interest-property... | 75 | healthy | No query rows; no action. |
| 86 | unmarried-co-owners-property-tax-rental-income-split | 75 | healthy | 1 click; no action. |
| 87 | vat-commercial-to-residential-conversion-5-percent... | 75 | healthy | No query rows; sits beside the deterministic expand page on VAT conversion; distinct depth angle; leave. |
| 88 | cgt-record-keeping-property-sales-what-to-save-how-long | 74 | healthy | No query rows; no action. |
| 89 | tenancy-agreement-template-rra-2025-compliant-clauses | 74 | healthy | No query rows; no action. |
| 90 | split-year-treatment-cases-1-8-landlord-departure-arrival | 73 | healthy | No query rows; no action. |
| 91 | ensuring-compliance-with-uk-payroll-reporting-regulations | 73 | healthy | No query rows; no action. |
| 92 | vat-option-to-tax-commercial-property-mechanics-election... | 73 | consolidate_candidate | Owner approval required. Overlaps #60 (option to tax Schedule 10, 7,097 words, the stronger asset); two mechanics pages on one election topic. |
| 93 | selling-house-below-market-value | 71 | healthy | No query rows; no action. |
| 94 | cgt-property-transfer-limited-company-calculate (dup URL) | 70 | consolidate_candidate | Owner approval required. Duplicate URL of #35; 301 to whichever route is canonical. |
| 95 | welsh-ltt-first-time-buyer-relief-mechanics... | 70 | healthy | No query rows; no action. |
| 96 | directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d | 68 | healthy | Emerging trajectory (+93.5) on s.455-rate queries at pos 8 to 11; let it mature before touching. |
| 97 | confirmation-statements | 67 | consolidate_candidate | Owner approval required. Pair of #48; two confirmation-statement pages. |
| 98 | sdlt-bewley-uninhabitable-property-test... | 67 | healthy | 1 click; no action. |
| 99 | hmo-licensing-costs-tax-deductible (no file) | 67 | healthy | Already 301s to hmo-licensing-fees-tax-deductible-uk-landlords; monitor. |
| 100 | archer-uk-limited-vs-revenue-scotland... | 65 | healthy | No query rows; case-note page; no action. |
| 101 | cgt-selling-multiple-properties-same-year | 64 | healthy | 1 click; no action. |
| 102 | how-much-is-a-property-accountant (no file) | 64 | healthy | Already 301s to how-much-does-a-property-accountant-cost (which is healthy with clicks); monitor. |
| 103 | aia-capital-allowances | 64 | healthy | No query rows; note the AIA family (#103, #141, #152 plus two healthy AIA pages) is broad but each holds a distinct angle; no action now. |
| 104 | brief-introduction-to-commercial-property-service-charge-accounts | 64 | healthy | No query rows; no action. |
| 105 | trf-qualifying-overseas-capital-what-can-be-designated | 63 | healthy | 1 click; no action. |
| 106 | decent-homes-standard-prs-landlord-compliance-checklist | 62 | healthy | No query rows; no action. |
| 107 | property-accountant-glasgow | 61 | healthy | No query rows; no action. |
| 108 | sdlt-5-percent-surcharge-refund-claim-process | 60 | healthy | 1 click; no action. |
| 109 | mtd-itsa-agent-services-account-asa-authorisation... | 60 | healthy | 1 click; no action. |
| 110 | manchester-property-accountant (second URL) | 59 | consolidate_candidate | Owner approval required. Same slug indexed at two routes (#83 and #110, 76 + 59 impr); routing dedupe, 301 the non-canonical route. |
| 111 | sdlt-non-resident-2-percent-surcharge | 59 | healthy | 1 click; no action. |
| 112 | landlord-insurance-tax-deductible | 58 | consolidate_candidate | Owner approval required. Three landlord-insurance deductibility pages live (this, the section-24 variant already in the deterministic consolidate list, and the what-can-you-claim variant in healthy); pick one canonical. |
| 113 | renters-rights-act-property-redress-scheme... | 58 | healthy | 1 click; no action. |
| 114 | tribunal-appeal-process-landlords-first-tier-tribunal | 58 | healthy | No query rows; no action. |
| 115 | file-dormant-accounts-a-complete-guide | 58 | healthy | No query rows; no action. |
| 116 | a-complete-guide-to-stamp-duty-relief-for-probate-properties | 58 | consolidate_candidate | Owner approval required. Overlaps sdlt-on-probate-property-transfers (#50, 137 impr, the stronger asset); two probate SDLT pages. |
| 117 | transactions-in-uk-land-cta-2010-part-8zb... | 58 | healthy | No query rows; no action. |
| 118 | free-rental-valuation | 57 | healthy | No query rows; no action. |
| 119 | domestic-reverse-charge-construction-vat-landlords | 56 | healthy | 1 click; no action. |
| 120 | a-complete-guide-on-incorporating-a-company-in-uk | 53 | healthy | No query rows; generic incorporation guide, tangential to the property incorporation cluster but not competing on the same queries; no action. |

### Best-guess bulk (rank 121 to 194, all low-confidence)

74 pages, 3,001 total impressions. None has surviving Google query rows except where noted. Default call is healthy (fresh substantial content, no query evidence, no action), low-confidence, except these best-guess exceptions:

| # | Page | Impr | Call (low-confidence) | Why |
|---|---|---|---|---|
| 123 | sdlt-mixed-use-property-classification | 52 | consolidate_candidate | Near-duplicate of #31 (mixed-use tribunal tests); owner approval required. |
| 125 | ated-relief-related-persons-market-rent-test | 51 | consolidate_candidate | Near-duplicate pair with #144 (same topic, "complete guide" variant); owner approval required. |
| 144 | ated-relief-for-related-persons-and-market-rent-a-complete-guide | 45 | consolidate_candidate | Pair of #125; owner approval required. |
| 145 | indirect-disposals-property-rich-entities-section-356od... | 45 | consolidate_candidate | Overlaps #37 (NRCGT indirect disposal, property-rich shares); owner approval required. |
| 167 | cgt-property-transfer-spouse-exempt (no file) | 38 | healthy | Already 301s to cgt-property-transfer-spouse; monitor. |
| 173 | abolition-of-furnished-holiday-lettings-fhl... | 36 | consolidate_candidate | Third member of the FHL-sunset trio with #76 and #77; owner approval required. |
| 189 | ated-late-filing-penalty-failed-reasonable-excuse... | 32 | consolidate_candidate | Pair of #49; owner approval required. |
| 190 | companies-house-id-verification-begins-today | 31 | consolidate_candidate | News-style third member of the CH ID-verification sub-cluster (#47, #64); owner approval required. |

All remaining 66 pages in this band: healthy, low-confidence, no query evidence to act on. They include the local pages (Belfast #176, Swindon #192), the FIC governance set (#156, #157), the trust/IHT deep set, MTD ITSA set (#172, #187, #188), and the directors-loan pair (#191, #193, which also warrant a dedupe look against the healthy director-loan-account-property-company-mechanics page if the cluster is ever revisited).

### Thin ambiguous below 30 impressions

| Bucket | Count | Total 90d impressions | Classification |
|---|---|---|---|
| action=ambiguous, impressions_90d < 30 | 410 | 3,873 | thin, no action yet; revisit after sampling improves or at next ledger run |

## Section 4: Disagreements with deterministic calls

1. **Homepage "/" as consolidate_candidate: disagree.** Its owning queries are branded ("property tax partners" earns clicks at 14x expected CTR) plus the junk query below. The homepage cannot be consolidated into anything; it should be classified healthy.
2. **Consolidate flags driven by the query "djh business advisers limited acquisition or acquires": disagree with three flags.** condition-a-acquisition-main-purpose-test (6 impr), balancing-allowance-balancing-charge (5 impr) and part of the homepage evidence rest entirely on this branded-news query, which matches page text about the DJH acquisition, not topical intent. These are query-noise artefacts, not cannibalisation. Suggest healthy for both blog pages.
3. **scottish-lbtt-rates-bands-2026-27-residential-buyers as consolidate_candidate: partially disagree.** Its 2,009 impressions come almost entirely from NON-residential LBTT rate queries (250+91+77+76 impr) hitting a residential-buyers guide. Consolidation does not fix an intent mismatch. The higher-value read is new_page_target: a dedicated "LBTT non-residential rates 2026/27" page, with this page left as the residential canonical. This is the single largest unserved intent in the whole ledger.
4. **General note on all 24 deterministic consolidate_candidates:** the estate-locked rule is rewrite-only, never collapse, with consolidation only via the data-gated protocol (fresh GSC+Bing pull, guard, Bing veto, Opus reasoning, per-cluster owner approval). Several of the flagged pages rank page 1 to 2 on Bing-favoured legacy queries, so the Bing veto is live risk. None should move without that protocol.
5. **non-resident-landlord-scheme-uk-complete-guide as consolidate_candidate: weak.** Its trajectory is emerging and its owning queries are NRL form-number lookups where it ranks pos 6 to 17. It looks like a maturing canonical, not a consolidation source. Suggest re-checking at the next ledger run before acting.

## Section 5: Healthy pages (deterministic, one line each)

102 pages classified healthy by the deterministic pass. Verdict: agreed on all, with one watch-item noted inline.

- /blog/section-24-and-tax-relief/furnished-holiday-let-tax-rules-exemptions (433 impr, pos 34.5), watch-item: FHL topic is sunsetting, fold into any FHL consolidation review.
- /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide (279 impr, pos 6.7, 1 click).
- /blog/capital-gains-tax/tax-sell-rental-property-uk (255 impr, pos 37.4).
- /blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-refund (181 impr, pos 62.6).
- /blog/property-accountant-services/can-you-claim-aia-on-second-hand-assets (140 impr, pos 4.6, 1 click).
- /blog/landlord-accounting-software-uk-2026 (122 impr, pos 71.8).
- /blog/non-resident-landlord-tax (category hub, 103 impr).
- /locations/london (98 impr, pos 42.3).
- /blog/making-tax-digital-mtd/best-mtd-software-landlords-2026 (97 impr, pos 47.4).
- /blog/landlord-tax-essentials/how-much-tax-rental-income-uk-complete-guide (89 impr).
- /blog/portfolio-management/rental-yield-vs-roi-property-investors-uk (84 impr).
- /blog/incorporation-and-company-structures/spv-property-investment-special-purpose-vehicle-guide (76 impr).
- /blog/capital-gains-tax/cgt-gifting-property-family-members-uk (74 impr).
- /blog/property-types-and-specialist-tax/holiday-let-tax-calculator-fhl-changes (71 impr).
- /blog/section-24-and-tax-relief/tax-relief-mortgage-interest-rented-property-guide (70 impr).
- /blog/property-accountant-services/vat-calculation-calculator (69 impr).
- /blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide (68 impr).
- /blog/incorporation-and-company-structures/tax-efficient-property-investment-structure-guide (66 impr).
- /blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide (61 impr).
- /blog/london-property-accountant (61 impr, pos 49.7).
- /blog/section-24-and-tax-relief/annual-investment-allowance-uk (56 impr).
- /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk (55 impr).
- /blog/property-accountant-services/how-to-become-property-accountant (54 impr, pos 20.9).
- /blog/property-accountant-services/how-much-does-a-property-accountant-cost (53 impr, pos 6.7, 2 clicks).
- /blog/portfolio-management/how-to-scale-buy-to-let-portfolio-1-to-10-properties (52 impr).
- /blog/incorporation-and-company-structures/corporation-tax-vs-income-tax-landlords-2027 (51 impr).
- /blog/portfolio-management/btl-investment-plymouth-cardiff-landlord-hotspots (50 impr, pos 21.1).
- /blog/landlord-tax-essentials/essential-guide-for-first-time-homebuyers-in-scotland (48 impr, pos 6.9).
- /blog/property-accountant-services/property-accountant-bournemouth-landlords-tax-services (47 impr, pos 15.8).
- /blog/section-24-and-tax-relief/rent-a-room-relief-uk-landlords-lodgers-guide (40 impr, pos 19.1).
- /blog/property-types-and-specialist-tax/land-and-buildings-transaction-tax-multiple-dwellings-relief (39 impr, pos 10.9).
- /blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step (38 impr, pos 22.9).
- /blog/incorporation-and-company-structures/corporation-tax-marginal-relief-uk-guide (38 impr, pos 16.6).
- /blog/portfolio-management/reduce-void-periods-rental-properties-uk-landlords (38 impr).
- /blog/property-accountant-services/vat-how-to-calculate (38 impr).
- /blog/property-types-and-specialist-tax/writing-down-allowance-rates (38 impr).
- /blog/landlord-tax-essentials/cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation (36 impr).
- /blog/property-accountant-services/accountant-bookkeeping-services (35 impr).
- /blog (hub, 33 impr, pos 5.2).
- /blog/mortgage-interest-tax-relief-changes-landlords (33 impr, pos 15.4).
- /blog/property-accountant-services/what-services-buy-to-let-accountant (33 impr).
- /blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk (32 impr).
- /blog/property-types-and-specialist-tax/single-person-council-tax-discounts-a-complete-guide (31 impr, pos 7.7).
- /blog/section-24-and-tax-relief/landlord-expenses-allowable-uk-2026 (31 impr).
- /blog/capital-gains-tax/2027-property-tax-rates-cgt-capital-gains-changes (30 impr, pos 25.1).
- /blog/property-types-and-specialist-tax/capital-allowances-examples (30 impr).
- /blog/property-types-and-specialist-tax/first-time-buyer-relief-overcome-down-payment (30 impr).
- /about (29 impr, pos 3.3, 13 clicks, best CTR on the site).
- /blog/capital-gains-tax/cgt-property-2027-rate-changes-uk-landlords (26 impr, pos 10.5).
- /blog/incorporation-and-company-structures/how-to-set-up-property-investment-company-uk-guide (26 impr).
- /blog/property-accountant-services/property-accountant-jobs-uk (26 impr).
- /blog/incorporation-and-company-structures/a-complete-guide-to-family-investment-companies-fics (25 impr, pos 14.2).
- /blog/non-resident-landlord-tax/dta-tie-breaker-test-dual-residence-property-owners (25 impr, pos 6.9).
- /blog/property-types-and-specialist-tax/badges-of-trade-marson-morton-property-flipping-investment-distinction-landlords (25 impr, pos 6.2).
- /blog/non-resident-landlord-tax/double-taxation-convention-dta-uk-and-spain (24 impr, pos 10.0).
- /blog/property-types-and-specialist-tax/a-complete-guide-on-community-infrastructure-levy-cil (24 impr).
- /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (23 impr).
- /blog/making-tax-digital-mtd/property-accounting-software-uk (23 impr, pos 35.9).
- /blog/property-accountant-job-description (23 impr).
- /blog/landlord-tax-essentials/declaration-of-trust (22 impr).
- /blog/landlord-tax-essentials/schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries (22 impr, pos 7.9).
- /blog/non-resident-landlord-tax/automatic-exchange-of-information (22 impr, pos 12.0).
- /blog/property-types-and-specialist-tax/single-person-council-tax-discount (22 impr, pos 19.6).
- /blog/incorporation-and-company-structures/buy-to-let-limited-company-mortgage-rates-2026-market-guide (20 impr).
- /blog/property-types-and-specialist-tax/cis-templates (20 impr).
- /blog/portfolio-management/landlord-vat-registration-when-required (19 impr).
- /blog/section-24-and-tax-relief/writing-down-allowance-cars (19 impr).
- /blog/property-accountant-services/property-accountant-preston-expert-tax-services-local-landlords (18 impr, pos 7.2).
- /blog/section-24-and-tax-relief/landlord-insurance-tax-deductible-what-can-you-claim (18 impr), part of the insurance trio noted at #112.
- /blog/landlord-tax-essentials/how-to-calculate-net-rental-income-after-all-costs-uk-guide (16 impr).
- /blog/property-accountant-services/ipswich-property-accountant-tax-services-local-landlords (16 impr, pos 6.4).
- /blog/property-types-and-specialist-tax/multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords (16 impr, pos 6.6).
- /blog/landlord-tax-essentials/vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages (15 impr).
- /blog/limited-company-vs-personal-ownership-tax-comparison-2026 (15 impr), duplicate route noted at #69.
- /blog/section-24-and-tax-relief/annual-investment-allowance-2024-25 (15 impr).
- /blog/incorporation-and-company-structures/ated-rates-2026-27-bands-table-worked-examples (14 impr, pos 1.6).
- /blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge (14 impr).
- /blog/making-tax-digital-mtd/mtd-itsa-major-tax-reform-context-policy-history (14 impr).
- /blog/property-accountant-services/accountant-accounting-services (14 impr).
- /blog/section-24-and-tax-relief (hub, 14 impr).
- /blog/incorporation-and-company-structures/residential-property-developer-tax-uk (13 impr).
- /blog/property-types-and-specialist-tax/a-complete-guide-on-multiple-dwellings-relief-eligibility-and-benefits (13 impr).
- /blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide (12 impr).
- /blog/incorporation-and-company-structures/director-loan-account-property-company-mechanics (12 impr, pos 18.6).
- /blog/landlord-tax-essentials/income-tax-rates-landlords-2026-27-complete-guide (12 impr, pos 12.4).
- /blog/landlord-tax-essentials/landlord-tax-calendar-2026-27-key-dates (12 impr).
- /blog/landlord-tax-essentials/let-property-campaign-penalty-calculator (12 impr).
- /blog/portfolio-management/property-accountant-london-expert-services (12 impr).
- /blog/property-accountant-services/slough-property-accountant-landlord-tax-services (12 impr).
- /blog/property-types-and-specialist-tax/anti-fragmentation-rule-section-356oh-section-517h-multi-entity-developer-scheme-defeat (12 impr, pos 7.4).
- /blog/incorporation-and-company-structures/sdlt-group-relief-for-corporate-landlord-portfolios (11 impr, pos 11.3).
- /blog/landlord-tax-essentials/iht-gifts-with-reservation-of-benefit-property (11 impr, pos 10.8).
- /blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026 (11 impr).
- /blog/property-accountant-services/vat-tax-calculator (11 impr).
- /blog/property-types-and-specialist-tax/ated-rates (11 impr, pos 5.6).
- /blog/incorporation-and-company-structures/when-to-incorporate-property-portfolio-timing (10 impr).
- /blog/landlord-tax-essentials/higher-rates-of-land-transaction-tax-a-complete-guide (10 impr, pos 9.7).
- /blog/non-resident-landlord-tax/moving-to-australia-uk-rental-property-tax-pathway (10 impr).
- /blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements (10 impr).
- /blog/non-resident-landlord-tax/returning-to-uk-after-non-residence-property-portfolio (10 impr).
- /blog/portfolio-management/property-accountant-services-expert-solutions (10 impr).
- /blog/section-24-and-tax-relief/mortgage-interest-deductible-landlords-uk-2026 (10 impr, pos 5.9).

## Section 6: Unowned queries (new_page_target inputs)

| Query | 90d impressions | Best position | Note |
|---|---|---|---|
| property accounting software uk | 153 | 38.0 | Software cluster, pairs with the two expand-flagged software pages. |
| stamp duty on property incorporation uk | 142 | 37.7 | Incorporation SDLT cluster, two consolidate-flagged pages already chase it. |
| landlord accounting software | 109 | 65.1 | Software cluster. |
| vat on rental income hmrc | 80 | 37.0 | VAT-on-rent cluster (two consolidate-flagged pages). |
| capital allowances on investment property in uk | 60 | 32.0 | Pairs with the capital-allowances expand page. |
| tax-efficient property investment structure | 56 | 47.3 | Structure-guide page exists in healthy; likely coverage-angle gap. |
| is there vat on rental income | 54 | 33.5 | VAT-on-rent cluster. |
| inheritance tax planning for landlords | 52 | 60.7 | No dedicated landlord IHT-planning hub exists. |
| accounting for landlords | 50 | 35.9 | Service-intent head term. |
| create btl limited company uk | 46 | 58.7 | Setup-intent gap beside the BTL company guide. |
| capital gains tax on property | 41 | 61.1 | Head term, owned only at pos 61 by the complete guide. |
| accountants for landlord | 39 | 57.8 | Service head term. |
| vat on rent | 39 | 44.7 | VAT-on-rent cluster. |
| vat property rental | 38 | 56.8 | VAT-on-rent cluster. |
| is there stamp duty on furnished holiday lettings | 38 | 43.7 | FHL SDLT gap. |
| accounting software for landlords | 34 | 46.0 | Software cluster. |
| vat on residential property rent | 32 | 50.0 | VAT-on-rent cluster. |

Addition from the ambiguous review (see Disagreements item 3): **LBTT non-residential rates 2026/27** is the largest unserved intent in the dataset, roughly 500 query-row impressions (and a 2,009-impression page riding on it) with no non-residential LBTT page on the site.

---

## Return summary

- Ambiguous >= 30 impressions resolved: 194 of 194 (120 fully evidenced, 74 best-guess low-confidence).
- LLM resolution counts: healthy 158, consolidate_candidate 27 (all owner-approval-required), meta_fix 4, expand 4, refresh 1. Thin bulk: 410 pages / 3,873 impressions, no action yet.
- Disagreements with deterministic calls: 5 (homepage consolidate flag, three junk-query-driven consolidate flags, Scottish LBTT intent misread, NRL scheme consolidate weak, plus the estate rewrite-only caveat on all 24).
- Three highest-value single actions:
  1. One CGT meta pass covering cgt-rates-property-2026-27 (1,453 impr at pos 5.3), capital-gains-tax-property-complete-guide-uk (1,260 impr) and cgt-annual-exempt-amount (779 impr): about 3,500 impressions ranking pages 1 to 2 with 3 total clicks.
  2. New page: LBTT non-residential rates 2026/27. Roughly 500 surviving query impressions (sampling-deflated, true demand higher) currently landing on a residential guide at pos 6 to 9 with zero clicks.
  3. Landlord accounting software cluster: expand the two flagged software pages plus a decision-focused new page target; 296 unowned query impressions plus 575 page impressions all stuck at positions 38 to 72 on commercial-intent queries.
