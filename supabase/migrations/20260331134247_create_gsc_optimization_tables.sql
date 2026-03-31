-- ============================================================================
-- GSC SMART CONTENT OPTIMIZATION SYSTEM - DATABASE SCHEMA
-- ============================================================================
-- Migration: 20260331134247_create_gsc_optimization_tables.sql
-- Date: 2026-03-31
-- Purpose: Create tables for GSC-driven content optimization system
--
-- Tables Created:
-- 1. gsc_page_performance - Raw GSC performance data (daily snapshots)
-- 2. blog_optimizations - Optimization opportunities and tracking
-- 3. gsc_indexing_issues - Indexing/schema issues from URL Inspection API
-- 4. Updates to blog_topics_property and blog_topics - Add optimization tracking
-- ============================================================================

-- ============================================================================
-- TABLE 1: GSC_PAGE_PERFORMANCE
-- ============================================================================
-- Stores daily GSC performance metrics for all pages across all niches
-- Used for trend analysis and baseline calculations

CREATE TABLE IF NOT EXISTS public.gsc_page_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Site identification
  niche TEXT NOT NULL CHECK (niche IN ('property', 'dentists', 'medical')),
  site_url TEXT NOT NULL,  -- e.g., 'sc-domain:propertytaxpartners.co.uk'
  page_url TEXT NOT NULL,  -- Full URL of the page
  
  -- Performance metrics (for specific date)
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(10, 6) DEFAULT 0,  -- Click-through rate
  position DECIMAL(10, 2) DEFAULT 0,  -- Average position in search results
  
  -- Prevent duplicate entries
  UNIQUE(niche, page_url, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gsc_page_performance_niche 
  ON public.gsc_page_performance(niche);

CREATE INDEX IF NOT EXISTS idx_gsc_page_performance_page 
  ON public.gsc_page_performance(page_url);

CREATE INDEX IF NOT EXISTS idx_gsc_page_performance_date 
  ON public.gsc_page_performance(date DESC);

CREATE INDEX IF NOT EXISTS idx_gsc_page_performance_niche_date 
  ON public.gsc_page_performance(niche, date DESC);

-- Comments
COMMENT ON TABLE public.gsc_page_performance IS 
  'Daily GSC performance metrics for all pages. Used for trend analysis and optimization tracking.';

COMMENT ON COLUMN public.gsc_page_performance.niche IS 
  'Site identifier (property, dentists, medical, etc.)';

COMMENT ON COLUMN public.gsc_page_performance.date IS 
  'Date this data represents (not when it was fetched)';


-- ============================================================================
-- TABLE 2: BLOG_OPTIMIZATIONS
-- ============================================================================
-- Tracks optimization opportunities, implementation, and impact measurement
-- Core table for the optimization lifecycle

CREATE TABLE IF NOT EXISTS public.blog_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Link to original blog topic
  niche TEXT NOT NULL CHECK (niche IN ('property', 'dentists', 'medical')),
  blog_topic_id UUID,  -- NULL if new content opportunity
  existing_slug TEXT,  -- The blog post slug to optimize
  
  -- GSC data snapshot that triggered this (SNAPSHOT, not cumulative)
  gsc_page_url TEXT,
  gsc_data_start_date DATE NOT NULL,  -- Start of analysis window
  gsc_data_end_date DATE NOT NULL,    -- End of analysis window
  gsc_impressions INTEGER,
  gsc_clicks INTEGER,
  gsc_position DECIMAL(10, 2),
  gsc_ctr DECIMAL(10, 6),
  analysis_date DATE NOT NULL,
  data_hash TEXT,  -- Hash of GSC data to detect duplicate analysis
  
  -- Opportunity details (from DeepSeek analysis)
  opportunity_type TEXT NOT NULL CHECK (opportunity_type IN ('section_expansion', 'new_content', 'keyword_gap')),
  priority INTEGER DEFAULT 50 CHECK (priority BETWEEN 1 AND 100),
  recommended_action TEXT NOT NULL,
  target_keywords TEXT[],
  suggested_sections JSONB,  -- Array of {heading, outline, rationale}
  deepseek_reasoning TEXT,  -- DeepSeek's explanation
  trend_direction TEXT CHECK (trend_direction IN ('improving', 'declining', 'flat')),
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Awaiting review
    'approved',     -- Approved, baseline captured
    'in_progress',  -- Being implemented
    'measuring',    -- Implementation complete, measuring impact
    'completed',    -- Measurement complete
    'rejected',     -- User rejected
    'skipped'       -- Skipped (e.g., duplicate)
  )),
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  
  -- Implementation tracking
  approved_at TIMESTAMPTZ,  -- When approved (starts measurement window)
  implemented_at TIMESTAMPTZ,  -- When content was actually changed
  implementation_notes TEXT,
  measurement_complete_at TIMESTAMPTZ,
  
  -- Performance tracking (BEFORE optimization) - 7-day baseline
  baseline_impressions INTEGER,
  baseline_clicks INTEGER,
  baseline_position DECIMAL(10, 2),
  baseline_ctr DECIMAL(10, 6),
  baseline_period_start DATE,
  baseline_period_end DATE,
  
  -- Performance tracking (AFTER optimization) - WEEKLY tracking
  impact_impressions_week1 INTEGER,
  impact_clicks_week1 INTEGER,
  impact_position_week1 DECIMAL(10, 2),
  impact_ctr_week1 DECIMAL(10, 6),
  
  impact_impressions_week2 INTEGER,
  impact_clicks_week2 INTEGER,
  impact_position_week2 DECIMAL(10, 2),
  impact_ctr_week2 DECIMAL(10, 6),
  
  impact_impressions_week3 INTEGER,
  impact_clicks_week3 INTEGER,
  impact_position_week3 DECIMAL(10, 2),
  impact_ctr_week3 DECIMAL(10, 6),
  
  impact_impressions_week4 INTEGER,
  impact_clicks_week4 INTEGER,
  impact_position_week4 DECIMAL(10, 2),
  impact_ctr_week4 DECIMAL(10, 6),
  
  -- Impact analysis
  impact_verdict TEXT CHECK (impact_verdict IN ('positive', 'negative', 'neutral', 'pending')),
  impact_notes TEXT,
  confidence_level TEXT CHECK (confidence_level IN ('high', 'medium', 'low')),
  
  -- Rollback support
  rolled_back BOOLEAN DEFAULT false,
  rolled_back_at TIMESTAMPTZ,
  rollback_reason TEXT,
  content_backup_path TEXT,  -- Git commit hash or backup file path
  
  -- Prevent duplicate analysis
  superseded_by UUID REFERENCES public.blog_optimizations(id),
  supersedes UUID REFERENCES public.blog_optimizations(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_optimizations_status 
  ON public.blog_optimizations(status);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_niche 
  ON public.blog_optimizations(niche);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_priority 
  ON public.blog_optimizations(priority DESC);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_slug 
  ON public.blog_optimizations(existing_slug);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_data_hash 
  ON public.blog_optimizations(data_hash);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_analysis_date 
  ON public.blog_optimizations(analysis_date DESC);

CREATE INDEX IF NOT EXISTS idx_blog_optimizations_niche_status 
  ON public.blog_optimizations(niche, status);

-- Unique constraint: prevent analyzing same page with same data twice
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_optimizations_unique_analysis 
  ON public.blog_optimizations(existing_slug, data_hash) 
  WHERE status NOT IN ('rejected', 'skipped');

-- Comments
COMMENT ON TABLE public.blog_optimizations IS 
  'Optimization opportunities identified from GSC data. Tracks full lifecycle from analysis to impact measurement.';

COMMENT ON COLUMN public.blog_optimizations.data_hash IS 
  'SHA256 hash of GSC data to prevent re-analyzing the same data';

COMMENT ON COLUMN public.blog_optimizations.status IS 
  'Lifecycle: pending → approved → in_progress → measuring → completed';

COMMENT ON COLUMN public.blog_optimizations.impact_verdict IS 
  'Calculated after week 1 (aggressive) or week 4 (final)';


-- ============================================================================
-- TABLE 3: GSC_INDEXING_ISSUES
-- ============================================================================
-- Stores indexing/schema issues detected via GSC URL Inspection API
-- Used for proactive monitoring and alerting

CREATE TABLE IF NOT EXISTS public.gsc_indexing_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  niche TEXT NOT NULL CHECK (niche IN ('property', 'dentists', 'medical')),
  page_url TEXT NOT NULL,
  
  -- Indexing status
  coverage_state TEXT,  -- e.g., 'SUBMITTED_AND_INDEXED', 'NOT_FOUND', etc.
  indexing_verdict TEXT CHECK (indexing_verdict IN ('PASS', 'FAIL', 'NEUTRAL')),
  page_fetch_state TEXT,  -- e.g., 'SUCCESSFUL', 'NOT_FOUND', 'SERVER_ERROR'
  
  -- Crawl info
  last_crawl_time TIMESTAMPTZ,
  crawler_agent TEXT CHECK (crawler_agent IN ('DESKTOP', 'MOBILE')),
  
  -- Canonical issues
  google_canonical TEXT,
  user_declared_canonical TEXT,
  canonical_mismatch BOOLEAN DEFAULT false,
  
  -- Robots/noindex
  robots_txt_blocked BOOLEAN DEFAULT false,
  noindex_detected BOOLEAN DEFAULT false,
  
  -- Schema detection
  rich_results_detected JSONB,  -- Array of detected schema types
  schema_issues JSONB,  -- Array of schema-related issues
  
  -- Issue severity and tracking
  issue_type TEXT CHECK (issue_type IN ('indexing', 'schema', 'canonical', 'robots', 'noindex', 'crawl_error')),
  severity TEXT CHECK (severity IN ('high', 'medium', 'low')),
  issue_message TEXT,
  issue_details JSONB,
  
  -- Resolution tracking
  issue_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  
  UNIQUE(niche, page_url, checked_at)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gsc_indexing_issues_niche 
  ON public.gsc_indexing_issues(niche);

CREATE INDEX IF NOT EXISTS idx_gsc_indexing_issues_page 
  ON public.gsc_indexing_issues(page_url);

CREATE INDEX IF NOT EXISTS idx_gsc_indexing_issues_unresolved 
  ON public.gsc_indexing_issues(issue_resolved) 
  WHERE issue_resolved = false;

CREATE INDEX IF NOT EXISTS idx_gsc_indexing_issues_severity 
  ON public.gsc_indexing_issues(severity, issue_resolved) 
  WHERE issue_resolved = false;

CREATE INDEX IF NOT EXISTS idx_gsc_indexing_issues_niche_unresolved 
  ON public.gsc_indexing_issues(niche, issue_resolved) 
  WHERE issue_resolved = false;

-- Comments
COMMENT ON TABLE public.gsc_indexing_issues IS 
  'Indexing and schema issues detected via GSC URL Inspection API. Used for proactive monitoring.';

COMMENT ON COLUMN public.gsc_indexing_issues.severity IS 
  'high = not indexed, robots blocked; medium = schema missing, canonical mismatch; low = crawl errors';


-- ============================================================================
-- TABLE 4: UPDATE BLOG_TOPICS_PROPERTY
-- ============================================================================
-- Add optimization tracking columns to existing table

ALTER TABLE public.blog_topics_property 
  ADD COLUMN IF NOT EXISTS last_optimized_at TIMESTAMP;

ALTER TABLE public.blog_topics_property 
  ADD COLUMN IF NOT EXISTS optimization_count INTEGER DEFAULT 0;

ALTER TABLE public.blog_topics_property 
  ADD COLUMN IF NOT EXISTS gsc_tracked BOOLEAN DEFAULT false;

ALTER TABLE public.blog_topics_property 
  ADD COLUMN IF NOT EXISTS slug TEXT;

-- Index on slug for quick lookups
CREATE INDEX IF NOT EXISTS idx_blog_topics_property_slug 
  ON public.blog_topics_property(slug) 
  WHERE slug IS NOT NULL;

-- Comments
COMMENT ON COLUMN public.blog_topics_property.last_optimized_at IS 
  'Timestamp of most recent optimization';

COMMENT ON COLUMN public.blog_topics_property.optimization_count IS 
  'Number of times this topic has been optimized';

COMMENT ON COLUMN public.blog_topics_property.gsc_tracked IS 
  'Whether this topic is actively tracked in GSC';

COMMENT ON COLUMN public.blog_topics_property.slug IS 
  'Generated slug for the blog post (for linking to optimizations)';


-- ============================================================================
-- TABLE 5: UPDATE BLOG_TOPICS (Dentists)
-- ============================================================================
-- Add optimization tracking columns to existing table

ALTER TABLE public.blog_topics 
  ADD COLUMN IF NOT EXISTS last_optimized_at TIMESTAMPTZ;

ALTER TABLE public.blog_topics 
  ADD COLUMN IF NOT EXISTS optimization_count INTEGER DEFAULT 0;

ALTER TABLE public.blog_topics 
  ADD COLUMN IF NOT EXISTS gsc_tracked BOOLEAN DEFAULT false;

ALTER TABLE public.blog_topics 
  ADD COLUMN IF NOT EXISTS slug TEXT;

-- Index on slug
CREATE INDEX IF NOT EXISTS idx_blog_topics_slug 
  ON public.blog_topics(slug) 
  WHERE slug IS NOT NULL;

-- Comments
COMMENT ON COLUMN public.blog_topics.last_optimized_at IS 
  'Timestamp of most recent optimization';

COMMENT ON COLUMN public.blog_topics.optimization_count IS 
  'Number of times this topic has been optimized';

COMMENT ON COLUMN public.blog_topics.gsc_tracked IS 
  'Whether this topic is actively tracked in GSC';

COMMENT ON COLUMN public.blog_topics.slug IS 
  'Generated slug for the blog post (for linking to optimizations)';


-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.gsc_page_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gsc_indexing_issues ENABLE ROW LEVEL SECURITY;

-- Policies: Read access for all, write for authenticated
CREATE POLICY "Enable read access for all users" ON public.gsc_page_performance
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.gsc_page_performance
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.blog_optimizations
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.blog_optimizations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.blog_optimizations
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.gsc_indexing_issues
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.gsc_indexing_issues
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.gsc_indexing_issues
    FOR UPDATE USING (auth.role() = 'authenticated');


-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check tables exist:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('gsc_page_performance', 'blog_optimizations', 'gsc_indexing_issues');

-- Check columns added to blog_topics:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'blog_topics_property' 
-- AND column_name IN ('last_optimized_at', 'optimization_count', 'gsc_tracked', 'slug');

-- Count data:
-- SELECT niche, COUNT(*) FROM gsc_page_performance GROUP BY niche;
-- SELECT niche, status, COUNT(*) FROM blog_optimizations GROUP BY niche, status;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. All tables use 'niche' column for multi-site support
-- 2. blog_optimizations tracks full lifecycle with weekly measurement
-- 3. gsc_page_performance stores daily snapshots for trend analysis
-- 4. gsc_indexing_issues enables proactive monitoring
-- 5. Rollback support via content_backup_path (git commit hash)
-- 6. Data hashing prevents duplicate analysis
-- 7. RLS enabled for security
-- 8. Weekly tracking (week1, week2, week3, week4) for aggressive testing
-- ============================================================================
