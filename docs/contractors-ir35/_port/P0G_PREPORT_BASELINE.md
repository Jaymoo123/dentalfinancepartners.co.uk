# P0-G: pre-port performance baseline (contractors-ir35)

Read-only measurement, run 2026-09-12. This is the BEFORE picture the design
cutover gets judged against. Nothing was deployed, indexed, mailed, scheduled or
committed by this package; no file outside this one was touched.

Site: `contractors-ir35` / Contractor Tax Accountants / www.contractortaxaccountants.co.uk
Production SHA at time of measurement: `18b4f25f` (see `P0B_DEPLOY_BASELINE.md`).

**Every figure below carries the command that produced it and its data-through
date.** Section 6 lists what could NOT be measured, so "found nothing" and "did
not look" stay distinguishable.

## 0. Brief corrections (verify-against-source pushback)

1. **"Bing will not resolve from the registry, check whether a Bing property
   exists by another route" — half right, and the conclusion it points at is
   wrong.** The registry row really does have `bing_property_url = NULL`
   (`get_sites(active_only=False)`), but a Bing property **does exist and is
   verified**: `https://contractortaxaccountants.co.uk/`, `IsVerified: True`,
   returned by `GetUserSites`. The client never needed the registry: `_resolve_site_url`
   falls back to `DEFAULT_SITE_URL` in `optimisation_engine/clients/bing_query_client.py`,
   which has carried this site since 2026-07-19. Bing data is present, plentiful,
   and is the headline of this baseline (§1.2).
2. **"a lead-generation site under 5 leads a month has a known standing
   implication" — it applies here.** 6 leads in 58 days is about 3.1/month. The
   standing rule (`standard_terms` §9) is no partner outreach for a lead-gen site
   under 5 leads/month.
3. The rest of the brief held. The "fourteen tracking attributes match the
   listener" claim was re-verified from source, not trusted (§3.1).

## 1. Search performance

### 1.1 Google Search Console

Property `sc-domain:contractortaxaccountants.co.uk` (from the `sites` registry).
Pulled live from the Search Analytics API with **date-only dimensions**, which is
the unsampled total; `gsc_query_data` in Supabase was not used for any total.

Command (scratch script, same call shape as `scripts/_fresh_gsc_bing_pull.py::gsc_date_only_totals`):

```python
svc.searchanalytics().query(siteUrl="sc-domain:contractortaxaccountants.co.uk",
  body={"startDate": S, "endDate": E, "dimensions": ["date"], "rowLimit": 500})
```

| Window (requested) | Clicks | Impressions | Avg position | CTR | Data through |
|---|---|---|---|---|---|
| 28 days, 2026-08-16 to 2026-09-12 | **2** | **1,234** | **37.3** | 0.16% | **2026-09-10** (26 days with data) |
| 90 days, 2026-06-15 to 2026-09-12 | **9** | **3,568** | **31.6** | 0.25% | **2026-09-10** (87 days with data) |

Avg position and CTR are GSC's own site-level figures from the same call with
`dimensions: []`, not a re-derivation. GSC lags roughly 2 days, hence the
2026-09-10 data-through on a 2026-09-12 pull.

All 9 clicks in 90 days, by date: 07-01, 07-03, 07-13, 07-16, 07-28, 08-03,
08-04, 08-29, 08-31 (one each). Query dimension returns **zero** rows with
clicks in either window: every clicked query is below GSC's anonymisation
threshold, so no click can be attributed to a query.

Pages that received those clicks (90 days, `dimensions: ["page"]`):

| Page | Clicks |
|---|---|
| `/blog/ir35-status/deemed-employment-payment-explained` | 4 |
| `/blog/ir35-status/outside-ir35-take-home-explained` | 2 |
| `/blog/umbrella-vs-limited-company/umbrella-company-vs-paye-agency-payroll` | 1 |
| `/for/legal-contractors` | 1 |
| `/locations/leeds` | 1 |

The 28-day clicks are the last two of those (`/for/legal-contractors` 08-29,
`/locations/leeds` 08-31).

**Top queries by impressions** (`dimensions: ["query"]`, rowLimit 25000, sorted
locally by impressions; 162 query rows in 28d, 261 in 90d). Clicks are 0 on
every row shown, positions are impression-weighted averages.

