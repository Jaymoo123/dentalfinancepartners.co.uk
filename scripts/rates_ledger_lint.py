"""Pre-attach rates-ledger lint (EXPANSION_PROGRAM.md pre-attach gate).

Usage: python scripts/rates_ledger_lint.py --site care [--site crypto ...] [--max-age-days 90]
No --site = all expansion sites. Exit 1 if any ERROR.
"""
import argparse
import datetime as dt
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPANSION_SITES = ["charities", "hospitality", "crypto", "pharmacies", "startups-tech", "care", "ecommerce"]
REQUIRED = {"key", "value", "unit", "applies_from", "source_url", "verified_at"}

# Estate ground truth (memory-banked FA 2026 figures). value comparisons are string-normalised.
GROUND_TRUTH = {
    "employer_nic_rate": "15",
    "employer_nic_secondary_threshold_annual": "5000",
    "employment_allowance": "10500",
}


def lint_site(site: str, max_age_days: int, today: dt.date) -> list[tuple[str, str]]:
    findings = []  # (level, msg)
    path = ROOT / "docs" / site / "rates_ledger.json"
    if not path.exists():
        return [("ERROR", f"{path.relative_to(ROOT)} missing")]
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [("ERROR", f"invalid JSON: {e}")]
    if not isinstance(data, list):
        return [("ERROR", "ledger is not a list")]

    seen = set()
    for i, entry in enumerate(data):
        label = entry.get("key", f"#{i}")
        missing = REQUIRED - set(entry)
        if missing:
            findings.append(("ERROR", f"{label}: missing fields {sorted(missing)}"))
            continue
        if label in seen:
            findings.append(("ERROR", f"{label}: duplicate key"))
        seen.add(label)
        for field in ("applies_from", "verified_at"):
            if field == "applies_from" and entry[field] == "historic":
                continue  # long-standing rule with no dated commencement
            try:
                d = dt.date.fromisoformat(entry[field])
            except ValueError:
                findings.append(("ERROR", f"{label}: {field} not ISO date: {entry[field]!r}"))
                continue
            if field == "verified_at" and (today - d).days > max_age_days:
                findings.append(("WARN", f"{label}: verified_at {d} older than {max_age_days}d, re-verify at source"))
        if not str(entry["source_url"]).startswith("https://"):
            findings.append(("WARN", f"{label}: source_url not https: {entry['source_url']}"))
        truth = GROUND_TRUTH.get(label)
        if truth is not None and str(entry["value"]).replace(",", "") != truth:
            findings.append(("ERROR", f"{label}: value {entry['value']} contradicts estate ground truth {truth}"))
    return findings


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", action="append")
    ap.add_argument("--max-age-days", type=int, default=90)
    args = ap.parse_args()
    sites = args.site or EXPANSION_SITES
    today = dt.date.today()
    errors = 0
    for site in sites:
        findings = lint_site(site, args.max_age_days, today)
        status = "CLEAN" if not findings else f"{len(findings)} finding(s)"
        print(f"== {site}: {status}")
        for level, msg in findings:
            print(f"  {level}: {msg}")
            errors += level == "ERROR"
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
