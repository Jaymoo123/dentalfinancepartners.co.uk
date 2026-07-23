"""Ashfield estate snapshot -- data pipeline.

Aggregates the whole estate into one JSON for the Ashfield hub site:
  - estate composition (15 brands) read from each <brand>/niche.config.json
  - estate-wide monthly lead counts from Supabase (aggregate only, no PII,
    never per-brand or per-lead), with a Poisson trend + simple forecast band
    (math ported from proposal_engine/analysis.py)
  - one headline series per child research data asset (*/web/src/data/*.json),
    with source attribution + licence carried through from the child metadata.

Output: ashfield/web/src/data/estate-snapshot.json

Usage (from repo root):
    python ashfield/pipeline/build_estate_snapshot.py

If Supabase creds are missing/unreachable the snapshot is still written with
"leads": null and the blocker printed. Idempotent: identical output on re-run
except meta.generated_at.
"""
from __future__ import annotations

import datetime as dt
import difflib
import json
import math
import os
import random
import re
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
OUT = ROOT / "ashfield" / "web" / "src" / "data" / "estate-snapshot.json"

# Folder names only; every displayed name/domain comes from niche.config.json.
BRANDS = sorted([
    "Property", "contractors-ir35", "construction-cis", "digital-agency",
    "care", "charities", "crypto", "Dentists", "ecommerce", "generalist",
    "hospitality", "Medical", "pharmacies", "Solicitors", "startups-tech",
])

PERIOD_KEYS = ["month", "period", "quarter", "date", "year", "birth_year",
               "cohort_year", "cohortYear"]
# ponytail: substring preference list picks the headline metric; refine
# per-asset overrides only if a specific asset's chart looks wrong.
VALUE_PREF = ["total", "union_net", "union", "incorporations", "net", "value",
              "index", "pct", "rate", "count"]
# keys never picked as the headline metric (baselines/comparators)
VALUE_SKIP = ["all_industr", "allindustr"]


# ---------------------------------------------------------------------------
# Estate composition
# ---------------------------------------------------------------------------

def load_estate() -> tuple[list[dict], dict[str, dict]]:
    sites = []
    configs = {}
    for brand in BRANDS:
        cfg = json.loads((ROOT / brand / "niche.config.json").read_text(encoding="utf-8"))
        configs[brand] = cfg
        routes = sorted(p.parent.name for p in
                        (ROOT / brand / "web" / "src" / "app" / "research").glob("*/page.tsx"))
        sites.append({
            "id": cfg["niche_id"],
            "name": cfg["display_name"],
            "domain": cfg["domain"],
            "niche": cfg["niche_id"],
            # no-em-dash rule: recast any em/en dash in taglines as a comma
            "sector": re.sub(r"\s*[—–]\s*", ", ", cfg["tagline"]) if cfg.get("tagline") else None,
            "research_assets": routes,
        })
    return sites, configs


# ---------------------------------------------------------------------------
# Child research assets
# ---------------------------------------------------------------------------

def _is_num(v) -> bool:
    return isinstance(v, (int, float)) and not isinstance(v, bool)


def _flatten1(item: dict) -> dict:
    """Flatten one nested-dict level: {"contractor": {"y1_pct": 91}} -> "contractor.y1_pct"."""
    out = {}
    for k, v in item.items():
        if isinstance(v, dict):
            for k2, v2 in v.items():
                out[f"{k}.{k2}"] = v2
        else:
            out[k] = v
    return out


def _find_series_candidates(node, path=""):
    """Yield (path, list) for lists of >=4 dicts sharing a period key + numeric key."""
    if isinstance(node, dict):
        for k in sorted(node):
            yield from _find_series_candidates(node[k], f"{path}.{k}" if path else k)
    elif isinstance(node, list) and len(node) >= 4 and all(isinstance(i, dict) for i in node):
        flat = [_flatten1(i) for i in node]
        keys = set(flat[0])
        pkey = next((p for p in PERIOD_KEYS if p in keys), None)
        if pkey and any(k != pkey and all(_is_num(i.get(k)) or i.get(k) is None for i in flat)
                        and any(_is_num(i.get(k)) for i in flat) for k in keys):
            yield path, flat


