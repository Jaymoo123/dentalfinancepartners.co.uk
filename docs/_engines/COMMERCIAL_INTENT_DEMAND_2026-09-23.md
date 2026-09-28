# Commercial-intent demand across the estate, 2026-09-23

Research pass. Nothing deployed, nothing committed, no site code touched.

## Recommendation

**The estate already has the commercial demand. It is losing it on the SERP, not missing it.**
Across the five sites, decision-stage queries are 27% to 80% of all Google impressions but
produce almost no clicks, because the sites sit at position 38 to 68 for every "accountants
for X" term in their own niche. Dentists gets 1,275 impressions for "accountants for dentists"
in 90 days at average position 45.0 and zero clicks. Medical gets 1,240 for "gp accountants"
at position 43.3 and zero clicks. Property gets 627 for "property accountant" at 23.8 and zero
clicks. This is not a content-gap problem, it is a page-shape and ranking problem on pages that
in most cases already exist.

**The single decision: spend the next build cycle on about a dozen hire-me service pages, not
on more articles.** The queries below carry CPCs of GBP 11 to GBP 103, keyword difficulty of 0
to 25, and SERPs made up of small independent accountancy firms with no brand moat. That
combination does not exist anywhere else in this estate's topic space.

Three things worth knowing before reading the table:

1. The reference-query diagnosis in the brief is right about *clicks* and wrong about
   *impressions*. Google is already showing these sites for commercial queries. It is showing
   them on page four.
2. Solicitors does have commercial demand, but it is small. The whole hire cluster is roughly
   500 searches a month. See "What the data does not support".
3. Several existing calculators get near-zero Google impressions for their own head terms.
   That looks like an indexing or internal-linking fault rather than a demand problem, and it
   should be checked before anyone writes a new calculator.

---

## 1. How decision-stage intent was defined

Classified by pattern on the normalised query string, before any volume was pulled. The
classifier is `intent()` in the scratch `analyse.py`; the patterns are reproduced here so the
list can be re-derived.

**Counted as decision-stage** (in precedence order, first match wins):

| Label | Pattern | Example |
|---|---|---|
| compare | `vs`, `versus`, `or limited`, `or ltd`, `compare` | sole trader vs limited company |
| should-i | `^should i/a/you`, `is it worth`, `worth it`, `is it better` | is buy to let still worth it |
| cost | `cost`, `fee`, `fees`, `price`, `how much does/is/to`, `charge`, `quote` | limited company accounts cost |
| best-x | `best`, `top N`, `recommended`, `review` | best accounting software for small business uk |
| local | `near me`, `in london`, `local` next to a provider word | property accountants near me |
| hire | `hire`, `find a`, `looking for a`, `switch`, `change accountant` | switch accountants uk |
| do-i-need | `do i need a`, `do you need a` | do i need an accountant for my limited company |
| calculator | `calculator`, `calculate`, `estimator`, `checker`, `tool` | rental yield calculator |
| provider | `accountant(s)`, `advisor`, `adviser`, `specialist`, `bookkeep`, `services`, `firm` | accountants for dentists |
| software | `software`, `app`, `platform`, `system` | contractor accounting software |

**Excluded as reference**, checked first and overriding everything above: `^what is`,
`^what are`, `^how does`, `^how do X work`, `^when is/do`, `deadline`, `explained`, a query
ending in `rules`, `how much do X earn/make/get paid`, `meaning`, `definition`, a bare rate
year, and `^can i` except where it is about affording or claiming a cost.

Two intent labels are weaker than the rest and are marked as such in the table.
`calculator` is decision-adjacent rather than decision-stage: the searcher is doing a sum, not
choosing a supplier, so it earns its place only where CPC or an existing tool makes the
conversion path obvious. `software` is a buying decision, but the thing being bought is not the
accountant, so it monetises as an affiliate or a soft lead, not as a client.

## 2. Where the numbers come from

Every figure in this document is re-derivable from these calls.

