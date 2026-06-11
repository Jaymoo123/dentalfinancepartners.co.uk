-- Migration: 20260611000003_leads_extras_jsonb.sql
-- GAP-4 (Phase C): LD-06 — site-specific lead fields ride a single JSONB
-- extras column on the shared leads table, populated through the shared
-- submit contract (LeadSubmission.extras, optional, omit-not-null).
-- Nullable, no default, no backfill: metadata-only change, additive in both
-- directions (old payloads without the key remain valid forever).

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS extras JSONB;

COMMENT ON COLUMN public.leads.extras IS
  'Niche/form-specific qualifiers from LeadSubmission.extras (LD-06). Nullable; absent for leads submitted without extras. Sites must not add their own columns to this table.';

NOTIFY pgrst, 'reload schema';
