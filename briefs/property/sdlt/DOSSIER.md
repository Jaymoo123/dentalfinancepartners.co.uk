# SDLT cluster dossier (frozen 2026-08-17)

The shared context for the stamp duty cluster. Every agent working this cluster reads this file
first and adds no scope that is not in it. Method: `docs/_engines/REWRITE_PROGRAM.md` §9.
Findings behind it: `docs/property/STRUCTURE_VS_COMPETITORS_2026-08-17.md`.

**Status: paperwork only. Nothing has been written, changed or deployed.**

## 1. Scope declaration

Term family: `stamp duty` | `sdlt` | `stamp tax` | `land transaction tax` | `lbtt`. Devolved regimes
are in scope deliberately: LBTT and LTT sit in the same searcher journey and our best Bing asset in
the cluster is an LBTT calculator.

**Our pages in scope: 272**

| How identified | Pages |
|---|---|
| Family in slug or title | 73 |
| 5+ family mentions in body, not in slug or title | 199 |

Those 272 pages carry 87,308 Google impressions and 520 clicks (90d), and 14,069 Bing
impressions and 1087 clicks (91d). Full list with per-page equity: `pages_inventory.csv`.

**Competitor universe: 7 domains, 155 pages, 1,600 keywords**, uncapped, no volume floor.

## 2. Query universe: 2,448 from three sources

| Source | Queries in family | Unique to it | Pulled |
|---|---|---|---|
| Competitor ranked keywords (DataForSEO, 7 domains) | 1,600 | 1,600 | 2026-08-17 |
| Our Google Search Console | 493 | 401 | 2026-05-19 to 2026-08-15 |
| Our Bing Webmaster page-query stats | 503 | 447 | 91 days to 2026-08-17 |
| **Union** | **2,448** | | |

Competitor data alone would have dropped 848 queries we already earn impressions on. All three
sources are mandatory. Full list: `ledger.csv`.

## 3. Reconciliation ledger

Every query lands in exactly one bucket. The counts must sum to the universe or the cluster cannot
reach the pre-deploy gate.

| Bucket | Queries | Meaning |
|---|---|---|
| assigned | 1,773 | mapped to a page, and that page's pack carries it |
| already-covered | 353 | we already earn impressions, no market cluster, protected by the equity gate |
| gap-no-page | 207 | real demand, no page of ours is close |
| excluded-news | 79 | named politicians, budget speculation, abolition rumours |
| deferred-longtail | 36 | our own zero-volume tail, no action |
| **TOTAL** | **2,448** | balances against the universe of 2,448 |

Corrected 2026-08-17 (second session): the manager adjudications in §4c were originally applied to
`cluster_map.csv` and the packs but never propagated to `ledger.csv`. That is fixed: the 741
"calculate stamp duty" rows and 49 "uk stamp tax" rows now point at `/calculators/stamp-duty-calculator`,
and the 112 rows for the two NO-PAGE clusters ("stamp duty on a second house", "what is stamp duty")
moved from assigned to gap-no-page, which is why assigned is 1,773 not the originally published 1,885.
Ledger and cluster map now reconcile with zero disagreements.

## 4. Cluster map, ordered by peer-winnable volume

Peer-winnable volume counts only keywords where a specialist firm holds a top-10 slot. It is the
honest prize; raw volume is not, because the biggest terms belong to gov.uk, MoneyHelper and MSE.

Numbers below corrected 2026-08-17 (second session): the originally published table carried
pre-union cluster sizes (competitor keywords only). This table is recomputed from the frozen
`ledger.csv` (post-union, post-adjudication) and now matches `cluster_map.csv` exactly.

