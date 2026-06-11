-- ============================================================================
-- Data migration: 20260612000003_agency_newsletter_to_subscribers_data_migration.sql
-- Date: 2026-06-12 (authored 2026-06-11, Phase D adopt-agency)
-- Purpose: Copy any digital-agency subscriber rows from the legacy
--   `newsletter_subscribers` table into the shared `subscribers` table
--   (created by 20260608000007_nurture_engine.sql; double-opt-in fields from
--   20260612000001), with nurture_state seeded from the old drip position.
--   Modelled on 20260612000002 (the generalist migration), including the
--   status-aware consent_text amendment from manager review 2026-06-11.
--
-- MANAGER REVIEW REQUIRED BEFORE RUNNING. Written as a reviewed artifact —
-- must NOT be run automatically.
--
-- ── Live data (manager-verified 2026-06-11) ──────────────────────────────────
-- newsletter_subscribers holds ZERO digital-agency rows. This file is
-- therefore expected to be a NO-OP GUARD, written for the record so the
-- agency re-point has a complete data-migration artifact. If rows appear
-- between authoring and running, the guards below handle them.
--
-- ── Discriminator caveat (IMPORTANT) ─────────────────────────────────────────
-- The legacy newsletter_subscribers table is SHARED between digital-agency
-- (lineage parent) and generalist (fork child); it has NO site column. The
-- only distinguishing signal is source_url (the page the visitor subscribed
-- from). This migration claims rows whose source_url is on the agency domain.
-- ORDERING INTERACTION: the generalist migration (20260612000002) claims ALL
-- non-probe rows for site_key 'generalist' with no domain filter. If any
-- agency row ever exists, run THIS file FIRST (its ON CONFLICT no-ops are
-- keyed per-site so double-claiming would create a duplicate under the wrong
-- site_key, not a conflict) — or amend 20260612000002 with the complementary
-- domain filter before running either. With the verified zero-row state this
-- is academic, but recorded so a future operator does not trip on it.
--
-- ── Column mapping (same as 20260612000002) ──────────────────────────────────
-- newsletter_subscribers → subscribers
--   email           → email (lowercased)
--   status          → status ('confirmed'→'active', others map 1:1)
--   source          → source
--   subscribed_at   → created_at
--   confirmed_at    → confirmed_at (requires 20260612000001)
--   agency_type     → entry_topic (field repurposed, data preserved)
--   welcome_step_sent + last_step_at → nurture_state step/last_sent_at
-- PARTIAL-LOSS fields (no target column; same posture as generalist file):
--   source_url (kept only as entry_topic fallback slug), unsubscribed_at,
--   resend_contact_id (Resend Audiences link severed — the shared engine does
--   not manage Audiences; RESEND_AUDIENCE_ID is retired from agency env),
--   metadata jsonb (inspect before running if any rows exist).
--
-- ── STOP NOTE FOR MANAGER ─────────────────────────────────────────────────────
-- Run this SELECT first and inspect the output (expected: zero rows):
--   SELECT id, email, status, agency_type, source, source_url, confirmed_at,
--          welcome_step_sent, last_step_at, resend_contact_id, metadata
--   FROM newsletter_subscribers
--   WHERE source_url ILIKE '%agencyfounderfinance%'
--     AND email != 'probe@example.invalid';
-- If zero rows: running this file is a recorded no-op; declare done.
-- If rows exist: review metadata/resend_contact_id per the generalist file's
-- stop note, and resolve the ordering interaction above, before running.
-- ============================================================================