def _pick_value_key(items: list[dict], pkey: str) -> str | None:
    numeric = sorted(k for k in items[0]
                     if k != pkey and k not in PERIOD_KEYS
                     and not any(s in k.lower() for s in VALUE_SKIP)
                     and any(_is_num(i.get(k)) for i in items)
                     and all(_is_num(i.get(k)) or i.get(k) is None for i in items))
    if not numeric:
        return None
    for pref in VALUE_PREF:
        hit = [k for k in numeric if pref in k.lower()]
        if hit:
            return hit[0]
    return numeric[0]


def extract_series(doc: dict) -> tuple[list[dict], str | None]:
    """Best (series, unit) from a child snapshot; series as [{period, value}]."""
    cands = list(_find_series_candidates(doc))
    if not cands:
        return [], None

    def score(c):
        path, items = c
        leaf = path.split(".")[-1].lower()
        pref = ["monthly", "periods", "series", "annual", "quarters", "cohorts",
                "national", "cohortseries", "claimsseries", "incorporations"]
        rank = pref.index(leaf) if leaf in pref else len(pref)
        return (rank, -len(items), path)

    path, items = sorted(cands, key=score)[0]
    pkey = next(p for p in PERIOD_KEYS if p in items[0])
    vkey = _pick_value_key(items, pkey)
    if vkey is None:
        return [], None
    series = [{"period": str(i[pkey]), "value": i[vkey]}
              for i in items if i.get(pkey) is not None and _is_num(i.get(vkey))]
    return downsample(series), vkey


def downsample(series: list[dict], n: int = 24) -> list[dict]:
    if len(series) <= n:
        return series
    idx = sorted({round(i * (len(series) - 1) / (n - 1)) for i in range(n)})
    return [series[i] for i in idx]


def _first_source(doc: dict) -> dict:
    meta = doc.get("meta", {})
    src = None
    for cand in (meta.get("sources"), meta.get("source"), doc.get("source")):
        if isinstance(cand, dict) and cand:
            # {"companies_house": "..."} style or a single source object
            src = cand if "name" in cand or "url" in cand else {"name": sorted(cand)[0]}
        elif isinstance(cand, list) and cand:
            src = cand[0]
        elif isinstance(cand, str) and cand:
            src = {"name": cand}
        if src:
            break
    if isinstance(src, str):
        src = {"name": src}
    src = src or {}
    return {
        "name": src.get("name") or meta.get("publisher") or src.get("publisher"),
        "url": src.get("url") or meta.get("source_url") or src.get("source_url"),
        "licence": (src.get("licence") or src.get("license")
                    or meta.get("licence") or meta.get("license")),
    }


def _finding(name: str, series: list[dict], unit: str | None) -> str | None:
    if not series:
        return None
    first, last = series[0], series[-1]
    label = re.sub(r"[_\-]+", " ", unit or "value")
    txt = f"{label} at {last['value']} in {last['period']}"
    if _is_num(first["value"]) and first["value"] and first["period"] != last["period"]:
        chg = (last["value"] - first["value"]) / abs(first["value"]) * 100
        txt += f", {chg:+.1f}% vs {first['period']}"
    return txt[0].upper() + txt[1:] + "."


