# Bing deep dive: estate-wide research record, 2026-08-18

First dedicated Bing analysis. Every number in this document was pulled fresh
today (2026-08-18) from the Bing Webmaster Tools API and the GSC API in a
single session; nothing comes from stored Supabase snapshots. Methods and
windows are stated inline so any figure can be re-derived. Prior findings were
treated as hypotheses and re-tested; verdicts are in §3, including the ones
that did not survive.

**The short version:** Bing is still 2.1x Google on clicks but the gap is
closing fast (5x in June, 2.1x now); it is a mature-blog longtail channel, not
an easy mode. Every on-page lever except tables and CTR repair re-tested null,
head families sit permanently at Bing 4-10 under official domains, and Bing is
slower than Google on all seven new sites. Recommendation: spend Bing effort on
(a) six measured CTR-repair pages, (b) one cheap tables experiment, (c) mining
the Bing-only conversational query layer; stop treating "Bing near-miss volume"
as a harvestable prize.

Data windows used throughout:
- **Matched 28d**, both engines, daily series: 2026-07-20 to 2026-08-16.
- **92d Bing series**: 2026-05-17 to 2026-08-16 (GetRankAndTrafficStats retention limit).
- **Bing query/page level**: weekly series, ~12 trailing weeks (see §2, this was mischaracterised until today).
- GSC pulled with dataState=all; last 2 days partial; date dimension for totals (never SUM of gsc_query_data).

---

## 1. Channel truth

Matched 28d window 2026-07-20 to 2026-08-16, daily series both engines
(GetRankAndTrafficStats vs GSC date dimension):

| Site | G impr | G clicks | G CTR | B impr | B clicks | B CTR | B/G clicks |
|---|---:|---:|---:|---:|---:|---:|---:|
| property | 91,692 | 902 | 0.98% | 68,227 | 1,849 | 2.71% | 2.05 |
| generalist | 20,333 | 94 | 0.46% | 45,631 | 638 | 1.40% | 6.79 |
| solicitors | 20,981 | 331 | 1.58% | 20,970 | 577 | 2.75% | 1.74 |
| dentists | 10,587 | 109 | 1.03% | 5,278 | 97 | 1.84% | 0.89 |
| medical | 3,680 | 43 | 1.17% | 3,553 | 132 | 3.72% | 3.07 |
| construction-cis | 6,903 | 55 | 0.80% | 1,419 | 28 | 1.97% | 0.51 |
| agency | 2,110 | 5 | 0.24% | 1,968 | 35 | 1.78% | 7.00 |
| 7 July-launch sites | 14,278 | 66 | 0.46% | 1,075 | 29 | 2.70% | 0.44 |
| **Estate** | **171,580** | **1,608** | **0.94%** | **148,445** | **3,391** | **2.28%** | **2.11** |

Bing is 67.8% of estate search clicks in the window. But the ratio is a moving
number, not a constant:

| Week | G clicks | B clicks | B/G | Bing share |
|---|---:|---:|---:|---:|
| W22 (late May) | 64 | 252 | 3.94 | 79.7% |
| W26 | 143 | 548 | 3.83 | 79.3% |
| W29 | 316 | 693 | 2.19 | 68.7% |
| W33 (mid Aug) | 399 | 923 | 2.31 | 69.8% |

Over 10 complete weeks Google clicks grew 6.2x, Bing 3.7x. Both are growing;
Google is compounding faster. "Bing = 2x Google" is true today and was 5x in
June. Any plan that assumes the 2x is stable should not.

