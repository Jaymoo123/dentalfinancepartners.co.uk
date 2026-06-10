-- ============================================================================
-- Migration: 20260605000003_extend_opportunity_types.sql
-- Date: 2026-06-05
-- Purpose: Let the behaviour (CRO) detectors persist their findings.
--
-- The optimisation_opportunities.opportunity_type column has an inline CHECK
-- constraint (defined in 20260519000002_create_optimisation_engine_tables.sql)
-- limited to SEO opportunity types. The new conversion-rate detectors emit
-- cro_* types; inserts FAIL until the constraint allows them.
--
-- Postgres auto-names an inline column CHECK
-- <table>_<column>_check, i.e. optimisation_opportunities_opportunity_type_check.
-- We drop and recreate it with the cro_* values appended. Existing rows are
-- unaffected (all current values remain valid).
-- ============================================================================

ALTER TABLE public.optimisation_opportunities
  DROP CONSTRAINT IF EXISTS optimisation_opportunities_opportunity_type_check;

ALTER TABLE public.optimisation_opportunities
  ADD CONSTRAINT optimisation_opportunities_opportunity_type_check
  CHECK (opportunity_type = ANY (ARRAY[
    -- existing SEO types
    'new_page'::text,
    'expand_page'::text,
    'rewrite_title_meta'::text,
    'add_section'::text,
    'internal_link'::text,
    'schema_addition'::text,
    'intent_realignment'::text,
    'competitor_gap'::text,
    -- new conversion-rate (CRO) types from behaviour_detectors
    'cro_funnel'::text,       -- biggest human stage-to-stage funnel drop
    'cro_calculator'::text,   -- calculator computed but rarely converts
    'cro_cta'::text,          -- high-traffic page, CTA ignored
    'cro_form'::text,         -- form field where users abandon
    'cro_ux'::text            -- rage/dead-click UX defect
  ]));

NOTIFY pgrst, 'reload schema';
