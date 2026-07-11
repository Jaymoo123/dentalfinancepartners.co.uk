# Topic pool — Manufacturing & engineering accountancy (R3)

Date: 2026-07-12. Machine-readable pools: `topic_pool.json` (raw + dedup evidence) and
`topic_pool_final.json` (judged final pool + page-level clusters). **No volumes/KD/CPC
this run (zero DataForSEO by rule)** — cluster volume/kd fields are null pending the paid
pull (DOSSIER.md TODO).

## Derivation (honest accounting, every number measured)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (34 seeds × blank+a-z, deduped = 918 queries, free) | 3,958 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (21 crawlable of 22 attempted; 12,651 URLs) | 260 scope-passing kept rows | `raw/rival_sitemaps.json` |
| **Union after scope + junk regex filter** | **3,283** | s5 `collect_pool()` (2,785 autocomplete-sourced + 260 sitemap-sourced kept rows overlap) |
| Estate dedup, exact-normalised (HARD GATE) | **−15** | vs 7,905 estate titles (all sitemap slugs in `own_estate_exclusion.json` + `raw/estate_blog_topics.json`) |
| Estate dedup, fuzzy ≥0.90 | **−34** | |
| Borderline 0.78-0.90 | 158 kept, all reviewed by family | dominated by the generic-AIA family (see wall below); non-CA remainder are sorted-token difflib false positives ("accountants for manufacturers" ≈ "accountant for farmers" 0.791) |
| Normalised-duplicate merge | −192 | s5 merge step (3,234 → 3,042 kept) |
| s5b adjacency-wall drops (contractors-ir35) | −48 | generic/unqualified R&D-relief terms + rival-sitemap R&D blog-slug noise + 1 regex false positive ("fertilise**r and d**iesel costs" — off-scope farming junk anyway) |
| s5b generic-capital-allowances wall (generalist/dentists/property) | **−256** | every AIA/full-expensing/CA term WITHOUT a manufacturing/plant/machinery qualifier dropped — see finding below |
| s5b junk sweep | −152 | non-UK finance (SBI/EMI/HDFC, australia), student costing-theory (journal/MCQ/grade-11), consumer machine-loan rate shopping, capital-WIP (Indian AS-10 family), software brand noise, numbered slug fragments |
| **Final keyword pool** | **2,586** | `topic_pool_final.json` |
| **Page-level topic clusters (difflib ≥0.85 greedy)** | **1,690** | same file (alphabetical seed order; will re-seed volume-desc after the paid pull) |

**Measured estate dupe rate: 49 of 3,283 = 1.49%** (15 exact + 34 fuzzy).

## FINDING — the capital-allowances family is NOT net-new for the estate

Unlike care (0 collisions), all but one of the 49 measured estate dupes (48 CA-family +
1 generic R&D, "what is r&d tax credit") are in the
annual-investment-allowance / full-expensing / capital-allowances family — generalist,
dentists and property pages already own the generic phrasings ("annual investment
allowance uk", "full expensing capital allowances", "annual investment allowance uk
dentists"...). The niche's supposed moat cluster is therefore only HALF-available:
manufacturing-qualified variants ("capital allowances manufacturing equipment", "plant
and machinery" family) are clear; generic CA questions are generalist territory. s5b
enforces this as a wall: 256 additional unqualified CA terms dropped beyond the measured
collisions. Same pattern as the R&D wall with contractors-ir35 (48 drops). **Two of the
niche's three claimed moat clusters (CA, R&D) sit against estate walls; only the
costing/WIP/CBAM/exporter clusters are cleanly net-new.**

## Cluster shape (from topic_pool_final.json heads)

The big families:

- **Plant & machinery capital allowances (qualified slice)**: "plant and machinery"
  cluster (21 members), "capital allowances manufacturing equipment", full-expensing-vs-AIA
  ordering questions.
- **Costing / WIP / stock**: "accounting of work in progress" (17), "standard costing"
  (17), "stock valuation" (13), overhead absorption, machine-hour/product costing —
  BUT heavily contaminated with student/theory intent (see noise note).
- **R&D + Patent Box (manufacturing-qualified slice)**: "patent box nexus ratio",
  "r&d tax relief manufacturing" family — thin after the adjacency wall, deliberately.
- **CBAM / exporters**: "cbam calculator", CBAM registration/scope questions — genuinely
  unowned, but the autocomplete family includes heavy EU-language noise (zulassung,
  uredba) marking it as an EU-dominated query space; the UK-CBAM slice is smaller.
- **Buy/sell/value**: "how to value a manufacturing business" (15), selling/buying a
  manufacturing business tax.
- **Grants/funding**: "grants for manufacturing companies" — mixed UK/US (DoD noise).
- **Hire intent**: "accountants for manufacturers", "manufacturing accountant",
  engineering-accountant variants — the small head family.

## Residual noise (measured, honest)

A conservative regex probe over the 1,690 cluster heads flags **96 obviously-noisy
clusters** (foreign-language CBAM/tooling terms, non-UK geo, student MCQ/grade-11,
US grants) — and that probe undercounts (e.g. "manufacturing cost us vs china",
"business & engineering trends" survive it). The costing/WIP/overhead families are
**majority education/DIY intent**, not operator-hire intent. Realistic writer-ready
estimate: **roughly 500-800 distinct A*-grade UK-operator pages** out of the 1,690
clusters — a materially lower usable fraction than care's pool. Per the gap-discovery
lesson (47% cumulative dupe rate), **page-level verify against the live estate remains
mandatory at write time**, and for this niche the CA/R&D wall check must be part of it.

## Sitemap contribution note

The 12,651 rival sitemap URLs collapsed to only 260 scope-passing kept rows because the
big regional-firm sitemaps (ross-brooke 2,985; bhp 2,429; ensors 1,630) are
overwhelmingly generic-accountancy blogs — their manufacturing sections are 10-30 URLs
each. The single dedicated rival (skynetaccounting, 140 URLs) contributes the only
manufacturing-dense sitemap, mirroring the R2 thesis at content level: nobody has built
the deep manufacturing content library this plan proposes. Whether the demand justifies
it is exactly what the paid volume pull must answer (DOSSIER.md verdict).
