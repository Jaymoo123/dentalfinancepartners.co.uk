"""
Editorial Content Optimizer — DeepSeek-powered editorial deep-dive
Reads each Property blog post + its real GSC query data, sends to DeepSeek
for editorial analysis, and outputs structured change proposals.

Known failure modes and guardrails: Admin/EDITORIAL_PIPELINE_LESSONS.md

Usage:
    python scripts/optimize_content_editorial.py                    # Generate review file
    python scripts/optimize_content_editorial.py --validate-only    # Check proposals against current content
    python scripts/optimize_content_editorial.py --apply            # Apply accepted changes
    python scripts/optimize_content_editorial.py --dry-run          # Preview which posts will be analyzed

Flags:
    --provider deepseek|anthropic|auto    LLM provider (default: auto)
    --force-prices                        Apply content even with unverified pricing
    --force-meta                          Apply meta even if recently modified
"""

import sys
import os
import json
import re
import argparse
import glob
import yaml
import io

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from dotenv import load_dotenv
load_dotenv(os.path.join(project_root, ".env"))

from agents.utils.deepseek_client import DeepSeekClient

try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False


class AnthropicFallbackClient:
    """Fallback client using Anthropic Claude when DeepSeek balance is zero."""

    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY not set")
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = "claude-sonnet-4-20250514"

    def generate_structured(self, prompt, system=None, temperature=0.2,
                            max_tokens=4000, response_format=None):
        messages = [{"role": "user", "content": prompt}]
        kwargs = {
            "model": self.model,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": messages,
        }
        if system:
            kwargs["system"] = system

        response = self.client.messages.create(**kwargs)
        content = response.content[0].text

        if response_format:
            cleaned = content.strip()
            if cleaned.startswith("```"):
                cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
                cleaned = re.sub(r"\s*```$", "", cleaned)
            try:
                return json.loads(cleaned)
            except json.JSONDecodeError:
                return content
        return content

CONTENT_DIR = os.path.join(project_root, "Property", "web", "content", "blog")
GSC_DATA_FILE = os.path.join(project_root, "scripts", "gsc_property_data.json")
REVIEW_FILE = os.path.join(project_root, "scripts", "editorial_review.json")
MANIFEST_FILE = os.path.join(project_root, "scripts", "editorial_applied.json")
MIN_IMPRESSIONS = 10
VALID_TAX_YEARS = {"2025/26", "2026/27"}
PRICE_PATTERN = re.compile(r"\u00a3\d[\d,]*(?:\.\d{2})?\s*(?:/|per\s+)?(?:month|mo|monthly|pm|p\.m\.|year|annually)", re.IGNORECASE)


def safe_print(msg):
    """Print without risking UnicodeEncodeError on Windows."""
    print(msg.encode("ascii", errors="replace").decode("ascii"))


def _load_manifest():
    """Load the editorial_applied.json manifest, or return empty dict."""
    if os.path.exists(MANIFEST_FILE):
        with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_manifest(manifest):
    """Save the editorial_applied.json manifest."""
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

# Redirect slugs -> canonical slugs (from Property middleware DUPLICATE_REDIRECTS)
REDIRECT_MAP = {
    "capital-gains-tax-property-sale-uk-2026": "capital-gains-tax-property-sale-uk-2026-rates-allowances",
    "section-24-relief-how-much-can-i-claim-2026": "section-24-calculator",
    "section-24-tax-calculator-annual-cost": "section-24-calculator",
    "property-accountant-fees-guide": "how-much-does-a-property-accountant-cost",
    "how-much-is-a-property-accountant": "how-much-does-a-property-accountant-cost",
    "how-much-does-property-accountant-cost-uk": "how-much-does-a-property-accountant-cost",
    "property-accountant-cost-complete-guide": "how-much-does-a-property-accountant-cost",
    "property-accountant-cost-guide": "how-much-does-a-property-accountant-cost",
    "property-accountant-fees-complete-guide": "how-much-does-a-property-accountant-cost",
    "landlord-insurance-tax-deductible-what-can-you-claim": "landlord-insurance-tax-deductible",
    "mortgage-interest-tax-relief-changes-landlords": "section-24-mortgage-interest-restriction-uk-landlords",
    "landlord-accounting-software-uk-2026": "landlord-accounting-software-uk-best-options-2026",
    "how-much-do-accountants-make-in-london": "property-accountant-salary-complete-guide",
    "how-much-do-property-accountants-make": "property-accountant-salary-complete-guide",
    "property-accountant-salary-uk-guide": "property-accountant-salary-complete-guide",
    "property-accountant-salary-london": "property-accountant-salary-complete-guide",
    "property-tax-accountant-birmingham": "birmingham-property-accountant",
    "property-tax-accountant-london": "london-property-accountant",
    "property-tax-accountant-manchester": "manchester-property-accountant",
    "when-to-incorporate-property-portfolio-timing": "incorporation-timing-when-to-incorporate-property-portfolio",
    "landlord-tax-return-self-assessment": "landlord-tax-return-complete-guide-2026",
    "landlord-capital-allowances-maximizing-tax-relief": "landlord-capital-allowances-tax-relief",
    "section-24-basic-rate-taxpayer-affected": "section-24-basic-rate-taxpayers",
    "section-24-mortgage-interest-restriction-explained": "section-24-mortgage-interest-restriction-uk-landlords",
}


