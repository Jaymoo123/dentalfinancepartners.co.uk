"""High-street map, Leg 10: turn measured questions into page topics. FREE.

Leg 9 established that demand sits on the mechanic, not the trade name, and counted the
questions per mechanic. This leg asks the next question: WITHIN a mechanic, what are
people actually asking about, and does that split into several pages or one?

Method: strip the seed phrase from every priced question, then count what is left.
The residue is the SUBJECT of the question. "vat on takeaway food", "vat on food in
restaurants" and "vat on cold food" share a seed and differ in subject, and the subject
is what a page is about.

A subject earns its own page when it carries enough volume and enough distinct
phrasings to sustain one. Everything else is a section inside the pillar page.

Writes page_plan.json and page_plan.txt.
"""
from __future__ import annotations

import importlib.util
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).parent
MECH = HERE / "raw" / "mechanic"

# Leg 9's filters, imported rather than restated. Reading the raw files without them
# let duty-free airports back into excise duty and DWP funeral payments back into the
# funeral exemption, which is the same contamination leg 9 already removed.
_spec = importlib.util.spec_from_file_location("l9", HERE / "l9_mechanic_demand.py")
_l9 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_l9)

STOP = {
    "the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are", "do",
    "does", "did", "can", "you", "your", "my", "i", "we", "what", "when", "how",
    "why", "which", "who", "there", "it", "be", "with", "from", "at", "as", "by",
    "if", "that", "this", "have", "has", "get", "got", "much", "many", "any",
    "uk", "gb", "britain", "british", "england", "vs", "versus", "s",
}

# Words that describe the mechanic itself rather than the subject of the question.
FRAME = {
    "tax", "taxes", "taxed", "taxable", "vat", "hmrc", "rate", "rates", "rated",
    "scheme", "schemes", "relief", "reliefs", "claim", "claims", "claiming",
    "exempt", "exemption", "exemptions", "charge", "charged", "charges", "pay",
    "paid", "paying", "cost", "costs", "price", "prices", "accounting", "accounts",
    "accountant", "accountants", "return", "returns", "rules", "rule", "duty",
    "allowance", "allowances", "deduction", "deductions", "deductible", "number",
    "calculator", "example", "explained", "guide", "meaning", "definition",
    "form", "forms", "certificate", "list", "check", "free",
}


def subject_tokens(kw: str, seed: str) -> list[str]:
    """What the question is ABOUT, once the mechanic's own vocabulary is removed."""
    text = kw.lower()
    for w in seed.lower().split():
        text = re.sub(rf"\b{re.escape(w)}\b", " ", text)
    toks = re.findall(r"[a-z][a-z&'-]+", text)
    return [t for t in toks if t not in STOP and t not in FRAME and len(t) > 2]


def main() -> None:
    demand = {d["mechanic"]: d for d in
              json.loads((HERE / "mechanic_demand.json").read_text(encoding="utf-8"))}

    plan = {}
    lines = []
    for path in sorted(MECH.glob("*.json")):
        d = json.loads(path.read_text(encoding="utf-8"))
        mech, seed = d["mechanic"], d["seed"]
        if mech not in demand:
            continue

        res = (d["body"]["tasks"][0].get("result") or [{}])[0] or {}
        items = res.get("items") or []

        # rebuild the priced, relevant question set the same way leg 9 did
        qs = []
        seen_ms: set[str] = set()
        ex = _l9.EXCLUDE.get(mech)
        for it in items:
            kw = it.get("keyword") or ""
            if _l9.JUNK_RE.search(kw) or not _l9.KEEP_RE.search(kw):
                continue
            if ex and re.search(ex, kw, re.I):
                continue
            ki = it.get("keyword_info") or {}
            vol = ki.get("search_volume") or 0
            if not vol:
                continue
            key = json.dumps([(m.get("year"), m.get("month"), m.get("search_volume"))
                              for m in ki.get("monthly_searches") or []])
            if key in seen_ms:
                continue
            seen_ms.add(key)
            qs.append((kw, vol))

        subj_vol: Counter[str] = Counter()
        subj_qs: dict[str, list[tuple[str, int]]] = defaultdict(list)
        no_subject = 0
        no_subject_vol = 0
        for kw, vol in qs:
            st = subject_tokens(kw, seed)
            if not st:
                no_subject += 1  # the bare mechanic question: that is the pillar itself
                no_subject_vol += vol
                continue
            for t in set(st):
                subj_vol[t] += vol
                subj_qs[t].append((kw, vol))

        # Merge subjects that are the same idea wearing different words. "second",
        # "hand" and "second-hand" all describe one page, and counting them as three
        # would treble the page count. Two subjects are the same when they are drawn
        # from substantially the same questions.
        cands = [t for t, _ in subj_vol.most_common(40)]
        merged: list[dict] = []
        used: set[str] = set()
        for t in cands:
            if t in used:
                continue
            qset = {k for k, _ in subj_qs[t]}
            group = [t]
            for u in cands:
                if u == t or u in used:
                    continue
                uset = {k for k, _ in subj_qs[u]}
                overlap = len(qset & uset) / max(1, min(len(qset), len(uset)))
                if overlap >= 0.7:
                    group.append(u)
                    qset |= uset
            used.update(group)
            vol = sum(v for k, v in {kk: vv for kk, vv in
                                     [(a, b) for g in group for a, b in subj_qs[g]]}.items())
            merged.append({
                "subject": " / ".join(sorted(group, key=len)[:3]),
                "volume": vol,
                "questions": len(qset),
                "examples": sorted(qset, key=lambda k: -dict(
                    [(a, b) for g in group for a, b in subj_qs[g]]).get(k, 0))[:4],
            })
        merged.sort(key=lambda m: -m["volume"])
        subjects = merged[:18]

        plan[mech] = {
            "seed": seed,
            "total_questions": len(qs),
            "pillar_questions": no_subject,
            "pillar_volume": no_subject_vol,
            "subjects": subjects,
        }

        lines.append(f"\n{'=' * 92}\n{mech.upper()}   seed '{seed}'   "
                     f"{len(qs)} priced questions   {demand[mech]['volume']}/mo")
        lines.append(f"  pillar-level questions (no subject, the mechanic itself): {no_subject}")
        lines.append(f"  {'subject':<20}{'vol/mo':>8}{'qs':>5}   example")
        for s in subjects[:12]:
            lines.append(f"  {s['subject']:<20}{s['volume']:>8}{s['questions']:>5}   "
                         f"{s['examples'][0][:56]}")

    (HERE / "page_plan.json").write_text(json.dumps(plan, indent=1), encoding="utf-8")
    out = "\n".join(lines)
    (HERE / "page_plan.txt").write_text(out, encoding="utf-8")
    print(out)


if __name__ == "__main__":
    main()
