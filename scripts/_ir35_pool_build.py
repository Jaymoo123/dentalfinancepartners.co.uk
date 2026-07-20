"""Build contractors-ir35 fresh topic pool from DFS universe + cross-site GSC/Bing piggyback.

Junk-filters, clusters near-dupes, categorises, reconciles vs existing blog_topics rows +
local content inventory, writes expansion_research/tier1_ir35/topic_pool_final.json.
Pattern: trade pool build (docs/_engines/CONTENT_GAP_ENRICHMENT.md).
Free — no paid calls. Run: python scripts/_ir35_pool_build.py
"""
import json, re, sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
RAW = REPO / "expansion_research/tier1_ir35/raw"
OUT = REPO / "expansion_research/tier1_ir35/topic_pool_final.json"

# ── load sources ─────────────────────────────────────────────────────────────
dfs = json.load(open(RAW / "dfs_ir35_universe.json", encoding="utf-8"))
gsc = json.load(open(REPO / "expansion_research/tier1_ir35_gsc_piggyback_tmp.json", encoding="utf-8"))
bing = json.load(open(REPO / "expansion_research/tier1_ir35_bing_piggyback_tmp.json", encoding="utf-8"))
pool_existing = json.load(open(REPO / "expansion_research/tier1_ir35_existing_pool_tmp.json", encoding="utf-8"))

existing_kw = {(r["primary_keyword"] or "").lower().strip() for r in pool_existing}

# ── junk filter ───────────────────────────────────────────────────────────────
# note: excludes non-UK tax (1099/CRA/IRS/ireland/india), insecticide (ir3535),
# pop-culture (umbrella corporation/resident evil), jobs-board intent, branded
# competitors, software-brand nav, HMRC pure-nav, and unrelated "contractor" trades.
JUNK = re.compile(r"""
    \b(1099|w2|w-2|irs|cra|canada|ireland|india|australia|usa|texas|california)\b
  | ir3535 | picaridin | insecticide | repellent
  | umbrella\ corporation | resident\ evil
  | \b(jobs?|vacanc|recruit(er|ment)?|hiring|careers?|salary\ survey)\b
  | \b(crunch|sjd|parasol|paystream|brookson|nixon\ williams|clearsky|gorilla|
      aardvark|churchill\ knight|dolan|maslins|intouch|workwell|orange\ genie,?|
      danbro|qdos|kingsbridge|caroola)\b
  | \b(giant|sapphire|nasa|generate|advance|liquid\ friday|paystream|umbrella\.co)\ umbrella\b
  | (giant|sapphire|nasa|generate|advance)\ umbrella\ company
  | the\ umbrella\ company\ sheffield | umbrella\ company\ sheffield
  | \b(giant|nasa|i4|dbs|focus(ed)?|sapphire|generate|advance)\b.*\bumbrella
  | umbrella\ compan(y|ies)\ (giant|nasa|i4|dbs|focus(ed)?)
  | (golf|printed|branded)\ umbrella | (logo|golf).*umbrella | umbrella.*\b(logo|golf)\b
  | (omnia|sterling|white\ company|compass|clarity|orca|vantage|atlantic)\ umbrella
  | umbrella\ company\ for\ dbs | \blondon\ umbrella | \bmanchester\ umbrella
  | umbrella\ company\ (in\ )?(london|manchester|leeds|birmingham|glasgow)
  | (clipper|big\ fish|bright|pure|smart\ work|fast|simply)\ umbrella
  | \b(quickbooks|xero\ price|freeagent\ login|sage\ login)\b
  | login | \.gov\.uk\ sign\ in
  | \b(general\ contractor|roofing|hvac|plumb|paint(er|ing)|landscap)\b   # US home-improvement intent
""", re.X | re.I)

STOP = set("what is a an the are do does can i my you your how to for of in on uk mean means meaning it be am will with and or vs versus".split())

SYN = {"wage": "pay", "salary": "pay", "payment": "pay", "wages": "pay",
       "top": "best", "good": "best", "comparison": "compare", "comparisons": "compare", "cheapest": "cheap"}
STOP.add("v")

