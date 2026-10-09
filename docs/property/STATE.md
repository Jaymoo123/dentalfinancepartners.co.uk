# Property, program state (single living doc)

**Verified against the repo and the live site on 2026-10-09.** Sections 0 to 10 are the orientation: stable, short, and kept true. Below them, "Live programme detail" holds the full text of anything still in flight. Everything closed lives in `docs/property/_archive/STATE_HISTORY_2026-06_to_2026-10.md`, moved there verbatim on 2026-10-09.

**How to keep this doc honest.** When you finish a piece of work: update section 6 (in flight) and section 7 (open items), add one line to the log in section 11, and move any section that has closed to the history file. Do not append essays here. Do not create a second handoff, pickup or resume doc for Property; this is the one.

---

## 0. Start here, in this order

1. `CLAUDE.md` at the repo root (auto-loaded) and the `standard_terms` skill (`.claude/skills/standard_terms/SKILL.md`). The skill is the owner's standing working agreement. Load it before any non-trivial task.
2. This doc, sections 1 to 8. About fifteen minutes.
3. Then only what the task needs:
   - Service pages, commercial queries, "property accountant" demand: `docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md` (rulings R1 to R29, per-page spec, gated steps, reads). Companion plan with the owner facts F1 to F6 and decisions D1 to D5: `docs/property/COMMERCIAL_RECOVERY_PLAN_2026-10-07.md` section 6.
   - Any tax fact or figure in copy: `docs/property/house_positions.md` (640 KB, locked ground truth cited by section number). Grep it for the section you need; never read it whole.
   - Lead capture, forms, nurture, pricing: `docs/property/LEAD_CAPTURE_MAP.md`, `docs/property/LEAD_NURTURE_SYSTEM.md`, root `DECISIONS.md` (owner decisions on tiers, consent and claims).
   - Design or UI: `docs/property/DESIGN_SYSTEM.md` section 0 first. The governing rule is "take their design" (owner, 2026-08-22).
   - Monitoring, alerts, what emails the owner: `docs/_engines/CARETAKER.md`.
   - Running a net-new wave or a rewrite batch: `docs/_engines/NETNEW_PROGRAM.md`, `docs/_engines/REWRITE_PROGRAM.md`, `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`.

**Before you change anything**, the six things most often missed:

- Verify, then claim. A surface is live because something renders it. Absence of data is a question, not a finding.
- Fresh data only. Stored `gsc_query_data` is sampled; never SUM it. Pull Search Console through the API (`agents/utils/gsc_client_oauth.GSCClient` or `scripts/_fresh_gsc_bing_pull.py`) and state the data-through date.
- Deploy, IndexNow and monitored_pages registration are owner-triggered, in that turn, never on your own.
- Nothing that interrupts the owner (monitor, cron, email, popup, banner) without asking first.
- A changed blog post must bump `dateModified`. CI fails otherwise and the failure emails the owner.
- Rewrite only. Never collapse or 301 a page. No Google Business Profile. No em-dashes in copy.

---

## 1. What this site is

| Fact | Value |
|---|---|
| Brand, domain | Property Tax Partners, `https://www.propertytaxpartners.co.uk` (non-www and http 308 to it) |
| What it does | Lead generation for a UK specialist property accountancy firm. Leads go to the firm (Umair) through the Lead Tracker; a warm handoff to a second firm (Aswatax) is built but not armed |
| Public contact facts (R27, 2026-10-09) | umair@propertytaxpartners.co.uk, +44 7723 568557 (the SMS-sending number; owner will swap for a call-receiving one later) |
| Stack | Next.js 15 app router, React 19, Tailwind 4, vitest. Shared code in `packages/web-shared`. Python 3 for engines and scripts |
| Size | 888 sitemap URLs: 806 blog posts (`Property/web/content/blog`), 15 `/for/<slug>` audience pages, 5 `/locations/<city>` pages, calculators, 4 service pages, pillar guides |
| Money pages | `/services/property-accountant`, `/services/landlord-accountant`, `/services/property-tax-advice`. Rewritten and deployed 2026-10-09 (WP1). One owner page per query family; the homepage, city pages and posts give those queries up to them |
| Vercel | team `sitenudge-projects` (`team_XF9WAygZX7SGk9Fo4tOAnihH`), project `property-tax-partners` (`prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`), rootDirectory `Property/web`, region iad1 |
| Supabase | project `dhlxwmvmkrfnmcgjbntk` (prod). Tables Property work touches most: `leads`, `web_sessions`, `web_events`, `monitored_pages`, `gsc_query_data`, `bing_query_data`, `site_flags`, `lead_handoff_*` |
| Search Console | `sc-domain:propertytaxpartners.co.uk`. Bing Webmaster site `https://www.propertytaxpartners.co.uk/` |
| IndexNow key | `Property/web/public/e8834a484dbb0d4b534baa137a284645.txt`, config in `optimisation_engine/indexing/config.py` |
| Git, right now | Production runs from branch `claude/website-estate-access-gdk8ei` at `cfe95629` (2026-10-09). `main` is at `51bc9e25` (2026-10-07) and is 56 commits behind that branch. PR #26 is open for the branch. Merging it is an owner decision (section 7) |
| Rival the owner wants to beat | djh.co.uk, #1 for "property tax accountant" on 2026-10-09. Yardstick in the blueprint section 0.1a |

---

## 2. Where everything lives

Every path below was verified on 2026-10-09. Sizes in KB where it matters.

**The site app, `Property/web`**

