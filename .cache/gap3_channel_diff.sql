WITH s_old AS (
  SELECT ws.site_key, COALESCE(ws.country,'XX') AS country, ws.lead_id,
    COALESCE(NULLIF(ws.referrer_host,''),'(direct)') AS referrer_host,
    CASE
      WHEN ws.referrer_host IS NULL OR ws.referrer_host='' THEN 'direct'
      WHEN ws.referrer_host ILIKE '%chatgpt%' OR ws.referrer_host ILIKE '%openai%' OR ws.referrer_host ILIKE '%perplexity%' OR ws.referrer_host ILIKE '%claude%' OR ws.referrer_host ILIKE '%copilot%' OR ws.referrer_host ILIKE '%gemini%' OR ws.referrer_host ILIKE '%.ai' THEN 'ai'
      WHEN ws.referrer_host ILIKE '%google%' OR ws.referrer_host ILIKE '%bing%' OR ws.referrer_host ILIKE '%duckduckgo%' OR ws.referrer_host ILIKE '%yahoo%' OR ws.referrer_host ILIKE '%ecosia%' OR ws.referrer_host ILIKE '%yandex%' THEN 'search'
      WHEN ws.referrer_host ILIKE '%reddit%' OR ws.referrer_host ILIKE '%facebook%' OR ws.referrer_host ILIKE '%linkedin%' OR ws.referrer_host ILIKE '%twitter%' OR ws.referrer_host ILIKE '%t.co' OR ws.referrer_host ILIKE '%instagram%' THEN 'social'
      WHEN ws.referrer_host ILIKE '%propertytaxpartners%' THEN 'internal'
      ELSE 'referral'
    END AS channel
  FROM public.web_sessions ws WHERE ws.is_bot=false AND ws.site_key='property'
),
old_view AS (
  SELECT site_key, country, channel, referrer_host, count(*) AS sessions,
    count(*) FILTER (WHERE lead_id IS NOT NULL) AS leads
  FROM s_old GROUP BY site_key, country, channel, referrer_host
),
new_view AS (
  SELECT site_key, country, channel, referrer_host, sessions, leads
  FROM vw_channel_conversion_geo WHERE site_key='property'
)
SELECT 'only_in_old' AS side, * FROM (SELECT * FROM old_view EXCEPT SELECT * FROM new_view) a
UNION ALL
SELECT 'only_in_new', * FROM (SELECT * FROM new_view EXCEPT SELECT * FROM old_view) b;
