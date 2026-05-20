-- ============================================================================
-- Migration: 20260520000009_create_ga4_page_data.sql
-- Date: 2026-05-20
-- Purpose: GA4 page-level daily metrics for the optimisation engine.
--
-- Complements public.gsc_query_data (impressions/clicks/position) with
-- post-click engagement and conversion signals — needed to spot
-- "pages getting traffic but failing to engage or convert" opportunities.
--
-- Populated by optimisation_engine.ingestion.ingest_ga4 via the GA4 Data API.
-- One row per (site_key, page_path, date). Idempotent upsert via UNIQUE.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.ga4_page_data (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key                    TEXT NOT NULL REFERENCES public.sites(site_key),
  page_path                   TEXT NOT NULL,
  date                        DATE NOT NULL,
  -- Volume
  active_users                INTEGER NOT NULL DEFAULT 0,
  sessions                    INTEGER NOT NULL DEFAULT 0,
  screen_page_views           INTEGER NOT NULL DEFAULT 0,
  -- Engagement
  engaged_sessions            INTEGER NOT NULL DEFAULT 0,
  engagement_rate             NUMERIC(6, 4),
  average_session_duration    NUMERIC(10, 2),
  user_engagement_duration    NUMERIC(12, 2),
  bounce_rate                 NUMERIC(6, 4),
  -- Events / conversions
  event_count                 INTEGER NOT NULL DEFAULT 0,
  conversions                 INTEGER NOT NULL DEFAULT 0,
  -- Bookkeeping
  fetched_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ga4_page_data_unique UNIQUE (site_key, page_path, date)
);

COMMENT ON TABLE public.ga4_page_data IS
  'Daily GA4 page-level metrics. Complements gsc_query_data. Populated by optimisation_engine.ingestion.ingest_ga4 from the GA4 Data API.';
COMMENT ON COLUMN public.ga4_page_data.engagement_rate IS
  'GA4 engagement rate = engagedSessions / sessions. 0..1.';
COMMENT ON COLUMN public.ga4_page_data.bounce_rate IS
  'GA4 bounceRate = 1 - engagementRate. Kept separately because GA4 returns it independently in some report shapes.';

CREATE INDEX IF NOT EXISTS ga4_page_data_site_date_idx
  ON public.ga4_page_data (site_key, date DESC);
CREATE INDEX IF NOT EXISTS ga4_page_data_site_path_idx
  ON public.ga4_page_data (site_key, page_path);

-- View: cross-reference GA4 engagement against GSC traffic for the same page
-- over the same recent window. Used by the engagement-gap detector.
CREATE OR REPLACE VIEW public.vw_engagement_vs_impressions AS
WITH ga4_28d AS (
  SELECT
    site_key,
    page_path,
    SUM(sessions) AS sessions_28d,
    SUM(engaged_sessions) AS engaged_sessions_28d,
    CASE WHEN SUM(sessions) > 0
      THEN SUM(engaged_sessions)::numeric / SUM(sessions)::numeric
      ELSE NULL END AS engagement_rate_28d,
    SUM(conversions) AS conversions_28d,
    SUM(event_count) AS events_28d,
    AVG(NULLIF(average_session_duration, 0)) AS avg_session_duration_28d
  FROM public.ga4_page_data
  WHERE date >= CURRENT_DATE - INTERVAL '28 days'
  GROUP BY site_key, page_path
),
gsc_28d AS (
  SELECT
    site_key,
    -- gsc_query_data stores absolute page URLs; reduce to path so it joins to GA4.
    regexp_replace(page_url, '^https?://[^/]+', '') AS page_path,
    SUM(impressions) AS impressions_28d,
    SUM(clicks) AS clicks_28d,
    CASE WHEN SUM(impressions) > 0
      THEN SUM(clicks)::numeric / SUM(impressions)::numeric
      ELSE NULL END AS ctr_28d
  FROM public.gsc_query_data
  WHERE date >= CURRENT_DATE - INTERVAL '28 days'
  GROUP BY site_key, regexp_replace(page_url, '^https?://[^/]+', '')
)
SELECT
  COALESCE(ga4.site_key, gsc.site_key) AS site_key,
  COALESCE(ga4.page_path, gsc.page_path) AS page_path,
  COALESCE(gsc.impressions_28d, 0) AS impressions_28d,
  COALESCE(gsc.clicks_28d, 0) AS clicks_28d,
  gsc.ctr_28d,
  COALESCE(ga4.sessions_28d, 0) AS sessions_28d,
  COALESCE(ga4.engaged_sessions_28d, 0) AS engaged_sessions_28d,
  ga4.engagement_rate_28d,
  COALESCE(ga4.conversions_28d, 0) AS conversions_28d,
  COALESCE(ga4.events_28d, 0) AS events_28d,
  ga4.avg_session_duration_28d
FROM ga4_28d ga4
FULL OUTER JOIN gsc_28d gsc
  ON ga4.site_key = gsc.site_key AND ga4.page_path = gsc.page_path;

COMMENT ON VIEW public.vw_engagement_vs_impressions IS
  'For each page, join 28d GSC impressions/clicks against 28d GA4 sessions/engagement/conversions. Drives the engagement-gap detector.';
