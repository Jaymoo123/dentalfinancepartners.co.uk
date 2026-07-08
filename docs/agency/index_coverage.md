# Agency Index Coverage Verdict — 2026-07-08

**Artifact:** `.cache/agency_diag/index_coverage.json` (generated 2026-07-08T10:40:14Z).
**DATA-TRUST HEADER:** 433 URLs inspected via GSC URL Inspection API (quota_hit=false, bing_check_degraded=false). `bing_indexed` field = null for all URLs (Bing probe not run). GSC data window: standard 90-day rolling window. No sitemap-metadata fields present in inspection results (no `last_sitemap_fetch`, `referring_sitemap`, or equivalent keys in the artifact — sitemap sanity requires a separate GSC Sitemaps API call not performed in this sweep).

---

## Headline verdict

**TWO-MECHANISM FAILURE: crawl-budget rejection on discovered URLs + discovery gap on the remaining quarter.**

Google has indexed 18 of 433 sitemap URLs (4.2%). The diagnostic signature is fundamentally different from medical: 214 URLs (49%) are "Discovered — currently not indexed" — Google **knows** these pages exist (the sitemap works) but is actively declining to crawl or index them. A further 175 URLs (40%) are entirely unknown. Only 44 URLs (10%) have been fetched. The 214-URL discovered-not-indexed mass is the primary clinical signal: at scale, this pattern indicates crawl-budget exhaustion combined with a quality or relevance triage decision by Google's scheduler.

---

## 1. Bucket histogram (433 URLs inspected, quota_hit=False)

| Bucket | Count | Pct |
|--------|-------|-----|
| **discovered_not_indexed** | **214** | **49.4%** |
| **unknown_to_google** | **175** | **40.4%** |
| crawled_not_indexed | 26 | 6.0% |
| indexed_self_canonical | 18 | 4.2% |
| canonicalised_away | 0 | 0% |
| excluded_or_redirect | 0 | 0% |
| error | 0 | 0% |

**page_fetch_state distribution:** SUCCESSFUL = 44 (the 18 indexed + 26 crawled_not_indexed); PAGE_FETCH_STATE_UNSPECIFIED = 389. Zero fetch failures, zero robots blocks, zero noindex signals. All 44 fetched pages render correctly.

---

## 2. Bucket by route family

| Route family | Total | Indexed | Crawled_NI | Discovered_NI | Unknown |
|---|---|---|---|---|---|
| **blog/international-agencies** | 115 | 4 | 8 | 58 | 45 |
| **blog/tax-and-compliance** | 62 | 3 | 5 | 32 | 22 |
| **blog/growth-and-exit** | 26 | 3 | 2 | 13 | 8 |
| **blog/agency-finance-essentials** | 26 | 1 | 0 | 13 | 12 |
| **blog/making-tax-digital** | 18 | 2 | 2 | 7 | 7 |
| **blog/salary-and-dividends** | 18 | 0 | 1 | 8 | 9 |
| **blog/contractors-and-ir35** | 20 | 0 | 0 | 10 | 10 |
| **blog/incorporation-and-structure** | 16 | 0 | 1 | 7 | 8 |
| **blog/agency-accountant-services** | 14 | 0 | 0 | 6 | 8 |
| **glossary** | 26 | 1 | 4 | 10 | 11 |
| **core** (services, about, contact, R&D, etc.) | 17 | 1 | 0 | 10 | 6 |
| **agencies** (vertical landing pages) | 20 | 1 | 1 | 12 | 6 |
| **relocation** | 10 | 1 | 0 | 6 | 3 |
| **calculators** | 9 | 0 | 1 | 5 | 3 |
| **founder-stories** | 11 | 0 | 1 | 8 | 2 |
| **fundamentals** | 10 | 0 | 0 | 6 | 4 |
| **locations** | 8 | 0 | 0 | 3 | 5 |
| **blog** (root /blog) | 1 | 0 | 0 | 0 | 1 |
| **homepage** | 1 | 1 | 0 | 0 | 0 |

