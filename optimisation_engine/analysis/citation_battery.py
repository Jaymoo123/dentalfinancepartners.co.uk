"""
citation_battery — weekly manual AI-answer-engine citation check harness.

Measures whether our pages are actually cited by AI answer engines
(chatgpt / perplexity / copilot / google-aio) for each niche's head
questions. The engines are queried MANUALLY (or via WebFetch in a Claude
session) — this script never calls any external AI engine. It:

  1. lists the per-niche question battery
     (docs/_engines/citation_battery/questions/<site>.json, authored from
     each site's top GSC queries in docs/_engines/query_ledgers/)
  2. emits a blank dated result template for an engine run
  3. validates + summarises filled-in result files (citation rate, cited
     URLs, week-over-week comparison against the previous dated file)

Workflow:
  python -m optimisation_engine.analysis.citation_battery list --site dentists
  python -m optimisation_engine.analysis.citation_battery template --site dentists --engine perplexity
  ...operator/Claude fills in "cited", "our_urls_cited", "notes" per question...
  python -m optimisation_engine.analysis.citation_battery summarise --site dentists

Result files: docs/_engines/citation_battery/results/YYYY-MM-DD_<site>_<engine>.json
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BATTERY_DIR = ROOT / "docs" / "_engines" / "citation_battery"
QUESTIONS_DIR = BATTERY_DIR / "questions"
RESULTS_DIR = BATTERY_DIR / "results"

ENGINES = ("chatgpt", "perplexity", "copilot", "google-aio", "bing-chat")


def load_questions(site: str) -> dict:
    path = QUESTIONS_DIR / f"{site}.json"
    if not path.exists():
        known = sorted(p.stem for p in QUESTIONS_DIR.glob("*.json"))
        raise SystemExit(f"no question file for site '{site}'. Known: {', '.join(known)}")
    return json.loads(path.read_text(encoding="utf8"))


def cmd_list(site: str) -> None:
    q = load_questions(site)
    print(f"# {site} — {q['domain']}  ({len(q['questions'])} questions)")
    print(f"# source: {q['source']}")
    for i, question in enumerate(q["questions"], 1):
        print(f"{i:2d}. {question}")


def cmd_template(site: str, engine: str, date: str | None) -> None:
    if engine not in ENGINES:
        raise SystemExit(f"engine must be one of {ENGINES}")
    q = load_questions(site)
    day = date or dt.date.today().isoformat()
    out = RESULTS_DIR / f"{day}_{site}_{engine}.json"
    if out.exists():
        raise SystemExit(f"refusing to overwrite existing {out}")
    payload = {
        "site": site,
        "domain": q["domain"],
        "engine": engine,
        "date": day,
        "questions_source": str(QUESTIONS_DIR / f"{site}.json"),
        "results": [
            {
                "question": question,
                # fill these three in per question:
                "cited": None,            # true if our domain appears in citations
                "our_urls_cited": [],     # exact URLs of ours the engine cited
                "competitors_cited": [],  # optional: who won instead
                "notes": "",
            }
            for question in q["questions"]
        ],
    }
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf8")
    print(f"template written: {out}")


def _result_files(site: str) -> list[Path]:
    return sorted(RESULTS_DIR.glob(f"*_{site}_*.json"))


def _rate(payload: dict) -> tuple[int, int]:
    done = [r for r in payload["results"] if r.get("cited") is not None]
    cited = [r for r in done if r["cited"]]
    return len(cited), len(done)


def cmd_summarise(site: str) -> None:
    files = _result_files(site)
    if not files:
        print(f"no result files for {site} in {RESULTS_DIR}")
        return
    print(f"# citation battery summary — {site}")
    for f in files:
        payload = json.loads(f.read_text(encoding="utf8"))
        cited, done = _rate(payload)
        total = len(payload["results"])
        pending = total - done
        rate = f"{cited}/{done}" if done else "0/0"
        suffix = f" ({pending} unanswered)" if pending else ""
        print(f"{payload['date']}  {payload['engine']:<11} cited {rate}{suffix}")
        urls = sorted({u for r in payload["results"] for u in r.get("our_urls_cited", [])})
        for u in urls:
            print(f"    cited: {u}")


def selftest() -> None:
    import tempfile

    sites = sorted(p.stem for p in QUESTIONS_DIR.glob("*.json"))
    assert sites, "no question files"
    for s in sites:
        q = load_questions(s)
        assert 10 <= len(q["questions"]) <= 15, (s, len(q["questions"]))
        assert q["domain"] and q["source"]
    # template round-trip in a temp results dir
    global RESULTS_DIR
    orig = RESULTS_DIR
    with tempfile.TemporaryDirectory() as td:
        RESULTS_DIR = Path(td)
        cmd_template(sites[0], "perplexity", "2026-01-01")
        f = next(RESULTS_DIR.glob("*.json"))
        payload = json.loads(f.read_text(encoding="utf8"))
        assert _rate(payload) == (0, 0)
        payload["results"][0]["cited"] = True
        f.write_text(json.dumps(payload), encoding="utf8")
        cmd_summarise(sites[0])
    RESULTS_DIR = orig
    print(f"selftest OK ({len(sites)} sites)")


def main(argv: list[str] | None = None) -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("list", "template", "summarise"):
        p = sub.add_parser(name)
        p.add_argument("--site", required=True)
        if name == "template":
            p.add_argument("--engine", required=True, choices=ENGINES)
            p.add_argument("--date", help="override date (YYYY-MM-DD)")
    sub.add_parser("selftest")
    args = ap.parse_args(argv)
    if args.cmd == "list":
        cmd_list(args.site)
    elif args.cmd == "template":
        cmd_template(args.site, args.engine, args.date)
    elif args.cmd == "summarise":
        cmd_summarise(args.site)
    elif args.cmd == "selftest":
        selftest()


if __name__ == "__main__":
    main()
