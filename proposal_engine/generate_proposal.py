"""Proposal engine: pull live leads from Supabase, anonymise, analyse, chart,
render a branded HTML proposal (print to PDF from the browser).

Usage (repo root):  python proposal_engine/generate_proposal.py
Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY in .env.

Per-prospect knobs live in config_prospect.py. Message redaction is regex first,
then MANDATORY manual review: the script writes out/messages_for_review.json;
hand-redact names/companies/addresses into message_overrides.py (id prefix ->
final text) and re-run. Never send the output without that pass.

Statistical analysis lives in analysis.py (Poisson weekly trend + forecast,
bootstrap run-rate CI, value concentration, arrival timing).
"""
import base64
import io
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
from config_prospect import PROSPECT
import analysis as an
try:
    from message_overrides import OVERRIDES  # id 8-char prefix -> final redacted message
except ImportError:
    OVERRIDES = {}
try:
    from score_overrides import SCORE_OVERRIDES  # local scores for leads not in the table
except ImportError:
    SCORE_OVERRIDES = {}

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")

# Restrained palette: one accent, greys for everything secondary.
ACCENT = "#1a6b52"
ACCENT_DARK = "#124b3a"
GREY_BAR = "#c9cdd3"
GREY_MID = "#8a9099"
INKC = "#2b2e34"
TIER_ORDER = ["very_high", "high", "medium", "low"]
TIER_LABEL = {"very_high": "Very High", "high": "High", "medium": "Medium", "low": "Low"}
TIER_COLOR = {"very_high": ACCENT_DARK, "high": ACCENT, "medium": "#9aa1a9", "low": "#d2d6db"}
# Size bands as presented to the enquirer on the lead form
ROLE_LABEL = {"Individual landlord": 'Individual landlord<span class="band">1–3 properties</span>',
              "Portfolio owner": 'Portfolio owner<span class="band">4–10 properties</span>',
              "Large portfolio": 'Large portfolio<span class="band">10+ properties</span>'}


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


