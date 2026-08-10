"""invoice_run.py YYYY-MM: build per-firm monthly invoices from deliveries (dry run).

Pivots deliveries claimed in the given month per firm: each delivery is a
charge line; rows with credit=true also add a negative line with the reason.
Renders one printable A4 invoice per firm to lead_engine/invoices/YYYY-MM/
from templates/invoice.html, marks the rows invoiced with the invoice ref, and
prints a [STUB] line for the GoCardless payment it would create. No payment is
created and nothing is sent.
"""
import argparse
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers

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
    args = p.parse_args()

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
            tier_label = tiers.tier_cfg(lead["tier"])["label"]
            amount = int(d["price_charged"])
            rows.append(line(d, tier_label, "Claimed lead", amount))
            total += amount
            if d["credit"] == "true":
                rows.append(line(d, tier_label, f"Credit: {d['credit_reason']}", -amount, credit=True))
                total -= amount
        ref = f"ATL-{args.month}-{firm_id}"
        html = tiers.render("invoice.html", {
            "INVOICE_REF": ref,
            "PERIOD": args.month,
            "ISSUE_DATE": date.today().isoformat(),
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
            print(f"[STUB] would create GoCardless payment of {tiers.gbp(total)} for firm {firm['firm_name']} ({firm_id})")
        else:
            print(f"[STUB] no payment needed for {firm['firm_name']} ({firm_id}), net total {tiers.gbp(total)}")

    tiers.write_rows("deliveries.csv", deliveries)


if __name__ == "__main__":
    main()
