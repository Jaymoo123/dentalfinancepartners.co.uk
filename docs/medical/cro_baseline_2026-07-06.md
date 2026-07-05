# Medical Accounts CRO Baseline -- 2026-07-06

**Site:** www.medicalaccounts.co.uk (site_key / source = `medical`)
**Date captured:** 2026-07-06
**Purpose:** Pre-release "before" reference for estate CRO parity program release M-1. All figures are read-only SQL snapshots from the Supabase production database (project `dhlxwmvmkrfnmcgjbntk`). No data has been altered.

---

## 1. Traffic volume -- non-bot, non-embed sessions

| Window | Sessions | Distinct visitors |
|--------|----------|------------------|
| Last 30 days | 238 | 205 |
| Last 7 days | 104 | 93 |

**Reading notes:**
- 7-day sessions (104) are 44% of the 30-day total (238), suggesting a recent acceleration rather than a flat run-rate. The 30-day baseline will understate current weekly pace.
- 238 sessions/30d is very small relative to Property (thousands/month). Conversion arithmetic is noisy at this scale.
- 38% of sessions come from outside GB (see Section 6), which inflates session count without contributing to UK leads.

---

## 2. Event breakdown -- last 30 days (top 40, non-bot)

| # | Event name | Count |
|---|-----------|-------|
| 1 | engagement_time | 1,304 |
| 2 | web_vital | 790 |
| 3 | section_view | 717 |
| 4 | scroll_depth | 346 |
| 5 | page_view | 270 |
| 6 | element_click | 62 |
| 7 | form_field_focus | 26 |
| 8 | calc_input_change | 13 |
| 9 | form_field_abandon | 6 |
| 10 | form_start | 5 |
| 11 | lead_submitted | 5 |
| 12 | client_error | 5 |
| 13 | form_submit | 5 |
| 14 | cta_click | 3 |
| 15 | calc_result_viewed | 1 |
| 16 | rage_click | 1 |
| 17 | calc_view | 1 |

**Reading notes:**
- 18 distinct event types recorded; no dead-letter or unknown events.
- `engagement_time` (1,304) vs `page_view` (270) implies ~4.8 engagement pings per page view, indicating real dwell time on content pages.
- `calc_input_change` (13) with `calc_computed` (5) and `calc_view` (1) shows calculator usage is minimal. The calc widget is present but not driving funnel events.
- `client_error` (5 events) warrants investigation: these may indicate a JS error affecting some visitors. Cross-check with `rage_click` (1) -- low rage-click count is not concerning at this volume.
- `cta_click` (3) is conspicuously low versus `element_click` (62), suggesting most clicks are on non-CTA elements (navigation, internal links).

---

## 3. Form conversion funnel -- last 30 days

| Stage | Event count | Distinct sessions |
|-------|-------------|-------------------|
| cta_click | 3 | 3 |
| form_start | 5 | 5 |
| form_field_focus | 26 | 5 |
| form_field_abandon | 6 | 4 |
| form_submit | 5 | 5 |
| lead_submitted | 5 | 5 |

**Derived metrics (sessions basis):**

| Metric | Value |
|--------|-------|
| Sessions with form_start | 5 / 238 = 2.1% |
| form_start to form_submit | 5 / 5 = 100% |
| form_submit to lead_submitted | 5 / 5 = 100% |
| Overall session-to-lead rate | 5 / 238 = 2.1% |

**Reading notes:**
- Zero drop-off between form_start, form_submit, and lead_submitted: all 5 sessions that opened the form completed it with a successful server-side insert. This is consistent with the honeypot fix being already effective (or the site attracting a self-selecting audience who came specifically to contact).
- `form_start` (5) exceeds `cta_click` (3), meaning 2 sessions reached the form without triggering a tracked CTA click. Likely direct navigation to `/contact`.
- All 7 leads in the 90-day window came from `/contact` (see Section 3a below). No in-blog or calculator-embedded leads yet.
- At 2.1% session-to-lead, this aligns with the ~1.7% figure noted in the brief; sample is too small for statistical interpretation but the direction is consistent.

