-- ============================================================================
-- OPTIMISATION ENGINE - DATABASE SCHEMA
-- ============================================================================
-- Migration: 20260519000002_create_optimisation_engine_tables.sql
-- Date: 2026-05-19
-- Purpose: Add tables for the weekly optimisation engine that wraps the
--          existing GSC pipeline with query-level data, third-party keyword
--          intelligence (DataForSEO), Bing data (schema only this round),
--          a central API cost ledger, and a per-change audit log so that
--          performance for any shipped change can be derived for any window.
--
-- Design notes:
--   * Existing gsc_page_performance, blog_optimizations, gsc_indexing_issues
--     are reused. This migration only adds NEW tables.
--   * 'site_key' is the new canonical site identifier
--     (agency | property | dentists | generalist). It matches the 'niche'
--     column already in use by the existing GSC tables.
--   * No hardcoded weekly buckets in optimisation_changes — performance is
--     derived by joining target_url x gsc_page_performance over arbitrary
--     date windows relative to shipped_at.
-- ============================================================================


-- ============================================================================
-- TABLE 1: SITES REGISTRY
-- ============================================================================
-- Single source of truth for which sites the optimisation engine runs against.
-- Mirrors data already in each site's niche.config.json + agents/config/gsc_config.py
-- but persists it where SQL queries can join against it.

CREATE TABLE IF NOT EXISTS public.sites (
  site_key TEXT PRIMARY KEY CHECK (site_key = ANY (ARRAY[
    'property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text,
    'agency'::text, 'generalist'::text
  ])),
  display_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  gsc_property_url TEXT,
  bing_property_url TEXT,
  niche TEXT,
  target_buyer_persona TEXT,
  brand_voice_notes TEXT,
  content_dir TEXT,
  git_repo_path TEXT,
  blog_topics_table TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.sites IS
  'Registry of sites the optimisation engine runs against. site_key is the canonical identifier.';

INSERT INTO public.sites (site_key, display_name, domain, gsc_property_url, niche, target_buyer_persona, content_dir, git_repo_path, blog_topics_table, active)
VALUES
  ('agency',     'Agency Founder Finance',  'www.agencyfounderfinance.co.uk',  'sc-domain:agencyfounderfinance.co.uk',  'agency',     'UK and UAE agency founders across marketing, creative, digital, advertising, PR, web, SEO, recruitment', 'Digital Agency/web/content/blog', 'Digital Agency/web', 'blog_topics_agency',    true),
  ('property',   'Property Tax Partners',   'www.propertytaxpartners.co.uk',   'sc-domain:propertytaxpartners.co.uk',   'property',   'UK landlords, buy-to-let investors, property developers',                                              'Property/web/content/blog',       'Property/web',        'blog_topics_property',  true),
  ('dentists',   'Dental Finance Partners', 'www.dentalfinancepartners.co.uk', 'https://www.dentalfinancepartners.co.uk/', 'dentists', 'UK dental practice owners and associate dentists',                                                     'Dentists/web/content/blog',       'Dentists/web',        'blog_topics_dentists',  true),
  ('generalist', 'Holloway Davies',         'www.hollowaydavies.co.uk',        'sc-domain:hollowaydavies.co.uk',        'generalist', 'UK limited company directors, contractors, sole traders, partnerships across all sectors',             'generalist/web/content/blog',     'generalist/web',      'blog_topics_generalist', true)
ON CONFLICT (site_key) DO UPDATE
  SET display_name = EXCLUDED.display_name,
      domain = EXCLUDED.domain,
      gsc_property_url = EXCLUDED.gsc_property_url,
      niche = EXCLUDED.niche,
      content_dir = EXCLUDED.content_dir,
      git_repo_path = EXCLUDED.git_repo_path,
      blog_topics_table = EXCLUDED.blog_topics_table,
      updated_at = now();


-- ============================================================================
-- TABLE 2: GSC_QUERY_DATA (page + query + date)
-- ============================================================================
-- Daily/weekly query-level GSC snapshots. Complements gsc_page_performance
-- (which only stores page+date). Needed for: title/meta rewrites driven by
-- the dominant query cluster, intent-mismatch detection, query coverage
-- analysis, cannibalisation detection.

CREATE TABLE IF NOT EXISTS public.gsc_query_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  page_url TEXT NOT NULL,
  query TEXT NOT NULL,

  -- The date the metrics are FOR (GSC delivers per-day data when requested with the date dimension)
  date DATE NOT NULL,

  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(10, 6) DEFAULT 0,
  position DECIMAL(10, 2) DEFAULT 0,

  UNIQUE(site_key, page_url, query, date)
);

