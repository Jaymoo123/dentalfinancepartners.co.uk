import os, httpx, json
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
load_dotenv()
TOKEN=os.getenv("SUPABASE_ACCESS_TOKEN")
URL="https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
def sql(q):
    r=httpx.post(URL,headers={"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json","User-Agent":"x"},json={"query":q},timeout=60)
    r.raise_for_status(); return r.json()

# Reproduce the console KpiWindowCarousel windows for property (GB default, then ALL)
windows = [
    ("Daily (today since 00:00 UTC)", "date_trunc('day', now())", "now()"),
    ("Weekly (last 7d)",  "now() - interval '7 days'",  "now()"),
    ("Monthly (last 30d)","now() - interval '30 days'", "now()"),
]
for country in ("GB","ALL"):
    cfilter = "" if country=="ALL" else f"and country='{country}'"
    print(f"\n##### country={country} #####")
    print(f"{'window':<34}{'sessions':>9}{'humans':>8}{'leads_all':>10}{'leads_uk':>9}")
    for lbl, frm, to in windows:
        q=f"""
        with win as (
          select session_id, visitor_id, (lead_id is not null) conv
          from web_sessions
          where site_key='property' and is_bot=false
            and started_at >= {frm} and started_at < {to} {cfilter}
        ),
        ld as (
          select count(*) la,
                 count(*) filter (where exists(
                    select 1 from web_sessions ws where (ws.session_id=l.session_id or ws.visitor_id=l.visitor_id) and ws.country='GB'
                 )) lu
          from leads l
          where l.source='property' and l.created_at >= {frm} and l.created_at < {to}
        )
        select (select count(distinct session_id) from win) sessions,
               (select count(distinct visitor_id) from win) humans,
               (select la from ld) leads_all,
               (select lu from ld) leads_uk
        """
        r=sql(q)[0]
        print(f"{lbl:<34}{r['sessions']:>9}{r['humans']:>8}{r['leads_all']:>10}{r['leads_uk']:>9}")

# Also the current UTC time so we know how partial 'today' is
print("\nServer now (UTC):", sql("select now() at time zone 'UTC' as n")[0]['n'])
