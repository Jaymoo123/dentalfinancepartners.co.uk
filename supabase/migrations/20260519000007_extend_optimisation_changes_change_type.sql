-- ============================================================================
-- EXTEND change_type CHECK CONSTRAINT on optimisation_changes
-- ============================================================================
-- Migration: 20260519000007_extend_optimisation_changes_change_type.sql
-- Date: 2026-05-19
-- Purpose: The apply modules use change_type values that match action_kind.
--          Extend the CHECK constraint so audit rows can be persisted for
--          in_text_embedding, new_content (already there), faq_addition,
--          and all the format types.
-- ============================================================================

ALTER TABLE public.optimisation_changes
  DROP CONSTRAINT IF EXISTS optimisation_changes_change_type_check;

ALTER TABLE public.optimisation_changes
  ADD CONSTRAINT optimisation_changes_change_type_check
  CHECK (change_type = ANY (ARRAY[
    -- Original values
    'title_meta_rewrite'::text,
    'section_expansion'::text,
    'internal_link'::text,
    'schema_addition'::text,
    'intent_realignment'::text,
    'new_content'::text,
    'keyword_gap'::text,
    'competitor_gap'::text,
    'other'::text,
    -- Aligned with apply module CHANGE_TYPE constants
    'in_text_embedding'::text,
    'faq_addition'::text,
    'external_link'::text,
    'meta_only'::text,
    'schema_only'::text,
    'new_section'::text,
    'new_page'::text,
    -- Session 3 format types
    'glossary_entry'::text,
    'pillar_guide'::text,
    'case_study'::text,
    'comparison_page'::text
  ]));
