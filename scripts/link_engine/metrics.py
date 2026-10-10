"""Stage 02: volume and CPC for commercial (hire + decision) queries only.

SINGLE-SOURCE POLICY: every hire/decision keyword's volume and cpc come from ONE endpoint,
keywords_data/google_ads/search_volume/live (UK 2826, en), one date. CPCs from different
endpoints are not comparable (evidence: "property tax accountant" cpc 14.76 in QRY_C 2026-10-07
vs 7.99 in the Aug keyword_suggestions cache). Cached, QRY_C and keyword_ideas values are kept
only as reference columns (prior_volume, prior_cpc, prior_source, prior_date) and never rank anything.
Inputs: stages/01_universe.csv (cached_* become the prior_* columns), link_engine seeds.
Outputs: stages/02_metrics.csv (+ 02_metrics_rejects.csv for keywords Google Ads would refuse).
Paid calls (all via common.dfs_post: reused only for the same endpoint+payload within 90 days,
ledgered, hard stop at $5.00/run):
  1. dataforseo_labs/google/keyword_ideas/live, ONCE, all seeds, limit 300 (about $0.05, cached).
     DISCOVERY only: commercial variants not already in the universe are added to the price list.
  2. keywords_data/google_ads/search_volume/live for ALL commercial rows, up to 1000 keywords
     per call: about $0.075 per call + $0.00004 per keyword (observed; estimate uses 0.0001).
cpc_currency: Google Ads CPC via DataForSEO is USD by convention. docs.dataforseo.com is a
JS-rendered page that could not be read from here and the response carries no currency field,
so the column says "USD (DataForSEO convention, unverified)". Account balance currency is USD.
--dry-run prints the count and estimate and makes no paid call.
Refuses (exit 2) if the estimate exceeds --max-estimate (default $1.00).
"""
from __future__ import annotations

import argparse
import re

from common import (UK_LOCATION, LANG, SV, dfs_balance, dfs_post, estimate_cost, ideas_store_lookup, store_lookup, load_site, norm_query,
                    read_csv, run_dir, run_spend, script_meta, write_csv)
from universe import classify, geo_of

FIELDS = ["query", "intent_class", "geo", "volume", "cpc", "cpc_currency", "competition",
          "metric_source", "metric_date", "prior_volume", "prior_cpc", "prior_source", "prior_date"]
CPC_CURRENCY = "USD (DataForSEO convention, unverified)"
REJECT_FIELDS = ["query", "reason"]
IDEAS_SRC = "dfs_keyword_ideas_{run}"
BATCH = 1000


def ads_reject(q: str) -> str:
    """Why Google Ads would refuse this keyword, or ''."""
    if len(q) > 80:
        return "over_80_chars"
    if len(q.split()) > 10:
        return "over_10_words"
    if not re.fullmatch(r"[a-z0-9 \-]+", q):
        return "unsupported_characters"
    return ""


