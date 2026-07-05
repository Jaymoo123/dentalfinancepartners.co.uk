"""
SE Ranking API client — LOCAL-ONLY, credit-disciplined (7-day trial kit).

Modeled on optimisation_engine/clients/dataforseo_client.py, but with two
deliberate differences for the trial:

  1. No Supabase. The DataForSEO client gates spend through CostTracker.guard
     (which writes pending/success rows to api_cost_log in Supabase). SE Ranking
     is credit-metered and this trial is local-only, so we replace that with:
       * a JSON credit ledger  ->  briefs/property/seranking/_credit_ledger.json
       * a JSON idempotency cache -> briefs/property/seranking/_idem_cache.json
       * a hard SERANKING_CREDIT_CEILING gate
     Every raw response is also saved to briefs/property/seranking/raw/ so all
     downstream analysis is free and re-runnable, and survives trial expiry.

  2. Endpoint paths are gate-discovered. The May trial used the legacy /v1
     research API; the current docs describe a newer /data API. We do NOT know
     which generation this trial exposes (and the May token is dead -> 403), so
     paths live in one ENDPOINTS registry and the Day-0 gate (run_extraction
     --phase gate) probes the live API, confirms the working shape, and dumps
     sample responses. Correct ENDPOINTS here if the gate reports different paths.

Auth (confirmed from prior trial): header  Authorization: Token <KEY>
Base URL: https://api.seranking.com
"""
from __future__ import annotations

import hashlib
import json
import os
from datetime import date, datetime
from pathlib import Path
from typing import Any, Optional

import httpx

from optimisation_engine.config import (
    ROOT,
    SERANKING_API_TOKEN,
    SERANKING_BASE_URL,
    SERANKING_COSTS,
    SERANKING_CREDIT_CEILING,
    SERANKING_SYSTEM_UK,
)

# --------------------------------------------------------------------------- #
# Local storage layout (all outputs are permanent, on-disk artefacts)
# --------------------------------------------------------------------------- #
OUT_DIR = ROOT / "briefs" / "property" / "seranking"
RAW_DIR = OUT_DIR / "raw"
LEDGER_PATH = OUT_DIR / "_credit_ledger.json"
IDEM_PATH = OUT_DIR / "_idem_cache.json"


def _ensure_dirs() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)


# --------------------------------------------------------------------------- #
# Exceptions (mirror cost_tracker.py's BudgetExceeded / IdempotencyHit)
# --------------------------------------------------------------------------- #
class SerankingError(RuntimeError):
    """Generic SE Ranking API failure."""


class NoAccess(SerankingError):
    """403 / 401 — token invalid, expired, or feature not in this plan."""


class BudgetExceeded(SerankingError):
    """A call would push cumulative credit spend over SERANKING_CREDIT_CEILING."""


class IdempotencyHit(SerankingError):
    """This exact call already succeeded today (cached) — refused to re-bill."""


# --------------------------------------------------------------------------- #
# Endpoint registry — short-name -> (method, path, kind).
# `path` is relative to SERANKING_BASE_URL. Confirm/correct at the Day-0 gate.
# `kind`: "data" (credit-metered Data API), "legacy" (/v1 research),
#         "project" (rank tracker / audit), "free" (no credits).
# --------------------------------------------------------------------------- #
ENDPOINTS: dict[str, dict[str, str]] = {
    # --- account (free) ---
    "account/balance":      {"method": "GET", "path": "/data/account/limits",        "kind": "free"},
    # --- Data API: domain analysis (flat 100 cr / request) ---
    "domain/keywords":      {"method": "GET", "path": "/data/domain/keywords",        "kind": "data"},
    "domain/competitors":   {"method": "GET", "path": "/data/domain/competitors",     "kind": "data"},
    "domain/overview":      {"method": "GET", "path": "/data/domain/overview",        "kind": "data"},
    # --- Data API: keyword research (per-record) ---
    "keywords/export":      {"method": "GET", "path": "/data/keywords/export",        "kind": "data"},
    "keywords/related":     {"method": "GET", "path": "/data/keywords/related",       "kind": "data"},
    "keywords/similar":     {"method": "GET", "path": "/data/keywords/similar",       "kind": "data"},
    "keywords/questions":   {"method": "GET", "path": "/data/keywords/questions",     "kind": "data"},
    "keywords/longtail":    {"method": "GET", "path": "/data/keywords/longtail",      "kind": "data"},
    # --- Data API: backlinks ---
    "backlinks/summary":    {"method": "GET", "path": "/data/backlinks/summary",      "kind": "data"},
    "backlinks/all":        {"method": "GET", "path": "/data/backlinks/all",          "kind": "data"},
    "backlinks/refdomains": {"method": "GET", "path": "/data/backlinks/refdomains",   "kind": "data"},
    # --- Data API: AI search citations ---
    "ai/overview":          {"method": "GET", "path": "/data/ai/overview",            "kind": "data"},
    # --- legacy /v1 research (the May-trial shape; kept as a fallback) ---
    "legacy/similar":       {"method": "GET", "path": "/v1/keywords/similar",         "kind": "legacy"},
    "legacy/questions":     {"method": "GET", "path": "/v1/keywords/questions",       "kind": "legacy"},
    # --- Project API: rank tracker + audit (Tier-2; confirm shapes at gate) ---
    "project/list":         {"method": "GET",  "path": "/v1/projects",                "kind": "project"},
    "project/create":       {"method": "POST", "path": "/v1/projects",                "kind": "project"},
    "project/positions":    {"method": "GET",  "path": "/v1/projects/{pid}/positions","kind": "project"},
    "audit/create":         {"method": "POST", "path": "/v1/audit",                   "kind": "project"},
    "audit/report":         {"method": "GET",  "path": "/v1/audit/{aid}/report",      "kind": "project"},
}

