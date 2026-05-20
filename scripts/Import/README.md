# Import scripts — HISTORICAL ONLY

These scripts ran the initial bulk topic imports during site launch
(2026-03/04). They INSERT into legacy per-site `blog_topics_<site>` tables
that no longer exist:

- All per-site tables were renamed `*_legacy_20260520` on 2026-05-20 (Phase 4)
- Legacy tables get DROPPED ~2026-06-22

## To re-import

Don't use these scripts. Insert directly into the unified `blog_topics`
table with `site_key = '<niche>'` on every row. Use
`optimisation_engine/blog_generator/topic_repository.py` patterns.

Kept in-repo for audit only.
