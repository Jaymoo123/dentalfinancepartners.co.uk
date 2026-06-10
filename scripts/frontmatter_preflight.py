"""
Frontmatter pre-flight scan — CT-02 gate.

Scans each site's content/blog/ corpus against the STANDARD_MANIFEST
(slug, title, date, category, metaDescription) and emits a per-site
violation report to docs/<site>/frontmatter_preflight_2026-06.md.

Read-only: never modifies content files.
Usage: python scripts/frontmatter_preflight.py
"""

import os
import sys
import re
from datetime import datetime
from pathlib import Path

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent

SITES = [
    ("generalist", REPO_ROOT / "generalist" / "web" / "content" / "blog"),
    ("Dentists",   REPO_ROOT / "Dentists"   / "web" / "content" / "blog"),
    ("Medical",    REPO_ROOT / "Medical"    / "web" / "content" / "blog"),
    ("Solicitors", REPO_ROOT / "Solicitors" / "web" / "content" / "blog"),
    ("digital-agency", REPO_ROOT / "digital-agency" / "web" / "content" / "blog"),
    ("contractors-ir35", REPO_ROOT / "contractors-ir35" / "web" / "content" / "blog"),
]

REQUIRED_FIELDS = ["slug", "title", "date", "category", "metaDescription"]

# ---------------------------------------------------------------------------
# Frontmatter parser (no external deps — simple YAML front-matter parse)
# ---------------------------------------------------------------------------

FM_PATTERN = re.compile(r"^---\s*\n(.*?)\n---", re.DOTALL)


def parse_frontmatter(text: str) -> dict:
    """Extract key: value pairs from the YAML front-matter block."""
    match = FM_PATTERN.match(text)
    if not match:
        return {}
    yaml_block = match.group(1)
    result = {}
    for line in yaml_block.splitlines():
        if ":" not in line:
            continue
        key, _, rest = line.partition(":")
        key = key.strip()
        val = rest.strip().strip('"').strip("'")
        if key and not key.startswith("#"):
            result[key] = val
    return result


def is_valid_date(value: str) -> bool:
    """Return True if the value parses as a date."""
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S.%fZ", "%Y-%m-%dT%H:%M:%SZ"):
        try:
            datetime.strptime(value, fmt)
            return True
        except ValueError:
            pass
    # Fallback: try Python's flexible ISO parse
    try:
        datetime.fromisoformat(value.replace("Z", "+00:00"))
        return True
    except (ValueError, AttributeError):
        pass
    return False


def check_file(md_path: Path) -> list[str]:
    """Return list of violation strings for this file (empty = clean)."""
    text = md_path.read_text(encoding="utf-8", errors="replace")
    fm = parse_frontmatter(text)
    violations = []

    for field in REQUIRED_FIELDS:
        val = fm.get(field, "")
        if not isinstance(val, str):
            val = str(val)
        if val.strip() == "":
            violations.append(f'missing required field "{field}"')
        elif field == "date" and not is_valid_date(val.strip()):
            violations.append(f'invalid date format for "date": {val!r}')

    return violations


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_site(site_name: str, blog_dir: Path) -> tuple[int, int, list[str]]:
    """Returns (total_files, violation_count, lines_for_report)."""
    if not blog_dir.exists():
        return 0, 0, [f"_Content directory not found: {blog_dir}_\n"]

    md_files = sorted(blog_dir.glob("*.md"))
    if not md_files:
        return 0, 0, ["_No .md files found._\n"]

    lines = []
    violation_count = 0

    for md_file in md_files:
        viols = check_file(md_file)
        if viols:
            violation_count += 1
            rel = md_file.name
            for v in viols:
                lines.append(f"- `{rel}`: {v}")

    return len(md_files), violation_count, lines


def main():
    run_date = datetime.now().strftime("%Y-%m-%d")
    summary_rows = []

    for site_name, blog_dir in SITES:
        total, violations, detail_lines = run_site(site_name, blog_dir)
        status = "CLEAN" if violations == 0 else "VIOLATIONS"
        summary_rows.append((site_name, total, violations, status))

        # Determine docs dir
        if site_name in ("generalist", "digital-agency", "contractors-ir35"):
            docs_dir = REPO_ROOT / "docs" / site_name.lower().replace("-", "-")
        else:
            docs_dir = REPO_ROOT / "docs" / site_name.lower()

        docs_dir.mkdir(parents=True, exist_ok=True)
        report_path = docs_dir / f"frontmatter_preflight_2026-06.md"

        gate = (
            "**GATE: CLEAN — enforcement eligible.**"
            if violations == 0
            else f"**GATE: {violations} violation(s) — enforcement BLOCKED. Backfill required before CT-02 wiring.**"
        )

        lines = [
            f"# Frontmatter pre-flight — {site_name} ({run_date})\n",
            f"Corpus scanned: `{blog_dir}`  \n",
            f"Files scanned: {total}  \n",
            f"Violations: {violations}  \n",
            f"\n{gate}\n",
            "\n## Required manifest\n",
            "Fields: `slug`, `title`, `date` (ISO-parseable), `category` (non-empty), `metaDescription` (non-empty).\n",
        ]

        if violations == 0:
            lines += ["\n## Result\n", "All files pass. No violations found.\n"]
        else:
            lines += ["\n## Violations\n"] + [l + "\n" for l in detail_lines]

        report_path.write_text("".join(lines), encoding="utf-8")
        print(f"[{status:10s}] {site_name:20s}  {violations:4d}/{total} violations  -> {report_path.relative_to(REPO_ROOT)}")

    print()
    print("Summary:")
    for name, total, viols, status in summary_rows:
        print(f"  {name:20s}: {status} ({viols}/{total})")

    # Exit 0 regardless — pre-flight is informational; enforcement gating is
    # handled by CT-02 wiring (only clean sites get the assertFrontmatter call).
    return 0


if __name__ == "__main__":
    sys.exit(main())
