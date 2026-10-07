# INV_B: blog pages acting as commercial surfaces, Property

Read-only investigation, 7 October 2026. No repo files changed, no deploys.

Full per-page data: `INV_B_pages.csv` (238 rows, one per URL).

## What the data says

The commercial blog estate is 63 posts in the `property-accountant-services`
category plus 87 redirect sources pointing at them. Three facts dominate.

**1. Google cannot see most of the category.** 45 of the 63 live posts sit at
"Crawled, currently not indexed". Only 16 are indexed. The reason is visible in
the hub's own record: `/blog/property-accountant-services` still returns
NEUTRAL, "Page with redirect", Google canonical
`/blog/property-accountant-services/what-does-a-property-accountant-do`, last
crawled **29 May 2026**. The middleware shadow was removed on 22 August
(`0b397d08`) but Google has not re-fetched the hub in over four months, so as
far as Google is concerned the hub is not a page. The hub is the only
full-HTML crawl path to the corpus: `HubArticleList` deliberately keeps every
card in the server HTML for exactly this reason (see its docstring), and `/blog`
itself caps at 12 cards per page behind client-side paging with no `<a href>` to
pages 2..N. So the entrance to 60 indexable posts is a page Google records as a
redirect.

**2. Demand is real, growing and landing at positions that do not convert.**
Commercial impressions are up across the board over the last 8 weeks versus the
8 before, but clicks are near zero because almost everything ranks 20 to 45.
"property accountant" 495 impressions at position 22.6, "property tax
accountant" 456 at 39.0, "property accountants near me" 185 at 26.6. Total
clicks across the top 40 commercial queries: 4.

**3. The August city consolidation traded position away.** On every overlapping
query, the deleted blog post still outranks the `/locations` page that replaced
it. London: "landlord accountant london" blog position 26.5 versus
`/locations/london` 39.0. Manchester: "property accountant manchester" blog 10.4
versus 21.6. Birmingham: "property accountant birmingham" blog 10.8 versus 18.2.
Bristol: "property accountant bristol" blog 9.2 versus 24.6. Both URLs are
appearing at once for London and Bristol because those two old posts are still
indexed.

## Master table: the 63 live posts in property-accountant-services

Word counts, titles, H1s, metaTitles, dates, noindex flags, Google verdict and
coverage, last crawl, canonical, 8-week and prior-8-week impressions, clicks,
position, top commercial queries per window, and body inlink counts are all in
`INV_B_pages.csv`. Summary by group:

| Group | Posts | Indexed | Crawled not indexed | Any commercial impressions | Zero body inlinks |
|---|---|---|---|---|---|
| City posts (40 cities, none has a /locations twin) | 40 | 10 | 30 | 22 | 31 |
| Service and selection pages | 8 | 3 | 4 | 4 | 1 |
| Career (noindexed) | 3 | 0 | 2 | 2 | 0 |
| Off-topic strays miscategorised here | 12 | 3 | 9 | 0 | 4 |
| Hub page (separate row in the CSV) | 1 | 0 (recorded as a redirect) | n/a | n/a | n/a |

None of the 40 live city posts has a `/locations` twin: the only five cities
with a `/locations` page (London, Manchester, Birmingham, Leeds, Bristol) had
their blog posts deleted on 5 August, so no live post overlaps one.

The 16 indexed posts:

| Post | 8wk impr | pos | prior 8wk | last crawl |
|---|---|---|---|---|
| belfast-property-accountant-specialist-tax-services | 532 | 24.1 | 7 | 2026-09-16 |
| how-much-does-a-property-accountant-cost | 138 | 9.4 | 213 | 2026-09-23 |
| property-accountant-leicester | 69 | 6.7 | 88 | 2026-08-30 |
| property-accountant-glasgow | 53 | 13.0 | 0 | 2026-10-01 |
| what-does-a-property-accountant-do | 45 | 22.8 | 8 | 2026-10-05 |
| liverpool-property-accountant-tax-services-landlords | 2 | 14.5 | 0 | 2026-10-06 |
| portsmouth-property-accountant-landlord-tax-services | 2 | 12.0 | 0 | 2026-07-24 |
| why-cardiff-landlords-need-specialist-property-accountant-2026 | 2 | 11.0 | 7 | 2026-07-04 |
| coventry-property-accountant | 0 | | 1 | 2026-10-05 |
| how-to-choose-a-property-accountant | 0 | | 0 | 2026-10-07 |
| property-accountant-bournemouth-landlords-tax-services | 0 | | 11 | 2026-07-17 |
| slough-property-accountant-landlord-tax-services | 0 | | 3 | 2026-10-06 |
| why-luton-landlords-need-specialist-property-accountant-2026 | 0 | | 1 | 2026-09-18 |
| can-you-claim-aia-on-second-hand-assets | 0 | | 0 | 2026-10-03 |
| vat-calculation-calculator | 0 | | 0 | 2026-09-10 |
| vat-how-to-calculate | 0 | | 0 | 2026-09-29 |

