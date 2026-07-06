# Google Read — medicalaccounts.co.uk (B1 battery step)

**DATA-TRUST HEADER:** GSC data exists ONLY 2026-04-01 to 2026-07-04. API-confirmed EMPTY before April 2026 — site young, NOT an auth artifact. Window definitions: pre = Apr 1–May 19 (49d, **thin — indicative only**); mig = May 20–Jun 17 (29d, all 46 legacy post canonicals pointed at phantom domain medicalaccountantsuk.co.uk); post = Jun 18–Jul 4 (17d, clean canonicals). **Windows have very different lengths — all rate comparisons normalise by day.**

Raw artifact: `.cache/medical_diag/google_segments.json`

---

## 1. Window-normalised totals

The raw impression totals decline across windows (1540 → 1034 → 942) only because post is 17 days vs pre's 49 days. Normalised:

| Window | Days | Impr/day | Clicks/day | CTR | Imp-wt position | Distinct pages |
|--------|------|----------|------------|-----|-----------------|----------------|
| pre    | 49   | 31.4     | 0.12       | 0.39% | 43.2         | 7              |
| mig    | 29   | 35.7     | 0.34       | 0.97% | 39.3         | 9              |
| post   | 17   | **55.4** | **0.65**   | 1.17% | **32.6**     | 8              |

Source: `gsc_page_performance` (niche='medical').

**Impressions per day accelerated 77% from pre to post.** Clicks per day increased fivefold (0.12 → 0.65). CTR improved threefold. Position improved steadily from 43.2 through 39.3 to 32.6. **On page-level aggregates there is no injury signal — the trajectory is uniformly improving.**

The `gsc_query_data` view tells a different story on position: 55.1 → 63.3 → 58.6. This table captures the head-term "gp accountants" separately from the blog posts and that head term pulled the query-weighted position down during mig. See section 3 below.

---

## 2. Head-family queries

These six families cover the primary commercial intent the site competes for. None has ever received a click. All sit 40–85 positions deep. The data uses `gsc_query_data`.

| Query | pre pos | mig pos | post pos | Total impr |
|-------|---------|---------|----------|-----------|
| gp accountants | 47.0 | **63.3** | 58.9 | 1,311 |
| medical accountants uk | 69.4 | 72.5 | **61.3** | 214 |
| gp practice accountants | 82.8 | 80.9 | 80.2 | 130 |
| gp accountant | 57.8 | 69.4 | **60.3** | 91 |
| specialist medical accountants | 85.0 | 82.0 | **65.5** | 65 |
| (no locum accountant impressions in mig/post) | — | — | — | — |

"gp accountants" (the volume leader at 1,311 total impressions, 60% of all query-view impressions) shows the injury most clearly: position dropped 16 ranks during mig (47 → 63), with partial recovery to 59 in post. The recovery direction is confirmed but the term is still 50+ positions from click-through range (position ~1–5 for head commercial terms). Zero clicks on all head terms across the entire GSC history.

"accounting for gp partners" (pre 25.1, mig 43.3, post 60.2) is the one query that worsened monotonically — worth flagging for synthesis.

---

## 3. Paired mig-to-post position delta (page level)

8 pages appeared in both mig and post windows. Source: `gsc_page_performance`.

**Summary: median delta -3.65 positions; impression-weighted mean delta -5.16 positions; 7 of 8 pages improved.**

| Page (path) | mig pos | post pos | delta | mig impr | post impr |
|-------------|---------|----------|-------|----------|-----------|
| /blog/gp-accounting-guide | 26.0 | 12.8 | **-13.2** | 21 | 23 |
| /blog/nhs-pension-scheme-pays-doctors-deadlines | 19.6 | 10.8 | **-8.8** | 53 | 34 |
| / (homepage) | 64.4 | 56.7 | -7.7 | 540 | 450 |
| /blog/gp-partnership-mutual-assessment-period-what-to-check | 8.5 | 4.8 | -3.7 | 27 | 30 |
| /blog/gp-limited-company-tax-benefits-drawbacks | 7.8 | 4.2 | -3.6 | 41 | 12 |
| /blog/becoming-gp-partner-financial-implications | 14.3 | 11.4 | -2.9 | 160 | 294 |
| /blog/gp-partner-vs-salaried-gp-tax-comparison | 8.5 | 7.7 | -0.8 | 32 | 29 |
| /blog/buying-into-gp-partnership-capital-parity-explained | 7.2 | 10.6 | **+3.3** | 154 | 70 |

Negative delta = improved position. The canonical fix (2026-06-17) is the plausible cause of the broad improvement. The one worsener (buying-into-gp-partnership, +3.3) is modest and may be normal position variance; its impression volume halved in post, suggesting it is seeing volatility rather than structural decline.

### Survivorship dropouts (pages with pre/mig impressions but zero in post)

| Page | pre impr | mig impr | post impr |
|------|----------|----------|-----------|
| /blog/locum-doctor-self-assessment-filing-guide | 24 | 6 | 0 |
| https://medicalaccounts.co.uk/ (non-www) | 11 | 0 | 0 |

The locum page is notable: it ranked at position 11.8 in pre and 8.8 in mig (page_perf view), then vanished in post. This warrants a check in the index coverage sweep (B3) — it may have been de-indexed or lost its canonical post-fix. The non-www bare domain disappearing is expected (www is the canonical).

