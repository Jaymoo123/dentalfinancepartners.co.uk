"""
Standardize author names across all sites to match schema.ts convention.
Convention: "{Brand} Editorial Team"
"""
import os
import glob

SITES = {
    "Property": {
        "dir": os.path.join(os.path.dirname(__file__), "..", "Property", "web", "content", "blog"),
        "old": 'author: "Property Tax Partners"',
        "new": 'author: "Property Tax Partners Editorial Team"',
    },
    "Solicitors": {
        "dir": os.path.join(os.path.dirname(__file__), "..", "Solicitors", "web", "content", "blog"),
        "old": 'author: "Accounts for Lawyers"',
        "new": 'author: "Accounts for Lawyers Editorial Team"',
    },
}

def main():
    for site_name, config in SITES.items():
        files = glob.glob(os.path.join(config["dir"], "*.md"))
        fixed = 0
        for filepath in sorted(files):
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            if config["old"] in content:
                content = content.replace(config["old"], config["new"])
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                fixed += 1
        print(f"{site_name}: {fixed} files updated")

if __name__ == "__main__":
    main()
