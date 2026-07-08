# Bing Read - www.agencyfounderfinance.co.uk

**DATA-TRUST HEADER**: bing_query_data refreshed 2026-07-08 (two snapshots: 2026-06-12 and 2026-07-08; both are rolling trailing-window aggregates, not cumulative point-in-time snapshots; matched-window delta is directionally valid but not a strict same-window comparison). Sibling comparison uses latest available snapshot per site (generalist 2026-06-29, medical 2026-07-06, agency 2026-07-08). DDG live-probe blocked by bot challenge (anomaly.js); Bing BWT data used as proxy throughout.

---

## 1. Bing Volume Trajectory

Two snapshots available.

| Snapshot | Impressions | Clicks | CTR | Queries | Pages | Wt. Avg Position |
|---|---|---|---|---|---|---|
| 2026-06-12 | 23 | 0 | 0.0% | 17 | 5 | 5.3 |
| 2026-07-08 | 150 | 1 | 0.7% (n=150) | 124 | 18 | 6.4 |

**Matched-window delta (06-12 to 07-08, ~26 days):**
- Impressions: +552% (23 to 150)
- Clicks: 0 to 1
- Queries: +629% (17 to 124)
- Pages with impressions: +260% (5 to 18)
- Weighted avg position: +1.1 worse (5.3 to 6.4)

**Interpretation**: Coverage is expanding rapidly (5 pages to 18, 17 queries to 124) — Bing is actively discovering and indexing blog content. However, position has drifted 1.1 points worse as more pages enter at lower ranks, diluting the weighted average. The single click (out of 150 impressions) is a 0.7% CTR that is methodologically valid but below any suppression-floor threshold (n=150 is sufficient for the aggregate; individual query CTRs are not meaningful at 1-4 impressions each).

**Distinct pages with Bing impressions at 07-08**: 18. All 18 are blog content; no homepage, /for-*, /calculators, or service pages appear with >0 impressions in the latest snapshot.

---

## 2. Top 15 Queries (2026-07-08 snapshot)

Maximum impressions per query: 4. All are long-tail informational queries. Zero commercial head terms appear.

| Rank | Query | Impressions | Clicks | CTR | Avg Pos | Page slug |
|---|---|---|---|---|---|---|
| 1 | can aia be claimed on second hand assets | 4 | 0 | 0% | 6.0 | can-you-claim-aia-on-second-hand-assets |
| 2 | recruitment agency average gross margin % uk | 3 | 0 | 0% | 8.0 | agency-gross-profit-margin-benchmarks-by-agency-type |
| 3 | average employment agency gross profit percentage | 3 | 0 | 0% | 3.0 | agency-gross-profit-margin-benchmarks-by-agency-type |
| 4 | vat on client entertainment | 3 | 0 | 0% | 8.0 | vat-client-entertainment-agency-uk |
| 5 | is aia available on second hand assets | 2 | 0 | 0% | 7.0 | can-you-claim-aia-on-second-hand-assets |
| 6 | badr calculator growth | 2 | 0 | 0% | 5.0 | badr-cgt-calculator |
| 7 | can you claim capital allowances on private number plates for works vans | 2 | 0 | 0% | 8.0 | capital-allowances-on-vans |
| 8 | can you reclaim vat on client entertaining | 2 | 0 | 0% | 7.0 | vat-client-entertainment-costs-agency-reclaim |
| 9 | claiming aia on van when you buy with company then what to do when selling | 2 | 0 | 0% | 4.0 | capital-allowances-on-vans |
| 10 | can you claim aia on second hand assets | 2 | 0 | 0% | 8.0 | can-you-claim-aia-on-second-hand-assets |
| 11 | aia on refurbished equipment | 2 | 0 | 0% | 2.0 | can-you-claim-aia-on-second-hand-assets |
| 12 | capital allowances on van | 2 | 0 | 0% | 7.0 | capital-allowances-on-vans |
| 13 | annual investment allowance office fit out | 2 | 0 | 0% | 3.0 | capital-allowances-office-fit-out-agency |
| 14 | at what rate are wdas for structures and buildings | 2 | 0 | 0% | 6.0 | writing-down-allowance-rates |
| 15 | can you claim aia and second hand assets | 2 | 0 | 0% | 4.0 | can-you-claim-aia-on-second-hand-assets |

