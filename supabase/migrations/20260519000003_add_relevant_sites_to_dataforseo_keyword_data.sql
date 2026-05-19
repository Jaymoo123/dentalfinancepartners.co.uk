-- ============================================================================
-- ADD relevant_sites[] COLUMN TO dataforseo_keyword_data
-- ============================================================================
-- Migration: 20260519000003_add_relevant_sites_to_dataforseo_keyword_data.sql
-- Date: 2026-05-19
-- Purpose: Decouple "which site paid for this keyword" (site_key) from
--          "which sites is this keyword relevant to" (relevant_sites[]).
--          Populated by the cross_site_relevance reasoning checkpoint.
-- ============================================================================

ALTER TABLE public.dataforseo_keyword_data
  ADD COLUMN IF NOT EXISTS relevant_sites TEXT[];

ALTER TABLE public.dataforseo_keyword_data
  ADD COLUMN IF NOT EXISTS primary_site TEXT;

ALTER TABLE public.dataforseo_keyword_data
  ADD COLUMN IF NOT EXISTS cross_site_rationale TEXT;

ALTER TABLE public.dataforseo_keyword_data
  ADD COLUMN IF NOT EXISTS cross_site_scored_at TIMESTAMPTZ;

-- GIN index lets us do efficient `WHERE 'agency' = ANY(relevant_sites)` queries
CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_relevant_sites
  ON public.dataforseo_keyword_data USING GIN (relevant_sites);

CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_primary_site
  ON public.dataforseo_keyword_data(primary_site)
  WHERE primary_site IS NOT NULL;

COMMENT ON COLUMN public.dataforseo_keyword_data.relevant_sites IS
  'Array of site_keys this keyword is relevant to. Populated by the cross_site_relevance reasoning checkpoint.';

COMMENT ON COLUMN public.dataforseo_keyword_data.primary_site IS
  'The single site this keyword is MOST relevant to.';
