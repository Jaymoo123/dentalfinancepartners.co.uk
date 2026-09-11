# Dentists design port - Phase 0 funnel and analytics baseline

Pulled 2026-09-11. READ-ONLY. Site: `dentists` (Dental Finance Partners, www.dentalfinancepartners.co.uk).

**`source_identifier` VERIFIED as `dentists`, from three independent places:**
- `Dentists/niche.config.json` -> `"niche_id": "dentists"`.
- `Dentists/web/src/app/api/leads/submit/route.ts:28` -> `createLeadSubmitHandler({ source: "dentists" })`, and `:67` defaults `body.source ?? "dentists"`. That is what the pipeline actually writes.
- `leads` rows in the database carry `source='dentists'` (7 rows in 90 days, section E).
- `web_events.site_key` is `dentists` (39,306 rows). Same key both sides.

**Window on every funnel claim below: 2026-08-23 00:00 UTC to 2026-09-11 (pull time), 19 days.**
The window starts on the bot-gate landing date. Nothing here spans it, so nothing here is inflated. Pre-gate figures are never mixed in. Search-side figures carry their own data-through dates (GSC 2026-09-05, Bing 2026-09-07) and are stated inline.

Every figure is a fresh Supabase read via `python scripts/_q.py -`; the query that produced it is inline. No stored GSC snapshot is repeated as a conclusion anywhere.

---

## A. CTA inventory

This is the section the port is most likely to break. Adopting the kit chrome rewrites live `vw_cta_performance` segmentation without changing a single button, destination or id.

### Source

```bash
grep -rn 'data-cta=' Dentists/web/ --include=*.tsx --include=*.ts
grep -rnE "cta_id: *['\"\`]" Dentists/web/src packages/web-shared --include=*.ts --include=*.tsx
```

### Events

```sql
select coalesce(props->>'cta_id','(none)') cta,
       count(*) filter (where ts>=now()-interval '90 days') n90,
       count(*) filter (where ts>=now()-interval '30 days') n30,
       count(*) all_time, min(ts)::date first, max(ts)::date last
from web_events where site_key='dentists' and event_name='cta_click'
group by 1 order by n90 desc, all_time desc;
```

```sql
select coalesce(props->>'cta_id','(none)') cta, props->>'goal' goal,
       props->>'placement' placement, count(*) n, max(ts)::date last
from web_events where site_key='dentists' and event_name='cta_click'
  and ts>=now()-interval '90 days' group by 1,2,3 order by n desc;
```

**Retention caveat, stated before the table.** `select min(ts)::date from web_events where site_key='dentists'` returns **2026-06-11**. For every id `all_time` equals `n90`. So "never fired" below means "no recorded click since 2026-06-11", not "no click in the site's life". That is 92 days of evidence, which is enough to act on, but it is not an all-time claim.

Classification rule used: **live** = at least one click in the last 30 days; **dormant** = clicks in the 90-day record but none in the last 30; **never-fired** = zero clicks in the record.

