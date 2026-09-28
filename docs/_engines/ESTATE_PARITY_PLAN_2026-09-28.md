# Estate parity plan (2026-09-28)

The build plan that follows `ESTATE_PARITY_RESEARCH_2026-09-28.md`. Single living doc: update in
place, never fork a handoff. Owner decisions recorded in section 1 are settled; do not re-ask them.

## 1. Owner decisions, recorded 2026-09-28 evening

| # | Question | Decision |
|---|---|---|
| 1 | Deploy the ten behind sites now or after the wording sweep | **After the sweep.** One deploy round of all 17 once phase 0 is built and reviewed |
| 2 | construction-cis pool model (routes to up to six partner firms) | **Convert.** Every site says what Property says. Words change in phase 0; the servicing side is the owner's to line up |
| 3 | wills-probate and divorce-finances (introduce a regulated law firm) | **Restate as the money side of the matter, with the legal introduction as a named step.** The only two sites allowed a "we introduce you to" sentence |
| 4 | Which sites get the segment-page content chain | **All of them.** Staged by leverage, owner approves each site's page count before launch |
| 5 | Design-port order for the seven unported sites | **By damage.** startups-tech, hospitality, pharmacies first, then care, digital-agency, then wills-probate and divorce-finances as one package |
| 6 | Free first call and the 24-hour promise | **Same as Property** on every site ("Free first call, then a fixed fee in writing"; reply within 24 hours). Build the nurture email that keeps the 24-hour promise, once, in the shared sequence |
| 7 | Dentists, digital-agency, crypto, startups-tech: nothing published since July | **Fund** content waves. (Clarified: the sites are live; "unpublished" meant no new posts since July) |
| 8 | The two silent sites | **Fix them.** wills-probate and divorce-finances: analytics beacon, llms.txt stub, og:image, canonicals, production leads check |

Standing rules that still apply: deploy only on the owner's word in that turn; no monitors, crons,
emails or popups without asking; Opus or Fable for anything a prospect reads, Sonnet for mechanical
work; price every fan-out before launch and report agents used; one agent per site in the shared
working tree, never `git checkout` in an agent prompt, check `git diff --stat` before every commit.

## 2. Why ten sites were behind (answer to the owner's question)

The five programme sites and Dentists and generalist were deployed on 28 September. The other ten
were last deployed on 23 September. Between those dates the 27 September batch landed code on them
that the owner then held ("hold off on the deploy"), and the 28 September deploy round only covered
seven projects: the ecommerce design port (26 September, six phases plus uplift), blog lead capture
on seven small sites (27 September), the canonical-hub fix on four sites (27 September), AdSense on
Solicitors (24 September), and the brand lock on wills-probate and divorce-finances (26 September).
None of that is live. The positioning reversal of 28 September touched only the five programme
sites, so the other twelve need the sweep in section 3 before they can carry the firm voice at all.

## 3. Phase 0: mechanical parity (one session of agents, then serialised builds, then one deploy)

Everything here is code the shared library or Property already has. Sonnet builds, Opus reads.

### 3.1 Positioning sweep, firm voice, every site

