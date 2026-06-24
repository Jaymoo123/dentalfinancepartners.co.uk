-- Migration: 20260624000001_test_data_isolation.sql
-- Date: 2026-06-24 (Property process audit, Wave 1 foundation)
-- Purpose: Reserve source='test' on the leads table so synthetic/test leads
--          (post-deploy smoke checks) are a first-class, isolated value. Routing
--          (Property/web/src/lib/lead-routing.ts) sends source='test' ONLY to the
--          operator (never a vendor), the enrich route skips it, and the
--          forwarding/billing reconciliation excludes it. Analytics-side test
--          isolation needs NO schema change: synthetic browser traffic is minted
--          with a "synthetic_" visitor-id prefix and flagged is_bot=true in the
--          track handler, so it is already excluded by every is_bot=false rollup,
--          detector and the vw_experiment_results view.
--
-- Strictly additive (widens the allowed set only) -> all existing rows still pass,
-- no UPDATE needed. NOTE: apply manually via Supabase SQL (Management API).
--
-- AT APPLY TIME: re-read the live constraint def first and reconcile the list:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid'
--     AND conrelid = 'leads'::regclass;
-- Live def expected (per applied 20260614000002):
--   CHECK (source IN ('dentists','property','medical','solicitors','generalist',
--     'general','agency','agency-founder-finance','contractors-ir35',
--     'construction-cis') OR source IS NULL)

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
      'construction-cis',
      'test'
    )
    OR source IS NULL
  );

COMMENT ON COLUMN leads.source IS
  'Which niche the lead came from: dentists, property, medical, solicitors, generalist, agency, contractors-ir35, construction-cis. "test" = synthetic post-deploy probe (operator-only, never billed, never sent to a vendor). Legacy "general"/"agency-founder-finance" kept for in-flight compatibility.';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid';
--   -- a probe insert must succeed and then be deleted by the smoke check:
--   --   INSERT ... (source='test', message='__synthetic_probe__') ; DELETE ... ;
