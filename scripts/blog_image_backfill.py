#!/usr/bin/env python3
"""Pexels hero-image frontmatter backfill for a site's blog corpus.

Finds posts that have no `image:` key in their frontmatter, derives a
CIS-aware visual search query from the slug, fetches a Pexels photo,
deduplicates against previously used photo IDs/URLs, then (on --execute)
inserts the image + imageCredit block into the frontmatter.

Usage:
  # Dry-run (default): print what would change, no writes
  python scripts/blog_image_backfill.py --site construction-cis

  # Execute: write changes to disk
  python scripts/blog_image_backfill.py --site construction-cis --execute

  # Scope to specific slugs only
  python scripts/blog_image_backfill.py --site construction-cis --only what-is-cis cis-tax-refund-how-to-claim

Exit 0 = completed (all posts processed or skipped).
Exit 1 = fatal setup error (missing key, site config not found).

Deduplication:
  Previously used photo IDs are tracked in
  optimisation_engine/.cache/pexels_used_<site>.json (created if missing).
  If the top Pexels result is already in the used set, successive results
  from the same per_page=5 response are tried, then an alternate-query
  variant ("... site uk" / "... professional") is attempted before giving up.

Image credit fields:
  Matches the TypeScript BlogFrontmatter / ImageCredit shape in
  construction-cis/web/src/types/blog.ts exactly:
    imageCredit:
      photographer: "..."
      photographerUrl: "..."
      source: "Pexels"
      sourceUrl: "..."
"""
from __future__ import annotations

import argparse
import json
import os
import pathlib
import re
import sys

import yaml

# Import from the shared post_processing module (repo root on sys.path already
# when running from the project root, but add it explicitly for safety).
_ROOT = pathlib.Path(__file__).resolve().parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from optimisation_engine.blog_generator.post_processing import fetch_image_for_post  # noqa: E402

ROOT = pathlib.Path(".")


# ---------------------------------------------------------------------------
# .env loader (matches repo convention in blog_presentation_backfill.py)
# ---------------------------------------------------------------------------

def _load_env(env_path: str = ".env") -> None:
    """Load PEXELS_API_KEY (and anything else) from .env into os.environ."""
    p = pathlib.Path(env_path)
    if not p.exists():
        return
    for line in p.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        if key not in os.environ:
            os.environ[key] = val


# ---------------------------------------------------------------------------
# CIS-aware slug → visual query map
# ---------------------------------------------------------------------------

# Keyword fragments found in slugs → preferred Pexels search query.
# Evaluated in order; first match wins.  The fallback is used when no
# keyword matches.
_CONSTRUCTION_QUERY_MAP: list[tuple[str, str]] = [
    ("tax-refund",           "construction worker paperwork refund uk"),
    ("refund",               "construction worker paperwork refund uk"),
    ("gross-payment-status", "construction site manager tablet"),
    ("gross-payment",        "construction site manager tablet"),
    ("vat-reverse-charge",   "construction invoice office"),
    ("vat",                  "construction invoice office"),
    ("self-assessment",      "self employed contractor tax form uk"),
    ("mortgage",             "builder mortgage paperwork uk"),
    ("national-insurance",   "self employed national insurance paperwork"),
    ("penalties",            "hmrc penalty letter construction"),
    ("record-keeping",       "construction records filing binder"),
    ("software",             "construction management software laptop"),
    ("invoice",              "construction invoice paperwork"),
    ("nil-return",           "contractor filing return paperwork"),
    ("monthly-return",       "monthly return filing office"),
    ("return",               "contractor tax return paperwork"),
    ("employment-status",    "contractor self employed assessment"),
    ("subcontractor",        "construction subcontractor worker uk"),
    ("contractor",           "construction contractor manager site"),
    ("limited-company",      "limited company director desk uk"),
    ("sole-trader",          "sole trader self employed worker uk"),
    ("partnership",          "construction partnership handshake business"),
    ("verification",         "contractor identity verification paperwork"),
    ("supply-chain",         "construction supply chain compliance"),
    ("deduction-rates",      "construction payslip deduction paperwork"),
    ("deduction",            "construction payment deduction statement"),
    ("registration",         "construction worker hmrc registration"),
    ("register",             "contractor registration paperwork uk"),
    ("payment",              "construction payment statement documents"),
    ("allowable-expenses",   "construction worker expenses receipts"),
    ("expenses",             "construction expenses receipts business"),
    ("mtd",                  "making tax digital laptop accountant"),
    ("making-tax-digital",   "making tax digital laptop accountant"),
    ("deemed-contractor",    "property developer construction contractor"),
    ("accountant",           "construction accountant meeting office"),
    ("mistakes",             "construction worker paperwork mistake"),
    ("paye",                 "payroll office employee contractor"),
    ("what-is-cis",          "construction industry scheme worker uk"),
    ("what-is",              "construction industry worker uk"),
    ("how-long",             "waiting hourglass paperwork office"),
    ("how-to",               "construction contractor guide paperwork"),
]

