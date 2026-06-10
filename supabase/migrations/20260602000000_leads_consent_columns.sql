-- Mandatory data-sharing consent capture on the shared leads table.
--
-- Every lead form across all sites now requires the user to tick a consent
-- checkbox before the form can submit. We persist a small audit trail: the
-- boolean, the EXACT disclosure text the user agreed to (the firm name varies
-- per site, and the wording may change over time), and when they agreed.
--
-- All three columns are nullable / defaulted so that:
--   * existing rows (captured before this feature) remain valid, and
--   * any not-yet-redeployed form that omits these fields still inserts cleanly.
-- New form submissions always set consent_given = true with the text + timestamp.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_text  TEXT,
  ADD COLUMN IF NOT EXISTS consent_at    TIMESTAMPTZ;

-- Refresh PostgREST's schema cache so anon REST inserts can write the new
-- columns immediately (Supabase usually auto-reloads on DDL; this is belt-and-braces).
NOTIFY pgrst, 'reload schema';
