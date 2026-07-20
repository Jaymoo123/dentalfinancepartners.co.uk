"""
Categorise parsed spend transactions into business / personal / mixed, per merchant,
using Claude Haiku for the bulk pass (cheap, high-volume). Mixed-use and low-confidence
items are flagged for human/DJH review rather than guessed.

Pipeline:
  1. group out-transactions by a stable merchant key
  2. classify each unique merchant with Haiku (batched, cached/resumable)
  3. write:
       output/merchants_categorised.csv       one row per unique merchant + verdict
       output/business_expenses_ledger.csv     txns tagged business/mixed/review, DJH-ready

Usage:
  python expense-reconciliation/categorise.py --limit 30    # test a small batch
  python expense-reconciliation/categorise.py               # full run
"""
from __future__ import annotations
import os, csv, re, json, argparse, sys
from pathlib import Path
from collections import defaultdict
import anthropic

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).parent / "output"
CACHE = OUT / "merchant_cache.json"
MODEL = "claude-haiku-4-5-20251001"
BATCH = 40

CATEGORIES = ["software_saas","hosting_domain","ai_tools","seo_tools","advertising",
    "outsourcing_freelance","professional_services","hardware_equipment","office_supplies",
    "telecoms","banking_fees","subscriptions_media","food_drink","groceries","fuel_transport",
    "retail_shopping","health","cash_withdrawal","transfer_internal","other"]

SYSTEM = (
 "You classify UK bank/credit-card transaction merchants for a pre-trading expense review. "
 "THE BUSINESS: an online lead-generation, SEO and content business — it builds and runs "
 "niche accountancy/tax websites, buys SaaS/AI/SEO tools, hosting & domains, online ads, and "
 "outsources work to freelancers. Typical BUSINESS vendors: Vercel, Supabase, OpenAI, Anthropic, "
 "Cursor, Webflow, WordPress/Automattic, IONOS, GoDaddy, Namecheap, Cloudflare, Google Workspace/"
 "GSuite, Semrush, Ahrefs, DataForSEO, SE Ranking, Serper, Canva, Figma, Calendly, Instantly, "
 "Fiverr, Upwork, Skool, LinkedIn, Meta/Google/TikTok ads, domain & hosting, lead lists. "
 "Typical PERSONAL: supermarkets, cafes/restaurants, fuel, retail shops, ATM cash, family transfers, "
 "streaming (Disney/Netflix), gyms/health. MIXED (needs apportioning): mobile/broadband (EE, BT, "
 "Vodafone), Amazon (could be either), phone. "
 "For each merchant return: canonical (clean brand name), category (one of the given list), "
 "business_relevance ('business'|'personal'|'mixed'|'review'), is_subscription (true/false), "
 "confidence (0.0-1.0), note (<=8 words). Use 'review' when genuinely unsure. "
 "Return ONLY a JSON array, one object per input item, in the same order, each with an 'i' field "
 "echoing the input index."
)

def merchant_key(d: str) -> str:
    d = d.upper()
    d = re.sub(r"APPLEPAY|CONTACTLESS PAYMENT|DIRECT DEBIT|STANDING ORDER|FASTER PAYMENT|"
               r"CARD PAYMENT|BILL PAYMENT|\*+\d+|EFFECTIVE DATE.*|GOODS$|\d{2}/\d{2}/\d{2,4}", "", d)
    m = re.search(r"PAYPAL \*([A-Z0-9]+)", d)
    if m:
        return "PAYPAL:" + m.group(1)
    d = re.sub(r"[^A-Z0-9 ]", " ", d)
    d = re.sub(r"\s+", " ", d).strip()
    toks = [t for t in d.split() if not t.isdigit() and len(t) > 1]
    return " ".join(toks[:3]) or "UNKNOWN"

def _v(canonical, category, rel, is_sub, conf, note):
    return {"canonical": canonical, "category": category, "business_relevance": rel,
            "is_subscription": is_sub, "confidence": conf, "note": note}

# Account holder + close family surnames — transfers to these are internal/personal, not expenses.
HOLDER = r"MOUGHAL|MOUGHT"

