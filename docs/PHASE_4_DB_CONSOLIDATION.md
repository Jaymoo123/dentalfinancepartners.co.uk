# Phase 4: Per-site `blog_topics_*` Table Consolidation

**Status**: Design phase. No DB writes yet. Awaiting review before staging migration.

## Current state (after Phase 1 audit + Phase 4 detail audit)

6 per-site tables exist with **3 divergent schemas**:

| Schema family | Tables | Rows | Primary col | Key columns |
|---|---|---|---|---|
| "Old simple" | `blog_topics_medical`, `blog_topics_solicitors` | 62 + 65 | `keyword` | id, keyword, category, search_volume, difficulty, intent, status, published_at, slug, notes, priority |
| "Property-style" | `blog_topics_property`, `blog_topics_dentists` | 474 + 146 | `topic` | id, topic, category, priority, search_volume, competition, primary_keyword, secondary_keywords (Property) / secondary_keyword_1..10 (Dentists) |
| "Modern" | `blog_topics_agency`, `blog_topics_generalist` | 314 + 289 | `topic` | id, topic, category, priority, publish_priority, pillar_topic, primary_keyword, secondary_keywords (JSONB), suggested_slug, content_tier, content_branch, etc. |

Total: **6 tables, 43 unique columns across them, 1,350 rows total**.

## Naming inconsistencies between schemas

| Concept | "Old simple" name | "Modern" name | Canonical (chosen) |
|---|---|---|---|
| The keyword/topic | `keyword` | `topic` | `topic` |
| User intent | `intent` | `user_intent` | `user_intent` |
| Difficulty score | `difficulty` | `keyword_difficulty` | `keyword_difficulty` |
| Publication marker | `published_at` (timestamptz) | `used_at` (timestamptz) + `used` (boolean) | Keep both (different semantics) |
| Secondary keywords | (only in dentists: `secondary_keyword_1..10`) | `secondary_keywords` (JSONB array) | `secondary_keywords` JSONB |

## Type inconsistencies that need cleanup

These are pre-existing data-quality issues, surfaced by the audit:

| Column | Most sites | Outliers | Cleanup |
|---|---|---|---|
| `priority` | integer | Property has it as TEXT (!) | CAST to integer during migration, verify all values are numeric strings |
| `created_at` | timestamptz | Property has it as TEXT (!) | CAST to timestamptz during migration |
| `search_volume` | integer | Property has it as TEXT, missing on dentists | CAST to integer, NULL allowed |

These would have caused issues regardless of consolidation — Phase 4 surfaces and fixes them.

## Proposed union schema for `blog_topics`

```sql
CREATE TABLE blog_topics (
  id                    text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  site_key              text NOT NULL REFERENCES sites(site_key),

  -- Core (was "topic" in Modern, "keyword" in Old simple)
  topic                 text NOT NULL,
  primary_keyword       text,                  -- Modern only; can be NULL
  secondary_keywords    jsonb DEFAULT '[]'::jsonb,  -- collapse dentists' 1..10 columns here
  category              text,
  pillar_topic          text,
  content_tier          text,                  -- 'pillar' | 'cluster' | 'supporting'
  content_branch        text,                  -- existed in Property/Agency/Generalist

  -- Scoring + intent
  priority              integer DEFAULT 5,
  publish_priority      integer,
  user_intent           text,                  -- canonical name (was 'intent' in old simple)
  keyword_difficulty    integer,               -- canonical (was 'difficulty' in old simple)
  search_volume         integer,
  target_search_volume  integer,
  competition           text,
  keyword_source        text,

  -- Slug / generation state
  slug                  text,
  suggested_slug        text,
  generated_slug        text,                  -- Dentists-only currently; keep for parity
  generated_at          timestamptz,           -- Dentists-only

  -- Lifecycle
  used                  boolean DEFAULT false,
  used_at               timestamptz,
  status                text,                  -- 'pending' | 'published' | 'archived' etc. (was Medical/Solicitors only)
  published_at          timestamptz,           -- was Medical/Solicitors only; semantically overlaps used_at but kept separate

  -- Optimisation tracking (from Modern)
  last_optimized_at     timestamptz,
  optimization_count    integer DEFAULT 0,
  gsc_tracked           boolean DEFAULT false,

  -- Notes / metadata
  notes                 text,

  -- Timestamps
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),

  -- Uniqueness: same topic shouldn't appear twice for the same site
  UNIQUE (site_key, topic)
);

CREATE INDEX idx_blog_topics_site_key ON blog_topics(site_key);
CREATE INDEX idx_blog_topics_used ON blog_topics(site_key, used);
CREATE INDEX idx_blog_topics_status ON blog_topics(site_key, status) WHERE status IS NOT NULL;
CREATE INDEX idx_blog_topics_priority ON blog_topics(site_key, priority DESC);

-- Trigger to keep updated_at fresh
CREATE OR REPLACE FUNCTION blog_topics_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_topics_updated_at_trigger
  BEFORE UPDATE ON blog_topics
  FOR EACH ROW EXECUTE FUNCTION blog_topics_updated_at();
```

