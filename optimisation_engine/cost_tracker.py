"""
Central API cost tracker.

Every paid call to an external API goes through this module. The contract:

    with CostTracker.guard(
        api_provider="dataforseo",
        endpoint="keyword_suggestions/live",
        site_key="agency",
        estimated_cost_usd=0.06,
        request_payload={...},
        idempotency_key="agency:keyword_suggestions/live:2026-05-19:abc123",
    ) as record:
        # The guard has already verified we have budget headroom AND
        # written a pending row to api_cost_log. If we're over budget it
        # raised BudgetExceeded before the body ran.
        resp = requests.post(...)
        record.complete(actual_cost_usd=resp.json()["cost"], response_size_bytes=len(resp.content))

If the body raises, the row is marked failed automatically.
"""
from __future__ import annotations

import hashlib
import json
import os
from contextlib import contextmanager
from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Any, Generator, Optional

import httpx

from optimisation_engine.config import (
    DATAFORSEO_ABORT_AT,
    DATAFORSEO_CEILING_USD,
    SUPABASE_KEY,
    SUPABASE_URL,
)


class BudgetExceeded(RuntimeError):
    """Raised when running a paid call would exceed the budget ceiling."""


class IdempotencyHit(RuntimeError):
    """Raised when this exact call has already been recorded today."""


@dataclass
class _PendingRecord:
    row_id: str
    api_provider: str
    endpoint: str
    estimated_cost_usd: float
    site_key: Optional[str]
    completed: bool = False

    def complete(
        self,
        actual_cost_usd: float,
        response_size_bytes: Optional[int] = None,
        response_status_code: Optional[int] = None,
    ) -> None:
        _update_row(
            self.row_id,
            {
                "status": "success",
                "cost_usd": actual_cost_usd,
                "response_size_bytes": response_size_bytes,
                "response_status_code": response_status_code,
                "completed_at": _now_iso(),
            },
        )
        self.completed = True


def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def _now_iso() -> str:
    return datetime.utcnow().isoformat()


def _insert_row(row: dict) -> str:
    url = f"{SUPABASE_URL}/rest/v1/api_cost_log"
    headers = {**_supabase_headers(), "Prefer": "return=representation"}
    r = httpx.post(url, headers=headers, json=row, timeout=15.0)
    r.raise_for_status()
    return r.json()[0]["id"]


def _update_row(row_id: str, patch: dict) -> None:
    url = f"{SUPABASE_URL}/rest/v1/api_cost_log"
    headers = {**_supabase_headers(), "Prefer": "return=minimal"}
    r = httpx.patch(url, headers=headers, params={"id": f"eq.{row_id}"}, json=patch, timeout=15.0)
    r.raise_for_status()


def _spent_today(api_provider: str) -> float:
    """Sum cost_usd for successful + pending rows for this provider today.

    We count pending rows toward the budget because they may complete with the
    estimated cost. This errs on the safe side.
    """
    url = f"{SUPABASE_URL}/rest/v1/api_cost_log"
    today = date.today().isoformat()
    params = {
        "select": "cost_usd,estimated_cost_usd,status",
        "api_provider": f"eq.{api_provider}",
        "date_called": f"eq.{today}",
        "status": "in.(pending,success)",
    }
    r = httpx.get(url, headers=_supabase_headers(), params=params, timeout=15.0)
    r.raise_for_status()
    total = 0.0
    for row in r.json():
        if row["status"] == "success":
            total += float(row["cost_usd"] or 0)
        else:
            # pending: assume estimated_cost_usd as the upper bound
            total += float(row["estimated_cost_usd"] or row["cost_usd"] or 0)
    return total


def _idempotency_hit(idempotency_key: str) -> Optional[dict]:
    url = f"{SUPABASE_URL}/rest/v1/api_cost_log"
    params = {
        "select": "id,status,cost_usd",
        "idempotency_key": f"eq.{idempotency_key}",
        "status": "in.(pending,success)",
        "limit": "1",
    }
    r = httpx.get(url, headers=_supabase_headers(), params=params, timeout=15.0)
    r.raise_for_status()
    rows = r.json()
    return rows[0] if rows else None


