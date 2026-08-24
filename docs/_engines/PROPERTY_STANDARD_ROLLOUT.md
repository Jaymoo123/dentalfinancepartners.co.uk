# THE PROPERTY STANDARD: ESTATE ROLLOUT FRAMEWORK

Date: 2026-08-24. Status: PLAN, no owner sign-off yet, nothing here is authorised to execute.

**What this is.** The reusable instruction set for doing to every other site what was just done to Property: (Track 1) a ground-up conversion-focused redesign to a measured, binding page contract; (Track 2) a competitor-driven corpus expansion via DataForSEO; (Track 3) new sites for the accounting niches still open. It is written for an executing agent with zero memory of the Property run. It is deliberately tight: every visual and structural decision is specified or pointered to a binding doc; deviation is a defect, not a flavour choice. The only sanctioned per-site variation is the brand layer defined in §4.3.

**Why it exists.** The Property redesign and expansion worked as a process, not just an outcome, and most of the process record lives in gitignored `tmp/design_migration/` (CONTEXT.md, PLAN.md, EXECUTION.md, 15 reports, phase and fidelity logs), which will not survive a machine change. This doc durably records the repeatable recipe and composes the engine docs that already exist. It does not duplicate them.

**Reading order for an executing agent:**
1. This doc, in full.
2. `docs/property/DESIGN_SYSTEM.md` §0 (the page contract) in full, before writing any TSX.
3. The track-specific engine doc: `docs/_engines/REWRITE_PROGRAM.md` §9 + `docs/_engines/NETNEW_PROGRAM.md` + `docs/_engines/DISCOVERY_ENGINE_V2.md` (Track 2), or `docs/_engines/SITE_BUILD_PLAYBOOK_2026-07-24.md` + `docs/_engines/SITE_SPINUP.md` (Track 3).
4. `docs/<site>/STATE.md` for the target site.

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

There is **no shared theme mechanism** beyond the CSS-variable contract (`--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`, plus surface/ink/border tokens) that `packages/web-shared` components read. Brand colour is duplicated in `niche.config.json → brand.primary_color` and `globals.css`. The Property design currently has no extraction point: it lives in `Property/web/src/app/globals.css` (832 lines) + 117 components.

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

Do NOT port: the dead components (`ServiceIconGrid`, `StatsBar`, `ROIMetrics`, `ProblemSolutionSplit`, `CalculatorPreviewGrid`, `TestimonialSlider`, `ServiceTiers` local copy, `BrandLogoHero`, `PageResultCta`), which have zero consumers and reference deleted CSS. Port `CalculatorLinkCards` only together with the crawl-path guard test that names it.

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

- **Phase 0, investigate before code.** Inventory the site's current pages, components, crawlable-link counts per page (the link floor: unique outbound internal links per page must be >= current live count, binding), conversion surfaces and their `data-cta` ids, and any site-specific carve-outs (analytics continuity, experiment registries, live embeds). Write the per-page disposition list. Nothing is dismissed by category.
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

---

## 5. TRACK 2: corpus expansion (per existing site)

The engine docs are the spec; this section fixes the per-site running order and the estate-level constants. Method detail: `REWRITE_PROGRAM.md` (§9 for cluster coverage), `NETNEW_PROGRAM.md`, `DISCOVERY_ENGINE_V2.md`.

### 5.1 Per-site running order

