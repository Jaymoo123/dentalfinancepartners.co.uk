-- ============================================================================
-- PHASE 4 MIGRATION 3/3 — Dual-write triggers on source tables
-- ============================================================================
-- Date: 2026-05-20
-- Purpose: During the soak period, mirror writes from each per-site
--          blog_topics_<site> table into the unified blog_topics table.
--
-- Uses the same _phase4_parse_* helper functions created in migration 2/3
-- (the backfill SQL). Those helpers must already exist in the DB before
-- this migration runs.
--
-- Reads still go to OLD tables until consumer code is updated. Once consumers
-- switch to writing to NEW, these triggers become no-ops, then can be dropped.
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
--   DROP FUNCTION IF EXISTS sync_blog_topics_medical();
--   DROP FUNCTION IF EXISTS sync_blog_topics_solicitors();
--   DROP FUNCTION IF EXISTS sync_blog_topics_agency();
--   DROP FUNCTION IF EXISTS sync_blog_topics_generalist();
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Dentists
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
    _phase4_parse_priority(NEW.priority::text),
    _phase4_parse_int(NEW.publish_priority::text), NEW.user_intent,
    _phase4_parse_int(NEW.keyword_difficulty::text),
    _phase4_parse_int(NEW.target_search_volume::text), NEW.keyword_source,
    NEW.slug, NEW.generated_slug,
    _phase4_parse_ts(NEW.generated_at::text),
    COALESCE(NEW.used, false), NEW.notes,
    _phase4_parse_ts(NEW.last_optimized_at::text),
    COALESCE(_phase4_parse_int(NEW.optimization_count::text), 0),
    COALESCE(NEW.gsc_tracked, false),
    _phase4_parse_ts(NEW.created_at::text)
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
-- Property
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
    _phase4_parse_priority(NEW.priority::text),
    _phase4_parse_int(NEW.publish_priority::text),
    NEW.user_intent, _phase4_parse_int(NEW.keyword_difficulty::text),
    _phase4_parse_search_volume(NEW.search_volume::text),
    _phase4_parse_int(NEW.target_search_volume::text),
    NEW.competition::text, NEW.keyword_source, NEW.slug,
    COALESCE(NEW.used, false),
    _phase4_parse_ts(NEW.used_at::text),
    _phase4_parse_ts(NEW.last_optimized_at::text),
    COALESCE(_phase4_parse_int(NEW.optimization_count::text), 0),
    COALESCE(NEW.gsc_tracked, false),
    COALESCE(_phase4_parse_ts(NEW.created_at::text), now())
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
-- Medical (Old simple)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_medical() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, category, priority, user_intent, keyword_difficulty,
    search_volume, status, published_at, slug, notes, created_at, updated_at
  ) VALUES (
    NEW.id, 'medical', NEW.keyword, NEW.category,
    _phase4_parse_priority(NEW.priority::text),
    NEW.intent,
    _phase4_parse_int(NEW.difficulty::text),
    _phase4_parse_search_volume(NEW.search_volume::text),
    NEW.status,
    _phase4_parse_ts(NEW.published_at::text),
    NEW.slug, NEW.notes,
    COALESCE(_phase4_parse_ts(NEW.created_at::text), now()),
    COALESCE(_phase4_parse_ts(NEW.updated_at::text), _phase4_parse_ts(NEW.created_at::text), now())
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

-- ---------------------------------------------------------------------------
-- Solicitors (Old simple — same shape as medical)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_blog_topics_solicitors() RETURNS trigger AS $$
BEGIN
  INSERT INTO blog_topics (
    id, site_key, topic, category, priority, user_intent, keyword_difficulty,
    search_volume, status, published_at, slug, notes, created_at, updated_at
  ) VALUES (
    NEW.id, 'solicitors', NEW.keyword, NEW.category,
    _phase4_parse_priority(NEW.priority::text),
    NEW.intent,
    _phase4_parse_int(NEW.difficulty::text),
    _phase4_parse_search_volume(NEW.search_volume::text),
    NEW.status,
    _phase4_parse_ts(NEW.published_at::text),
    NEW.slug, NEW.notes,
    COALESCE(_phase4_parse_ts(NEW.created_at::text), now()),
    COALESCE(_phase4_parse_ts(NEW.updated_at::text), _phase4_parse_ts(NEW.created_at::text), now())
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
-- Agency (Modern)
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
    _phase4_parse_priority(NEW.priority::text),
    _phase4_parse_int(NEW.publish_priority::text), NEW.user_intent,
    _phase4_parse_int(NEW.keyword_difficulty::text),
    _phase4_parse_search_volume(NEW.search_volume::text),
    _phase4_parse_int(NEW.target_search_volume::text),
    NEW.competition::text, NEW.keyword_source, NEW.slug, NEW.suggested_slug,
    COALESCE(NEW.used, false),
    _phase4_parse_ts(NEW.used_at::text),
    NEW.notes,
    _phase4_parse_ts(NEW.last_optimized_at::text),
    COALESCE(_phase4_parse_int(NEW.optimization_count::text), 0),
    COALESCE(NEW.gsc_tracked, false),
    COALESCE(_phase4_parse_ts(NEW.created_at::text), now())
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

-- ---------------------------------------------------------------------------
-- Generalist (Modern — same shape as agency)
-- ---------------------------------------------------------------------------
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
    _phase4_parse_priority(NEW.priority::text),
    _phase4_parse_int(NEW.publish_priority::text), NEW.user_intent,
    _phase4_parse_int(NEW.keyword_difficulty::text),
    _phase4_parse_search_volume(NEW.search_volume::text),
    _phase4_parse_int(NEW.target_search_volume::text),
    NEW.competition::text, NEW.keyword_source, NEW.slug, NEW.suggested_slug,
    COALESCE(NEW.used, false),
    _phase4_parse_ts(NEW.used_at::text),
    NEW.notes,
    _phase4_parse_ts(NEW.last_optimized_at::text),
    COALESCE(_phase4_parse_int(NEW.optimization_count::text), 0),
    COALESCE(NEW.gsc_tracked, false),
    COALESCE(_phase4_parse_ts(NEW.created_at::text), now())
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
