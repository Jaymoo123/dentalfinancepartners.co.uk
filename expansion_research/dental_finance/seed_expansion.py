"""Seed the BUILD-NOW clusters' NEW pages into blog_topics (staging only; no generation).

Included: specialist_tax, business_finance, exit_eot, dental — pages that are
reg_flag UNREG/UNREG-COMPANY AND action NEW (per decannibalise_actions.csv).
Excluded: EXTEND pages (rewrite path), REG-HOLD/REG-CARE, SECTION/SHARED-ASSET,
and the whole IAR-gated landlord cluster.

Isolated site_keys + keyword_source tag => reversible (delete by site_key/source).
Run:  python seed_expansion.py            # dry-run (prints plan)
      python seed_expansion.py --commit   # upsert to blog_topics
"""
from __future__ import annotations

import argparse
import csv
import os
import sys
from pathlib import Path

import httpx
from dotenv import load_dotenv

HERE = Path(__file__).parent
load_dotenv(HERE.parents[1] / ".env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SOURCE = "expansion-2026-07-30"

# (site_key host, category, source CSV, pillar_topic cluster tag).
# site_key must exist in `sites` (FK + whitelist CHECK) -> seed under the natural host,
# isolate by keyword_source + pillar_topic + status='staged-expansion'. Host is a staging
# choice; the handoff/owner can re-tag site_key later (new hub vs cluster-on-existing).
CLUSTER_CFG = {
    "specialist_tax":   ("property",   "Specialist Tax Reliefs",       "specialist_tax_pages.csv",   "Specialist Tax"),
    "business_finance": ("generalist", "Business Finance",             "business_finance_pages.csv", "Business Finance"),
    "exit_eot":         ("generalist", "Business Exit and Succession", "exit_eot_pages.csv",         "Business Exit and Succession"),
    "dental":           ("dentists",   "Dental Practice Finance",      "dental_pages.csv",           "Dental Practice Finance"),
}
STAGED_STATUS = "staged-expansion"
SKIP_PREFIX = ("EXTEND", "HOLD", "ROUTE", "[SECTION")
SKIP_REG = ("REG-HOLD", "REG-CARE")
# Consolidate onto EXISTING pos-1 estate pages (property/generalist rank R&D + capital
# allowances pos-1) — these go to the rewrite/EXTEND path, NOT new-gen. (De-cannib guardrail.)
EXTEND_SKIP = {
    "rd-tax-credits-guide", "rd-tax-credit-rates", "how-to-claim-rd-tax-credits",
    "capital-allowances-guide", "annual-investment-allowance-aia",
}


def load_actions():
    m = {}
    p = HERE / "decannibalise_actions.csv"
    if p.exists():
        for r in csv.DictReader(p.open(encoding="utf-8")):
            m[r["topic"]] = r["action"]
    return m


def intent(slug, ptype):
    s = slug.lower()
    if ptype == "calculator":
        return "transactional"
    if any(x in s for x in ("guide", "how-to", "how-", "what-is", "explained", "pros-and-cons", "-vs-")):
        return "informational"
    return "commercial"


def priority(ptype, vol):
    base = {"pillar": 9, "calculator": 8, "cluster": 6, "segment": 5, "supporting": 5}.get(ptype, 5)
    if vol >= 1000:
        base += 1
    elif vol >= 100:
        base += 0
    return min(base, 10)


def build_rows():
    actions = load_actions()
    rows = []
    for cluster, (site_key, category, fn, pillar_tag) in CLUSTER_CFG.items():
        p = HERE / fn
        if not p.exists():
            print(f"  MISSING {fn}"); continue
        for r in csv.DictReader(p.open(encoding="utf-8")):
            topic = (r.get("topic") or "").strip()
            reg = r.get("reg_flag", "")
            # dental_pages uses 'action' column; v2 encodes action in topic prefix + decannib map
            action = r.get("action") or actions.get(topic, "NEW")
            if not topic or topic.startswith(SKIP_PREFIX) or reg in SKIP_REG or topic in EXTEND_SKIP:
                continue
            if str(action).startswith(("EXTEND", "SECTION", "SHARED", "HOLD", "ROUTE")):
                continue
            ptype = r.get("page_type", "cluster")
            vol = int(r.get("primary_volume") or r.get("target_search_volume") or 0)
            tier = r.get("tier") or r.get("content_tier") or "cluster"
            tier = {"segment": "supporting", "calculator": "cluster"}.get(tier, tier)
            note = (r.get("notes") or "").strip()
            guard = (r.get("guardrail") or "").strip()
            rows.append({
                "topic": topic,
                "site_key": site_key,
                "pillar_topic": pillar_tag,
                "category": category,
                "primary_keyword": r.get("primary_keyword", ""),
                "secondary_keywords": r.get("secondary_keywords", ""),
                "user_intent": intent(topic, ptype),
                "content_tier": tier,
                "publish_priority": priority(ptype, vol),
                "priority": priority(ptype, vol),
                "target_search_volume": vol,
                "search_volume": vol,
                "keyword_source": SOURCE,
                "notes": (f"[{ptype}] {note} || GUARDRAIL: {guard}")[:1000],
                "suggested_slug": topic if not topic.startswith("[") else None,
                "status": STAGED_STATUS,
                "used": False,
            })
    return rows


def upsert(rows):
    url = f"{SUPABASE_URL}/rest/v1/blog_topics"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}",
               "Content-Type": "application/json",
               "Prefer": "resolution=merge-duplicates,return=minimal"}
    # Guard: refuse if rows for this source already exist (avoid dupes on re-run).
    chk = httpx.get(url, headers={k: v for k, v in headers.items() if k != "Prefer"},
                    params={"select": "id", "keyword_source": f"eq.{SOURCE}", "limit": "1"}, timeout=20)
    if chk.json():
        print(f"  ABORT: rows with source={SOURCE} already exist. Delete them first to re-seed.")
        return 0
    ins = 0
    for i in range(0, len(rows), 25):
        batch = rows[i:i+25]
        r = httpx.post(url, headers=headers, json=batch, timeout=40)
        if r.status_code in (200, 201, 204):
            ins += len(batch)
        else:
            print(f"  ERROR batch {i}: {r.status_code} {r.text[:300]}")
    return ins


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    rows = build_rows()
    from collections import Counter
    print(f"{len(rows)} build-now NEW pages to seed")
    print("  by site_key:", dict(Counter(r["site_key"] for r in rows)))
    print("  by tier:    ", dict(Counter(r["content_tier"] for r in rows)))
    print("  by intent:  ", dict(Counter(r["user_intent"] for r in rows)))
    print("  by priority:", dict(sorted(Counter(r["publish_priority"] for r in rows).items(), reverse=True)))
    print("\n  sample:")
    for r in rows[:6]:
        print(f"    [{r['site_key']}] P{r['publish_priority']} {r['topic']} ({r['target_search_volume']}/mo, {r['user_intent']})")
    if not args.commit:
        print("\n[dry-run] pass --commit to upsert")
        return
    n = upsert(rows)
    print(f"\nUPSERTED {n} rows to blog_topics (source={SOURCE})")


if __name__ == "__main__":
    main()
