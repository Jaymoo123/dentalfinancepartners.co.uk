# Property commercial capture: scope, 2026-08-05

Scoping brief for the work identified in `PROPERTY_CEILING_ANALYSIS_2026-08-05.md`.
All figures pulled fresh 2026-08-05: GSC API, Bing Webmaster API, Supabase
`web_sessions`/`leads`, DataForSEO Google Ads search volume + SERP advanced.

**Headline: the local-page instinct is wrong, and the data says so clearly. The
commercial opportunity is national head terms, and the biggest single finding is
that Google impressions and Bing impressions are not the same asset.**

---

## 1. What we are seeing

### 1a. Bing converts ~2.4x better than Google, and BOTH engines are low

> **Corrected 2026-08-05 after owner challenge.** An earlier version of this
> document claimed Bing ran at 19.7% CTR and converted 19x better. That figure was
> computed from `GetQueryStats`, which returns a **truncated top-N query slice**
> biased toward high-CTR queries, not site totals. The site-level aggregate is
> `GetRankAndTrafficStats`. This is the same undercount class as
> [[gsc_query_sum_undercount]]; treat any Bing query-level sum the same way.

Site totals, `GetRankAndTrafficStats` (2026-05-17 .. 2026-08-03, 79 days):
**139,458 impressions / 3,497 clicks / 2.51% CTR.**

| Month | Bing impr | Bing clicks | Bing CTR | Google impr | Google clicks | Google CTR |
|---|---:|---:|---:|---:|---:|---:|
| 2026-05 | 15,543 | 396 | 2.55% | 26,747 | 74 | 0.28% |
| 2026-06 | 51,966 | 1,280 | 2.46% | 55,335 | 318 | 0.57% |
| 2026-07 | 67,141 | 1,692 | **2.52%** | 77,466 | 811 | **1.05%** |

Bing delivers roughly **double Google's clicks on slightly fewer impressions**, and
more leads (16 vs 11 in July). That advantage is real and worth acting on, but it is
~2.4x, not an order of magnitude.

**The more important reading: Bing's CTR is also low.** 2.52% at an average
impression position of 4-6, where 6-9% would be normal. Low CTR appears on *both*
engines. So this is not primarily an AI Overview effect, and the earlier conclusion
that "the content converts fine as a blue link and Google is uniquely broken" does
not survive the corrected data.

The likelier explanation is **query mix**: a large share of impressions on both
engines are form-code and informational queries where the searcher is satisfied by
the snippet or wants gov.uk rather than an accountant. That makes W3 (separating
winnable from unwinnable impressions) the central diagnostic task, not a tidy-up.

`GetPageStats` (1,015 pages, 89,116 impr, 2,302 clicks, 2.58% CTR) is the reliable
per-page source and tracks the site aggregate closely. Use it, not `GetQueryStats`.

