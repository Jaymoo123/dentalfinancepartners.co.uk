# Head cluster teardown: stamp duty / SDLT (2026-08-16)

One cluster, examined to the bottom. Everything here was pulled fresh today
(GSC API, Bing API, live SERPs, live competitor HTML). Method is stated for
every figure so any of it can be re-derived. Hypotheses that failed are
recorded as failures, not quietly dropped.

**Cluster picked because:** biggest addressable head in the map
(1,402,100/mo variant-summed, 246,000/mo on the representative keyword), we
already hold 61 assets in it, and our bespoke calculator serves literally zero
queries. Maximum contrast between what we built and what we get.

---

## 0. The short version

1. **The generic head is not winnable and nobody in our peer group has won
   it.** Across every SDLT keyword above 8,000/mo, the best position any of the
   16 tracked property-tax competitors holds is 6, and the median is 49. The
   top ten is gov.uk, MoneyHelper, MSE, estate agents and single-purpose
   calculator domains. Chasing "stamp duty calculator" is chasing a SERP no
   specialist occupies.
2. **The winnable slice is the qualified modifier, and it is held by
   calculators, not guides.** 41 of the 44 top-5 slots we sampled are a
   calculator URL or carry a form. Three are text pages. We field 4 calculators
   and 57 text pages in this cluster; our competitors field 36 and 41
   calculators respectively.
3. **We are pointed at the wrong 0.7%.** Devolved taxes (LBTT/LTT) are 0.7% of
   SDLT demand and 25.5% of our SDLT impressions. Generic calculator intent is
   60.9% of demand and 2.0% of ours.
4. **Our 4 clicks in 90 days are not a ranking problem, they are an eligibility
   problem.** We appear on 0 of the 210 SERP slots sampled across 14 head
   queries and 125 distinct domains. We do not lose these SERPs. We are not in
   them.
5. Every on-page lever tested came back null again, this time inside one
   cluster on a fresh 135-page SERP corpus. Content depth does not separate
   position 1 from position 15 here. **What separates them is whether a URL
   exists at the granularity of the query.**

---

## 1. What the cluster earns us

Fresh GSC pull, `query x page`, 2026-05-18 to 2026-08-16 (90 days), 6,334 rows
total, filtered to stamp duty / SDLT / LBTT / LTT terms.

| | Value |
|---|---:|
| SDLT queries served | 505 |
| Impressions | 6,562 |
| **Clicks** | **4** |
| CTR | 0.06% |
| Impression-weighted position | 26.8 |
| Our pages serving SDLT queries | 45 |

Bing, same cluster: 89 queries, 1,757 impressions, 38 clicks, 2.16% CTR. Bing
is again where the clicks are, and again the volume is LBTT calculator queries
sitting at position 4 to 9.

### Position bands, Google

| Band | Queries | Impressions | Clicks |
|---|---:|---:|---:|
| 1-2 | 85 | 350 | 1 |
| 3-4 | 49 | 315 | 1 |
| 5-9 | 145 | 3,287 | 1 |
| 10-19 | 52 | 547 | 1 |
| 20-49 | 40 | 418 | 0 |
| 50-100 | 134 | 1,645 | 0 |

**145 queries at position 5-9 producing one click.** The site's own Google CTR
at position 5-10 is 0.86%. This band should have produced ~28 clicks. §5
explains why it did not.

### The three calculators

| Page | Impressions 90d | Clicks | Position |
|---|---:|---:|---:|
| `/calculators/stamp-duty-calculator` | **0** | 0 | n/a |
| `/calculators/first-time-buyer-stamp-duty-calculator` | 1,311 | **0** | 81.1 |
| `/calculators/lbtt-calculator-scotland` | 29 | 0 | 14.3 |

The main calculator is **indexed and healthy**, not broken: canonical is
self-referential, the page returns 200 with 1,471 server-rendered words and 22
form inputs, and a `site:` query on Bing returns it as the number one result
for "sdlt". It simply never surfaces to a real query. The previous session's
finding is confirmed on fresh data.

