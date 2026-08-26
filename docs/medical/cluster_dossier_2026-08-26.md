# Medical cluster dossier — competitor keyword harvest and consensus topic map

**Site:** medicalaccounts.co.uk · **Built:** 2026-08-26 · **Method:** `docs/_engines/REWRITE_PROGRAM.md` §9.2 steps 1 to 3, plus §9.7 ledger
**Status:** analysis only. Nothing was rewritten, committed, deployed or indexed. No monitor, alert or scheduled job was created.

---

## 1. The answer

**1,141 of the 1,242 phrasings the market groups into consensus topics do not appear verbatim anywhere in our corpus. That is 92%.** Taking only the 150 highest-volume competitor keywords in scope, **122 of 150 are absent**. This is the same shape as the Property stamp duty finding (108 of 150 across 760 posts) and it reproduces on a corpus of 105 pages.

Three findings follow from it, in order of money.

**a. The market's medical-accounting topic map is an NHS-pension map. Ours is a partnership-and-incorporation map.** Of the 48 live consensus topics, 30 are NHS pension. Of our 105 in-scope pages, **97 are the specialist tail**: 76 blog posts and 21 tool, guide and hub pages that the market does not group into any consensus topic at all. That tail is the differentiator and per §9.3 nothing about it gets deleted. But it is invisible on the plain-language layer where the volume sits.

**b. Our NHS-pension pages are competing with each other across three namespaces.** `/calculators/nhs-pension-scheme-pays` and `/blog/nhs-pension-scheme-pays-doctors-deadlines` score identically on six separate consensus topics. `/calculators/nhs-pension-annual-allowance`, `/medical-guides/nhs-pension-annual-allowance` and `/blog/nhs-pension-annual-allowance-complete-guide` all contest the annual-allowance family. Full list in §7. Per §5 of the working agreement, none of these get collapsed; they get differentiated.

**c. The single highest-confidence topic on the entire map has no page of ours at all.** "healthcare accountants near me" is given its own page by **24 of the 27 harvested domains**, 10,110 combined volume, 5,110 of it peer-winnable. It is the commercial acquisition term and it is a NO-PAGE.

---

## 2. Scope declaration and what it cost

**Domains harvested: 27 of 31 attempted.** All 22 peers from `sites/medical.discovery.json`, plus aisma.org.uk, themdu.com, forvismazars.com, johnstoncarmichael.com and bma.org.uk from the deliberately-unwinnable set in `docs/medical/competitor_universe_2026-08-26.md`. Under owner rollout decision 21 those unwinnable domains are in scope, and bma.org.uk turned out to be the largest single supplier of missing vocabulary in the whole map.

```
optimisation_engine/clients/dataforseo_client.py  DataForSEOClient.ranked_keywords(
    site_key="medical", domain=<d>, limit=min(1000, remaining), offset=<n>)
# location_code 2826 (UK), language_code en, order_by search_volume desc
# NO volume floor, NO row cap; paginated to total_count per domain
```

| | |
|---|---|
| Rows returned, deduped on (domain, keyword) | **32,872** |
| Domains exhausted with no filter and no floor | 26 |
| Domains harvested with an API-side filter (documented deviation) | 1 (bma.org.uk) |
| Domains **NOT harvested** (budget guard) | 4 |
| Actual spend, this task | **$4.92048** |
| Balance before / guard | $47.15 / `DATAFORSEO_ABORT_AT` $5.00 per day |

Spend command:
```sql
-- api_cost_log, api_provider=dataforseo, date_called=2026-08-26
-- medical | dataforseo_labs/google/ranked_keywords/live | success | 81 calls | $4.92048
```
81 calls = 31 one-row probes to read `total_count` per domain ($0.376) plus 50 pagination calls ($4.544). The probe was run first specifically so the harvest could be planned against the guard instead of discovering the ceiling halfway through.

### What is missing, and why

The full uncapped exhaustion of all 31 domains would have returned about 219,000 rows at roughly **$24**, which is 4.8x the daily guard. The probe made that visible before any money was spent on it. Four vocabulary domains were therefore not harvested:

| Domain | Keywords it ranks for | Status |
|---|---|---|
| england.nhs.uk | 105,199 | **NOT HARVESTED** |
| nhsbsa.nhs.uk | 39,145 | **NOT HARVESTED** |
| nhsemployers.org | 14,605 | **NOT HARVESTED** |
| wesleyan.co.uk | 10,647 | **NOT HARVESTED** |
| bma.org.uk | 19,884 total, 2,994 harvested | **PARTIAL**, API-side keyword filter |

This is a stated limitation, not a silence. The run stopped cleanly at the guard rather than truncating quietly:

```
BUDGET STOP at wesleyan.co.uk
DataForSEO budget gate: running $4.9565 + estimated $0.1100 > abort_at $5.0000
```

**Judgement on the deviation.** §9.2 says filter after fetching, never in the request. That rule was written for eight mid-sized specialist domains. It collides with a $5/day guard at these domain sizes. I exhausted every peer and every specialist unfiltered, because those are the domains whose vocabulary defines the niche, and filtered only bma.org.uk, whose 19,884 keywords are mostly clinical-guidance and employment-relations terms outside the term family. The four unharvested domains are vocabulary-only, not peers. **Their absence most likely understates the NHS-pension administrative vocabulary further**, which is already the largest gap in the map, so the headline finding is conservative rather than inflated. Completing them costs about $19 on a later day and is the single cheapest way to extend this dossier.

The `offset` and `filters` passthroughs were added to `DataForSEOClient.ranked_keywords()` for this run. Diff is 6 lines, no behaviour change to any existing caller.

### Source union (§9.7)

| Source | Rows | Unique to it | Pull |
|---|---|---|---|
| Competitor ranked keywords, 27 domains | 1,982 in family | 1,982 | DataForSEO Labs, 2026-08-26 |
| Our GSC queries, 90d | 217 | 173 (80%) | `gsc_query_rows.json`, data through 2026-08-23 |
| Our Bing query stats, 90d | 624 non-URL rows | 616 (99%) | `bing_query_stats.json`, data through 2026-08-23 |
| **Union** | **2,761** | | |

Bing is again the biggest single supplier of phrasings nobody else can see: 616 of its 624 queries appear in no competitor's ranked set. The map in this dossier is built on the competitor source only, per §9.2 step 2. GSC and Bing are named here because the per-page packs (§9.5) must union all three, and because a competitor-only universe would drop 789 queries we already earn impressions on.

**Our page scope: 105 pages.** 79 markdown blog posts, 8 `/blog/` pillar hubs rendered from TSX and not from markdown (`gp-accountant-services`, `gp-practice-management`, `gp-tax-and-accounts`, `incorporation-and-company-structures`, `locum-tax`, `medical-expenses`, `nhs-pension-planning`, `private-practice`), 10 calculators, 6 medical-guides, and the `/nhs-pension`, `/research`, `/services` and four `/for-*` persona hubs. The 8 TSX pillars are easy to miss with a `content/blog/*.md` glob and one of them, `/blog/nhs-pension-planning`, took a topic in the assignment.

**Persistence.** All 32,872 rows written to `dataforseo_competitor_data` with `site_key='medical'` and columns `ranked_keyword`, `position`, `search_volume`, `url`, `keyword_difficulty`, `cpc`, `traffic_estimate`.

---

## 3. Consensus topic map

Method: every competitor URL holding 3 or more in-family keywords is a node (204 nodes from 388 URLs). Nodes merge when they overlap by 30% or more of the smaller set, measured against a **fixed seed node** rather than the growing union. Transitive union-find was tried first and chained everything NHS-pension into one 505-keyword, 15-domain blob; seed-based grouping is what the spec's "merge when they overlap" actually means in practice. Result: 90 topics, 48 live after screening.

**Domain count is the confidence score.** Volume is not.

### Topics with a page of ours (16)