Note: All CTRs are at denominator 2-4, well below the 20-impression suppression floor; shown as indicative only. The highest max impressions for any single query is 4 — an order of magnitude below medical's 6 and two orders of magnitude below generalist.

**Query taxonomy**: Near-exclusively generic tax mechanics (AIA eligibility, VAT on entertainment, capital allowances on vans). Only one query class (`agency gross profit margin`) is agency-specific. Zero queries reference "agency accountant", "creative agency finance", or any professional-services framing.

---

## 3. Top 10 Pages (2026-07-08 snapshot)

| Rank | Page slug | Impressions | Clicks | Queries | Wt. Pos |
|---|---|---|---|---|---|
| 1 | can-you-claim-aia-on-second-hand-assets | 30 | 0 | 20 | 5.9 |
| 2 | vat-client-entertainment-agency-uk | 29 | 0 | 27 | 6.4 |
| 3 | capital-allowances-on-vans | 17 | 0 | 14 | 6.4 |
| 4 | vat-client-entertainment-costs-agency-reclaim | 12 | 0 | 11 | 7.3 |
| 5 | earn-out-tax-treatment-hmrc-agency-sale | 11 | 0 | 11 | 6.1 |
| 6 | agency-gross-profit-margin-benchmarks-by-agency-type | 8 | 0 | 4 | 5.8 |
| 7 | dividend-vouchers-board-minutes-agency-guide | 7 | 0 | 7 | 7.4 |
| 8 | capital-allowances-office-fit-out-agency | 6 | 1 | 5 | 4.3 |
| 9 | capital-allowances-second-hand-vans | 6 | 0 | 6 | 8.5 |
| 10 | badr-cgt-calculator | 5 | 0 | 4 | 6.4 |

The one click on the entire site (07-08 snapshot) came from `capital-allowances-office-fit-out-agency` at weighted position 4.3 — the site's strongest Bing placement. All other top pages: 0 clicks.

**Content-type breakdown**: Top 8 pages are all blog/tax-mechanics posts. No homepage or /for-* landing page has Bing impression data, confirming zero Bing commercial-intent traffic reaching the site's conversion funnel.

---

## 4. Sibling Comparison

| Site | Latest snapshot | Impressions | Clicks | CTR | Queries | Pages | Wt. Pos |
|---|---|---|---|---|---|---|---|
| generalist | 2026-06-29 | 3,795 | 217 | 5.7% | 1,491 | 39 | 5.6 |
| medical | 2026-07-06 | 706 | 70 | 9.9% | 537 | 38 | 5.3 |
| **agency** | **2026-07-08** | **150** | **1** | **0.7%** | **124** | **18** | **6.4** |

**Ratios (agency vs medical, same absolute stage — medical at ~6-7 weeks post IndexNow, agency at similar stage):**
- Impressions: agency 150 vs medical 706 = agency at 21% of medical's level
- Clicks: agency 1 vs medical 70 = agency at 1.4% of medical's click volume
- CTR: 0.7% vs 9.9% = agency CTR is 14x lower than medical
- Queries: 124 vs 537 = agency at 23% of medical query breadth
- Pages: 18 vs 38 = agency at 47% of medical page coverage
- Position: 6.4 vs 5.3 = agency 1.1 positions deeper

**Verdict**: Agency has a Bing presence — it is NOT invisible like a brand-new unindexed site — but it is materially weaker than medical at a comparable stage, and medical itself was the benchmark for "modest but real Bing presence while dead on Google." Agency's 0.7% CTR vs medical's 9.9% is the most diagnostic number: medical's queries map to high-specificity informational needs (locum Form A, NHS pension allowance) where the site's focused answer wins clicks; agency's queries are generic tax mechanics (AIA on second-hand assets, VAT on entertaining) where the site competes against hmrc.gov.uk, accountingweb.co.uk, and tax-specialist sites without a differentiated angle.

---

## 5. Why Agency Bing Lags Medical: Diagnosis

### Factor 1: Query intent mismatch (highest confidence)