1. **Universe.** `python scripts/derive_competitor_universe.py --site <site> --top-queries 20 --keep 15` writes the curated competitor list into `sites/<site>.discovery.json`. Sites without a discovery.json (9 of 16) need one authored first: competitors, lanes, lane_negative_tokens, topic_tokens. The lane taxonomy is per-niche judgment work; do it with an Opus pass over the site's pillar set + GSC heads, then owner-skim.
2. **Pool.** `python -m optimisation_engine.discovery.candidate_pool <site>` dry-run first, then `--spend --commit`. Budget ~$2.30/site full run. Guard: `DATAFORSEO_ABORT_AT` ($5/day default). Note the account balance was ~$4.78 at 2026-08-21; an estate sweep needs a top-up first (owner decision, §8).
3. **Cluster dossiers.** For each priority cluster, the six steps (§9.2): uncapped harvest (no volume floor, no row cap, paginate to exhaustion; the union of competitor ranked keywords + our GSC 90d + our Bing 91d, both engines mandatory), consensus map by competitor page groupings, screen with reason codes, unique assignment, equity grading (REFRAME / EXTEND / NO-PAGE, Bing graded first and more conservatively), reconciliation ledger that must balance. Dossier freeze; late finds go to a named delta list.
4. **Selection by eligibility gap** (all four rules, §1.2 above), prioritised by peer-winnable volume, never raw volume. Check frozen ground first: if the cluster's peer-winnable volume routes mostly to pages inside an armed `monitored_pages` window, the cluster defers (Property Phase D precedent: threshold ~2,000/mo unfrozen).
5. **Packs and language pass.** One research pack per target page (8 sections, permission level first, equity register from both engines, market keyword set, full competitor teardown, whitespace, deterministic acceptance criteria, stated expectation). One language pass per cluster before any page is written, producing a measured answer-pattern spec that editorial QA checks against.
6. **Write.** Batch size 1, one Opus writer per page, parallel. Cluster batches ~10-13 pages. Every writer prompt carries the autonomy clause and the competitor-URL verification clause (both mandatory, both incident-backed, `NETNEW_PROGRAM.md`).
7. **QA.** Two-track Opus QA (adversarial factual vs `house_positions.md` + editorial vs the language spec), cross-writer batched, plus the deterministic floors: query coverage, arithmetic recompute, statute verification at source, link resolution, equity preservation (every pre-rewrite query still matches or it is a named BLOCK), cluster coverage, ledger balance, competitor re-read with zero undecided themes. `qa_verdict record` written last; sha256-keyed; `predeploy_gate.py --qa-batch` must pass.
8. **Ship (owner-triggered).** Deploy from clean worktree, `register_monitored_batch.py` with both Google and Bing baselines (`--page-urls` for non-blog routes), IndexNow. One cohort per cluster, then read Bing at 14/28d and Google at 28/90d against the pre-stated success/kill numbers before scaling.

### 5.2 Site-specific prerequisites

- Every site needs `docs/<site>/house_positions.md` current before any writing (it is the seed of truth; correcting it is the first job when a page contradicts it). Sites without one get it created from the ground-truth memory set + a verification pass.
- Medical: flat routing; use `scripts/medical_flat_link_audit.py`, never `slug_resolver --fix`.
- generalist: Track 2 applies in full (it already ran a Property-standard parity programme); its design family does not change the content method.
- Small family-D sites (14-32 posts): run discovery, but expect the first finding to be that the corpus floor, not cluster coverage, is the gap; their expansion looks like early Property waves (net-new to ~100+ posts) before cluster-coverage tactics pay.
- The blog generator + wave tooling is already multi-site (`sites/*.json`, 17 site_configs). Missing configs: `sites/wills-probate.json`. Author it at Track 2 start for that site.

### 5.3 What transfers from Property without re-derivation

The lever board (`REWRITE_PROGRAM.md` §9.12): word count/depth is NOT a lever; page shape (working tool) IS; vocabulary/phrase coverage IS; register IS; sentence simplification is NOT different; internal linking is UNPROVEN (hygiene only). Any new lever driving a batch needs two independent corroborations or an isolated monitored experiment. Domain-trust reality check: Property's structural diagnosis found position gated by domain age/referring domains where we already appear; eligibility (new pages) is the part content fixes. Expect the same on every sibling; do not promise position lifts from rewrites alone.

---

## 6. TRACK 3: new sites for open niches

Build process is already fully specified: `SITE_BUILD_PLAYBOOK_2026-07-24.md` (phases 0-6 + G1, proven twice) + `SITE_SPINUP.md` (infrastructure). New sites are born at the Property standard: Track 1's §4 spec is the scaffold template from day one (post-extraction, the scaffold consumes the shared core; there is no "old design then port" step). Amend the playbook's scaffold source (currently `construction-cis/web`) to the standard-bearer site once the first port lands.

### 6.1 The niche ledger

Universe: `expansion_research/R1_NICHE_CANDIDATES.md` (89 rows) + `R2*` scoring + `TIER2_VERDICTS.md` + `expansion_research/buyer_demand/LEADGEN_NICHE_SWEEP.md`. The 89-row list is EXHAUSTED as a source of scored winners; full coverage of "every accounting niche" requires a fresh R1 enumeration pass (playbook exists: autocomplete sweep + sector-nav mining + SIC counts + DataForSEO).

