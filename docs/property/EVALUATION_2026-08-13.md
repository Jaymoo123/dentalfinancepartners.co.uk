# Property — full refresh + evaluation, 2026-08-13

Reproducible instruments, no new tooling. Sources:

- `scripts/property_commercial_baseline.py` → `out/property_baseline_2026-08-13.json` (diffed against `out/property_baseline_2026-08-05.json`)
- `scripts/_traffic_eval.py` (web_sessions vs GSC vs GA4 vs leads triangulation)
- Supabase views: `vw_lead_contactability_funnel`, `vw_lead_nurture_health`, `vw_lead_nurture_step_health`, `vw_web_funnel_daily_v2`, `vw_cta_performance`, `vw_form_field_dropoff`, `vw_calculator_conversion`
- GSC page + query dimension pulls (OAuth, `agents/utils/gsc_client_oauth.py`)

Traps respected: GSC totals from the date-dimension aggregate (never summed query rows); Bing totals from `GetRankAndTrafficStats` only (the per-page `GetPageStats` set sums to 101,141 against a real 160,990, the known 36% shortfall); sessions exclude `is_bot` and `is_embed`.

---

## 1. Headline

Volume is still climbing and lead flow is at a record. The site now converts at roughly 1.1% of sessions and produces about 2.7 leads a day. The commercial-capture gap is unchanged in substance: the site still earns almost no clicks on money terms, and it has now won its first, at 2 clicks on `property accountant leeds`.

The one number that looks like bad news is not. Average Google position moved from 8.8 to 15.0. That is entirely new deep-position surface arriving, not existing pages falling.

---

## 2. Search volume

### Google (GSC, site totals)

| Month | Impressions | Clicks | CTR |
|---|---|---|---|
| 2026-04 | 11,521 | 11 | 0.10% |
| 2026-05 | 26,747 | 74 | 0.28% |
| 2026-06 | 55,335 | 318 | 0.58% |
| 2026-07 | 77,466 | 811 | 1.05% |
| 2026-08 (1-13) | 35,304 | 346 | 0.98% |

August run-rate ≈ 84k impressions / 825 clicks. Still growing, CTR holding just under 1%.

### Bing

| Month | Impressions | Clicks | CTR |
|---|---|---|---|
| 2026-05 | 15,543 | 396 | 2.55% |
| 2026-06 | 51,966 | 1,280 | 2.46% |
| 2026-07 | 67,141 | 1,692 | 2.52% |
| 2026-08 (1-13) | 26,340 | 730 | 2.77% |

Bing CTR is now 2.8x Google's and rising. 87-day total: 160,990 impressions / 4,098 clicks / 2.545%.

### Coverage (90d, 08-05 → 08-13)

| Metric | 08-05 | 08-13 |
|---|---|---|
| Pages with impressions | 870 | 936 |
| Pages over 100 impressions | 252 | 276 |
| Pages over 1,000 impressions | 28 | 32 |

### The position "drop" explained

Two matched 21-day windows, page dimension:

| Window | Pages | Impressions | Weighted position | Impressions at pos >30 |
|---|---|---|---|---|
| 06-25 → 07-15 | 684 | 51,553 | 8.8 | 841 (1.6%) |
| 07-24 → 08-13 | 584 | 65,437 | 15.0 | 6,548 (10.0%) |

Deep-position impressions grew 7.8x while total impressions grew 27%. The new deep surface is:

- calculators: `/calculators/first-time-buyer-stamp-duty-calculator` 1,311 impr at pos 81.1, `/calculators/commercial-mortgage-calculator` 833 at 62.9, `/calculators/rental-yield-calculator` 308 at 76.4, `/calculators/buy-to-let-cashflow-calculator` 216 at 76.5, `/calculators/buy-to-let-mortgage-calculator` 187 at 85.4
- the property-finance cluster: `buy-to-let-mortgage-rates` 531 at 69.6, `bridging-loan-rates` 415 at 46.6, `commercial-mortgage-rates` 272 at 49.6, `commercial-mortgages-guide` 173 at 65.0
- the new money tier: `/services/landlord-accountant` 150 at 66.9, `/landlord-tax` 132 at 73.8, `/services/property-tax-advice` 92 at 75.5

No established page lost ground. The average moved because ~6,500 impressions arrived at positions 45-85.

---

## 3. Traffic and channel

First-party `web_sessions`, human only, bot and embed excluded:

| Window | Human sessions | Visitors |
|---|---|---|
| W0 last 7d | 1,626 | 1,244 |
| W1 prior 7d | 1,631 | 1,223 |
| W2 wk 2-3 | 1,606 | 1,218 |
| W3 wk 3-4 | 1,299 | 1,008 |

Flat for three weeks after a step up from four weeks ago. Bot share runs 43-75% daily, tagged not blocked.

