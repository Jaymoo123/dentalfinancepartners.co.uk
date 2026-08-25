"""invoice_run.py YYYY-MM: build per-firm monthly invoices from deliveries (dry run).

Pivots deliveries claimed in the given month per firm: each delivery is a
charge line (marked shared or exclusive); rows with credit=true add a negative
line with the reason, but only on exclusive claims (credits apply to exclusive
claims only per the standard terms; a credit flag on a shared row is ignored
with a warning).
Renders one printable A4 invoice per firm to lead_engine/invoices/YYYY-MM/
from templates/invoice.html and marks the rows invoiced with the invoice ref.
Invoices are payable by bank transfer within 14 days; there is no Direct Debit
and the engine never touches a payment provider. Nothing is sent.

Set BANK_DETAILS below before running for real: the script refuses to render an
invoice that carries no payment instructions.
"""
import argparse
import sys
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers

# Owner: fill this in before the first real invoice run. One line, printed on
# every invoice under the payment instruction. Left empty deliberately so an
# invoice can never go out asking for a transfer without saying where to.
BANK_DETAILS = ""

PAYMENT_DAYS = 14

ROW = ('      <tr style="border-bottom: 1px solid #ddd;">'
       '<td style="padding: 5px 8px 5px 0;">{date}</td>'
       '<td style="padding: 5px 8px;">{lead}</td>'
       '<td style="padding: 5px 8px;">{tier}</td>'
       '<td style="padding: 5px 8px;">{desc}</td>'
       '<td style="padding: 5px 0 5px 8px; text-align: right;{style}">{amount}</td></tr>')


def line(d, lead_tier, desc, amount, credit=False):
    return ROW.format(
        date=d["claimed_at"][:10], lead=d["lead_id"], tier=tiers.esc(lead_tier),
        desc=tiers.esc(desc), amount=("-" if credit else "") + tiers.gbp(abs(amount)),
        style=" color: #8a2b06;" if credit else "")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("month", help="invoice period, YYYY-MM")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    p.add_argument("--allow-no-bank-details", action="store_true",
                   help="render sample invoices without payment instructions (seed data only)")
    args = p.parse_args()

    # An invoice that asks for a bank transfer without saying which account is
    # worse than no invoice, so refuse rather than render a broken one.
    if not BANK_DETAILS and not args.allow_no_bank_details:
        sys.exit("BANK_DETAILS is empty in invoice_run.py. Set it to the account "
                 "invoices should be paid into, or pass --allow-no-bank-details "
                 "to render sample invoices without payment instructions.")

    deliveries = tiers.read_rows("deliveries.csv")
    leads = {l["id"]: l for l in tiers.read_rows("leads.csv")}
    firms = {f["id"]: f for f in tiers.read_rows("firms.csv")}
    in_month = [d for d in deliveries if d["claimed_at"][:7] == args.month]
    todo = [d for d in in_month if d["invoiced"] != "true"]
    skipped = len(in_month) - len(todo)
    if skipped:
        print(f"Skipping {skipped} already-invoiced rows for {args.month}.")
    if not todo:
        sys.exit(f"No uninvoiced deliveries claimed in {args.month}.")

    out_dir = tiers.INVOICES / args.month
    out_dir.mkdir(parents=True, exist_ok=True)
    terms = tiers.terms_html()

    by_firm = {}
    for d in todo:
        by_firm.setdefault(d["firm_id"], []).append(d)

    for firm_id in sorted(by_firm):
        firm = firms[firm_id]
        rows, total = [], 0
        for d in sorted(by_firm[firm_id], key=lambda r: r["claimed_at"]):
            lead = leads[d["lead_id"]]
            lane = tiers.lane_of(d)
            # An adjacent claim is billed on the adjacent line, not the lead's accounting tier.
            tier_label = tiers.tier_cfg("adjacent" if lane == tiers.ADJACENT else lead["tier"])["label"]
            amount = int(d["price_charged"])
            exclusive = d["exclusive"] == "true"
            desc = ("Claimed lead (exclusive)" if exclusive
                    else "Claimed lead (adjacent lane)" if lane == tiers.ADJACENT
                    else "Claimed lead (shared)")
            rows.append(line(d, tier_label, desc, amount))
            total += amount
            if d["credit"] == "true":
                if not exclusive:
                    # Standard terms: credits apply to exclusive claims only.
                    print(f"WARNING: credit on shared claim {d['lead_id']}/{d['firm_id']} ignored "
                          f"(credits apply to exclusive claims only); fix the ledger row.")
                    continue
                rows.append(line(d, tier_label, f"Credit: {d['credit_reason']}", -amount, credit=True))
                total -= amount
        ref = f"ATL-{args.month}-{firm_id}"
        issue = date.today()
        html = tiers.render("invoice.html", {
            "INVOICE_REF": ref,
            "PERIOD": args.month,
            "ISSUE_DATE": issue.isoformat(),
            "DUE_DATE": (issue + timedelta(days=PAYMENT_DAYS)).isoformat(),
            "BANK_DETAILS": tiers.esc(BANK_DETAILS),
            "FIRM_NAME": tiers.esc(firm["firm_name"]),
            "CONTACT_NAME": tiers.esc(firm["contact_name"]),
            "LINE_ROWS": "\n".join(rows),
            "TOTAL": tiers.gbp(total),
            "TERMS_HTML": terms,
        })
        path = out_dir / f"{ref}.html"
        path.write_text(html, encoding="utf-8")
        for d in by_firm[firm_id]:
            d["invoiced"] = "true"
            d["invoice_ref"] = ref
        print(f"{ref}: {firm['firm_name']}, {len(by_firm[firm_id])} deliveries, total {tiers.gbp(total)} -> {path}")
        if total > 0:
            print(f"[STUB] would email {tiers.gbp(total)} invoice to {firm['firm_name']} ({firm_id}); "
                  f"payable by bank transfer within {PAYMENT_DAYS} days")
        else:
            print(f"[STUB] no payment needed for {firm['firm_name']} ({firm_id}), net total {tiers.gbp(total)}")

    tiers.write_rows("deliveries.csv", deliveries)


if __name__ == "__main__":
    main()
