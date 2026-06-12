"""
Output writer: assembles frontmatter + body, writes to the right site directory.

Single point of disk I/O for the generator. Every write goes through here.
Routing safety is checked one final time before the file hits disk.
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import yaml

from optimisation_engine.blog_generator.routing_safety import (
    resolve_output_path,
    assert_output_path_belongs_to_site,
)


def slugify_category(category: str, *, and_replaces_ampersand: bool) -> str:
    """Convert category name to URL slug."""
    import re
    s = (category or "").lower()
    if and_replaces_ampersand:
        s = s.replace("&", "and")
    s = s.replace("(", "").replace(")", "")
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    return s


def build_canonical(site_config: dict, slug: str, category_slug: str | None) -> str:
    base = site_config["site_base_url"].rstrip("/")
    fmt = site_config.get("canonical_format", "/blog/{slug}")
    path = fmt.format(slug=slug, category_slug=category_slug or "")
    return f"{base}{path}"


def _build_generator_tag(site_config: dict) -> str:
    """Derive the generator frontmatter value from site_config.

    Format: <model>/<pipeline>
    Uses the concrete model name where available (site_config["llm_model"]),
    falling back to the provider key (site_config["llm_provider"]).
    """
    model = site_config.get("llm_model") or site_config.get("llm_provider") or "unknown"
    return f"{model}/consolidated-generator"


def assemble_frontmatter(
    *,
    site_config: dict,
    fields: dict,
    cited_sources: list[dict],
    image: dict | None,
) -> dict:
    """Build the frontmatter dict for YAML serialisation."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    iso_today = datetime.now(timezone.utc).date().isoformat()

    slug = fields.get("slug") or "untitled"
    category = fields.get("category") or (site_config.get("post_categories") or ["General"])[0]
    category_slug = slugify_category(
        category,
        and_replaces_ampersand=site_config.get("category_slug_rules", {}).get(
            "and_replaces_ampersand", True
        ),
    )
    canonical = build_canonical(site_config, slug, category_slug)

    faqs: list[dict] = []
    for i in range(1, 9):
        q = (fields.get(f"faq{i}") or "").strip()
        a = (fields.get(f"faa{i}") or "").strip()
        if q and a:
            faqs.append({"question": q, "answer": a})

    fm: dict = {
        "title": fields.get("name") or fields.get("title") or "Untitled",
        "slug": slug,
        "canonical": canonical,
        "date": today,
        "generator": _build_generator_tag(site_config),
        "author": site_config["author_name"],
        "category": category,
        "metaTitle": fields.get("meta_title") or fields.get("metaTitle") or "",
        "metaDescription": fields.get("meta_description") or fields.get("metaDescription") or "",
        "altText": fields.get("alt_tag") or fields.get("altText") or "",
        "image": image["url"] if image else "",
        "h1": fields.get("h1") or fields.get("name") or fields.get("title") or "Untitled",
        "summary": fields.get("3_liner") or fields.get("summary") or "",
        "schema": fields.get("schema", ""),
        "faqs": faqs,
        "dateModified": iso_today,
        "sourcesVerifiedAt": iso_today,
        "sourceDomains": sorted({s["domain"] for s in cited_sources}),
    }
    if image and image.get("photographer"):
        fm["imageCredit"] = {
            "photographer": image["photographer"],
            "photographer_url": image.get("photographer_url", ""),
            "source": "Pexels",
            "source_url": image.get("pexels_url", ""),
        }
    return fm


def write_blog(
    *,
    site_config: dict,
    fields: dict,
    body_html: str,
    cited_sources: list[dict],
    image: dict | None,
    dry_run: bool = False,
) -> Path:
    """Write the .md file to the correct site directory. Returns the file path.

    Routing safety: the output path is built via resolve_output_path() which
    asserts the path stays inside the site's expected directory. A second
    assert_output_path_belongs_to_site() runs immediately before the write.
    """
    slug = fields.get("slug") or "untitled"
    out_path = resolve_output_path(
        site_key=site_config["site_key"],
        output_dir_rel=site_config["output_dir"],
        slug=slug,
    )

    fm = assemble_frontmatter(
        site_config=site_config,
        fields=fields,
        cited_sources=cited_sources,
        image=image,
    )

    # Final defence in depth: assert again at write time
    assert_output_path_belongs_to_site(out_path, site_config["site_key"])

    if dry_run:
        return out_path

    out_path.parent.mkdir(parents=True, exist_ok=True)
    fm_yaml = yaml.safe_dump(fm, sort_keys=False, allow_unicode=True, width=4096)
    contents = f"---\n{fm_yaml}---\n{body_html}\n"
    out_path.write_text(contents, encoding="utf-8")
    return out_path
