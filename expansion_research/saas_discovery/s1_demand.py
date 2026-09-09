"""S1 demand pull for SaaS discovery sprint (2026-09-09).
Google Ads search volumes per candidate seed set. UK lane = UK location,
global lane = US + UK. Budget-capped. Output: raw/ json + S1_DEMAND.md table.
"""
from __future__ import annotations

import base64
import json
from pathlib import Path

import httpx

HERE = Path(__file__).parent
RAW = HERE / "raw"
RAW.mkdir(exist_ok=True)

BUDGET_CAP = 10.0
spent = 0.0

UK = 2826
US = 2840

CANDIDATES_UK = {
    "mtd_bridging": [
        "mtd software", "making tax digital software", "mtd bridging software",
        "mtd for landlords", "mtd software for landlords", "free mtd software",
        "mtd spreadsheet software", "making tax digital for income tax",
        "mtd itsa software", "cheapest mtd software", "vitaltax", "123 sheets",
        "making tax digital for landlords", "mtd compatible software",
    ],
    "dividend_voucher": [
        "dividend voucher template", "dividend voucher", "dividend voucher generator",
        "board minutes template", "dividend board minutes", "interim dividend voucher",
        "dividify", "free dividend voucher template",
    ],
    "ch_deadlines": [
        "confirmation statement reminder", "companies house deadline",
        "accounts filing deadline", "company deadline tracker",
        "companies house monitoring", "companies house alerts",
    ],
    "deal_analyser": [
        "buy to let calculator", "rental yield calculator", "btl profit calculator",
        "property deal analyser", "buy to let tax calculator", "spv mortgage calculator",
        "propertydata alternative", "property investment calculator",
        "buy to let profit calculator",
    ],
    "sa_estimator": [
        "self assessment calculator", "landlord tax calculator",
        "rental income tax calculator", "self assessment software",
        "gosimpletax", "tax return software uk", "landlord self assessment",
    ],
    "dvsa_slots": [
        "driving test cancellations", "driving test cancellation checker",
        "dvsa cancellation finder", "earlier driving test",
        "driving test cancellation app", "find driving test cancellations",
    ],
}

CANDIDATES_GLOBAL = {
    "stripe_invoice": [
        "stripe invoice generator", "stripe invoice", "send invoice stripe",
        "zenvoice", "stripe invoicing fee", "stripe customer portal invoices",
    ],
    "bank_statement": [
        "bank statement converter", "convert pdf bank statement to excel",
        "bank statement to csv", "pdf to excel bank statement",
        "bank statement converter free", "convert bank statement to excel",
    ],
    "cron_monitor": [
        "cron job monitoring", "cron monitoring", "healthchecks alternative",
        "monitor cron jobs", "scheduled task monitoring",
    ],
    "testimonial": [
        "testimonial tool", "collect video testimonials", "testimonial widget",
        "testimonial.to alternative", "senja alternative", "wall of love widget",
        "testimonial collection software",
    ],
    "screenshot_beautify": [
        "screenshot beautifier", "beautify screenshot", "pretty screenshots",
        "screenshot editor", "screenshot mockup generator",
    ],
    "og_api": [
        "screenshot api", "og image api", "html to image api",
        "website screenshot api", "url to image api",
    ],
}


def _load_creds() -> tuple[str, str]:
    login = pw = ""
    envp = Path("C:/Users/user/Documents/Accounting/.env")
    for line in envp.read_text(encoding="utf-8").splitlines():
        if line.startswith("DATAFORSEO_API_LOGIN="):
            login = line.split("=", 1)[1].strip()
        elif line.startswith("DATAFORSEO_API_PASSWORD="):
            pw = line.split("=", 1)[1].strip()
    return login, pw


def _post(path: str, payload: list[dict]) -> dict:
    global spent
    if spent >= BUDGET_CAP:
        raise RuntimeError(f"BUDGET CAP HIT: spent=${spent:.4f}")
    login, pw = _load_creds()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    r = httpx.post(
        f"https://api.dataforseo.com{path}",
        headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
        json=payload,
        timeout=180.0,
    )
    r.raise_for_status()
    data = r.json()
    cost = data.get("cost", 0) or 0
    spent += cost
    print(f"  [{path}] cost=${cost:.4f} cumulative=${spent:.4f}")
    return data


def pull(candidates: dict[str, list[str]], loc: int, tag: str) -> dict[str, dict]:
    kws = sorted({k for v in candidates.values() for k in v})
    resp = _post(
        "/v3/keywords_data/google_ads/search_volume/live",
        [{"keywords": kws, "location_code": loc, "language_code": "en"}],
    )
    (RAW / f"s1_volumes_{tag}.json").write_text(json.dumps(resp, indent=1), encoding="utf-8")
    out: dict[str, dict] = {}
    for task in resp.get("tasks", []) or []:
        for item in task.get("result", []) or []:
            out[item.get("keyword", "")] = {
                "vol": item.get("search_volume"),
                "cpc": item.get("cpc"),
                "comp": item.get("competition"),
            }
    return out


def main() -> None:
    uk = pull(CANDIDATES_UK, UK, "uk")
    gl_us = pull(CANDIDATES_GLOBAL, US, "us")
    gl_uk = pull(CANDIDATES_GLOBAL, UK, "global_uk")

    lines = ["# S1 demand (Google Ads volumes, pulled 2026-09-09)", ""]
    for name, cands, data, loc in (
        ("UK lane (UK volumes)", CANDIDATES_UK, [uk], "UK"),
        ("Global lane (US + UK volumes)", CANDIDATES_GLOBAL, [gl_us, gl_uk], "US/UK"),
    ):
        lines.append(f"## {name}")
        for cat, kws in cands.items():
            lines.append(f"\n### {cat}")
            lines.append("| keyword | " + (" vol | cpc |" if len(data) == 1 else " US vol | UK vol | US cpc |"))
            lines.append("|---|---|---|" + ("" if len(data) == 1 else "---|"))
            tot = [0] * len(data)
            for kw in kws:
                cells = []
                for i, d in enumerate(data):
                    v = d.get(kw, {})
                    tot[i] += v.get("vol") or 0
                    cells.append(str(v.get("vol", "?")))
                cpc = data[0].get(kw, {}).get("cpc")
                lines.append(f"| {kw} | " + " | ".join(cells) + f" | {cpc if cpc is not None else '?'} |")
            lines.append(f"| **TOTAL** | " + " | ".join(f"**{t}**" for t in tot) + " |  |")
        lines.append("")
    lines.append(f"\nSpend this run: ${spent:.4f}")
    (HERE / "S1_DEMAND.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"\nDONE spend=${spent:.4f} -> S1_DEMAND.md")


if __name__ == "__main__":
    main()
