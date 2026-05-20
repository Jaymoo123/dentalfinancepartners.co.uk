# Phase 4.X Soak Verification — 2026-05-20

Pre-rename verification run before renaming `blog_topics_<site>` legacy tables.

## Row counts: unified vs legacy

| Site | Unified (`blog_topics`) | Legacy | Delta | Cause |
|---|---:|---:|---:|---|
| dentists | 128 | 146 | -18 | 18 duplicate topics in legacy (deduped on UNIQUE site_key,topic) |
| property | 474 | 474 | 0 | — |
| medical | 62 | 62 | 0 | — |
| solicitors | 65 | 65 | 0 | — |
| agency | 314 | 314 | 0 | — |
| generalist | 289 | 289 | 0 | — |
| **TOTAL** | **1332** | **1350** | **-18** | All in dentists dupes |

## Dentists 18-row gap investigation

128 unique topics in `blog_topics_dentists`, with 18 topics appearing twice
each (146 - 128 = 18). The ON CONFLICT (site_key, topic) DO NOTHING in the
backfill kept the first occurrence and skipped the duplicate, which is the
correct behaviour.

12 of the 18 duplicates had divergent `used`/`generated_slug` state across
the two legacy rows. For the only state-changing case
("Buying a Dental Practice: Complete Financial Guide"), the unified row
correctly has `used=True` with a real slug.

The other 11 are cases where both legacy rows are `used=True` but with
different generated slug spellings (the post was generated twice with
slightly different slugs). That is a pre-existing duplicate-content issue
in `Dentists/web/content/blog/`, not a Phase 4 concern.

## Dual-write trigger test

Inserted a test row into `blog_topics_medical`, polled `blog_topics` for
the same topic, observed the row appear via the trigger. Cleaned up both
sides afterwards. Trigger fires correctly.

## Consumer smoke tests

- `optimisation_engine.blog_generator.topic_repository.fetch_next_topic`
  returns valid dentists + property topics from the unified table.
- All 6 agents/ module imports clean post-migration (Checkpoint C).
- Niche config validators accept both unified and legacy table names
  during the soak window.

## Decision

**APPROVED for rename**. All 6 sites' data is fully mirrored in unified.
The 18-row dentists gap is real-world duplicates, not data loss.

Rename plan:
```sql
ALTER TABLE blog_topics_dentists   RENAME TO blog_topics_dentists_legacy_20260520;
ALTER TABLE blog_topics_property   RENAME TO blog_topics_property_legacy_20260520;
ALTER TABLE blog_topics_medical    RENAME TO blog_topics_medical_legacy_20260520;
ALTER TABLE blog_topics_solicitors RENAME TO blog_topics_solicitors_legacy_20260520;
ALTER TABLE blog_topics_agency     RENAME TO blog_topics_agency_legacy_20260520;
ALTER TABLE blog_topics_generalist RENAME TO blog_topics_generalist_legacy_20260520;
```

Triggers move with the tables (PostgreSQL behaviour), so dual-write
continues to function. Since no migrated consumer writes to legacy tables
any more, the triggers become no-ops.

## Rollback

If the rename causes an unexpected break:
```sql
ALTER TABLE blog_topics_dentists_legacy_20260520 RENAME TO blog_topics_dentists;
-- repeat per site
```
