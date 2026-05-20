"""Phase 9 niche-research pass.

For each candidate niche, pull:
  - Serper top-10 SERP for "<niche> accountant uk"
  - DataForSEO keyword volume + competition for the head term
  - Surface who's ranking (specialists vs generalists)
  - Score on 6 dimensions

Output: docs/phase9_niche_scores.md with the ranked shortlist.

Read-only against external APIs. Costs ~$0.01 per niche (6 niches = ~$0.06).
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

import httpx  # noqa: E402

from dotenv import load_dotenv  # noqa: E402
load_dotenv(Path(__file__).parent.parent / ".env")

SERPER_API_KEY = os.getenv("SERPER_API_KEY", "")
DFS_LOGIN = os.getenv("DATAFORSEO_API_LOGIN") or os.getenv("DATAFORSEO_LOGIN", "")
DFS_PASSWORD = os.getenv("DATAFORSEO_API_PASSWORD") or os.getenv("DATAFORSEO_PASSWORD", "")


CANDIDATES = [
    {
        "slug": "construction-cis",
        "name": "Construction / CIS contractors",
        "head_query": "construction accountant uk",
        "secondary": ["cis subcontractor accountant", "construction tax specialist uk"],
        "uk_audience_estimate": 324_000,  # UK construction businesses (ONS 2024)
        "audience_note": "~324k UK construction businesses + ~3.1M tradespeople (ONS)",
    },
    {
        "slug": "ecommerce-amazon",
        "name": "E-commerce / Amazon sellers",
        "head_query": "amazon seller accountant uk",
        "secondary": ["ecommerce accountant uk", "online seller tax uk"],
        "uk_audience_estimate": 280_000,
        "audience_note": "~280k registered UK Amazon sellers + ~700k UK e-commerce businesses",
    },
    {
        "slug": "contractors-ir35",
        "name": "Contractors / IR35",
        "head_query": "contractor accountant uk",
        "secondary": ["ir35 specialist accountant", "limited company contractor tax"],
        "uk_audience_estimate": 2_000_000,
        "audience_note": "~2M UK contractors (HMRC + ONS self-employment data)",
    },
    {
        "slug": "restaurants-hospitality",
        "name": "Restaurants / hospitality",
        "head_query": "restaurant accountant uk",
        "secondary": ["hospitality accountant uk", "pub accountant"],
        "uk_audience_estimate": 150_000,
        "audience_note": "~150k UK hospitality businesses (UKHospitality)",
    },
    {
        "slug": "tradesmen",
        "name": "Tradesmen (plumbers, electricians, builders)",
        "head_query": "tradesman accountant uk",
        "secondary": ["plumber accountant uk", "electrician accountant uk"],
        "uk_audience_estimate": 600_000,
        "audience_note": "~600k UK self-employed tradespeople (Federation of Master Builders est.)",
    },
    {
        "slug": "buy-to-let-specialist",
        "name": "Buy-to-let landlord specialist (subset of property)",
        "head_query": "buy to let landlord accountant uk",
        "secondary": ["section 24 landlord accountant", "property portfolio accountant"],
        "uk_audience_estimate": 2_300_000,
        "audience_note": "~2.3M UK landlords (gov.uk landlord statistics)",
    },
]


def serper_search(query: str) -> dict:
    """Pull SERP for a query. Tries Serper first (cheaper); falls back to
    DataForSEO SERP API if Serper is unavailable (e.g. out of credits)."""
    # Try Serper first
    if SERPER_API_KEY:
        try:
            r = httpx.post(
                "https://google.serper.dev/search",
                headers={"X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json"},
                json={"q": query, "gl": "gb", "hl": "en", "num": 10},
                timeout=20.0,
            )
            if r.status_code == 200:
                return r.json()
        except Exception:
            pass

    # Fallback to DataForSEO SERP
    if not (DFS_LOGIN and DFS_PASSWORD):
        return {"organic": []}
    r = httpx.post(
        "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        auth=(DFS_LOGIN, DFS_PASSWORD),
        json=[{
            "keyword": query,
            "location_code": 2826,  # UK
            "language_code": "en",
            "device": "desktop",
            "depth": 10,
        }],
        timeout=60.0,
    )
    if r.status_code != 200:
        return {"organic": []}
    body = r.json()
    tasks = body.get("tasks") or []
    if not tasks or not tasks[0].get("result"):
        return {"organic": []}
    items = tasks[0]["result"][0].get("items", [])
    organic = []
    for item in items:
        if item.get("type") != "organic":
            continue
        organic.append({
            "position": item.get("rank_absolute"),
            "title": item.get("title", ""),
            "link": item.get("url", ""),
            "snippet": item.get("description", ""),
        })
    return {"organic": organic[:10]}


def dfs_keyword_data(query: str) -> dict | None:
    """Pull DataForSEO Labs keyword data for one query.

    Uses search_volume_live (simpler than historical_keyword_data — returns
    current monthly volume + CPC + competition for the keyword).
    """
    if not (DFS_LOGIN and DFS_PASSWORD):
        return None
    try:
        r = httpx.post(
            "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
            auth=(DFS_LOGIN, DFS_PASSWORD),
            json=[{
                "keywords": [query],
                "location_code": 2826,  # UK
                "language_code": "en",
            }],
            timeout=30.0,
        )
        if r.status_code != 200:
            return {"error": f"status {r.status_code}: {r.text[:200]}"}
        body = r.json()
        tasks = body.get("tasks") or []
        if not tasks or not tasks[0].get("result"):
            return None
        result = tasks[0]["result"]
        if not result:
            return None
        item = result[0]
        return {
            "search_volume": item.get("search_volume"),
            "competition": item.get("competition"),  # 0-1 float OR None
            "cpc": item.get("cpc"),  # USD or None
        }
    except Exception as e:
        return {"error": str(e)}


def classify_domain(domain: str) -> str:
    """Best-effort classify: specialist | generalist | directory | unknown."""
    d = domain.lower()
    # Directories
    if any(x in d for x in ["clutch.co", "trustpilot", "reviews.io", "yell.com",
                            "checkatrade", "bark.com", "thomsonlocal", "yelp.com"]):
        return "directory"
    # Big generalist accounting brands
    if any(x in d for x in ["crunch.co.uk", "freeagent", "quickbooks", "xero", "sage.com",
                            "mazumamoney", "taxassist", "haineswatts", "moneymentor",
                            "moneysavingexpert", "which.co.uk", "moneyhelper"]):
        return "generalist"
    # Government/info
    if any(x in d for x in ["gov.uk", ".gov.", "wikipedia.org", "reddit.com", "linkedin.com"]):
        return "info"
    # Otherwise assume specialist (could be wrong)
    return "specialist"


def score_niche(candidate: dict, serp: dict, kw: dict | None) -> dict:
    """Score a niche 1-5 on each dimension. Output goes into the report."""
    organic = serp.get("organic", [])[:10]

    # 1. Search demand (from DFS volume or proxy from SERP result count)
    sv = (kw or {}).get("search_volume") if kw else None
    if sv is None or sv == 0:
        sv = 0
        search_score = 2  # uncertain
    elif sv < 200:
        search_score = 2
    elif sv < 800:
        search_score = 3
    elif sv < 3000:
        search_score = 4
    else:
        search_score = 5

    # 2. Specialism opportunity (specialist sites in top 10 = opportunity if low; high = saturated)
    classifications = [classify_domain(r.get("link", "")) for r in organic]
    n_specialist = sum(1 for c in classifications if c == "specialist")
    n_generalist = sum(1 for c in classifications if c == "generalist")
    n_directory = sum(1 for c in classifications if c == "directory")
    # Best opportunity: few specialists + lots of generalists/directories (we can outrank them)
    if n_specialist <= 2:
        specialism_score = 5  # huge opportunity for a real specialist site
    elif n_specialist <= 4:
        specialism_score = 4
    elif n_specialist <= 6:
        specialism_score = 3
    else:
        specialism_score = 2  # saturated with specialists already

    # 3. Audience size (from manual estimate)
    audience = candidate["uk_audience_estimate"]
    if audience < 100_000:
        audience_score = 2
    elif audience < 300_000:
        audience_score = 3
    elif audience < 1_000_000:
        audience_score = 4
    else:
        audience_score = 5

    # 4. Competition (DFS competition: either float 0-1 OR string "LOW"/"MEDIUM"/"HIGH")
    comp_raw = (kw or {}).get("competition") if kw else None
    if comp_raw is None:
        comp = 0.5
    elif isinstance(comp_raw, str):
        comp = {"LOW": 0.3, "MEDIUM": 0.6, "HIGH": 0.9}.get(comp_raw.upper(), 0.5)
    else:
        comp = float(comp_raw)
    if comp >= 0.8:
        comp_score = 2
    elif comp >= 0.6:
        comp_score = 3
    elif comp >= 0.4:
        comp_score = 4
    else:
        comp_score = 5

    # 5. CPC = monetisation signal
    cpc = (kw or {}).get("cpc", 0) if kw else 0
    if cpc is None:
        cpc = 0
    if cpc < 1:
        cpc_score = 2
    elif cpc < 3:
        cpc_score = 3
    elif cpc < 7:
        cpc_score = 4
    else:
        cpc_score = 5

    total = search_score + specialism_score + audience_score + comp_score + cpc_score
    return {
        "total": total,
        "search_volume": sv,
        "search_score": search_score,
        "specialism_score": specialism_score,
        "audience_score": audience_score,
        "comp_score": comp_score,
        "cpc_score": cpc_score,
        "cpc": cpc,
        "competition": comp,
        "n_specialist": n_specialist,
        "n_generalist": n_generalist,
        "n_directory": n_directory,
        "top_domains": [
            {"position": r.get("position"), "domain": r.get("link", "").split("/")[2] if r.get("link") else "?",
             "title": r.get("title", "")[:80], "kind": classify_domain(r.get("link", ""))}
            for r in organic
        ],
    }


def main() -> None:
    print(f"Researching {len(CANDIDATES)} candidate niches...")
    out_rows: list[dict] = []
    for c in CANDIDATES:
        print(f"\n=== {c['name']} ===")
        print(f"  head query: {c['head_query']}")
        try:
            serp = serper_search(c["head_query"])
        except Exception as e:
            print(f"  [SKIP] Serper error: {e}")
            continue
        kw = dfs_keyword_data(c["head_query"])
        if kw:
            sv = kw.get("search_volume")
            print(f"  search volume: {sv} / cpc £{kw.get('cpc')} / competition {kw.get('competition')}")
        else:
            print(f"  search volume: [no DataForSEO data]")
        score = score_niche(c, serp, kw)
        print(f"  SERP composition: {score['n_specialist']} specialist, {score['n_generalist']} generalist, {score['n_directory']} directory")
        print(f"  TOTAL SCORE: {score['total']}/25")
        out_rows.append({"candidate": c, "score": score})

    # Rank
    out_rows.sort(key=lambda r: r["score"]["total"], reverse=True)

    # Markdown report
    md = ["# Phase 9 Niche Research — Scored Shortlist", "",
          f"Generated by `scripts/phase9_niche_research.py`. UK-region SERP + DataForSEO data.", "",
          "## Scoring rubric (1-5 each; total /25)", "",
          "- **Search demand**: monthly search volume for the head query",
          "- **Specialism opportunity**: how many specialist sites already dominate the top 10 (fewer = better opportunity)",
          "- **Audience size**: UK businesses / individuals who could hire this kind of accountant",
          "- **Competition**: DataForSEO competition score (lower = better)",
          "- **CPC**: monetization signal — high CPC means high commercial intent",
          "",
          "## Ranked candidates", ""]
    md.append("| Rank | Niche | Total | Search | Specialism | Audience | Competition | CPC |")
    md.append("|---|---|---|---|---|---|---|---|")
    for rank, row in enumerate(out_rows, 1):
        c, s = row["candidate"], row["score"]
        md.append(f"| {rank} | {c['name']} | **{s['total']}/25** | "
                  f"{s['search_volume']} (/{s['search_score']}) | "
                  f"{s['n_specialist']}/10 spec (/{s['specialism_score']}) | "
                  f"{c['uk_audience_estimate']:,} (/{s['audience_score']}) | "
                  f"{s['competition']:.2f} (/{s['comp_score']}) | "
                  f"£{s['cpc']:.2f} (/{s['cpc_score']}) |")

    md += ["", "## Per-niche detail", ""]
    for rank, row in enumerate(out_rows, 1):
        c, s = row["candidate"], row["score"]
        md.append(f"### {rank}. {c['name']} — {s['total']}/25")
        md.append(f"- Slug: `{c['slug']}`")
        md.append(f"- Head query: \"{c['head_query']}\"")
        md.append(f"- Audience: {c['audience_note']}")
        md.append(f"- Search volume: {s['search_volume']} | CPC: £{s['cpc']:.2f} | Competition: {s['competition']:.2f}")
        md.append(f"- Top-10 SERP composition: {s['n_specialist']} specialist · {s['n_generalist']} generalist · {s['n_directory']} directory · {10 - s['n_specialist'] - s['n_generalist'] - s['n_directory']} other")
        md.append("- Top 10 organic results:")
        for d in s["top_domains"]:
            md.append(f"  {d['position']:>2}. [{d['kind']}] {d['domain']} — {d['title']}")
        md.append("")

    out = Path(__file__).parent.parent / "docs" / "phase9_niche_scores.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"\n[OK] Report: {out}")

    # Also dump raw data
    raw_out = Path(__file__).parent.parent / "docs" / "phase9_niche_scores.json"
    raw_out.write_text(json.dumps(out_rows, indent=2, default=str), encoding="utf-8")
    print(f"[OK] Raw data: {raw_out}")


if __name__ == "__main__":
    main()
