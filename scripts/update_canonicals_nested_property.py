#!/usr/bin/env python3
"""
Update canonical URLs in Property blog post frontmatter to nested structure.
From: https://accountsforproperty.co.uk/blog/[slug]
To: https://accountsforproperty.co.uk/blog/[category-slug]/[slug]
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Property" / "web" / "content" / "blog"
BASE_URL = "https://accountsforproperty.co.uk"

def slugify_category(category: str) -> str:
    """Convert category name to URL-safe slug."""
    slug = category.lower()
    slug = re.sub(r'[()]', '', slug)
    slug = slug.replace('&', 'and')
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def update_canonical_in_file(filepath: Path) -> bool:
    """Update canonical URL in a single markdown file."""
    try:
        content = filepath.read_text(encoding='utf-8')
        
        frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if not frontmatter_match:
            print(f"[!] No frontmatter found in {filepath.name}")
            return False
        
        frontmatter = frontmatter_match.group(1)
        
        category_match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', frontmatter, re.MULTILINE)
        slug_match = re.search(r'^slug:\s*["\']?([^"\'\n]+)["\']?', frontmatter, re.MULTILINE)
        
        if not category_match or not slug_match:
            print(f"[!] Missing category or slug in {filepath.name}")
            return False
        
        category = category_match.group(1).strip()
        slug = slug_match.group(1).strip()
        category_slug = slugify_category(category)
        
        new_canonical = f"{BASE_URL}/blog/{category_slug}/{slug}"
        
        canonical_pattern = r'^canonical:\s*["\']?https?://[^"\'\n]+["\']?'
        if re.search(canonical_pattern, frontmatter, re.MULTILINE):
            updated_frontmatter = re.sub(
                canonical_pattern,
                f'canonical: "{new_canonical}"',
                frontmatter,
                flags=re.MULTILINE
            )
        else:
            lines = frontmatter.split('\n')
            for i, line in enumerate(lines):
                if line.startswith('slug:'):
                    lines.insert(i + 1, f'canonical: "{new_canonical}"')
                    break
            updated_frontmatter = '\n'.join(lines)
        
        updated_content = content.replace(frontmatter, updated_frontmatter, 1)
        
        if updated_content != content:
            filepath.write_text(updated_content, encoding='utf-8')
            print(f"[+] Updated: {filepath.name} -> /blog/{category_slug}/{slug}")
            return True
        else:
            print(f"[=] No change: {filepath.name}")
            return False
            
    except Exception as e:
        print(f"[X] Error processing {filepath.name}: {e}")
        return False

def main():
    if not BLOG_DIR.exists():
        print(f"[X] Blog directory not found: {BLOG_DIR}")
        return
    
    md_files = sorted(BLOG_DIR.glob("*.md"))
    print(f"Found {len(md_files)} markdown files\n")
    
    updated = 0
    for filepath in md_files:
        if update_canonical_in_file(filepath):
            updated += 1
    
    print(f"\n{'='*60}")
    print(f"Total files processed: {len(md_files)}")
    print(f"Files updated: {updated}")
    print(f"Files unchanged: {len(md_files) - updated}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