SYSTEM_PROMPT = """You are an editorial SEO analyst for propertytaxpartners.co.uk, a UK property tax accountancy website. You receive a blog post and Google Search Console data showing what real people searched to find it.

Your job is to identify content gaps and propose specific editorial changes that make the content genuinely more useful for real searchers.

WHAT YOU ARE:
- An editor who reads carefully and thinks about what the searcher actually needs
- Someone who proposes changes only when there is a clear, data-backed reason
- Precise about UK property tax facts (Section 24, CGT rates, PPR relief, MTD deadlines, HMRC forms)

WHAT YOU ARE NOT:
- A keyword stuffer who mechanically injects search terms
- A content generator who adds fluffy sections just to increase word count
- Someone who changes things that are already working fine

CRITICAL RULES:
1. If a post already covers a query's topic well, DO NOT suggest changes for that query. Say it is fine.
2. Every single change you propose MUST reference specific query data (query text + impressions).
3. New content MUST be factually accurate about UK tax law. Do not make up rates, thresholds, or deadlines.
4. Output raw HTML tags (<p>, <h2>, <h3>, <ul>, <li>, <strong>, <a href="...">). NEVER output markdown.
5. metaTitle must be UNDER 60 characters. metaDescription must be UNDER 155 characters. COUNT CAREFULLY.
6. NEVER suggest changing the post slug or URL.
7. Do not duplicate content that already exists in the post — if a section covers a topic, expand it in-place rather than creating a new section.
8. If the post genuinely covers its queries well and no changes are needed, say so. Do not invent problems."""


