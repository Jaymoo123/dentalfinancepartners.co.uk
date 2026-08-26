# Medical corpus, batch 3: the remainder of the site

**Built** 2026-08-26 · **Spec** `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5 · **Language spec** `docs/medical/language_spec_2026-08-26.md` (rules A to L, V1 to V9) · **Ground truth** `docs/medical/house_positions.md` · **Market map** `docs/medical/cluster_dossier_2026-08-26.md` (CORRECTED §4 ordering)
**Predecessors** `BATCH1_INDEX.md` (12 pages, fixed), `BATCH2_INDEX.md` (7 net-new pages, shipped `d2e75655`)

**Status: preparation only.** No page content written. Nothing under `Medical/web/` edited. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron or scheduled job created. **No paid API call was made by this task: $0.00.**

**Repo HEAD at build time: `d2e75655` (`git rev-parse HEAD`, 2026-08-26).** This document first stated `7be12b11`, taken from a session-start environment snapshot. **That is wrong and `git cat-file -t 7be12b11` finds no such object on this branch.** Every revert anchor in every batch-3 pack is `d2e75655`, and a pack that copied the wrong sha would write a revert command that undoes batch 2 as well as its own page. Caught by two wave-A pack writers independently. **Derive the sha live, never from an environment banner.**

Batch 1 fixed twelve existing pages. Batch 2 built seven pages the site did not have. **Batch 3 is everything else**, and it is bigger than both together: 100 live URLs that have had no content pass, plus 26 market-map topics with no page. The owner's instruction is that Medical be finished completely, so this document is the plan for the whole remainder, not for one wave.

---

## 0. Read this first: three corrections to the inputs

**0.1 The `medical_stage0/` pulls named in the task brief did not exist.** A search of every session scratchpad under `%TEMP%/claude/C--Users-user-Documents-Accounting/*/scratchpad` and of the whole repo returned no `gsc_page_rows.json`, `gsc_query_rows.json`, `bing_query_stats.json` or `bing_page_stats.json`. They were scratch from the Stage 0 session and are gone. **Every figure in this document is therefore from a fresh pull made by this task**, not from a stored snapshot and not from the missing files. Both APIs are free; no paid call was made.

```
# 2026-08-26, scratchpad medical_stage0/pull.py
GSCQueryFetcher("medical")  ->  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"])        window 2026-05-25..2026-08-23  -> 21 rows
  searchanalytics().query(dimensions=["page","query"]) same window                    -> 259 rows
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")  -> 303 rows, 14 weekly snapshots
BingWebmasterClient().get_query_stats("https://medicalaccounts.co.uk") -> 648 rows
```

**Data-through 2026-08-23 on both engines**, which matches the date the brief expected. The GSC window ends three days before today because GSC finalises with a lag; the Bing window is the 13 weekly snapshots dated 2026-05-29 to 2026-08-21, which is the closest available match to the same 90 days.

**0.2 The Bing impression endpoint is now named, closing STATE backlog item 5.** That item records that §9.2's grade test says "impressions" without saying which Bing endpoint, and that the two endpoints disagree on the same page. **This grading run uses `GetPageStats` page-level impressions, summed across the 13 weekly snapshots in the window.**

The disagreement is live in this data, and it was re-measured after a wave-A pack writer challenged the first figure printed here. Both pages re-pulled 2026-08-26 via `BingWebmasterClient().get_page_query_stats(...)` against the full `https://www.` URL:

| Page | `GetPageStats` page level | `GetPageQueryStats` named-query level |
|---|---|---|
| `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | 7 clicks, **129** impressions | 55 rows, 51 distinct queries, 7 clicks, **85** impressions |
| `/blog/pcn-funding-network-contract-des-explained` | 7 clicks, **85** impressions | 47 rows, 7 clicks, **65** impressions |

**This document first printed "55 rows summing to 51 impressions" for the GMS page. That was wrong: 51 is the distinct-query count, and the impression sum is 85.** Corrected here from a re-pull rather than reconciled.

**The trap is worse than a simple 2x gap and the corrected numbers show why: the CLICKS agree exactly at 7 on both endpoints while the impressions differ by 34%.** An agreement on one field is an invitation to compare the other, and the two are not comparable. Grades in section 2 are page-level throughout; the per-page query evidence in the packs is named-query level and is never set against a grade number.

**One further endpoint trap, found by a pack writer and worth more than the numbers.** `GetPageQueryStats` returns an **empty list rather than an error** when `page` is passed as a path instead of the full `https://www.` URL. A writer following the batch-1 exemplar, which shows a path argument, gets zero rows and honestly reports "no Bing query data for this page" as a finding. That is a silent-failure path producing a false negative, and it should be fixed in the client or the exemplar.

**0.3 What actually happened to the corpus today, verified from git rather than taken on trust.** The brief describes "about 55 posts with new titles and descriptions and a hero image today". The real shape:

| Change, today | Posts | Commit |
|---|---|---|
| Hero image plus `imageCredit` added (`image: ""` before) | **86** | `bb1db095` (79) plus the 7 batch-2 posts |
| `metaTitle` or `metaDescription` re-authored | **32** | `054030f9`, `77cc1bed` |
| Hero image only, no meta change, no body change | **52** | |
| Meta and/or hero touched with **no body change at all** | **72** | |

So the number of posts carrying a fresh meta and a hero image and no content work is 32, not 55; the number carrying a hero image and nothing else is 52. **The figure that governs this batch is neither: it is 55, and it is arrived at differently** (section 2). The coincidence is not a coincidence in a useful way and should not be used as a cross-check.

---

## 1. The frozen exclusion, derived live

**Run with no status predicate, as required.**

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- run 2026-08-26 via the Supabase Management API, project dhlxwmvmkrfnmcgjbntk
-- 19 rows
```

| # | slug | status | monitor_until |
|---|---|---|---|
| 1 | `__home` | **flagged** | 2026-10-06 |
| 2 | `becoming-gp-partner-financial-implications` | active | 2026-09-10 |
| 3 | `buying-into-gp-partnership-capital-parity-explained` | active | 2026-09-10 |
| 4 | `gp-accounting-guide` | **flagged** | 2026-09-10 |
| 5 | `gp-limited-company-tax-benefits-drawbacks` | active | 2026-09-10 |
| 6 | `gp-partner-vs-salaried-gp-tax-comparison` | active | 2026-09-10 |
| 7 | `gp-partnership-mutual-assessment-period-what-to-check` | active | 2026-09-10 |
| 8 | `gp-partnership-tax-complete-guide` | active | 2026-09-10 |
| 9 | `gp-payroll-services` | active | 2026-09-10 |
| 10 | `gp-pension-contributions-tax-relief` | active | 2026-09-10 |
| 11 | `gp-tax-deductions-complete-list-2026` | active | 2026-09-10 |
| 12 | `gp-vat-registration` | active | 2026-09-10 |
| 13 | `locum-doctor-self-assessment-filing-guide` | active | 2026-09-10 |
| 14 | `locum-doctor-tax-complete-guide` | active | 2026-09-10 |
| 15 | `medical-professional-expenses-what-is-claimable` | active | 2026-09-10 |
| 16 | `nhs-pension-annual-allowance-complete-guide` | active | 2026-09-10 |
| 17 | `nhs-pension-for-locums-form-a-form-b` | active | 2026-09-10 |
| 18 | `nhs-pension-scheme-pays-doctors-deadlines` | **flagged** | 2026-09-10 |
| 19 | `nhs-pension-tapered-annual-allowance-calculator` | active | 2026-09-10 |

**All nineteen are frozen. A `status='active'` filter silently excuses rows 1, 4 and 18, and that mistake was already made once today.** `flagged` is written in exactly one place (`optimisation_engine/analysis/detectors.py:1400`) and nothing resets it: it is a de-duplication stamp on an open regression, which makes a flagged row more sensitive than an active one, not less.

**Row 18, `nhs-pension-scheme-pays-doctors-deadlines`, is not this batch's, at any date.** It is being prepared separately for application on 2026-09-11. It appears nowhere in any wave below and no pack may write toward it. Its ownership rows (O4 in the batch-2 map) still bind every page in this batch.

**Row 1, `__home`, is frozen to 2026-10-06** and is out of scope for a further reason: it was already rewritten by the 2026-08-26 corepage pass, so its window is knowingly re-baselined and a second change inside it would destroy the re-baseline too.

**Rows 2, 3, 6, 7, 8 are the GP-partnership set, and rows 13, 14, 17 are the locum set.** They are not merely excluded, they are the *owners* of two of this batch's largest clusters, which is why waves E and D cannot start before 2026-09-11 (section 5).

---

## 2. The corpus, and the grade for every untreated page

### 2.1 The real corpus size

The brief expects roughly 149 live indexable pages against a markdown glob of 86. Both ends were re-derived.

Derivation: `Medical/web/src/app/sitemap.ts` read line by line and each generator resolved to its source.

| Source | Count | Resolved from |
|---|---|---|
| `staticPaths` | 19 | the literal array in `sitemap.ts` |
| `/calculators/<slug>` | 10 | `slug:` field in `src/lib/tools/configs/*.ts` |
| `/locations/<slug>` | 5 | `Medical/niche.config.json` `locations[]` |
| `/blog/<category-slug>` | **9** | `getAllCategories()` over post frontmatter |
| `/blog/<post-slug>` | **86** | `content/blog/*.md` |
| `/medical-guides/<slug>` | 6 | `MEDICAL_GUIDES` in `src/lib/medical-guides-data.ts` |
| `/resources/<slug>` | 3 | `content/resources/*.md` |
| **Total sitemap URLs** | **138** | |

**138, not 149 and not 130.** The Stage 0 figure of 130 predates the seven batch-2 posts and one new category. The markdown glob returns 86 because 52 of the 138 are not markdown at all: they are TSX routes, TS data entries, TS tool configs and derived category hubs. STATE backlog item 2 already made this point about `/resources/`; it generalises further than that item says.

**One of the 138 is a 404.** See section 7, defect D1.

### 2.2 Treatment status

| Status | URLs | Meaning |
|---|---|---|
| FROZEN | 19 | live `monitor_until`, section 1 |
| BATCH1 | 12 | content pass 2026-08-26, inside its own post-batch read |
| BATCH2-new | 7 | shipped today, no data yet |
| **UNTREATED** | **100** | this batch |

The 100 untreated URLs break down as **55 blog posts**, 16 statics, 8 category hubs, 8 calculators, 5 guides, 5 locations, 3 resources. The 55 posts is the number the brief reached by a different route, and it is the correct one: it is every markdown post that is not frozen and was not written or fixed in batch 1 or batch 2.

### 2.3 Grade distribution across the untreated corpus

§9.2 applied verbatim. Bing graded first.

```
REFRAME  = Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300
EXTEND   = Bing clicks >= 3 OR Bing impressions >= 300 OR Google clicks >= 1 OR Google impressions >= 300
```

| Grade | Untreated URLs | of which posts |
|---|---|---|
| **EXTEND** | **31** | 21 |
| **REFRAME** | **69** | 34 |
| NO-PAGE | 26 market-map topics | n/a (section 4) |

**Of the 69 REFRAME pages, 44 have no data at all on either engine.** Zero GSC impressions, zero Bing impressions, zero of everything. That is not the same as ranking nowhere and it is stated as such in every pack: a page with no history has never been given the chance to fail, and on a domain where Google indexes 21 of 138 URLs the absence is a fact about crawl demand, not about the page. The other 25 REFRAME pages have a measurable trace (1 to 49 impressions) and their packs carry it.

### 2.4 THE GRADING RULE THE SPEC DOES NOT COVER, and the ruling

**§9.2 has a hole and 26 pages fall in it.** REFRAME requires Bing clicks **= 0**. EXTEND requires Bing clicks **>= 3**. A page with **1 or 2 Bing clicks** and under 300 Bing impressions and under 300 Google impressions and no Google clicks matches neither branch. Twenty-six URLs sit there, 21 of them untreated.

The hole is not academic on this site, because the brief's reason for grading Bing conservatively is exactly what the data shows. Every one of the 26 is ranking, and ranking high:

| Bing avg impression position, the 26 unclassified pages | count |
|---|---|
| 1.0 to 3.0 | 9 |
| 3.1 to 5.0 | 10 |
| 5.1 to 7.0 | 7 |

Not one sits below position 7 on Bing. `/blog/gp-accounting-software` holds **1.2**, `/blog/gp-accountant-glasgow` holds **1.0**, `/locations/manchester` holds **1.5**. These are pages earning a click a month from a handful of impressions at the top of the Bing SERP, which is precisely the equity a title change puts at risk on a site where Bing sends 3.4x Google's clicks.

**RULING: 1 or 2 Bing clicks at a Bing average impression position of 10 or better grades EXTEND.** All 26 qualify on the position test, so all 26 grade EXTEND, and the 21 untreated ones are counted as EXTEND in section 2.3. The position condition is written into the rule rather than left implicit, so that a future page with two Bing clicks from position 40 is not frozen by accident. **This ruling should be promoted into `REWRITE_PROGRAM.md` §9.2 as a third row**, because the hole is in the shared spec and will recur on every site where Bing is the working channel. It is recorded here and not edited into the engine doc, because the engine doc is not this task's file.

### 2.5 The untreated EXTEND pages, ranked

Additive only. K2 applies: metaTitle, H1 and existing H2 order are frozen on every one of these.

| Page | G clicks/impr (pos) | B clicks/impr | Wave |
|---|---|---|---|
| `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | 1 / 141 (7.3) | 7 / 129 | **A** |
| `/medical-guides/ir35-for-locums` | 0 / 0 | 10 / 77 | D |
| `/blog/pcn-funding-network-contract-des-explained` | 0 / 0 | 7 / 85 | **A** |
| `/medical-guides/medical-expenses-tax-treatment` | 0 / 0 | 5 / 120 | H |
| `/blog/gp-bookkeeping-guide-uk` | 0 / 0 | 4 / 23 | C |
| `/blog/locum-tax` (category hub) | 3 / 344 (9.1) | 3 / 21 | **LEAVE ALONE** |
| `/blog/gp-partnership-last-man-standing-premises-risk` | 0 / 0 | 3 / 8 | **B** |
| `/calculators/salaried-gp-vs-partner` | 0 / 0 | 3 / 16 | E |
| `/blog/gp-accountant-services-complete-guide` | 1 / 72 (17.6) | 0 / 4 | G |
| `/resources/locum` | 1 / 48 (13.4) | 0 / 0 | D |
| the 21 pages graded EXTEND by §2.4 | 0 / 0 to 0 / 35 | 1 to 2 clicks | various |

---

## 3. Pages I recommend LEAVING ALONE

Today's meta pass deliberately left 34 pages untouched because a rewrite resets the measurement baseline. The same logic applies here and it applies harder, because a content pass resets more than a title does. **Ten surfaces should not be worked in this programme at all, and the reason is different in each group.**

**3.1 `/blog/locum-tax` (category hub). Do not touch.** It is the best-earning untreated page on the site: **3 Google clicks from 344 impressions at position 9.1**, plus 3 Bing clicks. It is also a category hub, whose entire job under rule V4 is to route, and **six of its children are in wave D**. Rewriting a routing page in the same window as the pages it routes to is self-competition by construction, and this particular hub is the one page in the untreated set with a real Google position to lose. Revisit only after wave D's 28-day read, and then only if the children have not absorbed its queries.

**3.2 The three legal statics: `/privacy-policy`, `/terms`, `/cookie-policy`.** Boilerplate. Not content surfaces. They are in the sitemap and in the 138 and they are excluded from every wave.

**3.3 `/blog/gp-tax-and-accounts` (category hub, 35 Google impressions at position 12.2, 1 Bing click).** Same argument as 3.1 in weaker form: it earns impressions, it is a router, and eleven of its children are in waves C, E and F. Leave until those read out.

**3.4 The five `/locations/<city>` pages and the eleven `gp-accountant-<city>` posts are not "leave alone", they are "not yet".** They are deferred to wave G and the reason is stated there rather than here, because it is a sequencing reason and not a quality one.

**3.5 One page needs a decision before anyone decides whether to leave it alone.** `/blog/private-practice-incorporation-complete-guide` is recorded in STATE as **undeployed and 301-redirecting** to `medical-practice-incorporation-step-by-step`. The markdown file is in the corpus and the sitemap emits the URL. If it is genuinely redirecting, the sitemap is advertising a 301 and the page cannot be worked; if it is not, the site has two near-identical incorporation guides. **This is a live-state question, not a content question**, and it gates wave C (section 5, and defect D3).

---

## 4. The NO-PAGE topics, in CORRECTED priority order

Source: `docs/medical/cluster_dossier_2026-08-26.md` §4, **using the correction note dated later the same day**, not the originally published column. The correction re-derived peer-winnable against the validated 22-domain peer set in `competitor_universe_2026-08-26.md` §2a rather than the narrower set first used; eight of the 32 rows moved more than two places, and four rows published as zero are not zero. Under the owner's standing instruction (decision 21), peer-winnable **orders** the work and never excludes any of it.

Six of the 32 rows were taken by batch 2 (corrected orders 1, 2, 3, 4, 10, 13, plus nurses). **Twenty-six remain.** Ordered as corrected:

| Corrected order | Row # | Topic | Total vol | Peer-winnable (corrected) | Prescription | Owner status | Wave |
|---|---|---|---|---|---|---|---|
| 5 | 7 | payroll nhs / payroll number on payslip | 5,490 | **3,750** | section on `/blog/gp-payroll-services` | **FROZEN to 09-10** | H |
| 6 | 2 | is the nhs pension scheme good | 3,250 | 3,210 `†` | section on `/calculators/nhs-pension-scheme-pays` | batch 1, in read window | H |
| 7 | 6 | qof 2025/26 | 1,310 | **2,630** | section on `/blog/qof-income-...-explained` | batch 1, in read window | H |
| 8 | 3 | how does the nhs pension scheme work (accrual) | 2,220 | 2,110 | section on `/calculators/nhs-pension-scheme-pays` | batch 1 | H |
| 9 | 9 | pharmacist accountant | 1,390 | **2,090** | new page | **NOT MEDICAL'S** (`pharmacies` site owns rows 18-19) | none |
| 11 | 8 | mileage tax claim / nhs mileage allowance | 2,270 | **1,290** | section on `/blog/gp-tax-deductions-complete-list-2026` | **FROZEN to 09-10** | H |
| 12 | 20 | what is a GMS / APMS contract | 1,180 | **1,140** | section on `/blog/how-gms-funding-works-...` | free | **A** |
| 14 | 21 | how is nhs pension calculated (final salary) | 1,070 | **480** | section on the tapered calculator | **FROZEN to 09-10** | H |
| 15 | 17 | nhs pension increase / uplift | 1,930 | **260** | section on `/medical-guides/nhs-pension-annual-allowance` | batch 1 | H |
| 16 | 26 | qof register | 840 | **140** | section on the QOF page | batch 1 | H |
| 17 | 13 | nhs pensions contact address / details | 6,720 | 0 | section on `/nhs-pension` | batch 1 | H |
| 18 | 14 | nhs pension refund form (RF12) | 3,600 | 0 | section on `/blog/nhs-pension-for-locums-form-a-form-b` | **FROZEN**, and see O6/E ruling | D |
| 19 | 15 | nhs pension death in service | 3,490 | 0 | section on `/calculators/nhs-pension-scheme-pays` | batch 1 | H |
| 20 | 16 | pension nhs contact / email | 3,160 | 0 | section on `/nhs-pension` | batch 1 | H |
| 21 | 18 | pension tapered annual allowance | 1,450 | 0 | section on the tapered calculator | **FROZEN** | H |
| 22 | 19 | gmc revalidation | 1,400 | 0 | new page or GMC hub section | free | F |
| 23 | 22 | nhs pension ill-health retirement (tier 2) | 1,000 | 0 | new section on `/nhs-pension` | batch 1 | H |
| 24 | 23 | self-administered pension scheme | 970 | 0 | section, private-practice pension | free | F |
| 25 | 24 | abatement of pension | 940 | 0 | section on `/research/annual-allowance-...-index` | batch 1 | H |
| 26 | 25 | is nhs pension salary sacrifice | 860 | 0 | section on `/calculators/nhs-pension-scheme-pays` | batch 1 | H |
| 27 | 27 | retire and return | 760 | 0 | section on `/blog/nhs-pension-partial-retirement-...` | batch 1 | H |
| 28 | 28 | what happens to my nhs pension when i die | 730 | 0 | section, survivor benefits | free | H |
| 29 | 29 | nhs deferred pension / adult dependant | 440 | 0 | section on `/nhs-pension` | batch 1 | H |
| 30 | 30 | nhs pensions complaints / overpayments | 410 | 0 | section on `/nhs-pension` | batch 1 | H |
| 31 | 31 | nhs pension redundancy | 390 | 0 | section on `/blog/nhs-pension-tax-charges-how-to-minimize` | batch 1 | H |
| 32 | 32 | added years nhs pension | 280 | 0 | section on `/calculators/nhs-pension-scheme-pays` | batch 1 | H |

**Three things this table makes visible that the ordering alone does not.**

1. **Only one of the 26 is workable right now: corrected order 12, GMS/APMS**, prescribed onto `/blog/how-gms-funding-works-global-sum-carr-hill-explained`, which is free and is wave A's anchor page. It goes in the wave A pack.
2. **Twenty-one of the 26 are NHS-pension sections prescribed onto pages that are frozen or inside a batch-1 read window.** That is not a scheduling accident, it is the dossier's own §4 finding restated: 30 NHS-pension consensus topics are competing for 9 of our NHS-pension pages. They cannot be worked as 21 new pages without becoming a page per keyword, which §9.3 forbids, and they cannot be worked as sections until their host pages are free. **Wave H exists for exactly this and it is the last wave.**
3. **Corrected order 9, pharmacist accountant (2,090 peer-winnable), is the highest-value remaining NO-PAGE topic and it is not ours.** `expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` assigns rows 18 and 19 to the live `pharmacies` site. Recorded so the absence is a decision rather than an oversight.

**Two ABSORB clusters remain unpackable**, unchanged from `BATCH2_INDEX.md` §7: opticians and allied health have no accountancy vocabulary anywhere in the 32,872-row harvest, because none of the 27 harvested domains runs such a page. The $1.13 seed-and-harvest fix is priced there and is still not authorised. **Other agents are concurrently writing opticians and allied-health packs**; if they succeed, those clusters attach to wave F and this index should be amended rather than re-planned.

---

## 5. THE WAVE STRUCTURE

**This batch must not be written as one wave, and the binding reason is the ownership map, not size.** Batch 1 failed with twelve pages and no map. Batch 2 succeeded with seven pages and a map built first. A single wave of 100 URLs would need one map spanning the whole site, which is the same as having no map: V3 is only enforceable when a human can hold the whole batch in mind at once.

**The sizing rule used: a wave is as large as the set of pages that share facts with each other and with nothing outside the wave.** That is what makes its map coherent and what guarantees no two pages in it compete.

| Wave | Cluster | Surfaces | Grades | Earliest start | Gate |
|---|---|---|---|---|---|
| **A** | GP practice income and NHS funding | 6 | 5 EXTEND, 1 REFRAME | **now** | none |
| **B** | GP surgery premises | 3 | 2 EXTEND, 1 REFRAME | **now** | none |
| **C** | Incorporation and company structures | 10 | 1 EXTEND, 9 REFRAME | **now, after one ruling** | defect D3 (section 7) |
| **D** | Locum, IR35, umbrella: namespace de-cannibalisation | 12 | 5 EXTEND, 7 REFRAME | **2026-09-11** | 3 frozen owners |
| **E** | GP partnership accounts and profit | 8 | 4 EXTEND, 4 REFRAME | **2026-09-11** | 5 frozen owners |
| **F** | Private practice, goodwill, sale and exit | 8 | 2 EXTEND, 6 REFRAME | **2026-09-11** | 1 frozen owner |
| **G** | Commercial and city acquisition set | 24 | 4 EXTEND, 20 REFRAME | **~2026-09-24** | batch-2 28-day read |
| **H** | NHS pension NO-PAGE sections | 21 topics onto ~9 hosts | additive sections | **2026-09-11** | frozen + batch-1 read windows |

Waves A, B and C have **zero shared facts with each other** and can run concurrently today. D, E, F can run concurrently with each other from 09-11. G and H are single-threaded because both touch pages that other waves also touch.

### Wave A. GP practice income and NHS funding. Start now.

| Page | Grade | Evidence |
|---|---|---|
| `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | EXTEND | G 1c/141i pos 7.3, B 7c/129i, 55 named Bing queries. **Plus NO-PAGE corrected order 12 (GMS/APMS, 1,140 peer-winnable).** |
| `/blog/pcn-funding-network-contract-des-explained` | EXTEND | B 7c/85i, 47 named Bing queries |
| `/blog/arrs-reimbursement-employing-pcn-staff-tax` | EXTEND (§2.4) | B 1c/11i pos 4.5, 7 named queries |
| `/blog/enhanced-services-gp-practice-income-tax` | EXTEND (§2.4) | B 1c/7i pos 4.0, 0 named queries |
| `/blog/pcn-clinical-director-payments-tax` | EXTEND (§2.4) | B 1c/4i pos 4.0, 0 named queries |
| `/blog/dispensing-practice-income-accounts-tax` | REFRAME | B 0c/1i |

**Why this wave first, in one line each.** It is the only cluster on the site with real Bing demand *and* no frozen owner *and* the only immediately workable NO-PAGE topic. Its two anchor pages are the two best Bing earners in the untreated corpus. Its query evidence is unusually specific and unusually answerable (`who pays for pcn des`, `does arrs reimbursement cover expenses paid to the employee`, `where should dispensing fees go on your income statement`), which is what makes a coverage pass measurable at 14 days.

**Competition risk inside the wave, and how it is handled.** Five of the six are GMS/PCN funding pages and they *could* compete. They do not, because the map (section 6) splits the family by payer and by mechanism, not by topic: the GMS page owns the core contract and the Carr-Hill weighting, the PCN page owns the Network Contract DES envelope, the ARRS page owns the employment and reimbursement of staff, the clinical-director page owns one specific payment, enhanced services owns the locally commissioned layer, and dispensing owns a separate income stream with its own VAT treatment.

### Wave B. GP surgery premises. Start now, concurrent with A.

| Page | Grade | Evidence |
|---|---|---|
| `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | EXTEND (§2.4) | B 1c/5i pos 6.0, queries `notional gp meaning`, `whats notional rent` |
| `/blog/gp-partnership-last-man-standing-premises-risk` | EXTEND | B 3c/8i pos 1.0 on three `last man standing` phrasings |
| `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | REFRAME | no data on either engine |

**Why it is separate from A rather than folded in.** Premises is a property question and funding is an income question; they share no fact. Folding them in would give wave A nine pages and a map that spans two subjects, which is the beginning of the batch-1 failure. Three pages is a small wave and that is correct: **the right size is the size of the fact-sharing set, not a target.**

**The interesting thing in this wave.** `gp-partnership-last-man-standing-premises-risk` holds Bing position **1.0** on three near-identical phrasings and converts one of them to a click. That is a page already winning a tiny query, and it is the clearest EXTEND-not-REFRAME case in the corpus: additive only, and the existing title must come back byte-identical.

### Wave C. Incorporation and company structures. Start now, after one ruling.

Ten surfaces: `private-practice-incorporation-complete-guide`, `medical-practice-incorporation-step-by-step`, `incorporation-relief-private-medical-practice-s162`, `/calculators/private-practice-incorporation`, `/resources/incorporation-private`, `consultant-directors-loan-account-s455-medical-company`, `family-investment-company-doctors-consultants`, `salary-vs-dividend-medical-limited-company-2026`, `surplus-cash-medical-limited-company-options`, `gp-corporation-tax`. Plus `/blog/gp-bookkeeping-guide-uk` (EXTEND, 4 Bing clicks) sits adjacent and is included.

Nine of the ten grade REFRAME and only three carry any trace at all (`family-investment-company` 16 Google impressions, `consultant-directors-loan-account` 11, `salary-vs-dividend` 10, `surplus-cash` 9). **This is the lowest-risk wave in the batch: there is almost nothing to lose and a full rewrite is permitted on nine pages.** It is not wave A only because of the ruling it needs.

**The ruling it needs, and it is a live-state question the packs cannot answer.** Five of the ten are the same topic on five surfaces (the two incorporation guides, the s.162 relief page, the incorporation calculator, the incorporation resource), and one of them is recorded in STATE as undeployed and 301-redirecting while still being emitted in the sitemap. **Resolve what `/blog/private-practice-incorporation-complete-guide` actually returns on the live site before any pack is written for this wave**, because the answer changes whether wave C differentiates five surfaces or four. Never collapse; differentiate. Recorded as defect D3.

### Wave D. Locum, IR35, umbrella. From 2026-09-11.

Twelve surfaces across four namespaces on one subject: `/blog/locum-doctor-ir35-what-you-need-to-know`, `/blog/locum-doctor-limited-company-pros-and-cons`, `/blog/locum-doctor-umbrella-company-2026-reforms`, `/blog/locum-doctor-expenses-what-you-can-claim`, `/medical-guides/ir35-for-locums`, `/medical-guides/locum-limited-company-vs-umbrella`, `/resources/locum`, `/calculators/locum-tax-calculator`, plus the three frozen owners that unfreeze on 09-11 (`locum-doctor-tax-complete-guide`, `locum-doctor-self-assessment-filing-guide`, `nhs-pension-for-locums-form-a-form-b`) and NO-PAGE corrected order 18 (RF12).

**This is the wave that most needs the map and it is the reason the batch is sequenced rather than parallelised.** STATE's namespace finding is live here in its worst form: `/medical-guides/ir35-for-locums` (10 Bing clicks, the best untreated Bing earner on the site) and `/blog/locum-doctor-ir35-what-you-need-to-know` are the same topic on two namespaces, and `/medical-guides/locum-limited-company-vs-umbrella` and `/blog/locum-doctor-limited-company-pros-and-cons` are a second such pair. **Starting it before 09-11 is not possible without also being wrong**, because `locum-doctor-tax-complete-guide` is the natural hub of the family and it is frozen: differentiating eight children against a hub you may not read the current state of is guesswork.

### Wave E. GP partnership accounts and profit. From 2026-09-11.

`reading-gp-partnership-accounts-current-capital-accounts`, `gp-partner-drawings-vs-profit-tax-reserving`, `financing-gp-partnership-buy-in-tax-relief`, `gp-partnership-profit-sharing-tax-planning`, `gp-expense-sharing-vs-full-partnership`, `gp-partnership-basis-period-reform-explained`, `/calculators/salaried-gp-vs-partner`, `/calculators/gp-partner-drawings-planner`.

**Five of its natural owners are frozen** (`gp-partnership-tax-complete-guide`, `becoming-gp-partner-financial-implications`, `buying-into-gp-partnership-capital-parity-explained`, `gp-partner-vs-salaried-gp-tax-comparison`, `gp-partnership-mutual-assessment-period-what-to-check`). This is also, per STATE, **the only cluster where Google gives this domain air**: two of our URLs hold live Google top-10 organic positions and both are in the frozen partnership set. Working the unfrozen siblings of the site's only Google-ranking cluster, while the ranking pages are frozen and un-mappable, is the highest-risk thing available in this programme. **It waits.**

### Wave F. Private practice, goodwill, sale and exit. From 2026-09-11.

`private-practice-tax-nhs-and-private-income`, `medico-legal-expert-witness-income-doctors-tax`, `selling-private-medical-practice-cgt-badr`, `can-gp-practice-goodwill-be-sold-nhs-rules`, `retiring-from-gp-partnership-tax-capital-account`, `gp-practice-merger-accounts-tax-explained`, `/medical-guides/consultant-private-practice-tax`, plus NO-PAGE corrected orders 22 (gmc revalidation) and 24 (self-administered pension scheme).

Gated at 09-11 because the goodwill and CGT material shares the frozen partnership set's exit facts, and because `gp-vat-registration` (frozen) owns the VAT exemption boundary that `private-practice-tax-nhs-and-private-income` needs one sentence of.

### Wave G. Commercial and city acquisition. From roughly 2026-09-24.

Twenty-four surfaces: 11 `gp-accountant-<city>` posts, 5 `/locations/<city>`, 4 `/for-*` audience pages, `/services`, `/blog/gp-accountant`, `/blog/gp-accountant-cost`, `/blog/gp-accountant-services-complete-guide`, `/blog/accountant-accounting-services`, `/blog/accountant-self-assessment`, `/blog/gp-tax-advice`, `/blog/gp-tax-return`.

**Gated on data, not on a freeze.** `/blog/healthcare-accountants-uk` shipped today and under ownership row O14 it owns the national commercial term while the city pages own the city terms. It has no data at all yet. Rewriting twenty-four commercial pages against a boundary whose owning page is one day old, and whose 28-day Bing read has not started, is the batch-1 mistake at four times the scale. **Wait for the batch-2 28-day read (~2026-09-23), then scope G against what the head page actually matched.**

This wave also carries two structural fixes rather than content ones: the inverted slug `nottingham-gp-accountant` that every `gp-accountant-*` glob misses, and the six city blog posts with no `/locations/[slug]` hub parent. Both are recorded in `BATCH2_INDEX.md` §10I and neither is fixed.

### Wave H. NHS pension NO-PAGE sections. From 2026-09-11, last.

Twenty-one dossier rows onto roughly nine host pages, plus `/blog/gp-home-office-expenses-tax-relief`, `/calculators/doctor-expenses-tax-relief`, `/medical-guides/medical-expenses-tax-treatment` and `/blog/medical-expenses`.

**Last for two independent reasons.** Every host is either frozen to 09-10 or is a batch-1 page inside its post-batch read, and the expenses subset collides with `/blog/nhs-uniform-tax-relief-laundry-allowance` (O7, O8), which also shipped today. It is additive-section work throughout, no new URLs, and it is the cheapest wave per unit of covered volume once the windows clear.

---

## 6. THE OWNERSHIP MAP

**Built before any pack, extending the batch-2 rows rather than starting fresh.** Rows O1 to O18 are carried forward from `BATCH2_INDEX.md` §4 unchanged in meaning; O7 carries its ratified split. Rows **O19 onward are new** and cover batch 3's clusters. **Every row that constrains a page is repeated inside that page's pack.**

The rule, restated because it is the reason this document exists: **every shared fact has exactly ONE owning page. Every other page gets one sentence and a link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

### 6.1 Inherited rows, still binding on batch 3

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| O1 | NHS tiered member contribution rates and bands (1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | No page in any wave carries the tier table. One sentence, then link. |
| O2 | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | Waves D, E, F, H: one sentence, then link. |
| O3 | Adjusted net income as a general concept, the £100,000 to £125,140 taper, the 60% band, HICBC | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | Wave C's salary-vs-dividend and surplus-cash pages: one sentence, then link. **Do not restate the 60% band.** |
| O4 | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **`/blog/nhs-pension-scheme-pays-doctors-deadlines` is being prepared separately and is not this batch's at any date.** No batch-3 page states a Scheme Pays deadline. This is the exact fact that broke batch 1. |
| O5 | Why opting out costs more than the contributions | `/blog/opting-out-of-the-nhs-pension-scheme` | Wave H: one sentence, then link. |
| O6 | RF12 refund on leaving; SD502 opt-out form | `/blog/opting-out-of-the-nhs-pension-scheme` owns RF12 in the **opt-out** context; `/blog/nhs-pension-for-locums-form-a-form-b` owns the **certification** family (Form A, Form B, SOLO) | Wave D: when the locums page unfreezes, its RF12 reference is **one sentence and a link**, per the batch-2 §10E ruling which supersedes the batch-1 instruction. |
| O7a | Uniform and laundry flat rates, P87, the four-year limit, the repayment-agent warning | `/blog/nhs-uniform-tax-relief-laundry-allowance` | Wave H expenses subset: one sentence, then link. |
| O7b | Professional subscriptions and List 3 (NMC, RCN, the BMA 85% and UNISON 70% restrictions, s.343 vs s.344) | `/blog/nurse-tax-relief-professional-subscriptions` | Wave F's GMC revalidation section: one sentence, then link. |
| O8 | How to claim employment expenses: P87, self-assessment route, four-year limit | `/blog/nhs-uniform-tax-relief-laundry-allowance` | Waves C, F, H: one sentence, then link. |
| O9 | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** Binds wave F directly (gmc revalidation). |
| O10 | Global Sum per weighted patient (**£130.07, 2026/27, VERIFIED**) and the QOF point value (**£227.95, 2026/27, VERIFIED, see the ruling below**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in wave A states a QOF point value, but the reason is now ownership (O25), not verification.** |

> **O10 RULING, 2026-08-26. The QOF point value is VERIFIED and the O10 verification ban on it is lifted. F5 is now wrong on two of its three items and must be narrowed.**
>
> Three pack writers raised this independently. `house_positions.md` **§3.B** is headed "QOF point value (VERIFIED AT SOURCE 2026-08-26, block lifted)" and locks **£227.95 for 2026/27**, quoting GMS Statement of Financial Entitlements Directions 2026 paragraphs 6(6)(b), 6(7), 6(8) and Annex E paragraph E4 verbatim, with both 2026 amending instruments read and confirmed not to touch Section 6. It says in terms that "the ban in the batch-2 ownership map row O10 can be released for this figure". §3.A does the same for the Global Sum at **£130.07**. Only the **GMC annual retention fee** remains UNVERIFIED, and its ban stands.
>
> **Language spec F5 has not caught up and is a live false-positive risk.** As written it is a hard fail for "a £ or numeric within 30 words of ... 'global sum', 'weighted patient', 'QOF point'". Read literally, editorial QA would **BLOCK wave A's anchor page for correctly stating the verified £130.07 with its year tag**, which is the opposite of what F5 exists to do.
>
> **Ruling: F5 is narrowed to the GMC annual retention fee alone.** The Global Sum and the QOF point value are governed by F1 (year tag in the same sentence or table caption) and F4 (traces to house positions) like any other verified figure. `language_spec_2026-08-26.md` F5 and `BATCH2_INDEX.md` O10 both need one line amended; **neither is amended by this task**, because both belong to other windows, and this ruling is recorded here so the QA agent has something to cite.
>
> **What does NOT change: the ownership fence.** No wave-A page states a QOF point value, because **O25 gives QOF to `/blog/qof-income-gp-practice-accounting-explained`**, which is a batch-1 page inside its own read window. A verification ban and an ownership fence are different things and a writer must not read the lifting of one as the lifting of the other. Per V7, where a brief and the map disagree, the map wins.
| O11 | SMP versus Maternity Allowance | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | Waves D, E: one sentence, then link. |
| O12 | Pension accrual during maternity and statutory leave | same | Waves D, E, H: one sentence, then link. |
| O13 | GP practice reimbursement for parental-leave cover under the SFE | same | **Wave A**: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19. |
| O14 | "What a healthcare accountant does", the audience list, the national commercial pitch | `/blog/healthcare-accountants-uk` | **Wave G in full.** The city pages own city terms only and must not add national vocabulary. |
| O16 | Practice-ownership economics shared with veterinary | the existing GP and private-practice corpus | Wave F: unchanged. |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | All waves: one sentence, then link. |

### 6.2 New rows for batch 3

**Wave A, the GMS and PCN funding family. This is the densest fact-sharing set in the batch and the five pages read as one topic to a careless writer.**

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | The ARRS and clinical-director pages get **one sentence** placing their subject inside the DES, then link. The GMS page gets one sentence saying PCN money sits outside the core contract, then link. |
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | The PCN funding page gets **two sentences** naming ARRS as a DES strand and hands off. It must not explain the employment model. |
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | The PCN funding page gets one sentence, then link. **No tax treatment stated anywhere else.** |
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | `/blog/enhanced-services-gp-practice-income-tax` | The GMS page gets one sentence naming enhanced services as a funding stream, then link. |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | Wave A: no other page mentions dispensing income at all. **O17 still binds**: this page states the zero-rating in **one or two sentences** as the contrast, and does not explain the exemption, which belongs to the frozen `gp-vat-registration`. |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. **No page states a QOF point value (O10, hard fail F5).** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Wave A: every page that mentions a payment landing gets **one sentence** and a link. Five pages describing income recognition five times is the batch-1 failure. |

**Wave B, premises.**

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O27** | **Notional rent and cost rent**: what each is, how the district valuer sets notional rent, the current-market-rent basis, reviews, and the Premises Costs Directions framework. | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | The own-vs-rent page gets **one sentence** naming reimbursement as the income side, then link. It must not explain the valuation basis. |
| **O28** | **Last-man-standing lease risk**: the mechanism, why it is a personal liability, and what mitigations exist. | `/blog/gp-partnership-last-man-standing-premises-risk` | The own-vs-rent page gets one sentence, then link. This page holds Bing position 1.0 on the phrase and its equity is the phrase itself. |
| **O29** | **The own-versus-rent decision**: capital, borrowing, the tax treatment of owning surgery premises, CGT on a later disposal, and the partnership capital-account consequence. | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | The other two premises pages get one sentence each, then link. |
| **O30** | **The partnership capital account itself** (how premises equity sits in it) | frozen partnership set, wave E | Wave B: **one sentence and a link only**, and the link target must be checked live because five partnership pages are frozen. Do not explain capital accounts in wave B. |

**Cross-wave rows, binding on waves not yet started.**

| # | Shared fact | **Owner** | Note |
|---|---|---|---|
| **O31** | **IR35 and off-payroll for locum doctors**: the three hirer types, who issues the SDS, the April 2024 PAYE-offset change. | Wave D, **one page only, to be named when D is scoped against the unfrozen hub** | Four surfaces currently carry it. This row is deliberately left with a placeholder owner rather than guessed, because naming it now would be naming it without reading the frozen hub. |
| **O32** | **Limited company versus umbrella for a locum** | Wave D, one page only, same condition | Two surfaces currently carry it, on two namespaces. |
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed, not automatic, from 6 April 2026 per FA 2026 s.39), the step sequence, and the **pension-accrual loss that must be paired with every tax saving** (house positions §2.C) | Wave C, one page only, named after the defect D3 ruling | Five surfaces currently carry it. |
| **O34** | **Salary versus dividend extraction** (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | Surplus-cash, FIC, s455 and gp-corporation-tax pages: one sentence, then link. |
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

### 6.3 Batch-level style watch (V5 and V9, and it is the conductor's job)

Batch 1 produced one tic across ten authors ("it is not X, it is Y", three to seven times a page). Batch 2 complied and produced a **different** tic: seven writers independently converged on the numeral-count paragraph opener ("Two rules that...", "Four levers work...", "Three things account for..."), 22 instances across seven pages against a cap of two.

**V9 is explicit that banning the second tic will produce a third.** So the instruction to every wave conductor is the shape check, not a phrase ban:

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the wave, is named in that wave's fix pass, whatever it is.** The conductor runs this across the wave after drafting. It is invisible from inside a single page.
2. **Named and already burned, do not reach for either:** `it is not X, it is Y` (cap **once per page**, wave-wide), and the **numeral-count paragraph opener** (cap **once per page**, wave-wide, and prefer zero).
3. **The house reflex to watch third:** V9's corollary records five of seven batch-2 pages opening with a corrective clause in the first two sentences. It was below cap and arguably correct on a corpus whose differentiation is that the market is wrong. **Batch 3 is the third batch and V9 says a third showing should be varied deliberately.** Wave A's conductor decides the variation and states it in the wave's fix pass.
4. **V1 hard cap: two word orders per idea per page**, counted as **non-overlapping longest matches**, never raw substrings. Any V1 finding must quote the spans it counted.
5. **V2 is a live standard, not a batch-2 rule.** Every page touched in this batch is checked against the current rules, not the rules that existed when it was written. One known live violation remains in the corpus (`/blog/nhs-pension-tax-charges-how-to-minimize`, "also searched as"), recorded in `BATCH2_INDEX.md` §10F, still unfixed, and it belongs to wave H's pass over that page.
6. **V7: where a conductor's brief and this map disagree, THE MAP WINS.** The writer follows the map, states neither fact, and reports the conflict.

---

## 7. What is wrong in the corpus beyond a content pass

Seven findings, each with the command that produced it. **None was acted on.**

**D1. The sitemap emits a URL that has no route. `/blog/employment-status` 404s.**
`sitemap.ts` generates one category URL per distinct `category:` value in post frontmatter via `getAllCategories()`. There are **nine** distinct values but only **eight** TSX category routes under `src/app/blog/`. The ninth, `Employment Status`, is carried by exactly one post:

```
$ grep -h "^category:" Medical/web/content/blog/*.md | sort | uniq -c
     ... 1 Employment Status        -> nurse-tax-relief-professional-subscriptions.md
$ ls Medical/web/src/app/blog/
[slug]  gp-accountant-services  gp-practice-management  gp-tax-and-accounts
incorporation-and-company-structures  locum-tax  medical-expenses  nhs-pension-planning
page.tsx  private-practice
```

There is no `employment-status` directory, and `/blog/[slug]` calls `notFound()` for a slug with no post. **This was introduced today by batch 2**: `nurse-tax-relief-professional-subscriptions.md` is a new file and it is the only post in the corpus carrying that category. The site is now advertising a 404 to Google and Bing in its own sitemap. Fix is one of: change the post's category to an existing one, or add the eighth-plus-one TSX hub. **Not fixed here, because the file belongs to another agent's window and `Medical/web/` is out of scope for this task.**

**D2. The Bing endpoint ambiguity in §9.2 is now measured, not just suspected.** STATE backlog item 5 says the two endpoints are never comparable. On `/blog/how-gms-funding-works-global-sum-carr-hill-explained` the gap is **129 page-level impressions against 51 summed across 55 named-query rows**, a factor of 2.5. Grades in this document name the endpoint (§0.2). The engine doc still does not, and should.

**D3. `/blog/private-practice-incorporation-complete-guide` may be a live 301 that the sitemap advertises as a page.** STATE records it as undeployed and currently 301-redirecting to `medical-practice-incorporation-step-by-step`. The markdown file exists, so `getAllPosts()` includes it and `sitemap.ts` emits it. Either the sitemap is advertising a redirect, or STATE is stale. **One `curl -I` settles it and it gates wave C.** Not run here: it is a live-production check and this task's mandate is preparation.

**D4. The §9.2 grade table has a hole that catches 26 pages.** Bing clicks of 1 or 2 match neither branch. Ruled in §2.4 and the ruling should be promoted into `REWRITE_PROGRAM.md`. This will recur on every Bing-first site in the estate, so it is a class defect, not a Medical one.

**D5. Forty-four untreated URLs have no data on either engine.** That is 44% of the untreated corpus with no measurement history at all. It is consistent with the Stage 0 diagnosis (Google indexes 21 of 138) and with Bing's `GetPageStats` returning 77 distinct pages in the window, i.e. Bing has data for roughly 56% of the corpus. **It is recorded as a question, not a finding**: these pages have never been given the chance to fail, and no pack may describe one as "ranking nowhere".

**D6. Two interruptive surfaces are live on every route** (`DeepScrollModal` and `ReturningBar`, mounted in `src/app/layout.tsx` lines 117-118). They pre-date all of this work and neither was added nor removed. Recorded because rule I7 forbids a page adding one, and a writer reading I7 will reasonably ask why two already exist. **They are not this programme's to remove and no wave touches them.**

**D8. A live O21 breach already exists on `/blog/pcn-funding-network-contract-des-explained`, and EXTEND forbids the writer fixing it.** Its `Staff Reimbursements: ARRS` H3 runs **157 words over 6 sentences**, carrying the reimbursement mechanic, the per-role maximum, the employ-before-claim rule, the above-cap consequence and the role list. O21 gives all of that to `/blog/arrs-reimbursement-employing-pcn-staff-tax` and caps this page at two sentences. The block predates the ownership map (generated 2026-06-03), so it is not writer error, it is the map being applied to a page written before it existed. **Handling: the PCN pack sets its new-ARRS-sentence allowance to zero and escalates rather than resolving.** If nothing is done, wave A ships ARRS in the role the Scheme Pays deadline played in batch 1, which is the exact failure this index exists to prevent. **The manager decides** whether a deletion inside frozen copy is permitted as an ownership correction, which is a genuinely new question: batch-1 coordinator ruling 3 clears factual corrections inside frozen copy, and this is not a factual correction.

**D9. A Postgres regex bug that may have silently halved keyword counts in earlier packs.** Postgres ARE uses `\y` for a word boundary; `\b` is a backspace character. A pack writer found `ranked_keyword ~ '\marrs\b|...'` returning **3 rows** where `~ '\yarrs\y|...'` returns **41**. A second writer found `\mpcn\M` missing `pcns payment` at **9,900 volume**, roughly 88% of that topic. Any pack that word-bounded a keyword stem should be re-run unbounded or with `\y`. **This is free SQL against data already paid for and it is the cheapest open item in the programme.** Not run here.

**D10. The session scratchpad is contended and files are being deleted under running agents.** The pulls this task made at `medical_stage0/` were removed mid-task by concurrent agents obeying the standing "delete the temporary files you create" rule, which is why all three wave-A writers reported the data files absent and re-pulled. **The re-pulls independently reproduced every figure in this document exactly**, so nothing is unsound, and the accidental verification is worth more than the lost files. It is also the most likely explanation of §0.1: the original Stage 0 pulls were probably deleted the same way rather than never written. **Consequence for later waves: pass figures inline in the agent prompt and instruct a re-pull, never rely on a shared scratchpad file surviving.**

**D7. Eleven `gp-accountant-<city>` posts, five `/locations/<city>` hubs, and six of the eleven have no hub parent.** Plus the inverted slug `nottingham-gp-accountant`, which every `gp-accountant-*` glob misses. Both carried forward from `BATCH2_INDEX.md` §10I and both still unfixed. They become wave G's structural work.

---

## 8. Batch-level expectation, written before the work

**The measurement reality.** Google indexes roughly 21 of 138 URLs; Bing has page-level data for 77 and out-clicks Google 3.4x. Site totals over the window, both fresh pulls: Google **97 clicks / 8,267 impressions / 90d at average position 33.18**; Bing **326 clicks / 8,903 impressions** (`GetRankAndTrafficStats`, the only site-total-safe Bing endpoint per the top-N trap memo).

**Wave A primary test, Bing, 28 days.** Six pages. Combined Bing baseline **17 clicks / 234 impressions** page-level. Target: **phrase coverage, not total traffic.** At least **4 of 6** pages register impressions on a phrase named in their own pack's section 7.1 that was absent before. Per §9.6 point 2, **total traffic rising while the named phrases stay missing is a FAIL and is recorded as drift.**

**Wave A revert trigger.** All five EXTEND pages are additive-only, so structural equity cannot move. The failure condition is a loss one: if combined Bing clicks across the six URLs fall below **13** (a 25% fall from 17) at the 28-day read, revert the wave. Revert path per page is a single `git checkout <pre-wave sha> -- <file>`, named in section 1 of each pack.

**Wave B primary test.** Three pages, combined Bing baseline **4 clicks / 13 impressions**. Too small for a traffic test. The test is the position one: `gp-partnership-last-man-standing-premises-risk` must **still hold Bing position 1 to 3** on `last man standing gp practice lease` at 28 days. If an additive-only change moves that, the additive-only rule is not working and the whole EXTEND grade needs re-examining across the batch.

**Google, all waves: no expectation is set, deliberately.** On a corpus where Google indexes 15% of URLs, a page not being indexed at 28 days carries no information. The single Google observation worth recording in waves A and B is `/blog/how-gms-funding-works-global-sum-carr-hill-explained`, which holds **141 impressions at position 7.3** and must **not** lose them.

**Batch failure trigger, quality rather than traffic.** If any wave's editorial QA raises a **V1, V3 or V5 finding on three or more pages**, that wave has reproduced the batch-1 defect this index exists to prevent, and its pages are held rather than deployed.

**No monitor is created by this document.** Registration in `monitored_pages` is a separate owner-triggered step and has not been done. Reading a tracker is a pull.

---

## 9. Known limitations

1. **The stage-0 pulls named in the brief were missing and were re-created** (§0.1). If the originals resurface with a different window, the grades must be re-derived, not reconciled.
2. **Bing `GetPageStats` is top-N**, per the Bing top-N trap memo. A page absent from it is not proven to have zero Bing impressions; it is absent from the top N. This affects the 44 no-data pages and is why D5 is a question.
3. **Peer-winnable is Google-derived** (DataForSEO positions are Google positions). Per decision 21 it orders the work and excludes nothing, which matters most in wave H where Google is effectively closed and Bing is not.
4. **The corrected dossier §4 column is reliable for ordering and should not be quoted to the pound**, per the correction note's own warning. Two rows keep a `†` floor figure.
5. **Waves C to H are scoped but not packed.** Only waves A and B have packs. This is deliberate: C needs the D3 ruling, D to H are gated to 2026-09-11 or later, and a pack written today against data that must be re-pulled before the work starts is a pack that will be re-written. **Scope now, pack at the gate.**
6. **Two ABSORB clusters (opticians, allied health) remain unpackable** from the paid harvest and the $1.13 unblock is still unauthorised. Other agents are working them concurrently; if they succeed, amend section 4 rather than re-planning.
7. **No live-production check was run.** D1 and D3 are both derived from source and from STATE, not from a request to the live site.

---

## 10. Pack index

| Pack file | Page | Wave | Grade |
|---|---|---|---|
| `PACK_B3_blog__how-gms-funding-works-global-sum-carr-hill-explained.md` | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | A | EXTEND |
| `PACK_B3_blog__pcn-funding-network-contract-des-explained.md` | `/blog/pcn-funding-network-contract-des-explained` | A | EXTEND |
| `PACK_B3_blog__arrs-reimbursement-employing-pcn-staff-tax.md` | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | A | EXTEND |
| `PACK_B3_blog__enhanced-services-gp-practice-income-tax.md` | `/blog/enhanced-services-gp-practice-income-tax` | A | EXTEND |
| `PACK_B3_blog__pcn-clinical-director-payments-tax.md` | `/blog/pcn-clinical-director-payments-tax` | A | EXTEND |
| `PACK_B3_blog__dispensing-practice-income-accounts-tax.md` | `/blog/dispensing-practice-income-accounts-tax` | A | REFRAME |
| `PACK_B3_blog__gp-surgery-notional-rent-vs-cost-rent-explained.md` | `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` | B | EXTEND |
| `PACK_B3_blog__gp-partnership-last-man-standing-premises-risk.md` | `/blog/gp-partnership-last-man-standing-premises-risk` | B | EXTEND |
| `PACK_B3_blog__gp-surgery-premises-own-vs-rent-tax-guide.md` | `/blog/gp-surgery-premises-own-vs-rent-tax-guide` | B | REFRAME |

Filenames carry the `PACK_B3_` prefix so they cannot collide with the batch-1 and batch-2 packs already in this directory, nor with the opticians and allied-health packs being written concurrently by other agents.
