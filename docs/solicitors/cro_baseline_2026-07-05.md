# Solicitors CRO Baseline -- 2026-07-05

**Site:** www.accountsforlawyers.co.uk (site_key = `solicitors`)
**Date captured:** 2026-07-05
**Purpose:** Pre-S-1 baseline; compare 7d/28d post-deploy reads against this.
**Method:** Read-only SQL via Supabase Management API (project `dhlxwmvmkrfnmcgjbntk`); non-bot, non-embed sessions only throughout.

---

## 1. Session and Visitor Volumes

| Window | Sessions | Distinct Visitors |
|--------|----------|-------------------|
| Last 30 days | 932 | 706 |
| Last 7 days | 331 | 271 |

7d/30d session ratio = 35.5%, visitor ratio = 38.4%. Both ratios are slightly above the expected 25% weekly share, suggesting a modest uptick in the most recent week.

---

## 2. Event Counts (30 days, non-bot)

| Event | Count |
|-------|-------|
| engagement_time | 5,419 |
| web_vital | 3,278 |
| section_view | 2,752 |
| scroll_depth | 1,124 |
| page_view | 956 |
| element_click | 141 |
| calc_input_change | 91 |
| rage_click | 29 |
| calc_computed | 25 |
| client_error | 18 |
| form_field_focus | 17 |
| calc_view | 9 |
| calc_result_viewed | 6 |
| cta_click | 5 |
| form_field_abandon | 4 |
| form_start | 4 |
| outbound_click | 1 |
| lead_submitted | 1 |
| form_submit | 1 |

**Form funnel (30d):** form_view = 0 (event not present), form_start = 4, form_submit = 1.
Start-to-submit rate = 25% (1/4). No `form_view` event is emitted, so the top of the funnel is invisible.

---

## 3. Leads by Month (source = 'solicitors', last 90 days)

| Month | Total Leads | Honeypot Leads |
|-------|-------------|----------------|
| 2026-07 | 1 | 0 |
| 2026-05 | 1 | 0 |

June 2026 = 0 leads. Two real leads in 90 days, zero honeypot flags. Monthly volume is very low (sub-1/month run rate excluding July partial).

---

## 4. Top 15 Entry Paths by Sessions (30 days, non-bot)

| # | Path | Sessions |
|---|------|----------|
| 1 | /blog/vat-compliance/vat-on-overseas-clients-uk-legal-services | 69 |
| 2 | /blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour | 44 |
| 3 | /blog/sra-accounts-rules/handling-client-money-interest-sra-rules | 38 |
| 4 | /blog/sra-compliance-trust-accounting/sra-accounts-rules-compliance-guide | 38 |
| 5 | /blog/sra-accounts-rules/office-account-vs-client-account-differences | 29 |
| 6 | /blog/sra-accounts-rules/handling-client-disbursements-properly-uk | 25 |
| 7 | /blog/vat-compliance/disbursements-vat-treatment-uk-law-firms | 24 |
| 8 | /blog/fee-earner-tax-compensation/newly-qualified-solicitor-salary-uk-2025-26 | 23 |
| 9 | /blog/practice-accounting/wip-valuation-method-uk-law-firms | 22 |
| 10 | /blog/vat-compliance/counsel-fees-vat-guide-uk-law-firms | 22 |
| 11 | /blog/vat-compliance/do-uk-solicitors-charge-vat | 19 |
| 12 | /blog/firm-acquisition-merger/sra-consent-on-firm-acquisition | 19 |
| 13 | / (homepage) | 19 |
| 14 | /blog/practice-accounting/how-to-set-fee-earner-targets-uk-law-firms | 19 |
| 15 | /blog/sra-accounts-rules/what-counts-as-client-money-uk-solicitors | 18 |

The homepage ranks 13th by entry sessions. Blog content drives 93% of entries. The top entry page (VAT on overseas clients) generates 7.4% of all sessions alone.

---

## 5. Device Split (30 days, non-bot)

| Device | Sessions | % |
|--------|----------|---|
| Desktop | 713 | 76.5% |
| Mobile | 115 | 12.3% |
| Unknown | 74 | 7.9% |
| Tablet | 30 | 3.2% |

Desktop dominates heavily (76.5%). The 7.9% unknown device share is slightly elevated; likely sessions where UA parsing returned no device type. Mobile at 12.3% is low versus typical B2C sites, consistent with a professional/B2B audience visiting on work machines.

---

## 6. Top 10 Referrer Hosts (30 days, non-bot, non-null)

| # | Referrer Host | Sessions |
|---|---------------|----------|
| 1 | www.bing.com | 349 |
| 2 | www.google.com | 155 |
| 3 | duckduckgo.com | 38 |
| 4 | uk.search.yahoo.com | 22 |
| 5 | bing.com | 15 |
| 6 | www.ecosia.org | 12 |
| 7 | statics.teams.cdn.office.net | 12 |
| 8 | chatgpt.com | 11 |
| 9 | www.accountsforlawyers.co.uk | 9 |
| 10 | copilot.microsoft.com | 4 |

Bing (combining www.bing.com + bing.com) = 364 sessions (64.5% of referred traffic). Google = 155 (27.5%). Bing massively outperforms Google as a referral channel on this site. AI answer engines (ChatGPT = 11, Copilot = 4) together contribute 15 sessions, a small but non-zero GEO signal. Microsoft Teams (statics.teams.cdn.office.net = 12) indicates content being shared inside enterprise Teams chats, consistent with a professional/legal audience.

---

## Reading Notes

1. **Form_view event absent.** The funnel has no top-of-funnel visibility event. Only `form_start` (4) and `form_submit` (1) are present. After S-1 ships, check whether `form_view` fires; its absence makes start-rate vs. impression-rate impossible to calculate right now.

2. **Extremely low lead volume.** 2 leads in 90 days from 932 sessions (30d) implies a conversion rate well under 0.2%. This is the primary CRO gap the S-1 release addresses.

3. **No form_view, 0 rage_click on form.** The 29 rage_click events are likely on non-form elements. Worth segmenting by page_path post-deploy to confirm they are not on the lead form.

4. **June 2026 = 0 leads.** A full calendar month with 0 leads in the leads table. Combined with the honeypot bug documented elsewhere in the estate (memory: `property_leadform_honeypot_silent_drop`), this is consistent with the shared LeadForm component silently dropping autofill-triggered submits. This is a pre-existing known issue, not caused by S-1.

5. **Bing concentration risk.** 64.5% of attributed referrals come from Bing. Google under-indexes relative to expected traffic mix. This may partly reflect Bing's stronger ranking for legal/professional queries, but warrants monitoring post-S-1 to ensure Google organic is not suppressed.

6. **High desktop share (76.5%).** CRO changes should be designed and QA'd desktop-first, but mobile (12.3%) should be verified separately given its distinct UX constraints.

7. **Self-referrals from accountsforlawyers.co.uk (9 sessions).** Expected for multi-page journeys that lose the original referrer on internal navigation; not a data quality concern.

8. **Unknown device (7.9% of sessions).** If UA detection improves post-deploy, this bucket should shrink. Do not treat changes in this bucket as a real device-mix shift.
