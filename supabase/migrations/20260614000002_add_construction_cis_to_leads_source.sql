-- Migration: 20260614000002_add_construction_cis_to_leads_source.sql
-- Date: 2026-06-12
-- Purpose: Add 'construction-cis' to the leads.source CHECK constraint ahead
--          of the Build Finance Partners launch. Mirrors the 20260613000002
--          (contractors-ir35) pattern. No historical rows exist for this key,
--          so no UPDATE is needed.
--
-- DRAFTED LOCAL-FIRST 2026-06-12: the live pg_constraint read was not
-- performed at draft time (prod access gated). Expected live def, per the
-- applied 20260613000002 migration:
--   leads_source_valid: CHECK (((source = ANY (ARRAY['dentists','property',
--     'medical','solicitors','generalist','general','agency',
--     'agency-founder-finance','contractors-ir35'])) OR (source IS NULL)))
-- AT APPLY TIME: re-read the live constraint def first and reconcile:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname LIKE '%source%'
--     AND conrelid = 'leads'::regclass;
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
      'contractors-ir35',
      'construction-cis'
    )
    OR source IS NULL
  );

COMMENT ON COLUMN leads.source IS
  'Identifies which niche the lead came from: dentists, property, medical, solicitors, generalist, agency, contractors-ir35, or construction-cis. Legacy "general" and "agency-founder-finance" kept for in-flight compatibility.';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid';
--   SELECT source, count(*) FROM leads GROUP BY source;
