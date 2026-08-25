# THE PROPERTY STANDARD: ESTATE ROLLOUT FRAMEWORK

Date: 2026-08-24. Status: PLAN. Dry-run tested 2026-08-24 (three adversarial execution simulations; findings incorporated, record in appendix Q).

**Living-doc contract (binding on every session that executes from this doc).** This doc stores two kinds of content: COMMANDS AND RULES (durable) and DATED FACTS (perishable snapshots, each carrying its verification date). Never act on a dated fact older than the thing it describes can change; re-derive it (trap 5) and, if it moved, CORRECT IT HERE IN THE SAME SESSION, with the new date. Every executing session ends by reconciling into this doc: decisions taken (§8 table), scripts generalised, dispositions that changed, new standing rules from owner review. A session that learned something this doc gets wrong and did not fix it has left the next agent a trap, which is the one unrecoverable failure mode of a written plan. The doc lives in git; committing the correction is part of the session's definition of done.

**Execution-gate model (read this before halting on "not authorised").** This doc is a plan until the owner authorises execution. Authorisation arrives per SCOPE, not per doc: "do the crypto pilot" opens every non-owner-gated step for that scope. Within an authorised scope, the only remaining hard stops are the per-item owner gates in appendix K (brand swatch, wordmark, font change, capture-surface scope, deploy, every time) and the §8 programme decisions not yet taken. When a §8 decision is taken, record it in the table in §8 with the date, in the same session; an agent finding an unrecorded decision asks once, then stops. Never infer authorisation from this doc's existence.

**What this is.** The reusable instruction set for doing to every other site what was just done to Property: (Track 1) a ground-up conversion-focused redesign to a measured, binding page contract; (Track 2) a competitor-driven corpus expansion via DataForSEO; (Track 3) new sites for the accounting niches still open. It is written for an executing agent with zero memory of the Property run. It is deliberately tight: every visual and structural decision is specified or pointered to a binding doc; deviation is a defect, not a flavour choice. The only sanctioned per-site variation is the brand layer defined in §4.3.

**Why it exists.** The Property redesign and expansion worked as a process, not just an outcome, and most of the process record lives in gitignored `tmp/design_migration/` (CONTEXT.md, PLAN.md, EXECUTION.md, 15 reports, phase and fidelity logs), which will not survive a machine change. This doc durably records the repeatable recipe and composes the engine docs that already exist. It does not duplicate them.

## START HERE if you are the fresh executing agent

You were pointed at this doc with a scope (e.g. "run session 1", "port crypto", "Track 2 on Dentists"). Do these five things in order, before any other action:

1. **Load `standard_terms`** (the repo skill) if not already loaded.
2. **Find your scope in appendix R** (kickoff runbooks). If the owner's message matches one, follow that runbook literally; it sequences everything. If no runbook matches, read this doc in full and ask the owner ONE bundled clarifying question before acting.
3. **Check the gate register (§8)**: which decisions are recorded taken. Act only inside your authorised scope; the per-item owner gates in appendix K always stand regardless of scope.
4. **Check the branch tip** (`git log --oneline -5` on the working branch) and the target site's `docs/<site>/STATE.md` date. Other sessions land work between yours; anything dated is a claim to re-derive, not a fact (trap 5).
5. **Know the confusion protocol.** When you hit something unclear, in order: (a) re-read the specific section; this doc resolves most conflicts explicitly; (b) if doc and repo disagree, the repo is right: re-derive, fix the doc in the same session (living-doc contract); (c) if two DOCUMENTS disagree, precedence is: current owner instruction > this doc > `DESIGN_SYSTEM.md` + Property source (visual spec) > engine docs (REWRITE/NETNEW/DISCOVERY) > playbook > SITE_SPINUP > STATE.md/memory (pointers only); (d) **look at what Property does.** Property is the living worked example of every rule in this doc: for any "what should this look like / how should this behave / where does this go" question, open the equivalent Property page, component or config and copy its answer. Most confusion ends here without costing the owner a message; (e) still stuck = ask the owner, **in plain everyday language**. One bundled message, never a drip. Format per item: the situation in one plain sentence (no jargon, no file paths, no acronyms in the question itself), 2 or 3 options in everyday words with what each means in practice, and your recommendation with a one-line why. Write it so someone away from the keyboard can decide in ten seconds. Technical detail goes below a divider for reference, never in the question. Never guess on anything appendix K owner-gates; reversible non-gated items: decide, record, proceed.

