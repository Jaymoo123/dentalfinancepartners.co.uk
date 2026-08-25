# Deploy gate brief — 2026-08-03

> **SUPERSEDED IN LARGE PART, same day.** This brief was compiled before the
> deploy round of 2026-08-03, in which the owner LIFTED the Property freeze and
> **seven sites shipped** from committed HEAD `8c2fbcdf`: Dentists, generalist,
> Property, startups-tech, construction-cis, Solicitors and digital-agency.
> Medical was deliberately held on the MED-F7 judgement call. That round closed
> most of the undeployed backlog described below, and it also fixed the live
> lead-consent wording that this brief flags as its highest risk: DJH is no
> longer named on Property /contact.
>
> Read the deploy record for what actually shipped before relying on anything
> here. The risk framing and the four risk classes remain useful; the specific
> "not deployed" statuses mostly do not. Do not treat this document as the
> current state of production.

One decision, not five. This is the **evidence layer only**. It contains no recommendation.

Everything below was established from the repository: git history, git tags, `docs/`, and the
memory directory. **Nothing here was verified against Vercel.** See "What this brief cannot
tell you" before treating any line as certain.

---

## Page 1 — the decision in front of you

**Nothing on this branch has been deployed since 2026-07-23.** 78 commits and 1,624 changed
files are sitting undeployed, plus 145 uncommitted files from today's correctness sweep.

| | Count |
|---|---:|
| Commits on `expansion/phase-0` ahead of `origin/main` | 78 |
| Commits not yet pushed to `origin/expansion/phase-0` | 8 |
| Files changed since the last recorded deploy round | 1,624 |
| **Discrete undeployed deliverables (see §3)** | **21** |
| Uncommitted files in the working tree | 145 → 205 and rising (§4) |

**This is not one deploy. It is at least four different risk classes, and they can be split.**

| Class | What it is | Risk | Count |
|---|---|---|---:|
| **A. New URLs only** | 100 finance/tax pages + 11 calculators, 3 whole unlaunched sites, 2 singleton posts | Near zero. Cannot break what does not exist. | 8 items |
| **B. Changes to ranking pages** | 255 modified Property blog posts, 71 Medical posts, 31 agency posts, 20 Solicitors posts, R3 year-transition edits, 5 new 301 redirects | Real. These pages carry the estate's traffic. | 7 items |
| **C. Converting surfaces** | Property homepage, /contact, /book, /thank-you, /complete, privacy policy, all 4 lead API routes, lead-consent wording | Highest. Property is 78% of all leads. | 3 items |
| **D. Held / frozen / gated** | Property deploy freeze, Medical MED-F7, wills-probate + divorce-finances G1, Ashfield's 4 open gates | Would be breached by a careless "deploy everything". | 3 items |

### The three things that most need a decision

1. **Property's live lead-consent wording names a firm the deal has ended with.**
   The live site (last deployed 2026-07-20) still tells enquirers their details go to
   *"DJH Business Advisers Limited (part of the DJH group of companies)"*. Commit `346f0924`
   (2026-07-27) removed that name and replaced it with the category wording *"a firm from our
   specialist partner network"* — because, in its own commit message, *"the former named-firm
   details were removed 2026-07-27 when that deal ended"*. **That commit has never been
   deployed.** Meanwhile invoice DJH-002 bills 11 Property leads for July, and Haines Watts is
   being onboarded as a second buyer. This is an ordering constraint that is currently
   inverted: the site is describing an arrangement that no longer matches reality.

2. **Property is under an owner deploy freeze, and 316 Property files are queued behind it.**
   The freeze was set by the owner on 2026-07-18 and no memory file records it being lifted.
   `estate_growth_plan_2026_07_19.md:16` schedules the *"Property miniform verdict + unfreeze
   decision 08-06"* — three days from now. A Property deploy today ships 255 modified
   already-ranking blog posts, the homepage, /contact, the privacy policy, middleware and all
   four lead API routes in a single change. It also ships `landlordTax.ts` with its known
   income-tax band bug unfixed (§5.3), because that file was deliberately not touched.

