"""
Fix metaTitle (>60 chars) and metaDescription (>155 chars) overflows
using DeepSeek for individual reasoning on each post.

Also fixes posts with missing FAQs.

Usage:
    python scripts/fix_meta_overflows.py
    python scripts/fix_meta_overflows.py --dry-run
"""
import json
import os
import re
import sys
import time
import yaml
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = REPO_ROOT / "Property" / "web" / "content" / "blog"

sys.path.insert(0, str(REPO_ROOT / "agents" / "utils"))
sys.path.insert(0, str(REPO_ROOT))

from dotenv import load_dotenv
load_dotenv(REPO_ROOT / ".env")

from deepseek_client import DeepSeekClient

SYSTEM_PROMPT = """You are a UK property tax SEO specialist editing metadata for a property accountancy website called Property Tax Partners.

Your ONLY job is to shorten text that exceeds character limits while preserving SEO value.

RULES YOU MUST FOLLOW:

1. CHARACTER COUNTING: Count every single character including spaces, colons, pipes, and punctuation. Your output MUST be within the stated limit. If you are unsure, make it shorter rather than longer.

2. KEYWORD PRESERVATION: The primary keyword or its close variant MUST appear in your output. Never drop the main search term.

3. UK ENGLISH: Use British spelling throughout (e.g. "specialise" not "specialize", "organisation" not "organization").

4. NO FILLER WORDS: Do not add words like "discover", "explore", "unlock", "ultimate", "comprehensive", "everything you need". These waste characters and add no SEO value.

5. NO CLICKBAIT: Do not add exclamation marks, questions that weren't there before, or sensationalist language.

6. BRAND NAME: Do not add the site name or brand to the metaTitle. It is appended automatically by the CMS.

7. FACTUAL ACCURACY: Do not change any tax rates, thresholds, dates, or legal terms. If the original says "5% surcharge", your output must say "5% surcharge".

8. LOCATION PAGES: For city-specific posts, the city name MUST remain in the output. It is the primary keyword.

9. OUTPUT FORMAT: Return ONLY valid JSON. No markdown, no code fences, no explanation, no commentary. Just the raw JSON object."""


def get_problematic_posts():
    """Scan all posts and return those with meta overflows or missing FAQs."""
    problems = []
    for fpath in sorted(BLOG_DIR.glob("*.md")):
        raw = fpath.read_text(encoding="utf-8")
        parts = raw.split("---", 2)
        if len(parts) < 3:
            continue
        try:
            fm = yaml.safe_load(parts[1])
        except Exception:
            continue

        mt = fm.get("metaTitle", "") or ""
        md = fm.get("metaDescription", "") or ""
        faqs = fm.get("faqs", []) or []
        title = fm.get("title", "") or ""
        category = fm.get("category", "") or ""
        slug = fm.get("slug", "") or ""
        h1 = fm.get("h1", "") or ""
        pk = fm.get("primaryKeyword", "") or ""

        issues = []
        if len(mt) > 60:
            issues.append("metaTitle_overflow")
        if len(md) > 155:
            issues.append("metaDescription_overflow")
        if not faqs or len(faqs) < 1:
            issues.append("missing_faqs")

        if issues:
            body_preview = parts[2][:500]
            h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", body_preview, re.DOTALL)
            problems.append({
                "file": fpath.name,
                "slug": slug,
                "title": title,
                "h1": h1,
                "category": category,
                "metaTitle": mt,
                "metaTitle_len": len(mt),
                "metaDescription": md,
                "metaDescription_len": len(md),
                "has_faqs": bool(faqs),
                "faq_count": len(faqs) if faqs else 0,
                "h2_topics": [h.strip() for h in h2s[:5]],
                "issues": issues,
            })
    return problems


