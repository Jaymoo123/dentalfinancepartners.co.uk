"""Build the Property SEO surface map (MD + JSON) from the 2026-08-05 audit pulls.
ponytail: one script, no package. Rerun after a fresh DFS pull to regenerate both files.
"""
import json, re, os, collections

D = 'expansion_research/_prop_audit_2026_08_05/'
OUT_JSON = 'out/property_seo_surface_2026-08-05.json'
OUT_MD = 'docs/_engines/PROPERTY_SEO_SURFACE_MAP_2026-08-05.md'

uni = json.load(open(D + 'dfs/universe_merged.json'))
serp = json.load(open(D + 'dfs/serp_composition.json'))
four = json.load(open(D + 'dfs/four_market.json'))
auto = [t['term'] for t in json.load(open(D + 'autocomplete_property.json'))['terms']]
gsc = json.load(open(D + 'gsc_query_rows_90d.json'))
hpages = json.load(open(D + 'gsc_headterm_pages.json'))['summary_top20_by_impressions']

gidx = {r['keys'][0]: r for r in gsc}
pidx = {r['query']: r for r in hpages}


def vol(terms):
    """DFS returns one volume per keyword *cluster*, so variants duplicate. Take the max, never sum."""
    vs = [uni[t]['volume'] for t in terms if t in uni and uni[t].get('volume')]
    return max(vs) if vs else None


def cpc(terms):
    cs = [uni[t]['cpc'] for t in terms if t in uni and uni[t].get('cpc')]
    return round(max(cs), 2) if cs else None


def comp(terms):
    for t in terms:
        if t in uni and uni[t].get('competition'):
            return uni[t]['competition']
    return None


def pos(terms):
    """Exact GSC match first; else impressions-weighted position over queries containing the term."""
    hits = [gidx[t] for t in terms if t in gidx]
    if hits:
        r = max(hits, key=lambda x: x['impressions'])
        return round(r['position'], 1), r['impressions'], r['clicks'], 'exact'
    imp = num = 0
    clicks = 0
    for r in gsc:
        q = r['keys'][0]
        if any(t in q for t in terms):
            imp += r['impressions']
            num += r['position'] * r['impressions']
            clicks += r['clicks']
    if imp:
        return round(num / imp, 1), imp, clicks, 'contains'
    return None, 0, 0, None


def serp_flags(terms):
    for t in terms:
        if t in serp:
            s = serp[t]
            return {'term': t, 'ai_overview': s['ai_overview'], 'local_pack': s['local_pack'], 'paa': s['paa'],
                    'local_pack_names': s.get('local_pack_names', [])}
    return None


def owning(terms):
    """URLs GSC currently serves for these terms (head-term page pull)."""
    urls = collections.OrderedDict()
    for t in terms:
        row = pidx.get(t)
        if not row:
            continue
        for p in row['pages']:
            u = p['page'].replace('https://www.propertytaxpartners.co.uk', '').replace('https://propertytaxpartners.co.uk', '')
            urls.setdefault(u, 0)
            urls[u] += p['impressions']
    return [u for u, _ in sorted(urls.items(), key=lambda kv: -kv[1])]


BING = {  # from fresh_facts_2026_08_05.md, Bing Webmaster API 2026-05-17..08-03
 'T1-01': 'commercial head terms total 45 impr / 0 clicks on Bing; no city or /locations page has any Bing footprint at all (0 of 191 pages)',
 'T1-02': 'inside the same 45 impr / 0 clicks commercial head-term pool',
 'T1-03': 'inside the same 45 impr / 0 clicks commercial head-term pool',
 'T1-04': '"landlord tax" = 1,064 impr / 121 clicks (11.4% CTR) on Bing versus 0 impressions on Google. The demand is real and the zero is Google-only',
 'T1-05': 'inside the same 45 impr / 0 clicks commercial head-term pool',
 'T1-06': 'inside the same 45 impr / 0 clicks commercial head-term pool',
 'T1-07': 'no Bing footprint recorded',
 'T1-08': 'no Bing footprint recorded',
}
DEFAULT_BING = 'not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR'

