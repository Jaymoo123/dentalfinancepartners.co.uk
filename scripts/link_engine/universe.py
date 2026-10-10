"""Stage 01: commercial keyword universe for one site, with auditable exclusions.

Inputs (run dir unless noted):
  link_engine config seeds (hire, decision) and cities
  inputs/dfs_cache_commercial.csv  (keyword,endpoint,search_volume,cpc,competition,keyword_difficulty,date_pulled)
  prior_universe (QRY_C: volume, cpc dated 2026-10-07) and prior_assignment (WP1: volume only)
  stages/03_gsc_query_page.csv  (fresh GSC queries; optional)
Output: stages/01_universe.csv, one row per normalised query, ALL candidates kept;
  intent_class is hire | decision | excluded, with excluded_reason.
Cost: free (no API calls).
Order: run gsc_pull.py first so GSC queries are included; the script is re-runnable
  after stage 03 (it simply re-reads it). metrics.py reads this file next.

Classifier: ordered named rules, first match wins (RULES below). Method follows
docs/_engines/COMMERCIAL_INTENT_DEMAND_2026-09-23.md section 1: reference queries are
checked first and override everything, except an exact seed which the owner chose.
"""
from __future__ import annotations

import argparse
import re
import time
from collections import OrderedDict

from common import REPO, load_site, norm_query, read_csv, run_dir, script_meta, write_csv

FIELDS = ["query", "source_flags", "intent_class", "excluded_reason", "geo",
          "cached_volume", "cached_cpc", "cached_date", "cached_source"]

PROVIDER = (r"\b(accountants?|accountancy|accounting (firm|firms|services?|compan(y|ies))|"
            r"tax (advis[eo]rs?|advice|specialists?|consultants?|experts?|planning))\b")
CONTEXT = (r"\b(propert(y|ies)|landlords?|buy to let|btl|rental|hmo|holiday lets?|spv|portfolio|"
           r"cgt|capital gains|stamp duty|sdlt|inheritance|iht|non[ -]resident|expat)\b")
NON_UK = (r"\b(usa|us|u s|america|american|australia|canada|canadian|india|dubai|uae|new york|"
          r"california|texas|florida|new zealand|south africa|singapore|hong kong|germany|spain|"
          r"portugal|cyprus|thailand|ireland|irish)\b")
# Decision rows need a property-context word SEPARATE from the decision-topic word, so bare
# "inheritance tax" / "inheritance estate tax" do not qualify (they dominated the first run).
DECISION_CONTEXT = (r"\b(propert(y|ies)|landlords?|buy to let|btl|rental|rent|let|lettings?|hmo|holiday lets?|spv|"
                    r"portfolio|house|flat|real estate)\b")
HOME_CONTEXT = r"\bhome\b"                      # counts only alongside a sell/gift/inherit topic word
HOME_TOPICS = r"\b(sell\w*|sale|gift\w*|inherit\w*|iht)\b"
# Narrow topic-word patterns (each match gives a span the context word must not overlap).
DECISION_TOPIC_WORDS = [
    r"\bincorporat\w*", r"\btransfer\w*", r"\b(limited company|ltd)\b",
    r"\b(sell|selling|sale)\b", r"\bgift\w*", r"\binherit\w*", r"\biht\b",
    r"\bnon[ -]resident\b", r"\bnrl\b", r"\bexpat\w*", r"\b(sdlt|stamp duty)\b",
    r"\brestructur\w*", r"\bpartnership\b", r"\bfamily investment company\b", r"\btrusts?\b",
]
# Which topic words count on their own, and which only as a pair/with a tax word (old rule shapes).
DECISION_TOPIC_RULES = [
    ("incorporation", [r"\bincorporat\w*"]),
    ("transfer_to_company", [r"\btransfer\w*", r"\b(limited company|ltd)\b"]),
    ("sell_tax", [r"\b(sell|selling|sale)\b", r"\btax\b"]),
    ("gift", [r"\bgift\w*"]),
    ("inherit", [r"\binherit\w*"]), ("iht", [r"\biht\b"]),
    ("non_resident", [r"\bnon[ -]resident\b"]), ("nrl", [r"\bnrl\b"]), ("expat", [r"\bexpat\w*"]),
    ("sdlt_transfer_mdr", [r"\b(sdlt|stamp duty)\b", r"\b(transfer\w*|multiple dwellings|mdr)\b"]),
    ("restructure", [r"\brestructur\w*"]), ("partnership", [r"\bpartnership\b"]),
    ("fic", [r"\bfamily investment company\b"]), ("trust", [r"\btrusts?\b"]),
]


BORROW = r"\b(mortgages?|remortgag\w*|loans?|lenders?|brokers?|bridging|equity release)\b"


def ctx_hit(q: str) -> bool:
    """A property-context word (DECISION_CONTEXT list; 'home' only beside sell/gift/inherit). Hire and decision rows both need one."""
    return bool(re.search(DECISION_CONTEXT, q) or (re.search(HOME_CONTEXT, q) and re.search(HOME_TOPICS, q)))