def toks(kw):
    out = set()
    for w in re.findall(r"[a-z0-9&]+", kw.lower()):
        w = SYN.get(w, w.rstrip("s"))
        if w not in STOP:
            out.add(w)
    return frozenset(out)

# ── build candidate rows ─────────────────────────────────────────────────────
cands = {}  # kw -> row
excluded = []
for r in dfs:
    kw = r["keyword"].lower().strip()
    if JUNK.search(kw):
        excluded.append(kw); continue
    cands[kw] = {"keyword": kw, "volume": r.get("volume"), "kd": r.get("kd"), "sources": {"dfs"}}

RELEVANT = re.compile(r"ir35|umbrella|contractor|off.payroll|\bcest\b|deemed employ|personal service|day rate|inside ir|outside ir")
for r in gsc + bing:
    kw = r["query"].lower().strip()
    src = ("gsc:" if "impr" in r and r in gsc else "bing:") + r["site_key"]
    if JUNK.search(kw) or not RELEVANT.search(kw):
        continue
    if len(kw) > 80 or "r&d" in kw or "significant control" in kw or "psc verification" in kw:
        continue  # PSC=person-with-significant-control noise, R&D subcontractor noise
    row = cands.setdefault(kw, {"keyword": kw, "volume": None, "kd": None, "sources": set()})
    row["sources"].add(src)

# ── cluster near-dupes (identical content-token sets) ────────────────────────
groups = defaultdict(list)
for row in cands.values():
    groups[toks(row["keyword"])].append(row)

clusters = []
for t, rows in groups.items():
    if not t:
        continue
    rows.sort(key=lambda r: -(r["volume"] or 0))
    head = rows[0]
    clusters.append({
        "head": head["keyword"],
        "members": [r["keyword"] for r in rows],
        "volume": head["volume"],
        "kd": head["kd"],
        "sources": sorted(set().union(*[r["sources"] for r in rows])),
        "_toks": t,
    })

# second pass: merge clusters whose token set is a superset of another head's
# set with exactly one extra generic token (uk, 2025, 2026, calculator kept separate)
GENERIC = {"uk", "2024", "2025", "2026", "gov", "hmrc", "england"}
by_toks = {c["_toks"]: c for c in clusters}
merged = set()
for c in sorted(clusters, key=lambda c: len(c["_toks"]), reverse=True):
    if id(c) in merged:
        continue
    extra = None
    for g in GENERIC:
        if g in c["_toks"]:
            base = c["_toks"] - {g}
            tgt = by_toks.get(base)
            if tgt and id(tgt) not in merged and tgt is not c:
                tgt["members"] += c["members"]
                if (c["volume"] or 0) > (tgt["volume"] or 0):
                    tgt["volume"], tgt["kd"], tgt["head"] = c["volume"], c["kd"], c["head"]
                tgt["sources"] = sorted(set(tgt["sources"]) | set(c["sources"]))
                merged.add(id(c))
                break
clusters = [c for c in clusters if id(c) not in merged]

# ── categorise ───────────────────────────────────────────────────────────────
def categorise(kw):
    if re.search(r"calculat|take.home|day rate|how much (will|do) i (earn|take)", kw): return "Take-home & Calculators"
    if re.search(r"umbrella", kw): return "Umbrella"
    if re.search(r"expense|mileage|travel|subsistence|home office|claim", kw): return "Expenses"
    if re.search(r"cest|sds|status determination|determination|off.payroll|deemed|compliance|penalt|investigat|hmrc (check|enquiry)|fee.payer|msc", kw): return "Compliance"
    if re.search(r"ir35|inside ir|outside ir|intermediaries", kw): return "IR35 Rules"
    if re.search(r"limited company|ltd|psc|personal service|dividend|salary|corporation tax|director|vat|incorporat|sole trader", kw): return "PSC & Limited Co"
    return "Contractor Basics"

for c in clusters:
    c["category"] = categorise(c["head"])

