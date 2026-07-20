# Analytics data-hygiene audit — 2026-07-20

Read-only audit of prod Supabase (`dhlxwmvmkrfnmcgjbntk`) analytics tables, plus a repo sweep for view usage. All queries were SELECT-only (verbatim in the appendix). Scope per owner directive: no project splits, no compute changes, no cron/cache recommendations.

## Executive summary

- **The data is small and healthy.** web_events: 335,069 rows across 4 partitions, 206 MB total. web_sessions: 30,529 rows, 20 MB. This is tiny for Postgres; there is no storage or performance problem to solve.
- **Bots are a quality issue, not a volume crisis.** 26% of events and 58% of sessions are bot-flagged. The bot event load is almost entirely `web_vital` (56,473 of 86,491 bot events, i.e. 56% of all web_vital rows are bot). Bot rows are worth keeping (bot-detector tuning) but could be excluded at ingest for `web_vital` specifically, which carries no bot-tuning signal.
- **Two ping-style events dominate volume:** `web_vital` (30.1%) and `engagement_time` (23.0%) are 53% of all rows. These are the only candidates for ingest-side sampling or coalescing; everything else is behavioural signal the CRO detectors use.
- **Growth is modest:** ~150k rows in June, ~188k in July (on track for ~190k). At this rate web_events adds roughly 100-130 MB/year. Retention cuts are optional, not needed.
- **Rollup is DORMANT:** `web_rollup` last bucket is 2026-07-07 (stopped at the 07-08 revert). Any raw-retention cut before the rollup is either revived or consciously abandoned would permanently lose trend history beyond the retention window. Flagged as a hard dependency below.
- **Column collection is mostly justified.** Dead-in-practice: `utm_term`/`utm_content` (0.0% filled), `embed_slug` (0.0%). Collected-but-underused and worth surfacing: `city` (38%), `region` (92%), `timezone` (97%), which already feed the `_geo` views but two of those views are unreferenced in code.
- **Views: 34 of 37 `vw_*` views are referenced in code.** Unreferenced: `vw_channel_conversion_macro`, `vw_section_engagement`, `vw_section_engagement_geo` (views are metadata-only, zero storage cost; dropping is tidiness, not savings).
- **Dormant leftovers are harmless:** `console_cache` 1,266 rows / 3.1 MB (last refresh 2026-07-07), `web_rollup` 7,454 rows / 2.3 MB. Report-only, no action needed.

## Findings

### 1. web_events volume and bots

| Metric | Value |
|---|---|
| Total rows | 335,069 |
| Bot rows (`is_bot`) | 86,491 (25.8%) |
| Size (4 partitions) | 206 MB |
| June 2026 rows | 147,275 (31,512 bot) |
| July 2026 rows (to 07-20) | 187,794 (54,979 bot) |

Bot concentration by event: `web_vital` 56,473 bot rows (56% of that event), vs `engagement_time` 209, `section_view` 77, `scroll_depth` 514. Bots run headless browsers that emit Core Web Vitals but do not dwell or scroll. Bot web_vital rows are pure noise (vitals from bots are not representative of user experience and carry no bot-tuning signal beyond the session-level flag).

### 2. Event mix

Top of the distribution (full table available from query 3):

| Event | Rows | % |
|---|---|---|
| web_vital | 100,987 | 30.1 |
| engagement_time | 77,013 | 23.0 |
| section_view | 29,338 | 8.8 |
| calc_input_change | 25,338 | 7.6 |
| page_view | 25,324 | 7.6 |
| subscribe_view | 20,030 | 6.0 |
| scroll_depth | 11,454 | 3.4 |
| (26 further event types) | | 21.5 |

`web_vital` + `engagement_time` = 53.1% of all rows. Conversion-critical events (`form_submit`, `lead_submitted`, `cta_click`, etc.) are a rounding error by volume; nothing there should ever be sampled.

### 3. Growth rate

Tracking began June 2026. ~150k → ~190k rows/month. Linear extrapolation: ~2.3M rows and ~1.2-1.5 GB by mid-2027 if nothing changes. Still small.

### 4. web_sessions column fill rates (n = 30,530)

