"""Accuracy check D: does Google's top 10 want our owner page's type? (service page vs guide)

Inputs (run dir): stages/04_serp.csv, stages/05_clusters.csv, stages/06_families.csv.
Outputs (accuracy/): D_intent.csv, D_summary.json, D_classifier_sample.csv (30 random classified results, seed 20261011).
Cost: free (no API calls). Deterministic: ordered rules, first match wins.

Per family the SERP is the head's top 10 when the head was pulled, else the pooled top 10s of every member that was.
Owner type: service = /services/, /for/, /locations/, /for-letting-agents, /landed-estates, "/" ; guide = /blog/ or any other
  top-level topic pillar. GAP / EXCLUDE owners have no type (status insufficient).
flag: mismatch when owner is service and guide+association+gov share >= 0.6, or owner is guide and service share >= 0.6.
status: match | mismatch | insufficient (no pulled SERP, fewer than 5 results, or no owner page).
"""
from __future__ import annotations

import argparse
import json
import random
import re
from collections import Counter, defaultdict
from urllib.parse import urlsplit

from common import load_site, read_csv, run_dir, script_meta, write_csv

THRESH = 0.6
MIN_RESULTS = 5
SAMPLE_N, SAMPLE_SEED = 30, 20261011

GOV = ("gov.uk", "hmrc.gov.uk")
DIRECTORY = ("unbiased.co.uk", "bark.com", "yell.com", "checkatrade.com", "which.co.uk", "reddit.com", "trustpilot.com",
             "forums.moneysavingexpert.com", "taxassist.co.uk/find", "accountantsworld.co.uk", "ratedpeople.com", "trustatrader.com")
LENDER = ("charcol.co.uk", "mmba.co.uk", "togethermoney.com", "landlordleaders.osb.co.uk", "titanwealthinternational.com",
          "moneyfacts.co.uk", "landbay.co.uk", "paragonbank.co.uk", "mortgageforbusiness.co.uk")
# publishers whose pages are information, never a firm's sales page (incl. their homepages)
PUBLISHER = ("litrg.org.uk", "library.croneri.co.uk", "lexisnexis.co.uk", "uk.practicallaw.thomsonreuters.com",
             "accountingweb.co.uk", "freeagent.com", "hoa.org.uk", "theaccountancy.co.uk", "taxcare.org.uk", "expertsforexpats.com",
             "mse.co.uk", "moneysavingexpert.com", "taxadvisermagazine.com")
SERVICE_PATH = re.compile(r"/(services?|specialisms?|what-we-do|our-services|property-accountants?|landlord-accountants?|"
                          r"tax-advice|property-tax-advice|landlord-tax-advice|property-tax-services|accountants-in-[\w-]+|"
                          r"locations?|areas-we-cover|sectors?|industries)(/|$)", re.I)
GUIDE_PATH = re.compile(r"/([\w-]*(blog|news|insights?|guides?|articles?)|help|learn|resources?|knowledge[\w-]*|advice-centre|"
                        r"faqs?|tax-tips|answers?|any-answers|library|topics?|calculators?|forum|threads?|dictionary|glossary)(/|$)", re.I)
SERVICE_PATH_LOOSE = re.compile(r"accountan|accounting|tax-advi|tax-services|who-we-help|we-help|buy-to-let-tax|landlord-tax-services", re.I)
SOCIAL = ("facebook.com", "youtube.com", "instagram.com", "linkedin.com", "tiktok.com", "x.com", "twitter.com", "pinterest.com",
          "quora.com", "talents.studysmarter.co.uk", "indeed.com", "reed.co.uk", "glassdoor.co.uk", "totaljobs.com")
GUIDE_TITLE = re.compile(r"\bhow to\b|\bwhat (is|are|does|do)\b|\bguide\b|\bexplained\b|\brates?\b|\?|\bfaq|\bchecklist\b|"
                         r"\bwhen (do|can|should)\b|\bcalculator\b|\bdeadlines?\b|\bexplainer\b", re.I)
SERVICE_TITLE = re.compile(r"\baccountants?\b|\baccountancy\b|\btax advis[eo]rs?\b|\btax specialists?\b|\bchartered\b|"
                           r"\bbookkeep|\btax services\b|\btax consultants?\b|\bincorporation service", re.I)
ASSOCIATION = ("nrla.org.uk", "ciot.org.uk", "icaew.com", "att.org.uk", "accaglobal.com", "icas.com", "ricsfirms.com", "rics.org",
               "propertymark.co.uk", "arla.co.uk", "naea.co.uk", "landlords.org.uk", "rla.org.uk", "scottishlandlords.com",
               "landlordassociation.org", "londonlandlords.org.uk", "hoa.org.uk", "aat.org.uk", "ifa.org.uk", "cipfa.org")
