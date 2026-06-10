-- Migration: 20260606000004_experiments.sql
-- Purpose: A/B results from our own events. Each event carries props.exp
-- ("key:variant") for whatever experiment(s) the visitor is in (stamped client-
-- side by track()). Per exp bucket: sessions, engagement signals, and conversion
-- (joins web_sessions.lead_id). Human-only. No dedicated column needed.

create or replace view public.vw_experiment_results as
with ev as (
  select site_key, props->>'exp' as exp, session_id, event_name
  from public.web_events
  where is_bot = false
    and props ? 'exp'
    and coalesce(props->>'exp', '') <> ''
)
select
  e.site_key,
  e.exp,
  count(distinct e.session_id)                                      as sessions,
  count(*) filter (where e.event_name = 'cta_click')                as cta_clicks,
  count(*) filter (where e.event_name = 'form_start')               as form_starts,
  count(distinct e.session_id) filter (where s.lead_id is not null) as converted_sessions,
  case when count(distinct e.session_id) > 0
       then round(
              count(distinct e.session_id) filter (where s.lead_id is not null)::numeric
              / count(distinct e.session_id), 4)
       end                                                          as conversion_rate
from ev e
left join public.web_sessions s on s.session_id = e.session_id
group by e.site_key, e.exp;

grant select on public.vw_experiment_results to authenticated;

notify pgrst, 'reload schema';
