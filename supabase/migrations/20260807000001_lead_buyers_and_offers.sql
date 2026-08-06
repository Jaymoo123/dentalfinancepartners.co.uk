-- Lead buyer pipeline: firms that purchase leads (lead_buyers) and the
-- offer/claim ledger (lead_offers). One offer row per (lead, buyer); the
-- partial unique index lead_offers_one_claim enforces exclusive claims at the
-- database level (first conditional UPDATE to 'claimed' wins, any second
-- claimant violates the index). price_gbp is snapshotted at offer time and is
-- the sole source of truth for monthly invoicing.
-- Service-role access only (RLS on, no policies), like leads.
-- Rollback: drop table public.lead_offers; drop table public.lead_buyers;

create table if not exists public.lead_buyers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ref text not null unique,
  firm_name text not null,
  contact_name text,
  email text not null,
  status text not null default 'active' check (status in ('active','paused','churned')),
  sources text[] not null,
  min_tier text not null default 'medium' check (min_tier in ('very_high','high','medium')),
  dsa_signed_at timestamptz,
  notes text
);
alter table public.lead_buyers enable row level security;

create table if not exists public.lead_offers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  buyer_id uuid not null references public.lead_buyers(id),
  token text not null unique default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  teaser jsonb not null,
  status text not null default 'offered' check (status in ('offered','claimed','lost','expired','credited')),
  expires_at timestamptz not null,
  claimed_at timestamptz,
  released_at timestamptz,
  price_gbp integer not null check (price_gbp >= 0),
  credit_reason text check (credit_reason in ('spam_bot','duplicate_30d','wrong_category','dead_contact')),
  unique (lead_id, buyer_id)
);
create unique index if not exists lead_offers_one_claim
  on public.lead_offers (lead_id) where status = 'claimed';
create index if not exists lead_offers_status_expiry
  on public.lead_offers (status, expires_at);
alter table public.lead_offers enable row level security;
