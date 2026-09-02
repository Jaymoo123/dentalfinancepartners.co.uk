"""Companies House bulk-snapshot regional SPV data fetcher.

Reads the committed `Property/web/src/data/spv-regional.json` (built by
`optimisation_engine.ingestion.research.ch_bulk`) and returns its content.
Never raises: returns {} with a "status": "missing" note if the file is
absent or unreadable, matching the land_registry fetcher's tolerant contract.
"""
from __future__ import annotations

import json
import os
from typing import Any

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
SPV_REGIONAL_PATH = os.path.join(REPO_ROOT, "Property", "web", "src", "data", "spv-regional.json")


def fetch_ch_bulk_regional(start_month: str | None = None) -> dict[str, Any]:
    """Return the spv-regional.json content, or {} + status note if missing."""
    try:
        with open(SPV_REGIONAL_PATH, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"status": "missing", "note": f"spv-regional.json not found at {SPV_REGIONAL_PATH}"}
    except Exception as e:
        return {"status": "missing", "note": f"spv-regional.json unreadable: {e}"}


# Name used by the property niche config's SecondarySource dotted path.
fetch_regional = fetch_ch_bulk_regional