| # | cta id | file:line | `data-cta-goal` | `data-cta-placement` | Class |
|---:|---|---|---|---|---|
| 1 | `deep_scroll_close` | `Dentists/web/src/components/intent/DeepScrollModal.tsx:99` | *(absent)* | *(absent)* | **LIVE** (101 / 56 in 30d) |
| 2 | `see_result` | `Dentists/web/src/components/tools/premium/PremiumCalculator.tsx:659` | *(absent)* | *(absent)* | **LIVE** (35 / 20) |
| 3 | `specialist_widget` | `Dentists/web/src/components/support/SpecialistWidget.tsx:515` | *(absent)* | *(absent)* | **LIVE** (10 / 3) |
| 4 | `sticky_cta` | `Dentists/web/src/components/ui/StickyCTA.tsx:155` | `:158` dynamic - `"form"` if href starts `/contact`, else attribute omitted | `"sticky"` (`:156`) | **LIVE** (5 / 4) |
| 5 | `header-nav-cta` | `Dentists/web/src/components/layout/SiteHeader.tsx:104` | `:105` dynamic - `"contact"` if href starts `/contact`, else `"pricing"`. **Resolves to `contact` on Dentists.** | `"header"` (`:104`) | **LIVE** (3 / 1) |
| 6 | `deep_scroll_modal` | `Dentists/web/src/components/intent/DeepScrollModal.tsx:113` | `:114` dynamic - `"form"` or omitted | *(absent)* | **LIVE** (2 / 1) |
| 7 | `next_step` | `Dentists/web/src/components/intent/NextStepOffer.tsx:38` | `:39` dynamic - `"form"` or omitted | *(absent)* | **LIVE** (1 / 1) |
| 8 | `calculator-page-cta` | `Dentists/web/src/app/calculators/[slug]/page.tsx:162` | *(absent)* | *(absent)* | **DORMANT** (1 event, 2026-06-19, none since) |
| 9 | `hero_primary` | `Dentists/web/src/app/page.tsx:272` | *(absent)* | `"hero"` | **NEVER FIRED** |
| 10 | `hero_secondary` | `Dentists/web/src/app/page.tsx:281` | *(absent)* | `"hero"` | **NEVER FIRED** |
| 11 | `home_cta_primary` | `Dentists/web/src/app/page.tsx:526` | *(absent)* | `"home_cta"` | **NEVER FIRED** |
| 12 | `home_cta_secondary` | `Dentists/web/src/app/page.tsx:535` | *(absent)* | `"home_cta"` | **NEVER FIRED** |
| 13 | `header_nav_secondary` | `Dentists/web/src/components/layout/SiteHeader.tsx:95` | `"contact"` (literal) | `"header"` | **NEVER FIRED** |
| 14 | `header-mobile-cta` | `Dentists/web/src/components/layout/SiteHeader.tsx:185` | `:186` dynamic - `"contact"` / `"pricing"`. **Resolves to `contact`.** | `"header_mobile"` (`:185`) | **NEVER FIRED** |
| 15 | `header_mobile_secondary` | `Dentists/web/src/components/layout/SiteHeader.tsx:196` | `"contact"` (literal) | `"header_mobile"` | **NEVER FIRED** |
| 16 | `contact_pricing_link` | `Dentists/web/src/app/contact/page.tsx:46` | *(absent)* | `"contact"` (`:47`) | **NEVER FIRED** |
| 17 | `cta-section-primary` | `Dentists/web/src/components/ui/CTASection.tsx:45` | *(absent)* | *(absent)* | **NEVER FIRED** |
| 18 | `thankyou-return-article` | `Dentists/web/src/app/thank-you/page.tsx:171` | *(absent)* | `"thank_you"` | **NEVER FIRED** |
| 19 | `returning_bar` | `Dentists/web/src/components/intent/ReturningBar.tsx:50` | `:51` dynamic - `"form"` or omitted | *(absent)* | **NEVER FIRED** |
| 20 | `returning_bar_close` | `Dentists/web/src/components/intent/ReturningBar.tsx:60` | *(absent)* | *(absent)* | **NEVER FIRED** |

**JS-only class - fires `cta_click` with no `data-cta` attribute anywhere in the DOM.** These will be invisible to any attribute diff of the ported build, and a port that rewrites these components silently kills the site's three busiest instrumented interactions after `deep_scroll_close`.

| cta id | file:line | Placement sent | Class |
|---|---|---|---|
| `result_gate_skip` | `Dentists/web/src/components/tools/premium/ResultGateModal.tsx:60` (and the shared twin at `packages/web-shared/leads/ResultGateModal.tsx:32`) | `"result_gate"` | **LIVE** (34 / 19) |
| `assistant_question` | `Dentists/web/src/components/support/SpecialistWidget.tsx:290`, id built as `` `assistant_${goal}` `` | `"assistant_card"` | **LIVE** (4 / 2) |
| `assistant_calculator` | same line, same template literal | `"assistant_card"` | **LIVE** (1 / 1) |

**Headline counts: 20 literal `data-cta` ids. 7 live, 1 dormant, 12 never-fired. Plus 3 JS-only ids, all 3 live (and one dynamic id family, `assistant_${goal}`, that can emit more values than the two observed).**

### Corrections to the brief

