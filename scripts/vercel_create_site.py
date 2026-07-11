"""Create the Vercel project for a scaffolded niche site.

Run at gate G4 (after `npm i -g vercel` / with VERCEL_TOKEN in .env). Uses the
Vercel REST API directly because the CLI's OAuth token is rejected by the v9
project-settings API (contractors-ir35 deploy record, docs/contractors-ir35/
STATE.md): framework preset, rootDirectory and "include files outside root"
had to be set in the dashboard last time. A real VERCEL_TOKEN avoids that.

Settings applied (per docs/_engines/SITE_SPINUP.md Step 6):
  - team: team_XF9WAygZX7SGk9Fo4tOAnihH
  - rootDirectory: <site>/web
  - framework: nextjs (null framework = every route 404s)
  - sourceFilesOutsideRootDirectory: true (monorepo `cd ../.. && npm install`
    dies with `Tracker "idealTree" already exists` without it)
  - env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY, ADMIN_DASHBOARD_KEY (fresh per site),
    NEXT_PUBLIC_SITE_URL -- all values sourced from the repo .env (single
    source), except ADMIN_DASHBOARD_KEY which is generated fresh.

Records the created project id into docs/<site>/STATE.md (replaces
PLACEHOLDER_VERCEL_PROJECT_ID) and writes the fresh ADMIN_DASHBOARD_KEY to
.cache/<site>_admin_key.txt (hand to operator, then delete).

Usage:
  python scripts/vercel_create_site.py --site zz-test-niche --dry-run
  python scripts/vercel_create_site.py --site farmers
"""
from __future__ import annotations

import argparse
import json
import secrets
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEAM_ID = "team_XF9WAygZX7SGk9Fo4tOAnihH"
API = "https://api.vercel.com"

ENV_VAR_NAMES = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "ADMIN_DASHBOARD_KEY",
    "NEXT_PUBLIC_SITE_URL",
]


def fail(msg: str) -> None:
    print(f"[FAIL] {msg}", file=sys.stderr)
    sys.exit(1)


