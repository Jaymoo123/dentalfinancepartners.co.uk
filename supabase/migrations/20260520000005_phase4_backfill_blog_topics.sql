-- ============================================================================
-- PHASE 4 MIGRATION 2/3 — Backfill blog_topics from 6 source tables
-- ============================================================================
-- Date: 2026-05-20
-- Purpose: Copy every row from each blog_topics_<site> table into the new
--          unified `blog_topics` table.
--
-- DESIGN: per-site tables have inconsistent column types (some have priority
-- as integer, others as text; some have search_volume with qualitative
-- 'low'/'medium'/'high' strings mixed in; Property has timestamps as text).
-- PostgREST hides these type differences behind JSON, so the audit-driven
-- design missed them. To stop iterating on type errors, three helper
-- functions handle defensive parsing for any source column type:
--   _phase4_parse_int(text)              -> integer (numeric strings only; else NULL)
--   _phase4_parse_priority(text)         -> integer (numeric or low=3/medium=5/high=8)
--   _phase4_parse_search_volume(text)    -> integer (numeric or low=100/medium=1000/high=5000/very_high=20000)
--   _phase4_parse_ts(text)               -> timestamptz (else NULL)
--
-- Each helper takes a `text` argument; the caller casts the source column
-- to text first (`col::text`) which works whether the column is text,
-- integer, timestamptz, etc. No more guessing source types.
--
-- ROLLBACK:
--   TRUNCATE blog_topics;
--   DROP FUNCTION IF EXISTS _phase4_parse_int(text);
--   DROP FUNCTION IF EXISTS _phase4_parse_priority(text);
--   DROP FUNCTION IF EXISTS _phase4_parse_search_volume(text);
--   DROP FUNCTION IF EXISTS _phase4_parse_ts(text);
--
-- VERIFICATION (run after this migration):
--   SELECT site_key, COUNT(*) FROM blog_topics GROUP BY site_key ORDER BY site_key;
--   -- Expected counts (snapshot 2026-05-20):
--   --   agency: 314 | dentists: 146 | generalist: 289
--   --   medical: 62 | property: 474 | solicitors: 65 | total: 1,350
-- ============================================================================

-- ---------------------------------------------------------------------------
-- HELPER FUNCTIONS (used by every site INSERT below)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION _phase4_parse_int(val text) RETURNS integer AS $$
BEGIN
  IF val IS NULL OR val = '' THEN RETURN NULL; END IF;
  IF val ~ '^-?[0-9]+$' THEN RETURN val::integer; END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION _phase4_parse_priority(val text) RETURNS integer AS $$
BEGIN
  IF val IS NULL OR val = '' THEN RETURN 5; END IF;
  IF val ~ '^-?[0-9]+$' THEN RETURN val::integer; END IF;
  CASE lower(val)
    WHEN 'low' THEN RETURN 3;
    WHEN 'medium' THEN RETURN 5;
    WHEN 'high' THEN RETURN 8;
    ELSE RETURN 5;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION _phase4_parse_search_volume(val text) RETURNS integer AS $$
BEGIN
  IF val IS NULL OR val = '' THEN RETURN NULL; END IF;
  IF val ~ '^-?[0-9]+$' THEN RETURN val::integer; END IF;
  CASE lower(val)
    WHEN 'low' THEN RETURN 100;
    WHEN 'medium' THEN RETURN 1000;
    WHEN 'high' THEN RETURN 5000;
    WHEN 'very_high' THEN RETURN 20000;
    ELSE RETURN NULL;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION _phase4_parse_ts(val text) RETURNS timestamptz AS $$
BEGIN
  IF val IS NULL OR val = '' THEN RETURN NULL; END IF;
  BEGIN
    RETURN val::timestamptz;
  EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- ---------------------------------------------------------------------------
-- DENTISTS (Property-style + 10 denormalised secondary_keyword columns)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, primary_keyword, secondary_keywords, category,
  pillar_topic, content_tier, priority, publish_priority, user_intent,
  keyword_difficulty, target_search_volume, keyword_source, slug,
  generated_slug, generated_at, used, notes, last_optimized_at,
  optimization_count, gsc_tracked, created_at
)
SELECT
  id,
  'dentists',
  topic,
  primary_keyword,
  COALESCE((
    SELECT jsonb_agg(elem) FROM (
      SELECT unnest(ARRAY[
        secondary_keyword_1, secondary_keyword_2, secondary_keyword_3,
        secondary_keyword_4, secondary_keyword_5, secondary_keyword_6,
        secondary_keyword_7, secondary_keyword_8, secondary_keyword_9,
        secondary_keyword_10
      ]) AS elem
    ) t WHERE elem IS NOT NULL
  ), '[]'::jsonb),
  category,
  pillar_topic,
  content_tier,
  _phase4_parse_priority(priority::text),
  _phase4_parse_int(publish_priority::text),
  user_intent,
  _phase4_parse_int(keyword_difficulty::text),
  _phase4_parse_int(target_search_volume::text),
  keyword_source,
  slug,
  generated_slug,
  _phase4_parse_ts(generated_at::text),
  COALESCE(used, false),
  notes,
  _phase4_parse_ts(last_optimized_at::text),
  COALESCE(_phase4_parse_int(optimization_count::text), 0),
  COALESCE(gsc_tracked, false),
  _phase4_parse_ts(created_at::text)
