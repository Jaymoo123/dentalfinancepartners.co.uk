# Medical Index Coverage Verdict — 2026-07-06

**Battery step B3.** Artifact: `.cache/medical_diag/index_coverage.json` (generated 2026-07-06T17:19:12Z).
**DATA-TRUST HEADER:** GSC data window 2026-04-01 to 2026-07-04. Bing data window 2026-06-03 to 2026-07-06 (rolling aggregates). GSC confirmed API-empty before April 2026. Bing coverage via webmaster impressions data (DDG site: probe degraded/rate-limited; `--skip-bing` used; `bing_indexed` field = null for all 112 URLs in artifact).

---

## Headline verdict

**INDEX ABSENCE, not index suppression. Primary mechanism: discovery failure + low crawl budget on a young domain.**

Google has indexed 6 of 112 sitemap URLs (5.4%). 103 URLs (92%) are in state "URL is unknown to Google" — never crawled, never placed in discovery queue. Zero pages are noindex'd, robots-blocked, or quality-excluded. The site renders correctly and Bing has indexed 38 of 112 pages (34%), confirming the pages are accessible. Google simply has not discovered them.

---

## 1. Bucket histogram (112 URLs inspected, quota_hit=False)

| Bucket | Count | Pct |
|--------|-------|-----|
| **unknown_to_google** | **103** | **92.0%** |
| indexed_self_canonical | 6 | 5.4% |
| canonicalised_away | 2 | 1.8% |
| crawled_not_indexed | 1 | 0.9% |
| discovered_not_indexed | 0 | 0% |
| excluded_or_redirect | 0 | 0% |
| error | 0 | 0% |

The dominant state — `unknown_to_google` — means Google has not placed these URLs in its crawl queue from the sitemap. This is the single most important diagnosis signal: the site has a **discovery failure**, not a content-quality or technical suppression problem.

---

## 2. Bucket by page type

| Page type | Total | Indexed | Canonicalised_away | Crawled_NI | Unknown |
|-----------|-------|---------|-------------------|------------|---------|
| **core** (homepage, /services, /about, /contact, /nhs-pension, /for-*, /blog, /blog-cat, /calculators, /locations, /medical-guides root pages + policy) | 9 | 1 | 0 | 0 | 8 |
| for-* (4 /for-* landing pages) | 4 | 0 | 0 | 0 | 4 |
| blog index (/blog/) | 1 | 0 | 0 | 0 | 1 |
| blog category (8 category hub pages) | 8 | 0 | 0 | 0 | 8 |
| **blog posts** (73 individual posts) | 73 | 5 | 2 | 1 | 65 |
| calculators root (/calculators) | 1 | 0 | 0 | 0 | 1 |
| calculators child (3 tool pages, shipped 2026-07-05) | 3 | 0 | 0 | 0 | 3 |
| locations root (/locations) | 1 | 0 | 0 | 0 | 1 |
| locations child (5 city pages) | 5 | 0 | 0 | 0 | 5 |
| medical-guides root (/medical-guides) | 1 | 0 | 0 | 0 | 1 |
| medical-guides child (6 guide pages, shipped 2026-07-05) | 6 | 0 | 0 | 0 | 6 |

**Key anomalies:**

- **Homepage ONLY core page indexed.** /services and /about have been live since site launch but are "unknown to Google". Google crawled the homepage (last 2026-06-29) but did not follow its outgoing links. This is the hallmark of near-zero crawl budget.
- **Blog category hubs: all 8 unknown.** These are directly linked from /blog (which is also unknown). Google has never discovered the blog index page, so category hubs are also dark.
- **Blog posts: 5 indexed, 65 unknown, 2 phantom residue.** Even the 5 indexed posts are not recently discovered — 2 were indexed on 2026-06-03 (IndexNow day), 3 were crawled late June.
- **/calculators/\* and /medical-guides/\*: all unknown.** These shipped 2026-07-05 (M-2/M-3), so recency fully explains the state.
- **Zero pages excluded, blocked, or noindex'd.** No technical suppression anywhere on the site.