def build_meta_fix_prompt(post):
    """Build the DeepSeek prompt for fixing meta overflows on a single post."""
    fixes_needed = []
    if "metaTitle_overflow" in post["issues"]:
        fixes_needed.append(
            f'- metaTitle is {post["metaTitle_len"]} characters. It MUST be 60 characters or fewer. '
            f'Current value: "{post["metaTitle"]}"'
        )
    if "metaDescription_overflow" in post["issues"]:
        fixes_needed.append(
            f'- metaDescription is {post["metaDescription_len"]} characters. It MUST be 155 characters or fewer. '
            f'Current value: "{post["metaDescription"]}"'
        )

    prompt = f"""Fix the metadata for this blog post. Return a JSON object with the corrected fields ONLY.

POST CONTEXT:
- Title: {post["title"]}
- H1: {post["h1"]}
- Category: {post["category"]}
- Slug: {post["slug"]}
- Section topics: {", ".join(post["h2_topics"]) if post["h2_topics"] else "N/A"}

WHAT NEEDS FIXING:
{chr(10).join(fixes_needed)}

CONSTRAINTS:
- metaTitle hard limit: 60 characters maximum (count every character including spaces and punctuation)
- metaDescription hard limit: 155 characters maximum (count every character including spaces and punctuation)
- Preserve the core search keyword from the original
- Do not invent information not present in the original
- Do not add the brand name
- Aim to use as much of the character budget as possible (50-60 for title, 140-155 for description) while staying strictly under the limit

Return a JSON object with ONLY the fields that needed fixing. If only metaTitle needed fixing, return only metaTitle. If both needed fixing, return both. Nothing else.

Format: {{"metaTitle": "...", "metaDescription": "..."}}"""

    return prompt


def build_faq_prompt(post):
    """Build the DeepSeek prompt for generating FAQs for a post missing them."""
    prompt = f"""Generate 4 FAQ entries for this blog post. Return a JSON array.

POST CONTEXT:
- Title: {post["title"]}
- H1: {post["h1"]}
- Category: {post["category"]}
- Section topics: {", ".join(post["h2_topics"]) if post["h2_topics"] else "N/A"}

CONSTRAINTS:
- Each FAQ must have "question" and "answer" fields
- Questions must be ones a UK landlord would actually search for on Google
- Answers must be 2-4 sentences, factually accurate for UK tax law
- Do not reference specific tax rates or thresholds unless you are certain they are current for 2026/27
- Use British English spelling
- Do not use filler phrases

Return a JSON array of 4 objects, nothing else.

Format: [{{"question": "...", "answer": "..."}}, ...]"""

    return prompt


def apply_meta_fixes(fpath, fixes):
    """Apply metaTitle and/or metaDescription fixes to a markdown file."""
    raw = fpath.read_text(encoding="utf-8")
    
    for field, new_value in fixes.items():
        if field == "metaTitle":
            raw = re.sub(
                r'^metaTitle:\s*".*?"',
                f'metaTitle: "{new_value}"',
                raw,
                count=1,
                flags=re.MULTILINE,
            )
        elif field == "metaDescription":
            raw = re.sub(
                r'^metaDescription:\s*".*?"',
                f'metaDescription: "{new_value}"',
                raw,
                count=1,
                flags=re.MULTILINE,
            )
    
    fpath.write_text(raw, encoding="utf-8")


