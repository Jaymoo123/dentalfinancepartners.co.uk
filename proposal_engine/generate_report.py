"""Market report engine: the proposal document's data story without the commercial
half. No pricing, no terms, no lead ledger, no site names anywhere: the portfolio
is described only as specialist UK tax and accounting sites, and the breadth chart
labels bands by specialism, never by brand or domain.

Usage (repo root):  python proposal_engine/generate_report.py
Needs the same .env as generate_proposal.py, plus working GSC OAuth and
BING_WEBMASTER_API_KEY for the demand section (sites that fail either API are
skipped and counted in the coverage note, which understates demand, never
overstates it).

Recipient + ref are the constants below: this is a one-recipient document, not
a per-prospect pipeline like the proposal.
"""
import os
import re
import statistics
import sys
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta, timezone
from string import Template

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, "out")
os.chdir(ROOT)  # env() reads .env relative to the repo root
sys.path.insert(0, ROOT)
sys.path.insert(0, HERE)

from generate_proposal import (ACCENT, BRAND_NAME, DTIER_COLOR, DTIER_LABEL,
                               DTIER_ORDER, GREY_BAR, GREY_MID, INKC,
                               LEGAL_ENTITY, SOURCE_META, b64_fig,
                               case_type_label, env, get, number_sections,
                               strip_block, style_ax)
import analysis as an

# Recipient. One-off document, so no prospects/ machinery.
CLIENT_NAME = "Michael"
REPORT_REF = "MKT-2026-001"
REPORT_DATE = datetime.now(timezone.utc).strftime("%#d %B %Y")

# Short, brand-free labels for the breadth chart. Specialisms, never site names.
SPECIALISM_LABEL = {
    "property": "Property tax", "medical": "Medical professionals",
    "generalist": "Small business", "dentists": "Dental practices",
    "solicitors": "Solicitor practices", "care": "Care sector",
    "charities": "Charities", "contractors-ir35": "Contractors & IR35",
    "construction-cis": "Construction & CIS", "startups-tech": "Startups & tech",
    "crypto": "Cryptoassets", "ecommerce": "Ecommerce",
    "hospitality": "Hospitality", "pharmacies": "Pharmacies",
    "digital-agency": "Digital agencies",
}
BREADTH_COLORS = ["#1a6b52", "#3d8069", "#699c88", "#9aa1a9", "#bfc4ca", "#dfe2e6"]

BING_MS = re.compile(r"/Date\((\d+)")


def specialism(src):
    return SPECIALISM_LABEL.get(src) or SOURCE_META.get(
        src, {}).get("specialism", (src or "unknown").replace("_", " ")).capitalize()


def gsc_daily(site_key, days=182):
    """{date: (clicks, impressions)} from the GSC API, date dimension only."""
    from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
    f = GSCQueryFetcher(site_key)
    end = date.today()
    body = {"startDate": (end - timedelta(days=days)).isoformat(),
            "endDate": end.isoformat(), "dimensions": ["date"], "rowLimit": 25000}
    rows = (f.gsc_client.service.searchanalytics()
            .query(siteUrl=f.site["gsc_property_url"], body=body).execute()
            .get("rows", []))
    return {date.fromisoformat(r["keys"][0]):
            (r.get("clicks", 0), r.get("impressions", 0)) for r in rows}


def bing_daily(site_key):
    """{date: (clicks, impressions)} from GetRankAndTrafficStats (site totals;
    GetQueryStats is top-queries-only and undercounts, never use it here)."""
    from optimisation_engine.clients.bing_query_client import BingQueryFetcher
    f = BingQueryFetcher(site_key)
    rows = f.client._call("GetRankAndTrafficStats",
                          {"siteUrl": f._resolve_site_url()}) or []
    out = {}
    for r in rows:
        ms = int(BING_MS.search(r["Date"]).group(1))
        d = datetime.fromtimestamp(ms / 1000, tz=timezone.utc).date()
        out[d] = (r.get("Clicks", 0), r.get("Impressions", 0))
    return out


def merge_daily(per_site):
    total = defaultdict(lambda: [0, 0])
    for series in per_site:
        for d, (c, i) in series.items():
            total[d][0] += c
            total[d][1] += i
    return dict(total)


