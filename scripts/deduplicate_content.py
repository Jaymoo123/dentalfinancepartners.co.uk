"""
Blog Content Deduplication Pipeline — DeepSeek-powered consolidation

Reads each blog post, identifies duplicate/overlapping sections, sends to DeepSeek
for consolidation, validates the output, and applies changes.

Known failure modes: Admin/EDITORIAL_PIPELINE_LESSONS.md

Usage:
    python scripts/deduplicate_content.py --dry-run                  # Triage only (no API calls)
    python scripts/deduplicate_content.py --analyze                  # Run DeepSeek on qualifying posts
    python scripts/deduplicate_content.py --analyze --tier critical   # Only Critical tier
    python scripts/deduplicate_content.py --analyze --tier high       # Critical + High
    python scripts/deduplicate_content.py --analyze --limit 5         # First N posts only
    python scripts/deduplicate_content.py --validate-only            # Check proposals against current files
    python scripts/deduplicate_content.py --apply                    # Write accepted changes to .md files

Flags:
    --site property|dentists|medical|solicitors   Target site (default: property)
    --provider deepseek|anthropic|auto            LLM provider (default: auto)
"""

import sys
import os
import json
import re
import argparse
import io
import collections
from difflib import SequenceMatcher
from datetime import datetime

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from dotenv import load_dotenv
load_dotenv(os.path.join(project_root, ".env"))

SITE_DIRS = {
    "property": os.path.join(project_root, "Property", "web", "content", "blog"),
    "dentists": os.path.join(project_root, "Dentists", "web", "content", "blog"),
    "medical": os.path.join(project_root, "Medical", "web", "content", "blog"),
    "solicitors": os.path.join(project_root, "Solicitors", "web", "content", "blog"),
}

TRIAGE_FILE_TPL = os.path.join(project_root, "scripts", "dedup_triage_{site}.json")
REVIEW_FILE_TPL = os.path.join(project_root, "scripts", "dedup_review_{site}.json")

VALID_TAX_YEARS = {"2025/26", "2026/27"}
CURRENT_CGT_RESIDENTIAL = {"18", "24"}
PRICE_PATTERN = re.compile(
    r"\u00a3\d[\d,]*(?:\.\d{2})?\s*(?:/|per\s+)?(?:month|mo|monthly|pm|p\.m\.|year|annually)",
    re.IGNORECASE,
)


def safe_print(msg):
    print(msg.encode("ascii", errors="replace").decode("ascii"))


# ---------------------------------------------------------------------------
# Triage: score each post for duplication severity
# ---------------------------------------------------------------------------

def _get_body(content):
    parts = content.split("---", 2)
    return parts[2] if len(parts) >= 3 else ""


def _extract_headings(body):
    return [
        (m.group(1).lower(), re.sub(r"<[^>]+>", "", m.group(2)).strip())
        for m in re.finditer(r"<(h[23])(?:\s[^>]*)?>(.*?)</\1>", body, re.IGNORECASE | re.DOTALL)
    ]


def _get_sections(body):
    pattern = re.compile(r"<h2(?:\s[^>]*)?>(.*?)</h2>", re.IGNORECASE | re.DOTALL)
    matches = list(pattern.finditer(body))
    sections = []
    for i, m in enumerate(matches):
        heading = re.sub(r"<[^>]+>", "", m.group(1)).strip()
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        sections.append((heading, body[start:end]))
    return sections


TOPIC_KEYWORDS = {
    "Section 24": re.compile(r"section 24", re.IGNORECASE),
    "MTD": re.compile(r"making tax digital|MTD|quarterly\s+(?:digital\s+)?report", re.IGNORECASE),
    "Incorporation": re.compile(r"incorporat(?:ion|ing|e)|limited company|company structure", re.IGNORECASE),
    "CGT": re.compile(r"capital gains tax|CGT|property disposal", re.IGNORECASE),
}