Rule, not list: every prospect-facing and lead-facing sentence speaks as the firm, in Property's
wording. Caveats ("partner network", "referral network", "not an accountancy practice", "a specialist
reviews", "a specialist will call", "the specialist firm you speak to sets its own fee", "up to six
firms") are defects everywhere except the consent sentence, privacy, terms and the post-submit
Aswatax line. Free first call and 24-hour wording: copy Property's.

| Site | Scope from the research | Agent |
|---|---|---|
| Dentists | 97 occurrences, 21 files, 29 rendered sentences on 6 of 7 pages | 1 Sonnet |
| Solicitors | 22 files, chat opener, SMS, nurture, `/about` h1; plus the missing homepage h1, 10 em-dashes, 4 US spellings | 1 Sonnet |
| construction-cis | pool-model copy on privacy, about, contact, complete, home, services (decision 2) | 1 Sonnet |
| generalist, digital-agency, crypto, ecommerce, hospitality, pharmacies, startups-tech | contact, complete, thank-you, niche.config, nurture where caveated; add the `entity` key from Property's shape | 1 Sonnet each |
| wills-probate, divorce-finances | restate per decision 3; replace the llms.txt stub; `/services` "being built now" line on divorce | 1 Sonnet for both |
| Property, contractors-ir35, care, charities, Medical | residuals: Property `/for` closers "a specialist reviews" (15 pages), contractors `data/contractor-types.ts` (14) and SMS, care `care-hubs.ts:379`, charities 3 service sentences, Medical segment closers | 1 Sonnet for all five |
| Read | one Opus sweep-by-rule over the rendered text of all 17 sites, home, about, services, contact, complete, thank-you, one segment page, one post, nurture files | 1 Opus |

### 3.2 Shared template fixes (one change, many sites)

| Item | Where the fix lives | Sites |
|---|---|---|
| Footer "Book a consultation" points at untokened `/book` that renders no form; keep contractors' "An accountant will call you then" wording | shared footer or per-site `SiteFooter.tsx`; generalist is the working reference | 14 |
| No visible focus ring on form inputs (`outline-style: none`, transparent shadow) | shared form styles in `packages/web-shared` and `packages/site-styles` | all |
| Primary CTA contrast below 4.5:1 (Property 3.65, ecommerce 3.04, wills and divorce 2.89) | brand token per site; Property's fix sets the standard | 4 named, check all |
| Nurture `delayHours` cumulative instead of gaps | `<site>/web/src/config/lead-nurture.ts`, copy Property's `0,0,4,20,24,48,72,96` | 12 not fixed on 28 September |
| 24-hour promise email | shared nurture sequence, first send states the promise | all |
| Raw HTML anchors stored in body copy rendered as JSX text | data files + `dangerouslySetInnerHTML` or a shared `html` prop on the templates (Medical's `CoverageCards`/`FaqSection` pattern) | ecommerce 15 pages, hospitality 6, pharmacies 5, startups-tech 4 |
| Hub canonical defaulting to the homepage | already written for construction-cis, hospitality, care, startups-tech in `bb297ab2`; port to ecommerce, wills-probate, divorce-finances | 3 more |
| Sitemap `lastModified` as build-time now, or frozen at 2026-06-03 on Medical | Property's pattern: real date or omit | 11 |
| `StatsCounter` renders 0 for non-numeric values | shared component guard (`3f6ee5ce` added literal support; apply the guard at the mapper) | shared |
| `og:image` 404 at `/brand/icon-alt.png` | add the file or point at the existing brand asset | wills-probate, divorce-finances |
| `X-Frame-Options` missing | rides the deploy, header builder already emits it | crypto, ecommerce, pharmacies, startups-tech |
| Service + BreadcrumbList schema on segment and service pages | shared schema lib, Medical `/for-gps` is the reference | Solicitors, Dentists, construction-cis, crypto, ecommerce, hospitality, pharmacies, startups-tech, wills-probate, divorce-finances |

Agents: one Sonnet per row (13), one Opus review over the rendered result of the shared rows.

### 3.3 Lead forms and header CTA on the money pages that have none

| Site | Gap | Agent |
|---|---|---|
| ecommerce | zero forms on 15 commercial pages (`/for/*`, `/services/*`, `/vat/*`, about, post, calculator) | 1 Sonnet |
| hospitality | zero forms on 11 pages; no header CTA at any width | 1 Sonnet |
| crypto | six of ten pages, "owner decision" comment to be retired; segment closers paste the slug | 1 Sonnet |
| startups-tech | seven of ten pages; no header or footer CTA | 1 Sonnet |
| pharmacies | `/for/locum-pharmacists`; no header, sticky or chat prompt | 1 Sonnet |
| care, charities | forms on `/about` and `/services`; care header button and web font; both stack two identical forms on the calculator page (rule: one form under the result) | 1 Sonnet for both |
| Medical | calculator result serves no capture form; remove the blog-placement result gate on Medical, generalist, contractors, digital-agency, divorce-finances (Property removed it 27 September) | 1 Sonnet |
| contractors-ir35 | blog category CTA dead code (`categorySlug` unused), one line | in the residuals agent above |

One shared `LeadCTAPanel` mount, Property's wording, one form per page, foot placement.

### 3.4 Plumbing

One Sonnet agent: `gsc_config.py` entries for crypto, ecommerce, hospitality, wills-probate,
divorce-finances (all 17 domains are already verified in Search Console at owner level);
`pipeline/submit_indexnow.py` for Medical, contractors-ir35, care, charities, crypto, ecommerce;
`google_analytics_id` for charities, crypto, ecommerce, pharmacies, divorce-finances (**needs the
owner: five GA4 measurement ids, or the go to create five properties under the existing account**).

### 3.5 The two silent sites (decision 8)

One Opus agent: why `web_sessions` has no rows for wills-probate and divorce-finances (site key,
beacon endpoint, consent gate, CSP), whether the leads migrations `20260724000001` and
`20260803000002` are applied in production (read-only check, owner applies if not), record the
Vercel project ids, correct both STATE.md files, then a synthetic session on each after deploy.

### 3.6 STATE.md corrections

One Sonnet agent: care, hospitality, ecommerce, Medical, charities, Solicitors, digital-agency,
wills-probate, divorce-finances, each with a dated entry that states what is live and points at the
research report. Chase nothing else in those files.

### 3.7 Build, review, deploy

1. Sequential production builds, one site at a time, manager-run: `tsc`, `vitest`, `next build`,
   rendered greps (one form per money page, one Organization node, zero caveat strings, canonical
   self-referencing on hubs, focus ring rule present in the served CSS).
2. Opus rendered review at 1280 and real 390 emulation with the gov.uk control, four readers, same
   shape as the research wave.
3. `python scripts/check_dependency_closure.py`, push once, watch CI, own any red run.
4. Deploy all 17 from a clean worktree at the pushed SHA, on the owner's word, in the order
   Property, Medical, contractors, care, charities, then the twelve. `calc_pdf_offer` off in prod
   the same day (still ON since 14 September).
5. Live verification by curl and one real-emulation pass per site; STATE entries; IndexNow only if
   asked.

**Phase 0 price:** about 40 agents (about 32 Sonnet builders, about 8 Opus readers) plus the
manager's serialised builds. Two to three sessions.

## 4. Phase 1: programmes (weeks; each launched on its own go)

### 4.1 Design port, by damage (decision 5)

Order: startups-tech, hospitality, pharmacies (system font, gate 0/0/0/0, viewport breaks), then
care, digital-agency, then wills-probate and divorce-finances as one package. Follow
`DESIGN_PORT_PLAYBOOK.md` from the STOP block, charities/crypto shape, section 9.1 gate as written,
mop-up package budgeted. One site per wave.

### 4.2 Segment-page content chain, all sites (decision 4), staged by leverage

Stage A (already have Wave 1 pages, top up from their coverage maps): Medical, contractors-ir35,
care, charities. Stage B (traffic): Solicitors, generalist (built from nothing, needs the `/for/[slug]`
route first), Dentists. Stage C: construction-cis, crypto, ecommerce, hospitality, pharmacies,
startups-tech, digital-agency. Stage D: wills-probate, divorce-finances. Each site: coverage map
first where none exists (11 sites), page count from the map, owner approves the count, then
Property's chain (Opus writer, Track A factual, Track B editorial, sweep, Sonnet integrator). Yardstick
52 runs per 15 pages.

### 4.3 Content waves (decision 7, fund)

Dentists (last post 4 June), digital-agency (28 July), crypto (15 July), startups-tech (mid-July):
decision-stage posts from each coverage map, Opus or Fable writers, two QA tracks, batch size 1.
Hospitality, pharmacies and ecommerce are database-backed and need their post dates read from the
database before they are classed either way.

### 4.4 Later

Calculator fleet and cite-this lines (four leads estate-wide in 90 days, low priority); T6
assistant-naming rerun at the month-1 read; monitored_pages rows for the eight sites with none
(ask before creating anything that emails).

## 4a. Amendments, 2026-09-28 late (owner go on phase 0)

- **Decision 8 corrected:** wills-probate and divorce-finances ARE receiving Search Console data
  (owner). The silent-site item is about OUR analytics beacon and leads table, not search. The
  silent-sites agent re-pulls GSC with impressions for both and then chases the beacon.
- **AdSense on every site** (owner: "set up every site for AdSense, so it needs Google Analytics
  where it can"). Every site gets the Solicitors pattern (`7edc7fd3`, `153e5017`) and a GA4 id.
  The plumbing agent creates or finds the GA4 properties; AdSense console approval per domain is an
  owner action after deploy.
- Builder instructions: `ESTATE_PARITY_PHASE0_BRIEF_2026-09-28.md`. Wave A = 17 per-site Sonnet
  builders + shared-packages Sonnet + plumbing Sonnet + silent-sites Opus = 20. Agents do not
  commit; the manager commits per site after the serialised build.

## 5. Open inputs from the owner

1. Five GA4 measurement ids, or the go to create the properties (3.4).
2. Whether the servicing side can carry construction-cis in the firm voice (decision 2 is taken;
   this is the operational follow-through).

## 6. Log

- 2026-09-28: plan written from the research readout; decisions 1 to 8 recorded; nothing built.
- 2026-09-28 late: phase 0 wave A (20 agents) built on all 17 sites, every builder tsc clean and
  vitest green; four Opus reader-fixers measured every site from its production build at 1280 and
  a real 390 (gov.uk control 390) and fixed what failed (about 60 audience-specific closers, focus
  rings on every form and calculator, contrast on Property, generalist, ecommerce, wills and
  divorce, "Ask we" sweep artefact on construction-cis, 47 em-dashes on Solicitors, two-form
  calculators on hospitality and pharmacies, zero-form hubs on wills and divorce); shared kit
  focus fix `65fa2303`; all 17 rebuilt clean twice; dependency closure OK; spot-check
  `PHASE0_SPOTCHECK_2026-09-28.md` passed care and generalist, two leftovers on the legal pair
  being fixed. 40 commits on local main. **`git push` refused by the session's permission
  classifier; the owner runs `! git push origin main`.** Then: CI watch, deploy all 17 on the
  owner's word, env set onto the two silent projects (`VERCEL_ENV_PREP_SILENT_SITES_2026-09-28.md`,
  13 sensitive values are owner dashboard pastes), `calc_pdf_offer` off. Owner inputs open: 13 GA4
  properties (`ESTATE_PLUMBING_2026-09-28.md`), ecommerce phone, AdSense console per domain.
