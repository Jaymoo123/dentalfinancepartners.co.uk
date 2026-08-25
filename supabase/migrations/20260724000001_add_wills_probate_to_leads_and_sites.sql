-- Add wills-probate to leads_source_valid + sites_site_key_check + sites row.
-- Key lists rebuilt from LIVE constraint definitions read 2026-07-24
-- (pg_get_constraintdef; note: leads list has no 'ashfield'; sites list
-- includes niche_screener/niche_screener_gen1 — preserve them).
-- Parallel divorce-finances build: re-read live defs again before applying any
-- later tranche.

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;
ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (source = ANY (ARRAY['dentists'::text,'property'::text,'medical'::text,
    'solicitors'::text,'generalist'::text,'general'::text,'agency'::text,
    'agency-founder-finance'::text,'contractors-ir35'::text,
    'construction-cis'::text,'test'::text,'charities'::text,
    'hospitality'::text,'crypto'::text,'pharmacies'::text,
    'startups-tech'::text,'care'::text,'ecommerce'::text,
    'wills-probate'::text]) OR source IS NULL);

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;
ALTER TABLE sites ADD CONSTRAINT sites_site_key_check
  CHECK (site_key = ANY (ARRAY['property'::text,'dentists'::text,
    'medical'::text,'solicitors'::text,'agency'::text,'generalist'::text,
    'contractors-ir35'::text,'construction-cis'::text,'charities'::text,
    'hospitality'::text,'crypto'::text,'pharmacies'::text,
    'startups-tech'::text,'care'::text,'ecommerce'::text,'ashfield'::text,
    'niche_screener'::text,'niche_screener_gen1'::text,
    'wills-probate'::text]));

INSERT INTO sites (site_key, display_name, domain, niche, content_dir,
  git_repo_path, blog_topics_table, active)
VALUES ('wills-probate', 'Probate Compass (placeholder)',
  'www.probate-compass-placeholder.co.uk', 'wills-probate-estate-planning',
  'wills-probate/web/content/blog', 'wills-probate/web', 'blog_topics', false)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;
