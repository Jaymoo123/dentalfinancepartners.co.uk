-- ============================================================================
-- Migration: 20260605000002_add_visitor_id_to_leads.sql
-- Date: 2026-06-05
-- Purpose: Stitch each lead back to its full pre-conversion behaviour journey.
--
-- Adds the anonymous first-party analytics ids onto the shared leads table so a
-- lead row can be joined to web_sessions / web_events by visitor_id. Without
-- this, the per-person "entire story" cannot connect the named lead to the
-- anonymous journey that produced it.
--
-- BOTH columns are NULLABLE and additive. This is required before the web app
-- starts sending visitor_id/session_id: submitLead() POSTs the whole payload to
-- PostgREST, which 400s on an unknown column -- which would DROP the lead. So
-- this migration MUST be applied (and PostgREST schema reloaded) BEFORE the
-- corresponding web change ships. Sites that don't send the fields are
-- unaffected (the columns simply stay NULL).
-- ============================================================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS visitor_id TEXT,
  ADD COLUMN IF NOT EXISTS session_id TEXT;

COMMENT ON COLUMN leads.visitor_id IS
  'First-party anonymous visitor id (web_sessions.visitor_id). Joins the lead to its behaviour journey. NULL for leads captured before this feature or from sites without tracking.';
COMMENT ON COLUMN leads.session_id IS
  'First-party session id (web_sessions.session_id) of the converting session.';

CREATE INDEX IF NOT EXISTS idx_leads_visitor_id ON leads(visitor_id) WHERE visitor_id IS NOT NULL;

-- Refresh PostgREST's schema cache so anon REST inserts can write the new
-- columns immediately.
NOTIFY pgrst, 'reload schema';