---

## 3. old_domain_residue count and canonicalised_away list

**old_domain_residue_count: 0.** No URL has its Google-chosen canonical pointing to the legacy phantom domains (`medicalaccountantsuk.co.uk` or `medicalaccountants.co.uk`). Google overrode the wrong user-canonicals with the correct domain on its own.

**Canonicalised_away (2 pages — ACTIVE RESIDUE from incomplete Jun 17 fix):**

| URL | Google canonical | User canonical | Coverage state | Last crawl |
|-----|-----------------|----------------|---------------|------------|
| /blog/gp-accounting-guide | medicalaccounts.co.uk/blog/gp-accounting-guide (correct) | medicalaccountantsuk.co.uk/blog/gp-accounting-guide (PHANTOM) | **Submitted and indexed** | 2026-06-01 |
| /blog/locum-doctor-self-assessment-filing-guide | medicalaccounts.co.uk/blog/locum-doctor-self-assessment-filing-guide (correct) | medicalaccountantsuk.co.uk/blog/locum-doctor-self-assessment-filing-guide (PHANTOM) | Crawled — currently not indexed | 2026-05-11 |

**Interpretation:** These 2 pages were NOT included in the 2026-06-17 canonical fix sweep. Their HTML `<link rel="canonical">` still declares the phantom domain. Google has overridden the wrong canonical on `gp-accounting-guide` (it appears as "Submitted and indexed" with the correct google_canonical), but that override is fragile — any recrawl could re-apply the wrong canonical. `locum-doctor-self-assessment-filing-guide` was crawled last in May, pre-fix, and has not been re-evaluated.

**Action required (owner-gated fix):** Fix `<link rel="canonical">` in these 2 post source files to point to `medicalaccounts.co.uk`.

**Note on bucket assignment:** `canonicalised_away` in the tool fires when `google_canonical != user_canonical` regardless of direction. In both cases Google chose the CORRECT canonical. These are not "canonicalized away from the site" — they are "canonical override by Google". The naming can mislead; consult this interpretation.

---

## 4. Bing IndexNow verification

**`bing_indexed` field in artifact: null for all 112 URLs.** The DDG site: probe was rate-limited/degraded on the first attempt (many "only 1 result returned" warnings, consecutive timeouts on Startpage backend). The sweep was re-run with `--skip-bing` to complete the GSC inspection within the session window. Bing data below is from Bing Webmaster Tools impressions data in `bing_query_data` table (site_key='medical').

**Overall Bing coverage (webmaster impressions proxy):**
- Pages with Bing impressions data: 38 of 112 (33.9%)
- Pages with zero Bing data: 74 of 112 (66.1%)

**Pages with Bing data by type:**
| Type | Count (with Bing data) |
|------|----------------------|
| Blog posts | 31 |
| Medical guides | 3 |
| Calculators parent (/calculators) | 1 |
| Locations child (birmingham, manchester) | 2 |
| Core (/services) | 1 |

Critically, Bing has indexed `/services`, `/calculators`, `/locations/birmingham`, `/locations/manchester`, and 3 `/medical-guides` pages — **all of which Google has never discovered**. This confirms the pages are live, accessible, and crawlable. The index absence is Google-specific.

**Blog posts (73) — IndexNow verification (submitted 2026-06-03, verification endpoint status = unknown):**
- With Bing impressions (definitively Bing-indexed): **29 of 73 (39.7%)**
- Without Bing impressions data: **44 of 73 (60.3%)**

The 44 without Bing data are likely not indexed in Bing — the Bing data window starts 2026-06-03 (same as IndexNow submission), so any indexed post that attracted even 1 impression would appear. The 44 missing posts include all 10 location-based posts (gp-accountant-birmingham etc.) and most of the specialist partnership/NHS posts.

