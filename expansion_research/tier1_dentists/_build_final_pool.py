"""Hand-curated dentists top-up pool from clusters_draft.json (2026-07-14)."""
import json
from pathlib import Path

HERE = Path(__file__).parent
draft = json.load(open(HERE / "clusters_draft.json"))
by_head = {c["head"]: c for c in draft}

def mem(*heads):
    out = []
    for h in heads:
        c = by_head.get(h)
        if c:
            out += c["members"]
    seen = set(); res = []
    for m in out:
        if m not in seen:
            seen.add(m); res.append(m)
    return res

CUR = [
 ("selling a dental practice tax", ["selling a dental practice taxes"], None, "Practice Sales", ["gsc"]),
 ("how much is my dental practice worth", ["how much is my dental practice worth wales", "how much do dental practices sell for uk"], None, "Valuation", ["gsc"]),
 ("dental practice valuation rule of thumb", ["dental practice valuation rule of thumb"], 10, "Valuation", ["dfs"]),
 ("uda value checker", ["uda value checker", "how much is 1 uda dental", "new uda value nhs", "minimum uda value england", "national uda rate 2026/27", "what is annual uda remuneration"], None, "NHS Contracts & UDA", ["gsc", "bing"]),
 ("what is a uda in dentistry", ["what is uda in dentistry", "uda system explained", "what do udas depend on in the uk", "uda allocation", "uda cost meaning", "define uda allocation dental"], None, "NHS Contracts & UDA", ["gsc", "bing"]),
 ("uda clawback and underdelivery", ["nhs dentistry clawback uda underdelivery england"], None, "NHS Contracts & UDA", ["bing"]),
 ("gds and pds contracts explained", ["pds agreement", "what are the terms for a pds dental contract", "gds/pds performer fee", "dental contract guidance"], None, "NHS Contracts & UDA", ["bing"]),
 ("statement of dental remuneration scotland (sdr)", ["sdr determination 1", "sdr seniority", "sdr items of service", "standard dental remuneration scotland supervision of retention"], None, "NHS Scotland", ["bing"]),
 ("scotland dental allowances (rural, recruitment, golden hello)", ["nhs dentist recruitment and retention bonus scotland", "recruitment and retention allowance nhs scotland dental", "golden hello dentist scotland sdr", "what percentage of dental practice rent do scotland nhs pay through allowances"], None, "NHS Scotland", ["bing"]),
 ("nhs wales dental contract reform 2026", ["nhs wales dentistry contract changes", "nhs dental contracts wales april 2026", "nhs wales dental contract 2026 breakdown", "nhs wales dental regulations 2026"], None, "NHS Wales", ["bing"]),
 ("dental practice goodwill funding", ["goodwill funding practice purchase", "dental goodwill lending"], None, "Finance & Lending", ["gsc", "bing"]),
 ("specialist dental finance", ["specialist dental finance", "dental finance london"], None, "Finance & Lending", ["gsc", "bing"]),
 ("dentist self employed or limited company", ["dentist self employed or limited company"], None, "Incorporation & Structure", ["gsc"]),
 ("sole trader dentist costs", ["what costs will i incur as a private sole trader dentist"], None, "Incorporation & Structure", ["bing"]),
 ("employed vs self employed dentist", ["difference between employed dentist vs self employed in uk"], None, "Associates & Locums", ["bing"]),
 ("associate dentist contract (bda model agreement)", ["associate dentist contract", "bda dental contract template", "bda guidance for associates"], None, "Associates & Locums", ["gsc", "bing"]),
 ("how does associate dentist pay work in private practice", ["how does associate dentist pay work in the private sector uk"], None, "Associates & Locums", ["bing"]),
 ("foundation dentist salary and pension", ["foundation dentist salary 2025", "foundation dentists salary support", "what is nhs pension contribution dental foundatoion training"], None, "Associates & Locums", ["bing"]),
 ("dental practice owner income uk", ["how much does a dental practice owner make uk", "clinic owner take home pay uk", "dentist owner salary", "average profit of dentist praxctice owner", "private practice owner pay uk 2026"], None, "Accounts & Benchmarks", ["gsc", "bing"]),
 ("dental practice chart of accounts", ["dental practice chart of accounts"], 10, "Accounts & Benchmarks", ["dfs"]),
 ("xero for dental practices", ["dental practice xero"], None, "Software & Tools", ["gsc"]),
 ("vat for dental practices", ["is dentistry vat exempt", "dental practices exempt from vat", "does a dental practice need to be vat registered", "do i need to register for vat as a dental sole practitioner", "vat rules for dental practices rules and regulations", "vat on dental surgery uk", "vat rate on dental", "current cost of vat on dental equipment and tools", "dentist earning over 100k should he be registered for vat"], None, "VAT", ["bing"]),
 ("nhs pension net pensionable earnings (npe) for dentists", ["npe calculation", "npe dental", "what is npe for dentistry", "nhs dental net pensionable earnings calculation guidance"], None, "NHS Pension", ["bing"]),
 ("dentist superannuation calculation", ["how to calculate a dentists superannuation earnings", "how do you calculate the nhs superannuation for dentist", "arr calculation for nhs dentists", "superannuation tiers dental 2026", "performers' superannuation contribution uk dentistry", "nhs pension deductions dentistry uk"], None, "NHS Pension", ["bing"]),
 ("is nhs superannuation tax deductible for dentists", ["nhs superannuation for dentists fully deductible for tax purposes", "ptm044100 tax relief on contributions paid by general practitioners and dentists", "superannuation tax bracket dentist"], None, "NHS Pension", ["bing", "gsc"]),
 ("nhs pension for limited company and self-employed dentists", ["nhs dentist pension limited company", "self employed dentist nhs pension"], None, "NHS Pension", ["dfs"]),
 ("pension advice for dentists", ["pension advice for dentists", "what percentage of slary should a dentist save into a penion"], None, "Wealth & Retirement", ["gsc", "bing"]),
 ("cpd allowance for dentists", ["cpd allowance for dentists"], None, "Expenses & Reliefs", ["gsc"]),
 ("dentist tax deduction checklist", ["dentist tax write off"], 10, "Expenses & Reliefs", ["dfs"]),
 ("cqc fees accounting treatment", ["cqc accreditation fees where it will go in expense in uk accounting"], None, "Expenses & Reliefs", ["bing"]),
 ("dentistry compliance", ["denistry compliance"], None, "Compliance", ["bing"]),
 ("dentist salary uk after tax", ["dentist salary uk after tax", "how much tax does a dentist pay", "dental tax calculator"], 20, "Tax", ["dfs", "bing"]),
 ("questions to ask when buying a dental practice", ["questions to ask when buying dental practice", "what to look for when buying a dental practice", "things to consider when buying a dental practice", "appraising a dental practice before buying"], 10, "Practice Purchase", ["dfs"]),
 ("is buying a dental practice worth it", ["is buying a dental practice worth it"], 10, "Practice Purchase", ["dfs"]),
 ("buying your first dental practice", ["buying your first dental practice", "buying your own dental practice", "advice on buying a dental practice"], None, "Practice Purchase", ["dfs"]),
 ("business plan for buying a dental practice", ["business plan for buying a dental practice"], None, "Practice Purchase", ["dfs"]),
 ("buying a dental practice without a broker", ["buying a dental practice without a broker"], None, "Practice Purchase", ["dfs"]),
 ("cost of opening a dental practice", ["typical costs opening up dental practice"], None, "Squat Practices", ["bing"]),
 ("setting up a squat dental practice: business plan", ["setting up squat dental practice", "squat dental practice business plan"], None, "Squat Practices", ["dfs"]),
 ("questions to ask a dental accountant", ["questions to ask dental accountant"], None, "Service", ["dfs"]),
 ("dental accountant northern ireland", ["dental accountant northern ireland"], None, "Locations", ["dfs"]),
]

