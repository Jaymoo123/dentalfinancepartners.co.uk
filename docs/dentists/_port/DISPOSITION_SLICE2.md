# DENTISTS PORT BLUEPRINT — SLICE 2: ARTICLE TEMPLATES, HUBS, GUIDES, RESOURCES, CALCULATORS

Companion to SLICE1 (chrome/tokens/blog) and SLICE3 (marketing/one-offs).
Standing conversions from SLICE1 §0 apply to every row and are not repeated.
Surveyed 2026-09-11, every file opened.

**Scope note against the brief:** the brief allocated `/services` to Slice 3 and did not mention
`/services/[slug]` at all. `/services/[slug]` is a TEMPLATE rendering 5 pages, so it is
dispositioned here; the `/services` INDEX stays in Slice 3 with the other marketing surfaces.

---

## A. THE TEMPLATE MAP (what actually renders what)

| Template | Pages | Lines | Params source | Phase |
|---|---|---|---|---|
| `app/blog/[category]/[slug]/page.tsx` → `BlogPostRenderer` | 223 | 77 / 369 | `content/blog/*.md` | 2 (SLICE1 §F) |
| `app/blog/[category]/page.tsx` | 7 | 181 | 12 categories minus 5 static hubs | 2 (SLICE1 §F.4) |
| `app/calculators/[slug]/page.tsx` | 13 | 172 | `lib/tools/registry.ts` `kind === "generic"` | 4 |
| `app/embed/[slug]/page.tsx` | 13 | 41 | same registry, same filter | 4 |
| `app/dental-guides/[slug]/page.tsx` | 6 | 187 | `content/dental-guides/*.md` | 3a |
| `app/resources/[topic]/page.tsx` | 6 | 166 | `lib/resources/registry.ts` enabled guides ∩ files on disk | 3a |
| `app/services/[slug]/page.tsx` | 5 | 254 (+507 data) | `app/services/[slug]/data.ts` `SERVICE_SLUGS` | 3a |
| `app/locations/[slug]/page.tsx` | 2 | 214 | `niche.config.json locations[]` | 5 (SLICE3) |
| `app/admin/analytics/visitor/[visitorId]/page.tsx` | dynamic | — | none (runtime) | LEAVE |

**262 of 309 routes come from these templates.** The brief said 5 templates and ~250 pages; the
count is 7 and 262 because `/services/[slug]` (5) and `/blog/[category]` (7) were missing.

**The smallest edit point rule applies hard here.** Porting `/dental-guides/[slug]` is one file
and six pages. Porting `/calculators/[slug]` is one file and thirteen. Nobody touches 262 files.

---

## B. `app/dental-guides/[slug]/page.tsx` (187 lines) — 6 pillar guides

Renders in order: JSON-LD (Article + BreadcrumbList) → navy hero (gold eyebrow, `font-serif` h1,
standfirst, meta row) → `<article className="prose-dental mx-auto max-w-3xl">` body →
FAQ `<dl>` of gold `border-l-4` cards → related-guides grid → navy closing band with `LeadForm`.

| Disposition | **PORT** | Phase 3a |
|---|---|---|

| # | Change | Reason |
|---|---|---|
| 1 | **`prose-dental` is undefined.** `grep -rn "prose-dental" src` returns exactly one hit: the class attribute itself at `:97`. It is defined in no stylesheet. | **LIVE DEFECT.** Tailwind preflight strips list markers and heading sizes, so all 6 guide bodies render as undifferentiated paragraphs with no visual hierarchy. Fix by using the same `.article-body.prose-blog` stylesheet the blog uses. This is the single highest-value fix in the slice. |
| 2 | Navy hero → the standard navy motif hero with the `DentistsBackdrop` | consistency with the ported chrome |
| 3 | `font-serif` h1, h2, dt (5 instances in this file) | Cormorant retires; T26 mapping covers the interim |
| 4 | FAQ `<dl>` → kit `FaqSection`, subject to the escaping check (SLICE1 §D) | guide FAQ answers are plain strings here, so the kit is safe for THIS file — verify, do not assume |
| 5 | **"We will be in touch within 24 hours." (`:177`)** | banned turnaround promise, on 6 pages. Rewrite. |
| 6 | Closing band → kit `LeadCTAPanel`, `id` + `scroll-mt-24` + `aria-labelledby` | no anchor today |
| 7 | Related-guides grid → kit `RelatedArticles` | — |
| 8 | Body has no TOC and no reading progress | guides are the longest pages on the site. Net-new: adopt the blog sidebar anatomy. |

