#!/usr/bin/env python3
"""
Generate middleware.ts with SLUG_TO_CATEGORY_MAP for Property site.
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Property" / "web" / "content" / "blog"
OUTPUT_FILE = Path(__file__).parent.parent / "Property" / "web" / "src" / "middleware.ts"

def slugify_category(category: str) -> str:
    """Convert category name to URL-safe slug."""
    slug = category.lower()
    slug = re.sub(r'[()]', '', slug)
    slug = slug.replace('&', 'and')
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def extract_slug_and_category(filepath: Path) -> tuple[str, str] | None:
    """Extract slug and category from markdown frontmatter."""
    try:
        content = filepath.read_text(encoding='utf-8')
        
        frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if not frontmatter_match:
            return None
        
        frontmatter = frontmatter_match.group(1)
        
        category_match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', frontmatter, re.MULTILINE)
        slug_match = re.search(r'^slug:\s*["\']?([^"\'\n]+)["\']?', frontmatter, re.MULTILINE)
        
        if not category_match or not slug_match:
            return None
        
        category = category_match.group(1).strip()
        slug = slug_match.group(1).strip()
        category_slug = slugify_category(category)
        
        return (slug, category_slug)
            
    except Exception as e:
        print(f"Error processing {filepath.name}: {e}")
        return None

def main():
    if not BLOG_DIR.exists():
        print(f"Blog directory not found: {BLOG_DIR}")
        return
    
    md_files = sorted(BLOG_DIR.glob("*.md"))
    print(f"Found {len(md_files)} markdown files")
    
    slug_map = {}
    for filepath in md_files:
        result = extract_slug_and_category(filepath)
        if result:
            slug, category_slug = result
            slug_map[slug] = category_slug
    
    print(f"Generated {len(slug_map)} slug mappings\n")
    
    map_entries = []
    for slug in sorted(slug_map.keys()):
        category_slug = slug_map[slug]
        map_entries.append(f'  "{slug}": "{category_slug}",')
    
    middleware_content = f'''import {{ NextResponse }} from "next/server";
import type {{ NextRequest }} from "next/server";

const SLUG_TO_CATEGORY_MAP: Record<string, string> = {{
{chr(10).join(map_entries)}
}};

export function middleware(request: NextRequest) {{
  const {{ pathname }} = request.nextUrl;

  const oldBlogMatch = pathname.match(/^\\/blog\\/([^\\/]+)$/);
  if (oldBlogMatch) {{
    const slug = oldBlogMatch[1];
    const categorySlug = SLUG_TO_CATEGORY_MAP[slug];
    if (categorySlug) {{
      return NextResponse.redirect(new URL(`/blog/${{categorySlug}}/${{slug}}`, request.url), 301);
    }}
  }}

  const oldCategoryMatch = pathname.match(/^\\/blog\\/category\\/([^\\/]+)$/);
  if (oldCategoryMatch) {{
    const categorySlug = oldCategoryMatch[1];
    return NextResponse.redirect(new URL(`/blog/${{categorySlug}}`, request.url), 301);
  }}

  return NextResponse.next();
}}

export const config = {{
  matcher: ["/blog/:path*"],
}};
'''
    
    OUTPUT_FILE.write_text(middleware_content, encoding='utf-8')
    print(f"Middleware written to: {OUTPUT_FILE}")
    print(f"Total redirects: {len(slug_map)}")

if __name__ == "__main__":
    main()