3. **Medical's MED-F7 frozen GP-partner post is in the undeployed diff.**
   MED-F7 froze *"homepage trust wall + health-check magnet + LeadForm + /contact CTAs;
   freeze the GP-partner post"* — these are the only proven converting surfaces on a site
   whose entire diagnosis rests on holding them byte-identical.
   `Medical/web/content/blog/becoming-gp-partner-financial-implications.md` is modified in
   commit `7456a6fe` (a `keyTakeaways` frontmatter backfill, +6 lines). The Medical homepage,
   LeadForm and /contact are **not** touched — only the post. Whether a frontmatter-only
   addition breaches MED-F7 is a judgement call, not a fact, and it needs to be made
   deliberately rather than swept in.

---

## 1. Method, and what this brief cannot tell you

**Method.** Deployment state was reconstructed from three sources:

1. **Git deploy tags.** `deploy/<site>/<date>-<id>` tags exist, but the newest is
   `deploy/medical/2026-07-07-m3`. **Tagging was abandoned after 2026-07-07.** Tags are
   therefore useless for anything in the last four weeks.
2. **Memory-directory deploy records.** These are narrative but dated and specific, and they
   are the only usable source after 07-07. They record two deploy rounds in the window:
   2026-07-20 (six sites) and 2026-07-23 (twelve sites, in two batches).
3. **Git commit dates against those records.** Anything committed after the last recorded
   deploy for a given site is treated as undeployed.

**Auto-deploy is off.** `vercel_cli_deploy_workflow.md` line 4: *"GitHub auto-deploy is OFF."*
It was disconnected because the daily 100-deploy limit was being hit. Deploys are explicit
manual Vercel CLI runs from the repo root. **This means pushing to git deploys nothing.**
It also means the "is it deployed?" question genuinely cannot be answered from git alone.

**What this brief cannot tell you:**

- **I cannot query Vercel.** No deployment IDs, no build logs, no live-site state was checked.
  Every "not deployed" below is an inference from the absence of a deploy record, not an
  observation.
- **A deploy could have happened without being recorded.** The record-keeping is narrative
  memory files written by agents. If a deploy happened and nobody wrote it down, this brief
  will wrongly call it undeployed.
- **One known contradiction is unresolved.** The Property deploy freeze is dated 2026-07-18,
  but `fa2026_corpus_sweep_state.md:32` records a Property production deploy on 2026-07-20
  (*"Property (reworded content confirmed live)"*). No file reconciles the two. Three later
  files still describe Property as frozen. **Treat the freeze as in force, but verify before
  acting.**
- **The 2026-07-23 deploy rounds were content deploys of specific commits**, not necessarily
  full-tree deploys. It is possible some pre-07-23 work also never shipped. I have used
  07-23 as the frontier because that is the strongest available evidence, and I flag it as
  a floor rather than a certainty.

**One piece of hard evidence exists, and it is not mine.** `ESTATE_OPPORTUNITY_SCOPE_2026-08-03.md`
(uncommitted, written today) line 75 records live 404 checks performed today:
*"Verified live today: `/blog/property-finance` 404, `/calculators/bridging-loan-calculator`
404, generalist `/blog/business-finance` 404."* That is direct confirmation that at least the
finance corpus is not live. It is the only live verification in this brief.

**Confidence key used throughout:**

- **EVIDENCED NOT DEPLOYED** — a live 404 was observed, or the site has no Vercel project at all.
- **INFERRED NOT DEPLOYED** — committed after the site's last recorded deploy, no contradicting record.
- **UNKNOWN** — no deploy record either way, or conflicting records.

---

## 2. Per-site deployment state

The frontier commit used throughout is `6d1cab86` (2026-07-23), the last commit of the final
recorded deploy round.

