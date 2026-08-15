"""stats.py: one-screen summary of this month's pipeline (dry run, read only).

Leads by tier and status, claim rate per tier (claimed slots out of offered
slots), and revenue billed (invoiced) vs delivered, net of credits.
"""
import argparse
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--month", default=datetime.now().strftime("%Y-%m"), help="YYYY-MM (default: current month)")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()

    cfg = tiers.load_tiers()
    cap = cfg["claim_slots_per_lead"]
    leads = [l for l in tiers.read_rows("leads.csv") if l["timestamp"][:7] == args.month]
    deliveries = [d for d in tiers.read_rows("deliveries.csv") if d["claimed_at"][:7] == args.month]
    lead_tier = {l["id"]: l["tier"] for l in tiers.read_rows("leads.csv")}

    print(f"LEAD ENGINE STATS, {args.month}")
    print(f"\nLeads by tier x status ({len(leads)} leads this month)")
    statuses = ["fresh", "cascaded", "raw_batch", "delivered_full"]
    tier_ids = [t["id"] for t in cfg["tiers"] if "decay" in t]
    print(f"  {'tier':<10}" + "".join(f"{s:>15}" for s in statuses))
    for tid in tier_ids:
        row = [sum(1 for l in leads if l["tier"] == tid and l["status"] == s) for s in statuses]
        print(f"  {tid:<10}" + "".join(f"{n:>15}" for n in row))

    acc = [d for d in deliveries if tiers.lane_of(d) == tiers.ACCOUNTING]
    adj = [d for d in deliveries if tiers.lane_of(d) == tiers.ADJACENT]

    print("\nClaim rate per tier, ACCOUNTING lane (claimed slots / offered slots, "
          "this month's leads; exclusive = all slots)")
    for tid in tier_ids:
        tier_leads = [l for l in leads if l["tier"] == tid]
        offered = len(tier_leads) * cap
        claimed = sum(cap if d["exclusive"] == "true" else 1
                      for d in acc if lead_tier.get(d["lead_id"]) == tid)
        rate = f"{100 * claimed / offered:.0f}%" if offered else "n/a"
        print(f"  {tid:<10} {claimed}/{offered} slots ({rate})")

    # Reported as claims per lead reached rather than as a fill rate: the adjacent
    # lane is additive, so leads that reached it are not a fixed denominator.
    adj_cap = tiers.adjacent_claim_slots()
    reached = len({d["lead_id"] for d in adj})
    print(f"\nAdjacent lane ({'uncapped' if adj_cap is None else f'cap {adj_cap}'}, additive to the accounting lane)")
    print(f"  {len(adj)} claims across {reached} leads"
          + (f" ({len(adj)/reached:.2f} per lead reached)" if reached else ""))

    def credited(d):
        # Mirrors invoice_run.py: credits net off exclusive claims only.
        return d["credit"] == "true" and d["exclusive"] == "true"

    def net(rows):
        return sum(int(d["price_charged"]) for d in rows if not credited(d))

    delivered = net(deliveries)
    billed = net([d for d in deliveries if d["invoiced"] == "true"])
    credits = sum(int(d["price_charged"]) for d in deliveries if credited(d))
    print(f"\nRevenue ({args.month}, net of {tiers.gbp(credits)} credits)")
    print(f"  delivered: {tiers.gbp(delivered)}   (accounting {tiers.gbp(net(acc))}, "
          f"adjacent {tiers.gbp(net(adj))})")
    print(f"  billed:    {tiers.gbp(billed)}")


if __name__ == "__main__":
    main()
