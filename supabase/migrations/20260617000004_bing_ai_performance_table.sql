-- ============================================================================
-- Migration: 20260617000004_bing_ai_performance_table.sql
-- Date: 2026-06-17
-- Purpose: GEO Measurement layer (Track B) -- Copilot AI Performance storage.
--
-- Creates public.bing_ai_performance to store per-page Copilot citation counts
-- ingested via BWT GetAiPerformance (see optimisation_engine/clients/
-- bing_query_client.py, BingAiPerformanceFetcher).
--
-- Shape mirrors bing_query_data (same site_key, page_url, date primary key
-- and UNIQUE constraint) so the two tables join cleanly and detectors can
-- treat them symmetrically.
--
-- ADDITIVE / idempotent (CREATE TABLE IF NOT EXISTS, CREATE INDEX IF NOT EXISTS).
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.bing_ai_performance (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key          TEXT        NOT NULL REFERENCES public.sites(site_key),
  page_url          TEXT        NOT NULL,
  date              DATE        NOT NULL,   -- snapshot date (today at fetch time)

  -- Copilot citation metrics
  -- ai_citations: times this page appeared in a Copilot / AI Search response.
  -- May equal "impressions" in BWT terminology if the API does not separate them.
  ai_citations      INTEGER     NOT NULL DEFAULT 0,
  clicks            INTEGER     NOT NULL DEFAULT 0,   -- clicks from Copilot citations

  -- Grounding queries: the Copilot queries that cited this page.
  -- Stored as a JSONB array (e.g. ["what is stamp duty", "landlord tax advice"]).
  -- NULL when the API does not return this field.
  grounding_queries JSONB,

  UNIQUE (site_key, page_url, date)
);

CREATE INDEX IF NOT EXISTS idx_bing_ai_perf_site_date
  ON public.bing_ai_performance (site_key, date DESC);

CREATE INDEX IF NOT EXISTS idx_bing_ai_perf_page
  ON public.bing_ai_performance (page_url);

CREATE INDEX IF NOT EXISTS idx_bing_ai_perf_citations
  ON public.bing_ai_performance (site_key, ai_citations DESC)
  WHERE ai_citations > 0;

COMMENT ON TABLE public.bing_ai_performance IS
  'Per-page Copilot AI citation counts from Bing Webmaster Tools GetAiPerformance. '
  'One snapshot row per (site_key, page_url, date). Ingested weekly by '
  'BingAiPerformanceFetcher in optimisation_engine/clients/bing_query_client.py. '
  'ai_citations = times this page appeared in a Copilot response; '
  'grounding_queries = JSONB array of Copilot queries that cited the page (if available).';

COMMENT ON COLUMN public.bing_ai_performance.ai_citations IS
  'Number of times this page appeared in a Copilot / BWT AI Search response '
  'in the trailing window ending on `date`. Trailing-window aggregate (not per-day).';

COMMENT ON COLUMN public.bing_ai_performance.grounding_queries IS
  'JSONB array of Copilot queries for which this page was a grounding source. '
  'NULL when the API does not return this field.';

-- RLS: same posture as bing_query_data (authenticated read, service_role write)
ALTER TABLE public.bing_ai_performance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bing_ai_perf_authenticated_read" ON public.bing_ai_performance;
CREATE POLICY "bing_ai_perf_authenticated_read"
  ON public.bing_ai_performance FOR SELECT TO authenticated USING (true);

GRANT SELECT ON public.bing_ai_performance TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bing_ai_performance TO service_role;

NOTIFY pgrst, 'reload schema';
