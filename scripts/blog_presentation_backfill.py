#!/usr/bin/env python3
"""
Blog presentation backfill: add a hero image (Pexels) + imageCredit, and stamp
updatedDate / sourcesVerifiedAt onto blog frontmatter, matching the newest-site
convention (hollowaydavies / agencyfounderfinance).

Idempotent and surgical: only fills an empty/absent `image:`, only inserts
imageCredit/updatedDate/sourcesVerifiedAt when not already present. Preserves the
rest of the frontmatter and the HTML body verbatim.

Scope defaults to a file listing one .md path per line (the pages this program
owns), so it never touches the concurrent net-new session's untracked pages.

Usage:
  python scripts/blog_presentation_backfill.py --scope .cache/dentist_touched_scope.txt --date 2026-06-03
  python scripts/blog_presentation_backfill.py --scope ... --dry-run
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

DENTAL = ["dental clinic", "dentist office", "dental practice", "dentist chair",
          "dental tools", "dental hygienist", "modern dental surgery"]
FINANCE = ["accounting calculator", "financial documents desk", "tax paperwork",
           "business finance meeting", "financial planning", "accountant working",
           "calculator and money"]
EQUIP = ["dental equipment", "dental chair", "dental instruments", "modern dental clinic"]


def load_key(env_path: str) -> str:
    for line in open(env_path, encoding="utf-8", errors="ignore"):
        if line.startswith("PEXELS_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("PEXELS_API_KEY not found in .env")


def route_queries(category: str):
    c = (category or "").lower()
    if "capital allowance" in c or "equipment" in c:
        return EQUIP
    if any(k in c for k in ("vat", "compliance", "accounting", "finance", "tax",
                            "pension", "goodwill", "sale", "buying", "incorporat",
                            "profit", "practice finance")):
        return FINANCE
    return DENTAL


def pexels_search(key: str, query: str, cache: dict):
    if query in cache:
        return cache[query]
    url = "https://api.pexels.com/v1/search?" + urllib.parse.urlencode(
        {"query": query, "per_page": 30, "orientation": "landscape"})
    req = urllib.request.Request(url, headers={
        "Authorization": key, "User-Agent": UA, "Accept": "application/json"})
    try:
        r = urllib.request.urlopen(req, timeout=30)
        photos = json.load(r).get("photos", [])
    except Exception as e:  # noqa
        print(f"    ! pexels error for '{query}': {type(e).__name__} {e}")
        photos = []
    cache[query] = photos
    time.sleep(0.3)
    return photos


def split_frontmatter(raw: str):
    """Return (fm_lines, body, eol). Assumes leading '---'."""
    if not raw.startswith("---"):
        return None, None, "\n"
    # normalise to \n for processing; we write back \n
    lines = raw.split("\n")
    # find closing '---' after line 0
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return None, None, "\n"
    fm = lines[1:end]
    body = "\n".join(lines[end + 1:])
    return fm, body, "\n"


def yq(val: str) -> str:
    return '"' + str(val).replace('\\', '\\\\').replace('"', '\\"') + '"'


def has_key(fm_lines, key):
    pat = re.compile(rf"^{re.escape(key)}\s*:")
    return any(pat.match(l) for l in fm_lines)


def backfill_file(path, key, date, cache, usage, dry):
    raw = open(path, encoding="utf-8").read()
    fm, body, eol = split_frontmatter(raw)
    if fm is None:
        print(f"  SKIP (no frontmatter): {path}")
        return (False, False)

    category = ""
    for l in fm:
        m = re.match(r"^category\s*:\s*(.+)$", l)
        if m:
            category = m.group(1).strip().strip('"').strip("'")
            break

    did_img = False
    did_date = False
    out = []
    i = 0
    while i < len(fm):
        line = fm[i]
        # image line
        m_img = re.match(r'^image\s*:\s*(.*)$', line)
        if m_img and not has_key(fm, "imageCredit"):
            current = m_img.group(1).strip().strip('"').strip("'")
            if not current:  # empty -> fill
                photo = pick_photo(key, category, cache, usage)
                if photo:
                    out.append(f'image: {yq(photo["src"]["landscape"])}')
                    out.append("imageCredit:")
                    out.append(f'  photographer: {yq(photo["photographer"])}')
                    out.append(f'  photographerUrl: {yq(photo.get("photographer_url",""))}')
                    out.append('  source: "Pexels"')
                    out.append(f'  sourceUrl: {yq(photo.get("url",""))}')
                    did_img = True
                    i += 1
                    continue
            # non-empty image, leave as-is
        # date line -> insert updatedDate + sourcesVerifiedAt after it
        m_date = re.match(r'^date\s*:', line)
        if m_date:
            out.append(line)
            if not has_key(fm, "updatedDate"):
                out.append(f'updatedDate: {yq(date)}')
                did_date = True
            if not has_key(fm, "sourcesVerifiedAt"):
                out.append(f'sourcesVerifiedAt: {yq(date)}')
                did_date = True
            i += 1
            continue
        out.append(line)
        i += 1

    if not (did_img or did_date):
        print(f"  - nothing to do: {os.path.basename(path)}")
        return (False, False)

    new_raw = "---\n" + "\n".join(out) + "\n---\n" + body
    if dry:
        print(f"  DRY {os.path.basename(path)}  img={did_img} date={did_date} cat='{category}'")
    else:
        open(path, "w", encoding="utf-8", newline="\n").write(new_raw)
        print(f"  OK  {os.path.basename(path)}  img={did_img} date={did_date} cat='{category}'")
    return (did_img, did_date)


# per-category rotation pointer
_qptr = {}


def pick_photo(key, category, cache, usage):
    pool = route_queries(category)
    ptr = _qptr.get(category, 0)
    # try queries in rotation; within a query, pick a not-overused photo
    for attempt in range(len(pool)):
        q = pool[(ptr + attempt) % len(pool)]
        photos = pexels_search(key, q, cache)
        for p in photos:
            pid = p["id"]
            if usage.get(pid, 0) >= 2:
                continue
            usage[pid] = usage.get(pid, 0) + 1
            _qptr[category] = (ptr + attempt + 1) % len(pool)
            return p
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scope", required=True, help="file with one .md path per line")
    ap.add_argument("--date", default="2026-06-03")
    ap.add_argument("--env", default=".env")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="process at most N files (0=all)")
    a = ap.parse_args()

    key = load_key(a.env)
    paths = [l.strip() for l in open(a.scope, encoding="utf-8") if l.strip()]
    if a.limit:
        paths = paths[:a.limit]

    cache, usage = {}, {}
    n_img = n_date = 0
    for p in paths:
        if not os.path.isfile(p):
            print(f"  MISSING: {p}")
            continue
        di, dd = backfill_file(p, key, a.date, cache, usage, a.dry_run)
        n_img += 1 if di else 0
        n_date += 1 if dd else 0

    print(f"\nDONE: {len(paths)} files | images set: {n_img} | dates stamped: {n_date} | "
          f"unique pexels queries: {len(cache)}")


if __name__ == "__main__":
    main()
