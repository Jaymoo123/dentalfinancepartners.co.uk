-- ============================================================================
-- Migration: 20260926000001_bound_dashboard_views_90d.sql
-- Date: 2026-09-26
-- Purpose: Bound 9 dashboard views to a rolling 90-day window.
--
-- WHY:
--   These views carried NO date predicate at all. Every dashboard load made
--   each one aggregate the ENTIRE history of web_events / web_sessions, and the
--   cost grew with every day of ingest. The estate-console slowdown first
--   diagnosed on 2026-06-30 (see 20260630000001_console_perf_section_action_and
--   _workmem.sql) was treated then by removing one correlated re-probe inside
--   vw_section_action; that migration's own header said the durable fix was to
--   restructure/bound the heavy views, not to tune the role. A compute upgrade
--   in July 2026 hid the remaining cost by throwing headroom at it, and that
--   headroom is now used up, so the underlying full-history scans are doing the
--   damage again.
--
--   The fix here is the cheap half of that recommendation: put a rolling
--   90-day predicate on the BASE TABLE scans (web_events.ts,
--   web_sessions.started_at) inside every CTE / join arm, so the existing
--   indexes -- web_events (site_key, event_name, ts DESC), the is_bot partial
--   twin, and web_sessions (site_key, started_at DESC) -- and the monthly
--   web_events RANGE partitioning can prune instead of reading everything.
--   The predicate is a bare `ts >= now() - interval '90 days'` with the column
--   left unwrapped, which is what keeps those indexes usable.
--
-- SCOPE OF THE CHANGE IN MEANING:
--   90 days is a DISPLAY-WINDOW decision, approved by the owner for these
--   panels. NO DATA IS DELETED and no retention setting is touched. All-time
--   history stays in web_events / web_sessions exactly as before, and the
--   all-time KPI surfaces are deliberately NOT touched here: web_timeseries,
--   estate_kpis, web_rollup and the views the KPI cards read are unchanged.
--   The detector-facing originals (vw_web_funnel_daily, vw_calculator_
--   conversion, vw_form_field_dropoff, vw_visitor_journey) are also untouched.
--
--   Consequence to expect on the dashboard: these 9 panels now describe the
--   last 90 days only. Figures older than 90 days drop out of them.
--
-- OUTPUT SHAPE:
--   Every view below keeps its exact output column list, names, order and
--   types. Verified column-by-column against the LIVE PostgREST OpenAPI
--   definitions on 2026-09-26 as well as against the latest repo definition.
--   Because nothing in the select lists changes, every view is a plain
--   CREATE OR REPLACE VIEW -- no DROP, so there is no window where a dashboard
--   read errors.
--
-- IDEMPOTENT: CREATE OR REPLACE only. Re-runnable. No cron, no scheduled
-- refresh, no materialised view, no notification of any kind.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. vw_web_funnel_daily_v2  (latest: 20260608000001)
--    Both sides bounded. The event bound goes in the LEFT JOIN's ON clause so
--    the outer-join semantics are preserved (a WHERE there would silently turn
--    it into an inner join and drop event-less sessions from `sessions`).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_web_funnel_daily_v2 AS
WITH base AS (
  SELECT
    s.site_key,
    s.started_at::date                                                             AS date,
    COALESCE(s.country, 'XX')                                                       AS country,
    s.session_id,
    (s.engaged_ms >= 10000)                                                         AS is_engaged,
    (s.lead_id IS NOT NULL)                                                         AS is_converted,
    COALESCE(bool_or(e.event_name = 'calc_computed'), false)                        AS used_calc,
    COALESCE(bool_or(e.event_name = 'cta_click'
                     AND e.props->>'goal' = 'form'), false)                         AS clicked_form_cta,
    COALESCE(bool_or(e.event_name = 'form_start'), false)                           AS started_form
  FROM public.web_sessions s
  LEFT JOIN public.web_events e
    ON e.session_id = s.session_id
   AND e.is_bot = false
   AND e.ts >= now() - INTERVAL '90 days'
  WHERE s.is_bot = false
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY s.site_key, s.started_at::date, COALESCE(s.country, 'XX'),
           s.session_id, s.engaged_ms, s.lead_id
),
flags AS (
  SELECT
    site_key, date, country, session_id,
    is_converted                                                       AS f_converted,
    (started_form      OR is_converted)                                AS f_form_start,
    (clicked_form_cta  OR started_form OR is_converted)                AS f_form_cta,
    used_calc                                                          AS f_calc,        -- branch
    (is_engaged OR clicked_form_cta OR started_form
                OR is_converted OR used_calc)                          AS f_engaged
  FROM base
)
SELECT
  site_key, date, country,
  COUNT(*)                                  AS sessions,
  COUNT(*) FILTER (WHERE f_engaged)         AS engaged_sessions,
  COUNT(*) FILTER (WHERE f_calc)            AS calc_sessions,        -- BRANCH off engaged
  COUNT(*) FILTER (WHERE f_form_cta)        AS form_cta_sessions,    -- mainline
  COUNT(*) FILTER (WHERE f_form_start)      AS form_start_sessions,
  COUNT(*) FILTER (WHERE f_converted)       AS converted_sessions
