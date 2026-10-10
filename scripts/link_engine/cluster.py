"""Stage 05: cluster commercial keywords into families (one family = one page's job).

Inputs: stages/02_metrics.csv (hire + decision keywords, single-source volume/cpc),
        stages/04_serp.csv (top-10 organic URLs for keywords with volume >= 10).
Outputs: stages/05_clusters.csv      keyword, family_id, family_head, intent_class, geo, volume, cpc,
                                     serp_shared_with_head, assigned_by (lexical|serp|overlap|singleton)
         stages/05_cluster_conflicts.csv  the judgment queue (see CONFLICTS)
Cost: free (no API calls). Deterministic: same inputs, same output (ties break on volume desc, then text).

Method
1. Normalise each keyword: lowercase; extract a city (universe.geo_of, so "reading" only counts
   next to an accountant/tax word or after "in") into its own field and remove it; singularise
   (accountants->accountant, landlords->landlord, properties->property, advisers/advisors->advisor
   and a few more, see SING); strip "uk", "near me" and "best" everywhere; strip "specialist" in any
   query containing "accountant", and "services"/"firm(s)"/"company" only when they trail the word
   "accountant" (so "property tax specialist" and "property tax services" keep their words);
   drop stopwords (for, to, of, in, a, the, and, ...).
2. Lexical key = sorted content tokens after step 1 (geo removed), lightly stemmed: transfer*,
   gift*, incorporat*, inherit* collapse to one stem; sell/selling/sale -> sell; house/home/flat -> home
   (property stays separate); ltd -> limited company. Same key = same family.
3. SERP similarity: two non-geo keywords whose pulled top-10 URL sets share >= 4 URLs
   (URL = host without www + path without trailing slash; query strings dropped) join the same
   family, except when both sides already carry volume >= 100 (see CONFLICTS). Union-find over
   (same lexical key) OR (SERP >= 4), strongest SERP link first.
4. Geo rule (blueprint R4): a keyword with a city never joins a national family, whatever its tokens
   or SERP say. It joins one city family per (city, intent_class, hire type), hire type being
   "landlord" (landlord, buy to let, btl, rental, hmo, let tokens) or "property" (everything else).
   assigned_by is "lexical" for these (same city + hire type is the key).
5. Keywords with no SERP (volume < 10 or empty result) take part in step 2 like any other. If still alone
   they attach to the phase-1 family (same intent_class, non-geo) whose head has the highest token
   Jaccard >= 0.6 with them (assigned_by overlap), else form a singleton family.
6. family_id = slug of the head keyword (highest volume; ties: most GSC impressions, then shorter, then
   alphabetical, so the head reads like what people type). Component volume for the >= 100 test counts
   each close-variant group (same lexical key, volume, cpc) once.
   assigned_by per keyword: lexical (shares a lexical key with another family member, or city group),
   serp (joined only through a >= 4 URL link), overlap, singleton.

CONFLICTS (nothing is resolved by guesswork; the rule above is applied and the doubtful call is queued)
  serp_bridge        a >= 4 URL SERP link between two components that EACH already have volume >= 100
                     (keywords: the two component heads; via: the linking pair). The join is BLOCKED only
                     if (a) the components' intent_class differs, (b) both carry WP1 rulings with different
                     owner_page (two components with the SAME WP1 owner and >= 4 shared URLs merge
                     whatever their size), (c) one is geo and the other national (cannot arise here: city keywords
                     never take part in SERP joins), or (d) the link is under 6 shared URLs. Otherwise the
                     join is applied (same searcher need; the CGT-on-sale variants merge this way). Blocked
                     pairs are written with status "held by rule: intent_differs|wp1_owners_differ" (settled,
                     no judgment needed) or "open" (shared_lt_6: ambiguous, goes to judgment). Without the
                     guard, chaining through the head terms fused 119 keywords (landlord accountant,
                     property tax advice, property accountant) into one family, against blueprint R2.
  lexical_serp_split two keywords with the same lexical key whose SERPs share <= 2 URLs AND whose surface
                     tokens differ by more than word order, plurals, stems, stopwords, "uk" and "near me" (so only
                     modifier variants such as specialist/best/services remain; those are not listed otherwise). They ARE merged by the lexical key; the judge
                     may split them.
Verdicts in judgments/*.jsonl (decision merge|split, input_sha256 = conflict_sha(row), see
rubrics/cluster_owner.md) are applied on the next run; status then reads "resolved: ...".
Columns: conflict_type, keyword, other_keyword, lexical_family, serp_family, shared_urls, volumes, via, status.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter, defaultdict
from urllib.parse import urlsplit

from common import REPO, load_site, norm_query, read_csv, run_dir, script_meta, write_csv
from universe import geo_of

OUT = ["keyword", "family_id", "family_head", "intent_class", "geo", "volume", "cpc",
       "serp_shared_with_head", "assigned_by"]
CONF = ["conflict_type", "keyword", "other_keyword", "lexical_family", "serp_family", "shared_urls", "volumes", "via", "status"]
CONF_SHA = ["conflict_type", "keyword", "other_keyword", "shared_urls"]
SERP_JOIN = 4
SPLIT_MAX = 2
BRIDGE_VOL = 100
BRIDGE_SHARED = 6
OVERLAP_MIN = 0.6
STOP = {"for", "to", "of", "in", "on", "into", "a", "an", "the", "and", "with", "my", "me", "i", "we", "do", "near"}
SING = {"accountants": "accountant", "landlords": "landlord", "properties": "property", "advisors": "advisor",
        "advisers": "advisor", "adviser": "advisor", "consultants": "consultant", "specialists": "specialist",
        "investors": "investor", "experts": "expert", "companies": "company", "firms": "firm",
        "services": "service", "hmos": "hmo", "trusts": "trust", "lets": "let", "accountancy": "accountant"}
STEM_EXACT = {"selling": "sell", "sale": "sell", "sales": "sell", "sold": "sell", "sells": "sell",
              "house": "home", "houses": "home", "homes": "home", "flat": "home", "flats": "home",
              "gains": "gain", "taxes": "tax", "dwellings": "dwelling"}
STEM_PREFIX = ("transfer", "gift", "incorporat", "inherit")      # transferring/transfer, gifting/gift, incorporating/incorporation, inherited/inheritance


def stem(t: str) -> list[str]:
    if t == "ltd":
        return ["limited", "company"]
    if t in STEM_EXACT:
        return [STEM_EXACT[t]]
    for p in STEM_PREFIX:
        if t.startswith(p):
            return [p]
    return [t]


def simple_tokens(q: str) -> list[str]:
    """Word-order-insensitive stemmed form (singular, stems, no stopwords/uk/near me) but WITH modifiers like specialist/best. Equal forms are order/plural/stem variants, not ambiguity."""
    q = re.sub(r"\bnear me\b", " ", q)
    return sorted(x for t in q.split() if t not in STOP and t != "uk" for x in stem(SING.get(t, t)))


LANDLORD_TOK = {"landlord", "buy", "btl", "rental", "hmo", "let", "rent"}


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def normalise(q: str, cities: list[str]) -> tuple[list[str], str]:
    """Return (content tokens, city)."""
    city = geo_of(q, cities)
    s = q
    if city:
        s = re.sub(rf"\b{re.escape(city)}\b", " ", s)
    s = re.sub(r"\bnear me\b", " ", s)
    toks = [x for t in s.split() if t not in STOP for x in stem(SING.get(t, t))]
    toks = [t for t in toks if t not in STOP and t not in ("uk", "best")]
    if "accountant" in toks:
        i = toks.index("accountant")
        toks = [t for j, t in enumerate(toks) if not (t == "specialist" or (j > i and t in ("service", "firm", "company")))]
    return toks, city


def lex_key(q: str, cities: list[str]) -> str:
    """The lexical key used for grouping (also the close-variant key in families.py)."""
    return " ".join(sorted(set(normalise(q, cities)[0]))) or q


def norm_url(u: str) -> str:
    p = urlsplit(u or "")
    return (p.netloc.lower().removeprefix("www.") + p.path.rstrip("/")).lower()


class _CV:
    """cvol[root] = component volume with close-variant groups (same lexical key, volume and cpc) counted once:
    Google Ads returns one grouped figure for close variants, so summing them double counts."""
    def __init__(self, cgrp):
        self.g = cgrp

    def __getitem__(self, r):
        return sum(self.g[r].values())


class UF:
    def __init__(self, items):
        self.p = {i: i for i in items}

    def find(self, x):
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]
            x = self.p[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.p[max(ra, rb)] = min(ra, rb)


def conflict_sha(row: dict) -> str:
    """Key of a conflict verdict: sha256 of conflict_type, keyword, other_keyword, shared_urls (volumes excluded: they move when families merge)."""
    return hashlib.sha256(json.dumps({k: str(row[k]) for k in CONF_SHA}, sort_keys=True).encode("utf-8")).hexdigest()


def load_verdicts(jdir) -> dict:
    """input_sha256 -> 'merge' | 'split' | 'disagree' for conflict verdicts.

    Settled: a reader named manager is final; otherwise all readers agree and (2+ readers, or one reader with high/medium confidence).
    'disagree': readers differ on merge vs split; the families are kept apart and the row is an owner decision.
    A single low-confidence verdict stays unsettled (row stays open)."""
    by = defaultdict(list)
    if jdir.exists():
        for f in sorted(jdir.glob("*.jsonl")):
            for line in f.read_text(encoding="utf-8").splitlines():
                if line.strip():
                    v = json.loads(line)
                    if v.get("decision") in ("merge", "split"):
                        # a manager ruling may name the pair (keyword, other_keyword) instead of carrying a hash
                        k = v.get("input_sha256") or ("pair", frozenset((v.get("keyword"), v.get("other_keyword"))))
                        by[k].append(v)
    out = {}
    for h, vs in by.items():
        ds = {v["decision"] for v in vs}
        mg = [v for v in vs if v.get("reader") == "manager"]
        if mg:                                   # a manager ruling is final for its conflict pair
            out[h] = mg[-1]["decision"]
        elif len(ds) > 1:
            out[h] = "disagree"
        elif len(vs) > 1 or vs[0].get("confidence") in ("high", "medium"):
            out[h] = ds.pop()
    return out


def verdict_for(verdicts: dict, row: dict):
    return verdicts.get(("pair", frozenset((row["keyword"], row["other_keyword"])))) or verdicts.get(conflict_sha(row))   # a manager ruling by pair wins


def fnum(v) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    st = run_dir(a.site, a.run) / "stages"
    met = {r["query"]: r for r in read_csv(st / "02_metrics.csv") if r["intent_class"] in ("hire", "decision")}
    urls: dict[str, set] = defaultdict(set)
    for r in read_csv(st / "04_serp.csv"):
        if r["url"]:
            urls[r["query"]].add(norm_url(r["url"]))
    wp1 = defaultdict(list)
    for r in read_csv(REPO / le["prior_assignment"]):
        wp1[norm_query(r["query"])].append(r)
    vol = {q: fnum(r["volume"]) for q, r in met.items()}
    gimpr = Counter()                    # GSC impressions per query: close variants share one Ads volume, so the
    for r in read_csv(st / "03_gsc_query_page.csv"):          # variant people really type (most impressions) becomes head
        gimpr[norm_query(r["query"])] += fnum(r["impressions"])
    order = sorted(met, key=lambda q: (-vol[q], -gimpr[q], len(q), q))        # deterministic head order
    rank = {q: i for i, q in enumerate(order)}

    toks, city, key = {}, {}, {}
    for q in order:
        t, c = normalise(q, le["cities"])
        toks[q], city[q] = t, c
        key[q] = " ".join(sorted(set(t))) or q
    htype = {q: ("landlord" if LANDLORD_TOK & set(toks[q]) else "property") for q in order}

    # SERP overlap counts between national keywords that have a SERP
    pulled = [q for q in order if urls.get(q) and not city[q]]
    shared = {}
    for i, x in enumerate(pulled):
        for y in pulled[i + 1:]:
            shared[(x, y)] = len(urls[x] & urls[y])
    sh = lambda x, y: shared.get((x, y), shared.get((y, x)))
    verdicts = load_verdicts(run_dir(a.site, a.run) / "judgments")

    def groups(split=frozenset()):
        g = defaultdict(list)
        for q in order:
            gk = (("geo", city[q], met[q]["intent_class"], htype[q]) if city[q]
                  else ("lex", key[q], q) if q in split else ("lex", key[q]))
            g[gk].append(q)
        return g
    # lexical splits: same key, SERPs share <= SPLIT_MAX URLs (non-head vs lexical head)
    conf = []
    g0 = groups()
    split = set()
    for gk, m in g0.items():
        for x in m[1:]:
            n = sh(m[0], x)
            if n is not None and n <= SPLIT_MAX and simple_tokens(x) != simple_tokens(m[0]):   # order/plural/stopword variants are not ambiguous
                row = {"conflict_type": "lexical_serp_split", "keyword": x, "other_keyword": m[0], "lexical_family": m[0],
                       "serp_family": "", "shared_urls": n, "via": f"{x} ~ {m[0]}",
                       "volumes": f"{int(vol[x])}|{int(vol[m[0]])}", "status": "open"}
                v = verdict_for(verdicts, row)
                if v in ("split", "disagree"):
                    split.add(x)
                    row["status"] = "resolved: split by judgment" if v == "split" else "kept apart: readers disagree (owner decision)"
                elif v == "merge":
                    row["status"] = "resolved: merge by judgment"
                conf.append(row)
    grp = groups(frozenset(split))
    uf = UF(order)
    for members in grp.values():
        for m in members[1:]:
            uf.union(members[0], m)
    lex_head = {q: members[0] for members in grp.values() for q in members}   # lexical family label = head
    cgrp = defaultdict(dict)       # component -> {close-variant group: its single volume}; cvol sums each group ONCE
    cvol = _CV(cgrp)
    cint, cown = defaultdict(Counter), defaultdict(Counter)       # per component: intent volume, WP1 owner volume
    for q in order:
        r0 = uf.find(q)
        cgrp[r0][(key[q], vol[q], met[q]["cpc"])] = vol[q]
        cint[r0][met[q]["intent_class"]] += max(vol[q], 0.001)
        for w in wp1.get(q, []):
            if w["owner_page"] and w["owner_page"] != "exclude":
                cown[r0][w["owner_page"]] += max(vol[q], 0.001)

    def join(x, y):
        rx, ry = uf.find(x), uf.find(y)
        if rx != ry:
            g, ci, co = {**cgrp[rx], **cgrp[ry]}, cint[rx] + cint[ry], cown[rx] + cown[ry]
            uf.union(rx, ry)
            r = uf.find(rx)
            cgrp[r], cint[r], cown[r] = g, ci, co

    def block(rx, ry, n):
        """Why a SERP join between two components that each carry volume >= 100 is NOT applied, else ''."""
        if cown[rx] and cown[ry]:
            if cown[rx].most_common(1)[0][0] == cown[ry].most_common(1)[0][0]:
                return ""                                     # same WP1 owner and >= 4 shared URLs: merge
            return "wp1_owners_differ"
        if cint[rx].most_common(1)[0][0] != cint[ry].most_common(1)[0][0]:
            return "intent_differs"
        # (geo vs national never arises here: city keywords are excluded from SERP joins)
        if n < BRIDGE_SHARED:
            return "shared_lt_6"
        return ""
    # SERP joins, strongest first (module docstring, CONFLICTS)
    edges = sorted(((-n, x, y) for (x, y), n in shared.items() if n >= SERP_JOIN))
    held = []
    for _, x, y in edges:
        rx, ry = uf.find(x), uf.find(y)
        if rx == ry:
            continue
        why = block(rx, ry, -_) if cvol[rx] >= BRIDGE_VOL and cvol[ry] >= BRIDGE_VOL else ""
        if why:
            held.append((x, y, why))
        else:
            join(x, y)
    # judged / held bridges
    pairs = {}
    for x, y, why in held:
        rx, ry = uf.find(x), uf.find(y)
        if rx == ry:
            continue
        k = (min(rx, ry), max(rx, ry))
        n = shared.get((x, y)) or shared.get((y, x))
        if k not in pairs or n > pairs[k][2]:
            pairs[k] = (x, y, n, why)
    heads = {}
    for q in order:
        heads.setdefault(uf.find(q), q)
    for k, (x, y, n, why) in sorted(pairs.items()):
        ha, hb = sorted((heads[k[0]], heads[k[1]]), key=lambda h: rank[h])
        row = {"conflict_type": "serp_bridge", "keyword": ha, "other_keyword": hb, "lexical_family": ha,
               "serp_family": hb, "shared_urls": n, "via": f"{x} ~ {y}",
               "volumes": f"{int(cvol[uf.find(ha)])}|{int(cvol[uf.find(hb)])}",
               "status": "open" if why == "shared_lt_6" else f"held by rule: {why}"}
        v = verdict_for(verdicts, row)
        if v == "merge":
            row["status"] = "resolved: merge by judgment"
            join(ha, hb)
        elif v == "split":
            row["status"] = "resolved: kept apart by judgment"
        elif v == "disagree":
            row["status"] = "kept apart: readers disagree (owner decision)"
        conf.append(row)

    # SERP-only components (for the serp_family label on split rows)
    suf = UF(order)
    for (x, y), n in shared.items():
        if n >= SERP_JOIN:
            suf.union(x, y)
    comp = defaultdict(list)
    for q in order:
        comp[suf.find(q)].append(q)
    for r in conf:
        if r["conflict_type"] == "lexical_serp_split":
            m = comp[suf.find(r["keyword"])]
            r["serp_family"] = m[0] if len(m) > 1 else ""

    # phase-1 families, then overlap attachment for keywords that are alone with no SERP
    fam = defaultdict(list)
    for q in order:
        fam[uf.find(q)].append(q)
    by = {}
    overlap_to = {}
    targets = {r: m for r, m in fam.items() if len(m) > 1 or urls.get(m[0])}
    orphans = [m[0] for r, m in fam.items() if len(m) == 1 and not urls.get(m[0]) and not city[m[0]]]
    for q in sorted(orphans, key=lambda x: rank[x]):
        qs = set(toks[q])
        best, bj = None, 0.0
        for r, m in targets.items():
            h = m[0]
            if city[h] or met[h]["intent_class"] != met[q]["intent_class"]:
                continue
            hs = set(toks[h])
            j = len(qs & hs) / len(qs | hs) if qs | hs else 0.0
            if j > bj + 1e-9 or (abs(j - bj) < 1e-9 and best is not None and rank[h] < rank[targets[best][0]]):
                best, bj = r, j
        if best is not None and bj >= OVERLAP_MIN:
            overlap_to[q] = best
    for q, r in overlap_to.items():
        uf.union(r, q)
        by[q] = "overlap"
    fam = defaultdict(list)
    for q in order:
        fam[uf.find(q)].append(q)

    rows, ids = [], {}
    for r, m in fam.items():
        m.sort(key=lambda x: rank[x])
        head = m[0]
        fid = slug(head)
        k = 2
        while fid in ids:
            fid = f"{slug(head)}-{k}"
            k += 1
        ids[fid] = head
        keys = Counter(key[x] for x in m if not city[x])
        for x in m:
            if x in by:
                ab = "overlap"
            elif len(m) == 1:
                ab = "singleton"
            elif city[x] or keys[key[x]] > 1 or (city[head] and city[x]):
                ab = "lexical"
            elif any((sh(x, y) or 0) >= SERP_JOIN for y in m if y != x):
                ab = "serp"
            else:
                ab = "lexical"
            s = sh(x, head) if x != head else None
            rows.append({"keyword": x, "family_id": fid, "family_head": head, "intent_class": met[x]["intent_class"],
                         "geo": city[x], "volume": int(vol[x]), "cpc": met[x]["cpc"],
                         "serp_shared_with_head": "" if s is None else s, "assigned_by": ab})
    rows.sort(key=lambda r: (-r["volume"], r["keyword"]))

    conf.sort(key=lambda r: (r["conflict_type"], r["keyword"], r["other_keyword"]))

    meta = {"source": "02_metrics + 04_serp, deterministic union-find (see module docstring)", "site": a.site,
            "data_through": a.run, "serp_join_min_shared": SERP_JOIN, "n_families": len(fam),
            "n_with_serp": len(pulled), "assigned_by": dict(Counter(r["assigned_by"] for r in rows)), **script_meta()}
    write_csv(st / "05_clusters.csv", rows, OUT, meta)
    write_csv(st / "05_cluster_conflicts.csv", conf, CONF, meta)
    sizes = sorted((len(m) for m in fam.values()), reverse=True)
    print(f"{len(rows)} keywords -> {len(fam)} families; largest {sizes[:8]}; conflicts {len(conf)} "
          f"({Counter(c['conflict_type'] for c in conf)}); {dict(Counter(r['assigned_by'] for r in rows))}")


if __name__ == "__main__":
    main()
