-- ============================================================================
-- Migration: 20260605000001_create_web_analytics_tables.sql
-- Date: 2026-06-05
-- Purpose: First-party, consent-gated, bot-filtered user-behaviour analytics.
--
-- Captures every real-user action on the niche sites as structured events so
-- the optimisation engine can find conversion-rate (CRO) opportunities the same
-- way it already finds SEO ones. This is the SYSTEM OF RECORD for on-site
-- behaviour; GA4 / Microsoft Clarity are secondary.
--
-- Written ONLY by the same-origin /api/track route handler using the Supabase
-- SERVICE ROLE (which bypasses RLS). The anon key never touches these tables.
--
--   public.web_sessions  -- one row per session (upserted as it progresses)
--   public.web_events    -- one row per event (insert-only, RANGE-partitioned)
--
-- Plus rollup views (human-only) that detectors/dashboards query instead of
-- scanning raw events, including vw_visitor_journey -- the "entire story per
-- person" artifact.
--
-- Privacy: raw IP is NEVER stored (only a derived `country`). visitor_id is a
-- random client id, not derived from PII. Behavioural events carry no PII.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- web_sessions : one row per visit, upserted on (session_id)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.web_sessions (
  session_id            TEXT PRIMARY KEY,                 -- client-minted, e.g. s_<ulid>
  visitor_id            TEXT NOT NULL,                    -- persistent localStorage id
  site_key              TEXT NOT NULL REFERENCES public.sites(site_key),

  started_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Acquisition / context
  entry_path            TEXT,
  exit_path             TEXT,
  referrer              TEXT,
  referrer_host         TEXT,
  utm_source            TEXT,
  utm_medium            TEXT,
  utm_campaign          TEXT,
  utm_term              TEXT,
  utm_content           TEXT,

  -- Device (no fingerprinting; coarse only)
  device_type           TEXT,                             -- mobile | tablet | desktop
  viewport_w            INTEGER,
  viewport_h            INTEGER,
  ua_family             TEXT,
  os_family             TEXT,
  country               TEXT,                             -- derived from edge geo header; NEVER raw IP

  -- Embed context (calculator widgets on partner sites)
  is_embed              BOOLEAN NOT NULL DEFAULT false,
  embed_slug            TEXT,
  embed_referrer_host   TEXT,

  -- Consent (gate-everything model: only granted sessions are written at all)
  consent_state         TEXT,                             -- granted | denied | essential

  -- Bot exclusion
  is_bot                BOOLEAN NOT NULL DEFAULT false,
  bot_reason            TEXT,
  botid_verified        BOOLEAN,
  human_confirmed       BOOLEAN NOT NULL DEFAULT false,   -- flips true on real pointer/keyboard/scroll

  -- Conversion stitch (soft ref to leads; nullable until the visitor converts)
  lead_id               UUID,

  -- Rolling counters maintained by /api/track
  event_count           INTEGER NOT NULL DEFAULT 0,
  engaged_ms            INTEGER NOT NULL DEFAULT 0,
  max_scroll_pct        INTEGER NOT NULL DEFAULT 0
);

COMMENT ON TABLE public.web_sessions IS
  'One row per real-user session. Upserted by /api/track (service role). Anon has no access. country is derived from edge geo; raw IP is never stored.';
COMMENT ON COLUMN public.web_sessions.human_confirmed IS
  'TRUE once a genuine pointermove/keydown/scroll with non-zero dwell was seen. Human rollups require is_bot=false AND human_confirmed=true.';
COMMENT ON COLUMN public.web_sessions.lead_id IS
  'Soft reference to public.leads(id). Backfilled when this session''s visitor converts, joining the journey to the lead.';

