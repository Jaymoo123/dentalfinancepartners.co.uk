"""decay.py [--now ISO]: age unclaimed leads per the decay rules (dry run).

Thresholds and last-call prices come from each tier's decay block in
config/tiers.json, never hardcoded. --now injects the clock for simulation.

For leads with open claim slots, measured from last_ping_at (falling back to
the lead timestamp if never pinged):
- past cascade_after_hours: verified leads -> cascaded (offered to the
  adjacent professions lane), unverified -> raw_batch.
- past after_hours: render the last-call ping (reduced price, LAST CALL flag)
  to lead_engine/outbox/ and set status last_call. Unverified leads are never
  pinged individually (see docs/CLASSIFY.md), so they skip last call and wait
  for the raw cascade.
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
        if lead["status"] not in ("fresh", "last_call"):
            continue
        tier = tiers.tier_cfg(lead["tier"], cfg)
        decay = tier.get("decay")
        if not decay:
            continue
        claimed = sum(1 for d in deliveries if d["lead_id"] == lead["id"])
        if claimed >= cap:
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
        elif hours > decay["after_hours"] and lead["status"] == "fresh":
            if lead["verified"] != "true":
                print(f"  {lead['id']} ({hours:.0f}h, unverified): no last-call ping, awaiting raw cascade.")
                continue
            mapping = {
                "TIER_LABEL": tier["label"],
                "CASE_TYPE": lead["case_type"],
                "AREA": lead["area"] or "Not stated",
                "INTENT_LINE": lead["intent_line"],
                "PRICE": tiers.gbp(decay["last_call_price"]),
                "ORIGINAL_PRICE": tiers.gbp(tier["price"]),
            }
            for firm in pool:
                for ext in ("txt", "html"):
                    tiers.write_outbox(f"last_call_ping_{lead['id']}_{firm['id']}.{ext}",
                                       tiers.render(f"last_call_ping.{ext}", mapping))
                print(f"  [STUB] would email last-call ping for {lead['id']} to {firm['email']}")
            lead["status"] = "last_call"
            print(f"  {lead['id']} ({tier['label']}, {hours:.0f}h, {open_slots} open slots) -> last_call "
                  f"at {tiers.gbp(decay['last_call_price'])} (was {tiers.gbp(tier['price'])}).")
            changed = True

    if changed:
        tiers.write_rows("leads.csv", leads)
    else:
        print("  Nothing to decay.")


if __name__ == "__main__":
    main()