def apply_faq_fix(fpath, faqs):
    """Add FAQs to a post that has none."""
    raw = fpath.read_text(encoding="utf-8")
    
    faq_yaml_lines = ["faqs:"]
    for faq in faqs:
        q = faq["question"].replace('"', '\\"')
        a = faq["answer"].replace('"', '\\"')
        faq_yaml_lines.append(f'  - question: "{q}"')
        faq_yaml_lines.append(f'    answer: "{a}"')
    faq_block = "\n".join(faq_yaml_lines)
    
    raw = re.sub(
        r"^faqs:\s*\[\]",
        faq_block,
        raw,
        count=1,
        flags=re.MULTILINE,
    )
    if "faqs:" not in raw.split("---", 2)[1]:
        raw = raw.replace("\n---\n", f"\n{faq_block}\n---\n", 1)
    
    fpath.write_text(raw, encoding="utf-8")


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    client = DeepSeekClient(os.getenv("DEEPSEEK_API_KEY"))
    print("Testing DeepSeek connection...")
    if not client.test_connection():
        print("FAILED: DeepSeek API not reachable")
        sys.exit(1)
    print("[OK] DeepSeek connected\n")

    problems = get_problematic_posts()
    meta_problems = [p for p in problems if "metaTitle_overflow" in p["issues"] or "metaDescription_overflow" in p["issues"]]
    faq_problems = [p for p in problems if "missing_faqs" in p["issues"]]

    print(f"Posts with meta overflows: {len(meta_problems)}")
    print(f"Posts missing FAQs: {len(faq_problems)}")
    print(f"Total fixes needed: {len(meta_problems) + len(faq_problems)}\n")

    fixed = 0
    failed = 0
    still_over = 0

    # Fix meta overflows in batches of 5 to reduce API calls
    BATCH_SIZE = 5
    for batch_start in range(0, len(meta_problems), BATCH_SIZE):
        batch = meta_problems[batch_start:batch_start + BATCH_SIZE]
        
        for post in batch:
            print(f"[{fixed + failed + 1}/{len(meta_problems)}] {post['slug']}")
            
            prompt = build_meta_fix_prompt(post)
            
            try:
                response = client.generate_structured(
                    prompt=prompt,
                    system=SYSTEM_PROMPT,
                    temperature=0.2,
                    max_tokens=500,
                    response_format={"type": "json_object"},
                )

                if isinstance(response, str):
                    response = response.strip()
                    if response.startswith("```"):
                        response = re.sub(r"^```\w*\n?", "", response)
                        response = re.sub(r"\n?```$", "", response)
                    response = json.loads(response)

                valid_fixes = {}
                if "metaTitle" in response:
                    new_mt = response["metaTitle"]
                    if len(new_mt) <= 60:
                        valid_fixes["metaTitle"] = new_mt
                        print(f"  metaTitle: {post['metaTitle_len']} -> {len(new_mt)} chars")
                    else:
                        print(f"  metaTitle STILL OVER: {len(new_mt)} chars -> {new_mt}")
                        still_over += 1

                if "metaDescription" in response:
                    new_md = response["metaDescription"]
                    if len(new_md) <= 155:
                        valid_fixes["metaDescription"] = new_md
                        print(f"  metaDesc:  {post['metaDescription_len']} -> {len(new_md)} chars")
                    else:
                        print(f"  metaDesc STILL OVER: {len(new_md)} chars")
                        still_over += 1

                if valid_fixes and not args.dry_run:
                    fpath = BLOG_DIR / post["file"]
                    apply_meta_fixes(fpath, valid_fixes)
                    print(f"  [SAVED]")
                elif valid_fixes:
                    print(f"  [DRY-RUN] would save")

                fixed += 1

            except Exception as e:
                print(f"  [ERROR] {e}")
                failed += 1

            time.sleep(0.5)
        
        if batch_start + BATCH_SIZE < len(meta_problems):
            time.sleep(1)

    # Fix missing FAQs
    for post in faq_problems:
        print(f"\n[FAQ] {post['slug']}")
        prompt = build_faq_prompt(post)

        try:
            response = client.generate_structured(
                prompt=prompt,
                system=SYSTEM_PROMPT,
                temperature=0.3,
                max_tokens=1000,
                response_format={"type": "json_object"},
            )

            if isinstance(response, str):
                response = response.strip()
                if response.startswith("```"):
                    response = re.sub(r"^```\w*\n?", "", response)
                    response = re.sub(r"\n?```$", "", response)
                response = json.loads(response)

            if isinstance(response, dict) and "faqs" in response:
                response = response["faqs"]

            if isinstance(response, list) and len(response) >= 1:
                print(f"  Generated {len(response)} FAQs")
                for faq in response[:4]:
                    print(f"    Q: {faq['question'][:70]}...")
                if not args.dry_run:
                    fpath = BLOG_DIR / post["file"]
                    apply_faq_fix(fpath, response[:4])
                    print(f"  [SAVED]")
                else:
                    print(f"  [DRY-RUN] would save")
                fixed += 1
            else:
                print(f"  [ERROR] Unexpected response format: {type(response)}")
                failed += 1

        except Exception as e:
            print(f"  [ERROR] {e}")
            failed += 1

    print(f"\n{'=' * 60}")
    print(f"COMPLETE: {fixed} fixed, {failed} failed, {still_over} still over limit")
    if still_over > 0:
        print(f"  Re-run the script to fix the {still_over} that are still over limit")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
