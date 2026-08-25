-- Migration: 20260723000001_add_ashfield_to_leads_and_sites.sql
-- New source/site key: ashfield (parent-brand site, Ashfield Trading Ltd).
-- Hand-authored following the spinup_site tranche pattern.
--
-- ROLLBACK / previous constraint definitions (repo-known as of generation;
-- RE-READ THE LIVE DEFS before applying, constraint contents have drifted
-- from repo files before):
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname IN ('leads_source_valid', 'sites_site_key_check');
--   leads_source_valid: dentists, property, medical, solicitors, generalist,
--     general, agency, agency-founder-finance, contractors-ir35,
--     construction-cis, test, charities, hospitality, crypto, pharmacies,
--     startups-tech, care, ecommerce (OR NULL)
--   sites_site_key_check: property, dentists, medical, solicitors, agency,
--     generalist, contractors-ir35, construction-cis, charities, hospitality,
--     crypto, pharmacies, startups-tech, care, ecommerce
--
-- Ashfield is the PARENT brand: commercial enquiries (rent a site / buy
-- leads / partnership), NOT client leads. Never partner-CC; notify routing
-- falls through to owner inbox (LEADS_NOTIFY_TO) which is correct.
-- HARDENING (env, not SQL): add 'ashfield' to LEADS_NOTIFY_CC_EXCLUDE_SOURCES
-- on the Property deployment before any CC is ever armed.
--
-- Row inserts active=false (stays out of console until domain-ready).
-- Strictly additive. Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (
    source IN (
      'dentists',
      'property',
      'medical',
      'solicitors',
      'generalist',
      'general',
      'agency',
      'agency-founder-finance',
      'contractors-ir35',
      'construction-cis',
      'test',
      'charities',
      'hospitality',
      'crypto',
      'pharmacies',
      'startups-tech',
      'care',
      'ecommerce',
      'ashfield'
    )
    OR source IS NULL
  );

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
      'construction-cis'::text,
      'charities'::text,
      'hospitality'::text,
      'crypto'::text,
      'pharmacies'::text,
      'startups-tech'::text,
      'care'::text,
      'ecommerce'::text,
      'ashfield'::text
    ])
  );

INSERT INTO sites (
  site_key, display_name, domain, gsc_property_url, bing_property_url,
  niche, target_buyer_persona, brand_voice_notes,
  content_dir, git_repo_path, blog_topics_table, active
) VALUES (
  'ashfield',
  'Ashfield Trading',
  'www.ashfieldtrading.co.uk',
  NULL,
  NULL,
  'Parent brand: rent-a-site and lead-purchase offers to UK accounting firms; investor-facing estate showcase',
  'UK accounting firm owners and partners considering renting a niche site or buying qualified leads; partners and investors',
  'light editorial premium; broadsheet register; UK English; no em-dashes; faceless authority; all projections labelled indicative',
  NULL,
  'ashfield/web',
  'blog_topics',
  false
)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname IN ('leads_source_valid', 'sites_site_key_check');
