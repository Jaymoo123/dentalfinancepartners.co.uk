# agents/ Directory Audit

**Date:** 2026-05-20  
**Context:** Phase 4.X shipped. `optimisation_engine.weekly_run` (Mondays 07:00 UTC) is the only scheduled pipeline. All `agents/` workflows were disabled 2026-05-18. This audit categorises each file for delete, keep, or migrate.

---

## Constraints (do not touch regardless of findings)

| File | Reason |
|------|--------|
| `agents/config/agent_config.py` | Protected by task brief |
| `agents/config/gsc_config.py` | Protected by task brief |
| `agents/utils/gsc_client_oauth.py` | Protected — imported by `optimisation_engine/clients/gsc_query_client.py`, `Solicitors/pipeline/keyword_intelligence.py`, `Solicitors/pipeline/build_phase2_worksheet.py` |
| `agents/utils/supabase_client.py` | Protected — used by 30+ files across the codebase |

---

## External callers of agents/ (files OUTSIDE agents/ that import from it)

| Caller | Imports |
|--------|---------|
| `optimisation_engine/clients/gsc_query_client.py` | `agents.utils.gsc_client_oauth.GSCClient` |
| `Solicitors/pipeline/keyword_intelligence.py` | `agents.utils.gsc_client_oauth.GSCClient` |
| `Solicitors/pipeline/build_phase2_worksheet.py` | `agents.utils.gsc_client_oauth.GSCClient` |
| `Solicitors/pipeline/rewrite_meta_for_ctr.py` | `agents.utils.deepseek_client.DeepSeekClient` |
| `Dentists/pipeline/rewrite_meta_for_ctr.py` | `agents.utils.deepseek_client.DeepSeekClient` |
| `Property/pipeline/rewrite_meta_for_ctr.py` | `agents.utils.deepseek_client.DeepSeekClient` |
| `scripts/deduplicate_content.py` | `agents.utils.deepseek_client.DeepSeekClient` |
| `scripts/optimize_content_editorial.py` | `agents.utils.deepseek_client.DeepSeekClient` |

**Critical:** `deepseek_client.py` is NOT protected in the brief but has three live niche-pipeline callers. It must be kept.

---

## Active GitHub Actions workflows that reference agents/

All four workflows referencing agents/ files are **disabled** (schedule commented out 2026-05-18). Manual `workflow_dispatch` trigger remains.

| Workflow | Status | Agent scripts referenced |
|----------|--------|--------------------------|
| `daily-content-pipeline.yml` | DISABLED | `keyword_topic_tree_builder.py`, `blog_generation_agent.py`, `deployment_agent.py` |
| `risk-manager.yml` | DISABLED | `risk_manager_agent.py` |
| `daily-analytics-optimization.yml` | DISABLED | `analytics_optimization_agent.py` |
| `weekly-performance-report.yml` | DISABLED | `analytics_optimization_agent.py` |
| `weekly-optimisation.yml` | **ACTIVE** | `optimisation_engine.weekly_run` (not agents/) |

---

## Disposition table — every file in agents/

### Main agents (root level)

