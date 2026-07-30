"""Stage 2: Google Ads search volumes for the curated seed set + slug-derived
candidate phrases mined from competitor sitemaps. Writes volumes.csv (+ raw json).

Cheap: keywords_data/google_ads/search_volume, batched <=500, UK/en.
"""
from __future__ import annotations

import base64
import csv
import json
import os
import re
from pathlib import Path

import httpx

import seeds as SEEDS

HERE = Path(__file__).parent
SITE_KEY = "dental_finance"

# Direct DataForSEO call — bypasses the shared CostTracker/Supabase audit layer
# (409-prone for one-off research site_keys). Creds already smoke-tested; balance $34.
DFS_LOGIN = os.environ.get("DATAFORSEO_API_LOGIN") or ""
DFS_PASSWORD = os.environ.get("DATAFORSEO_API_PASSWORD") or ""


def _load_env() -> None:
    global DFS_LOGIN, DFS_PASSWORD
    if DFS_LOGIN and DFS_PASSWORD:
        return
    envp = Path("C:/Users/user/Documents/Accounting/.env")
    for line in envp.read_text(encoding="utf-8").splitlines():
        if line.startswith("DATAFORSEO_API_LOGIN="):
            DFS_LOGIN = line.split("=", 1)[1].strip()
        elif line.startswith("DATAFORSEO_API_PASSWORD="):
            DFS_PASSWORD = line.split("=", 1)[1].strip()


def dfs_search_volume(keywords: list[str]) -> dict:
    _load_env()
    tok = base64.b64encode(f"{DFS_LOGIN}:{DFS_PASSWORD}".encode()).decode()
    r = httpx.post(
        "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
        headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
        json=[{"keywords": keywords, "location_code": 2826, "language_code": "en"}],
        timeout=120.0,
    )
    r.raise_for_status()
    return r.json()

# Slug tokens that mark a competitor URL as dental-finance relevant.
RELEVANT = re.compile(
    r"dental|dentist|practice|goodwill|surgery|squat|associate|orthodont|"
    r"chair|cbct|scanner|equipment|finance|loan|mortgage|lease|leasing|"
    r"valuation|protection|locum|income-protection|acquisition|refinance",
    re.I,
)
STOP = re.compile(r"\b(blog|news|author|category|tag|page|privacy|cookie|terms|contact|about|team|careers)\b", re.I)
_ADS_RE = re.compile(r"[^a-z0-9 ']")


def slug_to_phrase(url: str) -> str | None:
    slug = url.rstrip("/").rsplit("/", 1)[-1]
    if not slug or STOP.search(url):
        return None
    phrase = _ADS_RE.sub(" ", slug.replace("-", " ").replace("_", " ").lower())
    phrase = " ".join(phrase.split())
    if not phrase or len(phrase) > 80 or len(phrase.split()) > 10 or len(phrase.split()) < 2:
        return None
    return phrase


def slug_candidates() -> set[str]:
    p = HERE / "raw" / "rival_sitemaps.json"
    if not p.exists():
        return set()
    data = json.loads(p.read_text(encoding="utf-8"))
    out: set[str] = set()
    for rec in data.values():
        for u in rec.get("urls", []):
            if RELEVANT.search(u):
                ph = slug_to_phrase(u)
                if ph:
                    out.add(ph)
    return out


def parse(resp: dict) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for task in resp.get("tasks", []) or []:
        if task.get("status_code") != 20000:
            raise RuntimeError(f"task error {task.get('status_code')}: {task.get('status_message')}")
        for item in task.get("result", []) or []:
            kw = (item.get("keyword") or "").strip().lower()
            if kw:
                out[kw] = {"sv": item.get("search_volume"), "cpc": item.get("cpc"),
                           "comp": item.get("competition")}
    return out


def main() -> None:
    curated = SEEDS.all_seeds()
    slugs = sorted(slug_candidates())
    all_kw_raw = sorted(dict.fromkeys(curated + slugs))
    # Google Ads rejects the whole task on any bad char / >80 chars / >10 words.
    sane_map: dict[str, str] = {}
    for kw in all_kw_raw:
        s = _ADS_RE.sub(" ", kw.lower())
        s = " ".join(s.split())
        if s and len(s) <= 80 and 1 <= len(s.split()) <= 10:
            sane_map.setdefault(s, kw)
    all_kw = sorted(sane_map)
    print(f"curated={len(curated)}  slug_candidates={len(slugs)}  "
          f"total_raw={len(all_kw_raw)}  sendable={len(all_kw)}")

    vols: dict[str, dict] = {}
    for i in range(0, len(all_kw), 500):
        batch = all_kw[i:i + 500]
        resp = dfs_search_volume(batch)
        (HERE / "raw").mkdir(exist_ok=True)
        (HERE / "raw" / f"volumes_raw_{i}.json").write_text(json.dumps(resp), encoding="utf-8")
        vols.update(parse(resp))

    curated_set = set(curated)
    rows = []
    for kw in all_kw:
        v = vols.get(kw, {})
        orig = sane_map[kw]
        rows.append({
            "keyword": orig,
            "search_volume": v.get("sv"),
            "cpc": v.get("cpc"),
            "competition": v.get("comp"),
            "reg": SEEDS.reg_of(orig),
            "source": "seed" if orig in curated_set else "sitemap_slug",
        })
    rows.sort(key=lambda r: (r["search_volume"] or -1), reverse=True)
    with (HERE / "volumes.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    withvol = [r for r in rows if r["search_volume"]]
    print(f"\n{len(withvol)}/{len(rows)} keywords have volume")
    print(f"UNREG total monthly volume: {sum(r['search_volume'] for r in withvol if r['reg']=='UNREG')}")
    print("\nTop 30 by volume:")
    for r in rows[:30]:
        print(f"  {r['search_volume'] or 0:>6}  [{r['reg']:>5}] {r['keyword']}")


if __name__ == "__main__":
    main()
