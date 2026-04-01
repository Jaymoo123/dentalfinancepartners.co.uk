-- ============================================================================
-- CRITICAL SECURITY FIX - APPLY THIS NOW
-- ============================================================================
-- Copy this entire file and paste into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql
-- ============================================================================

-- Drop all existing policies on leads table
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_read_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_manage_leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;

-- Anon can ONLY INSERT (for public contact forms)
CREATE POLICY "anon_can_only_insert_leads"
  ON leads FOR INSERT TO anon WITH CHECK (true);

-- Anon CANNOT SELECT (privacy protection)
CREATE POLICY "anon_cannot_select_leads"
  ON leads FOR SELECT TO anon USING (false);

-- Anon CANNOT UPDATE (security)
CREATE POLICY "anon_cannot_update_leads"
  ON leads FOR UPDATE TO anon USING (false) WITH CHECK (false);

-- Anon CANNOT DELETE (security)
CREATE POLICY "anon_cannot_delete_leads"
  ON leads FOR DELETE TO anon USING (false);

-- Authenticated users can read all leads
CREATE POLICY "authenticated_can_read_leads"
  ON leads FOR SELECT TO authenticated USING (true);

-- Authenticated users can update leads
CREATE POLICY "authenticated_can_update_leads"
  ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Authenticated users can delete leads
CREATE POLICY "authenticated_can_delete_leads"
  ON leads FOR DELETE TO authenticated USING (true);
