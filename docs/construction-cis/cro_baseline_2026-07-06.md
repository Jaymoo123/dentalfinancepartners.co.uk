# CRO Baseline: Trade Tax Specialists (construction-cis)
**Date:** 2026-07-06
**Purpose:** Pre-R1 baseline for the twin CRO wave (construction-cis + contractors-ir35). Establishes the zero-lead, thin-traffic starting point before any conversion optimisation ships.
**Site:** www.tradetaxspecialists.co.uk
**Data source:** Supabase `web_sessions` + `web_events` + `leads` (read-only). All figures exclude bots and embeds. Window = 30 days unless stated.

---

## 1. Sessions and Visitors

| Period | Sessions | Distinct Visitors | Sessions/Visitor |
|--------|----------|-------------------|------------------|
| 30d (to 2026-07-05) | 106 | 105 | 1.01 |
| 7d (to 2026-07-05) | 29 | 28 | 1.04 |

Nearly every visitor is a first-time, single-session user. There is no returning-visitor base yet.

**Weekly pace (30d):**

| Week starting | Sessions |
|---------------|----------|
| 2026-06-08 | 22 |
| 2026-06-15 | 39 |
| 2026-06-22 | 16 |
| 2026-06-29 | 29 |

The spike in w/c 15 June (launch week) and the partial current week (w/c 29 June = 6 days so far) suggest a settling pace of roughly 20-30 sessions/week. No clear upward trend yet.

---

## 2. Engagement

| Metric | Value |
|--------|-------|
| Avg engaged time | 12.7 sec |
| Median engaged time | 0 sec |
| Avg scroll depth | 7% |
| Median scroll depth | 0% |

**Engagement tier split (30d):**

| Tier | Sessions | % |
|------|----------|---|
| Engaged (>5s) | 11 | 10% |
| Brief (1-5s) | 1 | 1% |
| Zero engagement | 94 | 89% |

The median of 0 reflects that 89% of sessions register no engagement signal at all. This is likely a combination of: (a) fast bounces before the tracker fires, (b) the site being very new with crawler/verification traffic still present despite the bot filter, and (c) genuine high bounce rate on a zero-brand site. The 10% genuinely-engaged rate (11 sessions) is the real audience at this stage.

**Device split (30d):**

| Device | Sessions | % |
|--------|----------|---|
| Desktop | 72 | 68% |
| Tablet | 26 | 25% |
| Mobile | 5 | 5% |
| Unknown | 3 | 3% |

Notable: tablets are unusually high (25%). This may be a data artefact from the site's early days or reflect trade users on shared devices. Worth monitoring.

---

## 3. Top 10 Entry Paths (30d)

| Rank | Entry path | Sessions |
|------|-----------|----------|
| 1 | / | 55 |
| 2 | /blog/cis-basics/what-construction-work-is-not-cis | 16 |
| 3 | /for/bathroom-fitters | 8 |
| 4 | /blog/cis-basics/cis-invoice-splitting-labour-materials | 6 |
| 5 | /services | 5 |
| 6 | /cmd_sco | 4 |
| 7 | /blog/cis-advanced/cis-for-labour-agencies | 2 |
| 8 | /blog/cis-compliance/cis-penalties-and-appeals | 1 |
| 9 | /for/kitchen-fitters | 1 |
| 10 | /for/gas-engineers | 1 |

The homepage accounts for 52% of entries. Two CIS-basics blog posts and one /for/ page are generating direct search landings already, which is a positive signal for indexation. `/cmd_sco` appears to be a scanner/security probe (direct, non-GB countries, no referrer) -- not real traffic.

---

## 4. Top 5 Referrer Hosts (30d)

| Referrer | Sessions | % of total |
|----------|----------|------------|
| (direct/none) | 82 | 77% |
| www.google.com | 13 | 12% |
| bing.com | 8 | 8% |
| www.bing.com | 2 | 2% |
| vercel.com | 1 | 1% |

Combined Bing (bing.com + www.bing.com) = 10 sessions = 9%. Google at 12% and Bing at 9% from a brand-new site is encouraging. The high direct share is typical for brand-new sites where the referrer header is absent or stripped.

---

## 5. Top 30 Events (30d)

| Event | Count |
|-------|-------|
| web_vital | 319 |
| page_view | 123 |
| engagement_time | 107 |
| section_view | 60 |
| scroll_depth | 34 |
| element_click | 5 |
| personalization_shown | 2 |
| form_field_focus | 1 |
| form_field_abandon | 1 |
| cta_click | 1 |
| form_start | 1 |
| personalization_dismissed | 1 |

The funnel from page_view (123) to any form interaction is extremely thin: 1 form_start, 0 form_submits, 0 leads. The single cta_click was a personalisation widget close button (`cta_label: x`) rather than a genuine intent signal. The `form_start` was on `/blog/expenses/allowable-expenses-cis-subcontractor` (role field was the first touched). No `form_submit` or `lead_captured` event exists.

---

## 6. Leads (90-day lookback)

| Month | Leads | Honeypot flagged |
|-------|-------|-----------------|
| (none) | 0 | 0 |

**Confirmed: zero lifetime leads.** The `leads` table has no rows with `source = 'construction-cis'`. The honeypot bug (company_url autofill silently drops submissions) is live on this site and may be suppressing any potential submissions, though traffic volume is too low to draw conclusions.

---

## 7. Reading Notes

- The site launched mid-June 2026. The 30-day window captures ~3.5 weeks of live data.
- 106 sessions across 3.5 weeks = ~30/week pace. This is thin but consistent with a brand-new site with no backlinks or brand recognition.
- The 10% genuinely-engaged rate (11/106 sessions) is the metric to watch. CRO improvements should move this first before optimising for form conversion.
- The honeypot silent-drop bug (see `property_leadform_honeypot_silent_drop.md`) is unresolved and will suppress real leads if any reach the form.
- `/cmd_sco` entries (4 sessions) are scanner probes, not real users. The bot filter is not catching them (non-standard UA/path). Treat as noise.
- Tablet share (25%) is anomalous. Recheck at next baseline to confirm or investigate.
- Re-baseline target: 2026-08-03 (4 weeks post-R1 wave ship).
