"""Score all unscored, non-test leads into lead_value_scores.

Mirrors Property/web/src/lib/leads/value-score.ts (same system prompt, same
schema, same data minimisation: no name/email/phone sent to the model).
Idempotent: PostgREST insert with ignore-duplicates on lead_id.

Usage (repo root): python scripts/score_unscored_leads.py [--dry-run]
Needs SUPABASE_URL + SUPABASE_KEY (service role) + ANTHROPIC_API_KEY in .env.
"""
import json
import sys
import urllib.request
import urllib.parse

from pydantic import BaseModel
from typing import Literal
import anthropic


def env(*names):
    vals = {}
    for line in open(".env", encoding="utf-8"):
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip()
    for n in names:
        v = vals.get(n)
        if v:
            return v
    sys.exit(f"missing env: {names}")


SUPABASE_URL = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
SUPABASE_KEY = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")


def rest(path, method="GET", body=None, prefer=None):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/{path}",
        data=json.dumps(body).encode() if body is not None else None,
        headers=headers,
        method=method,
    )
    with urllib.request.urlopen(req) as r:
        text = r.read().decode()
        return json.loads(text) if text else None


class Score(BaseModel):
    tier: Literal["very_high", "high", "medium", "low"]
    est_value_gbp: int
    intent: Literal[
        "incorporation", "structure", "cgt", "sdlt", "compliance",
        "nrl_expat", "vat", "other", "unknown",
    ]
    work_type: Literal["recurring", "project", "one_off", "none", "unknown"]
    confidence: Literal["high", "medium", "low"]
    rationale: str


# Verbatim from Property/web/src/lib/leads/value-score.ts so manual and auto
# scores are comparable.
SYSTEM = """You triage inbound leads for UK accountancy firms specialising in tax
(property landlords, dentists, solicitors, contractors, small businesses). Estimate the
first-year engagement value of each lead IF WON, from what the lead says about their
position. Be conservative; never inflate.

Tiers and typical first-year fees:
- very_high: large portfolio / GBP 1m+ incorporation / trading business needing multi-entity
  accounts. GBP 3,000+/yr recurring or GBP 5,000+ one-off project. est_value_gbp 5000-10000.
- high: GBP 1,000-3,000/yr recurring. Multi-property landlords weighing incorporation,
  new SPVs with growth plans, complex disposals needing specialist project work.
- medium: GBP 300-1,500. One-off advisory (CGT computation, SDLT question, Form 17,
  ownership restructure) or small recurring work (single-property Ltd accounts, SA + MTD).
- low: vague one-liners, email-only captures, empty messages, non-client work (form
  requests, complaints, questions outside accountancy). est_value_gbp 0-100.

intent: the dominant topic. structure = ownership/SPV/LLP/splits short of full portfolio
incorporation; incorporation = moving property/business into a company; nrl_expat =
non-resident landlord / expat issues; compliance = SA/MTD/accounts/bookkeeping.
work_type: recurring = would become an ongoing client; project = large one-time engagement;
one_off = single piece of advisory; none = no billable work.
confidence: low for thin/one-line/ambiguous messages, high only when the lead gives
concrete facts (property counts, values, structures, deadlines).
rationale: one short sentence quoting the decisive facts."""

WIDGET_FORM_IDS = {
    "exit_intent", "exit_intent_form", "inline_mini", "calc_result",
    "calc_result_gate", "mobile_tool", "resource_block", "specialist_widget",
}


def derive_channel(lead):
    fid = (lead.get("extras") or {}).get("form_id")
    if isinstance(fid, str) and fid in WIDGET_FORM_IDS:
        return "widget"
    msg = (lead.get("message") or "").strip().lower()
    if msg.startswith("[") and any(
        msg.startswith(f"[{p}") for p in
        ("exit intent", "inline mini-form", "result gate", "mobile tool", "specialist question")
    ):
        return "widget"
    return "form"


def main():
    dry = "--dry-run" in sys.argv
    scored = {r["lead_id"] for r in rest("lead_value_scores?select=lead_id&limit=5000")}
    leads = rest(
        "leads?select=id,role,message,source,source_url,extras,is_test"
        "&is_test=eq.false&source=neq.test&order=created_at.asc&limit=5000"
    )
    todo = [l for l in leads if l["id"] not in scored]
    print(f"{len(todo)} unscored leads (of {len(leads)} total)")
    if dry or not todo:
        for l in todo:
            print(" ", l["id"][:8], l.get("source"))
        return

    client = anthropic.Anthropic(api_key=env("ANTHROPIC_API_KEY"))
    rows = []
    for i, lead in enumerate(todo, 1):
        payload = {
            "site": lead.get("source") or "unknown",
            "role_selected": lead.get("role"),
            "message": (lead.get("message") or "")[:4000],
            "source_page": lead.get("source_url"),
            "role_detail": (lead.get("extras") or {}).get("role_detail"),
        }
        resp = client.messages.parse(
            model="claude-opus-5",
            max_tokens=2048,
            system=[{"type": "text", "text": SYSTEM, "cache_control": {"type": "ephemeral"}}],
            messages=[{"role": "user", "content": json.dumps(payload)}],
            output_format=Score,
        )
        if resp.stop_reason == "refusal":
            print(f"  {lead['id'][:8]} refused, skipping")
            continue
        s = resp.parsed_output
        rows.append({
            "lead_id": lead["id"],
            "tier": s.tier,
            "est_value_gbp": max(0, min(20000, s.est_value_gbp)),
            "intent": s.intent,
            "work_type": s.work_type,
            "channel": derive_channel(lead),
            "confidence": s.confidence,
            "rationale": s.rationale[:200],
            "scored_by": "claude_manual",
        })
        print(f"  {i}/{len(todo)} {lead['id'][:8]} {lead.get('source')}: {s.tier} £{s.est_value_gbp}")

    if rows:
        rest(
            "lead_value_scores?on_conflict=lead_id",
            method="POST",
            body=rows,
            prefer="resolution=ignore-duplicates,return=minimal",
        )
        print(f"inserted {len(rows)} scores")


if __name__ == "__main__":
    main()
