"""test_redaction.py: self-check for alert redaction. Run: python scripts/test_redaction.py

The alert now carries the enquiry in the enquirer's own words, so redaction is the
only thing standing between a redacted alert and a disclosure of identity. Every firm
in the pool receives it, including firms that never claim and never pay, so a leak
here is a disclosure to people who were never entitled to it.

Asserts that the identifiers we promise to remove are removed, that the substance a
firm needs to decide on survives, and that a rendered alert never contains the raw
message or any contact field.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers

MUST_REMOVE = [
    ("email", "Please reply to john.smith@example.co.uk when you can.", "[EMAIL]", "example.co.uk"),
    ("email plus", "Contact a.b+tag@sub.domain.org today.", "[EMAIL]", "sub.domain.org"),
    ("mobile", "Call me on 07700 900123 any morning.", "[PHONE]", "07700"),
    ("landline", "My number is 0161 496 0123 after six.", "[PHONE]", "0161"),
    ("intl", "Reach me on +44 7700 900456 please.", "[PHONE]", "7700 900456"),
    ("postcode", "The flat is in SW1A 1AA and is let.", "[POSTCODE]", "SW1A 1AA"),
    ("postcode tight", "Property at M20 4WX, let since 2019.", "[POSTCODE]", "M20 4WX"),
    ("website", "See www.acmeholdings.co.uk for details.", "[LINK]", "acmeholdings"),
    ("url", "Details at https://acme.example.com/page here.", "[LINK]", "acme.example.com"),
    ("company ltd", "I own Acme Property Holdings Ltd outright.", "[COMPANY]", "Acme Property Holdings"),
    ("company limited", "Owned by Redgate Estates Limited since 2011.", "[COMPANY]", "Redgate Estates"),
    ("company llp", "We trade as Hartley Brothers LLP now.", "[COMPANY]", "Hartley Brothers"),
]

# The alert is useless if redaction eats the substance, so these must survive.
MUST_KEEP = [
    ("I have six buy to lets and want to incorporate before April.",
     ["six buy to lets", "incorporate", "April"]),
    ("Selling a rental I lived in for 2 years, bought 2006 for 170,000.",
     ["Selling", "2 years", "170,000"]),
    ("Non-resident in Spain, one London flat, need the 60-day return.",
     ["Non-resident", "Spain", "60-day"]),
]


def main():
    for label, text, token, leaked in MUST_REMOVE:
        out = tiers.redact(text)
        assert token in out, f"{label}: expected {token} in {out!r}"
        assert leaked.lower() not in out.lower(), f"{label}: {leaked!r} survived in {out!r}"
    print(f"  ok: all {len(MUST_REMOVE)} identifier shapes removed")

    for text, keeps in MUST_KEEP:
        out = tiers.redact(text)
        for k in keeps:
            assert k in out, f"redaction ate the substance: {k!r} missing from {out!r}"
    print(f"  ok: the substance a firm decides on survives redaction")

    assert tiers.redact("") == "(no message)"
    assert tiers.redact(None) == "(no message)"
    print("  ok: an empty message renders as a placeholder, never blank")

    # A rendered alert must not contain a contact field or the raw message. The
    # template has no token for either, so this asserts nobody has added one.
    lead = {
        "id": "TEST", "tier": "advisory", "case_type": "incorporation",
        "intent_line": "Wants advice on incorporating a portfolio.", "area": "Leeds",
        "message": "I am Jane Doe, jane@example.com, 07700 900999, of Doe Holdings Ltd, LS1 4AB.",
    }
    rendered = tiers.render("ping.txt", {
        "TIER_LABEL": "Advisory", "CASE_TYPE": lead["case_type"], "AREA": lead["area"],
        "INTENT_LINE": lead["intent_line"], "REDACTED_MESSAGE": tiers.redact(lead["message"]),
        "PRICE": "£85", "SHARE_NOTE": "", "EXCLUSIVE_LINE": "", "CLAIM_NOTE": "",
    })
    for banned in ("jane@example.com", "07700 900999", "LS1 4AB", "Doe Holdings"):
        assert banned not in rendered, f"{banned!r} reached a rendered alert"
    for token in ("NAME", "PHONE_NUMBER", "EMAIL_ADDRESS", "CONTACT"):
        assert "{{" + token + "}}" not in rendered, f"the alert template has a {token} field"
    print("  ok: a rendered alert carries no contact details and no raw message")

    print("\nall redaction checks passed")


if __name__ == "__main__":
    main()
