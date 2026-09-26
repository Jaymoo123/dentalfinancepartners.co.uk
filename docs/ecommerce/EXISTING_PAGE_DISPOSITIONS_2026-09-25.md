# Ecommerce Finance: existing-page dispositions (data through 2026-09-23)

What to do with the pages the site already has, based on what they measurably
earn. This is the rewrite/extend half of the content programme. The net-new
half is planned separately and is capped at 50 to 60 assets; every keyword
absorbed here is an asset that half does not have to write.

**The headline finding is not what the brief expected.** The site is not
"eligible but losing on merit" across the board. It is crawl-starved. Google
has never discovered four of its 33 pages, and 18 of the 29 it has indexed
were last crawled on 16 or 17 July 2026, the week the site launched, and have
not been recrawled since. That is measured, not inferred: see the Instruments
table and the crawl-state column.

---

## 1. Instruments

Every figure in this document names the call that produced it. No figure is
read from the `gsc_query_data` or `bing_query_data` Supabase tables, which are
sampled and undercount by roughly 20x per house rule.

| Source | Exact call | What it gave | Window / data-through | Pulled |
|---|---|---|---|---|
| GSC | `searchanalytics.query`, `siteUrl=sc-domain:ecommercefinance.co.uk`, `dimensions=["date"]` | Unsampled site totals: 30 clicks, 8,776 impressions, avg position 29.6 | 2026-06-26 to 2026-09-25 requested, rows returned 2026-07-16 to **2026-09-23** | 2026-09-25 |
| GSC | same, `dimensions=["query"]`, `rowLimit=25000` | 310 distinct queries with clicks, impressions, position | same | 2026-09-25 |
| GSC | same, `dimensions=["page"]`, `rowLimit=25000` | 44 URLs with data | same | 2026-09-25 |
| GSC | same, `dimensions=["query","page"]`, `rowLimit=25000` | 364 query x page rows. This is the per-URL query set the brief asked for | same | 2026-09-25 |
| GSC | `urlInspection.index.inspect`, one call per URL, 34 URLs | Per-URL verdict, coverageState, lastCrawlTime, googleCanonical vs userCanonical. **This is what settled the four zero-impression routes** | live index state at call time | 2026-09-25 |
| Bing | `GetRankAndTrafficStats(siteUrl=https://ecommercefinance.co.uk)` | True site total: 6 clicks, 405 impressions over 69 daily rows | 2026-07-17 to **2026-09-23** | 2026-09-25 |
| Bing | `GetQueryStats(siteUrl)` | 185 top-N rows. **Never summed as a site total** (house trap). Sum shown for reference only: 220 impressions, 6 clicks | data through ~2026-09-25 | 2026-09-25 |
| Bing | `GetPageStats(siteUrl)` then `GetPageQueryStats(siteUrl, page)` per URL | 57 per-date page rows across 17 URLs, and the query set behind each | data through ~2026-09-25 | 2026-09-25 |
| DataForSEO | `POST /v3/serp/google/organic/live/regular`, `location_code=2826`, `language_code=en`, `device=desktop`, `depth=10`, 5 keywords | Live UK top-10 for the five biggest IOSS and OSS queries | live at call time | 2026-09-25 |

DataForSEO spend this run: **$0.0100**, against the under-$1 budget.

Clients used: `agents/utils/gsc_client_oauth.py` `GSCClient` (the same OAuth
client `optimisation_engine/clients/gsc_query_client.py` wraps; the fetcher's
Supabase upsert path was deliberately not used) and
`optimisation_engine/clients/bing_query_client.py` `BingWebmasterClient._call`.

**Caveat on the GSC query dimension, stated so nobody mistakes it for a
total.** The 310 query rows sum to 3,448 impressions and 2 clicks against the
date-only total of 8,776 and 30. That gap is Google's documented anonymisation
of low-volume queries, not a data error. Per-URL query attribution below is
therefore a floor, not a complete picture.

---

## 2. The finding that reframes everything: crawl state

`urlInspection` on all 33 content routes plus `/for` and `/services`:

| Crawl state | Count | Which |
|---|---|---|
| Never crawled ("URL is unknown to Google") | **4** | the four zero-impression routes |
| Indexed, last crawled 16 to 17 July 2026 (launch week, never since) | **18** | including `/vat/ioss-vs-oss`, `/vat/deemed-supplier-establishment`, all four `/services/*`, `/for/shopify-sellers`, and 8 of the 14 blog posts |
| Indexed, recrawled since 27 July 2026 | **11** | homepage, `/vat/135-import-rule`, `/vat/vat-on-marketplace-fees`, `/vat/postponed-vat-margin-scheme`, both research pages, 3 blog posts, 1 calculator, `/vat` and `/for` index pages |

Two consequences the writer and the net-new planner both need:

1. **A rewrite cannot be graded on a page Google last looked at on 17 July.**
   Any rewrite of one of those 18 pages needs a recrawl to be seen at all.
   Submitting them for indexing is a deploy-time action and is owner-triggered,
   so it is named here as a dependency, not done.
2. **`/services` and `/vat` index pages are still telling Google they are
   duplicates of the homepage.** `urlInspection` returns
   `googleCanonical=/services`, `userCanonical=/` for `/services`, and the
   same shape for `/vat`. Commit `286365a8` fixes this and is committed but not
   deployed. `/for` shows the same on a crawl dated 2026-07-31. This has been
   live for the whole 91-day window and is the most plausible reason crawl
   equity has not flowed from those hubs to their children.

---

## 3. Disposition table

33 content routes: 1 homepage, 5 `/vat`, 4 `/services`, 4 `/for`, 3
calculators, 2 research, 14 blog posts. Index/listing pages (`/blog`,
`/services`, `/for`, `/vat`, `/research`, `/calculators`) and legal/utility
pages are outside the 33 and are handled in section 6, except `/about`, which
is listed as a flagged extra because it earns 219 impressions on the site's
most commercial query cluster while being a 99-word stub.