CREATE INDEX IF NOT EXISTS web_sessions_visitor_idx       ON public.web_sessions (visitor_id);
CREATE INDEX IF NOT EXISTS web_sessions_site_started_idx  ON public.web_sessions (site_key, started_at DESC);
CREATE INDEX IF NOT EXISTS web_sessions_lead_idx          ON public.web_sessions (lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS web_sessions_human_idx         ON public.web_sessions (site_key, started_at DESC) WHERE is_bot = false AND human_confirmed = true;

-- ----------------------------------------------------------------------------
-- web_events : insert-only, RANGE-partitioned by ts (monthly). 180-day retention
-- is a cheap DROP of the oldest partition.
--
-- A partitioned table's PRIMARY KEY must include the partition key, so the PK is
-- (id, ts). A partitioned table with no matching partition REJECTS inserts, so
-- we ship a DEFAULT catch-all plus the current + next two months, and the daily
-- job (optimisation_engine) pre-creates the upcoming month.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.web_events (
  id            UUID NOT NULL DEFAULT gen_random_uuid(),
  ts            TIMESTAMPTZ NOT NULL DEFAULT now(),       -- server receive time (partition key)
  client_ts     TIMESTAMPTZ,                              -- client-reported time (untrusted)

  session_id    TEXT NOT NULL,
  visitor_id    TEXT NOT NULL,
  site_key      TEXT NOT NULL REFERENCES public.sites(site_key),

  event_name    TEXT NOT NULL,                            -- allowlisted in /api/track + lib/analytics/types
  page_path     TEXT,
  page_query    TEXT,
  props         JSONB NOT NULL DEFAULT '{}'::jsonb,       -- event-specific payload; no PII

  is_embed      BOOLEAN NOT NULL DEFAULT false,
  is_bot        BOOLEAN NOT NULL DEFAULT false,

  PRIMARY KEY (id, ts)
) PARTITION BY RANGE (ts);

COMMENT ON TABLE public.web_events IS
  'Insert-only first-party behaviour events, monthly RANGE partitions (180-day retention). Written by /api/track (service role). props carries no PII.';

-- Indexes on the parent propagate to all partitions (PG11+).
CREATE INDEX IF NOT EXISTS web_events_session_ts_idx   ON public.web_events (session_id, ts);
CREATE INDEX IF NOT EXISTS web_events_site_name_ts_idx ON public.web_events (site_key, event_name, ts DESC);
CREATE INDEX IF NOT EXISTS web_events_visitor_idx      ON public.web_events (visitor_id);
CREATE INDEX IF NOT EXISTS web_events_human_idx        ON public.web_events (site_key, event_name, ts DESC) WHERE is_bot = false;

-- DEFAULT partition guarantees inserts never fail even if a month partition is
-- somehow missing. Month partitions keep queries pruned.
CREATE TABLE IF NOT EXISTS public.web_events_default PARTITION OF public.web_events DEFAULT;
CREATE TABLE IF NOT EXISTS public.web_events_2026_06 PARTITION OF public.web_events
  FOR VALUES FROM ('2026-06-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS public.web_events_2026_07 PARTITION OF public.web_events
  FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS public.web_events_2026_08 PARTITION OF public.web_events
  FOR VALUES FROM ('2026-08-01 00:00:00+00') TO ('2026-09-01 00:00:00+00');

-- ----------------------------------------------------------------------------
-- Row-Level Security
--   anon         : NO policies => denied entirely (writes go via service role)
--   authenticated: SELECT only (future /admin dashboard)
--   service_role : bypasses RLS (Python detectors + /api/track ingest)
-- ----------------------------------------------------------------------------
ALTER TABLE public.web_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_events   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_can_read_web_sessions" ON public.web_sessions;
CREATE POLICY "authenticated_can_read_web_sessions"
  ON public.web_sessions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_can_read_web_events" ON public.web_events;
CREATE POLICY "authenticated_can_read_web_events"
  ON public.web_events FOR SELECT TO authenticated USING (true);

-- ============================================================================
-- Rollup views (human-only: is_bot=false AND human_confirmed=true on sessions,
-- is_bot=false on events). Detectors and dashboards read THESE, never raw events.
-- ============================================================================

-- Funnel by day: sessions -> engaged -> calculator -> CTA -> form -> lead.
CREATE OR REPLACE VIEW public.vw_web_funnel_daily AS
WITH sess AS (
  SELECT
    site_key,
    started_at::date                                              AS date,
    COUNT(*)                                                      AS sessions,
    COUNT(*) FILTER (WHERE engaged_ms >= 10000)                  AS engaged_sessions,
    COUNT(*) FILTER (WHERE lead_id IS NOT NULL)                  AS converted_sessions
  FROM public.web_sessions
  WHERE is_bot = false AND human_confirmed = true
  GROUP BY site_key, started_at::date
),
ev AS (
  SELECT
    site_key,
    ts::date                                                            AS date,
    COUNT(*) FILTER (WHERE event_name = 'page_view')                    AS page_views,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_computed')  AS calc_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'cta_click')      AS cta_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'form_start')     AS form_start_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'lead_submitted') AS lead_events
  FROM public.web_events
  WHERE is_bot = false
  GROUP BY site_key, ts::date
)
SELECT
  COALESCE(sess.site_key, ev.site_key)        AS site_key,
  COALESCE(sess.date, ev.date)                AS date,
  COALESCE(sess.sessions, 0)                  AS sessions,
  COALESCE(sess.engaged_sessions, 0)          AS engaged_sessions,
  COALESCE(ev.page_views, 0)                  AS page_views,
  COALESCE(ev.calc_sessions, 0)               AS calc_sessions,
  COALESCE(ev.cta_sessions, 0)                AS cta_sessions,
  COALESCE(ev.form_start_sessions, 0)         AS form_start_sessions,
  COALESCE(sess.converted_sessions, 0)        AS converted_sessions
FROM sess
FULL OUTER JOIN ev ON sess.site_key = ev.site_key AND sess.date = ev.date;

COMMENT ON VIEW public.vw_web_funnel_daily IS
  'Per (site_key, date) human-only funnel: sessions, engaged, calculator, CTA, form_start, converted. Feeds the Funnel snapshot tab + funnel-dropoff detector.';

-- Per-page engagement over a 28-day window.
CREATE OR REPLACE VIEW public.vw_page_engagement AS
SELECT
  e.site_key,
  e.page_path,
  COUNT(DISTINCT e.session_id)                                              AS sessions_28d,
  COUNT(*) FILTER (WHERE e.event_name = 'page_view')                        AS page_views_28d,
  COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'cta_click')    AS cta_sessions_28d,
  COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'lead_submitted') AS lead_sessions_28d,
  CASE WHEN COUNT(DISTINCT e.session_id) > 0
    THEN COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'cta_click')::numeric
         / COUNT(DISTINCT e.session_id)::numeric
    ELSE NULL END                                                          AS cta_click_rate_28d,
  COALESCE(SUM((e.props->>'engaged_ms_delta')::int) FILTER (WHERE e.event_name = 'engagement_time'), 0) AS engaged_ms_28d,
  MAX((e.props->>'pct')::int) FILTER (WHERE e.event_name = 'scroll_depth') AS max_scroll_pct_28d
