-- ============================================================================
-- Migration: 20260701000001_lead_contactability_nurture.sql
-- Date: 2026-07-01
-- Purpose: The lead contactability & nurture layer (Property). DJH reported that
--   only 3 of 9 forwarded leads were contactable. This adds the data spine for a
--   verify -> nurture -> reactive contactability-gate pipeline that runs on our
--   side BEFORE any manual DJH forward, so we only hand over leads that are
--   verified (real, live phone/email) AND demonstrably responsive (replied,
--   booked, or confirmed).
--
--   Four tables + one funnel view + a leads.status extension:
--     lead_verification    1:1 with leads; real-time phone/email verify result
--     lead_nurture_state   per-lead reactive scheduler state (mirrors nurture_state)
--     lead_nurture_sends   immutable multi-channel send log (idempotency)
--     lead_contact_events  contactability audit trail feeding the gate
--
-- Privacy: these reference leads.id and hold no NEW contact PII beyond what
--   `leads` already stores. RLS ENABLED with NO policies on every table, so the
--   public anon/authenticated PostgREST roles are fully denied; only the service
--   role (our server routes + the estate console) reaches them. The funnel view
--   exposes counts only and is granted to service_role alone. ADDITIVE / prod-safe
--   and idempotent (safe to re-run).
--
-- Enrolment note: rows in lead_nurture_state are created EXPLICITLY by the
--   Property /api/leads/submit route (service role), not by a trigger, so only
--   Property's new server-submit path opts a lead into nurture. Other sites and
--   any direct inserts are untouched. test-data isolation (source='test' never
--   messages a real provider and never forwards) is enforced in the app layer.
-- ============================================================================

-- ---- lead_verification: real-time verify result, 1:1 with leads --------------
create table if not exists public.lead_verification (
  lead_id         uuid primary key references public.leads(id) on delete cascade,
  phone_status    text,          -- 'valid_mobile'|'valid_landline'|'voip'|'invalid'|'unknown'
  phone_line_type text,          -- raw line type from the lookup provider
  phone_carrier   text,
  phone_e164      text,          -- normalised E.164, when derivable
  email_status    text,          -- 'deliverable'|'undeliverable'|'risky'|'unknown'
  email_domain    text,
  -- Convenience gate input: phone reachable AND email not undeliverable.
  -- The contactability gate combines this with two-way response events; a live
  -- SMS/WhatsApp reply independently proves the number regardless of this flag.
  verify_pass     boolean not null default false,
  provider        text,          -- 'twilio' | 'zerobounce' | 'mx' | ...
  verified_at     timestamptz not null default now(),
  raw             jsonb          -- full provider payload, for audit/debug
);
create index if not exists lead_verification_pass_idx
  on public.lead_verification (verify_pass);

-- ---- lead_nurture_state: per-lead reactive schedule (the cron reads this) -----
create table if not exists public.lead_nurture_state (
  lead_id        uuid not null references public.leads(id) on delete cascade,
  sequence       text not null default 'property_contactability',
  step           int  not null default 0,     -- next step index to fire (0-based)
  status         text not null default 'active'
                   check (status in ('active','contactable','unreachable','stopped')),
  next_action_at timestamptz,                  -- when `step` is due
  last_action_at timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (lead_id, sequence)
);
-- Cheap "what's due now" scan for the hourly cron (only the chase-able state).
create index if not exists lead_nurture_state_due_idx
  on public.lead_nurture_state (next_action_at)
  where status = 'active';
-- AI-personalised copy (2026-07-01 programme): per-lead generated step copy, its
-- lifecycle, and the precomputed best send hour (Europe/London, 0-23) derived
-- from the visitor's on-site activity. Additive; NULL means "use static copy".
alter table public.lead_nurture_state add column if not exists generated_copy jsonb;
alter table public.lead_nurture_state add column if not exists copy_status text;
alter table public.lead_nurture_state add column if not exists best_send_hour smallint;

-- ---- lead_nurture_sends: immutable multi-channel send log (idempotency) -------
create table if not exists public.lead_nurture_sends (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads(id) on delete cascade,
  sequence     text not null,
  step         int  not null,
  channel      text not null check (channel in ('email','sms','whatsapp')),
  provider_id  text,                           -- Resend/Twilio message id, for webhook joins
  -- Claim is inserted 'pending' BEFORE the provider call, then moved to
  -- 'sent'/'skipped' on confirmation or 'failed' on error. A 'pending' row left
  -- by a crashed function is retry-eligible (taken over on the next run).
  status       text not null default 'pending'
                 check (status in ('pending','sent','delivered','failed','skipped')),
  sent_at      timestamptz not null default now(),
  delivered_at timestamptz,
  -- A given (step, channel) is sent to a lead at most once, ever — the send path
  -- inserts this row BEFORE calling the provider, so a retry/overlap is a no-op.
  unique (lead_id, sequence, step, channel)
);
create index if not exists lead_nurture_sends_provider_idx
  on public.lead_nurture_sends (provider_id) where provider_id is not null;

