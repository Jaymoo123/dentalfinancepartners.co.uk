"""Read-only preflight gap reporter for new-site spinup.

Usage:
    python scripts/spinup_site_check.py <site_key>
    python scripts/spinup_site_check.py <site_key> --site-dir <Dir>

    # Examples:
    python scripts/spinup_site_check.py dentists --site-dir Dentists
    python scripts/spinup_site_check.py contractors-ir35

Checks each readiness dimension and prints PASS / GAP / SKIP / INFO.
Exit code 0 if no GAPs (SKIPs and INFOs are acceptable). Exit 1 if any GAP.

DB checks use SUPABASE_ACCESS_TOKEN from .env via the Management API.
They SKIP gracefully (with a warning) if no token is present.

See docs/_engines/SITE_SPINUP.md for the full new-site runbook.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parents[1]
PROD_PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"

CI_WORKFLOW = ROOT / ".github" / "workflows" / "ci-build-test.yml"

GSC_CLIENT = ROOT / "optimisation_engine" / "clients" / "gsc_page_client.py"
BING_CLIENT = ROOT / "optimisation_engine" / "clients" / "bing_query_client.py"
INDEXING_CONFIG = ROOT / "optimisation_engine" / "indexing" / "config.py"
GA4_CONFIG = ROOT / "optimisation_engine" / "clients" / "ga4_config.py"

# Candidate site directory names to try when --site-dir is not given.
# Key: site_key fragment (lowercase) -> list of candidate dir names.
SITE_DIR_CANDIDATES: dict[str, list[str]] = {
    "dentists": ["Dentists", "dentists"],
    "property": ["Property", "property"],
    "medical": ["Medical", "medical"],
    "solicitors": ["Solicitors", "solicitors"],
    "agency": ["digital-agency", "digital_agency", "agency"],
    "generalist": ["generalist", "Generalist"],
    "contractors-ir35": ["contractors-ir35"],
    "console": ["console"],
}

# ---------------------------------------------------------------------------
# Result tracking
# ---------------------------------------------------------------------------

RESULTS: list[tuple[str, str, str]] = []   # (check_id, status, message)


def emit(check_id: str, status: str, message: str) -> None:
    """Record one check result and print it."""
    tag = f"[{status}]"
    print(f"  {tag:<7} {check_id}: {message}")
    RESULTS.append((check_id, status, message))


def gap(check_id: str, message: str) -> None:
    emit(check_id, "GAP", message)


def ok(check_id: str, message: str) -> None:
    emit(check_id, "PASS", message)


def skip(check_id: str, message: str) -> None:
    emit(check_id, "SKIP", message)


def info(check_id: str, message: str) -> None:
    emit(check_id, "INFO", message)


# ---------------------------------------------------------------------------
# Supabase Management API helpers
# ---------------------------------------------------------------------------

def load_token() -> Optional[str]:
    """Load SUPABASE_ACCESS_TOKEN from .env, return None if absent."""
    env_path = ROOT / ".env"
    if not env_path.exists():
        return None
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("SUPABASE_ACCESS_TOKEN="):
            val = line.split("=", 1)[1].strip().strip('"').strip("'")
            return val if val else None
    return None


def run_sql(token: str, query: str) -> tuple[bool, object]:
    """Run a SQL query via the Management API. Returns (ok, data_or_error)."""
    url = f"https://api.supabase.com/v1/projects/{PROD_PROJECT_REF}/database/query"
    body = json.dumps({"query": query}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "spinup-site-check/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return True, data
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8')[:500]}"
    except Exception as exc:  # noqa: BLE001
        return False, f"{type(exc).__name__}: {exc}"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def find_site_dir(site_key: str, explicit_dir: Optional[str]) -> Optional[Path]:
    """Resolve the site's web directory on disk."""
    if explicit_dir:
        d = ROOT / explicit_dir / "web"
        return d if d.exists() else None

    # Try known candidates
    for frag, candidates in SITE_DIR_CANDIDATES.items():
        if frag == site_key or site_key.startswith(frag):
            for cand in candidates:
                d = ROOT / cand / "web"
                if d.exists():
                    return d

    # Generic fallback: try the key itself and a title-cased version
    for variant in [site_key, site_key.capitalize(), site_key.title().replace("-", "")]:
        d = ROOT / variant / "web"
        if d.exists():
            return d

    return None


