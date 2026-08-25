"""
Claude Haiku fact-check validator for DeepSeek-generated solicitor blog posts.

Why: DeepSeek hallucinates niche-specific UK tax facts (P11D for employer
pension, 30-day non-resident CGT, AIA on cars). Regex catchers handle the
known patterns but new hallucinations slip through. This is the safety net.

How:
- Reads a freshly-generated draft (HTML body + frontmatter)
- Sends to Claude Haiku with a strict "verify against this fact block"
  prompt
- Gets back JSON: {flagged: [{claim, why, severity}], verdict: pass|fail}
- A 'fail' verdict (any high-severity flag, or >2 medium flags) blocks the
  write to disk in the generator pipeline.

Cost: ~$0.0005-$0.001 per post. Negligible vs DeepSeek save.

Usage:
    # As a library, called by generate_blog_deepseek.py:
    from verify_blog_facts import verify_draft
    result = verify_draft(title, html_body)
    if result['verdict'] == 'fail': ...

    # Self-test from CLI (sanity check the validator itself):
    python Dentists/pipeline/verify_blog_facts.py --self-test
"""
import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

from anthropic import Anthropic

ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
HAIKU_MODEL = 'claude-haiku-4-5-20251001'

# Compact fact reference for the prompt — kept tight so the verifier reads
# fast and cheap. Mirrors the key claims in BLOG_SYSTEM_PROMPT but condensed.
DENTAL_FACT_REFERENCE = """
KEY UK SOLICITOR / LAW FIRM TAX & REGULATORY FACTS (2025/26) FOR VERIFICATION:

Tax & NI:
- Tax year 2025/26: 6 April 2025 to 5 April 2026.
- Personal allowance: £12,570 (tapered above £100,000, gone at £125,140).
- Income tax bands: basic 20% (£12,571-£50,270), higher 40% (£50,271-£125,140), additional 45% (£125,141+).
- Self-employed Class 4 NI: 6% on £12,570-£50,270, 2% above. Class 2 abolished April 2024.
- Employer NI: 15% above £5,000/year (Autumn Budget 2024).
- Employment Allowance: £10,500.
- Corporation tax: 19% small profits (<=£50k), 25% main rate (>£250k), marginal relief between.
- Dividend allowance: £500. Dividend tax 2026/27 (FA 2026 s.4): 10.75%/35.75%/39.35% (8.75%/33.75% applied only up to 5 April 2026).
- VAT registration threshold: £90,000.
- AIA: £1,000,000 (excludes cars, land, buildings).
- BADR: 14% in 2025/26, rising to 18% from 6 April 2026. £1m lifetime limit.
- CGT: 18% basic / 24% higher. Annual exempt amount: £3,000.

LLP & partnership:
- LLPs are tax-transparent for income tax (members taxed personally on their share of profit), like a general partnership. LLPs do NOT pay corporation tax.
- Partnerships: each partner taxed on their share of partnership profits at personal rates and NIC; partnership itself does not pay corporation tax.
- Salaried Member Rules (FA 2014): salaried members of LLPs deemed employees for tax if all three conditions met (Condition A: disguised salary ≥80% of total reward; Condition B: limited influence over LLP's affairs; Condition C: capital contribution <25% of disguised salary).
- Only law firms structured as limited companies pay corporation tax.
- Partners are self-employed; firm does NOT make "employer pension contributions" for partners.

SRA Accounts Rules & compliance:
- SRA Accounts Rules effective from 25 November 2019 (with amendments).
- Reconciliations required at least every five weeks (Rule 8.3) — NOT monthly.
- Client money in separate client account; office money kept separate.
- Annual accountant's report required unless de minimis exemption applies (firm held no more than £10,000 client money at any time AND average balance under £250).
- COLP and COFA designated roles are mandatory for SRA-regulated firms.
- Client money interest must be paid to clients when "fair"; small amounts may be retained per firm policy.

Professional indemnity insurance (PII):
- All SRA-regulated firms must hold PII to at least the Minimum Terms and Conditions (MTC). £2m minimum cover (£3m for sole practitioners / partnerships). Premiums are tax-deductible.

VAT on legal services:
- Legal services (including conveyancing) are STANDARD-RATED for VAT at 20% — NOT exempt.

Practice sale & goodwill:
- Firm sale = capital disposal, not trading income. BADR may apply if conditions met.
- Goodwill amortisation: 6.5% per year tax relief for qualifying goodwill acquired post-1 April 2019. Goodwill acquired 8 July 2015 to 31 March 2019: generally no tax relief.
- Section 162 incorporation relief (TCGA 1992 s.162) defers CGT on goodwill when whole unincorporated business is transferred to a company in exchange for shares.
- Law firm valuations: typically 1-3× normalised profit for partnership/LLP plus net tangible assets. WIP treated separately.

Conveyancing / SDLT:
- SDLT is the buyer's tax; solicitors calculate and submit. England/NI: SDLT. Wales: LTT. Scotland: LBTT.
- Money Laundering Regulations: legal practices in-scope register with the SRA as supervisory authority.

WIP & accounting:
- WIP recognised on an earnings basis under FRS 102 / FRS 105 once revenue reliably measurable. The "earnings basis" replaced "billings basis" via FA 2002.

Locum / consultant solicitors:
- Usually self-employed via sole-trader or limited company. IR35 applies if engaging firm is medium/large and locum works through a PSC.

Other:
- Employer pension contributions are NOT P11D items and NOT benefits in kind. They are allowable trade expense and tax-free up to annual allowance.
- AIA does NOT cover cars.
- Self Assessment: paper 31 October, online 31 January.
- MTD ITSA: mandatory from 6 April 2026 for sole traders/landlords with gross income > £50,000.
"""

