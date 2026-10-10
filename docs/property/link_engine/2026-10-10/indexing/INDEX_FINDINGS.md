# Property indexing: why 379 of 887 indexable routes are indexed

Read-only investigation, 2026-10-10. Per-page data: `INDEX_STATE.csv` (+ `.meta.json`, sha256 and data dates). Raw inspections: `inspect_raw.jsonl`. Production deploy history: `vercel_prod_deploys.csv`.

## Sources and method (what each number rests on)

- URL Inspection: all 887 indexable routes from `stages/08_pages.csv`, inspected 2026-10-10 (UTC), 0 errors. Deviation: I did not skip the 83 inspected earlier today, because those rows lack `referringUrls` and `sitemap`; 887 of the 2,000/day quota used. One of the 83 changed its last-crawl time since the earlier pull.
- Git: the clone was shallow (143 commits); I ran `git fetch --unshallow` (3,486 commits, no working-tree change). First commit, body edits and word counts come from `git log --follow` over the 806 post files. A "substantive" edit is 10 or more changed body lines (frontmatter ignored). Commit messages show some are bulk sweeps (em-dash, year-transition, link fixes), so this threshold is a rule I chose, not a measure of rewrite depth.
- "Version Google saw": Google's last crawl time is matched to the latest production deployment (Vercel connector, 302 READY production deploys since 2026-03-29, 54 without a git SHA) made at least 4 minutes before the crawl, then to the latest commit before that deploy. Commit date is not deploy date; this is an approximation, good to the deploy, not to the hour.
- Search Console daily pull (date x page, dataState all): returned rows only from 2026-03-29 to 2026-10-08 although 2025-06-01 was requested; the site's first impressions and first deploy are both late March 2026. #fragment URLs excluded. 45,736 rows.
- Bing-strong = Bing clicks >= 10 (the protect register threshold). Inlinks = distinct source pages with a body-region link, status ok, excluding self, from `08_edges_html.csv`.
- Non-post routes (84) have no git mapping here; their git columns are blank.

## 1. Totals

| State | Routes | Share |
|---|---|---|
| Submitted and indexed | 379 | 42.7% |
| Crawled, currently not indexed | 478 | 53.9% |
| Discovered, currently not indexed (never crawled) | 23 | 2.6% |
| URL is unknown to Google (never crawled) | 4 | 0.5% |
| Page with redirect (Google picked another canonical) | 3 | 0.3% |

Posts (803): 306 indexed, 472 crawled-not-indexed, 25 other. Non-posts (84): 73 indexed, 6 crawled-not-indexed, 5 other. The "387" in the brief is a slightly earlier count; today it is 379.

## 2. Tables (indexed vs not, rates)


**All 887 routes by month of last Google crawl**

| crawl_month | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| 2026-04 | 2 | 0 | 2 | 0 | 0 | 0 |
| 2026-05 | 191 | 0 | 188 | 0 | 3 | 0 |
| 2026-06 | 20 | 2 | 18 | 0 | 0 | 10 |
| 2026-07 | 287 | 37 | 250 | 0 | 0 | 13 |
| 2026-08 | 141 | 131 | 10 | 0 | 0 | 93 |
| 2026-09 | 111 | 105 | 6 | 0 | 0 | 95 |
| 2026-10 | 108 | 104 | 4 | 0 | 0 | 96 |
| never | 27 | 0 | 0 | 27 | 0 | 0 |

**Posts (803) by month of first git commit**

| pub_month | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| 2026-03 | 32 | 18 | 12 | 1 | 1 | 56 |
| 2026-04 | 196 | 74 | 115 | 6 | 1 | 38 |
| 2026-05 | 450 | 104 | 345 | 1 | 0 | 23 |
| 2026-07 | 26 | 26 | 0 | 0 | 0 | 100 |
| 2026-08 | 76 | 76 | 0 | 0 | 0 | 100 |
| 2026-09 | 23 | 8 | 0 | 15 | 0 | 35 |

