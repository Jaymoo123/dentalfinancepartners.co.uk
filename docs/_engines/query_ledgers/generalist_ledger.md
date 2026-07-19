# Query ledger review: generalist (hollowaydavies.co.uk)

- Date: 2026-07-17 (from generalist_ledger.json generated same day)
- Data window: 90 days of GSC to 2026-07-15 (2-day lag), plus Bing snapshot queries
- Sampling loss: 46.2% of impressions not attributable to sampled queries, so per-query evidence understates true volume
- Expected-CTR curve note: positions 1-2 are interpolated and position 5 is monotonic-clipped; expected CTR at position 1 is only 0.46%, which reflects a brand-weak site. CTR-gap signals are therefore weak and directional only.
- Channel note: Bing is this site's only revenue channel. Where a page has page-1 Bing positions, that evidence outweighs deep Google positions in the calls below.
- Pages: 561 total. Deterministic action counts: healthy 99, refresh 4, expand 7, consolidate_candidate 20, hold 114, ambiguous 317 (39 resolved individually below, 278 bulk-classified as thin).

## Section 1: HOLD pages (114, do not touch)

Two hold sources. Nothing below may be changed before its window closes.

### SERP-meta batch-2 outcome watch (12 pages, all close 2026-08-05)

| Page | Impr 90d |
|---|---|
| /blog/randd-tax-credits/how-to-claim-rd-tax-credits | 134 |
| /blog/bookkeeping-and-compliance/fixed-fee-vs-hourly-accountant | 105 |
| /blog/payroll-and-paye/correct-paye-overpayment-hmrc | 102 |
| /blog/incorporation-and-structure/holding-company-structure-uk-tax | 71 |
| /blog/sole-trader-and-self-employment/accountant-for-uber-drivers | 62 |
| /blog/sole-trader-and-self-employment/hmrc-tax-rebate | 45 |
| /blog/incorporation-and-structure/non-uk-resident-director-limited-company | 41 |
| /blog/bookkeeping-and-compliance/accountant-fees-small-business-2025-26 | 36 |
| /blog/payroll-and-paye/tax-deducted-at-source | 33 |
| /blog/corporation-tax/annual-investment-allowance-uk | 22 |
| /blog/corporation-tax/annual-investment-allowance | 18 |
| /blog/exit-and-capital-gains/uk-cgt-rates-on-residential-property-2026 | 4 |

### Ranking-maturation watch (102 pages)

First GSC impression within the last ~28 days; window closes 42 days after first impression. Earliest closes 2026-07-31, latest 2026-08-26. Mostly /locations/* net-new pages (Blackpool, Skipton, Newark-on-Trent, Gateshead, Wembley, Gloucester, Lincoln, Scunthorpe, Solihull, Glasgow, Taunton, Weston-super-Mare, Dunfermline, Guildford, Hounslow, Manchester, Walthamstow, Leicester, Cheltenham, Hull, Basingstoke, Falkirk, Folkestone, Penzance, Tamworth, Leeds, Halifax, Southampton, Stockton-on-Tees, Aberdeen, Woking, Ashford, Bridgend, Bridgwater, East Kilbride, Lewisham, Livingston, Morecambe, Oldham, Pontefract, Rochdale, Sheffield, Sutton Coldfield, Carlisle, Lancaster, Bradford, Camberley, Kirkcaldy, Llanelli, Maidstone, Middlesbrough, Redhill, Winchester and others), plus new glossary entries (national-insurance, cis, personal-allowance, section-455, badr, flat-rate-vat, dividend-allowance, paye), /accountant-near-me, /uk-tax-rates, /cookie-policy, /team/emma-carter, /calculators/pension-contribution-optimiser, and ~30 recent blog pages (director-sign-off-accounts-non-accountant closes 2026-08-01, badr-accountant closes 2026-08-22, etc). Full per-page dates are in the JSON; no action on any of them before their window-close date.

## Section 2: Deterministic actions

### refresh (4)

**/blog/bookkeeping-and-compliance/construction-accounting-software-uk-contractors** (highest-impression page on the site)

