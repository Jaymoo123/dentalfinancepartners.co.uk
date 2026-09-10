# Medical design port - Phase 0 funnel evidence

Pulled 2026-09-10. READ-ONLY. Site: `medical` (Medical Accounts, www.medicalaccounts.co.uk; `niche_id` medical from `Medical/niche.config.json`).

**Window on every claim below: 2026-08-23 00:00 UTC to 2026-09-10 (pull time), 18 days.**
Window starts on the bot-gate landing date, so nothing here is inflated by the pre-gate bot count. Pre-gate figures are never mixed in.
Every figure is a fresh Supabase read; the query that produced it is inline. No stored snapshot figures, no GSC/Bing figures.

Analytics storage prefix for this site is `ma`. `noTrackPrefixes` are `/admin` and `/embed`, so those paths generate no events by design and their absence is not read as a defect anywhere below.

Channel context, not funnel context: `docs/medical/STATE.md` records Bing out-clicking Google roughly 3.4x here and Google indexing only a fraction of the corpus. That governs how many people arrive. This document is only about what happens after they arrive.

## Definitions used

| Term | Definition | Source |
|---|---|---|
| session | distinct `web_events.session_id` with `is_bot=false` in window | `web_events.session_id` |
| engaged session | `web_sessions` row, `is_bot=false`, `engaged_ms >= 10000` | `web_sessions.engaged_ms` |
| calculator viewed | session firing `calc_view` | `web_events.event_name` |
| calculator use | session firing `calc_input_change` or `calc_computed` (never a mere `calc_view`) | `web_events.event_name` |
| form start | `form_start` event | `web_events.event_name` |
| form complete | `form_submit` event | `web_events.event_name` |
| lead | `leads` row, `source='medical'`, `source <> 'test' AND coalesce(is_test,false) = false` (predicate copied verbatim from `supabase/migrations/20260819000003_test_leads_excluded_from_kpis.sql`) | `leads` |

Session counts differ between `web_events` (384) and `web_sessions` (347) for medical, and between 4,985 and 4,560 for property; sessions whose events span the window boundary explain the gap. Ratios below use the `web_events` count consistently for both sites, except engagement rate which is necessarily `web_sessions`-based on both.

---

## A. Medical funnel, post bot-gate

```sql
-- run: python scripts/_q.py -
with e as (
  select site_key, session_id, page_path, event_name from web_events
  where site_key in ('medical','property') and is_bot=false
    and ts>='2026-08-23' and ts<now())
select site_key,
 count(distinct session_id) sessions,
 count(distinct session_id) filter (where event_name='calc_view') calc_view_sess,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use_sess,
 count(*) filter (where event_name='calc_computed') calc_computed_ev,
 count(distinct session_id) filter (where event_name='form_start') form_start_sess,
 count(*) filter (where event_name='form_start') form_start_ev,
 count(*) filter (where event_name='form_submit') form_submit_ev,
 count(*) filter (where event_name='lead_submitted') lead_submitted_ev
from e group by 1;
```
```sql
select site_key, count(*) sess, count(*) filter (where engaged_ms>=10000) engaged
from web_sessions where site_key in ('medical','property') and is_bot=false
  and started_at>='2026-08-23' group by 1;
```

| Step | Number | Rate | Table.column |
|---|---:|---|---|
| Sessions | 384 | - | `web_events.session_id` |
| Engaged sessions (>=10s) | 227 | 65.4% of `web_sessions` rows (347) | `web_sessions.engaged_ms` |
| Calculator viewed | 96 sessions | 25.0% of sessions | `web_events` `calc_view` |
| Calculator actually used | 19 sessions | 4.95% of sessions; **19.8% of calc viewers** | `web_events` `calc_input_change`/`calc_computed` |
| Calculator computed (events) | 98 | 5.2 per using session | `web_events` `calc_computed` |
| Form starts | 13 sessions (16 events) | 3.39% of sessions | `web_events` `form_start` |
| Form completes | 5 events | **38.5% of form-start sessions** | `web_events` `form_submit` |
| Leads (KPI-clean) | 5 | **13.02 per 1,000 sessions** | `leads` |

`lead_submitted` events in the window: 5. That reconciles exactly with 5 `form_submit` events and 5 KPI-clean `leads` rows. The bottom of this funnel is internally consistent; nothing is being lost between the browser and the table.

