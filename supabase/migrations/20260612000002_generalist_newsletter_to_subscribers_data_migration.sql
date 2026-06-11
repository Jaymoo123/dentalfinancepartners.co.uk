-- ============================================================================
-- Data migration: 20260612000002_generalist_newsletter_to_subscribers_data_migration.sql
-- Date: 2026-06-12
-- Purpose: Copy the real generalist subscriber row(s) from the legacy
--   `newsletter_subscribers` table into the shared `subscribers` table
--   (created by 20260608000007_nurture_engine.sql).
--
-- MANAGER REVIEW REQUIRED BEFORE RUNNING.
-- This file is written as a reviewed artifact — it must NOT be run automatically.
--
-- ── Live data (from 2026-06-11 recon) ────────────────────────────────────────
-- newsletter_subscribers has 2 rows:
--   1. probe@example.invalid  — test/probe row, NOT migrated (manager deletes it
--      from newsletter_subscribers separately after this migration).
--   2. One real subscriber (email not shown here; see prod directly).
--
-- ── Column mapping ────────────────────────────────────────────────────────────
-- newsletter_subscribers → subscribers
--   email              → email                    (direct, lowercased)
--   status             → status
--                         'confirmed'  → 'active'
--                         'pending'    → 'pending'
--                         'unsubscribed' → 'unsubscribed'
--                         'bounced'    → 'bounced'
--                         'complained' → 'complained'
--   source             → source                   (direct)
--   subscribed_at      → created_at               (direct)
--   confirmed_at       → confirmed_at             (direct, requires migration 20260612000001)
--
-- ── PARTIAL-LOSS fields — not migrated (no column in subscribers) ────────────
-- The following fields have no target column in the shared subscribers table.
-- For a CONFIRMED active subscriber:
--   source_url         — operational metadata (URL they subscribed from). No
--                        column in subscribers. LOSS: the origin URL is dropped.
--                        Impact: low — this is historical analytics data, not
--                        needed for send-path operation.
--   unsubscribed_at    — NULL for a confirmed subscriber. No loss for active rows.
--   resend_contact_id  — Resend audience management id. No column in subscribers.
--                        LOSS: if the operator uses Resend Audiences/Contacts, the
--                        link is severed. The engine does not use this field.
--                        Impact: low for the shared engine; medium if Audiences
--                        are used. Flagged for manager decision.
--   metadata (jsonb)   — General metadata blob. No column in subscribers.
--                        LOSS: any metadata in this field is dropped.
--                        Impact: unknown without inspecting live data. Manager
--                        should SELECT metadata FROM newsletter_subscribers WHERE
--                        email != 'probe@example.invalid' before running.
--   agency_type        — No column in subscribers; closest is entry_topic.
--                        Mapped to entry_topic below to preserve the data.
--                        Impact: field repurposed but data is preserved.
--   welcome_step_sent + last_step_at → inserted into nurture_state as step/last_sent_at
--                        (see nurture_state insert below).
--
-- ── STOP NOTE FOR MANAGER ─────────────────────────────────────────────────────
-- Run this SELECT first and inspect the output:
--   SELECT id, email, status, agency_type, source, source_url, confirmed_at,
--          welcome_step_sent, last_step_at, resend_contact_id, metadata
--   FROM newsletter_subscribers
--   WHERE email != 'probe@example.invalid';
-- If metadata is non-null or resend_contact_id is in active use, decide whether
-- to add those columns to subscribers before migrating.
-- If those fields are NULL or unused, proceed.
-- ============================================================================

