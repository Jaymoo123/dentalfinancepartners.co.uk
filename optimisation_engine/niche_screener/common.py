"""
Shared foundations for the niche screener + opportunity discovery generators.

Design contract (all modules code against this):

Directory layout (all under this package dir):
  specs/<niche>.json          - niche spec (input)
  cache/<run_id>/<niche>/     - raw API responses per stage, JSON
      universe.json           - stage 1: query universe + intent split
      volumes.json            - stage 1: per-query volume/cpc data
      serps.json              - stage 2: sampled SERPs (organic + AIO flags)
      classify.json           - stage 2: per-domain classifications
      gates.json              - gate results G0-G4
      score.json              - stage 2 component scores
      manifest.json           - provenance (always written last)
  candidates/<candidate_id>.json  - discovery-generator output records
  out/                        - human-readable dossiers + league tables

Niche spec (JSON):
  {
    "name": "wills-probate",                  # slug, required
    "vertical": "Wills, probate & estate planning",
    "provider_terms": ["solicitor", "will writer", "probate specialist"],  # required
    "pain_seeds": ["probate cost", "inheritance tax", ...],                # required
    "regulatory_gate": "none" | "IAR" | "banned" | "unknown",              # required (G0)
    "accounting_adjacent": false,
    "seed_evidence": ["url or note per seed"],  # where seeds came from (anti self-grading)
    "buyer_sic_codes": ["69102"]                # optional, Companies House G1 check
  }

Candidate record (discovery generators -> triage -> spec):
  {
    "candidate_id": "probate-diy-2026-08",
    "vertical": "...", "generator": "lead-market|reg-churn|high-cpc|complaint|analogy",
    "evidence": [{"type": "serp|consultation|forum|cpc|analogy", "url": "...",
                  "excerpt": "...", "metric": {}}],
    "seed_queries": [...],                    # extracted from evidence, never authored
    "buyer_hypothesis": {"who": "...", "proof": "..."},
    "event_hypothesis": {"what": "...", "date": "...", "source": "..."},
    "regulatory_gate": "none|IAR|banned|unknown",
    "accounting_adjacent": false
  }

NULL discipline: a component that lacks data sets {"is_null": true} and the total
is reported as a [min, max] range - never a silent midpoint.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

PKG_DIR = Path(__file__).resolve().parent
ROOT = PKG_DIR.parents[1]
SPECS_DIR = PKG_DIR / "specs"
CACHE_DIR = PKG_DIR / "cache"
CANDIDATES_DIR = PKG_DIR / "candidates"
OUT_DIR = PKG_DIR / "out"

RUBRIC_VERSION = "2.0"

# Component weights (Stage 2). AIO is a penalty component: 0 to -10.
WEIGHTS = {
    "diy_pain_demand": 25,
    "longtail_winnability": 25,
    "rule_churn": 15,
    "calculator_demand": 10,
    "buyer_market_depth": 10,
    "aio_exposure": -10,  # penalty: contributes 0 (no AIO) .. -10 (saturated)
    "new_domain_viability": 5,
}

# Generic, domain-neutral DIY intent patterns (question/task/tool frames).
DIY_PATTERNS = re.compile(
    r"\b(how|what|when|why|which|can i|do i|does|should i|is it|am i"
    r"|calculator|checker|check|work out|worked out|guide|rules|rule"
    r"|cost of|how much|deadline|penalty|fine|allowance|threshold|rate|rates"
    r"|claim|apply|form|template|example|steps|process|myself|diy|without a)\b"
)

# Urgency/desperation frames (bonus inside diy_pain_demand).
URGENCY_PATTERNS = re.compile(
    r"\b(deadline|penalty|fine|urgent|letter|court|eviction|bailiff|missed"
    r"|late|overdue|what happens if|can they|enforcement|summons|debt)\b"
)


def delegation_pattern(provider_terms: list[str]) -> re.Pattern:
    """Build the delegation-intent regex from the spec's provider terms."""
    terms = sorted({t.strip().lower() for t in provider_terms if t.strip()}, key=len, reverse=True)
    if not terms:
        raise ValueError("spec.provider_terms is empty")
    alt = "|".join(re.escape(t) for t in terms)
    return re.compile(rf"\b({alt})s?\b")


def classify_intent(query: str, deleg: re.Pattern) -> str:
    q = query.lower()
    if deleg.search(q):
        return "DELEGATION"
    if DIY_PATTERNS.search(q):
        return "DIY"
    return "OTHER"


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    if not s:
        raise ValueError(f"unslugifiable name: {name!r}")
    return s


def new_run_id() -> str:
    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    salt = hashlib.sha1(os.urandom(8)).hexdigest()[:6]
    return f"run_{ts}_{salt}"


def load_spec(path: str | Path) -> dict:
    spec = json.loads(Path(path).read_text(encoding="utf-8"))
    for field in ("name", "provider_terms", "pain_seeds", "regulatory_gate"):
        if not spec.get(field):
            raise ValueError(f"spec {path}: missing required field {field!r}")
    if spec["regulatory_gate"] not in ("none", "IAR", "banned", "unknown"):
        raise ValueError(f"spec {path}: bad regulatory_gate {spec['regulatory_gate']!r}")
    spec["name"] = slugify(spec["name"])
    return spec


def run_dir(run_id: str, niche: str) -> Path:
    d = CACHE_DIR / run_id / niche
    d.mkdir(parents=True, exist_ok=True)
    return d


def cache_put(run_id: str, niche: str, stage: str, data: Any) -> Path:
    p = run_dir(run_id, niche) / f"{stage}.json"
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=str), encoding="utf-8")
    return p


def cache_get(run_id: str, niche: str, stage: str) -> Any | None:
    p = CACHE_DIR / run_id / niche / f"{stage}.json"
    if not p.exists():
        return None
    return json.loads(p.read_text(encoding="utf-8"))


def git_hash() -> str:
    try:
        return subprocess.run(
            ["git", "rev-parse", "HEAD"], cwd=ROOT, capture_output=True, text=True, timeout=10
        ).stdout.strip() or "unknown"
    except Exception:
        return "unknown"


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else "absent"


def write_manifest(run_id: str, niche: str, extra: dict) -> Path:
    """Always the last stage file written. `extra` carries stage summaries,
    tripwire results, call counts and USD (caller pulls from api_cost_log)."""
    manifest = {
        "run_id": run_id,
        "niche": niche,
        "utc": datetime.now(timezone.utc).isoformat(),
        "git_hash": git_hash(),
        "rubric_version": RUBRIC_VERSION,
        **extra,
    }
    return cache_put(run_id, niche, "manifest", manifest)


def domain_of(url: str) -> str:
    if not url:
        return ""
    s = url.lower()
    for p in ("https://", "http://"):
        if s.startswith(p):
            s = s[len(p):]
    if s.startswith("www."):
        s = s[4:]
    return s.split("/", 1)[0].split(":", 1)[0]


if __name__ == "__main__":
    deleg = delegation_pattern(["solicitor", "will writer"])
    assert classify_intent("probate solicitor near me", deleg) == "DELEGATION"
    assert classify_intent("how much does probate cost", deleg) == "DIY"
    assert classify_intent("probate registry address", deleg) == "OTHER"
    assert slugify("Wills, Probate & IHT") == "wills-probate-iht"
    rid = new_run_id()
    assert rid.startswith("run_") and len(rid) > 20
    print("common.py self-check OK")
