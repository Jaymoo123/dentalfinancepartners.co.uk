# Estate parity: handoff for the next agent (written 2026-09-28 late, for 2026-09-29)

## The prompt to paste

> Read `CLAUDE.md`, load the `standard_terms` skill, run ponytail full and caveman ultra. Then read
> `docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md` **section 5 first** (the state at the end of
> 2026-09-29 late and the next stage), then sections 1 to 4 for the history. **Your job is the
> numbered list in section 5.3**, in order, stopping at every owner gate. Read
> `DESIGN_PORT_PLAYBOOK.md` section 19 before writing any port or uplift brief. **Do not deploy, push, submit to IndexNow or write production
> flags unless the owner says so in that turn.** Price every fan-out before launching it and report
> agents used after. Never rewrite an existing sentence on any site; new pages are new content.

## 1. Where things stand

Read, in this order: `ESTATE_PARITY_RESEARCH_2026-09-28.md` (what was wrong, per site and estate),
`ESTATE_PARITY_PLAN_2026-09-28.md` (the eight owner decisions and the phase plan),
`ESTATE_PARITY_PHASE0_BRIEF_2026-09-28.md` (what phase 0 built),
`ESTATE_PARITY_WORDING_REVERT_2026-09-28.md` (what was then put back, and why).

In one paragraph: on 2026-09-28 a 25-agent research pass graded all 17 sites against Property.
Phase 0 then built the mechanical parity on every site: lead forms on every money page, one form
under each calculator result with gates removed, nurture timing corrected on 12 sites, focus rings
and contrast fixes, firm-first Organization and page schema, canonicals, sitemap dates, AdSense
wiring, IndexNow scripts, Search Console config, the two "unlaunched" sites found live, and the
root cause of their silence (Vercel projects with zero environment variables). Four Opus readers
measured every site from its production build at 1280 and a real 390 emulation. The owner then
ruled that the hundreds of sentences the agents rewrote (positioning sweep, audience closers,
"free first call" swaps, the 24-hour email line) were not wanted: **"I am fine with the wording we
had"**. Every rewritten sentence was put back to its pre-phase-0 text; every mechanical change
stayed. The 2026-09-28 positioning ruling (the brand is the firm) still stands as policy, but it
is to be executed later by a careful, owner-led pass, never by sweep.

State of the tree at handoff: all phase 0 commits plus the wording reversal are on local `main`,
61 commits ahead of origin, every site rebuilt clean after the reversal. **Nothing is pushed
(the session classifier refuses `git push`; the owner runs `! git push origin main` when he wants
CI) and nothing is deployed; the owner has parked the deploy.** Production: seven sites on the
2026-09-28 build (Property, Medical, care, charities, contractors-ir35, Dentists, generalist), ten
on the 2026-09-23 build or older.

Per-site evidence: `docs/<site>/PHASE0_2026-09-28.md` (builder section, Opus read section,
wording-reverted section) and `docs/<site>/PARITY_RESEARCH_2026-09-28.md`. digital-agency's docs
live in `docs/agency/`.

## 2. Standing rules that bit today

- Deploy only on the owner's word in that turn. Same for push, IndexNow, `site_flags` writes.
- One agent per site in the shared working tree. Never `git checkout/restore/stash/reset` in an
  agent prompt. Agents do not commit; the manager commits per site after a serialised build.
- Never run 17 `next build`s in parallel; one at a time (about 20 minutes for all 17).
- A rendering check needs the gov.uk control at a real 390 emulation (`puppeteer-core`,
  `page.emulate`, `isMobile: true`); Edge `--window-size` lies.
- A mechanical text sweep breaks copy ("Ask a specialist" became "Ask we"). No sweeps on prose,
  and after the owner's ruling, no agent-written sentences on existing pages at all.
- The auto-mode classifier refuses `git push` and prod `site_flags` writes from both shells, and
  `vercel deploy` from Bash but not from PowerShell.
- Vercel `sensitive` environment variables are write-only by API; only the owner can copy them
  between projects, in the dashboard.
