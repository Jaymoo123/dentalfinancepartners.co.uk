"""ONS monthly construction output fetcher -- deferred placeholder.

TODO v2: ONS publishes construction output as XLSX only (series VABQ, all
work, current prices, SA). No stable CSV/JSON endpoint as of 2026-06.
Wire this once a machine-readable feed is available.

This module is the optional=True template: engine.py calls fetch() reflectively
and tolerates a None return when optional=True on the SecondarySource.
"""
from __future__ import annotations

from typing import Any

SERIES_REF = "VABQ -- All construction output, current prices, SA (ONS CGBR)"
STATUS = "deferred_v2"


def fetch(start_month: str | None = None) -> dict[str, Any] | None:  # noqa: ARG001
    """Returns None until ONS exposes a stable machine-readable endpoint."""
    return {
        "available": False,
        "series": SERIES_REF,
        "status": STATUS,
        "note": (
            "ONS publishes this data as XLSX only (no stable CSV or JSON endpoint "
            "available 2026-06). Monthly series will be populated in a future ingest "
            "pass once a machine-readable feed is available."
        ),
        "monthly": [],
    }
