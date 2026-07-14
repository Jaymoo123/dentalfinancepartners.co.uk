"""Manager-run paid DataForSEO expansion to seed the construction-cis (trade) topic pool.

Trade is a LIVE site with ZERO blog_topics. This pulls a keyword universe (suggestions +
related, volume embedded) from CIS/trade seed heads, dumps raw JSON for a Sonnet worker to
diff against existing coverage + cluster into a pool. Guarded by DATAFORSEO_ABORT_AT (manager
sets at invocation). Paid calls route through the client's cost guard.
"""
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from optimisation_engine.clients.dataforseo_client import DataForSEOClient

SITE = "construction-cis"
OUT = Path("expansion_research/tier1_trade/raw")
OUT.mkdir(parents=True, exist_ok=True)

# Seeds drawn from trade's live clusters + core CIS money/service intents
SEEDS = [
    "cis accountant",
    "cis tax refund",
    "cis subcontractor",
    "cis payroll",
    "gross payment status",
    "cis return",
    "vat reverse charge construction",
    "construction accountant",
    "cis deduction",
    "accountant for tradesmen",
]

def main():
    c = DataForSEOClient()
    print("balance start:", c.get_account_balance()["tasks"][0]["result"][0]["money"]["balance"])
    all_rows = {}  # keyword.lower() -> {keyword, volume, kd, cpc, competition, source}
    spent = 0.0

    def absorb(resp, source):
        nonlocal spent
        spent += float(resp.get("cost") or 0)
        for task in resp.get("tasks", []):
            for res in (task.get("result") or []):
                items = res.get("items") if isinstance(res.get("items"), list) else [res]
                for it in items:
                    kw = (it.get("keyword") or "").lower().strip()
                    if not kw:
                        continue
                    ki = it.get("keyword_info") or {}
                    vol = it.get("search_volume", ki.get("search_volume"))
                    prev = all_rows.get(kw)
                    if prev is None or (vol or 0) > (prev.get("volume") or 0):
                        all_rows[kw] = {
                            "keyword": it.get("keyword"),
                            "volume": vol,
                            "cpc": it.get("cpc", ki.get("cpc")),
                            "competition": it.get("competition", ki.get("competition")),
                            "kd": (it.get("keyword_properties") or {}).get("keyword_difficulty"),
                            "source": source,
                        }

    for s in SEEDS:
        try:
            absorb(c.keyword_suggestions(site_key=SITE, seed_keyword=s, limit=200), f"suggest:{s}")
            print(f"  suggest '{s}': universe={len(all_rows)} spent=${spent:.4f}")
        except Exception as e:
            print(f"  suggest '{s}' FAILED: {e}")

    rows = sorted(all_rows.values(), key=lambda r: (r.get("volume") or 0), reverse=True)
    (OUT / "dfs_trade_universe.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")
    print(f"\nDONE: {len(rows)} unique keywords, spent ${spent:.4f}")
    print(f"  -> {OUT / 'dfs_trade_universe.json'}")
    print("balance end:", c.get_account_balance()["tasks"][0]["result"][0]["money"]["balance"])

if __name__ == "__main__":
    main()