## Migration plan (safe + reversible)

**Sequence (each step is a separate migration file with rollback SQL)**:

1. **Backup** — `pg_dump` all 6 `blog_topics_*` tables to Supabase storage bucket
2. **Apply on STAGING first** — verify every step works there before touching prod
3. **Create new `blog_topics` table** on prod (empty, no data yet)
4. **Backfill from per-site tables** — one SQL block per source table, mapping columns to canonical names:
   ```sql
   INSERT INTO blog_topics (site_key, topic, category, priority, ..., created_at)
   SELECT
     'medical' AS site_key,
     keyword AS topic,           -- rename
     category,
     priority,
     ...,
     created_at
   FROM blog_topics_medical
   ON CONFLICT (site_key, topic) DO NOTHING;  -- safety
   ```
   For Dentists' secondary_keyword_1..10, collapse to JSONB:
   ```sql
   INSERT INTO blog_topics (site_key, topic, secondary_keywords, ...)
   SELECT
     'dentists',
     topic,
     jsonb_build_array(
       secondary_keyword_1, secondary_keyword_2, ...
     ) - to_jsonb(NULL::text)  -- strip NULL elements
     ,
     ...
   FROM blog_topics_dentists;
   ```
5. **Verify counts**: each source table's row count should match what landed in `blog_topics` filtered by `site_key`.
6. **Add RLS policies** on `blog_topics` mirroring the existing per-site table policies (anon SELECT only, authenticated full read, service_role bypass).
7. **Side-by-side period (48h on prod)**: triggers on the OLD tables mirror writes into the new table. Reads still go to old tables. This validates the trigger logic catches everything.
8. **Switch consumers**: update `shared_supabase_config.py` constants + blog_generator config readers to use `blog_topics` filtered by `site_key`. Deploy.
9. **Observe 7 days**: reads now from new table; old tables receive writes via triggers as fallback.
10. **Rename old tables**: `blog_topics_dentists` → `blog_topics_dentists_legacy_20260520`. They become read-only archives.
11. **30-day soak** on legacy tables — anyone can `git log` to see when they were retired.
12. **DROP** legacy tables after 30 days of no fallback usage.

## Rollback triggers

At any phase, if integrity fails, drop the new `blog_topics` table. Old per-site tables remain authoritative. Consumers still read from them. Migration retried after fix.

## What I need from you before applying any of this

This is the highest-risk phase. Two decisions you should sign off on:

1. **The union schema above** — anything to add, remove, or rename? (E.g. do you want `published_at` to be the canonical and drop `used_at`? Or keep both?)
2. **Side-by-side period length** — 48 hours of dual-write is the plan default. Want it longer? Or skip and switch directly? (Skipping is faster but loses the safety net.)

Also one practical: **applying the new table on STAGING first requires the staging Supabase schema to be in sync with prod.** That hasn't happened yet (you set up staging Supabase but didn't apply prod schema to it). For Phase 4 to be safely tested, we need either:
- Apply all 37 prod migrations to staging via `supabase login + link + db push`
- OR skip staging and apply directly to prod with backups (riskier but faster)
