"""R3 tier1 startups — Stage 5b: intent-classify the kept pool.

Buckets: accountant_seeking / founder_diy / investor_diy / funding_stage_signal / ambiguous.
Regex triage only (Claude reviews the output); writes topic_pool_classified.json + prints counts.
"""
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

ACCT = re.compile(r"accountant|accounting service|accountancy|bookkeep|cfo|tax advis|advisor|"
                  r"help with|specialist|fees|cost of", re.I)
INVESTOR = re.compile(r"(eis|seis).*(relief|invest|fund|calculator|claim)|invest in|"
                      r"tax relief on (eis|seis|investment)|knowledge intensive fund", re.I)
FUNDING = re.compile(r"seed|series [ab]|venture|vc\b|raise|fundrais|investor|term sheet|"
                     r"convertible|advance assurance|due diligence|cap table|valuation", re.I)
DIY = re.compile(r"what is|how to|how do|meaning|explained|guide|template|example|"
                 r"calculator|checklist|eligib|qualify|deadline|form\b|diy", re.I)


def classify(term: str) -> str:
    if ACCT.search(term):
        return "accountant_seeking"
    if INVESTOR.search(term):
        return "investor_diy"
    if FUNDING.search(term):
        return "funding_stage_signal"
    if DIY.search(term):
        return "founder_diy"
    return "ambiguous"


def main() -> None:
    pool = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    out = {}
    counts: dict[str, int] = {}
    for term, meta in pool["kept"].items():
        c = classify(term)
        out[term] = {**meta, "intent": c}
        counts[c] = counts.get(c, 0) + 1
    (HERE / "topic_pool_classified.json").write_text(json.dumps(
        {"counts": counts, "kept": out}, indent=1), encoding="utf-8")
    print(counts)


if __name__ == "__main__":
    main()
