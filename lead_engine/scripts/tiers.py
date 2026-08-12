"""Shared helpers for the lead engine. Python stdlib only. Dry-run only.

Everything reads config/tiers.json and config/standard_terms.md at runtime.
No prices, slot counts or decay thresholds are hardcoded anywhere in
lead_engine/. NO network code exists anywhere in this package; anything that
would send or charge prints a [STUB] line instead.
"""
import csv
import html as _html
import json
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # repo root
ENGINE = ROOT / "lead_engine"
DATA = ENGINE / "data"
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


def last_call_price(tier_id):
    return tier_cfg(tier_id)["decay"]["last_call_price"]


def claim_slots():
    return load_tiers()["claim_slots_per_lead"]


def exclusive_multiplier():
    return load_tiers()["exclusive_multiplier"]


def gbp(n):
    return f"£{n}"


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