def main():
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")
    src = PROSPECT["source"]
    now = datetime.now(timezone.utc)

    leads = get(url, key, "leads?select=id,full_name,email,phone,role,message,created_at"
                          f"&source=eq.{src}&order=created_at.desc&limit=2000")
    scores = {s["lead_id"]: s for s in get(url, key,
              "lead_value_scores?select=lead_id,tier,est_value_gbp,intent,channel,rationale&limit=5000")}
    for l in leads:  # local scores fill gaps; table rows win
        p = l["id"][:8]
        if l["id"] not in scores and p in SCORE_OVERRIDES:
            t, v, i, w, ch, cf, ra = SCORE_OVERRIDES[p]
            scores[l["id"]] = {"lead_id": l["id"], "tier": t, "est_value_gbp": v,
                               "intent": i, "channel": ch, "rationale": ra}
    print(f"pulled {len(leads)} {src} leads, {len(scores)} scores "
          f"({sum(1 for l in leads if l['id'] in scores)} matched)")

    # --- nurture system (live recently): funnel + recovered-contact leads ---
    lead_ids = {l["id"] for l in leads}
    nstate = [n for n in get(url, key,
              "lead_nurture_state?select=lead_id,sequence,status,created_at&order=created_at.asc&limit=2000")
              if n["lead_id"] in lead_ids]
    golive = nstate[0]["created_at"]
    golive_str = datetime.fromisoformat(golive.replace("Z", "+00:00")).strftime("%#d %B %Y")
    n_since = sum(1 for l in leads if l["created_at"] >= golive)
    nurture_ids = {n["lead_id"] for n in nstate}
    n_back = sum(1 for l in leads if l["created_at"] < golive and l["id"] in nurture_ids)
    nevents = [e for e in get(url, key, "lead_contact_events?select=lead_id,event_type&limit=5000")
               if e["lead_id"] in lead_ids]
    by_type = defaultdict(set)
    for e in nevents:
        by_type[e["event_type"]].add(e["lead_id"])
    n_entered = len({n["lead_id"] for n in nstate})
    n_contactable = sum(1 for n in nstate if n["status"] == "contactable")
    n_replied = len(by_type["replied"] | by_type["verify_pass"])
    n_bview = len(by_type["booking_viewed"])
    n_booked = len(by_type["booked"])
    n_handed = len(by_type["handed_off"])
    n_opted = len(by_type["opted_out"])
    recovered = (by_type["verify_pass"] | by_type["replied"]
                 | by_type["booked"] | by_type["handed_off"])
    # leads that entered the detail-capture sequence and now hold a phone number:
    # the phone arrived through the follow-up, not the original form
    lead_by_id = {l["id"]: l for l in leads}
    phone_via_followup = {n["lead_id"] for n in nstate
                          if n["sequence"] == "property_detail_capture"
                          and (lead_by_id[n["lead_id"]].get("phone") or "").strip()}
    print(f"nurture: {n_entered} entered, {n_contactable} contactable, "
          f"{len(recovered)} recovered/engaged")
    unscored = [l for l in leads if l["id"] not in scores]
    if unscored:
        print(f"WARNING: {len(unscored)} leads unscored (shown as 'Unscored' in table, "
              f"excluded from tier stats): {[l['id'][:8] for l in unscored]}")

    # --- base stats ---
    months = Counter(l["created_at"][:7] for l in leads)
    month_keys = sorted(months)
    fmt_m = lambda m: datetime.strptime(m, "%Y-%m").strftime("%B %Y")

    scored = [(l, scores[l["id"]]) for l in leads if l["id"] in scores]
    tiers = Counter(s["tier"] for _, s in scored)
    n_scored = len(scored) or 1
    total_val = sum(s["est_value_gbp"] or 0 for _, s in scored) or 1
    top = set(PROSPECT["top_tiers"])
    top_count = sum(tiers[t] for t in top)
    top_val = sum((s["est_value_gbp"] or 0) for _, s in scored if s["tier"] in top)
    intents = Counter(s["intent"] for _, s in scored if s["intent"] not in ("unknown", None))

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

    vals = [(s["est_value_gbp"], s["tier"]) for _, s in scored if s["est_value_gbp"]]
    v_sorted, top_share, top_k, gini = an.value_concentration([v for v, _ in vals])
    med_val = statistics.median(v for v, _ in vals)
    dows, blocks = an.arrival_profile(leads)
    biz_hours = sum(1 for l in leads if 9 <= an.parse_ts(l["created_at"]).hour < 17
                    and an.parse_ts(l["created_at"]).weekday() < 5)
    weekday_share = sum(dows[:5]) / len(leads)

    # tier mix by month (scored leads)
    tier_by_month = defaultdict(Counter)
    for l, s in scored:
        tier_by_month[l["created_at"][:7]][s["tier"]] += 1

    # intent x tier table
    intent_rows = []
    for intent, _ in intents.most_common(8):
        grp = [(s["est_value_gbp"] or 0, s["tier"]) for _, s in scored if s["intent"] == intent]
        n = len(grp)
        topn = sum(1 for _, t in grp if t in top)
        medv = statistics.median(v for v, _ in grp if v) if any(v for v, _ in grp) else 0
        label = {"structure": "Ownership structuring", "cgt": "Capital gains tax",
                 "incorporation": "Incorporation", "compliance": "Compliance / returns",
                 "sdlt": "Stamp duty land tax", "nrl_expat": "Non-resident / expat",
                 "vat": "VAT", "other": "Other advisory"}.get(intent, intent)
        intent_rows.append(
            f"<tr><td>{label}</td><td class='num'>{n}</td>"
            f"<td class='num'>{topn} ({topn/n:.0%})</td>"
            f"<td class='num'>£{medv:,.0f}</td></tr>")

    # message substance by tier
    msg_by_tier = defaultdict(list)
    for l, s in scored:
        msg_by_tier[s["tier"]].append(len((l.get("message") or "").strip()))
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
    for t in TIER_ORDER[::-1]:
        h = np.array([tier_by_month[m][t] for m in mkeys], float)
        a1.bar([fmt_m(m)[:3] + " " + m[2:4] for m in mkeys], h, bottom=bottoms,
               color=TIER_COLOR[t], width=0.5, label=TIER_LABEL[t])
        bottoms += h
    for x, v in enumerate(bottoms):
        a1.annotate(f"{v:.0f}", (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    a1.legend(frameon=False, fontsize=7, ncol=2, loc="upper left", handlelength=1, handleheight=1)
    a1.set_title("ASSESSED LEADS BY TIER AND MONTH", loc="left")
    a1.margins(y=0.3)
    style_ax(a1)
    a1.tick_params(axis="x", labelsize=7.5)

    xi2 = np.arange(len(v_sorted))
    a2.vlines(xi2, 0, v_sorted, color=[TIER_COLOR.get(t, GREY_BAR) for v, t in
              sorted(vals, key=lambda p: -p[0])], lw=2.2)
    a2.axhline(med_val, color=GREY_MID, lw=0.8, ls=(0, (2, 2)))
    a2.annotate(f"median £{med_val:,.0f}", (len(v_sorted) * 0.99, med_val), ha="right",
                va="bottom", fontsize=7.5, color=GREY_MID)
    a2.set_yscale("log")
    a2.set_yticks([100, 500, 1000, 5000, 10000])
    a2.set_yticklabels(["£100", "£500", "£1k", "£5k", "£10k"], fontsize=7.5)
    a2.set_title("ESTIMATED FIRST-YEAR ENGAGEMENT VALUE PER LEAD, RANKED", loc="left")
    a2.set_xticks([])
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

    # --- sample table ---
    sample = leads[:PROSPECT["sample_size"]]
    rows, review = [], {}
    for l in sample:
        pid = l["id"][:8]
        msg = OVERRIDES.get(pid) or redact(l.get("message"))
        if pid not in OVERRIDES:
            review[pid] = msg
        s = scores.get(l["id"])
        tier = s["tier"] if s else "unscored"
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
        rows.append(
            f'<tr{" class=nurture" if rec else ""}><td>{month}{"&thinsp;†" if rec else ""}</td>'
            f'<td>{name_cell}</td>'
            f'<td>{contact}</td>'
            f'<td>{ROLE_LABEL.get(l.get("role"), l.get("role") or "-")}</td>'
            f'<td class="tier tier-{tier}">{TIER_LABEL.get(tier, "Unscored")}</td>'
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
        f"The series shows two phases: a launch ramp through April and May, then an established "
        f"run-rate from June onwards. Fitting an exponential trend across the whole series would "
        f"flatter the growth figure, so the model above is deliberately fitted to the recent "
        f"{FIT_W} complete weeks only. On that window the estimated underlying weekly change is "
        f"{growth:+.0%} per week (90% interval {g_lo:+.0%} to {g_hi:+.0%}). The trailing 30 days "
        f"produced {run_rate} leads; resampling the daily arrival pattern places a 90% interval "
        f"of {rr_lo} to {rr_hi} on a typical 30-day window at the current rate. On the fitted "
        f"trend the next four weeks imply roughly {fc4:.0f} leads, and with a short history the "
        f"interval band should carry more weight than any point estimate.")
    quality_commentary = (
        f"Of the {n_scored} assessed leads, {top_count} ({pct(top_count)}) sit in the Very High or "
        f"High tiers, and those leads carry {top_val / total_val:.0%} of total estimated engagement "
        f"value. Value is concentrated the way advisory work usually is: the top {top_k} leads "
        f"(20% by count) account for {top_share:.0%} of estimated value (Gini {gini:.2f}). "
        f"The median assessed lead is worth an estimated £{med_val:,.0f} in first-year fees. "
        f"Message substance tracks tier: median message length is "
        f"{statistics.median(msg_by_tier.get('very_high', [0]) + msg_by_tier.get('high', [0])):.0f} "
        f"characters in the top two tiers against "
        f"{statistics.median(msg_by_tier.get('low', [0])):.0f} in the Low tier, and "
        f"{detailed} of {len(leads)} enquiries arrive with a detailed written brief.")
    timing_commentary = (
        f"{weekday_share:.0%} of enquiries arrive Monday to Friday and {biz_hours} of {len(leads)} "
        f"land inside working hours (09:00 to 17:00 on a weekday). Speed to first contact is the "
        f"strongest conversion lever the receiving firm controls; the profile above shows most "
        f"leads can be called back the same working day.")
    monthly_str = ", ".join(f"{months[m]} in {fmt_m(m)}" for m in month_keys)
    nurture_commentary = (
        f"Two weeks in, {n_replied} of {n_entered} leads ({n_replied/n_entered:.0%}) have engaged "
        f"with an automated follow-up, and {n_booked} ({n_booked/n_entered:.0%}) went as far as "
        f"self-booking a consultation within days of enquiring, with no human chasing involved. "
        f"A booking is not required for delivery, verification is: a booked lead simply arrives "
        f"appointment-ready on top of being verified. "
        f"Beyond the funnel: {n_contactable} leads currently sit confirmed-contactable, "
        f"and only {n_opted} of {n_entered} opted out. The practical effect for the receiving "
        f"firm: an enquiry that arrives with sparse contact fields is not a dead lead. The "
        f"sequence recovers or verifies details before handover, so delivered leads are warmer "
        f"and more complete than the raw form submission suggests. Rows marked † in the sample "
        f"table are leads whose details were completed or verified this way.")

    html = Template(open(os.path.join(HERE, "template.html"), encoding="utf-8").read()).safe_substitute(
        client_name=PROSPECT["client_name"], proposal_date=PROSPECT["proposal_date"],
        proposal_ref=PROSPECT["proposal_ref"], brand_name=PROSPECT["brand_name"],
        brand_domain=PROSPECT["brand_domain"], legal_entity=PROSPECT["legal_entity"],
        data_pulled_date=PROSPECT["proposal_date"],
        total_leads=len(leads), run_rate=f"{run_rate}",
        run_rate_ci=f"{rr_lo}–{rr_hi}",
        top_tier_count=top_count, top_value_share=f"{top_val / total_val:.0%}",
        top_volume_share=f"{top_count / n_scored:.0%}",
        median_value=f"{med_val:,.0f}", n_scored=n_scored,
        n_weeks=len(wc), growth_pct=f"{growth:+.0%}",
        chart_flow=chart_flow, chart_quality=chart_quality, chart_timing=chart_timing,
        monthly_series=monthly_str,
        trend_commentary=trend_commentary, quality_commentary=quality_commentary,
        timing_commentary=timing_commentary, nurture_commentary=nurture_commentary,
        n_entered=n_entered, n_contactable=n_contactable, n_replied=n_replied,
        n_bview=n_bview, n_booked=n_booked, n_handed=n_handed, n_opted=n_opted,
        pct_replied=f"{n_replied/n_entered:.0%}", pct_bview=f"{n_bview/n_entered:.0%}",
        pct_booked=f"{n_booked/n_entered:.0%}",
        nurture_golive=golive_str, n_since=n_since, n_back=n_back,
        verified_run_rate=round(run_rate * n_replied / n_entered),
        intent_rows="\n    ".join(intent_rows),
        pct_very_high=pct(tiers["very_high"]), pct_high=pct(tiers["high"]),
        pct_medium=pct(tiers["medium"]), pct_low=pct(tiers["low"]),
        sample_n=len(sample), sample_rows="\n    ".join(rows),
        price_all=PROSPECT["price_all_leads"], price_top=PROSPECT["price_top_tiers"],
        select_window=PROSPECT["select_window_days"],
        blend_mean=f"{total_val / len(vals):,.0f}",
        top_mean=f"{top_val / top_count:,.0f}",
        ratio_all=f"{PROSPECT['price_all_leads'] / (total_val / len(vals)):.0%}",
        rej_window=PROSPECT["rejection_window_days"], dead_window=PROSPECT["dead_lead_window_days"],
        touchpoints=PROSPECT["dead_lead_touchpoints"], payment_days=PROSPECT["payment_days"])

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