| Cluster | Vol/mo | Peer-winnable | Kw | Our queries | Action | Page |
|---|---|---|---|---|---|---|
| calculate stamp duty | 1,543,570 | 275,050 | 741 | 38 | REFRAME | `/calculators/stamp-duty-calculator` |
| uk stamp tax | 72,450 | 5,450 | 49 | 5 | REFRAME | `/calculators/stamp-duty-calculator` |
| sdlt rates | 6,240 | 5,130 | 107 | 61 | EXTEND-BING | `/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` |
| stamp duty first time buyer | 142,880 | 3,950 | 202 | 83 | EXTEND-GOOGLE | `/calculators/first-time-buyer-stamp-duty-calculator` |
| andy burnham stamp duty | 2,060 | 1,470 | 3 | 0 | EXCLUDE-NEWS | (none) |
| gifting a property stamp duty | 3,760 | 1,400 | 26 | 6 | REFRAME | `/blog/capital-gains-tax/gifting-property-and-deed-of-gift-tax-implications` |
| stamp duty tax return | 23,790 | 1,210 | 98 | 34 | EXTEND-GOOGLE | `/blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-refund` |
| abolishment of stamp duty | 3,110 | 1,000 | 9 | 0 | NO-PAGE | (none) |
| stamp duty and property tax | 7,150 | 360 | 93 | 60 | EXTEND-BING | `/blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice` |
| sdlt group relief | 980 | 320 | 7 | 2 | NO-PAGE | (none) |
| transfer property to limited company without stamp duty | 630 | 320 | 3 | 1 | NO-PAGE | (none) |
| stamp duty refund uninhabitable property | 460 | 300 | 8 | 0 | NO-PAGE | (none) |
| stamp duty on holiday home | 1,260 | 210 | 6 | 1 | REFRAME | `/blog/property-types-and-specialist-tax/sdlt-furnished-holiday-let-2025-abolition` |
| mixed use stamp duty calculator | 260 | 210 | 4 | 0 | EXTEND-GOOGLE | `/calculators/first-time-buyer-stamp-duty-calculator` |
| sdlt16 | 270 | 170 | 3 | 0 | NO-PAGE | (none) |
| stamp duty if one person is a first time buyer | 240 | 150 | 5 | 0 | REFRAME | `/blog/property-types-and-specialist-tax/first-time-buyer-relief-benefits-and-eligibility-requirements` |
| wales stamp duty calculator | 18,680 | 120 | 97 | 72 | EXTEND-BING | `/blog/landlord-tax-essentials/land-transaction-tax-a-complete-guide` |
| stamp duty budget 2025 | 1,610 | 120 | 6 | 0 | EXCLUDE-NEWS | `/calculators/first-time-buyer-stamp-duty-calculator` |
| stamp duty change | 20,520 | 70 | 113 | 61 | EXTEND-BING | `/blog/landlord-tax-essentials/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` |
| news on stamp duty | 4,320 | 50 | 20 | 0 | NO-PAGE | (none) |
| stamp duty on second property | 2,750 | 0 | 12 | 0 | NO-PAGE | (none) |
| stamp duty land tax return | 12,350 | 0 | 95 | 60 | EXTEND-GOOGLE | `/blog/landlord-tax-essentials/sdlt-leasehold-extension-vs-fresh-purchase` |

Material moves in the correction: `sdlt rates` peer-winnable 13,400 to 5,130 (still the top prose
cluster), `uk stamp tax` 11,080 to 5,450, `stamp duty change` 380 to 70, and `stamp duty land tax
return` plus `stamp duty on second property` fall to zero peer-winnable.

Full map with competitor domains and decision flags: `cluster_map.csv`.

## 4b. CORRECTION, same day: the calculator ordering does not survive testing

The owner asked whether the winning calculators carry text and keywords, and whether that is what we
are missing. Tested directly on the head cluster's 730 keywords:

| Page | Words | Inputs | Cluster phrases present | Of the top 50 by volume | Keywords it ranks for |
|---|---|---|---|---|---|
| uklandlordtax buy-to-let SDLT calculator | 1,430 | 9 | **7 of 730** | 3 | **515** |
| landlordstudio SDLT calculator | 1,903 | 11 | 23 of 730 | 8 | 211 |
| provestor SDLT calculator | 274 | 0 | 3 of 730 | 2 | 16 |
| **ours** | 1,199 | 22 | **7 of 730** | 4 | **0** |