Eight city posts went from real impressions to exactly zero between the two
windows, which is the local shape of the 130-page long-tail drop: Nottingham
261 to 0, Preston 53 to 0, Northampton 48 to 0, Milton Keynes 46 to 0,
Peterborough 15 to 0, Bournemouth 11 to 0, Derby 4 to 0, Slough 3 to 0.

Bing is almost absent from this category. Only two pages have any Bing
impressions in 119 days: `can-you-claim-aia-on-second-hand-assets` with 3,292
impressions and 334 clicks at position 3.9, and
`how-much-does-a-property-accountant-cost` with 47 impressions. No `/locations`
page has a single Bing impression. The best-performing page in the commercial
category by a factor of 60 is a capital-allowances explainer that has nothing
to do with choosing an accountant.

## (a) Classification

Counts are over all 238 rows in the CSV.

**COMMERCIAL KEEP, 49 pages.** The 40 city posts, the 8 service and selection
pages (`property-accountant-near-me`, `how-to-choose-a-property-accountant`,
`how-much-does-a-property-accountant-cost`,
`what-does-a-property-accountant-do`, `buy-to-let-accountants-near-me-guide`,
`change-landlord-accountants`, `accounting-services-for-property-owners`,
`property-management-accounting-services`), and the hub. Of the 40 city posts,
31 have zero editorial body inlinks: they are reachable only through the hub and
the sitemap.

**INFORMATIONAL, 25 pages.** 12 off-topic strays miscategorised into the
commercial hub (payroll x3, bookkeeping for sole traders, CIS verification,
dormant accounts, loan charge, mortgage fraud, AIA on second-hand assets, and
the three VAT calculator pages), plus 13 non-category blog
posts that pick up commercial impressions without being commercial surfaces.
The largest of those is
`landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide`,
72 impressions at position 5.3 for "landlord bookkeeping spreadsheet", which is
a tool query, not a hire-an-accountant query.

**REDUNDANT, 161 rows covering 87 unique redirect sources.** Every commercial
redirect source in `DUPLICATE_REDIRECTS` and `BLOG_TO_LOCATION`, counted in both
its flat `/blog/<slug>` and nested `/blog/<category>/<slug>` form, because
middleware 301s both. Named twins and overlapping queries for the five city
posts are in the redirect ledger below. No live post is classified redundant:
the five posts that did overlap a `/locations` page were deleted on 5 August, so
every remaining overlap is between a redirect source and its target.

**CAREER, 3 pages.** `how-to-become-property-accountant`,
`property-accountant-jobs-uk`, `property-accountant-salary-complete-guide`, all
carrying `noindex: true` since `c31b02d7b` on 5 August and all correctly excluded
from `sitemap.ts`. Google has processed only one of the three:
`how-to-become-property-accountant` reads "Excluded by noindex tag", last crawled
3 September, yet still shows 417 impressions in the last 8 weeks against 441 in
the prior 8. The other two still read "Crawled, currently not indexed" with last
crawls of 29 and 30 May, so the noindex has not been seen on either.

## (b) City demand list

Every UK city or region appearing in our commercial queries with impressions,
ranked by the last 8 weeks. "Captured by" is the page taking the most
impressions for that city in that window.

