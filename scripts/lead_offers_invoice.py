"""Monthly invoice readout from the lead_offers + lead_supply ledgers.

Usage (repo root):
  python scripts/lead_offers_invoice.py 2026-08
  python scripts/lead_offers_invoice.py 2026-08 --credit OFFER_ID REASON
  python scripts/lead_offers_invoice.py --selftest

Amounts come from the price_gbp snapshot on each offer/supply row (case-tier
price card, see docs/LEAD_PRICING.md). The tier column shows the case tier;
legacy rows without case_tier display via the owner-approved map (very_high/
high -> advisory, medium -> standard).
Credited rows render as £0 informational lines: the credit removes that lead's
own charge and is never a deduction against other leads. Raw supplies
(lead_supply) bill the raw buyer monthly at the per-row price snapshot.
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
# Payment footer on every invoice with billable lines. Deliberately a constant,
# not env: the runbook says "set BANK_DETAILS in the script first".
BANK_DETAILS = ""


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
            sys.exit("a ledger table is missing (lead_offers/lead_buyers/lead_supply). "
                     "Apply supabase/migrations/20260807000001_lead_buyers_and_offers.sql "
                     "and 20260819000001_telegram_lead_ops.sql first.")
        sys.exit(f"Supabase error {e.code}: {detail}")


def partition_offers(offers, buyers):
    """Split the month's offer rows for billing.

    Order matters: test-buyer rows (owner QA inboxes) drop FIRST so they can
    never surface as exceptions; then claimed-but-never-released rows split
    out as exceptions (not billable); the rest are the billable lines
    (claimed rows plus £0 informational credited rows).
    """
    live = [o for o in offers if not buyers.get(o["buyer_id"], {}).get("is_test")]
    unreleased = [o for o in live if o["status"] == "claimed" and not o.get("released_at")]
    billable = [o for o in live if o not in unreleased]
    return billable, unreleased, len(offers) - len(live)


def tiered_due(rows):
    """Amount due for one buyer's offer rows: claimed rows only. A credited
    row's charge is simply absent, never subtracted from other leads."""
    return sum(o["price_gbp"] for o in rows if o["status"] == "claimed")


def selftest():
    buyers = {"b1": {"is_test": False}, "bt": {"is_test": True}}
    offers = [
        {"buyer_id": "b1", "status": "claimed", "released_at": "2026-08-02", "price_gbp": 120},
        {"buyer_id": "b1", "status": "credited", "released_at": "2026-08-03", "price_gbp": 120},
        {"buyer_id": "b1", "status": "claimed", "released_at": None, "price_gbp": 75},
        {"buyer_id": "bt", "status": "claimed", "released_at": None, "price_gbp": 99},
    ]
    billable, unreleased, test_n = partition_offers(offers, buyers)
    assert test_n == 1, "test-buyer row must drop before anything else (D3)"
    assert len(unreleased) == 1 and unreleased[0]["price_gbp"] == 75, \
        "only the real buyer's unreleased claim is an exception (D3)"
    assert len(billable) == 2, "claimed+released and credited rows both render"
    assert tiered_due(billable) == 120, "credit must not subtract from other leads (D1)"
    print("selftest OK")


