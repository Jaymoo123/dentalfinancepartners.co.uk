"""export_raw_leads.py: UNREDACTED lead export for internal handoff.

Writes proposal_engine/out/leads_raw_<date>.csv (and .html for reading): every
lead with full contact details, message, tier, verification/nurture status,
self-booked call slots and inbound replies. PII: out/ is gitignored; never
commit or publish the output. Same env and tables as generate_proposal.py.
"""
import csv
import html
import json
import os
import sys
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
sys.path.insert(0, HERE)
from score_overrides import SCORE_OVERRIDES  # noqa: E402


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
    scores = {s["lead_id"]: s for s in get(
        url, key, "lead_value_scores?select=lead_id,tier,est_value_gbp&limit=5000")}
    for l in leads:
        p = l["id"][:8]
        if l["id"] not in scores and p in SCORE_OVERRIDES:
            t, v = SCORE_OVERRIDES[p][0], SCORE_OVERRIDES[p][1]
            scores[l["id"]] = {"tier": t, "est_value_gbp": v}
    events = get(url, key, "lead_contact_events?select=lead_id,event_type,channel,ts,meta"
                           "&order=ts.asc&limit=10000")
    nstate = {n["lead_id"]: n["status"] for n in get(
        url, key, "lead_nurture_state?select=lead_id,status&limit=5000")}
    sends = get(url, key, "lead_nurture_sends?select=lead_id,channel,step,sent_at,status"
                          "&order=sent_at.asc&limit=10000")

    by_lead = defaultdict(list)
    for ev in events:
        by_lead[ev["lead_id"]].append(ev)
    sends_by_lead = defaultdict(list)
    for s in sends:
        sends_by_lead[s["lead_id"]].append(s)

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
        replies = " | ".join(
            f"[{ev['channel']} {fmt_ts(ev['ts'])}] {(ev.get('meta') or {}).get('body', '').strip()}"
            for ev in evs if ev["event_type"] == "replied")
        verified = "yes" if any(ev["event_type"] == "verify_pass" for ev in evs) else ""
        opted_out = "OPTED OUT" if any(ev["event_type"] == "opted_out" for ev in evs) else ""
        s = scores.get(l["id"])
        rows.append({
            "received": fmt_ts(l["created_at"]),
            "source": l.get("source") or "",
            "tier": (s or {}).get("tier", ""),
            "est_value_gbp": (s or {}).get("est_value_gbp", ""),
            "name": l.get("full_name") or "",
            "email": l.get("email") or "",
            "phone": l.get("phone") or "",
            "role": l.get("role") or "",
            "practice/company": l.get("practice_name") or "",
            "verified": verified,
            "nurture_status": nstate.get(l["id"], ""),
            "opted_out": opted_out,
            "booked_call_slots": booked,
            "replies": replies,
            "message": (l.get("message") or "").strip(),
        })

    os.makedirs(OUT, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    csv_path = os.path.join(OUT, f"leads_raw_{stamp}.csv")
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    cells = "\n".join(
        "<tr>" + "".join(f"<td>{html.escape(str(r[k]))}</td>" for k in rows[0]) + "</tr>"
        for r in rows)
    heads = "".join(f"<th>{html.escape(k)}</th>" for k in rows[0])
    html_path = os.path.join(OUT, f"leads_raw_{stamp}.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(f"""<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<title>Raw lead export {stamp} (INTERNAL, UNREDACTED)</title>
<style>body{{font:12px/1.4 -apple-system,Segoe UI,sans-serif;margin:16px}}
table{{border-collapse:collapse;width:100%}}th,td{{border:1px solid #ddd;padding:4px 6px;
text-align:left;vertical-align:top;max-width:420px}}th{{background:#f2f2f2;position:sticky;top:0}}
tr:nth-child(even){{background:#fafafa}}</style></head><body>
<h1>Raw lead export, {stamp}</h1>
<p><strong>INTERNAL AND UNREDACTED.</strong> {len(rows)} leads, newest first. Do not publish or commit.</p>
<table><thead><tr>{heads}</tr></thead><tbody>{cells}</tbody></table></body></html>""")

    # PDF: stacked per-lead blocks (the wide table does not fit a page), via
    # headless Edge like generate_proposal.py. Layout mirrors the qualified
    # handoff email: enquiry message first, then the chronological SMS/email
    # trail with reply bodies. Tier/value deliberately omitted for readability.
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
            f'<div class="head"><strong>{html.escape(r["received"])}</strong> · '
            f'{html.escape(r["source"])} · {html.escape(flags)}</div>',
            f'<div class="who">{html.escape(who)}</div>',
        ]
        if r["booked_call_slots"]:
            lines.append(f'<div class="booked">BOOKED CALL: {html.escape(r["booked_call_slots"])}</div>')
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

    print_path = os.path.join(OUT, f"leads_raw_{stamp}_print.html")
    with open(print_path, "w", encoding="utf-8") as f:
        f.write(f"""<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<title>Raw lead export {stamp} (INTERNAL, UNREDACTED)</title>
<style>@page{{size:A4;margin:14mm}}body{{font:10.5px/1.45 Segoe UI,sans-serif;color:#1a1a1a}}
h1{{font-size:16px;border-bottom:2px solid #1a1a1a;padding-bottom:4px}}
.lead{{border-bottom:1px solid #ccc;padding:8px 0;break-inside:avoid}}
.head{{color:#555}}.who{{font-weight:600;margin:2px 0;font-size:11.5px}}
.booked{{color:#8a2b06;font-weight:700;margin:2px 0}}
.msg{{margin:4px 0;white-space:pre-wrap;background:#f7f6f3;padding:6px 8px}}
ul.trail{{margin:4px 0 0 0;padding-left:16px;color:#444}}
ul.trail li{{margin:1px 0}}
.body{{white-space:pre-wrap;background:#eef3f7;padding:3px 6px;margin:2px 0 2px 8px}}
.opted{{opacity:.55}}.opted .who::after{{content:" — OPTED OUT, DO NOT CONTACT";color:#8a2b06}}</style>
</head><body><h1>Raw lead export, {stamp} — INTERNAL AND UNREDACTED</h1>
<p>{len(rows)} leads, newest first. Opted-out leads are greyed and must not be contacted.</p>
{chr(10).join(block(l, r) for l, r in zip(kept, rows))}</body></html>""")

    pdf = os.path.join(OUT, f"leads_raw_{stamp}.pdf")
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
    n_replied = sum(1 for r in rows if r["replies"])
    print(f"wrote {csv_path}")
    print(f"wrote {html_path}")
    print(f"{len(rows)} leads ({n_booked} with self-booked call slots, {n_replied} with replies, "
          f"{sum(1 for r in rows if r['opted_out'])} opted out)")


if __name__ == "__main__":
    main()
