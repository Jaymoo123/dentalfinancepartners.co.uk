-- Lead value scoring: one row per lead, judgment-scored (Claude) estimate of
-- first-year engagement value. Values are "est. fee if won" — no conversion
-- discount. Service-role access only (RLS on, no policies), like leads.
create table if not exists public.lead_value_scores (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references public.leads(id) on delete cascade,
  tier text not null check (tier in ('very_high','high','medium','low')),
  est_value_gbp integer not null check (est_value_gbp >= 0),
  intent text not null check (intent in ('incorporation','structure','cgt','sdlt','compliance','nrl_expat','vat','other','unknown')),
  work_type text not null check (work_type in ('recurring','project','one_off','none','unknown')),
  channel text not null check (channel in ('form','widget')),
  confidence text not null default 'medium' check (confidence in ('high','medium','low')),
  rationale text not null default '',
  scored_by text not null check (scored_by in ('claude_manual','claude_auto')),
  scored_at timestamptz not null default now()
);
alter table public.lead_value_scores enable row level security;
