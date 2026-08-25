"""One-off weekend touchpoints for lead Shalin Chanchani (owner-approved 2026-07-11).
Usage: python scripts/_vip_send_shalin.py {vip|day1}
Sends the sequence step manually (engine blocks weekend-evening/Sunday SMS),
records lead_nurture_sends + advances lead_nurture_state so the cron never double-sends.
Idempotent: skips if the step already has a sent SMS row. Aborts if the lead
is no longer nurturing/active (replied, promoted, opted out).
"""
import json, os, sys
import httpx
from dotenv import load_dotenv

load_dotenv(".env")
load_dotenv("Property/web/.env.local")

LEAD_ID = "83e35f85-b937-497f-ae86-904bc1d41153"
SEQ = "property_contactability"
TO = "+447931315041"
FIRST = "Shalin"
OPTOUT = "Reply STOP to opt out."

STEPS = {
    "vip": {
        "step": 2,
        "next_step": 3,
        # engine will handle step 3 Monday if day1 manual run is missed
        "next_action_at": "2026-07-12 10:00:00+00",
        "body": f"Hi {FIRST}, Property Tax Partners again. Enquiries like yours are exactly what our senior specialists handle, so we have set aside time this week. Reply YES and a specialist will call you. {OPTOUT}",
    },
    "day1": {
        "step": 3,
        "next_step": 4,
        # day2_give_email, Monday late morning (email window opens 08:00 London)
        "next_action_at": "2026-07-13 10:00:00+00",
        "body": f"Hi {FIRST}, following up on your property tax enquiry. We have kept some specialist time free this week for a short call. Reply YES and we will call you. {OPTOUT}",
    },
}

REF = "dhlxwmvmkrfnmcgjbntk"
SQL_URL = f"https://api.supabase.com/v1/projects/{REF}/database/query"
HEADERS = {"Authorization": f"Bearer {os.environ['SUPABASE_ACCESS_TOKEN']}",
           "Content-Type": "application/json", "User-Agent": "claude-admin/1.0"}


def sql(q):
    r = httpx.post(SQL_URL, headers=HEADERS, json={"query": q}, timeout=60)
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:500]}", file=sys.stderr)
        sys.exit(1)
    return r.json()


def main(which):
    cfg = STEPS[which]
    # 1. Safety: lead still nurturing + state active at the expected step
    lead = sql(f"SELECT status FROM leads WHERE id='{LEAD_ID}'")
    state = sql(f"SELECT step,status FROM lead_nurture_state WHERE lead_id='{LEAD_ID}' AND sequence='{SEQ}'")
    if not lead or lead[0]["status"] != "nurturing":
        print(f"ABORT: lead status = {lead and lead[0]['status']} (replied/promoted/opted out?)"); return
    if not state or state[0]["status"] != "active":
        print(f"ABORT: nurture state = {state and state[0]['status']}"); return
    # 2. Idempotency: already sent?
    dup = sql(f"SELECT 1 FROM lead_nurture_sends WHERE lead_id='{LEAD_ID}' AND sequence='{SEQ}' AND step={cfg['step']} AND channel='sms' AND status='sent'")
    if dup:
        print(f"SKIP: step {cfg['step']} SMS already sent"); return
    # 3. Send via Twilio
    sid, tok = os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"]
    r = httpx.post(f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json",
                   auth=(sid, tok), timeout=30,
                   data={"From": os.environ["TWILIO_SMS_FROM"], "To": TO, "Body": cfg["body"]})
    m = r.json()
    if r.status_code not in (200, 201):
        print(f"TWILIO ERROR {r.status_code}: {json.dumps(m)[:500]}", file=sys.stderr); sys.exit(1)
    provider_id = m["sid"]
    print(f"SENT step {cfg['step']} sms -> {TO}, twilio sid {provider_id}, status {m['status']}")
    # 4. Record + advance
    sql(f"""
      INSERT INTO lead_nurture_sends (lead_id, sequence, step, channel, provider_id, status, sent_at)
      VALUES ('{LEAD_ID}','{SEQ}',{cfg['step']},'sms','{provider_id}','sent',now());
      UPDATE lead_nurture_state
      SET step={cfg['next_step']}, next_action_at='{cfg['next_action_at']}',
          last_action_at=now(), updated_at=now()
      WHERE lead_id='{LEAD_ID}' AND sequence='{SEQ}';
    """)
    print(f"STATE advanced to step {cfg['next_step']}, next_action_at {cfg['next_action_at']}")


if __name__ == "__main__":
    main(sys.argv[1])