Open, with positive evidence, in priority order:

| Candidate | Evidence | Note |
|---|---|---|
| Settlement agreements / employment | 9,900/mo @ £41.59 CPC, KD 1 | Best ratio in the whole dataset; could plug into Solicitors brand rather than a new site (`docs/settlement-agreements/` exists) |
| Leasehold enfranchisement / RTM | 1,000/mo KD 0 | Adjacent to Property (`docs/leasehold/` exists; Property already has the pillar); decide site vs cluster |
| Property professional surveys | KD 0 family | party wall / asbestos / right-of-light |
| Manufacturing & engineering | Tier-1 scored #6, research in `expansion_research/tier1_manufacturing/` | The one Tier-1 pick with research but no site; needs the live-SERP confirmation that never happened |
| Tier-2 sweep picks | commercial EPC/MEES, MVL, landlord compliance (EICR 18,100/mo), H&S consultancy, trademark | |
| Never-scored tail (~19 rows) | therapists/allied health (108k companies), opticians, vets, childminders, foster carers, content creators, day traders, performers, architects, hair/beauty, gyms, taxi, hauliers, used-car dealers, schools, driving instructors, franchisees, maritime, cleaning | Needs R2-style scoring before any build |

Recorded NO-GOs, with the killing constraint on file: farmers/rural (deepest rival field researched; converted to Property's `rural-estates` cluster instead), expats (converted to Property NRL/expat waves), retail (generalist cluster), FCA-regulated, travel/TOMS, recruitment (reverse intent), creative/media (career intent). Locked-out verticals (regulatory): FCA-adjacent consumer finance, equity release, funeral plans, business energy, immigration, marketplace-locked trades/tutoring.

The owner's stated intent for this programme is coverage "regardless of how small we deem the search demand". That conflicts with the recorded NO-GOs only where the constraint was demand-sized; where the constraint is regulatory (FCA, claims-management) or competitive-structural (farmers), the evidence stands and the recorded conversion path (cluster on an existing site) is the coverage mechanism. Building a dedicated site for a NO-GO niche is an explicit owner override, per niche (§8).

### 6.2 Standing constraints on every new site

From the playbook, unchanged: Opus-only content bodies; A* bar; faceless authority (no named experts, no regulated-activity claims); Ashfield Trading entity; brand/domain deferred to G1, never ask early, greppable placeholders; batch size 1; calculator fleet derived from data (R1/R2/R3 rules), never a round number; fact-verification queue from day one; frozen storage prefix registered in `SITE_SPINUP.md` before code.

---

## 7. Traps and standing rules (incident-backed, generalise to every site)

The full incident log is in the Property STATE/DESIGN_SYSTEM docs; these are the ones that WILL recur on sibling ports:

1. **The unlayered heading rule.** Tailwind v4: unlayered author CSS beats every layered utility. Property ships `font-weight`/`letter-spacing` for h1-h6 in `@layer base` but `line-height: 1.2` deliberately unlayered; layering it moves 2,214 headings. Carry the split exactly; verify with `getComputedStyle` over routes at 1440 and 390, never screenshots or class names.
2. **Agents misreport measurements.** Long-running agents recall figures instead of re-reading and write confident wrong numbers. Rules: append every number to a measurements file with its command at the moment taken; quote only from that file; instruments can be wrong (Property's contrast checker was materially wrong three times), so name the instrument; the reviewer checks the log against the artefact.
3. **Silent substitution.** The most common port failure: the builder quietly reuses the old site's pattern. Only an independent reviewer reading the rendered DOM catches it.
4. **Breakpoint interaction across files.** The header incident: CTA appeared at the same breakpoint the wordmark's width cap lifted; both classes harmless alone, defect only in the overlap. No test catches it; the §0.8 review at 390/768/1024/1440 does.
5. **Stale premises inherited as fact.** "Live on 16 pages" was already stale when written (real count: 4). Re-measure before acting on any count in a doc, including this one.
6. **Analytics continuity is a carve-out, not an afterthought.** Moving a CTA's breakpoint moves its volume between instrumented ids (`header_book` vs `header_book_mobile`: sum both across the change date). `vw_cta_performance` groups without page_path, so never reuse one cta_id across routes. Dropping a form_id that a deploy-watch baseline counts fires a false alert at the owner: restate the baseline in the same commit.
7. **Bot-gate history.** Traffic figures in docs written before 2026-08-23 are inflated ~12% (passive_session backfill). Re-pull before any before/after conversion read; Property's own read is `scripts/property_design_ab.sql` with its two traps documented in-file. Every sibling cutover gets the same treatment: a before/after SQL with whole-UTC-day windows, cutover day excluded, per-day normalisation, and its preconditions written into the file.
8. **Cutover spends attribution.** A redesign re-baselines every armed `monitored_pages` window on the site knowingly (Property DECISION A1). Schedule ports away from clusters mid-measurement, or accept and annotate the spend.
9. **Ownership of noise.** Failed CI and failed deploys email the owner; count and report them. No new monitor/alert/cron/email/interruptive UI without asking first, ever, including verification scripts (never scheduled, never promoted into `scripts/` or CI).
10. **False reassurance copy.** Copy beside any capture field is checked against that site's privacy policy, every time (Property shipped two false claims to the working tree and caught them in self-audit).
11. **Deploy mechanics.** Clean worktree at a pushed SHA, short path (`C:/dep`), framework preset must be `nextjs` (null preset = every route 404s), env vars pasted without newlines, `check_dependency_closure.py` before every deploy.

---

## 8. Owner decisions required before execution

1. **Extraction (§3):** extract the Property visual core into web-shared (recommended), or per-site copies. Blast radius: additive-only exports, Property unaffected until it opts in. Revert: delete the new export paths.
2. **Sequencing (§9):** approve the pilot order or reorder by commercial priority.
3. **generalist:** keep its bespoke design (recommended, on file as deliberate) and run Track 2 only, or bring it onto the Property standard.
4. **digital-agency:** port position (recommended: last among live family-B sites; its bottleneck is indexing, not design).
5. **DataForSEO top-up** for the estate discovery sweep (~$2.30/site x ~10 sites with real corpora; balance was ~$4.78).
6. **Designer involvement:** the Property run bought 11 sessions of professional design that the standard now encodes. Sibling ports need no designer by default (the standard IS the design); confirm, or commission per-site brand layers (ramp, wordmark icon, motif) from Double Wired Creative while agents do the rest.
7. **NO-GO overrides (§6.1):** whether "every niche" includes dedicated sites for evidence-killed niches, per niche, or accepts the cluster-conversion path as coverage.
8. **Fresh R1 enumeration pass** to get beyond the exhausted 89-row universe (needed for genuine full coverage).
9. **wills-probate / divorce-finances:** fold the design port into their pre-G1 prep (recommended: cheapest possible port, zero cutover risk) and schedule G1.

## 9. Recommended sequencing (pending decision 2)

Each step gated on the previous one's owner review; one site in flight per track at a time; corpus track can run on a different site than the design track in the same week (no shared files except web-shared and engine configs, additive edits only, the playbook's coordination rules apply).

1. **Extraction + pilot D:** extract shared core; port one family-D site (crypto or ecommerce, smallest live surfaces) end to end including its DESIGN_DELTA, guard tests, owner dev-server walk. This validates the extraction, the brand-swap recipe, and the per-site cost estimate.
2. **Pilot B:** construction-cis (healthy, mid-size, representative family B). This validates the port recipe on a full existing page set with the link floor.
3. **Fan out Track 1:** remaining family D (6 sites, batched), then family B by conversion upside: Solicitors, Dentists, Medical, contractors-ir35, digital-agency last. wills-probate + divorce-finances ported inside their G1 prep whenever G1 is scheduled.
4. **Track 2 in parallel**, biggest corpora first (they have the query data that feeds the method): generalist, Dentists, Solicitors, digital-agency (content eligible even while design waits), construction-cis, Medical, contractors-ir35, then family D corpus-building waves.
5. **Track 3** after the first two pilots prove the standard scaffold: settlement agreements (or Solicitors cluster, per decision), leasehold decision, manufacturing confirmation, fresh R1 pass, then the scored queue.

Cost calibration from the Property run (the only honest anchor): Property's port was ~15 hours of serial phase agents plus ~a day of investigation on a 252-file designer diff against the estate's largest site. Siblings have no designer diff to reconcile: expect a family-D port at a fraction of a day of agent time plus review, a mid family-B site at 1-2 days, Dentists/Solicitors/agency at 2-4 days, each plus the owner dev-server walk. Corpus discovery is ~1 session + ~$2.30 per site; each cluster batch thereafter ran at roughly a day including QA on Property. These are estimates, labelled as such; the pilots exist to replace them with measurements.

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
- Right: `<nav aria-label="Footer">` `grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4`. Columns DERIVED, never hand-listed: Services = children of the services nav item; Resources = children of the primary resources pillar; Calculators = first tool of each of the first 5 registry categories + "All calculators"; Company = About / Contact / Locations / Book a consultation. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` in `ul.space-y-2`.
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

Posts to `/api/leads/submit`. Payload: `full_name, email, phone, role, message` (composed from situation/prompted/callGoal), `source` (= `niche.content_strategy.source_identifier`, which must equal `site_key`, the PF-07 rule), `source_url, submitted_at, consent_given: true, consent_text, consent_at, visitor_id, session_id, extras, captureMode?`. Consent is a NOTICE, not a tick-box, on Property (legitimate interests, DSA Annex B.1); sites with a rendered checkbox must byte-match `consent_text` to the visible label (LD-04); never hardcode consent on a site whose model requires the checkbox.

Success path: first-party `onLead` event + GA `generate_lead` (`event_label: <site>_<role>`), booking-nudge token set (+14 days), then `router.push(thank-you?bt=<signed token>&rt=<return path>)` after 800ms, unless `redirectOnSuccess={false}` (calculator pages, blog posts). Phone soft-fail keeps the reader on the form with a "check that number" error.

INVARIANTS: LeadForm renders ONLY on a white/light surface (labels are slate-900; the navy-ground variant shipped invisible labels at 1.00:1 on 783 articles and on two sibling sites, so check generalist and digital-agency during their ports). `useFormTracking("lead_form")` wired. Honeypot present. Consent fields only from rendered UI or the notice pattern, never inferred.

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

The unique-assignment principle from `REWRITE_PROGRAM.md` §9.4 applies at ESTATE level, not just page level: every niche from the 89-row universe (`expansion_research/R1_NICHE_CANDIDATES.md`) is owned by exactly ONE site, either as the site's core or as a named content cluster. Two sites writing the same niche is estate-level cannibalisation; before any site opens a cluster, check this table, and record new assignments here in the same session. Volumes are the R2D cluster figures (`accountant for X` family, `expansion_research/R2D_VOLUMES.md`); "regardless of demand" (the owner's coverage directive) means every assigned cluster gets at least one cohort, but demand still sets its ceiling and read schedule.

| Site | Core niche(s) | Adjacent-niche clusters to fold into its corpus (R1 row, cluster vol/mo) |
|---|---|---|
| Property | landlords, property investors | property mgmt companies (#5, 20), property developers (#4, 210), Airbnb/FHL (#3), estate/letting agents (#6, done: agents1/wave12), landed/rural estates (#7, done: landed1), farmers conversion (#68, done: rural cluster), expats/NRL (#80, 230, per TIER2 conversion), HNW property angle (#81, 140) |
| construction-cis | CIS subcontractors, builders | plumbers (#10, 10), electricians (#11, 220), painters (#12, 0), landscapers (#13, 0), tradespeople umbrella (#14, 130), scaffolding/roofing variants within trades family |
| Medical | doctors/GPs, locums | locum doctors (#17), nurses (#23, 60), therapists/allied health (#22, 50 but 108k companies, strongest unscored signal), opticians (#20, 90), vets (#21, 120) unless either is later promoted to its own site |
| Dentists | dentists | dental associates/incorporation/practice-purchase subtopics (no separate R1 rows; deepen the core) |
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
| GA4 id, GSC/Bing verification | Not a blocker (INFO gap per SITE_SPINUP) | Flag in STATE.md |
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

Default: keep the site's existing `--brand-primary` hue (it is already the live brand), snap it to the nearest Tailwind named ramp family, and use that family's 50-900 as the ramp. Measure every A.8 floor combination before proposing; if the 600 step fails 4.5:1 on white for text use, shift text usages to the 700 step and say so in the delta. Two sites may not share a primary ramp family with an adjacent site in the header nav of the parent (differentiation check against the table in L.3 as ports land). Present as a swatch + contrast table for a one-line owner yes (K).

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

1. `packages/web-shared/design/layout-utils.ts`: containers, section rhythm constants, the four button recipes + focusRing with every colour literal replaced by `var(--brand-*)` / semantic vars; `heroCreamSurface` reads `var(--hero-cream, #fbfaf7)`.
2. `packages/web-shared/design/globals-standard.css`: the design (not brand) CSS: radius chain, layered/unlayered heading split, motion keyframes + gates, `.related-card`, `.eyebrow-rule`, `.tick-draw`, marquee, glow set with rgba built from `--brand-primary` components. Consumed via one `@import` in a site's globals.css below its token block.
3. `packages/web-shared/design/primitives/`: Prose, Eyebrow(+Rule), InlineLink, CardStack, ExampleFigureNote, FaqSection+accordion, Breadcrumb, SlimHero, NoticeCard, NumberedPagination.
4. `packages/web-shared/design/marketing/`: TopicSection/TopicHero, LeadCTAPanel, CoverageCards, ComparisonTable, ProcessTimeline, DrawnTickList, StatsCounter, PromptMarquee, ProblemStatement, ScrollGlowGroup, WhatToExpectCard, StickyCTA, NumberedReasons, WhyUsList, TestimonialsSection (quotes injected by prop).
5. `packages/web-shared/design/blog/`: RelatedArticles, HubArticleList, TableOfContents, BlogSidebarCta, ReadingProgress, BlogCategoryHub shell, BlogListWithSearch.
6. `packages/web-shared/design/chrome/`: PageShell, SiteHeader, SiteFooter, backdrop-motif contract (motif SVG injected by prop), wordmark contract (icon + two strings by prop).
7. Guard-test templates (parameterised by site): calculator-tabs-crawl-path, hub-article-crawl-path, nav-active-state, first-sentence.
8. Pilot site consumes 1-7; `getComputedStyle` parity check of the pilot's rendered primitives against Property's under Property tokens (N instruments) before any further port.

Every component keeps Property behaviour byte-identical under Property's token values; every export is a NEW path; nothing existing in web-shared changes.

## P. Per-site corpus sizing and readiness ledger

"How large" is discovery-driven, not a round number: each site's ceiling is its addressable peer-winnable volume from its own candidate-pool run, and its pace is the cohort rule (12-15 pages per cluster, Bing 28d / Google 90d reads, median >200 impressions scales, <100 kills). The floors below are minimums that make a site structurally complete at the standard; they are not caps.

| Site | Corpus floor to reach | What must exist first | Track 2 scripts risk |
|---|---|---|---|
| Family D (7 sites) | 100-150 posts, full pillar set (3-5), data-derived calculator fleet, 5+ category hubs, 2 research assets | discovery.json authored; house_positions.md created + verified; blog hubs + category routes built during the port | LOW (blog generator + wave runner already multi-site) |
| construction-cis, contractors-ir35, Medical | 150-250 posts + cluster coverage on their heads | discovery.json (contractors/medical missing), fresh GSC/Bing pull | Medical: flat routing, use `medical_flat_link_audit.py` |
| Dentists, Solicitors, digital-agency | 250-400 posts + cluster coverage | discovery.json, house_positions currency pass | check per-script site parameterisation (below) |
| generalist | cluster conversions from J (retail, performers, TOMS, manufacturing...) on top of 418 | its parity programme already ran; fold J clusters into its topic pool | LOW |
| wills-probate, divorce-finances | already content-complete for launch; J boundaries recorded | G1 | none pre-launch |
| Property | maintenance + the deferred Phase D (incorporation) after SDLT reads | nothing | none |

Named risk, verify at first use per site: parts of the Track 2 QA chain grew up on Property (`pull_page_data`, `track2_*`, `qa_verdict`, `predeploy_gate --qa-batch`, equity gates). The blog generator, slug resolver, wave runner, discovery engine and indexing are proven multi-site; the track2 chain is NOT yet proven off Property. The first non-Property cluster batch budgets a half-day to generalise whatever breaks, fixes the class not the instance, and records the result here.

Estate totals at completion of the floors above, for scale intuition only: roughly 2,500 existing posts grow to ~3,500-4,000 plus pillar/calculator surfaces, before any Track 3 site. Every number above is a floor or an estimate and is labelled as such; the discovery runs replace them with measurements.