| Topic | Domains | Volume | Peer-winnable | Kws | Our page | Grade | Equity (90d) | Missing phrasings |
|---|---|---|---|---|---|---|---|---|
| nhs pensions (contribution rates, scheme changes) | **12** | 448,550 | 91,230 | 332 | /calculators/nhs-pension-scheme-pays | REFRAME | B 1c/10i, G 0 | 294 of 332 |
| nhs pension schemes (hub) | **5** | 172,620 | 82,600 | 78 | /blog/nhs-pension-scheme-pays-doctors-deadlines | **EXTEND** | G 4c/373i pos 18.5, B 3c/32i | 71 of 78 |
| mccloud remedy | **7** | 10,150 | 700 | 46 | /blog/mccloud-remedy-nhs-pension-doctors-explained | REFRAME | B 0c/2i | 39 of 46 |
| nhs tax refund / rebate | **7** | 2,470 | 1,000 | 27 | /blog/nhs-pension-tax-charges-how-to-minimize | REFRAME | B 2c/18i | 22 of 27 |
| pension annual allowance calculator | **5** | 9,760 | 310 | 69 | /blog/nhs-pension-tapered-annual-allowance-calculator | **FROZEN** | armed to 2026-09-10 | 53 of 69 |
| vat on private healthcare | 4 | 1,460 | 760 | 18 | /blog/gp-practice-private-non-nhs-income-streams | REFRAME | none | 15 of 18 |
| nhs pension scheme forms | 4 | 1,220 | 90 | 14 | /blog/nhs-pension-for-locums-form-a-form-b | **FROZEN** | armed to 2026-09-10 | 9 of 14 |
| avcs / additional pension | 2 | 5,390 | 0 | 26 | /nhs-pension | REFRAME | none | 26 of 26 |
| nhs pension calculator | 1 | 27,940 | 70 | 74 | /medical-guides/nhs-pension-annual-allowance | REFRAME | B 1c/3i | 73 of 74 |
| pension lifetime allowance | 1 | 19,940 | 0 | 56 | /research/annual-allowance-pension-tax-index | REFRAME | G 0c/7i pos 10.6 | 54 of 56 |
| pension annual allowance | 1 | 9,720 | 0 | 24 | /calculators/nhs-pension-annual-allowance | REFRAME | B 0c/13i | 16 of 24 |
| nhs pension 1995 scheme | 1 | 8,800 | 0 | 48 | /blog/nhs-pension-partial-retirement-doctors-guide | REFRAME | B 0c/2i | 45 of 48 |
| how does the nhs pension work | 1 | 6,260 | 70 | 34 | /blog/nhs-pension-planning | REFRAME | B 0c/4i | 32 of 34 |
| early retirement nhs pension | 1 | 4,800 | 0 | 23 | /blog/nhs-pension-annual-allowance-complete-guide | **FROZEN** | armed to 2026-09-10 | 23 of 23 |
| pcse contact and enquiries | 1 | 2,180 | 0 | 9 | /blog/gp-practice-income-pcse-statement-reconciliation | **EXTEND** | **B 17c/261i**, G 0 | 9 of 9 |
| qof 2026/27 | 1 | 1,370 | 840 | 7 | /blog/qof-income-gp-practice-accounting-explained | **EXTEND** | **B 12c/59i**, G 0 | 7 of 7 |

Two rows deserve the writer's attention before anything else. `/blog/gp-practice-income-pcse-statement-reconciliation` earns 17 Bing clicks from 261 impressions and **zero** on Google, and every one of its topic's 9 phrasings is missing from the page. `/blog/qof-income-gp-practice-accounting-explained` is the same shape at 12 Bing clicks and 7 of 7 missing. Both are EXTEND, which means additive only: metaTitle, H1 and existing H2 order are frozen. These are the two clearest cases in the map of real Bing equity sitting on a page that does not contain the words the market searches.

### Grade distribution across our pages

| Grade | Topics | Meaning |
|---|---|---|
| EXTEND | 3 | additive only, keep metaTitle / H1 / H2 order |
| REFRAME | 10 | full rewrite permitted against the topic keyword set |
| FROZEN | 3 | inside an armed measurement window, no treatment |
| NO-PAGE | 17 | nothing of ours is close |
| NO-PAGE-CONTESTED | 15 | a page of ours would match, but it uniquely owns a higher-confidence topic |

Only 3 of 16 assigned topics grade EXTEND. On this site almost nothing has enough equity to protect, which is the permission structure the writer needs: on 10 of 16 topics a full reframe is allowed.

---

## 4. The NO-PAGE list, ordered by peer-winnable volume

Ordering is by peer-winnable volume per owner decision 21. **Total volume is shown alongside so the sequencing is visible without the filtering.** Nothing here is excluded for having a hard SERP.

