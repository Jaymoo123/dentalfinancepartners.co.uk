-- ============================================================================
-- Migration: 20260608000008_lead_enrichment.sql
-- Date: 2026-06-08
-- Purpose: Lead intelligence (data & growth program Phase 4). Each lead's
--   free-text message is classified by Opus (via the Vercel AI Gateway) into an
--   intent category + a value/quality score, and any company named is matched
--   best-effort against Companies House. This confirms the incorporation signal
--   at scale and lets the partner firm prioritise high-value follow-up.
--
-- Privacy: one row per lead, no new contact PII (it references leads.id). RLS
--   ENABLED with NO policies -> service-role-only, same as subscribers. The
--   aggregate view exposes counts only. ADDITIVE / prod-safe.
-- ============================================================================

create table if not exists public.lead_enrichment (
  lead_id           uuid primary key references public.leads(id) on delete cascade,
  intent_category   text,
  intent_confidence numeric,         -- 0..1
  quality_score     int,             -- 1 (low) .. 5 (high-value)
  summary           text,            -- one-line neutral summary of the ask
  ch_company_number text,
  ch_company_name   text,
  ch_company_status text,
  ch_confidence     text,            -- 'matched' | 'guess' | null
  model             text,            -- the classifier model id
  enriched_at       timestamptz not null default now(),
  raw               jsonb            -- full classifier output, for audit/debug
);

create index if not exists lead_enrichment_intent_idx
  on public.lead_enrichment (intent_category);
create index if not exists lead_enrichment_quality_idx
  on public.lead_enrichment (quality_score);

alter table public.lead_enrichment enable row level security;
-- No policies on purpose: anon/authenticated denied; service role bypasses.

-- Aggregate intent mix per site (counts only). Joins leads for the site key.
create or replace view public.vw_lead_intent_mix as
select
  l.source                                       as site_key,
  coalesce(e.intent_category, 'unclassified')    as intent_category,
  count(*)                                        as leads,
  avg(e.quality_score)::numeric(10,2)             as avg_quality,
  count(*) filter (where e.quality_score >= 4)    as high_value
from public.lead_enrichment e
join public.leads l on l.id = e.lead_id
group by l.source, coalesce(e.intent_category, 'unclassified');

comment on view public.vw_lead_intent_mix is
  'Per (site_key, intent_category): lead count, average quality (1..5), and high-value (>=4) count. The real demand mix, confirmed at scale.';

grant select on public.vw_lead_intent_mix to service_role;

notify pgrst, 'reload schema';

-- Rollback:
--   drop view if exists public.vw_lead_intent_mix;
--   drop table if exists public.lead_enrichment;
