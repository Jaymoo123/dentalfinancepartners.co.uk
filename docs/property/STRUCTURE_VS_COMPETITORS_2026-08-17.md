# Property: structure and architecture vs ranking landlord-tax sites

Date: 2026-08-17. Question asked: why do comparable landlord-tax sites rank for
far more keywords than we do, and is the cause structural?

All figures below were pulled live for this document. Sources and dates are
named against every claim. Nothing here is taken from stored snapshots.

## Instruments used

| Source | What it gave | Pulled |
|---|---|---|
| DataForSEO Labs (UK, `location_code=2826`) | ranked keywords, ranking pages, filtered counts, live SERPs | 2026-08-17 |
| DataForSEO Backlinks | domain and per-URL referring domains | 2026-08-17 |
| GSC API (`sc-domain:propertytaxpartners.co.uk`) | page, query and page+query, 2026-05-19 to 2026-08-15; date-only totals from 2026-03-28 | 2026-08-17 |
| Bing Webmaster `GetRankAndTrafficStats` | 91 days of Bing impressions and clicks | 2026-08-17 |
| Live crawl (our pages and competitors') | word counts, headings, tables, schema, internal links, nav | 2026-08-17 |
| Sitemaps | published page counts | 2026-08-17 |

Two caveats that apply throughout. First, DataForSEO measures a fixed UK keyword
corpus (keywords with measurable volume), so its counts are lower than GSC's
query counts for everyone, including us. It is used only for like-for-like
comparison, never as an absolute. Second, DataForSEO positions are a database
snapshot and can be stale: it credited `uklandlordtax` with positions 1 to 4 for
"buy to let mortgage calculator", and the live SERP pulled the same day shows
lenders and brokers holding that top ten. Live SERPs were pulled for 12 core
terms to check the picture independently.

## 1. The size of the gap

DataForSEO UK organic keyword counts, same database, same day:

| Domain | Ranked keywords | Keywords vol>=100 | Top-10 | Ranking pages | Published URLs | Referring domains | First backlink seen |
|---|---|---|---|---|---|---|---|
| propertytaxpartners.co.uk | 110 | 66 | 1 | 41 | 798 | 17 | 2026-06-12 |
| uklandlordtax.co.uk | 3,899 | 2,063 | 712 | 173 | 401 | 337 | 2021-12-23 |
| ukpropertyaccountants.co.uk | 13,365 | 7,780 | 575 | 778 | not published | 630 | 2021-01-22 |
| protaxaccountant.co.uk | 16,459 | 9,976 | 243 | 709 | 994 | 850 | 2021-05-15 |
| cruseburke.co.uk | 10,633 | n/a | n/a | 555 | 1,522 | 331 | 2021-01-28 |
| taxd.co.uk | 7,719 | n/a | n/a | 227 | 440 | 352 | 2022-11-24 |
| optimiseaccountants.co.uk | 3,189 | 1,887 | 229 | 174 | 295 | 266 | 2019-02-16 |
| provestor.co.uk | 1,500 | 748 | 225 | 106 | 53+ | 199 | 2022-05-31 |
| landlordstudio.com | 4,563 | 2,384 | 274 | 315 | n/a | 2,640 | 2019-01-17 |

The first thing the table kills is the "publish more" theory. We publish 798
URLs. `uklandlordtax` publishes 401 and ranks for 35 times more keywords.
`optimiseaccountants` publishes 295 and ranks for 29 times more. Page count is
not the variable.

The second thing it shows is what the variable correlates with: age and
referring domains. Our first backlink is dated 2026-06-12 and our first GSC data
is 2026-03-28. Every site above has been accumulating trust since 2019 to 2022.

## 2. What their keyword counts are actually made of

Two of the biggest numbers are not landlord-tax numbers at all.

`protaxaccountant.co.uk` (16,459 keywords): in the top 1,000 by volume, 4% are
property-flavoured. Their biggest earning pages are `/post/how-to-find-your-nin`
(630 keywords), `/post/statutory-sick-pay-ssp` (321), `/post/utr-number` (209).

`ukpropertyaccountants.co.uk` (13,365): 19% property-flavoured in the top 1,000
by volume. Biggest pages are `/calculators/salary-tax-calculator` (take-home pay,
301,000 volume), `/national-living-wage-and-minimum-wages` (491 keywords), and
`/hmrcs-telephone-service-not-meeting-target-levels` which ranks for "hmrc
telephone number" and its variants at 201,000 volume a term (162 keywords).

That page is worth stopping on. It is a news post about HMRC's phone service
which now harvests the entire "HMRC contact number" query cluster. It is not
property advice and it is not a lead-generating page. A large slice of the
headline keyword gap is generic UK tax and HMRC-utility traffic that we have
deliberately not chased.

The honest comparison is the closest true peer, `uklandlordtax.co.uk`: 2,873 of
their 3,899 keywords (74%) are property-flavoured, and 1,133 of those sit in the
top 20. Our equivalent property count is roughly 74 of 110, with 6 in the top 20.
Even inside our own niche the gap is real, roughly 20 to 30 times.

## 3. Structure: what they do that we do not

### 3.1 One page per topic, absorbing hundreds of variants

`uklandlordtax` concentration, full keyword set:

| Page | Keywords |
|---|---|
| /calculators/buy-to-let-stamp-duty-calculator/ | 548 |
| /calculators/buy-to-let-mortgage-calculator-interest-only/ | 496 |
| /tax-guide/restriction-of-tax-relief-on-mortgage-interest-section-24/ | 201 |
| /tax-on-rental-income/ | 153 |
| /advice/legal/what-is-the-landlord-licensing-scheme/ | 127 |
| Top 10 URLs combined | 2,045 of 3,899 (52%) |

Their whole guide estate is 45 ranking `/tax-guide/` pages, one per canonical
topic, at two URL levels.

Ours is the opposite shape. Post counts by topic keyword in the title, across
our 760 blog files: SDLT 44, CGT 41, MTD 41, Section 24 31, incorporation 23,
limited company 16, rental income 16, LBTT 15. One topic, dozens of pages, each
targeting a micro-question.

Median keywords per ranking page (DataForSEO): us 1, `uklandlordtax` 6,
`landlordstudio` 4, `cruseburke` 20, `ukpropertyaccountants` 24,
`protaxaccountant` 31.

### 3.2 Tool pages carry the head terms

`uklandlordtax` gets 1,080 keywords, 274 of them top-20, from 8 calculator URLs.
Their buy-to-let SDLT calculator alone holds 548 keywords including "stamp duty
estimator" (246,000 monthly volume).

We have 24 calculator URLs live. They hold 11 DataForSEO keywords between them.
In 90 days of GSC, five of them have zero impressions, including the flagship
`/calculators/stamp-duty-calculator` (shipped 2026-06-04, canonical correct, no
noindex, 1,318 words). Our first-time-buyer SDLT calculator does draw the right
queries (1,311 impressions in 90 days on "first time buyer stamp duty" and
variants) but sits at average position 81.

### 3.3 Sitewide internal linking is an order of magnitude wider

Measured on live pages, same day:

| | uklandlordtax | Property Tax Partners |
|---|---|---|
| Destinations in sitewide nav | 49 | 14 |
| Named calculators in nav | 6 | 0 (one `/calculators` index link) |
| Service pages in nav | 11 under /what-we-do plus 3 /who-we-help | 5 under /services |
| Topic hubs in nav | 6 /tax-guide-category hubs | 4 (landlord-tax, section-24, MTD, rates) |
| Raw internal links per page | 158 to 193 | 22 to 55 |

Then the in-body picture, counted across all 760 of our blog source files:

- Authored in-body internal links: median 7 per post, 36 posts with none.
- 720 of 760 posts receive zero authored in-body links from any other post. The
  blog template adds 3 same-category sibling links per post, so nothing is
  strictly orphaned, but authored equity concentrates on about 15 pages.
- Links from all 760 posts to our commercial hubs: `/landlord-tax` 0,
  `/section-24` 0, `/property-tax-rates` 0, `/making-tax-digital-landlords` 0,
  `/research/landlord-tax-index` 0. `/services` 14, `/incorporation` 13.
- Links to calculators: 99 in total, of which the flagship SDLT calculator gets
  3 and the MTD checker gets 0.

Those four hubs currently sit at GSC average positions 75.5, 17.8, 13.3 and
29.4, and `/services/*` at 66 to 76. They are the pages we would want to rank
commercially and they receive no internal support from the 760 pages we built.

### 3.4 It is not page-level links, and it is not content depth

Per-URL referring domains, pulled for the matched pages:

| Page | Referring domains |
|---|---|
| uklandlordtax buy-to-let SDLT calculator (548 keywords) | 0 |
| uklandlordtax BTL mortgage calculator | 5 |
| uklandlordtax Section 24 guide (201 keywords) | 4 |
| ukpropertyaccountants stamp duty calculator | 8 |
| ukpropertyaccountants UK tax brackets page (673 keywords) | 0 |
| our SDLT calculator, /section-24, our CGT pillar | 0 |

Their winning pages have effectively no links of their own. What is carrying
them is domain-level trust, not page-level equity.

On depth we are ahead, not behind:

| Page | Words | H2 | H3 | Tables | Schema |
|---|---|---|---|---|---|
| uklandlordtax /tax-on-rental-income/ | 2,297 | 10 | 0 | 7 | Article, BlogPosting, Breadcrumb, Organization |
| uklandlordtax Section 24 guide | 1,967 | 2 | 5 | 0 | Breadcrumb, Organization |
| uklandlordtax allowable expenses | 2,238 | 0 | 22 | 0 | Breadcrumb, Organization, ProfessionalService |
| our /landlord-tax | 3,862 | 14 | 13 | 3 | Article, Breadcrumb, FAQPage |
| our /section-24 | 3,038 | 9 | 14 | 1 | Article, Breadcrumb, FAQPage |
| our CGT pillar guide | 4,351 | 19 | 6 | 2 | BlogPosting, Breadcrumb, FAQPage |

We write longer, structure with more headings, use more tables, ship richer
schema and cite gov.uk and legislation.gov.uk directly. Content quality is not
the deficit.

## 4. What our own search data says about the targeting model

GSC, 2026-05-19 to 2026-08-15 (query dimension, which drops anonymised queries,
so treat it as shape not totals):

- 5,099 distinct queries, 937 pages with impressions, 763 of our 798 sitemap
  URLs drawing impressions. Indexation is not the problem.
- Median impressions per query: 2. Four queries above 500 impressions in the
  whole 90 days. Forty-nine above 100.
- 785 queries sit at average position 1 to 3. They produced 1,504 impressions
  and 40 clicks between them across 90 days.
- 1,396 queries sit at 4 to 10, producing 13,956 impressions and 40 clicks.

We are already number one for hundreds of queries. They are queries nobody
searches. That is the targeting model, not a ranking failure.

Live SERP check on 12 core terms, same day, shows who actually holds the
head informational queries: gov.uk, LITRG, Propertymark, NRLA, insurers (AXA,
Alan Boswell, Direct Line), lenders and brokers (L&C, Charcol), and software
(Sage, FreeAgent, GoSimpleTax, Landlord Studio). Specialist accountants appear
rarely. `uklandlordtax` is the exception, live: number 3 for "allowable expenses
landlord", 4 for "property tax accountant", 5 for "landlord accountant", 10 for
"capital gains tax on rental property". We appear in none of the 12 top tens.

## 5. Trajectory and the Bing control

Google, date-only GSC totals: Mar (from 28th) 230 impressions, Apr 11,521, May
26,747, Jun 55,335, Jul 77,466, Aug 1-15 54,971. Clicks 0, 11, 74, 318, 811,
493. This is a normal young-domain ramp, not a plateau.

Bing over the same period: May 15,543 impressions and 396 clicks, Jun 51,966 and
1,280, Jul 67,141 and 1,692, Aug 1-15 36,551 and 996. In August so far Bing
returns roughly twice the clicks of Google from two thirds of the impressions.
Same pages, same structure, same content. Where the trust gate is lower, this
content converts. That is the cleanest evidence that the deficit is domain
authority and query targeting rather than page craft.

## 6. Answer to the question asked

Ranked by weight of evidence:

1. **Domain trust and age, not page structure.** Four and a half months of
   history and 17 referring domains against four to seven years and 266 to 850.
   Their winning pages carry zero to eight referring domains of their own, so it
   is the domain doing the lifting.
2. **They build pages for head terms; we build pages for micro-questions.** One
   of their calculator pages holds 548 keywords. Our 24 calculators hold 11
   between them, and our best positions sit on queries with two impressions a
   quarter.
3. **They consolidate; we fragment.** One page per canonical topic against 44
   SDLT posts, 41 CGT posts, 41 MTD posts and 31 Section 24 posts.
4. **Their internal architecture distributes authority; ours does not.** 49 nav
   destinations against 14, 158 to 193 internal links per page against 22 to 55,
   and zero authored links from our 760 posts to the four commercial hubs we
   want to rank.
5. **Part of the headline gap is off-niche and not worth copying.** The 13,000
   and 16,000 keyword counts come substantially from NI numbers, take-home pay,
   statutory sick pay and HMRC phone numbers.

What is not the cause, tested and ruled out: page count (we have twice theirs),
indexation (763 of 798 URLs draw impressions), content depth (ours is longer and
better structured), schema (ours is richer), technical setup (canonicals correct,
no stray noindex), and page-level backlinks (nobody has any).


---

# Appendix A: the SDLT cluster, in detail

Added 2026-08-17 in the same session. Every figure pulled live: DataForSEO Labs
UK ranked keywords filtered to "stamp duty", "sdlt", "land transaction tax",
"lbtt" and "stamp tax"; our own GSC 2026-05-19 to 2026-08-15; live crawls of the
matched pages.

## A1. Pages against keywords

| Site | Pages ranking for SDLT terms | SDLT keywords | Top-10 | Best page |
|---|---|---|---|---|
| propertytaxpartners.co.uk | 4 | 15 | 0 | first-time-buyer SDLT calculator, 5 keywords, best position 62 |
| uklandlordtax.co.uk | 23 | 843 | 113 | /calculators/buy-to-let-stamp-duty-calculator/, 515 keywords, best position 1 |
| ukpropertyaccountants.co.uk | 86 | 1,176 | 37 | /calculators/stamp-duty-calculator/, 148 keywords |
| optimiseaccountants.co.uk | 19 | 382 | 5 | /knwbase/stamp-duty-land-tax-sdlt-limited-companies-business-property/, 55 |
| landlordstudio.com | 4 | 278 | 0 | /uk/calculators/stamp-duty-calculator, 211 keywords |
| provestor.co.uk | 13 | 194 | 58 | /guides/stamp-duty/limited-company, 63 keywords, best position 3 |
| cruseburke.co.uk | 8 | 150 | 0 | /stamp-duty-on-commercial-property/, 73 keywords |

We publish 64 SDLT-family blog posts and 4 SDLT-family calculators
(`stamp-duty-calculator`, `first-time-buyer-stamp-duty-calculator`,
`lbtt-calculator-scotland`, `ltt-calculator-wales`). Provestor publishes a
6-page `/guides/stamp-duty/` silo plus a calculator, 13 pages ranking in total,
and holds 58 top-10 positions to our zero.

Our 68 SDLT pages produced 7,320 impressions and 4 clicks in 90 days. Thirty of
them produced no impressions at all. Both pages spot-checked for indexation
(`/calculators/stamp-duty-calculator` and the first-time-buyer SDLT rates post)
are indexed, so this is ranking depth, not a coverage or indexing fault.

## A2. Where the SDLT demand actually sits

The competitor SDLT keyword universe is 1,600 distinct keywords. Segmented by
what the searcher wants:

| Intent | Keywords | Combined monthly volume | Queries we appear for |
|---|---|---|---|
| Calculator / "how much" / cost | 281 | 1,444,290 | 22 |
| Rates, thresholds, basics | 139 | 97,120 | 12 |
| Specialist (reliefs, refunds, group, MDR, mixed use, incorporation) | 280 | 64,960 | 20 |
| Other phrasings | 900 | 476,770 | 38 |

Roughly 97% of SDLT search volume is in the calculator, rates and plain-question
buckets. The specialist end, which is where 60 of our 64 posts live, is 3%.

## A3. Is it keywords they have touched and we have not? Yes, at the basic end

Taking the 150 highest-volume competitor SDLT keywords and checking them against
the full text of all 760 of our blog posts:

- 108 of 150 phrases appear nowhere in our corpus.
- 10 appear in our copy but earn us no impressions.
- 32 earn us impressions, nearly all at position 40 or worse.

The 108 missing phrases are not obscure. They are: "calculate stamp duty",
"stamp duty estimator", "stamp duty calculator uk", "how much is stamp duty",
"stamp duty rates", "stamp duty thresholds", "stamp duty fees", "second home
stamp duty", "first time buyer stamp duty", "do first-time buyers pay stamp
duty", "claim back stamp duty", "do limited companies pay stamp duty".

We wrote the specialist layer and skipped the primer layer. The primer layer is
where the volume is.

## A4. Four matched pages, same topic, different outcome

| Topic | Our page | Their page | Their keywords / best position | Their phrases present in our copy |
|---|---|---|---|---|
| Stamp duty refunds | /blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-refund, 6,076 words, 181 impressions | ukpropertyaccountants /a-complete-guide-to-stamp-duty-refund/ | 83 keywords, best position 5 | 3 of 83 |
| First-time buyer relief | /blog/property-types-and-specialist-tax/applicable-sdlt-rates-for-first-time-buyers, 4,428 words, zero impressions | uklandlordtax /guide-to-first-time-buyer-relief-ftb-relief/, 2,177 words | 59 keywords (22,560 volume), best position 5 | 1 of 59 |
| SDLT group relief | /blog/incorporation-and-company-structures/sdlt-group-relief-for-corporate-landlord-portfolios, 18 impressions | ukpropertyaccountants /sdlt-group-relief-claims/ | 7 keywords, best position 8 | 1 of 7 |
| Limited company SDLT | /blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost, 3,530 words, 576 impressions at position 9 to 33 | provestor /guides/stamp-duty/limited-company, 985 words | 63 keywords, best position 3 | 0 of 63 |

The same topic, sometimes the same article title, and a 5 to 60 times difference
in keyword capture. The difference is visible in the headings.

Ours, on limited company SDLT (3,530 words):

- The connected-party rule: SDLT is charged on market value, not what you paid
- Genuine partnership incorporation under Schedule 15 FA 2003
- The six-dwellings rule (six or more properties in one transaction)
- Sub-sale relief

Provestor, same topic (985 words), ranking 3 to 5:

- How much stamp duty do limited companies pay?
- Do I pay stamp duty when incorporating my properties into a company?
- What is the 15% corporate rate of stamp duty?
- Are there SDLT reliefs for limited companies?

Ours, on first-time buyer relief: "Applicable SDLT Rates for First-Time Buyers:
Current Thresholds, 1 April 2025 Reversion, and How the Relief Maps Onto the
Standard Rate Table". Zero impressions in 90 days.

Theirs: "Guide to First-Time Buyer Relief (FTB Relief)", with H2s "What Is
First-Time Buyer Relief?" and "Who Qualifies for First-Time Buyer Relief?".
Fifty-nine keywords, best position 5.

Their headings are the search queries. Ours are statements of statutory
mechanics. Both are correct. Only one is findable.

## A5. What this cluster says we are missing

1. **The primer layer.** No page answers "how much is stamp duty", "what are the
   stamp duty rates", "do limited companies pay stamp duty", "can I claim stamp
   duty back" in those words. That is 97% of the cluster's volume.
2. **Query-shaped headings and titles.** Our titles describe the mechanism; the
   pages that win use the searcher's phrasing as the H1 and H2s. This is a
   rewrite of existing pages, not new content.
3. **A working calculator at the head term.** One competitor calculator holds 515
   SDLT keywords. Ours is indexed, correct and invisible: 0 impressions in 90
   days, 3 internal links from 760 posts.
4. **Consolidation.** Sixty-four posts, thirty of them earning nothing, against
   a 6 to 13 page silo that earns 194 keywords and 58 top-10 positions. The
   deep pages are an asset only if a primer page above them collects the demand
   and passes it down.

What we are not missing: topic coverage. Our 64 posts cover mixed use, MDR,
group relief, sub-sale relief, linked transactions, Schedule 15 partnership
incorporation, Bewley, probate, shared ownership staircasing, the non-resident
surcharge, LBTT and LTT. No competitor covers that range. It is priced at 3% of
the cluster's demand.


---

# Appendix B: what the framework produces on SDLT (worked map, 2026-08-17)

Method is `docs/_engines/REWRITE_PROGRAM.md` §9. Inputs: 1,600 competitor SDLT keywords across 8
domains (DataForSEO, 2026-08-17), our GSC 2026-05-19 to 2026-08-15, our Bing 91-day page stats.

Clustering the 108 competitor pages that carry those keywords gives **41 consensus topics** worth
2,176,660 monthly searches. Assigning each topic to exactly one of our 73 SDLT-family pages:

| Outcome | Topics | Volume |
|---|---|---|
| REFRAME (our page, no equity to protect) | 5 | 1,566,580 |
| EXTEND-BING (our page, Bing equity, additive only) | 4 | 187,170 |
| EXTEND-GOOGLE (our page, Google equity, additive only) | 5 | 177,250 |
| NO-PAGE (no page of ours is close) | 27 | 245,660 |

Only **14 of our 73 SDLT pages** map to a topic the market recognises. The other 59 answer
questions no competitor gives a page to. That is the specialist tail: keep it, it is the
differentiator, but it is not what the framework is for.

## The map, by volume

| Topic (consensus) | Vol/mo | Kw | Domains | Our page | Google 90d | Bing 91d | Action |
|---|---|---|---|---|---|---|---|
| stamp duty estimator | 1,543,570 | 730 | 6 | `/calculators/stamp-duty-calculator` | 0i / 0c / pos 0 | 0i / 0c / pos 0 | REFRAME |
| first time buyers and stamp duty | 145,860 | 159 | 3 | `/calculators/first-time-buyer-stamp-duty-calculator` | 1311i / 0c / pos 81.1 | 0i / 0c / pos 0 | EXTEND-GOOGLE |
| uk stamp tax | 111,750 | 84 | 2 | `/blog/property-types-and-specialist-tax/how-owning-property-abroad-leads-higher-stamp-duty-rates` | 1061i / 6c / pos 8.0 | 138i / 8c / pos 5.2 | EXTEND-BING |
| stamp duty 2nd home | 95,790 | 62 | 3 | `-` | - | - | NO-PAGE |
| sdlt rates | 28,610 | 98 | 5 | `/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` | 981i / 1c / pos 8.4 | 1689i / 65c / pos 5.1 | EXTEND-BING |
| what is stamp duty | 27,170 | 29 | 1 | `-` | - | - | NO-PAGE |
| lbtt calculator | 26,830 | 21 | 1 | `/calculators/lbtt-calculator-scotland` | 32i / 0c / pos 13.8 | 3729i / 23c / pos 7.3 | EXTEND-BING |
| stamp duty tax return | 26,100 | 85 | 2 | `-` | - | - | NO-PAGE |
| budget and stamp duty | 25,450 | 38 | 1 | `/blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-refund` | 314i / 1c / pos 39.8 | 96i / 1c / pos 7.2 | EXTEND-GOOGLE |
| stamp duty change | 22,270 | 63 | 1 | `-` | - | - | NO-PAGE |
| stamp duty land tax return | 20,440 | 45 | 3 | `/blog/property-types-and-specialist-tax/sdlt-furnished-holiday-let-2025-abolition` | 0i / 0c / pos 0 | 3i / 0c / pos 8.0 | REFRAME |
| stamp duty wales | 19,980 | 38 | 2 | `/calculators/ltt-calculator-wales` | 9i / 0c / pos 9.1 | 607i / 1c / pos 7.9 | EXTEND-BING |
| stamp duty and property tax | 14,920 | 65 | 2 | `-` | - | - | NO-PAGE |
| stamp duty in budget | 10,660 | 22 | 1 | `-` | - | - | NO-PAGE |
| share ownership stamp duty | 8,850 | 15 | 2 | `-` | - | - | NO-PAGE |
| stamp duty abolition | 6,520 | 8 | 1 | `-` | - | - | NO-PAGE |
| stamp duty on second property | 6,220 | 16 | 1 | `-` | - | - | NO-PAGE |
| stamp duty northern ireland | 4,330 | 5 | 1 | `-` | - | - | NO-PAGE |
| news on stamp duty | 4,320 | 20 | 1 | `-` | - | - | NO-PAGE |
| stamp duty on inherited property | 3,900 | 22 | 2 | `/blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-relief-for-probate-properties` | 115i / 3c / pos 8.8 | 0i / 0c / pos 0 | EXTEND-GOOGLE |

## Reading the three interesting rows

**`/calculators/stamp-duty-calculator` carries the biggest topic in the cluster and has nothing to
lose.** 730 keywords, 1.54M monthly searches, six domains give it a dedicated page. Our page is
indexed, correct, 1,318 words, and has zero Google impressions and zero Bing impressions in the
window. Nothing to protect, so it can be rewritten and retitled freely. Honest ceiling: the naked
head term is held by MoneyHelper, gov.uk, MSE and Savills. The peer-winnable slice is 275,050 of
that 1.54M, and every peer-held slot is a modified variant ("buy to let stamp duty calculator",
"stamp duty calculator limited company", "second home stamp duty calculator"). Target the
modifiers, not the head.

**`/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` is a real Bing
asset and must not be retitled.** 1,689 Bing impressions, 65 clicks, average position 5.1, plus 981
Google impressions at position 8.4. It is the assigned page for the "sdlt rates / stamp duty for
limited company" topic (98 keywords, 63 of them with a peer in the top ten, the highest
winnability score in the cluster). Additive only: new H2 blocks answering "do limited companies pay
stamp duty", "stamp duty for ltd company", "companies stamp duty", left where the existing
structure is untouched.