def triage_post(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body = _get_body(content)
    if not body.strip():
        return None

    fname = os.path.basename(filepath)
    headings = _extract_headings(body)
    heading_texts = [h[1] for h in headings]
    h2_count = sum(1 for h in headings if h[0] == "h2")

    issues = []
    score = 0

    # Exact duplicate headings (weight: 10 each)
    counts = collections.Counter(heading_texts)
    exact_dupes = {h: c for h, c in counts.items() if c > 1}
    for h, c in exact_dupes.items():
        issues.append({"type": "DUPLICATE_HEADING", "detail": f'"{h}" x{c}'})
        score += 10 * (c - 1)

    # Near-duplicate headings (weight: 3 each)
    seen_pairs = set()
    for i, h1 in enumerate(heading_texts):
        for j, h2 in enumerate(heading_texts):
            if j <= i or h1 == h2:
                continue
            pair = tuple(sorted([h1, h2]))
            if pair in seen_pairs:
                continue
            if SequenceMatcher(None, h1.lower(), h2.lower()).ratio() >= 0.65:
                seen_pairs.add(pair)
                issues.append({"type": "SIMILAR_HEADING", "detail": f'"{h1}" ~ "{h2}"'})
                score += 3

    # Topic sprawl (weight: 5 per extra section beyond 2)
    sections = _get_sections(body)
    for topic_name, pattern in TOPIC_KEYWORDS.items():
        mentioning = [
            heading for heading, sec_body in sections
            if pattern.search(heading) or (pattern.search(sec_body) and len(sec_body) > 100)
        ]
        if len(mentioning) >= 3:
            issues.append({
                "type": "TOPIC_SPRAWL",
                "detail": f'"{topic_name}" in {len(mentioning)} sections',
                "sections": mentioning[:6],
            })
            score += 5 * (len(mentioning) - 2)

    # Excessive h2 count (weight: 2 per h2 over 10)
    if h2_count > 10:
        issues.append({"type": "EXCESSIVE_H2", "detail": f"{h2_count} h2 headings"})
        score += 2 * (h2_count - 10)

    # CGT rate inconsistency (weight: 8)
    cgt_rates = set()
    for m in re.finditer(r"(\d{1,2})%\s*(?:and|or|/)\s*(\d{1,2})%\s*(?:CGT|capital gains)", body, re.IGNORECASE):
        for g in m.groups():
            v = int(g)
            if 10 <= v <= 45:
                cgt_rates.add(v)
    for m in re.finditer(r"(?:CGT|capital gains tax)\s*(?:rate|rates)?\s*(?:of|at)?\s*(\d{1,2})%", body, re.IGNORECASE):
        v = int(m.group(1))
        if 10 <= v <= 45:
            cgt_rates.add(v)
    if 28 in cgt_rates:
        issues.append({"type": "STALE_CGT_RATE", "detail": f"References 28% CGT (old rate). Found rates: {sorted(cgt_rates)}"})
        score += 8

    # Stale corp tax (weight: 4)
    corp_stale = list(re.finditer(r"(?:corporation tax\s*(?:rate|rates)?\s*(?:of|at|is)?\s*)19%", body, re.IGNORECASE))
    has_qualifying_19 = any(
        "small profits" in body[max(0, m.start() - 60):m.end() + 60].lower()
        or "25%" in body[m.end():m.end() + 80]
        for m in corp_stale
    )
    unqualified_19 = [m for m in corp_stale if "25%" not in body[m.end():m.end() + 80]]
    if unqualified_19:
        issues.append({"type": "STALE_CORP_TAX", "detail": f"{len(unqualified_19)} unqualified 19% corp tax references"})
        score += 4 * len(unqualified_19)

    # Determine tier
    if score >= 20:
        tier = "critical"
    elif score >= 10:
        tier = "high"
    elif score > 0:
        tier = "medium"
    else:
        tier = "clean"

    word_count = len(re.sub(r"<[^>]+>", " ", body).split())

    return {
        "file": fname,
        "score": score,
        "tier": tier,
        "h2_count": h2_count,
        "word_count": word_count,
        "issues": issues,
    }


def run_triage(site, blog_dir):
    files = sorted(f for f in os.listdir(blog_dir) if f.endswith(".md"))
    results = []
    for fname in files:
        fpath = os.path.join(blog_dir, fname)
        result = triage_post(fpath)
        if result:
            results.append(result)

    results.sort(key=lambda r: r["score"], reverse=True)

    triage_path = TRIAGE_FILE_TPL.format(site=site)
    with open(triage_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    tier_counts = collections.Counter(r["tier"] for r in results)
    print(f"\n{'='*70}")
    print(f"  TRIAGE: {site.upper()} ({len(results)} posts)")
    print(f"{'='*70}")
    print(f"  Critical (score >= 20): {tier_counts.get('critical', 0)}")
    print(f"  High     (score 10-19): {tier_counts.get('high', 0)}")
    print(f"  Medium   (score 1-9):   {tier_counts.get('medium', 0)}")
    print(f"  Clean    (score 0):     {tier_counts.get('clean', 0)}")
    print()

    for tier_name in ("critical", "high"):
        tier_posts = [r for r in results if r["tier"] == tier_name]
        if not tier_posts:
            continue
        print(f"  --- {tier_name.upper()} ({len(tier_posts)} posts) ---")
        for r in tier_posts[:15]:
            issue_summary = ", ".join(
                f"{i['type']}" for i in r["issues"][:3]
            )
            print(f"    score={r['score']:>3}  h2={r['h2_count']:>2}  {r['file']}")
            print(f"           {issue_summary}")
        if len(tier_posts) > 15:
            print(f"    ... and {len(tier_posts) - 15} more")
        print()

    print(f"  Triage saved: {triage_path}")
    return results


# ---------------------------------------------------------------------------
# DeepSeek consolidation
# ---------------------------------------------------------------------------

DEDUP_SYSTEM_PROMPT = """You are a senior editor for a UK property tax accountancy website. Your ONLY job is to consolidate and deduplicate a blog post that has redundant, overlapping sections.

WHAT YOU DO:
- Merge sections that cover the same topic into ONE authoritative section
- Remove repeated explanations of the same concept
- Fix factual inconsistencies (use CURRENT rates: CGT residential 18%/24%, corporation tax 19% small profits / 25% main rate)
- Preserve ALL unique information -- never delete content that isn't duplicated elsewhere in the post
- Tighten the structure to a clean heading hierarchy

WHAT YOU DO NOT DO:
- Add new content, examples, or sections that aren't in the original
- Change the front matter (title, slug, meta, FAQs) -- you only touch the HTML body
- Change the overall topic or angle of the post
- Remove FAQs, related reading sections, or internal links
- Change anchor text or href values in existing <a> tags

RULES:
1. Output raw HTML only (<p>, <h2>, <h3>, <ul>, <li>, <strong>, <a href="...">). No markdown.
2. Target 6-10 h2 headings for a standard post. If the original has 20+ h2s, consolidate aggressively.
3. Every h2 section should cover ONE distinct topic. No topic should appear in more than one h2 section.
4. UK English spelling (specialise, optimise, organisation, recognised).
5. Current UK tax rates for 2026/27: CGT residential 18% (basic rate) / 24% (higher rate). Corporation tax 19% (profits up to 250k) / 25% (above 250k). Do NOT use old 28% CGT rate.
6. If the original post has specific worked examples with numbers, keep them but fix any rate errors.
7. CRITICAL: Preserve ALL existing <a href="..."> internal links. Copy every single anchor tag exactly as-is into the rewritten version. Do not drop any links.
8. Keep the "Related Reading" section at the end if the original has one.
9. The rewritten body must retain ALL unique factual content. When merging two overlapping sections, combine the best details from each into the surviving section."""


def build_dedup_prompt(body_html, fname, issues):
    issue_lines = "\n".join(f"- {i['type']}: {i['detail']}" for i in issues)

    return f"""== TASK ==
Consolidate this blog post by merging duplicate and overlapping sections. The audit found these specific issues:

{issue_lines}

== INSTRUCTIONS ==
1. Read the entire post carefully.
2. Identify sections that cover the same topic (even under different headings).
3. Merge them into ONE definitive section, keeping the best content from each.
4. Remove the redundant sections.
5. Fix any incorrect tax rates (CGT residential is 18%/24%, NOT 28%. Corp tax is 19% small profits / 25% main rate).
6. Return the COMPLETE rewritten HTML body.

== CURRENT BLOG POST BODY (file: {fname}) ==

{body_html}

== OUTPUT ==
Return ONLY the rewritten HTML body. No markdown fences, no explanation, no front matter. Just the HTML starting with the first <p> or <h2> tag."""


def init_client(provider):
    from agents.utils.deepseek_client import DeepSeekClient

    try:
        import anthropic
        has_anthropic = True
    except ImportError:
        has_anthropic = False

    client = None
    client_name = None

    if provider in ("deepseek", "auto"):
        try:
            print("Trying DeepSeek client...")
            ds = DeepSeekClient()
            ds.generate_structured(prompt="test", max_tokens=5, temperature=0)
            client = ds
            client_name = "DeepSeek"
            print("  DeepSeek connected")
        except Exception as e:
            print(f"  DeepSeek failed: {e}")

    if not client and provider in ("anthropic", "auto"):
        if has_anthropic:
            print("  Using Anthropic Claude...")
            try:
                from scripts.optimize_content_editorial import AnthropicFallbackClient
                client = AnthropicFallbackClient()
                client_name = f"Anthropic ({client.model})"
                print(f"  Anthropic connected")
            except Exception as e:
                print(f"  Anthropic failed: {e}")

    if not client:
        print("[ERROR] No working LLM client. Top up DeepSeek or set ANTHROPIC_API_KEY.")
        sys.exit(1)

    print(f"Using: {client_name}")
    return client, client_name


def analyze_post(client, body_html, fname, issues):
    prompt = build_dedup_prompt(body_html, fname, issues)

    result = client.generate_structured(
        prompt=prompt,
        system=DEDUP_SYSTEM_PROMPT,
        temperature=0.1,
        max_tokens=8000,
        response_format=None,
    )

    if isinstance(result, dict):
        result = json.dumps(result)

    text = result.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:html)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    return text.strip()


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_rewrite(original_body, rewritten_body, fname, triage_score=0):
    warnings = []
    errors = []

    orig_words = len(re.sub(r"<[^>]+>", " ", original_body).split())
    new_words = len(re.sub(r"<[^>]+>", " ", rewritten_body).split())

    # Score-dependent floor: heavily duplicated posts legitimately need more cutting
    if triage_score >= 100:
        floor_hard = 0.35
        floor_warn = 0.50
    elif triage_score >= 50:
        floor_hard = 0.45
        floor_warn = 0.60
    else:
        floor_hard = 0.55
        floor_warn = 0.70

    if orig_words > 0:
        ratio = new_words / orig_words
        if ratio < floor_hard:
            errors.append(f"Word count dropped to {ratio:.0%} ({new_words}/{orig_words}) -- below {floor_hard:.0%} floor for score {triage_score}")
        elif ratio < floor_warn:
            warnings.append(f"Word count at {ratio:.0%} ({new_words}/{orig_words}) -- below {floor_warn:.0%} threshold")

    orig_headings = _extract_headings(original_body)
    new_headings = _extract_headings(rewritten_body)
    orig_h2 = sum(1 for h in orig_headings if h[0] == "h2")
    new_h2 = sum(1 for h in new_headings if h[0] == "h2")

    if new_h2 == 0 and orig_h2 > 0:
        errors.append("Rewrite has zero h2 headings")

    # Check duplicate headings in the rewrite
    new_heading_texts = [h[1] for h in new_headings]
    new_counts = collections.Counter(new_heading_texts)
    new_dupes = {h: c for h, c in new_counts.items() if c > 1}
    if new_dupes:
        warnings.append(f"Rewrite still has duplicate headings: {dict(new_dupes)}")

    # Tax year check
    for m in re.finditer(r"20(\d\d)/(\d\d)", rewritten_body):
        year_str = m.group(0)
        if year_str not in VALID_TAX_YEARS:
            warnings.append(f"Suspicious tax year: {year_str}")

    # Stale CGT rate check
    if re.search(r"28%\s*(?:CGT|capital gains)", rewritten_body, re.IGNORECASE):
        warnings.append("Rewrite still contains 28% CGT rate reference")

    # Price fabrication check
    if PRICE_PATTERN.search(rewritten_body):
        warnings.append("Rewrite contains price claims -- verify manually")

    # Check internal links preserved
    orig_links = set(re.findall(r'href="(/[^"]+)"', original_body))
    new_links = set(re.findall(r'href="(/[^"]+)"', rewritten_body))
    lost_links = orig_links - new_links
    if lost_links:
        warnings.append(f"Lost {len(lost_links)} internal links: {list(lost_links)[:5]}")

    # Contains YAML or front matter markers
    if rewritten_body.strip().startswith("---") or "slug:" in rewritten_body[:200]:
        errors.append("Rewrite appears to contain YAML front matter")

    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings,
        "orig_words": orig_words,
        "new_words": new_words,
        "orig_h2": orig_h2,
        "new_h2": new_h2,
    }


