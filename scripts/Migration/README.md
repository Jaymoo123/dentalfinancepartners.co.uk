# Migration scripts — HISTORICAL ONLY

The scripts in this directory were one-time data migrations used during the
2026-03/04 site launches. They INSERT into legacy per-site tables that no
longer exist:

- `blog_topics_dentists`   → renamed `blog_topics_dentists_legacy_20260520`
- `blog_topics_property`   → renamed `blog_topics_property_legacy_20260520`
- `blog_topics_medical`    → renamed `blog_topics_medical_legacy_20260520`
- `blog_topics_solicitors` → renamed `blog_topics_solicitors_legacy_20260520`

All four legacy tables get DROPPED ~2026-06-22.

## If you need to re-seed topics

Don't use these scripts. Insert directly into the unified `blog_topics` table
with `site_key = '<niche>'` on every row. Use
`optimisation_engine/blog_generator/topic_repository.py` patterns.

## Why not just delete?

Kept for audit of which topics were seeded when, in case the launch payloads
ever need to be referenced (Tier 1/2/3 priorities, secondary keyword choices,
category assignments).
