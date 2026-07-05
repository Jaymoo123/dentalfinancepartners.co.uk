# Dentists CRO Baseline Snapshot

**Site:** www.dentalfinancepartners.co.uk  
**Site key / source:** `dentists`  
**Date captured:** 2026-07-06  
**Purpose:** Pre-release "before" reference for estate CRO parity program release D-1. All figures are read-only SQL snapshots from the Supabase production database (`dhlxwmvmkrfnmcgjbntk`). No data was written or modified.

---

## 1. Sessions and Visitors (non-bot, non-embed)

| Period | Sessions | Distinct Visitors |
|--------|----------|-------------------|
| Last 30 days | 291 | 224 |
| Last 7 days | 77 | 59 |

**Reading notes:** Volume is modest but consistent. The 7d/30d ratio (26% of sessions, 26% of visitors) implies a steady week-on-week run rate with no obvious spike or trough. At ~224 monthly visitors this is a low-traffic site; CRO improvements will take longer to reach statistical significance than on Property.

---

## 2. Event Name Counts (last 30 days, non-bot, non-embed, top 40)

| # | Event Name | Count |
|---|------------|-------|
| 1 | engagement_time | 1,639 |
| 2 | web_vital | 985 |
| 3 | section_view | 953 |
| 4 | scroll_depth | 369 |
| 5 | page_view | 332 |
| 6 | calc_input_change | 166 |
| 7 | element_click | 89 |
| 8 | calc_computed | 46 |
| 9 | rage_click | 16 |
| 10 | calc_view | 11 |
| 11 | form_field_focus | 9 |
| 12 | calc_result_viewed | 8 |
| 13 | client_error | 6 |
| 14 | form_field_abandon | 3 |
| 15 | form_start | 3 |
| 16 | lead_submitted | 1 |
| 17 | form_submit | 1 |
| 18 | form_error | 1 |
| 19 | cta_click | 1 |

**Reading notes:**

- Only 19 distinct event types recorded (vs 40 queried); the tracker is active but the event taxonomy is narrow.
- **Funnel compression is severe:** 332 page_views reduce to 3 form_start, 1 form_submit, 1 lead_submitted -- a form entry rate of roughly 0.9% of page views and a submit-to-lead rate of 100% (single lead submitted).
- **rage_click at 16** is disproportionately high relative to the 1 cta_click. With only 89 element_clicks total, 16 rage_clicks represents 18% of all clicks -- a strong signal of frustrated UI interaction somewhere on the site. Worth a page_path breakdown post-release.
- **calc_input_change (166) vs calc_view (11):** the ratio implies some events are fired per keystroke rather than per session, which is expected, but calc engagement is real (11 calc views, 46 computed results, 8 result_viewed events).
- **form_error (1):** only one recorded -- either errors are rare or the error event is under-instrumented. Flag for D-1 instrumentation parity check.

---

## 3. Leads by Month (source='dentists', last 90 days)

| Month | Total Leads | Honeypot Flagged |
|-------|-------------|------------------|
| June 2026 | 1 | n/a |
| May 2026 | 3 | n/a |
| April 2026 | 1 | n/a |

**Reading notes:** `honeypot_triggered` column does not exist on the `leads` table for this site (the column is present on Property but has not been applied estate-wide). This is a D-1 parity gap: honeypot tracking is absent, so bot/autofill-killed leads cannot be distinguished from genuine zero-lead periods. The known honeypot autofill bug (see memory: `property_leadform_honeypot_silent_drop.md`) applies to the shared LeadForm component and may be suppressing dentists leads silently. Total leads over 90 days = 5, average 1.7/month. July 2026 = 0 leads to date (captured 2026-07-06).

---

## 4. Top 15 Entry Paths (last 30 days, non-bot)

