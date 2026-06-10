-- ============================================================================
-- Migration: 20260608000006_channel_and_visits_views.sql
-- Date: 2026-06-08
-- Purpose: Surface two truths the dashboard hides today —
--   * vw_channel_conversion_geo : channel VALUE (not volume). Classifies the
--     referrer into ai / search / social / internal / referral / direct so we can
--     see that e.g. Bing floods but converts 0, while direct/return/AI convert.
--   * vw_visits_to_conversion   : per-visitor session-count histogram vs whether
--     they converted — makes the multi-visit reality (conversion needs return
--     visits) visible. Both country-aware. ADDITIVE / prod-safe.
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_channel_conversion_geo AS
WITH s AS (
  SELECT
    site_key,
    COALESCE(country, 'XX')                          AS country,
    lead_id,
    session_id,
    COALESCE(NULLIF(referrer_host, ''), '(direct)')  AS referrer_host,
    CASE
      WHEN referrer_host IS NULL OR referrer_host = '' THEN 'direct'
      WHEN referrer_host ILIKE '%chatgpt%' OR referrer_host ILIKE '%openai%'
        OR referrer_host ILIKE '%perplexity%' OR referrer_host ILIKE '%claude%'
        OR referrer_host ILIKE '%copilot%' OR referrer_host ILIKE '%gemini%'
        OR referrer_host ILIKE '%.ai' THEN 'ai'
      WHEN referrer_host ILIKE '%google%' OR referrer_host ILIKE '%bing%'
        OR referrer_host ILIKE '%duckduckgo%' OR referrer_host ILIKE '%yahoo%'
        OR referrer_host ILIKE '%ecosia%' OR referrer_host ILIKE '%yandex%' THEN 'search'
      WHEN referrer_host ILIKE '%reddit%' OR referrer_host ILIKE '%facebook%'
        OR referrer_host ILIKE '%linkedin%' OR referrer_host ILIKE '%twitter%'
        OR referrer_host ILIKE '%t.co' OR referrer_host ILIKE '%instagram%' THEN 'social'
      WHEN referrer_host ILIKE '%propertytaxpartners%' THEN 'internal'
      ELSE 'referral'
    END                                              AS channel
  FROM public.web_sessions
  WHERE is_bot = false
)
SELECT
  s.site_key, s.country, s.channel, s.referrer_host,
  COUNT(*)                                       AS sessions,
  COUNT(*) FILTER (WHERE s.lead_id IS NOT NULL)  AS leads,
  CASE WHEN COUNT(*) > 0
       THEN COUNT(*) FILTER (WHERE s.lead_id IS NOT NULL)::numeric / COUNT(*) END AS conversion_rate
FROM s
GROUP BY s.site_key, s.country, s.channel, s.referrer_host;

COMMENT ON VIEW public.vw_channel_conversion_geo IS
  'Per (site_key, country, channel, referrer_host): sessions, leads, conversion_rate. channel classifies the referrer (ai/search/social/internal/referral/direct) so the dashboard can show channel VALUE not just volume.';

CREATE OR REPLACE VIEW public.vw_visits_to_conversion AS
WITH v AS (
  SELECT
    site_key,
    visitor_id,
    COUNT(DISTINCT session_id)                                AS visits,
    bool_or(lead_id IS NOT NULL)                              AS converted,
    COALESCE(mode() WITHIN GROUP (ORDER BY country), 'XX')    AS country
  FROM public.web_sessions
  WHERE is_bot = false
  GROUP BY site_key, visitor_id
)
SELECT
  site_key,
  country,
  LEAST(visits, 6)                          AS visits_bucket,   -- 1..5, then 6 = "6+"
  COUNT(*)                                   AS visitors,
  COUNT(*) FILTER (WHERE converted)          AS converted_visitors
FROM v
GROUP BY site_key, country, LEAST(visits, 6);

COMMENT ON VIEW public.vw_visits_to_conversion IS
  'Per (site_key, country, visits_bucket 1..6+): how many visitors had that many sessions and how many converted. Surfaces that conversion concentrates in returning visitors (the multi-visit reality).';

GRANT SELECT ON public.vw_channel_conversion_geo TO authenticated;
GRANT SELECT ON public.vw_visits_to_conversion   TO authenticated;

NOTIFY pgrst, 'reload schema';
