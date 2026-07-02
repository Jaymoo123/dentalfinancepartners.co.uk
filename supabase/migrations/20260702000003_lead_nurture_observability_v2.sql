-- ============================================================================
-- Migration: 20260702000003_lead_nurture_observability_v2.sql
-- Date: 2026-07-02
-- Purpose: Wave 2 observability fixes for the Property lead-nurture system.
--   ADDITIVE + idempotent + prod-safe. No data mutation; view recreation only,
--   plus two nullable columns on the single-row control table.
--
--   1. GAP-3 cron heartbeat: add last_cron_run_at / last_digest_run_at to
--      lead_nurture_control so a dead cron is distinguishable from a quiet day
--      (the hourly cron and the daily digest each stamp their column every run;
--      the console + digest read the staleness).
--   2. GAP-7 funnel cohort: vw_lead_contactability_funnel now counts only the
--      ENROLLED cohort (leads with a lead_nurture_state row). Pre-go-live leads
--      were never enrolled, so the 47 legacy 'new' leads no longer dilute every
--      rate (submitted/verified/contactable) read against the 3-of-9 baseline.
--      No hardcoded go-live date needed: enrolment IS the go-live cohort.
--   3. Step-health accuracy: vw_lead_nurture_step_health excludes the auxiliary
--      sequences (booking_reminder:*, abandoned_booking) so their step 0/1 sends
--      no longer inflate the main sequence's per-step counts.
--   4. AN-5 dark data: vw_lead_nurture_health surfaces opened/clicked counts
--      (24h + 7d) so email open/click rates are visible (populates once the
--      Resend engagement webhook secret, H3, is set).
-- ============================================================================

-- ---- GAP-3: cron heartbeat columns on the control table ----------------------
alter table public.lead_nurture_control add column if not exists last_cron_run_at   timestamptz;
alter table public.lead_nurture_control add column if not exists last_digest_run_at timestamptz;

-- ---- GAP-7: funnel restricted to the enrolled (post-go-live) cohort ----------
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
-- INNER join: only leads actually enrolled into a nurture sequence are counted,
-- which excludes every pre-go-live lead (deliberately not retro-messaged).
join public.lead_nurture_state nsf       on nsf.lead_id = l.id
left join public.lead_verification v     on v.lead_id = l.id
left join public.lead_nurture_sends s    on s.lead_id = l.id
left join public.lead_contact_events er  on er.lead_id = l.id
     and er.event_type in ('replied','confirmed','booked')
group by l.source;

comment on view public.vw_lead_contactability_funnel is
  'Per site_key over the ENROLLED cohort (leads with a lead_nurture_state row, i.e. post-go-live): '
  'submitted -> verified -> messaged -> responded -> contactable / forwarded / unreachable. '
  'Enrolment is the go-live cohort filter (GAP-7), so pre-go-live leads never dilute the rates.';

grant select on public.vw_lead_contactability_funnel to service_role;

-- ---- Step-health: exclude the auxiliary sequences (reminders / nudges) --------
drop view if exists public.vw_lead_nurture_step_health;
create view public.vw_lead_nurture_step_health as
select
  l.source                                                     as site_key,
  s.step,
  count(*) filter (where s.status in ('sent', 'delivered'))    as sent,
  count(*) filter (where s.status = 'failed')                  as failed,
  count(*) filter (where s.status = 'skipped')                 as skipped
from public.lead_nurture_sends s
join public.leads l on l.id = s.lead_id
-- The aux-cron booked-reminder and abandoned-booking sends reuse steps 0/1 under
-- their own sequence names; exclude them so they do not inflate the MAIN
-- contactability sequence's per-step health.
where s.sequence not like 'booking_reminder%'
  and s.sequence <> 'abandoned_booking'
group by l.source, s.step
order by l.source, s.step;

comment on view public.vw_lead_nurture_step_health is
  'Per (site_key, step): sent/failed/skipped for the MAIN nurture sequence only '
  '(auxiliary reminder/nudge sequences excluded so step 0/1 are not inflated).';

grant select on public.vw_lead_nurture_step_health to service_role;

