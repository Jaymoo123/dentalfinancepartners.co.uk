# P0-B: deploy baseline (manager-run, 2026-09-12)

## What production actually serves

| Fact | Value | Deriving command |
|---|---|---|
| Vercel project | `contractor-finance-partners` (`prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`), rootDirectory `contractors-ir35/web` | `GET /v9/projects?teamId=team_XF9WAygZX7SGk9Fo4tOAnihH&limit=100`, read `targets.production` |
| Production SHA | `18b4f25f39cd0c4aa084e582d69a87c8a10710ac` ("feat(estate): Aswatax partner disclosure on post-submit surfaces", 2026-09-09) | same call, `targets.production.meta.gitCommitSha` |
| readyState | READY | same |
| gitCommitRef | `HEAD` (worktree deploy; tells you nothing about branch, the SHA is the only identifier) | same |
| Ancestor of current main | YES | `git merge-base --is-ancestor 18b4f25f… HEAD` |

`targets.production` was used deliberately, not a `/v6/deployments?target=production` listing:
the listing gives the most recent production BUILD, `targets.production` gives what the
production alias actually serves, and a rollback makes those differ.

## Auto-deploy posture

`gitProviderOptions: {"createDeployments": "enabled"}` but `link: null`, i.e. NO git repo is
connected to this project, so nothing auto-deploys on push regardless of that flag. Commits
during the port are safe; production keeps serving `18b4f25f…`. Recorded per rollout doc §4.7
(never assume this from an estate-wide statement).

## Committed-but-undeployed backlog riding the cutover

- `contractors-ir35/` itself: **ZERO** commits between the production SHA and HEAD.
  `git log 18b4f25f..HEAD --oneline -- contractors-ir35/` returns nothing.
- `packages/` : **24 commits**, all of them from the five sibling design ports
  (generalist, solicitors, medical chrome/kit work). This site consumes
  `@accounting-network/web-shared`, so an eventual cutover deploy WILL carry them.
  They were built additive and opt-in with Property behaviour as every default, but that is
  a claim, not a fact. **Gate: before cutover, diff this site's rendered output at the
  production SHA against HEAD-with-no-port-commits, to separate "the shared kit moved under
  us" from "the port changed it".** Name these 24 commits in the cutover annotation either
  way, so the before/after read does not attribute their effects to the redesign.

## Link-floor baseline

Authority: `next start` at the production SHA, per rollout doc §4.5.
Baseline worktree `C:/port-base` was already checked out at exactly `18b4f25f…`, verified with
`git log -1` in that worktree. No `.next` existed there for this site, so it is being built
fresh rather than reused: a stale `.next` produces a confident wrong diff, which is worse than
no baseline.
Server hygiene at phase 0 start: `netstat -ano | grep -E ":3[0-9]{3}"` showed no `next start`
listeners (only an unrelated UDP 3702). Zero orphans inherited.

STATUS: build running. Crawl and `link_baseline.json` to follow, and the served page title will
be asserted before any instrument output is trusted.

## DB baselines (manager-run)

`sites` registry row: `site_key=contractors-ir35`, `gsc_property_url=sc-domain:contractortaxaccountants.co.uk`,
**`bing_property_url` IS NULL**, `active=true`. Note the null: `gsc_query_client` resolves the GSC
URL from this row and hard-raises when empty, so GSC pulls work and Bing pulls for this site do not
resolve from the registry. Not a port defect; recorded because Bing is the stronger channel on
several estate sites and any conversion read on this one will be GSC-only until it is filled.

`monitored_pages`: 8 rows total, **4 ACTIVE with windows running to 2026-10-06**:
`contractor-pension-schemes-sipp`, `engineering-contractors`, `ir35-status`, `it-contractors`
(all `rewrite_type=net_new`, rewrite_date 2026-07-08).
These four are EXCLUDED from sweeps while armed. If cutover lands before 2026-10-06, their
baselines get restated at cutover so `data-cta`/form churn does not fire owner-facing alarms.
Deriving command:
`select slug, rewrite_type, rewrite_date, monitor_until, status from monitored_pages where site_key='contractors-ir35' and status='active' and monitor_until >= current_date order by monitor_until;`
(the column is `slug`, not `page_slug`; the rollout doc's query names a column that does not exist.)

## Link floor captured

`node docs/_engines/instruments/sweep.mjs --site=contractors-ir35 --base=http://localhost:3611 --sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac --article-depth=3 --sample=9999 --save-baseline`
-> `docs/contractors-ir35/_port/sweep_baseline.json`: 157 URLs (95 core + 62 of 62 articles),
2755 internal links, 219 `data-cta`, 14 dashes.
`--sample=9999` passed deliberately: the default of 30 would have built the floor from a tenth
of the corpus and could not prove no harm on the rest.
`--article-depth=3` derived, not assumed: `src/app/blog/[category]/[slug]` exists and rendered
hrefs are two-segment.

Server identity proved before any instrument ran:
- bound port read from the server log, not assumed: `Local: http://localhost:3611`
- served title asserted: `Specialist Contractor Accountants | IR35 Advice UK` (this site, not a sibling)
- artefact age proved with a string whose commit date is known: `/thank-you` carries the Aswatax
  partner disclosure from `18b4f25f`, the deployed SHA's own last commit. A stale `.next` would
  not have it, and a stale baseline is worse than none because it produces a confident wrong diff.
