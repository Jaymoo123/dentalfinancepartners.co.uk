-- Migration: 20260606000002_personalization_view.sql
-- Purpose: measure the personalization layer. Per (rule_id, surface, topic,
-- variant): impressions, clicks, dismissals, click-through, and how many shown
-- sessions went on to convert (joins web_sessions.lead_id, populated by the
-- stitch trigger in ...000001). Human-only. Drives the dashboard panel + A/B.

create or replace view public.vw_personalization_results as
with pe as (
  select
    site_key,
    coalesce(props->>'rule_id', '?')  as rule_id,
    coalesce(props->>'surface', '?')  as surface,
    coalesce(props->>'topic', '?')    as topic,
    coalesce(props->>'variant', '?')  as variant,
    event_name,
    session_id
  from public.web_events
  where is_bot = false
    and event_name in (
      'personalization_shown',
      'personalization_clicked',
      'personalization_dismissed'
    )
),
counts as (
  select
    site_key, rule_id, surface, topic, variant,
    count(*) filter (where event_name = 'personalization_shown')                 as shown,
    count(*) filter (where event_name = 'personalization_clicked')               as clicked,
    count(*) filter (where event_name = 'personalization_dismissed')             as dismissed,
    count(distinct session_id) filter (where event_name = 'personalization_shown') as shown_sessions
  from pe
  group by site_key, rule_id, surface, topic, variant
),
conv as (
  select p.site_key, p.rule_id, p.surface, p.topic, p.variant,
         count(distinct p.session_id) as converted_sessions
  from (
    select distinct site_key, rule_id, surface, topic, variant, session_id
    from pe where event_name = 'personalization_shown'
  ) p
  join public.web_sessions s
    on s.session_id = p.session_id and s.lead_id is not null
  group by p.site_key, p.rule_id, p.surface, p.topic, p.variant
)
select
  c.site_key, c.rule_id, c.surface, c.topic, c.variant,
  c.shown, c.clicked, c.dismissed, c.shown_sessions,
  coalesce(cv.converted_sessions, 0) as converted_sessions,
  case when c.shown > 0
       then round(c.clicked::numeric / c.shown, 4) end as click_rate,
  case when c.shown_sessions > 0
       then round(coalesce(cv.converted_sessions, 0)::numeric / c.shown_sessions, 4) end as shown_to_lead_rate
from counts c
left join conv cv using (site_key, rule_id, surface, topic, variant);

grant select on public.vw_personalization_results to authenticated;

notify pgrst, 'reload schema';
