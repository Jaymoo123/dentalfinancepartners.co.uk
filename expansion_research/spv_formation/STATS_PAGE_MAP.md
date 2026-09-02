# Statistics-Shaped Page Map, UK SPV Incorporation Index (Property)

Date: 2026-09-02. Host: Property Tax Partners. Index hub: `/research/landlord-tax-index`
(live, titled "UK SPV Incorporation Index"), listed from `/research`.

## Method note

**Sources read**

- `demand_corpus.csv` (9,762 keywords), `questions_corpus.csv` (1,700 questions),
  `our_queries.csv` + `OUR_DEMAND.md` (GSC + Bing, window 2026-06-03 to 2026-09-01).
- `PAGE_MAP.md` section 9 (the ten documented cannibalisation seams) and `page_map.csv` (51 units).
- Live corpus: 798 files in `Property/web/content/blog/`, plus root routes under
  `Property/web/src/app/` (`/research`, `/research/landlord-tax-index`, `/spv-company`,
  `/incorporation`, `/section-24`).
- Index datasets: `Property/web/src/data/landlord-tax-index.json` and the shape declared in
  `src/lib/research/landlord-index.ts`.

**Fresh pull**: DataForSEO `keywords_data/google_ads/search_volume/live`, UK (location 2826),
English, 110 deduplicated keywords, one call. **Actual spend $0.09** against a $5 cap. Cost-tracked
through `CostTracker` into `api_cost_log`. No autocomplete expansion was bought: the returned rows
already showed the volume floor clearly and a second paid call would not have changed a verdict.

**The single most important finding, stated up front.** The existing corpora are formation-and-tax
shaped and carry almost no statistics intent. A statistics regex over all 9,762 demand keywords
returns 27 rows, of which **zero** are property-market statistics (they are tax-rate and
tax-threshold lookups such as "vat percentage uk" and "dividend tax rates 2026/27"). The same regex
over 1,700 questions returns 7 rows, all false positives (SIC-code lookups, Indian corporate-office
queries). Our own GSC/Bing set contains exactly one genuine statistics query,
`uk property investors companies house spv limited company incorporation statistics` (15
impressions, no page attributed). So the corpora could not price this cluster, and the fresh pull is
the whole volume evidence base. That is a real result, not a gap: this cluster is being built for
answer capture, not for a measured Google head term.

**What the fresh pull actually showed** (top rows, UK monthly):

| Keyword | Volume |
|---|---:|
| average house price uk | 9,900 |
| average rent uk | 1,600 |
| landlords selling up | 260 |
| how many landlords in the uk | 140 |
| average rental yield uk | 140 |
| how many limited companies in the uk | 110 |
| how many rental properties in the uk | 70 |
| landlord exodus | 70 |
| how many landlords are selling up | 50 |
| how many companies are registered in the uk | 50 |
| how many landlords are there in the uk / landlords leaving the market / landlord exodus uk | 40 each |
| number of landlords in the uk / companies house statistics | 20 each |
| buy to let statistics, landlord statistics uk, private rented sector statistics, uk rental market statistics, buy to let mortgage statistics and 8 others | 10 each |

