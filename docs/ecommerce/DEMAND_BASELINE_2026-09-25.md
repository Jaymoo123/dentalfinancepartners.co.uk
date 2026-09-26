# Ecommerce Finance: search-demand baseline (data through 2026-09-25)

Site: www.ecommercefinance.co.uk. Live since 2026-07-16, so this baseline covers
roughly 10 weeks of history, not a full 90/91-day window (both APIs were asked
for 90/91 days; both returned data only from the live date forward). This is
the baseline for the blog expansion programme, not a mature-site read.

All figures below are fresh API pulls run 2026-09-25, not the `gsc_query_data`
Supabase table (that table is sampled and undercounts by roughly 20x per house
rule and must never be summed for a total).

## Instruments

| Source | Call | What it gave | Window | Pulled |
|---|---|---|---|---|
| GSC | `searchanalytics.query`, dims=`["date"]` | Unsampled site totals + daily trend | 2026-06-27 to 2026-09-25 (data from 2026-07-16) | 2026-09-25 |
| GSC | `searchanalytics.query`, dims=`["query"]`, rowLimit 25000 | Every query with clicks/impressions/position | same | 2026-09-25 |
| GSC | `searchanalytics.query`, dims=`["page"]`, rowLimit 25000 | Every page with clicks/impressions/position | same | 2026-09-25 |
| GSC | `searchanalytics.query`, dims=`["query","page"]`, rowLimit 25000 | Query x page detail, top 200 by impressions used below | same | 2026-09-25 |
| Bing | `GetRankAndTrafficStats(siteUrl)` | Site-level daily clicks/impressions (true total) | 2026-07-17 to 2026-09-23 (69 days returned) | 2026-09-25 |
| Bing | `GetQueryStats(siteUrl)` | Top-N query list, NOT a total | data through ~2026-09-25 | 2026-09-25 |
| Bing | `GetPageStats(siteUrl)` | Per-page query breakdown for pages Bing has data on | data through ~2026-09-25 | 2026-09-25 |

Property used: GSC `sc-domain:ecommercefinance.co.uk`, Bing
`https://ecommercefinance.co.uk` (resolved via `GetUserSites`). All calls
succeeded; no API errors to report.

## Totals

### Google Search Console, unsampled, date-only dimension

Window 2026-06-27 to 2026-09-25 (71 days with rows, site went live 2026-07-16):

- Clicks: **30**
- Impressions: **8,776**
- CTR: **0.34%**
- Impression-weighted average position: **29.6**

Weekly trend (ISO week number, 2026):

| Week | Clicks | Impressions |
|---|---|---|
| 29 | 0 | 105 |
| 30 | 0 | 348 |
| 31 | 1 | 589 |
| 32 | 3 | 614 |
| 33 | 3 | 643 |
| 34 | 6 | 768 |
| 35 | 4 | 885 |
| 36 | 3 | 1,145 |
| 37 | 4 | 1,596 |
| 38 | 4 | 1,520 |
| 39 (partial, to 09-25) | 2 | 563 |

Impressions are climbing steadily week over week (105 to 1,596 at the wk37
peak); clicks are not, because average position sits at 29.6, mostly page 2-3.
This is the shape of a site that is being crawled and indexed well but is not
yet competitive on the terms it is showing for.

### Bing Webmaster Tools, `GetRankAndTrafficStats` (true site total)

Window 2026-07-17 to 2026-09-23 (69 days returned):

- Clicks: **6**
- Impressions: **405**
- CTR: **1.48%**

Weekly trend:

| Week | Clicks | Impressions |
|---|---|---|
| 29 | 0 | 0 |
| 30 | 0 | 2 |
| 31 | 0 | 22 |
| 32 | 0 | 34 |
| 33 | 1 | 15 |
| 34 | 0 | 28 |
| 35 | 2 | 29 |
| 36 | 0 | 46 |
| 37 | 1 | 68 |
| 38 | 2 | 105 |
| 39 (partial) | 0 | 56 |