One tell worth recording: `site:propertytaxpartners.co.uk stamp duty
calculator` on Bing returns our **LBTT** calculator first, and the actual stamp
duty calculator does not appear in our own top eight. Our own site's strongest
"stamp duty calculator" signal is on the wrong page.

---

## 2. What the competitors actually hold

`dataforseo_competitor_data`, site_key=property, pulled 2026-08-15, filtered to
stamp duty / SDLT keywords. 3,159-row table, 16 domains.

| Domain | SDLT keywords | Best pos | Avg pos | Volume held |
|---|---:|---:|---:|---:|
| uklandlordtax.co.uk | 133 | 2 | 36.9 | 1,377,950 |
| provestor.co.uk | 68 | 4 | 41.6 | 51,390 |
| ukpropertyaccountants.co.uk | 50 | 7 | 50.7 | 1,024,880 |
| optimiseaccountants.co.uk | 49 | 11 | 48.8 | 133,940 |
| landlordstudio.com | 42 | 40 | 58.4 | 1,249,010 |
| geraldedelman.com | 24 | 8 | 29.6 | 19,710 |
| protaxaccountant.co.uk | 23 | 20 | 79.8 | 281,980 |
| **propertytaxpartners.co.uk** | **19** | **18** | **71.9** | **2,640** |
| rossmartin.co.uk | 17 | 6 | 44.1 | 214,840 |

### Correction to the head-asset map

The map records `sdlt-calculator` as "uklandlordtax.co.uk pos 10 (calculator)"
and grades it HAVE-NEEDS-UPGRADE. Both halves mislead.

uklandlordtax's **position 2 is on "buy to let stamp duty calculator"
(1,300/mo)**, a narrow modifier. On the actual head terms the same URL sits at:

| Keyword | Volume | Their position |
|---|---:|---:|
| stamp duty estimator | 246,000 | 10 |
| calculate stamp duty | 246,000 | 39 |
| stamp duty calculator | 246,000 | 43 |
| stamp duty calculator uk | 60,500 | 33 |
| calculate stamp duty uk | 60,500 | 31 |
| calculate sdlt | 40,500 | 25 |
| sdlt calculator | 40,500 | 35 |

**Across every SDLT keyword at or above 8,000/mo, the entire tracked competitor
set produces exactly two top-ten placements**: rossmartin at 6 on "sdlt"
(12,100) and uklandlordtax at 10 on "stamp duty estimator". Every other
specialist placement on a high-volume SDLT term is position 20 to 97.

The generic head is not a gap we have failed to close. It is a SERP the whole
specialist industry is locked out of.

---

## 3. Who is actually in the SERP

14 head SDLT queries, live, region uk-en, via DuckDuckGo (Bing-powered index,
which is the engine that produces 67% of our clicks). Top 15 each = 210 slots,
125 distinct domains.

| Domain | Slots | Top-5 slots |
|---|---:|---:|
| gov.uk | 17 | 10 |
| moneyhelper.org.uk | 9 | 5 |
| savills.co.uk | 9 | 2 |
| stampdutycalculator.org.uk | 8 | 3 |
| calculatestampduty.co.uk | 7 | 0 |
| **calculatemystampduty.co.uk** | 6 | **4** |
| moneysavingexpert.com | 5 | 2 |
| knightfrank.co.uk | 4 | 1 |
| ukcalculator.com | 4 | 2 |
| ukpropertyaccountants.co.uk | 3 | 2 |
| uklandlordtax.co.uk | 2 | 1 |
| **propertytaxpartners.co.uk** | **0** | **0** |

Three classes hold this space:

- **Statutory and public-service**: gov.uk, tax.service.gov.uk, nidirect,
  revenue.scot, MoneyHelper, MSE. Not displaceable.
- **Transaction brands**: Savills, Knight Frank, Rightmove, Hamptons, L&C,
  building societies, conveyancers. They rank on brand plus a calculator, not
  on content.
- **Single-purpose calculator domains**: calculatemystampduty.co.uk,
  ukcalculator.com, stampdutycalculator.org.uk, calculatestampduty.co.uk,
  stampduty-calculator.co.uk, stampdutyrate.com. **This class is entirely
  absent from our tracked competitor universe** in
  `sites/property.discovery.json`. We have been benchmarking ourselves against
  accountancy firms that also lose.