Compare with Google: only 5 of 73 blog posts indexed (6.8%) versus Bing's ~29/73 (39.7%). Bing is approximately 6x more indexed than Google for blog content.

---

## 5. Cross-check: GSC page_performance vs sitemap

- Sitemap URLs: 112
- URLs appearing in `gsc_page_performance` (niche='medical', any impression): **10 distinct pages**
  - Homepage (www version): 1
  - Homepage (non-www medicalaccounts.co.uk/): 1 (separate GSC row, same page)
  - Blog posts: 8

- **102 of 112 sitemap URLs have zero GSC impressions ever (2026-04-01 to 2026-07-04, 96-day window).**

Post-canonical-fix window (2026-06-18 to 2026-07-04, 17 days):
- Pages with impressions: 8 (homepage + 7 blog posts)
- Impression-bearing blog posts: becoming-gp-partner, buying-into-gp-partnership, nhs-pension-scheme-pays, gp-partnership-mutual-assessment, gp-partner-vs-salaried, gp-accounting-guide, gp-limited-company

Note: `gp-accounting-guide` appears in GSC (impressions data) and also in the `canonicalised_away` bucket (phantom user canonical, Google overrode to correct canonical). Its GSC impressions confirm it is effectively indexed — the `canonicalised_away` bucket label is a technical artifact of gc != uc, not an indexing failure.

---

## 6. Sitemap sanity

**Live sitemap fetch:** GET https://www.medicalaccounts.co.uk/sitemap.xml → **HTTP 200 OK**, standard XML sitemap (not a sitemap index). 112 unique page URLs confirmed. (The WebFetch tool reported "128" due to counting hreflang `<xhtml:link>` alternate entries; raw `<loc>` count = 112.)

**GSC Sitemaps API (sc-domain:medicalaccounts.co.uk):**

| Field | Value |
|-------|-------|
| path | https://www.medicalaccounts.co.uk/sitemap.xml |
| lastSubmitted | 2026-06-03T15:05:04Z |
| lastDownloaded | **2026-06-04T15:31:36Z** |
| isPending | false |
| warnings | 0 |
| errors | 0 |
| submitted (URL count when downloaded) | 97 |
| indexed (GSC sitemaps panel count) | **0** |

**Two significant signals:**

