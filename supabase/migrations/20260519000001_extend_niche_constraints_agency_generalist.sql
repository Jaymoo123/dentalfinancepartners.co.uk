-- ============================================================================
-- EXTEND GSC TABLE NICHE CONSTRAINTS: agency + generalist
-- ============================================================================
-- Migration: 20260519000001_extend_niche_constraints_agency_generalist.sql
-- Date: 2026-05-19
-- Purpose: Allow the weekly optimisation engine to write rows for the agency
--          (agencyfounderfinance.co.uk) and generalist (hollowaydavies.co.uk)
--          sites into the existing GSC tables. Until now those tables only
--          accepted property / dentists / medical / solicitors.
-- ============================================================================

ALTER TABLE public.gsc_page_performance DROP CONSTRAINT IF EXISTS gsc_page_performance_niche_check;
ALTER TABLE public.gsc_page_performance ADD CONSTRAINT gsc_page_performance_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text, 'agency'::text, 'generalist'::text]));

ALTER TABLE public.blog_optimizations DROP CONSTRAINT IF EXISTS blog_optimizations_niche_check;
ALTER TABLE public.blog_optimizations ADD CONSTRAINT blog_optimizations_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text, 'agency'::text, 'generalist'::text]));

ALTER TABLE public.gsc_indexing_issues DROP CONSTRAINT IF EXISTS gsc_indexing_issues_niche_check;
ALTER TABLE public.gsc_indexing_issues ADD CONSTRAINT gsc_indexing_issues_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text, 'agency'::text, 'generalist'::text]));

-- ============================================================================
-- EXTEND blog_optimizations.opportunity_type to cover non-content changes
-- ============================================================================
-- Original constraint: ('section_expansion', 'new_content', 'keyword_gap')
-- New types needed for the broader optimisation engine: title_meta_rewrite,
-- internal_link, schema_addition, intent_realignment, competitor_gap.

ALTER TABLE public.blog_optimizations DROP CONSTRAINT IF EXISTS blog_optimizations_opportunity_type_check;
ALTER TABLE public.blog_optimizations ADD CONSTRAINT blog_optimizations_opportunity_type_check
  CHECK (opportunity_type = ANY (ARRAY[
    'section_expansion'::text,
    'new_content'::text,
    'keyword_gap'::text,
    'title_meta_rewrite'::text,
    'internal_link'::text,
    'schema_addition'::text,
    'intent_realignment'::text,
    'competitor_gap'::text
  ]));
