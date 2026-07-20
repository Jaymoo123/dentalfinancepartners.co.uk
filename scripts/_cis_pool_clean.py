import json, re, sys
from collections import defaultdict, Counter

STOPWORDS = {'for','a','as','the','of','to','in','an','and','or','with','your',
             'my','you','i','is','it','its','be','do','does','from','on','by',
             'how','what','when','where','why','which','who'}

def singularize(w):
    if len(w) > 5 and w.endswith('ing'): return w[:-3]
    if len(w) > 5 and w.endswith('es'):  return w[:-2]
    if len(w) > 4 and w.endswith('s'):   return w[:-1]
    return w

def fingerprint(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9 ]', ' ', text)
    tokens = [singularize(t) for t in text.split() if t not in STOPWORDS and len(t) > 1]
    return tuple(sorted(set(tokens)))

# load
with open('expansion_research/tier1_trade/topic_pool_final.json') as f:
    pool = json.load(f)

clusters = pool['clusters']
print(f"INPUT: {len(clusters)} clusters")

# collapse
groups = defaultdict(list)
for c in clusters:
    fp = fingerprint(c['head'])
    groups[fp].append(c)

def merge_group(cs):
    def vol(c): return c['volume'] if c['volume'] is not None else -1
    cs_sorted = sorted(cs, key=vol, reverse=True)
    canon = cs_sorted[0]
    if len(cs) == 1:
        return canon
    merged_members = list(canon['members'])
    for c in cs_sorted[1:]:
        for m in c['members']:
            if m not in merged_members:
                merged_members.append(m)
        if c['head'] not in merged_members:
            merged_members.append(c['head'])
    max_vol = max((c['volume'] for c in cs if c['volume'] is not None), default=None)
    min_kd  = min((c['kd']     for c in cs if c['kd']     is not None), default=None)
    merged_sources = list({s for c in cs for s in c['sources']})
    return {
        'head':     canon['head'],
        'members':  merged_members,
        'volume':   max_vol,
        'kd':       min_kd,
        'sources':  merged_sources,
        'category': canon['category'],
        'priority': canon['priority'],
    }

collapsed = []
merge_log = []
for fp, cs in groups.items():
    merged = merge_group(cs)
    collapsed.append(merged)
    if len(cs) > 1:
        merge_log.append((merged['head'], len(cs)))

merge_log.sort(key=lambda x: x[1], reverse=True)
print(f"AFTER COLLAPSE: {len(collapsed)} clusters")
print(f"Top 5 merges:")
for head, n in merge_log[:5]:
    print(f"  {n} folded -> '{head}'")