FROM flags
GROUP BY site_key, date, country;

COMMENT ON VIEW public.vw_web_funnel_daily_v2 IS
  'Per (site_key, date, country) TRUE nested funnel over the LAST 90 DAYS: sessions >= engaged >= form_cta >= form_start >= converted, with calc_sessions as a branch off engaged (<= engaged). form_cta counts sessions clicking a form-bound CTA (props.goal=form) OR reaching any later stage. country=XX for legacy NULL-geo rows. Powers the dashboard funnel; the old vw_web_funnel_daily is kept for the python funnel detector. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 2. vw_calculator_conversion_placement_geo  (latest: 20260608000001)
--    Events + sessions joined; both bounded.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_calculator_conversion_placement_geo AS
WITH calc AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')                                                    AS country,
    e.props->>'calculator_slug'                                                  AS calculator_slug,
    COALESCE(e.props->>'placement', 'unknown')                                   AS placement,
    COALESCE(e.props->>'tool_kind', 'standard')                                  AS tool_kind,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_view')          AS viewed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_computed')      AS computed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_result_viewed') AS result_viewed
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug'
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug',
           COALESCE(e.props->>'placement', 'unknown'),
           COALESCE(e.props->>'tool_kind', 'standard')
),
calc_leads AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')                   AS country,
    e.props->>'calculator_slug'                 AS calculator_slug,
    COALESCE(e.props->>'placement', 'unknown')  AS placement,
    COALESCE(e.props->>'tool_kind', 'standard') AS tool_kind,
    COUNT(DISTINCT e.session_id)                AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug' AND s.lead_id IS NOT NULL
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug',
           COALESCE(e.props->>'placement', 'unknown'),
           COALESCE(e.props->>'tool_kind', 'standard')
)
SELECT
  calc.site_key, calc.country, calc.calculator_slug, calc.placement, calc.tool_kind,
  calc.viewed, calc.computed, calc.result_viewed,
  COALESCE(cl.lead_sessions, 0)                                                        AS lead_sessions,
  CASE WHEN calc.viewed   > 0 THEN calc.computed::numeric / calc.viewed::numeric END   AS compute_rate,
  CASE WHEN calc.computed > 0 THEN COALESCE(cl.lead_sessions,0)::numeric / calc.computed::numeric END AS computed_to_lead_rate
FROM calc
LEFT JOIN calc_leads cl
  ON  cl.site_key        = calc.site_key
  AND cl.country         = calc.country
  AND cl.calculator_slug = calc.calculator_slug
  AND cl.placement       = calc.placement
  AND cl.tool_kind       = calc.tool_kind;