def build_assets(configs: dict[str, dict]) -> list[dict]:
    assets = []
    for brand in BRANDS:
        cfg = configs[brand]
        domain = cfg["domain"]
        routes = sorted(p.parent.name for p in
                        (ROOT / brand / "web" / "src" / "app" / "research").glob("*/page.tsx"))
        for f in sorted((ROOT / brand / "web" / "src" / "data").glob("*.json")):
            doc = json.loads(f.read_text(encoding="utf-8"))
            if not isinstance(doc, dict):
                continue
            slug = f.stem
            meta = doc.get("meta", {})
            series, unit = extract_series(doc)
            if len(routes) == 1:
                match = routes
            else:
                match = difflib.get_close_matches(slug, routes, n=1, cutoff=0.6)
            # ponytail: fuzzy slug->route match; falls back to /research hub
            # rather than risk linking the wrong report page
            report_url = f"https://{domain}/research/{match[0]}" if match else f"https://{domain}/research"
            src = _first_source(doc)
            name = (meta.get("title") or meta.get("name")
                    or slug.replace("-", " ").title())
            assets.append({
                "id": f"{cfg['niche_id']}/{slug}",
                "name": name,
                "brand": cfg["niche_id"],
                "series": series,
                "latest": series[-1]["value"] if series else None,
                "unit": unit,
                "finding": _finding(name, series, unit),
                "source": src["name"],
                "source_url": src["url"],
                "licence": src["licence"],
                "report_url": report_url,
            })
    return assets


# ---------------------------------------------------------------------------
# Leads (estate-wide aggregate only, no PII, no per-brand volumes)
# ---------------------------------------------------------------------------

def _env(*names) -> str | None:
    vals = {}
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.split("=", 1)
                vals[k.strip()] = v.strip()
    for n in names:
        v = os.environ.get(n) or vals.get(n)
        if v:
            return v
    return None


def _poisson_trend(counts: list[float]):
    """Fit log(mu) = a + b*t by IRLS (ported from proposal_engine/analysis.py,
    numpy-free). Returns (beta[2], cov 2x2)."""
    n = len(counts)
    t = list(range(n))
    a, b = math.log(max(sum(counts) / n, 0.5)), 0.0
    for _ in range(50):
        mu = [math.exp(a + b * ti) for ti in t]
        # weighted least squares on working response z = eta + (y-mu)/mu
        z = [(a + b * ti) + (y - m) / m for ti, y, m in zip(t, counts, mu)]
        s0 = sum(mu)
        s1 = sum(m * ti for m, ti in zip(mu, t))
        s2 = sum(m * ti * ti for m, ti in zip(mu, t))
        r0 = sum(m * zi for m, zi in zip(mu, z))
        r1 = sum(m * ti * zi for m, ti, zi in zip(mu, t, z))
        det = s0 * s2 - s1 * s1
        a_new = (s2 * r0 - s1 * r1) / det
        b_new = (s0 * r1 - s1 * r0) / det
        if max(abs(a_new - a), abs(b_new - b)) < 1e-10:
            a, b = a_new, b_new
            break
        a, b = a_new, b_new
    mu = [math.exp(a + b * ti) for ti in t]
    s0, s1, s2 = sum(mu), sum(m * ti for m, ti in zip(mu, t)), sum(m * ti * ti for m, ti in zip(mu, t))
    det = s0 * s2 - s1 * s1
    cov = [[s2 / det, -s1 / det], [-s1 / det, s0 / det]]
    return (a, b), cov


def _band(beta, cov, ti: float, z: float = 1.645):
    a, b = beta
    eta = a + b * ti
    se = math.sqrt(cov[0][0] + 2 * ti * cov[0][1] + ti * ti * cov[1][1])
    return math.exp(eta - z * se), math.exp(eta), math.exp(eta + z * se)


def _next_month(ym: str) -> str:
    y, m = int(ym[:4]), int(ym[5:7])
    return f"{y + m // 12}-{m % 12 + 1:02d}" if m == 12 else f"{y}-{m + 1:02d}"


