# Ecommerce Finance: measured competitor universe and raw gap register

Date: 2026-09-25. Question asked: who actually ranks for the demand
`www.ecommercefinance.co.uk` is chasing, which of them are peers of our class,
and how large is the keyword gap that a blog expansion programme could target.

This document is evidence for `docs/_engines/NETNEW_PROGRAM.md` section 8.2. It
stops at the annotated register. Subject clustering and page planning are the
next agent's job and are deliberately absent.

## Instruments

| Source | Call | What it gave | Pulled |
|---|---|---|---|
| DataForSEO SERP | `serp/google/organic/live/regular`, `location_code=2826`, `language_code=en`, desktop, `depth=20` | Organic top 20 for 58 of 60 seed queries | 2026-09-25 |
| DataForSEO Labs | `dataforseo_labs/google/ranked_keywords/live`, `location_code=2826`, `language_code=en`, `limit=1000`, ordered by `keyword_info.search_volume desc` | Ranked keyword sets for 13 domains | 2026-09-25 |
| DataForSEO Backlinks | `backlinks/summary/live` | Referring domains and first-seen backlink date per domain | 2026-09-25 |
| GSC API | `searchanalytics.query`, `sc-domain:ecommercefinance.co.uk`, dims `["query"]`, rowLimit 25000, 2026-06-27 to 2026-09-25 | 310 queries we earn impressions for, for the `we_rank` flag | 2026-09-25 |
| Bing Webmaster | `GetUserSites` then `GetQueryStats("https://ecommercefinance.co.uk/")` | 185 queries we earn impressions for, for the `we_rank` flag | 2026-09-25 |
| Sitemaps | `GET /sitemap.xml`, recursing sitemap indexes | Published URL counts | 2026-09-25 |

Seed queries: the 60 in `docs/ecommerce/DEMAND_BASELINE_2026-09-25.md` section
"Seed queries for competitor discovery", read from that file, not retyped.

### Errors, quoted exactly

Two of the 60 seed SERPs failed and are not in the tally. DataForSEO returned:

- `e-commerce accountants liverpool`: `40106 Task completed with partial results. Some pages could not be retrieved after several retry attempts. You have not been charged for the pages that were not returned.`
- `vat on ecommerce sales`: `40101 Internal SE Server Error.`

So the domain tally below is built from **58 SERPs, not 60**. Both failures are
minor for the tally (Liverpool is a local-intent query; `vat on ecommerce sales`
is covered by six near-identical seeds that did succeed), but the counts are 58,
and no domain's appearance count should be read as out of 60.

One more limitation to carry through. The 60 seeds come from our own GSC query
set, which the baseline shows is 59% IOSS/OSS by impressions. The competitor
universe below therefore over-represents EU VAT compliance vendors and
under-represents the rest of UK ecommerce accountancy. It measures who owns the
demand we currently touch, not the whole niche.

## 1. The competitor universe (step 1)

383 distinct registrable domains appeared in the organic top 20 across the 58
seed SERPs. Every one carries a tier. Tier definitions:

- **PEER**: a specialist UK accountancy, tax or ecommerce-finance firm of roughly
  our class. Rule 2 of section 8.2 needs one of these ranking as proof a site of
  our class can appear.
- **VENDOR**: software or a VAT compliance service. Not a peer (their content
  teams and domain trust are not comparable) but they cover the subjects, so they
  are harvested for keywords and kept separate.
- **BRAND**: national or institutional publisher, carrier, professional body,
  paid tax publisher, bank or payments brand. Covers the subject, cannot be used
  as proof of peer eligibility.
- **EXCLUDED**: with a reason, per the brief. Government and EU institutional
  domains, UGC (Reddit, Quora, YouTube, forums, social), marketplaces and
  platforms, directories and SIC lookups, news outlets, trade press,
  MoneySavingExpert and similar, lenders, non-UK sites, and our own estate.

Tier totals across all 383: **PEER 53, VENDOR 42, BRAND 20, EXCLUDED 268.**

Every domain that appeared on two or more seed queries is listed below, ranked
by number of seed queries then by best position. The single-query tail is
summarised underneath rather than listed line by line, with its tier counts, so
nothing is dropped without a number against it.