def pre_classify(sample: str):
    """Deterministic verdict for unambiguous internal money movement (never sent to the LLM).
    Critically excludes credit-card bill payments to avoid double-counting card purchases."""
    s = sample.upper()
    if "PAYMENT RETURNED" in s:
        return _v("Payment returned", "reversal", "excluded", False, 1.0, "bank reversal")
    if re.search(r"AMERICAN EXP|\bAMEX\b|MBNA|BARCLAYCARD|CAPITAL ONE|VANQUIS|ZOPA|TYMIT|NEWDAY", s):
        return _v("Credit-card payment", "card_payment", "excluded", False, 0.95,
                  "paying a card bill — purchases already captured, avoid double-count")
    if "ATM WITHDRAWAL" in s or "CASH WITHDRAWAL" in s:
        return _v("Cash withdrawal", "cash_withdrawal", "personal", False, 0.8, "cash — not evidenceable")
    if re.match(r"(PAYMENT TO|TRANSFER TO|STANDING ORDER)\b", s):
        # a company payee could be a real supplier — leave it for overrides/Haiku
        if re.search(r"LTD|LIMITED|LLC|\bINC\b|\bCO\b|MOTOR|SERVICES|LABS|SOLUTIONS|GROUP|"
                     r"TRADING|COMPANY|ENTERPRISE|COINBASE|PAYMENTS|MOTORS", s):
            return None
        if re.search(r"\d{5,}", s):   # e.g. "Transfer to 070806 28036938" (an account number)
            return _v("Internal transfer", "transfer_internal", "excluded", False, 0.7,
                      "transfer to a bank account number (own/joint) — not a cost")
        return _v("Payment to individual", "transfer_internal", "personal", False, 0.7,
                  "payment/transfer to a named person")
    return None

def load_key() -> str:
    env = ROOT / ".env"
    if env.exists():
        for line in env.read_text(encoding="utf-8", errors="ignore").splitlines():
            if line.strip().startswith("ANTHROPIC_API_KEY"):
                return line.split("=", 1)[1].strip().strip('"').strip("'").strip()
    return os.environ.get("ANTHROPIC_API_KEY", "")

OVERRIDES = Path(__file__).parent / "overrides.csv"
def load_overrides():
    """Human/Opus-confirmed verdicts (regex on the merchant sample), highest precedence."""
    out = []
    if OVERRIDES.exists():
        for row in csv.DictReader(open(OVERRIDES, encoding="utf-8")):
            pat = row.get("pattern", "").strip()
            if not pat or pat.startswith("#"):
                continue
            out.append((re.compile(pat, re.I),
                        _v(row.get("canonical", ""), row.get("category", "other"),
                           row.get("business_relevance", "review"),
                           str(row.get("is_subscription", "")).lower() in ("1", "true", "yes"),
                           float(row["confidence"]) if row.get("confidence") else 1.0,
                           row.get("note", ""))))
    return out

