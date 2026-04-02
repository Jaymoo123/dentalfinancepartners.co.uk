#!/usr/bin/env python3
"""
Fix duplicate canonical keys in Property blog post frontmatter.
Remove empty canonical: "" lines that appear after the populated canonical.
"""

import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "Property" / "web" / "content" / "blog"

def fix_duplicate_canonical(filepath: Path) -> bool:
    """Remove duplicate empty canonical lines."""
    try:
        content = filepath.read_text(encoding='utf-8')
        
        frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if not frontmatter_match:
            return False
        
        frontmatter = frontmatter_match.group(1)
        
        canonical_lines = [line for line in frontmatter.split('\n') if line.startswith('canonical:')]
        
        if len(canonical_lines) > 1:
            lines = frontmatter.split('\n')
            new_lines = []
            found_populated_canonical = False
            
            for line in lines:
                if line.startswith('canonical:'):
                    if line.strip() == 'canonical: ""' or line.strip() == "canonical: ''":
                        if found_populated_canonical:
                            continue
                        else:
                            new_lines.append(line)
                    else:
                        found_populated_canonical = True
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            
            updated_frontmatter = '\n'.join(new_lines)
            updated_content = content.replace(frontmatter, updated_frontmatter, 1)
            
            if updated_content != content:
                filepath.write_text(updated_content, encoding='utf-8')
                print(f"[+] Fixed: {filepath.name}")
                return True
        
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
    
    fixed = 0
    for filepath in md_files:
        if fix_duplicate_canonical(filepath):
            fixed += 1
    
    print(f"\n{'='*60}")
    print(f"Total files processed: {len(md_files)}")
    print(f"Files fixed: {fixed}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
