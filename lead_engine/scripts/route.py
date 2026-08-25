"""route.py <lead_id> [--lane accounting|adjacent]: ping the active pool with a redacted alert (dry run).

Per the brief, tiers_of_interest is informational only; pings go to every firm
with status=active that can claim on the chosen lane. Renders
ping_<lead_id>_<firm_id>.txt/.html into lead_engine/outbox/ (files, never
email), then marks the lead fresh and stamps last_ping_at.

The alert carries the enquiry in the enquirer's own words, run through
tiers.redact() so names, phone numbers, email addresses, postcodes, links and
company names come out. That is what a firm decides on. The unredacted message
and the contact details go out only on claim. The templates have no field for a
name, a number, an email address or the raw message, so a redaction failure
cannot become a disclosure of identity by accident.

Lanes are independent (config/tiers.json $lanes), and so are their pings:

  --lane accounting  (default) firms with an accounting profession, quoted the
                     lead's own tier price, capped at claim_slots_per_lead.
  --lane adjacent    firms with a non-accounting profession, quoted the flat
                     adjacent price, capped at adjacent_claim_slots_per_lead.

Run the accounting ping first and the adjacent ping once the accounting lane
has been served, so the enquirer hears from their accountant before anyone
else. Only the accounting ping stamps last_ping_at, because the decay clock
belongs to the accounting lane.
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
    p.add_argument("--lane", choices=[tiers.ACCOUNTING, tiers.ADJACENT], default=tiers.ACCOUNTING,
                   help="which lane to ping (default accounting; run adjacent after the accounting lane is served)")
    p.add_argument("--dry-run", action="store_true", default=True, help="dry run (the only mode)")
    args = p.parse_args()

    leads = tiers.read_rows("leads.csv")
    lead = tiers.find(leads, "id", args.lead_id)
    if not lead:
        sys.exit(f"No such lead: {args.lead_id}")
    if lead["verified"] != "true":
        sys.exit(f"{lead['id']} is unverified. Unverified enquiries are never routed individually; "
                 "they are only eligible for the Raw batch after the nurture window (see docs/CLASSIFY.md).")

    adjacent = args.lane == tiers.ADJACENT
    tier = tiers.tier_cfg("adjacent" if adjacent else lead["tier"])
    # A firm must have signed the data sharing agreement before it sees anything at
    # all, including a redacted alert. This is a condition of the LIA and DSA clause 3,
    # not a commercial preference, so it gates the ping and not just the claim.
    all_firms = tiers.read_rows("firms.csv")
    active = [f for f in all_firms if f["status"] == "active" and f.get("dsa_signed_date")]
    unsigned = [f["id"] for f in all_firms
                if f["status"] == "active" and not f.get("dsa_signed_date")]
    if unsigned:
        print(f"  skipping {len(unsigned)} active firm(s) with no signed agreement: "
              f"{', '.join(unsigned)}")
    # A firm is pinged on a lane only if it could actually claim there: the adjacent
    # ping goes to firms with a non-accounting profession, so a pure accountancy firm
    # is never offered the same lead twice at two different prices.
    if adjacent:
        pool = [f for f in active if tiers.firm_professions(f) - {tiers.ACCOUNTING}]
    else:
        pool = [f for f in active if tiers.ACCOUNTING in tiers.firm_professions(f)]
    if not pool:
        sys.exit(f"No active firms in the pool can claim on the {args.lane} lane.")

    cap = tiers.lane_cap(args.lane)
    print(f"Routing {lead['id']} ({tier['label']}, {tiers.gbp(tier['price'])}) "
          f"to {len(pool)} active firms on the {args.lane} lane:")
    if adjacent:
        share_note = f"(shared, up to {cap} non-accounting firms)"
        claim_note = ("This is the adjacent lane: the enquiry has already been offered to "
                      f"accountants, and you are quoted the flat adjacent price. Up to {cap} "
                      "non-accounting firms may claim it and the enquirer chooses between them. "
                      "No commitment. You only pay for leads you claim.")
        # No exclusivity on the adjacent lane, so the line is dropped entirely
        # rather than rendered as "n/a".
        exclusive_line_txt = ""
        exclusive_line_html = ""
    else:
        share_note = f"(shared, up to {cap} firms)"
        claim_note = (f"Shared leads go to the first {cap} firms to claim; every claiming firm pays "
                      "the same price. Exclusive is available only while no other firm has claimed. "
                      "No commitment. You only pay for leads you claim.")
        ex = tiers.gbp(tier["price"] * tiers.exclusive_multiplier())
        exclusive_line_txt = f"Exclusive: {ex} locks this lead to your firm\n"
        exclusive_line_html = ('    <tr><td style="padding: 4px 12px 4px 0; color: #555;">Exclusive</td>'
                               f'<td style="padding: 4px 0;"><strong>{ex}</strong> '
                               'locks this lead to your firm</td></tr>\n')
    mapping = {
        "TIER_LABEL": tier["label"],
        "CASE_TYPE": lead["case_type"],
        "AREA": lead["area"] or "Not stated",
        "INTENT_LINE": lead["intent_line"],
        # The enquirer's own words, identifiers stripped. This is what the firm
        # decides on; the unredacted message goes out only on claim.
        "REDACTED_MESSAGE": tiers.redact(lead.get("message")),
        "PRICE": tiers.gbp(tier["price"]),
        "CAP": cap if cap is not None else "any number of",
        "SHARE_NOTE": share_note,
        "CLAIM_NOTE": claim_note,
    }
    for firm in pool:
        for ext in ("txt", "html"):
            line = exclusive_line_txt if ext == "txt" else exclusive_line_html
            path = tiers.write_outbox(f"ping_{lead['id']}_{firm['id']}.{ext}",
                                      tiers.render(f"ping.{ext}", {**mapping, "EXCLUSIVE_LINE": line}))
        print(f"  {firm['id']} {firm['firm_name']}: rendered {path.with_suffix('').name}.txt/.html")
        print(f"  [STUB] would email ping to {firm['email']}")

    if adjacent:
        # The decay clock belongs to the accounting lane, so an adjacent ping must not
        # restart it or reset a lead that has already been served to accountants.
        print(f"{lead['id']} left at status={lead['status']} (adjacent ping does not touch "
              "the decay clock).")
        return
    lead["status"] = "fresh"
    lead["last_ping_at"] = datetime.now().isoformat(timespec="seconds")
    tiers.write_rows("leads.csv", leads)
    print(f"{lead['id']} marked fresh, last_ping_at={lead['last_ping_at']}")


if __name__ == "__main__":
    main()
