-- ============================================================================
-- PHASE 4 MIGRATION 4/4 — Rename legacy per-site blog_topics_<site> tables
-- ============================================================================
-- Date: 2026-05-20 (kicked off 2 days early; soak verification passed clean)
-- Prerequisite: All 6 sites' rows are fully mirrored in the unified
--   `blog_topics` table (verified in docs/PHASE_4X_SOAK_VERIFICATION.md).
--   18-row gap in dentists is real-world duplicate topics, not data loss.
--
-- This migration renames the legacy tables to `_legacy_20260520` suffixes
-- so any code that still references them by old name will fail loudly with
-- a 404. The triggers move with the tables (PostgreSQL behaviour) so dual-
-- write continues to function — but no consumer writes to legacy any more.
--
-- ROLLBACK (if needed):
--   ALTER TABLE blog_topics_dentists_legacy_20260520   RENAME TO blog_topics_dentists;
--   ALTER TABLE blog_topics_property_legacy_20260520   RENAME TO blog_topics_property;
--   ALTER TABLE blog_topics_medical_legacy_20260520    RENAME TO blog_topics_medical;
--   ALTER TABLE blog_topics_solicitors_legacy_20260520 RENAME TO blog_topics_solicitors;
--   ALTER TABLE blog_topics_agency_legacy_20260520     RENAME TO blog_topics_agency;
--   ALTER TABLE blog_topics_generalist_legacy_20260520 RENAME TO blog_topics_generalist;
-- ============================================================================

BEGIN;

ALTER TABLE blog_topics_dentists   RENAME TO blog_topics_dentists_legacy_20260520;
ALTER TABLE blog_topics_property   RENAME TO blog_topics_property_legacy_20260520;
ALTER TABLE blog_topics_medical    RENAME TO blog_topics_medical_legacy_20260520;
ALTER TABLE blog_topics_solicitors RENAME TO blog_topics_solicitors_legacy_20260520;
ALTER TABLE blog_topics_agency     RENAME TO blog_topics_agency_legacy_20260520;
ALTER TABLE blog_topics_generalist RENAME TO blog_topics_generalist_legacy_20260520;

-- Sanity: verify legacy tables exist with new names and unified is unchanged
DO $$
DECLARE
  legacy_count int;
  unified_count int;
BEGIN
  SELECT count(*) INTO legacy_count FROM information_schema.tables
   WHERE table_name LIKE 'blog_topics_%_legacy_20260520'
     AND table_schema = 'public';
  IF legacy_count <> 6 THEN
    RAISE EXCEPTION 'Expected 6 legacy tables, found %', legacy_count;
  END IF;

  SELECT count(*) INTO unified_count FROM blog_topics;
  IF unified_count < 1300 THEN
    RAISE EXCEPTION 'Unified blog_topics row count too low (got %), aborting', unified_count;
  END IF;

  RAISE NOTICE 'Phase 4 rename verified: 6 legacy tables, unified has % rows', unified_count;
END $$;

COMMIT;

-- ============================================================================
-- AFTER RUNNING:
-- 1. Run `python scripts/phase4_verify_migration.py` — should still PASS
--    (the verifier still looks up legacy names; will be updated next).
-- 2. Schedule the 30-day drop: ~2026-06-22 the _legacy_ tables can be
--    dropped entirely.
-- 3. Update memory to record the rename milestone.
-- ============================================================================