# ---------------------------------------------------------------- taxonomy
# tier2: (label, [terms], intent, recommended owner)
CL = [
 dict(id='T1-01', name='Property accountant family', intent='commercial',
      terms=['property accountant', 'property accountants', 'accountants for property', 'uk property accountants'],
      owner='/services (NEW dedicated /services/property-accountant hub, consolidating the 11 blog posts now competing)',
      tier2=[
        ('bare head', ['property accountant', 'property accountants'], 'commercial'),
        ('specialist modifier', ['specialist property accountant', 'specialist property accountants', 'property specialist accountant', 'accountants specialising in property'], 'commercial'),
        ('near me', ['property accountants near me', 'property accountant near me'], 'commercial'),
        ('city variants', ['property accountants london', 'property accountant london', 'property accountant hounslow'], 'commercial'),
        ('fees/cost', ['property accountant fees', 'how much does a property accountant cost'], 'commercial'),
        ('services/what they do', ['property accounting services', 'property tax services', 'what is property accountant'], 'informational'),
        ('jobs (EXCLUDE)', ['property accountant jobs', 'property accountants jobs', 'property accountant london jobs'], 'careers - not a lead intent'),
      ]),
 dict(id='T1-02', name='Landlord accountant family', intent='commercial',
      terms=['landlord accountant', 'accountant for landlords', 'accountants for landlords', 'landlord tax accountant'],
      owner='NEW /services/landlord-accountant',
      tier2=[
        ('bare head', ['landlord accountant', 'accountant for landlords', 'accountants for landlords'], 'commercial'),
        ('tax accountant modifier', ['landlord tax accountant', 'landlord tax accountants'], 'commercial'),
        ('near me', ['landlord accountant near me'], 'commercial'),
        ('city variants', ['landlord accountant london'], 'commercial'),
        ('let property campaign', ['let property campaign accountant', 'let property campaign accountant near me', 'let property campaign accountant cost'], 'commercial'),
      ]),
 dict(id='T1-03', name='Property tax advisor / specialist', intent='commercial',
      terms=['property tax advisor', 'property tax advisors', 'property tax specialist', 'property tax accountant', 'property tax experts'],
      owner='/services (NEW /services/property-tax-advice landing, absorbing the London blog duplicates)',
      tier2=[
        ('advisor', ['property tax advisor', 'property tax advisors', 'tax advisor property'], 'commercial'),
        ('specialist', ['property tax specialist', 'property tax specialists uk', 'uk property tax specialists'], 'commercial'),
        ('tax accountant', ['property tax accountant', 'property tax accountants', 'tax accountant property'], 'commercial'),
        ('near me', ['property tax specialist near me', 'property tax advisor near me', 'property tax accountant near me'], 'commercial'),
        ('city variants', ['property tax accountant london', 'property tax accountants london'], 'commercial'),
        ('advice/consulting', ['property tax advice', 'tax advice property', 'property tax consultant'], 'commercial'),
      ]),
 dict(id='T1-04', name='Landlord tax (informational head)', intent='informational',
      terms=['landlord tax', 'uk landlord tax', 'landlord tax advice', 'tax landlord'],
      owner='/property-tax-rates (hub) + NEW pillar /landlord-tax linking the calculators',
      tier2=[
        ('bare head', ['landlord tax', 'tax landlord', 'uk landlord tax'], 'informational'),
        ('advice', ['landlord tax advice', 'landlord tax advice uk', 'small landlord tax advice'], 'commercial'),
        ('changes/budget', ['landlord tax changes', 'landlord tax changes 2026', 'new landlord tax', 'budget landlord tax', 'landlord tax increase'], 'informational'),
        ('how much do I pay', ['how much tax do i pay as a landlord', 'how much landlord tax do i pay', 'how much is landlord tax'], 'informational'),
        ('relief/expenses', ['landlord tax relief', 'landlord tax deductions', 'landlord tax allowances', 'landlord expense'], 'informational'),
        ('tax return', ['landlord tax return', 'landlord tax returns', 'landlords self assessment', 'uk landlord tax return'], 'commercial'),
        ('HMRC angle', ['landlord tax hmrc', 'hmrc landlord tax', 'hmrc landlord tax crackdown'], 'informational'),
      ]),
 dict(id='T1-05', name='Buy-to-let accountant', intent='commercial',
      terms=['buy to let accountant', 'buy-to-let accountant', 'buy to let tax accountant'],
      owner='NEW /services/buy-to-let-accountant',
      tier2=[
        ('bare head', ['buy to let accountant', 'buy-to-let accountant'], 'commercial'),
        ('near me', ['buy to let accountant near me', 'buy-to let accountant near me'], 'commercial'),
        ('tax advice', ['buy to let tax advice'], 'commercial'),
        ('limited company BTL', ['buy to let limited company accountant', 'accountant for limited company buy to let'], 'commercial'),
      ]),
 dict(id='T1-06', name='Property investment accountant', intent='commercial',
      terms=['property investment accountant', 'property investment accountants', 'accountants for property investors', 'investment property accountant'],
      owner='NEW /services/property-investment-accountant',
      tier2=[
        ('bare head', ['property investment accountant', 'property investment accountants'], 'commercial'),
        ('investors phrasing', ['accountants for property investors', 'accountant for property investors', 'investment property accountants'], 'commercial'),
        ('developers', ['property development accountant', 'property development accountants', 'accountants for property developers'], 'commercial'),
        ('property trading', ['property trading', 'property traders'], 'informational'),
      ]),
 dict(id='T1-07', name='Property management accountant', intent='commercial',
      terms=['accountant for property management'],
      owner='NEW /services/property-management-accounting (letting agents and managing agents; highest CPC in the set)',
      tier2=[
        ('bare head', ['accountant for property management'], 'commercial'),
        ('letting agents (GSC-observed)', ['accountant for letting agents leicester'], 'commercial'),
        ('service-charge / block', [], 'commercial'),
      ]),
 dict(id='T1-08', name='Rental property accountant', intent='commercial',
      terms=['rental property accountant', 'rental property accountants', 'accountant for rental property'],
      owner='Fold into /services/landlord-accountant (T1-02) as a section; do not build a separate page',
      tier2=[
        ('bare head', ['rental property accountant', 'rental property accountants'], 'commercial'),
        ('accountant for rental property', ['accountant for rental property', 'accountants for rental property'], 'commercial'),
      ]),
 dict(id='T1-09', name='Non-resident landlord', intent='commercial',
      terms=['non resident landlord scheme', 'non-resident landlord', 'non resident landlord tax', 'overseas landlord tax'],
      owner='NEW /services/non-resident-landlord (NRL scheme hub; the NRL form queries already rank 7-9 on blog posts)',
      tier2=[
        ('NRL scheme', ['non resident landlord scheme'], 'informational'),
        ('NRL tax', ['non-resident landlord tax', 'non resident landlord tax', 'uk tax non resident landlord'], 'informational'),
        ('overseas/abroad phrasing', ['overseas landlord tax', 'landlord abroad tax', 'overseas landlord tax exemption uk'], 'informational'),
        ('NRL returns/forms', ['non resident landlord tax return', 'non resident landlord tax form', 'non-resident landlord tax return'], 'commercial'),
        ('NRL calculator', ['non resident landlord tax calculator uk'], 'calculator-tool'),
      ]),
 dict(id='T1-10', name='Incorporation / transfer to limited company', intent='commercial',
      terms=['transfer property to limited company', 'property incorporation', 'incorporation relief property'],
      owner='/incorporation (exists; add the SDLT-on-incorporation and connected-party sections that are winning impressions on blog posts)',
      tier2=[
        ('transfer to ltd co', ['transfer property to limited company'], 'commercial'),
        ('property incorporation', ['property incorporation'], 'commercial'),
        ('incorporation relief', ['incorporation relief property', 'property incorporation relief', 'incorporation relief property rental business'], 'informational'),
        ('portfolio incorporation (GSC-observed)', ['landlord portfolio incorporation uk', 'incorporating a property portfolio uk'], 'informational'),
        ('SDLT on incorporation (GSC-observed)', ['stamp duty on property incorporation uk', 'sdlt transfer property to limited company connected party 2025'], 'informational'),
        ('cost calculator', ['incorporation cost calculator'], 'calculator-tool'),
      ]),
 dict(id='T1-11', name='Section 24 specialism', intent='informational',
      terms=['section 24 tax', 'tax section 24', 'what is section 24', 'section 24 landlords'],
      owner='/calculators/section-24-calculator (exists; needs an explainer pillar above it)',
      tier2=[
        ('what is section 24', ['what is section 24', 'what is section 24 tax'], 'informational'),
        ('section 24 tax', ['section 24 tax', 'tax section 24', 'section 24 tax uk'], 'informational'),
        ('landlord framing', ['section 24 landlords', 'section 24 landlord', 'section 24 landlord tax', 'tenant tax section 24'], 'informational'),
        ('workarounds', ['section 24 tax loopholes uk'], 'informational'),
        ('mortgage interest relief', ['landlord mortgage interest tax relief', 'landlord tax relief on mortgage interest', 'mortgage interest relief on rental property'], 'informational'),
        ('India Income Tax Act s.24 (EXCLUDE)', ['section 24 of income tax act', 'section 24 of income tax act 1961'], 'wrong jurisdiction - suppress'),
      ]),
 dict(id='T1-12', name='Making Tax Digital for landlords', intent='commercial',
      terms=['making tax digital for landlords', 'mtd for landlords', 'making tax digital landlords', 'landlords making tax digital'],
      owner='/calculators/mtd-checker (exists; promote to a full MTD hub with the deadline, threshold and software sub-answers)',
      tier2=[
        ('bare head', ['making tax digital for landlords', 'mtd for landlords', 'making tax digital landlords'], 'commercial'),
        ('deadline/start', ['making tax digital landlords deadline', 'when does making tax digital start for landlords'], 'informational'),
        ('threshold', ['making tax digital for landlords threshold'], 'informational'),
        ('software', ['making tax digital software for landlords', 'best making tax digital software for landlords', 'making tax digital compatible software landlords', 'making tax digital for landlords software'], 'commercial'),
        ('penalties', ['making tax digital landlord penalties'], 'informational'),
        ('quarterly returns', ['landlord quarterly tax returns'], 'informational'),
      ]),
 dict(id='T1-13', name='Stamp duty calculator family', intent='calculator-tool',
      terms=['stamp duty calculator', 'stamp duty estimator', 'stamp duty calculator uk', 'sdlt calculator', 'stamp duty land tax calculator'],
      owner='/calculators/stamp-duty-calculator (exists; the single largest volume pool on the site and we rank pos 63)',
      tier2=[
        ('bare calculator', ['stamp duty calculator', 'stamp duty estimator'], 'calculator-tool'),
        ('UK-qualified', ['stamp duty calculator uk', 'uk stamp duty calculator', 'stamp duty tax calculator uk'], 'calculator-tool'),
        ('SDLT phrasing', ['sdlt calculator', 'stamp duty land tax calculator', 'calculate sdlt'], 'calculator-tool'),
        ('first-time buyer', ['first time buyer stamp duty', 'stamp duty for first time buyers'], 'informational'),
        ('second home / additional', ['stamp duty on second home', 'second home stamp duty', 'stamp duty 2nd home'], 'informational'),
        ('rates/thresholds', ['stamp duty rates', 'stamp duty thresholds', 'stamp duty land tax', 'what is stamp duty'], 'informational'),
        ('advice (commercial)', ['stamp duty advice', 'stamp duty land tax advice', 'stamp duty tax advice'], 'commercial'),
        ('devolved (LBTT/LTT)', ['stamp duty wales'], 'calculator-tool'),
      ]),
 dict(id='T1-14', name='CGT on property calculator + rates', intent='calculator-tool',
      terms=['property gains tax calculator', 'property capital gains tax calculator', 'capital gains tax property', 'capital gains tax on property'],
      owner='/calculators/capital-gains-tax-calculator (exists; pair with /property-tax-rates for the rates intent)',
      tier2=[
        ('property CGT calculator', ['property gains tax calculator', 'property capital gains tax calculator', 'cgt calculator property'], 'calculator-tool'),
        ('UK-qualified calculator', ['uk property capital gains tax calculator', 'capital gains tax calculator uk property'], 'calculator-tool'),
        ('CGT on property (rates/rules)', ['capital gains tax on property', 'capital gains tax property', 'uk property capital gains tax'], 'informational'),
        ('sale of property', ['capital gains tax on sale of property', 'property sale capital gains tax'], 'informational'),
        ('second property', ['capital gains tax second property', 'capital gains tax on 2nd property'], 'informational'),
        ('inherited property', ['capital gains tax on inherited property', 'inherited property and capital gains tax'], 'informational'),
        ('rental property CGT', ['capital gains tax on rental property', 'capital gains tax rental property'], 'informational'),
        ('reporting/60-day', ['report and pay capital gains tax on uk property'], 'informational'),
        ('allowance', ['capital gains tax allowance on property'], 'informational'),
      ]),
 dict(id='T1-15', name='Landlord / rental income tax calculator', intent='calculator-tool',
      terms=['landlord tax calculator', 'tax calculator landlord', 'landlord tax calculator uk', 'uk landlord tax calculator'],
      owner='/calculators/rental-income-tax-calculator (exists; rename-facing H1 to "landlord tax calculator", which is the demand phrasing)',
      tier2=[
        ('bare head', ['landlord tax calculator', 'tax calculator landlord'], 'calculator-tool'),
        ('UK-qualified', ['landlord tax calculator uk', 'uk landlord tax calculator'], 'calculator-tool'),
        ('HMRC framing', ['hmrc landlord tax calculator'], 'calculator-tool'),
        ('rental income tax', ['landlord tax on rental income', 'landlord income tax', 'tax on landlord income'], 'informational'),
      ]),
]

