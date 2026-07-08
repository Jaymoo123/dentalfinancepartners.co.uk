"""
Batch builder: merge triage + serp_checks → cannibalisation clearance → report.

Cannibalisation sources checked (in order):
  (a) live blog inventory (content dir .md files)
  (b) site's blog_topics rows (status != 'rejected')
  (c) core/pillar pages from SITE_RULES in brief_for_opus.py
  (d) uncommitted Wave-1 draft slugs for solicitors/medical (picks.yaml files)

Score = impressions × winnability_factor × (1 − max_overlap)
  winnability_factor: 1.0 for "winnable-likely", 0.5 for "review"
  max_overlap: highest Jaccard vs any existing page/topic

Pillar overlap ≥ PILLAR_REJECT_THRESHOLD = hard reject (0 survivors).

Output:
  docs/<site>/gap_discovery_2026-07.md  (report, always)
  blog_topics inserts — ONLY with --commit-topics flag (never by default)

CLI:
  python -m optimisation_engine.discovery.batch_builder --site property
  python -m optimisation_engine.discovery.batch_builder --site property --commit-topics
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

import yaml

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

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
PILLAR_REJECT_THRESHOLD = 0.30
MIN_IMPRESSIONS = 5           # 28d floor for report inclusion; below-floor kept in triage.json only
SERP_SERVED_NEAR_DUPE = 0.8   # exclude phrasing variants of a SERP_SERVED query

# Extra brand tokens per site, beyond competitor-domain stems from discovery.json
BRAND_EXTRA = {
    "property": ["djh"],
}

STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "2024", "2027", "with", "on", "from",
    "do", "does", "as", "be", "or", "if", "at", "this", "that", "it",
    "into", "out", "can", "i", "my", "we", "our", "us", "all", "any",
    "explained", "rules", "vs", "vs.", "complete-guide", "ultimate",
    "comprehensive", "best", "free", "online", "near", "me",
}


# ponytail: same tokenise/jaccard as query_triage — copied from cannibalisation_check.py
def _tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return {t for t in s.split() if t and t not in STOP and len(t) >= 2}


def _jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


# ponytail: crude suffix strip for near-dupe phrasing only ("reporting"=="report");
# real stemming not needed at this threshold
def _stem_tokens(tokens: set[str]) -> set[str]:
    out = set()
    for t in tokens:
        for suf in ("ing", "ed", "es", "s"):
            if t.endswith(suf) and len(t) - len(suf) >= 4:
                t = t[: -len(suf)]
                break
        out.add(t)
    return out


# ---------------------------------------------------------------------------
# Load existing pages/topics
# ---------------------------------------------------------------------------

def _load_blog_inventory(content_dir: str) -> list[dict]:
    """Read .md files from the site's blog content dir."""
    p = ROOT / content_dir
    if not p.exists():
        return []
    out = []
    for md in sorted(p.glob("*.md")):
        text = md.read_text(encoding="utf-8", errors="ignore")
        fm: dict = {}
        if text.startswith("---"):
            end = text.find("---", 3)
            if end != -1:
                try:
                    fm = yaml.safe_load(text[3:end]) or {}
                except yaml.YAMLError:
                    fm = {}
        slug = md.stem
        slug_tokens = _tokenise(slug)
        title_tokens = _tokenise(
            str(fm.get("title", "")) + " " + str(fm.get("metaTitle", ""))
        )
        # ponytail: keep slug and title token sets separate so _max_overlap can
        # score each independently; combined set dilutes matches where the title
        # is a strong hit but slug tokens inflate the union.
        out.append({
            "slug": slug,
            "slug_tokens": slug_tokens,
            "title_tokens": title_tokens,
            "tokens": slug_tokens | title_tokens,  # kept for pillar_inv compat
            "title": fm.get("title", slug),
        })
    return out


def _load_blog_topics(site_key: str, table_name: str) -> list[dict]:
    """Load blog_topics rows (active + candidate, not rejected).

    The consolidated table is 'blog_topics' with a site_key column.
    Falls back to the per-site table name if the unified table query fails.
    """
    # ponytail: try unified table first (multi-site refactor shipped ~2026-06-22)
    try:
        rows = _sql(f"""
            SELECT topic, slug, primary_keyword
            FROM blog_topics
            WHERE site_key = '{_esc(site_key).strip("'")}'
              AND status IS DISTINCT FROM 'rejected'
        """)
        return rows
    except Exception:
        pass
    try:
        safe_table = re.sub(r"[^a-z0-9_]", "", table_name)
        rows = _sql(f"""
            SELECT topic, slug, primary_keyword
            FROM {safe_table}
            WHERE status IS DISTINCT FROM 'rejected'
        """)
        return rows
    except Exception as exc:
        print(f"[batch] blog_topics load failed for {site_key}: {exc}")
        return []


