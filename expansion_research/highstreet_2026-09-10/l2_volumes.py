"""High-street map, Leg 2: real search volume for every discovered term. PAID.

Google Ads search_volume (NOT Labs), which is the same source the 2026-07 R2D pull used,
so figures here are comparable with C3_DEMAND.md. Batched 1000 keywords per task.

Input  : raw/autocomplete/*.json (leg 1, free discovery)
Output : volumes.json  {keyword: {volume, cpc, competition, monthly_searches}}
         and terms.json {niche_id: [keywords priced for that niche]}

Junk is stripped BEFORE paying for it, because volume is charged per keyword.

Usage:
    python l2_volumes.py --dry     # show what would be priced and the cost, pay nothing
    python l2_volumes.py           # price them
"""
from __future__ import annotations

import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

AC = HERE / "raw" / "autocomplete"
BATCH = 1000
COST_BASE, COST_PER_KW = 0.075, 0.0015
GENERIC_MAX = 4  # a suggestion produced by more than 4 unrelated niches is drift
GENERIC_COUNT: Counter = Counter()

# Never pay to price these.
JUNK_RE = re.compile(
    r"\bjobs?\b|salary|salaries|vacanc|career|hiring|apprentice|\bcourse\b|degree|"
    r"diploma|qualification|how to become|"
    r"australia|\bcanada\b|\busa\b|american|\bindia\b|dubai|singapore|philippines|"
    r"\bgst\b|\birs\b|\bnz\b|new zealand|california|texas|florida|springfield|"
    r"login|sign in|quickbooks|\bxero\b|\bsage\b|freshbooks|template|"
    r"near me|opening times|phone number|reviews?\b|"
    # Named firms: someone looking these up is not looking for us.
    r"baker tilly|\bpwc\b|\bkpmg\b|deloitte|\bbdo\b|grant thornton|"
    r"\brsm\b|mazars|azets|xeinadin|baker street|"
    # Study material and exams, mostly non-UK curricula.
    r"class 1[0-2]\b|dk goel|ts grewal|ncert|\bexam\b|syllabus|"
    r"question paper|solutions? chapter|\bmcq\b|"
    # US and other place names that ride in on trade nouns.
    r"oregon|texas|\bohio\b|\biowa\b|\butah\b|idaho|kansas|nebraska|dakota|montana|"
    r"ballston|\bnyc\b|brooklyn|chicago|seattle|denver|"
    # Generic non-commercial phrasings.
    r"email example|\bmeaning\b|definition|wikipedia|\bquiz\b", re.I)

# Keep only terms that are actually about money, tax or engaging a professional.
KEEP_RE = re.compile(
    r"\btax|\bvat\b|hmrc|accountant|accountants|accountancy|accounts?\b|accounting|"
    r"bookkeep|book-?keep|duty|duties|relief|allowance|expense|deduct|payroll|paye|"
    r"\bnic\b|self.?assessment|invoice|profit|turnover|threshold|scheme|"
    r"capital allowance|\bcis\b|corporation|dividend|ir35|margin|exempt|zero.?rated|"
    r"rated|\breturn\b|write.?off|claim|registered|registration|rebate|"
    r"cash basis|sole trader|limited company|incorporat", re.I)


# Google Ads rejects the whole TASK, not just the offending row, if any keyword
# breaks its input rules. Two rules bit us, each silently zeroing a whole batch:
# characters outside its accepted set, and a hard limit of ten words per keyword
# ("can you claim vat back on carpets on a new build" is eleven). Both are screened
# here, before anything is sent.
ADS_SAFE_RE = re.compile(r"[a-z0-9 '&/.,+-]+")
ADS_MAX_WORDS = 10

# "tax" in a sense that has nothing to do with running a business. These ride in on
# any template containing the word and they carry large consumer volume.
HOMONYM_RE = re.compile(
    r"tax (my |the )?car|car tax|road tax|vehicle tax|tax disc|tax a vehicle|"
    r"tax converter|tax translat|tax code (checker|lookup)?$|"
    r"council tax|tax credits? (claim|helpline|number)|child tax|"
    r"tax refund company|tax rebate company|tax free childcare|"
    r"tax advisor (london|manchester|birmingham|leeds|edinburgh|glasgow|bristol|"
    r"liverpool|cardiff|belfast|malta|dubai|spain)|"
    r"tax (advisor|adviser|consultant) (magazine|jobs|salary)", re.I)

