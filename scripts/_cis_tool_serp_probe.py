import os, json, httpx
from dotenv import load_dotenv
load_dotenv()
L=os.getenv("DATAFORSEO_API_LOGIN"); P=os.getenv("DATAFORSEO_API_PASSWORD")

QUERIES=[
 # DRC / VAT construction
 "vat domestic reverse charge calculator",
 "construction reverse charge vat calculator",
 "cis reverse charge checker",
 "does domestic reverse charge apply",
 # GPS modeller
 "cis gross payment status calculator",
 "gross payment status turnover calculator",
 # employment status
 "cest calculator construction",
 "subcontractor or employee calculator",
 "am i self employed or employed cis",
 # sole trader vs limited for subbies
 "sole trader vs limited company calculator construction",
 "cis sole trader vs limited company",
 # trade take-home / accountant-for-trade
 "roofer tax calculator",
 "builder take home pay calculator",
 "plumber tax calculator uk",
 "accountant for roofers",
 "accountant for builders",
 # capital allowances / tools / mileage for trades
 "tradesman tools tax calculator",
 "construction mileage tax calculator",
 "cis late filing penalty calculator",
]

def serp(q):
    r=httpx.post("https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
        auth=(L,P),
        json=[{"keyword":q,"location_code":2826,"language_code":"en","device":"desktop","depth":10}],
        timeout=90.0)
    if r.status_code!=200: return {"err":r.status_code,"body":r.text[:200]}
    t=r.json().get("tasks") or []
    if not t or not t[0].get("result"): return {"organic":[]}
    items=t[0]["result"][0].get("items",[])
    org=[{"pos":i.get("rank_absolute"),"dom":(i.get("domain") or ""),"title":(i.get("title") or "")[:55]}
         for i in items if i.get("type")=="organic"]
    return {"organic":org[:8]}

def vol(q):
    r=httpx.post("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
        auth=(L,P), json=[{"keywords":[q],"location_code":2826,"language_code":"en"}], timeout=40.0)
    if r.status_code!=200: return None
    t=r.json().get("tasks") or []
    if not t or not t[0].get("result"): return None
    it=t[0]["result"][0]
    return {"sv":it.get("search_volume"),"comp":it.get("competition")}

out=[]
for q in QUERIES:
    out.append({"q":q,"vol":vol(q),"serp":serp(q)})
print(json.dumps(out,indent=1,default=str))