# IR35 / contractor-accountancy imagery (professionals, offices, laptops,
# finances) — NEVER construction sites, which would be wildly off-niche here.
_CONTRACTORS_QUERY_MAP: list[tuple[str, str]] = [
    ("umbrella",             "freelancer laptop home office uk"),
    ("dividend",             "business finance documents desk professional"),
    ("pension-schemes",      "pension investment planning documents"),
    ("pension",              "pension retirement planning paperwork desk"),
    ("home-office",          "home office desk laptop professional"),
    ("mileage",              "professional business car uk"),
    ("travel",               "business traveller professional commuter uk"),
    ("training",             "professional training laptop desk"),
    ("allowable-expenses",   "business receipts expenses desk"),
    ("expenses",             "business receipts expenses desk"),
    ("vat-flat-rate",        "business invoice accounting desk"),
    ("vat",                  "business invoice accounting desk laptop"),
    ("corporation-tax",      "business accounts calculator office"),
    ("self-assessment",      "tax return laptop professional uk"),
    ("set-up-limited",       "entrepreneur laptop startup office uk"),
    ("director-salary",      "business finance planning desk"),
    ("salary-dividend",      "business finance planning desk"),
    ("limited-company",      "business director office laptop uk"),
    ("mtd",                  "making tax digital laptop accountant"),
    ("contractor-accountant","accountant meeting professional office"),
    ("what-is-a-contractor", "accountant meeting professional office"),
    ("accountant",           "accountant meeting professional office"),
    ("cest",                 "professional laptop assessment office"),
    ("sds",                  "business contract documents desk"),
    ("status-tests",         "business professional working laptop office"),
    ("status",               "business professional working laptop office"),
    ("msc",                  "business consultants meeting office"),
    ("substitution",         "business professionals team office"),
    ("mutuality",            "business contract meeting office"),
    ("fee-payer",            "business payment invoice office"),
    ("deemed-employment",    "office professional working uk"),
    ("take-home",            "calculator finances desk professional"),
    ("day-rate",             "freelancer professional laptop uk"),
    ("switch",               "business handshake office professional"),
    ("closing",              "business documents office desk"),
    ("self-employment",      "self employed professional laptop uk"),
    ("off-payroll",          "professional contractor office laptop uk"),
    ("tax-planning",         "business finance planning documents desk"),
    ("inside-ir35",          "office professional employee desk uk"),
    ("outside-ir35",         "freelance consultant laptop office uk"),
    ("ir35",                 "business consultant working laptop office uk"),
    ("contractor",           "business professional working laptop uk"),
    ("how-to",               "business professional planning laptop desk uk"),
    ("what-is",              "business professional working laptop office uk"),
]
_CONTRACTORS_FALLBACK = "business professional working laptop office uk"

_SITE_QUERY_MAPS: dict[str, tuple[list[tuple[str, str]], str]] = {
    "construction-cis": (_CONSTRUCTION_QUERY_MAP, "uk construction site worker professional"),
    "contractors-ir35": (_CONTRACTORS_QUERY_MAP, _CONTRACTORS_FALLBACK),
}
_DEFAULT_QUERY_MAP: tuple[list[tuple[str, str]], str] = (
    [],
    "uk accountant professional office desk",
)


def _derive_query(slug: str, site: str) -> str:
    slug_lower = slug.lower()
    query_map, fallback = _SITE_QUERY_MAPS.get(site, _DEFAULT_QUERY_MAP)
    for keyword, query in query_map:
        if keyword in slug_lower:
            return query
    return fallback


def _alternate_query(query: str, attempt: int) -> str:
    """Return a variant query for dedup retry."""
    suffixes = [" uk professional", " site uk", " industry professional uk"]
    return query + suffixes[(attempt - 1) % len(suffixes)]


# ---------------------------------------------------------------------------
# Pexels fetch with dedup
# ---------------------------------------------------------------------------