- Price every fan-out (agent count) before launching, get the go, report the count after.
- Opus or Fable for anything a prospect reads; Sonnet for mechanical work; never DeepSeek.
- No new monitor, cron, email, digest, popup or banner without asking first.

## 3. What to do, in order

**Update 2026-09-29: section 3.1 is DONE** (recheck, fix round and verification; see
`PHASE0_RECHECK_2026-09-29.md`, commits `c8be20cf`..`b8f1c4ed`). Every site is safe to deploy on the
owner's word; deploy remains parked. Owner ruling 2026-09-29: lead-form consent text is the shared
`leadConsentText` on every site. Next agent starts at 3.2 item 1 (startups-tech design port).

**The owner has parked the deploy (2026-09-28 late: "I don't want to deploy yet").** Nothing in
this section touches production. Appendix A holds the deploy runbook for the day he says go.

### 3.1 Independent recheck of phase 0, on local builds (owner gate: price it first)

Purpose: a second, fresh pair of eyes over what 20 builders, 4 readers and 4 reverters did, before
anything ships. Report first, fix second. About 10 agents (5 Sonnet inventory, one per 3 to 4
sites; 4 Opus readers, one per site group; 1 Opus cross-site summariser).

1. Build state: `git log --oneline -3`, `git status --short` (expect only `invoicing/` and the
   known untracked leftovers). Every site has a `.next` from the last serialised build; if in
   doubt rebuild ONE site at a time, never in parallel.
2. Per site, from `<site>/web`: `npx next start -p <port>` in the background (unique port per
   site, kill only the PID you started), then read the rendered pages with `puppeteer-core`
   (repo root; Chromium under `/c/Users/user/AppData/Local/ms-playwright/`) at 1280 and a real
   390 emulation with the gov.uk control first.
3. Check, with numbers, against `ESTATE_PARITY_PHASE0_BRIEF_2026-09-28.md` sections 3 to 6
   (mechanical) and `ESTATE_PARITY_WORDING_REVERT_2026-09-28.md` (wording):
   - one lead form on home, /about, /services and each `/services/*`, every segment page, one
     blog post, /contact; one form directly under each calculator result, no gate or modal;
   - header CTA visible at 1280, hidden at 390; scrollWidth 390 on every page; no raw markup
     as text; focus ring visible after Tab on the first input of every form and calculator;
     primary CTA contrast at or above 4.5:1 computed;
   - `rel=canonical` self-referencing on hubs and detail pages; sitemap dates real or omitted;
     Organization node from the shared builder with `parentOrganization`; Service, FAQPage and
     BreadcrumbList on segment and service pages; `/llms.txt` with UTM tags; `/ads.txt` 200;
     `og:image` 200;
   - `lead-nurture.ts` `delayHours` = `0,0,4,20,24,48,72,96`;
   - WORDING: the site's prose is its pre-phase-0 prose. Proof = the defect-string grep from the
     revert doc returns the same count as `git show 8e1043d0` for the same files, AND a read of
     the rendered pages finds no sentence that reads machine-written or out of the site's voice
     (the three known exceptions: wills-probate pillar titles, divorce `/services` intro, the two
     replaced `llms.txt` files). Any surviving agent sentence is a finding.
   - the three mechanical repairs reverter A made on Property (`about/page.tsx:171`,
     `calculators/page.tsx:158`, `making-tax-digital-landlords/page.tsx:849`) render with a
     ground behind the text.
4. Output: `docs/<site>/PHASE0_RECHECK_2026-09-29.md` per site (numbers table, findings with
   severity and file:line, PASS/FAIL per check) and `docs/_engines/PHASE0_RECHECK_2026-09-29.md`
   (verdict in three lines, findings ranked, what is safe to deploy, what is not). The owner
   reads the estate file only.
5. Fix round (owner gate): only what the recheck found, one agent per site, then tsc, vitest,
   serialised rebuild, per-site commits by the manager. No wording rewrites; a wording defect is
   fixed by restoring the base text, never by writing a new sentence.

### 3.2 Phase 1, each on its own owner go (plan section 4), after the recheck is clean