def main():
    args = sys.argv[1:]
    if "--selftest" in args:
        selftest()
        return
    if not args:
        sys.exit("usage: lead_offers_invoice.py YYYY-MM [--credit OFFER_ID REASON] | --selftest")
    month = args[0]
    datetime.strptime(month, "%Y-%m")
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")

    if "--credit" in args:
        i = args.index("--credit")
        offer_id, reason = args[i + 1], args[i + 2]
        if reason not in CREDIT_REASONS:
            sys.exit(f"credit reason must be one of {CREDIT_REASONS}")
        # Credits are dead-lead refunds on claims only: look before we PATCH so
        # a typo'd id (or an already-credited/expired row) cannot corrupt the ledger.
        rows = api(url, key, f"lead_offers?select=id,status,price_gbp&id=eq.{offer_id}")
        if not rows:
            sys.exit(f"no offer with id {offer_id}")
        if rows[0]["status"] != "claimed":
            sys.exit(f"offer {offer_id} has status '{rows[0]['status']}', not 'claimed' "
                     "- refusing to credit")
        rows = api(url, key, f"lead_offers?id=eq.{offer_id}&status=eq.claimed", "PATCH",
                   {"status": "credited", "credit_reason": reason})
        if not rows:
            sys.exit(f"offer {offer_id} changed status underneath us - not credited, rerun")
        print(f"credited offer {offer_id} ({reason}), £{rows[0]['price_gbp']}")
        return

    y, m = int(month[:4]), int(month[5:7])
    nxt = f"{y + (m == 12):04d}-{(m % 12) + 1:02d}-01"
    offers = api(url, key,
                 "lead_offers?select=id,lead_id,buyer_id,status,claimed_at,released_at,price_gbp,credit_reason"
                 f"&status=in.(claimed,credited)&claimed_at=gte.{month}-01&claimed_at=lt.{nxt}"
                 "&order=claimed_at.asc&limit=2000")
    supplies = api(url, key,
                   "lead_supply?select=lead_id,buyer_id,price_gbp,supplied_at"
                   f"&supplied_at=gte.{month}-01&supplied_at=lt.{nxt}"
                   "&order=supplied_at.asc&limit=2000")
    # Cross-month refunds (credit issued after that month's invoice went out)
    # are a manual adjustment, never arithmetic here.
    prior_credits = api(url, key,
                        "lead_offers?select=id,lead_id,buyer_id,claimed_at,price_gbp,credit_reason"
                        f"&status=eq.credited&claimed_at=lt.{month}-01"
                        "&order=claimed_at.asc&limit=200")

    buyers = {b["id"]: b for b in api(url, key, "lead_buyers?select=id,ref,firm_name,is_test&limit=500")}
    # Test buyers (owner's own inbox rows) are never billable, in either ledger.
    billable, unreleased, test_n = partition_offers(offers, buyers)
    if test_n:
        print(f"(skipping {test_n} offer row(s) for test buyers - not billable)")
    supplies = [s for s in supplies if not buyers.get(s["buyer_id"], {}).get("is_test")]
    prior_credits = [o for o in prior_credits
                     if not buyers.get(o["buyer_id"], {}).get("is_test")]

    # A claimed offer whose details were never RELEASED is not billable: under
    # the bot's approve-each-release flow released_at can lag claimed_at (or
    # never happen). Billing for an undelivered lead is the one invoice error
    # a buyer will rightly dispute, so those rows print loudly and drop out.
    if unreleased:
        print(f"\n!! EXCEPTIONS: {len(unreleased)} claimed offer(s) with NO release recorded."
              "\n!! Not billed. Release them (Telegram [Release details] or manually) and rerun:")
        for o in unreleased:
            print(f"!!   offer {o['id']}  lead {o['lead_id'][:8]}  claimed {o['claimed_at'][:16]}  £{o['price_gbp']}")

    if prior_credits:
        print(f"\nCredited since, claimed before {month} - adjust the prior invoice "
              "manually if it was billed (no arithmetic applied):")
        for o in prior_credits:
            b = buyers.get(o["buyer_id"], {"ref": o["buyer_id"][:8]})
            print(f"  offer {o['id']}  lead {o['lead_id'][:8]}  claimed {o['claimed_at'][:10]}  "
                  f"£{o['price_gbp']}  {o['credit_reason']}  buyer {b['ref']}")

    if not billable and not supplies:
        print(f"\nNo billable lines in {month}.")
        return

    leads, tiers = {}, {}
    if billable:
        lead_ids = ",".join(o["lead_id"] for o in billable)
        leads = {l["id"]: l for l in api(url, key,
                 f"leads?select=id,created_at,source&id=in.({lead_ids})&limit=2000")}
        legacy = {"very_high": "advisory", "high": "advisory", "medium": "standard"}
        tiers = {s["lead_id"]: s.get("case_tier") or legacy.get(s["tier"], s["tier"])
                 for s in api(url, key,
                 f"lead_value_scores?select=lead_id,tier,case_tier&lead_id=in.({lead_ids})&limit=2000")}

    by_buyer = defaultdict(lambda: {"offers": [], "raw": []})
    for o in billable:
        by_buyer[o["buyer_id"]]["offers"].append(o)
    for s in supplies:
        by_buyer[s["buyer_id"]]["raw"].append(s)
    grand_tiered = grand_raw = 0
    for bid, rec in by_buyer.items():
        b = buyers.get(bid, {"ref": bid[:8], "firm_name": "(unknown buyer)"})
        print(f"\n{b['firm_name']} ({b['ref']}) · {month}")
        for o in rec["offers"]:
            l = leads.get(o["lead_id"], {})
            billed = 0 if o["status"] == "credited" else o["price_gbp"]
            line = (f"  {o['claimed_at'][:10]}  lead {o['lead_id'][:8]}  "
                    f"{l.get('source', '?'):<12} {tiers.get(o['lead_id'], 'unscored'):<10} "
                    f"£{billed:>4}  lead date {str(l.get('created_at', '?'))[:10]}")
            if o["status"] == "credited":
                line += f"  credited - not billed ({o['credit_reason']}, was £{o['price_gbp']})"
            print(line)
        raws = defaultdict(int)
        for s in rec["raw"]:
            raws[s["price_gbp"]] += 1
        for price, n in sorted(raws.items()):
            print(f"  raw supply: {n} lead(s) @ £{price} = £{price * n}")
        tiered = tiered_due(rec["offers"])
        raw = sum(s["price_gbp"] for s in rec["raw"])
        print(f"  tiered £{tiered}, raw £{raw}, TOTAL DUE £{tiered + raw}")
        grand_tiered += tiered
        grand_raw += raw
    total = grand_tiered + grand_raw
    print(f"\nTOTAL {month}: tiered £{grand_tiered}, raw £{grand_raw}, due £{total}")
    if total > 0:
        if not BANK_DETAILS:
            sys.exit("BANK_DETAILS is empty: set it in scripts/lead_offers_invoice.py "
                     "before sending an invoice with billable lines.")
        print(f"\nPayment: {BANK_DETAILS}")


if __name__ == "__main__":
    main()
