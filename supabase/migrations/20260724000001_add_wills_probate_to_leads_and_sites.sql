-- Add wills-probate to leads_source_valid + sites_site_key_check + sites row.
-- DRAFT: do NOT apply until Phase 6 (owner-gated). Before applying, RE-READ the
-- live constraint definitions and rebuild the full key lists from them — they
-- drift (and a parallel divorce-finances build may add keys concurrently):
--   SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint
--   WHERE conname IN ('leads_source_valid','sites_site_key_check');

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;
ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (source IN (
    'property','dentists','medical','solicitors','agency','generalist',
    'contractors-ir35','construction-cis','charities','hospitality','crypto',
    'pharmacies','startups-tech','care','ecommerce','ashfield',
    'general','agency-founder-finance','test',
    'wills-probate'
  ) OR source IS NULL);

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;
ALTER TABLE sites ADD CONSTRAINT sites_site_key_check
  CHECK (site_key = ANY (ARRAY[
    'property'::text,'dentists'::text,'medical'::text,'solicitors'::text,
    'agency'::text,'generalist'::text,'contractors-ir35'::text,
    'construction-cis'::text,'charities'::text,'hospitality'::text,
    'crypto'::text,'pharmacies'::text,'startups-tech'::text,'care'::text,
    'ecommerce'::text,'ashfield'::text,'wills-probate'::text
  ]));

INSERT INTO sites (site_key, display_name, domain, niche, content_dir,
  git_repo_path, blog_topics_table, active)
VALUES ('wills-probate', 'Probate Compass (placeholder)',
  'www.probate-compass-placeholder.co.uk', 'wills-probate-estate-planning',
  'wills-probate/web/content/blog', 'wills-probate/web', 'blog_topics', false)
ON CONFLICT (site_key) DO NOTHING;

COMMIT;