### By template family (medical)

```sql
with e as (select session_id, page_path, event_name from web_events
  where site_key='medical' and is_bot=false and ts>='2026-08-23'),
f as (select case
  when page_path='/' then 'homepage'
  when page_path='/blog' or page_path like '/blog/page%' then 'blog hub'
  when page_path like '/blog/%' then 'blog article'
  when page_path='/medical-guides' then 'category hub'
  when page_path like '/medical-guides/%' then 'guide article'
  when page_path like '/calculators%' or page_path like '%calculator%' or page_path like '/tools%' then 'calculator'
  when page_path like '/for-%' then 'audience (for-*)'
  when page_path like '/services%' then 'services'
  when page_path like '/contact%' then 'contact'
  when page_path like '/locations%' or page_path like '/accountants-in%' then 'location'
  else 'other' end fam, * from e)
select fam, count(distinct session_id) sessions,
 count(*) filter (where event_name='page_view') pv,
 count(distinct session_id) filter (where event_name='calc_input_change' or event_name='calc_computed') calc_use,
 count(*) filter (where event_name='form_start') form_start,
 count(*) filter (where event_name='form_submit') form_submit
from f group by 1 order by 2 desc;
```

| Family | Sessions | Page views | Calc uses | Form starts | Form completes |
|---|---:|---:|---:|---:|---:|
| blog article | 269 | 266 | 12 | 9 | **0** |
| guide article (`/medical-guides/*`) | 43 | 47 | 0 | 0 | 0 |
| homepage | 37 | 39 | 0 | **0** | 0 |
| other | 19 | 22 | 0 | 0 | 0 |
| services | 13 | 14 | 0 | 1 | 0 |
| contact | 13 | 18 | 0 | 6 | **5** |
| calculator | 12 | 12 | 7 | 0 | 0 |
| location | 11 | 12 | 0 | 0 | 0 |
| category hub (`/medical-guides`) | 5 | 6 | 0 | 0 | 0 |
| audience (`/for-*`) | 3 | 2 | 0 | 0 | 0 |
| blog hub | 2 | 2 | 0 | 0 | 0 |

Note the `calc_use` split: the `calculator` family (dedicated `/calculators/*` routes) carries 7 using sessions off 12 sessions, while blog articles carry 12 off 269. Embedded in-article calculators are where most calculator use happens by volume; the dedicated calculator routes are where it happens by rate.

**The finding.** 70% of sessions land on a blog article. Blog articles produced 9 of the 16 form starts and **zero** completions. All 5 completions came from `/contact`, a page that saw 13 sessions. That is the same shape solicitors has: the traffic is in the blog body and the blog body completes nothing.

Two families are effectively invisible and should not be read as "converting badly": `audience (for-*)` at 3 sessions and `category hub` at 5. There is not enough traffic on them to say anything. The `/medical-guides/*` guide-article family, at 43 sessions with zero form starts and zero calculator use, has enough traffic to be worth a question but not enough to be a verdict: 43 sessions producing 0 starts is consistent with the blog-article rate (9/269 = 3.3%, which over 43 sessions predicts ~1.4 starts). It is not evidence of a broken template.

---

## B. Property, identical window, as the comparison

Same query, `site_key='property'`.

| Step | Property | Property rate | Medical rate | Ratio (medical / property) |
|---|---:|---|---|---:|
| Sessions | 4,985 | - | - | 0.077x volume |
| Engaged (>=10s) | 3,194 | 70.0% of `web_sessions` (4,560) | 65.4% | 0.93x |
| Calc page viewed | 1,883 sess | 37.8% of sessions | 25.0% | **0.66x** |
| Calc used | 254 sess | 5.09% of sessions | 4.95% | 0.97x |
| Calc used / calc viewed | - | 13.5% | **19.8%** | **1.47x (medical better)** |
| Calc computed (events) | 2,794 | 11.0 per using session | 5.2 | 0.47x |
| Form starts | 282 sess | 5.66% of sessions | 3.39% | **0.60x** |
| Form completes | 50 ev | 17.7% of form-start sessions | **38.5%** | **2.17x (medical better)** |
| Leads | 49 | 9.83 / 1,000 sessions | **13.02** | **1.32x (medical better)** |

### Property by template family

```sql
-- same CASE as above minus the medical-only branches, site_key='property'
```

