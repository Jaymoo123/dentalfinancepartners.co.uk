"""Proposal engine: pull live leads from Supabase, anonymise, analyse, chart,
render a branded HTML proposal (print to PDF from the browser).

Usage (repo root):  python proposal_engine/generate_proposal.py [--prospect <ref>]
Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY in .env.

Site-ambiguous: one prospect config (recipient + scope + commercial knobs) in,
one complete document out, zero engine or template edits. Shared sources:
  brand/legal entity      -> constants below
  published prices/tiers  -> config/tiers.json (tier_overrides footnoted)
  standard terms          -> config/standard_terms.md (verbatim)
  tiering philosophy      -> docs/CLASSIFY.md (verbatim)
Per-source specifics (role bands, nurture sequence) live in SOURCE_META.

Message redaction is regex first, then MANDATORY manual review: the script
writes out/messages_for_review.json; hand-redact names/companies/addresses
into message_overrides.py (id prefix -> final text) and re-run. Never send
the output without that pass.

Statistical analysis lives in analysis.py (Poisson weekly trend + forecast,
bootstrap run-rate CI, value concentration, arrival timing).
"""
import base64
import io
import itertools
import json
import os
import re
import statistics
import sys
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from string import Template

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

sys.path.insert(0, os.path.dirname(__file__))
if "--prospect" in sys.argv:  # load proposal_engine/prospects/<ref>.py instead of config_prospect
    import importlib
    _ref = sys.argv[sys.argv.index("--prospect") + 1]
    PROSPECT = importlib.import_module(f"prospects.{_ref}").PROSPECT
else:
    from config_prospect import PROSPECT
import analysis as an
try:
    from message_overrides import OVERRIDES  # id 8-char prefix -> final redacted message
except ImportError:
    OVERRIDES = {}
# score_overrides.py is no longer read. Grades come from lead_value_scores.case_tier,
# written when the lead is graded, so the document and the live pipeline read the same
# record. The file is retained as the history of the retired internal value scoring.

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, "out")

# Firm-side constants: the SAME for every prospect. Never per-prospect.
BRAND_NAME = "Ashfield Partner Network"
LEGAL_ENTITY = "Ashfield Trading Limited (company no. 16358723)"
SAMPLE_SIZE = 40

# Per-source specifics. A source only needs an entry here for anything beyond
# the defaults: "specialism" (lede wording + source breakdown label),
# "role_label" (banded role display; omitted = raw role text), and
# "nurture_sequence" (omitted = no nurture section for that source).
SOURCE_META = {
    "property": {
        "specialism": "UK property tax",
        "site_name": "Property Tax Partners",
        "role_label": {
            "Individual landlord": 'Individual landlord<span class="band">1–3 properties</span>',
            "Portfolio owner": 'Portfolio owner<span class="band">4–10 properties</span>',
            "Large portfolio": 'Large portfolio<span class="band">10+ properties</span>',
        },
        "nurture_sequence": "property_detail_capture",
    },
    "dentists": {"specialism": "dental practice accounting and tax",
                 "site_name": "Dental practice tax"},
    "medical": {"specialism": "medical professional accounting and tax",
                "site_name": "Medical professional tax"},
    "solicitors": {"specialism": "solicitor practice accounting and tax",
                   "site_name": "Solicitor practice tax"},
    "generalist": {"specialism": "small business accounting and tax",
                   "site_name": "Small business tax"},
    "care": {"specialism": "care sector accounting and tax", "site_name": "Care sector tax"},
    "charities": {"specialism": "charity and not-for-profit accounting",
                  "site_name": "Charity and not-for-profit"},
    "contractors-ir35": {"specialism": "contractor and IR35 tax",
                         "site_name": "Contractor and IR35 tax"},
    "startups-tech": {"specialism": "startup and technology accounting",
                      "site_name": "Startup and technology"},
    # Sites that have not yet produced a lead. Listed so a portfolio-wide run labels
    # them properly the moment they do, instead of falling through to the raw key.
    "construction-cis": {"specialism": "construction and CIS tax",
                         "site_name": "Construction and CIS tax"},
    "crypto": {"specialism": "cryptoasset tax", "site_name": "Cryptoasset tax"},
    "digital-agency": {"specialism": "digital agency accounting",
                       "site_name": "Digital agency finance"},
    "ecommerce": {"specialism": "ecommerce accounting and tax", "site_name": "Ecommerce finance"},
    "hospitality": {"specialism": "hospitality accounting and tax", "site_name": "Hospitality tax"},
    "pharmacies": {"specialism": "pharmacy accounting and tax", "site_name": "Pharmacy tax"},
    "property-standalone": {"specialism": "UK property tax", "site_name": "Property Tax Partners"},
    # Adjacent lane sites: these disclose a referral fee on-site and feed the
    # non-accounting lane, so they only appear in an adjacent-lane proposal.
    "wills-probate": {"specialism": "wills, probate and estate planning",
                      "site_name": "Wills and probate"},
    "divorce-finances": {"specialism": "divorce and financial settlement",
                         "site_name": "Divorce finances"},
}