COMMENT ON VIEW public.vw_calculator_conversion_placement_geo IS
  'Country-aware twin of vw_calculator_conversion_placement, LAST 90 DAYS. Dashboard-only. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 3. vw_form_field_dropoff_geo  (latest: 20260608000001)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_form_field_dropoff_geo AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')                                                   AS country,
  e.props->>'form_id'                                                         AS form_id,
  e.props->>'field'                                                           AS field,
  COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus')                   AS focuses,
  COUNT(*) FILTER (WHERE e.event_name = 'form_field_abandon')                 AS abandons,
  COUNT(*) FILTER (WHERE e.event_name = 'form_error')                         AS errors,
  CASE WHEN COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus') > 0
    THEN COUNT(*) FILTER (WHERE e.event_name = 'form_field_abandon')::numeric
       / COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus')::numeric
    ELSE NULL END                                                            AS abandon_rate
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false
  AND e.event_name IN ('form_field_focus', 'form_field_abandon', 'form_error')
  AND e.props ? 'field'
  AND e.ts >= now() - INTERVAL '90 days'
  AND s.started_at >= now() - INTERVAL '90 days'
GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'form_id', e.props->>'field';

COMMENT ON VIEW public.vw_form_field_dropoff_geo IS
  'Country-aware twin of vw_form_field_dropoff (where users abandon the lead form, field by field), LAST 90 DAYS. Dashboard reads this; the python form-abandon detector keeps the original. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 4. vw_cta_performance  (latest: 20260608000002)
--    Three CTAs over events x sessions, plus the inner EXISTS probe of
--    web_events -- all four scans bounded.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_cta_performance AS
WITH clicks AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    MAX(e.props->>'goal')            AS goal,
    COUNT(*)                         AS clicks,
    COUNT(DISTINCT e.session_id)     AS click_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
),
to_form AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    COUNT(DISTINCT e.session_id)     AS form_start_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
    AND EXISTS (
      SELECT 1 FROM public.web_events f
      WHERE f.session_id = e.session_id AND f.is_bot = false AND f.event_name = 'form_start'
        AND f.ts >= now() - INTERVAL '90 days'
    )
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
),
to_lead AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    COUNT(DISTINCT e.session_id)     AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
    AND s.lead_id IS NOT NULL
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
)
SELECT
  c.site_key, c.country, c.cta_id, c.goal,
  c.clicks, c.click_sessions,
  COALESCE(f.form_start_sessions, 0)   AS form_start_sessions,
  COALESCE(l.lead_sessions, 0)         AS lead_sessions,
  CASE WHEN c.click_sessions > 0
       THEN COALESCE(f.form_start_sessions, 0)::numeric / c.click_sessions::numeric END AS click_to_form_rate
FROM clicks c
LEFT JOIN to_form f ON f.site_key = c.site_key AND f.country = c.country AND f.cta_id = c.cta_id
LEFT JOIN to_lead l ON l.site_key = c.site_key AND l.country = c.country AND l.cta_id = c.cta_id;

COMMENT ON VIEW public.vw_cta_performance IS
  'Per (site_key, country, cta_id) CTA effectiveness over the LAST 90 DAYS: clicks, distinct clicking sessions, sessions that later started a form (click_to_form_rate) and converted. goal=form marks form-bound CTAs. Exposes dead-end CTAs vs form-drivers. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 5. vw_ux_friction  (latest: 20260608000002)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_ux_friction AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')        AS country,
  e.page_path,
  COUNT(*) FILTER (WHERE e.event_name = 'rage_click')        AS rage_clicks,
  COUNT(*) FILTER (WHERE e.event_name = 'dead_click')        AS dead_clicks,
  COUNT(*) FILTER (WHERE e.event_name = 'client_error')      AS client_errors,
  COUNT(*) FILTER (WHERE e.event_name = 'exit_intent_shown') AS exit_intent_shown,
  COUNT(DISTINCT e.session_id) FILTER (
    WHERE e.event_name IN ('rage_click', 'dead_click', 'client_error')
  )                                                          AS friction_sessions
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false
  AND e.event_name IN ('rage_click', 'dead_click', 'client_error', 'exit_intent_shown')
  AND e.ts >= now() - INTERVAL '90 days'
  AND s.started_at >= now() - INTERVAL '90 days'
GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.page_path;

COMMENT ON VIEW public.vw_ux_friction IS
  'Per (site_key, country, page_path) UX friction over the LAST 90 DAYS: rage/dead clicks, client_error, exit_intent_shown, and distinct friction sessions. Surfaces broken/confusing spots. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 6. vw_client_errors  (latest: 20260608000003)
--    NOTE: last_seen is now the latest occurrence WITHIN the 90-day window.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_client_errors AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')                        AS country,
  COALESCE(NULLIF(e.props->>'message', ''), '(no message)') AS message,
  e.props->>'source'                               AS source,
  e.props->>'line'                                 AS line,
  COALESCE(e.props->>'kind', 'error')              AS kind,
  COUNT(*)                                         AS count,
  COUNT(DISTINCT e.session_id)                     AS sessions,
  MAX(e.page_path)                                 AS example_page,
  MAX(e.ts)                                        AS last_seen
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false AND e.event_name = 'client_error'
  AND e.ts >= now() - INTERVAL '90 days'
  AND s.started_at >= now() - INTERVAL '90 days'
GROUP BY e.site_key, COALESCE(s.country, 'XX'),
         COALESCE(NULLIF(e.props->>'message', ''), '(no message)'),
         e.props->>'source', e.props->>'line', COALESCE(e.props->>'kind', 'error');

COMMENT ON VIEW public.vw_client_errors IS
  'Per (site_key, country, message, source, line, kind) JS-error rollup over the LAST 90 DAYS: count, distinct sessions, an example page, last seen (latest occurrence inside the window). Actionable error list for the dashboard. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 7. vw_section_action  (latest: 20260630000001 -- the pre-aggregated form)
--    Bounds the reads CTE (events + sessions) and the separate actions CTE.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_section_action AS
WITH reads AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX'::text)            AS country,
    e.page_path,
    e.props ->> 'section_id'::text             AS section_id,
    e.session_id,
    min(e.ts)                                  AS first_seen,
    max(e.props ->> 'section_text'::text)      AS section_text,
    bool_or(s.lead_id IS NOT NULL)             AS converted
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false
    AND e.event_name = 'section_view'::text
    AND e.props ? 'section_id'::text
    AND e.ts >= now() - INTERVAL '90 days'
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'::text), e.page_path,
           e.props ->> 'section_id'::text, e.session_id
),
actions AS (
  -- One row per session: the latest cta_click / form_start timestamp. The outer
  -- "acted" test (last_action_ts >= first_seen) is exactly equivalent to the old
  -- EXISTS(any action at ts >= first_seen), but computed once instead of per row.
  SELECT
    a.session_id,
    max(a.ts) AS last_action_ts
  FROM public.web_events a
  WHERE a.is_bot = false
    AND a.event_name = ANY (ARRAY['cta_click'::text, 'form_start'::text])
    AND a.ts >= now() - INTERVAL '90 days'
  GROUP BY a.session_id
)
SELECT
  r.site_key,
  r.country,
  r.page_path,
  r.section_id,
  max(r.section_text)                                                       AS section_text,
  count(*)                                                                  AS read_sessions,
  count(*) FILTER (
    WHERE ac.last_action_ts IS NOT NULL AND ac.last_action_ts >= r.first_seen
  )                                                                         AS acted_sessions,
  count(*) FILTER (WHERE r.converted)                                       AS converted_sessions
FROM reads r
LEFT JOIN actions ac ON ac.session_id = r.session_id
GROUP BY r.site_key, r.country, r.page_path, r.section_id;

COMMENT ON VIEW public.vw_section_action IS
  'Per (site_key, country, page_path, section_id) over the LAST 90 DAYS: read_sessions, acted_sessions (session took a cta_click/form_start at or after first seeing the section), converted_sessions. Pre-aggregated latest-action join (2026-06-30). 90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 8. vw_channel_conversion_geo  (latest: 20260617000001)
