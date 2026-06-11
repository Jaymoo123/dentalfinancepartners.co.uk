-- Migration: 20260610000001_fix_visits_to_conversion_attribution.sql
-- Fix: vw_visits_to_conversion was counting ALL sessions for a visitor,
-- including sessions that happened AFTER the lead was submitted. This caused
-- the visits_bucket for a converted visitor to tick up every time they
-- returned to the site, misattributing conversion to a later session count.
--
-- Fix: for converted visitors, count only sessions up to and including the
-- first conversion session (freeze the visit count at conversion time).
-- Non-converted visitors are unaffected.

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
  'Per (site_key, country, visits_bucket 1..6+): how many visitors had that many sessions and how many converted. For converted visitors, visit count is frozen at the conversion session — post-conversion return visits do not inflate the bucket.';

GRANT SELECT ON public.vw_visits_to_conversion TO authenticated;

NOTIFY pgrst, 'reload schema';
