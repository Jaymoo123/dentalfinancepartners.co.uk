"""claim.py <lead_id> <firm_id> [--exclusive]: simulate a firm claiming a lead (dry run).

Shared claims fill up to claim_slots_per_lead (config/tiers.json). A lead's
price is fixed at its first claim: the first claimant pays the tier price (or
the last-call price if the lead decayed unclaimed) and every later claimant
pays the same. --exclusive wins only if no firm has claimed yet: it charges
exclusive_multiplier x the price and locks the lead (delivered to no one
else); if a shared claim already exists the exclusive claim is rejected and
the firm is offered a shared slot instead. Renders the full delivery email
(txt + html) to lead_engine/outbox/ with the standard terms verbatim, appends
the deliveries row, and marks the lead delivered_full once locked or at cap.
Nothing is emailed and nothing is charged.
"""
import argparse
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("lead_id")
    p.add_argument("firm_id")
    p.add_argument("--exclusive", action="store_true",
                   help="exclusive claim: locks the lead at exclusive_multiplier x price if no firm has claimed yet")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()

    leads = tiers.read_rows("leads.csv")
    lead = tiers.find(leads, "id", args.lead_id)
    if not lead:
        sys.exit(f"No such lead: {args.lead_id}")
    firm = tiers.find(tiers.read_rows("firms.csv"), "id", args.firm_id)
    if not firm:
        sys.exit(f"No such firm: {args.firm_id}")

    cap = tiers.claim_slots()
    deliveries = tiers.read_rows("deliveries.csv")
    existing = [d for d in deliveries if d["lead_id"] == lead["id"]]
    locked = next((d for d in existing if d["exclusive"] == "true"), None)
    if locked:
        sys.exit(f"Claim rejected: {lead['id']} is exclusively locked by {locked['firm_id']}.")
    if len(existing) >= cap:
        sys.exit(f"Claim rejected: all {cap} slots for {lead['id']} are taken "
                 f"(claimed by {', '.join(d['firm_id'] for d in existing)}).")
    if any(d["firm_id"] == firm["id"] for d in existing):
        sys.exit(f"Claim rejected: {firm['id']} has already claimed {lead['id']}.")

    if firm["mandate_status"] != "active":
        print(f"[STUB] would block claim until Direct Debit mandate active "
              f"(firm {firm['id']} mandate_status={firm['mandate_status']}); dry run proceeds.")

    tier = tiers.tier_cfg(lead["tier"])
    if existing:
        # Price fixed at first claim: no decay repricing between claimants.
        charge = int(existing[0]["price_charged"])
        if charge != tier["price"]:
            print(f"Price fixed at first claim: {tiers.gbp(charge)} (card price {tiers.gbp(tier['price'])}).")
    elif lead["status"] == "last_call":
        charge = tiers.last_call_price(lead["tier"])
        print(f"Last-call price applies: {tiers.gbp(charge)} (was {tiers.gbp(tier['price'])}).")
    else:
        charge = tier["price"]

    if args.exclusive:
        if existing:
            sys.exit(f"Exclusive claim rejected: {lead['id']} already has {len(existing)} shared "
                     f"claim(s) ({', '.join(d['firm_id'] for d in existing)}). "
                     f"A shared slot is still available at {tiers.gbp(charge)}: "
                     f"re-run without --exclusive.")
        charge *= tiers.exclusive_multiplier()
        print(f"Exclusive claim wins the race: lead locks to {firm['id']} at {tiers.gbp(charge)} "
              f"({tiers.exclusive_multiplier()}x).")

    delivered_at = datetime.now().isoformat(timespec="seconds")
    basis = ("Exclusive (locked to your firm)" if args.exclusive
             else f"Shared (up to {cap} firms may claim this lead)")
    common = {
        "LEAD_ID": lead["id"],
        "BASIS": basis,
        "TIER_LABEL": tier["label"],
        "SOURCE_SITE": lead["source_site"],
        "CASE_TYPE": lead["case_type"],
        "INTENT_LINE": lead["intent_line"],
        "AREA": lead["area"] or "Not stated",
        "PRICE": tiers.gbp(charge),
        "NAME": lead["name"],
        "PHONE": lead["phone"],
        "EMAIL": lead["email"],
        "MESSAGE": lead["message"],
        "VERIFIED": lead["verified"],
        "VERIFIED_AT": lead["verified_at"] or "n/a",
        "DELIVERED_AT": delivered_at,
    }
    tiers.write_outbox(f"delivery_{lead['id']}_{firm['id']}.txt",
                       tiers.render("delivery.txt", {**common, "TERMS": tiers.terms_text()}))
    html_map = {k: tiers.esc(v) for k, v in common.items()}
    tiers.write_outbox(f"delivery_{lead['id']}_{firm['id']}.html",
                       tiers.render("delivery.html", {**html_map, "TERMS_HTML": tiers.terms_html()}))

    tiers.append_row("deliveries.csv", {
        "lead_id": lead["id"], "firm_id": firm["id"], "claimed_at": delivered_at,
        "exclusive": "true" if args.exclusive else "false",
        "price_charged": charge, "credit": "false", "credit_reason": "",
        "invoiced": "false", "invoice_ref": "",
    })
    taken = len(existing) + 1
    full = args.exclusive or taken >= cap
    if full:
        lead["status"] = "delivered_full"
        tiers.write_rows("leads.csv", leads)
    slot_note = ("exclusive lock, all slots consumed" if args.exclusive
                 else f"Slot {taken} of {cap}")
    print(f"Claim accepted: {lead['id']} -> {firm['id']} ({firm['firm_name']}) at {tiers.gbp(charge)}. "
          f"{slot_note}." + (" Lead now delivered_full." if full else ""))
    print(f"[STUB] would email full lead details to {firm['email']}")


if __name__ == "__main__":
    main()