| City or region | 8wk impr | prior 8wk | Captured by | pos |
|---|---|---|---|---|
| London | 478 | 463 | /locations/london | 40.9 |
| Manchester | 297 | 223 | /locations/manchester | 23.0 |
| Leeds | 280 | 351 | /locations/leeds | 17.6 |
| UK (national modifier) | 246 | 15 | / (home page) | 43.3 |
| Bristol | 105 | 48 | /locations/bristol | 27.5 |
| Birmingham | 73 | 43 | /locations/birmingham | 18.2 |
| Oxford | 70 | 108 | blog/property-accountant-oxford-guide-local-landlords | 8.5 |
| Leicester | 69 | 88 | blog/property-accountant-leicester | 6.7 |
| Belfast | 14 | 0 | blog/belfast-property-accountant-specialist-tax-services | 12.1 |
| Glasgow | 12 | 0 | blog/property-accountant-glasgow | 9.7 |
| Liverpool | 8 | 0 | /about | 57.3 |
| Northern Ireland | 4 | 0 | blog/belfast-property-accountant-specialist-tax-services | 19.0 |
| Cardiff | 3 | 7 | blog/why-cardiff-landlords-need-specialist-property-accountant-2026 | 11.0 |
| Scotland | 2 | 0 | blog/how-much-does-a-property-accountant-cost | 3.0 |
| Edinburgh | 1 | 0 | blog/how-much-does-a-property-accountant-cost | 4.0 |
| Nottingham | 0 | 202 | nothing | |
| Preston | 0 | 53 | nothing | |
| Northampton | 0 | 49 | nothing | |
| Milton Keynes | 0 | 46 | nothing | |
| Peterborough | 0 | 15 | nothing | |
| Bournemouth | 0 | 6 | nothing | |
| Derby | 0 | 4 | nothing | |
| Slough | 0 | 3 | nothing | |
| Newcastle | 0 | 2 | nothing | |
| Luton | 0 | 1 | nothing | |

Two patterns. Where a blog city post is indexed it ranks in the top 15 (Oxford
8.5, Leicester 6.7, Glasgow 9.7, Cardiff 11.0, Belfast 12.1). Where a
`/locations` page carries the city it ranks 17 to 41. Liverpool demand is
currently landing on `/about` at position 57, not on the Liverpool post.

## (c) Redirect ledger

87 unique commercial redirect sources, every one a 301 from middleware, applied
to both the flat and nested URL forms. By date added:

| Date added | Commit | Sources | Notes |
|---|---|---|---|
| 2026-04-01 | 4cb3d404c | 62 | nested-hierarchy restructure |
| 2026-04-03 | ed97f5d5e | 3 | broken link and chain fixes |
| 2026-04-10 | 5422c5e88 | 4 | dead-content consolidation |
| 2026-05-24 | a904ca103 / 39053e7af | 1 | Wave 6 repoints |
| 2026-05-30 | aa1348902 et al | 1 | Track 2 collapses |
| 2026-08-05 | bbfe04378 | 6 | city consolidation, 5 city posts plus one |
| not datable by blame | | 10 | lines rewritten by later formatting commits |

Google's current record of each source is in `INV_B_pages.csv`
(`google_verdict`, `google_coverage`, `google_lastCrawl`, `google_canonical`).
Aggregate: 73 rows read "Page with redirect" (processed), 72 read "Crawled,
currently not indexed" (never indexed in the first place, so the redirect is
moot), 13 are unknown to Google, 1 reads "Excluded by noindex tag", and **2 are
still indexed as live pages**.

The five city posts deleted and 301'd on 5 August in `bbfe04378`:

| Source (nested form) | Target | Google coverage | Last crawl | Google canonical | 8wk impr | prior |
|---|---|---|---|---|---|---|
| london-property-accountant | /locations/london | Submitted and indexed | 2026-07-31 | itself | 216 | 125 |
| manchester-property-accountant | /locations/manchester | Page with redirect | 2026-08-25 | /locations/manchester | 147 | 419 |
| birmingham-property-accountant | /locations/birmingham | Page with redirect | 2026-08-31 | /locations/birmingham | 27 | 16 |
| bristol-property-accountant | /locations/bristol | Submitted and indexed | 2026-07-25 | itself | 53 | 54 |
| leeds-property-accountant-...-tax-services | /locations/leeds | Crawled, not indexed | 2026-05-15 | none | 0 | 0 |