CREATE INDEX IF NOT EXISTS idx_gsc_query_data_site_date ON public.gsc_query_data(site_key, date DESC);
CREATE INDEX IF NOT EXISTS idx_gsc_query_data_page ON public.gsc_query_data(page_url);
CREATE INDEX IF NOT EXISTS idx_gsc_query_data_query ON public.gsc_query_data(query);
CREATE INDEX IF NOT EXISTS idx_gsc_query_data_site_page_date ON public.gsc_query_data(site_key, page_url, date DESC);

COMMENT ON TABLE public.gsc_query_data IS
  'Daily GSC snapshots at page + query granularity. Drives intent matching, title/meta rewrites, and cannibalisation detection.';


-- ============================================================================
-- TABLE 3: BING_QUERY_DATA  (schema only this session; ingestion deferred)
-- ============================================================================
-- Same shape as gsc_query_data so we can drop in Bing Webmaster ingestion
-- in a later session without further schema changes.

CREATE TABLE IF NOT EXISTS public.bing_query_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  page_url TEXT NOT NULL,
  query TEXT NOT NULL,
  date DATE NOT NULL,

  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(10, 6) DEFAULT 0,
  position DECIMAL(10, 2) DEFAULT 0,

  UNIQUE(site_key, page_url, query, date)
);

CREATE INDEX IF NOT EXISTS idx_bing_query_data_site_date ON public.bing_query_data(site_key, date DESC);
CREATE INDEX IF NOT EXISTS idx_bing_query_data_page ON public.bing_query_data(page_url);

COMMENT ON TABLE public.bing_query_data IS
  'Schema-only this round. Bing Webmaster Tools ingestion deferred to a later session per user direction (2026-05-19).';


-- ============================================================================
-- TABLE 4: DATAFORSEO_KEYWORD_DATA
-- ============================================================================
-- Raw DataForSEO Labs keyword data (suggestions, related, ideas, bulk KD).
-- Full jsonb response stored so future analysis is FREE (no re-billing).

CREATE TABLE IF NOT EXISTS public.dataforseo_keyword_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  endpoint TEXT NOT NULL,        -- e.g. 'keyword_suggestions/live', 'bulk_keyword_difficulty/live'
  seed_keyword TEXT,             -- The seed used (NULL for bulk endpoints)
  location_code INTEGER,         -- e.g. 2826 = United Kingdom
  language_code TEXT,            -- e.g. 'en'

  -- Per-row extracted fields (one DataForSEO response can produce many rows;
  -- this table stores one row per related keyword found).
  related_keyword TEXT,
  search_volume INTEGER,
  keyword_difficulty INTEGER,    -- 0-100
  cpc DECIMAL(10, 2),            -- USD
  competition DECIMAL(10, 4),    -- 0-1
  competition_level TEXT,        -- LOW / MEDIUM / HIGH
  search_intent TEXT,            -- DataForSEO intent classification when present
  serp_features JSONB,           -- Array of SERP features observed (PAA, video, etc.)

  -- Full raw payload from the API call this row was extracted from.
  -- One raw_response is shared across all rows from the same call (deduped by api_cost_log.id).
  api_cost_log_id UUID,
  raw_response JSONB,

  date_pulled DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_site_date ON public.dataforseo_keyword_data(site_key, date_pulled DESC);
CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_keyword ON public.dataforseo_keyword_data(related_keyword);
CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_seed ON public.dataforseo_keyword_data(seed_keyword);
CREATE INDEX IF NOT EXISTS idx_dataforseo_kw_endpoint ON public.dataforseo_keyword_data(endpoint);

COMMENT ON TABLE public.dataforseo_keyword_data IS
  'Per-row extracted DataForSEO Labs data. raw_response holds the original JSON so re-analysis never re-bills.';


