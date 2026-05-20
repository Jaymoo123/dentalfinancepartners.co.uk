-- ============================================================================
-- PHASE 4 MIGRATION 3/3 — Dual-write triggers on source tables
-- ============================================================================
-- Date: 2026-05-20
-- Purpose: For the 48h+ soak period during which consumers might still write
--          to old per-site tables, mirror those writes to the new unified
--          blog_topics table so it stays in sync.
--
-- Reads still go to OLD tables until consumer code is updated. Writes go to
-- OLD tables and are mirrored here. Once consumers switch to writing to NEW,
-- old tables become read-only fallback, then renamed _legacy_, then dropped.
--
-- ROLLBACK:
--   DROP TRIGGER IF EXISTS dual_write_dentists ON blog_topics_dentists;
--   DROP TRIGGER IF EXISTS dual_write_property ON blog_topics_property;
--   DROP TRIGGER IF EXISTS dual_write_medical ON blog_topics_medical;
--   DROP TRIGGER IF EXISTS dual_write_solicitors ON blog_topics_solicitors;
--   DROP TRIGGER IF EXISTS dual_write_agency ON blog_topics_agency;
--   DROP TRIGGER IF EXISTS dual_write_generalist ON blog_topics_generalist;
--   DROP FUNCTION IF EXISTS sync_blog_topics_dentists();
--   DROP FUNCTION IF EXISTS sync_blog_topics_property();
--   DROP FUNCTION IF EXISTS sync_blog_topics_old_simple();
--   DROP FUNCTION IF EXISTS sync_blog_topics_modern();
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Dentists: Property-style + 10 denormalised secondary_keyword columns
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_dentists() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, primary_keyword, secondary_keywords, category,
    pillar_topic, content_tier, priority, publish_priority, user_intent,
    keyword_difficulty, target_search_volume, keyword_source, slug,
    generated_slug, generated_at, used, notes, last_optimized_at,
    optimization_count, gsc_tracked, created_at
  ) VALUES (
    NEW.id, 'dentists', NEW.topic, NEW.primary_keyword,
    COALESCE((
      SELECT jsonb_agg(elem) FROM (
        SELECT unnest(ARRAY[
          NEW.secondary_keyword_1, NEW.secondary_keyword_2, NEW.secondary_keyword_3,
          NEW.secondary_keyword_4, NEW.secondary_keyword_5, NEW.secondary_keyword_6,
          NEW.secondary_keyword_7, NEW.secondary_keyword_8, NEW.secondary_keyword_9,
          NEW.secondary_keyword_10
        ]) AS elem
      ) t WHERE elem IS NOT NULL
    ), '[]'::jsonb),
    NEW.category, NEW.pillar_topic, NEW.content_tier,
    COALESCE(NEW.priority, 5), NEW.publish_priority, NEW.user_intent,
    NEW.keyword_difficulty, NEW.target_search_volume, NEW.keyword_source,
    NEW.slug, NEW.generated_slug, NEW.generated_at,
    COALESCE(NEW.used, false), NEW.notes, NEW.last_optimized_at,
    COALESCE(NEW.optimization_count, 0), COALESCE(NEW.gsc_tracked, false),
    NEW.created_at
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    primary_keyword = EXCLUDED.primary_keyword,
    secondary_keywords = EXCLUDED.secondary_keywords,
    category = EXCLUDED.category, pillar_topic = EXCLUDED.pillar_topic,
    content_tier = EXCLUDED.content_tier, priority = EXCLUDED.priority,
    publish_priority = EXCLUDED.publish_priority, user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    target_search_volume = EXCLUDED.target_search_volume,
    keyword_source = EXCLUDED.keyword_source, slug = EXCLUDED.slug,
    generated_slug = EXCLUDED.generated_slug, generated_at = EXCLUDED.generated_at,
    used = EXCLUDED.used, notes = EXCLUDED.notes,
    last_optimized_at = EXCLUDED.last_optimized_at,
    optimization_count = EXCLUDED.optimization_count,
    gsc_tracked = EXCLUDED.gsc_tracked;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_dentists ON blog_topics_dentists;
CREATE TRIGGER dual_write_dentists
  AFTER INSERT OR UPDATE ON blog_topics_dentists
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_dentists();

-- ---------------------------------------------------------------------------
-- Property: Property-style with text-typed priority + created_at
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_property() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, primary_keyword, secondary_keywords, category,
    pillar_topic, content_tier, content_branch, priority, publish_priority,
    user_intent, keyword_difficulty, search_volume, target_search_volume,
    competition, keyword_source, slug, used, used_at, last_optimized_at,
    optimization_count, gsc_tracked, created_at
  ) VALUES (
    NEW.id, 'property', NEW.topic, NEW.primary_keyword,
    COALESCE(to_jsonb(NEW.secondary_keywords), '[]'::jsonb), NEW.category,
    NEW.pillar_topic, NEW.content_tier, NEW.content_branch,
    COALESCE(NULLIF(NEW.priority, '')::integer, 5), NEW.publish_priority,
    NEW.user_intent, NEW.keyword_difficulty,
    COALESCE(NULLIF(NEW.search_volume, '')::integer, NULL),
    NEW.target_search_volume, NEW.competition, NEW.keyword_source,
    NEW.slug, COALESCE(NEW.used, false),
    NULLIF(NEW.used_at, '')::timestamptz, NEW.last_optimized_at,
    COALESCE(NEW.optimization_count, 0), COALESCE(NEW.gsc_tracked, false),
    COALESCE(NULLIF(NEW.created_at, '')::timestamptz, now())
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    primary_keyword = EXCLUDED.primary_keyword,
    secondary_keywords = EXCLUDED.secondary_keywords,
    category = EXCLUDED.category, pillar_topic = EXCLUDED.pillar_topic,
    content_tier = EXCLUDED.content_tier, content_branch = EXCLUDED.content_branch,
    priority = EXCLUDED.priority, publish_priority = EXCLUDED.publish_priority,
    user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    search_volume = EXCLUDED.search_volume,
    target_search_volume = EXCLUDED.target_search_volume,
    competition = EXCLUDED.competition, keyword_source = EXCLUDED.keyword_source,
    slug = EXCLUDED.slug, used = EXCLUDED.used, used_at = EXCLUDED.used_at,
    last_optimized_at = EXCLUDED.last_optimized_at,
    optimization_count = EXCLUDED.optimization_count,
    gsc_tracked = EXCLUDED.gsc_tracked;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_property ON blog_topics_property;
CREATE TRIGGER dual_write_property
  AFTER INSERT OR UPDATE ON blog_topics_property
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_property();

-- ---------------------------------------------------------------------------
-- Medical + Solicitors: Old simple shape, parameterised by site key
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_old_simple(_site_key text)
RETURNS void AS $$
BEGIN
  -- Placeholder — actual logic is in per-site trigger functions below.
  RAISE NOTICE 'sync_blog_topics_old_simple is a documentation helper, not a callable sync';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sync_blog_topics_medical() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, category, priority, user_intent, keyword_difficulty,
    search_volume, status, published_at, slug, notes, created_at, updated_at
  ) VALUES (
    NEW.id, 'medical', NEW.keyword, NEW.category,
    COALESCE(NEW.priority, 5), NEW.intent, NEW.difficulty,
    NEW.search_volume, NEW.status, NEW.published_at, NEW.slug, NEW.notes,
    NEW.created_at, COALESCE(NEW.updated_at, NEW.created_at)
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    category = EXCLUDED.category, priority = EXCLUDED.priority,
    user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    search_volume = EXCLUDED.search_volume, status = EXCLUDED.status,
    published_at = EXCLUDED.published_at, slug = EXCLUDED.slug,
    notes = EXCLUDED.notes;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_medical ON blog_topics_medical;
CREATE TRIGGER dual_write_medical
  AFTER INSERT OR UPDATE ON blog_topics_medical
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_medical();

CREATE OR REPLACE FUNCTION sync_blog_topics_solicitors() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, category, priority, user_intent, keyword_difficulty,
    search_volume, status, published_at, slug, notes, created_at, updated_at
  ) VALUES (
    NEW.id, 'solicitors', NEW.keyword, NEW.category,
    COALESCE(NEW.priority, 5), NEW.intent, NEW.difficulty,
    NEW.search_volume, NEW.status, NEW.published_at, NEW.slug, NEW.notes,
    NEW.created_at, COALESCE(NEW.updated_at, NEW.created_at)
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    category = EXCLUDED.category, priority = EXCLUDED.priority,
    user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    search_volume = EXCLUDED.search_volume, status = EXCLUDED.status,
    published_at = EXCLUDED.published_at, slug = EXCLUDED.slug,
    notes = EXCLUDED.notes;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_solicitors ON blog_topics_solicitors;
CREATE TRIGGER dual_write_solicitors
  AFTER INSERT OR UPDATE ON blog_topics_solicitors
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_solicitors();

-- ---------------------------------------------------------------------------
-- Agency + Generalist: Modern shape, direct mapping
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_agency() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, primary_keyword, secondary_keywords, category,
    pillar_topic, content_tier, content_branch, priority, publish_priority,
    user_intent, keyword_difficulty, search_volume, target_search_volume,
    competition, keyword_source, slug, suggested_slug, used, used_at, notes,
    last_optimized_at, optimization_count, gsc_tracked, created_at
  ) VALUES (
    NEW.id, 'agency', NEW.topic, NEW.primary_keyword,
    COALESCE(to_jsonb(NEW.secondary_keywords), '[]'::jsonb), NEW.category,
    NEW.pillar_topic, NEW.content_tier, NEW.content_branch,
    COALESCE(NEW.priority, 5), NEW.publish_priority, NEW.user_intent,
    NEW.keyword_difficulty, NEW.search_volume, NEW.target_search_volume,
    NEW.competition, NEW.keyword_source, NEW.slug, NEW.suggested_slug,
    COALESCE(NEW.used, false), NEW.used_at, NEW.notes,
    NEW.last_optimized_at, COALESCE(NEW.optimization_count, 0),
    COALESCE(NEW.gsc_tracked, false), NEW.created_at
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    primary_keyword = EXCLUDED.primary_keyword,
    secondary_keywords = EXCLUDED.secondary_keywords,
    category = EXCLUDED.category, pillar_topic = EXCLUDED.pillar_topic,
    content_tier = EXCLUDED.content_tier, content_branch = EXCLUDED.content_branch,
    priority = EXCLUDED.priority, publish_priority = EXCLUDED.publish_priority,
    user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    search_volume = EXCLUDED.search_volume,
    target_search_volume = EXCLUDED.target_search_volume,
    competition = EXCLUDED.competition, keyword_source = EXCLUDED.keyword_source,
    slug = EXCLUDED.slug, suggested_slug = EXCLUDED.suggested_slug,
    used = EXCLUDED.used, used_at = EXCLUDED.used_at, notes = EXCLUDED.notes,
    last_optimized_at = EXCLUDED.last_optimized_at,
    optimization_count = EXCLUDED.optimization_count,
    gsc_tracked = EXCLUDED.gsc_tracked;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_agency ON blog_topics_agency;
CREATE TRIGGER dual_write_agency
  AFTER INSERT OR UPDATE ON blog_topics_agency
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_agency();

CREATE OR REPLACE FUNCTION sync_blog_topics_generalist() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, primary_keyword, secondary_keywords, category,
    pillar_topic, content_tier, content_branch, priority, publish_priority,
    user_intent, keyword_difficulty, search_volume, target_search_volume,
    competition, keyword_source, slug, suggested_slug, used, used_at, notes,
    last_optimized_at, optimization_count, gsc_tracked, created_at
  ) VALUES (
    NEW.id, 'generalist', NEW.topic, NEW.primary_keyword,
    COALESCE(to_jsonb(NEW.secondary_keywords), '[]'::jsonb), NEW.category,
    NEW.pillar_topic, NEW.content_tier, NEW.content_branch,
    COALESCE(NEW.priority, 5), NEW.publish_priority, NEW.user_intent,
    NEW.keyword_difficulty, NEW.search_volume, NEW.target_search_volume,
    NEW.competition, NEW.keyword_source, NEW.slug, NEW.suggested_slug,
    COALESCE(NEW.used, false), NEW.used_at, NEW.notes,
    NEW.last_optimized_at, COALESCE(NEW.optimization_count, 0),
    COALESCE(NEW.gsc_tracked, false), NEW.created_at
  )
  ON CONFLICT (site_key, topic) DO UPDATE SET
    primary_keyword = EXCLUDED.primary_keyword,
    secondary_keywords = EXCLUDED.secondary_keywords,
    category = EXCLUDED.category, pillar_topic = EXCLUDED.pillar_topic,
    content_tier = EXCLUDED.content_tier, content_branch = EXCLUDED.content_branch,
    priority = EXCLUDED.priority, publish_priority = EXCLUDED.publish_priority,
    user_intent = EXCLUDED.user_intent,
    keyword_difficulty = EXCLUDED.keyword_difficulty,
    search_volume = EXCLUDED.search_volume,
    target_search_volume = EXCLUDED.target_search_volume,
    competition = EXCLUDED.competition, keyword_source = EXCLUDED.keyword_source,
    slug = EXCLUDED.slug, suggested_slug = EXCLUDED.suggested_slug,
    used = EXCLUDED.used, used_at = EXCLUDED.used_at, notes = EXCLUDED.notes,
    last_optimized_at = EXCLUDED.last_optimized_at,
    optimization_count = EXCLUDED.optimization_count,
    gsc_tracked = EXCLUDED.gsc_tracked;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dual_write_generalist ON blog_topics_generalist;
CREATE TRIGGER dual_write_generalist
  AFTER INSERT OR UPDATE ON blog_topics_generalist
  FOR EACH ROW EXECUTE FUNCTION sync_blog_topics_generalist();
