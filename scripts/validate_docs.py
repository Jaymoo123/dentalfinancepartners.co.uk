"""
Documentation consistency validator.
Checks that README, project-context, and issue log match the actual codebase.

Usage:
    python scripts/validate_docs.py            # Run all checks
    python scripts/validate_docs.py --verbose  # Show passing checks too
"""
import argparse
import glob
import json
import os
import re
import sys


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

EXPECTED_SITES = {
    "Property": {
        "domain": "propertytaxpartners.co.uk",
        "niche_id": "property",
    },
    "Dentists": {
        "domain": "dentalfinancepartners.co.uk",
        "niche_id": "dentists",
    },
    "Medical": {
        "domain": "medicalaccountantsuk.co.uk",
        "niche_id": "medical",
    },
    "Solicitors": {
        "domain": "accountsforlawyers.co.uk",
        "niche_id": "solicitors",
    },
}

errors = []
warnings = []
passes = []


def check(condition, message, warn_only=False):
    if condition:
        passes.append(f"PASS: {message}")
    elif warn_only:
        warnings.append(f"WARN: {message}")
    else:
        errors.append(f"FAIL: {message}")


def read_file(rel_path):
    full = os.path.join(PROJECT_ROOT, rel_path)
    if not os.path.exists(full):
        return None
    with open(full, "r", encoding="utf-8") as f:
        return f.read()


def check_site_directories():
    """Every expected site folder exists with niche.config.json and web/."""
    for site, info in EXPECTED_SITES.items():
        site_dir = os.path.join(PROJECT_ROOT, site)
        check(os.path.isdir(site_dir), f"{site}/ directory exists")

        config_path = os.path.join(site_dir, "niche.config.json")
        if os.path.exists(config_path):
            with open(config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
            actual_domain = config.get("domain", "").replace("www.", "")
            check(
                actual_domain == info["domain"],
                f"{site} domain in niche.config.json matches expected "
                f"(got '{actual_domain}', expected '{info['domain']}')",
            )
            check(
                config.get("niche_id") == info["niche_id"],
                f"{site} niche_id in niche.config.json matches expected",
            )
        else:
            check(False, f"{site}/niche.config.json exists")

        web_dir = os.path.join(site_dir, "web")
        check(os.path.isdir(web_dir), f"{site}/web/ directory exists")

        blog_dir = os.path.join(site_dir, "web", "content", "blog")
        if os.path.isdir(blog_dir):
            post_count = len(glob.glob(os.path.join(blog_dir, "*.md")))
            check(post_count > 0, f"{site} has {post_count} blog posts")
        else:
            check(False, f"{site}/web/content/blog/ directory exists")


def check_readme():
    """README references all sites with correct domains."""
    content = read_file("README.md")
    check(content is not None, "README.md exists")
    if content is None:
        return

    for site, info in EXPECTED_SITES.items():
        check(
            info["domain"] in content,
            f"README mentions {site} domain ({info['domain']})",
        )

    check(
        "ISSUE_LOG.md" in content,
        "README references Admin/ISSUE_LOG.md",
    )
    check(
        "agent-workflow" in content,
        "README references agent-workflow rule",
    )
    check(
        "project-context" in content,
        "README references project-context rule",
    )


def check_rules():
    """Rule files exist and reference the right documents."""
    context = read_file(os.path.join(".cursor", "rules", "project-context.mdc"))
    check(context is not None, ".cursor/rules/project-context.mdc exists")

    workflow = read_file(os.path.join(".cursor", "rules", "agent-workflow.mdc"))
    check(workflow is not None, ".cursor/rules/agent-workflow.mdc exists")

    if workflow:
        check(
            "ISSUE_LOG.md" in workflow,
            "agent-workflow.mdc references ISSUE_LOG.md",
        )
        check(
            "PLATFORM_AUDIT" in workflow,
            "agent-workflow.mdc references platform audit",
        )

    if context:
        for site, info in EXPECTED_SITES.items():
            check(
                info["domain"] in context,
                f"project-context.mdc mentions {site} domain",
            )
        check(
            "ISSUE_LOG.md" in context,
            "project-context.mdc references ISSUE_LOG.md",
        )

    stale = read_file(".cursorrules")
    check(stale is None, "Stale .cursorrules file does not exist")


def check_issue_log():
    """Issue log exists, has valid structure, and IDs in index match tables."""
    content = read_file(os.path.join("Admin", "ISSUE_LOG.md"))
    check(content is not None, "Admin/ISSUE_LOG.md exists")
    if content is None:
        return

    check(
        "## Quick Lookup by Site" in content,
        "ISSUE_LOG has Quick Lookup section",
    )
    check("## Open Issues" in content, "ISSUE_LOG has Open Issues section")
    check("## Resolved" in content, "ISSUE_LOG has Resolved section")

    index_ids = set(re.findall(r"[PDMSXI]-\d{3}", content.split("## Open Issues")[0]))
    after_open = content.split("## Open Issues")[1]
    open_section = after_open.split("## Resolved")[0] if "## Resolved" in after_open else after_open
    table_ids = set(re.findall(r"[PDMSXI]-\d{3}", open_section))

    missing_from_tables = index_ids - table_ids
    missing_from_index = table_ids - index_ids

    check(
        len(missing_from_tables) == 0,
        f"All index IDs exist in tables (missing: {missing_from_tables or 'none'})",
    )
    check(
        len(missing_from_index) == 0,
        f"All table IDs exist in index (missing: {missing_from_index or 'none'})",
    )


def check_referenced_files():
    """Key files referenced across docs actually exist."""
    expected_files = [
        os.path.join("Admin", "ISSUE_LOG.md"),
        os.path.join("Admin", "PLATFORM_AUDIT_2026-04-02.md"),
        os.path.join(".cursor", "rules", "project-context.mdc"),
        os.path.join(".cursor", "rules", "agent-workflow.mdc"),
        os.path.join("scripts", "validate_blog_content.py"),
        "shared_supabase_config.py",
    ]
    for rel_path in expected_files:
        full = os.path.join(PROJECT_ROOT, rel_path)
        check(os.path.exists(full), f"Referenced file exists: {rel_path}")


def main():
    parser = argparse.ArgumentParser(description="Validate documentation consistency")
    parser.add_argument("--verbose", action="store_true", help="Show passing checks")
    args = parser.parse_args()

    print("=" * 60)
    print("DOCUMENTATION CONSISTENCY CHECK")
    print("=" * 60)

    check_site_directories()
    check_readme()
    check_rules()
    check_issue_log()
    check_referenced_files()

    if args.verbose and passes:
        print(f"\n--- Passes ({len(passes)}) ---")
        for p in passes:
            print(f"  {p}")

    if warnings:
        print(f"\n--- Warnings ({len(warnings)}) ---")
        for w in warnings:
            print(f"  {w}")

    if errors:
        print(f"\n--- Failures ({len(errors)}) ---")
        for e in errors:
            print(f"  {e}")

    print(f"\n{'=' * 60}")
    print(f"Results: {len(passes)} passed, {len(warnings)} warnings, {len(errors)} failed")
    print(f"{'=' * 60}")

    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
