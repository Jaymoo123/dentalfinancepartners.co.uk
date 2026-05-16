"""
Research the UK to Dubai relocation content opportunity.

Steps:
  1) Query Serper for ~30 Dubai/UAE relocation + tax queries (UK locale)
  2) Capture top organic, PAA (if any), related searches
  3) Identify competitor landscape and content gaps
  4) Ask DeepSeek to ideate 50 UK-agency-founder-focused topic candidates
     based on the queries and the gaps Serper surfaced

Outputs:
  - seo-research/dubai-competitor-titles.csv
  - seo-research/dubai-paa-related.csv  (PAA + related searches)
  - seo-research/dubai-topic-candidates.csv
  - seo-research/dubai-research-summary.md
"""
import csv
import os
import re
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

import httpx

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "agents", "utils"))

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env", override=True)
except ImportError:
    pass

from config_supabase import DEEPSEEK_API_KEY, POST_CATEGORIES
from deepseek_client import DeepSeekClient

ROOT = Path(__file__).resolve().parents[1]
OUT_COMP = ROOT / "seo-research" / "dubai-competitor-titles.csv"
OUT_PAA = ROOT / "seo-research" / "dubai-paa-related.csv"
OUT_IDEAS = ROOT / "seo-research" / "dubai-topic-candidates.csv"
OUT_SUMMARY = ROOT / "seo-research" / "dubai-research-summary.md"

SERPER_KEY = os.getenv("SERPER_API_KEY")

# 30 seed queries covering the UK -> Dubai relocation + finance landscape.
SEED_QUERIES = [
    # Tax residency & status
    "uk statutory residence test",
    "split year treatment uk",
    "becoming non-uk resident for tax",
    "uk non-dom rules 2025",
    "uk tax obligations when moving abroad",
    # Dubai entity setup
    "free zone company dubai setup",
    "dubai company formation for uk founders",
    "uae mainland vs free zone company",
    "ifza vs jafza vs dmcc",
    "dubai golden visa for uk citizens",
    # UAE corporate tax
    "uae corporate tax 9 percent",
    "uae corporate tax small business relief",
    "uae corporate tax free zone",
    "uae vat registration threshold",
    # UK + UAE interaction
    "uk uae double tax treaty",
    "uk dividends when living in dubai",
    "uk pension when moving to dubai",
    "uk isa when moving abroad",
    "selling uk property as non resident",
    "uk capital gains tax leaving uk",
    # Moving the agency
    "transferring uk limited company to dubai",
    "running uk agency from dubai",
    "uk client work invoiced from dubai",
    "vat on uk services billed from uae",
    # Practical relocation
    "cost of living dubai vs london",
    "dubai schools for uk expats",
    "dubai healthcare for uk expats",
    "dubai property purchase as uk citizen",
    # Agency-specific Dubai
    "marketing agency dubai uk founder",
    "uk agency relocate to dubai",
]


def serper(q):
    r = httpx.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": SERPER_KEY, "Content-Type": "application/json"},
        json={"q": q, "gl": "gb", "num": 10},
        timeout=20.0,
    )
    if r.status_code != 200:
        raise RuntimeError(f"{r.status_code}: {r.text[:200]}")
    return r.json()


def normalise(s):
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()


SYSTEM_PROMPT = """You are a senior content strategist for Agency Founder Finance, a specialist UK accountancy firm working with agency founders.
You are scoping a new content vertical: UK agency founders relocating to Dubai.

Generate topic ideas that are:
- Specific long-tail informational queries an agency founder relocating to Dubai would type
- Focused on the tax, financial, structural, legal and practical reality of the move
- Distinct (no paraphrasing)
- Honest about the UK/UAE complexity (some areas require local UAE advice; flag those)
- Written in UK English
- Free of AI cliches (unlock, navigate, in today's, the world of)

Output each on its own line in this exact format:
SUBCATEGORY | TITLE | PRIMARY_KEYWORD | RATIONALE
where SUBCATEGORY is one of:
- UK Tax on Leaving
- Dubai Entity & Setup
- UAE Tax (Corporate + VAT)
- Cross-Border Operations
- Personal Finance (Pensions, ISAs, Property)
- Practical Relocation
- Agency-Specific Migration
"""


def ideate_topics(client, summary_intel):
    user_prompt = f"""I'm building a UK→Dubai relocation content vertical for agency founders.

Context from Serper research:
{summary_intel}

Generate 60 topic ideas across the seven sub-categories above. Each idea must target a specific question an agency founder relocating to Dubai would search.

Spread evenly across sub-categories (at least 7 per sub-category, ideally more).

Output format (one per line, no markdown, no numbering):
SUBCATEGORY | TITLE | PRIMARY_KEYWORD | RATIONALE"""

    raw = client.generate_creative(
        prompt=user_prompt,
        system=SYSTEM_PROMPT,
        temperature=0.7,
        max_tokens=4096,
    )
    return raw


def parse_ideas(raw):
    ideas = []
    valid_subcats = {
        "UK Tax on Leaving", "Dubai Entity & Setup", "UAE Tax (Corporate + VAT)",
        "Cross-Border Operations", "Personal Finance (Pensions, ISAs, Property)",
        "Practical Relocation", "Agency-Specific Migration",
    }
    for line in raw.splitlines():
        line = line.strip()
        if not line or "|" not in line:
            continue
        line = re.sub(r"^[\-\*\d]+[\.\)]?\s*", "", line)
        parts = [p.strip() for p in line.split("|")]
        if len(parts) < 2:
            continue
        cat = parts[0]
        title = parts[1]
        if cat not in valid_subcats or not title:
            continue
        ideas.append({
            "subcategory": cat,
            "title": title,
            "primary_keyword": parts[2] if len(parts) > 2 else "",
            "rationale": parts[3] if len(parts) > 3 else "",
        })
    return ideas


