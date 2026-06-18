-- Migration: 20260614000001_add_construction_cis_to_sites.sql
-- Date: 2026-06-12
-- Purpose: Register the 8th site key 'construction-cis' (Build Finance
--          Partners) in the sites registry: extend the site_key CHECK and
--          INSERT the registry row. Must be applied BEFORE blog_topics
--          seeding (FK), web_sessions ingest (FK), and leads carrying the
--          source (docs/_engines/SITE_SPINUP.md Step 1).
--
-- DRAFTED LOCAL-FIRST 2026-06-12: the live pg_constraint read was not
-- performed at draft time (prod access gated). Expected live def, per the
-- applied 20260613000001 migration:
--   sites_site_key_check: CHECK ((site_key = ANY (ARRAY['property','dentists',
--     'medical','solicitors','agency','generalist','contractors-ir35'])))
-- AT APPLY TIME: re-read the live constraint def first and reconcile:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname LIKE '%site_key%';
--
-- Strictly additive. NOTE: Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;

ALTER TABLE sites ADD CONSTRAINT sites_site_key_check
  CHECK (
    site_key = ANY (ARRAY[
      'property'::text,
      'dentists'::text,
      'medical'::text,
      'solicitors'::text,
      'agency'::text,
      'generalist'::text,
      'contractors-ir35'::text,
      'construction-cis'::text
    ])
  );

INSERT INTO sites (
  site_key, display_name, domain, gsc_property_url, bing_property_url,
  niche, target_buyer_persona, brand_voice_notes,
  content_dir, git_repo_path, blog_topics_table, active
) VALUES (
  'construction-cis',
  'Trade Tax Specialists',
  'www.tradetaxspecialists.co.uk',
  'sc-domain:tradetaxspecialists.co.uk',
  NULL,
  'UK construction / CIS specialist accountancy (subcontractors, limited company directors, main contractors)',
  'CIS-registered sole trader subcontractors (plumbers, electricians, joiners, groundworkers, roofers, builders, gas engineers, painters and decorators, scaffolders, civil engineers), construction limited company directors, and main contractors filing CIS300 returns',
  'CIS-specialist, construction-trade-literate; refund hook (average subcontractor owed ~£2,000) as entry point, ongoing advisory relationship as the brand; plain-English authority, no hype; UK English; no em-dashes',
  'construction-cis/web/content/blog',
  'construction-cis/web',
  'blog_topics',
  true
)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'sites_site_key_check';
--   SELECT site_key, display_name, domain, active FROM sites
--   WHERE site_key = 'construction-cis';
