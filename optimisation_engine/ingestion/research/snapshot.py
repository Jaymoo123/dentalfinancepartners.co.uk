"""Generalized snapshot builder.

Preserves the exact settled/provisional/ttm/decade/peak maths from the
existing scripts, applied per segment. Adds multi-segment cuts + thin gate.

The property niche includes house_prices as a secondary; the snapshot key
is injected by engine.py from the secondary-source fetcher result.
"""
from __future__ import annotations

from datetime import date
from typing import Any

from .config import NicheConfig, Segment


def _sic_series(by_month: dict[str, dict[str, int]], months_sorted: list[str], code: str) -> list[int]:
    return [by_month[m].get(code, 0) for m in months_sorted]


def _settled_yoy(series_settled: list[int]) -> float | None:
    if len(series_settled) < 13 or series_settled[-13] == 0:
        return None
    return round((series_settled[-1] - series_settled[-13]) / series_settled[-13] * 100, 1)


def _ttm(by_month: dict[str, dict[str, int]], months_sorted: list[str], code: str, settled_end: int) -> int | None:
    s = _sic_series(by_month, months_sorted, code)[:settled_end]
    return sum(s[-12:]) if len(s) >= 12 else None


def _decade(annual: list[dict[str, Any]], primary_sic: str) -> dict[str, Any] | None:
    full_years = [a["year"] for a in annual]
    if not full_years:
        return None
    y0, y1 = min(full_years), max(full_years)
    a0 = next(a for a in annual if a["year"] == y0)
    a1 = next(a for a in annual if a["year"] == y1)
    p0, p1 = a0.get(primary_sic, 0), a1.get(primary_sic, 0)
    u0, u1 = a0.get("union", 0), a1.get("union", 0)
    return {
        "from_year": y0,
        "to_year": y1,
        "from_value": p0,
        "to_value": p1,
        "multiple": round(p1 / p0, 1) if p0 else None,
        "change_pct": round((p1 - p0) / p0 * 100, 1) if p0 else None,
        "union_from": u0,
        "union_to": u1,
        "union_change_pct": round((u1 - u0) / u0 * 100, 1) if u0 else None,
    }


def _build_segment_block(
    seg: Segment,
    by_month: dict[str, dict[str, int]],
    months_sorted: list[str],
    settled_end: int,
    settled_months: list[str],
    thin_segment_min_ttm: int,
) -> dict[str, Any]:
    """Per-segment stats block. Provisional exclusion runs per segment."""
    sic_codes = list(seg.sic_codes)
    # Aggregate across the segment's SIC codes per month
    seg_by_month: dict[str, int] = {}
    for m in months_sorted:
        seg_by_month[m] = sum(by_month[m].get(s, 0) for s in sic_codes)

    seg_series = [seg_by_month[m] for m in months_sorted]
    seg_settled = seg_series[:settled_end]
    last_settled_val = seg_settled[-1] if seg_settled else None
    ttm_val = sum(seg_settled[-12:]) if len(seg_settled) >= 12 else None

    # Annual totals for this segment (complete calendar years)
    annual_acc: dict[int, int] = {}
    month_count: dict[int, int] = {}
    for m in months_sorted:
        yr = int(m[:4])
        month_count[yr] = month_count.get(yr, 0) + 1
        annual_acc[yr] = annual_acc.get(yr, 0) + seg_by_month[m]
    seg_annual = [
        {"year": yr, "count": annual_acc[yr]}
        for yr in sorted(annual_acc)
        if month_count[yr] == 12
    ]

    # Thin gate: per-segment
    thin = (
        (ttm_val is not None and ttm_val < thin_segment_min_ttm)
        or len([m for m in settled_months]) < 24
    )

    peak_val = max(seg_settled) if seg_settled else 0
    peak_month = settled_months[seg_settled.index(peak_val)] if seg_settled else None

    out: dict[str, Any] = {
        "key": seg.key,
        "label": seg.label,
        "sic_codes": list(seg.sic_codes),
        "is_primary": seg.is_primary,
    }
    if seg.division is not None:
        out["division"] = seg.division
    out.update({
        "monthly": [{"month": m, "count": seg_by_month[m]} for m in months_sorted],
        "annual": seg_annual,
        "last_settled_month": settled_months[-1] if settled_months else None,
        "settled_value": last_settled_val,
        "yoy_pct": _settled_yoy(seg_settled),
        "ttm": ttm_val,
        "peak_month": peak_month,
        "peak_value": peak_val,
        "thin_segment": thin,
    })
    return out


