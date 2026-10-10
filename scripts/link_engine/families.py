"""Stage 06: one row per keyword family with demand, value, winnability, priority and an owner page.

Inputs (run dir): stages/05_clusters.csv, 04_serp_summary.csv, 04_serp.csv, 03_gsc_query_page.csv,
  inputs/leads_by_entry_page.csv; the WP1 assignment named in the site config (prior_assignment);
  the site's built route list (see routes()). Property only today: routes() reads Property/web.
Outputs: stages/06_families.csv (sorted by priority desc, with rank) and
         stages/06_owner_queue.csv (families with no WP1 ruling: the judgment queue, with the top 5
         candidate pages and an input_sha256 that apply_judgments.py checks).
Cost: free (no API calls).

Definitions
  value_usd_month  sum(volume * cpc) over family keywords; cpc is the single-source Google Ads CPC
                   (USD, DataForSEO convention, unverified); a keyword with no cpc counts as 0.
  winnability      pos_factor * (1 - 0.5 * hard_share)
    pos_factor     columns serp_rank_us_head (live SERP rank, blank if we are not in the top 10),
                   gsc_pos_head and gsc_impr_head (impression-weighted position across our pages for
                   the head query, and its impressions), pos_basis (which rule fired).
                     head SERP pulled and we are in it: rank <=10 -> 1.0.
                     head SERP pulled and we are absent: 0.7 if gsc_pos_head is 11-20, 0.4 if 21-50, each
                       needing gsc_impr_head >= 20; everything else 0.2. Never 1.0 from GSC when the live
                       SERP shows us absent.
                     no SERP for the head: GSC with the same 20-impression floor (<=10 -> 1.0, 11-20 -> 0.7,
                       21-50 -> 0.4, else 0.2); below the floor 0.2.
    hard_share     head keyword's hard_share_top10; if the head has no SERP, the median over the
                   family's pulled keywords; else 0.3 (hard_basis head|family_median|default).
  gsc_pos_family_weighted  impression-weighted mean of the best-ranking page's position per query.
  our_top_page     page with most impressions across the family, excluding noindexed pages and pages
                   that the middleware 301s (DUPLICATE_REDIRECTS, BLOG_TO_LOCATION, recategorised slugs).
  confidence_note  "thin data" when demand_volume < 50 and/or no SERP for the head.
  priority_raw     value_usd_month * winnability.
  priority         priority_raw times the config `priority_overrides` multiplier (a manual, ruled lift: each entry has
                   match_head [substrings of the family head], multiplier and the ruling id, e.g. LE-15 for non-resident
                   landlord); equal to priority_raw when no override matches. All ranking and shares use priority.
  owner_page       WP1 ruling: volume-weighted majority owner_page over the family's keywords,
                   ignoring "exclude"; "no page (city)" becomes "GAP: city page". No WP1 row for
                   any keyword: blank, owner_basis "needs judgment", and the family joins the queue.
  leads            attributed ONLY through owner_page (never our_top_page), and never from a site-wide page
                   (config sitewide_pages: /, /about, /contact, ...). owner_leads_90d is the owner page's own
                   total, shown on each family with lead_sharing ("shared with N families"); do not sum it.
                   Lead flags live in 06_owner_rollup.csv, per owner page: "leads exceed demand" = owner leads >= 3
                   and share of priority < 2%; "demand without leads" = share >= 5% and 0 leads (annotated
                   maturing for pages listed in config page_rewritten).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import statistics
from collections import Counter, defaultdict
from urllib.parse import urlsplit

from cluster import lex_key
from common import REPO, load_site, norm_query, read_csv, run_dir, script_meta, write_csv

FIELDS = ["rank", "family_id", "head", "intent_class", "geo", "n_keywords", "n_variant_groups",
          "top_keywords", "demand_volume", "demand_volume_raw", "value_usd_month", "weighted_cpc", "gsc_impressions_90d", "gsc_clicks_90d", "gsc_pos_family_weighted",
          "our_top_page", "our_top_page_impr", "yardstick_position", "serp_rank_us_head", "gsc_pos_head",
          "gsc_impr_head", "pos_basis", "hard_share", "hard_basis", "serp_pulled", "winnability", "confidence_note",
          "priority_raw", "priority", "owner_page", "owner_basis", "owner_leads_90d", "owner_lead_value_gbp_90d", "lead_sharing",
          "gap_brief", "judgment_reason", "commercial_fit"]
QUEUE = ["family_id", "head", "intent_class", "geo", "demand_volume", "value_usd_month", "top_keywords",
         "gsc_impressions_90d", "our_top_page", "yardstick_position", "winnability", "pos_basis", "confidence_note", "commercial_fit"] + \
        [f"cand{i}_{k}" for i in range(1, 6) for k in ("page", "title", "title_source", "why")] + ["input_sha256"]
GENERIC = {"tax", "uk", "service", "guide", "complete", "how", "to", "the", "a", "for", "and", "of", "in", "on", "your",
           "what", "is", "are", "with", "2026", "2027", "2025", "landlords", "landlord", "property", "properties"}
WEB = REPO / "Property" / "web"


def path_of(u: str) -> str:
    p = urlsplit(u).path.rstrip("/")
    return p or "/"


def fnum(v, d=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def toks_of(s: str) -> set[str]:
    out = set()
    for t in re.split(r"[^a-z0-9]+", s.lower()):
        if t and t not in GENERIC:
            out.add(t[:-1] if len(t) > 3 and t.endswith("s") and not t.endswith("ss") else t)
    return out


# ----- route list ---------------------------------------------------------

def slugify_category(c: str) -> str:
    """Same logic as scripts/track2_link_audit.py slugify_category (Property: '&' -> 'and')."""
    c = c.lower().replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"[^a-z0-9-]", "", c)
    return re.sub(r"-{2,}", "-", c).strip("-")


def map_keys(mw: str, name: str) -> dict:
    """Copied from scripts/track2_link_audit.py extract_map_keys (that script runs on import): keys of a middleware const map."""
    m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", mw, re.S)
    if not m:
        return {}
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', m.group(1)))


def _block(src: str, start: int) -> str:
    """Text of the {...} block opening at or after src[start], by brace counting."""
    i = src.find("{", start)
    depth = 0
    for j in range(i, len(src)):
        depth += (src[j] == "{") - (src[j] == "}")
        if depth == 0:
            return src[i:j + 1]
    return src[i:]


def ts_title(path) -> tuple[str, str]:
    """(title, source): metadata.title (literal or a const it names), else the first H1, else ''."""
    try:
        src = path.read_text(encoding="utf-8")
    except OSError:
        return "", ""
    m = re.search(r"export const metadata\b|export (?:async )?function generateMetadata", src)
    if m:
        blk = _block(src, m.end())
        t = re.search(r'\btitle:\s*(?:\{\s*absolute:\s*)?(["\'`])((?:(?!\1).)+)\1', blk, re.S)
        if t and "${" not in t.group(2):
            return t.group(2), "metadata"
        t = re.search(r"\btitle:\s*([A-Za-z_][A-Za-z0-9_]*)\s*[,}]", blk)
        if t:
            c = re.search(r"const " + t.group(1) + r"\s*(?::[^=]+)?=\s*([\"'`])((?:(?!\1).)+)\1", src, re.S)
            if c and "${" not in c.group(2):
                return c.group(2), "metadata_const"
    h = re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S)
    if h:
        txt = re.sub(r"\s+", " ", re.sub(r"<[^>]+>|\{[^}]*\}", " ", h.group(1))).strip()
        if txt:
            return txt, "h1"
    return "", ""


def routes() -> tuple[dict, set]:
    """({path: {title, source}} for every page the site builds, {paths that must not be our_top_page}).

    The second set holds noindexed pages (blog frontmatter noindex, static pages with robots index:false)
    and URLs the middleware 301s (DUPLICATE_REDIRECTS + BLOG_TO_LOCATION slugs, recategorised slugs)."""
    out: dict[str, dict] = {}
    bad: set[str] = set()
    add = lambda p, t, src: out.__setitem__(p, {"title": t, "source": src})
    for f in sorted((WEB / "content" / "blog").glob("*.md")):
        head = f.read_text(encoding="utf-8").split("\n---", 2)[0]
        g = lambda k: (re.search(rf'(?m)^{k}:\s*["\']?(.+?)["\']?\s*$', head) or [None, ""])[1].strip()
        if not g("slug") or not g("category"):
            continue
        p = f"/blog/{slugify_category(g('category'))}/{g('slug')}"
        if re.search(r"(?m)^noindex:\s*true", head):
            bad.add(p)
            continue
        add(p, g("title"), "frontmatter")
    app = WEB / "src" / "app"
    for d in sorted((app / "services").iterdir()):
        if d.is_dir():
            t, src = ts_title(d / "page.tsx")
            add(f"/services/{d.name}", t or d.name.replace("-", " "), src or "slug")
    aud = (WEB / "src" / "data" / "audiences.ts").read_text(encoding="utf-8")
    for m in re.finditer(r'"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', aud):
        add(f"/for/{m.group(1)}", m.group(2), "audiences.ts")
    for loc in json.loads((REPO / "Property" / "niche.config.json").read_text(encoding="utf-8"))["locations"]:
        add(f"/locations/{loc['slug']}", loc["title"], "niche.config.json")
    skip = {"api", "blog", "for", "locations", "services", "embed", "resources"}
    for p in sorted(app.glob("*/page.tsx")):
        n = p.parent.name
        if n in skip or n.startswith(("_", "[")):
            continue
        src = p.read_text(encoding="utf-8")
        if re.search(r"index:\s*false|noindex", src):
            bad.add(f"/{n}")
            continue
        t, ts = ts_title(p)
        add(f"/{n}", t or n.replace("-", " "), ts or "slug")
    t, ts = ts_title(app / "page.tsx")
    add("/", t or "Home", ts or "slug")
    mw = (WEB / "src" / "middleware.ts").read_text(encoding="utf-8")
    redirected = set(map_keys(mw, "DUPLICATE_REDIRECTS")) | set(map_keys(mw, "BLOG_TO_LOCATION"))
    recat = map_keys(mw, "SLUG_TO_CATEGORY_MAP")
    return out, bad | {("slug:" + s) for s in redirected} | {("recat:" + s + ":" + c) for s, c in recat.items()}


def is_bad_page(path: str, bad: set) -> bool:
    """True if path is noindexed, or is a blog URL the middleware redirects."""
    if path in bad:
        return True
    m = re.match(r"^/blog/(?:([^/]+)/)?([^/]+)$", path)
    if not m:
        return False
    cat, slug = m.group(1), m.group(2)
    if "slug:" + slug in bad:
        return True
    rc = next((k for k in bad if k.startswith(f"recat:{slug}:")), None)
    return bool(rc and cat != rc.split(":", 2)[2])


# ----- main ---------------------------------------------------------------

def attach_leads(rows: list[dict], leads: dict, cfg: dict) -> None:
    """Owner-page leads onto each family (in place). Site-wide pages and GAP/EXCLUDE owners carry none."""
    sitewide = set(cfg.get("sitewide_pages", []))
    ranked_on = Counter(r["owner_page"] for r in rows if not unranked(r) and r["owner_page"])
    for r in rows:
        o = r["owner_page"]
        L = None if (not o or o.startswith(("GAP", "EXCLUDE")) or o in sitewide) else leads.get(o)
        r["owner_leads_90d"] = int(fnum(L["leads"])) if L else 0
        r["owner_lead_value_gbp_90d"] = int(fnum(L["est_value_gbp"])) if L else 0
        r["lead_sharing"] = ("site-wide page, leads not attributed" if o in sitewide else
                             "" if not o or o.startswith(("GAP", "EXCLUDE")) else
                             "sole family on this page" if ranked_on[o] <= 1 else f"shared with {ranked_on[o]} families")


SKIP_FIT = "informational_with_ad_spend"
FITS = ("core_hire", "paid_advice_decision", SKIP_FIT)
EXCLUDED_BASIS = "excluded by judgment"


def unranked(r: dict) -> bool:
    """Kept in the file but outside the money-page ranking and the owner rollup."""
    return r.get("commercial_fit") == SKIP_FIT or r.get("owner_basis") == EXCLUDED_BASIS


def rerank(rows: list[dict]) -> list[dict]:
    """Sort by priority desc; families judged informational_with_ad_spend or excluded are kept but unranked (rank blank, last)."""
    key = lambda r: (-fnum(r["priority"]), -fnum(r["demand_volume"]), r["family_id"])
    live = sorted((r for r in rows if not unranked(r)), key=key)
    skipped = sorted((r for r in rows if unranked(r)), key=key)
    for i, r in enumerate(live, 1):
        r["rank"] = i
    for r in skipped:
        r["rank"] = ""
    return live + skipped


ROLLUP = ["owner_page", "n_families", "demand_volume", "value_usd_month", "priority_sum", "share_of_priority",
          "leads_90d", "lead_value_gbp_90d", "lead_signal", "lead_note", "top3_family_heads"]


def rollup(rows: list[dict], leads: dict, cfg: dict) -> list[dict]:
    """One row per owner_page (blank owner = 'needs judgment'); unranked families are left out.
    share_of_priority is of the total excluding the 'needs judgment' bucket. Leads are the owner page's own entry-path leads
    (none for site-wide pages); lead_signal is decided here, at owner level."""
    sitewide, rewritten = set(cfg.get("sitewide_pages", [])), cfg.get("page_rewritten", {})
    by = defaultdict(list)
    for r in rows:
        if not unranked(r):
            by[r["owner_page"] or "needs judgment"].append(r)
    total = sum(fnum(r["priority"]) for o, m in by.items() if o != "needs judgment" for r in m)
    out = []
    for o, m in by.items():
        ps = sum(fnum(r["priority"]) for r in m)
        m.sort(key=lambda r: -fnum(r["priority"]))
        L = None if o in sitewide or o.startswith("GAP") else leads.get(o)
        share = "" if o == "needs judgment" or not total else round(ps / total, 4)
        nl = int(fnum(L["leads"])) if L else 0
        sig, note = "", ("site-wide page, leads not attributed" if o in sitewide else "")
        if share != "" and not o.startswith("GAP"):
            if nl >= 3 and share < 0.02:
                sig = "leads exceed demand"
            elif share >= 0.05 and nl == 0:
                sig = "demand without leads"
                if o in rewritten:
                    note = f"page rewritten {rewritten[o]}, maturing"
        out.append({"owner_page": o, "n_families": len(m), "demand_volume": int(sum(fnum(r["demand_volume"]) for r in m)),
                    "value_usd_month": round(sum(fnum(r["value_usd_month"]) for r in m), 2), "priority_sum": round(ps, 2),
                    "share_of_priority": share, "leads_90d": nl,
                    "lead_value_gbp_90d": int(fnum(L["est_value_gbp"])) if L else 0, "lead_signal": sig, "lead_note": note,
                    "top3_family_heads": "; ".join(r["head"] for r in m[:3])})
    out.sort(key=lambda r: -r["priority_sum"])
    return out


def override_mult(head: str, cfg: dict) -> float:
    """Product of the multipliers of every config priority_overrides entry whose match_head substring is in the head."""
    m, h = 1.0, head.lower()
    for o in cfg.get("priority_overrides", []):
        if any(t in h for t in o["match_head"]):
            m *= float(o["multiplier"])
    return m


def pos_factor(p) -> float:
    if p is None:
        return 0.2
    return 1.0 if p <= 10 else 0.7 if p <= 20 else 0.4 if p <= 50 else 0.2


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    rd = run_dir(a.site, a.run)
    st = rd / "stages"
    cl = read_csv(st / "05_clusters.csv")
    summ = {r["query"]: r for r in read_csv(st / "04_serp_summary.csv") if r["n_results"] not in ("", "0")}
    gsc = defaultdict(list)                               # norm query -> [(path, impressions, clicks, position)]
    for r in read_csv(st / "03_gsc_query_page.csv"):
        gsc[norm_query(r["query"])].append((path_of(r["page"]), fnum(r["impressions"]), fnum(r["clicks"]), fnum(r["position"])))
    leads = {r["entry_path"]: r for r in read_csv(rd / "inputs" / "leads_by_entry_page.csv")}
    wp1 = defaultdict(list)
    for r in read_csv(REPO / le["prior_assignment"]):
        wp1[norm_query(r["query"])].append(r)
    route_info, bad_pages = routes()

    fams = defaultdict(list)
    for r in cl:
        fams[r["family_id"]].append(r)

    rows, queue_src = [], {}
    for fid, ks in fams.items():
        ks.sort(key=lambda r: (-fnum(r["volume"]), r["keyword"]))
        head = ks[0]["family_head"]
        # close variants (same lexical key AND identical volume and cpc) carry one grouped Ads figure: count it once
        vg = {}
        for k in ks:
            vg[(lex_key(k["keyword"], le["cities"]), k["volume"], k["cpc"])] = (fnum(k["volume"]), fnum(k["volume"]) * fnum(k["cpc"]))
        vol_raw = sum(fnum(k["volume"]) for k in ks)
        vol = sum(v for v, _ in vg.values())
        val = sum(x for _, x in vg.values())
        hk = (lex_key(head, le["cities"]), ks[0]["volume"], ks[0]["cpc"]) if ks[0]["keyword"] == head else None
        if hk is None:
            hrow = next(k for k in ks if k["keyword"] == head)
            hk = (lex_key(head, le["cities"]), hrow["volume"], hrow["cpc"])
        head_group = [k["keyword"] for k in ks if (lex_key(k["keyword"], le["cities"]), k["volume"], k["cpc"]) == hk]
        # GSC
        page_impr, page_clk, q_best, q_impr, q_main = Counter(), Counter(), {}, {}, {}
        for k in ks:
            g = gsc.get(k["keyword"], [])
            for pth, im, ck, ps in g:
                page_impr[pth] += im
                page_clk[pth] += ck
            if g:
                q_best[k["keyword"]] = min(g, key=lambda x: x[3])[3]
                q_main[k["keyword"]] = max(g, key=lambda x: x[1])[3]      # position of the page with most impressions
                q_impr[k["keyword"]] = sum(x[1] for x in g)
        impr, clk = sum(page_impr.values()), sum(page_clk.values())
        best_pos = sum(q_best[q] * q_impr[q] for q in q_best) / impr if impr else None
        good = Counter({p: im for p, im in page_impr.items() if not is_bad_page(p, bad_pages)})
        top_page, top_impr = (good.most_common(1)[0] if good else ("", 0))
        hg = [x for kw in head_group for x in gsc.get(kw, []) if x[1] > 0]    # the whole close-variant group of the head
        gi = sum(x[1] for x in hg)
        gpos = sum(x[3] * x[1] for x in hg) / gi if gi else None
        # SERP
        hs = summ.get(head)
        pulled = [summ[k["keyword"]] for k in ks if k["keyword"] in summ]
        serp_pos = fnum(hs["our_position"], None) if hs and hs["our_position"] != "" else None
        FLOOR = 20
        if hs:
            if serp_pos is not None:
                pf, pbasis = pos_factor(serp_pos), f"serp_rank_{int(serp_pos)}"
            elif gpos is None or gi < FLOOR:
                pf, pbasis = 0.2, "serp_absent;gsc_thin" if gpos is not None else "serp_absent;no_gsc"
            elif 10 < gpos <= 20:
                pf, pbasis = 0.7, "serp_absent;gsc_11-20"
            elif 20 < gpos <= 50:
                pf, pbasis = 0.4, "serp_absent;gsc_21-50"
            else:
                pf, pbasis = 0.2, "serp_absent;gsc_top10_ignored" if gpos <= 10 else "serp_absent;gsc_over_50"
        elif gpos is not None and gi >= FLOOR:
            pf, pbasis = pos_factor(gpos), "no_serp;gsc"
        else:
            pf, pbasis = 0.2, "no_serp;gsc_thin" if gpos is not None else "no_serp;no_gsc"
        if hs and hs["hard_share_top10"] != "":
            hard, hbasis = fnum(hs["hard_share_top10"]), "head"
        elif pulled and any(p["hard_share_top10"] != "" for p in pulled):
            hard, hbasis = statistics.median(fnum(p["hard_share_top10"]) for p in pulled if p["hard_share_top10"] != ""), "family_median"
        else:
            hard, hbasis = 0.3, "default"
        win = pf * (1 - 0.5 * hard)
        # owner from WP1
        votes = Counter()
        for k in ks:
            for w in wp1.get(k["keyword"], []):
                if w["owner_page"] and w["owner_page"] != "exclude":
                    votes[w["owner_page"]] += max(fnum(k["volume"]), 0.001)
        if votes:
            o = votes.most_common(1)[0][0]
            owner = "GAP: city page" if o == "no page (city)" else o
            obasis = "WP1 ruling"
        else:
            owner, obasis = "", "needs judgment"
        yp = hs["yardstick_position"] if hs else ""
        intent = Counter()
        for k in ks:
            intent[k["intent_class"]] += max(fnum(k["volume"]), 0.001)
        row = {"family_id": fid, "head": head, "intent_class": intent.most_common(1)[0][0],
               "geo": ks[0]["geo"] if all(k["geo"] == ks[0]["geo"] for k in ks) else "",
               "n_keywords": len(ks), "n_variant_groups": len(vg), "demand_volume_raw": int(vol_raw), "top_keywords": "; ".join(k["keyword"] for k in ks[:5]),
               "demand_volume": int(vol), "value_usd_month": round(val, 2),
               "weighted_cpc": round(val / vol, 2) if vol else "", "gsc_impressions_90d": int(impr),
               "gsc_clicks_90d": int(clk), "gsc_pos_family_weighted": "" if best_pos is None else round(best_pos, 1),
               "our_top_page": top_page, "our_top_page_impr": int(top_impr), "yardstick_position": yp,
               "serp_rank_us_head": "" if serp_pos is None else int(serp_pos),
               "gsc_pos_head": "" if gpos is None else round(gpos, 1), "gsc_impr_head": int(gi), "pos_basis": pbasis,
               "hard_share": round(hard, 3), "hard_basis": hbasis, "serp_pulled": "y" if hs else "n",
               "winnability": round(win, 3),
               "confidence_note": "; ".join(n for n in ("thin data: volume under 50" if vol < 50 else "",
                                                        "no SERP for head" if not hs else "") if n),
               "priority_raw": round(val * win, 2),
               "priority": round(val * win * override_mult(head, le), 2),
               "owner_page": owner, "owner_basis": obasis}
        # leads
        rows.append(row)
        if obasis == "needs judgment":
            queue_src[fid] = (row, ks, good)

    for r in rows:
        r["commercial_fit"] = ""
    rows = rerank(rows)
    attach_leads(rows, leads, le)
    selftest(rows, cl, le["cities"])

    # owner queue: top 5 candidates = GSC-impression pages first (max 3), then URL-token overlap, then more GSC
    q_rows = []
    for r in rows:
        if r["family_id"] not in queue_src:
            continue
        _, ks, page_impr = queue_src[r["family_id"]]
        ftoks = toks_of(" ".join(k["keyword"] for k in ks[:5]))
        ov = []
        for pth, ri in route_info.items():
            pt = toks_of(pth.rsplit("/", 1)[-1]) | toks_of(ri["title"])
            if ftoks and pt & ftoks:
                ov.append((len(pt & ftoks) / len(pt | ftoks), pth))
        ov.sort(key=lambda x: (-x[0], x[1]))
        cands, seen = [], set()

        def add(p, why):
            if p not in seen and len(cands) < 5:
                seen.add(p)
                ri = route_info.get(p)
                cands.append((p, ri["title"] if ri else "(not in built route list)", ri["source"] if ri else "", why))
        for p, im in page_impr.most_common(3):
            add(p, f"gsc {int(im)} impressions on family queries")
        for s, p in ov:
            if len(cands) >= 5:
                break
            add(p, f"url/title token overlap {s:.2f}")
        for p, im in page_impr.most_common(8):
            add(p, f"gsc {int(im)} impressions on family queries")
        qr = {k: r[k] for k in ("family_id", "head", "intent_class", "geo", "demand_volume", "value_usd_month", "top_keywords",
                                "gsc_impressions_90d", "our_top_page", "yardstick_position", "winnability", "pos_basis",
                                "confidence_note", "commercial_fit")}
        for i in range(1, 6):
            c = cands[i - 1] if i <= len(cands) else ("", "", "", "")
            qr.update({f"cand{i}_page": c[0], f"cand{i}_title": c[1], f"cand{i}_title_source": c[2], f"cand{i}_why": c[3]})
        qr["input_sha256"] = row_sha(qr)
        q_rows.append(qr)

    meta = {"source": "05_clusters + 04_serp_summary + 03_gsc_query_page + WP1 assignment + leads_by_entry_page + built routes",
            "site": a.site, "data_through": a.run, "n_routes": len(route_info), "n_bad_pages": len(bad_pages), **script_meta()}
    write_csv(st / "06_families.csv", rows, FIELDS, meta)
    write_csv(st / "06_owner_queue.csv", q_rows, QUEUE, meta)
    write_csv(st / "06_owner_rollup.csv", rollup(rows, leads, le), ROLLUP, meta)
    print(f"{len(rows)} families; owner basis {dict(Counter(r['owner_basis'] for r in rows))}; owner queue {len(q_rows)}; "
          f"routes {len(route_info)}; lead flags {dict(Counter(r['lead_signal'] for r in rollup(rows, leads, le)))}")


def selftest(rows: list[dict], cl: list[dict], cities: list[str]) -> None:
    """Close-variant dedupe must hold: each (lexical key, volume, cpc) group counted once per family."""
    kws = defaultdict(list)
    for k in cl:
        kws[k["family_id"]].append(k)
    for r in rows:
        grp = Counter((lex_key(k["keyword"], cities), k["volume"], k["cpc"]) for k in kws[r["family_id"]])
        extra = sum(fnum(v) * (n - 1) for (_, v, _), n in grp.items())
        assert abs(r["demand_volume_raw"] - r["demand_volume"] - extra) < 1e-6, (r["family_id"], "dedupe mismatch")
        assert r["n_variant_groups"] == len(grp), r["family_id"]
    # the worked example: "property accountant" and "accountant property" carry one grouped volume, counted once
    for r in rows:
        v = {k["keyword"]: k for k in kws[r["family_id"]]}
        if "property accountant" in v and "accountant property" in v and v["property accountant"]["volume"] == v["accountant property"]["volume"]:
            one = fnum(v["property accountant"]["volume"])
            assert r["demand_volume_raw"] - r["demand_volume"] >= one, "property accountant volume counted more than once"


def row_sha(qr: dict) -> str:
    """sha256 of a queue row's content (everything except input_sha256), the cache key for judgments."""
    body = json.dumps({k: str(qr[k]) for k in QUEUE if k != "input_sha256"}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


if __name__ == "__main__":
    main()