Referrer (visitors, W0 vs W1): bing 491/454, direct 337/359, google 280/279, duckduckgo 98/95, yahoo 65/72, copilot 12/8, ecosia 10/5, chatgpt 9/7, gemini 8/1. GB is 986 of 1,244.

**Bing still delivers more visitors than Google, and more of them.** That has not changed since the 08-05 read.

**GA4 disagrees and GA4 is wrong.** GA4 reports W0 as Direct 299 / Organic Search 56, against first-party's 337 direct / 674 organic-other / 294 organic-google. GA4 is collapsing most organic into Direct. First-party remains the system of record; do not quote GA4 channel splits.

---

## 4. Lead flow

### Volume

| Month | Leads |
|---|---|
| 2026-04 | 2 |
| 2026-05 | 8 |
| 2026-06 | 34 |
| 2026-07 | 62 |
| 2026-08 (1-13) | 35 |

All-time 141 (was 116 at 08-05). August run-rate ≈ 83/month, a record. Last 7d 22, prior 7d 17, the 14d before that 30.

### Conversion

30d, all countries: 6,473 sessions → 4,201 engaged (65%) → 475 form-CTA sessions (7.3%) → 457 form starts (96% of CTA clicks) → 72 converted. **1.11% session-to-lead.** GB last 7d: 16/1,376 = 1.16%.

The leak is at the top, not the bottom. Only 7.3% of sessions ever click a form CTA; of those who do, 96% start the form and 16% finish it.

### Where leads come from

Entry page type: blog 65, homepage 36, other 18, locations 2, services 1, calculator 1.

Entry path: `/` 36 leads, `how-to-transfer-property-into-limited-company-uk` 9, `/about` 8, `/contact` 7, `/locations` 3.

**The homepage is the single best converting entry page and it earns 15 Google impressions in 9 days.** Those leads arrive on brand, direct and Bing. It is frozen as a ranking target by design; it is not frozen as a converter.

Lead referrer, August MTD: google 9, bing 8, internal 5, direct 5, chatgpt 2, ecosia 2, duckduckgo 2, yahoo 2. July was bing 16 / google 11 / direct 16.

Per-session conversion by channel over 30d is stark: chatgpt.com 35 sessions → 2 leads (~6%), against bing 2,231 sessions → 8 leads (0.36%). GEO keeps out-converting everything by an order of magnitude on tiny volume.

### Nurture and contactability

Enrolled cohort (`vw_lead_contactability_funnel`, property):

submitted 101 → verified 92 → messaged 101 → responded 66 → **contactable 62** → unreachable 16 → forwarded 0

**61% contactability against the 33% (3 of 9) baseline the system was built to fix.** By cohort month: July 42/63 = 67%, August 22/36 = 61% with 11 still in flight.

Reply speed: 56 of 84 recorded replies land inside 8 hours.

Engine health: cron alive (last tick 09:00 today), 0 stuck leads, 0 complaints, 0 recorded bounces, 2 opt-outs in 7d, 21 sends in 24h (16 sent, 5 skipped, 0 failed).

Cumulative step failures, `property_contactability`: step 1 (instant SMS) 77 sent / 12 failed; step 3 17/5; step 5 11/5. 22 failures total, consistent with non-UK and invalid numbers hitting permanent Twilio errors, which now advance rather than retry.

`forwarded` reads 0 by design: nothing links to the operator confirm route, so the funnel's last stage is manual.

---

## 5. Commercial capture

Intent buckets, 90d query sample (patched classifier):

| Bucket | Queries | Impressions | Clicks | CTR | Avg pos |
|---|---|---|---|---|---|
| informational | 3,616 | 18,628 | 60 | 0.32% | 41.8 |
| form/HMRC lookup | 836 | 11,564 | 12 | 0.10% | 9.8 |
| commercial | 436 | 6,720 | 6 | 0.09% | 26.3 |

The form/HMRC bucket has doubled (5,336 → 11,564 impressions) and sits at position 9.8 with a 0.10% CTR. That is the unwinnable slice: people searching `sa105 notes` want gov.uk. It is now the second largest bucket and it is dragging site-wide CTR down while contributing nothing.

### First commercial click

`property accountant leeds` — 2 clicks, 6 impressions, position 8.3 (28d). The first commercial query the site has ever converted to a click.

Everything else on the money terms is still zero:

| Query | Impr | Pos | Clicks |
|---|---|---|---|
| property accountant | 270 | 24.5 | 0 |
| landlord tax advice leeds | 101 | 12.3 | 0 |
| rental accountant leeds | 93 | 8.7 | 0 |
| property accountant manchester | 90 | 9.3 | 0 |
| property accountant specialist | 88 | 19.4 | 0 |
| property accountants leeds | 64 | 15.2 | 0 |
| property accountant birmingham | 42 | 10.8 | 0 |
| landlord accountant bristol | 25 | 9.0 | 0 |