**`/calculators/lbtt-calculator-scotland` is the site's best Bing page in this cluster.** 3,729
impressions, 23 clicks, position 7.3, against 32 Google impressions. Any change here is measured
against Bing, not Google, and the metaTitle stays.

## The 27 NO-PAGE topics

Three groups, and only one of them is work:

1. **Evergreen and missing** (worth a page or a hub section): "second home stamp duty" (95,790),
   "what is stamp duty" (27,170), "stamp duty refund / claim back stamp duty" (26,100), "do you
   pay stamp duty when selling a house" (14,920), "shared ownership stamp duty" (8,850), "how to
   avoid stamp duty on a second home" (6,220), "stamp duty Northern Ireland" (4,330).
2. **News-cycle** (excluded by the §9.3 screen): Rachel Reeves, Angela Rayner, Andy Burnham,
   "stamp duty abolished", "is stamp duty being scrapped". Combined 25,000 or so, and gone in a
   quarter.
3. **Devolved and already covered elsewhere** in our corpus under different phrasing.

Note the pattern: we have 64 SDLT posts and none of them owns "second home stamp duty", which is
the second-biggest evergreen topic in the cluster at 95,790 a month and which three separate
competitors give a dedicated page to.


---

# Appendix C: the SDLT scope statement (the kickoff artefact)

