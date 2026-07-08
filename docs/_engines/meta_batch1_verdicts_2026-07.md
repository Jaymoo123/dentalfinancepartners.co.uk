# SERP meta batch 1 — 26-day readout (2026-07-08)

Ship date 2026-06-12; formal 28d verdicts due 2026-07-10, this is a 26-day pre-read on fresh data (GSC 90d + Bing snapshots pulled 2026-07-08). Windows compared: 26d pre-ship vs 26d post-ship, per page, Google `gsc_query_data` + Bing latest snapshot vs registered Bing baseline. Raw per-page rows: `.cache/meta_b1_readout.json` (query: `.cache/meta_b1_readout.py`).

## Topline per site

| site | pages | G impressions pre→post | G clicks | new-query impressions | Bing impressions base→now | pages with no post signal |
|---|---|---|---|---|---|---|
| dentists | 35 | 186 → 658 (+254%) | 2 → 4 | 324 | 181 → 751 | 25 |
| solicitors | 35 | 113 → 487 (+331%) | 0 → 0 | 481 | 936 → 2,620 | 22 |
| generalist | 67 | 2,931 → 4,027 (+37%) | 0 → 0 | 311 | 515 → 3,716 | 34 |
| medical | 18 | 52 → 71 | 0 → 0 | 24 | 276 → 625 | 13 |
| agency | 30 | 195 → 192 (flat) | 0 → 0 | 29 | 18 → 55 | 28 |

## Reading

- **Visibility moved, clicks did not.** Every site except agency grew Google impressions strongly and Bing impressions 3-7x, but total clicks across 185 pages went 2 → 4. The batch was measured on CTR shortfall; the honest verdict is that the pages surface for more queries now (new-query impressions confirm intent-broadening worked) but average positions are still too deep (typically 20-70) for meta copy to convert impressions into clicks. Meta was the right first lever; position/authority is the binding constraint now.
- **Confounds:** post-window overlaps other shipped work (net-new waves, factual remediation, medical/agency fix waves), and most pages had immature baselines (<30 pre-impressions), so site-level growth cannot be attributed to the metas alone. Treat "positive" here as "no harm + visibility up", not proven CTR causation.
- **Agency flat** is consistent with its 2026-07-08 diagnosis (crawl-budget/authority starvation, 4.2% indexed) — metas can't act on pages Google won't crawl.
- **Medical near-zero on Google** is consistent with its known discovery failure; its Bing baseline→now (276→625) shows the copy is working where the site is actually indexed.
- **Decliners:** 19 pages dropped >10 impressions. Several show Google-down/Bing-up rotation (e.g. generalist `how-to-switch-from-sole-trader-to-limited-company` 274→0 Google but 0→88 Bing; solicitors `sra-accounts-rules-explained` 82→5 Google, 40→146 Bing) — engine rotation, not clear meta regressions. Watch list for the daily regression detector; no rollbacks warranted at 26d.

## Standout pages

- generalist `construction-accounting-software-uk-contractors`: 787→2,189 impressions, 43 new queries — biggest single winner; still pos ~29 and 0 clicks → prime expansion/content candidate (see opportunity readout).
- dentists `uda-value-explained-for-uk-dentists`: 82→171 imp, clicks 2→4, pos 11.8→10.7, 31 new queries — the one clean CTR-style win.
- dentists `dental-practice-goodwill-buying-selling`: 1→207 imp at pos 18 — new demand unlocked.
- solicitors `how-much-do-uk-conveyancing-solicitors-charge`: 0→390 imp (pos 74) — surfacing for the first time.

## Tracking defects found and fixed during this readout (2026-07-08)

These are why earlier analyses were never comprehensive:

1. **`optimisation_changes.target_url` was empty for all 179 batch-1 rows** (meta_apply.py built briefs with `target_url=""`), so `vw_change_performance` joined to nothing and weekly_run step-5 verdicts were un-computable. Fixed: all 179 backfilled from canonical GSC URLs (31 never-impressed pages from monitored_pages paths); `scripts/meta_apply.py` now populates target_url from the worklist for all future batches.
2. **Medical monitoring paths were categorised (`/blog/<cat>/<slug>`) but the live site serves FLAT routes** — every medical join silently returned nothing. Fixed: 18 monitored_pages rows + 10 audit URLs corrected to `/blog/<slug>`; `register_monitored_batch.py` now emits flat paths for medical.
3. **weekly_run step-5 verdict logic**: post-ship window was unbounded (grew stale over time vs a fixed 28d baseline); "no data" was conflated with "no movement"; new-page maturation was invisible. Fixed: window capped at 28d, no-signal reason recorded, `immature_baseline` (<30 pre-impressions) tagged in outcome_notes, and impression-led growth (+25% without click loss) now counts as positive.
4. **New/ranking pages were unmonitored**: 525 pages with GSC impressions had no monitored_pages row (including the dentists homepage at 4,825 impressions). Fixed: `rewrite_type='net_new'` added (CHECK constraint extended) and 203 pages ≥10 impressions bulk-registered with Google+Bing baselines on 2026-07-08.

Formal 28d verdicts will be written by `weekly_run` step 5 from 2026-07-10 with the fixes above in effect.