| # | Entry Path | Sessions |
|---|-----------|----------|
| 1 | /blog/nhs-contracts/uda-value-explained-for-uk-dentists | 55 |
| 2 | / | 16 |
| 3 | /blog/practice-finance/sole-trader-vs-limited-company-dentists-uk | 15 |
| 4 | /blog/nhs-contracts/band-1-band-2-band-3-uda-treatment-explained | 15 |
| 5 | /blog/associate-tax/dentist-pension-contributions-tax-relief-uk | 13 |
| 6 | /blog/nhs-contracts/dental-foundation-training-pay-scales-uk-2026 | 12 |
| 7 | /blog/nhs-contracts/scotland-statement-of-dental-remuneration-explained | 11 |
| 8 | /blog/associate-tax/associate-dentist-allowable-expenses-uk-2025-26 | 10 |
| 9 | /blog/nhs-contracts/wales-nhs-dental-contract-reform-2026 | 8 |
| 10 | /blog/buying-a-practice/dental-practice-goodwill-buying-selling | 8 |
| 11 | /blog/goodwill-and-practice-sale/how-to-value-a-uk-dental-practice-2026 | 6 |
| 12 | /blog/practice-accounting/dental-practice-software-accounting-integration | 6 |
| 13 | /blog/vat-and-compliance/dental-practice-vat-compliance-guide-uk | 6 |
| 14 | /blog/practice-accounting/nhs-contract-payments-accounting-uk-dentists | 6 |
| 15 | /contact | 6 |

**Reading notes:**

- The top entry by a large margin is an NHS/UDA blog post (55 sessions = 19% of all 30d sessions), suggesting strong organic pull for NHS-contract content. This is the highest-traffic page and the most important CRO target.
- The homepage (`/`) is only the 2nd entry point at 16 sessions -- typical for a blog-heavy SEO site.
- `/contact` appearing in 15th place (6 sessions direct entry) is healthy; it means some visitors navigate directly to the contact page, likely returning visitors or referrals.
- The nhs-contracts cluster (rows 1, 4, 6, 7, 9) collectively drives 101 sessions (35% of total) -- any CRO changes to blog CTAs in that category will have the largest leverage.

---

## 5. Device Split (last 30 days, non-bot)

| Device Type | Sessions | Share (%) |
|-------------|----------|-----------|
| desktop | 149 | 51.2 |
| mobile | 125 | 43.0 |
| (unknown) | 11 | 3.8 |
| tablet | 6 | 2.1 |

**Reading notes:** Near-even desktop/mobile split (51/43). This is slightly more desktop-skewed than a typical B2C site, consistent with a professional/practice-owner audience researching during work hours. CRO designs must perform well on both. The 3.8% unknown device_type is likely headless/bot traffic that passed the is_bot=false filter -- worth noting as a potential measurement gap.

---

## 6. Top 10 Referrer Hosts (last 30 days, non-bot)

| # | Referrer Host | Sessions |
|---|--------------|----------|
| 1 | (direct/none) | 93 |
| 2 | www.bing.com | 82 |
| 3 | www.google.com | 61 |
| 4 | duckduckgo.com | 18 |
| 5 | uk.search.yahoo.com | 14 |
| 6 | chatgpt.com | 7 |
| 7 | www.dentalfinancepartners.co.uk | 5 |
| 8 | www.ecosia.org | 3 |
| 9 | copilot.microsoft.com | 3 |
| 10 | www.startpage.com | 2 |

**Reading notes:**

- **Bing (82) outperforms Google (61)** -- 28% vs 21% of sessions. This is the reverse of typical UK site profiles and matches the wider estate pattern noted in the SEO evaluation memory. Bing is a primary traffic source for this site; Bing CRO and GEO optimisation carry outsized value.
- **AI referrers are meaningful:** chatgpt.com (7) + copilot.microsoft.com (3) = 10 sessions = 3.4% of total. For a 291-session site, AI-answer-engine referral at 3%+ is notable and growing.
- **Self-referral (5 sessions from own domain)** suggests cross-page navigation is being miscounted as a referral in a small number of cases -- likely same-site links without proper referrer stripping. Not material but worth noting as a measurement artefact.
- Direct/none at 93 (32%) is the single largest channel, likely a mix of genuine direct, dark social, and email/newsletter traffic.


## Manager correction (2026-07-06)
The honeypot note above is wrong: honeypot flags are stored in the leads `extras` jsonb (`extras->>'honeypot'`), not a dedicated column. No schema gap exists; D-1's chokepoint store-flags honeypot rows there. The real pre-D-1 gap was the CLIENT-side silent drop, which never wrote a row at all (fixed in D-1).
