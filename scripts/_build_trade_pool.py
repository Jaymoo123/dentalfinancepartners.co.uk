"""Build topic_pool_final.json for construction-cis.
Run: python scripts/_build_trade_pool.py
"""
import json, re, pathlib
from difflib import SequenceMatcher
from collections import defaultdict, Counter

REPO = pathlib.Path(__file__).resolve().parent.parent

# 1. DFS universe
with open(REPO / 'expansion_research/tier1_trade/raw/dfs_trade_universe.json', encoding='utf-8') as f:
    dfs_raw = json.load(f)
dfs = {kw['keyword'].lower().strip(): kw for kw in dfs_raw}

# 2. GSC queries (loaded inline from prior query)
gsc_raw = [
    ('accountants for roofers', 105), ('roofers accountant', 105), ('accountant for roofers', 102),
    ('cis software free', 40), ('cis tax return bristol', 27), ('cis refunds service', 26),
    ('cis accountant cannock', 25), ('cis payroll software', 23), ('self-assessment for cis subcontractors', 21),
    ('cis accountants cornwall', 20), ('accounting for joiners', 19), ('cis reclaim services', 19),
    ('cis accountant cornwall', 17), ('cis reclaims and tax', 17), ('cis tax return accountants', 16),
    ('payroll software for cis', 15), ('cis pay & bill software', 14), ('drainage contractors insurance', 14),
    ('cis tax refund services', 13), ('cis accountant norfolk', 13), ('claim cis refund', 11),
    ('cis tax refund', 11), ('cis returns stoke', 11), ('cis refund', 11),
    ('cis accountant near me', 10), ('cis tax return accountant', 10), ('cis tax specialist near me', 9),
    ('cis contractors accountant', 8), ('vat services hull', 7), ('cis accountant leeds', 7),
    ('cis tax services near me', 7), ('plasterers accountant', 6), ('drainage capital allowances', 6),
    ('cis returns london', 6), ('cis tax specialist wimbledon', 6), ('cis accountant peterborough', 6),
    ('bricklayer accountants', 5), ('cis refunds', 3), ('cis accountants near me', 5),
    ('accountant for structural engineer', 3), ('tilers accountant', 3), ('cis reclaim', 5),
    ('cis accountants london', 4), ('construction accountants west midlands', 4),
    ('cis refunds colchester', 4), ('cis accountants coventry', 3), ('cis contractors accountant', 8),
    ('fencing contractor accountant', 1), ('accounting for insulation companies', 2),
    ('accountant for tilers', 2), ('accountant for plasterers', 2), ('cis accountant bexley', 2),
    ('construction accountants nottingham', 2), ('cis accountant surrey', 1),
    ('cis tax advice coventry', 2), ('cis accountants stoke-on-trent', 1),
    ('cis accountant padiham', 3), ('cis tax return service oxford', 1),
    ('cis returns sunderland', 1), ('contractor accountants cardiff', 1),
    ('cis tax specialist wallington', 3), ('m&e accounting', 1),
    ('cis accounting in essex', 1), ('cis returns service in hertfordshire', 1),
    ('construction accountants near me', 4), ('accountant for tradesmen west midlands', 3),
    ('vat services in hull', 2), ('hull vat services', 4),
]

# 3. Bing queries
bing_raw = [
    ('cis penalty hmrc', 4), ('cis southampton', 4), ('appeal cis penalty', 2),
    ('cis late filing penalty', 1), ('cis penalties hmrc', 2), ('best accounting software for cis', 1),
    ('cis return dates 2026-27', 1),
]