| 28d query | Impr | Pos |  | 90d query | Impr | Pos |
|---|---|---|---|---|---|---|
| contractor accounting cost uk | 76 | 62.7 | | contractor accounting cost | 219 | 35.9 |
| contractor accounting cost | 75 | 50.1 | | contractor accounting cost uk | 128 | 60.2 |
| ir35 assessment | 44 | 93.7 | | ir35 contract review | 112 | 31.8 |
| compare umbrella vs limited | 30 | 81.6 | | it contractor accounting | 86 | 74.6 |
| it contractor accounting | 25 | 70.4 | | ir35 review | 67 | 32.9 |
| ir35 contract review | 24 | 32.5 | | ir35 assessment | 64 | 93.8 |
| contractor accountants london | 23 | 62.1 | | compare umbrella vs limited | 63 | 82.8 |
| ir35 review | 19 | 33.3 | | engineering contractor accountants | 46 | 19.7 |
| contractor tax calculator | 17 | 36.2 | | ir35 review accountant | 44 | 35.1 |
| engineering contractor accountants | 17 | 18.4 | | members voluntary liquidation contractors | 42 | 57.6 |

**Top pages by impressions** (`dimensions: ["page"]`; 59 page rows in 28d, 70 in 90d):

| 28d page | Impr | Pos |
|---|---|---|
| `/blog/contractor-accounting-basics/contractor-accountant-fees-cost` | 183 | 49.2 |
| `/ir35-status` | 167 | 47.1 |
| `/calculators` | 155 | 41.8 |
| `/locations/london` | 75 | 49.6 |
| `/blog/umbrella-vs-limited-company/umbrella-company-deductions-explained` | 61 | 10.4 |
| `/blog/umbrella-vs-limited-company` | 48 | 81.3 |
| `/for/engineering-contractors` | 45 | 16.4 |
| `/blog/umbrella-vs-limited-company/umbrella-company-vs-paye-agency-payroll` | 40 | 11.3 |

| 90d page | Impr | Pos |
|---|---|---|
| `/blog/umbrella-vs-limited-company/umbrella-company-deductions-explained` | 589 | 8.4 |
| `/ir35-status` | 571 | 38.7 |
| `/blog/contractor-accounting-basics/contractor-accountant-fees-cost` | 433 | 38.4 |
| `/blog/pension-and-dividends/contractor-pension-schemes-sipp` | 200 | 19.0 |
| `/for/engineering-contractors` | 182 | 29.8 |
| `/calculators` | 155 | 41.8 |
| `/blog/umbrella-vs-limited-company` | 125 | 80.1 |
| `/for/it-contractors` | 123 | 61.9 |

Maturity note: this site's corpus is recent (analytics first session 2026-06-17,
blog corpus built through the summer). Sub-position-30 impressions on commercial
head terms are **maturing, revisit about a quarter**, not a design defect, and
the cutover read must not treat them as one.

### 1.2 Bing (the registry says NULL, Bing says otherwise)

Existence check:

```python
BingWebmasterClient().get_user_sites()
# -> {'Url': 'https://contractortaxaccountants.co.uk/', 'IsVerified': True, ...}
```

Site totals via `GetRankAndTrafficStats` (the only method that gives site totals,
per the `bing_query_stats_topn_trap` memory; `GetQueryStats` is top-N and must
never be summed for a site total):

```python
BingWebmasterClient()._call('GetRankAndTrafficStats',
  {'siteUrl': 'https://contractortaxaccountants.co.uk/'})
```

| Window | Clicks | Impressions | Data through |
|---|---|---|---|
| 28 days, 2026-08-16 to 2026-09-10 | **20** | **1,023** | **2026-09-10** (26 days with data) |
| 90 days, series starts 2026-06-19 | **26** | **1,341** | **2026-09-10** (84 days, the full series) |

The Bing series only goes back to 2026-06-19, so the 90-day and all-time figures
are identical; there is no earlier Bing history to compare against.

**Bing delivers 10x Google's clicks on this site in the last 28 days (20 vs 2)
on comparable impressions (1,023 vs 1,234), and 21 of those 26 Bing clicks landed
in the last 28 days.** That is the single most important number in this baseline:
judge this site's post-cutover search performance on Bing, and treat Google as a
second, lagging read.

