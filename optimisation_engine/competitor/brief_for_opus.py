"""
Generate a self-contained markdown brief for handing a single blog-post rewrite
to a fresh Claude Opus session.

The brief includes:
  - Page metadata + current source file path
  - GSC query data for the page (last 90 days)
  - GSC related-query patterns from the broader site
  - DeepSeek gap report + improvement brief
  - Competitor URLs analysed
  - Cannibalisation context (which pillar pages exist + what they rank for)
  - Site rules (voice, CSS, lead-gen, schema)
  - External authority links to favour
  - Acceptance criteria
  - Useful commands

Output: writes a markdown file to `briefs/<slug>.md` that can be pasted directly
into a new Opus session.

Usage:
    python -m optimisation_engine.competitor.brief_for_opus --site property --slug peterborough-property-accountant-specialist-tax-services
    python -m optimisation_engine.competitor.brief_for_opus --site property --top 5   # generate briefs for top 5 priority pages
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _esc, _sql


# ---------------------------------------------------------------------------
# Site rules / authority links (site-specific blocks)
# ---------------------------------------------------------------------------

SITE_RULES = {
    "medical": {
        "content_dir": "Medical/web/content/blog",
        "web_root": "Medical/web",
        "domain": "https://www.medicalaccounts.co.uk",
        "audience": "UK GPs (salaried + partner), hospital consultants, locum doctors, private practice owners",
        "lead_form_segments": [
            "GP (salaried)",
            "GP (partner)",
            "Locum doctor",
            "Hospital consultant",
            "Private practice owner",
        ],
        "pillar_pages": {
            "NHS pension annual allowance": "/blog/nhs-pension-annual-allowance-complete-guide",
            "Locum doctor tax (complete)": "/blog/locum-doctor-tax-complete-guide",
            "Locum doctor IR35": "/blog/locum-doctor-ir35-what-you-need-to-know",
            "GP partnership tax (complete)": "/blog/gp-partnership-tax-complete-guide",
            "GP limited company": "/blog/gp-limited-company-tax-benefits-drawbacks",
            "Medical practice incorporation": "/blog/medical-practice-incorporation-step-by-step",
            "GP tax deductions": "/blog/gp-tax-deductions-complete-list-2026",
            "GP accountant services (complete)": "/blog/gp-accountant-services-complete-guide",
        },
        "authority_links": [
            ("HMRC EIM (Employment Income Manual)", "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual"),
            ("HMRC ESM (Employment Status Manual, IR35)", "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual"),
            ("HMRC BIM (Business Income Manual)", "https://www.gov.uk/hmrc-internal-manuals/business-income-manual"),
            ("NHS Business Services Authority — NHS Pensions", "https://www.nhsbsa.nhs.uk/member-hub"),
            ("NHS Pensions annual allowance pension savings statement guidance", "https://www.nhsbsa.nhs.uk/member-hub/annual-allowance"),
            ("GMC — Good Medical Practice", "https://www.gmc-uk.org/professional-standards/professional-standards-for-doctors/good-medical-practice"),
            ("BMA — tax and finance for doctors", "https://www.bma.org.uk/pay-and-contracts"),
            ("gov.uk MTD for ITSA sign-up checker", "https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax"),
            ("HMRC IR35 / off-payroll working — guidance", "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35"),
        ],
    },
    "property": {
        "content_dir": "Property/web/content/blog",
        "web_root": "Property/web",
        "domain": "https://www.propertytaxpartners.co.uk",
        "audience": "UK landlords, buy-to-let investors, property developers",
        "lead_form_segments": [
            "Individual landlord (1-3 properties)",
            "Portfolio owner (4-10 properties)",
            "Large portfolio (10+ properties)",
            "Property developer",
        ],
        "pillar_pages": {
            "Section 24": "/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide",
            "BTL limited company": "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
            "MTD for landlords": "/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline",
            "CGT on UK property": "/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk",
        },
        "authority_links": [
            ("HMRC Property Income Manual", "https://www.gov.uk/hmrc-internal-manuals/property-income-manual"),
            ("gov.uk MTD for ITSA sign-up checker", "https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax"),
            ("legislation.gov.uk ITTOIA 2005", "https://www.legislation.gov.uk/ukpga/2005/5"),
            ("HMRC CGT on UK property service", "https://www.gov.uk/report-and-pay-your-capital-gains-tax"),
            ("HMRC Capital Gains Manual", "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual"),
            ("HMRC Property Rental Toolkit", "https://www.gov.uk/government/publications/hmrc-property-rental-toolkit"),
        ],
    },
    "generalist": {
        "content_dir": "generalist/web/content/blog",
        "web_root": "generalist/web",
        "domain": "https://www.hollowaydavies.co.uk",
        "audience": "UK SME owners — limited company directors, contractors and freelancers, sole traders, and partnerships/LLPs",
        "lead_form_segments": [
            "Limited company",
            "Sole trader",
            "Contractor or freelancer",
            "Partnership or LLP",
            "Just starting out",
        ],
        "pillar_pages": {
            "Limited company accountant (definitive)": "/fundamentals/definitive-guide-limited-company-accountant",
            "Sole trader accountant (definitive)": "/fundamentals/definitive-guide-sole-trader-accountant",
            "Contractor accountant (definitive)": "/fundamentals/definitive-guide-choosing-contractor-accountant-uk",
            "Online accountant UK (definitive)": "/fundamentals/definitive-guide-online-accountant-uk",
            "Small business accountant guide": "/fundamentals/small-business-accountant-guide",
            "How corporation tax works": "/fundamentals/how-does-corporation-tax-work",
            "Limited company vs sole trader": "/fundamentals/limited-company-vs-sole-trader",
            "VAT accountant / when to register": "/fundamentals/vat-accountant",
            "R&D tax credits explained": "/fundamentals/r-and-d-tax-credits-explained",
            "IR35 explained": "/fundamentals/ir35-explained",
            "MTD for Income Tax": "/fundamentals/making-tax-digital-for-income-tax-guide",
        },
        "authority_links": [
            ("HMRC Company Taxation Manual (CTM)", "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual"),
            ("HMRC Business Income Manual (BIM)", "https://www.gov.uk/hmrc-internal-manuals/business-income-manual"),
            ("HMRC VAT registration", "https://www.gov.uk/vat-registration"),
            ("HMRC PAYE for employers", "https://www.gov.uk/paye-for-employers"),
            ("gov.uk MTD for ITSA sign-up checker", "https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax"),
            ("HMRC R&D tax relief (CIRD manual)", "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual"),
            ("HMRC off-payroll working (IR35) guidance", "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35"),
            ("Companies House — file your annual accounts", "https://www.gov.uk/file-your-company-annual-accounts"),
            ("HMRC Business Asset Disposal Relief", "https://www.gov.uk/business-asset-disposal-relief"),
        ],
    },
}

UNIVERSAL_RULES = """
## Universal site rules (do not skip)