FROM public.web_events e
WHERE e.is_bot = false
  AND e.ts >= now() - INTERVAL '28 days'
GROUP BY e.site_key, e.page_path;

COMMENT ON VIEW public.vw_page_engagement IS
  'Per (site_key, page_path) 28d human engagement: sessions, CTA click-rate, engaged ms, max scroll. Feeds the cta-ignored + scroll-no-convert detectors.';

-- Calculator funnel: view -> computed -> result -> embed CTA, plus lead by session.
CREATE OR REPLACE VIEW public.vw_calculator_conversion AS
WITH calc AS (
  SELECT
    site_key,
    props->>'calculator_slug'                                                       AS calculator_slug,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_view')              AS viewed,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_computed')          AS computed,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_result_viewed')     AS result_viewed,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'embed_cta_click')        AS embed_cta_clicks
  FROM public.web_events
  WHERE is_bot = false
    AND props ? 'calculator_slug'
  GROUP BY site_key, props->>'calculator_slug'
),
calc_leads AS (
  -- sessions that touched a calculator AND converted
  SELECT
    e.site_key,
    e.props->>'calculator_slug'                AS calculator_slug,
    COUNT(DISTINCT e.session_id)               AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false
    AND e.props ? 'calculator_slug'
    AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, e.props->>'calculator_slug'
)
SELECT
  calc.site_key,
  calc.calculator_slug,
  calc.viewed,
  calc.computed,
  calc.result_viewed,
  calc.embed_cta_clicks,
  COALESCE(cl.lead_sessions, 0)                                          AS lead_sessions,
  CASE WHEN calc.viewed > 0 THEN calc.computed::numeric / calc.viewed::numeric END        AS compute_rate,
  CASE WHEN calc.computed > 0 THEN COALESCE(cl.lead_sessions,0)::numeric / calc.computed::numeric END AS computed_to_lead_rate
FROM calc
LEFT JOIN calc_leads cl ON cl.site_key = calc.site_key AND cl.calculator_slug = calc.calculator_slug;

COMMENT ON VIEW public.vw_calculator_conversion IS
  'Per (site_key, calculator_slug) funnel: viewed/computed/result/embed-CTA + lead sessions and drop-off rates. Feeds the calculator-abandon detector.';