def _fetch_fresh(query: str, used_ids: set) -> dict | None:
    """Fetch from Pexels (per_page=5), skip already-used IDs.
    Falls back to alternate query variants if needed.
    Returns the photo info dict or None.
    """
    import httpx  # available in the repo venv (used by post_processing)

    api_key = os.getenv("PEXELS_API_KEY", "")
    if not api_key:
        return None

    def _try_query(q: str) -> dict | None:
        try:
            r = httpx.get(
                "https://api.pexels.com/v1/search",
                headers={"Authorization": api_key},
                params={"query": q, "per_page": 5, "orientation": "landscape"},
                timeout=15.0,
            )
            if r.status_code >= 400:
                print(f"  WARN  Pexels HTTP {r.status_code} for query '{q}'")
                return None
            photos = r.json().get("photos") or []
            for p in photos:
                pid = p.get("id")
                if pid and str(pid) in used_ids:
                    continue  # already used on this site
                return {
                    "id": str(pid),
                    "url": p["src"]["large"],
                    "alt": p.get("alt", q),
                    "photographer": p.get("photographer", ""),
                    "photographer_url": p.get("photographer_url", ""),
                    "pexels_url": p.get("url", ""),
                }
        except Exception as exc:
            print(f"  WARN  Pexels error for '{q}': {exc}")
        return None

    # Primary query
    result = _try_query(query)
    if result:
        return result
    # Try alternate variants (up to 2)
    for attempt in range(1, 3):
        alt_q = _alternate_query(query, attempt)
        result = _try_query(alt_q)
        if result:
            return result
    return None


# ---------------------------------------------------------------------------
# Frontmatter manipulation
# ---------------------------------------------------------------------------

def _yq(val: str) -> str:
    """Safely double-quote a YAML scalar value."""
    return '"' + str(val).replace("\\", "\\\\").replace('"', '\\"') + '"'


def _has_key(fm_text: str, key: str) -> bool:
    return bool(re.search(rf"(?m)^{re.escape(key)}\s*:", fm_text))


def _insert_image_block(fm_text: str, photo: dict) -> str:
    """Insert image + imageCredit into frontmatter text.

    Strategy: insert after the `author:` line if present; otherwise before the
    first line that starts with `h1:`, `summary:`, or (final fallback) at the
    end of the frontmatter.
    """
    block = (
        f"image: {_yq(photo['url'])}\n"
        f"imageCredit:\n"
        f"  photographer: {_yq(photo['photographer'])}\n"
        f"  photographerUrl: {_yq(photo['photographer_url'])}\n"
        f"  source: \"Pexels\"\n"
        f"  sourceUrl: {_yq(photo['pexels_url'])}\n"
    )

    lines = fm_text.split("\n")
    insert_after = -1

    # Prefer: after `author:` line
    for i, ln in enumerate(lines):
        if re.match(r"^author\s*:", ln):
            insert_after = i
            break

    # Fallback: before `h1:` or `summary:`
    if insert_after == -1:
        for i, ln in enumerate(lines):
            if re.match(r"^(?:h1|summary)\s*:", ln):
                insert_after = i - 1
                break

    if insert_after == -1:
        insert_after = len(lines) - 1

    new_lines = lines[: insert_after + 1] + block.rstrip("\n").split("\n") + lines[insert_after + 1 :]
    return "\n".join(new_lines)


def _also_insert_alt(fm_text: str, alt: str) -> str:
    """Insert altText after image: line if not already present."""
    if _has_key(fm_text, "altText"):
        return fm_text
    lines = fm_text.split("\n")
    new_lines: list[str] = []
    for ln in lines:
        new_lines.append(ln)
        if re.match(r"^image\s*:", ln):
            new_lines.append(f"altText: {_yq(alt)}")
    return "\n".join(new_lines)