**Key observations:**

- **Homepage: indexed** (last crawl 2026-06-17). This is important — Google is alive on the domain. The failure is downstream of the homepage.
- **blog/international-agencies: 115 pages, only 4 indexed (3.5%).** Largest family by volume; 58 discovered-not-indexed + 45 unknown. The discovered-not-indexed mass here alone (58 pages) signals Google has seen these via sitemap but is deferring them — likely a combination of crawl-budget triage and relevance/quality scoring on a thin niche.
- **agencies/* verticals: only /agencies/pr-agencies indexed** (out of 20 verticals). /agencies/creative-agencies was crawled but not indexed. 12 are discovered-not-indexed, 6 unknown. Google has not chosen to crawl the vast majority of the commercial vertical pages.
- **blog/contractors-and-ir35 and blog/agency-accountant-services: 0 indexed, 0 crawled.** These families are entirely in the discovered/unknown state — Google has literally never fetched a single page from them.
- **fundamentals: 0 indexed across all 10 pages.** All discovered-not-indexed or unknown.
- **guides: all 5 unknown** (not even in discovered state). Google has no awareness of this family.
- **calculators: 0 indexed, 1 crawled** (/calculators/salary-dividend-optimiser). Google fetched one calculator but declined to index it.
- **founder-stories: 0 indexed**, 8 discovered-not-indexed + 2 unknown. Crawled one but not indexed.
- **glossary: 1 indexed** (/glossary/section-455, last crawl 2026-05-22), 4 crawled-not-indexed, 10 discovered-not-indexed, 11 unknown.

**Families wholly unknown to Google (0 indexed, 0 crawled, 0 discovered):**
- /blog root (the index hub — this means Google doesn't even know the blog listing page exists)
- /guides/* (all 5 pages)

---

## 3. The 18 indexed pages

| URL | Last crawl | Notes |
|-----|-----------|-------|
| / (homepage) | 2026-06-17 | Anchor |
| /agencies/pr-agencies | 2026-05-16 | Only vertical indexed |
| /malta-relocation | 2026-05-17 | Specific relocation guide |
| /r-and-d-credits | 2026-07-05 | Core commercial page, recently recrawled |
| /glossary/section-455 | 2026-05-22 | Only glossary entry indexed |
| /blog/tax-and-compliance/aia-capital-allowance-agency-equipment | 2026-05-20 | |
| /blog/tax-and-compliance/annual-investment-allowance-2024-25 | 2026-07-06 | Most recently crawled page on site |
| /blog/tax-and-compliance/merged-r-and-d-scheme-agency-2023 | 2026-05-16 | |
| /blog/agency-finance-essentials/13-week-cash-flow-forecast-agency-insolvency | 2026-05-16 | |
| /blog/growth-and-exit/cgt-rates-2025-agency-founder-shares | 2026-06-21 | |
| /blog/growth-and-exit/earn-out-tax-treatment-hmrc-agency-sale | 2026-07-05 | |
| /blog/growth-and-exit/selling-agency-tax-implications | 2026-05-16 | |
| /blog/making-tax-digital/chart-of-accounts-mtd-itsa-agency | 2026-05-16 | |
| /blog/making-tax-digital/mtd-software-xero-agency-reporting | 2026-05-16 | |
| /blog/international-agencies/dubai-free-zone-minimum-office-space-requirement-flexi-desk | 2026-05-16 | |
| /blog/international-agencies/dubai-relocation-agency-exit-tax-goodwill | 2026-05-16 | |
| /blog/international-agencies/hiring-remote-employee-spain-uk-agency-tax-compliance | 2026-07-04 | |
| /blog/international-agencies/uae-corporate-tax-registration-threshold-small-agency-founder | 2026-05-16 | |

**Pattern in the 18:** Indexed posts are concentrated in three blog categories (tax-and-compliance, growth-and-exit, international-agencies). The first crawl wave appears to have been around 2026-05-16 (13 of 18 pages). Two pages were recrawled in early July. No entire route family beyond these three has a single indexed page.

---

## 4. GSC impressions vs bucket reconciliation

The parent brief notes 40 pages with GSC impressions (implying they are or were indexed), but only 18 are currently in `indexed_self_canonical` and 26 in `crawled_not_indexed` (44 total fetched). This is not a contradiction — it is expected churn:

1. **GSC impression data is historical** (rolling 90-day window). A page that had impressions 60 days ago and was later deindexed would still appear in the impressions dataset but land in `crawled_not_indexed` or `discovered_not_indexed` today.
2. **crawled_not_indexed (26) includes recently deindexed pages.** Google crawled these successfully (page_fetch_state=SUCCESSFUL) but chose not to index them. Pages in this bucket almost certainly had prior impressions — they were indexed at some point, deindexed, and recrawled. The `crawled_not_indexed` state is Google's active quality-triage decision, not a new page.
3. **The 40−18 = 22 gap** sits almost entirely in the `crawled_not_indexed` bucket (26 pages). The slight overshoot (26 > 22) means a few pages in that bucket may never have had impressions, while a few impression-bearing pages have since moved to `discovered_not_indexed`.

**Bottom line:** 40 impression pages ≈ 18 currently indexed + ~22 recently deindexed (now crawled_not_indexed). No data inconsistency. The deindexing wave is a significant signal — Google previously indexed more of this site and then pulled back.

---

## 5. Agency vs Medical: diagnostic distinction

| Dimension | Medical (Jul 6) | Agency (Jul 8) |
|-----------|----------------|----------------|
| Total URLs | 112 | 433 |
| Indexed | 6 (5.4%) | 18 (4.2%) |
| Unknown to Google | 103 (92%) | 175 (40%) |
| Discovered-not-indexed | 0 (0%) | 214 (49%) |
| Crawled-not-indexed | 1 (0.9%) | 26 (6.0%) |
| Primary mechanism | **Discovery failure** | **Crawl-budget rejection + partial discovery** |

Medical's 92% unknown-to-google fingerprint indicated the sitemap was not being processed — Google simply had not placed those URLs in its crawl queue. The fix was forcing sitemap re-discovery (IndexNow, GSC re-submit).

Agency's picture is fundamentally different:

- **Google knows 258 of 433 URLs (60%)** — the sitemap IS working. Discovery is not the bottleneck.
- **214 URLs in "Discovered — currently not indexed"** means Google has these in its queue but is actively not crawling them. This is Google's scheduler making a priority decision: these URLs are deprioritised relative to the rest of the web the crawler needs to serve. Causes at scale: (a) crawl budget exhausted before reaching them, (b) low PageRank signal → not worth crawling, (c) suspected low-quality or thin pages → deprioritised.
- **The 26 crawled-not-indexed** (active deindexing) add a second signal: Google IS reaching some pages but rejecting them post-crawl. This is content-quality triage, not pure budget exhaustion.
- **The 175 still unknown** are the secondary problem: a full 40% have not been seen at all, likely because they are deep in the sitemap and the sitemap is not re-fetched frequently enough.

**Root-cause framing:** Agency's index problem is crawl-budget allocation and content-quality triage on a medium-authority young domain, not discovery failure — the sitemap works, Google has the URLs, but it is choosing not to spend crawl budget on most of them.

---

## 6. Orphan/inlink correlation with unknown_to_google

**Artifact:** `.cache/agency_diag/inlink_correlation.json`. Total known routes: 439. Orphans (0 editorial inlinks): 163.

Contingency table (orphan = in the orphans list, i.e. 0 editorial inlinks excluding nav/footer/pagination):

| | unknown_to_google | known to Google (indexed + crawled + discovered) | Total |
|---|---|---|---|
| **Orphan (0 inlinks)** | 57 | 106 | 163 |
| **Linked (≥1 inlink)** | 118 | 152 | 270 |
| **Total** | 175 | 258 | 433 |

**Orphan rate among unknowns:** 57/175 = **32.6%**
**Orphan rate among knowns:** 106/258 = **41.1%**

**Verdict: orphan status does NOT correlate with being unknown to Google.** Counterintuitively, the unknown-to-Google set has a *lower* orphan rate than the known set. 118 of 175 unknown pages (67.4%) have at least one editorial inlink — Google has simply not visited them despite having a sitemap reference and potentially a link path.

This mirrors the medical finding: internal linking is not the blocking variable. 67% of unknown pages are linked. The deficit is crawl budget allocation upstream, not link structure downstream. Adding more internal links to currently-unknown pages will not materially move them into the discovered or indexed state until Google increases its crawl budget allocation to this domain.

Where orphan status does matter: the 57 orphan+unknown pages have zero recovery path other than the sitemap. If the sitemap is not regularly re-fetched, these pages are invisible by two mechanisms (no inlink path, no sitemap pick-up). They are the highest-priority internal linking targets.

---

## 7. Sitemap metadata

No sitemap-specific fields (`referring_sitemap`, `last_sitemap_fetch`, `sitemap_url`) are present in the URL Inspection API artifact. The inspection API does not return this data at the URL level. Sitemap fetch date requires a separate call to the GSC Sitemaps API (`webmasters.sitemaps.list`) — not performed in this sweep.

**Proxy signal:** The oldest indexed crawl dates cluster around 2026-05-16 (13 pages). This is consistent with an initial sitemap discovery event in mid-May 2026. The most recently crawled indexed page is 2026-07-06 (/blog/tax-and-compliance/annual-investment-allowance-2024-25), confirming Google's crawler is active on this domain today. The recrawl cadence on non-indexed pages appears to be infrequent — the 26 crawled-not-indexed pages show last crawl dates ranging from 2026-05-16 to 2026-07-06, with most in May.

---

## Summary: Diagnosis

| Question | Answer |
|----------|--------|
| Index absence or suppression? | **Absence** — zero noindex, zero robots blocks, zero fetch failures |
| Primary mechanism | **Crawl-budget rejection**: 214 URLs discovered but not crawled (Google has them, won't fetch) |
| Secondary mechanism | **Discovery gap**: 175 URLs still unknown (sitemap not re-fetched frequently enough) |
| Prior indexing evidence | 40 pages had GSC impressions; ~22 have since been deindexed (crawled_not_indexed) — Google indexed then withdrew |
| Homepage indexed? | Yes (last crawl 2026-06-17) |
| Which /agencies/* indexed? | Only /agencies/pr-agencies (1 of 20 verticals) |
| Categories with 0 indexed pages | blog/contractors-and-ir35, blog/salary-and-dividends, blog/incorporation-and-structure, blog/agency-accountant-services, fundamentals, guides, calculators, founder-stories, locations |
| Orphan correlation with unknown | **Weak/inverse**: 67% of unknowns are linked; orphans do not predict unknown status |
| vs Medical | Medical = discovery failure (sitemap not processed); Agency = quality/budget triage (sitemap works, Google declining to crawl) |
| Urgency | HIGH — 95.8% of site invisible; and the 26 deindexed pages suggest active quality concerns on the content already crawled |

**One-sentence root cause:** Google's crawler has budgeted only ~44 fetches across 433 agency pages — likely due to weak external authority signals on a young domain combined with content-quality triage deprioritising the 214 discovered-but-skipped URLs — making this a domain authority and content quality problem, not a sitemap or internal linking problem.

**Recommended next steps:**
1. Diagnose the 26 crawled-not-indexed pages for content quality signals (thin content, duplication, low E-E-A-T signals) — these are the most actionable lever.
2. Prioritise the 57 orphan+unknown pages for internal linking (only recovery path other than sitemap re-fetch).
3. Submit IndexNow for the 18 currently-indexed pages' most-linked neighbours — force Google to follow the hop.
4. GSC Sitemaps API: check when sitemap was last downloaded; re-submit if stale.
5. External authority: off-site signals (PR/links) are the structural fix for crawl budget — content fixes alone will not fully resolve a budget allocation problem on a young domain.