`app/dental-guides/page.tsx` (109 lines): navy hero + 2-col card grid + `CollectionPage` and
`BreadcrumbList` JSON-LD (already correct). **PORT**, phase 3b. Add a closing panel; it has no
capture surface. `text-[var(--gold-strong)]` eyebrows and card headings are 3.76:1 on white.

---

## C. `app/resources/[topic]/page.tsx` (166 lines) — 6 topic guides

Renders: header block (gold eyebrow, h1, summary, version note) → optional XLSX download button
→ contents `<ol>` box → `<div className="prose prose-slate ...">` body → optional "Download the
working model" box → closing gold-edged panel with `LeadForm redirectOnSuccess={false}`.

| Disposition | **PORT** | Phase 3a |
|---|---|---|

| # | Change | Reason |
|---|---|---|
| 1 | **`prose prose-slate prose-headings:* prose-a:* prose-strong:*` at `:117` are NO-OPS.** `@tailwindcss/typography` is not a dependency of `Dentists/web` and is not installed anywhere in the monorepo (`ls node_modules/@tailwindcss` = node, oxide, oxide-win32-x64-msvc, postcss). | **LIVE DEFECT, same shape as §B.1.** All 6 resource guide bodies render unstyled. Fix by reusing `.article-body.prose-blog`; do NOT add the typography plugin (new dependency for something the site already has a stylesheet for). |
| 2 | No `Breadcrumb` component and no BreadcrumbList JSON-LD | add both |
| 3 | Inline `style={{ color: "var(--gold)" }}` at `:58` | hardcoded style attribute, bypasses the token layer entirely; gold on white = 2.78:1 |
| 4 | Download buttons are hand-rolled `rounded-full bg-[var(--navy)]` (`:81`, `:131`) | use `btnPrimary` / the ported button constants |
| 5 | Closing panel uses `rounded-2xl border-l-4 ... scroll-mt-24` but **no `id`** (`:144-146`) | the scroll offset has nothing to scroll to |
| 6 | Gate/download mechanics (`isXlsxEnabled`, `resourceForTopic`) | **KEEP THE LOGIC EXACTLY.** Capture-surface behaviour; restyle only. |

**There is no `/resources` index route.** `ls src/app/resources` = `[topic]` only. The 6 topic
pages are reachable from 3 literal links in `content/` (`/resources/associate` x2,
`/resources/principal` x1) and from the in-article gate. Four of the six have no inbound link at
all. Not a design defect, but it is the largest orphan cluster on the site: see SLICE3 §D.

---

## D. `app/services/[slug]/page.tsx` (254 lines) + `data.ts` (507 lines) — 5 pages

Slugs, verified in `data.ts`: `dental-accountants` (:40), `practice-accounting` (:139),
`associate-tax` (:225), `practice-valuation` (:316), `locum-dentist-tax` (:415). Each targets a
named GSC query cluster (comment at `data.ts:2-4`).

| Disposition | **PORT** | Phase 3a |
|---|---|---|

| # | Change | Reason |
|---|---|---|
| 1 | **"We will be in touch within 24 hours." (`:244`)** | banned turnaround promise, 5 pages |
| 2 | Content and URLs unchanged; sections re-set on the standard anatomy (motif hero, `TopicSection`, `ComparisonTable`, `FaqSection`, `LeadCTAPanel`) | — |
| 3 | `associate-tax` and `practice-accounting` collide by slug with two blog category hubs (`/blog/associate-tax`, `/blog/practice-accounting`) | Different routes, so not a 404, but it is a cannibalisation question, not a design one. **Flag to the owner, do not resolve in the port.** |
| 4 | `data.ts` is the single source; never edit the 5 pages individually | — |

---

