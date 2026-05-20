# Per-site seed scripts (generalist / Holloway Davies)

The `seed_*.py` scripts in this directory were one-time keyword research /
topic seeders used during the generalist site launch.

## Post Phase 4 status (2026-05-20)

`SUPABASE_TABLE` in `config_supabase.py` now points to the unified
`blog_topics` table. `SITE_KEY = "generalist"` is also exported. The seed
scripts will insert into `blog_topics` automatically, BUT they don't currently
include `site_key` in their insert payloads — meaning inserts will fail with
NOT NULL.

## If you re-run a seed script

Before running, add `"site_key": SITE_KEY` to every row dict in the file:

```python
from config_supabase import SITE_KEY  # already exported

row = {
    "site_key": SITE_KEY,  # ← REQUIRED post Phase 4
    "topic": ...,
    "primary_keyword": ...,
    # ...
}
```

This is intentional fail-safe: if you forget, the NOT NULL constraint
crashes the insert rather than silently writing to the wrong site.

Active scripts already patched: `serper_mine.py`, `autocomplete_expand.py`.

## After ~2026-06-22

The renamed `blog_topics_generalist_legacy_20260520` table gets dropped.
The seed scripts here continue to work against unified blog_topics as long
as they include site_key.
