"""One-shot backfill of lead_value_scores for the 55 unique property leads
(56 rows incl. one duplicate submission) scored in the 2026-07-09 analysis
(docs/property/LEAD_QUALITY_REPORT_2026-07.md). Rerunnable: upsert-ignore.

Usage: python scripts/backfill_lead_value_scores.py
Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY in .env,
and property_leads_dump.json in the repo root.
"""
import json
import os
import sys
import urllib.request

# ponytail: explicit prefix->score map, not fuzzy matching — 56 known rows, zero guesswork.
# (tier, est_value_gbp, intent, work_type, channel, confidence, rationale)
SCORES = {
    "2b293245": ("low", 0, "other", "none", "form", "high", "Email delivery complaint, not an enquiry"),
    "37dd1fc5": ("high", 2500, "structure", "recurring", "form", "high", "Ltd with 2 props, buying 2/yr + shareholder advice"),
    "136406bb": ("high", 1500, "cgt", "recurring", "form", "medium", "Ltd multi-BTL, loss offset on sale"),
    "e24e09ca": ("high", 1800, "structure", "recurring", "form", "high", "New SPV flipping business, accounts from day one"),
    "47da01ec": ("very_high", 5000, "incorporation", "project", "form", "medium", "Self-declared large portfolio incorporation"),
    "1e5a52ca": ("medium", 1000, "structure", "recurring", "form", "high", "First Ltd property, long hold, expat move"),
    "256a3d42": ("low", 0, "unknown", "none", "widget", "low", "Email-only exit-intent capture"),
    "f0d7424d": ("high", 2500, "incorporation", "recurring", "form", "high", "4 BTLs, considering incorporation"),
    "5257d11e": ("high", 2000, "structure", "recurring", "form", "high", "HMO portfolio in Ltd, detailed technical questions"),
    "897e5ebf": ("medium", 800, "structure", "one_off", "form", "medium", "Small portfolio structuring advice"),
    "d935c031": ("low", 0, "unknown", "none", "widget", "low", "Email-only exit-intent capture"),
    "d0f51aa7": ("medium", 400, "cgt", "one_off", "form", "medium", "Advice on selling one BTL"),
    "096e4c5e": ("medium", 700, "sdlt", "one_off", "form", "medium", "Ltd transfer + SDLT surcharge refund questions"),
    "aea0a540": ("medium", 400, "unknown", "unknown", "form", "low", "Portfolio owner role, blank message"),
    "a01c5880": ("high", 2000, "structure", "recurring", "form", "high", "2-director Ltd, cash purchases, pensions, MTD"),
    "fd4b735b": ("medium", 500, "structure", "one_off", "form", "low", "LLP setup enquiry"),
    "f11ea9de": ("low", 0, "unknown", "none", "form", "low", "Empty submission"),
    "d8338fde": ("medium", 700, "sdlt", "one_off", "form", "medium", "Bare trust flat purchase strategy"),
    "72695675": ("low", 100, "incorporation", "unknown", "widget", "low", "One-line exit-intent: private residence into company"),
    "1eb7dc06": ("low", 100, "compliance", "one_off", "form", "medium", "MTD threshold question, ~GBP 20k rent"),
    "c2db4a83": ("medium", 800, "cgt", "one_off", "widget", "medium", "Farm CGT improvements valuation question"),
    "aacc229f": ("medium", 300, "nrl_expat", "recurring", "widget", "medium", "NRL single London property"),
    "bf902f40": ("medium", 600, "incorporation", "one_off", "form", "medium", "Transfer property into business"),
    "a5ee2836": ("low", 0, "unknown", "none", "widget", "low", "Email-only exit-intent capture"),
    "51c16dbf": ("low", 0, "unknown", "none", "widget", "low", "Email-only exit-intent capture"),
    "dae3ed96": ("medium", 900, "sdlt", "one_off", "form", "high", "SDLT higher rates, Portuguese company structure"),
    "abfa1ec2": ("medium", 600, "incorporation", "one_off", "form", "medium", "House to Ltd benefits question"),
    "cbb2d883": ("medium", 700, "sdlt", "one_off", "form", "high", "Divorce SDLT, urgent, non-resident"),
    "12d2fbef": ("medium", 400, "nrl_expat", "one_off", "form", "low", "Expat disposal rules"),
    "5ff07766": ("very_high", 8000, "incorporation", "project", "form", "high", "12-flat freehold block GBP 2.25m incorporation"),
    "8cb01d8d": ("very_high", 6000, "incorporation", "recurring", "form", "high", "11 flats + Ltd + LLP, succession planning"),
    "fbdad1a5": ("low", 100, "structure", "unknown", "widget", "low", "One-line: reduce property tax"),
    "ca2b3253": ("low", 0, "other", "none", "widget", "high", "SA109 form request, not client work"),
    "0a0ce93d": ("medium", 800, "cgt", "one_off", "widget", "high", "CGT on GBP 450k sale with PRR period"),
    "92d955cc": ("medium", 1200, "structure", "recurring", "form", "high", "Buying in Ltd, wants ongoing accountant"),
    "54262c2c": ("high", 1800, "incorporation", "recurring", "form", "medium", "SME director starting property investment"),
    "bb104e32": ("high", 2500, "cgt", "project", "form", "high", "4 converted flats, complex CGT sale"),
    "4bc79f79": ("very_high", 7000, "compliance", "recurring", "form", "high", "GBP 750k turnover: Ltd + partnership + 2 mgmt cos + 2 SAs"),
    "cfde219a": ("low", 100, "compliance", "unknown", "widget", "low", "One-line result-gate capture"),
    "ee488715": ("medium", 600, "structure", "one_off", "form", "medium", "First BTL + day-trading classification question"),
    "e80a08d5": ("medium", 900, "cgt", "one_off", "widget", "high", "60-day NR CGT, penalties help"),
    "b06d35a4": ("medium", 700, "nrl_expat", "one_off", "form", "medium", "Non-resident CGT on London sale"),
    "b73c14bb": ("low", 100, "cgt", "unknown", "widget", "low", "Considering selling BTL, one line"),
    "c7c334f2": ("medium", 500, "structure", "one_off", "form", "high", "Form 17 + Declaration of Trust"),
    "5c6f9f19": ("low", 0, "cgt", "none", "widget", "high", "Duplicate of same-day contact-form submission"),
    "67b2507c": ("medium", 600, "cgt", "one_off", "form", "medium", "Sold London property, PRR/letting period"),
    "b0f00f0d": ("high", 2500, "incorporation", "recurring", "form", "medium", "Portfolio incorporation"),
    "0a8b9d70": ("very_high", 6000, "incorporation", "project", "widget", "high", "GBP 1.2m partnership portfolio, Incorporation Relief"),
    "67f2239c": ("medium", 1200, "structure", "recurring", "form", "high", "BTL Ltd setup, extraction, director addition"),
    "35464f1e": ("medium", 700, "structure", "one_off", "form", "high", "99:1 restructure, DoT verification"),
    "549d7498": ("medium", 1000, "compliance", "recurring", "form", "medium", "SA + MTD + CGT advice"),
    "65ac80d4": ("medium", 500, "compliance", "recurring", "widget", "medium", "Rental income compliance"),
    "20162539": ("medium", 400, "cgt", "one_off", "widget", "low", "Selling for GBP 230k, one line"),
    "ad6ead36": ("low", 100, "other", "one_off", "form", "medium", "Council tax s106, not accountancy work"),
    "1b7b6a54": ("low", 100, "nrl_expat", "unknown", "form", "low", "Vague NRL question"),
    "4bffe7ac": ("medium", 500, "vat", "one_off", "widget", "high", "VAT on Ltd rental income"),
}


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