| Family | Sessions | Page views | Calc uses | Form starts | Form completes |
|---|---:|---:|---:|---:|---:|
| blog article | 4,654 | 4,674 | 229 | 246 | **15** |
| homepage | 187 | 199 | 0 | 13 | 10 |
| other | 120 | 127 | 1 | 3 | 3 |
| calculator | 89 | 91 | 29 | 7 | 1 |
| contact | 77 | 78 | 0 | 24 | 17 |
| services | 41 | 48 | 0 | 5 | 4 |
| location | 38 | 52 | 0 | 0 | 0 |
| blog hub | 4 | 4 | 0 | 0 | 0 |

---

## C. Where Medical is worse, better, and not meaningfully different

**Worse, and material:**

1. **Form start rate: 3.39% against Property's 5.66% (0.60x).** Medical gets a smaller share of its visitors to touch a form at all. This is the single largest real gap in the funnel.
2. **Calculator reach: 25.0% of sessions see a calculator against Property's 37.8% (0.66x).** Fewer people are routed to the tool. Given that Medical converts calculator *viewers* into *users* better than Property does (19.8% vs 13.5%), the loss here is distribution, not the tool.
3. **Blog articles: 269 sessions, 9 form starts, 0 completions.** Property's blog articles turned 246 starts into 15 completions (6.1%). Medical's turned 9 into 0. On 9 starts a true 6.1% rate would predict 0.5 completions, so **zero is not by itself proof of a broken template** - the sample is too small to distinguish "broken" from "unlucky". What makes it worth acting on is that it is the same zero solicitors shows on the same family, and that 70% of Medical's traffic lands there. Treat it as the priority to instrument, not as a proven defect.
4. **Calculator depth: 5.2 computed events per using session against Property's 11.0 (0.47x).** People who use the Medical calculator run about half as many scenarios before leaving.

**Better:**

1. **Form completion: 38.5% of form-start sessions against 17.7% (2.17x).** Once a Medical visitor starts a form, they finish it more than twice as often. Note the caveat: 5 completions off 13 starting sessions. The confidence interval on 5/13 is wide and it comfortably contains Property's 17.7%. Directionally good, statistically not yet a claim.
2. **Leads per 1,000 sessions: 13.02 against 9.83 (1.32x).** Medical is a better converter per visitor than the estate's flagship. On 5 leads this is fragile - one lead either way moves it by 2.6 - but the 90-day picture in §E supports it rather than contradicting it.
3. **Calculator use per viewer: 19.8% against 13.5% (1.47x).** 19 using sessions off 96 viewers; small but the most solid of the three "better" readings.

**Not meaningfully different:**

- Engagement rate (65.4% vs 70.0%). A 4.6pt gap on a 10-second threshold is not a design signal.
- Calculator use as a share of all sessions (4.95% vs 5.09%). Identical. Medical reaches fewer people with the calculator and converts more of the ones it reaches; the two cancel.

**What this means for the port.** Medical is not a broken funnel that needs rescuing, which is the opposite of the solicitors read. Its bottom half already beats Property. The losses are all in the top and middle: getting visitors to a form or a calculator at all. A port that improves surfacing and CTA distribution should compound directly; a port that rebuilds the form flow risks damaging the one part of this site that already outperforms. Verify completion rate has not moved after cutover before anything else.

---

## D. Estate ranking, leads per 1,000 sessions, same window

```sql
with s as (select site_key, count(distinct session_id) sessions from web_events
           where is_bot=false and ts>='2026-08-23' group by 1),
l as (select source, count(*) leads from leads where created_at>='2026-08-23'
      and source<>'test' and coalesce(is_test,false)=false group by 1)
select s.site_key, s.sessions, coalesce(l.leads,0) leads,
 round(coalesce(l.leads,0)*1000.0/nullif(s.sessions,0),2) leads_per_1k
from s left join l on l.source=s.site_key order by leads_per_1k asc, s.sessions desc;
```