**Posts by first-commit date (publishing wave)**

| first_commit_date | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| 2026-03-29 | 32 | 18 | 12 | 1 | 1 | 56 |
| 2026-04-01 | 32 | 19 | 10 | 3 | 0 | 59 |
| 2026-04-10 | 158 | 55 | 100 | 2 | 1 | 35 |
| 2026-04-11 | 6 | 0 | 5 | 1 | 0 | 0 |
| 2026-05-18 | 4 | 1 | 3 | 0 | 0 | 25 |
| 2026-05-19 | 3 | 1 | 2 | 0 | 0 | 33 |
| 2026-05-20 | 25 | 10 | 15 | 0 | 0 | 40 |
| 2026-05-22 | 87 | 24 | 62 | 1 | 0 | 28 |
| 2026-05-23 | 93 | 25 | 68 | 0 | 0 | 27 |
| 2026-05-24 | 28 | 4 | 24 | 0 | 0 | 14 |
| 2026-05-25 | 38 | 7 | 31 | 0 | 0 | 18 |
| 2026-05-26 | 52 | 13 | 39 | 0 | 0 | 25 |
| 2026-05-27 | 60 | 9 | 51 | 0 | 0 | 15 |
| 2026-05-28 | 60 | 10 | 50 | 0 | 0 | 17 |
| 2026-07-09 | 11 | 11 | 0 | 0 | 0 | 100 |
| 2026-07-30 | 15 | 15 | 0 | 0 | 0 | 100 |
| 2026-08-03 | 34 | 34 | 0 | 0 | 0 | 100 |
| 2026-08-20 | 22 | 22 | 0 | 0 | 0 | 100 |
| 2026-08-21 | 20 | 20 | 0 | 0 | 0 | 100 |
| 2026-09-01 | 3 | 1 | 0 | 2 | 0 | 33 |
| 2026-09-02 | 20 | 7 | 0 | 13 | 0 | 35 |

**All routes by folder**

| folder | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| about | 1 | 1 | 0 | 0 | 0 | 100 |
| blog-cat | 10 | 2 | 6 | 1 | 1 | 20 |
| blog-hub | 1 | 1 | 0 | 0 | 0 | 100 |
| calculators | 28 | 27 | 0 | 1 | 0 | 96 |
| capital-gains-tax | 54 | 32 | 21 | 1 | 0 | 59 |
| contact | 1 | 1 | 0 | 0 | 0 | 100 |
| cookie-policy | 1 | 0 | 0 | 1 | 0 | 0 |
| cost-of-selling-a-property | 1 | 1 | 0 | 0 | 0 | 100 |
| for | 15 | 15 | 0 | 0 | 0 | 100 |
| for-letting-agents | 1 | 1 | 0 | 0 | 0 | 100 |
| home | 1 | 1 | 0 | 0 | 0 | 100 |
| incorporation | 1 | 1 | 0 | 0 | 0 | 100 |
| incorporation-and-company-structures | 181 | 54 | 110 | 15 | 2 | 30 |
| landed-estates | 1 | 1 | 0 | 0 | 0 | 100 |
| landlord-compliance | 1 | 1 | 0 | 0 | 0 | 100 |
| landlord-tax | 1 | 1 | 0 | 0 | 0 | 100 |
| landlord-tax-essentials | 163 | 53 | 108 | 2 | 0 | 33 |
| leasehold | 1 | 1 | 0 | 0 | 0 | 100 |
| locations | 6 | 5 | 0 | 1 | 0 | 83 |
| making-tax-digital-landlords | 1 | 1 | 0 | 0 | 0 | 100 |
| making-tax-digital-mtd | 41 | 9 | 31 | 1 | 0 | 22 |
| non-resident-landlord-tax | 48 | 11 | 36 | 1 | 0 | 23 |
| portfolio-management | 19 | 9 | 10 | 0 | 0 | 47 |
| privacy-policy | 1 | 1 | 0 | 0 | 0 | 100 |
| property-accountant-services | 60 | 17 | 42 | 1 | 0 | 28 |
| property-finance | 34 | 34 | 0 | 0 | 0 | 100 |
| property-tax-rates | 1 | 1 | 0 | 0 | 0 | 100 |
| property-types-and-specialist-tax | 157 | 69 | 87 | 1 | 0 | 44 |
| research | 2 | 2 | 0 | 0 | 0 | 100 |
| section-24 | 1 | 1 | 0 | 0 | 0 | 100 |
| section-24-and-tax-relief | 46 | 18 | 27 | 1 | 0 | 39 |
| services | 5 | 5 | 0 | 0 | 0 | 100 |
| spv-company | 1 | 1 | 0 | 0 | 0 | 100 |
| terms | 1 | 1 | 0 | 0 | 0 | 100 |

