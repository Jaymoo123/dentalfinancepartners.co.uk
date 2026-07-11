# Topic pool — Crypto traders & investors (R3)

Date: 2026-07-11 (rebuilt late evening with DFS data). Machine-readable pool:
`topic_pool_final.json` (**1,418 page-level clusters over 2,064 keywords**; every cluster
carries sources, members, volume/KD/CPC where measured). **Volumes/KD/CPC MEASURED**: the
paid DataForSEO pulls ran late 2026-07-11 ($0.4210, guard lifted by owner ruling for
interactive runs); `s5_pool_build.py` + `s5b_finalise.py` re-run merged
`raw/dfs_keyword_suggestions.json` (621 rows), `raw/dfs_ranked_keywords.json` (811 rows,
4 rivals) and `raw/dfs_head_volumes.json` (26 head/calculator terms). **470 kept keywords
now carry measured volume; 272 clusters have volume.**

## Derivation (honest accounting)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (810 queries: seeds × a-z + question stems, free) | 1,653 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (14 crawled domains: 12 dedicated rivals + recap.io + countdefi.com; 4,188 URLs) | slug-topics, 3+ words, scope-gated | `raw/rival_sitemaps.json` |
| DataForSEO sources (paid pulls, late 2026-07-11, $0.4210) | 1,458 rows: suggestions 621 (8 seeds) + ranked_keywords 811 (4 rivals) + head volumes 26 | `raw/dfs_*.json` |
| **Union after scope + junk regex filter** | **2,699** (was 1,989 pre-DFS) | s5 `collect_pool()` |
| Estate dedup, exact-normalised (HARD GATE) | −1 | vs 7,905 estate titles (all sitemap slugs in `own_estate_exclusion.json` + 2,035 Supabase blog_topics rows in `raw/estate_blog_topics.json`) |
| Estate dedup, fuzzy ≥0.90 | −0 | |
| Borderline 0.78-0.90 | 223 kept, flagged (139 original all reviewed at s5b; 59 new DFS-sourced pairs spot-checked, identical cross-niche sorted-token false-positive pattern, e.g. "crypto accountant leeds" ↔ "gp accountant leeds") — no restores, no drops | |
| Intra-pool normalised dedup | −533 | word-order/stopword variants collapsed |
| **Kept** (`topic_pool.json`) | **2,165** (470 with measured volume) | |
| s5b judged junk sweep (non-UK geo leaks, job/salary, exchange-support noise) | −101 | `junk_terms` listed in topic_pool_final.json |
| **Final keyword pool** | **2,064** | |
| **Page-level clusters** (difflib ≥0.85 greedy) | **1,418** (272 with volume) | `topic_pool_final.json` |

Realistic writer-ready estimate: the 1,418 clusters still contain SERP-level near-duplicates
that only SERP-overlap data can merge (the clustering is lexical, not SERP-based), and the
DFS additions skew DIY/software-adjacent — treat **~500-800 distinct pages** as the working
range (unchanged; the new volume data confirms most added head terms are software-owned DIY
surface, not extra page targets). Per the
gap-discovery lesson (47% cumulative dupe rate), **page-level verify against the live estate
remains mandatory at write time** for every topic pulled from this pool.

## The estate-collision finding (opposite of hospitality)

Crypto is the cleanest estate fit yet measured: **1 exact drop, 0 fuzzy drops** out of 2,699
(hospitality lost 31; gap discovery ran a 47% cumulative dupe rate). The single exact drop is
"bed and breakfasting" (the property blog owns the generic slug); crypto-specific variants
("bed and breakfast rule crypto" etc.) stay in the pool as distinct-audience topics. The known
collision surface is property's CGT content — the 139 original borderline pairs were reviewed
at s5b and the 59 new DFS-sourced pairs spot-checked, all cross-niche false positives. No
owner cannibalisation call is needed for this niche
(contrast: hospitality's head terms are blocked on a generalist-site decision).

## Intent shape (autocomplete evidence + measured DFS volumes, 2026-07-11)

Measured headline figures: "koinly" 6,600/mo KD 11 and "crypto tax calculator" 1,000/mo KD 22
confirm the software-owned DIY head; the paying lane is low-volume/high-CPC — "crypto tax
accountant uk" 110/mo KD 0 CPC £11.61, disclosure family ("voluntary disclosure hmrc" 590/mo
KD 0, "hmrc worldwide disclosure facility" 390/mo KD 12 CPC £14.73, "hmrc nudge letter"
210/mo CPC £12.22, "hmrc cryptocurrency information sharing" 480/mo KD 13), "day trader tax
uk" 170/mo KD 0. "koinly accountant" 10/mo confirms reconciliation is thin-but-exclusive.

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
their footprint LANDED via the ranked_keywords paid pull (811 rows over mycryptotax.co.uk,
uk.andersen.com, crypto-tax-accountant.co.uk, koinly.io; 294 kept terms carry the
`ranked_keywords` source).
