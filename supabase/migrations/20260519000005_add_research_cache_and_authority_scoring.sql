-- ============================================================================
-- RESEARCH CACHE + CONTENT AUTHORITY SCORING
-- ============================================================================
-- Migration: 20260519000005_add_research_cache_and_authority_scoring.sql
-- Date: 2026-05-19
-- Purpose: Support the Research Synthesizer (Checkpoint 8). Cache fetched
--          source claims per topic so multiple pages on the same topic can
--          reuse the research. Track per-page citation diversity scores so
--          we can flag pages with thin sourcing.
-- ============================================================================

-- TABLE 1: research_cache
-- One row per (topic_key, source_url, fetched_date). Stores the SPECIFIC
-- extracted claims from a source page for a given topic. Re-running research
-- on the same topic within the cache TTL re-uses these rows; outside the TTL
-- we re-fetch.

CREATE TABLE IF NOT EXISTS public.research_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Topic key: normalised primary query so semantically equivalent topics
  -- share a cache entry. Stored as lowercase, whitespace-normalised.
  topic_key TEXT NOT NULL,
  topic_query TEXT NOT NULL,         -- the original query for reference

  -- Source identity
  source_url TEXT NOT NULL,
  source_domain TEXT NOT NULL,
  source_tier TEXT NOT NULL CHECK (source_tier = ANY (ARRAY[
    'canonical'::text,   -- gov.uk, legislation.gov.uk, HMRC manuals, ONS, IFS, OBR
    'authority'::text,   -- ICAEW, ACCA, CIOT, trade bodies, regulators
    'industry'::text,    -- Tax Journal, MoneyWeek, FT, Deloitte/PWC commentary
    'press'::text,       -- BBC, Telegraph, Guardian — only when topical
    'organic'::text      -- whoever else ranks (SERP top-10)
  ])),
  source_title TEXT,
  source_recency_date DATE,          -- date the source was published / updated
  source_authority_score INTEGER,    -- 0-100, see allowlist_authority_score()

  -- Extracted claims from this source for this topic
  -- Each claim is a structured object:
  --   {kind: 'statistic'|'rule'|'quote'|'definition'|'worked_example',
  --    text: '...',
  --    page_section: '...optional...',
  --    contains_number: bool,
  --    contains_date: bool}
  extracted_claims JSONB NOT NULL DEFAULT '[]'::jsonb,
  claims_count INTEGER NOT NULL DEFAULT 0,

  -- Raw extracted snippets for traceability
  raw_h1 TEXT,
  raw_h2s TEXT[],
  raw_excerpt TEXT,                  -- first 2000 chars of body

  UNIQUE (topic_key, source_url)
);

CREATE INDEX IF NOT EXISTS idx_research_cache_topic ON public.research_cache(topic_key);
CREATE INDEX IF NOT EXISTS idx_research_cache_fetched ON public.research_cache(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_cache_tier ON public.research_cache(source_tier);
CREATE INDEX IF NOT EXISTS idx_research_cache_domain ON public.research_cache(source_domain);

COMMENT ON TABLE public.research_cache IS
  'Per-topic, per-source extracted claims. TTL = 30 days by convention; '
  'older rows are re-fetched on demand. Drives research-grounded content writing.';


-- TABLE 2: content_authority_score
-- Per-shipped-page assessment of citation diversity, source quality, and
-- topical coverage. Computed after each apply and on demand.

CREATE TABLE IF NOT EXISTS public.content_authority_score (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  site_key TEXT NOT NULL REFERENCES public.sites(site_key),
  page_url TEXT NOT NULL,
  page_slug TEXT,

  -- Counts
  word_count INTEGER,
  total_citations INTEGER DEFAULT 0,
  unique_source_domains INTEGER DEFAULT 0,
  unique_source_tiers INTEGER DEFAULT 0,
  citations_per_1000_words DECIMAL(10, 2),

  -- Quality scores (0-100)
  citation_density_score INTEGER,       -- based on citations_per_1000_words
  source_diversity_score INTEGER,       -- based on unique domains + tiers
  source_quality_score INTEGER,         -- weighted average of source_authority_score
  overall_authority_score INTEGER,      -- weighted blend of above

  -- Diagnostics
  cited_domains TEXT[],
  citation_breakdown_by_tier JSONB,     -- {canonical: 3, authority: 2, ...}
  missing_canonical_sources BOOLEAN DEFAULT false,
  flags TEXT[],                          -- e.g. ['no_canonical_source', 'over_reliant_on_gov_uk']

  UNIQUE (page_url, computed_at)
);

CREATE INDEX IF NOT EXISTS idx_authority_score_page ON public.content_authority_score(page_url);
CREATE INDEX IF NOT EXISTS idx_authority_score_site ON public.content_authority_score(site_key);
CREATE INDEX IF NOT EXISTS idx_authority_score_overall ON public.content_authority_score(overall_authority_score);

COMMENT ON TABLE public.content_authority_score IS
  'Per-page citation diversity + source quality + topical coverage scoring. '
  'Computed after every apply and on demand; used to flag thinly-sourced pages.';


-- RLS
ALTER TABLE public.research_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_authority_score ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.research_cache FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.research_cache FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.research_cache FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.content_authority_score FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.content_authority_score FOR INSERT WITH CHECK (auth.role() = 'authenticated');
