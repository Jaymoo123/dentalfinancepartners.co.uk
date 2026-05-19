-- ============================================================================
-- ADD ACTION-PLAN COLUMNS TO optimisation_opportunities
-- ============================================================================
-- Migration: 20260519000004_add_action_plan_columns.sql
-- Date: 2026-05-19
-- Purpose: Store the structured patch plan produced by the Action Specifier
--          reasoning checkpoint (Checkpoint 4).
-- ============================================================================

ALTER TABLE public.optimisation_opportunities
  ADD COLUMN IF NOT EXISTS action_kind TEXT;

ALTER TABLE public.optimisation_opportunities
  ADD COLUMN IF NOT EXISTS action_plan JSONB;

ALTER TABLE public.optimisation_opportunities
  ADD COLUMN IF NOT EXISTS action_plan_confidence INTEGER;

ALTER TABLE public.optimisation_opportunities
  ADD COLUMN IF NOT EXISTS action_plan_generated_at TIMESTAMPTZ;

ALTER TABLE public.optimisation_opportunities
  ADD COLUMN IF NOT EXISTS action_plan_validated BOOLEAN DEFAULT false;

-- action_kind values produced by Action Specifier:
--   in_text_embedding  - weave query variants into existing prose
--   new_section        - add new H2 + body (~300-500 words)
--   faq_addition       - append entry to YAML faqs[] array
--   new_page           - build a new page (separate full-content workflow)
--   meta_only          - rewrite metaTitle + metaDescription only
--   schema_only        - add/extend structured data (JSON-LD)
--   internal_links_only- only add internal links pointing to this page

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
    'skip'::text
  ]));

CREATE INDEX IF NOT EXISTS idx_opportunities_action_kind
  ON public.optimisation_opportunities(action_kind)
  WHERE action_kind IS NOT NULL;

COMMENT ON COLUMN public.optimisation_opportunities.action_kind IS
  'Concrete change category decided by the Action Specifier checkpoint.';
COMMENT ON COLUMN public.optimisation_opportunities.action_plan IS
  'JSON patch plan: insertion points, new content, internal-link implications.';
