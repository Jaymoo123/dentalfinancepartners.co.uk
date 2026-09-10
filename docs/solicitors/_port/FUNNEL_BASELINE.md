# Solicitors design port - Phase 0 funnel evidence

Pulled 2026-09-10. READ-ONLY. Site: `solicitors` (Accounts for Lawyers, www.accountsforlawyers.co.uk).

**Window on every claim below: 2026-08-23 00:00 UTC to 2026-09-10 (pull time), 18 days.**
Window starts on the bot-gate landing date, so nothing here is inflated by the pre-gate bot count.
Every figure is a fresh Supabase read; the query that produced it is inline. No stored snapshot figures, no GSC/Bing figures.

## Definitions used

| Term | Definition | Source |
|---|---|---|
| session | distinct `web_events.session_id` with `is_bot=false` in window | `web_events` |
| engaged session | `web_sessions` row, `is_bot=false`, `engaged_ms >= 10000` | `web_sessions.engaged_ms` |
| calculator use | session firing `calc_input_change` or `calc_computed` (not a mere `calc_view`) | `web_events.event_name` |
| form start | `form_start` event | `web_events.event_name` |
| form complete | `form_submit` event | `web_events.event_name` |
| lead | `leads` row, `source='solicitors'`, `source <> 'test' AND coalesce(is_test,false) = false` (predicate copied verbatim from `supabase/migrations/20260819000003_test_leads_excluded_from_kpis.sql`) | `leads` |

Session counts differ slightly between `web_events` (1729) and `web_sessions` (1618) for solicitors; sessions whose events span the window boundary explain the gap. Ratios below use the `web_events` count consistently for both sites.

---

## A. Solicitors funnel, post bot-gate

```sql
-- run: python scripts/_q.py -
with e as (
  select site_key, session_id, page_path, event_name from web_events
  where site_key in ('solicitors','property') and is_bot=false
    and ts>='2026-08-23' and ts<now())
select site_key,
 count(distinct session_id) sessions,
 count(distinct session_id) filter (where event_name='calc_view') calc_view_sess,
 count(distinct session_id) filter (where event_name in ('calc_input_change','calc_computed')) calc_use_sess,
 count(*) filter (where event_name='calc_computed') calc_computed_ev,
 count(distinct session_id) filter (where event_name='form_start') form_start_sess,
 count(*) filter (where event_name='form_submit') form_submit_ev,
 count(*) filter (where event_name='lead_submitted') lead_submitted_ev
from e group by 1;
```

| Step | Number | Rate | Table.column |
|---|---:|---|---|
| Sessions | 1,729 | - | `web_events.session_id` |
| Engaged sessions (>=10s) | 1,111 | 68.7% of `web_sessions` rows (1,618) | `web_sessions.engaged_ms` |
| Calculator page viewed | 540 sessions | 31.2% of sessions | `web_events` `calc_view` |
| Calculator actually used | 52 sessions | 3.0% of sessions; 9.6% of calc viewers | `web_events` `calc_input_change`/`calc_computed` |
| Calculator computed (events) | 248 | - | `web_events` `calc_computed` |
| Form starts | 44 sessions (46 events) | 2.5% of sessions | `web_events` `form_start` |
| Form completes | 2 events | **4.5% of form-start sessions** | `web_events` `form_submit` |
| Leads (KPI-clean) | 2 | 1.16 per 1,000 sessions | `leads` |

### By template family (solicitors)