def first_items(body: dict) -> list[dict]:
    out = []
    for t in body.get("tasks") or []:
        for res in t.get("result") or []:
            if "items" in res:
                out.extend(res["items"] or [])
            elif "keyword" in res:
                out.append(res)
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--max-estimate", type=float, default=1.00)
    ap.add_argument("--selftest", action="store_true",
                    help="dry-run proof: add one fake keyword and assert only that keyword would be priced")
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    rd = run_dir(a.site, a.run)
    uni = read_csv(rd / "stages" / "01_universe.csv")
    comm = {r["query"]: r for r in uni if r["intent_class"] in ("hire", "decision")}
    prior = {q: {"prior_volume": r["cached_volume"], "prior_cpc": r["cached_cpc"],
                 "prior_source": r["cached_source"], "prior_date": r["cached_date"]} for q, r in comm.items()}

    # 1. discovery: keyword_ideas (cached; never re-billed). Its volume/cpc are prior_* only.
    ideas_payload = [{"keywords": [s for k in ("hire", "decision") for s in le["seeds"][k]],
                      "location_code": UK_LOCATION, "language_code": LANG, "limit": 300}]
    est_ideas = estimate_cost("dataforseo_labs/google/keyword_ideas/live", ideas_payload)
    body = ideas_store_lookup(ideas_payload[0])        # committed store, keyed by the seed set
    if body is None:
        if a.dry_run:
            print(f"note: keyword_ideas not cached; would cost ~${est_ideas:.3f}")
        else:
            body = dfs_post("dataforseo_labs/google/keyword_ideas/live", ideas_payload, a.site, a.run)
    brand_re = re.compile(r"\b(" + "|".join(re.escape(norm_query(b)) for b in le["brand_terms"]) + r")\b")
    known = {r["query"] for r in uni}
    n_ideas, n_new, n_ideas_excl = 0, 0, 0
    for it in first_items(body or {}):
        q = norm_query(it.get("keyword", ""))
        ki = it.get("keyword_info") or {}
        n_ideas += 1
        _, cls, _ = classify(q, q, "", brand_re)
        if cls == "excluded":
            n_ideas_excl += 1
            continue
        if q in comm:
            continue
        if q not in known:
            n_new += 1
        comm[q] = {"query": q, "intent_class": cls, "geo": geo_of(q, le["cities"])}
        prior[q] = {"prior_volume": ki.get("search_volume") or 0, "prior_cpc": "" if ki.get("cpc") is None else ki.get("cpc"),
                    "prior_source": IDEAS_SRC.format(run=a.run), "prior_date": a.run}

    # 2. price EVERY commercial keyword from the one endpoint
    to_price, rejects = [], []
    for q in comm:
        why = ads_reject(q)
        if why:
            rejects.append({"query": q, "reason": why})
        else:
            to_price.append(q)
    have, need = store_lookup(to_price)                  # per keyword: only `need` is ever sent to the API
    if a.selftest:
        fake = "zz selftest fake keyword xyz"
        h2, n2 = store_lookup(to_price + [fake])
        assert n2 == need + [fake], f"selftest failed: expected only the fake keyword to be new, got {len(n2) - len(need)} extra"
        print(f"selftest ok: {len(h2)} keywords from the store, would price only {len(n2)} ({n2[-1]!r} is the fake one)")
        return
    batches = [need[i:i + BATCH] for i in range(0, len(need), BATCH)]
    payloads = [[{"keywords": b, "location_code": UK_LOCATION, "language_code": LANG}] for b in batches]
    est_sv = sum(estimate_cost(SV, p) for p in payloads)
    est = est_sv + (0.0 if body is not None else est_ideas)
    print(f"commercial rows {len(comm)} (ideas added {n_new}); to price {len(to_price)}: {len(have)} from the store, "
          f"{len(need)} new in {len(batches)} batch(es); rejects {len(rejects)}; est ${est:.4f}")
    bal0 = dfs_balance()
    print("DFS balance:", bal0)
    if a.dry_run:
        return
    if est > a.max_estimate:
        print(f"STOP: estimate ${est:.2f} > ${a.max_estimate:.2f}; report to manager, no call made")
        raise SystemExit(2)

    out = {}
    full = [to_price[i:i + BATCH] for i in range(0, len(to_price), BATCH)]
    for b in full:
        body = dfs_post(SV, [{"keywords": b, "location_code": UK_LOCATION, "language_code": LANG}], a.site, a.run)
        got = {norm_query(x.get("keyword", "")): x for x in first_items(body)}
        for q in b:
            x = got.get(q, {})
            out[q] = {"query": q, "intent_class": comm[q]["intent_class"], "geo": comm[q]["geo"],
                      "volume": x.get("search_volume") or 0, "cpc": "" if x.get("cpc") is None else x.get("cpc"),
                      "cpc_currency": CPC_CURRENCY, "competition": x.get("competition", ""),
                      "metric_source": f"dfs_search_volume_{a.run}", "metric_date": a.run, **prior[q]}
    bal1 = dfs_balance()
    rows = sorted(out.values(), key=lambda r: -(float(r["volume"] or 0)))
    write_csv(rd / "stages" / "02_metrics.csv", rows, FIELDS,
              {"source": "Google Ads search_volume/live (UK 2826, en), single source; prior_* columns are reference only",
               "site": a.site, "data_through": a.run, "dfs_balance_start": bal0, "dfs_balance_end": bal1,
               "run_spend_usd": run_spend(a.site, a.run), "n_priced_search_volume": len(to_price),
               "n_ideas_returned": n_ideas, "n_ideas_excluded_by_classifier": n_ideas_excl,
               "n_ideas_new_commercial": n_new, "cpc_currency": CPC_CURRENCY, **script_meta()})
    write_csv(rd / "stages" / "02_metrics_rejects.csv", rejects, REJECT_FIELDS,
              {"source": "pre-filter for Google Ads keyword rules", "site": a.site, "data_through": a.run, **script_meta()})
    print(f"wrote {len(rows)} rows; priced {len(to_price)}; ideas new commercial {n_new}; spend ${run_spend(a.site, a.run):.4f}")
    print("balance", bal0, "->", bal1)


if __name__ == "__main__":
    main()
