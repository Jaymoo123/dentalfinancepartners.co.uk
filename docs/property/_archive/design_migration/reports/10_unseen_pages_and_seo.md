# Report 10 — Unseen pages, and the SEO / wave / cluster coupling map

Author: agent 10. Date 2026-08-22. Read-only investigation.
No production action taken: no deploy, no IndexNow, no monitored_pages registration, no file
under `Accounting/Property/` edited.

**Verified** = I read the file or ran the command. **Inferred** = reasoned, not observed.
All paths relative to `C:\Users\user\Documents\Accounting\` unless absolute.

---

## 0. Headline

Three things a plan must carry out of this report.

1. **The six unseen pages are cheap, not expensive.** Five of them are one shared template
   with a per-page `Section` helper, and they already import the exact three primitives the
   designer restyled (`btnPrimary`, `btnSecondary`, `siteContainerLg`, plus `CTASection` and
   `Breadcrumb`). Porting the primitives re-skins ~70% of those pages for free. The sixth,
   `/blog/property-finance`, is a 10th call site of the designer's existing data-driven
   `BlogCategoryHub`. Estimate: **1 to 1.5 days for all six**, not a wave.
2. **The real unseen surface is not the six pages, it is the calculators and the blog.**
   The designer has **16 tools; we have 26**. Ten calculators shipped since the snapshot are
   invisible to their design system. They have 697 posts, we have 783 (91 new, 5 of theirs
   consolidated away), including a whole **"Property Finance" category with 34 posts** that
   does not exist on their side.
3. **`Property/niche.config.json` is the single most dangerous file in the port.** Taking the
   designer's version wholesale reverts the partner model to "DJH Business Advisers Limited",
   drops enquiry retention 24 → 3 months, and deletes the five pillar nav entries. This is a
   compliance regression dressed as a config conflict. See §B6.

Second-order: the test suite gives this migration **almost no cover**. 49 files, 1484 tests,
all green, and **zero** of them assert page JSX, page copy or page metadata (§B4). CI staying
green after a re-skin means nothing.

---

# PART A — the pages the designer never saw

## A.0 Inventory verification (verified)

Route inventory built by enumerating every `page.tsx` under each `src/app`:

```
find Property/web/src/app -name page.tsx                       -> 55
find tmp/design_migration/Property_zip/web/src/app -name page.tsx -> 49
```

`diff` of the two sorted lists returns exactly six lines, all monorepo-only:

```
/blog/property-finance/page.tsx
/cost-of-selling-a-property/page.tsx
/for-letting-agents/page.tsx
/landed-estates/page.tsx
/landlord-compliance/page.tsx
/leasehold/page.tsx
```

**The CONTEXT.md list of six is complete and current. There are zero designer-only routes** —
the designer added no new route, only re-skinned existing ones. That is a materially good
result for the port: no route reconciliation is needed at the `app/` level.

### Content directories (verified)

| Dir | Monorepo | Designer | Delta |
|---|---|---|---|
| `web/content/blog/` | 783 | 697 | +91 ours, −5 theirs |
| `web/content/resources/` | 8 | 6 | +2 ours |

The 5 designer-only posts are exactly the city posts we consolidated into `/locations/`:
`birmingham-`, `bristol-`, `leeds-`, `london-`, `manchester-property-accountant.md`.
CONTEXT.md §4 already says to ignore their four content edits; this confirms the reason.
**These 5 files must not be resurrected by the port** — `middleware.ts` `BLOG_TO_LOCATION`
(lines 8-14) already 301s those slugs to `/locations/<slug>`; restoring the files would put
live content behind a permanent redirect.

The 91 new posts by frontmatter category (verified, `grep -m1 '^category:'`):

| Category | New posts |
|---|---|
| Property Finance | 34 |
| Property Types & Specialist Tax | 29 (18 quoted + 11 unquoted) |
| Capital Gains Tax | 16 |
| Landlord Tax Essentials | 12 |

Minor drift found in passing (not a migration issue, worth a one-line fix later): 11 of the
29 Property Types posts write `category: Property Types & Specialist Tax` **unquoted** while
18 write it quoted. Both parse to the same string via `slugifyCategory`
(`Property/web/src/lib/blog.ts:105`), so it is cosmetic today.

The 2 new resources are `landlord-compliance.md` and `leasehold.md` — the Wave 11 pillar
companions.

### Calculator registry (verified) — the biggest unseen surface

`diff` of `src/lib/calculators/registry.ts` between the two sides. Ten tools exist only in the
monorepo (registry.ts:14-23 imports, :99-108 in the `GENERIC` array):

```
rd-tax-credit-calculator
capital-allowances-calculator
buy-to-let-mortgage-calculator
buy-to-let-rental-stress-test-calculator
commercial-mortgage-calculator
bridging-loan-calculator
development-finance-calculator
lease-extension-premium-calculator     (Wave 11)
bpr-apr-allowance-calculator           (Wave 11 / landed-estates)
cost-of-selling-calculator             (Wave 12)
```

`ls src/lib/calculators/tools` → **21 monorepo, 11 designer**. `TOOLS.length` is 26 for us,
16 for them.

This matters twice over:
- These ten render through the shared `/calculators/[slug]` route, so they inherit whatever
  the designer did to `PremiumCalculator` / `CalculatorClient` **automatically**. Low porting
  cost, but **high verification cost**: ten tool UIs nobody in the design process has ever
  looked at will render in the new system unreviewed.
- `src/tests/calculator-goldens.test.ts:76` hard-pins `expect(TOOLS.length).toBe(26)`.
  If the port takes the designer's `registry.ts`, that assertion fails immediately and loudly.
  This is the one place in the whole test suite that will actually catch a bad port. Good.

`cost-of-selling-calculator` is not standalone: per `docs/Property/wave12_page_tracker.md` it
feeds the combined-costs input of `capital-gains-tax-calculator.ts`. Do not treat it as an
isolated tool. (Verified via the docs cross-check; I did not read the CGT tool source.)

---

## A.1 The five pillar pages — one template, five instances

**Verified structural finding.** `/cost-of-selling-a-property`, `/leasehold`,
`/landed-estates`, `/landlord-compliance` and `/for-letting-agents` are the same page written
five times. Every one has an identical import block (modulo `CTASection`) and an identical
local `function Section({...})` helper:

```
Property/web/src/app/cost-of-selling-a-property/page.tsx:1-8, :136 (Section)
Property/web/src/app/leasehold/page.tsx:1-8, :135
Property/web/src/app/landed-estates/page.tsx:1-8, :131
Property/web/src/app/landlord-compliance/page.tsx:1-8, :239
Property/web/src/app/for-letting-agents/page.tsx:1-6, :63   (no CTASection import)
```

Shared shape, verified in all five:
- `const PAGE_PATH` / `TITLE` / `DESCRIPTION` at lines 9-13, then an inline
  `export const metadata: Metadata` with a literal `alternates.canonical`.
- Const arrays of page data (`atAGlance`, `inForce`, `calendar`, `costs`, `penalties`,
  `faqs`, `calculators`) — data is already separated from markup. This is why the port is
  cheap.
- A local `Section` component rendering `<h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">`.
- `<Breadcrumb>` + a hand-built inline `breadcrumbSchema` (see §B5 — this is a live duplicate
  bug).