# ── coverage reconcile ───────────────────────────────────────────────────────
# 1) existing blog_topics keyword match (any member) → drop cluster entirely (no reseed)
# 2) local content inventory slug-token match → covered=true (seeded used=true)
# slug map from the reconcile pass — parse statically (importing runs live SQL)
import ast
_src = (REPO / "scripts/_ir35_coverage_reconcile.py").read_text(encoding="utf-8")
COVERAGE = next(ast.literal_eval(n.value) for n in ast.walk(ast.parse(_src))
                if isinstance(n, ast.Assign) and getattr(n.targets[0], "id", "") == "COVERAGE")

blog_slugs = [p.stem for p in (REPO / "contractors-ir35/web/content/blog").glob("*.md")]
calc_slugs = [p.stem for p in (REPO / "contractors-ir35/web/src/lib/calculators/tools").glob("*.ts")]
page_slugs = ["ir35-status", "services", "about", "contact", "glossary", "resources",
              "it-contractors", "engineering-contractors", "finance-contractors",
              "management-consultants", "project-managers", "nhs-locum-doctors",
              "oil-gas-contractors", "legal-contractors", "marketing-contractors",
              "construction-contractors", "uk-contractor-index"]
slug_toksets = {s: toks(s.replace("-", " ")) for s in blog_slugs + calc_slugs + page_slugs}

# obvious coverage the slug-token heuristic misses (existing posts serve the intent)
EXTRA_COVERAGE = [
    (re.compile(r"^off.payroll working( uk| rules)?$"), "blog/off-payroll-working-rules-private-sector"),
    (re.compile(r"\bcest\b|check employment status for tax"), "blog/how-to-use-cest-tool"),
    (re.compile(r"^(how do(es)? (an? )?umbrella compan(y|ies) work|umbrella company definition|what does an? umbrella company do|umbrella company payroll)\b"), "blog/umbrella-company-explained"),
    (re.compile(r"\b(best|top|good|compare|comparison)s?\b.*umbrella|umbrella compan(y|ies) (compare|comparison|review)|fcsa accredited"), "blog/best-umbrella-company-how-to-choose"),
    (re.compile(r"umbrella (company )?(fee|charge|cost)s?|how much does an? umbrella company (charge|take|cost)"), "blog/umbrella-company-deductions-explained"),
    (re.compile(r"(ltd|limited)( company)? (vs?|versus|or) umbrella|umbrella( company)? (vs?|versus|or) (ltd|limited)"), "calc/umbrella-vs-limited-calculator"),
]

def covered_by_content(members):
    for m in members:
        for rx, dest in EXTRA_COVERAGE:
            if rx.search(m):
                return dest
        dest = COVERAGE.get(m)
        if dest and dest != "JUNK":
            return dest
        mt = toks(m)
        if not mt:
            continue
        for slug, st in slug_toksets.items():
            if st and st <= mt:  # slug tokens fully contained in keyword
                return slug
    return None

dropped_existing = 0
final = []
for c in clusters:
    if any(m in existing_kw for m in c["members"]):
        dropped_existing += 1
        continue
    dest = covered_by_content(c["members"])
    c["covered"] = bool(dest)
    if dest:
        c["covered_by"] = dest
    del c["_toks"]
    final.append(c)

final.sort(key=lambda c: -(c["volume"] or 0))
out = {"site_key": "contractors-ir35", "source_tag": "dfs-pool-2026-07-14",
       "generated": "2026-07-14", "clusters": final}
OUT.write_text(json.dumps(out, indent=1), encoding="utf-8")

# ── report ───────────────────────────────────────────────────────────────────
netnew = [c for c in final if not c["covered"]]
withvol = [c for c in netnew if (c["volume"] or 0) > 0]
print(f"universe dfs={len(dfs)} junk-excluded={len(excluded)} candidates={len(cands)}")
print(f"clusters={len(final)} (dropped {dropped_existing} already in blog_topics)")
print(f"covered={len(final)-len(netnew)} net-new={len(netnew)} net-new-with-volume={len(withvol)}")
from collections import Counter
print("net-new by category:", dict(Counter(c['category'] for c in netnew).most_common()))
print("\nTop 25 net-new by volume:")
for c in netnew[:25]:
    print(f"  vol={c['volume'] or 0:5d} kd={c['kd'] if c['kd'] is not None else '-':>3} [{c['category']}] {c['head']}  ({len(c['members'])} kw)")
print(f"\n-> {OUT}")
