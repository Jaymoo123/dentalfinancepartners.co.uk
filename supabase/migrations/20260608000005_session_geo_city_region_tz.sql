-- ============================================================================
-- Migration: 20260608000005_session_geo_city_region_tz.sql
-- Date: 2026-06-08
-- Purpose: Capture city / region / timezone from the Vercel edge geo headers,
--          not just country. Enables local targeting + Scotland->LBTT routing.
--          ADDITIVE: 3 nullable columns + recreate ingest_web_events to write
--          them. The function body is verbatim the live definition with only the
--          three geo fields added (INSERT list, VALUES, ON CONFLICT).
-- ============================================================================

ALTER TABLE public.web_sessions ADD COLUMN IF NOT EXISTS city     TEXT;  -- x-vercel-ip-city
ALTER TABLE public.web_sessions ADD COLUMN IF NOT EXISTS region   TEXT;  -- x-vercel-ip-country-region
ALTER TABLE public.web_sessions ADD COLUMN IF NOT EXISTS timezone TEXT;  -- x-vercel-ip-timezone

CREATE OR REPLACE FUNCTION public.ingest_web_events(p_session jsonb, p_events jsonb)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO public.web_sessions AS s (
    session_id, visitor_id, site_key, last_seen_at,
    entry_path, exit_path, referrer, referrer_host,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    device_type, viewport_w, viewport_h, ua_family, os_family, country, city, region, timezone,
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
    p_session->>'city', p_session->>'region', p_session->>'timezone',
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
    city            = COALESCE(s.city, EXCLUDED.city),
    region          = COALESCE(s.region, EXCLUDED.region),
    timezone        = COALESCE(s.timezone, EXCLUDED.timezone),
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
$function$;

NOTIFY pgrst, 'reload schema';
