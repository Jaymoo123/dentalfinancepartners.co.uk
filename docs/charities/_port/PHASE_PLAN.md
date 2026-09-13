# charities design port — phase plan (phases 0 to 6)

Written 2026-09-13. **Planning only. This document changes no code and no content.**

Site key `charities`. Display name **Trustee Tax**. Brand primary `#1a5c4a`
(`charities/niche.config.json:22`). LIVE at `www.trusteetax.co.uk`.

Companion artefacts, do not duplicate them here:
`PHASE0_CLAIMS_LEDGER.md` (39 rows, 25 serious), `sweep_baseline.json` (66 URLs,
644 internal links), `browser_baseline.json` (44 routes x 4 widths).

**Numbering: the PLAYBOOK default, unmodified. Chrome is ONE phase (phase 1).**
Do not copy the Medical split. If any agent proposes splitting a phase mid-port, the
split is written into this table in the same commit or the tag numbers stop meaning
what they say.

Tags: `port-charities-phase0` … `port-charities-phase6`.

---

## 0. Corrections to the manager's brief (verified against source)

Recorded first because the rest of this plan depends on them.

| # | Brief said | Source says | Where |
|---|---|---|---|
| C1 | "**0 `data-cta` on the entire site**" | 0 **rendered** across the 66 swept URLs, but **2 attributes exist in source** and render conditionally | `src/app/thank-you/page.tsx:107-108`: `data-cta="thankyou-return-article"`, `data-cta-placement="thank_you"`, inside `{returnPath && …}`. `/thank-you` is NOT in `sweep_baseline.json` at all |
| C2 | `analytics/ConsentToggle` is an "**ORPHAN, 0 call sites**" | It is **mounted**, in the footer | `src/components/layout/SiteFooter.tsx:72` |
| C3 | calculator slugs `gift-aid`, `independent-examination-audit-checker`, `gasds` | Those are the **file** names in `src/lib/calculators/tools/`. The **URL slugs** are `/calculators/gift-aid-calculator`, `/calculators/independent-examination-vs-audit-checker`, `/calculators/gasds-small-donations-calculator` | `browser_baseline.json` keys |
| C4 | "35 page routes (excl. admin/API)" | **26 public `page.tsx` files**, **72 public page route instances**, plus 4 `/research/*/data` route handlers. 5 more `page.tsx` are the admin console, out of scope | `find src/app -name page.tsx` = 31 |
| C5 | blog "category" (singular) | **8 categories**, derived from `category:` frontmatter | `grep -h "^category:" content/blog/*.md \| sort -u` |

**New defect found while verifying, not in the brief (see R-1):** the shipped CSS
bundle contains **zero `.prose` rules** and **zero `.section-label` rules**.
`@tailwindcss/typography` is not a dependency and `globals.css` declares no `@plugin`.
Every blog body and every guide body is rendered into `class="prose prose-neutral"`
and is currently **completely unstyled**. Deriving command:

```
curl -s http://localhost:3117/_next/static/css/699ba6ca7c8185a8.css | grep -c "\.prose"   # 0
curl -s http://localhost:3117/_next/static/css/699ba6ca7c8185a8.css | grep -c section-label  # 0
```

That is 24 blog posts + 8 guides, i.e. the two largest content surfaces on the site.
It is a live defect, not design debt, and it is phase 2/3 scope with a phase-1 token
prerequisite.

Everything else in the brief was confirmed true: production SHA `958460de`, zero
`design/**` kit imports, no site header component, 23-line `globals.css` with no
`@layer`/`@theme`/`@source` for the kit, 0 locations, 0 magnets, 791-line homepage,
`tw-animate-css` and `@vercel/speed-insights` absent, `dangerouslySetInnerHTML` blog
bodies, 10 site-local components.

---

## 1. Per-site parameterisation (playbook §8, items 1 to 11)

| # | Item | Value for `charities` | Deriving command / file |
|---|---|---|---|
| 1 | Site key / display name / domain / `source_identifier` | `charities` / **Trustee Tax** / `www.trusteetax.co.uk` / site key `charities` | `charities/niche.config.json` (`niche_id`, `display_name`, `domain`, `content_strategy.site_key`) |
| 2 | Production SHA | `958460de`, READY | `sweep_baseline.json.sha` + Vercel `targets.production` |
| 3 | Committed-but-undeployed changes riding the cutover | **Zero in `charities/`.** Three shared-kit files it consumes are ahead of production: `packages/web-shared/components/ServiceTiers`, `leads/capture-steps` (which pulls `leads/MiniCapture`), `tools/components/Calculator`. That is the entire baseline delta | `git log 958460de..HEAD -- charities/` |
| 4 | Armed `monitored_pages` rows | **UNVERIFIED — manager to query before phase 1.** The cutover re-baselines whatever is armed; if rows are armed, their windows are recorded in STATE.md at cutover, not now | Supabase `monitored_pages where site='charities'` |
| 5 | Funnel evidence vs Property, post bot-gate | **UNVERIFIED — manager only.** Required before the cutover read, not before phase 1. See item 11 for why the after-reading is unusually clean on this site | `vw_cta_performance`, `estate_kpis` |
| 6 | Link-floor baseline | `docs/charities/_port/sweep_baseline.json` — 66 URLs, 644 internal links, 0 CTAs, 0 dashes. Companion `browser_baseline.json` — 44 routes x 4 widths | committed |
| 7 | Brand tokens, warning ramp, wordmark, motif | Primary `#1a5c4a` (**one colour, no accent hex exists**). Supporting hexes already hardcoded on the homepage: `#154a3b` (19), `#0f2e24` (3), `#2d7a62` (4), grounds `#fafaf9` (13), `#f0f7f4` (6), `#fafaf7` (5). Measured on white: `#1a5c4a` **7.85**, `#154a3b` **10.12**, `#0f2e24` **14.62**, `#2d7a62` **5.16**. Converter self-tested: slate-500 = 4.76, slate-400 = 2.56, both correct. **Warning / duty / deadline semantics: OWNER DECISION, no ramp exists.** Wordmark and motif: none today | `grep -rhoE "#[0-9a-fA-F]{6}" src --include=*.tsx \| sort \| uniq -c` |
| 8 | Retirement list / delete list | **Retire:** the literal hexes above (to tokens), `className="section-label"` (defined nowhere — either define it or delete it, do not leave it), the bare `prose prose-neutral` reliance (R-1). **Delete: NOTHING.** No orphan component was found; the one the brief named is mounted (C2). No route is deleted, no URL changes | §4 below |
| 9 | Kit components unusable for this site (T12) | Decided per component in §2. Standing bans: `design/primitives/FaqSection` is **not adoptable on the blog post template** without an owner decision, because this site renders **no visible FAQ block at all** while `buildFaqJsonLd` publishes FAQ answers in JSON-LD (`src/app/blog/[category]/[slug]/page.tsx:70`). That is already a T17 defect; adopting an accordion would entrench it rather than fix it. `design/marketing/WhatToExpectCard` default props publish a fee line nobody authored — banned unless every prop is passed. `NumberedReasons` keyframe dependency must land with the tokens |
| 10 | `house_positions.md` sections in use | HP 1-6 (scrutiny thresholds), 12 (small trading exemption), 14/16/17/19 (Gift Aid + GASDS), 20/21/27 (VAT, rates, NIC/EA). All confirmed clean by the phase-0 ledger | `docs/charities/house_positions.md` |
| 11 | **Kit chrome props this site MUST pass** | See §1.1. This is the item the brief asked to be spelled out | |