`calculatemystampduty.co.uk` holds four top-5 slots. That is 40% of gov.uk's
count, from a 254-URL site that publishes nothing but stamp duty.

Where specialists **do** win is the qualified modifier. On "stamp duty limited
company": calculatemystampduty at 3, ukpropertyaccountants at 4, uklandlordtax
at 5, provestor at 8. Four specialists inside the top eight. On "second home
stamp duty calculator", calculatemystampduty takes slots 1 and 2.

---

## 4. Page teardown and the statistics

Every URL that ranked in those 14 SERPs was fetched and measured on
server-rendered HTML only, which is what a crawler sees. 172 URLs attempted,
141 usable (135 competitor pages plus 6 of ours).

### 4.1 Spearman, feature against SERP position, n=135

Negative rho means more of the feature goes with a better position.

| Feature | rho | p |
|---|---:|---:|
| title contains a % figure | -0.152 | 0.076 |
| distinct tax rates in body | -0.074 | 0.393 |
| table rows | -0.064 | 0.458 |
| tables | -0.063 | 0.468 |
| H2 count | -0.035 | 0.687 |
| % mentions | -0.027 | 0.757 |
| word count | -0.019 | 0.825 |
| internal links | -0.014 | 0.869 |
| title length | -0.005 | 0.950 |
| year in title | -0.004 | 0.962 |
| £ mentions | +0.029 | 0.742 |
| form inputs | +0.032 | 0.714 |
| JSON-LD types | +0.059 | 0.496 |
| **span of years mentioned** | **+0.228** | **0.007** |

One significant result, and it is a warning rather than a lever: **the more
different tax years a page mentions, the worse it ranks.** Pages that carry
2024 and 2025 and 2026 rates side by side lose to pages that state one current
year. Our SDLT blog set averages four.

### 4.2 Top-5 against 6-15, medians

| Feature | Top-5 (n=44) | 6-15 (n=91) | Our calculators | Our SDLT blogs |
|---|---:|---:|---:|---:|
| Words | 1,434 | 1,299 | 1,161 | 4,623 |
| Tables | 1 | 1 | **0** | 2 |
| Table rows | 6 | 5 | **0** | 15 |
| £ mentions | 21 | 19 | 22 | 103 |
| % mentions | 14 | 13 | 13 | 77 |
| H2 | 8 | 7 | 4 | 16 |
| Internal links | 74 | 73 | **23** | 34 |
| Form inputs | 8 | 6 | 19 | 18 |
| Year in title | 0 | 0 | 1 | 1 |

The top five and the next ten are indistinguishable on every content metric.
Our calculators sit at or near the corpus median on words, £ figures, rates and
schema. Our blog posts sit at the 96th to 100th percentile on depth and still
do not appear.

### 4.3 Three plausible causes, tested and falsified

Each of these looked like the answer. None of them is.

- **"We have no rate tables."** True (zero on all three calculators, against a
  corpus median of one). But **34% of top-5 pages also have zero tables**, and
  the table correlation is -0.063, p=0.47. Not a gate. Worth adding for readers
  and for answer-engine extraction, not as a ranking lever.
- **"Our internal linking is starved."** True and we are a genuine outlier: 21
  to 28 internal links against a corpus median of 73, putting us in the bottom
  13th percentile. But competitor pages with 30 or fewer internal links have a
  **median SERP position of 8**, identical to the pages with more. Not a gate
  either.
- **"Their URL slug matches the query and ours does not."** 62% of top-5 URLs
  carry the query's distinctive modifier in the slug, against 60% of positions
  6-15. **No discriminating power at all.**

### 4.4 The one thing that does separate them

Page shape.

| Shape | Top-5 slots | Slots 6-15 |
|---|---:|---:|
| Calculator URL with a working form | 24 | 44 |
| Form on a non-calculator URL | 10 | 28 |
| Calculator URL, no form | 7 | 11 |
| **Pure text page** | **3** | 8 |