| Number | Source | Call |
|---|---|---|
| Monthly search volume, CPC, competition | DataForSEO Google Ads | `POST keywords_data/google_ads/search_volume/live`, `location_code 2826`, `language_code en` |
| Candidate expansion from 101 seeds | DataForSEO Google Ads | `POST keywords_data/google_ads/keywords_for_keywords/live`, same location and language, `limit 500`, one call per seed bucket |
| Keyword difficulty (KD) | DataForSEO Labs | `POST dataforseo_labs/google/bulk_keyword_difficulty/live`, same location and language |
| SERP composition check | DataForSEO SERP | `POST serp/google/organic/live/regular`, `depth 10`, same location and language |
| What the estate ranks for on Google | Search Console API, pulled fresh, not from Supabase | `searchanalytics.query`, `dimensions: [query]`, `rowLimit 25000`, per `sc-domain:` property |
| What the estate ranks for on Bing | Bing Webmaster | `BingQueryFetcher(site).client.get_query_stats(site_url)` |
| Whether a page already exists | Repo inventory, 2,342 rows | blog frontmatter `title`/`slug` in `<site>/web/content/blog/*.md` plus routed pages and calculator registries |

GSC window: **2026-06-22 to 2026-09-20**, 90 days ending three days back so the data is
complete. Bing query stats are the provider's own rolling window and are not date-bounded by us.

Scale of the pull: 101 seeds expanded to 2,686 candidate keywords, 2,274 of which returned
volume; 302 further keywords taken directly from the estate's own GSC and Bing query sets and
priced separately; 529 passed the decision-intent filter and 524 survive after collapsing
near-identical variants.

**DataForSEO cost for this pass: USD 1.90.** Expansion and volume 1.440, keyword difficulty
0.309, near-miss pricing 0.138, six SERP checks 0.012. Account balance after: about USD 3.28.

## 3. The finding that matters

Decision-intent share of Google impressions and clicks, 90 days to 2026-09-20, measured by
applying the classifier above to every query row returned by the API:

| Site | Total impressions | Total clicks | Decision-intent impressions | Decision-intent clicks |
|---|---|---|---|---|
| Property | 71,765 | 157 | 19,431 (27.1%) | 19 |
| Solicitors | 20,445 | 31 | 9,454 (46.2%) | 8 |
| Generalist | 28,966 | 2 | 16,352 (56.5%) | 1 |
| Medical | 6,477 | 5 | 5,183 (80.0%) | 2 |
| Dentists | 11,434 | 13 | 5,694 (49.8%) | 10 |

Read the right-hand column. Across all five sites, decision-stage queries produced **40 Google
clicks in 90 days** from 56,000 impressions. The estate is being shown for the right queries
and is not being clicked, because average position on those queries is 38 to 68.

A caveat I cannot resolve here, and which is a question rather than a finding: 157 Google
clicks in 90 days on Property does not reconcile with roughly 5,700 sessions a month. Bing
being 40% of this estate's traffic against Google's 26% explains part of it, but not all of it.
Worth a separate look before anyone uses Google clicks as a denominator for anything.

## 4. The SERPs were checked, and they change two conclusions

KD is a model, so the six highest-stakes claims were verified against the live UK SERP.

| Query | Top 8 organic | Read |
|---|---|---|
| accountants for dentists | ross-brooke-dental, pfmdental, nasdal.org.uk, kudosaccounting, djh, mmba, lloydsbank, thepeloton | Entirely small specialist accountancy firms. No brand moat. Winnable. |
| accountants for solicitors | perrysaccountants, hawsons, pkf-francisclark, richardnelsonllp, hazlewoods, thompsonwright, ouryclark, stephensons | Small and mid accountancy firms. Winnable. |
| ltd company accountants | theaccountancy, a-wise, gorillaaccounting, morethanaccountants, cheaperaccountant, brookson, limitedcompanyhelp, sleek | Small and mid firms. Winnable, and CPC is GBP 47.62. |
| lbtt calculator | revenue.scot, moneyhelper, revenue.scot, coultersproperty, savills, stampdutycalculator, gov.scot, rettie | Government plus two large agents. Top five is realistic, position one is not. |
| property gains tax calculator | gov.uk, hl.co.uk, aviva, taxfix, charcol, gov.uk, uklandlordtax, fiscalumbrella | **KD 2 is misleading.** Government and large financial brands hold the top six. Two small tax sites make positions seven and eight, so the realistic ceiling here is page one, bottom half. |
| commercial mortgage calculator | natwest, redwoodbank, kisbridgingloans, rbs, swoopfunding, christiefinance, uk-commercialfinance, commercialtrust | **Banks and brokers.** Property gets 1,500+ impressions across this cluster at position 46 to 78. The searcher is a borrower, not a tax client, so this monetises as a broker referral or not at all. Deprioritised below. |

