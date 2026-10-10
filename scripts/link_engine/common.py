"""Shared helpers for the link engine (commercial keyword demand map).

Purpose: site config, run directories, CSV + sidecar meta writing, a cached and
budget-capped DataForSEO wrapper, GSC and Bing clients.
Cost: free by itself. dfs_post() is the only paid path; every call is cached on
disk (.cache/link_engine/dfs, 90 day reuse), appended to the run's
dfs_spend_ledger.csv, and refused if it would take run spend over RUN_CAP_USD.
Does not import optimisation_engine (that needs SUPABASE_URL/KEY).
"""
from __future__ import annotations

import base64
import csv
import hashlib
import json
import os
import re
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import httpx

REPO = Path(__file__).resolve().parents[2]
CACHE_DIR = REPO / ".cache" / "link_engine" / "dfs"
CACHE_MAX_AGE_DAYS = 90
RUN_CAP_USD = 5.00
DFS_BASE = "https://api.dataforseo.com/v3"
UK_LOCATION = 2826
LANG = "en"
BING_BASE = "https://ssl.bing.com/webmaster/api.svc/json"
LEDGER_FIELDS = ["ts", "endpoint", "n_items", "cost_usd", "cache_hit"]


class SpendCapError(RuntimeError):
    """Raised before a paid call that would push run spend over RUN_CAP_USD."""


# ----- config / paths ------------------------------------------------------

def load_site(site: str) -> dict:
    """sites/<site>.json merged with the link_engine block from scripts/link_engine/sites/<site>.json."""
    cfg = json.loads((REPO / "sites" / f"{site}.json").read_text(encoding="utf-8-sig"))
    le = json.loads((Path(__file__).parent / "sites" / f"{site}.json").read_text(encoding="utf-8"))
    cfg["link_engine"] = le["link_engine"]
    return cfg


def run_date(run: str) -> date:
    """Run names are ISO dates (2026-10-10)."""
    return date.fromisoformat(run[:10])


def run_dir(site: str, run: str) -> Path:
    d = REPO / "docs" / site / "link_engine" / run
    (d / "inputs").mkdir(parents=True, exist_ok=True)
    (d / "stages").mkdir(parents=True, exist_ok=True)
    return d


def norm_query(q: str) -> str:
    """Lowercase, strip punctuation except hyphen, collapse spaces."""
    q = re.sub(r"[^\w\s-]", " ", str(q or "").lower())
    return re.sub(r"\s+", " ", q).strip()


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# ----- output files --------------------------------------------------------

def sha256_file(path: Path) -> str:
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def write_csv(path, rows: list[dict], fieldnames: list[str], meta: dict) -> dict:
    """Write rows to path and a sidecar <path>.meta.json.

    meta should carry source, site, data_through, script, args (and window if any).
    rows, sha256 and pulled_at are filled here.
    """
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    full = {"pulled_at": now_utc(), **meta, "rows": len(rows), "sha256": sha256_file(path)}
    Path(str(path) + ".meta.json").write_text(json.dumps(full, indent=2, default=str), encoding="utf-8")
    return full


def read_csv(path) -> list[dict]:
    with Path(path).open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def script_meta() -> dict:
    return {"script": Path(sys.argv[0]).name, "args": sys.argv[1:]}


# ----- DataForSEO ----------------------------------------------------------

def _dfs_headers() -> dict:
    login, pw = os.environ.get("DATAFORSEO_API_LOGIN"), os.environ.get("DATAFORSEO_API_PASSWORD")
    if not login or not pw:
        raise RuntimeError("DATAFORSEO_API_LOGIN / DATAFORSEO_API_PASSWORD not set")
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    return {"Authorization": f"Basic {tok}", "Content-Type": "application/json"}


def dfs_balance() -> dict:
    """GET appendix/user_data (free). Returns {balance, currency, ts}."""
    r = httpx.get(f"{DFS_BASE}/appendix/user_data", headers=_dfs_headers(), timeout=60)
    r.raise_for_status()
    res = (r.json().get("tasks") or [{}])[0].get("result") or [{}]
    money = res[0].get("money") or {}
    return {"balance": money.get("balance"), "currency": money.get("currency", "USD"), "ts": now_utc()}


def estimate_cost(endpoint: str, payload: list[dict]) -> float:
    """Pre-call estimate in USD, from the agreed rate card."""
    if endpoint.endswith("search_volume/live"):
        # observed 2026-10-10: 416 keywords billed $0.09 => ~$0.075 + $0.00004/kw; use 0.0001 to stay conservative
        return sum(0.075 + 0.0001 * len(t.get("keywords", [])) for t in payload)
    if endpoint.endswith(("keyword_ideas/live", "keyword_suggestions/live")):
        return sum(0.01 + 0.0001 * int(t.get("limit", 100)) for t in payload)
    if "serp/google/organic" in endpoint:
        return 0.002 * len(payload)
    raise ValueError(f"no cost estimate for endpoint {endpoint}")


