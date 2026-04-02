#!/usr/bin/env python3
"""
Update pillar page links in blog posts to use new nested URLs.
Changes from /guides/[topic] to /blog/[category-slug]
"""

import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Solicitors" / "web" / "content" / "blog"

LINK_MAPPING = {
    "/guides/sra-compliance": "/blog/sra-compliance-trust-accounting",
    "/guides/partnership-tax": "/blog/partnership-llp-accounting",
    "/guides/sole-practitioner-tax": "/blog/sole-practitioner-tax",
    "/guides/practice-succession": "/blog/practice-succession-sale",
    "/guides/practice-finance": "/blog/practice-finance-cash-flow",
    "/guides/vat-compliance": "/blog/vat-compliance",
}

def update_pillar_links(file_path: Path) -> bool:
    """Update pillar page links to new nested URLs."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    updated = content
    changed = False
    
    for old_url, new_url in LINK_MAPPING.items():
        if old_url in updated:
            updated = updated.replace(old_url, new_url)
            changed = True
    
    if changed:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"[+] Updated links in {file_path.name}")
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
        if update_pillar_links(file_path):
            updated_count += 1
    
    print(f"\n[=] Updated pillar links in {updated_count} blog posts")

if __name__ == "__main__":
    main()