```sql
with e as (select session_id, page_path, event_name from web_events
  where site_key='solicitors' and is_bot=false and ts>='2026-08-23'),
f as (select case
  when page_path='/' then 'homepage'
  when page_path='/blog' or page_path like '/blog/page%' then 'blog hub'
  when page_path like '/blog/%' then 'blog article'
  when page_path like '%calculator%' or page_path like '/tools%' or page_path like '/calculators%' then 'calculator'
  when page_path like '/services%' then 'services'
  when page_path like '/contact%' then 'contact'
  when page_path like '/locations%' or page_path like '/accountants-in%' then 'location'
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
| blog article | 1,497 | 1,475 | 42 | 40 | **0** |
| other | 171 | 198 | 0 | 1 | 0 |
| homepage | 40 | 40 | 0 | 0 | 0 |
| calculator | 38 | 51 | 12 | 2 | 0 |
| services | 25 | 24 | 0 | 0 | 0 |
| contact | 17 | 17 | 0 | 3 | 2 |
| blog hub | 13 | 11 | 0 | 0 | 0 |
| location | 6 | 13 | 0 | 0 | 0 |

**The finding.** 86.6% of sessions land on a blog article. Blog articles produced 40 of the 46 form starts and **zero** completions. Every completion in the window came from `/contact`, a page that saw 17 sessions. The blog body is where the traffic is and it converts at 0.

---

## B. Property, identical window, as the comparison

Same query, `site_key='property'`.

| Step | Property | Rate | Solicitors rate | Ratio (prop / sol) |
|---|---:|---|---|---:|
| Sessions | 4,974 | - | - | 2.88x volume |
| Engaged (>=10s) | 3,188 | 70.1% of `web_sessions` (4,549) | 68.7% | 1.02x |
| Calc page viewed | 1,878 sess | 37.8% of sessions | 31.2% | 1.21x |
| Calc used | 253 sess | 5.1% of sessions | 3.0% | **1.69x** |
| Calc used / calc viewed | - | 13.5% | 9.6% | 1.40x |
| Calc computed (events) | 2,784 | 11.0 per using session | 4.8 | 2.29x |
| Form starts | 281 sess | 5.65% of sessions | 2.54% | **2.22x** |
| Form completes | 50 ev | 17.8% of form-start sessions | 4.5% | **3.95x** |
| Leads | 49 | 9.85 / 1,000 sessions | 1.16 | **8.49x** |

### Property by template family

| Family | Sessions | Page views | Calc uses | Form starts | Form completes |
|---|---:|---:|---:|---:|---:|
| blog article | 4,644 | 4,663 | 228 | 245 | **15** |
| homepage | 187 | 199 | 0 | 13 | 10 |
| other | 120 | 127 | 1 | 3 | 3 |
| calculator | 86 | 88 | 29 | 7 | 1 |
| contact | 77 | 78 | 0 | 24 | 17 |
| services | 41 | 48 | 0 | 5 | 4 |
| location | 38 | 52 | 0 | 0 | 0 |
| blog hub | 4 | 4 | 0 | 0 | 0 |

**The commercial case for the port, in one row.** Both sites are blog-dominated. Property's blog articles converted 245 form starts into 15 completions (6.1%). Solicitors' blog articles converted 40 starts into 0. The gap is not traffic and it is not the calculator; it is what happens to a visitor once they start a form on an article page.

---

## C. The historical claim, re-derived

`docs/solicitors/STATE.md:96` records, dated 2026-07-19 and therefore from **before** the bot gate:
> 977 engaged sessions -> 15 calculator uses -> 1 lead (worst funnel in estate)

Post-bot-gate equivalent (2026-08-23 to 2026-09-10, 18 days):

| Metric | Old (pre-gate, 2026-07-19) | Now (post-gate window) | Direction |
|---|---:|---:|---|
| Engaged sessions | 977 | 1,111 | - |
| Calculator uses | 15 | 52 | - |
| Calc uses per engaged session | 1.54% | 4.68% | **better (3.0x)** |
| Leads | 1 | 2 | - |
| Leads per engaged session | 0.102% | 0.180% | better (1.8x) |
| Leads per 1,000 (all) sessions | not comparable | 1.16 | - |

**Verdict: better on the calculator step, materially unchanged on the step that matters.** The calculator now gets used three times as often per engaged session. That improvement does not reach a lead: form completion is 4.5% of form starts against Property's 17.8%, and the blog body still produces zero completions. Do not repeat "977 -> 15 -> 1" as a current figure; it is a pre-gate reading and the calculator half of it is now wrong.

**Caveat that shrinks the numerator.** Both post-gate leads landed on 2026-09-07 within 55 seconds of each other, both from `https://www.accountsforlawyers.co.uk/contact`, one carrying `extras.capture_channel='assistant'`. That reads as one person submitting twice, not two leads. Neither is flagged `is_test`, so the KPI predicate keeps both, and this document counts both. If they are one, solicitors is at **1 lead / 0.58 per 1,000** for the window and the picture is worse, not better. Flagged, not resolved.

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
| 6 | **solicitors** | **1,729** | **2** | **1.16** |
| 7 | generalist | 1,437 | 5 | 3.48 |
| 8 | construction-cis | 243 | 1 | 4.12 |
| 9 | dentists | 436 | 2 | 4.59 |
| 10 | property | 4,974 | 49 | 9.85 |
| 11 | medical | 383 | 5 | 13.05 |
| 12 | pharmacies | 55 | 1 | 18.18 |
| 13 | contractors-ir35 | 123 | 4 | 32.52 |
| 14 | care | 53 | 2 | 37.74 |
| 15 | crypto | 32 | 1 | 31.25 |