# live slugs
SITEMAP_URLS = [
"https://www.tradetaxspecialists.co.uk",
"https://www.tradetaxspecialists.co.uk/services",
"https://www.tradetaxspecialists.co.uk/cis-refund",
"https://www.tradetaxspecialists.co.uk/gross-payment-status",
"https://www.tradetaxspecialists.co.uk/for",
"https://www.tradetaxspecialists.co.uk/blog",
"https://www.tradetaxspecialists.co.uk/calculators",
"https://www.tradetaxspecialists.co.uk/about",
"https://www.tradetaxspecialists.co.uk/contact",
"https://www.tradetaxspecialists.co.uk/privacy-policy",
"https://www.tradetaxspecialists.co.uk/terms",
"https://www.tradetaxspecialists.co.uk/cookie-policy",
"https://www.tradetaxspecialists.co.uk/glossary",
"https://www.tradetaxspecialists.co.uk/locations",
"https://www.tradetaxspecialists.co.uk/research",
"https://www.tradetaxspecialists.co.uk/research/uk-construction-index",
"https://www.tradetaxspecialists.co.uk/for/plumbers",
"https://www.tradetaxspecialists.co.uk/for/electricians",
"https://www.tradetaxspecialists.co.uk/for/joiners",
"https://www.tradetaxspecialists.co.uk/for/groundworkers",
"https://www.tradetaxspecialists.co.uk/for/roofers",
"https://www.tradetaxspecialists.co.uk/for/builders",
"https://www.tradetaxspecialists.co.uk/for/gas-engineers",
"https://www.tradetaxspecialists.co.uk/for/painters-decorators",
"https://www.tradetaxspecialists.co.uk/for/scaffolders",
"https://www.tradetaxspecialists.co.uk/for/civil-engineers",
"https://www.tradetaxspecialists.co.uk/for/bricklayers",
"https://www.tradetaxspecialists.co.uk/for/plasterers",
"https://www.tradetaxspecialists.co.uk/for/labourers",
"https://www.tradetaxspecialists.co.uk/for/demolition-contractors",
"https://www.tradetaxspecialists.co.uk/for/dryliners",
"https://www.tradetaxspecialists.co.uk/for/carpenters",
"https://www.tradetaxspecialists.co.uk/for/tilers",
"https://www.tradetaxspecialists.co.uk/for/glaziers",
"https://www.tradetaxspecialists.co.uk/for/steel-fixers",
"https://www.tradetaxspecialists.co.uk/for/ceiling-fixers",
"https://www.tradetaxspecialists.co.uk/for/flooring-contractors",
"https://www.tradetaxspecialists.co.uk/for/heating-engineers",
"https://www.tradetaxspecialists.co.uk/for/kitchen-fitters",
"https://www.tradetaxspecialists.co.uk/for/bathroom-fitters",
"https://www.tradetaxspecialists.co.uk/for/window-installers",
"https://www.tradetaxspecialists.co.uk/for/insulation-installers",
"https://www.tradetaxspecialists.co.uk/for/steel-erectors",
"https://www.tradetaxspecialists.co.uk/for/shopfitters",
"https://www.tradetaxspecialists.co.uk/for/fencing-contractors",
"https://www.tradetaxspecialists.co.uk/for/landscapers",
"https://www.tradetaxspecialists.co.uk/for/plant-operators",
"https://www.tradetaxspecialists.co.uk/for/drainage-contractors",
"https://www.tradetaxspecialists.co.uk/for/cladding-installers",
"https://www.tradetaxspecialists.co.uk/for/paving-contractors",
"https://www.tradetaxspecialists.co.uk/for/welder-fabricators",
"https://www.tradetaxspecialists.co.uk/for/main-contractors",
"https://www.tradetaxspecialists.co.uk/for/subcontracting-limited-companies",
"https://www.tradetaxspecialists.co.uk/for/property-developers",
"https://www.tradetaxspecialists.co.uk/for/housebuilders",
"https://www.tradetaxspecialists.co.uk/for/labour-agencies",
"https://www.tradetaxspecialists.co.uk/for/civil-engineering-firms",
"https://www.tradetaxspecialists.co.uk/for/mechanical-electrical-contractors",
"https://www.tradetaxspecialists.co.uk/for/maintenance-and-fm-companies",
"https://www.tradetaxspecialists.co.uk/for/plant-hire-companies",
"https://www.tradetaxspecialists.co.uk/for/multi-trade-building-firms",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds",
"https://www.tradetaxspecialists.co.uk/blog/vat-and-mtd",
"https://www.tradetaxspecialists.co.uk/blog/limited-company",
"https://www.tradetaxspecialists.co.uk/blog/expenses",
"https://www.tradetaxspecialists.co.uk/blog/expenses/allowable-expenses-cis-subcontractor",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/best-cis-accounting-software",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-and-mortgages",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-april-2026-rule-changes",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds/cis-back-years-refund-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-contractor-registration-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-deadline-calendar-2026-27",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-deduction-rates-explained",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-employment-status-self-employed-test",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-for-contractors-monthly-responsibilities",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/cis-for-housebuilders",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/cis-for-labour-agencies",
"https://www.tradetaxspecialists.co.uk/blog/limited-company/cis-for-limited-companies-eps-reclaim",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-for-partnerships",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/cis-for-property-developers",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-gross-payment-status-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-invoice-splitting-labour-materials",
"https://www.tradetaxspecialists.co.uk/blog/limited-company/cis-limited-company-directors-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/cis-limited-company-reclaim",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-mistakes-that-cost-subcontractors",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-monthly-return-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-national-insurance-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-nil-return-explained",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-payment-deduction-statements-guide",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/cis-payroll-software-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-penalties-and-appeals",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/cis-plant-hire-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-record-keeping-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-retention-payments-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds/cis-self-assessment-complete-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-sole-trader-vs-limited-company",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-subcontractor-verification",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/cis-supply-chain-compliance-due-diligence",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds/cis-tax-refund-how-to-claim",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-vs-paye-complete-comparison",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/cis-vs-paye",
"https://www.tradetaxspecialists.co.uk/blog/cis-advanced/citb-levy-explained",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/deemed-contractors-explained",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/free-cis-payroll-software",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/freeagent-cis-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-compliance/gross-payment-status-cash-flow-guide",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds/how-long-does-cis-refund-take",
"https://www.tradetaxspecialists.co.uk/blog/cis-refunds/how-much-cis-refund-will-i-get",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/how-to-register-for-cis",
"https://www.tradetaxspecialists.co.uk/blog/vat-and-mtd/mtd-income-tax-cis",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/quickbooks-cis-guide",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/sage-cis-guide",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/spreadsheets-vs-accounting-software-cis",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/switching-cis-accountant-guide",
"https://www.tradetaxspecialists.co.uk/blog/vat-and-mtd/vat-reverse-charge-construction",
"https://www.tradetaxspecialists.co.uk/blog/vat-and-mtd/vat-reverse-charge-for-cis-contractors",
"https://www.tradetaxspecialists.co.uk/blog/vat-and-mtd/vat-reverse-charge-for-cis-subcontractors",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/what-construction-work-is-not-cis",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/what-is-a-cis-accountant",
"https://www.tradetaxspecialists.co.uk/blog/cis-basics/what-is-cis",
"https://www.tradetaxspecialists.co.uk/blog/software-and-tools/xero-cis-guide",
"https://www.tradetaxspecialists.co.uk/calculators/cis-deduction-calculator",
"https://www.tradetaxspecialists.co.uk/calculators/cis-gps-eligibility-checker",
"https://www.tradetaxspecialists.co.uk/calculators/cis-refund-estimator",
"https://www.tradetaxspecialists.co.uk/calculators/cis-self-assessment-calculator",
"https://www.tradetaxspecialists.co.uk/calculators/cis-take-home-calculator",
"https://www.tradetaxspecialists.co.uk/calculators/cis-invoice-splitter",
"https://www.tradetaxspecialists.co.uk/calculators/cis-vs-paye-comparison",
"https://www.tradetaxspecialists.co.uk/calculators/cis-back-years-calculator",
"https://www.tradetaxspecialists.co.uk/glossary/cis",
"https://www.tradetaxspecialists.co.uk/glossary/contractor",
"https://www.tradetaxspecialists.co.uk/glossary/subcontractor",
"https://www.tradetaxspecialists.co.uk/glossary/deemed-contractor",
"https://www.tradetaxspecialists.co.uk/glossary/construction-operations",
"https://www.tradetaxspecialists.co.uk/glossary/cis-registration",
"https://www.tradetaxspecialists.co.uk/glossary/utr",
"https://www.tradetaxspecialists.co.uk/glossary/hmrc-cis-online-service",
"https://www.tradetaxspecialists.co.uk/glossary/cis-deduction",
"https://www.tradetaxspecialists.co.uk/glossary/deduction-rates",
"https://www.tradetaxspecialists.co.uk/glossary/labour-only-deduction-base",
"https://www.tradetaxspecialists.co.uk/glossary/materials-deduction",
"https://www.tradetaxspecialists.co.uk/glossary/verification-number",
"https://www.tradetaxspecialists.co.uk/glossary/payment-and-deduction-statement",
"https://www.tradetaxspecialists.co.uk/glossary/gross-payment-status",
"https://www.tradetaxspecialists.co.uk/glossary/sole-trader",
"https://www.tradetaxspecialists.co.uk/glossary/limited-company-subcontractor",
"https://www.tradetaxspecialists.co.uk/glossary/cis300",
"https://www.tradetaxspecialists.co.uk/glossary/nil-return",
"https://www.tradetaxspecialists.co.uk/glossary/pre-notification-of-inactivity",
"https://www.tradetaxspecialists.co.uk/glossary/regulation-24za",
"https://www.tradetaxspecialists.co.uk/glossary/late-filing-penalties-cis",
"https://www.tradetaxspecialists.co.uk/glossary/compliance-test",
"https://www.tradetaxspecialists.co.uk/glossary/turnover-test",
"https://www.tradetaxspecialists.co.uk/glossary/business-test",
"https://www.tradetaxspecialists.co.uk/glossary/due-diligence-april-2026",
"https://www.tradetaxspecialists.co.uk/glossary/knew-or-should-have-known",
"https://www.tradetaxspecialists.co.uk/glossary/section-62a-penalty",
"https://www.tradetaxspecialists.co.uk/glossary/section-62b-penalty",
"https://www.tradetaxspecialists.co.uk/glossary/five-year-reapplication-ban",
"https://www.tradetaxspecialists.co.uk/glossary/verification",
"https://www.tradetaxspecialists.co.uk/glossary/employment-status",
"https://www.tradetaxspecialists.co.uk/glossary/retention-payments",
"https://www.tradetaxspecialists.co.uk/glossary/eps",
"https://www.tradetaxspecialists.co.uk/glossary/cis-refund",
"https://www.tradetaxspecialists.co.uk/glossary/over-deduction",
"https://www.tradetaxspecialists.co.uk/glossary/overpayment-relief",
"https://www.tradetaxspecialists.co.uk/glossary/sa302-tax-calculation",
"https://www.tradetaxspecialists.co.uk/glossary/corporation-tax-offset-cis",
"https://www.tradetaxspecialists.co.uk/glossary/in-year-repayment-eps-route",
"https://www.tradetaxspecialists.co.uk/glossary/vat-domestic-reverse-charge",
"https://www.tradetaxspecialists.co.uk/glossary/end-user-drc",
"https://www.tradetaxspecialists.co.uk/glossary/flat-rate-scheme-and-cis",
"https://www.tradetaxspecialists.co.uk/glossary/making-tax-digital-for-income-tax",
"https://www.tradetaxspecialists.co.uk/glossary/quarterly-updates-mtd",
"https://www.tradetaxspecialists.co.uk/glossary/bridging-software",
"https://www.tradetaxspecialists.co.uk/glossary/allowable-expenses-cis",
"https://www.tradetaxspecialists.co.uk/glossary/amap-mileage-rates",
"https://www.tradetaxspecialists.co.uk/glossary/class-4-national-insurance",
"https://www.tradetaxspecialists.co.uk/glossary/citb-levy",
"https://www.tradetaxspecialists.co.uk/locations/london",
"https://www.tradetaxspecialists.co.uk/locations/manchester",
"https://www.tradetaxspecialists.co.uk/locations/birmingham",
"https://www.tradetaxspecialists.co.uk/locations/leeds",
"https://www.tradetaxspecialists.co.uk/locations/bristol",
"https://www.tradetaxspecialists.co.uk/locations/glasgow",
"https://www.tradetaxspecialists.co.uk/locations/edinburgh",
"https://www.tradetaxspecialists.co.uk/locations/sheffield",
"https://www.tradetaxspecialists.co.uk/locations/liverpool",
"https://www.tradetaxspecialists.co.uk/locations/newcastle",
"https://www.tradetaxspecialists.co.uk/locations/belfast",
"https://www.tradetaxspecialists.co.uk/locations/bradford",
"https://www.tradetaxspecialists.co.uk/locations/cardiff",
"https://www.tradetaxspecialists.co.uk/locations/coventry",
"https://www.tradetaxspecialists.co.uk/locations/derby",
"https://www.tradetaxspecialists.co.uk/locations/hull",
"https://www.tradetaxspecialists.co.uk/locations/leicester",
"https://www.tradetaxspecialists.co.uk/locations/nottingham",
"https://www.tradetaxspecialists.co.uk/locations/plymouth",
"https://www.tradetaxspecialists.co.uk/locations/portsmouth",
"https://www.tradetaxspecialists.co.uk/locations/reading",
"https://www.tradetaxspecialists.co.uk/locations/southampton",
"https://www.tradetaxspecialists.co.uk/locations/stoke-on-trent",
"https://www.tradetaxspecialists.co.uk/locations/sunderland",
"https://www.tradetaxspecialists.co.uk/locations/wolverhampton",
]