# Candidate path prefixes the gate will probe if the defaults 403/404. SE Ranking
# has shipped several API generations; one of these usually answers.
GATE_PREFIX_CANDIDATES = ["/data", "", "/research", "/v1", "/v2"]


# --------------------------------------------------------------------------- #
# Credit estimation (same shape as DataForSEO _estimate_cost)
# --------------------------------------------------------------------------- #
def estimate_credits(short_name: str, expected_rows: int = 0) -> int:
    cfg = SERANKING_COSTS.get(short_name)
    if cfg is None:
        for k, v in SERANKING_COSTS.items():
            if short_name.endswith(k):
                cfg = v
                break
    if cfg is None:
        # Unknown endpoint: assume a flat 100 so we never under-budget a surprise.
        cfg = {"base": 100, "per_row": 0}
    return int(cfg["base"]) + int(cfg["per_row"]) * int(expected_rows or 0)


# --------------------------------------------------------------------------- #
# Local ledger + idempotency (replace Supabase api_cost_log)
# --------------------------------------------------------------------------- #
def _load_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _ledger() -> list[dict]:
    return _load_json(LEDGER_PATH, [])


def ledger_total() -> int:
    """Cumulative credits actually spent (successful, non-free calls)."""
    return sum(int(r.get("credits") or 0) for r in _ledger() if r.get("status") == "success")


def _append_ledger(row: dict) -> None:
    _ensure_dirs()
    rows = _ledger()
    rows.append(row)
    LEDGER_PATH.write_text(json.dumps(rows, indent=2), encoding="utf-8")


def _idem_cache() -> dict:
    return _load_json(IDEM_PATH, {})


def _save_idem(key: str, entry: dict) -> None:
    _ensure_dirs()
    cache = _idem_cache()
    cache[key] = entry
    IDEM_PATH.write_text(json.dumps(cache, indent=2), encoding="utf-8")


def make_idempotency_key(short_name: str, payload: dict) -> str:
    """endpoint + day + payload-hash. Mirrors cost_tracker.make_idempotency_key."""
    blob = json.dumps(payload or {}, sort_keys=True, default=str)
    digest = hashlib.sha1(blob.encode()).hexdigest()[:12]
    return f"seranking:{short_name}:{date.today().isoformat()}:{digest}"


def _now_iso() -> str:
    return datetime.utcnow().isoformat()


