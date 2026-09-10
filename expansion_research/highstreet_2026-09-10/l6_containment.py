"""High-street map, Leg 6: containment + placement against our own published corpus. FREE.

Two questions per niche, both answered from files on disk, no API:

  containment - do we already publish a page that covers this trade? If yes it is an
                absorb or a deepen, never a net-new page.
  placement   - which estate site already talks about this trade most? That site is the
                natural host, ahead of the generalist catch-all.

Writes containment.json: {niche_id: {matches: [{site, slug, title, hits}], by_site: {...}}}.
"""
from __future__ import annotations

import csv
import json
import re
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "uk", "your", "you", "my", "we", "tax", "accountant", "accountants",
        "accounting", "accounts", "business", "businesses", "vat", "hmrc", "self",
        "employed", "company", "companies", "scheme", "what", "how"}

TITLE_RE = re.compile(r"^title:\s*[\"']?(.*?)[\"']?\s*$", re.M)


def tokens(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-z]+", text.lower()) if t not in STOP and len(t) > 1}


def singular(t: str) -> str:
    if t.endswith("ies") and len(t) > 4:
        return t[:-3] + "y"
    if t.endswith("ses") and len(t) > 4:
        return t[:-2]
    if t.endswith("s") and not t.endswith("ss"):
        return t[:-1]
    return t


def norm(ts: set[str]) -> set[str]:
    return {singular(t) for t in ts}


def load_corpus() -> list[dict]:
    """Every published blog post across the estate: site, slug, title."""
    out: list[dict] = []
    for blog_dir in sorted(ROOT.glob("*/web/content/blog")):
        site = blog_dir.parts[-4]
        for md in blog_dir.glob("*.md"):
            head = md.read_text(encoding="utf-8", errors="ignore")[:2000]
            m = TITLE_RE.search(head)
            title = m.group(1) if m else ""
            out.append({
                "site": site,
                "slug": md.stem,
                "title": title,
                "tokens": norm(tokens(md.stem.replace("-", " ") + " " + title)),
            })
    return out


def main() -> None:
    corpus = load_corpus()
    print(f"corpus: {len(corpus)} published posts across "
          f"{len({p['site'] for p in corpus})} sites")

    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        niches = list(csv.DictReader(f, delimiter="\t"))

    result: dict[str, dict] = {}
    for n in niches:
        # The trade noun is what identifies the niche; the mechanic is supporting
        # evidence. A page must hit the trade noun to count as containment.
        core = norm(tokens(n["seed_core"]))
        mech = norm(tokens(n["mechanic_seed"])) - core
        if not core:
            continue

        matches = []
        for p in corpus:
            core_hits = core & p["tokens"]
            if not core_hits:
                continue
            # every word of a multi-word trade name must land, or "farm shop"
            # matches every "farm" page on the estate
            if len(core_hits) < len(core):
                continue
            matches.append({
                "site": p["site"],
                "slug": p["slug"],
                "title": p["title"],
                "mech_hits": sorted(mech & p["tokens"]),
            })

        by_site = Counter(m["site"] for m in matches)
        result[n["id"]] = {
            "name": n["name"],
            "status": n["status"],
            "n_matches": len(matches),
            "by_site": dict(by_site.most_common()),
            "host_signal": by_site.most_common(1)[0][0] if by_site else None,
            "matches": matches[:25],
        }

    (HERE / "containment.json").write_text(
        json.dumps(result, indent=1), encoding="utf-8")

    covered = sum(1 for v in result.values() if v["n_matches"])
    print(f"niches with at least one existing page: {covered} of {len(result)}")
    print("wrote containment.json")


if __name__ == "__main__":
    main()
