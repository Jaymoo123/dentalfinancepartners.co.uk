"""Per-site shim. Canonical implementation lives in
optimisation_engine.indexing.submit_indexnow (centralised across all sites
2026-05-20 during Phase 3 of the multi-site infrastructure refactor).

Backwards-compatible interfaces preserved:
  - CLI:  `python Dentists/pipeline/submit_indexnow.py <urls>` keeps working
          (the --site flag is injected automatically)
  - Code: `from submit_indexnow import enqueue` keeps working
"""
from __future__ import annotations

import sys
from pathlib import Path

# Make the workspace root importable so we can reach optimisation_engine.
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from optimisation_engine.indexing.submit_indexnow import (
    enqueue as _enqueue,
    main as _central_main,
)

SITE_KEY = "dentists"


def enqueue(url: str) -> None:
    _enqueue(SITE_KEY, url)


def main() -> int:
    if "--site" not in sys.argv:
        sys.argv.insert(1, "--site")
        sys.argv.insert(2, SITE_KEY)
    return _central_main()


if __name__ == "__main__":
    sys.exit(main())
