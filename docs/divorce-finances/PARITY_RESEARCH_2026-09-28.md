# Divorce Finance Specialists parity research (2026-09-28)

Domain www.divorcefinancespecialists.co.uk. No Vercel project ID found in repo (no `divorce-finances/web/.vercel`,
unlike Property/Medical/Solicitors/generalist which have one locally). **Site IS live**: `curl -sI` returns
200, serves a real Next.js build (`dpl_HUvX1HdWB3BajBeuG2th1E24XsBw`), with working `/sitemap.xml` (200, 77
URLs), `/llms-full.txt` (200), `/robots.txt` (200). This contradicts `docs/divorce-finances/STATE.md` (dated
2026-08-04, says "no Vercel project... nothing is deployed") and memory `divorce_finances_build_state.md`.
STATE.md is stale by 20 commits (`git log --since=2026-08-04 --oneline -- divorce-finances/` = 20, latest
2026-09-26). Treat "unlaunched" as wrong; site has been live for some time undetected.

## Verdict in three lines

Divorce Finance Specialists is live and structurally close to the Property kit (lead form, mini-captures,
intent engine, nurture, schema all present), but it runs the pre-2026-09-28 "partner network" referral voice
across every prospect-facing surface (contact, complete, privacy, nurture emails), which the same-day ruling
now treats as a defect estate-wide, and its own `llms.txt` still says "STUB (pre-launch)" on a site that has
been serving real traffic-facing pages for weeks. The three biggest gaps: (1) positioning voice not updated
to the 09-28 ruling, unlike Property; (2) zero design-port adoption (no `web-shared/design` imports, no port
tags, no `prose-standard.css`) so it never received the kit uplift; (3) STATE.md, memory and `llms.txt` all
say the site is unlaunched when it is not, so nobody has been tracking it.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | no `entity` key in niche.config.json (N/A row per brief) | no `entity` key either | NONE | `divorce-finances/niche.config.json` has no `entity` key, same as Property |
| P2 | 0 caveat-phrase files (per known-defects list, Property already firm-voice) | 6 files carry "partner network" / "specialist partner network": `config/site.ts` (consent text), `app/contact/page.tsx`, `app/complete/page.tsx`, `app/privacy-policy/page.tsx`, `app/tests/lead-payload.test.ts`, `niche.config.json` (`partner.name`) | L | Renders on contact page, post-submit /complete, privacy policy, all prospect/lead-facing. NOTE: unlike Property, this site's actual business model is referral to a regulated family-law firm, not in-house delivery, so some partner language may be structurally necessary; this is a question for the owner, not a mechanical strip (see Questions) |
| P3 | "free consultation" language present | grep for "free" CTA copy: `niche.config.json` `cta.sticky_button` = "Try the calculators", blog CTA = "Use the free calculators"; no "free call"/"free consultation" string found in config | S | Different CTA shape (calculators, not a call) than Property; not a defect per se, just divergent, flag for owner |
| P4 | "within 24 hours" promise, ~115 occurrences, no nurture email backs it (known Property defect) | not searched exhaustively; nurture doc comment says cadence is "instant email then 7 follow-ups over ~11 days", no 24h promise text found in the nurture file header | ? | Did not grep full site/src for "24 hours" string; recommend a follow-up grep before ruling this out |
| P5 | Organization JSON-LD `@type` `["ProfessionalService","AccountingService"]`, firm-first | `divorce-finances/web/src/lib/schema.ts:31`, `"@type": ["ProfessionalService", "AccountingService"]`, `sameAs`, `knowsAbout` present (lines 39-64); no separate `organization-schema.ts` file, it lives in the shared `schema.ts` | XS | Type matches Property; file location differs (one file vs Property's dedicated `lib/organization-schema.ts`), functionally equivalent |
| P6 | `public/llms.txt` firm-first | `divorce-finances/web/public/llms.txt` (both repo and live, confirmed via curl) opens: "STUB (pre-launch): the site is built but not yet published... nothing here should be cited or indexed" | L | Live defect: the deployed site tells every AI crawler not to cite it, while the site itself has been serving real pages for weeks. One-file fix, high leverage given robots.txt actively invites AI crawlers |
| L1 | foot lead form on home/services/segment/service/blog/calculators | `LeadForm`/`LeadCTAPanel` mounted on: home, calculators/[slug], capital-gains-tax-divorce, contact, financial-settlements, for/[slug], pension-sharing, research pages (x2), BlogPostRenderer, InlineMiniLeadForm | NONE | Same page-type coverage as Property; no dedicated `/services` or `/about` foot form found, matches Property's own gaps |
| L2 | mini capture ids: inline_mini, mobile_tool, calc_result_form, calc_result, resource_block, calc_page_footer, blog_short_resource | present: `inline_mini`, `calc_result`, `mobile_tool`, `resource_block`; NOT found: `calc_result_form`, `calc_page_footer`, `blog_short_resource` | S | 4 of 7 ids present; `calc_result` used, not `calc_result_form` |
| L3 | one form under calc result, no gate, no popup, no PDF offer (gate removed Property 09-27) | `components/calculators/premium/ResultGateModal.tsx` still exists | M | This site still has a result GATE modal that Property removed; needs the same removal Property got 09-27 |
| L4 | 6 calculator route dirs + premium tools + /embed | `calculators/[slug]` (dynamic route, not per-route dirs) + `calculators/page.tsx`; `/embed` route exists | ? | Route shape differs (dynamic slug vs static dirs); did not enumerate how many calculator slugs are registered or whether each has FAQPage/cite-this, needs a data-level check, not just file tree |
| L5 | `SpecialistWidget.tsx` present | `components/support/SpecialistWidget.tsx` exists | NONE | Same file present; did not verify which pages mount it or auto-open behaviour |
| L6 | IntentProvider, ReturningBar, DeepScrollModal | all three present, plus `ExitIntentModal.tsx` (Property does not list this) | NONE/unique | Full intent kit present; extra `ExitIntentModal` not in Property's inventory |
| L7 | `StickyCTA.tsx`, copy from niche.config `cta` | `components/ui/StickyCTA.tsx` present, `cta.sticky_primary/secondary/button` in niche.config.json | NONE | Matches Property's pattern |
| L8 | /thank-you, /complete, /book, Aswatax message | `app/thank-you`, `app/complete`, `app/book` all exist | ? | Did not confirm Aswatax intro message text is present on this site's post-submit surfaces; memory says the 09-09 Aswatax rollout covered "all 15 Vercel sites" verified live, but this site had no known Vercel project at that time per STATE.md, so it may be missing, needs a live-page grep |
| L9 | `lead-nurture.ts`, delayHours = gaps, firm voice, SMS ack | `config/lead-nurture.ts` present; comment header says "Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264", this reads as CUMULATIVE, not gaps like Property's `0,0,4,20,24,48,72,96` | M | Voice is explicitly "PARTNER-FIRM FRAMING... advice comes from 'the partner firm we introduce you to'... Never 'our solicitors'", this is the caveated voice rule 8 targets. Also: comment says cumulative hours, brief says Property's correct source is gaps between sends; if this file is genuinely cumulative while Property is gaps, the two sites' cadences are not equivalent and one may be wrong, flag as a question |
| L10 | category-driven CTA, no dead code | `BlogPostRenderer.tsx` uses `InlineMiniLeadForm` (id `inline_mini`); did not check for `categorySlug` dead-code pattern | ? | Not checked in detail |
| L11 | `leadConsentText` in `config/site.ts` | `divorce-finances/web/src/config/site.ts:23`, text is BYTE-IDENTICAL to `Property/web/src/config/site.ts:39`: "To answer your enquiry, your details may be shared with a firm from our specialist partner network..." | NONE | Diffed directly, identical. Per rule 8 this is explicitly NOT a defect (consent/privacy text is unchanged by the ruling) |
| L12 | lead source in DB CHECK constraint | `supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql:32` adds `'divorce-finances'` (and similar wills-probate) to both the `leads.source` and `sites.site_key` CHECK constraint arrays | ? | Migration file exists and is code-correct; whether it has been APPLIED to prod is unknown from the repo, STATE.md lists "Supabase migration APPLY" as still outstanding from 08-04, but the site is now live serving leads via `/api/leads/submit`, so either the migration was applied since, or lead submission on the live site is failing. This is a live-verification question, not answerable read-only |

**G. GEO and machine layer**

| ID | Property | This site | Gap | Note |
|---|---|---|---|---|
| G1 | AI-crawler allowlist | `divorce-finances/web/src/app/robots.ts` lists ~40 named bots (Google, OpenAI, Anthropic, Perplexity, Meta, Bing, Mistral, You.com, Cohere, Brave, Bytespider, CCBot, Diffbot, Amazon, Yandex, Naver, Seznam, Mojeek, Ahrefs/Yep, social previews); disallow `/thank-you`, `/admin`, `/api/`; host line present | NONE | Comment says "Mirrors the contractors-ir35 surface", matches estate pattern |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | `lib/schema.ts` `buildOrganizationJsonLd()` (not the shared `web-shared/schema/organization.ts` builder, hand-rolled in this site's own file), has `sameAs` and `knowsAbout`; did not confirm `parentOrganization` (Ashfield Trading Ltd) is set | S | Hand-rolled, not the shared package builder Property uses; risk of drift from the shared source of truth |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | `lib/schema.ts` has `buildFaqJsonLd`, `BreadcrumbList` type, `Service` type all defined and imported by `for/[slug]/page.tsx` | NONE (structurally) | Types present and wired; did not verify every one of the 3 live `/for/*` pages renders all three |
| G4 | BlogPosting, author Org/Person, real `dateModified` | `schema.ts` has `BlogPosting` type with `author` as `Person` or `Organization`; blog posts are `.md` files in `content/blog/` | ? | Did not open individual post frontmatter to confirm `dateModified` is a real date vs build-time `now` |
| G5 | llms.txt firm-first, UTM-tagged, live | live but says "STUB (pre-launch)... nothing here should be cited or indexed" | L | Same defect as P6 above, listed twice by design (both rows point at the same fact) |
| G6 | `buildLlmsFullRoute`, post count listed | `app/llms-full.txt/route.ts` imports `buildLlmsFullRoute` from `@accounting-network/web-shared/content/llmsFull`, plus a hand-built GLOSSARY section; live and returns 200 | NONE | Uses the shared builder correctly |
| G7 | `lastModified` real/omitted, hreflang, new routes included | `sitemap.ts` hardcodes `lastModified: now` (build time) on every static route (home, services, financial-settlements, pension-sharing, capital-gains-tax-divorce, for, blog, calculators, about, contact) | S | Build-time `now`, not real per-page dates; live sitemap has 77 URLs, 51 tagged `blog/` |
| G8 | canonical-hub fix present | `git log --since=2026-09-26 --grep=canonical --stat` returns nothing under `divorce-finances/` | ? | No matching commits found; either the fix does not apply here or was not needed. Did not check hub pages for self-referencing canonical directly |
| G9 | noindex / /embed rule | `/embed` route exists; did not check its metadata for noindex | ? | Not checked |
| G10 | gsc_config.py entry, IndexNow key + script, Bing verified | `grep divorce agents/config/gsc_config.py` = no match (not registered); IndexNow key file `public/4d2abeb261e1ca7875c6f16ee1257ac4.txt` DOES exist (memory said this was "not yet created" as of 08-25, stale); `pipeline/submit_indexnow.py` is Property-specific, no per-site equivalent found under divorce-finances | M | Site is live and crawlable but not registered in the GSC pull config, so it is invisible to the estate's fresh-GSC discipline (rule 5) |
| G11 | 09-27 AI-assistant naming baseline coverage | not checked (T6/section 8 of `LEADS_250_PROGRAMME_2026-09-27.md` not read in this pass) | ? | Out of scope of time budget for this report; flag for the estate synthesiser |

**C. Content**

| ID | Property | This site | Gap | Note |
|---|---|---|---|---|
| C1 | 806 posts | 45 `.md` files in `divorce-finances/web/content/blog/`, but the LIVE sitemap shows 51 blog URLs | S | 6-post discrepancy between filesystem content and live sitemap, site likely also pulls from `blog_topics` Supabase table (niche.config.json `content_strategy.supabase_table: "blog_topics"`), so filesystem count undercounts. Newest filesystem post date not checked (no `--date` grep run); flag as a question |
| C2 | `house_positions.md` present | `find divorce-finances -iname "house_positions*"` = no results | L | No ground-truth doc exists for this site at all, unlike Property |
| C3 | coverage map present | none found in `docs/divorce-finances/` (listing: BRAND_SHORTLIST, CALCULATOR_DERIVATION, COMPETITOR_CORPUS, DATA_PR_SOURCES, FACT_VERIFICATION_QUEUE, LEAD_REGULATORY_POSITION, PHASE6_G1_RUNBOOK, STATE, TOPIC_POOL) | L | No coverage map |
| C4 | `/for/[slug]` dynamic, 15 pages, full template | `for/[slug]/page.tsx` dynamic route; data source is `@/data/trade-types` (`tradeTypes`, `getTradeType`), this filename/export is a leftover from a trade-vertical template, not renamed for divorce; live site shows only 3 slugs: business-owners, divorcing-homeowners, separated-parents | M | 3 pages vs Property's 15; the data file itself is still named `trade-types.ts`, a ponytail-style copy-paste artefact worth a rename, not urgent |
| C5 | `/services/*` and money pages listed | top-level money pages: `/financial-settlements`, `/pension-sharing`, `/capital-gains-tax-divorce` (these are the 3 "pillar" hubs, not a `/services/*` tree); a `services` dir also exists under `app/` | ? | Did not enumerate `app/services/*` contents |
| C6 | validator pass/fail | `grep divorce scripts/validate_blog_content.py` = no match | N/A | Site not supported by the shared content validator |
| C7 | `dateModified`/`reviewedAt` on posts | not checked in individual post files this pass | ? | Needs a follow-up grep on `content/blog/*.md` frontmatter |
| C8 | byline model | not checked | ? | Not opened this pass |
| C9 | link audit tool | no `divorce-finances`-specific script found under `scripts/` or `pipeline/` in the quick listing done | ? | Did not do an exhaustive search; likely shares an estate-wide tool if one exists |

**D. Design**

| ID | Property | This site | Gap | Note |
|---|---|---|---|---|
| D1 | port tags, `web-shared/design` imports | `git tag -l 'port-divorce-finances-*'` = empty; `grep -rl "web-shared/design" divorce-finances/web/src \| wc -l` = 0 | L | Zero design-port adoption. This site never received the kit uplift that Property, crypto, charities, contractors-ir35, construction-cis, generalist and Medical got |
| D2 | `prose-standard.css` imported | `grep prose-standard divorce-finances/web/src/app/globals.css` = no match | M | Not wired |
| D3 | header CTA hides below 1024 | not checked (would need a rendered-DOM read of the live site) | ? | Flag for wave-2 reader with real emulation |
| D4 | favicon set, og:image not SVG, metadataBase | `layout.tsx` has an `openGraph` block (line 48); did not confirm the og:image file type or metadataBase value; `public/` listing shows only `llms.txt` and the IndexNow key file at top level (favicon likely elsewhere, e.g. `app/icon.png`, not checked) | ? | Needs a follow-up `find` for `favicon*`/`icon*`/`opengraph-image*` under `app/` |
| D5 | fonts | `GeistSans`/`GeistMono` via `next/font`, `geist` package, matches Property's stated standard | NONE | |
| D6 | StatsCounter/stat tiles literal-value support | not checked | ? | |
| D7 | 390px real emulation | NOT RUN this pass, no puppeteer-core check performed, only curl/source read | ? | Site is live, so this is answerable, but was not attempted within this report's time budget. Flag for the wave-2 Opus reader per brief section 4, with the gov.uk control per rule 7 |
| D8 | playbook 9.1 kit-adoption gate | not run | ? | Given D1 (zero `web-shared/design` imports), this would almost certainly fail the gate; did not run the literal block |

**I. Infra and ops**

| ID | Property | This site | Gap | Note |
|---|---|---|---|---|
| I1 | live, robots/llms/llms-full/sitemap statuses | `curl -sI https://www.divorcefinancespecialists.co.uk/` = 200; `/robots.txt` = 200; `/llms.txt` = 200 (content stale, see P6); `/llms-full.txt` = 200; `/sitemap.xml` = 200 (77 URLs) | NONE (site is live) | Contradicts STATE.md and memory; this is the single biggest finding of this report |
| I2 | Vercel project id, deploy vs HEAD | No `.vercel` directory in `divorce-finances/web` (unlike Property/Medical/Solicitors/generalist which have one) and no project ID recorded anywhere found in `docs/divorce-finances/` or memory; deployed `dpl_HUvX1HdWB3BajBeuG2th1E24XsBw` confirmed live but its git SHA is unknown from the repo; `git log --since=2026-08-04 --oneline -- divorce-finances/` = 20 commits, latest 2026-09-26, so the live deploy is very likely behind HEAD by an unknown margin | M/? | Cannot determine deployed commit without Vercel API access (ops agent territory); STATE.md's "no Vercel project" claim is now proven false by the live curl, so someone deployed this outside the tracked runbook |
| I3 | tests present, CI coverage | `find divorce-finances/web/src -iname "*.test.ts*"` = 7 files | ? | Did not check `.github/workflows/*.yml` for a divorce-finances-specific CI gate |
| I4 | GA4 present, CSP `region1.google-analytics.com`, consent banner | `niche.config.json` `seo.google_analytics_id` = `""` (empty); `components/analytics/AnalyticsProvider.tsx` and `ConsentToggle.tsx` exist; no `region1.google-analytics.com` string found in `next.config.ts` or `middleware.ts` | M | GA4 measurement ID is not configured for this site, analytics component exists but has nothing to send to. This means the site has been live and collecting zero first-party analytics |
| I5 | flags read via `getFlag`/`site_flags`/`NEXT_PUBLIC_` | `config/niche-loader.ts` is the only file matching `process.env.NEXT_PUBLIC_` in a quick grep | ? | Shallow check; ops agent should verify prod flag values directly |
| I6 | monitored_pages rows | unknown from repo (Supabase read not available read-only in this pass) | ? | |
| I7 | `docs/divorce-finances/STATE.md` newest entry, contradictions | STATE.md's newest dated entry is 2026-08-04 ("Last updated 2026-08-04"), and its 2026-08-25 note claims "no Vercel project... nothing is deployed" | L | Directly contradicted by the live curl in I1. STATE.md needs an owner-visible correction; this report does not edit it (read-only per rule 0.3) |

## Unique to this site

- `ExitIntentModal.tsx` under `components/blog/`, not in Property's inventory as listed in the brief.
- Referral-to-partner-firm business model is structural (the site introduces enquirers to a regulated family
  law firm, unlike Property which does the work in-house), so some "partner"/"introduce you to" language may
  be a genuine product description rather than a defect. This is a question for the owner (see below), not
  assumed either way.
- `data/trade-types.ts` as the filename backing `/for/[slug]`, a leftover name from whichever trade-vertical
  template this was cloned from; cosmetic, not a functional bug.
- Compliance framing comment block in `lead-nurture.ts` referencing `LEAD_REGULATORY_POSITION_2026-07-24`
  (`docs/divorce-finances/LEAD_REGULATORY_POSITION_2026-07-24.md`), a site-specific compliance doc Property
  does not have, because Property is not a referral model.

## Shares Property's open defects

- Did not confirm or rule out the untokened `/book` defect, the 115x "24 hours" promise, or the shared
  three-line segment-page close, because L4/L8/P4 above were left as "?", time-budget tradeoff, flagged as
  follow-ups rather than false negatives.
- `ResultGateModal.tsx` still present (L3): this is Property's PRE-09-27 state, not its current one. If
  Property removed its gate 09-27 and this site was not touched, this site is now behind Property's own fix,
  not sharing a live Property defect but repeating a defect Property already closed.

## Questions (missing data, not findings)

1. Is the Supabase migration `20260803000002_add_divorce_finances_to_leads_and_sites.sql` actually applied to
   prod? The site is live and presumably taking form submissions via `/api/leads/submit`; if the migration
   was never applied, every submission on this site is failing silently. Needs a prod DB check, not
   determinable read-only.
2. Who deployed this site, and when, given STATE.md and memory both say "no Vercel project" as recently as
   2026-08-25, yet the live deploy exists? No record of the deploy found in `docs/divorce-finances/` or
   memory.
3. Is the "partner network" framing throughout this site a genuine reflection of its referral business model
   (in which case rule 8's ruling may need a site-specific carve-out) or is it simply the pre-ruling voice
   that needs updating like the other four sites the 09-28 commit already touched? This determines whether
   P2/L9 are XS text edits or a business-model question for the owner.
4. `lead-nurture.ts`'s header comment says delays are "cumulative... from step 0", while the brief states
   Property's correct source (`0,0,4,20,24,48,72,96`) is GAPS between sends, not cumulative. If this file is
   genuinely cumulative while Property is gap-based, the two cadences are not directly comparable and one of
   the two descriptions may be wrong; needs a side-by-side read of both files' actual step logic, not just
   comments.
5. Live sitemap shows 51 blog URLs, filesystem `content/blog/` has 45 `.md` files: where do the other 6 come
   from (Supabase `blog_topics` table, presumably), and are they present in the repo at all for review?
6. What is the live deploy's git SHA, and how far behind `HEAD` (20 commits since 08-04) is it? Needs Vercel
   API / dashboard access, out of scope for a read-only repo pass.

## Commands and files read

- `curl -sI/-s` against `https://www.divorcefinancespecialists.co.uk/` for `/`, `/robots.txt`, `/llms.txt`,
  `/llms-full.txt`, `/sitemap.xml`, `/for` (list), `/for/starting-a-divorce` (404 check)
- `docs/divorce-finances/STATE.md`, `docs/divorce-finances/` directory listing
- `divorce-finances/niche.config.json`, `divorce-finances/web/vercel.json`
- `grep -rl "LeadCTAPanel|LeadForm"`, mini-capture id greps, `find` for ResultCaptureForm/ResultGate,
  SpecialistWidget, Intent*/ReturningBar/DeepScroll, StickyCTA, thank-you/complete/book dirs
- `divorce-finances/web/src/config/lead-nurture.ts`, `config/site.ts` (`leadConsentText` diffed against
  `Property/web/src/config/site.ts`)
- `divorce-finances/web/src/app/api/leads/` directory listing, `supabase/migrations/20260803000002_*.sql`
- `divorce-finances/web/src/lib/schema.ts` (Organization/BreadcrumbList/FAQPage/Service/BlogPosting types)
- `divorce-finances/web/src/app/robots.ts`, `sitemap.ts`, `llms-full.txt/route.ts`
- `git tag -l 'port-divorce-finances-*'`, `grep -rl "web-shared/design"`, `grep prose-standard`
- `git log --since=2026-08-04 --oneline -- divorce-finances/`, `git log -1 --format=%cd -- divorce-finances/`
- `divorce-finances/web/content/blog/` listing (45 files), `divorce-finances/web/public/` listing
- `divorce-finances/web/src/app/for/[slug]/page.tsx` imports (data source `@/data/trade-types`)
- `agents/config/gsc_config.py` grep, `find` for indexnow key file (found:
  `public/4d2abeb261e1ca7875c6f16ee1257ac4.txt`)

## What launch needs

The site is already live, so most of "launch" is actually "catch-up". From what is visible in the repo:

1. **Confirm the Supabase migration is applied** (`20260803000002_add_divorce_finances_to_leads_and_sites.sql`)
  , if not applied, the live lead form is submitting into a rejecting CHECK constraint right now (Q1 above).
2. **Record the Vercel project** in `docs/divorce-finances/STATE.md`, project ID, org, deploy history are
   currently undocumented anywhere in the repo despite the site being live.
3. **Fix `public/llms.txt`**, it actively tells every AI crawler the site is "pre-launch... nothing here
   should be cited or indexed" while robots.txt invites those same crawlers in. One-file fix, high leverage.
4. **Configure GA4**, `google_analytics_id` is empty in `niche.config.json`; the site has presumably been
   running with zero analytics since whenever it went live.
5. **Register in `agents/config/gsc_config.py`** so it enters the estate's fresh-GSC pull discipline; it is
   currently invisible to GSC monitoring even though it is indexable.
6. **Decide the positioning question** (Q3 above), apply the 09-28 firm-voice ruling here, or establish that
   the referral model earns a carve-out, then update `config/site.ts`, `contact`, `complete`, `privacy-policy`
   and `lead-nurture.ts` accordingly.
7. **Remove `ResultGateModal.tsx`** to match Property's 09-27 gate removal, or confirm it is deliberately
   still gated here for a reason Property does not share.
8. **Design-port this site**, zero `web-shared/design` imports, no port tags, no `prose-standard.css`; it
   never got the kit uplift the other seven sites received.
9. **Reconcile STATE.md** with reality, it currently asserts "not deployed" against a 200-status live domain;
   whoever owns the next session on this site should not trust it until corrected.
10. **Fill in `house_positions.md` and a coverage map**, neither exists for this site, unlike Property and
    others in the design-uplift cohort.

## Summary

Divorce Finance Specialists is live at www.divorcefinancespecialists.co.uk (curl 200, real Vercel deploy,
working sitemap/robots/llms-full) despite STATE.md and memory both saying it is unlaunched as of 08-25 to
08-04, that gap is the single biggest finding. Structurally it has most of Property's lead kit (forms, mini
captures, intent engine, sticky CTA, nurture, schema) but zero design-port adoption (no kit uplift), a stale
`llms.txt` that tells AI crawlers not to cite the live site, an unconfigured GA4 ID, an old result-gate modal
Property already removed, and the pre-09-28 "partner network" voice across contact/complete/privacy/nurture , 
though that voice may partly reflect a genuine referral business model rather than a pure copy defect, which
is a question for the owner, not an assumed fix. No repo evidence answers whether the lead-capture Supabase
migration is actually applied to prod; if it is not, the live form may be silently failing. Nine follow-up
questions and a ten-item launch/catch-up list are in the report. Read-only throughout; no files changed except
this report; scratch directory created and removed.

---

# WAVE 2 READER (2026-09-28)

Rendered with `puppeteer-core` (repo root) against Chromium
`ms-playwright/chromium-1223/chrome-win64/chrome.exe`, `page.emulate` with
`isMobile: true`, `hasTouch: true`, 390x844, `deviceScaleFactor: 3`.

**Control: https://www.gov.uk rendered with the same code returns
`document.documentElement.scrollWidth` = 390 at 390 and 1280 at 1280, zero
overflowing elements.** Every 390 number below sits against that control.

Pages rendered: `/`, `/about`, `/services`, `/for/divorcing-homeowners`,
`/for/business-owners`,
`/blog/maintenance-and-support/spousal-maintenance-guide`,
`/calculators/divorce-cost-calculator`, `/contact`, `/book`.
**The site is live and serving all of them.**

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| P4 | Homepage serves **3** "within 24 hours" / "one working day" strings, the highest in this reader set | curl home, grep count |
| D3 | PASS. Header CTA "Book a free call" 132x40 visible at 1280; `display: none`, 0x0 at 390 | rendered DOM, all 9 pages |
| D4 | **`og:image` is broken.** Home serves `og:image` = `https://www.divorcefinancespecialists.co.uk/brand/icon-alt.png`, which returns **HTTP 404**. Same broken path as wills-probate | `curl -sI /brand/icon-alt.png` |
| D5 | `GeistSans`, `GeistSans Fallback` applied to `body`; loaded via `geist/font/sans` and `geist/font/mono` | `getComputedStyle(document.body)`; gate row 3 |
| D6 | No `StatsCounter`, no stat strip, no decline comment. Markers all zero | gate marker row |
| D7 | `scrollWidth` = 390 on all 9 pages. The blog post has a bare `<table>` reaching 519 px and a hero image at 400, both clipped, so the page itself does not scroll sideways | rendered DOM; control 390 |
| D8 | Gate 9.1: row1 layout-utils **file does not exist**, row2 kit=**0 distinct / 0 call sites**, row2a declined=0, row2b **adopted=0 declined=0**, row3 webfont=`geist/font/sans` + `geist/font/mono` (PASS), row4 backdrop=**0**, row5 Eyebrow=**0** / section-label=**4**, row6 2 ring lines to read, row7 4 gradient files, row8 walks=0 guards=0. **Six rows fail** | gate block run verbatim |
| G3 | `FAQPage` (1) only on `/for/divorcing-homeowners`. **Zero `Service`, zero `BreadcrumbList`, zero `AccountingService`** | curl |
| G4 | Blog post carries a real published date in body chrome ("Published 24 July 2026") | rendered |
| G7 | `lastmod` real and recent: `2026-09-25T23:22:33.772Z` | curl sitemap.xml |
| G8 | **FAIL, live. The canonical-hub defect is on this site.** `/about`, `/services`, `/for/divorcing-homeowners` and `/for/business-owners` all serve `<link rel="canonical" href="https://www.divorcefinancespecialists.co.uk">`, pointing at the homepage. Blog posts and calculators are correct | curl on each URL |
| G9 | PASS. `/embed/divorce-cost-calculator` serves `robots: noindex, nofollow`, HTTP 200, and no `/embed` URL is in the sitemap | curl |
| L3 | **PASS.** `/calculators/divorce-cost-calculator` renders 2 forms, one with `calc_result` ids directly under the result plus the foot panel. No gate, no modal, no PDF offer in the DOM | rendered forms = 2; curl grep `id="calc_result-*"` |
| L4 | 5 calculator URLs in the sitemap | grep on sitemap |
| L8 | `/book` renders zero forms at 1280 and 390; copy explains the missing token. `/complete` serves "a vetted regulated firm from our partner network will be in touch to arrange your free review, no obligation." No Aswatax line found | rendered DOM plus curl on `/complete` |
| L10 | Blog post renders 2 forms (a 5-input inline capture plus the 10-input foot panel). Blog capture is live | rendered DOM |
| Widgets | Chat widget IS in the live DOM on all 9 pages (`div.fixed.bottom-24.right-4.z-[55]`). A returning bar is in the DOM on both `/for/` pages, the blog post, the calculator and `/contact`: `div.fixed.inset-x-0.bottom-0.z-40.border-t.border-orange-700`, copy "Welcome back. Pick up where you left off, get your position ..." | rendered DOM |

## Reader findings

Mechanically this site is in the same state as wills-probate: same shell, same
font, same live blog capture, same live chat widget, same calculator form under
the result, and the same three live defects. Treat the two as one package.

The three live defects: `/about`, `/services` and both `/for/` pages canonicalise
to the homepage; `/llms.txt` tells crawlers the site is pre-launch and must not be
cited; the `og:image` returns 404 so every share card is blank.

There is a fourth, specific to this site: `/services` tells the prospect the
service does not exist yet, in its opening line.

Positioning is the old information-service model throughout. Per the brief I
report the wording and do not judge the model.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | `/services` | Opening sentence on a live commercial page: "Free tools and guides for the money side of divorce and separation. **Full service detail is being built now.**" | rendered first paragraph | XS |
| BLOCKER | `/about`, `/services`, `/for/divorcing-homeowners`, `/for/business-owners` | Canonical points at the homepage, not the page | curl: `<link rel="canonical" href="https://www.divorcefinancespecialists.co.uk">` on each | S |
| BLOCKER | `/llms.txt` | Line 5, machine-facing: "STUB (pre-launch): the site is built but not yet published at divorcefinancespecialists.co.uk. There are no citable public URLs yet, so nothing here should be cited or indexed." The site is live | curl /llms.txt | XS |
| BLOCKER | all pages | `og:image` is `/brand/icon-alt.png`, which returns 404 | `curl -sI` = `HTTP/1.1 404 Not Found` | XS |
| FIX | all pages | Primary CTA fails WCAG AA. White `#FFFFFF` on orange `#FF6900` = **2.89:1**, pixel-sampled from a screenshot of the button. Applies to "Book a free call", "Use the free calculators", "Send enquiry" | element screenshot, dominant pixel `255,105,0` against `255,255,255` | S |
| FIX | `/for/*`, `/services` | Zero `Service` and zero `BreadcrumbList` schema, where Medical serves 7 and 1 on the same page type | curl | S |
| FIX | site-wide | Design kit not adopted: 0 kit imports, no `layout-utils.ts`, no backdrop, 4 `section-label` and 0 `<Eyebrow>`. Webfont is the one row that passes | gate 9.1 | L |
| FIX | `/calculators/divorce-cost-calculator` | No focus ring on the first input: `outlineStyle: "none"`, `boxShadow: "none"`. Other pages show a ring (`outlineStyle: "auto"`) | rendered `getComputedStyle` | S |
| FIX | blog post | Article opens on chrome, not the answer. First paragraph reads "9 min read / Published 24 July 2026". Longest paragraph 162 words | rendered | S |
| FIX | `/about`, `/services` | Zero forms. Property mounts the foot panel on both | rendered form count = 0 | S |
| NIT | blog post at 390 | Bare `<table>` reaches 519 px with no scroll wrapper; it is clipped rather than scrollable | rendered `getBoundingClientRect` | XS |
| NIT | blog post, calculator | One `enquiry_ref` honeypot input carries no label | rendered | XS |

### Positioning wording, reported not judged

| Page | Sentence, verbatim |
|---|---|
| `/about` h1 | "A free information service for the money side of divorce." |
| `/about` | "If you want professional help, we can introduce you to a vetted family law firm or an accredited mediator." |
| `/about` close | "Honesty about this matters to us, especially on a site about money during divorce. If you ask us to connect you with a specialist and you go on to use their services, we may receive a fee from the firm we introduce you to." |
| `/about` close | "We introduce people only to solicitor firms regulated by the Solicitors Regulation Authority and, for mediation, only to mediators accredited by the Family Mediation Council..." |
| `/` | "Tell us about your situation and we will introduce you to a vetted family law firm or accredited mediator suited to it." |
| `/` | "Your details are shared only with your consent, we may receive a fee from the firm we introduce you to, and you are never under any obligation to proceed." |
| `/` footer | "Divorce Finance Specialists is a free information service, not a law firm." |
| `/services` | "Tell us about your situation and we will introduce you to a vetted, SRA-regulated family law firm or an accredited mediator suited to it." |
| `/services` | "Through our partner firms..." |
| `/for/divorcing-homeowners` | "When you are ready to make it binding, or you cannot agree, we can introduce you to a vetted family law firm or accredited mediator. Introductions happen only with your consent and you are never obliged to proceed." |
| `/for/business-owners` | "Business-owner divorces need family solicitors who are comfortable with company assets. When you are ready, we can introduce you to a vetted firm suited to your situation." |
| `/contact` | "If you have asked to be connected with a specialist, a vetted regulated family law firm or accredited mediator from our partner network suited to your situation will contact you directly, usually within a few working days." |
| `/complete` | "a vetted regulated firm from our partner network will be in touch to arrange your free review, no obligation." |
| `/book` | "A specialist will call you then, no obligation." |

The consent sentence is exempt and is not listed above.

### Design numbers

| Page | sw@1280 | sw@390 | hdr CTA @1280 | hdr CTA @390 | body contrast | orange CTA | forms |
|---|---|---|---|---|---|---|---|
| `/` | 1280 | 390 | 132x40 visible | none, 0x0 | 12.09 | 2.89 | 1 |
| `/about` | 1280 | 390 | visible | none | 12.09 | 2.89 | 0 |
| `/services` | 1280 | 390 | visible | none | 12.09 | 2.89 | 0 |
| `/for/divorcing-homeowners` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| `/for/business-owners` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| blog post | 1280 | 390 | visible | none | 4.74 | 2.89 | 2 |
| calculator | 1280 | 390 | visible | none | 12.00 | 2.89 | 2 |
| `/contact` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| `/book` | 1280 | 390 | visible | none | 10.36 | 2.89 | 0 |

Zero em-dashes, zero en-dashes, zero US spellings, zero AI-tell phrases, zero
images without `alt`, zero broken `<img>` elements in the DOM, zero placeholder
phones or emails. The dimmed card paragraphs on the homepage compute low from
`getComputedStyle`; pixel-sampled from a screenshot they are **4.86:1** (text
`161,161,161` on ground `41,52,69`) and pass AA for body text, so they are NOT
reported as a defect.

### Sameness

| Comparison | Result |
|---|---|
| Segment-page closers within divorce-finances | DIFFERENT in body, SAME final line: both `/for/divorcing-homeowners` and `/for/business-owners` end on "Run your own numbers on financial settlements in a couple of minutes." |
| `/` and `/services` | Two of the three closing blocks are word-for-word identical, including "For divorces that unfold over months, not weeks. A financial settlement is rarely one conversation: there is disclosure, negotiation or mediation, the order itself, then implementation..." |
| Against Property's shared close | NOT shared. Property ends every `/for/` and `/services` page on: "A couple of sentences helps us prepare properly for your call." / "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." / "We respond within 24 hours and store your details securely." divorce-finances carries the consent sentence only |
| Against wills-probate | Near-identical. Same h1 formula ("A free information service for..."), same `/about` boundaries block and fee-honesty paragraph, same orange 2.89:1 CTA, same 404 `og:image` path, same homepage-canonical defect, same pre-launch `/llms.txt` stub, same chat widget and returning bar. One package, not two |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| P4 "not searched exhaustively, no 24h text found" | The homepage serves 3 such strings, the most in this reader set | curl home, grep count |
| L8 "did not confirm the Aswatax message" | No Aswatax line on `/book` or `/complete`. `/complete` instead offers a partner-network firm | rendered DOM plus curl |
| L10 "did not check the CTA mechanism" | Blog capture is live: a 5-input inline capture plus the 10-input foot panel | rendered DOM |
| G8 "no matching commits, either the fix does not apply or was not needed" | It was needed and it is not applied. `/about`, `/services` and both `/for/` pages canonicalise to the homepage, live | curl |
| G9 "did not check `/embed` metadata" | PASS. `noindex, nofollow`, and no `/embed` URL in the sitemap | curl |
| D4 "did not confirm the og:image file type" | It is a PNG path that 404s. The share card is blank on every page | `curl -sI` |
| D7 "NOT RUN" | Run. 390 on all 9 pages, control 390. No page-level mobile overflow | rendered DOM |
| D8 "not run, would almost certainly fail" | Run. Six of ten rows fail; webfont is the notable pass | gate block |
| Memory "unlaunched, content complete, next Phase 6 externals" | Live and serving 77 sitemap URLs including `/about`, `/services`, `/for/*`, blog, calculators, `/book`, `/complete` | rendered DOM on all 9 |