| Path | What | When you need it |
|---|---|---|
| `src/app/` | App Router routes. Homepage `page.tsx`; `services/`, `blog/[category]/[slug]/`, `for/[slug]/`, `locations/[slug]/`, `calculators/`, `api/` (leads, cron, track, calc) | Any page or route |
| `src/app/sitemap.ts`, `robots.ts` | Sitemap (static paths, locations, calculators, audiences, categories, posts). `staticEditedAt` is the hand-kept lastmod map for static pages (4 entries). Robots disallows `/thank-you` only | New route, lastmod, crawler policy |
| `src/middleware.ts` | Redirects and `SLUG_TO_CATEGORY_MAP` | Any new or moved blog slug |
| `src/components/` | `property/` (site-specific blocks), `layout/` (`SiteHeader.tsx`, `SiteFooter.tsx`), `ui/` (`accordion.tsx`, `FaqSection.tsx`), `blog/`, `forms/`, `calculators/` | UI |
| `src/config/niche-loader.ts`, `src/config/site.ts` | Loads `Property/niche.config.json` and exposes `siteConfig`. Pages import `siteConfig`, not the JSON | Brand, nav, contact, CTA copy, locations |
| `Property/niche.config.json` | The config: entity, contact, navigation, locations, cta, lead_form, seo | Same |
| `content/blog/*.md` | 806 posts, flat. Frontmatter required: `slug`, `title`, `date`, `category`, `metaDescription`. `dateModified` drives the "Updated" line, Article schema and sitemap lastmod | Content |
| `src/lib/blog.ts`, `src/lib/schema.ts`, `src/lib/organization-schema.ts`, `src/lib/page-summaries.ts` | Post parser and validation, JSON-LD, Organization node, the per-page summaries that feed `llms.txt` | Schema and AI surfaces |
| `public/llms.txt`, `src/app/llms-full.txt/route.ts` | Static llms.txt and the dynamic full dump. Keep both in step with live copy | AI retrieval |
| `src/tests/*.test.ts` (58 files), `vitest.config.ts` | The only Property tests. `include` is `src/**/*.test.ts`, so a `.test.tsx` would never run | Before any change |
| `package.json` scripts | `dev`, `build`, `start`, `lint`, `test`. No typecheck script; CI runs `npx tsc --noEmit` | Commands |
| `vercel.json`, `next.config.ts` | 6 app crons (nurture hourly, digest 07:00, retention 03:30, reconcile 04:30, deploy-watch 07:30, raw-batch 08:00); headers; `/pricing` to `/services` | Deploy and cron |
| `src/data/audiences.ts`, `src/lib/calculators/registry.ts`, `src/lib/locations.ts` | Audience pages, calculator registry, locations | Sitemap sources |

**Shared code**

| Path | What |
|---|---|
| `packages/web-shared/` | Source-only TS and React used by all 19 sites: `analytics/`, `leads/` (capture and `createLeadSubmitHandler`), `lead-nurture/`, `schema/` (JSON-LD builders), `design/`, `content/` (blog, feed, llms), `lib/niche-config.ts` (canonical type), `lib/frontmatter.ts`, `support/` (specialist widget), `tools/` (calculator platform) |
| `config/tiers.json`, `config/standard_terms.md` | Lead tiers and prices; standard lead terms. Mirrored in `Property/web/src/lib/leads/tiers.ts`, drift-tested |
| `sites/property.json` (+ `.discovery.json`, `.megawave-affinity.json`) | Tooling config read by the PowerShell wave scripts. Its `paths.topicPool` points at a file now in `_archive/` (stale) |
| `.vercelignore` | Allowlist of what a Vercel build can see: root package files, `packages`, `config`, `sites`, each `*/web` and `niche.config.json` |

**Engines and scripts**

| Path | What |
|---|---|
| `optimisation_engine/indexing/submit_indexnow.py` | `python -m optimisation_engine.indexing.submit_indexnow --site property <url> ...`. Owner-triggered only |
| `optimisation_engine/clients/` | `gsc_query_client.py`, `gsc_page_client.py` (site map hard-coded), `bing_query_client.py` (needs `BING_WEBMASTER_API_KEY`), `ga4`, SERP |
| `agents/utils/gsc_client_oauth.py` | `GSCClient` (OAuth token on the laptop) and `service_account_credentials()` (reads `GSC_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS`). Still live; the rest of `agents/` is legacy |
| `scripts/service_page_verify.py` | 20 deterministic checks on a BUILT service page (`--slug`, `--selftest`). Blueprint section 12 |
| `scripts/wp1_read.py` | Day-14 and week-4 reads for the service pages: URL Inspection, Search Console, live SERPs (DataForSEO), Supabase |
| `scripts/wp1_build_packs.py`, `wp1_review_pack.py`, `wp1_page_text.py` | Writer packs, owner review packs, page-as-read and query-placement files for the service pages |
| `scripts/register_monitored_batch.py` | Registers rewritten or new pages in `monitored_pages` (`--rerewrite` for a second rewrite of the same slug). Owner-triggered on deploy day |
| `scripts/validate_blog_content.py`, `scripts/check_audience_pages.py`, `scripts/validate_docs.py` | What the Content Quality Check workflow runs |
| `scripts/check_dependency_closure.py`, `scripts/predeploy_gate.py` | Run before any deploy (`npm run gate:property` is the latter) |
| `scripts/_fresh_gsc_bing_pull.py`, `scripts/_q.py` | Fresh Search Console and Bing pull; read-only SQL runner on prod Supabase |
| `scripts/property_health_sweep.mjs`, `scripts/lead_capture_tripwire.py`, `scripts/state_check.py` | What the caretaker, tripwire and daily state-check workflows run |
| `scripts/*.ps1` (`deploy-and-index.ps1`, `prepare-wave.ps1`, `launch-wave.ps1`, `close-wave.ps1`, ...) | Wave and deploy scripts. Windows and laptop only (they need `Property/.vercel/project.json`, which is gitignored) |
| `lead_engine/` | Dry-run lead distribution engine (CSV, no network). The live lead code is `Property/web/src/lib/leads/` |
| `supabase/migrations/` | 143 SQL files. `monitored_pages` has no migration here; its schema exists only in prod |

**Docs**

| Path | What |
|---|---|
| `docs/property/STATE.md` | This doc |
| `docs/property/_archive/STATE_HISTORY_2026-06_to_2026-10.md` | Everything closed from this doc, verbatim, with the original line numbers noted |
| `docs/property/_archive/` (other 200 files), `docs/property/_wave1/` | Waves 1 to 9, Track 2 handoffs, megawave logs, the wave 1 audience-page build. History only |
| `docs/property/house_positions.md` | Locked tax ground truth, cited by section |
| `docs/property/commercial_recovery_2026-10-07/` | The 2026-10 commercial programme: blueprint, query assignment, teardown, language probe, answer-pattern spec, register targets, reads (`READ_BASELINE_2026-10-07.md`, then `READ_D14_*.md`, `READ_W4_*.md` when run) |
| `briefs/property/wp1-services/` | The service-page build record: packs, writer and reviewer prompts, reviews, merges, verify reports, review packs with screenshots, `LINKS_APPLIED_2026-10-09.md` |
| `briefs/property/<cluster>/` | Per-cluster dossiers (cgt, sdlt, rental, tools, agents, rural-estates, bing-experiments-2026-08) and per-wave briefs |
| `docs/property/DESIGN_SYSTEM.md` | Components, conventions, the owner's design rules |
| `docs/property/LEAD_*.md`, `NURTURE_ENGINE.md` | Lead capture map, multistep, detail capture, nurture system and programme |
| `docs/_engines/` | Estate-wide methodology. Start with `CARETAKER.md`, `NETNEW_PROGRAM.md`, `REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`, `LEADS_250_PROGRAMME_2026-09-27.md`. `COPY_SWEEP_REVIEW_2026-10-02.md` is 1 MB; grep it |
| Root `README.md`, `DECISIONS.md`, `Admin/ISSUE_LOG.md` | Estate overview (partly stale, see section 7), lead-engine decisions, estate issue log |