### Voice
- **No em-dashes.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Use exact figures and named legislation, not vague hedges.
- Anonymised social proof only. No real client names anywhere.

### Lead-gen architecture
- The blog template (`src/components/blog/BlogPostRenderer.tsx`) **automatically injects a `LeadForm` at the bottom** of every post. **Never duplicate this in body content.**
- Add 1-3 inline CTAs in the body at high-intent moments (after worked examples, after comparison tables, after the "what to expect" section). These should drive scroll-to-form, not embed a duplicate form.
- Content should pre-sell the form: worked examples, HMRC citations, local data, anonymised case studies.
- Match the form's role segments (1-3 props / 4-10 / 10+ / developer) by addressing each in the content where relevant.

### CSS / styling in markdown content
- **Tailwind utility classes do NOT work in markdown body content** because Tailwind v4 scans `src/**` only, not `content/**`.
- Use semantic HTML: `<aside>...</aside>`, `<table>...</table>`, `<ul>...</ul>`, `<strong>`.
- The `.prose-blog` CSS in `src/app/globals.css` styles all of these automatically with the property brand (emerald accent, slate text, hand-rolled table styling, callout asides).
- Inline CTA pattern:
```html
<aside>
<p>Headline that signals conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```
- Tables: just `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`. No classes needed.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (`question` + `answer`).
- The template auto-emits FAQPage JSON-LD from the frontmatter via `buildBlogPostingJsonLd`. **Do NOT manually add FAQ schema to the body.**
- Article + BreadcrumbList + Organization schema also auto-emitted.
- Target 10-14 FAQs covering: DeepSeek-surfaced gaps + GSC query demand + competitor FAQ patterns + lead-form qualifier questions (segment-specific).

