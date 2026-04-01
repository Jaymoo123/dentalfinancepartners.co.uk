-- Create blog topics table for solicitors niche
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
