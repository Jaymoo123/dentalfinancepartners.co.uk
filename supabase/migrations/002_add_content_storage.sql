-- ============================================================================
-- Migration: Add Content Storage and Deployment Tracking
-- Purpose: Store full blog content in Supabase before deployment
-- This allows retry without regenerating (saving API costs)
-- ============================================================================

-- Add full_content column to store complete markdown
ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS full_content TEXT;

-- Add deployment tracking columns
ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS deployment_status TEXT DEFAULT 'pending';

ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS deployment_url TEXT;

ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS last_deployment_attempt TIMESTAMP;

ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS deployment_error TEXT;

-- Create index for deployment status queries
CREATE INDEX IF NOT EXISTS idx_published_content_deployment 
ON published_content(deployment_status, niche);

-- ============================================================================
-- View: Content Ready for Deployment
-- ============================================================================

CREATE OR REPLACE VIEW content_pending_deployment AS
SELECT 
  id,
  niche,
  slug,
  title,
  full_content,
  published_at,
  last_deployment_attempt,
  deployment_error
FROM published_content
WHERE deployment_status = 'pending'
   OR (deployment_status = 'failed' AND last_deployment_attempt < NOW() - INTERVAL '1 hour')
ORDER BY published_at ASC;

-- ============================================================================
-- View: Deployment Success Rate
-- ============================================================================

CREATE OR REPLACE VIEW deployment_stats AS
SELECT 
  niche,
  COUNT(*) as total_content,
  COUNT(*) FILTER (WHERE deployment_status = 'deployed') as deployed_count,
  COUNT(*) FILTER (WHERE deployment_status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE deployment_status = 'failed') as failed_count,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE deployment_status = 'deployed') / NULLIF(COUNT(*), 0),
    2
  ) as success_rate
FROM published_content
GROUP BY niche;
