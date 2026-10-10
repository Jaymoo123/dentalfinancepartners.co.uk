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
  - A verdict with reader "manager" is final for its family (and its conflict pair, see cluster.py) and
    overrides reader disagreement; owner_basis "manager ruling (LE-n)", n taken from the start of its reason.
    It still must match the current input_sha256 or it is refused (and listed).
  - decision "owner" sets owner_page; "gap" sets "GAP: new page needed" and gap_brief; a gap whose
    gap_brief starts "EXCLUDE (no page):" marks the family excluded (owner_page "EXCLUDE (no page)",
    owner_basis "excluded by judgment"). Excluded and informational_with_ad_spend families stay in the
    file with no rank and are left out of the rollup.
  - Conflict disagreements (merge vs split) are listed in 07_disagreements.csv; cluster.py keeps those
    families apart.
"""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict

from cluster import conflict_sha
from common import load_site, read_csv, run_dir, script_meta, write_csv
from families import EXCLUDED_BASIS, FIELDS, FITS, QUEUE, ROLLUP, attach_leads, rerank, rollup, row_sha

CONF_ORDER = {"low": 0, "medium": 1, "high": 2}
EXCL = "EXCLUDE (no page):"
DIS = ["kind", "id", "head", "value_usd_month", "detail"] + \
      [f"{r}_{k}" for r in ("reader1", "reader2") for k in ("decision", "owner", "fit", "confidence", "reason")]


def is_excl(v) -> bool:
    return v["decision"] == "gap" and (v.get("gap_brief") or "").startswith(EXCL)


def agree_key(v) -> tuple:
    if v["decision"] == "gap":
        return ("gap", is_excl(v), v["commercial_fit"])
    return ("owner", v.get("owner_page") or "", v["commercial_fit"])


def dis_cols(vs: list) -> dict:
    out = {}
    for tag, v in zip(("reader1", "reader2"), sorted(vs, key=lambda v: v.get("reader", ""))):
        owner = "EXCLUDE" if is_excl(v) else ("GAP: new page needed" if v["decision"] == "gap" else v.get("owner_page") or "")
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
    jdir = rd / "judgments"
    for f in sorted(jdir.glob("*.jsonl")) if jdir.exists() else []:
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            v = json.loads(line)
            if v.get("decision") in ("merge", "split"):
                conflict_v[v.get("input_sha256") or ("pair", frozenset((v.get("keyword"), v.get("other_keyword"))))].append(v)
            elif v.get("decision") not in ("owner", "gap") or v.get("confidence") not in CONF_ORDER:
                refused.append((f.name, n, v.get("family_id"), "bad decision or confidence"))
            elif v.get("commercial_fit") not in FITS:
                refused.append((f.name, n, v.get("family_id"), "commercial_fit missing or not one of " + "|".join(FITS)))
            else:
                owner_v[v["family_id"]].append(v)

    rejudge, disagreements, applied, lone_low = [], [], Counter(), []
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
        mgr = [v for v in vs if v.get("reader") == "manager"]
        if mgr and mgr[-1].get("input_sha256") != q["input_sha256"]:
            refused.append(("manager", 0, fid, "manager verdict input_sha256 does not match the current queue row"))
            mgr = []
            vs = [v for v in vs if v.get("reader") != "manager"]
        match = [v for v in vs if v.get("input_sha256") == q["input_sha256"]]
        stale = [v for v in vs if v.get("input_sha256") != q["input_sha256"]]
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
        if mgr:
            v = mgr[-1]
            lm = re.match(r"LE-\d+", v["reason"])
            basis = f"manager ruling ({lm.group(0) if lm else 'LE-?'})"
        elif len(match) == 1:
            v = match[0]
            if v["confidence"] == "low":
                lone_low.append(fid)
                continue
            basis = f"judgment ({v['confidence']})"
        elif len({agree_key(v) for v in match}) > 1:
            r["owner_page"], r["owner_basis"], r["gap_brief"], r["commercial_fit"] = "", "OWNER DECISION NEEDED", "", ""
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

    fams = rerank(fams)
    attach_leads(fams, leads, le)
    disagreements.sort(key=lambda d: (d["kind"] != "family", -float(d["value_usd_month"] or 0)))
    meta = {"site": a.site, "data_through": a.run, **script_meta()}
    write_csv(st / "06_families.csv", fams, FIELDS, {"source": "06_families + judgments/*.jsonl", "applied": dict(applied),
                                                   "refused": len(refused), **meta})
    write_csv(st / "06_owner_rollup.csv", rollup(fams, leads, le), ROLLUP,
              {"source": "06_families (informational_with_ad_spend and excluded left out)", **meta})
    write_csv(st / "07_disagreements.csv", disagreements, DIS, {"source": "judgments reader1 vs reader2", **meta})
    write_csv(st / "07_rejudge_needed.csv", rejudge, ["family_id", "action", "reason"],
              {"source": "judgments whose input_sha256 no longer matches", **meta})
    print(f"applied {dict(applied)}; disagreements {Counter(d['kind'] for d in disagreements)}; "
          f"rejudge {Counter(r['action'] for r in rejudge)}; refused {len(refused)}")
    for x in refused:
        print("REFUSED", *x)


if __name__ == "__main__":
    main()
