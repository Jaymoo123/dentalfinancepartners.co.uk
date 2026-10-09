-- Applied state on 2026-10-09 evening: the two "enable row level security"
-- statements and a `calc_pdf_offer` enabled=false update were run from the
-- session through the Supabase connector. The four DROP statements were held
-- by a confirmation the connector could not surface, so they are still to be
-- run (Supabase SQL editor, this file verbatim). Until then the three PDF
-- objects and the empty tiktok_creatives table exist, all with RLS on.
--
-- 2026-10-09. Three owner rulings from the same message:
--   "everything to do with the paid pdf test should be removed, including in
--   the analytics dashboard"; "session events rls can be switched on";
--   "tiktok creatives is useless now".
--
-- 1. Paid workings PDF test (migration 20260914000001_calc_pdf_offer.sql): the
--    offer UI went on 2026-09-27 (6f20d7d0); the API routes, library, tests and
--    console panel go in the same change as this migration. The three objects
--    were used by nothing else. calc_pdf_requests held 2 rows, both the owner's
--    own test clicks (16 and 20 Sep 2026, no Stripe session, never fulfilled).
--    site_flags held only the calc_pdf_offer row (enabled: true since 14 Sep).
drop view  if exists public.vw_calc_pdf_test;
drop table if exists public.calc_pdf_requests;
drop table if exists public.site_flags;

-- 2. session_events: orphaned pre-2026-06-05 analytics table (rows from
--    2025-12-09 to 2026-08-06, nothing in the last 30 days, zero code
--    references, no functions, triggers or views touch it). It had full anon
--    grants and no row-level security, so the anon key could read all 16,857
--    rows. RLS with no policies means service role only.
alter table public.session_events enable row level security;

-- 3. tiktok_creatives: 0 rows, no migration ever created it, no code reads or
--    writes it, same open-to-anon exposure. Dropped. If it is ever wanted
--    back, the columns were: id integer, advertiser_id text, campaign_id text,
--    campaign_name text, adgroup_id text, adgroup_name text, ad_id text,
--    ad_name text, creative_id text, video_name text, thumbnail_url text,
--    status text, cost_total numeric, impressions integer, clicks integer,
--    last_synced_at timestamptz, created_at timestamptz.
drop table if exists public.tiktok_creatives;
