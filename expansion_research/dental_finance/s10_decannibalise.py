"""Stage 10: de-cannibalise the full mapped program (all clusters).

(A) EXTERNAL: each mapped page's primary keyword vs the WHOLE estate GSC corpus (15 sites)
    -> if a site already ranks, action = EXTEND that site's page (don't mint a new URL).
(B) INTERNAL: mapped pages across clusters whose primary keywords collide
    -> flag as duplicate/merge, pick one canonical.

Writes DECANNIBALISATION.md + decannibalise_actions.csv. Caches estate_corpus.json.
"""
from __future__ import annotations

import csv
import json
import re
import sys
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, "C:/Users/user/Documents/Accounting")

HERE = Path(__file__).parent
STOP = {"for", "a", "the", "to", "in", "of", "uk", "my", "your", "how", "what", "is", "are",
        "do", "i", "and", "or", "on", "with", "can", "you", "much", "vs", "near", "me", "s",
        "an", "guide", "explained", "best"}
COVER_IMPR = 10
EXT_J = 0.7
INT_J = 0.8

SITES = [
    "sc-domain:hollowaydavies.co.uk", "sc-domain:trusteetax.co.uk",
    "sc-domain:propertytaxpartners.co.uk", "sc-domain:dentalfinancepartners.co.uk",
    "sc-domain:tradetaxspecialists.co.uk", "sc-domain:carehometax.co.uk",
    "sc-domain:contractortaxaccountants.co.uk", "sc-domain:ecommercefinance.co.uk",
    "sc-domain:medicalaccounts.co.uk", "sc-domain:foundertaxpartners.co.uk",
    "sc-domain:agencyfounderfinance.co.uk", "sc-domain:hospitalitytax.co.uk",
    "sc-domain:pharmacytax.co.uk", "sc-domain:cryptotaxpartners.co.uk",
    "sc-domain:accountsforlawyers.co.uk",
]
PAGE_CSVS = ["specialist_tax_pages.csv", "business_finance_pages.csv", "exit_eot_pages.csv",
             "landlord_commercial_finance_pages.csv", "dental_pages.csv", "btl_pages.csv"]


def toks(s):
    return frozenset(w for w in re.sub(r"[^a-z0-9 ]", " ", s.lower()).split()
                     if w not in STOP and len(w) > 1)


def jac(a, b):
    return len(a & b) / len(a | b) if (a or b) else 0.0


def fetch_estate():
    cache = HERE / "estate_corpus.json"
    if cache.exists():
        return json.loads(cache.read_text(encoding="utf-8"))
    from agents.utils.gsc_client_oauth import GSCClient
    c = GSCClient()
    end = date.today(); start = end - timedelta(days=120)
    out = {}
    for s in SITES:
        try:
            resp = c.service.searchanalytics().query(siteUrl=s, body={
                "startDate": start.isoformat(), "endDate": end.isoformat(),
                "dimensions": ["query"], "rowLimit": 25000}).execute()
            out[s.replace("sc-domain:", "").replace(".co.uk", "")] = [
                [r["keys"][0].lower(), r.get("impressions", 0), round(r.get("position", 0), 1)]
                for r in resp.get("rows", [])]
        except Exception as e:  # noqa: BLE001
            print(f"  {s}: {str(e)[:60]}")
            out[s.replace('sc-domain:', '').replace('.co.uk', '')] = []
    cache.write_text(json.dumps(out), encoding="utf-8")
    return out


def load_pages():
    pages = []
    for fn in PAGE_CSVS:
        p = HERE / fn
        if not p.exists():
            continue
        for r in csv.DictReader(p.open(encoding="utf-8")):
            pk = (r.get("primary_keyword") or "").strip()
            if not pk:
                continue
            pages.append({"cluster": r.get("cluster", fn.replace("_pages.csv", "")),
                          "topic": r.get("topic", ""), "primary": pk,
                          "vol": int(r.get("primary_volume") or r.get("target_search_volume") or 0),
                          "reg": r.get("reg_flag", ""), "existing_ref": r.get("existing_ref", "")})
    return pages


GENERIC = {"tax", "finance", "financing", "loan", "loans", "business", "calculator",
           "credit", "credits", "rate", "rates", "cost", "costs", "mortgage", "property",
           "company", "relief", "help", "service", "services", "advice"}