def main():
    if not SERPER_KEY:
        print("ERROR: SERPER_API_KEY not set")
        sys.exit(1)

    print(f"=== Serper-mining {len(SEED_QUERIES)} UK->Dubai queries ===\n")
    comp_rows = []
    paa_rows = []
    credits = 0
    for i, q in enumerate(SEED_QUERIES, 1):
        try:
            data = serper(q)
        except Exception as e:
            print(f"  [{i}/{len(SEED_QUERIES)}] {q}: ERROR {e}")
            continue
        credits += int(data.get("credits") or 1)
        for pos, hit in enumerate(data.get("organic", [])[:10], 1):
            comp_rows.append({
                "query": q,
                "rank": pos,
                "title": hit.get("title", ""),
                "url": hit.get("link", ""),
                "snippet": (hit.get("snippet", "") or "")[:200],
            })
        for paa in data.get("peopleAlsoAsk", []):
            paa_rows.append({"source_query": q, "type": "PAA", "value": paa.get("question", "")})
        for rs in data.get("relatedSearches", []):
            paa_rows.append({"source_query": q, "type": "RELATED", "value": rs.get("query", "")})
        print(f"  [{i:>2}/{len(SEED_QUERIES)}] {q[:55]:<55} organic={len(data.get('organic',[]))} paa={len(data.get('peopleAlsoAsk',[]))} rel={len(data.get('relatedSearches',[]))}")
        time.sleep(0.4)

    print(f"\nSerper credits used: {credits}")
    print(f"Competitor rows: {len(comp_rows)}")
    print(f"PAA + related rows: {len(paa_rows)}")

    OUT_COMP.parent.mkdir(parents=True, exist_ok=True)
    with OUT_COMP.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["query", "rank", "title", "url", "snippet"])
        w.writeheader()
        for r in comp_rows:
            w.writerow(r)
    with OUT_PAA.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["source_query", "type", "value"])
        w.writeheader()
        for r in paa_rows:
            w.writerow(r)

    # Aggregate top competitor domains in this niche
    domains = Counter()
    for r in comp_rows:
        try:
            d = urlparse(r["url"]).netloc.replace("www.", "")
            if d:
                domains[d] += 1
        except Exception:
            pass

    print("\nTop 15 competitor domains for UK->Dubai queries:")
    for d, n in domains.most_common(15):
        print(f"  {n:>3}x  {d}")

    # Build intel summary for the LLM ideation
    summary_lines = ["Top 15 ranking domains for these queries:"]
    for d, n in domains.most_common(15):
        summary_lines.append(f"- {d} ({n} placements)")
    summary_lines.append("\nSample of competitor title patterns (top 3 per query, first 8 queries):")
    by_query = defaultdict(list)
    for r in comp_rows:
        if int(r["rank"]) <= 3:
            by_query[r["query"]].append(r["title"])
    for i, (q, titles) in enumerate(list(by_query.items())[:8]):
        summary_lines.append(f"\n{q}:")
        for t in titles[:3]:
            summary_lines.append(f"  - {t}")
    summary_intel = "\n".join(summary_lines)

    # DeepSeek ideation
    print("\n=== Asking DeepSeek for 60 UK->Dubai topic ideas ===")
    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)
    raw = ideate_topics(client, summary_intel)
    print(f"[OK] {len(raw)} chars returned")
    ideas = parse_ideas(raw)
    print(f"[OK] {len(ideas)} ideas parsed")

    dist = Counter(i["subcategory"] for i in ideas)
    print("\nBy subcategory:")
    for cat, n in dist.most_common():
        print(f"  {n:>3}  {cat}")

    with OUT_IDEAS.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["subcategory", "title", "primary_keyword", "rationale"])
        for i in ideas:
            w.writerow([i["subcategory"], i["title"], i["primary_keyword"], i["rationale"]])

    # Markdown summary
    with OUT_SUMMARY.open("w", encoding="utf-8") as f:
        f.write("# UK -> Dubai Vertical: Research Summary\n\n")
        f.write(f"_Generated from {len(SEED_QUERIES)} Serper queries + DeepSeek ideation_\n\n")
        f.write("## Top ranking domains\n\n")
        for d, n in domains.most_common(15):
            f.write(f"- **{d}** ({n} top-10 placements)\n")
        f.write("\n## PAA + related searches captured\n\n")
        f.write(f"Total: {len(paa_rows)} entries (see `dubai-paa-related.csv`).\n\n")
        f.write("## Topic candidates by subcategory\n\n")
        for cat, n in dist.most_common():
            f.write(f"### {cat} ({n} ideas)\n\n")
            for i in ideas:
                if i["subcategory"] == cat:
                    f.write(f"- **{i['title']}**\n  - kw: `{i['primary_keyword']}`\n  - {i['rationale']}\n")
            f.write("\n")
    print(f"\nWrote {OUT_COMP.name}, {OUT_PAA.name}, {OUT_IDEAS.name}, {OUT_SUMMARY.name}")


if __name__ == "__main__":
    main()
