"""Stage 4: competitor page-count topic map from harvested sitemaps.

Answers 'how many pages' by showing how many dental-relevant pages each rival
maintains, and clusters their URL paths so we can see the topic architecture
they think is worth ranking for.
"""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
DENTAL = re.compile(r"dent|orthodont|practice|surgery|goodwill|squat|associate", re.I)
FIN = re.compile(r"financ|loan|mortgage|lease|leasing|fund|acquisition|refinanc|"
                 r"asset|equipment|valuation|protection|locum|insurance|capital", re.I)


def path_bucket(url: str) -> str:
    m = re.sub(r"^https?://[^/]+", "", url).strip("/")
    seg = m.split("/")[0].lower() if m else "(root)"
    return seg or "(root)"


def main() -> None:
    data = json.loads((HERE / "raw" / "rival_sitemaps.json").read_text(encoding="utf-8"))
    print(f"{'domain':<34}{'total':>7}{'dental':>8}{'fin':>6}{'dent+fin':>9}")
    print("-" * 64)
    grand = {"total": 0, "dental": 0, "fin": 0, "both": 0}
    dental_fin_urls: list[str] = []
    for dom, rec in sorted(data.items(), key=lambda x: -x[1]["url_count"]):
        urls = rec.get("urls", [])
        dental = [u for u in urls if DENTAL.search(u)]
        fin = [u for u in urls if FIN.search(u)]
        both = [u for u in urls if DENTAL.search(u) and FIN.search(u)]
        dental_fin_urls += both
        print(f"{dom:<34}{len(urls):>7}{len(dental):>8}{len(fin):>6}{len(both):>9}")
        grand["total"] += len(urls)
        grand["dental"] += len(dental)
        grand["fin"] += len(fin)
        grand["both"] += len(both)
    print("-" * 64)
    print(f"{'TOTAL':<34}{grand['total']:>7}{grand['dental']:>8}{grand['fin']:>6}{grand['both']:>9}")

    # Dominant path buckets across all rivals (topic architecture signal)
    buckets = Counter(path_bucket(u) for recs in data.values() for u in recs.get("urls", []))
    print("\nTop URL path buckets (topic sections rivals maintain):")
    for seg, n in buckets.most_common(25):
        print(f"  {n:>5}  /{seg}/")

    # Save the dental+finance URL inventory for brief-building
    out = sorted(dict.fromkeys(dental_fin_urls))
    (HERE / "dental_finance_urls.txt").write_text("\n".join(out), encoding="utf-8")
    print(f"\n{len(out)} unique dental+finance URLs -> dental_finance_urls.txt")


if __name__ == "__main__":
    main()
