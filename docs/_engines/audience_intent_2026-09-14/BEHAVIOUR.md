# Estate visitor behaviour, 28 days to 2026-09-14

Source: Supabase `dhlxwmvmkrfnmcgjbntk`, tables `web_sessions` + `web_events`
(partitions `web_events_2026_08`, `web_events_default` for Sept). Bot gate =
`web_sessions.is_bot = false` AND `web_events.is_bot = false`. All country, days
in Europe/London. Raw pulls in `01_*.json` .. `16_*.json` with the SQL beside each.

## 1. Human sessions per site (28d)

| Site | sessions | /day | visitors | avg engaged s | avg scroll % | leads |
|---|---|---|---|---|---|---|
| property | 6,400 | 228.6 | 5,046 | 138 | 24 | 64 |
| solicitors | 2,350 | 83.9 | 1,858 | 95 | 27 | 2 |
| generalist | 1,741 | 62.2 | 1,479 | 91 | 20 | 8 |
| dentists | 564 | 20.1 | 428 | 94 | 25 | 2 |
| medical | 473 | 16.9 | 340 | 111 | 32 | 8 |
| charities | 287 | 10.3 | 254 | 62 | 43 | 1 |
| construction-cis | 281 | 10.0 | 231 | 65 | 23 | 2 |
| agency | 157 | 5.6 | 134 | 56 | 19 | 0 |
| contractors-ir35 | 109 | 3.9 | 80 | 118 | 29 | 4 |
| hospitality | 109 | 3.9 | 81 | 39 | 26 | 0 |
| pharmacies | 74 | 2.6 | 66 | 62 | 42 | 1 |
| care | 73 | 2.6 | 56 | 52 | 44 | 3 |
| ecommerce | 58 | 2.1 | 54 | 35 | 34 | 0 |
| startups-tech | 57 | 2.0 | 54 | 22 | 21 | 0 |
| crypto | 50 | 1.8 | 42 | 44 | 31 | 1 |
| **Estate** | **12,784** | **457** | **~10,200** | 114 | 25 | 96 |

Bot gate removed 17,638 of 30,422 sessions (58%). The "~300/day" figure in the
brief is low: humans run 457 sessions/day, ~365 distinct visitors/day.

## 2. Channel (28d, estate)

| Channel | sessions | /day | avg engaged s | leads | conv % |
|---|---|---|---|---|---|
| bing | 4,368 | 156.0 | 132 | 13 | 0.30 |
| google | 3,315 | 118.4 | 110 | 21 | 0.63 |
| direct | 3,163 | 113.0 | 55 | 27 | 0.85 |
| duckduckgo | 792 | 28.3 | 193 | 5 | 0.63 |
| other_search | 619 | 22.1 | 165 | 7 | 1.13 |
| referral | 306 | 10.9 | 149 | 9 | 2.94 |
| chatgpt | 103 | 3.7 | 109 | 14 | **13.59** |
| copilot | 80 | 2.9 | 205 | 0 | 0 |
| other_ai | 37 | 1.3 | 94 | 0 | 0 |

Per-site splits in `02_channel.json`.

## 3. Top 20 landing pages (28d)

| Site | Entry path | sessions | /day | pages/sess | eng s | bounce % | leads |
|---|---|---|---|---|---|---|---|
| property | /blog/capital-gains-tax/cgt-gifting-property-family-members-uk | 389 | 13.9 | 1.23 | 208 | 18.5 | 2 |
| property | /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide | 254 | 9.1 | 1.09 | 137 | 20.5 | 1 |
| property | /blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list | 228 | 8.1 | 1.17 | 207 | 18.0 | 2 |
| property | /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | 184 | 6.6 | 1.04 | 117 | 17.9 | 0 |
| solicitors | /blog/vat-compliance/vat-on-overseas-clients-uk-legal-services | 180 | 6.4 | 1.05 | 85 | 22.2 | 0 |
| property | /blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk | 178 | 6.4 | 1.11 | 209 | 18.5 | 5 |
| property | /blog/capital-gains-tax/tax-sell-rental-property-uk | 169 | 6.0 | 1.18 | 223 | 17.8 | 0 |
| property | / (homepage) | 156 | 5.6 | 1.81 | 75 | 37.8 | 18 |
| property | /blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk | 141 | 5.0 | 1.13 | 146 | 27.0 | 0 |
| property | /blog/capital-gains-tax/cgt-overseas-property-uk-residents-foreign-disposals | 139 | 5.0 | 1.09 | 231 | 12.2 | 1 |
| solicitors | /blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26 | 102 | 3.6 | 1.00 | 59 | 27.5 | 0 |
| property | /blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24 | 100 | 3.6 | 1.07 | 128 | 16.0 | 0 |
| solicitors | /blog/practice-accounting/how-much-do-uk-solicitors-charge-per-hour | 88 | 3.1 | 1.06 | 62 | 35.2 | 0 |
| property | /blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost | 87 | 3.1 | 1.10 | 140 | 25.3 | 3 |
| generalist | /blog/payroll-and-paye/p11d-benefits-in-kind-explained | 85 | 3.0 | 1.16 | 119 | 9.4 | 0 |
| solicitors | /blog/sra-accounts-rules/do-solicitors-keep-interest-on-client-accounts | 83 | 3.0 | 1.06 | 109 | 19.3 | 0 |
| property | /blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide | 82 | 2.9 | 1.21 | 96 | 29.3 | 0 |
| generalist | /blog/corporation-tax/capital-allowances-on-vans | 82 | 2.9 | 1.09 | 125 | 11.0 | 0 |
| solicitors | /solicitor-guides/legal-aid-billing-laa-ccms | 81 | 2.9 | 1.16 | — | — | — |

