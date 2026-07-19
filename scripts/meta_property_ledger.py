"""Property per-page intervention ledger (read-only).

Assembles, per canonical page, a timeline of every recorded intervention:
  - optimisation_changes rows (audited changes, all types)
  - monitored_pages rows (rewrite_date / rewrite_type incl. net_new)
  - git frontmatter history of metaTitle/metaDescription edits (catches the
    unaudited DeepSeek-era pass and manual edits)
  - page birth = min(first git commit of the file, first GSC page impression)

Output: .cache/meta_program/property/intervention_ledger.json

Usage: python scripts/meta_property_ledger.py
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402
from optimisation_engine.analysis.query_ledger import canon, check_freshness  # noqa: E402

SITE = "property"
DOMAIN = "https://www.propertytaxpartners.co.uk"
BLOG_DIR = "Property/web/content/blog"
OUT = ROOT / ".cache" / "meta_program" / SITE / "intervention_ledger.json"

META_LINE = re.compile(r"^[+-](metaTitle|metaDescription):", )


def slugify_category(cat: str) -> str:
    cat = cat.strip().strip("\"'").lower().replace("&", "and")
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", cat)).strip("-")


def slug_to_url(slug: str, category: str | None) -> str:
    if category:
        return canon(f"{DOMAIN}/blog/{slugify_category(category)}/{slug}")
    return canon(f"{DOMAIN}/blog/{slug}")


def read_frontmatter_category(path: Path) -> str | None:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None
    m = re.search(r"^category:\s*(.+)$", text, re.M)
    return m.group(1) if m else None


def git(*args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace"
    ).stdout


def file_url_map() -> dict[str, str]:
    """repo-relative md path -> canonical live URL (uses category frontmatter)."""
    out = {}
    for p in (ROOT / BLOG_DIR).glob("*.md"):
        cat = read_frontmatter_category(p)
        out[f"{BLOG_DIR}/{p.name}"] = slug_to_url(p.stem, cat)
    return out


def git_meta_edits() -> dict[str, list[dict]]:
    """file path -> [{date, commit, subject}] for commits touching metaTitle/metaDescription."""
    raw = git("log", "--date=short", "--format=\x01%H\x02%ad\x02%s", "-p", "--", BLOG_DIR)
    edits: dict[str, list[dict]] = defaultdict(list)
    commit = date = subject = None
    cur_file = None
    seen_this_commit: set[str] = set()
    for line in raw.splitlines():
        if line.startswith("\x01"):
            commit, date, subject = line[1:].split("\x02", 2)
            seen_this_commit = set()
        elif line.startswith("+++ b/"):
            cur_file = line[6:]
        elif META_LINE.match(line) and cur_file and cur_file.endswith(".md") and cur_file not in seen_this_commit:
            seen_this_commit.add(cur_file)
            edits[cur_file].append({"date": date, "commit": commit[:10], "subject": subject[:100]})
    return edits


def git_birth_dates() -> dict[str, str]:
    """file path -> first-commit date."""
    raw = git("log", "--reverse", "--date=short", "--format=\x01%ad", "--name-only",
              "--diff-filter=A", "--", BLOG_DIR)
    births: dict[str, str] = {}
    date = None
    for line in raw.splitlines():
        if line.startswith("\x01"):
            date = line[1:]
        elif line.endswith(".md") and line not in births:
            births[line] = date
    return births


def main() -> None:
    check_freshness(SITE)
    fmap = file_url_map()
    # slug -> canonical live URL, for merging flat/miscategorised/path-only variants
    slug_map = {u.rstrip("/").rsplit("/", 1)[-1]: u for u in fmap.values()}

    def resolve(url: str) -> str:
        if url.startswith("/"):
            url = DOMAIN + url
        u = canon(url)
        slug = u.rstrip("/").rsplit("/", 1)[-1]
        return slug_map.get(slug, u)

    pages: dict[str, dict] = defaultdict(lambda: {"interventions": [], "birth_candidates": []})

    # 1) audited changes
    for r in _sql(
        "SELECT id, target_url, shipped_at::date::text AS d, change_type "
        "FROM optimisation_changes WHERE site_key='property' AND target_url IS NOT NULL AND target_url != ''"
    ):
        u = resolve(r["target_url"])
        pages[u]["interventions"].append(
            {"date": r["d"], "type": r["change_type"], "source": "optimisation_changes", "ref": r["id"]}
        )

    # 2) monitored_pages
    for r in _sql(
        "SELECT page_url, rewrite_date::text AS d, rewrite_type "
        "FROM monitored_pages WHERE site_key='property' AND rewrite_date IS NOT NULL"
    ):
        u = resolve(r["page_url"])
        if r["rewrite_type"] == "net_new":
            pages[u]["birth_candidates"].append(r["d"])
        else:
            pages[u]["interventions"].append(
                {"date": r["d"], "type": r["rewrite_type"], "source": "monitored_pages", "ref": None}
            )

    # 3) git frontmatter meta edits (skip the file-creation commit — that's birth, not an edit)
    births = git_birth_dates()
    for path, edits in git_meta_edits().items():
        u = fmap.get(path)
        if not u:
            # deleted/renamed file: still map by slug (flat), best effort
            u = slug_to_url(Path(path).stem, None)
        for e in edits:
            if e["date"] == births.get(path):
                continue
            pages[u]["interventions"].append(
                {"date": e["date"], "type": "meta_frontmatter_edit", "source": "git",
                 "ref": e["commit"], "note": e["subject"]}
            )

    # 4) birth dates: git file creation + first GSC impression
    for path, d in births.items():
        u = fmap.get(path) or slug_to_url(Path(path).stem, None)
        pages[u]["birth_candidates"].append(d)
    for r in _sql(
        "SELECT page_url, MIN(date)::text AS d FROM gsc_page_performance "
        "WHERE niche='property' AND impressions > 0 GROUP BY page_url"
    ):
        u = resolve(r["page_url"])
        pages[u]["birth_candidates"].append(r["d"])
        pages[u]["first_gsc_impression"] = r["d"]

    ledger = {}
    for u, p in sorted(pages.items()):
        ivs = sorted(p["interventions"], key=lambda x: x["date"])
        # collapse same-day duplicates from different sources (audit row + git commit of same ship)
        dedup: list[dict] = []
        for iv in ivs:
            if dedup and dedup[-1]["date"] == iv["date"] and iv["source"] == "git" and \
               dedup[-1]["source"] == "optimisation_changes" and "meta" in dedup[-1]["type"]:
                dedup[-1]["git_ref"] = iv["ref"]
                continue
            dedup.append(iv)
        ledger[u] = {
            "birth_date": min(p["birth_candidates"]) if p["birth_candidates"] else None,
            "first_gsc_impression": p.get("first_gsc_impression"),
            "interventions": dedup,
        }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(ledger, indent=1), encoding="utf-8")
    n_iv = sum(len(v["interventions"]) for v in ledger.values())
    n_meta = sum(1 for v in ledger.values()
                 if any("meta" in iv["type"] for iv in v["interventions"]))
    print(f"[ledger] {len(ledger)} pages, {n_iv} interventions, {n_meta} pages with meta history -> {OUT}")


if __name__ == "__main__":
    main()
