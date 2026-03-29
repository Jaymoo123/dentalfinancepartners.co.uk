-- ============================================================================
-- CORE TABLES SCHEMA
-- ============================================================================
-- Migration: 000_create_core_tables.sql
-- Date: 2026-03-29
-- Purpose: Document and create core tables (leads, blog_topics, blog_topics_property)
--          This migration captures the existing schema for version control
-- 
-- NOTE: These tables may already exist in your Supabase project.
--       Use CREATE TABLE IF NOT EXISTS to safely apply this migration.
-- ============================================================================

-- ============================================================================
-- LEADS TABLE
-- ============================================================================
-- Stores lead submissions from both Dentists and Property websites

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  
  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Lead details
  role TEXT NOT NULL,
  practice_name TEXT,
  message TEXT,
  
  -- Attribution
  source TEXT,  -- 'dentists' or 'property'
  source_url TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'new'
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Add constraints
ALTER TABLE leads ADD CONSTRAINT IF NOT EXISTS leads_email_format 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE leads ADD CONSTRAINT IF NOT EXISTS leads_source_valid 
  CHECK (source IN ('dentists', 'property') OR source IS NULL);

ALTER TABLE leads ADD CONSTRAINT IF NOT EXISTS leads_status_valid 
  CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed'));

-- ============================================================================
-- BLOG_TOPICS TABLE (Dentists)
-- ============================================================================
-- Stores content topics for Dentists niche

CREATE TABLE IF NOT EXISTS blog_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Topic information
  topic TEXT NOT NULL,
  category TEXT,
  priority INTEGER DEFAULT 0,
  
  -- Keywords (legacy structure - individual columns)
  secondary_keyword_1 TEXT,
  secondary_keyword_2 TEXT,
  secondary_keyword_3 TEXT,
  secondary_keyword_4 TEXT,
  secondary_keyword_5 TEXT,
  secondary_keyword_6 TEXT,
  secondary_keyword_7 TEXT,
  secondary_keyword_8 TEXT,
  secondary_keyword_9 TEXT,
  secondary_keyword_10 TEXT,
  
  -- Usage tracking
  used BOOLEAN DEFAULT false,
  generated_slug TEXT,
  generated_at TIMESTAMPTZ,
  notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_topics_used ON blog_topics(used);
CREATE INDEX IF NOT EXISTS idx_blog_topics_category ON blog_topics(category);
CREATE INDEX IF NOT EXISTS idx_blog_topics_priority ON blog_topics(priority DESC);
CREATE INDEX IF NOT EXISTS idx_blog_topics_created_at ON blog_topics(created_at DESC);

-- Unique constraint on topic
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_topics_topic_unique ON blog_topics(topic);

-- ============================================================================
-- BLOG_TOPICS_PROPERTY TABLE (Property)
-- ============================================================================
-- Stores content topics for Property niche

CREATE TABLE IF NOT EXISTS blog_topics_property (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT now(),
  
  -- Topic information
  topic TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  
  -- SEO metadata
  search_volume TEXT,
  competition TEXT,
  primary_keyword TEXT,
  secondary_keywords TEXT[],  -- Array format (different from blog_topics)
  content_branch TEXT,
  
  -- Usage tracking
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_topics_property_used ON blog_topics_property(used);
CREATE INDEX IF NOT EXISTS idx_blog_topics_property_category ON blog_topics_property(category);
CREATE INDEX IF NOT EXISTS idx_blog_topics_property_created_at ON blog_topics_property(created_at DESC);

-- Unique constraint on topic
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_topics_property_topic_unique ON blog_topics_property(topic);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE leads IS 'Lead submissions from Dentists and Property websites';
COMMENT ON COLUMN leads.source IS 'Identifies which niche the lead came from: dentists or property';
COMMENT ON COLUMN leads.source_url IS 'The URL where the form was submitted';
COMMENT ON COLUMN leads.practice_name IS 'For Dentists: practice name; For Property: set to "—"';

COMMENT ON TABLE blog_topics IS 'Content topics for Dentists niche (legacy column structure)';
COMMENT ON COLUMN blog_topics.used IS 'Whether this topic has been used to generate content';
COMMENT ON COLUMN blog_topics.generated_slug IS 'The slug of the generated blog post';

COMMENT ON TABLE blog_topics_property IS 'Content topics for Property niche (array-based keywords)';
COMMENT ON COLUMN blog_topics_property.secondary_keywords IS 'Array of secondary keywords (different structure from blog_topics)';
COMMENT ON COLUMN blog_topics_property.used_at IS 'Timestamp when topic was used for content generation';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check tables exist:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('leads', 'blog_topics', 'blog_topics_property');

-- Check indexes:
-- SELECT tablename, indexname FROM pg_indexes 
-- WHERE schemaname = 'public' 
-- AND tablename IN ('leads', 'blog_topics', 'blog_topics_property');

-- ============================================================================
-- NOTES
-- ============================================================================

-- 1. blog_topics uses individual columns for keywords (secondary_keyword_1..10)
-- 2. blog_topics_property uses TEXT[] array for secondary_keywords
-- 3. Both approaches work; inconsistency is historical
-- 4. leads.source distinguishes between niches in shared table
-- 5. RLS policies are defined in migration 003_add_rls_policies.sql