def _load_pillar_pages(site_key: str) -> list[dict]:
    """Load pillar pages from SITE_RULES in brief_for_opus.py."""
    try:
        from optimisation_engine.competitor.brief_for_opus import SITE_RULES
        rules = SITE_RULES.get(site_key, {})
        pillars = rules.get("pillar_pages", {})
        out = []
        for label, path in pillars.items():
            slug = path.rstrip("/").split("/")[-1]
            tokens = _tokenise(label + " " + slug)
            out.append({"slug": slug, "tokens": tokens, "title": label})
        return out
    except Exception as exc:
        print(f"[batch] pillar pages load warning: {exc}")
        return []


def _load_wave_draft_slugs(site_key: str) -> list[dict]:
    """
    Load uncommitted Wave-1 draft slugs for solicitors/medical from picks.yaml files.
    This prevents re-proposing pages that are written but not yet committed.
    """
    slugs = []
    picks_dirs = sorted((ROOT / "briefs" / site_key).glob("wave*/picks.yaml"))
    for picks_path in picks_dirs:
        try:
            data = yaml.safe_load(picks_path.read_text(encoding="utf-8")) or {}
        except yaml.YAMLError:
            continue
        for bucket in (data.get("buckets") or {}).values():
            for pick in (bucket.get("picks") or []):
                s = pick.get("slug", "")
                if s:
                    tokens = _tokenise(s + " " + pick.get("label", ""))
                    slugs.append({"slug": s, "tokens": tokens, "title": pick.get("label", s)})
    if slugs:
        print(f"[batch] {site_key}: loaded {len(slugs)} uncommitted wave-draft slugs from picks.yaml")
    return slugs


# ---------------------------------------------------------------------------
# Cannibalisation check
# ---------------------------------------------------------------------------

def _max_overlap(query_tokens: set, inventory: list[dict]) -> tuple[float, str]:
    """Return (max_jaccard, nearest_slug) across all inventory items.

    Scores max(jaccard_vs_slug_tokens, jaccard_vs_title_tokens) when both are
    available so a candidate that matches an existing page title but not its
    slug is caught correctly.
    """
    best = 0.0
    best_slug = ""
    for item in inventory:
        slug_j = _jaccard(query_tokens, item.get("slug_tokens") or set())
        title_j = _jaccard(query_tokens, item.get("title_tokens") or set())
        # ponytail: fall back to combined 'tokens' for items without separate sets
        # (pillar_inv entries built elsewhere only have 'tokens')
        combined_j = _jaccard(query_tokens, item.get("tokens") or set())
        j = max(slug_j, title_j, combined_j)
        if j > best:
            best = j
            best_slug = item.get("slug", "")
    return best, best_slug


# ---------------------------------------------------------------------------
# SERP_SERVED + branded detection
# ---------------------------------------------------------------------------

def _own_domain_variants(own_domain: str) -> tuple[str, str]:
    """Return (bare, www) variants of ownDomain for substring matching."""
    bare = own_domain.lower().removeprefix("www.")
    return bare, "www." + bare


def _serp_served(query: str, serp_checks: dict, own_domain: str) -> tuple[bool, str, int]:
    """Return (is_served, our_url, our_position) if our domain appears in DDG top-10."""
    bare, www_variant = _own_domain_variants(own_domain)
    for result in (serp_checks.get(query, {}).get("results") or []):
        link = (result.get("link") or "").lower()
        domain = (result.get("domain") or "").lower()
        pos = result.get("position", 99)
        if bare in domain or www_variant in domain or bare in link:
            return True, result.get("link", ""), pos
    return False, "", 0


def _branded_stems(competitors: list[str]) -> list[str]:
    """Extract name-stems from competitor domains (part before first dot)."""
    # ponytail: dumb substring check on domain stem only; no LLM, no regex
    stems = []
    for domain in competitors:
        stem = domain.lower().split(".")[0]
        if len(stem) >= 3:  # skip trivially short stems
            stems.append(stem)
    return stems