def main():
    dump = json.load(open("property_leads_dump.json", encoding="utf-8"))
    by_prefix = {r["id"][:8]: r["id"] for r in dump}
    unmatched = set(SCORES) - set(by_prefix)
    assert not unmatched, f"score prefixes not in dump: {unmatched}"
    missing = set(by_prefix) - set(SCORES)
    assert not missing, f"dump leads without a score: {missing}"

    rows = [
        {"lead_id": by_prefix[p], "tier": t, "est_value_gbp": v, "intent": i,
         "work_type": w, "channel": ch, "confidence": cf, "rationale": ra,
         "scored_by": "claude_manual"}
        for p, (t, v, i, w, ch, cf, ra) in SCORES.items()
    ]
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY")
    req = urllib.request.Request(
        f"{url}/rest/v1/lead_value_scores",
        data=json.dumps(rows).encode(),
        headers={"apikey": key, "Authorization": f"Bearer {key}",
                 "Content-Type": "application/json",
                 "Prefer": "resolution=ignore-duplicates,return=minimal"},
        method="POST")
    urllib.request.urlopen(req)

    # self-check: all 56 present
    q = urllib.request.Request(
        f"{url}/rest/v1/lead_value_scores?select=lead_id&limit=1000",
        headers={"apikey": key, "Authorization": f"Bearer {key}"})
    got = {r["lead_id"] for r in json.load(urllib.request.urlopen(q))}
    want = {by_prefix[p] for p in SCORES}
    assert want <= got, f"missing after insert: {want - got}"
    print(f"OK: {len(want)} scores present ({len(got)} total rows in table)")


if __name__ == "__main__":
    main()