# --------------------------------------------------------------- assemble
clusters = []
for c in CL:
    sf = serp_flags(c['terms'] + [t for _, ts, _ in c['tier2'] for t in ts])
    p, imp, clicks, kind = pos(c['terms'])
    urls = owning(c['terms'] + [t for _, ts, _ in c['tier2'] for t in ts])
    t2 = []
    for label, terms, intent in c['tier2']:
        tp, timp, tcl, tkind = pos(terms) if terms else (None, 0, 0, None)
        t2.append(dict(tier=2, cluster=c['id'], label=label, terms=terms, volume=vol(terms), cpc=cpc(terms),
                       competition=comp(terms), intent=intent, serp=serp_flags(terms),
                       our_position=tp, our_impressions=timp, our_clicks=tcl, position_match=tkind,
                       owning_urls=owning(terms)))
    clusters.append(dict(tier=1, id=c['id'], name=c['name'], intent=c['intent'], terms=c['terms'],
                         volume=vol(c['terms']), cpc=cpc(c['terms']), competition=comp(c['terms']),
                         serp=sf, our_position=p, our_impressions=imp, our_clicks=clicks, position_match=kind,
                         owning_urls=urls, cannibalisation_flag=len(urls) > 3,
                         no_gbp_flag=bool(sf and sf['local_pack']),
                         recommended_owner=c['owner'], bing_note=BING.get(c['id'], DEFAULT_BING), tier2=t2))

