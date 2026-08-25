"""Build topic_pool_final.json for solicitors from DFS universe + GSC + Bing,
reconciled against live sitemap + local content titles + existing blog_topics.
Deterministic; run from repo root: python expansion_research/tier1_solicitors/build_pool.py
"""
import json, re
from collections import defaultdict
from datetime import date
from pathlib import Path

RAW = Path("expansion_research/tier1_solicitors/raw")
OUT = Path("expansion_research/tier1_solicitors/topic_pool_final.json")

# ---------- load ----------
dfs = json.load(open(RAW / "dfs_solicitors_universe.json", encoding="utf-8"))
gsc = json.load(open(RAW / "gsc_queries.json", encoding="utf-8"))
bing = json.load(open(RAW / "bing_queries.json", encoding="utf-8"))
existing = json.load(open(RAW / "existing_blog_topics.json", encoding="utf-8"))
local = json.load(open(RAW / "local_content_titles.json", encoding="utf-8"))
sitemap = [u.strip() for u in open(RAW / "live_sitemap_urls.txt", encoding="utf-8") if u.strip()]

# ---------- junk filter ----------
JUNK = re.compile(
    r"\b(jobs?\b|vacanc\w*|career\w*|salar\w*|recruit\w*|hiring|apprentice\w*|trainee\w*|"
    r"course\w*|degree|qualification\w*|exam\w*|sqe\b|cilex|conference\w*|webinar\w*|"
    r"cv\b|interview\w*|indeed|reed\b|linkedin|glassdoor|"
    # cofa court coventry = a place; cofa pike = a Lake District fell; sigma aldrich cofa = cert of analysis
    r"court|coventry|cheylesmore|jobcentre|job centre|sigma|aldrich|cafe|fisher|"
    r"pike\b|tree\b|wainwright|walk\w*|scafell|langdale|"
    r"login|log in|sign in|portal|phone number|contact number|address|near me|"
    # US noise
    r"attorney\w*|cpa\b|irs\b|401k|texas|california|florida|new york|"
    # branded competitors / tools that are nav intent
    r"hawsons|armstrong watson|menzies|saffery|hazlewoods|mha\b|bdo\b|pkf\b|"
    r"quill|leap\b|clio\b|xero pricing|osprey|insurance\b.*cofa|cofa insurance|"
    r"lms\b|moodle|"
    # careers / consumer / non-legal 'cofa' senses / stray brands
    r"become\b|instagram|twitter|facebook|tiktok|youtube|"
    r"media\b|football|deburring|medicaid|food\b|drink|recipe|"
    r"dallo|my legal cashier)",
    re.I,
)
STOP = {"the", "a", "an", "of", "for", "in", "on", "to", "and", "is", "are", "what",
        "how", "uk", "do", "does", "you", "my", "your", "with", "be", "can", "it"}

def norm_tokens(s):
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    toks = []
    for t in s.split():
        if t in STOP:
            continue
        # crude singularise
        if len(t) > 3 and t.endswith("s") and not t.endswith("ss"):
            t = t[:-1]
        # domain synonyms
        t = {"lawyer": "solicitor", "solicitor": "solicitor", "firm": "firm",
             "account": "account", "accounting": "account", "accountancy": "account",
             "accountant": "accountant", "rule": "rule"}.get(t, t)
        toks.append(t)
    return frozenset(toks)

# ---------- candidate rows ----------
cands = {}  # kw -> {kw, volume, kd, sources:set}
def add(kw, volume, kd, source):
    k = kw.lower().strip()
    if not k or len(k) < 4 or not k.isascii() or JUNK.search(k):
        return
    # 'cofa' is wildly polysemous (Compact of Free Association, College of Fine Arts,
    # certificate of analysis...) — keep only when legal context is explicit
    if "cofa" in k and not re.search(r"law|legal|sra|colp|solicitor|firm|breach|report|role|dut|responsib|account", k):
        return
    row = cands.setdefault(k, {"keyword": k, "volume": None, "kd": None, "sources": set()})
    if volume is not None and (row["volume"] is None or volume > row["volume"]):
        row["volume"] = volume
    if kd is not None and row["kd"] is None:
        row["kd"] = kd
    row["sources"].add(source)

for r in dfs:
    if (r.get("volume") or 0) > 100000:  # "indeed"-class outliers
        continue
    add(r["keyword"], r.get("volume"), r.get("kd"), "dfs")