# Manually verified against live sitemap 2026-07-14 (245 URLs) — genuinely net-new heads.
# Everything else has a live page covering the same intent (optimise, don't create).
NET_NEW = {
    "scotland dental allowances (rural, recruitment, golden hello)",
    "dental practice goodwill funding",
    "specialist dental finance",
    "dental practice chart of accounts",
    "xero for dental practices",
    "pension advice for dentists",
    "dentist salary uk after tax",
    "questions to ask when buying a dental practice",
    "is buying a dental practice worth it",
    "buying your first dental practice",
    "business plan for buying a dental practice",
    "buying a dental practice without a broker",
    "setting up a squat dental practice: business plan",
    "dental accountant northern ireland",
}

clusters = []
for head, srcs_heads, vol, cat, sources in CUR:
    members = mem(*srcs_heads)
    if head not in members:
        members = [head] + members
    v = vol
    for h in srcs_heads:
        c = by_head.get(h)
        if c and c.get("volume") and (v is None or c["volume"] > v):
            v = c["volume"]
    clusters.append({"head": head, "members": members, "volume": v, "kd": None,
                     "sources": sources, "category": cat, "covered": head not in NET_NEW})

pool = {"site_key": "dentists", "source_tag": "dentists_pool_2026-07", "generated": "2026-07-14",
        "notes": "top-up pool: GSC 90d + Bing snapshot + DFS keyword_suggestions (10 seeds, $0.14); hand-curated from clusters_draft.json (271 clusters, 226 raw net-new incl. patient-intent/typo junk)",
        "clusters": clusters}
(HERE / "topic_pool_final.json").write_text(json.dumps(pool, indent=1), encoding="utf-8")
print("final clusters:", len(clusters), "| with volume:", len([c for c in clusters if c["volume"]]))