--    Sessions-only view. The channel CASE ladder is reproduced byte-for-byte;
--    the only change is the added started_at bound. sites is a small lookup and
--    needs no bound.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_channel_conversion_geo AS
WITH s AS (
  SELECT
    ws.site_key,
    COALESCE(ws.country, 'XX'::text)                          AS country,
    ws.lead_id,
    ws.session_id,
    COALESCE(NULLIF(ws.referrer_host, ''::text), '(direct)') AS referrer_host,
    CASE
      -- ── direct ────────────────────────────────────────────────────────────
      WHEN ws.referrer_host IS NULL OR ws.referrer_host = ''
        THEN 'direct'

      -- ── copilot (before bing_family so bing.com/chat rows hit copilot) ──
      WHEN ws.referrer_host ILIKE '%copilot.microsoft.com%'
        OR ws.referrer_host ILIKE '%sydney.bing.com%'
        OR (ws.referrer_host ILIKE '%bing.com%'
            AND (ws.referrer_host ILIKE '%chat%' OR ws.referrer_host ILIKE '%copilot%'))
        THEN 'copilot'

      -- ── chatgpt / openai ──────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%chatgpt.com%'
        OR ws.referrer_host ILIKE '%openai.com%'
        THEN 'chatgpt'

      -- ── perplexity ────────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%perplexity.ai%'
        THEN 'perplexity'

      -- ── claude ────────────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%claude.ai%'
        THEN 'claude'

      -- ── gemini ────────────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%gemini.google.com%'
        OR ws.referrer_host ILIKE '%bard.google.com%'
        THEN 'gemini'

      -- ── ai_other: named .ai catch-all (explicit, auditable) ───────────────
      WHEN ws.referrer_host ILIKE '%.ai'
        THEN 'ai_other'

      -- ── bing_family ───────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%bing.com%'
        OR ws.referrer_host ILIKE '%duckduckgo.com%'
        OR ws.referrer_host ILIKE '%yahoo.com%'
        OR ws.referrer_host ILIKE '%ecosia.org%'
        OR ws.referrer_host ILIKE '%search.brave.com%'
        THEN 'bing_family'

      -- ── google ────────────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%google%'
        THEN 'google'

      -- ── yandex (retains previous search coverage) ─────────────────────────
      WHEN ws.referrer_host ILIKE '%yandex%'
        THEN 'bing_family'  -- grouped with alternative-search family

      -- ── social ────────────────────────────────────────────────────────────
      WHEN ws.referrer_host ILIKE '%reddit.com%'
        OR ws.referrer_host ILIKE '%facebook.com%'
        OR ws.referrer_host ILIKE '%linkedin.com%'
        OR ws.referrer_host ILIKE '%twitter.com%'
        OR ws.referrer_host ILIKE '%t.co%'
        OR ws.referrer_host ILIKE '%instagram.com%'
        THEN 'social'

      -- ── internal ─────────────────────────────────────────────────────────
      WHEN st.domain IS NOT NULL
        AND ws.referrer_host ILIKE '%' || regexp_replace(st.domain, '^www\.', '') || '%'
        THEN 'internal'

      -- ── referral (everything else) ────────────────────────────────────────
      ELSE 'referral'
    END AS channel
  FROM public.web_sessions ws
  LEFT JOIN public.sites st ON st.site_key = ws.site_key
  WHERE ws.is_bot = false
    AND ws.started_at >= now() - INTERVAL '90 days'
)
SELECT
  site_key,
  country,
  channel,
  referrer_host,
  count(*)                                                     AS sessions,
  count(*) FILTER (WHERE lead_id IS NOT NULL)                  AS leads,
  CASE
    WHEN count(*) > 0
    THEN count(*) FILTER (WHERE lead_id IS NOT NULL)::numeric / count(*)::numeric
    ELSE NULL::numeric
  END                                                          AS conversion_rate
FROM s
GROUP BY site_key, country, channel, referrer_host;