**Posts by word count now**

| words_band | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| (0.0, 1200.0] | 2 | 0 | 2 | 0 | 0 | 0 |
| (1200.0, 1600.0] | 48 | 20 | 23 | 5 | 0 | 42 |
| (1600.0, 2200.0] | 109 | 60 | 43 | 6 | 0 | 55 |
| (2200.0, 3000.0] | 375 | 137 | 225 | 11 | 2 | 37 |
| (3000.0, 1000000.0] | 269 | 89 | 179 | 1 | 0 | 33 |

**Posts by internal body links in**

| inlinks_band | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| (-1, 0] | 92 | 28 | 62 | 2 | 0 | 30 |
| (0, 2] | 203 | 73 | 119 | 11 | 0 | 36 |
| (10, 20] | 91 | 30 | 57 | 3 | 1 | 33 |
| (2, 5] | 214 | 89 | 120 | 5 | 0 | 42 |
| (20, 999] | 44 | 21 | 22 | 1 | 0 | 48 |
| (5, 10] | 159 | 65 | 92 | 1 | 1 | 41 |

**Posts: substantive body change (>=10 lines) between the version live at last crawl and now**

| edited_since_crawl | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| no | 644 | 302 | 342 | 0 | 0 | 47 |
| yes | 136 | 4 | 130 | 0 | 2 | 3 |

**Posts: Bing-strong (bing_clicks >= 10)**

| bing_strong | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| no | 728 | 261 | 444 | 21 | 2 | 36 |
| yes | 75 | 45 | 28 | 2 | 0 | 60 |

**Posts by click depth**

| click_depth | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| 1.0 | 15 | 11 | 1 | 3 | 0 | 73 |
| 2.0 | 215 | 97 | 107 | 11 | 0 | 45 |
| 3.0 | 573 | 198 | 364 | 9 | 2 | 35 |

**Posts by any Google impression in data window**

| hasimp | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| impressions | 771 | 304 | 461 | 6 | 0 | 39 |
| none | 32 | 2 | 11 | 17 | 2 | 6 |

**Posts by count of substantive edits after creation**

| n_subst_edits | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| 0.0 | 400 | 134 | 250 | 16 | 0 | 34 |
| 1.0 | 155 | 71 | 83 | 1 | 0 | 46 |
| 2.0 | 150 | 55 | 90 | 4 | 1 | 37 |
| 3.0 | 63 | 26 | 36 | 1 | 0 | 41 |
| 4.0 | 24 | 11 | 11 | 1 | 1 | 46 |
| 5.0 | 9 | 8 | 1 | 0 | 0 | 89 |
| 6.0 | 2 | 1 | 1 | 0 | 0 | 50 |

**Posts by publish period x last-crawl period**

| cohort | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| published Jul-Sep / crawled Apr-Jul | 6 | 6 | 0 | 0 | 0 | 100 |
| published Jul-Sep / crawled Aug-Oct | 104 | 104 | 0 | 0 | 0 | 100 |
| published Mar-May / crawled Apr-Jul | 473 | 19 | 452 | 0 | 2 | 4 |
| published Mar-May / crawled Aug-Oct | 197 | 177 | 20 | 0 | 0 | 90 |

