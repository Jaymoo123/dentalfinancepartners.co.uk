# Phase 0, silent sites: wills-probate and divorce-finances (2026-09-28)

Brief section 8. Read-only on Supabase, Vercel, both `web/` directories. Owns
`docs/wills-probate/STATE.md`, `docs/divorce-finances/STATE.md`, this report.

## 10-line summary

- Both sites are live with **exactly one** production deployment each, both from `b86a990a`,
  2026-09-25 23:17 (wills-probate) and 23:21 (divorce-finances). Live for three days.
- **The owner is right about GSC.** wills-probate 90d: **1,135 impressions, 2 clicks**, 113 pages,
  520 queries. divorce-finances: **196 impressions, 0 clicks**, 43 pages, 84 queries. Data starts
  2026-09-26, one day after launch.
- The data read's "no data" was a window artefact: it ended 2026-09-25, the day the sites launched.
  Nothing was wrong with the pull.
- **Bing: genuinely zero.** Both verified in `GetUserSites` (18 sites), but
  `GetRankAndTrafficStats`, `GetQueryStats` and `GetPageStats` all return `{"d":[]}` with HTTP 200.
- **Root cause of zero `web_sessions` and zero `leads`: both Vercel projects have ZERO environment
  variables.** Not one. The other 15 estate projects carry 21-39 keys each including
  `SUPABASE_SERVICE_ROLE_KEY`. This is config, not code: the manager or owner sets the env vars.
- Every other link in the beacon chain is correct, verified line by line against Property.
- Migrations `20260724000001` and `20260803000002` are **effectively applied**: `sites` has both
  rows, `active = true`, and `leads_source_valid` accepts `wills-probate` and `divorce-finances`.
  Neither version string is in `supabase_migrations.schema_migrations` (it stops at
  `20260718000002`), so they were applied out of band, per the known prod-drift trap.
- Zero lead rows for either source. Expected: the submit route dies on the same missing env.
- Vercel project ids: wills-probate `prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G`, divorce-finances
  `prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP`.

## 1. Search Console, 90 days (2026-06-30 to 2026-09-27, `dataState: all`)

`sc-domain:` properties, `secrets/gsc_credentials.json` + `gsc_token.pickle`, three separate pulls
per property (date, page, query dimensions, `rowLimit` 5000).

| Property | Dim | Rows | Clicks | Impressions |
|---|---|---:|---:|---:|
| estateplanningspecialists.co.uk | date | 3 | 2 | 1,135 |
| estateplanningspecialists.co.uk | page | 113 | 2 | 1,179 |
| estateplanningspecialists.co.uk | query | 520 | 1 | 892 |
| divorcefinancespecialists.co.uk | date | 3 | 0 | 196 |
| divorcefinancespecialists.co.uk | page | 43 | 0 | 199 |
| divorcefinancespecialists.co.uk | query | 84 | 0 | 141 |

Per day: wills-probate 09-25 = 0, 09-26 = 285 impressions, 09-27 = 850 impressions and 2 clicks.
divorce-finances 09-25 = 0, 09-26 = 46, 09-27 = 150. Both are ramping, not flat.

Top pages, wills-probate: `/blog/executors/executor-fees-uk-what-can-you-charge` (28 impressions),
`/blog/inheritance-tax/7-year-rule-gifts-inheritance-tax` (29),
`/blog/probate-process/how-to-fill-in-the-probate-application-form-correctly` (19, 1 click,
position 29.8), `/blog/executors/executor-duties-and-responsibilities` (15, position 59),
`/blog/executors/executor-duties-checklist` (14), `/blog/intestacy/scottish-intestacy-rules-explained`
(11, 1 click, position 7.0). Both clicks are blog, none commercial.

