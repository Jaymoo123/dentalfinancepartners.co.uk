"""
Seed 30 R&D tax credit topic ideas for UK agencies.

Hand-curated topic list aimed at the R&D credit specialist audience:
- AI agencies (highest qualifying spend)
- SaaS / software agencies
- Performance marketing agencies (attribution tooling)
- Creative agencies (some bespoke production tech qualifies)
- Web design agencies (custom architecture, performance work)
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


TOPICS = [
    # Eligibility & basics
    ("Does My Agency Actually Qualify for R&D Tax Credits? A Founder's Checklist", "agency r&d tax credit eligibility"),
    ("R&D Tax Credits for Marketing Agencies: What Qualifies and What Doesn't", "r&d tax credits marketing agency"),
    ("The R&D Intensive SME Test: When Agencies Get the Enhanced 27% Rate", "r&d intensive sme rate agency"),
    ("Merged R&D Scheme Explained for UK Agency Founders (Post-April 2023)", "merged r&d scheme agency"),
    ("The PAYE-NI Cap on R&D Claims: When It Catches Agencies Out", "paye ni cap r&d claim"),

    # AI / SaaS specific
    ("R&D Tax Credits for AI Agencies: Custom Models, Fine-Tuning and Prompt Engineering", "r&d tax credits ai agency"),
    ("Does Fine-Tuning an LLM Qualify for R&D Tax Credits?", "fine-tuning llm r&d tax credit"),
    ("Building RAG Pipelines: Is It R&D-Qualifying Work?", "rag pipeline r&d tax credit"),
    ("R&D Claims for SaaS Agencies Building Bespoke Software", "r&d tax credits saas agency"),
    ("Custom Software vs Off-the-Shelf: The R&D Line for Agencies", "custom software r&d qualifying agency"),

    # Specific qualifying activities
    ("Performance Optimisation Work: When Does It Qualify for R&D Credits?", "performance optimisation r&d qualifying"),
    ("Attribution Tooling and R&D Tax Credits for Performance Marketing Agencies", "attribution tool r&d tax credit"),
    ("Bespoke Integrations as R&D: When Building Bridges Qualifies", "bespoke integration r&d agency"),
    ("Headless Commerce R&D: What Qualifies for E-commerce Agencies", "headless commerce r&d tax credit"),
    ("R&D Tax Credits for Custom Klaviyo Flows and Email Automation Builds", "klaviyo custom flow r&d"),

    # Process / mechanics
    ("How to Document R&D Activity in an Agency Throughout the Year", "document r&d activity agency"),
    ("R&D Tax Credit Subcontractor Costs: The 65% Rule for UK Agencies", "subcontractor r&d 65 percent rule"),
    ("R&D Claims for Cloud Compute Costs: AWS, GCP, GPU Rental", "r&d cloud compute aws gcp"),
    ("Apportioning Staff Time on R&D for an Agency Claim", "apportion staff time r&d agency"),
    ("R&D Tax Credit Claim Process: Timeline and Documentation for Agencies", "r&d tax credit claim process"),

    # Risk and edge cases
    ("HMRC R&D Tax Credit Investigations: What Triggers Them for Agencies", "hmrc r&d investigation agency"),
    ("Claiming R&D for Client-Funded Work: The Subsidy Rules Agencies Miss", "r&d subsidy rules agency"),
    ("When Your R&D Claim Could Be Reduced or Denied: 7 Agency Red Flags", "r&d claim denied agency red flags"),
    ("Combining R&D Tax Credits with Other Reliefs: AIA and Patent Box", "r&d combined aia patent box"),
    ("Foreign R&D Spend and UK Tax Credits: Post-April 2024 Rules for Agencies", "foreign r&d spend uk credit"),

    # Strategy
    ("Should You Use an R&D Specialist or Your Accountant?", "r&d specialist vs accountant"),
    ("R&D Tax Credit Cash Flow: How Long Does HMRC Take to Pay?", "r&d tax credit hmrc payment time"),
    ("The Average R&D Claim for a UK Agency: What's Realistic in 2025/26", "average r&d claim agency uk"),
    ("R&D Tax Credit Claim Errors: The 5 Most Common Mistakes Agencies Make", "r&d claim common mistakes agency"),
    ("How to Structure a New AI Agency for Maximum R&D Tax Credit Eligibility", "structure ai agency r&d eligible"),
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
    for title, kw in TOPICS:
        rows.append({
            "topic": title,
            "category": "Tax and Compliance",
            "primary_keyword": kw,
            "publish_priority": 2,
            "content_tier": "cluster",
            "keyword_source": "rd-vertical-v1",
            "notes": "R&D vertical seed",
            "used": False,
        })
    print(f"Seeding {len(rows)} R&D vertical topics...")
    r = httpx.post(url, headers=headers, params=params, json=rows, timeout=30.0)
    r.raise_for_status()
    body = r.json()
    inserted = sum(1 for x in body if not x.get("used_at"))
    print(f"  Inserted: {inserted}")


if __name__ == "__main__":
    main()
