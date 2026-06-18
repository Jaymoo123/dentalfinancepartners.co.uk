-- ============================================================================
-- Migration: 20260617000002_geo_leads_weekly_and_journey_fix.sql
-- Date: 2026-06-17
-- Purpose: GEO Measurement layer (Track B) -- weekly lead cadence + journey fix
--
--   1. vw_channel_leads_weekly  (NEW additive view)
--      Week-over-week lead counts by (site_key, channel, sub_channel).
--      Uses date_trunc('week', ...) so each row is a Monday-anchored ISO week.
--      channel / sub_channel are derived from web_sessions.referrer_host using
--      the same CASE logic as vw_channel_conversion_geo so they stay in sync.
--      sub_channel is the granular name (chatgpt / perplexity / copilot / claude /
--      gemini / ai_other / bing_family / google / social / internal / referral /
--      direct); channel is the macro bucket (ai / search / social / etc.).
--      Leads are joined from the leads table via session_id / visitor_id, not from
--      web_sessions.lead_id, so unstitched leads do not fall through.
--
--   2. vw_visitor_journey  (fixed: first-touch referrer uses MIN not MAX)
--      The view currently uses MAX(s.referrer_host) which returns the LAST
--      session's referrer, not the first. For attribution this should be the
--      EARLIEST session's referrer (the acquisition touchpoint).
--      Fix: use a DISTINCT ON subquery to extract the referrer_host from the
--      session with MIN(started_at) per (site_key, visitor_id).
--      Also fixes the device_type / os_family to use mode() (most common) rather
--      than MAX (alphabetically last) -- consistent with the enriched version in
--      20260605000005, which this DROP+CREATE must preserve exactly.
--
-- IDEMPOTENCY: Both are CREATE OR REPLACE VIEW (or DROP+CREATE where the column
-- set changes). vw_visitor_journey uses DROP because the 20260605000005 migration
-- already dropped-and-recreated it without a GRANT; we add one here for safety.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. vw_channel_leads_weekly
--
-- Lead count per ISO week (Monday-anchored) broken out by site_key, macro
-- channel (ai / search / social / internal / referral / direct) and sub_channel
-- (the granular engine/source name from vw_channel_conversion_geo).
--
-- Attribution logic:
--   * Leads are pulled from public.leads (created_at drives the week bucket)
--     because that table is the source of truth and is never sparse.
--   * The lead row carries session_id; we join to web_sessions on session_id to
--     get referrer_host, which we then classify into channel / sub_channel.
--   * When session_id is NULL on the lead (older leads or sites without tracking),
--     we fall back to visitor_id -> pick the EARLIEST session's referrer_host
--     for that visitor (first-touch, consistent with point 2 below).
--   * Leads with no matching session at all are counted in a synthetic
--     sub_channel = 'unattributed' / channel = 'direct' row so the total is
--     always equal to COUNT(*) on the leads table for that (site, week).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_channel_leads_weekly AS
WITH lead_sessions AS (
  -- Resolve the referrer_host for each lead:
  --   Option A: direct match on session_id (most accurate).
  --   Option B: first-touch session for the visitor (fallback).
  --   Option C: no match -> referrer_host stays NULL -> 'unattributed'.
  SELECT
    l.id                AS lead_id,
    l.source            AS site_key,
    l.created_at,
    COALESCE(
      -- Option A: session-level referrer
      (SELECT ws.referrer_host FROM public.web_sessions ws
       WHERE ws.session_id = l.session_id
       LIMIT 1),
      -- Option B: earliest session for visitor (first-touch)
      (SELECT ws.referrer_host FROM public.web_sessions ws
       WHERE ws.visitor_id = l.visitor_id
         AND ws.site_key   = l.source
         AND ws.is_bot     = false
       ORDER BY ws.started_at ASC
       LIMIT 1)
      -- Option C: NULL (unattributed)
    ) AS referrer_host
  FROM public.leads l
),
classified AS (
  SELECT
    ls.site_key,
    date_trunc('week', ls.created_at)::date           AS week_start,
    ls.lead_id,
    -- sub_channel (granular, mirrors vw_channel_conversion_geo CASE logic)
    CASE
      WHEN ls.referrer_host IS NULL OR ls.referrer_host = ''
        THEN 'direct'
      WHEN ls.referrer_host ILIKE '%copilot.microsoft.com%'
        OR ls.referrer_host ILIKE '%sydney.bing.com%'
        OR (ls.referrer_host ILIKE '%bing.com%'
            AND (ls.referrer_host ILIKE '%chat%' OR ls.referrer_host ILIKE '%copilot%'))
        THEN 'copilot'
      WHEN ls.referrer_host ILIKE '%chatgpt.com%'
        OR ls.referrer_host ILIKE '%openai.com%'
        THEN 'chatgpt'
      WHEN ls.referrer_host ILIKE '%perplexity.ai%'
        THEN 'perplexity'
      WHEN ls.referrer_host ILIKE '%claude.ai%'
        THEN 'claude'
      WHEN ls.referrer_host ILIKE '%gemini.google.com%'
        OR ls.referrer_host ILIKE '%bard.google.com%'
        THEN 'gemini'
      WHEN ls.referrer_host ILIKE '%.ai'
        THEN 'ai_other'
      WHEN ls.referrer_host ILIKE '%bing.com%'
        OR ls.referrer_host ILIKE '%duckduckgo.com%'
        OR ls.referrer_host ILIKE '%yahoo.com%'
        OR ls.referrer_host ILIKE '%ecosia.org%'
        OR ls.referrer_host ILIKE '%search.brave.com%'
        OR ls.referrer_host ILIKE '%yandex%'
        THEN 'bing_family'
      WHEN ls.referrer_host ILIKE '%google%'
        THEN 'google'
      WHEN ls.referrer_host ILIKE '%reddit.com%'
        OR ls.referrer_host ILIKE '%facebook.com%'
        OR ls.referrer_host ILIKE '%linkedin.com%'
        OR ls.referrer_host ILIKE '%twitter.com%'
        OR ls.referrer_host ILIKE '%t.co%'
        OR ls.referrer_host ILIKE '%instagram.com%'
        THEN 'social'
      -- internal self-referrals: not meaningful for lead attribution so treat
      -- as referral (the session was already on the site when the lead fired)
      ELSE
        CASE
          WHEN ls.referrer_host IS NOT NULL THEN 'referral'
          ELSE 'unattributed'
        END
    END AS sub_channel
  FROM lead_sessions ls
  WHERE ls.site_key IS NOT NULL
)
SELECT
  site_key,
  week_start,
  -- macro channel
  CASE
    WHEN sub_channel IN ('chatgpt', 'perplexity', 'copilot', 'claude', 'gemini', 'ai_other')
      THEN 'ai'
    WHEN sub_channel IN ('bing_family', 'google')
      THEN 'search'
    WHEN sub_channel = 'direct'
      THEN 'direct'
    WHEN sub_channel = 'social'
      THEN 'social'
    WHEN sub_channel = 'unattributed'
      THEN 'direct'      -- unattributed is functionally dark-social / direct
    ELSE 'referral'
  END                                                          AS channel,
  sub_channel,
  count(DISTINCT lead_id)                                      AS leads
