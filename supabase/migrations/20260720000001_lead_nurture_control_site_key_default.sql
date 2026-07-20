-- Restore legacy id-keyed writers to lead_nurture_control.
--
-- 20260718000001 added site_key NOT NULL (no default). Property's deployed
-- nurture code and the console's setNurturePaused still upsert {id: 1} with no
-- site_key. Postgres checks NOT NULL on the proposed insert tuple BEFORE
-- resolving ON CONFLICT DO UPDATE, so every such upsert fails 23502 and is
-- swallowed by the fail-silent write wrappers. Broken since go-live
-- 2026-07-19 ~12:01 UTC:
--   * recordCronHeartbeat / recordDigestHeartbeat (property heartbeats frozen)
--   * recordGuardrailAlert (alert dedupe dead -> hourly duplicate guardrail
--     emails for the persisting optouts_7d breach, ~20/day)
--   * pauseNurture / resumeNurture (property autopause dead)
--   * console setNurturePaused (property kill-switch dead)
--
-- Fix: default site_key to 'property'. id=1 IS the property row, so the
-- id-keyed upserts conflict on id and take the update path; the default only
-- satisfies the NOT NULL check on the never-kept insert tuple. Site-scoped
-- writers always pass site_key explicitly, so they are unaffected.
--
-- Verified 2026-07-20 in a rolled-back transaction: the id-keyed upsert fails
-- 23502 without the default and succeeds with it.

alter table public.lead_nurture_control
  alter column site_key set default 'property';

notify pgrst, 'reload schema';

-- Rollback:
--   alter table public.lead_nurture_control alter column site_key drop default;
