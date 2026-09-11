# Trade (construction-cis) design port - Phase 0 funnel evidence

Pulled 2026-09-11. READ-ONLY. Site: `construction-cis` (Trade Tax Specialists, www.tradetaxspecialists.co.uk; `niche_id` `construction-cis` from `construction-cis/niche.config.json`).

**Window on every claim below: 2026-08-23 00:00 UTC to 2026-09-11 (pull time), 19 days.**
Window starts on the bot-gate landing date. Nothing pre-gate is mixed in anywhere. Every figure is a fresh Supabase read through `scripts/_q.py` (Management API, project `dhlxwmvmkrfnmcgjbntk`); the query that produced it is inline. No stored snapshot figures. No GSC or Bing figures.

Benchmark throughout is `site_key='property'` over the identical window.

## READ THIS FIRST: the bot gate is only half applied, and it changes the numbers

`web_events.is_bot` and `web_sessions.is_bot` disagree.

```sql
select e.site_key,
 count(distinct e.session_id) sess_events_gate,
 count(distinct e.session_id) filter (where s.is_bot) sess_bot_in_sessions,
 count(distinct e.session_id) filter (where s.session_id is null) no_session_row
from web_events e
left join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
where e.site_key in ('construction-cis','property') and e.is_bot=false and e.ts>='2026-08-23'
group by 1;
```

| site | sessions with `web_events.is_bot=false` | of those, `web_sessions.is_bot=true` | orphan sessions |
|---|---:|---:|---:|
| construction-cis | 247 | **45 (18.2%)** | 0 |
| property | 5,089 | **460 (9.0%)** | 0 |

Every one of those 45 carries `web_sessions.bot_reason='ua_pattern'`. The session row classified them; the event rows did not inherit the flag. The Medical baseline noted a `web_events` / `web_sessions` session-count gap and attributed it to window-boundary sessions. Part of it is that. **This is the other part, and it is not a boundary effect.** It hits Trade twice as hard as Property because Trade's human volume is small enough for a fixed bot floor to matter.

**Every figure in this document uses the strict definition: `web_events.is_bot=false` AND `web_sessions.is_bot=false`.** Where the loose (`web_events`-only) figure differs materially I give both, because the estate's existing reads, including the Medical baseline and the §D ranking convention, use the loose one.

This was not an academic correction. See §E: the loose read produces a fake 11-click CTA cluster on `/glossary/eps` that is entirely synthetic, and would have sent the port after a conversion leak that does not exist.

## Definitions used

