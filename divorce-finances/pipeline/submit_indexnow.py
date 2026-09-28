"""Per-site shim. Canonical implementation lives in
optimisation_engine.indexing.submit_indexnow (centralised 2026-05-20).

HOST and KEY are not here: they live in optimisation_engine/indexing/config.py
under this SITE_KEY ("www.divorcefinancespecialists.co.uk" /
4d2abeb261e1ca7875c6f16ee1257ac4, served from web/public/).
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from optimisation_engine.indexing.submit_indexnow import (
    enqueue as _enqueue,
    main as _central_main,
)

SITE_KEY = "divorce-finances"


def enqueue(url: str) -> None:
    _enqueue(SITE_KEY, url)


def main() -> int:
    if "--site" not in sys.argv:
        sys.argv.insert(1, "--site")
        sys.argv.insert(2, SITE_KEY)
    return _central_main()


if __name__ == "__main__":
    sys.exit(main())
