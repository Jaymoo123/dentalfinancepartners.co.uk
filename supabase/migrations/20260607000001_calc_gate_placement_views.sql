-- Placement-aware calculator + resource-gate rollups.
--
-- Two ADDITIVE views (existing views untouched, so every current detector and
-- the dashboard keep working) that slice the tool + Excel-gate funnels by WHERE
-- the module was surfaced — its own calculator page, inside a blog post, or an
-- external embed iframe — and express the gate's view -> unlock -> lead funnel
-- that the slug-only views could not.
--
-- Depends on the client now stamping `placement` / `tool_kind` / `category` onto
-- the calc_* and gate events, and on the new `gate_view` impression event.
-- Events emitted before this change carry no placement; they fold into the
-- 'unknown' bucket rather than being dropped.

-- ---------------------------------------------------------------------------
-- 1. Calculator funnel BY PLACEMENT: view -> computed -> result, plus lead,
--    split by (calculator_slug, placement, tool_kind). Lets the SAME tool be
--    compared on its calc page vs embedded in blogs vs in an iframe.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_calculator_conversion_placement AS
WITH calc AS (
  SELECT
    site_key,
    props->>'calculator_slug'                                                   AS calculator_slug,
    COALESCE(props->>'placement', 'unknown')                                    AS placement,
    COALESCE(props->>'tool_kind', 'standard')                                   AS tool_kind,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_view')          AS viewed,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_computed')      AS computed,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_result_viewed') AS result_viewed
  FROM public.web_events
  WHERE is_bot = false
    AND props ? 'calculator_slug'
  GROUP BY site_key, props->>'calculator_slug',
           COALESCE(props->>'placement', 'unknown'),
           COALESCE(props->>'tool_kind', 'standard')
),
calc_leads AS (
  -- sessions that touched this tool in this placement AND converted
  SELECT
    e.site_key,
    e.props->>'calculator_slug'                 AS calculator_slug,
    COALESCE(e.props->>'placement', 'unknown')  AS placement,
    COALESCE(e.props->>'tool_kind', 'standard') AS tool_kind,
    COUNT(DISTINCT e.session_id)                AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false
    AND e.props ? 'calculator_slug'
    AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, e.props->>'calculator_slug',
           COALESCE(e.props->>'placement', 'unknown'),
           COALESCE(e.props->>'tool_kind', 'standard')
)
SELECT
  calc.site_key,
  calc.calculator_slug,
  calc.placement,
  calc.tool_kind,
  calc.viewed,
  calc.computed,
  calc.result_viewed,
  COALESCE(cl.lead_sessions, 0)                                                                       AS lead_sessions,
  CASE WHEN calc.viewed > 0 THEN calc.computed::numeric / calc.viewed::numeric END                    AS compute_rate,
  CASE WHEN calc.computed > 0 THEN COALESCE(cl.lead_sessions, 0)::numeric / calc.computed::numeric END AS computed_to_lead_rate
FROM calc
LEFT JOIN calc_leads cl
  ON  cl.site_key        = calc.site_key
  AND cl.calculator_slug = calc.calculator_slug
  AND cl.placement       = calc.placement
  AND cl.tool_kind       = calc.tool_kind;

COMMENT ON VIEW public.vw_calculator_conversion_placement IS
  'Per (site_key, calculator_slug, placement, tool_kind) funnel: viewed/computed/result + lead sessions and rates. placement = calculator|blog|embed. Lets blog-embedded tool performance be compared with the calc page; viewed is visibility-gated (honest in long-form content).';

-- ---------------------------------------------------------------------------
-- 2. Resource (Excel-gate) funnel: gate_view -> resource_unlocked -> lead, by
--    (topic, placement). The slug-only calculator view could not express the
--    gate at all; this gives the impression denominator + unlock + lead.
--    Note: resource_unlocked fires only after a successful gate lead, so
--    `unlocks` is the direct gate conversion; `lead_sessions` counts gate-touch
--    sessions that became ANY lead (gate influence).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_resource_conversion AS
WITH gate AS (
  SELECT
    site_key,
    props->>'topic'                                                            AS topic,
    COALESCE(props->>'placement', 'unknown')                                   AS placement,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'gate_view')         AS gate_views,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'resource_unlocked') AS unlocks
  FROM public.web_events
  WHERE is_bot = false
    AND event_name IN ('gate_view', 'resource_unlocked')
    AND props ? 'topic'
  GROUP BY site_key, props->>'topic', COALESCE(props->>'placement', 'unknown')
),
gate_leads AS (
  SELECT
    e.site_key,
    e.props->>'topic'                          AS topic,
    COALESCE(e.props->>'placement', 'unknown') AS placement,
    COUNT(DISTINCT e.session_id)               AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false
    AND e.event_name IN ('gate_view', 'resource_unlocked')
    AND e.props ? 'topic'
    AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, e.props->>'topic', COALESCE(e.props->>'placement', 'unknown')
)
SELECT
  gate.site_key,
  gate.topic,
  gate.placement,
  gate.gate_views,
  gate.unlocks,
  COALESCE(gl.lead_sessions, 0)                                                                    AS lead_sessions,
  CASE WHEN gate.gate_views > 0 THEN gate.unlocks::numeric / gate.gate_views::numeric END          AS view_to_unlock_rate,
  CASE WHEN gate.unlocks > 0 THEN COALESCE(gl.lead_sessions, 0)::numeric / gate.unlocks::numeric END AS unlock_to_lead_rate
FROM gate
LEFT JOIN gate_leads gl
  ON  gl.site_key  = gate.site_key
  AND gl.topic     = gate.topic
  AND gl.placement = gate.placement;

COMMENT ON VIEW public.vw_resource_conversion IS
  'Per (site_key, topic, placement) Excel-gate funnel: gate_view -> resource_unlocked -> lead, with view->unlock and unlock->lead rates. placement = calculator|blog|embed.';
