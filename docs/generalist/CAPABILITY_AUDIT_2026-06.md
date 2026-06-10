# Generalist (Holloway Davies) — Capability Audit vs PROPERTY-CAPABILITY-STANDARD v1-FINAL

**Audited:** 2026-06-10 · **Standard:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (v1-FINAL, 71 capabilities, FROZEN)
**Scope:** read-only audit of `generalist/web`. No code changes. Findings cite capability IDs.
**Status:** COMPLETE (all four parts user-reviewed part-by-part, 2026-06-10). Cluster-boundary clarifications locked: GAP-1 storage-key continuity rule; GAP-8 executes inside host clusters (no double-touch with GAP-5).

Axis discipline (per §0 of the standard): Part 1 is the `[Inventory]` axis — niche-led, never list-parity with Property. Machinery absences are noted only as pointers; they are scored in Part 2 (`[Mechanism]`) and routed in Part 3 (capability gaps). Design identity is out of scope everywhere; Part 4 reads discipline only.

---

## Part 1 — Inventory map

### 1.1 What generalist has

**Interactive tools — 7 live calculators** (`src/app/calculators/*/page.tsx`, index at `calculators/page.tsx`):
Salary & Dividend Optimiser · Take-Home Pay · Employer NI & Cost-to-Hire · Pension Contribution Optimiser · R&D Tax Credit Estimator · BADR CGT · VAT Scheme Comparator. All hand-rolled React components with inline tax compute (`src/components/calculators/*.tsx`); no registry, no embeds, no config-driven pipeline (→ Part 2: TL-01/02/03).
Also present: **4 unrouted, property-niche calculator components** (`IncorporationCostCalculator`, `Section24Calculator`, `MTDCheckerCalculator`, `PortfolioProfitabilityCalculator.tsx`) — copy-paste residue from Property. Section 24 and Portfolio are off-niche dead code (cleanup); Incorporation and MTD are on-niche and unshipped (see 1.2).

**Content corpus — substantial and diverse:**
- Blog: **366 markdown posts** (`content/blog/`, gray-matter, category routing `/blog/[category]/[slug]`, plus an editorial `/blog/stage/*` status view Property has no equivalent of).
- Fundamentals: **17 pillar guides** (`content/fundamentals/`).
- Guides: **10+ long-form playbooks** as generated TS data (`app/guides/[slug]/data.ts`, built by `pipeline/generate_guides.py`), with gated-feel `/guides/[slug]/download` PDF pages.
- Glossary: **20+ defined terms** (`app/glossary/[slug]/data.ts`, generated) with DefinedTerm schema.
- Locations: **~193 city pages** (`app/locations/[slug]/data.ts`, 6,788-line inline dataset).
- Team/author pages (`app/team/[slug]/data.ts`) backing E-E-A-T bylines (james-holloway).
- Templates: **7 static PDF templates** (`app/templates/page.tsx`, served as static files, ungated).

**Lead capture:** one `LeadForm.tsx` (contact, free-health-check, blog/calculator CTAs) submitting through the shared `submitLead()` with consent fields and config-driven roles (Limited company / Sole trader / Contractor / Partnership...). No honeypot, no journey stitching (→ Part 2: LD-03/05).

**Newsletter — a complete, home-grown pipeline ("The Director's Brief")** that is *more* mature than Property's in places:
- Double opt-in with stateless HMAC tokens (`lib/newsletter/tokens.ts`), confirm/unsubscribe routes, 5-step welcome drip on Vercel Cron gated by `CRON_SECRET`, Svix-signature-verified Resend webhook handling bounce/complaint (`api/resend/webhook/route.ts`), honeypot on the signup form (`components/newsletter/SignupForm.tsx:36`).
- But: it writes to its **own `newsletter_subscribers` table with no `site_key`**, separate from the shared `subscribers` schema Property uses — a fork, not a composition (→ Part 3).
- Engagement surfaces exist for it: `ExitIntentModal`, `InlinePrompt`, `StickyCard` (newsletter-specific, no central intent provider → Part 2: EN-01).

