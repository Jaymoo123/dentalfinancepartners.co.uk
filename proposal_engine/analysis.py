"""Statistical analysis for the proposal: weekly Poisson trend + forecast,
bootstrap run-rate CI, tier stability, value concentration, arrival timing.
All figures derived from the live pull; nothing projected beyond stated CIs.
"""
import numpy as np
from collections import Counter
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

WEEK = timedelta(days=7)
UK = ZoneInfo("Europe/London")


def parse_ts(s):
    """Parse a stored UTC timestamp and return it in UK local time."""
    return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(UK)


def weekly_counts(leads, now):
    """Complete weeks only (Mon-anchored, UK time), from first lead to last full week."""
    now = now.astimezone(UK)
    ts = sorted(parse_ts(l["created_at"]) for l in leads)
    start = ts[0] - timedelta(days=ts[0].weekday())
    start = start.replace(hour=0, minute=0, second=0, microsecond=0)
    this_week = now - timedelta(days=now.weekday())
    this_week = this_week.replace(hour=0, minute=0, second=0, microsecond=0)
    weeks, counts = [], []
    w = start
    while w < this_week:
        weeks.append(w)
        counts.append(sum(1 for t in ts if w <= t < w + WEEK))
        w += WEEK
    partial = sum(1 for t in ts if t >= this_week)
    return weeks, np.array(counts, float), partial


def poisson_trend(counts):
    """Fit log(mu) = a + b*t by IRLS. Returns a, b, cov(2x2)."""
    t = np.arange(len(counts), dtype=float)
    X = np.column_stack([np.ones_like(t), t])
    beta = np.array([np.log(max(counts.mean(), 0.5)), 0.0])
    for _ in range(50):
        mu = np.exp(X @ beta)
        W = mu
        z = X @ beta + (counts - mu) / mu
        XtW = X.T * W
        beta_new = np.linalg.solve(XtW @ X, XtW @ z)
        if np.max(np.abs(beta_new - beta)) < 1e-10:
            beta = beta_new
            break
        beta = beta_new
    mu = np.exp(X @ beta)
    cov = np.linalg.inv((X.T * mu) @ X)
    return beta, cov


def trend_band(beta, cov, t, z=1.645):
    """Mean curve with 90% CI on the mean via delta method."""
    X = np.column_stack([np.ones_like(t), t])
    eta = X @ beta
    se = np.sqrt(np.einsum("ij,jk,ik->i", X, cov, X))
    return np.exp(eta), np.exp(eta - z * se), np.exp(eta + z * se)


def bootstrap_runrate(leads, now, days=30, n_boot=5000, seed=7):
    """Bootstrap 90% CI on the trailing-30-day count by resampling daily counts."""
    cutoff = now.astimezone(UK) - timedelta(days=days)
    daily = Counter(parse_ts(l["created_at"]).date() for l in leads
                    if parse_ts(l["created_at"]) >= cutoff)
    obs = [daily.get((cutoff + timedelta(days=i)).date(), 0) for i in range(days)]
    rng = np.random.default_rng(seed)
    sims = rng.choice(obs, size=(n_boot, days)).sum(axis=1)
    return sum(obs), int(np.percentile(sims, 5)), int(np.percentile(sims, 95))


def value_concentration(values):
    """Sorted desc values; share of total held by top 20% of leads, and Gini."""
    v = np.sort(np.array(values, float))[::-1]
    total = v.sum()
    k = max(1, int(round(len(v) * 0.2)))
    top_share = v[:k].sum() / total
    # Gini on ascending values
    a = v[::-1]
    n = len(a)
    gini = (2 * np.sum((np.arange(1, n + 1)) * a) / (n * a.sum())) - (n + 1) / n
    return v, top_share, k, gini


def arrival_profile(leads):
    dows = Counter(parse_ts(l["created_at"]).weekday() for l in leads)
    hours = Counter(parse_ts(l["created_at"]).hour for l in leads)
    blocks = {"00-06": 0, "06-09": 0, "09-12": 0, "12-14": 0, "14-17": 0, "17-21": 0, "21-24": 0}
    edges = [(0, 6, "00-06"), (6, 9, "06-09"), (9, 12, "09-12"), (12, 14, "12-14"),
             (14, 17, "14-17"), (17, 21, "17-21"), (21, 24, "21-24")]
    for h, c in hours.items():
        for lo, hi, lbl in edges:
            if lo <= h < hi:
                blocks[lbl] += c
    return [dows.get(i, 0) for i in range(7)], blocks