| # | Topic | Domains | Total volume | Peer-winnable | Kws | Prescription |
|---|---|---|---|---|---|---|
| 1 | **healthcare accountants near me** | **24** | 10,110 | 5,110 | 67 | New page. 45 competitor URLs. The commercial term. |
| 2 | is the nhs pension scheme good | 1 | 3,250 | 3,210 | 11 | Section on /calculators/nhs-pension-scheme-pays |
| 3 | how does the nhs pension scheme work (accrual rate) | 1 | 2,220 | 2,000 | 4 | Section on /calculators/nhs-pension-scheme-pays |
| 4 | **uniform tax rebate / work uniform tax relief** | 4 | **26,880** | 1,420 | 108 | New page or section on the expenses hub |
| 5 | adjusted net income / marginal rate traps | 1 | 7,210 | 1,300 | 15 | New page. Core to tapering for doctors. |
| 6 | qof 2025/26 | 1 | 1,310 | 1,020 | 17 | Section on /blog/qof-income-gp-practice-accounting-explained |
| 7 | payroll nhs / payroll number on payslip | 3 | 5,490 | 910 | 35 | Section on /blog/gp-payroll-services (FROZEN to 09-10) |
| 8 | mileage tax claim / nhs mileage allowance | 2 | 2,270 | 780 | 15 | Section on /blog/gp-tax-deductions-complete-list-2026 (FROZEN to 09-10) |
| 9 | pharmacist accountant | 4 | 1,390 | 700 | 11 | New page. `allied_health` lane. |
| 10 | veterinary accountants | 4 | 550 | 550 | 5 | New page. `allied_health` lane. |
| 11 | **pension opt out** | 2 | **20,260** | 0 | 35 | New page. bma.org.uk holds it end to end. |
| 12 | how much is maternity allowance | 1 | 9,490 | 0 | 22 | New page, doctor-specific angle |
| 13 | nhs pensions contact address / details | 1 | 6,720 | 0 | 8 | Section on /nhs-pension |
| 14 | nhs pension refund form (RF12) | 1 | 3,600 | 0 | 14 | Section on /blog/nhs-pension-for-locums-form-a-form-b |
| 15 | nhs pension death in service | 2 | 3,490 | 0 | 19 | Section on /calculators/nhs-pension-scheme-pays |
| 16 | pension nhs contact / email | 1 | 3,160 | 0 | 13 | Section on /nhs-pension |
| 17 | nhs pension increase / uplift | 1 | 1,930 | 0 | 19 | Section on /medical-guides/nhs-pension-annual-allowance |
| 18 | pension tapered annual allowance | 1 | 1,450 | 0 | 7 | Section on the tapered calculator page (FROZEN to 09-10) |
| 19 | gmc revalidation | 1 | 1,400 | 0 | 6 | New page or CQC/GMC hub section |
| 20 | what is a GMS / APMS contract | 1 | 1,180 | 0 | 3 | Section on /blog/how-gms-funding-works-global-sum-carr-hill-explained |
| 21 | how is nhs pension calculated (final salary) | 1 | 1,070 | 0 | 8 | Section on the tapered calculator page (FROZEN) |
| 22 | nhs pension ill-health retirement (tier 2) | 1 | 1,000 | 0 | 8 | New section on /nhs-pension |
| 23 | self-administered pension scheme | 1 | 970 | 0 | 8 | Section, private-practice pension |
| 24 | abatement of pension | 1 | 940 | 0 | 10 | Section on /research/annual-allowance-pension-tax-index |
| 25 | is nhs pension salary sacrifice | 1 | 860 | 0 | 5 | Section on /calculators/nhs-pension-scheme-pays |
| 26 | qof register | 1 | 840 | 0 | 5 | Section on the QOF page |
| 27 | retire and return | 1 | 760 | 0 | 7 | Section on /blog/nhs-pension-partial-retirement-doctors-guide |
| 28 | what happens to my nhs pension when i die | 1 | 730 | 0 | 9 | Section, survivor benefits |
| 29 | nhs deferred pension / adult dependant | 1 | 440 | 0 | 4 | Section on /nhs-pension |
| 30 | nhs pensions complaints / overpayments | 1 | 410 | 0 | 5 | Section on /nhs-pension |
| 31 | nhs pension redundancy | 1 | 390 | 0 | 5 | Section on /blog/nhs-pension-tax-charges-how-to-minimize |
| 32 | added years nhs pension | 1 | 280 | 0 | 4 | Section on /calculators/nhs-pension-scheme-pays |

Read rows 11 and 4 against rows 2 and 3. "pension opt out" is 20,260 volume with **zero** peer-winnable, because bma.org.uk holds positions 4 to 9 across the whole family. "is the nhs pension scheme good" is 3,250 with 3,210 peer-winnable. Under a Google-winnability filter, row 11 disappears. Under decision 21 it does not, it just sequences behind row 2. On a site where Bing out-clicks Google 3.4x, discarding a 20,260-volume topic because the BMA owns the Google slot is the exact error the decision was written to prevent.

Rows 2, 3, 6, 14 to 18, 21, 24, 25, 26, 27, 31 and 32 are **NO-PAGE-CONTESTED**: a page of ours scored above threshold but had already uniquely taken a higher-confidence topic. That is unique assignment working as designed. It is also the finding: **30 NHS-pension consensus topics are competing for 9 of our NHS-pension pages.** Per §9.3, one page per consensus topic and never a page per keyword, so most of these become named H2 sections rather than new URLs.

---

## 5. The market phrasings that appear nowhere in our corpus

This is the headline. Checked verbatim, case and punctuation normalised, against the full body text of all 105 in-scope pages.

| Measure | Result |
|---|---|
| Live consensus universe (post-screen) | 1,242 phrasings |
| Absent verbatim from our corpus | **1,141 (92%)** |
| Of the 150 highest-volume, in scope | **122 absent** |
| Full node universe including screened topics | 1,752 absent of 1,884 |

Top absences by volume, with the best position any harvested domain holds:

| Volume | Best pos | Held by | Phrase |
|---|---|---|---|
| 40,500 | 8 | medicsmoney.co.uk | nhs uk pension |
| 40,500 | 11 | medicsmoney.co.uk | nhs pension schemes |
| 27,100 | 8 | bma.org.uk | nhs pension changes |
| 27,100 | 8 | bma.org.uk | pension changes nhs |
| 27,100 | 9 | bma.org.uk | changes to nhs pension scheme |
| 27,100 | 16 | bma.org.uk | nhs pension scheme changes |
| 9,900 | 5 | bma.org.uk | nhs pension scheme contributions |
| 9,900 | 5 | bma.org.uk | pension nhs contribution |
| 9,900 | 6 | bma.org.uk | nhs pensions contributions |
| 9,900 | 7 | bma.org.uk | pension contribution nhs |
| 6,600 | 18 | bma.org.uk | nhs pension fund calculator |
| 4,400 | 8 | bma.org.uk | pension lifetime allowance |
| 4,400 | 15 | bma.org.uk | lifetime allowance pension |
| 4,400 | 16 | bma.org.uk | pension scheme contributions |
| 4,400 | 19 | bma.org.uk | nhs pension phone number |
| 4,400 | 21 | bma.org.uk | pension scheme employer contribution |
| 4,400 | 25 | bma.org.uk | nhs pension telephone number |
| 4,400 | 26 | bma.org.uk | nhs pension contact number |
| 4,400 | 31 | bma.org.uk | nhs pensions contact address |
| 3,600 | 38 | medicsmoney.co.uk | adjustable net income |
| 3,600 | 59 | taxqube.co.uk | work uniform tax refund |
| 3,600 | 81 | taxqube.co.uk | uniform tax rebate |
| 2,900 | 31 | bma.org.uk | how much is maternity allowance |
| 2,400 | 28 | bma.org.uk | pension opt out |
| 1,900 | 4 | bma.org.uk | nhs superannuation contribution rates |
| 1,900 | 6 | bma.org.uk | opt out of pension nhs |
| 1,900 | 9 | bma.org.uk | nhs pension opt out |
| 1,600 | 4 | bma.org.uk | nhs pensions contribution rates |
| 1,600 | 6 | bma.org.uk | nhs pension scheme opt out form |
| 1,600 | 6 | bma.org.uk | opt out of nhs pension scheme form |
| 1,600 | 7 | bma.org.uk | opting out of nhs pension |
| 1,600 | 8 | bma.org.uk | pension nhs opt out form |
| 1,600 | 9 | bma.org.uk | nhs pension opt out form |
| 1,600 | 76 | taxqube.co.uk | uniform tax relief |
| 1,600 | 83 | taxqube.co.uk | tax relief on work uniform |
| 1,600 | 87 | taxqube.co.uk | uniform tax allowance |
| 1,300 | 11 | bma.org.uk | nhs pension website |

Two patterns, and both are vocabulary rather than subject matter.

**Word order.** "pension changes nhs", "changes to nhs pension scheme", "nhs pension scheme changes" and "nhs pension changes" are four separate 27,100-volume phrasings of one idea. We carry none of them. This is not four topics, it is one H2 and an FAQ that use the market's word order instead of ours.

**"contributions" and "contribution rates".** The market searches "nhs pension scheme contributions", "nhs superannuation contribution rates", "pension nhs contribution". We have `/calculators/nhs-superannuation-tiered-contribution`, which is exactly the right page and does not carry the phrase. Same failure mode as the Property specimen: the page says SDLT everywhere and the market says stamp duty.

**Caveat, stated plainly.** Verbatim string matching understates coverage where we express the same idea in different words. That is the point rather than a flaw: the finding is about the phrasings the market uses, and a phrase the page does not contain is a phrase the page cannot match. The number is a coverage floor, not a quality judgement on the writing.

---

## 6. Frozen list, excluded from all treatment

16 pages are inside armed measurement windows and must not be touched until **2026-09-10**.

```sql
select slug, rewrite_date, monitor_until, rewrite_type
from monitored_pages
where site_key = 'medical' and lower(status) = 'active' and monitor_until > now();
-- 16 rows, all rewrite_date 2026-06-12, all monitor_until 2026-09-10, all rewrite_type 'rewrite'
```

becoming-gp-partner-financial-implications · buying-into-gp-partnership-capital-parity-explained · gp-limited-company-tax-benefits-drawbacks · gp-partner-vs-salaried-gp-tax-comparison · gp-partnership-mutual-assessment-period-what-to-check · gp-partnership-tax-complete-guide · gp-payroll-services · gp-pension-contributions-tax-relief · gp-tax-deductions-complete-list-2026 · gp-vat-registration · locum-doctor-self-assessment-filing-guide · locum-doctor-tax-complete-guide · medical-professional-expenses-what-is-claimable · nhs-pension-annual-allowance-complete-guide · nhs-pension-for-locums-form-a-form-b · nhs-pension-tapered-annual-allowance-calculator