# 4. Coverage set
blog_slugs = [
    'cis self assessment complete guide', 'cis for limited companies eps reclaim',
    'cis invoice splitting labour materials', 'cis national insurance guide',
    'cis and mortgages', 'cis for partnerships', 'cis mistakes that cost subcontractors',
    'cis payment deduction statements guide', 'cis record keeping guide',
    'free cis payroll software', 'vat reverse charge for cis contractors',
    'cis sole trader vs limited company', 'allowable expenses cis subcontractor',
    'vat reverse charge construction', 'cis limited company reclaim', 'cis vs paye',
    'cis nil return explained', 'cis employment status self employed test',
    'how long does cis refund take', 'cis plant hire guide', 'citb levy explained',
    'cis back years refund guide', 'cis monthly return guide',
    'cis subcontractor verification', 'what is cis', 'cis april 2026 rule changes',
    'cis supply chain compliance due diligence', 'what construction work is not cis',
    'quickbooks cis guide', 'switching cis accountant guide',
    'cis penalties and appeals', 'how much cis refund will i get',
    'vat reverse charge for cis subcontractors', 'cis deduction rates explained',
    'cis gross payment status guide', 'cis tax refund how to claim',
    'mtd income tax cis', 'gross payment status cash flow guide',
    'what is a cis accountant', 'deemed contractors explained',
    'cis limited company directors guide', 'cis for labour agencies',
    'how to register for cis', 'cis contractor registration guide',
    'cis for contractors monthly responsibilities', 'cis for housebuilders',
    'cis payroll software guide', 'freeagent cis guide', 'sage cis guide',
    'cis deadline calendar 2026 27', 'spreadsheets vs accounting software cis',
    'xero cis guide', 'cis for property developers', 'cis retention payments guide',
    'cis vs paye complete comparison', 'best cis accounting software',
]
trades_covered = [
    'plumbers', 'electricians', 'joiners', 'groundworkers', 'roofers', 'builders',
    'gas engineers', 'painters decorators', 'scaffolders', 'civil engineers',
    'bricklayers', 'plasterers', 'labourers', 'demolition contractors', 'dryliners',
    'carpenters', 'tilers', 'glaziers', 'steel fixers', 'ceiling fixers',
    'flooring contractors', 'heating engineers', 'kitchen fitters', 'bathroom fitters',
    'window installers', 'insulation installers', 'steel erectors', 'shopfitters',
    'fencing contractors', 'landscapers', 'plant operators', 'drainage contractors',
    'cladding installers', 'paving contractors', 'welder fabricators',
    'main contractors', 'subcontracting limited companies', 'property developers',
    'housebuilders', 'labour agencies', 'civil engineering firms',
    'mechanical electrical contractors', 'maintenance and fm companies',
    'plant hire companies', 'multi trade building firms',
]
cities_covered = [
    'london', 'manchester', 'birmingham', 'leeds', 'bristol', 'glasgow', 'edinburgh',
    'sheffield', 'liverpool', 'newcastle', 'belfast', 'bradford', 'cardiff', 'coventry',
    'derby', 'hull', 'leicester', 'nottingham', 'plymouth', 'portsmouth', 'reading',
    'southampton', 'stoke on trent', 'sunderland', 'wolverhampton',
]
calcs_covered = [
    'cis deduction calculator', 'cis gps eligibility checker', 'cis refund estimator',
    'cis self assessment calculator', 'cis take home calculator',
    'cis invoice splitter', 'cis vs paye comparison', 'cis back years calculator',
]
coverage_set = set(blog_slugs + trades_covered + cities_covered + calcs_covered)

def is_covered(kw):
    kw_l = kw.lower().strip()
    if kw_l in coverage_set:
        return True
    for c in coverage_set:
        if SequenceMatcher(None, kw_l, c).ratio() > 0.85:
            return True
    return False

# 5. Intent exclude
EXCLUDE_EXACT = {
    'yes', 'i am a contractor', 'employment status', 'working status', 'employee status',
    'gross payment', 'gross status', 'drain contractor', 'trade subcontractor', 'bnf cis',
    'cis 305', 'cis304', 'cis305', 'cis iform', 'cis clydebank', 'cis flooring',
    'cis roofing', 'cis trade', 'cis number', 'cis liverpool', 'what about expenses',
    'cis suffered', 'flooring+taxes', 'employment statuses', 'construction accountants',
    'different employment status', 'status in employment', 'employment status options',
    'contractor certification registration', 'interpretation note 17',
    'is a sub contractor self employed',  # covered by employment status blog
}
EXCLUDE_REGEX = [
    r'\bresume\b', r'\bcv\b', r'\bsample\b.*\baccountant\b', r'\baccountant.*\bsample\b',
    r'\binterview questions?\b',
    r'\bjobs?\b', r'\bcareers?\b', r'\brecruit', r'\bvacancy\b', r'\bvacancies\b',
    r'\bhiring\b', r'\bsalary\b',
    r'\binsurance\b',  # off-topic for accountant
    r'^ads facades\b',  # noisy Bing snippet
    r'^chain of reverse', r'^year end cis', r'^cis upload evidence',
    r'^if a subcontact', r'^if i resbumit', r'^which vat code.*not vat',
    r'^adds the ability', r'^does vat drc', r'^can i appeal.*only a accounts',
    r'^can penalty be', r'^copy of cis amended', r'^hmrc cis.*appeal.*charge',
    r'^hmrc cis non filing', r'^hmrc online appeal',
    r'^cis return amendment',
]

