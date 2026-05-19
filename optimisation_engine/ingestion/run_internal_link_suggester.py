"""
Runner for Checkpoint 6 — Internal Link Suggester.

For each recently shipped optimisation_changes row (within last N days),
runs the link suggester and persists suggestions as NEW optimisation_changes
rows with change_type='internal_link', auto_applied=false, confidence='low'
(requires human review).

These suggested-but-not-applied rows are the queue of internal-linking work
ready for the human review step. Once approved, a separate apply step
inserts the actual link markup in the sibling file.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import date, datetime, timedelta, timezone

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402
from optimisation_engine.reasoning.internal_link_suggester import suggest_links_for_target  # noqa: E402


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def _slug_from_url(url: str) -> str | None:
    parts = [p for p in (url or "").rstrip("/").split("/") if p]
    return parts[-1] if parts else None


def fetch_recent_changes(*, site_key: str | None, since_days: int, change_types: list[str] | None = None) -> list[dict]:
    """Recent shipped changes that haven't already had link suggestions run."""
    since = (datetime.utcnow() - timedelta(days=since_days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/optimisation_changes"
    params = {
        "select": "id,site_key,target_url,target_slug,change_type,shipped_at,confidence",
        "shipped_at": f"gte.{since}",
        "rolled_back": "eq.false",
        "order": "shipped_at.desc",
        "limit": "100",
    }
    if site_key:
        params["site_key"] = f"eq.{site_key}"
    if change_types:
        # PostgREST 'in' filter
        params["change_type"] = "in.(" + ",".join(change_types) + ")"
    r = httpx.get(url, headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}, params=params, timeout=30.0)
    r.raise_for_status()
    return r.json()


def _primary_query_for_change(change: dict) -> str | None:
    """Find primary query: opportunity.applied_change_id -> change.id."""
    change_id = change.get("id")
    if change_id:
        # optimisation_opportunities.applied_change_id points back to this change
        r = httpx.get(
            f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
            params={"select": "primary_query", "applied_change_id": f"eq.{change_id}", "limit": "1"},
            timeout=10.0,
        )
        rows = r.json() if r.status_code < 300 else []
        if rows and rows[0].get("primary_query"):
            return rows[0]["primary_query"]
    # Fallback: try blog_optimization_id (legacy linkage)
    opp_id = change.get("blog_optimization_id")
    if opp_id:
        r = httpx.get(
            f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
            params={"select": "primary_query", "id": f"eq.{opp_id}"},
            timeout=10.0,
        )
        rows = r.json() if r.status_code < 300 else []
        if rows:
            return rows[0].get("primary_query")
    # Last fallback: parse the slug for hints
    return None


def _has_existing_link_suggestion(*, source_change_id: str) -> bool:
    """Check whether we've already produced link suggestions for this source change."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
        params={
            "select": "id",
            "change_type": "eq.internal_link",
            "diff_summary": f"like.*source_change_id={source_change_id}*",
            "limit": "1",
        },
        timeout=10.0,
    )
    return r.status_code < 300 and bool(r.json())


def persist_suggestion(*, site_key: str, target_url: str, target_slug: str, primary_query: str, suggestion: dict, source_change_id: str) -> bool:
    """Create a NEW optimisation_changes row of change_type='internal_link', auto_applied=false."""
    if not suggestion.get("should_link"):
        return False

    from_slug = suggestion["from_slug"]
    anchor = suggestion["anchor_text"]
    hint = suggestion.get("insertion_hint") or ""
    reason = suggestion.get("reason") or ""

    site_url = f"https://{ {  # quick site URL derivation
        'agency': 'www.agencyfounderfinance.co.uk',
        'property': 'www.propertytaxpartners.co.uk',
        'dentists': 'www.dentalfinancepartners.co.uk',
        'generalist': 'www.hollowaydavies.co.uk',
    }[site_key]}"

    payload = {
        "site_key": site_key,
        "change_type": "internal_link",
        "target_url": target_url,
        "target_slug": target_slug,
        "files_changed": [],  # not yet applied
        "before_snapshot": None,
        "after_snapshot": None,
        "diff_summary": (
            f"PROPOSED: link FROM /{from_slug} TO {target_url} with anchor {anchor!r}. "
            f"Insertion hint: {hint!r}. Reason: {reason!r}. "
            f"source_change_id={source_change_id} primary_query={primary_query!r}"
        ),
        "auto_applied": False,
        "confidence": "low",  # always queue for human review per first-cycle policy
        "outcome_verdict": "pending",
        "shipped_at": datetime.utcnow().isoformat(),  # ROW-created-at; actual ship would be after apply
        "performance_review_due_at": (datetime.utcnow() + timedelta(days=28)).isoformat(),
    }
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={**_headers(), "Prefer": "return=minimal"},
        json=payload,
        timeout=15.0,
    )
    return r.status_code < 300


def run(*, site_key: str | None = None, since_days: int = 7, max_targets: int = 10) -> dict:
    changes = fetch_recent_changes(site_key=site_key, since_days=since_days)
    if not changes:
        print(f"No recent shipped changes in last {since_days} days (site={site_key})")
        return {"targets_processed": 0, "links_suggested": 0, "cost": 0.0}

    print(f"Found {len(changes)} recent shipped changes; processing up to {max_targets}")
    targets_processed = 0
    links_suggested = 0
    total_cost = 0.0
    seen_slugs: set[str] = set()

    for change in changes[:max_targets]:
        target_slug = change.get("target_slug") or _slug_from_url(change.get("target_url") or "")
        if not target_slug or target_slug in seen_slugs:
            continue
        seen_slugs.add(target_slug)

        # Skip if we already ran link suggestions for this change
        if _has_existing_link_suggestion(source_change_id=change["id"]):
            print(f"\n[{change['site_key']} {target_slug}] already has link suggestions; skipping")
            continue

        primary_q = _primary_query_for_change(change)
        if not primary_q:
            print(f"\n[{change['site_key']} {target_slug}] no primary_query available; skipping")
            continue

        print(f"\n[{change['site_key']} {target_slug}] q={primary_q!r}")
        try:
            result = suggest_links_for_target(
                site_key=change["site_key"],
                target_slug=target_slug,
                target_url=change["target_url"],
                primary_query=primary_q,
            )
        except Exception as exc:
            print(f"  [ERR] suggester raised: {exc}")
            continue

        total_cost += result.cost_usd
        targets_processed += 1
        suggestions = (result.output or {}).get("suggestions") or []
        positive = [s for s in suggestions if s.get("should_link")]
        print(f"  {len(positive)}/{len(suggestions)} suggestions positive  cost=${result.cost_usd:.6f}  conf={result.confidence}")

        for s in positive:
            if persist_suggestion(
                site_key=change["site_key"],
                target_url=change["target_url"],
                target_slug=target_slug,
                primary_query=primary_q,
                suggestion=s,
                source_change_id=change["id"],
            ):
                links_suggested += 1
                print(f"    persisted: {s['from_slug']} -> {target_slug}  anchor={s['anchor_text']!r}")

    print(f"\n=== Internal Link Suggester complete ===")
    print(f"  targets processed:   {targets_processed}")
    print(f"  links suggested:     {links_suggested}")
    print(f"  total DeepSeek cost: ${total_cost:.6f}")
    return {"targets_processed": targets_processed, "links_suggested": links_suggested, "cost": total_cost}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None)
    parser.add_argument("--since-days", type=int, default=7)
    parser.add_argument("--max-targets", type=int, default=10)
    args = parser.parse_args()
    run(site_key=args.site, since_days=args.since_days, max_targets=args.max_targets)


if __name__ == "__main__":
    main()