Medical's top queries are niche-specific with low-competition supply (who else writes 1,500 words on "locum Form A 2026"?). The site's hyper-specificity wins positions 3-8 on long-tail queries that matter. Agency's top queries — AIA on second-hand assets, VAT on client entertainment — are general HMRC topics where HMRC.gov.uk, AccountingWeb, and chartered-firm knowledge bases dominate. Agency content is indexed and ranking at position 4-8, but the queries are too generic to convert.

### Factor 2: No agency-niche query signal yet (high confidence)

Of 124 distinct queries, only 4 are identifiably agency-niche (`agency gross profit margin`, `earn-out tax`). The remaining 120 are generic capital-allowances/VAT/CGT queries that could land on any SME accountancy site. Medical had a similar breadth expansion but its expanding queries were NHS-pension/locum-specific from the start. Agency is yet to develop a niche-specific long-tail cluster that Bing can route to it exclusively.

### Factor 3: Fewer pages in Bing index (medium confidence)

18 pages vs medical's 38 — agency has half the content footprint visible to Bing. As new blog posts are published and Bing discovers them, the impression trajectory is positive (+552% in 26 days). The 6.4 average position and near-zero CTR suggest content is being indexed but not preferred at commercial intent queries.

### Factor 4: No commercial-intent Bing traffic path (confirmed)

Zero impressions on homepage, /for-agency, /services, or /contact. Medical had the same pattern (zero commercial-page impressions) but compensated with high blog CTR on intent-adjacent queries. Agency has no equivalent.

---

## 6. DDG / Live SERP Visibility

**DDG probe status**: html.duckduckgo.com serving a bot-challenge (anomaly.js, HTTP 202) for all queries. A Puppeteer/Edge-headless approach would bypass this but is outside B2 scope. Bing BWT positions are used as the proxy.

**Inferred Bing head-term positions** (from BWT data — only queries with ≥1 impression visible):
- "agency accountant uk" — NOT in bing_query_data (zero impressions, not indexed for this term)
- "accountant for marketing agency uk" — NOT in bing_query_data
- "accountants for creative agencies" — NOT in bing_query_data
- "agency gross profit margin benchmarks" — present at position ~5.8, impressions 8

Agency does not appear in Bing BWT data for any commercial-intent head term ("agency accountant", "creative agency finance", "marketing agency accountant"). This is the sharpest contrast with medical, which appears at Bing positions 6-8 on "gp accountants" and "locum accountant" despite being invisible on Google.

**site:agencyfounderfinance.co.uk probe**: DDG blocked; Bing BWT shows 18 distinct pages with Bing impressions, confirming Bing has a partial index of the site (blog content). The homepage, /for-*, and calculator pages are not in bing_query_data, suggesting Bing has not yet surfaced them for any query with measurable volume.

---

## 7. Summary Verdict

Agency has an **embryonic but real Bing presence** (150 impressions, 18 pages, 124 queries) that is growing fast (+552% in 26 days). It is NOT dead on Bing in the way that medical was dead on Google. However:

1. CTR is 14x lower than medical (0.7% vs 9.9%) because the queries are generic tax mechanics, not agency-niche specifics.
2. Zero commercial-intent head terms appear in Bing BWT data — the site has no Bing route to "agency accountant"-type buyer queries.
3. The content that is ranking (AIA, VAT on entertainment, capital allowances) is indistinguishable from generalist tax advice and wins no niche authority advantage.
4. The one signal of potential: `agency-gross-profit-margin-benchmarks-by-agency-type` at position 5.8 with 4 distinct queries — a niche data-asset that has no direct HMRC competitor. This is the content archetype that should be scaled.

**Most diagnostic observation**: Medical at comparable stage had 70 clicks on 706 impressions (9.9% CTR) because its content answered niche-specific questions with high precision. Agency has 1 click on 150 impressions because its content answers generic HMRC questions where it has no authority edge. The growth path is clear: more agency-specific data/benchmarks content, fewer generic capital-allowances posts.

---

## 8. Artifacts

- `.cache/agency_diag/bing_segments.json` — snapshot totals, matched-window delta, sibling comparison, top pages/queries
- `.cache/agency_diag/bing_b2.sql`, `bing_b2_topq.sql`, `bing_b2_toppages.sql`, `bing_b2_siblings.sql` — SQL used
- `.cache/agency_diag/ddg_probe.mjs` — DDG probe script (blocked by bot challenge)
- This file: `docs/agency/bing_read.md`
