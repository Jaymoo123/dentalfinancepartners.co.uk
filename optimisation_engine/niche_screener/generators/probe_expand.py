"""
Discovery Generator 1b: probe-list expansion from known lead sellers.

The lead-market generator starts from a hand-written VERTICAL_PROBES list (63
phrases). That list, not the opportunity space, is what "funnel exhausted"
actually described. This generator replaces the typing with mining: the
July sweep already collected ~274 domains that demonstrably sell UK leads,
and those vendors enumerate their own verticals on their own pages
("Solar leads", "Conveyancing leads", "Boiler leads"). Harvesting that
vocabulary yields verticals with a proven per-lead buyer BY CONSTRUCTION,
which is exactly what G1 tests for later.

Emits a review list only. It never spends SERP quota and never writes
candidate files: feed approved verticals to lead_market.mine(verticals=[...]).

Run (free, fetches public vendor pages, throttled):
  python -m optimisation_engine.niche_screener.generators.probe_expand [--limit N]

Self-check (no network):
  python -m optimisation_engine.niche_screener.generators.probe_expand --selfcheck
"""
from __future__ import annotations

import argparse
import collections
import glob
import json
import re
import time
from pathlib import Path

import httpx

from optimisation_engine.niche_screener import common
from optimisation_engine.niche_screener.generators.lead_market import VERTICAL_PROBES

OUT_PATH = common.PKG_DIR / "out" / "PROBE_EXPANSION.md"
RAW_PATH = common.PKG_DIR / "out" / "probe_expansion_raw.json"
CANDIDATE_GLOB = str(common.PKG_DIR / "candidates" / "*.json")

# Vendors reached via these are marketplaces/social, not vertical lists.
SKIP_DOMAINS = {
    "youtube.com", "reddit.com", "facebook.com", "instagram.com", "linkedin.com",
    "twitter.com", "x.com", "tiktok.com", "quora.com", "medium.com", "wikipedia.org",
}
# Pages where lead vendors list the verticals they serve.
PATHS = ["", "/industries", "/sectors", "/verticals", "/niches", "/lead-generation", "/leads"]

# "Solar panel leads", "Conveyancing Leads" -> capture the noun phrase before "leads".
VERTICAL_RE = re.compile(r"\b([A-Za-z][A-Za-z&'/ ]{2,34}?)\s+leads\b", re.IGNORECASE)
TAG_RE = re.compile(r"<(script|style)[^>]*>.*?</\1>|<[^>]+>", re.DOTALL | re.IGNORECASE)

# Words that make a capture a sentence fragment rather than a vertical.
STOPWORDS = {
    "the", "our", "your", "their", "his", "her", "its", "these", "those", "this", "that",
    "we", "you", "they", "it", "he", "she", "i",
    "of", "for", "with", "and", "or", "but", "to", "in", "on", "at", "by", "from",
    "more", "most", "many", "some", "all", "any", "no", "not", "new", "free", "best",
    "get", "buy", "sell", "sold", "generate", "generating", "generated", "buying",
    "selling", "quality", "exclusive", "verified", "qualified", "warm", "hot", "live",
    "uk", "usa", "us", "local", "national", "online", "digital", "b2b", "b2c",
    "lead", "leads", "generation", "marketing", "agency", "company", "service",
    "services", "price", "prices", "pricing", "cost", "costs", "per", "each", "month",
    "day", "week", "year", "are", "is", "was", "were", "be", "been", "have", "has",
    "had", "do", "does", "did", "can", "will", "would", "should", "could", "may",
    "much", "how", "what", "why", "when", "where", "who", "which",
    # Marketing prose that survives the first pass as bare content words:
    # "intent leads", "ready leads", "converting leads", "cold leads".
    "intent", "ready", "convert", "converting", "converted", "shared", "based",
    "cold", "warm", "inbound", "outbound", "receive", "receiving", "time",
    "real", "high", "low", "top", "great", "good", "better", "bad", "cheap",
    "targeted", "custom", "bespoke", "premium", "guaranteed", "unlimited",
    "sales", "business", "client", "clients", "customer", "customers",
    "prospect", "prospects", "enquiry", "enquiries", "appointment",
    "appointments", "data", "call", "calls", "form", "email", "website",
    "traffic", "campaign", "campaigns", "seo", "ppc", "google", "facebook",
}
# ponytail: a phrase is a vertical if its FIRST and LAST word are both content
# words. Kills "buy solar leads" (first word stop) and "leads for the" without
# needing a parser.


def clean_text(html: str) -> str:
    return re.sub(r"\s+", " ", TAG_RE.sub(" ", html))


def normalise(phrase: str) -> str | None:
    """Return a canonical vertical phrase, or None if it is not one."""
    words = re.sub(r"[^a-z& ]", " ", phrase.lower()).split()
    while words and words[0] in STOPWORDS:
        words.pop(0)
    if not (2 <= len(" ".join(words)) <= 34) or not words:
        return None
    if len(words) > 4 or words[0] in STOPWORDS or words[-1] in STOPWORDS:
        return None
    return " ".join(words)