This is what gets declared and agreed BEFORE any page is touched, per
`docs/_engines/REWRITE_PROGRAM.md` §9.7. Every number measured 2026-08-17.

## Term family

`stamp duty` | `sdlt` | `stamp tax` | `land transaction tax` | `lbtt`. Devolved regimes included
deliberately: LBTT and LTT queries are in the same searcher journey and our best Bing asset in the
cluster is an LBTT calculator.

## Our pages in scope: 263

| How identified | Count | Treatment |
|---|---|---|
| Term family in slug or title | 69 | candidate for assignment and rewrite |
| 5+ mentions of the family in the body, but not in slug or title | 190 | must be checked for conflict and for stale terminology, even where not rewritten |
| Calculators in the family | 4 | `stamp-duty-calculator`, `first-time-buyer-stamp-duty-calculator`, `lbtt-calculator-scotland`, `ltt-calculator-wales` |

Scoping on slug alone would have declared 69 pages and left 190 pages carrying the same
terminology, competing for the same queries, unreviewed. Examples of what slug-scoping misses:
`first-time-buyer-relief-benefits-and-eligibility-requirements` (63 mentions),
`how-to-transfer-property-into-limited-company-uk` (58),
`abolishment-of-multiple-dwelling-relief` (53).

## Competitor universe: 7 domains, 155 pages, 1,602 keywords

