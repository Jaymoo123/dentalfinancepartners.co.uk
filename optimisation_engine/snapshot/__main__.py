"""CLI entry point: python -m optimisation_engine.snapshot --site property"""
import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.snapshot import run_snapshot


def main() -> None:
    p = argparse.ArgumentParser(
        description="Generate a site health snapshot in Google Sheets."
    )
    p.add_argument("--site", required=True, help="Site key, e.g. property")
    args = p.parse_args()
    run_snapshot(args.site)


if __name__ == "__main__":
    main()
