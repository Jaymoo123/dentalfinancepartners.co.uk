# Phase 4.X Cleanup Inventory — Legacy `blog_topics_<site>` references

**Generated:** 2026-05-20
**Context:** Phase 4 consolidated all per-site `blog_topics_<site>` tables into a
single `blog_topics` table with `site_key` row-level isolation. Dual-write
triggers (legacy → unified) are live during the soak. The legacy tables will be
**renamed** ~2026-05-22 to `blog_topics_<site>_legacy_20260520`, then **dropped**
~2026-06-22. Any code that still references the legacy names breaks at rename.

**Total references found (non-SQL):** 71 files in 9 categories.

---

## Category A — Migration SQL (DO NOT TOUCH)

These files are the historical record of how we got here. They MUST keep
referencing legacy names.

- `supabase/migrations/000_create_core_tables.sql`
- `supabase/migrations/003_add_rls_policies.sql`
- `supabase/migrations/20260329000003_add_keyword_metadata.sql`
- `supabase/migrations/20260330164916_*.sql` (medical iterations)
- `supabase/migrations/20260330171008_*.sql` (medical iterations)
- `supabase/migrations/20260330171316_*.sql` (medical iterations)
- `supabase/migrations/20260330182509_create_blog_topics_medical.sql`
- `supabase/migrations/20260330182957_create_blog_topics_medical.sql`
- `supabase/migrations/20260330184307_*.sql`
- `supabase/migrations/20260330184532_*.sql`
- `supabase/migrations/20260331134247_create_gsc_optimization_tables.sql`
- `supabase/migrations/20260401000001_create_blog_topics_solicitors.sql`
- `supabase/migrations/20260402000001_rename_blog_topics_to_dentists.sql`
- `supabase/migrations/20260516000001_create_blog_topics_agency.sql`
- `supabase/migrations/20260517000001_create_blog_topics_generalist.sql`
- `supabase/migrations/20260519000002_create_optimisation_engine_tables.sql`
- `supabase/migrations/20260520000004_phase4_create_blog_topics_unified.sql`
- `supabase/migrations/20260520000005_phase4_backfill_blog_topics.sql`
- `supabase/migrations/20260520000006_phase4_dual_write_triggers.sql`
- `supabase/applied-sql/APPLY_SOLICITORS_TO_SUPABASE.sql`

**Action:** None. Leave as-is.

---

## Category B — Phase 4 migration tooling (DO NOT TOUCH)

These scripts exist explicitly to query / verify the legacy tables during
the cutover. They will become no-ops after drop but should remain in the
repo for audit.

- `scripts/phase4_backup_blog_topics.py`
- `scripts/phase4_blog_topics_schema_audit.py`
- `scripts/phase4_verify_migration.py`

**Action:** None. After 2026-06-22 drop, mark as historical and move to
`scripts/Migration/`. Optional.

---

## Category C — One-time seed scripts (data already in DB)

These scripts were run once at site launch. The topic data they seeded
is already in the DB and was backfilled into unified `blog_topics`. They
will break after rename but they aren't part of any active pipeline.

- `Dentists/pipeline/add_blog_topics.py`
- `Property/pipeline/add_blog_topics.py`
- `scripts/Import/PHASE1_import_core.py`
- `scripts/Import/PHASE1_import_core_auto.py`
- `scripts/Import/PHASE2_import_auto.py`
- `scripts/Import/PHASE2_import_comprehensive.py`
- `scripts/Import/import_topics_to_supabase.py`
- `scripts/Migration/add_location_topics.py`
- `scripts/Migration/add_specialized_topics.py`
- `scripts/Migration/fix_medical_script.py`
- `scripts/Migration/import_medical_topics.py`
- `scripts/Migration/import_solicitors_topics.py`
- `scripts/load_topics_to_supabase.py`
- `digital-agency/pipeline/seed_dubai_topics.py`
- `digital-agency/pipeline/seed_llm_ideas.py`
- `digital-agency/pipeline/seed_pillars.py`
- `digital-agency/pipeline/seed_serper_gaps.py`
- `digital-agency/pipeline/seed_topics.py`
- `generalist/pipeline/seed_comparison_pages.py`
- `generalist/pipeline/seed_industry_pages.py`
- `generalist/pipeline/seed_initial_keywords.py`
- `generalist/pipeline/seed_llm_ideas.py`
- `generalist/pipeline/seed_recommended_topics.py`
- `generalist/pipeline/seed_seranking_additions.py`
- `generalist/pipeline/seed_serper_gaps.py`
- `generalist/pipeline/seed_topics.py`

