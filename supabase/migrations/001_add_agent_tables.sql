-- Agent Automation System Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql

-- ============================================================================
-- AGENT EXECUTION TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_type TEXT NOT NULL,  -- 'content_research', 'blog_generation', 'analytics_optimization', 'niche_expansion'
  niche TEXT,
  status TEXT NOT NULL,  -- 'running', 'completed', 'failed', 'budget_exceeded', 'skipped_duplicate', 'quality_failed'
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  metrics JSONB,  -- Agent-specific metrics
  error_log TEXT,
  quality_issues JSONB  -- Quality check failures
);

CREATE INDEX idx_agent_executions_type ON agent_executions(agent_type);
CREATE INDEX idx_agent_executions_niche ON agent_executions(niche);
CREATE INDEX idx_agent_executions_status ON agent_executions(status);
CREATE INDEX idx_agent_executions_started_at ON agent_executions(started_at DESC);

-- ============================================================================
-- COST TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operation TEXT NOT NULL,  -- 'blog_generation', 'topic_research', 'content_optimization', 'similarity_check'
  niche TEXT,
  cost_usd DECIMAL(10,4) NOT NULL,
  tokens_used INTEGER,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agent_costs_operation ON agent_costs(operation);
CREATE INDEX idx_agent_costs_niche ON agent_costs(niche);
CREATE INDEX idx_agent_costs_timestamp ON agent_costs(timestamp DESC);

-- Monthly cost summary view
CREATE OR REPLACE VIEW monthly_costs AS
SELECT 
  DATE_TRUNC('month', timestamp) as month,
  niche,
  operation,
  SUM(cost_usd) as total_cost,
  COUNT(*) as operation_count,
  SUM(tokens_used) as total_tokens
FROM agent_costs
GROUP BY DATE_TRUNC('month', timestamp), niche, operation
ORDER BY month DESC, total_cost DESC;

-- Daily cost summary view
CREATE OR REPLACE VIEW daily_costs AS
SELECT 
  DATE_TRUNC('day', timestamp) as day,
  niche,
  SUM(cost_usd) as total_cost,
  COUNT(*) as operation_count
FROM agent_costs
GROUP BY DATE_TRUNC('day', timestamp), niche
ORDER BY day DESC;

-- ============================================================================
-- CONTENT TRACKING (For Deduplication)
-- ============================================================================

CREATE TABLE IF NOT EXISTS published_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niche TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  published_at TIMESTAMP NOT NULL DEFAULT NOW(),
  word_count INTEGER,
  content_hash TEXT NOT NULL,  -- SHA256 hash for exact duplicate detection
  UNIQUE(niche, slug)
);

CREATE INDEX idx_published_content_niche ON published_content(niche);
CREATE INDEX idx_published_content_topic ON published_content(niche, topic);
CREATE INDEX idx_published_content_hash ON published_content(content_hash);
CREATE INDEX idx_published_content_published_at ON published_content(published_at DESC);

-- ============================================================================
-- NICHE PERFORMANCE METRICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS niche_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niche TEXT NOT NULL,
  date DATE NOT NULL,
  blog_posts_generated INTEGER DEFAULT 0,
  blog_posts_total INTEGER DEFAULT 0,
  leads_received INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_on_site FLOAT,
  bounce_rate FLOAT,
  conversion_rate FLOAT,
  top_keywords JSONB,
  UNIQUE(niche, date)
);

CREATE INDEX idx_niche_metrics_niche ON niche_metrics(niche);
CREATE INDEX idx_niche_metrics_date ON niche_metrics(date DESC);

-- ============================================================================
-- SEO RANKING TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS seo_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niche TEXT NOT NULL,
  page_url TEXT NOT NULL,
  keyword TEXT NOT NULL,
  position INTEGER,
  search_volume INTEGER,
  impressions INTEGER,
  clicks INTEGER,
  ctr FLOAT,
  tracked_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_seo_rankings_niche ON seo_rankings(niche);
CREATE INDEX idx_seo_rankings_page ON seo_rankings(page_url);
CREATE INDEX idx_seo_rankings_keyword ON seo_rankings(keyword);
CREATE INDEX idx_seo_rankings_tracked_at ON seo_rankings(tracked_at DESC);

-- ============================================================================
-- DATA RETENTION (90 days)
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS void AS $$
BEGIN
  -- Delete old agent executions
  DELETE FROM agent_executions WHERE started_at < NOW() - INTERVAL '90 days';
  
  -- Delete old cost records
  DELETE FROM agent_costs WHERE timestamp < NOW() - INTERVAL '90 days';
  
  -- Delete old SEO rankings
  DELETE FROM seo_rankings WHERE tracked_at < NOW() - INTERVAL '90 days';
  
  -- Keep niche_metrics forever for historical analysis
  
  RAISE NOTICE 'Cleanup complete: Deleted records older than 90 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get current month spending
CREATE OR REPLACE FUNCTION get_monthly_spend()
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(cost_usd), 0)
  FROM agent_costs
  WHERE timestamp >= DATE_TRUNC('month', NOW());
$$ LANGUAGE SQL;

-- Get today's spending
CREATE OR REPLACE FUNCTION get_daily_spend()
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(cost_usd), 0)
  FROM agent_costs
  WHERE timestamp >= DATE_TRUNC('day', NOW());
$$ LANGUAGE SQL;

-- Get unused topic count for a niche
CREATE OR REPLACE FUNCTION get_unused_topic_count(table_name TEXT)
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  EXECUTE format('SELECT COUNT(*) FROM %I WHERE used = false', table_name) INTO count;
  RETURN count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert initial niche metrics rows (optional)
INSERT INTO niche_metrics (niche, date, blog_posts_total)
VALUES 
  ('Dentists', CURRENT_DATE, 44),  -- Current count
  ('Property', CURRENT_DATE, 0)
ON CONFLICT (niche, date) DO NOTHING;

-- ============================================================================
-- PERMISSIONS (if using RLS)
-- ============================================================================

-- Allow service role to access all tables
-- (GitHub Actions will use service role key)

COMMENT ON TABLE agent_executions IS 'Tracks all agent execution runs with status and metrics';
COMMENT ON TABLE agent_costs IS 'Tracks API costs for budget monitoring';
COMMENT ON TABLE published_content IS 'Tracks published blog posts for deduplication';
COMMENT ON TABLE niche_metrics IS 'Daily performance metrics per niche';
COMMENT ON TABLE seo_rankings IS 'SEO ranking tracking from Google Search Console';