### Cannibalisation
- Pillar pages exist for the main concepts (Section 24, BTL limited company, MTD, CGT). When this page touches one of those topics, write the **applied / local / scenario-flavoured** version, not the comprehensive theoretical version. Link out to the pillar guide.
- Do not duplicate worked examples verbatim across pages. Differ figures, scenarios, or angles.

### Quality bar (acceptance criteria)
- Word count: roughly competitor average (typically 2,500-3,500)
- FAQs: 10-14
- New external authority links: 4-7 (HMRC manuals, legislation.gov.uk, gov.uk)
- 1-3 inline `<aside>` CTAs at conversion moments
- Build passes: `cd <web-root> && npm run build`
- FAQ schema count in built HTML matches frontmatter count (verify with grep)
- No em-dashes anywhere in body or FAQs
- No Tailwind classes anywhere in the markdown file
- Internal links to relevant pillar pages
"""

WORKFLOW_STEPS = """
## Workflow (do in order)

1. **Read the source file** at the path listed under "Source file" below.
2. **Pull GSC data** for the page (see "GSC data" section below — already populated for you).
3. **Fetch each competitor URL** and read what they actually have. Verify DeepSeek's claims by hand. Bad input data = bad output content.
   ```python
   from optimisation_engine.competitor._fetch import fetch_url
   from bs4 import BeautifulSoup
   status, html = fetch_url('<competitor-url>')
   # inspect headings, FAQs, word count, key data points
   ```
4. **Write the rewrite**:
   - Keep the frontmatter structure (title, slug, canonical, date, author, category, altText, image, h1, summary, schema, faqs).
   - Rewrite metaTitle and metaDescription using GSC query data (lead with the highest-impression query word order).
   - Rewrite the body for depth, specificity, and conversion. Use semantic HTML.
   - Expand FAQs to 10-14, frontmatter `faqs:` array.
5. **Run the build**: `cd <web-root> && npm run build`. Confirm it passes with no new warnings.
6. **Verify FAQ schema count**: grep the built HTML to confirm FAQ count matches frontmatter:
   ```bash
   grep -c '"@type":"Question"' <web-root>/.next/server/app/blog/<category>/<slug>.html
   ```
