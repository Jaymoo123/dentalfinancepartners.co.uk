"""Manager-run paid DataForSEO expansion to top up the dentists topic pool.

Pattern: scripts/_trade_pool_pull.py (construction-cis). Dumps a keyword universe
(suggestions, volume embedded) from dental-finance seed heads for local clustering.
Guarded by DATAFORSEO_ABORT_AT (manager sets at invocation).
"""
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from optimisation_engine.clients.dataforseo_client import DataForSEOClient

SITE = "dentists"
OUT = Path("expansion_research/tier1_dentists/raw")
OUT.mkdir(parents=True, exist_ok=True)

# Brand-breadth seeds: tax + finance/lending + practice sales + pensions/wealth
SEEDS = [
    "dental accountant",
    "dentist tax",
    "dental practice accounts",
    "associate dentist tax",
    "buying dental practice",
    "dental practice valuation",
    "nhs pension dentist",
    "dental practice incorporation",
    "locum dentist tax",
    "squat dental practice",
]

def main():
    c = DataForSEOClient()
    print("balance start:", c.get_account_balance()["tasks"][0]["result"][0]["money"]["balance"])
    all_rows = {}
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
    (OUT / "dfs_dentists_universe.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")
    print(f"\nDONE: {len(rows)} unique keywords, spent ${spent:.4f}")
    print(f"  -> {OUT / 'dfs_dentists_universe.json'}")
    print("balance end:", c.get_account_balance()["tasks"][0]["result"][0]["money"]["balance"])

if __name__ == "__main__":
    main()
