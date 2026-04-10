"""
Batch blog post generator for the Property site.

Wraps generate_blog_supabase.py to produce multiple posts in one run.
Supports filtering by category/stream, dry-run mode, incremental save,
quality validation, and automatic middleware slug updates.

Usage:
    python scripts/batch_generate_posts.py --count 5
    python scripts/batch_generate_posts.py --count 10 --category "Capital Gains Tax"
    python scripts/batch_generate_posts.py --count 3 --stream expense_spoke
    python scripts/batch_generate_posts.py --count 1 --dry-run
    python scripts/batch_generate_posts.py --list-queue

Requires ANTHROPIC_API_KEY in environment or root .env file.
"""

import argparse
import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PROPERTY_PIPELINE = REPO_ROOT / "Property" / "pipeline"
MIDDLEWARE_PATH = REPO_ROOT / "Property" / "web" / "src" / "middleware.ts"
BLOG_DIR = REPO_ROOT / "Property" / "web" / "content" / "blog"
MANIFEST_PATH = REPO_ROOT / "Admin" / "batch_generation_log.json"

sys.path.insert(0, str(PROPERTY_PIPELINE))
sys.path.insert(0, str(REPO_ROOT))

from dotenv import load_dotenv
load_dotenv(REPO_ROOT / ".env")

from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY


def slugify_category(category: str) -> str:
    """Property site: & → and, strip special chars, lowercase, hyphenate."""
    s = category.lower().replace("&", "and").replace("(", "").replace(")", "")
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    return re.sub(r"\s+", "-", s).strip("-")


def fetch_topics(count: int, category: str = None, stream: str = None):
    """Fetch unused topics from Supabase with optional filters."""
    import httpx

    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    params = {
        "used": "eq.false",
        "order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",
        "limit": str(count),
    }
    if category:
        params["category"] = f"eq.{category}"
    if stream == "expense_spoke":
        params["content_tier"] = "eq.cluster"
        params["keyword_source"] = "eq.content_matrix_2026_04"

    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()


def list_queue():
    """Show the current topic queue breakdown."""
    import httpx

    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    params = {"used": "eq.false", "select": "category,publish_priority,topic", "order": "category.asc"}
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    topics = response.json()

    cats = {}
    for t in topics:
        cat = t["category"]
        cats.setdefault(cat, []).append(t)

    print(f"\n{'Category':<45} {'Unused':>8} {'Top Priority':>14}")
    print("-" * 70)
    total = 0
    for cat in sorted(cats.keys()):
        items = cats[cat]
        top_pri = max(t.get("publish_priority") or 0 for t in items)
        print(f"{cat:<45} {len(items):>8} {top_pri:>14}")
        total += len(items)
    print("-" * 70)
    print(f"{'TOTAL':<45} {total:>8}")


def generate_single_post(topic_data: dict, dry_run: bool = False) -> dict:
    """Generate a single post. Returns result dict with slug, status, errors."""
    from config_supabase import (
        ANTHROPIC_API_KEY, BLOG_SYSTEM_PROMPT, POST_CATEGORIES,
        INTERNAL_LINK_SLUGS, OUTPUT_MD_DIR, SITE_BASE_URL, AUTHOR_NAME,
    )
    from generate_blog_supabase import (
        generate_content, parse_llm_output, export_to_markdown,
        mark_topic_used, validate_post, slugify_category as gen_slugify,
    )

    topic_id = topic_data["id"]
    topic_title = topic_data["topic"]

    result = {
        "topic_id": topic_id,
        "topic": topic_title,
        "category": topic_data["category"],
        "slug": None,
        "status": "pending",
        "errors": [],
        "started_at": datetime.now().isoformat(),
    }

    if dry_run:
        print(f"  [DRY-RUN] Would generate: {topic_title}")
        print(f"            Category: {topic_data['category']}")
        print(f"            Keyword: {topic_data.get('primary_keyword', 'N/A')}")
        result["status"] = "dry_run"
        return result

    try:
        raw_content = generate_content(topic_data)
        fields = parse_llm_output(raw_content)

        slug = fields.get("slug", "untitled")
        category = fields.get("category", topic_data["category"])
        cat_slug = gen_slugify(category)
        canonical = f"{SITE_BASE_URL}/blog/{cat_slug}/{slug}"

        issues = validate_post(fields, slug, canonical)
        if issues:
            result["errors"] = issues

        critical = [i for i in issues if "Missing" in i and ("slug" in i or "title" in i)]
        if critical:
            result["status"] = "failed"
            return result

        export_slug = export_to_markdown(fields)
        mark_topic_used(topic_id, export_slug)

        result["slug"] = export_slug
        result["category_slug"] = cat_slug
        result["status"] = "success"
        result["completed_at"] = datetime.now().isoformat()

    except Exception as e:
        result["status"] = "error"
        result["errors"].append(str(e))
        print(f"  [ERROR] {topic_title}: {e}")

    return result