Top Bing queries (`GetQueryStats`, 212 rows, trailing-window aggregate snapshot,
top by impressions; the API returns no per-date series for queries so these are
snapshot rows dated by Bing, most recent 2026-09-10):

| Query | Impr | Avg impression position |
|---|---|---|
| cest tool gov uk | 64 | 9 |
| cest test for ir35 | 11 | 8 |
| cest assessment hmrc | 10 | 6 |
| hmrc cest tool | 10 | 8 |
| hmrc cest | 6 | 6 |
| cest tool | 5 | 5 |

Bing's demand shape is materially different from Google's: Bing is CEST-tool
intent at positions 5-9, Google is "contractor accounting cost" at positions 36-62.

### 1.3 Referred sessions by search engine (first-party, for triangulation)

```sql
select coalesce(referrer_host,'(direct)') r, count(*) from web_sessions
where site_key='contractors-ir35' and not is_bot
  and started_at >= now() - interval '90 days' group by 1 order by 2 desc;
```
Data through 2026-09-12 (first-party, no lag).

90 days: (direct) 89, www.google.com 52, www.bing.com 28, chatgpt.com 10,
duckduckgo.com 9, copilot.microsoft.com 6, own domain 5, uk.search.yahoo.com 3,
youtube 2, ecosia 2, r.search.yahoo 1, doubao 1.

Two things to carry into the cutover read: **16 of 212 human sessions (7.5%) come
from AI surfaces (ChatGPT, Copilot, Doubao)**, and the Google referral count does
not reconcile with GSC clicks (§6, open question 1).

## 2. Leads

Source identifier derived, not assumed: `contractors-ir35/niche.config.json` →
`content_strategy.source_identifier = "contractors-ir35"` (and
`content_strategy.site_key` is the same string). `leads.source` is the column
that carries it.

```sql
select created_at::date, is_test, status, source_url, role, extras
from leads where source='contractors-ir35' order by created_at;
```
Data through 2026-09-12 (live query, Supabase Management API).

**6 leads, all real (`is_test = false` on all 6), 2026-07-15 to 2026-09-10 — 58
days, about 3.1 leads per month.** 4 of the 6 fall in the last 28 days.

| Date | Landing page of the form | Role selected | Status |
|---|---|---|---|
| 2026-07-15 | `/contact` | Considering limited company | new |
| 2026-08-05 | `/contact` | PSC contractor (outside IR35) | contactable |
| 2026-08-24 | `/services` (specialist widget) | Other / widget | contactable |
| 2026-08-29 | `/for/legal-contractors` | PSC contractor (outside IR35) | nurturing |
| 2026-09-01 | `/contact` | Considering limited company | nurturing |
| 2026-09-10 | `/contact` | Considering limited company | contactable |

Four of six came through `/contact`. One came off a persona page
(`/for/legal-contractors`) and one off the specialist widget on `/services`.

### Conversion rate against sessions

```sql
select count(*) filter (where not is_bot and started_at >= now()-interval '28 days'),
       count(*) filter (where not is_bot and started_at >= now()-interval '90 days')
from web_sessions where site_key='contractors-ir35';
```

| Window | Human sessions | Leads | Session-to-lead |
|---|---|---|---|
| 28 days to 2026-09-12 | 107 | 4 | **3.7%** |
| 90 days to 2026-09-12 | 212 | 6 | **2.8%** |

"Human" = `web_sessions.is_bot = false`. **Boundary warning:** the passive_session
bot rule landed 2026-08-23. Sessions before that date are inflated, so the 90-day
session count is not comparable to the 28-day one, and the 90-day conversion rate
is understated by an unknown amount. Only the 28-day figure (fully inside the
post-rule regime) is safe to compare against a post-cutover 28-day read. The
whole first-party series starts 2026-06-17, so there is no pre-06-17 history at all.

Human sessions per week (same table, `date_trunc('week')`), for the shape:
06-15: 10, 06-22: 5, 06-29: 11, 07-06: 11, 07-13: 29, 07-20: 13, 07-27: 5,
08-03: 12, 08-10: 10, 08-17: 11, 08-24: 36, 08-31: 27, 09-07: 32.