| Column | % non-null | Verdict |
|---|---|---|
| utm_term | 0.0 | Dead. No paid search running; harmless to keep, zero value |
| utm_content | 0.0 | Dead, same |
| utm_source | 1.4 | Sparse but real (tagged campaign links); keep |
| embed_slug | 0.0 | Dead (embeds never launched); keep or drop with embed columns as a set |
| viewport_w/h | 75.1 | Used implicitly via device_type; low standalone value |
| os_family | 100.0 | Filled, low analytical use; harmless |
| country | 100.0 | Used (rollup + `_geo` views) |
| region | 92.0 | Collected, underused — surfacing opportunity |
| city | 38.3 | Collected, underused — surfacing opportunity |
| timezone | 97.4 | Collected, essentially unused |
| bot_score | 16.4 | Partial (added later); keep, feeds bot tuning |
| lead_id | 0.2 | Correct (matches lead rate) |

web_sessions: 30,529 total, 17,851 bot (58.5%). Property is 54% of sessions; the seven expansion sites are still tiny (6-63 sessions each), so per-site pruning decisions should wait for their data to mature.

### 5. Views (`vw_*` in public schema)

37 views exist. Repo sweep (packages/, console/, Property/web, optimisation_engine/, scripts/, excluding .sql/migrations/.md) found 34 referenced. Unreferenced:

- `vw_channel_conversion_macro` — superseded by `vw_channel_conversion_geo`
- `vw_section_engagement` — superseded by `vw_section_action`
- `vw_section_engagement_geo`

Views cost nothing at rest; dropping them is hygiene only. Note `vw_web_funnel_daily` (v1) is still referenced in 4 places alongside `vw_web_funnel_daily_v2`; a code-side consolidation could retire v1 later, but that is code work, not DB work.

### 6. Dormant leftovers (report-only)

- `console_cache`: 1,266 rows, 3.1 MB, last refreshed 2026-07-07 22:00 UTC. Dormant since the compute-upgrade fix; harmless.
- `web_rollup`: 7,454 rows, 2.3 MB, last bucket 2026-07-07 21:15 UTC. **Dormant since the 07-08 revert.** This is the table a raw-retention policy would depend on; see the dependency flag below.

## Recommendations

| # | Action | Benefit | Risk | Owner sign-off |
|---|---|---|---|---|
| 1 | Bot-row retention policy: keep ALL bot session rows and bot event rows for now (bot-detector tuning corpus); revisit only if bot share of storage becomes material (it is ~50 MB today) | Preserves tuning data at trivial cost | None | N |
| 2 | Stop ingesting `web_vital` events from sessions already flagged `is_bot` (ingest-side filter, not a delete) | Removes ~56% of the single largest event stream; bot vitals are meaningless | Very low; session-level bot flag and counts unaffected | Y (client/ingest code change) |
| 3 | Coalesce `engagement_time` pings at ingest (e.g. update-in-place per session/page rather than one row per ping), or sample `web_vital` from human sessions at 25-50% | Cuts the two ping events (53% of rows) substantially; vitals are statistically fine sampled | Low-medium; changes row semantics, detector queries reading raw pings must be checked first | Y |
| 4 | Raw web_events retention cut (e.g. keep 12 months raw): **DO NOT do this yet.** `web_rollup` is dormant since 2026-07-08; a retention window without a live rollup permanently loses trend history beyond the window. Decision needed first: revive the rollup writer, or accept raw-forever (fine at current volume) | Optional future cleanliness | HIGH if done while rollup is dormant (irreversible history loss) | Y |
| 5 | Drop unreferenced views `vw_channel_conversion_macro`, `vw_section_engagement`, `vw_section_engagement_geo` | Schema hygiene only (views store nothing) | None (recreate from migrations if ever needed) | Y (DDL) |
| 6 | Leave dead columns (`utm_term`, `utm_content`, `embed_slug`) in place; do not drop | A column drop saves effectively nothing at this scale and breaks insert code for zero gain | None | N |
| 7 | Surface collected-but-unused geo data: `region` (92% filled) and `city` (38%) in console/ledger reporting; two `_geo` views already exist but are unreferenced in code | Free insight from data already collected (regional lead quality, local-SEO targeting) | None (read-only feature) | N |
| 8 | `console_cache` / `web_rollup` dormant rows: leave as-is (5.4 MB combined) | Nothing to gain from deleting | None | N |