Bing's queries are long and conversational (`can uk landlords claim cost of mortgage
product fee as an expense`, `does mortgage interest go into finance cost for self
assessment`), which is Copilot-shaped querying rather than keyword search.

### 1b. Local commercial terms have essentially no search volume

DataForSEO Google Ads volumes (UK):

| Keyword | Volume/mo | CPC | Property's pos |
|---|---:|---:|---:|
| property accountant / accountants | **720** | **£17.55** | 25.2 |
| landlord accountant / accountants | **390** | £11.87 | - |
| accountant for landlords | **260** | £8.63 | - |
| property tax accountant | 210 | £9.41 | 34.0 |
| property tax specialist | 210 | £11.42 | - |
| buy to let accountant | 110 | £13.72 | - |
| property accountant london | 50 | £16.06 | ~30 |
| property accountant manchester | 20 | £7.23 | 9.2 |
| property accountants leeds | **0** | - | 14.8 |
| landlord tax advice leeds | **0** | - | 12.7 |
| landlord tax accountant nottingham | **0** | - | 10.4 |
| rental accountant leeds | **0** | - | 12.6 |

The city terms Property already ranks for have **zero measured volume**. The GSC
impressions on them (Nottingham 335, Headingley 121, Leicester 117 over 90d) are
long-tail scatter across many near-zero variants, not a local market.

The volume, and the £17.55 CPC that signals what a lead is worth, sits on the
**national** head terms. Property ranks 25th for the biggest one.

### 1c. Severe cannibalisation on exactly these commercial terms

Pages competing for local/commercial property-accountant intent:

| Page | Impr (90d) | Queries | Clicks |
|---|---:|---:|---:|
| /locations/leeds | 455 | 18 | 1 |
| /blog/property-tax-accountant-london | 436 | 13 | 0 |
| /blog/property-accountant-services/property-accountant-nottingham-landlords | 331 | 8 | 0 |
| /blog/property-accountant-services/manchester-property-accountant | 177 | 8 | 0 |
| /blog/property-accountant-services/leeds-property-accountant-specialist-tax-se... | 169 | 1 | 0 |
| /blog/property-accountant-services/property-specialist-accountant-london | 148 | 18 | 0 |
| /blog/property-accountant-services/london-property-accountant | 125 | 22 | 0 |
| /blog/property-accountant-services/property-accountant-oxford-guide-local-land... | 113 | 3 | 0 |
| /blog/property-accountant-services/property-accountant-leicester | 91 | 1 | 0 |
| /blog/property-accountant-services/peterborough-property-accountant-specialist | 84 | 1 | 0 |
| /locations/birmingham | 69 | 9 | 0 |
| /blog/property-accountant-services/best-property-accountant-london | 58 | 6 | 0 |
| /blog/london-property-accountant | 40 | 9 | 0 |
| /blog/property-accountant-services/bristol-property-accountant | 25 | 3 | 0 |
| /blog/property-tax-accountant-manchester | 15 | 3 | 0 |
| /blog/portfolio-management/property-accountant-london-expert-services | 7 | 3 | 0 |

**London alone has six pages** competing for the same intent (`/blog/property-tax-
accountant-london`, `.../property-specialist-accountant-london`, `.../london-
property-accountant`, `.../best-property-accountant-london`, `/blog/london-
property-accountant`, `/blog/portfolio-management/property-accountant-london-
expert-services`) plus `/locations/london`. Every one of them earns zero clicks.

There are two parallel systems: `/locations/[slug]` (5 cities, config-driven,
proper `AccountingService` JSON-LD) and a set of blog posts doing the same job.
They were never reconciled.

### 1d. Canonicalisation defect: www and non-www both indexed

GSC reports both hostnames as separate ranking URLs:

| URL | Impr | Pos |
|---|---:|---:|
| https://www.propertytaxpartners.co.uk/locations/leeds | 805 | 24.1 |
| https://propertytaxpartners.co.uk/locations/leeds | 140 | 24.7 |
| https://propertytaxpartners.co.uk/locations/london | 80 | 33.4 |
| https://propertytaxpartners.co.uk/locations/manchester | 6 | 24.8 |

Signals are being split across two hostnames. This is a live technical defect,
cheap to fix, and it is suppressing exactly the pages under discussion.

### 1e. The national SERP is winnable, and has no local pack on the main term

`property accountant` (720/mo), SERP composition: 1 AI overview, 19 organic,
PAA, knowledge graph. **No local pack.** Ranking 1-9: thepropertyaccountant.co.uk,
ukpropertyaccountants.co.uk, fhpaccounting.co.uk, hwfisher.co.uk, nrla.org.uk,
**djh.co.uk (rank 6)**, bhp.co.uk, andrewpasser.com, mccaccountants.co.uk.

These are ordinary accountancy firm sites, not media giants. This is beatable.

`landlord accountant` and `accountant for landlords` **do** carry a 3-result local
pack (ukpropertyaccountants, gorillaaccounting, taxspace/taxd), which caps the
achievable share on those two but leaves the organic block open.

Note: **DJH, the lead buyer, ranks 6th for the head term.** Worth a conversation
before optimising hard against them; it does not block the work.

---

## 2. What this indicates we are missing

1. **We have been optimising for the weaker engine.** Every content and meta decision
   has been made against Google (1.05% CTR). Bing delivers 2.52%, about double the
   clicks and more leads, and has never had a programme pointed at it.
1b. **But CTR is weak on both engines**, so an engine switch alone does not fix it.
   The shared cause is query mix, addressed in W3.
2. **We have never targeted the money terms.** 720/mo at £17.55 CPC, and the site
   sits at position 25 with no dedicated page. The content programme has produced
   ~800 informational posts and no serious commercial page.
3. **We built a local layer for demand that does not exist**, then duplicated it in
   blog form, and the two now suppress each other.
4. **Informational content has hit diminishing returns.** 0.26% CTR at average
   position 29.8 across 3,049 queries. That is the AI Overview squeeze in first-party
   data, and it is estate-wide, not Property-specific.
5. **AI assistants already convert and nothing is aimed at them.** ChatGPT produced
   4 leads in June and 4 in July from 43 sessions. Copilot, Perplexity, Claude and
   Gemini all appear in session referrers.

---

## 3. The work

Ordered by expected value per unit of effort. W1-W3 are cheap and high-confidence;
W4-W5 are the growth bets; W6 makes the rest measurable.

### W1. Fix the canonicalisation split (hours, no content)
Force a single hostname. Verify canonical tags, `siteConfig.url`, sitemap entries
and any absolute links all use `www.`; confirm the non-www 301s at the edge. Then
re-submit affected URLs. This is a defect fix, not a growth play, but it is
currently splitting signal on the exact pages W2 depends on.

### W2. Consolidate the commercial cluster (the single highest-value action)
Sixteen pages, ~2,300 impressions, **1 click**. Collapse to a small, strong set:

- **One national money page** targeting `property accountant` / `property accountants`
  / `property tax accountant` (720 + 210/mo). This is the page that does not exist.
- **One landlord-facing money page** targeting `landlord accountant` / `accountant
  for landlords` / `buy to let accountant` (390 + 260 + 110/mo).
- **Keep `/locations/[slug]` for the five configured cities only.** Do not expand.
- **Retire or merge the ~11 city blog posts** into the above, redirecting.

**Governance gate:** the locked estate rule is rewrite-only, never collapse
([[feedback_rewrite_only_no_collapse]]), with consolidation gated behind fresh
GSC + Bing + guard + Bing veto + per-cluster owner approval
([[feedback_data_gated_consolidation]]). This scope now satisfies the data half of
that gate (fresh GSC and Bing are in this document). **Owner approval is still
required per cluster before any redirect is written.** The Bing veto matters here:
check each candidate page's Bing position before retiring it, because Bing is the
converting engine and a page that is dead on Google may be live on Bing.

### W3. Separate winnable from unwinnable impressions, then fix titles
Do not chase site-wide CTR. Split the impression base first:
- **Unwinnable**: form-code and HMRC-seeking queries (`sa105` 275 impr pos 7.8 0
  clicks, `nrl6`, `is230tnrlh1e`). The searcher wants gov.uk. No meta rewrite
  recovers these; stop counting them as headroom.
- **Winnable**: commercial and decision-stage queries where Property is present and
  not chosen. Rewrite titles/descriptions for these only, using the SERP meta engine
  that already exists.

### W4. Bing-first programme (under-exploited, but a ~2.4x edge not a 19x one)
Bing is the better-converting channel and has no programme. Scope:
- Make Bing a **co-primary** optimisation target for commercial pages alongside
  Google. (Earlier draft said "primary"; that was resting on the withdrawn 19x
  figure. At 2.4x, Bing earns equal billing, not sole priority.)
- Always read Bing volume from `GetRankAndTrafficStats` (site) and `GetPageStats`
  (per page). `GetQueryStats` is a top-N slice and must never be summed as a total.
- Full IndexNow coverage for Property (the tooling already exists estate-wide;
  confirm Property is wired and submitting on publish).
- Pull `GetPageQueryStats` per page, not just site-level, to get a page-level Bing
  ranking picture equivalent to the GSC one.
- Bing's conversational query shape argues for question-formed H2s and direct
  answer blocks, which is the same work as W5.

### W5. AI/GEO programme (already converting, currently accidental)
ChatGPT is producing ~4 leads/month with zero investment. Scope:
- Wire `GetAiPerformance` from the Bing client to get Copilot citation counts per
  page. Note the client's own ASSUMPTION FLAG: the method name is inferred and may
  need correcting against the live endpoint.
- Instrument AI referrers as a first-class channel in the analytics layer, so
  ChatGPT/Perplexity/Claude/Gemini sessions and leads are reportable, not
  reconstructed by hand as they were for this document.
- Extend answer-block structure on the commercial and high-intent pages. This is
  also what Bing rewards, so W4 and W5 share most of their delivery.
- Existing `llms-full.txt` should be re-checked against the consolidated commercial
  pages once W2 lands.

### W6. Measurement
- A repeatable version of the queries in this document, so the commercial-capture
  position is a dashboard rather than a one-off investigation.
- Baseline to hold: commercial-bucket impressions/clicks/CTR, Bing CTR by position
  bucket, AI-referrer sessions and leads, and lead volume by referrer host.
- Re-read at 28 days. Per [[feedback_time_segmented_analysis_and_qa]], segment by
  the intervention date rather than comparing raw before/after.

---

## 4. What NOT to do

- **Do not build a local page factory.** The city terms measure zero volume. Twenty
  more city pages would add twenty more cannibalising near-duplicates chasing traffic
  that does not exist.
- **Do not commission more informational blog volume for Property.** 0.26% CTR at
  average position 29.8. The marginal post is worth close to nothing on Google. If
  posts are written, write them for Bing/AI answerability, not for Google impressions.
- **Do not optimise site-wide CTR as a single metric.** It mixes unwinnable form-code
  impressions with genuinely lost commercial clicks and will produce false progress.
- **Do not treat Google impression growth as success.** It has been growing steeply
  while contributing 11 leads.

---

## 5. Geography, revisited

The point that a new market would not start from zero authority is **half right, and
the half that is wrong is decisive.**

- **Domain authority does transfer within a domain**, so a `/us/` or `/au/` subfolder
  would inherit it. But `propertytaxpartners.co.uk` is a **ccTLD**. Google hard-geotargets
  `.co.uk` to the United Kingdom, and this cannot be overridden in Search Console. A
  US or AU subfolder on a `.co.uk` will not rank in those markets. So the authority you
  would be leveraging is precisely the authority you cannot use.
- The alternatives both cost the thing you were trying to save: a **new gTLD domain**
  starts at zero authority; a **new ccTLD** (`.com.au`) likewise.
- **What does transfer** regardless of domain: the entire build system, the CRO
  machinery at full parity, the calculator fleet, the screener, the content pipeline,
  and cross-linking. That is a real head start, but it is an *operational* one, not a
  ranking one. It shortens time-to-build, not time-to-rank.
- **Content transferability differs sharply by market.** US "property tax" is a
  state-level levy on real estate, an entirely different subject from UK rental income
  taxation; almost nothing carries over, and it is 50 regimes. Australia is much closer
  in shape (negative gearing, CGT discount, land tax, a strong landlord-investor
  segment) and is the better candidate if this is revisited.

**Recommendation: hold geography until W1-W3 have run and been measured.** They are
cheap, they are high-confidence, and they directly test the thesis that Property's
commercial capture is broken rather than exhausted. If commercial capture moves, the
same playbook is worth far more applied to the seven existing sites than to a new
country. If it does not move, that is important evidence to have *before* committing
to a market where you would hold no buyer relationship.

---

## 5b. Commercial page architecture (added 2026-08-05, DataForSEO keyword universe)

### The homepage is not competing at all
Homepage, 90 days: **42 impressions, 1 click, 10 distinct queries.** It ranks for
`property tax partners` (brand) and essentially nothing else. For `landlord tax
accountant` it sits at **position 82**.

Worse, the page Google currently serves for the head term `property accountant` is
`/blog/property-accountant-services/how-to-become-property-accountant` — **a careers
article**, at position 24.8. There is a whole jobs cluster (`property accountant
jobs`, `vacancies`, `positions`, `jobs in london`, ~400/mo combined) sitting inside
the commercial category and outranking everything commercial.

And `landlord tax` (**2,900/mo**, the largest term in the UK set) returns **no
impressions at all**. Property is invisible for it.

The owner instinct that the homepage should be the money page is correct. It is
currently not in contention for any commercial term.

### Target architecture

| Page | Primary terms | Combined vol/mo |
|---|---|---:|
| **Homepage** | property accountant(s) / accountant for property (720), property tax accountant (210), specialist property accountant (170), property accountant near me (170) | **~1,270** |
| **Landlord tax hub** | landlord tax (2,900), rental property tax (590), property tax advice (320) | **~3,810** |
| **Landlord accountant** | landlord accountant (390), accountant for landlords (260), landlord tax accountant (70, £22.02 CPC), landlord accountant near me (70) | **~790** |
| **Property investor** | property investment accountant / accountant for property investors (320), investment property accountant (50) | **~370** |
| **Property management** | accountant for property management (210, **£26.15 CPC** — highest in set) | **210** |
| **Rental property** | rental property accountant (110, £15.24) | **110** |

Two cleanups fall out of this:
- **Quarantine the careers/jobs cluster.** It is the single biggest cause of the head
  term being mis-served. Noindex or relocate out of `/blog/property-accountant-services/`.
- **`landlord tax` at 2,900/mo with zero impressions is the largest single gap found
  anywhere in this analysis**, larger than the head term itself.

### Correction to §4: informational content is NOT the problem

Lead entry pages (Property, all time, session-attributed):

| Entry page type | Leads |
|---|---:|
| **blog (informational)** | **52** |
| homepage | 32 |
| other | 14 |
| services | 1 |

Informational blog pages are the **primary** lead source. The earlier "do not
commission more informational content" line was too blunt and is withdrawn.

The real split is **decision-stage vs reference-stage**, not informational vs
commercial. Top lead-producing posts are decision-stage:
`how-to-transfer-property-into-limited-company-uk` (8 leads), MTD quarterly
reporting, penalties for not declaring rental income, Section 24 finance costs,
CGT on transfer to spouse, buy-to-let limited company guide. Every one is
"I have a decision to make, what do I do".

Reference-stage content (`sa105`, `nrl6`, form codes, rate lookups) produces the
bad numbers: near-zero CTR on both engines and zero leads. This also explains the
cross-engine CTR weakness in §1a — reference queries are satisfied by the snippet
or belong to gov.uk.

**Revised rule: commission decision-stage content, stop commissioning
reference-stage content.** The distinction is testable from the lead data above,
so it can be applied to the commissioning brief directly.

## 5c. Geography: measured, four markets

Same 15 commercial terms, DataForSEO Google Ads volume, monthly:

| Keyword | UK vol / CPC | US vol / CPC | AU vol / CPC | CA vol / CPC |
|---|---:|---:|---:|---:|
| property accountant(s) | 720 / £17.55 | 720 / $32.32 | 390 / $2.64 | 210 / $3.21 |
| real estate accountant | 140 / £11.06 | **1,300 / $34.03** | 140 / $2.63 | **590 / $12.13** |
| rental property tax | 590 / £2.30 | 1,000 / $13.05 | 110 / $1.84 | 110 / $11.63 |
| landlord tax | **2,900 / £3.87** | 140 / $0.07 | 50 / – | 20 / – |
| rental property accountant | 110 / £15.24 | 260 / **$87.15** | 40 / $8.84 | 50 / $1.22 |
| real estate tax accountant | 10 / £5.94 | 320 / $36.01 | 30 / $13.71 | 50 / $10.15 |
| property tax accountant | 210 / £9.41 | 260 / $41.57 | 210 / $6.09 | 20 / $10.98 |
| property tax specialist | 210 / £11.42 | 140 / $24.74 | **260 / $4.20** | 10 / – |
| investment property accountant | 50 / – | 20 / – | **170 / $6.16** | 10 / – |
| landlord accountant | 390 / £11.87 | 210 / $20.16 | 10 / $20.43 | 10 / – |
| **TOTAL (15 terms)** | **6,840 / £10.42** | **5,240 / $34.26** | **1,850 / $8.15** | **1,320 / $7.50** |

Reading:
- **US is the value outlier.** Comparable volume to the UK but **~3x the CPC**
  (~2.4x after currency). `rental property accountant` at $87.15 CPC is the single
  most valuable term found in any market. High CPC also signals fierce paid
  competition, and it is the market where content transfers least: US "property tax"
  is a state-level ad valorem levy, an entirely different subject, across 50 regimes.
  The transferable vocabulary is `real estate accountant`, not `property accountant`.
- **Australia is the best content fit** (negative gearing, CGT discount, land tax map
  onto the existing model) but the market is ~27% of UK volume at a lower CPC. Note
  the AU vocabulary shift: `investment property accountant` (170) and `property tax
  specialist` (260) lead, not `landlord accountant` (10).
- **Canada is weakest on both** volume and fit; `real estate accountant` (590) carries
  it almost alone.
- **The UK is not the small market.** It has the highest total volume of the four, and
  `landlord tax` at 2,900/mo is bigger than any single term in any other market — and
  Property currently earns zero impressions for it.

This last point is the decisive one for sequencing: the largest single untapped term
found across four countries is in the market where we already have the domain, the
authority, the content system and the buyer.

## 6. Open questions for the owner

1. **W2 consolidation approval.** Per-cluster sign-off is required before redirects.
   Recommend starting with the London cluster (6 pages, 814 impressions, 0 clicks) as
   a single gated release, measured before touching the others.
2. **DJH ranks 6th for the head term.** Optimising hard against your own lead buyer is
   a commercial question, not a technical one.
3. **No Google Business Profile, ever** is a standing rule. It is not a blocker for
   `property accountant` (no local pack) but it does cap `landlord accountant` and
   `accountant for landlords`, which carry a 3-result pack. Confirm the rule still
   holds now that it has a measurable cost attached.

---

## AUDIT NOTE (2026-08-05, Fable session)

This document was audited against same-day re-pulls. Verdict: directionally right, materially wrong in specific numbers and two conclusions. Before acting on any figure or conclusion here, read docs/_engines/PROPERTY_ANALYSIS_AUDIT_2026-08-05.md (verdict ledger, 13 decision-changing corrections, corrected fact base) and docs/_engines/PROPERTY_ARCHITECTURE_RECOMMENDATIONS_2026-08-05.md (amended plan). Headline corrections: query-mix CTR argument refuted; Phase 4 reference-content ban refuted; city 301 direction reversed (consolidate within city, never into national pages); city denominator is 19 posts + 5 routes; landlord tax zero is Google-exact only (Bing serves it 1,064 impr / 121 clicks); local pack IS present on property accountant, so no-GBP caps 6 clusters; Bing 6-9% CTR norm unsupported.