| # | Site | Sessions | Leads | Leads / 1k |
|---:|---|---:|---:|---:|
| 1 | charities | 234 | 0 | 0.00 |
| 2 | agency | 126 | 0 | 0.00 |
| 3 | hospitality | 87 | 0 | 0.00 |
| 4 | startups-tech | 63 | 0 | 0.00 |
| 5 | ecommerce | 48 | 0 | 0.00 |
| 6 | solicitors | 1,731 | 2 | 1.16 |
| 7 | generalist | 1,438 | 5 | 3.48 |
| 8 | construction-cis | 243 | 1 | 4.12 |
| 9 | dentists | 439 | 2 | 4.56 |
| 10 | property | 4,985 | 49 | 9.83 |
| 11 | **medical** | **384** | **5** | **13.02** |
| 12 | pharmacies | 55 | 1 | 18.18 |
| 13 | crypto | 32 | 1 | 31.25 |
| 14 | contractors-ir35 | 123 | 4 | 32.52 |
| 15 | care | 53 | 2 | 37.74 |

**Medical ranks 11th of 15 from the bottom, i.e. 5th best, and 2nd best among sites with enough traffic to have a funnel.** Only sites at 32-123 sessions rank above it, and their rates rest on 1-4 leads; those are noise, not performance. Against the two other sites above 380 sessions that convert at all (property 9.83, dentists 4.56) Medical leads. Medical's problem is not conversion rate. It is that 384 sessions in 18 days is one thirteenth of Property's traffic - which is the channel fact from `STATE.md`, not a funnel fact, and out of scope here.

---

## E. Lead volume and shape, last 90 days

```sql
select id, created_at, source, source_url, status, is_test, extras::text
from leads where source='medical' and created_at>='2026-06-12' order by created_at desc;
```

24 rows returned. **One is excluded by the KPI predicate**: `4028bf43` (2026-08-20, `/free-practice-health-check`) carries `is_test=true` and `extras.duplicate_of` pointing at `f3f95a61`, the `/contact` lead submitted 4 minutes later with the identical `health_check` payload. That is one person, already de-duplicated correctly.

**23 KPI-clean leads in 90 days (2026-06-12 to 2026-09-10) = 7.7 per month.**

| Surface | Leads (KPI-clean) |
|---|---:|
| `/contact` | 19 |
| blog article | 2 (`gp-accountant-sheffield`, `gp-practice-income-pcse-statement-reconciliation`; both `capture_channel=assistant`) |
| `/calculators/doctor-expenses-tax-relief` | 1 (`extras.resource_gate=true`) |
| `/free-practice-health-check` | 1 (the excluded duplicate) |

By status: 15 `contactable`, 6 `new`, 2 `nurturing`, 1 `closed` (across the 23 clean plus the 1 excluded).

**Suspect / honeypot count: zero.** No row in the 90 days carries a `honeypot` key in `extras`. This is a real absence rather than a missing field - the key exists in the estate schema (solicitors has a `honeypot: true` row in the same period), so the query would have surfaced it. Medical's lead stream is clean.

**Against the standing rule that partner outreach is off the table below 5 leads/month: Medical is at 7.7/month, comfortably on the right side of the line.** Removing the assistant-widget leads and the resource-gate lead still leaves 6.7/month from `/contact` alone. This site is offerable to a partner today. That raises the stakes on the port: the downside risk of a regression here is realised revenue, not hypothetical revenue. §H's watch gap matters more on Medical than it did on solicitors for exactly that reason.

Reconciliation note: 5 leads in the 18-day window annualises to 8.4/month, consistent with the 90-day 7.7/month. The rate is stable, not a spike.

---

## F. `data-cta` inventory

Source:
```bash
grep -rhoE 'data-cta="[^"]+"' Medical/web/src | sort | uniq -c | sort -rn
grep -rhoE "cta_id: *['\"][^'\"]+" Medical/web/src | sort | uniq -c | sort -rn
```
Events (window, and all-time to catch dormant ids):
```sql
select coalesce(props->>'cta_id','(none)') cta,
       count(*) filter (where ts>='2026-08-23') n_window,
       count(*) all_time, min(ts)::date first, max(ts)::date last
from web_events where site_key='medical' and event_name='cta_click'
group by 1 order by 2 desc, 3 desc;
```
Per-route (trap 4 workaround, see below):
```sql
select coalesce(props->>'cta_id','(none)') cta, page_path, count(*) n
from web_events where site_key='medical' and event_name='cta_click' and ts>='2026-08-23'
group by 1,2 order by 3 desc;
```

19 literal `data-cta` ids in source, plus one dynamic template literal `` data-cta={`calculator-gallery-${c.slug}`} `` at `Medical/web/src/app/calculators/page.tsx:64`. 13 distinct ids have ever fired.