| Domain | SDLT keywords | Pages carrying them |
|---|---|---|
| ukpropertyaccountants.co.uk | 1,176 | 86 |
| uklandlordtax.co.uk | 843 | 23 |
| optimiseaccountants.co.uk | 382 | 19 |
| landlordstudio.com | 278 | 4 |
| provestor.co.uk | 194 | 13 |
| cruseburke.co.uk | 150 | 8 |
| taxd.co.uk | 2 | 2 |

Uncapped, no volume floor. 155 pages carry at least one keyword; 108 carry three or more and become
clustering nodes. Every one of the 155 is either torn down or recorded as fetch-failed with its
status code.

## Query universe: 2,539, from three sources

| Source | In family | Unique to it |
|---|---|---|
| Competitor ranked keywords | 1,602 | 1,602 |
| Our GSC, 90 days | 493 | 399 |
| Our Bing page-query stats, 91 days, 26 pages | 594 | 538 |

**Competitor data alone would drop 937 queries we already earn impressions on.** Bing alone
contributes 538 phrasings that appear in no competitor set and in no GSC row, because GSC
anonymises them. This is the arithmetic behind the rule that all three sources are mandatory.

## Caveat on the map already produced

Appendix B's consensus map and its 41 topics were built from the competitor keywords only (1,602),
because that was the question being answered at the time. At build time the map is rebuilt on the
full 2,539-query union, so the 937 additional queries attach to pages before assignment, not after.
Expect the topic count and the assignment table to move.

