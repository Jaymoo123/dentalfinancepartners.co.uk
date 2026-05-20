"""Phase 2 prep: diff shared/web-core/ against per-site copies to identify drift.

For each file in shared/web-core/, find the corresponding per-site copy in each
of Dentists/, Property/, Medical/, Solicitors/, generalist/ and report:
  - Does the per-site copy exist?
  - Is it identical to shared/?
  - If not, how many lines differ?
  - Is the per-site copy NEWER or OLDER than shared/?

Output:
  - Console summary table
  - docs/phase2_shared_diff.json: full diff data
  - docs/phase2_shared_diff.md: human-readable report

Read-only. No file modifications.
"""
from __future__ import annotations

import difflib
import hashlib
import json
import os
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).parent.parent
SHARED = REPO / "shared" / "web-core"
SITES = ["Dentists", "Property", "Medical", "Solicitors", "generalist"]

# Map from path-in-shared to path-in-site (relative to site's web/ dir)
# shared/web-core/components/forms/LeadForm.tsx  ->  web/src/components/forms/LeadForm.tsx
# shared/web-core/lib/schema.ts  ->  web/src/lib/schema.ts


def shared_to_site_path(shared_rel: Path) -> Path:
    """Convert shared/web-core/components/X/Y.tsx -> web/src/components/X/Y.tsx"""
    return Path("web") / "src" / shared_rel


def file_hash(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def line_diff_count(a: Path, b: Path) -> int:
    """Return count of line differences between two files."""
    try:
        a_lines = a.read_text(encoding="utf-8", errors="replace").splitlines()
        b_lines = b.read_text(encoding="utf-8", errors="replace").splitlines()
    except Exception:
        return -1
    diff = list(difflib.unified_diff(a_lines, b_lines, n=0))
    # Count +/- lines (skip hunk headers and file headers)
    return sum(1 for line in diff if line and line[0] in "+-" and not line.startswith(("+++", "---")))


def mtime(path: Path) -> datetime | None:
    try:
        return datetime.fromtimestamp(path.stat().st_mtime)
    except OSError:
        return None


def find_shared_files() -> list[Path]:
    """Return list of all .ts/.tsx files under shared/web-core/, relative to SHARED."""
    files: list[Path] = []
    for root, _, names in os.walk(SHARED):
        for name in names:
            if name.endswith((".ts", ".tsx")):
                full = Path(root) / name
                files.append(full.relative_to(SHARED))
    return sorted(files)


def main() -> None:
    if not SHARED.exists():
        print(f"ERROR: {SHARED} does not exist")
        return

    shared_files = find_shared_files()
    print(f"Found {len(shared_files)} files in shared/web-core/\n")

    results: list[dict] = []

    for rel in shared_files:
        shared_full = SHARED / rel
        shared_mtime = mtime(shared_full)
        shared_hash = file_hash(shared_full)

        per_site: dict[str, dict] = {}
        for site in SITES:
            site_full = REPO / site / shared_to_site_path(rel)
            if not site_full.exists():
                per_site[site] = {"status": "MISSING"}
                continue
            site_hash = file_hash(site_full)
            if site_hash == shared_hash:
                per_site[site] = {"status": "IDENTICAL"}
                continue
            line_diffs = line_diff_count(shared_full, site_full)
            site_m = mtime(site_full)
            newer = "site" if (site_m and shared_mtime and site_m > shared_mtime) else "shared"
            per_site[site] = {
                "status": "DIVERGED",
                "line_diffs": line_diffs,
                "site_mtime": site_m.isoformat() if site_m else None,
                "shared_mtime": shared_mtime.isoformat() if shared_mtime else None,
                "newer_side": newer,
            }

        results.append({
            "file": str(rel).replace("\\", "/"),
            "shared_hash": shared_hash[:8],
            "shared_mtime": shared_mtime.isoformat() if shared_mtime else None,
            "per_site": per_site,
        })

    # Console summary
    print("Per-file divergence summary (counts of D=Diverged / I=Identical / M=Missing):\n")
    header = f"{'File':<55} | {'D':>2} {'I':>2} {'M':>2} | per-site detail"
    print(header)
    print("-" * len(header))

    for r in results:
        d = sum(1 for s in r["per_site"].values() if s["status"] == "DIVERGED")
        i = sum(1 for s in r["per_site"].values() if s["status"] == "IDENTICAL")
        m = sum(1 for s in r["per_site"].values() if s["status"] == "MISSING")
        detail_bits = []
        for site in SITES:
            s = r["per_site"][site]
            if s["status"] == "DIVERGED":
                detail_bits.append(f"{site[:3]}={s.get('line_diffs', '?')}d({s.get('newer_side', '?')[0]})")
            elif s["status"] == "MISSING":
                detail_bits.append(f"{site[:3]}=miss")
            else:
                detail_bits.append(f"{site[:3]}=eq")
        print(f"{r['file']:<55} | {d:>2} {i:>2} {m:>2} | {' '.join(detail_bits)}")

    # Aggregate by site
    print("\nPer-site summary (which sites have the most divergence from shared/web-core/):")
    for site in SITES:
        diverged = sum(1 for r in results if r["per_site"][site]["status"] == "DIVERGED")
        identical = sum(1 for r in results if r["per_site"][site]["status"] == "IDENTICAL")
        missing = sum(1 for r in results if r["per_site"][site]["status"] == "MISSING")
        total_diff_lines = sum(
            r["per_site"][site].get("line_diffs", 0)
            for r in results
            if r["per_site"][site]["status"] == "DIVERGED"
            and isinstance(r["per_site"][site].get("line_diffs"), int)
            and r["per_site"][site]["line_diffs"] >= 0
        )
        print(f"  {site:<12}: {diverged} diverged ({total_diff_lines} line-diffs), {identical} identical, {missing} missing")

    # Save JSON
    out_json = REPO / "docs" / "phase2_shared_diff.json"
    out_json.write_text(json.dumps(results, indent=2, default=str), encoding="utf-8")
    print(f"\nFull JSON: {out_json}")


if __name__ == "__main__":
    main()