# --------------------------------------------------------------- tier 3
NOISE = r'(hindu marriage|court fees act|income tax act|1961|constitution|crpc|companies act|contract act|evidence act|ipc\b|of the code)'
JOBS = r'\b(job|jobs|salary|vacanc|career|apprentice|graduate|job description|hiring|recruit)\b'
THEMES = [
 ('How much tax do I pay', r'^how much (tax|is|do|does|capital)', ),
 ('Can I claim / deductible', r'^(can|is|are).*(claim|deduct|expense|allowab)'),
 ('What is X (definitional)', r'^what (is|are|does)'),
 ('Section 24 mechanics (UK)', r'section 24'),
 ('CGT on property', r'(capital gains|\bcgt\b)'),
 ('Non-resident / overseas landlord', r'(non.?resident|overseas|abroad|expat|living abroad)'),
 ('Calculators and tools', r'\b(calculator|calculate|estimator|checker|tool)\b'),
 ('MTD and landlord software', r'(making tax digital|\bmtd\b|software)'),
 ('Limited company / incorporation', r'(incorporat|limited company|ltd company|\bspv\b)'),
 ('Fees, cost and pricing', r'\b(cost|costs|fees?|price|charge|how much do)\b'),
 ('Near me / local', r'near me'),
 ('Best / comparison / reviews', r'\b(best|top|reviews?|vs\b|compare|better)\b'),
 ('City-named', r'\b(london|manchester|birmingham|leeds|nottingham|bristol|glasgow|edinburgh|liverpool|cardiff|sheffield|newcastle|belfast|brighton)\b'),
 ('Expenses and deductions', r'(expense|deduct|allowab|claim)'),
]
clean = [t for t in auto if not re.search(NOISE, t) and not re.search(JOBS, t)]
tier3 = []
for name, pat in THEMES:
    m = [t for t in clean if re.search(pat, t)]
    tier3.append(dict(tier=3, theme=name, count=len(m), exemplars=m[:5]))