| Term | Definition | Source |
|---|---|---|
| session | distinct `web_events.session_id`, `web_events.is_bot=false` AND joined `web_sessions.is_bot=false`, in window | `web_events.session_id` |
| engaged session | `web_sessions` row, `is_bot=false`, `engaged_ms >= 10000` | `web_sessions.engaged_ms` |
| calculator viewed | session firing `calc_view` | `web_events.event_name` |
| calculator use | session firing `calc_input_change` or `calc_computed` (never a mere `calc_view`) | `web_events.event_name` |
| form surface seen | `form_step_view` event (this site's step event is `form_step_view`, not `step_view`) | `web_events.event_name` |
| form start | `form_start` event | `web_events.event_name` |
| form complete | `form_submit` event | `web_events.event_name` |
| lead | `leads` row, `source='construction-cis'`, `source <> 'test' AND coalesce(is_test,false) = false` (predicate copied verbatim from `supabase/migrations/20260819000003_test_leads_excluded_from_kpis.sql`) | `leads` |

---

## A. Trade vs Property, same window, post bot-gate

```sql
with e as (
  select e.site_key, e.session_id, e.page_path, e.event_name
  from web_events e
  join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
  where e.site_key in ('construction-cis','property')
    and e.is_bot=false and s.is_bot=false and e.ts>='2026-08-23')
select site_key,
 count(distinct session_id) sessions,
 count(distinct session_id) filter (where event_name='calc_view') calc_view_sess,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use_sess,
 count(*) filter (where event_name='calc_computed') calc_computed_ev,
 count(distinct session_id) filter (where event_name='form_start') form_start_sess,
 count(*) filter (where event_name='form_start') form_start_ev,
 count(*) filter (where event_name='form_submit') form_submit_ev,
 count(*) filter (where event_name='cta_click') cta_click_ev,
 count(*) filter (where event_name='lead_submitted') lead_submitted_ev
from e group by 1;
```
```sql
select site_key, count(*) sess, count(*) filter (where engaged_ms>=10000) engaged,
 count(*) filter (where country='GB') gb,
 count(*) filter (where country='GB' and engaged_ms>=10000) gb_engaged
from web_sessions where site_key in ('construction-cis','property')
 and is_bot=false and started_at>='2026-08-23' group by 1;
```

| Step | Trade | Trade rate | Property | Property rate | Ratio (Trade / Property) |
|---|---:|---|---:|---|---:|
| Sessions | **203** | - | **4,629** | - | 0.044x volume |
| Engaged (>=10s), all countries | 105 | 51.7% | 3,249 | 70.2% | 0.74x |
| Engaged (>=10s), GB only | 97 of 142 | 68.3% | 2,925 of 3,723 | 78.6% | 0.87x |
| Calculator viewed | 30 sess | 14.8% of sessions | 1,912 sess | 41.3% | **0.36x** |
| Calculator used | 3 sess | 1.48% of sessions | 255 sess | 5.51% | **0.27x** |
| Calculator used / viewed | - | 10.0% | - | 13.3% | 0.75x |
| Calculator computed (events) | 23 | 7.7 per using session | 2,804 | 11.0 | 0.70x |
| **Form starts** | **2 sess (2 ev)** | **0.99% of sessions** | **285 sess (301 ev)** | **6.16%** | **0.16x** |
| **Form completes** | **1 ev** | **50.0% of form-start sessions** | **51 ev** | **17.9%** | n/a, see below |
| Leads (KPI-clean) | 1 | **4.93 per 1,000 sessions** | 50 | **10.80 per 1,000** | **0.46x** |

Loose-definition equivalents, for continuity with existing estate reads: Trade 247 sessions / 1 lead = 4.05 per 1,000; Property 5,085 / 50 = 9.83 per 1,000. The ratio is the same either way (0.41x vs 0.46x). The correction does not change the verdict on volume; it changes the CTA read in §E.

`lead_submitted` events in the window: 1. That reconciles exactly with 1 `form_submit` event and 1 KPI-clean `leads` row (`3e700c86`, 2026-08-25, `/contact`). The bottom of the funnel is internally consistent. Nothing is being lost between the browser and the table.

### The funnel split, stated plainly

This is the number that located the problem on Solicitors and Medical. For Trade it points somewhere else.

| Stage rate | Trade | Property | Solicitors (from its Phase 0) |
|---|---|---|---|
| sessions -> form start | **0.99%** | 6.16% | not the leak there |
| form start -> form complete | 50.0% (1 of 2) | 17.9% | **4.5%, the leak** |

**Trade's 50% start-to-complete is one completion off two starts and carries no information.** A single event cannot distinguish a healthy form from a lucky one. Do not quote it as a strength, and do not let it be quoted back.

**The measurable leak on Trade is sessions -> form start: 0.99% against Property's 6.16%, a 6.2x gap, and it is the largest single ratio in the table.** 203 sessions produced two form starts in 19 days. Property's rate over 203 sessions would predict 12.5. The loss happens before anyone touches a field, which means it is a surfacing and offer-placement problem, not a form-mechanics problem. §C and §E say exactly where.

Supporting evidence that this is surfacing and not demand: the form surfaces are *rendering and being seen*. 53 `form_step_view` events fired in the window (42 on blog articles, 11 on calculators) and produced one start. People see the capture block and do not engage it.

```sql
select coalesce(e.props->>'form_id','(none)') form_id,
 count(*) filter (where e.event_name='form_step_view') step_view,
 count(*) filter (where e.event_name='form_field_focus') field_focus,
 count(*) filter (where e.event_name='form_start') form_start,
 count(*) filter (where e.event_name='form_error') form_error,
 count(*) filter (where e.event_name='form_submit') form_submit
from web_events e join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
where e.site_key='construction-cis' and e.is_bot=false and not s.is_bot and e.ts>='2026-08-23'
 and e.event_name like 'form%' group by 1 order by 2 desc;
```

| form_id | step_view | field_focus | form_start | form_error | form_submit | in Property's `MINIFORM_FORM_IDS`? |
|---|---:|---:|---:|---:|---:|---|
| inline_mini | 38 | - | 1 | 0 | 0 | yes |
| calc_result | 9 | - | 0 | 0 | 0 | **no** (deleted on Property 2026-08-22) |
| mobile_tool | 4 | - | 0 | 0 | 0 | yes |
| resource_block | 2 | - | 0 | 0 | 0 | yes |
| lead_form | - | 7 | 1 | 0 | **1** | no |

Two things to carry into the port. (1) **`inline_mini` is the site's only real blog capture surface and it is at 38 views, 1 start, 0 leads (2.6% start rate).** Same residual shape as Property's `resource_block` after the consent-wording incident. (2) **Trade still ships `calc_result`, which Property deleted estate-wide on 2026-08-22** (see the comment at `Property/web/src/config/deploy-watch.ts:149`). It has 9 step views and zero starts in the window, but it *did* produce a lead on 2026-08-20, pre-gate (`5ade5168`, `extras.form_id='calc_result'`, `/calculators/cis-sole-trader-vs-limited`). So it is not dead code, it is a live surface Property retired. **Decide deliberately in the port whether Trade keeps it; do not delete it as dead.** Zero `form_error` events anywhere on this site in the window, so Trade does *not* have Medical's `calc_result_gate` validation fault.

---

## B. Per template family, Trade (the phase-priority input)

```sql
with e as (select e.session_id, e.page_path, e.event_name from web_events e
 join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
 where e.site_key='construction-cis' and e.is_bot=false and s.is_bot=false and e.ts>='2026-08-23'),
f as (select case
  when page_path='/' then 'homepage'
  when page_path='/blog' or page_path ~ '^/blog/[^/]+$' then 'blog hub'
  when page_path like '/blog/%' then 'blog article'
  when page_path like '/calculators%' then 'calculator'
  when page_path like '%-template' then 'template page'
  when page_path='/for' then 'trade hub'
  when page_path like '/for/%' then 'trade page (/for/[slug])'
  when page_path like '/locations%' then 'location'
  when page_path in ('/services','/cis-refund','/gross-payment-status') then 'services/pillar'
  when page_path like '/research%' then 'research'
  when page_path like '/glossary%' then 'glossary'
  when page_path like '/contact%' then 'contact'
  else 'other' end fam, * from e)
select fam, count(distinct session_id) sessions, count(*) filter (where event_name='page_view') pv,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use,
 count(*) filter (where event_name='cta_click') cta,
 count(*) filter (where event_name='form_step_view') step_view,
 count(*) filter (where event_name='form_start') fs,
 count(*) filter (where event_name='form_submit') fc
from f group by 1 order by 2 desc;
```

Note the blog-hub branch: this site nests blog posts two levels deep (`/blog/<cluster>/<slug>`), so `/blog/cis-basics` is a cluster hub, not an article. The regex splits them correctly.

| Family | Sessions | Page views | Calc uses | CTA clicks | Form views | Form starts | Completes |
|---|---:|---:|---:|---:|---:|---:|---:|
| blog article | **110** | 103 | 0 | 14 | 42 | **1** | **0** |
| **template page** | **27** | 26 | 0 | **0** | **0** | **0** | **0** |
| trade page (`/for/[slug]`) | 24 | 24 | 0 | 2 | 0 | **0** | 0 |
| contact | 12 | 11 | 0 | 0 | 0 | 1 | **1** |
| trade hub (`/for`) | 9 | 8 | 0 | 0 | 0 | 0 | 0 |
| glossary | 9 | 9 | 0 | 0 | 0 | 0 | 0 |
| calculator | 7 | 9 | 3 | 0 | 11 | 0 | 0 |
| other (incl. `/about`, `/thank-you`, 404s) | 5 | 7 | 0 | 1 | 0 | 0 | 0 |
| homepage | **4** | 3 | 0 | **0** | 0 | 0 | 0 |
| blog hub | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| research | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| services/pillar | **1** | 2 | 0 | 0 | 0 | 0 | 0 |
| location | 1 | 1 | 0 | 1 | 0 | 0 | 0 |

Family session counts sum above 203 because a session spanning two families is counted in each.

### Property, same families, same window, as the benchmark

```sql
-- identical CASE minus the Trade-only branches, site_key='property', same strict join
```

| Family | Sessions | CTA clicks | Form views | Form starts | Completes | start rate |
|---|---:|---:|---:|---:|---:|---|
| blog article | 4,386 | 994 | 2,258 | 247 | 15 | 5.6% |
| homepage | 128 | 61 | 14 | 13 | 10 | 10.2% |
| other | 107 | 9 | 2 | 3 | 3 | 2.8% |
| calculator | 86 | 32 | 15 | 7 | 1 | 8.1% |
| contact | 66 | 8 | 2 | 26 | 18 | **39.4%** |
| services/pillar | 41 | 13 | 2 | 5 | 4 | 12.2% |
| location | 33 | 2 | 0 | 0 | 0 | 0% |
| blog hub | 2 | 0 | 0 | 0 | 0 | - |

### What the family table says

**1. Trade's traffic is in the blog body, same as every other site in the estate, and the blog body produces nothing.** 110 of 203 sessions (54%) are on a blog article. Those 110 sessions generated 42 form views, **1 start and 0 completions**. Property's blog articles convert sessions to starts at 5.6%; over 110 sessions that predicts 6.2 starts. One start against a predicted 6.2 is a real shortfall, not a sample artefact, though 1 event cannot tell you *which* component is at fault. This is the same shape Solicitors and Medical produced on the same family, with one difference worth noting: **Property's blog does complete (15 of 247), so the zero here is not "blogs never convert", it is "this blog's capture block does not work".**

**2. The template pages are the finding that is unique to Trade, and it is the cleanest one in this document.** `/cis-payment-deduction-statement-template` and `/cis-invoice-template` are the second-largest family at 27 sessions, they are the **highest-intent surface on the site** (a CIS subcontractor downloading a payment-and-deduction statement template is, definitionally, in scope for a CIS refund), and they have **zero capture of any kind**: no `form_step_view`, no `cta_click`, no `form_start`. The asset is handed over for free with no ask.

```sql
select e.props->>'nearest_text' t, e.page_path, count(*) n
from web_events e join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
where e.site_key='construction-cis' and e.is_bot=false and not s.is_bot
 and e.ts>='2026-08-23' and e.event_name='element_click' and e.page_path like '%-template'
group by 1,2 order by 3 desc;
```

| Click text | Page | Clicks |
|---|---|---:|
| Download Excel template (.xlsx) | `/cis-payment-deduction-statement-template` | **16** |
| Download PDF version | `/cis-payment-deduction-statement-template` | 5 |
| Get the templates | `/cis-invoice-template` | 3 |
| Excel (.xlsx) | `/cis-invoice-template` | 2 |
| PDF | `/cis-invoice-template` | 2 |
| (dismiss, `×`) | `/cis-payment-deduction-statement-template` | 5 |

**28 download clicks from 27 sessions, all human under the strict definition, all of them through generic `element_click` with no `data-cta` and no form gate.** And none of those 27 sessions ever reached `/contact`:

```sql
with s as (select distinct e.session_id from web_events e
  join web_sessions w on w.session_id=e.session_id and w.site_key=e.site_key
  where e.site_key='construction-cis' and e.is_bot=false and not w.is_bot
    and e.ts>='2026-08-23' and e.page_path like '%-template')
select count(distinct e.session_id) sess,
 count(distinct e.session_id) filter (where e.page_path like '/contact%') reached_contact,
 count(*) filter (where e.event_name='form_start') starts
from web_events e join s on s.session_id=e.session_id
where e.site_key='construction-cis';
-- -> sess 27, reached_contact 0, starts 0
```

Medical's equivalent surface (`blog_mid_resource`, 95 step views) at least *asks*. Trade's does not ask at all. 28 people took the thing and left.

**3. The homepage and the pillars are invisible, and that is a traffic fact, not a conversion fact.** Homepage 4 sessions. `/services` + `/cis-refund` + `/gross-payment-status` combined: **1 session** in 19 days (all-time, ungated, those three paths have 12, 4 and 7 sessions respectively since mid-June). Nothing about these templates can be concluded from 1 session, in either direction. Redesigning the homepage on this site buys almost nothing directly, because almost nobody sees it. Sitewide chrome, which every one of the 203 sessions does see, is a different matter.

**4. Trade pages (`/for/[slug]`) are the third family and they have no capture either.** 24 sessions across 19 distinct trade slugs, 2 CTA clicks, 0 form views, 0 starts. Traffic is spread one session per slug, so no individual page is readable, but the family total is large enough to say the *template* presents no form. Property has no equivalent family to benchmark against.

**5. Two families had real traffic and zero CTA clicks at all: template pages (27) and trade pages beyond 2 clicks (24).** Compare Property's blog at 994 CTA clicks off 4,386 sessions (22.7%) against Trade's blog at 14 off 110 (12.7%). The gap is real but modest; the *absence* on the template and trade families is the outlier.

**6. Not enough data to say anything, and explicitly not a zero:** blog hub (2), research (2), services/pillar (1), location (1), glossary (9), trade hub (9), calculator (7). `/resources` and `/book` exist as routes (`construction-cis/web/src/app/resources`, `.../book`) and have **no recorded page view, ever, under any bot definition.** That is a question, not a finding: it could be unlinked, noindex, or simply never found. Not resolved here.

---

## C. `data-cta` reality check

**Scope statement, per the brief: this section reports only what the database recorded. It is not a source inventory.** A separate agent is inventorying the `data-cta` attributes present in the code. Consequently **this section cannot report a NEVER-FIRED count**: an id that exists in the source and has never fired produces no row in `web_events` and is invisible from here. The classification below covers the 8 ids the database knows about, all time.

```sql
select coalesce(e.props->>'cta_id','(none)') cta,
 count(*) filter (where e.ts>='2026-08-23' and not s.is_bot) n_window_clean,
 count(*) filter (where e.ts>='2026-08-23') n_window_loose,
 count(*) all_time, min(e.ts)::date first, max(e.ts)::date last
from web_events e join web_sessions s on s.session_id=e.session_id and s.site_key=e.site_key
where e.site_key='construction-cis' and e.event_name='cta_click'
group by 1 order by 2 desc, 4 desc;
```

| cta id | Window (strict) | Window (loose) | All-time (first..last) | Classification |
|---|---:|---:|---|---|
| `deep_scroll_close` | **14** | 14 | 26 (2026-06-29 .. 2026-09-10) | **LIVE** |
| `specialist_widget` | 2 | 2 | 8 (2026-08-01 .. 2026-09-08) | **LIVE** (thin) |
| `header_nav_primary` | 2 | 2 | 8 (2026-08-17 .. 2026-08-25) | **LIVE** (thin) |
| `assistant_contact` | **0** | **11** | 34 (2026-07-08 .. 2026-08-28) | **DORMANT, and its window activity is synthetic. See below.** |
| `assistant_question` | 0 | 0 | 2 (2026-08-01 .. 2026-08-17) | DORMANT |
| `assistant_calculator` | 0 | 0 | 1 (2026-07-30) | DORMANT |
| `next_step` | 0 | 0 | 1 (2026-07-14) | DORMANT |
| `returning_bar_close` | 0 | 0 | 1 (2026-08-19) | DORMANT |

**Counts: 3 LIVE, 5 DORMANT, NEVER-FIRED not determinable from the database (see scope statement).** Zero `cta_click` rows carry a null `cta_id`, so there is no `(none)` bucket: every recorded CTA click on this site is attributed.

**The `assistant_contact` cluster is synthetic and must not be read as a conversion leak.** Under the loose definition it is the site's second-busiest CTA: 11 clicks in the window, all from `/glossary/eps`, and all 11 sessions go on to load `/contact` and none of them start a form. That reads as a screaming leak: "the assistant CTA delivers people to the contact page and the contact page does not convert them." It is not. All 11 sessions carry `web_sessions.is_bot=true, bot_reason='ua_pattern'`, and they are fingerprint-identical:

```sql
select session_id, started_at, device_type, ua_family, os_family, country,
       viewport_w, viewport_h, referrer_host, is_bot, bot_reason, engaged_ms
from web_sessions where site_key='construction-cis' and session_id in (
  select session_id from web_events where site_key='construction-cis'
   and event_name='cta_click' and props->>'cta_id'='assistant_contact' and ts>='2026-08-23');
```

All 11: desktop / Chrome / Windows / `country='US'` / viewport exactly 1366x768 / `referrer_host='www.tradetaxspecialists.co.uk'` / `engaged_ms=0`, spread one at a time across 2026-08-26 to 2026-08-28. Each session is exactly 10 events and exactly 2 paths. The trace of one of them:

```
03:35:36 /glossary/eps  page_view        is_entry=true, referrer=""
03:35:36 /glossary/eps  support_opened   via=auto
03:35:37 /glossary/eps  engagement_time  cumulative_ms=0, first_input=true
03:35:37 /glossary/eps  element_click    selector=a.inline-flex, nearest_text="Get in touch"
03:35:37 /glossary/eps  cta_click        cta_id=assistant_contact, placement=assistant_card
03:35:41 /contact       page_view        referrer=.../glossary/eps
```

One second from load to click, five seconds to navigate, zero engaged time, no external referrer, 03:35 UTC. That is automation, and `web_sessions` already classified it. **This is the concrete cost of the half-applied gate from the header section: the loose read would have pointed the port at a `/contact` form that was never actually touched by a human in this cluster.**

Two further instrumentation facts from the event record:

- **`deep_scroll_close` is the busiest CTA on Trade, and it is a dismissal.** 14 of the site's 18 clean CTA clicks (78%) are someone closing the deep-scroll modal. Per route: `/blog/cis-basics/cis-invoice-splitting-labour-materials` 5, `/blog/cis-basics/what-construction-work-is-not-cis` 4, `/blog/software-and-tools/quickbooks-cis-guide` 2, `/for/landscapers` 1, `/blog/software-and-tools/xero-cis-guide` 1, `/blog/cis-basics/cis-vs-paye-complete-comparison` 1. **The matching `deep_scroll_modal` open id has never fired on this site at all, so the modal's open rate is unmeasurable and the 14 dismissals have no denominator.** Worth recording against the Medical baseline, which left `deep_scroll_close` unresolved after it stopped dead on 2026-08-22: on Trade the same id is firing through 2026-09-10. That makes "component removed estate-wide on 08-22" less likely as the Medical explanation, though it does not settle it, because the component could have been removed on Medical only.
- **The site's highest-value clicks fire as `element_click` with no `cta_id`.** The template downloads in §B (28 clicks) and the calculator control interactions are all generic `element_click` rows carrying `selector` and `nearest_text` but no `cta_id`. They were recoverable here only because `element_click` happens to capture `nearest_text`. **You cannot read conversion lift on the template pages after the port, because nothing on them is instrumented as a CTA.** Port time is the cheapest moment to add the attributes.

---

## D. Estate ranking, leads per 1,000 sessions, same window

Loose definition, to stay comparable with the Medical baseline's §D.

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
| 1-5 | charities / agency / hospitality / startups-tech / ecommerce | 236 / 128 / 87 / 63 / 51 | 0 | 0.00 |
| 6 | solicitors | 1,765 | 2 | 1.13 |
| 7 | generalist | 1,462 | 5 | 3.42 |
| 8 | **construction-cis** | **247** | **1** | **4.05** |
| 9 | dentists | 450 | 2 | 4.44 |
| 10 | property | 5,085 | 50 | 9.83 |
| 11 | medical | 394 | 5 | 12.69 |
| 12 | pharmacies | 58 | 1 | 17.24 |
| 13 | contractors-ir35 | 129 | 4 | 31.01 |
| 14 | crypto | 32 | 1 | 31.25 |
| 15 | care | 53 | 2 | 37.74 |

Trade ranks 8th of 15, i.e. mid-table, on a single lead. Its rate is indistinguishable from dentists (4.44) and better than solicitors (1.13) and generalist (3.42), all of which have more traffic. The sites above it other than Property and Medical rank on 1 to 4 leads at 32 to 129 sessions, which is noise. **The honest summary of this table for Trade is: one lead is not a rate.** It is consistent with being a mid-table converter and it rules nothing out.

---

## E. Lead volume and shape, all time

```sql
select id, created_at, source_url, status, is_test, extras::text from leads
where source='construction-cis' order by created_at desc;
select count(*) n, min(created_at)::date first, max(created_at)::date last
from leads where source='construction-cis';
```

**Three leads, ever. First one 2026-08-17. Last one 2026-08-25.** None are test rows; all three are KPI-clean.

| id | created | surface | form | status | extras |
|---|---|---|---|---|---|
| `3e700c86` | 2026-08-25 10:36 UTC | `/contact` | `lead_form` | contactable | `trade: Groundworkers` |
| `5ade5168` | 2026-08-20 06:02 UTC | `/calculators/cis-sole-trader-vs-limited` | **`calc_result`** | nurturing | `form_id: calc_result` |
| `a1937dd2` | 2026-08-17 06:47 UTC | `/contact` | `lead_form` | contactable | `trade: Scaffolders`, free-text situation |

**This site has a 26-day lead history and one lead inside the post-gate window.** That is the governing constraint on this entire document and it must be stated to the orchestrator without softening. Two of the three leads pre-date the bot gate, which does not invalidate them (leads are not bot-inflated the way sessions are) but does mean only one of them sits inside any window whose session denominator is trustworthy.

**Suspect / honeypot count: zero.** No row carries a `honeypot` key in `extras`. This is a real absence, not a missing field: the key exists in the estate schema and Solicitors has a `honeypot: true` row in the same period, so the query would have surfaced it.

Against the standing rule that partner outreach is off the table below 5 leads per month: **Trade is at roughly 1.1 leads per month measured over its 26-day lead history, and 1 lead in 19 days post-gate.** It is far below the line. Two consequences for the port, both of which cut in the same direction as §F: the downside risk of a conversion regression here is near-zero realised revenue, so this is a **low-risk site to port aggressively**, and conversely **no post-cutover conversion read will be statistically available for months**. Plan the verification accordingly: instrument now, measure engagement and CTA-click rates at the gates rather than leads, and do not set a lead-count gate that cannot be met.

---

## F. Registry and deploy-watch check

```sql
select site_key, gsc_property_url, bing_property_url, active from sites
where site_key in ('construction-cis','property');
select status, count(*) from monitored_pages where site_key='construction-cis' group by 1;
select watch_key, started_at, gate_day, status, verdict from deploy_watch order by started_at desc;
```

| site_key | gsc_property_url | bing_property_url | active |
|---|---|---|---|
| construction-cis | `sc-domain:tradetaxspecialists.co.uk` | NULL | true |

The GSC property matches the site's domain from `niche.config.json`. `bing_property_url` is NULL for every active site by estate convention (Bing is reached through `bing_query_client`); not a Trade defect, no action.

`monitored_pages` for construction-cis: **8 `active`, 7 `flagged`.** Pages inside a live monitor window are immature by definition and nothing above condemns an individual page. The 7 flagged rows were not investigated here and are out of scope for a funnel baseline; they are named so they are not mistaken for a port regression later.

`deploy_watch` holds 6 rows total and **no open watch of any kind.** Four `miniform_multistep` rows are Property's (all `sent`, day-28 gate PASS, complete); `agency_fixwave` and `medical_fixwave` are both `skipped`. **There has never been a construction-cis watch.** The hardcode is still in place, verified today:

```ts
// Property/web/src/app/api/cron/deploy-watch/route.ts:100
      site_key: "eq.property",
```

That is the only watch implementation in the repo, so it cannot fire on Trade's data. Stated plainly: a Trade port **cannot** trip a false ACTION-NEEDED email at the owner through this path (no noise risk), and a Trade port gets **no automated regression detection at all**. Given §E, the second half matters less here than it did on Medical, because there is almost no realised revenue to protect. The cheap answer is hand-run day-3/7/14/28 checks; generalising the watch off the hardcode is not justified by this site's lead volume.

If the watch is ever extended to Trade, note that `BASELINE_MINIFORM_LEADS_28D = 15` is derived from Property's id set and Property's volume. Trade's 28-day miniform lead count is **zero**. A naive extension compares zero against fifteen and emails the owner every gate day for a fault that does not exist.

---

## G. Verdict

**Trade's leak is sessions -> form start: 0.99% against Property's 6.16%, a 6.2x gap, and nothing below that point is measurable (2 starts, 1 completion, 3 leads ever). So the port's conversion upside is entirely in getting the offer in front of people, not in the form.**

**The phase that carries the most upside is the one that puts a capture surface on the template and trade-page families and fixes the blog capture block.** 27 sessions download a CIS statement template with zero ask, zero CTA instrumentation and zero of them reaching `/contact`; 24 sessions hit `/for/[slug]` pages with no form at all; 110 blog sessions see 42 form views and produce one start. Those three families are 161 of 203 sessions (79%).

**Deprioritise the homepage and the pillars.** 4 sessions on `/` and 1 across `/services` + `/cis-refund` + `/gross-payment-status` in 19 days. Sitewide chrome still earns its phase because all 203 sessions see it; the homepage as a page does not.

**Two preconditions before any cutover claim.** Fix the half-applied bot gate (`web_events.is_bot` does not inherit `web_sessions.is_bot`; 18% of Trade's nominal sessions are misclassified) or every post-port rate will be wrong in the same direction. And add `data-cta` to the template downloads, which are the site's highest-intent clicks and are currently invisible as CTAs.

---

## UNVERIFIED / NOT DERIVED

| Item | Why |
|---|---|
| NEVER-FIRED `data-cta` ids | **Not determinable from the database.** An id present in source that has never fired leaves no `web_events` row. Per the brief, this section was confined to recorded events; the source inventory is another agent's output. Cross-reference the two before acting. |
| Why `web_events.is_bot` does not inherit `web_sessions.is_bot` | Established as a fact (45/247 Trade, 460/5,089 Property). Whether it is a backfill gap, an ordering race at ingest, or intended behaviour was not investigated. It is an estate-wide issue, not a Trade issue, and it is larger than this port. |
| Whether the 11-session `assistant_contact` cluster is the only such cluster | Found because it was anomalous. No systematic scan for other fingerprint-identical clusters was run, on Trade or on Property. Property's 460 misclassified sessions were not characterised at all. |
| Root cause of the blog-article zero: which component, which placement | 110 sessions, 42 `inline_mini` views, 1 start, 0 completions. The shortfall against Property's 5.6% start rate is real; the attribution to a specific component is Phase 1 work. |
| Whether Trade should keep `calc_result` | Property deleted it estate-wide 2026-08-22; Trade still ships it and it produced a lead on 2026-08-20. Flagged as a deliberate port decision, not resolved. |
| `deep_scroll_modal` open rate | The open id has **never** fired on this site. So the 14 `deep_scroll_close` dismissals have no denominator and the modal's open rate is unknown. Cannot say whether 14 dismissals is most of the opens or a small fraction. |
| Whether `/resources` and `/book` are broken, unlinked or noindex | Both routes exist in `construction-cis/web/src/app/`. Neither has a single recorded page view, ever, under any bot definition. A genuine absence of data, not a zero-conversion finding. Needs a link/sitemap check, not run. |
| `/services`, `/cis-refund`, `/gross-payment-status` template quality | 1 session between them in the window. No conclusion possible in either direction. Not a zero, an absence. |
| The 7 `flagged` `monitored_pages` rows | Named in §F, not investigated. Out of scope for a funnel baseline; flagged so a later reader does not mistake them for port damage. |
| Significance of any Trade rate | No significance test run anywhere in this document. On 2 form starts, 1 completion and 3 lifetime leads, confidence intervals would be wider than the claims. Every Trade rate here is directional. |
| Search-side figures (impressions, clicks, position) | Out of scope for a funnel baseline. No GSC or Bing pull run, no stored snapshot repeated. |
| A 404 rate | `element_click` rows show at least one session on a "Page not found." page, and `/blog/cis-basics/what-construction-work-is-not-cis)` appears in the path list with a stray closing parenthesis, implying a malformed inbound or internal link. Not quantified, not chased. |
| Pre-bot-gate comparison for Trade | Deliberately not derived. Pre-2026-08-23 traffic is bot-inflated; mixing it in would corrupt every rate here. The only pre-gate figures quoted anywhere above are lead rows and CTA first-seen dates, both of which are labelled as such. |