1. **Google has not re-fetched the sitemap in 32 days** (last downloaded 2026-06-04, today is 2026-07-06). This is consistent with a near-zero crawl budget site — Google downloaded it once on discovery, logged 97 URLs, then moved on. The 15 URLs added to the sitemap since then (calculators/*, medical-guides/*) are invisible to Google.

2. **"indexed: 0" in GSC sitemaps panel.** This is a known GSC display artefact for domain properties (sc-domain:) where the panel count often shows 0 even when pages are indexed. The URL Inspection API (which confirms 6 pages indexed) is the ground truth. Do not treat "indexed: 0" as a signal of complete failure — treat it as an unreliable metric for this property type.

The "97 submitted" count confirms the sitemap had 97 URLs when Google fetched it on 2026-06-04. Current sitemap has 112 URLs (+15 since then).

---

## 7. lastCrawlTime distribution for indexed pages

All 6 indexed pages show recent crawl activity (June 2026), confirming Google's crawl engine is alive and pages fetch correctly.

| Page | Last crawl | Notes |
|------|-----------|-------|
| Homepage | 2026-06-29 | Most recently crawled; re-crawl cadence improving |
| /blog/becoming-gp-partner | 2026-06-28 | Post-canonical-fix discovery |
| /blog/gp-limited-company | 2026-06-28 | Post-canonical-fix discovery |
| /blog/gp-partner-vs-salaried | 2026-06-24 | Post-canonical-fix discovery |
| /blog/buying-into-gp-partnership | 2026-06-03 | IndexNow day (earliest discovery) |
| /blog/nhs-pension-scheme-pays | 2026-06-03 | IndexNow day (earliest discovery) |

The 2 June 3 pages were discovered via IndexNow submission. The 3 late-June pages appeared after the 2026-06-17 canonical fix, when Google re-evaluated the blog. The homepage is being crawled regularly (June 29 = 1 week ago). All indexed pages have healthy fetch states (SUCCESSFUL, no mobile/rich-result issues).

Canonicalised_away (phantom residue):
- gp-accounting-guide: last crawl 2026-06-01 (2 days before IndexNow, pre-fix)
- locum-doctor-self-assessment-filing-guide: last crawl 2026-05-11 (oldest crawl on site; not re-evaluated since the fix)

Crawled_not_indexed:
- gp-partnership-mutual-assessment-period-what-to-check: crawled 2026-06-28 (recent), Google chose not to index despite successful fetch. Possible reasons: thin/duplicate content signal, or normal churn in Google's indexing queue (it has GSC impressions, so it was previously indexed — may be a temporary deindex).

---

## 8. Inlink depth vs not-indexed buckets (B3.7 folded in)

Blog posts that ARE indexed (5) all appear in GSC with impressions, confirming they were discovered via:
1. Direct IndexNow submission (2 posts, June 3)
2. Sitemap + canonical-fix re-evaluation (3 posts, late June)

Blog posts that are NOT indexed (65 unknown, 1 crawled_not_indexed) share the same site architecture as the 5 that ARE indexed — same template, same breadcrumb schema (Breadcrumbs rich result on all 5 indexed posts), same internal link depth. There is no structural difference between indexed and unknown blog posts. The unknown posts are not discovered because Google has not crawled them — not because of any on-page quality or depth issue.

Core pages (/services, /about, /contact, /nhs-pension) are one click from the homepage. Homepage is indexed and crawled (June 29). Despite this direct link, these core pages remain unknown. This is the strongest evidence for a crawl-budget problem: Google fetched the homepage but did not follow its outbound links.

No rich result errors or mobile usability issues observed on any indexed page.

---

## Summary: Diagnosis

| Question | Answer |
|----------|--------|
| Index absence or suppression? | **Absence** — 103/112 "unknown to Google", zero suppression signals |
| Which surfaces? | **All non-blog surfaces (100%)** + 89% of blog posts |
| Primary mechanism | **Discovery failure** — Google has not crawled these URLs (low crawl budget, young domain) |
| Contributing factor 1 | Phantom-canonical bug pre-Jun 17: 46 posts canonicalling to dead domain may have reduced crawl priority |
| Contributing factor 2 | GSC sitemap not re-fetched in 32 days: Google is not actively monitoring this sitemap |
| Contributing factor 3 | 2 blog posts still have phantom user canonicals (incomplete Jun 17 fix) — fix needed |
| Bing contrast | Bing: 38/112 indexed (34%) vs Google: 6/112 (5.4%) — site is accessible, Google-specific problem |
| Blog IndexNow (Jun 3) | Bing: 29/73 blog posts confirmed indexed; Google: 5/73 confirmed indexed |
| Urgency | HIGH — 92% of the site is invisible to Google; every content and CRO investment is suppressed by this |

**Recommended fixes (for Opus synthesis in P4, owner-gated in P5):**
1. Fix phantom canonicals on 2 residual blog posts (gp-accounting-guide, locum-doctor-self-assessment-filing-guide)
2. Re-submit sitemap to GSC to force a fresh download (Google hasn't re-fetched in 32 days)
3. Consider requesting crawl indexing via GSC "Request Indexing" for core pages (/services, /about, /contact, /nhs-pension)
4. Build external inlinks to core pages (authority signal → crawl budget allocation)
5. Internal link audit: ensure homepage and blog posts link to core pages clearly (crawl path optimization)
6. Monitor new pages (/calculators/*, /medical-guides/*) for discovery — IndexNow re-submission for these URLs post-deploy

---

## Internal linking vs index state

**Battery step B7.** Artifact: `.cache/medical_diag/inlink_correlation.json` (generated 2026-07-06).
Flat-link audit: `python scripts/medical_flat_link_audit.py --site medical` — **HARD 404 ISSUES: 0** (73 posts, 8 categories, 18 top-routes, 5 locations all resolve correctly).

**DATA-TRUST HEADER:** GSC data window 2026-04-01 to 2026-07-04. Analysis covers all 112 sitemap URLs against 73 parsed blog posts + source code scan.

---

### Methodology

Inbound link counts were computed across five source types:

- **Nav** (global, on every page): /services, /medical-guides, /free-practice-health-check, /about, /blog, /contact (6 links, present on all 112 pages)
- **Footer** (global, on every page): /for-gps, /for-consultants, /for-locum-doctors, /for-junior-doctors, /medical-guides, /nhs-pension, /calculators, /locations, /privacy-policy, /terms, /cookie-policy (11 links, present on all 112 pages)
- **Homepage editorial**: /contact, /free-practice-health-check, /for-gps, /for-consultants, /for-locum-doctors, /blog, /medical-guides, 3 featured blog posts (/blog/nhs-pension-annual-allowance-complete-guide, /blog/locum-doctor-tax-complete-guide, /blog/medical-practice-incorporation-step-by-step)
- **Blog index (/blog)**: all 8 static category hubs (server-rendered) + all 73 posts via BlogListWithSearch (client-side pagination: first 12 posts visible in initial HTML; remaining 61 require JS execution)
- **Blog category pages**: each static hub links to all posts in its category (100% coverage confirmed for all 8 hubs)
- **Blog post templates**: up to 3 same-category related posts per post
- **Blog post body HTML**: internal href= links within post content
- **Medical-guides index (/medical-guides)**: all 6 guide child pages + /for-gps, /for-consultants, /for-locum-doctors, /for-junior-doctors, /contact, /free-practice-health-check

"Editorial inlinks" = all sources excluding nav and footer (i.e., sources a crawler must explicitly follow through page content).

---

### 1. Inbound link distribution by index bucket

| Bucket | URL count | Median editorial inlinks | Mean editorial inlinks | Min | Max |
|--------|-----------|--------------------------|------------------------|-----|-----|
| **indexed_self_canonical** | 6 | 27.0 | 22.7 | 0 | 35 |
| **crawled_not_indexed** | 1 | 4 | 4 | 4 | 4 |
| **canonicalised_away** | 2 | 13.5 | 13.5 | 11 | 16 |
| **unknown_to_google** | 103 | 6 | 10.5 | 0 | 63 |

The median for `indexed_self_canonical` (27) is 4.5x higher than `unknown_to_google` (6), but this is **correlation driven by IndexNow and canonical-fix re-evaluation, not by link quantity**. The 5 post-canonical-fix indexed posts had elevated link counts before they were discovered. The mechanism that indexed them was the canonical fix (Jun 17) and IndexNow submission (Jun 3), not Google following links into them.

---

### 2. Well-linked pages still unknown to Google

**70 of 103 unknown pages have 3 or more editorial inlinks.** Key examples:

| URL | Editorial inlinks | Bucket |
|-----|-------------------|--------|
| /contact | 63 | unknown_to_google |
| /blog/gp-partnership-tax-complete-guide | 51 | unknown_to_google |
| /blog/nhs-pension-annual-allowance-complete-guide | 44 | unknown_to_google |
| /for-gps | 28 | unknown_to_google |
| /blog/locum-doctor-ir35-what-you-need-to-know | 28 | unknown_to_google |
| /blog/gp-pension-contributions-tax-relief | 31 | unknown_to_google |
| /blog/can-gp-practice-goodwill-be-sold-nhs-rules | 35 | unknown_to_google |
| /services | 17 | unknown_to_google |

/contact has more editorial inlinks (63) than ANY of the 6 indexed pages. The homepage explicitly links to /contact, /for-gps, /blog, /medical-guides, and 3 featured blog posts in its body — **all of them are "unknown to Google"**. Google crawled the homepage (last crawl 2026-06-29) but did not follow a single outbound link. This is the diagnostic signature of near-zero crawl budget, not an internal linking deficiency.

**Verdict: Poor internal linking does NOT explain the never-discovered pages.** Well-linked pages are also unknown. The cause is crawl budget, not link structure.

---

### 3. Orphans (0 editorial inlinks)

13 URLs have zero editorial inlinks (navigation and footer links excluded):

| URL | Bucket | Click depth | Note |
|-----|--------|-------------|------|
| / (homepage) | indexed_self_canonical | n/a | Root; no in-site editorial links needed; already indexed |
| /locations | unknown_to_google | 1 | Footer only; no blog content links to it |
| /privacy-policy | unknown_to_google | 1 | Footer only |
| /terms | unknown_to_google | 1 | Footer only |
| /cookie-policy | unknown_to_google | 1 | Footer only |
| /calculators/nhs-pension-annual-allowance | unknown_to_google | 2 | New (shipped 2026-07-05); no blog post links to it |
| /calculators/locum-tax-calculator | unknown_to_google | 2 | New (shipped 2026-07-05); no blog post links to it |
| /calculators/private-practice-incorporation | unknown_to_google | 2 | New (shipped 2026-07-05); no blog post links to it |
| /locations/london | unknown_to_google | 2 | No blog post or body content links here |
| /locations/manchester | unknown_to_google | 2 | No blog post or body content links here |
| /locations/birmingham | unknown_to_google | 2 | No blog post or body content links here |
| /locations/leeds | unknown_to_google | 2 | No blog post or body content links here |
| /locations/bristol | unknown_to_google | 2 | No blog post or body content links here |

The homepage orphan status is expected and harmless. The policy pages (/privacy-policy, /terms, /cookie-policy) and /locations are footer-only and their discovery absence is consistent with crawl budget not being spent on utility pages.

**Structurally important orphans: the 3 calculator child pages and 5 location child pages.** These have no editorial links from blog content, meaning even if Google eventually crawls the /calculators or /locations hub, it still needs to follow one more hop to reach them. Adding editorial links to these from relevant blog posts would strengthen their discovery path.

---

### 4. Near-orphans (1 editorial inlink)

14 URLs have exactly 1 editorial inlink:

| URL | Bucket | Sole editorial source |
|-----|--------|-----------------------|
| /calculators | unknown_to_google | /blog/accountant-accounting-services (body link) |
| /about | unknown_to_google | /blog/gp-accounting-software (body link) |
| /blog | unknown_to_google | / (homepage body) |
| /for-junior-doctors | unknown_to_google | /medical-guides (page body) |
| /blog/gp-accountant-services | unknown_to_google | /blog (category section) |
| /blog/locum-tax | unknown_to_google | /blog (category section) |
| /blog/incorporation-and-company-structures | unknown_to_google | /blog (category section) |
| /blog/medical-expenses | unknown_to_google | /blog (category section) |
| /medical-guides/nhs-pension-annual-allowance | unknown_to_google | /medical-guides (page body) |
| /medical-guides/consultant-private-practice-tax | unknown_to_google | /medical-guides (page body) |
| /medical-guides/gp-partnership-accounts | unknown_to_google | /medical-guides (page body) |
| /medical-guides/locum-limited-company-vs-umbrella | unknown_to_google | /medical-guides (page body) |
| /medical-guides/medical-expenses-tax-treatment | unknown_to_google | /medical-guides (page body) |
| /medical-guides/ir35-for-locums | unknown_to_google | /medical-guides (page body) |

Critical observation: the 4 blog category hubs with only 1 editorial source (from /blog) are near-orphans. The other 4 category hubs (/blog/gp-practice-management 13, /blog/gp-tax-and-accounts 11, /blog/nhs-pension-planning 4, /blog/private-practice 2+) have more editorial inlinks from cross-linking blog post bodies.

The 6 medical-guide child pages each have only 1 editorial inlink (from the /medical-guides hub). Since /medical-guides is itself unknown to Google, these child pages depend entirely on /medical-guides being discovered first — a single-point-of-failure chain.

---

### 5. Category listing reachability

All 8 static category hubs link to 100% of their posts. No posts are stranded behind missing category pages.

| Category hub | Posts in category | Linked from hub |
|--------------|-------------------|-----------------|
| /blog/gp-practice-management | 20 | 20/20 (100%) |
| /blog/gp-accountant-services | 16 | 16/16 (100%) |
| /blog/gp-tax-and-accounts | 16 | 16/16 (100%) |
| /blog/nhs-pension-planning | 8 | 8/8 (100%) |
| /blog/locum-tax | 6 | 6/6 (100%) |
| /blog/incorporation-and-company-structures | 4 | 4/4 (100%) |
| /blog/private-practice | 2 | 2/2 (100%) |
| /blog/medical-expenses | 1 | 1/1 (100%) |

No posts are orphaned from their category. One category exists in post frontmatter with no static hub page: "Consultant Tax" posts route through the dynamic /blog/[slug] handler directly (no /blog/consultant-tax hub page). Those posts are accessible only via the blog index (BlogListWithSearch) or related-posts cross-links.

---

### 6. Click depth from homepage

All 112 sitemap URLs are reachable within 2 clicks from the homepage via nav/footer:

| Click depth | Page count |
|-------------|------------|
| 1 | 19 (nav + footer + homepage editorial links) |
| 2 | 92 (blog posts, category hubs, location pages, calculator pages, guide pages — all reachable via a depth-1 hub) |

No page requires more than 2 clicks from the homepage through nav/footer channels. The site architecture is flat and correct. This confirms that click depth is NOT a blocking factor for discovery.

---

### 7. Verdict: internal linking is not the root cause

**Poor internal linking does not explain the never-discovered pages.**

Evidence summary:
1. **70 of 103 unknown pages have 3+ editorial inlinks** — these are not orphans, they are well-connected.
2. **/contact (63 editorial inlinks) and /blog/gp-partnership-tax-complete-guide (51 editorial inlinks) are "unknown to Google"** — more internally linked than any indexed page.
3. **Homepage explicitly links to /blog, /contact, /medical-guides, and 3 featured posts** — Google crawled the homepage on 2026-06-29 but followed none of these outbound links.
4. **All pages are within 2 clicks of the homepage** via nav/footer — depth is not the barrier.
5. **Category hubs link to 100% of their posts** — no structural gaps in the category → post chain.

The true bottleneck is the crawl budget decision upstream: Google has allocated near-zero crawl budget to this young domain. Until more crawl budget is earned (via external authority signals, IndexNow pings, or manual GSC indexing requests), even well-linked pages will remain undiscovered.

**Where internal linking does create a compounding risk:**
- **Calculator and location child pages** (8 pages) have 0 editorial inlinks. They depend entirely on the /calculators and /locations hubs being crawled first, then followed. Adding body links from relevant blog posts (e.g., the locum tax posts linking to /calculators/locum-tax-calculator) would create a direct one-hop discovery path once any blog post is indexed.
- **The blog index (/blog) has only 1 editorial inlink** (from the homepage body). It's also in the nav, but for a low-budget crawler that already has the homepage, the nav link to /blog provides one more reason to re-crawl /blog. The BlogListWithSearch component renders only the first 12 posts in initial HTML (client-side pagination); the remaining 61 posts depend on Google executing JavaScript or on being discovered via the category hubs.

**Sitemap vs crawl-budget is the primary lever**: the sitemap has not been re-fetched in 32 days. Re-submitting it + using IndexNow for new pages will accelerate discovery faster than any internal linking change.
