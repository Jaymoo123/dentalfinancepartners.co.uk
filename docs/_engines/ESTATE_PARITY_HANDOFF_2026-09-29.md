# Estate parity: handoff for the next agent (written 2026-09-28 late, for 2026-09-29)

## The prompt to paste

> Read `CLAUDE.md`, load the `standard_terms` skill, run ponytail full and caveman ultra. Then read
> `docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md` top to bottom and do what section 3 says, in
> order, stopping at every owner gate it names. Nothing deploys and nothing is pushed without the
> owner saying so in that turn. Report agents used after every fan-out.

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

State of the tree at handoff: all phase 0 commits plus the wording reversal are on local `main`.
Every site built clean before the reversal; the manager rebuilds after it. **`git push` is refused
by the session's permission classifier; the owner pushes with `! git push origin main`.** Nothing
is deployed. Production: seven sites on the 2026-09-28 build (Property, Medical, care, charities,
contractors-ir35, Dentists, generalist), ten on the 2026-09-23 build or older.

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
- A mechanical text sweep breaks copy ("Ask a specialist" became "Ask we"). No sweeps on prose.
- The auto-mode classifier refuses `git push` and prod `site_flags` writes from both shells, and
  `vercel deploy` from Bash but not from PowerShell.
- Vercel `sensitive` environment variables are write-only by API; only the owner can copy them
  between projects, in the dashboard.
- Price every fan-out (agent count) before launching, get the go, report the count after.
- Opus or Fable for anything a prospect reads; Sonnet for mechanical work; never DeepSeek.
- No new monitor, cron, email, digest, popup or banner without asking first.

## 3. What to do, in order

### 3.1 Confirm the push and CI

`git log --oneline origin/main -1` must match local `main`. If not, ask the owner to run
`! git push origin main`. Then `gh run list --limit 20`; own every red run (fix, or explain why it
is not a defect) and tell the owner how many red runs his inbox received. The "Content Quality
Check" workflow was already red ten times in the week before this work; its cause was not opened.

### 3.2 Deploy round (owner gate: "deploy")

From a clean worktree at the pushed SHA, short path (`git worktree add --detach C:/dep <sha>`),
`python scripts/check_dependency_closure.py` first, then per project from PowerShell:
`$env:VERCEL_PROJECT_ID="<id>"; $env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"; vercel deploy --prod --yes`
(project ids: memory `vercel_cli_deploy_workflow` and `ESTATE_OPS_READ_2026-09-28.md` section 2).
Order: Property, Medical, contractors-ir35, care, charities, then the twelve. Verify each by curl
(200 on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/ads.txt`; one form on
the homepage and one audience page; canonical self-referencing on `/services`). Remove the
worktree after.

### 3.3 The two silent projects (same round)

Before deploying wills-probate and divorce-finances: `set -a; source .env; set +a; python
scripts/_oneoff/vercel_env_copy_silent_sites.py` (dry run), then `--apply`. It copies the five
API-readable keys from charities and derives `NEXT_PUBLIC_SITE_URL`; it does NOT create
`ADMIN_DASHBOARD_KEY`, `CRON_SECRET`, `LEAD_NURTURE_TOKEN_SECRET` (generate each with
`python -c "import secrets; print(secrets.token_hex(32))"` and POST them per project, production
and preview). The 13 `sensitive` keys (Resend, Twilio, `LEAD_SERVICE_*`, nurture flags) are the
owner's dashboard paste; the full list and per-key rule are in
`VERCEL_ENV_PREP_SILENT_SITES_2026-09-28.md`. Deploy both after the variables exist. Then verify
with one real visit and `select count(*) from web_sessions where site_key in ('wills-probate',
'divorce-finances')`. Do not re-read estate data on these two for seven days; earlier numbers are
structurally zero.

### 3.4 Flag and post-deploy checks

`calc_pdf_offer` off in production `site_flags` (SQL in the leads-250 plan's deploy block; the
classifier refused it from this session, so the owner may run it in the SQL editor). Then an
independent live check by fresh agents, report only, about 10 agents (5 Sonnet inventory, 5 Opus
readers), the same shape as `LEAD_KIT_FULL_CHECK_BRIEF_2026-09-28.md`: every page type on every
site, rendered at 1280 and real 390, forms, canonicals, contrast, rings, schema, and one Opus
cross-site summary the owner reads. Owner gate before launching it (price it).

### 3.5 Phase 1, each on its own owner go (plan section 4)

1. Design port by damage: startups-tech (it has no header or footer component at all), hospitality,
   pharmacies, then care, digital-agency, then wills-probate and divorce-finances as one package.
   `DESIGN_PORT_PLAYBOOK.md` from the STOP block; one site per wave; budget a mop-up package.
2. Segment-page content chain on all sites, staged: Medical, contractors-ir35, care, charities
   (top-ups from their coverage maps), then Solicitors, generalist (needs a `/for/[slug]` route
   built first), Dentists, then the seven small sites, then the legal pair. Coverage map first
   where none exists (11 sites); the owner approves each site's page count before launch; Opus
   writers, two QA tracks, sweep, Sonnet integrator; about 52 runs per 15 pages.
3. Content waves on Dentists, digital-agency, crypto, startups-tech (funded). Hospitality,
   pharmacies and ecommerce keep post dates in the database; date them before classing them.
4. Chat widget and intent engine on the seven sites without them (care, charities, crypto,
   ecommerce, hospitality, pharmacies, startups-tech) once each has its design port.
5. The wording pass: owner-led, careful, one site at a time, starting from the readouts' quoted
   sentences. Not a sweep. Not before the owner asks.

## 4. Owner inputs still open

- 13 GA4 properties to create, or the token re-authorised with the edit scope
  (`ESTATE_PLUMBING_2026-09-28.md` lists display names and stream URLs).
- A real phone number for ecommerce (`+44 20 0000 0000` is live) and its missing
  `public/brand/logo.png`.
- The 13 sensitive variables on the two legal projects (section 3.3).
- AdSense console: add and approve each of the 15 newly wired domains; `ads.txt` serves after
  deploy.
- Decision 2 follow-through: construction-cis and the other pool-model sites now say "our
  accountants" on the front (five sites already did) while the privacy text accurately describes
  routing to up to six firms. The words will match the model only when the owner lines up the
  servicing side or runs the wording pass.

## 5. Where everything lives

`docs/_engines/`: research readout, data read, ops read, plan, phase 0 brief, shared and plumbing
and silent-sites and spot-check reports, wording revert, this handoff. `docs/<site>/`: research,
phase 0 report, STATE.md (dated 2026-09-28 entries). Memory: `leads_250_programme`,
`wills_probate_build_state`, `divorce_finances_build_state` (corrected to LIVE).