Three of these took a topic in the assignment and are marked FROZEN rather than graded. Four NO-PAGE prescriptions (rows 7, 8, 18, 21) point at frozen pages and are blocked until 2026-09-10.

Three further `monitored_pages` rows for this site carry `status='flagged'` and are therefore **not** frozen under the stated test: `__home` (monitor_until 2026-10-06), `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines`. The last of those holds the second-highest-confidence topic in the map and grades EXTEND. Its flagged status is worth a look before it is worked, because a flagged monitor is a question, not a clearance.

---

## 7. Where two of our own pages compete

Every row is a topic where a second page of ours also scored above threshold. Identical scores mean the two pages are indistinguishable on title and slug.

| Topic | Owner | Also matches | Note |
|---|---|---|---|
| nhs pensions | /calculators/nhs-pension-scheme-pays **67.2** | /blog/nhs-pension-scheme-pays-doctors-deadlines **67.2** | tie |
| nhs pension schemes | /calculators/nhs-pension-scheme-pays 63.9 | /blog/nhs-pension-scheme-pays-doctors-deadlines 63.9 | tie |
| nhs pension 1995 scheme | /calculators/nhs-pension-scheme-pays 62.2 | /blog/nhs-pension-scheme-pays-doctors-deadlines 62.2 | tie |
| how does nhs pension work | /calculators/nhs-pension-scheme-pays 56.2 | /blog/nhs-pension-scheme-pays-doctors-deadlines 56.2 | tie |
| death in service | /calculators/nhs-pension-scheme-pays 49.7 | /blog/nhs-pension-scheme-pays-doctors-deadlines 49.7 | tie |
| is the nhs pension good | /calculators/nhs-pension-scheme-pays 64.4 | /blog/nhs-pension-scheme-pays-doctors-deadlines 64.4 | tie |
| how does the scheme work | /calculators/nhs-pension-scheme-pays 66.7 | /blog/nhs-pension-scheme-pays-doctors-deadlines 66.7 | tie |
| is nhs pension salary sacrifice | /calculators/nhs-pension-scheme-pays 52.0 | /blog/nhs-pension-scheme-pays-doctors-deadlines 52.0 | tie |
| added years | /calculators/nhs-pension-scheme-pays 52.5 | /blog/nhs-pension-scheme-pays-doctors-deadlines 52.5 | tie |
| pension lifetime allowance | /research/annual-allowance-pension-tax-index 51.1 | /medical-guides/nhs-pension-annual-allowance 51.1 | tie |
| pension nhs contact | /nhs-pension 41.0 | /medical-guides/nhs-pension-annual-allowance 41.0 | tie |
| nhs pension increase | /medical-guides/nhs-pension-annual-allowance 51.1 | /calculators/nhs-pension-annual-allowance 51.1 | tie, same slug two namespaces |
| nhs deferred pension | /nhs-pension 50.0 | /medical-guides/nhs-pension-annual-allowance 50.0 | tie |
| pension annual allowance | /blog/nhs-pension-scheme-pays-doctors-deadlines 82.2 | /medical-guides/nhs-pension-annual-allowance 76.7 | |
| pension annual allowance calculator | /blog/nhs-pension-tapered-annual-allowance-calculator 76.7 | /medical-guides/nhs-pension-annual-allowance 67.8 | |
| nhs pension calculator | /blog/nhs-pension-tapered-annual-allowance-calculator 72.1 | /calculators/nhs-pension-scheme-pays 53.8 | |
| pension tapered annual allowance | /blog/nhs-pension-tapered-annual-allowance-calculator 71.4 | /research/annual-allowance-pension-tax-index 57.1 | |
| nhs pension scheme forms | /blog/nhs-pension-for-locums-form-a-form-b 63.7 | /calculators/nhs-pension-scheme-pays 63.1 | |
| avcs nhs pension | /blog/nhs-pension-tapered-annual-allowance-calculator 62.8 | /nhs-pension 57.8 | |
| early retirement | /blog/nhs-pension-partial-retirement-doctors-guide 59.6 | /blog/mccloud-remedy-nhs-pension-doctors-explained 59.6 | tie |
| nhs pension refund form | /blog/nhs-pension-for-locums-form-a-form-b 57.3 | /nhs-pension 49.2 | |
| nhs pension redundancy | /blog/nhs-pension-tax-charges-how-to-minimize 56.0 | /nhs-pension 48.0 | |
| how is nhs pension calculated | /blog/nhs-pension-tapered-annual-allowance-calculator 53.3 | /nhs-pension 48.3 | |
| retire and return | /blog/nhs-pension-partial-retirement-doctors-guide 51.2 | /blog/mccloud-remedy-nhs-pension-doctors-explained 47.6 | |
| nhs tax refund | /blog/nhs-pension-tax-charges-how-to-minimize 48.2 | /blog/private-practice-tax-nhs-and-private-income 46.9 | |