1. **19 distinct `data-cta` values is wrong. There are 20.** `grep -c` on the sorted-unique list returns 20 (`calculator-page-cta`, `contact_pricing_link`, `cta-section-primary`, `deep_scroll_close`, `deep_scroll_modal`, `header-mobile-cta`, `header-nav-cta`, `header_mobile_secondary`, `header_nav_secondary`, `hero_primary`, `hero_secondary`, `home_cta_primary`, `home_cta_secondary`, `next_step`, `returning_bar`, `returning_bar_close`, `see_result`, `specialist_widget`, `sticky_cta`, `thankyou-return-article`).
2. **`data-cta-goal` does NOT have exactly one value.** A literal grep for `data-cta-goal="..."` finds only 2 occurrences, both `"contact"`, which is where that claim comes from. **Six further `data-cta-goal` attributes are JSX expressions and a literal grep cannot see them**: `SiteHeader.tsx:105` and `:186` (`"contact"` / `"pricing"`), `StickyCTA.tsx:158`, `DeepScrollModal.tsx:114`, `NextStepOffer.tsx:39`, `ReturningBar.tsx:51` (each `"form"` or attribute omitted). The rendered vocabulary on Dentists is `contact` and `form`, and `pricing` is reachable only if the site ever switches `cta.variant` to `packages`. The recorded events confirm both: `sticky_cta` carries `goal=form`, `header-nav-cta` carries `goal=contact`.
3. **The 7 `data-cta-placement` values are confirmed correct**: `contact, header, header_mobile, hero, home_cta, sticky, thank_you`. There is no eighth.
4. **The mobile-drawer CTA was read from source, not from a crawl, as instructed.** `SiteHeader.tsx:182-199` renders inside `{open ? ... : null}`. `header-mobile-cta` carries `data-cta-placement="header_mobile"` and `header_mobile_secondary` carries `data-cta-placement="header_mobile"` with a literal `data-cta-goal="contact"`. Neither has ever fired.

### What the kit would change, and the locked values

`packages/web-shared/design/chrome/SiteHeader.tsx:342-343`:

```ts
  ctaContactGoal = "form",
  ctaMobilePlacement = "mobile_menu",
```

used at `:437`, `:465` (goal) and `:606` (drawer placement). Adopted with those defaults, every Dentists header CTA pointing at `/contact` would start reporting `goal=form` instead of `goal=contact`, and the drawer CTA would report `placement=mobile_menu` instead of `placement=header_mobile`. Same buttons, same hrefs, split history.

Dentists is in `leadgen` variant (`Dentists/niche.config.json` -> `cta.variant: "leadgen"`), whose `header_primary.href` is `/contact`, so the `startsWith("/contact")` branch is the live one on every route.

**LOCKED PRE-PORT RECORD. Dentists must pass these to the kit `SiteHeader`:**

```tsx
ctaContactGoal="contact"
ctaMobilePlacement="header_mobile"
```

Do not accept the kit defaults. Do not "tidy" these to the kit values later; they are the site's live analytics vocabulary, not a style choice.

### Caveat on the never-fired set, stated as a caveat

Twelve ids with zero clicks in 92 days includes every hero button, both homepage CTAs, the mobile header pair and the shared `CTASection` primary. `header-nav-cta` DOES fire (3 events) while its mobile sibling and both secondaries never have, which points at unwired rather than unclicked - but that is an inference. The homepage row in section B agrees from the other side: **17 sessions on `/`, 17 page views, zero form starts and zero CTA clicks of any kind.** Proving it needs a click test on a live page, which was not run here.

Consequence for the port: the hero, homepage-CTA and mobile-header surfaces currently have **no baseline at all**. Any "lift" measured on them after the port is the instrumentation landing, not the design. Wire them in the port or accept that those surfaces stay unreadable.

### Trap 4 note

`vw_cta_performance` groups by `(site_key, country, cta_id, goal)` with no `page_path`. Every per-route reading above came from `web_events` directly. Note also that `packages/web-shared/analytics/autoCapture.ts:106` falls back to `nearestSection(cta)` when `data-cta-placement` is absent - which is why `see_result` reports placements like `"Free NHS contracts and pensions tool"`. Those are section headings, not placement values, and adding an explicit `data-cta-placement` to those ids in the port would itself split their history.

---

## B. Conversion baseline

```sql
with e as (
  select site_key, session_id, page_path, event_name from web_events
  where site_key in ('dentists','property') and is_bot=false
    and ts>='2026-08-23' and ts<now())
select site_key,
 count(distinct session_id) sessions,
 count(distinct session_id) filter (where event_name='calc_view') calc_view_sess,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use_sess,
 count(distinct session_id) filter (where event_name='form_start') form_start_sess,
 count(*) filter (where event_name='form_start') form_start_ev,
 count(*) filter (where event_name='form_submit') form_submit_ev,
 count(*) filter (where event_name='lead_submitted') lead_ev
from e group by 1;
```