| Workspace | Last recorded deploy | Undeployed files | New / Modified | State |
|---|---|---:|---|---|
| **Property** | 2026-07-20 (freeze conflict, §1) | 374 | 58 new / 316 mod | **INFERRED NOT DEPLOYED** + partly EVIDENCED (404s) |
| **Dentists** | 2026-07-23 | 13 | 8 new / 5 mod | INFERRED NOT DEPLOYED |
| **Solicitors** | 2026-07-23 | 20 | 0 new / 20 mod | INFERRED NOT DEPLOYED |
| **Medical** | 2026-07-19 | 71 | 0 new / 71 mod | INFERRED NOT DEPLOYED |
| **generalist** | 2026-07-23 | 78 | 58 new / 17 mod / 3 del | **EVIDENCED NOT DEPLOYED** (`/blog/business-finance` 404) |
| **digital-agency** | 2026-07-23 | 31 | 0 new / 31 mod | INFERRED NOT DEPLOYED |
| **construction-cis** | 2026-07-23 | 1 | 1 new | INFERRED NOT DEPLOYED |
| **contractors-ir35** | 2026-07-23 | 0 | — | Up to date |
| **care** | 2026-07-23 | 0 | — | Up to date |
| **hospitality** | 2026-07-23 | 0 | — | Up to date |
| **crypto** | 2026-07-16 (launch only) | 0 | — | Up to date, but **no Vercel project in the deploy map** — nothing can be deployed to it |
| **ecommerce** | 2026-07-23 | 0 | — | Up to date |
| **charities** | 2026-07-23 | 0 | — | Up to date |
| **pharmacies** | 2026-07-23 | 0 | — | Up to date |
| **startups-tech** | 2026-07-23 | 1 | 1 new | INFERRED NOT DEPLOYED |
| **divorce-finances** | **never** | 183 | 183 new | **EVIDENCED NOT DEPLOYED** — held at G1 |
| **wills-probate** | **never** | 309 | 309 new | **EVIDENCED NOT DEPLOYED** — held at G1, `sites` row `active=false` |
| **ashfield** | **never** | 55 | 55 new | **EVIDENCED NOT DEPLOYED** — Vercel project not created, domain not bought |
| **console** | 2026-07-10 | 0 | — | Up to date |

Non-site directories with undeployed changes: `docs` (274 new files, no production impact),
`legal` (6 new + 3 modified, no production impact), `packages/web-shared` (2 new experiment
registries + 1 modified index — **shared code, rebuilds every site**).

---

## 3. The 21 undeployed deliverables, in plain English

Grouped by blast radius. Class A is safe to ship in isolation; Class C is not.

### Class A — new URLs only (near-zero risk)

| # | Site | What it is | Blast radius |
|---|---|---|---|
| A1 | Property | **15 new specialist-tax pages + 2 calculators** (capital allowances, R&D, land remediation) | New URLs only |
| A2 | Property | **34 new landlord-finance pages + 5 calculators**, under a brand-new `/blog/property-finance` category. Confirmed 404 in production today | New URLs + one new category page |
| A3 | generalist | **25 new business-finance pages + 2 calculators**. `/blog/business-finance` confirmed 404 today | New URLs only |
| A4 | generalist | **18 new exit / succession pages + 2 calculators** | New URLs only |
| A5 | Dentists | **8 new dental-practice-finance pages** (buying a practice, squat funding, equipment finance, refinancing) | New URLs only |
| A6 | construction-cis | **1 new post**, vans and tools capital allowances 2026/27 | New URL only |
| A7 | startups-tech | **1 new post**, founder salary vs dividends 2026/27 | New URL only |
| A8 | ashfield | **A whole new parent-brand site, 19 routes.** Sells "rent-a-site" and "buy-leads" — the shopfront a prospective lead buyer would be sent to | Entirely new site. Nothing exists to break |

**A1-A5 are the "100 pages + 11 calculators" the owner already knows about.** They are
content-only. Per `ESTATE_OPPORTUNITY_SCOPE_2026-08-03.md:91`: *"The sign-offs only gate the
CTAs, not the pages."*

### Class B — changes to pages that already rank