def load_dotenv(path: Path) -> dict[str, str]:
    """Minimal .env parser; strips whitespace (embedded-newline paste bug is a
    known estate gotcha, values are stripped hard)."""
    env: dict[str, str] = {}
    if not path.exists():
        return env
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def main() -> None:
    p = argparse.ArgumentParser(description="Create the Vercel project for a niche site.")
    p.add_argument("--site", required=True, help="Site key / directory name (e.g. contractors-ir35)")
    p.add_argument("--dry-run", action="store_true", help="Print the exact API calls without executing")
    args = p.parse_args()
    site = args.site

    site_dir = ROOT / site
    niche_cfg_path = site_dir / "niche.config.json"
    if not niche_cfg_path.exists():
        fail(f"{niche_cfg_path} not found; run spinup_site first")
    domain = json.loads(niche_cfg_path.read_text(encoding="utf-8"))["domain"]

    dotenv = load_dotenv(ROOT / ".env")
    token = dotenv.get("VERCEL_TOKEN", "")
    admin_key = secrets.token_hex(32)
    env_values = {
        "NEXT_PUBLIC_SUPABASE_URL": dotenv.get("NEXT_PUBLIC_SUPABASE_URL", ""),
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": dotenv.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""),
        # ponytail: .env holds the service key as SUPABASE_KEY; prefer an explicit var if added later
        "SUPABASE_SERVICE_ROLE_KEY": dotenv.get("SUPABASE_SERVICE_ROLE_KEY") or dotenv.get("SUPABASE_KEY", ""),
        "ADMIN_DASHBOARD_KEY": admin_key,
        "NEXT_PUBLIC_SITE_URL": f"https://{domain}",
    }
    missing = [k for k, v in env_values.items() if not v]
    if missing and not args.dry_run:
        fail(f"Missing values from .env: {', '.join(missing)}")

    create_body = {
        "name": site,
        "framework": "nextjs",
        "rootDirectory": f"{site}/web",
        "enableAffectedProjectsDeployments": False,
    }
    settings_body = {
        "sourceFilesOutsideRootDirectory": True,
        "framework": "nextjs",
        "rootDirectory": f"{site}/web",
    }
    env_body = [
        {"key": k, "value": env_values[k], "type": "encrypted",
         "target": ["production", "preview"]}
        for k in ENV_VAR_NAMES
    ]

    calls = [
        ("POST", f"{API}/v11/projects?teamId={TEAM_ID}", create_body),
        ("PATCH", f"{API}/v9/projects/{{project_id}}?teamId={TEAM_ID}", settings_body),
        ("POST", f"{API}/v10/projects/{{project_id}}/env?upsert=true&teamId={TEAM_ID}", env_body),
    ]

    if args.dry_run:
        print(f"[DRY RUN] Vercel project creation for {site!r} (domain {domain})")
        print(f"[DRY RUN] Auth: Bearer $VERCEL_TOKEN from .env ({'present' if token else 'MISSING'})")
        for method, url, body in calls:
            redacted = json.loads(json.dumps(body))
            if isinstance(redacted, list):
                for item in redacted:
                    item["value"] = "<redacted>"
            print(f"\n{method} {url}\n{json.dumps(redacted, indent=2)}")
        print(f"\n[DRY RUN] Would write ADMIN_DASHBOARD_KEY to .cache/{site}_admin_key.txt")
        print(f"[DRY RUN] Would record project id into docs/{site}/STATE.md")
        print(f"[DRY RUN] Deploy afterwards from repo root: "
              f"VERCEL_ORG_ID={TEAM_ID} VERCEL_PROJECT_ID=<project_id> vercel deploy --prod")
        return

    import requests  # deferred: dry-run must work without network deps configured
    if not token:
        fail("VERCEL_TOKEN missing from .env (CLI OAuth token will not work for settings; use a real token)")
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    r = requests.post(f"{API}/v11/projects", params={"teamId": TEAM_ID}, headers=headers,
                      json=create_body, timeout=30)
    if r.status_code >= 300:
        fail(f"Project create failed: {r.status_code} {r.text[:300]}")
    project_id = r.json()["id"]
    print(f"[OK] Created project {site!r}: {project_id}")

    r = requests.patch(f"{API}/v9/projects/{project_id}", params={"teamId": TEAM_ID},
                       headers=headers, json=settings_body, timeout=30)
    if r.status_code >= 300:
        fail(f"Settings patch failed (fix in dashboard): {r.status_code} {r.text[:300]}")
    print("[OK] framework=nextjs, rootDirectory, include-files-outside-root ON")

    r = requests.post(f"{API}/v10/projects/{project_id}/env",
                      params={"teamId": TEAM_ID, "upsert": "true"},
                      headers=headers, json=env_body, timeout=30)
    if r.status_code >= 300:
        fail(f"Env var set failed: {r.status_code} {r.text[:300]}")
    print(f"[OK] Set env vars: {', '.join(ENV_VAR_NAMES)}")

    cache = ROOT / ".cache"
    cache.mkdir(exist_ok=True)
    (cache / f"{site}_admin_key.txt").write_text(admin_key, encoding="utf-8")
    print(f"[OK] ADMIN_DASHBOARD_KEY written to .cache/{site}_admin_key.txt (hand to operator, then delete)")

    state_path = ROOT / "docs" / site / "STATE.md"
    if state_path.exists():
        src = state_path.read_text(encoding="utf-8")
        if "PLACEHOLDER_VERCEL_PROJECT_ID" in src:
            state_path.write_text(src.replace("PLACEHOLDER_VERCEL_PROJECT_ID", project_id), encoding="utf-8")
            print(f"[OK] Recorded project id in docs/{site}/STATE.md")
        else:
            print(f"[WARN] docs/{site}/STATE.md has no PLACEHOLDER_VERCEL_PROJECT_ID; add manually: {project_id}")
    else:
        print(f"[WARN] docs/{site}/STATE.md missing; project id: {project_id}")

    print(f"\nDeploy from repo root:\n  VERCEL_ORG_ID={TEAM_ID} VERCEL_PROJECT_ID={project_id} vercel deploy --prod")


if __name__ == "__main__":
    main()