excluded = dict(indian_law_noise=len([t for t in auto if re.search(NOISE, t)]),
                jobs_careers=len([t for t in auto if re.search(JOBS, t)]))

payload = dict(
    generated='2026-08-05',
    site='propertytaxpartners.co.uk',
    volume_source='DataForSEO Google Ads, UK (gb), pulled 2026-08-05; volume is per keyword cluster so variants share a figure and are never summed',
    position_source='GSC API sc-domain:propertytaxpartners.co.uk, last 90 days to 2026-08-05',
    clusters=clusters,
    tier3_themes=tier3,
    tier3_excluded=excluded,
    tier3_total_terms=len(auto),
    tier3_clean_terms=len(clean),
    four_market=four,
)
os.makedirs('out', exist_ok=True)
json.dump(payload, open(OUT_JSON, 'w', encoding='utf-8'), indent=1)

# --------------------------------------------------------------- markdown
def f(n):
    return '{:,}'.format(n) if isinstance(n, int) else ('-' if n is None else n)

def money(c):
    return '-' if c is None else 'GBP %.2f' % c

def sflag(s):
    if not s:
        return 'not pulled'
    bits = []
    if s['ai_overview']:
        bits.append('AI overview')
    if s['local_pack']:
        bits.append('LOCAL PACK')
    if s['paa']:
        bits.append('PAA')
    return ', '.join(bits) or 'plain organic'

