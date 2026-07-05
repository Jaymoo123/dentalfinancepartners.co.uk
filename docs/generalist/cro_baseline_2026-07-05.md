# Generalist Site CRO Baseline -- 2026-07-05

**Date captured:** 2026-07-05  
**Purpose:** Pre-G-0 baseline. Compare 7d and 28d post-deploy reads against this snapshot to measure lift from the G-0 (honeypot fix + form_error emit) and G-1 (full funnel parity) deploys.  
**Source:** Read-only SQL against prod Supabase project `dhlxwmvmkrfnmcgjbntk` via Management API.  
**Filters applied:** `coalesce(is_bot,false)=false AND coalesce(is_embed,false)=false` on all session queries.

---

## 1. Sessions and Distinct Visitors

| Period | Sessions | Distinct Visitors |
|--------|----------|-------------------|
| 30d    | 993      | 869               |
| 7d     | 367      | 326               |

**Reading notes:** The 7d figure is 37% of the 30d total, suggesting relatively steady weekly traffic with no large spike or trough in the last week.

---

## 2. Event Counts by Name (30d)

All events recorded for `site_key='generalist'` in the last 30 days, ordered by volume.

| event_name           | count |
|----------------------|-------|
| web_vital            | 9,575 |
| engagement_time      | 5,412 |
| subscribe_view       | 5,250 |
| section_view         | 3,169 |
| page_view            | 2,453 |
| scroll_depth         | 961   |
| experiment_view      | 637   |
| element_click        | 284   |
| calc_input_change    | 86    |
| rage_click           | 34    |
| calc_computed        | 27    |
| form_field_focus     | 22    |
| calc_view            | 10    |
| client_error         | 8     |
| calc_result_viewed   | 7     |
| outbound_click       | 5     |
| form_start           | 3     |
| cta_click            | 3     |
| lead_submitted       | 3     |
| form_submit          | 3     |
| form_field_abandon   | 3     |
| experiment_action    | 2     |

**Reading notes:**

- **No `form_view` event exists.** The first tracked funnel step is `form_field_focus` (22 events). This means a CRO funnel view-to-start ratio cannot be computed until G-0 or G-1 introduces a `form_view` emit. Post-deploy, this metric will be the primary funnel top-of-funnel signal.
- **`subscribe_view` at 5,250** is the newsletter modal, not the lead form. It fires on nearly every non-bounced session. Its high volume relative to `page_view` (2,453) suggests the modal fires multiple times per session or on scroll triggers.
- **`form_field_focus` (22) vs `form_start` (3) vs `form_submit` (3):** The gap between field-focus (22) and form_start (3) is significant -- 19 users touched a field but never triggered `form_start`. This may indicate the start event fires late in the interaction or that autofill silently touches fields without a user gesture. Investigate event ordering logic post-deploy.
- **`form_start` = `form_submit` = `lead_submitted` = 3:** No mid-form drop-off in raw event counts for users who did start. However, the honeypot bug (tracked in `property_leadform_honeypot_silent_drop.md`) means real submits where autofill hit `company_url` produce no event at all -- the 3 recorded are the survivors.
- **`rage_click` (34)** over 30d signals some friction on desktop (see device split below). Worth monitoring as a directional CRO health signal post-deploy.
- **`calc_view` (10), `calc_input_change` (86), `calc_computed` (27), `calc_result_viewed` (7):** Calculator funnel is shallow but functional. View-to-result rate is 70% among those who enter the calc (7/10), which is healthy.

---

## 3. Leads by Month (last 90 days, source = 'generalist')

| Month      | Total Leads | Honeypot Leads |
|------------|-------------|----------------|
| 2026-06    | 4           | 0              |

**30-day count (direct query):** 3 leads, 0 honeypot.

**Reading notes:**

- Only one month has data in the 90-day window, implying either the tracking table is relatively recent for this site, or lead volume is very low for April and May 2026.
- The 30d count (3) is lower than the June month count (4) because some June leads predate the 30d cutoff (before 2026-06-05).
- July 2026 has 0 leads so far (5 days elapsed).
- Zero honeypot flags in the `extras` column. The known bug (browser autofill silently discards the submit before any DB write) means suppressed real leads are invisible in this table -- the honeypot column will not flag them because no row is ever inserted. Post-fix, expect lead volume to rise without any corresponding honeypot increase.

---

## 4. Top 15 Entry Paths by Sessions (30d)