## Reconciliation, before a single page is written

Every one of the 2,539 lands in exactly one bucket: `assigned`, `already-covered`, `excluded` with
a reason code, or `deferred` to a named cluster. The four counts must sum to 2,539 or the cluster
cannot reach the pre-deploy gate.

## Cost

Uncapped harvest for this cluster: about $0.50. DataForSEO balance on 2026-08-17 after today's
research: $6.70. A full corpus programme across roughly a dozen clusters needs a top-up.


---

# Appendix D: full-domain teardowns, SDLT dispersion (2026-08-17)

Question: our SDLT terminology appears on far more pages than own it. Do competitors have the same
problem, and if so what do they do about it? Method: crawl every page of a competitor domain, count
term-family mentions in body text (nav, header and footer stripped), classify each page as owner
(family in URL or title) or non-owner, and record whether non-owner pages link to an owner page in
body copy. Two domains done so far, one at a time, every page, no sampling.

## The three models

| | provestor.co.uk | uklandlordtax.co.uk | propertytaxpartners.co.uk |
|---|---|---|---|
| Pages crawled | 195 | 401 | 760 posts |
| Pages mentioning the family at least once | 55 (28%) | 237 (59%) | 434 (57%) |
| Pages with 5+ mentions | 13 | 69 | 259 |
| Owner pages (family in URL or title) | 11 | 24 | 64 |
| Non-owner pages with 5+ mentions | 2 | 45 | 195 |
| Of those, linking to an owner page | 2 (100%) | 44 (98%) | 76 (39%) |
| SDLT keywords ranked | 194 | 843 | 15 |
| SDLT keywords in top 10 | 58 | 113 | 0 |

