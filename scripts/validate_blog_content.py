"""
Blog content quality validator.
Checks all .md blog posts across all sites for:
- Front matter completeness
- metaTitle length (max 60 chars)
- metaDescription length (max 155 chars)
- Canonical URL format
- Markdown-in-HTML contamination
- Internal link target validation (slug exists)
- Stale year references
- FAQ presence

Usage:
    python scripts/validate_blog_content.py              # Validate all sites
    python scripts/validate_blog_content.py --site Property  # Validate one site
    python scripts/validate_blog_content.py --fix-authors    # Also fix author names
"""
import argparse
import glob
import os
import re
import subprocess
import sys
import yaml


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

SITES = {
    "Property": {
        "domain": "propertytaxpartners.co.uk",
        "url_style": "nested",
        "author": "Property Tax Partners Editorial Team",
    },
    "Dentists": {
        "domain": "dentalfinancepartners.co.uk",
        "url_style": "nested",
        "author": "Dental Finance Partners Editorial Team",
    },
    "Medical": {
        "domain": "medicalaccounts.co.uk",
        "url_style": "flat",
        "author": "Medical Accountants UK Editorial Team",
    },
    "Solicitors": {
        "domain": "accountsforlawyers.co.uk",
        "url_style": "nested",
        "author": "Accounts for Lawyers Editorial Team",
    },
}

REQUIRED_FIELDS = ["title", "slug", "date", "author", "category", "metaTitle", "metaDescription", "h1", "summary"]
STALE_YEAR_PATTERNS = [r"2024/25", r"2025/26", r"2024", r"2023"]
CURRENT_YEAR_REFERENCES = "2026/27 or 2026"


class ValidationResult:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def error(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)

    @property
    def passed(self):
        return len(self.errors) == 0


