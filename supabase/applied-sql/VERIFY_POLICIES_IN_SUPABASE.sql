-- ============================================================================
-- VERIFY RLS POLICIES ON LEADS TABLE
-- ============================================================================
-- Copy this and run in Supabase SQL Editor to see current policies
-- ============================================================================

-- Check if RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'leads';

-- Show all current policies
SELECT 
  policyname,
  cmd,
  roles::text[] as applies_to_roles,
  CASE 
    WHEN qual IS NOT NULL THEN pg_get_expr(qual, 'leads'::regclass)
    ELSE 'NULL'
  END as using_clause,
  CASE 
    WHEN with_check IS NOT NULL THEN pg_get_expr(with_check, 'leads'::regclass)
    ELSE 'NULL'
  END as with_check_clause
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY policyname;

-- ============================================================================
-- EXPECTED RESULTS AFTER FIX
-- ============================================================================
-- You should see 7 policies:
--
-- 1. anon_can_only_insert_leads      | INSERT | {anon}          | NULL  | true
-- 2. anon_cannot_select_leads        | SELECT | {anon}          | false | NULL
-- 3. anon_cannot_update_leads        | UPDATE | {anon}          | false | false
-- 4. anon_cannot_delete_leads        | DELETE | {anon}          | false | NULL
-- 5. authenticated_can_read_leads    | SELECT | {authenticated} | true  | NULL
-- 6. authenticated_can_update_leads  | UPDATE | {authenticated} | true  | true
-- 7. authenticated_can_delete_leads  | DELETE | {authenticated} | true  | NULL
