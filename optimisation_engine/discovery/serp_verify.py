"""
SERP winnability check for gap-discovery candidates.

Reads briefs/<site>/discovery_2026-07/triage.json, picks top CANDIDATE_LIMIT
WRONG_PAGE + UNSERVED entries, hits DDG (or Serper with --serper flag), and
classifies each as "winnable-likely" or "review".

Winnability heuristic (per plan):
  ≥ 2 competitor-universe domains in top 10
  AND no gov.uk / nhs.uk / wikipedia.org wall at positions 1-3
  → "winnable-likely"; else "review"

Rate limiting: DDG enforces via ddg_serp_client (2s default); we respect it.
Per-query/day cache is embedded in the output JSON (keyed by query), so
re-running skips already-checked queries.

Output: briefs/<site>/discovery_2026-07/serp_checks.json

CLI:
  python -m optimisation_engine.discovery.serp_verify --site property
  python -m optimisation_engine.discovery.serp_verify --site property --limit 3
  python -m optimisation_engine.discovery.serp_verify --site property --serper
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.config import get_site  # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
CANDIDATE_LIMIT = 40        # top N candidates to verify per site
WALL_DOMAINS = {"gov.uk", "nhs.uk", "wikipedia.org", "www.gov.uk", "www.nhs.uk"}
MIN_COMPETITOR_HITS = 2     # number of competitor-universe domains needed in top 10
TODAY = date.today().isoformat()


def _root_domain(url: str) -> str:
    if not url:
        return ""
    netloc = urlparse(url).netloc.lower().lstrip("www.")
    return netloc.split(":")[0]


def _has_wall(results: list[dict]) -> bool:
    """True if a gov/nhs/wiki domain holds any of the first 3 positions."""
    top3 = [r for r in results if int(r.get("position", 99)) <= 3]
    return any(_root_domain(r.get("link", "")) in WALL_DOMAINS for r in top3)


def _competitor_hits(results: list[dict], our_domain: str) -> int:
    """Count distinct domains in top 10 that are not ours and not walls."""
    top10 = [r for r in results if int(r.get("position", 99)) <= 10]
    domains = {
        _root_domain(r.get("link", ""))
        for r in top10
        if _root_domain(r.get("link", "")) not in WALL_DOMAINS
        and _root_domain(r.get("link", "")) != our_domain
        and _root_domain(r.get("link", ""))
    }
    return len(domains)


def _winnable(results: list[dict], our_domain: str) -> str:
    if not results:
        return "review"
    if _has_wall(results):
        return "review"
    if _competitor_hits(results, our_domain) >= MIN_COMPETITOR_HITS:
        return "winnable-likely"
    return "review"


def _fetch_ddg(query: str, site_key: str) -> list[dict]:
    from optimisation_engine.clients.ddg_serp_client import fetch_organic_results
    return fetch_organic_results(query, num=12, site_key=site_key)


def _fetch_serper(query: str, site_key: str) -> list[dict]:
    from optimisation_engine.clients.serper_client import fetch_top_organic_urls
    return fetch_top_organic_urls(query, num=12, site_key=site_key)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def verify(site_key: str, limit: int = CANDIDATE_LIMIT, use_serper: bool = False) -> dict:
    site = get_site(site_key)
    our_domain = _root_domain("https://" + site.get("domain", ""))

    triage_path = ROOT / "briefs" / site_key / "discovery_2026-07" / "triage.json"
    if not triage_path.exists():
        raise FileNotFoundError(
            f"triage.json not found at {triage_path}. "
            "Run query_triage first: python -m optimisation_engine.discovery.query_triage --site {site_key}"
        )

    triage = json.loads(triage_path.read_text(encoding="utf-8"))

    # Load existing cache to skip already-checked queries today
    out_path = ROOT / "briefs" / site_key / "discovery_2026-07" / "serp_checks.json"
    cache: dict = {}
    if out_path.exists():
        try:
            cache = json.loads(out_path.read_text(encoding="utf-8"))
        except Exception:
            cache = {}

    candidates = [r for r in triage if r["class"] in ("WRONG_PAGE", "UNSERVED")]
    candidates = candidates[:limit]

    print(f"[serp_verify] {site_key}: {len(candidates)} candidates to check (limit={limit})")
    fetcher = _fetch_serper if use_serper else _fetch_ddg

    for i, entry in enumerate(candidates):
        q = entry["query"]
        if q in cache and cache[q].get("checked_date") == TODAY:
            print(f"  [{i+1}/{len(candidates)}] cached: {q[:60]}")
            continue

        print(f"  [{i+1}/{len(candidates)}] checking: {q[:60]}")
        try:
            results = fetcher(q, site_key)
        except Exception as exc:
            print(f"    error: {exc}")
            results = []

        verdict = _winnable(results, our_domain)
        cache[q] = {
            "query": q,
            "checked_date": TODAY,
            "source": "serper" if use_serper else "ddg",
            "verdict": verdict,
            "results": results,
            "impressions": entry.get("impressions", 0),
            "class": entry["class"],
        }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(cache, indent=2, default=str), encoding="utf-8")
    print(f"[serp_verify] written: {out_path}")
    return cache


def main() -> None:
    parser = argparse.ArgumentParser(description="SERP winnability check for gap candidates")
    parser.add_argument("--site", required=True)
    parser.add_argument("--limit", type=int, default=CANDIDATE_LIMIT,
                        help=f"Max candidates to check (default {CANDIDATE_LIMIT})")
    parser.add_argument("--serper", action="store_true", help="Use Serper instead of DDG")
    args = parser.parse_args()

    result = verify(args.site, limit=args.limit, use_serper=args.serper)

    from collections import Counter
    counts = Counter(v["verdict"] for v in result.values())
    print(f"[serp_verify] verdicts: {dict(counts)}")


if __name__ == "__main__":
    # Self-check
    fake_results = [
        {"position": 1, "link": "https://www.gov.uk/foo"},
        {"position": 2, "link": "https://competitorA.co.uk/bar"},
    ]
    assert _has_wall(fake_results)
    assert _winnable(fake_results, "us.co.uk") == "review"

    open_results = [
        {"position": 1, "link": "https://compA.co.uk/x"},
        {"position": 2, "link": "https://compB.co.uk/x"},
        {"position": 3, "link": "https://compC.co.uk/x"},
    ]
    assert not _has_wall(open_results)
    assert _winnable(open_results, "us.co.uk") == "winnable-likely"
    print("self-check OK")
    main()
