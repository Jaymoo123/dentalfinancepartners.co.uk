"""
Fact verification for LLM-generated content.

Strategy: extract specific numeric claims (amounts, rates, percentages,
thresholds) from generated content and verify them against the curated
facts_uk_2026.yaml catalogue. Two failure modes detected:

  1. WRONG_VALUE — content asserts a specific number for a known concept
     and the number doesn't match the catalogue (e.g. says "CGT basic
     rate is 20%" when it should be 18%).
  2. UNVERIFIED_NUMBER — content contains a specific number for a
     concept we DO track but the number isn't in the catalogue. Flagged
     for review but not auto-rejected (could be a legitimate worked
     example).

Use:
  result = check_content(text, strictness="strict")
  if result["wrong_value_errors"]:
      # auto-reject
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml

FACTS_PATH = Path(__file__).resolve().parent / "facts_uk_2026.yaml"


_CACHED_FACTS: list[dict] | None = None


def load_facts() -> list[dict]:
    global _CACHED_FACTS
    if _CACHED_FACTS is None:
        with open(FACTS_PATH, encoding="utf-8") as f:
            _CACHED_FACTS = yaml.safe_load(f) or []
    return _CACHED_FACTS


# --- Number extraction -------------------------------------------------------

# Match: 18%, £3,000, £12,570, 50,270, 1,000,000, £1m, £1 million, 60-day,
#        2026/27, 2026-27
_PCT = re.compile(r"\b(\d{1,3}(?:\.\d{1,3})?)\s?%")
_GBP = re.compile(r"£(\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?)(\s?(?:m|million|k))?")
_PLAIN_NUM = re.compile(r"(?<!\d)(\d{1,3}(?:,\d{3})+|\d{4,7})(?!\d)")
_DAYS = re.compile(r"\b(\d{1,3})[-\s]day\b", re.IGNORECASE)
_TAX_YEAR = re.compile(r"\b(20\d{2})[/-](20\d{2}|\d{2})\b")


def _normalise_num(s: str) -> str:
    """Drop separators and pence."""
    return s.replace(",", "").split(".")[0]


def extract_claims(text: str) -> list[dict]:
    """Pull every numeric claim from text with its sentence/context."""
    text_lower = text.lower()
    claims: list[dict] = []

    # Percentages
    for m in _PCT.finditer(text):
        ctx = _context_window(text_lower, m.start(), m.end())
        claims.append({"kind": "percentage", "value": m.group(1) + "%", "raw": m.group(0), "context": ctx, "pos": m.start()})

    # £ amounts
    for m in _GBP.finditer(text):
        val = m.group(1)
        suffix = (m.group(2) or "").strip().lower()
        if suffix in {"m", "million"}:
            normalised = "1,000,000" if val == "1" else f"{val},000,000"
        elif suffix == "k":
            normalised = f"{val},000"
        else:
            normalised = val
        ctx = _context_window(text_lower, m.start(), m.end())
        claims.append({"kind": "gbp", "value": normalised, "raw": m.group(0), "context": ctx, "pos": m.start()})

    # Plain large numbers
    for m in _PLAIN_NUM.finditer(text):
        # Skip if part of a tax year or already in a £ match
        if any(c["pos"] <= m.start() < c["pos"] + len(c["raw"]) for c in claims):
            continue
        if _TAX_YEAR.search(text[max(0, m.start() - 6) : m.end() + 6]):
            continue
        ctx = _context_window(text_lower, m.start(), m.end())
        claims.append({"kind": "number", "value": m.group(1), "raw": m.group(0), "context": ctx, "pos": m.start()})

    # N-day windows
    for m in _DAYS.finditer(text):
        ctx = _context_window(text_lower, m.start(), m.end())
        claims.append({"kind": "days", "value": m.group(1), "raw": m.group(0), "context": ctx, "pos": m.start()})

    # Tax year ranges
    for m in _TAX_YEAR.finditer(text):
        ctx = _context_window(text_lower, m.start(), m.end())
        first = m.group(1)
        second = m.group(2)
        if len(second) == 2:
            second_norm = first[:2] + second
        else:
            second_norm = second
        if int(second_norm) == int(first) + 1:
            claims.append({"kind": "tax_year", "value": f"{first}/{second}", "raw": m.group(0), "context": ctx, "pos": m.start()})

    return claims


def _context_window(text: str, start: int, end: int, *, span: int = 120) -> str:
    return text[max(0, start - span) : min(len(text), end + span)]


# --- Verification ------------------------------------------------------------


def check_content(text: str, *, strictness: str = "strict") -> dict:
    """Verify all numeric claims in `text` against the facts catalogue.

    Returns:
      {
        "wrong_value_errors": [...],   # critical: definite mismatch
        "unverified_numbers": [...],   # ambiguous: number not in catalogue
        "verified_matches": [...],     # passed: number matches catalogue
        "all_claims": [...],
      }
    """
    facts = load_facts()
    claims = extract_claims(text)

    wrong: list[dict] = []
    unverified: list[dict] = []
    verified: list[dict] = []

    def _fact_value_kind(fact_value: str) -> str:
        """Classify a fact's value into the same kinds as extracted claims."""
        v = str(fact_value).strip()
        if "%" in v:
            return "percentage"
        if "/" in v and re.match(r"^\d{4}/\d{2,4}$", v):
            return "tax_year"
        # Plain integer (e.g. days like "60", or amount like "12,570")
        digits = v.replace(",", "")
        if digits.isdigit():
            # Heuristic: small (<200) = days; larger = gbp/number
            return "days" if int(digits) < 200 else "gbp_or_number"
        return "other"

    for claim in claims:
        # For each claim, find facts whose patterns match the surrounding context
        # AND whose value-kind matches the claim's kind
        claim_kind = claim["kind"]  # percentage / gbp / number / days / tax_year
        matched_facts: list[dict] = []
        for fact in facts:
            f_kind = _fact_value_kind(fact["value"])
            # Type compatibility:
            #   percentage <-> percentage
            #   days <-> days
            #   tax_year <-> tax_year
            #   gbp / number <-> gbp_or_number
            compatible = (
                (claim_kind == "percentage" and f_kind == "percentage")
                or (claim_kind == "days" and f_kind == "days")
                or (claim_kind == "tax_year" and f_kind == "tax_year")
                or (claim_kind in ("gbp", "number") and f_kind == "gbp_or_number")
            )
            if not compatible:
                continue
            for pat in fact.get("patterns") or []:
                if re.search(pat, claim["context"], re.IGNORECASE):
                    matched_facts.append(fact)
                    break

        if not matched_facts:
            # No fact of compatible kind to govern this number. Don't flag.
            continue

        # Did the claim's value match ANY matched fact's value?
        claim_normalised = claim["value"].replace(",", "").replace("%", "").strip().lower()
        match_found = False
        for f in matched_facts:
            f_norm = str(f["value"]).replace(",", "").replace("%", "").strip().lower()
            if claim_normalised == f_norm:
                verified.append({"claim": claim, "fact": f})
                match_found = True
                break

        if not match_found:
            # Definitive mismatch — the content asserts X for a concept where catalogue says Y
            wrong.append(
                {
                    "claim": claim,
                    "expected_values": [f["value"] for f in matched_facts],
                    "fact_ids": [f["id"] for f in matched_facts],
                    "context": claim["context"][:200],
                }
            )

    return {
        "wrong_value_errors": wrong,
        "unverified_numbers": unverified,
        "verified_matches": verified,
        "all_claims_count": len(claims),
    }