def decision_hit(q: str) -> bool:
    """Topic rule matches AND a context word exists outside every topic-word span."""
    hit = any(all(re.search(p, q) for p in pats) for _, pats in DECISION_TOPIC_RULES)
    if not hit:
        return False
    spans = [m.span() for p in DECISION_TOPIC_WORDS for m in re.finditer(p, q)]
    ctx = [m.span() for m in re.finditer(DECISION_CONTEXT, q)]
    if re.search(HOME_TOPICS, q):
        ctx += [m.span() for m in re.finditer(HOME_CONTEXT, q)]
    return any(all(c[1] <= t[0] or c[0] >= t[1] for t in spans) for c in ctx)


# Ordered rules: (name, test(raw_lower, norm, seed_kind) -> bool, class, reason). First match wins.
RULES = [
    # 1 owner-chosen seeds are kept as commercial whatever the words (no seed contains an exclusion word)
    # (a seed with no property-context word is NOT forced: it goes through the normal rules)
    ("seed_hire", lambda r, q, s: s == "hire" and ctx_hit(q), "hire", ""),
    ("seed_decision", lambda r, q, s: s == "decision" and ctx_hit(q), "decision", ""),
    # 2 operator queries are research probes, not demand
    ("site_operator", lambda r, q, s: "site:" in r, "excluded", "site_operator"),
    # 3 our brand and competitor brands (navigational)
    ("brand", None, "excluded", "brand"),
    # 4 careers and training: searcher wants a job or a qualification, not an accountant
    ("career", lambda r, q, s: bool(re.search(r"\b(jobs?|careers?|salary|salaries|vacanc\w+|apprentice\w*|courses?|training|qualifications?|become an?|how to become)\b", q)), "excluded", "career_jobs_training"),
    # 5 software and apps: buying a tool, not an adviser
    ("software", lambda r, q, s: bool(re.search(r"\b(software|apps?|platform|spreadsheets?)\b", q)), "excluded", "software_app"),
    # 5b borrowing intent: wants a lender or broker, not an adviser (unless an accountant/adviser word is present)
    ("borrower_intent", lambda r, q, s: bool(re.search(BORROW, q) and not re.search(PROVIDER, q)), "excluded", "borrower_intent"),
    # 6 non-UK geography ("ireland" allowed when non resident; northern ireland is UK)
    ("non_uk_geo", lambda r, q, s: bool(re.search(NON_UK, re.sub(r"northern ireland", "", q))) and not ("ireland" in q and re.search(r"non[ -]resident", q) and not re.search(r"\b(usa|us|america|australia|canada|india|dubai)\b", q)), "excluded", "non_uk_geo"),
    # 7 calculators, rates, forms, deadlines, templates: informational, the blog engine owns them
    ("calculator_rates_forms", lambda r, q, s: bool(re.search(r"\b(calculators?|calculate|calculating|estimator|rates?|forms?|deadlines?|login|log in|templates?|pdf|checklist|thresholds?|allowances?)\b", q)), "excluded", "calculator_rates_forms"),
    # 8 gov.uk / hmrc contact queries are navigational
    ("gov_navigational", lambda r, q, s: bool(re.search(r"\bgov uk\b|\bhmrc\b.*\b(phone|contact|number|helpline|email|address)\b|\b(phone|contact|number|helpline)\b.*\bhmrc\b", q)), "excluded", "gov_hmrc_navigational"),
    # 9 reference question shapes (COMMERCIAL_INTENT_DEMAND section 1)
    ("reference", lambda r, q, s: bool(re.search(r"^(what|whats) (is|are|does|do)\b|^how (does|do|did)\b.*\b(work|works)\b|^how does\b|^when (is|do|does|are|can)\b|\bexplained\b|\brules$|\bmeaning\b|\bdefinition\b|^can i\b(?!.*\b(afford|claim|cost)\b)", q)), "excluded", "reference_informational"),
    # 10 hire: provider word AND a property-context word (same list as decision)
    ("hire_provider_context", lambda r, q, s: bool(re.search(PROVIDER, q) and ctx_hit(q)), "hire", ""),
    # 10b provider + only a tax-topic word (cgt, inheritance, sdlt...) is not a property hire query
    ("no_property_context", lambda r, q, s: bool(re.search(PROVIDER, q) and re.search(CONTEXT, q)), "excluded", "no_property_context"),
    # 11 decision: a paid-advice decision topic AND a property-context word separate from it
    ("decision_topic", lambda r, q, s: decision_hit(q), "decision", ""),
    # 12 everything else is not a commercial search
    ("not_commercial", lambda r, q, s: True, "excluded", "not_commercial_intent"),
]


