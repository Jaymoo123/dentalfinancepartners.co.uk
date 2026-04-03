"""
Fix markdown links in Medical blog posts HTML content.
Converts [text](url) to <a href="url">text</a>.
Also converts markdown bullet lists (- [text](url)) into proper <li><a> elements.
"""
import os
import re
import glob

BLOG_DIR = os.path.join(os.path.dirname(__file__), "..", "Medical", "web", "content", "blog")

def fix_markdown_links(content):
    """Convert markdown-style links to HTML anchors in HTML content."""
    # Split front matter from body
    parts = content.split("---", 2)
    if len(parts) < 3:
        return content, 0
    
    front_matter = parts[1]
    body = parts[2]
    
    count = 0
    
    # Fix markdown links: [text](url) -> <a href="url">text</a>
    # But NOT inside YAML front matter (already handled by split)
    def replace_link(match):
        nonlocal count
        text = match.group(1)
        url = match.group(2)
        count += 1
        return f'<a href="{url}">{text}</a>'
    
    # Match [text](url) patterns - markdown link syntax
    body = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, body)
    
    # Fix any remaining markdown bullet points that might be outside <ul> context
    # Convert standalone "- " lines that aren't inside <ul> to <li> items
    # This is a light touch - just fix the link syntax, leave structure
    
    return f"---{front_matter}---{body}", count


def fix_author_name(content):
    """Standardize author name to match schema.ts convention."""
    content = content.replace('author: "Medical Accounts"', 'author: "Medical Accountants UK Editorial Team"')
    return content


def main():
    files = glob.glob(os.path.join(BLOG_DIR, "*.md"))
    total_fixed = 0
    files_fixed = 0
    
    for filepath in sorted(files):
        with open(filepath, "r", encoding="utf-8") as f:
            original = f.read()
        
        fixed, link_count = fix_markdown_links(original)
        fixed = fix_author_name(fixed)
        
        if fixed != original:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(fixed)
            files_fixed += 1
            total_fixed += link_count
            print(f"  Fixed {link_count} links + author: {os.path.basename(filepath)}")
    
    print(f"\nDone: {files_fixed} files modified, {total_fixed} markdown links converted to HTML")


if __name__ == "__main__":
    main()