| File | Disposition | Reason |
|------|-------------|--------|
| `__init__.py` | **KEEP** | Package marker; external imports require it |
| `coordinator.py` | **DELETE** | v1 orchestrator. All callers are: disabled workflows + other deleted agents. Superseded by `optimisation_engine.weekly_run` |
| `blog_generation_agent.py` | **DELETE** | Superseded by `optimisation_engine/blog_generator/`. Disabled workflow. |
| `content_research_agent.py` | **DELETE** | Self-labelled DEPRECATED in its own docstring. Superseded by optimisation_engine ingestion pipeline. |
| `analytics_optimization_agent.py` | **DELETE** | Superseded by `optimisation_engine/analysis/detectors.py` + GA4 ingestion. Disabled workflows. |
| `deployment_agent.py` | **DELETE** | Superseded by `optimisation_engine/blog_generator/output_writer.py`. Disabled workflow. |
| `risk_manager_agent.py` | **KEEP-MANUAL** | Health monitoring not replicated in optimisation_engine. Useful for ad-hoc operator checks. Re-enable workflow when alerting is wired. |
| `monitoring_dashboard.py` | **KEEP-MANUAL** | Budget/execution dashboard. No optimisation_engine equivalent. |
| `run_gsc_optimization_cycle.py` | **KEEP-MANUAL** | Manual GSC fetch-analyze-report cycle. Feeds `blog_optimizations` table. Supports `review_gsc_opportunities.py`. |
| `review_gsc_opportunities.py` | **KEEP-MANUAL** | Interactive CLI for human approval/rollback of GSC optimizations. Unique workflow; nothing in optimisation_engine replaces the human-in-the-loop review. |
| `keyword_topic_tree_builder.py` | **KEEP-MANUAL** | CSV → Claude → pillar-cluster topic architecture. Useful for ad-hoc topic refreshes. Still referenced in disabled `daily-content-pipeline.yml` for manual trigger. |
| `generate_niche.py` | **KEEP-MANUAL** | Site bootstrapper (brand guidelines, config, pages). `optimisation_engine/ops/spinup_site.py` covers basic scaffolding but not brand generation. |
| `verify_gsc_setup.py` | **KEEP-MANUAL** | Comprehensive GSC connection verification. Useful for debugging OAuth/config issues. |
| `test_gsc_integration.py` | **KEEP-MANUAL** | Full pipeline integration test (OAuth → fetch → analyze → track). Useful for regression testing after config changes. |
| `test_gsc_all_properties.py` | **DELETE** | One-off debug script. No callers. verify_gsc_setup.py covers this. |
| `test_gsc_connection.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_debug.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_dimensions.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_extended.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_page_breakdown.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_raw_request.py` | **DELETE** | One-off debug script. No callers. |
| `test_gsc_yesterday.py` | **DELETE** | One-off debug script. No callers. |

### config/

| File | Disposition | Reason |
|------|-------------|--------|
| `__init__.py` | **KEEP** | Package marker |
| `agent_config.py` | **KEEP** | Protected |
| `gsc_config.py` | **KEEP** | Protected |
| `cost_limits.py` | **KEEP** | Budget caps; used by `risk_manager_agent`, `monitoring_dashboard`, `blog_generation_agent` (latter deleted, but former two kept) |

### utils/

| File | Disposition | Reason |
|------|-------------|--------|
| `__init__.py` | **KEEP** | Package marker |
| `gsc_client_oauth.py` | **KEEP** | Protected |
| `supabase_client.py` | **KEEP** | Protected |
| `deepseek_client.py` | **KEEP** | Imported by 3 live niche pipelines + 2 scripts. Not protected in brief but has active external callers. |
| `gsc_fetcher.py` | **KEEP** | Supports `run_gsc_optimization_cycle` |
| `gsc_analyzer.py` | **KEEP** | Supports `run_gsc_optimization_cycle` |
| `gsc_indexing_monitor.py` | **KEEP** | Supports `run_gsc_optimization_cycle` |
| `content_expander.py` | **KEEP** | Supports `review_gsc_opportunities` (git rollback + section insertion) |
| `performance_tracker.py` | **KEEP** | Supports `run_gsc_optimization_cycle` + `review_gsc_opportunities` |
| `cost_tracker.py` | **KEEP** | Supports `keyword_topic_tree_builder`, `risk_manager_agent` |
| `error_handler.py` | **KEEP** | Supports `keyword_topic_tree_builder`, `review_gsc_opportunities`, `run_gsc_optimization_cycle` |
| `alerting.py` | **KEEP** | Supports `risk_manager_agent`, `topic_monitor`, `cost_tracker` |
| `anomaly_detector.py` | **KEEP** | Supports `risk_manager_agent` |
| `topic_monitor.py` | **KEEP** | Supports `risk_manager_agent` |
| `heartbeat_monitor.py` | **KEEP** | Supports `risk_manager_agent` |
| `rate_limiter.py` | **KEEP** | Supports `cost_tracker` |
| `keyword_analyzer.py` | **KEEP** | Supports `keyword_topic_tree_builder` |
| `brand_generator.py` | **KEEP** | Supports `generate_niche` |
| `config_generator.py` | **KEEP** | Supports `generate_niche` |
| `page_generator.py` | **KEEP** | Supports `generate_niche` |
| `keyword_researcher.py` | **KEEP** | Supports `generate_niche` |
| `database_setup.py` | **KEEP** | Supports `generate_niche` |
| `verifiers.py` | **KEEP** | Supports `generate_niche` |
| `ga4_client.py` | **DELETE** | No callers found. The analytics/ folder has its own ga4_client. |
| `content_analyzer.py` | **DELETE** | No callers found anywhere in the codebase. |
| `quality_checker.py` | **DELETE** | Sole callers are `blog_generation_agent.py` (deleted) and `deprecated/deduplication_checker.py` (deleted). |
| `deployment_manager.py` | **DELETE** | Sole caller is `deployment_agent.py` (deleted). |

