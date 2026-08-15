"""claim.py <lead_id> <firm_id> [--exclusive] [--adjacent]: simulate a firm claiming a lead (dry run).

Claims run in two INDEPENDENT lanes (config/tiers.json $lanes), so an adjacent
claim never consumes an accounting slot:

  accounting  capped at claim_slots_per_lead. Charges the lead's own tier price.
              Exclusivity, decay and delivered_full all live here.
  adjacent    capped at adjacent_claim_slots_per_lead, set to 3 by owner
              decision 2026-08-14 so at most 3 non-accounting firms may claim
              the same lead and the enquirer picks between them. Charges the
              flat adjacent price. No exclusivity. The cap bounds the total
              recipients of one enquirer's details at 6, which is the number
              the legitimate interests assessment balances against.

The lane is derived from the firm's professions: a firm that does no accounting
can only claim on the adjacent lane, and a firm that does both defaults to
accounting and takes the adjacent lane with --adjacent.

A lead's price is fixed at its first claim IN THAT LANE: the first claimant pays
the tier price and every later claimant in the same lane pays the same. There is
no reduced or last-call price; an unclaimed lead holds its published price.
--exclusive is accounting-only and wins only if no firm has claimed on that lane
yet: it charges exclusive_multiplier x the price and closes the accounting lane
(delivered to no other accountant); if a shared claim already exists the claim is
rejected and the firm is offered a shared slot instead. An exclusive lock does
NOT close the adjacent lane. Renders the full delivery email (txt + html) to
lead_engine/outbox/ with the standard terms verbatim, appends the deliveries
row, and marks the lead delivered_full once the ACCOUNTING lane is locked or at
cap. Nothing is emailed and nothing is charged.
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
                   help="exclusive claim (accounting lane only): closes the accounting lane at "
                        "exclusive_multiplier x price if no firm has claimed that lane yet")
    p.add_argument("--adjacent", action="store_true",
                   help="claim on the adjacent lane at the flat adjacent price (for a firm that also "
                        "does accounting; firms with no accounting profession are routed here anyway)")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()

    leads = tiers.read_rows("leads.csv")
    lead = tiers.find(leads, "id", args.lead_id)
    if not lead:
        sys.exit(f"No such lead: {args.lead_id}")
    firm = tiers.find(tiers.read_rows("firms.csv"), "id", args.firm_id)
    if not firm:
        sys.exit(f"No such firm: {args.firm_id}")
    # Hard gate, not a warning: no signed agreement, no delivery. The lawful basis
    # for sharing depends on every recipient being under the standing agreement.
    if not firm.get("dsa_signed_date"):
        sys.exit(f"Claim rejected: {firm['id']} has not signed the data sharing agreement. "
                 "Record the signed date in firms.csv before it can claim.")

    lane = tiers.firm_lane(firm, force_adjacent=args.adjacent)
    if args.exclusive and lane == tiers.ADJACENT:
        sys.exit("Exclusive claim rejected: exclusivity exists on the accounting lane only. "
                 "The adjacent lane is always shared.")
    cap = tiers.lane_cap(lane)          # None would mean uncapped; both lanes are capped
    deliveries = tiers.read_rows("deliveries.csv")
    # Only this lane's claims are counted, so the two lanes never block each other.
    existing = tiers.claims_in_lane(deliveries, lead["id"], lane)
    locked = next((d for d in existing if d["exclusive"] == "true"), None)
    if locked:
        sys.exit(f"Claim rejected: the {lane} lane on {lead['id']} is exclusively locked "
                 f"by {locked['firm_id']}.")
    if cap is not None and len(existing) >= cap:
        sys.exit(f"Claim rejected: all {cap} {lane} slots for {lead['id']} are taken "
                 f"(claimed by {', '.join(d['firm_id'] for d in existing)}).")
    if any(d["firm_id"] == firm["id"] for d in existing):
        sys.exit(f"Claim rejected: {firm['id']} has already claimed {lead['id']} on the {lane} lane.")

    # Adjacent buyers pay the flat adjacent price, not the lead's accounting tier.
    tier = tiers.tier_cfg("adjacent" if lane == tiers.ADJACENT else lead["tier"])
    if existing:
        # Price fixed at the first claim ON THIS LANE: no decay repricing between claimants.
        charge = int(existing[0]["price_charged"])
        if charge != tier["price"]:
            print(f"Price fixed at first {lane} claim: {tiers.gbp(charge)} "
                  f"(card price {tiers.gbp(tier['price'])}).")
    else:
        # No last-call reprice (owner decision 2026-08-14): an unclaimed lead holds
        # its published price until it leaves the lane entirely.
        charge = tier["price"]

    if args.exclusive:
        if existing:
            sys.exit(f"Exclusive claim rejected: {lead['id']} already has {len(existing)} shared "
                     f"accounting claim(s) ({', '.join(d['firm_id'] for d in existing)}). "
                     f"A shared slot is still available at {tiers.gbp(charge)}: "
                     f"re-run without --exclusive.")
        charge *= tiers.exclusive_multiplier()
        print(f"Exclusive claim wins the race: the accounting lane locks to {firm['id']} at "
              f"{tiers.gbp(charge)} ({tiers.exclusive_multiplier()}x). The adjacent lane stays open.")

    delivered_at = datetime.now().isoformat(timespec="seconds")
    if args.exclusive:
        basis = "Exclusive (no other accountant receives this lead)"
    elif lane == tiers.ADJACENT:
        basis = f"Adjacent lane, shared (up to {cap} non-accounting firms may claim this lead)"
    else:
        basis = f"Shared (up to {cap} firms may claim this lead)"
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
        # Every delivery carries the notice the enquirer was actually shown. DSA
        # clause 3.3(c) requires the lawful-basis information to travel with the
        # Referral, and Annex A lists it as part of the Shared Data.
        "CONSENT_TEXT": lead.get("consent_text") or "(not recorded for this lead)",
    }
    tiers.write_outbox(f"delivery_{lead['id']}_{firm['id']}.txt",
                       tiers.render("delivery.txt", {**common, "TERMS": tiers.terms_text()}))
    html_map = {k: tiers.esc(v) for k, v in common.items()}
    tiers.write_outbox(f"delivery_{lead['id']}_{firm['id']}.html",
                       tiers.render("delivery.html", {**html_map, "TERMS_HTML": tiers.terms_html()}))

    tiers.append_row("deliveries.csv", {
        "lead_id": lead["id"], "firm_id": firm["id"], "lane": lane, "claimed_at": delivered_at,
        "exclusive": "true" if args.exclusive else "false",
        "price_charged": charge, "credit": "false", "credit_reason": "",
        "invoiced": "false", "invoice_ref": "",
    })
    taken = len(existing) + 1
    # delivered_full tracks the ACCOUNTING lane only: a full adjacent lane must not
    # stop the lead being offered to accountants, because the lanes are independent.
    full = lane == tiers.ACCOUNTING and (args.exclusive or taken >= cap)
    if full:
        lead["status"] = "delivered_full"
        tiers.write_rows("leads.csv", leads)
    if args.exclusive:
        slot_note = "exclusive lock, all accounting slots consumed"
    else:
        slot_note = f"{lane.capitalize()} slot {taken} of {cap}"
    print(f"Claim accepted: {lead['id']} -> {firm['id']} ({firm['firm_name']}) at {tiers.gbp(charge)}. "
          f"{slot_note}." + (" Lead now delivered_full." if full else ""))
    print(f"[STUB] would email full lead details to {firm['email']}")


if __name__ == "__main__":
    main()
