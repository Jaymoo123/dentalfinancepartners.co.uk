-- Migration: 20260613000001_add_contractors_ir35_to_sites.sql
-- Date: 2026-06-12
-- Purpose: Register the 7th site key 'contractors-ir35' (Contractor Finance
--          Partners) in the sites registry: extend the site_key CHECK and
--          INSERT the registry row. This is step 2 of the documented launch
--          path (docs/_engines/STANDARDISATION_PROGRAM.md): the site key must
--          exist in the LIVE registry before blog_topics seeding (FK), before
--          web_sessions ingest (FK), and before leads carry the source.
--
-- Live constraint def read 2026-06-12 (pg_constraint, prod):
--   sites_site_key_check: CHECK ((site_key = ANY (ARRAY['property','dentists',
--     'medical','solicitors','agency','generalist'])))
--
-- blog_topics_table is 'blog_topics' (the unified post-Phase-4 table); legacy
-- per-site names on older rows are historical column values only.
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
      'contractors-ir35'::text
    ])
  );

INSERT INTO sites (
  site_key, display_name, domain, gsc_property_url, bing_property_url,
  niche, target_buyer_persona, brand_voice_notes,
  content_dir, git_repo_path, blog_topics_table, active
) VALUES (
  'contractors-ir35',
  'Contractor Finance Partners',
  'www.contractor-finance-partners.co.uk',
  'sc-domain:contractor-finance-partners.co.uk',
  NULL,
  'UK contractors and PSC directors (IR35 / off-payroll specialist accountancy)',
  'UK contractors operating through personal service companies or umbrellas: IT, engineering, finance, consulting, locum and project professionals affected by IR35 and off-payroll working rules',
  'IR35-specialist, off-payroll-literate, PSC-director-savvy; plain-English authority, no hype; UK English; no em-dashes',
  'contractors-ir35/web/content/blog',
  'contractors-ir35/web',
  'blog_topics',
  true
)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'sites_site_key_check';
--   SELECT site_key, display_name, domain, active FROM sites
--   WHERE site_key = 'contractors-ir35';