| Query | Impr 90d | Clicks | Pos | CTR vs expected |
|---|---|---|---|---|
| construction accounting software | 689 | 0 | 27.7 | 0 vs ~0 |
| accounting software for construction | 335 | 0 | 32.5 | 0 vs ~0 |
| contractor accounting software | 294 | 0 | 26.5 | 0 vs ~0 |
| Bing: best construction accounting software uk | 1 | 0 | 4.0 | page 1 Bing |

3,678 impressions, 0 clicks, stuck page 3 Google but already page 1 Bing on the long-tail. A data-led overhaul is the right call; this is also the source page for the top three unowned queries.

**/locations/croydon** (133 impr, 0 clicks, pos 82.4, declining)

| Query | Impr 90d | Clicks | Pos |
|---|---|---|---|
| transport accountants croydon | 39 | 0 | 78.6 |
| medical accountants croydon | 36 | 0 | 84.1 |
| new business accountant croydon | 31 | 0 | 84.3 |

**/locations/sutton** (114 impr, 0 clicks, pos 43.3, declining)

| Query | Impr 90d | Clicks | Pos |
|---|---|---|---|
| healthcare accountant sutton | 54 | 0 | 47.6 |
| corporate tax advisor sutton | 7 | 0 | 37.4 |
| sole trader accountant sutton | 7 | 0 | 34.4 |

**/locations/bromley** (71 impr, 0 clicks, pos 73.5, stable)

| Query | Impr 90d | Clicks | Pos |
|---|---|---|---|
| payroll accountant near bromley | 35 | 0 | 63.9 |
| tax accountant near bromley | 15 | 0 | 88.2 |
| property accountant near bromley | 7 | 0 | 84.4 |

### expand (7)

**/locations/putney** (350 impr, 0 clicks, pos 32.6): tax specialist putney 16 impr pos 35.4; accountant for new business putney 15 impr pos 35.8; bookkeeper putney 13 impr pos 29.1. Broad long-tail spread with no single owned angle; expand service-specific sections.

**/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk** (123 impr, pos 13.4): accounting for traders 70 impr pos 15.5; accountants for forex traders uk 16 impr pos 7.9 (negative CTR gap); accountants for forex traders 12 impr pos 9.6 (negative CTR gap). Near page 1, two queries already top 10.

**/locations/exeter** (116 impr, improving): rural accountants exeter 32 impr pos 38.2; accountants exeter 8 impr pos 65.3. The rural angle is a genuine niche worth a dedicated section.

**/locations/salford** (68 impr, pos 19.1): three MediaCityUK query variants (15/14/13 impr, pos ~18.5). A MediaCity-specific section is an obvious win.

**/blog/incorporation-and-structure/limited-company-vs-llp-consultant** (79 impr, pos 15.7, improving): LLP tax-consultation queries at pos 14-18.

**/glossary** (47 impr): rule 37a 12 impr pos 34.2; cird81900 6 impr pos 33.0. HMRC-manual reference queries landing on the glossary index; new glossary entries would own these.

**/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown** (42 impr, pos 20.4): single query "chartered accountant service charges" 42 impr pos 20.4.

### consolidate_candidate (20, ALL owner-approval-required)

Four genuine clusters plus one cross-site issue:

