-- Migration: 20260517020000_add_agency_to_leads_source.sql
-- Date: 2026-05-17
-- Purpose: Add 'agency' to the leads.source CHECK constraint for the Agency
--          Founder Finance site. Until now the site sent 'agency-founder-finance'
--          which was not in the allowlist, so every lead it submitted was
--          silently rejected by Postgres.
--
-- This migration also keeps 'agency-founder-finance' in the allowlist as a
-- transitional courtesy in case any in-flight requests still carry the long
-- identifier between deploy and `niche.config.json` propagation.
--
-- NOTE: Run manually via Supabase dashboard SQL editor.

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (
    source IN (
      'dentists',
      'property',
      'medical',
      'solicitors',
      'general',
      'agency',
      'agency-founder-finance'
    )
    OR source IS NULL
  );

COMMENT ON COLUMN leads.source IS
  'Identifies which niche the lead came from: dentists, property, medical, solicitors, general, or agency. Legacy "agency-founder-finance" kept for in-flight compatibility.';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conname = 'leads_source_valid';