1. Design port by damage: startups-tech (it has no header or footer component at all),
   hospitality, pharmacies, then care, digital-agency, then wills-probate and divorce-finances
   as one package. `DESIGN_PORT_PLAYBOOK.md` from the STOP block; one site per wave; budget a
   mop-up package; port the structure and the kit, never rewrite prose.
2. Segment-page content chain on all sites, staged: Medical, contractors-ir35, care, charities
   (top-ups from their coverage maps), then Solicitors, generalist (needs a `/for/[slug]` route
   built first), Dentists, then the seven small sites, then the legal pair. Coverage map first
   where none exists (11 sites); the owner approves each site's page count before launch; Opus
   writers, two QA tracks, sweep, Sonnet integrator; about 52 runs per 15 pages. New pages are
   new content, which is allowed; existing prose is not touched.
3. Content waves on Dentists, digital-agency, crypto, startups-tech (funded). Hospitality,
   pharmacies and ecommerce keep post dates in the database; date them before classing them.
4. Chat widget and intent engine on the seven sites without them (care, charities, crypto,
   ecommerce, hospitality, pharmacies, startups-tech) once each has its design port.
5. The wording pass: owner-led, careful, one site at a time, starting from the readouts' quoted
   sentences. Not a sweep. Not before the owner asks.

Each phase 1 item is built local-first, committed per site by the manager, and reported in
`docs/<site>/STATE.md` and the plan log. Deploy stays parked until the owner says otherwise.

## 4. Owner inputs still open

- 13 GA4 properties to create, or the token re-authorised with the edit scope
  (`ESTATE_PLUMBING_2026-09-28.md` lists display names and stream URLs).
- A real phone number for ecommerce (`+44 20 0000 0000` is live) and its missing
  `public/brand/logo.png`.
- The 13 sensitive variables on the two legal projects (Appendix A step 3).
- AdSense console: add and approve each of the 15 newly wired domains once deployed.
- Decision 2 follow-through: the front-of-site voice and the privacy text (routing to up to six
  firms) will only match once the owner lines up the servicing side or runs the wording pass.
- Two judgement calls from the reversal to confirm or strike: wills-probate pillar titles kept as
  "Estate Planning Specialists" (the base said "Probate Compass", a stale brand); divorce
  `/services` keeps a real intro instead of "Full service detail is being built now."

## 5. State at the end of 2026-09-29 (late) and the next stage (READ THIS FIRST)

### 5.1 What happened on 2026-09-29