```sql
with s as (select site_key, count(distinct session_id) sessions from web_events
           where is_bot=false and ts>='2026-08-23' group by 1),
l as (select source, count(*) leads from leads where created_at>='2026-08-23'
      and source<>'test' and coalesce(is_test,false)=false group by 1)
select s.site_key, s.sessions, coalesce(l.leads,0) leads,
 round(coalesce(l.leads,0)*1000.0/nullif(s.sessions,0),2) per1k
from s left join l on l.source=s.site_key
where s.site_key in ('dentists','property') order by per1k;
```

**Window 2026-08-23 to 2026-09-11 (19 days), data through 2026-09-11 (pull time), post bot-gate only.**

| Step | Dentists | Dentists rate | Property | Property rate | Dentists vs Property |
|---|---:|---|---:|---|---|
| Sessions | 450 | - | 5,086 | - | 0.088x volume |
| Calculator page viewed | 165 sess | 36.7% | 1,911 sess | 37.6% | **1.00x - parity** |
| Calculator actually used | 34 sess | 7.56% | 255 sess | 5.01% | **1.51x - Dentists better** |
| Calc used / calc viewed | - | 20.6% | - | 13.3% | **1.55x - Dentists better** |
| Form starts | 29 sess (30 ev) | 6.44% of sessions | 285 sess (301 ev) | 5.60% | **1.15x - Dentists better** |
| Form completes | **2** ev | **6.9% of form-start sessions** | 51 ev | **17.9%** | **0.39x - Dentists worse** |
| `lead_submitted` events | 2 | - | 50 | - | reconciles |
| **Leads (KPI-clean)** | **2** | **4.44 per 1,000 sessions** | **50** | **9.83** | **0.45x, a 2.2x gap** |

Bottom-of-funnel reconciliation: 2 `form_submit`, 2 `lead_submitted`, 2 KPI-clean `leads` rows. Nothing is lost between the browser and the table.

KPI predicate used for leads: `source='dentists' and source <> 'test' and coalesce(is_test,false) = false`, copied from `supabase/migrations/20260819000003_test_leads_excluded_from_kpis.sql`.

### By template family (Dentists, same window)

```sql
with e as (select session_id, page_path, event_name from web_events
  where site_key='dentists' and is_bot=false and ts>='2026-08-23'),
f as (select case
  when page_path='/' then 'homepage'
  when page_path='/blog' or page_path like '/blog/page%' then 'blog hub'
  when page_path like '/blog/%' then 'blog article'
  when page_path='/dental-guides' then 'pillar hub'
  when page_path like '/dental-guides/%' then 'pillar guide'
  when page_path like '/calculators%' or page_path like '%calculator%' or page_path like '/tools%' then 'calculator'
  when page_path like '/services%' then 'services'
  when page_path like '/contact%' then 'contact'
  when page_path like '/locations%' or page_path like '/accountants-in%' or page_path like '/dental-accountants-%' then 'location'
  when page_path like '/free-practice-health-check%' then 'health check'
  else 'other' end fam, * from e)
select fam, count(distinct session_id) sessions,
 count(*) filter (where event_name='page_view') pv,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use,
 count(*) filter (where event_name='form_start') form_start,
 count(*) filter (where event_name='form_submit') form_submit
from f group by 1 order by 2 desc;
```

| Family | Sessions | Page views | Calc uses | Form starts | Form completes |
|---|---:|---:|---:|---:|---:|
| blog article | 374 | 342 | 15 | **24** | **0** |
| calculator | 38 | 55 | 19 | 4 | **0** |
| homepage | 17 | 17 | 0 | **0** | 0 |
| other | 16 | 14 | 0 | 0 | 0 |
| services | 15 | 18 | 0 | 0 | 0 |
| pillar guide (`/dental-guides/*`) | 7 | 9 | 0 | 0 | 0 |
| contact | 6 | 7 | 0 | 2 | **2** |
| health check | 5 | 4 | 0 | 0 | 0 |
| location | 4 | 4 | 0 | 0 | 0 |
| pillar hub (`/dental-guides`) | 2 | 3 | 0 | 0 | 0 |
| blog hub | 1 | 1 | 0 | 0 | 0 |

### Where the leak is

**The leak is start-to-complete, and it is concentrated in blog articles. It is the solicitors shape, not the medical shape.**