## E. CALCULATORS — 13 tools, one template

Registry: `src/lib/tools/registry.ts` (40 lines), 13 configs in `src/lib/tools/configs/`:
uda-value, associate-take-home, practice-valuation, practice-purchase, practice-sale-cgt,
locum-structure, principal-extraction, sdr-scotland, superannuation-contributions,
equipment-capital-allowance, practice-owner-income-benchmark, dental-tax-deductions,
nhs-pension-aa-taper. `allTools` is derived, nothing is hand-listed. **Brief's 13 confirmed.**

### E.1 `app/calculators/[slug]/page.tsx` (172 lines) — 13 pages

Renders: JSON-LD (WebApplication + optional FAQPage) → navy hero (Breadcrumb light, gold eyebrow
"Free calculator · UK 2026/27 rates", `font-serif` h1, intro) → white section with
`CalculatorClient variant="page"` + `CalculatorPageResources` → optional explainer card →
optional FAQ `<dl>` → navy closing band with a single link to `/free-practice-health-check`.

| Disposition | **PORT** | Phase 4 |
|---|---|---|

| # | Change | Reason |
|---|---|---|
| 1 | **Closing CTA button is `bg-[var(--gold)] ... text-white` (`:160`): WHITE ON GOLD = 2.78:1.** | **LIVE WCAG FAILURE on all 13 calculator pages.** It also hand-rolls the button instead of using `btnPrimary`, which is why it diverged: `btnPrimary` correctly uses a navy label (6.19:1). Fix = use `btnPrimary`. |
| 2 | Closing band's only ask is a LINK to another page | Property closes with a form. Net-new `LeadCTAPanel` with `LeadForm redirectOnSuccess={false}`. **Capture-surface change → owner gate.** |
| 3 | No result gate | Property runs `ResultGate` on calculator results (`Property/web/src/components/calculators/ResultGate.tsx`, 103 lines). Dentists has `components/tools/premium/ResultGateModal.tsx` (150) but it serves the PREMIUM blog islands, not the public calculators. Adopting a gate here is a **capture-surface scope decision → OWNER GATE**, and if taken it must land on BOTH the page and any tab strip in the same commit (playbook T7). |
| 4 | 4 `font-serif` headings; 3 gold `border-l-4` card idioms; `rounded-2xl` | standard conversions |
| 5 | FAQ `<dl>` → kit `FaqSection` after the escaping check; `tool.faqs` already feeds `buildFaqPage` at `:63` | **make the single-array binding structural** (playbook T17): one array, passed to both the render and the schema. It already is; add the acceptance test so it stays. |
| 6 | "UK 2026/27 rates" eyebrow | every rate in the 13 configs must be re-verified against `docs/dentists/house_positions.md` in this phase. Not design work; budget for it. |
| 7 | `data-cta="calculator-page-cta"` (`:161`) carries no `data-cta-placement` and no `data-cta-variant` | every other CTA on the site carries both. Add them, keep the id. |

### E.2 `app/calculators/page.tsx` (101 lines) — the gallery

Navy hero + a card grid derived from `allTools()`.
| Disposition | **PORT** | Phase 4 |
- Grid → kit card recipe; `font-serif` h1 retires.
- No capture surface and no closing panel: add one.
- Net-new: a `CalculatorTabs` crawl-path block is what Property uses on the HOMEPAGE, not here.
  The kit ships `design/guards/calculator-tabs-crawl-path.ts` to prove the tabs still emit real
  `<a href>`s. If tabs land on the homepage (SLICE3 §B), that guard is an acceptance test.

### E.3 `app/embed/[slug]/page.tsx` (41 lines) + `app/embed/page.tsx` (70 lines)

13 widget routes, `robots: { index: false }`, plus a noindex gallery of embed snippets.
| Disposition | **PORT (bypass only)** | Phase 4 |
The only change is the one SLICE1 §A.3 already delivers: the kit `PageShell` bypasses chrome on
`/embed/`, so partner iframes stop receiving the Dentists header, footer and sister-site block.
`app/embed/page.tsx` keeps full chrome by design (trailing-slash rule in the kit shell). Its raw
`text-slate-900` classes are already ramp-free and need no swap.

