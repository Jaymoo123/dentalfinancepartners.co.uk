-- Site-scope the lead-nurture control plane.
--
-- Until now `lead_nurture_control` held a single global row (id=1), so pausing
-- or autopausing one site paused nurture for the whole estate. As nurture rolls
-- out to generalist / dentists / solicitors (growth program 2026-07, Track A3)
-- each site needs an independent pause + heartbeat row.
--
-- Additive and idempotent. Property keeps keying on id=1 (that row still exists);
-- the new sites key on site_key. No coupled Property code change required.
--
-- GO-LIVE PREREQUISITE: apply this before deploying any site whose nurture code
-- reads/writes lead_nurture_control by site_key.

-- 1. Add site_key (nullable first so the add never fails on the existing row).
alter table public.lead_nurture_control
  add column if not exists site_key text;

-- 2. Backfill the legacy single row to 'property' (the only site live today).
update public.lead_nurture_control
  set site_key = 'property'
  where id = 1 and site_key is null;

-- 3. Enforce presence + uniqueness on site_key going forward.
alter table public.lead_nurture_control
  alter column site_key set not null;

create unique index if not exists lead_nurture_control_site_key_uq
  on public.lead_nurture_control (site_key);

-- 4. Seed unpaused rows for the three new sites.
insert into public.lead_nurture_control (id, site_key, paused)
values
  (2, 'generalist', false),
  (3, 'dentists',   false),
  (4, 'solicitors', false)
on conflict (site_key) do nothing;

notify pgrst, 'reload schema';

-- Rollback:
--   drop index if exists public.lead_nurture_control_site_key_uq;
--   alter table public.lead_nurture_control drop column if exists site_key;