**REWRITE threshold, stated and defended:** at least 100 GSC impressions in
the 91-day window AND an impression-weighted average position worse than 10.
100 impressions is the level at which a page has enough query evidence to
drive a rewrite outline at all (the site's median page earns 36), and position
worse than 10 means it is not already winning. Seven pages clear both bars.
Pages earning 100 or more impressions at position better than 10 go to EXTEND
or LEAVE, because the problem there is coverage or snippet, not the page.

Columns: G = Google, B = Bing. "Bing impr" is the sum of `GetPageStats`
per-date rows for that URL, which is a page-level total, not a site total.

| URL | G impr | G clicks | G avg pos | Bing impr | Top query it is eligible for (impr, pos) | Crawled | Disposition | Reason |
|---|---|---|---|---|---|---|---|---|
| `/vat/ioss-vs-oss` | 1,614 | 1 | 34.0 | 0 | ioss intermediary uk (172, 22.7) | 07-17 | **REWRITE** | Biggest page on the site is eligible for a service query ("intermediary") it does not serve, and splits that query with `/services/selling-into-the-eu` |
| `/services/selling-into-the-eu` | 1,064 | 0 | 78.4 | 7 | ioss intermediary (133, 81.9) | 07-17 | **REWRITE** | 689 words, under the 800 floor, and competing with `/vat/ioss-vs-oss` on the same head term at position 82 |
| `/services/ecommerce-vat-compliance` | 274 | 0 | 64.8 | 0 | ecommerce tax compliance (36, 85.9) | 07-17 | **REWRITE** | 719 words against commercial head terms; ranks 55 to 86 on six of them |
| `/services/hmrc-letter-online-sales` | 226 | 3 | 29.3 | 2 | hmrc letter ebay (38, 47.8) | 07-17 | **REWRITE** | Four near-identical "hmrc letter ebay" variants at 35 to 48; the page's own title never uses the word searchers type |
| `/for/amazon-sellers` | 163 | 0 | 56.4 | 0 | fba accounting (38, 74.0) | 07-17 | **REWRITE** | Ranks 74 to 89 on the accounting queries it was built for; statute density 7.7 per 1,000 words in the first half, nearly double the 8.3 ceiling |
| `/vat/postponed-vat-margin-scheme` | 126 | 0 | 38.3 | 0 | simplified import vat accounting (44, 68.7) | 09-23 | **REWRITE** | Its single biggest query is SIVA, a scheme the page does not cover; it is two unrelated subjects (PVA and margin scheme) in one page |
| `/for/shopify-sellers` | 107 | 0 | 53.2 | 0 | shopify sellers accountant (23, 96.5) | 07-17 | **REWRITE** | Position 96 on its own core commercial term; statute density 6.4 per 1,000 in the first half |
| `/about` (flagged extra) | 219 | 0 | 85.2 | 0 | ecommerce finance (49, 83.5) | not inspected | **REWRITE** | 99 words, no H2s, body says "this page is being prepared", yet it is the landing page for the whole "ecommerce accountants" commercial cluster and for the site's own brand name |
| `/vat/135-import-rule` | 915 | 0 | 9.6 | **85** | 135 threshold (7, 24.3) | 09-25 | **EXTEND** | Already at position 9.6 on Google and 5 to 10 on Bing, with zero clicks. Not a ranking problem, a snippet and coverage problem |
| `/blog/.../etsy-fees-vat-and-tax` | 500 | 2 | 11.1 | 51 | etsy tax (3, 33.3) | 07-17 | **EXTEND** | Performing on both engines; Bing shows a dense "does etsy charge VAT" question set the page does not answer as questions |
| `/blog/.../ebay-tax-rules-uk` | 368 | 2 | 13.4 | 20 | tax on ebay sales (2, 61.0) | 07-17 | **EXTEND** | Ranks well and sits next to a 27-keyword, roughly 5,000/mo, KD 0 to 6 eBay cluster it does not yet name |
| `/vat/deemed-supplier-establishment` | 263 | 6 | 14.6 | 0 | deemed supplier rules (25, 36.2) | 07-17 | **EXTEND** | 6 of the site's 30 total clicks, the best click rate per impression on the site. Do not disturb the body; add coverage |
| `/vat/vat-on-marketplace-fees` | 172 | 0 | 10.9 | 2 | (an AI-style conversational query) (29, 8.3) | 09-10 | **EXTEND** | Position 10.9 already. Its top query is machine-shaped; the human fee queries sit unaddressed in the gap register at KD 9 to 30 |
| `/services/settlement-payout-reconciliation` | 36 | 0 | 29.2 | 0 | amazon reconciliation (1, 68.0) | 07-17 | **EXTEND** | 570 words, the shortest page on the site, against the pool's largest service-side cluster (reconciliation, roughly 73 KEEP rows) |
| `/blog/.../cogs-inventory-basics` | 26 | 0 | 24.4 | 1 | (none attributed) | 07-17 | **EXTEND** | 221 KEEP keywords in the pool are COGS and inventory, the single largest cluster in it, against one page earning 26 impressions |
| `/for/marketplace-sellers` | 0 | 0 | n/a | 0 | none | **never** | **INVESTIGATE (resolved)** | `urlInspection`: "URL is unknown to Google". Never crawled. Not thin, not noindexed, 1,219 words and 8 body-prose inbound links |
| `/for/dropshippers` | 0 | 0 | n/a | 0 | none | **never** | **INVESTIGATE (resolved)** | Same verdict. Additionally the weakest internal link profile on the site: zero body-prose inbound links |
| `/blog/.../platform-reporting-rules` | 0 | 0 | n/a | **69** | Bing: do etsy report to hmrc? (4, 2) | **never** | **INVESTIGATE (resolved)** | Never crawled by Google, yet Bing's single best page on the site, positions 2 to 10. Proof the page renders and is competitive |
| `/blog/.../online-seller-survival-odds` | 0 | 0 | n/a | 0 | none | **never** | **INVESTIGATE (resolved)** | Never crawled, and an orphan: zero body-prose inbound links anywhere in the corpus |
| `/research/online-seller-index` | 1,675 | 7 | 8.2 | 3 | 47910 sic code (43, 18.1) | 09-11 | LEAVE | Best page on the site: position 8.2 and 7 of 30 total clicks. Performing |
| `/blog/.../print-on-demand-tax-uk` | 302 | 6 | 7.7 | 4 | print on demand taxes (28, 13.1) | 09-15 | LEAVE | Performing: position 7.7 and 6 of 30 clicks. Its two position 13 to 16 queries use "sales tax", a US term the pool rules classify DROP-GEO |
| `/blog/.../trading-allowance-online-sellers` | 159 | 0 | 8.9 | 36 | (none attributed) | 07-16 | LEAVE | Position 8.9 on Google, 1 to 6 on Bing. Performing on both |
| `/blog/.../online-seller-formation-trends` | 92 | 1 | 7.0 | 0 | (none attributed) | 07-27 | LEAVE | Position 7.0. Performing, and a research asset like the index pages |
| `/calculators/side-hustle-tax-checker` | 42 | 0 | 7.0 | 4 | (none attributed) | 07-17 | LEAVE | Utility page, position 7.0 |
| `/calculators/seller-take-home-calculator` | 37 | 0 | 7.3 | 2 | Bing: uk seller calculator (1, 1) | 07-31 | LEAVE | Utility page, position 7.3 and 1 on Bing |
| `/blog/.../is-it-worth-selling-on-amazon-uk` | 35 | 2 | 6.4 | 0 | is it worth selling on amazon uk (1, 15) | 07-17 | LEAVE | Position 6.4 and 2 clicks on 35 impressions. Performing |
| `/research/online-seller-survival-index` | 34 | 0 | 6.2 | 0 | (none attributed) | 09-10 | LEAVE | Position 6.2. Performing |
| `/calculators/vat-threshold-tracker` | 27 | 0 | 32.9 | 4 | sales tax threshold monitoring (5, 69.0) | 07-16 | LEAVE | Utility page. Generic VAT threshold is fenced to generalist (DIRECT CONFLICT) |
| `/blog/.../cash-vs-accruals-stock` | 22 | 0 | 16.6 | 0 | (none attributed) | 07-17 | LEAVE | 22 impressions is below any threshold that could drive a rewrite outline |
| `/` | 20 | 0 | 11.8 | 1 | (none attributed) | 09-22 | LEAVE | Brand-driven, recrawled recently, no content diagnosis available from 20 impressions |
| `/blog/.../vat-threshold-gross-vs-payout` | 12 | 0 | 22.0 | 0 | what is a payment threshold (1, 77.0) | 07-16 | LEAVE | Generic VAT threshold is fenced to generalist; its own query set is off-topic noise |
| `/blog/.../flat-rate-scheme-wrong-for-sellers` | 11 | 0 | 16.5 | 0 | (none attributed) | 07-17 | LEAVE | 11 impressions. No query evidence to rewrite from |
| `/blog/.../mtd-itsa-online-sellers` | 7 | 0 | 69.4 | 0 | mtd for online sellers (2, 57.5) | 07-17 | LEAVE | 7 impressions, and generic MTD mechanics are fenced to generalist per DEDUP_AUDIT |
| `/blog/.../sole-trader-vs-ltd-online-sellers` | 4 | 0 | 5.8 | 5 | Bing: does a sole trader class as a private seller for ecommerce (2, 1) | 07-17 | LEAVE | 4 impressions but position 5.8 and rank 1 to 3 on Bing with a click. Maturing, not failing. Generic ST vs Ltd is fenced to generalist |

**Counts: 7 REWRITE (8 with `/about`), 7 EXTEND, 4 INVESTIGATE (all now
resolved), 15 LEAVE.**

---

## 4. What to change, per REWRITE page

Absorption rules applied throughout, per the coordinator's scope addition:
nothing marked DIRECT CONFLICT or OVERLAP in
`docs/ecommerce/ESTATE_FENCE_CHECK_2026-09-25.md` is absorbed anywhere (that
rules out generic VAT registration and threshold, generic MTD, generic sole
trader vs limited company, UTR, Xero, mileage, CIS, small business
accountant); and where a page has no room left under the 800 to 1,200 word
spec, that is said plainly and the surplus is handed to the net-new planner.

Word counts below are measured on the text that actually renders.

### 4.1 `/vat/ioss-vs-oss` (1,149 words, in spec)

**What is wrong, specifically.** The page is well written and factually right.
Its problem is that its query set and its subject are two different things.

- Its biggest single query is **"ioss intermediary uk" (172 impressions,
  position 22.7)**, followed by "ioss intermediary" (107, 42.4). That is
  provider intent: someone looking for an IOSS intermediary, not for an
  explanation of the difference between two schemes.
- Its second cluster is comparison intent: "difference between ioss and oss"
  (76, 21.6), "difference between oss and ioss" (68, 24.7), "ioss vs oss" (39,
  21.4), "oss ioss difference" (9, 26.6). The page's own title serves this one.
- Its third cluster is **OSS** intent: "oss uk" (68, 19.7, and the source of
  the page's single click), "oss ecommerce" (64, 24.3), "oss registration uk"
  (7, 25.0). The house position is that GB sellers do not distance-sell under
  OSS at all, so the page correctly tells most of these searchers the scheme
  does not apply to them. That is the right answer and a weak page for the
  query.
- The same "ioss intermediary" term is also served by
  `/services/selling-into-the-eu` at position 81.9. Two of our URLs are
  eligible for one query. That is cannibalisation and Google is picking
  neither.

**The changes.**

1. Give the intermediary intent its own H2 with the answer in the first
   sentence: the page already has the fact (GB sellers must appoint an
   EU-established fiscal intermediary who takes joint liability) buried in
   section body prose. Lift it to a question-shaped H2.
2. Take ownership of "ioss intermediary" on this page and remove it from
   `/services/selling-into-the-eu` (see 4.2), so the two stop competing.
3. Direct address measures **5.2 per 1,000 words against the 25 floor**, the
   worst of any `/vat` page. Rewrite in second person.
4. Zero of its three H2s are question-shaped. This is a template issue shared
   by all 11 data-driven pages: the renderer emits fixed strings ("Key
   considerations.", "How we help.", "Common questions") and puts the
   genuinely question-shaped text in `h3` cards or `summary` elements. Fix the
   template once, and all 11 pages clear the check.
5. Add the comparison table the query set is literally asking for. No
   `/vat`, `/services` or `/for` page on the site has one.
6. Do not lengthen it much. At 1,149 words it has roughly 50 words of
   headroom under the 1,200 ceiling before it breaks 8.3.

**Keywords to absorb** (evidence in brackets; G = fresh GSC query x page pull,
KEEP = `pool_classified_2026-09-25.json` KEEP rows):

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| ioss intermediary uk | G, 172 impr, pos 22.7 | **H2**: "Do you need an IOSS intermediary in the UK?" |
| difference between ioss and oss / difference between oss and ioss / oss ioss difference | G, 153 impr combined, pos 21.6 to 26.6 | **Comparison table** caption plus one **phrasing variant** each in prose |
| ioss vs oss | G, 39 impr, pos 21.4 | Already the title. Keep |
| oss uk / oss ecommerce / oss e commerce | G, 132+ impr, pos 19.7 to 24.3 | **H2**: "Does OSS apply to a UK seller?" with the GB/NI answer in sentence one |
| oss registration uk / eu ioss registration / ioss registration uk / how to register for ioss | G plus KEEP | **FAQ** question, one entry covering the registration route |
| ioss vat intermediary / ioss registered intermediary risk | G, 85 impr | **Phrasing variants** inside the intermediary H2 |
| ioss number uk / ioss vat registration number format / ioss registration number | KEEP | **FAQ** question: what an IOSS number looks like and who holds it |
| how long does ioss registration take / ioss registration cost | KEEP | **FAQ** question, one entry |
| vat distance selling | G, 10 impr, pos 86.4, currently landing on the `/vat` index | **Phrasing variant** in the OSS H2 |
| eu vat oss ioss / oss vat uk / vat oss / import one stop shop vat | G plus KEEP | **Phrasing variants** only |

Honest note on headroom: this page can take the two new H2s and three or four
FAQ entries and stay near 1,200 words only if the existing prose is tightened
at the same time. The wider OSS explainer demand (the roughly 95 KEEP rows on
OSS returns, OSS filing, OSS deadlines, OSS VAT rates by country) **does not
fit here** and should go to the net-new planner.

### 4.2 `/services/selling-into-the-eu` (689 words, under the 800 floor)

**What is wrong.** It is 689 words, the second shortest page on the site, and
it is eligible for exactly the queries `/vat/ioss-vs-oss` is eligible for, at
far worse positions: "ioss intermediary" (133 impressions, position 81.9),
"ioss registered intermediary risk" (79, 73.9), "import one stop shop" (70,
85.5), "register for ioss eu" (64, 89.8), "ioss and oss" (36, 87.1), "eu
shipping with ioss" (33, 78.7). 1,064 impressions, zero clicks, position 78.4.

Positions in the 70s and 80s on the same terms a sibling page ranks in the 20s
for is the signature of the weaker of two competing pages, not of a page that
is one improvement away.

**The changes.** Differentiate it into a service page, not a second explainer.

1. Stop targeting the explainer queries. Hand "ioss intermediary", "import one
   stop shop", "ioss and oss" to `/vat/ioss-vs-oss` and link to it. Per house
   rule the page is never collapsed or redirected, only differentiated.
2. Take the transactional half of the cluster instead: what the engagement
   covers, what it costs to run IOSS with an intermediary, when
   country-by-country registration beats IOSS.
3. Raise it above the 800-word floor while doing so.
4. Bing already ranks it 3 to 9 on five genuinely transactional queries that
   the page does not name: "selling goods from uk to eu oss", "can i sell to
   the eu from the uk without an ioss", "oss selling ebooks to eu from uk",
   "vat oss into europe form uk", "sell to eu with n oioss". That is the real
   intent this URL holds.

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| can i sell to the eu from the uk without an ioss | Bing page query stats, pos 9 | **H2**: "Can you sell to the EU without IOSS?" |
| selling goods from uk to eu oss / vat oss into europe from uk | Bing, pos 6 and 8 | **Phrasing variants** in the opening |
| oss selling ebooks to eu from uk | Bing, pos 3 | **FAQ** question on digital goods |
| eu vat registration vs ioss which is better for your ecommerce business | KEEP | **H2**: the country-by-country versus IOSS decision |
| ioss registration cost and process / how long does ioss registration take | KEEP (subject "IOSS registration cost and process") | **FAQ**, if not already used on `/vat/ioss-vs-oss`. Assign it to one page only |
| eu vat after brexit what uk ecommerce sellers must do / expanding to the eu cross border vat and vat registration uk 2026 guide | KEEP | **Phrasing variants** |
| cross border vat for online sellers / all about cross border vat | KEEP | **Phrasing variants** |

Headroom: good. It is 111 words below the floor, so it can absorb two H2s and
two FAQ entries comfortably.

### 4.3 `/services/ecommerce-vat-compliance` (719 words, under the 800 floor)

**What is wrong.** It is the site's commercial VAT service page and it ranks
55 to 86 on every commercial term it is eligible for: "ecommerce tax
compliance" (36 impressions, position 85.9), "ecommerce vat" (27, 77.3),
"ecommerce sales tax" (20, 73.5), "vat on ecommerce sales" (17, 54.9), "e
commerce vat registration" (12, 55.0), "vat ecommerce uk" (11, 71.4). 274
impressions, zero clicks.

It also has a rival inside its own site: "ecommerce business taxes" (25
impressions), "ecommerce tax" (16), "e commerce tax uk" (6) and "marketplace
seller tax uk" (14) are all landing on the **`/blog` listing page** at
positions 53 to 74, not on this page. The site has no page that is the answer
to "what tax do I pay as an online seller", so the blog index is absorbing it.

**The changes.**

1. Make this page the answer to "ecommerce tax", not only to "ecommerce VAT
   compliance". That is a title and scope change, and it takes the traffic the
   blog index is currently catching.
2. Get above 800 words.
3. "ecommerce sales tax" is a US phrasing on a UK page; do not chase it, but
   do note in one line that UK sellers pay VAT rather than sales tax, which is
   what those searchers need to hear.
4. Careful: generic UK VAT registration and the generic £90,000 threshold are
   **DIRECT CONFLICT** on the fence check and belong to generalist. Cover them
   only in the seller-scoped form (gross marketplace sales versus payout,
   reverse-charge fees counting toward the threshold) and link out.

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| ecommerce tax / ecommerce business taxes / e commerce tax uk | G, 47 impr combined, currently landing on `/blog` | **H2**: "What tax do you pay as an online seller in the UK?" |
| marketplace seller tax uk | G, 14 impr, pos 68.8, landing on `/blog` | **Phrasing variant** in that H2 |
| ecommerce vat / vat on ecommerce sales / vat ecommerce uk / ecommerce vat uk guide b2c b2b overseas | G plus KEEP | **Phrasing variants** in the opening |
| e commerce vat registration / e commerce vat rules uk | G, 14 impr | **FAQ** question, seller-scoped only |
| compliance and vat for ecommerce sellers uk complete guide / common vat compliance mistakes ecommerce sellers make | KEEP | **H2**: the mistakes framing |
| choose vat scheme ecommerce | KEEP | **FAQ** question, linking to the flat-rate post |
| what taxes do i need to pay as an online seller in the uk a complete guide 2024 | G, 3 impr, landing on `/blog` | **Phrasing variant** |

Headroom: good, 81 words below the floor.

### 4.4 `/services/hmrc-letter-online-sales` (825 words, in spec)

**What is wrong.** Four near-identical queries, all the same intent, all
outside the top 30: "hmrc letter ebay" (38 impressions, position 47.8), "hmrc
ebay letter" (33, 38.7), "hmrc letter ebay sales" (28, 37.9), "ebay hmrc
letter" (25, 35.4). 124 impressions on one phrase in four word orders, and the
page's H1 is "Help responding to an HMRC letter about your online selling
income", which contains neither "eBay" nor the word order anyone types.

It also holds one genuinely strange asset: **"your 2025 digital sales report
has been corrected" (16 impressions, position 7.3)**. That is people typing
the subject line of a real platform email into Google. It is the highest
position on the page by a distance and nothing on the page names it.

Separately, the gap register has "ebay hmrc" at **590 searches a month, KD 0**
and we do not rank for it at all.

**The changes.**

1. Put "HMRC letter about eBay sales" in the H1 and metaTitle, in the word
   order the impressions show. Direct address is already 44.8 per 1,000 words,
   the best on the site, so leave the voice alone.
2. Add a question-shaped H2 naming the platform email subject line verbatim
   ("Your 2025 digital sales report has been corrected"), because position 7.3
   on 16 impressions says that page-one slot is already ours to take.
3. Name eBay, Etsy, Vinted and Amazon explicitly. Every one of those has its
   own letter wave and its own query set.

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| hmrc letter ebay / hmrc ebay letter / hmrc letter ebay sales / ebay hmrc letter | G, 124 impr, pos 35 to 48 | **H1 and metaTitle** plus **phrasing variants** through the body |
| your 2025 digital sales report has been corrected / digital sales report | G, 20 impr, pos 7.3 and 54.2 | **H2** naming the email subject line |
| ebay hmrc (590/mo, KD 0) / ebay hmrc rules (140/mo, KD 0) | `gap_register_v2`, peer ranks top 20, we do not rank | **H2**: "What does an HMRC letter about eBay mean?" |
| hmrc ebay private seller (140/mo, KD 0) | gap register | **FAQ** question: private seller versus trading |
| vinted hmrc (480/mo) / hmrc vinted (260/mo) / vinted hmrc reporting (260/mo) / vinted hmrc rules (140/mo) | gap register, all KD 0 | **Phrasing variants** naming Vinted alongside eBay. The deeper Vinted demand goes to `/blog/.../platform-reporting-rules`, see 5.4 |
| hmrc platform reporting online sellers | KEEP | **Phrasing variant** |

Headroom: tight. At 825 words it has room, but the Vinted cluster is large
enough (13 keywords, roughly 3,800/mo) that only the naming variants belong
here. The rest goes to the platform-reporting post.

### 4.5 `/for/amazon-sellers` (1,059 words, in spec)

**What is wrong.** It ranks 74 to 89 on the exact accounting queries it was
built for: "fba accounting" (38 impressions, position 74.0), "amazon fba
accounting" (30, 77.2), "amazon seller accounting" (14, 88.9), "accounting for
amazon sellers" (6, 86.0). Those positions are not "one improvement away", but
two things make this the best `/for` page to spend on.

First, the gap register has **"amazon accountant uk" at 3,600 searches a
month, KD 0**, with a peer ranking top 20 and us absent. That is the single
largest UK-relevant, ecommerce-topical, realistic-band keyword in the whole
register for this site.

Second, the structural defect is measurable and fixable: **statute density is
7.7 references per 1,000 words in the first half**, nearly double the 8.3
ceiling of 4, driven by Notice 741A and BIM33115 landing in the opening. This
is a hub page for someone deciding whether to hire an accountant, and it opens
like a technical note.

**The changes.**

1. Move Notice 741A and BIM33115 out of the opening half into a subordinate
   reference block.
2. Put "Amazon accountant UK" in the H1 and metaTitle. The current metaTitle
   is "Amazon FBA Accountants UK | FBA and FBM Tax", which is close but leads
   with the narrower FBA term.
3. Add question-shaped H2s (template fix, see 4.1 item 4).

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| amazon accountant uk (3,600/mo, KD 0) | gap register v2 | **H1 and metaTitle** |
| fba accounting / amazon fba accounting / amazon seller accounting / accounting for amazon sellers | G, 88 impr, pos 74 to 89 | **Phrasing variants** through the opening |
| amazon seller accountants (110/mo, KD 0) / amazon accounting (210/mo, KD 0) | gap register v2 | **Phrasing variants** |
| amazon fba vat / amazon fba vat registration / amazon fba vat guide uk | G plus KEEP | **H2**: "When does an Amazon seller have to register for VAT?", seller-scoped only (generic threshold is fenced to generalist) |
| amazon vat number / amazon vat registration number / amazon uk vat number / amazon gb vat number (roughly 1,200/mo combined, all KD 0) | gap register v2, 9 variants | **FAQ** question: "What is Amazon's UK VAT number and when do you need it?" plus **phrasing variants** |
| amazon fbm accountants | G, 8 impr, pos 58.4 | **Phrasing variant**, already partly present |
| amazon fba tax deductions / amazon fba tax return / amazon fba tax documents | KEEP | **FAQ** question, one entry covering deductions |
| amazon seller account limited company | KEEP | **Phrasing variant** only. Generic incorporation is fenced |

Headroom: 141 words to the ceiling. The two H2s and two FAQ entries fit only
if the statute block being moved out is also tightened. The much larger Amazon
cluster in the pool (181 KEEP rows: commingling, deferred transactions,
reimbursements, payout syncing, Seller Central tax settings) **does not fit**
and belongs to the net-new planner.

### 4.6 `/vat/postponed-vat-margin-scheme` (1,243 words, 43 over the ceiling)

**What is wrong.** Two unrelated subjects share one URL: postponed import VAT
accounting (for stock importers) and the second-hand margin scheme (for
resellers). They have nothing in common except both being VAT.

Then the query evidence says the page's biggest single query is neither of
them: **"simplified import vat accounting" (44 impressions, position 68.7)**.
SIVA is a third, different scheme, for deferring duty and import VAT at the
border, and the page does not cover it. "postponed vat accounting sea freight
shipping uk" (11, 91.1) is the second.

**The changes.**

1. Decide which subject this URL is. The impression evidence says import VAT,
   not margin scheme. Make the page the import VAT page: PVA, SIVA, duty
   deferment, and how they differ.
2. Answer "what is simplified import VAT accounting and do I need it" in a
   question-shaped H2 with the answer in the first sentence. Position 68.7 on
   44 impressions means Google knows the page is about the area and has not
   found the answer on it.
3. The margin scheme content does not get deleted (house rule: never
   collapse). It gets differentiated, and the second-hand reseller angle has
   enough independent demand to justify handing it to the net-new planner as a
   separate asset.

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| simplified import vat accounting | G, 44 impr, pos 68.7 | **H2**: "What is simplified import VAT accounting (SIVA)?" |
| postponed vat accounting sea freight shipping uk | G, 11 impr, pos 91.1 | **Phrasing variant** on freight |
| postponed vat accounting ecommerce / import vat ecommerce evidence / online sellers with a focus on import vat | KEEP | **Phrasing variants** |
| dropshipping import tax / vat implications dropshipping china uk eu | KEEP | **FAQ** question, cross-linking `/for/dropshippers` |

Headroom: **none**. The page is already 43 words over the 1,200 ceiling, so
the SIVA H2 has to be paid for by moving the margin-scheme half out. That is
the recommendation.

### 4.7 `/for/shopify-sellers` (933 words, in spec)

**What is wrong.** Position 96.5 on "shopify sellers accountant" (23
impressions) and 95.9 on "shopify seller accountants" (9). The site's own
service page is at position 96 for its own service term. Statute density is
6.4 per 1,000 in the first half, over the ceiling of 4.

Honest caveat: this is the weakest of the seven REWRITE calls. The gap
register yields exactly **one** qualifying Shopify keyword ("shopify
accountants", 210/mo, KD 0), and the page's GSC evidence is 107 impressions.
It clears the threshold, but it is the first one to drop if budget is tight.

**The changes.**

1. metaTitle to "Shopify Accountants UK", the word order the gap register and
   the impressions both use. The current title leads with "Shopify Accountants
   UK" already, so this is mostly a body-copy alignment job.
2. Move the statute references out of the opening half.
3. Bing shows real, unanswered questions on this audience: "does shopify
   report to hmrc" (2 impressions, position 38 on Google), "uk vat for shopify
   sellers" (7, 51.9), "shopify reverse charge vat" (2, 67.5).

**Keywords to absorb:**

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| shopify accountants (210/mo, KD 0) / shopify sellers accountant / shopify seller accountants | gap register v2 plus G, 32 impr | **metaTitle and H1** |
| does shopify report to hmrc | G, 2 impr, pos 38 | **FAQ** question. Note the honest answer differs from marketplaces: Shopify is not an online marketplace for deemed-supplier purposes |
| uk vat for shopify sellers / shopify reverse charge vat | G, 9 impr | **H2**: "How VAT works on a Shopify store" |
| do you pay vat on shopify fees / shopify fees vat treatment / is there vat on shopify subscription / shopify transaction fees vat | KEEP, 4 rows | **FAQ** question, one entry, cross-linking `/vat/vat-on-marketplace-fees` |
| does shopify charge vat / does shopify add vat / shopify add vat at checkout | KEEP | **Phrasing variants** |
| shopify exceeded vat threshold | KEEP | **Phrasing variant** only, seller-scoped. Generic threshold is fenced |

Headroom: 267 words. Comfortable.

### 4.8 `/about` (99 words), flagged extra, not one of the 33

**What is wrong.** It is a 99-word stub whose own body says "this page is being
prepared", and it is currently the landing page for:

- the site's own brand: "ecommerce finance" (49 impressions, position 83.5),
  "e-commerce finance" (43, 82.6). The site ranks at position 83 for its own
  name. A further 97 impressions on "ecommerce finance" land on `/terms`.
- the commercial cluster: "ecommerce accountants" (32, 95.0), "ecommerce
  accountant uk" (20, 99.5), "ecommerce accountants uk" (8, 92.8), "ecommerce
  accountant near me" (3, 89.3).
- location intent with no page: "e-commerce accountants liverpool" (18, 98.1),
  "e-commerce accountants manchester" (8, 99.9), "ecommerce accountants
  manchester" (5, 92.2).

219 impressions, zero clicks, average position 85.2 on the most commercial
query set the site has.

**The change.** Write the page. This is the cheapest REWRITE on the list
because there is almost nothing there to preserve. It should be a real about
page carrying "ecommerce accountants UK" in its H1 and answering who the firm
is, and it should not be the only thing standing between the site and its own
brand name.

The location queries (31 impressions across Liverpool and Manchester) are a
net-new question, not an absorption: see section 7.

---

## 5. What to add, per EXTEND page

### 5.1 `/vat/135-import-rule` (1,098 words, in spec)

Position **9.6** on Google, positions 5 to 10 on Bing across 85 page
impressions, and **zero clicks on 915 impressions**. It is the clearest
snippet problem on the site, not a ranking problem. Its own attributed queries
are tiny fragments ("135 threshold" 7 impressions at 24.3, "135 gbp" 3 at
50.3), while the Bing query set shows the real, answerable questions.

Add, without lengthening past 1,200:

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| import vat on goods less than 135 / hmrc import goods below £135 / uk vat imports 135 | Bing, 6 impr, pos 6 to 9 | **H2**: "Do you pay import VAT on goods under £135?", answer and the number in sentence one |
| vat import under 135 what if a seller hasnt paid | Bing, 2 impr, pos 8 | **FAQ** question. This is the deemed-supplier fork, cross-link `/vat/deemed-supplier-establishment` |
| uk vat books imported consignments £135 marketplace ioss | Bing, 3 impr, pos 6 | **Phrasing variant** |
| uk government overseas seller vat consignments £135 official | Bing, 3 impr, pos 5 | **Phrasing variant** |
| 135 threshold / rule 135 / uk 135 import | G | **Phrasing variants** |
| dropshipping import tax / vat implications dropshipping china uk eu / aliexpress dropshipping vat / cj dropshipping vat | KEEP | **FAQ** question, one entry, cross-linking `/for/dropshippers` |

Headroom: 102 words. One H2 and two FAQ entries, no more. The wider
dropshipping-VAT demand goes to net-new.

### 5.2 `/blog/.../etsy-fees-vat-and-tax` (1,972 words, 64% over the ceiling)

Performing: position 11.1 on Google, 51 impressions on Bing at positions 3 to
10, 2 clicks. Bing shows a dense, specific question set the page answers in
prose but never as questions.

**Headroom warning: this page is already 772 words over the 8.3 ceiling.**
Absorb as FAQ entries and phrasing variants only. Do not add H2s. If anything,
the rewrite budget here is better spent cutting.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| does etsy charge uk vat / do etsy charge uk vat / does etsy charge for vat / etsy charge vat | Bing, 4 variants, pos 6 to 10 | **FAQ** question, one entry answering all four phrasings |
| does etsy separate vat and vat exempt sales | Bing, 2 impr, pos 6 | **FAQ** question |
| vat: processing fee etsy what is it? | Bing, 1 impr, pos 3 | **FAQ** question |
| why is etsy adding vat to my selling price / why does etsy take tax off sales | Bing, pos 5 to 10 | **Phrasing variants** |
| etsy hmrc | G, **66 impressions at position 58.2, currently landing on the `/blog` listing page** | **Phrasing variant** in the opening. This is the single biggest misrouted query on the site |
| do etsy sellers pay tax / etsy seller tax return / etsy shop income tax | KEEP | **Phrasing variants** |
| are etsy seller fees tax deductible / do etsy charge vat on their fees | KEEP | **FAQ** question, one entry |
| etsy tax / etsy fees uk / vat on seller fees etsy | G | **Phrasing variants** |

### 5.3 `/blog/.../ebay-tax-rules-uk` (2,012 words, 68% over the ceiling)

Position 13.4 on Google, 20 impressions on Bing at positions 4 to 10, 2
clicks. This page sits next to the largest qualifying cluster in the gap
register for this site: **27 eBay keywords, roughly 5,000 searches a month,
KD 0 to 6, peer ranks top 20, we do not rank.**

**Headroom warning: 812 words over the ceiling.** FAQ and variants only.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| ebay hmrc (590/mo) / ebay hmrc rules (140/mo) / ebay hmrc reporting (140/mo) / when does ebay report to hmrc (110/mo) | gap register v2, all KD 0 | **FAQ** question. The page already has an H2 "Does eBay report your sales to HMRC?", so this is variant coverage under it |
| how much can you sell on ebay before paying tax (480/mo, KD 3) / how much can i sell on ebay without paying tax (170/mo, KD 2) | gap register v2 | **FAQ** question, with the number in sentence one. Note the honest answer is the badges of trade, not a threshold |
| ebay tax rules (320/mo, KD 0) / ebay tax uk (140/mo, KD 4) / uk tax ebay (140/mo, KD 3) | gap register v2 | **Phrasing variants**, already partly in the title |
| ebay vat invoice / vat invoice ebay / vat receipt ebay / how to get a vat invoice from ebay (roughly 620/mo combined, KD 0) | gap register v2, 4 variants | **FAQ** question, one entry |
| vat on ebay / ebay and vat / ebay vat / vat ebay / ebay vat tax (roughly 850/mo combined, KD 0) | gap register v2, 5 variants | **Phrasing variants** |
| hmrc ebay private seller (140/mo, KD 0) / ebay tax selling personal items | gap register plus KEEP | **FAQ** question: declutter versus trading |
| if hmrc decides you need to pay tax on £5000 on ebay personal sales what tax rate | Bing, 4 impr, pos 9 | **FAQ** question with the rate table |
| do you pay vat on ebay fees | KEEP | **Phrasing variant**, cross-link `/vat/vat-on-marketplace-fees` |
| ebay accountant / ebay accountants / accounting for ebay / ebay accounting (roughly 440/mo, KD 0) | gap register v2 | **Not here.** These are commercial-intent terms on an informational post. Hand to the net-new planner as an eBay seller hub, or to `/for/marketplace-sellers` once it is crawled |

### 5.4 `/blog/.../platform-reporting-rules` (2,185 words), also an INVESTIGATE

Google has never crawled it. Bing ranks it 2 to 10 across 69 impressions, the
best Bing page on the site. Once Google crawls it, it walks into the **Vinted
cluster: 13 keywords, roughly 3,800 searches a month, KD 0 to 2**, none of
which we rank for.

**Headroom warning: 985 words over the ceiling.** FAQ and variants only, and
the honest recommendation is to cut while adding.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| vinted tax rules (590/mo) / vinted tax (590/mo) / vinted hmrc (480/mo) / does vinted report to hmrc (110/mo) | gap register v2, all KD 0 | **FAQ** question, one entry, plus **phrasing variants** naming Vinted alongside eBay and Etsy |
| how much can i sell on vinted without paying tax (480/mo, KD 1) / how much can you sell on vinted before paying tax (390/mo) | gap register v2 | **FAQ** question, with the €2,000 / 30-sales reporting exclusion named as an exclusion, not a tax-free allowance |
| vinted tax martin lewis (320/mo, KD 2) | gap register v2 | **Phrasing variant** only. Do not build a section around a named individual |
| do etsy report to hmrc? / do etsy report to hmrc | Bing, 5 impr, pos 2 and 9 | **FAQ** question |
| what is hmrc reporting on vinted / when did hmrc start checking resellers on vinted and ebay | Bing, 4 impr, pos 3 and 7 | **Phrasing variants** |
| hmrc reporting rules for digital platforms / ebay hmrc reporting / platform data hmrc | Bing, 5 impr, pos 7 to 10 | **Phrasing variants** |
| hmrc ebay and vinted fine warning / hmrc platform reporting online sellers | KEEP | **Phrasing variants** |

### 5.5 `/vat/deemed-supplier-establishment` (1,176 words, in spec)

Best click rate on the site: 6 clicks on 263 impressions at position 14.6, a
fifth of the site's total clicks. Its structural audit is clean (direct
address 24.7 per 1,000, statute density 0, word count in spec). **Do not
rewrite it.** The only real gap is that "deemed supplier rules" (25
impressions) sits at position 36.2 while the page overall is at 14.6.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| deemed supplier rules / deemed supplier vat / deemed supplier / deemed registration | G, 29 impr | **H2**: "What are the deemed supplier rules?", answer in sentence one |
| online marketplace vat / digital marketplace vat / eu marketplace vat rules / amazon marketplace vat | KEEP | **Phrasing variants** |
| why everyone is talking about new deemed reseller rules | KEEP | **Phrasing variant** |
| deemed reseller 135? | Bing, 1 impr, pos 6, currently landing on the `/vat` index | **FAQ** question cross-linking `/vat/135-import-rule` |
| overseas vendor / marketplace merchant vat | G plus KEEP | **Phrasing variants** |

Headroom: 24 words. One H2 and one FAQ entry, paid for by tightening.

### 5.6 `/vat/vat-on-marketplace-fees` (1,294 words, 94 over the ceiling)

Position 10.9 on Google. Its largest attributed query is an AI-style
conversational string ("what kinds of systems integrate sales, refunds, and
marketplace fees to calculate registration thresholds accurately across
entities?", 29 impressions at position 8.3), which reads as crawler or
assistant probing rather than human demand and should not drive the outline.
The human demand for this subject is entirely in the gap register and the pool.

**Headroom warning: already over the ceiling.** FAQ and variants only.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| amazon fba fees (480/mo, KD 29) / amazon seller fees (390/mo, KD 9) / amazon selling fees uk (210/mo, KD 13) / amazon uk seller fees (260/mo, KD 13) | gap register v2, 10 variants | **Phrasing variants**. Note KD 9 to 30 is the highest difficulty in the register for this site, so expect this to be slower than the KD 0 clusters |
| do amazon fees have vat / are amazon fees vatable / amazon charging vat on fees / do amazon fba fees include vat | KEEP, 4 rows | **FAQ** question, one entry answering all four |
| are amazon fees still reverse charged after brexit / vat on amazon fees after brexit | KEEP | **FAQ** question |
| do you pay vat on ebay fees / do etsy charge vat on their fees / do you pay vat on shopify fees | KEEP | **Phrasing variants**, one sentence each, cross-linking the platform pages |
| how to reclaim 6 months of vat on amazon fees when you become vat registered / vat refund on amazon seller fees | KEEP | **FAQ** question |
| are amazon fba fees tax deductible / amazon seller fees tax deductible / are etsy seller fees tax deductible | KEEP | **FAQ** question, one entry. Deductibility is a different question from VAT and the page should say so |
| reverse charge amazon / are ebay fees reverse vat | G plus Bing | **Phrasing variants** |

### 5.7 `/services/settlement-payout-reconciliation` (570 words, 230 under the floor)

The shortest page on the site, 36 impressions, and sitting on top of one of
the pool's largest service-side clusters (roughly 73 KEEP rows on
reconciliation, payout syncing and platform-to-Xero work). Evidence is weak on
the GSC side (1 impression each on "amazon payment reconciliation" and "amazon
reconciliation"), so this is an EXTEND on pool evidence, not on impression
evidence, and should be graded as such.

**Careful: Xero as a generic subject is DIRECT CONFLICT on the fence check
(generalist owns `xero-accountant-uk-guide`).** Only the seller-scoped
"reconcile Amazon settlements into Xero" framing is available here, never a
generic Xero explainer.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| what is ecommerce reconciliation / the complete guide to marketplace tax reconciliation for ecommerce | KEEP | **H2**: "What is ecommerce reconciliation?" |
| how to reconcile amazon payments / amazon payout syncing explained / how to record amazon fees correctly | KEEP | **H2**: "How an Amazon settlement report becomes your accounts" |
| how to reconcile shopify payments in xero / how to integrate and reconcile ebay payouts in xero | KEEP, seller-scoped only | **Phrasing variants** |
| settlement timing gap shopify stripe payouts / account level reserve amazon / amazon deferred transactions | KEEP | **FAQ** question on reserves and timing gaps |
| multi channel ecommerce accountant / how to sync marketplace sales into one accounting platform / selling on multiple marketplaces heres how to reconcile everything | KEEP | **Phrasing variants** |
| reconcile klarna settlements / track stripe settlements | KEEP | **Phrasing variants** |

Headroom: excellent, 230 words below the floor.

### 5.8 `/blog/.../cogs-inventory-basics` (2,259 words, 88% over the ceiling)

26 impressions. The reason it is EXTEND and not LEAVE is that **221 of the
1,039 KEEP rows in the pool are COGS and inventory**, the single largest
cluster in it, against one page earning 26 impressions.

**Be honest about what that cluster is, though.** Read the actual rows
("cogs formula lifo", "cogs formula absorption costing", "calculate cost of
goods sold managerial accounting", "cogs calculator excel template"): most of
it is generic accounting-education demand, not UK online-seller demand, and
much of it is US-flavoured. LIFO is not permitted for UK tax purposes at all.
This page should absorb the UK seller-scoped slice and no more.

**Headroom warning: 1,059 words over the ceiling.** FAQ and variants only.

| Keyword or variant | Evidence | Absorb as |
|---|---|---|
| cogs formula / cogs calculation formula / how to calculate cost of goods sold | KEEP, many variants | **FAQ** question, one entry, with the formula and a worked figure in sentence one |
| cogs formula opening stock / cogs formula using inventory / cogs formula purchases | KEEP | **Phrasing variants** inside that entry |
| inventory accounting methods / inventory valuation methods | KEEP, 15 rows | **FAQ** question, UK-scoped: FIFO and average cost, and the fact LIFO is not permitted for UK tax |
| inventory accounting features stock valuation cogs uk vat | Bing, 1 impr, pos 6 | **Phrasing variant** |
| cogs journal entry / cogs accounting treatment | KEEP, 24 rows | **Phrasing variants** |
| ecommerce landed cost | KEEP | **FAQ** question: what goes into cost for a seller importing stock |
| everything else in the 221 (LIFO, absorption costing, managerial accounting, Excel templates, SaaS COGS) | KEEP, but US-flavoured or off-audience | **Absorb none of it.** Hand to the net-new planner with the warning that most of it fails the UK-seller test |

---

## 6. INVESTIGATE: the four zero-impression routes, resolved

The brief said zero impressions after 10 weeks is a question, not a finding.
It was, and `urlInspection.index.inspect` answered it. All four return the same
verdict:

```
verdict          = NEUTRAL
coverageState    = "URL is unknown to Google"
lastCrawlTime    = None
robotsTxtState   = ROBOTS_TXT_STATE_UNSPECIFIED
indexingState    = INDEXING_STATE_UNSPECIFIED
```

Control: `/for/amazon-sellers` on the same call returns `verdict=PASS`,
`coverageState="Submitted and indexed"`, `lastCrawlTime=2026-07-17`.

**Google has never crawled these four URLs. They are not deindexed, not
noindexed, not thin, and not blocked.** Every on-page theory is falsified:

| Route | In sitemap | noindex | HTTP | Words | Body-prose inbound links | Verdict |
|---|---|---|---|---|---|---|
| `/for/marketplace-sellers` | yes, verbatim | none | 200 | 1,219, the longest of the four `/for` hubs | 8 | Never crawled. Not thin, not orphaned |
| `/for/dropshippers` | yes, verbatim | none | 200 | 1,151 | **0** | Never crawled. Weakest link profile on the site |
| `/blog/.../platform-reporting-rules` | yes, verbatim | none | 200 | 2,185 | 9 sources, the best-linked of the four | Never crawled by Google. **Bing ranks it 2 to 10 on 69 impressions**, so it renders and competes |
| `/blog/.../online-seller-survival-odds` | yes, verbatim | none | 200 | 2,337 | **0** | Never crawled. Orphan: reachable only via the blog index and the sitemap |

**What this actually is.** Set against the crawl-state table in section 2, it
is not four isolated anomalies. It is one condition: Google crawled this site
once in launch week and has barely come back. 18 indexed pages have not been
recrawled since 16 or 17 July. Four were never reached at all. The two with
zero body-prose inbound links are exactly the two that also have no
independent reason to be found.

**Contributing, and fixed in code but not on production:** `/for`, `/services`
and `/vat` index pages currently serve `userCanonical` pointing at the
homepage, so Google has been told the three hubs that link to these children
are homepage duplicates. `urlInspection` confirms this is live right now
(`/services`: `googleCanonical=/services`, `userCanonical=/`). Commit
`286365a8` fixes it and is committed but **not deployed**. Deploy is
owner-triggered, so it is named here as a blocker, not actioned.

**What I did not do and why.** Submitting these URLs for indexing, running
IndexNow, or deploying `286365a8` are all production actions and are
owner-triggered per standing rules. The four dispositions above are therefore
"fix the crawl path", not "fix the page". Rewriting any of these four before
they are crawled would be writing into a void.

**Recommended sequencing for the owner, one line:** deploy `286365a8` (it
already exists), add body-prose internal links to `/for/dropshippers` and
`/blog/.../online-seller-survival-odds` from the posts that naturally cite
them, then request indexing on the four URLs. None of that is content work.

---

## 7. The IOSS and OSS verdict

The brief asked whether the site's biggest impression cluster is a dead end.

**It is half a dead end, and the half that is dead is the bigger half.**

### 7.1 The size of the thing

From the fresh GSC query pull: 125 queries grouped as IOSS or OSS carry
**2,037 impressions, 59% of the 3,448 grouped impressions, and 1 click**.
Within that, 33 queries at position 11 to 30 carry 609 impressions and zero
clicks. Two URLs carry almost all of it: `/vat/ioss-vs-oss` (1,614
impressions, position 34.0) and `/services/selling-into-the-eu` (1,064,
position 78.4).

### 7.2 What the live SERP shows

DataForSEO, UK desktop, location_code 2826, top 10, pulled 2026-09-25:

**"ioss intermediary uk"** (our biggest single query: 181 impressions, position 24.7)

| Rank | Domain | What it is |
|---|---|---|
| 1 | royalmail.com | Carrier |
| 3 | gov.uk | Government |
| 4 | icaew.com | Professional body |
| 5 | easproject.com | **IOSS intermediary service provider** |
| 7 | hellotax.com | **VAT compliance vendor** |
| 8 | nathantrust.com | **IOSS intermediary service provider (UK)** |
| 9 | vatupdate.com | Trade publisher |
| 10 | uk.interparcel.com | Carrier |
| 11 | simplyvat.com | **VAT compliance vendor** |

**"ioss intermediary"**

| Rank | Domain | What it is |
|---|---|---|
| 2 | easproject.com | IOSS intermediary provider |
| 3 | flexfulfillment.eu | Fulfilment provider |
| 5 | taxually.com | VAT compliance vendor |
| 6 | aml.me.uk | Small UK firm |
| 7 | vatfaqs.com | Niche publisher |
| 8 | eumarketready.com | Niche service site |
| 9 | zoho.com | Software vendor |
| 10 | ukbusinessforums.co.uk | Forum |
| 11 | goecom.co.uk | **Small UK ecommerce specialist** |

**"difference between ioss and oss"** and **"ioss vs oss"** (near-identical SERPs)

| Rank | Domain | What it is |
|---|---|---|
| 2 | avalara.com | VAT software giant |
| 4 | accaglobal.com | Professional body |
| 5 | taxually.com | VAT compliance vendor |
| 6 | globalvatcompliance.com | VAT compliance vendor |
| 7 | marosavat.com | VAT compliance vendor |
| 8 | simplevat.eu | VAT compliance vendor |
| 9 | revenue.ie | Irish government |
| 10 | vat-one-stop-shop.ec.europa.eu | EU Commission portal |
| 11 | avask.com | VAT compliance vendor |

**"oss ecommerce"**

| Rank | Domain | What it is |
|---|---|---|
| 1 | vat-one-stop-shop.ec.europa.eu | EU Commission portal |
| 4 | sage.com | Software giant |
| 5 | quaderno.io | Tax software vendor |
| 6 | avask.com | VAT compliance vendor |
| 7 | marosavat.com | VAT compliance vendor |
| 8 | a-wise.co.uk | **Small UK ecommerce specialist** |
| 9 | gov.uk | Government |
| 10 | simplyvat.com | VAT compliance vendor |

### 7.3 The honest read

**It is not gov.uk-locked.** The brief's worst case was that the SERP belongs
to gov.uk, the EU portal, Royal Mail, DHL and thousand-referring-domain
software vendors. That is only partly true. Across the five SERPs, small
specialist sites of our own class hold real slots: **a-wise.co.uk at 8,
goecom.co.uk at 11, nathantrust.com at 8, aml.me.uk at 6, vatfaqs.com at 7,
eumarketready.com at 8**. A site of our class can appear here. The gate is
domain trust and time, not a structural exclusion.

**But the two halves of the cluster are not the same opportunity.**

1. **The intermediary half is a dead end for us, and it is the bigger half.**
   "ioss intermediary uk" plus "ioss intermediary" plus "ioss registered
   intermediary risk" plus "ioss vat intermediary" is 364 of our impressions,
   our single biggest concentration. Look at who wins it: Royal Mail,
   Interparcel, EAS Project, Nathan Trust, hellotax, simplyVAT. Every
   commercial result is a firm that **sells IOSS intermediary registration**.
   We do not. Our page correctly explains that a GB seller must appoint an
   EU-established intermediary, and then cannot be the thing the searcher came
   to buy. This is an intent mismatch that no amount of rewriting fixes.
   Ranking at position 5 on this term would produce a bounce, not a lead.
   The one honest play is to be the page that helps a seller **choose** an
   intermediary and understand the joint-liability risk, which is a genuinely
   different and defensible page, but it will never out-convert a provider.

2. **The comparison half is winnable and is where the rewrite budget should
   go.** "difference between ioss and oss" (76 impressions, position 21.6),
   "difference between oss and ioss" (68, 24.7), "ioss vs oss" (39, 21.4),
   "oss ioss difference" (9, 26.6): 192 impressions, all in the 11 to 30 band,
   and the SERP holding them is **entirely explainer content** by VAT
   compliance vendors, not service pages. Avalara, taxually, marosavat and
   globalvatcompliance are winning with articles. That is a content contest,
   and we are already at position 21 to 25 on a ten-week-old domain with a
   page whose title is literally "IOSS vs OSS for UK Sellers".

3. **There is a third problem nobody has named, and it is ours.** The house
   position (`house_positions.md` position 10) is that **GB sellers do not
   distance-sell under OSS at all**. So on the OSS half of the cluster ("oss
   uk" 68 impressions, "oss ecommerce" 64, "oss registration uk" 7, plus the
   roughly 95 OSS rows in the KEEP pool), the correct answer for our audience
   is "this scheme does not apply to you". That is honest and it is also why
   we will never be the best result: the searcher wants the OSS explainer, and
   the OSS explainer is an EU-seller document. **We should not chase the OSS
   half at all.** It is 59% of our impressions and a large part of it is
   structurally the wrong audience.

**Verdict in two sentences.** The IOSS and OSS cluster is not structurally
unwinnable, because small UK specialists hold top-10 slots on it and the
comparison queries are held by explainer articles we can beat, but the two
biggest sub-clusters are dead ends for different reasons: the intermediary
queries want a provider we are not, and the OSS queries want an EU-seller
document we should not write. The right move is to stop treating 2,037
impressions as one opportunity, concentrate `/vat/ioss-vs-oss` on the
comparison intent plus the intermediary-choice angle, differentiate
`/services/selling-into-the-eu` into a transactional page so the two stop
cannibalising, and discount the OSS half of the cluster in any forecast.

**What this means for the owner, in plain terms.** More than half the search
traffic this site is currently visible for is people looking for a service we
do not sell or a scheme that does not apply to them. That is not a failure of
the pages. It is the cluster being smaller than it looks, and any plan that
counts those 2,037 impressions as recoverable is overstating the prize.

---

## 8. Queries we earn impressions on with no page

Split as requested. Brand-name queries and the "ecommerce bradford" family
(25 impressions, web-design intent, not ours) are excluded as noise; the brand
problem is noted separately at the end.

### 8.1 Cheap wins: an existing page could absorb these if rewritten

These are already earning impressions and are currently landing on an index,
listing or utility page because no content page claims them. Every one has an
obvious home.

| Query | Impressions | Position | Currently lands on | Should be absorbed by |
|---|---|---|---|---|
| etsy hmrc | **66** | 58.2 | `/blog` listing | `/blog/.../etsy-fees-vat-and-tax` (5.2) |
| ecommerce business taxes | 25 | 75.7 | `/blog` listing | `/services/ecommerce-vat-compliance` (4.3) |
| ecommerce tax | 16 | 53.0 | `/blog` listing | `/services/ecommerce-vat-compliance` (4.3) |
| marketplace seller tax uk | 14 | 68.8 | `/blog` listing | `/services/ecommerce-vat-compliance` (4.3) |
| vat distance selling | 10 | 86.4 | `/vat` index | `/vat/ioss-vs-oss` (4.1) |
| e commerce tax uk | 6 | 56.2 | `/blog` listing | `/services/ecommerce-vat-compliance` (4.3) |
| what taxes do i need to pay as an online seller in the uk a complete guide 2024 | 3 | 91.3 | `/blog` listing | `/services/ecommerce-vat-compliance` (4.3) |
| ecommerce tax advice | 3 | 91.3 | `/for` index | `/services/ecommerce-vat-compliance` (4.3) |
| hmrc ebay private seller calculator | 3 | 81.7 | `/calculators` index | `/calculators/side-hustle-tax-checker` (a title and copy change, not a rewrite) |
| deemed reseller 135? | 1 (Bing) | 6 | `/vat` index | `/vat/deemed-supplier-establishment` (5.5) |
| ecommerce accountants | 32 | 95.0 | `/about` | `/about` rewrite (4.8) |
| ecommerce accountant uk | 20 | 99.5 | `/about` | `/about` rewrite (4.8) |
| ecommerce accountants uk | 8 | 92.8 | `/about` | `/about` rewrite (4.8) |
| ecommerce accountant near me | 3 | 89.3 | `/about` | `/about` rewrite (4.8) |

Combined: **210 impressions** currently landing on pages that were never meant
to rank, all of which an existing page can absorb. This is the cheapest work
on the list and none of it needs a new asset.

Two clusters from the gap register belong in this list too, because an
existing page can hold them and no new page is needed:

| Cluster | Volume / difficulty | Absorbed by |
|---|---|---|
| Vinted (13 keywords: vinted tax rules, vinted hmrc, how much can i sell on vinted without paying tax, does vinted report to hmrc, ...) | roughly 3,800/mo, KD 0 to 2 | `/blog/.../platform-reporting-rules` (5.4), once Google crawls it |
| eBay tax and VAT (27 keywords: ebay hmrc, ebay tax rules, ebay vat invoice, how much can you sell on ebay before paying tax, ...) | roughly 5,000/mo, KD 0 to 6 | `/blog/.../ebay-tax-rules-uk` (5.3) |
| Amazon VAT number (9 variants: amazon vat number, amazon uk vat number, amazon vat registration number, ...) | roughly 1,200/mo, KD 0 | `/for/amazon-sellers` (4.5) |

### 8.2 Genuinely need a page that does not exist

| Query or cluster | Impressions / volume | Position | Why no existing page fits |
|---|---|---|---|
| e-commerce accountants liverpool / e-commerce accountants manchester / ecommerce accountants manchester | 31 impressions (18 + 8 + 5) | 92.2 to 99.9 | Location intent. The site has no location pages of any kind, and no existing page can honestly claim a city. This is a structural decision for the owner, not a rewrite. Note the standing ban is on Google Business Profile, not on location pages, but the two are usually planned together, so flag it rather than assume |
| revenue uk calculator / revenue calculator uk | 17 impressions (12 + 5) | 47.6 and 89.8 | Landing on `/calculators` index. The site has three calculators and none of them is a revenue calculator. A tool, not a page rewrite |
| dropshipping tax calculator | 3 impressions | 37.0 | Landing on `/calculators` index. Same shape: a tool that does not exist |
| amazon accountant uk | 3,600/mo, KD 0, we do not rank | n/a | Listed in 8.1 as absorbable by `/for/amazon-sellers`, but flagged here too: at 3,600/mo this may deserve its own asset rather than a hub section. Net-new planner's call |
| ebay accountant / ebay accountants / accounting for ebay / ebay accounting | roughly 440/mo, KD 0, we do not rank | n/a | Commercial intent with no home. `/for/marketplace-sellers` is the natural owner but Google has never crawled it, and `/blog/.../ebay-tax-rules-uk` is informational. Resolve the crawl problem first, then decide |
| OSS explainer demand (roughly 95 KEEP rows: oss returns, oss filing, oss vat deadline, oss vat rates by country) | large | n/a | Deliberately **not recommended**. See 7.3 item 3: GB sellers do not distance-sell under OSS, so this is the wrong audience for this site |
| COGS and inventory beyond the UK seller slice (LIFO, absorption costing, managerial accounting, Excel templates) | 221 KEEP rows, most of the pool's largest cluster | n/a | Flagged as a warning, not a recommendation. Most of it is US-flavoured or aimed at accounting students, and LIFO is not permitted for UK tax |

### 8.3 The brand problem, flagged separately because it is not a content gap

"ecommerce finance" (97 impressions, position 63.5, landing on **`/terms`**)
and "e-commerce finance" (52, 70.2, landing on `/about`), plus a further 49
and 43 impressions of the same two strings on `/about`. **The site ranks
around position 63 to 83 for its own brand name, and the page Google picks for
it is the terms and conditions page.** That is 241 impressions on the brand
and zero clicks. It is not a keyword gap and not a net-new asset; it is a
homepage and entity problem, and it belongs with whoever owns the site's
schema and internal linking, not with the content programme.

---

## 9. Things that surprised me

1. **The crawl finding.** The brief's framing was "eligible but not winning".
   For 18 of 29 indexed pages the truer statement is "indexed once in launch
   week and never looked at again", and for 4 pages "never seen at all". No
   amount of rewriting is measurable until that changes.
2. **`/vat/135-import-rule` is at position 9.6 on 915 impressions with zero
   clicks.** That page is winning and earning nothing. It is the only page on
   the site where the problem is provably the snippet rather than the rank.
3. **Google and Bing share zero query text but the divergence is not random.**
   Bing has found the long, conversational, genuinely human questions
   ("is the 1000 ebay trading allowance on profit or turnover", "do etsy
   report to hmrc?") and ranks us 1 to 10 on them. Google has found the short
   head terms and ranks us 20 to 90. Bing's 405 impressions are worth more per
   impression than Google's 8,776.
4. **The site's best page by Bing impressions has never been crawled by
   Google.** `/blog/.../platform-reporting-rules` holds positions 2 to 10 on
   Bing across 69 impressions while being invisible to Google. That single
   fact does more to characterise the site's problem than the position 29.6
   average does.
5. **The biggest cluster is partly the wrong audience by our own ground
   truth.** Our locked house position says GB sellers do not distance-sell
   under OSS. A large share of the 2,037-impression flagship cluster is
   therefore demand we can only answer with "this does not apply to you".
6. **Absorption headroom is much tighter than the brief assumed.** All 14 blog
   posts run 1,851 to 2,508 words against an 800 to 1,200 ceiling. Six of the
   seven EXTEND pages can take FAQ entries and phrasing variants only, not new
   sections. The pages with genuine room are the `/services/*` ones, which are
   570 to 825 words and under the floor.
7. **Every `/vat`, `/services` and `/for` page fails the question-shaped-H2
   check for the same single reason:** the shared renderer emits fixed
   boilerplate H2s and pushes the actual questions into `h3` cards and
   `summary` elements. One template fix clears 11 pages at once.

---

*Produced 2026-09-25. Google data through 2026-09-23, Bing through
2026-09-23, index state and SERPs live at call time. DataForSEO spend
$0.0100. No production actions taken: no deploy, no IndexNow, no indexing
requests, no commits.*