Bing impression volume is roughly 5% of Google's for this site (405 vs 8,776),
but Bing's CTR is over 4x higher and, as the divergence section below shows,
the average position on queries Bing does surface is far better than Google's.
Bing simply has not discovered as much of the query space yet for this
specific new domain; where it has, it ranks the pages well.

### Bing `GetQueryStats` (top-N only, NOT a site total)

185 rows returned. Summed for reference only (never treat as a total per house
rule): 220 impressions, 6 clicks, impression-weighted avg position **6.0**.
This top-N list is a different (and much smaller) sample than
`GetRankAndTrafficStats`, so its sum understates the true Bing total; use
`GetRankAndTrafficStats` above for the real totals.

## Query coverage

- GSC distinct queries returned (dimension=query, 90d, rowLimit 25000): **310**
- Bing `GetQueryStats` distinct queries (top-N, not exhaustive): **182**
- Sum of clicks/impressions across the 310 GSC query rows: 2 clicks / 3,448
  impressions, well below the date-only total (30 clicks / 8,776 impressions).
  This gap is expected GSC behaviour, not a data error: Google anonymises and
  omits very low-volume, PII-risk or rare queries from the query dimension
  while still counting them in the date-only total. Absence of a query here
  from the total is a known artefact, not a finding.

## Subjects (grouped by meaning, ranked by impressions)

GSC 90-day window, 310 queries grouped into subjects:

| Subject | Impressions | Clicks | # queries | Avg position (impr-weighted) |
|---|---|---|---|---|
| IOSS/OSS EU VAT schemes | 2,037 | 1 | 125 | 51.0 |
| Ecommerce accountant / brand-adjacent | 263 | 0 | 14 | 77.4 |
| SIC code 47910 / company classification | 178 | 1 | 19 | 11.2 |
| General ecommerce VAT | 162 | 0 | 25 | 62.6 |
| eBay seller tax / HMRC letters | 136 | 0 | 12 | 42.3 |
| Amazon seller accounting / FBA | 118 | 0 | 20 | 67.7 |
| Etsy seller tax / HMRC | 76 | 0 | 8 | 57.0 |
| GBP135 import threshold / postponed VAT | 71 | 0 | 8 | 62.0 |
| Print-on-demand tax | 54 | 0 | 2 | 14.6 |
| Shopify seller accountants | 44 | 0 | 6 | 85.4 |
| Calculators (revenue / take-home / side hustle) | 21 | 0 | 4 | 71.3 |
| MTD for online sellers | 5 | 0 | 4 | 71.8 |
| Company-name lookups (research-index bleed-through) | 5 | 0 | 4 | 20.6 |
| Long-form conversational / AI-style queries | 36 | 0 | 3 | 18.2 |
| Other / uncategorised | 242 | 0 | 56 | 58.7 |

"IOSS/OSS EU VAT schemes" dwarfs every other subject: 2,037 of 3,448 grouped
impressions (59%) on 125 distinct queries, and it is the exact subject the
site's `/vat/ioss-vs-oss` page and `services/selling-into-the-eu` page already
target. It is also the subject with the widest ranking dispersion: some IOSS
queries sit at position 11-30 (see next section), most sit past position 40.

Two subjects worth flagging on inspection rather than treating as demand:

- **Company-name lookups**: queries like "voltstore ltd" or quoted turnover
  figures land on the site because `/research/online-seller-index` and
  `/research/online-seller-survival-index` index real company names. This is
  not blog-expansion demand, it is research-tool bleed-through. Exclude it
  from the competitor-discovery seed.
