"""
Dentists blog_topics dedup + coverage reconciliation.
Usage: python scripts/_dentists_dedup_reconcile.py
"""
import os, sys, json, pathlib, re
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
SITE_KEY = "dentists"
BLOG_DIR = pathlib.Path(__file__).parent.parent / "Dentists" / "web" / "content" / "blog"


def sql(query: str):
    r = httpx.post(
        URL,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=120,
    )
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:1000]}", file=sys.stderr)
        sys.exit(1)
    return r.json()


# ── Step 1: baseline count ────────────────────────────────────────────────────
before = sql(f"SELECT COUNT(*) AS n FROM blog_topics WHERE site_key='{SITE_KEY}'")
count_before = before[0]["n"]
print(f"Rows before dedup: {count_before}")

# ── Step 2: find dupe groups ──────────────────────────────────────────────────
dupes = sql(f"""
SELECT lower(primary_keyword) AS kw, COUNT(*) AS cnt
FROM blog_topics
WHERE site_key = '{SITE_KEY}'
GROUP BY lower(primary_keyword)
HAVING COUNT(*) > 1
ORDER BY cnt DESC
""")
print(f"Dupe groups: {len(dupes)}")

deleted_total = 0
for d in dupes:
    if not d["kw"]:
        continue  # ponytail: skip null-keyword rows, harmless edge case
    kw = d["kw"].replace("'", "''")
    # Get all rows for this keyword, priority order: used DESC, search_volume DESC, id ASC
    rows = sql(f"""
        SELECT id, used, search_volume
        FROM blog_topics
        WHERE site_key = '{SITE_KEY}' AND lower(primary_keyword) = '{kw}'
        ORDER BY
            CASE WHEN used THEN 0 ELSE 1 END,
            COALESCE(search_volume, 0) DESC,
            id ASC
    """)
    keep_id = rows[0]["id"]
    delete_ids = [str(r["id"]) for r in rows[1:]]
    if delete_ids:
        ids_csv = ", ".join(f"'{i}'" for i in delete_ids)
        sql(f"DELETE FROM blog_topics WHERE id IN ({ids_csv})")
        deleted_total += len(delete_ids)
        print(f"  Kept {keep_id}, deleted {delete_ids} for '{d['kw']}'")

print(f"\nDeleted {deleted_total} dupe rows")

# ── Step 3: after count ───────────────────────────────────────────────────────
after = sql(f"SELECT COUNT(*) AS n FROM blog_topics WHERE site_key='{SITE_KEY}'")
count_after = after[0]["n"]
print(f"Rows after dedup: {count_after}")

# ── Step 4: build local slug inventory ───────────────────────────────────────
local_slugs = set()
for f in BLOG_DIR.glob("*.md"):
    local_slugs.add(f.stem)

print(f"\nLocal blog files (slugs): {len(local_slugs)}")

# ── Step 5: fetch unused rows and reconcile ───────────────────────────────────
unused_rows = sql(f"""
    SELECT id, primary_keyword, slug, COALESCE(notes, '') AS notes
    FROM blog_topics
    WHERE site_key = '{SITE_KEY}' AND used = false
    ORDER BY id
""")
print(f"used=false rows to reconcile: {len(unused_rows)}")

def kw_to_slug(kw: str) -> str:
    """Naive keyword → slug: lowercase, non-alnum → hyphen, collapse."""
    s = kw.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

flipped = []
ambiguous = []

for row in unused_rows:
    row_id = row["id"]
    kw = row["primary_keyword"] or ""
    row_slug = (row["slug"] or "").strip()

    matched = None

    # Check 1: exact slug match
    if row_slug and row_slug in local_slugs:
        matched = (row_slug, "slug-exact")
    # Check 2: DB slug is prefix/suffix of a local slug
    elif row_slug:
        for ls in local_slugs:
            if ls.startswith(row_slug) or row_slug.startswith(ls):
                matched = (ls, "slug-prefix")
                break
    # Check 3: keyword-derived slug (non-null kw only)
    if not matched and kw:
        derived = kw_to_slug(kw)
        if derived in local_slugs:
            matched = (derived, "derived-exact")
        else:
            for ls in local_slugs:
                if ls.startswith(derived) or derived.startswith(ls):
                    matched = (ls, "derived-prefix")
                    break

    if matched:
        flipped.append((row_id, kw, matched[0], matched[1]))

print(f"Rows to flip used=true: {len(flipped)}")

if flipped:
    for row_id, kw, matched_slug, reason in flipped:
        existing_notes = next(
            (r["notes"] for r in unused_rows if r["id"] == row_id), ""
        ) or ""
        new_notes = (existing_notes + " coverage-reconcile-2026-07-14").strip()
        new_notes_escaped = new_notes.replace("'", "''")
        sql(f"""
            UPDATE blog_topics
            SET used = true, notes = '{new_notes_escaped}'
            WHERE id = '{row_id}'
        """)
        print(f"  Flipped id={row_id} '{kw}' ({reason})")

# ── Step 6: final stats ───────────────────────────────────────────────────────
stats = sql(f"""
    SELECT
        COUNT(*) FILTER (WHERE used = true)  AS used_true,
        COUNT(*) FILTER (WHERE used = false) AS used_false,
        COUNT(*) FILTER (WHERE search_volume > 0) AS has_volume
    FROM blog_topics
    WHERE site_key = '{SITE_KEY}'
""")
s = stats[0]

top10 = sql(f"""
    SELECT primary_keyword, search_volume
    FROM blog_topics
    WHERE site_key = '{SITE_KEY}' AND used = false AND search_volume > 0
    ORDER BY search_volume DESC
    LIMIT 10
""")

print("=" * 40)
print("DENTISTS blog_topics dedup + reconcile -- 2026-07-14")
print("=" * 40)
print(f"Rows before dedup:     {count_before}")
print(f"Rows after dedup:      {count_after}")
print(f"Dupes deleted:         {deleted_total}")
print()
print(f"used=true after:       {s['used_true']}")
print(f"used=false after:      {s['used_false']}")
print(f"Rows flipped:          {len(flipped)}")
print(f"Verified-unwritten:    {s['used_false']}")
print(f"Rows with volume > 0:  {s['has_volume']}")
print()
print("Top 10 unwritten by search_volume:")

for row in top10:
    print(f"  {row['search_volume']:>6}  {row['primary_keyword']}")

print("=" * 40)