gsc_agg = defaultdict(int)
for r in gsc:
    gsc_agg[r["query"].lower().strip()] += r.get("impressions") or 0
for q, imp in gsc_agg.items():
    if imp >= 10:
        add(q, None, None, "gsc")

bing_agg = defaultdict(int)
for r in bing:
    bing_agg[r["query"].lower().strip()] += r.get("impressions") or 0
for q, imp in bing_agg.items():
    if imp >= 10:
        add(q, None, None, "bing")

# ---------- cluster near-dupes: identical normalised token signature ----------
sig_groups = defaultdict(list)
for row in cands.values():
    sig_groups[norm_tokens(row["keyword"])].append(row)

clusters = []
for sig, rows in sig_groups.items():
    if not sig:
        continue
    rows.sort(key=lambda r: (-(r["volume"] or 0), len(r["keyword"])))
    head = rows[0]
    clusters.append({
        "head": head["keyword"],
        "members": [r["keyword"] for r in rows],
        "volume": max((r["volume"] or 0) for r in rows) or None,
        "kd": head["kd"],
        "sources": sorted(set().union(*(r["sources"] for r in rows))),
        "_sig": sig,
    })

# merge: cluster whose sig is a superset of another (>=2 tok) head with same core → light second pass
# ponytail: signature-equality clustering only; subset-merge pass if dupe rate proves high

# ---------- categorise ----------
def category(head):
    h = head
    if re.search(r"sra|accounts rule|colp|cofa|compliance|breach|regulat|audit", h): return "SRA Compliance"
    if re.search(r"client (account|money)|client ledger|residual|interest", h): return "Client Account"
    if re.search(r"legal aid|billing|wip|disbursement|lockup|lock-up|fee earner|matter", h): return "Billing & Legal Aid"
    if re.search(r"llp|partner|partnership|equity|drawings|profit shar", h): return "Partnership & LLP"
    if re.search(r"cashier|bookkeep|reconcil", h): return "Legal Cashiering"
    if re.search(r"software|xero|quickbooks|tool|calculator|system", h): return "Software & Tools"
    if re.search(r"vat\b|tax|hmrc|self assessment|allowance|relief|ir35|pension|ni\b", h): return "Tax"
    if re.search(r"locum|barrister|consultant solicitor|freelance|self.?employed", h): return "Individual Lawyers"
    if re.search(r"profitab|cash flow|budget|kpi|benchmark|merger|acquisition|valu|practice management|start.*firm|law firm finance", h): return "Practice Finance"
    if re.search(r"accountant|accounting|account", h): return "Accounts General"
    return "Other"

for c in clusters:
    c["category"] = category(c["head"])

# ---------- coverage reconcile (title/intent match, not slug-only) ----------
covered_sigs = []
def add_cov(text):
    s = norm_tokens(text)
    if s:
        covered_sigs.append(s)

for u in sitemap:
    add_cov(u.rstrip("/").split("/")[-1].replace("-", " "))
for r in local:
    add_cov(r["title"]); add_cov(r["slug"].replace("-", " "))
for r in existing:
    add_cov(r["topic"]); add_cov(r.get("primary_keyword") or "")
existing_kw_sigs = {norm_tokens(r.get("primary_keyword") or r["topic"]) for r in existing}

def is_covered(sig):
    for cs in covered_sigs:
        if not cs:
            continue
        inter = len(sig & cs)
        if inter == len(sig) or inter == len(cs) or inter / len(sig | cs) >= 0.6:
            return True
    return False

for c in clusters:
    c["covered"] = is_covered(c["_sig"])
    c["in_existing_pool"] = c["_sig"] in existing_kw_sigs
    del c["_sig"]

clusters.sort(key=lambda c: -(c["volume"] or 0))
pool = {"site_key": "solicitors", "source_tag": "gsc+bing+dfs-2026-07-14",
        "generated": str(date.today()), "clusters": clusters}
OUT.write_text(json.dumps(pool, indent=1), encoding="utf-8")

netnew = [c for c in clusters if not c["covered"]]
print(f"candidates {len(cands)} clusters {len(clusters)} covered {len(clusters)-len(netnew)} "
      f"net-new {len(netnew)} net-new-with-vol {sum(1 for c in netnew if c['volume'])}")
cats = defaultdict(int)
for c in netnew:
    cats[c["category"]] += 1
print(dict(sorted(cats.items(), key=lambda x: -x[1])))
for c in [c for c in netnew if c["volume"]][:25]:
    print(c["volume"], "|", c["category"], "|", c["head"])