1. **Fixed-fee cluster** (3 of 4 partners actionable): /blog/bookkeeping-and-compliance/fixed-fee-accountant-uk-cost-2025-26 (103 impr, "fixed fee accounts" 89 impr pos 66.0), /blog/bookkeeping-and-compliance/fixed-fee-accountant-uk-vs-hourly-billing-erratic-workload (70 impr, "fixed fee accounts" 65 impr pos 74.3), /blog/bookkeeping-and-compliance/fixed-fee-accountant-uk-vs-hourly-billing (26 impr, "fixed fee accounts" 26 impr pos 55.2). Fourth partner fixed-fee-vs-hourly-accountant is on SERP-meta hold until 2026-08-05, so any consolidation decision must wait for that window.
2. **Tax-bands cluster** (4 pages splitting two queries): /blog/sole-trader-and-self-employment/england-tax-bands (66 impr), /blog/limited-company-tax/uk-tax-brackets (47 impr), /blog/sole-trader-and-self-employment/uk-tax-bands (39 impr), /blog/payroll-and-paye/taxation-bands-uk (32 impr, has page-1 Bing hits: "tax bands uk ltd company to paye" pos 2, "uk sole trader tax band" pos 3). All four sit pos 62-79 Google on "uk sole trader tax band" / "tax bands for uk sole traders". If consolidating, taxation-bands-uk's Bing positions argue for it as the survivor, per locked rewrite-only rule this becomes a rewrite of one canonical page rather than redirects.
3. **VAT-calculation pair**: /blog/vat-and-making-tax-digital/vat-calculation-calculator (57 impr, pos 89.5) and /blog/vat-and-making-tax-digital/vat-how-to-calculate (56 impr, pos 81.4, page-1 Bing: "how to calculate effective vat rate" pos 2, "formula for vat calculation" pos 3). Bing evidence says vat-how-to-calculate is the canonical page.
4. **CIS pair**: /blog/payroll-and-paye/accountant-for-construction-subcontractors-cis (441 impr, "cis accountant" 227 impr pos 74.7) and /blog/payroll-and-paye/cis-accountant-uk-construction (10 impr, pos 70.2, dormant). Clear primary and satellite.
5. **HMRC refund pair**: /blog/sole-trader-and-self-employment/hmrc-refund-tax (19 impr, pos 42.5); partner hmrc-tax-rebate is on hold until 2026-08-05.
6. **Locations flagged on "dentist accountants near me"** (8 pages): bangor-wales (84 impr), colchester (40), chester (28), harrogate (24), macclesfield (22), mansfield (17), huddersfield (17), grimsby (15). See Disagreements; I do not support consolidating these.

## Section 3: Ambiguous resolutions (39 pages, action_source="llm")

Calls weight Bing evidence heavily per the channel note. Page-1 Bing with tiny impressions and no CTR problem = healthy; leave it to compound.

