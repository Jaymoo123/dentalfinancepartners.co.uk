"""Self-check for the wash rules in export_raw_leads. No DB, no PII: run it bare.

Guards the three rules the triage sheet depends on being right, because a lead
that leaks through has been contacted twice and one of those is a complaint.
"""
import csv
import os
import tempfile

import re

from export_raw_leads import (OPT_OUT_TEXT, SHEET_WEBHOOK_COLS, load_contacted,
                              phone_key, wash)

ROUTE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                     "Property", "web", "src", "app", "api", "leads", "sync", "route.ts")


def test_sheet_columns_match_the_webhook():
    """The seeded CSV and the live webhook must write the same columns in the same
    order, or new leads land one column out and quietly corrupt the sheet."""
    src = open(ROUTE, encoding="utf-8").read()
    body = re.search(r"const row: \(string \| number\)\[\] = \[(.*?)\n  \];", src, re.S)
    assert body, "webhook row array not found; did route.ts get restructured?"
    fields = re.findall(r"\br\.(\w+)", body.group(1))
    assert fields == [f for _, f in SHEET_WEBHOOK_COLS], (
        f"column drift\n  route.ts: {fields}\n  exporter: "
        f"{[f for _, f in SHEET_WEBHOOK_COLS]}")

REPLY = "[01 Jan 2026 09:00] They replied by email: "


def lead(i, name, created, opted="", src="property", email="", phone="", trail=""):
    return ({"id": i, "full_name": name, "created_at": created},
            {"source": src, "email": email, "phone": phone, "opted_out": opted,
             "sms_email_trail": trail})


def test():
    assert phone_key("+447700900123") == phone_key("07700900123") == "7700900123"
    assert phone_key("0161 241 6118") == "1612416118"
    assert phone_key("12345") == "", "too short to be a safe match key"

    assert OPT_OUT_TEXT.search("STOP")
    assert OPT_OUT_TEXT.search("please remove me from your list")
    assert OPT_OUT_TEXT.search("I will report this to the ICO")
    assert not OPT_OUT_TEXT.search("Happy to book a call next Tuesday")

    # The anchors wash() resolves must exist, plus one lead per rule. Newest first.
    pairs = [
        lead(1, "Keep Me", "2026-08-20T10:00:00Z", email="keep@x.com", phone="07700900001"),
        lead(2, "Opted Out", "2026-08-20T10:00:00Z", opted="OPTED OUT", email="o@x.com"),
        lead(3, "Said Stop", "2026-08-20T10:00:00Z", email="s@x.com", trail=REPLY + "STOP"),
        lead(4, "Emailed Already", "2026-08-20T10:00:00Z", email="Done@X.com"),
        lead(5, "Phoned Already", "2026-08-20T10:00:00Z", email="p@x.com", phone="+447700900123"),
        lead(6, "Dupe Newer", "2026-08-20T10:00:00Z", email="d@x.com"),
        lead(7, "Greg Todd", "2026-08-19T10:00:00Z", email="g@x.com"),
        lead(8, "In Djh Range", "2026-08-18T10:00:00Z", email="djh@x.com"),
        lead(9, "Julie-Anne Casey", "2026-08-17T10:00:00Z", email="j@x.com"),
        lead(10, "Dupe Older", "2026-08-16T10:00:00Z", email="d@x.com"),
        lead(11, "Ali Fadlallah", "2026-08-15T10:00:00Z", src="medical", email="a@x.com"),
        lead(12, "Old Medical", "2026-08-14T10:00:00Z", src="medical", email="m@x.com"),
    ]
    kept, rows = [k for k, _ in pairs], [r for _, r in pairs]

    # Case and phone format must not let a contacted lead through.
    path = os.path.join(tempfile.mkdtemp(), "contacted.csv")
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["email", "phone"])
        w.writeheader()
        w.writerows([{"email": "done@x.com", "phone": ""},
                     {"email": "", "phone": "07700900123"}])

    _, out = wash(kept, rows, load_contacted([path]))
    survivors = {r["email"].lower() for r in out}
    assert survivors == {"keep@x.com", "d@x.com"}, survivors

    # Without a contacted list, the two reached-out leads come back.
    _, out = wash(kept, rows)
    assert {"done@x.com", "p@x.com"} <= {r["email"].lower() for r in out}
    print("OK")


if __name__ == "__main__":
    test()
    test_sheet_columns_match_the_webhook()
    print("OK columns")
