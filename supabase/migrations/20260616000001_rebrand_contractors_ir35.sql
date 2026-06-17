-- Migration: 20260616000001_rebrand_contractors_ir35.sql
-- Date: 2026-06-16
-- Purpose: Rebrand the contractors-ir35 site registry row from the placeholder
--          "Contractor Finance Partners" / contractor-finance-partners.co.uk to
--          the live brand "Contractor Tax Accountants" on the purchased
--          exact-match domain contractortaxaccountants.co.uk. site_key is frozen
--          ('contractors-ir35') and unchanged; this only updates display strings
--          + the GSC property URL so estate-console shows the live brand and the
--          GSC/analytics joins use the correct property.
--
-- Strictly an UPDATE of display columns. No CHECK / FK / data changes.
-- NOTE: Run manually via Supabase SQL (Management API).

BEGIN;

UPDATE sites
SET display_name     = 'Contractor Tax Accountants',
    domain           = 'www.contractortaxaccountants.co.uk',
    gsc_property_url  = 'sc-domain:contractortaxaccountants.co.uk',
    updated_at       = now()
WHERE site_key = 'contractors-ir35';

COMMIT;

-- Verify after applying:
--   SELECT site_key, display_name, domain, gsc_property_url, active
--   FROM sites WHERE site_key = 'contractors-ir35';