**Standing implication (`standard_terms` §9): at 3.1 leads/month this site is
below the 5-leads/month floor, so partner outreach for it stays off the table
until the number moves.** The figure is stated plainly rather than dressed up.

## 3. The conversion funnel: which of the ten capture surfaces have produced leads

### 3.1 The tracking-attribute claim, re-verified from source

The brief said a prior audit verified 14 tracking attributes match the listener.
Re-checked rather than trusted:

```bash
grep -rn "data-cta" contractors-ir35/web/src | wc -l     # 14
grep -rn "data-cta" packages/web-shared/analytics/autoCapture.ts
```
The listener reads exactly `data-cta`, `data-cta-goal`, `data-cta-placement`
(`autoCapture.ts:100-106`). All 14 site occurrences use one of those three
spellings, across `PremiumCalculator.tsx`, `ResultGateModal.tsx` (comment only),
`DeepScrollModal.tsx`, `NextStepOffer.tsx`, `ReturningBar.tsx`,
`SpecialistWidget.tsx`, `StickyCTA.tsx`. **Claim confirmed: zero misspellings.**
The sibling-site failure mode (a misspelled attribute making a live surface look
dead) does not apply to the `data-cta` surfaces here.

Important limit on that confirmation: the six MiniCapture-based surfaces carry no
`data-cta` at all by design. They are measured through `form_*` events keyed on
`form_id`, which is a different instrument and needed its own check (done below,
each `form_id` was found emitting events, so each is measured).

### 3.2 Surface-by-surface, all first-party, data through 2026-09-12

```sql
select props->>'form_id', event_name, count(*), min(ts)::date, max(ts)::date
from web_events where site_key='contractors-ir35' and not is_bot
 and event_name in ('form_start','form_step_view','form_step_complete','form_submit',
                    'lead_submitted','form_field_focus','form_error','form_field_abandon')
group by 1,2;

select props->>'cta_id', event_name, count(*) from web_events
where site_key='contractors-ir35' and not is_bot
 and event_name in ('cta_click','element_click') group by 1,2;

select props->>'surface', event_name, count(*) from web_events
where site_key='contractors-ir35' and not is_bot
 and event_name like 'personalization%' group by 1,2;
```

Surfaces are the 10 LIVE ones inventoried in `P0A_INVENTORY.md` §4
(`ExitIntentModal` is dead code, not mounted, and is not counted).

