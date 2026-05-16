"""
Seed pillar topic rows for the Fundamentals vertical.

Inserts 9 long-form pillar topics into blog_topics_agency with
content_tier='pillar' and publish_priority=4 (above the existing P3 max
so they get picked first by the generator).
"""
import os
import sys
from pathlib import Path

import httpx

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[2] / ".env", override=True)
except ImportError:
    pass

from config_supabase import SUPABASE_URL, SUPABASE_KEY, SUPABASE_TABLE


PILLARS = [
    {
        "topic": "Agency Finance Fundamentals: The Complete Founder's Guide",
        "category": "Agency Finance Essentials",
        "primary_keyword": "agency finance fundamentals",
        "suggested_slug": "agency-finance-fundamentals",
        "notes": "Pillar guide. Cash flow, P&L, margins, KPIs, software, founder financial hygiene. Links to every Essentials post.",
    },
    {
        "topic": "Tax and Compliance for UK Agency Founders: The Complete Guide",
        "category": "Tax and Compliance",
        "primary_keyword": "agency tax compliance UK",
        "suggested_slug": "agency-tax-compliance-complete-guide",
        "notes": "Pillar guide. VAT, corporation tax, PAYE, P11D, deadlines. Links to every Tax post.",
    },
    {
        "topic": "Paying Yourself as an Agency Founder: Salary, Dividends and Pension",
        "category": "Salary and Dividends",
        "primary_keyword": "agency founder pay yourself salary dividend",
        "suggested_slug": "paying-yourself-agency-founder-pillar",
        "notes": "Pillar guide. Optimal split, spouse shares, dividend tax rates, pension contributions. Links to Salary posts.",
    },
    {
        "topic": "Incorporating Your Agency: The Definitive Guide to Structure",
        "category": "Incorporation and Structure",
        "primary_keyword": "incorporating agency UK guide",
        "suggested_slug": "incorporating-your-agency-pillar",
        "notes": "Pillar guide. Sole trader vs Ltd, timing, holding companies, FICs, alphabet shares. Links to Incorporation posts.",
    },
    {
        "topic": "Selling Your Agency: The Complete Guide to a Tax-Efficient Exit",
        "category": "Growth and Exit",
        "primary_keyword": "selling your agency tax guide",
        "suggested_slug": "selling-your-agency-pillar",
        "notes": "Pillar guide. BADR, MBOs, earn-outs, goodwill, due diligence, valuation. Links to Exit posts.",
    },
    {
        "topic": "IR35 for Agencies: The Complete Guide to Off-Payroll Working",
        "category": "Contractors and IR35",
        "primary_keyword": "IR35 agency complete guide",
        "suggested_slug": "ir35-for-agencies-pillar",
        "notes": "Pillar guide. SDS, CEST limits, freelancer engagements, recruitment agencies, creative agencies. Links to IR35 posts.",
    },
    {
        "topic": "Choosing an Accountant for Your Agency: A Founder's Buyer's Guide",
        "category": "Agency Accountant Services",
        "primary_keyword": "choose accountant for agency",
        "suggested_slug": "choosing-agency-accountant-pillar",
        "notes": "Pillar guide. What to look for, costs, specialist vs generalist, switching, questions to ask. Links to Services posts.",
    },
    {
        "topic": "Making Tax Digital for Agency Founders: The Complete Survival Guide",
        "category": "Making Tax Digital",
        "primary_keyword": "MTD agency founder guide",
        "suggested_slug": "mtd-agency-founder-pillar",
        "notes": "Pillar guide. ITSA, VAT, software, quarterly updates, deadlines. Links to every MTD post.",
    },
    {
        "topic": "International Operations for UK Agencies: The Complete Guide",
        "category": "International Agencies",
        "primary_keyword": "UK agency international operations guide",
        "suggested_slug": "international-agency-operations-pillar",
        "notes": "Pillar guide. UAE entities, non-dom rules, cross-border invoicing, foreign clients, VAT on services. Links to International posts.",
    },
]


def main():
    url = f"{SUPABASE_URL}/rest/v1/{SUPABASE_TABLE}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=representation",
    }
    params = {"on_conflict": "topic"}

    rows = []
    for p in PILLARS:
        rows.append({
            **p,
            "publish_priority": 4,
            "content_tier": "pillar",
            "keyword_source": "pillar-seed-v1",
            "user_intent": "informational",
            "used": False,
        })

    r = httpx.post(url, headers=headers, params=params, json=rows, timeout=30.0)
    r.raise_for_status()
    body = r.json()
    inserted = sum(1 for x in body if not x.get("used_at"))
    print(f"[OK] Inserted {inserted} pillar topics")
    for row in body:
        print(f"  - [{row['category']}] {row['topic']}")


if __name__ == "__main__":
    main()