**CI and automation (`.github/workflows/`)**

| Workflow | Trigger | What it does |
|---|---|---|
| `ci-build-test.yml` | PR to main, push to main | Dependency closure, then per changed site: lint, `tsc --noEmit`, tests, build. Red runs email the owner |
| `content-quality-check.yml` | push or PR touching blog content, `niche.config.json`, `src/data`, `/for` pages, README, ISSUE_LOG | Blog validator (changed files), audience pages, docs. The `dateModified` rule lives here |
| `state-check.yml` | daily 06:00 UTC | Read-only estate drift check; emails only when the alarm set changes |
| `caretaker.yml` | Mondays 07:00 UTC | Health sweep and tripwire, verdict from facts |
| `lead-capture-tripwire.yml` | every 6 hours | Live capture probe; red means capture is broken |
| `bot-scorer.yml` | daily 03:00 UTC | Scores `web_sessions` bots. Silent |
| `daily-content-pipeline`, `daily-analytics-optimization`, `weekly-*` | manual only | Dormant. Their headers still describe schedules; ignore |

---

## 3. Rules that bind every Property change

The general rules are in `standard_terms`. These are the Property-specific ones, each with its source.

- **Rewrite only, never collapse.** No 301s, no redirect collapse. Existing live 301s stay. (Locked 2026-06-04; reaffirmed in every programme since.)
- **One owner page per query family.** The three service pages own the hire-intent queries. The homepage keeps brand only (R3, R26). City pages keep local placements (Bristol stays with Bristol). Posts and city pages are re-aimed only after Google has fetched the new owners (blueprint section 6 step 13, gated on the day-14 read).
- **Freeze windows are real.** No Property deploy until 2026-10-23 so the day-14 read is attributable. One branch per work package.
- **Quality bar is A\*.** Every published number re-derivable, every tax fact from `house_positions.md`. Content is written by Opus or Fable, never Sonnet. Two QA tracks (factual against house positions, editorial for sameness and AI tells).
- **Lead forms.** One capture form under a calculator, no result gate, no email popup (owner, 2026-09-27). Consent wording is byte-exact to the pre-2026-08-15 text; any change goes through a conversion read first (2026-08-24). Every "Book" button goes to `/contact`, not to an in-page form (2026-10-08 and 2026-10-09).
- **Design.** "Take their design" (2026-08-22). A calculator never gets a card; every section carries a visual; a bare button is not a CTA block (2026-08-23). Header CTA breakpoint `lg:` is an owner lock. MTDCountdown is deleted outright.
- **Wording.** "Enquiries", never clients, advises, manages or serves. No membership or credential claims the firm cannot stand behind. "Property developer" stays as a term.
- **Monitoring.** Nothing new that emails or interrupts the owner. Controls in experiments are never edited.
- **Deploys.** Owner-triggered, from a pushed SHA, after `check_dependency_closure.py` and a local build. Then, same day and only if asked: IndexNow, `register_monitored_batch.py`, a one-line deploy record in section 11.

---

## 4. Access, and what exists only on the owner's laptop

**In a cloud session you have:** the GitHub connector (push to the working branch; CI runs on PRs to main), the Vercel connector (team `sitenudge-projects`; deployments are created with a `gitSource` of org `Jaymoo123`, repo `dentalfinancepartners.co.uk`, the branch and the SHA), the Supabase connector (project `dhlxwmvmkrfnmcgjbntk`), and whatever credentials the owner pastes that session. On 2026-10-09 he supplied a Search Console service-account JSON (he said he is aware of the risk and wants to keep using it), a DataForSEO login, and the Bing Webmaster key. They were held in the session scratchpad only, never committed. Ask for them again in a new session; do not look for them in the repo.