**Action:** Update import statements to use unified `blog_topics` with
`site_key` field. They may be re-run during future keyword-research passes.
Mechanical edit: change `f"{SUPABASE_URL}/rest/v1/blog_topics_<site>"` →
`f"{SUPABASE_URL}/rest/v1/blog_topics"` and add `site_key=<site>` to every
inserted row.

---

## Category D — Runtime-active core config (CRITICAL)

These define the source-of-truth table names used by agents/ at runtime.
Even though agents/ isn't on cron, manual invocations and the niche
verifier rely on these.

- `shared_supabase_config.py` — defines the legacy constants (must keep but
  remap to `"blog_topics"`)
- `agents/config/agent_config.py` — NICHE_CONFIG[*]["blog_topics_table"]
- `agents/config/gsc_config.py` — GSC_CONFIG[*]["blog_topics_table"]

**Action:** Change `blog_topics_<site>` to `blog_topics` and add a new
`"site_key": "<site>"` field. Downstream consumers must pass `site_key` as a
filter on every query.

---

## Category E — Runtime-active agents (consumers of D)

Files that import the config from Category D and run live queries.

- `agents/run_gsc_optimization_cycle.py` — daily entry (no cron, manual)
- `agents/utils/gsc_fetcher.py`
- `agents/utils/gsc_analyzer.py`
- `agents/utils/gsc_indexing_monitor.py`
- `agents/utils/performance_tracker.py`
- `agents/utils/content_expander.py`
- `agents/utils/content_analyzer.py`
- `agents/utils/quality_checker.py`
- `agents/utils/cost_tracker.py`
- `agents/utils/topic_monitor.py`
- `agents/utils/database_setup.py`
- `agents/utils/verifiers.py` — hard-codes `blog_topics_{niche_id}` check
- `agents/blog_generation_agent.py`
- `agents/coordinator.py`
- `agents/content_research_agent.py`
- `agents/analytics_optimization_agent.py`
- `agents/deployment_agent.py`
- `agents/keyword_topic_tree_builder.py`
- `agents/risk_manager_agent.py`
- `agents/review_gsc_opportunities.py`
- `agents/generate_niche.py`
- `agents/verify_gsc_setup.py`
- `agents/test_gsc_integration.py`
- `agents/setup/setup_database.py`
- `agents/setup/test_setup.py`
- `agents/setup/quick_test.py`
- `agents/monitoring_dashboard.py`
- `agents/deprecated/deduplication_checker.py` (deprecated; can ignore)

**Action:** Audit each file's actual query patterns. Most read from
config and use the table name in URL building. Strategy: change config
in Category D so all these files inherit the right table name; verify any
file that builds its own URL from `f"{base}/blog_topics_..."` patterns.

---

## Category F — Per-site pipeline configs

- `digital-agency/pipeline/config_supabase.py`
- `generalist/pipeline/config_supabase.py`
- `Solicitors/pipeline/config_supabase.py`

**Action:** Update table name constant; pipeline scripts inherit.

---

## Category G — Per-site pipeline scripts (consumers of F)

Pipelines that actively run keyword-research and topic generation.

- `digital-agency/pipeline/serper_mine.py`
- `generalist/pipeline/serper_mine.py`
- `generalist/pipeline/aggregate_brief.py`
- `generalist/pipeline/autocomplete_expand.py`
- `generalist/pipeline/bulk_generate.py`
- `generalist/pipeline/export_for_seranking.py`
- `generalist/pipeline/rescore_with_seranking.py`
- `Dentists/pipeline/generate_all_automated.py`
- `Property/pipeline/generate_all_automated.py`