**41 of 44 top-5 slots are a tool.** Three are prose. This is a tool SERP. We
have brought 57 essays.

---

## 5. Why 145 queries at position 5-9 produced one click

91% of the impressions in that band come from queries of six words or more.
Worse, **24 token-permutation families account for 2,027 impressions (31% of
the whole cluster) and 2 clicks**:

| Variants | Impressions | Clicks | Representative query |
|---:|---:|---:|---|
| 7 | 699 | 0 | revenue scotland lbtt non-residential rates 2026 |
| 6 | 231 | 0 | revenue scotland lbtt rates residential 2026 |
| 6 | 163 | 0 | revenue scotland lbtt rates residential property 2026 |
| 5 | 95 | 0 | lbtt rates scotland 2026 residential |
| 4 | 100 | 0 | first time buyer stamp duty uk |

Same token bag, reshuffled word order, all landing on the same page, all zero
clicks. That is the signature of machine retrieval, not human search. Our
strongest-looking SDLT position (the Scottish LBTT guide, 15,976 impressions at
position 7.1) is substantially phantom.

Split the cluster by commercial shape and the picture is stark:

| Query type | Queries | Impressions | Clicks | Weighted position |
|---|---:|---:|---:|---:|
| Contains calculator / how much / cost / rate | 250 | 3,479 | 3 | 17.6 |
| Everything else | 255 | 3,083 | 1 | 37.2 |

### Self-inflicted fragmentation, still live

78 of 505 SDLT queries are served by two or more of our own pages. Worst cases:

- `sdlt on lease extension` (201 impressions) split across **8** of our URLs,
  seven of which are `#anchor` fragments of the same post.
- `lease extension sdlt` (146 impressions) split the same 8 ways.
- `stamp duty for first time buyers` split 4 ways: our FTB calculator at
  position 91.8, our Scottish LBTT guide at 2.2, our Welsh LTT guide at 2.2.
  We answer an England-and-NI query with two devolved-tax pages.

The anchor-fragment splitting is new information and is a rendering artefact
worth fixing on its own merits.

---

## 6. What they list that we do not

Sitemap inventory, pulled today.

| | Our site | calculatemystampduty.co.uk | ukcalculator.com |
|---|---:|---:|---:|
| SDLT calculators / tools | **4** | 36 | 41 |
| SDLT text assets | 57 | 218 | 53 |
| Total SDLT URLs | 61 | 254 | 94 |

### Dedicated calculators by scenario

| Scenario | Ours | cmsd | ukcalc |
|---|---:|---:|---:|
| Generic SDLT calculator | 2 | 4 | 25 |
| First-time buyer | 1 | 1 | 2 |
| Devolved (LBTT / LTT) | 2 | 3 | 5 |
| **Second home / additional dwelling** | **0** | 3 | 6 |
| **Buy-to-let** | **0** | 2 | 2 |
| **Limited company / SPV** | **0** | 1 | 0 |
| **Commercial / mixed use** | **0** | 2 | 7 |
| **Refund, MDR and other reliefs** | **0** | 4 | 2 |
| **Non-resident surcharge** | **0** | 1 | 3 |
| **Shared ownership / staircasing** | **0** | 2 | 1 |
| **Rate comparison / price band** | **0** | 2 | 1 |

We hold deep, statute-grade **prose** on every one of those zeros: sub-sale
relief, Schedule 15 sum of lower proportions, group relief clawback, the Bewley
uninhabitable test, ADS mechanics, the 3-year replacement claim. We have never
built the tool that the SERP actually ranks.

The competitor architecture is also worth naming, because it is not a blog. It
is a taxonomy: `/calculators/`, `/tools/`, `/rates/`, `/guides/`,
`/transactions/`, `/reliefs/`, `/buyer-types/`, `/property-types/`,
`/scenarios/`, `/life-events/`, `/regions/`, `/questions/`, `/official/`.
ukcalculator.com additionally publishes ~47 programmatic price-point pages
(`/stamp-duty/stamp-duty-on-350000.html`), which is what captures the "stamp
duty on £350,000" family where uklandlordtax sits at 19 to 37.

---

## 7. Demand against our impressions