**Posts published Mar-May with NO substantive edit since creation (same content throughout), by crawl period**

| crawl_period | n | indexed | crawled_ni | never_crawled | redirect | indexed % |
|---|---|---|---|---|---|---|
| crawled Apr-Jul | 251 | 5 | 246 | 0 | 0 | 2 |
| crawled Aug-Oct | 62 | 58 | 4 | 0 | 0 | 94 |

## 3. What the data supports

**Finding 1. State follows the date of the last crawl almost completely, and the content version does not separate the groups.**
- Last crawl April to June: 2 indexed of 213. July: 37 of 287. August to October: 340 of 360 (94%).
- Posts published March to May and never substantively edited (same content the whole time): crawled by July, 5 of 251 indexed; crawled August to October, 58 of 62 indexed. Same words, opposite outcomes.
- Posts published July to September: 104 of 104 indexed when crawled August to October.
- The brief's "May crawl = not indexed" holds across the full set: 0 of 191 pages last crawled in May are indexed. September and October crawls are 95% and 96% indexed.

**Finding 2. Wave and folder concentration is real but mostly a restatement of Finding 1.** Posts first committed 2026-05-22 to 05-28 are 14 to 28% indexed; 2026-04-10 is 35%; all 102 posts committed 2026-07-09 to 2026-08-21 are indexed. Weakest folders: making-tax-digital-mtd 22%, non-resident-landlord-tax 23%, property-accountant-services 28%, incorporation-and-company-structures 30%, landlord-tax-essentials 33%. property-finance (34), for (15), calculators (27 of 28), services (5) are fully or nearly fully indexed. Size, links in and depth show only weak gradients: word count above 3,000 33% vs 55% for 1,600 to 2,200; 0 body links in 30% vs 20+ links 48%; depth 3 is 35% vs depth 2 45%. These are not controlled for crawl date and I do not read them as causes.

**Finding 3. 130 of the 478 crawled-not-indexed pages were rewritten after Google's last crawl, so Google has not yet seen the current version.** Their median body was about 1,630 words at the crawl and is about 2,610 now (82% are longer). Most were last crawled in May (103 of 130) and the rewrites went live 30 May to 7 June (Track 2 deploy of 2 June) or later. Only 4 of 136 such edited-since-crawl posts are indexed. Section 24 folder (46 posts): 18 indexed, 27 crawled-not-indexed, 1 never crawled; 16 of the 27 were last crawled 15 to 30 May and rewritten afterwards, with a body of 767 to 1,674 words at crawl versus 1,565 to 3,456 now. The other 11 were crawled in July to September on the current version (6 in July, 1 in August, 3 in September, 1 in July after a later edit), unedited since.

**Finding 4. The other 342 crawled-not-indexed posts were crawled on content that is essentially the current content.** Google read what is live now and did not index it. This group is not explained by "old version judged weak", and refreshing it has not been tried by the data (no change since the crawl).

**Finding 5. Recrawl, not prior page value, accompanies indexing.** Among Mar-May posts, share last crawled August or later rises with pre-August impressions (about 16 to 19% for under 50 impressions, 64 to 72% for 200+). But within each impressions band nearly every late-crawled page is indexed (for example the 10 to 50 band: 43 late-crawled, 46 indexed). So low-value-looking pages that were recrawled got indexed too.

## 4. Answers to the specific tests

**(a) Were indexed pages ever unindexed, and did refresh plus recrawl work?** Partly visible. Of 224 indexed posts with 100 or more impressions, 29 had a gap of 21 days or more with zero impressions between their first and last impression day (gap lengths 22 to 121 days, mostly July to September); that is the best available sign of dropping out and returning, and it is a proxy, not an index-status history. Of the 29: 8 resumed within 3 days of the last crawl date (15 within 7 days), 9 were never substantively edited, and only 6 had a substantive edit go live inside the gap. So returns line up with a recrawl, and a content change is not needed or demonstrated for most. Of the 196 indexed Mar-May posts with impressions, 83 (42%) had their first impression more than 14 days after going live. 168 indexed posts had a substantive edit and a later crawl, so "edited, recrawled, indexed" is common, but the same group contains 94 not-indexed posts (see b). I cannot say whether the edit or the recrawl did the work.