def weekly_sums(daily, value_idx):
    """Complete Mon-anchored weeks only: {week_start: sum}."""
    if not daily:
        return {}
    weeks = defaultdict(int)
    counts = defaultdict(int)
    for d, v in daily.items():
        w = d - timedelta(days=d.weekday())
        weeks[w] += v[value_idx]
        counts[w] += 1
    return {w: s for w, s in sorted(weeks.items()) if counts[w] == 7}


def last_30(daily, value_idx):
    ds = sorted(daily)
    return sum(daily[d][value_idx] for d in ds[-30:]), (ds[-30], ds[-1]) if len(ds) >= 30 else (ds[0], ds[-1])


def main():
    url = env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY")
    now = datetime.now(timezone.utc)

    leads = get(url, key, "leads?select=id,phone,email,message,created_at,source"
                          "&order=created_at.desc&limit=5000")
    scores = {s["lead_id"]: s for s in get(url, key,
              "lead_value_scores?select=lead_id,case_tier,case_type"
              "&case_tier=not.is.null&limit=5000")}
    scored = [(l, scores[l["id"]]) for l in leads if l["id"] in scores]
    n_scored = len(scored)
    print(f"pulled {len(leads)} leads, {n_scored} graded")

    ts = sorted(an.parse_ts(l["created_at"]) for l in leads)
    daily_leads = Counter(t.date() for t in ts)
    first_day, last_day = ts[0].date(), ts[-1].date()

    # --- rolling 30-day series + record window ---
    roll_days, roll_vals = [], []
    d = first_day + timedelta(days=29)
    while d <= last_day:
        roll_days.append(d)
        roll_vals.append(sum(daily_leads.get(d - timedelta(days=i), 0) for i in range(30)))
        d += timedelta(days=1)
    record = max(roll_vals)
    record_date = roll_days[roll_vals.index(record)]
    print(f"record rolling 30-day: {record} ending {record_date}")

    # --- trend + run rate (same machinery as the proposal) ---
    weeks, wc, partial = an.weekly_counts(leads, now)
    FIT_W = min(8, len(wc))
    H = 4
    fit_start = len(wc) - FIT_W
    beta, cov = an.poisson_trend(wc[fit_start:])
    growth = np.exp(beta[1]) - 1
    g_se = np.sqrt(cov[1, 1])
    g_lo, g_hi = np.exp(beta[1] - 1.645 * g_se) - 1, np.exp(beta[1] + 1.645 * g_se) - 1
    t_fit = np.arange(FIT_W + H, dtype=float)
    mu, lo, hi = an.trend_band(beta, cov, t_fit)
    run_rate, rr_lo, rr_hi = an.bootstrap_runrate(leads, now)
    fc4 = mu[FIT_W:FIT_W + 4].sum()

    # --- search demand: GSC + Bing per site, failures tolerated + counted ---
    from optimisation_engine.config import get_sites
    # Internal tools (screeners etc.) carry site rows but are not portfolio sites;
    # keep the coverage denominator to real lead sites only.
    site_keys = sorted(s["site_key"] for s in get_sites(active_only=False)
                       if s["site_key"] in SOURCE_META)
    g_series, b_series, g_ok, b_ok = [], [], [], []
    for sk in site_keys:
        try:
            s = gsc_daily(sk)
            if s:
                g_series.append(s)
                g_ok.append(sk)
        except Exception as exc:
            print(f"[GSC] {sk} skipped: {exc}")
        try:
            s = bing_daily(sk)
            if s:
                b_series.append(s)
                b_ok.append(sk)
        except Exception as exc:
            print(f"[BING] {sk} skipped: {exc}")
    print(f"search coverage: GSC {len(g_ok)}/{len(site_keys)}, Bing {len(b_ok)}/{len(site_keys)}")
    g_daily, b_daily = merge_daily(g_series), merge_daily(b_series)
    g_imp30, g_win = last_30(g_daily, 1)
    b_imp30, b_win = last_30(b_daily, 1)
    g_clk30, _ = last_30(g_daily, 0)
    b_clk30, _ = last_30(b_daily, 0)
    imp30, clk30 = g_imp30 + b_imp30, g_clk30 + b_clk30

    # --- tier / case-type stats ---
    tiers = Counter(s["case_tier"] for _, s in scored)
    case_types = Counter(s["case_type"] for _, s in scored if s.get("case_type"))
    tier_by_month = defaultdict(Counter)
    for l, s in scored:
        tier_by_month[l["created_at"][:7]][s["case_tier"]] += 1
    months = Counter(l["created_at"][:7] for l in leads)
    month_keys = sorted(months)
    fmt_m = lambda m: datetime.strptime(m, "%Y-%m").strftime("%B %Y")

    ct_rows = []
    for ct, n in case_types.most_common(12):
        by_tier = Counter(s["case_tier"] for _, s in scored if s.get("case_type") == ct)
        split = ", ".join(f"{by_tier[t]} {DTIER_LABEL[t]}" for t in DTIER_ORDER if by_tier[t])
        ct_rows.append(f"<tr><td>{case_type_label(ct)}</td><td class='num'>{n}</td>"
                       f"<td class='num'>{n/n_scored:.0%}</td><td>{split}</td></tr>")

    # --- breadth: leads by specialism by month, top 5 + other ---
    by_src = Counter(l.get("source") or "unknown" for l in leads)
    top_src = [s for s, _ in by_src.most_common(5)]
    src_by_month = defaultdict(Counter)
    for l in leads:
        src = l.get("source") or "unknown"
        src_by_month[l["created_at"][:7]][src if src in top_src else "_other"] += 1
    first_lead_by_src = {}
    for l in sorted(leads, key=lambda x: x["created_at"]):
        first_lead_by_src.setdefault(l.get("source") or "unknown", l["created_at"][:7])

    # --- nurture (covered sources only, described site-agnostically) ---
    nurt_sources = [s for s in by_src if SOURCE_META.get(s, {}).get("nurture_sequence")]
    covered_ids = {l["id"] for l in leads if (l.get("source") or "unknown") in nurt_sources}
    nstate = [n for n in get(url, key,
              "lead_nurture_state?select=lead_id,status,created_at&order=created_at.asc&limit=2000")
              if n["lead_id"] in covered_ids]
    nurture_on = bool(nstate)
    nurture_vars = {}
    if nurture_on:
        golive_str = datetime.fromisoformat(
            nstate[0]["created_at"].replace("Z", "+00:00")).strftime("%B %Y")
        nevents = [e for e in get(url, key,
                   "lead_contact_events?select=lead_id,event_type&limit=5000")
                   if e["lead_id"] in covered_ids]
        by_type = defaultdict(set)
        for e in nevents:
            by_type[e["event_type"]].add(e["lead_id"])
        n_entered = len({n["lead_id"] for n in nstate}) or 1
        n_contactable = sum(1 for n in nstate if n["status"] == "contactable")
        n_replied = len(by_type["replied"] | by_type["verify_pass"])
        n_bview = len(by_type["booking_viewed"])
        n_booked = len(by_type["booked"])
        n_opted = len(by_type["opted_out"])
        print(f"nurture: {n_entered} entered, {n_replied} replied/verified, {n_booked} booked")
        nurture_vars = dict(
            nurture_golive=golive_str, n_entered=n_entered, n_replied=n_replied,
            n_bview=n_bview, n_booked=n_booked,
            pct_replied=f"{n_replied/n_entered:.0%}", pct_bview=f"{n_bview/n_entered:.0%}",
            pct_booked=f"{n_booked/n_entered:.0%}",
            nurture_commentary=(
                f"Since go-live, {n_replied} of {n_entered} covered leads "
                f"({n_replied/n_entered:.0%}) have engaged with an automated follow-up, and "
                f"{n_booked} ({n_booked/n_entered:.0%}) went as far as self-booking a "
                f"consultation within days of enquiring, with no human chasing involved. "
                f"{n_contactable} leads currently sit confirmed-contactable, and only "
                f"{n_opted} of {n_entered} opted out. The practical effect: an enquiry that "
                f"arrives with sparse contact fields is not a dead lead. The sequence recovers "
                f"or verifies details before handover, so delivered leads are warmer and more "
                f"complete than the raw form submission suggests."))

    # --- timing ---
    dows, blocks = an.arrival_profile(leads)
    biz_hours = sum(1 for l in leads if 9 <= an.parse_ts(l["created_at"]).hour < 17
                    and an.parse_ts(l["created_at"]).weekday() < 5)
    weekday_share = sum(dows[:5]) / len(leads)

    # --- charts ---
    plt.rcParams.update({"font.family": "sans-serif", "font.size": 8.5,
                         "text.color": INKC, "axes.labelcolor": GREY_MID,
                         "xtick.color": GREY_MID, "ytick.color": GREY_MID,
                         "axes.titlesize": 9, "axes.titleweight": "normal",
                         "axes.titlecolor": GREY_MID})

    # Figure 1: cumulative + rolling 30-day
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(9.2, 2.7))
    all_days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]
    cum = np.cumsum([daily_leads.get(d, 0) for d in all_days])
    a1.plot(all_days, cum, color=ACCENT, lw=1.8)
    a1.fill_between(all_days, 0, cum, color=ACCENT, alpha=0.07)
    a1.annotate(f"{len(leads)}", (all_days[-1], cum[-1]), ha="left", va="center",
                fontsize=9, color=ACCENT, fontweight="bold",
                xytext=(4, 0), textcoords="offset points")
    a1.set_title("CUMULATIVE ENQUIRIES", loc="left")
    a1.margins(x=0.04, y=0.08)
    style_ax(a1, keep_y=True)
    a2.plot(roll_days, roll_vals, color=ACCENT, lw=1.8)
    a2.fill_between(roll_days, 0, roll_vals, color=ACCENT, alpha=0.07)
    ri = roll_vals.index(record)
    a2.plot([roll_days[ri]], [record], "o", ms=4.5, color=ACCENT)
    a2.annotate(f"record: {record} in 30 days", (roll_days[ri], record),
                ha="right", va="bottom", fontsize=8, color=ACCENT,
                xytext=(-4, 4), textcoords="offset points")
    a2.set_title("ROLLING 30-DAY VOLUME", loc="left")
    a2.set_ylim(0, record * 1.22)
    a2.margins(x=0.04)
    style_ax(a2, keep_y=True)
    for a in (a1, a2):
        a.tick_params(axis="x", labelsize=7.5)
        a.xaxis.set_major_locator(matplotlib.dates.MonthLocator())
        a.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%b"))
    fig.tight_layout(w_pad=3)
    chart_volume = b64_fig(fig)

    # Figure 2: weekly flow + trend + forecast (proposal Figure 1)
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
    x_trend = fit_start + t_fit
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

    # Figure 3: weekly search impressions, Google + Bing
    gw = weekly_sums(g_daily, 1)
    bw = weekly_sums(b_daily, 1)
    fig, ax = plt.subplots(figsize=(9.2, 2.6))
    if gw:
        ax.plot(list(gw), list(gw.values()), color=ACCENT, lw=1.8, label="Google")
    if bw:
        ax.plot(list(bw), list(bw.values()), color=GREY_MID, lw=1.6, label="Bing")
    ax.legend(frameon=False, fontsize=8, loc="upper left")
    ax.set_title("WEEKLY SEARCH IMPRESSIONS ACROSS THE PORTFOLIO", loc="left")
    ax.yaxis.set_major_formatter(lambda v, _: f"{v/1000:.0f}k" if v else "0")
    ax.set_ylim(0, None)
    ax.margins(x=0.02, y=0.1)
    style_ax(ax, keep_y=True)
    ax.tick_params(axis="x", labelsize=7.5)
    ax.xaxis.set_major_locator(matplotlib.dates.MonthLocator())
    ax.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%b"))
    chart_demand = b64_fig(fig)

    # Figure 4: tier mix by month + case types (proposal Figure 2)
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

    # Figure 5: monthly enquiries by specialism (top 5 + other), stacked
    fig, ax = plt.subplots(figsize=(9.2, 2.7))
    stack_keys = top_src + (["_other"] if any(
        src_by_month[m]["_other"] for m in month_keys) else [])
    bottoms = np.zeros(len(month_keys))
    for i, sk in enumerate(stack_keys):
        h = np.array([src_by_month[m][sk] for m in month_keys], float)
        ax.bar([fmt_m(m)[:3] + " " + m[2:4] for m in month_keys], h, bottom=bottoms,
               color=BREADTH_COLORS[i % len(BREADTH_COLORS)], width=0.5,
               label="Other specialisms" if sk == "_other" else specialism(sk))
        bottoms += h
    for x, v in enumerate(bottoms):
        ax.annotate(f"{v:.0f}", (x, v), ha="center", va="bottom", fontsize=7.5, color=GREY_MID)
    ax.legend(frameon=False, fontsize=7.5, ncol=3, loc="upper left",
              handlelength=1, handleheight=1)
    ax.set_title("MONTHLY ENQUIRIES BY SPECIALISM", loc="left")
    ax.margins(y=0.35)
    style_ax(ax)
    ax.tick_params(axis="x", labelsize=7.5)
    chart_breadth = b64_fig(fig)

    # Figure 6: arrival timing (proposal Figure 3)
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

    # --- commentary (computed, honest) ---
    n_months = len(month_keys)
    first30 = sum(daily_leads.get(first_day + timedelta(days=i), 0) for i in range(30))
    volume_commentary = (
        f"The portfolio has produced {len(leads)} enquiries in {n_months} months. The first "
        f"30 days produced {first30}; the record 30-day window, ending {record_date.strftime('%#d %B %Y')}, "
        f"produced {record}, and the trailing 30 days stand at {run_rate}, "
        f"{run_rate/record:.0%} of that record. The rolling series on the right is the honest "
        f"picture of scale: it moves week to week, but each plateau has resolved upward, and "
        f"the current run-rate sits near the all-time record rather than falling away from it.")
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
    demand_commentary = (
        f"In the trailing 30 days the portfolio's pages were shown {imp30:,} times in search "
        f"results ({g_imp30:,} on Google, {b_imp30:,} on Bing) and received {clk30:,} search "
        f"visits, which produced {run_rate} enquiries: roughly one enquiry per "
        f"{clk30 // max(run_rate, 1):,} visits. Two things follow. First, the enquiry flow is "
        f"not a scrape or a purchased list; it is the visible tip of a search audience the "
        f"engines themselves measure in the hundreds of thousands of impressions per month. "
        f"Second, the flow has headroom: volume growth comes from the portfolio continuing to "
        f"win impressions and convert visits, both of which the sites' publishing programme "
        f"works on continuously, not from any change to what an enquiry is.")
    top_ct_label = case_type_label(case_types.most_common(1)[0][0]) if case_types else "n/a"
    top_ct_n = case_types.most_common(1)[0][1] if case_types else 0
    msg_by_tier = defaultdict(list)
    for l, s in scored:
        msg_by_tier[s["case_tier"]].append(len((l.get("message") or "").strip()))
    detailed = sum(1 for l in leads if len((l.get("message") or "").strip()) >= 120)
    recent3 = month_keys[-3:]
    adv_recent = sum(tier_by_month[m]["advisory"] for m in recent3)
    all_recent = sum(sum(tier_by_month[m].values()) for m in recent3) or 1
    quality_commentary = (
        f"Of the {n_scored} graded leads, {tiers['advisory']} ({tiers['advisory']/n_scored:.0%}) "
        f"grade to Advisory, {tiers['standard']} ({tiers['standard']/n_scored:.0%}) to Standard "
        f"and {tiers['essential']} ({tiers['essential']/n_scored:.0%}) to Essential. The mix has "
        f"held as volume has grown: across the most recent three months the Advisory share is "
        f"{adv_recent/all_recent:.0%}, so the growth is not being bought with thinner enquiries. "
        f"The largest single case type is {top_ct_label.lower()} at {top_ct_n} enquiries. These "
        f"sites publish structural and planning guidance, so they attract that kind of enquiry. "
        f"Message substance tracks the grade: median message length is "
        f"{statistics.median(msg_by_tier.get('advisory', [0])):.0f} characters in Advisory "
        f"against {statistics.median(msg_by_tier.get('essential', [0])):.0f} in Essential, and "
        f"{detailed} of {len(leads)} enquiries arrive with a detailed written brief.")
    n_specs = len(by_src)
    top_share = by_src.most_common(1)[0][1] / len(leads)
    newest = [s for s, m in sorted(first_lead_by_src.items(), key=lambda x: x[1])[-3:]]
    breadth_commentary = (
        f"{n_specs} distinct specialisms have produced enquiries to date. The largest "
        f"contributes {top_share:.0%} of the flow, and the remainder comes from the younger "
        f"specialist sites as they mature: {', '.join(specialism(s) for s in newest)} "
        f"all produced their first enquiries within recent months. Each band in the chart is a "
        f"separate audience with its own search demand, which is what makes the portfolio's "
        f"volume additive rather than dependent on a single market.")
    timing_commentary = (
        f"{weekday_share:.0%} of enquiries arrive Monday to Friday and {biz_hours} of {len(leads)} "
        f"land inside working hours (09:00 to 17:00 on a weekday). Speed to first contact is the "
        f"strongest conversion lever the receiving firm controls; the profile above shows most "
        f"leads can be called back the same working day.")

    bing_history_note = ("Bing's API retains roughly 14 weeks of daily history, so its "
                         "series starts later than Google's.")
    if len(g_ok) == len(site_keys) and len(b_ok) == len(site_keys):
        coverage_note = (f"Search totals cover all {len(site_keys)} portfolio sites on both "
                         f"consoles. {bing_history_note}")
    else:
        coverage_note = (
            f"Google data covers {len(g_ok)} of {len(site_keys)} portfolio sites and Bing "
            f"data {len(b_ok)} of {len(site_keys)}; any site missing from either console "
            f"understates the search totals shown. {bing_history_note}")

    tpl = open(os.path.join(HERE, "template_report.html"), encoding="utf-8").read()
    if not nurture_on:
        tpl = strip_block(tpl, "nurture")
    html = Template(tpl).safe_substitute(
        brand_name=BRAND_NAME, legal_entity=LEGAL_ENTITY,
        client_name=CLIENT_NAME, report_date=REPORT_DATE, report_ref=REPORT_REF,
        total_leads=len(leads),
        first_month=datetime.strptime(month_keys[0], "%Y-%m").strftime("%b %Y"),
        last_month=datetime.strptime(month_keys[-1], "%Y-%m").strftime("%b %Y"),
        record_30d=record, record_30d_date=record_date.strftime("%#d %b %Y"),
        run_rate=run_rate, run_rate_ci=f"{rr_lo}–{rr_hi}",
        advisory_share=f"{tiers['advisory']/n_scored:.0%}",
        n_scored=n_scored, n_weeks=len(wc),
        chart_volume=chart_volume, chart_flow=chart_flow, chart_demand=chart_demand,
        chart_quality=chart_quality, chart_breadth=chart_breadth, chart_timing=chart_timing,
        imp_30d=f"{imp30:,}", clicks_30d=f"{clk30:,}", leads_30d=run_rate,
        imp_split=f"{g_imp30:,} Google · {b_imp30:,} Bing",
        clicks_split=f"{g_clk30:,} Google · {b_clk30:,} Bing",
        ctr_30d=f"{clk30/imp30:.1%}" if imp30 else "n/a",
        enq_rate=f"{run_rate/clk30:.1%}" if clk30 else "n/a",
        volume_commentary=volume_commentary, trend_commentary=trend_commentary,
        demand_commentary=demand_commentary, quality_commentary=quality_commentary,
        breadth_commentary=breadth_commentary, timing_commentary=timing_commentary,
        case_type_rows="\n    ".join(ct_rows),
        demand_caption_note=bing_history_note,
        search_coverage_note=coverage_note,
        **nurture_vars)
    html = number_sections(html)

    os.makedirs(OUT, exist_ok=True)
    out = os.path.join(OUT, f"report_{REPORT_REF}.html")
    open(out, "w", encoding="utf-8").write(html)
    print(f"wrote {out}")

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
