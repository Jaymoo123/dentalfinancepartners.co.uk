-- Claim-race port (owner-locked model of 2026-08-12, wired live 2026-08-19):
-- a lead can be claimed by up to 3 firms at the same fixed price; an
-- exclusive claim (3x) is possible only while the lead is wholly unclaimed
-- and closes it to everyone else. Test buyers (owner's own inbox rows) never
-- consume an allocation slot. Atomicity lives HERE, in one function that
-- serialises per lead via a lock on the parent lead row, replacing the old
-- one-claim partial unique index.

alter table public.lead_offers
  add column if not exists exclusive boolean not null default false;

alter table public.lead_buyers
  add column if not exists is_test boolean not null default false;

update public.lead_buyers set is_test = true where ref = 'test-owner-inbox';

drop index if exists public.lead_offers_one_claim;

create or replace function public.claim_lead_offer(
  p_offer_id uuid,
  p_cap int default 3,
  p_exclusive boolean default false,
  p_exclusive_multiplier int default 3
) returns table (outcome text, charged_gbp int)
language plpgsql
as $$
declare
  v_offer public.lead_offers%rowtype;
  v_claims int;
  v_locked int;
begin
  select * into v_offer from public.lead_offers where id = p_offer_id;
  if not found then
    return query select 'error'::text, 0; return;
  end if;

  -- One lock point per lead serialises every competing claim (no deadlock
  -- ordering problem, unlike locking sibling offer rows individually).
  perform 1 from public.leads where id = v_offer.lead_id for update;

  -- Re-read under the lock.
  select * into v_offer from public.lead_offers where id = p_offer_id;

  if v_offer.status = 'claimed' then
    return query select 'not-offered'::text, v_offer.price_gbp; return;
  end if;
  if v_offer.status = 'lost' then
    return query select 'lost'::text, v_offer.price_gbp; return;
  end if;
  if v_offer.status <> 'offered' or v_offer.expires_at < now() then
    return query select 'expired'::text, v_offer.price_gbp; return;
  end if;

  -- An exclusive lock by anyone closes the lead outright.
  select count(*) into v_locked
    from public.lead_offers o
   where o.lead_id = v_offer.lead_id and o.status = 'claimed' and o.exclusive;
  if v_locked > 0 then
    return query select 'lost'::text, v_offer.price_gbp; return;
  end if;

  -- Allocation count: real firms only. Test buyers never consume a slot.
  select count(*) into v_claims
    from public.lead_offers o
    join public.lead_buyers b on b.id = o.buyer_id
   where o.lead_id = v_offer.lead_id and o.status = 'claimed' and not b.is_test;

  if p_exclusive then
    -- Exclusive only while wholly unclaimed (the race decides); price is the
    -- shared price times the multiplier, charged only when the lock wins.
    if v_claims > 0 then
      return query select 'exclusive-unavailable'::text, v_offer.price_gbp; return;
    end if;
    update public.lead_offers
       set status = 'claimed', claimed_at = now(), exclusive = true,
           price_gbp = v_offer.price_gbp * p_exclusive_multiplier
     where id = p_offer_id;
    update public.lead_offers
       set status = 'lost'
     where lead_id = v_offer.lead_id and status = 'offered';
    return query select 'claimed'::text, v_offer.price_gbp * p_exclusive_multiplier; return;
  end if;

  if v_claims >= p_cap then
    return query select 'allocated'::text, v_offer.price_gbp; return;
  end if;

  update public.lead_offers
     set status = 'claimed', claimed_at = now()
   where id = p_offer_id;

  -- Cap reached by this claim (real firms only): close the remaining offers.
  select count(*) into v_claims
    from public.lead_offers o
    join public.lead_buyers b on b.id = o.buyer_id
   where o.lead_id = v_offer.lead_id and o.status = 'claimed' and not b.is_test;
  if v_claims >= p_cap then
    update public.lead_offers
       set status = 'lost'
     where lead_id = v_offer.lead_id and status = 'offered';
  end if;

  return query select 'claimed'::text, v_offer.price_gbp;
end;
$$;

-- Rollback:
--   drop function if exists public.claim_lead_offer(uuid, int, boolean, int);
--   create unique index if not exists lead_offers_one_claim
--     on public.lead_offers (lead_id) where status = 'claimed';
--   alter table public.lead_offers drop column if exists exclusive;
--   alter table public.lead_buyers drop column if exists is_test;