DataForSEO volume by scenario against our 90-day GSC impressions.

| Scenario | Demand /mo | % of demand | Our impressions | % of ours |
|---|---:|---:|---:|---:|
| Generic calculator | 1,191,580 | **60.9%** | 275 | **2.0%** |
| Rates and tables | 139,230 | 7.1% | 3,333 | 24.7% |
| First-time buyer | 114,860 | 5.9% | 1,242 | 9.2% |
| Second home | 70,980 | 3.6% | 551 | 4.1% |
| Commercial | 31,690 | 1.6% | 1,178 | 8.7% |
| Filing and payment | 30,620 | 1.6% | 91 | 0.7% |
| **Devolved (LBTT/LTT)** | 13,270 | **0.7%** | 3,452 | **25.5%** |
| Refunds and reliefs | 12,420 | 0.6% | 364 | 2.7% |
| Buy-to-let | 6,200 | 0.3% | 59 | 0.4% |
| Non-resident | 5,800 | 0.3% | 1,117 | 8.3% |
| Limited company | 4,120 | 0.2% | 867 | 6.4% |
| Lease extension | 2,920 | 0.1% | 627 | 4.6% |

We are 36x over-indexed on devolved taxes and 30x under-indexed on generic
calculator intent. Every place we look strong is a place almost nobody searches.

---

## 8. What this actually says

**The binding constraint in this cluster is not quality and not authority. It
is the absence of an asset at the granularity and in the shape the SERP
rewards.**

The evidence for that, rather than for the domain-authority explanation:

- Within our own domain, holding authority constant, our SDLT blog posts sit at
  position 4.5 to 9 on hundreds of queries while our SDLT calculators sit at 14,
  81 and nowhere. Same domain, same links, opposite outcomes. Page-level.
- Every content-quality feature is null across 135 ranking pages. Depth is not
  what is being rewarded, so more depth cannot be the fix.
- A 254-URL single-topic site with no accountancy credentials holds four top-5
  slots. Whatever it has, it is not authority in the sense we mean.
- Our positions on the head are 63 to 92 and our impression count on
  calculator-shaped queries is 275 in 90 days. That is not a page being
  outranked, that is a page not being considered.

The falsifiable version, so this can be tested rather than believed: **build a
calculator at the modifier granularity where a specialist already holds a top-5
slot, and it should enter the SERP within a crawl cycle. If it does not, the
constraint is domain-level after all and the head programme should be
abandoned outright.**

---

## 8a. Corrections and the widened test (same session, after owner challenge)

The owner asked three things that broke the section 9 recommendation below. All
three are answered here; **section 9 as originally written is withdrawn** and
replaced by section 9a.

### Correction 1: the "36 and 41 calculators" figures were wrong

`ukcalculator.com` is a **3,257-page generic calculator farm** (fahrenheit to
celsius, feet to centimetres, A-level grades). It is not a property tax
competitor and its "41 SDLT calculators" should never have been quoted as a
peer benchmark. Real counts, from sitemaps pulled today:

| Site | Calculator URLs |
|---|---:|
| landlordstudio.com | 22 |
| **propertytaxpartners.co.uk** | **19 live** |
| optimiseaccountants.co.uk | 18 |
| **uklandlordtax.co.uk** | **13** |
| calculatemystampduty.co.uk | 39 (single-topic site) |
| protaxaccountant.co.uk | 7 |
| rossmartin.co.uk | 6 |
| provestor.co.uk | 5 |
| getground.co.uk | 5 |
| geraldedelman.com | 3 |

**We already have more calculators than almost every peer, and uklandlordtax
beats us across the whole cluster with 13.** Asset count is not the
differentiator, so "build more calculators" does not follow from the evidence.

### Correction 2: the calculator format has already failed here, fleet-wide

Our whole calculator fleet, fresh GSC 90 days:

| | Value |
|---|---:|
| Live calculator URLs with impressions | 19 |
| Impressions | 4,007 (1.9% of site) |
| **Clicks** | **6** (0.4% of site) |

And the split is the same pathology as the SDLT cluster:

| Rank top-10, no demand | Real demand, we sit on page 6-9 |
|---|---|
| corporation-tax pos 4.8, 67 impr | first-time-buyer SDLT pos 81, 1,311 impr |
| property-allowance pos 7.0, 6 impr | commercial-mortgage pos 62, 1,213 impr |
| incorporation-cost pos 7.8, 9 impr | rental-yield pos 76, 308 impr |
| rent-a-room pos 7.9, 101 impr | buy-to-let cashflow pos 77, 216 impr |
| capital-gains pos 9.8, 44 impr | buy-to-let mortgage pos 85, 187 impr |
| ltt-wales pos 9.1, 9 impr | |

Building ten more calculators is not a new experiment. It is the twentieth run
of one that has never worked on a contested term.

### Correction 3: the query database can cross clusters off, and it just did

Applying one rule to the head-asset map, on fresh 90-day GSC query data:
**an asset we already own that sits at position 40+ on its own head is proven
failure, not an unbuilt upgrade.**

| Verdict | Clusters | Head volume | Share |
|---|---:|---:|---:|
| WORKING | 2 | 41,300/mo | 1% |
| CONTESTED (pos 15-40, mostly losing) | 5 | 1,638,500/mo | 52% |
| **PROVEN-FAIL (built, lost)** | **11** | **1,299,730/mo** | **41%** |
| NO-PRESENCE | 3 | 201,200/mo | 6% |

The eleven crossed off, with our own impression-weighted position on the head:

| Cluster | Map verdict | Our weighted position |
|---|---|---:|
| btl-mortgage-calculator | HAVE-NEEDS-UPGRADE | 91.6 |
| rental-yield-calculator | HAVE-NEEDS-UPGRADE | 78.2 |
| sdlt-first-time-buyer | HAVE-NEEDS-UPGRADE | 77.0 |
| sdlt-rates-guide | HAVE-NEEDS-UPGRADE | 61.8 |
| holiday-let-tax | HAVE-NEEDS-UPGRADE | 54.0 |
| ltd-co-buy-to-let | HAVE-NEEDS-UPGRADE | 53.7 |
| bridging-loans | HAVE-NEEDS-UPGRADE | 49.3 |
| section-24 | HAVE-NEEDS-UPGRADE | 47.9 |
| cgt-guide | HAVE-NEEDS-UPGRADE | 45.9 |
| capital-allowances | HAVE-NEEDS-UPGRADE | 44.4 |
| mtd-landlords | HAVE-NEEDS-UPGRADE | 42.3 |

Six of our owned assets have **zero impressions in 90 days**:
`/calculators/stamp-duty-calculator`, `/resources/stamp-duty`,
`/resources/capital-gains`, `/calculators/bridging-loan-calculator` (plus the
two `/resources` hubs are noindexed and canonical to the homepage, per §3 of
`RESEARCH_2026-08-16.md`).

Only **two clusters are working**: LBTT Scotland (position 7.4) and LTT Wales
(position 10.7). Combined head volume 41,300/mo, which is 1% of the programme
and, per §7, 0.7% of actual demand.

---

## 9a. Revised conclusion

Three independent tests now agree, and none of them is about content quality:

1. **19 calculators produce 6 clicks.** Format is not the constraint.
2. **11 of 21 head clusters were already built and already lost**, by 30 to 80
   positions. Coverage is not the constraint.
3. **No on-page feature predicts position** across 135 ranking pages, and
   competitors with 5 to 13 assets beat us with 19. Page quality is not the
   constraint.

The pattern that survives all three: **we rank at position 5-10 on anything
uncontested and at position 40-90 on everything contested, regardless of what
we build or how well we build it.** That is a domain-strength signature, not a
content signature. It matches the corpus-wide finding in
`RESEARCH_2026-08-16.md` §2, reached by a different route.

**So: do not build the ten calculators, and do not run the head-asset
programme.** 41% of it is already disproven by our own live pages and another
52% sits in a band we have never converted.

What the same data says does work: the long tail. Google +76.1% and Bing +52.7%
clicks 28 days over prior 28, median position 8.6, and competitors hold
near-zero top-10 blog placements above 3,000/mo.