Full 40 rows in `03_landing.json`. Pages/session is ~1.1 almost everywhere: the
estate is a set of single-page answer destinations, not a browsed site.

## 4. Calculators (28d, by `props.calculator_slug`)

| Calculator | kind | site | view sess | run sess | runs | runs/sess | input changes |
|---|---|---|---|---|---|---|---|
| capital-gains-premium | premium | property | 856 | 135 | 2,133 | 15.8 | 10,118 |
| incorporation-premium | premium | property | 435 | 69 | 752 | 10.9 | 3,116 |
| section-24-premium | premium | property | 600 | 87 | 618 | 7.1 | 2,480 |
| landlord-essentials-premium | premium | property | 728 | 46 | 450 | 9.8 | 2,715 |
| associate-take-home | standard | dentists | 11 | 7 | 319 | 45.6 | 630 |
| capital-gains-tax-calculator | standard | property | 25 | 18 | 297 | 16.5 | 814 |
| dividend-tax-2026-27 | standard | generalist | 1 | 1 | 98 | 98.0 | 233 |
| sra-client-account-premium | premium | solicitors | 447 | 31 | 82 | 2.6 | 656 |
| llp-profit-tax-premium | premium | solicitors | 170 | 13 | 73 | 5.6 | 417 |
| practice-sale-premium | premium | solicitors | 75 | 13 | 67 | 5.2 | 463 |
| cgt-60-day-reporter | standard | generalist | 4 | 3 | 62 | 20.7 | 124 |
| p11d-bik-calculator | standard | generalist | 7 | 5 | 56 | 11.2 | 99 |
| director-pay-premium | premium | generalist | 32 | 4 | 51 | 12.8 | 1,057 |
| salaried-gp-vs-partner | premium | medical | 38 | 6 | 46 | 7.7 | 747 |

Estate totals 28d: 6,020 `calc_computed` across 581 sessions = **10.4 runs per
calculating session**, 27,647 input changes = **47 input edits per session**.
Rest of table in `04b_calculators.json`.

## 5. Offers, CTAs, gates

| Surface | offer kind | shown | clicked | dismissed | CTR % |
|---|---|---|---|---|---|
| assistant_nudge | (none) | 10,384 | 22 | 1,628 | 0.21 |
| sticky_cta | tool | 2,862 | 6 | 0 | 0.21 |
| sticky_cta | specialist | 2,083 | 4 | 2 | 0.19 |
| deep_scroll_modal | specialist | 1,482 | 24 | 1,131 | 1.62 |
| returning_bar | specialist | 1,148 | 2 | 24 | 0.17 |

Top CTA ids are refusals: `deep_scroll_close` 660 (property) + 232 (solicitors),
`result_gate_skip` 274 (property). `see_result` 300.

**Result gate:** 238 of property's 331 `form_error` events are
`form_id=calc_result_gate, field=message, error_kind=min_length` — the gate makes
the user write a free-text message before it shows the number. 418 property
sessions start a form, 182 hit an error, 65 submit (15.5% completion).

`resource_unlocked` fired **once** estate-wide in 28 days (medical); `gate_view`
38 times. `subscribe_view` 3,101 impressions, all generalist, 0 subscribe events
exist in the taxonomy.

## 6. Device, returning, timing

Device: desktop 8,669 (309/day), mobile 2,601 (93/day), tablet 446, null 1,068.
Mobile engages longer than desktop (133s vs 114s).

| Visitor sessions in 28d | visitors | sessions | avg engaged s | visitors who led |
|---|---|---|---|---|
| 1 | 8,609 | 8,609 | 107 | 47 |
| 2 | 1,114 | 2,228 | 242 | 23 |
| 3-5 | 419 | 1,452 | 433 | 19 |
| 6+ | 61 | 495 | 1,173 | 4 |

Returning share: 1,594 of 10,203 visitors (15.6%) came back; they are 32.6% of
sessions and 48% of converting visitors.

