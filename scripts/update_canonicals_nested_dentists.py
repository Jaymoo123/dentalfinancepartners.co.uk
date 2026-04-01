#!/usr/bin/env python3
"""
Update canonical URLs for Dentists blog posts to nested structure.
Changes from /blog/[slug] to /blog/[category-slug]/[slug]
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Dentists" / "web" / "content" / "blog"
BASE_URL = "https://www.dentalfinancepartners.co.uk"

def slugify_category(category: str) -> str:
    """Convert category name to URL-friendly slug."""
    return (
        category.lower()
        .replace("&", "")
        .replace(" ", "-")
        .replace("--", "-")
        .strip("-")
    )

def update_canonical(file_path: Path) -> bool:
    """Update canonical URL in a blog post to nested structure."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    slug_match = re.search(r'^slug:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
    category_match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
    
    if not slug_match or not category_match:
        print(f"[!] Missing slug or category in {file_path.name}")
        return False
    
    slug = slug_match.group(1).strip()
    category = category_match.group(1).strip()
    category_slug = slugify_category(category)
    
    new_canonical = f"{BASE_URL}/blog/{category_slug}/{slug}"
    
    updated = re.sub(
        r'^canonical:\s*["\']?[^"\'\n]*["\']?$',
        f'canonical: "{new_canonical}"',
        content,
        flags=re.MULTILINE
    )
    
    if updated != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"[+] {file_path.name} -> /blog/{category_slug}/{slug}")
        return True
    
    return False

def main():
    if not BLOG_DIR.exists():
        print(f"[X] Blog directory not found: {BLOG_DIR}")
        return
    
    md_files = list(BLOG_DIR.glob("*.md"))
    print(f"Found {len(md_files)} blog posts\n")
    
    updated_count = 0
    for file_path in md_files:
        if update_canonical(file_path):
            updated_count += 1
    
    print(f"\n[=] Updated {updated_count} blog posts with nested canonical URLs")

if __name__ == "__main__":
    main()
