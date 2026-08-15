"""Guard: parse_serp_advanced's output shape must never silently drift.

serp_provider.fetch_serp() promises organic results in the SAME 5-key shape as
ddg_serp_client.fetch_organic_results (position, title, link, snippet, domain) so
callers can swap providers without touching downstream code. This pins that shape
plus paa/features against a hand-written DataForSEO advanced-response fixture, so a
DFS response-format change (or a careless edit here) fails loud instead of shipping
a quietly-broken key name. Run directly:

    python optimisation_engine/clients/test_serp_provider_parse.py
"""
from __future__ import annotations

import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.serp_provider import parse_serp_advanced  # noqa: E402

# Minimal hand-written fixture in the shape of a real
# serp/google/organic/live/advanced response: one featured_snippet, one
# people_also_ask (two questions), two organic results.
FIXTURE_RESPONSE = {
    "tasks": [
        {
            "result": [
                {
                    "items": [
                        {
                            "type": "featured_snippet",
                            "title": "Landlord tax UK explained",
                            "description": "A short answer box.",
                            "url": "https://example.com/landlord-tax",
                        },
                        {
                            "type": "people_also_ask",
                            "items": [
                                {
                                    "type": "people_also_ask_element",
                                    "title": "Do landlords pay tax on rental income?",
                                    "expanded_element": [
                                        {
                                            "type": "people_also_ask_expanded_element",
                                            "featured_title": "Yes",
                                            "description": "Rental income is taxable after allowable expenses.",
                                            "url": "https://gov.uk/renting-out-a-property",
                                            "domain": "gov.uk",
                                        }
                                    ],
                                },
                                {
                                    "type": "people_also_ask_element",
                                    "title": "How much tax do landlords pay?",
                                    "expanded_element": [
                                        {
                                            "type": "people_also_ask_expanded_element",
                                            "description": "Depends on income tax band.",
                                            "url": "https://example.com/how-much",
                                            "domain": "example.com",
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            "type": "organic",
                            "rank_group": 1,
                            "rank_absolute": 1,
                            "title": "Landlord Tax Guide",
                            "url": "https://www.example.com/landlord-tax-guide",
                            "domain": "example.com",
                            "description": "Everything landlords need to know about tax.",
                        },
                        {
                            "type": "organic",
                            "rank_group": 2,
                            "rank_absolute": 2,
                            "title": "Rental Income Tax Explained",
                            "url": "https://www.rivalsite.co.uk/rental-income-tax",
                            "domain": "rivalsite.co.uk",
                            "description": "How rental income tax works.",
                        },
                    ]
                }
            ]
        }
    ]
}

ORGANIC_KEYS = {"position", "title", "link", "snippet", "domain"}
PAA_KEYS = {"question", "answer", "source_url"}


def test_parse_serp_advanced_shape() -> None:
    parsed = parse_serp_advanced(FIXTURE_RESPONSE)

    assert set(parsed.keys()) == {"organic", "paa", "features"}, parsed.keys()

    organic = parsed["organic"]
    assert len(organic) == 2, organic
    for row in organic:
        assert set(row.keys()) == ORGANIC_KEYS, row.keys()
    assert organic[0] == {
        "position": 1,
        "title": "Landlord Tax Guide",
        "link": "https://www.example.com/landlord-tax-guide",
        "snippet": "Everything landlords need to know about tax.",
        "domain": "example.com",
    }
    assert organic[1]["domain"] == "rivalsite.co.uk"

    paa = parsed["paa"]
    assert len(paa) == 2, paa
    for row in paa:
        assert set(row.keys()) == PAA_KEYS, row.keys()
    assert paa[0] == {
        "question": "Do landlords pay tax on rental income?",
        "answer": "Rental income is taxable after allowable expenses.",
        "source_url": "https://gov.uk/renting-out-a-property",
    }
    # second PAA item has no featured_title, falls back to description
    assert paa[1]["answer"] == "Depends on income tax band."

    assert parsed["features"] == ["featured_snippet", "people_also_ask"], parsed["features"]

    print("OK: parse_serp_advanced shape matches ddg_serp_client's 5-key organic "
          "convention + paa/features")


if __name__ == "__main__":
    test_parse_serp_advanced_shape()
