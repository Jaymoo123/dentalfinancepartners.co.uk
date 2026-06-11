-- Migration: 20260611000002_channel_view_registry_internal.sql
-- GAP-3 precondition fix (Phase B spec, live-DB view audit):
-- vw_channel_conversion_geo hardcoded '%propertytaxpartners%' as the only
-- "internal" referrer pattern, so self-referrals on every other site were
-- misclassified as 'referral'. Replace the hardcode with a per-site match
-- against the sites registry's own domain (www. stripped).
--
-- Property output must be byte-identical before/after: for property rows the
-- registry domain is www.propertytaxpartners.co.uk, so the match is the same.
-- Branch order is unchanged (direct → ai → search → social → internal → referral).

CREATE OR REPLACE VIEW public.vw_channel_conversion_geo AS
WITH s AS (
  SELECT
    ws.site_key,
    COALESCE(ws.country, 'XX'::text) AS country,
    ws.lead_id,
    ws.session_id,
    COALESCE(NULLIF(ws.referrer_host, ''::text), '(direct)'::text) AS referrer_host,
    CASE
      WHEN ws.referrer_host IS NULL OR ws.referrer_host = ''::text THEN 'direct'::text
      WHEN ws.referrer_host ILIKE '%chatgpt%' OR ws.referrer_host ILIKE '%openai%'
        OR ws.referrer_host ILIKE '%perplexity%' OR ws.referrer_host ILIKE '%claude%'
        OR ws.referrer_host ILIKE '%copilot%' OR ws.referrer_host ILIKE '%gemini%'
        OR ws.referrer_host ILIKE '%.ai' THEN 'ai'::text
      WHEN ws.referrer_host ILIKE '%google%' OR ws.referrer_host ILIKE '%bing%'
        OR ws.referrer_host ILIKE '%duckduckgo%' OR ws.referrer_host ILIKE '%yahoo%'
        OR ws.referrer_host ILIKE '%ecosia%' OR ws.referrer_host ILIKE '%yandex%' THEN 'search'::text
      WHEN ws.referrer_host ILIKE '%reddit%' OR ws.referrer_host ILIKE '%facebook%'
        OR ws.referrer_host ILIKE '%linkedin%' OR ws.referrer_host ILIKE '%twitter%'
        OR ws.referrer_host ILIKE '%t.co' OR ws.referrer_host ILIKE '%instagram%' THEN 'social'::text
      WHEN st.domain IS NOT NULL
        AND ws.referrer_host ILIKE '%' || regexp_replace(st.domain, '^www\.', '') || '%'
        THEN 'internal'::text
      ELSE 'referral'::text
    END AS channel
  FROM public.web_sessions ws
  LEFT JOIN public.sites st ON st.site_key = ws.site_key
  WHERE ws.is_bot = false
)
SELECT
  site_key,
  country,
  channel,
  referrer_host,
  count(*) AS sessions,
  count(*) FILTER (WHERE lead_id IS NOT NULL) AS leads,
  CASE
    WHEN count(*) > 0 THEN count(*) FILTER (WHERE lead_id IS NOT NULL)::numeric / count(*)::numeric
    ELSE NULL::numeric
  END AS conversion_rate
FROM s
GROUP BY site_key, country, channel, referrer_host;

COMMENT ON VIEW public.vw_channel_conversion_geo IS
  'Sessions/leads/conversion by (site_key, country, channel, referrer_host). Internal channel = referrer matches the site''s own registry domain (sites.domain, www-stripped) — no hardcoded site domains.';

GRANT SELECT ON public.vw_channel_conversion_geo TO authenticated;

NOTIFY pgrst, 'reload schema';