FROM blog_topics_dentists
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PROPERTY (Property-style with mixed text/numeric data)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, primary_keyword, secondary_keywords, category,
  pillar_topic, content_tier, content_branch, priority, publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, used, used_at, last_optimized_at,
  optimization_count, gsc_tracked, created_at
)
SELECT
  id,
  'property',
  topic,
  primary_keyword,
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb),
  category,
  pillar_topic,
  content_tier,
  content_branch,
  _phase4_parse_priority(priority::text),
  _phase4_parse_int(publish_priority::text),
  user_intent,
  _phase4_parse_int(keyword_difficulty::text),
  _phase4_parse_search_volume(search_volume::text),
  _phase4_parse_int(target_search_volume::text),
  competition::text,
  keyword_source,
  slug,
  COALESCE(used, false),
  _phase4_parse_ts(used_at::text),
  _phase4_parse_ts(last_optimized_at::text),
  COALESCE(_phase4_parse_int(optimization_count::text), 0),
  COALESCE(gsc_tracked, false),
  COALESCE(_phase4_parse_ts(created_at::text), now())
FROM blog_topics_property
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- MEDICAL (Old simple — keyword/intent/difficulty/status/published_at)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, category, priority, user_intent, keyword_difficulty,
  search_volume, status, published_at, slug, notes, created_at, updated_at
)
SELECT
  id,
  'medical',
  keyword,                                     -- canonical rename
  category,
  _phase4_parse_priority(priority::text),
  intent,                                      -- canonical rename
  _phase4_parse_int(difficulty::text),         -- canonical rename
  _phase4_parse_search_volume(search_volume::text),
  status,
  _phase4_parse_ts(published_at::text),
  slug,
  notes,
  COALESCE(_phase4_parse_ts(created_at::text), now()),
  COALESCE(_phase4_parse_ts(updated_at::text), _phase4_parse_ts(created_at::text), now())
FROM blog_topics_medical
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- SOLICITORS (Old simple — same shape as medical)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, category, priority, user_intent, keyword_difficulty,
  search_volume, status, published_at, slug, notes, created_at, updated_at
)
SELECT
  id,
  'solicitors',
  keyword,
  category,
  _phase4_parse_priority(priority::text),
  intent,
  _phase4_parse_int(difficulty::text),
  _phase4_parse_search_volume(search_volume::text),
  status,
  _phase4_parse_ts(published_at::text),
  slug,
  notes,
  COALESCE(_phase4_parse_ts(created_at::text), now()),
  COALESCE(_phase4_parse_ts(updated_at::text), _phase4_parse_ts(created_at::text), now())
FROM blog_topics_solicitors
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- AGENCY (Modern — direct mapping with defensive casts)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, primary_keyword, secondary_keywords, category,
  pillar_topic, content_tier, content_branch, priority, publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, suggested_slug, used, used_at, notes,
  last_optimized_at, optimization_count, gsc_tracked, created_at
)
SELECT
  id,
  'agency',
  topic,
  primary_keyword,
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb),
  category,
  pillar_topic,
  content_tier,
  content_branch,
  _phase4_parse_priority(priority::text),
  _phase4_parse_int(publish_priority::text),
  user_intent,
  _phase4_parse_int(keyword_difficulty::text),
  _phase4_parse_search_volume(search_volume::text),
  _phase4_parse_int(target_search_volume::text),
  competition::text,
  keyword_source,
  slug,
  suggested_slug,
  COALESCE(used, false),
  _phase4_parse_ts(used_at::text),
  notes,
  _phase4_parse_ts(last_optimized_at::text),
  COALESCE(_phase4_parse_int(optimization_count::text), 0),
  COALESCE(gsc_tracked, false),
  COALESCE(_phase4_parse_ts(created_at::text), now())
FROM blog_topics_agency
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- GENERALIST (Modern — same shape as agency)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, primary_keyword, secondary_keywords, category,
  pillar_topic, content_tier, content_branch, priority, publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, suggested_slug, used, used_at, notes,
  last_optimized_at, optimization_count, gsc_tracked, created_at
)
SELECT
  id,
  'generalist',
  topic,
  primary_keyword,
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb),
  category,
  pillar_topic,
  content_tier,
  content_branch,
  _phase4_parse_priority(priority::text),
  _phase4_parse_int(publish_priority::text),
  user_intent,
  _phase4_parse_int(keyword_difficulty::text),
  _phase4_parse_search_volume(search_volume::text),
  _phase4_parse_int(target_search_volume::text),
  competition::text,
  keyword_source,
  slug,
  suggested_slug,
  COALESCE(used, false),
  _phase4_parse_ts(used_at::text),
  notes,
  _phase4_parse_ts(last_optimized_at::text),
  COALESCE(_phase4_parse_int(optimization_count::text), 0),
  COALESCE(gsc_tracked, false),
  COALESCE(_phase4_parse_ts(created_at::text), now())
FROM blog_topics_generalist
ON CONFLICT (site_key, topic) DO NOTHING;
