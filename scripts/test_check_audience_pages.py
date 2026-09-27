"""Smallest possible self-check for check_audience_pages.py's regex logic.
Run: python scripts/test_check_audience_pages.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_audience_pages import (  # noqa: E402
    find_string_field,
    find_pairs,
    EM_DASH,
    BANNED_CLAIMS,
    REGULATED_SELF_CLAIM_PATTERNS,
)

SAMPLE = '''
export const rows = [
  {
    slug: "foo",
    metaTitle: "A very long meta title that is definitely over sixty characters long",
    metaDescription:
      "short",
    faqs: [
      { question: "Q1", answer: "too short" },
      { question: "Q2", answer: "This answer is long enough to pass the forty character minimum easily." },
    ],
  },
];
'''

slugs = list(find_string_field(SAMPLE, "slug"))
assert slugs == [(4, "foo")], slugs

titles = list(find_string_field(SAMPLE, "metaTitle"))
assert len(titles[0][1]) > 60

faqs = list(find_pairs(SAMPLE, "question", "answer"))
assert len(faqs) == 2, faqs
assert len(faqs[0][2]) < 40  # "too short" fails the floor
assert len(faqs[1][2]) >= 40

assert EM_DASH not in SAMPLE
assert "chartered" in BANNED_CLAIMS

SELF_CLAIM = "We are regulated by the FCA for consumer credit work."
THIRD_PARTY = "Children's homes are regulated by Ofsted, not CQC."
assert any(p.search(SELF_CLAIM) for p in REGULATED_SELF_CLAIM_PATTERNS)
assert not any(p.search(THIRD_PARTY) for p in REGULATED_SELF_CLAIM_PATTERNS)

print("ok")
