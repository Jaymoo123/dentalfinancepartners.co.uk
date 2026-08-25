"""Medical blog_topics coverage reconcile vs live sitemap + source content.

Re-runnable. Usage: python scripts/_medical_reconcile.py [--apply]
Dry run prints matches; --apply flips used=true + appends note.
"""
import argparse, os, re, sys
from pathlib import Path
import httpx
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env")

def sql(q):
    r = httpx.post("https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query",
                   headers={"Authorization": f"Bearer {os.getenv('SUPABASE_ACCESS_TOKEN')}"},
                   json={"query": q}, timeout=120)
    r.raise_for_status()
    return r.json()

STOP = {"a", "an", "the", "of", "for", "to", "and", "in", "on", "guide", "explained", "uk"}

def slugify(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")

def tokens(s):
    return {w for w in re.split(r"[^a-z0-9]+", s.lower()) if w and w not in STOP}

def inventory():
    slugs = set()
    # live sitemap (FLAT routing: last path segment)
    try:
        xml = httpx.get("https://www.medicalaccounts.co.uk/sitemap.xml", timeout=30).text
        for loc in re.findall(r"<loc>(.*?)</loc>", xml):
            seg = loc.rstrip("/").split("/")[-1]
            if seg and "." not in seg:
                slugs.add(seg)
    except Exception as e:
        print(f"WARN sitemap fetch failed: {e}", file=sys.stderr)
    # source content (flat blog slugs)
    for d in ("blog", "resources"):
        p = ROOT / "Medical" / "web" / "content" / d
        if p.exists():
            slugs.update(f.stem for f in p.glob("*.md"))
    return slugs

def match(row, slugs, slug_tokens):
    rslug = row.get("slug") or slugify(row["topic"])
    if rslug in slugs:
        return rslug, "exact-slug"
    tt = tokens(row["topic"])
    if not tt:
        return None, None
    for s, st in slug_tokens.items():
        # genuine intent coverage: all topic tokens in slug AND slug not much broader
        # (blocks e.g. 'gp accounting' -> qof-income-gp-practice-accounting-explained)
        if tt <= st and len(st - tt) <= 1:
            return s, "token-subset"
    return None, None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    slugs = inventory()
    slug_tokens = {s: tokens(s) for s in slugs}
    print(f"inventory slugs: {len(slugs)}")

    rows = sql("SELECT id, topic, slug, search_volume, category, used FROM blog_topics "
               "WHERE site_key='medical' ORDER BY search_volume DESC NULLS LAST")
    unused = [r for r in rows if not r["used"]]
    covered, uncovered = [], []
    for r in unused:
        m, how = match(r, slugs, slug_tokens)
        (covered if m else uncovered).append((r, m, how))

    print(f"total {len(rows)} | used=true {len(rows)-len(unused)} | unused {len(unused)} "
          f"| matched-covered {len(covered)} | verified-unwritten {len(uncovered)}")
    for r, m, how in covered:
        print(f"  COVERED [{how}] {r['topic']!r} -> {m}")

    if args.apply and covered:
        ids = ",".join(f"'{r['id']}'" for r, _, _ in covered)
        sql(f"UPDATE blog_topics SET used=true, used_at=now(), "
            f"notes = coalesce(notes,'') || ' coverage-reconcile-2026-07-14', updated_at=now() "
            f"WHERE id IN ({ids})")
        print(f"APPLIED: flipped {len(covered)} rows used=true")

    print("\nTop 20 verified-unwritten by volume:")
    for r, _, _ in uncovered[:20]:
        print(f"  {r['search_volume'] or 0:>6}  {r['topic']}  [{r['category']}]")

if __name__ == "__main__":
    main()