LISTICLE_TITLE = re.compile(r"^\s*(top|best)\b|\btop \d+\b|\b\d+ (things|ways|reasons|tips|mistakes|questions)\b|\btop reasons\b|"
                            r"\bwhy (you|landlords|investors) (need|should)\b|\breasons (to|why)\b", re.I)
ARTICLE_SLUG = re.compile(r"/(transferring|how|what|why|can|do|should|when|is|are|does)-[\w-]+/?$|/[\w-]*-to-[\w-]+/?$", re.I)
ARTICLE_TITLE = re.compile(r"\bvia\b|\bhow\b|\bwhat\b|\bwhy\b|\?", re.I)
LENDER_TEXT = re.compile(r"\b(re)?mortgages?\b|\bbroker|\blender|\bbridging\b|\bloans?\b", re.I)

# Ordered rules: (name, type, predicate(host, path, title)). First match wins.
RULES = [
    ("R1 gov domain",           "gov",       lambda h, p, t: h in GOV or h.endswith(".gov.uk")),
    ("R2 directory/forum",      "directory", lambda h, p, t: any(h == d or h.endswith("." + d) or (d in h + p) for d in DIRECTORY)),
    ("R3 social/video/jobs",    "other",     lambda h, p, t: any(h == d or h.endswith("." + d) for d in SOCIAL)),
    ("R3b association/membership body", "association", lambda h, p, t: any(h == d or h.endswith("." + d) for d in ASSOCIATION)),
    ("R4 publisher domain",     "guide",     lambda h, p, t: any(h == d or h.endswith("." + d) for d in PUBLISHER)),
    ("R5 service path",         "service",   lambda h, p, t: bool(SERVICE_PATH.search(p))),
    ("R6 guide path",           "guide",     lambda h, p, t: bool(GUIDE_PATH.search(p))),
    ("R7 lender/broker domain", "lender",    lambda h, p, t: any(h == d or h.endswith("." + d) for d in LENDER)),
    ("R8 mortgage/broker text", "lender",    lambda h, p, t: bool(LENDER_TEXT.search(t)) and not GUIDE_TITLE.search(t)),
    ("R9 guide title",          "guide",     lambda h, p, t: bool(GUIDE_TITLE.search(t))),
    ("R9b listicle/explainer title", "guide", lambda h, p, t: bool(LISTICLE_TITLE.search(t))),
    ("R9c article slug + question title", "guide", lambda h, p, t: bool(ARTICLE_SLUG.search(p)) and bool(ARTICLE_TITLE.search(t))),
    ("R10 firm homepage",       "service",   lambda h, p, t: p in ("", "/")),
    ("R11 loose service path",  "service",   lambda h, p, t: bool(SERVICE_PATH_LOOSE.search(p))),
    ("R12 firm-worded title",   "service",   lambda h, p, t: bool(SERVICE_TITLE.search(t))),
    ("R13 anything else",       "other",     lambda h, p, t: True),
]
TYPES = ["service", "guide", "association", "gov", "directory", "lender", "other"]


def classify(url: str, title: str) -> tuple[str, str]:
    u = urlsplit(url)
    h, p = u.netloc.lower().removeprefix("www."), u.path.lower()
    for name, typ, fn in RULES:
        if fn(h, p, title or ""):
            return typ, name
    return "other", "none"


def owner_type(owner: str) -> str:
    if not owner.startswith("/"):
        return ""
    if owner == "/" or owner.split("/")[1] in ("services", "for", "locations", "for-letting-agents", "landed-estates"):
        return "service"
    return "guide"


FIELDS = ["family_id", "head", "owner_page", "owner_type", "serp_basis", "n_results", "share_service", "share_guide", "share_association", "share_gov",
          "share_directory", "share_lender", "share_other", "dominant_type", "demand_volume", "priority", "flag", "status"]


SALES_TOP = {"services", "for", "locations", "for-letting-agents", "landed-estates", "about", "contact", "thank-you"}


