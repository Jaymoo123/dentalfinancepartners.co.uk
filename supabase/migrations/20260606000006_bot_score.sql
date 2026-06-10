-- ============================================================================
-- Migration: 20260606000006_bot_score.sql
-- Date: 2026-06-06
-- Purpose: Persist the multi-signal bot-likelihood score per session.
--
-- The daily reclassifier (optimisation_engine/analysis/bot_scorer.py) computes a
-- transparent, weighted bot_score in [0,1] (higher = more bot-like) from every
-- available behavioural signal — engagement realism, event variety, genuine
-- human signals (engagement pings, scroll, rage/dead clicks, form interaction),
-- inter-event timing regularity, flood rate, and UA. It then sets is_bot from a
-- conservative threshold and writes a human-readable bot_reason.
--
-- Storing the raw score (not just the boolean) makes the classification auditable
-- and lets us re-tune the threshold later without re-deriving features. NULL =
-- not yet scored. The human-only rollup views are unchanged; they still filter on
-- is_bot=false, so a better score immediately improves every dashboard metric.
-- ============================================================================

ALTER TABLE public.web_sessions
  ADD COLUMN IF NOT EXISTS bot_score real;

COMMENT ON COLUMN public.web_sessions.bot_score IS
  'Multi-signal bot-likelihood in [0,1] (higher = more bot-like) from bot_scorer.py. NULL = not yet scored. is_bot is derived from this via a conservative threshold; bot_reason lists the top contributing signals.';

-- Make the new column visible to PostgREST immediately.
NOTIFY pgrst, 'reload schema';
