"""Stage 9: compact SERP + AI-Overview winnability check on the top-value terms.
Verifies whether low KD is real or the SERP is aggregator/AIO-dominated (clicks eaten).
Direct DFS serp/google/organic/live/advanced. Prints compact: AIO?, features, top-5 domains.
"""
from __future__ import annotations

import base64
import re
from pathlib import Path
from urllib.parse import urlparse

import httpx

HERE = Path(__file__).parent
TERMS = [
    "invoice factoring", "invoice finance", "unsecured business loan", "asset finance",
    "bridging loan", "commercial mortgage", "development finance",
    "capital allowances", "research and development tax relief", "land remediation relief",
    "employee ownership trust", "management buyout", "how to value a business",
    "sell my business",
]


def load_env():
    login = pw = ""
    for ln in (HERE.parents[1] / ".env").read_text(encoding="utf-8").splitlines():
        if ln.startswith("DATAFORSEO_API_LOGIN="):
            login = ln.split("=", 1)[1].strip()
        elif ln.startswith("DATAFORSEO_API_PASSWORD="):
            pw = ln.split("=", 1)[1].strip()
    return login, pw


def serp(term):
    login, pw = load_env()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    r = httpx.post("https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
                   headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
                   json=[{"keyword": term, "location_code": 2826, "language_code": "en", "depth": 10}],
                   timeout=120.0)
    r.raise_for_status()
    return r.json()


def dom(url):
    try:
        return urlparse(url).netloc.replace("www.", "")
    except Exception:  # noqa: BLE001
        return "?"


def main():
    print(f"{'term':<34}{'AIO':>4}{'features':<26}{'top organic domains'}")
    print("-" * 110)
    total_cost = 0.0
    for t in TERMS:
        body = serp(t)
        total_cost += body.get("cost", 0) or 0
        items = []
        for task in body.get("tasks", []) or []:
            for res in task.get("result", []) or []:
                items = res.get("items", []) or []
        types = [it.get("type") for it in items]
        aio = "YES" if "ai_overview" in types else "-"
        feats = ",".join(sorted({x for x in types if x in
                 ("featured_snippet", "people_also_ask", "paid", "local_pack", "knowledge_graph")}))
        orgs = [dom(it.get("url", "")) for it in items if it.get("type") == "organic"][:5]
        print(f"{t:<34}{aio:>4} {feats:<26}{'  '.join(orgs)}")
    print(f"\nSERP cost ${total_cost:.4f}")


if __name__ == "__main__":
    main()
