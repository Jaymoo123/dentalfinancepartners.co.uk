-- ============================================================================
-- FIX LEADS TABLE RLS POLICIES
-- ============================================================================
-- Migration: 20260331000002_fix_leads_rls_policies.sql
-- Date: 2026-03-31
-- Purpose: Restrict anon role to INSERT only (no read/update/delete)
-- ============================================================================

-- Drop all existing policies on leads table
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_read_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_manage_leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;

-- ============================================================================
-- NEW POLICIES - SECURE
-- ============================================================================

-- 1. Anon can ONLY INSERT (for public contact forms)
CREATE POLICY "anon_can_only_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 2. Anon CANNOT SELECT (privacy protection)
CREATE POLICY "anon_cannot_select_leads"
  ON leads
  FOR SELECT
  TO anon
  USING (false);

-- 3. Anon CANNOT UPDATE (security)
CREATE POLICY "anon_cannot_update_leads"
  ON leads
  FOR UPDATE
  TO anon
  USING (false)
  WITH CHECK (false);

-- 4. Anon CANNOT DELETE (security)
CREATE POLICY "anon_cannot_delete_leads"
  ON leads
  FOR DELETE
  TO anon
  USING (false);

-- 5. Authenticated users can read all leads (future admin dashboard)
CREATE POLICY "authenticated_can_read_leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Authenticated users can update leads (future admin features)
CREATE POLICY "authenticated_can_update_leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Authenticated users can delete leads (future admin features)
CREATE POLICY "authenticated_can_delete_leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Service role bypasses RLS entirely (Python agents, GitHub Actions)
-- No explicit policy needed

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check all policies on leads table:
-- SELECT policyname, cmd, roles, qual, with_check 
-- FROM pg_policies 
-- WHERE tablename = 'leads';

-- Expected policies:
-- anon_can_only_insert_leads      | INSERT | {anon}          | NULL  | true
-- anon_cannot_select_leads        | SELECT | {anon}          | false | NULL
-- anon_cannot_update_leads        | UPDATE | {anon}          | false | false
-- anon_cannot_delete_leads        | DELETE | {anon}          | false | NULL
-- authenticated_can_read_leads    | SELECT | {authenticated} | true  | NULL
-- authenticated_can_update_leads  | UPDATE | {authenticated} | true  | true
-- authenticated_can_delete_leads  | DELETE | {authenticated} | true  | NULL

-- Test anon permissions:
-- SET ROLE anon;
-- SELECT * FROM leads LIMIT 1;  -- Should return 0 rows
-- INSERT INTO leads (full_name, email, phone, role, source) VALUES ('Test', 'test@example.com', '1234567890', 'Test', 'test');  -- Should succeed
-- UPDATE leads SET full_name = 'Updated' WHERE email = 'test@example.com';  -- Should fail
-- DELETE FROM leads WHERE email = 'test@example.com';  -- Should fail
-- RESET ROLE;
