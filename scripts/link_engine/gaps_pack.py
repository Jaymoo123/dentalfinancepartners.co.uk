"""Stage 12b: GAP_LIST.md, the plain-English owner readout of the link gaps (for checkpoint 1).

Inputs (run dir): stages/12_gaps.csv + 12_gaps_summary.json, 10_assignments.csv, 10_auto_audit_sample.csv, 08_pages.csv (titles),
  03_gsc_page.csv, inputs/leads_by_entry_page.csv, judgments/assign_*.jsonl (reasons for "none", audit result, manager rulings).
Output: docs/<site>/link_engine/<run>/GAP_LIST.md
Cost: free. Deterministic: no API calls, no generated prose, the same files always give the same text. Changes no stage output.
Run after assign.py, budget.py and gaps.py.
"""
from __future__ import annotations

import argparse
import glob
import json
import re
from collections import Counter, defaultdict

from assign import load_ctx
from common import read_csv, run_dir

KIND_TEXT = {
    "missing_primary": "A page has no link in its text to the sales page it should send readers to. We add one sentence.",
    "missing_secondary": "A second link to a different sales page, added where a page also fits a second service. Never more than two sales links per page.",
    "repoint_hire_anchor": "A page already says something like 'specialist property accountant' but the link goes to a guide. We point the same words at the sales page. This changes an existing sentence, it does not add one.",
    "competing_page": "A page that ranks better than our sales page for that sales page's searches. It should link to the sales page, without using the sales page's main search phrase as the link words, and its title is never changed.",
    "orphan_needs_inlink": "A page that no other page links to in its text. We suggest the most similar page to link to it.",
    "broken": "A link in a page's text that goes nowhere. We give the right page to point it at.",
}


def cell(s) -> str:
    return str(s if s not in (None, "") else "-").replace("|", "/").replace("\n", " ").replace("—", ",").replace("–", "-")