| cta id | In source | Events in window | All-time (first..last) | Verdict |
|---|---|---:|---|---|
| see_result | yes | 13 | 29 (07-06..09-10) | **LIVE** |
| result_gate_skip | **no `data-cta`** - `cta_id:` literal in JS | 11 | 26 (07-08..09-07) | **ORPHANED-LIVE** |
| specialist_widget | yes | 7 | 24 (07-06..09-10) | **LIVE** |
| nav-book-call | yes | 3 | 11 (06-17..09-09) | **LIVE** (thin) |
| sticky_cta | yes | 2 | 7 (07-14..08-25) | **LIVE** (thin) |
| assistant_question | no | 1 | 6 (07-14..09-08) | ORPHANED-LIVE |
| calculator-gallery-nhs-pension-scheme-pays | dynamic | 1 | 1 (08-28) | LIVE (thin) |
| cta-section-primary | yes | 1 | 1 (09-02) | LIVE (thin) |
| deep_scroll_close | yes | **0** | 13 (07-13..**08-22**) | **DORMANT - see below** |
| assistant_call | no | 0 | 6 (07-14..08-14) | ORPHANED-DORMANT |
| calculator-gallery-doctor-expenses-tax-relief | dynamic | 0 | 2 (08-19..08-19) | DORMANT |
| deep_scroll_modal | yes | 0 | 1 (08-04) | DORMANT |
| calculator-gallery-nhs-pension-annual-allowance | dynamic | 0 | 1 (07-28) | DORMANT |
| thankyou-return-article | yes | 0 | never | **NEVER FIRED** |
| returning_bar | yes | 0 | never | **NEVER FIRED** |
| returning_bar_close | yes | 0 | never | **NEVER FIRED** |
| next_step | yes | 0 | never | **NEVER FIRED** |
| mobile-nav-book-call | yes | 0 | never | **NEVER FIRED** |
| home_cta_primary | yes | 0 | never | **NEVER FIRED** |
| home_cta_secondary | yes | 0 | never | **NEVER FIRED** |
| hero_primary | yes | 0 | never | **NEVER FIRED** |
| hero_secondary | yes | 0 | never | **NEVER FIRED** |
| header_nav_secondary | yes | 0 | never | **NEVER FIRED** |
| header_mobile_secondary | yes | 0 | never | **NEVER FIRED** |
| contact_pricing_link | yes | 0 | never | **NEVER FIRED** |

**Totals: 7 literal source ids have fired, 12 literal source ids have never fired, 3 ids fire from JS with no `data-cta` attribute (2 of them live), 3 dynamic `calculator-gallery-*` ids have fired.**

**The headline finding, and it is the same one solicitors produced.** `hero_primary`, `hero_secondary`, `home_cta_primary`, `home_cta_secondary`, `header_nav_secondary`, `header_mobile_secondary` and `mobile-nav-book-call` have **never fired once**. The homepage row in §A confirms it from the other side: 37 sessions on `/`, 39 page views, **zero form starts and zero CTA clicks other than 4 `specialist_widget`**. The most prominent CTAs on the site - hero buttons, header, mobile nav - are not instrumented. The 3.39% form-start rate in §B is therefore a floor, not a measurement: **the funnel cannot see the top of itself.** Before concluding the port improved top-of-funnel, wire these ids; otherwise the improvement and the instrumentation land together and neither can be attributed.

Note `nav-book-call` DOES fire (11 all-time) while `mobile-nav-book-call`, `header_nav_secondary` and `header_mobile_secondary` never have. So the header is partially wired. That makes "never fired" here more likely to mean "not wired" than "never clicked", but it is not proof - it is possible the mobile nav genuinely gets no clicks. Resolving it needs a click test on a live page, which was not run here.

**Per-route reading (window).** `see_result` fired from 7 distinct blog articles; `result_gate_skip` from 6; `specialist_widget` from `/` (4), `/calculators/salaried-gp-vs-partner`, `/blog/gp-tax-and-accounts`, `/blog/gp-pension-contributions-tax-relief`. `nav-book-call` fired from `/locations/leeds`, `/locations/london`, `/contact`. The calculator gate pair (`see_result` 13 / `result_gate_skip` 11) is the busiest interaction on the site and it is 54% skip: **for every 13 people who ask to see a calculator result, 11 decline to give details for it.** That gate is the highest-volume conversion decision on Medical and it is losing roughly half. Do not remove or restyle it in the port without a measurement plan.