def external(primary, estate):
    """Site already OWNS this if it ranks (pos<=30) for the primary or close variants,
    across >=2 matching queries OR an exact/near-exact match OR >=20 aggregate impressions.
    Position-based (thin-but-ranking clusters caught) + a distinctive-token guard so a
    match on generic words alone (tax/finance/calculator) does NOT count."""
    pt = toks(primary)
    per_site = {}
    for site, rows in estate.items():
        matches = []
        for q, im, pos in rows:
            shared = toks(q) & pt
            if not (shared - GENERIC):          # must share a DISTINCTIVE token
                continue
            j = 1.0 if q == primary.lower() else jac(pt, toks(q))
            if j >= 0.6:
                matches.append((j, q, im, pos))
        if matches:
            best = max(matches, key=lambda m: (m[0], -m[3]))
            n = len(matches)
            impr = sum(m[2] for m in matches)
            bestpos = min(m[3] for m in matches)
            owns = bestpos <= 30 and (n >= 2 or best[0] >= 0.85 or impr >= 20)
            if owns:
                per_site[site] = (best[0], site, best[1], impr, bestpos, n)
    if not per_site:
        return None
    # strongest site: best position, then most matches
    return min(per_site.values(), key=lambda v: (v[4], -v[5]))


def main():
    estate = fetch_estate()
    print("estate corpus:", {s: len(r) for s, r in estate.items()})
    pages = load_pages()

    # (A) external
    ext_hits = []
    for p in pages:
        m = external(p["primary"], estate)
        p["_ext"] = m
        if m:
            ext_hits.append((p, m))

    # (B) internal collisions (token-set)
    groups = {}
    for i, p in enumerate(pages):
        key = toks(p["primary"])
        placed = False
        for k in list(groups):
            if k == key or jac(k, key) >= INT_J:
                groups[k].append(p); placed = True; break
        if not placed:
            groups[key] = [p]
    collisions = [g for g in groups.values() if len(g) > 1]

    # actions
    rows = []
    for p in pages:
        if p["_ext"]:
            j, site, q, im, pos, n = p["_ext"]
            act = f"EXTEND @ {site} (ranks '{q}' {im}i p{pos}, {n}q)"
        else:
            act = "NEW"
        dupes = [x["topic"] for g in collisions if p in g for x in g if x is not p]
        rows.append({"cluster": p["cluster"], "topic": p["topic"], "primary": p["primary"],
                     "vol": p["vol"], "action": act,
                     "internal_dupes": "; ".join(dict.fromkeys(dupes))})
    with (HERE / "decannibalise_actions.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

    # report
    doc = ["# De-cannibalisation report — full mapped program",
           f"\n{len(pages)} mapped pages checked vs 15-site estate GSC corpus + against each other.\n",
           "## (A) EXTEND (estate already ranks — do NOT mint a new URL)"]
    for p, m in sorted(ext_hits, key=lambda t: -t[0]["vol"]):
        j, site, q, im, pos, n = m
        doc.append(f"- **{p['topic']}** ({p['cluster']}, {p['vol']}/mo) -> EXTEND **{site}** which ranks '{q}' ({im} impr across {n}q, best pos {pos})")
    doc.append(f"\n_{len(ext_hits)} of {len(pages)} pages should EXTEND an existing estate page._\n")
    doc.append("## (B) INTERNAL collisions (same intent mapped twice — pick ONE canonical)")
    for g in sorted(collisions, key=lambda g: -max(x["vol"] for x in g)):
        doc.append(f"- **{' / '.join(sorted(set(x['primary'] for x in g)))}** :: "
                   + " | ".join(f"{x['topic']}({x['cluster']})" for x in g))
    doc.append(f"\n_{len(collisions)} internal collision groups._\n")
    (HERE / "DECANNIBALISATION.md").write_text("\n".join(doc), encoding="utf-8")

    print(f"\n{len(pages)} pages | EXTEND: {len(ext_hits)} | internal collisions: {len(collisions)}")
    print("\nEXTEND (top by vol):")
    for p, m in sorted(ext_hits, key=lambda t: -t[0]["vol"])[:20]:
        print(f"  {p['vol']:>6}  {p['topic']:<44} -> {m[1]} ('{m[2]}' p{m[4]}, {m[5]}q)")
    print("\nINTERNAL collisions:")
    for g in sorted(collisions, key=lambda g: -max(x['vol'] for x in g))[:15]:
        print(f"  {sorted(set(x['primary'] for x in g))} :: {[x['topic'] for x in g]}")


if __name__ == "__main__":
    main()