def build_user_prompt(post_content, post_slug, queries, all_slugs_with_categories):
    query_table = ""
    if queries:
        query_table = "| Impressions | Clicks | Position | Query |\n|---|---|---|---|\n"
        for q in sorted(queries, key=lambda x: x["impressions"], reverse=True):
            query_table += f"| {q['impressions']} | {q['clicks']} | {q['position']:.1f} | {q['query']} |\n"
    else:
        query_table = "(No specific query data available — only page-level aggregate data)"

    other_posts = "\n".join(
        f"- /blog/{cat}/{slug}" for slug, cat in all_slugs_with_categories.items()
        if slug != post_slug
    )

    return f"""== YOUR TASK ==
Read this blog post. Read the search queries that real people typed into Google which led them to this page. Identify what is MISSING, what is THIN, and what is ALREADY GOOD. Propose specific changes.

== THE BLOG POST ==
Slug: {post_slug}

{post_content}

== SEARCH QUERIES THAT LED PEOPLE TO THIS PAGE ==
These are real queries from Google Search Console. "Impressions" means how many times this page appeared in search results for that query. "Clicks" means how many people clicked through. "Position" is the average ranking (1 = top of page 1, 10 = bottom of page 1, 11+ = page 2+).

{query_table}

== OTHER POSTS ON THIS SITE (for internal linking) ==
{other_posts}

== STEP-BY-STEP INSTRUCTIONS ==

Do these steps IN ORDER. Do not skip any step.

STEP 1 — QUERY INTENT ANALYSIS
For each query with 5+ impressions, answer this question:
"If I searched this exact phrase, would this blog post give me a complete, satisfying answer?"

Here is an example of a GAP:
Query: "landlord expenses list" (18 impressions)
The post has expenses scattered across 8 different sections. A person searching "landlord expenses list" wants ONE consolidated, scannable list. The post does NOT satisfy this intent.
VERDICT: This is a gap. Propose adding a consolidated list section near the top.

Here is an example of something that is FINE:
Query: "is mortgage interest deductible" (8 impressions)
The post has a dedicated section "Mortgage Interest and Finance Costs" that directly answers this question with specific numbers and examples.
VERDICT: This is fine. Do NOT propose any changes for this query.

Here is an example of a THIN section:
Query: "sa105 2026" (9 impressions, position 9.0)
The post mentions "Most individual landlords use the SA105 property pages" in one paragraph but never explains what goes in each box or how to fill it in. Someone searching "sa105 2026" wants step-by-step guidance on the form.
VERDICT: The section exists but is thin. Propose expanding it with specific SA105 guidance.

STEP 2 — SECTION-BY-SECTION REVIEW
Go through every H2 and H3 in the post. For each one, classify it:
- COMPREHENSIVE: This section thoroughly covers its topic. Leave it alone.
- THIN: This section touches a topic but doesn't go deep enough to satisfy a relevant query. Propose expansion.
- IRRELEVANT: This section doesn't relate to any real search query. Leave it alone (don't delete it).

STEP 3 — META ASSESSMENT
Look at the metaTitle and metaDescription in the front matter.
- Does the metaTitle contain the words people actually type? (Check the top queries)
- Does the metaDescription give a specific, compelling reason to click?
- Is the metaTitle under 60 characters? Is the metaDescription under 155 characters?
- If the current meta is already good, DO NOT change it just for the sake of changing it.

STEP 4 — INTERNAL LINKING
Look at the "Other posts on this site" list.
- Is there a topic mentioned in THIS post that has a DEDICATED article elsewhere on the site?
- Only suggest a link if: (a) the topic is genuinely mentioned in this post, AND (b) a reader would naturally want to learn more about it at that point.
- Do NOT suggest forcing links where they don't fit naturally.

== OUTPUT FORMAT ==
Return ONLY valid JSON. No text before or after the JSON. No markdown code fences.

{{
  "post_slug": "{post_slug}",
  "overall_assessment": "2-3 sentences: What this post does well, and what the main gap is (if any). Be specific.",
  "meta_changes": {{
    "metaTitle": "The new title (or null if current is fine)",
    "metaTitle_chars": 55,
    "metaTitle_rationale": "Why this change — reference the specific queries. Or say 'Current metaTitle is fine because...'",
    "metaDescription": "The new description (or null if current is fine)",
    "metaDescription_chars": 145,
    "metaDescription_rationale": "Why this change. Or say 'Current metaDescription is fine because...'"
  }},
  "content_changes": [
    {{
      "type": "expand_section",
      "target_heading": "The EXACT H2 or H3 text from the post that needs expanding",
      "current_problem": "What is wrong with this section right now — be specific about what is missing",
      "new_html": "<p>The expanded HTML that should REPLACE the existing section content (everything between this heading and the next heading).</p>",
      "rationale": "Which query (with impressions) this serves, and why the current content does not satisfy the searcher"
    }},
    {{
      "type": "add_section",
      "new_heading": "The New H2 or H3 Heading",
      "insert_after": "The EXACT existing heading text that this new section should come AFTER",
      "new_html": "<h2>The New H2 Heading</h2>\\n<p>The content...</p>",
      "rationale": "Which query (with impressions) demands this section, why it does not already exist in the post, and why it belongs in this position"
    }}
  ],
  "internal_links": [
    {{
      "context_sentence": "Copy the EXACT sentence from the post where the link should be added",
      "updated_sentence": "The same sentence but with an <a href=\\"/blog/category/slug\\">anchor text</a> added",
      "rationale": "Why a reader at this point would want to navigate to that article"
    }}
  ],
  "no_changes_needed": false
}}

== FINAL REMINDERS ==
- If the post is already good, set "no_changes_needed": true, "content_changes": [], "internal_links": [], and set meta fields to null. Write a clear explanation in "overall_assessment".
- Do NOT propose more than 3 content changes per post. Focus on the highest-impact gaps only.
- Every piece of new HTML must be factually accurate about UK property tax. If you are unsure about a number or threshold, do not include it.
- metaTitle UNDER 60 chars. metaDescription UNDER 155 chars. Count. Every. Character.
- The HTML body uses <h2> for main sections and <h3> for subsections. Match this pattern.
- All internal links use the format /blog/{{category-slug}}/{{post-slug}}. Check the "Other posts" list for correct paths."""


def load_gsc_data():
    with open(GSC_DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_blog_posts():
    """Load all .md files, return dict of slug -> {file_path, content, front_matter}."""
    posts = {}
    for filepath in glob.glob(os.path.join(CONTENT_DIR, "*.md")):
        with open(filepath, "r", encoding="utf-8") as f:
            raw = f.read()
        parts = raw.split("---", 2)
        if len(parts) < 3:
            continue
        try:
            fm = yaml.safe_load(parts[1])
        except yaml.YAMLError:
            continue
        slug = fm.get("slug", os.path.basename(filepath).replace(".md", ""))
        category = fm.get("category", "")
        posts[slug] = {
            "file_path": filepath,
            "content": raw,
            "front_matter": fm,
            "category": category,
        }
    return posts


def slugify_category(category_name):
    """Property site slugifyCategory: & -> and, lowercase, spaces -> hyphens."""
    s = category_name.lower()
    s = s.replace("&", "and")
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s]+", "-", s.strip())
    s = re.sub(r"-+", "-", s)
    return s


