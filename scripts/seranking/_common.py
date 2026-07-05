"""
Shared helpers for the SE Ranking analysis builders (LOCAL-ONLY).

Schema-independent utilities: scoring (reused from generalist/pipeline/
rescore_with_seranking.py), CSV writing, and DEFENSIVE raw-JSON readers. The
live Data API response schema is confirmed at the Day-0 gate; the readers here
try several common key shapes so the builders work regardless of which API
generation the trial exposes. Each builder prints how many records it extracted
so a zero indicates the field map needs a tweak against a gate sample.
"""
from __future__ import annotations

import csv
import json
import math
import re
from pathlib import Path
from typing import Any, Iterable, Optional

import sys

_ROOT = Path(__file__).resolve().parents[2]
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from optimisation_engine.clients.seranking_client import OUT_DIR, RAW_DIR  # noqa: E402

# --- scoring (identical formula to rescore_with_seranking.py) --------------- #
INTENT_WEIGHT = {"transactional": 1.6, "commercial": 1.4, "navigational": 1.2, "informational": 1.0}


def intent_weight(intent: Any) -> float:
    """Accept a word ('commercial') or SE Ranking code string ('C,T') or list."""
    if intent is None:
        return 1.0
    if isinstance(intent, (list, tuple)):
        intent = ",".join(str(x) for x in intent)
    s = str(intent).strip().lower()
    if s in INTENT_WEIGHT:
        return INTENT_WEIGHT[s]
    parts = {p.strip().upper() for p in re.split(r"[,/|]", s) if p.strip()}
    w = 1.0
    if "T" in parts: w = max(w, 1.6)
    if "C" in parts: w = max(w, 1.5)
    if "L" in parts: w = max(w, 1.4)
    if "N" in parts: w = max(w, 1.1)
    return w


def kw_score(sv: Optional[float], kd: Optional[float], intent: Any) -> Optional[float]:
    if sv is None or kd is None:
        return None
    if sv <= 0:
        return 0.0
    return round(math.sqrt(sv) * intent_weight(intent) / max(kd, 5), 3)


def score_to_priority(s: Optional[float]) -> Optional[int]:
    if s is None:
        return None
    if s >= 4: return 9
    if s >= 2: return 8
    if s >= 1: return 7
    if s >= 0.4: return 6
    if s >= 0.1: return 5
    return 4


def norm(s: Any) -> str:
    return re.sub(r"[^a-z0-9]+", " ", str(s or "").lower()).strip()


def domain_of(url: Any) -> str:
    s = str(url or "").strip().lower()
    s = re.sub(r"^https?://", "", s).split("/")[0]
    return s[4:] if s.startswith("www.") else s


# --- defensive raw readers -------------------------------------------------- #
def raw_files(slug_prefix: str) -> list[Path]:
    """All raw/ files whose name starts with the endpoint slug (e.g. 'domain_keywords')."""
    return sorted(RAW_DIR.glob(f"{slug_prefix}*.json"))


def latest_raw(slug_prefix: str) -> Optional[Path]:
    files = raw_files(slug_prefix)
    return files[-1] if files else None


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def records(data: Any) -> list[dict]:
    """Best-effort: locate the list-of-dict records inside a Data API response.

    Tries data itself, then common envelope keys. Returns [] if none found."""
    if isinstance(data, list):
        return [r for r in data if isinstance(r, dict)]
    if isinstance(data, dict):
        for k in ("data", "keywords", "result", "results", "items", "rows",
                  "refdomains", "backlinks", "organic", "competitors"):
            v = data.get(k)
            if isinstance(v, list) and v and isinstance(v[0], dict):
                return v
        # nested: data.data.items etc.
        for v in data.values():
            if isinstance(v, dict):
                inner = records(v)
                if inner:
                    return inner
    return []


def pick(d: dict, *keys: str, default=None):
    """First present, non-empty value among candidate keys (case-insensitive)."""
    lower = {k.lower(): v for k, v in d.items()}
    for k in keys:
        v = lower.get(k.lower())
        if v not in (None, "", []):
            return v
    return default


def to_num(v: Any) -> Optional[float]:
    if v is None or v == "":
        return None
    try:
        return float(str(v).replace(",", "").strip())
    except ValueError:
        return None


def to_int(v: Any) -> Optional[int]:
    n = to_num(v)
    return int(n) if n is not None else None


def write_csv(name: str, rows: list[dict], fieldnames: Optional[list[str]] = None) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / name
    if not rows:
        path.write_text("", encoding="utf-8")
        return path
    fieldnames = fieldnames or list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    return path


def gsc_property_positions() -> dict[str, dict]:
    """Live GSC positions for Property: {normalised_query: {pos, impressions}}.

    Used to UNION with SE Ranking's view (GSC catches long-tail SE Ranking
    misses) and to corroborate demand. Read-only; empty dict on any failure."""
    try:
        import httpx
        from optimisation_engine.config import SUPABASE_URL, SUPABASE_KEY
        headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
        out: dict[str, dict] = {}
        for site_col in ("property", "propertytaxpartners"):
            r = httpx.get(f"{SUPABASE_URL}/rest/v1/gsc_query_data", headers=headers,
                          params={"select": "query,position,impressions", "site_key": f"eq.{site_col}",
                                  "order": "impressions.desc", "limit": "5000"}, timeout=30.0)
            if r.status_code >= 300:
                continue
            for row in r.json():
                q = norm(row.get("query"))
                if not q:
                    continue
                pos = to_num(row.get("position"))
                cur = out.get(q)
                if cur is None or (pos is not None and pos < cur["pos"]):
                    out[q] = {"pos": pos, "impressions": to_int(row.get("impressions"))}
            if out:
                break
        return out
    except Exception:  # noqa: BLE001
        return {}
