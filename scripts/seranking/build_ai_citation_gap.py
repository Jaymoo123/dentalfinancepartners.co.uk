"""
Deliverable 3 — AI-search citation gap (feeds the GEO program).

For each tracked property-tax prompt: which domains are cited across AI engines
(ChatGPT/Gemini/Perplexity), whether Property appears, and where a competitor is
cited and we are not.

Reads raw/ai_overview_*.json. Out: ai_citation_gap_<date>.csv

Run:  python -m scripts.seranking.build_ai_citation_gap
"""
from __future__ import annotations

from datetime import date

from scripts.seranking._common import (
    raw_files, load, records, pick, domain_of, write_csv,
)

OWN_DOMAINS = {"propertytaxpartners.co.uk", "propertytaxpartners"}


def _cited(rec: dict) -> dict:
    return {
        "domain": domain_of(pick(rec, "domain", "url", "link", "source", "cited_domain")),
        "url": pick(rec, "url", "link", "cited_url", "source"),
        "engine": pick(rec, "engine", "ai_engine", "platform", "source_engine", default="ai"),
    }


def main() -> int:
    files = raw_files("ai_overview")
    if not files:
        print("No raw/ai_overview_*.json yet. Run tier1 (AI prompts) first.")
        return 1

    rows = []
    for path in files:
        data = load(path)
        prompt = ""
        if isinstance(data, dict):
            prompt = pick(data, "keyword", "query", "prompt", default="")
        if not prompt:
            prompt = path.name.split("ai_overview_")[-1].rsplit("_2", 1)[0].replace("-", " ")
        cites = [_cited(r) for r in records(data)]
        cites = [c for c in cites if c["domain"]]
        cited_domains = sorted({c["domain"] for c in cites})
        we_cited = any(d in OWN_DOMAINS or d.startswith("propertytaxpartners") for d in cited_domains)
        # competitor cited url (first non-own)
        comp_url = next((c["url"] for c in cites
                         if c["domain"] not in OWN_DOMAINS and not c["domain"].startswith("propertytaxpartners")),
                        None)
        engines = sorted({str(c["engine"]) for c in cites})
        rows.append({
            "prompt": prompt,
            "engines": ", ".join(engines),
            "we_cited": we_cited,
            "n_cited_domains": len(cited_domains),
            "competitor_cited_url": comp_url,
            "cited_domains": ", ".join(cited_domains[:12]),
        })
    rows.sort(key=lambda r: (r["we_cited"], -r["n_cited_domains"]))
    out = write_csv(f"ai_citation_gap_{date.today().isoformat()}.csv", rows, fieldnames=[
        "prompt", "engines", "we_cited", "n_cited_domains",
        "competitor_cited_url", "cited_domains"])
    gaps = sum(1 for r in rows if not r["we_cited"])
    print(f"Wrote {out}  ({len(rows)} prompts; {gaps} where Property is NOT cited)")
    for r in rows:
        flag = "CITED " if r["we_cited"] else "GAP   "
        print(f"  {flag} {r['prompt']!r}  ({r['n_cited_domains']} domains)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
