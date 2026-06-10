# Property Opportunity Audit — 2026-06-04 — STATE

Single source of truth for this audit. **To answer "how many did we do?", READ the files named below — never recall from memory.**

## What this is
A non-circular, multi-engine re-discovery of property competitors + topic gaps, triggered after finding the old discovery was circular (self-seeded from 83 of our own GSC queries) and Google-only. Goal: every genuine new opportunity on paper, with full provenance.

## PRIMARY FRAMING (read first)
**Brand-breadth, not technical gaps.** We are saturated on technical tax (~75% of our 686 pages) and under-indexed on customer-decision, human/relatable, general-accounting, and authority content. The register is organised by BRAND CATEGORY. Full framing + the category gap table: `_BRAND_OPPORTUNITY_FRAMING.md`. Per-category candidate data: `_brand_categories.json`.

## Pipeline & current stage
1. **Refresh** — GSC + Bing re-pulled to 2026-06-04. ✅ DONE. Seed = 3,183 distinct queries (1,318 Bing-only).
2. **Harvest** — SERP all 3,183 across 5 engines (DuckDuckGo, Bing, Startpage, Mojeek, Yahoo). 🔄 RUNNING (background). Read `_serp_progress.txt`.
3. **Interim sitemap-mine** — crawl frozen `interim01` (1,186 domains). ✅ DONE: 722 crawled / 373 no-sitemap / 91 dropped. Findings: `_interim01_FINDINGS.md` (technical funnel) + `_BRAND_OPPORTUNITY_FRAMING.md` (brand-category cut, PRIMARY).
4. **Final mine** — after harvest completes, freeze `interim02` (full set) and mine the DELTA (reuses same manifest+cache). ⏳ PENDING.
5. **Adjudicate + register** — ✅ DONE (FULL-CORPUS pass — no cap). All 91,789 clean slugs embedded + clustered → **463 canonical cores** (+71,787 one-offs) → all 463 adjudicated vs 686 live pages by 8 Opus agents → union with sample pass = **`OPPORTUNITY_REGISTER_FINAL.md`: 67 net-new + 40 expand-existing**. Each net-new carries a competitor-convergence count (n). Top: mistakes/myths (282 competitors), buying-with-tenants-in-situ (94), NRL1 form (~399 imp), SDLT-for-companies (43). Net-new concentrated in brand-breadth; technical tax confirmed saturated.

**CALIBRATION (important):** 67 = the HIGH-VALUE set, NOT the total. A 140-slug calibration of the never-adjudicated diffuse tail (28,947 on-mission one-offs) found 4.3% net-new / 14% already-covered / 81% noise. Extrapolated → ~1,200 MORE net-new exist, but they're niche, deep-mechanic/case-law, low-volume, low-priority (the saturated technical long-tail). So: **67 high-value actionable + ~1,200 low-priority niche reserve.** Act on the 67; the tail is low-ROI for a lead-gen brand.

Folder cleaned 2026-06-04 (162M→14M): kept 4 deliverable docs + scripts + key data (`_serp_domains.json` = 6,385-competitor universe, `_canonical_cores.json`, `_final_taxonomy.json`, `_register2/`, frozen snapshots, manifest). Caches/embeddings deleted (regenerable via scripts). FOR REVIEW — nothing merged.

## Save / hygiene procedure (follow this)
- **All work stays in this dated folder.** Additive only. Read-only against shared engine scripts, Supabase tables, and live pages.
- **Never auto-merge into the canonical pool** (`docs/property/_archive/topic_gaps_final.md`) — engine charter requires manager review first.
- **Freeze before processing.** Any set we act on is snapshotted into an immutable `_interimNN_frozen_domains.json` (with capture time + harvest coverage %). The live `_serp_domains.json` MOVES; never mine it directly.
- **The manifest is the ledger.** `_sitemap_manifest.json` has one terminal row per domain (crawled / no_sitemap / failed / dropped+reason). Cumulative across interim + final passes. This is the authoritative answer to "what have we processed."

## File inventory
| File | Role | Mutable? |
|---|---|---|
| `_taxonomy.py` | non-circular first-principles topic taxonomy (182 topics) | static |
| `harvest_serp.py` | multi-engine SERP harvest | static |
| `mine_sitemaps.py` | sitemap crawl + topical diff | static |
| `_serp_cache/<engine>/<hash>.json` | per (engine,query) SERP result | append (resumable) |
| `_serp_domains.json` | LIVE merged domain set — **MOVES, do not mine directly** | live |
| `_serp_progress.txt` | harvest heartbeat | live |
| `_interim01_frozen_domains.json` | **IMMUTABLE** snapshot: 1,186 new domains @ 4.8% harvest, frozen 2026-06-04 12:43:49 | frozen |
| `_sitemap_cache/<domain>.json` | per-domain topical-URL result | append (resumable) |
| `_sitemap_manifest.json` | **LEDGER** — per-domain status; answers "how many did we do" | append (resumable) |
| `_sitemap_progress.txt` | mine heartbeat | live |
| `categorize_brand.py` | re-cuts candidates by brand content category (reusable) | static |
| `_brand_categories.json` | per-category competitor-gap slugs + our coverage | rebuilt each run |
| `_BRAND_OPPORTUNITY_FRAMING.md` | **PRIMARY framing** — brand-breadth gap table + the 4 plays | doc |
| `_interim01_FINDINGS.md` | interim01 technical funnel (saturation evidence) | doc |
| `_interim01_funnel.json` | 821 tax-gated technical candidates | frozen |
| `CONTINUOUS_DISCOVERY_PLAN.md` | the standing process design | doc |
| `STATE.md` | this file | doc |

## Snapshot lineage
- `interim01` — frozen 2026-06-04 12:43:49 @ 4.8% harvest — 1,186 new domains. Mined. ✅
- `interim02` — frozen 2026-06-04 16:34:52 @ 84% harvest — 5,665 new domains. Delta of 4,479 (vs interim01) being mined now. 🔄
- `interim03`/final (optional) — if the last ~16% of harvest adds materially more domains, freeze + mine that small delta at completion.