### 3a. Leads by month -- last 90 days

| Month | Total leads | Honeypot-flagged |
|-------|-------------|-----------------|
| 2026-04 | 2 | 0 |
| 2026-06 | 1 | 0 |
| 2026-07 | 4 | 0 |

**30-day leads total (2026-06-06 to 2026-07-05): 5** (4 in July + the 2026-06-16 lead).
No honeypot-flagged submissions in the 90-day window.

**Reading notes:**
- July 2026 is showing 4 leads in just 5 days (to 2026-07-05), versus 1 in all of June. A possible organic ranking uptick or a returning visitor cluster. The 7-day session spike (104 vs 30d average of ~34/wk) supports this.
- May 2026 had zero leads in this table (not visible in the 90-day window). Either no leads were submitted, or they predate the tracking system going live.

---

## 4. Top 15 entry paths -- last 30 days (non-bot, non-embed)

| # | Entry path | Sessions |
|---|-----------|---------|
| 1 | /blog/gp-partner-vs-salaried-gp-tax-comparison | 25 |
| 2 | /blog/gp-partnership-tax-complete-guide | 21 |
| 3 | / (homepage) | 18 |
| 4 | /blog/becoming-gp-partner-financial-implications | 16 |
| 5 | /blog/nhs-pension-for-locums-form-a-form-b | 15 |
| 6 | /blog/gp-tax-deductions-complete-list-2026 | 13 |
| 7 | /blog/gp-pension-contributions-tax-relief | 11 |
| 8 | /blog/nhs-pension-annual-allowance-complete-guide | 10 |
| 9 | /blog/gp-vat-registration | 7 |
| 10 | /blog/buying-into-gp-partnership-capital-parity-explained | 6 |
| 11 | /blog/qof-income-gp-practice-accounting-explained | 6 |
| 12 | /blog/gp-practice-income-pcse-statement-reconciliation | 5 |
| 13 | /blog/medical-expenses | 5 |
| 14 | /medical-guides/ir35-for-locums | 4 |
| 15 | /blog/private-practice-tax-nhs-and-private-income | 4 |

**Reading notes:**
- Blog content dominates entry; only 18 of 238 sessions (7.6%) enter via the homepage.
- GP-partner and NHS-pension topics account for the top cluster (posts 1, 2, 4, 7, 8 = 78 sessions, 33% of all traffic). These are high-intent GP-specific searches.
- No `/for-*` specialist landing pages appear in the top 15, suggesting these are not yet indexed or are receiving minimal search traffic.
- `/medical-guides/ir35-for-locums` (position 14) is the only guide-format page in the list, confirming blog is the primary SEO surface.
- None of the top entry paths is a calculator or tool page.

---

## 5. Device split -- last 30 days (non-bot, non-embed)

| Device type | Sessions | Distinct visitors | % sessions |
|-------------|----------|------------------|-----------|
| Desktop | 187 | 168 | 78.6% |
| Mobile | 27 | 24 | 11.3% |
| Tablet | 13 | 13 | 5.5% |
| Unknown / null | 11 | 8 | 4.6% |

**Reading notes:**
- Desktop dominance (79%) is significantly higher than the typical UK consumer site (~55-60% desktop). This is consistent with a professional GP / medical practitioner audience using work computers.
- Mobile is unusually low (11%). This is important for CRO parity: mobile-first design assumptions from the generalist estate may not apply here.
- The form funnel happens almost exclusively on desktop given the traffic split. Mobile CRO is low-priority until traffic mix shifts.

---

## 6. Top 10 referrer hosts -- last 30 days (non-bot, non-embed)