def ppos(row):
    if row['our_position'] is None:
        return ''
    tag = '' if row['position_match'] == 'exact' else '~'
    return '%s%s (%s impr)' % (tag, row['our_position'], f(row['our_impressions']))

L = []
w = L.append
w('# Property Tax Partners: UK SEO surface architecture map')
w('')
w('Built 2026-08-05. Site: propertytaxpartners.co.uk (UK property-tax accountancy lead generation).')
w('')
w('**Sourcing.** Every volume and CPC figure in this document is DataForSEO Google Ads, UK (gb), pulled 2026-08-05, from `expansion_research/_prop_audit_2026_08_05/dfs/universe_merged.json` (936 terms). DataForSEO returns one volume per keyword *cluster*, so near-identical phrasings share a single figure; cluster volumes below are therefore the **maximum** of their member terms, never a sum. SERP shape is DataForSEO live UK SERPs for 25 terms (`serp_composition.json`); terms outside that set are marked "not pulled". Our Google positions are the GSC API, last 90 days to 2026-08-05; a tilde marks a contains-match average rather than an exact-query row. Bing notes come from `fresh_facts_2026_08_05.md`.')
w('')
w('Machine-readable twin: `out/property_seo_surface_2026-08-05.json`.')
w('')
w('## Reading the flags')
w('')
w('- **CANNIB**: more than three of our URLs currently take impressions for the cluster. Measured, not asserted.')
w('- **NO-GBP**: the SERP carries a local pack. We have no Google Business Profile and the estate rule is that we never create one, so the pack is unreachable and the organic slots below it are the only prize. Treat the headline volume as discounted.')
w('')

