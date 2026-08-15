"""decay.py [--now ISO]: age fully unclaimed leads per the decay rules (dry run).

Thresholds come from each tier's decay block in config/tiers.json, never
hardcoded. --now injects the clock for simulation.

There is no last-call reprice (owner decision 2026-08-14). A lead holds its
published price for as long as it is unclaimed. Decay is now a single step.

Decay applies ONLY to leads with zero claims (owner rule 2026-08-12): a lead's
price is fixed at its first claim, so a partially claimed lead never cascades;
its remaining shared slots stay open at the fixed price until the cap.

For fully unclaimed leads, measured from last_ping_at (falling back to the lead
timestamp if never pinged), past cascade_after_hours: verified leads are
cascaded (offered to the adjacent professions lane), unverified leads become
raw_batch.
"""
import argparse
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--now", help="ISO timestamp to treat as now (simulation clock)")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()
    now = tiers.parse_ts(args.now) if args.now else datetime.now()
    print(f"Decay scan at {now.isoformat(timespec='seconds')}")

    cfg = tiers.load_tiers()
    cap = cfg["claim_slots_per_lead"]
    adjacent = tiers.tier_cfg("adjacent", cfg)
    raw = tiers.tier_cfg("raw", cfg)
    leads = tiers.read_rows("leads.csv")
    deliveries = tiers.read_rows("deliveries.csv")
    pool = [f for f in tiers.read_rows("firms.csv") if f["status"] == "active"]
    changed = False

    for lead in leads:
        if lead["status"] != "fresh":
            continue
        tier = tiers.tier_cfg(lead["tier"], cfg)
        decay = tier.get("decay")
        if not decay:
            continue
        # Decay is an accounting-lane concept: an adjacent claim must not stop the
        # lead leaving the accounting lane when no accountant has taken it.
        claimed = len(tiers.claims_in_lane(deliveries, lead["id"], tiers.ACCOUNTING))
        if claimed:
            # Price fixed at first claim: claimed leads never decay.
            continue
        ref = lead["last_ping_at"] or lead["timestamp"]
        hours = (now - tiers.parse_ts(ref)).total_seconds() / 3600
        open_slots = cap - claimed

        if hours > decay["cascade_after_hours"]:
            if lead["verified"] == "true":
                lead["status"] = "cascaded"
                print(f"  {lead['id']} ({tier['label']}, {hours:.0f}h, {open_slots} open slots) -> cascaded. "
                      f"Offer to adjacent lane, {adjacent['profession_lane']}, at {tiers.gbp(adjacent['price'])}.")
            else:
                lead["status"] = "raw_batch"
                print(f"  {lead['id']} ({tier['label']}, {hours:.0f}h, unverified) -> raw_batch. "
                      f"Eligibility: {raw['eligibility']}. {raw['credits']}")
            changed = True
    if changed:
        tiers.write_rows("leads.csv", leads)
    else:
        print("  Nothing to decay.")


if __name__ == "__main__":
    main()