def make_idempotency_key(api_provider: str, endpoint: str, site_key: Optional[str], payload: Any) -> str:
    """Stable key derived from inputs; identical inputs in one day -> same key."""
    h = hashlib.sha256()
    h.update(api_provider.encode())
    h.update(b"|")
    h.update(endpoint.encode())
    h.update(b"|")
    h.update((site_key or "").encode())
    h.update(b"|")
    h.update(json.dumps(payload, sort_keys=True, default=str).encode())
    h.update(b"|")
    h.update(date.today().isoformat().encode())
    return h.hexdigest()


class CostTracker:
    """Cost tracker exposing the guard context manager and budget helpers."""

    @staticmethod
    def spent_today(api_provider: str) -> float:
        return _spent_today(api_provider)

    @staticmethod
    def remaining_budget_dataforseo() -> float:
        return max(0.0, DATAFORSEO_ABORT_AT - _spent_today("dataforseo"))

    @staticmethod
    @contextmanager
    def guard(
        api_provider: str,
        endpoint: str,
        estimated_cost_usd: float,
        site_key: Optional[str] = None,
        niche: Optional[str] = None,
        request_payload: Optional[dict] = None,
        idempotency_key: Optional[str] = None,
        skip_budget_check: bool = False,
    ) -> Generator[_PendingRecord, None, None]:
        # Idempotency: refuse if this exact call was already logged today
        if idempotency_key:
            existing = _idempotency_hit(idempotency_key)
            if existing:
                raise IdempotencyHit(
                    f"{api_provider}/{endpoint} for {site_key} already recorded today "
                    f"(row {existing['id']}, status {existing['status']})."
                )

        # Budget gate (DataForSEO only — others are unlimited for now)
        if not skip_budget_check and api_provider == "dataforseo" and estimated_cost_usd > 0:
            running = _spent_today("dataforseo")
            if running + estimated_cost_usd > DATAFORSEO_ABORT_AT:
                raise BudgetExceeded(
                    f"DataForSEO budget gate: running ${running:.4f} + estimated "
                    f"${estimated_cost_usd:.4f} > abort_at ${DATAFORSEO_ABORT_AT:.4f}. "
                    f"Ceiling ${DATAFORSEO_CEILING_USD:.2f}. Aborting before call."
                )

        # Insert pending row BEFORE the call
        row = {
            "api_provider": api_provider,
            "endpoint": endpoint,
            "site_key": site_key,
            "niche": niche or site_key,
            "status": "pending",
            "estimated_cost_usd": estimated_cost_usd,
            "cost_usd": 0.0,
            "request_payload": request_payload,
            "idempotency_key": idempotency_key,
        }
        row_id = _insert_row(row)
        record = _PendingRecord(
            row_id=row_id,
            api_provider=api_provider,
            endpoint=endpoint,
            estimated_cost_usd=estimated_cost_usd,
            site_key=site_key,
        )

        try:
            yield record
        except BaseException as exc:
            # Update row as failed if the caller didn't already complete it
            if not record.completed:
                _update_row(
                    row_id,
                    {
                        "status": "failed",
                        "error_message": f"{type(exc).__name__}: {exc}"[:1000],
                        "completed_at": _now_iso(),
                    },
                )
            raise
        else:
            # If caller forgot to call record.complete(), mark with estimated cost
            if not record.completed:
                _update_row(
                    row_id,
                    {
                        "status": "success",
                        "cost_usd": estimated_cost_usd,
                        "completed_at": _now_iso(),
                    },
                )


if __name__ == "__main__":
    # Quick smoke test: print today's DataForSEO spend
    print(f"DataForSEO spent today: ${CostTracker.spent_today('dataforseo'):.4f}")
    print(f"Remaining budget:       ${CostTracker.remaining_budget_dataforseo():.4f}")
