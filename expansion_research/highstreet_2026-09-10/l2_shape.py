"""High-street map, Legs 2 and 3: demand shape and difficulty per niche. FREE (reads leg 1 raw).

The leg-1 corpus already carries search volume, the 12-month arrays, CPC, competition
and keyword difficulty, so no further paid call is needed for either leg.

What this computes per niche, and why each number is here:

  kept            keywords that survive the relevance gate. A raw keyword_ideas pull
                  drifts (a launderette pull returns "professional washing machine
                  cleaner"), so drift is stripped before anything is counted.
  vol_dedup       total monthly volume after close-variant collapse. Google reports ONE
                  volume for a whole close-variant group and repeats it on every
                  phrasing, so summing phrasings multiplies demand that exists once.
                  Detection is the C3 rule: byte-identical 12-month arrays, volume > 0.
  vol_hire        the slice with hire intent ("X accountant"). This is the lead demand.
  vol_info        the slice with informational intent (the tax mechanic). This is the
                  GEO and citation demand, and it is usually the larger half.
  n_subclusters   distinct sub-intents with real volume, grouped on DataForSEO's own
                  core_keyword. THIS is the number that decides page count.
  kd_head         median keyword difficulty of the top ten by volume.

Writes shape.json.
"""
from __future__ import annotations

import csv
import json
import re
import statistics
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).parent
CORPUS = HERE / "raw" / "corpus"

HIRE_RE = re.compile(
    r"\baccountant|\baccountants|\baccountancy|book-?keep|tax adviser|tax advisor|"
    r"tax specialist|specialist accountant|near me|\bfirm\b|\bagent\b", re.I)

# Drift that is never ours whatever else the keyword says.
JUNK_RE = re.compile(
    r"\bjobs?\b|salary|salaries|vacanc|career|hiring|apprentice|\bcourse\b|degree|"
    r"diploma|qualification|\bnz\b|australia|\bcanada\b|\busa\b|american|india|dubai|"
    r"singapore|\bireland\b|philippines|login|sign in|software|quickbooks|\bxero\b|"
    r"\bsage\b|freshbooks|template|excel|for sale|\bbuy\b.*\bonline\b", re.I)

TAX_RE = re.compile(
    r"\btax|\bvat\b|hmrc|accounts?\b|accounting|accountant|duty|duties|relief|"
    r"allowance|expense|deduct|payroll|paye|\bnic\b|self assessment|bookkeep|"
    r"invoice|profit|turnover|threshold|scheme|capital allowance|\bcis\b|"
    r"corporation|dividend|ir35|margin|exempt|zero rated|rated|return", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "uk", "your"}


def toks(s: str) -> list[str]:
    return [t for t in re.findall(r"[a-z]+", s.lower()) if t not in STOP and len(t) > 1]


def variants(word: str) -> set[str]:
    out = {word}
    if word.endswith("y"):
        out.add(word[:-1] + "ies")
    if word.endswith("s"):
        out.add(word[:-1])
    else:
        out.add(word + "s")
        out.add(word + "es")
    return out


def rows_from(path: Path) -> tuple[dict, list[dict]]:
    d = json.loads(path.read_text(encoding="utf-8"))
    res = d["body"]["tasks"][0].get("result") or [{}]
    items = (res[0] or {}).get("items") or []
    out = []
    for it in items:
        ki = it.get("keyword_info") or {}
        kp = it.get("keyword_properties") or {}
        out.append({
            "kw": it.get("keyword") or "",
            "vol": ki.get("search_volume") or 0,
            "cpc": ki.get("cpc"),
            "comp": ki.get("competition"),
            "kd": kp.get("keyword_difficulty"),
            "core": kp.get("core_keyword") or it.get("keyword") or "",
            "ms": ki.get("monthly_searches") or [],
        })
    return d["niche"], out


def relevant(kw: str, trade: set[str], mech: set[str]) -> bool:
    if JUNK_RE.search(kw):
        return False
    t = set(toks(kw))
    trade_hit = bool(t & trade)
    if trade_hit and TAX_RE.search(kw):
        return True
    # mechanic-family terms carry the niche without naming the trade
    return len(t & mech) >= 2


def ms_key(ms: list[dict]) -> str:
    return json.dumps(
        [(m.get("year"), m.get("month"), m.get("search_volume")) for m in ms],
        sort_keys=True)


def dedup_volume(rows: list[dict]) -> tuple[int, list[dict]]:
    """C3 close-variant rule: byte-identical 12-month arrays with volume > 0 are one
    group contributing its volume once. Null or zero volume is never grouped."""
    seen: set[str] = set()
    total = 0
    keep: list[dict] = []
    for r in sorted(rows, key=lambda x: -(x["vol"] or 0)):
        if not r["vol"]:
            keep.append(r)
            continue
        k = ms_key(r["ms"])
        if k in seen:
            continue
        seen.add(k)
        total += r["vol"]
        keep.append(r)
    return total, keep


def main() -> None:
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        spec = {n["id"]: n for n in csv.DictReader(f, delimiter="\t")}

    out: dict[str, dict] = {}
    for path in sorted(CORPUS.glob("*.json"), key=lambda p: int(p.stem)):
        niche, rows = rows_from(path)
        n = spec[niche["id"]]
        trade: set[str] = set()
        for w in toks(n["seed_core"]):
            trade |= variants(w)
        mech = set(toks(n["mechanic_seed"]))

        kept = [r for r in rows if relevant(r["kw"], trade, mech)]
        vol_all, deduped = dedup_volume(kept)

        hire = [r for r in deduped if HIRE_RE.search(r["kw"])]
        info = [r for r in deduped if not HIRE_RE.search(r["kw"])]

        clusters: dict[str, int] = defaultdict(int)
        for r in deduped:
            if r["vol"]:
                clusters[r["core"]] += r["vol"]
        live_clusters = {c: v for c, v in clusters.items() if v > 0}

        head = sorted([r for r in deduped if r["vol"]], key=lambda x: -x["vol"])[:10]
        kds = [r["kd"] for r in head if r["kd"] is not None]

        out[niche["id"]] = {
            "name": n["name"],
            "category": n["category"],
            "status": n["status"],
            "raw_kw": len(rows),
            "kept": len(kept),
            "vol_dedup": vol_all,
            "vol_hire": sum(r["vol"] or 0 for r in hire),
            "vol_info": sum(r["vol"] or 0 for r in info),
            "n_subclusters": len(live_clusters),
            "kd_head": round(statistics.median(kds), 1) if kds else None,
            "cpc_head": round(statistics.median(
                [r["cpc"] for r in head if r["cpc"]]), 2) if any(
                r["cpc"] for r in head) else None,
            "top": [{"kw": r["kw"], "vol": r["vol"], "kd": r["kd"]} for r in head],
            "clusters": sorted(live_clusters.items(), key=lambda kv: -kv[1])[:25],
        }

    (HERE / "shape.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"wrote shape.json for {len(out)} niches")
    zero = [v["name"] for v in out.values() if v["vol_dedup"] == 0]
    print(f"zero measured demand: {len(zero)}")


if __name__ == "__main__":
    main()
