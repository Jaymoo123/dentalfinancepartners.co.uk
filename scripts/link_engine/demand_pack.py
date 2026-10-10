"""Write DEMAND_MAP.md: the plain-English readout of one link-engine run, built only from the stage files.

Inputs (run dir): stages/06_families.csv, 06_owner_rollup.csv, 02_metrics.csv, 03_* meta sidecars,
  inputs/leads_by_entry_page.csv (+ meta), dfs_spend_ledger.csv, every *.meta.json for the file list.
Output: docs/<site>/link_engine/<run>/DEMAND_MAP.md. Deterministic: no API calls, no generated prose,
  the same files always give the same text. Changes no stage output.
Cost: free.
Money values are "$ per month (ad-market value, USD)": volume x Google Ads CPC (USD), not revenue.
Lead values are the lead scorer's own estimate in GBP and are labelled as such.
"""
from __future__ import annotations

import argparse
import json
from collections import defaultdict

from common import load_site, read_csv, run_dir, run_spend, sha256_file


def f(v, d=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def n(v) -> str:
    return f"{int(round(f(v))):,}"


def cell(s) -> str:
    return str(s if s not in (None, "") else "-").replace("|", "/").replace("\n", " ")


def table(head: list[str], rows: list[list]) -> list[str]:
    out = ["| " + " | ".join(head) + " |", "|" + "|".join("---" for _ in head) + "|"]
    out += ["| " + " | ".join(cell(c) for c in r) + " |" for r in rows]
    return out + [""]


def meta(p) -> dict:
    return json.loads(open(str(p) + ".meta.json", encoding="utf-8").read())


def basis_label(b: str) -> str:
    return b


def position_text(r: dict) -> str:
    gsc = f"Search Console average {r['gsc_pos_head']}" if r["gsc_pos_head"] else "no Search Console data"
    if r["serp_rank_us_head"]:
        return f"live Google rank {r['serp_rank_us_head']}"
    if r["serp_pulled"] == "y":
        return f"not in top 10 ({gsc})"
    return f"no live check ({gsc})"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    rd = run_dir(a.site, a.run)
    sitewide = set(load_site(a.site)["link_engine"].get("sitewide_pages", []))
    st, inp = rd / "stages", rd / "inputs"
    fams = read_csv(st / "06_families.csv")
    roll = read_csv(st / "06_owner_rollup.csv")
    leads = read_csv(inp / "leads_by_entry_page.csv")
    ledger = read_csv(rd / "dfs_spend_ledger.csv")
    m_gsc, m_bing = meta(st / "03_gsc_query_page.csv"), meta(st / "03_bing_query.csv")
    m_met, m_lead = meta(st / "02_metrics.csv"), meta(inp / "leads_by_entry_page.csv")

    ranked = [r for r in fams if r["rank"]]
    info = [r for r in fams if r["commercial_fit"] == "informational_with_ad_spend"]
    excl = [r for r in fams if r["owner_basis"] == "excluded by judgment"]
    L = [f"# Demand map: {a.site}, run {a.run}", "",
         "Built by scripts/link_engine/demand_pack.py from the stage files listed at the end. "
         "Money values are `$ per month (ad-market value, USD)`: monthly searches times the Google Ads cost per click "
         "in US dollars. It measures how much advertisers pay for the traffic, not what we would earn.", ""]

    # 1 header
    calls = [x for x in ledger if x["cache_hit"] != "True"]
    L += ["## 1. What this covers", ""]
    L += table(["Item", "Value"], [
        ["Site", a.site],
        ["Run date", a.run],
        ["Google Search Console window", f"{m_gsc.get('window')} (data through {m_gsc.get('data_through')})"],
        ["Bing Webmaster window", f"{m_bing.get('window')} (data through {m_bing.get('data_through')})"],
        ["Search volume and cost per click", f"Google Ads, UK, one source, one date: {m_met.get('data_through')}"],
        ["Live Google results (top 10)", f"UK desktop, pulled on {m_met.get('data_through')}"],
        ["Leads window", f"{m_lead.get('window')} (data through {m_lead.get('data_through')})"],
        ["DataForSEO spend this run", f"${run_spend(a.site, a.run):.2f} over {len(calls)} paid calls ({len(ledger) - len(calls)} cache hits)"],
        ["Keywords priced", n(m_met.get("rows"))],
        ["Search families in total", n(len(fams))],
        ["Money families ranked", n(len(ranked))],
        ["Left to the blog engine (informational)", n(len(info))],
        ["Excluded (no page wanted)", n(len(excl))],
    ])

    # 2 rollup
    L += ["## 2. Money pages ranked by commercial priority", "",
          "Priority is ad-market value times winnability (how likely we are to rank). "
          "Share is of the total across ranked families. Searches are per month with close variants counted once.", ""]
    big = [r for r in roll if r["share_of_priority"] != "" and f(r["share_of_priority"]) >= 0.005]
    small = [r for r in roll if r not in big]
    rows = [[r["owner_page"], r["n_families"], n(r["demand_volume"]), n(r["value_usd_month"]),
             f"{f(r['share_of_priority']) * 100:.1f}%", r["leads_90d"], r["top3_family_heads"]] for r in big]
    if small:
        rows.append([f"Other ({len(small)} pages)", sum(int(f(r["n_families"])) for r in small),
                     n(sum(f(r["demand_volume"]) for r in small)), n(sum(f(r["value_usd_month"]) for r in small)),
                     f"{sum(f(r['share_of_priority']) for r in small) * 100:.1f}%",
                     sum(int(f(r["leads_90d"])) for r in small), ""])
    L += table(["Owner page", "Families", "Searches per month", "$ per month (ad-market value, USD)", "Share of priority",
                "Leads (90 days)", "Top 3 search families"], rows)

    # 3 top 30
    L += ["## 3. Top 30 search families", "",
          "Winnability is our position factor times one minus half the share of big-site results; higher is easier. "
          "djh.co.uk is the competitor we are measured against.", ""]
    rows = []
    for r in ranked[:30]:
        rows.append([r["rank"], r["head"], "Hire" if r["intent_class"] == "hire" else "Paid decision", n(r["demand_volume"]),
                     n(r["value_usd_month"]), r["winnability"], position_text(r),
                     f"rank {r['yardstick_position']}" if r["yardstick_position"] else "not in top 10",
                     r["owner_page"] or "-", basis_label(r["owner_basis"]),
                     f"{r['owner_leads_90d']} leads on owner page ({r['lead_sharing'] or 'n/a'})"])
    L += table(["Rank", "Main search", "Type", "Searches per month", "$ per month (ad-market value, USD)", "Winnability",
                "Our live Google position", "djh.co.uk position", "Owner page", "Basis", "Owner-page leads (90 days)"], rows)

    # 4 gaps
    L += ["## 4. Gaps: demand with no page to own it", ""]
    city = [r for r in ranked if r["owner_page"] == "GAP: city page"]
    cities = sorted({r["geo"] for r in city if r["geo"]})
    if city:
        L += [f"- **City pages not built:** {len(city)} search families across {len(cities)} named cities "
              f"({', '.join(cities) if cities else 'none named'}), {n(sum(f(r['demand_volume']) for r in city))} searches per month, "
              f"$ {n(sum(f(r['value_usd_month']) for r in city))} per month (ad-market value, USD).", ""]
    other = [r for r in ranked if r["owner_page"].startswith("GAP") and r["owner_page"] != "GAP: city page"]
    if other:
        L += table(["Rank", "Search family", "Searches per month", "$ per month (ad-market value, USD)", "Page needed"],
                   [[r["rank"], r["head"], n(r["demand_volume"]), n(r["value_usd_month"]), r["gap_brief"] or r["owner_page"]] for r in other])
    else:
        L += ["No other gaps.", ""]

    # 5 leads
    L += ["## 5. Leads cross-check", "",
          "Leads belong to the page that owns a family, never to the family itself, and site-wide pages (home, about, contact and similar) "
          "carry no family leads. Flags are decided per owner page: leads exceed demand = 3 or more leads while the page holds under 2% "
          "of priority; demand without leads = 5% or more of priority and no leads. Lead values are the lead scorer's estimate in GBP.", ""]
    flagged = [r for r in roll if r["lead_signal"]]
    L += table(["Owner page", "Share of priority", "Families", "Leads (90 days)", "Est. lead value (GBP)", "Flag", "Note"],
               [[r["owner_page"], f"{f(r['share_of_priority']) * 100:.1f}%", r["n_families"], r["leads_90d"],
                 n(r["lead_value_gbp_90d"]), r["lead_signal"], r["lead_note"]] for r in flagged])
    owners = {r["owner_page"] for r in ranked}
    orphan = [x for x in leads if f(x["leads"]) >= 3 and x["entry_path"] not in owners]
    orphan.sort(key=lambda x: -f(x["leads"]))
    L += ["Entry pages with 3 or more leads that own no ranked family:", ""]
    L += table(["Entry page", "Leads (90 days)", "Est. lead value (GBP)", "Note"],
               [[x["entry_path"], x["leads"], n(x["est_value_gbp"]),
                 "site-wide page, leads not attributed to any family" if x["entry_path"] in sitewide else ""] for x in orphan])

    # 6 informational
    L += ["## 6. Left to the blog engine", "",
          f"{len(info)} families ({n(sum(f(r['demand_volume']) for r in info))} searches per month, "
          f"$ {n(sum(f(r['value_usd_month']) for r in info))} per month ad-market value, USD) are informational: advertisers pay a lot for them "
          "but the typical searcher wants a fact or a calculation and rarely hires. They stay with the blog guides and are not ranked. "
          f"A further {len(excl)} families are excluded because no page is wanted.", ""]
    top = sorted(info, key=lambda r: -f(r["value_usd_month"]))[:10]
    L += table(["Search family", "Searches per month", "$ per month (ad-market value, USD)", "Owner guide", "Why"],
               [[r["head"], n(r["demand_volume"]), n(r["value_usd_month"]), r["owner_page"] or "-", r["judgment_reason"]] for r in top])

    # 7 provenance
    L += ["## 7. How to re-derive", "",
          "Run in order: gsc_pull, universe, metrics, serp, cluster, families, apply_judgments, demand_pack "
          "(scripts/link_engine). Every file below carries a .meta.json sidecar; the hash is from the sidecar and is "
          "checked against the file on disk.", ""]
    rows = []
    for mp in sorted(list(inp.glob("*.meta.json")) + list(st.glob("*.meta.json"))):
        p = mp.parent / mp.name[: -len(".meta.json")]
        mm = json.loads(mp.read_text(encoding="utf-8"))
        if not mm.get("sha256"):
            rows.append([f"{p.parent.name}/{p.name}", mm.get("rows", "-"), sha256_file(p) if p.exists() else "-",
                         "no hash in sidecar (computed now)"])
            continue
        ok = "ok" if p.exists() and mm.get("sha256") == sha256_file(p) else "CHANGED SINCE SIDECAR"
        rows.append([f"{p.parent.name}/{p.name}", mm.get("rows", "-"), mm["sha256"], ok])
    L += table(["File", "Rows", "sha256", "Matches disk"], rows)

    out = rd / "DEMAND_MAP.md"
    out.write_text("\n".join(L), encoding="utf-8")
    print(f"wrote {out} ({len(L)} lines)")


if __name__ == "__main__":
    main()
