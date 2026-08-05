"""One-off verification of 5 claims re property leads/sessions. READ-ONLY.
Reuses the _sql() pattern from scripts/property_commercial_baseline.py.
"""
from __future__ import annotations
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

import httpx

SUPABASE_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"


def _sql(query: str) -> list[dict]:
    token = os.getenv("SUPABASE_ACCESS_TOKEN", "")
    r = httpx.post(SUPABASE_URL,
                   headers={"Authorization": f"Bearer {token}",
                            "Content-Type": "application/json",
                            "User-Agent": "prop-audit-verify/1.0"},
                   json={"query": query}, timeout=90.0)
    r.raise_for_status()
    return r.json()


out: dict = {}

# ---------- 1. LEAD ENTRY PATHS ----------
entry_bucket_case = """
  case
    when s.entry_path is null then 'unattributed (no session)'
    when s.entry_path = '/' then 'homepage'
    when s.entry_path like '/blog/%' then 'blog'
    when s.entry_path like '/services%' or s.entry_path like '/incorporation%'
         or s.entry_path like '/calculators%' then 'service-ish'
    else 'other'
  end
"""

out["1_entry_paths_inner_join_all_time"] = _sql(f"""
    select {entry_bucket_case} bucket, count(*) leads
    from leads l join web_sessions s on s.lead_id = l.id
    where l.source='property'
    group by 1 order by leads desc""")

out["1_entry_paths_left_join_all_time"] = _sql(f"""
    select {entry_bucket_case} bucket, count(*) leads
    from leads l left join web_sessions s on s.lead_id = l.id
    where l.source='property'
    group by 1 order by leads desc""")

out["1_entry_paths_left_join_90d"] = _sql(f"""
    select {entry_bucket_case} bucket, count(*) leads
    from leads l left join web_sessions s on s.lead_id = l.id
    where l.source='property' and l.created_at > now() - interval '90 days'
    group by 1 order by leads desc""")

out["1_inner_vs_left_dropped_count"] = _sql("""
    select
      (select count(*) from leads where source='property') total_property_leads,
      (select count(*) from leads l join web_sessions s on s.lead_id=l.id
         where l.source='property') inner_join_leads,
      (select count(*) from leads l left join web_sessions s on s.lead_id=l.id
         where l.source='property' and s.lead_id is null) leads_with_no_session
""")

out["1_top10_blog_entry_paths"] = _sql("""
    select s.entry_path, count(*) leads
    from leads l join web_sessions s on s.lead_id = l.id
    where l.source='property' and s.entry_path like '/blog/%'
    group by 1 order by leads desc limit 10""")

# ---------- 2. JULY SESSIONS RECONCILE ----------
out["2_july_reconcile"] = _sql("""
    select
      count(*) filter (where true) as total_rows,
      count(*) filter (where coalesce(is_bot,false)=false) as not_bot,
      count(*) filter (where coalesce(is_bot,false)=false and coalesce(is_embed,false)=false) as not_bot_not_embed,
      count(*) filter (where coalesce(engaged_ms,0) > 10000) as engaged_all_rows,
      count(*) filter (where coalesce(is_bot,false)=false and coalesce(engaged_ms,0) > 10000) as engaged_not_bot,
      count(*) filter (where coalesce(is_bot,false)=false and coalesce(is_embed,false)=false
                        and coalesce(engaged_ms,0) > 10000) as engaged_not_bot_not_embed,
      count(*) filter (where coalesce(is_bot,false)=true) as bot_rows
    from web_sessions
    where site_key='property'
      and started_at >= '2026-07-01' and started_at < '2026-08-01'
""")

# ---------- 3. JULY CHANNEL TABLE ----------
out["3_july_sessions_by_host"] = _sql("""
    select coalesce(nullif(referrer_host,''),'(direct)') host, count(*) sessions
    from web_sessions
    where site_key='property' and coalesce(is_bot,false)=false and coalesce(is_embed,false)=false
      and started_at >= '2026-07-01' and started_at < '2026-08-01'
    group by 1 order by sessions desc
""")

out["3_july_leads_by_host"] = _sql("""
    select coalesce(nullif(s.referrer_host,''),'(direct/unknown)') host, count(*) leads
    from leads l left join web_sessions s on s.lead_id = l.id
    where l.source='property' and l.created_at >= '2026-07-01' and l.created_at < '2026-08-01'
    group by 1 order by leads desc
""")

out["3_july_leads_total"] = _sql("""
    select count(*) n from leads
    where source='property' and created_at >= '2026-07-01' and created_at < '2026-08-01'
""")

# ---------- 4. AI REFERRERS ----------
out["4_ai_referrer_sessions_by_month"] = _sql("""
    select date_trunc('month', started_at)::date m,
           referrer_host, count(*) sessions
    from web_sessions
    where site_key='property' and coalesce(is_bot,false)=false and coalesce(is_embed,false)=false
      and referrer_host in ('chatgpt.com','copilot.microsoft.com','www.perplexity.ai','perplexity.ai',
                             'claude.ai','gemini.google.com')
      and started_at >= '2026-06-01' and started_at < '2026-08-01'
    group by 1,2 order by 1,2
""")

out["4_ai_referrer_leads_by_month"] = _sql("""
    select date_trunc('month', l.created_at)::date m,
           s.referrer_host, count(*) leads
    from leads l join web_sessions s on s.lead_id = l.id
    where l.source='property'
      and s.referrer_host in ('chatgpt.com','copilot.microsoft.com','www.perplexity.ai','perplexity.ai',
                               'claude.ai','gemini.google.com')
      and l.created_at >= '2026-06-01' and l.created_at < '2026-08-01'
    group by 1,2 order by 1,2
""")

out["4_july_sitewide_rate_denominator"] = _sql("""
    select count(*) sessions
    from web_sessions
    where site_key='property' and coalesce(is_bot,false)=false and coalesce(is_embed,false)=false
      and started_at >= '2026-07-01' and started_at < '2026-08-01'
""")

# ---------- 5. LEADS BY MONTH ----------
out["5_property_leads_by_month"] = _sql("""
    select date_trunc('month', created_at)::date m, count(*) n
    from leads where source='property' and created_at >= '2026-03-01'
    group by 1 order by 1
""")

out["5_other_sites_leads_july"] = _sql("""
    select source, count(*) n
    from leads
    where source <> 'property' and source <> 'test'
      and created_at >= '2026-07-01' and created_at < '2026-08-01'
    group by 1 order by n desc
""")

out["5_other_sites_leads_july_total"] = _sql("""
    select count(*) n
    from leads
    where source <> 'property' and source <> 'test'
      and created_at >= '2026-07-01' and created_at < '2026-08-01'
""")

out_path = os.path.join(ROOT, "expansion_research", "_prop_audit_2026_08_05", "supabase_leads_sessions.json")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as fh:
    json.dump(out, fh, indent=1, default=str)
print(f"wrote {out_path}")
for k, v in out.items():
    print(f"\n=== {k} ===")
    print(json.dumps(v, indent=1, default=str)[:2000])