Two structural conflicts sit under this table. `/calculators/nhs-pension-scheme-pays` versus `/blog/nhs-pension-scheme-pays-doctors-deadlines` tie on nine topics. `nhs-pension-annual-allowance` exists as a slug in three namespaces at once (`/calculators/`, `/medical-guides/`, and `/blog/nhs-pension-annual-allowance-complete-guide`). Per §5 of the working agreement these are never collapsed. They are differentiated: the calculator owns the tool intent, the guide owns the explanation, the blog post owns the worked case.

---

## 8. Screened out, every one with its volume

42 topics were screened. **No topic was dropped for having a hard SERP.** Decision 21 forbids that, and bma.org.uk, which owns most of the hardest SERPs in this niche, supplied the largest share of the missing vocabulary in §5.

| Volume | Domains | Reason | Topic | Note |
|---|---|---|---|---|
| 378,420 | 1 | off-niche | uk tax slabs | generic UK income tax bands, no medical qualifier |
| 41,010 | 1 | off-niche | local economic partnership | Local Enterprise Partnership, wrong sense of "partnership" |
| 40,020 | 1 | off-niche-regulated | income protection insurance | insurance product, FCA-regulated vertical is LOCKED |
| 30,710 | 2 | off-niche | indemnity | insurance product definitions, not tax treatment |
| 27,000 | 1 | off-niche | limited liability partnership | generic LLP definition |
| 26,560 | 2 | off-niche | professional and indemnity insurance | insurance product |
| 15,600 | 2 | off-niche-lane-negative | general practitioner salary uk | `lane_negative_tokens` bans gp-salary, salary-guide |
| 10,900 | 3 | off-niche | mps / mdu / mddus indemnity | insurance product comparison |
| 8,520 | 1 | off-niche | accountancy partnership | generic firm naming |
| 7,600 | 1 | off-niche-lane-negative | salary consultant nhs | bans consultant-salary |
| 2,950 | 1 | off-niche-lane-negative | practice manager salary | bans salary-scale |
| 1,800 | 3 | off-niche | r&d tax consultant | "consultant" homonym |
| 1,780 | 1 | off-niche | professional indemnity insurance rcn | insurance product |
| 1,370 | 1 | off-niche-lane-negative | bma salary scales | bans pay-scale |
| 1,140 | 1 | brand | toppings partnership | navigational |
| 1,140 | 1 | off-niche | salary of tax consultant | homonym |
| 1,110 | 1 | off-niche | tax consultant | homonym |
| 1,080 | 1 | off-niche | return to work interview | HR topic |
| 1,080 | 1 | off-niche | indemnity insurance nursing | insurance product |
| 920 | 1 | off-niche | pharmacy indemnity insurance | insurance product |
| 820 | 2 | off-niche | consulting services accounting | homonym |
| 710 | 1 | off-niche-lane-negative | nhs gp salary | salary benchmarking |
| 620 | 1 | off-niche | civil service partnership pension | not NHS |
| 570 | 1 | off-niche | tax advisory partnership | generic |
| 570 | 1 | off-niche-regulated | income protection, pre-existing conditions | insurance product |
| 530 | 1 | brand | bracey's accountants | navigational |
| 530 | 1 | brand | bridges chartered accountants | navigational |
| 510 | 1 | off-niche | advantages of civil partnership | marriage, wrong sense |
| 470 | 2 | brand | berthold bauer vat consultants | navigational |
| 460 | 1 | off-niche | br noncum tax code | generic PAYE coding |
| 390 | 1 | off-niche | relocation allowance | not doctor-specific |
| 370 | 1 | off-niche | professional indemnity arrangement | insurance product |
| 350 | 1 | brand | fairway training ltd | navigational |
| 340 | 1 | brand | vera payroll | software brand |
| 320 | 1 | off-niche | sole trader vs partnership | no medical qualifier |
| 310 | 1 | off-niche | limited company investment account | generic |
| 300 | 1 | off-niche | uk tax trap | generic |
| 270 | 1 | off-niche | electric car tax benefits | generic |
| 260 | 1 | brand | mars revalidation | software brand |
| 210 | 2 | off-niche | international tax consultants | homonym |
| 210 | 1 | off-niche | can i use my pension to buy a house | generic personal finance |
| 190 | 1 | off-niche | annual tax summary not showing | HMRC support query |