- Phase 0 recheck and fix round closed (section 3.1); every site safe to deploy.
- Owner ruled: a designer-set colour is never changed for contrast maths (Property's button
  green, `2c59e437`; generalist's orange, `7b6a9d03`). Trap 12 now covers colour.
- Owner GO for the deploy round: **14 sites, Property first, 48 clean hours, then the rest**,
  from SHA `7b6a9d03` (worktree `C:/dep`), bar and rollback in Appendix A.0. **Still waiting
  on his push.** Held out: ecommerce, startups-tech, wills-probate, divorce-finances.
- **startups-tech design port + uplift complete and tagged.** Owner walked it, said "plain
  jane", the uplift answered it, owner: "yep that's great".
- **Estate mop-ups shipped:** `6799f928` kit `Breadcrumb tone` prop and a mobile drawer focus
  trap, every default byte-identical; `4aee5e50` a `--calc-result-accent` token so the
  calculator result headline is readable on the dark panel on **seven** sites (Dentists was
  1.04 to 1, now 7.10; pharmacies 1.47, digital-agency 2.84, Solicitors 3.06, contractors-ir35
  3.33, hospitality 3.51, care 3.80, all now 7.10 to 10.14; ten sites already cleared and were
  untouched, and no brand colour moved); `70a5f1d2` FAQ answers into the server HTML wherever
  the kit `FaqSection` is mounted, 12 call sites on generalist and 3 on Medical (one of them
  the wrapper covering nine `/for-*` pages). ecommerce and construction-cis were audited and
  need nothing: both use native `<details>`, so their answers were always in the HTML.
- **The help widget was lifted into the kit** (`70047cb6`, `packages/web-shared/support/`) as
  one implementation; startups-tech was re-pointed at it with a byte-identical server
  fragment, and hospitality became its second consumer. Kit fix `20f48e9d` closed a real
  keyboard bug both sites were shipping (the auto-opened panel captured forward Tab, so the
  launcher was unreachable). `port-startups-tech-complete` and `-uplift` moved to `20f48e9d`.
- **Kit batch, all additive, all defaults byte-identical:** `1437cb9e` (eight props out of the
  hospitality wave, plus the accordion ring reading the site token), `f17702ff`
  (`BlogSidebarCta` note, `Eyebrow className`, `RelatedArticles` link ring), `0b08df0a`
  (`CoverageCards columns` accepts 4). All recorded in `DESIGN_PORT_PLAYBOOK.md` section 8
  item 11.
- **HOSPITALITY design port WITH uplift, complete.** Tags `port-hospitality-phase0`
  `36d2b4fe`, `-phase1` `56c3f468`, `-phase2` to `-phase6` `577e22e2`, **`-complete` =
  `-uplift` = `ac897ad1`**. Contrast 235 to 219 to 0 to 26 at wave close to 0; four-marker row
  0/0/0/0 to 2/3/5/23; gate 9.1 all eight rows pass at 10 distinct kit components across 64
  call sites; the webfont had never applied and now does; the widget launcher is reachable at
  Tab press 83 on the home page and 43 on a calculator; tests 43 to 138. Two review blockers
  were rejected on evidence. Full record: `docs/hospitality/STATE.md` top block and
  `docs/hospitality/_port/`. About 40 agents.
- **ECOMMERCE design uplift built** (`a5fff093`, `2f1a6168`, `074b39ce`). This site was
  already on the Property four-marker row, so the uplift was kit breadth and lead
  instrumentation: 19 enquiry forms now report `data-cta`, 13 hand-rolled `crumbOnBrand`
  wrappers gone, `CoverageCards` on the hubs and homepage, the second grey ramp gone
  (`neutral-*` 517 hits to 11), tests 50 to 57. R5 PASS-WITH-GAPS, gap-fixed; **R6 re-review
  PASS-WITH-GAPS, seven items open**, including one regression from the gap-fix (two nested
  scroll containers in the post sidebar) and the estate-wide AdSense CSP block. Record: `docs/ecommerce/STATE.md` top block and
  `docs/ecommerce/_port/UPLIFT_PACKAGES.md` + `R5_UPLIFT_REVIEW.md`.
- **Nothing pushed** (local `main` is about 120 commits ahead of `origin`), **nothing
  deployed, no CI run, no monitor, alert, cron, email or banner created.**

### 5.2 Rulings taken 2026-09-29 (binding; the manager's are flagged for ratification)

**Owner's, binding already:**

1. Never change a designer-set colour for contrast maths (Property, generalist; assume all).
2. Deploy round go, canary shape, 14 sites; wills, divorce, ecommerce and startups out of it.
3. Lead-form consent text = the shared `leadConsentText` everywhere.
4. startups-tech: no sticky bottom bar, no deep-scroll panel, returning-visitor bar or
   next-step offer, no newsletter; enquiry form on every money page including the calculators
   and research indexes; help widget yes, auto-open stays.
5. "Same thing as other sites": a port is not done at the phase 6 tag. The uplift is part of
   the port and is budgeted from the start.
6. Go for the whole hospitality programme: "yeah let's go for everything, we're not deploying
   but we do everything".

**Manager's, taken to keep the waves moving, for the owner to ratify:**

7. **ecommerce keeps its native `<details>` FAQs.** They already hold every answer in the page
   source, so its FAQPage schema matches what it renders and it was never exposed to the
   defect that hit generalist and Medical. The kit accordion was not adopted there.
8. **ecommerce's four hub labels became config** ("What we do", "Who we help", "VAT guides",
   "Reports"), verified byte-identical to what those pages already published.
9. **The help widget was mounted on hospitality**, under ruling 4's precedent, with about
   thirty authored lines. Every one is listed in `docs/hospitality/STATE.md` for him to keep,
   change or cut.
