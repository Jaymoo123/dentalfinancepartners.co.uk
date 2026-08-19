"""Monthly invoice readout from the lead_offers ledger.

Usage (repo root):
  python scripts/lead_offers_invoice.py 2026-08
  python scripts/lead_offers_invoice.py 2026-08 --credit OFFER_ID REASON

Amounts come from the price_gbp snapshot on each offer (case-tier price card,
see docs/LEAD_PRICING.md). The tier column shows the case tier; legacy rows
without case_tier display via the owner-approved map (very_high/high ->
advisory, medium -> standard).
Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY in .env.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import datetime

CREDIT_REASONS = ("spam_bot", "duplicate_30d", "wrong_category", "dead_contact")


def env(*names):
    vals = {}
    for line in open(".env", encoding="utf-8"):
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip()
    for n in names:
        v = os.environ.get(n) or vals.get(n)
        if v:
            return v
    sys.exit(f"missing env: {names}")


def api(url, key, path, method="GET", body=None):
    req = urllib.request.Request(
        f"{url}/rest/v1/{path}",
        data=json.dumps(body).encode() if body else None,
        headers={"apikey": key, "Authorization": f"Bearer {key}",
                 "Content-Type": "application/json", "Prefer": "return=representation"},
        method=method)
    try:
        return json.load(urllib.request.urlopen(req))
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        if "does not exist" in detail or "PGRST205" in detail:
            sys.exit("lead_offers/lead_buyers tables do not exist yet. "
                     "Apply supabase/migrations/20260807000001_lead_buyers_and_offers.sql first.")
        sys.exit(f"Supabase error {e.code}: {detail}")


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit("usage: lead_offers_invoice.py YYYY-MM [--credit OFFER_ID REASON]")
    month = args[0]
    datetime.strptime(month, "%Y-%m")
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")

    if "--credit" in args:
        i = args.index("--credit")
        offer_id, reason = args[i + 1], args[i + 2]
        if reason not in CREDIT_REASONS:
            sys.exit(f"credit reason must be one of {CREDIT_REASONS}")
        rows = api(url, key, f"lead_offers?id=eq.{offer_id}", "PATCH",
                   {"status": "credited", "credit_reason": reason})
        if not rows:
            sys.exit(f"no offer with id {offer_id}")
        print(f"credited offer {offer_id} ({reason}), £{rows[0]['price_gbp']}")
        return

    y, m = int(month[:4]), int(month[5:7])
    nxt = f"{y + (m == 12):04d}-{(m % 12) + 1:02d}-01"
    offers = api(url, key,
                 "lead_offers?select=id,lead_id,buyer_id,status,claimed_at,released_at,price_gbp,credit_reason"
                 f"&status=in.(claimed,credited)&claimed_at=gte.{month}-01&claimed_at=lt.{nxt}"
                 "&order=claimed_at.asc&limit=2000")
    if not offers:
        print(f"No claimed or credited offers with claimed_at in {month}.")
        return

    # A claimed offer whose details were never RELEASED is not billable: under
    # the bot's approve-each-release flow released_at can lag claimed_at (or
    # never happen). Billing for an undelivered lead is the one invoice error
    # a buyer will rightly dispute, so those rows print loudly and drop out.
    unreleased = [o for o in offers if o["status"] == "claimed" and not o.get("released_at")]
    if unreleased:
        print(f"\n!! EXCEPTIONS: {len(unreleased)} claimed offer(s) with NO release recorded."
              "\n!! Not billed. Release them (Telegram [Release details] or manually) and rerun:")
        for o in unreleased:
            print(f"!!   offer {o['id']}  lead {o['lead_id'][:8]}  claimed {o['claimed_at'][:16]}  £{o['price_gbp']}")
        offers = [o for o in offers if o not in unreleased]
    if not offers:
        print(f"\nNo billable offers in {month} after exclusions.")
        return
    buyers = {b["id"]: b for b in api(url, key, "lead_buyers?select=id,ref,firm_name&limit=500")}
    lead_ids = ",".join(o["lead_id"] for o in offers)
    leads = {l["id"]: l for l in api(url, key,
             f"leads?select=id,created_at,source&id=in.({lead_ids})&limit=2000")}
    legacy = {"very_high": "advisory", "high": "advisory", "medium": "standard"}
    tiers = {s["lead_id"]: s.get("case_tier") or legacy.get(s["tier"], s["tier"])
             for s in api(url, key,
             f"lead_value_scores?select=lead_id,tier,case_tier&lead_id=in.({lead_ids})&limit=2000")}

    by_buyer = defaultdict(list)
    for o in offers:
        by_buyer[o["buyer_id"]].append(o)
    grand_gross = grand_credit = 0
    for bid, rows in by_buyer.items():
        b = buyers.get(bid, {"ref": bid[:8], "firm_name": "(unknown buyer)"})
        print(f"\n{b['firm_name']} ({b['ref']}) · {month}")
        gross = credit = 0
        for o in rows:
            l = leads.get(o["lead_id"], {})
            line = (f"  {o['claimed_at'][:10]}  lead {o['lead_id'][:8]}  "
                    f"{l.get('source', '?'):<12} {tiers.get(o['lead_id'], 'unscored'):<10} "
                    f"£{o['price_gbp']:>4}  lead date {str(l.get('created_at', '?'))[:10]}")
            if o["status"] == "credited":
                line += f"  CREDIT ({o['credit_reason']})"
                credit += o["price_gbp"]
            else:
                gross += o["price_gbp"]
            print(line)
        print(f"  gross £{gross}, credits -£{credit}, NET DUE £{gross - credit}")
        grand_gross += gross
        grand_credit += credit
    print(f"\nTOTAL {month}: gross £{grand_gross}, credits -£{grand_credit}, "
          f"net £{grand_gross - grand_credit}")


if __name__ == "__main__":
    main()