**On the laptop only (`C:\Users\user\Documents\Accounting`):** the memory store (`C:\Users\user\.claude\projects\...\memory\`), so any doc line that cites a `[[memory_name]]` points at something you cannot read here; `Property/.vercel/project.json` and the Vercel CLI login; the PowerShell wave and deploy scripts in working form; `run_daily_snapshot.bat`; the two PowerShell hooks in `.claude/settings.json`; the OAuth token for `GSCClient` (`secrets/gsc_token.pickle`). In the cloud, use the service-account path for Search Console and the Vercel connector for deploys.

**Preview deployments** are SSO-protected on this team; the owner cannot open them from his phone. To show him a page, publish an artifact or deploy to production when he asks.

---

## 5. How to verify and ship

Local gates, from `Property/web`, all of which CI also runs:

```
npm ci                      # at the repo root, once per session (workspaces)
npm run lint
npx tsc --noEmit
npm run test                # vitest, 1,643 tests on 2026-10-09
npm run build               # exit 0 is the gate; eslint runs inside it
```

Content gates, from the repo root: `python scripts/validate_blog_content.py` (changed posts), `python scripts/check_dependency_closure.py` (before any deploy). Service pages: `python scripts/service_page_verify.py --slug <slug>` on the built HTML, 0 BLOCK is the bar.

Deploy, only when the owner says so in that turn: push the branch, then create the production deployment through the Vercel connector from that SHA. Wait for READY, then fetch the live page and confirm the change is rendered (title, H1, the specific string). Then, if asked: IndexNow for the changed URLs, `register_monitored_batch.py`, sitemap resubmit through the Search Console API, and the one-line record in section 11. Count every failed CI run and failed deploy and tell him before he sees the email.

Reads: `python scripts/wp1_read.py --deploy-date 2026-10-09 --label D14` (needs the Search Console, DataForSEO and Supabase credentials) writes `docs/property/commercial_recovery_2026-10-07/READ_D14_<date>.md`. Nothing is mailed.

---

## 6. In flight now (dated)

| Programme | State on 2026-10-09 | Next step, date |
|---|---|---|
| **WP1 service pages** (the current priority) | Three production deploys on 2026-10-09 (`eba68bdb` pages and links, `0d649aaf` homepage title, `cfe95629` sitemap lastmod and homepage H1). Harness 0 BLOCK. 93 body links in from 72 files. `monitored_pages` rewrite rows registered, watch to 2027-01-07. Owner requested indexing for the three pages at 13:05 UTC; sitemap resubmitted 15:16 and 15:30 UTC; IndexNow sent. As at 19:55 UTC Google had not recrawled the three (last crawls 5 and 6 August) and had not re-read the sitemap since 11:42 UTC; Bing recrawled the homepage and the tax-advice page at 13:11 UTC | No Property deploy until 2026-10-23. Day-14 read 2026-10-23 (`wp1_read.py --label D14`). PASS means proceed to blueprint step 13 (retitle Bristol, Birmingham and the Belfast post to local only). Week-4 read 2026-11-06 (`--label W4`). If Google still shows the August crawl on Monday 2026-10-13, look closer |
| **Aswatax warm handoff** | Built and tested, not armed. Full detail below | Arming is an owner decision with prerequisites (section 7) |
| **Bing experiments batch** (deployed 2026-08-18, 20 pages, three isolated experiments) | Monitor runs to 2026-11-16. No read outcome has ever been recorded | Record the 28-day and 90-day reads against the dossier's triggers, `briefs/property/bing-experiments-2026-08/DOSSIER.md` |
| **Monitored windows still open** | SDLT batch (2026-08-18) to 2026-11-16; wave 12, agents and landed-estates rows (70) to 2026-11-19; commercial-capture 90-day read of `/landlord-tax` due about 2026-11-03 | Reads on those dates; set a numeric bar before each |
| **Lead rate bar** (from the 2026-09-30 decline trace) | Bar: Property at or above 12 leads in 7 days, week ending 2026-10-11 | Read the week after, with the window stated |
| **Redesign behaviour read, other sites** | Six sites took the port 2026-09-16; no readable before and after yet | Re-read no earlier than late October 2026 |
| **Estate parity phase 0, Leads-250 S5, wave 1 audience pages, result-gate removal** | All in production (git ancestry of `cfe95629` verified 2026-10-09; the earlier "NOT deployed" headings were stale) | Their reads: Bing at 28 days and `/for/*` entry leads per 1,000 at 4 weeks from 2026-09-28; result-gate read at 4 weeks |

---

## 7. Open items awaiting the owner

Decisions only he can make, oldest first where it matters. Ask them in plain language, bundled, never a drip.

1. **Merge `claude/website-estate-access-gdk8ei` to `main`** (PR #26). Production already runs from the branch; main is 56 commits behind.
2. **Privacy notice versus retention cron** (2026-09-12). The notice promises deletion the cron does not perform. Options: arm the job, change the words, or accept and record. Not urgent.
3. **Aswatax arming**: `LEAD_HANDOFF_MODE=live` with `LEAD_HANDOFF_PARTNER_EMAIL` and `LEAD_HANDOFF_BCC` set, the hourly cron scheduled, Umair's agreement to be the named voice, written confirmation of the CIOT firm registration, and the "who sends" question (system or Umair). Re-watermark immediately before going live.
4. **Day-14 read routine**: whether to set a one-off routine for 2026-10-23 that runs the read and leaves the report in the repo (no email). Otherwise he pings on the day.
5. **Hub demotion**: whether `/services`, `/calculators` and `/blog` get a clickable top-level nav route back (2026-09-26 read).
6. **Header CTA breakpoint** (his lock), **`resource_block` restore** on calculator pages, the designer's unbuilt C17 form restage, the blog sidebar card: left alone 2026-10-08, owner to rule.
7. **Decision M**: the "280+ properties enquired about" stat tile wording. **Decision I**: a fee figure on `/services/property-accountant`.
8. **Request indexing on the 20 May posts** that match the crawled-not-indexed pattern (Search Console action, reversible, needs his go).
9. **One-form-per-page rule** for Solicitors, Dentists and Generalist blog posts.
10. **Incorporation cluster (Phase D)** was deferred to after the SDLT 28-day reads; the re-check is overdue.
11. **`site_flags.calc_pdf_offer.enabled`**: one entry says set to false on deploy day, another says still true with the code gone. Verify in prod before anything relies on it. The unreachable PDF API routes under `api/calc/pdf-offer` can be removed once confirmed off.
12. **ISR fallback size**: the blog once crossed the 19.07 MB ceiling and was worked around with `VERCEL_BYPASS_FALLBACK_OVERSIZED_ERROR=1`. A structural fix (lazy post loading or split routes) is the inter-wave item before it recurs.
13. **CGT at 21%** in a shared calculator and the "Property Accountants UK" wordmark: raised 2026-10-09, not actioned.
14. **Security**: Vercel and Supabase advisories unread; `.cache/admin_keys.txt` and 145 other `.cache` files are tracked in git although `.cache/` is gitignored (not opened; may hold secrets); the Search Console service-account key he uploaded should be rotated when convenient.
15. **Pending follow-ups from June**: de-stale `2027-property-income-tax-rates-landlords-uk`; the SDLT 15 to 17 percent sweep queued for after the rewrite programme (his 2026-06-01 steer: fix on touch).

**Known stale docs** (do not be misled; fix on touch): root `README.md` says 17 sites and lists a `shared/web-core/` folder that does not exist (there are 19 web apps); `docs/Manager_prompt` is a May 2026 wave-7 pickup pointing at a moved file; `sites/property.json` `paths.topicPool` points at `docs/property/topic_gaps_final.md`, now in `_archive/`; `docs/_engines/CRO_PARITY_PROGRAM.md` labels Property "DO NOT DEPLOY" and `CONTENT_SWEEPS_BACKLOG.md` says Property is read-only, both scoped to the old parity programme; `Property/web/README.md` and `Property/pipeline/README.md` describe the Dentists site; `docs/property/PARITY_RESEARCH_2026-09-28.md` still cites the 16 September deploy as latest; the optimisation engine is "retired" in `README.md` and `Admin/ISSUE_LOG.md` (I-004) but `bot-scorer.yml`, `state_check.py` and the GSC and Bing clients still use it, and Search Console and Bing ingestion is unscheduled, so `gsc_query_data` and `bing_query_data` go stale silently.

---

## 8. Standing owner rulings

One line each, dated, in his words where recorded. The commercial-programme rulings R1 to R29 are in the blueprint and not repeated.

- 2026-06-01: targeted remediation queued for after the rewrite programme; fix on touch, not a standalone sweep.
- 2026-06-04 (locked): A\* or don't ship; rewrite-only, never collapse.
- 2026-07-08: single lane per wave; no A/B/C, one sub-agent per pick.
- 2026-07-23, widened 2026-09-25: content is Opus or Fable, never Sonnet.
- 2026-08-16: never create anything that interrupts him without asking.
- 2026-08-18: experiment controls are never edited.
- 2026-08-21: four expansion decisions approved as recommended (rural bounded, developers one pillar, agents resource surface, sequencing); "dont bother deploying it, just complete it to the highest standard" (wave 11, later deployed in the consolidated release).
- 2026-08-22: "take their design".
- 2026-08-23: a calculator never gets a card; every section carries a visual; a bare button is not a CTA block; header CTA breakpoint `lg:`; MTDCountdown deleted; calculator link cards removed from three pages.
- 2026-08-24: consent notice reverted byte-exact; any future consent-wording change goes through a conversion read first.
- 2026-09-12: first-person voice and fixed-fee positioning untouched; retention purge needs its own slot and an explicit yes.
- 2026-09-15 and 2026-09-16: Aswatax handoff is Property only for now; only leads arriving after go-live are introduced; the two Aswatax claims (individual CTA versus firm CIOT registration) never merge.
- 2026-09-26: deep-scroll modal disabled.
- 2026-09-27: "We don't want any email pop up on the calculators. Remove the calculator result gate and have a form directly underneath the calculator"; "remove the pdf offer and revert it to what it was".
- 2026-09-30: wording revert shipped alone; "free consultation" restored.
- 2026-10-08: the three service pages "should be the crème de la crème of the whole site"; every relevant page links to them and competing pages do not; Belfast and location pages must not compete for the top queries; a local placement such as Bristol stays with the location page; no 301s.
- 2026-10-09: homepage title to brand and umbrella (R3, R26); "property tax accountant" belongs to the property-accountant page; pages rewritten in place at their URLs; ship and index first, re-aim city pages after Google has fetched; query placement intent-led, "near me" never stuffed; three pages not four because the non-resident-landlord family is small; publish the contact email and SMS number; "no remote only"; keep "Property developer"; word counts cut to the ceiling where the copy allowed; deploy when ready, done the same day.

---

## 9. Ground-truth quick reference (locked, do not re-derive)

Verbatim from the 2026-06-01 lock. Full detail in `house_positions.md`.

- 2027 property rates 22/42/47 apply **England, Wales & NI** (only Scotland carved out for 2027/28).
- S24 reducer **rises to 22%** (no new basic-rate wedge); the reducer is **ITTOIA 2005 ss.272A/274A-274C** (NOT ITA 2007 — recurring writer trap).
- MTD records = **SI 2026/336**; TMA 1970 s.12B retention = **5th anniversary** (~5-6 yrs, not 7).
- SDLT higher rate (Schedule 4A FA 2003) = **17%** (since 31 Oct 2024).
- WDA 18% → **14%** (FA 2026 s.28) + new **40% FYA** (s.29 / CAA 2001 s.45U, not unincorporated-only in law); special rate pool stays 6%.
- Marginal relief = **CTA 2010 Part 3A/s.18B**; post-cessation expense relief = **ITA 2007 s.96** (NOT ITTOIA s.354).

---

## 10. History, and where it went

- `docs/property/_archive/STATE_HISTORY_2026-06_to_2026-10.md`: every closed section of this doc as it stood on 2026-10-09, verbatim and in its original order, with the original line numbers. It contradicts itself in places (the inventory that preceded this restructure found 19 such pairs); the later-dated statement is the one that was true.
- `docs/property/_archive/`: waves 1 to 9, Track 2 handoffs, megawave logs, the net-new programme doc, the design migration.
- `docs/property/_wave1/`: the 2026-09-28 audience-page build and its QA.
- `briefs/property/`: the per-page and per-cluster build records.

---

## 11. Log (one line per deploy or decision, newest first)

- 2026-10-09 19:58 UTC: STATE.md restructured into orientation plus live detail; closed history archived verbatim.
- 2026-10-09 15:16 UTC: production deploy `dpl_43fZDSzN6hVK4U3Y4QzcTdYYJkNq` at `cfe95629` (sitemap lastmod on the four changed static pages; homepage H1, WebPage name and description to the R26 brand form). Sitemap resubmitted, IndexNow sent.
- 2026-10-09 12:58 UTC: production deploy `dpl_CpSH2UYxan7UK4oEm7EWE96exTyZ` at `0d649aaf` (homepage title carries the brand).
- 2026-10-09 12:51 UTC: production deploy `dpl_8VEjoSyDktnjMYBgWMeJe55MdvmW` at `eba68bdb` (WP1: three service pages, header and FAQ in server HTML, 93 inbound links, contact facts, every Book button to `/contact`, lead-flow fixes). `monitored_pages` rewrite rows registered. IndexNow sent. Owner requested indexing 13:05 UTC.
- 2026-10-09: two red CI runs (195, 196) from posts changed without a `dateModified` bump; fixed the same hour.
- 2026-09-30: wording revert deployed alone ("free consultation" restored).
- 2026-09-28: estate parity phase 0, Leads-250 S5 and the one-form-under-a-calculator change live.
- 2026-09-16: estate-wide release `90fbea9c` (design port review passes, claims fixes, header CTA fix, favicons).
- 2026-08-24: consent wording reverted estate-wide (`435cc12e`).
- 2026-08-23 20:21 UTC: designer redesign port cut over to production.
- 2026-08-21: consolidated deploy (wave 11, CGT, tools, rental, agents, landed estates); 39 then 70 `monitored_pages` rows.
- 2026-08-18: SDLT batch and Bing experiments batch deployed.
- 2026-06-02: Track 2 rewrite programme deployed; 64 `monitored_pages` rows.

---

# Live programme detail (verbatim, dated)

The sections below are kept in full because something in them is still open. When one closes, move it to the history file and delete it here.

## 2026-10-09 WP1 service pages: BUILT and DEPLOYED 2026-10-09 12:51 UTC (production, eba68bdb, owner-triggered via the Vercel connector)

**Deploy record.** Production deployment `dpl_8VEjoSyDktnjMYBgWMeJe55MdvmW` from `claude/website-estate-access-gdk8ei` at eba68bdb, READY 12:51 UTC, aliased to www.propertytaxpartners.co.uk. Owner said "let's deploy" at 12:47 UTC after walking the preview. Carries: the three rewritten service pages, FAQ answers and header links in the server HTML, 93 inbound body links, the contact facts (R27), the homepage title (R3), every Book button to /contact, and the earlier lead-flow fixes (hero CTAs, widget 12s delay, friction-ping guard). monitored_pages: three `rewrite` rows registered 2026-10-09 (monitor until 2027-01-07; baselines 0/1/99, 0/149/68.8, 0/206/70.2; Bing none), the 2026-08-05 net_new rows resolved. IndexNow submitted for the three pages and the homepage. Follow-up production deploy `dpl_CpSH2UYxan7UK4oEm7EWE96exTyZ` at 0d649aaf, READY 12:58 UTC: homepage title now carries the brand (the layout title template does not apply to the root page). Third production deploy `dpl_43fZDSzN6hVK4U3Y4QzcTdYYJkNq` at cfe95629, READY 15:16 UTC, owner said "Deploy" after the afternoon sweep: sitemap lastmod 2026-10-09 on the homepage and the three service pages (they had none, so the sitemap gave Google no change signal), and the homepage H1, WebPage name and meta description moved to the R26 brand form (the H1 had been byte-identical to the property-accountant H1). Sitemap resubmitted in Search Console via the API 15:16 UTC (Google had last read it 11:42 UTC, before any of today's deploys); IndexNow sent for the four URLs and the sitemap. Sweep found nothing else blocking: robots, canonicals, redirects, Googlebot fetch, no Vercel firewall, schema valid, internal links live. Google's URL Inspection at 14:59 UTC still showed the August crawls for the three pages; Bing had recrawled the homepage and property-tax-advice by 13:11 UTC. Three production deploys today in total; the 14-day no-deploy window runs from 2026-10-09. Owner requested indexing in Search Console for the three service pages at about 13:05 UTC on 2026-10-09 (the homepage was not requested; it is crawled often). Day-14 read due 2026-10-23: `python scripts/wp1_read.py --deploy-date 2026-10-09 --label D14`; week-4 read due 2026-11-06 with `--label W4`. Next: no Property deploys for 14 days; day-14 read with `scripts/wp1_read.py --deploy-date 2026-10-09 --label D14`.

Owner said "go" 2026-10-09 after the blueprint was complete. Done so far, all on the branch, nothing deployed: step 0a FAQ answers in the server HTML (`Property/web/src/components/ui/accordion.tsx`, force-mounted content hidden by data-state; a person sees the same accordion); step 0b header dropdown panels and mobile drawer always rendered, hidden and inert until opened (`SiteHeader.tsx`, owner locks untouched); guard test `ssr-crawl-surfaces.test.ts` fails on the old components and passes on the new; `scripts/service_page_verify.py` (blueprint §12.2, 20 checks, self-test against the 9 Oct snapshots passes); `LANGUAGE_PROBE_2026-10-09.csv` (winners say "we" twice as often as we do, cite statute never, run half our length); research packs and the writer, reviewer and merge prompts in `briefs/property/wp1-services/`. Gates run: tsc clean, vitest 1643/1643, eslint 0 errors, `next build` exit 0. CI did not run on the push (the workflow's path filter). Later the same day: answer-pattern spec written (`ANSWER_PATTERN_SPEC_services_2026-10.md`, targets in `REGISTER_TARGETS_2026-10.json`); three writers produced draft 1; conductor fix pass to draft 2 (zero harness blocks); six independent reviews (two per page) found three tax errors (joint-ownership default split, spouse gifts, the Section 24 worked example with no salary stated) and heavy repetition; three merges; three second writer passes; draft 3 is zero harness blocks on all three pages (commit 60b24709). 93 body links into the three pages from 72 files (37 / 34 / 36 from indexed sources), contact facts published per R27, llms.txt in lockstep. Two CI failures (runs 195, 196: changed posts without a dateModified bump) fixed the same hour. Owner review packs with screenshots are in `briefs/property/wp1-services/`; the owner lists (NOTE items) from the merges are their §4. Also done: the homepage title moved to the brand umbrella (R3, R26); `register_monitored_batch.py` gained `--rerewrite` (the three slugs already carry 2026-08-05 net_new rows; the new flag keys on the deploy date and resolves the old rows); `scripts/wp1_read.py` writes the day-14 and week-4 reads from URL Inspection, Search Console, live SERPs (us against djh.co.uk) and Supabase, and ran once as `READ_BASELINE_2026-10-07.md`. Gates at head: tsc clean, vitest 1643/1643, eslint 0 errors, blog validator 0 errors against the pre-link base, link audit HARD 0, next build exit 0, harness 0 BLOCK on all three. Awaiting the owner's read and per-page approval; deploy is his, from the laptop; registration of the watch is step 11 of the blueprint on deploy day.


## 2026-09-15 — Warm handoff to Aswatax, triggered from the Lead Tracker (BUILT + TESTED, NOT ARMED)

**Problem it solves.** Omar (Aswatax) phones referred enquirers cold and some ask how he
got their details. Not a consent failure: all 17 sites carry the partner-network notice,
the exact wording is stored per lead in `leads.consent_text`, and the thank-you pages have
named Aswatax since 09-09. It is a recall failure, read once at submit, days before the call.

**Mechanism.** Umair keeps triaging in the Lead Tracker
(`1MPxu7utofikLFK60nvDEPs9Y_wjLrbRAEpxKIbv-itM`). Three strict dropdowns drive everything:

| N "Sent to Omar or kept in-house" | O "Send Email?" | P "In-house Lead Contacted?" | Action |
|---|---|---|---|
| `Omar` | `Send` | any | introduce, then stop the chase |
| any | blank | `Yes` | stop the chase, no email |
| not `Omar` | `Send` | blank | nothing, reported, never guessed |
| blank | blank | blank | nothing |

Two keys are required to send because the send is irreversible and copies a customer.
Read from the existing hourly-cron machinery via `readTrackerRows`; joined on column I
(lead id) only. Runner: `POST /api/leads/tracker-sync` (CRON_SECRET bearer). Deliberately
NOT on a schedule yet: scheduling it is part of arming.

**Never twice, enforced below the application.** `lead_handoff_intros`
(`20260915000000`) takes a claim BEFORE sending. Primary key = one per lead; unique index
on normalised email = one per person. Verified in production: a second claim on the same
lead, a claim on a different lead with the same email, and a claim on a non-existent lead
are all rejected by the database. Toggling O off and on, clearing and re-setting N, and
three further runs produced zero additional sends.

**Self-arming watermark, no arming-day ritual.** `lead_handoff_control` (`20260915000001`)
holds `watermarked_at`. The first run in ANY mode claims EVERY row in the sheet, decided
or not (owner decision 2026-09-16: anything present at go-live was handled by hand; only
leads arriving after go-live are introduced), and sends nothing. There is deliberately no script and no required env var: a
one-way step that must be remembered on the right day is what gets lost at a handover.
**Ran against production on 2026-09-15 under the old decided-rows-only rule: 135
claimed, 0 sent. ARMING STEP: `UPDATE lead_handoff_control SET watermarked_at = NULL`
immediately before setting mode live, so the first live pass re-watermarks the whole
sheet as it stands that day.** Sender at arming: `LEAD_HANDOFF_FROM` and
`LEAD_HANDOFF_REPLY_TO` = `umair@propertytaxpartners.co.uk` (the only inbox Umair reads).

**Modes.** `LEAD_HANDOFF_MODE` absent or unrecognised means `report` (decides, sends
nothing). `redirect` sends real mail with every recipient collapsed to
`LEAD_HANDOFF_OPERATOR_EMAIL` and `[REDIRECT]` on the subject. `live` is the only mode
that reaches an enquirer. Second independent gate: while unarmed the recipient resolver
throws on any address that is not the operator's. Plus a per-run cap
(`LEAD_HANDOFF_MAX_PER_RUN`, default 5) so a bug emails a handful, not the tracker.

**The email.** To the enquirer, CC Omar, BCC the owner, from Umair, reply-to set.
Shaped as a reply, quoting back their own details: Name, Email, Phone, Type,
Preferred call time, Message, and up to two of their replies. Subject is
"<Name>'s enquiry", or "Your enquiry" with no usable name. Deliberately plain: no
card, no wordmark, no buttons, because a marketing shell is what made the first
drafts read as fake. Nothing is truncated; a 15,000 character enquiry round-trips
whole.

**It carries what the lead notification carried, plus what nobody carried.** Type
came from the notification and would have been lost once Umair stops forwarding.
The booked call window and any reply were already being stored and read by nobody
making the call. With a booking the ask names the slot ("booked in for Tuesday 16
September, morning, as they requested"), because "as soon as possible" directly
under a time they picked reads as nobody having looked. A time in free text is
deliberately NOT parsed: the reply is quoted verbatim instead.

**Reading real replies changed the design.** Raw email bodies carry quoted
threads, handset signatures, multi-paragraph accounts, a tracking parameter inside
a quoted link, and several open "Hi Junayd". So replies are cleaned (thread cut,
signatures and URLs removed, greetings naming our own people stripped, anything
over 280 chars dropped rather than truncated). Across 223 property leads that
keeps 112 replies and drops 21.

**Two layers, then a visible failure.** `leakedContentReason` checks the FINISHED
email for tracking parameters, internal identifiers, the lead id, quoted headers,
signatures, anyone who is not the sender, and links outside the sending domain. On
a hit it DEGRADES first, dropping the quoted replies and re-rendering, and only
refuses if that still fails. Any non-send (refusal, block, or an ambiguous pair of
dropdowns) is written to **column K** as `NOT SENT: <reason>`, because a refusal
nobody sees is worse than the leak it prevented: everyone believes the partner firm
was emailed and the enquirer hears from nobody.

**Rows move, so writes are addressed by lead id.** Every new lead inserts at row 2
and pushes the rest down, so the row number is re-resolved from column I
immediately before writing. Unmatched rows are skipped and logged, never written by
position. Writes are confined to J-M; N onward belongs to the triager.

**Column audit, verified against the live sheet 2026-09-15:** code indexes match
headers on both tabs; I is Lead ID; J-M carry no data validation that could reject
a write; N/O/P dropdowns intact and strict on both tabs. Cosmetic only: Sheet1 A1
holds a backtick instead of "Received" (nothing reads headers, only positions).

**Two third-party claims, kept distinct on purpose.** "Omar is a Chartered Tax Adviser" is
about one named individual and is evidenced in `legal/aswatax/`. "the firm is registered
with the Chartered Institute of Taxation" is about Aswatax Ltd (12923632) and rests on the
owner's assertion of 2026-09-15. It is explicitly NOT claimed that the team hold the CTA
qualification. Do not let these merge.

**Names, measured not imagined.** All 308 live leads were swept through the renderer:
255 greet by name, 53 fall back, 0 defects. Titles are stripped (19 leads would have read
"Hi Mr,"), ALL CAPS is normalised (9 leads), hyphens and apostrophes survive, and phone
numbers, email addresses, symbols, lone titles and single initials fall back to "Hello,"
rather than guessing. Greeting, subject and the line to Omar read one source and a test
fails if they ever disagree.

**Sending domains are the real constraint.** Only `propertytaxpartners.co.uk` is verified
in Resend; `dentalfinancepartners.co.uk` is in `failed` and the other 15 sites have none,
which is why their nurture already sends from the Property domain. Sending is gated on
`VERIFIED_SENDING_DOMAINS`, so other sites are refused and reported rather than bouncing.
Owner's plan covers 3 domains and all 3 slots are already consumed (property, its inbound
subdomain, the failed dentists one). **Decision 2026-09-15: Property only for now (166 of
210 tracker leads), Umair forwards other sites to Omar by hand.** Adding a site is one
line once its DNS is genuinely verified.

**Also in this change.** The owner's name is out of the customer-facing voice: nurture
greetings, the reply-ack and the shared email signature now read Umair (the other 16 sites
were already de-personalised, Property was the sole outlier). `lead-service-template.ts`
had the brand and signer hardcoded in six places, so every site's nurture email rendered a
Property wordmark; now parameterised with the estate values as defaults. `consent_given`
no longer defaults to `true` on submit: it is recorded from evidence, either the explicit
flag (LeadForm, SpecialistWidget) or the stored `consent_text` (MiniCapture,
ResultGateModal, MobileToolSlot, which send wording but no flag).

**Testing procedure, repeatable.** `Sheet2` of the same spreadsheet is the fixture tab
(`GOOGLE_SHEETS_TAB=Sheet2`), pointed at the STAGING database, so Umair's live rows and
production data are never touched. Seed a lead, set N and O, run the endpoint in
`redirect`. Note the trap: Property `.env.local` points at staging by default, so a run
meant to touch production must override `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.

**OPEN, owner-gated:**
- Arming (`LEAD_HANDOFF_MODE=live`), which needs Omar's delivery address
  (`LEAD_HANDOFF_PARTNER_EMAIL`) and `LEAD_HANDOFF_BCC`.
- Scheduling the endpoint on the hourly cron.
- Umair's agreement to being the named voice, since replies reach him.
- Written confirmation from Aswatax of the CIOT firm registration.
- Whether `Send` means "system emails Omar" or "Umair already did", or Omar gets two.


## 2026-09-12 - OWNER ITEM: the privacy notice promises deletion the retention cron does not perform (estate-wide, not urgent)

Surfaced by a design-port planning pass, not by port work, and it is not a port defect. It is a
words-versus-code gap on a legal page, so it is recorded here rather than lost.

**What the page promises.** `Property/web/src/app/privacy-policy/page.tsx` (§6, lines 199-204)
publishes two sentences: enquiry data is kept for `{company.enquiryRetentionMonths}` months "from
the date of your enquiry, after which it is deleted" (the number resolves to **24** via
`Property/web/src/config/site.ts:72` reading `enquiry_retention_months` from
`Property/niche.config.json:15`), and "our records of what you were shown and any consent you gave
are kept for **up to six years**, under access controls".

**What the code does.** The purge job exists and is scheduled: `Property/web/vercel.json:9`
registers `/api/cron/lead-retention` daily at 03:30. But
`Property/web/src/app/api/cron/lead-retention/route.ts:51-55` sets `dryRun` to true unless
`LEAD_RETENTION_PURGE_ENABLED` is `1` or `true`, and
`Property/web/src/lib/leads/retention.ts:16` states in terms that the job **SHIPS DORMANT**; the
dry-run path (`retention.ts:201`) returns `anonymised: 0` and writes nothing. **Whether that flag is
armed in the Vercel production environment is UNVERIFIED from the repo** and this entry deliberately
asserts neither way; the repo evidence says dormant, the production env has not been read.

Three further facts, all verified:
1. Even armed, the job **anonymises, it does not delete**: name, email, phone and message are
   redacted, and `retention.ts:142-145` preserves `consent_text`, `consent_at`, `status`, `source`
   and `created_at` **unconditionally** as the lawful-basis audit trail. So the published word
   "deleted" would still overstate the code.
2. **Nothing anywhere expires consent records at six years.** There is no six-year bound in code.
3. **Scope, and this is the part that matters.** `RETENTION_MONTHS_BY_SOURCE`
   (`retention.ts:39-64`) maps roughly 20 site sources (property, ashfield, dentists, medical,
   solicitors, generalist, care, charities, crypto, ecommerce, hospitality, pharmacies,
   startups-tech, construction-cis, contractors-ir35, digital-agency + the `agency` alias,
   divorce-finances, wills-probate). **One cron in the Property app governs retention for the whole
   estate**, not just Property. The same two sentences are published on at least Trade
   (`construction-cis/web/src/app/privacy-policy/page.tsx:165-169`, worded "Consent records are kept
   for up to six years") and, on a quick grep, on most other sites too.

**Three possible actions, owner's call:**
- (a) **Arm the job** (set `LEAD_RETENTION_PURGE_ENABLED`). This is an **irreversible data action
  across every site in the estate**, so it needs its own slot and an explicit yes, never as a side
  effect of another piece of work. No recommendation is made here.
- (b) **Change the words to match the code** (say anonymised rather than deleted, and either bound
  the consent records or drop the six-year claim). **This is the only option with no data risk.**
- (c) **Accept and record**, i.e. decide the gap is tolerable and note the reasoning.

Not urgent and nothing is blocked on it. Nothing was changed in code for this entry.


## 0.11 Bing experiments batch (DEPLOYED 2026-08-18, owner-triggered)

**DEPLOYED TO PRODUCTION 2026-08-18** from clean worktree at pushed `06195d7d`
(deployment `dpl_4c5BJeZLCA1DFWpDJjonTKmnAiQ7`, aliased www.propertytaxpartners.co.uk,
847 pages). 5 spot-checked URLs verified 200 with new content markers live. All 20
treatment pages armed in `monitored_pages` (rewrite_date 2026-08-18, dual G+Bing
baselines, watch to 2026-11-16; 11 inserted, 9 stale prior rows re-baselined in
place). 20 URLs to IndexNow (HTTP 200). **Next reads: Bing ~2026-09-01 (14d) and
~2026-09-15 (28d), Google 28/90d; per-experiment success/failure triggers in the
dossier.** Controls are never edited.

Estate Bing deep dive ([`../_engines/BING_DEEP_DIVE_2026-08-18.md`](../_engines/BING_DEEP_DIVE_2026-08-18.md))
produced three property-only isolated experiments, built through the §9 machine
(dossier + packs + Opus writers + two QA tracks + deterministic gates):
[`briefs/property/bing-experiments-2026-08/DOSSIER.md`](../../briefs/property/bing-experiments-2026-08/DOSSIER.md).

- **Exp 1, CTR repair:** `/calculators/lbtt-calculator-scotland` metaTitle+metaDescription
  only (registry `src/lib/calculators/tools/lbtt-calculator.ts`). Baseline Bing 2,571 impr /
  21 clicks / wpos 7.5; success = 28d Bing CTR >= 1.5% at held position; revert if wpos > 9.5.
- **Exp 2, tables:** 5 treatment posts each gained ONE comparison table (insert-only),
  5 matched controls untouched. Lever provenance: rho -0.30 (2026-08-18, second derivation
  of the 2026-08-16 direction). n=5/arm detects large effects only, stated.
- **Exp 3, conversational coverage:** 14 treatment posts each gained ONE H2 answering
  their Bing-only question queries (from per-page GetPageQueryStats), 14 controls.
  Success = a targeted question gains an impression on >= 7 of 14 pages at 28d.
- Selection protections: 452 active monitored slugs and all 57 lead-generating entry
  pages EXCLUDED from both arms; every treatment page has <5 Google clicks/28d and 0
  attributed leads/90d. No treatment page is a Google money page.
- QA found 4 must-fix factual defects in drafts (fixed pre-commit) and a legacy-defect
  delta list (rent-a-room Method A/B inversion page-wide, FHL abolition statute miscite,
  and 4 more) recorded in the dossier for a separate corrective pass.
- AT DEPLOY (owner-triggered): register all 20 treatment pages in monitored_pages +
  blog_optimizations (baselines in the dossier), then read Bing at 14/28d, Google 28/90d.
  Controls are never edited.

**Historical (archived 2026-09-16): [`HANDOFF_2026-08-21.md`](_archive/HANDOFF_2026-08-21.md)** (agents
track + Wave 12 pickup, owner-requested; supersedes HANDOFF_2026-08-20 for sequencing).
