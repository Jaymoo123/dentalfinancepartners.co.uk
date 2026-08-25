-- Telegram approval bot ops: raw Bulk Supply ledger (DSA clause 3.6 / 3.5),
-- release-nudge stamp, bot kill switch, and grading provenance for AI/owner
-- tiering. State-table decision: bot approvals live on existing rows via
-- conditional status transitions (the house pattern); the only genuinely new
-- state is the raw supply ledger.
-- Service-role only (RLS enabled, no policies), same as lead_offers.

-- Raw Bulk Supply ledger. unique(lead_id) IS the business rule: a lead is
-- supplied at most once, is excluded from tiered offers forever after, and the
-- unique index doubles as the idempotency latch for [Send batch] double-taps.
create table if not exists public.lead_supply (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null unique references public.leads(id) on delete cascade,
  buyer_id uuid not null references public.lead_buyers(id),
  price_gbp integer not null check (price_gbp >= 0),
  supplied_at timestamptz not null default now()
);

alter table public.lead_supply enable row level security;

-- One release nudge max per held claim (adversarial M3: an hourly cron without
-- a stamp re-fires every hour per stuck claim).
alter table public.lead_offers add column if not exists nudged_at timestamptz;

-- Bot kill switch rides the existing single-row control table (id=1).
alter table public.lead_nurture_control
  add column if not exists bot_paused boolean not null default false,
  add column if not exists bot_paused_at timestamptz;

-- Grading provenance: gateway grades reuse 'claude_auto'; the deterministic
-- keyword fallback and the owner's Telegram tier override need honest values.
alter table public.lead_value_scores
  drop constraint if exists lead_value_scores_scored_by_check;
alter table public.lead_value_scores
  add constraint lead_value_scores_scored_by_check
    check (scored_by in ('claude_manual', 'claude_auto', 'deterministic', 'owner'));

-- Rollback:
--   drop table if exists public.lead_supply;
--   alter table public.lead_offers drop column if exists nudged_at;
--   alter table public.lead_nurture_control drop column if exists bot_paused;
--   alter table public.lead_nurture_control drop column if exists bot_paused_at;
--   alter table public.lead_value_scores drop constraint if exists lead_value_scores_scored_by_check;
--   alter table public.lead_value_scores add constraint lead_value_scores_scored_by_check
--     check (scored_by in ('claude_manual','claude_auto'));
