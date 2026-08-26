"""export_raw_leads.py: UNREDACTED lead export for internal handoff.

Writes proposal_engine/out/leads_raw_<date>.csv (and .html for reading): every
lead with full contact details, message, tier, verification/nurture status,
self-booked call slots and inbound replies. PII: out/ is gitignored; never
commit or publish the output. Same env and tables as generate_proposal.py.

With --wash, drops leads already handed to a partner or that must not be
contacted, and writes leads_washed_<date>.* instead. Rules in WASH_NOTE.

With --triage <already-contacted.csv>, does everything --wash does, additionally
drops anyone already reached out to (matched on email or the last 10 phone
digits, so +44/0/bare all collide), and writes leads_triage_<date>.* laid out to
match the live "Lead Tracker" Google Sheet column for column, newest first.

That sheet is seeded from this file once and then kept current by the webhook at
Property/web/src/app/api/leads/sync/route.ts, which inserts each new lead as row
2. Re-run this only to rebuild the sheet from scratch: once it is live the sheet
holds hand-typed triage columns that exist nowhere else, so a re-seed overwrites
work unless those columns are copied back.
"""
import csv
import html
import json
import os
import re
import sys
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")

# --wash: leads already sent to a firm under an earlier arrangement, or that must
# not be contacted. Anchors are named leads, resolved to their created_at at run
# time (no index or hard-coded date to go stale). The receiving firms are not named
# here: this note renders into the export header, and the estate does not name firms
# in any generated artefact.
EARLIER_NONPROPERTY_ANCHOR = "ali fadlallah"   # non-property, this one and older -> already sent
EARLIER_PROPERTY_FROM = "julie-anne casey"     # property, this one .. _TO -> already sent
EARLIER_PROPERTY_TO = "greg todd"
WASH_NOTE = ("Washed: non-property up to and including Ali Fadlallah, and property from "
             "Julie-Anne Casey to Greg Todd, all already supplied under an earlier "
             "arrangement; opted-out leads; older duplicate enquiries from the same person.")


# Opt-out expressed as free text in a reply, which never fired the structured
# opted_out event. Deliberately matched only against reply bodies (never the
# original enquiry, where "not interested in selling" is a normal sentence).
OPT_OUT_TEXT = re.compile(
    r"\b(stop|unsubscribe|opt.?out|remove me|take me off|do not contact|don'?t contact"
    r"|no longer interested|not interested|ico|gdpr|delete my (data|details)"
    r"|spam|scam|harass)\b", re.I)


# Columns A-I of the Lead Tracker sheet, in order, and the `leads` field each holds.
# This IS the webhook's row array in Property/web/src/app/api/leads/sync/route.ts.
# Change one and you must change the other, or every future lead lands one column
# out and the sheet silently corrupts. test_export_wash.py fails if they drift.
SHEET_WEBHOOK_COLS = [
    ("Received", "created_at"), ("Site", "source"), ("Name", "full_name"),
    ("Email", "email"), ("Phone", "phone"), ("Type", "role"),
    ("Message", "message"), ("Page", "source_url"), ("Lead ID", "id"),
]


def uk_time(iso):
    """Match the webhook's toLocaleString("en-GB", {timeZone:"Europe/London"}) exactly,
    so seeded rows and webhook-appended rows sort as one column."""
    from zoneinfo import ZoneInfo
    d = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    return d.astimezone(ZoneInfo("Europe/London")).strftime("%d/%m/%Y, %H:%M:%S")


def phone_key(p):
    """Last 10 digits, so +447700900123 / 07700900123 / 7700900123 all match."""
    d = re.sub(r"\D", "", p or "")
    return d[-10:] if len(d) >= 10 else ""