VOCAB_RE: dict = {}


def ads_priceable(t: str) -> bool:
    return (6 < len(t) <= 80
            and len(t.split()) <= ADS_MAX_WORDS
            and bool(ADS_SAFE_RE.fullmatch(t)))

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "uk", "your"}

# Words that may legitimately sit in front of the trade noun without turning the
# phrase into somebody's surname.
TRADE_CONNECTORS = {"for", "a", "an", "the", "my", "your", "small", "local", "independent",
                    "uk", "best", "specialist", "online", "mobile", "self", "employed"}


def singular_word(w: str) -> str:
    if w.endswith("ies") and len(w) > 4:
        return w[:-3] + "y"
    if w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w


def toks(s: str) -> list[str]:
    return [t for t in re.findall(r"[a-z]+", s.lower()) if t not in STOP and len(t) > 1]


def variants(word: str) -> set[str]:
    out = {word}
    if word.endswith("y"):
        out.add(word[:-1] + "ies")
    if word.endswith("s"):
        out.add(word[:-1])
    else:
        out.add(word + "s")
        out.add(word + "es")
    return out


def main() -> None:
    dry = "--dry" in sys.argv
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        spec = {n["id"]: n for n in csv.DictReader(f, delimiter="\t")}

    with (HERE / "vocab.tsv").open(encoding="utf-8") as f:
        for row in csv.DictReader(f, delimiter="	"):
            alts = "|".join(re.escape(v.strip()) for v in row["vocab"].split("|")
                            if v.strip())
            # match the vocabulary phrase and let it carry a plural
            VOCAB_RE[row["id"]] = re.compile(rf"(?:{alts})(?:s|es)?", re.I)

    # How many different niches produced each suggestion. A term thrown up by many
    # unrelated niches is a completion that drifted off the template, not demand.
    global GENERIC_COUNT
    GENERIC_COUNT = Counter()
    for path in AC.glob("*.json"):
        d = json.loads(path.read_text(encoding="utf-8"))
        GENERIC_COUNT.update(set(d["unique"]))

    per_niche: dict[str, list[str]] = {}
    long_questions: dict[str, list[str]] = {}
    for path in sorted(AC.glob("*.json"), key=lambda p: int(p.stem)):
        d = json.loads(path.read_text(encoding="utf-8"))
        nid = d["niche"]["id"]

        # A term must NAME its own trade, or carry at least two words of the tax
        # mechanic. Blacklists cannot keep up here: "accountant floral park ny" and
        # "accountant boston spa" both pass a tax-word test, and both are US
        # localities riding in on the template. Requiring the trade noun kills the
        # whole class at once.
        trade: set[str] = set()
        for w in toks(spec[nid]["seed_core"]):
            trade |= variants(w)
        mech = set(toks(spec[nid]["mechanic_seed"]))

        def firm_name(t: str) -> bool:
            """'kerry butcher accountancy services', 'fred butcher accountant'.

            Butcher, Baker, Mason, Taylor, Fisher, Barber, Farmer and Chandler are all
            surnames as well as trades, and accountants have those surnames. The tell
            is a word in front of the trade noun: "butcher accountant" is the trade,
            "fred butcher accountant" is a man. Without this the surname trades price
            their own competitors' brand searches as if it were niche demand.
            """
            words = t.split()
            for i, w in enumerate(words):
                if singular_word(w) not in trade:
                    continue
                prev = words[i - 1] if i else ""
                nxt = words[i + 1] if i + 1 < len(words) else ""
                nxt2 = words[i + 2] if i + 2 < len(words) else ""
                # "fred butcher accountant": a name in front of the trade
                if prev and prev not in TRADE_CONNECTORS and nxt.startswith("account"):
                    return True
                # "carpenter box accountants worthing": a name behind it
                if nxt and nxt not in TRADE_CONNECTORS and nxt2.startswith("account"):
                    return True
            return False

        def on_topic_v2(t: str) -> bool:
            """A term belongs to this niche only if it names the trade or its trade's
            own vocabulary, and is about tax.

            Provenance alone was not enough. Autocomplete drifts off the template and
            the drift is high volume, so it dominates: "translator tax" completed to
            "tax converter uk" at 60,500, and "post office tax" completed to "post
            office tax car", which is people taxing a car. The vocabulary list is per
            niche and includes the trade's PRODUCTS, so "is there vat on newspapers"
            still qualifies for newsagents.
            """
            if firm_name(t) or HOMONYM_RE.search(t):
                return False
            return bool(VOCAB_RE[nid].search(t)) and bool(KEEP_RE.search(t))

        def on_topic(t: str) -> bool:
            """Provenance first, vocabulary second.

            Every suggestion in this file was returned for a query built from THIS
            niche's templates, so it is on topic by construction. Requiring the term
            to repeat the trade noun threw away the queries people actually type:
            "is there vat on newspapers" (newsagents) and "is there vat on laundry
            services" (launderettes) were both discarded because the product is not
            called the same thing as the trade.

            So a term is kept unless it is a floating generic: no shared vocabulary
            with this niche AND produced by many unrelated niches too, which is what
            a completion that drifted off the template looks like.
            """
            if firm_name(t):
                return False
            tk = set(toks(t))
            if tk & trade or tk & mech:
                return True
            return GENERIC_COUNT.get(t, 0) <= GENERIC_MAX

        kept = [t for t in d["unique"]
                if not JUNK_RE.search(t) and KEEP_RE.search(t) and on_topic_v2(t)]
        terms = [t for t in kept if ads_priceable(t)]
        # Real questions Google Ads will not price because they run over ten words.
        # They are still evidence of demand, so they are recorded, not discarded.
        long_questions[nid] = [t for t in kept if not ads_priceable(t)]
        # Always price the four canonical head terms even if autocomplete never
        # suggested them; a null volume is itself a finding.
        core = spec[nid]["seed_core"]
        for head in (f"{core} accountant", f"accountant for {core}",
                     f"{core} tax", spec[nid]["mechanic_seed"]):
            if head not in terms:
                terms.append(head)
        per_niche[nid] = sorted(set(terms))

    # Already-priced keywords are never re-bought. This makes the leg safe to run in
    # waves as discovery lands, instead of one all-or-nothing call at the end.
    vols_path = HERE / "volumes.json"
    already: dict[str, dict] = (
        json.loads(vols_path.read_text(encoding="utf-8")) if vols_path.exists() else {})

    unique = sorted({t for v in per_niche.values() for t in v} - set(already))
    n_batches = (len(unique) + BATCH - 1) // BATCH
    est = n_batches * COST_BASE + len(unique) * COST_PER_KW
    if already:
        print(f"already priced    : {len(already)} (not re-bought)")

    print(f"niches swept      : {len(per_niche)}")
    print(f"terms after filter: {sum(len(v) for v in per_niche.values())}")
    print(f"unique to price   : {len(unique)}")
    print(f"batches           : {n_batches}")
    print(f"estimated cost    : ${est:.2f}")

    (HERE / "terms.json").write_text(json.dumps(per_niche, indent=1), encoding="utf-8")
    (HERE / "long_questions.json").write_text(
        json.dumps(long_questions, indent=1), encoding="utf-8")
    if dry:
        print("\n--dry: nothing paid. Sample:")
        for t in unique[:15]:
            print("   ", t)
        return

    from optimisation_engine.clients.dataforseo_client import DataForSEOClient

    client = DataForSEOClient()
    vols: dict[str, dict] = dict(already)
    spent = 0.0
    for i in range(0, len(unique), BATCH):
        chunk = unique[i:i + BATCH]
        # ponytail: site_key=None - api_cost_log.site_key FKs public.sites.
        body = client.search_volume(site_key=None, keywords=chunk)
        spent += float(body.get("cost", 0.0))
        res = body["tasks"][0].get("result") or []
        for r in res:
            vols[r["keyword"]] = {
                "volume": r.get("search_volume"),
                "cpc": r.get("cpc"),
                "competition": r.get("competition"),
                "monthly_searches": r.get("monthly_searches") or [],
            }
        print(f"batch {i // BATCH + 1}/{n_batches}: {len(res)} priced "
              f"(run total ${spent:.4f})", flush=True)

    (HERE / "volumes.json").write_text(json.dumps(vols, indent=1), encoding="utf-8")
    print(f"\nDONE. {len(vols)} keywords priced, ${spent:.4f} spent.")


if __name__ == "__main__":
    main()