- A closing `<CTASection>` (all but `/for-letting-agents`).

Line counts: 592 / 579 / 490 / 915 / 358.

| Page | Wave | What it is | Sections |
|---|---|---|---|
| `/cost-of-selling-a-property` | **Wave 12** pillar | Vendor-capture pillar for the cost-of-selling cluster (13 blog spokes). Links to `/calculators/cost-of-selling-calculator`, `/blog/capital-gains-tax`, `/blog/landlord-tax-essentials` (page.tsx:34-36) | 9 `Section` + FAQ (`:228-583`) |
| `/leasehold` | **Wave 11** pillar (out-of-band build) | Leasehold pillar: LFRA 2024 in-force status, extension premium, RTM, service charges, ground rent, SDLT on extensions. Hub for the 8 Cluster-C spokes | 8 `Section` + FAQ (`:229-571`) |
| `/landed-estates` | **Wave 11 / rural cluster** | £2.5m BR/APR farm IHT allowance pillar. Links `/calculators/bpr-apr-allowance-calculator` (`:36`) | 7 `Section` + FAQ (`:225-482`) |
| `/landlord-compliance` | **Wave 11** pillar (out-of-band build) | Largest of the five (915 lines). Duty map: compliance calendar, cost table, penalty ladder, deductible-vs-capital, then per-duty sections (gas, EICR, EPC/MEES, fire, licensing, commercial) | 13 `Section` + FAQ (`:332-907`) |
| `/for-letting-agents` | **agents1** batch, deployed 08-21 night | B2B page aimed at letting agents. Renters-reform 1 May 2026, periodic switch, EPC myths, MTD filing split, deposits. Uniquely carries a **calculator-embed pitch** (`:316` "Calculators you can point a landlord at", `:334` "Putting the calculators on your own site") tying it to `/embed` | 9 `Section`, **no FAQ, no CTASection** |

### Which designer components these would naturally use

The designer's new primitives (verified by listing
`tmp/design_migration/Property_zip/web/src/components/ui/` and `.../property/`):

New in `ui/`: `page-blocks.tsx` (exports `Prose`, `Eyebrow`, `InlineLink`, `CardStack`),
`FaqSection.tsx`, `EyebrowRule.tsx`, `ExampleFigureNote.tsx`, `CardCarousel.tsx`.
New in `property/`: 35 bespoke storytelling components including `PenaltyLadder`,
`FilingCadence`, `FilingDates`, `ComparisonTable`, `ProcessTimeline`, `DisposalFigures`,
`CoverageCards`, `NumberedReasons`, `DrawnTickList`, `StatsBar`, `LeadCTAPanel`,
`ServiceTiers`, `SchemeFlow`, `DecisionWindow`, `DepartureWindow`, `RateWedge`.

Natural mapping (**inferred** — I read the component names and `page-blocks.tsx` exports, I did
not read all 35 component implementations):