| Rank | entry_path                                                                      | Sessions |
|------|---------------------------------------------------------------------------------|----------|
| 1    | /blog/payroll-and-paye/p11d-benefits-in-kind-explained                          | 256      |
| 2    | /blog/corporation-tax/capital-allowances-on-vans                                | 96       |
| 3    | /                                                                                | 44       |
| 4    | /blog/payroll-and-paye/how-to-register-for-paye-uk-employers                    | 43       |
| 5    | /blog/corporation-tax/how-much-corporation-tax-do-i-pay                         | 18       |
| 6    | /blog/vat-and-making-tax-digital/vat-threshold-2025-26                          | 18       |
| 7    | /blog/limited-company-tax/limited-company-accountant-cost-2025-26               | 18       |
| 8    | /blog/limited-company-tax/can-i-claim-mileage-limited-company-director          | 17       |
| 9    | /blog/payroll-and-paye/employee-mileage-45p-tax-free-rules                      | 16       |
| 10   | /blog/exit-and-capital-gains/hmrc-cgt-reporting-requirements-2026               | 15       |
| 11   | /blog/exit-and-capital-gains/capital-gains-tax-on-property-uk-guide-2025-26     | 14       |
| 12   | /blog/sole-trader-and-self-employment/sole-trader-capital-allowances             | 14       |
| 13   | /blog/corporation-tax/enhanced-capital-allowances-ev-charging-points-2025-26    | 13       |
| 14   | /blog/director-pay-and-dividends/dividend-tax-rates-2025-26-personal-savings-allowance | 13 |
| 15   | /blog/sole-trader-and-self-employment/accountant-for-uber-drivers                | 11       |

**Reading notes:**

- The p11d page alone drives 256 of 993 sessions (25.8% of all traffic). This single page is the dominant acquisition asset. If the lead form or a CTA on this page converts even modestly, it will have an outsized effect on total leads.
- The homepage (rank 3, 44 sessions) is only the third entry point. Most traffic lands direct-to-blog.
- The mileage page at rank 9 references the pre-2026/27 45p rate which is now stale (AMAP is 55p from 6 Apr 2026). Worth flagging as a factual freshness issue on a high-traffic page.

---

## 5. Device Split (30d)

| Device Type | Sessions | Share (%) |
|-------------|----------|-----------|
| desktop     | 774      | 77.9      |
| mobile      | 128      | 12.9      |
| tablet      | 51       | 5.1       |
| unknown     | 40       | 4.0       |

**Reading notes:**

- Generalist is heavily desktop-skewed (78%). This is unusual compared to typical consumer web traffic but consistent with a B2B/professional audience finding tax content during work hours.
- Mobile at 13% is low. Form UX on mobile is less critical here, but should still be tested post-G-1 (particularly the honeypot autofill vector, which is more common on mobile browsers).
- The rage_click count (34) likely originates predominantly from desktop given the session split.

---

## 6. Top 10 Referrer Hosts (30d)

| Referrer Host           | Sessions |
|-------------------------|----------|
| www.bing.com            | 460      |
| www.google.com          | 117      |
| duckduckgo.com          | 58       |
| uk.search.yahoo.com     | 34       |
| bing.com                | 32       |
| chatgpt.com             | 11       |
| www.hollowaydavies.co.uk | 6       |
| www.ecosia.org          | 6        |
| copilot.microsoft.com   | 4        |
| www.msn.com             | 2        |

**Reading notes:**

- Bing family (www.bing.com + bing.com + uk.search.yahoo.com + copilot.microsoft.com + www.msn.com) totals approximately 532 sessions -- the dominant channel.
- Google accounts for only 117 sessions. Bing outdrives Google roughly 4.5:1, which is highly unusual. This is consistent with the SEO evaluation finding (2026-06-21) that Bing is delivering real clicks but Google ranking is breadth-not-rank-lift and still pre-click.
- **ChatGPT referrals (11 sessions)** confirm GEO citation is beginning. Combined with Copilot.microsoft.com (4), AI-engine referral is approximately 15 sessions (1.5% of total) before direct GEO program deployment.
- `www.hollowaydavies.co.uk` self-referrals (6) likely indicate internal links or test traffic.
- Direct/organic (no referrer) traffic is NOT shown here -- the query filters for non-null referrer_host only. The remaining ~730 sessions out of 993 are direct/organic (no referrer captured).

---

## Reading Notes Summary

1. **Funnel gap at the top:** No `form_view` event exists. The funnel is effectively invisible above `form_field_focus` (22). Post-G-0, expect `form_view` to appear and enable a true view-to-submit rate.
2. **Honeypot suppression is live:** The known autofill-discard bug means 3 recorded leads are a floor, not the true figure. Form submit rates should improve materially after G-0 ships the fix. Do not attribute post-fix lead increase to CRO changes alone -- it will partly be recovery from suppression.
3. **Single-page traffic concentration:** 26% of sessions enter via one blog post (p11d). CRO uplift on that page will dominate the headline numbers.
4. **Bing dominance:** Bing:Google ratio is ~4.5:1. This is a structural feature of this site's current ranking profile, not a sampling artefact.
5. **Desktop-first audience:** 78% desktop. Mobile optimisation is lower urgency than on consumer-facing sites, but should not be ignored.
6. **Stale content on high-traffic pages:** The employee-mileage page (rank 9, 16 sessions) still references the 45p AMAP rate which was superseded by 55p from 6 Apr 2026.