| Seed queries | Best pos | Domain | Tier |
|---|---|---|---|
| 32 | 2 | youtube.com | EXCLUDED: UGC video |
| 27 | 1 | gov.uk | EXCLUDED: UK government |
| 22 | 1 | vat-one-stop-shop.ec.europa.eu | EXCLUDED: EU institutional |
| 20 | 2 | reddit.com | EXCLUDED: UGC forum |
| 20 | 3 | revenue.ie | EXCLUDED: government (Ireland) |
| 20 | 4 | simplyvat.com | VENDOR |
| 19 | 4 | taxually.com | VENDOR |
| 17 | 2 | avalara.com | VENDOR |
| 17 | 2 | accaglobal.com | BRAND: professional body |
| 17 | 4 | vatupdate.com | EXCLUDED: news aggregator |
| 16 | 1 | royalmail.com | BRAND: carrier |
| 14 | 4 | vatcalc.com | VENDOR |
| 13 | 2 | easproject.com | VENDOR |
| 13 | 2 | en.wikipedia.org | EXCLUDED: encyclopaedia |
| 12 | 2 | dhl.com | BRAND: carrier |
| 12 | 3 | library.croneri.co.uk | BRAND: paid tax publisher |
| 12 | 13 | fintua.com | VENDOR |
| 11 | 5 | justanswer.co.uk | EXCLUDED: UGC Q&A |
| 11 | 8 | vatit.com | VENDOR |
| 11 | 13 | nshift.com | VENDOR: shipping software |
| 10 | 5 | commenda.io | VENDOR: US |
| 9 | 4 | facebook.com | EXCLUDED: UGC social |
| 8 | 6 | avask.com | PEER |
| 8 | 7 | accountingweb.co.uk | EXCLUDED: trade press |
| 7 | 1 | linkedin.com | EXCLUDED: UGC social |
| 7 | 2 | stripe.com | BRAND: payments |
| 7 | 4 | community.shopify.com | EXCLUDED: UGC forum |
| 7 | 11 | sovos.com | VENDOR |
| 6 | 2 | e-accounts.co.uk | PEER |
| 6 | 2 | globalvatcompliance.com | VENDOR |
| 6 | 2 | yourecommerceaccountant.co.uk | PEER |
| 6 | 6 | hellotax.com | VENDOR |
| 5 | 3 | vat-digital.com | VENDOR |
| 5 | 5 | sellercentral.amazon.co.uk | EXCLUDED: marketplace |
| 5 | 5 | a-wise.co.uk | PEER |
| 5 | 5 | europa.eu | EXCLUDED: EU institutional |
| 5 | 7 | marosavat.com | VENDOR |
| 5 | 8 | e2eaccounting.co.uk | PEER |
| 5 | 10 | crossbordertradehub.intertradeireland.com | EXCLUDED: cross-border public body |
| 5 | 11 | linkmybooks.com | VENDOR |
| 5 | 11 | amavat.eu | VENDOR |
| 5 | 13 | whistlparcels.co.uk | BRAND: carrier |
| 5 | 16 | vatcompliance.co | VENDOR |
| 4 | 1 | ecommerceaccountants.co.uk | PEER |
| 4 | 2 | siccode.co.uk | EXCLUDED: directory/lookup |
| 4 | 2 | nace.lursoft.lv | EXCLUDED: EU/state classification lookup |
| 4 | 2 | numeral.com | VENDOR: US |
| 4 | 4 | icaew.com | BRAND: professional body |
| 4 | 5 | find-and-update.company-information.service.gov.uk | EXCLUDED: UK government |
| 4 | 6 | customs-taxation.learning.europa.eu | EXCLUDED: EU institutional |
| 4 | 6 | a2xaccounting.com | VENDOR |
| 4 | 7 | forums.moneysavingexpert.com | EXCLUDED: MoneySavingExpert |
| 4 | 7 | nathantrust.com | EXCLUDED: non-UK (Ireland) |
| 4 | 9 | sterlinxglobal.com | PEER |
| 4 | 9 | taxdisputes.co.uk | PEER |
| 4 | 11 | ukbusinessforums.co.uk | EXCLUDED: UGC forum |
| 3 | 2 | tax.thomsonreuters.co.uk | BRAND: paid tax publisher |
| 3 | 3 | uwm.co.uk | PEER |
| 3 | 4 | shopify.com | EXCLUDED: marketplace/platform |
| 3 | 6 | crunch.co.uk | BRAND: national online accountancy |
| 3 | 7 | ebay.co.uk | EXCLUDED: marketplace |
| 3 | 7 | beanninjas.com | EXCLUDED: non-UK |
| 3 | 7 | postoffice.co.uk | BRAND: carrier |
| 3 | 8 | simplevat.eu | VENDOR |
| 3 | 8 | support.prodigi.com | EXCLUDED: platform support docs |
| 3 | 8 | effglobal.com | VENDOR |
| 3 | 8 | support.a2xaccounting.com | VENDOR |
| 3 | 9 | vertexinc.com | VENDOR: US |
| 3 | 9 | landmarkglobal.com | BRAND: carrier |
| 3 | 10 | webgility.com | VENDOR: US |
| 3 | 10 | crossbordervat.com | VENDOR |
| 3 | 10 | asendia.com | BRAND: carrier |
| 3 | 11 | quora.com | EXCLUDED: UGC forum |
| 3 | 11 | geraldedelman.com | PEER: UK chartered firm (.com TLD) |
| 3 | 13 | enty.io | EXCLUDED: tail, non-UK or off-subject |
| 3 | 13 | moneywellness.com | EXCLUDED: tail, non-UK or off-subject |
| 3 | 13 | gosimpletax.com | VENDOR: UK self assessment software |
| 3 | 14 | 360accountants.co.uk | PEER |
| 3 | 15 | fiscalsolutions.co.uk | PEER |
| 3 | 15 | 1office.co | EXCLUDED: tail, non-UK or off-subject |
| 3 | 17 | litrg.org.uk | EXCLUDED: charity/public-guidance body |
| 3 | 17 | elektronauts.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 1 | eclear.com | VENDOR |
| 2 | 2 | 365finance.co.uk | EXCLUDED: lender |
| 2 | 2 | sleek.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 3 | cliftonpf.co.uk | EXCLUDED: lender |
| 2 | 3 | shipbob.com | BRAND: fulfilment |
| 2 | 4 | jpaccountant.info | EXCLUDED: tail, non-UK or off-subject |
| 2 | 4 | gerlach-customs.com | VENDOR: tail (non-UK TLD, VAT/customs service) |
| 2 | 4 | flexlogistics.uk | BRAND: carrier |
| 2 | 4 | sage.com | VENDOR: accounting software |
| 2 | 5 | 1stdirectory.co.uk | EXCLUDED: directory |
| 2 | 5 | quaderno.io | VENDOR |
| 2 | 5 | tolley.co.uk | BRAND: paid tax publisher |
| 2 | 5 | novuna.co.uk | EXCLUDED: lender |
| 2 | 5 | blue-shore.co.uk | PEER |
| 2 | 5 | uk.linkedin.com | EXCLUDED: UGC social |
| 2 | 5 | socialcommerceaccountants.com | PEER: UK ecommerce accountancy (.com TLD) |
| 2 | 5 | lancingcotswold.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 5 | bigcommerce.co.uk | EXCLUDED: marketplace/platform |
| 2 | 5 | gelato.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 6 | tradefinanceglobal.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 6 | portmanfinancegroup.co.uk | EXCLUDED: lender |
| 2 | 6 | fullyaccountable.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 6 | rsm.global | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | grow.ee | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | weareuncapped.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | elverecommerceaccountants.co.uk | PEER |
| 2 | 7 | chacc.co.uk | PEER |
| 2 | 7 | blog.shorts.uk.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | support.getbyrd.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | flexlogistics.eu | EXCLUDED: tail, non-UK or off-subject |
| 2 | 7 | tasconsulting.ie | EXCLUDED: tail, non-UK or off-subject |
| 2 | 8 | legislate.tech | EXCLUDED: tail, non-UK or off-subject |
| 2 | 8 | rangewell.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 8 | goecom.co.uk | PEER |
| 2 | 8 | copa.org.uk | EXCLUDED: membership body |
| 2 | 8 | passportglobal.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 8 | guilfordaccounting.co.uk | PEER |
| 2 | 9 | samos-e.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 9 | uk.interparcel.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 9 | aade.gr | EXCLUDED: tail, non-UK or off-subject |
| 2 | 9 | taxjournal.com | EXCLUDED: trade press |
| 2 | 10 | xactaccountants.co.uk | PEER |
| 2 | 10 | archimediaaccounts.co.uk | PEER |
| 2 | 11 | taxopolis.eu | EXCLUDED: tail, non-UK or off-subject |
| 2 | 11 | wise.com | BRAND: payments |
| 2 | 11 | fzcoltd.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 11 | weareprocarrier.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 12 | unicornaccounting.co.uk | PEER |
| 2 | 12 | domytax.cz | EXCLUDED: tail, non-UK or off-subject |
| 2 | 13 | ramp.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 13 | shiptheory.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 14 | legal500.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 14 | parcel2go.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 16 | xsellco.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 16 | help.easproject.com | VENDOR |
| 2 | 16 | rayneressex.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 17 | sbo.financial | EXCLUDED: tail, non-UK or off-subject |
| 2 | 17 | accountingfirms.co.uk | EXCLUDED: directory |
| 2 | 17 | smartdirections.co.uk | PEER |
| 2 | 17 | dhaccountsandtax.co.uk | PEER |
| 2 | 17 | help.parcelbroker.co.uk | BRAND: carrier |
| 2 | 18 | yondatax.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 18 | strongabogados.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 18 | wemakewebsites.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 18 | whizconsulting.net | EXCLUDED: tail, non-UK or off-subject |
| 2 | 19 | charteredaccountants.ie | EXCLUDED: tail, non-UK or off-subject |
| 2 | 20 | jetworldwide.com | EXCLUDED: tail, non-UK or off-subject |
| 2 | 20 | ecommercefinance.co.uk | EXCLUDED: our own site |
| 2 | 21 | credibly.com | EXCLUDED: tail, non-UK or off-subject |

