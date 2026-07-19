"""
apply_schema_only — extend the page's JSON-LD structured data.

The site stores structured data in the frontmatter `schema:` field as a
JSON string (or an empty string). Existing pages may have nothing, a single
@graph, or a single typed object. We merge the proposed schema additions
in non-destructively: existing entries are preserved.

Patch shape (from Action Specifier):
  {
    "schema_to_add": [
      {"@type": "FAQPage", ...},
      {"@type": "BreadcrumbList", ...}
    ],
    "rationale": "page has FAQ block in body but no FAQPage JSON-LD"
  }
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    url_to_slug,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import read, write  # noqa: E402
from optimisation_engine.apply.validators import file_exists  # noqa: E402

CHANGE_TYPE = "schema_addition"

VALID_SCHEMA_TYPES = {
    "Article", "BlogPosting", "NewsArticle",
    "FAQPage", "Question", "Answer",
    "Service", "ProfessionalService", "LocalBusiness", "AccountingService",
    "BreadcrumbList", "WebPage", "Organization",
    "HowTo", "Review", "AggregateRating",
    "WebApplication", "SoftwareApplication", "Dataset",
    "CollectionPage", "DefinedTerm", "DefinedTermSet",
}


def _parse_existing_schema(schema_field: str | None) -> list[dict]:
    """Parse the frontmatter schema field. Returns a list of schema objects."""
    if not schema_field or not isinstance(schema_field, str) or not schema_field.strip():
        return []
    try:
        data = json.loads(schema_field)
    except json.JSONDecodeError:
        return []
    if isinstance(data, dict):
        if "@graph" in data and isinstance(data["@graph"], list):
            return list(data["@graph"])
        return [data]
    if isinstance(data, list):
        return data
    return []


def _serialise_schema(items: list[dict]) -> str:
    if not items:
        return ""
    if len(items) == 1:
        return json.dumps(items[0], separators=(",", ":"), ensure_ascii=False)
    return json.dumps(
        {"@context": "https://schema.org", "@graph": items},
        separators=(",", ":"),
        ensure_ascii=False,
    )


def build_brief(opportunity: dict) -> ChangeBrief:
    site_key = opportunity["site_key"]
    target_url = opportunity.get("target_url") or ""
    slug = url_to_slug(target_url) or opportunity.get("target_slug")

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    schema_patch = patch.get("schema_only") or patch
    to_add = schema_patch.get("schema_to_add") or []

    path = slug_to_path(site_key, slug) if slug else None
    rel_path = str(path.relative_to(ROOT)) if path else ""

    brief = ChangeBrief(
        apply_module="schema_only",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    existing_items: list[dict] = []
    if path and path.exists():
        try:
            fm, _body = read(path)
            existing_items = _parse_existing_schema(fm.get("schema"))
            existing_types = [item.get("@type", "(unknown)") for item in existing_items]
            brief.current_state = {
                "slug": slug,
                "title": fm.get("title"),
                "existing_schema_types": existing_types,
                "existing_count": len(existing_items),
            }
        except Exception as exc:
            brief.add_validation("file_readable", False, str(exc))
            brief.finalise_can_apply()
            return brief

    brief.opportunity_rationale = (
        opportunity.get("rationale") or plan.get("rationale") or schema_patch.get("rationale") or ""
    )
    brief.opportunity_signal = {
        "schema_to_add_count": len(to_add),
        "primary_query": opportunity.get("primary_query"),
        "score": opportunity.get("score"),
    }

    # Merge: skip duplicates by @type
    existing_types_set = {item.get("@type") for item in existing_items}
    new_items = [item for item in to_add if isinstance(item, dict) and item.get("@type") and item["@type"] not in existing_types_set]
    merged = existing_items + new_items

    brief.change_summary = (
        f"Add {len(new_items)} schema entries ({', '.join(item['@type'] for item in new_items)}) to {slug}"
    )
    brief.change_diff = {
        "before_schema_types": [item.get("@type") for item in existing_items],
        "schema_being_added": [item.get("@type") for item in new_items],
        "skipped_duplicates": [item.get("@type") for item in to_add if item.get("@type") in existing_types_set],
        "after_schema_types": [item.get("@type") for item in merged],
        "merged_schema_preview": _serialise_schema(merged)[:600],
    }
    # Apply step needs the raw new items to do the merge
    brief.internal_data["new_items_payload"] = new_items

    # Validators
    if not rel_path:
        brief.add_validation("path_resolvable", False, "could not resolve slug to filesystem path")
    else:
        ok, detail = file_exists(path)
        brief.add_validation("file_exists", ok, detail)
    if not to_add:
        brief.add_validation("schema_payload_present", False, "patch.schema_to_add is empty")
    else:
        # Each new entry must have @type and that type must be known
        bad = []
        for item in to_add:
            if not isinstance(item, dict):
                bad.append("non-dict entry")
                continue
            t = item.get("@type")
            if not t:
                bad.append("missing @type")
            elif t not in VALID_SCHEMA_TYPES:
                bad.append(f"unknown @type: {t}")
        brief.add_validation(
            "schema_types_valid",
            len(bad) == 0,
            "; ".join(bad) if bad else f"{len(to_add)} entries OK",
        )

    if not new_items:
        brief.add_validation("change_is_meaningful", False, "all proposed types already present")
    else:
        brief.add_validation("change_is_meaningful", True, f"{len(new_items)} new entries to add")

    # Serialisation must round-trip
    try:
        s = _serialise_schema(merged)
        json.loads(s)
        brief.add_validation("merged_schema_serialises", True, "")
    except Exception as exc:
        brief.add_validation("merged_schema_serialises", False, str(exc))

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        before = (fm.get("schema") or "")[:500]
        existing_items = _parse_existing_schema(fm.get("schema"))
        existing_types_set = {item.get("@type") for item in existing_items}

        new_items_raw = brief.internal_data.get("new_items_payload") or []
        if not new_items_raw:
            raise ApplyError("brief.internal_data missing new_items_payload")

        merged = existing_items + new_items_raw
        fm["schema"] = _serialise_schema(merged)
        write(path, fm, body)

        after = (fm.get("schema") or "")[:500]
        return before, after

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="high",
        auto_applied=True,
    )
