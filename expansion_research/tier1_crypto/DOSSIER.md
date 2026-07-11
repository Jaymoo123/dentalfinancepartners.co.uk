# R3 deep-research dossier — Crypto traders & investors accountancy (Tier-1)

Date: 2026-07-11. Branch: expansion/phase-0. **Run constraint honoured: ZERO DataForSEO calls**
(daily guard exhausted by earlier same-day runs; NOT raised). All findings below are built
from free sources (Serper/DDG SERPs, Google Autocomplete, direct fetches, live web search);
volumes/KD land with the paid pulls listed at the bottom.

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 53 verified rivals (22 DEDICATED + 31 SECTION), evidence quotes, software-layer read, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool_final.json](topic_pool_final.json) | 1,989 raw → 1,772 post-dedup → 1,675 final keywords → 1,219 clusters; volumes pending |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | /for/* audience-hub architecture, 24 pages + 4 tools + 1 asset, queue |
| [CALCULATORS.md](CALCULATORS.md) | 9 candidates, 4 launch-tier; scenario-tools-not-Koinly framing locked |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Crypto Tax Gap & Compliance Index (FCA waves + CARF countdown) — sources verified pullable |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 30 positions, 30/30 citations fetched live (`raw/citation_checks.json`, all HTTP 200, phrase-checked) |
| [r3_call_plan.md](r3_call_plan.md) | Actuals: $0 DataForSEO this run |
| s1-s7 scripts + raw/ | Re-runnable pipeline (adapted from pilot_charities) + all raw evidence |

## Summary

- **Field verdict: CONTESTED, dedicated-brand-saturated.** 22 crypto-only accountancy/tax
  brands verified live (the most DEDICATED of any dossier), 31 real SECTION firms including
  the authority ceiling (Andersen LLP — ex-HMRC cryptoasset policy lead on staff), plus a
  legal flank on disclosure queries. Exact-match domains exhausted. On top: **crypto tax
  software (Koinly joint-top at 17 SERP hits, Recap, CoinLedger...) owns the DIY head SERPs**
  — a layer no other estate niche has.
- **Demand shape (SERP/autocomplete evidence; volumes pending):** hire intent proven by 34/34
  commercial SERPs; the highest-value lane is **distress/disclosure** (nudge letters, CDF,
  undeclared gains) with a hard-dated tailwind — CARF exchange-to-HMRC reporting, first
  reports due 31 May 2027 (gov.uk, fetch-verified). Reconciliation intent ("koinly
  accountant") is accountant-only territory with thin SERPs.
- **Estate fit is the cleanest yet measured**: 1 exact + 0 fuzzy estate-dedup drops out of
  1,989 raw terms (hospitality lost 31; gap-discovery cumulative dupe rate is 47%). Only
  collision surface is property CGT adjacency; all 139 borderline pairs reviewed, all false
  positives. No cannibalisation owner-call is needed for this niche.
- **Sharpest wedges:** HMRC disclosure hub + penalty estimator (no dedicated brand owns it
  end-to-end), software-report reconciliation service, DeFi honest-uncertainty content
  (CRYPTO61000 — most rivals pretend the rules are clean), investor-vs-trader status checker,
  and the Crypto Tax Gap Index (nobody in the verified set publishes a data asset).
- **Quality gap to exploit:** the niche's SEO leaders are thin at scale (drpaccountants 2,000
  programmatic URLs; crypto-tax-accountant.co.uk 870). Gold-standard depth + 30 cited house
  positions beats them on the axis they can't follow.
- Brand shortlist: **NOT in scope this run** (R4 stage, per factory line).

## Spend record

| Item | Cost |
|---|---|
| **DataForSEO** | **$0 (0 calls; guard untouched)** |
| Serper 34 queries (gl=gb) | ~$0.034 (Serper quota) |
| DDG (34), autocomplete (810 requests), 162 domain fetches, 14 sitemap crawls, 30 citation checks, ~10 live web searches (blocked-rival verification) | $0 |

## Open questions (for owner / R4 gate)

1. **Regulated-advice surface**: crypto content sits closer to financial-promotion/advice
   boundaries than other niches — confirm house style keeps everything tax-compliance-framed
   (current HOUSE_POSITIONS draft does).
2. **Forex/day-trader adjacency**: in-pool and in-architecture as one hub lane; decide at
   build whether it stays a lane or is excluded to keep the brand crypto-pure.
3. **Software partnerships** (Koinly/Recap accountant directories): free listings exist; needs
   the Ashfield trading-name + contact-form-only constraints checked before applying.
4. **Index v1 scope**: full per-region model vs CARF-countdown-first (LAUNCH_CORE recommends
   countdown-first).

## TODO — paid pulls (run when the daily DataForSEO guard resets; est. ~$0.60 total)

All via `DataForSEOClient._post_paid` (CostTracker + api_cost_log, site_key NULL), UK
location 2826. Outputs land in `raw/dfs_*.json`; then re-run `s5_pool_build.py` +
`s5b_finalise.py` (volumes merge automatically) and re-rank the LAUNCH_CORE blog queue.

1. **bulk_keyword_difficulty + search_volume** on head terms:
   crypto tax accountant uk · crypto tax accountant · crypto accountant · cryptocurrency
   accountant · crypto tax uk · crypto tax advisor uk · bitcoin accountant uk · defi tax
   accountant uk · nft tax uk · crypto mining tax uk · staking rewards tax uk · hmrc crypto
   disclosure · crypto nudge letter · koinly accountant · day trader tax uk · am i a crypto
   trader hmrc · crypto self assessment · crypto capital gains tax uk.
2. **bulk_keyword_difficulty + search_volume** on per-calculator terms (CALCULATORS.md):
   crypto tax calculator uk · crypto capital gains tax calculator · cgt on crypto calculator ·
   bitcoin mining tax calculator · crypto staking tax calculator · hmrc penalty calculator ·
   day trading tax calculator uk · forex trading tax calculator uk.
3. **keyword_suggestions** (limit 200 each) on 8 seeds: crypto tax uk · crypto accountant ·
   crypto capital gains tax · defi tax · staking tax · crypto hmrc · day trader tax ·
   crypto disclosure.
4. **ranked_keywords** (limit 500 each) on top 3 verified rivals: **mycryptotax.co.uk**
   (17 hits, joint-top), **uk.andersen.com** (11 hits, authority ceiling),
   **crypto-tax-accountant.co.uk** (870-URL content footprint). Optional 4th if budget
   allows: koinly.io — maps the software-owned DIY surface to avoid, not to chase.