def build_leads() -> tuple[dict | None, str | None]:
    url = _env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL")
    key = _env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")
    if not url or not key:
        return None, "Supabase creds missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in root .env)"
    try:
        req = urllib.request.Request(
            f"{url.rstrip('/')}/rest/v1/leads?select=created_at,email&order=created_at.asc&limit=10000",
            headers={"apikey": key, "Authorization": f"Bearer {key}"})
        rows = json.load(urllib.request.urlopen(req, timeout=30))
    except Exception as e:  # noqa: BLE001 - degrade gracefully, report blocker
        return None, f"Supabase unreachable: {e}"

    # Exclude test/QA leads (repo test scripts insert @example.com / *test* emails).
    real = [r for r in rows
            if not re.search(r"test|@example\.com", (r.get("email") or ""), re.I)]
    if not real:
        return None, "no leads returned after test-lead filter"

    months = Counter(r["created_at"][:7] for r in real)
    # continuous month axis, first lead month -> current month
    now_month = dt.date.today().strftime("%Y-%m")
    m = min(months)
    ordered = []
    while m <= now_month:
        ordered.append(m)
        m = _next_month(m)
    monthly = [{"month": mo, "count": months.get(mo, 0)} for mo in ordered]

    # Fit on complete months only (drop current partial month).
    fit = [x for x in monthly if x["month"] < now_month]
    trend = None
    forecast = []
    if len(fit) >= 3:
        counts = [float(x["count"]) for x in fit]
        beta, cov = _poisson_trend(counts)
        trend = {
            "model": "poisson_log_linear",
            "monthly_growth_pct": round((math.exp(beta[1]) - 1) * 100, 1),
            "fitted_latest": round(math.exp(beta[0] + beta[1] * (len(counts) - 1)), 1),
            "months_fitted": len(counts),
        }
    # Forecast: bootstrap run-rate band (pattern from proposal_engine/analysis.py
    # bootstrap_runrate), projected FLAT for the 2 months after the last month in
    # `monthly` -- no compounding growth, the Poisson slope stays descriptive only.
    days = 30
    cutoff = dt.date.today() - dt.timedelta(days=days)
    daily = Counter(dt.date.fromisoformat(r["created_at"][:10]) for r in real
                    if dt.date.fromisoformat(r["created_at"][:10]) >= cutoff)
    obs = [daily.get(cutoff + dt.timedelta(days=i), 0) for i in range(days)]
    rng = random.Random(7)  # seeded: identical band on re-run
    sims = sorted(sum(rng.choice(obs) for _ in range(days)) for _ in range(5000))
    lo, mid, hi = sims[len(sims) // 20], sum(obs), sims[-len(sims) // 20]
    fm = monthly[-1]["month"]
    for _ in range(2):
        fm = _next_month(fm)
        forecast.append({"month": fm, "low": lo, "mid": mid, "high": hi})
    return {"monthly": monthly, "trend": trend, "forecast": forecast}, None


# ---------------------------------------------------------------------------

def main() -> None:
    sites, configs = load_estate()
    assets = build_assets(configs)
    leads, leads_blocker = build_leads()

    snapshot = {
        "meta": {
            "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
            "sources": sorted({a["source"] for a in assets if a["source"]}) + [
                "Estate lead ledger (Supabase, aggregate monthly counts only)"],
        },
        "estate": {
            "sites": sites,
            "totals": {
                "sites": len(sites),
                # derived from per-site research routes so the headline total
                # always equals the sum of the portfolio rows
                "research_assets": sum(len(s["research_assets"]) for s in sites),
                "posts_estimate": None,
            },
        },
        "leads": leads,
        "assets": assets,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snapshot, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"[done] wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
    print(f"  sites={len(sites)} assets={len(assets)} "
          f"leads_months={len(leads['monthly']) if leads else 'null (' + str(leads_blocker) + ')'}")
    no_series = [a["id"] for a in assets if not a["series"]]
    if no_series:
        print(f"  [flag] {len(no_series)} assets with no extractable series: {no_series}")

    # Self-check
    assert len(sites) == 15, f"expected 15 sites, got {len(sites)}"
    assert all(s["id"] and s["name"] and s["domain"] for s in sites)
    assert assets and all(a["report_url"].startswith("https://") for a in assets)
    assert all(len(a["series"]) <= 24 for a in assets)
    banned = re.compile(r"email|phone|full_name|@", re.I)
    assert not banned.search(json.dumps(leads)) if leads else True, "PII-ish key in leads output"
    if leads:
        assert all(set(m) == {"month", "count"} for m in leads["monthly"])
    print("Self-check passed.")


if __name__ == "__main__":
    main()
