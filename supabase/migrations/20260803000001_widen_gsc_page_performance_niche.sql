-- Migration: 20260803000001_widen_gsc_page_performance_niche.sql
-- Widen gsc_page_performance.niche to cover every site with a GSC property.
--
-- WHY: the CHECK still listed only the six original niches, so every page-level
-- upsert for the nine newer sites failed with a 400 and gsc_page_client swallowed
-- the error and reported "upserted 0 rows". Since aggregate metrics must come from
-- gsc_page_performance and never from gsc_query_data (which undercounts ~20x),
-- those nine sites read as zero-traffic to every detector. Query-level ingestion
-- was unaffected, which is why this went unnoticed.
--
-- ROLLBACK / previous constraint definition (live def read 2026-08-03):
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conrelid = 'gsc_page_performance'::regclass;
--   gsc_page_performance_niche_check:
--     CHECK ((niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text,
--                                'solicitors'::text, 'agency'::text, 'generalist'::text])))
--
-- Strictly additive: widens the allowed set, rejects nothing that was previously
-- accepted, touches no rows (39,146 existing rows across 6 niches all still pass).
-- Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE gsc_page_performance DROP CONSTRAINT IF EXISTS gsc_page_performance_niche_check;

ALTER TABLE gsc_page_performance ADD CONSTRAINT gsc_page_performance_niche_check
  CHECK (
    niche IN (
      -- original six
      'property',
      'dentists',
      'medical',
      'solicitors',
      'agency',
      'generalist',
      -- live sites that were being rejected
      'construction-cis',
      'contractors-ir35',
      'crypto',
      'care',
      'charities',
      'ecommerce',
      'hospitality',
      'pharmacies',
      'startups-tech',
      -- built, not yet launched; included so this does not break again at launch
      'wills-probate',
      'divorce-finances'
    )
  );

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'gsc_page_performance_niche_check';