- Dentists gets people to a form **better** than Property does (6.44% of sessions vs 5.60%) and gets them to use a calculator **better** than Property does (7.56% vs 5.01%, and 20.6% of calc viewers vs 13.3%). The top and middle of this funnel are not the problem. They are the site's strongest parts.
- Dentists converts a started form at **6.9%** against Property's **17.9%**. That single step accounts for essentially the whole 2.2x lead-rate gap: at Property's completion rate, 29 starting sessions would have produced ~5 leads rather than 2, which is 11.5 per 1,000 and above Property.
- **83% of sessions (374/450) land on a blog article. Blog articles produced 24 of the 30 form starts and zero completions.** Both completions came from `/contact`, a page that saw 6 sessions.
- The dedicated calculator routes produced 4 starts and zero completions off 38 sessions.

Statistical honesty: 24 starts at Property's blog-article completion rate would predict ~1.5 completions, so **zero is not on its own proof of a broken template** - but it is the third site in a row (solicitors 40/0, medical 9/0, dentists 24/0) to show exactly this on exactly this family. Three independent zeros on the same template is no longer coincidence-shaped. Treat it as the priority to instrument and test, not yet as a diagnosed defect.

**What this means for the sequencing of the port.** The phase that matters on Dentists is whatever touches the in-article form and the blog-article CTA block. Chrome, tokens and nav restyling will not move this number, because the number is not lost at the top. A port that rebuilds the calculator surface risks damaging the one thing Dentists already does better than Property (calc use per viewer, 1.55x). Verify calc-use-per-viewer and form-start rate have not moved after cutover before crediting any lead-rate change to the design.

---

## C. Armed monitored-page windows

```sql
select status, count(*) n, min(monitor_until) mn, max(monitor_until) mx
from monitored_pages where site_key='dentists' group by 1 order by 2 desc;
```
| status | rows | min `monitor_until` | max |
|---|---:|---|---|
| active | 43 | 2026-09-10 | 2026-10-07 |
| flagged | 10 | 2026-09-10 | 2026-10-06 |

```sql
select page_url, slug, monitor_until, rewrite_type, status from monitored_pages
where site_key='dentists' and monitor_until>=current_date order by monitor_until;
```

**As of 2026-09-11: 53 `monitored_pages` rows exist for dentists in total, but only 18 are still armed (`monitor_until >= current_date`). The other 35 expired on or before 2026-09-10.**

Of the 18 still armed: 14 `status='active'`, 4 `status='flagged'`. **The last one expires 2026-10-07.**

Template families they sit in:

| Family | Armed rows | Expiry |
|---|---:|---|
| blog article | 16 | 11 on 2026-10-06, 5 on 2026-10-07 |
| blog hub (`/blog`) | 1 | 2026-10-06 (flagged) |
| homepage (`/`) | 1 | 2026-10-06 (flagged) |

By `rewrite_type`: 9 `net_new`, 9 `rewrite`.

**Correction to the brief.** The second-hand "53 of 223 pages frozen to Sep-Oct 2026" from `PROPERTY_STANDARD_ROLLOUT.md` (dated 2026-08-24) is stale in the way that matters. **53** is the total row count for dentists in `monitored_pages`, and it was near-enough all-armed on 2026-08-24; as of today only **18** are. The 223 denominator was not re-derived here and is out of scope.

**Owner sequencing decision, stated plainly.** A design cutover re-baselines these windows. Two armed rows are the homepage and the blog hub - the two surfaces a chrome port changes most. If the cutover lands before **2026-10-07**, 18 regression watches lose their comparability, 16 of them on the blog-article family, which is precisely the family section B says the port needs to fix. Waiting to 2026-10-08 costs 27 days. This is a choice between measurable content watches and an earlier port, and it is the owner's, not the builder's.

---

## D. Search data posture

**The `STATE.md` premise is FALSE.** `docs/dentists/STATE.md:59` says "Bing: 0 rows ingested for dentists. ... Set up Bing Webmaster + ingest before running the rewrite engine here." That is out of date.

```sql
select site_key, count(*) rows_, max(date) last_date from bing_query_data group by 1 order by 2 desc;
```
> `dentists` -> **19,226 rows, last_date 2026-09-07**. (5th largest of 15 sites; medical, directly above it, has 19,491.)

Bing Webmaster ingestion for dentists is **live and current**. Nothing needs setting up. `STATE.md:59` should be corrected, but that is a separate edit and was not made here (this pull is read-only outside this file).

Volume comparison, last 28 days:

```sql
select 'bing_28d' k, sum(clicks) clicks, sum(impressions) impr
from bing_query_data where site_key='dentists' and date>=current_date-28;
```
```sql
select site_url, sum(clicks) clicks, sum(impressions) impr, max(date) last
from gsc_page_performance where date>=current_date-28 and site_url ilike '%dental%' group by 1;
```