London and Bristol are the two still-indexed sources. Both were last crawled
before the 5 August deletion, so Google has not yet fetched the 301. Neither is
in the current sitemap, and neither has an internal link, so nothing is nudging
a re-crawl. Content recovered from `bbfe04378^` for the record: London 3,701
words, H1 "Buy-to-Let Accountant London: Tax Planning for Landlords and
Investors"; Manchester 2,308; Birmingham 3,120; Bristol 3,527; Leeds 1,007.

Per the brief, those five URLs had themselves been 301 *targets* from the
`/locations/*` pages since 10 April, so each has been through a direction
reversal. No redirect chains remain: every target in the map resolves to a page
that is not itself a source.

## (d) Dangling

1. **`public/llms.txt` still lists four deleted city posts.** Lines 126 to 130
   advertise `/blog/property-accountant-services/london-property-accountant`,
   `manchester-property-accountant`, `birmingham-property-accountant` and
   `bristol-property-accountant` as live URLs. All four 301 away. Leeds is
   already absent. `llms.txt` is a hand-maintained static file, so it did not
   follow the 5 August deletion.
2. **`feed.xml` advertises the three noindexed career posts.**
   `src/app/feed.xml/route.ts` calls `getAllPosts()` with no filter, whereas
   `src/app/sitemap.ts` filters `!p.noindex`. The RSS feed therefore still
   publishes `how-to-become-property-accountant`, `property-accountant-jobs-uk`
   and `property-accountant-salary-complete-guide` as current articles.
3. **Two redirected URLs are still indexed by Google**:
   `london-property-accountant` and `bristol-property-accountant`, both with a
   self canonical, carrying 269 impressions between them in the last 8 weeks.
4. **The hub is recorded as a redirect and has no internal link.** Google's
   record of `/blog/property-accountant-services` dates from 29 May, four months
   stale and three months behind the 22 August shadow removal. It has zero
   editorial body inlinks anywhere in the corpus, and is reachable only from the
   `/blog` index, which itself exposes 12 cards per page in server HTML. This is
   the crawl path for 60 posts.
5. **Two noindexed career posts have unprocessed noindex.**
   `property-accountant-jobs-uk` and `property-accountant-salary-complete-guide`
   were last crawled 29 and 30 May, before the 5 August noindex. They are out of
   the sitemap and out of the hub crawl path, so Google may not re-fetch them
   soon.
6. **35 of 63 posts in the commercial category drew zero commercial impressions
   in 119 days**, and 31 of the 40 city posts have no editorial inlink at all.

Clean, checked and not an issue: the sitemap contains no redirected or deleted
URL, contains all 60 indexable posts and correctly omits the 3 noindexed ones;
no internal link anywhere in the repo points at a redirected or deleted slug; no
redirect chains; the apex-to-www 308 is working (the non-www
`/locations/leeds` went from 55 impressions to 0); and `dynamicParams = false`
on the blog route does not 404 the deleted city posts because middleware 301s
them before the route runs.

## Could not verify

- **Rendered HTML inlink counts.** Inlink figures in the CSV are editorial
  in-body links counted from the repo source (markdown bodies plus `src/`), not
  a live crawl. They deliberately exclude the automatic hub and `/blog` index
  listings, which are generated at render time from the post list, so a "0"
  means "no editorial link", not "unreachable". No INV_A crawl CSV appeared in
  the scratchpad while this ran.
- **Whether London and Bristol are still serving in live SERPs.** The
  inspection reports Google's stored index record, which is how the brief framed
  it. I did not query live SERPs.
- **Redirect-added dates for 10 of the 87 sources.** `git blame` attributes
  those lines to later reformatting commits, so the original date is not
  recoverable without a line-history walk per entry.
- **Bing figures for most pages.** `bing_query_data` has rows for only 2 of the
  63 posts and none of the `/locations` pages, so the Bing column in the CSV is
  empty for the rest. That is absent data, not zero demand.
- **Click attribution below 1.** Several commercial queries show impressions
  with 0 clicks across both windows; Search Console thresholds mean a very small
  non-zero click count can report as 0.
- **Two sibling investigations were writing into this same scratchpad folder
  while this ran**, and one of them overwrote a GSC export mid-run. All figures
  here were re-pulled into a private working directory afterwards and are my own.