**(b) Recrawled after a substantive edit and stayed not indexed?** Yes. 262 posts with at least one substantive edit were crawled after the last one went live: 168 indexed, 94 not. The 94 split by crawl month: May 11, June 4, July 64, August 7, September 6, October 2. Median 37 days between edit live date and that crawl; 80 of the 94 were crawled 14 or more days after the edit. By crawl month, those crawled in July after an edit are 13 of 77 indexed; crawled August to October, 155 of 170 (91%). So recrawl-after-edit did not guarantee indexing in the July crawl cohort, and did in the later ones. The data does not show whether the difference is Google changing its mind over time or the content differences between those cohorts.

**(c) Concentrated in waves or folders?** By wave: the 2026-05-22 to 05-28 first-commit dates (418 posts) are 14 to 28% indexed; 2026-04-10 (158) 35%; 2026-03-29 and 04-01 (64) 56 to 59%; July to August 2026 waves (102) 100%; 2026-09-01 and 09-02 waves (23) 35% but 15 of those are simply never crawled yet, and 0 are crawled-not-indexed. Folder spread is wide (22% to 59% for the large folders) and tracks the wave mix: the large folders are made of the same March to May waves.

**(d) Never crawled (27 routes: 23 Discovered, 4 unknown).** 15 of them are the 1 to 2 September SPV waves (13 Discovered, 2 unknown), 5 to 6 weeks old at inspection, with 0 to 12 body links in (median 2) and a single referring URL that is the sitemap. 12 are older: 8 posts first committed 29 March to 10 April (property-company-profit-extraction, capital-vs-revenue-expenditure, sdlt-buy-to-let-rates-surcharge-guide-2025, property-management-accounting-services, section-24-calculator, property-improvements-reduce-cgt, close-investment-holding, landlord-tax-return-deadline-2026) and 4 non-posts (CGT category hub, extraction calculator, cookie policy, locations hub). Some of the older ones have large impression counts (sdlt-buy-to-let-rates-surcharge-guide-2025 2,071; capital-vs-revenue 263), so Google once had them and now reports them as Discovered; I do not know why. The 4 "unknown to Google" pages are the only ones with no sitemap entry in Google's record, although all four are in the live sitemap today (888 URLs) and return HTTP 200; why Google has not picked them up is unknown (possible reason: Google's last sitemap read pre-dates them, not verified). Links in do not explain it: 4 of the 8 older never-crawled posts have 8 to 24 body links in.

## 5. What the data does not show

- Why Google chose to recrawl some pages in August to October and not others. Candidates in the data: earlier impressions (higher for the recrawled group) and Bing clicks (10% of late-crawled unedited posts are Bing-strong vs 1% of earlier-crawled). Whether those cause crawling, or reflect it, is unknown.
- Whether the 342 unedited-since-crawl pages would be indexed after a refresh; no refresh-then-recrawl has been observed on them.
- Whether any single page was "unindexed then indexed" after an edit: there is no index-status history, only impressions as a proxy.
- The 16 Section 24 pages named in the brief could not be identified from the 83-URL file (it holds 5 URLs with "section-24" in the path); the figures above are for the whole section-24-and-tax-relief folder.
- Deploy-versus-commit timing is approximate; pages' crawl-time content is inferred, not fetched from Google's cache.

## 6. Recommendation (one line)

The data supports a recrawl-driven reading for the 130 rewritten-but-unseen pages (cause not tested, and cannot be called a symptom either); the lever that moved pages in the data is a Google recrawl. The 342 pages Google read and declined are the group where a refresh would be a real test. Nothing was deployed, edited, committed or requested.