## 5. Start here: the ten best bets across the estate

Ranked on winnability first, which is what a near-zero-link-equity estate has to do. Every one
of these has KD at or below 25, a SERP without a brand moat, and either proven impressions or
proven volume.

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| accountants for dentists | Dentists | 720 | 0 | 28.74 | provider | NEAR-MISS | G 1275 imp @ 45.0 | Rewrite /accountants-for-dentists as a hire-me service page: fees, scope, anonymised proof, booking CTA. Currently blog-shaped. |
| dental accountant | Dentists | 720 | 0 | 28.74 | provider | NEAR-MISS | G 58 imp @ 45.3 | Same page, second head term. Add an FAQ block answering "how much does a dental accountant cost". |
| medical accountants | Medical | 720 | 0 | 14.72 | provider | EXISTING-PAGE-IMPROVE | G 649 imp @ 42.0; B 3 imp @ 2.0 | Rewrite /healthcare-accountants-uk as a hire-me page. 649 impressions at pos 42, zero clicks. |
| gp accountants | Medical | 170 | 0 | 2.87 | provider | NEAR-MISS | G 1240 imp @ 43.3; B 2 imp @ 8.0 | 1,240 impressions at pos 43 and no dedicated GP service page. Build one. |
| property accountants near me | Property | 880 | 0 | 11.66 | local | NEAR-MISS | G 201 imp @ 26.4 | 880/mo, KD 0, CPC GBP 11.66, 201 impressions at pos 26 and no matching page. Build the hire-me page. |
| landlord accountant | Property | 390 | 0 | 17.05 | provider | NEAR-MISS | G 110 imp @ 36.2 | Only Belfast and Brighton location posts match. Build the national /services/landlord-accountant as the head page. |
| lbtt calculator | Property | 9900 | 17 | 0.58 | calculator | NEAR-MISS | G 4 imp @ 4.2; B 283 imp @ 9.1 | 9,900/mo, KD 17. Bing already pos 4 to 9. A Scotland stamp duty calculator does not exist. |
| ltd company accountants | Generalist | 1000 | 0 | 47.62 | provider | NET-NEW | no impressions | No page targets this. Build /limited-company-accountants as a pricing-led service page. |
| accountant for limited company | Generalist | 1000 | 25 | 47.62 | provider | EXISTING-PAGE-IMPROVE | no impressions | Same page. CPC GBP 47.62 is the highest-value term in the estate at this volume. |
| accountants for solicitors | Solicitors | 90 | 0 | 10.86 | provider | NEAR-MISS | G 828 imp @ 38.3 | 828 impressions at pos 38 and the homepage is the only match. Build a real service page. |

What ties nine of these ten together: **the page either exists in the wrong shape or does not
exist at all, and the site is already being shown for the query.** That makes them cheap. The
work is a service page with fees, scope, proof and a booking path, not a 2,000-word article.

## 6. The full ranked list, grouped by site

Classification key. **EXISTING-PAGE-IMPROVE**: a page in the repo targets this and the site
ranks within the top 30, so rewrite it. **NEAR-MISS**: the site gets impressions at position 5
to 40 with no well-matched page, so the cheapest win is a page aimed squarely at it.
**NET-NEW**: no page, no impressions.

"Estate evidence" gives Google (G) and Bing (B) impressions and average position for that exact
query over the window. Bing positions are the provider's average impression position.

### Dentists