def source_meta(src):
    return SOURCE_META.get(src, {"specialism": (src or "unknown").replace("_", " ")})


# Restrained palette: one accent, greys for everything secondary.
ACCENT = "#1a6b52"
ACCENT_DARK = "#124b3a"
GREY_BAR = "#c9cdd3"
GREY_MID = "#8a9099"
INKC = "#2b2e34"

# Published case-type tiers (docs/CLASSIFY.md). Every lead is graded against the
# rubric and the grade is stored on the lead, so nothing here is derived from the
# internal value score: the rubric forbids pricing or grading on estimated value,
# and this document must not imply otherwise.
DTIER_ORDER = ["advisory", "standard", "essential"]
DTIER_LABEL = {"advisory": "Advisory", "standard": "Standard", "essential": "Essential"}
DTIER_COLOR = {"advisory": ACCENT, "standard": "#9aa1a9", "essential": "#d2d6db"}

# Case-type tags to display labels. Unlisted tags fall back to a de-slugged form.
CASE_TYPE_LABEL = {
    "incorporation": "Incorporation",
    "incorporation_admin": "Company formation admin",
    "ownership_restructuring": "Ownership restructuring",
    "multi_entity_portfolio": "Multi-property or multi-entity portfolio",
    "cgt_planning": "Capital gains planning",
    "cgt_computation": "Capital gains computation",
    "sdlt": "Stamp duty",
    "non_resident": "Non-resident or expat",
    "historic_records_reconstruction": "Disclosures and historic records",
    "charity_formation": "Charity formation",
    "capital_allowances": "Capital allowances",
    "llp_setup": "Partnership formation",
    "self_assessment_complex": "Self assessment with complexity",
    "sme_accounts": "Company accounts and filings",
    "compliance_plus_advice": "Compliance with an advice question",
    "basic_return": "Straightforward return",
    "basic_compliance": "Basic compliance question",
    "form_request": "Form or document request",
    "too_vague": "Too vague to place (graded down)",
    "other_tax_query": "Other tax query",
    "other_query": "Outside scope",
    "not_an_enquiry": "Not a client enquiry",
}


def case_type_label(tag):
    return CASE_TYPE_LABEL.get(tag) or (tag or "unclassified").replace("_", " ").capitalize()


def env(*names):
    vals = {}
    for line in open(".env", encoding="utf-8"):
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip()
    for n in names:
        v = os.environ.get(n) or vals.get(n)
        if v:
            return v
    sys.exit(f"missing env: {names}")


def get(url, key, path):
    req = urllib.request.Request(f"{url}/rest/v1/{path}",
                                 headers={"apikey": key, "Authorization": f"Bearer {key}"})
    return json.load(urllib.request.urlopen(req))


def redact(msg):
    if not msg or not msg.strip():
        return "(no message)"
    msg = re.sub(r"[\w.+-]+@[\w-]+\.[\w.-]+", "[EMAIL]", msg)
    msg = re.sub(r"(\+44\s?|\(?0\d{2,4}\)?[\s-]?)\d{3,4}[\s-]?\d{3,4}", "[PHONE]", msg)
    msg = re.sub(r"\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b", "[POSTCODE]", msg)  # UK postcode
    return msg.strip()


