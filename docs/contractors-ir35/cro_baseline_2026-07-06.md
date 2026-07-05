# CRO Baseline: Contractor Tax Accountants (contractors-ir35)
**Date:** 2026-07-06
**Purpose:** Pre-R1 baseline for the twin CRO wave (construction-cis + contractors-ir35). Establishes the zero-lead, thin-traffic starting point before any conversion optimisation ships.
**Site:** www.contractortaxaccountants.co.uk
**Data source:** Supabase `web_sessions` + `web_events` + `leads` (read-only). All figures exclude bots and embeds. Window = 30 days unless stated.

---

## 1. Sessions and Visitors

| Period | Sessions | Distinct Visitors | Sessions/Visitor |
|--------|----------|-------------------|------------------|
| 30d (to 2026-07-05) | 60 | 60 | 1.00 |
| 7d (to 2026-07-05) | 22 | 22 | 1.00 |

Every visitor is a first-visit, single-session user. No returning base.

**Weekly pace (30d):**

| Week starting | Sessions |
|---------------|----------|
| 2026-06-15 | 23 |
| 2026-06-22 | 17 |
| 2026-06-29 | 20 |

This site has 3 weeks of data (deployed approx 2026-06-16, one week later than construction-cis). Pace is roughly 20 sessions/week with no clear trend.

---

## 2. Engagement

| Metric | Value |
|--------|-------|
| Avg engaged time | 2.1 sec |
| Median engaged time | 0 sec |
| Avg scroll depth | 9% |
| Median scroll depth | 0% |

**Engagement tier split (30d):**

| Tier | Sessions | % |
|------|----------|---|
| Engaged (>5s) | 1 | 2% |
| Brief (1-5s) | 0 | 0% |
| Zero engagement | 59 | 98% |

Engagement is lower than construction-cis in absolute terms. Only 1 session shows meaningful engagement. The 98% zero-engagement rate is the headline metric for the pre-wave baseline.

**Device split (30d):**

| Device | Sessions | % |
|--------|----------|---|
| Desktop | 38 | 63% |
| Mobile | 9 | 15% |
| Unknown | 7 | 12% |
| Tablet | 6 | 10% |

A more typical device mix than construction-cis. The 12% unknown device type is worth watching (may reflect the `/cmd_sco` scanner sessions or unusual UAs).

---

## 3. Top 10 Entry Paths (30d)

| Rank | Entry path | Sessions |
|------|-----------|----------|
| 1 | / | 53 |
| 2 | /blog/contractor-accounting-basics/contractor-accountant-fees-cost | 4 |
| 3 | /cmd_sco | 1 |
| 4 | /blog/ir35-status/deemed-employment-payment-explained | 1 |
| 5 | /blog/ir35-status/substitution-clause-ir35 | 1 |

The homepage dominates at 88% of entries. Only two blog pages have generated direct landings: the accountant fees cost page and two IR35 status posts. The site is not yet earning search landings at breadth.

---

## 4. Top 5 Referrer Hosts (30d)

| Referrer | Sessions | % of total |
|----------|----------|------------|
| (direct/none) | 55 | 92% |
| www.youtube.com | 2 | 3% |
| www.doubao.com | 1 | 2% |
| www.google.com | 1 | 2% |
| www.facebook.com | 1 | 2% |

92% direct is extremely high and reflects the lack of any indexed presence generating referral or search clicks yet. The 1 Google click and 2 YouTube referrals are likely personal/owner visits or link testing. `www.doubao.com` is a ByteDance AI chatbot -- could be an AI-citation or test visit.

---

## 5. Top Events (30d)

| Event | Count |
|-------|-------|
| web_vital | 163 |
| page_view | 63 |
| scroll_depth | 26 |
| engagement_time | 19 |
| section_view | 16 |

No form-interaction events of any kind: zero form_start, form_field_focus, cta_click, form_submit, or lead_captured. The funnel is entirely flat beyond page_view. `scroll_depth` (26 events from 60 sessions) suggests a quarter of sessions scroll at all.

---

## 6. Leads (90-day lookback)

| Month | Leads | Honeypot flagged |
|-------|-------|-----------------|
| (none) | 0 | 0 |

**Confirmed: zero lifetime leads.** The `leads` table has no rows with `source = 'contractors-ir35'`. The honeypot silent-drop bug is live on this site and may suppress any submissions that do reach the form, though traffic volume is too low to isolate this.

---

## 7. Reading Notes

- This site launched approx 2026-06-16, about a week after construction-cis. The 30-day window covers roughly 3 weeks of live data.
- 60 sessions in 3 weeks = ~20/week. Lower absolute pace than construction-cis, but the site is also one week younger.
- The complete absence of any form event (including form_start) sets the pre-wave baseline: CRO improvements start from zero funnel activity.
- The 98% zero-engagement rate is likely partly a tracker/timing artefact (events fire after a delay), but the pattern is consistent with construction-cis and confirms visitors are not staying.
- The doubao.com referral may indicate the site is being cited or tested via AI tools, which aligns with the GEO program goals.
- The honeypot silent-drop bug (see `property_leadform_honeypot_silent_drop.md`) is unresolved on this site.
- `/cmd_sco` sessions (1) are scanner probes -- noise.
- Re-baseline target: 2026-08-03 (4 weeks post-R1 wave ship).
