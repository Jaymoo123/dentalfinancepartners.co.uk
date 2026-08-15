"""build_agreement.py: assemble the combined Lead Generation and Data Sharing Agreement.

    python legal/build_agreement.py [-o legal/out/Lead_Generation_and_Data_Sharing_Agreement.md]

The commercial layer lives in legal/PARTNER_AGREEMENT_TEMPLATE.md and carries three
markers. This script fills them:

  <!-- schedule1 -->  Schedule 1, generated from config/tiers.json plus the standard
                      terms block of config/standard_terms.md, verbatim.
  <!-- schedule2 -->  Schedule 2, the DSA clauses lifted verbatim from
                      legal/DSA_TEMPLATE.md between its dsa:start/end markers.
  <!-- annexes -->    Annexes A and B, likewise, between dsaannex:start/end.

The data protection layer is never duplicated: it exists once, in DSA_TEMPLATE.md,
which also still ships standalone to firms that want only that document. Prices are
never typed in: they come from the same file the price sheet and the engine read.

Run legal/test_build_agreement.py after changing this.
"""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "lead_engine" / "scripts"))
sys.path.insert(0, str(ROOT / "legal"))
import tiers  # noqa: E402
import build_price_sheet as sheet  # noqa: E402
import docprep  # noqa: E402

# Paragraphs that exist only so the standing agreement can stand on its own. The
# combined agreement covers the same ground once, in its own clauses, so reproducing
# them inside Schedule 2 would put duplicated and partly inoperative text into a
# signed contract. They are marked in the source and dropped here.
STANDALONE_ONLY = re.compile(
    r"<!-- standalone-only:start -->.*?<!-- standalone-only:end -->\s*", re.S)

TEMPLATE = ROOT / "legal" / "PARTNER_AGREEMENT_TEMPLATE.md"
DSA = ROOT / "legal" / "DSA_TEMPLATE.md"
DEFAULT_OUT = ROOT / "legal" / "out" / "Lead_Generation_and_Data_Sharing_Agreement.md"


def marker_block(text, name, source, drop_standalone=False):
    """The text between <!-- name:start --> and <!-- name:end -->, verbatim."""
    m = re.search(rf"<!-- {name}:start -->(.*?)<!-- {name}:end -->", text, re.S)
    if not m:
        sys.exit(f"markers {name}:start/end not found in {source}")
    block = m.group(1)
    if drop_standalone:
        block = STANDALONE_ONLY.sub("", block)
    return block.strip()


def schedule_1(cfg):
    """Commercial schedule. Every number comes from config/tiers.json."""
    acc_cap = cfg["claim_slots_per_lead"]
    adj_cap = cfg["adjacent_claim_slots_per_lead"]
    mult = cfg["exclusive_multiplier"]
    decay = tiers.tier_cfg("advisory", cfg)["decay"]

    # Label, description, price and volume come from the same renderer the price sheet
    # uses, so the two documents cannot disagree.
    price_rows = "\n".join(
        f"| {label} | {what} | {price} | {vol} |"
        for label, what, price, vol in sheet.tier_rows(cfg)
    )
    return f"""# SCHEDULE 1 - COMMERCIAL TERMS

The prices, caps and standard terms in this Schedule are the Supplier's published
terms. They are the same terms shown on the price sheet, on every Delivery and on
every invoice, and paragraph 6 reproduces them word for word.

## 1. Prices (clause 5)

| Tier | Typical work | Price per claimed lead | Typical volume per month |
|---|---|---|---|
{price_rows}

Typical volumes are indicative only and are not a commitment (clause 3.6). Prices are
exclusive of VAT (clause 7.2) and may change on 30 days' notice, never retrospectively
(clause 5.4).

## 2. Lanes and caps (clause 4)

| Item | Value |
|---|---|
| Accounting lane: maximum firms per lead | {acc_cap} |
| Adjacent lane (non-accounting professions): maximum firms per lead | {adj_cap} |
| Maximum firms that may receive any one enquiry | {acc_cap + adj_cap} |
| Exclusive claim multiplier | {mult} times the lead's price at the time of the claim |

The two lanes are independent: a claim on one never consumes a slot on the other
(clause 4.2). An exclusive claim closes the claiming firm's own lane only (clause 4.5).
The caps are also a data protection control and are fixed by paragraph 3.2 of Schedule 2.

## 3. Cascade (clause 5.3)

| Item | Value |
|---|---|
| Unclaimed lead withdrawn from the accounting lane after | {decay['cascade_after_hours']} hours |
| Applies while | the lead is wholly unclaimed. Cascade stops at the first accepted claim. |

There is no reduced or last-call price. A lead holds its published price for as long
as it is unclaimed, and after the period above it leaves the accounting lane: a
verified lead is offered to the adjacent lane, an unverified one becomes eligible for
the raw batch.

## 4. Bulk Supply (Schedule 2, paragraph 3.6)

Unverified enquiries which the Supplier was unable to verify become eligible, after the
7-day follow-up window closes, for supply as a monthly batch at the Raw price above. A
batch is supplied to one firm only, has no alert and no per-enquiry claim, and is sold as
seen with no credits.

## 5. Invoicing and payment (clause 7)

| Item | Value |
|---|---|
| Billing Period | Calendar month |
| Invoice issued | First day of the month, for the previous month's claims |
| Payment method | Bank transfer to the account stated on the invoice, quoting the invoice reference (clause 7.4) |
| Payment due | Within 14 days of the invoice date (clause 7.4) |
| Payable on joining | Nothing. The Recipient pays only for Leads it Claims, in arrears (clause 2.3) |
| Suspension | Any undisputed sum 14 or more days overdue (clause 8.2) |
| Reconciliation window | 10 Working Days from the invoice (clause 7.5) |
| VAT | Not currently chargeable; the Supplier is not VAT registered (clause 7.2) |

## 6. Standard terms

{tiers.terms_text()}

## 7. Agreed variations

Any term agreed between the parties that differs from the published position is recorded
here. Where nothing is stated, the published terms above apply in full.

| Item | Agreed variation |
|---|---|
| Tier prices | |
| Other | |
"""


def build():
    cfg = tiers.load_tiers()
    template = TEMPLATE.read_text(encoding="utf-8")
    dsa = DSA.read_text(encoding="utf-8")

    out = template.replace("<!-- schedule1 -->", schedule_1(cfg))
    out = out.replace("<!-- schedule2 -->",
                      marker_block(dsa, "dsa", DSA.name, drop_standalone=True))
    out = out.replace("<!-- annexes -->", marker_block(dsa, "dsaannex", DSA.name))

    for marker in ("<!-- schedule1 -->", "<!-- schedule2 -->", "<!-- annexes -->"):
        if marker in out:
            sys.exit(f"{marker} was not substituted")

    # Strip the editing artefacts, then refuse to write anything still carrying one.
    # A build comment naming internal file paths reached page 1 of a signing copy on
    # 2026-08-14; this is why that cannot happen again.
    out = docprep.clean(out)
    docprep.assert_sendable(out, "the combined agreement")
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("-o", "--out", default=str(DEFAULT_OUT))
    args = ap.parse_args()

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(build(), encoding="utf-8")
    print(f"Wrote {out_path}")
    print("Next: python legal/build_signing_docx.py <this file> <out.docx>")
    print("      python legal/build_pdf.py <this file> <out.pdf>")


if __name__ == "__main__":
    main()
