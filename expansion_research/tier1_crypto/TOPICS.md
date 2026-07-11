# Topic pool — Crypto traders & investors (R3)

Date: 2026-07-11. Machine-readable pool: `topic_pool_final.json` (1,219 page-level clusters
over 1,675 keywords; every cluster carries sources and members). **No volumes/KD in this run**
— the daily DataForSEO guard was exhausted before this task started and was NOT raised
(hard rule); volume fields are null and populate automatically when the DOSSIER "TODO — paid
pulls" tasks run (`s5_pool_build.py` + `s5b_finalise.py` re-run merges dfs_*.json).

## Derivation (honest accounting)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (810 queries: seeds × a-z + question stems, free) | 1,653 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (14 crawled domains: 12 dedicated rivals + recap.io + countdefi.com; 4,188 URLs) | slug-topics, 3+ words, scope-gated | `raw/rival_sitemaps.json` |
| DataForSEO sources | **0 rows ($0 — zero-paid-call constraint)** | deferred to TODO — paid pulls |
| **Union after scope + junk regex filter** | **1,989** | s5 `collect_pool()` |
| Estate dedup, exact-normalised (HARD GATE) | −1 | vs 7,905 estate titles (all sitemap slugs in `own_estate_exclusion.json` + 2,035 Supabase blog_topics rows in `raw/estate_blog_topics.json`) |
| Estate dedup, fuzzy ≥0.90 | −0 | |
| Borderline 0.78-0.90 | 139 kept, flagged; ALL reviewed at s5b | every one a cross-niche sorted-token false positive (e.g. "crypto accountant manchester" ↔ "gp accountant manchester") — no restores, no further drops |
| Intra-pool normalised dedup | −216 | word-order/stopword variants collapsed |
| **Kept** (`topic_pool.json`) | **1,772** | |
| s5b judged junk sweep (non-UK geo leaks, job/salary, exchange-support noise) | −97 | `junk_terms` listed in topic_pool_final.json |
| **Final keyword pool** | **1,675** (973 autocomplete-only + 670 sitemap-only + 32 both) | |
| **Page-level clusters** (difflib ≥0.85 greedy) | **1,219** | `topic_pool_final.json` |

Realistic writer-ready estimate: the 1,219 clusters still contain SERP-level near-duplicates
that only volume/SERP-overlap data can merge (the clustering is lexical, not SERP-based) —
treat **~500-800 distinct pages** as the working range until the paid pulls land. Per the
gap-discovery lesson (47% cumulative dupe rate), **page-level verify against the live estate
remains mandatory at write time** for every topic pulled from this pool.

## The estate-collision finding (opposite of hospitality)

Crypto is the cleanest estate fit yet measured: **1 exact drop, 0 fuzzy drops** out of 1,989
(hospitality lost 31; gap discovery ran a 47% cumulative dupe rate). The single exact drop is
"bed and breakfasting" (the property blog owns the generic slug); crypto-specific variants
("bed and breakfast rule crypto" etc.) stay in the pool as distinct-audience topics. The known
collision surface is property's CGT content — all 139 borderline pairs were reviewed at s5b
and are cross-niche false positives. No owner cannibalisation call is needed for this niche
(contrast: hospitality's head terms are blocked on a generalist-site decision).

## Intent shape (from autocomplete evidence; volumes pending)

- **HIRE**: "crypto tax accountant uk" family, "accountant for crypto traders", "defi tax
  accountant", "hmrc crypto investigation accountant", "koinly accountant" — the 34 SERP
  queries in `raw/serp_raw.json` all returned real firms, proving commercial SERPs exist.
- **DISTRESS (highest lead value)**: nudge letter, voluntary disclosure, undeclared gains,
  "hmrc know about my crypto", lost records — the disclosure cluster is the accountant-seeking
  moment; CARF (first exchange-to-HMRC data report due 31 May 2027, cited in DATA_ASSET.md)
  gives it a built-in growth curve.
- **DIY-INFORMATIONAL (software-shadowed)**: "crypto tax uk", "crypto tax calculator uk",
  rate/allowance questions — Koinly-class software owns these SERPs (COMPETITORS.md); treat as
  authority/GEO fuel and calculator funnel, never the success metric.
- **TRADER-STATUS / adjacent**: "day trader tax uk", forex/CFD/spread-betting clusters (79
  autocomplete rows combined) — feeds the investor-vs-trader checker and widens the site
  beyond crypto without leaving scope.
- 229 "calculator" suggestions in `raw/autocomplete_raw.json` underwrite the calculator fleet
  (CALCULATORS.md).

## Sitemap crawl coverage note

14 domains had crawlable sitemaps (4,188 URLs): 12 of the 22 dedicated rivals, plus recap.io
(software) and countdefi.com (dropped, US) whose 368 URLs still passed the scope gate as
topic fuel. Notable: drpaccountants
2,000 URLs (programmatic), crypto-tax-accountant.co.uk 870, mindyourownbusiness.uk 375,
recap.io 238 (software content moat), mycryptotax.io 187, hashtax.io 113. Blocked/no-sitemap
rivals (mycryptotax.co.uk, koinly.io, cryptoaccountants.live, 7accountants.com et al.) —
their footprint arrives with the ranked_keywords paid pull (see DOSSIER TODO).
