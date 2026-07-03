-- ============================================================================
-- Migration: 20260703000001_lead_nurture_multi_sequence_views.sql
-- Date: 2026-07-03
-- Purpose: Multi-sequence observability for the Property lead-nurture system.
--   A second PRIMARY sequence, 'property_detail_capture', now runs ALONGSIDE
--   'property_contactability' (it chases email-only leads for a missing name
--   and/or phone). The two per-step/stuck observability views were written when
--   only one primary sequence existed, so they collapsed everything into a
--   single dimension:
--     * vw_lead_nurture_step_health grouped by (site_key, step), which would SUM
--       both primary sequences into one step row (a step-0 count that is really
--       "contactability step 0 + detail-capture step 0").
--     * vw_lead_nurture_stuck emitted one row per (lead, sequence) but never
--       exposed WHICH sequence a stuck lead was stuck in.
--
--   This migration recreates BOTH views with a `sequence` dimension so each
--   primary (and each aux sequence) reads separately. It is purely additive: a
--   wider SELECT + an extra GROUP BY column on step_health, and one extra SELECT
--   column on stuck. No table, no data, no other view is touched. The funnel
--   (vw_lead_contactability_funnel) and health (vw_lead_nurture_health) views are
--   deliberately left alone: they count a lead once (count distinct lead_id), and
--   a lead is in exactly one primary sequence at a time, so those totals are still
--   correct without a sequence split.
--
-- Privacy: unchanged from the views being recreated. step_health exposes counts
--   only (no PII). stuck exposes lead_id + full_name (same PII the leads table
--   already holds, gated identically). Both are granted to service_role alone;
--   the underlying tables have RLS enabled with no policies, so anon /
--   authenticated PostgREST roles stay fully denied. ADDITIVE / prod-safe and
--   idempotent (drop-then-create for step_health; create-or-replace for stuck).
-- ============================================================================

-- ---- vw_lead_nurture_step_health: per (site_key, sequence, step) wide pivot ---
-- Recreated from 20260702000003 with `sequence` added to the SELECT and GROUP BY.
-- The aux-sequence exclusions (booking_reminder* / abandoned_booking) and the
-- sent/failed/skipped filtered counts are kept byte-for-byte; the only change is
-- that the two PRIMARY sequences are now separate rows instead of summed.
drop view if exists public.vw_lead_nurture_step_health;
create view public.vw_lead_nurture_step_health as
select
  l.source                                                     as site_key,
  s.sequence                                                   as sequence,
  s.step,
  count(*) filter (where s.status in ('sent', 'delivered'))    as sent,
  count(*) filter (where s.status = 'failed')                  as failed,
  count(*) filter (where s.status = 'skipped')                 as skipped
from public.lead_nurture_sends s
join public.leads l on l.id = s.lead_id
-- The aux-cron booked-reminder and abandoned-booking sends reuse steps 0/1 under
-- their own sequence names; exclude them so they do not inflate the primary
-- sequences' per-step health. (The two PRIMARY sequences both survive this
-- filter and now read as separate (sequence, step) rows.)
where s.sequence not like 'booking_reminder%'
  and s.sequence <> 'abandoned_booking'
group by l.source, s.sequence, s.step
order by l.source, s.sequence, s.step;

comment on view public.vw_lead_nurture_step_health is
  'Per (site_key, sequence, step): sent/failed/skipped for the primary nurture '
  'sequences (auxiliary reminder/nudge sequences excluded). The sequence column '
  'keeps property_contactability and property_detail_capture separate so a step '
  'row is never a sum of both primary flows.';

-- ---- vw_lead_nurture_stuck: overdue active leads, now sequence-labelled -------
-- Recreated from 20260702000001 with ns.sequence added to the SELECT; every other
-- column, the WHERE (active AND overdue > 3h), and the ORDER BY are identical.
create or replace view public.vw_lead_nurture_stuck as
select
  l.id              as lead_id,
  l.source          as site_key,
  ns.sequence       as sequence,
  l.full_name,
  l.created_at,
  ns.step,
  ns.next_action_at,
  round(
    extract(epoch from (now() - ns.next_action_at)) / 3600.0,
    1
  )                 as overdue_hours
from public.lead_nurture_state ns
join public.leads l on l.id = ns.lead_id
where ns.status = 'active'
  and ns.next_action_at < now() - interval '3 hours'
order by ns.next_action_at asc;

comment on view public.vw_lead_nurture_stuck is
  'Active leads whose next nurture action is overdue by more than 3 hours. '
  'Ordered oldest-overdue first. Surfaces lead_id + full_name + the sequence the '
  'lead is stuck in (property_contactability or property_detail_capture) for '
  'operator action. Service-role only (same gating as the underlying tables).';

-- ---- Access control: recreated views to service_role only --------------------
grant select on public.vw_lead_nurture_step_health to service_role;
grant select on public.vw_lead_nurture_stuck       to service_role;

notify pgrst, 'reload schema';

-- Rollback: re-run 20260702000003 (restores step_health without the sequence
--   column) and 20260702000001 (restores stuck without the sequence column).
--   Both are drop-then-create / create-or-replace, so re-running them cleanly
--   reverts this migration with no data effect.
