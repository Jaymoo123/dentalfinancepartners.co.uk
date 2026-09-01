import requests, xml.etree.ElementTree as ET, re, csv, sys, time
from urllib.parse import urlparse

UA = {"User-Agent": "Mozilla/5.0 (compatible; research-bot/1.0)"}
TIMEOUT = 15

SPECIALISTS = {"getground.co.uk","provestor.co.uk","uklandlordtax.co.uk","propertyspv.co.uk",
"companyservicesuk.co.uk","watsonknipe.co.uk","needingadvice.co.uk","vincentburch.co.uk",
"taxqube.co.uk","interpolitanmoney.com","taxd.co.uk","mfbrokers.co.uk"}

BIG = {"dnsassociates.co.uk","charcol.co.uk","togethermoney.com","commercialtrust.co.uk",
"nrla.org.uk","1stformations.co.uk","rapidformations.co.uk","landlordvision.co.uk"}

DOMAINS = list(SPECIALISTS) + list(BIG)

FILTER_RE = re.compile(r"spv|limited-company|ltd-company|incorporat|company-formation|property-company|buy-to-let|btl|landlord|sic-code|registered-office|transfer|holding-company|director", re.I)

def get(url, raw=False):
    for attempt in range(2):
        try:
            r = requests.get(url, headers=UA, timeout=TIMEOUT)
            if r.status_code == 200:
                return r.content if raw else r.content.decode('utf-8', errors='replace')
        except Exception as e:
            last_err = e
        time.sleep(1)
    return None

def find_sitemaps(domain):
    sitemaps = []
    txt = get(f"https://{domain}/robots.txt")
    if txt:
        for line in txt.splitlines():
            if line.lower().startswith("sitemap:"):
                sitemaps.append(line.split(":",1)[1].strip())
    if not sitemaps:
        sitemaps = [f"https://{domain}/sitemap.xml"]
    return sitemaps

def parse_xml_urls(xml_text):
    urls = []
    sub_sitemaps = []
    try:
        root = ET.fromstring(xml_text.encode('utf-8') if isinstance(xml_text,str) else xml_text)
    except Exception:
        return urls, sub_sitemaps
    ns = {'sm':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    tag = root.tag.lower()
    if tag.endswith('sitemapindex'):
        for sm in root.findall('sm:sitemap/sm:loc', ns) or root.findall('.//{*}loc'):
            pass
    # generic: find all loc elements regardless of ns, distinguish by parent tag
    for loc in root.iter():
        if loc.tag.lower().endswith('loc'):
            val = (loc.text or '').strip()
            parent_tag = loc.getparent().tag.lower() if hasattr(loc,'getparent') else ''
            urls.append(val)
    return urls, sub_sitemaps

def get_all_locs(xml_bytes):
    # ET has no getparent; do manual walk to distinguish sitemap vs url entries
    try:
        root = ET.fromstring(xml_bytes)
    except Exception:
        return [], False
    is_index = root.tag.lower().endswith('sitemapindex')
    locs = []
    for el in root.iter():
        if el.tag.lower().endswith('loc'):
            if el.text:
                locs.append(el.text.strip())
    return locs, is_index

def crawl_domain(domain):
    all_urls = set()
    failures = 0
    to_visit = find_sitemaps(domain)
    visited = set()
    while to_visit and failures < 2:
        sm = to_visit.pop(0)
        if sm in visited:
            continue
        visited.add(sm)
        text = get(sm, raw=True)
        if not text:
            failures += 1
            continue
        locs, is_index = get_all_locs(text)
        if is_index:
            to_visit.extend(locs)
        else:
            all_urls.update(locs)
    status = "ok" if all_urls else f"FAILED (failures={failures})"
    return all_urls, status

def section_of(url):
    p = urlparse(url).path.lower()
    if '/blog' in p or '/news' in p or '/article' in p or '/guides' in p or '/guide/' in p or '/resources' in p or '/insights' in p:
        return 'blog'
    if '/calculator' in p or '/tool' in p:
        return 'tool'
    if p.rstrip('/') == '' :
        return 'landing'
    if '/pricing' in p or '/product' in p or '/plans' in p:
        return 'pricing'
    return 'service'

def cluster_of(url, topic):
    t = (topic + ' ' + url).lower()
    if 'transfer' in t:
        return 'transfer existing property'
    if 'mortgage' in t or 'finance' in t or 'lending' in t or 'remortgage' in t:
        return 'SPV mortgages'
    if 'non-resident' in t or 'non resident' in t or 'overseas' in t or 'expat' in t:
        return 'non-resident'
    if 'calculator' in t or 'tool' in t:
        return 'tools-calculators'
    if 'pricing' in t or 'price' in t or 'plans' in t or 'package' in t:
        return 'pricing-product pages'
    if 'incorporat' in t or 'form a company' in t or 'company-formation' in t or 'sic-code' in t or 'registered-office' in t or 'set-up' in t or 'setup' in t:
        return 'formation mechanics'
    if 'should-i' in t or 'or-not' in t or 'vs-personal' in t or 'pros-and-cons' in t or 'is-it-worth' in t:
        return 'incorporate-or-not'
    if 'account' in t or 'filing' in t or 'dividend' in t or 'director-loan' in t or 'confirmation-statement' in t or 'corporation-tax' in t or 'bookkeeping' in t or 'payroll' in t:
        return 'running the company (accounts, filings, loans, dividends)'
    return 'other'

def slug_topic(url):
    p = urlparse(url).path.rstrip('/')
    seg = p.split('/')[-1] if p else ''
    seg = re.sub(r'\.(html?|php|aspx)$','',seg, flags=re.I)
    topic = seg.replace('-', ' ').replace('_',' ').strip()
    return topic or '(homepage)'

def main():
    rows = []
    footprint = {}
    for domain in DOMAINS:
        urls, status = crawl_domain(domain)
        if status != 'ok':
            footprint[domain] = {'status': status, 'kept': 0}
            print(f"{domain}: {status}", file=sys.stderr)
            continue
        if domain in BIG:
            kept = [u for u in urls if FILTER_RE.search(urlparse(u).path)]
        else:
            kept = list(urls)
        footprint[domain] = {'status': f'ok (total sitemap urls={len(urls)})', 'kept': len(kept)}
        for u in kept:
            topic = slug_topic(u)
            sec = section_of(u)
            clus = cluster_of(u, topic)
            rows.append((domain, u, sec, clus, topic))
        print(f"{domain}: total={len(urls)} kept={len(kept)}", file=sys.stderr)

    with open(r"C:\Users\user\Documents\Accounting\expansion_research\spv_formation\competitor_urls.csv","w",newline='',encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['domain','url','section','cluster','topic'])
        for r in rows:
            w.writerow(r)

    import json
    with open(r"C:\Users\user\Documents\Accounting\expansion_research\spv_formation\_footprint.json","w",encoding='utf-8') as f:
        json.dump(footprint, f, indent=2)

if __name__ == '__main__':
    main()