**Action:** Update queries to use unified `blog_topics` + `site_key` filter.

---

## Category H — One-time audit scripts

- `scripts/phase1_supabase_audit.py`
- `scripts/phase1_supabase_deeper.py`
- `scripts/phase1_populate_sites.py`

**Action:** Already historic. Add header comment marking as obsolete.

---

## Category I — Test / scaffold scripts

- `scripts/scaffold_new_site.py` — generates new niche scaffold; writes
  `"blog_topics_<niche>"` into the new niche.config.json
- `scripts/batch_generate_posts.py`
- `scripts/Testing/check_property_topics.py`
- `scripts/Testing/test_generation.py`
- `scripts/Database/check_pending.py`

**Action:** Scaffold must write `"blog_topics"` (unified) into new
configs. Test scripts updated to query unified table.

---

## Category J — Niche config JSON files

The `content_strategy.supabase_table` field is read by Next.js niche-loader
but never used in any runtime code path (no queries from the browser to
Supabase that touch this field). It's effectively documentation.

- `Dentists/niche.config.json` → currently `"blog_topics_dentists"`
- `Property/niche.config.json` → currently `"blog_topics_property"`
- `Medical/niche.config.json` → currently `"blog_topics_medical"`
- `Solicitors/niche.config.json` → currently `"blog_topics_solicitors"`
- `digital-agency/niche.config.json` → currently `"blog_topics_agency"`
- `generalist/niche.config.json` → currently `"blog_topics_generalist"`
- `contractors-ir35/niche.config.json` → check (likely empty)

**Action:** Update all to `"blog_topics"`. Add a `site_key` field next to
`source_identifier` for clarity. Update the TypeScript type definitions
to add the new field.

---

## Category K — Documentation (low priority)

- `docs/MULTI_SITE_INFRASTRUCTURE.md`
- `docs/PHASE_4_DB_CONSOLIDATION.md`
- `agents/docs/README.md`
- `agents/docs/GSC_OPTIMIZATION_README.md`
- `agents/docs/GSC_SYSTEM_INDEX.md`
- `agents/docs/DUPLICATE_PREVENTION_UPDATE.md`
- `agents/docs/ARCHITECTURE.md`
- `generalist/README.md`
- `generalist/seo-research/generalist-content-brief.md`
- `Solicitors/pipeline/README.md`
- `.cursor/rules/project-context.mdc`
- `Admin/PLATFORM_AUDIT_2026-04-02.md`
- `Admin/ISSUE_LOG.md`
- `README.md`

**Action:** Update for accuracy. Defer to a single doc-update pass at the
end.

---

## Execution plan

1. **Checkpoint A — Catalogue & plan committed.** (this doc)
2. **Checkpoint B — Category D config refactor.** Update the central configs
   to unified table + site_key; add helper function `blog_topics_filter(site_key)`
   in shared_supabase_config.py.
3. **Checkpoint C — Category E agents migrated.** Verify imports/queries.
   Run `python -m agents.run_gsc_optimization_cycle property --dry-run` (or
   equivalent smoke test) for each site.
4. **Checkpoint D — Category F + G per-site pipelines migrated.**
5. **Checkpoint E — Category I scaffold + tests migrated.**
6. **Checkpoint F — Category J niche.config.json + TS types migrated.**
7. **Checkpoint G — Category C one-time seeds updated** (so a future re-run
   does not fail).
8. **Checkpoint H — Dual-write soak verification.** Compare unified row
   counts vs sum of per-site counts. Confirm dual-write triggers are firing
   on a test row.
9. **Checkpoint I — Rename legacy tables** to
   `blog_topics_<site>_legacy_20260520`. Run smoke test on each site
   immediately.
10. **Checkpoint J — Category K docs update.**
11. **Checkpoint K — Update memory** to reflect new state.

Each checkpoint commits cleanly so any one can be reverted individually.