def build_snapshot(
    cfg: NicheConfig,
    incorp: list[dict[str, Any]],
    incorp_through: str,
    secondary_data: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Build the generalized snapshot JSON.

    Preserves the exact property-compatible schema (meta/headline/incorporations/
    sic_labels) and adds segments[] + secondary{} as additive fields.
    secondary_data: keyed by SecondarySource.key -> arbitrary data dict.
    """
    # Monthly pivot: {month: {sic: count, union: count}}
    by_month: dict[str, dict[str, int]] = {}
    for r in incorp:
        by_month.setdefault(r["month"], {})[r["sic_code"]] = r["count"]
    months_sorted = sorted(by_month)

    monthly = [{"month": mth, **by_month[mth]} for mth in months_sorted]

    # Annual totals (complete calendar years only)
    annual_acc: dict[int, dict[str, int]] = {}
    month_count: dict[int, int] = {}
    for mth in months_sorted:
        yr = int(mth[:4])
        month_count[yr] = month_count.get(yr, 0) + 1
        acc = annual_acc.setdefault(yr, {})
        for k, v in by_month[mth].items():
            acc[k] = acc.get(k, 0) + v
    annual = [
        {"year": yr, **annual_acc[yr]}
        for yr in sorted(annual_acc)
        if month_count[yr] == 12
    ]

    # Settled/provisional split
    n = len(months_sorted)
    settled_end = max(0, n - cfg.provisional_months)
    settled_months = months_sorted[:settled_end]
    provisional = months_sorted[settled_end:]
    last_settled = settled_months[-1] if settled_months else None

    # Primary segment drives the headline
    primary_seg = next((s for s in cfg.segments if s.is_primary), cfg.segments[0] if cfg.segments else None)
    primary_sic = primary_seg.sic_codes[0] if primary_seg else list(cfg.sic_labels.keys())[0]
    primary_sic_label = cfg.sic_labels.get(primary_sic, "")

    p_series = _sic_series(by_month, months_sorted, primary_sic)
    p_settled = p_series[:settled_end]

    ttm_primary = _ttm(by_month, months_sorted, primary_sic, settled_end)
    ttm_union = _ttm(by_month, months_sorted, "union", settled_end)
    peak_val = max(p_settled) if p_settled else 0
    peak_month = settled_months[p_settled.index(peak_val)] if p_settled else None
    decade = _decade(annual, primary_sic) if annual else None

    # Zero-data SIC flags (lifted from construction)
    zero_sics = [
        sic for sic in cfg.sic_labels
        if months_sorted and all(by_month[m].get(sic, 0) == 0 for m in months_sorted)
    ]

    # Build per-segment blocks
    segments_out = [
        _build_segment_block(seg, by_month, months_sorted, settled_end, settled_months, cfg.thin_segment_min_ttm)
        for seg in cfg.segments
    ]

    # Niche-level thin flag: primary segment thin -> whole asset thin
    primary_seg_out = next((s for s in segments_out if s.get("is_primary")), segments_out[0] if segments_out else None)
    niche_thin = primary_seg_out["thin_segment"] if primary_seg_out else False

    # Headline keys use cfg.headline_prefix and cfg.union_ttm_key so the
    # property niche can emit "landlord_cos_settled" etc. for TS parity.
    pfx = cfg.headline_prefix
    headline: dict[str, Any] = {
        "primary_sic": primary_sic,
        "primary_sic_label": primary_sic_label,
        "last_settled_month": last_settled,
        f"{pfx}_cos_settled": p_settled[-1] if p_settled else None,
        f"{pfx}_cos_yoy_pct": _settled_yoy(p_settled),
        f"{pfx}_cos_ttm": ttm_primary,
        cfg.union_ttm_key: ttm_union,
        "decade": decade,
        "peak_month": peak_month,
        "peak_value": peak_val,
        "zero_data_sics": zero_sics,
        "thin": niche_thin,
    }

    # Sources list for meta (SourceRef -> dict); omit licence when blank
    sources_out = []
    for seg_src in cfg.secondary_sources:
        p = seg_src.provenance
        entry: dict[str, str] = {"name": p.name, "publisher": p.publisher, "url": p.url}
        if p.licence:
            entry["licence"] = p.licence
        if p.attribution:
            entry["attribution"] = p.attribution
        # Merge extra fields from the fetched secondary result (series/status/note)
        sd = (secondary_data or {}).get(seg_src.key, {})
        for extra_key in ("series", "status", "note"):
            if extra_key in sd:
                entry[extra_key] = sd[extra_key]
        sources_out.append(entry)

    # CH source always first (OGL licence). Attribution is per-site: use the niche's
    # own attribution string so the brand matches the site, not the construction pilot.
    ch_source = {
        "name": "Companies House Advanced Search API",
        "publisher": "Companies House",
        "url": "https://developer.company-information.service.gov.uk/",
        "licence": "Open Government Licence v3.0",
        "attribution": cfg.attribution or "Data sourced from Companies House under the Open Government Licence v3.0.",
    }
    meta_sources = [ch_source] + sources_out

    meta_dict: dict[str, Any] = {
        "generated_at": date.today().isoformat(),
        "incorporations_through": incorp_through,
        "incorporations_settled_through": last_settled,
        "provisional_months": provisional,
        "sic_labels": cfg.sic_labels,
        "sources": meta_sources,
        "notes": cfg.notes,
    }
    if cfg.attribution:
        meta_dict["attribution"] = cfg.attribution

    snap: dict[str, Any] = {
        "meta": meta_dict,
        "headline": headline,
        "incorporations": {"monthly": monthly, "annual": annual},
        "segments": segments_out,
        "secondary": {},
    }

    if cfg.division_labels:
        snap["meta"]["division_labels"] = cfg.division_labels

    # Inject secondary data
    if secondary_data:
        for key, data in secondary_data.items():
            snap["secondary"][key] = data

    # Hoist secondary keys to top-level for backward compat (e.g. house_prices)
    for sec_key, top_key in cfg.hoist_secondary_to_top.items():
        if sec_key in snap["secondary"]:
            snap[top_key] = snap["secondary"][sec_key]

    # Build annual_by_division from division segments (key starts with "div")
    div_segs = {s["key"]: s for s in segments_out if s["key"].startswith("div")}
    if div_segs:
        annual_by_year: dict[int, dict[str, Any]] = {}
        for key, seg in div_segs.items():
            for row in seg["annual"]:
                annual_by_year.setdefault(row["year"], {"year": row["year"]})
                annual_by_year[row["year"]][key] = row["count"]
        # Add union from main annual rows
        for a in annual:
            yr = a["year"]
            if yr in annual_by_year:
                annual_by_year[yr]["union"] = a.get("union", 0)
        snap["incorporations"]["annual_by_division"] = [
            annual_by_year[yr] for yr in sorted(annual_by_year)
        ]

    return snap