Verdict: **strongest commercial demand per unit of effort in the estate.** One head term at
720/mo, KD 0, CPC GBP 28.74, on a SERP of small firms, with 1,275 impressions already landing
at position 45.

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| accountants for dentists | Dentists | 720 | 0 | 28.74 | provider | NEAR-MISS | G 1275 imp @ 45.0 | Rewrite /accountants-for-dentists as a hire-me service page: fees, scope, anonymised proof, booking CTA. |
| dental accountant | Dentists | 720 | 0 | 28.74 | provider | NEAR-MISS | G 58 imp @ 45.3 | Same page, second head term. Add a cost FAQ block. |
| specialist dental accountants | Dentists | 70 | 0 | 21.83 | provider | EXISTING-PAGE-IMPROVE | G 646 imp @ 43.3; B 1 imp @ 1.0 | Same cluster. 646 impressions already, pos 43. |
| dental practice accountant | Dentists | 70 | 0 | 11.22 | provider | NEAR-MISS | G 105 imp @ 42.8 | Section on the same page for practice owners against associates. |

### Medical

Verdict: **real demand, badly served.** 80% of Medical's impressions are decision-intent, the
highest share in the estate, and it converts 2 clicks out of 5,183 impressions. Average
position on the hire cluster is 42 to 68. There is no dedicated GP service page despite 1,240
impressions for "gp accountants".

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| medical accountants | Medical | 720 | 0 | 14.72 | provider | EXISTING-PAGE-IMPROVE | G 649 imp @ 42.0; B 3 imp @ 2.0 | Rewrite /healthcare-accountants-uk as a hire-me page. |
| accountants for doctors | Medical | 390 | 0 | 16.89 | provider | NEAR-MISS | G 262 imp @ 68.1 | Consolidate /for-locum-doctors and /for-junior-doctors under one parent doctor-accountant service page. |
| gp accountants | Medical | 170 | 0 | 2.87 | provider | NEAR-MISS | G 1240 imp @ 43.3; B 2 imp @ 8.0 | 1,240 impressions at pos 43 and no dedicated GP service page. Build one. |
| accountants for locum doctors | Medical | 50 | 0 | 12.82 | provider | EXISTING-PAGE-IMPROVE | G 150 imp @ 56.1; B 32 imp @ 4.0 | Existing page, already pos 4 on Bing. Make it the template for the others. |

### Property

Verdict: **the most demand in absolute terms, and the most scattered.** The hire cluster
(property accountant, landlord accountant, accountants for landlords, near-me variants) totals
roughly 2,800 searches a month at KD 0 to 5 and CPC GBP 9 to GBP 28, and Property ranks 24 to
66 across it while location posts for Belfast and Brighton are what the page matcher finds. The
national service page is the missing piece.

The second opportunity is calculators, with a caveat. Property's existing CGT and rental income
calculators get almost no Google impressions for their own head terms, while LBTT (Scotland,
9,900/mo, KD 17) and LTT (Wales, 2,400/mo, KD 12) have no calculator at all and Bing already
ranks the site at position 4 to 9 for the LBTT phrasings. Check the indexing of what exists
before building what does not.