7. **Report back** with: word count before/after, FAQ count, new external links added, summary of changes.
"""


# ---------------------------------------------------------------------------
# Brief assembly
# ---------------------------------------------------------------------------

def _fetch_page_data(site_key: str, slug: str) -> dict | None:
    """Find the page by slug in competitor_gap_reports + page_content_map."""
    rows = _sql(f"""
        SELECT cgr.*,
               pcm.title_tag AS pcm_title, pcm.h1_text AS pcm_h1,
               pcm.first_paragraph_text AS pcm_first_para
        FROM competitor_gap_reports cgr
        LEFT JOIN page_content_map pcm
          ON pcm.page_url = cgr.our_page_url
         AND pcm.is_our_page = TRUE
         AND pcm.site_key = cgr.site_key
        WHERE cgr.site_key = {_esc(site_key)}
          AND (cgr.our_page_url ILIKE {_esc('%' + slug + '%')})
        ORDER BY cgr.priority_score DESC NULLS LAST
        LIMIT 1
    """)
    return rows[0] if rows else None


def _fetch_gsc_data(site_key: str, page_url: str, days: int = 90) -> list[dict]:
    return _sql(f"""
        SELECT query,
               SUM(impressions) AS impressions,
               SUM(clicks) AS clicks,
               ROUND(AVG(position)::NUMERIC, 1) AS avg_pos,
               CASE WHEN SUM(impressions) > 0
                    THEN ROUND((SUM(clicks)::NUMERIC / SUM(impressions)) * 100, 2)
                    ELSE 0 END AS ctr_pct
        FROM gsc_query_data
        WHERE site_key = {_esc(site_key)}
          AND page_url = {_esc(page_url)}
          AND date >= CURRENT_DATE - {days}
        GROUP BY query
        ORDER BY SUM(impressions) DESC
        LIMIT 30
    """)


def _fetch_competitor_data(competitor_urls: list[str]) -> list[dict]:
    if not competitor_urls:
        return []
    urls_sql = ", ".join(_esc(u) for u in competitor_urls)
    return _sql(f"""
        SELECT page_url, word_count, title_tag,
               jsonb_array_length(COALESCE(sections, '[]'::jsonb)) AS section_count
        FROM page_content_map
        WHERE page_url IN ({urls_sql})
        ORDER BY word_count DESC NULLS LAST
    """)


def _find_source_file(content_dir: str, slug: str) -> str | None:
    """Locate the markdown file for this slug."""
    base = ROOT / content_dir
    if not base.exists():
        return None
    for path in base.rglob(f"{slug}.md"):
        return str(path.relative_to(ROOT)).replace("\\", "/")
    return None


def _format_gsc_table(rows: list[dict]) -> str:
    if not rows:
        return "_(no queries with impressions in last 90 days)_"
    lines = ["| Impressions | Clicks | Avg Pos | CTR | Query |", "|---:|---:|---:|---:|---|"]
    for r in rows:
        lines.append(
            f"| {r['impressions']} | {r['clicks']} | {r['avg_pos']} | {r['ctr_pct']}% | {r['query']} |"
        )
    return "\n".join(lines)


def _format_topic_gaps(gaps: Any) -> str:
    if not gaps:
        return "_(none)_"
    out = []
    for g in gaps:
        if isinstance(g, dict):
            out.append(
                f"- **[{g.get('priority', '?').upper()}] {g.get('topic', '')}** — {g.get('detail', '')}"
            )
        else:
            out.append(f"- {g}")
    return "\n".join(out)


def _format_query_gaps(gaps: Any) -> str:
    if not gaps:
        return "_(none)_"
    out = []
    for g in gaps:
        if isinstance(g, dict):
            out.append(
                f"- `{g.get('term', '')}`: us {g.get('our_count', 0)}× vs competitors avg {g.get('their_avg_count', 0)}×"
            )
    return "\n".join(out)


def build_brief(site_key: str, slug: str) -> str:
    data = _fetch_page_data(site_key, slug)
    if not data:
        return f"# No gap report found for slug `{slug}` on site `{site_key}`\n"

    rules = SITE_RULES.get(site_key, {})
    page_url = data["our_page_url"]
    src_file = _find_source_file(rules.get("content_dir", ""), slug) or "(not found - search manually)"
    gsc = _fetch_gsc_data(site_key, page_url)
    competitors = _fetch_competitor_data(list(data.get("competitor_urls") or []))

    # Format pillar pages for cannibalisation context
    pillar_lines = []
    for name, path in rules.get("pillar_pages", {}).items():
        pillar_lines.append(f"- **{name}** → `{path}`")
    pillars = "\n".join(pillar_lines) or "_(none)_"

    # Format authority links
    auth_lines = []
    for name, url in rules.get("authority_links", []):
        auth_lines.append(f"- [{name}]({url})")
    auth = "\n".join(auth_lines)

    # Format competitors
    comp_lines = []
    for c in competitors:
        comp_lines.append(
            f"- {c['page_url']} _(parsed: {c['word_count']} words, {c['section_count']} sections)_"
        )
    if not comp_lines:
        for u in (data.get("competitor_urls") or []):
            comp_lines.append(f"- {u} _(not in page_content_map, fetch fresh)_")
    competitors_md = "\n".join(comp_lines) or "_(none)_"

    return f"""# Page improvement brief: {slug}

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: {page_url}
- **Source file**: `{src_file}`
- **Primary query**: `{data['primary_query']}`
- **Current avg position**: {data['our_avg_position']}
- **Priority score**: {data['priority_score']} / 10
- **Current word count**: {data['our_word_count']}
- **Competitor avg word count**: {data['competitor_avg_word_count']}
- **Current section count**: {data['our_section_count']}
- **Competitor avg section count**: {data['competitor_avg_section_count']}
- **Current FAQ count (parsed, may be wrong)**: {data['our_faq_count']}
- **Competitor avg FAQ count (parsed, may be wrong)**: {data['competitor_avg_faq_count']}

> ⚠️ The FAQ counts above come from a parser that does not recognise `<dl>/<dt>/<dd>` patterns or all JSON-LD schema variations. **Read the source file frontmatter to see actual FAQ count, then plan to expand to 10-14.**

## GSC query data (last 90 days)

This is the ground truth on what queries the page currently surfaces for. Use this to inform:
- Meta title (lead with the highest-impression query word order)
- Meta description (specific differentiators that beat competing SERP results)
- FAQ questions (target the queries with impressions but no clicks)

{_format_gsc_table(gsc)}

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

{competitors_md}

```python
# Fetch and inspect competitor:
from optimisation_engine.competitor._fetch import fetch_url
from bs4 import BeautifulSoup
status, html = fetch_url('<url>')
soup = BeautifulSoup(html, 'lxml')
print(f'H2s: {{[h.get_text() for h in soup.find_all(\"h2\")]}}')
print(f'FAQ schema present: {{\"FAQPage\" in html}}')
```

