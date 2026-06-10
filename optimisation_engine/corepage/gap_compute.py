"""Quantitative gap computation + analysis-pack assembly (pure Python, no LLM).

Compares our core page against the page-1 competitor median, flags the
schema/entity/coverage/trust gaps, and assembles the structured analysis pack
(JSON + readable Markdown) that the Opus 4.8 subagent reasons over to write the
brief. There is NO LLM call here — this layer only gathers and structures.
"""
from __future__ import annotations

import statistics
from typing import Any


# Schema types we specifically care about for a commercial landing page.
COMMERCIAL_SCHEMA = ["LocalBusiness", "AccountingService", "Service",
                     "BreadcrumbList", "AggregateRating", "Review", "Organization", "FAQPage"]

HEAD_TOKENS = ["property accountant", "property tax accountant", "landlord accountant",
               "buy to let accountant", "property accountancy"]


def _median(values: list[float]) -> float:
    vals = [v for v in values if v is not None]
    return round(statistics.median(vals), 1) if vals else 0.0


def _has_head_token(text: str) -> str | None:
    t = (text or "").lower()
    for tok in HEAD_TOKENS:
        if tok in t:
            return tok
    return None


def compute_gaps(our: dict | None, competitors: list[dict], cfg: dict) -> dict:
    """Return a structured gap dict (quantitative deltas + flags)."""
    our = our or {}
    ours_ok = bool(our) and not our.get("error")

    comp_wc = [c.get("word_count", 0) for c in competitors]
    comp_h2 = [c.get("h2_count", 0) for c in competitors]
    comp_faq = [c.get("faq_count", 0) for c in competitors]
    comp_tables = [c.get("table_count", 0) for c in competitors]

    # Schema coverage across competitors (how many competitors emit each type).
    schema_freq: dict[str, int] = {}
    for c in competitors:
        for t in c.get("schema_types", []) or []:
            schema_freq[t] = schema_freq.get(t, 0) + 1
    our_schema = set(our.get("schema_types", []) or [])

    # Schema present in >=2 competitors but missing from ours.
    schema_gaps = sorted(
        [t for t, n in schema_freq.items() if n >= 2 and t not in our_schema]
    )
    # Explicit commercial-schema checklist (present/missing on our page).
    commercial_schema_status = {
        t: ("present" if t in our_schema else "MISSING") for t in COMMERCIAL_SCHEMA
    }

    # Entity/keyword presence in our title + H1 (the headline gap).
    title_token = _has_head_token(our.get("title", "")) if ours_ok else None
    h1_token = _has_head_token(our.get("h1", "")) if ours_ok else None

    # Trust/component signals competitors lean on.
    comp_components: dict[str, int] = {}
    for c in competitors:
        for comp_name in set(c.get("component_patterns", []) or []):
            comp_components[comp_name] = comp_components.get(comp_name, 0) + 1
    our_components = set(our.get("component_patterns", []) or [])
    component_gaps = sorted(
        [name for name, n in comp_components.items() if n >= 2 and name not in our_components]
    )

    return {
        "our_extracted_ok": ours_ok,
        "word_count": {
            "ours": our.get("word_count", 0) if ours_ok else None,
            "competitor_median": _median(comp_wc),
            "competitor_max": max(comp_wc) if comp_wc else 0,
        },
        "h2_count": {
            "ours": our.get("h2_count", 0) if ours_ok else None,
            "competitor_median": _median(comp_h2),
        },
        "faq_count": {
            "ours": our.get("faq_count", 0) if ours_ok else None,
            "competitor_median": _median(comp_faq),
        },
        "table_count": {
            "ours": our.get("table_count", 0) if ours_ok else None,
            "competitor_median": _median(comp_tables),
        },
        "schema": {
            "ours": sorted(our_schema),
            "competitor_frequency": dict(sorted(schema_freq.items(), key=lambda kv: -kv[1])),
            "missing_vs_competitors": schema_gaps,
            "commercial_checklist": commercial_schema_status,
        },
        "headline_keyword": {
            "title": our.get("title", "") if ours_ok else None,
            "title_has_head_token": title_token,
            "h1": our.get("h1", "") if ours_ok else None,
            "h1_has_head_token": h1_token,
            "h1_is_keywordless": ours_ok and h1_token is None,
        },
        "components": {
            "ours": sorted(our_components),
            "missing_vs_competitors": component_gaps,
        },
    }


# ---------------------------------------------------------------------------
# Analysis pack assembly
# ---------------------------------------------------------------------------

def _md_table(headers: list[str], rows: list[list[Any]]) -> str:
    out = ["| " + " | ".join(headers) + " |",
           "| " + " | ".join("---" for _ in headers) + " |"]
    for r in rows:
        out.append("| " + " | ".join(str(x) for x in r) + " |")
    return "\n".join(out)


