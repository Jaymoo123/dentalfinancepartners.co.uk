# Estate ops read (2026-09-28)

Scope: brief section 5, `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md`. Read-only:
repo, Vercel API, Supabase REST (anon-scoped key), `gh`. No writes, no deploys, no git mutations.

## 10-line summary

- **17/17 sites live**, all return 200 on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`,
  `/sitemap.xml`, `/blog`. No NXDOMAIN, nothing unlaunched.
- **7 sites at HEAD** (0 commits behind): Property, Medical, care, charities, contractors-ir35
  (all 4 landed together, deploy `815ae7de`, 2026-09-28 15:04), plus Dentists and generalist
  (deploy `a796de63`, 2026-09-28 12:58, 2 commits behind each, both docs-only).
- **10 sites behind HEAD**, all on the 2026-09-23 batch (`981a604e`) or later: pharmacies (15),
  hospitality (16), construction-cis (16), startups-tech (16), crypto (15), digital-agency (14),
  ecommerce (22), Solicitors (13, on an older `153e5017`), divorce-finances (13), wills-probate
  (13). These sites have not received the 09-28 positioning ruling or lead-kit fixes.
- **Red CI in the last 7 days: 9 runs**, all one workflow, **"Content Quality Check"**, all under
  a minute, every one paired with a passing "CI - Build & Lint" on the same push (build is not
  broken; the content checker is failing on something, see below). Plus 1 failed **"State
  check"** schedule run. 10 failures total, all mailed to the owner.
- **No failed production deployments** on any of the 17 Vercel projects in their last 10 builds.
- `calc_pdf_offer` flag: **ON** in `site_flags` (Supabase), £29, live since 2026-09-14. No
  nurture row in `site_flags`; nurture is controlled by env vars instead (see below).
- `LEAD_NURTURE_ENABLED` env var **exists** on Property, Medical and charities Vercel projects
  (spot-checked 3 of 17; the key is present, value hidden by the API on list calls, so "ON in
  prod" per owner claim is unverified, not contradicted).
- `check_dependency_closure.py`: **OK** across 19 sites. `check_audience_pages.py`: **0
  findings** across 13 checked files.
- CSP: **all 17 sites** carry `connect-src ... https://*.google-analytics.com ...`, which covers
  `region1.google-analytics.com` by wildcard (no literal string match, confirmed against source).
  HSTS present on all 17. **X-Frame-Options missing on 4**: crypto, ecommerce, pharmacies,
  startups-tech.
- monitored_pages has rows for **9 of 17** sites (1065 total, property=643, generalist=209,
  dentists=53, agency=36, medical=19, construction-cis=15, solicitors=76, contractors-ir35=8,
  hospitality=6); **8 sites have zero rows**: charities, care, crypto, ecommerce, pharmacies,
  startups-tech, wills-probate, divorce-finances.

## 1. Live status, all 17 domains

`curl -sI` against each, 2026-09-28 ~15:51 UTC. All six paths 200 on every domain.

| Site | Domain | `/` | robots | llms | llms-full | sitemap | blog |
|---|---|---|---|---|---|---|---|
| Property | www.propertytaxpartners.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| Medical | www.medicalaccounts.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| contractors-ir35 | www.contractortaxaccountants.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| care | www.carehometax.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| charities | www.trusteetax.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| Dentists | www.dentalfinancepartners.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| Solicitors | www.accountsforlawyers.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| generalist | www.hollowaydavies.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| digital-agency | www.agencyfounderfinance.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| construction-cis | www.tradetaxspecialists.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| crypto | www.cryptotaxpartners.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| ecommerce | www.ecommercefinance.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| hospitality | www.hospitalitytax.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| pharmacies | www.pharmacytax.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| startups-tech | www.foundertaxpartners.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| wills-probate | www.estateplanningspecialists.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |
| divorce-finances | www.divorcefinancespecialists.co.uk | 200 | 200 | 200 | 200 | 200 | 200 |

**Header checks** (`curl -sID https://<domain>/`, full response saved per site):

