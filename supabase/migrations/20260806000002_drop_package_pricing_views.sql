-- Drop the self-serve packages experiment (pkg_pricing_v1) reporting views.
-- The experiment was reverted on 2026-08-06: the /pricing pages and every
-- packages surface were removed estate-wide because offering the service
-- directly conflicts with selling the lead flow to accounting firms.
--
-- Data is NOT touched. Underlying leads rows keep their
-- extras.form_id = 'package_signup' / extras.package_id values, and web_events
-- history stays intact, so the experiment can be re-analysed later if needed.
-- Only the derived views go.

DROP VIEW IF EXISTS public.vw_pricing_engagement;
DROP VIEW IF EXISTS public.vw_package_funnel;