-- ============================================================================
-- TABLE 5: DATAFORSEO_COMPETITOR_DATA
-- ============================================================================
-- Output of competitors_domain + ranked_keywords endpoints.

CREATE TABLE IF NOT EXISTS public.dataforseo_competitor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  competitor_domain TEXT NOT NULL,

  -- For competitors_domain results
  intersection_count INTEGER,    -- Keywords both we and competitor rank for
  competitor_rank_score INTEGER, -- DataForSEO competitor strength score

  -- For ranked_keywords results (one row per keyword)
  ranked_keyword TEXT,
  position INTEGER,
  search_volume INTEGER,
  keyword_difficulty INTEGER,
  cpc DECIMAL(10, 2),
  traffic_estimate INTEGER,
  url TEXT,                      -- Competitor's URL ranking for this keyword

  api_cost_log_id UUID,
  raw_response JSONB,

  date_pulled DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_dataforseo_comp_site_date ON public.dataforseo_competitor_data(site_key, date_pulled DESC);
CREATE INDEX IF NOT EXISTS idx_dataforseo_comp_domain ON public.dataforseo_competitor_data(competitor_domain);
CREATE INDEX IF NOT EXISTS idx_dataforseo_comp_keyword ON public.dataforseo_competitor_data(ranked_keyword);

COMMENT ON TABLE public.dataforseo_competitor_data IS
  'Competitor intelligence from DataForSEO competitors_domain and ranked_keywords endpoints.';


-- ============================================================================
-- TABLE 6: API_COST_LOG
-- ============================================================================
-- Central ledger of every paid API call. Critical for DataForSEO budget
-- discipline. The DataForSEO client must INSERT a row BEFORE making each
-- billable call so partial-failure cases are still accounted for, and then
-- UPDATE with the actual cost from the response.

CREATE TABLE IF NOT EXISTS public.api_cost_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  api_provider TEXT NOT NULL,    -- 'dataforseo', 'anthropic', 'deepseek', 'serper', 'pexels', etc.
  endpoint TEXT NOT NULL,
  site_key TEXT REFERENCES public.sites(site_key),
  niche TEXT,                    -- Mirror of site_key for legacy compatibility

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status = ANY (ARRAY['pending'::text, 'success'::text, 'failed'::text, 'aborted_budget'::text])),

  cost_usd DECIMAL(12, 6) NOT NULL DEFAULT 0,
  estimated_cost_usd DECIMAL(12, 6),  -- Cost we expected before the call
  request_payload JSONB,
  response_size_bytes INTEGER,
  response_status_code INTEGER,
  error_message TEXT,

  -- Idempotency: same site + endpoint + payload hash + date should not double-charge
  idempotency_key TEXT,

  date_called DATE NOT NULL DEFAULT CURRENT_DATE,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_api_cost_log_provider_date ON public.api_cost_log(api_provider, date_called DESC);
