-- ============================================================================
-- Register niche_screener research site_keys
-- ============================================================================
-- Date: 2026-07-24
-- Purpose: api_cost_log.site_key has an FK to sites, and sites_site_key_check
--          is an allowlist (re-added 20260723000001). The niche screener v2
--          research tool logs API spend under its own keys so research cost
--          never pollutes per-site attribution. These are NOT sites: active
--          is false and they carry no GSC/content wiring.
-- ROLLBACK: DELETE FROM sites WHERE site_key IN ('niche_screener','niche_screener_gen1');
--           then re-add the previous constraint without the two keys.
-- ============================================================================

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
      'ashfield'::text,
      'niche_screener'::text,
      'niche_screener_gen1'::text
    ])
  );

INSERT INTO sites (site_key, display_name, domain, niche, active)
VALUES
  ('niche_screener', 'Niche Screener v2 (research tool)', 'internal.niche-screener', 'research', false),
  ('niche_screener_gen1', 'Niche Screener discovery generator 1', 'internal.niche-screener-gen1', 'research', false)
ON CONFLICT (site_key) DO NOTHING;
