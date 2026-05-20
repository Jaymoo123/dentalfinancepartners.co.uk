-- ============================================================================
-- PHASE 4 MIGRATION 2/3 — Backfill blog_topics from 6 source tables
-- ============================================================================
-- Date: 2026-05-20
-- Purpose: Copy every row from each blog_topics_<site> table into the new
--          unified `blog_topics` table, mapping per-site column names to
--          canonical ones, casting Property's text-typed `priority` and
--          `created_at` to their proper types.
--
-- ROLLBACK:
--   TRUNCATE blog_topics;  -- source tables untouched
--
-- VERIFICATION (run after this migration):
--   SELECT site_key, COUNT(*) FROM blog_topics GROUP BY site_key ORDER BY site_key;
--   -- Expected counts (snapshot 2026-05-20):
--   --   agency:     314
--   --   dentists:   146
--   --   generalist: 289
--   --   medical:     62
--   --   property:   474
--   --   solicitors:  65
--   --   total:    1,350
-- ============================================================================

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
  'dentists' AS site_key,
  topic,
  primary_keyword,
  -- Collapse secondary_keyword_1..10 into a JSONB array, stripping NULLs
  COALESCE(
    (
      SELECT jsonb_agg(elem) FROM (
        SELECT unnest(ARRAY[
          secondary_keyword_1, secondary_keyword_2, secondary_keyword_3,
          secondary_keyword_4, secondary_keyword_5, secondary_keyword_6,
          secondary_keyword_7, secondary_keyword_8, secondary_keyword_9,
          secondary_keyword_10
        ]) AS elem
      ) t
      WHERE elem IS NOT NULL
    ),
    '[]'::jsonb
  ) AS secondary_keywords,
  category,
  pillar_topic,
  content_tier,
  COALESCE(priority, 5) AS priority,
  publish_priority,
  user_intent,
  keyword_difficulty,
  target_search_volume,
  keyword_source,
  slug,
  generated_slug,
  generated_at,
  COALESCE(used, false) AS used,
  notes,
  last_optimized_at,
  COALESCE(optimization_count, 0) AS optimization_count,
  COALESCE(gsc_tracked, false) AS gsc_tracked,
  created_at
FROM blog_topics_dentists
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PROPERTY (Property-style — note the text-typed priority + created_at)
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
  'property' AS site_key,
  topic,
  primary_keyword,
  -- Property stores secondary_keywords as text[]; agency + generalist as jsonb.
  -- to_jsonb() handles both (text[] -> json array, jsonb -> passthrough).
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb) AS secondary_keywords,
  category,
  pillar_topic,
  content_tier,
  content_branch,
  -- Defensive casts: Property has mixed text/numeric data. Text qualifiers
  -- ('low', 'medium', 'high', 'very_high') get mapped to representative
  -- integers; pure-numeric strings cast directly.
  CASE
    WHEN priority::text IS NULL OR priority::text = '' THEN 5
    WHEN priority::text ~ '^-?[0-9]+$' THEN priority::text::integer
    WHEN lower(priority::text) = 'low' THEN 3
    WHEN lower(priority::text) = 'medium' THEN 5
    WHEN lower(priority::text) = 'high' THEN 8
    ELSE 5
  END AS priority,
  publish_priority,
  user_intent,
  keyword_difficulty,
  CASE
    WHEN search_volume::text IS NULL OR search_volume::text = '' THEN NULL::integer
    WHEN search_volume::text ~ '^-?[0-9]+$' THEN search_volume::text::integer
    WHEN lower(search_volume::text) = 'low' THEN 100
    WHEN lower(search_volume::text) = 'medium' THEN 1000
    WHEN lower(search_volume::text) = 'high' THEN 5000
    WHEN lower(search_volume::text) = 'very_high' THEN 20000
    ELSE NULL::integer
  END AS search_volume,
  target_search_volume,
  competition,
  keyword_source,
  slug,
  COALESCE(used, false) AS used,
  CASE WHEN used_at::text IS NULL OR used_at::text = ''
       THEN NULL::timestamptz ELSE used_at::text::timestamptz END AS used_at,
  last_optimized_at,
  COALESCE(optimization_count, 0) AS optimization_count,
  COALESCE(gsc_tracked, false) AS gsc_tracked,
  CASE WHEN created_at::text IS NULL OR created_at::text = ''
       THEN now() ELSE created_at::text::timestamptz END AS created_at
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
  'medical' AS site_key,
  keyword AS topic,            -- canonical rename
  category,
  COALESCE(priority, 5) AS priority,
  intent AS user_intent,       -- canonical rename
  difficulty AS keyword_difficulty,  -- canonical rename
  search_volume,
  status,
  published_at,
  slug,
  notes,
  created_at,
  COALESCE(updated_at, created_at) AS updated_at
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
  'solicitors' AS site_key,
  keyword AS topic,
  category,
  COALESCE(priority, 5) AS priority,
  intent AS user_intent,
  difficulty AS keyword_difficulty,
  search_volume,
  status,
  published_at,
  slug,
  notes,
  created_at,
  COALESCE(updated_at, created_at) AS updated_at
FROM blog_topics_solicitors
ON CONFLICT (site_key, topic) DO NOTHING;

-- ---------------------------------------------------------------------------
-- AGENCY (Modern — direct mapping)
-- ---------------------------------------------------------------------------
INSERT INTO blog_topics (
  id, site_key, topic, primary_keyword, secondary_keywords, category,
  pillar_topic, content_tier, content_branch, priority, publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, suggested_slug, used, used_at, notes,
  last_optimized_at, optimization_count, gsc_tracked, created_at
)
SELECT
  id, 'agency', topic, primary_keyword,
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb), category, pillar_topic,
  content_tier, content_branch, COALESCE(priority, 5), publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, suggested_slug, COALESCE(used, false),
  used_at, notes, last_optimized_at, COALESCE(optimization_count, 0),
  COALESCE(gsc_tracked, false), created_at
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
  id, 'generalist', topic, primary_keyword,
  COALESCE(to_jsonb(secondary_keywords), '[]'::jsonb), category, pillar_topic,
  content_tier, content_branch, COALESCE(priority, 5), publish_priority,
  user_intent, keyword_difficulty, search_volume, target_search_volume,
  competition, keyword_source, slug, suggested_slug, COALESCE(used, false),
  used_at, notes, last_optimized_at, COALESCE(optimization_count, 0),
  COALESCE(gsc_tracked, false), created_at
FROM blog_topics_generalist
ON CONFLICT (site_key, topic) DO NOTHING;
