# Agency (Agency Founder Finance) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** agencyfounderfinance.co.uk · Vercel project `agency-founder-finance` · site_key `agency` · repo dir `digital-agency/` (NOTE: Supabase `sites.content_dir` says "Digital Agency/..." with a space; the on-disk dir is `digital-agency/` — tooling normalises this).

## 2026-09-28 — Phase 0 parity (estate parity plan)

Changed, this site only (`digital-agency/web`, `digital-agency/niche.config.json`):
- Positioning sweep (rule 8 defects): `/contact` pre-submit "specialist firm from our
  partner network" line replaced with the firm-voice 24-hour promise; `/complete`'s two
  "partner network" lines (question in the research report, not a confirmed Aswatax
  pattern) converted to firm voice. `leadConsentText`, privacy policy, terms, `/thank-you`
  (confirmed Aswatax pattern, `18b4f25f3`) and the Wizard consent text left untouched
  (exempt). SMS/email nurture copy: every "a specialist will call you" -> "one of our
  accountants will call you" in `lead-nurture.ts` and `lib/resources/registry.ts`.
- Added `entity` key to `niche.config.json` (Property's shape, agency wording).
- `t0_email` (delayHours 0) now states "One of our accountants will call you within 24
  hours, Monday to Friday." per the estate standard sentence.
- Nurture timing: the 8-step sequence's `delayHours` were the cumulative timeline in the
  gap field (`0,0,4,24,48,96,168,264`, an 11-day run reading as 25 days); reset to
  Property's `0,0,4,20,24,48,72,96`. The separate 4-step sequence (`0,24,48,168`) was not
  the defect shape named in the brief and was left alone.
- Organization JSON-LD (`web/src/lib/schema/organization.ts`) ported to
  `@accounting-network/web-shared/schema`'s `buildOrganization`/`referencedOrganization`/
  `buildWebSite`, `@type` AccountingService, `parentOrganization` Ashfield Trading Ltd
  16358723 added (new field), every prior field (name, legalName, alternateName, url,
  address, description, logo, image, areaServed, knowsAbout, slogan, sameAs) preserved.
- `public/llms.txt`: all 84 page links now carry `?utm_source=chatgpt&utm_medium=llms`
  (previously 0).
- `PremiumCalculator.tsx`: the in-blog result gate (`ResultGateModal`) is permanently off
  (`gated = false`); the result always shows with one form (`CalcResultCta`) under it, no
  interstitial. `ResultGateModal.tsx` and its test file left in place, untouched, just
  unmounted (gate never opens).
- The three `/for-*` pages closed on word-for-word identical copy (both the "60 minutes
  with a specialist..." sub-line and the "Want to read first?" blurb). Added optional
  `closerBody`/`pillarBlurb` fields to `AudienceStageLayout`'s `AudienceStage` type and
  wrote a distinct sentence per page (Sonnet draft — **needs the Opus read**).
- `/book`'s "An accountant will call you then" line brought in line with the estate
  wording (contractors-ir35's line, per brief section 4). No footer link pointed at
  `/book` or any booking page (`SiteFooter` renders `niche.config.json` `footer_links`
  only); added "Book a consultation" -> `/contact#form` as the first footer link, and
  gave `/contact`'s form section `id="form"`.
- AdSense (owner ruling 2026-09-28, Solicitors pattern): `next.config.ts`
  `buildSecurityHeaders` now passes `ads: true`; `layout.tsx` metadata `verification.other`
  carries `"google-adsense-account": "ca-pub-3756285576371279"`; `ConsentedScripts` now
  takes `adsenseClientId="ca-pub-3756285576371279"`; added `public/ads.txt` (copied from
  Solicitors). No ad units added anywhere (none existed).
- **Corrected stale line below**: "GA4 not configured" was wrong even before today — GA4
  has been wired through the shared `ConsentedScripts`/`ConsentProvider` chain since the
  09-13-ish commits ahead of this file's last update; the actual gap is
  `google_analytics_id` is `""` in `niche.config.json` (plumbing agent's job, not this
  agent's, per brief section 6).

Verification: `npx tsc --noEmit -p digital-agency/web` clean, 0 errors.
`npx vitest run` from `digital-agency/web`: 12 files, 544 tests, all passed.
`git diff --stat -- digital-agency/` touches only this site's directories.
Grep for every rule-8 defect string across `web/src`, `niche.config.json`,
`web/public/llms.txt` returns zero hits outside the exempt surfaces (consent text,
privacy policy, terms, `/thank-you`).

Not done here (needs the shared agent or Opus, see `PHASE0_2026-09-28.md`): the design
port itself (explicitly out of scope for this pass), the blog-post hero image's
`scale-110` "overflow" (investigated — it is a blurred cover background inside its own
`overflow-hidden` section, deliberately oversized so `blur-sm`'s edge softening is
cropped; `scrollWidth` stays 390 on every page; not a defect), and the `enquiry_ref`
unlabelled-input NIT (present in `LeadForm.tsx`/`MiniCapture.tsx`/`ResourceGate.tsx`
across every form; not named in this brief's scope, flagged for a follow-up pass).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **23 commits** were on
the branch and not in `origin/main`.

**All 23 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'digital-agency/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'digital-agency/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Corpus + structure (as of 2026-06-12)

- Blog + fundamentals sections (`digital-agency/web/content/blog` + `content/fundamentals`; ~315 mapped slugs). UK + UAE/Dubai founder topics.
- Nurture engine composed but DORMANT (collect-only). Legacy DeepSeek title pipeline (`digital-agency/pipeline/title_optimise.py`) is RETIRED — do not reuse its LLM calls (Opus-only rule).

## Full diagnosis + fix wave (2026-07-08) — CURRENT, see `DIAGNOSIS_2026-07.md` RESUME HERE

- Medical-playbook replay: 7-lane battery on FRESH data (GSC→07-06, Bing→07-08) + Opus synthesis + skeptics + F8 page-level review.
- **Root cause: crawl-budget/authority starvation.** 18/433 indexed (4.2%); 214 discovered-not-indexed + 175 unknown; sitemap fetched daily by Google; no penalties/noindex/firewall; quality fork disproven (all 26 triaged pages read as genuinely strong); internal linking uncorrelated. Generalist same-age = 10x impressions and growing; agency flat.
- Leads: 0 all-time; funnel reframed as "traffic mis-shaped, form invisible" (denominator too small for CRO conclusions).
- Local fix wave DONE, build green, **awaiting owner deploy gate** (deploy + Vercel 308 + GSC sitemap resubmit/Request Indexing). Backlog + monitoring dates in DIAGNOSIS doc.
- Supersedes below: BADR stale spots FIXED (14 corrections, 7 files); employer-NIC hit-list was stale — agency corpus verified CLEAN at 15%/£5,000; CIS glossary page removed (topic leakage).

## Search/optimisation state

- **Data**: GSC live since 2026-04-15 (sc-domain) + Bing flowing. Young-site volumes: 90d at 2026-06-12 = 828 impressions, 0 clicks, 20 pages with any data.
- **SERP meta program batch 1 (2026-06-12)**: 30 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Several pre-existing truncated/corrupted metaTitles fixed in passing. Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d verdicts via weekly_run from ~2026-07-10.
- **Content-gap follow-ups**: `docs/agency/opportunity_register_meta_2026-06-12.md` (register only).

## Known pending

- Stale BADR 10% spots inside `earn-out-tax-treatment-hmrc-agency-sale` and `selling-agency-tax-implications` bodies (operative statements say 14%, a couple of older in-body mentions still say 10%) — flagged during meta batch 1, queued for the FA-2026 stale-figure sweep.
- GA4 not configured for this site (first-party analytics runs).
- Net-new/rewrite content programs: not yet onboarded (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).

## Blog audit + rewrite program (2026-06-12)

- Provenance: 306 claude-supabase (low confidence; subtree-merge masks true origin). Agency never had a DeepSeek generator.
- Blind quality audit: corpus sound (1 a_star / 4 acceptable / 1 needs_rewrite). The needs_rewrite page is remittance-basis-dubai: suspect FIG transitional description, queued for review.
- Rewrite worklist: `docs/agency/rewrite_worklist_2026-06-12.md`. Tier A+B = 3 pages, all in SERP meta cooldown until 2026-06-26. Execution deferred to next cycle when GSC matures (approximately 4 weeks from now). house_positions still to author before any agency wave.
- Approximately 45 pages carry stale 13.8%/GBP9,100 employer NIC (sweep queued estate-wide).
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.

- 2026-10-02 Phase 0 pre-live gate (GEO programme): firm-voice, em-dash, pipeline-leak and engagement-claim sweep plus a rendered read at 1280/390 with fixes; local, committed, not deployed. Detail and open owner items: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 14.