def build_slug_to_category_map(posts):
    """Build {slug: category_slug} for all posts."""
    return {
        slug: slugify_category(data["category"])
        for slug, data in posts.items()
        if data["category"]
    }


def map_gsc_to_posts(gsc_data, posts):
    """
    Map GSC page URLs and queries to actual blog post slugs.
    Returns {slug: {"impressions": N, "clicks": N, "position": X, "queries": [...]}}
    """
    post_gsc = {}

    def resolve_slug(url_slug):
        """Resolve a URL slug to a canonical post slug."""
        if url_slug in posts:
            return url_slug
        if url_slug in REDIRECT_MAP:
            canonical = REDIRECT_MAP[url_slug]
            if canonical in posts:
                return canonical
        return None

    def extract_slug_from_url(url):
        """Get the last path segment from a URL."""
        path = url.rstrip("/").split("/")[-1]
        return path if path else None

    for page in gsc_data.get("pages", []):
        url = page["keys"][0]
        url_slug = extract_slug_from_url(url)
        if not url_slug:
            continue
        canonical = resolve_slug(url_slug)
        if not canonical:
            continue
        if canonical not in post_gsc:
            post_gsc[canonical] = {"impressions": 0, "clicks": 0, "positions": [], "queries": []}
        post_gsc[canonical]["impressions"] += page["impressions"]
        post_gsc[canonical]["clicks"] += page["clicks"]
        post_gsc[canonical]["positions"].append(page["position"])

    for pq in gsc_data.get("page_queries", []):
        url = pq["keys"][0]
        query = pq["keys"][1]
        url_slug = extract_slug_from_url(url)
        if not url_slug:
            continue
        canonical = resolve_slug(url_slug)
        if not canonical:
            continue
        if canonical not in post_gsc:
            post_gsc[canonical] = {"impressions": 0, "clicks": 0, "positions": [], "queries": []}
        post_gsc[canonical]["queries"].append({
            "query": query,
            "impressions": pq["impressions"],
            "clicks": pq["clicks"],
            "position": pq["position"],
        })

    for slug, data in post_gsc.items():
        if data["positions"]:
            data["avg_position"] = sum(data["positions"]) / len(data["positions"])
        else:
            data["avg_position"] = 0
        del data["positions"]

    return post_gsc


def analyze_post(client, post_content, post_slug, queries, all_slugs_with_categories):
    """Send a single post to DeepSeek for editorial analysis."""
    prompt = build_user_prompt(post_content, post_slug, queries, all_slugs_with_categories)

    result = client.generate_structured(
        prompt=prompt,
        system=SYSTEM_PROMPT,
        temperature=0.2,
        max_tokens=4000,
        response_format={"type": "json_object"},
    )

    if isinstance(result, str):
        try:
            cleaned = result.strip()
            if cleaned.startswith("```"):
                cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
                cleaned = re.sub(r"\s*```$", "", cleaned)
            result = json.loads(cleaned)
        except json.JSONDecodeError:
            print(f"  [ERROR] Could not parse DeepSeek response as JSON for {post_slug}")
            return {"post_slug": post_slug, "error": "Failed to parse JSON", "raw_response": result[:500]}

    return result


def _split_front_matter(content):
    """Split .md content into (front_matter_with_delimiters, body).
    Returns (front_matter, body) where front_matter includes both --- delimiters."""
    parts = content.split("---", 2)
    if len(parts) < 3:
        return ("", content)
    front_matter = parts[0] + "---" + parts[1] + "---"
    body = parts[2]
    return (front_matter, body)


def _extract_headings_from_html(html_body):
    """Extract all h2/h3 heading texts from HTML body."""
    return [m.group(2) for m in re.finditer(r"<(h[23])(?:[^>]*)>(.*?)</\1>", html_body, re.IGNORECASE)]