The commercial mortgage and bridging loan calculator cluster is deliberately excluded from the
table. It is 1,500+ impressions at position 46 to 78 and the volume is real, but the SERP is
banks and the visitor is a borrower. If the broker principal lane in the monetisation map goes
ahead, revisit it then.

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| landlord accounting software | Property | 170 | 2 | 29.75 | software | EXISTING-PAGE-IMPROVE | G 191 imp @ 22.7 | Post exists, pos 23, CPC GBP 29.75. Rewrite as a ranked comparison. |
| property accountants near me | Property | 880 | 0 | 11.66 | local | NEAR-MISS | G 201 imp @ 26.4 | Build the hire-me page. |
| landlord accountant | Property | 390 | 0 | 17.05 | provider | NEAR-MISS | G 110 imp @ 36.2 | Build the national /services/landlord-accountant as the head page. |
| property accountant | Property | 720 | 0 | 12.06 | provider | EXISTING-PAGE-IMPROVE | G 627 imp @ 23.8 | 627 impressions at pos 24. The single biggest near-miss on Property. |
| accountants for landlords | Property | 260 | 0 | 16.82 | provider | EXISTING-PAGE-IMPROVE | G 11 imp @ 59.9 | Service page exists but sits at pos 60. Rewrite with fees and proof. |
| mortgage arrangement fees | Property | 480 | 0 | 11.76 | cost | EXISTING-PAGE-IMPROVE | G 141 imp @ 21.9 | Post exists at pos 22 with 141 impressions. One rewrite gets page one. |
| capital gains tax calculator property | Property | 1900 | 7 | 6.57 | calculator | EXISTING-PAGE-IMPROVE | G 1 imp @ 95.0 | Calculator exists and gets almost no Google impressions. Check indexing before writing anything. |
| property tax accountant | Property | 210 | 1 | 14.76 | provider | NEAR-MISS | G 226 imp @ 43.5 | 226 impressions, pos 43. Same hire cluster, same page. |
| property tax specialist | Property | 210 | 0 | 11.90 | provider | NEAR-MISS | G 135 imp @ 44.1 | 135 impressions, pos 44. Same cluster. |
| rental income tax calculator | Property | 1300 | 5 | 3.39 | calculator | EXISTING-PAGE-IMPROVE | G 3 imp @ 59.7 | Calculator exists. Same indexing question as the CGT one. |
| ltt calculator | Property | 2400 | 12 | 2.37 | calculator | NET-NEW | B 81 imp @ 7.0 | 2,400/mo, KD 12. Wales land transaction tax. No calculator exists. |
| buy to let calculator | Property | 1300 | 0 | 1.94 | calculator | NEAR-MISS | G 81 imp @ 96.2 | 1,300/mo, KD 0, pos 96. The existing calculators do not target this phrasing. |
| is buy to let still worth it | Property | 720 | 0 | 2.53 | should-i | NET-NEW | no impressions | 720/mo, KD 0, a genuine should-I query with no page anywhere. |
| rental yield calculator | Property | 2400 | 18 | 2.43 | calculator | NEAR-MISS | G 78 imp @ 78.9 | 2,400/mo, KD 18, pos 79. Net-new calculator, cheap off existing tooling. |
| lbtt calculator | Property | 9900 | 17 | 0.58 | calculator | NEAR-MISS | G 4 imp @ 4.2; B 283 imp @ 9.1 | 9,900/mo, KD 17. Bing already pos 4 to 9. No Scotland calculator exists. |

### Generalist

Verdict: **highest commercial value per click in the estate, lowest current capture.**
Generalist took 2 Google clicks in 90 days from 28,966 impressions, 56.5% of which were
decision-intent. The provider cluster carries CPCs of GBP 38 to GBP 103, which is advertisers
telling you exactly what a limited-company client is worth.