Timing (Europe/London): weekday office hours dominate. Peak 10:00-16:00 Tue-Thu
(~180-260 sessions/hour-slot per weekday over 4 weeks). Saturday is ~40% of a
weekday; Sunday ~45%. Evening 18:00-22:00 holds a steady second shelf.

## 7. Cohorts (28d totals, per day)

| Cohort | definition | sessions | /day | % of humans |
|---|---|---|---|---|
| Calculator power users | >=2 runs or >=2 distinct calculators in a session | 513 | 18.3 | 4.0% |
| Deep readers | >=3 page views or >=180s engaged | 2,576 | 92.0 | 20.1% |
| Returning visitors | visitor with >=2 sessions in window | 4,175 sess | 149 | 32.6% |
| Form-starters who abandoned | form_start, no submit, no lead | 518 | 18.5 | 4.1% |
| One-and-done | 1 page view and <10s engaged | 4,112 | 146.9 | 32.2% |
| Leads | lead_id present | 96 | 3.4 | 0.75% |

Where they concentrate (top entry paths, `11_cohort_pages.json`):
- Power users: property incorporation + CGT-disposal pages
  (`how-to-transfer-property-into-limited-company-uk` 36, `tax-sell-rental-property-uk`
  36, `cgt-gifting-property-family-members-uk` 26, `landlord-tax-deductions-2026` 19).
- Deep readers: `cgt-gifting-property-family-members-uk` 148,
  `landlord-tax-deductions-2026` 72, `how-to-transfer-property-into-limited-company-uk` 74,
  `sa105-property-income-form-2026` 59, `cgt-overseas-property` 50.
- Form abandoners: same property incorporation/CGT set, 30-37 per page.

## 8. 90-day trend (weeks, Mon-start, Europe/London)

| Week | sessions | /day | visitors | eng s | leads | google | bing | direct | chatgpt | property |
|---|---|---|---|---|---|---|---|---|---|---|
| 06-15 | 957 | 137 | 760 | 123 | 9 | 111 | 401 | 256 | 17 | 573 |
| 06-22 | 1,487 | 212 | 1,244 | 99 | 7 | 317 | 604 | 307 | 22 | 845 |
| 06-29 | 1,625 | 232 | 1,380 | 98 | 13 | 430 | 585 | 324 | 17 | 886 |
| 07-06 | 2,042 | 292 | 1,727 | 92 | 12 | 676 | 679 | 412 | 16 | 1,178 |
| 07-13 | 2,507 | 358 | 2,155 | 93 | 21 | 963 | 808 | 409 | 17 | 1,208 |
| 07-20 | 2,375 | 339 | 1,908 | 114 | 22 | 668 | 877 | 492 | 12 | 1,328 |
| 07-27 | 2,351 | 336 | 1,934 | 114 | 23 | 525 | 845 | 587 | 20 | 1,371 |
| 08-03 | 3,260 | 466 | 2,713 | 107 | 22 | 1,216 | 984 | 623 | 20 | 1,453 |
| 08-10 | 2,564 | 366 | 2,047 | 129 | 28 | 541 | 1,039 | 558 | 18 | 1,373 |
| 08-17 | 2,805 | 401 | 2,298 | 119 | 23 | 732 | 1,017 | 633 | 37 | 1,459 |
| 08-24 | 3,579 | 511 | 2,921 | 99 | 30 | 857 | 1,067 | 1,141 | 25 | 1,788 |
| 08-31 | 2,948 | 421 | 2,398 | 120 | 17 | 789 | 1,000 | 688 | 24 | 1,503 |
| 09-07 | 3,336 | 477 | 2,726 | 121 | 30 | 918 | 1,227 | 662 | 22 | 1,627 |
| 09-14* | 418 | 60 | 361 | 101 | 0 | 95 | 174 | 99 | 2 | 179 |

\* part week (Sunday only). Traffic roughly tripled since mid-June; leads
tripled with it; engaged time flat. Calculator runs grew 460/wk to ~1,440/wk and
have been flat since late July, so calculator use is saturating against the
existing tool set, not growing with traffic.

## 9. Gaps (absence of data, not findings)

- **No download, print or PDF event exists** in the taxonomy. Whether anyone tries
  to save a calculator result is unmeasured.
- **No internal-search or FAQ-interaction event** exists.
- **Outbound clicks are barely instrumented**: 85 events in 28 days, only gov.uk
  (44) and legislation.gov.uk (36). No software-vendor links seen. Cannot tell
  whether outbound is genuinely rare or only rare on the pages that tag it.
- **Session-level channel only.** `referrer_host` is the session's first referrer;
  paid/organic split within Google is not recorded and utm_* is almost all null.
- **1,068 sessions have `device_type` null** (8.4%), so the device split is a
  lower bound on each named class.
- **`subscribe_view` has no matching acceptance event** — impressions are
  countable, subscribes are not.
- Pre-2026-08-23 figures in section 8 include the passive_session backfill, so
  they are comparable with today; older reports are not.
