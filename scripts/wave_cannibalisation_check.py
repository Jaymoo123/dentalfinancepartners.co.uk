"""Site-neutral entry point for the wave cannibalisation check.

The implementation in ``property_wave_cannibalisation_check.py`` is already
site-generic (it reads ``sites/<site>.json`` via ``--site`` and computes
Jaccard overlap of the wave picks against that site's live blog inventory).
This thin wrapper exposes it under a site-neutral filename so
``check-cannib.ps1`` can run it for any site (dentists, medical, ...) without
a per-site clone of the logic.

Usage:
    python scripts/wave_cannibalisation_check.py --site dentists --wave 1
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from property_wave_cannibalisation_check import main  # noqa: E402

if __name__ == "__main__":
    raise SystemExit(main())
