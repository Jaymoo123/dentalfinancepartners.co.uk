-- Migration: 20260606000003_section_engagement.sql
-- Purpose: which H2 sections readers actually dwell on. Powers "what gets read"
-- analysis + the journey-as-story view. Human-only. Fed by the section_view
-- event (IntersectionObserver, >=50% visible for >=2s, once per section).

create or replace view public.vw_section_engagement as
select
  site_key,
  page_path,
  props->>'section_id'        as section_id,
  max(props->>'section_text') as section_text,
  count(*)                    as views,
  count(distinct session_id)  as sessions
from public.web_events
where is_bot = false
  and event_name = 'section_view'
group by site_key, page_path, props->>'section_id';

grant select on public.vw_section_engagement to authenticated;

notify pgrst, 'reload schema';
