-- Create blog_topics_generalist table for the generalist UK accountancy niche.
-- Schema mirrors blog_topics_agency (which mirrors blog_topics_property),
-- including suggested_slug and content_branch for parity with the pipeline.

CREATE TABLE IF NOT EXISTS public.blog_topics_generalist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,

    -- Topic identity
    topic TEXT NOT NULL,
    category TEXT NOT NULL,

    -- Priority / sorting
    priority TEXT,
    publish_priority INTEGER CHECK (publish_priority BETWEEN 1 AND 10),
    pillar_topic TEXT,

    -- Keyword data
    primary_keyword TEXT,
    secondary_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    keyword_difficulty INTEGER,
    target_search_volume INTEGER,
    search_volume INTEGER,
    competition NUMERIC,
    keyword_source TEXT,

    -- Intent / classification
    user_intent TEXT CHECK (user_intent IN ('informational', 'transactional', 'navigational')),
    content_tier TEXT CHECK (content_tier IN ('pillar', 'cluster', 'supporting')),
    content_branch TEXT,

    -- Editorial helpers
    suggested_slug TEXT,
    notes TEXT,

    -- Publishing state
    used BOOLEAN DEFAULT FALSE NOT NULL,
    slug TEXT,

    -- GSC tracking
    last_optimized_at TIMESTAMP WITH TIME ZONE,
    optimization_count INTEGER DEFAULT 0,
    gsc_tracked BOOLEAN DEFAULT FALSE,

    CONSTRAINT blog_topics_generalist_topic_unique UNIQUE (topic)
);

CREATE INDEX IF NOT EXISTS blog_topics_generalist_used_idx
    ON public.blog_topics_generalist (used);
CREATE INDEX IF NOT EXISTS blog_topics_generalist_publish_priority_idx
    ON public.blog_topics_generalist (publish_priority DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS blog_topics_generalist_keyword_difficulty_idx
    ON public.blog_topics_generalist (keyword_difficulty ASC NULLS LAST);
CREATE INDEX IF NOT EXISTS blog_topics_generalist_category_idx
    ON public.blog_topics_generalist (category);
CREATE INDEX IF NOT EXISTS blog_topics_generalist_priority_unused_idx
    ON public.blog_topics_generalist (publish_priority DESC, keyword_difficulty ASC)
    WHERE used = false;

ALTER TABLE public.blog_topics_generalist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.blog_topics_generalist
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.blog_topics_generalist
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
    ON public.blog_topics_generalist
    FOR UPDATE USING (auth.role() = 'authenticated');

COMMENT ON TABLE public.blog_topics_generalist IS
    'Blog topic queue for the generalist UK Business Accountants niche - mirrors blog_topics_property / blog_topics_agency schema';