def parse_front_matter(filepath):
    """Parse YAML front matter from a .md file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if not content.startswith("---"):
        return None, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, content

    try:
        fm = yaml.safe_load(parts[1])
    except yaml.YAMLError:
        return None, content

    return fm or {}, parts[2]


def get_all_slugs(site_name):
    """Get all slugs for a site."""
    blog_dir = os.path.join(PROJECT_ROOT, site_name, "web", "content", "blog")
    slugs = set()
    for filepath in glob.glob(os.path.join(blog_dir, "*.md")):
        fm, _ = parse_front_matter(filepath)
        if fm and fm.get("slug"):
            slugs.add(fm["slug"])
    return slugs


def validate_post(filepath, site_name, site_config, all_slugs):
    """Validate a single blog post."""
    result = ValidationResult()
    filename = os.path.basename(filepath)

    fm, body = parse_front_matter(filepath)
    if fm is None:
        result.error(f"Cannot parse front matter")
        return result

    # Required fields
    for field in REQUIRED_FIELDS:
        if not fm.get(field):
            result.error(f"Missing required field: {field}")

    # metaTitle length
    meta_title = fm.get("metaTitle", "")
    if meta_title and len(meta_title) > 60:
        result.error(f"metaTitle too long: {len(meta_title)} chars (max 60)")

    # metaDescription length
    meta_desc = fm.get("metaDescription", "")
    if meta_desc and len(meta_desc) > 155:
        result.error(f"metaDescription too long: {len(meta_desc)} chars (max 155)")

    # Canonical URL
    canonical = fm.get("canonical", "")
    if not canonical:
        result.error(f"Missing canonical URL")
    elif site_config["domain"] not in canonical:
        result.error(f"Canonical domain mismatch: {canonical}")

    # Author name
    expected_author = site_config["author"]
    actual_author = fm.get("author", "")
    if actual_author and actual_author != expected_author:
        result.warn(f"Author mismatch: '{actual_author}' (expected '{expected_author}')")

    # Markdown-in-HTML
    if re.search(r'\[([^\]]+)\]\((/[^)]+)\)', body):
        result.error(f"Markdown links in HTML body (should be <a> tags)")

    # FAQs
    faqs = fm.get("faqs", [])
    if not faqs:
        result.warn(f"No FAQs")

    # Stale year references in metaTitle/metaDescription
    for field_name in ["metaTitle", "metaDescription"]:
        field_value = fm.get(field_name, "")
        for pattern in STALE_YEAR_PATTERNS:
            if re.search(pattern, field_value):
                result.warn(f"Stale year '{pattern}' in {field_name} (should be {CURRENT_YEAR_REFERENCES})")

    # Internal link validation
    link_pattern = re.compile(r'href="(/blog/[^"]+)"')
    for match in link_pattern.finditer(body):
        href = match.group(1)
        # Extract slug from href
        parts = href.strip("/").split("/")
        if len(parts) >= 2:
            target_slug = parts[-1]
            if target_slug and target_slug not in all_slugs:
                # Could be a hub page URL, skip those
                if len(parts) == 2:
                    continue  # /blog/{category-slug} — hub page
                result.warn(f"Internal link target may not exist: {href}")

    return result


def get_changed_files():
    """Return repo-relative paths changed in the triggering push/PR (vs base).

    Base ref resolution order:
      1. $VALIDATE_BASE_REF (workflow sets this to the PR base / pre-push SHA)
      2. HEAD~1 (plain push: diff against previous commit)
    Returns None if git diff fails (caller falls back to full enforcement).
    """
    base = os.environ.get("VALIDATE_BASE_REF") or "HEAD~1"
    try:
        out = subprocess.run(
            ["git", "diff", "--name-only", base, "HEAD"],
            cwd=PROJECT_ROOT, capture_output=True, text=True, check=True,
        ).stdout
    except (subprocess.CalledProcessError, OSError):
        return None
    return {line.strip() for line in out.splitlines() if line.strip()}


def validate_site(site_name, site_config, verbose=False, enforce_paths=None):
    """Validate all posts for a site.

    enforce_paths: set of repo-relative changed paths, or None to enforce all.
    Errors in files NOT in enforce_paths are printed as LEGACY warnings only.
    """
    blog_dir = os.path.join(PROJECT_ROOT, site_name, "web", "content", "blog")
    if not os.path.exists(blog_dir):
        print(f"  SKIP: {blog_dir} does not exist")
        return 0, 0

    files = sorted(glob.glob(os.path.join(blog_dir, "*.md")))
    all_slugs = get_all_slugs(site_name)

    total_errors = 0
    total_warnings = 0

    for filepath in files:
        result = validate_post(filepath, site_name, site_config, all_slugs)
        filename = os.path.basename(filepath)
        rel = os.path.relpath(filepath, PROJECT_ROOT).replace(os.sep, "/")
        enforced = enforce_paths is None or rel in enforce_paths

        if not result.passed or (verbose and result.warnings):
            if result.errors:
                for err in result.errors:
                    if enforced:
                        print(f"  ERROR {filename}: {err}")
                        total_errors += 1
                    else:
                        print(f"  WARN  {filename} (legacy, unchanged): {err}")
                        total_warnings += 1
            if verbose and result.warnings:
                for warn in result.warnings:
                    print(f"  WARN  {filename}: {warn}")
                    total_warnings += 1

    return total_errors, total_warnings


def main():
    parser = argparse.ArgumentParser(description="Validate blog content quality")
    parser.add_argument("--site", choices=list(SITES.keys()), help="Validate specific site only")
    parser.add_argument("--verbose", action="store_true", help="Show warnings too")
    parser.add_argument("--strict", action="store_true", help="Exit with error code on any issues")
    parser.add_argument("--full", action="store_true",
                        help="Enforce errors on the full corpus (default: changed files only; legacy issues become warnings)")
    args = parser.parse_args()

    sites_to_check = {args.site: SITES[args.site]} if args.site else SITES

    enforce_paths = None
    if not args.full:
        enforce_paths = get_changed_files()
        if enforce_paths is None:
            print("NOTE: could not determine changed files (git diff failed); enforcing full corpus")
        else:
            print(f"Changed-files-only mode: enforcing errors on {len(enforce_paths)} changed file(s); "
                  f"legacy issues reported as warnings (use --full to enforce everything)")

    grand_total_errors = 0
    grand_total_warnings = 0

    for site_name, site_config in sites_to_check.items():
        print(f"\n{'=' * 60}")
        print(f"Validating: {site_name}")
        print(f"{'=' * 60}")
        errors, warnings = validate_site(site_name, site_config, verbose=args.verbose, enforce_paths=enforce_paths)
        grand_total_errors += errors
        grand_total_warnings += warnings

        blog_dir = os.path.join(PROJECT_ROOT, site_name, "web", "content", "blog")
        post_count = len(glob.glob(os.path.join(blog_dir, "*.md")))
        if errors == 0:
            print(f"  PASS: {post_count} posts validated, 0 errors")
        else:
            print(f"  FAIL: {errors} errors across {post_count} posts")
        if warnings > 0:
            print(f"  {warnings} warnings")

    print(f"\n{'=' * 60}")
    print(f"TOTAL: {grand_total_errors} errors, {grand_total_warnings} warnings")
    print(f"{'=' * 60}")

    if grand_total_errors > 0:
        sys.exit(1)
    elif args.strict and grand_total_warnings > 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