def classify(raw: str, q: str, seed_kind: str, brand_re) -> tuple[str, str, str]:
    """Return (rule_name, intent_class, reason)."""
    for name, test, cls, reason in RULES:
        hit = bool(brand_re.search(q)) if name == "brand" else test(raw, q, seed_kind)
        if hit:
            return name, cls, reason
    raise AssertionError("unreachable")


READING_OK = (r"\bin reading\b|\breading (accountants?|accountancy|tax|advis[eo]rs?|advice|specialists?|consultants?)\b|"
              r"\b(accountants?|accountancy|tax|advis[eo]rs?|advice|specialists?|consultants?) reading\b")


def geo_of(q: str, cities: list[str]) -> str:
    for c in sorted(cities, key=len, reverse=True):
        if re.search(rf"\b{re.escape(c)}\b", q):
            if c == "reading" and not re.search(READING_OK, q):
                continue          # "reading" is a city only next to an accountant/tax word or after "in"
            return c
    return ""


def num(v):
    try:
        return float(v) if str(v).strip() != "" else None
    except ValueError:
        return None


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--wait-minutes", type=float, default=0, help="poll for the DFS cache export this long")
    a = ap.parse_args()
    cfg = load_site(a.site)
    le, rd = cfg["link_engine"], run_dir(a.site, a.run)
    cache_csv = rd / "inputs" / "dfs_cache_commercial.csv"
    deadline = time.time() + a.wait_minutes * 60
    while not cache_csv.exists() and time.time() < deadline:
        time.sleep(20)
    if not cache_csv.exists():
        raise SystemExit(f"missing {cache_csv}; rerun with --wait-minutes N once the export lands (not fabricating)")
    brand_re = re.compile(r"\b(" + "|".join(re.escape(norm_query(b)) for b in le["brand_terms"]) + r")\b")

    cand: "OrderedDict[str, dict]" = OrderedDict()   # norm -> {raw, flags, seed, metrics:[(date,src,vol,cpc,rank)]}

    def add(raw, flag, seed=None, metric=None):
        q = norm_query(raw)
        if not q:
            return
        c = cand.setdefault(q, {"raw": str(raw).lower(), "flags": set(), "seed": "", "metrics": []})
        if "site:" in str(raw).lower():
            c["raw"] = str(raw).lower()
        c["flags"].add(flag)
        if seed and not c["seed"]:
            c["seed"] = seed
        if metric:
            c["metrics"].append(metric)

    for kind in ("hire", "decision"):
        for s in le["seeds"][kind]:
            add(s, f"seed_{kind}", seed=kind)
    for r in read_csv(cache_csv):
        vol = num(r.get("search_volume"))
        add(r["keyword"], "dfs_cache", metric=(str(r.get("date_pulled", ""))[:10], f"dfs_cache:{r.get('endpoint','')}", vol, num(r.get("cpc")), 1))
    for r in read_csv(REPO / le["prior_universe"]):
        add(r["query"], "qry_c", metric=("2026-10-07", "qry_c_2026-10-07", num(r.get("volume")), num(r.get("cpc")), 2))
    for r in read_csv(REPO / le["prior_assignment"]):
        add(r["query"], "wp1_assignment", metric=("2026-10-09", "wp1_assignment", num(r.get("monthly_volume")), None, 0))
    gsc = rd / "stages" / "03_gsc_query_page.csv"
    n_gsc = 0
    if gsc.exists():
        for r in read_csv(gsc):
            add(r["query"], "gsc")
            n_gsc += 1
    else:
        print("note: stage 03 not found, GSC queries not included (run gsc_pull.py first)")

    rows = []
    for q, c in cand.items():
        _, cls, reason = classify(c["raw"], q, c["seed"], brand_re)
        # best metric: has a volume; prefer one with cpc, then newest date, then source rank
        ms = [m for m in c["metrics"] if m[2] is not None]
        ms.sort(key=lambda m: (m[3] is not None, m[0], m[4]), reverse=True)
        m = ms[0] if ms else None
        rows.append({"query": q, "source_flags": "|".join(sorted(c["flags"])), "intent_class": cls,
                     "excluded_reason": reason, "geo": geo_of(q, le["cities"]),
                     "cached_volume": "" if not m else int(m[2]), "cached_cpc": "" if not m or m[3] is None else m[3],
                     "cached_date": "" if not m else m[0], "cached_source": "" if not m else m[1]})
    write_csv(rd / "stages" / "01_universe.csv", rows, FIELDS,
              {"source": "seeds + dfs_cache_commercial.csv + QRY_C + WP1 assignment + stage 03 GSC",
               "site": a.site, "data_through": a.run, "gsc_included": gsc.exists(),
               "gsc_query_page_rows_read": n_gsc, **script_meta()})
    from collections import Counter
    print(Counter(r["intent_class"] for r in rows))
    print(Counter(r["excluded_reason"] for r in rows if r["intent_class"] == "excluded").most_common(10))


if __name__ == "__main__":
    main()
