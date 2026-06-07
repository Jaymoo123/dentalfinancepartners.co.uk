"""
Convert raw-markdown body in Property net-new wave-6/7 blog posts to semantic HTML.

Background: Property/web/src/lib/blog.ts injects the post body via dangerouslySetInnerHTML
without parsing markdown. The wave-1..5 legacy posts are pre-rendered HTML; wave-6/7
sessions produced raw markdown by mistake. This script converts the 15 affected files
in place so they render correctly under the existing pipeline.

Idempotent: skips files whose body already starts with HTML tags. Run with --dry-run
to preview without writing.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import markdown

BLOG_DIR = Path(__file__).resolve().parents[1] / "Property" / "web" / "content" / "blog"

FILES = [
    "foreign-tax-credit-uk-property-overseas-landlords.md",
    "tax-treaties-property-investors-treaty-framework-guide.md",
    "dta-tie-breaker-test-dual-residence-property-owners.md",
    "uk-france-dta-property-rental-income-cgt.md",
    "uk-spain-dta-property-uk-resident-spanish-holiday-home.md",
    "uk-italy-dta-tie-breaker-property-residence-disputes.md",
    "uk-uae-dta-property-no-tax-jurisdiction-asymmetry.md",
    "uk-india-dta-property-rental-income-treatment.md",
    "uk-us-dta-property-tax-implications-landlords.md",
    "uk-jersey-guernsey-isle-of-man-dtas-property-investors.md",
    "mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment.md",
    "mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics.md",
    "mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics.md",
    "mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md",
    "mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence.md",
]

FRONTMATTER_RE = re.compile(r"^(---\r?\n.*?\r?\n---\r?\n)(.*)$", re.DOTALL)

HTML_START_TAGS = ("<h1>", "<h2>", "<h3>", "<p>", "<ul>", "<ol>", "<div", "<table>", "<aside>")


def convert_body(body: str) -> str:
    return markdown.markdown(
        body,
        extensions=["extra", "tables", "sane_lists"],
        output_format="html",
    )


def process(path: Path, dry_run: bool) -> str:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        return "SKIP (no frontmatter)"

    frontmatter, body = m.group(1), m.group(2)
    stripped = body.lstrip("\r\n")
    if not stripped:
        return "SKIP (empty body)"

    if stripped.lower().startswith(HTML_START_TAGS):
        return "SKIP (already HTML)"

    html = convert_body(stripped)
    new_text = frontmatter + html + "\n"

    if dry_run:
        return f"DRY-RUN ({len(stripped)} md chars -> {len(html)} html chars)"

    path.write_text(new_text, encoding="utf-8", newline="\n")
    return f"OK ({len(stripped)} md chars -> {len(html)} html chars)"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--only", help="Process a single filename (basename) for testing")
    parser.add_argument("--preview", action="store_true", help="With --only, print converted body head")
    args = parser.parse_args()

    if not BLOG_DIR.exists():
        print(f"ERROR: blog dir not found: {BLOG_DIR}", file=sys.stderr)
        return 1

    targets = [args.only] if args.only else FILES

    for name in targets:
        p = BLOG_DIR / name
        if not p.exists():
            print(f"MISSING: {name}")
            continue

        if args.preview:
            text = p.read_text(encoding="utf-8")
            m = FRONTMATTER_RE.match(text)
            if m:
                body = m.group(2).lstrip("\r\n")
                html = convert_body(body)
                print(html[:3000])
                print("\n... [truncated]")
            continue

        result = process(p, args.dry_run)
        print(f"{result}: {name}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
