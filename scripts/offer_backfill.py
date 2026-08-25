"""Backlog offer tooling for the lead offer/claim system.

Readout (default): tier + price the historical unsold lead list, per source.
  python scripts/offer_backfill.py [--include-property]

Batch offer: insert lead_offers rows for one buyer (does NOT send emails).
  python scripts/offer_backfill.py --buyer <ref> --lead-ids id1,id2
  python scripts/offer_backfill.py --buyer <ref> --source property \\
      --since 2026-06-01 --min-tier advisory

Case-tier prices from config/tiers.json (canonical; see docs/LEAD_PRICING.md).
Runs from the repo root. Legacy rows without case_tier fall back through the
owner-approved map (very_high/high -> advisory, medium -> standard, low never
sold). Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) +
SUPABASE_SERVICE_ROLE_KEY in .env.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

SELLABLE = ("advisory", "standard", "essential")
with open("config/tiers.json", encoding="utf-8") as f:
    PRICE = {t["id"]: t["price"] for t in json.load(f)["tiers"] if t["id"] in SELLABLE}
TIER_RANK = {"essential": 0, "standard": 1, "advisory": 2}
LEGACY_TIER_MAP = {"very_high": "advisory", "high": "advisory", "medium": "standard"}


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


def api(url, key, path, method="GET", body=None, prefer="return=representation"):
    req = urllib.request.Request(
        f"{url}/rest/v1/{path}",
        data=json.dumps(body).encode() if body else None,
        headers={"apikey": key, "Authorization": f"Bearer {key}",
                 "Content-Type": "application/json", "Prefer": prefer},
        method=method)
    try:
        raw = urllib.request.urlopen(req).read()
        return json.loads(raw) if raw else []
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        if "does not exist" in detail or "PGRST205" in detail:
            sys.exit("lead_offers/lead_buyers tables do not exist yet. "
                     "Apply supabase/migrations/20260807000001_lead_buyers_and_offers.sql first.")
        sys.exit(f"Supabase error {e.code}: {detail}")


def arg(name):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else None


def unsold_leads(url, key):
    """All non-test leads with a sellable tier, minus any already offered."""
    leads = api(url, key, "leads?select=id,created_at,submitted_at,source,role"
                          "&is_test=eq.false&order=created_at.asc&limit=5000")
    scores = {s["lead_id"]: s for s in api(url, key,
              "lead_value_scores?select=lead_id,tier,case_tier,intent,work_type&limit=5000")}
    try:  # table may not exist pre-migration; for the readout that just means nothing offered yet
        offered = {o["lead_id"] for o in api(url, key, "lead_offers?select=lead_id&limit=5000")}
    except SystemExit:
        if arg("--buyer"):
            raise
        print("note: lead_offers table not found (migration not applied), treating all as unoffered\n")
        offered = set()
    out = []
    for l in leads:
        s = scores.get(l["id"])
        if not s or l["id"] in offered:
            continue
        tier = s.get("case_tier") or LEGACY_TIER_MAP.get(s["tier"])
        if tier in PRICE:
            s["offer_tier"] = tier
            out.append((l, s))
    return out


def readout(rows, include_property):
    from collections import defaultdict
    table = defaultdict(lambda: defaultdict(int))
    for l, s in rows:
        if l.get("source") == "property" and not include_property:
            continue
        table[l.get("source") or "unknown"][s["offer_tier"]] += 1
    tiers = ["advisory", "standard", "essential"]
    card = ", ".join(f"{t} £{PRICE[t]}" for t in tiers)
    print(f"Unsold lead backlog at the case-tier price card ({card}; legacy low excluded)")
    if not include_property:
        print("source=property excluded (pass --include-property to include)\n")
    hdr = f"{'source':<16}" + "".join(f"{t:>12}" for t in tiers) + f"{'total £':>12}"
    print(hdr)
    print("-" * len(hdr))
    grand_n, grand_v = 0, 0
    for src in sorted(table):
        cells, val = "", 0
        for t in tiers:
            n = table[src][t]
            cells += f"{n:>12}"
            val += n * PRICE[t]
            grand_n += n
        print(f"{src:<16}{cells}{val:>11,}")
        grand_v += val
    print("-" * len(hdr))
    print(f"{'TOTAL':<16}{grand_n:>36}{grand_v:>11,}")


def batch_offer(url, key, rows):
    ref = arg("--buyer")
    buyers = api(url, key, f"lead_buyers?select=id,ref,firm_name&ref=eq.{ref}")
    if not buyers:
        sys.exit(f"no buyer with ref '{ref}' in lead_buyers")
    buyer = buyers[0]

    if arg("--lead-ids"):
        want = set(arg("--lead-ids").split(","))
        picked = [(l, s) for l, s in rows if l["id"] in want]
        missing = want - {l["id"] for l, s in picked}
        if missing:
            print(f"WARNING: {len(missing)} ids skipped (not found, sold-tier-less, "
                  f"test, or already offered): {sorted(missing)}")
    else:
        picked = rows
        if arg("--source"):
            picked = [(l, s) for l, s in picked if l.get("source") == arg("--source")]
        if arg("--since"):
            picked = [(l, s) for l, s in picked if l["created_at"][:10] >= arg("--since")]
        min_tier = arg("--min-tier") or "essential"
        picked = [(l, s) for l, s in picked if TIER_RANK[s["offer_tier"]] >= TIER_RANK[min_tier]]

    if not picked:
        sys.exit("nothing to offer after filters")
    expires = (datetime.now(timezone.utc) + timedelta(hours=72)).isoformat()
    inserts = []
    for l, s in picked:
        # teaser = minimal structured card, no free text, no PII
        inserts.append({
            "lead_id": l["id"], "buyer_id": buyer["id"],
            "price_gbp": PRICE[s["offer_tier"]], "expires_at": expires,
            "teaser": {"tier": s["offer_tier"], "intent": s.get("intent"),
                       "work_type": s.get("work_type"), "source": l.get("source"),
                       "role": l.get("role"),
                       "submitted_date": (l.get("submitted_at") or l["created_at"])[:10],
                       "backlog": True}})
    got = api(url, key, "lead_offers?on_conflict=lead_id,buyer_id", "POST", inserts,
              prefer="resolution=ignore-duplicates,return=representation")
    print(f"inserted {len(got)} of {len(inserts)} offers for {buyer['firm_name']} "
          f"({buyer['ref']}), expires {expires[:16]}Z")
    for o in got:
        print(f"  {o['id']}  lead {o['lead_id'][:8]}  {o['teaser']['tier']:<10} £{o['price_gbp']}")
    print("REMINDER: no emails sent. Offers go out via the web offer-send path.")


def main():
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")
    rows = unsold_leads(url, key)
    if arg("--buyer"):
        batch_offer(url, key, rows)
    else:
        readout(rows, "--include-property" in sys.argv)


if __name__ == "__main__":
    main()
