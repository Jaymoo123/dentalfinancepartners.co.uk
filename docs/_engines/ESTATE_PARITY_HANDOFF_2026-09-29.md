# Estate parity: handoff for the next agent (written 2026-09-28 late, for 2026-09-29)

## The prompt to paste

> Read `CLAUDE.md`, load the `standard_terms` skill, run ponytail full and caveman ultra. Then read
> `docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md` **section 5 first** (the state at the end of
> 2026-09-29 and the next stage), then sections 1 to 4 for the history. Your job is section 5.3 in
> order, stopping at every owner gate. **Do not deploy, push, submit to IndexNow or write production
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

## 5. State at the end of 2026-09-29, and the next stage (READ THIS FIRST)

### 5.1 What happened on 2026-09-29

- Phase 0 recheck and fix round closed (section 3.1); every site safe to deploy.
- Owner ruled: Property's button green is the designer's and is not changed for contrast maths
  (phase 0's emerald-700 shift reverted, `2c59e437`); the same on generalist's orange (`7b6a9d03`).
  **Trap 12 now explicitly covers colour on Property, and by extension any designer-set colour.**
- Owner GO for the deploy round: **14 sites, Property first, 48 clean hours, then the rest**, from
  SHA `7b6a9d03` (worktree `C:/dep`), the bar and rollback in Appendix A.0. **Waits on his push**
  (`! git push origin main`; the classifier refuses it from a session). Held out: ecommerce (its
  design port was found COMPLETE and tagged `port-ecommerce-complete` on 09-26, never walked by
  the owner), startups-tech (own tag), wills-probate and divorce-finances (parked by owner).
- startups-tech design port: phases 0 to 6 built, reviewed, gap-fixed and tagged; owner walked it
  and said "plain jane"; the design UPLIFT followed the same day (kit adoption, four-marker row
  0/0/0/0 to 1/3/3/4, gate 9.1 kit 9/60), owner: "yep that's great". Tags
  `port-startups-tech-complete` = `port-startups-tech-uplift` on the final commit. Full record:
  `docs/startups-tech/STATE.md` (three close blocks) and `docs/startups-tech/_port/`.
- Kit gained additive props, every default byte-identical (playbook 8.11): `--calc-result-accent`
  token on the calculator headline, `FaqSection alwaysRenderAnswers`, `StatsCounter href`,
  `TestimonialsSection items/showRating/footnote`.
- The floating help widget port onto startups-tech: see 5.2 item 6 for the outcome.

### 5.2 Owner rulings taken 2026-09-29 (binding)

1. Never change a designer-set colour for contrast maths (Property, generalist; assume all).
2. Deploy round go, canary shape, 14 sites; wills/divorce/ecommerce/startups out of the round.
3. Lead-form consent text = the shared `leadConsentText` everywhere.
4. startups-tech: no sticky bottom bar; no deep-scroll panel, returning-visitor bar or next-step
   offer; no newsletter; enquiry form on every money page including the calculators and research
   indexes (done); help widget YES (port of generalist's, auto-open stays per decision 9 of 09-27).
5. "Same thing as other sites": a port is not done at the phase 6 tag; the UPLIFT (kit adoption to
   generalist's level) is part of the port and is budgeted from the start.
6. WIDGET OUTCOME: ported and reviewed to PASS (`878d56ce`, `docs/startups-tech/STATE.md` last
   block); every authored line is listed there for the owner. Property's and generalist's copies
   share a keyboard defect (focus never enters the dialog, no Escape); startups-tech's fix is the
   template for lifting the widget into the kit (5.3 item 6).

### 5.3 Next stage, in order (each on its own owner go)

1. **The deploy round.** Owner pushes; run Appendix A steps 1, 2 (14 sites from `7b6a9d03`, order
   Property, Medical, contractors-ir35, care, charities, Dentists, generalist, Solicitors,
   digital-agency, crypto, pharmacies, construction-cis, hospitality; Property alone first, 48
   hours, bar A.0), 4 (`calc_pdf_offer` off, owner paste), 5 (fresh-agent live check, about 10
   agents). Own every red CI run.
2. **startups-tech deploy** from `port-startups-tech-complete` on the owner's word: clean worktree,
   **run `npm ci --workspace=startups-tech/web --include-workspace-root` there first** (the
   workspace install crashed on Arborist in the dev tree; lock entries were regenerated lock-only
   and match generalist's), `check_dependency_closure.py`, deploy, curl, then the four-marker row
   and one form per money page on the live domain. Its kit commits ride along to every other
   site's NEXT build unchanged (defaults byte-identical, 416/416 kit tests).
3. **ecommerce**: owner walk on `next start` from `port-ecommerce-complete` + the 09-28 parity and
   recheck commits; expect the "plain jane" verdict and budget the uplift (about 8 agents, the
   startups shape: planner, U4 foundations alone, U1 to U3, review, gap-fix, re-review); then
   deploy on his word.
4. **Estate mop-ups from the startups port** (small, price each): turn `FaqSection
   alwaysRenderAnswers` on for generalist (12 call sites), Medical, ecommerce and construction-cis,
   which are LIVE with FAQ answers missing from the server HTML while their schema asserts them
   (about 2 agents, one build each, curl proof); check `--calc-result-accent` need on every site
   mounting the kit Calculator with a mid-tone brand on the slate-900 panel (Medical copper,
   ecommerce amber, crypto) (1 reader, fixes per site); kit `Breadcrumb` `tone` prop for indigo
   and amber brand heroes; kit mobile drawer focus trap (every ported site, owner decision).
5. **Next design ports by damage**, one site at a time, each WITH its uplift in the same session:
   hospitality, pharmacies, care, digital-agency, then wills-probate and divorce-finances as one
   package. Shape that worked on startups-tech (34 agents, one day): phase 0 alone and gated (5
   audit packages + fix wave), phase 1 tokens and chrome alone, phases 2 to 6 as one wave of six
   disjoint packages, verification executor, two reviews, gap-fix, re-review, THEN the uplift
   (planner, U4 alone, U1 to U3, review, gap-fix, re-review). Budget 36 to 40 agents per site.
   Start at the playbook STOP block and `scripts/port_preflight.py`. Read
   `docs/startups-tech/_port/UPLIFT_PACKAGES.md` before planning: the four-marker row target and
   the "adopt the kit by feeding it the existing copy" rule are what the owner is judging.
6. **Help widget on the other six small sites** (care, charities, crypto, ecommerce, hospitality,
   pharmacies), each after its port: lift `SpecialistWidget` + `IntentProvider` + `lib/intent` into
   `packages/web-shared` first so there is one implementation (manager carve-out), then per site a
   taxonomy map + openers (authored copy, listed for the owner) + mount (about 3 agents per site).
7. **Segment-page content chain** (section 3.2 item 2), content waves (item 3), and the owner-led
   wording pass (item 5), unchanged.

### 5.4 Traps that bit on 2026-09-29 (add to the playbook when the next port starts)

- A builder that reports a kit prop "has not landed" without checking the kit's git log is
  guessing; U3 left the hand-rolled FAQ on 30 posts on that claim. Put the kit commit SHA in every
  brief.
- A comment is a claim: R2 found `.ground-dark` declared and unused; R4 found a copied rule inside
  `@layer components` losing to a utility while its comment said it cleared the floor; R6 found a
  noscript selector requiring an attribute the element never carries.
- Bare `outline-none` on a field defeats every `focus-visible` ring recipe (Medical, then
  startups-tech, same day). Grep for it in every port.
- Importing `globals-standard.css` needs `--radius` and the four `--brand-glow*` channels declared,
  or radii collapse to 0 and the emerald fallbacks paint.
- `data-cta` on a wrapper `div` claims every click inside it (`closest("[data-cta]")`). Ids go on
  the control, never the container.
- A shell chain that ends in a heredoc and is followed by another line on the next row runs that
  line unconditionally: a tag was created on the wrong commit that way. One git write per call.
- The port harness at a 390 window size is not mobile emulation; only `puppeteer-core` with
  `isMobile: true` and the gov.uk control is.
- `npm ls --workspace` reports "extraneous" for packages that are correctly declared (generalist
  shows the same); not evidence of a broken lockfile. `npm install --package-lock-only` is.
- The owner will reject any colour shift on a designer-set palette, however good the contrast
  argument; ask before, never after (ruling 1 above).

### 5.5 Agents used 2026-09-29

Recheck + fix + verify 19; startups-tech port 26; uplift 8; index panels 1; help widget 4. Total 58.
No CI run, no push, no deploy, no owner-interrupting surface created.

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
