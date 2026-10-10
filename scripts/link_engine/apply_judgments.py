"""Stage 07: merge owner judgments into stages/06_families.csv.

Inputs: docs/<site>/link_engine/<run>/judgments/*.jsonl (one verdict per line, schema in
  rubrics/cluster_owner.md: family_id, decision, owner_page, gap_brief, commercial_fit, confidence,
  reason, input_sha256, reader), stages/06_owner_queue.csv, stages/06_families.csv,
  stages/05_cluster_conflicts.csv.
Outputs: stages/06_families.csv rewritten in place (re-sorted, re-ranked, owner-page leads recomputed), stages/06_owner_rollup.csv, stages/07_disagreements.csv (what goes to the
  owner) and stages/07_rejudge_needed.csv. Re-runnable: it only touches rows whose owner_basis is
  not "WP1 ruling", and families.py regenerates the file from scratch.
Cost: free.

Order: cluster.py (applies conflict merge/split verdicts) -> families.py -> this script.

Rules
  - A verdict is matched to the current queue row by input_sha256. A verdict whose hash no longer
    matches is NEVER silently dropped: if the family still exists and two or more readers gave the
    same answer, it is carried over (the family_id, i.e. the head, is unchanged); otherwise it is
    listed in 07_rejudge_needed.csv (action "rejudge"). A verdict for a family that no longer exists or
    is now WP1-ruled is listed with action "superseded". Conflict verdicts whose row is gone are listed too.
  - Every owner/gap verdict must carry commercial_fit (core_hire | paid_advice_decision |
    informational_with_ad_spend); one without it is refused.
  - Agreement of two readers: same decision, same owner_page, same commercial_fit. For gap verdicts: same
    decision, same EXCLUDE-or-not, same commercial_fit. Agree: applied at the lower confidence
    ("judgment (high|medium)", or "judgment (low, 2 readers agree)"). Disagree: owner_page blank,
    owner_basis "OWNER DECISION NEEDED", and a row in 07_disagreements.csv.
  - One reader: high or medium is applied. A lone low verdict has no second reader and aborts the run
    (the process guarantees a second reader for every low verdict).
  - A manager or owner ruling whose hash no longer matches is still applied when the family's head is unchanged and its
    deduped demand moved by 25% or less since the ruling matched (stages/07_ruling_snapshot.csv); owner_basis then reads
    "manager ruling (LE-n), carried by head" and the family is listed in 07_carried_rulings.csv. Opus reader verdicts keep the strict rule.
  - A verdict with reader "manager" is final for its family (and its conflict pair, see cluster.py) and
    overrides reader disagreement; owner_basis "manager ruling (LE-n)", n taken from the start of its reason.
    It still must match the current input_sha256 or it is refused (and listed).
  - LE-19 verdicts (decisions guide_owner | keep_sales_page | gap_guide_needed, judgments/le19_*.jsonl and manager rulings) are
    matched to stages/06_le19_queue.csv by input_sha256 (a family in no queue uses family_sha: sha256 of family_id, head and
    deduped demand). guide_owner sets owner_page to the guide and conversion_page to the previous sales owner; keep_sales_page
    changes nothing; gap_guide_needed sets owner_page "GAP: guide needed". Same reader / manager / carried-by-head rules as above.
  - decision "owner" sets owner_page; "gap" sets "GAP: new page needed" and gap_brief; a gap whose
    gap_brief starts "EXCLUDE (no page):" marks the family excluded (owner_page "EXCLUDE (no page)",
    owner_basis "excluded by judgment"). Excluded and informational_with_ad_spend families stay in the
    file with no rank and are left out of the rollup.
  - Conflict disagreements (merge vs split) are listed in 07_disagreements.csv; cluster.py keeps those
    families apart.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter, defaultdict

from cluster import conflict_sha
from common import load_site, read_csv, run_dir, script_meta, write_csv
from families import (CONV_ROLLUP, EXCLUDED_BASIS, FIELDS, FITS, QUEUE, ROLLUP, attach_leads, conversion_rollup, rerank, rollup,
                      row_sha)

CONF_ORDER = {"low": 0, "medium": 1, "high": 2}
LE19_DECISIONS = ("guide_owner", "keep_sales_page", "gap_guide_needed")
FINAL = ("manager", "owner")        # final rulings; may be carried across re-clustering (see main)
CARRY_TOL = 0.25


def fl(v) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0
EXCL = "EXCLUDE (no page):"
DIS = ["kind", "id", "head", "value_usd_month", "detail"] + \
      [f"{r}_{k}" for r in ("reader1", "reader2") for k in ("decision", "owner", "fit", "confidence", "reason")]


def family_sha(row: dict) -> str:
    """input_sha256 for a ruling on a family that sits in no queue (for example a WP1-ruled family): sha256 of the sorted-key
    JSON of family_id, head and deduped demand_volume (owner_page is left out because rulings change it)."""
    body = {"family_id": row["family_id"], "head": row["head"], "demand_volume": str(int(float(row["demand_volume"] or 0)))}
    return hashlib.sha256(json.dumps(body, sort_keys=True).encode("utf-8")).hexdigest()


def le19_key(v) -> tuple:
    return (v["decision"], v.get("owner_page") or "" if v["decision"] == "guide_owner" else "")


def is_excl(v) -> bool:
    return v["decision"] == "gap" and (v.get("gap_brief") or "").startswith(EXCL)


def agree_key(v) -> tuple:
    if v["decision"] == "gap":
        return ("gap", is_excl(v), v["commercial_fit"])
    return ("owner", v.get("owner_page") or "", v["commercial_fit"])


def dis_cols(vs: list) -> dict:
    out = {}
    for tag, v in zip(("reader1", "reader2"), sorted(vs, key=lambda v: v.get("reader", ""))):
        owner = v.get("owner_page") or v["decision"] if v["decision"] in LE19_DECISIONS else "EXCLUDE" if is_excl(v) else ("GAP: new page needed" if v["decision"] == "gap" else v.get("owner_page") or "")
        out.update({f"{tag}_decision": v["decision"], f"{tag}_owner": owner, f"{tag}_fit": v.get("commercial_fit") or "",
                    f"{tag}_confidence": v["confidence"], f"{tag}_reason": v["reason"]})
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    rd = run_dir(a.site, a.run)
    st = rd / "stages"
    fams = read_csv(st / "06_families.csv")
    by_id = {r["family_id"]: r for r in fams}
    queue = {r["family_id"]: r for r in read_csv(st / "06_owner_queue.csv")}
    clusters = read_csv(st / "05_clusters.csv")
    leads = {r["entry_path"]: r for r in read_csv(rd / "inputs" / "leads_by_entry_page.csv")}
    conflicts = read_csv(st / "05_cluster_conflicts.csv")

    owner_v, conflict_v, refused = defaultdict(list), defaultdict(list), []
    le19_v = defaultdict(list)
    jdir = rd / "judgments"
    for f in sorted(jdir.glob("*.jsonl")) if jdir.exists() else []:
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            v = json.loads(line)
            if "decision" not in v and "family_id" not in v:
                continue                      # another schema in the same folder (page-assignment verdicts, assign_*.jsonl)
            if v.get("decision") in ("merge", "split"):
                conflict_v[v.get("input_sha256") or ("pair", frozenset((v.get("keyword"), v.get("other_keyword"))))].append(v)
            elif v.get("decision") in LE19_DECISIONS:
                if v.get("confidence") not in CONF_ORDER:
                    refused.append((f.name, n, v.get("family_id"), "bad confidence"))
                elif v["decision"] == "guide_owner" and not v.get("owner_page"):
                    refused.append((f.name, n, v.get("family_id"), "guide_owner verdict without owner_page"))
                else:
                    le19_v[v["family_id"]].append(v)
            elif v.get("decision") not in ("owner", "gap") or v.get("confidence") not in CONF_ORDER:
                refused.append((f.name, n, v.get("family_id"), "bad decision or confidence"))
            elif v.get("commercial_fit") not in FITS:
                refused.append((f.name, n, v.get("family_id"), "commercial_fit missing or not one of " + "|".join(FITS)))
            else:
                owner_v[v["family_id"]].append(v)

    rejudge, disagreements, applied, lone_low = [], [], Counter(), []
    carried_rows, snap_new = [], {}
    snapshot = {r["input_sha256"]: r for r in (read_csv(st / "07_ruling_snapshot.csv") if (st / "07_ruling_snapshot.csv").exists() else [])}
    head_of_kw = {c["keyword"]: c["family_id"] for c in clusters}
    for fid, vs in sorted(owner_v.items()):
        q = queue.get(fid)
        if q is None:
            now = head_of_kw.get(fid.replace("-", " "))
            why = ("now WP1-ruled" if fid in by_id else
                   f"family merged into {now}" if now and now != fid else "family no longer exists")
            rejudge.append({"family_id": fid, "action": "superseded", "reason": why})
            continue
        if row_sha({k: q[k] for k in QUEUE}) != q["input_sha256"]:
            refused.append(("queue", 0, fid, "queue row no longer hashes to its stored input_sha256"))
            continue
        mgr = [v for v in vs if v.get("reader") in FINAL]
        carried = False
        if mgr and mgr[-1].get("input_sha256") != q["input_sha256"]:
            # A manager / owner ruling survives re-clustering when the family's head is unchanged and its deduped demand moved
            # by 25% or less since the ruling was applied (07_ruling_snapshot.csv). Opus reader verdicts keep the strict sha rule.
            old = snapshot.get(mgr[-1].get("input_sha256"))
            cur = by_id[fid]
            if (old and old["head"] == cur["head"]
                    and abs(fl(cur["demand_volume"]) - fl(old["demand_volume"])) <= CARRY_TOL * max(fl(old["demand_volume"]), 1.0)):
                carried = True
                carried_rows.append({"family_id": fid, "head": cur["head"], "reader": mgr[-1]["reader"],
                                     "old_demand": old["demand_volume"], "new_demand": cur["demand_volume"],
                                     "old_input_sha256": mgr[-1]["input_sha256"], "new_input_sha256": q["input_sha256"]})
            else:
                refused.append((mgr[-1]["reader"], 0, fid, "ruling input_sha256 does not match the current queue row "
                                "(head or demand moved too far to carry)"))
                mgr = []
                vs = [v for v in vs if v.get("reader") not in FINAL]
        match = [v for v in vs if v.get("input_sha256") == q["input_sha256"] or (carried and v is mgr[-1])]
        stale = [v for v in vs if v not in match]
        note = ""
        if not match and stale:
            if len(stale) > 1 and len({agree_key(v) for v in stale}) == 1:
                match, note = stale, " (carried over after merge: readers agree, head unchanged)"
            else:
                rejudge.append({"family_id": fid, "action": "rejudge",
                                "reason": f"queue row changed after merge (sha mismatch); {len(stale)} stale verdict(s), "
                                          + ("readers disagree" if len(stale) > 1 else "single reader")})
                continue
        elif match and stale and not mgr:
            rejudge.append({"family_id": fid, "action": "rejudge",
                            "reason": f"{len(stale)} stale verdict(s) ignored; applied the matching one alone"})
        r = by_id[fid]
        if r["owner_basis"] == "WP1 ruling":
            continue
        if not match:             # every verdict for this family was refused (e.g. a stale manager ruling)
            rejudge.append({"family_id": fid, "action": "rejudge", "reason": "no usable verdict (refused or stale)"})
            continue
        if mgr:
            v = mgr[-1]
            lm = re.match(r"LE-\d+", v["reason"])
            basis = f"{v['reader']} ruling ({lm.group(0) if lm else 'LE-?'})" + (", carried by head" if carried else "")
            if not carried:
                snap_new[v["input_sha256"]] = {"input_sha256": v["input_sha256"], "family_id": fid, "head": by_id[fid]["head"],
                                               "demand_volume": by_id[fid]["demand_volume"], "reader": v["reader"]}
        elif len(match) == 1:
            v = match[0]
            if v["confidence"] == "low":
                lone_low.append(fid)
                continue
            basis = f"judgment ({v['confidence']})"
        elif len({agree_key(v) for v in match}) > 1:
            r["owner_page"], r["owner_basis"], r["gap_brief"], r["commercial_fit"] = "", "OWNER DECISION NEEDED", "", ""
            r["conversion_page"], r["le19_decision"] = "", ""
            r["judgment_reason"] = " || ".join(f"{v.get('reader', '?')}: {agree_key(v)}; {v['reason']}" for v in match)
            disagreements.append({"kind": "family", "id": fid, "head": r["head"], "value_usd_month": r["value_usd_month"],
                                  "detail": "", **dis_cols(match)})
            applied["readers disagree"] += 1
            continue
        else:
            v = min(match, key=lambda v: CONF_ORDER[v["confidence"]])
            low = v["confidence"]
            basis = f"judgment ({low})" if low != "low" else "judgment (low, 2 readers agree)"
        if is_excl(v):
            r["owner_page"], r["owner_basis"] = "EXCLUDE (no page)", EXCLUDED_BASIS
            applied[EXCLUDED_BASIS] += 1
        else:
            r["owner_page"] = "GAP: new page needed" if v["decision"] == "gap" else v["owner_page"]
            r["owner_basis"] = basis
            applied[basis] += 1
        r["gap_brief"], r["judgment_reason"], r["commercial_fit"] = v.get("gap_brief") or "", v["reason"] + note, v["commercial_fit"]
        r["conversion_page"], r["le19_decision"] = r["owner_page"], ""
    if lone_low:
        raise SystemExit(f"ABORT: {len(lone_low)} low-confidence verdicts have no second reader: {lone_low}")

    # conflicts: disagreements and verdicts whose row is gone
    cur = {conflict_sha(c): c for c in conflicts}
    cur.update({("pair", frozenset((c["keyword"], c["other_keyword"]))): c for c in conflicts})   # manager rulings may name the pair
    for h, vs in conflict_v.items():
        c = cur.get(h)
        if c is None:
            rejudge.append({"family_id": vs[0].get("family_id", ""), "action": "rejudge",
                            "reason": "conflict row changed or gone (sha not in 05_cluster_conflicts.csv)"})
        elif (len({v["decision"] for v in vs}) > 1 and not any(v.get("reader") == "manager" for v in vs)
              and ("pair", frozenset((c["keyword"], c["other_keyword"]))) not in conflict_v):
            by_fam = by_id.get(next((k["family_id"] for k in clusters if k["keyword"] == c["keyword"]), ""), {})
            disagreements.append({"kind": "conflict", "id": f"{c['keyword']} | {c['other_keyword']}", "head": c["keyword"],
                                  "value_usd_month": by_fam.get("value_usd_month", ""),
                                  "detail": f"{c['conflict_type']}; shared_urls {c['shared_urls']}; volumes {c['volumes']}; kept apart",
                                  **dis_cols(vs)})

    # LE-19: guide owns the search, the sales page converts (decisions guide_owner / keep_sales_page / gap_guide_needed)
    le19_queue = {r["family_id"]: r for r in (read_csv(st / "06_le19_queue.csv") if (st / "06_le19_queue.csv").exists() else [])}
    for fid, vs in sorted(le19_v.items()):
        r = by_id.get(fid)
        if r is None:
            rejudge.append({"family_id": fid, "action": "superseded", "reason": "LE-19 verdict: family no longer exists"})
            continue
        cur_sha = le19_queue[fid]["input_sha256"] if fid in le19_queue else family_sha(r)
        fin = [v for v in vs if v.get("reader") in FINAL]
        carried = False
        if fin and fin[-1].get("input_sha256") != cur_sha:
            old = snapshot.get(fin[-1].get("input_sha256"))
            if (old and old["head"] == r["head"]
                    and abs(fl(r["demand_volume"]) - fl(old["demand_volume"])) <= CARRY_TOL * max(fl(old["demand_volume"]), 1.0)):
                carried = True
                carried_rows.append({"family_id": fid, "head": r["head"], "reader": fin[-1]["reader"], "old_demand": old["demand_volume"],
                                     "new_demand": r["demand_volume"], "old_input_sha256": fin[-1]["input_sha256"], "new_input_sha256": cur_sha})
            else:
                refused.append((fin[-1]["reader"], 0, fid, "LE-19 ruling input_sha256 does not match the current row"))
                fin = []
        match = [v for v in vs if v.get("input_sha256") == cur_sha or (carried and v is fin[-1])]
        stale = [v for v in vs if v not in match and v.get("reader") not in FINAL]
        if stale and not match:
            rejudge.append({"family_id": fid, "action": "rejudge", "reason": f"LE-19 queue row changed; {len(stale)} stale verdict(s)"})
            continue
        if not match:
            continue
        if fin and match and fin[-1] in match:
            v = fin[-1]
            lm = re.match(r"LE-\d+", v["reason"])
            basis = f"{v['reader']} ruling ({lm.group(0) if lm else 'LE-?'})" + (", carried by head" if carried else "")
            if not carried:
                snap_new[v["input_sha256"]] = {"input_sha256": v["input_sha256"], "family_id": fid, "head": r["head"],
                                               "demand_volume": r["demand_volume"], "reader": v["reader"]}
        elif len(match) == 1:
            v = match[0]
            if v["confidence"] == "low":
                lone_low.append(fid)
                continue
            basis = f"judgment ({v['confidence']}), LE-19"
        elif len({le19_key(v) for v in match}) > 1:
            disagreements.append({"kind": "le19", "id": fid, "head": r["head"], "value_usd_month": r["value_usd_month"],
                                  "detail": "LE-19 guide-owner readers disagree; owner unchanged", **dis_cols(match)})
            applied["LE-19 readers disagree"] += 1
            continue
        else:
            v = min(match, key=lambda x: CONF_ORDER[x["confidence"]])
            basis = f"judgment ({v['confidence']}), LE-19" if v["confidence"] != "low" else "judgment (low, 2 readers agree), LE-19"
        sales = r["conversion_page"] or r["owner_page"]
        r["le19_decision"] = v["decision"]
        if v["decision"] == "guide_owner":
            r["owner_page"], r["conversion_page"], r["owner_basis"] = v["owner_page"], sales, basis
        elif v["decision"] == "gap_guide_needed":
            r["owner_page"], r["conversion_page"], r["owner_basis"] = "GAP: guide needed", sales, basis
            r["gap_brief"] = v.get("gap_brief") or ""
        else:                                    # keep_sales_page: owner and conversion stay the sales page
            r["conversion_page"] = r["owner_page"] = sales
        r["judgment_reason"] = v["reason"]
        applied[f"LE-19 {v['decision']}"] += 1
    if lone_low:
        raise SystemExit(f"ABORT: {len(lone_low)} low-confidence verdicts have no second reader: {lone_low}")

    fams = rerank(fams)
    attach_leads(fams, leads, le)
    disagreements.sort(key=lambda d: (d["kind"] != "family", -float(d["value_usd_month"] or 0)))
    meta = {"site": a.site, "data_through": a.run, **script_meta()}
    write_csv(st / "06_families.csv", fams, FIELDS, {"source": "06_families + judgments/*.jsonl", "applied": dict(applied),
                                                   "refused": len(refused), **meta})
    write_csv(st / "06_owner_rollup.csv", rollup(fams, leads, le), ROLLUP,
              {"source": "06_families (informational_with_ad_spend and excluded left out)", **meta})
    write_csv(st / "06_conversion_rollup.csv", conversion_rollup(fams, leads, le), CONV_ROLLUP,
              {"source": "06_families grouped by conversion_page (LE-19)", **meta})
    write_csv(st / "07_disagreements.csv", disagreements, DIS, {"source": "judgments reader1 vs reader2", **meta})
    write_csv(st / "07_carried_rulings.csv", carried_rows,
              ["family_id", "head", "reader", "old_demand", "new_demand", "old_input_sha256", "new_input_sha256"],
              {"source": "manager/owner rulings applied although the queue row hash changed (same head, demand within 25%)", **meta})
    write_csv(st / "07_ruling_snapshot.csv", list({**snapshot, **snap_new}.values()),
              ["input_sha256", "family_id", "head", "demand_volume", "reader"],
              {"source": "head and deduped demand at the time each manager/owner ruling matched its queue row", **meta})
    write_csv(st / "07_rejudge_needed.csv", rejudge, ["family_id", "action", "reason"],
              {"source": "judgments whose input_sha256 no longer matches", **meta})
    stale = {x["family_id"] for x in rejudge if x["action"] == "rejudge"}
    new = sorted((r for r in fams if r["owner_basis"] == "needs judgment"), key=lambda r: -float(r["value_usd_month"] or 0))
    write_csv(st / "06_new_families_since_judgment.csv",
              [{"family_id": r["family_id"], "head": r["head"], "demand_volume": r["demand_volume"],
                "value_usd_month": r["value_usd_month"], "top_keywords": r["top_keywords"],
                "status": "verdict stale (see 07_rejudge_needed.csv)" if r["family_id"] in stale else "new family, no verdict"}
               for r in new],
              ["family_id", "head", "demand_volume", "value_usd_month", "top_keywords", "status"],
              {"source": "families still 'needs judgment' after applying judgments/*.jsonl", **meta})
    print(f"applied {dict(applied)}; disagreements {Counter(d['kind'] for d in disagreements)}; "
          f"rejudge {Counter(r['action'] for r in rejudge)}; refused {len(refused)}")
    for x in refused:
        print("REFUSED", *x)


if __name__ == "__main__":
    main()