def fact_check_validator(text_field: str = "body_html"):
    """Curried validator for use in run_reasoning(validators=[...])."""
    def _v(o):
        if not isinstance(o, dict):
            return True, ""  # not our concern
        text = o.get(text_field)
        if not isinstance(text, str):
            return True, ""
        result = check_content(text)
        if result["wrong_value_errors"]:
            errs = result["wrong_value_errors"]
            summary = "; ".join(
                f"{e['claim']['raw']!r} vs expected {e['expected_values']} (fact {e['fact_ids']})"
                for e in errs[:3]
            )
            return False, f"fact_check: {len(errs)} wrong values: {summary}"
        return True, f"fact_check: {len(result['verified_matches'])} verified, {result['all_claims_count']} claims"
    return _v


# --- Diagnostic --------------------------------------------------------------


def main() -> None:
    import sys
    if len(sys.argv) < 2:
        print("Usage: python -m optimisation_engine.apply.fact_checker <text_or_file>")
        return
    arg = sys.argv[1]
    if Path(arg).exists():
        text = Path(arg).read_text(encoding="utf-8")
    else:
        text = arg

    result = check_content(text)
    print(f"Total numeric claims: {result['all_claims_count']}")
    print(f"Verified (correct):   {len(result['verified_matches'])}")
    print(f"Wrong values:         {len(result['wrong_value_errors'])}")
    print()

    if result["wrong_value_errors"]:
        print("=== WRONG VALUE ERRORS ===")
        for e in result["wrong_value_errors"]:
            print(f"  Claim:    {e['claim']['raw']!r}")
            print(f"  Expected: {e['expected_values']}")
            print(f"  Fact IDs: {e['fact_ids']}")
            print(f"  Context:  ...{e['context']}...")
            print()

    if result["verified_matches"]:
        print("=== VERIFIED MATCHES ===")
        for v in result["verified_matches"][:10]:
            print(f"  {v['claim']['raw']!r} -> {v['fact']['concept']}")


if __name__ == "__main__":
    main()
