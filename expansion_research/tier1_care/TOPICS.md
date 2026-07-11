# Topic pool — Care homes + domiciliary care (R3)

Date: 2026-07-11. Machine-readable pools: `topic_pool.json` (raw + dedup evidence) and
`topic_pool_final.json` (judged final pool + page-level clusters). **DFS-enriched same
day**: the paid pulls landed (8 suggestion seeds + 4 ranked domains, $0.2520) and
`s5b_finalise.py` was re-run with volume joining + volume-desc cluster ordering — 91 of
1,049 pool keywords matched a measured DFS row; 53 of 652 clusters now carry a measured
volume/KD/CPC (top of file, sorted). Unmatched terms keep null = DFS returned no volume
(typically <10/mo), not missing data.

## Derivation (honest accounting, every number measured)

| Stage | Count | Source |
|---|---|---|
| Google Autocomplete (33 seeds × blank+a-z = 891 queries, free) | 1,716 unique suggestions | `raw/autocomplete_raw.json` |
| Rival sitemap slugs (17 crawlable of 22 attempted; 8,845 URLs) | 106 scope-passing topics | `raw/rival_sitemaps.json` |
| **Union after scope + junk regex filter** | **1,296** | s5 `collect_pool()` (1,083 autocomplete-sourced + 106 sitemap-sourced kept rows overlap) |
| Estate dedup, exact-normalised (HARD GATE) | **−0** | vs 7,905 estate titles (all sitemap slugs in `own_estate_exclusion.json` + `raw/estate_blog_topics.json`) |
| Estate dedup, fuzzy ≥0.90 | **−0** | |
| Borderline 0.78-0.90 | 36 kept, all reviewed | every pair a false positive (CQC≈CIS token collision; "care home accountant"≈"accountant for farmers") |
| Normalised-duplicate merge | −112 | s5 merge step (1,296 → 1,184 kept) |
| s5b junk sweep | −130 | US payroll-portal brands (addus, brightstar...), non-UK geo (california/SB 525, brisbane, kerala), car care, consumer paying-for-care intent, care-ops non-finance (menus, DoLS, risk assessments) |
| s5b medical-adjacency drops | −5 | GP/private-GP/dental CQC registration, nurse/locum worker-side — keeps the wall with the medical + dentists sites |
| **Final keyword pool** | **1,049** | `topic_pool_final.json` |
| **Page-level topic clusters (difflib ≥0.85 greedy, volume-desc seeded)** | **652** | same file (659 in the pre-enrichment run; volume-desc seed order merges 7 more families) |
| DFS enrichment join (exact-norm) | 91 keywords matched, 53 clusters with measured volume | `raw/dfs_keyword_suggestions.json` + `raw/dfs_ranked_keywords.json` |

Estate dedup rate this run: **0 of 1,296 (0.0%)** — the estate has effectively no care-sector
content, which is itself a finding: this niche is genuinely net-new, unlike hospitality
(31 estate collisions) and charities. The single known adjacency risk is the medical site's
clinician wall, handled by the flag+drop above.

Realistic writer-ready estimate: **roughly 350-500 distinct A*-grade pages** out of the 652
clusters — residual noise survives the regex sweeps (e.g. "customer care home loan hdfc",
"home care cpa", consumer-side stragglers), and greedy clustering under-merges some
question families. Per the gap-discovery lesson (47% cumulative dupe rate), **page-level
verify against the live estate remains mandatory at write time** for every topic pulled
from this pool.

## Measured cluster heads (DFS, 2026-07-11)

Top clusters by measured volume: "cqc registration" 2,900/mo KD 26; "cqc registration
manager" 720/mo KD 0; "buying a care home" 320/mo KD 0; "cqc registration requirements"
260/mo KD 25; "cqc scope of registration" 210/mo KD 17; "funded nursing care how much"
140/mo KD 3; then a 90-110/mo band ("care home accountant", "cqc registration domiciliary
care", "funded nursing care payments", "carer minimum wage uk"). The measured picture
confirms the CQC-money and funding-mix families as the demand core; the HIRE heads are
small-volume/high-CPC (£39.12).

## Cluster shape (measured from topic_pool_final.json heads)

The big families, all provider-side:

- **VAT welfare exemption + recovery**: "are care home fees vat exempt" family, "can care
  homes claim vat back", "vat on care home construction", "care home vat registration" —
  plus the live RCB 2/2025 VAT-grouping controversy (house positions A).
- **Sleep-ins, travel time, NMW**: "sleep in shift pay" seed family, "care worker minimum
  wage", "self employed vs employed carers status risk".
- **Sponsorship/workforce**: "care worker sponsorship", "care worker tier 2 sponsorship uk",
  sponsor-licence costs — a post-2025 compliance/cost cluster no generalist owns.
- **CQC money topics**: registration costs/fees, financial viability statement, start a
  domiciliary care agency (costs, accounts, projections).
- **Buy/sell/finance**: "buying a care home (business)", "selling a care home", mortgages,
  valuation, capital allowances, business rates.
- **Funding mix**: funded nursing care (rate, backdating, means-testing), local authority
  fee rates, fee-increase mechanics, cost-of-care reports.
- **Franchise economics**: "care franchise cost/for sale/resale" — brand noise removed,
  the generic economics questions kept.
- **Operations finance**: agency staff costs, occupancy voids accounting, care home business
  plans/models/profitability, payroll.

## Sitemap contribution note

The 8,845 rival sitemap URLs collapsed to only 106 scope-passing topics because the two
biggest sitemaps are programmatic location pages (auditox 6,112; hawsons 1,224 mostly
non-care) — the care-content sitemaps that matter are heighten's /carehome-insights/ hub
(152 URLs) and carehome-accountants.co.uk (120). The DFS ranked-keywords third leg landed
2026-07-11 and was itself a finding: carehome-accountants.co.uk ranks for only 4 keywords,
costcare.co.uk for 11 (mostly its own brand), and heightenaccountants.co.uk's top 500 are
entirely generic accountancy terms — the dedicated tier's 272 care URLs earn almost no
measured Google visibility, so the pool's third leg came mainly from the suggestion seeds
(242 rows, 163 with volume) and care-calculator.co.uk (143 rows).