-- ---- AN-5: surface opened/clicked engagement in the health view --------------
drop view if exists public.vw_lead_nurture_health;
create view public.vw_lead_nurture_health as
with base as (
  select distinct source as site_key
  from public.leads
  where source is not null
),
sends_agg as (
  select
    l.source as site_key,
    count(*) filter (where s.sent_at >= now() - interval '24 hours')                                    as sends_24h,
    count(*) filter (where s.sent_at >= now() - interval '24 hours' and s.status in ('sent','delivered')) as sent_24h,
    count(*) filter (where s.sent_at >= now() - interval '24 hours' and s.status = 'failed')             as failed_24h,
    count(*) filter (where s.sent_at >= now() - interval '24 hours' and s.status = 'skipped')            as skipped_24h,
    count(*) filter (where s.sent_at >= now() - interval '1 hour')                                       as sends_1h,
    count(*) filter (where s.sent_at >= now() - interval '1 hour' and s.status = 'failed')               as failed_1h,
    count(*) filter (where s.sent_at >= now() - interval '1 hour' and s.status = 'skipped')              as skipped_1h
  from public.lead_nurture_sends s
  join public.leads l on l.id = s.lead_id
  group by l.source
),
events_agg as (
  select
    l.source as site_key,
    count(*) filter (where e.event_type = 'send_failed' and e.meta->>'kind' = 'complaint' and e.ts >= now() - interval '24 hours') as complaints_24h,
    count(*) filter (where e.event_type = 'send_failed' and e.meta->>'kind' = 'complaint' and e.ts >= now() - interval '7 days')   as complaints_7d,
    count(*) filter (where e.event_type = 'send_failed' and e.meta->>'kind' = 'bounce'    and e.ts >= now() - interval '24 hours') as bounces_24h,
    count(*) filter (where e.event_type = 'send_failed' and e.meta->>'kind' = 'bounce'    and e.ts >= now() - interval '7 days')   as bounces_7d,
    count(*) filter (where e.event_type = 'opted_out' and e.ts >= now() - interval '7 days')  as optouts_7d,
    count(*) filter (where e.event_type = 'replied'   and e.ts >= now() - interval '24 hours') as replies_24h,
    count(*) filter (where e.event_type = 'booked'    and e.ts >= now() - interval '24 hours') as booked_24h,
    count(*) filter (where e.event_type = 'opened'    and e.ts >= now() - interval '24 hours') as opened_24h,
    count(*) filter (where e.event_type = 'clicked'   and e.ts >= now() - interval '24 hours') as clicked_24h,
    count(*) filter (where e.event_type = 'opened'    and e.ts >= now() - interval '7 days')  as opened_7d,
    count(*) filter (where e.event_type = 'clicked'   and e.ts >= now() - interval '7 days')  as clicked_7d
  from public.lead_contact_events e
  join public.leads l on l.id = e.lead_id
  group by l.source
),
state_agg as (
  select
    l.source as site_key,
    count(distinct ns.lead_id) filter (where ns.status = 'active')                                                    as active_leads,
    count(distinct ns.lead_id) filter (where ns.status = 'active' and ns.next_action_at < now() - interval '3 hours') as stuck_leads
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
  coalesce(ea.opened_24h,     0) as opened_24h,
  coalesce(ea.clicked_24h,    0) as clicked_24h,
  coalesce(ea.opened_7d,      0) as opened_7d,
  coalesce(ea.clicked_7d,     0) as clicked_7d,
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
  'Per site_key: 24h/1h send volume + failure/skip/complaint/bounce/opt-out/reply/booking/OPEN/CLICK '
  'rates, active lead count, stuck leads (overdue >3h), and contactability totals. Counts only, no PII.';

grant select on public.vw_lead_nurture_health to service_role;

notify pgrst, 'reload schema';

-- Rollback: re-run 20260702000001 (health + step_health) and 20260701000001
--   (funnel) to restore the prior view definitions; the two control columns are
--   nullable and additive and can be left in place (or dropped):
--   alter table public.lead_nurture_control drop column if exists last_cron_run_at;
--   alter table public.lead_nurture_control drop column if exists last_digest_run_at;