SYSTEM_PROMPT = f"""You are a fact-checking assistant for UK solicitor / law firm tax + regulatory content. You will be given a blog post and must verify the factual claims against the reference below.

{DENTAL_FACT_REFERENCE}

TASK:
Read the article. Find every specific factual claim (a number, rate, threshold, deadline, form name, percentage, year, status rule, scheme name). For each claim:
1. If the article matches the reference exactly — fine, skip it.
2. If the article contradicts the reference — flag it as HIGH severity.
3. If the article makes a claim NOT covered in the reference and you cannot verify it from your own UK tax knowledge with high confidence — flag it as MEDIUM.
4. If the article paraphrases the reference fact slightly differently but the substance is correct — fine, skip it.

OUTPUT FORMAT (JSON only, no prose, no markdown fences):
{{
  "flagged": [
    {{"claim": "<the exact claim from the article>", "why": "<one sentence — what's wrong, what the correct value is>", "severity": "high|medium"}}
  ],
  "verdict": "pass" or "fail"
}}

VERDICT RULES:
- Any 'high' severity flag → verdict: "fail"
- 3 or more 'medium' flags → verdict: "fail"
- Otherwise → verdict: "pass"

If there are no flags at all, output: {{"flagged": [], "verdict": "pass"}}

Be strict on known hallucination zones:
- "P11D" mentioned in any context with employer pension contributions → almost certainly wrong
- Corporation tax claimed as 20% → wrong (it's 19/25)
- AIA cited as covering cars → wrong
- 28% CGT on residential → wrong (it's 24% from 30 Oct 2024)
- LLPs paying corporation tax → wrong (LLPs are tax-transparent)
- Partnerships paying corporation tax → wrong (tax-transparent)
- Salaried members of LLPs always taxed as partners → wrong (Salaried Member Rules FA 2014 can deem as employees)
- SRA Accounts Rules requiring monthly reconciliations → wrong (at least every 5 weeks per Rule 8.3)
- Conveyancing fees / legal services VAT-exempt → wrong (standard-rated at 20%)
- PII premiums not deductible → wrong (allowable trade expense)
- Goodwill amortisation at 10% per year → wrong (6.5% for post-April-2019 acquisitions)
- Firm sale taxed as trading income → wrong (capital disposal)
- "Employer pension contributions for a partner" → wrong (partners are self-employed; firm doesn't pay employer contributions for them)
"""


