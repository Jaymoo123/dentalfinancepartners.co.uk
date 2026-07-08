-- Competitor pipeline tables baseline
-- Generated 2026-07-08 from live schema via information_schema + pg_indexes
-- Apply with: supabase db push (or manually in SQL editor — safe, all IF NOT EXISTS)

-- ---------------------------------------------------------------------------
-- page_content_map
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_content_map (
    id                   uuid        NOT NULL DEFAULT gen_random_uuid(),
    page_url             text        NOT NULL,
    fetch_date           date        NOT NULL DEFAULT CURRENT_DATE,
    is_our_page          boolean     NOT NULL DEFAULT false,
    site_key             text,
    primary_query        text,
    title_tag            text,
    meta_description     text,
    h1_text              text,
    word_count           integer,
    sections             jsonb,
    faqs                 jsonb,
    query_coverage       jsonb,
    eeat                 jsonb,
    schema_data          jsonb,
    figures_mentioned    text[],
    legislation_refs     text[],
    deadline_refs        text[],
    schema_types         text[],
    query_in_title       boolean,
    query_in_h1          boolean,
    query_in_first_para  boolean,
    first_paragraph_text text,
    query_density_pct    numeric,
    internal_link_count  integer,
    external_link_count  integer,
    body_structure       text[],
    opening_type         text,
    cta_count            integer,
    cta_inventory        jsonb,
    has_sticky_cta       boolean,
    has_cta_early        boolean,
    cta_primary_text     text,
    has_lead_form        boolean,
    has_calculator       boolean,
    has_phone_visible    boolean,
    has_download         boolean,
    downloadable_assets  jsonb,
    has_lead_magnet      boolean,
    pdf_link_count       integer,
    has_video            boolean,
    has_accordion        boolean,
    has_glossary         boolean,
    features             text[],
    has_testimonials     boolean,
    has_star_rating      boolean,
    has_case_study       boolean,
    has_client_logos     boolean,
    has_stats_block      boolean,
    social_proof_text    text,
    has_sidebar          boolean,
    has_sticky_element   boolean,
    uses_card_layout     boolean,
    has_hero_section     boolean,
    above_fold_elements  text[],
    js_rendered          boolean     DEFAULT false,
    http_status          integer,
    fetch_error          text,
    fetched_at           timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IF NOT EXISTS page_content_map_page_url_fetch_date_key
    ON public.page_content_map (page_url, fetch_date);

-- ---------------------------------------------------------------------------
-- competitor_serps
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.competitor_serps (
    id          uuid        NOT NULL DEFAULT gen_random_uuid(),
    site_key    text        NOT NULL,
    query       text        NOT NULL,
    our_page_url text,
    our_position numeric,
    fetch_date  date        NOT NULL DEFAULT CURRENT_DATE,
    fetched_at  timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IF NOT EXISTS competitor_serps_site_key_query_fetch_date_key
    ON public.competitor_serps (site_key, query, fetch_date);

-- ---------------------------------------------------------------------------
-- competitor_pages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.competitor_pages (
    id              uuid        NOT NULL DEFAULT gen_random_uuid(),
    serp_id         uuid        NOT NULL,
    position        integer     NOT NULL,
    url             text        NOT NULL,
    domain          text,
    title           text,
    snippet         text,
    content_map_id  uuid,
    created_at      timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
-- No additional unique index beyond PK (serp_id+position not unique in live schema)

-- ---------------------------------------------------------------------------
-- competitor_discovery
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.competitor_discovery (
    id                      uuid        NOT NULL DEFAULT gen_random_uuid(),
    site_key                text        NOT NULL,
    query                   text        NOT NULL,
    competitor_url          text        NOT NULL,
    competitor_position     integer,
    sections_found          jsonb,
    queries_targeted        text[],
    competitive_advantages  text[],
    trust_signals           text[],
    outranking_requirements text[],
    raw_analysis            text,
    analysed_at             timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IF NOT EXISTS competitor_discovery_site_key_query_competitor_url_key
    ON public.competitor_discovery (site_key, query, competitor_url);

-- ---------------------------------------------------------------------------
-- competitor_gap_reports
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.competitor_gap_reports (
    id                        uuid        NOT NULL DEFAULT gen_random_uuid(),
    site_key                  text        NOT NULL,
    our_page_url              text        NOT NULL,
    primary_query             text        NOT NULL,
    our_avg_position          numeric,
    competitor_urls           text[],
    our_word_count            integer,
    competitor_avg_word_count integer,
    our_section_count         integer,
    competitor_avg_section_count integer,
    our_faq_count             integer,
    competitor_avg_faq_count  integer,
    topic_gaps                jsonb,
    query_gaps                jsonb,
    structural_gaps           text[],
    eeat_gaps                 text[],
    priority_score            numeric,
    improvement_brief         text,
    status                    text        DEFAULT 'pending',
    created_at                timestamptz DEFAULT now(),
    updated_at                timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IF NOT EXISTS competitor_gap_reports_site_key_our_page_url_primary_query_key
    ON public.competitor_gap_reports (site_key, our_page_url, primary_query);
