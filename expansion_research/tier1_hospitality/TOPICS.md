# Topic pool — Hospitality (R3)

Date: 2026-07-11. Machine-readable pool: `topic_pool.json` (every term carries sources,
volume/KD where known, intent class, and estate-dedup status).

## Derivation (honest accounting)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (32 seeds × a-z, free) | 2,736 unique suggestions | `raw/autocomplete_raw.json` |
| DFS keyword_suggestions (8 seeds, paid) | 169 rows | `raw/dfs_keyword_suggestions.json` |
| DFS ranked_keywords (paperchase.ac, inn-control.co.uk, tipsandtroncs.co.uk, paid) | 430 rows | `raw/dfs_ranked_keywords.json` |
| Rival sitemap slugs (10 crawlable of 14 attempted; 3,118 URLs) | 86 scope-passing topics | `raw/rival_sitemaps.json` |
| **Union after scope + junk filter** | **2,420** | s5 `collect_pool()` |
| Estate dedup, exact-normalised (HARD GATE) | −7 | vs 5,155 estate titles (all sitemap slugs in `own_estate_exclusion.json` + 2,035 Supabase blog_topics rows) |
| Estate dedup, fuzzy ≥0.90 | −24 | e.g. "pub accountant" ≈ estate topic "accountant for pubs" |
| Borderline 0.78-0.90 | 109 kept, flagged for judgment | listed in topic_pool.json |
| **Kept** | **2,069** | |
| Intent classification (this run): career/job | −65 | "hotel accountant duties", "restaurant accountant salary" |
| non-UK | −39 | brisbane/melbourne/texas variants |
| brand/noise | −150 | "paperchase uk", foreign-language, "pub quiz names" |
| **Usable candidates** | **1,815** (1,567 service/topic + 248 DIY-informational) | |

Realistic writer-ready estimate: **~600-900 distinct pages** after SERP-clustering the term
variants ("number of pubs in the uk" family is one page, not nine). Per the gap-discovery
lesson (47% cumulative dupe rate), **page-level verify against the live estate remains
mandatory at write time** for every topic pulled from this pool.

## The estate-collision finding (needs an owner call)

The exact/fuzzy drops are NOT incidental: the **generalist site (Holloway Davies) already has
4 live hospitality posts** (accountant-for-hotels, accountant-for-restaurants-and-cafes,
hospitality-accountant-restaurant-pub-hotel, hospitality-accountants) targeting exactly the
new site's head terms, and property has a TOMS/aparthotel article. The dedup gate correctly
dropped these terms from the pool — but a dedicated hospitality site cannot launch without its
own head-term pages. Options at build: (a) generalist cedes/301s those posts to the new site,
(b) generalist keeps them and the new site differentiates page intent (service hub vs blog
post). Per the data-gated-consolidation rule this is an owner decision; flagged in DOSSIER.md
open questions. Until decided, the head terms are absent from the countable pool (which is the
honest posture).

## Intent lesson applied (red-team: "tronc" ≠ all buyers)

The tronc cluster (11,730/mo across 36 clean terms) splits:
- **Trustee-of-lead (operator hires)**: "tronc scheme" 170 CPC £18.98, "how to set up a tronc
  scheme" 50 CPC £50.47, "troncmaster" 390, "tronc scheme hmrc" 20. Advertisers pay £19-50 CPC
  here — that is operator money.
- **DIY / staff-side**: "tronc meaning" 1,600, "what is tronc" 1,000, "what is tronc pay" 480,
  "tronc payment" 390 — mostly employees reading payslips. Content-support + calculator
  audience, not lead pages. Do not count these in demand-for-hire.
Same split applied to food VAT (7,990/mo cluster: overwhelmingly DIY, but it is the pre-hire
research moment for takeaway owners) and to hotel terms (150/mo of "hotel accountant" volume
is jobs — excluded).

## What the sub-trades actually measure (Google Ads, this run + R2d)

| Sub-trade | Clean hire-intent head | Notes |
|---|---|---|
| Hospitality (family) | 1,330/mo (hospitality accountant(s) 390+390, hospitality accounting 110…) | CPC £16.58-23.87 |
| Restaurants | 680/mo + R2d 90×4 variants | "restaurant accounting" 260 CPC £26.25 |
| Pubs | 420/mo | 140×3, CPC £21.53; plus huge pub-data DIY cluster (asset fuel) |
| Hotels | 700/mo minus 150 career = ~550 | "hotel accounting" CPC £38.55 |
| Takeaways | head terms return null volume (R2d + this run) | demand is real but long-tail/VAT-led; SERPs still full of firms with takeaway pages — enter via food-VAT cluster |
| Cafes/caterers | ~10/mo measured | thinnest field per COMPETITORS.md — content hub, not a demand leg |
| Tronc | 630/mo operator-side (+11k DIY) | calculator wedge |
| TOMS | 300/mo | zero interactive competition |
| Food VAT | 7,990/mo DIY cluster | top-of-funnel + VAT checker tool |

## Sitemap crawl coverage note

paperchase.ac, thehospitalityaccountants.com, solutions4caterers.co.uk, merrantiaccounting.com
had no crawlable sitemap (bot-blocked or none); their keyword footprint was captured via the
paid ranked_keywords pull (paperchase) and SERP hits instead. savure.co.uk's 2,000 URLs are
programmatic location pages — scope filter kept only 3-word+ meaningful slugs.
