-- ============================================================================
-- SOLICITORS NICHE - SUPABASE SETUP
-- ============================================================================
-- Copy this entire file and paste into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql
-- ============================================================================

-- ============================================================================
-- STEP 1: Create blog_topics_solicitors table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.blog_topics_solicitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Topic details
    keyword TEXT NOT NULL,
    category TEXT NOT NULL,
    search_volume INTEGER,
    difficulty INTEGER,
    intent TEXT,
    
    -- Publishing status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'published', 'skipped')),
    published_at TIMESTAMP WITH TIME ZONE,
    slug TEXT UNIQUE,
    
    -- Metadata
    notes TEXT,
    priority INTEGER DEFAULT 50,
    
    -- Indexes
    CONSTRAINT blog_topics_solicitors_keyword_unique UNIQUE (keyword)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS blog_topics_solicitors_status_idx ON public.blog_topics_solicitors(status);
CREATE INDEX IF NOT EXISTS blog_topics_solicitors_category_idx ON public.blog_topics_solicitors(category);
CREATE INDEX IF NOT EXISTS blog_topics_solicitors_priority_idx ON public.blog_topics_solicitors(priority DESC);
CREATE INDEX IF NOT EXISTS blog_topics_solicitors_published_at_idx ON public.blog_topics_solicitors(published_at DESC);

-- Enable RLS
ALTER TABLE public.blog_topics_solicitors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (read-only for anon, full access for authenticated)
CREATE POLICY "Enable read access for all users" ON public.blog_topics_solicitors
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.blog_topics_solicitors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.blog_topics_solicitors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Add comment
COMMENT ON TABLE public.blog_topics_solicitors IS 'Blog topic tree for solicitors niche - SEO-driven content pipeline';

-- ============================================================================
-- STEP 2: Update leads table to accept 'solicitors' source
-- ============================================================================

-- Drop existing constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

-- Add new constraint with solicitors
ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (source IN ('dentists', 'property', 'medical', 'solicitors') OR source IS NULL);

-- Update comment
COMMENT ON COLUMN leads.source IS 'Identifies which niche the lead came from: dentists, property, medical, or solicitors';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify blog_topics_solicitors table exists
SELECT 
    table_name, 
    (SELECT COUNT(*) FROM blog_topics_solicitors) as row_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_topics_solicitors';

-- Verify leads constraint includes solicitors
SELECT 
    conname, 
    pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'leads_source_valid';

-- ============================================================================
-- SUCCESS!
-- ============================================================================
-- After running this, you can:
-- 1. Import keywords: python scripts/import_solicitors_topics.py
-- 2. Generate posts: python scripts/batch_generate_solicitors.py --count 60
-- ============================================================================