(crypto/pharmacies/care sit on 1-2 leads over 32-55 sessions; their rates are noise, not performance. Listed for completeness, not for ranking.)

**Does "worst funnel in the estate" still hold? Yes, in substance.** Five sites sit at 0.00, but all five have under 250 sessions in the window - too little traffic to have converted anything. Among sites with enough traffic to have a funnel at all (>1,000 sessions: solicitors, generalist, property), **solicitors is last, at one third of generalist and one eighth of Property**. It is the second-largest traffic source in the estate and the worst at converting it. The headline stands.

---

## E. Lead volume and shape, last 90 days

```sql
select id, created_at, source, source_url, status, is_test, extras::text
from leads where source='solicitors' and created_at>='2026-06-12' order by created_at desc;
```

8 leads in 90 days (2026-06-12 to 2026-09-10) = **2.7 per month**.

| Date | Surface (source_url) | form_id / channel | Status |
|---|---|---|---|
| 2026-09-07 | /contact | assistant widget (`capture_channel=assistant`) | nurturing |
| 2026-09-07 | /contact | (none recorded) | nurturing |
| 2026-08-10 | /contact | (none recorded) | contactable |
| 2026-08-05 | /contact | (none recorded) | contactable |
| 2026-08-04 | /blog/sra-accounts-rules/... | `calc_result_gate` | unreachable |
| 2026-07-29 | /blog/compliance-risk-colp-cofa/... | assistant widget | unreachable |
| 2026-07-29 | /blog/firm-acquisition-merger/... | `calc_result_gate`, **`honeypot: true`** | unreachable |
| 2026-07-04 | /contact | (none recorded) | new |

By surface: `/contact` 5, blog article 3. By quality: 3 `unreachable`, 2 `contactable`, 2 `nurturing`, 1 `new`. One of the three blog leads is honeypot-flagged, i.e. almost certainly a bot, leaving 2 genuine blog leads in 90 days.

**Against the standing rule that partner outreach is pointless below 5 leads/month: solicitors is at 2.7/month, on the wrong side of the line, and would be at 2.6 if the 09-07 pair is one person.** This site cannot be offered to a partner today. The port is the route to the line, not a nice-to-have.

---

## F. `data-cta` inventory

Source:
```bash
grep -rhoE 'data-cta="[^"]+"' Solicitors/web/src | sort | uniq -c | sort -rn
```
Events (window, and all-time to catch dormant ids):
```sql
select coalesce(props->>'cta_id','(none)') cta, count(*) n, min(ts)::date first, max(ts)::date last
from web_events where site_key='solicitors' and event_name='cta_click' group by 1 order by 2 desc;
```

22 distinct ids in source, mixed hyphen/underscore. 11 distinct ids have ever fired; 4 of those are not in the source grep.