def best_guides(st, members: dict) -> dict:
    """family_id -> our non-sales page with most GSC impressions on the family's queries (impressions, impression-weighted position)."""
    qfam = {k: fid for fid, ks in members.items() for k in ks}
    agg = defaultdict(lambda: defaultdict(lambda: [0, 0.0, 0]))   # family -> path -> [impr, pos*impr, clicks]
    for r in read_csv(st / "03_gsc_query_page.csv"):
        fid = qfam.get(r["query"])
        path = urlsplit(r["page"]).path.rstrip("/") or "/"
        if not fid or path == "/" or path.split("/")[1] in SALES_TOP:
            continue
        a = agg[fid][path]
        a[0] += int(float(r["impressions"])); a[1] += float(r["position"]) * float(r["impressions"]); a[2] += int(float(r["clicks"]))
    out = {}
    for fid, pages in agg.items():
        path, (imp, pw, cl) = max(pages.items(), key=lambda kv: (kv[1][0], kv[0]))
        if imp:
            out[fid] = {"page": path, "impressions": imp, "position": round(pw / imp, 1), "clicks": cl}
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    load_site(a.site)
    d = run_dir(a.site, a.run)
    st, acc = d / "stages", d / "accuracy"
    serp = defaultdict(list)
    for r in read_csv(st / "04_serp.csv"):
        serp[r["query"]].append(r)
    members = defaultdict(list)
    for r in read_csv(st / "05_clusters.csv"):
        members[r["family_id"]].append(r["keyword"])
    classified = {}
    for q, rs in serp.items():
        for r in rs:
            classified[(q, r["rank"])] = classify(r["url"], r["title"])

    out, listed = [], []
    for f in read_csv(st / "06_families.csv"):
        head = f["head"]
        if head in serp:
            qs, basis = [head], "head"
        else:
            qs, basis = [k for k in members[f["family_id"]] if k in serp], "members"
        res = [classified[(q, r["rank"])][0] for q in qs for r in serp[q]]
        n = len(res)
        c = Counter(res)
        sh = {t: (c[t] / n if n else 0.0) for t in TYPES}
        ot = owner_type(f["owner_page"])
        dom = max(TYPES, key=lambda t: (c[t], -TYPES.index(t))) if n else ""
        if n < MIN_RESULTS or not ot:
            status, flag = "insufficient", ""
        elif (ot == "service" and sh["guide"] + sh["association"] + sh["gov"] >= THRESH) or (ot == "guide" and sh["service"] >= THRESH):
            status, flag = "mismatch", "mismatch"
        else:
            status, flag = "match", ""
        out.append({"family_id": f["family_id"], "head": head, "owner_page": f["owner_page"], "owner_type": ot,
                    "serp_basis": basis if n else "none", "n_results": n,
                    "share_service": round(sh["service"], 3), "share_guide": round(sh["guide"], 3), "share_association": round(sh["association"], 3), "share_gov": round(sh["gov"], 3),
                    "share_directory": round(sh["directory"], 3), "share_lender": round(sh["lender"], 3), "share_other": round(sh["other"], 3),
                    "dominant_type": dom, "demand_volume": f["demand_volume"], "priority": f["priority"], "flag": flag, "status": status})

    meta = {"source": "04_serp + 05_clusters + 06_families", "site": a.site, "data_through": a.run, **script_meta()}
    write_csv(acc / "D_intent.csv", out, FIELDS, meta)

    # classifier validation sample (seeded so the manager sees the same 30 on a re-run)
    allres = [(r["url"], r["title"], *classified[(q, r["rank"])]) for q, rs in sorted(serp.items()) for r in rs]
    rng = random.Random(SAMPLE_SEED)
    sample = [{"url": u, "title": t, "type": ty, "rule": rule} for u, t, ty, rule in rng.sample(allres, min(SAMPLE_N, len(allres)))]
    write_csv(acc / "D_classifier_sample.csv", sample, ["url", "title", "type", "rule"],
              {**meta, "source": "04_serp.csv", "seed": SAMPLE_SEED})

    tot = Counter(v[0] for v in classified.values())
    rules = Counter(v[1] for v in classified.values())
    stat = Counter(r["status"] for r in out)
    bg = best_guides(st, members)
    mism = sorted((r for r in out if r["status"] == "mismatch"), key=lambda r: -float(r["priority"] or 0))
    summ = {"site": a.site, "run": a.run, "threshold": THRESH, "min_results": MIN_RESULTS,
            "families": len(out), "counts": {"match": stat["match"], "mismatch": stat["mismatch"], "insufficient": stat["insufficient"]},
            "results_classified": len(classified), "by_type": dict(tot),
            "other_coverage": {"n": tot["other"], "share": round(tot["other"] / max(1, len(classified)), 3),
                               "residual_n": rules["R13 anything else"], "residual_share": round(rules["R13 anything else"] / max(1, len(classified)), 3),
                               "note": "other = residual R13 plus R3 social/video/jobs (deliberately not typed)"},
            "by_rule": {name: rules.get(name, 0) for name, _, _ in RULES},
            "mismatches": [{k: r[k] for k in ("family_id", "head", "owner_page", "owner_type", "share_service", "share_guide", "share_gov",
                                              "share_association", "dominant_type", "demand_volume", "priority")}
                            | {"our_best_guide": bg.get(r["family_id"])} for r in mism]}
    (acc / "D_summary.json").write_text(json.dumps(summ, indent=2), encoding="utf-8")
    meta2 = {**meta, "rows": len(summ["mismatches"])}
    (acc / "D_summary.json.meta.json").write_text(json.dumps(meta2, indent=2), encoding="utf-8")
    print(f"D: {dict(stat)}; classified {len(classified)}; other {tot['other']} ({summ['other_coverage']['share']:.1%}), residual {summ['other_coverage']['residual_share']:.1%}")


if __name__ == "__main__":
    main()