**Dispersion is not the differentiator.** uklandlordtax mentions the term family on 59% of its
pages; we mention it on 57% of ours. Almost identical. What differs is what the dispersed pages do
with the mention.

**Model 1, provestor: containment.** Eleven owner pages in one tight `/guides/stamp-duty/` silo,
274 to 985 words each, and the term barely appears anywhere else on the site. Two non-owner pages
carry it, and both link into the silo. 58 top-10 positions off 13 pages. The highest yield per page
of anyone measured.

**Model 2, uklandlordtax: funnelled dispersion.** They let the term appear everywhere, then funnel
it. Of the 45 heavy non-owner pages, 44 link to an owner page in body copy, and 38 of those point
at the SAME page (`/stamp-duty-land-tax-for-landlords-rates-second-homes-and-limited-companies/`).
There is a designated owner and the whole site knows what it is.

**Model 3, us: unmanaged dispersion.** 195 heavy non-owner pages, only 39% of which link to any
owner page, and the links that do exist scatter across many targets with no designated owner. The
most-linked SDLT page receives 21 links from those 195.

## The honest counter-finding: they are not tidy either

uklandlordtax's designated hub, the one receiving 38 internal links, 2,703 words, 59 mentions,
**ranks for zero keywords** in the DataForSEO set. Eleven of their 24 owner pages rank for nothing.
They run duplicate pairs (`/stamp-duty-rates-for-uk-individuals/` at 0 keywords alongside
`/tax-guide/stamp-duty-rates-for-uk-individuals/` at 16). Their 843 keywords come overwhelmingly
from three pages: the calculator (515), the FAQ page (62), the limited-company rates guide (81).

So the lesson is not "be tidier". It is narrower and cheaper than that:

1. **Designate one owner per topic and point the corpus at it.** Their 98% against our 39% is the
   whole difference, and it is an additive internal-link change, the safest edit we can make.
2. **Put a tool at the head term.** One calculator page carries 61% of their SDLT keyword count.
3. **Short is fine.** Provestor's owner pages run 274 to 985 words and hold 58 top-10 positions.
   Length is not what we are missing.

## Method note, load-bearing for the programme

**Competitor sitemaps under-declare.** Provestor's sitemap lists 53 URLs; a breadth-first crawl
seeded from the sitemap plus known ranking URLs found 195, including the entire `/guides/stamp-duty/`
silo that carries their rankings. A teardown seeded from the sitemap alone would have concluded
they barely cover SDLT. Seed every teardown from sitemap UNION known ranking URLs UNION crawl
discovery.

**ukpropertyaccountants.co.uk cannot be crawled.** It returns HTTP 202 with an empty body to our
crawler and publishes no reachable sitemap. Its 1,176 SDLT keywords across 86 pages are therefore
known only through DataForSEO. Stated as a limitation, not worked around silently.


---

# Appendix D2: all four competitor teardowns, complete (2026-08-17)

Every page of four competitor domains, crawled in full. Supersedes the two-domain table in
Appendix D. `ukpropertyaccountants.co.uk` is absent because it serves HTTP 202 with an empty body
and publishes no reachable sitemap; it stays keyword-data-only.

| | provestor | uklandlordtax | optimiseaccountants | cruseburke | us |
|---|---|---|---|---|---|
| Live pages crawled | 195 | 401 | 306 | 1,250 | 760 posts |
| Mention the term family | 55 (28%) | 237 (59%) | 77 (25%) | 40 (3%) | 434 (57%) |
| 5+ mentions | 13 | 69 | 52 | 10 | 259 |
| Owner pages (family in URL or title) | 11 | 24 | 19 | 7 | 64 |
| Non-owner heavy pages | 2 | 45 | 34 | 3 | 195 |
| Of those, linking to an owner | 100% | 98% | 29% | 67% | **39%** |
| SDLT keywords | 194 | 843 | 382 | 150 | 15 |
| **SDLT keywords in top 10** | **58** | **113** | **5** | **0** | **0** |

## What the fourth domain does to the theory

After two domains the funnel rate looked like the explanation. Cruseburke kills that as a single
cause: it has the tightest containment of anyone measured (3% of pages mention the family at all,
only 3 non-owner-heavy pages in 1,250) and it holds **zero** top-10 positions. Containment alone
does not rank.

What the two winners share, and the two losers do not, is a coherent **owner set**:

- **provestor**: 11 owner pages in one purpose-built `/guides/stamp-duty/` silo with query-shaped
  titles (basics, rates for buy-to-let, limited company, reliefs and exemptions), plus a calculator.
  274 to 985 words each. 58 top-10.
- **uklandlordtax**: a designated hub every dispersed page links to, plus the calculator that alone
  carries 515 keywords. 113 top-10.
- **optimiseaccountants**: 19 owner pages, no funnel (29%), and literal duplicates
  (`/stamp-duty-refunds/` and `/sdlt-refunds/`, both 1,742 words). 5 top-10.