**The one genuinely untested variable is off-site authority.** It is the only
explanation left standing and we have no instrument for it anywhere in the
estate. Pricing that instrument is the one thing worth an owner decision here.

---

## 9. Recommendation (WITHDRAWN, superseded by 9a — retained for audit)

**Build three scenario calculators, measure on Bing, decide the rest from the
result.** Pick the three where a specialist already occupies a top-5 slot, so
the SERP is demonstrably open to a firm like us:

1. **Second home / additional dwelling SDLT calculator** — calculatemystampduty
   holds slots 1 and 2; 70,980/mo; the 5% surcharge is a number we already own.
2. **Limited company / SPV SDLT calculator** — four specialists inside the top
   eight; our incorporation corpus is the deepest thing on the site; the 17%
   Schedule 4A rate is locked ground truth.
3. **Commercial / mixed-use SDLT calculator** — 31,690/mo, KD 0 on the head
   variant, and we hold the Horton Hall and Bewley tribunal analysis nobody
   else has.

Each is a new URL wired into the blog cluster that already ranks for its
scenario. Additive only, no redirects, no collapses. Revert is deleting three
routes.

Deliberately **not** recommending:

- Upgrading `/calculators/stamp-duty-calculator` to chase the generic head. No
  specialist ranks there and the natural experiment already ran.
- The ~3,500-word teardown standard. Top-5 median is 1,434 words and depth
  correlates at -0.019.
- Adding rate tables and internal links as a ranking play. Both were tested
  here and both are null. Add tables for readers and answer engines, and fix
  the internal linking because a 13th-percentile figure is embarrassing, but do
  not expect either to move position.

Two fixes that stand on their own merits regardless of the above:

- **Anchor-fragment splitting.** `sdlt-leasehold-extension-vs-fresh-purchase`
  is competing with seven of its own `#section` fragments on the same queries.
- **Devolved pages answering England queries.** Our Scottish LBTT and Welsh LTT
  guides are ranking at position 2.2 for "stamp duty for first time buyers".
  That is a mis-targeted impression, not a win.

One inventory correction: `sites/property.discovery.json` tracks 16 competitors
and **none of the six single-purpose calculator domains that actually hold this
SERP.** The competitor universe should be extended before the next discovery
run, or every subsequent gap analysis will keep measuring us against firms who
are also losing.

---

## 10. Method, limits and reproduction

- **Our search data**: Google Search Console API, `query x page`, `page` and
  `query` dimensions separately, 2026-05-18 to 2026-08-16, no stored snapshots.
  Bing Webmaster `GetQueryStats`. Script:
  `scratchpad/sdlt_pull.py`.
- **Competitor rankings**: `dataforseo_competitor_data`, site_key=property,
  `date_pulled` 2026-08-15. Google positions. No new paid calls were made,
  £0.00 spent on this analysis.
- **Live SERPs**: DuckDuckGo, region uk-en, 14 queries x 15 results,
  2026-08-16. DDG is Bing-indexed, which matches the engine that gives us 67%
  of clicks. **Limit: one sample, one engine, no personalisation control. It
  agrees with the independent GSC evidence (positions 63-92, four clicks) but
  it is not a Google SERP and should not be read as one.**
- **Page teardowns**: direct HTTP fetch, server-rendered HTML only, no
  JavaScript execution. Pages that render their content client-side will be
  understated. 31 of 172 URLs were unusable (403, 202 bot-walls, or JS-only).
- **Statistics**: Spearman rank correlation with a normal approximation for p,
  n=135. Small-sample caution applies to the top-5 subgroup (n=44).
- **Not done**: no backlink data (no instrument), no Google SERP purchase, no
  volume repricing of the 4,191 NULL-volume candidates. All three would cost
  money and need sign-off.

Scratch scripts live in the session scratchpad, not the repo:
`sdlt_pull.py`, `sdlt_analyse.py`, `sdlt_serp.py`, `teardown.py`,
`teardown2.py`, `serp_corpus.py`, `stats.py`, `stats2.py`, `stats3.py`.

Nothing in this document has been acted on. No page was written, no deploy was
run, no monitor was created.
