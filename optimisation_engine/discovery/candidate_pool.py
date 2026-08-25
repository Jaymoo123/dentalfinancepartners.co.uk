"""
Unified discovery candidate pool: six ingest sources merged, enriched
cheapest-first, scored, and written to a per-site markdown report (with an
optional Supabase upsert).

Six ingest sources (raw candidate dicts: {candidate, source, volume, kd, cpc,
intent, raw}):
  1. sitemap          — briefs/<site>/_competitor_urls.json (Track A sitemap
                         scrape). candidate = slug words, floor-filtered via
                         tokens_from_slug (>=3 tokens). Free.
  2. dfs_ranked        — DataForSEOClient.ranked_keywords per competitor
                         domain. Paid, --spend only; else reads persisted
                         dataforseo_competitor_data rows for those domains.
  3. dfs_intersection  — DataForSEOClient.domain_intersection(own, competitor).
                         Paid, --spend only. dataforseo_competitor_data has no
                         endpoint column to distinguish this from dfs_ranked
                         rows, so the dry-run path is 0 (that table's dry-run
                         read is already covered under dfs_ranked) — real data
                         only arrives with --spend.
  4. gsc               — query_triage.triage(): WRONG_PAGE + UNSERVED classes.
                         Maturation window: candidates whose serving page's
                         blog frontmatter 'date' is < MATURATION_DAYS old are
                         excluded (best-effort — only checked when the page's
                         slug matches a local .md file; unmatched pages are
                         kept rather than guessed at).
  5. autocomplete      — seo-research/autocomplete-candidates.csv (see
                         generalist/pipeline/autocomplete_expand.py for the
                         format). Skipped silently if not found for the site.
  6. bing_kw           — bing_query_client.get_related_keywords(), seeded with
                         the site's top ~10 GSC head queries. Free.

Normalisation: casefold + strip + collapse whitespace, then merge sources
into one row keyed by that normalised text. The primary `source` column is
whichever ingest step found the candidate first (ingest order above); every
contributing source is tracked in raw['sources']. Best-populated wins per
field (a later source's real value fills a None, never overwrites one).

Enrichment ladder (cheapest first):
  - keep volume/kd/cpc already carried by a source (DFS keyword_info).
  - --spend only: bulk_keyword_difficulty for survivors still missing kd.
  - winnability: DDG-only SERP check (serp_verify's _fetch_ddg/_winnable
    functions) for the top SERP_VERIFY_TOPN=40 candidates by PROVISIONAL
    score (computed with a neutral winnability placeholder). Everyone else
    keeps the neutral placeholder. --spend flips the SERP check to
    serp_provider's default dual mode (DataForSEO + DDG, ~$0.002/call,
    budget-gated) instead of forcing DDG-only.
  - intent: heuristic only, no LLM. transactional if the candidate contains
    accountant/services/hire/fees/cost/near me/calculator; commercial if it
    contains vs/best/top/review/company/incorporat; else informational.

Novelty: reuses batch_builder's inventory loaders (live blog slugs,
blog_topics, pillar pages, uncommitted wave drafts) via import — see
_build_inventory(). novelty = 1 - max Jaccard overlap vs that inventory.
Pillar overlap >= batch_builder.PILLAR_REJECT_THRESHOLD (0.30) is a hard
reject, same rule batch_builder applies.

Score = demand x winnability x novelty x intent_weight
  demand = volume if known, else GSC impressions for gsc-sourced rows with
           no volume, else DEFAULT_DEMAND=10 (conservative default).
  winnability = 1.0 winnable-likely / 0.5 review (verified top-N) or the
           neutral placeholder NEUTRAL_WINNABILITY=0.75 (unverified).
  intent_weight = 1.0 / 1.3 / 1.5 (informational / commercial / transactional).

Output: docs/<site_key>/candidate_pool_<date>.md — ranked table (top 150) +
per-source raw counts + every cap/drop applied (no silent caps).

--commit upserts into Supabase discovery_candidates (UNIQUE(site_key,
candidate); on_conflict=site_key,candidate merges best fields). If the table
doesn't exist yet, prints "apply migration 20260815000001 first" and returns
without raising — dry-run never touches this table at all.

CLI:
  python -m optimisation_engine.discovery.candidate_pool property
  python -m optimisation_engine.discovery.candidate_pool property --spend
  python -m optimisation_engine.discovery.candidate_pool property --commit
  python -m optimisation_engine.discovery.candidate_pool property --skip-paid --limit-competitors 5
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql, _esc          # noqa: E402
from optimisation_engine.config import get_site, SUPABASE_URL, SUPABASE_KEY  # noqa: E402
from optimisation_engine.cost_tracker import BudgetExceeded, IdempotencyHit  # noqa: E402
from optimisation_engine.clients.dataforseo_client import (        # noqa: E402
    DataForSEOClient,
    persist_ranked_keywords,
    persist_domain_intersection,
    persist_bulk_keyword_difficulty,
)
from optimisation_engine.clients.bing_query_client import get_related_keywords  # noqa: E402
from optimisation_engine.discovery.query_triage import triage      # noqa: E402
from optimisation_engine.discovery import serp_verify as _sv       # noqa: E402
from optimisation_engine.discovery.lane_map import assign_lane     # noqa: E402
from optimisation_engine.discovery.batch_builder import (          # noqa: E402
    _tokenise,
    _max_overlap,
    _load_blog_inventory,
    _load_blog_topics,
    _load_pillar_pages,
    _load_wave_draft_slugs,
    PILLAR_REJECT_THRESHOLD,
)
from scripts.property_sitemap_sweep_v2 import tokens_from_slug     # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
DEFAULT_DEMAND = 10
MATURATION_DAYS = 60
SERP_VERIFY_TOPN = 40
NEUTRAL_WINNABILITY = 0.75   # placeholder for candidates outside the verified top-N
TOP_N_REPORT = 150

TRANSACTIONAL_HINTS = ["accountant", "services", "hire", "fees", "cost", "near me", "calculator"]
COMMERCIAL_HINTS = ["vs", "best", "top", "review", "company", "incorporat"]
INTENT_WEIGHT = {"informational": 1.0, "commercial": 1.3, "transactional": 1.5}

INGEST_ORDER = ["sitemap", "dfs_ranked", "dfs_intersection", "gsc", "autocomplete", "bing_kw"]

# Sources exempt from the topical lane gate: gsc only (our own demand).
# sitemap was originally exempt too, but the v2 universe includes broad
# generalist/media competitors (rossmartin 5.7k URLs, landlordzone 4.4k) whose
# sitemap slugs are shape-filtered, not topic-filtered — "tax-free-childcare"
# sailed through. Everything except gsc now needs a lane token match.
UNGATED_SOURCES = {"gsc"}


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip().casefold())


def classify_intent(candidate: str) -> str:
    c = candidate.casefold()
    if any(h in c for h in TRANSACTIONAL_HINTS):
        return "transactional"
    if any(h in c for h in COMMERCIAL_HINTS):
        return "commercial"
    return "informational"


# ---------------------------------------------------------------------------
# 1. sitemap
# ---------------------------------------------------------------------------

def _ingest_sitemap(site_key: str, allowed_domains: set | None) -> tuple[list[dict], dict]:
    path = ROOT / "briefs" / site_key / "_competitor_urls.json"
    stats = {"file_found": path.exists(), "raw_urls": 0, "kept": 0, "dropped_short_tokens": 0}
    if not path.exists():
        return [], stats
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"[candidate_pool] sitemap: failed to parse {path}: {exc}")
        return [], stats

    out: list[dict] = []
    for domain, urls in data.items():
        if allowed_domains is not None and domain not in allowed_domains:
            continue
        for u in urls:
            stats["raw_urls"] += 1
            slug = u.get("slug", "")
            # ponytail: token-count floor only (>=3 tokens via tokens_from_slug),
            # no site-specific topical/news/foreign-language filtering — that's
            # is_property_topical's job and it's property-only vocabulary.
            # Novelty scoring downstream naturally deprioritises junk; upgrade
            # to a shared cross-site topical filter if noise proves material.
            if len(tokens_from_slug(slug)) < 3:
                stats["dropped_short_tokens"] += 1
                continue
            phrase = re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()
            if not phrase:
                continue
            stats["kept"] += 1
            out.append({
                "candidate": phrase, "source": "sitemap", "volume": None, "kd": None,
                "cpc": None, "intent": None,
                "raw": {"domain": domain, "url": u.get("url", ""), "lastmod": u.get("lastmod", "")},
            })
    return out, stats


# ---------------------------------------------------------------------------
# 2. dfs_ranked
# ---------------------------------------------------------------------------

def _parse_ranked_keywords_items(response: dict, competitor_domain: str) -> list[dict]:
    out = []
    for task in response.get("tasks", []) or []:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw_data = item.get("keyword_data", {}) or {}
                ki = kw_data.get("keyword_info", {}) or {}
                kw = kw_data.get("keyword")
                if not kw:
                    continue
                out.append({
                    "candidate": kw, "source": "dfs_ranked", "volume": ki.get("search_volume"),
                    "kd": None, "cpc": ki.get("cpc"), "intent": None,
                    "raw": {"competitor_domain": competitor_domain},
                })
    return out


def _ingest_dfs_ranked(site_key: str, competitors: list[str], spend: bool) -> tuple[list[dict], dict]:
    stats: dict[str, Any] = {"paid_calls": 0, "errors": 0}
    out: list[dict] = []
    if not competitors:
        return out, stats

    if spend:
        client = DataForSEOClient()
        for comp in competitors:
            try:
                resp = client.ranked_keywords(site_key=site_key, domain=comp, limit=500)
                persist_ranked_keywords(site_key=site_key, competitor_domain=comp, response=resp)
                stats["paid_calls"] += 1
                out.extend(_parse_ranked_keywords_items(resp, comp))
            except (BudgetExceeded, IdempotencyHit) as exc:
                print(f"[candidate_pool] dfs_ranked({comp}) skipped: {exc}")
                stats["errors"] += 1
        return out, stats

    domains_sql = ", ".join(_esc(c) for c in competitors)
    try:
        rows = _sql(f"""
            SELECT competitor_domain, ranked_keyword, search_volume, keyword_difficulty, cpc
            FROM dataforseo_competitor_data
            WHERE site_key = {_esc(site_key)}
              AND competitor_domain IN ({domains_sql})
              AND ranked_keyword IS NOT NULL
        """)
    except Exception as exc:
        print(f"[candidate_pool] dfs_ranked persisted-read failed: {exc}")
        return out, stats

    for r in rows:
        out.append({
            "candidate": r.get("ranked_keyword") or "", "source": "dfs_ranked",
            "volume": r.get("search_volume"), "kd": r.get("keyword_difficulty"),
            "cpc": r.get("cpc"), "intent": None,
            "raw": {"competitor_domain": r.get("competitor_domain")},
        })
    stats["persisted_rows"] = len(rows)
    return out, stats


# ---------------------------------------------------------------------------
# 3. dfs_intersection
# ---------------------------------------------------------------------------

def _ingest_dfs_intersection(
    site_key: str, own_domain: str, competitors: list[str], spend: bool
) -> tuple[list[dict], dict]:
    stats: dict[str, Any] = {"paid_calls": 0, "errors": 0}
    out: list[dict] = []
    if not spend or not own_domain or not competitors:
        return out, stats

    client = DataForSEOClient()
    for comp in competitors:
        try:
            resp = client.domain_intersection(own_domain, comp, site_key=site_key, limit=500)
            persist_domain_intersection(site_key=site_key, domain1=own_domain, domain2=comp, response=resp)
            stats["paid_calls"] += 1
            for task in resp.get("tasks", []) or []:
                for result in task.get("result", []) or []:
                    for item in result.get("items", []) or []:
                        kw_data = item.get("keyword_data", {}) or {}
                        ki = kw_data.get("keyword_info", {}) or {}
                        kw = kw_data.get("keyword")
                        if not kw:
                            continue
                        out.append({
                            "candidate": kw, "source": "dfs_intersection",
                            "volume": ki.get("search_volume"), "kd": None,
                            "cpc": ki.get("cpc"), "intent": None,
                            "raw": {"competitor_domain": comp},
                        })
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[candidate_pool] dfs_intersection({comp}) skipped: {exc}")
            stats["errors"] += 1
    return out, stats


# ---------------------------------------------------------------------------
# 4. gsc (+ 60-day maturation window on the serving page)
# ---------------------------------------------------------------------------

def _page_age_days(content_dir: str, page_url: str) -> int | None:
    """Best-effort page age via blog frontmatter 'date'. None = can't tell
    cheaply (no local .md matched by slug) — caller keeps those rather than
    guessing."""
    if not content_dir or not page_url:
        return None
    slug = page_url.rstrip("/").split("/")[-1]
    if not slug:
        return None
    p = ROOT / content_dir / f"{slug}.md"
    if not p.exists():
        return None
    text = p.read_text(encoding="utf-8", errors="ignore")
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    try:
        fm = yaml.safe_load(text[3:end]) or {}
    except yaml.YAMLError:
        return None
    d = fm.get("date")
    if not d:
        return None
    try:
        page_date = date.fromisoformat(str(d)[:10])
    except ValueError:
        return None
    return (date.today() - page_date).days


_GSC_JUNK = re.compile(r'(site:|-site:|inurl:|intitle:|filetype:|")')


def _is_junk_gsc_query(q: str) -> bool:
    """Search-operator queries (someone's research probes landing in our GSC)
    are not demand: site:/quoted/boolean monsters, or absurd length."""
    return bool(_GSC_JUNK.search(q)) or len(q) > 90


def _ingest_gsc(site_key: str, content_dir: str) -> tuple[list[dict], dict]:
    results = triage(site_key)
    out: list[dict] = []
    stats = {"immature_excluded": 0, "age_unknown": 0, "junk_queries": 0}
    for r in results:
        if r.get("class") not in ("WRONG_PAGE", "UNSERVED"):
            continue
        if _is_junk_gsc_query(r.get("query") or ""):
            stats["junk_queries"] += 1
            continue
        page_url = r.get("page_url") or ""
        if page_url:
            age = _page_age_days(content_dir, page_url)
            if age is None:
                stats["age_unknown"] += 1
            elif age < MATURATION_DAYS:
                stats["immature_excluded"] += 1
                continue
        out.append({
            "candidate": r.get("query") or "", "source": "gsc", "volume": None,
            "kd": None, "cpc": None, "intent": None,
            "raw": {"impressions": int(r.get("impressions") or 0), "class": r.get("class"),
                    "page_url": page_url},
        })
    return out, stats


# ---------------------------------------------------------------------------
# 5. autocomplete
# ---------------------------------------------------------------------------

def _autocomplete_csv_path(site_key: str) -> Path | None:
    for candidate in (
        ROOT / site_key / "seo-research" / "autocomplete-candidates.csv",
        ROOT / site_key.capitalize() / "seo-research" / "autocomplete-candidates.csv",
        ROOT / "seo-research" / "autocomplete-candidates.csv",
    ):
        if candidate.exists():
            return candidate
    return None


def _ingest_autocomplete(site_key: str) -> list[dict]:
    path = _autocomplete_csv_path(site_key)
    if not path:
        return []
    out = []
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            s = (row.get("suggestion") or "").strip()
            if not s:
                continue
            out.append({
                "candidate": s, "source": "autocomplete", "volume": None, "kd": None,
                "cpc": None, "intent": None,
                "raw": {"source_keyword": row.get("source_keyword", "")},
            })
    return out


# ---------------------------------------------------------------------------
# 6. bing_kw
# ---------------------------------------------------------------------------

def _top_gsc_head_queries(site_key: str, n: int = 10) -> list[str]:
    try:
        rows = _sql(f"""
            SELECT query, SUM(impressions) AS impressions
            FROM gsc_query_data
            WHERE site_key = {_esc(site_key)}
            GROUP BY query
            ORDER BY impressions DESC
            LIMIT {int(n)}
        """)
    except Exception as exc:
        print(f"[candidate_pool] bing_kw seed query failed: {exc}")
        return []
    return [r["query"] for r in rows if r.get("query")]


def _ingest_bing_kw(site_key: str) -> tuple[list[dict], dict]:
    seeds = _top_gsc_head_queries(site_key, n=10)
    out: list[dict] = []
    stats = {"seeds": len(seeds), "errors": 0}
    for seed in seeds:
        try:
            rows = get_related_keywords(seed)
        except Exception as exc:
            print(f"[candidate_pool] bing_kw({seed!r}) failed: {exc}")
            stats["errors"] += 1
            continue
        for r in rows:
            q = (r.get("Query") or "").strip()
            if not q:
                continue
            out.append({
                "candidate": q, "source": "bing_kw", "volume": r.get("Impressions"),
                "kd": None, "cpc": None, "intent": None, "raw": {"seed": seed},
            })
    return out, stats


# ---------------------------------------------------------------------------
# Merge / dedupe
# ---------------------------------------------------------------------------

def _merge(raw_lists: dict[str, list[dict]]) -> list[dict]:
    merged: dict[str, dict] = {}
    for source in INGEST_ORDER:
        for row in raw_lists.get(source, []):
            key = _norm(row.get("candidate", ""))
            if not key:
                continue
            if key not in merged:
                merged[key] = {
                    "candidate": key,
                    "source": row["source"],  # primary = first source to find it (ingest order)
                    "volume": row.get("volume"),
                    "kd": row.get("kd"),
                    "cpc": row.get("cpc"),
                    "intent": None,  # heuristic-computed after merge
                    "raw": {"sources": [row["source"]], row["source"]: row.get("raw") or {}},
                }
            else:
                m = merged[key]
                if row["source"] not in m["raw"]["sources"]:
                    m["raw"]["sources"].append(row["source"])
                m["raw"][row["source"]] = row.get("raw") or {}
                for field in ("volume", "kd", "cpc"):
                    if not m.get(field) and row.get(field):
                        m[field] = row.get(field)
    return list(merged.values())


def _demand(row: dict) -> float:
    if row.get("volume"):
        return float(row["volume"])
    if "gsc" in row.get("raw", {}).get("sources", []):
        imp = row["raw"].get("gsc", {}).get("impressions")
        if imp:
            return float(imp)
    return float(DEFAULT_DEMAND)


# ---------------------------------------------------------------------------
# Novelty (reuse batch_builder's inventory loaders)
# ---------------------------------------------------------------------------

def _build_inventory(site_key: str, content_dir: str) -> tuple[list[dict], list[dict]]:
    table = "blog_topics"
    blog_inv = _load_blog_inventory(content_dir)
    topics_inv = [
        {"slug": r.get("slug") or r.get("topic", ""),
         "tokens": _tokenise((r.get("topic") or "") + " " + (r.get("primary_keyword") or "")),
         "title": r.get("topic", "")}
        for r in _load_blog_topics(site_key, table)
    ]
    pillar_inv = _load_pillar_pages(site_key)
    draft_inv = _load_wave_draft_slugs(site_key) if site_key in ("solicitors", "medical") else []
    return blog_inv + topics_inv + draft_inv, pillar_inv


# ---------------------------------------------------------------------------
# Winnability (reuse serp_verify's fetch + verdict functions)
# ---------------------------------------------------------------------------

def _check_winnability(query: str, site_key: str, our_domain: str, spend: bool) -> float:
    prev_mode = os.environ.get("SERP_PROVIDER_MODE")
    if not spend:
        os.environ["SERP_PROVIDER_MODE"] = "ddg_only"  # dry-run must never hit paid DFS
    try:
        fetched = _sv._fetch_ddg(query, site_key)
        verdict = _sv._winnable(fetched.get("organic") or [], our_domain)
    except Exception as exc:
        print(f"[candidate_pool] winnability check failed for {query!r}: {exc}")
        verdict = "review"
    finally:
        if not spend:
            if prev_mode is None:
                os.environ.pop("SERP_PROVIDER_MODE", None)
            else:
                os.environ["SERP_PROVIDER_MODE"] = prev_mode
    return 1.0 if verdict == "winnable-likely" else 0.5


# ---------------------------------------------------------------------------
# KD enrichment (--spend only)
# ---------------------------------------------------------------------------

def _enrich_kd(site_key: str, survivors: list[dict], stats: dict) -> None:
    missing = [r for r in survivors if not r.get("kd")][:1000]
    if not missing:
        return
    try:
        client = DataForSEOClient()
        resp = client.bulk_keyword_difficulty(site_key=site_key, keywords=[r["candidate"] for r in missing])
        persist_bulk_keyword_difficulty(site_key=site_key, response=resp)
    except (BudgetExceeded, IdempotencyHit) as exc:
        print(f"[candidate_pool] bulk_keyword_difficulty skipped: {exc}")
        return
    kd_map = {}
    for task in resp.get("tasks", []) or []:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw = item.get("keyword")
                if kw:
                    kd_map[_norm(kw)] = item.get("keyword_difficulty")
    filled = 0
    for r in missing:
        kd = kd_map.get(_norm(r["candidate"]))
        if kd is not None:
            r["kd"] = kd
            filled += 1
    stats.setdefault("caps", []).append(
        f"bulk_keyword_difficulty: enriched {filled}/{len(missing)} missing-KD survivors"
    )


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def _write_report(site_key: str, top_rows: list[dict], stats: dict, pillar_rejected: list[dict]) -> Path:
    docs_dir = ROOT / "docs" / site_key
    docs_dir.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()
    report_path = docs_dir / f"candidate_pool_{today}.md"

    lines = [
        f"# Candidate Pool — {site_key}",
        "",
        f"Generated: {today}  ",
        f"Mode: {'--spend (paid pulls enabled)' if stats['spend'] else 'dry-run (free sources only)'}  ",
        f"Merged candidates: {stats['merged_total']}  ",
        f"Pillar-overlap rejected: {stats['pillar_rejected']}  ",
        f"**Survivors (scored): {stats['survivors']}**",
        "",
        "---",
        "",
        "## Per-source raw counts (pre-merge, pre-reject)",
        "",
        "| Source | Raw candidates |",
        "|---|---:|",
    ]
    for src in INGEST_ORDER:
        lines.append(f"| {src} | {stats['per_source_raw_counts'].get(src, 0)} |")

    lines += ["", "## Caps / drops applied", ""]
    if stats["caps"]:
        for c in stats["caps"]:
            lines.append(f"- {c}")
    else:
        lines.append("- (none)")

    lines += ["", "## Per-source ingest detail", ""]
    for key, label in (
        ("sitemap_stats", "sitemap"),
        ("dfs_ranked_stats", "dfs_ranked"),
        ("dfs_intersection_stats", "dfs_intersection"),
        ("gsc_stats", "gsc"),
        ("bing_kw_stats", "bing_kw"),
    ):
        if stats.get(key) is not None:
            lines.append(f"- **{label}**: {stats[key]}")

    lines += [
        "",
        "---",
        "",
        f"## Top {len(top_rows)} candidates by score",
        "",
        "| # | Candidate | Lane | Source | Sources | Vol | KD | CPC | Intent | Win | Novelty | Score |",
        "|---|---|---|---|---|---:|---:|---:|---|---:|---:|---:|",
    ]
    for i, r in enumerate(top_rows, 1):
        srcs = ",".join(r["raw"].get("sources", [r["source"]]))
        lines.append(
            f"| {i} | {r['candidate'][:70]} | {r.get('lane') or '-'} | {r['source']} | {srcs} | "
            f"{r.get('volume') or '-'} | {r.get('kd') or '-'} | {r.get('cpc') or '-'} | "
            f"{r['intent']} | {r['winnability']} | {r['novelty']} | {r['score']} |"
        )

    if pillar_rejected:
        lines += [
            "",
            "---",
            "",
            f"## Pillar-overlap rejected ({len(pillar_rejected)})",
            "",
            f"Jaccard >= {PILLAR_REJECT_THRESHOLD} against a pillar/core page — hard reject.",
            "",
            "| Candidate | Nearest pillar | Overlap |",
            "|---|---|---:|",
        ]
        top_rejects = sorted(pillar_rejected, key=lambda x: -x["pillar_overlap"])[:50]
        for r in top_rejects:
            lines.append(f"| {r['candidate'][:70]} | {r['nearest_pillar'][:40]} | {r['pillar_overlap']} |")
        if len(pillar_rejected) > 50:
            lines.append(f"| *(+{len(pillar_rejected) - 50} more, not listed)* | | |")

    report_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"[candidate_pool] report written: {report_path}")
    return report_path


# ---------------------------------------------------------------------------
# Commit (Supabase upsert)
# ---------------------------------------------------------------------------

def _commit(site_key: str, rows: list[dict]) -> None:
    if not rows:
        print("[candidate_pool] --commit: nothing to upsert")
        return
    import httpx

    payload = [
        {
            "site_key": site_key,
            "candidate": r["candidate"],
            "source": r["source"],
            "lane": r.get("lane"),
            "volume": r.get("volume"),
            "kd": r.get("kd"),
            "cpc": r.get("cpc"),
            "intent": r.get("intent"),
            "winnability": r.get("winnability"),
            "novelty": r.get("novelty"),
            "score": r.get("score"),
            "raw": r.get("raw"),
        }
        for r in rows
    ]
    url = f"{SUPABASE_URL}/rest/v1/discovery_candidates"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    params = {"on_conflict": "site_key,candidate"}
    inserted = 0
    for i in range(0, len(payload), 500):
        chunk = payload[i:i + 500]
        r = httpx.post(url, headers=headers, params=params, json=chunk, timeout=60.0)
        if r.status_code >= 300:
            body = r.text
            if r.status_code == 404 or "does not exist" in body.lower():
                print("[candidate_pool] discovery_candidates table missing — apply migration 20260815000001 first")
                return
            print(f"[candidate_pool] upsert chunk {i} failed: {r.status_code} {body[:200]}")
            continue
        inserted += len(chunk)
    print(f"[candidate_pool] --commit: upserted {inserted} rows into discovery_candidates")


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def build(
    site_key: str,
    *,
    spend: bool = False,
    skip_paid: bool = False,
    limit_competitors: int | None = None,
    commit: bool = False,
) -> dict:
    effective_spend = spend and not skip_paid

    site = get_site(site_key)
    content_dir = site.get("content_dir") or ""
    own_domain_bare = (site.get("domain") or "").strip()

    disc_path = ROOT / "sites" / f"{site_key}.discovery.json"
    disc: dict = {}
    if disc_path.exists():
        try:
            disc = json.loads(disc_path.read_text(encoding="utf-8"))
        except Exception:
            pass
    # Static + auto-detected (competitor_watch --probe-universe) combined, static first.
    competitors = list(disc.get("competitors", []) or []) + [
        a.get("domain", "") for a in (disc.get("competitors_auto") or []) if a.get("domain")
    ]
    disc_own_domain = disc.get("ownDomain") or own_domain_bare
    lanes = disc.get("lanes") or []
    lane_negs = disc.get("lane_negative_tokens") or []

    stats: dict[str, Any] = {"site_key": site_key, "spend": effective_spend, "caps": []}
    if limit_competitors is not None:
        stats["caps"].append(f"competitors capped to {limit_competitors} (of {len(competitors)})")
        competitors = competitors[:limit_competitors]

    sitemap_allowed = set(competitors) if limit_competitors is not None else None

    raw_lists: dict[str, list[dict]] = {}
    raw_lists["sitemap"], stats["sitemap_stats"] = _ingest_sitemap(site_key, sitemap_allowed)
    raw_lists["dfs_ranked"], stats["dfs_ranked_stats"] = _ingest_dfs_ranked(site_key, competitors, effective_spend)
    raw_lists["dfs_intersection"], stats["dfs_intersection_stats"] = _ingest_dfs_intersection(
        site_key, disc_own_domain, competitors, effective_spend
    )
    raw_lists["gsc"], stats["gsc_stats"] = _ingest_gsc(site_key, content_dir)
    raw_lists["autocomplete"] = _ingest_autocomplete(site_key)
    if not raw_lists["autocomplete"]:
        stats["caps"].append("autocomplete: source CSV not found for this site, skipped")
    raw_lists["bing_kw"], stats["bing_kw_stats"] = _ingest_bing_kw(site_key)

    stats["per_source_raw_counts"] = {k: len(v) for k, v in raw_lists.items()}
    if stats["gsc_stats"]["immature_excluded"]:
        stats["caps"].append(
            f"gsc: {stats['gsc_stats']['immature_excluded']} candidates excluded "
            f"(serving page < {MATURATION_DAYS}d old)"
        )
    if stats["sitemap_stats"].get("dropped_short_tokens"):
        stats["caps"].append(
            f"sitemap: {stats['sitemap_stats']['dropped_short_tokens']} URLs dropped (<3 slug tokens)"
        )
    if not effective_spend:
        stats["caps"].append("dfs_intersection: paid-only, 0 in dry-run (no distinguishable persisted rows)")

    merged = _merge(raw_lists)

    # Topical lane gate: bing_kw/autocomplete/dfs_* candidates with no lane
    # token match (generic non-niche noise like "companies house", "hmrc
    # login") are dropped so they can't dominate the score ranking on raw
    # volume alone. gsc/sitemap-sourced candidates are exempt (see
    # UNGATED_SOURCES) but still get a lane assigned when one matches.
    if lanes:
        dropped_by_source: dict[str, int] = {}
        dropped_examples: dict[str, list[str]] = {}
        kept: list[dict] = []
        for m in merged:
            m["lane"] = assign_lane(m["candidate"], lanes, lane_negs)
            srcs = set(m["raw"].get("sources", [m["source"]]))
            if m["lane"] is None and not (srcs & UNGATED_SOURCES):
                primary = m["source"]
                dropped_by_source[primary] = dropped_by_source.get(primary, 0) + 1
                if len(dropped_examples.setdefault(primary, [])) < 10:
                    dropped_examples[primary].append(m["candidate"])
                continue
            kept.append(m)
        merged = kept
        for src in sorted(dropped_by_source):
            examples = "; ".join(dropped_examples[src])
            stats["caps"].append(
                f"{src}: {dropped_by_source[src]} candidates dropped (lane gate, no topical "
                f"token match) — e.g. {examples}"
            )
    else:
        for m in merged:
            m["lane"] = None
        stats["caps"].append("lane gate: skipped, no 'lanes' key in sites/*.discovery.json for this site")

    for m in merged:
        m["intent"] = classify_intent(m["candidate"])

    all_inv, pillar_inv = _build_inventory(site_key, content_dir)

    survivors: list[dict] = []
    pillar_rejected: list[dict] = []
    for row in merged:
        tokens = _tokenise(row["candidate"])
        p_overlap, p_slug = _max_overlap(tokens, pillar_inv)
        if p_overlap >= PILLAR_REJECT_THRESHOLD:
            pillar_rejected.append({**row, "nearest_pillar": p_slug, "pillar_overlap": round(p_overlap, 3)})
            continue
        overlap, nearest = _max_overlap(tokens, all_inv)
        row["novelty"] = round(1.0 - overlap, 3)
        row["nearest_existing"] = nearest
        row["demand"] = _demand(row)
        survivors.append(row)

    stats["merged_total"] = len(merged)
    stats["pillar_rejected"] = len(pillar_rejected)
    stats["survivors"] = len(survivors)

    survivors.sort(
        key=lambda r: -(r["demand"] * NEUTRAL_WINNABILITY * r["novelty"] * INTENT_WEIGHT[r["intent"]])
    )

    our_domain_root = _sv._root_domain("https://" + own_domain_bare) if own_domain_bare else ""
    verify_n = min(SERP_VERIFY_TOPN, len(survivors))
    for row in survivors[:verify_n]:
        row["winnability"] = _check_winnability(row["candidate"], site_key, our_domain_root, effective_spend)
    for row in survivors[verify_n:]:
        row["winnability"] = NEUTRAL_WINNABILITY
    stats["caps"].append(
        f"SERP winnability verified for top {verify_n} of {len(survivors)} by provisional score "
        f"(N={SERP_VERIFY_TOPN}); rest use neutral placeholder {NEUTRAL_WINNABILITY}"
    )

    if effective_spend:
        _enrich_kd(site_key, survivors, stats)

    for row in survivors:
        row["score"] = round(
            row["demand"] * row["winnability"] * row["novelty"] * INTENT_WEIGHT[row["intent"]], 3
        )
    survivors.sort(key=lambda r: -r["score"])

    top_rows = survivors[:TOP_N_REPORT]
    if len(survivors) > TOP_N_REPORT:
        stats["caps"].append(f"report truncated to top {TOP_N_REPORT} of {len(survivors)} survivors")

    stats["report_path"] = str(_write_report(site_key, top_rows, stats, pillar_rejected))

    if commit:
        _commit(site_key, survivors)
    else:
        print("[candidate_pool] dry-run (pass --commit to upsert into discovery_candidates)")

    stats["top10"] = [
        {"candidate": r["candidate"], "score": r["score"], "source": r["source"]}
        for r in top_rows[:10]
    ]
    return stats


def main() -> None:
    parser = argparse.ArgumentParser(description="Unified discovery candidate pool + scoring")
    parser.add_argument("site_key")
    parser.add_argument("--commit", action="store_true",
                        help="Upsert into discovery_candidates (default: report only)")
    parser.add_argument("--skip-paid", action="store_true",
                        help="Force-skip paid DataForSEO calls even if --spend is also set")
    parser.add_argument("--limit-competitors", type=int, default=None,
                        help="Cap the number of competitor domains used across sitemap/dfs sources")
    parser.add_argument("--spend", action="store_true",
                        help="Allow paid DataForSEO pulls (dfs_ranked/dfs_intersection/bulk KD) "
                             "and dual-mode (paid) SERP winnability verification")
    args = parser.parse_args()

    stats = build(
        args.site_key,
        spend=args.spend,
        skip_paid=args.skip_paid,
        limit_competitors=args.limit_competitors,
        commit=args.commit,
    )
    print(json.dumps(stats, indent=2, default=str))


if __name__ == "__main__":
    # Self-check
    assert _norm("  Landlord   Tax  UK ") == "landlord tax uk"
    assert classify_intent("property accountant fees") == "transactional"
    assert classify_intent("landlord tax vs sole trader") == "commercial"
    assert classify_intent("what is section 24") == "informational"

    _row_vol = {"candidate": "x", "volume": 500, "raw": {"sources": []}}
    assert _demand(_row_vol) == 500.0
    _row_gsc = {"candidate": "x", "volume": None, "raw": {"sources": ["gsc"], "gsc": {"impressions": 42}}}
    assert _demand(_row_gsc) == 42.0
    _row_none = {"candidate": "x", "volume": None, "raw": {"sources": ["sitemap"]}}
    assert _demand(_row_none) == float(DEFAULT_DEMAND)

    _merged = _merge({
        "sitemap": [{"candidate": " Landlord Tax ", "source": "sitemap", "volume": None,
                     "kd": None, "cpc": None, "intent": None, "raw": {"url": "a"}}],
        "gsc": [{"candidate": "landlord tax", "source": "gsc", "volume": 300,
                 "kd": None, "cpc": None, "intent": None, "raw": {"impressions": 300}}],
    })
    assert len(_merged) == 1
    assert _merged[0]["source"] == "sitemap"          # first-in-ingest-order wins the primary slot
    assert _merged[0]["volume"] == 300                # backfilled from gsc
    assert sorted(_merged[0]["raw"]["sources"]) == ["gsc", "sitemap"]

    # Real fixture: a live Property blog page, well past the 60-day maturation floor
    _age = _page_age_days(
        "Property/web/content/blog",
        "https://x/blog/2027-property-income-tax-rates-landlords-uk",
    )
    assert _age is not None and _age > MATURATION_DAYS, f"unexpected page age: {_age}"
    assert _page_age_days("Property/web/content/blog", "https://x/blog/no-such-slug-xyz") is None

    print("self-check OK")
    main()