def split_frontmatter(text: str):
    """Return (fm_text, closing_marker_onward). fm_text is None if no valid FM."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    # fm_text: text between first --- and closing ---
    # rest: the closing ---\n + body
    return text[3:end], text[end:]


def _rebuild(fm_text: str, rest: str) -> str:
    return "---" + fm_text + rest


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(
        description="Pexels hero-image frontmatter backfill for a site's blog corpus."
    )
    ap.add_argument("--site", required=True, metavar="KEY",
                    help="Site key (reads sites/<key>.json for blogContentDir).")
    ap.add_argument("--execute", action="store_true",
                    help="Write changes to disk. Default is dry-run (no writes).")
    ap.add_argument("--only", nargs="+", metavar="SLUG",
                    help="Restrict to these slugs only.")
    ap.add_argument("--env", default=".env",
                    help="Path to .env file (default: .env).")
    args = ap.parse_args()

    # Load env so PEXELS_API_KEY is available to fetch_image_for_post
    _load_env(args.env)

    if not os.getenv("PEXELS_API_KEY"):
        print("ERROR: PEXELS_API_KEY not set and not found in .env")
        return 1

    # Load site config
    cfg_path = ROOT / "sites" / f"{args.site}.json"
    if not cfg_path.exists():
        print(f"ERROR: site config not found: {cfg_path}")
        return 1
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    blog_dir = ROOT / cfg["paths"]["blogContentDir"]

    if not blog_dir.exists():
        print(f"ERROR: blog dir not found: {blog_dir}")
        return 1

    # Dedup cache
    cache_dir = ROOT / "optimisation_engine" / ".cache"
    cache_dir.mkdir(parents=True, exist_ok=True)
    used_cache_path = cache_dir / f"pexels_used_{args.site}.json"
    if used_cache_path.exists():
        used_data: dict = json.loads(used_cache_path.read_text(encoding="utf-8"))
    else:
        used_data = {"ids": [], "urls": []}
    used_ids: set = set(str(x) for x in used_data.get("ids", []))

    # Collect files to process
    all_files = sorted(blog_dir.glob("*.md"))
    if args.only:
        only_set = set(args.only)
        all_files = [f for f in all_files if f.stem in only_set]
        missing = only_set - {f.stem for f in all_files}
        if missing:
            print(f"WARN  slugs not found in blog dir: {', '.join(sorted(missing))}")

    mode = "EXECUTE" if args.execute else "DRY-RUN"
    print(f"{'=' * 70}")
    print(f"blog_image_backfill  site={args.site}  mode={mode}")
    print(f"blog dir: {blog_dir}")
    print(f"used-ID cache: {used_cache_path}  ({len(used_ids)} IDs already used)")
    print(f"{'=' * 70}")

    n_already = 0
    n_skipped = 0
    n_written = 0
    n_no_photo = 0
    newly_used_ids: list[str] = []
    newly_used_urls: list[str] = []

    for path in all_files:
        slug = path.stem
        raw = path.read_text(encoding="utf-8")
        fm_text, rest = split_frontmatter(raw)

        if fm_text is None:
            print(f"  SKIP  {slug:<55}  (no frontmatter)")
            n_skipped += 1
            continue

        if _has_key(fm_text, "image"):
            # Already has an image field — check if it's non-empty
            m = re.search(r"(?m)^image\s*:\s*(.+)$", fm_text)
            if m and m.group(1).strip().strip('"').strip("'"):
                print(f"  skip  {slug:<55}  (image already set)")
                n_already += 1
                continue

        # Derive query and fetch photo
        query = _derive_query(slug, args.site)
        photo = _fetch_fresh(query, used_ids)

        if photo is None:
            print(f"  WARN  {slug:<55}  no photo found (query='{query}')")
            n_no_photo += 1
            continue

        print(
            f"  {'WRITE' if args.execute else 'would write'}  {slug:<55}  "
            f"photo_id={photo['id']}  query='{query}'"
        )
        print(f"         url={photo['url']}")
        print(f"         alt={photo['alt']!r}  photographer={photo['photographer']!r}")

        if args.execute:
            # Insert image + imageCredit into frontmatter
            new_fm = _insert_image_block(fm_text, photo)
            # Insert altText if absent
            if not _has_key(fm_text, "altText"):
                new_fm = _also_insert_alt(new_fm, photo["alt"])
            new_raw = _rebuild(new_fm, rest)

            # Validate the new frontmatter parses cleanly
            new_fm_check, _ = split_frontmatter(new_raw)
            try:
                yaml.safe_load(new_fm_check)
            except yaml.YAMLError as exc:
                print(f"  ERROR  {slug}: post-write YAML validation failed: {exc}")
                print(f"         REVERTING (file not written).")
                n_skipped += 1
                continue

            path.write_text(new_raw, encoding="utf-8")
            n_written += 1

        # Track used IDs so we don't repeat within this run
        if photo["id"]:
            used_ids.add(photo["id"])
            newly_used_ids.append(photo["id"])
        if photo["url"]:
            newly_used_urls.append(photo["url"])

    # Persist used-cache on execute
    if args.execute and newly_used_ids:
        updated_used = {
            "ids": used_data.get("ids", []) + newly_used_ids,
            "urls": used_data.get("urls", []) + newly_used_urls,
        }
        used_cache_path.write_text(json.dumps(updated_used, indent=2), encoding="utf-8")
        print(f"\n  [cache] wrote {len(newly_used_ids)} new IDs to {used_cache_path}")

    print(f"\n{'=' * 70}")
    print(
        f"DONE  mode={mode}  already={n_already}  "
        f"{'written' if args.execute else 'would-write'}={n_written or (len(all_files) - n_already - n_skipped - n_no_photo)}  "
        f"no-photo={n_no_photo}  skipped={n_skipped}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