**Reading order after that:**
1. This doc, in full (skim appendices you won't touch this session, read the ones you will).
2. `docs/property/DESIGN_SYSTEM.md` §0 (the page contract) in full, before writing any TSX.
3. The track-specific engine doc: `docs/_engines/REWRITE_PROGRAM.md` §9 + `docs/_engines/NETNEW_PROGRAM.md` + `docs/_engines/DISCOVERY_ENGINE_V2.md` (Track 2), or `docs/_engines/SITE_BUILD_PLAYBOOK_2026-07-24.md` + `docs/_engines/SITE_SPINUP.md` (Track 3).
4. `docs/<site>/STATE.md` for the target site (as a claim-map, then re-derive what you use).

---

## 1. The Property precedent: what was actually done, with numbers

The evidence base. Everything in this framework is derived from these two runs, not from theory.

### 1.1 The redesign port (2026-07-16 to 2026-08-23)

- 2026-07-16: 1,070-file Property subtree snapshot pushed to a designer-facing repo (`Property_zip`). Snapshot SHAs recorded on both sides (`1d68a570` monorepo / `8041183` zip). Monorepo stayed canonical throughout.
- 2026-08-21: designer (Tanjiah, Double Wired Creative) returned one squashed commit: 252 files, +33,857/−6,934, 11 design sessions.
- 2026-08-22 morning: both diffs precomputed; overlap quantified (81 overlapping files, 59 real conflicts, 171 clean designer files, 6 pages the designer never saw); 15 read-only investigation reports written (10,225 lines) ending in a 252-row per-file disposition table (PORT 159 / NO-DESIGN-CONTENT 87 / ALREADY-HAVE 5 / CARVE-OUT 1). No file dismissed by category; every path individually opened.
- 2026-08-22 09:41 to 2026-08-23 00:51: the port itself. 9 phases, 94 commits, ~15 hours wall clock, one phase agent at a time, one commit per logical item, a tag per phase, and an independent adversarial fidelity reviewer per phase (verdicts FAITHFUL / FAITHFUL-WITH-GAPS / DILUTED; anything but FAITHFUL went back before tagging).
- 2026-08-23 daytime: three owner review passes on the dev server (0.22a/b/c, 76 files), which produced the binding page contract now at `DESIGN_SYSTEM.md` §0.
- 2026-08-23 20:21 UTC: production cutover, ordinary deploy from a clean worktree at a pushed SHA. Second deploy 20:34 for the header CTA breakpoint fix. Rollback = Vercel instant rollback (production), revert tagged phase range (phase), revert single commit (item).
- Governing owner rule ("Rule Zero"): **take their design**, diverge only on seven enumerated carve-outs: (1) facts vs `house_positions.md`; (2) deliberately deleted surfaces; (3) locked compliance/legal; (4) data-tuned settings; (5) our SEO surface (take their layout, keep our schema/H2s/metadata/crawlable links inside it); (6) build correctness; (7) analytics continuity.
- Estimate vs actual: planned 22.5 to 26.5 agent-days, delivered in ~2 calendar days of serial phase agents. The investigation-before-code ratio was roughly 1:1 with the build and is what made the build fast.

### 1.2 The corpus expansion (2026-08-17 to 2026-08-21, five days)

- Input 1: the niche research corpus (`expansion_research/R1_NICHE_CANDIDATES.md`, 89 niches). Killed niche-site candidates were converted into Property content clusters (farmers to `rural-estates`, estate agents to agents1 + wave12 after the vendor-side demand was found to be the real prize: 45,850/mo brand-stripped vs a 70/mo agent-as-client mirage).
- Input 2: competitor coverage via DataForSEO (`ranked_keywords`, uncapped, paginate to exhaustion) instead of the old DDG method. Measured DDG-vs-Google divergence: 0.83; 93% of the v2 candidate pool was invisible to the old DDG pool.
- Method: the six-step cluster-coverage pipeline (`REWRITE_PROGRAM.md` §9): harvest, cluster by the competitors' own page groupings, screen with reason codes, uniquely assign one cluster to one page, grade by equity (REFRAME / EXTEND / NO-PAGE), execute through the existing QA chain. Dossier freeze, per-page research packs, per-cluster language pass, reconciliation ledger where assigned + already-covered + excluded + deferred must equal the universe.
- Output: 42 net-new blog pages + 5 new pillar routes + 3 new calculators (50 net-new URLs) + ~46 existing-page upgrades, across 9 batches, 4 owner-triggered deploys, 70 `monitored_pages` rows watched to 2026-11-19. Corpus 760 to 783 posts. Test suite 1,166 to 1,532.
- Total DataForSEO spend: ~$2.78. A full per-site discovery run costs ~$1.70 to $2.30.
- The selection rule that replaced "competitors have a URL we do not": an **eligibility gap** requires all four of (1) we are absent (zero impressions GSC 90d AND Bing 91d), (2) a specialist peer already ranks top-20, (3) demand 100 to 5,000/mo per keyword, (4) no existing page already owns the subject (else EXTEND). Page spec for coverage pages: 800 to 1,200 words, question-shaped H2s with the number in the first sentence, one current tax year leading, statute density low in the opening half. The old length floor is withdrawn.
- Kill switch built in: one cohort of 12 to 15 pages per cluster first; success = cohort median >200 impressions at 90d; kill = median <100, programme stops rather than scales.

---

## 2. The estate map

18 site directories, uniform stack (Next.js ^15.5.14, React 19, Tailwind v4, App Router), four design families. Full inventory and per-site state: `docs/<site>/STATE.md`. Summary that drives sequencing:

| Site | Posts | Design family | Live? | Notes for this programme |
|---|---|---|---|---|
| Property | 783 | A (new standard) | LIVE | The reference. Branch `design/property-redesign-port`, not yet merged to main. |
| generalist | 418 | C (bespoke, deliberate) | LIVE | Excluded from Track 1 by default (memory `generalist_design_system`: not a sibling). Track 2 applies. |
| digital-agency | 306 | B (old template) | LIVE | Diagnosed crawl/authority starvation, 0 leads all-time. Design is not its bottleneck; port late. |
| Dentists | 223 | B | LIVE | |
| Solicitors | 196 | B | LIVE | Worst funnel in estate (977 engaged sessions to 1 lead): highest conversion upside from Track 1. |
| wills-probate | 146 | B | HELD at G1 | Port BEFORE launch: no cutover risk, no traffic to disturb. |
| construction-cis | 82 | B | LIVE | Healthy; good family-B pilot candidate. |
| Medical | 79 | B | LIVE | FLAT blog routing (`/blog/[slug]`); slug tooling exceptions apply. |
| contractors-ir35 | 62 | B | LIVE | |
| divorce-finances | 45 | B | HELD at G1 | Port before launch, same as wills-probate. |
| startups-tech, charities, pharmacies, care, crypto, hospitality, ecommerce | 14-32 | D (minimal wave-2) | LIVE | 7-11 components each, 7-23 line globals.css. Nothing to port, everything to gain; cheapest targets. |
| ashfield | 0 | E (owner-locked editorial) | BUILT, not deployed | Excluded from Track 1. |

Design families: A = new Property standard. B = the old shared "Digital Agency template" (per-site copies of PageShell/SiteHeader/SiteFooter, 290-520 line globals.css). C = generalist bespoke (off-white/ink/orange, Geist). D = wave-2 minimal (system fonts, token block only). E = ashfield (Fraunces + Inter, locked).

The estate's MACHINERY is genuinely shared and deep (verified 2026-08-24: 80 files in Dentists alone import `@accounting-network/web-shared`; forms, lead pipeline, analytics, nurture, tools, config loading and content utilities are one codebase across all sites, brought to full parity by the 2026-08-19 estate lead parity port). What is NOT shared is the VISUAL layer: every site carries its own local PageShell/SiteHeader/SiteFooter and design CSS that consume the shared logic, and there is no shared theme mechanism beyond the CSS-variable contract (`--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`, plus surface/ink/border tokens) that web-shared components read. Brand colour is duplicated in `niche.config.json → brand.primary_color` and `globals.css`. The Property design currently has no extraction point: it lives in `Property/web/src/app/globals.css` (832 lines) + 117 components. §3's extraction closes exactly this gap: it gives the visual layer the same shared home the machinery already has.

---

## 3. Architecture decision: extract once, port sixteen times

**Recommendation: extract the Property visual core into `packages/web-shared` (additive, opt-in), then port sites onto the shared core. Do not hand-copy 117 components into 16 site trees.**

Why: 16 per-site copies of the new design is the same drift machine that produced family B (8 slowly diverging copies of one template). The estate already has the delivery mechanism (workspace package, CSS-var brand bridge, `--btn-radius`-style opt-in tokens, both proven during the port when two web-shared changes shipped opt-in with old behaviour as default and 17 sites unaffected).

What gets extracted (the site-agnostic layer only):

- `layout-utils.ts` (containers, section rhythm, button recipes) with the emerald literals replaced by the existing `--brand-*` vars. Property pins its values; siblings pin theirs.
- `page-blocks.tsx` (Prose, Eyebrow, InlineLink, CardStack), `EyebrowRule`, `ExampleFigureNote`, `FaqSection` + accordion, `Breadcrumb`, `SlimHero`, `NoticeCard`, `NumberedPagination`.
- The marketing set that is niche-agnostic by construction: `TopicSection`/`TopicHero`, `LeadCTAPanel`, `CoverageCards`, `ComparisonTable`, `ProcessTimeline`, `DrawnTickList`, `StatsCounter`, `PromptMarquee`, `ScrollGlowGroup`, `WhatToExpectCard`, `StickyCTA`, `RelatedArticles`, `HubArticleList`, `TableOfContents`, `BlogSidebarCta`, `ReadingProgress`.
- The globals.css blocks that are design, not brand: the `@theme` radius set (`--radius: 0rem`, `--radius-xl` = 4px, `--btn-radius`), the layered/unlayered heading split (see §7 trap 1), the motion keyframes and their `prefers-reduced-motion` gates, `.related-card` glow, `.eyebrow-rule`, `.tick-draw`.

What stays per-site: brand tokens (§4.3), wordmark component, hero motif, `niche.config.json`, page TSX, figures files, calculators, content.

Rules of the extraction:

1. **Additive only.** New export paths; no existing web-shared export changes behaviour. Property keeps its local copies until it opts in, in its own later commit. This keeps the extraction inside the standing "web-shared changes must be strictly additive" STOP condition.
2. **Pilot on one family-D site before any family-B port.** Family D has almost nothing to break.
3. Every extracted component keeps its Property behaviour byte-for-byte under Property's token values. Verify with `getComputedStyle` on the pilot, not by eye (see §7).
4. The guard tests travel with the components: `calculator-tabs-crawl-path`, `hub-article-crawl-path`, `nav-active-state`, `first-sentence` get site-parameterised equivalents in each ported site's `src/tests/`.

Fallback if the owner rejects extraction: per-site copies are acceptable for the 7 family-D sites only (small surface), and family-B ports then each become a mini design-port project at roughly 3 to 5x the cost. State this trade-off once and take the decision; do not build both.

**Branch prerequisite (hard, before any extraction or port).** The Property standard currently exists only on the unmerged branch `design/property-redesign-port` (main's Property is the OLD design). Step zero of the whole programme is merging that branch to main (owner decision §8.10); every extraction commit and every sibling port branches from main AFTER that merge. Extracting from an unmerged branch, or porting a sibling against a main that lacks the standard, is forbidden: web-shared is shared by 18 sites and a half-merged source of truth poisons all of them.

**Live-site serving rule (every sibling port).** Vercel auto-deploy is OFF estate-wide, so commits are safe: production keeps serving the old design throughout the port. One branch per site port; no production deploy mid-port; a single owner-triggered cutover deploy at the end, exactly the Property shape. Before the port branch is cut, check for committed-but-undeployed changes to that site (pending shared fixes ride the next deploy, e.g. the estate dedupe change): either deploy them first as their own owner-approved release, or name them in the cutover annotation so the before/after read does not attribute their effects to the redesign.

**Programme artifact home (every port).** Phase logs, measurements files, fidelity logs, disposition lists and the link-floor baseline JSON live in `docs/<site>/_port/` IN THE REPO: small text files, durable across sessions and machines, reviewable by the appendix M reviewer. Never the session scratchpad (deleted), never `tmp/` (gitignored, machine-fragile; the Property port's own record is stranded there, which is why this doc exists). The verification instruments themselves get ONE committed reference implementation at `docs/_engines/instruments/` at programme start, built once from appendix N and reused by every port and every reviewer, so two reviewers never build two different instruments. They are still never scheduled, never wired to CI, and never pointed at production.

---

## 4. TRACK 1: the design parity port (per existing site)

### 4.1 The binding spec

`docs/property/DESIGN_SYSTEM.md` §0 (the ten-part page contract) is the estate page contract, verbatim, for every ported site. Do not fork it per site. Each ported site gets exactly one new design doc, `docs/<site>/DESIGN_DELTA.md`, recording ONLY: its brand token values, its wordmark/motif, and any sanctioned deviations with the owner decision that sanctioned them. An empty delta section means "Property standard, no exceptions". The §0 checklist is re-run per page; a page that fails any item is not done.

The non-negotiable floor, restated because every one of these is incident-backed:

- `siteContainerLg` (max-w-6xl) is the page measure; zero body clamps (`max-w-2xl/3xl/4xl/5xl` wrappers) anywhere; narrow measure only on hero copy and section-head blocks above full-width grids.
- Section rhythm `py-12 sm:py-16 lg:py-20`; grounds oscillate white/slate-50 set explicitly per section; navy never touches navy; card ground opposes its section's.
- One radius: `rounded-xl` (4px via the token chain) + `ring-1 ring-slate-200/70`. `rounded-2xl` + `border` is the old design and is a defect.
- Every section carries a visual; figures derive from a single source constant, never typed twice; `ExampleFigureNote` on every figure-bearing visual (exception: StatsCounter); colour is meaning (relief/duty-bites/no-relief/neutral).
- On-page calculators are `CalculatorTabs` with an explicit tabs list, never link cards, plus one literal `<a href="/calculators/...">` per page because tabs emit no crawlable link.
- Funnel order hook, problem, proof, scope, ask; hero primary CTA goes to `#book` (on-page form); only header CTA and sticky banner leave for `/contact`; closing ask is `LeadCTAPanel`; `FaqSection` paired with `buildFaqPageJsonLd` on the same array; every CTA keeps its `data-cta`/`data-cta-placement`/`data-cta-goal`.
- Never delete a crawlable internal link for layout; paginate by hiding, never slicing.
- Contrast 4.5:1 for all text including 11px fine print; slate-500 never slate-4 00 on light; `DrawnTickList` needs `tickClassName="text-emerald-600"`-equivalent on light; touch targets 44px, 48px primary; motion behind `prefers-reduced-motion`; hover glows behind `@media (hover: hover)`.
- Responsive contract §0.8 verbatim, including: burger owns below `lg:`, CTA in the drawer foot; a sibling must not appear at the same breakpoint a neighbour's width cap changes; no horizontal page scroll at any width; `scroll-mt-24` on every anchor target; check at 390 / 768 / 1024 / 1440.
- No em-dashes in copy; no client/served claims (nothing evidencable exists); testimonials anonymised; `LeadForm` always on a white or light surface; reassurance copy beside any capture field checked against the site's privacy policy, every time.

### 4.2 Page templates to deliver per site

The template anatomy is specified in `DESIGN_SYSTEM.md` §4 and extracted in detail in the Property component/template survey. Minimum set per ported site:

1. Homepage (navy brick hero, stats strip, problem statement, marketing sections, services grid, calculator tabs section, testimonials, insights list, `#book` closing block with LeadForm, FAQ).
2. Topic/service pillar template (TopicHero cream + N TopicSections + interleaved CalculatorTabs + `#book` LeadCTAPanel + FaqSection).
3. Blog post template (BlogPostRenderer anatomy: header card, sidebar with BlogSidebarCta + sticky TOC, tiered mid-article capture, `#enquiry-form` navy panel, FAQ, RelatedArticles).
4. Blog category hub template (cream hero, essentials briefing, article library paginated at 12 by hiding, LeadCTAPanel, other-topics band).
5. Calculator page template (navy hero, CalculatorClient on slate-50, full-container explainer, RelatedArticles, `#get-expert-help` LeadCTAPanel with `redirectOnSuccess={false}`, FAQ) + calculators index (headline tabs + directory).
6. Contact funnel (navy hero, `#book` form section with WhatToExpectCard, then the three marketing bands).
7. Post-submit set (`/thank-you`, `/book`, `/complete`): SlimHero, ask-left/reassurance-right grid, noindex, the four deliberate departures from the standard skeleton (no LeadCTAPanel, no breadcrumb, shallow hero, no tick badge).
8. Header/footer per the §7a breakpoint table; footer columns derived from nav data, never hand-listed.

Do NOT port: the dead components (`ServiceIconGrid`, `StatsBar`, `ROIMetrics`, `ProblemSolutionSplit`, `CalculatorPreviewGrid`, `TestimonialSlider`, `ServiceTiers` local copy, `BrandLogoHero`, `PageResultCta`), which have zero consumers IN PROPERTY and reference deleted CSS. CAUTION, scope of "dead": this list is about Property's local files, not the shared `web-shared/ServiceTiers`, which IS live on family-D `/services` pages (verified: crypto renders it). §4.6.2 governs: derive the consumer graph on the target site before deleting anything by name. Port `CalculatorLinkCards` only together with the crawl-path guard test that names it.

### 4.3 The brand layer (the ONLY sanctioned variation)

Seven swap points, everything else carries over unchanged:

1. `globals.css` brand ramps and semantic vars (Property: emerald/slate/amber). Pick the sibling's primary ramp + neutral ramp + warning ramp; keep `--radius: 0rem` and `--btn-radius: var(--radius-xl)`.
2. Font: Property uses Plus Jakarta Sans 400-800 via next/font. Siblings keep it unless the owner assigns another; the `@theme --font-sans` wiring stays.
3. Button constants: primary/secondary/onDark/onCream recipes keep their box model (min-h-12, min-w-[10rem], px-8 py-3.5, rounded-xl); only the colour tokens change.
4. `niche.config.json`: brand colour, theme colour, display name, navigation, footer links, role options, CTA variants, source identifier (already per-site).
5. Wordmark: the two-line stacked pattern (icon + tracked-out name / rule / descriptor) with a niche icon replacing the lucide `Home`, and the `max-w` cap behaviour preserved exactly (it interacts with the header contract).
6. Hero/footer backdrop motif: Property's brick SVG pattern swaps for a niche-appropriate texture at the same opacity/mask recipe (55% width, hidden below sm, masked to transparent).
7. Accent colour semantics re-derived: whatever the primary is, the money-semantics trio (relief / duty-bites / no-relief) must still hit the §0.7 contrast floors on both light and navy grounds. Measure, do not assume: Property's own emerald-400 tick fails on white (1.9:1) and its amber-600 fails on white (3.19:1). Every ramp choice gets the same treatment.

Record all seven values in `docs/<site>/DESIGN_DELTA.md` before the first component is written.

### 4.4 The port process per site (the recipe, from the Property run)

Phased, serial, gated. For a sibling this is much smaller than Property (no designer diff to reconcile), but the shape is identical:

- **Phase 0, investigate before code.** Inventory the site's current pages, components, crawlable-link counts per page (the link floor: unique outbound internal links per page must be >= current live count, binding), conversion surfaces and their `data-cta` ids, armed `monitored_pages` windows and deploy-watch baselines (pull from the DB, so cutover-time `data-cta`/form_id churn gets its baselines restated instead of firing owner-facing alarms), and any site-specific carve-outs (analytics continuity, experiment registries, live embeds). Write the per-page disposition list into `docs/<site>/_port/`. Nothing is dismissed by category. **Treat the site's own STATE.md as a claim, not a fact**: construction-cis's was two months stale with wrong post and calculator counts and a consent-model description its code contradicts; Phase 0 re-measures every number it uses and updates STATE.md first.
- **Phase 1, foundation.** Tokens, globals.css, layout primitives, brand layer. Verify heading rendering with `getComputedStyle`, never screenshots (§7 trap 1).
- **Phase 2, chrome.** Header/footer/wordmark to the §7a contract.
- **Phase 3+, subsystems then pages.** Blog subsystem, calculators, secondary pages, pillars, post-submit set. One commit per logical item, tag per phase.
- **Per phase: independent adversarial fidelity review** by an agent that did not build it. The question is "did we deliver the standard", checked in the rendered DOM, hunting silent substitution (a builder quietly reusing the old site pattern is the most common failure and never shows in a diff review). Verdict FAITHFUL or it goes back.
- **Measurement discipline:** every number is appended to a per-phase measurements file at the moment it is taken, with the command that produced it; phase logs may only quote that file; assert only what you verified in your own scope, everything else is marked UNVERIFIED (§7 trap 2).
- **Owner review pass on the dev server before cutover.** Budget for it; on Property it produced three passes, 76 files and most of §0. New standing rules from the pass go into `DESIGN_SYSTEM.md` (if estate-wide) or `DESIGN_DELTA.md` (if site-specific) in the same session.
- **Cutover:** ordinary owner-triggered production deploy from a clean worktree at a pushed SHA (`vercel_cli_deploy_workflow` memory; `.vercelignore` re-includes untracked files, so never deploy the working tree). `check_dependency_closure.py` + `predeploy_gate.py` first. Rollback tiers: Vercel instant rollback / revert phase tag range / revert single commit.

### 4.5 Gates (per site, measured, not vibes)

Tier 1 every commit: `tsc --noEmit` 0 errors, eslint on touched files, vitest green, em-dash grep.
Tier 2 every phase: full eslint, `next build` exit 0 with the page count recorded, `check_dependency_closure.py` (all 19 sites), `predeploy_gate.py --site <site>`, a route sweep (every URL 200, dead-link count 0, `data-cta` count vs baseline), and a browser check (horizontal overflow 0 at 390px, computed contrast vs the floors). Property's bespoke `sweep.mjs`/`browser_check.mjs` live in gitignored tmp by design; rebuild per programme in the session scratchpad, never schedule them, never point them at production. Run browser checks against `next start`, never `next dev` (false CSP reds). Baselines are captured before the first port commit; re-baselining requires a written reason in the phase log.

Definition of done per site: every §0 checklist item passes on every template; guard tests present and green; link floor held on every page; fidelity review FAITHFUL; `docs/<site>/STATE.md` updated in place; owner walked it on the dev server; deploy is a separate owner decision.

Link-floor authority: the baseline is captured from `next start` at the SHA currently deployed to production (deterministic, matches what users see), written to `docs/<site>/_port/link_baseline.json` before the first port commit.

### 4.6 The sibling-divergence protocol (what to do when the target site differs from Property)

Every sibling differs from Property somewhere. The standard governs DESIGN; it never licenses deleting a sibling's content, data or SEO surface. Rules, in precedence order:

1. **Sibling content features are carve-outs, ported INTO the new components, never dropped.** The mirror of the Property port's Rule Zero: take the standard's design, keep the sibling's payload. Concrete class: renderer-level frontmatter features Property lacks (construction-cis `keyTakeaways[]` boxes, `imageCredit` attribution lines, any site's extra frontmatter) get rendered by the ported renderer with equivalent styling. Dropping one is a fidelity failure the appendix M reviewer must check for explicitly, because no gate catches it (it is not a link).
2. **Dispositions attach to a file's ROLE, not its name, and the role is derived, never assumed.** Appendix D's "ExitIntentModal: deleted, do not rebuild" refers to Property's exit-intent OFFER surface. This rule's own history is the proof: round-1 testing claimed construction-cis's same-named file was "the modal shell used by DeepScrollModal and SpecialistWidget" and this doc printed it; round-2 re-derivation showed that was FALSE: `construction-cis/.../blog/ExitIntentModal.tsx` is a complete exit-intent capture surface with ZERO importers (the other components reference it only via sessionStorage keys, and nothing mounts it), i.e. dead code whose correct disposition is DELETE. A comment inside SpecialistWidget saying "Do NOT edit ExitIntentModal" reinforces the wrong reading. Phase 0 derives each file's role from its imports and mount points (grep the name, read the importers), records the deriving command, and only then assigns the disposition.
3. **Where a sibling is AHEAD of Property on the extraction path, keep the sibling's shape.** Sites already consuming `web-shared/tools` (construction-cis, crypto and all family D) keep that consumption; appendix G's per-site file layout is Property's pre-extraction legacy, and shared consumption is the target state. Existing calculator fleets are kept as-is; the derive-from-data rule governs NEW tools only.
4. **Never break a live URL for aesthetics.** Existing pillar routes keep their paths (crypto's `/for/[slug]`, construction-cis `/for/[type]`, glossaries, template pages). New pillars follow the root-level convention. A page type with no F-series template gets its anatomy written into the site's Phase 0 disposition list from the closest F template plus the §0 checklist, and the fidelity reviewer reviews against that recorded anatomy.
5. **Fonts are brand, and live brands need owner sign-off.** Default: the site KEEPS its current typeface (construction-cis: Geist Sans + Geist Mono). Switching a live site to Plus Jakarta is an appendix K owner gate, proposed in the DESIGN_DELTA. Sites keeping a mono font keep it wired to `font-mono` (the stat/result styles depend on it); sites without one name their mono substitute in the delta.
6. **The capture-surface set is owner-scoped per site.** Porting Property's interruptive set (SpecialistWidget, DeepScrollModal, StickyCTA, ReturningBar) to a site that lacks them is ADDING interruptive surfaces, which the standing rule forbids without asking. The DESIGN_DELTA lists exactly which capture surfaces the port adds, and the owner's swatch sign-off turn (K) approves that list explicitly. Site-specific surfaces with no appendix D row (e.g. intent-engine offer components) get an explicit KEEP-AND-RESTYLE / KILL disposition in Phase 0, KILL only with an owner decision.
7. **Consent model: the estate standard IS the Property-parity notice model.** Verified 2026-08-24 by grep: all 17 site LeadForms carry the identical legitimate-interests block (`consent_given: true` with the rationale in a code comment: submitting the form is the affirmative act, `consent_text` is the audit trail) and import shared capture logic from `web-shared/leads/`; this is the estate lead parity port the owner deployed 2026-08-19. It SUPERSEDES the playbook's mandatory-checkbox ground rule and SITE_SPINUP's checkbox STOP condition, both written before the parity port. Ports keep the parity form as-is; new sites use it too. Any doc (STATE.md included) describing a checkbox model is stale, fix the doc.
8. **Category-keyed maps are per-site data.** The blog CTA-copy map, category hubs, page-summaries and nav groups are authored fresh for the site's own categories (keyed on category SLUG), as port work items, not copied from Property.
9. **Dual config sources reconcile to the niche loader.** Sites reading a local `siteConfig` alongside `niche.config.json` converge on the loader during the port; one source of truth per value.
10. **Sites with flat or grouped-less navigation get their IA authored in Phase 2.** The B/C contracts assume grouped nav + a registry-built calculators group. A flat-nav site's port includes authoring `navigation[]` groups in `niche.config.json` and wiring the nav builder; that is design-port work, listed in the phase plan, not an improvisation. Flat navs are NOT only a family-D trait (construction-cis, family B, is flat: 7 items, no children); price the IA work per site from its actual config, not its family.
11. **Template coverage on a real family-B site is ~half, not most.** Census on construction-cis: of 31 public route files, ~14 map directly to F/G templates; the other ~17 route groups (about, archive index, glossary, locations, research data-asset pages, resource topics, downloadable-template pages, legal) ride the §4.6.4 recorded-anatomy fallback. Two of these get explicit rules: LOCATIONS pages follow Property's locations template (navy hero, white body, RelatedArticles, `#book` LeadCTAPanel; H names it, treat as an F template); RESEARCH data-asset pages keep their data and chart components, and their charts re-ramp via the site's `--chart-1..5` tokens + the 0b primary mechanism, never by hand-recolouring SVGs. Budget accordingly: mid family-B is 2-4 agent-days, not 1-2.
12. **`vercel.json` is out of port scope.** Sibling `vercel.json` files carry live crons (lead-nurture schedules, owner-facing machinery). The port never edits them; if a port genuinely needs a vercel.json change it is its own owner-approved item.
13. **Dual-config reconciliation names its gate:** sites with a local `siteConfig` consumed by tests (construction-cis: `tests/lead-payload.test.ts`) list those tests in the phase plan as explicit gates of the §4.6.9 reconciliation, so the invariant break is caught by design, not discovered.

### 4.7 Execution derivation commands (the facts §4 depends on, each with its command; trap-5 compliant)

| Fact needed | Deriving command | Notes |
|---|---|---|
| SHA currently deployed to production (link-floor baseline authority) | `vercel inspect <production-url>` with the project's env IDs, token in root `.env`; read the deployment's git metadata. Fallback if CLI worktree deploys carry no git metadata: use the deploy log/memory SHA and record it in `link_baseline.json` as `sha_source: "deploy-log, unverified"` | `link_baseline.json` MUST embed `{sha, sha_deriving_command}`; a baseline without them is invalid |
| Vercel auto-deploy posture for this project (premise of the mid-port commit cadence) | Vercel project API read (`gitProviderOptions`/connected-repo settings) with the token; one call, before the first mid-port commit | Never assume from "estate-wide" statements; record the response in the phase log |
| Armed `monitored_pages` windows for the site | `select page_slug, rewrite_type, rewrite_date, monitor_until from monitored_pages where site_key='<site>' and status='active' and monitor_until >= current_date order by monitor_until;` via the Supabase management API (`scripts/_q.py`) | Run at Phase 0 / Stage 0 AND before any Stage 2 batch; armed pages are excluded from sweeps |
| `sites` registry row completeness (GSC pulls read the DB, not the client map) | `select site_key, gsc_property_url, bing_property_url, active from sites where site_key='<site>';` | `gsc_query_client` resolves `sites.gsc_property_url` and hard-raises if empty; the client-file `_SITE_URL_MAP` is a separate, second config. Check BOTH |
| Indexation state (Stage 0 diagnosis) | `python -m optimisation_engine.snapshot.index_coverage` (site-keyed) + GSC URL-inspection sampling | The agency/medical class of failure |
| Committed-but-undeployed changes riding the next deploy | `git log <deployed-sha>..main --oneline -- '<Site>/'` | Feeds the §3 live-serving rule's cutover annotation |

---

## 5. TRACK 2: optimisation + corpus expansion (per existing site)

The engine docs are the spec; this section fixes the per-site running order and the estate-level constants. Method detail: `REWRITE_PROGRAM.md` (§9 for cluster coverage), `NETNEW_PROGRAM.md`, `DISCOVERY_ENGINE_V2.md`, `docs/_engines/AI_SEARCH_GEO_PROGRAM.md`, `docs/_engines/SERP_META_PROGRAM.md`, memory `corepage_engine` / `holistic_meta_strategy`.

**A fact that shapes everything in this track: most sibling sites have NEVER had an optimisation pass.** Property received the full stack over 2026-05 to 2026-08 (Track 1/2 rewrites, corepage, SERP meta, GEO, humanise, cannibalisation protection, behaviour analytics, commercial capture, the structure-vs-competitors diagnosis). generalist received its parity programme (GEO backfill on all posts + 281 factual corrections). Everything else got at most the May 2026 9-step structural parity pass (accordion/schema/robots/llms-full/IndexNow) and scattered fix waves (agency indexation, medical discovery, dentists/solicitors corepage rewrites still undeployed). For those sites Track 2 is therefore optimise-then-expand, not expand alone, and the optimisation baseline below is mandatory before wave spend.

### 5.0 The canonical per-site pipeline (the sequence, for every existing site)

```
STAGE 0  DIAGNOSE      fresh GSC + Bing pull (never stored snapshots), indexation check
                       (is Google even crawling it: coverage counts, sample URL inspection),
                       structure-vs-competitors mini-diagnosis, discovery run (5.1 steps 1-2),
                       conversion funnel read. Output: docs/<site>/STATE.md diagnosis section
                       naming the binding constraint (eligibility / indexation / conversion /
                       corpus). ~1 session + ~$2.30.
STAGE 1  PORT          Track 1 design port (§4). Template level. Includes the structural-floor
                       verification (robots allowlist, llms-full.txt, feeds, OG, schema,
                       sitemap lastmod stability, security headers: verify present, most
                       shipped in the 2026 standardisation phases).
STAGE 2  OPTIMISE      the optimisation baseline (5.0a) on the EXISTING corpus.
STAGE 3  EXPAND        cluster coverage + net-new waves (5.1 steps 3-8), cohort-gated.
STAGE 4  READ + ITERATE  Bing 14/28d, Google 28/90d, cohort scale-or-kill, next cluster.
```

Ordering rules: Stage 1 before Stage 2/3 is the DEFAULT because the port re-baselines every monitored window anyway (do it once, then measure content changes on the new design) and because rewritten content should land in the new templates, not be touched twice. Two sanctioned exceptions:

- **Indexation-first:** if Stage 0 diagnoses broken indexation (the agency and medical pattern), remediation runs before port or content; content spend on an uncrawled site is waste.
- **Track-2-first (owner authorises Track 2 on a site whose port has not happened):** legitimate and expected while ports queue behind the pilots. Rules: content work (.md files, meta, registrations) branches from MAIN; it accepts that the later port will re-baseline its windows (say so in each batch's expectation notes); Stage 2 sweeps still exclude armed windows (§4.7 SQL); and the run's FIRST step is reconciling stranded content commits for that site: `git log main..design/property-redesign-port --oneline -- '<Site>/'` (plus any other live branches). Known stranded passengers, verified 2026-08-24: Dentists homepage corepage rewrite `d3e705dd` and Solicitors `/services` corepage rewrite `b8ae2269`, both on the port branch and NOT in main. A Track-2-first agent that ignores them will contradict or redo committed work.

Stages for different sites may interleave (§9); within one site, Stage 2/3 never run in the same measurement window as the port without pairing the changes in the cutover annotation.

**Data reality (verified 2026-08-24 via GSC `sites.list` + Bing `GetUserSites` note in the client): every live site, wave-2 included, has BOTH a GSC domain property (siteOwner) and a Bing property with its real domain.** Per-site STATE.md files listing "GSC property" as a remaining external are stale; the true historical gap was `gsc_page_client._SITE_URL_MAP` carrying placeholder/missing wave-2 entries, fixed 2026-08-24. Stage 0 for a wave-2 site therefore starts with a normal fresh pull; if it returns nothing, the first suspect is engine config or ingestion history, never "no property".

**The young-data variant (applies while a site has under ~90 days of accumulated GSC/Bing history, or an ingestion backlog).** Wave-2 sites went live 2026-07-16, so their query history is thin. Until ~90 days of data exists: competitor universe leans on the site's niche-screener research export + live SERP checks alongside whatever GSC heads exist; eligibility rule 1 (we-are-absent) is checked against what data there is and recorded with its window; equity grading and the ROI worklist run only over pages old enough to have earned data (the freshness rule: a young page ranking nowhere is immature, not a gap); expansion proceeds as net-new waves gated on cannibalisation; `monitored_pages` rows register with whatever baselines exist and cohorts read on schedule. Stage 2 items 2-5 run, but their query-data inputs are labelled with the data-through window in every artefact.

**Family D is a BUILD, not a port.** These sites have 7-11 components, some no header at all, flat 7-item navs, no capture surfaces beyond the basic form set. Track 1 for them means standing up the full template system (F.1-F.7), authoring nav IA, marketing copy (marquee prompts, stats, coverage cards), page summaries and hubs from scratch on the shared core. Estimate 2-4 agent-days each, not the "fraction of a day" a true re-skin would be; the pilot exists to replace that estimate with a measurement.

### 5.0a The optimisation baseline (Stage 2, per site)

What Property and generalist got, replayed in a fixed order on the existing corpus. Each item names its engine; all content passes are Opus, reasoning-first, never scripted bulk edits.

1. **house_positions.md currency pass.** Create or re-verify the site's ground-truth doc against primary sources + the ground-truth memory set (FA 2026 figures moved 4 times between writing and verification in the wills build; assume drift). This gates everything below.
2. **Corepage pass.** `python -m optimisation_engine.corepage --site <site> --page homepage` (then `/services` etc): analysis pack, then an Opus rewrite of meta + structure + copy of the core commercial pages. CORE_PAGES entries exist for property/generalist/solicitors/dentists and are mostly homepage-only; every other site (and every non-homepage page) needs its entry authored first, which is part of this item, not a surprise. Dentists and Solicitors already have corepage rewrites COMMITTED but NOT DEPLOYED (`d3e705dd`, `b8ae2269`), and both sit on the PORT BRANCH, not main (verified via merge-base 2026-08-24): reconcile per the §5.0 Track-2-first rules before writing anything new, do not overwrite or redo them blind.
3. **SERP meta pass.** Per-site `seo_persona` + intent-driven metaTitle/metaDescription formulas (memory `holistic_meta_strategy`, `SERP_META_PROGRAM.md`), every title written by an LLM reading that page with fresh query data. Never templated.
4. **Equity-graded legacy sweep.** Grade the existing corpus with the REFRAME / EXTEND / NO-PAGE table (`REWRITE_PROGRAM.md` §9.2, the equity-grading step; not §9.5, which is the research pack). Rule for which treatment: any site with ≥90 days of GSC data runs the ROI ranking (near-page-1 Bing + weak Google first); young-data sites default REFRAME-heavy. **Armed windows are excluded from the sweep, every time** (§4.7 SQL; e.g. Dentists has 53 of 223 pages frozen to Sep-Oct 2026, verified in DB 2026-08-24): rewriting a page mid-window destroys its read. Full-overhaul rules apply (§4 quality bar: dominant-query H1, comparison tables, worked examples, FAQ, current facts).

**Runnability warning for items 2-4 (verified 2026-08-24, do not discover this mid-run):** `optimisation_engine/corepage/config.py` CORE_PAGES has entries for property/generalist/solicitors/dentists ONLY; every other site needs its entry authored before item 2 runs. `scripts/track2_worklist.py` is not a parameterisation job but a REBUILD for any other site: beyond the hardcoded universe file, blog dir and `site_key='property'` SQL, it embeds Property's DONE-slug lists and Property's cluster regex taxonomy, and a sibling has neither a residual-universe doc nor a cluster taxonomy until Stage 2 authors them (a day+, not the half-day flag pass). The rest of the QA chain IS site-parameterised (verified for dentists at file level: `pull_page_data --site`, `qa_verdict`, `predeploy_gate`, `track2_link_audit --site`, `frontmatter_lint`, `word_count_gate --site`, `register_monitored_batch --site`). Latent gate conflict to carry: `word_count_gate.py` defaults min-cluster 1200 words while the §1.2 coverage-page spec is 800-1,200; harmless while the gate is opt-in, but any batch opting in passes an explicit per-batch minimum. `seo_persona` exists per site in `optimisation_engine/blog_generator/site_configs/`. Record whatever gets generalised in this doc, fix the class.
5. **GEO backfill.** The generalist waves 0-3b pattern: workedExamples, BLUF answer blocks, citation-ready structure across the corpus. The actual method record is `docs/generalist/PARITY_PROGRAMME_HANDOVER.md` + `docs/generalist/wave3_geo_2026-06-30.md` (per-site historical record; lift the recipe from there). `AI_SEARCH_GEO_PROGRAM.md` is background only: its June full-auto deploy grant is EXPIRED (superseded note added 2026-08-24; appendix K deploy gates govern), and its per-site data claims are June-stale. Bing + ChatGPT out-convert Google on Property; AI-surface readiness is a conversion lever, not garnish.
6. **Internal-link hygiene.** Hub-and-spoke wiring to the site's pillars (hygiene, not a proven ranking lever: §5.3), honouring any armed monitored windows.
7. **Conversion instrumentation check.** Analytics SDK live, `data-cta` coverage, funnel events, lead-form invariants (D.1, including the invisible-label check: the navy-ground LeadForm bug is KNOWN LIVE on generalist and digital-agency), no interruptive-surface additions.
8. **Register + measure.** Changed pages into `monitored_pages` with dual baselines; one change class per page per window.

### 5.1 Per-site running order (discovery + expansion detail)

1. **Universe.** `python scripts/derive_competitor_universe.py --site <site> --top-queries 20 --keep 15` writes the curated competitor list into `sites/<site>.discovery.json` (it merges ONLY the `competitors` key; the rest of the file is authored by hand). Sites without a discovery.json need one authored; sites WITH one almost all carry the legacy schema (only `property.discovery.json` is the v2 worked example with `lanes`/`lane_negative_tokens`; `candidate_pool.py` silently skips the lane gate when those keys are absent). The lane taxonomy is per-niche judgment work: an Opus pass over the site's pillar set + GSC heads, then owner-skim (an appendix K touchpoint, batched with other asks, not its own interruption).
2. **Pool.** `python -m optimisation_engine.discovery.candidate_pool <site>` dry-run first, then `--spend --commit`. Budget ~$2.30/site full run. Guard: `DATAFORSEO_ABORT_AT` ($5/day default). Note the account balance was ~$4.78 at 2026-08-21; an estate sweep needs a top-up first (owner decision, §8).
3. **Cluster dossiers.** For each priority cluster, the six steps (§9.2): uncapped harvest (no volume floor, no row cap, paginate to exhaustion; the union of competitor ranked keywords + our GSC 90d + our Bing 91d, both engines mandatory), consensus map by competitor page groupings, screen with reason codes, unique assignment, equity grading (REFRAME / EXTEND / NO-PAGE, Bing graded first and more conservatively), reconciliation ledger that must balance. Dossier freeze; late finds go to a named delta list.
4. **Selection by eligibility gap** (all four rules, §1.2 above), prioritised by peer-winnable volume, never raw volume. Check frozen ground first: if the cluster's peer-winnable volume routes mostly to pages inside an armed `monitored_pages` window, the cluster defers (Property Phase D precedent: threshold ~2,000/mo unfrozen).
5. **Packs and language pass.** One research pack per target page (8 sections, permission level first, equity register from both engines, market keyword set, full competitor teardown, whitespace, deterministic acceptance criteria, stated expectation). One language pass per cluster before any page is written, producing a measured answer-pattern spec that editorial QA checks against.
6. **Write.** Batch size 1, one Opus writer per page, parallel. Cluster batches ~10-13 pages. Every writer prompt carries the autonomy clause and the competitor-URL verification clause (both mandatory, both incident-backed, `NETNEW_PROGRAM.md`). Wave-machinery caveats, verified 2026-08-24: every `sites/<site>.json` `paths.topicPool` points at `docs/<site>/topic_gaps_final.md`, which does not exist for ANY site (Property included); the site's topic-pool doc is authored at that configured path as the first Stage 3 artefact, from the discovery outputs. `.claude/commands/run-wave.md` is Property-hardcoded (flag paths, `-Site property`); the first non-Property wave generalises it, fix the class.
7. **QA.** Two-track Opus QA (adversarial factual vs `house_positions.md` + editorial vs the language spec), cross-writer batched, plus the deterministic floors: query coverage, arithmetic recompute, statute verification at source, link resolution, equity preservation (every pre-rewrite query still matches or it is a named BLOCK), cluster coverage, ledger balance, competitor re-read with zero undecided themes. `qa_verdict record` written last; sha256-keyed; `predeploy_gate.py --qa-batch` must pass.
8. **Ship (owner-triggered).** Deploy from clean worktree, `register_monitored_batch.py` with both Google and Bing baselines (`--page-urls` for non-blog routes), IndexNow. One cohort per cluster, then read Bing at 14/28d and Google at 28/90d against the pre-stated success/kill numbers before scaling.

### 5.2 Site-specific prerequisites

- Every site needs `docs/<site>/house_positions.md` current before any writing (it is the seed of truth; correcting it is the first job when a page contradicts it). Sites without one get it created from the ground-truth memory set + a verification pass.
- Medical: flat routing; use `scripts/medical_flat_link_audit.py`, never `slug_resolver --fix`.
- generalist: Track 2 applies in full (it already ran a Property-standard parity programme); its design family does not change the content method.
- Small family-D sites (14-32 posts): run discovery, but expect the first finding to be that the corpus floor, not cluster coverage, is the gap; their expansion looks like early Property waves (net-new to ~100+ posts) before cluster-coverage tactics pay.
- The blog generator + wave tooling is already multi-site (`sites/*.json`, 17 site_configs; `sites/wills-probate.json` exists, verified 2026-08-24). The gap is discovery.json SCHEMA, not existence: several sites carry legacy-format files without `lanes`/`lane_negative_tokens`, and `candidate_pool.py` silently skips the lane gate when they are absent, producing a lower-fidelity pool with no error. Step 1 of every site's discovery run is therefore: open its discovery.json and verify the v2 keys are present, upgrading the file if not; never trust file-exists as file-ready. Precedence for all such claims: repo reality beats this doc's tables; the tables are dated snapshots.

### 5.3 What transfers from Property without re-derivation

The lever board (`REWRITE_PROGRAM.md` §9.12): word count/depth is NOT a lever; page shape (working tool) IS; vocabulary/phrase coverage IS; register IS; sentence simplification is NOT different; internal linking is UNPROVEN (hygiene only). Any new lever driving a batch needs two independent corroborations or an isolated monitored experiment. Domain-trust reality check: Property's structural diagnosis found position gated by domain age/referring domains where we already appear; eligibility (new pages) is the part content fixes. Expect the same on every sibling; do not promise position lifts from rewrites alone.

---

## 6. TRACK 3: new sites for open niches

Build process is already fully specified: `SITE_BUILD_PLAYBOOK_2026-07-24.md` (phases 0-6 + G1, proven twice) + `SITE_SPINUP.md` (infrastructure). New sites are born at the Property standard: Track 1's §4 spec is the scaffold template from day one.

**Hard gate: no Track 3 site starts until the extraction and the family-D pilot have landed.** Before that, there is no sanctioned scaffold source (the playbook's `construction-cis/web` template is family B, which §4.1 defines as the defect; the Property standard sits on an unmerged branch until §8.10). After the pilot: scaffold = shared core + the pilot site as the worked example, and this doc amends the playbook's scaffold-source line at that moment.

**Precedence when the three docs conflict: this doc, then the playbook, then SITE_SPINUP.** Known conflicts, resolved here so no agent re-derives them:
- Migration order vs deferred branding: the playbook wins. DB migration is Phase 6, single tranche, `active=false`, after brand exists; spinup's "Step 1 FIRST" ordering applies inside that Phase 6 tranche, and no placeholder brand or domain is ever INSERTed into the prod `sites` row.
- Consent: the estate-parity notice model (§4.6.7, verified in all 17 live LeadForms). The playbook's checkbox rule and spinup's checkbox STOP condition predate the 2026-08-19 parity port and are superseded.
- Template details: this doc's appendix supersedes the playbook's construction-cis-era items; do not scaffold `ServiceTiers` (dead component, §4.2) or the old chrome.
- Storage prefixes: spinup's table is stale (9 rows vs 18 live prefixes; verified 2026-08-24). The grep across `*/web/src/app/layout.tsx` is the authority; update spinup's table when you touch it.
- Lead routing: spinup's pointer to `CENTRAL_LEAD_PIPELINE.md` for a notify allowlist is dead; no per-source allowlist exists. The real work at migration time: read `Property/web/src/lib/lead-routing.ts` + `Property/web/src/app/api/leads/notify/route.ts` and set the new source's routing posture EXPLICITLY, because the defaults are hazardous for a new site: `DEFAULT_CC_EXCLUDED_SOURCES` covers only `property,test` (a new source's leads CC the accounting partner by default) and offer-sending fires per source. For any regulated-adjacent niche both default ON is a compliance incident.
- Domains: appendix K's "never before G1" governs; spinup's domain-consuming steps (IndexNow host, CI url, `NEXT_PUBLIC_SITE_URL`, DNS) execute at G1 via the playbook's rename-swap list.

### 6.1 The niche ledger

Universe: `expansion_research/R1_NICHE_CANDIDATES.md` (89 rows) + `R2*` scoring + `TIER2_VERDICTS.md` + `expansion_research/buyer_demand/LEADGEN_NICHE_SWEEP.md`. The 89-row list is EXHAUSTED as a source of scored winners; full coverage of "every accounting niche" requires a fresh R1 enumeration pass (playbook exists: autocomplete sweep + sector-nav mining + SIC counts + DataForSEO).

Open, with positive evidence, in priority order:

| Candidate | Evidence | Note |
|---|---|---|
| Settlement agreements / employment | 9,900/mo @ £41.59 CPC, KD 1 | **REGULATORY HOLD.** `docs/settlement-agreements/REGULATORY_POSITION_2026-08-10.md` verdict CONDITIONAL: per-lead referral of settlement-agreement recipients is regulated claims management (RAO art 89G; unauthorised carrying-on is criminal, FSMA s.19/s.23). The estate's standard leads model is OFF for this niche; the compliant models are advertising / sponsorship / directory with partner-authored creative (FPO art 73B), and NO estate spec exists for that architecture. The sweep's "model already proven by competitors" claim is FALSIFIED on file (both competitors are SRA-regulated firms inside the art 89N exclusion). The niche screener's G0 gate PASSED this niche (`regulatory_gate: "none"`), a known instrument false-pass; the manual doc wins. Build nothing here until owner decision §8.11. |
| Leasehold enfranchisement / RTM | 1,000/mo KD 0 | Adjacent to Property (`docs/leasehold/` exists; Property already has the pillar); decide site vs cluster |
| Property professional surveys | KD 0 family | party wall / asbestos / right-of-light |
| Manufacturing & engineering | Tier-1 scored #6, research in `expansion_research/tier1_manufacturing/` | The one Tier-1 pick with research but no site; needs the live-SERP confirmation that never happened |
| Tier-2 sweep picks | commercial EPC/MEES, MVL, landlord compliance (EICR 18,100/mo), H&S consultancy, trademark | |
| Never-scored tail (~19 rows) | therapists/allied health (108k companies), opticians, vets, childminders, foster carers, content creators, day traders, performers, architects, hair/beauty, gyms, taxi, hauliers, used-car dealers, schools, driving instructors, franchisees, maritime, cleaning | Needs R2-style scoring before any build |

Recorded NO-GOs, with the killing constraint on file: farmers/rural (deepest rival field researched; converted to Property's `rural-estates` cluster instead), expats (converted to Property NRL/expat waves), retail (generalist cluster), FCA-regulated, travel/TOMS, recruitment (reverse intent), creative/media (career intent). Locked-out verticals (regulatory): FCA-adjacent consumer finance, equity release, funeral plans, business energy, immigration, marketplace-locked trades/tutoring.

The owner's stated intent for this programme is coverage "regardless of how small we deem the search demand". That conflicts with the recorded NO-GOs only where the constraint was demand-sized; where the constraint is regulatory (FCA, claims-management) or competitive-structural (farmers), the evidence stands and the recorded conversion path (cluster on an existing site) is the coverage mechanism. Building a dedicated site for a NO-GO niche is an explicit owner override, per niche (§8).

### 6.2 Standing constraints on every new site

From the playbook, unchanged: Opus-only content bodies; A* bar; faceless authority (no named experts, no regulated-activity claims); Ashfield Trading entity; brand/domain deferred to G1, never ask early, greppable placeholders; batch size 1; calculator fleet derived from data (R1/R2/R3 rules), never a round number; fact-verification queue from day one; frozen storage prefix confirmed by grep across `*/web/src/app/layout.tsx` (the spinup table is stale) and added to that table before code.

**Plus one new mandatory gate, generalised from the settlement-agreements near-miss: every new niche gets a `docs/<niche>/REGULATORY_POSITION_<date>.md` before Phase 0 closes**, verifying against primary sources whether lead generation in that niche is a regulated activity (FCA/RAO, SRA, claims management, credit broking), whether the standard capture stack is lawful for it, and what the compliant monetisation model is. The niche screener's G0 `regulatory_gate` is a heuristic and has produced at least one false PASS; it never substitutes for this doc. A CONDITIONAL or NO verdict stops the build at that point and goes to the owner with the structural options.

---

## 7. Traps and standing rules (incident-backed, generalise to every site)

The full incident log is in the Property STATE/DESIGN_SYSTEM docs; these are the ones that WILL recur on sibling ports:

1. **The unlayered heading rule.** Tailwind v4: unlayered author CSS beats every layered utility. Property ships `font-weight`/`letter-spacing` for h1-h6 in `@layer base` but `line-height: 1.2` deliberately unlayered; layering it moves 2,214 headings. Carry the split exactly; verify with `getComputedStyle` over routes at 1440 and 390, never screenshots or class names.
2. **Agents misreport measurements.** Long-running agents recall figures instead of re-reading and write confident wrong numbers. Rules: append every number to a measurements file with its command at the moment taken; quote only from that file; instruments can be wrong (Property's contrast checker was materially wrong three times), so name the instrument; the reviewer checks the log against the artefact.
3. **Silent substitution.** The most common port failure: the builder quietly reuses the old site's pattern. Only an independent reviewer reading the rendered DOM catches it.
4. **Breakpoint interaction across files.** The header incident: CTA appeared at the same breakpoint the wordmark's width cap lifted; both classes harmless alone, defect only in the overlap. No test catches it; the §0.8 review at 390/768/1024/1440 does.
5. **Stale premises inherited as fact.** "Live on 16 pages" was already stale when written (real count: 4). Re-measure before acting on any count in a doc, including this one.
   **This is a PROCEDURE, not a warning, because warnings get discarded (proven the same day this doc was tested: the dry-run agents were told to verify, verified inconsistently, and produced two headline findings that were false because they read stale STATE.md files and stale engine config as ground truth while checking code for other claims).** The binding form: **a claim is not an input until re-derived.** Any fact that feeds a decision, a disposition, a diagnosis or a report line must be re-derived at use time from one of the four ground truths (code via grep/read, the DB via query, an external API via a call, the rendered DOM via the instrument) and the artefact records the deriving command next to the fact, exactly as the measurements-file rule already requires for build numbers. STATE.md, memory files, this doc's tables, and engine config maps are POINTERS to where truth lives, never the truth. A fact with no deriving command beside it is UNVERIFIED and may not drive a decision or appear in a report as fact.
6. **Analytics continuity is a carve-out, not an afterthought.** Moving a CTA's breakpoint moves its volume between instrumented ids (`header_book` vs `header_book_mobile`: sum both across the change date). `vw_cta_performance` groups without page_path, so never reuse one cta_id across routes. Dropping a form_id that a deploy-watch baseline counts fires a false alert at the owner: restate the baseline in the same commit.
7. **Bot-gate history.** Traffic figures in docs written before 2026-08-23 are inflated ~12% (passive_session backfill). Re-pull before any before/after conversion read; Property's own read is `scripts/property_design_ab.sql` with its two traps documented in-file. Every sibling cutover gets the same treatment: a before/after SQL with whole-UTC-day windows, cutover day excluded, per-day normalisation, and its preconditions written into the file.
8. **Cutover spends attribution.** A redesign re-baselines every armed `monitored_pages` window on the site knowingly (Property DECISION A1). Schedule ports away from clusters mid-measurement, or accept and annotate the spend.
9. **Ownership of noise.** Failed CI and failed deploys email the owner; count and report them. No new monitor/alert/cron/email/interruptive UI without asking first, ever, including verification scripts (never scheduled, never promoted into `scripts/` or CI).
10. **False reassurance copy.** Copy beside any capture field is checked against that site's privacy policy, every time (Property shipped two false claims to the working tree and caught them in self-audit).
11. **Deploy mechanics.** Clean worktree at a pushed SHA, short path (`C:/dep`), framework preset must be `nextjs` (null preset = every route 404s), env vars pasted without newlines, `check_dependency_closure.py` before every deploy.

---

## 8. Owner decisions (the programme's gate register; record outcomes IN this table, with dates)

| # | Decision | Recommendation | State |
|---|---|---|---|
| 1 | Extraction (§3): shared core in web-shared vs per-site copies | Extract; additive-only, Property unaffected until opt-in; revert = delete new export paths | OPEN |
| 2 | Sequencing (§9): approve pilot order | Pilot D (crypto or ecommerce), then construction-cis | OPEN |
| 3 | generalist design | Keep bespoke (on file as deliberate); Track 2 only | OPEN |
| 4 | digital-agency port position | Last of the live family-B sites (bottleneck is indexing, not design) | OPEN |
| 5 | DataForSEO top-up for the estate sweep (~$2.30/site x ~10; balance ~$4.78 at 08-21) | Top up before the Stage 0 sweep; a lone pilot run fits the current balance | OPEN |
| 6 | Designer involvement for sibling brand layers | None by default; the standard is the design | OPEN |
| 7 | NO-GO overrides: dedicated sites for evidence-killed niches | Accept cluster-conversion as coverage; override per niche only | OPEN |
| 8 | Fresh R1 enumeration pass (89-row universe exhausted) | Yes, when Track 3 resumes | OPEN |
| 9 | wills-probate / divorce-finances | PARKED per owner 2026-08-24 (not live, not a priority); port folds into G1 prep whenever G1 is scheduled | PARKED |
| 10 | Merge `design/property-redesign-port` to main | Required before ANY extraction or sibling port (§3 branch prerequisite); merge, then verify a Property deploy from main. NOTE: the branch carries non-Property passengers (verified: Dentists `d3e705dd`, Solicitors `b8ae2269` corepage rewrites, plus whatever `git log main..design/property-redesign-port --name-only` shows per site); merging ships each at that site's NEXT deploy. Enumerate passengers per site before merging and annotate their STATE.md files | OPEN |
| 11 | Settlement agreements structure (§6.1 regulatory hold) | Site with ad/sponsorship model (needs a new conversion-architecture spec), Solicitors cluster (fails the fit test: consumer legal intent vs law-firm-principal audience), or skip. No build under the per-lead model, in any form | OPEN |

## 9. Recommended sequencing (pending decision 2)

Each step gated on the previous one's owner review; one site in flight per track at a time; corpus track can run on a different site than the design track in the same week (no shared files except web-shared and engine configs, additive edits only, the playbook's coordination rules apply).

1. **Extraction + pilot D:** extract shared core; port one family-D site (crypto or ecommerce, smallest live surfaces) end to end including its DESIGN_DELTA, guard tests, owner dev-server walk. This validates the extraction, the brand-swap recipe, and the per-site cost estimate.
2. **Pilot B:** construction-cis (healthy, mid-size, representative family B). This validates the port recipe on a full existing page set with the link floor.
3. **Fan out Track 1:** remaining family D (6 sites, batched), then family B by conversion upside: Solicitors, Dentists, Medical, contractors-ir35, digital-agency last. wills-probate + divorce-finances are PARKED (owner, 2026-08-24: not live, not a priority); their port folds into G1 prep if and when G1 is scheduled, outside this queue.
4. **Track 2 in parallel**, biggest corpora first (they have the query data that feeds the method): generalist, Dentists, Solicitors, digital-agency (content eligible even while design waits), construction-cis, Medical, contractors-ir35, then family D corpus-building waves. Every site follows the §5.0 stage order internally (diagnose, port, optimise, expand, read); Stage 0 diagnosis can run for ALL sites up front in one sweep since it is cheap and independent, and it produces the evidence that reorders the queue.
5. **Track 3** after the first two pilots prove the standard scaffold: settlement agreements (or Solicitors cluster, per decision), leasehold decision, manufacturing confirmation, fresh R1 pass, then the scored queue.

Cost calibration from the Property run (the only honest anchor): Property's port was ~15 hours of serial phase agents plus ~a day of investigation on a 252-file designer diff against the estate's largest site. Siblings have no designer diff to reconcile, but family D is a BUILD, not a re-skin (§5.0): expect 2-4 agent-days per family-D site (full template system + IA + marketing copy from scratch on the shared core), a mid family-B site at 1-2 days (existing pages, template swap + divergence protocol), Dentists/Solicitors/agency at 2-4 days, each plus the owner dev-server walk. Corpus discovery is ~1 session + ~$2.30 per site; each cluster batch thereafter ran at roughly a day including QA on Property. These are estimates, labelled as such; the pilots exist to replace them with measurements.

## 10. Where the detail lives

| Thing | Location |
|---|---|
| Page contract + component/template rules | `docs/property/DESIGN_SYSTEM.md` (§0 checklist is binding) |
| Port programme record + carve-outs + owner passes | `docs/property/STATE.md` §0.22-0.22c |
| Full port working docs (rule zero, disposition table, fidelity logs) | `tmp/design_migration/` (gitignored, this machine only); recipe durably summarised in §1.1 and §4.4 here |
| Cluster-coverage method (six steps, packs, floors, lever board) | `docs/_engines/REWRITE_PROGRAM.md` §9 |
| Wave mechanics + conductor | `docs/_engines/NETNEW_PROGRAM.md`, `.claude/commands/run-wave.md` |
| Discovery engine + cost model | `docs/_engines/DISCOVERY_ENGINE_V2.md` |
| New-site build | `docs/_engines/SITE_BUILD_PLAYBOOK_2026-07-24.md` + `docs/_engines/SITE_SPINUP.md` |
| Niche universe + verdicts | `expansion_research/R1_NICHE_CANDIDATES.md`, `R2_NICHE_SCORES_FINAL.md`, `TIER2_VERDICTS.md`, `expansion_research/buyer_demand/LEADGEN_NICHE_SWEEP.md` |
| Per-site state | `docs/<site>/STATE.md` |
| Cutover evaluation pattern | `scripts/property_design_ab.sql` (traps documented in-file) |
| Deploy mechanics | memory `vercel_cli_deploy_workflow` |

---

---

# APPENDIX: THE HARD SPEC (exact values, measured from the live Property standard)

This appendix makes the framework self-sufficient: an executing agent can build a conforming site from this file alone. Precedence rule: `docs/property/DESIGN_SYSTEM.md` and the Property source are the living authority; if this appendix ever disagrees with them, they win and this file gets corrected in the same session. All file references are the Property originals (the extraction targets of §3).

## A. Design tokens

Token home: `Property/web/src/app/globals.css` (832 lines). There is NO `tailwind.config.*`: Tailwind v4, config lives in CSS. `globals.css` opens with:

```css
@import "tailwindcss" source("..");
@source "../../../../packages/web-shared";   /* load-bearing; deleting it breaks shared components */
@import "tw-animate-css";
```

### A.1 Colour (Property's values; siblings swap ramps, keep the structure)

Raw brand ramps: emerald 50 `#ecfdf5`, 100 `#d1fae5`, 600 `#059669`, 700 `#047857`, 800 `#065f46`, 900 `#064e3b`; slate 50 `#f8fafc`, 100 `#f1f5f9`, 200 `#e2e8f0`, 300 `#cbd5e1`, 600 `#475569`, 700 `#334155`, 900 `#0f172a`; amber 400 `#fbbf24`, 500 `#f59e0b`, 600 `#d97706`, 700 `#b45309`.

Semantic tokens: `--background #ffffff`, `--surface #f8fafc`, `--surface-elevated #ffffff`, `--border #e2e8f0`, `--ink #0f172a`, `--ink-soft #334155`, `--muted #475569` (a TEXT colour, legacy), `--primary #059669`, `--primary-hover #047857`, `--accent #059669`, `--accent-strong #047857`, shadcn set (`--card #ffffff`, `--ring #059669`, `--destructive #dc2626`, `--input #e2e8f0`, `--muted-surface #f1f5f9`, `--muted-foreground #475569`, foregrounds white-on-primary/accent). Chart palette `--chart-1..5`: `#059669 #4f46e5 #10b981 #6366f1 #047857`.

Cross-site brand bridge (what web-shared reads): `--brand-primary: var(--accent)`, `--brand-primary-strong: var(--accent-strong)`, `--brand-on-primary: var(--accent-foreground)`. Brand colour is ALSO in `niche.config.json → brand.primary_color`; keep the two in sync.

One-offs: hero cream surface `bg-[#fbfaf7]`; footer build-credit gradient `#818cf8 → #fb923c`.

Colour semantics (money): primary ramp = relief / satisfied / money kept; amber = a duty bites; red = no relief / criminal track; slate = neutral or N/A. Every value direct-labelled so bars can be `aria-hidden`. "The other side" in comparisons gets a neutral slate-500 minus, never a red cross.

### A.2 Radius (the shape language)

```
--radius: 0rem
--radius-xl: calc(var(--radius) + 4px) = 4px    ← THE house radius
--btn-radius: var(--radius-xl)                   ← overrides web-shared's 9999px pill default
```

Practical rule: `rounded-xl` renders 4px and is the ONLY card/button radius. Canonical card edge = `rounded-xl` + `ring-1 ring-slate-200/70`. `rounded-2xl` + `border border-slate-200` is the pre-redesign recipe and is a defect (two exceptions in the standard: the DeepScrollModal sheet and the HeldResult prompt card, both `rounded-2xl` overlays, not cards).

### A.3 Typography

Font: Plus Jakarta Sans via next/font/google, weights `400,500,600,700,800`, variable `--font-plus-jakarta`, wired `@theme --font-sans: var(--font-plus-jakarta)`; body gets the variable + className + `antialiased`. Body base 16px / line-height 1.6.

Heading defaults, split across two blocks DELIBERATELY (trap §7.1): `@layer base { h1..h6 { font-weight: 700; letter-spacing: -0.02em } }` and, unlayered on purpose, `h1..h6 { line-height: 1.2 }`. Deliberate per-element deviations use `!` (e.g. `leading-snug!` on article-card titles).

Type scale (base → sm → lg unless noted):

| Role | Classes | px |
|---|---|---|
| Hero h1, homepage navy | `text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-7xl` | 30 / 48 / 72 |
| Hero h1, cream topic/pillar/service | `text-2xl sm:text-4xl lg:text-6xl` | 24 / 36 / 60 |
| Hero h1, calculator/research/locations | `text-3xl sm:text-4xl lg:text-5xl` | 30 / 36 / 48 |
| SlimHero h1 (post-submit) | `text-2xl sm:text-4xl lg:text-5xl` | 24 / 36 / 48 |
| Blog post h1 | `text-3xl sm:text-4xl md:text-5xl` | 30 / 36 / 48 |
| Section h2 (canonical, everywhere) | `text-2xl font-bold text-slate-900 sm:text-4xl` | 24 / 36 |
| Calculator h3 title | `text-xl sm:text-2xl lg:text-3xl font-bold` | 20 / 24 / 30 |
| Card h3 | `text-base sm:text-lg font-bold text-slate-900` | 16 / 18 |
| Body (`Prose`) | `text-sm sm:text-base leading-relaxed text-slate-700` (onDark `text-slate-300`) | 14 / 16 |
| Hero standfirst | `text-base sm:text-lg` (homepage adds `lg:text-xl`) | 16 / 18 |
| Section standfirst | `mt-3 sm:mt-4 text-base sm:text-lg text-slate-600` | |
| Eyebrow | `text-[11px] sm:text-xs font-semibold uppercase tracking-wide` + 24px x 2px primary rule | 11 / 12 |
| Fine print (`ExampleFigureNote`) | `text-[11px] leading-relaxed text-slate-500` | 11 |
| Meta pill | `text-xs font-semibold text-slate-600` | 12 |
| Stat value | `text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tabular-nums` | 24 / 30 / 36 |
| Shared calculator result headline | `text-4xl sm:text-5xl lg:text-6xl font-bold font-mono` (bespoke tools one step smaller) | 36 / 48 / 60 |
| Blog prose `.prose-blog` | 17px (`1.0625rem`), line-height 1.75, `max-width 65ch`; h2 28px with 4px primary left border; h3 22px | |

### A.4 Containers and spacing

Containers (all carry `mx-auto w-full px-4 sm:px-6 lg:px-8 min-w-0`):

| Constant | max-w | Use |
|---|---|---|
| `siteContainerLg` | `max-w-6xl` (1152px) | THE page measure, every page body |
| `siteContainerXl` | `max-w-7xl` (1280px) | header bar only |
| `siteContainer` | `max-w-5xl` | legacy, do not use in new work |
| `contentNarrow` | `max-w-3xl` | hero copy + section-head blocks only |

Zero body clamps site-wide: no `max-w-2xl/3xl/4xl/5xl` wrapper around section bodies. Fix for a lost-looking lone element is a second column, never a clamp.

Spacing rhythm:

```
Section (canonical):        py-12 sm:py-16 lg:py-20      (48/64/80)
Blog, hubs, /blog index:    py-16 sm:py-20
Stats strip:                py-5 sm:py-7
Navy LeadCTAPanel band:     py-12 sm:py-20 lg:py-24
SlimHero:                   py-8 sm:py-10 lg:py-12
Full hero:                  py-10 sm:py-12 lg:py-14
Hero min-heights:           homepage min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]
                            TopicHero/service min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]
                            index heroes min-h-[300px] sm:min-h-[350px]
Card padding:               p-6 sm:p-8 ; large card p-6 sm:p-8 lg:p-10
Grid gaps:                  cards gap-4 sm:gap-5 ; card grid gap-5 sm:gap-6 ; calc grid gap-6 sm:gap-8
                            two-column body gap-8 sm:gap-12 lg:gap-16
Heading→body:               Prose mt-6 ; standfirst mt-3 sm:mt-4 ; section head block mb-8 sm:mb-12
Anchor offset:              scroll-mt-24 on EVERY anchor target (sticky header height)
```

Breakpoints: Tailwind v4 stock, unmodified: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536. Mandatory test widths: 390, 768, 1024, 1440.

### A.5 Buttons

```
btnPrimary    inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center
              rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-bold text-white
              transition-all duration-150 hover:bg-emerald-700 active:bg-emerald-800
              disabled:cursor-not-allowed disabled:opacity-50 + focusRing
btnSecondary  same box; border-2 border-emerald-600 bg-white text-emerald-700,
              hover:border-emerald-700 active:bg-emerald-50
btnOnDark     min-h-12; border-2 border-white/40 bg-white/5 text-white backdrop-blur-sm,
              hover:border-white/60 hover:bg-white/10; focus outline = light primary
btnOnCream    min-h-12; border-2 border-slate-900 bg-transparent text-slate-900,
              hover:bg-slate-900 hover:text-white
focusRing     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-emerald-600
```

Sibling swap: only the colour tokens change; the box (min-h-12 = 48px, min-w-[10rem], px-8 py-3.5, rounded-xl) is fixed. Header CTA variant uses `min-h-10 px-6 py-2 text-sm` (see B). web-shared's `btnPrimary` reads `rounded-[var(--btn-radius,9999px)]` + `var(--brand-primary)`: pinning `--btn-radius` makes both render identically.

### A.6 Shadows and glow

```
Card glow rest:    shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)]
Card glow hover:   hover:shadow-[0_16px_32px_-12px_rgba(5,150,105,0.4)]
Card ring hover:   hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]
Contained panel:   shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)]
Header shadow-sm ; drawer/sticky/modal shadow-2xl ; dropdown shadow-lg
Peak glow (card-glow 40%, .related-card hover, :focus-within):
  0 0 0 3px rgba(16,185,129,0.22), 0 18px 40px -10px rgba(5,150,105,0.6)
  + border-color rgb(52 211 153)
```

Glow rgba values embed the primary ramp; recompute per sibling brand.

### A.7 Motion

Every animation gated behind `@media (prefers-reduced-motion: no-preference)` AND driven by `data-draw="off"` present in server HTML; an 11-line `<noscript>` block in `layout.tsx` releases them all (seven components depend on it; it is load-bearing). Named effects: `fadeInUp` (`.hero-reveal` 0.6s, `.hero-reveal-delay` 0.8s), `logo-draw` 1.5s, `marquee-y` 33s linear infinite (pauses on hover/focus-within), `num-glow`, `card-glow` 3.4s with nth-child stagger 0.7/1.4/2.1s, `.related-card` hover glow behind `@media (hover:hover)`, `.eyebrow-rule` 600ms `cubic-bezier(.22,1,.36,1)`, `.tick-draw` 420ms, `.story-numeral` 520ms, `.penalty-ladder-*` 900ms, `.rate-wedge-fill` 900ms, `.live-pulse-ring` 2s infinite (the ONLY perpetual loop allowed on a page).

### A.8 Accessibility floors (hard, measured)

- 4.5:1 contrast for ALL text including 11px fine print and 14px bold. slate-500 (4.76:1) never slate-400 (2.51:1) on light grounds.
- Known failure values to avoid on white: primary-400-tick ~1.9:1 (pass `tickClassName` at 600-level, 4.54:1); amber-600 3.19:1 (use amber-700, 5.02:1). Penalty ramp locked at amber-700 / orange-700 / red-600 / red-800 (5.02 / 5.18 / 4.83 / 8.31).
- Touch targets ≥44px, ≥48px primary (btnPrimary min-h-12, burger h-12 w-12, `touch-manipulation` on both).
- Wordmark aria-label built from the visible strings (WCAG 2.5.3). Footer links `py-0.5` for a 24px hit area at 12px visual gap (WCAG 2.5.8).
- `scripts/validate_palette.js` is referenced by two docstrings but DOES NOT EXIST; measure contrast by hand or rebuild the script in the scratchpad.

## B. Header contract (exact)

Bar: `sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm`, inline `paddingTop: max(0px, env(safe-area-inset-top))`. Inner: `siteContainerXl flex min-h-[3.25rem] sm:min-h-16 items-center justify-between gap-3 sm:gap-4 py-3` (52px bar mobile, 64px from sm).

| Width | Header carries |
|---|---|
| 0-1023 (`<lg`) | wordmark + burger only. Primary CTA lives at the FOOT of the drawer (`header_book_mobile`). |
| 1024+ (`lg:`) | wordmark + nav + primary CTA (`header_book`). No burger. |
| 1280+ (`xl:`) | + secondary "Contact" link (`header_contact`); the nav's own Contact item goes `xl:hidden` so they never double up. |

- Nav list: `hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1`. Item `px-3 py-2 text-sm font-bold border-b-2 xl:px-4`; active `border-emerald-600 text-emerald-700`; idle `border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300`. Active-state logic: top-level trigger = PREFIX match; dropdown/drawer children = EXACT match (guarded by `nav-active-state.test.ts`).
- Primary CTA: `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`. The `lg:` is the incident fix: it must appear at the SAME breakpoint the burger disappears, and never at a breakpoint where a neighbour's width cap lifts.
- Wordmark: two-line stack, icon + name `text-[0.65rem] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em]` / 2px primary rule / descriptor `text-[0.6rem] sm:text-[0.65rem] tracking-[0.32em] sm:tracking-[0.38em]`; width cap `max-w-[13rem] sm:max-w-none` (the cap change is why rule §7.4 exists). Footer variant one step larger.
- Burger: `h-12 w-12 touch-manipulation rounded-xl border-2 border-slate-200 bg-white lg:hidden`. Drawer close `h-11 w-11 rounded-xl border-2`.
- Drawer: `fixed inset-0 z-50 lg:hidden`; scrim `bg-slate-900/50 backdrop-blur-[2px]`; panel `absolute right-0 top-0 h-[100dvh] w-[min(20rem,92vw)] border-l-4 border-emerald-600 bg-white shadow-2xl` + safe-area padding. Order: header row (label + close + wordmark), scrolling nav (active = `border-l-4` bar + `bg-emerald-50 text-emerald-900`; groups indented `ml-4 border-l border-slate-200`; group labels `text-[11px] font-bold uppercase tracking-wider text-slate-500`), footer `border-t border-slate-200 p-3` holding `${btnPrimary} w-full`.
- Desktop dropdowns are click-toggled `<button>`s, NOT hover links (tablets at `lg:` have no hover). Close on Escape / outside mousedown / route change. Grouped panel `w-[38rem] max-h-[70vh] columns-2 rounded-xl border bg-white p-4 shadow-lg` + "View all" footer link; simple panel `w-64 rounded-xl py-2`. Because the trigger is not navigable, every group needs a self-referential first child ("All services").
- Nav data comes from `niche.config.json → navigation[]`; the Calculators group is built server-side from the calculator registry (`buildPrimaryNav()`), never hand-listed.
- Flex discipline: `min-w-0` on anything that must shrink, `shrink-0` on the CTA+burger group. Nothing crowds the wordmark at any width.
- Analytics: moving any header CTA's breakpoint moves volume between `header_book` and `header_book_mobile`; say so in the commit or someone chases a phantom regression.

## C. Footer contract (exact)

`relative overflow-hidden bg-slate-900 text-white` + brand backdrop motif; `siteContainerLg relative z-10 py-12 sm:py-16`; `grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16`.

- Left: footer-variant wordmark (primary-400 icon and rule, white text) + `siteConfig.description` in `max-w-md text-sm text-slate-300`.
- Right: `<nav aria-label="Footer">` `grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4`. Columns DERIVED, never hand-listed: Services = children of the services nav item; Resources = children of the primary resources pillar; Calculators = first tool of each of the first 5 registry categories + "All calculators"; Company = About / Contact / Locations / Book a consultation. Sites without a locations surface (crypto and most of family D) omit the Locations link; the derivation renders only routes that exist, never a dead link. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` in `ul.space-y-2`.
- Legal row: `mt-10 pt-6 border-t border-white/10 space-y-4`: footer_links (Privacy / Terms / Cookies) at `text-xs text-slate-400`, designer credit, `legalDisclosure`, `© {year}` + `ConsentToggle` ("Do not track me").

## D. The lead form and every capture surface (exact)

### D.1 LeadForm (the 7-field enquiry form; the site's primary conversion unit)

| # | Field | name | Type | Validation |
|---|---|---|---|---|
| 1 | Role | `role` | select, options from `niche.lead_form.role_options` (5 per site) | required |
| 1b | (conditional) | `roleDetail` | text, max 150 | required when role = Other |
| 2 | Full name | `fullName` | text, max 100, `autoComplete="name"` | ≥2 chars |
| 3 | Email | `email` | email, max 100 | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| 4 | Phone | `phone` | tel, max 20 | `/^[\d\s+().-]{10,}$/` AND ≥10 digits |
| 5 | Your situation | `situation` | textarea rows 4, max 800 | min chars = `SITUATION_MIN_CHARS` (Property: 20 chars / 4 words, halved from 40/8 after 96% of form_error events were users blocked by it; a data-tuned setting, keep) |
| 6 | What's prompted this now? | `prompted` | text, max 200 | required |
| 7 | What do you want from the call? | `callGoal` | text, max 200 | required |
| — | honeypot | `enquiry_ref` | off-screen `left-[-9999px]`, `tabIndex={-1}` | server decides, never silently dropped |
| — | hidden | `sourceUrl` | `window.location.href` | |

Field styling: `mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/25`.

Posts to `/api/leads/submit`. Payload: `full_name, email, phone, role, message` (composed from situation/prompted/callGoal), `source` (= `niche.content_strategy.source_identifier`, which must equal `site_key`, the PF-07 rule), `source_url, submitted_at, consent_given: true, consent_text, consent_at, visitor_id, session_id, extras, captureMode?`. Consent is a NOTICE, not a tick-box (the estate parity model, §4.6.7); `consent_text` byte-matches the rendered wording as the audit trail.

**Consent WORDING is a conversion surface, locked by incident (2026-08, `docs/property/STATE.md` §0.23):** the 08-15 notice wording change collapsed mini-form step-2 completion from 6/20 to 0/18 and mini-form leads 8/wk to 1/wk while everything else held; reverted estate-wide 2026-08-24 (`435cc12e`, byte-exact to the stored `consent_text` of the working period). Standing rules: NO port or build ever alters `leadConsentText` (it is a carve-out, same class as facts and SEO surface); any deliberate wording change is its own owner-approved experiment with a mini-form step-2 conversion read before estate rollout; stored `consent_text` on lead rows is the ground truth for what wording was live when (commits deploy late); the 7 `lead-payload.test.ts` guard files pin the wording, so a port that trips one has touched something it must not.

Success path: first-party `onLead` event + GA `generate_lead` (`event_label: <site>_<role>`), booking-nudge token set (+14 days), then `router.push(thank-you?bt=<signed token>&rt=<return path>)` after 800ms, unless `redirectOnSuccess={false}` (calculator pages, blog posts). Phone soft-fail keeps the reader on the form with a "check that number" error.

INVARIANTS: LeadForm renders ONLY on a white/light surface (labels are slate-900; the navy-ground variant shipped invisible labels at 1.00:1 on 783 Property articles, and the same bug was observed on generalist and digital-agency in August; the 08-19 parity port may or may not have fixed it, so RE-VERIFY the rendered form ground on every sibling during its port rather than assuming either way). `useFormTracking("lead_form")` wired. Honeypot present. Consent fields only from rendered UI or the notice pattern, never inferred.

### D.2 The full capture-surface inventory (port all, add none)

| Surface | Role | Key behaviour |
|---|---|---|
| `LeadForm` | closing ask inside `LeadCTAPanel`, homepage `#book`, blog `#enquiry-form`, `/contact` | above |
| `MiniCapture` | mid-content light capture (13 Property call sites) | name+phone+email+message |
| `InlineMiniLeadForm` | mid-article fallback when no premium tool exists | `my-12 bg-slate-50 p-6 sm:p-8` |
| `ResultGate` / `HeldResult` / `ResultGateModal` | calculator result reveal | real result behind frosted glass; inputs stay live; embeds never gated; converted visitors bypass; reveal persisted per campaign; skip always reveals; revealed state appends a `btnSecondary w-full` specialist CTA |
| `GateOrForm` | blog resource slot free-review capture | the email-gated Excel arm is DELETED (carve-out 2, security); never resurrect |
| `BookingPicker` | `/thank-you` + `/book` | next 10 weekdays x 3 call windows, signed token, posts `/api/leads/book` |
| `DetailsForm` | `/complete` | renders ONLY the missing fields, never email, never a message |
| `SpecialistWidget` | topic-aware chat-style capture | auto-opens once per session; escalating peek 30/70/120/180s; exit-intent + form-friction triggers; stops on open/convert/opt-out; no-op in /embed and /admin. Its auto-open event is NOT a human signal (bot-gate incident) |
| `StickyCTA` | bottom bar | appears at >30% scroll, dismissible, personalised via `useIntent("sticky_cta")`, button min-h 44px |
| `DeepScrollModal` | deep-scroll offer | one per page-load session + 30-day per-topic localStorage suppress |
| `ReturningBar` | returning + unconverted visitors | fixed bottom, session-dismissible |
| `ExitIntentModal` | DELETED 2026-07-09 (162 shows, 0 leads) | do not port, do not rebuild |

Standing rule: never add a new interruptive surface, or change any of these thresholds/cadences, without asking the owner first.

### D.3 CTA rules and instrumentation

- On-page primary CTAs scroll to the on-page form: `href="#book"` (blog: `#enquiry-form`; calculators: `#get-expert-help`); the anchor div carries `scroll-mt-24`. Only the header CTA and StickyCTA navigate to `/contact`.
- The closing ask is `LeadCTAPanel` (navy full-bleed default: `grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`, proof points as `h-12 w-12 rounded-xl` check badges, white `rounded-xl p-6 sm:p-8 lg:p-10` card holding LeadForm; `contained` variant `bg-slate-100 rounded-xl p-6 sm:p-10 lg:p-14 ring-1 ring-slate-200`). Never a bare LeadForm in a coloured card.
- A bare button is not a CTA block. Mid-page pattern: `mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8`, statement left, button right.
- Every CTA carries `data-cta`, `data-cta-placement`, `data-cta-goal` (+ `data-cta-variant`); they feed `vw_cta_performance` (567 attributes at the Property gate). Canonical ids: `header_book`, `header_book_mobile`, `header_contact`, `hero_book`, `hero_calculators`, `home_calculators_all`, `home_cta_primary/secondary`, `sticky_cta(+_close)`, `blog_skip_to_form`, `blog_sidebar_book`, `deep_scroll_modal(+_close)`, `returning_bar(+_close)`, `calc_result_<campaign>`. Keep ids when moving a CTA; never reuse one id across routes (the view groups without page_path); pair any form_id deletion with a deploy-watch baseline restatement in the same commit.
- Phone/email come from `niche.contact`; no public telephone in schema; all enquiries route through the form.

## E. Component inventory (the port set)

Shared components an executing agent must deliver (Property path in brackets; classes are the spec):

**Layout/brand:** `PageShell` (`flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-white`; skip-link, header, `<main id="main">`, footer; bare children for `/embed/*`) · `SiteHeader` (B) · `SiteFooter` (C) · `HeroBrickBackdrop`-equivalent motif (aria-hidden inline SVG, `absolute inset-y-0 right-0 w-[55%] hidden sm:block`, navy tone stroke-opacity .18 mask `to left, black 35% → transparent 92%`, cream tone .1 / 45%/97%; host must be `relative overflow-hidden` with content `relative z-10`) · site wordmark (B).

**Primitives:** `Prose`, `Eyebrow` (+ `EyebrowRule`: 24x2px primary bar drawing left-to-right on IntersectionObserver 0.5), `InlineLink`, `CardStack` · `ExampleFigureNote` (mandatory on every figure-bearing visual; sole exemption StatsCounter) · `FaqSection` (white section, single-open Radix accordion: item `rounded-xl bg-slate-50 border-transparent data-[state=open]:border-emerald-600 hover:border-emerald-600`, trigger `px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-bold`, content `border-t bg-white`; ALWAYS paired with `buildFaqPageJsonLd` on the same array) · `Breadcrumb` (emits its own BreadcrumbList JSON-LD; light chevron slate-500) · `SlimHero` (shallow navy, no min-h, no CTA, no breadcrumb; deliberately not configurable into a content hero) · `NoticeCard` (emerald and slate tones only, NO red tone by design) · `NumberedPagination` (`min-h-12 rounded-xl border-2` buttons, sliding 5-page window, ends dim not disappear).

**Marketing/storytelling:** `TopicSection` (`<section id scroll-mt-24 py-12 sm:py-16 lg:py-20>` slate-50 or white, Eyebrow, h2, Prose, figure slot, `linksAs="cards"` default rendering `RelatedArticles columns={3}`; tone set explicitly by the caller, never auto-alternated) · `TopicHero` (cream, breadcrumb, h1, standfirst, CTA row `flex-col sm:flex-row gap-3 sm:gap-4`) · `LeadCTAPanel` (D.3) · `MarketingSections` (WhoWeAre / WhyChooseUs / WhatWeCover, shared by homepage AND `/contact`: lifted, never copied) · `TestimonialsSection` (navy, anonymised quotes, initials only, `highlight` must appear verbatim in `quote`) · `PromptMarquee` (vertical 33s marquee of first-person prompts, pause on hover/focus, scroll area under reduced motion; self-identification cues, NOT testimonials) · `ProblemStatement` · `StatsCounter` (`grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4`; counts from 60% of target over 1100ms easeOutCubic at IO 0.99) · `CoverageCards` (2 or 3 col grid, icon badge, optional outcome row pinned `mt-auto`; tone opposes section ground) · `ComparisonTable` (stacked below md, `<table min-w-[36rem]>` in `overflow-x-auto` above; our column emerald-edged with a "most recommended" pill; neutral minus for the other side) · `ProcessTimeline` (rAF-throttled fill; static default = fully drawn, no-JS safe) · `DrawnTickList` (110ms stagger; `tickClassName` REQUIRED on light) · `PenaltyLadder` (horizontal from md; locked ramp A.8) · `ScrollGlowGroup` · `WhatToExpectCard` (navy reassurance CARD, not a section) · `LocationChips` / `LocationMap` · `NumberedReasons` / `WhyUsList`.

**Blog:** `BlogPostRenderer` (F.3) · `RelatedArticles` (THE only article-card grid: `<ul grid gap-4 sm:gap-5 sm:grid-cols-2 [lg:grid-cols-3]>`, card `related-card rounded-xl border border-slate-200 bg-white p-5 sm:p-6`, kind pill `bg-slate-100 rounded-full px-2.5 py-1 text-[10px] uppercase`, title `text-base sm:text-lg font-bold! leading-snug! tracking-normal!` with `after:absolute after:inset-0` link, excerpt `line-clamp-3`, no resting shadow, hover glow behind `(hover:hover)`, `:focus-within` ungated) · `TableOfContents` (mobile `<details>` in `sticky top-16` bar; desktop card; active heading via IO `rootMargin "-100px 0px -66%"`; the sidebar wrapper owns stickiness: `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto`) · `BlogSidebarCta` (navy `rounded-xl bg-slate-900 p-6`, anchors `#enquiry-form`, headings are `<p>` to stay out of the TOC) · `ReadingProgress` · `HubArticleList` (12/page BY HIDING with the `hidden` attribute, never `slice()`: all items stay crawlable; guard test mandatory) · `BlogCategoryHub` · `BlogListWithSearch` (projected item type excludes `contentHtml`, payload lesson).

**Calculators:** `CalculatorTabs` (WAI-ARIA tabs, roving tabindex, arrow/Home/End, `#hash` deep-link; explicit `TABLIST_COLUMNS` literal map for 1-5 tabs; tab `rounded-xl border-2 p-3 sm:p-4`, selected `border-emerald-600 bg-emerald-600 shadow-md` + rotated caret; icon badge `h-9 w-9 sm:h-11 sm:w-11 rounded-xl`; panels `mt-6 sm:mt-8` dynamically imported; EMITS NO CRAWLABLE LINK) · `CalculatorClient` (server pages pass a slug only; compute resolved client-side) · shared `Calculator` renderer (`bg-white border-l-4 border-[var(--brand-primary)] p-6 sm:p-8 lg:p-10`; `grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]`, fields left `space-y-5 sm:space-y-6`, NAVY result panel right `bg-slate-900 p-6 sm:p-8 text-white` with mono headline, baseline-aligned rows over `border-t border-slate-700`, note `text-xs text-slate-400`; fires `calc_view / calc_input_change / calc_computed / calc_result_viewed`) · `NumberInput` (string-backed controlled input so a cleared box does not snap to 0; parse/clamp on valid entry and blur; `inputMode="decimal"`; `text-xl sm:text-2xl font-bold` on `border-b-2 border-slate-300` underline with currency prefix; label `text-xs sm:text-sm font-bold uppercase tracking-wider mb-2`; `min-h-[44px]`) · `ResultGate`/`HeldResult` (D.2) · premium island (`next/dynamic ssr:false` with a SIZED placeholder, zero CLS; renders nothing when the topic has no authored tool).

## F. Page templates (section-by-section anatomy)

### F.1 The canonical content-page skeleton

```
1 HERO       navy + motif backdrop OR TopicHero cream.
             relative overflow-hidden; content relative z-10.
             Breadcrumb → Eyebrow → h1 → standfirst → CTA row (primary → #book).
2 BODY       N sections on the TopicSection recipe: id + scroll-mt-24,
             py-12 sm:py-16 lg:py-20, Eyebrow, h2, Prose, figure.
             Grounds oscillate white/slate-50, set explicitly. Navy never touches navy.
             Card ground opposes its section's.
3 CLOSING    <div id="book" class="scroll-mt-24"><LeadCTAPanel/></div>
4 FAQ        <FaqSection faqs> + buildFaqPageJsonLd(faqs) on the same array.
             (White FAQ also keeps the navy panel off the navy footer.)
```

### F.2 Homepage

StickyCTA + JSON-LD set (Organization, FAQPage, AccountingService, Service, BreadcrumbList, WebSite, WebPage) → navy motif hero (live-pulse badge, h1 30/48/72, primary CTA + secondary `#calculators`, 5 trust badges) → white stats strip `py-5 sm:py-7 border-b` with StatsCounter → ProblemStatement (argument left, PromptMarquee right) → WhoWeAre → WhyChooseUs → services grid (tinted ground, 4 glow cards) → WhatWeCover → `#calculators` white + CalculatorTabs + literal "See all N calculators" link → TestimonialsSection (navy) → latest insights (slate-50 `divide-y` row list) → `#book` navy closing block `lg:grid-cols-[1fr_2fr]` (3 check proof rows + white card with LeadForm) → FAQ white.

### F.3 Blog post

ReadingProgress → `<article bg-white py-12 sm:py-16>` → siteContainerLg → `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12`. Main: Breadcrumb → header card `rounded-xl bg-slate-50 p-8 mt-6` (Eyebrow = category, h1, meta pills Published / Updated(primary) / Author / read time, summary `text-base leading-7`, "Skip to enquiry form ↓") → mobile TOC → optional image → `.article-body.prose-blog mt-10` with tiered injection (premium tool after the first h2 at ~20-25% depth, gate a step later; else InlineMiniLeadForm at mid-scroll) → `#enquiry-form` navy `rounded-xl bg-slate-900 p-8 sm:p-10 scroll-mt-24` with white card holding `LeadForm redirectOnSuccess={false}` → FAQ accordion → reviewer/author aside → RelatedArticles. Sidebar: BlogSidebarCta + TableOfContents under the sticky wrapper. Category-specific CTA copy map keyed on category SLUG (raw-frontmatter keying caused the 57-posts-wrong-CTA and 228-pages-wrong-related bugs; key on the slugified form and guard with a test).

### F.4 Category hub

Cream motif hero → white essentials briefing (h2 + ruled h3 rows) → slate-50 article library (HubArticleList, 12 visible / rest `hidden`, all crawlable) → navy LeadCTAPanel → slate-50 other-topics band.

### F.5 Calculator pages

Generic `[slug]` route (`dynamicParams=false`, `generateStaticParams` from registry): SoftwareApplication + FAQPage JSON-LD → navy hero `py-12 sm:py-16` (breadcrumb, h1, intro `max-w-3xl`) → slate-50: CalculatorClient + resources island → white explainer (h2 + Prose + worked examples, FULL container) → slate-50 RelatedArticles from `tool.related` → `#get-expert-help` LeadCTAPanel `redirectOnSuccess={false}` → FaqSection. Index: navy hero → Tier 1 "Run one now" white + headline CalculatorTabs → Tier 2 slate-50 directory by category (cards `rounded-xl border-2 border-slate-200 bg-white p-3 sm:p-4 hover:border-emerald-400`) → navy next-step card.

### F.6 Post-submit set (`/thank-you`, `/book`, `/complete`)

All three: `robots index:false`, cache `private, no-cache, no-store`, SlimHero → white `py-12 sm:py-16 lg:py-20` → `grid gap-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16` (ask left, WhatToExpectCard right; mobile stack order = ask first) → light tail. `/thank-you` branches: optout / confirmed / default / default+BookingPicker (`?bt=`); progress `ol grid sm:grid-cols-3`; "while you wait" RelatedArticles; `?rt=` return link keeps its data-cta. `/book`: BookingPicker + NoticeCard fallback. `/complete`: no-token / invalid / already-complete (mints fresh book token) / DetailsForm. Four deliberate departures from F.1: no LeadCTAPanel, no breadcrumb, shallow hero without CTA, no tick badge. A CTA whose only destination is the thing already done is worse than no CTA; reassurance copy checked against the privacy policy.

### F.7 Contact funnel

Navy hero → `#book` slate-50 form section `lg:grid-cols-[1.6fr_1fr]` (WhatToExpectCard + white "Speak to us" card + LeadForm) → WhoWeAre → WhyChooseUs → Testimonials (navy, positioned so it never touches the navy footer) → WhatWeCover white.

## G. Calculators (structure + fleet)

This layout is Property's pre-extraction shape, recorded as the reference. Sites already consuming `web-shared/tools` (construction-cis, crypto, family D) are AHEAD of it and keep their shape (§4.6.3); the contract fields below are what binds, not the file locations.

File layout per site:

```
src/lib/calculators/registry.ts    BESPOKE[] + GENERIC[] → TOOLS; helpers allTools/genericTools/toolPath
src/lib/calculators/types.ts       Tool | GenericTool | CalcField | CalcValues
src/lib/calculators/format.ts      formatters
src/lib/calculators/nav.ts         registry → header dropdown groups
src/lib/calculators/tools/*.ts     one file per generic tool
src/components/calculators/        bespoke components + tabs + gate + fields
src/app/calculators/[slug]/        generic SSG route
src/app/calculators/<bespoke>/     static routes (take precedence)
src/app/embed/[slug]|<bespoke>/    chrome-free iframe variants (noindex, never IndexNow'd)
```

A `GenericTool` carries: `slug, name, category, oneLiner, metaTitle, metaDescription, intro, fields[], compute(values) → {headline{label,value,sub,tone}, verdict?, rows[], note}, explainer{heading, paragraphs[]}, workedExamples[] (GEO), faqs[], related[], embedHeight`. Schema wrappers: `buildCalculatorJsonLd({name, description, path})` + `buildFaqPageJsonLd(faqs)` emitted at the top of the route; metadata from the tool's own meta fields with a canonical.

Property's fleet for reference (26): 5 bespoke (stamp-duty, section-24, incorporation-cost, mtd-checker, portfolio-profitability) + 21 generic. Sibling fleets are DERIVED FROM DATA per the playbook rules (R1 explicit tool-frame volume > 0; R2 family ≥1,000/mo AND computation-shaped AND SERP top-10 prose-only; R3 regulatory shock), never a round number. Compute logic lives in a shared ground-truth math module per site (the estate-tax.ts / cis-tax.ts / sdlt.ts role) with vitest edge-case goldens (Property: 241 goldens); page figures DERIVE from the same module (never type a number twice). Rules: on-page presence is CalculatorTabs with an explicit tabs list; never a second copy of a calculator; every rendering page owes one literal `<a href="/calculators/...">`; result panels navy; results behind ResultGate on non-embed routes; MiniCapture on result.

## H. Page inventory: what a conforming site contains

Minimum route set (Property's counts in brackets as the reference ceiling):

| Surface | Minimum | Property |
|---|---|---|
| Homepage | 1 | 1 |
| Service pages | 3-5 pillar/commercial pages targeting delegation queries | 4 under `/services` + index |
| Topic pillars | per corpus plan; root-level routes, not `/services/[slug]` | 12+ (landlord-tax, section-24, incorporation, MTD, rates, leasehold, compliance, landed-estates, cost-of-selling, for-letting-agents, ...) |
| Calculators | data-derived fleet + index + embeds | 26 + index |
| Blog | posts + category hubs + searchable archive | 783 posts, 9 hubs |
| Research/data assets | 2 minimum (real published statistics, source URLs mandatory) | landlord-tax-index etc |
| Locations | city pages where the niche is geographic | 854-line template + hub |
| Contact + post-submit | `/contact`, `/thank-you`, `/book`, `/complete` | 4 |
| Legal | privacy, terms, cookies | 3 |
| Feeds/AI | `/feed.xml`, `/llms-full.txt`, OG image route, sitemap | all |
| Total static pages | | 902 at cutover build |

Every page passes the §4.1 floor and the §0 checklist; every page's unique outbound internal link count is >= its pre-port live count (the link floor, binding, measured per page before the port starts).

## I. Copy rules (site-wide, enforced at QA)

British English. No em-dashes anywhere in user-facing copy (grep gate). No claims of clients/customers/served/advised (no client records exist anywhere in the estate; "280+ Properties enquired about" is the evidenced pattern: count enquiries, not clients). Testimonials anonymised (role + detail + initials). No named experts, no regulated-activity claims, advice words only in negation. Every figure re-derivable from `house_positions.md` with a §-reference; example figures carry `ExampleFigureNote`. Reassurance copy near capture fields checked against the privacy policy. Page summaries live in one `lib/page-summaries.ts` per site (one sentence per non-article route, read by both the owning page's hero and every card that references it, so they cannot drift; guarded by a first-sentence test).

## J. The estate niche-cluster registry (which niche lives on which site)

The unique-assignment principle from `REWRITE_PROGRAM.md` §9.4 applies at ESTATE level, not just page level: at the moment a niche is WRITTEN anywhere, it is owned by exactly ONE site. Two sites writing the same niche is estate-level cannibalisation; before any site opens a cluster, check this table, and record the assignment here in the same session.

What this table is NOT: a mandate to force all 89 niches into the existing sites. Each row is the DEFAULT HOME if and only if the niche is pursued as a cluster; for every niche the executing agent still holds three options, decided on discovery evidence and fit, in this order: (1) fold into the listed site where the audience genuinely overlaps that site's reader; (2) promote to its own Track 3 site where the evidence supports a standalone brand (the §6.1 queue); (3) skip for now, recorded with a reason. A niche whose audience does not fit any site's voice is skipped or promoted, never shoehorned: a page for taxi drivers on a generic-small-business site fits; a farmers cluster on the crypto site does not, and forcing fit produces the off-topic content the A* bar prohibits. Volumes are the R2D cluster figures (`expansion_research/R2D_VOLUMES.md`); the owner's coverage directive means low demand alone is not a reason to skip, but fit is.

| Site | Core niche(s) | Adjacent-niche clusters to fold into its corpus (R1 row, cluster vol/mo) |
|---|---|---|
| Property | landlords, property investors | property mgmt companies (#5, 20), property developers (#4, 210), Airbnb/FHL (#3), estate/letting agents (#6, done: agents1/wave12), landed/rural estates (#7, done: landed1), farmers conversion (#68, done: rural cluster), expats/NRL (#80, 230, per TIER2 conversion), HNW property angle (#81, 140) |
| construction-cis | CIS subcontractors, builders | plumbers (#10, 10), electricians (#11, 220), painters (#12, 0), landscapers (#13, 0), tradespeople umbrella (#14, 130), scaffolding/roofing variants within trades family |
| Medical | doctors/GPs, locums | locum doctors (#17), nurses (#23, 60), therapists/allied health (#22, 50 but 108k companies, strongest unscored signal), opticians (#20, 90), vets (#21, 120) unless either is later promoted to its own site |
| Dentists | dentists | dental associates/incorporation/practice-purchase subtopics (no separate R1 rows; deepen the core). BOUNDARY vs Medical: both corpora already cover NHS pension / McCloud / locum subjects; the split is dentist-flavoured NHS-pension and associate topics live here, doctor/GP/locum-doctor framings live on Medical, and each cluster dossier records the split per keyword family, same as the wills/Property precedent |
| Solicitors | solicitors | barristers (#29), settlement-agreement accounting/tax angle if the owner keeps it as a cluster rather than a new site (LEADGEN sweep Tier 1) |
| contractors-ir35 | IT contractors, freelancers | management consultants (#32, 680), virtual assistants (#83, 20), pilots (#67, 10), engineers day-rate angle (#51, 130) |
| digital-agency | marketing agencies | content creators/influencers (#37, 310), OnlyFans creators (#38, 160), photographers (#46, 130), interior designers (#47, 40) |
| startups-tech | startups, tech/SaaS | life sciences (#86, 10), energy/renewables (#85, 440), architects (#50, 120) if not generalist |
| ecommerce | ecommerce sellers | Amazon FBA (#36, 300), used-car dealers (#70, 80) |
| crypto | crypto traders | day/forex traders (#40, 130) |
| charities | charities | CICs (#75, 90), churches (#76, 30), schools/academies (#77, 50), sports clubs (#62, 0) |
| hospitality | restaurants, hospitality | takeaways (#54, 10), pubs (#55, 450), hotels (#56, 110), event caterers (#58, 0) |
| care | care homes | domiciliary care (#25, 0), childminders/nurseries (#26, 200), foster carers (#27, 140) |
| pharmacies | pharmacies | locum pharmacists (#18, 10), opticians only if Medical declines |
| wills-probate | probate, wills, IHT | estate administration, executor topics. BOUNDARY: BR/APR and landed-estate IHT belong to Property's landed cluster; probate process/fees belong here. Record the split per keyword family in both dossiers. |
| divorce-finances | divorce finances | pension sharing, CMS, Form E (already in build) |
| generalist | generic small business | retail (#69, 250, per TIER2 conversion), hair/beauty (#60, 60), gyms (#61, 40), taxi/PHV (#64, 420), couriers (#65, 20), hauliers (#66, 140), cleaning (#89, 10), security (#88, 0), driving instructors (#79, 60), tutors (#78, 10), franchisees (#82, 300), neurodivergent owners (#84, 40), performers family: musicians (#41, 200), actors (#42, 380), artists (#44, 260), authors (#45, 20), jewellers (#71, 0), cake makers (#72, 0), maritime/seafarers (#87, 440), travel agents TOMS cluster (#59, per TIER2 conversion), manufacturing cluster (#73, 260) unless promoted to its own site (§6.1) |

Unhomed, needing an owner call before anyone writes them: recruitment (#49, killed: reverse intent), creative/media as a standalone (#43, killed: career intent; the performers CLUSTER on generalist is the sanctioned form), footballers (#63, 50, specialist agent territory), FCA (#52, locked). New sites from §6.1 (settlement agreements, leasehold, surveys, manufacturing) each REMOVE their niche from the cluster table above at the moment the site is approved.

## K. Owner-supplied inputs (the agent must not fabricate or block on these)

Two classes. LAUNCH BLOCKERS stop a deploy; COSMETIC items ship with the recorded placeholder and the owner replaces them later. The executing agent lists the state of every row in `docs/<site>/STATE.md` at handoff; it never invents a value for any of them.

| Input | Class | Rule for the agent |
|---|---|---|
| Brand colour ramp sign-off | BLOCKER (per port) | Derive per L.2, present the swatch + contrast table, wait for a yes before Phase 1 |
| Wordmark icon (the niche's `Home` equivalent) | BLOCKER | Propose one lucide icon + one fallback in the DESIGN_DELTA; owner picks |
| Favicon set | COSMETIC | Keep the site's existing favicon until the owner ships a new one; never generate one |
| Homepage/hero imagery beyond the SVG motif | COSMETIC | The standard needs none (Property ships zero photography); if the owner wants photos, they supply them |
| Phone number | BLOCKER for schema/copy | Use the value in `niche.config.json`; if placeholder, keep placeholder and flag |
| GA4 id | Not a blocker (INFO gap per SITE_SPINUP) | Flag in STATE.md |
| GSC property + Bing import | DONE estate-wide (verified 2026-08-24, GSC `sites.list`: all live sites siteOwner; Bing registered with real domains) | Nothing to ask; young-data variant of §5.0 governs thin history |
| Font change on a live site | BLOCKER (per port) | Default is KEEP the current typeface; any switch proposed in the DESIGN_DELTA, owner yes required (§4.6.5) |
| Capture-surface scope (which interruptive/capture surfaces the port adds) | BLOCKER (per port) | Listed in the DESIGN_DELTA; approved in the same owner turn as the swatch (§4.6.6) |
| Domain purchase / DNS (new sites, ashfield) | BLOCKER at G1 | Never before G1, per the playbook |
| DataForSEO top-up | BLOCKER for Track 2 discovery | Report balance, ask once, stop if unfunded |
| Serper credits | Degraded-mode, not a blocker | Stored-harvest positions are acceptable, label them as such |
| G1 brand decisions (wills-probate, divorce-finances) | BLOCKER for their launches | Present the silent shortlist, never ask early |
| Designer engagement (per §8.6) | Programme-level decision | Default: no designer, the standard is the design |
| Deploy approval | BLOCKER, every time | Owner-triggered in that turn, no exceptions |

## L. DESIGN_DELTA.md template and the brand-ramp derivation rule

### L.1 The template (create per ported site, this exact structure, nothing else in it)

```markdown
# <SITE> DESIGN DELTA
Standard: docs/_engines/PROPERTY_STANDARD_ROLLOUT.md appendix + docs/property/DESIGN_SYSTEM.md §0.
An empty section means: Property standard, no exception.

## 1. Brand tokens (the seven swap points)
primary ramp:        <family> (50 #.. 100 #.. 600 #.. 700 #.. 800 #.. 900 #..)
neutral ramp:        slate (unchanged unless stated)
warning ramp:        amber (unchanged unless stated)
semantic overrides:  (list only vars that differ from A.1)
font:                Plus Jakarta Sans (or the assigned substitute + weights)
button constants:    colour tokens only; box model unchanged
wordmark:            icon=<lucide name>; line1="<NAME>"; line2="<DESCRIPTOR>"
backdrop motif:      <description + stroke colours light/dark>
cream surface:       <hex or "unchanged #fbfaf7">

## 2. Measured contrast table (every brand colour on white, slate-50, and navy)
| token | ground | ratio | verdict |
(4.5:1 floor; include the tick colour, the warning ramp, fine print)

## 3. Sanctioned deviations
| deviation | owner decision + date |

## 4. Owner-input state (appendix K rows)
```

### L.2 Brand-ramp derivation (when the owner has not chosen)

Default: keep the site's existing `--brand-primary` hue (it is already the live brand), snap it to the nearest Tailwind named ramp family, and use that family's 50-900 as the ramp. Measure every A.8 floor combination before proposing, INCLUDING white-on-primary-600 button text (a button-ground failure the text-shift rule does not cover); if the 600 step fails 4.5:1 for text use, shift text usages to the 700 step and say so in the delta. Present as a swatch + contrast table for a one-line owner yes (K). Differentiation check: no two ported sites share a primary ramp family where avoidable; L.3 is the check.

**When the default is degenerate, do not auto-derive; prepare 2-3 candidates and let the owner pick.** Two known degenerate classes, both real in the estate:

- **Dark/near-neutral primary** (crypto: `#0e1a3a` near-black navy, with a second burnt-orange action hue). A navy primary collides with the standard's navy grounds (primary buttons inside navy panels violate "navy never touches navy") and is near-indistinguishable from slate for the money semantics. Candidates keep the brand's navy as the GROUND identity and propose a distinct mid-saturation action ramp; a two-hue brand maps as ground hue + primary ramp, and the delta records both.
- **Primary colliding with a semantic ramp** (construction-cis: `#f97316` IS orange-500, while amber/orange carry the duty-bites and penalty-ladder semantics). The proposal must resolve the collision explicitly: either reassign the site's duty/penalty semantics to a non-brand family with measured contrasts, or shift the brand ramp; the collision analysis goes in the delta and the choice is the owner's.

**Scope of the A.8 "locked" penalty ramp, so the two rules never collide again:** what is locked estate-wide is the CONTRACT (escalating severity in distinguishable steps, every step ≥4.5:1 on its ground, first step fully saturated); the specific hues amber-700/orange-700/red-600/red-800 are PROPERTY'S derivation of that contract and are per-site re-derivable exactly when the brand collides with them, with the replacement ramp's measured contrasts recorded in the DESIGN_DELTA. Blast radius warning for reassignment: construction-cis has 128 amber/orange-6xx/7xx usages across 46 files; a reassignment is a sweep, price it.

The primary ramp must always be a mid-saturation hue distinguishable at a glance from slate (neutral), from the site's duty-bites ramp, and from its no-relief red. For a family-D BUILD with no incumbent brand font (system stack today), the font default is Plus Jakarta Sans (the standard's face); the §4.6.5 keep-current default applies only where a real typeface choice exists (still owner-gated either way, K).

### L.3 Ramp registry (fill in as ports land)

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |

## M. The fidelity reviewer brief (verbatim, use per phase)

Spawn an agent that did NOT build the phase. Its prompt carries this contract:

- You are reviewing phase <N> of the <site> port against the Property standard (this doc's appendix + DESIGN_SYSTEM.md §0). Rule zero: the standard is right; you review delivery, not design. Read-only; you fix nothing.
- For every item in the phase log, classify DELIVERED / DILUTED / DROPPED by checking the RENDERED result (dev server via `next start`, `getComputedStyle` for typography and colour), never by grepping for a class name.
- Hunt silent substitution: the builder quietly reusing the site's OLD pattern (old radius recipe, old card, old container, old heading treatment). It never shows in a diff; open the pages.
- Check the standing rules and the deliberate non-actions recorded in the phase log; undoing a deliberate non-action is a fidelity failure.
- Check cross-file couplings touched by the phase (header CTA x wordmark cap; blog CSS + renderer pairs; noscript animation release; nav data → footer derivation).
- Re-measure at 390 / 768 / 1024 / 1440: no horizontal scroll, no crowding, contract §0.8 items.
- Verify the phase's measurements file: numbers you re-take must match the log; a log that disagrees with the artefact is itself a finding.
- Verdict: FAITHFUL / FAITHFUL-WITH-GAPS / DILUTED, with counts (delivered/diluted/dropped) and every gap named with file:line. Anything but FAITHFUL returns the phase before its tag.

## N. Verification instrument spec (rebuild per programme in the session scratchpad; never scheduled, never in CI, never pointed at production)

**Route sweep (`sweep.mjs` equivalent).** Input: the site's sitemap + nav + footer + calculator registry, deduped. Per URL against `next start`: HTTP status (must be 200; record any 3xx with its target), count of unique same-site `<a href>` in the rendered HTML (the LINK FLOOR: compare per-URL against the pre-port baseline file; any decrease is a blocker), count of `data-cta` attributes, grep of the rendered text for em-dashes (U+2014, zero tolerance) and for pipeline artefacts ("verify at build", "(HP" codes). Output: one JSON baseline file (kept for the programme) + a table of deltas. Baseline is captured BEFORE the first port commit; re-baselining requires a written reason.

**Browser check (`browser_check.mjs` equivalent).** Headless Chromium against `next start` (dev server gives false CSP reds). Per route at 390 and 1440: `document.documentElement.scrollWidth <= clientWidth` (horizontal overflow, zero tolerance at 390), computed text colour vs computed background for every text node under 15px and every `text-slate-*`/fine-print class (floor 4.5:1; composite alpha before computing; normalise oklch; the Property instrument was materially wrong three times on exactly those two operations), presence of `scroll-mt-24` on every element addressed by an in-page anchor, console errors excluding the known Speed Insights path. Pass `--out` per run or runs clobber each other (this happened twice). Build in an isolated worktree if any other dev server may be running (a foreign `next dev` clobbered a phase build mid-measurement).

**Contrast maths note:** ratio = (L1+0.05)/(L2+0.05) on WCAG relative luminance; verify the instrument against two known pairs before trusting it (slate-500 on white = 4.76, slate-400 on white = 2.51).

## O. The extraction work plan (§3, item level)

Order matters; each step is one commit, additive only, Property untouched.

0. **Package plumbing first (verified 2026-08-24, hard-fails if skipped).** (a) `packages/web-shared/package.json` has an explicit `exports` map with no wildcards: every new `./design/*` path must be added to it or consumers throw `ERR_PACKAGE_PATH_NOT_EXPORTED`. (b) Dependencies: do NOT work from a fixed list; run an import census over the extracted set (grep every `import` in the moved files) and add each external to web-shared's `dependencies`. Known from the census so far: `@radix-ui/react-accordion` (accordion), `lucide-react` (icons throughout), `clsx` + `tailwind-merge` (the `cn` helper, which itself moves into `design/`), plus whatever later steps surface. Then `python scripts/check_dependency_closure.py` against the pilot as the gate. Consuming sites also need `tw-animate-css` in their own deps (Property's opening CSS block imports it).
0b. **The theming mechanism (DECIDED here, because the first coloured component otherwise stops the extractor and whatever it improvises becomes the estate architecture).** The extraction set is saturated with stock `emerald-*` utility classes (verified: `TopicSection.tsx:110`, `LeadCTAPanel.tsx:148-149`, `RelatedArticles.tsx:99`, and ~30 more components), and Property's `@theme` has no emerald remap, so a sibling's token block changes nothing about them. Mechanism: **tokenise the brand ramp as a `primary` colour scale.** In `globals-standard.css`-adjacent theme config each site defines `@theme { --color-primary-50..950: ... }`; Tailwind v4 then generates `bg-primary-600`, `text-primary-700`, `ring-primary-500/30` etc. natively. During extraction (steps 3-6), every `emerald-*` utility in an extracted component is mechanically renamed to `primary-*` (same step, same commit as the component moves; opacity modifiers and `data-[state=*]:` variants rename identically). Property pins `--color-primary-*` to the emerald values, so O.8's computed-style parity check proves the rename changed nothing. Class names stay honest, no collision with a site that wants true emerald, and a sibling's whole brand swap is its `--color-primary-*` block plus the semantic-ramp decisions in its DESIGN_DELTA. The SEMANTIC ramps (amber duty-bites, red no-relief, the penalty ladder) stay literal Tailwind ramps by default; L.2 governs per-site reassignment when a brand collides with them. Rejected alternative, recorded: per-site `@theme` remaps of `--color-emerald-*` (smaller diff but every class name then lies, and it breaks any site needing real emerald).
1. `packages/web-shared/design/layout-utils.ts`: containers, section rhythm constants, the four button recipes + focusRing with every colour literal replaced by `primary-*` utilities / `var(--brand-*)` semantic vars per 0b; `heroCreamSurface` reads `var(--hero-cream, #fbfaf7)`.
2. `packages/web-shared/design/globals-standard.css`: the design (not brand) CSS: radius chain, layered/unlayered heading split, motion keyframes + gates, `.related-card`, `.eyebrow-rule`, `.tick-draw`, marquee, glow set with rgba built from `--brand-primary` components. **Consumption mechanics (exact, because the naive instruction is a build error):** a consuming site's `globals.css` mirrors Property's opening block verbatim, then adds the standard import, THEN its token block: `@import "tailwindcss" source("..");` / `@source "../../../../packages/web-shared";` (MANDATORY for every consuming site or Tailwind never scans the shared components and their utilities silently vanish; family-D globals.css files do not have this line today) / `@import "tw-animate-css";` / `@import "@accounting-network/web-shared/design/globals-standard.css";` (path added to the exports map in step 0) / then `:root` tokens. Imports precede all other statements; token overrides come after.
3. `packages/web-shared/design/primitives/`: Prose, Eyebrow(+Rule), InlineLink, CardStack, ExampleFigureNote, FaqSection+accordion, Breadcrumb, SlimHero, NoticeCard, NumberedPagination.
4. `packages/web-shared/design/marketing/`: TopicSection/TopicHero, LeadCTAPanel, CoverageCards, ComparisonTable, ProcessTimeline, DrawnTickList, StatsCounter, PromptMarquee, ProblemStatement, ScrollGlowGroup, WhatToExpectCard, StickyCTA, NumberedReasons, WhyUsList, TestimonialsSection (quotes injected by prop).
   **API surgery is part of steps 3-6, not an afterthought (verified against the sources):** several components carry per-site imports that must become slots/props on extraction: `LeadCTAPanel` imports the per-site `LeadForm` directly (becomes a `form` slot); `TopicSection` imports `relatedItemsFromLinks` from the site's `lib/blog` (the resolver becomes an injected accessor, since blog content access is per-site by design); `TopicHero` and full-bleed `LeadCTAPanel` render the backdrop motif directly (motif-by-prop applies here, not only to chrome). Each such change alters the component API relative to Property's original; O.8's computed-style parity run is what proves the refactor preserved rendering.
5. `packages/web-shared/design/blog/`: RelatedArticles, HubArticleList, TableOfContents, BlogSidebarCta, ReadingProgress, BlogCategoryHub shell, BlogListWithSearch. **Supersedes note:** web-shared ALREADY exports pre-redesign `./content/TableOfContents` and `./content/ReadingProgress`; the design/ versions supersede them. Mark the `content/` originals deprecated in the same commit and never leave two shared implementations both live, or this step rebuilds the exact drift machine §3 exists to kill. `RelatedArticles.kindFromHref` knows only Property's route families (`/blog|/calculators|/resources|/services`); sibling route families (`/for/*`, glossaries) pass an explicit `kind` per call or extend the map site-side.
6. `packages/web-shared/design/chrome/`: PageShell, SiteHeader, SiteFooter, backdrop-motif contract (motif SVG injected by prop), wordmark contract (icon + two strings by prop), AND the nav builder (`buildPrimaryNav()` currently in `Property/web/src/lib/nav.ts`: the header's calculators group and the footer's derived columns both depend on it; without it the B/C contracts are unbuildable on a sibling).
7. Guard-test templates (parameterised by site): calculator-tabs-crawl-path, hub-article-crawl-path, nav-active-state, first-sentence. Parameterising is forking plus RESETTING the owner-decision registries: `calculator-tabs-crawl-path` embeds Property-specific exemption lists (`NO_PRIOR_INBODY_CALCULATOR_LINKS`, `OWNER_REMOVED_INBODY_LINKS`, each backed by a recorded Property owner decision) which ship EMPTY on every other site; inheriting them grants unearned exemptions. `nav-active-state` asserts against the site's real nav data and passes only if every dropdown group carries the B-mandated self-referential first child.
8. Pilot site consumes 1-7; `getComputedStyle` parity check of the pilot's rendered primitives against Property's under Property tokens. Harness mechanics: a temporary commit in the pilot's port branch swaps the pilot's token block for Property's values, `next start`, run the N instrument over the primitive set at 390 and 1440, diff computed styles against the same run on Property; revert the token commit. The swap commit never ships.

Every component keeps Property behaviour byte-identical under Property's token values; every export is a NEW path; nothing existing in web-shared changes.

## P. Per-site corpus sizing and readiness ledger

"How large" is discovery-driven, not a round number: each site's ceiling is its addressable peer-winnable volume from its own candidate-pool run, and its pace is the cohort rule (12-15 pages per cluster, Bing 28d / Google 90d reads, median >200 impressions scales, <100 kills). The floors below are minimums that make a site structurally complete at the standard; they are not caps.

| Site | Corpus floor to reach | What must exist first | Track 2 scripts risk |
|---|---|---|---|
| Family D (7 sites) | 100-150 posts, full pillar set (3-5), data-derived calculator fleet, 5+ category hubs, 2 research assets | GSC property + Bing import (Track 2 blocker, owner); discovery.json schema-verified; house_positions currency pass (most exist); hubs + category routes built during the build | LOW (blog generator + wave runner already multi-site); zero-data variant of §5.0 applies |
| construction-cis, contractors-ir35, Medical | 150-250 posts + cluster coverage on their heads | discovery.json schema-verified (files exist; legacy format lacks lanes), fresh GSC/Bing pull | Medical: flat routing, use `medical_flat_link_audit.py` |
| Dentists, Solicitors, digital-agency | 250-400 posts + cluster coverage | discovery.json schema-verified (files exist), house_positions currency pass, reconcile their undeployed corepage rewrite commits first | check per-script site parameterisation (below) |
| generalist | cluster conversions from J (retail, performers, TOMS, manufacturing...) on top of 418 | its parity programme already ran; fold J clusters into its topic pool | LOW |
| wills-probate, divorce-finances | already content-complete for launch; J boundaries recorded | G1 | none pre-launch |
| Property | maintenance + the deferred Phase D (incorporation) after SDLT reads | nothing | none |

Named risk, verify at first use per site: parts of the Track 2 QA chain grew up on Property (`pull_page_data`, `track2_*`, `qa_verdict`, `predeploy_gate --qa-batch`, equity gates). The blog generator, slug resolver, wave runner, discovery engine and indexing are proven multi-site; the track2 chain is NOT yet proven off Property. The first non-Property cluster batch budgets a half-day to generalise whatever breaks, fixes the class not the instance, and records the result here.

Estate totals at completion of the floors above, for scale intuition only: roughly 2,500 existing posts grow to ~3,500-4,000 plus pillar/calculator surfaces, before any Track 3 site. Every number above is a floor or an estimate and is labelled as such; the discovery runs replace them with measurements.

## Q. Dry-run verification record (2026-08-24)

Three adversarial execution simulations were run against this doc before any execution: (1) crypto, the family-D pilot path including the appendix O extraction; (2) construction-cis, a live family-B port; (3) settlement-agreements, the Track 3 path across this doc + playbook + spinup. ~50 findings; all BLOCKER and MAJOR findings are incorporated into the body above (execution-gate model, branch prerequisite, live-serving rule, artifact home, sibling-divergence protocol §4.6, zero-data variant §5.0, Stage 2 runnability warnings, extraction plumbing O.0/O.2/O.6/O.8, degenerate-brand rule L.2, Track 3 precedence + regulatory gate + lead-routing hazards, decisions 10-11, K reclassifications, stale-table corrections).

**Post-test verification pass (2026-08-24, owner challenge): two headline dry-run findings were FALSE, both from agents trusting stale docs/config over ground truth.** Corrected same day:

- "construction-cis consent discrepancy": false. All 17 LeadForms carry the identical owner-approved parity notice model (grep `consent_given` across `*/web/src/components/forms/LeadForm.tsx`; deployed 2026-08-19). The stale artefact was STATE.md. §4.6.7 rewritten accordingly.
- "family D has no GSC/Bing properties": false. GSC `sites.list` (run 2026-08-24, `secrets/gsc_token.pickle`): every live site is siteOwner; Bing entries confirmed via the client's GetUserSites note. The real gap was `gsc_page_client._SITE_URL_MAP` placeholders, FIXED 2026-08-24 in the same session. The "zero-data variant" was rewritten as the young-data variant.

The incident produced the binding re-derivation rule in §7 trap 5. It also demonstrates the residual risk profile of this doc: findings derived from code and API survived the owner's challenge; findings derived from STATE.md and engine maps did not.

Known open items the dry-run surfaced that a doc cannot fix (owner or build work):

1. **New-source lead-routing defaults** (`DEFAULT_CC_EXCLUDED_SOURCES` covers only property,test; per-source offer sending): any new source key configures its posture explicitly at migration time, verifying against `lead-routing.ts` at that moment (§6 precedence list).
2. **Niche screener G0 false-pass** (settlement agreements): the instrument needs its regulatory gate fixed or its output permanently subordinated to the manual REGULATORY_POSITION doc (§6.2). Instrument work, separate backlog.
3. **The reference instruments do not exist yet** (`docs/_engines/instruments/`, from appendix N): built once in the first execution session.
4. **SITE_SPINUP.md staleness** (prefix table 9/18 rows, dead CENTRAL_LEAD_PIPELINE pointer, superseded consent STOP condition): corrected in that doc when next touched; this doc's precedence rules cover the interim.
5. **Stale per-site STATE.md files estate-wide** (wave-2 "GSC remaining" items done long ago; construction-cis counts two months old): each site's Stage 0 refreshes its STATE.md as its first output.

Re-verify cheap claims at execution time; this record is a snapshot, and trap 5 applies to the doc itself.

**ROUND 2 (2026-08-24, same day, against the hardened doc, testers bound by the trap-5 re-derivation rule).** Three simulations: crypto pilot retest, construction-cis retest, Dentists Track 2 (new). Every round-1 fix re-verified HOLDS against code except one: the §4.6.2 ExitIntentModal example was itself a round-1 false fact (corrected in place; the file is dead unmounted code, disposition DELETE). New findings incorporated: the O.0b theming mechanism (primary-* tokenisation; round 2's only true blocker); O steps 3-5 API-surgery, import-census, supersede-content/, and guard-registry rules; §4.7 derivation-commands table (deployed SHA, auto-deploy posture, armed-window SQL, sites-row SQL); the L.2/A.8 lock-scope rule; the §5.0 Track-2-first variant with the stranded-passenger reconciliation (`d3e705dd`, `b8ae2269` verified NOT in main); §5.0a worklist-rebuild and GEO-reference corrections (the GEO doc's expired full-auto grant got a superseded banner in the doc itself); topic-pool dead-path and run-wave hardcoding notes; template-coverage census (~55% of a family-B surface rides §4.6.4) with the revised 2-4 day estimate; J's Dentists/Medical boundary. Code fixed same session: `deploy-and-index.ps1` stale "only property" docstring; `AI_SEARCH_GEO_PROGRAM.md` superseded banner.

Round-2 residual (open, priced, non-blocking): whether CLI worktree deploys attach git metadata (determines the §4.7 SHA path's primary vs fallback branch); crypto's missing `@source` line may mean some web-shared-only utility classes are absent from its production CSS TODAY, so the port's cutover read should expect visible changes on existing pages from the O.2 fix alone (one `next build` + DOM check settles it at pilot time); Dentists' 53 armed windows expire Sep-Oct 2026, sequencing its Stage 2 sweep after expiry or around the exclusions.

## R. Kickoff runbooks (the fresh agent's front door; one per session type)

Each runbook is complete: an agent given one of these plus this doc needs nothing else. Every runbook implicitly starts with the START-HERE five steps and ends with the living-doc reconciliation + a session summary to the owner (what shipped, what's blocked, what's next, any noise generated).

### R.1 SESSION 1: merge + instruments + extraction start
Preconditions: §8 decisions 10, 1, 2 recorded taken. Steps:
1. Passenger enumeration: for every site dir, `git log main..design/property-redesign-port --oneline -- '<Site>/'`; write the list into each affected site's STATE.md ("rides the next deploy of this site").
2. Merge `design/property-redesign-port` to main (no squash; ordinary merge). Do not deploy anything.
3. Ask the owner to trigger the Property verify deploy from main (§4.7 gives the deploy command; owner triggers, you verify the live HTML markers per §1.1's precedent).
4. Build the reference instruments from appendix N into `docs/_engines/instruments/` (sweep + browser check); validate the contrast maths against the two known pairs.
5. Begin appendix O in order: O.0 plumbing, O.0b theming mechanism, then steps 1-2. Commit per step. STOP at end of session or at any K gate; report.

### R.2 PILOT BUILD: <site> (first use: crypto)
Preconditions: R.1 complete (shared core steps 1-2 exist), scope authorised. Steps:
1. Phase 0 per §4.4 + §4.6: disposition list with deriving commands into `docs/<site>/_port/`; §4.7 table executed in full; STATE.md refreshed.
2. Complete appendix O steps 3-8 (extraction finishes inside the pilot; O.8 parity check gates everything after it).
3. Author `docs/<site>/DESIGN_DELTA.md` (template L.1; L.2 flow for the ramp; §4.6 dispositions for capture surfaces and site-specific components).
4. THE BUNDLED ASK to the owner, in the START-HERE step 5(e) plain-language format: ramp candidates (show swatches, say "this green vs this blue" not hex codes; contrast tables below the divider), wordmark icon, font proposal, capture-surface list ("should this site get the popup that appears when someone scrolls deep? Property has it"), anything else K-gated that has accumulated. One message. STOP until answered.
5. Build phases per §4.4 (foundation, chrome, templates, pages), one commit per item, tag per phase, fidelity review (appendix M) per phase, gates per §4.5.
6. Owner dev-server walk; capture new rules into this doc / the delta same session.
7. Cutover only on explicit owner yes: §4.7 SHA + §6-style deploy from clean worktree, post-deploy sweep, before/after SQL authored with caveats per §7.7.

### R.3 TRACK 2: <site> (first use: Dentists)
Preconditions: owner authorised Track 2 on the site; DataForSEO balance checked. Steps:
1. §5.0 Track-2-first rules if the site's port hasn't happened: branch from main, reconcile stranded passengers first.
2. Stage 0 in full (§5.0 + §4.7 commands): fresh pulls, indexation check, armed-window SQL, discovery.json v2 upgrade/authoring (owner-skim of lanes goes into the next bundled ask), STATE.md refresh with the diagnosis.
3. Stage 2 per §5.0a in order, with the runnability warnings heeded (author CORE_PAGES entry; rebuild worklist inputs; armed windows excluded from every sweep).
4. Stage 3 per §5.1: dossiers, packs, language pass, waves at batch size 1, QA chain, gates.
5. Per-batch deploy asks to the owner; registration + IndexNow only after each yes.
6. Reads per §5.1 step 8 cadence; record cohort verdicts in STATE.md.

### R.4 FAN-OUT sessions
Same as R.2/R.3 with the pilot's measured numbers replacing the estimates; check this doc's §8/§9 for queue position first, and appendix P for the site's prerequisites row.