**SEO surface — broad:** derived sitemap (posts/categories/fundamentals/cities/glossary/guides/team + hand-listed statics), AI-crawler robots allow-list (same family as Property's), per-type schema builder library (`src/lib/schema/` — article, FAQ, HowTo, breadcrumb, DefinedTerm, WebApplication, person, local-business...), dynamic OG images, **plus RSS (`feed.xml`) and `llms-full.txt`** — two GEO surfaces Property lacks.

**Analytics:** GA4 script only (`components/analytics/GoogleAnalytics.tsx`). No consent module, no first-party SDK, no `/api/track`, no experiments, no web-vitals capture, no dashboard of any kind (→ Part 2: §3, §9 wholesale).

**Platform:** same chassis as Property — Next.js 15.5.14 / React 19 / TS strict / Tailwind 4, `niche.config.json` + typed loader, workspace `web-shared` consumed via `transpilePackages`, ESLint in builds, same security-header block (including the same `unsafe-inline`/`unsafe-eval` CSP), HSTS, frame-deny.

### 1.2 What the niche plausibly needs that it lacks (niche-led, not Property-led)

Holloway Davies serves limited companies, sole traders, contractors, and partnerships — general UK accountancy. Gaps below are justified by that audience, not by Property's list:

| Plausible need | Why (niche logic) | Nearest existing asset |
|---|---|---|
| **MTD for Income Tax checker** | MTD ITSA is the single biggest compliance change hitting sole traders/landlords from April 2026; every general accountant fields this question daily | `MTDCheckerCalculator.tsx` already exists unrouted — needs de-property-fying + a route |
| **Incorporation cost/benefit tool** | "Should I incorporate?" is THE generalist conversion question; the site already has an `/incorporation` page with no interactive support | `IncorporationCostCalculator.tsx` exists unrouted (property-flavoured; needs generalising) |
| **VAT registration threshold checker** | Core sole-trader/small-ltd anxiety (£90k rolling 12-month test is widely misunderstood); complements the existing VAT Scheme Comparator | Glossary entry only |
| **Corporation tax (with marginal relief) calculator** | Every ltd-company client; marginal relief between £50k–£250k is genuinely hard to do by hand | None (compute exists in Property's `corpTax.ts` as a reference implementation) |
| **Self-assessment payment-on-account planner** | Recurring July/January cashflow shock for sole traders and directors | None |
| **CGT calculator (general assets/shares)** | BADR tool covers business disposals only; share/asset disposals are common generalist queries | BADR calculator (adjacent) |
| **Gated lead-magnet versions of the 7 PDF templates** | Templates are given away ungated today — zero lead capture from the site's most downloadable assets | `/templates` + `/guides/[slug]/download` pages exist; no gate mechanism (→ EN-03 machinery in Part 3) |
| **Tax-deadline calendar/reminder asset** | Generalist audiences span every deadline regime (CT, SA, VAT, PAYE, P11D); a recurring-traffic + nurture asset | `/uk-tax-rates` page + JSON endpoint (adjacent) |

Counts are not targets; each row stands on niche demand and most have a head start. Prioritisation belongs to the execution phase, not this audit.

### 1.3 Explicitly out of scope (Property has it; generalist does not need it)

Per the standard's Inventory rule, none of these are gaps:

- **Property-tax tool fleet:** SDLT/LBTT/LTT trio, first-time-buyer SDLT, Section 24, rental income/yield, buy-to-let cashflow, rent-a-room, property allowance, portfolio profitability. (Corollary: the dead `Section24Calculator.tsx`/`PortfolioProfitabilityCalculator.tsx` components in generalist should be *deleted*, not routed.)
- **Landlord Tax Index** research asset (`/research/*`) — Property's data-PR play; generalist would need its own niche-appropriate asset, which is a growth-strategy decision, not a parity item.
- **Property's location set and content categories** — generalist's 193-city footprint and 9-category general-accounting taxonomy are its own.
- **Property's premium calculator overlays** — the *mechanism* (TL-07) is standard; Property's specific premium SKUs are not.
- **Property's 5-step property-tax nurture sequence** — generalist has its own Director's Brief series; sequence content is inventory.

### 1.4 Seed-smell check (inherited Property defects — verified in source)

The five smells Step 0 found in Property, checked here because generalist largely copied the same code:

| Seed | Inherited? | Evidence |
|---|---|---|
| PF-07 hardcoded site key | **Variant inherited.** No `SITE_KEY` constant, but the newsletter pipeline sidesteps site keys entirely via its own keyless `newsletter_subscribers` table; own-domain literals hardcoded in `api/uk-tax-rates.json/route.ts:22` (canonical Link header), `api/og/route.tsx:81` (wordmark), `api/resend/webhook/route.ts:14` | Lead path is clean: `source: niche.content_strategy.source_identifier` (`LeadForm.tsx:107`) |
| EN-06 hardcoded from-name/URL fallbacks | **Inherited (same pattern, own values).** `lib/resend.ts` defaults to "Holloway Davies" / `hello@hollowaydavies.co.uk`; `.env.local.example` even carries a *different site's* values (`agencyfounderfinance.co.uk`) — the example file itself is copy-paste residue | |
| LD-06 filler in universal column | **Inherited.** `LeadForm.tsx:105` submits `practice_name: ""` — same JSONB-extras pressure as Property's `"—"` | |
| CT-02 silent frontmatter defaults | **Inherited verbatim.** `lib/blog.ts:15` throws on slug/title only; `:23-34` silently defaults date/author/category/metaDescription — same code as Property | |
| OB-01 dashboard auth | **N/A — no dashboard exists at all.** Vacuous pass on OB-01/02; the real finding is total observability absence (Part 2, §9) | |
| ED-01 zero tests | **Inherited.** No `*.test.*`/`*.spec.*` anywhere under `generalist/web`; inline calculator maths has no regression net. Repo-root `.github/workflows/ci-build-test.yml` exists — whether it exercises generalist is checked in Part 2 | |

---

## Part 2 — Gap analysis vs the standard (all 71 capabilities)

**Tally: 18 pass · 16 partial · 32 fail · 5 n/a (justified).**

Four root causes explain most of the red; fixing them clears whole rows:
- **R1 — No first-party analytics pipeline.** All of §3 (9 fails) plus TL-06, the telemetry halves of LD-02/EN-01, LD-05's applicability, OB-03..06, and ED-07's vitals clause. One uplift (adopt the shared §3 stack) flips ~16 verdicts.
- **R2 — No registry architecture.** TL-01/02/03, ED-02, and SEO-01's hand-listed calculators.
- **R3 — Inherited Property defects.** PF-02, SEC-02, CT-02, ED-01 are the same code/omissions Property has — flagged `do not copy` in the standard, copied anyway (before the standard existed).
- **R4 — The newsletter is a fork, not a composition.** Its own keyless table, no consent text, no atomic send claim: PF-07, LD-09, EN-05, and Part 3's biggest item.

### §1 Platform foundation (PF)

| ID | Verdict | Evidence |
|---|---|---|
| PF-01 | **partial** | Config + loader drive nav/forms/SEO correctly, but own-domain literals hardcoded: `api/uk-tax-rates.json/route.ts:22` (canonical Link header), `api/og/route.tsx:81` (wordmark), and `lib/resend.ts` from-name/email defaults |
| PF-02 | **fail** | `config/niche-loader.ts:71` — same blind `as NicheConfig` cast as Property (do-not-copy inherited) |
| PF-03 | **pass** | `submitLead` from `@accounting-network/web-shared`; `transpilePackages` in `next.config.ts`; no local reimplementation |
| PF-04 | **fail** | `.github/workflows/ci-build-test.yml` builds Dentists/Property/Medical/Solicitors — **generalist is absent from CI entirely**; no automated check of web-shared changes against this site |
| PF-05 | **partial** | `.env.local.example` documents server vars too (better than Property) but carries a different site's values (`agencyfounderfinance.co.uk`) — stale copy-paste contract |
| PF-06 | **pass** | `tsconfig.json` strict; `next.config.ts` `ignoreDuringBuilds:false`; Vercel build gates deploy |
| PF-07 | **fail** | Two aliases: `site_key: "generalist"` vs `source_identifier: "general"` (`niche.config.json:141-142`); newsletter table carries no site key at all |

### §2 Security & runtime (SEC)

| ID | Verdict | Evidence |
|---|---|---|
| SEC-01 | **pass** | Full header block in `next.config.ts` (HSTS 2y/preload, XFO DENY, nosniff, referrer, permissions, CSP) |
| SEC-02 | **fail** | Same `'unsafe-inline' 'unsafe-eval'` script-src as Property (do-not-copy inherited) |
| SEC-03 | **pass** | No embeds; everything framing-denied — correct posture for a site with no frameable surface |
| SEC-04 | **partial** | All API routes declare `runtime`; only `cron/newsletter-drip` declares `maxDuration` — subscribe/confirm/unsubscribe/webhook inherit defaults |
| SEC-05 | **partial** | Resend webhook is exemplary (Svix HMAC, anti-replay, `whsec_` handling); cron refuses when unset but compares `auth === Bearer...` plain (`newsletter-drip/route.ts:23`, timing-unsafe) |
| SEC-06 | **fail** | No rate limiting anywhere; `api/newsletter/subscribe` sends a confirmation email per request, unthrottled |
| SEC-07 | **pass** | Service role only in server modules (`lib/newsletter/subscribers.ts`); anon key only for the RLS-bounded lead insert |
| SEC-08 | **fail** | Newsletter form has a honeypot (`SignupForm.tsx:36`); **LeadForm — the highest-value write surface — has no bot control at all**, and no documented rationale |

### §3 Analytics ingestion & consent (AN) — root cause R1

| ID | Verdict | Evidence |
|---|---|---|
| AN-01..AN-08 | **fail** (×8) | No consent module, no identity, no event SDK, no `/api/track`, no sessions/events usage, no ingest, no bot classification. Only `components/analytics/GoogleAnalytics.tsx` exists |
| AN-09 | **fail** | GA4 loads outside any consent gate (no gate exists). Mitigating: `google_analytics_id` is `""` in `niche.config.json:159`, so in practice **nothing is tracking at all** — the site is flying blind, which is the §9 story too |

### §4 Lead capture & enrichment (LD)

| ID | Verdict | Evidence |
|---|---|---|
| LD-01 | **pass** | Shared `submitLead`; consent fields required by type; unconfigured fallback present (`LeadForm.tsx:91-94` "Form not connected...") |
| LD-02 | **partial** | Per-field validation with specific messages: yes. Validation-failure telemetry: none (R1) |
| LD-03 | **fail** | No honeypot on LeadForm (newsletter form has one — the inconsistency proves it's an omission, not a decision) |
| LD-04 | **pass** | Required consent checkbox; interpolated disclosure (`LeadForm.tsx:52`); consent fields submitted |
| LD-05 | **n/a** | Conditional on §3 running; becomes a MUST the moment R1 is fixed (no `visitor_id` anywhere in `src/` today) |
| LD-06 | **fail** *(program-wide: not yet built)* | `LeadForm.tsx:105` submits `practice_name: ""` filler — generalist's own JSONB-extras pressure |
| LD-07 | **pass** | Direct durable insert; central post-insert consumers (shared `leads_to_email_trg` notify pipeline) fail open. Note for Part 3: those consumers are deployed inside Property's app |
| LD-08 | **n/a** | Enrichment not operated for this site (SHOULD; Property-deployed, property-scoped) |
| LD-09 | **partial** | Marketing consent IS its own surface with double opt-in (stronger than a checkbox) — but no `consent_text`/`consent_at` captured anywhere (`newsletter_subscribers` schema has no consent columns), and the table is a fork (R4) |

### §5 Interactive tool platform (TL) — root cause R2

| ID | Verdict | Evidence |
|---|---|---|
| TL-01 | **fail** | No registry: gallery hand-built (`calculators/page.tsx`), sitemap hand-lists 7 slugs, nav independent |
| TL-02 | **fail** | No config-driven pipeline; every tool is a bespoke component + bespoke route |
| TL-03 | **fail** | Tax compute inline in components (e.g. `SalaryDividendCalculator.tsx` — thresholds + maths in the React file); no pure lib modules |
| TL-04 | **partial** | Fleet IS niche-appropriate (Inventory axis satisfied) but no written quality bar, no figure-to-source tracing |
| TL-05 | **fail** (SHOULD) | No embed surface |
| TL-06 | **fail** | Derivative of R1 — no event vocabulary to instrument into |
| TL-07 | **n/a** | No overlays operated (conditional SHOULD) |

### §6 Content engine (CT)

| ID | Verdict | Evidence |
|---|---|---|
| CT-01 | **partial** | Blog + fundamentals: compliant (md + frontmatter, single parsers `lib/blog.ts`/`lib/fundamentals.ts`). But guides/glossary/locations/team are four separate generated-TS data modules inside `app/` — fragmented content machinery, no single contract |
| CT-02 | **fail** | `lib/blog.ts:15,23-34` — identical silent-default code as Property (do-not-copy inherited) |
| CT-03 | **pass** | Taxonomy-derived category routes; unknown slugs `notFound()` (`blog/[category]/page.tsx:50`) |
| CT-04 | **pass** | `TableOfContents.tsx`, `ReadingProgress.tsx`, related posts via `lib/blog.ts`, read-time calc — full apparatus, zero per-article effort |
| CT-05 | **pass** | `src/lib/schema/` builder library (article, FAQ, HowTo, breadcrumb, DefinedTerm, person, WebApplication...) — broader than Property's |
| CT-06 | **pass** | `/api/og` + per-post `opengraph-image.tsx` |
| CT-07 | **partial** | Corpus is niche-led with real bylines/team pages; but no documented fact base (house-positions equivalent) found for the figures the corpus asserts |

### §7 SEO & discoverability (SEO)

| ID | Verdict | Evidence |
|---|---|---|
| SEO-01 | **partial** | Posts/categories/fundamentals/cities/glossary/guides/team all derived; **calculators hand-listed** (no registry to derive from — R2) |
| SEO-02 | **pass** | AI-crawler allow-list equivalent to Property's; hygiene note: disallows phantom `/api/health-check/submit` (route doesn't exist) |
| SEO-03 | **pass** | hreflang en-GB + x-default throughout; per-post canonical override |
| SEO-04 | **pass** | Config-driven metadata + per-item overrides |
| SEO-05 | **partial** | `/thank-you` disallowed, but **`/blog/stage/*` (internal editorial status views) is publicly crawlable and indexable** — no robots disallow, no noindex |

### §8 Engagement & conversion (EN)

| ID | Verdict | Evidence |
|---|---|---|
| EN-01 | **partial** | Engagement surfaces exist (`ExitIntentModal`, `InlinePrompt`, `StickyCard`) but each self-triggers (no central intent state) and none are tracked (R1) — can't prove they earn their interruptions |
| EN-02 | **fail** (SHOULD) | No experiment machinery |
| EN-03 | **fail** (SHOULD) | 7 PDF templates + guide downloads given away ungated; no gate/registry/fulfilment mechanism |
| EN-04 | **pass** | Unconfigured = collect-only mode (`subscribe/route.ts:51-55`); drip armed only by `CRON_SECRET` |
| EN-05 | **fail** | **Send-then-advance** (`newsletter-drip/route.ts:43-54`): no atomic claim before the provider call, no send log — a crash between send and advance, or two concurrent cron runs, double-emails |
| EN-06 | **partial** | RFC 8058 one-click + token unsubscribe + Svix bounce/complaint handling: yes. **Zero UTM tagging** (no `utm_` anywhere in `src/`) so nurture visits don't attribute; hardcoded from-name/email defaults in `lib/resend.ts` |

### §9 Observability & admin (OB)

| ID | Verdict | Evidence |
|---|---|---|
| OB-01, OB-02 | **n/a** | No console exists (vacuous pass per the standard's conditionality) |
| OB-03..OB-06 | **fail** (×4, SHOULD) | No funnel, journeys, friction/error, or vitals visibility of any kind. Combined with the empty GA id (AN-09): **the operator currently has zero behavioural signal from this site** |

### §10 Engineering & design discipline (ED)

| ID | Verdict | Evidence |
|---|---|---|
| ED-01 | **fail** | Zero test files; inline calculator maths (R2 makes it untestable as structured); CI doesn't even build this site (PF-04) |
| ED-02 | **fail** | Calculator fleet, nav, sitemap statics all hand-maintained in parallel (R2) |
| ED-03 | **pass** | Newsletter degrades to collect-only without Resend; LeadForm degrades helpfully without Supabase; GA inert without id |
| ED-04 | **partial** | Good headers on newsletter/token modules; but the surprising states (no honeypot on LeadForm, GA ungated, empty GA id) carry no written rationale |
| ED-05 | **pass** | Canonical token set defined in `globals.css` (27 canonical-token references), mapped to off-white/ink/orange |
| ED-06 | **partial** | No naming/component conventions doc in `generalist/web` (design tokens documented only at repo level) |
| ED-07 | **partial** | Geist via package fonts (`layout.tsx:2-3`, no layout-shift swaps); detailed a11y/CWV read deferred to Part 4; vitals clause n/a until R1 |

---

## Part 3 — Capability gaps → shared-mechanism extensions

Rule (standard §0): gaps the shared mechanism can't express are resolved by EXTENDING the shared mechanism (workspace package / shared schema) and composing per-site — never a generalist-local fork. Every gap below names the shared mechanism, the root cause it resolves, its dependencies, and blast radius. Planning only; Property stays read-only (its code is *source material* to lift into `packages/web-shared`, not edited in place).

### 3.0 Immediate fixes — live issues, not uplift (do not wait for mechanism work)

| # | Issue | Fix | Why now |
|---|---|---|---|
| I-1 | `google_analytics_id: ""` (`generalist/niche.config.json:159`) — zero behavioural signal of any kind today | Operator decision: set the GA4 id now as a stopgap, or accept blindness until GAP-1 lands. Config-only change either way | Every week unmeasured is unrecoverable data |
| I-2 | EN-05 double-email risk: send-then-advance in `api/cron/newsletter-drip/route.ts:43-54` | Minimal patch: advance the step (claim) BEFORE the Resend call and roll back on failure — Property's claim protocol in miniature, ~10 lines. Full fix arrives with GAP-5 | Live subscribers; cron overlap or a mid-loop crash double-sends marketing email |
| I-3 | `/blog/stage/*` editorial views publicly indexable (no disallow, no noindex) | Add robots disallow + `robots: {index:false}` metadata on the stage routes | Internal editorial state is leaking into the index now |
| I-4 | Hygiene (zero risk): phantom `/api/health-check/submit` robots entry; `agencyfounderfinance.co.uk` values in `.env.local.example` | Delete / correct | Two-minute fixes; both mislead the next engineer |

### 3.1 Gap clusters, dependency-ordered

#### GAP-1 — First-party analytics stack into `web-shared`  *(resolves R1 — sequence FIRST)*
- **Shared mechanism:** lift Property's `lib/analytics/{consent,ids,types,track}.ts`, `lib/analytics/server/bots.ts`, the `/api/track` handler (as an exported factory the site's route file wraps), and the provider components (`ConsentProvider`, `AnalyticsProvider`, `ConsentedScripts`, `WebVitals`) into `packages/web-shared`, parameterised by site key + storage-key prefix (Property hardcodes `ptp_vid`/`ptp_sid`/`ptp_consent` — must become per-site config).
- **Storage-key continuity rule:** a site's prefix is FROZEN at adoption time. Property adopts with `prefix: "ptp"`, so its visitors' existing consent state and visitor ids carry over untouched (no migration event); sites without pre-existing keys start fresh. The values at stake if a prefix ever changed: a stored consent `denied` (compliance — must never be orphaned), the visitor id (analytics continuity), the session id (30-min expiry, nothing to carry). The SDK therefore ships an optional `legacyPrefix` performing one-time read-old-write-new for consent + visitor id only, making any future rename safe by construction. Embed iframes are per-origin and unaffected.
- **Already shared:** the Supabase side needs nothing — `web_sessions`/`web_events`/RPC are site-keyed by design.
- **Resolves:** AN-01..09, LD-02 (telemetry half), activates LD-05, EN-01 (tracking half), TL-06 (once GAP-2 lands), feeds OB-03..06, ED-07 vitals clause. ~16 verdicts.
- **Depends on:** nothing. **Blast radius:** low (additive package code; no schema change).
- **Generalist composition afterwards:** mount providers in layout, add the track route wrapper, wire `form_*` events into LeadForm, honeypot (LD-03) and `visitor_id` stitching land in the same touch.

#### GAP-2 — Tool platform into `web-shared`  *(resolves R2)*
- **Shared mechanism:** lift the `GenericTool`/`CalcField`/`CalcResult` types, the shared `<Calculator>` renderer, `Field`, format utils, the registry contract (`allTools()`), and the embed kit (`EmbedAutoResize`, `EmbedSnippet`, chrome-free page pattern + CSP exception recipe) into `web-shared`.
- **Resolves:** TL-01/02/03/05/06, ED-02 (calculator fleet), SEO-01 (sitemap derives from registry).
- **Depends on:** GAP-1 only for TL-06 instrumentation (the renderer emits `calc_*` events through the shared SDK); structural work can run in parallel.
- **Blast radius:** low (package code). The per-site work is the larger half: generalist re-expresses its 7 calculators as configs, extracting inline maths into pure compute libs (TL-03) — which is also what makes ED-01 tests possible. Routed one-by-one, old pages retired as each config ships. Delete the 2 off-niche dead components (Part 1.3); generalise + route MTD/Incorporation (Part 1.2).

#### GAP-3 — Operator console into `web-shared`  *(resolves R1's §9 face)*
- **Shared mechanism:** lift `adminData.ts` (typed queries over the site-keyed `vw_*` views) and the dashboard panel components, parameterised by site key. Design the OB-01 auth fix ONCE here (cookie/header gate, not `?k=`) so no site inherits the URL-key anti-pattern — this is where Property's non-compliance gets corrected in shared code rather than patched in place.
- **Resolves:** OB-01..06 for every site that mounts it.
- **Depends on:** GAP-1 (data before dashboards). **Blast radius:** low-medium (read-only consumers; the auth design is the only sensitive piece).

#### GAP-4 — JSONB `extras` on `leads`  *(LD-06; program-wide "not yet built")*  `[HIGH BLAST RADIUS]`
- **Shared mechanism:** one nullable `extras JSONB` column migration on the shared `leads` table + `extras?: Record<string, unknown>` on `LeadSubmission` in `web-shared`.
- **Resolves:** LD-06 everywhere; retires `practice_name` filler on both audited sites.
- **Own branch; backward-compatible (nullable, no defaults, no backfill); tested in isolation** (all six sites' submit paths type-check + a test lead per site) **before any site composes against it.** Touches the one table all six sites converge on — the highest-consequence change in this plan.

#### GAP-5 — Subscriber/nurture engine convergence  *(resolves R4)*  `[HIGH BLAST RADIUS]`
- **Shared mechanism:** ONE engine in `web-shared` + the shared site-keyed `subscribers`/`nurture_state`/`nurture_sends` tables, composed per-site with each site's own sequence content. Built as the best of both parents:
  - **From Property:** claim-before-send atomic idempotency + send log (EN-05), UTM-tagged CTAs (EN-06), per-step delay scheduling, subscriber status exclusion.
  - **From generalist (fold-up):** double opt-in with stateless HMAC tokens, Svix-signature webhook verification (better than Property's plain-secret check — adopt as the shared standard for Resend webhooks), collect-only dormancy mode, RFC 8058 headers (both have these).
  - **Fix in the merge:** consent text/timestamp captured on the subscriber row (LD-09), site key on every row (PF-07), config-driven from-identity with NO hardcoded fallbacks (EN-06 anti-pattern).
- **Resolves:** PF-07 (newsletter half), LD-09, EN-05, EN-06, SEC-05 (uplifts Property too).
- **Own branch; data migration for generalist's existing `newsletter_subscribers` rows designed and rehearsed separately; old table kept read-only until verified.** **Depends on:** nothing technically, but sequence after GAP-1 so engine events are instrumented from day one.

#### GAP-6 — Where the central lead pipeline lives  *(LD-07 architecture note → decision)*  `[HIGH BLAST RADIUS — decision first]`
- **Today:** the shared `leads` triggers post to routes deployed inside Property's app (`/api/leads/{notify,sync,enrich}`), which therefore process other sites' leads. It works, but one site's deployment is load-bearing infrastructure for all six, invisibly.
- **Options to decide (not build yet):** (a) document Property as the designated central host (cheapest, status quo made explicit); (b) move the webhook consumers to a neutral deployment (admin/agency app or Supabase Edge Functions). Either way the route code itself belongs in `web-shared` as handler factories.
- **Resolves:** the LD-07 note; unblocks per-site enrichment policy (LD-08).

#### GAP-7 — Lineage-wide defect fixes (R3) — **all six sites carry this code; fix once in shared, never per-site**

| Defect | Lineage | Shared fix |
|---|---|---|
| PF-02 blind `as NicheConfig` cast | Same loader copy-pasted in every site | `validateNicheConfig()` in `web-shared`; every `niche-loader.ts` becomes a 3-line wrapper that fails the build naming the missing field |
| SEC-02 `unsafe-inline`/`unsafe-eval` CSP | Same header block in every `next.config.ts` | `buildSecurityHeaders(opts)` in `web-shared`; the nonce/hash work is done once and every site inherits it (and future CSP fixes land everywhere) |
| CT-02 silent frontmatter defaults | Same `blog.ts` parse code in every site | Shared frontmatter validator in `web-shared` (required-field manifest per site), consumed by each site's parser; throws naming file + field |
| ED-01 zero tests / PF-04 CI hole | No site has tests; CI omits generalist | One shared test setup (runner config + helpers) in the workspace; per-site suites over the pure compute libs GAP-2 creates; CI matrix extended to all sites + a web-shared-change job that builds every consumer (PF-04) |

These four are **audit-multipliers**: fixed shared-side, the Dentists/Medical/Solicitors audits inherit the fix instead of rediscovering the finding.

#### GAP-8 — Reverse fold-ups: where generalist beats the benchmark, promote it

**Execution rule (no double-touch):** GAP-8 is an inventory of direction-of-travel, NOT an execution phase. Rows touching subscriber/webhook code (Svix verification, opt-in tokens, dormancy) execute ONLY inside GAP-5 in Phase C — no shared subscriber or webhook code is written before then, and Property's plain-secret webhook check is not retrofitted earlier. Only the subscriber-untouched rows (schema library, RSS, `llms-full.txt`, reader apparatus) ride Phase A/B.

| Generalist asset | Action | Beneficiaries |
|---|---|---|
| Schema builder library (`src/lib/schema/` — DefinedTerm, person, WebApplication, course, dataset... broader than Property's `schema.ts`) | Merge UP into `web-shared` as THE schema module; Property's builders reconciled into it | All sites (CT-05) |
| Svix webhook verification (`api/resend/webhook`) | Becomes the shared Resend-webhook utility inside GAP-5 | All sites + uplifts Property's SEC-05 |
| Double opt-in token machinery (`lib/newsletter/tokens.ts`) | Into GAP-5's engine | All sites |
| Collect-only dormancy mode | Into GAP-5 (complements Property's CRON_SECRET gate) | All sites (EN-04) |
| RSS `feed.xml` + `llms-full.txt` route factories | Lift into `web-shared` as config-driven route factories | All sites gain two GEO surfaces (SEO-02 adjacent) |
| Reader apparatus (TOC/progress/related) | Both sites carry parallel copies — consolidate ONE implementation into `web-shared` during GAP-7's CT work | All sites (CT-04), ends the divergence |

### 3.2 Dependency order (execution sequence, per phase-branch-test-green discipline)

```
Phase 0  I-1..I-4 immediate fixes                          (live issues; no dependencies)
Phase A  GAP-7 shared hardening + GAP-1 analytics SDK      (parallel; both unblock everything)
Phase B  GAP-2 tool platform  ·  GAP-3 console (after GAP-1 data accrues)
Phase C  high-blast-radius shared-schema work, one branch each, sequential:
         GAP-4 extras → GAP-5 nurture convergence → GAP-6 (decision, then move if chosen)
Fold-ups (GAP-8) ride inside their host cluster: schema/RSS/llms with GAP-7-CT era,
         Svix/opt-in/dormancy inside GAP-5.
```

Per-site composition for generalist (mounting providers, re-expressing calculators, wiring honeypot/stitching, populating its quality-bar doc for TL-04/CT-07) hangs off each cluster and is enumerated at execution time, not here.

---

## Part 4 — Design-discipline read

Axis rule applied throughout: identity is generalist's own (off-white `#fafaf7` + ink + orange `#f97316`, Geist Sans/Mono — locked design system) and is NOT evaluated. No comparison to Property's visual language appears below. This part reads only the three disciplines: consistency, accessibility, performance.

### 4.1 Consistency

- **Token discipline: strong.** Canonical token set defined and used (27 canonical-token references in `globals.css`; ED-05 pass). Hardcoded hex literals in components are nearly absent — 4 occurrences across 3 files (`AuthorByline.tsx` ×2, `SiteFooter.tsx`, `SiteHeader.tsx`) — minor leakage to fold into tokens at next touch, not a finding of substance.
- **Typography: consistent.** Geist Sans/Mono loaded once via package fonts in `layout.tsx:2-3` and applied as CSS variables; no per-page font imports found.
- **Gap (ED-06 partial, from Part 2):** no written component/naming conventions doc in `generalist/web`; the consistency that exists is habit, not contract. Cheap fix at execution: a one-page conventions doc, written when GAP-2 re-expresses the calculators (the moment consistency matters most).
- **Structural consistency note:** the 11 calculator components are visually consistent with each other (shared field/result idioms) — which will make the GAP-2 config re-expression mostly mechanical.

### 4.2 Accessibility

- **Form labelling: present and broad.** 75 `htmlFor`/`aria-*`/`role=` usages across 20 component files, including every calculator and `LeadForm.tsx` (14 usages). Per-field, recoverable error messages (LD-02 pass) double as an a11y strength.
- **Focus visibility: present.** 39 focus-style declarations (`focus-visible`/`focus:ring`/`focus:outline`) across 15 files, including the shared `layout-utils.ts` (5) — focus discipline is systematic, not incidental.
- **Unverified in this read (cheap to check at execution, listed so they aren't assumed):** heading-hierarchy correctness on long content pages, skip-to-content link, touch-target sizing on mobile nav, colour-contrast ratios of the orange-on-off-white pairing at small text sizes. **Recommended ED-07 verification step:** one axe-core/Lighthouse-a11y pass over four page types (home, post, calculator, newsletter) when Phase A lands, with findings triaged as bugs.

### 4.3 Performance / Core Web Vitals

- **Image discipline: clean.** Zero raw `<img>` tags in `src/` — everything content-visual goes through the framework pipeline (ED-07 image clause: pass).
- **Font loading: clean.** Package-font self-hosting with CSS variables; no layout-shifting swaps.
- **Static-first architecture:** content pages are build-rendered from local data (366 posts via fs at build; the 6,788-line locations dataset is server-side data, not shipped client-side) — structurally favourable for LCP.
- **The real finding (ties to R1):** there is **no field measurement of any of this** — no web-vitals capture, no Speed Insights package, GA inert. The site is *probably* fast and *provably* nothing. ED-07's vitals clause activates with GAP-1; until then, **recommended baseline:** a one-off Lighthouse run on the four page types, recorded in this doc's follow-up, so Phase A has a before/after.

### 4.4 Verdict

Design discipline is the healthiest axis of the audit: identity is locked and respected, tokens are contractual, labelling and focus work are systematic, and image/font hygiene is clean. The two actions are a conventions doc (ED-06) and measurement (ED-07 via GAP-1) — both already routed in Part 3. Nothing in this read requires touching generalist's visual identity.

---

## Audit close-out

**Verdict roll-up:** 18 pass · 16 partial · 32 fail · 5 n/a across 71 capabilities; 4 root causes (R1 analytics absence, R2 no registry architecture, R3 inherited lineage defects, R4 newsletter fork); 4 immediate fixes (I-1..I-4); 8 gap clusters sequenced Phase 0→A→B→C with 3 high-blast-radius shared-schema items isolated to their own branches.

**The one-line story:** generalist is a content-rich, well-crafted site flying completely blind, with hand-built machinery where the fleet patterns should be — and a handful of genuine strengths the rest of the network should inherit.

*Audit complete 2026-06-10 against PROPERTY-CAPABILITY-STANDARD v1-FINAL. Execution sequencing lives in Part 3.2; per-site composition tasks enumerate at execution time.*
