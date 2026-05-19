-- ============================================================================
-- EXTEND action_kind CHECK CONSTRAINT for new format pages
-- ============================================================================
-- Migration: 20260519000006_extend_action_kind_for_formats.sql
-- Date: 2026-05-19
-- Purpose: Allow new action_kind values for the four format-page apply
--          modules: glossary_entry, pillar_guide, case_study, comparison_page.
-- ============================================================================

ALTER TABLE public.optimisation_opportunities
  DROP CONSTRAINT IF EXISTS optimisation_opportunities_action_kind_check;

ALTER TABLE public.optimisation_opportunities
  ADD CONSTRAINT optimisation_opportunities_action_kind_check
  CHECK (action_kind IS NULL OR action_kind = ANY (ARRAY[
    'in_text_embedding'::text,
    'new_section'::text,
    'faq_addition'::text,
    'new_page'::text,
    'meta_only'::text,
    'schema_only'::text,
    'internal_links_only'::text,
    'skip'::text,
    -- Session 3 additions (2026-05-19)
    'glossary_entry'::text,
    'pillar_guide'::text,
    'case_study'::text,
    'comparison_page'::text
  ]));