def _is_branded(query: str, stems: list[str]) -> bool:
    q = query.lower()
    return any(stem in q for stem in stems)


# ---------------------------------------------------------------------------
# blog_topics insert (only called with --commit-topics)
# ---------------------------------------------------------------------------

def _insert_blog_topics(site_key: str, table: str, candidates: list[dict]) -> None:
    """Insert candidates into blog_topics, source='gap_discovery_2026-07'.

    Accepts raw scored rows (query/impressions/...) or curated rows
    (topic/primary_keyword/content_tier/publish_priority/notes) — curated
    fields win when present. status='pending' + used=False covers both
    done-marker conventions (used-based and status-based sites).
    """
    from optimisation_engine.config import SUPABASE_URL, SUPABASE_KEY

    rows = []
    for c in candidates:
        title = c.get("topic") or c["query"]
        rows.append({
            "site_key": site_key,
            "topic": title,
            "slug": "",
            "primary_keyword": c.get("primary_keyword") or c.get("query") or title,
            "secondary_keywords": c.get("secondary_keywords") or [],
            "used": False,
            "content_tier": c.get("content_tier") or "cluster",
            "user_intent": c.get("user_intent") or "informational",
            "publish_priority": c.get("publish_priority", 3),
            # medical/solicitors order priority.asc (lower = first); invert the 1-5 scale
            "priority": 6 - int(c.get("publish_priority", 3)),
            "status": "pending",
            "notes": c.get("notes") or "",
            "keyword_source": "gap_discovery_2026-07",
        })

    url = f"{SUPABASE_URL}/rest/v1/{table}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=ignore-duplicates,return=minimal",
    }
    batch_size = 50
    inserted = 0
    for i in range(0, len(rows), batch_size):
        batch = rows[i : i + batch_size]
        import httpx as _httpx
        r = _httpx.post(url, headers=headers, json=batch, timeout=30.0)
        if r.status_code in (200, 201):
            inserted += len(batch)
        else:
            print(f"[batch] blog_topics insert error {r.status_code}: {r.text[:200]}")
    print(f"[batch] inserted {inserted} candidates into {table}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def build(site_key: str, commit_topics: bool = False) -> list[dict]:
    site = get_site(site_key)
    content_dir = site.get("content_dir") or ""
    # Unified table (legacy blog_topics_<site> tables dropped 2026-06; sites
    # config may still carry the stale per-site name — ignore it)
    table = "blog_topics"

    # Load discovery.json for ownDomain + competitors
    disc_path = ROOT / "sites" / f"{site_key}.discovery.json"
    disc: dict = {}
    if disc_path.exists():
        try:
            disc = json.loads(disc_path.read_text(encoding="utf-8"))
        except Exception:
            pass
    own_domain: str = disc.get("ownDomain", "")
    brand_stems = _branded_stems(disc.get("competitors", [])) + BRAND_EXTRA.get(site_key, [])

    triage_path = ROOT / "briefs" / site_key / "discovery_2026-07" / "triage.json"
    serp_path   = ROOT / "briefs" / site_key / "discovery_2026-07" / "serp_checks.json"

    if not triage_path.exists():
        raise FileNotFoundError(f"triage.json missing: {triage_path}")

    triage = json.loads(triage_path.read_text(encoding="utf-8"))
    serp_checks: dict = {}
    if serp_path.exists():
        serp_checks = json.loads(serp_path.read_text(encoding="utf-8"))

    # Build combined inventory for cannibalisation checks
    blog_inv    = _load_blog_inventory(content_dir)
    topics_inv  = [
        {"slug": r.get("slug") or r.get("topic", ""),
         "tokens": _tokenise((r.get("topic") or "") + " " + (r.get("primary_keyword") or "")),
         "title": r.get("topic", "")}
        for r in _load_blog_topics(site_key, table)
    ]
    pillar_inv  = _load_pillar_pages(site_key)
    # Wave-draft slugs only for solicitors and medical (known uncommitted waves)
    draft_inv   = _load_wave_draft_slugs(site_key) if site_key in ("solicitors", "medical") else []

    all_inv     = blog_inv + topics_inv + draft_inv
    all_pillar  = pillar_inv  # checked separately for hard reject

    print(f"[batch] {site_key}: blog={len(blog_inv)} topics={len(topics_inv)} "
          f"pillars={len(pillar_inv)} drafts={len(draft_inv)}")

    # Competitor URLs confirmation signal (from sitemap scrape)
    comp_path = ROOT / "briefs" / site_key / "_competitor_urls.json"
    comp_urls: dict = {}
    if comp_path.exists():
        try:
            comp_urls = json.loads(comp_path.read_text(encoding="utf-8"))
        except Exception:
            pass

    candidates = [r for r in triage if r["class"] in ("WRONG_PAGE", "UNSERVED")]

    scored: list[dict] = []
    pillar_excluded: list[dict] = []
    serp_served_lane: list[dict] = []
    branded_excluded: list[dict] = []
    below_floor = 0

    # Pre-pass: find SERP_SERVED queries so phrasing variants can be excluded too
    served_token_sets: list[set] = []
    if own_domain:
        for entry in candidates:
            q = entry["query"]
            served, our_url, our_pos = _serp_served(q, serp_checks, own_domain)
            if served:
                serp_served_lane.append({
                    "query": q, "impressions": int(entry.get("impressions") or 0),
                    "our_url": our_url, "our_position": our_pos,
                })
                served_token_sets.append(_stem_tokens(_tokenise(q)))
    served_queries = {c["query"] for c in serp_served_lane}

    for entry in candidates:
        q = entry["query"]
        qt = _tokenise(q)
        imp = int(entry.get("impressions") or 0)

        if q in served_queries:
            continue  # already in improve-existing lane

        # Branded query — hard reject before any SERP/overlap work
        if _is_branded(q, brand_stems):
            branded_excluded.append({"query": q, "impressions": imp})
            continue

        # Phrasing variant of a SERP_SERVED query — same page serves it
        if any(_jaccard(_stem_tokens(qt), st) >= SERP_SERVED_NEAR_DUPE for st in served_token_sets):
            serp_served_lane.append({
                "query": q, "impressions": imp,
                "our_url": "(near-duplicate of a served query)", "our_position": 0,
            })
            continue

        # Below impressions floor — keep out of the report, data stays in triage.json
        if imp < MIN_IMPRESSIONS:
            below_floor += 1
            continue

        # SERP verdict
        serp = serp_checks.get(q, {})
        verdict = serp.get("verdict", "review")
        wf = 1.0 if verdict == "winnable-likely" else 0.5

        # Pillar overlap — hard reject
        pillar_overlap, pillar_slug = _max_overlap(qt, all_pillar)
        if pillar_overlap >= PILLAR_REJECT_THRESHOLD:
            pillar_excluded.append({"query": q, "impressions": imp, "nearest_pillar": pillar_slug})
            continue

        # General cannibalisation
        max_overlap, nearest = _max_overlap(qt, all_inv)

        score = imp * wf * (1.0 - max_overlap)

        # Top competitor URL (first result from SERP check if available)
        top_result = (serp.get("results") or [{}])[0]
        top_competitor = top_result.get("domain", "")

        scored.append({
            "query": q,
            "impressions": imp,
            "class": entry["class"],
            "serving_page": entry.get("page_url", ""),
            "verdict": verdict,
            "score": round(score, 2),
            "max_overlap": round(max_overlap, 3),
            "nearest_existing": nearest,
            "top_competitor": top_competitor,
            "sources": entry.get("sources", []),
        })

    scored.sort(key=lambda x: -x["score"])

    # Write markdown report
    docs_dir = ROOT / "docs" / site_key
    docs_dir.mkdir(parents=True, exist_ok=True)
    report_path = docs_dir / "gap_discovery_2026-07.md"

    lines = [
        f"# Gap Discovery 2026-07 — {site_key}",
        "",
        f"Generated: {__import__('datetime').date.today()}  ",
        f"Triage candidates (WRONG_PAGE + UNSERVED): {len(candidates)}  ",
        f"Branded excluded: {len(branded_excluded)}  ",
        f"SERP_SERVED (improve-existing): {len(serp_served_lane)}  ",
        f"Pillar-overlap excluded: {len(pillar_excluded)}  ",
        f"Below impressions floor (<{MIN_IMPRESSIONS}/28d) omitted: {below_floor}  ",
        f"**New-page candidates: {len(scored)}**",
        "",
        "---",
        "",
        "## Recommended for review (new-page candidates)",
        "",
        "| # | Query | Impr | Class | SERP | Score | Overlap | Nearest existing | Top competitor |",
        "|---|-------|------|-------|------|-------|---------|-----------------|----------------|",
    ]
    for i, c in enumerate(scored, 1):
        nearest = (c["nearest_existing"] or "-")[:40]
        competitor = (c["top_competitor"] or "-")[:30]
        lines.append(
            f"| {i} | {c['query'][:60]} | {c['impressions']} | {c['class']} | "
            f"{c['verdict']} | {c['score']} | {c['max_overlap']} | {nearest} | {competitor} |"
        )

    lines += [
        "",
        "---",
        "",
        "## Auto-excluded: SERP_SERVED (improve-existing lane)",
        "",
        "We already rank for these — focus on improving the existing page, not creating a new one.",
        "",
        "| Query | Impr | Our URL | Our position |",
        "|-------|------|---------|--------------|",
    ]
    for c in sorted(serp_served_lane, key=lambda x: -x["impressions"]):
        lines.append(
            f"| {c['query'][:60]} | {c['impressions']} | {c['our_url'][:80]} | {c['our_position']} |"
        )

    lines += [
        "",
        "---",
        "",
        "## Auto-excluded: branded queries",
        "",
        "Contain a competitor domain name-stem — not worth targeting.",
        "",
        "| Query | Impr |",
        "|-------|------|",
    ]
    for c in sorted(branded_excluded, key=lambda x: -x["impressions"]):
        lines.append(f"| {c['query'][:60]} | {c['impressions']} |")

    lines += [
        "",
        "---",
        "",
        "## Auto-excluded: pillar overlap",
        "",
        f"Jaccard ≥ {PILLAR_REJECT_THRESHOLD} against a pillar/core page.",
        "",
        "| Query | Impr | Nearest pillar |",
        "|-------|------|----------------|",
    ]
    for c in sorted(pillar_excluded, key=lambda x: -x["impressions"]):
        lines.append(f"| {c['query'][:60]} | {c['impressions']} | {c['nearest_pillar'][:40]} |")

    lines += [
        "",
        "---",
        "",
        "## Verdict key",
        "- **winnable-likely**: ≥2 non-authority competitors in top 10, no gov/nhs/wiki wall at 1-3",
        "- **review**: manual judgment needed",
        "",
        "## Next steps",
        "1. Sonnet judgment pass (Phase C2) — cluster near-dupes, resolve WRONG_PAGE ambiguity",
        "2. Owner approval",
        f"3. `python -m optimisation_engine.discovery.batch_builder --site {site_key} --commit-topics`",
    ]

    # ponytail: preserve any human/Sonnet sections appended after the machine block
    _PRESERVE_MARKERS = ("## sonnet review", "## cross-estate")
    _preserved_tail = ""
    if report_path.exists():
        existing = report_path.read_text(encoding="utf-8")
        for line in existing.splitlines():
            if line.lower().lstrip().startswith(_PRESERVE_MARKERS):
                idx = existing.find(line)
                _preserved_tail = "\n\n---\n\n> _Machine section rebuilt " \
                    + str(__import__('datetime').date.today()) \
                    + "; review sections below preserved from previous run._\n\n" \
                    + existing[idx:]
                break

    content = "\n".join(lines) + _preserved_tail
    report_path.write_text(content, encoding="utf-8")
    print(f"[batch] report written: {report_path}")
    print(f"[batch] summary: {len(candidates)} candidates -> "
          f"{len(branded_excluded)} branded, {len(serp_served_lane)} SERP_SERVED, "
          f"{len(pillar_excluded)} pillar-overlap, {below_floor} below-floor, "
          f"{len(scored)} new-page survivors")

    if commit_topics:
        # Curated list (verified report topics incl. sitemap lane, Sonnet strikes
        # applied) takes precedence over the raw GSC-lane scored survivors.
        curated_path = ROOT / "briefs" / site_key / "discovery_2026-07" / "curated_topics.json"
        if curated_path.exists():
            curated = json.loads(curated_path.read_text(encoding="utf-8"))
            print(f"[batch] --commit-topics: inserting {len(curated)} CURATED rows into {table} ({curated_path.name})")
            _insert_blog_topics(site_key, table, curated)
        elif not scored:
            print("[batch] no candidates to insert")
        else:
            print(f"[batch] --commit-topics: no curated_topics.json — inserting {len(scored)} raw GSC-lane rows into {table}")
            _insert_blog_topics(site_key, table, scored)
    else:
        print(f"[batch] report-only mode (pass --commit-topics to write to {table})")

    return scored


def main() -> None:
    parser = argparse.ArgumentParser(description="Batch builder: triage + SERP → report")
    parser.add_argument("--site", required=True)
    parser.add_argument("--commit-topics", action="store_true",
                        help="Write approved candidates to blog_topics (default: report only)")
    args = parser.parse_args()

    build(args.site, commit_topics=args.commit_topics)


if __name__ == "__main__":
    # Self-check
    assert _jaccard({"landlord", "tax"}, {"landlord", "tax", "guide"}) > 0.5
    assert _jaccard(set(), {"foo"}) == 0.0
    # Title-catches-but-slug-misses: "declaration of trust" topic vs a page whose
    # slug is "declaration-of-trust-property-beneficial-ownership-form-17" but whose
    # title is "Declaration of Trust: Beneficial Ownership and Form 17".
    _fake_inv = [{
        "slug": "declaration-of-trust-property-beneficial-ownership-form-17",
        "slug_tokens": _tokenise("declaration-of-trust-property-beneficial-ownership-form-17"),
        "title_tokens": _tokenise("Declaration of Trust Beneficial Ownership and Form 17"),
        "tokens": _tokenise("declaration-of-trust-property-beneficial-ownership-form-17 Declaration of Trust Beneficial Ownership and Form 17"),
        "title": "Declaration of Trust: Beneficial Ownership and Form 17",
    }]
    _cand_tokens = _tokenise("declaration of trust joint property ownership landlords")
    _overlap, _near = _max_overlap(_cand_tokens, _fake_inv)
    assert _overlap >= 0.30, (
        f"Title-match should catch declaration-of-trust duplicate, got overlap={_overlap}"
    )
    # Pillar reject threshold
    toks = _tokenise("section 24 tax relief landlord")
    pillar_toks = _tokenise("section 24 tax relief")
    j = _jaccard(toks, pillar_toks)
    assert j >= PILLAR_REJECT_THRESHOLD, f"Expected >= {PILLAR_REJECT_THRESHOLD}, got {j}"
    # SERP_SERVED detection
    _fake_serp = {"some landlord query": {"results": [
        {"position": 1, "link": "https://www.propertytaxpartners.co.uk/blog/foo", "domain": "propertytaxpartners.co.uk"},
    ]}}
    served, url, pos = _serp_served("some landlord query", _fake_serp, "propertytaxpartners.co.uk")
    assert served and pos == 1, "SERP_SERVED detection failed"
    not_served, _, _ = _serp_served("unknown query", _fake_serp, "propertytaxpartners.co.uk")
    assert not not_served, "SERP_SERVED false positive"
    # Branded stem detection
    stems = _branded_stems(["hollowaydavies.co.uk", "ukpropertyaccountants.co.uk"])
    assert _is_branded("hollowaydavies tax return", stems)
    assert not _is_branded("landlord tax return uk", stems)
    # BRAND_EXTRA stems
    extra_stems = stems + BRAND_EXTRA.get("property", [])
    assert _is_branded("djh property tax", extra_stems), "BRAND_EXTRA djh stem failed"
    # Preservation: _PRESERVE_MARKERS must match lowercase line starts
    _pm = ("## sonnet review", "## cross-estate")
    _fake_existing = "# Gap\n\n## Machine stuff\n\n## Sonnet review (2026-07)\nSome human text\n"
    for _line in _fake_existing.splitlines():
        if _line.lower().lstrip().startswith(_pm):
            break
    assert "Sonnet review" in _line, "Preservation marker detection failed"
    # SERP_SERVED near-duplicate phrasing variant
    a = _stem_tokens(_tokenise("report capital gains tax on property"))
    b = _stem_tokens(_tokenise("reporting capital gains tax on property"))
    assert _jaccard(a, b) >= SERP_SERVED_NEAR_DUPE, "near-dupe phrasing should exceed threshold"
    c = _stem_tokens(_tokenise("stamp duty refund second home"))
    assert _jaccard(a, c) < SERP_SERVED_NEAR_DUPE
    print("self-check OK")
    main()
