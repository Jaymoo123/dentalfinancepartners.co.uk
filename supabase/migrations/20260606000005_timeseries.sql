-- Migration: 20260606000005_timeseries.sql
-- Purpose: bucketed time-series for the dashboard "Trends" sub-page. One RPC,
-- parameterised by bucket size, returns sessions / events / leads per bucket
-- over a window. web_events is partitioned by ts so range scans are cheap.
-- Buckets are floored in UTC by epoch so 15-minute / hourly / daily all work
-- from one code path.

create or replace function public.web_timeseries(
  p_site_key text,
  p_bucket text,         -- '15 minutes' | '1 hour' | '1 day'
  p_from timestamptz,
  p_to timestamptz
)
returns table(bucket timestamptz, sessions bigint, events bigint, leads bigint)
language sql
stable
security definer
set search_path = public
as $$
  with secs as (select greatest(extract(epoch from p_bucket::interval), 1) as s),
  evt as (
    select
      to_timestamp(floor(extract(epoch from e.ts) / (select s from secs)) * (select s from secs)) as b,
      e.session_id
    from public.web_events e
    where e.site_key = p_site_key
      and e.is_bot = false
      and e.ts >= p_from and e.ts < p_to
  ),
  ev_agg as (
    select b, count(*) as events, count(distinct session_id) as sessions
    from evt group by b
  ),
  lead_agg as (
    select
      to_timestamp(floor(extract(epoch from l.created_at) / (select s from secs)) * (select s from secs)) as b,
      count(*) as leads
    from public.leads l
    where l.source = p_site_key
      and l.created_at >= p_from and l.created_at < p_to
    group by b
  )
  select
    coalesce(ea.b, la.b)        as bucket,
    coalesce(ea.sessions, 0)    as sessions,
    coalesce(ea.events, 0)      as events,
    coalesce(la.leads, 0)       as leads
  from ev_agg ea
  full outer join lead_agg la on ea.b = la.b
  order by bucket;
$$;

grant execute on function public.web_timeseries(text, text, timestamptz, timestamptz) to authenticated;

notify pgrst, 'reload schema';
