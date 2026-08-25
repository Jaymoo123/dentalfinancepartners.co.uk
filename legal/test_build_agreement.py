"""test_build_agreement.py: self-check for the combined agreement. Run: python legal/test_build_agreement.py

Asserts the properties the build step exists to guarantee:

  1. every price in Schedule 1 comes from config/tiers.json, not from prose
  2. the caps in Schedule 1 match the caps the engine enforces
  3. Schedule 2 carries the whole data protection layer, all 16 clauses
  4. Schedule 2 is byte-identical to legal/DSA_TEMPLATE.md, so the DP layer cannot fork,
     and Schedule 1 paragraph 7 is byte-identical to the rubric in docs/CLASSIFY.md, so
     the rubric the contract warrants against is the one we actually grade by
  5. no placeholder survives into a document that gets signed
  6. the retired commercial model cannot reappear in a document sent to a buyer
  7. the document is fit to send: no em-dashes, horizontal rules, bold, HTML
     comments, internal file paths, bracket placeholders or duplicated sentences
  8. Schedule 2 does not repeat the term, general or governing law clauses that the
     commercial layer already carries
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE.parent / "lead_engine" / "scripts"))
import build_agreement as build  # noqa: E402
import docprep  # noqa: E402
import tiers  # noqa: E402

# Phrases from superseded models. Any of these in a buyer-facing document means an
# earlier price card or contract shape has bled back in.
RETIRED = [
    "Option A", "Option B", "review and select", "Selected Lead", "Selection Window",
    "Anonymised Summary", "one firm at a time", "exclusive flow", "very high",
    "£100 per", "£250 per", "£150 per", "Trial Period", "DJH", "Haines Watts", "Reflex",
]


def main():
    doc = build.build()
    cfg = tiers.load_tiers()
    sched1 = doc.split("# SCHEDULE 1")[1].split("# SCHEDULE 2")[0]
    sched2 = doc.split("# SCHEDULE 2")[1]

    # 1: every priced tier's price appears in Schedule 1, from the config.
    for t in cfg["tiers"]:
        price = t.get("price") or t.get("price_per_lead_equiv")
        assert f"£{price}" in sched1, f"{t['id']} price £{price} missing from Schedule 1"
        # Last call was removed on 2026-08-14. If a reduced price ever comes back into
        # the config, it has to be stated in the contract rather than applied silently.
        # Checked against the config rather than the prose, because the agreement does
        # say "there is no reduced or last-call price", which is the point.
        assert "last_call_price" not in t.get("decay", {}), (
            f"{t['id']} has a last-call price in config but the agreement no longer "
            "states one; add it back to Schedule 1 before reintroducing it")
    print(f"  ok: all {len(cfg['tiers'])} tier prices in Schedule 1 trace to config/tiers.json")

    # 2: caps and multiplier match what claim.py enforces.
    acc, adj = cfg["claim_slots_per_lead"], cfg["adjacent_claim_slots_per_lead"]
    assert adj is not None, "adjacent lane uncapped: Schedule 1 cannot state a maximum"
    for want in (f"| {acc} |", f"| {adj} |", f"| {acc + adj} |"):
        assert want in sched1, f"Schedule 1 caps table missing {want.strip('| ')}"
    assert f"{cfg['exclusive_multiplier']} times the lead's price" in sched1
    print(f"  ok: Schedule 1 states caps {acc} + {adj} = {acc + adj} and the "
          f"{cfg['exclusive_multiplier']}x multiplier")

    # 3 + 8: the operative DP layer is present, and the boilerplate that would
    # duplicate the commercial clauses is not.
    for n in list(range(1, 13)) + [14]:
        assert re.search(rf"^## {n}\. ", sched2, re.M), f"Schedule 2 is missing clause {n}"
    for n, why in ((13, "term and termination"), (15, "general"), (16, "governing law")):
        assert not re.search(rf"^## {n}\. ", sched2, re.M), (
            f"Schedule 2 repeats clause {n} ({why}); the commercial clauses cover it once")
    for annex in ("ANNEX A: DATA SPECIFICATION", "ANNEX B: PRIVACY NOTICE WORDING"):
        assert annex in sched2, f"Schedule 2 is missing {annex}"
    print("  ok: Schedule 2 carries clauses 1-12 and 14 plus both Annexes, and repeats nothing")

    # 4: reproduced verbatim from the standing DSA, so reviewing one reviews the other.
    dsa = build.DSA.read_text(encoding="utf-8")
    for name, drop in (("dsa", True), ("dsaannex", False)):
        block = build.marker_block(dsa, name, build.DSA.name, drop_standalone=drop)
        block = docprep.clean(block).strip()
        assert block in doc, f"the {name} block is not reproduced verbatim in the agreement"
    print("  ok: the data protection layer is reproduced verbatim from the standing DSA")

    # 4b: clauses 6.1, 6.3 and 11.3 warrant grading "under the published rubric", and
    # a credit under 6.5(b) is judged against it. Until 2026-08-17 nothing in the signed
    # document said what it was, so there was no agreed reference to cite in a dispute.
    # Schedule 1 paragraph 7 now reproduces it verbatim from the operative rubric.
    rubric = build.marker_block(
        build.CLASSIFY.read_text(encoding="utf-8"), "rubric", build.CLASSIFY.name)
    assert docprep.clean(build.demote(rubric)).strip() in sched1, (
        "Schedule 1 does not reproduce docs/CLASSIFY.md verbatim; the rubric the "
        "agreement warrants against would differ from the one we grade by")
    for t in cfg["tiers"]:
        if t.get("batch") or t["id"] == "adjacent":
            continue  # a delivery lane and an eligibility state, not grades
        assert re.search(rf"^#### {t['label']}$", sched1, re.M), (
            f"Schedule 1 rubric has no {t['label']} tier heading")
    assert '"Rubric" means' in doc, "Rubric is used in the clauses but never defined"
    print("  ok: Schedule 1 reproduces the grading rubric and every graded tier")

    # 5: build() already exits on these; assert the built text really is clean.
    for token in ("{{", "[INSERT", "<!-- schedule1 -->", "<!-- schedule2 -->", "<!-- annexes -->"):
        assert token not in doc, f"{token!r} survived into the built agreement"
    print("  ok: no placeholder or unsubstituted marker survives")

    # 6: no superseded model wording.
    found = [p for p in RETIRED if p.lower() in doc.lower()]
    assert not found, f"superseded model wording in the agreement: {found}"
    print(f"  ok: none of the {len(RETIRED)} retired model phrases appear")

    # 7: fit to send. This is the check that would have caught a build comment naming
    # internal file paths reaching page 1 of a signing copy on 2026-08-14.
    for name, path in (("combined agreement", None),
                       ("standing DSA", build.DSA),
                       ("commercial template", build.TEMPLATE)):
        text = doc if path is None else docprep.clean(path.read_text(encoding="utf-8"))
        issues = docprep.problems(text)
        assert not issues, f"{name} is not fit to send: {issues}"
    print("  ok: agreement, standing DSA and commercial template are all fit to send")

    print("\nall agreement checks passed")


if __name__ == "__main__":
    main()
