-- ============================================================================
-- Migration: 20260617000001_geo_channel_split.sql
-- Date: 2026-06-17
-- Purpose: GEO Measurement layer (Track B) -- channel granularity.
--
--   1. vw_channel_conversion_geo  (replaced in place, CREATE OR REPLACE)
--      Splits the flat 'search' bucket into:
--        bing_family  -- bing.com, duckduckgo.com, yahoo.com, ecosia.org, brave.com,
--                        search.yahoo.com (Bing-powered): these share the same
--                        ad/ranking index and are the primary Bing-family signal.
--        google       -- google.com / google.co.uk (and all ccTLDs via %google%)
--      Splits the flat 'ai' bucket into named engines:
--        chatgpt      -- chatgpt.com, chat.openai.com (all %openai% hosts)
--        perplexity   -- perplexity.ai (named-domain only, not catch-all .ai)
--        copilot      -- copilot.microsoft.com, bing.com/chat, sydney.bing.com
--                        (sydney.bing.com is the legacy internal Copilot host)
--        claude       -- claude.ai (named-domain only)
--        gemini       -- gemini.google.com, bard.google.com
--        ai_other     -- any remaining referrer that falls in the old '.ai' catch-all
--                        (formerly lumped into 'ai'). This preserves intent while
--                        making the catch-all explicit and auditable.
--
--   The 'search' and 'ai' macro-channels are gone from the channel column;
--   callers that want the macro grouping should use:
--     CASE WHEN channel IN ('bing_family','google') THEN 'search' ... END
--   A helper view vw_channel_conversion_macro recreates the old 6-bucket
--   behaviour so existing queries are not broken.
--
--   Existing branches (direct / social / internal / referral) are byte-for-byte
--   identical to 20260611000002. Branch ordering preserved.
--
--   ADDITIVE / idempotent (CREATE OR REPLACE on a view).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Helper: centralise the channel classification CTE so it is reused by both
-- the granular view and the macro rollup view.
-- We cannot create a reusable SQL function for a CASE expression, so we inline
-- the logic -- but both views below share the same text to stay in sync.
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
      -- Matches only true .ai TLD hostnames (e.g. you.com, phind.com miss this
      -- deliberately -- they fall to 'referral' until explicitly named above).
      -- The old '%.ai' ILIKE matched any hostname ending in .ai, which is a
      -- broad catch-all. We keep it here as 'ai_other' so the data is visible.
      WHEN ws.referrer_host ILIKE '%.ai'
        THEN 'ai_other'

      -- ── bing_family ───────────────────────────────────────────────────────
      -- Bing-powered search index: bing.com (non-chat), duckduckgo.com,
      -- yahoo.com / search.yahoo.com, ecosia.org, brave search.
      WHEN ws.referrer_host ILIKE '%bing.com%'
        OR ws.referrer_host ILIKE '%duckduckgo.com%'
        OR ws.referrer_host ILIKE '%yahoo.com%'
        OR ws.referrer_host ILIKE '%ecosia.org%'
        OR ws.referrer_host ILIKE '%search.brave.com%'
        THEN 'bing_family'

      -- ── google ────────────────────────────────────────────────────────────
      -- Matches google.com, google.co.uk, google.de … (all ccTLDs via %google%)
      -- but NOT gemini.google.com (caught above) because CASE is short-circuit.
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
  'Sessions/leads/conversion by (site_key, country, channel, referrer_host). '
  'channel values: direct | chatgpt | perplexity | copilot | claude | gemini | ai_other '
  '| bing_family | google | social | internal | referral. '
  'ai_other captures the legacy "%.ai" TLD catch-all explicitly. '
  'bing_family = bing.com (non-chat) + duckduckgo + yahoo + ecosia + brave + yandex. '
  'copilot = copilot.microsoft.com + sydney.bing.com + bing.com/*chat*. '
  'internal = referrer matches sites.domain (www-stripped) -- no hardcoded domains. '
  'Replaces the previous flat ai/search split (20260611000002).';

-- ----------------------------------------------------------------------------
-- Macro rollup: recreates the old 6-bucket (direct/ai/search/social/internal/
-- referral) channel for any code that queries channel IN ('ai','search').
-- This view is ADDITIVE -- it does not replace anything.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_channel_conversion_macro AS
SELECT
  site_key,
  country,
  referrer_host,
  CASE
    WHEN channel IN ('chatgpt', 'perplexity', 'copilot', 'claude', 'gemini', 'ai_other')
      THEN 'ai'
    WHEN channel IN ('bing_family', 'google')
      THEN 'search'
    ELSE channel   -- direct / social / internal / referral pass through unchanged
  END                                                          AS channel,
  sum(sessions)                                                AS sessions,
  sum(leads)                                                   AS leads,
  CASE
    WHEN sum(sessions) > 0
    THEN sum(leads)::numeric / sum(sessions)::numeric
    ELSE NULL
  END                                                          AS conversion_rate
FROM public.vw_channel_conversion_geo
GROUP BY site_key, country, referrer_host,
  CASE
    WHEN channel IN ('chatgpt', 'perplexity', 'copilot', 'claude', 'gemini', 'ai_other')
      THEN 'ai'
    WHEN channel IN ('bing_family', 'google')
      THEN 'search'
    ELSE channel
  END;

COMMENT ON VIEW public.vw_channel_conversion_macro IS
  'Rolls vw_channel_conversion_geo back to the legacy 6-bucket channel taxonomy '
  '(direct/ai/search/social/internal/referral) for backwards-compatible queries. '
  'All AI sub-channels collapse to "ai"; bing_family+google collapse to "search".';

GRANT SELECT ON public.vw_channel_conversion_geo   TO authenticated;
GRANT SELECT ON public.vw_channel_conversion_macro TO authenticated;

NOTIFY pgrst, 'reload schema';
