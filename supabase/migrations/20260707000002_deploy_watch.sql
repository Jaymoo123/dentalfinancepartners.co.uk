-- ============================================================================
-- Migration: 20260707000002_deploy_watch.sql
-- Date: 2026-07-07
-- Purpose: The self-driving post-deploy watch schedule. One row per (watch_key,
--          gate_day): the daily cron picks up a row once now() has passed
--          started_at + gate_day days, runs that gate's checks, emails a
--          PASS / ACTION verdict to the operator, and stamps the row sent.
--
-- The arming script (scripts/arm_deploy_watch.mjs) seeds the four gate rows
-- (days 3, 7, 14, 28) for a watch at deploy time. gate rows are pending until
-- the cron sends them; a row is set to 'skipped' if no gate is registered for it.
--
-- Internal ops table (no PII). RLS ENABLED with NO policies, so anon and
-- authenticated are denied entirely; only the service role (the cron + the arming
-- script) reaches it. Additive / prod-safe.
-- ============================================================================
create table if not exists public.deploy_watch (
  id          uuid primary key default gen_random_uuid(),
  watch_key   text not null,
  started_at  timestamptz not null,
  gate_day    int not null,
  status      text not null default 'pending'
                check (status in ('pending', 'sent', 'skipped')),
  verdict     text,
  payload     jsonb,
  sent_at     timestamptz,
  unique (watch_key, gate_day)
);

-- Cheap "which gates are still waiting" scan for the daily cron.
create index if not exists deploy_watch_pending_idx
  on public.deploy_watch (started_at)
  where status = 'pending';

-- ---- Lock down: internal ops table is service-role-only ----------------------
alter table public.deploy_watch enable row level security;
-- No policies are created on purpose: anon/authenticated are denied entirely;
-- the service role bypasses RLS for the cron + the arming script.

revoke all on public.deploy_watch from anon;
revoke all on public.deploy_watch from authenticated;
grant select, insert, update, delete on public.deploy_watch to service_role;

notify pgrst, 'reload schema';

-- Rollback:
--   drop table if exists public.deploy_watch;