-- Form field drop-off.
CREATE OR REPLACE VIEW public.vw_form_field_dropoff AS
SELECT
  site_key,
  props->>'form_id'                                                          AS form_id,
  props->>'field'                                                            AS field,
  COUNT(*) FILTER (WHERE event_name = 'form_field_focus')                    AS focuses,
  COUNT(*) FILTER (WHERE event_name = 'form_field_abandon')                  AS abandons,
  COUNT(*) FILTER (WHERE event_name = 'form_error')                          AS errors,
  CASE WHEN COUNT(*) FILTER (WHERE event_name = 'form_field_focus') > 0
    THEN COUNT(*) FILTER (WHERE event_name = 'form_field_abandon')::numeric
         / COUNT(*) FILTER (WHERE event_name = 'form_field_focus')::numeric
    ELSE NULL END                                                            AS abandon_rate
FROM public.web_events
WHERE is_bot = false
  AND event_name IN ('form_field_focus', 'form_field_abandon', 'form_error')
  AND props ? 'field'
GROUP BY site_key, props->>'form_id', props->>'field';

COMMENT ON VIEW public.vw_form_field_dropoff IS
  'Per (site_key, form_id, field) focus/abandon/error counts + abandon rate. Feeds the form-field-abandonment detector.';

-- The "entire story per person": one row per visitor, summarising their whole
-- cross-visit journey. The per-event timeline is queried directly from
-- web_events ordered by ts for the admin visitor page.
CREATE OR REPLACE VIEW public.vw_visitor_journey AS
SELECT
  s.site_key,
  s.visitor_id,
  MIN(s.started_at)                                       AS first_seen,
  MAX(s.last_seen_at)                                     AS last_seen,
  COUNT(DISTINCT s.session_id)                            AS total_sessions,
  SUM(s.event_count)                                      AS total_events,
  SUM(s.engaged_ms)                                       AS total_engaged_ms,
  MAX(s.max_scroll_pct)                                   AS max_scroll_pct,
  bool_or(s.lead_id IS NOT NULL)                          AS converted,
  MAX(s.lead_id::text)                                    AS lead_id,
  (ARRAY_AGG(DISTINCT s.entry_path))                      AS entry_paths,
  (ARRAY_AGG(DISTINCT s.utm_source) FILTER (WHERE s.utm_source IS NOT NULL)) AS utm_sources
FROM public.web_sessions s
WHERE s.is_bot = false AND s.human_confirmed = true
GROUP BY s.site_key, s.visitor_id;

COMMENT ON VIEW public.vw_visitor_journey IS
  'One row per visitor: first/last seen, sessions, events, engaged time, conversion + lead_id. The "entire story per person" summary; per-event timeline comes from web_events ordered by ts.';