def intent_exclude(kw):
    kw_l = kw.lower().strip()
    if kw_l in EXCLUDE_EXACT:
        return True, 'noise/off-topic'
    for p in EXCLUDE_REGEX:
        if re.search(p, kw_l, re.IGNORECASE):
            return True, 'intent/noise'
    if kw_l == 'drainage contractors insurance':
        return True, 'off-topic: insurance not accountant intent'
    return False, None

# 6. Merge
merged = {}
for kw, row in dfs.items():
    merged[kw] = {'keyword': kw, 'volume': row['volume'], 'kd': row.get('kd'), 'sources': ['dfs']}
for q, impr in gsc_raw:
    k = q.lower().strip()
    if k not in merged:
        merged[k] = {'keyword': k, 'volume': None, 'kd': None, 'sources': ['gsc']}
    elif 'gsc' not in merged[k]['sources']:
        merged[k]['sources'].append('gsc')
for q, impr in bing_raw:
    k = q.lower().strip()
    if k not in merged:
        merged[k] = {'keyword': k, 'volume': None, 'kd': None, 'sources': ['bing']}
    elif 'bing' not in merged[k]['sources']:
        merged[k]['sources'].append('bing')

print(f"Merged universe: {len(merged)}")

included = {}
covered_count = 0
intent_exc = []

for kw, row in merged.items():
    if is_covered(kw):
        covered_count += 1
        continue
    excl, reason = intent_exclude(kw)
    if excl:
        intent_exc.append({'keyword': kw, 'reason': reason})
        continue
    included[kw] = row

print(f"Covered dropped: {covered_count}")
print(f"Intent excluded: {len(intent_exc)}")
print(f"Final pool: {len(included)}")

# 7. Categorise
CATEGORY_ORDER = [
    'CIS Basics','CIS Compliance','CIS Refunds','CIS Advanced',
    'VAT and MTD','Expenses','Limited Company','Software and Tools',
    'Trade-types','Locations'
]

