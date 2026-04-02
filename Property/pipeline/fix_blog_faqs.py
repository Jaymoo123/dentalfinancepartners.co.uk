"""
Fix blog post FAQs - move from HTML details tags to YAML frontmatter.
"""
import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent / ".." / "web" / "content" / "blog"

def fix_blog_post(filepath):
    """Fix a single blog post's FAQ format."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split frontmatter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"[SKIP] {filepath.name} - Invalid format")
        return False
    
    frontmatter = parts[1]
    body = parts[2]
    
    # Check if already has faqs in frontmatter
    if 'faqs:' in frontmatter:
        print(f"[SKIP] {filepath.name} - Already has faqs in frontmatter")
        return False
    
    # Extract FAQs from body using regex
    faq_pattern = r'<details>\s*<summary>(.*?)</summary>\s*(.*?)\s*</details>'
    faqs = re.findall(faq_pattern, body, re.DOTALL)
    
    if not faqs:
        print(f"[SKIP] {filepath.name} - No FAQs found")
        return False
    
    # Build YAML faqs array
    faqs_yaml_lines = ["faqs:"]
    for question, answer in faqs:
        question = question.strip()
        answer = answer.strip()
        # Escape quotes and handle multiline
        question_escaped = question.replace('"', '\\"').replace('\n', ' ')
        answer_escaped = answer.replace('"', '\\"').replace('\n', ' ')
        faqs_yaml_lines.append(f'  - question: "{question_escaped}"')
        faqs_yaml_lines.append(f'    answer: "{answer_escaped}"')
    
    faqs_yaml = "\n".join(faqs_yaml_lines)
    
    # Remove FAQ section from body
    body_cleaned = re.sub(r'## Frequently Asked Questions.*$', '', body, flags=re.DOTALL).strip()
    
    # Rebuild file
    new_content = f"---{frontmatter}{faqs_yaml}\n---\n\n{body_cleaned}\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"[OK] {filepath.name} - Fixed {len(faqs)} FAQs")
    return True

def main():
    """Fix all blog posts."""
    if not BLOG_DIR.exists():
        print(f"Blog directory not found: {BLOG_DIR}")
        return
    
    posts = list(BLOG_DIR.glob("*.md"))
    print(f"Found {len(posts)} blog posts\n")
    
    fixed_count = 0
    for post_path in posts:
        if fix_blog_post(post_path):
            fixed_count += 1
    
    print(f"\n{'='*60}")
    print(f"Fixed {fixed_count}/{len(posts)} posts")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