**`deep_scroll_close` stopped dead on 2026-08-22, the day before the bot gate.** 13 events all-time, none since. Absence is a question, not a finding. Two explanations fit: (a) the deep-scroll modal's clicks were predominantly bot-driven and the gate now correctly classifies them out, which would also explain `deep_scroll_modal`'s single lifetime event; or (b) the component was removed or broken by a change on or about 08-22 - note `calc_result` was deleted estate-wide on 2026-08-22 per the comment at `Property/web/src/config/deploy-watch.ts:149`. **Not resolved here.** Checking it needs a git log of the Medical component around 08-22 and a re-query with `is_bot=true` included. Do not record `deep_scroll_close` as either working or broken until that is done.

**Trap 4 applies.** `vw_cta_performance` groups by `(site_key, country, cta_id, goal)` with **no `page_path`**. Every per-route figure above came from `web_events` directly for that reason. The `calculator-gallery-<slug>` ids in particular cannot be split by route through the view, since the same component renders on `/calculators` and on `/calculators/[slug]`.

---

## G. Registry check

```sql
select site_key, gsc_property_url, bing_property_url, active from sites where site_key='medical';
```
| site_key | gsc_property_url | bing_property_url | active |
|---|---|---|---|
| medical | `sc-domain:medicalaccounts.co.uk` | **NULL** | true |

The GSC property matches the site's domain (`www.medicalaccounts.co.uk` from `Medical/niche.config.json`) at the domain-property level. `bing_property_url` is NULL, but it is NULL for **every** active site - the estate convention is to reach Bing through `bing_query_client`, not this column. Not a medical defect. No action.

---

## H. Deploy-watch baselines

```sql
select watch_key, started_at, gate_day, status, verdict, left(payload::text,300) from deploy_watch order by started_at desc;
```

`deploy_watch` holds 6 rows in total. **No open watch of any kind exists.** The four `miniform_multistep` rows are Property's, all `sent`, final day-28 gate PASS, watch complete. Two rows are `skipped`: `agency_fixwave` (2026-07-08) and **`medical_fixwave` (2026-07-06, gate_day 14, status `skipped`, verdict `skipped`, null payload)**. The medical row was never evaluated. The table has no `site_key` column; watches are identified by `watch_key` string only.

**The hardcode is still there, verified today.** `Property/web/src/app/api/cron/deploy-watch/route.ts:100` reads:
```ts
      site_key: "eq.property",
```
That is the only watch implementation in the repo. **It cannot fire on Medical's data.** Consequences for the cutover, stated plainly:

- A Medical port cannot trip a false ACTION-NEEDED email through this path. No noise risk.
- A Medical port also gets **no automated regression detection at all**. Given §E - Medical is at 7.7 leads/month and is partner-offerable today - that is the more important half. The port's day-3/7/14/28 checks on Medical have to be run by hand or the watch has to be generalised off the hardcode. Decide which before cutover, not after.

What the watch counts, from `Property/web/src/config/deploy-watch.ts`:

| Constant | Value | Line |
|---|---|---|
| `MINIFORM_FORM_IDS` | `exit_intent`, `exit_intent_form`, `inline_mini`, `calc_result_gate`, `mobile_tool`, `resource_block`, `specialist_widget` | 153 |
| `BASELINE_MINIFORM_LEADS_28D` | 15 | (measured 2026-06-09..07-07) |
| `BASELINE_MINIFORM_LEADS_WEEKLY` | 3.75 | |
| `BASELINE_MINIFORM_LEADS_2WK` | 7.5 | |

Medical's live form_id vocabulary in the window:

```sql
select coalesce(props->>'form_id','(none)') form_id, event_name, count(*) n
from web_events where site_key='medical' and is_bot=false and ts>='2026-08-23'
 and event_name like 'form%' group by 1,2 order by 3 desc;
```

