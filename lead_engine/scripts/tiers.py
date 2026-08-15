"""Shared helpers for the lead engine. Python stdlib only. Dry-run only.

Everything reads config/tiers.json and config/standard_terms.md at runtime.
No prices, slot counts or decay thresholds are hardcoded anywhere in
lead_engine/. NO network code exists anywhere in this package; anything that
would send or charge prints a [STUB] line instead.
"""
import csv
import html as _html
import json
import os
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # repo root
ENGINE = ROOT / "lead_engine"
# LEAD_ENGINE_DATA points the CSV layer at a sandbox copy so scripts/test_lanes.py
# can exercise the real claim path without writing to the tracked ledger.
DATA = Path(os.environ["LEAD_ENGINE_DATA"]) if os.environ.get("LEAD_ENGINE_DATA") else ENGINE / "data"
TEMPLATES = ENGINE / "templates"
OUTBOX = ENGINE / "outbox"
INVOICES = ENGINE / "invoices"


# ---- config ----

def load_tiers():
    return json.loads((ROOT / "config" / "tiers.json").read_text(encoding="utf-8"))


def tier_cfg(tier_id, cfg=None):
    cfg = cfg or load_tiers()
    for t in cfg["tiers"]:
        if t["id"] == tier_id:
            return t
    raise SystemExit(f"Unknown tier id: {tier_id!r}")


def price(tier_id):
    return tier_cfg(tier_id)["price"]


def claim_slots():
    return load_tiers()["claim_slots_per_lead"]


def adjacent_claim_slots():
    """Cap for the adjacent lane. None would mean uncapped; the owner set it to
    3 on 2026-08-14 and the LIA balancing test depends on it staying capped."""
    return load_tiers().get("adjacent_claim_slots_per_lead")


def lane_cap(lane):
    """Slot cap for a lane. None means uncapped."""
    return claim_slots() if lane == ACCOUNTING else adjacent_claim_slots()


def exclusive_multiplier():
    return load_tiers()["exclusive_multiplier"]


# ---- lanes ----
#
# Claims run in two independent lanes (config/tiers.json $lanes). A delivery row
# carries its lane, so counting one lane never sees the other: an adjacent claim
# cannot consume an accounting slot, and an accounting exclusive lock closes the
# accounting lane only.

ACCOUNTING = "accounting"
ADJACENT = "adjacent"


def firm_professions(firm):
    return {p.strip().lower() for p in (firm.get("professions") or "").split(";") if p.strip()}


def firm_lane(firm, force_adjacent=False):
    """Which lane this firm claims in. A firm that does no accounting can only
    ever claim on the adjacent lane; a firm that does both defaults to
    accounting and takes the adjacent lane with --adjacent."""
    if force_adjacent or ACCOUNTING not in firm_professions(firm):
        return ADJACENT
    return ACCOUNTING


def lane_of(delivery):
    """Lane of an existing delivery row. Rows written before lanes existed have
    no lane column and are all accounting claims."""
    return delivery.get("lane") or ACCOUNTING


def claims_in_lane(deliveries, lead_id, lane):
    return [d for d in deliveries if d["lead_id"] == lead_id and lane_of(d) == lane]


def gbp(n):
    return f"£{n}"


# ---- redaction ----

# The alert carries the enquiry in the enquirer's own words, with the identifying
# parts taken out, so a firm decides on the substance rather than on a summary.
# Everything here is stripped before an alert leaves: it is the only thing standing
# between a redacted alert and a disclosure of identity.
_REDACT = (
    (re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+"), "[EMAIL]"),
    (re.compile(r"(?<!\d)(?:\+44\s?|\(?0)\d[\d\s().-]{7,}\d"), "[PHONE]"),
    (re.compile(r"\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b"), "[POSTCODE]"),
    (re.compile(r"\bhttps?://\S+|\bwww\.\S+"), "[LINK]"),
    # Company names: a capitalised run ending in a company suffix.
    (re.compile(r"\b(?:[A-Z][\w&'-]*\s+){1,4}(?:Ltd|Limited|LLP|PLC|Plc|plc)\b"), "[COMPANY]"),
)


def redact(message):
    """An enquiry message with direct identifiers removed, for use in an alert."""
    text = (message or "").strip()
    if not text:
        return "(no message)"
    for rx, token in _REDACT:
        text = rx.sub(token, text)
    return " ".join(text.split())


# ---- CSV util ----

def read_rows(name):
    with open(DATA / name, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_rows(name, rows):
    with open(DATA / name, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)


def append_row(name, row):
    rows = read_rows(name)
    rows.append(row)
    write_rows(name, rows)


def find(rows, key, value):
    for r in rows:
        if r[key] == value:
            return r
    return None


# ---- templates ----

def render(template_name, mapping):
    """Plain {{TOKEN}} .replace() substitution. Tokens not in the mapping
    (e.g. {{CLAIM_URL}}) are deliberately left in place."""
    text = (TEMPLATES / template_name).read_text(encoding="utf-8")
    for k, v in mapping.items():
        text = text.replace("{{" + k + "}}", str(v))
    return text


def write_outbox(filename, content):
    OUTBOX.mkdir(exist_ok=True)
    path = OUTBOX / filename
    path.write_text(content, encoding="utf-8")
    return path


# ---- standard terms (verbatim, single source of truth) ----

def terms_lines():
    raw = (ROOT / "config" / "standard_terms.md").read_text(encoding="utf-8")
    block = raw.split("<!-- terms:start -->")[1].split("<!-- terms:end -->")[0]
    return [line for line in block.splitlines() if line.strip()]


def terms_text():
    return "\n".join(terms_lines())


def terms_html():
    items = "\n".join(
        "    <li>" + _html.escape(l[2:] if l.startswith("- ") else l) + "</li>"
        for l in terms_lines()
    )
    return "<ul>\n" + items + "\n  </ul>"


# ---- time ----

def parse_ts(s):
    return datetime.fromisoformat(s)


def esc(s):
    return _html.escape(str(s))