Top pages, divorce-finances: `/blog/financial-settlements/adultery-divorce-financial-settlement`
(11), `/blog/financial-settlements/high-net-worth-divorce-duxbury` (6, position 2.3),
`/blog/financial-settlements/divorce-financial-settlement-guide` (4),
`/blog/financial-settlements/separation-cohabitation-agreements-unmarried` (4), `/about` (3,
position 93). Every impression-earning URL on both sites is a blog post; no service or segment page
has surfaced yet.

Queries on wills-probate are dominated by free-will intent (`"make a will for free"`,
`"write my free will online"`, `"free will service"`) which the site does not sell, and by the
7-year gift rule. divorce-finances queries are clean commercial-adjacent intent (`clean break order
cost`, `divorce and pensions uk`, `cms top up`) at positions 1 to 50.

## 2. Bing

`GetUserSites` returns 18 sites including `https://estateplanningspecialists.co.uk/` and
`https://divorcefinancespecialists.co.uk/`, so both are registered and verified.
`GetRankAndTrafficStats`, `GetQueryStats` and `GetPageStats` each return HTTP 200 with an empty
`d` array for both. Bing has recorded nothing in three days. Not an API fault, not a verification
gap, nothing to fix.

## 3. Why `web_sessions` and `leads` are empty

Traced end to end against Property.

| Link | wills-probate | divorce-finances | Property | Verdict |
|---|---|---|---|---|
| `layout.tsx` mounts `ConsentProvider` > `AnalyticsProvider` > `ConsentedScripts` | `wills-probate/web/src/app/layout.tsx:92-101` | same shape | same | OK |
| `siteKey` prop from config, not a literal | `layout.tsx:94` `niche.content_strategy.site_key` | same | `source_identifier` | OK, both resolve |
| `site_key` value in config | `wills-probate/niche.config.json:67` `"wills-probate"` | `divorce-finances/niche.config.json:64` `"divorce-finances"` | `property` | OK |
| consent posture | `AnalyticsProvider.tsx` `posture="opt-out"` | same | opt-out | OK, tracks by default |
| beacon target | `packages/web-shared/analytics/track.ts:24` `INGEST_PATH = "/api/track"`, `sendBeacon` at :169 | shared | shared | OK |
| route exists | `web/src/app/api/track/route.ts` | exists | exists | OK |
| handler | `createTrackHandler({ siteKey: niche.content_strategy.site_key })` | same | same factory | OK |
| foreign-site-key drop | `createTrackHandler.ts:69` requires `site_key === expectedSiteKey`; both match | same | same | OK |
| `VERCEL_ENV === "production"` guard | `createTrackHandler.ts:190` | same | same | OK, both are prod deploys |
| **`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`** | **absent** | **absent** | present | **BROKEN** |
| RPC `ingest_web_events` | exists in prod | exists | exists | OK |
| `web_sessions.site_key` FK to `sites(site_key)` | row present, `active = true` | present, `active = true` | present | OK |

`createTrackHandler.ts:199-206`:

```
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[track] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
  return NO_CONTENT;
}
```

Every beacon has returned 204 and written nothing since launch. The same missing env kills lead
submission: `packages/web-shared/leads/server/createLeadSubmitHandler.ts:144-145` resolves the same
two variables, so a visitor filling the form on either site loses the lead silently.

Evidence, `GET /v9/projects/{id}/env?limit=200` for all 25 projects in
`team_XF9WAygZX7SGk9Fo4tOAnihH`: `estate-planning-specialists` 0 keys, `divorce-finance-specialists`
0 keys. The 15 other estate sites hold 21 to 39 keys each, all with `SUPABASE_SERVICE_ROLE_KEY`.
No team-level shared env var set is linked (`/v1/env/shared` returns `id_not_found`). The only other
zero-env projects in the account are unrelated (`my-site`, `air-fryer-next`, `sitenudge`,
`emplifex.com`, `double-wired-previews`).

**Classification: data/config, not code.** No builder change fixes this. Nothing in either `web/`
directory is wrong on this path.

## 4. Migration state (read-only, Management API, project `dhlxwmvmkrfnmcgjbntk`)