Tail (appeared on exactly one seed query, 232 domains), tiered by the same rule: PEER 30, VENDOR 11, BRAND 3, EXCLUDED 188.

### The PEER tier, and what it is worth

Only **eight PEER domains** appeared on three or more seed queries:
`avask.com` (8 queries, best position 6), `e-accounts.co.uk` (6, best 2),
`yourecommerceaccountant.co.uk` (6, best 2), `a-wise.co.uk` (5, best 5),
`e2eaccounting.co.uk` (5, best 8), `ecommerceaccountants.co.uk` (4, best 1),
`sterlinxglobal.com` (4, best 9), `taxdisputes.co.uk` (4, best 9),
`uwm.co.uk` (3, best 3), `360accountants.co.uk` (3, best 14),
`fiscalsolutions.co.uk` (3, best 15).

Rule 2 passes: `ecommerceaccountants.co.uk` holds position 1 on a seed query and
four PEER domains hold a top-5 position on at least one. A firm of our class can
rank on this demand. That is the single most important finding in step 1.

What rule 2 does not say is how much room there is. Across the 58 SERPs, the top
of almost every IOSS or OSS result set is held by government, EU institutional
pages, carriers and VAT compliance vendors, not by peers. Peers win on the
seller-facing and practice-facing queries (`hmrc letter ebay`, `amazon fba
accounting`, `ecommerce accountants`), not on the scheme-mechanics queries that
carry 59% of our current impressions.

