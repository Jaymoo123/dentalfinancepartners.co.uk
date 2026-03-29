-- ============================================================================
-- RLS POLICIES FOR ALL TABLES
-- ============================================================================
-- Migration: 003_add_rls_policies.sql
-- Date: 2026-03-29
-- Purpose: Enable Row Level Security and create policies for all tables
-- 
-- SECURITY MODEL:
-- - anon role: Public website visitors (can only insert leads)
-- - authenticated role: Reserved for future admin features
-- - service_role: Python agents and GitHub Actions (full access)
-- ============================================================================

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

-- Agent tables (should never be accessible to anon)
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE niche_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_rankings ENABLE ROW LEVEL SECURITY;

-- Content tables (agents need full access, anon needs limited read for website)
ALTER TABLE blog_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_topics_property ENABLE ROW LEVEL SECURITY;

-- Leads table (already has RLS enabled, but we'll add comprehensive policies)
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY; -- Already enabled

-- ============================================================================
-- LEADS TABLE POLICIES
-- ============================================================================

-- Drop existing policies to recreate them comprehensively
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;

-- Anon can only INSERT leads (public form submissions)
CREATE POLICY "anon_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users can read all leads (for future admin dashboard)
CREATE POLICY "authenticated_read_leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update/delete leads (for future admin features)
CREATE POLICY "authenticated_manage_leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Service role bypasses RLS (agents can do everything)
-- No explicit policy needed - service_role bypasses RLS by default

-- ============================================================================
-- BLOG TOPICS TABLES POLICIES
-- ============================================================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow anon read" ON blog_topics;
DROP POLICY IF EXISTS "Allow anon update blog_topics" ON blog_topics;
DROP POLICY IF EXISTS "Allow authenticated full access" ON blog_topics;

-- Anon can only SELECT (for potential future public topic browsing)
CREATE POLICY "anon_read_blog_topics"
  ON blog_topics
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can read all topics
CREATE POLICY "authenticated_read_blog_topics"
  ON blog_topics
  FOR SELECT
  TO authenticated
  USING (true);

-- Same for blog_topics_property
CREATE POLICY "anon_read_blog_topics_property"
  ON blog_topics_property
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "authenticated_read_blog_topics_property"
  ON blog_topics_property
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- AGENT TABLES POLICIES (DENY ALL TO ANON)
-- ============================================================================

-- Agent executions: No anon access
CREATE POLICY "deny_anon_agent_executions"
  ON agent_executions
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "authenticated_read_agent_executions"
  ON agent_executions
  FOR SELECT
  TO authenticated
  USING (true);

-- Agent costs: No anon access
CREATE POLICY "deny_anon_agent_costs"
  ON agent_costs
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "authenticated_read_agent_costs"
  ON agent_costs
  FOR SELECT
  TO authenticated
  USING (true);

-- Published content: No anon access
CREATE POLICY "deny_anon_published_content"
  ON published_content
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "authenticated_read_published_content"
  ON published_content
  FOR SELECT
  TO authenticated
  USING (true);

-- Niche metrics: No anon access
CREATE POLICY "deny_anon_niche_metrics"
  ON niche_metrics
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "authenticated_read_niche_metrics"
  ON niche_metrics
  FOR SELECT
  TO authenticated
  USING (true);

-- SEO rankings: No anon access
CREATE POLICY "deny_anon_seo_rankings"
  ON seo_rankings
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "authenticated_read_seo_rankings"
  ON seo_rankings
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these after applying migration to verify:

-- Check RLS is enabled on all tables
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename;

-- Check all policies
-- SELECT schemaname, tablename, policyname, roles, cmd 
-- FROM pg_policies 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename, policyname;

-- ============================================================================
-- NOTES
-- ============================================================================

-- 1. Service role key bypasses RLS entirely - use only in trusted environments
-- 2. Anon key can only:
--    - INSERT into leads (public form submissions)
--    - SELECT from blog_topics* (for future features)
-- 3. Anon CANNOT access agent tables, costs, or metrics
-- 4. Authenticated role is for future admin dashboard
-- 5. All agent automation uses service_role key (GitHub Actions secrets)

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================

-- To disable RLS on a table:
-- ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

-- To drop all policies:
-- DROP POLICY IF EXISTS policy_name ON table_name;