# ---------------------------------------------------------------------------
# Apply
# ---------------------------------------------------------------------------

def apply_rewrite(filepath, rewritten_body):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    parts = content.split("---", 2)
    if len(parts) < 3:
        return False

    front_matter = parts[0] + "---" + parts[1] + "---"
    new_content = front_matter + "\n\n" + rewritten_body.strip() + "\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Blog content deduplication via DeepSeek")
    parser.add_argument("--dry-run", action="store_true", help="Triage only, no API calls")
    parser.add_argument("--analyze", action="store_true", help="Run DeepSeek consolidation")
    parser.add_argument("--validate-only", action="store_true", help="Check review file against current posts")
    parser.add_argument("--apply", action="store_true", help="Apply accepted rewrites to .md files")
    parser.add_argument("--site", default="property", choices=SITE_DIRS.keys(), help="Target site")
    parser.add_argument("--tier", default="high", choices=["critical", "high", "medium", "all"],
                        help="Minimum tier to process (default: high = critical + high)")
    parser.add_argument("--limit", type=int, default=0, help="Max posts to analyze (0 = all qualifying)")
    parser.add_argument("--provider", default="auto", choices=["deepseek", "anthropic", "auto"])
    args = parser.parse_args()

    site = args.site
    blog_dir = SITE_DIRS[site]
    triage_path = TRIAGE_FILE_TPL.format(site=site)
    review_path = REVIEW_FILE_TPL.format(site=site)

    if not os.path.isdir(blog_dir):
        print(f"[ERROR] Blog directory not found: {blog_dir}")
        sys.exit(1)

    # Always run triage first
    triage = run_triage(site, blog_dir)

    if args.dry_run:
        return

    # --- Validate-only mode ---
    if args.validate_only:
        if not os.path.exists(review_path):
            print(f"[ERROR] Review file not found: {review_path}")
            print("Run --analyze first.")
            sys.exit(1)

        with open(review_path, "r", encoding="utf-8") as f:
            reviews = json.load(f)

        print(f"\nValidating {len(reviews)} rewrites...\n")

        valid_count = 0
        warning_count = 0
        error_count = 0

        for review in reviews:
            fname = review["file"]
            filepath = os.path.join(blog_dir, fname)

            if review.get("error"):
                print(f"  [ERROR] {fname}: {review['error']}")
                error_count += 1
                continue

            if not os.path.exists(filepath):
                print(f"  [SKIP] {fname}: file not found")
                continue

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            original_body = _get_body(content)

            validation = validate_rewrite(original_body, review["rewritten_body"], fname, review.get("score", 0))
            review["_validation"] = validation

            status = "VALID" if validation["valid"] else "INVALID"
            word_info = f"{validation['new_words']}/{validation['orig_words']} words"
            h2_info = f"{validation['new_h2']}/{validation['orig_h2']} h2s"

            if not validation["valid"]:
                print(f"  [INVALID] {fname} ({word_info}, {h2_info})")
                for e in validation["errors"]:
                    print(f"    ERROR: {e}")
                error_count += 1
            elif validation["warnings"]:
                print(f"  [WARN]   {fname} ({word_info}, {h2_info})")
                for w in validation["warnings"]:
                    print(f"    WARN: {w}")
                warning_count += 1
            else:
                print(f"  [OK]     {fname} ({word_info}, {h2_info})")
                valid_count += 1

        # Save updated reviews with validation results
        with open(review_path, "w", encoding="utf-8") as f:
            json.dump(reviews, f, indent=2, ensure_ascii=False)

        print(f"\n{'='*60}")
        print(f"  Valid:    {valid_count}")
        print(f"  Warnings: {warning_count}")
        print(f"  Invalid:  {error_count}")
        print(f"{'='*60}")
        return

    # --- Apply mode ---
    if args.apply:
        if not os.path.exists(review_path):
            print(f"[ERROR] Review file not found: {review_path}")
            print("Run --analyze first, then --validate-only.")
            sys.exit(1)

        with open(review_path, "r", encoding="utf-8") as f:
            reviews = json.load(f)

        print(f"\nApplying {len(reviews)} rewrites...\n")

        applied = 0
        skipped = 0

        for review in reviews:
            fname = review["file"]
            filepath = os.path.join(blog_dir, fname)

            if review.get("error"):
                safe_print(f"  [SKIP] {fname}: has error")
                skipped += 1
                continue

            validation = review.get("_validation", {})
            if not validation.get("valid", False):
                safe_print(f"  [SKIP] {fname}: failed validation")
                skipped += 1
                continue

            if not os.path.exists(filepath):
                safe_print(f"  [SKIP] {fname}: file not found")
                skipped += 1
                continue

            rewritten = review.get("rewritten_body", "")
            if not rewritten.strip():
                safe_print(f"  [SKIP] {fname}: empty rewrite")
                skipped += 1
                continue

            if apply_rewrite(filepath, rewritten):
                safe_print(f"  [APPLIED] {fname}")
                applied += 1
            else:
                safe_print(f"  [FAIL] {fname}: could not split front matter")
                skipped += 1

        print(f"\n{'='*60}")
        print(f"  Applied: {applied}")
        print(f"  Skipped: {skipped}")
        print(f"{'='*60}")
        print(f"\nNext steps:")
        print(f"  1. python scripts/validate_blog_content.py")
        print(f"  2. python scripts/audit_blog_duplicates.py {site.capitalize()}")
        print(f"  3. cd {site.capitalize()}/web && npm run build")
        return

    # --- Analyze mode ---
    if not args.analyze:
        print("\nUse --analyze to run DeepSeek consolidation, or --dry-run for triage only.")
        return

    # Determine which tiers to include
    tier_order = ["critical", "high", "medium"]
    if args.tier == "all":
        include_tiers = set(tier_order)
    else:
        cutoff = tier_order.index(args.tier)
        include_tiers = set(tier_order[: cutoff + 1])

    qualifying = [r for r in triage if r["tier"] in include_tiers and r["score"] > 0]

    if args.limit > 0:
        qualifying = qualifying[: args.limit]

    if not qualifying:
        print("\nNo posts qualify for analysis at this tier.")
        return

    print(f"\n{'='*60}")
    print(f"  ANALYZING {len(qualifying)} posts (tiers: {', '.join(sorted(include_tiers))})")
    print(f"{'='*60}")

    client, client_name = init_client(args.provider)

    # Load existing results (for resume capability)
    results = []
    already_done = set()
    if os.path.exists(review_path):
        with open(review_path, "r", encoding="utf-8") as f:
            results = json.load(f)
        already_done = {r["file"] for r in results if not r.get("error")}
        if already_done:
            print(f"  Resuming: {len(already_done)} posts already done")

    def save_results():
        with open(review_path, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

    for i, post_info in enumerate(qualifying, 1):
        fname = post_info["file"]

        if fname in already_done:
            safe_print(f"[{i}/{len(qualifying)}] {fname} -- already done, skipping")
            continue

        filepath = os.path.join(blog_dir, fname)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        body = _get_body(content)
        if not body.strip():
            continue

        safe_print(f"\n[{i}/{len(qualifying)}] {fname} (score={post_info['score']}, h2={post_info['h2_count']}, {post_info['word_count']} words)")

        try:
            rewritten = analyze_post(client, body, fname, post_info["issues"])

            validation = validate_rewrite(body, rewritten, fname, post_info["score"])

            result = {
                "file": fname,
                "score": post_info["score"],
                "tier": post_info["tier"],
                "rewritten_body": rewritten,
                "_validation": validation,
                "_timestamp": datetime.now().isoformat(),
            }

            if not validation["valid"]:
                for e in validation["errors"]:
                    safe_print(f"  [ERROR] {e}")
                result["error"] = "; ".join(validation["errors"])

            for w in validation.get("warnings", []):
                safe_print(f"  [WARN] {w}")

            word_info = f"{validation['new_words']}/{validation['orig_words']} words ({validation['new_words']/max(1,validation['orig_words']):.0%})"
            h2_info = f"{validation['new_h2']}/{validation['orig_h2']} h2s"
            safe_print(f"  -> {word_info}, {h2_info}")

            results.append(result)
            save_results()

        except Exception as e:
            err_msg = repr(e).encode("ascii", errors="replace").decode("ascii")
            safe_print(f"  [ERROR] {err_msg}")
            results.append({"file": fname, "error": err_msg, "_timestamp": datetime.now().isoformat()})
            save_results()

    save_results()

    valid = [r for r in results if r.get("_validation", {}).get("valid") and not r.get("error")]
    invalid = [r for r in results if r.get("error")]
    warned = [r for r in results if r.get("_validation", {}).get("warnings") and not r.get("error")]

    print(f"\n{'='*60}")
    print(f"  COMPLETE: {len(results)} posts processed")
    print(f"  Valid:    {len(valid)}")
    print(f"  Warnings: {len(warned)}")
    print(f"  Invalid:  {len(invalid)}")
    print(f"  Review:   {review_path}")
    print(f"{'='*60}")
    print(f"\nNext: python scripts/deduplicate_content.py --validate-only --site {site}")
    print(f"Then: python scripts/deduplicate_content.py --apply --site {site}")


if __name__ == "__main__":
    main()