| # | Surface | Instrument | Shown / started | Leads | Verdict |
|---|---|---|---|---|---|
| 1 | Site lead form (`/contact`, persona pages) | `form_id=lead_form` | 5 starts, 37 field focuses, 6 submits | **5** | works; the only surface producing volume |
| 2 | `SpecialistWidget` | `form_id=specialist_widget` + `data-cta=specialist_widget` | 8 CTA clicks, 3 starts, 1 submit | **1** | works, one lead 2026-08-24 |
| 3 | `CalcResultCta` | `form_id=calc_result` | 6 starts, 18 step views, 1 step complete, **2 form_errors** | 0 | MEASURED AND ZERO; see §6 q2 |
| 4 | `InlineMiniLeadForm` (3 slots per post) | `form_id=inline_mini` | 18 step views, 1 start | 0 | MEASURED AND ZERO |
| 5 | `ResourceGate` | `form_id=resource_block` | 14 step views, 2 starts | 0 | MEASURED AND ZERO (matches the known consent-wording residual) |
| 6 | `MobileToolSlot` | `form_id=mobile_tool` | 5 step views, 2 starts | 0 | MEASURED AND ZERO |
| 7 | `DeepScrollModal` | `personalization_*` + `data-cta` | 15 shown, 3 clicked, 10 dismissed, 10 close-clicks | 0 | MEASURED AND ZERO; it is being shown and clicked, just not converting |
| 8 | `StickyCTA` | `personalization_*` + `data-cta=sticky_cta` | 128 shown, 1 personalization_click, 1 cta_click | 0 direct | MEASURED, near-zero engagement; it did ASSIST (a sticky_cta click on `/for/legal-contractors` on 2026-08-29, the same page and day as that lead) |
| 9 | `NextStepOffer` | `data-cta=next_step` only | **no shown event exists**; 0 clicks | 0 | **NOT DISTINGUISHABLE** — see §6 q3 |
| 10 | `ReturningBar` | `data-cta=returning_bar` only | **no shown event exists**; 0 clicks | 0 | **NOT DISTINGUISHABLE** — see §6 q3 |
| — | `ResultGateModal` (inside surface 3's flow) | `formId=calc_result_gate` | **zero events of any kind** | 0 | **NOT DISTINGUISHABLE** — see §6 q4 |

Assistant nudge (part of `SpecialistWidget`) separately: 199 `personalization_shown`,
32 dismissed, 3 `assistant_question` clicks, 3 `assistant_call` clicks.

Calculator funnel, for the cutover comparison: `calc_view` 31 human, `calc_input_change`
92, `calc_computed` 45, `calc_result_viewed` 8, then 6 `calc_result` form starts and
0 leads. The drop from 45 computes to 8 result views is the steepest single step in
the whole funnel.

Bot-gate note for surface 2: `support_opened` shows 303 total but only 171 human.
Per the `analytics_bot_gate` memory, `support_opened` was once treated as a human
signal and is not one; only the `not is_bot` counts above are used here.

### 3.3 One reconciliation the cutover read will otherwise trip over

`lead_submitted` fires **7** times but there are **6** lead rows. Both extra-looking
events are on 2026-08-24, `/services`, the specialist widget: one carries
`form_id=specialist_widget`, one carries no `form_id`. That is a double-fire on a
single widget submission, not a lost lead. Separately `form_submit` fired twice on
2026-09-01 `/contact` for one lead row (a double submit). Baseline for the after-read:
**leads table = 6, lead_submitted events = 7, and the delta is instrumentation, not loss.**

## 4. Indexation

**Method.** Published URLs = the live production `sitemap.xml` (`https://www.contractortaxaccountants.co.uk/sitemap.xml`,
fetched 2026-09-12, 157 `<loc>` entries, which matches the 157-URL link-floor
baseline in `P0B_DEPLOY_BASELINE.md`). Indexed status = the **GSC URL Inspection
API**, one call per URL, live, no stored snapshot, no writes:

```python
svc.urlInspection().index().inspect(body={"inspectionUrl": u,
  "siteUrl": "sc-domain:contractortaxaccountants.co.uk", "languageCode": "en-GB"})
# read inspectionResult.indexStatusResult.verdict / coverageState
```

Data-through: Google's index state as of the call, 2026-09-12. URL Inspection
reports the live index, so it has no reporting lag, unlike the Search Analytics
figures in §1. No data was written anywhere by this sweep.

**This is a STRATIFIED SAMPLE of 29 URLs out of 157 (18%), not a census.** The
sample was chosen deliberately, not at random, so that every URL family is
represented: the point of the exercise is "what proportion is indexed and is any
whole family missing", not the status of each individual URL. A full 157-URL
sweep was started and deliberately abandoned (about 7 seconds per call, roughly
18 minutes) once the sampled read proved sufficient.

Families in the sitemap: 62 blog articles, 39 glossary entries, 11 `/for`
personas, 11 calculators (incl. hub), 11 locations (incl. hub), 7 blog category
hubs, 4 research, 3 resources, plus 9 single pages (home, services, ir35-status,
about, contact, blog index, glossary index, locations index, and the 3 legal pages).

| Family | Sampled | Indexed (verdict PASS) | Rate in sample |
|---|---|---|---|
| Home | 1 | 1 | 1/1 |
| Core pages (`/services`, `/ir35-status`, `/contact`, `/about`) | 4 | 4 | 4/4 |
| Hubs (`/blog`, 3 blog category hubs, `/calculators`, `/glossary`, `/locations`, `/research`) | 8 | 8 | 8/8 |
| `/for` hub | 1 | **0** | 0/1 |
| Blog articles | 8 | 2 | **2/8 (25%)** |
| Calculator detail page | 1 | **0** | 0/1 |
| Glossary entry | 1 | 1 | 1/1 |
| Location city page | 1 | 1 | 1/1 |
| `/for` persona page | 1 | 1 | 1/1 |
| `/resources/*` (all three) | 3 | **0** | 0/3 |
| **Total** | **29** | **18** | **62% of the sample** |

Read this as: **hubs and hand-built pages are indexed; the long tail is not.**
The blog article family is 62 of the 157 URLs and only 2 of 8 sampled articles
are indexed, which is where any whole-family problem sits. Do not multiply 62%
by 157 into a precise site-wide indexed count: a 29-URL stratified sample does
not support that precision, and the sample deliberately over-weights hubs.

Per-URL detail on everything that was not indexed (the interesting half):

| URL | Coverage state | Google canonical | Last crawl |
|---|---|---|---|
| `/blog/expenses-and-deductions/contractor-expenses-allowable-guide` | Crawled, currently not indexed | self | 2026-07-07 |
| `/blog/ir35-status/off-payroll-working-rules-hub` | Discovered, currently not indexed | — | never |
| `/blog/limited-company-tax/closing-contractor-limited-company` | URL is unknown to Google | — | never |
| `/blog/pension-and-dividends/contractor-pension-carry-forward` | URL is unknown to Google | — | never |
| `/blog/umbrella-vs-limited-company/cheapest-umbrella-company-uk` | URL is unknown to Google | — | never |
| `/blog/contractor-accounting-basics/first-contract-outside-ir35-checklist` | URL is unknown to Google | — | never |
| `/calculators/outside-ir35-take-home-calculator` | Crawled, currently not indexed | self | 2026-08-23 |
| `/for` | **Alternative page with proper canonical tag** | **`/` (the homepage)** | 2026-09-02 |
| `/resources/ir35` | URL is unknown to Google | — | never |
| `/resources/structure` | URL is unknown to Google | — | never |
| `/resources/pay-planning` | URL is unknown to Google | — | never |

Two baseline facts worth naming before the cutover moves anything:

- **`/for` is not a page in Google's index; it is folded into the homepage.**
  Production serves `<link rel="canonical" href="https://www.contractortaxaccountants.co.uk"/>`
  on `/for` (`curl -s https://www.contractortaxaccountants.co.uk/for | grep canonical`),
  so Google is obeying the site's own instruction. The persona pages beneath it
  (`/for/it-contractors` sampled) are indexed normally. This is a pre-existing
  defect in the BEFORE picture, not something the port caused, and the after-read
  must not score it as a regression or a win.
- **The three `/resources/*` pages: all three are "URL is unknown to Google",
  a measured zero, captured deliberately because it is about to change.**
  These pages carry `noindex: true` in frontmatter; the flag was being dropped so
  no robots tag was emitted and they stayed in the sitemap. Verified on production
  right now: `curl -s .../resources/ir35 | grep '<meta name="robots"'` returns
  **nothing** — production still serves them indexable. The fix is in the working
  tree (`src/app/resources/[topic]/page.tsx:44` emits `robots: {index:false}`,
  `src/lib/resources/content.ts:97` filters them out of the sitemap) and is **not
  deployed**. So the BEFORE state is: indexable, in the sitemap, and Google has
  simply never picked them up. After the cutover they should be explicitly
  noindexed and absent from the sitemap, and their continued absence from the
  index will then mean something different.

Ages: `/blog/expenses-and-deductions/contractor-expenses-allowable-guide` was last
crawled 2026-07-07 and 4 of the 8 sampled articles have never been crawled at all.
For a corpus this young that is **maturing, revisit about a quarter**, not proof of
a content defect, though the "never crawled" half is consistent with the crawl
finding already recorded in `P0E_CRAWL_INTEGRITY.md` (`/blog` serves only 12 of 62
articles in server HTML, the rest sit behind client-side pagination, so internal
discovery paths to those articles are thin).

Cross-check from the other direction: 70 distinct URLs produced at least one
impression in the last 90 days and 59 in the last 28 days (§1.1 page dimension),
which is a floor on "known to Google", and is consistent with the inspection sweep.

## 5. What this baseline commits the cutover read to

1. Compare Bing first (`GetRankAndTrafficStats`, 28-day), Google second. Bing is
   10x Google's clicks here.
2. Compare 28-day windows only for sessions and conversion. The 2026-08-23
   passive_session boundary makes any window crossing it non-comparable.
3. The lead baseline is 6 leads / 58 days / 3.1 per month, with 5 of 6 from the
   site lead form. A cutover that moves any of the seven zero-lead surfaces off
   zero is the win condition; a cutover that only moves `/contact` is neutral.
4. Re-run the exact queries in this document. They are all pasted above in full.
5. For indexation, re-inspect **the same 29 sampled URLs**, listed in §4, not a
   fresh sample. Two of them are pre-loaded with meaning: `/for` (canonicalised
   into the homepage today) and the three `/resources/*` pages (indexable and
   unknown to Google today, noindexed and out of the sitemap after the cutover).

## 6. What I could NOT measure, and why

1. **The Google referral gap is unexplained.** GSC reports 9 clicks in 90 days;
   `web_sessions` reports 52 non-bot sessions with `referrer_host = www.google.com`
   in the same window (34 of them US, 13 GB). Both numbers are freshly pulled and
   both are internally consistent. Candidate explanations not yet tested:
   sessions arriving from non-Search Google surfaces, bot traffic passing the gate
   with a Google referrer, or GSC anonymisation suppressing low-volume clicks.
   **This is a question, not a finding, and it is the one thing in this baseline
   I would not build an argument on.** Resolving it needs a per-session landing
   page and user-agent read that was out of scope here.
2. **Why `calc_result` has 2 `form_error` events (2026-09-06 and 2026-09-08) is
   not established.** The surface is measured and working (6 starts, 1 step
   complete), so the zero is real, but two errors on six starts is a third of the
   flow erroring and the error payload does not say what failed. Needs a
   client-side reproduction, which would mean running a dev server; out of scope
   for a read-only package.
3. **`NextStepOffer` and `ReturningBar` cannot be told apart from "never
   displayed".** Both are instrumented with `data-cta` only, which fires on click
   and nothing else. Their attributes are spelled correctly (§3.1), so a click
   WOULD have been recorded, but with no impression event there is no way to know
   whether zero clicks means "shown and ignored" or "never rendered". `ReturningBar`
   in particular only renders for returning visitors, a population this site may
   barely have. **Measuring this needs a shown-event, which would be an
   instrument change, which is not in a read-only package and is a decision for
   the owner.**
4. **`ResultGateModal` (`formId=calc_result_gate`) has zero events of any kind**,
   not even a view. It sits behind the premium-calculator result gate, and
   `calc_result_viewed` only fired 8 times across the whole history, all on
   standard (non-premium) calculators. Most likely nobody has reached the gate;
   possibly it never renders. Same limitation as (3): no impression event exists
   to separate the two. Flagged as a question.
5. **No query-level attribution for any Google click.** All 9 clicks are below
   GSC's anonymisation threshold, so the query dimension returns zero click rows.
   Not a gap in the pull, a limit of the source.
6. **No pre-2026-06-17 first-party history, and no pre-2026-06-19 Bing history.**
   The site is young; there is no "last year" to compare to and none can be
   reconstructed.
7. **Conversion rate by capture surface could not be computed as a rate.** Lead
   rows carry `source_url` but not a `capture_surface` field (`extras` is null on
   4 of 6 rows), so surface attribution is done by joining on `form_id` in
   `web_events`, which gives counts but not a clean per-surface denominator of
   "people who saw the surface".
8. **The site-wide indexed URL count was NOT measured.** §4 is a 29-of-157
   stratified sample, by decision, not a census; a full sweep was started and
   stopped. So "how many of the 157 URLs are indexed" is a number this baseline
   does **not** have, and the 62% sample rate must not be presented as one. What
   the sample does support: hubs and hand-built pages are indexed, the blog long
   tail largely is not, and the three `/resources/*` pages are unknown to Google.
   Per-family confidence is one or a few URLs deep outside the blog family, so a
   single family figure like "glossary 1/1" is an existence check, not a rate.
9. **Zeros in this document, classified.** Measured zeros (the instrument fired,
   the outcome was zero): surfaces 3-8 in §3.2, the `/resources/*` index status,
   and every "0 clicks" query row in §1.1. Unmeasured zeros (no instrument
   exists, so the zero means nothing yet): `NextStepOffer`, `ReturningBar` and
   `ResultGateModal` in §3.2, listed individually as questions 3 and 4 above. The
   sibling-site failure mode (a misspelled attribute faking a dead surface) was
   checked for explicitly and is **not** present here (§3.1).
10. **Not attempted by design:** no deploy, no IndexNow, no monitored-pages
   registration, no monitor/cron/alert creation, no dev server, no git state
   change, no file edited except this one.
