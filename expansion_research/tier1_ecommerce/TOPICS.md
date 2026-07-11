# Topic pool — Ecommerce / Amazon sellers (R3)

Date: 2026-07-12. Machine-readable pools: `topic_pool.json` (raw + dedup evidence) and
`topic_pool_final.json` (judged final pool + page-level clusters). **Volumes/KD/CPC now
joined** (paid pulls run 2026-07-12 manager-direct, measured $0.3677 — see DOSSIER.md
"DONE — paid pulls"): 72 pool keywords matched against the 1,570 distinct DFS rows
(suggestions × 9 seeds + ranked × 4 rivals), 50 of 2,329 clusters carry a measured volume,
and clustering is now seeded volume-desc (crypto/care s5b pattern). The low match rate is
expected: the DFS rows are seed-expansion + rival-ranked surfaces, mostly outside the
autocomplete/sitemap pool; unmatched clusters keep null fields honestly.

## Derivation (honest accounting, every number measured)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (36 seeds × blank+a-z = 972 queries, free) | 2,688 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (17 crawlable of 22 attempted; 7,418 URLs) | large share of pool (sitemap-sourced clusters: 1,281 of 2,329) | `raw/rival_sitemaps.json` |
| **Union after scope + junk regex filter** | **4,163** | s5 `collect_pool()` |
| Estate dedup, exact-normalised (HARD GATE) | **−1** | "accountant for ecommerce business" = a LIVE generalist page |
| Estate dedup, fuzzy ≥0.90 | **−11** | 7 of 11 against the generalist's six live ecommerce pages; 4 against unrelated titles (IOSS≈CIS and similar token collisions) |
| Borderline 0.78–0.90 | 139 kept, all reviewed | two populations: difflib false positives (ecommerce london ≈ contractor london) AND ~40 REAL generalist-adjacency pairs — see conflict flag below |
| Normalised-duplicate merge | −257 | s5 merge step (4,151 → 3,894 kept) |
| s5b junk sweep | −734 | non-UK geo + non-English (Polish OSS terms, IT/NL strays), US sales-tax/LLC/IRS layer, seller-ops/marketing noise, DIY-software listicle intent, programmatic numbered-slug artefacts (`junk_terms` in topic_pool_final.json) |
| **Final keyword pool** | **3,160** | `topic_pool_final.json` |
| DFS volume join (exact lowercase match) | **72 keywords enriched** | s5b, 2026-07-12 |
| **Page-level topic clusters (difflib ≥0.85 greedy, volume-desc seeded)** | **2,329** (was 2,331 alpha-seeded; re-ordering changed 2 greedy merges) | same file; 50 clusters with measured volume |

Estate dedup rate this run: **12 of 4,163 (0.29%) hard-dropped — but this is NOT care's
clean 0%.** All meaningful collisions are with the **generalist site's six live
"Accountant For [ecommerce segment]" pages** (hollowaydavies.co.uk: ecommerce business /
Amazon FBA / ecommerce sellers / dropshippers / Shopify stores / Etsy sellers — the exact
HIRE head terms of this niche; hollowaydavies.co.uk itself ranked in our DDG sweep and was
caught by the estate gate in s1). A further **40 kept terms are flagged `estate_conflict`**
in topic_pool_final.json (kept because the new site is their natural owner). **Ownership of
the ecommerce HIRE family — migrate/redirect the 6 generalist pages vs fence the new site
off the head terms — is an owner-gate question recorded in DOSSIER.md.** This is a
cannibalisation decision block that no other Tier-1 niche has had.

Realistic writer-ready estimate: **roughly 500–800 distinct A*-grade pages** out of the
2,329 clusters — the residual-noise share is visibly higher than care's (measured examples
surviving the sweeps: "amazon home garden fees 2026", "amazon settlement alexa",
"ecommerce email conversion", "shopify vs kaspi") because two mega-sitemaps (osome 1,630;
ecomcalctools 1,375) are programmatic and pass the scope regex on platform tokens. Per the
gap-discovery lesson (47% cumulative dupe rate), **page-level verify against the live
estate remains mandatory at write time**, and doubly so here given the generalist wall.

## Cluster shape (from topic_pool_final.json heads)

Top measured clusters (volume-desc, 2026-07-12 join): "hmrc side hustle tax limit change"
3,600 · "is tiktok shop safe" 1,600 · "shopify fees uk" 1,300 · "ecommerce accountants" 880
· "etsy fee calculator" 720 / "etsy selling fees uk" 720 — i.e. measured demand is
consumer/DIY-heavy at the top, HIRE heads sit at 880 and below. Full per-cluster figures in
topic_pool_final.json.

The big families, all seller-side:

- **VAT core**: registration threshold (gross vs payout confusion), "amazon seller vat",
  "vat for dropshippers", "shopify payments vat", flat-rate-scheme questions, margin scheme.
- **Marketplace/deemed-supplier layer**: "marketplace facilitator vat", deemed reseller
  rules, establishment status, VAT on Amazon/eBay/Etsy fees (reverse charge; the 2024
  Amazon billing switch).
- **Cross-border/EU**: IOSS registration/threshold/intermediary, OSS explained, EU VAT
  registration vs IOSS, pan-EU FBA VAT, import VAT/postponed accounting, £135 rule.
- **Settlement/payout reconciliation**: "amazon settlement report", "shopify payout"
  family, A2X/Link My Books how-tos (tooling space — SaaS-owned SERPs, target the neutral
  UK-tax angle only).
- **Inventory/COGS**: "cost of goods sold" formula/meaning family (very large), inventory
  accounting methods, FIFO, "profit higher than bank balance" cash-vs-accruals.
- **Side hustle / HMRC visibility**: "side hustle tax" threshold/Scotland/free-amount
  family, "ebay selling limit before tax", platform-reporting letters, trading allowance.
- **Structure**: "amazon fba limited company", sole trader vs Ltd for sellers, "ecommerce
  limited company" accounting.
- **HIRE heads**: "ecommerce accountant(s) (uk/london/manchester)", "amazon fba
  accountant", "shopify accountants", "ebay accountants" — the family the generalist wall
  and the 14 dedicated rivals both sit on.
- **Fees/margins**: fee-calculator queries (Amazon vs Etsy, FBA fees) — tool intent,
  contested by dedicated calculator sites.

## Sitemap contribution note

The 7,418 rival sitemap URLs contributed the majority of clusters (1,281 sitemap-sourced
vs 1,048 autocomplete-sourced after volume-desc re-seeding) — the opposite of care, where sitemaps added only 106
topics. This is direct evidence of the field's content depth: the dedicated tier plus the
SaaS arms have already written this niche out. The autocomplete leg is correspondingly
more valuable for finding what they HAVEN'T structured (side-hustle threshold confusion,
payout-vs-turnover misunderstandings, IOSS intermediary pain).
