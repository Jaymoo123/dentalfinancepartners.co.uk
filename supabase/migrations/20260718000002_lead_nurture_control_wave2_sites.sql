-- Seed lead_nurture_control rows for the wave-2 nurture sites.
--
-- Follows 20260718000001 (which site-scoped the control plane and seeded
-- generalist / dentists / solicitors). Wave-2 rolls nurture out to medical /
-- construction-cis / contractors-ir35 (growth program 2026-07, Track A3), each
-- of which reads/writes lead_nurture_control by site_key, so each needs its own
-- independent pause + heartbeat row.
--
-- Additive and idempotent. Requires 20260718000001 applied first (site_key
-- column + unique index already exist).
--
-- GO-LIVE PREREQUISITE: apply before deploying any of these three sites' nurture
-- code. Rows are seeded UNPAUSED, but sends stay dormant until LEAD_NURTURE_ENABLED
-- is set per site (master arm) - seeding the row does not arm anything.

insert into public.lead_nurture_control (id, site_key, paused)
values
  (5, 'medical',          false),
  (6, 'construction-cis', false),
  (7, 'contractors-ir35', false)
on conflict (site_key) do nothing;

notify pgrst, 'reload schema';

-- Rollback:
--   delete from public.lead_nurture_control
--     where site_key in ('medical', 'construction-cis', 'contractors-ir35');
