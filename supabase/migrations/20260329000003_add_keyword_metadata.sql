-- Add keyword metadata columns to blog topics tables
-- Migration: Add keyword-driven content strategy fields

-- ============================================================================
-- blog_topics_property
-- ============================================================================

ALTER TABLE blog_topics_property
ADD COLUMN IF NOT EXISTS pillar_topic TEXT,
ADD COLUMN IF NOT EXISTS keyword_difficulty INTEGER,
ADD COLUMN IF NOT EXISTS user_intent TEXT CHECK (user_intent IN ('informational', 'transactional', 'navigational')),
ADD COLUMN IF NOT EXISTS content_tier TEXT CHECK (content_tier IN ('pillar', 'cluster', 'supporting')),
ADD COLUMN IF NOT EXISTS target_search_volume INTEGER,
ADD COLUMN IF NOT EXISTS keyword_source TEXT,
ADD COLUMN IF NOT EXISTS publish_priority INTEGER DEFAULT 5 CHECK (publish_priority BETWEEN 1 AND 10);

COMMENT ON COLUMN blog_topics_property.pillar_topic IS 'Links cluster topics to their pillar page';
COMMENT ON COLUMN blog_topics_property.keyword_difficulty IS 'SEO keyword difficulty score (0-100)';
COMMENT ON COLUMN blog_topics_property.user_intent IS 'Search intent: informational, transactional, or navigational';
COMMENT ON COLUMN blog_topics_property.content_tier IS 'Content hierarchy: pillar (broad), cluster (supporting), or supporting';
COMMENT ON COLUMN blog_topics_property.target_search_volume IS 'Monthly search volume for primary keyword';
COMMENT ON COLUMN blog_topics_property.keyword_source IS 'Source of keyword data: csv, manual, research, csv_merged, archived';
COMMENT ON COLUMN blog_topics_property.publish_priority IS 'Publishing priority (1-10, higher = publish first)';

-- Create index for priority-based selection
CREATE INDEX IF NOT EXISTS idx_property_topics_priority ON blog_topics_property(publish_priority DESC, keyword_difficulty ASC) WHERE used = false;

-- ============================================================================
-- blog_topics (Dentists)
-- ============================================================================

ALTER TABLE blog_topics
ADD COLUMN IF NOT EXISTS pillar_topic TEXT,
ADD COLUMN IF NOT EXISTS keyword_difficulty INTEGER,
ADD COLUMN IF NOT EXISTS user_intent TEXT CHECK (user_intent IN ('informational', 'transactional', 'navigational')),
ADD COLUMN IF NOT EXISTS content_tier TEXT CHECK (content_tier IN ('pillar', 'cluster', 'supporting')),
ADD COLUMN IF NOT EXISTS target_search_volume INTEGER,
ADD COLUMN IF NOT EXISTS keyword_source TEXT,
ADD COLUMN IF NOT EXISTS publish_priority INTEGER DEFAULT 5 CHECK (publish_priority BETWEEN 1 AND 10);

COMMENT ON COLUMN blog_topics.pillar_topic IS 'Links cluster topics to their pillar page';
COMMENT ON COLUMN blog_topics.keyword_difficulty IS 'SEO keyword difficulty score (0-100)';
COMMENT ON COLUMN blog_topics.user_intent IS 'Search intent: informational, transactional, or navigational';
COMMENT ON COLUMN blog_topics.content_tier IS 'Content hierarchy: pillar (broad), cluster (supporting), or supporting';
COMMENT ON COLUMN blog_topics.target_search_volume IS 'Monthly search volume for primary keyword';
COMMENT ON COLUMN blog_topics.keyword_source IS 'Source of keyword data: csv, manual, research, csv_merged, archived';
COMMENT ON COLUMN blog_topics.publish_priority IS 'Publishing priority (1-10, higher = publish first)';

-- Create index for priority-based selection
CREATE INDEX IF NOT EXISTS idx_dentist_topics_priority ON blog_topics(publish_priority DESC, keyword_difficulty ASC) WHERE used = false;