-- ---- lead_contact_events: the contactability audit trail ---------------------
create table if not exists public.lead_contact_events (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads(id) on delete cascade,
  event_type text not null check (event_type in
               ('verify_pass','verify_fail','sent','delivered','opened','clicked',
                'replied','confirmed','booked','opted_out','handed_off','send_failed',
                'ack_sent','operator_update')),
  channel    text check (channel in ('email','sms','whatsapp','web','system')),
  ts         timestamptz not null default now(),
  meta       jsonb
);
create index if not exists lead_contact_events_lead_idx
  on public.lead_contact_events (lead_id, ts);
create index if not exists lead_contact_events_type_idx
  on public.lead_contact_events (event_type);

-- Extend the event vocabulary with booking_viewed (a /book page load with a
-- valid token but no slot submitted; feeds the abandoned-booking nudge).
-- Drop-then-add keeps this idempotent on both fresh and already-applied DBs.
alter table public.lead_contact_events drop constraint if exists lead_contact_events_event_type_check;
alter table public.lead_contact_events add constraint lead_contact_events_event_type_check
  check (event_type in
    ('verify_pass','verify_fail','sent','delivered','opened','clicked',
     'replied','confirmed','booked','opted_out','handed_off','send_failed',
     'ack_sent','operator_update','booking_viewed'));

-- ---- lead_conversation_state: bounded concierge per-lead state ----------------
-- One row per lead in an SMS/WhatsApp concierge exchange. The concierge can ONLY
-- propose/confirm booking slots, capture best-time/portfolio answers, answer a
-- fixed FAQ list, or escalate; state here bounds the loop (turn cap forces
-- escalation). Service-role-only like its siblings.
create table if not exists public.lead_conversation_state (
  lead_id      uuid primary key references public.leads(id) on delete cascade,
  stage        text not null default 'open'
                 check (stage in ('open','slots_proposed','escalated','closed')),
  pending_slot jsonb,        -- slots offered and awaiting the lead's choice
  captured     jsonb,        -- {best_time, portfolio_size, ...} verbatim answers
  turns        int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- leads.status: extend the lifecycle enum (now actually written) ----------
-- Old set: new, contacted, qualified, converted, closed. Add the nurture states.
-- Drop-then-add keeps this idempotent; existing rows are a subset of the new set.
alter table public.leads drop constraint if exists leads_status_valid;
alter table public.leads add constraint leads_status_valid
  check (status in (
    'new','contacted','qualified','converted','closed',
    'nurturing','contactable','unreachable','forwarded'
  ));

-- ---- Lock down: all four tables are service-role-only -------------------------
alter table public.lead_verification   enable row level security;
alter table public.lead_nurture_state  enable row level security;
alter table public.lead_nurture_sends  enable row level security;
alter table public.lead_contact_events enable row level security;
alter table public.lead_conversation_state enable row level security;
-- No policies on purpose: anon/authenticated denied entirely; the service role
-- bypasses RLS for our server routes + the estate console.

-- ---- Funnel view (counts only, no PII) ---------------------------------------
create or replace view public.vw_lead_contactability_funnel as
select
  l.source                                                           as site_key,
  count(distinct l.id)                                               as submitted,
  count(distinct v.lead_id) filter (where v.verify_pass)             as verified,
  count(distinct s.lead_id)                                          as messaged,
  count(distinct er.lead_id)                                         as responded,
  count(distinct l.id) filter (where l.status = 'contactable')       as contactable,
  count(distinct l.id) filter (where l.status = 'forwarded')         as forwarded,
  count(distinct l.id) filter (where l.status = 'unreachable')       as unreachable
from public.leads l
left join public.lead_verification v   on v.lead_id = l.id
left join public.lead_nurture_sends s  on s.lead_id = l.id
left join public.lead_contact_events er on er.lead_id = l.id
     and er.event_type in ('replied','confirmed','booked')
group by l.source;

comment on view public.vw_lead_contactability_funnel is
  'Per site_key: submitted -> verified -> messaged -> responded -> contactable / forwarded / unreachable. The contactability funnel, tracked against the 3-of-9 baseline.';

grant select on public.vw_lead_contactability_funnel to service_role;

notify pgrst, 'reload schema';

-- Rollback:
--   drop view if exists public.vw_lead_contactability_funnel;
--   drop table if exists public.lead_contact_events;
--   drop table if exists public.lead_nurture_sends;
--   drop table if exists public.lead_nurture_state;
--   drop table if exists public.lead_verification;
--   alter table public.leads drop constraint if exists leads_status_valid;
--   alter table public.leads add constraint leads_status_valid
--     check (status in ('new','contacted','qualified','converted','closed'));