Our calculator has the same phrase coverage as the page that outranks it 515 keywords to nothing,
comparable length, and more inputs. **Copy is not what separates them on this cluster**, so rewriting
our calculator has no evidential basis and it drops out of first place.

The same test on the prose cluster ('sdlt rates', 98 keywords, 63 with a peer in the top ten):

| Page | Position | Words | Cluster phrases in body | Phrases placed in URL/title/H1/headings |
|---|---|---|---|---|
| uklandlordtax rates-for-limited-companies | 2 | 777 | 2 | **2** (exact phrase in URL, title and H1) |
| provestor stamp-duty/limited-company | 3 | 985 | 3 | **0** |
| cruseburke do-limited-company-pay-stamp-duty | 32 | 1,088 | 2 | 1 |
| optimise knwbase SDLT limited companies | 38 | 808 | 2 | 1 |
| **ours** sdlt-transfer-property-company-cost | not ranking | 3,530 | **0** | **0** |

Nobody stuffs phrases. The winners carry two or three. What they have that we do not is a page whose
WHOLE SUBJECT is the question, at 777 to 985 words, titled as the subject. Ours is a 3,530-word
technical treatment of a narrower mechanism ("SDLT on transferring property to a limited company
(connected party)"), and it carries none of the cluster's phrasing anywhere, body or headings.

**What this changes.** The lever is not phrase insertion and it is not the calculator's copy. It is
subject match: does a page exist whose subject IS the question, at the length that subject deserves.
That is a harder and more honest finding, and it partly cuts against the "no new pages" constraint,
because for some clusters the answer is a short dedicated page rather than another section bolted
onto a 3,500-word essay.

**Open question, not yet answered:** why uklandlordtax's calculator holds 515 keywords when its copy
is unremarkable. Candidates are domain age, usage signals, and the SERP treating an established tool
as the entity for that intent. None of them is fixed by writing, and none is tested. Until it is,
nobody should be told a calculator rewrite will move the number.

## 5. Work order

Seven packs written, ordered by peer-winnable volume. One page may own more than one cluster; that is
consolidation working as intended, not an error.

Peer-winnable figures corrected 2026-08-17 (second session) from the frozen ledger; the originally
published numbers were pre-union. Ordering by prize is unchanged.

| # | Page | Grade | Clusters | Peer-winnable | Google 90d | Bing 91d |
|---|---|---|---|---|---|---|
| 1 | `/calculators/stamp-duty-calculator` | REFRAME | 2 | 280,500 | 0i / 0c / pos 0 | 0i / 0c / pos 0 |
| 2 | `/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` | EXTEND-BING | 1 | 5,130 | 981i / 1c / pos 8.4 | 443i / 60c / pos 5.0 |
| 3 | `/calculators/first-time-buyer-stamp-duty-calculator` | EXTEND-GOOGLE | 4 | 4,280 (120 of it news-excluded) | 1311i / 0c / pos 81.1 | 0i / 0c / pos 0 |
| 4 | `/blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-refund` | EXTEND-GOOGLE | 2 | 1,210 | 314i / 1c / pos 39.8 | 29i / 1c / pos 7.7 |
| 5 | `/blog/capital-gains-tax/gifting-property-and-deed-of-gift-tax-implications` | REFRAME | 1 | 1,400 | 49i / 0c / pos 13.1 | 0i / 0c / pos 0 |
| 6 | `/blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice` | EXTEND-BING | 1 | 360 | 273i / 4c / pos 22.7 | 61i / 7c / pos 5.9 |
| 7 | `/blog/property-types-and-specialist-tax/sdlt-furnished-holiday-let-2025-abolition` | REFRAME | 2 | 210 | 0i / 0c / pos 0 | 3i / 0c / pos 7.7 |

Grades: REFRAME means no equity to protect, full rewrite permitted. EXTEND means additive only,
protected elements byte-identical. Packs are in `packs/`.

**ORDER CORRECTED after the 4b test.** Item 1 (`/calculators/stamp-duty-calculator`) is demoted from
first place: its prize is the largest but there is no evidence that a copy change moves it. Start
instead with the prose pages where the subject-match gap is visible and measurable, and treat the
calculator as a separate experiment about tool shape, not a writing job.

Revised sequence:

1. `sdlt-transfer-property-company-cost` (EXTEND-BING, 5,130 peer-winnable on corrected numbers,
   still the top prose cluster, and the clearest subject-match gap: 0 of the cluster's 107 phrases
   anywhere against winners at 2 to 3).
2. `a-complete-guide-to-stamp-duty-refund` (EXTEND-GOOGLE, 1,470).
3. `/calculators/first-time-buyer-stamp-duty-calculator` (EXTEND-GOOGLE, 3,950, but the same caveat
   as the head calculator applies: it is a tool, so expect the copy lever to be weak).
4. The head calculator, as a tool experiment with a stated hypothesis, not as a rewrite.

### Manager adjudications on this map

- **calculate stamp duty** to `/calculators/stamp-duty-calculator`: Head tool intent belongs on the named head tool. The scorer preferred the first-time-buyer calculator only because the head tool is invisible (0 impressions on both engines), which is the defect being fixed, not evidence of ownership.
- **uk stamp tax** to `/calculators/stamp-duty-calculator`: Rates and thresholds sit with the head tool, matching how the winning competitor pairs a calculator with a rates table. The scorer's pick was a first-time-buyer page, too narrow for generic rate queries. Landlord-specific rates stay on sdlt-buy-to-let-rates-surcharge-guide-2025.
- **stamp duty on a second house** to `(no page)`: Genuine gap and the biggest unowned cluster, but note zero peer top-10 slots: no specialist firm holds this SERP either. Candidate for a second-home mode on the head calculator rather than a new essay.
- **what is stamp duty** to `(no page)`: No owner. Definition intent, zero peer top-10 slots in the whole cluster, so it earns a section on the head tool at most. Not worth a page.

## 6. Language spec for this cluster

Measured 2026-08-17 across 8 competitor pages holding top-10 SDLT slots and 7 of ours.

| Measure | Winners | Us | Target for this cluster |
|---|---|---|---|
| Words per page | 1,327 | 4,299 | no target; do not pad, do not gut |
| Sentence length | 22.9 | 21.4 | leave alone, we are already tighter |
| Flesch reading ease | 35.2 | 36.1 | leave alone, identical |
| Question-form headings | 20% | 29% | leave alone, we already exceed them |
| "you / your" per 1,000 words | 28.8 | 15.1 | **raise to 25+** |
| Statute refs per 1,000 words | 0.1 | 12.3 | **below 4 in the opening half** |
| Jargon nouns per 1,000 words | 0.1 | 3.3 | **near zero above the fold** |

**What this does NOT mean.** Do not simplify sentences, do not add question headings, do not cut the
page down to 1,300 words, and do not remove the statutory depth. Three of those were tested and are
not the difference. The change is where the citations sit and who the sentence is addressed to.

**Answer patterns observed on the winning pages.**

- The heading is the question, in the searcher's words: "How much stamp duty do limited companies
  pay?", "Do I pay stamp duty when incorporating my properties into a company?", "Who qualifies for
  First-Time Buyer Relief?"
- The answer is the first sentence under the heading, with the number in it. Context follows the
  answer, never precedes it.
- Statute appears as support, late, and usually not at all. Where we would write "under Schedule 15
  FA 2003 the sum of lower proportions applies", they write "if you are a genuine partnership you may
  pay nothing, and here is the test".
- Second person throughout: "you pay", "your company", "if you already own a home".
- One current year. Historic rates, where present, sit in a separate block below.

**Do not copy:** their thinness on reliefs, their duplicate pages, or their habit of leaving stale
years on the page. Two of the four domains torn down rank badly and their habits are not evidence.

## 7. Known limitations, stated not hidden

- `ukpropertyaccountants.co.uk` serves HTTP 202 with an empty body and publishes no reachable
  sitemap. Its 1,176 SDLT keywords across 86 pages are visible only through DataForSEO. No page
  teardown exists for it.
- Bing per-page query data exists for 67 of our 272 in-scope pages. Bing's page list is itself a
  top-N feed, so pages below that cut have no Bing detail here.
- GSC drops anonymised queries, so our Google contribution to the universe is a floor, not a total.
- DataForSEO positions are a database snapshot and can lag the live SERP. Positions in this dossier
  are directional; the live SERP is the arbiter for any single decision.
- Volume figures sum close variants, so cluster totals overstate unique demand. Peer-winnable volume
  is the number to steer by.

## 7b. Independent verification pass (2026-08-17, second session)

A separate session re-verified every load-bearing claim before the owner decision, after the owner
flagged the earlier sessions as untrustworthy. Method: four independent checks (fresh GSC and Bing
API pulls; local corpus re-measurement; ledger recomputation; live competitor fetches).

**Confirmed on fresh data (data through 2026-08-15):** the flagship `stamp-duty-calculator` really
is zero on both engines by every source checked, so REFRAME is safe. All seven work-order pages'
equity figures reproduce exactly. The Bing control holds exactly (Aug 1-15: Bing 996 clicks from
36,551 impressions vs Google 493 from 54,971). 763 of 798 sitemap URLs draw impressions. The
1,689-vs-443 Bing discrepancy on `sdlt-transfer-property-company-cost` is two endpoints:
`GetPageStats` (page total, 1,689i/65c) vs `GetPageQueryStats` (top-slice undercount, 443i/60c);
both real, use `GetPageStats` for totals.

**Confirmed on the corpus, stronger than published:** the top-150 phrase gap is 139 of 150 missing,
not 108. The `sdlt-transfer` page carries 0 of its cluster's phrases and says "stamp duty" twice in
3,444 words. No page has second-home stamp duty as its subject and the literal phrase appears in
zero posts. The hub-link counts (0 authored links to all four commercial hubs, 3 to the flagship
calculator) reproduce to the digit.

**Confirmed live on competitors:** provestor and uklandlordtax page shapes, word counts within 8%,
and the question-form-H2 pattern (their H1s are technical; the searcher phrasing sits in the first
H2). ukpropertyaccountants serves an HTTP 202 captcha stub, still uncrawlable.

**Corrected (this file already reflects it):** cluster_map and §4/§5 numbers were pre-union;
ledger adjudications propagated; reconciliation now 1,773/353/207/79/36.

**Refuted or unverifiable, do not rely on:** cruseburke's 310-URL 404 decay does not reproduce live
(0 of 30 sampled URLs 404 on 2026-08-17; site fixed or original crawl wrong), so drop the
"rival decay opportunity" note. Register magnitudes (you/your per 1,000 words) reproduce only
directionally, not in magnitude; treat Appendix F rates as ordinal. Live SERP positions are
UNVERIFIED this pass: Serper is out of credits ("Not enough credits"), so DataForSEO position
snapshots stand uncorroborated for individual queries.

## 8. What happens next

1. Owner approves the work order, or reorders it.
2. Per-page rewrite through the existing Opus chain, one page at a time, pack as the only input.
3. Eight deterministic gates, four existing (arithmetic, statute, links, query coverage) and four new
   (equity preservation, cluster coverage, ledger balance, competitor re-read).
4. `monitored_pages` row per page with both baselines; `blog_optimizations` row with the missing
   phrases as `target_keywords`.
5. Bing read at 14 and 28 days, Google at 28 and 90. Failure triggers are stated in each pack.

Nothing in step 2 onwards starts without explicit approval, and deploys stay owner-triggered.