### E.4 Duplicate component, pick one

`src/components/calculators/CalcResultCta.tsx` (28 lines) and
`src/components/tools/CalcResultCta.tsx` (27 lines) both exist.
| Disposition | **RETIRE one** | Phase 4 |
Establish which is imported before deleting either. A near-identical pair is how a T7-shaped
"fixed on one surface, still broken on the other" defect gets created.

---

## F. HUBS AND INDEXES IN THIS SLICE — SUMMARY TABLE

| File | Renders today | Property reference | Disposition | Phase | Risk |
|---|---|---|---|---|---|
| `app/dental-guides/page.tsx` (109) | navy hero + 2-col guide cards + CollectionPage/Breadcrumb JSON-LD | no shared guide template exists on Property; its pillar guides are 10 standalone `page.tsx` files (`landlord-tax`, `section-24`, `incorporation`, …). Use `Property/web/src/app/resources/[topic]/page.tsx` (113) for hub anatomy instead | PORT | 3b | Property has no direct analogue; do not invent one |
| `app/dental-guides/[slug]/page.tsx` (187) | see §B | as above | PORT | 3a | `prose-dental` defect |
| `app/resources/[topic]/page.tsx` (166) | see §C | `Property/web/src/app/resources/[topic]/page.tsx` (113) | PORT | 3a | `prose` no-op defect; gate logic must not change |
| `app/services/[slug]/page.tsx` (254) | see §D | Property has NO `[slug]` service template; its 4 service pages are standalone files (`property-accountant` 754, `landlord-accountant` 755, `non-resident-landlord` 846, `property-tax-advice` 761). Take anatomy from any one of them | PORT | 3a | turnaround promise x5 |
| `app/calculators/page.tsx` (101) | see §E.2 | `Property/web/src/app/calculators/page.tsx` (208) | PORT | 4 | — |
| `app/calculators/[slug]/page.tsx` (172) | see §E.1 | `Property/web/src/app/calculators/[slug]/page.tsx` (216) | PORT | 4 | white-on-gold failure x13; gate = owner decision |
| `app/embed/page.tsx` (70) | noindex snippet gallery | `Property/web/src/app/embed/[slug]/page.tsx` (48) | LEAVE (chrome only) | 4 | — |
| `app/embed/[slug]/page.tsx` (41) | 13 noindex widgets | same | PORT (bypass) | 4 | live chrome-in-iframe defect |

---

## G. CONTENT-RULE BREACHES FOUND IN THIS SLICE (not design work, record in STATE.md)

Searched by RULE, not by symptom. The pound sign is stored as the **literal character `£`** in
these `.tsx` files, not as a unicode escape, so a literal grep is valid here — the generalist
escape trap (playbook T6) does **not** apply to Dentists' source. It has not been checked against
the location data files; SLICE3 owns that.

| Rule | Hits in this slice | Where |
|---|---|---|
| No turnaround promises | 3 template instances = **11 rendered pages** | `dental-guides/[slug]:177` (6 pages), `services/[slug]:244` (5 pages) |
| No pricing for our services | 0 rendered in this slice | the `£29/mo` copy lives in the `packages` CTA variant, which is NOT the live variant (`niche.config.json cta.variant = "leadgen"`). Latent, not live. |
| Every figure re-derivable from house positions | **UNVERIFIED** | 13 calculator configs + 6 guides + 6 resource guides + 5 service pages. This is a real workload, not a formality. |
| No em-dashes | 161 in `src/`, 6 `content/` files | counted as raw source greps; the rendered-body metric and the frontmatter metric are different numbers and must be stated separately (field notes §5) |

---

## H. SLICE 2 OWNER GATES

6. **Result gate on the 13 public calculators.** New capture surface. Recommend yes, matching
   Property and generalist, with the index standfirst softened so nobody is misled.
7. **Closing form on calculator pages** (replacing the link-out to the health check). New capture
   surface.
8. **`/services/[slug]` vs `/blog/[category]` slug collision** on `associate-tax` and
   `practice-accounting`. Cannibalisation question, surfaced by the port, resolved outside it.
