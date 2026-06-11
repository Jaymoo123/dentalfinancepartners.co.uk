-- ============================================================================
-- Migration: 20260612000001_subscribers_double_optin_fields.sql
-- Date: 2026-06-12
-- Purpose: Add double opt-in fields to the shared `subscribers` table so the
--   GAP-5 shared nurture engine can support stateless-HMAC confirmation flow.
--
--   The live table (as of 2026-06-11 recon) has NO confirmed_at column and
--   does NOT include 'pending' in the status CHECK constraint. This migration
--   adds both additively.
--
-- ADDITIVE / NULLABLE / NO DEFAULT / NO BACKFILL. Prod-safe.
-- Manager applies after GAP-5 code is green and branch is reviewed.
-- ============================================================================

-- 1. Add confirmed_at column (nullable, no default, no backfill).
--    Set when a pending subscriber clicks the double-opt-in confirm link.
--    NULL for subscribers created before this migration or on sites using
--    single opt-in. Never inferred from lead or analytics consent (LD-09).
alter table public.subscribers
  add column if not exists confirmed_at timestamptz;

-- 2. Extend the status CHECK to include 'pending'.
--    'pending' = opt-in recorded, confirmation email sent, not yet confirmed.
--    Existing rows retain their current status (active/unsubscribed/bounced/complained).
--    The subscribe handler sets 'pending' only when NURTURE_TOKEN_SECRET is set
--    (double opt-in mode); it goes straight to 'active' otherwise.
alter table public.subscribers
  drop constraint if exists subscribers_status_check;

alter table public.subscribers
  add constraint subscribers_status_check
    check (status in ('pending', 'active', 'unsubscribed', 'bounced', 'complained'));

notify pgrst, 'reload schema';

-- Rollback:
--   alter table public.subscribers drop column if exists confirmed_at;
--   alter table public.subscribers drop constraint if exists subscribers_status_check;
--   alter table public.subscribers add constraint subscribers_status_check
--     check (status in ('active','unsubscribed','bounced','complained'));
