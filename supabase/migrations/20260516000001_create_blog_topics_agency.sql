-- Create blog_topics_agency table for Agency Founder Finance niche.
-- Schema mirrors blog_topics_property (the schema the pipeline expects),
-- with two additions: suggested_slug, content_branch (kept for parity).

CREATE TABLE IF NOT EXISTS public.blog_topics_agency (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,

    -- Topic identity
    topic TEXT NOT NULL,
    category TEXT NOT NULL,

    -- Priority / sorting
    priority TEXT,
    publish_priority INTEGER,
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
    user_intent TEXT,
    content_tier TEXT,
    content_branch TEXT,

    -- Editorial helpers
    suggested_slug TEXT,
    notes TEXT,

    -- Publishing state
    used BOOLEAN DEFAULT FALSE NOT NULL,
    slug TEXT,

    -- GSC tracking (mirrors property)
    last_optimized_at TIMESTAMP WITH TIME ZONE,
    optimization_count INTEGER DEFAULT 0,
    gsc_tracked BOOLEAN DEFAULT FALSE,

    CONSTRAINT blog_topics_agency_topic_unique UNIQUE (topic)
);

CREATE INDEX IF NOT EXISTS blog_topics_agency_used_idx
    ON public.blog_topics_agency (used);
CREATE INDEX IF NOT EXISTS blog_topics_agency_publish_priority_idx
    ON public.blog_topics_agency (publish_priority DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS blog_topics_agency_keyword_difficulty_idx
    ON public.blog_topics_agency (keyword_difficulty ASC NULLS LAST);
CREATE INDEX IF NOT EXISTS blog_topics_agency_category_idx
    ON public.blog_topics_agency (category);

ALTER TABLE public.blog_topics_agency ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.blog_topics_agency
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.blog_topics_agency
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
    ON public.blog_topics_agency
    FOR UPDATE USING (auth.role() = 'authenticated');

COMMENT ON TABLE public.blog_topics_agency IS
    'Blog topic queue for Agency Founder Finance niche - mirrors blog_topics_property schema';
