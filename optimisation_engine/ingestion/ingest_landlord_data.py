"""Landlord Tax Index data ingestion -- thin shim.

Delegates to the generalized research engine. Use:
  python -m optimisation_engine.ingestion.ingest_landlord_data --dry-run
  python -m optimisation_engine.ingestion.ingest_landlord_data --execute --no-supabase
  python -m optimisation_engine.ingestion.ingest_landlord_data --execute
"""
from __future__ import annotations

import sys
from optimisation_engine.ingestion.research import engine

# Remap legacy flags: this script has no --pilot / --site; inject them.
def main() -> None:
    # Insert --site property if not already present (legacy callers don't pass it)
    argv = sys.argv[1:]
    if "--site" not in argv:
        argv = ["--site", "property"] + argv
    sys.argv = [sys.argv[0]] + argv
    engine.main()

if __name__ == "__main__":
    main()
