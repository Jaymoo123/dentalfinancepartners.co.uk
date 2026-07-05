# Agency Founder Finance -- CRO Baseline Snapshot

**Date:** 2026-07-06
**Site:** www.agencyfounderfinance.co.uk (source/site_key = `agency`)
**Purpose:** Pre-wave-5 baseline; newsletter surfaces retiring; health-check conversions currently bypass the leads pipeline.

---

## 1. Sessions and Visitors (non-bot, non-embed)

| Window | Sessions | Unique Visitors |
|--------|----------|-----------------|
| Last 7 days  | 10 | 10 |
| Last 30 days | 37 | 32 |

### Weekly trend (last 8 weeks, non-bot, non-embed)

| Week starting | Sessions | Visitors |
|---------------|----------|----------|
| 2026-06-08 | 5 | 5 |
| 2026-06-15 | 9 | 7 |
| 2026-06-22 | 13 | 10 |
| 2026-06-29 | 10 | 10 |

Reading note: the site has very low absolute traffic. Four weeks of data are present. Volume is modest enough that week-on-week swings are statistically meaningless; treat trends as directional only until 100+ weekly sessions are sustained.

---

## 2. Top 30 Event Names -- Last 30 Days

(Filtered to site_key = `agency`, is_bot = false, is_embed = false via web_events.ts)

| # | Event | Count |
|---|-------|-------|
| 1 | engagement_time | 183 |
| 2 | web_vital | 172 |
| 3 | subscribe_view | 111 |
| 4 | section_view | 79 |
| 5 | page_view | 54 |
| 6 | scroll_depth | 31 |
| 7 | element_click | 4 |
| 8 | form_field_focus | 3 |
| 9 | form_field_abandon | 2 |
| 10 | calc_view | 1 |
| 11 | form_start | 1 |

Only 11 distinct event types recorded; 30 slots requested but not filled. No `form_submit`, `lead_captured`, `subscribe_submit`, or `health_check_*` events are present.

**Lead form funnel (30d):**
- form_start: 1
- form_field_focus (role field, lead_form): 3
- form_field_abandon (role field, had_value=false): 2
- form_submit / lead_captured: 0

One user started the lead form and abandoned it at the first field (role). Zero submissions recorded.

**subscribe_view count (111) vs subscribe_submit (0):** Newsletter subscribe widget is being shown heavily but generating no sign-ups. These surfaces are scheduled for retirement.

---

## 3. Leads via `leads` Table -- Last 90 Days

| Month | Leads | Honeypot-flagged |
|-------|-------|-----------------|
| (no rows) | 0 | 0 |

**All-time leads (source = `agency`):** 0

Confirmed: zero leads have ever been routed to the shared `leads` table from this site. The lead pipeline is technically plumbed (form_start and form_field_focus events exist, indicating the form renders) but no submission has completed.

---

## 4. Health-Check Submissions

| Metric | Value |
|--------|-------|
| Total rows | 0 |
| First submission | null |
| Last submission | null |

The `health_check_submissions` table exists and is correctly structured (email, name, company, agency_type, revenue_band, entity, opportunities, submitted_at, etc.) but contains zero rows. The health-check funnel has not generated a single conversion to date.

Note: `health_check_submissions` has no `site_key` column; the query covers all sites. Zero is a global zero, not a filter artefact.

---

## 5. Top 10 Entry Paths -- Last 30 Days

| Entry path | Sessions |
|------------|----------|
| / | 12 |
| /blog/international-agencies/register-uk-trademark-uae-moving-agency | 3 |
| /blog/growth-and-exit/average-ebitda-multiple-marketing-agency-2025 | 3 |
| /blog/growth-and-exit/earn-out-tax-treatment-hmrc-agency-sale | 2 |
| /blog/tax-and-compliance/attribution-tool-r-and-d-tax-credit-performance-marketing-agency | 2 |
| /blog/tax-and-compliance/capital-allowances-office-fit-out-agency | 1 |
| /blog/international-agencies/hiring-remote-employee-spain-uk-agency-tax-compliance | 1 |
| /blog/tax-and-compliance/capital-allowances-second-hand-vans | 1 |
| /blog/tax-and-compliance/corporation-tax-retainer-prepayments-agency-founders | 1 |
| /blog/international-agencies/import-uk-car-to-dubai-or-sell | 1 |

The homepage takes the largest share (32% of 30d sessions). Blog entries are scattered across tax-and-compliance and growth-and-exit clusters, with international-agencies showing up twice. No calculator or /for/* pages appear as entry points yet.

---

## 6. Top 5 Referrer Hosts -- Last 30 Days

| Referrer | Sessions |
|----------|----------|
| (direct / none) | 15 |
| www.bing.com | 10 |
| www.google.com | 4 |
| chatgpt.com | 3 |
| duckduckgo.com | 2 |

Bing is the dominant search engine referrer (10 sessions vs Google's 4). ChatGPT.com contributing 3 sessions is notable for an early-stage site and suggests GEO content is beginning to surface in AI-answer contexts. Direct/none is the top channel at 41% of sessions, which may reflect branded or repeat visits, or traffic from untagged links.

---

## 7. Newsletter Subscribers

| site_key = 'agency' | Count |
|---------------------|-------|
| subscribers | 0 |

Zero subscribers recorded. The subscribe_view event fired 111 times in 30 days (365 times all-time per the unfiltered event count) but no subscriber ever confirmed. The newsletter surface is being retired; this baseline confirms no existing audience to migrate.

---

## Anomalies and Reading Notes

1. **Conversion gap is total.** Zero leads, zero health-check submissions, zero newsletter subscribers. The site has real traffic (37 sessions/30d, real search referrers) but no conversion path has completed end-to-end. The one lead_form interaction abandoned at the role field.

2. **Health-check table is estate-wide, not agency-scoped.** Even across all sites, the table is empty, meaning the health-check flow has never been tested in production anywhere.

3. **Form pipeline is partially live.** Events (form_start, form_field_focus, form_field_abandon) confirm the lead form renders and the tracking SDK is firing. The break is in submission: either the honeypot silently drops, users abandon, or a technical submission error occurs. Cross-reference the known honeypot bug (LeadForm.tsx:85, company_url autofill) -- this is the primary suspect.

4. **web_vital events have null props->>'name'.** All 172 web_vital events in the session-filtered 30d window return null for the vital name. This is a props serialisation gap, not a data absence.

5. **Traffic is real and growing.** Week-on-week sessions: 5, 9, 13, 10. ChatGPT referral presence at week 4 is encouraging for a new site. Bing is outperforming Google 2.5x in search referrals, consistent with the estate-wide Bing-first pattern.

6. **No cannibalisation risk at this traffic level.** Baseline is clean for wave-5 launch measurement; any post-wave uplift will be clearly attributable.
