"""
Topic repository: fetch and update blog topics across schema variants.

Each site's blog_topics_* table has subtle differences:
  - "topic" vs "keyword" as the primary column
  - "used"/True vs "status"/"published" as the done marker
  - "secondary_keyword_1..10" individual columns vs "secondary_keywords" JSON array

This module hides those differences behind a uniform interface:
  - fetch_next_topic(site_config) -> Topic
  - mark_topic_done(site_config, topic_id, slug) -> None
  - fetch_topic_by_id(site_config, topic_id) -> Topic | None
  - fetch_topic_by_keyword(site_config, keyword) -> Topic | None  (for --topic CLI flag)
"""
from __future__ import annotations

import sys
from dataclasses import dataclass, field
from pathlib import Path
from datetime import datetime, timezone

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator.routing_safety import assert_table_belongs_to_site
from optimisation_engine.config import SUPABASE_URL, SUPABASE_KEY


@dataclass
class Topic:
    id: str
    primary_keyword: str
    secondary_keywords: list[str]
    user_intent: str = "informational"
    target_search_volume: int | str = "unknown"
    keyword_difficulty: int | None = None
    content_tier: str = "cluster"  # or "pillar"
    publish_priority: int | None = None
    suggested_slug: str | None = None
    notes: str | None = None
    raw: dict = field(default_factory=dict)


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }


def _select_clause(site_config: dict) -> str:
    """Select everything — topic tables differ in available columns and we'd
    rather grab the lot than enumerate per-site. Topic rows are small."""
    return "*"


def _row_to_topic(row: dict, site_config: dict) -> Topic:
    primary = row.get(site_config["topic_column"]) or row.get("primary_keyword") or ""
    if site_config["secondary_keywords_shape"] == "columns":
        secondary = [
            row.get(f"secondary_keyword_{i}")
            for i in range(1, 11)
            if row.get(f"secondary_keyword_{i}")
        ]
    else:
        secondary = row.get("secondary_keywords") or []
        if isinstance(secondary, str):
            # Defensive: some rows may have stringified arrays
            import json as _json
            try:
                secondary = _json.loads(secondary)
            except Exception:
                secondary = []
    return Topic(
        id=str(row["id"]),
        primary_keyword=primary,
        secondary_keywords=[k for k in secondary if k],
        user_intent=row.get("user_intent") or "informational",
        target_search_volume=row.get("target_search_volume") or "unknown",
        keyword_difficulty=row.get("keyword_difficulty"),
        content_tier=row.get("content_tier") or "cluster",
        publish_priority=row.get("publish_priority"),
        suggested_slug=row.get("suggested_slug") or row.get("slug"),
        notes=row.get("notes"),
        raw=row,
    )


def _done_filter_params(site_config: dict) -> dict:
    """Filter params that mean 'topic still needs generating'."""
    field = site_config["done_marker_field"]
    if field == "used":
        return {"used": "eq.false"}
    if field == "status":
        return {"status": "eq.pending"}
    raise ValueError(f"Unknown done_marker_field: {field!r}")


def fetch_next_topic(site_config: dict) -> Topic | None:
    """Return the highest-priority unused topic from the site's table."""
    table = site_config["topic_table"]
    assert_table_belongs_to_site(table, site_config["site_key"])

    params = {
        "select": _select_clause(site_config),
        "order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",
        "limit": "1",
        **_done_filter_params(site_config),
    }
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/{table}",
        headers=_headers(),
        params=params,
        timeout=20.0,
    )
    r.raise_for_status()
    rows = r.json()
    if not rows:
        return None
    return _row_to_topic(rows[0], site_config)


def fetch_topic_by_keyword(site_config: dict, keyword: str) -> Topic | None:
    """Look up a specific topic by its primary keyword. Used for --topic CLI flag."""
    table = site_config["topic_table"]
    assert_table_belongs_to_site(table, site_config["site_key"])

    params = {
        "select": _select_clause(site_config),
        site_config["topic_column"]: f"eq.{keyword}",
        "limit": "1",
    }
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/{table}",
        headers=_headers(),
        params=params,
        timeout=20.0,
    )
    r.raise_for_status()
    rows = r.json()
    return _row_to_topic(rows[0], site_config) if rows else None


def mark_topic_done(site_config: dict, topic_id: str, slug: str) -> None:
    """Mark the topic as generated. Uses the site's done-marker conventions."""
    table = site_config["topic_table"]
    assert_table_belongs_to_site(table, site_config["site_key"])

    field = site_config["done_marker_field"]
    value = site_config["done_marker_value"]
    timestamp_field = site_config.get("done_timestamp_field", "used_at")
    ts = datetime.now(timezone.utc).isoformat()

    payload: dict = {
        field: value,
        timestamp_field: ts,
    }
    # Sites that have a separate generated_slug column
    if site_config.get("slug_field"):
        payload[site_config["slug_field"]] = slug

    r = httpx.patch(
        f"{SUPABASE_URL}/rest/v1/{table}",
        headers={
            **_headers(),
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        params={"id": f"eq.{topic_id}"},
        json=payload,
        timeout=20.0,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"mark_topic_done failed: {r.status_code} {r.text[:300]}")
