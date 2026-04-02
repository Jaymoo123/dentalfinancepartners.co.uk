#!/usr/bin/env python3
"""
Generate SLUG_TO_CATEGORY_MAP for Dentists middleware.
"""

import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Dentists" / "web" / "content" / "blog"

def slugify_category(category: str) -> str:
    """Convert category name to URL-friendly slug."""
    return (
        category.lower()
        .replace("&", "")
        .replace(" ", "-")
        .replace("--", "-")
        .strip("-")
    )

def main():
    md_files = list(BLOG_DIR.glob("*.md"))
    slug_map = {}
    
    for file_path in md_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        slug_match = re.search(r'^slug:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
        category_match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
        
        if slug_match and category_match:
            slug = slug_match.group(1).strip()
            category = category_match.group(1).strip()
            category_slug = slugify_category(category)
            slug_map[slug] = category_slug
    
    print("const SLUG_TO_CATEGORY_MAP: Record<string, string> = {")
    for slug in sorted(slug_map.keys()):
        print(f'  "{slug}": "{slug_map[slug]}",')
    print("};")
    print(f"\n// Total: {len(slug_map)} mappings")

if __name__ == "__main__":
    main()
