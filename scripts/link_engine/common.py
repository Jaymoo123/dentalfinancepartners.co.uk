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
import gzip
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
    if endpoint.endswith("ranked_keywords/live"):
        return sum(0.01 + 0.0001 * int(t.get("limit", 100)) for t in payload)
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


def _dfs_post_raw(endpoint: str, payload: list[dict], site: str, run: str) -> dict:
    """POST a paid DataForSEO call. Local disk mirror -> hard stop -> call -> ledger. (Use dfs_post, which checks the store first.)

    Returns the full response body. Mirror hits cost 0 and are logged.
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


# ----- persistent per-keyword store -----------------------------------------
# docs/_engines/link_engine_store/ is committed and append-only. It is the source of truth for paid
# DataForSEO data; .cache/ above is only a fast local mirror. Google Ads volume/CPC for a UK keyword is
# the same whichever site asks, so the store is estate-wide.

STORE = REPO / "docs" / "_engines" / "link_engine_store"
SV = "keywords_data/google_ads/search_volume/live"
SERP = "serp/google/organic/live/advanced"
IDEAS = "dataforseo_labs/google/keyword_ideas/live"
RANKED = "dataforseo_labs/google/ranked_keywords/live"
KM_FIELDS = ["keyword", "location_code", "language_code", "search_volume", "cpc", "competition", "competition_index",
             "monthly_searches", "endpoint", "fetched_on", "source_response_sha256"]
SERP_FIELDS = ["keyword", "location", "device", "fetched_on", "path", "n_results"]
RANKED_FIELDS = ["key_sha1", "target", "filters", "location", "language", "limit", "fetched_on", "path", "n_items"]
IDEAS_FIELDS = ["seeds_sha1", "n_seeds", "location", "language", "limit", "fetched_on", "path", "n_items"]


def _csv_append(path: Path, fields: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    new = not path.exists()
    with path.open("a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        if new:
            w.writeheader()
        w.writerows(rows)


def _csv_rows(path: Path) -> list[dict]:
    return read_csv(path) if path.exists() else []


def _age_ok(fetched_on: str, max_age_days: int) -> bool:
    try:
        return (date.today() - date.fromisoformat(fetched_on[:10])).days <= max_age_days
    except ValueError:
        return False


def store_lookup(keywords: list[str], max_age_days: int = CACHE_MAX_AGE_DAYS, location_code: int = UK_LOCATION,
                 language_code: str = LANG, endpoint: str = SV) -> tuple[dict, list[str]]:
    """Per-keyword store lookup. Returns (have {keyword: latest row}, need [keywords with no fresh row]).

    Only rows from `endpoint` (Google Ads search_volume by default) count: legacy rows are reference only."""
    latest: dict[str, dict] = {}
    for r in _csv_rows(STORE / "keyword_metrics.csv"):
        if (r["endpoint"] == endpoint and r["location_code"] == str(location_code) and r["language_code"] == language_code
                and _age_ok(r["fetched_on"], max_age_days)):
            if r["keyword"] not in latest or r["fetched_on"] >= latest[r["keyword"]]["fetched_on"]:
                latest[r["keyword"]] = r
    seen, have, need = set(), {}, []
    for k in keywords:
        k = norm_query(k)
        if not k or k in seen:
            continue
        seen.add(k)
        if k in latest:
            have[k] = latest[k]
        else:
            need.append(k)
    return have, need


def _sv_item(r: dict) -> dict:
    """Rebuild an API-shaped search_volume item from a store row."""
    num = lambda v, t: t(float(v)) if v not in ("", None) else None
    return {"keyword": r["keyword"], "location_code": int(r["location_code"]), "language_code": r["language_code"],
            "search_volume": num(r["search_volume"], int), "cpc": num(r["cpc"], float), "competition": r["competition"] or None,
            "competition_index": num(r["competition_index"], int),
            "monthly_searches": json.loads(r["monthly_searches"]) if r["monthly_searches"] else []}


def _sv_rows(body: dict, fetched_on: str, src_sha: str, endpoint: str = SV) -> list[dict]:
    rows = []
    for t in body.get("tasks") or []:
        for it in t.get("result") or []:
            if "keyword" not in it:
                continue
            rows.append({"keyword": norm_query(it["keyword"]), "location_code": it.get("location_code", UK_LOCATION),
                         "language_code": it.get("language_code", LANG),
                         "search_volume": "" if it.get("search_volume") is None else it["search_volume"],
                         "cpc": "" if it.get("cpc") is None else it["cpc"], "competition": it.get("competition") or "",
                         "competition_index": "" if it.get("competition_index") is None else it["competition_index"],
                         "monthly_searches": json.dumps((it.get("monthly_searches") or [])[:12], separators=(",", ":")),
                         "endpoint": endpoint, "fetched_on": fetched_on, "source_response_sha256": src_sha})
    return rows


def _gz_write(path: Path, body: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(path, "wt", encoding="utf-8") as f:
        json.dump(body, f, separators=(",", ":"))


def _gz_read(path: Path) -> dict:
    with gzip.open(path, "rt", encoding="utf-8") as f:
        return json.load(f)


def serp_key(keyword: str, location_code: int, device: str) -> str:
    return hashlib.sha1(f"{norm_query(keyword)}|{location_code}|{device}".encode()).hexdigest()


def serp_store_path(keyword: str, location_code: int, device: str, fetched_on: str) -> Path:
    return STORE / "serp" / fetched_on[:7] / f"{serp_key(keyword, location_code, device)}.json.gz"


def serp_store_lookup(keywords: list[str], max_age_days: int = CACHE_MAX_AGE_DAYS, location_code: int = UK_LOCATION,
                      device: str = "desktop") -> tuple[dict, list[str]]:
    """(have {keyword: store path}, need [keywords]) for SERP pulls."""
    latest = {}
    for r in _csv_rows(STORE / "serp_index.csv"):
        if r["location"] == str(location_code) and r["device"] == device and _age_ok(r["fetched_on"], max_age_days):
            if r["keyword"] not in latest or r["fetched_on"] >= latest[r["keyword"]]["fetched_on"]:
                latest[r["keyword"]] = r
    have, need, seen = {}, [], set()
    for k in keywords:
        k = norm_query(k)
        if k in seen or not k:
            continue
        seen.add(k)
        if k in latest and (REPO / latest[k]["path"]).exists():
            have[k] = REPO / latest[k]["path"]
        else:
            need.append(k)
    return have, need


def serp_store_write(keyword: str, location_code: int, device: str, body: dict, fetched_on: str) -> Path:
    p = serp_store_path(keyword, location_code, device, fetched_on)
    _gz_write(p, body)
    n = sum(1 for t in body.get("tasks") or [] for res in t.get("result") or [] for i in res.get("items") or []
            if i.get("type") == "organic")
    _csv_append(STORE / "serp_index.csv", SERP_FIELDS, [{"keyword": norm_query(keyword), "location": location_code, "device": device,
                "fetched_on": fetched_on, "path": str(p.relative_to(REPO)).replace("\\", "/"), "n_results": n}])
    return p


def ideas_key(seeds: list[str], location_code: int, language_code: str, limit: int) -> str:
    return hashlib.sha1(("|".join(sorted(norm_query(s) for s in seeds)) + f"|{location_code}|{language_code}|{limit}").encode()).hexdigest()


def ideas_store_lookup(task: dict):
    """Stored keyword_ideas body for this seed set (within 90 days), else None."""
    k = ideas_key(task["keywords"], task.get("location_code", UK_LOCATION), task.get("language_code", LANG), int(task.get("limit", 100)))
    for r in reversed(_csv_rows(STORE / "keyword_ideas_index.csv")):
        if r["seeds_sha1"] == k and _age_ok(r["fetched_on"], CACHE_MAX_AGE_DAYS) and (REPO / r["path"]).exists():
            return _gz_read(REPO / r["path"])
    return None


def ideas_store_write(task: dict, body: dict, fetched_on: str) -> None:
    loc, lang, lim = task.get("location_code", UK_LOCATION), task.get("language_code", LANG), int(task.get("limit", 100))
    k = ideas_key(task["keywords"], loc, lang, lim)
    p = STORE / "keyword_ideas" / f"{k}.json.gz"
    _gz_write(p, body)
    n = sum(len(res.get("items") or []) for t in body.get("tasks") or [] for res in t.get("result") or [])
    _csv_append(STORE / "keyword_ideas_index.csv", IDEAS_FIELDS, [{"seeds_sha1": k, "n_seeds": len(task["keywords"]), "location": loc,
                "language": lang, "limit": lim, "fetched_on": fetched_on, "path": str(p.relative_to(REPO)).replace("\\", "/"),
                "n_items": n}])


def ranked_key(task: dict) -> str:
    spec = {k: task.get(k) for k in ("target", "filters", "limit", "offset", "order_by")}
    spec["loc"], spec["lang"] = task.get("location_code", UK_LOCATION), task.get("language_code", LANG)
    return hashlib.sha1(json.dumps(spec, sort_keys=True).encode()).hexdigest()


def ranked_store_lookup(task: dict):
    """Stored ranked_keywords body for this exact task (within 90 days), else None."""
    k = ranked_key(task)
    for r in reversed(_csv_rows(STORE / "ranked_keywords_index.csv")):
        if r["key_sha1"] == k and _age_ok(r["fetched_on"], CACHE_MAX_AGE_DAYS) and (REPO / r["path"]).exists():
            return _gz_read(REPO / r["path"])
    return None


def ranked_store_write(task: dict, body: dict, fetched_on: str) -> None:
    k = ranked_key(task)
    p = STORE / "ranked_keywords" / f"{k}.json.gz"
    _gz_write(p, body)
    n = sum(len(res.get("items") or []) for t in body.get("tasks") or [] for res in t.get("result") or [])
    _csv_append(STORE / "ranked_keywords_index.csv", RANKED_FIELDS, [{"key_sha1": k, "target": task.get("target"),
                "filters": json.dumps(task.get("filters")), "location": task.get("location_code", UK_LOCATION),
                "language": task.get("language_code", LANG), "limit": task.get("limit"), "fetched_on": fetched_on,
                "path": str(p.relative_to(REPO)).replace("\\", "/"), "n_items": n}])


def dfs_post(endpoint: str, payload: list[dict], site: str, run: str) -> dict:
    """Paid DataForSEO call, store first. Per keyword for search_volume and serp, per seed set for keyword_ideas:
    (a) look the keyword up in the committed store, (b) send only what is missing, (c) append the paid result to
    the store immediately, before the caller processes it (a crash cannot lose paid data), (d) ledger as usual
    (store hits are logged as cache hits at cost 0). The call still obeys the $5 run cap via _dfs_post_raw."""
    today = date.today().isoformat()
    if endpoint == SV:
        items, status_body = [], None
        for task in payload:
            loc, lang = task.get("location_code", UK_LOCATION), task.get("language_code", LANG)
            have, need = store_lookup(task["keywords"], location_code=loc, language_code=lang)
            if have:
                _ledger_append(site, run, endpoint, len(have), 0.0, True)
                items += [_sv_item(r) for r in have.values()]
            if need:
                body = _dfs_post_raw(endpoint, [{**task, "keywords": need}], site, run)
                if body.get("status_code") != 20000:
                    return body
                raw = json.dumps(body, sort_keys=True)
                rows = _sv_rows(body, today, hashlib.sha256(raw.encode()).hexdigest())
                got = {r["keyword"] for r in rows}
                rows += [{"keyword": k, "location_code": loc, "language_code": lang, "search_volume": "", "cpc": "",
                          "competition": "", "competition_index": "", "monthly_searches": "", "endpoint": endpoint,
                          "fetched_on": today, "source_response_sha256": hashlib.sha256(raw.encode()).hexdigest()}
                         for k in need if k not in got]            # asked and not returned: record it, never re-buy
                _csv_append(STORE / "keyword_metrics.csv", KM_FIELDS, rows)       # append first, process later
                items += [it for t in body.get("tasks") or [] for it in t.get("result") or []]
                status_body = body
        return {"status_code": 20000, "status_message": "Ok. (assembled from store + live)",
                "tasks": [{"status_code": 20000, "path": ["v3"] + SV.split("/"), "result": items}],
                "cost": (status_body or {}).get("cost", 0)}
    if endpoint == SERP:
        tasks = []
        for task in payload:
            loc, dev = task.get("location_code", UK_LOCATION), task.get("device", "desktop")
            have, need = serp_store_lookup([task["keyword"]], location_code=loc, device=dev)
            if have:
                _ledger_append(site, run, endpoint, 1, 0.0, True)
                body = _gz_read(next(iter(have.values())))
            else:
                body = _dfs_post_raw(endpoint, [task], site, run)
                if body.get("status_code") == 20000:
                    serp_store_write(task["keyword"], loc, dev, body, today)
            tasks += body.get("tasks") or []
            last = body
        return last if len(payload) == 1 else {**last, "tasks": tasks}
    if endpoint == IDEAS and len(payload) == 1:
        body = ideas_store_lookup(payload[0])
        if body is not None:
            _ledger_append(site, run, endpoint, len(payload[0]["keywords"]), 0.0, True)
            return body
        body = _dfs_post_raw(endpoint, payload, site, run)
        if body.get("status_code") == 20000:
            ideas_store_write(payload[0], body, today)
        return body
    if endpoint == RANKED and len(payload) == 1:
        body = ranked_store_lookup(payload[0])
        if body is not None:
            _ledger_append(site, run, endpoint, int(payload[0].get("limit", 100)), 0.0, True)
            return body
        body = _dfs_post_raw(endpoint, payload, site, run)
        if body.get("status_code") == 20000:
            ranked_store_write(payload[0], body, today)       # append first, process later
        return body
    return _dfs_post_raw(endpoint, payload, site, run)


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
