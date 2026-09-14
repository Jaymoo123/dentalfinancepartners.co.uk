-- Paid workings PDF: two-week concierge test on Property's premium calculators
-- (plan: docs/property/STATE.md 2026-09-14; data case in
-- docs/_engines/AUDIENCE_INTENT_MONETISATION_2026-09-14.md).
--
-- Three objects:
--   1. site_flags          runtime on/off switch read by /api/calc/pdf-offer.
--                          Ships OFF; flipping needs no deploy.
--   2. calc_pdf_requests   click-time snapshot of the calculator inputs so a Stripe
--                          payment (client_reference_id = id) can be fulfilled by hand.
--                          No PII by design: the buyer's email lives in Stripe only.
--                          Rows older than 90 days are deleted by hand at test close.
--   3. vw_calc_pdf_test    console dashboard view: exposures and clicks per day /
--                          tool / placement since the flag's started_at.
--
-- Both tables have RLS enabled with NO policies: service role only. anon and
-- authenticated can neither read nor write them.
--
-- Rollback:
--   drop view if exists public.vw_calc_pdf_test;
--   drop table if exists public.calc_pdf_requests;
--   drop table if exists public.site_flags;

-- 1. runtime switch --------------------------------------------------------
create table if not exists public.site_flags (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_flags enable row level security;

insert into public.site_flags (key, value)
values ('calc_pdf_offer', '{"enabled": false, "link": "", "price_gbp": 29, "started_at": null}')
on conflict (key) do nothing;

-- 2. click-time snapshots for manual fulfilment ----------------------------
create table if not exists public.calc_pdf_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  site_key          text not null default 'property',
  tool_id           text not null,
  placement         text,
  payload           jsonb not null,
  user_agent        text,
  stripe_session_id text,           -- set by hand from the Stripe dashboard
  fulfilled_at      timestamptz,    -- set by hand when the PDF is sent
  notes             text
);
create index if not exists calc_pdf_requests_created_idx
  on public.calc_pdf_requests (created_at desc);
alter table public.calc_pdf_requests enable row level security;

-- 3. dashboard view ---------------------------------------------------------
-- cta_click props carry cta_id/placement/goal but not calculator_slug
-- (autoCapture.ts), so the per-tool split of clicks comes from
-- calc_pdf_requests.tool_id, read directly by the console. Exposures are
-- calc_result_viewed sessions on the three offered tools.
create or replace view public.vw_calc_pdf_test as
with flag as (
  select (value->>'started_at')::timestamptz as started_at
  from public.site_flags
  where key = 'calc_pdf_offer'
),
ev as (
  select
    date_trunc('day', e.ts)        as day,
    e.props->>'calculator_slug'    as tool_id,
    e.props->>'placement'          as placement,
    e.session_id,
    e.event_name
  from public.web_events e
  join public.web_sessions s on s.session_id = e.session_id
  cross join flag
  where e.is_bot = false
    and s.is_bot = false
    and e.site_key = 'property'
    and flag.started_at is not null
    and e.ts >= flag.started_at
    and (
      (e.event_name = 'calc_result_viewed'
        and e.props->>'calculator_slug' in
          ('capital-gains-premium', 'incorporation-premium', 'section-24-premium'))
      or (e.event_name = 'cta_click' and e.props->>'cta_id' = 'premium_pdf_29')
    )
)
select
  day,
  tool_id,
  placement,
  count(distinct session_id) filter (where event_name = 'calc_result_viewed') as exposure_sessions,
  count(distinct session_id) filter (where event_name = 'cta_click')          as click_sessions,
  count(*)                   filter (where event_name = 'cta_click')          as clicks
from ev
group by 1, 2, 3;
