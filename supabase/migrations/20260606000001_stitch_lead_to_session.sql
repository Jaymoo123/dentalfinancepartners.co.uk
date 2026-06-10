-- Migration: 20260606000001_stitch_lead_to_session.sql
-- Purpose: populate web_sessions.lead_id when a lead is submitted, so the
--          conversion metrics and calculator->lead attribution actually work.
--
-- Background: web_sessions.lead_id was declared but never populated, so every
-- conversion view (vw_visitor_journey.converted, vw_web_funnel_daily.
-- converted_sessions, vw_calculator_conversion.lead_sessions) read hard-zero.
-- The lead row already carries session_id/visitor_id (migration ...0002) and a
-- 'lead_submitted' event already lands in web_events; this just back-links the
-- lead to its session. Niche-agnostic: no-ops harmlessly for sites with no
-- web_sessions rows. NO visitor_id fallback by design (it would mis-attribute a
-- lead to an earlier session and corrupt session-level attribution); the rare
-- "session row arrived after the lead" race is closed by reconcile_lead_sessions().

-- 1. Trigger: stitch on lead insert (the common, instant path).
create or replace function public.stitch_lead_to_session()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.web_sessions
     set lead_id = NEW.id
   where session_id = NEW.session_id
     and lead_id is null;
  return NEW;
end;
$$;

drop trigger if exists stitch_lead_to_session_trg on public.leads;
create trigger stitch_lead_to_session_trg
  after insert on public.leads
  for each row
  when (NEW.session_id is not null)
  execute function public.stitch_lead_to_session();

-- 2. Reconciliation backstop: stitch any leads whose session row landed AFTER
--    the lead insert (sendBeacon race). Idempotent; safe to run on a schedule.
--    Matches on session_id only (same non-pollution guarantee as the trigger).
create or replace function public.reconcile_lead_sessions()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  update public.web_sessions s
     set lead_id = l.id
    from public.leads l
   where s.lead_id is null
     and l.session_id is not null
     and l.session_id = s.session_id;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- 3. One-time backfill of everything already in the tables.
select public.reconcile_lead_sessions();

notify pgrst, 'reload schema';