10. **Seven sites got the `--calc-result-accent` token** so the calculator result headline is
    readable on the dark panel. It is a tint of each site's own brand hue and overrides
    nothing else; no brand colour changed. This sits close to ruling 1, which is why it is
    here.

### 5.3 Next stage, in order (each on its own owner go)

1. **The deploy round.** Owner pushes (`! git push origin main`; the classifier refuses it from
   a session). Then Appendix A steps 1, 2 (**14 sites, unchanged, still from `7b6a9d03`**,
   order Property, Medical, contractors-ir35, care, charities, Dentists, generalist,
   Solicitors, digital-agency, crypto, pharmacies, construction-cis, hospitality; Property
   alone first, 48 hours, bar A.0), 4 (`calc_pdf_offer` off, owner paste), 5 (fresh-agent live
   check, about 10 agents). Own every red CI run and count it.
2. **startups-tech deploy** from `port-startups-tech-complete` = **`20f48e9d`**: clean
   worktree, `npm ci --workspace=startups-tech/web --include-workspace-root` there first,
   `check_dependency_closure.py`, deploy, curl, then the four-marker row and one form per
   money page on the live domain.
3. **hospitality**: owner walk on `next start -p 3202`, then deploy from
   `port-hospitality-complete` (`ac897ad1`). His questions are listed at the end of
   `docs/hospitality/STATE.md`; the widget copy is there in full.
4. **ecommerce**: close R6's two real items first (the nested-scroll regression in the post
   sidebar, and the AdSense CSP host, which is item 7 below and the owner's call), then owner
   walk on port 3203 and deploy from that commit. His questions are at the end of
   `docs/ecommerce/STATE.md`; R6's list is in `docs/ecommerce/_port/R6_UPLIFT_REREVIEW.md`.
5. **Next design ports by damage, each WITH its uplift in the same session**: pharmacies, care,
   digital-agency, then wills-probate and divorce-finances as one package. Shape that worked
   twice now: phase 0 alone and gated, phase 1 tokens and chrome alone, phases 2 to 6 as one
   wave of disjoint packages with the uplift built in, verification executor, two independent
   reviews, gap-fix, re-review. Budget 36 to 40 agents per site. Start at the playbook STOP
   block, run `scripts/port_preflight.py`, and read playbook section 19 before writing any
   brief.
6. **Help widget on the remaining small sites through the kit**: care, charities, crypto,
   ecommerce, pharmacies. Now that the kit holds the implementation this is a taxonomy map,
   the opener copy and one mount per site: **about 1 to 2 agents each**, not the 3 to 4 it
   used to be. Every authored line gets listed for the owner.
7. **Estate leftovers**, each small, price it before launching:
   - `Calculator headingLevel` sweep across the 15 templates that jump h1 to h3 on their
     calculator pages (the kit prop exists, `1437cb9e`).
   - `Breadcrumb tone` sweep on the seven sites still hand-rolling `crumbOnBrand`, the ones
     startups-tech's census found (ecommerce's 13 are already done).
   - `FaqSection alwaysRenderAnswers`: **DONE** (generalist 12, Medical 3, `70a5f1d2`);
     ecommerce and construction-cis audited and need nothing.
   - The AdSense `frame-src` host in the kit CSP (`packages/web-shared/lib/security-headers.ts`),
     164 console errors per page load, estate-wide: **owner decision**, the classifier refuses
     it as a security weakening.
   - The help widget rendering on 404 pages: a **kit** change, additive fix proposed in a
     comment at the hospitality mount.
   - The dark closing panel meeting the dark footer with no real seam: **owner decision**,
     estate-wide, a hairline is already in on hospitality.
   - `StatsCounter tone="dark"` adoption on the ecommerce research bands.
   - The ecommerce `LeadForm` neutral variants, the last 11 `neutral-*` hits on that site.
8. **Segment-page content chain** (section 3.2 item 2), the content waves (item 3) and the
   owner-led wording pass (item 5), **unchanged**.

### 5.4 Traps that bit on 2026-09-29

