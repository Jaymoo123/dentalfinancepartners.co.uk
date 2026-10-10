"""Stage 07: build the site locally and record provenance.

Inputs: the working tree (Property/web). Needs node + npm; installs from the ROOT lockfile if node_modules is missing.
Outputs: stages/07_build.json  git head, dirty flag (limited to the site dir), node/next versions, build exit code,
         duration, route count (.next/prerender-manifest.json), HTML file count under .next/server/app.
Cost: free (no API calls). Fails loudly (non-zero exit, error tail printed) if install or build fails.

Install: `npm ci` at the repo root, as .github/workflows/ci-build-test.yml does (npm-workspaces monorepo, one root
package-lock.json). If npm ci fails, this reports and stops: it never falls back to `npm install`, and it checks
`git status` shows no package-lock.json change afterwards.

Fonts: the sandbox has no Google Fonts access and layout.tsx imports Plus_Jakarta_Sans from next/font/google. When
fonts.googleapis.com is unreachable (or --font-mock is given) the build runs with NEXT_FONT_GOOGLE_MOCKED_RESPONSES
pointing at a CommonJS Proxy file under .cache/link_engine/ (gitignored) that answers every font URL with one
@font-face block. Real fonts are used when the network allows it. The mock is recorded in the json.
"""
from __future__ import annotations

import argparse
import json
import re
import socket
import subprocess
import sys
import time
from pathlib import Path

from common import REPO, load_site, now_utc, run_dir

MOCK_FILE = REPO / ".cache" / "link_engine" / "font_mock.js"
MOCK_JS = ('module.exports = new Proxy({}, {get: () => "@font-face { font-family: \'Plus Jakarta Sans\'; '
           'font-style: normal; font-weight: 200 800; font-display: swap; '
           'src: local(\'Arial\'); unicode-range: U+0000-00FF; }"});\n')


def sh(cmd, cwd=REPO, env=None, check=False) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, env=env, capture_output=True, text=True, check=check)


def fonts_reachable() -> bool:
    try:
        socket.create_connection(("fonts.googleapis.com", 443), timeout=5).close()
        return True
    except OSError:
        return False


def main() -> None:
    import os
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--font-mock", choices=["auto", "yes", "no"], default="auto")
    a = ap.parse_args()

    cfg = load_site(a.site)
    sitedir = cfg["paths"]["buildDir"]                     # e.g. Property/web
    top = sitedir.split("/")[0]                            # e.g. Property
    app = REPO / sitedir
    out = run_dir(a.site, a.run) / "stages" / "07_build.json"
    rec: dict = {"site": a.site, "run": a.run, "script": "build.py", "started_at": now_utc(), "build_dir": sitedir}

    def finish(code: int, msg: str = "") -> None:
        if msg:
            rec["error"] = msg
        out.write_text(json.dumps(rec, indent=2), encoding="utf-8")
        if code:
            print(f"BUILD STAGE FAILED: {msg}", file=sys.stderr)
        sys.exit(code)

    rec["git_head"] = sh(["git", "rev-parse", "HEAD"]).stdout.strip()
    rec["git_branch"] = sh(["git", "rev-parse", "--abbrev-ref", "HEAD"]).stdout.strip()
    por = sh(["git", "status", "--porcelain", "--", top]).stdout.splitlines()
    rec["dirty"] = bool(por)
    rec["dirty_files"] = [l[3:] for l in por][:50]
    rec["node"] = sh(["node", "-v"]).stdout.strip()
    rec["npm"] = sh(["npm", "-v"]).stdout.strip()

    lock_before = sh(["git", "status", "--porcelain", "--", "package-lock.json"]).stdout
    if not (REPO / "node_modules").exists():
        print("node_modules missing: npm ci at repo root")
        t = time.time()
        r = sh(["npm", "ci", "--no-audit", "--no-fund"])
        rec["install"] = {"cmd": "npm ci", "exit": r.returncode, "seconds": round(time.time() - t, 1)}
        if r.returncode:
            finish(2, "npm ci failed (not falling back to npm install): " + (r.stderr or r.stdout)[-3000:])
    else:
        rec["install"] = {"cmd": "skipped (node_modules present)"}
    lock_after = sh(["git", "status", "--porcelain", "--", "package-lock.json"]).stdout
    rec["lockfile_changed_by_install"] = lock_after != lock_before
    if lock_after != lock_before:
        finish(3, "package-lock.json changed after install: " + lock_after)

    nxt = app / "node_modules" / "next" / "package.json"
    nxt = nxt if nxt.exists() else REPO / "node_modules" / "next" / "package.json"
    rec["next"] = json.loads(nxt.read_text(encoding="utf-8"))["version"] if nxt.exists() else None

    env = dict(os.environ)
    use_mock = a.font_mock == "yes" or (a.font_mock == "auto" and not fonts_reachable())
    rec["font_mock"] = use_mock
    if use_mock:
        MOCK_FILE.parent.mkdir(parents=True, exist_ok=True)
        MOCK_FILE.write_text(MOCK_JS, encoding="utf-8")
        env["NEXT_FONT_GOOGLE_MOCKED_RESPONSES"] = str(MOCK_FILE)
        rec["font_mock_file"] = str(MOCK_FILE.relative_to(REPO))
    env["NEXT_TELEMETRY_DISABLED"] = "1"

    t = time.time()
    r = sh(["npm", "run", "build"], cwd=app, env=env)
    rec["build_exit"] = r.returncode
    rec["duration_s"] = round(time.time() - t, 1)
    log = REPO / ".cache" / "link_engine" / "build.log"
    log.write_text((r.stdout or "") + "\n" + (r.stderr or ""), encoding="utf-8")
    if r.returncode:
        finish(4, "next build failed:\n" + ((r.stdout or "") + (r.stderr or ""))[-4000:])

    nx = app / ".next"
    pm = json.loads((nx / "prerender-manifest.json").read_text(encoding="utf-8"))
    rec["routes_prerender_manifest"] = len(pm.get("routes", {}))
    rec["routes_dynamic"] = len(pm.get("dynamicRoutes", {}))
    rec["routes_total"] = rec["routes_prerender_manifest"] + rec["routes_dynamic"]   # static + dynamic (2026-10-09 baseline counted 944)
    apm = nx / "server" / "app-paths-manifest.json"
    rec["routes_app_paths_manifest"] = len(json.loads(apm.read_text(encoding="utf-8"))) if apm.exists() else None
    rec["html_files"] = sum(1 for _ in (nx / "server" / "app").rglob("*.html"))
    rec["finished_at"] = now_utc()
    # dirty is re-checked after the build: a build must not touch tracked files
    rec["dirty_after_build"] = bool(sh(["git", "status", "--porcelain", "--", top]).stdout.splitlines())
    print(json.dumps(rec, indent=2))
    finish(0)


if __name__ == "__main__":
    main()
