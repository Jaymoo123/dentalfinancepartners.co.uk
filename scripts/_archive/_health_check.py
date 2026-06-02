"""Health check all posts from the latest batch generation run."""
import json
import re
import sys
from pathlib import Path

import yaml

BLOG_DIR = Path(__file__).resolve().parent.parent / "Property" / "web" / "content" / "blog"
MANIFEST = Path(__file__).resolve().parent.parent / "Admin" / "batch_generation_log.json"

VALID_CATS = [
    "Section 24 & Tax Relief", "Incorporation & Company Structures",
    "Making Tax Digital (MTD)", "Capital Gains Tax", "Portfolio Management",
    "Property Accountant Services", "Landlord Tax Essentials",
    "Property Types & Specialist Tax", "Non-Resident Landlord Tax",
]

log = json.load(open(MANIFEST, "r", encoding="utf-8"))
latest = log[-1]
slugs = [r["slug"] for r in latest["results"] if r["status"] == "success" and r.get("slug")]

totals = {"pass": 0, "warn": 0, "fail": 0}
no_faq = []
meta_title_over = []
meta_desc_over = []
bad_category = []
bad_canonical = []
md_links_posts = []
no_headings = []
truncated_faq = []
broken = []

for slug in slugs:
    fpath = BLOG_DIR / f"{slug}.md"
    if not fpath.exists():
        broken.append(f"MISSING FILE: {slug}.md")
        totals["fail"] += 1
        continue

    raw = fpath.read_text(encoding="utf-8")
    parts = raw.split("---", 2)
    if len(parts) < 3:
        broken.append(f"{slug}: invalid front matter structure")
        totals["fail"] += 1
        continue

    try:
        fm = yaml.safe_load(parts[1])
    except Exception as e:
        broken.append(f"{slug}: YAML parse error: {e}")
        totals["fail"] += 1
        continue

    body = parts[2]
    issues = []

    cat = fm.get("category", "")
    if cat not in VALID_CATS:
        issues.append(f"invalid category: {cat}")
        bad_category.append(slug)

    mt = fm.get("metaTitle", "") or ""
    md = fm.get("metaDescription", "") or ""
    if len(mt) > 60:
        issues.append(f"metaTitle {len(mt)} chars")
        meta_title_over.append((slug, len(mt), mt))
    if len(md) > 155:
        issues.append(f"metaDesc {len(md)} chars")
        meta_desc_over.append((slug, len(md)))

    canon = fm.get("canonical", "") or ""
    if not canon.startswith("https://www.propertytaxpartners.co.uk/blog/"):
        issues.append("bad canonical domain")
        bad_canonical.append((slug, canon[:80]))

    faqs = fm.get("faqs", []) or []
    if not faqs or len(faqs) < 1:
        issues.append("no FAQs")
        no_faq.append(slug)
    else:
        for faq in faqs:
            a = faq.get("answer", "") or ""
            if len(a) < 30:
                issues.append(f"truncated FAQ answer ({len(a)} chars)")
                truncated_faq.append(slug)
                break

    h2c = len(re.findall(r"<h2[^>]*>", body))
    if h2c == 0:
        issues.append("no H2 headings")
        no_headings.append(slug)

    mdl = re.findall(r"\[([^\]]+)\]\(([^)]+)\)", body)
    if mdl:
        issues.append(f"{len(mdl)} markdown links in HTML")
        md_links_posts.append(slug)

    s = fm.get("slug", "")
    if not s or not re.match(r"^[a-z0-9-]+$", s):
        issues.append("bad slug format")

    if issues:
        totals["warn"] += 1
    else:
        totals["pass"] += 1

print(f"=== HEALTH CHECK: {len(slugs)} posts ===")
print(f"PASS (clean):     {totals['pass']}")
print(f"WARN (minor):     {totals['warn']}")
print(f"FAIL (broken):    {totals['fail']}")
print()
print("--- Issue breakdown ---")
print(f"metaTitle > 60:   {len(meta_title_over)}")
print(f"metaDesc > 155:   {len(meta_desc_over)}")
print(f"No FAQs:          {len(no_faq)}")
print(f"Truncated FAQs:   {len(truncated_faq)}")
print(f"Bad category:     {len(bad_category)}")
print(f"Bad canonical:    {len(bad_canonical)}")
print(f"MD links in HTML: {len(md_links_posts)}")
print(f"No H2 headings:   {len(no_headings)}")

if broken:
    print("\n--- BROKEN (need manual fix) ---")
    for b in broken:
        print(f"  {b}")

if meta_title_over:
    print("\n--- metaTitle overflows ---")
    for s, l, t in sorted(meta_title_over, key=lambda x: -x[1]):
        print(f"  {l} chars: {s}")
        print(f"           {t}")

if meta_desc_over:
    print("\n--- metaDesc overflows ---")
    for s, l in sorted(meta_desc_over, key=lambda x: -x[1]):
        print(f"  {l} chars: {s}")

if no_faq:
    print("\n--- Posts missing FAQs ---")
    for s in no_faq:
        print(f"  {s}")

if truncated_faq:
    print("\n--- Posts with truncated FAQ answers ---")
    for s in truncated_faq:
        print(f"  {s}")

if bad_canonical:
    print("\n--- Bad canonical URLs ---")
    for s, c in bad_canonical:
        print(f"  {s}: {c}")

if md_links_posts:
    print("\n--- Markdown links in HTML body ---")
    for s in md_links_posts:
        print(f"  {s}")

if no_headings:
    print("\n--- No H2 headings ---")
    for s in no_headings:
        print(f"  {s}")