CATEGORIES = {
    'CIS Basics': [
        r'\bwhat is cis\b', r'\bcis.*explained\b', r'\bregister.*cis\b', r'\bcis.*registration\b',
        r'\bcis.*subcontractor\b', r'\bcis.*housebuilder\b', r'\bcis.*plant hire\b',
        r'\bcis.*property dev\b', r'\bcis.*labour agenc\b', r'\bcis.*labour\b',
        r'\bcis.*not covered\b', r'\bcis.*deemed\b', r'\bcis verification\b',
        r'\bverify.*subcontractor\b', r'\bsubcontractor.*verif\b',
        r'\bcis.*what.*work\b', r'\bwhat.*cis.*work\b',
    ],
    'CIS Compliance': [
        r'\bcis.*monthly return\b', r'\bcis.*nil return\b', r'\bcis.*deadline\b',
        r'\bcis.*penalt\b', r'\bcis.*appeal\b', r'\bcis.*late\b',
        r'\bcis.*record keeping\b', r'\bcis.*payment.*deduction\b',
        r'\bcis.*deduction.*statement\b', r'\bcis.*invoice\b', r'\bcis.*mistake\b',
        r'\bcis.*compliance\b', r'\bcis.*rules?\b', r'\bcis.*return\b',
        r'\bcis.*changes 20\d\d\b', r'\bcis.*amendment\b', r'\bcis.*reporting\b',
        r'\bappeal.*cis\b', r'\bcis.*supply chain\b',
    ],
    'CIS Refunds': [
        r'\bcis.*refund\b', r'\bcis.*reclaim\b', r'\bcis.*rebate\b',
        r'\bclaim.*cis\b', r'\breclaim.*cis\b',
        r'\bhow.*much.*cis\b', r'\bhow.*long.*cis\b',
        r'\bcis.*back years\b', r'\bcis.*overpayment\b',
        r'\bcis.*tax.*back\b', r'\bhmrc.*cis.*refund\b', r'\btax.*refund.*cis\b',
    ],
    'CIS Advanced': [
        r'\bgross payment status\b', r'\bcis.*gps\b', r'\bcis.*cash flow\b',
        r'\bcis.*retention\b', r'\bcis.*partnership\b',
        r'\bcis.*director\b', r'\bcis.*self.employ\b',
        r'\bcis.*for.*limited\b', r'\bcis.*ltd\b',
        r'\bcis vs paye\b', r'\bcis.*paye\b', r'\bcis.*eps\b',
    ],
    'VAT and MTD': [
        r'\bvat.*reverse charge\b', r'\breverse charge\b', r'\bdomestic reverse\b',
        r'\bvat.*construction\b', r'\bvat.*cis\b', r'\bcis.*vat\b',
        r'\bmtd\b', r'\bmaking tax digital\b', r'\bbridging software\b',
        r'\bvat.*subcontract\b', r'\bvat.*builder\b', r'\bvat.*contractor\b',
        r'\bvat.*turnover\b', r'\bvat.*drc\b', r'\bvat.*services\b',
    ],
    'Expenses': [
        r'\bexpenses?\b', r'\bcapital allowance\b', r'\bmileage\b',
        r'\bcis.*deduction.*rate\b', r'\bhow.*work.*cis.*deduction\b',
        r'\bcis.*national insurance\b', r'\bcis.*class 4\b', r'\bcis.*ni\b',
        r'\bcis.*allowable\b', r'\ballowable.*cis\b', r'\bdrainage.*capital\b',
        r'\btax.*allowance\b', r'\btools.*tax\b',
    ],
    'Limited Company': [
        r'\bcis.*limited company\b', r'\blimited company.*cis\b',
        r'\bcis.*sole trader.*vs\b', r'\bsole trader.*vs.*ltd\b',
        r'\bcis.*company\b', r'\bcompany.*cis\b',
    ],
    'Software and Tools': [
        r'\bcis.*software\b', r'\bsoftware.*cis\b', r'\bxero.*cis\b', r'\bcis.*xero\b',
        r'\bsage.*cis\b', r'\bcis.*sage\b', r'\bquickbooks.*cis\b',
        r'\bfreeagent.*cis\b', r'\bcis.*payroll software\b', r'\bpayroll software.*cis\b',
        r'\bcis.*accounting software\b', r'\bbest.*cis.*software\b',
        r'\bcis.*pay.*bill\b', r'\bcis.*pay.+bill\b', r'\bpay.*bill.*cis\b',
        r'\bcis.*spreadsheet\b', r'\bspreadsheet.*cis\b',
    ],
    'Trade-types': [
        r'\baccountant.{0,20}(?:plumber|electrician|roofer|joiner|groundwork|scaffol|bricklayer|plasterer|tiler|carpenter|glazier|labourer|dryliner|demolition|cladding|paving|flooring|heating|kitchen fitter|bathroom fitter|window installer|insulation|steel|shopfitter|fencing|landscap|plant operator|drainage|welder|painter|decorator|structural engineer|structural)\b',
        r'\b(?:plumber|electrician|roofer|joiner|groundwork|scaffol|bricklayer|plasterer|tiler|carpenter|glazier|labourer|dryliner|demolition|flooring|kitchen fitter|bathroom fitter|window installer|insulation|shopfitter|fencing|landscap|drainage|welder|painter|decorator|tradesman|tradesmen|insulation)\b.{0,20}\baccountant\b',
        r'\baccounting.{0,20}(?:joiner|insulation|flooring|landscap|drainage|structural|mechanical|m&e|trade)\b',
        r'\bm&e accounting\b',
        r'\baccountant.{0,20}trade(?:smen|sman)?\b',
        r'\btrade(?:smen|sman)?.{0,20}accountant\b',
        r'\bconstruction accountants?\b',
    ],
    'Locations': [
        r'\bcis.{0,20}(?:cornwall|cannock|bristol|norfolk|stoke|peterborough|wimbledon|surrey|bexley|wallington|padiham|oxford|maidstone|hertfordshire|colchester|west midlands|essex|near me|london|leeds|coventry|hull|cardiff|nottingham|sunderland|southampton|liverpool|sheffield)\b',
        r'\b(?:cornwall|cannock|wimbledon|bexley|wallington|padiham|oxford|maidstone|hertfordshire|colchester|essex)\b.{0,20}\bcis\b',
        r'\bvat services.{0,20}hull\b', r'\bhull.{0,20}vat services\b',
        r'\bconstruction accountants.{0,20}(?:near me|west midlands|nottingham)\b',
        r'\baccountant.{0,20}tradesmen.{0,20}west midlands\b',
        r'\bcontractor accountants? cardiff\b',
    ],
}