| Source | Clicks | Impressions | Data through |
|---|---:|---:|---|
| Bing (`bing_query_data`) | **1,682** | 15,431 | 2026-09-07 |
| Google (`gsc_page_performance`, `sc-domain:dentalfinancepartners.co.uk`) | **109** | 13,547 | 2026-09-05 |

**Bing delivers roughly 15x Google's clicks on Dentists at near-identical impression volume.** That is a far wider Bing skew than Medical's recorded ~3.3x. `gsc_query_data` was deliberately not summed (estate trap: summing it undercounts ~20x); the figure above comes from `gsc_page_performance`.

Consequence for the port: **a before/after read on this cutover must include Bing, and a Google-only read would be measuring the minority channel.** Both feeds are current, so no setup is needed - but whoever takes the after-reading has to pull both, and the two feeds have different data-through lags (2 days apart in this pull).

---

## E. Lead volume and shape, last 90 days

```sql
select id, created_at, source, source_url, status, is_test from leads
where source='dentists' and created_at>=current_date-90 order by created_at desc;
```

7 rows. **Two are excluded by the KPI predicate** (`is_test=true`, both `/contact`, 2026-08-19 18 minutes apart - a test pair, not real enquiries).

**5 KPI-clean leads in 90 days = 1.7 per month.**

| Surface | KPI-clean leads |
|---|---:|
| `/contact` | 4 |
| blog article (`/blog/practice-finance/sole-trader-vs-limited-company-dentists-uk`) | 1 |

By status across the 5: 2 `contactable`, 2 `unreachable`, 1 `new`.

**Against the standing rule that partner outreach is off the table below 5 leads/month, Dentists is at 1.7/month and is not partner-offerable today.** That cuts both ways for the port: the downside risk of a regression is small in absolute revenue, so the port is lower-risk here than on Medical (7.7/month) - but it also means the port has to produce a real lift to change anything, and at 2 leads per 19-day window a single lead moves leads-per-1k by 2.2. **Do not attempt to read this port's effect off lead count alone. Read it off form-start rate and start-to-complete rate, which have 30 and 29 observations respectively rather than 2.**

No `honeypot` key appears in `extras` on any of the 7 rows.

---

## UNVERIFIED / NOT DERIVED

| Item | Why |
|---|---|
| Whether the 12 never-fired `data-cta` ids are unwired or merely unclicked | `header-nav-cta` fires while its mobile sibling and both header secondaries never have, which points at unwired. Proof needs a click test on a live page. **Not run.** Do not record them as broken. |
| Whether `calculator-page-cta` is retired or broken | 1 event on 2026-06-19, none in the 84 days since, on a family with 38 sessions in the last 19 days. Absence is a question. Not resolved. |
| Blog-article zero-completion root cause | Established as a fact (24 starts, 0 completes). Which component and why is Phase 1 work. The 24-start sample cannot distinguish "broken" from "unlucky" on its own; the cross-site pattern is what makes it actionable. |
| Significance of Dentists' better calc-use and form-start rates | 34/165 and 29/450. Directional; no significance test run. |
| `form_id` vocabulary and `MINIFORM_FORM_IDS` alignment | Not pulled. Medical's baseline found a site-specific id (`blog_mid_resource`) missing from the watch constant. Dentists' form-id vocabulary should be pulled before any deploy-watch is pointed at this site. **Not done here.** |
| Deploy-watch coverage for dentists | Not queried. Medical's baseline found `Property/web/src/app/api/cron/deploy-watch/route.ts` hardcoded to `site_key: "eq.property"`, which would mean no automated regression detection on Dentists either. Assumed, not verified in this pull. |
| Engaged-session rate | `web_sessions` was not queried for dentists; only `web_events`. Session counts here are `web_events`-based on both sites, consistently. |
| The "223 pages" denominator in `PROPERTY_STANDARD_ROLLOUT.md` | Not re-derived. Only the dentists `monitored_pages` side was checked. |
| Pre-bot-gate comparison | Deliberately not derived. Pre-2026-08-23 traffic is bot-inflated and mixing it in would corrupt every rate above. |
| `assistant_${goal}` full id vocabulary | Two values observed (`assistant_question`, `assistant_calculator`). The template literal can emit others depending on `goal`; the full set was not read out of `SpecialistWidget.tsx`. |
| GSC/Bing position and query-level readings | Out of scope for a funnel baseline. Only click/impression totals were pulled, to settle the section D premise. |
