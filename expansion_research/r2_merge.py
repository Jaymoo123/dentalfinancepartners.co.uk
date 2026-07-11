"""Merge classified batches -> r2_serp_composition.json + verdict metrics."""
from __future__ import annotations

import json
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).parent
BATCHES = 8
VALID = {"SPECIALIST", "GENERALIST", "DIRECTORY", "INFO", "OWN-ESTATE"}


def main() -> None:
    merged: dict = {}
    for b in range(1, BATCHES + 1):
        p = HERE / f"r2_class_batch_{b}_output.json"
        merged.update(json.loads(p.read_text(encoding="utf-8")))

    # hard assert: re-check own-estate against exclusion list (never trust LLM)
    ex = json.loads((HERE / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    estate = {d.removeprefix("www.") for s in ex["sites"].values() for d in s["domains"]}

    summary = {}
    for n, entry in merged.items():
        spec_counts = []
        dir_counts = []
        estate_hits = []
        spec_positions = defaultdict(list)  # specialist domain -> positions
        for q, rows in entry["queries"].items():
            for r in rows:
                d = r["domain"].removeprefix("www.")
                if d in estate:
                    r["class"] = "OWN-ESTATE"
                    estate_hits.append({"query": q, "domain": r["domain"], "position": r["position"]})
                assert r["class"] in VALID, (n, q, r)
            spec = [r for r in rows if r["class"] == "SPECIALIST"]
            spec_counts.append(len(spec))
            dir_counts.append(sum(1 for r in rows if r["class"] == "DIRECTORY"))
            for r in spec:
                spec_positions[r["domain"].removeprefix("www.")].append(r["position"])
        nq = len(entry["queries"]) or 1
        spec_avg = round(sum(spec_counts) / nq, 1)
        dir_avg = round(sum(dir_counts) / nq, 1)
        # dominant specialist = appears in >=2 variants with a top-3 position
        dominant = [d for d, ps in spec_positions.items()
                    if len(ps) >= 2 and min(ps) <= 3]
        if spec_avg < 0.5:
            verdict = "NO_SPECIALISTS"
        elif spec_avg < 2 and not dominant:
            verdict = "WEAK_FIELD"
        elif spec_avg >= 4 or (dominant and spec_avg >= 3):
            verdict = "STRONG_SPECIALISTS"
        else:
            verdict = "CONTESTED"
        top_specs = [d for d, _ in Counter(
            {d: len(ps) * 100 - min(ps) for d, ps in spec_positions.items()}
        ).most_common(4)]
        summary[n] = {
            "niche": entry["niche"],
            "variants": list(entry["queries"].keys()),
            "specialist_avg_top10": spec_avg,
            "directory_avg_top10": dir_avg,
            "dominant_specialists": dominant,
            "top_specialist_domains": top_specs,
            "own_estate_hits": estate_hits,
            "verdict": verdict,
        }
        entry["summary"] = summary[n]

    (HERE / "r2_serp_composition.json").write_text(
        json.dumps(merged, indent=1, ensure_ascii=False), encoding="utf-8")
    (HERE / "r2_summary.json").write_text(
        json.dumps(summary, indent=1, ensure_ascii=False), encoding="utf-8")
    print("niches:", len(summary))
    print(Counter(s["verdict"] for s in summary.values()))
    hits = [(n, h) for n, s in summary.items() for h in s["own_estate_hits"]]
    print("own-estate hits:", len(hits))
    for n, h in hits:
        print(" ", n, summary[n]["niche"], h)


if __name__ == "__main__":
    main()