---

## 4. Top pages and top queries

### Top 10 pages by total GSC impressions (gsc_page_performance)

| Page | Total impr | Total clicks | pre pos | mig pos | post pos |
|------|-----------|-------------|---------|---------|----------|
| / (homepage) | 2,137 | 4 | 52.9 | 64.4 | 56.7 |
| /blog/becoming-gp-partner-financial-implications | 533 | **16** | 10.8 | 14.3 | 11.4 |
| /blog/buying-into-gp-partnership-capital-parity-explained | 224 | 2 | — | 7.2 | 10.6 |
| /blog/gp-accounting-guide | 175 | 1 | 22.0 | 26.0 | **12.8** |
| /blog/gp-partner-vs-salaried-gp-tax-comparison | 171 | 0 | 7.5 | 8.5 | 7.7 |
| /blog/gp-limited-company-tax-benefits-drawbacks | 91 | 2 | 6.3 | 7.8 | **4.2** |
| /blog/nhs-pension-scheme-pays-doctors-deadlines | 87 | 1 | — | 19.6 | **10.8** |
| /blog/gp-partnership-mutual-assessment-period-what-to-check | 57 | 1 | — | 8.5 | **4.8** |
| /blog/locum-doctor-self-assessment-filing-guide | 30 | 0 | 11.8 | 8.8 | — |
| https://medicalaccounts.co.uk/ (non-www) | 11 | 0 | 66.7 | — | — |

The homepage (2,137 impressions, 4 clicks) sits at position 52-64 — deep in non-click territory. It dominates the impression count but contributes almost nothing to clicks. Blog posts carry all the clicks: the single post "becoming-gp-partner" accounts for 16 of 27 total clicks estate-wide (59% of all clicks from 5% of pages). "gp-partner-vs-salaried-gp" sits at position 7.5-8.5 across all windows with 171 impressions but zero clicks — a zero-click SERP candidate (likely AI-featured snippet capture) rather than a ranking failure.

### Top 5 queries by impressions (gsc_query_data)

| Query | Total impr | pre pos | mig pos | post pos |
|-------|-----------|---------|---------|----------|
| gp accountants | 1,311 | 47.0 | 63.3 | 58.9 |
| medical accountants uk | 214 | 69.4 | 72.5 | 61.3 |
| gp practice accountants | 130 | 82.8 | 80.9 | 80.2 |
| gp accountant | 91 | 57.8 | 69.4 | 60.3 |
| specialist medical accountants | 65 | 85.0 | 82.0 | 65.5 |

"gp accountants" alone is 60% of all query-view impressions. Its mig-window position drop (47 → 63) is the primary signal of phantom-canonical injury. Post recovery is partial (58.9). The site needs this term below position 10 to generate meaningful organic traffic.

---

## 5. Zero-click surface

10 queries at impression-weighted position <=20 with 0 total clicks across the whole window. These hold only **24 impressions** combined — a trivially small surface. The most meaningful entry: "gp partnership goodwill valuation" (14 impressions, position 14.8) — a legitimate long-tail term where GSC's position reporting suggests a page-1 appearance but no click materialised. May be a featured-snippet/AI-answer capture or a thin SERP with very low query volume. Not a priority fix relative to the deep-position problem on the homepage and head terms.

---

## 6. Overall verdict: youth or injury?

**The shape is predominantly YOUTH with a confirmed secondary mig-window injury, now recovering.**

Evidence for youth (dominant signal):
- All commercial head terms ("gp accountants", "medical accountant%", etc.) sit at positions 47–85 throughout the entire GSC history, including pre. There was no period of high-position ranking that then collapsed. This is a site that has never broken through to the first page on its primary terms.
- Only 10 pages have ever earned GSC impressions. The site is thin in Google's view.
- Estate-wide impression-weighted position is improving continuously (43 → 39 → 33). Daily impression rate is accelerating (31 → 36 → 55/day). This is a growing-authority trajectory, not a post-penalty recovery.

Evidence for mig-window injury (real but secondary):
- "gp accountants" dropped 16 positions during mig (47 → 63), recovered 4 positions post-fix (→ 59). The drop coincides exactly with the 46-post phantom-canonical period.
- Query-view impression-weighted position worsened during mig (55 → 63) before recovering (→ 59).
- 7 of 8 pages improved position mig→post (median -3.65 positions, imp-weighted mean -5.16 positions). This is not noise — it is a consistent directional signal across the estate.
- The post window is only 17 days. Full phantom-canonical recovery from Google typically takes 4–12 weeks. The partial recovery seen here is consistent with the fix being recent.

**Thin-pre-window caveat (state explicitly):** The pre window is 49 days and the site earned zero impressions before April 1. This means: (a) we have no "healthy baseline" before the phantom-canonical damage occurred, so we cannot prove the injury pushed the site below an otherwise higher pre-fix position; (b) all pre-window data is from a site that may have already been partially affected (the earliest legacy posts may have been published with the wrong canonical from day one). The mig-vs-post comparison is the most reliable injury signal available.

**What is NOT visible in Google data:** Index coverage (B3 will quantify how many of the 112 sitemap pages are actually indexed — the smoke test found /services, /about unknown to Google). If the index absence generalises, the ranking signal is suppressed by a structural crawl/indexing failure, not just by phantom canonicals. Google read alone cannot resolve this.