| cta id | Occurrences in source | Events in window | All-time (first..last) | Verdict |
|---|---:|---:|---|---|
| deep_scroll_close | 1 | 153 | 411 (07-05..09-10) | **LIVE** |
| see_result | 2 | 31 | 71 (07-06..09-10) | **LIVE** |
| specialist_widget | 1 | 30 | 71 (07-07..09-10) | **LIVE** |
| sticky_cta | 1 | 2 | 4 (07-14..09-07) | **LIVE** (thin) |
| cta-section-primary | 1 | 1 | 1 (09-03) | **LIVE** (thin) |
| header-book-call | 1 | 0 | 5 (06-23..07-04) | DORMANT - stopped firing 07-04 |
| deep_scroll_modal | 1 | 0 | 2 (07-07..07-20) | DORMANT - stopped firing 07-20 |
| calculator-page-cta | 2 | 0 | never | NEVER FIRED |
| thankyou-return-article | 1 | 0 | never | NEVER FIRED |
| returning_bar | 1 | 0 | never | NEVER FIRED |
| returning_bar_close | 1 | 0 | never | NEVER FIRED |
| next_step | 1 | 0 | never | NEVER FIRED |
| mobile-menu-book-call | 1 | 0 | never | NEVER FIRED |
| home_cta_primary | 1 | 0 | never | NEVER FIRED |
| home_cta_secondary | 1 | 0 | never | NEVER FIRED |
| hero_primary | 1 | 0 | never | NEVER FIRED |
| hero_secondary | 1 | 0 | never | NEVER FIRED |
| header_nav_secondary | 1 | 0 | never | NEVER FIRED |
| header_mobile_secondary | 1 | 0 | never | NEVER FIRED |
| equity-partner-buyin-page-cta | 1 | 0 | never | NEVER FIRED |
| cta-section-secondary | 1 | 0 | never | NEVER FIRED |
| contact_pricing_link | 1 | 0 | never | NEVER FIRED |
| `result_gate_skip` | **0 (not in grep)** | 27 | 64 (07-06..09-10) | **ORPHANED-LIVE** - emitted in code, no `data-cta` attribute |
| `assistant_question` | 0 | 4 | 11 (07-20..09-07) | ORPHANED-LIVE |
| `assistant_calculator` | 0 | 1 | 1 (09-09) | ORPHANED-LIVE (new) |
| `assistant_call` | 0 | 0 | 1 (07-07) | ORPHANED-DORMANT |

**Totals: 5 live in source, 2 dormant in source, 15 never fired, 4 orphaned ids that fire from JS without a `data-cta` attribute (3 of them live).**

**What the port must not break.** The load-bearing reporting series are `deep_scroll_close`, `see_result`, `specialist_widget`, `result_gate_skip`, `sticky_cta`, `assistant_question`. Renaming any of them silently truncates a series that already has two months of history. The 15 never-fired ids are free to rename or delete - but note that "never fired" for `hero_primary`, `home_cta_primary` and the header/nav ids most likely means the id was never wired to the click handler, not that nobody ever clicked a hero button. **That is itself a finding: the site's most prominent CTAs are not instrumented, so the funnel above cannot see the top of them.**

**Trap 4 bites here.** `vw_cta_performance` groups by `(site_key, country, cta_id, goal)` with **no `page_path`**. `see_result` appears twice in source and `calculator-page-cta` appears twice, so their clicks cannot be split by route through that view. Any per-route CTA reading has to go to `web_events` directly.

---

## G. Registry check

```sql
select site_key, gsc_property_url, bing_property_url, active from sites where site_key='solicitors';
```
| site_key | gsc_property_url | bing_property_url | active |
|---|---|---|---|
| solicitors | `sc-domain:accountsforlawyers.co.uk` | **NULL** | true |

Code: `optimisation_engine/clients/gsc_page_client.py:43`
```python
"solicitors":        "sc-domain:accountsforlawyers.co.uk",
```

