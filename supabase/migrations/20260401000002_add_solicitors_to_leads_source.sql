-- ============================================================================
-- ADD SOLICITORS TO LEADS SOURCE CONSTRAINT
-- ============================================================================
-- Migration: 20260401000002_add_solicitors_to_leads_source.sql
-- Date: 2026-04-01
-- Purpose: Update leads table source constraint to include 'solicitors' niche
-- ============================================================================

-- Drop the old constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

-- Add the new constraint with 'solicitors' included
ALTER TABLE leads ADD CONSTRAINT leads_source_valid 
  CHECK (source IN ('dentists', 'property', 'medical', 'solicitors') OR source IS NULL);

-- Update the table comment
COMMENT ON COLUMN leads.source IS 'Identifies which niche the lead came from: dentists, property, medical, or solicitors';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check constraint exists:
-- SELECT conname, pg_get_constraintdef(oid) 
-- FROM pg_constraint 
-- WHERE conname = 'leads_source_valid';

-- Expected output:
-- leads_source_valid | CHECK (source IN ('dentists', 'property', 'medical', 'solicitors') OR source IS NULL)
