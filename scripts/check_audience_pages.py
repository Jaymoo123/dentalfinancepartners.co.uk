#!/usr/bin/env python3
"""QA coverage for the audience/segment ("for") pages, stdlib only.

Spec: docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md section 13, S4a, item T3.
These routes (contractors-ir35, care, charities `for/[slug]`, and Medical's
`for-*` pages) ship with no automated checks today. This script is that check.
It costs nothing to run: no network, no deps, pure regex over source text.

Regexes are deliberately loose (these are literal TS object-literal arrays,
not arbitrary TypeScript) -- do not extend this into a real TS parser.

Banned claim strings are the estate-wide credential/marketing rule. No single
docs/_engines/*ESTATE_CLAIMS_INTEGRITY*.md file exists in this repo today; the
nearest documented banned list is docs/agency/house_positions.md line 199
("No credential claims ... ICAEW / ACA / CTA / chartered / qualified /
regulated ... award-winning"), reused here plus the spec's own list.

Checks:
  (a) no em-dash character anywhere in the file
  (b) metaTitle <= 60 chars, metaDescription <= 160 chars
  (c) slugs unique within a file
  (d) banned claim strings (case-insensitive), plus self-claim "regulated"
      patterns (narrowed so third-party regulator descriptions, e.g.
      "Children's homes are regulated by Ofsted", don't trip the check)
  (e) every FAQ answer non-empty and >= 40 chars

Exit code 1 only when there is at least one finding (findings are real
defects; there are no separate "warnings", so nothing here should trip CI red
on a clean tree).
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

EM_DASH = "—"

BANNED_CLAIMS = [
    "chartered",
    "icaew",
    "acca",
    "ciot",
    "att ",
    # "our accountants", "we are accountants", "our team of" and "our qualified"
    # were banned under the 2026-09-12 referral-network ruling. Owner reversed it
    # on 2026-09-28: the brand IS the firm, firm voice is required. Credentials
    # nobody holds (chartered, ICAEW, ACCA, CIOT, ATT) and awards stay banned.
    "award-winning",
    "award winning",
]

# "regulated by" alone bans legitimate third-party regulator descriptions
# ("Children's homes are regulated by Ofsted"). These patterns only match
# self-claims of regulated status.
REGULATED_SELF_CLAIM_PATTERNS = [
    re.compile(r"\b(we|we're|we are|our firm|the firm|our partner firms?) (is|are)? ?regulated\b", re.IGNORECASE),
    re.compile(r"\bFCA[- ]regulated\b", re.IGNORECASE),
    re.compile(r"\bICAEW[- ]regulated\b", re.IGNORECASE),
]

# Loose personal-name-pattern flag from the claims doc's own examples
# ("Chartered Accountant (ACA, ICAEW)" bylines, named reviewers). We already
# catch the credential words above; this adds the reviewer-byline shape.
NAME_PATTERN = re.compile(r"\b(?:reviewed by|written by)\s+[A-Z][a-z]+\s+[A-Z][a-z]+", re.IGNORECASE)

DATA_FILE_GLOB = "*/web/src/data/{}.ts"
DATA_FILE_NAMES = ["audiences", "contractor-types", "care-hubs", "charity-types"]
MEDICAL_GLOB = "Medical/web/src/app/for-*/page.tsx"


def line_of(text: str, pos: int) -> int:
    return text.count("\n", 0, pos) + 1


def find_string_field(text: str, key: str):
    """Yield (line, value) for `key: "..."` or `key:\n  "..."` occurrences."""
    pattern = re.compile(re.escape(key) + r'\s*:\s*"([^"]*)"')
    for m in pattern.finditer(text):
        yield line_of(text, m.start()), m.group(1)


def find_pairs(text: str, key_a: str, key_b: str):
    """Yield (line, a_value, b_value) for {key_a: "...", key_b: "..."} objects,
    tolerant of the value being on the next line."""
    pattern = re.compile(
        re.escape(key_a) + r'\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
        + re.escape(key_b) + r'\s*:\s*"((?:[^"\\]|\\.)*)"',
        re.DOTALL,
    )
    for m in pattern.finditer(text):
        yield line_of(text, m.start()), m.group(1), m.group(2)


def check_file(path: Path, findings: list):
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(REPO_ROOT).as_posix()

    # (a) em-dash
    for i, ch in enumerate(text):
        if ch == EM_DASH:
            findings.append(f"{rel}:{line_of(text, i)}: EM_DASH: literal em-dash character found")

    # slugs
    is_medical = rel.endswith("page.tsx")
    slugs = list(find_string_field(text, "slug"))
    seen = {}
    for ln, slug in slugs:
        if slug in seen:
            findings.append(f"{rel}:{ln}: DUPLICATE_SLUG: '{slug}' also at line {seen[slug]}")
        else:
            seen[slug] = ln

    # metaTitle / metaDescription (data files) or metadata.title / .description (medical).
    # Medical files repeat "title"/"description" for openGraph and for unrelated
    # `concerns`/`services` entries later in the same file; scope to the
    # `export const metadata = { ... }` block and take only its first
    # title/description (the top-level ones, not the openGraph duplicates).
    if is_medical:
        block_match = re.search(r"export const metadata[^{]*\{", text)
        if block_match:
            depth = 1
            i = block_match.end()
            while i < len(text) and depth:
                if text[i] == "{":
                    depth += 1
                elif text[i] == "}":
                    depth -= 1
                i += 1
            meta_text = text[block_match.end():i]
            offset = block_match.end()
            title_hit = next(find_string_field(meta_text, "title"), None)
            desc_hit = next(find_string_field(meta_text, "description"), None)
            if title_hit:
                ln, val = title_hit
                ln = line_of(text, offset) + ln - 1
                if len(val) > 60:
                    findings.append(f"{rel}:{ln}: META_TITLE_TOO_LONG: {len(val)} chars (max 60): {val!r}")
            if desc_hit:
                ln, val = desc_hit
                ln = line_of(text, offset) + ln - 1
                if len(val) > 160:
                    findings.append(f"{rel}:{ln}: META_DESCRIPTION_TOO_LONG: {len(val)} chars (max 160): {val!r}")
    else:
        for ln, val in find_string_field(text, "metaTitle"):
            if len(val) > 60:
                findings.append(f"{rel}:{ln}: META_TITLE_TOO_LONG: {len(val)} chars (max 60): {val!r}")
        for ln, val in find_string_field(text, "metaDescription"):
            if len(val) > 160:
                findings.append(f"{rel}:{ln}: META_DESCRIPTION_TOO_LONG: {len(val)} chars (max 160): {val!r}")

    # FAQs: question/answer (data files) or q/a (medical)
    q_key, a_key = ("q", "a") if is_medical else ("question", "answer")
    faqs = list(find_pairs(text, q_key, a_key))
    for ln, _q, a in faqs:
        if len(a.strip()) < 40:
            findings.append(f"{rel}:{ln}: FAQ_ANSWER_TOO_SHORT: {len(a.strip())} chars (min 40, or empty)")

    # banned claims + name pattern, scanned over every string literal in the file
    lowered = text.lower()
    for phrase in BANNED_CLAIMS:
        start = 0
        while True:
            idx = lowered.find(phrase, start)
            if idx == -1:
                break
            findings.append(f"{rel}:{line_of(text, idx)}: BANNED_CLAIM: {phrase!r}")
            start = idx + len(phrase)
    for pattern in REGULATED_SELF_CLAIM_PATTERNS:
        for m in pattern.finditer(text):
            findings.append(f"{rel}:{line_of(text, m.start())}: BANNED_CLAIM: {m.group(0)!r}")
    for m in NAME_PATTERN.finditer(text):
        findings.append(f"{rel}:{line_of(text, m.start())}: NAME_PATTERN: {m.group(0)!r}")


def collect_files():
    files = []
    for name in DATA_FILE_NAMES:
        files.extend(REPO_ROOT.glob(DATA_FILE_GLOB.format(name)))
    files.extend(REPO_ROOT.glob(MEDICAL_GLOB))
    return sorted(set(files))


def main():
    findings = []
    files = collect_files()
    for path in files:
        check_file(path, findings)

    for line in findings:
        print(line)
    print(f"\n{len(findings)} finding(s) across {len(files)} file(s).")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