- **Long-form conversational / AI-style queries** ("what kinds of systems
  integrate sales, refunds, and marketplace fees to calculate registration
  thresholds accurately across entities?", "how are vat compliance solutions
  typically priced for platforms") read as either AI-crawler probing traffic
  or genuine emerging conversational search. Position 7-20 on these is
  unusually good for a brand-new site; worth a manual GSC spot-check before
  reading them as reliable demand, but not fabricated, they are in the raw
  pull.

## Eligible but not winning (position 11-30, zero clicks)

33 queries, 609 impressions total, sit at position 11-30 with zero clicks,
meaning Google is already showing the site for these terms but not high
enough to earn a click. Top ones:

| Query | Impressions | Position |
|---|---|---|
| ioss intermediary uk | 181 | 24.7 |
| difference between ioss and oss | 77 | 22.6 |
| difference between oss and ioss | 68 | 24.7 |
| oss ecommerce | 64 | 24.3 |
| 47910 sic code | 43 | 18.1 |
| ioss vs oss | 39 | 21.4 |
| print on demand taxes | 28 | 13.1 |
| print on demand sales tax | 26 | 16.3 |
| sic code 47910 | 18 | 17.8 |
| oss ioss difference | 9 | 26.6 |
| 135 threshold | 7 | 24.3 |
| oss registration uk | 7 | 25.0 |
| ioss vat intermediary | 6 | 23.7 |

This is almost entirely the IOSS/OSS subject again (the "difference between
X and Y" comparison-intent queries in particular), plus the two print-on-demand
queries and the SIC-code pair. These are the cheapest wins in the whole
dataset: the site already ranks close enough that a stronger, more
comparison-shaped page (or an FAQ/table treatment) is more likely to move the
needle than a brand-new page would be.

## Pages carrying the impressions

44 distinct URLs returned any GSC data. The site has roughly 39 core content
routes (1 home, 14 blog posts + 6 blog/category or section index pages, 5 vat
pages, 4 services pages, 4 "for" pages, 3 calculators, 2 research pages, plus
utility pages), so coverage is broad, but concentration is heavy: two pages
account for 3,289 of the 44-page total of roughly 6,057 impressions summed
across all pages (54%).

Top pages by impressions:

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| /research/online-seller-index | 1,675 | 7 | 8.2 |
| /vat/ioss-vs-oss | 1,614 | 1 | 34.0 |
| /services/selling-into-the-eu | 1,064 | 0 | 78.4 |
| /vat/135-import-rule | 915 | 0 | 9.6 |
| /blog/amazon-and-marketplace-selling/etsy-fees-vat-and-tax | 500 | 2 | 11.1 |
| /blog/platform-reporting-and-hmrc-letters/ebay-tax-rules-uk | 368 | 2 | 13.4 |
| /blog/amazon-and-marketplace-selling/print-on-demand-tax-uk | 302 | 6 | 7.7 |
| /blog (listing) | 275 | 0 | 62.3 |
| /services/ecommerce-vat-compliance | 274 | 0 | 64.8 |
| /vat/deemed-supplier-establishment | 263 | 6 | 14.6 |
| /services/hmrc-letter-online-sales | 226 | 3 | 29.3 |
| /about | 219 | 0 | 85.2 |
| /vat/vat-on-marketplace-fees | 172 | 0 | 10.9 |
| /for/amazon-sellers | 163 | 0 | 56.4 |
| /blog/.../trading-allowance-online-sellers | 159 | 0 | 8.9 |

`/research/online-seller-index` is the single strongest page (position 8.2,
7 of the site's 30 total clicks), which matches the estate pattern that
data/research assets outperform ordinary content pages.

### Pages with zero recorded impressions

Checked against the site's actual route data (`src/data/for.ts`, `services.ts`,
`vat.ts`, and the 14 blog post frontmatter files):

- `/blog/business-structure-and-tax/online-seller-survival-odds`
- `/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules`
- `/for/marketplace-sellers`
- `/for/dropshippers`

All four are genuinely absent from both the GSC page-dimension pull and the
query+page pull; this is a question for the next agent (are these recently
published, deindexed, or orphaned from internal linking), not a conclusion in
itself, per house rule that absence of data is a question.

## Google vs Bing divergence

The two engines return **zero exact-text overlap**: none of the 310 GSC
queries match any of the 182 Bing `GetQueryStats` queries by exact text. This
itself is a finding, not a data problem, both pulls succeeded and returned
real, non-empty query sets; the two engines are simply surfacing the page for
different literal search strings, so there is no shared query to compute a
side-by-side position delta on.

What can be compared instead is impression-weighted average position across
each engine's own query set:

- Google (GSC, date-only totals, 8,776 impressions): **29.6**
- Bing (`GetQueryStats` top-N, 220 impressions): **6.0**

Google's own competitive queries are short head terms ("ioss intermediary",
"ioss uk", "ecommerce finance") where the site is new and outranked. Bing's
query set is longer and more conversational ("hmrc trading allowance £1000
online selling freelance", "if hmrc decides you need to pay tax on £5000 on
ebay personal sales what tax rate") and, on that different long-tail set, the
site already ranks in the top 10 on average. This matches the estate-wide
pattern noted in memory (Bing consistently outranks Google on this estate),
but the mechanism here looks different from other sites: it is not the same
queries ranking better on Bing, it is that Bing is finding the site for a
different, longer-tail query set entirely and ranking well on that set, while
Google is finding it for the harder head terms and ranking it low. Confirm
this reading with a second pull once more weeks of data exist; 69-91 days on a
10-week-old site is a thin sample for either engine's query-discovery
behaviour.

## Surprises worth flagging

1. GSC's own query-dimension rows sum to a fraction of its date-only totals
   (3,448 of 8,776 impressions, 2 of 30 clicks). This is documented GSC
   anonymisation behaviour, but is worth naming so nobody mistakes 3,448 for
   the site total later.
2. Zero query-text overlap between Google and Bing on a 10-week-old site is a
   larger gap than expected; worth re-checking on the next baseline once
   Bing's `GetQueryStats` window has more data to discover more of the same
   short head terms Google is already surfacing.
3. `/research/online-seller-index` outperforms every VAT/compliance content
   page on impressions and clicks despite the estate's core demand (per the
   subject table) being IOSS/OSS, not company-research lookups.
4. Two blog posts and two "for" pages show literally zero impressions on a
   site with otherwise broad page-level coverage; worth checking indexation
   before assuming it's simply immaturity.

## Seed queries for competitor discovery

Top 60 GSC queries by impressions (90-day window, data through 2026-09-25),
one per line, garbage/bot-format strings and pure company-name lookups
excluded:

- ioss intermediary
- ioss intermediary uk
- ecommerce finance
- ioss registered intermediary risk
- ioss vat
- ioss uk
- difference between ioss and oss
- oss uk
- import one stop shop
- difference between oss and ioss
- ioss and oss
- etsy hmrc
- oss ecommerce
- register for ioss eu
- ioss vat scheme explained
- oss e commerce
- e-commerce finance
- simplified import vat accounting
- 47910 sic code
- ioss eu vat
- 47910
- ioss vs oss
- fba accounting
- hmrc letter ebay
- ecommerce tax compliance
- ioss number uk
- eu shipping with ioss
- hmrc ebay letter
- ecommerce accountants
- ioss scheme
- what is oss
- amazon fba accounting
- eu ioss registration
- hmrc letter ebay sales
- print on demand taxes
- ecommerce vat
- ioss
- ioss registration
- ioss registration uk
- print on demand sales tax
- deemed supplier rules
- ebay hmrc letter
- ecommerce business taxes
- import one stop shop vat
- shopify sellers accountant
- 47910 - retail sale via mail order houses or via internet
- eu vat ioss
- oss vat uk
- ecommerce accountant uk
- ecommerce sales tax
- e-commerce accountants liverpool
- eu ioss
- ioss ecommerce
- sic code 47910
- vat oss
- vat on ecommerce sales
- ecommerce tax
- ioss for us sellers
- your 2025 digital sales report has been corrected
- e commerce vat registration
