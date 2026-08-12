"""route.py <lead_id>: ping the whole active pool with a redacted alert (dry run).

Per the brief, tiers_of_interest is informational only; pings go to every firm
with status=active. Renders ping_<lead_id>_<firm_id>.txt/.html into
lead_engine/outbox/ (files, never email), then marks the lead fresh and stamps
last_ping_at. The ping templates have no fields for contact details or the
full message, so redaction is enforced structurally.
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
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()

    leads = tiers.read_rows("leads.csv")
    lead = tiers.find(leads, "id", args.lead_id)
    if not lead:
        sys.exit(f"No such lead: {args.lead_id}")
    if lead["verified"] != "true":
        sys.exit(f"{lead['id']} is unverified. Unverified enquiries are never routed individually; "
                 "they are only eligible for the Raw batch after the nurture window (see docs/CLASSIFY.md).")

    tier = tiers.tier_cfg(lead["tier"])
    pool = [f for f in tiers.read_rows("firms.csv") if f["status"] == "active"]
    if not pool:
        sys.exit("No active firms in the pool.")

    print(f"Routing {lead['id']} ({tier['label']}, {tiers.gbp(tier['price'])}) to {len(pool)} active firms:")
    mapping = {
        "TIER_LABEL": tier["label"],
        "CASE_TYPE": lead["case_type"],
        "AREA": lead["area"] or "Not stated",
        "INTENT_LINE": lead["intent_line"],
        "PRICE": tiers.gbp(tier["price"]),
        "EXCLUSIVE_PRICE": tiers.gbp(tier["price"] * tiers.exclusive_multiplier()),
        "CAP": tiers.claim_slots(),
    }
    for firm in pool:
        for ext in ("txt", "html"):
            path = tiers.write_outbox(f"ping_{lead['id']}_{firm['id']}.{ext}", tiers.render(f"ping.{ext}", mapping))
        print(f"  {firm['id']} {firm['firm_name']}: rendered {path.with_suffix('').name}.txt/.html")
        print(f"  [STUB] would email ping to {firm['email']}")

    lead["status"] = "fresh"
    lead["last_ping_at"] = datetime.now().isoformat(timespec="seconds")
    tiers.write_rows("leads.csv", leads)
    print(f"{lead['id']} marked fresh, last_ping_at={lead['last_ping_at']}")


if __name__ == "__main__":
    main()