| # | Referrer host | Sessions |
|---|--------------|---------|
| 1 | (direct / none) | 110 |
| 2 | www.bing.com | 71 |
| 3 | www.google.com | 20 |
| 4 | www.medicalaccounts.co.uk | 10 |
| 5 | bing.com | 8 |
| 6 | duckduckgo.com | 6 |
| 7 | uk.search.yahoo.com | 3 |
| 8 | chatgpt.com | 3 |
| 9 | www.ecosia.org | 2 |
| 10 | copilot.microsoft.com | 1 |

**Reading notes:**
- Bing (www.bing.com + bing.com combined) = 79 sessions (33%), Google = 20 sessions (8%). Bing is the dominant search engine for this site at this stage of maturity, consistent with findings from the broader Property SEO evaluation (Bing giving real clicks at brand-new sites earlier than Google).
- Direct / none (110 sessions, 46%) is high. Some of this is likely dark-social or dark-search (AI engine referrals not passing referrer header), and some may be direct URL entry by returning or referred visitors. Worth monitoring as the site matures.
- `chatgpt.com` (3) and `copilot.microsoft.com` (1) confirm AI-search referrals are already occurring. GEO optimisation is relevant.
- Internal self-referral (`www.medicalaccounts.co.uk`, 10 sessions) suggests multi-page browsing is being double-counted as a referral due to session boundary resets. Not a concern for baseline purposes.

---

## 7. Geography -- last 30 days (non-bot, non-embed, top 10)

| Country | Sessions | % of total |
|---------|----------|-----------|
| GB | 135 | 56.7% |
| US | 90 | 37.8% |
| IN | 3 | 1.3% |
| CN | 3 | 1.3% |
| BR | 2 | 0.8% |
| SG | 2 | 0.8% |
| FR | 1 | 0.4% |
| NO | 1 | 0.4% |
| CA | 1 | 0.4% |

**Reading notes:**
- US traffic (90 sessions, 38%) is anomalously high for a UK-only professional services site. At Property, non-GB traffic is a known bot-filter gap (mainly synthetic viewport=800 crawlers). The same pattern likely applies here: the bot filter is allowing a proportion of US-origin synthetic or curiosity traffic through.
- GB-only session-to-lead rate is higher than the blended 2.1%: all 5 leads in 30d are UK contacts, so the true UK conversion rate is approximately 5/135 = 3.7%.
- This US bloat effect should be factored into any traffic trend reading: a rise in sessions without a corresponding UK-only rise is not a meaningful signal.

---

## Summary of anomalies and watch items

1. **US traffic bloat (38%)** -- bot-filter not catching US synthetic/curiosity crawlers; blended metrics overstate usable audience. UK-adjusted conversion is ~3.7%, not 2.1%.
2. **July 2026 acceleration** -- 4 leads in 5 days vs 1 in all of June; 7-day sessions (104) well above run-rate. Could be a ranking event or short-term spike. Monitor for 2 more weeks before treating as a baseline shift.
3. **All leads via /contact only** -- zero in-blog or widget-generated leads. CRO parity improvements (result_gate, inline CTA, mini-capture) should materially lift this if the blog entry traffic (92% of sessions) has any conversion intent.
4. **Desktop-heavy audience (79%)** -- mobile CRO is not the priority; desktop form experience and content trust signals are.
5. **client_error events (5)** -- 5 JS errors recorded in 30 days. Unknown severity; may affect a small number of sessions. Investigate before M-1 ships to ensure any fix does not conflate with CRO impact.
6. **Calculator engagement minimal** -- calc_view (1), calc_computed (5), calc_result_viewed (1) despite calc_input_change (13). Suggests calculators are present but either not prominent or not yet indexed. Not a CRO blocker at this traffic level.
7. **No honeypot submissions** -- clean signal; the honeypot-flagged lead bug (estate-wide, documented separately) has not silently killed any medical leads that we can detect from extras flags. However, the honeypot `company_url` field may still auto-fill and silently drop real submits without setting a flag. This is a live estate-wide risk item (not yet fixed as of 2026-07-06).