def grep_file(path: Path, pattern: str) -> bool:
    """Return True if pattern (regex) matches anywhere in the file."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
        return bool(re.search(pattern, text))
    except OSError:
        return False


def file_contains(path: Path, substring: str) -> bool:
    """Return True if substring appears literally in file."""
    try:
        return substring in path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return False


# ---------------------------------------------------------------------------
# Individual checks
# ---------------------------------------------------------------------------

def check_1_niche_config(site_key: str, site_dir: Optional[Path]) -> None:
    """niche.config.json exists + parses + content_strategy.site_key matches."""
    cid = "01-niche-config"

    # Look in <site_key>/ directory (one level up from web)
    if site_dir:
        candidate = site_dir.parent / "niche.config.json"
        # Also try directly inside web (some sites)
        candidate_web = site_dir / "niche.config.json"
    else:
        candidate = None
        candidate_web = None

    config_path = None
    for p in [candidate, candidate_web]:
        if p and p.exists():
            config_path = p
            break

    if config_path is None:
        gap(cid, "niche.config.json not found — create <site>/niche.config.json")
        return

    try:
        data = json.loads(config_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        gap(cid, f"niche.config.json parse error: {e} — fix JSON syntax")
        return

    found_key = (data.get("content_strategy") or {}).get("site_key", "")
    if found_key != site_key:
        gap(cid, f"content_strategy.site_key is {found_key!r}, expected {site_key!r} — fix niche.config.json")
        return

    ok(cid, f"niche.config.json valid, site_key={site_key!r}")


def check_2_live_db(site_key: str, token: Optional[str]) -> None:
    """Live DB: sites_site_key_check contains key; sites row exists; leads CHECK has key; blog_topics count (INFO)."""
    cid = "02-live-db"

    if not token:
        skip(cid, "SUPABASE_ACCESS_TOKEN not in .env — set it to enable DB checks")
        return

    # 2a: sites row
    ok2a, rows2a = run_sql(token, f"SELECT site_key FROM sites WHERE site_key = '{site_key}' LIMIT 1")
    if not ok2a:
        gap(cid, f"DB query failed: {rows2a} — check SUPABASE_ACCESS_TOKEN validity")
        return
    if not rows2a:
        gap(cid, f"No row in sites for site_key={site_key!r} — run Step 1 migrations (SITE_SPINUP.md)")
        return

    # 2b: sites CHECK constraint includes key (read constraint def)
    ok2b, rows2b = run_sql(
        token,
        "SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'sites_site_key_check' LIMIT 1"
    )
    if ok2b and rows2b and isinstance(rows2b, list) and rows2b:
        cdef = rows2b[0].get("def", "")
        if site_key not in cdef:
            gap(cid, f"sites_site_key_check does not include {site_key!r} — add to CHECK constraint")
        else:
            ok(cid + "-sites-check", f"sites_site_key_check includes {site_key!r}")
    else:
        info(cid + "-sites-check", "Could not read sites_site_key_check — verify manually")

    # 2c: leads source CHECK includes key
    ok2c, rows2c = run_sql(
        token,
        "SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'leads_source_valid' LIMIT 1"
    )
    if ok2c and rows2c and isinstance(rows2c, list) and rows2c:
        ldef = rows2c[0].get("def", "")
        if site_key not in ldef:
            gap(cid + "-leads-check", f"leads_source_valid does not include {site_key!r} — add to CHECK constraint")
        else:
            ok(cid + "-leads-check", f"leads_source_valid includes {site_key!r}")
    else:
        info(cid + "-leads-check", "Could not read leads_source_valid — verify manually")

    # 2d: blog_topics count (INFO only)
    ok2d, rows2d = run_sql(token, f"SELECT count(*) AS n FROM blog_topics WHERE site_key = '{site_key}'")
    if ok2d and rows2d and isinstance(rows2d, list) and rows2d:
        n = rows2d[0].get("n", "?")
        info(cid + "-blog-topics", f"blog_topics count for {site_key!r}: {n} rows")
    else:
        info(cid + "-blog-topics", "Could not query blog_topics count — check manually")

    ok(cid, f"sites row present for {site_key!r}")


def check_3_layout_providers(site_key: str, site_dir: Optional[Path]) -> None:
    """layout.tsx has ConsentProvider + AnalyticsProvider + storagePrefix; prefix unique across estate."""
    cid = "03-layout-providers"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    layout = site_dir / "src" / "app" / "layout.tsx"
    if not layout.exists():
        gap(cid, f"layout.tsx not found at {layout} — machinery not yet composed")
        return

    has_consent = grep_file(layout, r"ConsentProvider")
    has_analytics = grep_file(layout, r"AnalyticsProvider")
    prefix_re = r'storagePrefix\s*[=:]\s*["\'](\w+)["\']'
    prefix_match = re.search(prefix_re, layout.read_text(encoding="utf-8", errors="replace"))
    if not prefix_match:
        # Some sites (construction-cis) set the frozen prefix inside a local
        # AnalyticsProvider wrapper mounted by layout.tsx rather than as a
        # literal prop in layout itself. Follow that one hop.
        wrapper = site_dir / "src" / "components" / "analytics" / "AnalyticsProvider.tsx"
        if wrapper.exists():
            prefix_match = re.search(prefix_re, wrapper.read_text(encoding="utf-8", errors="replace"))

    if not has_consent:
        gap(cid, "ConsentProvider not found in layout.tsx — adopt analytics SDK (SITE_SPINUP.md Step 2b)")
        return
    if not has_analytics:
        gap(cid, "AnalyticsProvider not found in layout.tsx — adopt analytics SDK (SITE_SPINUP.md Step 2b)")
        return
    if not prefix_match:
        gap(cid, "storagePrefix not found in layout.tsx — set frozen prefix literal (SITE_SPINUP.md Step 2b)")
        return

    prefix = prefix_match.group(1)

    # Check prefix uniqueness across all sites' layout.tsx files
    all_layouts = list(ROOT.glob("*/web/src/app/layout.tsx"))
    prefix_owners: dict[str, str] = {}
    for lpath in all_layouts:
        try:
            text = lpath.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        m = re.search(r'storagePrefix\s*[=:]\s*["\'](\w+)["\']', text)
        if m:
            p = m.group(1)
            # Get site name from path (e.g. Dentists from Dentists/web/...)
            site_name = lpath.parts[lpath.parts.index("web") - 1] if "web" in lpath.parts else str(lpath)
            if p in prefix_owners and prefix_owners[p] != site_name:
                if p == prefix:
                    gap(cid, f"storagePrefix {prefix!r} is already used by {prefix_owners[p]!r} — pick a unique prefix (SITE_SPINUP.md frozen registry)")
                    return
            prefix_owners[p] = site_name

    ok(cid, f"ConsentProvider + AnalyticsProvider present, storagePrefix={prefix!r} (unique)")


def check_4_api_routes(site_dir: Optional[Path]) -> None:
    """src/app/api/track/route.ts, api/admin/login, and api/admin/analytics exist."""
    cid = "04-api-routes"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    track = site_dir / "src" / "app" / "api" / "track" / "route.ts"
    admin_login = site_dir / "src" / "app" / "api" / "admin" / "login" / "route.ts"
    admin_analytics = site_dir / "src" / "app" / "admin" / "analytics" / "page.tsx"

    missing = []
    if not track.exists():
        missing.append("/api/track/route.ts")
    if not admin_login.exists():
        missing.append("/api/admin/login/route.ts")
    if not admin_analytics.exists():
        missing.append("/admin/analytics/page.tsx")

    if missing:
        gap(cid, f"Missing API/admin routes: {', '.join(missing)} — see SITE_SPINUP.md Step 2c/2d")
    else:
        ok(cid, "/api/track, /api/admin/login, /admin/analytics all present")


def check_5_security_headers(site_dir: Optional[Path]) -> None:
    """next.config.ts references buildSecurityHeaders."""
    cid = "05-security-headers"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    next_config = site_dir / "next.config.ts"
    if not next_config.exists():
        next_config = site_dir / "next.config.js"
    if not next_config.exists():
        gap(cid, "next.config.ts not found — create it with buildSecurityHeaders (SITE_SPINUP.md Step 2a)")
        return

    if not grep_file(next_config, r"buildSecurityHeaders"):
        gap(cid, "buildSecurityHeaders not found in next.config.ts — adopt from web-shared (SITE_SPINUP.md Step 2a)")
    else:
        ok(cid, "buildSecurityHeaders referenced in next.config.ts")


def check_6_blog_apparatus(site_dir: Optional[Path]) -> None:
    """content/blog dir exists + has >= 1 .md; feed.xml + llms-full.txt routes exist."""
    cid = "06-blog-apparatus"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    blog_dir = site_dir / "content" / "blog"
    has_blog = blog_dir.exists() and any(blog_dir.glob("*.md"))

    feed = site_dir / "src" / "app" / "feed.xml" / "route.ts"
    llms = site_dir / "src" / "app" / "llms-full.txt" / "route.ts"

    issues = []
    if not has_blog:
        issues.append("content/blog/ missing or empty (Phase 3 — borrow from Dentists/web/src/lib/blog.ts)")
    if not feed.exists():
        issues.append("feed.xml route missing (Phase 3 — borrow from Dentists/web/src/app/feed.xml/route.ts)")
    if not llms.exists():
        issues.append("llms-full.txt route missing (Phase 3 — borrow from Dentists/web/src/app/llms-full.txt/route.ts)")

    if issues:
        gap(cid, "; ".join(issues))
    else:
        md_count = sum(1 for _ in blog_dir.glob("*.md"))
        ok(cid, f"content/blog ({md_count} .md files), feed.xml, llms-full.txt all present")


def check_7_test_harness(site_dir: Optional[Path]) -> None:
    """package.json has test script; vitest config present."""
    cid = "07-test-harness"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    pkg = site_dir / "package.json"
    vitest_cfg = site_dir / "vitest.config.ts"

    if not pkg.exists():
        gap(cid, "package.json not found in site dir")
        return

    try:
        pkg_data = json.loads(pkg.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        gap(cid, "package.json is invalid JSON")
        return

    scripts = pkg_data.get("scripts", {})
    has_test = "test" in scripts
    has_vitest_cfg = vitest_cfg.exists()

    issues = []
    if not has_test:
        issues.append('no "test" script in package.json — add "test": "vitest run" (SITE_SPINUP.md Step 2h)')
    if not has_vitest_cfg:
        issues.append("vitest.config.ts missing — copy from Dentists/web/vitest.config.ts (SITE_SPINUP.md Step 2h)")

    if issues:
        gap(cid, "; ".join(issues))
    else:
        ok(cid, f'"test" script present, vitest.config.ts found (test cmd: {scripts["test"]!r})')


def check_8_ci_matrix(site_key: str) -> None:
    """CI matrix includes the site key (parsed textually from the YAML)."""
    cid = "08-ci-matrix"

    if not CI_WORKFLOW.exists():
        gap(cid, f"CI workflow not found at {CI_WORKFLOW}")
        return

    text = CI_WORKFLOW.read_text(encoding="utf-8")

    # The YAML matrix uses directory names (e.g. "Dentists" not "dentists").
    # We check if site_key itself OR its case variants appear after "site:" in
    # the matrix section. Also handle the directory-name-to-site_key mapping:
    # e.g. site_key="dentists" -> matrix entry "Dentists".
    variants = {site_key, site_key.capitalize(), site_key.title().replace("-", "")}

    # Build the set of directory names for known site_key -> dir mappings
    dir_map = {
        "dentists": "Dentists",
        "property": "Property",
        "medical": "Medical",
        "solicitors": "Solicitors",
        "agency": "digital-agency",
        "generalist": "generalist",
    }
    if site_key in dir_map:
        variants.add(dir_map[site_key])

    found = False
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("- site:"):
            entry_name = stripped.split(":", 1)[1].strip()
            if entry_name in variants or entry_name == site_key:
                found = True
                break

    if not found:
        gap(cid, f"Site not found in CI matrix — add matrix entry for {site_key!r} (SITE_SPINUP.md Step 5)")
    else:
        ok(cid, f"CI matrix includes {site_key!r}")


def check_9_vercel_link(site_dir: Optional[Path]) -> None:
    """.vercel/project.json exists under <Site>/web."""
    cid = "09-vercel-link"

    if site_dir is None:
        skip(cid, "site directory not found — pass --site-dir to locate it")
        return

    project_json = site_dir / ".vercel" / "project.json"
    if not project_json.exists():
        gap(cid, f".vercel/project.json not found — link via Vercel CLI (SITE_SPINUP.md Step 6)")
    else:
        try:
            data = json.loads(project_json.read_text(encoding="utf-8"))
            pid = data.get("projectId", "?")
            ok(cid, f".vercel/project.json found (projectId: {pid})")
        except (json.JSONDecodeError, OSError):
            ok(cid, ".vercel/project.json found (could not parse for projectId)")


def check_10_engine_maps(site_key: str) -> None:
    """Engine maps: site key in gsc_page_client _SITE_URL_MAP, bing_query_client map, indexing/config.py; IndexNow key file exists."""
    cid = "10-engine-maps"

    results = []
    all_pass = True

    # GSC
    if GSC_CLIENT.exists() and file_contains(GSC_CLIENT, f'"{site_key}"'):
        results.append("gsc_page_client: PASS")
    else:
        results.append("gsc_page_client: GAP (add to _SITE_URL_MAP in clients/gsc_page_client.py)")
        all_pass = False

    # Bing
    if BING_CLIENT.exists() and file_contains(BING_CLIENT, f'"{site_key}"'):
        results.append("bing_query_client: PASS")
    else:
        results.append("bing_query_client: GAP (add to DEFAULT_SITE_URL in clients/bing_query_client.py)")
        all_pass = False

    # IndexNow config
    if INDEXING_CONFIG.exists() and file_contains(INDEXING_CONFIG, f'"{site_key}"'):
        results.append("indexing/config.py: PASS")
    else:
        results.append("indexing/config.py: GAP (add to SITE_INDEXNOW_CONFIG in indexing/config.py)")
        all_pass = False

    # IndexNow public key file — look in all likely site dirs
    key_found = False
    key_pattern = re.compile(r'"key"\s*:\s*"([a-f0-9]+)"')
    if INDEXING_CONFIG.exists():
        cfg_text = INDEXING_CONFIG.read_text(encoding="utf-8", errors="replace")
        # Find the block for this site_key and extract the key value
        site_block = re.search(
            r'"' + re.escape(site_key) + r'"[^{]*\{([^}]+)\}',
            cfg_text,
            re.DOTALL,
        )
        if site_block:
            key_m = re.search(r'"key"\s*:\s*"([a-f0-9]+)"', site_block.group(1))
            if key_m:
                key_val = key_m.group(1)
                # Look for the key file in any site's public/ directory
                for key_file in ROOT.glob(f"*/web/public/{key_val}.txt"):
                    if key_file.exists():
                        key_found = True
                        break

    if key_found:
        results.append("IndexNow key file: PASS")
    else:
        results.append("IndexNow key file: GAP (create <Site>/web/public/<key>.txt with the key string)")
        all_pass = False

    summary = " | ".join(results)
    if all_pass:
        ok(cid, summary)
    else:
        gap(cid, summary)


def check_11_ga4(site_key: str) -> None:
    """GA4: site key in ga4_config.py (INFO-level — expected GAP pre-launch)."""
    cid = "11-ga4-config"

    if not GA4_CONFIG.exists():
        info(cid, "ga4_config.py not found — add after operator creates GA4 property (SITE_SPINUP.md Step 8)")
        return

    if file_contains(GA4_CONFIG, f'"{site_key}"'):
        ok(cid, f"{site_key!r} present in GA4_PROPERTY_IDS")
    else:
        info(cid, f"{site_key!r} not yet in ga4_config.py — add after operator creates GA4 property (expected pre-launch)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Spinup site gap reporter")
    parser.add_argument("site_key", help="The site_key to check (e.g. dentists, contractors-ir35)")
    parser.add_argument("--site-dir", metavar="DIR", help="Override site directory name under repo root (e.g. Dentists)")
    args = parser.parse_args()

    site_key: str = args.site_key
    explicit_dir: Optional[str] = args.site_dir

    print(f"\nSpinup check — site_key: {site_key!r}\n" + "=" * 60)

    # Resolve site directory
    site_dir = find_site_dir(site_key, explicit_dir)
    if site_dir:
        print(f"  Site dir resolved: {site_dir.relative_to(ROOT)}\n")
    else:
        print(f"  Site dir: NOT FOUND (pass --site-dir <name> to override)\n")

    # Load DB token
    token = load_token()
    if not token:
        print("  Note: SUPABASE_ACCESS_TOKEN not found in .env — DB checks will SKIP\n")

    # Run all checks
    check_1_niche_config(site_key, site_dir)
    check_2_live_db(site_key, token)
    check_3_layout_providers(site_key, site_dir)
    check_4_api_routes(site_dir)
    check_5_security_headers(site_dir)
    check_6_blog_apparatus(site_dir)
    check_7_test_harness(site_dir)
    check_8_ci_matrix(site_key)
    check_9_vercel_link(site_dir)
    check_10_engine_maps(site_key)
    check_11_ga4(site_key)

    # Summary table
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    gaps   = [(c, m) for c, s, m in RESULTS if s == "GAP"]
    passes = [(c, m) for c, s, m in RESULTS if s == "PASS"]
    skips  = [(c, m) for c, s, m in RESULTS if s == "SKIP"]
    infos  = [(c, m) for c, s, m in RESULTS if s == "INFO"]

    print(f"  PASS : {len(passes)}")
    print(f"  GAP  : {len(gaps)}")
    print(f"  SKIP : {len(skips)}")
    print(f"  INFO : {len(infos)}")

    if gaps:
        print("\nGAPs to resolve:")
        for check_id, msg in gaps:
            print(f"  [{check_id}] {msg}")
        print("\nResult: GAPS FOUND — resolve before launch")
        sys.exit(1)
    else:
        print("\nResult: NO GAPS — all checks passed (SKIPs and INFOs are acceptable)")
        sys.exit(0)


if __name__ == "__main__":
    main()