**They agree.** The stale-domain problem that hit this site before is not present today. `bing_property_url` is NULL, but it is NULL for **every one of the 15 active sites**, so that is the estate convention (Bing is reached through `bing_query_client`), not a solicitors defect. No action.

---

## H. Deploy-watch baselines

```sql
select watch_key, started_at, gate_day, status, verdict, left(payload::text,400) from deploy_watch order by started_at desc;
```

**`deploy_watch` contains zero rows for solicitors.** The whole table holds 6 rows: `miniform_multistep` (4 gates, all `sent`, final day-28 gate PASS, watch complete), plus two `skipped` fixwave rows for agency and medical. No open watch of any kind.

The only watch implementation is `Property/web/src/app/api/cron/deploy-watch/route.ts`, and it hardcodes `site_key: "eq.property"` (line 100). **It cannot fire on solicitors data today.** A solicitors port therefore cannot trip a false alarm through this path as things stand.

What it counts, from `Property/web/src/config/deploy-watch.ts`:

| Constant | Value |
|---|---|
| `MINIFORM_FORM_IDS` (line 153) | `exit_intent`, `exit_intent_form`, `inline_mini`, `calc_result_gate`, `mobile_tool`, `resource_block`, `specialist_widget` |
| `BASELINE_MINIFORM_LEADS_28D` | 15 |
| `BASELINE_MINIFORM_LEADS_WEEKLY` | 3.75 |
| `BASELINE_MINIFORM_LEADS_2WK` | 7.5 |

Solicitors ships 5 of those 7 form_ids, and they are actively firing in the window:

```sql
select coalesce(props->>'form_id','(none)') form_id, event_name, count(*) n
from web_events where site_key='solicitors' and is_bot=false and ts>='2026-08-23'
 and event_name like 'form%' group by 1,2 order by 3 desc;
```

| form_id | step_view | form_start | form_submit | in MINIFORM_FORM_IDS? |
|---|---:|---:|---:|---|
| resource_block | 521 | 7 | 0 | yes |
| mobile_tool | 170 | 13 | 0 | yes |
| calc_result_gate | 34 | 18 | 0 | yes |
| inline_mini | 24 | 1 | 0 | yes |
| specialist_widget | - | 2 | 1 | yes |
| calc_result | 23 | 2 | 0 | no (deliberately removed on Property) |
| lead_form | - | 3 | 1 | no |

**Instruction for the port.** Do not rename or drop `resource_block`, `mobile_tool`, `calc_result_gate`, `inline_mini` or `specialist_widget` on solicitors without recording it here. They are not watched on solicitors today, but they are the shared estate vocabulary, `BASELINE_MINIFORM_LEADS_28D = 15` is derived from that exact id set on Property, and if the port ever extends the watch to solicitors a silently-shrunken id set compares against an unshrunken baseline and fires an ACTION-NEEDED email at the owner. That is the precise failure the comment block at `deploy-watch.ts:163` was written to prevent.

Note `resource_block`: 521 step views, 7 starts, 0 leads on solicitors. This mirrors the residual on Property recorded in the consent-wording incident. It renders and it is seen; it does not convert.

---

## UNVERIFIED / not derived

| Item | Why |
|---|---|
| Whether the two 2026-09-07 leads are one person | Would need PII comparison; flagged in C, not resolved. Not a KPI question - the exclusion predicate keeps both. |
| Per-route split of `see_result` and `calculator-page-cta` clicks | `vw_cta_performance` groups without `page_path` (trap 4). Recoverable from `web_events.page_path` if the port needs it; not pulled here. |
| Search-side figures (impressions, clicks, position) | Out of scope for a funnel baseline. No stored snapshot repeated, no fresh GSC/Bing pull run. |
| Page maturity flags | 52 active + 24 flagged `monitored_pages` rows for solicitors, monitor windows running to 2026-10-07. Pages inside a live monitor window are immature by definition and are not condemned anywhere above. Per-page maturity was not cross-referenced against the family table. |
| Blog-article zero-completion root cause | This document establishes that it is zero. Which component, and why, is Phase 1 work. |