def build_analysis_pack(
    cfg: dict,
    *,
    head_rows: list[dict],
    cannibalisation: list[dict],
    cannib_summary: dict,
    serp: dict,
    our_signals: dict | None,
    competitor_signals: dict,
    gaps: dict,
) -> dict:
    """Assemble the machine-readable pack (also embeds a readable markdown)."""
    pack = {
        "site_key": cfg["site_key"],
        "page_key": cfg["page_key"],
        "page_url": cfg["page_url"],
        "source_tsx": cfg["source_tsx"],
        "head_terms": cfg["head_terms"],
        "cannibalisation_summary": cannib_summary,
        "cannibalisation_map": cannibalisation,
        "head_gsc_rows": head_rows,
        "serp": {
            "probed_terms": serp.get("probed_terms", []),
            "competitors": serp.get("competitors", []),
            "notes": serp.get("notes", []),
        },
        "our_signals": our_signals,
        "competitor_signals": competitor_signals,
        "gaps": gaps,
    }
    pack["readable_md"] = render_pack_md(pack)
    return pack


def render_pack_md(pack: dict) -> str:
    """A human-readable rendering of the pack for the Opus subagent."""
    g = pack["gaps"]
    cs = pack["cannibalisation_summary"]
    lines: list[str] = []
    lines.append(f"# Core-page analysis pack — {pack['site_key']} / {pack['page_key']}")
    lines.append("")
    lines.append(f"- **Page:** {pack['page_url']}")
    lines.append(f"- **Source (hand-edit this):** `{pack['source_tsx']}`")
    lines.append("")

    # Cannibalisation summary
    lines.append("## Cannibalisation diagnosis")
    lines.append(f"- Head-family queries tracked: **{cs['total_head_queries']}** "
                 f"({cs['total_head_impressions']} impressions, 90d).")
    lines.append(f"- Queries the core page already owns: **{cs['homepage_owns_count']}**.")
    lines.append(f"- National head queries: **{cs['national_head_queries']}**; "
                 f"national impressions NOT on the core page: **{cs['national_impressions_not_on_homepage']}**.")
    lines.append("")
    lines.append("### Top catcher pages (which of OUR pages soaks up head-family impressions)")
    lines.append(_md_table(
        ["catcher url", "type", "head queries", "impr"],
        [[c["url"], c["type"], c["queries"], c["imp"]] for c in cs["top_catchers"]],
    ))
    lines.append("")
    lines.append("### Per-query cannibalisation map (top 30 by impressions)")
    lines.append(_md_table(
        ["query", "tot impr", "nat", "geo", "catcher", "catcher type", "catcher pos", "core-page pos", "verdict"],
        [[r["query"], r["total_imp"], "Y" if r["national"] else "", "Y" if r["geo"] else "",
          r["catcher_url"].replace("https://www.", "").replace("https://", ""),
          r["catcher_type"], r["catcher_pos"],
          r["homepage_pos"] if r["homepage_pos"] is not None else "-", r["verdict"]]
         for r in pack["cannibalisation_map"][:30]],
    ))
    lines.append("")

    # Our page vs competitors
    lines.append("## Our core page vs page-1 competitors")
    wc = g["word_count"]; h2 = g["h2_count"]; faq = g["faq_count"]
    lines.append(_md_table(
        ["metric", "ours", "competitor median", "competitor max"],
        [
            ["word count", wc["ours"], wc["competitor_median"], wc["competitor_max"]],
            ["H2 sections", h2["ours"], h2["competitor_median"], "-"],
            ["FAQs", faq["ours"], faq["competitor_median"], "-"],
        ],
    ))
    lines.append("")
    hk = g["headline_keyword"]
    lines.append("### Headline keyword coverage (the #1 gap)")
    lines.append(f"- Title: `{hk['title']}` — contains head token: **{hk['title_has_head_token'] or 'NO'}**")
    lines.append(f"- H1: `{hk['h1']}` — contains head token: **{hk['h1_has_head_token'] or 'NO'}**")
    if hk["h1_is_keywordless"]:
        lines.append("- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.")
    lines.append("")
    sc = g["schema"]
    lines.append("### Schema")
    lines.append(f"- Ours: {sc['ours']}")
    lines.append(f"- Competitor frequency: {sc['competitor_frequency']}")
    lines.append(f"- Missing vs competitors (>=2 have it): {sc['missing_vs_competitors']}")
    lines.append(f"- Commercial checklist: {sc['commercial_checklist']}")
    lines.append("")
    lines.append("### Component / trust patterns missing vs competitors")
    lines.append(f"- {g['components']['missing_vs_competitors']}")
    lines.append("")

    # Competitors
    comp = pack["competitor_signals"]
    lines.append("## Page-1 competitors extracted")
    if comp.get("extracted"):
        lines.append(_md_table(
            ["domain", "type", "best pos", "title", "words", "H2", "FAQ", "schema"],
            [[c.get("domain"), c.get("serp_page_type"), c.get("serp_best_position"),
              (c.get("title") or "")[:60], c.get("word_count"), c.get("h2_count"),
              c.get("faq_count"), ",".join(c.get("schema_types", []) or [])]
             for c in comp["extracted"]],
        ))
    else:
        lines.append("_No competitor pages extracted._")
    if comp.get("failed"):
        lines.append("")
        lines.append(f"_Could not fetch: {[f['domain'] for f in comp['failed']]}_")
    if pack["serp"].get("notes"):
        lines.append("")
        lines.append("SERP notes: " + "; ".join(pack["serp"]["notes"]))
    return "\n".join(lines)