### analytics/

| File | Disposition | Reason |
|------|-------------|--------|
| `__init__.py` | **DELETE** | Folder becomes empty after ga4_client.py deleted |
| `ga4_client.py` | **DELETE** | Sole caller is `analytics_optimization_agent.py` (deleted). `optimisation_engine` has its own `clients/ga4_client.py`. |

### setup/

All six files are one-time database initialisation scripts. The Supabase tables they created exist and are managed via `supabase/migrations/`. No callers outside setup/ itself.

| File | Disposition |
|------|-------------|
| `create_tables.py` | **DELETE** |
| `quick_test.py` | **DELETE** |
| `run_migration.py` | **DELETE** |
| `run_migration_direct.py` | **DELETE** |
| `setup_database.py` | **DELETE** |
| `test_setup.py` | **DELETE** |

### deprecated/

| File | Disposition |
|------|-------------|
| `deduplication_checker.py` | **DELETE** | Already in deprecated/; no active callers |
| `research_sources.py` | **DELETE** | Already in deprecated/; no active callers |

### docs/ (reference markdown, not code)

| File | Disposition |
|------|-------------|
| `GSC_OPTIMIZATION_README.md` | **KEEP** | Operator reference |
| `RISK_MANAGEMENT_SYSTEM.md` | **KEEP** | Operator reference |

---

## Summary counts

| Disposition | Count |
|-------------|-------|
| DELETE | **28 files** |
| KEEP (protected or active external callers) | **8 files** |
| KEEP-MANUAL (operator tools, no active schedule) | **13 files** |
| KEEP (support chain for kept-manual tools) | **19 files** |
| KEEP (docs/markdown) | **2 files** |

**DELETE breakdown:**
- Main agents superseded by optimisation_engine: 5
- Orphaned utils (no surviving callers): 4
- analytics/ folder (superseded by optimisation_engine GA4 client): 2
- setup/ one-time migration scripts: 6
- deprecated/ folder: 2
- Debug/dev test scripts: 8
- Disabled GitHub Action workflows (recommended, not executed here): 2 of 4

**Note on disabled workflows:** After deleting `blog_generation_agent.py`, `deployment_agent.py`, and `analytics_optimization_agent.py`, the three corresponding disabled workflows (`daily-content-pipeline.yml`, `daily-analytics-optimization.yml`, `weekly-performance-report.yml`) will reference non-existent scripts. Recommend deleting them too (they can be recreated from git history if ever needed). `risk-manager.yml` stays as it references the kept `risk_manager_agent.py`.

---

## MIGRATE (none identified)

All unique functionality in agents/ that's worth preserving is kept in-place. The GSC opportunity review workflow (`run_gsc_optimization_cycle.py` + `review_gsc_opportunities.py`) is a candidate for future migration into `optimisation_engine` but is not blocking cleanup.

---

## Execution plan (after user approval)

1. Delete 28 Python files + 3 disabled workflow files
2. Remove now-empty `agents/analytics/` and `agents/deprecated/` and `agents/setup/` directories
3. Single git commit: "chore: remove superseded agents/ files post Phase 4.X"
4. Write memory entry
