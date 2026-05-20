"""
Second ideation pass for the UK->Dubai vertical.

Feeds the 283 competitor titles from dubai_research.py into DeepSeek and asks
for topic ideas that fill gaps — angles competitors don't cover well. Dedupes
against the 60 ideas already in dubai-topic-candidates.csv.

Output: appends new ideas to dubai-topic-candidates.csv with source='gap-pass-2'.
"""
import csv
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "agents", "utils"))

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env", override=True)
except ImportError:
    pass

from config_supabase import DEEPSEEK_API_KEY
from deepseek_client import DeepSeekClient

ROOT = Path(__file__).resolve().parents[1]
COMP_CSV = ROOT / "seo-research" / "dubai-competitor-titles.csv"
IDEAS_CSV = ROOT / "seo-research" / "dubai-topic-candidates.csv"

SUBCATS = [
    "UK Tax on Leaving",
    "Dubai Entity & Setup",
    "UAE Tax (Corporate + VAT)",
    "Cross-Border Operations",
    "Personal Finance (Pensions, ISAs, Property)",
    "Practical Relocation",
    "Agency-Specific Migration",
]

SYSTEM = """You are a senior SEO content strategist for Agency Founder Finance.

You're scoping a UK->Dubai relocation content vertical for UK agency founders. Your job is to find angles competitors DON'T cover, not generic topics. Each idea must be specific, long-tail, and target a real question an agency founder relocating to Dubai would search.

No AI cliches (unlock, navigate, in today's). UK English. Honest where UAE-side advice is needed (flag it in the rationale).
"""


def load_existing_titles():
    if not IDEAS_CSV.exists():
        return set()
    out = set()
    with IDEAS_CSV.open(encoding="utf-8") as f:
        for r in csv.DictReader(f):
            out.add(normalise(r["title"]))
    return out


def normalise(s):
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()


def load_competitor_titles():
    if not COMP_CSV.exists():
        return defaultdict(list)
    by_q = defaultdict(list)
    with COMP_CSV.open(encoding="utf-8") as f:
        for r in csv.DictReader(f):
            try:
                if int(r["rank"]) <= 5:
                    by_q[r["query"]].append(r["title"])
            except ValueError:
                continue
    return by_q


def parse_ideas(raw):
    ideas = []
    for line in raw.splitlines():
        line = line.strip()
        if not line or "|" not in line:
            continue
        line = re.sub(r"^[\-\*\d]+[\.\)]?\s*", "", line)
        parts = [p.strip() for p in line.split("|")]
        if len(parts) < 2:
            continue
        if parts[0] not in SUBCATS or not parts[1]:
            continue
        ideas.append({
            "subcategory": parts[0],
            "title": parts[1],
            "primary_keyword": parts[2] if len(parts) > 2 else "",
            "rationale": parts[3] if len(parts) > 3 else "",
        })
    return ideas


def main():
    existing = load_existing_titles()
    print(f"Existing ideas in CSV: {len(existing)}")

    comp = load_competitor_titles()
    print(f"Competitor groups: {len(comp)}")

    comp_text_chunks = []
    for q, titles in list(comp.items())[:20]:
        comp_text_chunks.append(f"Query: {q}\n" + "\n".join(f"  - {t}" for t in titles[:5]))
    comp_intel = "\n\n".join(comp_text_chunks)

    user_prompt = f"""Below are the top-5 competitor titles for our 20 highest-priority UK->Dubai relocation queries.

For each query, generate 2 NEW topic ideas that fill a gap the competitors don't cover. Look for:
- Edge cases competitors gloss over
- Practical "what do I actually do" angles missing from PR-style content
- Agency-founder-specific framings competitors don't address
- The intersection of two topics competitors handle separately

SUB-CATEGORIES (use exact spelling):
{' | '.join(SUBCATS)}

COMPETITOR INTELLIGENCE:
{comp_intel}

OUTPUT FORMAT (one idea per line):
SUBCATEGORY | TITLE | PRIMARY_KEYWORD | RATIONALE (one sentence — which competitor gap)

Generate around 40 ideas total."""

    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)
    raw = client.generate_creative(prompt=user_prompt, system=SYSTEM, temperature=0.75, max_tokens=4096)
    print(f"[OK] {len(raw)} chars returned")

    ideas = parse_ideas(raw)
    new = [i for i in ideas if normalise(i["title"]) not in existing]
    print(f"[OK] {len(ideas)} parsed, {len(new)} unique after dedupe")

    # Append to existing CSV
    with IDEAS_CSV.open("a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        for i in new:
            w.writerow([i["subcategory"], i["title"], i["primary_keyword"], i["rationale"]])

    # Print final distribution
    from collections import Counter
    all_ideas = []
    with IDEAS_CSV.open(encoding="utf-8") as f:
        for r in csv.DictReader(f):
            all_ideas.append(r)
    dist = Counter(i["subcategory"] for i in all_ideas)
    print(f"\nTotal ideas now in CSV: {len(all_ideas)}")
    print("By subcategory:")
    for cat in SUBCATS:
        print(f"  {dist.get(cat, 0):>3}  {cat}")


if __name__ == "__main__":
    main()
