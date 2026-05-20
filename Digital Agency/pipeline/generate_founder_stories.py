"""Generate 10 composite founder stories for the Founder Stories vertical.

Each story:
- Has a prominent composite-disclaimer
- Is anchored to a real agency-finance decision (BADR exit, R&D claim, incorporation, etc.)
- Uses anonymised but plausible details (agency size, sector, UK location)
- Includes specific numbers (revenue, tax saving, structure)
- Reads like a real case study while being clearly a composite

Output: web/src/app/founder-stories/[slug]/data.ts
"""
import json
import os
import re
import sys
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
OUT = ROOT / "web" / "src" / "app" / "founder-stories" / "[slug]" / "data.ts"

STORIES = [
    {"slug": "creative-agency-badr-exit", "title": "How a 7-Person Bristol Creative Agency Saved £43k Restructuring Before a Trade Sale",
     "topic": "BADR-eligible exit planning", "agency_type": "Creative agency", "stage": "Pre-exit",
     "outcome": "Saved £43k in CGT by restructuring 14 months before completion"},
    {"slug": "digital-agency-incorporation-mid-year", "title": "Sole Trader to Ltd Mid-Year: Why a £180k Digital Agency Did It in October",
     "topic": "Mid-year incorporation timing", "agency_type": "Digital agency", "stage": "Early scaling",
     "outcome": "£11k tax saving in first 12 months of operating as Ltd"},
    {"slug": "ppc-agency-rd-credit-first-claim", "title": "First-Time R&D Claim: How a 5-Person PPC Agency Recovered £62k",
     "topic": "R&D tax credit eligibility for performance marketing", "agency_type": "PPC agency", "stage": "Growth (£800k-1.5m)",
     "outcome": "£62k R&D credit on first claim, £91k expected in year 2"},
    {"slug": "recruitment-agency-ir35-mass-determination", "title": "IR35 Mass Determination: A Recruitment Agency's 90-Day Compliance Sprint",
     "topic": "Recruitment agency IR35 mass determination", "agency_type": "Recruitment agency", "stage": "Established",
     "outcome": "Compliance achieved before HMRC enquiry window, zero reclassification challenges"},
    {"slug": "pr-agency-holding-company-investor-prep", "title": "A 12-Person London PR Agency Setting Up a Holding Company Before Series A",
     "topic": "Holding company structure for investor preparation", "agency_type": "PR agency", "stage": "Pre-investment",
     "outcome": "Clean cap table ready in 8 weeks, founder retained CGT efficiency"},
    {"slug": "marketing-agency-retainer-to-project-cash-flow", "title": "From Retainer to Project Billing: A 15-Person Marketing Agency's Cash Flow Cliff (and How They Fixed It)",
     "topic": "Cash flow management when shifting revenue model", "agency_type": "Marketing agency", "stage": "Growth",
     "outcome": "Cash position stabilised in 4 months, returned to 60-day buffer"},
    {"slug": "seo-agency-us-revenue-vat-corporation-tax", "title": "Adding US Revenue: How a Manchester SEO Agency Handled VAT and Corporation Tax Across Two Tax Regimes",
     "topic": "International revenue VAT and corporation tax interaction", "agency_type": "SEO agency", "stage": "Scaling internationally",
     "outcome": "Clean compliance both sides, no double tax"},
    {"slug": "ppc-agency-xero-from-freeagent-migration", "title": "Upgrading from FreeAgent to Xero: A Growing PPC Agency's £14k Lesson",
     "topic": "Accounting software migration mistakes during scale-up", "agency_type": "PPC agency", "stage": "Scaling",
     "outcome": "Lost data recovered, new chart of accounts saving £14k/year in management time"},
    {"slug": "web-design-agency-vat-threshold-decision", "title": "Solo Web Designer at £88k: When to Voluntarily Register for VAT",
     "topic": "Voluntary VAT registration decision below threshold", "agency_type": "Web design (solo)", "stage": "Pre-threshold",
     "outcome": "Voluntary registration recovered £8k in input VAT in year 1"},
    {"slug": "creative-agency-uk-to-dubai-relocation", "title": "Creative Agency Founder Relocating to Dubai While Keeping a UK Ltd",
     "topic": "UK-to-Dubai relocation with retained UK company", "agency_type": "Creative agency", "stage": "Relocating",
     "outcome": "Statutory residence test cleared, UK Ltd operating with non-resident director status"},
]