The local cluster is sitting at positions 8-15 with real impressions and no clicks. That is the closest thing to a winnable commercial position the site has.

### The 08-05 money tier, 9 days in

| Route | Impr | Clicks | Pos |
|---|---|---|---|
| /locations/birmingham | 206 | 1 | 20.2 |
| /services/landlord-accountant | 150 | 0 | 66.9 |
| /landlord-tax | 132 | 0 | 73.8 |
| /locations/leeds | 127 | 2 | 17.5 |
| /section-24 | 125 | 2 | 17.8 |
| /services/property-tax-advice | 92 | 0 | 75.5 |
| /making-tax-digital-landlords | 19 | 0 | 28.7 |
| /property-tax-rates | 24 | 0 | 13.2 |
| /services/non-resident-landlord | 5 | 0 | 34.8 |
| /services/property-accountant | 4 | 0 | 26.0 |

All ten routes are indexed and earning impressions. The `/locations/*` pages and `/section-24` are the only ones producing clicks. The `/services/*` pages and `/landlord-tax` are parked at positions 66-76, which is where a brand-new page with no external signal sits.

---

## 6. CRO findings

From `vw_cta_performance` and `vw_form_field_dropoff` (all-time, GB where sliced).

**What works**

| CTA | Clicks | Click→form | Leads |
|---|---|---|---|
| assistant_call | 27 | 84% | 16 |
| assistant_question | 36 | 73% | 18 |
| hero_book | 11 | 100% | 7 |
| header_book | 45 | 63% | 15 |
| specialist_widget | 206 | 30% | 23 |

The on-site assistant surfaces convert better than anything else on the site, on tiny exposure.

**What leaks**

- `result_gate_skip`: 370 clicks, 221 form starts, **2 leads**. The skip path collects intent and drops it.
- `deep_scroll_close`: 499 dismissals against 10 clicks on `deep_scroll_modal`. The deep-scroll modal is dismissed 50 times for every engagement.
- `calc_result_gate` message field: 390 focuses, **340 errors**, 147 abandons (37.7%). Validation is firing on almost every attempt. Likely the minimum-length rule on a field people treat as optional.
- `lead_form` prompted field: 25.7% abandon, the worst of the three required composer prompts.
- `specialist_widget` email field: **34 focuses, 34 abandons, abandon rate 1.00**. Either genuine total friction or the abandon event fires on every blur. Needs a five-minute check before it is treated as a finding.

**Calculators**

The premium calculators get volume and convert poorly: landlord-essentials 1,191 views → 93 computed (7.8%) → 9 leads; capital-gains 1,028 → 195 (19.0%) → 10; section-24 920 → 186 (20.2%) → 5; incorporation 853 → 145 (17.0%) → **16 leads (11.0% of computes)**. Incorporation is the outlier worth studying; section-24 converts computes at a quarter of incorporation's rate.

---

## 7. Config and deploy state

- **DJH is gone from the model.** Commit `4107b377` retired the restore path; the site now runs the pool/partner-network shape. Memory describing `PARTNER_DISCLOSURE_PAUSED` and DJH forwarding is stale and has been corrected.
- Live consent text reads "a firm from our specialist partner network". Repo HEAD reads "a relevant regulated firm from our specialist partner network" (`924a60d5`). One undeployed copy delta.
- `LEAD_RESEND_WEBHOOK_SECRET` still unset: `opened`, `clicked`, `bounces` and `complaints` all read 0 across every site. **The deliverability guardrail is blind.** This is the single highest-value open item, and it is self-serviceable via the existing Resend API key.
- Reconcile cron dry-run, autopause alert-only, retention purge dormant. All deliberate.
- Current branch `expansion/new-sites-2026-08`; the lead-engine claim-race work is built but not deployed.

---

## 8. Where that leaves us

**Working**: volume compounding on both engines; lead flow at a record and accelerating; contactability nearly doubled against the baseline it was built to fix; the engine is quiet and healthy.

**Not working**: commercial capture is still effectively zero at 6 clicks on 6,720 impressions; the form/HMRC bucket has doubled into 11,564 unwinnable impressions at position 9.8; only 7.3% of sessions ever touch a form CTA.

**The three cheapest moves, in order:**

1. Set `LEAD_RESEND_WEBHOOK_SECRET`. One env var and a redeploy buys back all email engagement and deliverability visibility.
2. Work the local cluster. Eight commercial queries sit at positions 8-15 with 500+ combined impressions and one click between them. These are the only commercial positions the site holds, and `/locations/leeds` and `/locations/birmingham` are already the best-performing new pages.
3. Fix `result_gate_skip` and the `calc_result_gate` message validation. 370 skip clicks producing 2 leads, and 340 validation errors on 390 field focuses, are both pure loss on traffic already on the page.