FROM classified
GROUP BY site_key, week_start, channel, sub_channel
ORDER BY site_key, week_start DESC, leads DESC;

COMMENT ON VIEW public.vw_channel_leads_weekly IS
  'Week-over-week (ISO week, Monday-anchored) lead counts by (site_key, channel, sub_channel). '
  'sub_channel is the granular engine/source; channel is the macro bucket (ai/search/social/direct/referral). '
  'Attribution: session_id direct match first; then earliest session for visitor (first-touch); '
  'then unattributed (maps to channel=direct). Total leads per (site,week) equals leads table count.';

GRANT SELECT ON public.vw_channel_leads_weekly TO authenticated;


-- ----------------------------------------------------------------------------
-- 2. vw_visitor_journey  (fix: first-touch referrer, mode() device/os)
--
-- The previous version used MAX(s.referrer_host) which is last alphabetically,
-- not the first chronologically. We drop and recreate (column set unchanged
-- from 20260605000005 so dependent code is unaffected).
-- Note: the 20260605000005 migration already did a DROP IF EXISTS before its
-- CREATE, so there is no circular dependency risk here.
-- ----------------------------------------------------------------------------
DROP VIEW IF EXISTS public.vw_visitor_journey;

CREATE VIEW public.vw_visitor_journey AS
WITH ev AS (
  SELECT
    site_key,
    visitor_id,
    COUNT(*) FILTER (WHERE event_name = 'page_view')  AS page_views,
    COUNT(*) FILTER (WHERE event_name = 'cta_click')  AS cta_clicks
  FROM public.web_events
  WHERE is_bot = false
  GROUP BY site_key, visitor_id
),
first_touch AS (
  -- First-touch referrer: the referrer_host from the visitor's EARLIEST session
  -- (by started_at). Using MIN keeps attribution at the acquisition touchpoint.
  SELECT DISTINCT ON (s.site_key, s.visitor_id)
    s.site_key,
    s.visitor_id,
    s.referrer_host  AS first_referrer_host,
    s.utm_source     AS first_utm_source
  FROM public.web_sessions s
  WHERE s.is_bot = false
  ORDER BY s.site_key, s.visitor_id, s.started_at ASC
)
SELECT
  s.site_key,
  s.visitor_id,
  MIN(s.started_at)                                           AS first_seen,
  MAX(s.last_seen_at)                                         AS last_seen,
  COUNT(DISTINCT s.session_id)                                AS total_sessions,
  SUM(s.event_count)                                          AS total_events,
  SUM(s.engaged_ms)                                           AS total_engaged_ms,
  MAX(s.max_scroll_pct)                                       AS max_scroll_pct,
  bool_or(s.lead_id IS NOT NULL)                              AS converted,
  MAX(s.lead_id::text)                                        AS lead_id,
  mode() WITHIN GROUP (ORDER BY s.device_type)                AS device_type,
  mode() WITHIN GROUP (ORDER BY s.os_family)                  AS os_family,
  mode() WITHIN GROUP (ORDER BY s.country)                    AS country,
  ft.first_referrer_host                                      AS referrer_host,
  ft.first_utm_source                                         AS utm_source,
  COALESCE(MAX(ev.page_views), 0)                             AS page_views,
  COALESCE(MAX(ev.cta_clicks), 0)                             AS cta_clicks,
  (ARRAY_AGG(DISTINCT s.entry_path) FILTER (WHERE s.entry_path IS NOT NULL)) AS entry_paths
FROM public.web_sessions s
LEFT JOIN ev
  ON ev.site_key = s.site_key AND ev.visitor_id = s.visitor_id
LEFT JOIN first_touch ft
  ON ft.site_key = s.site_key AND ft.visitor_id = s.visitor_id
WHERE s.is_bot = false
GROUP BY s.site_key, s.visitor_id, ft.first_referrer_host, ft.first_utm_source;

COMMENT ON VIEW public.vw_visitor_journey IS
  'One row per visitor: first/last seen, sessions, events, engaged time, conversion, lead_id, '
  'device_type (mode), os_family (mode), country (mode), referrer_host (FIRST-TOUCH: earliest '
  'session by started_at, not latest), utm_source (first-touch), page_views, cta_clicks, entry_paths. '
  'Fix vs 20260605000005: referrer_host now uses MIN(started_at) first-touch attribution '
  'instead of MAX (which was returning the last session''s referrer).';

GRANT SELECT ON public.vw_visitor_journey TO authenticated;

NOTIFY pgrst, 'reload schema';
