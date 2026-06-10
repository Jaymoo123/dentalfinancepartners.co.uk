-- ============================================================================
-- Migration: 20260608000007_nurture_engine.sql
-- Date: 2026-06-08
-- Purpose: The nurture engine (data & growth program Phase 3). Conversion is a
--   MULTI-VISIT reality (only returning visitors convert) and we had no way to
--   bring people back. This adds an opt-in marketing list with its OWN consent
--   (never the lead-enquiry consent), a per-subscriber drip scheduler, and an
--   immutable send log for idempotency + funnel metrics.
--
-- Privacy: subscribers holds email (PII). All three tables get RLS ENABLED with
--   NO policies, so the public anon/authenticated PostgREST roles are fully
--   denied; only the service role (used by our server routes + the admin
--   dashboard) reaches them. The aggregate views expose counts only and are
--   granted to service_role alone. ADDITIVE / prod-safe.
-- ============================================================================

-- ---- subscribers: the marketing opt-in list (separate from `leads`) ---------
create table if not exists public.subscribers (
  id                uuid primary key default gen_random_uuid(),
  site_key          text not null default 'property',
  email             text not null,
  status            text not null default 'active'
                      check (status in ('active','unsubscribed','bounced','complained')),
  -- Own marketing consent, captured at opt-in. NEVER reuse the lead-enquiry consent.
  consent_given     boolean not null default false,
  consent_text      text,
  consent_at        timestamptz,
  -- Links the subscriber back to their first-party journey (sessions/leads).
  visitor_id        text,
  entry_topic       text,
  source            text,                 -- surface they opted in from (e.g. "blog_footer")
  unsubscribe_token uuid not null default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Case-insensitive uniqueness per site without the citext extension.
create unique index if not exists subscribers_site_email_uidx
  on public.subscribers (site_key, lower(email));
create index if not exists subscribers_visitor_idx
  on public.subscribers (visitor_id) where visitor_id is not null;
create unique index if not exists subscribers_unsub_token_uidx
  on public.subscribers (unsubscribe_token);

-- ---- nurture_state: per subscriber+sequence schedule (the scheduler reads this)
create table if not exists public.nurture_state (
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  sequence      text not null default 'property_updates',
  step          int  not null default 0,     -- next step index to send (0-based)
  status        text not null default 'active'
                  check (status in ('active','completed','paused')),
  next_send_at  timestamptz,                 -- when `step` is due
  last_sent_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (subscriber_id, sequence)
);
-- Cheap "what's due now" scan for the cron.
create index if not exists nurture_state_due_idx
  on public.nurture_state (next_send_at)
  where status = 'active';

-- ---- nurture_sends: immutable per-step send log (idempotency + funnel) -------
create table if not exists public.nurture_sends (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  sequence      text not null,
  step          int  not null,
  resend_id     text,                        -- Resend message id, for webhook joins
  sent_at       timestamptz not null default now(),
  opened_at     timestamptz,
  clicked_at    timestamptz,
  bounced_at    timestamptz,
  complained_at timestamptz,
  -- A given step is sent to a subscriber at most once, ever — the send path
  -- inserts this row BEFORE calling Resend, so a retry/overlap is a no-op.
  unique (subscriber_id, sequence, step)
);
create index if not exists nurture_sends_resend_idx
  on public.nurture_sends (resend_id) where resend_id is not null;

-- ---- Lock down: PII tables are service-role-only -----------------------------
alter table public.subscribers   enable row level security;
alter table public.nurture_state enable row level security;
alter table public.nurture_sends enable row level security;
-- No policies are created on purpose: anon/authenticated are denied entirely;
-- the service role bypasses RLS for our server routes + dashboard.

-- ---- Aggregate views (counts only, no PII) -----------------------------------
create or replace view public.vw_subscriber_health as
select site_key, status, count(*) as subscribers
from public.subscribers
group by site_key, status;

comment on view public.vw_subscriber_health is
  'Per (site_key, status): subscriber counts — list health (active/unsubscribed/bounced/complained).';

create or replace view public.vw_nurture_step_funnel as
select
  s.site_key,
  ns.sequence,
  ns.step,
  count(*)                  as sent,
  count(ns.opened_at)       as opened,
  count(ns.clicked_at)      as clicked,
  count(ns.bounced_at)      as bounced
from public.nurture_sends ns
join public.subscribers s on s.id = ns.subscriber_id
group by s.site_key, ns.sequence, ns.step;

comment on view public.vw_nurture_step_funnel is
  'Per (site_key, sequence, step): sent / opened / clicked / bounced — the nurture drip funnel.';

grant select on public.vw_subscriber_health   to service_role;
grant select on public.vw_nurture_step_funnel to service_role;

notify pgrst, 'reload schema';

-- Rollback:
--   drop view if exists public.vw_nurture_step_funnel;
--   drop view if exists public.vw_subscriber_health;
--   drop table if exists public.nurture_sends;
--   drop table if exists public.nurture_state;
--   drop table if exists public.subscribers;