| # | Site | What it is | Blast radius |
|---|---|---|---|
| B1 | Property | **255 already-published blog posts modified** by the SEO audit remediation (`c218d7a6`): internal links, meta, image alt text, heading structure. 542 insertions / 527 deletions across 301 files — small edits, very wide | Property carries 753 of the estate's 1,039 monthly clicks. Widest-reach item in the set |
| B2 | Medical | **70 posts get `keyTakeaways` frontmatter added, 38 get meta trimmed.** All 71 changed files are content markdown plus one footer component | Medical is ~11/117 indexed. Includes the MED-F7 frozen post — see §5.2 |
| B3 | digital-agency | **R&D tax-credit content corrected to the merged scheme** (was factually stale) + meta trims + 2026/27 refresh, 31 posts | Agency is 5 clicks/month. Low traffic risk, high correctness value |
| B4 | Solicitors | **20 posts:** canonical corrections, meta trims, 2026/27 refresh, and **2 new 301 redirects** consolidating a never-live `/blog/vat-and-compliance/` path that GSC had picked up 40 impressions on | Redirects change URL behaviour. Verified as a consolidation onto the live path |
| B5 | generalist | **17 posts refreshed to 2026/27, 3 duplicate posts deleted, 5 new 301 redirects** added. **I verified all 3 deleted slugs have a matching 301** — no orphan 404s | Redirects + deletions. Checked clean |
| B6 | Medical / Dentists / Solicitors | **Sitewide propertytaxpartners footer cross-links removed**, replaced with one contextual nofollow link per site | Footer = every page on three sites |
| B7 | Dentists / Solicitors / agency / generalist | **R3 singleton refresh to 2026/27** across the four sites | Tax-year figures on ranking pages |

### Class C — converting surfaces

| # | Site | What it is | Blast radius |
|---|---|---|---|
| C1 | Property | **The SEO audit also rewrote the converting surfaces:** homepage, /contact, /book, /complete, /thank-you, /services, /about, /locations, privacy policy, all 9 blog category pages, all 6 calculator pages, `sitemap.ts`, `middleware.ts` | **Property is 63 of the last 81 estate leads.** Every lead entry point is in this diff |
| C2 | Property | **Category-based partner disclosure** (`346f0924`): removes the named firm from lead-consent wording, the privacy policy, and all 4 lead API routes; replaces it with "a firm from our specialist partner network". Also neutralises named-firm references in booking, dossier, call-brief and contactability code | Lead consent text on every form. See §6 |
| C3 | packages/web-shared | **2 new experiment registries** (wills-probate, divorce-finances) + modified index | Shared package. Every site rebuilds against it |

### Class D — sites and items under an active hold

| # | Site | What it is | Hold |
|---|---|---|---|
| D1 | wills-probate | **A complete 123-post site**: 7 calculators, 2 research assets, 4 content waves, 309 files | **Owner gate G1** (brand + domain). `sites` row inserted `active=false`. Migration `20260724000001` not applied. No Vercel project |
| D2 | divorce-finances | **A complete site**: 17 posts, 5 calculators, 2 research assets, 4 pillars, 3 commercial hubs, 183 files | **Owner gate G1** (brand + domain). Phase 6 infra GO'd 2026-07-28, G1 itself is not |
| D3 | ashfield | (also A8) 19 routes | 4 open owner gates: domain not bought, Vercel project not created, DB migration not applied, pricing is placeholder |

---

## 4. The uncommitted working tree — 145 files, and growing while you read this

Today's correctness sweep. **None of this is committed, so none of it can be deployed.**

> ⚠️ **The working tree is not stable.** It measured 145 changed files at the start of this
> analysis and 205 roughly an hour later, without this brief editing anything but its own
> file. The growth is concentrated in wills-probate (20 → 71 files, including
> `probate-timeline-estimator.ts`, `tools.test.ts` and ~50 IHT/probate posts), which is
> consistent with the Fable audit-and-rewrite described in §5.4 being executed right now by
> another session. I confirmed the extra files are genuine content changes, not line-ending
> noise (`git diff --numstat` reports zero whitespace-only files).
>
> **Consequence: the 145 breakdown below is a snapshot, not a total. Re-run
> `git status --porcelain` immediately before any commit decision.** It also means a second
> agent is writing to the same tree, so "commit everything" is currently unsafe on its own
> terms, independent of any deploy question.