def raw_captures(text: str) -> set[str]:
    """Pre-normalisation regex hits. Cached, so filter tuning costs no fetches."""
    return {m.group(1) for m in VERTICAL_RE.finditer(text)}


def extract_verticals(text: str) -> set[str]:
    out = set()
    for cap in raw_captures(text):
        norm = normalise(cap)
        if norm:
            out.add(norm)
    return out


def build_found(raw: dict[str, list[str]]) -> dict[str, set[str]]:
    """{domain: [raw captures]} -> {vertical: {domains}}."""
    found: dict[str, set[str]] = collections.defaultdict(set)
    for dom, caps in raw.items():
        for cap in caps:
            norm = normalise(cap)
            if norm:
                found[norm].add(dom)
    return found


def seller_domains(min_hits: int = 2) -> list[str]:
    """Domains from existing candidate evidence, most-cited first."""
    counts: collections.Counter = collections.Counter()
    for path in glob.glob(CANDIDATE_GLOB):
        data = json.loads(Path(path).read_text(encoding="utf-8"))
        for ev in data.get("evidence", []):
            dom = common.domain_of(ev.get("url") or "")
            if dom and dom not in SKIP_DOMAINS:
                counts[dom] += 1
    return [d for d, n in counts.most_common() if n >= min_hits]


def known_verticals() -> set[str]:
    """Everything already probed or already a candidate."""
    known = {common.slugify(v) for v, _ in VERTICAL_PROBES}
    for path in glob.glob(CANDIDATE_GLOB):
        data = json.loads(Path(path).read_text(encoding="utf-8"))
        known.add(common.slugify(data.get("vertical", "")))
    return known


def harvest(domains: list[str], *, delay: float = 1.0) -> dict[str, list[str]]:
    """{domain: [raw captures]}. Failures are skipped, not fatal."""
    raw: dict[str, set[str]] = collections.defaultdict(set)
    with httpx.Client(
        timeout=15.0, follow_redirects=True,
        headers={"User-Agent": "Mozilla/5.0 (compatible; niche-screener/1.0)"},
    ) as client:
        for dom in domains:
            for path in PATHS:
                try:
                    resp = client.get(f"https://{dom}{path}")
                    if resp.status_code != 200:
                        continue
                    raw[dom] |= raw_captures(clean_text(resp.text))
                except Exception:
                    continue
                finally:
                    time.sleep(delay)
    return {d: sorted(c) for d, c in raw.items()}


def report(found: dict[str, set[str]], known: set[str]) -> str:
    rows = sorted(
        ((v, ds) for v, ds in found.items() if common.slugify(v) not in known),
        key=lambda r: (-len(r[1]), r[0]),
    )
    lines = [
        "# Probe expansion (lead-vendor vertical harvest)",
        "",
        f"Harvested {len(found)} distinct vertical phrases; {len(rows)} are NEW "
        f"(not in VERTICAL_PROBES and not an existing candidate).",
        "Multi-vendor phrases are the strong signals: independent vendors naming",
        "the same vertical is the same evidence G1 tests for.",
        "",
        "| Vertical | Vendors naming it | Domains |",
        "|---|---:|---|",
    ]
    lines += [f"| {v} | {len(ds)} | {', '.join(sorted(ds)[:5])} |" for v, ds in rows]
    return "\n".join(lines) + "\n"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=40, help="max vendor domains to fetch")
    ap.add_argument("--min-hits", type=int, default=2)
    ap.add_argument("--selfcheck", action="store_true")
    ap.add_argument("--from-cache", action="store_true",
                    help="re-filter the cached raw pull instead of re-fetching")
    args = ap.parse_args()

    if args.selfcheck:
        assert normalise("Solar Panel") == "solar panel"
        assert normalise("buy solar") == "solar"          # leading stopword stripped
        assert normalise("for the") is None               # all stopwords
        assert normalise("a b c d e f") is None           # too many words
        assert normalise("quality") is None               # bare stopword
        text = clean_text("<p>Solar Panel Leads</p><script>x leads</script> and Boiler leads!")
        assert "x" not in extract_verticals(text), "script content must be stripped"
        assert {"solar panel", "boiler"} <= extract_verticals(text)
        assert extract_verticals("we sell leads") == set()
        print("probe_expand.py self-check OK")
        return

    if args.from_cache:
        raw = json.loads(RAW_PATH.read_text(encoding="utf-8"))
    else:
        domains = seller_domains(args.min_hits)[: args.limit]
        print(f"fetching {len(domains)} vendor domains x {len(PATHS)} paths")
        raw = harvest(domains)
        RAW_PATH.write_text(json.dumps(raw, indent=1), encoding="utf-8")

    found = build_found(raw)
    OUT_PATH.write_text(report(found, known_verticals()), encoding="utf-8")
    print(f"wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