def table(head: list[str], rows: list[list]) -> list[str]:
    out = ["| " + " | ".join(head) + " |", "|" + "|".join("---" for _ in head) + "|"]
    out += ["| " + " | ".join(cell(c) for c in r) + " |" for r in rows]
    return out + [""]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    ctx = load_ctx(a.site, a.run)
    rd, st, pages = ctx["rd"], ctx["st"], ctx["pages"]
    gaps = read_csv(st / "12_gaps.csv")
    summ = json.loads((st / "12_gaps_summary.json").read_text(encoding="utf-8"))
    assigns = read_csv(st / "10_assignments.csv")
    sample = read_csv(st / "10_auto_audit_sample.csv")
    suffix = re.compile(r"\s*\|\s*Property Tax Partners\s*$")
    title = lambda r: suffix.sub("", pages[r]["title"]) if r in pages else r
    why = lambda r: f"{int(ctx['gsc_page'].get(r, [0, 0])[1])} impressions, {ctx['leads'].get(r, 0)} leads (90 days)"
    pr = lambda r: f"[{r}]"
    kinds = [k for k in KIND_TEXT if k in summ["by_kind"]]

    verdicts = defaultdict(list)
    for f in sorted(glob.glob(str(rd / "judgments" / "assign_*.jsonl"))):
        for ln in open(f, encoding="utf-8"):
            if ln.strip():
                v = json.loads(ln)
                verdicts[v["source"]].append(v)

    L = [f"# Link gap list: {a.site}, run {a.run}", "",
         "Built by scripts/link_engine/gaps_pack.py from the stage files. Each row is one link we propose to add or fix inside the text of a page "
         "(not menus, footers or related-article boxes). Nothing here has been edited on the site. "
         "A page's wave says when it is worth doing: wave 1 is pages with real search traffic or leads and the sales and audience pages themselves, "
         "wave 2 is the rest, and 'never' is pages we are not allowed to touch without your sign-off.", ""]

    # 1 per destination
    L += ["## 1. Sales pages: links in the text, today and planned", "",
          "Share of priority is the page's share of commercial search value (the non-resident page is held at a 5% floor by ruling LE-15). "
          "Planned counts add the new pages that would link to it; a page already linking is not counted twice.", ""]
    per = summ["per_destination_body_inlinks"]
    L += table(["Sales page", "Share of priority", "Links in today", "After wave 1", "After wave 2"],
               [[d, f"{v['share'] * 100:.1f}%", v["before_body_in"], v["after_wave1"], v["after_all_waves"]]
                for d, v in sorted(per.items(), key=lambda kv: -kv[1]["share"])])

    # 2 counts
    L += ["## 2. What the gaps are", ""]
    rows = []
    for k in kinds:
        w = summ["by_kind_wave"].get(k, {})
        rows.append([k, summ["by_kind"][k], w.get("1", 0), w.get("2", 0), w.get("never", 0), KIND_TEXT[k]])
    rows.append(["Total", summ["rows"], summ["by_wave"].get("1", 0), summ["by_wave"].get("2", 0), summ["by_wave"].get("never", 0), ""])
    L += table(["Kind", "Rows", "Wave 1", "Wave 2", "Needs your sign-off", "What it means"], rows)
    L += [f"Wave 1 work: about {summ['wave1_expected_new_sentences']} new sentences and {summ['wave1_expected_reworks']} existing sentences to rework.", ""]

    # 3 top 60
    w1 = sorted((r for r in gaps if r["wave"] == "1"), key=lambda r: (-float(r["priority_order"]), -float(r["source_value"]), r["source"], r["dest"]))
    L += ["## 3. Wave 1 in priority order", "",
          "Ranked by the page's value as a source times the share of priority of the page it links to.", ""]
    L += table(["#", "Source page", "Sends readers to", "Kind", "Why this page"],
               [[i, f"{title(r['source'])} ({r['source']})", r["dest"], r["kind"], why(r["source"])] for i, r in enumerate(w1[:60], 1)])
    L += [f"Plus {max(0, len(w1) - 60)} more wave 1 rows in stages/12_gaps.csv.", ""]

    # 4 sign-off
    nv = [r for r in gaps if r["wave"] == "never"]
    L += ["## 4. Needs your sign-off", "",
          "These pages are on the frozen list (top click drivers and conversion pages) or are pages that give up a search phrase and must wait for "
          "blueprint rule R6 (the new sales pages must be fetched by Google first). They are listed, never edited.", ""]
    L += table(["Page", "Why held", "Proposed link to", "Kind"],
               [[r["source"], "frozen" if r["source"] in ctx["frozen"] else "gives up a phrase (R6)", r["dest"], r["kind"]] for r in nv])

    # 5 repoints
    rep = [r for r in gaps if r["kind"] == "repoint_hire_anchor"]
    L += ["## 5. Repoints: hire wording that links to a guide", "",
          f"{len(rep)} existing links where the words offer hiring help but the link goes to a guide.", ""]
    rows = []
    for r in rep:
        m = re.match(r"body link '(.*)' -> (\S+?);", r["current_state"])
        rows.append([r["source"], m.group(1) if m else r["anchor"], m.group(2) if m else "", r["dest"], r["wave"]])
    L += table(["Page", "Current link words", "Currently points to", "Proposed target", "Wave"], rows)

    # 6 broken
    br = [r for r in gaps if r["kind"] == "broken"]
    L += ["## 6. Broken links", "", f"{len(br)} links that lead to a page that does not exist (all inside FAQ answers).", ""]
    rows = []
    for r in br:
        m = re.search(r"-> (\S+) \(not a built page\)", r["current_state"])
        rows.append([r["source"], r["anchor"], m.group(1) if m else "", r["dest"] or "no close match", r["note"]])
    L += table(["Page", "Link words", "Broken target", "Proposed fix", "Note"], rows)

    # 7 competing
    cp = [r for r in gaps if r["kind"] == "competing_page"]
    L += ["## 7. Competing pages", "",
          f"{len(cp)} pages that rank better than the sales page for its searches. Each should link to the sales page; none is retitled.", ""]
    L += table(["Page", "Should link to", "Wave", "Note"], [[r["source"], r["dest"], r["wave"], r["note"]] for r in cp])

    # 8 none
    none = [r for r in assigns if r["primary_dest"] == "none"]
    none.sort(key=lambda r: (-int(float(r["gsc_impressions"] or 0)), r["source"]))
    L += ["## 8. Pages that get no sales link", "",
          f"{len(none)} pages were judged to have no natural sales page to point to (for example borrowing, commercial property or generic VAT questions). "
          "They get no link and no budget. Ten with the most search impressions:", ""]
    rows = []
    for r in none[:10]:
        vs = verdicts.get(r["source"], [])
        v = next((x for x in vs if x.get("reader") == "manager" and x["primary_dest"] == "none"), None) or next((x for x in vs if x["primary_dest"] == "none"), {})
        rows.append([r["source"], r["gsc_impressions"], v.get("reason", "")])
    L += table(["Page", "Impressions (90 days)", "Reason from the judgment"], rows)

    # 9 how decided
    basis = Counter(re.sub(r"\s*\(carried.*", "", r["basis"]) for r in assigns)
    first = {}
    for s, vs in verdicts.items():
        for v in vs:
            if v.get("reader") not in ("manager", "reader2"):
                first.setdefault(s, v)
    agree = sum(1 for r in sample if r["source"] in first and first[r["source"]]["primary_dest"] == r["primary_dest"])
    mgr = [v for vs in verdicts.values() for v in vs if v.get("reader") == "manager"]
    rulings = Counter(m.group(0) for v in mgr for m in [re.match(r"LE-\d+", v.get("reason", ""))] if m)
    L += ["## 9. How this was decided", "",
          f"Each of {len(assigns)} pages was given one sales page to point to. Counts by how it was settled:", ""]
    L += table(["Basis", "Pages"], [[b, n] for b, n in sorted(basis.items(), key=lambda x: -x[1])])
    L += [f"Automatic checks: {basis.get('s1_strong', 0)} pages were settled by their own search queries and {basis.get('s2_specific', 0)} by a clear topic match to one specific page. "
          f"We checked a random sample of {len(sample)} of those automatic picks against a blind read by Opus: {agree} of {len(sample)} matched.", "",
          f"Where two readers disagreed, the manager settled {len(mgr)} pages (" + ", ".join(f"{k}: {n}" for k, n in sorted(rulings.items())) + "). "
          "The rulings are in scripts/link_engine/sites/property_rulings.md.", ""]
    out = rd / "GAP_LIST.md"
    out.write_text("\n".join(L), encoding="utf-8")
    print(f"wrote {out} ({len(L)} lines)")


if __name__ == "__main__":
    main()