-- Step 1: migrate any agency row(s) (none expected per 2026-06-11 recon).
-- ON CONFLICT on the (site_key, lower(email)) unique index makes re-runs safe.
INSERT INTO public.subscribers (
  site_key,
  email,
  status,
  consent_given,
  consent_text,
  consent_at,
  confirmed_at,
  entry_topic,
  source,
  created_at,
  updated_at
)
SELECT
  'agency'                                            AS site_key,
  lower(ns.email)                                     AS email,
  CASE ns.status
    WHEN 'confirmed'    THEN 'active'
    WHEN 'pending'      THEN 'pending'
    WHEN 'unsubscribed' THEN 'unsubscribed'
    WHEN 'bounced'      THEN 'bounced'
    WHEN 'complained'   THEN 'complained'
    ELSE 'pending'
  END                                                 AS status,
  -- Consent: a confirmed subscriber explicitly clicked the double-opt-in
  -- link, so consent_given = true is correct. Status-aware consent_text per
  -- the 20260612000002 amendment: the stored text must describe what actually
  -- happened — a pending subscriber never confirmed, so the text must not
  -- claim confirmation (LD-09; never fabricate a consent record).
  (ns.status = 'confirmed')                           AS consent_given,
  CASE WHEN ns.status = 'confirmed' THEN
    'Confirmed subscription to The Agency Founder Tax Brief newsletter at agencyfounderfinance.co.uk (double opt-in link clicked; legacy newsletter_subscribers row, migrated 2026-06-12).'
  ELSE
    'Requested subscription to The Agency Founder Tax Brief newsletter at agencyfounderfinance.co.uk; double opt-in confirmation pending at migration time (legacy newsletter_subscribers row, migrated 2026-06-12).'
  END                                                 AS consent_text,
  COALESCE(ns.confirmed_at, ns.subscribed_at)         AS consent_at,
  ns.confirmed_at                                     AS confirmed_at,
  -- entry_topic: agency_type when present, else the signup page slug from
  -- source_url (preserves the only otherwise-lost signal).
  COALESCE(ns.agency_type,
           NULLIF(regexp_replace(ns.source_url, '^.*/', ''), ''))
                                                      AS entry_topic,
  ns.source                                           AS source,
  ns.subscribed_at                                    AS created_at,
  now()                                               AS updated_at
FROM public.newsletter_subscribers ns
WHERE ns.source_url ILIKE '%agencyfounderfinance%'
  AND ns.email != 'probe@example.invalid'
ON CONFLICT (site_key, lower(email)) DO NOTHING;

-- Step 2: seed nurture_state from the old drip position.
-- Old sequence: 5 steps, 1-indexed in welcome_step_sent (0 = confirmed but
-- nothing sent). New sequence 'agency_welcome': 5 steps, 0-indexed (0..4).
-- Mapping (same as generalist):
--   old=0 → new step=0, active     old=1..4 → new step=N, active
--   old>=5 (all sent) → new step=4, completed
INSERT INTO public.nurture_state (
  subscriber_id,
  sequence,
  step,
  status,
  last_sent_at,
  next_send_at,
  created_at,
  updated_at
)
SELECT
  s.id                                                    AS subscriber_id,
  'agency_welcome'                                        AS sequence,
  CASE
    WHEN ns.welcome_step_sent >= 5 THEN 4
    ELSE GREATEST(ns.welcome_step_sent, 0)
  END                                                     AS step,
  CASE
    WHEN ns.welcome_step_sent >= 5 THEN 'completed'
    WHEN s.status != 'active'      THEN 'paused'
    ELSE 'active'
  END                                                     AS status,
  ns.last_step_at                                         AS last_sent_at,
  -- next_send_at: NULL for completed/paused; now() for active (cron evaluates
  -- on its next run). Manager may adjust after inspecting last_step_at.
  CASE
    WHEN ns.welcome_step_sent >= 5 THEN NULL
    WHEN s.status != 'active'      THEN NULL
    ELSE now()
  END                                                     AS next_send_at,
  ns.subscribed_at                                        AS created_at,
  now()                                                   AS updated_at
FROM public.newsletter_subscribers ns
JOIN public.subscribers s
  ON s.site_key = 'agency'
  AND lower(s.email) = lower(ns.email)
WHERE ns.source_url ILIKE '%agencyfounderfinance%'
  AND ns.email != 'probe@example.invalid'
ON CONFLICT (subscriber_id, sequence) DO NOTHING;

-- ── Post-migration verification (run and review before declaring done) ───────
-- 1. SELECT count(*) FROM subscribers WHERE site_key = 'agency';
--    -- Expected with the verified zero-row state: 0
-- 2. SELECT ns.step, ns.status FROM nurture_state ns
--    JOIN subscribers s ON s.id = ns.subscriber_id
--    WHERE s.site_key = 'agency';
--    -- Expected: 0 rows
--
-- ── After manager verification ───────────────────────────────────────────────
-- newsletter_subscribers (and any newsletter_drip_queue) are kept READ-ONLY,
-- not dropped, per the GAP-5 constraint. The source-code routes that wrote to
-- them are deleted in the same commit as this re-point (the dedup proof).
-- ============================================================================