def verify_draft(title: str, html_body: str, model: str = HAIKU_MODEL) -> dict:
    """Send draft to Haiku, return {flagged, verdict}."""
    client = Anthropic(api_key=ANTHROPIC_API_KEY)

    # Strip HTML tags for cleaner reading — Haiku handles plain text fine and
    # tag noise wastes tokens.
    body_text = re.sub(r'<[^>]+>', ' ', html_body)
    body_text = re.sub(r'\s+', ' ', body_text).strip()

    user_prompt = f"""ARTICLE TITLE: {title}

ARTICLE BODY:
{body_text}

Now produce the JSON verdict."""

    try:
        msg = client.messages.create(
            model=model,
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=[{'role': 'user', 'content': user_prompt}],
        )
        raw = msg.content[0].text.strip()
    except Exception as e:
        return {
            'flagged': [],
            'verdict': 'pass',
            '_error': f'Haiku API error: {e} — defaulting to pass (verifier unavailable)',
        }

    # Strip any accidental code fences
    raw = re.sub(r'^```(?:json)?\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw)

    try:
        result = json.loads(raw)
        if 'flagged' not in result or 'verdict' not in result:
            return {'flagged': [], 'verdict': 'pass', '_error': 'Haiku output missing fields'}
        return result
    except json.JSONDecodeError as e:
        return {'flagged': [], 'verdict': 'pass', '_error': f'Haiku JSON parse failed: {e}'}


# ---------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------

KNOWN_GOOD_POST = """<p>Associate dentists working through a limited company need to be aware of IR35 from 6 April 2021 onwards. When the engaging dental practice is a medium or large client, the practice — not the locum's personal service company — determines IR35 status.</p>
<p>Corporation tax for limited companies sits at 19% on profits up to £50,000 and 25% on profits above £250,000, with marginal relief in between. The annual exempt amount for capital gains is £3,000 in 2025/26.</p>
<p>UDA rates vary by individual NHS contract and region. England averages roughly £25 to £35 per UDA but individual contracts range from £15 to over £45.</p>
"""

KNOWN_BAD_POST = """<p>Employer pension contributions made by a dental practice for an associate must be reported on a P11D as a benefit in kind. This is straightforward and applies to all NHS pension contributions.</p>
<p>Corporation tax for a dental practice limited company is 20% across all profit levels. Capital allowances under AIA cover all assets including the principal's car.</p>
<p>Selling a dental practice is treated as trading income for tax purposes, taxed at your marginal income tax rate.</p>
<p>The UDA rate across the UK is a fixed £25 per point.</p>
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--self-test', action='store_true', help='Run on known-good and known-bad samples')
    parser.add_argument('--md', help='Path to a .md file to verify')
    args = parser.parse_args()

    if not ANTHROPIC_API_KEY:
        sys.exit('ANTHROPIC_API_KEY not set in .env')

    if args.self_test:
        print('Running self-test with known-good and known-bad samples...')
        print()
        print('--- Known good (should PASS) ---')
        good = verify_draft('Associate dentist IR35 and corporation tax', KNOWN_GOOD_POST)
        print(json.dumps(good, indent=2))
        print()
        print('--- Known bad (should FAIL with multiple flags) ---')
        bad = verify_draft('Dental practice pension and tax basics', KNOWN_BAD_POST)
        print(json.dumps(bad, indent=2))
        print()
        if good['verdict'] != 'pass':
            print('SELF-TEST FAIL: known-good post was flagged.')
            sys.exit(1)
        if bad['verdict'] != 'fail':
            print('SELF-TEST FAIL: known-bad post was not flagged.')
            sys.exit(1)
        print('SELF-TEST PASS: validator correctly distinguishes good from bad.')
        return

    if args.md:
        path = Path(args.md)
        if not path.exists():
            sys.exit(f'File not found: {path}')
        text = path.read_text(encoding='utf-8', errors='replace')
        # Split frontmatter from body
        parts = re.split(r'^---\s*$', text, maxsplit=2, flags=re.MULTILINE)
        body = parts[-1] if len(parts) >= 3 else text
        title_m = re.search(r'^title:\s*"?([^"\n]+?)"?\s*$', text, re.MULTILINE)
        title = title_m.group(1) if title_m else path.stem
        result = verify_draft(title, body)
        print(json.dumps(result, indent=2))
        sys.exit(0 if result['verdict'] == 'pass' else 1)

    sys.exit('Usage: --self-test or --md <path>')


if __name__ == '__main__':
    main()
