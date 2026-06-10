"""Shared Supabase Management API utilities for the competitor module."""
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any

import httpx

ROOT = Path(__file__).resolve().parents[2]
try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def _sql(query: str, *, _retries: int = 4, _backoff: float = 2.0) -> list[dict]:
    """Execute raw SQL via Supabase Management API. Returns rows.

    Retries on 429 (rate limit) with exponential backoff.
    """
    headers = {
        "Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    for attempt in range(_retries + 1):
        r = httpx.post(MGMT_URL, headers=headers, json={"query": query}, timeout=60.0)
        if r.status_code == 429:
            retry_after = float(r.headers.get("Retry-After", _backoff * (2 ** attempt)))
            wait = min(retry_after, 60.0)
            print(f"  [_sql] 429 rate limit — waiting {wait:.0f}s (attempt {attempt+1}/{_retries+1})")
            time.sleep(wait)
            continue
        r.raise_for_status()
        return r.json()
    r.raise_for_status()
    return []


def _esc(v: Any) -> str:
    """Safely escape a scalar value for direct SQL interpolation."""
    if v is None:
        return "NULL"
    if isinstance(v, bool):
        return "TRUE" if v else "FALSE"
    if isinstance(v, (int, float)):
        return str(v)
    # String: escape single-quotes by doubling them
    return "'" + str(v).replace("'", "''") + "'"


def _arr(v: list | None) -> str:
    """Encode a list as a PostgreSQL TEXT[] literal."""
    if not v:
        return "ARRAY[]::TEXT[]"
    items = ", ".join("'" + str(i).replace("'", "''") + "'" for i in v)
    return f"ARRAY[{items}]"


def parse_llm_json(raw: str, label: str = "") -> dict | None:
    """Robustly parse a JSON string from a DeepSeek response.

    Handles:
    - Markdown code fences (```json ... ```)
    - Leading/trailing prose before/after the JSON object
    - Truncated or slightly malformed JSON (via json-repair)

    Returns None only if parsing completely fails.
    """
    import re as _re

    text = raw.strip()

    # Strip markdown fences
    if text.startswith("```"):
        text = _re.sub(r"^```(?:json)?\s*", "", text, flags=_re.MULTILINE)
        text = _re.sub(r"\s*```\s*$", "", text, flags=_re.MULTILINE)
        text = text.strip()

    # Extract first JSON object if there's surrounding prose
    m = _re.search(r"\{[\s\S]*\}", text)
    if m:
        text = m.group(0)

    # Try strict parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Fall back to json-repair for truncated/slightly malformed responses
    try:
        from json_repair import repair_json
        repaired = repair_json(text)
        result = json.loads(repaired)
        if label:
            print(f"  [parse_llm_json] {label}: used json-repair to fix malformed response")
        return result
    except Exception as exc:
        if label:
            print(f"  [parse_llm_json] {label}: could not parse JSON — {exc}")
            print(f"    Raw (first 200): {raw[:200]}")
        return None


def _jsonb(v: Any) -> str:
    """Encode a Python object as a PostgreSQL JSONB literal."""
    if v is None:
        return "NULL"
    raw = json.dumps(v, default=str).replace("'", "''")
    return f"'{raw}'::JSONB"
