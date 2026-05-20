-- ============================================================================
-- PHASE 4 MIGRATION 1/3 — Create unified blog_topics table
-- ============================================================================
-- Date: 2026-05-20
-- Purpose: Replace 6 per-site blog_topics_* tables with one `blog_topics`
--          keyed by `site_key`. Union of 3 divergent schema families
--          (Old simple / Property-style / Modern).
--
-- Sequence:
--   1. (this file) Create blog_topics + indexes + updated_at trigger
--   2. Backfill from all 6 source tables (next migration)
--   3. Dual-write triggers on source tables (third migration)
--
-- Source tables remain untouched. They are renamed *_legacy_<date> only
-- AFTER the 48h dual-write soak and consumer switchover, and dropped 30
-- days after that.
--
-- ROLLBACK:
--   DROP TABLE IF EXISTS blog_topics CASCADE;
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_topics (
  id                    text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  site_key              text NOT NULL REFERENCES sites(site_key),

  -- Core
  topic                 text NOT NULL,
  primary_keyword       text,
  secondary_keywords    jsonb DEFAULT '[]'::jsonb,
  category              text,
  pillar_topic          text,
  content_tier          text,
  content_branch        text,

  -- Scoring + intent
  priority              integer DEFAULT 5,
  publish_priority      integer,
  user_intent           text,
  keyword_difficulty    integer,
  search_volume         integer,
  target_search_volume  integer,
  competition           text,
  keyword_source        text,

  -- Slug / generation state
  slug                  text,
  suggested_slug        text,
  generated_slug        text,
  generated_at          timestamptz,

  -- Lifecycle
  used                  boolean DEFAULT false,
  used_at               timestamptz,
  status                text,
  published_at          timestamptz,

  -- Optimisation tracking
  last_optimized_at     timestamptz,
  optimization_count    integer DEFAULT 0,
  gsc_tracked           boolean DEFAULT false,

  -- Notes / metadata
  notes                 text,

  -- Timestamps
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),

  -- Same topic shouldn't appear twice for the same site
  CONSTRAINT blog_topics_site_topic_unique UNIQUE (site_key, topic)
);

CREATE INDEX IF NOT EXISTS idx_blog_topics_site_key
  ON blog_topics(site_key);

CREATE INDEX IF NOT EXISTS idx_blog_topics_used
  ON blog_topics(site_key, used);

CREATE INDEX IF NOT EXISTS idx_blog_topics_status
  ON blog_topics(site_key, status)
  WHERE status IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_blog_topics_priority
  ON blog_topics(site_key, priority DESC);

-- updated_at maintenance trigger
CREATE OR REPLACE FUNCTION blog_topics_set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_topics_set_updated_at_trigger ON blog_topics;
CREATE TRIGGER blog_topics_set_updated_at_trigger
  BEFORE UPDATE ON blog_topics
  FOR EACH ROW EXECUTE FUNCTION blog_topics_set_updated_at();

-- ============================================================================
-- RLS — mirrors the existing per-site table policies
-- ============================================================================
ALTER TABLE blog_topics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_blog_topics" ON blog_topics;
CREATE POLICY "anon_read_blog_topics"
  ON blog_topics FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "authenticated_read_blog_topics" ON blog_topics;
CREATE POLICY "authenticated_read_blog_topics"
  ON blog_topics FOR SELECT
  TO authenticated
  USING (true);

-- service_role bypasses RLS for engine writes — no explicit policy needed