| Page | Call | Justification |
|---|---|---|
| /blog/bookkeeping-and-compliance/quickbooks-vs-xero-cloud-accounting-comparison | refresh | 446 impr, 0 clicks, pos 79 on head terms "xero vs quickbooks uk" (126 impr, pos 89); solid 2,388-word May-2026 page but buried page 8; needs a data-led overhaul aimed at the comparison head terms, matching its expand+refresh signals. |
| /blog/corporation-tax/capital-allowances-second-hand-vans | healthy | 293 impr, 3 clicks, page-1 Bing across four van-allowance queries (pos 3-6); content current (14% WDA present); already converting on the revenue channel. |
| /blog/exit-and-capital-gains/hmrc-cgt-reporting-requirements-2026 | meta_fix | Pos 11.6-16.3 Google on 280 impr with 0 clicks and a negative CTR gap, plus page-1 Bing (pos 5-7) with only 1 click; the ranking is fine, the snippet is not earning the click. |
| /blog/corporation-tax/integral-features-capital-allowances | meta_fix | Page-1 Bing on "integral features" (22 impr, pos 6) and variants, 1 click from 216 impr; strong current content, so the lever is the Bing title/description, not the body. |
| /blog/sole-trader-and-self-employment/self-assessment-tax-return-guide-stopped-trading-mid-year | healthy | 216 impr, 1 click, no owning-query data at all (query_data_thin); nothing actionable, revisit when queries surface. |
| /blog/corporation-tax/enhanced-capital-allowances-ev-charging-points-2025-26 | healthy | 134 impr, 1 click, scattered page-1 Bing singles; content current; no coherent signal to act on. |
| /blog/exit-and-capital-gains/uk-capital-gains-tax-rates-residential-property-2026 | meta_fix | Pos 7.7-14.3 on 2026-rates queries with 0 clicks and negative CTR gaps, plus four distinct page-1 Bing 26/27-rate queries; win the click first. Note: sits in a CGT-property cluster whose siblings (uk-cgt-rates-on-residential-property-2026 and three capital-gains-tax-on-property pages) are all on hold, so any cluster-level tidy waits until after 2026-08-05. |
| /blog/limited-company-tax/can-i-claim-mileage-limited-company-director | healthy | Bing positions 1-4 on director-mileage questions; page already carries the 55p AMAP rate; impressions are tiny, so leave it to compound on the revenue channel. |
| /locations/burnley | expand | 100 impr, declining; "corporation tax return burnley" is 83 of them at pos 13.2 but the page is a generic location template; add a corporation-tax-returns section to own the near-page-1 query. |
| /blog/corporation-tax/can-you-claim-aia-on-second-hand-assets | healthy | 98 impr, 1 click, page-1 Bing (pos 3-8) on four AIA second-hand queries; content current; no CTR anomaly at these volumes. |
| /blog/payroll-and-paye/payroll-for-one-employee-uk-director-guide | healthy | 94 impr, 2 clicks, page-1 Bing on long-tail director-payroll questions; 3,318-word current guide; performing normally. |
| /blog/bookkeeping-and-compliance/how-to-record-dividend-voucher-company-books-hmrc-compliance | healthy | 92 impr, 0 clicks but query_data_thin with no owning queries; no evidence to justify intervention. |
| /blog/sole-trader-and-self-employment/self-assessment-tax-return-guide-sole-trader-multiple-trades | healthy | 89 impr, query_data_thin; comprehensive niche guide; wait for query signal. |
| /blog/corporation-tax/corporation-tax-refund-closed-company | healthy | 71 impr, 2 clicks (good ratio at this volume), query_data_thin; converting adequately. |
| /blog/incorporation-and-structure/holding-company-two-subsidiaries-tax-efficiency | healthy | 71 impr, 1 click, query_data_thin; sibling holding-company-structure-uk-tax is on hold, so no cluster action possible anyway. |
| /blog/bookkeeping-and-compliance/confirmation-statement-late-penalty-companies-house | meta_fix | Page-1 Bing (pos 5-9) on four "how much is the penalty" phrasings with 0 Bing clicks; the page answers the question but the meta does not lead with the answer; small snippet change should win these clicks. |
| /blog/sole-trader-and-self-employment/register-as-self-employed-uk-while-keeping-full-time-job | healthy | 63 impr, query_data_thin; strong current guide; no signal. |
| /blog/incorporation-and-structure/accountant-for-startup-pre-incorporation-expenses | healthy | 53 impr, query_data_thin; no signal. |
| /blog/sole-trader-and-self-employment/marriage-allowance-self-employed | healthy | 52 impr, query_data_thin; no signal. |
| /blog/payroll-and-paye/accountant-for-payroll-uk-business-guide | healthy | 50 impr, query_data_thin; no signal. |
| /blog/payroll-and-paye/pay-bonus-through-separate-company-ni | healthy | 50 impr, 2 clicks; anti-avoidance explainer converting fine at this volume. |
| /blog/corporation-tax/full-expensing-capital-allowances | healthy | 49 impr, query_data_thin; rates verified current (14% WDA present); no signal. |
| /blog/director-pay-and-dividends/trivial-benefits-rules-uk | meta_fix | Bing pos 8-10 on director-focused trivial-benefit questions with 0 clicks; page covers the £300 director cap and VAT angle already, so a Bing-facing title/description leading with directors should lift CTR and position. |
| /blog/bookkeeping-and-compliance/accounting-for-service-charges-uk-guide-2025-26 | healthy | 48 impr, 1 click, query_data_thin; note near-duplicate topic with accounting-service-charges-2025-26-breakdown (deterministic expand) but no shared owning query in the data, so no action here. |
| /blog/corporation-tax/rent-charge-connected-company-corporation-tax | healthy | 47 impr, 3 clicks; best click ratio in the ambiguous set; leave alone. |
| /blog/director-pay-and-dividends/how-to-pay-yourself-from-limited-company-with-separate-paye-job | healthy | 47 impr, query_data_thin; no signal. |
| /blog/bookkeeping-and-compliance/freeagent-accountant-contractor-limited-company | healthy | 42 impr, query_data_thin; no signal. |
| /blog/director-pay-and-dividends/can-i-pay-directors-personal-tax-bill-through-limited-company | healthy | 42 impr, query_data_thin; no signal. |
| /blog/incorporation-and-structure/limited-company-vs-sole-trader-freelancer-agencies | healthy | 41 impr, 1 click, query_data_thin; no signal. |
| /blog/payroll-and-paye/p11d-company-car-fuel-paid-by-director | refresh | Content carries the stale 13.8%/£9,100 employer NIC figures (correct is 15%/£5,000 from April 2025); factual refresh required regardless of traffic; 41 impr, query_data_thin otherwise. |
| /locations/epsom | healthy | 41 impr, query_data_thin, templated location page with no owning-query angle to expand into; no signal. |
| /blog/limited-company-tax/accountant-cost-limited-company-2025-26 | healthy | 40 impr, 1 click, query_data_thin; sibling accountant-fees-small-business-2025-26 is on hold, no cluster action possible. |
| /blog/sole-trader-and-self-employment/tax-rebate-uk | consolidate_candidate | Scattered bottom-page-1 Bing singles; overlaps the rebate cluster (deterministic consolidate_candidate hmrc-refund-tax; hmrc-tax-rebate on hold to 2026-08-05); fold into that cluster's owner decision rather than acting alone. Owner approval required. |
| /blog/payroll-and-paye/final-salary-payment-leaving-director | healthy | 39 impr, query_data_thin; no signal. |
| /blog/vat-and-making-tax-digital/vat-accountant-importing-goods-outside-uk | healthy | 37 impr, query_data_thin; no signal. |
| /blog/corporation-tax/creative-industry-tax-reliefs-uk | healthy | 32 impr, query_data_thin; verified the page already covers the expenditure-credit regime (AVEC/VGEC mentioned), so no factual refresh needed; no traffic signal. |
| /blog/exit-and-capital-gains/badr-claim-after-leaving-director-role | healthy | 31 impr, 1 click; page carries the current 18% BADR rate with correct historical framing; no signal. |
| /blog/payroll-and-paye/paye-for-director-two-companies | healthy | 31 impr, query_data_thin; no signal. |
| /blog/sole-trader-and-self-employment/allowable-expenses-sole-trader-checklist | healthy | 30 impr, query_data_thin; carries current 55p AMAP with correct prior-year context; no signal. |

