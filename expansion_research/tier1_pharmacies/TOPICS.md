# Topic pool — Pharmacies (R3)

Date: 2026-07-11. Machine-readable pool: `topic_pool.json` (raw union + estate dedup) and
`topic_pool_final.json` (judged + clustered). **ZERO DataForSEO this run**: no volume/KD on
any term; enrichment is in DOSSIER.md TODO — paid pulls.

## Derivation (honest accounting, every count measured)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (945 requests, free) | 2,600 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (15 domains crawled, 2,767 URLs) | 295 scope-passing topics survive to kept | `raw/rival_sitemaps.json` |
| **Union after scope + junk regex filter (s5)** | **2,058** | s5 `collect_pool()` (autocomplete-sourced kept: 1,676) |
| Estate dedup, exact-normalised (HARD GATE) | −0 | vs 7,905 estate titles (`topic_pool.json` estate_titles_checked: own_estate_exclusion slugs + up to 3 title variants per 2,035 Supabase blog_topics rows) |
| Estate dedup, fuzzy ≥0.90 | −1 | "accountants for locum doctors" ≈ generalist live "accountant for locum doctors" (0.98) — TRUE dupe, stays out |
| Borderline 0.78-0.90 | 22 kept, flagged | all cross-niche difflib noise ("pharmacy accountants" ~ "HR Accountants"); confirmed kept at s5b judgment |
| Norm-dedup collapse | −96 | word-order variants |
| **Kept (topic_pool.json)** | **1,961** | |
| s5b judged junk sweep | −179 | US Goodwill Industries autocomplete flood (goodwill pharmacy tech training/las vegas/kolkata…), meaning-in-<language>, career/CPD ("how to become", training, student evaluation), US PBM brands (Accredo/Alto/Cigna "tax id"), residual non-UK geo |
| **Final keyword pool (topic_pool_final.json)** | **1,782** | |
| **Greedy page-level clusters (difflib ≥0.85 on sorted-token norm)** | **1,214 topics** | `topic_pool_final.json` clusters |

Realistic writer-ready estimate: **several hundred distinct pages** after SERP-clustering the
remaining variant families (the "drug tariff <subtopic>" family alone is dozens of cluster
heads that will merge further at write time). Per the gap-discovery lesson (47% cumulative
dupe rate), **page-level verify against the live estate remains mandatory at write time** for
every topic pulled from this pool.

## Medical adjacency gate (the estate-collision finding)

Our own **medicalaccounts.co.uk ranks in this niche's SERPs** (dropped from candidates as
estate) and already owns generic locum ground: the fuzzy gate caught "accountants for locum
doctors" (generalist live page) and flagged "locum pharmacist tax calculator" against
medical's locum tax calculator (ratio 0.784, kept). The rival-sitemap source also injects a
locum-doctor/GP tail into the pool (kudos/SIAL are medical-sector firms) — e.g. "vat locum
doctors gp practices 2026", "mtd income tax gp partners locum doctors". **Rule for the
build**: everything locum on the pharmacy site must be pharmacist-specific (ESM4270, GPhC,
day-rate norms, FP34-adjacent) and page-level deduped against medicalaccounts.co.uk and the
contractors-ir35 corpus before writing; generic locum-doctor topics belong to medical, not
here. LAUNCH_CORE.md already encodes this for the locum-limited-vs-umbrella post.

## What the pool says about demand shape (no volumes this run — structural read only)

- **VAT cluster is the signature**: "are pharmacies vat exempt/registered", "do pharmacies
  pay vat", "vat on prescriptions" families — matches house positions A1-A5 and the DIY layer
  in LAUNCH_CORE intent class 4.
- **NHS economics tail is deep and unowned**: the "drug tariff <x>" family (categories,
  clawback, concessions, broken bulk, monthly editions), FP34, Category M, Pharmacy First
  payment — the "only a specialist writes this" layer; feeds the FP34 cash-flow tool.
- **Buying/selling**: "buying a pharmacy uk/checklist/cost", valuation/goodwill, "apply for
  nhs pharmacy contract" — the high-value event cluster; volumes TODO paid pull.
- **Locum cluster is real but small**: "are locum pharmacists self employed", ir35/limited
  company variants — content audience per LAUNCH_CORE, no lead funnel at v1.

## Sitemap crawl coverage note

15 rival domains crawled (`raw/rival_sitemaps.json`, 2,767 URLs). Coverage is complete for
the verified specialist set: pharmacyaccountants.co.uk's 2-URL result was re-verified by hand
(sitemap index → page-sitemap really lists only 2 pages — a brochure site, not a crawl
failure); accountant4pharmacists.co.uk has no sitemap and resolves to a private IP (0 URLs,
search-verified as a Salhan microsite). stetsonaccountants.co.uk's 2,000 URLs are
programmatic location pages — the s5 scope filter kept only meaningful 3-word+ slugs.
Blocked SECTION rivals (lanop, 3esaccountants — both 403) were not sitemap-crawlable; their
footprint enters via SERP hits and the TODO ranked_keywords paid pull.