def classify_batch(client, items):
    payload = [{"i": it["i"], "merchant_sample": it["sample"], "also_seen_as": it["alt"],
                "total_gbp": round(it["total"], 2), "months_active": it["months"], "txn_count": it["n"]}
               for it in items]
    msg = client.messages.create(model=MODEL, max_tokens=8000, system=SYSTEM,
        messages=[{"role": "user", "content": "Classify these merchants:\n" + json.dumps(payload)}])
    text = "".join(b.text for b in msg.content if b.type == "text")
    a, b = text.find("["), text.rfind("]")
    if a < 0 or b < 0:
        raise ValueError("no JSON array in response: " + text[:200])
    return json.loads(text[a:b + 1])

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="classify only the top-N merchants (test)")
    args = ap.parse_args()

    rows = [r for r in csv.DictReader(open(OUT / "transactions_raw.csv", encoding="utf-8"))
            if r["direction"] == "out"]
    groups = defaultdict(lambda: {"n": 0, "total": 0.0, "months": set(), "acct": set(), "samples": set()})
    for r in rows:
        g = groups[merchant_key(r["description"])]
        g["n"] += 1; g["total"] += float(r["amount"]); g["months"].add(r["txn_date"][:7])
        g["acct"].add(r["account"]);
        if len(g["samples"]) < 3: g["samples"].add(r["description"][:50])

    ordered = sorted(groups.items(), key=lambda kv: -kv[1]["total"])
    if args.limit:
        ordered = ordered[:args.limit]

    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    samples = {k: sorted(v["samples"])[0] for k, v in ordered}
    overrides = load_overrides()
    def match_ov(s):
        for rx, verd in overrides:
            if rx.search(s):
                return verd
        return None
    pre = {k: (match_ov(samples[k]) or pre_classify(samples[k])) for k in samples}
    verdict = lambda k: pre.get(k) or cache.get(k, {})
    todo = [(k, v) for k, v in ordered if not pre.get(k) and k not in cache]
    print(f"{len(ordered)} merchants | overrides+rules: {sum(1 for k in pre if pre[k])} | "
          f"cached: {sum(1 for k,_ in ordered if not pre.get(k) and k in cache)} | to classify: {len(todo)}")

    client = anthropic.Anthropic(api_key=load_key())
    for start in range(0, len(todo), BATCH):
        chunk = todo[start:start + BATCH]
        items = [{"i": i, "sample": sorted(v["samples"])[0], "alt": " | ".join(sorted(v["samples"])[1:]),
                  "total": v["total"], "months": len(v["months"]), "n": v["n"]}
                 for i, (k, v) in enumerate(chunk)]
        try:
            res = classify_batch(client, items)
        except Exception as e:
            print(f"  batch {start//BATCH+1} error: {e}"); continue
        by_i = {r.get("i"): r for r in res}
        for i, (k, v) in enumerate(chunk):
            r = by_i.get(i, {})
            cache[k] = {"canonical": r.get("canonical", k.title()), "category": r.get("category", "other"),
                        "business_relevance": r.get("business_relevance", "review"),
                        "is_subscription": bool(r.get("is_subscription", False)),
                        "confidence": r.get("confidence", 0.0), "note": r.get("note", "")}
        CACHE.write_text(json.dumps(cache, indent=0))
        print(f"  classified {min(start+BATCH,len(todo))}/{len(todo)}")

    # ---- write merchant-level verdicts ----
    with open(OUT / "merchants_categorised.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["merchant_key","canonical","category","business_relevance","is_subscription",
                    "confidence","note","months","txns","total_gbp","accounts","sample"])
        for k, v in ordered:
            c = verdict(k)
            w.writerow([k, c.get("canonical",""), c.get("category",""), c.get("business_relevance",""),
                        c.get("is_subscription",""), c.get("confidence",""), c.get("note",""),
                        len(v["months"]), v["n"], round(v["total"],2), "/".join(sorted(v["acct"])),
                        sorted(v["samples"])[0]])

    # ---- write DJH-ready ledger of business/mixed/review txns ----
    keep = {k for k, v in ordered if verdict(k).get("business_relevance") in ("business","mixed","review")}
    with open(OUT / "business_expenses_ledger.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["txn_date","vendor","category","business_relevance","is_subscription","amount_gbp",
                    "account","source_file","confidence","note","raw_description",
                    "business_use_pct_DJH","reimbursable_DJH","deductible_DJH","entity_DJH"])
        for r in rows:
            k = merchant_key(r["description"])
            if k not in keep: continue
            c = verdict(k)
            w.writerow([r["txn_date"], c.get("canonical",""), c.get("category",""),
                        c.get("business_relevance",""), c.get("is_subscription",""), r["amount"],
                        r["account"], r["source_file"], c.get("confidence",""), c.get("note",""),
                        r["description"], "", "", "", ""])

    # ---- summary ----
    from collections import Counter
    tot = Counter(); cnt = Counter()
    for k, v in ordered:
        rel = verdict(k).get("business_relevance", "review")
        tot[rel] += v["total"]; cnt[rel] += 1
    print("\n" + "="*60)
    print(f"{'relevance':14s} {'merchants':>10s} {'total £':>14s}")
    for rel in ("business","mixed","review","personal","excluded"):
        print(f"{rel:14s} {cnt[rel]:>10d} {tot[rel]:>14,.2f}")
    print("="*60)
    print(f"Output -> {OUT/'merchants_categorised.csv'}")
    print(f"          {OUT/'business_expenses_ledger.csv'}")

if __name__ == "__main__":
    main()