def update_middleware_slugs(results: list[dict]):
    """Add newly generated slugs to middleware SLUG_TO_CATEGORY_MAP."""
    new_entries = []
    for r in results:
        if r["status"] == "success" and r.get("slug") and r.get("category_slug"):
            new_entries.append((r["slug"], r["category_slug"]))

    if not new_entries:
        return

    content = MIDDLEWARE_PATH.read_text(encoding="utf-8")

    closing_marker = "};\n\nconst DUPLICATE_REDIRECTS"
    if closing_marker not in content:
        closing_marker = "};\n\nconst LOCATION_TO_BLOG"
        if closing_marker not in content:
            print("[WARN] Could not find middleware insertion point. Add slugs manually.")
            return

    insert_lines = []
    for slug, cat_slug in new_entries:
        entry = f'  "{slug}": "{cat_slug}",'
        if entry not in content and f'"{slug}"' not in content:
            insert_lines.append(entry)

    if not insert_lines:
        print("[OK] All slugs already in middleware.")
        return

    split_pos = content.index(closing_marker)
    new_content = content[:split_pos] + "\n".join(insert_lines) + "\n" + content[split_pos:]
    MIDDLEWARE_PATH.write_text(new_content, encoding="utf-8")
    print(f"[OK] Added {len(insert_lines)} slugs to middleware SLUG_TO_CATEGORY_MAP.")


def save_manifest_incremental(result: dict, run_id: str):
    """Save a single result to the manifest immediately after generation."""
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)

    log = []
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
            log = json.load(f)

    current_run = None
    for run in log:
        if run.get("run_id") == run_id:
            current_run = run
            break

    if current_run is None:
        current_run = {
            "run_id": run_id,
            "run_at": datetime.now().isoformat(),
            "results": [],
        }
        log.append(current_run)

    current_run["results"].append(result)
    current_run["count_success"] = sum(1 for r in current_run["results"] if r["status"] == "success")
    current_run["count_failed"] = sum(1 for r in current_run["results"] if r["status"] in ("failed", "error"))
    current_run["count_total"] = len(current_run["results"])

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser(description="Batch generate blog posts for Property site")
    parser.add_argument("--count", type=int, default=1, help="Number of posts to generate")
    parser.add_argument("--category", type=str, default=None, help="Filter by category name")
    parser.add_argument("--stream", type=str, default=None, choices=["substantive", "expense_spoke"],
                        help="Filter by content stream")
    parser.add_argument("--dry-run", action="store_true", help="Preview what would be generated without calling LLM")
    parser.add_argument("--list-queue", action="store_true", help="Show current topic queue breakdown")
    parser.add_argument("--skip-middleware", action="store_true", help="Skip middleware slug updates")
    args = parser.parse_args()

    if args.list_queue:
        list_queue()
        return

    topics = fetch_topics(args.count, args.category, args.stream)
    if not topics:
        print("No unused topics found matching filters.")
        return

    print(f"\n{'=' * 60}")
    print(f"Batch Blog Generation — {len(topics)} topic(s)")
    if args.category:
        print(f"  Category filter: {args.category}")
    if args.stream:
        print(f"  Stream filter: {args.stream}")
    if args.dry_run:
        print("  MODE: DRY-RUN (no LLM calls, no file writes)")
    print(f"{'=' * 60}\n")

    run_id = datetime.now().strftime("%Y%m%d_%H%M%S")
    results = []
    for i, topic in enumerate(topics, 1):
        print(f"\n[{i}/{len(topics)}] {topic['topic']}")
        result = generate_single_post(topic, dry_run=args.dry_run)
        results.append(result)

        if result["status"] == "success":
            print(f"  [OK] Generated: {result['slug']}.md")
        elif result["status"] == "dry_run":
            pass
        else:
            print(f"  [{result['status'].upper()}] {', '.join(result['errors'][:3])}")

        if not args.dry_run:
            save_manifest_incremental(result, run_id)
            if not args.skip_middleware and result["status"] == "success":
                update_middleware_slugs([result])

        if not args.dry_run and i < len(topics):
            time.sleep(2)

    # Summary
    success = sum(1 for r in results if r["status"] == "success")
    failed = sum(1 for r in results if r["status"] in ("failed", "error"))

    print(f"\n{'=' * 60}")
    print(f"BATCH COMPLETE: {success} success, {failed} failed, {len(topics) - success - failed} other")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