### 1.1 Item 11 in full: what this site passes, and what it means for the cutover read

Playbook §8.11 exists because a port that passes nothing silently inherits **Property's**
literals and splits the site's own live funnel series at the cutover. On this site the
arithmetic is different, and better.

| Prop / token | Kit default | What charities passes | Why |
|---|---|---|---|
| `SiteHeader.ctaContactGoal` | `"form"` (Property's literal) | **Pass explicitly. Recommended value `"contact"`.** | There is **no pre-port header CTA to preserve** — there is no header component at all. So this port does not preserve a goal, it **introduces** one. Passing it explicitly makes the value a decision with a receipt, rather than Property's convention inherited by accident |
| `SiteHeader.ctaMobilePlacement` | `"mobile_menu"` (Property's literal) | **Pass explicitly. Recommended value `"header_mobile"`.** | Same reasoning. This is the easiest of the three to miss: the drawer renders only when open, so **no SSR crawl and no source review will ever see it**. Verify by reading the shipped client bundle, not the page |
| `SiteFooter.showBuilderCredit` | `true` | **Pass nothing.** | Owner ruling 2026-09-11 made the studio credit estate-wide. The default is already correct; do not reintroduce a `false` "fix" |
| `SiteHeader.wordmarkAccentColor` | undefined → `primary-600` | **Do not pass it in phase 1.** Decide from the phase-1 `browser_check.mjs` output | `#1a5c4a` is not a Tailwind ramp step, so the wordmark and the CTA may render two different greens. That is a measurement, not a guess. If they differ, pass `#1a5c4a` |
| `--brand-primary-text` | falls back to `--brand-primary` | **Do not define.** | `#1a5c4a` measures **7.85** on white, well clear of the 4.5 text floor. Medical needed this token because copper measured 3.79. A site that does not define it renders byte-identically |
| `--brand-primary-ground` | falls back to `--brand-primary` | **Do not define.** | White on `#1a5c4a` is the same **7.85**. Safe as a ground under a white label |
| `BlogSidebarCta.ctaPlacement` / `.buttonLabel` / `.buttonClassName` | `"sidebar"` / `"Book a call"` / primary-600 recipe | Pass `ctaPlacement="blog_sidebar"` and per-category `buttonLabel`; pass `buttonClassName` only if the token ramp does not already produce the brand ground | Placement is a live `vw_cta_performance` dimension |
| `BlogCategoryHub.heading` | undefined | Pass per hub where the h1 should differ from the breadcrumb label | 8 categories, §5 F-2 |
| `TableOfContents.stickyDesktop` | `true` | Pass **deliberately**, per host, and record which | T32: two viewport clamps in one column is invisible in source review |

**What ZERO pre-port `data-cta` means for the cutover funnel comparison — state this
to the owner in these words:**

1. The `data-cta` count in `sweep_baseline.json` is **0**, and after phase 1 it will be
   **non-zero on every route**. **That is expected and is not a regression.** On a site
   that already had header CTAs, a rising count would be the alarm; here the absence of
   a rise would be.
2. There is **no historical `cta_click` series for this site to split**, because nothing
   ever emitted one. T22 (the segmentation-rewrite trap) therefore **cannot fire here**.
   The port creates the series from nothing.
3. The consequence: **there is no before-and-after CTA funnel comparison to make.** Any
   post-cutover reading of `vw_cta_performance` for `charities` has **no baseline** and
   must be read as a new series starting at the cutover, never as a delta. Anyone who
   reports "CTA clicks up after the port" is reporting the difference between zero and
   something, which is a tautology.
4. What *can* be compared across the cutover is lead volume and form-submit rate, which
   do have history (`LeadForm`, `MiniCapture`, `BookingPicker` all predate the port).
   Those are the funnel numbers the cutover read uses.
5. `cta_snapshot.mjs` still runs at every chrome/CTA-touching phase, for a different
   reason: to pin the **new** triples once they exist, so a later phase cannot silently
   flip them. Its first run is an establishing capture, not a diff.
6. The one real pre-existing triple, `thankyou-return-article` / `thank_you`
   (`src/app/thank-you/page.tsx:107-108`), **must survive the port byte-identical**.
   It is conditional on a `return` query param, so it will not appear in any crawl:
   the phase-6 package that owns `/thank-you` proves it by grep AND by curling the
   route with the param set.

---

## 2. Kit adoption classification

**AS-IS** = adopted unchanged. **PROP** = adopted with a supported §8.11 hook.
**LOCAL** = site-local, kit cannot serve it. This site imports **zero** `design/**`
modules today, so every AS-IS and PROP row below is a net-new adoption.

| Need | Kit component | Class | Note |
|---|---|---|---|
| Tailwind sees kit classes | `@source` directive | **BLOCKER** | `globals.css:2` is `@import "tailwindcss" source("..")`, which scans `src/` only. **Until an `@source` covering `packages/web-shared` lands, every kit component renders with no styles at all.** R-2 |
| Page shell | `design/chrome/PageShell` | PROP | no local equivalent exists; net new |
| Header | `design/chrome/SiteHeader` | PROP | **net new — there is no header today.** §1.1 |
| Footer | `design/chrome/SiteFooter` | PROP | replaces local `layout/SiteFooter.tsx`; the `ConsentToggle` mount at line 72 **must survive** (C2) |
| Breadcrumb | `design/primitives/Breadcrumb` | AS-IS | local `ui/Breadcrumb.tsx` has only **3** importers (the 3 legal pages) |
| Blog index | `design/blog/BlogListWithSearch` + `NumberedPagination` | PROP | 24 posts, one page today |
| Category hub | `design/blog/BlogCategoryHub` | PROP | 8 categories |
| Hub article list / related | `design/blog/HubArticleList`, `RelatedArticles` | AS-IS | |
| Blog sidebar CTA | `design/blog/BlogSidebarCta` | PROP | `ctaPlacement`, `buttonLabel` |
| Table of contents | `content/TableOfContents` | PROP | `stickyDesktop` chosen per host (T32) |
| Reading progress | `design/blog/ReadingProgress` | AS-IS | net new |
| Article body typography | — | **LOCAL, MANDATORY** | R-1. Either add `@tailwindcss/typography` as a declared dependency (T24: declared in the same commit) or author the prose rules in `@layer components`. **Manager decision, taken in phase 1, not by a builder** |
| Post FAQ block | `design/primitives/FaqSection` | **GATED** | no visible FAQ exists; JSON-LD asserts answers the page never shows. Owner/manager decision, item 9 |
| Hero / eyebrow / notice / figure note / page blocks | `design/primitives/*` | AS-IS | |
| Comparison table | `design/marketing/ComparisonTable` | AS-IS | forces a "Most recommended" pill (T12/T13) — read the defaults before omitting a prop |
| Coverage cards | `design/marketing/CoverageCards` | AS-IS | `/for` (2), `/services` (5), `/guides` (8) indexes |
| Process timeline / problem statement / numbered reasons / why-us / drawn ticks / topic section / lead CTA panel / stats counter | `design/marketing/*` | AS-IS or PROP | homepage composite, phase 5. `TopicSection.bullets` where published prose carries lists |
| What to expect | `design/marketing/WhatToExpectCard` | **AS-IS BANNED** | default props publish a fee line (T12). Adoptable only with every prop passed |
| Testimonials | `design/marketing/TestimonialsSection` | **OWNER-GATED** | the claims ledger's owner-decision tier covers social proof. `src/app/page.tsx:656` already says "Real outcomes"; do not build a testimonial surface until those rows close |
| Service tiers | `packages/web-shared/components/ServiceTiers` | AS-IS | already consumed (`services/page.tsx`, `thank-you/page.tsx`); **ahead of production** (item 3) |
| Mini capture | `leads/capture-steps` → `leads/MiniCapture` | PROP | already consumed; **ahead of production** |
| Calculator engine | `tools/components/Calculator` | AS-IS | already consumed; **ahead of production** |
| Lead form | `src/components/forms/LeadForm.tsx` (473 lines) | LOCAL | 2 importers, kit has no equivalent |
| Booking picker / details form | `src/components/forms/*` | LOCAL | |
| Calculator client / result CTA / site MiniCapture | `src/components/calculators/*` | LOCAL | restyle only |
| Research charts | inline in the 4 research pages | LOCAL | bespoke; restyle only, never re-plot |
| Embed surface | `src/app/embed/[slug]/page.tsx` | **LOCAL, NO CHROME** | renders inside a third party's iframe. "No PageShell" is a positive requirement |
| Admin console | `web-shared/console/*` | NOT TOUCHED | 5 `page.tsx`, out of scope, not swept |

---

## 3. Route census (72 public page instances, 26 page files)

| Route shape | Instances | Page file | Phase |
|---|---|---|---|
| `/` | 1 | `src/app/page.tsx` (791 lines, all sections inline) | 5 |
| `/services` | 1 | `src/app/services/page.tsx` | 5 |
| `/services/[slug]` | 5 | `src/app/services/[slug]/page.tsx` | 5 |
| `/for` | 1 | `src/app/for/page.tsx` | 5 |
| `/for/[slug]` | 2 | `src/app/for/[slug]/page.tsx` | 5 |
| `/blog` | 1 | `src/app/blog/page.tsx` | 2 |
| `/blog/[category]` | 8 | `src/app/blog/[category]/page.tsx` | 2 |
| `/blog/[category]/[slug]` | 24 | `src/app/blog/[category]/[slug]/page.tsx` | 2 |
| `/guides` | 1 | `src/app/guides/page.tsx` | 3 |
| `/guides/[slug]` | 8 | `src/app/guides/[slug]/page.tsx` | 3 |
| `/calculators` | 1 | `src/app/calculators/page.tsx` | 4 |
| `/calculators/[slug]` | 3 | `src/app/calculators/[slug]/page.tsx` | 4 |
| `/embed/[slug]` | 3 | `src/app/embed/[slug]/page.tsx` | 4 |
| `/research` | 1 | `src/app/research/page.tsx` | 6 |
| `/research/<study>` | 4 | 4 sibling `page.tsx` (267-367 lines each) | 6 |
| `/research/<study>/data` | 4 | 4 `route.ts` — machine-facing, **not restyled** | — |
| `/about` | 1 | `src/app/about/page.tsx` | 6 |
| `/contact` | 1 | `src/app/contact/page.tsx` (23 lines) | 6 |
| `/book`, `/complete`, `/thank-you` | 3 | those 3 `page.tsx` | 6 |
| `/privacy-policy`, `/terms`, `/cookie-policy` | 3 | those 3 `page.tsx` | 6 |
| `/admin/analytics/**` | 5 | console | **out of scope** |

Derivations: posts `ls content/blog/*.md | wc -l` = 24; categories
`grep -h "^category:" content/blog/*.md | sort -u | wc -l` = 8; guides
`ls content/guides | wc -l` = 8; tools `ls src/lib/calculators/tools/*.ts | wc -l` = 3;
services and personas from `src/data/charity-services.ts` / `charity-types.ts` and
confirmed against `browser_baseline.json` keys.

**Template coverage: 13 of 26 public page files map to a template = 50%.** The other
13 have no template and their anatomy is recorded by the package that owns them before
that package's builder launches. A route whose anatomy block is empty when its package
launches is a **blocked** package, not a "use your judgement" package.

**Every URL above survives the port byte-identical.** There is no redirect map on this
site, so there is no safety net under a renamed route. Any URL change is an owner
decision and a separate workstream.

---

## 4. What this site does NOT need — do not invent this work

| Not needed | Evidence |
|---|---|
| **Locations** | `locations: []` in `niche.config.json`. No `/locations` route, no city data file, no location copy package. This is the single biggest difference from the ported siblings |
| **Magnets / gated resources** | 0. No `/resources`, no `ResourceGate`, no gated-PDF consent string to preserve |
| **A `data-cta` preservation exercise** | 0 rendered at baseline. §1.1. The one source attribute is on `/thank-you` and is preserved by grep, not by crawl |
| **A pre-port header migration** | There is no header component. Phase 1 is an **addition**, not a replacement |
| **A glossary** | No `/glossary` route |
| **A second typeface retirement (T26)** | `body` sets one system stack, `globals.css:20-22`. No `font-serif` sweep |
| **Removing a dead component** | All 10 site-local components have importers. `ConsentToggle` is mounted (C2) |
| **`tw-animate-css` / `@vercel/speed-insights`** | Not installed, not required. Do not add them without an owner decision (T24: any new dependency is declared in the same commit) |
| **Kit `FaqSection` on the blog** | No visible FAQ block exists to convert. Item 9 |
| **Touching `src/lib/calculators/charity-rules.ts` or its test** | The phase-0 ledger re-derived all three engines by hand and found them correct, with no stale pins. **Do not touch the compute library during a design port** |
| **Touching the 4 `/research/*/data` route handlers** | Machine-facing JSON. Not a design surface |
| **Touching `src/app/admin/**`** | Console, out of scope, not swept, not restyled |
| **Changing `leadConsentText` or any consent wording** | T19. It is a conversion surface and an owner decision with a conversion read |
| **Adding any interruptive surface** | No modal, banner, popup, exit intent or cadence change. Owner gate, every time |

---

## 5. Phases

Standing rules for every phase: one file, one lease, one wave; no two packages in a
wave share a file; every brief carries the playbook §10.1 preamble including the
verbatim VERIFY AGAINST SOURCE clause and "Do NOT launch subagents"; builders never
build; the manager runs every build, every git operation and every
`packages/web-shared/` edit; content packages are Opus-only.

### Gates (run at the close of EVERY phase 1-6)

| # | Gate | Command |
|---|---|---|
| G0 | Preflight, once per session | `python scripts/port_preflight.py --site charities` |
| G1 | Lint, zero errors | `npm run lint --workspace=charities/web` (`package.json:9`) |
| G2 | Build exit 0, page count in the receipt | `npm run build --workspace=charities/web` |
| G3 | Dependency closure | `python scripts/check_dependency_closure.py` |
| G4 | Predeploy gate | `python scripts/predeploy_gate.py --site charities` (space-separated flag; `sites/charities.json` exists) |
| G5 | Route sweep vs baseline | `node docs/_engines/instruments/sweep.mjs --site=charities --base=http://localhost:3117 --article-depth=3 --sample=9999 --out=tmp/sweep_ch_phase<N>.json` |
| G6 | Browser check, 4 widths | `node docs/_engines/instruments/browser_check.mjs --site=charities --base=http://localhost:3117 --article-depth=3 --sample=9999 --out=tmp/bc_ch_phase<N>.json` |
| G7 | CTA triple snapshot | `node docs/_engines/instruments/cta_snapshot.mjs --site=charities --base=http://localhost:3117 --out=tmp/cta_ch_phase<N>.json` — phases 1, 4, 6 |
| G8 | Grounds mode | `browser_check.mjs … --grounds` — phases 5 and 6 |
| G9 | Unit tests | `npm test --workspace=charities/web` (vitest, `package.json:10`; `blog.test.ts`, `markdown-utils.test.ts`, `charity-rules.test.ts`) |

`--article-depth=3` because articles are `/blog/<category>/<slug>`. `--sample=9999`
because the sweep defaults to 30 and the browser check to 2. **Port 3117 currently
serves the PRE-PORT baseline build** — asserted by
`curl -s http://localhost:3117/ | grep -oE "<title>[^<]*</title>"` returning
`<title>Specialist Charity Accountants UK</title>`. Phase builds serve on their own
port. Always pass `--out`.

Gate-decay rule: if any command above stops working, the fixing commit updates this
table in the same commit. A gate whose command does not run is a FAILED gate.

---

### Phase 0 — baselines + claims audit (DONE except the fix tier)

Scope: production SHA, link-floor and browser baselines, CTA triples, claims ledger,
**and the fix of the ledger's serious tier**. No design code. The fixes are a
phase-0 work package and are **not** folded into later phases (T34).

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P0-1 | Fix the ledger's **serious** rows in `content/blog/*.md` + `content/guides/*.md` (frontmatter incl. `faqs`, `keyTakeaways`, `metaTitle`, `metaDescription`, `summary`, `schema:`, and bodies) | Opus | `charities/web/content/**` | all of `src/**` |
| P0-2 | Fix the serious rows in `src/app/**` page copy + `src/data/*.ts` + `niche.config.json` | Opus | `src/app/**`, `src/data/*`, `charities/niche.config.json` | `content/**`, `src/components/**`, `src/lib/**` |
| P0-3 | Fix the serious rows in `src/components/**` and `src/lib/**` (incl. the turnaround promise "we will come back within 24 hours" at `src/app/blog/[category]/[slug]/page.tsx:114` — **leased to P0-2, so P0-3 reports it and P0-2 fixes it**) | Opus | `src/components/**`, `src/lib/**` excluding `src/lib/calculators/charity-rules*` | `charity-rules.ts` and its test, `content/**`, `src/app/**` |
| P0-4 | Rule-based re-sweep: for each ledger RULE prove the hit count across the WHOLE site, including frontmatter and JSON-LD strings. **Expect to find more than the ledger contains** (T6) | Opus | read-only | — |
| P0-5 | Capture the establishing CTA snapshot (G7) at the pre-port build, so the new triples can be diffed against a real zero | Haiku | read-only, writes `docs/charities/_port/cta_baseline.json` | — |

Serialises: P0-4 runs **after** P0-1..P0-3 close, because it verifies them. P0-1..P0-3
are concurrent (disjoint trees). P0-5 is independent and runs first, against the
current 3117 server, before any commit.

Acceptance: every serious row has a verdict and a commit; P0-4 reports zero hits per
rule with the pattern it searched; sweep unchanged or improved vs `sweep_baseline.json`;
G1 G2 G3 G9 green; `cta_baseline.json` committed showing 0 triples across 66 URLs.

**Owner gate: the ledger itself, and its owner-decision tier (6 rows), BEFORE phase 1.**

Tag: `port-charities-phase0`.

---

### Phase 1 — chrome and tokens

Scope: brand ramp, `@theme`, `@layer`, the `@source` fix, header (net new), footer
swap, page shell, article typography decision.

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P1-1 | **Token + `@source` package.** Rewrite `globals.css`: `@source` covering `packages/web-shared`; brand ramp off `#1a5c4a` inside `@theme`; grounds; every rule inside `@layer base`/`@layer components`; define or delete `.section-label`. **Runs ALONE, first — it blocks every other package in the port** | Opus | `src/app/globals.css` | everything else |
| P1-2 | Adopt kit `SiteHeader` in `layout.tsx`, passing `ctaContactGoal` and `ctaMobilePlacement` **explicitly** (§1.1). Verify the drawer CTA from the shipped client bundle, not the page source | Sonnet | `src/app/layout.tsx` | `SiteFooter.tsx`, `globals.css`, `src/app/*/page.tsx` |
| P1-3 | Replace local `layout/SiteFooter.tsx` with kit `SiteFooter`; **keep the `ConsentToggle` mount (line 72)**; pass nothing for `showBuilderCredit` | Sonnet | `src/components/layout/SiteFooter.tsx`, `src/components/analytics/ConsentToggle.tsx` | `layout.tsx` (leased P1-2) |
| P1-4 | Adopt kit `PageShell`; migrate `src/components/ui/layout-utils.ts` (18 importers) to the shell's containers **without changing any importer's markup** | Sonnet | `src/components/ui/layout-utils.ts` | the 18 importing page files |
| P1-5 | **Article typography resolution (R-1).** Report only: does the port declare `@tailwindcss/typography`, or author prose rules in `@layer components`? Measure both against the Property reference. **Manager decides; no dependency is added by a builder** | Opus | read-only | — |
| P1-6 | Adversarial fidelity review of phase 1 against the rendered DOM, incl. the 1024px header CTA/burger cascade race and the computed wordmark vs CTA green | Opus | read-only | — |

Serialises: **P1-1 alone, wave 1** — kit components emit `primary-*` classes that
render as nothing until the ramp and the `@source` land. Then {P1-2, P1-3, P1-4, P1-5}
concurrent. Then P1-6. Waves 3, peak 4 agents.

Acceptance: G1-G7. Plus: `grep -c "@source" src/app/globals.css` ≥ 1; a kit class
appears in the shipped CSS bundle (`curl … .css | grep -c <kit-only class>` > 0);
zero unlayered rules by the **brace-depth walk** (playbook §15 T30 correction — the old
grep undercounts); `cta_snapshot` diff vs `cta_baseline.json` shows the new triples with
the **explicitly chosen** goal and placement values; no per-route link-floor decrease.

Tag: `port-charities-phase1`.

---

### Phase 2 — blog subsystem (24 posts, 8 categories)

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P2-1 | Post template restyle: `src/app/blog/[category]/[slug]/page.tsx`. **Carve-outs: body stays `dangerouslySetInnerHTML` and is never escaped; `keyTakeaways` keeps list semantics; the `post.schema` passthrough at line 81 stays; the breadcrumb pair at lines 83-86 stays.** Apply the P1-5 typography answer | Opus | that one file | `blog/page.tsx`, `blog/[category]/page.tsx` |
| P2-2 | Blog index: kit `BlogListWithSearch` + `NumberedPagination`. Prove the server-HTML article count before and after by curl | Sonnet | `src/app/blog/page.tsx` | the post template |
| P2-3 | Category projection: `BlogCategoryHub` across the 8 categories, `heading` prop where the h1 differs from the breadcrumb label | Sonnet | `src/app/blog/[category]/page.tsx` | the other two |
| P2-4 | **Author the 8-entry blog CTA-copy map** (heading, body, button label per category) and wire `BlogSidebarCta` with `ctaPlacement="blog_sidebar"` + `buttonLabel`. Keyed on THIS site's 8 categories, never copied from a sibling | Opus (content) | new `src/data/blog-cta-copy.ts` | all page files |
| P2-5 | **Resolve the FAQ JSON-LD/visible-page mismatch (T17).** `buildFaqJsonLd` publishes answers the page never renders. Report the blast radius (`grep -c "^faqs:" content/blog/*.md`) and the two options: render a visible server-HTML FAQ block, or stop emitting the schema. **Report only; owner decides** | Opus | read-only | — |
| P2-6 | Adversarial review of phase 2, incl. a server-HTML diff of one post before and after, and proof that `.prose` now resolves to real rules | Opus | read-only | — |

Serialises: {P2-1, P2-2, P2-3, P2-5} concurrent; then P2-4 (needs the hub shape
settled); then P2-6. Waves 3, peak 4.

Acceptance: G1-G6, G9. Plus: article count in `/blog` server HTML ≥ baseline;
`.prose` rule count in the shipped CSS > 0; per-route link floors held on all 33 blog
routes; JSON-LD `@type` set unchanged unless P2-5's owner decision says otherwise.

Tag: `port-charities-phase2`.

---

### Phase 3 — guides and indexes (9 routes)

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P3-1 | `/guides` index: `SlimHero` + `CoverageCards` over 8 guides | Sonnet | `src/app/guides/page.tsx` | `guides/[slug]` |
| P3-2 | `/guides/[slug]` template, 8 guides. **Raw-HTML bodies must not be escaped**; same typography dependency as P2-1 | Sonnet | `src/app/guides/[slug]/page.tsx` | `guides/page.tsx` |
| P3-3 | `TableOfContents` + `ReadingProgress` adoption on the guide template. **`stickyDesktop` chosen deliberately and the choice recorded** (T32: measure `getBoundingClientRect()` after scroll and count scroll containers in the column) | Sonnet | new `src/components/content/` wrappers only | both guide page files |
| P3-4 | **Author the 8 category-hub copy blocks** (h1, intro, essentials bullets) for phase 2's hubs | Opus (content) | new `src/data/blog-hub-copy.ts` | everything else |
| P3-5 | Adversarial review of phase 3 | Opus | read-only | — |

Serialises: {P3-1, P3-2, P3-4} then P3-3 (needs the guide template settled) then P3-5.
Waves 3, peak 3.

Acceptance: G1-G6. Plus: guide body HTML unescaped (curl one guide, grep for a literal
`<strong>` rendering as markup not text); TOC sticky verified by measurement, not by
reading classes; 9 route link floors held.

Tag: `port-charities-phase3`.

---

### Phase 4 — calculators and embeds (7 routes)

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P4-1 | `/calculators` index restyle, 3 tools | Sonnet | `src/app/calculators/page.tsx` | `calculators/[slug]` |
| P4-2 | `/calculators/[slug]` template + `CalculatorClient` restyle | Sonnet | `src/app/calculators/[slug]/page.tsx`, `src/components/calculators/CalculatorClient.tsx` | the index, `MiniCapture.tsx`, `CalcResultCta.tsx` |
| P4-3 | Capture-surface restyle: `calculators/MiniCapture.tsx` (191 lines) + `CalcResultCta.tsx`. **Restyle only. The set of capture surfaces does not change; adding one is an owner gate. Consent wording is not retyped (T19)** | Sonnet | those 2 files | `CalculatorClient.tsx` |
| P4-4 | `/embed/[slug]` x3. **NO PageShell, NO header, NO footer** — it renders inside a third party's iframe. The `robots: noindex` and the `/calculators/<slug>` canonical at lines 23-25 stay byte-identical | Sonnet | `src/app/embed/[slug]/page.tsx` | everything else |
| P4-5 | **Fix the pre-existing contrast failures at ratio 2.63 and 1.49 on the calculator result panels** (`browser_baseline.json`). This is the phase that owns those surfaces | Sonnet | whichever of P4-2/P4-3's files carry them — **so P4-5 runs in wave 2, after both close** | — |
| P4-6 | Adversarial review + G7 CTA snapshot + G9 unit tests (`charity-rules.test.ts` must stay green and must NOT be edited) | Opus | read-only | — |

Serialises: {P4-1, P4-2, P4-3, P4-4} then P4-5 then P4-6. Waves 3, peak 4.

Acceptance: G1-G7, G9. Plus: both baseline contrast failures now ≥ 4.5 measured by
`browser_check.mjs`, not by hand; `/embed/[slug]` server HTML contains no header and no
footer markup; `charity-rules.test.ts` unmodified (`git diff --stat` on that path = 0).

Tag: `port-charities-phase4`.

---

### Phase 5 — homepage, services, personas (11 routes)

The big one: a 791-line single-file homepage with every section inline.

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P5-1 | Homepage rebuild into kit sections. **All 95 `#1a5c4a` / 19 `#154a3b` / 3 `#0f2e24` literals go to tokens. No testimonial surface until the ledger's owner rows close. `.section-label` resolved per P1-1** | Opus | `src/app/page.tsx` | every other page file |
| P5-2 | `/services` index + `ServiceTiers` adoption | Sonnet | `src/app/services/page.tsx`, `src/config/service-tiers.ts` | `services/[slug]` |
| P5-3 | `/services/[slug]` template, 5 services | Sonnet | `src/app/services/[slug]/page.tsx` | `services/page.tsx`, `src/data/charity-services.ts` |
| P5-4 | `/for` index + `/for/[slug]`, 2 personas, `CoverageCards` | Sonnet | `src/app/for/page.tsx`, `src/app/for/[slug]/page.tsx` | `src/data/charity-types.ts` |
| P5-5 | **Author the per-route ledes and the service/persona copy blocks** (5 services + 2 personas) | Opus (content) | `src/data/charity-services.ts`, `src/data/charity-types.ts` | every page file |
| P5-6 | Adversarial review + G8 grounds mode across all 11 routes | Opus | read-only | — |

Serialises: {P5-2, P5-3, P5-4} then {P5-1, P5-5} then P5-6. P5-3 and P5-5 lease
different files by design. Waves 3, peak 3.

Acceptance: G1-G6, G8. Plus: zero 6-digit hex literals in `src/app/page.tsx`
(`grep -cE "#[0-9a-fA-F]{6}" ` = 0); `.section-label` either resolves to real CSS or the
class is gone; homepage link floor held (it is the highest on the site); grounds mode
reports no new breaching route.

Tag: `port-charities-phase5`.

---

### Phase 6 — the rest (12 routes, no template)

Each of P6-1..P6-4 records its routes' anatomy **before** its builder starts, from the
closest template plus the playbook §0 checklist, and hands that anatomy to the reviewer.

| # | Package | Tier | File lease | OFF LIMITS |
|---|---|---|---|---|
| P6-1 | `/research` hub + the 4 study pages (267-367 lines each) + their inline charts. **Charts are LOCAL: restyle only, never re-plot. Values stay text nodes; decorative bars `aria-hidden`; no `role="img"` on a chart subtree (T16). The 4 `/data` route handlers are NOT touched** | Opus | `src/app/research/**/page.tsx` | `src/app/research/*/data/route.ts` |
| P6-2 | `/contact` (23 lines) + `/about` + `LeadForm.tsx` (473 lines, 2 importers — **do not change its signature**) | Sonnet | those 2 page files + `src/components/forms/LeadForm.tsx` | `book`, `complete`, `thank-you` |
| P6-3 | `/book`, `/complete`, `/thank-you` + `BookingPicker.tsx` + `DetailsForm.tsx`. **`data-cta="thankyou-return-article"` / `data-cta-placement="thank_you"` survive byte-identical (§1.1 item 6); prove it by grep AND by curling `/thank-you?return=/blog`** | Sonnet | those 3 page files + 2 form components | `LeadForm.tsx` |
| P6-4 | `/privacy-policy`, `/terms`, `/cookie-policy` + the 3 `ui/Breadcrumb` import sites → kit `Breadcrumb`. **Every compliance sentence is checked against code that actually runs (T18); the ledger's compliance rows must already be fixed — verify, do not re-author** | Sonnet | those 3 page files + `src/components/ui/Breadcrumb.tsx` | everything else |
| P6-5 | **Fix the `scroll-margin-top=0px` on blog reference anchors** (`browser_baseline.json`) — a sticky header makes it visible, so it becomes a real defect the moment phase 1 lands | Sonnet | `src/app/globals.css` — **wave 2, `globals.css` is otherwise unleased this phase** | — |
| P6-6 | Final adversarial review: full sweep + browser check + grounds + CTA snapshot across all 72 public routes, **plus the byte-unchanged audit** | Opus | read-only | — |

Serialises: {P6-1, P6-2, P6-3, P6-4} then P6-5 then P6-6. Waves 3, peak 4.

**The byte-unchanged audit in P6-6 is the defence against a dropped package (T39).** It
diffs every one of the 26 public page files against SHA `958460de` and lists any that are
unchanged. Each unchanged file is matched to a package that deliberately left it alone,
or it is a dropped package and the phase does not close.

Acceptance: G1-G9. Plus: `data-cta` grep on `/thank-you` returns the original 2
attributes verbatim; anchor `scroll-margin-top` > 0 measured in the browser; zero 404s
on internal links across all 72 routes; structured data matches what each page renders.

Tag: `port-charities-phase6`.

---

### Package count by phase

| Phase | Packages | Waves | Peak concurrent agents |
|---|---|---|---|
| 0 | 5 | 3 | 3 |
| 1 | 6 | 3 | 4 |
| 2 | 6 | 3 | 4 |
| 3 | 5 | 3 | 3 |
| 4 | 6 | 3 | 4 |
| 5 | 6 | 3 | 3 |
| 6 | 6 | 3 | 4 |
| **Total** | **40** | **21** | max 4 |

---

## 6. Risk register

| # | Risk | Why it bites here specifically | The check that catches it | Phase |
|---|---|---|---|---|
| R-1 | **`.prose` and `.section-label` emit nothing.** 24 blog bodies + 8 guide bodies render unstyled today; 8 homepage eyebrows render as bare divs | `@tailwindcss/typography` is not a dependency and `globals.css` declares no `@plugin`; `.section-label` is used 8 times and defined nowhere | `curl -s <cssbundle> \| grep -c "\.prose"` and `\| grep -c section-label` — both must be > 0 after the phase that owns them, or the class must be gone | 1 decides, 2/3/5 fix |
| R-2 | **Missing `@source`: kit classes silently emit nothing.** Every kit component lands looking broken and a builder "fixes" it by re-adding literal hexes | `globals.css:2` is `@import "tailwindcss" source("..")` — it scans `src/` only, so nothing under `packages/web-shared` is ever scanned. Zero kit `design/**` modules are imported today, so this has never bitten before and will bite on the first one | After P1-1: pick a class only a kit component emits and assert it is in the shipped CSS bundle. **Not** "the page looks right" | 1 |
| R-3 | **Tailwind v4 theme-variable name collisions outside `@theme`.** A ramp declared on `:root` instead of inside `@theme` does not generate utilities, so `bg-primary-600` emits nothing while `var(--primary-600)` resolves — the two disagree silently | The existing `:root` block already declares `--brand-primary` etc. outside any `@theme`. Adding ramp steps beside them is the obvious wrong move | After P1-1: assert both the utility (`grep "bg-primary-600" <cssbundle>`) **and** the variable exist; measure the utility from the rendered DOM, never from a v3 hex table (T28) | 1 |
| R-4 | **An unlayered rule beats every utility.** Third-most-repeated defect in the programme | `globals.css` has **no `@layer` at all** today, so every rule P1-1 writes is unlayered by default | The **brace-depth walk** from playbook §15 (T30 correction), not the old `grep -nE "^[a-zA-Z][^{]*\{"` which undercounted by 23 on a sibling site. Then `awk '/^@layer components/,/^}$/' globals.css \| grep -E '^\s+\.'` to confirm which selectors landed inside | 1, re-run every phase |
| R-5 | **Header CTA `hidden` vs `inline-flex` cascade race.** Estate-wide: the 2026-08-23 chrome fix never took effect on ANY site. CTA and burger render together below 1024px | This site adopts the kit header **net new**, so it inherits the defect on day one with nothing to compare against | Render at 768px and 1024px and assert the CTA's **computed `display`**, not its class string. Two competing `display` utilities in one class string is the mechanism; reading the classes cannot tell you which won | 1, re-checked 6 |
| R-6 | **Canonical inheritance.** `layout.tsx:31` sets `alternates.canonical = siteUrl`; any route that does not set its own inherits the homepage canonical | `/embed/[slug]` correctly overrides it (line 25). Nothing else in the port may drop a per-route canonical while restyling | Per phase: `curl <route> \| grep -oE '<link rel="canonical"[^>]*>'` for every route the phase touched; assert the href is that route, not `/`. A 200 at the right URL with the wrong canonical is invisible to the sweep | every |
| R-7 | **`sr-only` on a `<table>` (and `role="img"` on a chart).** Collapses the subtree; every value becomes unreachable | The 4 research pages are 267-367 lines of bespoke chart and table markup, restyled by one package | P6-1 receipt: no `role="img"` on any element with descendants carrying data; no `sr-only`/`aria-hidden` on a `<table>` or its ancestors; values present as text nodes | 6 |
| R-8 | **Agreement between agents is not evidence.** Two agents reading the same false premise agree | This plan itself was written from a brief containing 5 factual errors (§0), all found by reading source | Every receipt names the **command and its decisive output line**. The manager spot-checks the rendered page before repeating any claim to the owner (T10). A review that finds nothing has failed | every |
| R-9 | **Sweeping by the list instead of by the rule.** Under-counted on every site so far | The phase-0 ledger is a list of 39 rows. P0-4 exists precisely to distrust it | P0-4 reports, per rule, the regex searched and the hit count across the whole site including frontmatter and `schema:` JSON-LD. Expect it to find more than 39 | 0 |
| R-10 | **FAQ JSON-LD asserts answers no page renders.** T17 in its purest form | `src/app/blog/[category]/[slug]/page.tsx:70` builds FAQ schema from `post.faqs`; the template renders no FAQ block at all | P2-5 reports it; owner decides render-or-remove. Acceptance either way: one binding feeds both the schema and the visible block, or the schema is not emitted | 2 |
| R-11 | **A new dependency that resolves only by hoisting.** Builds locally, fails on clean install | R-1's likeliest fix is adding `@tailwindcss/typography`, a brand-new dependency for this workspace | `python scripts/check_dependency_closure.py` in **every** builder brief, and the declaration lands in the same commit as the import (T24) | 1 |
| R-12 | **The kit footer's followed external link to Property's design studio** | Owner ruling makes the credit estate-wide, so this is expected — but it is the first outbound link this site has ever carried | P1-3 receipt names it explicitly so nobody re-opens it as a defect, and nobody adds a second outbound link by the same reasoning | 1 |
| R-13 | **A conditional CTA no crawl can see.** `/thank-you`'s CTA renders only with a `return` param; the drawer CTA renders only when the menu is open | Neither appears in any SSR crawl, so both can be deleted or flipped without a single gate going red | Grep the source **and** curl with the param set (`/thank-you?return=/blog`); read the shipped client bundle for the drawer | 1 and 6 |

---

## 7. Owner gates, and who decides what

### Owner decides (ask before, never after)

| Gate | Phase | Why |
|---|---|---|
| The port itself | before 0 | recorded in the rollout doc |
| **The phase-0 claims ledger and its 6 owner-decision rows** | 0, blocking | serious tier fixed and committed before phase 1 starts |
| **Brand swatch: `#1a5c4a` ramp and the warning / duty / deadline colour** | 1 | colour is his call, and **this site has no second colour at all** — there is no accent to derive a warning ramp from |
| **Whether the blog FAQ schema is backed by a visible FAQ block, or removed** (R-10) | 2 | it changes what the page publishes and what Google can quote |
| **Whether `/thank-you`'s conditional CTA is kept, promoted, or dropped** | 6 | it is the site's only pre-existing CTA triple |
| Any new capture surface | 4, 6 | changes the funnel. Count in equals count out otherwise |
| Testimonial / social-proof surface on the homepage | 5 | ledger owner rows |
| Any pricing or claim policy change | any | |
| Anything interruptive (modal, banner, popup, exit intent, cadence, audience) | any | hard rule |
| Deleting a route | any | none is proposed; if one is, check GSC first |
| Deploy | after 6 | always, never autonomous |

### The manager decides, and records it here

| Decision | Call |
|---|---|
| `ctaContactGoal` = `"contact"`, `ctaMobilePlacement` = `"header_mobile"` | passed explicitly, never defaulted (§1.1) |
| `showBuilderCredit` | pass nothing; the default is correct |
| `--brand-primary-text` / `--brand-primary-ground` | **do not define**; `#1a5c4a` measures 7.85 both ways |
| `wordmarkAccentColor` | deferred to the phase-1 `browser_check.mjs` reading, not guessed |
| R-1 fix: typography plugin vs hand-authored `@layer components` prose | manager, phase 1, on P1-5's report. **A builder never adds a dependency** |
| `.section-label`: define or delete | manager, phase 1, with P1-1 |
| Which kit component to mirror locally where the kit is unusable | manager, per §2 |
| `stickyDesktop` per host | manager, phase 3, from a measurement |
| Ordering, batching, model tier, agent count | manager, §5 |
| Any fix that makes a false statement true | manager. Those are defects, not preferences |

---

## 8. Open items this plan does not decide

1. Armed `monitored_pages` rows and their windows (parameter 4) — manager queries before phase 1.
2. Funnel evidence vs Property (parameter 5) — needed for the cutover read, not for phase 1. Note §1.1: **there is no CTA baseline to read against**, only lead-volume history.
3. The warning / duty / deadline ramp. This site has exactly one brand colour and no accent; there is nothing to derive a semantic ramp from without an owner swatch.
4. R-10's render-or-remove decision.
5. Whether `predeploy_gate.py --site charities` passes clean. `sites/charities.json` exists so the key resolves, but the gate has **not been run** for this plan.
6. `port_preflight.py --site charities` has **not been run** for this plan. It is G0 and runs once per port session, before any measurement.
