-- ============================================================================
-- DISCOVERY ENGINE V2 - COMPETITOR/TOPIC DISCOVERY TABLES
-- ============================================================================
-- Migration: 20260815000001_discovery_engine_v2.sql
-- Date: 2026-08-15
-- Purpose: Unified candidate pool for topic/keyword discovery (6 sources),
--          competitor sitemap monitor state (first-seen per URL), typed
--          discovery event log, and PAA/SERP-feature columns on
--          competitor_serps so DataForSEO advanced-response features land
--          somewhere queryable instead of only raw_response.
--
-- Design notes:
--   * site_key matches public.sites registry (canonical identifier).
--   * discovery_candidates UNIQUE(site_key, candidate) - idempotent re-runs.
--   * competitor_urls_seen UNIQUE(site_key, url) - monitor re-runs are no-ops.
--   * No RLS policies here: these are backend-only tables written via the
--     service-role key, same posture as the other optimisation_engine tables.
-- ============================================================================


-- ============================================================================
-- TABLE 1: DISCOVERY_CANDIDATES (unified pool)
-- ============================================================================
-- One row per candidate topic/keyword per site, from any of six sources:
-- sitemap | dfs_ranked | dfs_intersection | gsc | bing | bing_kw | autocomplete

CREATE TABLE IF NOT EXISTS public.discovery_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  candidate TEXT NOT NULL,                -- keyword or slug-derived topic
  source TEXT NOT NULL CHECK (source = ANY (ARRAY[
    'sitemap'::text, 'dfs_ranked'::text, 'dfs_intersection'::text,
    'gsc'::text, 'bing'::text, 'bing_kw'::text, 'autocomplete'::text
  ])),
  volume INTEGER,                         -- monthly search volume (null until enriched)
  kd NUMERIC,                             -- keyword difficulty 0-100
  cpc NUMERIC,                            -- GBP
  intent TEXT,                            -- informational | commercial | transactional
  winnability NUMERIC,                    -- 0-1 factor from SERP verify (dual mode)
  novelty NUMERIC,                        -- 1 - max overlap vs own inventory
  score NUMERIC,                          -- demand x winnability x novelty x intent_weight
  lane TEXT,                              -- specialism lane (per-site taxonomy)
  status TEXT NOT NULL DEFAULT 'candidate' CHECK (status = ANY (ARRAY[
    'candidate'::text, 'shortlisted'::text, 'picked'::text,
    'rejected'::text, 'covered'::text
  ])),
  raw JSONB,                              -- source payload for re-analysis
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (site_key, candidate)
);

CREATE INDEX IF NOT EXISTS idx_discovery_candidates_site_score
  ON public.discovery_candidates (site_key, score DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_discovery_candidates_site_lane
  ON public.discovery_candidates (site_key, lane);

COMMENT ON TABLE public.discovery_candidates IS
  'Unified topic/keyword candidate pool for discovery engine v2. One row per candidate per site; enrichment fills volume/kd/winnability/novelty/score.';


-- ============================================================================
-- TABLE 2: COMPETITOR_URLS_SEEN (monitor state)
-- ============================================================================
-- First-seen inventory per competitor URL. The weekly monitor diffs live
-- sitemaps against this table; new rows = newly published competitor pages.
-- first_seen is a publish-date proxy and drives velocity calculations.

CREATE TABLE IF NOT EXISTS public.competitor_urls_seen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  competitor_domain TEXT NOT NULL,
  brand_category TEXT CHECK (brand_category = ANY (ARRAY[
    'accountant'::text, 'software'::text, 'media'::text, 'adjacent'::text
  ])),
  url TEXT NOT NULL,
  slug TEXT,
  lastmod TEXT,                           -- as reported by sitemap (hint only)
  first_seen DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT,                             -- fetched on enrichment
  mapped_query TEXT,                      -- slug-token query guess
  our_coverage NUMERIC,                   -- max Jaccard vs own inventory at detection time
  lane TEXT,
  score NUMERIC,                          -- novelty x lane-velocity (x serp-entry when checked)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (site_key, url)
);

CREATE INDEX IF NOT EXISTS idx_competitor_urls_seen_site_domain
  ON public.competitor_urls_seen (site_key, competitor_domain, first_seen DESC);

COMMENT ON TABLE public.competitor_urls_seen IS
  'Competitor sitemap monitor state: first-seen per URL. UNIQUE(site_key,url) makes weekly re-runs idempotent.';


-- ============================================================================
-- TABLE 3: DISCOVERY_LOG (typed events)
-- ============================================================================
-- Typed discovery events emitted by the monitor and future SERP/AI-citation
-- watchers. kind reserves serp_entry for later AI-answer/SERP-entry events.

CREATE TABLE IF NOT EXISTS public.discovery_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  kind TEXT NOT NULL CHECK (kind = ANY (ARRAY[
    'netnew_candidate'::text, 'defend_lane'::text, 'serp_entry'::text
  ])),
  payload JSONB NOT NULL,
  week DATE NOT NULL DEFAULT CURRENT_DATE, -- ISO week anchor (run date)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_discovery_log_site_week
  ON public.discovery_log (site_key, week DESC, kind);

COMMENT ON TABLE public.discovery_log IS
  'Typed discovery events (netnew_candidate | defend_lane | serp_entry) from the competitor monitor. Weekly digest reads from here.';


-- ============================================================================
-- ALTER: COMPETITOR_SERPS - PAA + SERP FEATURES
-- ============================================================================
-- DataForSEO advanced SERP responses carry people_also_ask and feature blocks
-- that were previously discarded (only organic parsed). Store them queryably.

ALTER TABLE public.competitor_serps ADD COLUMN IF NOT EXISTS paa JSONB;
ALTER TABLE public.competitor_serps ADD COLUMN IF NOT EXISTS serp_features JSONB;

COMMENT ON COLUMN public.competitor_serps.paa IS
  'People-also-ask items from DataForSEO advanced response (question, answer snippet, source url).';
COMMENT ON COLUMN public.competitor_serps.serp_features IS
  'Non-organic SERP feature types present (featured_snippet, ai_overview, local_pack, ...).';