CREATE INDEX IF NOT EXISTS idx_api_cost_log_site_date ON public.api_cost_log(site_key, date_called DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_api_cost_log_idempotency
  ON public.api_cost_log(idempotency_key)
  WHERE idempotency_key IS NOT NULL AND status IN ('pending', 'success');

COMMENT ON TABLE public.api_cost_log IS
  'Every paid API call. Insert with status=pending BEFORE making the call. Update with actual cost on success.';

COMMENT ON COLUMN public.api_cost_log.idempotency_key IS
  'Same key across same site + endpoint + payload + date prevents re-billing on retry.';


-- ============================================================================
-- TABLE 7: OPTIMISATION_CHANGES (the audit log)
-- ============================================================================
-- Every change shipped to a site, of any type, by the optimisation engine.
-- Performance over time is derived by joining target_url against
-- gsc_page_performance / gsc_query_data with arbitrary date windows
-- relative to shipped_at.

CREATE TABLE IF NOT EXISTS public.optimisation_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),

  change_type TEXT NOT NULL CHECK (change_type = ANY (ARRAY[
    'title_meta_rewrite'::text,
    'section_expansion'::text,
    'internal_link'::text,
    'schema_addition'::text,
    'intent_realignment'::text,
    'new_content'::text,
    'keyword_gap'::text,
    'competitor_gap'::text,
    'other'::text
  ])),

  -- What was changed
  target_url TEXT NOT NULL,           -- Canonical page URL of the change
  target_slug TEXT,
  files_changed TEXT[] NOT NULL,      -- Array of repo-relative paths
  before_snapshot TEXT,               -- Pre-change content (full file or relevant block)
  after_snapshot TEXT,                -- Post-change content
  diff_summary TEXT,                  -- Plain-English summary

  -- Link back to the opportunity that triggered this change, if any
  blog_optimization_id UUID REFERENCES public.blog_optimizations(id),

  -- GSC baseline at shipping time. Captures impressions/clicks/position/CTR
  -- aggregated over the 28d preceding shipped_at, so we have a comparison
  -- point that doesn't depend on the gsc_page_performance table still
  -- containing that history.
  gsc_baseline JSONB,

  -- Git tracking
  git_commit_hash TEXT,
  git_branch TEXT,

  -- Lifecycle
  shipped_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  performance_review_due_at TIMESTAMPTZ,  -- e.g. shipped_at + 28 days

  -- Auto-applied vs queued for review
  auto_applied BOOLEAN NOT NULL DEFAULT false,
  confidence TEXT CHECK (confidence = ANY (ARRAY['high'::text, 'medium'::text, 'low'::text])),

  -- Outcome (filled in later by the performance review job)
  outcome_verdict TEXT CHECK (outcome_verdict = ANY (ARRAY['positive'::text, 'negative'::text, 'neutral'::text, 'pending'::text])),
  outcome_notes TEXT,

  -- Rollback support
  rolled_back BOOLEAN NOT NULL DEFAULT false,
  rolled_back_at TIMESTAMPTZ,
  rollback_reason TEXT,
  rollback_commit_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_opt_changes_site ON public.optimisation_changes(site_key);
CREATE INDEX IF NOT EXISTS idx_opt_changes_shipped ON public.optimisation_changes(shipped_at DESC);
CREATE INDEX IF NOT EXISTS idx_opt_changes_url ON public.optimisation_changes(target_url);
CREATE INDEX IF NOT EXISTS idx_opt_changes_type ON public.optimisation_changes(change_type);
CREATE INDEX IF NOT EXISTS idx_opt_changes_outcome ON public.optimisation_changes(outcome_verdict) WHERE outcome_verdict IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_opt_changes_review_due ON public.optimisation_changes(performance_review_due_at) WHERE outcome_verdict IS NULL OR outcome_verdict = 'pending';

COMMENT ON TABLE public.optimisation_changes IS
  'Audit log of every change shipped by the optimisation engine. Performance over arbitrary windows is derived by joining target_url against gsc_page_performance.';

COMMENT ON COLUMN public.optimisation_changes.gsc_baseline IS
  'Frozen GSC baseline at shipping time: {impressions_28d, clicks_28d, avg_position_28d, avg_ctr_28d, baseline_period_start, baseline_period_end}. Survives even if gsc_page_performance loses old rows.';


-- ============================================================================
-- TABLE 8: OPTIMISATION_OPPORTUNITIES (the queued-for-review backlog)
-- ============================================================================
-- Opportunities surfaced by the analysis pipeline that are NOT auto-applied.
-- These are the medium/low-confidence proposals that require user approval
-- before they become a row in optimisation_changes.
--
-- High-confidence proposals (title/meta rewrites with clear CTR signal,
-- schema additions, internal links) are auto-applied and write directly to
-- optimisation_changes without going through this table.

CREATE TABLE IF NOT EXISTS public.optimisation_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),

  opportunity_type TEXT NOT NULL CHECK (opportunity_type = ANY (ARRAY[
    'new_page'::text,
    'expand_page'::text,
    'rewrite_title_meta'::text,
    'add_section'::text,
    'internal_link'::text,
    'schema_addition'::text,
    'intent_realignment'::text,
    'competitor_gap'::text
  ])),

  target_url TEXT,                       -- Existing page (NULL for new_page)
  target_query_cluster TEXT[],           -- Cluster of queries this is about
  primary_query TEXT,                    -- The dominant query

  recommended_action TEXT NOT NULL,
  rationale TEXT,
  supporting_data JSONB,                 -- GSC metrics, competitor data, etc.

  score INTEGER CHECK (score BETWEEN 0 AND 100),
  confidence TEXT CHECK (confidence = ANY (ARRAY['high'::text, 'medium'::text, 'low'::text])),

  status TEXT NOT NULL DEFAULT 'proposed'
    CHECK (status = ANY (ARRAY[
      'proposed'::text, 'approved'::text, 'in_progress'::text,
      'shipped'::text, 'rejected'::text, 'superseded'::text
    ])),

  -- When status moves to 'shipped', this points at the actual change record
  applied_change_id UUID REFERENCES public.optimisation_changes(id),

  notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,

  -- Dedup: same site + opportunity_type + target_url + primary_query is unique
  data_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_opportunities_site_status ON public.optimisation_opportunities(site_key, status);
