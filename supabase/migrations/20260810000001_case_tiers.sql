-- Case-type tiers for the lead offer pipeline (advisory / standard / essential),
-- replacing the value-score vocabulary (very_high/high/medium) on buyer-facing
-- surfaces. Rubric: docs/CLASSIFY.md; prices: config/tiers.json and
-- docs/LEAD_PRICING.md. The internal value-score tier column on
-- lead_value_scores is unchanged (stays an internal quality signal).
-- lead_offers and the lead_offers_one_claim index are deliberately untouched.

-- 1. Fresh classifications record their case tier alongside the value score.
--    Nullable: rows scored before this migration have no case tier and fall
--    back through the owner-approved legacy map in application code
--    (very_high/high -> advisory, medium -> standard, low -> not sellable).
alter table public.lead_value_scores
  add column if not exists case_tier text
    check (case_tier in ('advisory','standard','essential'));

-- 2. Buyer tier floors move to the case-tier vocabulary. Drop the old CHECK
--    first so the remap UPDATE cannot violate it, remap existing rows at
--    price parity, then recreate the CHECK and default.
alter table public.lead_buyers
  drop constraint if exists lead_buyers_min_tier_check;

update public.lead_buyers
  set min_tier = case min_tier
    when 'very_high' then 'advisory'
    when 'high'      then 'advisory'
    when 'medium'    then 'standard'
    else min_tier
  end;

alter table public.lead_buyers
  add constraint lead_buyers_min_tier_check
    check (min_tier in ('advisory','standard','essential'));

alter table public.lead_buyers
  alter column min_tier set default 'standard';

-- Rollback:
--   alter table public.lead_value_scores drop column if exists case_tier;
--   alter table public.lead_buyers drop constraint if exists lead_buyers_min_tier_check;
--   update public.lead_buyers set min_tier = case min_tier
--     when 'advisory'  then 'high'
--     when 'standard'  then 'medium'
--     when 'essential' then 'medium'
--     else min_tier end;
--   -- (advisory floors that were originally 'very_high' cannot be
--   --  distinguished; 'high' is the price-parity restore.)
--   alter table public.lead_buyers add constraint lead_buyers_min_tier_check
--     check (min_tier in ('very_high','high','medium'));
--   alter table public.lead_buyers alter column min_tier set default 'medium';
