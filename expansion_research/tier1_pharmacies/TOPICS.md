# Topic pool — Pharmacies (R3)

Date: 2026-07-11. Machine-readable pool: `topic_pool.json` (raw union + estate dedup) and
`topic_pool_final.json` (judged + clustered). Volumes/KD enriched 2026-07-11 late evening from the paid DataForSEO
batch (`raw/dfs_keyword_suggestions.json` + `raw/dfs_ranked_keywords.json` +
`raw/dfs_head_volumes.json`): 79 kept keywords matched a DFS row, 37 of 1,227 clusters carry
measured volume. The pull also added net-new scope-passing terms (final pool 1,782 → 1,824;
clusters 1,214 → 1,227); ordering now volume-led (join pattern as tier1_care/s5b).

## Derivation (honest accounting, every count measured)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (945 requests, free) | 2,600 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (15 domains crawled, 2,767 URLs) | 295 scope-passing topics survive to kept | `raw/rival_sitemaps.json` |
| DataForSEO keyword_suggestions (8 seeds) + ranked_keywords (3 rivals), 2026-07-11 | 82 + 598 rows | `raw/dfs_keyword_suggestions.json`, `raw/dfs_ranked_keywords.json` |
| **Union after scope + junk regex filter (s5)** | **2,114** | s5 `collect_pool()` (autocomplete + sitemaps + DFS; was 2,058 pre-DFS) |
| Estate dedup, exact-normalised (HARD GATE) | −0 | vs 7,905 estate titles (`topic_pool.json` estate_titles_checked: own_estate_exclusion slugs + up to 3 title variants per 2,035 Supabase blog_topics rows) |
| Estate dedup, fuzzy ≥0.90 | −1 | "accountants for locum doctors" ≈ generalist live "accountant for locum doctors" (0.98) — TRUE dupe, stays out |
| Borderline 0.78-0.90 | 29 kept, flagged | cross-niche difflib noise ("pharmacy accountants" ~ "HR Accountants"); confirmed kept at s5b judgment (2 medical flags) |
| Norm-dedup collapse | −110 | word-order variants |
| **Kept (topic_pool.json)** | **2,003** | |
| s5b judged junk sweep | −179 | US Goodwill Industries autocomplete flood (goodwill pharmacy tech training/las vegas/kolkata…), meaning-in-<language>, career/CPD ("how to become", training, student evaluation), US PBM brands (Accredo/Alto/Cigna "tax id"), residual non-UK geo |
| **Final keyword pool (topic_pool_final.json)** | **1,824** | 79 keywords volume/KD-enriched |
| **Greedy page-level clusters (difflib ≥0.85 on sorted-token norm)** | **1,227 topics** | `topic_pool_final.json` clusters; 37 with measured volume |

Realistic writer-ready estimate: **several hundred distinct pages** after SERP-clustering the
remaining variant families (the "drug tariff <subtopic>" family alone is dozens of cluster
heads that will merge further at write time). Per the gap-discovery lesson (47% cumulative
dupe rate), **page-level verify against the live estate remains mandatory at write time** for
every topic pulled from this pool.

## Medical adjacency gate (the estate-collision finding)

Our own **medicalaccounts.co.uk ranks in this niche's SERPs** (dropped from candidates as
estate) and already owns generic locum ground: the fuzzy gate caught "accountants for locum
doctors" (generalist live page) and flagged "locum pharmacist tax calculator" (+ "... uk",
from the DFS pull) against medical's locum tax calculator (both ratio 0.784, kept). The rival-sitemap source also injects a
locum-doctor/GP tail into the pool (kudos/SIAL are medical-sector firms) — e.g. "vat locum
doctors gp practices 2026", "mtd income tax gp partners locum doctors". **Rule for the
build**: everything locum on the pharmacy site must be pharmacist-specific (ESM4270, GPhC,
day-rate norms, FP34-adjacent) and page-level deduped against medicalaccounts.co.uk and the
contractors-ir35 corpus before writing; generic locum-doctor topics belong to medical, not
here. LAUNCH_CORE.md already encodes this for the locum-limited-vs-umbrella post.

## What the pool says about demand shape (volumes 2026-07-11 paid pull)

Top measured clusters: "drug tariff" 14,800/mo KD 37 (look-up intent, 8 members), "pharmacy
for sale" 2,400/mo KD 0 (broker-listing intent, 13 members), "pharmacist accountant" 210/mo
KD 0 (11 members), "buying a pharmacy" 140/mo KD 59, "how do pharmacies make money" 110/mo,
"accountants for locum pharmacists" 30/mo KD 5, "selling a pharmacy" 30/mo KD 7, "pharmacy
valuation" 20/mo.

- **VAT cluster is the signature**: "are pharmacies vat exempt/registered", "do pharmacies
  pay vat", "vat on prescriptions" families — matches house positions A1-A5 and the DIY layer
  in LAUNCH_CORE intent class 4. Both question heads return no measured Ads volume:
  GEO/answer-box surface, not tracked traffic.
- **NHS economics tail is deep and unowned**: the "drug tariff <x>" family (categories,
  clawback, concessions, broken bulk, monthly editions; head 14,800/mo), FP34 (140/mo KD 0),
  Category M, Pharmacy First payment — the "only a specialist writes this" layer; feeds the
  FP34 cash-flow tool.
- **Buying/selling**: "buying a pharmacy" 140/mo KD 59 + "buying a pharmacy uk" 70/mo KD 0,
  checklist/cost variants 10/mo each; valuation/goodwill 10-20/mo; "selling a pharmacy" 30/mo
  CPC £9.32 — the high-value event cluster is real but low-volume, exactly the
  high-value/low-competition wedge shape.
- **Locum cluster is real but small**: "accountants for locum pharmacists" 30/mo, tax family
  10/mo per variant — content audience per LAUNCH_CORE, no lead funnel at v1 (confirmed).

## Sitemap crawl coverage note

15 rival domains crawled (`raw/rival_sitemaps.json`, 2,767 URLs). Coverage is complete for
the verified specialist set: pharmacyaccountants.co.uk's 2-URL result was re-verified by hand
(sitemap index → page-sitemap really lists only 2 pages — a brochure site, not a crawl
failure); accountant4pharmacists.co.uk has no sitemap and resolves to a private IP (0 URLs,
search-verified as a Salhan microsite). stetsonaccountants.co.uk's 2,000 URLs are
programmatic location pages — the s5 scope filter kept only meaningful 3-word+ slugs.
Blocked SECTION rivals (lanop, 3esaccountants — both 403) were not sitemap-crawlable; their
footprint enters via SERP hits and the 2026-07-11 ranked_keywords pull (lanop: zero pharmacy
terms in its top-500-by-volume of 2,386 ranked keywords — generalist firm, not a
pharmacy-SERP threat).