print(f"LIVE PAGES IN SITEMAP: {len(SITEMAP_URLS)}")

slug_fps = []
for url in SITEMAP_URLS:
    path = url.split('.co.uk', 1)[-1]
    # use final path segment as the "page slug" — most semantically dense
    last_seg = path.strip('/').split('/')[-1].replace('-', ' ')
    slug_fps.append((url, last_seg, fingerprint(last_seg)))

def jaccard(a, b):
    sa, sb = set(a), set(b)
    if not sa and not sb: return 1.0
    if not sa or not sb: return 0.0
    return len(sa & sb) / len(sa | sb)

covered_count = 0
net_new_count = 0
covered_examples = []
near_misses = []

for c in collapsed:
    cfp = fingerprint(c['head'])
    best_score = 0.0
    best_url = None
    for url, slug, sfp in slug_fps:
        j = jaccard(cfp, sfp)
        if j > best_score:
            best_score = j
            best_url = url
    if best_score >= 0.65:
        c['covered'] = True
        covered_count += 1
        covered_examples.append((c['head'], best_url, round(best_score,2)))
    else:
        c['covered'] = False
        net_new_count += 1
        if best_score >= 0.45:
            near_misses.append((c['head'], best_url, round(best_score,2)))

print(f"COVERED: {covered_count}")
print(f"NET-NEW: {net_new_count}")