## 2. Keyword harvest (step 2)

Twelve domains were harvested, seven PEER and five VENDOR, chosen by seed-query
count and best position within each tier, plus `ecommercefinance.co.uk` itself so
the gap is visible. Rows are `ranked_keywords` from DataForSEO Labs, UK database,
ordered by search volume descending.

**How much was pulled.** The endpoint caps a call at 1,000 rows. Nine of the
thirteen domains have fewer than 2,000 ranked keywords in the UK database and
were pulled **complete**. Four exceeded 2,000 and were pulled to the **top 2,000
by search volume**: `e-accounts.co.uk` (2,000 of 3,044), `a-wise.co.uk` (2,000 of
6,358), `taxually.com` (2,000 of 2,682), `avalara.com` (2,000 of 3,101). The
"Ranked keywords" column is the endpoint's own `total_count`, so the true size is
visible even where the pull was capped. Columns derived from rows (vol>=100,
top-10, ranking pages) are computed on what was pulled and are therefore floors,
not totals, for those four.


| Domain | Tier | Ranked keywords | Rows pulled | Keywords vol>=100 | Top-10 | Ranking pages | Sitemap URLs | Referring domains | First backlink seen |
|---|---|---|---|---|---|---|---|---|---|
| avask.com | PEER | 976 | 976 | 573 | 139 | 64 | 985 | 549 | 2019-10-18 |
| yourecommerceaccountant.co.uk | PEER | 493 | 493 | 235 | 65 | 60 | 171 | 1462 | 2021-07-25 |
| e-accounts.co.uk | PEER | 3044 | 2000 | 1855 | 68 | 118 | 441 | 247 | 2021-01-23 |
| e2eaccounting.co.uk | PEER | 1512 | 1512 | 870 | 49 | 94 | 183 | 186 | 2024-11-07 |
| a-wise.co.uk | PEER | 6358 | 2000 | 2000 | 125 | 200 | 447 | 237 | 2021-07-28 |
| ecommerceaccountants.co.uk | PEER | 1605 | 1605 | 903 | 97 | 71 | 408 | 306 | 2020-08-04 |
| sterlinxglobal.com | PEER | 820 | 820 | 459 | 7 | 114 | 1629 | 421 | 2021-01-21 |
| simplyvat.com | VENDOR | 577 | 577 | 320 | 198 | 72 | 327 | 562 | 2019-01-20 |
| taxually.com | VENDOR | 2682 | 2000 | 1430 | 722 | 155 | 950 | 1147 | 2019-01-20 |
| linkmybooks.com | VENDOR | 957 | 957 | 457 | 79 | 128 | 2068 | 1007 | 2021-03-08 |
| a2xaccounting.com | VENDOR | 558 | 558 | 268 | 82 | 109 | 134 | 1570 | 2019-01-19 |
| avalara.com | VENDOR | 3101 | 2000 | 1562 | 1136 | 274 | n/a | 13960 | 2019-01-16 |
| ecommercefinance.co.uk | US (ours) | 15 | 15 | 8 | 0 | 6 | 102 | not in index | none |

