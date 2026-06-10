-- ============================================================================
-- Migration: 20260609000002_landlord_tax_index.sql
-- Date: 2026-06-09
-- Purpose: Historical store for the "UK Landlord Tax Index" research asset.
--
-- Two public, non-PII aggregate time series behind the Property site's data-PR
-- page (/research/landlord-tax-index):
--
--   public.landlord_incorporations -- monthly Companies House incorporation
--     counts by real-estate SIC code, plus the deduplicated union ("all property
--     companies"). Gross counts (dissolved companies remain on the register).
--
--   public.housing_market_series   -- monthly HM Land Registry UK House Price
--     Index average price + annual change, by nation / region.
--
-- Populated by optimisation_engine.ingestion.ingest_landlord_data. The web page
-- itself reads a committed JSON snapshot (Property/web/src/data/
-- landlord-tax-index.json) at build time; this table is the durable history /
-- audit trail and powers any future dashboard panel.
--
-- No RLS: these are public aggregate statistics with no personal data, written
-- by the ingestion engine with SUPABASE_KEY (same pattern as ga4_page_data).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- landlord_incorporations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.landlord_incorporations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month       TEXT    NOT NULL,                 -- 'YYYY-MM'
  sic_code    TEXT    NOT NULL,                 -- '68100' | '68201' | '68209' | '68320' | 'union'
  sic_label   TEXT    NOT NULL,
  count       INTEGER NOT NULL,                 -- gross incorporations in that month
  is_union    BOOLEAN NOT NULL DEFAULT false,   -- true for the deduplicated all-codes total
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT landlord_incorporations_unique UNIQUE (month, sic_code)
);

COMMENT ON TABLE public.landlord_incorporations IS
  'Monthly Companies House incorporation counts by real-estate SIC code (+ deduplicated union). Gross counts incl. since-dissolved. Source: Companies House Advanced Search API. Populated by optimisation_engine.ingestion.ingest_landlord_data.';
COMMENT ON COLUMN public.landlord_incorporations.sic_code IS
  '68100/68201/68209/68320, or the literal ''union'' for the deduplicated count across all four codes.';

CREATE INDEX IF NOT EXISTS landlord_incorporations_month_idx
  ON public.landlord_incorporations (month);
CREATE INDEX IF NOT EXISTS landlord_incorporations_sic_idx
  ON public.landlord_incorporations (sic_code, month);

-- ----------------------------------------------------------------------------
-- housing_market_series
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.housing_market_series (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month       TEXT    NOT NULL,                 -- 'YYYY-MM'
  region      TEXT    NOT NULL,                 -- 'United Kingdom' | 'England' | 'London' | ...
  metric      TEXT    NOT NULL,                 -- 'avg_price' | 'annual_change_pct'
  value       NUMERIC NOT NULL,
  source      TEXT    NOT NULL,                 -- 'uk_hpi'
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT housing_market_series_unique UNIQUE (month, region, metric)
);

COMMENT ON TABLE public.housing_market_series IS
  'Monthly UK House Price Index average price + annual change by nation/region. Source: HM Land Registry / ONS UK HPI (open CSV). Populated by optimisation_engine.ingestion.ingest_landlord_data.';

CREATE INDEX IF NOT EXISTS housing_market_series_month_idx
  ON public.housing_market_series (month);
CREATE INDEX IF NOT EXISTS housing_market_series_region_metric_idx
  ON public.housing_market_series (region, metric, month);