def validate_result(result, post_slug, post_content):
    """Validate and fix LLM output before saving. Returns the cleaned result.
    See Admin/EDITORIAL_PIPELINE_LESSONS.md for the failure modes this catches."""
    if result.get("error") or result.get("no_changes_needed"):
        return result

    warnings = []
    _, body = _split_front_matter(post_content)
    existing_headings = _extract_headings_from_html(body)

    # F-001: Meta length enforcement
    meta = result.get("meta_changes", {})
    if meta.get("metaTitle") and len(meta["metaTitle"]) > 60:
        original = meta["metaTitle"]
        truncated = original[:60]
        last_space = truncated.rfind(" ")
        if last_space > 30:
            truncated = truncated[:last_space]
        meta["metaTitle"] = truncated
        meta["metaTitle_chars"] = len(truncated)
        warnings.append(f"F-001: metaTitle truncated from {len(original)} to {len(truncated)} chars")

    if meta.get("metaDescription") and len(meta["metaDescription"]) > 155:
        original = meta["metaDescription"]
        truncated = original[:155]
        last_period = truncated.rfind(".")
        if last_period > 80:
            truncated = truncated[:last_period + 1]
        else:
            last_space = truncated.rfind(" ")
            if last_space > 80:
                truncated = truncated[:last_space]
        meta["metaDescription"] = truncated
        meta["metaDescription_chars"] = len(truncated)
        warnings.append(f"F-001: metaDescription truncated from {len(original)} to {len(truncated)} chars")

    # F-002: Fabrication flag for pricing claims
    has_prices = False
    for change in result.get("content_changes", []):
        if change.get("new_html") and PRICE_PATTERN.search(change["new_html"]):
            has_prices = True
            break
    if has_prices:
        result["_needs_price_verification"] = True
        warnings.append("F-002: Content contains price claims -- needs manual verification")

    # F-003: Tax year validation
    tax_year_re = re.compile(r"20(\d\d)/(\d\d)")
    for change in result.get("content_changes", []):
        html = change.get("new_html", "")
        for m in tax_year_re.finditer(html):
            year_str = m.group(0)
            if year_str not in VALID_TAX_YEARS:
                result["_has_tax_year_warning"] = True
                warnings.append(f"F-003: Suspicious tax year '{year_str}' in content change")

    # F-005: Heading target validation
    valid_changes = []
    for change in result.get("content_changes", []):
        target = change.get("target_heading") or change.get("insert_after", "")
        if not target:
            valid_changes.append(change)
            continue
        if target in existing_headings:
            valid_changes.append(change)
        else:
            warnings.append(f"F-005: Dropped change -- heading not found: '{target[:60]}'")
    result["content_changes"] = valid_changes

    # F-006: Duplicate heading detection (add_section only)
    deduped_changes = []
    for change in result.get("content_changes", []):
        if change.get("type") == "add_section":
            new_heading = change.get("new_heading", "")
            if new_heading and new_heading in existing_headings:
                warnings.append(f"F-006: Dropped add_section -- heading already exists: '{new_heading}'")
                continue
        deduped_changes.append(change)
    result["content_changes"] = deduped_changes

    # S-002: YAML-safe zone check for internal links
    front_matter, _ = _split_front_matter(post_content)
    valid_links = []
    for link in result.get("internal_links", []):
        ctx = link.get("context_sentence", "")
        if ctx and ctx in front_matter:
            warnings.append(f"S-002: Dropped link -- context_sentence found in YAML front matter")
            continue
        valid_links.append(link)
    result["internal_links"] = valid_links

    if warnings:
        result["_validation_warnings"] = warnings

    return result


def apply_meta_changes(file_path, raw_content, meta_changes):
    """Apply metaTitle and/or metaDescription changes to a .md file."""
    changed = False
    content = raw_content

    if meta_changes.get("metaTitle"):
        new_title = meta_changes["metaTitle"]
        old_match = re.search(r'^metaTitle:\s*"([^"]*)"', content, re.MULTILINE)
        if old_match:
            content = content.replace(old_match.group(0), f'metaTitle: "{new_title}"')
            changed = True

    if meta_changes.get("metaDescription"):
        new_desc = meta_changes["metaDescription"]
        old_match = re.search(r'^metaDescription:\s*"([^"]*)"', content, re.MULTILINE)
        if old_match:
            content = content.replace(old_match.group(0), f'metaDescription: "{new_desc}"')
            changed = True

    if changed:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

    return changed


def _find_heading(content, heading_text):
    """Find a heading tag matching the given text, with or without attributes."""
    pattern = re.compile(
        rf"(<h([23])(?:[^>]*)>{re.escape(heading_text)}</h\2>)",
        re.IGNORECASE
    )
    return pattern.search(content)


def _find_next_heading_at_same_or_higher_level(content, after_pos, level):
    """Find the next h2 or h3 heading at the same or higher level after a position."""
    if level == 2:
        pattern = re.compile(r"<h2[ >]", re.IGNORECASE)
    else:
        pattern = re.compile(r"<h[23][ >]", re.IGNORECASE)
    return pattern.search(content[after_pos:])