def load_contacted(paths):
    """Return (emails, phone_keys) already reached out to, from CSVs with those columns."""
    emails, phones = set(), set()
    for path in paths:
        with open(path, newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                if (r.get("email") or "").strip():
                    emails.add(r["email"].strip().lower())
                if phone_key(r.get("phone")):
                    phones.add(phone_key(r["phone"]))
    return emails, phones


def wash(kept, rows, contacted=(frozenset(), frozenset())):
    """Return (kept, rows) with already-handled / do-not-contact leads dropped."""
    done_emails, done_phones = contacted

    def when(l):
        return datetime.fromisoformat(l["created_at"].replace("Z", "+00:00"))

    def anchor(name):
        ts = [when(l) for l in kept
              if (l.get("full_name") or "").strip().lower() == name]
        if not ts:
            sys.exit(f"wash: anchor lead '{name}' not found in export")
        return ts[0]

    reflex_cut = anchor(EARLIER_NONPROPERTY_ANCHOR)
    djh_from, djh_to = anchor(EARLIER_PROPERTY_FROM), anchor(EARLIER_PROPERTY_TO)
    seen, out_k, out_r, dropped = set(), [], [], defaultdict(int)
    for l, r in zip(kept, rows):  # newest first
        src, ts = r["source"], when(l)
        key = r["email"].strip().lower() or r["phone"].strip()
        email, phone = r["email"].strip().lower(), phone_key(r["phone"])
        replies = "\n".join(ln for ln in r["sms_email_trail"].split("\n")
                            if "They replied" in ln)
        if r["opted_out"]:
            reason = "opted out"
        elif OPT_OUT_TEXT.search(replies):
            reason = "opt-out or complaint language in their reply"
        elif (email and email in done_emails) or (phone and phone in done_phones):
            reason = "already reached out to"
        elif src != "property" and ts <= reflex_cut:
            reason = "already supplied (non-property, earlier arrangement)"
        elif src == "property" and djh_from <= ts <= djh_to:
            reason = "already supplied (property, earlier arrangement)"
        elif key and key in seen:
            reason = "duplicate (older enquiry, newer kept)"
        else:
            reason = None
        if reason:
            dropped[reason] += 1
            continue
        if key:
            seen.add(key)
        out_k.append(l)
        out_r.append(r)
    for reason, n in sorted(dropped.items()):
        print(f"  washed out {n}: {reason}")
    return out_k, out_r


def env_load():
    vals = {}
    with open(os.path.join(os.path.dirname(HERE), ".env"), encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                k, _, v = line.partition("=")
                vals[k.strip()] = v.strip().strip('"').strip("'")
    return vals


def get(url, key, path):
    req = urllib.request.Request(f"{url}/rest/v1/{path}",
                                 headers={"apikey": key, "Authorization": f"Bearer {key}"})
    return json.load(urllib.request.urlopen(req))


def main():
    e = env_load()
    url = (e.get("SUPABASE_URL") or e.get("NEXT_PUBLIC_SUPABASE_URL")).rstrip("/")
    key = e.get("SUPABASE_SERVICE_ROLE_KEY") or e.get("SUPABASE_KEY")

    leads = get(url, key, "leads?select=*&order=created_at.desc&limit=2000")
    events = get(url, key, "lead_contact_events?select=lead_id,event_type,channel,ts,meta"
                           "&order=ts.asc&limit=10000")
    nstate = {n["lead_id"]: n["status"] for n in get(
        url, key, "lead_nurture_state?select=lead_id,status&limit=5000")}
    sends = get(url, key, "lead_nurture_sends?select=lead_id,channel,step,sent_at,status"
                          "&order=sent_at.asc&limit=10000")
    # Claimed offers are a flag, not a wash rule: a non-exclusive claim leaves the
    # lead inside the 3+3 recipient cap, so the triager may still work it.
    claimed = {o["lead_id"] for o in get(
        url, key, "lead_offers?select=lead_id,claimed_at,exclusive&limit=2000")
        if o["claimed_at"]}

    by_lead = defaultdict(list)
    for ev in events:
        by_lead[ev["lead_id"]].append(ev)
    sends_by_lead = defaultdict(list)
    for s in sends:
        sends_by_lead[s["lead_id"]].append(s)

    CH = {"email": "email", "sms": "SMS", "whatsapp": "WhatsApp"}

    def trail(l, evs):
        tl = []
        for s in sends_by_lead[l["id"]]:
            if s["status"] == "sent":
                tl.append((s["sent_at"], f"Our {CH.get(s['channel'], s['channel'])} (touch {s['step'] + 1})", None))
        for ev in evs:
            m = ev.get("meta") or {}
            t = ev["event_type"]
            if t == "ack_sent" and not m.get("skipped"):
                tl.append((ev["ts"], f"Our auto-acknowledgement ({CH.get(ev['channel'], ev['channel'])})", None))
            elif t == "verify_pass":
                tl.append((ev["ts"], "Contact details verified", None))
            elif t == "replied":
                tl.append((ev["ts"], f"They replied by {CH.get(ev['channel'], ev['channel'])}", (m.get("body") or "").strip()))
            elif t == "booked":
                tl.append((ev["ts"], "They booked a callback", m.get("start") or m.get("date")))
            elif t == "operator_update" and m.get("body"):
                tl.append((ev["ts"], f"Operator note ({CH.get(ev['channel'], ev['channel'])})", m["body"].strip()))
            elif t == "opted_out":
                tl.append((ev["ts"], "THEY OPTED OUT", m.get("reason")))
        tl.sort(key=lambda x: x[0])
        return tl

    def fmt_ts(ts):
        return datetime.fromisoformat(ts.replace("Z", "+00:00")).strftime("%d %b %Y %H:%M")

    rows, kept = [], []
    for l in leads:
        if l.get("is_test"):
            continue
        kept.append(l)
        evs = by_lead[l["id"]]
        booked = "; ".join(ev["meta"].get("start") or ev["meta"].get("date", "")
                           for ev in evs if ev["event_type"] == "booked" and ev.get("meta"))
        replies = "\n".join(
            f"[{fmt_ts(ts)}] {label}" + (f": {body}" if body else "")
            for ts, label, body in trail(l, evs))
        verified = "yes" if any(ev["event_type"] == "verify_pass" for ev in evs) else ""
        opted_out = "OPTED OUT" if any(ev["event_type"] == "opted_out" for ev in evs) else ""
        rows.append({
            "received": fmt_ts(l["created_at"]),
            "source": l.get("source") or "",
            "verified": verified,
            "nurture_status": nstate.get(l["id"], ""),
            "opted_out": opted_out,
            "name": l.get("full_name") or "",
            "email": l.get("email") or "",
            "phone": l.get("phone") or "",
            "role": l.get("role") or "",
            "practice/company": l.get("practice_name") or "",
            "booked_call_slots": booked,
            "message": (l.get("message") or "").strip(),
            "sms_email_trail": replies,
        })

    contacted_csvs = [sys.argv[i + 1] for i, a in enumerate(sys.argv) if a == "--triage"]
    triage = bool(contacted_csvs)
    washed = triage or "--wash" in sys.argv
    if washed:
        kept, rows = wash(kept, rows, load_contacted(contacted_csvs))

    if triage:
        # This is the live "Lead Tracker" sheet's layout, matched exactly, because
        # the sheet is now the working copy and re-seeding must not shuffle its
        # columns under the people using it. Columns A-I are what the webhook
        # writes for every new lead (route.ts); J-M are history that only exists
        # for leads already in the system, so they stay blank on a new arrival;
        # N-Q belong to the triager and nothing automatic ever writes them.
        sheet_rows = []
        for l, r in zip(kept, rows):
            sheet_rows.append({
                # A-I: written by the webhook on every new lead.
                "Received": uk_time(l["created_at"]),
                "Site": r["source"],
                "Name": r["name"],
                "Email": r["email"],
                "Phone": r["phone"],
                "Type": r["role"],
                "Message": r["message"],
                "Page": l.get("source_url") or "",
                "Lead ID": l["id"],
                # J-M: history.
                "Verified": r["verified"],
                "Nurture status": r["nurture_status"],
                "Booked call slots": r["booked_call_slots"],
                "Contact trail": r["sms_email_trail"],
                # N-Q: the triager's working columns.
                "Sent to Omar or kept in-house": "",
                "Contacted on": "",
                "Next action": "",
                "Notes": "",
            })
        # Newest first, matching the live sheet: the webhook inserts each new lead
        # as row 2, so the column stays in descending date order as leads arrive.
        rows = sheet_rows

    os.makedirs(OUT, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    stem = f"leads_{'triage' if triage else 'washed' if washed else 'raw'}_{stamp}"
    subtitle = WASH_NOTE if washed else "Do not publish or commit."
    if triage:
        subtitle += (" Also washed: anyone already reached out to, and anyone whose reply"
                     " used opt-out or complaint language. Flag columns are advisory,"
                     " not exclusions.")
    csv_path = os.path.join(OUT, f"{stem}.csv")
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    cells = "\n".join(
        "<tr>" + "".join(f"<td>{html.escape(str(r[k]))}</td>" for k in rows[0]) + "</tr>"
        for r in rows)
    heads = "".join(f"<th>{html.escape(k)}</th>" for k in rows[0])
    html_path = os.path.join(OUT, f"{stem}.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(f"""<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<title>Lead export {stamp} (INTERNAL, UNREDACTED)</title>
<style>body{{font:12px/1.4 -apple-system,Segoe UI,sans-serif;margin:16px}}
table{{border-collapse:collapse;width:100%}}th,td{{border:1px solid #ddd;padding:4px 6px;
text-align:left;vertical-align:top;max-width:420px}}th{{background:#f2f2f2;position:sticky;top:0}}
tr:nth-child(even){{background:#fafafa}}</style></head><body>
<h1>Lead export, {stamp}</h1>
<p><strong>INTERNAL AND UNREDACTED.</strong> {len(rows)} leads, newest first. {html.escape(subtitle)}</p>
<table><thead><tr>{heads}</tr></thead><tbody>{cells}</tbody></table></body></html>""")

    # The triage sheet is a CSV to paste into Google Sheets; the per-lead PDF
    # blocks below read the raw-export column names and do not apply to it.
    if triage:
        # The sheet has no column for these, so they are reported here instead of
        # being silently dropped. Sold leads are still workable (a non-exclusive
        # claim leaves us inside the 3+3 recipient cap), but whoever triages them
        # should know somebody else already has them.
        sold = [r["Name"] or r["Email"] for l, r in zip(kept, rows) if l["id"] in claimed]
        unverified = sum(1 for r in rows if not r["Verified"])
        print(f"wrote {csv_path}")
        print(f"wrote {html_path}")
        print(f"{len(rows)} leads for triage, newest first, "
              f"{unverified} with unverified contact details")
        if sold:
            print(f"NOTE {len(sold)} already sold to a buyer: {', '.join(sold)}")
        return

    # PDF: stacked per-lead blocks (the wide table does not fit a page), via
    # headless Edge like generate_proposal.py. Layout mirrors the qualified
    # handoff email: enquiry message first, then the chronological SMS/email
    # trail with reply bodies. Tier/value deliberately omitted for readability.
    def block(l, r):
        evs = by_lead[l["id"]]
        flags = " · ".join(x for x in (
            "verified" if r["verified"] else "unverified",
            r["nurture_status"], r["opted_out"]) if x)
        who = " · ".join(x for x in (
            r["name"] or "(no name)", r["email"] or "(no email)", r["phone"] or "(no phone)",
            r["role"], r["practice/company"]) if x)
        lines = [
            f'<div class="lead{" opted" if r["opted_out"] else ""}">',
            '<div class="keep">',
            f'<div class="head"><strong>{html.escape(r["received"])}</strong> · '
            f'{html.escape(r["source"])} · {html.escape(flags)}</div>',
            f'<div class="who">{html.escape(who)}</div>',
        ]
        if r["booked_call_slots"]:
            lines.append(f'<div class="booked">BOOKED CALL: {html.escape(r["booked_call_slots"])}</div>')
        lines.append("</div>")
        lines.append(f'<div class="msg">{html.escape(r["message"] or "(no message)")}</div>')
        tl = trail(l, evs)
        if tl:
            items = []
            for ts, label, body in tl:
                row = f"<strong>{html.escape(fmt_ts(ts))}</strong> — {html.escape(label)}"
                if body:
                    row += f'<div class="body">{html.escape(body)}</div>'
                items.append(f"<li>{row}</li>")
            lines.append('<ul class="trail">' + "".join(items) + "</ul>")
        lines.append("</div>")
        return "\n".join(lines)

    print_path = os.path.join(OUT, f"{stem}_print.html")
    with open(print_path, "w", encoding="utf-8") as f:
        f.write(f"""<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<title>Lead export {stamp} (INTERNAL, UNREDACTED)</title>
<style>@page{{size:A4;margin:14mm}}body{{font:10.5px/1.45 Segoe UI,sans-serif;color:#1a1a1a}}
h1{{font-size:16px;border-bottom:2px solid #1a1a1a;padding-bottom:4px}}
.lead{{border-bottom:1px solid #ccc;padding:8px 0}}
.keep{{break-inside:avoid;break-after:avoid}}
.head{{color:#555}}.who{{font-weight:600;margin:2px 0;font-size:11.5px}}
.booked{{color:#8a2b06;font-weight:700;margin:2px 0}}
.msg{{margin:4px 0;white-space:pre-wrap;background:#f7f6f3;padding:6px 8px}}
ul.trail{{margin:4px 0 0 0;padding-left:16px;color:#444}}
ul.trail li{{margin:1px 0;break-inside:avoid}}
.body{{white-space:pre-wrap;background:#eef3f7;padding:3px 6px;margin:2px 0 2px 8px}}
.opted{{opacity:.55}}.opted .who::after{{content:" — OPTED OUT, DO NOT CONTACT";color:#8a2b06}}</style>
</head><body><h1>Lead export, {stamp} — INTERNAL AND UNREDACTED</h1>
<p>{len(rows)} leads, newest first. {html.escape(subtitle)}</p>
{chr(10).join(block(l, r) for l, r in zip(kept, rows))}</body></html>""")

    pdf = os.path.join(OUT, f"{stem}.pdf")
    edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if os.path.exists(edge):
        import subprocess
        subprocess.run([edge, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={pdf}", "file:///" + print_path.replace(os.sep, "/")],
                       check=True, timeout=120)
        print(f"wrote {pdf}")
    else:
        print(f"Edge not found; open {print_path} in a browser and print to PDF")

    n_booked = sum(1 for r in rows if r["booked_call_slots"])
    n_replied = sum(1 for r in rows if "They replied" in r["sms_email_trail"])
    print(f"wrote {csv_path}")
    print(f"wrote {html_path}")
    print(f"{len(rows)} leads ({n_booked} with self-booked call slots, {n_replied} with replies, "
          f"{sum(1 for r in rows if r['opted_out'])} opted out)")


if __name__ == "__main__":
    main()