## DeepSeek topic gaps

{_format_topic_gaps(data.get('topic_gaps'))}

## DeepSeek query gaps (keyword density)

{_format_query_gaps(data.get('query_gaps'))}

## DeepSeek structural gaps

{chr(10).join('- ' + s for s in (data.get('structural_gaps') or [])) or '_(none)_'}

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- {chr(10).join('- ' + s for s in (data.get('eeat_gaps') or []))}

## DeepSeek improvement brief (raw)

```
{(data.get('improvement_brief') or '')[:6000]}
```

> The above is DeepSeek's brief. Treat as a starting point. **Verify every claim against the actual live competitor pages before transcribing figures or section ideas into our content.**

## Cannibalisation context

Pillar pages already exist for these topics. When this page touches one of them, write the **applied / local / scenario-flavoured** version, not the comprehensive theoretical version. Link out to the pillar guide rather than duplicating.

{pillars}

Before writing, run this to check no pillar competes for our target queries:

```bash
cd C:/Users/user/Documents/Accounting && python -c "
from optimisation_engine.competitor._db import _sql
for url in [<pillar paths from above>]:
    rows = _sql(f\\"\\"\\"SELECT query, SUM(impressions) AS i FROM gsc_query_data
                       WHERE site_key='{site_key}' AND page_url='{rules.get('domain', '')}{{url}}'
                       AND date >= CURRENT_DATE - 90 GROUP BY query HAVING SUM(impressions) > 2 ORDER BY i DESC LIMIT 5\\"\\"\\")
    print(url, rows)
"
```

## External authority links to favour

Reach for these when adding citations. Land on parent paths if unsure of specific URLs (better to under-promise than 404).

{auth}

## Site context (`{site_key}`)

- **Audience**: {rules.get('audience', '(unknown)')}
- **Lead form segments**: {', '.join(rules.get('lead_form_segments', []))}
- **Web root**: `{rules.get('web_root', '')}`
- **Content dir**: `{rules.get('content_dir', '')}`
- **Domain**: `{rules.get('domain', '')}`

{UNIVERSAL_RULES}

{WORKFLOW_STEPS}

## Final commands you will run

```bash
# Read the source file
# (use Read tool)

# Build to verify
cd C:/Users/user/Documents/Accounting/{rules.get('web_root', '')} && npm run build

# Verify FAQ schema count matches frontmatter
grep -c '"@type":"Question"' .next/server/app/blog/<category>/<slug>.html

# When done, report back: word count before/after, FAQ count, links added, summary
```

## When you're done

Reply with this exact summary block so the orchestrator can confirm the page is ready:

```
PAGE: {slug}
STATUS: complete
WORD_COUNT_BEFORE: {data['our_word_count']}
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
"""


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Generate handover briefs for parallel Opus sessions")
    parser.add_argument("--site", required=True, help="Site key (e.g. property)")
    parser.add_argument("--slug", help="Specific slug to generate brief for")
    parser.add_argument("--top", type=int, help="Generate briefs for top N priority pages")
    parser.add_argument("--out-dir", default="briefs", help="Output directory for brief markdown files")
    args = parser.parse_args()

    out_dir = ROOT / args.out_dir / args.site
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.slug:
        slugs = [args.slug]
    elif args.top:
        rows = _sql(f"""
            SELECT our_page_url, priority_score
            FROM competitor_gap_reports
            WHERE site_key = {_esc(args.site)}
              AND improvement_brief IS NOT NULL AND improvement_brief != ''
            ORDER BY priority_score DESC NULLS LAST
            LIMIT {args.top}
        """)
        slugs = []
        for r in rows:
            url = r["our_page_url"]
            slug = url.rstrip("/").rsplit("/", 1)[-1]
            slugs.append(slug)
    else:
        parser.error("Provide either --slug or --top N")
        return

    for slug in slugs:
        print(f"Generating brief for: {slug}")
        try:
            md = build_brief(args.site, slug)
        except Exception as exc:
            print(f"  ERROR: {exc}")
            continue
        out_path = out_dir / f"{slug}.md"
        out_path.write_text(md, encoding="utf-8")
        print(f"  wrote: {out_path.relative_to(ROOT)}")

    print(f"\nDone. {len(slugs)} brief(s) written to {out_dir.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