- **cruseburke**: 7 owner pages, no silo, blog-style titles ("is stamp duty tax deductible"), and a
  decaying site. 0 top-10.

So the corrected reading: **a coherent owner set with query-shaped titles, fed by internal links,
with a tool at the head term.** Dispersion is neutral. Containment is neutral. What matters is
whether a searcher-shaped page exists and whether the site points at it.

## Site-hygiene finding, verified

Cruseburke's sitemap declares 1,523 URLs; **310 of them return 404**, and 40 of 40 re-checked
reproduce the 404 a day later. Two of the eight pages DataForSEO credits with SDLT rankings are
among the dead. Two consequences for the programme: competitor "ranking pages" can be dead pages,
so teardown status codes must be joined onto keyword data before any page is treated as a model; and
a rival's decay is a live opportunity worth watching.

## Crawl-method correction, recorded because it nearly produced a false finding

The first cruseburke pass used a 0.2 second delay and got HTTP 500 on 667 pages including the
homepage, with failures clustered in the first 300 requests. That was our crawl rate, not their
site: a retry at 0.6 seconds recovered **678 of 678**. Reporting the first pass would have shown a
4% mention rate on a broken sample. Rule: any teardown where non-200 responses cluster early is a
rate-limit artefact until a slower retry proves otherwise, and no dispersion figure is quotable
until the retry lands.


---

# Appendix E: synthesis of the whole day (2026-08-17)

Everything above was gathered in one session. This section states what it adds up to, what it
ruled out, and what it changes.

## The one-paragraph version

We are not losing because of page count, content depth, indexation, technical setup or page-level
backlinks. We are losing on three things, in this order of weight: a four-and-a-half-month-old
domain with 17 referring domains against rivals aged four to seven years with 266 to 850; a
targeting model that built the specialist layer of every topic and skipped the plain-language layer
where 97% of the demand sits; and the absence of a coherent owner set per topic, meaning searcher
shaped pages, grouped, internally linked, with a tool at the head term. The first is slow and
compounding and cannot be shortcut. The second and third are rewrite-and-rewire work on pages we
already own, and they are what the SDLT pilot addresses.

## Five theories tested and killed today

| Theory | Killed by |
|---|---|
| We need to publish more | We publish 798 URLs. uklandlordtax publishes 401 and ranks for 35x more keywords. optimiseaccountants publishes 295 and ranks for 29x more. |
| Our content is too thin | Our pages run 3,038 to 4,351 words against their 1,967 to 2,297. Provestor's winning SDLT pages run 274 to 985 words and hold 58 top-10 positions. |
| We are not indexed | 763 of 798 sitemap URLs drew impressions in 90 days. The two spot-checked "invisible" pages are both indexed. |
| Their winning pages have link equity | Their 548-keyword SDLT calculator has 0 referring domains. Their 673-keyword tax-brackets page has 0. Ours have 0 too. It is domain-level trust, not page-level. |
| They are tidier than us | 11 of uklandlordtax's 24 SDLT owner pages rank for nothing; their most internally-linked SDLT hub ranks for zero. optimiseaccountants ships literal duplicate pages. cruseburke's sitemap declares 310 URLs that 404. |

Two more died in the last hour: **dispersion does not explain it** (uklandlordtax scatters the term
across 59% of pages, we do across 57%, they hold 113 top-10 slots and we hold 0), and **containment
does not explain it either** (cruseburke mentions SDLT on 3% of pages and holds 0).

## What survived, and what it costs to act on

| Finding | Evidence | Fix | Risk |
|---|---|---|---|
| Vocabulary mismatch | 108 of the top 150 competitor SDLT phrases appear nowhere in 760 posts; our limited-company SDLT page says "stamp duty" twice in 3,530 words and holds 0 of that cluster's 98 keywords | additive sections and query-shaped headings on pages with equity, full reframe on pages without | low, gated |
| No owner set per topic | provestor 11 pages in one silo = 58 top-10; ours 64 owner pages, no silo, 0 top-10 | designate one owner per consensus topic, point the corpus at it | low, additive |
| No internal funnel | 44 of uklandlordtax's 45 heavy non-owner pages link to an owner, 38 at the same page; ours 76 of 195, scattered | internal-link pass | lowest risk change available |
| Tools invisible | one competitor calculator holds 515 SDLT keywords; our 23 calculators hold 11 between them, 5 have zero impressions, the flagship gets 3 internal links from 760 posts | link them, reframe the ones with no equity | low |
| Domain trust | 17 referring domains, first backlink 2026-06-12, DataForSEO rank 87 vs 208 to 298 | off-site authority programme, separate workstream | slow, unavoidable |

## The control that says the content is fine

Bing, August 1 to 15: 36,551 impressions and 996 clicks. Google, same window: 54,971 impressions
and 493 clicks. Twice the clicks from two thirds of the impressions, same pages, same words. Where
the trust gate is lower, this corpus performs. That is the strongest single reason to believe the
vocabulary and architecture fixes will pay once trust accrues, and the reason Bing is the 14-to-28
day read on every change.

## What the programme is, in one line each

1. Declare scope: 263 of our pages, 7 competitor domains, 155 competitor pages, 2,539 queries.
2. Harvest uncapped from three sources, because competitor data alone drops 937 queries we already
   earn impressions on.
3. Cluster on the competitors' own page groupings; 41 consensus topics for SDLT.
4. Assign one topic to one page, uniquely, and grade each page by its Google and Bing equity.
5. Freeze the dossier. Everything after this reads it and nothing adds scope.
6. Per-page research packs, then the existing Opus rewrite chain.
7. Eight deterministic gates, four existing and four new, including equity preservation.
8. Track in `monitored_pages` and `blog_optimizations`, both of which already carry Bing baselines.

## Honest ceiling

This does not win "stamp duty calculator" from MoneyHelper, gov.uk and MSE. The addressable prize
is the slots a specialist firm already holds: 275,050 of the calculator cluster's 1.54M, and the
sdlt-rates cluster where 63 of 98 keywords have a peer in the top ten. Expect the first readable
movement on Bing inside a month and on Google across a quarter, and expect the domain-trust gate to
cap the ceiling until the off-site workstream moves separately.