-- ============================================================================
-- Atomic ingest RPC. /api/track (service role) calls this once per session-batch
-- so sticky flags (is_bot/human_confirmed OR-merge) and counters (increment)
-- are correct -- impossible to express with a plain PostgREST upsert.
--   p_session : jsonb of the session row + this batch's counter DELTAS
--   p_events  : jsonb array of event rows to insert
-- ============================================================================
CREATE OR REPLACE FUNCTION public.ingest_web_events(p_session jsonb, p_events jsonb)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.web_sessions AS s (
    session_id, visitor_id, site_key, last_seen_at,
    entry_path, exit_path, referrer, referrer_host,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    device_type, viewport_w, viewport_h, ua_family, os_family, country,
    is_embed, embed_slug, embed_referrer_host, consent_state,
    is_bot, bot_reason, botid_verified, human_confirmed,
    event_count, engaged_ms, max_scroll_pct
  )
  VALUES (
    p_session->>'session_id',
    p_session->>'visitor_id',
    p_session->>'site_key',
    COALESCE((p_session->>'last_seen_at')::timestamptz, now()),
    p_session->>'entry_path',
    p_session->>'exit_path',
    p_session->>'referrer',
    p_session->>'referrer_host',
    p_session->>'utm_source', p_session->>'utm_medium', p_session->>'utm_campaign',
    p_session->>'utm_term', p_session->>'utm_content',
    p_session->>'device_type',
    NULLIF(p_session->>'viewport_w', '')::int,
    NULLIF(p_session->>'viewport_h', '')::int,
    p_session->>'ua_family', p_session->>'os_family', p_session->>'country',
    COALESCE((p_session->>'is_embed')::boolean, false),
    p_session->>'embed_slug', p_session->>'embed_referrer_host',
    p_session->>'consent_state',
    COALESCE((p_session->>'is_bot')::boolean, false),
    p_session->>'bot_reason',
    NULLIF(p_session->>'botid_verified', '')::boolean,
    COALESCE((p_session->>'human_confirmed')::boolean, false),
    COALESCE((p_session->>'event_count')::int, 0),
    COALESCE((p_session->>'engaged_ms')::int, 0),
    COALESCE((p_session->>'max_scroll_pct')::int, 0)
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_seen_at    = GREATEST(s.last_seen_at, EXCLUDED.last_seen_at),
    exit_path       = COALESCE(EXCLUDED.exit_path, s.exit_path),
    -- context: keep the first-seen values (entry stays from first page_view)
    entry_path      = COALESCE(s.entry_path, EXCLUDED.entry_path),
    referrer        = COALESCE(s.referrer, EXCLUDED.referrer),
    referrer_host   = COALESCE(s.referrer_host, EXCLUDED.referrer_host),
    utm_source      = COALESCE(s.utm_source, EXCLUDED.utm_source),
    utm_medium      = COALESCE(s.utm_medium, EXCLUDED.utm_medium),
    utm_campaign    = COALESCE(s.utm_campaign, EXCLUDED.utm_campaign),
    utm_term        = COALESCE(s.utm_term, EXCLUDED.utm_term),
    utm_content     = COALESCE(s.utm_content, EXCLUDED.utm_content),
    device_type     = COALESCE(s.device_type, EXCLUDED.device_type),
    viewport_w      = COALESCE(s.viewport_w, EXCLUDED.viewport_w),
    viewport_h      = COALESCE(s.viewport_h, EXCLUDED.viewport_h),
    ua_family       = COALESCE(s.ua_family, EXCLUDED.ua_family),
    os_family       = COALESCE(s.os_family, EXCLUDED.os_family),
    country         = COALESCE(s.country, EXCLUDED.country),
    -- sticky monotonic flags
    is_bot          = s.is_bot OR EXCLUDED.is_bot,
    bot_reason      = COALESCE(s.bot_reason, EXCLUDED.bot_reason),
    botid_verified  = COALESCE(EXCLUDED.botid_verified, s.botid_verified),
    human_confirmed = s.human_confirmed OR EXCLUDED.human_confirmed,
    -- counters (this batch's deltas)
    event_count     = s.event_count + EXCLUDED.event_count,
    engaged_ms      = s.engaged_ms + EXCLUDED.engaged_ms,
    max_scroll_pct  = GREATEST(s.max_scroll_pct, EXCLUDED.max_scroll_pct);

  INSERT INTO public.web_events (
    session_id, visitor_id, site_key, event_name, ts, client_ts,
    page_path, page_query, props, is_embed, is_bot
  )
  SELECT
    e->>'session_id',
    e->>'visitor_id',
    e->>'site_key',
    e->>'event_name',
    COALESCE((e->>'ts')::timestamptz, now()),
    NULLIF(e->>'client_ts', '')::timestamptz,
    e->>'page_path',
    e->>'page_query',
    COALESCE(e->'props', '{}'::jsonb),
    COALESCE((e->>'is_embed')::boolean, false),
    COALESCE((e->>'is_bot')::boolean, false)
  FROM jsonb_array_elements(p_events) e;
END;
$$;

-- ----------------------------------------------------------------------------
-- Privileges (defense in depth on top of RLS):
--   anon         : nothing (cannot reach these tables at all)
--   authenticated: SELECT (RLS already restricts; this is the table grant)
--   service_role : full + execute the ingest RPC (used by /api/track + Python)
-- ----------------------------------------------------------------------------
REVOKE ALL ON public.web_sessions FROM anon;
REVOKE ALL ON public.web_events   FROM anon;
GRANT SELECT ON public.web_sessions TO authenticated;
GRANT SELECT ON public.web_events   TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.web_sessions TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.web_events   TO service_role;

REVOKE ALL ON FUNCTION public.ingest_web_events(jsonb, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.ingest_web_events(jsonb, jsonb) TO service_role;

-- Make the new tables/columns/function visible to PostgREST immediately.
NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION (manual)
-- ============================================================================
-- Tables + partitions:
--   SELECT relname FROM pg_class WHERE relname LIKE 'web_events%';
-- RLS (anon must be denied, authenticated SELECT-only):
--   SET ROLE anon;          INSERT INTO web_events(session_id,visitor_id,site_key,event_name) VALUES ('s','v','property','page_view'); -- should FAIL
--   SET ROLE authenticated; SELECT count(*) FROM web_events;  -- should succeed
--   RESET ROLE;
-- Views use the partial indexes:
--   EXPLAIN SELECT * FROM vw_web_funnel_daily WHERE site_key='property';