SYSTEM = """You write composite case studies for a UK + UAE specialist accountancy firm working with agency founders.

CRITICAL: every story is a composite based on patterns across multiple real clients. Names, locations, exact figures and specific timelines are anonymised. Make this clear with a single explicit disclaimer paragraph at the top.

REQUIREMENTS:
- 800 to 1,200 words of body HTML
- Open with a single-paragraph disclaimer:
  "<em>Composite case study based on patterns across our agency clients. Names, locations and specific figures have been anonymised; the financial mechanics and tax treatment are real and reflect current UK rules.</em>"
- Then a "The situation" section (H2) — agency profile (size, sector, revenue band, location, year)
- Then a "The decision" section (H2) — what they needed to figure out
- Then a "What we modelled" section (H2) — options considered with real numbers
- Then a "The outcome" section (H2) — what they chose, what happened, the financial result
- Then a "What others can learn" section (H2) — 3-5 bullet points of takeaways
- Use 2025/26 UK tax figures (BADR 14%, CGT higher 24%, corp tax 19/25, dividend 8.75/33.75/39.35, dividend allowance £500, AIA £1M, VAT £90k, PA £12,570)
- Use specific UK locations naturally (Shoreditch, Bristol Harbourside, Manchester Northern Quarter, Leeds Holbeck, etc.)
- Real software names where natural (Xero, FreeAgent, Float, Klaviyo, etc.)
- Plain English, no jargon without explanation
- UK English (organise, specialise, recognise)
- No AI cliches (unlock, navigate the complex, in today's, leverage, harness, robust)
- Em-dashes allowed in moderation

OUTPUT: body HTML only. Use <p>, <h2>, <ul>/<li>, <strong>, <em>. No <h1> (the page renders the title separately). No frontmatter."""


def generate_story(client, story):
    prompt = f"""Write the composite case study body for: {story['title']}

Story brief:
- Topic: {story['topic']}
- Agency type: {story['agency_type']}
- Stage: {story['stage']}
- Outcome metric: {story['outcome']}

Output the body HTML only. 800-1,200 words. Start with the disclaimer paragraph."""
    out = client.generate_creative(prompt=prompt, system=SYSTEM, temperature=0.6, max_tokens=2500)
    return out.strip()


def escape_for_ts(s):
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def main():
    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)
    entries = []
    for i, s in enumerate(STORIES, 1):
        try:
            body = generate_story(client, s)
        except Exception as e:
            print(f"  [{i}/{len(STORIES)}] {s['slug']}: ERROR {e}")
            continue
        entries.append({**s, "body": body})
        print(f"  [{i:>2}/{len(STORIES)}] {s['slug']:<50} {len(body)} chars")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "// AUTO-GENERATED by pipeline/generate_founder_stories.py",
        "// Each story is a COMPOSITE based on patterns across our agency clients.",
        "// Names, locations, and figures have been anonymised; the tax mechanics are real.",
        "",
        "export type FounderStory = {",
        "  slug: string;",
        "  title: string;",
        "  topic: string;",
        "  agency_type: string;",
        "  stage: string;",
        "  outcome: string;",
        "  body: string;",
        "};",
        "",
        "export const STORIES: Record<string, FounderStory> = {",
    ]
    for e in entries:
        lines.append(f'  "{e["slug"]}": {{')
        lines.append(f'    slug: "{e["slug"]}",')
        lines.append(f'    title: {json.dumps(e["title"])},')
        lines.append(f'    topic: {json.dumps(e["topic"])},')
        lines.append(f'    agency_type: {json.dumps(e["agency_type"])},')
        lines.append(f'    stage: {json.dumps(e["stage"])},')
        lines.append(f'    outcome: {json.dumps(e["outcome"])},')
        lines.append(f'    body: `{escape_for_ts(e["body"])}`,')
        lines.append('  },')
    lines.append("};")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\nWrote {len(entries)} stories to {OUT}")


if __name__ == "__main__":
    main()
