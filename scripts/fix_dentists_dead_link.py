"""
Fix dead internal links and author names in Dentists blog posts.
- Replace dead slug /blog/associate-dentist-tax-self-assessment-uk with correct nested URL
- Standardize author name
"""
import os
import glob

BLOG_DIR = os.path.join(os.path.dirname(__file__), "..", "Dentists", "web", "content", "blog")

def main():
    files = glob.glob(os.path.join(BLOG_DIR, "*.md"))
    fixed = 0
    
    for filepath in sorted(files):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        original = content
        
        # Fix dead link: flat slug -> correct nested URL
        content = content.replace(
            "/blog/associate-dentist-tax-self-assessment-uk",
            "/blog/associate-tax/associate-dentist-tax-guide-uk"
        )
        
        # Standardize author name
        content = content.replace(
            'author: "Dental Finance Partners"',
            'author: "Dental Finance Partners Editorial Team"'
        )
        
        if content != original:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            fixed += 1
            print(f"  Fixed: {os.path.basename(filepath)}")
    
    print(f"\nDone: {fixed} files modified")


if __name__ == "__main__":
    main()