print("Covered examples (first 10):")
for head, url, score in covered_examples[:10]:
    print(f"  [{score}] '{head}' -> {url.split('.co.uk')[-1]}")

print(f"Near-misses kept as net-new (score 0.4-0.79, top 10):")
near_misses_sorted = sorted(near_misses, key=lambda x: x[2], reverse=True)
for head, url, score in near_misses_sorted[:10]:
    print(f"  [{score}] '{head}' -> {url.split('.co.uk')[-1]}")

cat_counts = Counter()
netnew_with_vol = 0
netnew_null_vol = 0
for c in collapsed:
    if not c['covered']:
        cat_counts[c['category']] += 1
        if c['volume'] and c['volume'] > 0:
            netnew_with_vol += 1
        else:
            netnew_null_vol += 1

print(f"NET-NEW with volume>0: {netnew_with_vol}")
print(f"NET-NEW with null/0 vol: {netnew_null_vol}")
print("Net-new by category:")
for cat, cnt in cat_counts.most_common():
    print(f"  {cat}: {cnt}")

# re-rank priority decile
def vol_key(c): return c['volume'] if c['volume'] is not None else -1
collapsed_sorted = sorted(collapsed, key=vol_key, reverse=True)
n = len(collapsed_sorted)
for i, c in enumerate(collapsed_sorted):
    prio = min(10, int(i / n * 10) + 1)
    c['priority'] = prio

out = {
    'site_key':   pool['site_key'],
    'source_tag': pool['source_tag'],
    'generated':  pool['generated'],
    'clusters':   collapsed_sorted,
}
with open('expansion_research/tier1_trade/topic_pool_final.json', 'w') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
print(f"WROTE {len(collapsed_sorted)} clusters")

with open('expansion_research/tier1_trade/topic_pool_final.json') as f:
    verify = json.load(f)
ok = all('head' in c and 'members' in c and 'volume' in c and 'category' in c and 'covered' in c
         for c in verify['clusters'])
print(f"VERIFY: {len(verify['clusters'])} clusters, all-fields-ok={ok}")
