"""Populate monitored_pages from the rewrite tracker + middleware redirects.

Run once: pulls baseline GSC (last 28d) per slug in batch and inserts a row.
"""
import re
import sys
from pathlib import Path
from datetime import date, timedelta

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql, _esc


def extract_rewrites(tracker_text: str) -> list[tuple[int, str, str]]:
    out = []
    for line in tracker_text.splitlines():
        if not line.startswith("| "):
            continue
        cells = [c.strip() for c in line.split("|")[1:-1]]
        if len(cells) < 5 or cells[0] in ("#", "---"):
            continue
        try:
            n = int(cells[0])
        except ValueError:
            continue
        status_cell = next((c for c in cells if "✅" in c), None)
        if not status_cell:
            continue
        slug = cells[1]
        date_str = "2026-05-21"
        for c in cells:
            m = re.search(r"(20\d{2}-\d{2}-\d{2})", c)
            if m:
                date_str = m.group(1)
                break
        out.append((n, slug, date_str))
    return out


def extract_category_map(mw_text: str) -> dict[str, str]:
    m = re.search(r"SLUG_TO_CATEGORY_MAP[^{]*\{([^}]+)\}", mw_text, re.DOTALL)
    if not m:
        return {}
    body = m.group(1)
    out = {}
    for line in body.splitlines():
        mm = re.match(r'\s*"([^"]+)":\s*"([^"]+)"', line)
        if mm:
            out[mm.group(1)] = mm.group(2)
    return out


def pull_baselines_batch(site_key: str, slugs: list[str]) -> dict[str, dict]:
    """Pull baselines for all slugs in one query."""
    if not slugs:
        return {}
    out: dict[str, dict] = {}
    # Process in batches of 30 slugs each to keep queries small
    for i in range(0, len(slugs), 30):
        batch = slugs[i:i+30]
        ors = " OR ".join(f"page_url ILIKE '%{s}%'" for s in batch)
        # Note: a page can match multiple slug patterns if one is substring of another.
        # We use a slug-tag trick via regexp_replace to assign each row to a single slug.
        cases = " ".join(f"WHEN page_url ILIKE '%/{s}' OR page_url ILIKE '%/{s}/' THEN {_esc(s)}" for s in batch)
        sql = f"""
        WITH tagged AS (
          SELECT CASE {cases} ELSE NULL END AS matched_slug,
                 clicks, impressions, position
          FROM gsc_query_data
          WHERE site_key='{site_key}'
            AND ({ors})
            AND date >= CURRENT_DATE - INTERVAL '28 days'
        )
        SELECT matched_slug,
               COALESCE(SUM(clicks),0) AS clicks,
               COALESCE(SUM(impressions),0) AS impressions,
               COALESCE(AVG(position),0)::NUMERIC(5,2) AS position
        FROM tagged
        WHERE matched_slug IS NOT NULL
        GROUP BY matched_slug
        """
        rows = _sql(sql)
        for r in rows:
            out[r["matched_slug"]] = {
                "clicks": int(r["clicks"]),
                "impressions": int(r["impressions"]),
                "position": float(r["position"]) if r["position"] else None,
            }
    return out


def main() -> int:
    tracker = (ROOT / "docs/page_rewrite_tracker.md").read_text(encoding="utf-8")
    middleware = (ROOT / "Property/web/src/middleware.ts").read_text(encoding="utf-8")
    cat_map = extract_category_map(middleware)
    rewrites = extract_rewrites(tracker)

    redirects = [
        ("hmo-licensing-costs-tax-deductible", "/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords"),
        ("property-accounting-software-uk", "/blog/portfolio-management/property-accounting-software-uk-2026"),
        ("landlord-accounting-software-uk-2026", "/blog/making-tax-digital-mtd/landlord-accounting-software-uk-best-options-2026"),
        ("2027-property-tax-rates-cgt-capital-gains-changes", "/blog/capital-gains-tax/cgt-property-2027-rate-changes-uk-landlords"),
        ("mtd-10000-threshold-when-does-it-apply", "/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions"),
    ]

    # Skip slugs already in monitored_pages
    existing = {r["slug"] for r in _sql("SELECT slug FROM monitored_pages WHERE site_key='property'")}
    print(f"Already in DB: {len(existing)}")

    monitor_until = (date.today() + timedelta(days=90)).isoformat()
    site = "property"
    skipped_no_cat = []

    todo_rewrites = [(n, s, d) for (n, s, d) in rewrites if s not in existing]
    todo_redirects = [(s, t) for (s, t) in redirects if s not in existing]
    print(f"To insert: {len(todo_rewrites)} rewrites + {len(todo_redirects)} redirects")

    all_slugs = [s for _, s, _ in todo_rewrites] + [s for s, _ in todo_redirects]
    print(f"Pulling baselines for {len(all_slugs)} slugs (batched)...")
    baselines = pull_baselines_batch(site, all_slugs)
    print(f"Got baselines for {len(baselines)} of them")

    inserted = 0
    for n, slug, rewrite_date in todo_rewrites:
        cat = cat_map.get(slug)
        if not cat:
            skipped_no_cat.append((n, slug))
            continue
        page_url = f"/blog/{cat}/{slug}"
        bl = baselines.get(slug, {"clicks": 0, "impressions": 0, "position": None})
        notes = f"Tracker #{n}, rewrite during 2026-05-21 multi-session pass"
        sql = f"""
        INSERT INTO monitored_pages
          (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type,
           baseline_clicks, baseline_impressions, baseline_position, notes)
        VALUES
          ({_esc(site)}, {_esc(slug)}, {_esc(page_url)},
           {_esc(rewrite_date)}, {_esc(monitor_until)}, 'rewrite',
           {bl['clicks']}, {bl['impressions']},
           {bl['position'] if bl['position'] is not None else 'NULL'},
           {_esc(notes)})
        ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING
        """
        _sql(sql)
        inserted += 1

    for slug, target in todo_redirects:
        page_url = f"/blog/{slug}"
        bl = baselines.get(slug, {"clicks": 0, "impressions": 0, "position": None})
        notes = f"Retired slug, 301 to {target} during 2026-05-21 cleanup"
        sql = f"""
        INSERT INTO monitored_pages
          (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type,
           redirect_target, baseline_clicks, baseline_impressions, baseline_position, notes)
        VALUES
          ({_esc(site)}, {_esc(slug)}, {_esc(page_url)},
           '2026-05-21', {_esc(monitor_until)}, 'redirect',
           {_esc(target)},
           {bl['clicks']}, {bl['impressions']},
           {bl['position'] if bl['position'] is not None else 'NULL'},
           {_esc(notes)})
        ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING
        """
        _sql(sql)
        inserted += 1

    print(f"\nDone. Inserted {inserted} new rows.")
    if skipped_no_cat:
        print(f"Skipped (no category mapping): {len(skipped_no_cat)}")
        for n, s in skipped_no_cat:
            print(f"  #{n}: {s}")
    rows = _sql("SELECT rewrite_type, COUNT(*) AS n FROM monitored_pages GROUP BY rewrite_type")
    for r in rows:
        print(f"  {r['rewrite_type']}: {r['n']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