- `supabase_migrations.schema_migrations`: 31 rows, `20251209124039` to `20260718000002`. Neither
  `20260724000001` nor `20260803000002` is recorded.
- Effects are present anyway. `public.sites`: `wills-probate` / `www.estateplanningspecialists.co.uk`
  / `active = true`; `divorce-finances` / `www.divorcefinancespecialists.co.uk` / `active = true`.
- `leads_source_valid` accepts both: `... 'ecommerce', 'wills-probate', 'ashfield',
  'divorce-finances'` plus NULL.
- `web_sessions_site_key_fkey` is `FOREIGN KEY (site_key) REFERENCES sites(site_key)`, satisfied.
- RLS is on for `sites`, `web_sessions`, `web_events`, `leads`; irrelevant here, the track and
  submit handlers use the service role.
- `leads` rows where source in (wills-probate, divorce-finances): **0**.
- `web_sessions` holds 15 site keys, neither of these among them.

So both migrations were applied out of band (the known prod function/schema drift trap). No action
needed on the schema; only the `schema_migrations` ledger is untidy, which is cosmetic.

## 5. Vercel

| Site | Project | Project id | Latest READY prod deploy | Deployment id | SHA | Env keys |
|---|---|---|---|---|---|---:|
| wills-probate | estate-planning-specialists | `prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G` | 2026-09-25 23:17:47 UTC | `dpl_8vWqYziuzdftcRdE2Hz8nRSQayWJ` | `b86a990a` | 0 |
| divorce-finances | divorce-finance-specialists | `prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP` | 2026-09-25 23:21:35 UTC | `dpl_HUvX1HdWB3BajBeuG2th1E24XsBw` | `b86a990a` | 0 |

One READY production deployment each, ever. Commit message on both:
"chore(wills-probate,divorce-finances): drop the daily nurture digest cron", actor
`claude-code_2-1-268_agent`. So the launch was a side effect of an unrelated deploy, which explains
why no STATE.md, memory file or Vercel project record ever caught it.

## 6. Fix list for the manager

1. **Set env vars on both projects** (owner or manager, Vercel dashboard or CLI, production +
   preview). Copy the 21-key estate baseline from `charities` / `care`
   (`prj_ckcgp2JjoBzJ9ihNZfdacdgYUuEG`, `prj_PvJWStLGoG8bvzCQPLafY4nuMQAa`). Minimum for analytics
   and leads: `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`, `RESEND_API_KEY`,
   `LEAD_SERVICE_FROM_EMAIL` / `_NAME` / `LEAD_SERVICE_REPLY_TO`, `LEAD_NURTURE_TOKEN_SECRET`,
   `LEAD_NURTURE_ENABLED`, `LEAD_INTERNAL_SECRET`, `ADMIN_DASHBOARD_KEY`. Env changes need a
   redeploy to take effect, so this rides the phase 0 deploy round, not a separate one.
2. **Verify after that deploy**: one real visit to each domain, then
   `select count(*) from web_sessions where site_key = '<key>'`. Non-zero, or the chain is still
   broken. Do not mark this closed on the env list alone.
3. **No schema work.** Both migrations' effects are live. Leave `schema_migrations` alone.
4. **monitored_pages**: both sites have zero rows (ops read). Seed after the phase 0 deploy, with
   the 113 and 43 pages GSC already sees as the priority set.
5. **Do not re-run the estate data read on these two** until seven days after the env fix; the
   numbers before it are structurally zero, not low.
6. Builders own the rest (llms.txt STUB, og:image 404, nurture `delayHours`, positioning voice) via
   `docs/wills-probate/PHASE0_2026-09-28.md` and `docs/divorce-finances/PHASE0_2026-09-28.md`.

Not checked: whether the 09-09 Aswatax post-submit line is live on these two (it cannot have been
verified on them, they had no project at the time). Whether GA4 properties exist for either domain,
which is the plumbing agent's job.
