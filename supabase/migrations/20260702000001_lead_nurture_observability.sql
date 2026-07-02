-- ============================================================================
-- Migration: 20260702000001_lead_nurture_observability.sql
-- Date: 2026-07-02
-- Purpose: Observability layer for the Property lead-nurture system. Adds:
--     lead_nurture_control  single-row pause/alert control plane
--     vw_lead_nurture_health  per-site 24h/1h volume + health metrics (no PII)
--     vw_lead_nurture_step_health  per (site_key, step) wide: sent/failed/skipped
--     vw_lead_nurture_stuck  PII-bearing list of active leads overdue by >3 h
--
--   The health views avoid join fan-out by pre-aggregating each source table
--   independently (sends, events, state, leads) and then LEFT JOINing the CTE
--   results to a DISTINCT site_key base. All counts coalesce to 0 for sites
--   that have no rows in a given table yet.
--
--   vw_lead_nurture_stuck does expose full_name and lead_id so the operator
--   console can surface actionable rows. Access is gated to service_role only,
--   matching the posture of the sibling tables created in 20260701000001.
--
-- Privacy: lead_nurture_control holds no PII. vw_lead_nurture_health and
--   vw_lead_nurture_step_health expose counts only. vw_lead_nurture_stuck
--   exposes full_name and lead_id (same PII already in the leads table, gated
--   identically). RLS ENABLED on the table with NO policies, so anon /
--   authenticated PostgREST roles are fully denied. Views granted to
--   service_role alone. ADDITIVE / prod-safe and idempotent (safe to re-run).
-- ============================================================================

-- ---- lead_nurture_control: single-row pause / alert control plane -----------
create table if not exists public.lead_nurture_control (
  id              smallint primary key default 1 check (id = 1),
  paused          boolean  not null default false,
  paused_reason   text,
  paused_at       timestamptz,
  paused_by       text,
  last_alert_at   timestamptz,
  last_alert_key  text,
  updated_at      timestamptz not null default now()
);

-- No policies on purpose: anon/authenticated denied entirely; the service role
-- bypasses RLS for our server routes + the estate console.
alter table public.lead_nurture_control enable row level security;

-- Seed the control row (idempotent).
insert into public.lead_nurture_control (id, paused)
values (1, false)
on conflict (id) do nothing;

-- Drop views that will be recreated (idempotent; step_health first as a
-- precaution, though neither view depends on the other).
drop view if exists public.vw_lead_nurture_step_health;
drop view if exists public.vw_lead_nurture_health;

-- ---- vw_lead_nurture_health: per-site volume + health (counts, no PII) ------
create view public.vw_lead_nurture_health as
with base as (
  select distinct source as site_key
  from public.leads
  where source is not null
),
sends_agg as (
  select
    l.source as site_key,
    count(*) filter (
      where s.sent_at >= now() - interval '24 hours'
    )                                                                             as sends_24h,
    count(*) filter (
      where s.sent_at >= now() - interval '24 hours'
        and s.status in ('sent', 'delivered')
    )                                                                             as sent_24h,
    count(*) filter (
      where s.sent_at >= now() - interval '24 hours'
        and s.status = 'failed'
    )                                                                             as failed_24h,
    count(*) filter (
      where s.sent_at >= now() - interval '24 hours'
        and s.status = 'skipped'
    )                                                                             as skipped_24h,
    count(*) filter (
      where s.sent_at >= now() - interval '1 hour'
    )                                                                             as sends_1h,
    count(*) filter (
      where s.sent_at >= now() - interval '1 hour'
        and s.status = 'failed'
    )                                                                             as failed_1h,
    count(*) filter (
      where s.sent_at >= now() - interval '1 hour'
        and s.status = 'skipped'
    )                                                                             as skipped_1h
  from public.lead_nurture_sends s
  join public.leads l on l.id = s.lead_id
  group by l.source
),
events_agg as (
  select
    l.source as site_key,
    count(*) filter (
      where e.event_type = 'send_failed'
        and e.meta->>'kind' = 'complaint'
        and e.ts >= now() - interval '24 hours'
    )                                                                             as complaints_24h,
    count(*) filter (
      where e.event_type = 'send_failed'
        and e.meta->>'kind' = 'complaint'
        and e.ts >= now() - interval '7 days'
    )                                                                             as complaints_7d,
    count(*) filter (
      where e.event_type = 'send_failed'
        and e.meta->>'kind' = 'bounce'
        and e.ts >= now() - interval '24 hours'
    )                                                                             as bounces_24h,
    count(*) filter (
      where e.event_type = 'send_failed'
        and e.meta->>'kind' = 'bounce'
        and e.ts >= now() - interval '7 days'
    )                                                                             as bounces_7d,
    count(*) filter (
      where e.event_type = 'opted_out'
        and e.ts >= now() - interval '7 days'
    )                                                                             as optouts_7d,
    count(*) filter (
      where e.event_type = 'replied'
        and e.ts >= now() - interval '24 hours'
    )                                                                             as replies_24h,
    count(*) filter (
      where e.event_type = 'booked'
        and e.ts >= now() - interval '24 hours'
    )                                                                             as booked_24h
  from public.lead_contact_events e
  join public.leads l on l.id = e.lead_id
  group by l.source
),
state_agg as (
  select
    l.source as site_key,
    count(distinct ns.lead_id) filter (
      where ns.status = 'active'
    )                                                                             as active_leads,
    count(distinct ns.lead_id) filter (
      where ns.status = 'active'
        and ns.next_action_at < now() - interval '3 hours'
    )                                                                             as stuck_leads
  from public.lead_nurture_state ns
  join public.leads l on l.id = ns.lead_id
  group by l.source
),
lead_agg as (
  select
    l.source as site_key,
    count(*) filter (where l.status = 'contactable')  as contactable,
    count(*) filter (where l.status = 'unreachable')  as unreachable,
    count(*) filter (where l.status = 'forwarded')    as forwarded
  from public.leads l
  group by l.source
)
select
  b.site_key,
  coalesce(sa.sends_24h,      0) as sends_24h,
  coalesce(sa.sent_24h,       0) as sent_24h,
  coalesce(sa.failed_24h,     0) as failed_24h,
  coalesce(sa.skipped_24h,    0) as skipped_24h,
  coalesce(sa.sends_1h,       0) as sends_1h,
  coalesce(sa.failed_1h,      0) as failed_1h,
  coalesce(sa.skipped_1h,     0) as skipped_1h,
  coalesce(ea.complaints_24h, 0) as complaints_24h,
  coalesce(ea.complaints_7d,  0) as complaints_7d,
  coalesce(ea.bounces_24h,    0) as bounces_24h,
  coalesce(ea.bounces_7d,     0) as bounces_7d,
  coalesce(ea.optouts_7d,     0) as optouts_7d,
  coalesce(ea.replies_24h,    0) as replies_24h,
  coalesce(ea.booked_24h,     0) as booked_24h,
  coalesce(st.active_leads,   0) as active_leads,
  coalesce(st.stuck_leads,    0) as stuck_leads,
  coalesce(la.contactable,    0) as contactable,
  coalesce(la.unreachable,    0) as unreachable,
  coalesce(la.forwarded,      0) as forwarded