| form_id | step_view | field_focus | form_start | form_error | form_submit | in `MINIFORM_FORM_IDS`? |
|---|---:|---:|---:|---:|---:|---|
| blog_mid_resource | 95 | 2 | 2 | - | 0 | **no** |
| inline_mini | 82 | 1 | 1 | - | 0 | yes |
| mobile_tool | 28 | - | 0 | - | 0 | yes |
| calc_result_gate | 13 | 13 | 6 | 6 | 0 | yes |
| lead_form | - | 26 | 6 | - | **5** | no |
| calc_result | 8 | - | 0 | - | 0 | no (deleted on Property 2026-08-22) |
| specialist_widget | - | 4 | 1 | - | 0 | yes |

**Three things the port must carry forward.**

1. **Medical uses `blog_mid_resource` where Property uses `resource_block`.** Same job, different id, and `blog_mid_resource` is Medical's highest-volume surface at 95 step views. It is **not** in `MINIFORM_FORM_IDS`. If the watch is ever extended to Medical without adding it, Medical's busiest capture surface is invisible to the watch while `BASELINE_MINIFORM_LEADS_28D = 15` (derived from Property's full id set) stays unshrunken - and the comparison fires an ACTION-NEEDED email at the owner for a fault that does not exist. That is precisely the failure the comment block at `deploy-watch.ts:163` was written to prevent.
2. **Do not rename or drop** `inline_mini`, `mobile_tool`, `calc_result_gate`, `specialist_widget` or `blog_mid_resource` on Medical without recording it here. They are the shared estate vocabulary.
3. **`calc_result_gate` has a 100% error rate on starts: 6 starts, 6 `form_error` events, 0 submits.** Six of six. That is not a conversion problem, it reads as a validation fault, and it is the same gate that §F shows carrying the site's highest-volume interaction (13 `see_result` / 11 `result_gate_skip`). This is the single most actionable defect surfaced by this pull. It is not proven - `form_error` may fire on a soft inline hint rather than a blocking failure, and 6 events is small - but 6/6 with zero submits warrants a manual test of that gate before the port touches anything else. Flagged, not diagnosed.

Also note `blog_mid_resource` and `inline_mini`: 177 step views between them, 3 starts, 0 leads. They render and they are seen; they do not convert. Same residual shape as the Property `resource_block` reading in the consent-wording incident.

---

## UNVERIFIED / NOT DERIVED

| Item | Why |
|---|---|
| Whether `deep_scroll_close` is retired or broken | Fired 13 times to 2026-08-22, zero since. Two explanations fit (bot-gate reclassification vs component removal on/around the 08-22 estate change). Needs a git log of the Medical component plus a re-query including `is_bot=true`. **Not resolved. Do not record it as either.** |
| Whether the 12 never-fired `data-cta` ids are unwired or merely unclicked | `nav-book-call` fires while its mobile sibling never has, which points at unwired, but proof needs a click test on a live page. Not run. |
| Root cause of `calc_result_gate` 6 starts / 6 errors / 0 submits | Established as a fact above. Whether `form_error` is blocking or a soft hint, and which field, is Phase 1 work. |
| Blog-article zero-completion root cause | 9 starts, 0 completions. Established as a fact; the sample is too small to distinguish "broken template" from "unlucky". Which component, and why, is Phase 1. |
| Significance of Medical's better completion rate | 5/13 vs Property's 50/282. The interval on 5/13 contains Property's rate. Directional only; no significance test run. |
| Per-route split of the dynamic `calculator-gallery-*` ids | `vw_cta_performance` groups without `page_path` (trap 4). Recoverable from `web_events.page_path`; only the window slice was pulled, not all-time. |
| Search-side figures (impressions, clicks, position) | Out of scope for a funnel baseline. No stored snapshot repeated, no fresh GSC/Bing pull run. The 3.4x Bing-over-Google note from `STATE.md` is quoted as channel context only and was not re-derived here. |
| Page maturity | 19 `monitored_pages` rows for medical, 16 `active`. Pages inside a live monitor window are immature by definition and are not condemned anywhere above. Per-page maturity was not cross-referenced against the family table. |
| `/for-*` and category-hub template performance | 3 and 5 sessions respectively. No conclusion possible either way. Not a zero, an absence of data. |
| Whether `/admin` and `/embed` render correctly | They are in `noTrackPrefixes` and generate no events by design. Their absence from every table above is expected and was not investigated. |
| Pre-bot-gate comparison for Medical | Deliberately not derived. Pre-08-23 traffic is bot-inflated; mixing it in would corrupt every rate here. |
