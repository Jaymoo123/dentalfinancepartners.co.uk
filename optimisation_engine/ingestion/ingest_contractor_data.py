"""UK Contractor Index data ingestion -- thin shim.

Delegates to the generalized research engine. Use:
  python -m optimisation_engine.ingestion.ingest_contractor_data --dry-run
  python -m optimisation_engine.ingestion.ingest_contractor_data --execute --no-supabase
  python -m optimisation_engine.ingestion.ingest_contractor_data --execute
"""
from __future__ import annotations

import sys
from optimisation_engine.ingestion.research import engine


def main() -> None:
    argv = sys.argv[1:]
    if "--site" not in argv:
        argv = ["--site", "contractors-ir35"] + argv
    sys.argv = [sys.argv[0]] + argv
    engine.main()


if __name__ == "__main__":
    main()