from base b
left join sends_agg  sa on sa.site_key = b.site_key
left join events_agg ea on ea.site_key = b.site_key
left join state_agg  st on st.site_key = b.site_key
left join lead_agg   la on la.site_key = b.site_key;

comment on view public.vw_lead_nurture_health is
  'Per site_key: 24h/1h send volume + failure/skip/complaint/bounce/opt-out/reply/booking rates, '
  'active lead count, stuck leads (overdue >3 h), and contactability funnel totals. '
  'Counts only, no PII. Built from independent per-table CTEs to avoid join fan-out.';

-- ---- vw_lead_nurture_step_health: per (site_key, step) wide pivot -----------
create view public.vw_lead_nurture_step_health as
select
  l.source                                                                       as site_key,
  s.step,
  count(*) filter (where s.status in ('sent', 'delivered'))                     as sent,
  count(*) filter (where s.status = 'failed')                                   as failed,
  count(*) filter (where s.status = 'skipped')                                  as skipped
from public.lead_nurture_sends s
join public.leads l on l.id = s.lead_id
group by l.source, s.step
order by l.source, s.step;

comment on view public.vw_lead_nurture_step_health is
  'Per (site_key, step): sent/failed/skipped counts in wide format. '
  'Use to spot a step that is consistently failing or skipped across leads.';

-- Per (lead, sequence); 1:1 today because only the 'property_contactability' sequence exists.
-- ---- vw_lead_nurture_stuck: actionable list of overdue active leads ----------
create or replace view public.vw_lead_nurture_stuck as
select
  l.id              as lead_id,
  l.source          as site_key,
  l.full_name,
  l.created_at,
  ns.step,
  ns.next_action_at,
  round(
    extract(epoch from (now() - ns.next_action_at)) / 3600.0,
    1
  )                 as overdue_hours
from public.lead_nurture_state ns
join public.leads l on l.id = ns.lead_id
where ns.status = 'active'
  and ns.next_action_at < now() - interval '3 hours'
order by ns.next_action_at asc;

comment on view public.vw_lead_nurture_stuck is
  'Active leads whose next nurture action is overdue by more than 3 hours. '
  'Ordered oldest-overdue first. Surfaces lead_id + full_name for operator action. '
  'Service-role only (same gating as the underlying nurture tables).';

-- ---- Access control: views to service_role only -----------------------------
grant select on public.vw_lead_nurture_health      to service_role;
grant select on public.vw_lead_nurture_step_health to service_role;
grant select on public.vw_lead_nurture_stuck       to service_role;

notify pgrst, 'reload schema';

-- Rollback:
--   drop view if exists public.vw_lead_nurture_stuck;
--   drop view if exists public.vw_lead_nurture_step_health;
--   drop view if exists public.vw_lead_nurture_health;
--   drop table if exists public.lead_nurture_control;
