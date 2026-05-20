"""
Seed blog_topics for contractors-ir35 via Google Autocomplete expansion.

Seeds 9 IR35/contractor keyword roots, expands each with question prefixes
and intent suffixes, deduplicates, assigns category + content_tier, then
inserts into Supabase blog_topics with site_key='contractors-ir35'.

Run:
    python contractors-ir35/pipeline/seed_topics.py
    python contractors-ir35/pipeline/seed_topics.py --dry-run   # print without inserting
    python contractors-ir35/pipeline/seed_topics.py --limit 30  # cap autocomplete seeds
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import time
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv
load_dotenv(ROOT / ".env", override=True)

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]
SITE_KEY = "contractors-ir35"

# ---------------------------------------------------------------------------
# Seed keywords and their assigned category
# ---------------------------------------------------------------------------

SEEDS: list[tuple[str, str, str, str]] = [
    # (topic_title, primary_keyword, category, content_tier)
    ("IR35 explained: the complete guide for UK contractors",
     "IR35",                               "IR35 Status",                    "pillar"),
    ("How to choose a contractor accountant in the UK",
     "contractor accountant",              "Contractor Accounting Basics",   "pillar"),
    ("Inside IR35: what it means and how it affects your pay",
     "inside IR35",                        "IR35 Status",                    "pillar"),
    ("Outside IR35: how to protect your status and structure your affairs",
     "outside IR35",                       "IR35 Status",                    "pillar"),
    ("Umbrella vs limited company: which is right for your contracting career",
     "umbrella vs limited company",        "Umbrella vs Limited Company",    "pillar"),
    ("Limited company contractor tax: the complete guide",
     "limited company contractor tax",     "Limited Company Tax",            "pillar"),
    ("Contractor expenses: what you can and cannot claim",
     "contractor expenses",                "Expenses and Deductions",        "pillar"),
    ("Contractor pension: using your PSC to build retirement savings",
     "contractor pension",                 "Pension and Dividends",          "pillar"),
    ("Off-payroll working rules: a contractor's guide to the April 2021 changes",
     "off-payroll working rules",          "IR35 Status",                    "pillar"),
    # Cluster seeds
    ("CEST tool: how to use it and what the results really mean",
     "CEST tool",                          "IR35 Status",                    "cluster"),
    ("Status determination statement (SDS): your rights as a contractor",
     "SDS IR35",                           "IR35 Status",                    "cluster"),
    ("PSC limited company setup: what every contractor needs to know",
     "PSC limited company",                "Limited Company Tax",            "cluster"),
    ("Deemed employment: what happens to your tax inside IR35",
     "deemed employment",                  "IR35 Status",                    "cluster"),
    ("Contractor tax planning: reducing your bill legally",
     "contractor tax planning",            "Limited Company Tax",            "cluster"),
    ("Dividend tax rates for contractors 2024/25",
     "dividend tax contractor",            "Pension and Dividends",          "cluster"),
    ("IR35 contract review: what to look for before signing",
     "IR35 contract review",               "IR35 Status",                    "cluster"),
    ("Umbrella company explained: how they work and what they cost",
     "umbrella company",                   "Umbrella vs Limited Company",    "cluster"),
    ("Travel expenses for contractors: the 24-month rule explained",
     "travel expenses contractor",         "Expenses and Deductions",        "cluster"),
    ("Corporation tax for your limited company: rates and planning",
     "corporation tax limited company",    "Limited Company Tax",            "cluster"),
    ("MSC legislation: does it affect your limited company?",
     "MSC legislation",                    "Contractor Accounting Basics",   "cluster"),
    ("IR35 small company exemption: who qualifies and what changes",
     "IR35 small company exemption",       "IR35 Status",                    "cluster"),
    ("Fee-payer liability under IR35: who pays if status is wrong",
     "fee payer IR35",                     "IR35 Status",                    "cluster"),
    ("Contractor self assessment: deadlines, payments and what to include",
     "contractor self assessment",         "Contractor Accounting Basics",   "cluster"),
    ("MTD for income tax: what contractors and freelancers need to prepare",
     "MTD contractor",                     "MTD and Compliance",             "cluster"),
    ("Making tax digital for self-employed contractors: key dates",
     "making tax digital freelancer",      "MTD and Compliance",             "cluster"),
    ("Employer pension contributions from your PSC: the tax benefits",
     "employer pension contributions PSC", "Pension and Dividends",          "cluster"),
    ("Director salary and dividends 2024/25: the optimal split",
     "director salary dividends",          "Limited Company Tax",            "cluster"),
    ("IR35 status tests: control, substitution and mutuality of obligation",
     "IR35 status test",                   "IR35 Status",                    "cluster"),
    ("Substitution clause and IR35: what it does and does not prove",
     "substitution clause IR35",           "IR35 Status",                    "cluster"),
]

# Prefixes and suffixes for autocomplete expansion (keeps cost low)
PREFIXES = ["", "how", "what", "can i", "how much", "is"]
SUFFIXES = ["", "uk", "2024", "2025", "explained", "rules"]


# ---------------------------------------------------------------------------
# Category keyword routing (used to re-classify autocomplete suggestions)
# ---------------------------------------------------------------------------

CATEGORY_RULES: list[tuple[list[str], str]] = [
    (["ir35", "inside ir35", "outside ir35", "off-payroll", "cest", "sds", "deemed employment",
      "status determination", "fee payer", "end client", "substitution", "moo", "mutuality",
      "small company exemption", "working practices"], "IR35 Status"),
    (["umbrella", "going limited", "paye umbrella", "umbrella vs"], "Umbrella vs Limited Company"),
    (["expenses", "travel", "mileage", "subsistence", "24 month", "allowable costs",
      "home office", "equipment", "tools"], "Expenses and Deductions"),
    (["pension", "sipp", "annual allowance", "employer contribution", "retirement",
      "dividends", "dividend tax", "dividend allowance"], "Pension and Dividends"),
    (["mtd", "making tax digital", "vat return", "accounting software",
      "self assessment", "sa100", "payment on account", "hmrc portal",
      "bookkeeping", "payroll"], "MTD and Compliance"),
    (["limited company", "psc", "corporation tax", "director salary", "company formation",
      "registered company", "shareholder", "accounts filing", "confirmation statement",
      "companies house"], "Limited Company Tax"),
]
DEFAULT_CATEGORY = "Contractor Accounting Basics"


def _assign_category(text: str) -> str:
    t = text.lower()
    for keywords, cat in CATEGORY_RULES:
        if any(k in t for k in keywords):
            return cat
    return DEFAULT_CATEGORY


def _assign_tier(text: str, category: str) -> str:
    t = text.lower()
    pillar_signals = [
        "guide", "explained", "complete", "overview", "introduction",
        "what is", "how does", "everything you need",
    ]
    if any(s in t for s in pillar_signals):
        return "pillar"
    if category in ("IR35 Status", "Umbrella vs Limited Company", "Contractor Accounting Basics"):
        return "cluster"
    return "cluster"


def _assign_priority(tier: str, category: str) -> int:
    if tier == "pillar":
        return 8
    if category == "IR35 Status":
        return 7
    if category in ("Limited Company Tax", "Umbrella vs Limited Company"):
        return 6
    return 5


# ---------------------------------------------------------------------------
# Autocomplete
# ---------------------------------------------------------------------------

def _autocomplete(query: str, client: httpx.Client) -> list[str]:
    try:
        r = client.get(
            "http://suggestqueries.google.com/complete/search",
            params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
            timeout=8.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
            return [s for s in data[1] if isinstance(s, str)]
    except Exception:
        return []
    return []


def _normalise(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()


def _to_slug(s: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


# ---------------------------------------------------------------------------
# Supabase helpers
# ---------------------------------------------------------------------------

def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }


def _fetch_existing() -> set[str]:
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/blog_topics",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        },
        params={
            "site_key": f"eq.{SITE_KEY}",
            "select": "topic",
            "limit": "1000",
        },
        timeout=15.0,
    )
    r.raise_for_status()
    return {_normalise(row["topic"]) for row in r.json()}


def _insert_batch(rows: list[dict]) -> int:
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/blog_topics",
        headers=_supabase_headers(),
        json=rows,
        timeout=30.0,
    )
    if r.status_code not in (200, 201):
        print(f"  [WARN] insert error {r.status_code}: {r.text[:200]}")
        return 0
    return len(rows)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=None,
                        help="Cap number of autocomplete seeds processed")
    parser.add_argument("--sleep", type=float, default=0.08)
    args = parser.parse_args()

    print(f"Fetching existing topics for {SITE_KEY}...")
    existing = _fetch_existing()
    print(f"  {len(existing)} already in Supabase")

    # Build candidate list from seeds + autocomplete expansion
    candidates: dict[str, dict] = {}  # normalised topic -> row dict

    # Always include the seed keywords themselves as starting candidates
    for topic_title, keyword, category, tier in SEEDS:
        norm = _normalise(topic_title)
        if norm not in existing and norm not in candidates:
            candidates[norm] = {
                "site_key": SITE_KEY,
                "topic": topic_title,
                "primary_keyword": keyword,
                "category": category,
                "content_tier": tier,
                "priority": _assign_priority(tier, category),
                "publish_priority": _assign_priority(tier, category),
                "user_intent": "informational",
                "keyword_source": "seed",
                "used": False,
                "status": "pending",
            }

    # Autocomplete expansion
    seeds_to_expand = SEEDS[:args.limit] if args.limit else SEEDS
    print(f"\nExpanding {len(seeds_to_expand)} seeds via Google Autocomplete...")

    with httpx.Client() as client:
        for i, (_, keyword, base_category, base_tier) in enumerate(seeds_to_expand, 1):
            seed_new = 0
            for prefix in PREFIXES:
                for suffix in SUFFIXES:
                    parts = [p for p in [prefix, keyword, suffix] if p]
                    query = " ".join(parts)
                    suggestions = _autocomplete(query, client)
                    for s in suggestions:
                        s = s.strip()
                        if len(s) < 8:
                            continue
                        norm = _normalise(s)
                        if norm in existing or norm in candidates:
                            continue
                        # Filter to UK contractor / tax relevance
                        has_signal = any(w in norm for w in [
                            "ir35", "contractor", "limited", "umbrella", "psc",
                            "off payroll", "inside", "outside", "cest", "sds",
                            "deemed", "expenses", "pension", "dividend", "corporation",
                            "tax", "hmrc", "vat", "mtd", "self assessment",
                            "accountant", "accounting", "payroll", "msc",
                        ])
                        if not has_signal:
                            continue
                        cat = _assign_category(s)
                        tier = _assign_tier(s, cat)
                        candidates[norm] = {
                            "site_key": SITE_KEY,
                            "topic": s.strip().capitalize(),
                            "primary_keyword": s.strip().lower(),
                            "category": cat,
                            "content_tier": tier,
                            "priority": _assign_priority(tier, cat),
                            "publish_priority": _assign_priority(tier, cat),
                            "user_intent": "informational",
                            "keyword_source": "autocomplete",
                            "used": False,
                            "status": "pending",
                        }
                        seed_new += 1
                    time.sleep(args.sleep)

            print(f"  [{i:>2}/{len(seeds_to_expand)}] {keyword[:45]:<45} +{seed_new}")

    rows = list(candidates.values())
    print(f"\nTotal candidates (new): {len(rows)}")

    if not rows:
        print("Nothing to insert.")
        return

    # Print sample
    print("\nSample (first 10):")
    for row in rows[:10]:
        print(f"  [{row['content_tier']:7}] [{row['category'][:30]:30}] {row['topic']}")

    if args.dry_run:
        print("\n[DRY-RUN] Not inserting.")
        return

    # Insert in batches of 50
    inserted = 0
    batch_size = 50
    for start in range(0, len(rows), batch_size):
        batch = rows[start:start + batch_size]
        n = _insert_batch(batch)
        inserted += n
        print(f"  Inserted batch {start // batch_size + 1}: {n} rows")

    print(f"\nDone. Inserted {inserted} topics for {SITE_KEY}.")


if __name__ == "__main__":
    main()