def apply_content_changes(file_path, raw_content, content_changes):
    """Apply content expansions and additions to a .md file."""
    content = raw_content
    applied = 0

    for change in content_changes:
        change_type = change.get("type", "")

        if change_type == "expand_section":
            target = change.get("target_heading", "")
            new_html = change.get("new_html", "")
            if not target or not new_html:
                continue

            match = _find_heading(content, target)
            if not match:
                print(f"    [SKIP expand] Could not find heading: '{target}'")
                continue

            heading_tag = match.group(1)
            heading_level = int(match.group(2))
            section_start = match.end()

            next_match = _find_next_heading_at_same_or_higher_level(
                content, section_start, heading_level
            )
            if next_match:
                section_end = section_start + next_match.start()
            else:
                section_end = len(content)

            content = (
                content[:match.start()]
                + heading_tag + "\n"
                + new_html.strip() + "\n\n"
                + content[section_end:]
            )
            applied += 1

        elif change_type == "add_section":
            insert_after = change.get("insert_after", "")
            new_html = change.get("new_html", "")
            if not insert_after or not new_html:
                continue

            match = _find_heading(content, insert_after)
            if not match:
                print(f"    [SKIP add] Could not find heading: '{insert_after}'")
                continue

            heading_level = int(match.group(2))
            next_heading = _find_next_heading_at_same_or_higher_level(
                content, match.end(), heading_level
            )
            if next_heading:
                insert_pos = match.end() + next_heading.start()
            else:
                insert_pos = len(content)
            content = content[:insert_pos] + "\n\n" + new_html.strip() + "\n\n" + content[insert_pos:]
            applied += 1

    if applied > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

    return applied


def apply_internal_links(file_path, raw_content, links):
    """Apply internal link changes. Only modifies body HTML, never YAML front matter."""
    front_matter, body = _split_front_matter(raw_content)
    applied = 0

    for link in links:
        old_sentence = link.get("context_sentence", "")
        new_sentence = link.get("updated_sentence", "")
        if old_sentence and new_sentence and old_sentence in body:
            body = body.replace(old_sentence, new_sentence, 1)
            applied += 1

    if applied > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(front_matter + body)

    return applied