| Theme | Files | Sites affected |
|---|---:|---|
| **Capital allowances / AIA / WDA correction sweep** (content) | 57 | digital-agency 20, Dentists 16, generalist 12, Solicitors 6, Medical 1, Property 2 |
| **s.162 incorporation relief + goodwill corrections** (content) | 12 | Property 5, Solicitors 4, Dentists 1, generalist 2 |
| **Calculator + rate-table tax years** (code) | 19 | digital-agency 17 (4 compute libs, 6 tool configs, `uk-tax-rates.ts`, rates page, glossary + guides data, 1 test), generalist 2 |
| **Microsoft Clarity removal** (PECR) | 18 | `packages/web-shared` 9 incl. **deleted** `Clarity.tsx`, Property 5 incl. **deleted** `Clarity.tsx`, ashfield 2, Dentists 1, Solicitors 1 |
| **Legal document reconciliation** | 8 | `legal/` LIA + README, Property privacy policy + `site.ts` consent wording + `reply-ack.ts` + `aux-cron.ts`, divorce-finances `aux-cron.ts` |
| **New wills-probate posts** | 20 | wills-probate (17 new, 3 modified) — probate cost/threshold cluster + Scottish confirmation |
| **Infra / tooling** | 5 | `optimisation_engine` GSC page client + new test, new Supabase migration, `scripts/Database/apply_migration.py`, `package-lock.json` |
| **Docs and briefs** | 11 | 2 new strategy docs, 6 modified STATE/spec files, 3 briefs |
| **Total** | **145** | |

Per-site file counts: digital-agency 35, wills-probate 20, Dentists 18, Property 17,
generalist 15, packages 10, Solicitors 8, docs 8, briefs 3, legal 2, ashfield 2,
optimisation_engine 2, supabase 1, scripts 1, Medical 1, divorce-finances 1, package-lock 1.

**Two working-tree items are not routine content edits and deserve a look:**

- **The Clarity removal deletes files from `packages/web-shared`**, the package every site
  builds against. `security-headers.ts`, `track.ts`, `consent.ts`, `ConsentedScripts.tsx` and
  `AnalyticsProvider.tsx` all change. This is a shared-code change with an estate-wide
  rebuild surface, sitting in an uncommitted tree.