### Thin ambiguous pages (below 30 impressions)

| Classification | Pages | Total impressions 90d |
|---|---|---|
| Thin, no action yet | 278 | 1,759 |

An average of 6 impressions per page over 90 days. No per-page review is warranted; re-evaluate at the next ledger run.

## Section 4: Disagreements with deterministic calls

1. **The 8 location pages flagged consolidate_candidate on "dentist accountants near me" (bangor-wales, chester, colchester, grimsby, harrogate, huddersfield, macclesfield, mansfield).** I disagree with treating these as a consolidation cluster. They are geographic pages that exist for local intent; they only co-appear because one generic non-local query weakly matches all of them at pos 75-91. Consolidating location pages would destroy their local purpose to fix a query none of them should own, especially since the estate has a dedicated dentists site that is the right home for dental-accountancy intent. The real fix is de-emphasising dentist wording in the shared location template, not consolidation. Bangor-wales additionally has a genuine local signal ("chartered accountants bangor" 55 impr pos 38.0) that argues for keeping and expanding it.
2. **/cookie-policy and /team/emma-carter on ranking-maturation hold.** Not a disagreement with the hold itself, but these are boilerplate pages that will never warrant ledger actions; suggest the generator excludes non-content routes from future maturation watches to reduce noise.

No other deterministic calls disputed. The refresh/expand sets are well-evidenced and the fixed-fee, tax-bands, VAT-calculation and CIS clusters are genuine duplicates (subject to the locked rewrite-only rule: consolidation means one canonical rewrite, not redirect-collapse, and each cluster needs owner approval).

