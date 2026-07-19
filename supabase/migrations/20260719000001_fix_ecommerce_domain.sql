-- Migration: 20260719000001_fix_ecommerce_domain.sql
-- 20260715000001_add_tranche_3_to_sites.sql seeded the ecommerce row with the
-- working-title domain ecommercetaxpartners.co.uk; the confirmed live domain is
-- ecommercefinance.co.uk (per ecommerce/niche.config.json and
-- optimisation_engine/indexing/config.py). This corrects both columns.

UPDATE public.sites
SET
  domain          = 'www.ecommercefinance.co.uk',
  gsc_property_url = 'sc-domain:ecommercefinance.co.uk',
  updated_at      = now()
WHERE site_key = 'ecommerce';