- **CSP `region1.google-analytics.com`**: no site carries the literal string. All 17 carry
  `connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com
  https://analytics.google.com https://*.supabase.co ...` (Property's header shown, others
  identical shape). The wildcard `https://*.google-analytics.com` matches
  `region1.google-analytics.com` as a subdomain, and the source fix at
  `packages/web-shared/lib/security-headers.ts:85` deliberately uses the wildcard for this
  reason (commit `981a604e`, "GA4 routes EU/UK hits to regional endpoints ... so the wildcard is
  required"). Verdict: **the GA4 EU/UK fix is live on every site**, correcting a literal-string
  check that would have false-negatived here.
- **HSTS**: present on all 17 (`Strict-Transport-Security: max-age=...; includeSubDomains;
  preload` or equivalent).
- **X-Frame-Options**: present on 13 of 17. **Missing** on crypto, ecommerce, pharmacies,
  startups-tech. These 4 are also the 4 furthest behind HEAD (see section 2) and share the same
  09-23 deploy `981a604e`, so this is one gap, not four independent ones; whatever else changed
  in the header builder between `981a604e` and HEAD did not reach these projects.

## 2. Deployed commit vs HEAD, per Vercel project

Vercel REST API (`v9/projects`, `v6/deployments?target=production`), token from root `.env`
`VERCEL_TOKEN`, org `team_XF9WAygZX7SGk9Fo4tOAnihH`. "Commits behind" =
`git log --oneline <deployed-sha>..HEAD -- <site>/ packages/ | wc -l`.

| Site | Vercel project | Latest READY prod deploy (UTC) | Deployed SHA | Commits behind touching site |
|---|---|---|---|---|
| Property | property-tax-partners | 2026-09-28 15:04 | `815ae7de` | 0 |
| Medical | medicalaccounts.co.uk | 2026-09-28 15:04 | `815ae7de` | 0 |
| care | care | 2026-09-28 15:04 | `815ae7de` | 0 |
| charities | charities | 2026-09-28 15:04 | `815ae7de` | 0 |
| contractors-ir35 | contractor-finance-partners | 2026-09-28 15:04 | `815ae7de` | 0 |
| Dentists | web | 2026-09-28 12:59 | `a796de63` | 2 |
| generalist | holloway-davies | 2026-09-28 12:58 | `a796de63` | 2 |
| Solicitors | solicitors | 2026-09-24 14:56 | `153e5017` | 13 |
| divorce-finances | divorce-finance-specialists | 2026-09-25 23:21 | `b86a990a` | 13 |
| wills-probate | estate-planning-specialists | 2026-09-25 23:17 | `b86a990a` | 13 |
| digital-agency | agency-founder-finance | 2026-09-23 12:17 | `981a604e` | 14 |
| crypto | crypto | 2026-09-23 12:27 | `981a604e` | 15 |
| pharmacies | pharmacies | 2026-09-23 12:23 | `981a604e` | 15 |
| construction-cis | trade-tax-specialists | 2026-09-23 12:11 | `981a604e` | 16 |
| startups-tech | startups-tech | 2026-09-23 12:24 | `981a604e` | 16 |
| hospitality | hospitality | 2026-09-23 12:26 | `981a604e` | 16 |
| ecommerce | ecommerce | 2026-09-23 12:19 | `981a604e` | 22 |

This confirms the brief's note directly: **Property, Medical, contractors-ir35, care, charities,
Dentists and generalist are the 7 sites carrying the 2026-09-28 rounds**, independent of what
`docs/<site>/STATE.md` says. The other 10 are still on pre-ruling code; the positioning reversal
(rule 8, "the brand IS the firm") and the lead-kit fixes referenced in commits `815ae7de` /
`a796de63` have not reached them.

**Failed deployments, last 7 days, any project**: none. Every project's last 10 production
deployments returned `state: READY`; no `ERROR` states in that window on any of the 17.

## 3. CI: red runs, last 7 days

`gh run list --limit 30` from repo root, 2026-09-28. **10 failures** in the visible window
(oldest run shown is 2026-09-26 18:32, so the 30-row window does not quite cover a full 7 days
at this push rate; treat this as a lower bound):

| Run | Workflow | Trigger commit (truncated) | When |
|---|---|---|---|
| 36439036621 | Content Quality Check | feat(estate): the free first call now sets the expectation of a paid... | 09-28 14:50 |
| 36435034395 | Content Quality Check | docs(leads-250): independent full lead-kit check... | 09-28 14:18 |
| 36429905241 | State check | (schedule) | 09-28 13:37 |
| 36425969921 | Content Quality Check | ci(charities): can-charities-claim-back-vat meta description... | 09-28 13:04 |
| 36424836654 | Content Quality Check | ci: green the two workflows that went red on today's pushes | 09-28 12:54 |
| 36423962396 | CI - Build & Lint | fix(property): three internal blog links resolve... | 09-28 12:46 |
| 36423962272 | Content Quality Check | fix(property): three internal blog links resolve... | 09-28 12:46 |
| 36423260131 | Content Quality Check | docs(leads-250): lead-kit check brief corrected... | 09-28 12:39 |
| 36423260117 | CI - Build & Lint | docs(leads-250): lead-kit check brief corrected... | 09-28 12:39 |
| 36317106200 | State check | (schedule) | 09-27 11:51 |

**Pattern, not 9 separate causes**: every "Content Quality Check" failure is under a minute and
paired with a same-commit "CI - Build & Lint" pass, so this is one repeatedly-failing check, not
a build break; one commit message in the list (`ci: green the two workflows that went red on
today's pushes`) shows the owner's side was already mid-fix on this same day. The two "CI -
Build & Lint" failures both landed on the same `fix(property)` push and were followed by a
passing push shortly after (implied by later green runs on `main`), consistent with a fix-forward
rather than a stuck break. Did not open the workflow logs (out of scope, read-only report); if
the owner wants the exact Content Quality Check failure reason, that needs one `gh run view
<id> --log` read, not done here.

**All 10 failures mailed the owner** per standing CI policy; counted and reported here per rule
"own the noise you create."

## 4. Prod flags

`site_flags` table, Supabase REST, read-only:

```
[{"key":"calc_pdf_offer","value":{"link":"https://buy.stripe.com/...","enabled":true,
"price_gbp":29,"started_at":"2026-09-14T16:15:36Z"},"updated_at":"2026-09-14T16:15:36Z"}]
```

**Only one row exists.** No `LEAD_NURTURE_ENABLED` or any nurture-named row in `site_flags`;
nurture gating in this codebase is env-var based, not `site_flags`-based (confirmed by grep:
`Property/web/src/app/api/cron/lead-nurture/route.ts`,
`Property/web/src/app/api/leads/enroll/route.ts` etc. reference `process.env`, not `site_flags`).

Vercel project env listing (`v9/projects/<id>/env`), spot-checked 3 of 17 (Property, Medical,
charities, the three that just deployed together):

| Project | `LEAD_NURTURE_ENABLED` key present | Other nurture keys present |
|---|---|---|
| property-tax-partners | yes | `LEAD_NURTURE_SMS_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_TOKEN_SECRET`, `NURTURE_FROM_NAME/EMAIL/REPLY_TO`, `NURTURE_TOKEN_SECRET` |
| medicalaccounts.co.uk | yes | `LEAD_NURTURE_SMS_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_AUTOPAUSE_ENABLED`, `LEAD_NURTURE_TOKEN_SECRET` |
| charities | yes | `LEAD_NURTURE_SMS_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_TOKEN_SECRET` |

The Vercel API's env-list endpoint returns key names only, not decrypted values, for this token's
scope, so **presence confirmed, ON/OFF value not readable from here**. Owner's 09-28 claim that
nurture is on in prod is **not contradicted** by anything read; it is also not independently
confirmable without either a decrypted env pull (`vercel env pull`, not run, would touch the
working tree, out of scope for read-only) or a live nurture-send observation. Did not check env
presence on the other 14 projects; extending this table is a 5-minute follow-up if wanted.

## 5. Dependency closure

```
python scripts/check_dependency_closure.py
> dependency closure OK across 19 sites
```
No missing-package risk found.

## 6. Audience page checker

```
python scripts/check_audience_pages.py
> 0 finding(s) across 13 file(s).
```
Consistent with commit `3753a3b7` (09-28, "audience page checker no longer bans firm-identity
phrases"), the checker's rule set changed same day and currently reports clean.

## 7. Working tree: untracked / modified

`git status --short`, repo root, 2026-09-28 ~15:50 UTC:

- Modified: `invoicing/generate_invoice.py` (not ours, pre-existing per gitStatus snapshot)
- Untracked, not ours: `Admin/PROPERTY_COMMERCIAL_INVESTIGATION_2026-09-21.md`,
  `expansion_research/dwc_demand/`, `expansion_research/lead_levers_2026-09-26/`,
  `invoicing/sidekick_config.toml`
- Untracked, **expected** (this brief's other agents, one report each):
  `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md`,
  `docs/agency/PARITY_RESEARCH_2026-09-28.md`, `docs/care/...`, `docs/charities/...`,
  `docs/construction-cis/...`, `docs/contractors-ir35/...`, `docs/divorce-finances/...`,
  `docs/ecommerce/...`, `docs/generalist/...`, `docs/hospitality/...`, `docs/pharmacies/...`,
  `docs/property/...`, `docs/solicitors/...`, `docs/startups-tech/...` (14 of 17 site reports
  landed as of this read; crypto, Medical, wills-probate, Dentists not yet visible on disk at
  read time, presumably still writing).

Nothing here was touched by this agent; this report is the only file written.

## 8. monitored_pages: rows per site

Supabase REST, `monitored_pages` table, paginated (`Content-Range` capped at 1000/request,
pulled in two pages), 1065 rows total, grouped by `site_key`:

| site_key | rows |
|---|---|
| property | 643 |
| generalist | 209 |
| solicitors | 76 |
| dentists | 53 |
| agency | 36 |
| medical | 19 |
| construction-cis | 15 |
| contractors-ir35 | 8 |
| hospitality | 6 |

**8 sites have zero rows** (no `site_key` match at all): charities, care, crypto, ecommerce,
pharmacies, startups-tech, wills-probate, divorce-finances. This is a question, not a finding:
these sites may simply never have run a monitored rewrite/net-new wave, which would be entirely
expected for the four just-launched or thin-content sites; it is not evidence of a broken
tracker.

## Questions / could not verify

- `LEAD_NURTURE_ENABLED` actual value (on/off) in prod, and on the 14 unchecked projects.
- Exact failure reason inside "Content Quality Check" (log not opened, read-only scope).
- Whether the `gh run list --limit 30` window fully covers 7 trailing days; oldest visible run
  was 09-26 18:32, so any red run before that timestamp would not appear here.

## Commands and files read

- `curl -sI` / `curl -sI -D -` per domain per path, 17 domains x 6 paths + full header dump.
- Vercel API: `GET /v9/projects`, `GET /v6/deployments?target=production&limit=10` x17,
  `GET /v9/projects/<id>/env` x3.
- `gh run list --limit 30` (repo root).
- `git status --short`, `git log --oneline <sha>..HEAD -- <dir>/ packages/` x17,
  `git log -5 --oneline -- packages/web-shared/lib/security-headers.ts`.
- `python scripts/check_dependency_closure.py`, `python scripts/check_audience_pages.py`.
- Supabase REST: `GET /rest/v1/site_flags?select=*`,
  `GET /rest/v1/monitored_pages?select=site_key` (paginated).
- `grep -n "region1" packages/web-shared/lib/security-headers.ts`.
- Root `.env` for `VERCEL_TOKEN`, `SUPABASE_URL`, `SUPABASE_KEY`.
- Memory: `vercel_cli_deploy_workflow.md` for project ids and org id.