`avalara.com` publishes no reachable `/sitemap.xml` at either host, so its
published URL count is recorded as n/a rather than guessed.
`ecommercefinance.co.uk` returned `20000 Ok.` from `backlinks/summary/live` with
a **null result**, meaning the domain is not yet in DataForSEO's backlink index
at all. That is recorded as "not in index", not as zero, because the two are
different claims.

### What the table says

Our row is the point. **15 ranked keywords against a peer median of roughly
1,500.** Eight of our fifteen have volume of 100 or more; none is top-10. Six of
our 102 published URLs rank for anything DataForSEO can measure. The peers with
the biggest numbers are not the oldest or the largest: `e2eaccounting.co.uk`
first shows a backlink in November 2024, under two years old, and already ranks
for 1,512 UK keywords off 183 published URLs. `ecommerceaccountants.co.uk` ranks
for 1,605 off 408 URLs with 306 referring domains.

That is the encouraging half. The discouraging half is in what those keywords
actually are, which section 4 covers.

## 3. Cost incurred

Summed from the `cost` field DataForSEO returned on each call, nothing estimated:

| Step | Calls | Cost (USD) |
|---|---|---|
| Step 1, SERP, `serp/google/organic/live/regular` | 58 successful of 60 | 0.2030 |
| Step 2, Labs `ranked_keywords/live` | 19 (13 domains, 1 to 2 pages of 1,000 each) | 2.0896 |
| Step 2, `backlinks/summary/live` | 13 | 0.3125 |
| **Total** | **90** | **2.6051** |

Under the $15 ceiling by a wide margin, so the harvest ran without stopping to
check back. GSC, Bing and sitemap pulls are free.

## 4. The gap register (step 3)

Output: `docs/ecommerce/gap_register_2026-09-25.json`, one object per
deduplicated keyword with `keyword`, `normalised`, `volume`, `kd`, `band`,
`we_rank`, `peer_ranks_top20`, `uk_relevant`, `ecommerce_topical`, and a
`domains` map giving each ranking domain's tier, position and ranking URL.

Field notes, so the next agent does not over-trust them:

- **`we_rank` is text matching, and therefore an approximation.** It is true when
  the keyword, lowercased and stripped of punctuation, exactly equals one of the
  310 GSC queries or 185 Bing queries we earn impressions for. It will read false
  for a keyword we do in fact earn impressions on under a different phrasing, and
  the baseline document itself records that GSC anonymises a large share of our
  query rows (its query dimension sums to 3,448 of 8,776 impressions). Treat
  `we_rank: false` as "no evidence we rank", never as "proven absent". Rule 1 of
  section 8.2 wants the stronger claim, so a subject that survives on this flag
  still needs a manual GSC check before a page is commissioned.
- **`peer_ranks_top20`** is true when at least one of the seven PEER-tier
  harvested domains holds position 20 or better on that keyword, taken from the
  Labs position, which is a database snapshot and can be stale.
- **`band`** uses the Labs `search_volume`: under-100, 100-5000, over-5000.
- **`uk_relevant`** is a rule I wrote and it is a judgement, not a measurement.
  It requires an accounting, tax, legal or finance angle in the keyword text and
  rejects US tax terminology (nexus, 1099, IRS, EIN, state sales tax, LLC, S
  corp), non-UK geography, and pure marketplace-operations phrasing. It is
  keyword-text only, so it will pass some generic UK accountancy terms and reject
  some genuinely relevant ones.
