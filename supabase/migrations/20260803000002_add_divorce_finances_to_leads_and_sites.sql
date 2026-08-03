-- Add divorce-finances to leads_source_valid + sites_site_key_check + sites row.
--
-- WHY: Phase 6 for divorce-finances was approved on 2026-07-28 but no migration
-- was ever written. The first real lead from that site would be rejected by
-- leads_source_valid. Found 2026-08-03.
--
-- BEFORE APPLYING, RE-READ THE LIVE DEFINITIONS. The key lists below are the
-- union of every key known to the repo as at 2026-08-03, not a copy of the live
-- constraint. Because these ALTERs rebuild the whole list rather than appending
-- to it, applying a stale list silently REMOVES keys.
--
--   SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint
--   WHERE conname IN ('leads_source_valid', 'sites_site_key_check');
--
-- KNOWN ORDERING HAZARD, check this before you run anything: the wills-probate
-- migration (20260724000001) rebuilt leads_source_valid from a live definition
-- that did NOT yet contain 'ashfield', because the ashfield migration
-- (20260723000001) had not been applied at that point. Applying ashfield first
-- and wills-probate second therefore DROPS 'ashfield' from the allowed sources.
-- This file includes 'ashfield', so applying it last repairs that. Two
-- migrations also share the prefix 20260724000001, so do not rely on filename
-- ordering to sequence any of this.
--
-- Strictly additive relative to the union above: widens both allowed sets and
-- rejects nothing that the union already accepted. Run manually via the
-- Supabase SQL editor or the Management API.

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;
ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (source = ANY (ARRAY['dentists'::text,'property'::text,'medical'::text,
    'solicitors'::text,'generalist'::text,'general'::text,'agency'::text,
    'agency-founder-finance'::text,'contractors-ir35'::text,
    'construction-cis'::text,'test'::text,'charities'::text,
    'hospitality'::text,'crypto'::text,'pharmacies'::text,
    'startups-tech'::text,'care'::text,'ecommerce'::text,
    'wills-probate'::text,'ashfield'::text,
    'divorce-finances'::text]) OR source IS NULL);

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;
ALTER TABLE sites ADD CONSTRAINT sites_site_key_check
  CHECK (site_key = ANY (ARRAY['property'::text,'dentists'::text,
    'medical'::text,'solicitors'::text,'agency'::text,'generalist'::text,
    'contractors-ir35'::text,'construction-cis'::text,'charities'::text,
    'hospitality'::text,'crypto'::text,'pharmacies'::text,
    'startups-tech'::text,'care'::text,'ecommerce'::text,'ashfield'::text,
    'niche_screener'::text,'niche_screener_gen1'::text,
    'wills-probate'::text,'divorce-finances'::text]));

-- active = false: the site is still held at owner gate G1 (brand and domain
-- undecided), so it must not be picked up by any scheduled job yet.
INSERT INTO sites (site_key, display_name, domain, niche, content_dir,
  git_repo_path, blog_topics_table, active)
VALUES ('divorce-finances', 'Divorce Finances (placeholder)',
  'www.divorce-finances-placeholder.co.uk', 'divorce-financial-settlement',
  'divorce-finances/web/content/blog', 'divorce-finances/web', 'blog_topics',
  false)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;

-- ROLLBACK: re-run the two ALTERs with 'divorce-finances' removed from both
-- arrays, and DELETE FROM sites WHERE site_key = 'divorce-finances'. Do this
-- only if no divorce-finances lead rows exist, since the leads constraint is
-- validated against existing rows on creation.