Two distinct opportunities. First, the hire cluster: "ltd company accountants" and its variants
at 1,000/mo with KD 0 to 25 and CPC GBP 47.62, against a SERP of small firms, with no service
page in the repo. Second, the construction and contractor accounting software cluster: roughly
3,600 impressions per 90 days at position 17 to 31, KD 0 to 4, CPC GBP 69, where the existing
posts are not shaped as comparisons.

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| ltd company accountants | Generalist | 1000 | 0 | 47.62 | provider | NET-NEW | no impressions | Build /limited-company-accountants as a pricing-led service page. |
| builders accounting software | Generalist | 260 | 0 | 69.12 | software | NEAR-MISS | G 93 imp @ 23.0 | Near-miss at pos 23. Comparison post with a recommendation. |
| accounting construction software | Generalist | 260 | 4 | 69.12 | software | EXISTING-PAGE-IMPROVE | G 70 imp @ 24.8 | Same cluster, pos 25. Restructure the existing post as a comparison. |
| accountant for payroll | Generalist | 390 | 0 | 44.99 | provider | EXISTING-PAGE-IMPROVE | G 182 imp @ 10.7 | Already pos 10.7 with 182 impressions. One rewrite gets page one. |
| contractor accountant | Generalist | 480 | 10 | 38.69 | provider | EXISTING-PAGE-IMPROVE | no impressions | Existing comparison post ranks nowhere. Split out a contractor-accountant service page. |
| accountant for limited company | Generalist | 1000 | 25 | 47.62 | provider | EXISTING-PAGE-IMPROVE | no impressions | Same service page as row 1. |
| payroll services for small business uk | Generalist | 110 | 19 | 102.31 | provider | EXISTING-PAGE-IMPROVE | no impressions | Existing page, CPC GBP 102.31. Add pricing and a quote form. |
| accountant for sole trader | Generalist | 390 | 0 | 27.28 | provider | EXISTING-PAGE-IMPROVE | no impressions | Currently matched only by an unrelated cleaning-business post. Build the real page. |
| small business accountant uk | Generalist | 110 | 0 | 49.26 | provider | EXISTING-PAGE-IMPROVE | no impressions | Existing fees post. Add a service page above it and interlink. |
| accountant for small limited company | Generalist | 170 | 0 | 38.44 | provider | NET-NEW | no impressions | Same service page as row 1. |
| best sole trader accounting software uk | Generalist | 170 | 6 | 45.83 | best-x | NET-NEW | no impressions | Net-new "best of" page, KD 6, CPC GBP 45.83. |
| accounting software for construction company | Generalist | 50 | 1 | 68.99 | software | NEAR-MISS | G 167 imp @ 30.7 | Same construction software cluster, pos 31. |
| dividend and tax calculator | Generalist | 6600 | 0 | 5.36 | calculator | EXISTING-PAGE-IMPROVE | no impressions | Calculator exists at /calculators/dividend-tax-2026-27 and gets no Google impressions. Indexing or interlink problem, not a content problem. |
| freeagent vs xero | Generalist | 320 | 0 | 25.16 | compare | NEAR-MISS | G 46 imp @ 53.2 | Post exists, pos 53. Rewrite with a verdict table and a lead CTA. |
| best accounting software for small business uk | Generalist | 480 | 36 | 84.77 | best-x | EXISTING-PAGE-IMPROVE | no impressions | KD 36 is the hardest thing on this list. Existing Xero vs QuickBooks post is not a "best of" page. Restructure as a ranked list, expect a slow win. |
| accountant for ltd company | Generalist | 110 | 9 | 54.72 | provider | NET-NEW | no impressions | Same service page as row 1. |
| sole trader or limited company | Generalist | 5400 | 6 | 6.49 | compare | EXISTING-PAGE-IMPROVE | no impressions | Calculator exists at /calculators/sole-trader-vs-ltd. Point the head term at it. |
| limited company accounts cost | Generalist | 390 | 0 | 17.07 | cost | EXISTING-PAGE-IMPROVE | no impressions | Existing cost post. Add a live fee table. |
| cost of setting up a limited company | Generalist | 720 | 0 | 12.07 | cost | NET-NEW | no impressions | Nearest page is the accountant-cost post, which is a different question. Add a formation cost breakdown page. |
| business valuation calculator | Generalist | 720 | 0 | 6.82 | calculator | NEAR-MISS | G 79 imp @ 69.9 | Bing already pos 5 to 9, Google pos 70. Promote the existing calculator. |

### Solicitors

Verdict: **real but small.** See the next section for why this list is short on purpose.

| Query | Site | Vol/mo | KD | CPC (GBP) | Intent | Classification | Estate evidence (90d) | What would serve it |
|---|---|---|---|---|---|---|---|---|
| accountants for solicitors | Solicitors | 90 | 0 | 10.86 | provider | NEAR-MISS | G 828 imp @ 38.3 | 828 impressions at pos 38 and the homepage is the only match. Build a real service page. |
| accountants for law firms | Solicitors | 40 | 0 | 11.76 | provider | NEAR-MISS | G 202 imp @ 38.6 | Same service page. |
| accountant for barristers | Solicitors | 110 | 0 | 11.01 | provider | EXISTING-PAGE-IMPROVE | G 2 imp @ 11.0 | Post exists at pos 11. Promote to a service page. |
| llp vs ltd | Solicitors | 480 | 0 | 5.80 | compare | NET-NEW | no impressions | 480/mo, KD 0, no page anywhere in the estate. The one genuine net-new gap here. |
| how much do solicitors charge per hour | Solicitors | 110 | 0 | 3.64 | cost | EXISTING-PAGE-IMPROVE | G 67 imp @ 8.9; B 3 imp @ 2.0 | Already pos 9 Google and pos 2 Bing. Add a fee benchmarking tool to monetise traffic that already arrives. |
| legal case management software uk | Solicitors | 40 | 11 | 76.43 | software | NET-NEW | no impressions | CPC GBP 76.43 on 40/mo. Highest CPC on the site, tiny volume. Cheap comparison post only. |