def classify(kw):
    kw_l = kw.lower()
    for cat in CATEGORY_ORDER:
        for pat in CATEGORIES[cat]:
            if re.search(pat, kw_l, re.IGNORECASE):
                return cat
    return 'CIS Basics'

# 8. Build clusters with near-duplicate merging within each category
cat_buckets = defaultdict(list)
for kw, row in included.items():
    cat = classify(kw)
    cat_buckets[cat].append(row)

MERGE_THRESHOLD = 0.82  # ponytail: tuned; lower = fewer merges

def merge_variants(bucket):
    """Group near-duplicates under the highest-volume representative."""
    bucket.sort(key=lambda r: (r['volume'] is None, -(r['volume'] or 0)))
    used = [False] * len(bucket)
    groups = []
    for i, row in enumerate(bucket):
        if used[i]:
            continue
        members = [row['keyword']]
        member_sources = list(row['sources'])
        for j in range(i + 1, len(bucket)):
            if used[j]:
                continue
            ratio = SequenceMatcher(None, row['keyword'], bucket[j]['keyword']).ratio()
            if ratio >= MERGE_THRESHOLD:
                members.append(bucket[j]['keyword'])
                for s in bucket[j]['sources']:
                    if s not in member_sources:
                        member_sources.append(s)
                used[j] = True
        groups.append({
            'head': row['keyword'],
            'members': members,
            'volume': row['volume'],
            'kd': row['kd'],
            'sources': member_sources,
        })
        used[i] = True
    return groups

clusters = []
for cat in CATEGORY_ORDER:
    bucket = cat_buckets.get(cat, [])
    groups = merge_variants(bucket)
    for g in groups:
        g['category'] = cat
        clusters.append(g)

# Sort all by volume desc (None last)
clusters.sort(key=lambda c: (c['volume'] is None, -(c['volume'] or 0)))

n = len(clusters)
for i, c in enumerate(clusters):
    c['priority'] = min(10, i * 10 // n + 1)

print(f"\nTotal clusters: {n}")

cat_counts = Counter(c['category'] for c in clusters)
print("\nCategory breakdown:")
for cat in CATEGORY_ORDER:
    count = cat_counts.get(cat, 0)
    top3 = [c for c in clusters if c['category'] == cat][:3]
    top3_str = ', '.join(f"{c['head']} ({c['volume']})" for c in top3)
    print(f"  {cat}: {count} -- {top3_str}")

out = {
    "site_key": "construction-cis",
    "source_tag": "trade_pool_2026-07",
    "generated": "2026-07-14",
    "clusters": clusters
}

pathlib.Path(REPO / 'expansion_research/tier1_trade').mkdir(parents=True, exist_ok=True)
with open(REPO / 'expansion_research/tier1_trade/topic_pool_final.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print("\nWrote expansion_research/tier1_trade/topic_pool_final.json")

# Parse check
with open(REPO / 'expansion_research/tier1_trade/topic_pool_final.json', encoding='utf-8') as f:
    verify = json.load(f)
assert 'clusters' in verify
assert all('head' in c and 'members' in c for c in verify['clusters'])
print(f"Parse check OK -- {len(verify['clusters'])} clusters")

print("\nExcluded sample:")
for e in intent_exc[:20]:
    print(f"  {e['keyword']}: {e['reason']}")
