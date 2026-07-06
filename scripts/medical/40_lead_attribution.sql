-- =============================================================================
-- Medical: lead → landing page → channel attribution
-- Step P2.t2 of docs/medical/DIAGNOSIS_2026-07.md
--
-- Run standalone:  python scripts/_q.py scripts/medical/40_lead_attribution.sql
-- Run via wrapper: python scripts/medical/lead_attribution.py
--
-- NO PII columns (no full_name / email / phone).
-- Channel CASE logic verbatim from vw_channel_leads_weekly (20260617000002)
-- and vw_channel_conversion_geo (20260617000001) -- see migrations for provenance.
--
-- Attribution ladder (mirrors vw_channel_leads_weekly §attribution logic):
--   Option A: direct match on leads.session_id → web_sessions row.
--   Option B: first-touch match via leads.visitor_id → earliest human session
--             (site_key='medical', is_bot=false, MIN started_at).
--   Option C: no session match → referrer_host NULL → channel='direct'
--             (attribution_level='source_url' when source_url exists, else
--             'unattributed').
--
-- Per-lead output columns:
--   lead_id          uuid (no name/email/phone)
--   created_at       timestamptz
--   submit_page      path the FORM WAS SUBMITTED ON, from leads.source_url.
--                    leads.source_url = window.location.href captured at LeadForm
--                    mount (see Medical/web/.../forms/LeadForm.tsx + the shared
--                    createLeadSubmitHandler). It is the page the form lives on
--                    (usually /contact), NOT where the visitor entered the site.
--   entry_page       true LANDING page = web_sessions.entry_path of the resolved
--                    session (session_id match, else first-touch). NULL when no
--                    session could be resolved (source_url-only / unattributed).
--   landing          true-landing-preferred: COALESCE(entry_page, submit_page).
--                    Uses the real session entry page when known, falling back to
--                    the submit page only when there is no session. This is what
--                    rollups + GSC/Bing query enrichment key on (matching content
--                    pages, not the /contact submit page). Compare with submit_page
--                    to see visitors who navigated to /contact before converting.
--   attribution_level 'session' | 'first_touch' | 'source_url' | 'unattributed'
--   referrer_host    raw referrer from resolved session (NULL if no session)
--   channel          sub-channel: direct | chatgpt | perplexity | copilot |
--                    claude | gemini | ai_other | bing_family | google |
--                    social | referral  (same taxonomy as vw_channel_leads_weekly
--                    sub_channel; macro grouping done in Python wrapper)
--   utm_source       from resolved session
--   utm_medium       from resolved session
--   country          from resolved session
--   device_type      from resolved session
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
  WHERE l.source       = 'medical'
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
    AND ws.site_key   = 'medical'
    AND ws.is_bot     = false
  WHERE l.source       = 'medical'
    AND l.visitor_id  IS NOT NULL
  ORDER BY l.id, ws.started_at ASC
),

-- ─── Combine: resolve landing + enrichment from best available source ─────────
attributed AS (
  SELECT
    l.id                                              AS lead_id,
    l.created_at,

    -- submit_page: path the form was submitted on (leads.source_url = the page
    -- the LeadForm was mounted on, typically /contact). Strip scheme+host, strip
    -- query/fragment, strip trailing slash(es); bare domain maps to '/'.
    -- This is NOT the landing page — it is where the user converted.
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

    -- entry_page: the TRUE landing page = resolved session's entry_path
    -- (session_id match preferred, else first-touch). Trailing slash stripped to
    -- match the GSC/Bing page_url→path normalisation used in the Python wrapper
    -- and migration 20260617000003. NULL when no session resolves.
    CASE
      WHEN COALESCE(sa.entry_path, sb.entry_path) IS NOT NULL
      THEN COALESCE(
        NULLIF(rtrim(COALESCE(sa.entry_path, sb.entry_path), '/'), ''),
        '/'
      )
    END                                               AS entry_page,

    -- Attribution level: how richly we resolved the CHANNEL for this lead.
    -- 'session'     = exact session found via session_id (highest confidence)
    -- 'first_touch' = fell back to visitor's earliest session
    -- 'source_url'  = have URL but no session → channel inferred as 'direct'
    -- 'unattributed'= no session, no source_url
    CASE
      WHEN sa.lead_id   IS NOT NULL                        THEN 'session'
      WHEN sb.lead_id   IS NOT NULL                        THEN 'first_touch'
      WHEN l.source_url IS NOT NULL AND l.source_url <> '' THEN 'source_url'
      ELSE 'unattributed'
    END                                               AS attribution_level,

    -- Referrer host: sa preferred over sb.
    COALESCE(sa.referrer_host, sb.referrer_host)      AS referrer_host,

    -- ─── Channel sub-classification ──────────────────────────────────────────
    -- Verbatim from vw_channel_leads_weekly (20260617000002), applied to the
    -- resolved referrer_host.  NULL / empty referrer → 'direct' (matches the
    -- weekly view where Option C rows land in 'direct' then 'unattributed' in
    -- the macro rollup).
    CASE
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) IS NULL
        OR COALESCE(sa.referrer_host, sb.referrer_host) = ''
        THEN 'direct'

      -- copilot (checked before bing_family so bing.com/chat hits here first)
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%copilot.microsoft.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%sydney.bing.com%'
        OR (COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bing.com%'
            AND (COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%chat%'
                 OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%copilot%'))
        THEN 'copilot'

      -- chatgpt / openai
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%chatgpt.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%openai.com%'
        THEN 'chatgpt'

      -- perplexity
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%perplexity.ai%'
        THEN 'perplexity'

      -- claude
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%claude.ai%'
        THEN 'claude'

      -- gemini / bard
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%gemini.google.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bard.google.com%'
        THEN 'gemini'

      -- ai_other: named .ai TLD catch-all
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%.ai'
        THEN 'ai_other'

      -- bing_family (after copilot guard above)
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%bing.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%duckduckgo.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%yahoo.com%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%ecosia.org%'
        OR COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%search.brave.com%'
        THEN 'bing_family'

      -- google (after gemini guard above)
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%google%'
        THEN 'google'

      -- yandex → bing_family (alternative search family)
      WHEN COALESCE(sa.referrer_host, sb.referrer_host) ILIKE '%yandex%'
        THEN 'bing_family'

      -- social
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
  WHERE l.source = 'medical'
)

SELECT
  lead_id,
  created_at,
  submit_page,
  entry_page,
  -- true-landing-preferred: real session entry page when known, else submit page.
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