# tier 1 table
w('## Tier 1: head clusters')
w('')
w('| # | Cluster | Rep. volume | CPC | Intent | SERP shape | Our Google pos | Bing note | Owning URLs now | Flags | Recommended owner |')
w('|---|---|---|---|---|---|---|---|---|---|---|')
for c in clusters:
    flags = ' '.join(x for x in [('CANNIB' if c['cannibalisation_flag'] else ''), ('NO-GBP' if c['no_gbp_flag'] else '')] if x)
    w('| %s | %s | %s | %s | %s | %s | %s | %s | %d | %s | %s |' % (
        c['id'], c['name'], f(c['volume']), money(c['cpc']), c['intent'], sflag(c['serp']), ppos(c) or '-',
        c['bing_note'], len(c['owning_urls']), flags or '-', c['recommended_owner']))
w('')
tot = sum(c['volume'] or 0 for c in clusters)
w('**Tier 1 totals.** %d clusters. Representative monthly UK volume across all 15 heads: %s. Excluding the stamp duty calculator family (%s, a single dominant pool), the rest of the surface totals %s. Clusters flagged CANNIB: %d. Clusters flagged NO-GBP: %d.' % (
    len(clusters), f(tot), f(clusters[12]['volume']), f(tot - (clusters[12]['volume'] or 0)),
    sum(1 for c in clusters if c['cannibalisation_flag']), sum(1 for c in clusters if c['no_gbp_flag'])))
w('')

# tier 2 per cluster
w('## Tier 2: sub-terms by head')
w('')
n2 = 0
for c in clusters:
    w('### %s %s' % (c['id'], c['name']))
    w('')
    w('Recommended owner: **%s**' % c['recommended_owner'])
    w('')
    if c['owning_urls']:
        w('Currently serving: %s%s' % (', '.join('`%s`' % u for u in c['owning_urls'][:8]),
                                       (' plus %d more' % (len(c['owning_urls']) - 8)) if len(c['owning_urls']) > 8 else ''))
        w('')
    else:
        w('Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.')
        w('')
    w('| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |')
    w('|---|---|---|---|---|---|---|---|')
    for t in c['tier2']:
        n2 += 1
        w('| %s | %s | %s | %s | %s | %s | %s | %s |' % (
            t['label'], ', '.join(t['terms'][:3]) or 'no DFS-seeded terms', f(t['volume']), money(t['cpc']),
            t['intent'], sflag(t['serp']), ppos(t) or '', len(t['owning_urls']) or '-'))
    w('')

w('**Tier 2 totals.** %d sub-term groups across 15 heads. Volume figures are per-group representatives on the same no-summing rule; groups showing "-" have no DataForSEO UK volume in the 936-term universe, which means they were not seeded, not that demand is zero. ATED, LBTT and LTT specialisms were never seeded in the DFS pull and are a known data gap: we hold GSC positions 1-3 on `ated` and `lbtt` with only single-digit impressions, so the demand exists but is unsized.' % n2)
w('')

# tier 3
w('## Tier 3: long-tail and question layer')
w('')
w('Source: `autocomplete_property.json`, %d unique UK terms from Google Autocomplete expansion. Two blocks are removed before theming: %d Indian-law "section 24" terms (Income Tax Act 1961, Hindu Marriage Act, Court Fees Act, the Constitution) which are the wrong jurisdiction entirely, and %d jobs and salary terms which are careers traffic rather than lead intent. That leaves %d themable terms. The table below groups them; it deliberately does not enumerate all %d.' % (
    len(auto), excluded['indian_law_noise'], excluded['jobs_careers'], len(clean), len(auto)))