## Section 5: Healthy pages (99 deterministic)

The deterministic healthy set is the site's working core: the main service pages, the higher-performing /locations pages not listed elsewhere, established blog guides with normal CTR at their positions, and glossary entries past maturation. Each shows either clicks in line with the (weak) expected-CTR curve or stable page-1 Bing coverage with no cannibalisation partners. No individual action is proposed for any of them; they are listed per page in the JSON with action="healthy" and are the baseline the monitored_pages detector should continue to watch. Together with the 22 pages I resolved to healthy in Section 3, 121 pages carry an explicit healthy verdict this run.

## Section 6: Unowned queries (new_page_target inputs)

Top unowned queries by 90-day impressions (all deterministic new_page_target; best position is the best any existing page achieved):

| Query | Impr 90d | Best pos | Note |
|---|---|---|---|
| accounting software for construction | 335 | 31.0 | Better served by the construction-software refresh than a new page |
| fixed fee accounts | 281 | 55.2 | Resolves via the fixed-fee consolidation decision, not a new page |
| cis accountant | 227 | 74.7 | Resolves via the CIS pair consolidation |
| uk sole trader tax band | 121 | 62.1 | Resolves via the tax-bands consolidation |
| accounting software for construction company | 114 | 35.2 | Same target as row 1 |
| corporation tax advisers st albans | 106 | 52.5 | St Albans cluster: 9 service queries totalling ~660 impr with no /locations/st-albans page; strongest genuine new_page_target this run |
| business advisers st albans | 94 | 67.6 | St Albans cluster |
| dentist accountants near me | 82 | 68.5 | Belongs to the dentists site, not this one; recommend no generalist page |
| auditing services st albans | 79 | 55.1 | St Albans cluster |
| best accounting software for contractors | 78 | 70.7 | Construction-software refresh target |
| statutory accounts st albans | 77 | 62.7 | St Albans cluster |
| subsidiary accounts st albans | 75 | 61.3 | St Albans cluster |
| audits accountants st albans | 74 | 60.6 | St Albans cluster |
| holding company tax advice | 71 | 72.9 | Holding-company pages exist (one on hold); revisit after 2026-08-05 |
| accounting audit st albans | 71 | 59.4 | St Albans cluster |
| vat calculation guide | 66 | 86.7 | Resolves via the VAT-calculation consolidation |
| accountants for vets | 53 | 34.2 | Genuine new_page_target: no vets industry page exists, best pos already 34 |
| tax returns in dover | 48 | 35.5 | Candidate /locations/dover |
| who pays 45p tax | 47 | 36.6 | Additional-rate explainer or glossary target |
| construction accountant cannock (+5 Cannock service variants) | 41-33 each, ~217 total | 35.6 best | Candidate /locations/cannock; second-strongest genuine new-page cluster |
| sole trader to limited company (+ changing from...) | 74 combined | 76.9 | Incorporation-switch guide candidate |
| r&d tax credits for engineering firms / for construction | 62 combined | 54.4 | Two R&D industry-angle candidates |
| corporation tax accountant stockport | 30 | 45.9 | Candidate /locations/stockport |

Remaining unowned queries (croydon/bromley service variants, shropshire, cardiff, members voluntary liquidation, others) are each under 50 impressions and mostly resolve through the location refreshes above; full list of 51 in the JSON.