def _n_items(endpoint: str, payload: list[dict]) -> int:
    if endpoint.endswith("search_volume/live"):
        return sum(len(t.get("keywords", [])) for t in payload)
    if endpoint.endswith("keyword_ideas/live"):
        return sum(len(t.get("keywords", [])) for t in payload)
    return len(payload)


def ledger_path(site: str, run: str) -> Path:
    return run_dir(site, run) / "dfs_spend_ledger.csv"


def run_spend(site: str, run: str) -> float:
    p = ledger_path(site, run)
    return round(sum(float(r["cost_usd"] or 0) for r in read_csv(p)), 6) if p.exists() else 0.0


def _ledger_append(site: str, run: str, endpoint: str, n_items: int, cost: float, hit: bool) -> None:
    p = ledger_path(site, run)
    new = not p.exists()
    with p.open("a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new:
            w.writerow(LEDGER_FIELDS)
        w.writerow([now_utc(), endpoint, n_items, cost, hit])


def dfs_cache_get(endpoint: str, payload: list[dict]):
    """Cached response body for this exact endpoint+payload within CACHE_MAX_AGE_DAYS, else None. Free, not ledgered."""
    key = hashlib.sha256((endpoint + json.dumps(payload, sort_keys=True)).encode()).hexdigest()
    cp = CACHE_DIR / f"{key}.json"
    if cp.exists() and datetime.now().timestamp() - cp.stat().st_mtime < CACHE_MAX_AGE_DAYS * 86400:
        return json.loads(cp.read_text(encoding="utf-8"))
    return None


def dfs_post(endpoint: str, payload: list[dict], site: str, run: str) -> dict:
    """POST a paid DataForSEO call. Cache -> hard stop -> call -> ledger.

    Returns the full response body. Cache hits cost 0 and are logged.
    """
    key = hashlib.sha256((endpoint + json.dumps(payload, sort_keys=True)).encode()).hexdigest()
    cp = CACHE_DIR / f"{key}.json"
    n = _n_items(endpoint, payload)
    if cp.exists() and datetime.now().timestamp() - cp.stat().st_mtime < CACHE_MAX_AGE_DAYS * 86400:
        _ledger_append(site, run, endpoint, n, 0.0, True)
        return json.loads(cp.read_text(encoding="utf-8"))
    est = estimate_cost(endpoint, payload)
    spent = run_spend(site, run)
    if spent + est > RUN_CAP_USD:
        raise SpendCapError(f"abort: spent {spent:.4f} + est {est:.4f} > cap {RUN_CAP_USD:.2f}")
    r = httpx.post(f"{DFS_BASE}/{endpoint}", headers=_dfs_headers(), json=payload, timeout=180)
    r.raise_for_status()
    body = r.json()
    cost = float(body.get("cost") or 0)
    _ledger_append(site, run, endpoint, n, cost, False)
    if body.get("status_code") == 20000:
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        cp.write_text(json.dumps(body), encoding="utf-8")
    return body


# ----- Google Search Console -----------------------------------------------

def gsc_service():
    """Search Console API client (webmasters.readonly), service account from env GSC_SERVICE_ACCOUNT_JSON."""
    from googleapiclient.discovery import build
    scopes = ["https://www.googleapis.com/auth/webmasters.readonly"]
    creds = None
    try:
        sys.path.insert(0, str(REPO))
        from agents.utils.gsc_client_oauth import service_account_credentials
        creds = service_account_credentials(scopes)
    except Exception:
        creds = None
    if creds is None:
        from google.oauth2 import service_account
        creds = service_account.Credentials.from_service_account_info(
            json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"]), scopes=scopes)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


# ----- Bing Webmaster ------------------------------------------------------

def bing_get(method: str, **params):
    """GET a Bing Webmaster JSON method; returns the unwrapped 'd' payload."""
    key = os.environ.get("BING_WEBMASTER_API_KEY")
    if not key:
        raise RuntimeError("BING_WEBMASTER_API_KEY not set")
    r = httpx.get(f"{BING_BASE}/{method}", params={**params, "apikey": key}, timeout=60)
    r.raise_for_status()
    data = r.json()
    return data.get("d", data) if isinstance(data, dict) else data


def bing_date(v) -> str:
    """Bing '/Date(1700000000000)/' -> ISO date."""
    m = re.search(r"-?\d+", str(v or ""))
    return datetime.fromtimestamp(int(m.group()) / 1000, timezone.utc).date().isoformat() if m else ""