CREATE INDEX IF NOT EXISTS idx_opportunities_score ON public.optimisation_opportunities(score DESC) WHERE status = 'proposed';
CREATE INDEX IF NOT EXISTS idx_opportunities_target_url ON public.optimisation_opportunities(target_url);
CREATE UNIQUE INDEX IF NOT EXISTS idx_opportunities_dedup
  ON public.optimisation_opportunities(site_key, opportunity_type, COALESCE(target_url, ''), COALESCE(primary_query, ''))
  WHERE status IN ('proposed', 'approved', 'in_progress');

COMMENT ON TABLE public.optimisation_opportunities IS
  'Queued optimisation proposals awaiting review. Auto-applied high-confidence changes go straight to optimisation_changes and skip this table.';


-- ============================================================================
-- ROW LEVEL SECURITY (match existing convention)
-- ============================================================================

ALTER TABLE public.sites                          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gsc_query_data                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bing_query_data                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dataforseo_keyword_data        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dataforseo_competitor_data     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_cost_log                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.optimisation_changes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.optimisation_opportunities     ENABLE ROW LEVEL SECURITY;

-- Read-all / write-authenticated, matching the existing GSC tables' pattern.

CREATE POLICY "Enable read access for all users" ON public.sites FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.sites FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.sites FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.gsc_query_data FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.gsc_query_data FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.bing_query_data FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.bing_query_data FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.dataforseo_keyword_data FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.dataforseo_keyword_data FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.dataforseo_competitor_data FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.dataforseo_competitor_data FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.api_cost_log FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.api_cost_log FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.api_cost_log FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.optimisation_changes FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.optimisation_changes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.optimisation_changes FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.optimisation_opportunities FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.optimisation_opportunities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.optimisation_opportunities FOR UPDATE USING (auth.role() = 'authenticated');


-- ============================================================================
-- VIEW: vw_change_performance (time-series performance for any shipped change)
-- ============================================================================
-- Answers: "you made this change N days ago, here's how it has performed since."
-- Joins optimisation_changes to gsc_page_performance (which is daily) so the
-- caller can filter to any window relative to shipped_at.

CREATE OR REPLACE VIEW public.vw_change_performance AS
SELECT
  oc.id                  AS change_id,
  oc.site_key,
  oc.change_type,
  oc.target_url,
  oc.shipped_at,
  oc.confidence,
  oc.outcome_verdict,
  oc.git_commit_hash,
  gpp.date               AS perf_date,
  (gpp.date - oc.shipped_at::date) AS days_since_shipped,
  gpp.impressions,
  gpp.clicks,
  gpp.ctr,
  gpp.position
FROM public.optimisation_changes oc
LEFT JOIN public.gsc_page_performance gpp
  ON gpp.page_url = oc.target_url
 AND gpp.niche = oc.site_key;

COMMENT ON VIEW public.vw_change_performance IS
  'One row per (change x date in gsc_page_performance). Filter by days_since_shipped for windowed analysis.';


-- ============================================================================
-- VERIFICATION HINTS
-- ============================================================================
-- SELECT site_key, display_name, gsc_property_url FROM public.sites;
-- SELECT COUNT(*) FROM public.gsc_query_data WHERE site_key = 'agency';
-- SELECT api_provider, SUM(cost_usd) FROM public.api_cost_log WHERE date_called = CURRENT_DATE GROUP BY 1;
-- SELECT change_id, target_url, days_since_shipped, impressions, position
--   FROM public.vw_change_performance
--   WHERE change_id = '<uuid>' AND days_since_shipped BETWEEN 0 AND 28;