w('')
w('| Theme | Terms | Exemplars |')
w('|---|---|---|')
for t in tier3:
    w('| %s | %d | %s |' % (t['theme'], t['count'], '; '.join(t['exemplars'][:3])))
w('')
w('**Tier 3 totals.** %d raw terms, %d after excluding %d Indian-law and %d careers terms. Themes overlap by design (a term can be both a question form and a CGT term), so the theme counts do not sum to the corpus. The two themes with no owning page at all today are "fees, cost and pricing" and "best / comparison / reviews": we publish neither a pricing page nor any comparison content, and both are bottom-of-funnel.' % (
    len(auto), len(clean), excluded['indian_law_noise'], excluded['jobs_careers']))
w('')

# QA
w('## QA: flags')
w('')
w('### Cannibalisation (more than three of our URLs competing)')
w('')
for c in clusters:
    if c['cannibalisation_flag']:
        w('- **%s %s**: %d URLs. Top offenders: %s.' % (c['id'], c['name'], len(c['owning_urls']),
          ', '.join('`%s`' % u for u in c['owning_urls'][:5])))
w('')
w('URL counts come from the GSC page-dimension pull, which covers the twenty highest-impression head queries (all property-accountant family). Clusters outside T1-01 are therefore unflagged for lack of URL-level data, not because they are clean; the repo count of 50 blog metaTitles containing "property accountant" and 33 containing "landlord tax" says the same pattern almost certainly repeats in T1-02 and T1-04.')
w('')
w('The measured worst case sits inside T1-01: the bare query "property accountant" alone (278 impressions, 90 days) is served across 11 different URLs at an average position of 25.2, with zero clicks. No single page is being allowed to rank.')
w('')
w('### No-GBP rule bites (local pack present)')
w('')
for c in clusters:
    if c['no_gbp_flag']:
        names = c['serp'].get('local_pack_names') or []
        w('- **%s %s** (via `%s`)%s' % (c['id'], c['name'], c['serp']['term'],
          (': pack holders %s' % ', '.join(names)) if names else ''))
w('')
w('In each of these the pack occupies the top of the fold and we cannot enter it. The realistic play is the organic block beneath it, which means the recommended owner page has to win on depth and on the AI-overview citation rather than on proximity.')
w('')

# four market
w('## Closing section: light four-market comparison')
w('')
w('Source: DataForSEO Google Ads, pulled 2026-08-05, US / AU / CA volumes and CPC for the same 20 UK heads.')
w('')
w('| Head term | US vol | US CPC | AU vol | AU CPC | CA vol | CA CPC |')
w('|---|---|---|---|---|---|---|')
for k, v in four.items():
    row = [k]
    for m in ('us', 'au', 'ca'):
        d2 = v.get(m) or {}
        row += [f(d2.get('volume')), money(d2.get('cpc'))]
    w('| ' + ' | '.join(str(x) for x in row) + ' |')
w('')
w('One paragraph only, as scoped: the US carries the highest commercial prices in the set (property accountant USD 32.32, property tax accountant USD 41.57, accountant for landlords USD 51.65) on volumes that are broadly comparable to or below the UK equivalents, Australia has real volume on the generic "property accountant" family at a tenth of the US cost per click, and Canada is thin across the board. Nothing here is actioned in this document; it is recorded so that any future question about geographic expansion starts from measured figures rather than intuition.')
w('')

open(OUT_MD, 'w', encoding='utf-8').write('\n'.join(L).replace('—', ', '))
print('wrote', OUT_MD, OUT_JSON)
print('tier1', len(clusters), 'tier2', n2, 'tier3 raw', len(auto), 'clean', len(clean))
for c in clusters:
    print(c['id'], c['name'], c['volume'], 'urls', len(c['owning_urls']), 'cannib', c['cannibalisation_flag'], 'nogbp', c['no_gbp_flag'], 'pos', c['our_position'], c['position_match'])