Written up in full as **`DESIGN_PORT_PLAYBOOK.md` section 19**, fifteen entries. The ones most
likely to bite the next agent: an instrument reading 0 contrast failures does not mean the site
clears 4.5 (it ignores text alpha); a reviewer measuring a `display:none` element files a
defect that does not exist; a kit SHA quoted in a call-site ledger goes stale within the day;
no agent runs `git stash` (one did, nothing lost); and agent scratch files land in the repo
unless the agent is told where to put them and to delete them.

### 5.5 Agents used 2026-09-29

Recheck, fix and verify 19; startups-tech port 26; startups-tech uplift 8; index panels 1;
help widget on startups-tech 4 (**58 to that point, which is the figure the earlier version of
this section carried**); then the kit lift and the estate mop-ups about 5, the hospitality port
and uplift about 40, the ecommerce uplift about 8, and this docs pass 1. **About 110 for the
day as a whole.** None for CI, none for a push, none for a deploy. No monitor, alert, cron,
email or banner created.

## 6. Where everything lives

`docs/_engines/`: research readout, data read, ops read, plan, phase 0 brief, shared and plumbing
and silent-sites and spot-check reports, wording revert, this handoff. `docs/<site>/`: research,
phase 0 report, STATE.md (dated 2026-09-28 entries). Memory: `leads_250_programme`,
`wills_probate_build_state`, `divorce_finances_build_state` (corrected to LIVE).

## Appendix A. Deploy runbook, for the day the owner says go

1. Push: `git log --oneline origin/main -1` must match local `main`; the session classifier
   refuses `git push`, so the owner runs `! git push origin main`. Then `gh run list --limit 20`;
   own every red run and tell the owner how many his inbox received (the "Content Quality Check"
   workflow was already red ten times in the week before this work).
