"""Per-site shim. Canonical implementation lives in
optimisation_engine.indexing.submit_indexnow (centralised 2026-05-20).

2026-09-28 parity fix: this file was missing (brief section 5); HOST and KEY
for "hospitality" already exist in optimisation_engine/indexing/config.py
(the key file at web/public/8a4e41b245878dc7f01421815bfda448.txt matches), so
this is Property's shim with SITE_KEY swapped, no new key generated.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from optimisation_engine.indexing.submit_indexnow import (
    enqueue as _enqueue,
    main as _central_main,
)

SITE_KEY = "hospitality"


def enqueue(url: str) -> None:
    _enqueue(SITE_KEY, url)


def main() -> int:
    if "--site" not in sys.argv:
        sys.argv.insert(1, "--site")
        sys.argv.insert(2, SITE_KEY)
    return _central_main()


if __name__ == "__main__":
    sys.exit(main())