Bottom line: no pruning is required today. The only actions with real payoff are 2 and 3 (ingest-side, cut ping noise ~40-50% of future rows) and 7 (use the geo data already being collected). Action 4 is explicitly blocked on the rollup decision.

## Appendix: queries run (all read-only)

All queries below were executed via the Supabase Management API `database/query` endpoint. Every statement is a SELECT (or information_schema/catalog read); no DDL, DELETE, UPDATE or INSERT was executed.

```sql
-- 1. Schema introspection
select table_name, column_name, data_type from information_schema.columns
where table_schema='public' and table_name in ('web_events','web_sessions','console_cache','web_rollup')
order by table_name, ordinal_position;

-- 2. Counts and sizes
select 'we_total' k, count(*)::text v from web_events
union all select 'we_bot', count(*) filter (where is_bot)::text from web_events
union all select 'we_size', pg_size_pretty(pg_total_relation_size('web_events'))
union all select 'ws_total', count(*)::text from web_sessions
union all select 'ws_bot', count(*) filter (where is_bot)::text from web_sessions
union all select 'ws_size', pg_size_pretty(pg_total_relation_size('web_sessions'))
union all select 'cc_rows', count(*)::text from console_cache
union all select 'cc_size', pg_size_pretty(pg_total_relation_size('console_cache'))
union all select 'wr_rows', count(*)::text from web_rollup
union all select 'wr_size', pg_size_pretty(pg_total_relation_size('web_rollup'))
union all select 'wr_max_bucket', coalesce(max(bucket)::text,'none') from web_rollup;

-- 3. Event mix
select event_name, count(*) c, round(100.0*count(*)/sum(count(*)) over(),1) pct
from web_events group by 1 order by 2 desc;

-- 4. Partition check (web_events base relation reported 0 bytes)
select coalesce((select pg_size_pretty(sum(pg_total_relation_size(inhrelid))) from pg_inherits where inhparent='web_events'::regclass),'not partitioned') part_size,
 (select count(*) from pg_inherits where inhparent='web_events'::regclass) nparts,
 pg_size_pretty(pg_total_relation_size('web_events')) base;

-- 5. Monthly growth
select to_char(date_trunc('month',ts),'YYYY-MM') m, count(*) c, count(*) filter (where is_bot) bots
from web_events group by 1 order by 1;

-- 6. Column fill rates
select count(*) n,
 round(100.0*count(utm_term)/count(*),1) utm_term,
 round(100.0*count(utm_content)/count(*),1) utm_content,
 round(100.0*count(utm_source)/count(*),1) utm_source,
 round(100.0*count(viewport_w)/count(*),1) viewport_w,
 round(100.0*count(os_family)/count(*),1) os_family,
 round(100.0*count(city)/count(*),1) city,
 round(100.0*count(region)/count(*),1) region,
 round(100.0*count(country)/count(*),1) country,
 round(100.0*count(timezone)/count(*),1) tz,
 round(100.0*count(embed_slug)/count(*),1) embed_slug,
 round(100.0*count(lead_id)/count(*),1) lead_id,
 round(100.0*count(bot_score)/count(*),1) bot_score
from web_sessions;

-- 7. Views
select table_name from information_schema.views where table_schema='public' and table_name like 'vw_%' order by 1;

-- 8. Bot share of ping events
select event_name, count(*) c, count(*) filter (where is_bot) bots from web_events
where event_name in ('web_vital','engagement_time','section_view','scroll_depth') group by 1;

-- 9. Cache freshness
select max(refreshed_at) from console_cache;

-- 10. Sessions by site
select site_key, count(*) from web_sessions group by 1 order by 2 desc;
```

Repo sweep: `rg -l --fixed-strings "<view>"` over `packages/`, `console/`, `Property/web/`, `optimisation_engine/`, `scripts/`, excluding `.sql`, `migrations`, `.md`, for each of the 37 view names.