def main():
    parser = argparse.ArgumentParser(description="Editorial content optimizer via DeepSeek/Anthropic")
    parser.add_argument("--apply", action="store_true", help="Apply accepted changes from editorial_review.json")
    parser.add_argument("--dry-run", action="store_true", help="Preview which posts would be analyzed")
    parser.add_argument("--validate-only", action="store_true",
                        help="Check review JSON against current .md files and print a report (no changes)")
    parser.add_argument("--provider", choices=["deepseek", "anthropic", "auto"], default="auto",
                        help="LLM provider (default: auto -- tries DeepSeek first, falls back to Anthropic)")
    parser.add_argument("--force-prices", action="store_true",
                        help="Apply content changes even if they contain unverified pricing claims")
    parser.add_argument("--force-meta", action="store_true",
                        help="Apply meta changes even on fields modified in the last 30 days")
    args = parser.parse_args()

    # --- Validate-only mode ---
    if args.validate_only:
        if not os.path.exists(REVIEW_FILE):
            print(f"[ERROR] Review file not found: {REVIEW_FILE}")
            sys.exit(1)

        with open(REVIEW_FILE, "r", encoding="utf-8") as f:
            reviews = json.load(f)

        posts = load_blog_posts()
        manifest = _load_manifest()

        print(f"Validating {len(reviews)} reviews against current .md files...\n")

        total_ok = 0
        total_warnings = 0
        total_would_skip = 0
        total_would_apply = 0

        for review in reviews:
            slug = review.get("post_slug", "")
            if review.get("error"):
                print(f"  [ERROR] {slug}: has error, would skip")
                continue
            if review.get("no_changes_needed"):
                print(f"  [OK] {slug}: no changes needed")
                total_ok += 1
                continue
            if slug not in posts:
                print(f"  [SKIP] {slug}: file not found")
                total_would_skip += 1
                continue

            post = posts[slug]
            validated = validate_result(dict(review), slug, post["content"])
            warnings = validated.get("_validation_warnings", [])
            n_changes = len(validated.get("content_changes", []))
            n_links = len(validated.get("internal_links", []))
            has_meta = bool(validated.get("meta_changes", {}).get("metaTitle") or
                           validated.get("meta_changes", {}).get("metaDescription"))
            has_prices = validated.get("_needs_price_verification", False)
            has_tax_warn = validated.get("_has_tax_year_warning", False)

            # Check manifest for recently-touched meta
            meta_skip = []
            if not args.force_meta and slug in manifest:
                from datetime import datetime, timedelta
                cutoff = (datetime.now() - timedelta(days=30)).isoformat()
                entry = manifest[slug]
                if entry.get("metaTitle_applied") and entry["metaTitle_applied"] > cutoff:
                    meta_skip.append("metaTitle")
                if entry.get("metaDescription_applied") and entry["metaDescription_applied"] > cutoff:
                    meta_skip.append("metaDescription")

            status_parts = []
            if n_changes:
                status_parts.append(f"{n_changes} content")
            if n_links:
                status_parts.append(f"{n_links} links")
            if has_meta:
                status_parts.append("meta")
            if has_prices:
                status_parts.append("PRICES-UNVERIFIED")
            if has_tax_warn:
                status_parts.append("TAX-YEAR-WARNING")
            if meta_skip:
                status_parts.append(f"meta-skip:{','.join(meta_skip)}")

            status = " | ".join(status_parts) if status_parts else "no actionable changes"
            print(f"  [{slug}] {status}")
            for w in warnings:
                print(f"    WARN: {w}")
                total_warnings += 1
            total_would_apply += 1

        print(f"\n{'='*60}")
        print(f"VALIDATION SUMMARY")
        print(f"  Would apply: {total_would_apply}")
        print(f"  No changes:  {total_ok}")
        print(f"  Skipped:     {total_would_skip}")
        print(f"  Warnings:    {total_warnings}")
        print(f"{'='*60}")
        return

    if args.apply:
        if not os.path.exists(REVIEW_FILE):
            print(f"[ERROR] Review file not found: {REVIEW_FILE}")
            print("Run without --apply first to generate the review file.")
            sys.exit(1)

        with open(REVIEW_FILE, "r", encoding="utf-8") as f:
            reviews = json.load(f)

        posts = load_blog_posts()
        manifest = _load_manifest()
        from datetime import datetime, timedelta
        now_iso = datetime.now().isoformat()
        cutoff = (datetime.now() - timedelta(days=30)).isoformat()

        total_meta = 0
        total_content = 0
        total_links = 0
        total_skipped_prices = 0
        total_skipped_meta = 0

        for review in reviews:
            slug = review.get("post_slug")
            if review.get("error") or review.get("no_changes_needed"):
                continue
            if slug not in posts:
                safe_print(f"[SKIP] {slug} -- file not found")
                continue

            post = posts[slug]
            filepath = post["file_path"]
            raw = post["content"]

            safe_print(f"\n[APPLYING] {slug}")

            if slug not in manifest:
                manifest[slug] = {}

            # Meta changes (with manifest protection)
            meta = review.get("meta_changes", {})
            meta_to_apply = {}
            for field in ("metaTitle", "metaDescription"):
                if meta.get(field):
                    manifest_key = f"{field}_applied"
                    if not args.force_meta and slug in manifest and \
                       manifest[slug].get(manifest_key, "") > cutoff:
                        safe_print(f"  [SKIP] {field} -- modified within 30 days (use --force-meta to override)")
                        total_skipped_meta += 1
                    else:
                        meta_to_apply[field] = meta[field]

            if meta_to_apply:
                if apply_meta_changes(filepath, raw, meta_to_apply):
                    total_meta += 1
                    safe_print(f"  Meta updated")
                    for field in meta_to_apply:
                        manifest[slug][f"{field}_applied"] = now_iso
                    with open(filepath, "r", encoding="utf-8") as f:
                        raw = f.read()

            # Content changes (with price verification protection)
            changes = review.get("content_changes", [])
            if review.get("_needs_price_verification") and not args.force_prices:
                safe_print(f"  [SKIP] Content has unverified prices (use --force-prices to override)")
                total_skipped_prices += 1
            elif changes:
                n = apply_content_changes(filepath, raw, changes)
                total_content += n
                if n:
                    safe_print(f"  {n} content change(s) applied")
                    manifest[slug]["content_applied"] = now_iso
                    manifest[slug]["content_changes_count"] = n
                    with open(filepath, "r", encoding="utf-8") as f:
                        raw = f.read()

            # Internal links
            links = review.get("internal_links", [])
            if links:
                n = apply_internal_links(filepath, raw, links)
                total_links += n
                if n:
                    safe_print(f"  {n} link(s) added")
                    manifest[slug]["links_applied"] = now_iso
                    manifest[slug]["links_count"] = n

        _save_manifest(manifest)

        print(f"\n{'='*60}")
        print(f"APPLIED: {total_meta} meta, {total_content} content, {total_links} links")
        if total_skipped_prices:
            print(f"SKIPPED: {total_skipped_prices} posts with unverified prices")
        if total_skipped_meta:
            print(f"SKIPPED: {total_skipped_meta} meta fields (recently modified)")
        print(f"Manifest saved: {MANIFEST_FILE}")
        print(f"{'='*60}")
        return

    # --- Generate review ---
    print("Loading GSC data...")
    gsc_data = load_gsc_data()

    print("Loading blog posts...")
    posts = load_blog_posts()
    print(f"  Found {len(posts)} posts")

    print("Mapping GSC data to posts...")
    post_gsc = map_gsc_to_posts(gsc_data, posts)

    qualifying = {
        slug: data for slug, data in post_gsc.items()
        if data["impressions"] >= MIN_IMPRESSIONS and slug in posts
    }

    qualifying_sorted = sorted(qualifying.items(), key=lambda x: x[1]["impressions"], reverse=True)

    print(f"\n{'='*60}")
    print(f"QUALIFYING POSTS ({len(qualifying_sorted)} with {MIN_IMPRESSIONS}+ impressions):")
    print(f"{'='*60}")
    for slug, data in qualifying_sorted:
        n_queries = len(data["queries"])
        print(f"  {data['impressions']:>5} imp | {data['clicks']:>3} clk | pos {data['avg_position']:>5.1f} | {n_queries:>2} queries | {slug}")

    if args.dry_run:
        print(f"\n[DRY RUN] Would analyze {len(qualifying_sorted)} posts via DeepSeek")
        return

    slug_to_cat = build_slug_to_category_map(posts)

    client = None
    client_name = None
    provider = args.provider

    if provider in ("deepseek", "auto"):
        try:
            print(f"\nTrying DeepSeek client...")
            ds = DeepSeekClient()
            ds.generate_structured(prompt="test", max_tokens=5, temperature=0)
            client = ds
            client_name = "DeepSeek"
            print(f"  DeepSeek connected")
        except Exception as e:
            print(f"  DeepSeek failed: {e}")

    if not client and provider in ("anthropic", "auto"):
        if HAS_ANTHROPIC:
            print(f"  Using Anthropic Claude...")
            try:
                client = AnthropicFallbackClient()
                client_name = f"Anthropic ({client.model})"
                print(f"  Anthropic connected")
            except Exception as e2:
                print(f"  Anthropic failed: {e2}")
        else:
            print("  [WARNING] anthropic package not installed. pip install anthropic")

    if not client:
        print("[ERROR] No working LLM client. Top up DeepSeek or pip install anthropic.")
        sys.exit(1)

    print(f"Using: {client_name}")

    results = []

    def save_results():
        """Save results after every post so nothing is lost on crash."""
        with open(REVIEW_FILE, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

    for i, (slug, gsc_info) in enumerate(qualifying_sorted, 1):
        post = posts[slug]
        print(f"\n[{i}/{len(qualifying_sorted)}] {slug} ({gsc_info['impressions']} imp, {len(gsc_info['queries'])} queries)")

        try:
            result = analyze_post(
                client=client,
                post_content=post["content"],
                post_slug=slug,
                queries=gsc_info["queries"],
                all_slugs_with_categories=slug_to_cat,
            )

            result = validate_result(result, slug, post["content"])
            if result.get("_validation_warnings"):
                for w in result["_validation_warnings"]:
                    safe_print(f"  [WARN] {w}")

            result["_gsc_impressions"] = gsc_info["impressions"]
            result["_gsc_clicks"] = gsc_info["clicks"]
            result["_gsc_avg_position"] = gsc_info["avg_position"]
            result["_gsc_queries_count"] = len(gsc_info["queries"])
            results.append(result)
            save_results()

            n_changes = len(result.get("content_changes", []))
            n_links = len(result.get("internal_links", []))
            has_meta = bool(result.get("meta_changes", {}).get("metaTitle") or result.get("meta_changes", {}).get("metaDescription"))
            no_change = result.get("no_changes_needed", False)

            if no_change:
                print(f"  -> No changes needed")
            else:
                print(f"  -> {n_changes} content, {n_links} links, meta: {'yes' if has_meta else 'no'}")

        except Exception as e:
            err_msg = repr(e).encode("ascii", errors="replace").decode("ascii")
            print(f"  [ERROR] {err_msg}")
            results.append({"post_slug": slug, "error": err_msg})
            save_results()

    save_results()

    print(f"\n{'='*60}")
    print(f"COMPLETE: {len(results)} posts analyzed")
    print(f"Review file: {REVIEW_FILE}")
    print(f"{'='*60}")

    posts_with_changes = [r for r in results if not r.get("no_changes_needed") and not r.get("error")]
    posts_no_changes = [r for r in results if r.get("no_changes_needed")]
    posts_errors = [r for r in results if r.get("error")]

    print(f"\n  Posts with proposed changes: {len(posts_with_changes)}")
    print(f"  Posts needing no changes:    {len(posts_no_changes)}")
    print(f"  Errors:                      {len(posts_errors)}")

    if posts_with_changes:
        print(f"\nPosts with proposed changes:")
        for r in posts_with_changes:
            n_changes = len(r.get("content_changes", []))
            print(f"  - {r['post_slug']}: {n_changes} content changes, {len(r.get('internal_links', []))} links")

    print(f"\nNext step: Review {REVIEW_FILE}, then run with --apply to apply changes.")


if __name__ == "__main__":
    main()