def b64_fig(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=170, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode()


def style_ax(ax, keep_y=False):
    for side in ("top", "right", "left"):
        ax.spines[side].set_visible(False)
    ax.spines["bottom"].set_color("#dfe2e6")
    ax.tick_params(length=0)
    if not keep_y:
        ax.set_yticks([])


# --- shared-source loaders -------------------------------------------------

def marker_block(path, name):
    text = open(path, encoding="utf-8").read()
    m = re.search(rf"<!-- {name}:start -->(.*?)<!-- {name}:end -->", text, re.S)
    if not m:
        sys.exit(f"markers {name}:start/end not found in {path}")
    return m.group(1).strip()


def load_terms():
    """Bullet list from config/standard_terms.md, verbatim, in order."""
    block = marker_block(os.path.join(ROOT, "config", "standard_terms.md"), "terms")
    bullets = [l[2:].strip() for l in block.splitlines() if l.strip().startswith("- ")]
    if not bullets:
        sys.exit("no bullets found in standard_terms.md terms block")
    return bullets


def philosophy_html():
    """Philosophy block from docs/CLASSIFY.md, verbatim text, minimal md -> HTML.
    The block's own '## ' heading is dropped: the document section heading
    ('How we tier leads') already covers it."""
    block = marker_block(os.path.join(ROOT, "docs", "CLASSIFY.md"), "philosophy")
    bold = lambda s: re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    out, para, items = [], [], []

    def flush_para():
        if para:
            out.append(f"<p>{bold(' '.join(para))}</p>")
            para.clear()

    def flush_items():
        if items:
            out.append('<ol class="rules">' + "".join(f"<li>{bold(i)}</li>" for i in items) + "</ol>")
            items.clear()

    for line in block.splitlines():
        line = line.strip()
        if line.startswith("## "):
            continue
        m = re.match(r"\d+\.\s+(.*)", line)
        if m:
            flush_para()
            items.append(m.group(1))
        elif line:
            flush_items()
            para.append(line)
        else:
            flush_para()
            flush_items()
    flush_para()
    flush_items()
    return "\n  ".join(out)


def build_pricing(lane, overrides):
    """Tier table rows + price cards + decay/raw prose from config/tiers.json,
    with per-prospect price overrides applied and footnoted."""
    cfg = json.load(open(os.path.join(ROOT, "config", "tiers.json"), encoding="utf-8"))
    tiers = cfg["tiers"]
    priced_ids = {t["id"] for t in tiers if "price" in t}
    for k in overrides:
        if k not in priced_ids:
            sys.exit(f"tier_overrides key '{k}' is not a priced tier in config/tiers.json")

    if lane == "adjacent":
        sel = [t for t in tiers if t["id"] in ("adjacent", "raw")]
    else:
        sel = [t for t in tiers if t["id"] != "adjacent"]

    notes = []

    def price_cell(t):
        pub = t.get("price")
        over = overrides.get(t["id"])
        if over is not None and over != pub:
            notes.append(f"£{over} for this proposal; the published card price for the "
                         f"{t['label']} tier is £{pub}.")
            return f"£{over}*", over
        return f"£{pub}", pub

    rows, cards = [], []
    for t in sel:
        if t.get("batch"):
            lo, hi = t["batch_price_range"]
            price_txt = (f"£{lo} to £{hi} per monthly batch "
                         f"(about £{t['price_per_lead_equiv']} per lead)")
            ex = t.get("eligibility", "")
        else:
            price_txt, _ = price_cell(t)
            ex = ", ".join(t.get("examples", [])) or t.get("profession_lane", "")
        vol = t.get("typical_monthly_volume")
        rows.append(
            f'<tr><td class="tier tier-{t["id"]}">{t["label"]}</td>'
            f"<td>{ex}</td>"
            f'<td class="num">{price_txt}</td>'
            f'<td class="num">{f"~{vol}" if vol else "n/a"}</td></tr>')

        if not t.get("batch"):  # per-lead tiers become pricing cards; raw is prose
            over = overrides.get(t["id"])
            pub = t["price"]
            shown = over if over is not None else pub
            mark = "*" if (over is not None and over != pub) else ""
            lis = [f"<li>{', '.join(t['examples'][:3])}</li>"] if t.get("examples") else []
            if t.get("profession_lane"):
                lis.append(f"<li>Non-competing professions only ({t['profession_lane']})</li>")
            if t.get("decay"):  # accounting lanes carry the exclusive option
                lis.append(f"<li>Exclusive claim: £{shown * cfg['exclusive_multiplier']}{mark} "
                           "(locks the lead to your firm, includes the credit protection)</li>")
            cards.append(
                '<div class="option">'
                f'<div class="name">{t["label"]} tier</div>'
                f'<div class="price">£{shown}{mark}</div>'
                '<div class="per">per claimed lead · delivered in full on claim</div>'
                f"<ul>{''.join(lis)}</ul></div>")

    raw = next((t for t in tiers if t.get("batch")), None)
    decay = next((t.get("decay") for t in sel if t.get("decay")), None)
    decay_bits = []
    if decay:
        cap, mult = cfg["claim_slots_per_lead"], cfg["exclusive_multiplier"]
        decay_bits.append(
            f"Leads are shared: up to {cap} firms may claim each lead, first come, first "
            "served, and a lead's price is fixed at its first claim, so every claiming firm "
            f"pays the same. Any lead not yet claimed may be claimed exclusively at {mult} "
            "times its current price, which locks the lead to the claiming firm; once another "
            "firm has claimed, only shared slots remain. Credits apply to exclusive claims only.")
        decay_bits.append(
            "A lead holds its price for as long as it is unclaimed; there is no discount for "
            f"waiting. After {decay['cascade_after_hours']} hours with no claim it leaves the "
            "accounting lane and is offered to the adjacent professional lane, or becomes "
            "eligible for the raw batch if it was never verified.")
    if raw:
        lo, hi = raw["batch_price_range"]
        decay_bits.append(
            "Unverified enquiries that remain after the 7-day nurture window are sold as seen "
            f"in monthly raw batches of £{lo} to £{hi} (around £{raw['price_per_lead_equiv']} "
            "per lead equivalent), with no credits.")
    # de-duplicate footnotes while keeping order
    notes = list(dict.fromkeys(notes))
    override_note = (f'<p class="note">* {" ".join(notes)}</p>' if notes else "")
    return ("\n    ".join(rows), "\n    ".join(cards), len(cards),
            " ".join(decay_bits), override_note)


def strip_block(tpl, name):
    return re.sub(rf"<!-- {name}:start -->.*?<!-- {name}:end -->", "", tpl, flags=re.S)


def number_sections(html):
    counter = itertools.count(1)
    return re.sub(r"SECTION __", lambda m: f"SECTION {next(counter):02d}", html)


def main():
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")
    now = datetime.now(timezone.utc)

    lane = PROSPECT.get("profession_lane", "accounting")
    if lane not in ("accounting", "adjacent"):
        sys.exit(f"profession_lane must be 'accounting' or 'adjacent', got {lane!r}")
    sources = PROSPECT["sources"]
    src_filter = "" if sources == ["*"] else "&source=in.(" + ",".join(sources) + ")"

    leads = get(url, key, "leads?select=id,full_name,email,phone,role,message,created_at,source"
                          f"{src_filter}&order=created_at.desc&limit=2000")
    if not leads:
        sys.exit(f"no leads for sources {sources}")
    present = sorted({l.get("source") or "unknown" for l in leads})
    multi = len(present) > 1
    # Only the published classification is read. The internal value score is not
    # pulled at all, so it cannot leak into anything this document says.
    scores = {s["lead_id"]: s for s in get(url, key,
              "lead_value_scores?select=lead_id,case_tier,case_type,intent_line"
              "&case_tier=not.is.null&limit=5000")}
    matched = sum(1 for l in leads if l["id"] in scores)
    print(f"pulled {len(leads)} leads (sources: {', '.join(present)}), {matched} graded")
    ungraded = [l["id"][:8] for l in leads if l["id"] not in scores]
    if ungraded:
        sys.exit(f"{len(ungraded)} leads have no case-type grade: {', '.join(ungraded[:10])}"
                 f"{'...' if len(ungraded) > 10 else ''}\n"
                 "Grade them against docs/CLASSIFY.md and store case_tier before building.")

    # scope wording for the lede
    if multi or sources == ["*"]:
        scope_desc = "enquiries across the portfolio"
    else:
        scope_desc = f"enquiries from the portfolio's {source_meta(present[0])['specialism']} site"

    # --- nurture (only for sources with a configured sequence) ---
    nurt_sources = [s for s in present if SOURCE_META.get(s, {}).get("nurture_sequence")]
    nurt_seqs = {SOURCE_META[s]["nurture_sequence"] for s in nurt_sources}
    covered = [l for l in leads if (l.get("source") or "unknown") in nurt_sources]
    covered_ids = {l["id"] for l in covered}
    lead_by_id = {l["id"]: l for l in leads}
    nstate = []
    if covered_ids:
        nstate = [n for n in get(url, key,
                  "lead_nurture_state?select=lead_id,sequence,status,created_at&order=created_at.asc&limit=2000")
                  if n["lead_id"] in covered_ids]
    nurture_on = bool(nstate)
    recovered, phone_via_followup = set(), set()
    nurture_vars = {"nurture_sample_note": ""}
    if nurture_on:
        golive = nstate[0]["created_at"]
        golive_str = datetime.fromisoformat(golive.replace("Z", "+00:00")).strftime("%#d %B %Y")
        n_since = sum(1 for l in covered if l["created_at"] >= golive)
        nurture_ids = {n["lead_id"] for n in nstate}
        n_back = sum(1 for l in covered if l["created_at"] < golive and l["id"] in nurture_ids)
        nevents = [e for e in get(url, key, "lead_contact_events?select=lead_id,event_type&limit=5000")
                   if e["lead_id"] in covered_ids]
        by_type = defaultdict(set)
        for e in nevents:
            by_type[e["event_type"]].add(e["lead_id"])
        n_entered = len(nurture_ids) or 1
        n_contactable = sum(1 for n in nstate if n["status"] == "contactable")
        n_replied = len(by_type["replied"] | by_type["verify_pass"])
        n_bview = len(by_type["booking_viewed"])
        n_booked = len(by_type["booked"])
        n_opted = len(by_type["opted_out"])
        recovered = (by_type["verify_pass"] | by_type["replied"]
                     | by_type["booked"] | by_type["handed_off"])
        # leads that entered a detail-capture sequence and now hold a phone number:
        # the phone arrived through the follow-up, not the original form
        phone_via_followup = {n["lead_id"] for n in nstate
                              if n["sequence"] in nurt_seqs
                              and (lead_by_id[n["lead_id"]].get("phone") or "").strip()}
        print(f"nurture: {n_entered} entered, {n_contactable} contactable, "
              f"{len(recovered)} recovered/engaged")
        if len(nurt_sources) == 1:
            nurture_scope = f"the portfolio's {source_meta(nurt_sources[0])['specialism']} site"
        else:
            nurture_scope = "the covered sites"
        nurture_commentary = (
            f"Since go-live, {n_replied} of {n_entered} leads ({n_replied/n_entered:.0%}) have "
            f"engaged with an automated follow-up, and {n_booked} ({n_booked/n_entered:.0%}) went "
            f"as far as self-booking a consultation within days of enquiring, with no human "
            f"chasing involved. A booking is not required for delivery, verification is: a booked "
            f"lead simply arrives appointment-ready on top of being verified. "
            f"Beyond the funnel: {n_contactable} leads currently sit confirmed-contactable, "
            f"and only {n_opted} of {n_entered} opted out. The practical effect for the receiving "
            f"firm: an enquiry that arrives with sparse contact fields is not a dead lead. The "
            f"sequence recovers or verifies details before handover, so delivered leads are warmer "
            f"and more complete than the raw form submission suggests. Rows marked † in the sample "
            f"table are leads whose details were completed or verified this way.")
        nurture_vars = dict(
            nurture_golive=golive_str, nurture_scope=nurture_scope,
            n_since=n_since, n_back=n_back, n_entered=n_entered,
            n_replied=n_replied, n_bview=n_bview, n_booked=n_booked,
            pct_replied=f"{n_replied/n_entered:.0%}", pct_bview=f"{n_bview/n_entered:.0%}",
            pct_booked=f"{n_booked/n_entered:.0%}", nurture_commentary=nurture_commentary,
            nurture_sample_note=(
                " Rows marked † engaged with the automated follow-up sequence described in the "
                "contactability section above: their contact details were verified, or completed "
                "where the original submission was sparse, before handover."))
    unscored = [l for l in leads if l["id"] not in scores]
    if unscored:
        print(f"WARNING: {len(unscored)} leads unscored (shown as 'Unscored' in table, "
              f"excluded from tier stats): {[l['id'][:8] for l in unscored]}")

    # --- base stats ---
    months = Counter(l["created_at"][:7] for l in leads)
    month_keys = sorted(months)
    fmt_m = lambda m: datetime.strptime(m, "%Y-%m").strftime("%B %Y")

    scored = [(l, scores[l["id"]]) for l in leads if l["id"] in scores]
    if not scored:
        sys.exit("no graded leads; nothing to analyse")
    tiers = Counter(s["case_tier"] for _, s in scored)
    n_scored = len(scored)
    top_count = tiers["advisory"]
    case_types = Counter(s["case_type"] for _, s in scored if s.get("case_type"))

    # --- statistical analysis ---
    weeks, wc, partial = an.weekly_counts(leads, now)
    # Fit the trend on the recent steady-state window only: the launch ramp
    # (near-zero early weeks) makes a whole-series exponential fit overclaim.
    FIT_W = min(8, len(wc))
    H = 4  # forecast horizon, weeks
    fit_start = len(wc) - FIT_W
    beta, cov = an.poisson_trend(wc[fit_start:])
    growth = np.exp(beta[1]) - 1
    g_se = np.sqrt(cov[1, 1])
    g_lo, g_hi = np.exp(beta[1] - 1.645 * g_se) - 1, np.exp(beta[1] + 1.645 * g_se) - 1
    t_fit = np.arange(FIT_W + H, dtype=float)  # local time within fit window
    mu, lo, hi = an.trend_band(beta, cov, t_fit)
    run_rate, rr_lo, rr_hi = an.bootstrap_runrate(leads, now)
    fc4 = mu[FIT_W:FIT_W + 4].sum()  # implied next-4-week volume on trend

    dows, blocks = an.arrival_profile(leads)
    biz_hours = sum(1 for l in leads if 9 <= an.parse_ts(l["created_at"]).hour < 17
                    and an.parse_ts(l["created_at"]).weekday() < 5)
    weekday_share = sum(dows[:5]) / len(leads)

    # tier mix by month
    tier_by_month = defaultdict(Counter)
    for l, s in scored:
        tier_by_month[l["created_at"][:7]][s["case_tier"]] += 1

    # case-type table: what the flow actually contains, checkable against the rubric
    ct_rows = []
    for ct, n in case_types.most_common(12):
        grp = [s["case_tier"] for _, s in scored if s.get("case_type") == ct]
        by_tier = Counter(grp)
        split = ", ".join(f"{by_tier[t]} {DTIER_LABEL[t]}" for t in DTIER_ORDER if by_tier[t])
        ct_rows.append(
            f"<tr><td>{case_type_label(ct)}</td><td class='num'>{n}</td>"
            f"<td class='num'>{n/n_scored:.0%}</td><td>{split}</td></tr>")

    # leads-by-source breakdown (multi-source runs only)
    source_rows = []
    if multi:
        for src in sorted(present, key=lambda s: -sum(
                1 for l in leads if (l.get("source") or "unknown") == s)):
            grp = [s for l, s in scored if (l.get("source") or "unknown") == src]
            n_src = sum(1 for l in leads if (l.get("source") or "unknown") == src)
            by_tier = Counter(s["case_tier"] for s in grp)
            meta = source_meta(src)
            sp = meta["specialism"]
            label = meta.get("site_name", sp[0].upper() + sp[1:])
            source_rows.append(
                f"<tr><td>{label}</td><td class='num'>{n_src}</td>"
                + "".join(f"<td class='num'>{by_tier[t]}</td>" for t in DTIER_ORDER)
                + "</tr>")

    # message substance by tier
    msg_by_tier = defaultdict(list)
    for l, s in scored:
        msg_by_tier[s["case_tier"]].append(len((l.get("message") or "").strip()))
    detailed = sum(1 for l in leads if len((l.get("message") or "").strip()) >= 120)

    # --- charts ---
    plt.rcParams.update({"font.family": "sans-serif", "font.size": 8.5,
                         "text.color": INKC, "axes.labelcolor": GREY_MID,
                         "xtick.color": GREY_MID, "ytick.color": GREY_MID,
                         "axes.titlesize": 9, "axes.titleweight": "normal",
                         "axes.titlecolor": GREY_MID})

    # Figure 1: weekly flow + Poisson trend + forecast band
    fig, ax = plt.subplots(figsize=(9.2, 2.9))
    n_all = len(wc) + H
    xi = np.arange(len(wc))
    ax.bar(xi, wc, color=GREY_BAR, width=0.62, zorder=2)
    for x, v in zip(xi, wc):
        if v:
            ax.annotate(f"{v:.0f}", (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    ax.bar([len(wc)], [partial], color="white", edgecolor=GREY_MID, lw=1,
           ls=(0, (3, 2)), width=0.62, zorder=2)
    ax.annotate(f"{partial}", (len(wc), partial), ha="center", va="bottom",
                fontsize=7.5, color=GREY_MID, zorder=5)
    x_trend = fit_start + t_fit  # global x for the fitted window + forecast
    ax.plot(x_trend[:FIT_W], mu[:FIT_W], color=ACCENT, lw=1.6, zorder=3)
    ax.plot(x_trend[FIT_W - 1:], mu[FIT_W - 1:], color=ACCENT, lw=1.4, ls=(0, (4, 3)), zorder=3)
    ax.fill_between(x_trend[FIT_W - 1:], lo[FIT_W - 1:], hi[FIT_W - 1:],
                    color=ACCENT, alpha=0.10, zorder=1)
    ax.axvline(len(wc) - 0.5, color="#dfe2e6", lw=0.8)
    ymax = max(wc.max(), hi.max(), partial) * 1.22
    ax.set_ylim(0, ymax)
    ax.annotate("observed", (len(wc) - 0.8, ymax * 0.93), ha="right",
                fontsize=7.5, color=GREY_MID)
    ax.annotate("trend fitted to recent 8 weeks,\nextrapolated with 90% interval",
                (len(wc) - 0.1, ymax * 0.93), va="top", fontsize=7.5, color=ACCENT)
    ticks = [i for i in range(0, n_all, 2)]
    ax.set_xticks(ticks)
    ax.set_xticklabels([(weeks[0] + timedelta(weeks=i)).strftime("%d %b") for i in ticks],
                       fontsize=7.5)
    ax.margins(x=0.01)
    style_ax(ax)
    chart_flow = b64_fig(fig)

    # Figure 2: tier composition by month (stacked) + value concentration
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(9.2, 2.7), gridspec_kw={"width_ratios": [1, 1.3]})
    mkeys = [m for m in month_keys if sum(tier_by_month[m].values()) > 0]
    bottoms = np.zeros(len(mkeys))
    for t in DTIER_ORDER[::-1]:
        h = np.array([tier_by_month[m][t] for m in mkeys], float)
        a1.bar([fmt_m(m)[:3] + " " + m[2:4] for m in mkeys], h, bottom=bottoms,
               color=DTIER_COLOR[t], width=0.5, label=DTIER_LABEL[t])
        bottoms += h
    for x, v in enumerate(bottoms):
        a1.annotate(f"{v:.0f}", (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    a1.legend(frameon=False, fontsize=7, ncol=3, loc="upper left", handlelength=1, handleheight=1)
    a1.set_title("GRADED LEADS BY TIER AND MONTH", loc="left")
    a1.margins(y=0.3)
    style_ax(a1)
    a1.tick_params(axis="x", labelsize=7.5)

    # Right: the case types the flow actually contains, coloured by the tier each
    # one grades to. This is the rubric applied to real enquiries, not a value estimate.
    top_ct = case_types.most_common(10)[::-1]
    ct_labels = [case_type_label(c) for c, _ in top_ct]
    ct_counts = [n for _, n in top_ct]
    ct_colors = [DTIER_COLOR[Counter(s["case_tier"] for _, s in scored
                                     if s.get("case_type") == c).most_common(1)[0][0]]
                 for c, _ in top_ct]
    y = np.arange(len(top_ct))
    a2.barh(y, ct_counts, color=ct_colors, height=0.62)
    a2.set_yticks(y)
    a2.set_yticklabels(ct_labels, fontsize=7.5)
    for yy, v in zip(y, ct_counts):
        a2.annotate(str(v), (v, yy), ha="left", va="center", fontsize=7.5,
                    color=GREY_MID, xytext=(3, 0), textcoords="offset points")
    a2.set_title("CASE TYPES IN THE FLOW, COLOURED BY TIER", loc="left")
    a2.set_xticks([])
    a2.margins(x=0.12)
    for side in ("top", "right", "bottom"):
        a2.spines[side].set_visible(False)
    a2.spines["left"].set_color("#dfe2e6")
    a2.tick_params(length=0)
    fig.tight_layout(w_pad=3)
    chart_quality = b64_fig(fig)

    # Figure 3: arrival timing
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(9.2, 2.2))
    dlabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    a1.bar(dlabels, dows, color=[ACCENT if i < 5 else GREY_BAR for i in range(7)], width=0.55)
    for x, v in enumerate(dows):
        a1.annotate(str(v), (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    a1.set_title("ARRIVALS BY DAY OF WEEK", loc="left")
    bl, bv = list(blocks), list(blocks.values())
    a2.bar(bl, bv, color=[ACCENT if l in ("09-12", "12-14", "14-17") else GREY_BAR for l in bl],
           width=0.55)
    for x, v in enumerate(bv):
        a2.annotate(str(v), (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    a2.set_title("ARRIVALS BY TIME OF DAY", loc="left")
    for a in (a1, a2):
        a.margins(y=0.25)
        style_ax(a)
        a.tick_params(axis="x", labelsize=7.5)
    fig.tight_layout(w_pad=3)
    chart_timing = b64_fig(fig)

    # --- sample table (--all-leads = the full ledger instead of the recent sample) ---
    full_ledger = "--all-leads" in sys.argv
    sample = leads if full_ledger else leads[:SAMPLE_SIZE]
    rows, review = [], {}
    for l in sample:
        pid = l["id"][:8]
        msg = OVERRIDES.get(pid) or redact(l.get("message"))
        if pid not in OVERRIDES:
            review[pid] = msg
        s = scores.get(l["id"])
        dtier = s["case_tier"] if s else "unscored"
        month = an.parse_ts(l["created_at"]).strftime("%#d %b, %H:%M")
        rec = l["id"] in recovered
        name_cell = ("[Populated]" if (l.get("full_name") or "").strip()
                     else "[Captured in follow-up]" if rec else "[Not provided]")
        has_email = bool((l.get("email") or "").strip())
        has_phone = bool((l.get("phone") or "").strip())
        if has_email and has_phone:
            contact = ("Email + phone (phone via follow-up)"
                       if l["id"] in phone_via_followup else "Email + phone")
        elif has_email:
            contact = "Email only"
        elif has_phone:
            contact = "Phone only"
        else:
            contact = "[Not provided]"
        role_map = source_meta(l.get("source")).get("role_label", {})
        rows.append(
            f'<tr{" class=nurture" if rec else ""}><td>{month}{"&thinsp;†" if rec else ""}</td>'
            f'<td>{name_cell}</td>'
            f'<td>{contact}</td>'
            f'<td>{role_map.get(l.get("role"), l.get("role") or "-")}</td>'
            f'<td class="tier tier-{dtier}">{DTIER_LABEL.get(dtier, "Ungraded")}</td>'
            f'<td>{case_type_label(s.get("case_type")) if s else "-"}</td>'
            f'<td>{msg}</td></tr>')

    os.makedirs(OUT, exist_ok=True)
    if review:
        rp = os.path.join(OUT, "messages_for_review.json")
        json.dump(review, open(rp, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        print(f"MANUAL PASS REQUIRED: {len(review)} messages without an override -> {rp}")
        print("Hand-redact names/companies/addresses into message_overrides.py, then re-run.")

    # --- commentary (computed, honest) ---
    pct = lambda n: f"{n / n_scored:.0%}"
    trend_commentary = (
        f"The series shows two phases: an initial launch ramp, then an established run-rate over "
        f"the recent weeks. Fitting an exponential trend across the whole series would flatter "
        f"the growth figure, so the model above is deliberately fitted to the recent "
        f"{FIT_W} complete weeks only. On that window the estimated underlying weekly change is "
        f"{growth:+.0%} per week (90% interval {g_lo:+.0%} to {g_hi:+.0%}). The trailing 30 days "
        f"produced {run_rate} leads; resampling the daily arrival pattern places a 90% interval "
        f"of {rr_lo} to {rr_hi} on a typical 30-day window at the current rate. On the fitted "
        f"trend the next four weeks imply roughly {fc4:.0f} leads, and with a short history the "
        f"interval band should carry more weight than any point estimate.")
    top_ct_label = case_type_label(case_types.most_common(1)[0][0]) if case_types else "n/a"
    top_ct_n = case_types.most_common(1)[0][1] if case_types else 0
    quality_commentary = (
        f"All {n_scored} leads are graded against the published rubric on the work the enquiry "
        f"describes. {top_count} ({pct(top_count)}) grade to Advisory, {tiers['standard']} "
        f"({pct(tiers['standard'])}) to Standard and {tiers['essential']} "
        f"({pct(tiers['essential'])}) to Essential. The largest single case type is "
        f"{top_ct_label.lower()} at {top_ct_n} enquiries. Note the mix is more advisory-weighted "
        f"than the typical monthly volumes on the tier card, which are portfolio-wide planning "
        f"figures: these sites publish structural and planning guidance, so they attract that "
        f"kind of enquiry. Grading is on case type only and never on what we guess a client "
        f"might be worth, and anything that sits between two tiers is graded down, which is why "
        f"{tiers['essential']} enquiries carry the Essential grade rather than a higher one. "
        f"Message substance tracks the grade: median message length is "
        f"{statistics.median(msg_by_tier.get('advisory', [0])):.0f} characters in Advisory "
        f"against {statistics.median(msg_by_tier.get('essential', [0])):.0f} in Essential, and "
        f"{detailed} of {len(leads)} enquiries arrive with a detailed written brief.")
    timing_commentary = (
        f"{weekday_share:.0%} of enquiries arrive Monday to Friday and {biz_hours} of {len(leads)} "
        f"land inside working hours (09:00 to 17:00 on a weekday). Speed to first contact is the "
        f"strongest conversion lever the receiving firm controls; the profile above shows most "
        f"leads can be called back the same working day.")
    monthly_str = ", ".join(f"{months[m]} in {fmt_m(m)}" for m in month_keys)

    # --- shared sources ---
    terms = load_terms()
    tier_rows, price_cards, n_cards, decay_note, override_note = build_pricing(
        lane, PROSPECT.get("tier_overrides", {}))

    tpl = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
    if not nurture_on:
        tpl = strip_block(tpl, "nurture")
    if not multi:
        tpl = strip_block(tpl, "srcbreak")

    html = Template(tpl).safe_substitute(
        brand_name=BRAND_NAME, legal_entity=LEGAL_ENTITY, scope_desc=scope_desc,
        client_name=PROSPECT["client_name"], proposal_date=PROSPECT["proposal_date"],
        proposal_ref=PROSPECT["proposal_ref"],
        data_pulled_date=PROSPECT["proposal_date"],
        total_leads=len(leads), run_rate=f"{run_rate}",
        run_rate_ci=f"{rr_lo}–{rr_hi}",
        advisory_share=f"{top_count / n_scored:.0%}",
        n_weeks=len(wc), growth_pct=f"{growth:+.0%}",
        chart_flow=chart_flow, chart_quality=chart_quality, chart_timing=chart_timing,
        monthly_series=monthly_str,
        trend_commentary=trend_commentary, quality_commentary=quality_commentary,
        timing_commentary=timing_commentary,
        case_type_rows="\n    ".join(ct_rows),
        source_rows="\n    ".join(source_rows),
        sample_n=len(sample), sample_rows="\n    ".join(rows),
        sample_heading="Complete lead ledger" if full_ledger else "Sample of recent leads",
        sample_intro=("Every enquiry received to date" if full_ledger
                      else "The $sample_n most recent enquiries".replace("$sample_n", str(len(sample)))),
        philosophy_html=philosophy_html(),
        tier_rows=tier_rows, override_note=override_note,
        price_cards=price_cards, n_cards=n_cards, decay_note=decay_note,
        qualifying_bullet=terms[0],
        terms_items="\n    ".join(f"<li>{t}</li>" for t in terms),
        payment_days=PROSPECT.get("payment_days", 14),
        **nurture_vars)
    html = number_sections(html)

    out = os.path.join(OUT, f"proposal_{PROSPECT['proposal_ref']}.html")
    open(out, "w", encoding="utf-8").write(html)
    print(f"wrote {out}  ({len(sample)} sample rows, {len(leads)} leads charted)")

    pdf = out[:-5] + ".pdf"
    edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if os.path.exists(edge):
        import subprocess
        subprocess.run([edge, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={pdf}", "file:///" + out.replace(os.sep, "/")],
                       check=True, capture_output=True)
        print(f"wrote {pdf}")
    else:
        print(f"Edge not found; open {out} in a browser and print to PDF")


if __name__ == "__main__":
    main()
