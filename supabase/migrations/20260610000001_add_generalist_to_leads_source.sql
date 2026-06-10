-- Migration: 20260610000001_add_generalist_to_leads_source.sql
-- Date: 2026-06-10
-- Purpose: Add 'generalist' to the leads.source CHECK constraint. D2 revision
--          (standardisation program, GAP-1): the canonical site key for
--          Holloway Davies is 'generalist' — it is the sites-registry key that
--          web_sessions.site_key is FK-constrained to, and the keyspace of
--          blog_topics and the optimisation-engine tables. The leads source
--          'general' was the one outlier (chosen 2026-05-17 before the
--          registry existed as an FK target).
--
-- 'general' stays in the allowlist as a transitional value (mirrors the
-- 'agency-founder-finance' precedent in 20260517020000). Historical rows are
-- updated to 'generalist' in the same change window; new submissions carry
-- 'generalist' from niche.config.json source_identifier.
--
-- NOTE: Run manually via Supabase SQL (Management API or dashboard).

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
      'agency-founder-finance'
    )
    OR source IS NULL
  );

UPDATE leads SET source = 'generalist' WHERE source = 'general';

COMMENT ON COLUMN leads.source IS
  'Identifies which niche the lead came from: dentists, property, medical, solicitors, generalist, or agency. Legacy "general" and "agency-founder-finance" kept for in-flight compatibility.';

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid';
--   SELECT source, count(*) FROM leads GROUP BY source;
