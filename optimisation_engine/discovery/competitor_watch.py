"""
Continuous competitor sitemap monitor.

Weekly (or on-demand) diff of each configured competitor's sitemap (falling
back to RSS/Atom when the sitemap is unreachable) against `competitor_urls_seen`.
New URLs are enriched (title, slug, mapped_query, our_coverage vs our own live
blog, lane via the site's topic_buckets, score = novelty x lane-velocity),
inserted into `competitor_urls_seen`, and logged as typed `discovery_log`
events: `defend_lane` when the competitor published into a lane we already
cover (our_coverage >= 0.30), else `netnew_candidate`.

Sitemap fetch mechanics (robots.txt + index recursion, UA) are reused verbatim
from scripts/topic_gap_finder.py's fetch_sitemap_for_domain, which fetches
live every call — no on-disk cache to bypass, unlike the wave-sweep script's
briefs/<site>/_sitemap_cache_v2/.

DRY-RUN BY DEFAULT: prints/report what it would insert, never writes.
--commit writes to Supabase (requires migration 20260815000001 applied).

CLI:
  python -m optimisation_engine.discovery.competitor_watch property
  python -m optimisation_engine.discovery.competitor_watch property --commit
  python -m optimisation_engine.discovery.competitor_watch property --commit --serp-check
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql, _esc, _jsonb  # noqa: E402
from optimisation_engine.competitor._fetch import fetch_url  # noqa: E402
from optimisation_engine.clients.serp_provider import fetch_serp  # noqa: E402
from optimisation_engine.clients.bing_query_client import (  # noqa: E402
    DEFAULT_SITE_URL as ESTATE_SITE_URL,
)
import scripts.topic_gap_finder as tgf  # noqa: E402
import scripts.property_sitemap_sweep_v2 as sweep_v2  # noqa: E402
import scripts.derive_competitor_universe as dcu  # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

ENRICH_CAP = 30                 # title-fetch HTTP calls per run, bounds wall-clock time
SERP_CHECK_TOP_N = 3            # only the top scorers get a paid-adjacent SERP call
VELOCITY_WINDOW_DAYS = 28
DEFEND_THRESHOLD = 0.30         # matches PILLAR_REJECT_THRESHOLD convention used estate-wide
MIGRATION_HINT = "competitor_urls_seen missing — apply migration 20260815000001 first"

UNIVERSE_PROBE_QUERY_N = 10     # head queries SERPed per universe-refresh probe
UNIVERSE_PROBE_THRESHOLD = 3    # domain must appear in >= this many probed queries to qualify

RSS_FEED_PATHS = ["/feed", "/rss", "/atom.xml"]
RSS_LINK_RE = re.compile(
    r'<link[^>]+type=["\']application/(?:rss|atom)\+xml["\'][^>]+href=["\']([^"\']+)["\']',
    re.IGNORECASE,
)
TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)


# ---------------------------------------------------------------------------
# Own-estate exclusion
# ---------------------------------------------------------------------------

def _own_estate_domains() -> set[str]:
    """Every domain the estate itself owns. Sibling sites must never be
    monitored as competitors of one another."""
    return {urlparse(u).hostname or "" for u in ESTATE_SITE_URL.values()}


def _competitors_to_monitor(disc: dict, estate_domains: set[str]) -> tuple[list[str], list[str]]:
    """Split disc['competitors'] + disc['competitors_auto'] into
    (monitor, excluded_as_estate_sibling). The monitored universe is always
    static + auto-detected combined — auto-added domains get watched exactly
    like hand-picked ones."""
    own = (disc.get("ownDomain") or "").lower().strip()
    auto = [a.get("domain", "") for a in (disc.get("competitors_auto") or [])]
    monitor, excluded = [], []
    for d in list(disc.get("competitors", [])) + auto:
        dom = (d or "").lower().strip()
        if not dom or dom == own or dom in monitor:
            continue
        if dom in estate_domains:
            excluded.append(dom)
            continue
        monitor.append(dom)
    return monitor, excluded


# ---------------------------------------------------------------------------
# Universe refresh (detect emerging competitors from SERP head-query presence)
# ---------------------------------------------------------------------------

def _known_universe_domains(disc: dict, estate_domains: set[str]) -> set[str]:
    """Registrable domains already accounted for: configured + auto-added
    competitors, EXCLUDE_DOMAINS, estate siblings, own domain. A probe result
    is only a "candidate" if it falls outside this set."""
    known = {dcu.registrable_domain(d) for d in disc.get("competitors", []) or []}
    known |= {dcu.registrable_domain(a.get("domain", "")) for a in disc.get("competitors_auto", []) or []}
    known |= {dcu.registrable_domain(d) for d in dcu.EXCLUDE_DOMAINS}
    known |= {dcu.registrable_domain(d) for d in estate_domains}
    own = (disc.get("ownDomain") or "").lower().strip()
    if own:
        known.add(dcu.registrable_domain(own))
    known.discard("")
    return known


def _probe_universe(site_key: str, disc: dict, estate_domains: set[str]) -> list[dict]:
    """SERP the site's top head queries and return domains that show up in
    >= UNIVERSE_PROBE_THRESHOLD of them but aren't already part of the known
    universe. Read-only — never touches disc.json or the DB itself."""
    known = _known_universe_domains(disc, estate_domains)
    queries = dcu.fetch_head_queries(site_key, UNIVERSE_PROBE_QUERY_N, verbose=False)
    if not queries:
        print("[competitor_watch] universe probe: no GSC head queries found, skipping")
        return []

    hits: dict[str, set[str]] = defaultdict(set)
    for q in queries:
        try:
            result = fetch_serp(q, site_key=site_key)
        except Exception as exc:
            print(f"[competitor_watch] universe probe: SERP failed for {q!r}: {exc}")
            continue
        seen_this_query: set[str] = set()
        for res in result.get("organic", []):
            host = res.get("domain") or urlparse(res.get("link") or "").netloc
            dom = dcu.registrable_domain(host)
            if not dom or dom in known or dom in seen_this_query:
                continue
            seen_this_query.add(dom)
            hits[dom].add(q)

    candidates = [
        {"domain": dom, "queries": sorted(qs)}
        for dom, qs in hits.items()
        if len(qs) >= UNIVERSE_PROBE_THRESHOLD
    ]
    candidates.sort(key=lambda c: (-len(c["queries"]), c["domain"]))
    return candidates


def _log_new_competitor_events(site_key: str, added: list[dict]) -> int:
    if not added:
        return 0
    values = []
    for a in added:
        payload = {"type": "new_competitor", "domain": a["domain"], "queries": a["queries"]}
        values.append(f"({_esc(site_key)}, {_esc('netnew_candidate')}, {_jsonb(payload)})")
    _sql(f"INSERT INTO discovery_log (site_key, kind, payload) VALUES {', '.join(values)}")
    return len(added)


# ---------------------------------------------------------------------------
# Table-missing detection (migration 20260815000001 not yet applied)
# ---------------------------------------------------------------------------

def _is_missing_table(exc: Exception) -> bool:
    text = str(exc)
    resp = getattr(exc, "response", None)
    if resp is not None:
        try:
            text += " " + resp.text
        except Exception:
            pass
    return "does not exist" in text or "42P01" in text


def _table_exists(table: str) -> bool:
    try:
        _sql(f"SELECT 1 FROM {table} LIMIT 0")
        return True
    except Exception as exc:
        if _is_missing_table(exc):
            return False
        raise


# ---------------------------------------------------------------------------
# RSS/Atom fallback (sitemap unreachable/blocked)
# ---------------------------------------------------------------------------

def _parse_feed(body: str) -> list[dict]:
    try:
        root = ET.fromstring(body)
    except ET.ParseError:
        return []
    entries: list[dict] = []
    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag == "item":  # RSS 2.0
            link = el.find("link")
            if link is not None and link.text:
                entries.append({"url": link.text.strip(), "lastmod": None})
        elif tag == "entry":  # Atom
            link_el = el.find("{http://www.w3.org/2005/Atom}link")
            href = link_el.get("href") if link_el is not None else None
            if href:
                entries.append({"url": href.strip(), "lastmod": None})
    return entries


def _fetch_rss_fallback(domain: str) -> list[dict]:
    base = f"https://{domain}"
    candidates = [base + p for p in RSS_FEED_PATHS]
    if tgf.can_fetch(base + "/"):
        status, body = tgf.http_get(base + "/")
        if status == 200:
            m = RSS_LINK_RE.search(body)
            if m:
                href = m.group(1)
                candidates.insert(0, href if href.startswith("http") else base + "/" + href.lstrip("/"))
    for url in candidates:
        if not tgf.can_fetch(url):
            continue
        status, body = tgf.http_get(url)
        if status == 200 and ("<rss" in body or "<feed" in body):
            return _parse_feed(body)
    return []


def _fetch_competitor(domain: str) -> tuple[list[dict], str]:
    """Returns (entries, method) with method in {'sitemap','rss','unmonitorable'}."""
    try:
        entries = tgf.fetch_sitemap_for_domain(domain)
    except Exception:
        entries = []
    if entries:
        return entries, "sitemap"
    entries = _fetch_rss_fallback(domain)
    if entries:
        return entries, "rss"
    return [], "unmonitorable"


# ---------------------------------------------------------------------------
# Enrichment helpers
# ---------------------------------------------------------------------------

def _fetch_title(url: str) -> str | None:
    status, body = fetch_url(url)
    if status != 200:
        return None
    m = TITLE_RE.search(body)
    if not m:
        return None
    return re.sub(r"\s+", " ", m.group(1)).strip()[:200] or None


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def _group_for_report(rows: list[dict]) -> list[str]:
    if not rows:
        return ["_none_", ""]
    by_domain: dict[str, dict[str, list[dict]]] = defaultdict(lambda: defaultdict(list))
    for r in rows:
        by_domain[r["competitor_domain"]][r.get("lane") or "Other"].append(r)
    lines: list[str] = []
    for domain in sorted(by_domain):
        lines.append(f"### {domain}")
        lines.append("")
        for lane in sorted(by_domain[domain]):
            lines.append(f"**{lane}**")
            lines.append("")
            for r in sorted(by_domain[domain][lane], key=lambda x: -(x.get("score") or 0)):
                title = f" — {r['title']}" if r.get("title") else ""
                lines.append(
                    f"- `{r['slug']}` (score {r.get('score')}, coverage {r.get('our_coverage')}){title} — {r['url']}"
                )
            lines.append("")
    return lines


def _group_universe_changes(
    *, probed: bool, candidates: list[dict], added: list[dict], dry_run: bool,
) -> list[str]:
    lines = ["## Universe changes", ""]
    if not probed:
        lines += ["Universe probe not run this cycle (pass --probe-universe to enable).", ""]
        return lines
    if not candidates:
        lines += [f"Probed {UNIVERSE_PROBE_QUERY_N} head queries — no new candidate domains found.", ""]
        return lines
    added_domains = {a["domain"] for a in added}
    for c in candidates:
        status = "added to competitors_auto" if c["domain"] in added_domains else "would be added (dry run)"
        lines.append(f"- `{c['domain']}` — {len(c['queries'])} queries ({status}): {', '.join(c['queries'])}")
    lines.append("")
    return lines


def _write_report(
    site_key: str, *, dry_run: bool, table_ready: bool,
    competitors: list[str], estate_excluded: list[str], unmonitorable: list[str],
    all_new: list[dict],
    universe_probed: bool = False, universe_candidates: list[dict] | None = None,
    universe_added: list[dict] | None = None,
) -> Path:
    today = date.today().isoformat()
    docs_dir = ROOT / "docs" / site_key
    docs_dir.mkdir(parents=True, exist_ok=True)
    report_path = docs_dir / f"competitor_watch_{today}.md"

    defend = [r for r in all_new if (r.get("our_coverage") or 0) >= DEFEND_THRESHOLD]
    netnew = [r for r in all_new if (r.get("our_coverage") or 0) < DEFEND_THRESHOLD]

    lines = [f"# Competitor watch — {site_key} — {today}", ""]
    if dry_run:
        lines.append("**DRY RUN — nothing written to Supabase.**")
        lines.append("")
    if not table_ready:
        lines.append(f"**{MIGRATION_HINT}**")
        lines.append("")
    lines += [
        f"Competitors configured: {len(competitors) + len(estate_excluded)}  ",
        f"Estate-sibling domains excluded from monitoring: {len(estate_excluded)}"
        + (f" ({', '.join(estate_excluded)})" if estate_excluded else "") + "  ",
        f"Competitors monitored: {len(competitors)}  ",
        f"Unmonitorable: {len(unmonitorable)}  ",
        f"New URLs found: {len(all_new)} (defend {len(defend)} / net-new {len(netnew)})  ",
        "",
        "---",
        "",
        f"## Defend lane ({len(defend)}) — competitor published into a lane we already cover",
        "",
    ]
    lines += _group_for_report(defend)
    lines += [f"## Net-new candidates ({len(netnew)})", ""]
    lines += _group_for_report(netnew)

    if unmonitorable:
        lines.append("## Unmonitorable competitors")
        lines.append("")
        for d in unmonitorable:
            lines.append(f"- `{d}` — no sitemap, robots-blocked, and no RSS/Atom feed found")
        lines.append("")

    lines += _group_universe_changes(
        probed=universe_probed, candidates=universe_candidates or [],
        added=universe_added or [], dry_run=dry_run,
    )

    report_path.write_text("\n".join(lines), encoding="utf-8")
    return report_path


# ---------------------------------------------------------------------------
# DB writes
# ---------------------------------------------------------------------------

def _insert_new_urls(rows: list[dict]) -> int:
    if not rows:
        return 0
    values = ", ".join(
        f"({_esc(r['site_key'])}, {_esc(r['competitor_domain'])}, {_esc(r['url'])}, "
        f"{_esc(r['slug'])}, {_esc(r['lastmod'])}, {_esc(r['title'])}, "
        f"{_esc(r['mapped_query'])}, {_esc(r['our_coverage'])}, {_esc(r['lane'])}, {_esc(r['score'])})"
        for r in rows
    )
    _sql(f"""
        INSERT INTO competitor_urls_seen
            (site_key, competitor_domain, url, slug, lastmod, title, mapped_query, our_coverage, lane, score)
        VALUES {values}
        ON CONFLICT (site_key, url) DO NOTHING
    """)
    return len(rows)


def _insert_discovery_log(site_key: str, rows: list[dict]) -> int:
    if not rows:
        return 0
    values = []
    for r in rows:
        kind = "defend_lane" if (r.get("our_coverage") or 0) >= DEFEND_THRESHOLD else "netnew_candidate"
        payload = {k: v for k, v in r.items() if k != "method"}
        values.append(f"({_esc(r['site_key'])}, {_esc(kind)}, {_jsonb(payload)})")
    _sql(f"INSERT INTO discovery_log (site_key, kind, payload) VALUES {', '.join(values)}")
    return len(rows)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run(
    site_key: str, *, dry_run: bool = True, serp_check: bool = False,
    probe_universe: bool = False,
) -> dict[str, Any]:
    disc_path = ROOT / "sites" / f"{site_key}.discovery.json"
    if not disc_path.exists():
        raise FileNotFoundError(f"Discovery config missing: {disc_path}")
    disc = json.loads(disc_path.read_text(encoding="utf-8"))

    site_cfg = tgf._load_site_config(site_key)
    paths = site_cfg.get("paths", site_cfg)
    blog_dir = ROOT / paths["blogContentDir"]

    estate_domains = _own_estate_domains()
    table_ready = _table_exists("competitor_urls_seen")
    if not table_ready:
        print(f"[competitor_watch] {MIGRATION_HINT}")

    # -----------------------------------------------------------------
    # Universe refresh: detect emerging competitors before deciding who
    # to monitor this run. Auto-add is reversible (competitors_auto),
    # but every addition is surfaced in the report/digest — never silent.
    # -----------------------------------------------------------------
    universe_candidates: list[dict] = []
    universe_added: list[dict] = []
    if probe_universe:
        universe_candidates = _probe_universe(site_key, disc, estate_domains)
        if universe_candidates:
            print(f"[competitor_watch] universe probe: {len(universe_candidates)} candidate "
                  f"domain(s) present in >= {UNIVERSE_PROBE_THRESHOLD} of up to {UNIVERSE_PROBE_QUERY_N} head queries")
            for c in universe_candidates:
                print(f"  {c['domain']}: {len(c['queries'])} queries — {', '.join(c['queries'])}")
        else:
            print("[competitor_watch] universe probe: no new candidate domains")

        if dry_run:
            if universe_candidates:
                print("[competitor_watch] universe probe: DRY RUN — would add to competitors_auto, nothing written")
        else:
            today = date.today().isoformat()
            auto_list = disc.setdefault("competitors_auto", [])
            existing_auto = {a.get("domain") for a in auto_list}
            for c in universe_candidates:
                if c["domain"] in existing_auto:
                    continue
                entry = {"domain": c["domain"], "first_detected": today, "queries_seen": len(c["queries"])}
                auto_list.append(entry)
                universe_added.append({**entry, "queries": c["queries"]})
            if universe_added:
                disc_path.write_text(json.dumps(disc, indent=2) + "\n", encoding="utf-8")
                print(f"[competitor_watch] universe probe: added {len(universe_added)} domain(s) to competitors_auto "
                      f"in {disc_path.name}")
                if table_ready:
                    _log_new_competitor_events(site_key, universe_added)
    else:
        print("[competitor_watch] universe probe skipped (pass --probe-universe to enable)")

    competitors, estate_excluded = _competitors_to_monitor(disc, estate_domains)
    if estate_excluded:
        print(f"[competitor_watch] excluded estate-sibling domains: {', '.join(estate_excluded)}")

    if not competitors:
        print(f"[competitor_watch] no monitorable competitors configured for {site_key}")
        report_path = _write_report(
            site_key, dry_run=dry_run, table_ready=table_ready,
            competitors=competitors, estate_excluded=estate_excluded, unmonitorable=[],
            all_new=[], universe_probed=probe_universe, universe_candidates=universe_candidates,
            universe_added=universe_added,
        )
        return {
            "site_key": site_key, "dry_run": dry_run, "competitors_monitored": 0,
            "estate_excluded": estate_excluded, "unmonitorable": [], "new_urls": 0,
            "defend_lane": 0, "netnew_candidate": 0, "inserted": 0, "logged": 0,
            "table_missing": not table_ready, "report_path": str(report_path),
            "universe_candidates": universe_candidates, "universe_added": universe_added,
        }

    our_slugs = tgf.list_our_pages(blog_dir) if blog_dir.exists() else []
    our_token_sets = [sweep_v2.tokens_from_slug(s) for s in our_slugs]

    # ponytail: assign_cluster reads a module-level global; point it at this
    # site's own topic_buckets for the duration of this call (single-threaded,
    # re-set on every run() call — no cross-site bleed within a sequential loop).
    buckets = disc.get("topic_buckets") or []
    if buckets:
        sweep_v2.CLUSTERS = [(name, markers) for name, markers in buckets]

    skip_res = tgf._compile(disc.get("skip_path_patterns", []))

    existing_by_domain: dict[str, set[str]] = {}
    if table_ready:
        for r in _sql(f"SELECT competitor_domain, url FROM competitor_urls_seen WHERE site_key = {_esc(site_key)}"):
            existing_by_domain.setdefault(r["competitor_domain"], set()).add(r["url"])

    unmonitorable: list[str] = []
    all_new: list[dict] = []

    for domain in competitors:
        print(f"[competitor_watch] {domain} ...")
        entries, method = _fetch_competitor(domain)
        if method == "unmonitorable":
            print("  unmonitorable: no sitemap, robots-blocked, no RSS/Atom feed")
            unmonitorable.append(domain)
            continue

        content_entries = [
            e for e in entries
            if domain in (urlparse(e["url"]).hostname or "") and tgf.is_content_url(e["url"], skip_res)
        ]
        existing = existing_by_domain.get(domain, set())
        new_entries = [e for e in content_entries if e["url"] not in existing]
        print(f"  {method}: {len(entries)} urls, {len(content_entries)} content-shaped, {len(new_entries)} new")

        for e in new_entries:
            url = e["url"]
            slug = tgf.slug_from_url(url)
            tokens = sweep_v2.tokens_from_slug(slug)
            mapped_query = slug.replace("-", " ").strip()
            our_coverage = round(max((sweep_v2.jaccard(tokens, ot) for ot in our_token_sets), default=0.0), 3)
            lane = sweep_v2.assign_cluster(slug)
            all_new.append({
                "site_key": site_key, "competitor_domain": domain, "url": url,
                "slug": slug, "lastmod": e.get("lastmod"), "title": None,
                "mapped_query": mapped_query, "our_coverage": our_coverage,
                "lane": lane, "method": method,
            })

    # Lane-velocity: new competitor URLs in the same (domain, lane) over the
    # trailing window, from what's already on record (this run's own finds
    # don't count toward their own velocity).
    velocity_by: dict[tuple[str, str], int] = {}
    if table_ready and all_new:
        vrows = _sql(f"""
            SELECT competitor_domain, lane, COUNT(*) AS n
            FROM competitor_urls_seen
            WHERE site_key = {_esc(site_key)}
              AND first_seen >= CURRENT_DATE - INTERVAL '{VELOCITY_WINDOW_DAYS} days'
            GROUP BY competitor_domain, lane
        """)
        for r in vrows:
            velocity_by[(r["competitor_domain"], r["lane"])] = int(r["n"])

    for r in all_new:
        n = velocity_by.get((r["competitor_domain"], r["lane"]), 0)
        velocity_factor = 1 + min(n, 5) / 5
        novelty = 1 - r["our_coverage"]
        r["score"] = round(novelty * velocity_factor, 3)

    all_new.sort(key=lambda r: -r["score"])

    # Enrichment: title fetch is the only per-URL HTTP call, cap it.
    enrich_n = min(len(all_new), ENRICH_CAP)
    capped = len(all_new) > ENRICH_CAP
    for r in all_new[:enrich_n]:
        r["title"] = _fetch_title(r["url"])
    if capped:
        print(f"[competitor_watch] enrichment (title fetch) capped at {ENRICH_CAP} of {len(all_new)} new URLs")

    # SERP-check the top-3 scorers only.
    if serp_check:
        for r in all_new[:SERP_CHECK_TOP_N]:
            try:
                result = fetch_serp(r["mapped_query"], site_key=site_key)
                organic = result.get("organic", [])
                match = next((o for o in organic[:20] if r["url"] in (o.get("link") or "")), None)
                r["serp_check"] = {
                    "already_ranks_top20": bool(match),
                    "position": match["position"] if match else None,
                    "provider_used": result.get("provider_used"),
                }
            except Exception as exc:
                r["serp_check"] = {"error": str(exc)[:200]}

    defend = [r for r in all_new if r["our_coverage"] >= DEFEND_THRESHOLD]
    netnew = [r for r in all_new if r["our_coverage"] < DEFEND_THRESHOLD]

    inserted = logged = 0
    if not dry_run and table_ready:
        inserted = _insert_new_urls(all_new)
        logged = _insert_discovery_log(site_key, all_new)
    elif dry_run:
        print(f"[competitor_watch] DRY RUN: would insert {len(all_new)} rows "
              f"into competitor_urls_seen + discovery_log")

    report_path = _write_report(
        site_key, dry_run=dry_run, table_ready=table_ready,
        competitors=competitors, estate_excluded=estate_excluded,
        unmonitorable=unmonitorable, all_new=all_new,
        universe_probed=probe_universe, universe_candidates=universe_candidates,
        universe_added=universe_added,
    )

    summary = {
        "site_key": site_key,
        "dry_run": dry_run,
        "competitors_monitored": len(competitors),
        "estate_excluded": estate_excluded,
        "unmonitorable": unmonitorable,
        "new_urls": len(all_new),
        "defend_lane": len(defend),
        "netnew_candidate": len(netnew),
        "enrichment_capped": capped,
        "table_missing": not table_ready,
        "inserted": inserted,
        "logged": logged,
        "report_path": str(report_path),
        "universe_probed": probe_universe,
        "universe_candidates": universe_candidates,
        "universe_added": universe_added,
    }
    print(json.dumps(summary, indent=2, default=str))
    return summary


def main() -> int:
    ap = argparse.ArgumentParser(description="Continuous competitor sitemap monitor")
    ap.add_argument("site_key")
    ap.add_argument("--commit", action="store_true", help="Write to Supabase (default: dry-run)")
    ap.add_argument("--serp-check", action="store_true", help="SERP-verify the top-3 scoring new URLs")
    ap.add_argument("--probe-universe", action="store_true",
                     help="Probe SERP head queries for emerging competitor domains "
                          "(auto-on when --commit is set)")
    args = ap.parse_args()

    summary = run(
        args.site_key, dry_run=not args.commit, serp_check=args.serp_check,
        probe_universe=args.probe_universe or args.commit,
    )
    if args.commit and summary.get("table_missing"):
        print(f"[competitor_watch] {MIGRATION_HINT}")
        return 1
    return 0


if __name__ == "__main__":
    # Self-check: pure helpers, no network.
    assert _is_missing_table(Exception('relation "competitor_urls_seen" does not exist')) is True
    assert _is_missing_table(Exception("some other error")) is False

    _own = _own_estate_domains()
    assert "propertytaxpartners.co.uk" in _own, _own

    _comps, _excl = _competitors_to_monitor(
        {
            "ownDomain": "propertytaxpartners.co.uk",
            "competitors": ["ukpropertyaccountants.co.uk", "propertytaxpartners.co.uk", "hollowaydavies.co.uk"],
        },
        _own,
    )
    assert _comps == ["ukpropertyaccountants.co.uk"], _comps
    assert _excl == ["hollowaydavies.co.uk"], _excl

    # competitors_auto folds into the monitored set, deduped against competitors,
    # and estate siblings/own domain are still excluded even if auto-added.
    _comps2, _excl2 = _competitors_to_monitor(
        {
            "ownDomain": "propertytaxpartners.co.uk",
            "competitors": ["ukpropertyaccountants.co.uk"],
            "competitors_auto": [
                {"domain": "newcompetitor.co.uk", "first_detected": "2026-08-15", "queries_seen": 4},
                {"domain": "ukpropertyaccountants.co.uk", "first_detected": "2026-08-01", "queries_seen": 3},
                {"domain": "hollowaydavies.co.uk", "first_detected": "2026-08-01", "queries_seen": 3},
            ],
        },
        _own,
    )
    assert _comps2 == ["ukpropertyaccountants.co.uk", "newcompetitor.co.uk"], _comps2
    assert _excl2 == ["hollowaydavies.co.uk"], _excl2

    # _known_universe_domains: configured + auto + EXCLUDE_DOMAINS + estate + own,
    # all registrable-domain-normalised (www stripped).
    _known = _known_universe_domains(
        {
            "ownDomain": "propertytaxpartners.co.uk",
            "competitors": ["ukpropertyaccountants.co.uk"],
            "competitors_auto": [{"domain": "alreadyfound.co.uk"}],
        },
        _own,
    )
    assert "ukpropertyaccountants.co.uk" in _known
    assert "alreadyfound.co.uk" in _known
    assert "propertytaxpartners.co.uk" in _known  # own domain
    assert "google.co.uk" in _known  # EXCLUDE_DOMAINS
    assert "dentalfinancepartners.co.uk" in _known  # estate sibling, www-stripped

    assert _group_for_report([]) == ["_none_", ""]

    print("[competitor_watch] self-check OK")
    sys.exit(main())
