"""Remove image/altText/imageCredit frontmatter from 3 posts that got off-niche
(construction-coded) hero photos, so blog_image_backfill re-fetches them."""
import re
import pathlib

SLUGS = ["what-is-ir35", "ir35-contract-review-checklist", "contractor-tax-planning-guide"]
base = pathlib.Path("contractors-ir35/web/content/blog")

for slug in SLUGS:
    p = base / f"{slug}.md"
    lines = p.read_text(encoding="utf-8").split("\n")
    out = []
    skip_indented = False
    for ln in lines:
        if re.match(r"^(image|altText)\s*:", ln):
            continue
        if re.match(r"^imageCredit\s*:", ln):
            skip_indented = True
            continue
        if skip_indented and re.match(r"^\s+\S", ln):
            continue
        skip_indented = False
        out.append(ln)
    p.write_text("\n".join(out), encoding="utf-8")
    print(f"stripped image block from {slug}")
