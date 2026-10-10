"""Commercial term map: every ranked commercial search filed under the one page that
should rank for it (ranking owner) and the sales page it hands readers to
(conversion page), with our own Search Console impressions and positions.

Usage: python scripts/link_engine/term_map.py --site property --run 2026-10-10
Inputs: stages/06_families.csv, 05_clusters.csv, 03_gsc_query_page.csv,
accuracy/D_intent.csv, sites/<site>.json (destinations).
Outputs: TERM_MAP.md and TERM_MAP.csv in the run folder. Cost: free (no API calls).
"""
import argparse
import csv,collections,re,json,sys
ap=argparse.ArgumentParser();ap.add_argument('--site',required=True);ap.add_argument('--run',required=True);a=ap.parse_args()
from pathlib import Path
REPO=Path(__file__).resolve().parents[2]
B=str(REPO/'docs'/a.site/'link_engine'/a.run)+'/'
def n(q): return re.sub(r'\s+',' ',re.sub(r'[^\w\s-]','',q.lower())).strip()
fam={r['family_id']:r for r in csv.DictReader(open(B+'stages/06_families.csv'))}
ranked={f:r for f,r in fam.items() if r.get('rank','').isdigit()}
cl=collections.defaultdict(list)
for r in csv.DictReader(open(B+'stages/05_clusters.csv')): cl[r['family_id']].append(r)
gsc=collections.defaultdict(lambda:[0,0.0]); gpage=collections.defaultdict(collections.Counter)
for r in csv.DictReader(open(B+'stages/03_gsc_query_page.csv')):
    q=n(r['query']); i=int(r['impressions']); gsc[q][0]+=i; gsc[q][1]+=i*float(r['position'])
    gpage[q][re.sub(r'https?://[^/]+','',r['page']).rstrip('/') or '/']+=i
D={r['family_id']:r for r in csv.DictReader(open(B+'accuracy/D_intent.csv'))} if True else {}
pages=collections.defaultdict(list)
for f,r in ranked.items(): pages[r['owner_page']].append(r)
PILLARS={'/section-24','/landlord-tax','/incorporation','/making-tax-digital-landlords','/leasehold','/landlord-compliance','/spv-company'}  # LE-16 topic pillars are guides
def ptype(o): return 'gap' if o.startswith('GAP') else ('guide' if o.startswith('/blog/') or o in PILLARS else 'sales')
order=sorted(pages,key=lambda o:-sum(float(r['demand_volume'] or 0) for r in pages[o]))
rows=[]; L=["# Commercial term map: Property (run 2026-10-10)","",
"Every commercial search in the map, grouped under the one page that should rank for it. Searches per month are Google Ads figures with close variants counted once per group (a wording's own figure may be shared with its variants). Impressions and position are our own Search Console data, 90 days to 2026-10-07 (before the 9 October service page rewrite). 'Google shows' is the page type Google ranks for the main search in the live top 10 pulled 2026-10-10.","",
f"**{len([o for o in order if ptype(o)!='gap'])} money pages** ({len([o for o in order if ptype(o)=='sales'])} sales pages, {len([o for o in order if ptype(o)=='guide'])} guides) plus {len([o for o in order if ptype(o)=='gap'])} gap groups own {sum(int(float(r['demand_volume'] or 0)) for r in ranked.values()):,} searches a month across {len(ranked)} search groups.","",
"## Summary","","| # | Page | Type | Searches/month | Wordings | Our impressions on these searches | Share shown on this page | Who Google shows us instead |","|---|---|---|---|---|---|---|---|"]
for i,o in enumerate(order,1):
    fs=pages[o]; dem=sum(int(float(r['demand_volume'] or 0)) for r in fs)
    kws=[k for r in fs for k in cl[r['family_id']]]
    tot=collections.Counter()
    for k in kws: tot.update(gpage[n(k['keyword'])])
    t=sum(tot.values()); mine=tot.get(o,0)
    others='; '.join(f"{p.split('/')[-1] or p} ({v})" for p,v in tot.most_common(4) if p!=o)[:160]
    L.append(f"| {i} | {o} | {ptype(o)} | {dem:,} | {len(kws)} | {t:,} | {(mine*100//t) if t else 0}% | {others} |")
L+=["","## Page by page",""]
for o in order:
    fs=sorted(pages[o],key=lambda r:-float(r['demand_volume'] or 0))
    L+=[f"### {o} ({ptype(o)}, {sum(int(float(r['demand_volume'] or 0)) for r in fs):,} searches/month)",""]
    for r in fs:
        d=D.get(r['family_id'],{})
        gs=d.get('dominant','') or d.get('dominant_type','')
        conv=r.get('conversion_page') or o
        L.append(f"**{r['head']}**: {int(float(r['demand_volume'] or 0)):,}/month"+(f", hands readers to {conv}" if conv!=o else '')+f", ${float(r['value_usd_month'] or 0):,.0f} ad value, decided by {r['owner_basis']}"+(f", Google shows mostly {gs}" if gs else '')+(" **(Google prefers guides here)**" if d.get('flag')=='mismatch' and ptype(o)=='sales' else ''))
        L+=["","| Wording | Searches/month | Our impressions | Our avg position | Our page shown most |","|---|---|---|---|---|"]
        for k in sorted(cl[r['family_id']],key=lambda k:-int(k['volume'] or 0)):
            q=n(k['keyword']); im,ps=gsc.get(q,[0,0]); top=gpage[q].most_common(1)
            L.append(f"| {k['keyword']} | {int(k['volume'] or 0):,} | {im:,} | {ps/im:.1f} | {top[0][0] if top else ''} |" if im else f"| {k['keyword']} | {int(k['volume'] or 0):,} | 0 | | |")
            rows.append({'owner_page':o,'conversion_page':r.get('conversion_page') or o,'page_type':ptype(o),'family_id':r['family_id'],'family_head':r['head'],'wording':k['keyword'],'searches_month':k['volume'],'cpc_usd':k['cpc'],'our_impressions_90d':im,'our_avg_position':round(ps/im,1) if im else '','our_page_shown_most':top[0][0] if top else '','owner_basis':r['owner_basis'],'google_prefers_guides':d.get('flag')=='mismatch'})
        L.append("")
dests=json.load(open(REPO/'scripts'/'link_engine'/'sites'/(a.site+'.json')))['link_engine'].get('destinations',[])
none=[d for d in dests if d not in pages]
L+=["## Sales pages that own no measurable commercial search",""," These exist (built for audiences) but no priced commercial search maps to them. Question, not finding: either people do not search these exact phrases (the page converts readers sent from guides) or our list misses their wordings.",""]+[f"- {d}" for d in none]
open(B+'TERM_MAP.md','w').write('\n'.join(L)+'\n')
with open(B+'TERM_MAP.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
print(len(order),'pages',len(rows),'wordings; none-owning:',len(none)); print('\n'.join(L[6:12+len(order)]))