- **`Property/web/src/config/site.ts` changes the lead-consent text again** — adding the
  onward re-referral disclosure required by DSA Annex B.2 (*"If that firm is unable to help,
  your details may be passed to another firm in the network for the same purpose"*), plus a
  matching new privacy-policy section. See §6.

---

## 5. Freezes and holds that a careless deploy would sweep up

### 5.1 Property deploy freeze — IN FORCE, 316 modified files behind it

Set by the owner 2026-07-18. No record of it being lifted.

> *"PROPERTY carries the same bug in `landlordTax.ts` but is FROZEN by owner (2026-07-18),
> flagged not fixed (an agent's Property edit was reverted)"* — `growth_program_2026_07.md:22`

Three later files still describe Property as frozen, including
`clarity_removed_pecr_decision.md:17` (*"removal only goes live on the next Property/ashfield
deploy"*) and `ashfield_trading_entity.md:26` (*"Property's copy ships with its next
(currently frozen) deploy"*). The unfreeze **decision** is calendared for 2026-08-06.

⚠️ **Unresolved:** a Property production deploy is recorded on 2026-07-20, two days after the
freeze. Nothing reconciles this.

**Swept up if deployed carelessly:** every Property converting surface (C1), the partner
disclosure change (C2), 255 ranking posts (B1), 49 new posts (A1/A2), and the
`landlordTax.ts` bug below.

### 5.2 Medical MED-F7 — the GP-partner post is in the diff

> *"MED-F7 Protect the converting surface (freeze homepage trust wall + health-check magnet +
> LeadForm + /contact CTAs; freeze the GP-partner post) ... guardrail (no deploy; do-not-touch
> rule) ... STANDING"* — `docs/medical/DIAGNOSIS_2026-07.md:148`

> *"the homepage is the proven converting surface (MED-F7); no discovery or GEO experiment may
> modify it."* — same file, line 163

**What I checked.** Of Medical's 71 undeployed files, 70 are content markdown and 1 is
`SiteFooter.tsx`. The homepage, LeadForm and /contact are **not** modified — good.
`becoming-gp-partner-financial-implications.md` **is** modified: commit `7456a6fe` adds a
5-item `keyTakeaways` block to the frontmatter, +6 lines, no body change.

**This needs a human call.** MED-F7's stated test is *"held byte-identical"*. A frontmatter
addition is not byte-identical, though it is close to the JSON-LD-only exceptions the freeze
allows. It should be decided, not defaulted.

Also standing on Medical: **MED-F2** (owner Request Indexing) was never confirmed as done, and
the re-verdict is not due until ~2026-08-31.

### 5.3 `landlordTax.ts` — the frozen bug, confirmed in code

The bug is real and I read it. `Property/web/src/lib/landlordTax.ts`:

```ts
// line 53
export const HIGHER_RATE_LIMIT = PA_TAPER_END - PERSONAL_ALLOWANCE;   // 125,140 - 12,570 = 112,570

// lines 162-163
const higherAmount = Math.min(Math.max(0, taxable - BASIC_RATE_LIMIT), HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT);
const additionalAmount = Math.max(0, taxable - HIGHER_RATE_LIMIT);
```

`HIGHER_RATE_LIMIT` is expressed in *taxable* income but derived by subtracting the *full*
personal allowance. Once the allowance tapers away above £100k, the actual allowance is
smaller or zero, so the additional-rate band starts too early and tax is overstated. The same
bug was found and fixed across five other sites (*"overstated tax up to ~£628 over £100k
income — £150k now £53,703 not £54,332"*). Property was deliberately left broken.

**Confirmed:** `landlordTax.ts` is not modified in any undeployed commit and not in the
working tree. The freeze is being respected. **A Property deploy ships the bug unchanged** —
it does not make it worse, but it does not fix it either.

### 5.4 wills-probate and divorce-finances — owner gate G1

> *"Brand/domain DEFERRED to end of build (G1). **Do NOT ask owner about branding again** —
> owner explicitly complained about being hassled."* — `wills_probate_build_state.md:14`

> *"Site remains owner-HELD (no deploy)"* — same file, line 35

> *"ONLY pause = G1 (brand/domain/deploy). Brand deferred to G1, never ask."*
> — `divorce_finances_build_state.md:20`

There is also a **content-standard problem** on wills-probate: some posts were drafted by
Fable, which breaches the Opus-only content rule. `ESTATE_OPPORTUNITY_SCOPE_2026-08-03.md:125`
lists an audit-and-rewrite as a pre-launch requirement, specifically wave-3 batch 2 and the
uncommitted `how-much-does-it-cost-to-make-a-will.md`.

And a hard estate rule that bears on G1 directly:

> *"Medical trap root cause: brand name changed after content generation → mixed-brand corpus
> → GSC crawl/ranking handicap. **Rule: brand+domain LOCKED before ANY content.**"*
> — `estate_expansion_program.md:51`

Both sites now have full corpora written under a placeholder brand. That rule has already been
overrun; G1 is the last point at which the damage is bounded.

### 5.5 Other holds found

| Hold | Source | Would a careless deploy breach it? |
|---|---|---|
| **"Do not add any disclosure or banner to any site that does not already have it."** An estate-wide sweep adding Resend to 17 privacy policies was stopped mid-flight and fully reverted. Treat "add a disclosure across the sites" as blocked by default | `clarity_removed_pecr_decision.md:13` | **Possibly.** The working tree adds a new privacy-policy section to Property. Property already has that policy, so this reads as amendment not addition — but the rule is broad and this should be checked |
| **CGT-on-property cluster** — deferred, no 301 without sign-off | `MEMORY.md:8`, `serp_meta_program.md:29` | No 301s for it are in the diff |
| **Dividend `-2025-26` 301** — deferred | `MEMORY.md:8` | generalist's 5 new 301s include a `dividend-tax-rates-2025-26-quarterly-director` redirect. **Check whether this is the deferred one** |
| **Ashfield: add `ashfield` to `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` on Property deployment before any CC armed** | `ashfield_parent_site.md:19` | Yes, if Ashfield ships without the env change |
| **Ashfield: DB migration not applied** — real leads REJECTED by `leads_source_valid` until it is | `ashfield_parent_site.md:18` | Yes. Ashfield would collect leads and drop them |
| **generalist deploy precondition:** next deploy needs `NURTURE_FROM_EMAIL` / `NURTURE_FROM_NAME` / `NURTURE_REPLY_TO` / `NURTURE_WEBHOOK_SECRET` in Vercel env **or live newsletter signup likely breaks** | `sites_standardisation_program.md:24` | **Yes.** generalist has 78 undeployed files |
| **crypto:** no Vercel project in the deploy map; a known stale tax file was deferred in the 07-20 round because there was nowhere to deploy it | `fa2026_corpus_sweep_state.md:32` | N/A — cannot be deployed at all |
| **Solicitor sign-off on Cluster-1 CTA wording before finance conversion goes live**; Cluster 2 (commercial/bridging/dev) is IAR-gated and deliberately carries **no finance CTA at all** | `adjacent_leadgen_finance_expansion.md:50,57` | Only if CTAs are armed. The pages themselves are not gated |
| **construction-cis test-lead live verification HELD for user sign-off** | `construction_cis_state.md:27` | Only 1 file undeployed there |
| **NO Google Business Profile ever** (suspension risk) | `feedback_data_source_corrections.md:16` | Nothing in the diff touches this |

---

## 6. Ordering constraints

### 6.1 The lead-consent constraint — currently inverted

The data-sharing agreement pack states the rule explicitly:

> *"**THE ONE CRITICAL TASK before any real lead is sent = deploy the on-site data-sharing
> transparency (the go-live site flip).** VERIFIED runbook = `legal/GO_LIVE_SITE_FLIP.md`.
> **ORDER: deploy the site transparency FIRST, then send leads.**"*
> — `leadgen_data_sharing_agreement_pack.md:57`

> *"LIA integrity DEPENDS on the site transparency going live (lead-form acknowledgement naming
> DJH + privacy-notice update) before the first real lead - still HELD"* — same file, line 67

**That flip did ship**, on 2026-06-22. So the original constraint was met. **The problem is
that the arrangement has since changed twice and the site has not.**

| Layer | State | Deployed? |
|---|---|---|
| **Live site today** | Lead consent names *"DJH Business Advisers Limited (part of the DJH group of companies)"*, links its privacy policy | Live since 2026-06-22 |
| **Committed, `346f0924` (2026-07-27)** | Named firm removed. Consent reads *"a firm from our specialist partner network"*. Commit message: *"the former named-firm details were removed 2026-07-27 when that deal ended"* | **NOT DEPLOYED** |
| **Uncommitted, today** | Adds onward re-referral disclosure: *"If that firm is unable to help, your details may be passed to another firm in the network for the same purpose"*, plus a matching new privacy-policy section. Described in the code comment as *"the exact Data Sharing Agreement Annex B.2 wording"* | **NOT COMMITTED** |

Meanwhile: 11 Property leads were billed to DJH for July (invoice DJH-002, committed today),
`legal/DSA_TEMPLATE.md` has been rewritten as a standing firm-agnostic agreement so a second
buyer can be onboarded send-one-file, and Haines Watts has an agreed Option B trial.

**The ordering constraint is therefore live and unmet in both directions.** The site describes
a single named firm that the deal has ended with; the intended model is a multi-firm network
with re-referral, and neither the category wording nor the re-referral disclosure is live.
Onboarding a second buyer before deploying at least `346f0924` would mean referring leads
under a consent notice that names a different firm.

One mitigation worth knowing: **no code path currently auto-sends anything to a partner.**
`lead-routing.ts:25-26` sets `DEFAULT_PARTNER_CC=''` and puts `property,test` in
`DEFAULT_CC_EXCLUDED_SOURCES` — described in memory as *"double-locked"*. The forward is a
**manual inbox action**. So this is a disclosure-accuracy problem, not an uncontrolled
data-flow problem.

### 6.2 Other prerequisites still open on the partner track

| Item | Source |
|---|---|
| **Solicitor review of DSA + LIA + form as one set** before signing anyone new — still advised, not done | `leadgen_data_sharing_agreement_pack.md:15` |
| **~16 back-office files still hardcode "DJH"** as the forward/booking destination (lead-routing, booking, dossier, call-brief, contactability, SpecialistWidget, API routes). Internal only, but it *"will bite on any partner switch"* | `leadgen_data_sharing_agreement_pack.md:45` |
| **DSA Annex A under-declares 4 fields** the handoff email actually carries (carrier, device/country, referrer, best-call-window). *"widen Annex A before signing; do not narrow the site"* | `leadgen_data_sharing_agreement_pack.md:48` |
| **ICO registration for Ashfield Trading** — not registered. Not a condition of signing, but required *"before first Delivery"* | `leadgen_data_sharing_agreement_pack.md:63,71` |
| **DPIA / screening assessment (Sch2 para 11)** — outstanding before go-live | `leadgen_data_sharing_agreement_pack.md:67` |

### 6.3 Deploy-order dependencies inside this release

1. **`packages/web-shared` before anything that consumes it.** The 2 new experiment registries
   (C3) and the uncommitted Clarity removal both change shared code. Every site builds against
   it. Sites must be redeployed to pick up either.
2. **generalist env vars before generalist deploy** — 4 `NURTURE_*` variables, or live
   newsletter signup likely breaks (§5.5).
3. **Ashfield DB migration + `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` before Ashfield goes live** —
   otherwise leads are rejected at the database and CC routing misfires.
4. **wills-probate / divorce-finances: G1 brand + domain before any deploy**, and the
   brand-lock rule (§5.4) means before any further content too.
5. **Property partner disclosure (`346f0924`) before onboarding a second lead buyer** (§6.1).
6. **Content pages can ship before CTA sign-off.** Per the scope doc: *"The sign-offs only gate
   the CTAs, not the pages."* This is the split that makes Class A deployable independently.
7. **Clarity removal is currently un-shippable.** It is uncommitted, and it *"only goes live on
   the next Property/ashfield deploy"* — both of which are frozen or ungated respectively.

---

## 7. Gaps in this brief, stated plainly

Read this section before treating anything above as settled.

1. **No Vercel state was queried.** Every "not deployed" except the three live 404s is an
   inference from missing records.
2. **Deploy tagging stopped on 2026-07-07.** The last four weeks of deploy history rests
   entirely on narrative memory files.
3. **The Property freeze-vs-deploy contradiction (2026-07-18 vs 2026-07-20) is unresolved.**
4. **The 07-23 frontier is a floor, not a proof.** Those were deploys of specific commits.
   Some pre-07-23 work may also be unshipped and would not show in these counts.
5. **I did not verify the 100 new pages build.** Memory records "build-GREEN" for the Track B
   Tier 1 work, but no build was run for this brief (the task forbade it).
6. **MED-F7's exact scope is a judgement call.** I established that the GP-partner post is
   modified and the homepage/LeadForm/contact are not. Whether frontmatter counts as a breach
   is not something the repo answers.
7. **I did not check whether generalist's `dividend-tax-rates-2025-26-quarterly-director`
   301 is the same deferred redirect** flagged in `MEMORY.md`. It should be checked before
   deploying generalist.
8. **Not every one of the 145 working-tree files was read.** Theme grouping is from paths,
   commit context and spot-checked diffs, not a line-by-line review of all 145.