2. From a clean worktree at the pushed SHA, short path (`git worktree add --detach C:/dep <sha>`),
   `python scripts/check_dependency_closure.py`, then per project from PowerShell:
   `$env:VERCEL_PROJECT_ID="<id>"; $env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"; vercel deploy --prod --yes`
   (ids: memory `vercel_cli_deploy_workflow`, `ESTATE_OPS_READ_2026-09-28.md` section 2). Order:
   Property, Medical, contractors-ir35, care, charities, then the twelve. Verify each by curl (200
   on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/ads.txt`; one form on
   the homepage and one audience page; canonical self-referencing on `/services`). Remove the
   worktree after.
3. The two silent projects, before their deploy: `set -a; source .env; set +a; python
   scripts/_oneoff/vercel_env_copy_silent_sites.py` (dry run), then `--apply`; generate
   `ADMIN_DASHBOARD_KEY`, `CRON_SECRET`, `LEAD_NURTURE_TOKEN_SECRET` per project with
   `python -c "import secrets; print(secrets.token_hex(32))"` and POST them (production and
   preview). The 13 `sensitive` keys are the owner's dashboard paste
   (`VERCEL_ENV_PREP_SILENT_SITES_2026-09-28.md`). Verify with one real visit and
   `select count(*) from web_sessions where site_key in ('wills-probate','divorce-finances')`;
   do not re-read estate data on these two for seven days.
4. `calc_pdf_offer` off in production `site_flags` (SQL in the leads-250 plan's deploy block; the
   classifier refused it from a session, the owner may run it in the SQL editor).
5. An independent live check by fresh agents afterwards, report only, about 10 agents, the same
   shape as 3.1 but against the live domains.

### A.0 The bar and the canary order (written 2026-09-29, before any deploy)

Owner shape agreed 2026-09-29: Property alone first, 48 clean hours, then the rest. Nothing below
is a monitor or an email; it is read by hand at day 7 and day 28 and written into this file.

**Baseline, pulled 2026-09-29 (leads = Supabase `leads`, `is_test` excluded; search = fresh API
pulls, 28 days to 2026-09-27):**

| window | estate leads | Property leads | Property `calc_result_gate` leads |
|---|---|---|---|
| 09-01 to 09-14 | 46 | 34 | 7 |
| 09-15 to 09-28 | 46 | 28 | 2 |

| site | GSC clicks 28d | GSC impressions 28d | Bing clicks 28d |
|---|---|---|---|
| Property | 1,265 | 125,921 | 1,289 |
| Solicitors | 917 | 69,728 | 632 |
| Dentists | 201 | 16,200 | 307 |
| generalist | 188 | 26,268 | 615 |
| construction-cis | 128 | 15,725 | 78 |
| Medical | 90 | 5,283 | 325 |
| charities | 55 | 8,202 | 111 |
| care | 40 | 2,706 | 15 |
| pharmacies | 36 | 2,470 | 15 |
| hospitality | 14 | 1,659 | 42 |
| ecommerce | 13 | 5,242 | 6 |
| contractors-ir35 | 8 | 1,834 | 38 |
| startups-tech | 6 | 2,293 | 15 |
| crypto | 4 | 512 | 6 |
| digital-agency | 1 | 943 | 116 |
| wills-probate, divorce-finances | not in the pull script's site list (fix before the day-28 read) | | |

**The bar (a miss is a finding to investigate, not an automatic rollback):**

1. Day 7 after the Property canary: Property leads in the 7 days >= 12 (85% of its 14-day
   average halved). Below that, hold the other 16 and read `web_sessions` first: a beacon or
   env failure reads exactly like a conversion loss.
2. Day 7 after the rest: estate leads in the 14 days that follow >= 39 (85% of 46). Small sites
   carry too few leads for a per-site bar; a site at zero is a question (beacons, env vars,
   nurture flag), never a regression on its own.
3. Day 28: GSC clicks per site within 15% of the table above for the five sites over 100
   clicks (Property, Solicitors, Dentists, generalist, construction-cis). Positions are not the
   measure; a click drop with flat impressions is a title or snippet problem, a drop in both is
   indexing. Compare against a fresh pull, never a stored snapshot.
4. Property calculator leads are NOT a bar. The gate produced 7 then 2 leads per fortnight before
   removal; `calc_result_form` replaces it and the difference is inside noise for a month.

**Order:** Property (day 0), then Medical, contractors-ir35, care, charities (day 2 if bar 1
holds), then the eleven others the same day. **startups-tech is excluded** from this deploy: its
design port is mid-flight, and it ships on its own `port-startups-tech-phase6` tag after the
mop-up, from a later SHA.

**Rollback:** per site, instant, `vercel promote <previous deployment>`; the previous production
deployments were listed from the API on 2026-09-29 (seven sites at 09-28, two legal at 09-25,
eight at 09-23/24). Remove the stale `C:/dep` worktree (still at `815ae7de`) before creating the
new one at the pushed SHA.

**A.0 addendum (2026-09-29):** the fresh-pull script reads `public.sites.gsc_property_url`; the
two legal sites' rows are NULL, so their day-28 read errors. The session classifier refuses the
write ("Modify Shared Resources"); owner paste in the Supabase SQL editor, same shape as the other
17 rows, reversible by setting the column back to NULL:

```sql
UPDATE public.sites SET gsc_property_url = 'sc-domain:estateplanningspecialists.co.uk' WHERE site_key = 'wills-probate';
UPDATE public.sites SET gsc_property_url = 'sc-domain:divorcefinancespecialists.co.uk' WHERE site_key = 'divorce-finances';
```

Bing for the same two sites depends on the domains being verified in Bing Webmaster Tools, not
on config; check on the day-28 read.

**Owner ruling 2026-09-29: the wills-probate and divorce-finances items are parked** (env paste,
sites-table rows). Those two sites are excluded from the deploy round, like startups-tech. The
deploy round is the other 14 sites. Left for the owner: push, `calc_pdf_offer` off, the go.

**A.0 addendum (2026-09-29, late): deploy SHA for the 14-site round = `7b6a9d03`** (the worktree at
`C:/dep` is on it). Later commits on main are the startups-tech port (`331725dc`..`266be560`,
tag `port-startups-tech-complete`) and one additive kit token in
`packages/web-shared/tools/components/Calculator.tsx` (`--calc-result-accent`, fallback = the brand
hex, 416/416 kit tests). Startups-tech ships on its own after the owner walk, from its complete tag,
and that deploy carries the kit token to the other sites' next builds unchanged.
