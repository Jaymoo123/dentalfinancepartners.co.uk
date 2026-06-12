-- Migration: 20260613000002_add_contractors_ir35_to_leads_source.sql
-- Date: 2026-06-12
-- Purpose: Add 'contractors-ir35' to the leads.source CHECK constraint ahead
--          of the Contractor Finance Partners launch. Mirrors the
--          20260610000001 (generalist) pattern. No historical rows exist for
--          this key, so no UPDATE is needed.
--
-- Live constraint def read 2026-06-12 (pg_constraint, prod):
--   leads_source_valid: CHECK (((source = ANY (ARRAY['dentists','property',
--     'medical','solicitors','generalist','general','agency',
--     'agency-founder-finance'])) OR (source IS NULL)))
--
-- Strictly additive. NOTE: Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (
    source IN (
      'dentists',
      'property',
      'medical',
      'solicitors',
      'generalist',
      'general',
      'agency',
      'agency-founder-finance',
      'contractors-ir35'
    )
    OR source IS NULL
  );

COMMENT ON COLUMN leads.source IS
  'Identifies which niche the lead came from: dentists, property, medical, solicitors, generalist, agency, or contractors-ir35. Legacy "general" and "agency-founder-finance" kept for in-flight compatibility.';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid';
--   SELECT source, count(*) FROM leads GROUP BY source;
