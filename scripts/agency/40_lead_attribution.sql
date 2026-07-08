-- =============================================================================
-- Agency: lead → landing page → channel attribution
-- Adapted from scripts/medical/40_lead_attribution.sql for source='agency'.
--
-- Run standalone:  python scripts/_q.py scripts/agency/40_lead_attribution.sql
-- Run via wrapper: python scripts/agency/lead_attribution.py
--
-- NO PII columns (no full_name / email / phone).
-- Channel CASE logic verbatim from vw_channel_leads_weekly (20260617000002).
--
-- NOTE: agency has NO GA4 integration. First-party analytics come from:
--   web_sessions (site_key='agency') — session-level enrichment
--   web_events   (site_key='agency') — event-level data
--
-- Attribution ladder (mirrors vw_channel_leads_weekly §attribution logic):
--   Option A: direct match on leads.session_id → web_sessions row.
--   Option B: first-touch match via leads.visitor_id → earliest human session
--             (site_key='agency', is_bot=false, MIN started_at).
--   Option C: no session match → referrer_host NULL → channel='direct'
--             (attribution_level='source_url' when source_url exists, else
--             'unattributed').
-- =============================================================================

WITH

-- ─── Option A: direct session_id match ───────────────────────────────────────
session_a AS (
  SELECT
    l.id                AS lead_id,
    ws.entry_path,
    ws.referrer_host,
    ws.utm_source,
    ws.utm_medium,
    ws.country,
    ws.device_type
  FROM public.leads l
  JOIN public.web_sessions ws
    ON  ws.session_id = l.session_id
    AND ws.is_bot     = false
  WHERE l.source       = 'agency'
    AND l.session_id  IS NOT NULL
),

-- ─── Option B: first-touch via visitor_id (MIN started_at) ───────────────────
session_b AS (
  SELECT DISTINCT ON (l.id)
    l.id                AS lead_id,
    ws.entry_path,
    ws.referrer_host,
    ws.utm_source,
    ws.utm_medium,
    ws.country,
    ws.device_type
  FROM public.leads l
  JOIN public.web_sessions ws
    ON  ws.visitor_id = l.visitor_id
    AND ws.site_key   = 'agency'
    AND ws.is_bot     = false
  WHERE l.source       = 'agency'
    AND l.visitor_id  IS NOT NULL
  ORDER BY l.id, ws.started_at ASC
),

-- ─── Combine: resolve landing + enrichment from best available source ─────────
attributed AS (
  SELECT
    l.id                                              AS lead_id,
    l.created_at,

    CASE
      WHEN l.source_url IS NOT NULL AND l.source_url <> ''
      THEN COALESCE(
        NULLIF(
          rtrim(
            regexp_replace(
              regexp_replace(l.source_url, '^https?://[^/]+', ''),
              '[?#].*$', ''
            ),
            '/'
          ),
          ''
        ),
        '/'
      )
    END                                               AS submit_page,

    CASE
      WHEN COALESCE(sa.entry_path, sb.entry_path) IS NOT NULL
      THEN COALESCE(
        NULLIF(rtrim(COALESCE(sa.entry_path, sb.entry_path), '/'), ''),
        '/'
      )
    END                                               AS entry_page,

    CASE
      WHEN sa.lead_id   IS NOT NULL                        THEN 'session'
      WHEN sb.lead_id   IS NOT NULL                        THEN 'first_touch'
      WHEN l.source_url IS NOT NULL AND l.source_url <> '' THEN 'source_url'
      ELSE 'unattributed'
    END                                               AS attribution_level,

    COALESCE(sa.referrer_host, sb.referrer_host)      AS referrer_host,

    CASE
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) IS NULL
        OR COALESCE(sa.referrer_host, sb.referrer_host) = ''
        THEN 'direct'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%copilot.microsoft.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%sydney.bing.com%'
        OR (COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bing.com%'
            AND (COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%chat%'
                 OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%copilot%'))
        THEN 'copilot'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%chatgpt.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%openai.com%'
        THEN 'chatgpt'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%perplexity.ai%'
        THEN 'perplexity'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%claude.ai%'
        THEN 'claude'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%gemini.google.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bard.google.com%'
        THEN 'gemini'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%.ai'
        THEN 'ai_other'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bing.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%duckduckgo.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%yahoo.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%ecosia.org%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%search.brave.com%'
        THEN 'bing_family'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%google%'
        THEN 'google'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%yandex%'
        THEN 'bing_family'
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%reddit.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%facebook.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%linkedin.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%twitter.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%t.co%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%instagram.com%'
        THEN 'social'
      ELSE 'referral'
    END                                               AS channel,

    COALESCE(sa.utm_source,  sb.utm_source)           AS utm_source,
    COALESCE(sa.utm_medium,  sb.utm_medium)           AS utm_medium,
    COALESCE(sa.country,     sb.country)              AS country,
    COALESCE(sa.device_type, sb.device_type)          AS device_type

  FROM public.leads l
  LEFT JOIN session_a sa ON sa.lead_id = l.id
  LEFT JOIN session_b sb ON sb.lead_id = l.id
  WHERE l.source = 'agency'
)

SELECT
  lead_id,
  created_at,
  submit_page,
  entry_page,
  COALESCE(entry_page, submit_page)                   AS landing,
  attribution_level,
  referrer_host,
  channel,
  utm_source,
  utm_medium,
  country,
  device_type
FROM attributed
ORDER BY created_at ASC;