Plus, at keyword level before clustering: **73 news-cycle keywords** (named politicians, "budget", "abolished", "scrapped", pay deals, strikes, dated years) and **16 brand keywords**.

**"consultant" is the trap on this site.** Seven screened topics totalling 6,450 volume exist only because "consultant" means a hospital doctor to us and a tax adviser to Google. Any future harvest on this niche needs that disambiguation before the SERP is read, not after.

**One screen worth revisiting.** Indemnity as an insurance product is off-niche, correctly. Indemnity as a **deductible expense** for a doctor is squarely in niche, and it survives inside the retained expenses topics. If a future pass wants the 30,710-volume "indemnity" family, the angle is tax treatment, never product comparison.

---

## 9. Our specialist tail

**97 of our 105 in-scope pages match no consensus topic**: 76 blog posts and 21 tool, guide and hub pages. The market does not group them. Examples: `consultant-directors-loan-account-s455-medical-company`, `family-investment-company-doctors-consultants`, `gp-partnership-last-man-standing-premises-risk`, `incorporation-relief-private-medical-practice-s162`, `gp-partnership-basis-period-reform-explained`, `selling-private-medical-practice-cgt-badr`, plus all 12 `gp-accountant-<city>` pages.

Per §9.3 this layer is the differentiator and is not deleted, thinned or reframed to make room. The prescription is the reverse: the plain-language layer gets added above it so the depth becomes findable.

The 12 city pages are a separate observation. The consensus map's single highest-confidence topic, "healthcare accountants near me" at 24 domains, is the local commercial intent those pages are aimed at, and none of them scored above threshold against it. The market's vocabulary for that topic is "healthcare accountants", "accountants for doctors", "medic accountants", "accountant for medical professionals". Ours is "gp accountant <city>".

---

## 10. Reconciliation ledger

Every harvested keyword lands in exactly one bucket.

| Bucket | Count |
|---|---|
| Harvested rows, deduped on (domain, keyword) | 32,872 |
| — outside the term family (off-niche at keyword level) | 29,563 |
| **In the term family** | **3,309** |
| — screened, news-cycle | 73 |
| — screened, brand | 16 |
| **Kept** | **3,220** |
| → assigned to one of our pages | 792 |
| → NO-PAGE | 450 |
| → screened at topic level (§8) | 642 |
| → below node threshold (on a competitor URL holding fewer than 3 in-family keywords) | 1,336 |
| **Sum** | **3,220** |

**BALANCED.** 792 + 450 + 642 + 1,336 = 3,220.

Precedence when a keyword appears in more than one topic: assigned beats NO-PAGE beats screened. Without that rule the first run overcounted by 66.

The 1,336 below-threshold keywords are not lost, they are stored in `dataforseo_competitor_data` and are the natural input to a second pass at a lower node threshold. They are excluded here because a competitor URL carrying one or two in-family keywords is not evidence that any domain treats it as a topic, which is the whole basis of the confidence score.

**Competitor page balance.** 388 competitor URLs carried at least one in-family keyword; 204 became nodes; 184 fell below the 3-keyword threshold. No URL was silently dropped. No teardown was attempted in this task, so §9.5 section 4 is unbuilt and is the next step.

---

## 11. What this dossier does not contain

Named, so absence is a stated limitation rather than a silence.

1. **Four vocabulary domains unharvested** (england.nhs.uk, nhsbsa.nhs.uk, nhsemployers.org, wesleyan.co.uk) and bma.org.uk only partially. About $19 to complete on a later day.
2. **No competitor teardown** (§9.5 section 4). No competitor page has been fetched, so there is no heading union and no coverage checklist yet.
3. **No per-page research packs** (§9.5). This dossier is the shared input from which they are derived.
4. **The map is competitor-derived only.** GSC and Bing are counted in §2 but the topics are built from competitor page groupings, per §9.2 step 2. The per-page packs must union all three or the equity gate has nothing to protect.
5. **Verbatim matching only.** §5 measures phrase presence, not semantic coverage.
6. **Peer-winnable is a Google-derived number.** DataForSEO positions are Google. On a site where Bing out-clicks Google 3.4x, the peer-winnable column sequences work on one engine only. It never excludes anything, per decision 21.

---

## 12. Dossier freeze

Per §9.8 this dossier is the frozen scope. Anything discovered after this point goes into a named delta list and is worked in a later pass. The four unharvested domains are already on that list.

**Next step, unchanged from §9.8:** competitor teardown per topic, then per-page packs, then the writer. Nothing in this task may be executed without that sequence.