---

## 7. What the data does not support

**Solicitors is not a commercial-demand site at scale, and no amount of work changes that.**
The brief suspected this and the data agrees, with one nuance.

The nuance first: the demand is real. Solicitors gets 828 impressions for "accountants for
solicitors", 430 for "solicitor accountants", 368 for "solicitor accountant", 268 for
"accountants for lawyers" and 202 for "accountants for law firms", all at position 19 to 48,
all at zero clicks. The SERP is small accountancy firms with no moat. So it is winnable.

The problem is the ceiling. The entire hire cluster prices at 40 to 110 searches a month per
variant, roughly 500 a month combined. There is no second commercial cluster behind it. The
seed expansion is the clearest evidence: the two Solicitors seed buckets returned 101 and 20
expanded keywords against 682 and 813 for the Generalist and Property equivalents. Google's own
keyword planner has almost nothing to expand into, because the audience is employees and
compliance officers checking rules, not partners choosing an accountant.

What that means in practice: take the cheap win, which is one service page covering the
"accountants for solicitors / law firms / lawyers" cluster with the existing barristers post
promoted alongside it, and stop there. Do not build a Solicitors content programme on the
expectation of commercial volume. Its growth will keep coming from reference traffic, and
reference traffic on this site is worth what the 0.12% conversion rate says it is worth.

**Three further things the data does not support.**

*That low KD means winnable.* "property gains tax calculator" is KD 2 at 12,100/mo and the top
six results are gov.uk, Hargreaves Lansdown and Aviva. Any list that ranks on KD alone puts
this first and is wrong. The SERP check is not optional at the top of the list.

*That high volume is where the money is.* "sole trader vs limited company" is 5,400/mo at KD 6,
and its CPC is GBP 6.49. "limited company contractor accountant" is 40/mo at KD 7 with a CPC of
GBP 172.70. The second one is worth more per page.

*That Bing is a broad advantage here.* Memory says to judge this estate on Bing, and for
calculators that holds: Property sits at position 4 to 9 for the LBTT cluster and Generalist at
5 to 9 for business valuation calculators. But for the commercial hire queries Bing shows
almost nothing. Filtering Bing's query stats to decision intent leaves two queries with
meaningful impressions on Solicitors, three on Medical and three on Dentists. The Bing
advantage in this estate is a **tool and calculator** advantage, not a hire-me advantage. The
hire-me queries have to be won on Google.

**One thing that needs checking before it is treated as an opportunity.** Several calculators
that exist in the repo return near-zero Google impressions for their own head terms: Property's
CGT calculator against "capital gains tax calculator property" (1,900/mo), its rental income
calculator, and Generalist's dividend tax calculator against "dividend tax calculator"
(6,600/mo, KD 0). Bing ranks some equivalents at position 5 to 9, which suggests the pages are
live and reachable. Whether that is an indexing fault, an internal-linking fault or a canonical
fault is not answerable from query data. It is worth one hour with the URL Inspection API
before anyone commissions a new calculator, because if it is a fault it is the cheapest fix in
this document.

---

## Method notes and limits

- Page matching is token overlap between the query and each blog slug and title, requiring 80%
  of the query's content tokens to appear and at least two of them to match. It is a screen,
  not proof: it reads titles and slugs only, never bodies, because bodies are raw HTML held in
  frontmatter. Treat "no page" in the table as "no page with an obviously matching title", and
  confirm before commissioning.
- Site routing is by topic regex on the keyword (landlord and property terms to Property, law
  firm terms to Solicitors, and so on), falling back to the seed bucket. A handful of
  general-purpose terms could reasonably sit on more than one site.
- Volumes are Google Ads planner figures for the United Kingdom, which round hard at the low
  end and group close variants onto a shared figure. Where several phrasings share one volume,
  that is the planner grouping them, not an error.
- Scoring is `((70 - KD) / 70)^2 * (CPC + 0.5) * sqrt(volume)`, which deliberately punishes
  difficulty twice and dampens volume. It ranks candidates; it does not decide. Every row in
  the published tables was read individually, and the commercial mortgage cluster was removed
  by judgement, not by score.
- Nothing here was deployed, committed, indexed or registered for monitoring.
