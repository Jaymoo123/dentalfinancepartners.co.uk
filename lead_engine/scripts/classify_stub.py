"""classify_stub.py: demonstrate the classification pipe shape (dry run).

This is a STUB. The real classification step is a human (or model) applying
docs/CLASSIFY.md; this script only demonstrates the strict JSON that prompt
returns, so downstream tooling can be built against the shape. The keyword
heuristic below is deliberately crude and is NOT the rubric; do not tune it,
replace it with the CLASSIFY.md prompt when the pipe goes live.

Usage:
  python lead_engine/scripts/classify_stub.py              # rows lacking a tier
  python lead_engine/scripts/classify_stub.py --all        # every seed lead
  python lead_engine/scripts/classify_stub.py --message "..."
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers

# ponytail: crude keyword heuristic, stands in for the CLASSIFY.md prompt only.
# Checked in rubric order (advisory first), grade-down to essential by default.
ADVISORY = {
    "incorporat": "incorporation",
    "limited company": "incorporation",
    "restructur": "ownership_restructuring",
    "capital gains": "cgt_planning",
    "cgt": "cgt_planning",
    "stamp duty": "sdlt",
    "sdlt": "sdlt",
    "non-resident": "non_resident",
    "expat": "non_resident",
    "cio": "charity_structure",
    "charity structure": "charity_structure",
    "historic records": "records_reconstruction",
    "reconstruct": "records_reconstruction",
}
STANDARD = {
    "self assessment": "landlord_sa_complex",
    "jointly": "landlord_sa_complex",
    "year end accounts": "sme_accounts",
    "company filings": "sme_accounts",
    "payroll": "sme_accounts",
}


def classify(message, area=""):
    text = message.lower()
    for kw, tag in ADVISORY.items():
        if kw in text:
            return {"tier": "advisory", "intent_line": intent(message), "case_type": tag, "area": area}
    for kw, tag in STANDARD.items():
        if kw in text:
            return {"tier": "standard", "intent_line": intent(message), "case_type": tag, "area": area}
    # Grey-zone rule: when in doubt, grade down.
    return {"tier": "essential", "intent_line": intent(message), "case_type": "basic_return", "area": area}


def intent(message):
    # ponytail: stub intent line = first 15 words of the message. The real
    # prompt writes a redacted summary (no names or contact details).
    return " ".join(message.split()[:15])


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    p.add_argument("--message", help="classify a single raw message instead of leads.csv")
    p.add_argument("--all", action="store_true", help="classify every lead in leads.csv, not just rows lacking a tier")
    args = p.parse_args()

    if args.message:
        print(json.dumps(classify(args.message)))
        return

    leads = tiers.read_rows("leads.csv")
    todo = leads if args.all else [l for l in leads if not l["tier"]]
    if not todo:
        print("All leads already carry a tier. Use --all to re-demonstrate, or --message '...'.")
        return
    for lead in todo:
        print(lead["id"], json.dumps(classify(lead["message"], lead["area"])))


if __name__ == "__main__":
    main()