- **`ecommerce_topical`** is an extra flag I added, not in the brief, because
  without it the numbers mislead. It is true when the keyword names ecommerce,
  a marketplace, a platform, an online selling concept, or a cross-border scheme
  (IOSS, OSS, EORI, import VAT, postponed VAT). See the candour section.

## 5. Is this niche winnable for a 10-week-old site

Honestly: **partly, and the 150-page target is not supported by this evidence.**

What supports optimism:

1. **Rule 2 passes cleanly.** Peers of our class rank, several in the top five,
   one at position 1. This is not a SERP owned end to end by gov.uk and Avalara.
2. **Age is not the gate it was on Property.** `e2eaccounting.co.uk` has a first
   backlink dated 2024-11-07 and ranks for 1,512 UK keywords. Property's
   equivalent table showed every competitor dating to 2019 to 2022. A site under
   two years old got there here.
3. **Page count is not the gate either.** `yourecommerceaccountant.co.uk` ranks
   for 493 keywords off 171 published URLs, `e2eaccounting.co.uk` for 1,512 off
   183. Neither needed a 760-page corpus.
4. **We already have position 11-30 eligibility** on 33 queries per the baseline,
   which is a different and cheaper problem than eligibility from zero.

What argues against the 150-page number, and this is the finding I would not
want softened:

1. **The ecommerce-specific gap is small.** Of the 11,729 keyword union, only
   1,507 are ecommerce-topical at all, and only **96** pass all of: not
   `we_rank`, `peer_ranks_top20`, band 100-5000, `uk_relevant` and
   `ecommerce_topical`. Those 96 carry 32,590 monthly searches. Property's
   equivalent filter left 188 keywords and 86,310 searches, and that was one
   cluster of one site.
2. **The 96 collapse further on inspection.** They contain large near-duplicate
   families: eleven variants of the EORI number checker, five of "amazon
   warehouse locations uk", six of "ecommerce accounting". Collapsed to distinct
   subjects, the realistic count is roughly **25 to 40 pages**, not 150.
3. **The 708-keyword figure is the honest headline only if you read what is in
   it.** 612 of the 708 are not ecommerce keywords. They are generic UK
   small-business tax: "uniform tax rebate", "P800 tax refund", "35k after tax",
   "D0 tax code", "small business accountant". The peers rank for them because
   `e-accounts.co.uk` and `a-wise.co.uk` are generalist UK accountancy firms who
   happen to also serve online sellers. Their 3,044 and 6,358 keyword counts are
   built on generalist tax content, not ecommerce content. Copying that route
   would mean writing generic UK tax pages on an ecommerce-branded domain, which
   is a different programme from the one commissioned and puts the site into
   direct competition with our own generalist estate site.
4. **The head of our own demand is the hardest part of the SERP.** IOSS and OSS
   carry 59% of our impressions, and those SERPs are held by gov.uk, the EU
   one-stop-shop portal, Royal Mail, DHL and VAT compliance vendors with 500 to
   14,000 referring domains. Peers appear there, but low. More pages on IOSS
   mechanics is the least likely thing in this dataset to move.

The shape the evidence actually supports: a **cohort of 12 to 15 pages** on the
ecommerce-topical survivors (EORI mechanics, Vinted and platform-reporting tax,
Etsy and eBay seller tax, ecommerce accounting basics), measured against section
8.4's kill criteria, before anything larger is authorised. Section 8.4 already
requires exactly that and forbids a second cohort until the first reads. If the
cohort clears its bar, the question of whether to widen into generalist UK tax
is an owner decision about brand and estate cannibalisation, not a data question.



## Counts

- **Domains SERPed**: 383 distinct registrable domains across 58 successful seed SERPs (60 attempted, 2 errored, quoted above).
- **Domains harvested**: 13. Seven PEER, five VENDOR, plus `ecommercefinance.co.uk` as the comparison row.
- **Raw keyword union size** (deduplicated on normalised text, all 12 competitor domains): **11,729**.
- **Size after `uk_relevant`**: **7,320**.
- **Size in the 100-5000 band** (and `uk_relevant`): **4,861**.
- **Size passing all of `not we_rank`, `peer_ranks_top20`, band 100-5000** (and `uk_relevant`): **708**.
- Of those 708, ecommerce-topical: **96**. The other 612 are generic UK small-business tax keywords the PEER firms rank for as generalist accountants.
- For reference: `we_rank` true on **29** of 11,729 keywords; ecommerce-topical across the whole union **1,507**; band under-100 **3,613**; band over-5000 **382**.