---

# Appendix F: how the voice actually differs (measured, 2026-08-17)

Hypothesis being tested: our pages read like an accountant wrote them, and that is why they do not
match how people search. Method: fetch 8 competitor pages that hold top-10 SDLT positions and 7 of
ours, strip nav/header/footer, and measure. No judgement, just counts.

| Measure | Competitor winners (8 pages) | Ours (7 pages) | Verdict |
|---|---|---|---|
| Words per page | 1,327 | 4,299 | ours 3.2x longer |
| Average sentence length | 22.9 | 21.4 | **ours shorter** |
| Flesch reading ease | 35.2 | 36.1 | **identical** |
| Question-form headings | 20% | 29% | **ours higher** |
| "you / your" per 1,000 words | 28.8 | 15.1 | theirs 1.9x |
| "we / our" per 1,000 words | 8.7 | 4.2 | theirs 2.1x |
| Statute references per 1,000 words | 0.1 | 12.3 | **ours 123x** |
| Jargon nouns per 1,000 words | 0.1 | 3.3 | **ours 33x** |

**Three assumptions died on contact with the data.** Our sentences are not longer. Our reading ease
is not worse. We use MORE question-form headings than they do. Anyone rewriting on the basis of
"simplify the sentences, ask more questions" would have spent the effort and changed nothing.

**What the difference actually is.** Statute density and jargon nouns, at two orders of magnitude,
plus half their rate of direct address, in pages three times the length. We write case-law prose
about a regime. They write instructions to a person. Those are different documents, and only one of
them matches a search for "do limited companies pay stamp duty".

**Internal control, small sample, worth following up.** Our best Bing page in the set
(`sdlt-transfer-property-company-cost`, 65 Bing clicks) uses "you" 21.6 times per 1,000 words. Our
zero-impression page in the set (`applicable-sdlt-rates-for-first-time-buyers`) uses it 7.1 times,
with the same statute density. Direct address is the variable that moves between our own winners and
our own invisible pages, which is the same variable that separates us from theirs.

**What this does NOT license.** Copying their register wholesale. Two of the four domains we tore
down rank badly, and the statute depth is our differentiator and the reason the corpus is
defensible. The target is their plain-language surface over our depth, with the citations moved to
where they support rather than lead.


---

# Appendix G: reconciliation with the 2026-08-16 research (read this before acting on anything above)

Yesterday's `RESEARCH_2026-08-16.md` and `CLUSTER_TEARDOWN_SDLT_2026-08-16.md` ran statistical tests
on a 135-page SDLT SERP corpus. Some of today's recommendations were already tested there. Where the
two disagree, yesterday's evidence is stronger, because it is a within-SERP correlation across 135
pages and today's is an observation across four domains.

## Where today is WEAKER than yesterday, and my recommendation changes

**Internal linking.** I presented the funnel rate (98% and 100% for two winners against 39% for us)
as the cheapest available lever. Yesterday tested internal links directly inside the SDLT SERP
corpus: rho -0.014, p=0.869, and competitor pages with 30 or fewer internal links hold a median
position of 8, identical to pages with more. Our own fourth teardown then broke the pattern too:
cruseburke funnels at 67% with near-total containment and holds zero top-10 slots.

Corrected position: **internal linking is hygiene, not the lever.** Do it because it costs nothing
and helps readers and crawl paths. Do NOT present it as the mechanism, and do not spend a batch on
it alone.

**Same applies to tables, word count and slug matching**, all tested yesterday and all null
(rho -0.063, -0.019, and 62% against 60% respectively). Nothing in today's work re-opens them.

## Where the two days AGREE, and the case is now double-sourced

**Page shape: the tool wins.** Yesterday: 41 of 44 top-5 slots sampled are a calculator URL or carry
a form; single-purpose calculator domains own the head; we field 4 calculators against 36 and 41.
Today: one competitor calculator carries 515 of their 843 SDLT keywords, and our own 23 calculators
hold 11 keywords between them with 5 drawing zero impressions. Two independent methods, same answer.

**The naked head term is not winnable.** Yesterday: we appear on 0 of 210 SERP slots across 14 head
queries; the best position anyone in the 16-competitor set holds on an SDLT keyword above 8,000/mo
is 6, median 49. Today: the peer-winnable slice of the 1.54M calculator cluster is 275,050, and
every peer-held slot is a modified variant. Same conclusion from both sides.

**Our strongest signal sits on the wrong page.** Yesterday found Bing returns our LBTT calculator
first for "stamp duty calculator". Today's assignment map independently put the biggest cluster on
`/calculators/stamp-duty-calculator` and found it holds zero impressions while the LBTT calculator
is our best Bing asset in the family.

## What today ADDS that yesterday did not test

1. **Phrase coverage.** Nobody measured whether the market's phrasings exist in our copy. They
   largely do not: 108 of the top 150 competitor SDLT keywords appear nowhere in 760 posts, and the
   assigned limited-company page contains **0 of its cluster's 98 keywords**, using "SDLT"
   throughout and "stamp duty" twice in 3,530 words. This is not a lever yesterday falsified; it is
   a variable yesterday did not measure.
2. **Register, measured.** Statute references 12.3 per 1,000 words against 0.1; jargon nouns 3.3
   against 0.1; direct address at half their rate. Sentence length, reading ease and question-heading
   share are NOT the difference (Appendix F).
3. **The completeness method.** Uncapped three-source harvest (competitor data alone drops 937
   queries we already earn impressions on), unique assignment, equity grading, reconciliation ledger.
4. **Full-domain teardowns** of four competitor sites, page by page.

## One more usable finding from yesterday, folded into the programme

Span of years is the single significant correlation in the whole corpus (+0.228, p=0.007): pages
citing several tax years side by side rank WORSE, and our SDLT blogs average four. Every rewrite
under this programme therefore states one current year in the lead and moves historical rates into a
clearly subordinate block.

## Net effect on the plan

Priority order changes to: **1) phrase coverage and register on pages we already own, 2) tools at
peer-winnable modified variants, 3) one-current-year discipline, 4) internal linking as free
hygiene.** The programme design in `REWRITE_PROGRAM.md` §9 is unchanged; only the billing of
internal linking as a lever is withdrawn.