# --------------------------------------------------------------------------- #
# Client
# --------------------------------------------------------------------------- #
class SerankingClient:
    """Thin httpx wrapper. Local credit ledger + idempotency + raw-response save.

    Every paid call:
      1. Refuses if ledger_total + estimate > SERANKING_CREDIT_CEILING.
      2. Refuses (IdempotencyHit) if this exact call already succeeded today.
      3. Saves the raw JSON under raw/ and appends a ledger row.
    """

    def __init__(self, *, token: Optional[str] = None, timeout: float = 60.0) -> None:
        self.token = (token or SERANKING_API_TOKEN or "").strip()
        if not self.token:
            raise NoAccess(
                "SERANKING_API_TOKEN is empty. Add the current trial key to .env "
                "as SERANKING_API_TOKEN=<key> (the May token is dead, 403)."
            )
        self.timeout = timeout
        self.headers = {
            "Authorization": f"Token {self.token}",
            "Content-Type": "application/json",
        }

    # ----- core executor --------------------------------------------------- #
    def _request(
        self,
        short_name: str,
        *,
        params: Optional[dict] = None,
        json_body: Optional[dict] = None,
        expected_rows: int = 0,
        path_override: Optional[str] = None,
        force: bool = False,
        save_raw: bool = True,
    ) -> dict:
        spec = ENDPOINTS[short_name]
        method = spec["method"]
        path = path_override or spec["path"]
        url = f"{SERANKING_BASE_URL}{path}"
        is_free = spec["kind"] == "free"
        payload = {"params": params or {}, "json": json_body or {}, "path": path}

        estimated = 0 if is_free else estimate_credits(short_name, expected_rows)
        idem = make_idempotency_key(short_name, payload)

        # Idempotency gate (non-free only)
        if not is_free and not force:
            prior = self._idem_lookup(idem)
            if prior:
                raise IdempotencyHit(f"{short_name} already succeeded today -> {prior.get('raw_path')}")

        # Budget gate
        if not is_free:
            running = ledger_total()
            if running + estimated > SERANKING_CREDIT_CEILING:
                raise BudgetExceeded(
                    f"{short_name}: {running}+{estimated} > ceiling {SERANKING_CREDIT_CEILING}"
                )

        # The call
        try:
            r = httpx.request(
                method, url, headers=self.headers,
                params=params, json=json_body if method != "GET" else None,
                timeout=self.timeout,
            )
        except httpx.HTTPError as e:
            self._record(short_name, idem, "error", 0, None, detail=str(e))
            raise SerankingError(f"{short_name}: transport error: {e}") from e

        if r.status_code in (401, 403):
            self._record(short_name, idem, "no_access", 0, None,
                         detail=f"{r.status_code} {r.text[:200]}")
            raise NoAccess(f"{short_name}: {r.status_code} {r.text[:200]}")
        if r.status_code >= 300:
            self._record(short_name, idem, "failed", 0, None,
                         detail=f"{r.status_code} {r.text[:200]}")
            raise SerankingError(f"{short_name}: HTTP {r.status_code} {r.text[:200]}")

        data = r.json()
        actual = 0 if is_free else self._credits_from_response(r, data, estimated)
        raw_path = self._save_raw(short_name, params, data) if save_raw else None
        self._record(short_name, idem, "success", actual, raw_path,
                     estimated=estimated, status_code=r.status_code)
        return data

    # ----- credit accounting from the live response ------------------------ #
    @staticmethod
    def _credits_from_response(r: httpx.Response, data: Any, fallback: int) -> int:
        for h in ("X-Credits-Used", "X-Request-Credits", "X-Api-Credits", "X-Credits"):
            if h in r.headers:
                try:
                    return int(float(r.headers[h]))
                except ValueError:
                    pass
        if isinstance(data, dict):
            for k in ("credits", "credits_used", "cost", "used_credits"):
                if isinstance(data.get(k), (int, float)):
                    return int(data[k])
        return fallback

    # ----- ledger / idempotency / raw -------------------------------------- #
    def _idem_lookup(self, idem: str) -> Optional[dict]:
        entry = _idem_cache().get(idem)
        return entry if entry and entry.get("status") == "success" else None

    def _record(self, short_name, idem, status, credits, raw_path, *,
                estimated=0, status_code=None, detail=None) -> None:
        row = {
            "ts": _now_iso(),
            "date": date.today().isoformat(),
            "endpoint": short_name,
            "status": status,
            "credits": credits,
            "estimated": estimated,
            "status_code": status_code,
            "raw_path": str(raw_path) if raw_path else None,
            "idempotency_key": idem,
        }
        if detail:
            row["detail"] = detail
        _append_ledger(row)
        if status == "success":
            _save_idem(idem, {"ts": row["ts"], "credits": credits, "status": status,
                              "raw_path": row["raw_path"]})

    @staticmethod
    def _save_raw(short_name: str, params: Optional[dict], data: Any) -> Path:
        _ensure_dirs()
        slug = short_name.replace("/", "_")
        tag = ""
        if params:
            for k in ("domain", "target", "keyword", "source"):
                if params.get(k):
                    tag = "_" + str(params[k]).replace("https://", "").replace("/", "-")[:40]
                    break
        stamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
        path = RAW_DIR / f"{slug}{tag}_{stamp}.json"
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        return path

    # ----- free: balance / credential check -------------------------------- #
    def get_account_balance(self) -> dict:
        """Probe candidate balance endpoints; return the first 2xx body.

        Raises NoAccess if the token is rejected everywhere.
        """
        candidates = [
            "/data/account/limits", "/data/account/balance",
            "/account/limits", "/v1/account", "/v1/account/balance",
        ]
        last = None
        for path in candidates:
            try:
                r = httpx.get(f"{SERANKING_BASE_URL}{path}", headers=self.headers, timeout=20.0)
            except httpx.HTTPError as e:
                last = str(e)
                continue
            if r.status_code < 300:
                data = r.json()
                self._save_raw("account_balance", {"source": path.strip("/").replace("/", "-")}, data)
                self._record("account/balance", make_idempotency_key("account/balance", {"path": path}),
                             "success", 0, None, status_code=r.status_code)
                return {"path": path, "data": data}
            last = f"{r.status_code} {r.text[:120]}"
        raise NoAccess(f"No balance endpoint answered. Last: {last}")

    # ----- Data API wrappers ---------------------------------------------- #
    def domain_keywords(self, domain: str, *, limit: int = 1000, offset: int = 0,
                        source: Optional[str] = None) -> dict:
        return self._request("domain/keywords", params={
            "domain": domain, "source": source or SERANKING_SYSTEM_UK,
            "limit": limit, "offset": offset,
        })

    def domain_competitors(self, domain: str, *, limit: int = 50,
                           source: Optional[str] = None) -> dict:
        return self._request("domain/competitors", params={
            "domain": domain, "source": source or SERANKING_SYSTEM_UK, "limit": limit,
        })

    def domain_overview(self, domain: str, *, source: Optional[str] = None) -> dict:
        return self._request("domain/overview", params={
            "domain": domain, "source": source or SERANKING_SYSTEM_UK,
        })

    def keywords_export(self, keywords: list[str], *, source: Optional[str] = None,
                        max_export: int = 200) -> dict:
        if len(keywords) > max_export:
            raise ValueError(f"keywords_export: {len(keywords)} > max_export {max_export}; "
                             "chunk the list to control credit spend.")
        return self._request("keywords/export", expected_rows=len(keywords), params={
            "keywords": ",".join(keywords), "source": source or SERANKING_SYSTEM_UK,
        })

    def keywords_questions(self, seed: str, *, limit: int = 50,
                           source: Optional[str] = None) -> dict:
        return self._request("keywords/questions", expected_rows=limit, params={
            "keyword": seed, "source": source or SERANKING_SYSTEM_UK, "limit": limit,
        })

    def keywords_longtail(self, seed: str, *, limit: int = 100,
                          source: Optional[str] = None) -> dict:
        return self._request("keywords/longtail", expected_rows=limit, params={
            "keyword": seed, "source": source or SERANKING_SYSTEM_UK, "limit": limit,
        })

    def backlinks_summary(self, target: str) -> dict:
        return self._request("backlinks/summary", expected_rows=1, params={
            "target": target, "mode": "domain",
        })

    def backlinks_refdomains(self, target: str, *, limit: int = 400) -> dict:
        return self._request("backlinks/refdomains", expected_rows=limit, params={
            "target": target, "mode": "domain", "limit": limit,
        })

    def backlinks_all(self, target: str, *, limit: int = 200) -> dict:
        return self._request("backlinks/all", expected_rows=limit, params={
            "target": target, "mode": "domain", "limit": limit,
        })

    def ai_overview(self, query: str) -> dict:
        return self._request("ai/overview", params={
            "keyword": query, "source": SERANKING_SYSTEM_UK,
        })

    # ----- legacy /v1 research fallback ------------------------------------ #
    def legacy_similar(self, keyword: str, *, limit: int = 50) -> dict:
        return self._request("legacy/similar", expected_rows=limit, params={
            "keyword": keyword, "system": SERANKING_SYSTEM_UK, "limit": limit,
        })

    def legacy_questions(self, keyword: str, *, limit: int = 50) -> dict:
        return self._request("legacy/questions", expected_rows=limit, params={
            "keyword": keyword, "system": SERANKING_SYSTEM_UK, "limit": limit,
        })


if __name__ == "__main__":
    # Smoke test: free balance / credential check only (no credits spent).
    try:
        client = SerankingClient()
    except NoAccess as e:
        print(f"NO TOKEN: {e}")
        raise SystemExit(1)
    try:
        bal = client.get_account_balance()
        print("BALANCE OK via", bal["path"])
        print(json.dumps(bal["data"], indent=2)[:1500])
    except NoAccess as e:
        print(f"TOKEN REJECTED: {e}")
        raise SystemExit(2)
