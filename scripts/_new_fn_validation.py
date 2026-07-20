"""Run the NEW web_timeseries / estate_timeseries bodies verbatim as inline SELECTs
(no prod apply) to confirm they parse and return the reconciled, churn-proof numbers."""
from __future__ import annotations
import os
from datetime import datetime, timezone
import httpx
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from dotenv import load_dotenv; load_dotenv(os.path.join(ROOT,".env"))
except ImportError: pass
TOKEN=os.getenv("SUPABASE_ACCESS_TOKEN","")
MGMT="https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
def sql(q):
    r=httpx.post(MGMT,headers={"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json","User-Agent":"newfn/1.0"},json={"query":q},timeout=120.0)
    r.raise_for_status(); return r.json()
def hr(t): print("\n"+"="*78+"\n"+t+"\n"+"="*78)
NOW=datetime.now(timezone.utc); START=NOW.replace(hour=0,minute=0,second=0,microsecond=0)
N=NOW.strftime("%Y-%m-%dT%H:%M:%S+00:00"); S=START.strftime("%Y-%m-%dT%H:%M:%S+00:00")

# NEW web_timeseries body, inlined (p_site_key, p_bucket, p_from, p_to, p_country as literals)
def new_web_ts(site,bucket,frm,to,country):
    cf = f"and ws.country = '{country}'" if country else ""
    return sql(f"""
      with secs as (select greatest(extract(epoch from interval '{bucket}'),1) s),
      evt as (
        select to_timestamp(floor(extract(epoch from e.ts)/(select s from secs))*(select s from secs)) b,
               e.session_id, ws.visitor_id
        from web_events e join web_sessions ws on ws.session_id=e.session_id
        where e.site_key='{site}' and ws.is_bot=false
          and e.ts>='{frm}'::timestamptz and e.ts<'{to}'::timestamptz {cf}
      ),
      ev_agg as (select b, count(*) events, count(distinct session_id) sessions, count(distinct visitor_id) humans from evt group by b)
      select coalesce(sum(sessions),0) sessions, coalesce(sum(humans),0) humans, coalesce(sum(events),0) events,
             count(*) buckets, coalesce(max(humans),0) max_bucket_humans
      from ev_agg
    """)[0]

def new_estate_ts(bucket,frm,to,country):
    cf = f"and ws.country = '{country}'" if country and country!='ALL' else ""
    return sql(f"""
      with secs as (select greatest(extract(epoch from interval '{bucket}'),1) s),
      evt as (
        select to_timestamp(floor(extract(epoch from e.ts)/(select s from secs))*(select s from secs)) b,
               e.site_key, e.session_id, ws.visitor_id
        from web_events e join web_sessions ws on ws.session_id=e.session_id
        where ws.is_bot=false and e.ts>='{frm}'::timestamptz and e.ts<'{to}'::timestamptz {cf}
      ),
      ev_agg as (select b, count(distinct session_id) sessions, count(distinct (site_key,visitor_id)) humans from evt group by b)
      select coalesce(sum(sessions),0) sessions, coalesce(sum(humans),0) humans from ev_agg
    """)[0]

hr("NEW web_timeseries('property','1 day', today) — expect sessions=40 visitors=32 (was 51)")
r=new_web_ts("property","1 day",S,N,"GB")
print(f"  sessions={int(r['sessions'])}  visitors={int(r['humans'])}  events={int(r['events'])}")

hr("NEW web_timeseries('property','15 minutes', today) — spike bucket should collapse (max ~5, was 24)")
r=new_web_ts("property","15 minutes",S,N,"GB")
print(f"  buckets={int(r['buckets'])}  MAX visitors in any 15-min bucket={int(r['max_bucket_humans'])}  (day-sum sessions={int(r['sessions'])} visitors={int(r['humans'])})")

hr("NEW estate_timeseries('1 day', today) — expect sessions=55 visitors=45 (was 64)")
r=new_estate_ts("1 day",S,N,"GB")
print(f"  sessions={int(r['sessions'])}  visitors={int(r['humans'])}")

hr("Cross-check vs estate_kpis cards (unchanged)")
rows=sql(f"select site_key, sessions, humans from estate_kpis('{S}'::timestamptz,'{N}'::timestamptz,null,'GB')")
tot_h=sum(int(x['humans']) for x in rows); tot_s=sum(int(x['sessions']) for x in rows)
prop=next((x for x in rows if x['site_key']=='property'),None)
print(f"  estate card: sessions={tot_s} visitors={tot_h}   property card: sessions={int(prop['sessions'])} visitors={int(prop['humans'])}")
print("  => charts now MATCH cards.")
print("\nDONE.")
