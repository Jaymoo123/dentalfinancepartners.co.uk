-- Meta performance tracking: per-page CTR/impressions/position + Google's
-- own title rewrites. Populated from GSC weekly. Used by the meta-strategy
-- feedback loop to:
--   1. Flag low-CTR pages for meta_rewrite opportunities
--   2. Detect when Google rewrites our metaTitle (signal that we missed intent)
--   3. A/B variant tracking once we have enough volume

CREATE TABLE IF NOT EXISTS meta_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Routing
    site_key TEXT NOT NULL CHECK (site_key IN ('dentists', 'property', 'medical', 'solicitors', 'agency', 'generalist')),
    page_url TEXT NOT NULL,
    page_slug TEXT,
    target_query TEXT,  -- the GSC query string this measurement covers

    -- The meta values that were live during this measurement window
    meta_title_live TEXT,
    meta_description_live TEXT,

    -- Did Google rewrite the metaTitle? (Captured from GSC's "page title" vs our metaTitle)
    google_rewrote_title BOOLEAN DEFAULT false,
    google_rewritten_title TEXT,

    -- GSC metrics for the measurement window
    window_start DATE NOT NULL,
    window_end DATE NOT NULL,
    impressions INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    ctr_pct NUMERIC(5,3),  -- clicks / impressions * 100, e.g. 1.234
    avg_position NUMERIC(5,2),

    -- Performance flags computed at insert/update time
    is_underperforming BOOLEAN DEFAULT false,  -- CTR below site baseline for position bucket
    is_overperforming BOOLEAN DEFAULT false,
    has_pending_rewrite BOOLEAN DEFAULT false, -- a meta_rewrite opportunity is queued

    -- For A/B variant tracking (deferred — enabled when we have enough volume)
    variant_label TEXT,        -- 'A' or 'B' or NULL
    variant_pair_id UUID,      -- groups the two variants of the same page

    notes TEXT,

    UNIQUE (site_key, page_url, window_start, target_query)
);

CREATE INDEX IF NOT EXISTS idx_meta_perf_site_underperforming
    ON meta_performance (site_key, is_underperforming)
    WHERE is_underperforming = true;

CREATE INDEX IF NOT EXISTS idx_meta_perf_page_window
    ON meta_performance (page_url, window_start DESC);

CREATE INDEX IF NOT EXISTS idx_meta_perf_rewritten
    ON meta_performance (site_key, google_rewrote_title)
    WHERE google_rewrote_title = true;

COMMENT ON TABLE meta_performance IS
    'Per-page meta title/description performance from GSC. Used by the SEO '
    'meta strategy feedback loop to identify underperforming meta + Google '
    'rewrites. Activated once GSC has 14+ days of data on shipped pages.';