| Existing construct | Designer replacement |
|---|---|
| local `function Section` ×5 | `Eyebrow` + `Prose` from `ui/page-blocks.tsx:13,35`, `EyebrowRule` |
| `faqs` array + hand-rolled `<h3>` list | `ui/FaqSection.tsx:12` |
| `<CTASection>` closer | `property/LeadCTAPanel.tsx` (the navy panel the designer's hubs end on) |
| `landlord-compliance` `penalties` array (`:147`) | `property/PenaltyLadder.tsx` — near-exact fit |
| `landlord-compliance` `calendar` array (`:33`) | `property/FilingCadence.tsx` / `FilingDates.tsx` |
| `landlord-compliance` `costs` array (`:78`) | `property/ComparisonTable.tsx` |
| `cost-of-selling` `atAGlance` (`:54`) | `property/DisposalFigures.tsx` or `StatsBar.tsx` |
| `leasehold`/`landed-estates` `inForce` arrays | `property/DrawnTickList.tsx` or `CardStack` (`page-blocks.tsx:82`) |
| `for-letting-agents` `calculators` array (`:35`) | `property/CalculatorPreviewGrid.tsx` |
| hero blocks | `layout/HeroBrickBackdrop.tsx` + `heroCreamSurface` |

**Free win, verified.** `diff` of `components/ui/layout-utils.ts` shows the designer restyled
`btnPrimary`, `btnSecondary`, `btnGhost` (sharp `border-b-4` → `rounded-xl`) and added
`siteContainerXl`, `heroCreamSurface`, `btnOnCream`. `CTASection.tsx` changed
`border-l-4 border-emerald-600` → `rounded-xl`. `Breadcrumb.tsx` gained an `onDark` prop and a
WCAG 2.5.8 hit-area fix. **All five pillars already import exactly these.** Porting the
primitives alone re-skins buttons, containers, breadcrumbs and the CTA block on all five pages
with zero edits to the page files.

**Effort:** the primitives are free. Replacing the five local `Section` helpers with
`Eyebrow`+`Prose` is mechanical (~1h each). Adding a hero, `FaqSection`, `LeadCTAPanel` and
the two or three bespoke components per page is the real work: **half a day per page for the
four content pillars, ~2h for `/for-letting-agents`** (no FAQ, no CTA, shorter). Call it
**2.5 days for the five**, and it can be done by one agent per page in parallel because they
share no state.

**Constraint that dominates the schedule, not the effort:** all five sit inside armed
`monitored_pages` windows. See §B3 and §B8.

## A.2 `/blog/property-finance` — near-zero effort

`Property/web/src/app/blog/property-finance/page.tsx`, 196 lines. A hand-rolled category hub
for the "Property Finance" category (34 posts, all shipped post-snapshot). Imports
`getAllPosts`, `getCategorySlug`, `calculateReadTime`, `LeadForm`. Five topic `<h2>` blocks
(`:97,106,115,124,133` — BTL/limited-company mortgages, commercial, bridging, development,
portfolio finance) then the article list, then a lead form. Emits `BreadcrumbList` +
`CollectionPage` inline (`:39-64`).

The designer built `components/blog/BlogCategoryHub.tsx` — a **fully data-driven** template
(`categoryName`, `categorySlug`, `description`, `intro`, `sections`, `cta`) that already emits
`BreadcrumbList` + `CollectionPage` at `:68,76,87`, and reduced their nine hub pages from
~197 lines to ~80. Verified: `tmp/.../blog/portfolio-management/page.tsx` = 80 lines vs our 197.

**`/blog/property-finance` is a 10th call site. Effort: ~1 hour.** Map the five topic blocks
to `sections: HubSection[]`, the lead form to `cta: HubCta`.

**Warning (verified):** the designer's `/blog` route list has 9 category dirs, ours has 10.
Any port step that copies their `blog/` directory tree wholesale deletes
`app/blog/property-finance/page.tsx` and orphans 34 posts' hub. The posts themselves survive
(`getAllCategories()` at `blog.ts:119` derives categories from post frontmatter, not config),
so the sitemap category entry would still be emitted — pointing at a 404. That is the worst
possible failure mode: sitemap says 200, server says 404.

---

# PART B — the coupling map

## B1. `sitemap.ts` (verified — `Property/web/src/app/sitemap.ts`, 105 lines)

Five sources:

| Source | Line | Produces |
|---|---|---|
| `staticPaths` — 26 hardcoded strings | `:9-37` | the static routes |
| `siteConfig.locations` (from `niche.config.json`) | `:54,57` | `/locations/<slug>` |
| `allTools()` from `lib/calculators/registry.ts` | `:67-68` | `/calculators/<slug>` (26 today) |
| `getAllCategories()` from `lib/blog.ts:119` | `:78,80` | `/blog/<category>` |
| `getAllPosts()` from `lib/blog.ts` | `:90-93` | `/blog/<cat>/<slug>`, skipping `post.noindex` (`:91`) |

`priority`: 1 home, 0.7 static/locations/tools, 0.8 categories/posts (`:49,62,73,85,98`).
`changeFrequency`: weekly for `/blog` and categories, monthly otherwise (`:48,84`).
`lastModified`: `new Date()` (build time) for everything except posts, which use `post.date`
(`:96`).

All five pillar pages are in `staticPaths` at `:17,19,20,21,22`. `/blog/property-finance` is
**not** — it comes via `getAllCategories()`.

**What breaks.** `staticPaths` is a literal array with no cross-check against disk. A route
renamed, moved or deleted in the redesign produces **no compile error** — the sitemap keeps
emitting the old URL, which 404s. Conversely a new route is silently absent. This is the
single highest-value place to add a guard (see checklist item S1).

## B2. Internal link graphs

**Correction to the brief (verified):** `src/lib/nav.ts` and `src/lib/calculators/nav.ts`
**do not exist**. Navigation lives in JSON config.

| Graph | Location | Consumer | Redesign risk |
|---|---|---|---|
| Primary nav | `Property/niche.config.json` `navigation[]` — all 5 pillars are children of "Resources" | `src/config/site.ts:46` → `src/config/niche-loader.ts:135` (`getActiveNav`) → `components/layout/SiteHeader.tsx:9,14,164,263` | **Single consumer.** `SiteHeader.tsx` is one of the ~12 heavy-churn conflict files. If the designer's header lands without reading `activeNav`, the entire top-nav link graph disappears |
| Essential guides (12 hand-picked blog posts) | `src/lib/essential-guides.ts:10` | homepage + `/blog` index (per its own doc comment `:1-7`) | Rail must survive the homepage and blog-index rewrites. **None of the 6 unseen pages appear here** |
| Related posts | `src/lib/blog.ts:65` `getRelatedPosts(slug, category, 3)`, same-category, date-sorted | **only** `app/blog/[category]/[slug]/page.tsx:8,88` | One call site. Drop it in the article-template rewrite and **all 783 posts** lose their related rail, silently, with no type error |
| Breadcrumbs | `components/ui/Breadcrumb.tsx` — dumb, takes `items` prop; callers build the trail. Used in 51 files | 51 pages | Emits its own JSON-LD (§B5) |
| Calculator registry | `src/lib/calculators/registry.ts:111` `TOOLS` = 5 `BESPOKE` (`:40-85`) + 21 `GENERIC` (`:87-109`). Its doc comment `:25-37` states "The gallery, sitemap and navigation read this single registry" | sitemap `:4,67`, gallery, nav | Helpers come from `@accounting-network/web-shared/tools/registry-helpers` (`:2`) — **estate-wide**, touching it hits all 15 sites |
| Topic/resource adjacency | `src/lib/intent/taxonomy.ts` `TOPICS` (`:46`) → `src/lib/resources/registry.ts` `RESOURCES` (`:72`) | drives which calculator + lead magnet a page recommends | Two monorepo-only topics: `landlord-compliance` (`taxonomy.ts:80-89`) and `leasehold` (`:128-139`), both with `blogCategorySlugs: []`, existing purely to hang `/resources/<topic>` off the pillars. Verified by diff. Coupled to the pillar pages **by convention, with no import to enforce it** |

`/for-letting-agents` additionally hangs off `/embed` (`page.tsx:316,334`) — an embed-pitch
coupling not represented in any registry.

## B3. `monitored_pages`

**Schema is not in version control (verified).** No `CREATE TABLE monitored_pages` anywhere
under `supabase/migrations`, `supabase/applied-sql`, or any `*.sql`. The table was created
out-of-band via the Management API. Columns are inferable only from the INSERTs:
`site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, redirect_target,
baseline_clicks, baseline_impressions, baseline_position, baseline_window_days,
baseline_pulled_at, status, notes, baseline_bing_*`. A unique constraint on
`(site_key, slug, rewrite_date)` is implied by
`ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING` in
`scripts/populate_monitored_pages.py:144`. **This is itself a finding** — a production table
with no migration.

**Registration (owner-triggered production action — documented only, not performed):**
`scripts/register_monitored_batch.py`, driven off a QA manifest
(`optimisation_engine/.cache/qa_verdict_<batch>.json`, `slugs_from_manifest` `:202-211`).

```
python scripts/register_monitored_batch.py --batch <name> [--site property] \
  [--rewrite-date YYYY-MM-DD] [--rewrite-type rewrite|redirect|net_new] \
  [--page-urls SLUG=/path ...] --commit
```

Legacy paths: `scripts/insert_monitored_pages.py`, `scripts/populate_monitored_pages.py`.

**Critical property, verified: none of the three capture a content hash, title, or word count.**
The baseline is *only* traffic metrics — GSC trailing-90d and Bing clicks/impressions/position.

**Detector:** `optimisation_engine/analysis/detectors.py:1170-1403`
(`detect_monitored_page_regression`), run from `optimisation_engine/weekly_run.py` via
`.github/workflows/weekly-optimisation.yml` (cron Mon 07:00 UTC). Auto-expires rows past
`monitor_until` (`:1198-1207`). Grace period `grace_days = 14` (`:1173`). For `rewrite` rows it
flags on Google clicks −50%, Google position +5, Google impressions −50%, Bing position +3,
Bing impressions −50% (`:1344-1355`). For `redirect` rows it flags if the old slug still gets
≥1 click (`:1306-1309`). On a flag it writes an `optimisation_opportunities` row and sets
`monitored_pages.status = 'flagged'` (`:1396-1401`). **It emails nobody** — the workflow's
notify step is an `echo` into the Action log (`weekly-optimisation.yml:88-91`).

**Answer to the brief's key question, verified: a redesign rewrite of a monitored page is
completely invisible to this system at the time it happens.** No content hash, no DOM diff, no
title check. Nothing flags, nothing emails, nothing records. The system would only notice
weeks later, if organic traffic subsequently crossed a threshold, as an
`optimisation_opportunities` row a human has to go and read.

That cuts both ways and the plan must say so plainly:
- **Good:** the port cannot trip an alert or email the owner.
- **Bad:** the port also gets **no safety net**. A re-skin that tanks rankings shows up as a
  traffic flag ~4 to 8 weeks after deploy, attributed to nothing in particular, mixed in with
  the Wave 12 maturation curve. Attribution will be destroyed. This is the strongest argument
  in the whole report for **not deploying the redesign inside the armed windows** (§B8).

**Row count:** 70 active Property rows watched to **2026-11-19** — from `docs/Property/STATE.md`
(commit `d39b393a`, 2026-08-21, "70 monitored rows to 2026-11-19"). **Doc-sourced, not verified
against the live table** (deliberately: no prod query). `STATE.md:93` separately mentions "452
active monitored slugs" in an experiment-exclusion context — different scope or stale, not
reconciled.

**Governance discrepancy worth an owner line:** `gh workflow list` shows **Weekly Optimisation
Engine is active**, not disabled, contrary to memory `optimisation_engine` ("6 scheduled
workflows DISABLED 2026-07-13"). Five siblings are `disabled_manually`; this one is not. Either
the memory is stale or a workflow was re-enabled unintentionally.

## B4. The test suite

**Verified by running it.** `cd Property/web && npx vitest run` →
**49 files passed, 1484 tests passed, 6.27s.** No network. Config
`Property/web/vitest.config.ts` (node env, `include: ["src/**/*.test.ts"]`).

```
# full suite
cd Property/web && npx vitest run        # or: npm test
# single file
cd Property/web && npx vitest run src/tests/calculator-goldens.test.ts
```

Supabase admin logs `[admin] SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not configured` — expected
fail-open, not an error.

### The finding that matters

**All 49 files are lead-engine / nurture / backend. Not one asserts page JSX, page copy, or
page metadata.** Coverage against the five change vectors:

| Vector | Files that would break |
|---|---|
| (i) page structure / JSX | **0 / 49** |
| (ii) page copy | **0 / 49** |
| (iii) page metadata | **0 / 49** |
| (iv) calculator output | **1 / 49** (`calculator-goldens.test.ts`) |
| (v) backend only | 48 / 49 |

The 48: lead intake (`leads-submit`, `leads-complete`, `capture-steps`, `pool-intake`,
`lead-events`, `leads-reconcile`, `lead-enroll-resource-guard`, `detail-capture-*`,
`missing-contact`, `enquiry-*`), nurture (`lead-nurture`, `lead-nurture.playground`,
`lead-sequence`, `sequence-gen`, `nurture-control`, `nurture-digest`, `nurture-health`,
`nurture-guardrails`, `send-window`, `lead-aux-cron`), inbound channels (`inbound-email`,
`inbound-email-buyer`, `inbound-twilio`, `telegram-webhook`, `reply-intent`, `reply-extract`,
`lead-channels-permanent`), routing/handoff (`lead-routing`, `lead-handoff`, `lead-dossier`,
`call-brief`, `case-tier`, `lead-offers`, `lead-booking`, `lead-service-template`,
`raw-supply`, `concierge`), compliance/drift (`retention`, `retention-drift`,
`consent-anchor-drift`, `tiers-drift`, `niche-config`), AI (`qa-gate`, `ai-anthropic`),
on-page CTA logic (`intent-engine`), deploy (`deploy-watch`).

### The four named files (verified)

- **`calculator-goldens.test.ts`** — 2095 lines, **241 `it()` blocks in this file**. The
  "~1479" figure in the brief is the *whole suite's* test count at commit `6960986e`
  ("42 goldens, suite 1479"); it is 1484 today. **No external fixture file** — goldens are
  inline literals, computed against pure lib imports (`../lib/cgt`, `../lib/sdlt`,
  `../lib/corpTax`, `../lib/dividendTax`, `../lib/lbtt`, `../lib/ltt`, relative to dodge
  Next.js resolution). First block `registry contract (TL-01)` asserts
  **`expect(TOOLS.length).toBe(26)` at `:76`**.
  **It bypasses React entirely.** A calculator UI re-skin that leaves the compute libs alone
  passes this test while providing *zero* regression coverage for the UI.
- **`qa-gate.test.ts`** — 962 lines. Tests `qaGateMessage()` from `@/lib/ai/qa-gate` against
  **lead-nurture email/SMS/brief copy**: banned em-dashes, banned bare figures, required
  `{{bookingUrl}}` / allowlisted URL paths (`/tools`, `/calculators`, `/research`), subject
  length, SMS STOP language. **Not site page copy.** A redesign cannot break it — but note it
  allowlists `/tools`, `/calculators`, `/research`, so a route rename in those families would
  break outbound nurture links without failing this test.
- **`intent-engine.test.ts`** — 113 lines, pure test of `evaluate()` from `@/lib/intent/engine`,
  pinning booking-nudge behaviour on the `sticky_cta` / `hero_cta` / `returning_bar` slots.
  **These three slot names are the coupling**: if the redesign renames or removes a CTA slot,
  the intent engine stops firing and this test still passes (it tests the engine, not the
  mount points).
- **`call-brief.test.ts`** — 258 lines, tests `buildCallBrief()` (Anthropic fully mocked via
  `vi.mock`) and `renderBriefSection()`, an internal staff call-prep email renderer. Nothing to
  do with the public site.

**Conclusion for the plan: a green CI run after this port proves the lead engine still works
and the calculator maths is unchanged. It proves nothing about the site.** All page-level
verification in the checklist below has to be manual or newly written.

## B5. JSON-LD schema

Builders: `src/lib/schema.ts` (`buildBreadcrumbJsonLd:6-17`, `buildBlogPostingJsonLd:27-100`
with optional FAQPage + HowTo, `buildOgImageUrl`), `src/lib/faq-page-schema.ts`
(`buildFaqPageJsonLd`), `src/lib/organization-schema.ts` (`buildOrganizationJsonLd`),
`src/lib/calculator-schema.ts` (`buildCalculatorJsonLd` → WebApplication).
34 page files + `components/blog/BlogPostRenderer.tsx` + `components/ui/Breadcrumb.tsx` emit
`<script type="application/ld+json">`.

| Page / family | Types | Emitter | Safe / at risk |
|---|---|---|---|
| `/` | Organization, FAQPage, AccountingService, Service+OfferCatalog, BreadcrumbList, WebSite, WebPage | `app/page.tsx:214-307` | **Mixed** — Org/FAQ/Breadcrumb via builders; AccountingService/Service/WebSite/WebPage hand-built inline, at risk |
| `/about` | **none** | — | **Verified gap: `/about` emits zero structured data today** and `app/layout.tsx` injects none |
| `/services` | ItemList, BreadcrumbList | `app/services/page.tsx:71-132` (hand-built) | At risk |
| Service pages ×4 | present (grep) | `app/services/<slug>/page.tsx` | At risk (inferred from grep, not deep-read) |
| Blog category hubs ×10 | BreadcrumbList, CollectionPage (`@graph`) | e.g. `app/blog/property-finance/page.tsx:39-64` | **At risk — hand-duplicated across 10 files** |
| Blog article (783 posts) | BlogPosting, FAQPage, HowTo | `components/blog/BlogPostRenderer.tsx:4,151` → `schema.ts:27-100` | **Safe** — one renderer for all posts |
| `/calculators/[slug]` (21 generic) | WebApplication, FAQPage | `app/calculators/[slug]/page.tsx:9-10,42-58` | Safe (one dynamic file) |
| Bespoke calculators ×5 | present (grep) | 5 separate `page.tsx` | At risk |
| `/locations/[slug]` | AccountingService, FAQPage, BreadcrumbList | `:30-40`, `:832-847`, `:863` | Mixed, one file |
| `/cost-of-selling-a-property` | Article, BreadcrumbList, FAQPage | `page.tsx:167-199` | At risk |
| `/leasehold` | Article, BreadcrumbList, FAQPage | `page.tsx:164-198` | At risk |
| `/landed-estates` | Article, BreadcrumbList, FAQPage | `page.tsx:162-194` | At risk |
| `/landlord-compliance` | Article, BreadcrumbList, FAQPage | `page.tsx:270-302` | At risk |
| `/for-letting-agents` | Article, BreadcrumbList (no FAQPage) | `page.tsx:92-122` | At risk |
| `/blog/property-finance` | BreadcrumbList, CollectionPage | `page.tsx:39-64` | At risk |
| Breadcrumbs generally | BreadcrumbList | `components/ui/Breadcrumb.tsx:6,15-22` | **Safe** |

**New defect found (verified, pre-existing, unrelated to the redesign): all five pillar pages
emit `BreadcrumbList` twice** — once from a hand-built inline `breadcrumbSchema` `<script>`,
and again from the `<Breadcrumb items={...}>` component they also render, which independently
calls `buildBreadcrumbJsonLd`. Confirmed by reading `leasehold/page.tsx:178-198` and
`for-letting-agents/page.tsx:106-122` in full. This is live on 5 production pages today. The
port is the natural moment to fix it — delete the inline block, keep the component.

**There is no structured-data layer.** Schema is bundled inside the same React components that
render the visible UI, and there is no JSON-LD snapshot test anywhere in the 49 files. Replace
a component, lose the schema, ship green. This is the #1 silent-regression vector in the port.

## B6. Canonicals and redirects

**`src/middleware.ts`, 599 lines (verified, read in full).**

| Map | Lines | Count | Shape |
|---|---|---|---|
| `BLOG_TO_LOCATION` | `:8-14` | 5 | slug → `/locations/<slug>`; spread into `DUPLICATE_REDIRECTS` at `:535` |
| `SLUG_TO_CATEGORY_MAP` | `:16-406` | **373** | old flat slug → category slug, rebuilds `/blog/<cat>/<slug>` |
| `DUPLICATE_REDIRECTS` | `:408-536` | **112** | dead slug → full replacement path |

Host rule `:538,548-553`: apex `propertytaxpartners.co.uk` → `www.`, **308**, path+query
preserved, scoped to that exact host (localhost and Vercel previews untouched).
Route rewrites `:556-589`: flat `/blog/[slug]` → nested (`:556-567`); `/blog/category/[slug]`
→ `/blog/[slug]` (`:570-574`); a second dedup pass on already-nested paths that also re-fixes
miscategorised posts (`:577-589`).
`config.matcher` `:597`: `/((?!_next/static|_next/image|favicon.ico).*)` — every request.

**`Property/web/vercel.json` (15 lines, verified): no `redirects`, `rewrites` or `headers` at
all.** Only `installCommand`, `buildCommand`, `framework`, and 6 `crons` (`:6-13`). No
`vercel.ts`. **All routing logic is in `middleware.ts`** — good news, one file to protect.

### The shadowing bug is systemic, not a one-off

CONTEXT.md §6.3 flags `property-accountant-services` appearing in both maps. Confirmed
(`SLUG_TO_CATEGORY_MAP:165` and `DUPLICATE_REDIRECTS:423`) — **and it is 95 of the 112
`DUPLICATE_REDIRECTS` keys, an 85% collision rate.** `DUPLICATE_REDIRECTS` is checked first in
both branches (`:559` before `:563`; `:580` before `:585`) and returns immediately, so those
95 `SLUG_TO_CATEGORY_MAP` entries are unreachable dead code.

**Redesign collision to flag explicitly:** deleting the 95 dead entries is safe *today*. But if
anyone "tidies" the middleware and flips the check order, 95 slugs silently start resolving to
**different** 301 targets. `middleware.ts` is on the ~12 heavy-churn conflict list, so this is a
live risk. Rule for the plan: **middleware match order is load-bearing; do not reorder.**

### Canonicals

52 files match `alternates.canonical`. Every static page hand-authors
`alternates: { canonical: \`${siteConfig.url}${PAGE_PATH}\` }` against a local `const PAGE_PATH`
(verified in `cost-of-selling-a-property/page.tsx:10,18` and `leasehold/page.tsx:18`).
**There is no shared canonical helper — it is copy-pasted 52 times.** Five dynamic routes use
`generateMetadata` (`blog/[category]/[slug]`, `locations/[slug]`, `calculators/[slug]`,
`resources/[topic]`, `embed/[slug]`) and compute it from params (**inferred** — pattern read on
2 static pages + a 52-file grep, not file-by-file).

Consequence: any page file rewritten without its `PAGE_PATH`/`alternates` block loses its
canonical, and nothing catches it.

### `niche.config.json` — the sharpest collision in the whole port

`diff tmp/design_migration/Property_zip/niche.config.json Property/niche.config.json` = 208
lines. Verified deltas:

| Field | Designer | Monorepo |
|---|---|---|
| `enquiry_retention_months` (`:15`) | **3** | **24** |
| partner `name` (`:18`) | **"DJH Business Advisers Limited"** | "regulated firms in our specialist partner network" |
| partner `descriptor` | "(part of the DJH group of companies)" | "" |
| `privacy_policy_url` | `https://www.djh.co.uk/privacy-policy/` | `null` |
| Resources nav | no pillar entries | **5 pillar entries** (`/leasehold`, `/landlord-compliance`, `/landed-estates`, `/cost-of-selling-a-property`, `/for-letting-agents`) |
| footer nav | shorter | 4 service pages + landlord-tax guide added |
| `categories` | no "Property Finance" | includes **"Property Finance"** (`:224`) |

**Taking the designer's `niche.config.json` reverts a data-retention setting and a partner
identity.** Per memory, the DJH gate was purged 2026-08-14 as obsolete. That is a legal and
compliance regression, not a design choice — the designer simply had a July snapshot. **Rule:
our `niche.config.json` wins; port only design-relevant keys from theirs, one at a time.**

Downgrade on one point: the `categories` array is declarative only. It is typed at
`src/config/niche-loader.ts:76` but no runtime consumer was found;
`getAllCategories()` (`blog.ts:119`) derives categories from post frontmatter. So losing
"Property Finance" from config does **not** break routing or the sitemap. The nav entries and
the retention/partner fields are the real damage.

## B7. Metadata ownership

Two mechanisms, verified:

1. **Static pages** (all 6 unseen pages + ~45 others): inline `export const metadata: Metadata`
   literal, with `TITLE` / `DESCRIPTION` as local consts in the page file
   (`cost-of-selling-a-property/page.tsx:11-13,15-30`;
   `blog/property-finance/page.tsx:10-31`). Hand-authored. No shared helper.
2. **Blog posts:** `metaTitle` / `metaDescription` are frontmatter, read at
   `src/lib/blog.ts:25-26` (`fm.metaTitle ?? fm.title!`, `fm.metaDescription ?? ""`).

**The SERP meta programme writes metadata — but only to markdown.** `scripts/meta_apply.py`
(read in full to :120):

```
python scripts/meta_apply.py --site <key> --proposals <path.json> [--execute]
```

It goes through `optimisation_engine/apply/frontmatter_utils.py` `fm_read`/`fm_write`
(imported `:59`), validates at `_validate_proposal:75,90,95-96`, and applies via
`run_apply_lifecycle` (`:55-58`), which also stamps `metaTitle_prev`,
`metaDescription_prev`, `dateModified`, `reviewedBy`. Sibling scripts:
`meta_property_candidates.py`, `meta_property_ledger.py`, `meta_worklist.py`,
`meta_resolution_check.py`, `fix_meta_overflows.py`; underlying lifecycle
`optimisation_engine/apply/meta_only.py`.

**Answer to the brief's question:**
- **Static `.tsx` pages, including all 6 unseen ones: no clobber risk.** `meta_apply.py` has no
  code path that touches `.tsx`. Their metadata is owned by whoever edits the page file.
- **Blog `.md` posts: real risk.** If the port rewrites the article template's frontmatter
  schema, renames `metaTitle`/`metaDescription`, or regenerates `.md` files, it overwrites
  SERP-programme output *and* its `metaTitle_prev` / `dateModified` / `reviewedBy` trust-signal
  history. The programme's own dry-run / `optimisation_changes` / `OPTIMISATION_AUTO_COMMIT`
  protections guard only against its own concurrent runs.

**Rule for the plan: the port must not touch `content/blog/*.md` frontmatter at all.** Blog
changes are template-only.

No per-page `seo_persona` or meta formula was found in Property's `niche.config.json` (the
`seo` block types only `locale`, `organization_type`, `service_areas`, `google_analytics_id`,
`google_site_verification`, `theme_color` per `types/niche-config.ts:81-88`), despite memory
`holistic_meta_strategy` describing one. **Inferred**: that concept is not implemented for
Property.

## B8. In-flight work this migration collides with

From `docs/Property/STATE.md` (567 lines), `wave10/11/12_page_tracker.md`,
`HANDOFF_2026-08-20.md`, `HANDOFF_2026-08-21.md`.

**Everything shipped 2026-08-21, three deploys in one day.** Corpus ~876 static pages. Wave 11
(19 pages) + CGT cluster + tools-family (Phase B) in `dpl_B8SGyMhCB4BdvwNns1fMsW67xuDp`;
rental-income (Phase C) and rural/landed-estates in the afternoon; Wave 12 (13 spokes + pillar
+ calculator) and agents1 in `dpl_F5UBBHoxZLmn9yFyDB1j9VE3NkJt` that night, 22 URLs verified 200.

**Dated commitments that must not slip:**

| Date | Item | Source |
|---|---|---|
| ~2026-09-01 | Bing 14d read, SDLT batch | STATE.md:60,76,252 |
| **~2026-09-15** | Bing 28d read; **Phase D incorporation freeze-check re-runs after it**; T5 benchmarks EXTEND unfreezes | STATE.md:252-267,313-317; HANDOFF_2026-08-21.md:22-23 |
| ~2026-09-18 | Google 28d read, 08-21 batches | STATE.md:60-64 |
| **2026-11-19** | Google 90d read; **all 70 monitored rows expire** | STATE.md:143,153-156,198 |

- **Phase D** = the Incorporation cluster (9,130/mo family). **DEFERRED** (STATE.md:254-267):
  the freeze-check found only ~1,550/mo unfrozen, below the ~2,000/mo threshold. Re-runs after
  the ~09-15 reads. Not a hard calendar date, contingent on the Bing read landing.
- **Developers pillar** = one pillar page for the developer segment, explicitly gated
  **post-Phase-D** (HANDOFF_2026-08-21.md:132; STATE.md:292). Nothing built, no file exists.
- **"Delta back-patches post-window"** = QA-identified corrections deliberately held because
  the page is inside an armed measurement window, under the standing rule
  **one change per page per measurement window** (§9.3, HANDOFF_2026-08-20.md:135). Examples:
  Wave 12 flag F-176 (post-window s.3(7) back-patches), the rural delta list (s.125 woodlands,
  environmental-scheme APR, s.162B, mixed-estate voice sweep).

**This is the collision, and it is the biggest scheduling finding in the report.** The house
rule is one change per page per measurement window. A redesign is a change to every page. If
the port deploys before 2026-11-19 it:
- breaks the one-change rule on 70 monitored pages at once;
- destroys attribution for the 28d and 90d reads that the whole cluster programme is waiting
  on (a re-skin and a content maturation curve are indistinguishable in GSC);
- and gets no protection in return, because `monitored_pages` cannot see a rewrite (§B3).

Options for the owner, not a decision I should make:
- **(a)** hold the deploy to after 2026-11-19. Clean attribution, cluster programme unaffected,
  but three months of finished redesign sitting unshipped.
- **(b)** deploy sooner but **exclude the 70 monitored slugs** from the re-skin, shipping only
  chrome (header/footer), the homepage, `/about`, `/services`, calculators and legal pages.
  Ships most of the visible value, keeps every armed page byte-stable. **This is the option I
  would recommend the plan present first.**
- **(c)** deploy everything and accept that the 28d/90d cluster reads are void, re-baselining
  all 70 rows from the deploy date.

Also note `docs/Property/REDESIGN_ARCHITECTURE.md`, status line `:3`:
**"DESIGN / AWAITING OWNER SIGN-OFF (2026-07-03)"** — an *internal* 5-page redesign spec
("Emerald Glass: Precision Depth", Home/Services/Incorporation/About/Contact) that **predates
the designer snapshot by two weeks, was never signed off, and was never built**. It ends with 4
unresolved owner decisions (`:132-136`). **There are two competing redesign specs targeting the
same five core pages.** The owner should be asked which is live before anything is ported.

Non-blocking, undated, from STATE.md §3: one stale-frontmatter page fix, an SDLT 15%→17%
corpus sweep (deferred), a minor-cleanup sweep.

`docs/Property/house_positions.md` is 4,307 lines and is the locked ground truth. Compliance is
by `§N.M` citation, with explicit "Do not write" lists per section. Relevant here because QA
gates check **byte-identical protected elements** on EXTEND pages: a re-skin that moves or
restructures a rate table, worked example or FAQ must preserve the exact protected wording.

---

# SEO PRESERVATION CHECKLIST

Everything that must be identical or better after the port, and how to verify each **locally**.
Run against `npm run build && npm start` on `localhost:3000` unless stated. No production calls.

Suggested one-off scratch harness (put it in `tmp/design_migration/`, delete after — do **not**
commit it to the repo): crawl the local `/sitemap.xml`, and for each URL record status, `<title>`,
meta description, canonical, every `<script type="application/ld+json">` payload, `<h1>`, and the
set of internal `href`s. Snapshot before the port, snapshot after, diff. That one script covers
S1-S6 and R1 below and is the single highest-leverage thing the plan can build, because §B4
proves the test suite will not do it.

### S — Sitemap and routes
- **S1. Route set is a superset.** `find Property/web/src/app -name page.tsx` before vs after —
  55 routes, no deletions. Specifically the 6 unseen pages and the 10th blog category
  `blog/property-finance/` must still exist.
- **S2. Sitemap URL set unchanged.** Diff local `/sitemap.xml` before/after. Expect 26 static +
  locations + **26** tools + 10 categories + 783 posts. Any drop is a regression.
- **S3. `staticPaths` still matches disk.** `sitemap.ts:9-37` is hand-maintained with no guard.
  Worth adding a cheap test that asserts every `staticPaths` entry resolves to a `page.tsx` and
  vice versa — this is the one new test I would write for this migration.
- **S4. `TOOLS.length === 26`.** `npx vitest run src/tests/calculator-goldens.test.ts`
  (`:76`). Catches a designer-`registry.ts` port instantly.
- **S5. Every sitemap URL returns 200 locally.** Crawl `/sitemap.xml` against `localhost:3000`.
  Catches the "sitemap says 200, server says 404" failure mode from §A.2.
- **S6. `post.noindex` still respected** (`sitemap.ts:91`) and `post.date` still drives
  `lastModified` (`:96`).

### M — Metadata and canonicals
- **M1. Title and meta description byte-identical** on all 55 routes unless the change is a
  deliberate, recorded improvement. No page loses a description.
- **M2. Canonical present and correct on all 52 pages that have one.** The hand-copied
  `alternates.canonical` pattern is the failure point — grep the count before and after:
  `grep -rc "alternates" Property/web/src/app` must not fall.
- **M3. `content/blog/*.md` frontmatter untouched.** `git diff --stat Property/web/content/`
  must be **empty** at the end of the port. Protects SERP-programme output (§B7).
- **M4. hreflang preserved** — `sitemap.ts:38-40` emits `en-GB` + `x-default` per URL.

### R — Redirects and middleware
- **R1. All 490 redirect keys still resolve to the same target.** 373 `SLUG_TO_CATEGORY_MAP` +
  112 `DUPLICATE_REDIRECTS` + 5 `BLOG_TO_LOCATION`. Script it against localhost, compare the
  target of every key before and after.
- **R2. Match order unchanged.** `DUPLICATE_REDIRECTS` must still be checked before
  `SLUG_TO_CATEGORY_MAP` at `middleware.ts:559,580`. 95 slugs change destination if this flips.
- **R3. Apex → www 308 intact** (`:548-553`), path and query preserved, previews untouched.
- **R4. `config.matcher` unchanged** (`:597`).
- **R5. Do not add redirects.** Standing rule: never collapse pages, never add
  `DUPLICATE_REDIRECTS`. If the redesign wants to merge two pages, that is a separate,
  owner-approved workstream.
- **R6. The 5 consolidated city posts stay deleted.** They must not return from the designer's
  `content/blog/`.

### J — Structured data
- **J1. Schema type set per URL is a superset.** Diff every `ld+json` payload before/after. The
  "at risk" rows in §B5 are where this will break: homepage AccountingService/Service/WebSite/
  WebPage, `/services` ItemList, all 10 category hubs, 5 bespoke calculators, all 6 unseen pages.
- **J2. `BlogPosting` on all 783 posts.** Guaranteed only while
  `BlogPostRenderer.tsx:151` survives. Verify one post per category.
- **J3. `BreadcrumbList` everywhere it is today** — but **exactly once**. Fix the §B5 double-emit
  on the 5 pillars while porting: delete the inline block, keep `<Breadcrumb>`.
- **J4. `FaqPage` preserved** wherever an FAQ block is re-skinned into the designer's
  `FaqSection`. `FaqSection.tsx:12` must be checked for whether it emits schema itself; if it
  does not, the page must keep calling `buildFaqPageJsonLd`.
- **J5. `WebApplication` on all 26 calculators** (`calculator-schema.ts` via
  `calculators/[slug]/page.tsx:42-58`), including the 10 the designer never saw.
- **J6. Optional improvement, not a preservation item:** `/about` emits no schema at all today
  (verified). Adding Organization there is a free win, not a regression risk.

### L — Internal link graph
- **L1. Nav renders all 5 pillar entries.** Our `niche.config.json` must win. Verify the new
  `SiteHeader` still reads `getActiveNav` (`niche-loader.ts:135`) — otherwise the whole top-nav
  link graph is gone.
- **L2. Related-posts rail alive on every article.** `getRelatedPosts` has exactly one call
  site (`blog/[category]/[slug]/page.tsx:88`); it is trivially droppable in a template rewrite.
- **L3. Essential-guides rail alive** on the homepage and `/blog` index
  (`essential-guides.ts:10`, 12 links).
- **L4. Pillar → spoke links intact.** The consts at the top of each pillar page
  (`cost-of-selling-a-property:34-36`, `landed-estates:34-37`, `leasehold:32`,
  `for-letting-agents:32-33`) are the cluster's internal link equity. Count outbound internal
  links per page before/after; the count must not fall.
- **L5. `intent/taxonomy.ts` `landlord-compliance` and `leasehold` topics survive** (`:80-89`,
  `:128-139`) and still resolve their `/resources/<topic>` guides.
- **L6. `/for-letting-agents` → `/embed` pitch intact** (`page.tsx:316,334`).

### C — Config, compliance, content
- **C1. `niche.config.json`: `enquiry_retention_months` stays 24.** Non-negotiable.
- **C2. Partner block stays "regulated firms in our specialist partner network",
  `privacy_policy_url: null`.** No DJH reversion.
- **C3. Facts still match `house_positions.md`.** Per-page factual QA; protected elements on
  EXTEND pages must stay byte-identical.
- **C4. No em-dashes introduced** in any ported user-facing copy.
- **C5. No new interruptive UI.** The designer's soft-gated calculator results, modals and
  banners are owner decisions (CONTEXT §7), not port defaults.

### T — Tests and build
- **T1. `cd Property/web && npx vitest run` → 49 files, ≥1484 tests, all pass.** Baseline
  captured 2026-08-22: 1484/1484 in 6.27s.
- **T2. `python scripts/check_dependency_closure.py` before any deploy.** Standing rule.
- **T3. `npm run build` clean.** Expect real typecheck failures first: the designer's components
  were authored against 31 stubbed `vendor/web-shared/` fakes (CONTEXT §5) and will not
  typecheck against the real package.
- **T4. `.vercelignore` re-includes all of `<site>/web`** — deploy from a clean worktree at a
  pushed SHA, never the working tree.

### W — Windows and sequencing (the constraint, not a check)
- **W1. 70 monitored Property rows are armed to 2026-11-19.** House rule: one change per page
  per measurement window.
- **W2. Do not register or re-baseline monitored pages.** Owner-triggered production action.
  `scripts/register_monitored_batch.py ... --commit` is documented in §B3 for the owner's use,
  and was not run.
- **W3. Owner decision required before any deploy:** hold to 2026-11-19 (option a), ship only
  unmonitored chrome and core pages (option b, recommended), or accept void cluster reads
  (option c). See §B8.
- **W4. Do not let the port consume the ~09-15 Phase D window** or pre-empt the developers
  pillar.

---

## Open questions for the owner (do not guess)

1. **Deploy timing vs the armed windows** — options (a)/(b)/(c) in §B8. This gates everything.
2. **Two competing redesign specs.** `docs/Property/REDESIGN_ARCHITECTURE.md` (internal,
   2026-07-03, never signed off) targets the same five core pages as the external designer's
   work. Which is live?
3. **Weekly Optimisation Engine is running** despite memory saying it was disabled 2026-07-13.
   Intended?
4. `monitored_pages` **has no migration in version control.** Should it be captured?

## Things I did not verify

- The four service pages' and five bespoke calculators' schema payloads (grep-confirmed
  present, not deep-read).
- The 5 dynamic-route `generateMetadata` implementations (canonical pattern inferred from a
  52-file grep plus 2 static reads).
- The 70-row monitored_pages count and the 2026-11-19 date (doc-sourced from `STATE.md`, not
  queried against the live table, deliberately).
- Whether the designer's `FaqSection.tsx` emits FAQPage JSON-LD itself (checklist item J4 exists
  precisely because this is unknown).
- Implementations of the 35 `components/property/*` bespoke components — the mapping table in
  §A.1 is inferred from names and the pillars' data shapes.