-- Step 1: migrate the real subscriber row (not the probe).
-- This uses ON CONFLICT DO NOTHING on the (site_key, lower(email)) unique index
-- so re-running is safe.
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
  'generalist'                                        AS site_key,
  lower(ns.email)                                     AS email,
  CASE ns.status
    WHEN 'confirmed'    THEN 'active'
    WHEN 'pending'      THEN 'pending'
    WHEN 'unsubscribed' THEN 'unsubscribed'
    WHEN 'bounced'      THEN 'bounced'
    WHEN 'complained'   THEN 'complained'
    ELSE 'pending'
  END                                                 AS status,
  -- consent: treat confirmation as consent given. confirmed subscribers
  -- explicitly clicked the opt-in link, so consent_given = true is correct.
  (ns.status = 'confirmed')                           AS consent_given,
  'Confirmed subscription to The Director''s Brief newsletter at hollowaydavies.co.uk.'
                                                      AS consent_text,
  COALESCE(ns.confirmed_at, ns.subscribed_at)         AS consent_at,
  ns.confirmed_at                                     AS confirmed_at,
  ns.agency_type                                      AS entry_topic,
  ns.source                                           AS source,
  ns.subscribed_at                                    AS created_at,
  now()                                               AS updated_at
FROM public.newsletter_subscribers ns
WHERE ns.email != 'probe@example.invalid'
ON CONFLICT (site_key, lower(email)) DO NOTHING;

-- Step 2: insert nurture_state row for the migrated subscriber,
-- starting from where they left off in the old drip (welcome_step_sent).
-- If welcome_step_sent = 0 and status was 'confirmed', they got the first
-- email already via the old confirm route; start at step 1 of the new sequence.
-- If welcome_step_sent >= 1, start at that step.
-- Status: 'completed' if all steps were sent, 'active' otherwise.
-- The new sequence has 5 steps (0-indexed: 0..4). The old sequence also had 5
-- steps (1-indexed: 1..5, stored as 1..5 in welcome_step_sent).
-- Mapping: old welcome_step_sent N → new step index N (0-based).
--   old=0 (never sent, just confirmed) → new step=0, status=active
--   old=1 → new step=1, status=active
--   old=4 → new step=4, status=active
--   old=5 (all sent)   → new step=4, status=completed
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
  'generalist_welcome'                                    AS sequence,
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
  -- next_send_at: NULL for completed/paused; now() for active (let cron evaluate
  -- on next run). If there is a delay from last_step_at this may send sooner
  -- than intended. Manager may update next_send_at after inspecting last_step_at.
  CASE
    WHEN ns.welcome_step_sent >= 5 THEN NULL
    WHEN s.status != 'active'      THEN NULL
    ELSE now()
  END                                                     AS next_send_at,
  ns.subscribed_at                                        AS created_at,
  now()                                                   AS updated_at
FROM public.newsletter_subscribers ns
JOIN public.subscribers s
  ON s.site_key = 'generalist'
  AND lower(s.email) = lower(ns.email)
WHERE ns.email != 'probe@example.invalid'
ON CONFLICT (subscriber_id, sequence) DO NOTHING;

-- ── Post-migration verification queries (run and review before declaring done) ─
-- 1. Confirm the migrated row landed:
--    SELECT id, email, status, confirmed_at, entry_topic, source
--    FROM subscribers WHERE site_key = 'generalist';
--
-- 2. Confirm the nurture_state row:
--    SELECT ns.step, ns.status, ns.last_sent_at, ns.next_send_at
--    FROM nurture_state ns
--    JOIN subscribers s ON s.id = ns.subscriber_id
--    WHERE s.site_key = 'generalist';
--
-- 3. Confirm the probe row was NOT migrated:
--    SELECT count(*) FROM subscribers
--    WHERE site_key = 'generalist' AND email = 'probe@example.invalid';
--    -- Expected: 0
--
-- ── After manager verification ───────────────────────────────────────────────
-- 1. The probe row in newsletter_subscribers can be deleted:
--    DELETE FROM newsletter_subscribers WHERE email = 'probe@example.invalid';
-- 2. newsletter_subscribers and newsletter_drip_queue are kept READ-ONLY
--    (not dropped) per GAP-5 constraint. No write-access revocation is
--    automated here — the source code routes that write to them are deleted
--    in the same commit as the re-point (Stage 2), which is the dedup proof.
