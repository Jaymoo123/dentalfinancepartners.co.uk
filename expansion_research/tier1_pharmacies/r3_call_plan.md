# R3 pharmacies — paid-call plan + actuals

Date: 2026-07-11. **HARD CONSTRAINT this run: ZERO DataForSEO calls** (estate daily $-guard
exhausted by earlier sessions; ceiling is manager-owned and was NOT raised).

## Actuals (this run)

| Source | Calls | Cost |
|---|---|---|
| DataForSEO | **0** | $0 |
| Serper (gl=gb, num=10) | 35 queries | ~$0.035 |
| DDG (free) | 35 queries | $0 |
| Google Autocomplete (free) | 945 requests | $0 |
| Direct fetches (rivals, citations, sitemaps) | free | $0 |
| Live web search (finish session: verify lanop, 3esaccountants, accountant4pharmacists) | 3 | $0 |
| Finish session (2026-07-11 late): DataForSEO / Serper | **0 / 0** | $0 |
| Enrichment batch (2026-07-11 late evening, manager-direct, owner-authorised; guard lifted by owner ruling for interactive runs, DATAFORSEO_ABORT_AT untouched): keyword_suggestions ×8 seeds + ranked_keywords ×3 rivals + search_volume ×11 heads | 12 tasks | **$0.3169** |

## Paid pulls — DONE 2026-07-11

The planned pulls ran and landed in `raw/` (dfs_keyword_suggestions.json, dfs_ranked_*.json,
dfs_head_volumes*.json); s5/s5b rerun and DOSSIER/LAUNCH_CORE/CALCULATORS/TOPICS enriched
same evening. See DOSSIER.md "Paid pulls — DONE".