**83 of 110 keywords returned no volume row at all**, including every incorporation-specific
statistics phrasing ("how many buy to let limited companies", "landlord incorporation statistics
uk", "company incorporations by sic code"), every dissolution phrasing, every year-stamped phrasing,
and **all 16 regional variants without exception**. Under the locked stance that is not a reason to
skip them, but it is the reason the regional decision below goes one way and not the other.

**Volume caveat.** Google Ads volumes are rounded and a null row means "below the reporting floor",
not "nobody searches this". Never size traffic off these figures. Our own GSC once a page is live is
the honest next source.

---

## Unit table

Volume is the fresh UK monthly figure for the dominant query; `0/n.a.` means no row returned.
"Our position" is from `OUR_DEMAND.md` (GSC + Bing, through 2026-09-01).

| Unit | Working title | Dominant query + variants | Vol | Our position | Verdict | Dataset | Angle (the number that leads) |
|---|---|---|---:|---|---|---|---|
| **S1** | How Many Buy-to-Let Limited Companies Are There in the UK? | `how many buy to let limited companies` · how many limited company landlords uk · how many property companies in the uk · how many spvs in the uk · number of property companies uk | 0 (family: 140 "how many landlords in the uk", 110 "how many limited companies in the uk") | none | **NEW** | Total live stock + age profile | The live count of property companies on the register today, split by SIC, against the 94,367 incorporated in the last twelve months. Stock, not flow, is the number nobody else publishes. |
| **S2** | Monthly incorporation cadence + record month (hub section) | `how many new property companies are formed each month uk` · property company incorporations uk · company incorporation statistics uk · when did buy to let incorporations peak | 0 | hub is live, unranked (new surface) | **EXTEND** `/research/landlord-tax-index` | Monthly + annual by SIC | Peak month and its value (2025-09, 6,632) as a named record, plus the latest settled month, as an explicit Q&A block. The hub already renders the series; it does not yet answer the question in question form. |
| **S3** | Are Landlords Really Leaving? The Net Formation Data | `landlords selling up` · landlord exodus · landlords leaving the market · how many landlords are selling up · landlord exodus uk · are landlords leaving the uk market · buy to let decline | **260** (+70 +50 +40 +40) | none | **NEW** | Dissolutions + net formation monthly | Net formation (incorporations minus dissolutions) month by month. The exodus story is told everywhere with survey data and nowhere with register data. If net formation is still positive, that single number contradicts the entire genre. |
| **S4** | Property company dissolutions, how many close each year | `how many property companies dissolved` · company dissolutions uk statistics · companies house dissolution statistics | 0 | none | **FAQ-block** on S3 (`landlord-exodus-net-formation-data`) | Dissolutions monthly | Same dataset, same query family as S3. A separate page would split its own signal on day one. |
| **S5** | Where Property Companies Are Being Formed: The Regional Split | `regional buy to let statistics uk` · where do landlords buy property uk · property investment by region uk · landlords in london statistics · buy to let statistics scotland | 0 (all 16 regional variants null) | none | **NEW** (ONE roundup) | Regional split, 12 ITL1, last 36 months, as shares | Each region's share of UK property-company formations and how those shares moved over 36 months. Shares, never counts, because the CH regional extract is survivorship-biased and the caveat must be structural, not a footnote. |
| **S6** | Twelve per-region pages | (as S5, region-qualified) | 0 | n.a. | **KILL** | n.a. | Checked, not assumed: 16 region-qualified statistics phrasings were priced and **every one returned null**. There is no region-qualified demand to justify twelve thin pages off one survivorship-caveated table, and twelve near-identical pages off one dataset is exactly the doorway pattern the quality bar forbids. Revisit only if S5 earns region-qualified queries in GSC. |
| **S7** | How Long Do UK Property Companies Last? | `how long do limited companies last` · average age of a limited company uk · average age of a property company · how old are uk property companies | 0 | none | **NEW** | Age profile by incorporation year + live stock | The age profile of live property companies: what share were incorporated in the last three years, and the median vintage. Directly counters "everyone is winding up" with the surviving cohort's own age distribution. |
| **S8** | What percentage of landlords use a limited company | `what percentage of landlords use a limited company` · what percentage of buy to lets are in limited companies | 0 | none | **KILL** | n.a. | The numerator is ours; the denominator (total UK landlords) is not, and would have to be Hamptons' or the English Housing Survey's. A page whose headline ratio is built on someone else's denominator fails the "lead with a number we publish" rule. Answer it inside S1 as a caveated sentence with the external source named, not as a page. |
| **S9** | Which SIC code property companies actually use, with counts | `sic code 68209 companies` · how many companies use sic code 68209 · company incorporations by sic code · sic code 68100 vs 68209 | 0 | `sic-code-for-an-spv-property-company` is a built Track B page | **EXTEND** `sic-code-for-an-spv-property-company` | Monthly + annual by SIC | Add the counts: how many companies chose 68209 versus 68100 versus 68320 last year. The page currently tells you which code to pick and cannot tell you what everyone else picked. That is the whole value of having the data. Do not turn it into a statistics page; one data section plus a link to the hub. |
| **S10** | How many SPVs are there in the UK | `how many spvs in the uk` · spv statistics uk · how many property spvs uk | 0 | `spv-property-investment-special-purpose-vehicle-guide` ranks Bing 6.5-7.6 on `spv`, `what is an spv company`, `spv for property portfolio` | **FAQ-block** on `spv-property-investment-special-purpose-vehicle-guide` | Total live stock | Our best-ranking SPV asset gets the count as one FAQ answer plus a link to S1. Building a second "how many SPVs" page would attack a page already at position 6.5 on Bing, the exact mistake PAGE_MAP seam 9 warns about. |
| **S11** | UK private rented sector / buy-to-let market size | `private rented sector statistics` · uk rental market size · buy to let market size uk · how many rental properties in the uk | 10 (70 on the rental-properties phrasing) | none | **KILL** | n.a. | The index counts companies, not dwellings or tenancies. Every number on this page would be ONS or MHCLG restated. Real volume, wrong asset. |
| **S12** | Average portfolio size, yields, landlord earnings | `average rental yield uk` (140) · average buy to let portfolio size · how much do landlords earn uk · average landlord age uk | 140 | `property-investment-benchmarks-uk-2026-good-yield`, `what-is-good-gross-yield-buy-to-let-property-2026`, `rental-yield-vs-roi-property-investors-uk` already live | **KILL** | n.a. | Two kills in one: the index holds no yield, rent or portfolio data, and three live pages already own the yield intent. Highest-volume tempting family in the pull, and the one with the least right to a data page. |
| **S13** | Do Landlords Incorporate When House Prices Fall? | `is buy to let still profitable statistics` · buy to let market 2026 · property incorporation trend · incorporations vs house prices | 0 | none | **NEW** | Monthly incorporations + house-price context series | Both series on one axis over 130 months, with the correlation stated plainly. The house-price series is context (ours only in the sense that we plot it), so the leading number must be ours: the incorporation series and the turning points in it. |
| **S14** | What Section 24 Actually Did to Company Formations | `section 24 impact statistics` · how many landlords affected by section 24 · buy to let incorporation statistics · landlord incorporation statistics uk | 0 | `/section-24` pillar plus ~25 Section 24 posts live, **none carries formation data** | **NEW** | Annual incorporations by SIC, 2016 onward | 19,688 in 2016 to 68,725 in 2025 on SIC 68209, a 3.5x rise (union 33,007 to 94,915) across the exact window the restriction phased in. The Section 24 estate argues the mechanism; no page on it has ever measured the response. Must not restate the relief mechanics, link up to `/section-24` for those. |
| **S15** | UK Landlord and Buy-to-Let Company Statistics 2026 | `buy to let statistics` · landlord statistics uk · landlord statistics · buy to let statistics uk · landlord statistics 2026 · uk rental market statistics · companies house statistics | 10 (+10 +10 +10 +20) | none | **NEW** | All index datasets | The citable roundup: every headline figure with its own anchor, its date, and its source line. This is the link-magnet unit and the one journalists land on. It summarises and links, it never re-argues the hub. |
| **S16** | How to Cite the UK SPV Incorporation Index | `uk property company data` · companies house data property companies · uk incorporation data by sic code · property incorporation index | 0 | none | **NEW** | Meta, plus the JSON endpoint at `/research/landlord-tax-index/data` | Journalist-facing: methodology in plain English, the settlement lag and provisional-month rule, the survivorship caveat on regional data, a copy-paste citation line, and the machine-readable endpoint. Required by the brief and the cheapest unit here. |
| **S17** | Is buy to let dying? | `is buy to let dying` · buy to let decline · is buy to let still worth it | 0 | `should-i-incorporate-buy-to-let-portfolio-2026` live | **FAQ-block** on `should-i-incorporate-buy-to-let-portfolio-2026` | Net formation | Decision intent wearing a statistics verb. Answer it in one FAQ entry on the decision page with the net-formation number and a link to S3. A page here would split S3. |
| **S18** | How many limited companies are there in the UK | `how many limited companies in the uk` (110) · how many companies are registered in the uk (50) | 110 | none | **KILL** | n.a. | Highest-volume statistics phrasing in the whole pull and entirely off-niche. The index counts four property SIC codes, not the register. Answering it means restating Companies House's own headline for an audience that will never become a lead. |

**Totals: 8 NEW, 2 EXTEND, 3 FAQ-block, 5 KILL (18 units).**

---

## Cannibalisation seams this map creates

Inherited discipline from `PAGE_MAP.md` section 9. Four new seams, each with the rule that keeps it open.

1. **S15 roundup vs `/research/landlord-tax-index`.** The highest-risk seam here, both want "the
   numbers". The hub owns the charts, the trend argument and the methodology. S15 owns the
   citable list: figure, date, source, anchor link. If S15 starts arguing what the trend means, it
   eats the hub.
2. **S1 (stock) vs S2/hub (flow).** How many exist versus how many were formed. Both quote counts.
   S1 must never lead with a twelve-month formation figure and the hub must never lead with stock.
3. **S3 vs S14.** Both read the formation series. S3 is forward-looking and reads dissolutions
   (are they leaving now); S14 is historical and reads annual incorporations (what the 2016-2021
   restriction did). S14 must not use the word exodus.
4. **S5 vs `btl-investment-plymouth-cardiff-landlord-hotspots`.** The live page is an after-tax
   yield comparison for two cities. S5 is share of company formations by ITL1 region. No yield
   figures on S5, no formation figures on the hotspots page.

Plus one inherited protection: **nothing in this map may target SDLT-on-transfer or the transfer
how-to.** `sdlt-transfer-property-company-cost` and `how-to-transfer-property-into-limited-company-uk`
rank 1.5-3.9 and stay untouched.

---

## Build recommendation

Eight NEW units, in this order. The ranking is measured demand first, then citation leverage, then
coverage.

1. **S3, Are Landlords Really Leaving? The Net Formation Data.** The only unit with real measured
   demand: 260 + 70 + 50 + 40 + 40 across five phrasings, and every one of them is currently
   answered by survey PR rather than register data. Net formation is the single most defensible
   original number the index holds.
2. **S1, How Many Buy-to-Let Limited Companies Are There in the UK.** The literal question, sitting
   next to a 140/mo neighbour and a 110/mo neighbour, and the number the whole index exists to
   produce. Also the natural link target for S10's FAQ block.
3. **S16, How to Cite the Index.** Cheapest unit on the list and it is what turns the other seven
   into citations. Ship it early so every page built after it has somewhere to point.
4. **S15, UK Landlord and Buy-to-Let Company Statistics 2026.** The roundup. Measured volume is thin
   (10-20/mo per phrasing) but this is the shape journalists and answer engines land on, and it is
   the page that carries the anchors S16 asks people to cite.
5. **S5, The Regional Split.** One page, not twelve. New dataset, no existing page anywhere near it,
   and it makes the index answer a question the national series cannot.
6. **S13, Do Landlords Incorporate When House Prices Fall?** The most interesting read in the data
   and the most linkable, but zero measured demand and it needs the correlation to actually hold.
   Build it after S5 so the finding can be checked before it is written.
7. **S14, What Section 24 Actually Did.** Strong angle, but it sits beside 25 live Section 24 pages
   and needs the tightest de-cannibalisation brief of the eight. Sequence it late so the seam rule
   is written against pages that already exist.
8. **S7, How Long Do UK Property Companies Last?** Pure coverage. Zero volume, genuinely original,
   and the cheapest of the remaining datasets to write once the age profile is published.

Then the two EXTENDs (S2 on the hub, S9 on the SIC page) and the three FAQ-blocks (S4, S10, S17),
which are section-level edits rather than builds and can ride any later deploy.

**One decision needed.** S13 and S14 both assume the published snapshot carries dissolutions,
regional, age-profile and live-stock data. The renderer and its types already support all four, but
the committed snapshot (`landlord-tax-index.json`, generated 2026-06-09) contains only
incorporations and house prices. Confirm the full generator has been run before S3, S5 or S7 are
briefed, or those three have no numbers to lead with.