COMMENT ON VIEW public.vw_channel_conversion_geo IS
  'Sessions/leads/conversion by (site_key, country, channel, referrer_host) over the LAST 90 DAYS. '
  'channel values: direct | chatgpt | perplexity | copilot | claude | gemini | ai_other '
  '| bing_family | google | social | internal | referral. '
  'ai_other captures the legacy "%.ai" TLD catch-all explicitly. '
  'bing_family = bing.com (non-chat) + duckduckgo + yahoo + ecosia + brave + yandex. '
  'copilot = copilot.microsoft.com + sydney.bing.com + bing.com/*chat*. '
  'internal = referrer matches sites.domain (www-stripped) -- no hardcoded domains. '
  '90-day display window added 2026-09-26 (owner-approved); no data deleted.';

-- ----------------------------------------------------------------------------
-- 9. vw_visits_to_conversion  (latest: 20260611000001)
--    Sessions-only, scanned twice (conv_sessions + v). Both bounded.
--    Semantic note: with the window in place, a visitor's visit count and the
--    "first conversion" anchor are both computed from sessions inside the last
--    90 days, so a visitor whose earlier visits fall outside the window now
--    lands in a lower visits_bucket. That is inherent to a display window and
--    is the owner-approved trade.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_visits_to_conversion AS
WITH conv_sessions AS (
  -- Earliest conversion session per visitor+site (the session with lead_id set)
  SELECT
    visitor_id,
    site_key,
    MIN(started_at) AS first_converted_at
  FROM public.web_sessions
  WHERE lead_id IS NOT NULL
    AND is_bot = false
    AND started_at >= now() - INTERVAL '90 days'
  GROUP BY visitor_id, site_key
),
v AS (
  SELECT
    s.site_key,
    s.visitor_id,
    COUNT(DISTINCT
      CASE
        -- Converted visitor: only count sessions up to and including conversion
        WHEN cs.first_converted_at IS NOT NULL AND s.started_at <= cs.first_converted_at
          THEN s.session_id
        -- Non-converted visitor: count all sessions
        WHEN cs.first_converted_at IS NULL
          THEN s.session_id
        ELSE NULL  -- post-conversion return sessions: excluded from visit count
      END
    )                                                             AS visits,
    (cs.first_converted_at IS NOT NULL)                          AS converted,
    COALESCE(mode() WITHIN GROUP (ORDER BY s.country), 'XX')     AS country
  FROM public.web_sessions s
  LEFT JOIN conv_sessions cs
    ON cs.visitor_id = s.visitor_id
   AND cs.site_key   = s.site_key
  WHERE s.is_bot = false
    AND s.started_at >= now() - INTERVAL '90 days'
  GROUP BY s.site_key, s.visitor_id, cs.first_converted_at
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
  'Per (site_key, country, visits_bucket 1..6+) over the LAST 90 DAYS: how many visitors had that many sessions and how many converted. For converted visitors, visit count is frozen at the conversion session. 90-day display window added 2026-09-26 (owner-approved); no data deleted, but visits counted only within the window.';

GRANT SELECT ON public.vw_visits_to_conversion TO authenticated;

-- Make the replaced views visible to PostgREST immediately.
NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION (manual, after apply)
--   -- shape unchanged (compare against the pre-apply column list):
--   SELECT table_name, ordinal_position, column_name, data_type
--     FROM information_schema.columns
--    WHERE table_schema='public'
--      AND table_name IN ('vw_web_funnel_daily_v2','vw_calculator_conversion_placement_geo',
--                         'vw_form_field_dropoff_geo','vw_cta_performance','vw_section_action',
--                         'vw_ux_friction','vw_client_errors','vw_channel_conversion_geo',
--                         'vw_visits_to_conversion')
--    ORDER BY table_name, ordinal_position;
--
--   -- the bound is actually pruning (expect partition pruning + index scans,
--   -- NOT a full scan of every web_events partition):
--   EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM vw_ux_friction WHERE site_key='property';
--   EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM vw_section_action WHERE site_key='property';
--
--   -- equivalence inside the window (should be 0 rows both ways) -- run against
--   -- the old definition kept in a scratch schema if you want a hard check.
-- ============================================================================
