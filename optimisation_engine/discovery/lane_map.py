"""
Specialism-lane analysis: cross competitor sitemap slugs + ranked keywords + our
own blog coverage into the canonical lane taxonomy at sites/<site>.discovery.json
["lanes"], to find lanes a competitor owns, lanes nobody owns, and lanes where
our own coverage is thin relative to competitors.

Inputs:
  (a) briefs/<site>/_competitor_urls.json: per-competitor sitemap slugs (always present)
  (b) dataforseo_competitor_data (Supabase): ranked keywords per competitor domain,
      if any rows exist with a non-null ranked_keyword for a domain that isn't our
      own (own domain's ranked_keyword rows are OUR rankings, not competitor data)
  (c) <blogContentDir>/*.md slugs (from sites/<site>.json paths.blogContentDir):
      our own coverage

Output: docs/<site_key>/lane_map_<date>.md

CLI:
  python -m optimisation_engine.discovery.lane_map property
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql, _esc  # noqa: E402
from optimisation_engine.config import get_site             # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

TODAY = date.today().isoformat()

# A lane needs at least this many sitemap URLs (summed across competitors)
# before we'll call ownership/ownability on it. Otherwise 1 stray URL reads
# as a "40% share" and that's noise, not a finding.
MIN_LANE_URLS = 3
DOMINANT_SHARE = 0.40  # > this share for one competitor = lane they own


# ---------------------------------------------------------------------------
# Lane assignment
# ---------------------------------------------------------------------------

def _normalize(text: str) -> str:
    """Slugify to hyphens so URL slugs (already hyphenated) and space-separated
    keyword phrases both match the same hyphenated lane token markers (the
    topic_buckets/CLUSTERS style already used in this repo)."""
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def assign_lane(text_or_slug: str, lanes: list[dict], negative_tokens: list[str] | None = None) -> str | None:
    """First lane (in list order) whose token appears as a hyphen-bounded unit
    of the normalised text wins. Same marker-substring approach as
    assign_cluster() in scripts/property_sitemap_sweep_v2.py (~line 335);
    reimplemented rather than imported because assign_cluster is hardcoded to
    its own CLUSTERS constant, not parameterised by an arbitrary lane list.

    Both sides get padded with hyphens before the substring check so a short
    token like "vat" can't false-match inside "private" or "renovation"
    (assign_cluster avoids the same trap ad hoc, by hand-anchoring individual
    markers such as "mtd-", "-vat"; padding does it for every token at once).
    """
    s = _normalize(text_or_slug)
    if not s:
        return None
    padded = f"-{s}-"
    # Negative tokens veto before any lane can match: listing/portal/navigational
    # phrases ("for sale", "login", "rightmove") share single words with real
    # lane tokens ("commercial", "scotland") and would otherwise slip through.
    for tok in negative_tokens or []:
        if f"-{_normalize(tok)}-" in padded:
            return None
    for lane in lanes:
        for tok in lane["tokens"]:
            if f"-{tok}-" in padded:
                return lane["key"]
    return None


def _load_lanes(site_key: str) -> list[dict]:
    cfg = json.loads((ROOT / "sites" / f"{site_key}.discovery.json").read_text(encoding="utf-8"))
    lanes = cfg.get("lanes")
    if not lanes:
        raise ValueError(f"sites/{site_key}.discovery.json has no 'lanes' key")
    return lanes, cfg


def _blog_dir(site_key: str) -> Path:
    site_cfg_path = ROOT / "sites" / f"{site_key}.json"
    if site_cfg_path.exists():
        site_cfg = json.loads(site_cfg_path.read_text(encoding="utf-8"))
        rel = site_cfg.get("paths", {}).get("blogContentDir")
        if rel:
            return ROOT / rel
    # Every real site in sites/*.json carries paths.blogContentDir. If it's
    # missing, the only honest answer is "I don't know" — the previous property
    # hardcode here silently reported Property's coverage as the other site's.
    raise ValueError(
        f"sites/{site_key}.json has no paths.blogContentDir; cannot locate "
        f"{site_key}'s blog dir (refusing to guess)."
    )


# ---------------------------------------------------------------------------
# Data loaders
# ---------------------------------------------------------------------------

def _load_sitemap_counts(site_key: str, lanes: list[dict], negs: list[str] | None = None) -> tuple[dict, dict]:
    """Returns (counts[domain][lane_or_'unassigned'] = url_count, per_domain_total)."""
    path = ROOT / "briefs" / site_key / "_competitor_urls.json"
    negs = negs or []
    if not path.exists():
        print(f"[lane_map] {path} not found. No sitemap data")
        return {}, {}
    data = json.loads(path.read_text(encoding="utf-8"))
    counts: dict[str, dict[str, int]] = {}
    totals: dict[str, int] = {}
    for domain, urls in data.items():
        counts[domain] = defaultdict(int)
        for entry in urls:
            slug = entry.get("slug") or entry.get("url") or ""
            lane = assign_lane(slug, lanes, negs) or "unassigned"
            counts[domain][lane] += 1
        totals[domain] = sum(counts[domain].values())
    return counts, totals


def _load_dfs_volume(site_key: str, own_domain: str, lanes: list[dict], negs: list[str] | None = None) -> tuple[dict, bool]:
    """Returns (volume[domain][lane] = summed search_volume, has_data).
    Only rows for domains other than our own count as competitor data (rows
    keyed to our own domain in dataforseo_competitor_data are OUR rankings).
    """
    rows = _sql(f"""
        SELECT competitor_domain, ranked_keyword, search_volume
        FROM dataforseo_competitor_data
        WHERE site_key = {_esc(site_key)}
          AND ranked_keyword IS NOT NULL
          AND competitor_domain != {_esc(own_domain)}
    """)
    negs = negs or []
    volume: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    for r in rows:
        lane = assign_lane(r["ranked_keyword"], lanes, negs) or "unassigned"
        volume[r["competitor_domain"]][lane] += int(r.get("search_volume") or 0)
    return volume, bool(rows)


def _load_our_counts(site_key: str, lanes: list[dict], negs: list[str] | None = None) -> dict:
    blog_dir = _blog_dir(site_key)
    negs = negs or []
    counts: dict[str, int] = defaultdict(int)
    if not blog_dir.exists():
        print(f"[lane_map] {blog_dir} not found. Our coverage counts as 0 everywhere")
        return counts
    for p in blog_dir.glob("*.md"):
        lane = assign_lane(p.stem, lanes, negs) or "unassigned"
        counts[lane] += 1
    return counts


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def build_lane_map(site_key: str) -> dict:
    lanes, disc_cfg = _load_lanes(site_key)
    lane_keys = [l["key"] for l in lanes]
    own_domain = disc_cfg.get("ownDomain", "")

    negs = disc_cfg.get("lane_negative_tokens") or []
    sitemap_counts, sitemap_totals = _load_sitemap_counts(site_key, lanes, negs)
    dfs_volume, has_dfs = _load_dfs_volume(site_key, own_domain, lanes, negs)
    our_counts = _load_our_counts(site_key, lanes, negs)

    competitors = sorted(sitemap_counts.keys())
    columns = lane_keys + ["unassigned"]

    # --- lanes they own / lanes ownable ---
    lane_totals = {lk: sum(sitemap_counts[d].get(lk, 0) for d in competitors) for lk in lane_keys}
    owned, ownable = [], []
    for lk in lane_keys:
        total = lane_totals[lk]
        if total < MIN_LANE_URLS:
            continue
        shares = [(d, sitemap_counts[d].get(lk, 0) / total) for d in competitors if sitemap_counts[d].get(lk, 0)]
        if not shares:
            continue
        top_domain, top_share = max(shares, key=lambda x: x[1])
        vol = dfs_volume.get(top_domain, {}).get(lk, 0)
        entry = {"lane": lk, "domain": top_domain, "share": top_share,
                  "count": sitemap_counts[top_domain].get(lk, 0), "total": total, "volume": vol}
        if top_share > DOMINANT_SHARE:
            owned.append(entry)
        else:
            ownable.append(entry)

    # --- holes we plug: our_count bottom-quartile vs competitor max, where competitors have real coverage ---
    ratios = []
    for lk in lane_keys:
        comp_max = max((sitemap_counts[d].get(lk, 0) for d in competitors), default=0)
        if comp_max == 0:
            continue
        ratios.append({"lane": lk, "our_count": our_counts.get(lk, 0), "comp_max": comp_max,
                        "ratio": our_counts.get(lk, 0) / comp_max})
    ratios.sort(key=lambda x: x["ratio"])
    q_cutoff = max(1, -(-len(ratios) // 4))  # ceil(n/4)
    holes = ratios[:q_cutoff]

    return {
        "site_key": site_key, "lanes": lanes, "competitors": competitors,
        "columns": columns, "sitemap_counts": sitemap_counts, "sitemap_totals": sitemap_totals,
        "dfs_volume": dfs_volume, "has_dfs": has_dfs, "our_counts": our_counts,
        "owned": owned, "ownable": ownable, "holes": holes,
    }


def _fmt_pct(x: float) -> str:
    return f"{x * 100:.0f}%"


def render_md(result: dict) -> str:
    site_key = result["site_key"]
    competitors = result["competitors"]
    columns = result["columns"]
    lines = [f"# {site_key}: specialism lane map ({TODAY})", ""]
    lines.append(f"Lanes: `sites/{site_key}.discovery.json` [\"lanes\"] ({len(result['lanes'])} lanes)")
    lines.append(f"Competitors (sitemap slugs): `briefs/{site_key}/_competitor_urls.json` ({len(competitors)} domains)")
    if result["has_dfs"]:
        lines.append("Competitor keyword data: dataforseo_competitor_data has rows for competitor domains. Volume shown where available.")
    else:
        lines.append("Competitor keyword data: no DFS data yet, sitemap-only view.")
    lines.append("")

    lines.append("## Competitor x lane matrix (sitemap URL counts)")
    lines.append("")
    header = "| Domain | " + " | ".join(columns) + " | total |"
    sep = "|---|" + "---:|" * (len(columns) + 1)
    lines.append(header)
    lines.append(sep)
    for d in competitors:
        row = [str(result["sitemap_counts"][d].get(c, 0)) for c in columns]
        lines.append(f"| {d} | " + " | ".join(row) + f" | {result['sitemap_totals'][d]} |")
    our_row = [str(result["our_counts"].get(c, 0)) for c in columns]
    our_total = sum(result["our_counts"].values())
    lines.append(f"| **OUR** | " + " | ".join(our_row) + f" | {our_total} |")
    lines.append("")

    lines.append("## Lanes they own")
    lines.append("")
    if not result["owned"]:
        lines.append(f"None. No competitor exceeds {_fmt_pct(DOMINANT_SHARE)} share of any lane with >= {MIN_LANE_URLS} URLs.")
    for e in sorted(result["owned"], key=lambda x: -x["share"]):
        vol_note = f", ~{e['volume']} vol" if e["volume"] else ""
        lines.append(f"- **{e['lane']}**: {e['domain']} owns {_fmt_pct(e['share'])} ({e['count']}/{e['total']} URLs{vol_note})")
    lines.append("")

    lines.append("## Lanes ownable")
    lines.append("")
    if not result["ownable"]:
        lines.append("None. Every lane with enough data has a dominant competitor.")
    for e in sorted(result["ownable"], key=lambda x: -x["total"]):
        lines.append(f"- **{e['lane']}**: no competitor >{_fmt_pct(DOMINANT_SHARE)} share (max = {e['domain']} {_fmt_pct(e['share'])}, {e['total']} URLs total)")
    lines.append("")

    lines.append("## Holes we plug")
    lines.append("")
    lines.append("Our page count is bottom-quartile relative to competitor max, among lanes where at least one competitor has real coverage.")
    lines.append("")
    for e in result["holes"]:
        lines.append(f"- **{e['lane']}**: our {e['our_count']} vs competitor max {e['comp_max']} (ratio {e['ratio']:.2f})")
    lines.append("")

    return "\n".join(lines)


def _sanity_checks(result: dict) -> None:
    """Non-fatal spot-checks named in the brief: provestor top lane should skew
    mtd, uklandlordtax should skew non_resident, ONLY if those domains are
    actually present in _competitor_urls.json. Prints, never asserts/raises,
    since real-world sitemap slugs are messy and this is a sanity read, not a
    contract the data must honour.
    """
    top_lane = {}
    for d in result["competitors"]:
        counts = {c: n for c, n in result["sitemap_counts"][d].items() if c != "unassigned"}
        if counts:
            top_lane[d] = max(counts.items(), key=lambda x: x[1])
    print("[lane_map] top lane per competitor:", {d: f"{lk} ({n})" for d, (lk, n) in top_lane.items()})

    for domain, expected_lane in [("provestor.co.uk", "mtd"), ("uklandlordtax.co.uk", "non_resident")]:
        if domain not in result["competitors"]:
            print(f"[lane_map] sanity check skipped: {domain} not in _competitor_urls.json")
            continue
        lk, n = top_lane.get(domain, (None, 0))
        status = "OK" if lk == expected_lane else "MISMATCH"
        print(f"[lane_map] sanity check {domain}: top lane = {lk} ({n} URLs), expected {expected_lane} -> {status}")


def apply_to_candidates(site_key: str) -> None:
    """Update the lane column on discovery_candidates rows via assign_lane, if
    that table exists. Skips cleanly (with a message) if it doesn't: it
    doesn't exist in Supabase as of this writing.
    """
    exists = _sql("SELECT 1 FROM information_schema.tables WHERE table_name = 'discovery_candidates'")
    if not exists:
        print("[lane_map] discovery_candidates table not found. Skipping apply step")
        return
    lanes, disc_cfg = _load_lanes(site_key)
    negs = disc_cfg.get("lane_negative_tokens") or []
    # Schema per migration 20260815000001: the text column is `candidate`.
    rows = _sql(f"SELECT id, candidate FROM discovery_candidates WHERE site_key = {_esc(site_key)}")
    updated = 0
    for r in rows:
        text = r.get("candidate") or ""
        lane = assign_lane(text, lanes, negs)
        if lane:
            _sql(f"UPDATE discovery_candidates SET lane = {_esc(lane)} WHERE id = {_esc(r['id'])}")
            updated += 1
    print(f"[lane_map] discovery_candidates: updated lane on {updated}/{len(rows)} rows")


def main() -> None:
    parser = argparse.ArgumentParser(description="Specialism-lane analysis")
    parser.add_argument("site_key", help="site_key e.g. property")
    parser.add_argument("--apply", action="store_true", help="also run apply_to_candidates")
    args = parser.parse_args()

    get_site(args.site_key)  # validates site exists, raises if not

    result = build_lane_map(args.site_key)
    _sanity_checks(result)

    out_dir = ROOT / "docs" / args.site_key
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"lane_map_{TODAY}.md"
    out_path.write_text(render_md(result), encoding="utf-8")
    print(f"[lane_map] wrote {out_path}")

    if args.apply:
        apply_to_candidates(args.site_key)


if __name__ == "__main__":
    # Self-check: assign_lane picks the right lane, normalises slugs and
    # space-separated keyword phrases the same way, and unmatched text is None.
    demo_lanes = [
        {"key": "mtd", "tokens": ["mtd", "making-tax-digital"]},
        {"key": "cgt_disposal", "tokens": ["capital-gains", "cgt"]},
    ]
    assert assign_lane("mtd-quarterly-updates-for-landlords", demo_lanes) == "mtd"
    assert assign_lane("capital gains tax second home", demo_lanes) == "cgt_disposal"
    assert assign_lane("best boiler cover for landlords", demo_lanes) is None
    assert assign_lane("", demo_lanes) is None
    print("[lane_map] self-check OK")

    main()