Heterogeneity warning (Simpson's): the estate 2.11x is property + generalist +
solicitors doing the lifting. Dentists (0.89), construction-cis (0.51) and all
seven July launches (0.44 pooled) are Google-first. Pooling hides this.

## 2. What the instruments actually are (all probed today)

This section corrects two standing errors and should update how every engine
script reads Bing data.

| Endpoint | What it actually returns | Coverage vs truth |
|---|---|---|
| GetRankAndTrafficStats | Daily site totals, ~92d retention, no position field | Truth source |
| GetPageStats | **Weekly series per URL** (7-day steps, Date field), ~12 weeks | Sum = 65% of 92d impressions (property: 112,683 / 172,034) |
| GetQueryStats | **Weekly series per query**, same shape | 5.2% of 92d impressions, 18.7% of clicks (property): a click-rich top slice |
| GetPageQueryStats | Per page, query rows (weekly, Date not previously captured) | 23% / 14% / 25% of impressions, 60% / 32% / 59% of clicks (property / generalist / solicitors) |
| GetUrlInfo | Works: DiscoveryDate, LastCrawledDate, DocumentSize, AnchorCount | Per-URL, throttles hard (27 of 52 calls 400'd) |
| GetCrawlStats | 400 "ThrottleUser" on both attempts today | Unusable |
| GetAiPerformance | 404, re-confirmed today | No Copilot/AI API; dashboard only |

**Correction 1: BWT query/page stats are weekly time series, not trailing
aggregates.** A query or URL appears once per week it surfaced (Date steps of
exactly 604,800,000 ms). The "duplicate rows" in prior pulls were weekly
observations, not noise. Correct totals = SUM across weeks; correct position =
impression-weighted mean across weeks.

**Consequence, a live storage defect:** `bing_query_client.py` upserts with
`date = today` and dedupes on (site, page, query, date) keeping the last row,
so `bing_query_data` silently collapses up to 12 weekly rows per query into
one. Stored Bing totals are undercounts and stored positions are one arbitrary
week. Fix is small (store the API's own week date, stop deduping), but touches
detectors that read the table. Decision 1 in §9.

**Correction 2: every query-level Bing CTR is an upper bound.** GetQueryStats
carries 5% of impressions but 19% of clicks; Bing shows you the queries that
click. The CTR curves in §4 are stated with this bias on them, and the deep
(page-query) instrument, which carries 23% of impressions and 60% of clicks,
gives materially lower CTRs than the site-level slice (24.2% vs 33.9% at
positions 1-2).

Data quality notes for anyone re-deriving: 78 of 34,159 deep rows have clicks
> impressions (Bing artifact, kept, immaterial); the 15.5+ position bucket
shows nonsense CTR on n=33 rows (AvgClickPosition vs AvgImpressionPosition
attribution, ignore that bucket); DataForSEO's Bing UK SERP endpoint returned
garbage for 5 of 10 sampled queries (npmjs, skysports, Microsoft docs for UK
tax queries, flatly inconsistent with BWT-reported positions) and must not be
used to vet Bing rankings. Its Google SERPs looked sane. Session spend on
DataForSEO: ~$0.10.

## 3. Verdicts on the eight prior beliefs

| # | Hypothesis | Verdict | Deciding numbers |
|---|---|---|---|
| H1 | Bing ~2x Google clicks estate-wide | **Confirmed today, decaying** | 2.11x in matched 28d; was 3.9-5.5x in June; G growing 6.2x vs B 3.7x over 10 weeks |
| H2 | Bing CTR curve steep, Google flat | **Bing confirmed; Google half-falsified** | Bing 24.2% (1-2) to 0.8% (8-15); Google declines 1.90% to 0.05%, so not flat, just uniformly tiny |
| H3 | ~39% of tracked Property queries at Bing 1-3 | **Confirmed by count, misleading** | 45.3% by count, 25.9% impression-weighted, and queries seen 3+ weeks reach top-3 **0%** of the time (vs 48% for one-week queries): the top-3 mass is ephemeral longtail |
| H4 | Top-3 Bing queries ~9 words vs ~6 | **Direction confirmed, size halved** | Pooled top-3 mean 8.61 words vs rest 7.20 (median 7 vs 6), MWU p=1.1e-32, n=1,773/3,148 |
| H5 | Near-misses concentrate in form/tool families | **Confirmed, but the prize is illusory** | lbtt 2,390, calculator 2,827, sa105 1,529, nrl1 1,117 impressions in the 4-15 band; those families earn ~0 clicks there (lbtt 1/1,574; sa105 1/648; nrl1 0/408) |
| H6 | Word count, H2s, internal links, title coverage are null levers | **Confirmed null or reversed** | See §6; word count is *positively* correlated with worse position (property +0.20, solicitors +0.27) |
| H7 | Bing indexation near-complete, Google the gap | **True for mature sites, falsified for new** | Medical: 274 Bing pages with data vs 20 GSC; but all 7 July launches: Google impressions day 1, Bing lag 8-25 days, pharmacies still 0 after a month |
| H8 | Format match decides tool-intent SERPs | **Weakened: necessary, not sufficient** | Our LBTT page IS a calculator, sat 4-10 for 12 straight weeks under revenue.scot, gov.scot, savills; format got page-1, authority gates top-3 |

## 4. Position economics on Bing

CTR by position, page-query level (deep instrument, 34,159 rows, all sites,
impression-weighted, ~12 trailing weeks):

| Position | Impressions | Clicks | CTR |
|---|---:|---:|---:|
| 1-2.5 | 9,457 | 2,289 | **24.20%** |
| 2.5-3.5 | 9,105 | 774 | 8.50% |
| 3.5-5.5 | 19,041 | 784 | 4.12% |
| 5.5-8.5 | 26,133 | 388 | 1.48% |
| 8.5-15.5 | 11,279 | 95 | 0.84% |

The marginal click on Bing is earned almost entirely at positions 1-2: the
1-2 to 2-3 cliff is 2.8x, 2-3 to 4-5 is another 2x. Position 4+ is near-dead,
which is the opposite of folklore "page 1 = traffic". Google same window:
1.90% at 1-3, 0.59% at 3-5, 0.28% at 5-10, 0.05% at 10-20 (query level,
28d): declining, not flat, and everywhere under 2%.

**The near-miss pool is real volume with an unreal prize.** Estate-wide,
positions 4-15: 56,453 impressions, 1,267 clicks (2.2%) in the trailing ~90d
floor. Arithmetic upper bound if everything moved to 1-2: +12,400 clicks/90d.
The reason that arithmetic fails: the biggest families are exactly the ones
that never move. Top families by naive prize:

| Family | Impr (90d floor) | Clicks | Weighted pos | Who owns top-3 (sampled) |
|---|---:|---:|---:|---|
| lbtt calculator (property) | 1,574 | 1 | 7.5 | revenue.scot x2, stampdutycalculator.org.uk |
| sra accounts rules (solicitors) | 739 | 2 | 4.7 | sra.org.uk x3 (Google; Bing SERP unverifiable, see §2) |
| vat threshold (generalist) | 702 | 1 | 8.0 | gov.uk x2 |
| dentistry compliance (dentists+generalist) | 656 | 0 | 8.3 | dentistry.co.uk x2 |
| sa105 (property) | 648 | 1 | 5.6 | gov.uk |
| paye online (generalist) | 571 | 1 | 5.6 | gov.uk x3 |
| form nrl1 (property) | 408 | 0 | 7.5 | gov.uk |

Every one is official-body-dominated. Persistence data says the same thing
from the other side: Spearman(weeks-seen, position) = +0.22 (p=3e-13,
n=1,073, property), and **no query seen in 3+ weeks ever held top-3**. Bing
top-3, where the 24% CTR lives, is transient one-week longtail; the durable
head families are parked at 4-10 earning roughly nothing.

## 5. Where Bing volume lives, and the overlap

Page-level 2x2 (Bing GetPageStats floor vs GSC pages 28d, path-normalised),
impression-weighted page-type mix:

- **Both engines**: blog posts, 89-99% of impressions on every site.
- **Bing-only**: essentially 100% blog. Bing surfaces a broader blog set on
  mature sites (medical 274 pages with Bing data vs 20 with Google impressions;
  property 1,215 including legacy URLs vs 628).
- **Google-only**: where the commercial surface lives. Core/service pages and
  calculators: generalist G-only is 42% core pages, medical 52% core, dentists
  15% calculators. **Bing barely impresses our calculators and service pages
  at all** (GetPageStats floor caveat: the uncovered 35% could hide some).

Query overlap between engines is tiny: property 56 shared queries out of 1,073
Bing / 3,525 Google. The Bing query layer is longer (mean 7.71 words vs 4.55,
MWU p<1e-300) and more interrogative (25.7% question-led vs 15.0%). This is
the conversational/Copilot-adjacent layer; no API measures Copilot citations
(GetAiPerformance 404, re-confirmed today), so its size beyond the organic
report is unknowable from here.

On the 123 shared queries with positions on both engines: Bing median position
5.0, Google 24.5; Bing better on 85%, worse on 11% (Wilcoxon p=2.1e-18).
Selection bias acknowledged (shared set = queries Bing chose to track), but
page-level divergence is one-directional too: 16 pages estate-wide sit Bing
top-5 while Google puts the same page at 20+; **zero pages** do the reverse.
Google's top-5 on those queries (SERP sample, n=10, $0.07): gov.uk, sra.org.uk,
revenue.scot, established brands. The binding constraint on Google is authority;
on Bing the same authority wall exists but only above position ~3.

## 6. Levers: what separates Bing 1-3 from 4-10

Spearman of on-page features against Bing impression-weighted page position
(negative rho = feature associated with better position). Property n=192,
generalist n=96, solicitors n=85, dentists n=56, medical n=40, agency n=41
blog pages with deep Bing data. 51 tests run; Bonferroni alpha 0.001.

| Feature | Result | Power |
|---|---|---|
| Word count | **+0.20 property\*, +0.27 solicitors\*** (longer = worse) | 1.9x p90/p10 spread, under-powered, but direction consistent with 2026-08-16 finding |
| H2 count | Null everywhere | 1.6x spread, under-powered |
| FAQ count | Null | 1.4x spread, under-powered |
| Title term coverage | Null (+0.07 to +0.11) | Adequate |
| Internal links | Weak/null (-0.14 property) | 4.7x spread, real null |
| External links | Null (one +0.35 in agency, does not survive correction) | |
| **Table count** | **-0.30 property, p=2.9e-5, survives Bonferroni** | 4.0x spread, adequate |
| **Page age** | **-0.29 property / -0.30 generalist** (older = better) | Narrow 80-130d range; confounded with wave composition; treat as maturation, not a lever |
| Crawl freshness | **Not a differentiator: Bing recrawls everything in 0-2 days regardless of rank** (GetUrlInfo n=25, median days-since-crawl 0 in every band) | No spread = nothing to optimise |

Two things survived: tables (correlational, plausibly page-type confounded)
and age (maturation). Everything the estate can cheaply crank (words, H2s,
links, title stuffing) is confirmed dead or backwards, now on six sites
rather than one.

**CTR repair, re-derived honestly:** pages significantly below their own
position band's CTR (binomial p<0.023, deficit >= 10 clicks/90d): **6 pages,
172 clicks/90d total**, led by generalist `how-to-register-for-paye-uk-employers`
(wpos 4.8, 2,578 impressions, 37 clicks, deficit 69). The 2026-08-16 figure of
"10 pages, ~400 clicks" does not reproduce on fresh data; use 6/172.

## 7. What falsifies "Bing is easier"

Looked for it as instructed; found four facts.

1. **New domains: Bing is harder.** All 7 July launches had Google impressions
   on day 1; Bing first impressions lagged 8-25 days; pharmacies has 0 Bing
   impressions after a month (verified in BWT, GetPageStats empty) while
   Google gave it 1,202 impressions and 15 clicks.
2. **The head is just as walled.** Persistent queries never crack top-3 (0%,
   §4); official domains own Bing top-3 on every family big enough to matter.
3. **The commercial surface does not exist on Bing.** Calculators and service
   pages, the pages that convert, live in the Google-only quadrant (§5).
4. **The advantage is decaying.** 5x to 2.1x in ten weeks (§1).

Honest restatement: Bing ranks our mature blog longtail 15-20 positions better
than Google and pays steeply for positions 1-2. That is a real, valuable,
narrow phenomenon, not an easy mode.

## 8. Ranked lever candidates, each with a cheap falsifiable test

1. **CTR repair on the 6 measured-deficit pages** (§6). Evidence: strong
   (page-specific binomial deficit). Test: rewrite title+meta only, no body
   changes, measure 4 weeks of weekly Bing rows against each page's own band
   CTR. Cost: 6 meta edits. Expected: up to ~170 clicks/90d.
2. **Comparison tables on mid-band posts.** Evidence: medium (rho -0.30,
   survives correction, correlational). Test: 15 property posts at wpos 4-8
   with 0 tables, add one comparison table each, 15 matched controls untouched,
   compare position/click deltas after 4 weeks of weekly rows. Cost: 15 edits.
3. **Mine the Bing-only conversational layer.** Evidence: structural (95%+ of
   Bing impressions are on queries Google never shows us; question-led,
   7.7-word). Test: 20 pages, add an H2/FAQ answering their top Bing-only
   queries verbatim, 20 controls, measure new-query acquisition in weekly
   GetPageQueryStats. Cost: 20 edits.
4. **New-site Bing bootstrap check** (pharmacies first). Evidence: 0 impressions
   is a distribution question, not a ranking one, and absence of data is a
   question. Test: confirm sitemap submission status in BWT dashboard, then
   IndexNow the sitemap URLs, measure days-to-first-impression against the
   other July sites' 8-25 day baseline. Cost: near zero, but touches IndexNow,
   so owner-gated.
5. **Do not build:** word-count deepening for Bing (wrong direction), H2/FAQ
   restructuring as a ranking play (null), internal-link meshes (null),
   freshness pings (Bing already recrawls in 0-2 days), head-family assaults
   on official-body SERPs (0% observed break-in rate).

## 9. Decisions needed

1. **bing_query_data storage fix**: store the API's week date instead of fetch
   date so weekly rows stop collapsing (small change to
   `optimisation_engine/clients/bing_query_client.py`; detectors reading the
   table need a once-over). Yes/no.
2. **Approve experiments 1-3** in §8 (6 meta edits, 15+20 body edits with
   controls, all local-first, no deploy until your sign-off).
3. **Pharmacies Bing bootstrap** (§8.4): needs BWT dashboard look + an IndexNow
   submission, which is deploy-adjacent, so asking first.
4. **Retire DataForSEO Bing SERP** as a verification instrument anywhere it is
   assumed (it failed 5 of 10 UK queries today); Bing rank checks must come
   from BWT itself.

Nothing in this document has been acted on. No content, config or pipeline
changes were made. Session external spend: ~$0.10 DataForSEO.

## Appendix: reconciliation with prior recorded findings

- "Bing = 2.1x Google clicks" (memory, 08-13): confirmed at 2.11x for the
  matched 28d, with the decay trajectory now attached (§1).
- "18% CTR at Bing 1-3" (RESEARCH_2026-08-16): reproduces as 16.5% at 1-3.5 on
  the same instrument level; the finer split is 24.2% at 1-2, 8.5% at 2-3.
- "Google CTR flat 3-20": not reproduced this window (0.59% to 0.05% decline);
  the practical conclusion (position moves on Google pay almost nothing in
  clicks) stands.
- "conversational queries 21.4% CTR" (memory, 08-13): not directly re-tested
  as stated; the structural claim it supported (Bing layer is long and
  question-led) is confirmed with n=4,921 (§5).
- "10 pages, ~400 clicks/90d recoverable via title/desc": does not reproduce;
  fresh derivation gives 6 pages, 172 clicks/90d (§6).
- "agency 97% Bing-indexed vs 18/433 Google" (memory): not re-derivable by API
  (no indexation endpoint); today's proxies: agency 186 URLs with Bing data vs
  36 with Google impressions, consistent in direction for mature sites, but
  see the new-site reversal in §7.1.
- `bing_query_stats_topn_trap` memory ("only GetRankAndTrafficStats = site
  totals"): still true, now with the mechanism (weekly series + truncation)
  and measured coverage fractions (§2).
