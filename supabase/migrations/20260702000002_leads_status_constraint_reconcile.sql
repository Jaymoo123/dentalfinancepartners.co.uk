-- ============================================================================
-- Migration: 20260702000002_leads_status_constraint_reconcile.sql
-- Date: 2026-07-02
-- Purpose: Fix a dual-constraint conflict on public.leads.status found on prod.
--
--   Prod had a PRE-EXISTING check constraint leads_status_check allowing
--   {new, contacted, qualified, converted, archived}. Base migration
--   20260701000001 ADDED leads_status_valid (with contactable / unreachable /
--   forwarded / nurturing / closed) but did NOT drop the old constraint. Because
--   both checks must pass, rows could never be set to contactable / unreachable /
--   forwarded: the contactability gate would silently fail and NO lead would ever
--   be promoted or forwarded to the operator. (Staging did not hit this because
--   its leads table was rebuilt by introspection and never carried the old named
--   constraint.)
--
--   Fix: drop both status checks and add ONE union constraint. 'archived' is kept
--   for backward compatibility even though no current row uses it (prod is 62
--   rows, all status 'new'), so this validates cleanly and breaks nothing.
--
-- Additive-safe + idempotent (drop-if-exists then add).
-- ============================================================================

alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads drop constraint if exists leads_status_valid;

alter table public.leads
  add constraint leads_status_valid check (
    status = any (array[
      'new'::text, 'contacted'::text, 'qualified'::text, 'converted'::text,
      'closed'::text, 'archived'::text, 'nurturing'::text,
      'contactable'::text, 'unreachable'::text, 'forwarded'::text
    ])
  );

notify pgrst, 'reload schema';

-- Rollback (NOT recommended: restores the broken dual-constraint state):
--   alter table public.leads drop constraint if exists leads_status_valid;
--   alter table public.leads add constraint leads_status_check
--     check (status = any(array['new','contacted','qualified','converted','archived']));
--   alter table public.leads add constraint leads_status_valid
--     check (status = any(array['new','contacted','qualified','converted','closed','nurturing','contactable','unreachable','forwarded']));
