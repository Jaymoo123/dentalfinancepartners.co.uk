-- Migration: 20260517010000_add_general_to_leads_source.sql
-- Date: 2026-05-17
-- Purpose: Update leads.source CHECK constraint to include the Holloway Davies
--          generalist UK accountancy site (sixth lead-gen handoff). Source
--          identifier is 'general' (not 'holloway-davies') to keep the source
--          column brand-stable if the trading name ever changes.
--
-- NOTE: Run manually via Supabase dashboard SQL editor on 2026-05-17.
--       This file is the canonical record of what was applied.

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (
    source IN (
      'dentists',
      'property',
      'medical',
      'solicitors',
      'general'
    )
    OR source IS NULL
  );

COMMENT ON COLUMN leads.source IS
  'Identifies which niche the lead came from: dentists, property, medical, solicitors, or general';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conname = 'leads_source_valid';
