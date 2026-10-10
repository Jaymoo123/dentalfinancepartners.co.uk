"""Backfill the committed per-keyword store (docs/_engines/link_engine_store) from data already paid for.

Inputs: docs/<site>/link_engine/<run>/raw/dfs_responses_<run>.tar.gz (raw DataForSEO responses archived from
  the old batch-keyed .cache), stages/02_metrics.csv and 04_serp.csv (cross-check and fallback), and
  inputs/dfs_cache_commercial.csv (legacy Supabase cache, reference only).
Output: the store files described in common.py. No API calls. Idempotent: rows already present
  (same keyword, endpoint, fetched_on, source hash) are not added twice.
  - search_volume responses -> keyword_metrics.csv, fetched_on = run date, oldest task id first so the
    newest response is the one readers take.
  - SERP responses -> serp/<yyyy-mm>/<sha1>.json.gz + serp_index.csv.
  - keyword_ideas response -> keyword_ideas/<sha1>.json.gz + keyword_ideas_index.csv.
  - Keywords in 02_metrics.csv / 04_serp.csv with no raw response are added from those stage files and
    counted in the report (expected 0).
  - Legacy rows get endpoint "legacy_supabase_cache" (original endpoint in source_response_sha256 as
    "legacy:<endpoint>"); store_lookup never serves them, so ranking stays single-source.
Cost: free.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import tarfile

from common import (IDEAS, KM_FIELDS, REPO, SERP, STORE, SV, UK_LOCATION, LANG, _csv_append, _csv_rows, _sv_rows,
                    ideas_key, ideas_store_write, norm_query, read_csv, run_dir, serp_store_lookup, serp_store_write)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    rd = run_dir(a.site, a.run)
    day = a.run[:10]
    tar = rd / "raw" / f"dfs_responses_{a.run}.tar.gz"
    seen = {(r["keyword"], r["endpoint"], r["fetched_on"], r["source_response_sha256"]) for r in _csv_rows(STORE / "keyword_metrics.csv")}
    sv_bodies, serp_bodies, ideas_bodies = [], [], []
    with tarfile.open(tar) as t:
        for m in t.getmembers():
            if not m.isfile():
                continue
            raw = t.extractfile(m).read()
            body = json.loads(raw)
            tk = body["tasks"][0]
            tail = "/".join(tk["path"][2:])
            if tail.endswith("search_volume/live"):
                sv_bodies.append((tk["id"], body, hashlib.sha256(json.dumps(body, sort_keys=True).encode()).hexdigest()))
            elif tail.endswith("organic/live/advanced"):
                serp_bodies.append(body)
            elif tail.endswith("keyword_ideas/live"):
                ideas_bodies.append(body)

    n_sv = 0
    for _, body, sha in sorted(sv_bodies, key=lambda x: x[0]):
        rows = [r for r in _sv_rows(body, day, sha, SV) if (r["keyword"], SV, day, sha) not in seen]
        for r in rows:
            seen.add((r["keyword"], SV, day, sha))
        _csv_append(STORE / "keyword_metrics.csv", KM_FIELDS, rows)
        n_sv += len(rows)

    n_serp = 0
    have_serp, _ = serp_store_lookup([d["tasks"][0]["data"]["keyword"] for d in serp_bodies])
    for body in serp_bodies:
        d = body["tasks"][0]["data"]
        if norm_query(d["keyword"]) not in have_serp:
            serp_store_write(d["keyword"], d.get("location_code", UK_LOCATION), d.get("device", "desktop"), body, day)
            n_serp += 1

    n_ideas = 0
    for body in ideas_bodies:
        d = body["tasks"][0]["data"]
        task = {"keywords": d["keywords"], "location_code": d.get("location_code", UK_LOCATION),
                "language_code": d.get("language_code", LANG), "limit": d.get("limit", 100)}
        if not any(r["seeds_sha1"] == ideas_key(task["keywords"], task["location_code"], task["language_code"], int(task["limit"]))
                   for r in _csv_rows(STORE / "keyword_ideas_index.csv")):
            ideas_store_write(task, body, day)
            n_ideas += 1

    # cross-check against the stage files; fall back to them for anything without a raw response
    st = rd / "stages"
    in_store = {r["keyword"] for r in _csv_rows(STORE / "keyword_metrics.csv") if r["endpoint"] == SV}
    miss_sv = [r for r in read_csv(st / "02_metrics.csv") if r["query"] not in in_store]
    rows = [{"keyword": r["query"], "location_code": UK_LOCATION, "language_code": LANG, "search_volume": r["volume"], "cpc": r["cpc"],
             "competition": r["competition"], "competition_index": "", "monthly_searches": "", "endpoint": SV, "fetched_on": day,
             "source_response_sha256": "stage02_fallback"} for r in miss_sv]
    _csv_append(STORE / "keyword_metrics.csv", KM_FIELDS, rows)
    have_serp, need_serp = serp_store_lookup([r["query"] for r in read_csv(st / "04_serp_summary.csv")])
    miss_serp = 0
    if need_serp:
        by_q = {}
        for r in read_csv(st / "04_serp.csv"):
            by_q.setdefault(r["query"], []).append(r)
        for q in need_serp:
            items = [{"type": "organic", "rank_group": int(r["rank"]), "domain": r["domain"], "url": r["url"], "title": r["title"]}
                     for r in by_q.get(q, [])]
            serp_store_write(q, UK_LOCATION, "desktop", {"status_code": 20000, "note": "rebuilt from stage 04_serp.csv",
                             "tasks": [{"result": [{"items": items}]}]}, day)
            miss_serp += 1

    # legacy reference rows
    leg_path = rd / "inputs" / "dfs_cache_commercial.csv"
    n_leg = 0
    if leg_path.exists():
        rows = []
        for r in read_csv(leg_path):
            k = norm_query(r["keyword"])
            sha = "legacy:" + r["endpoint"]
            key = (k, "legacy_supabase_cache", r["date_pulled"][:10], sha)
            if key in seen:
                continue
            seen.add(key)
            rows.append({"keyword": k, "location_code": UK_LOCATION, "language_code": LANG, "search_volume": r["search_volume"],
                         "cpc": r["cpc"], "competition": r["competition"], "competition_index": "", "monthly_searches": "",
                         "endpoint": "legacy_supabase_cache", "fetched_on": r["date_pulled"][:10], "source_response_sha256": sha})
        _csv_append(STORE / "keyword_metrics.csv", KM_FIELDS, rows)
        n_leg = len(rows)
    print(f"added: search_volume rows {n_sv} (+{len(miss_sv)} from stage 02 fallback), serp {n_serp} (+{miss_serp} rebuilt), "
          f"keyword_ideas {n_ideas}, legacy rows {n_leg}")


if __name__ == "__main__":
    main()
