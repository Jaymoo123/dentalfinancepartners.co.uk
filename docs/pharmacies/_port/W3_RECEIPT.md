# W3 receipt — templates and hubs (phase 3), pharmacies design port

Date 2026-10-07. Builder W3. Brief: `docs/pharmacies/_port/PHASE2-6_PACKAGES.md` §W3 (lines 247-305) plus the locked block, A0/A2, the off-limits block, the shared acceptance tests, §C and §F.

No subagents launched. No git write command run. No `next build`, no `next dev`, no server started. No file outside the OWNS list touched.

---

## 1. Files edited (all inside OWNS)

| file | before | after | what changed |
|---|---|---|---|
| `pharmacies/web/src/app/services/page.tsx` | 61 | 145 | brand hero + kit `Breadcrumb` + `PharmaciesBackdrop`; card grid -> kit `CoverageCards` with `href`; hand-rolled CTA band -> kit `LeadCTAPanel`; 3 hex cleared |
| `pharmacies/web/src/app/services/[slug]/page.tsx` | 124 | 279 | kit `Breadcrumb` (replaces the "All services" back link, page-level `buildBreadcrumbJsonLd` removed), `Eyebrow`, backdrop, `StatsCounter`, `ScrollGlowGroup` x2, kit `FaqSection html alwaysRenderAnswers` (replaces the `<details>`), `LeadCTAPanel`; 8 hex cleared |
| `pharmacies/web/src/app/for/page.tsx` | 25 | 105 | brand hero + kit `Breadcrumb` + backdrop; `ScrollGlowGroup` on the card grid; **new** `LeadCTAPanel` (this hub had no form); 2 hex cleared |
| `pharmacies/web/src/app/for/[slug]/page.tsx` | 137 | 184 | twin of the services detail template, same six adoptions; `hub.noLeadForm` branch preserved; 8 hex cleared |
| `pharmacies/web/src/components/ui/Breadcrumb.tsx` | 59 | 45 | RETIRED to a delegation shim over the kit `Breadcrumb`; 1 hex cleared |

**Not edited, deliberately:** `src/data/pharmacies-services.ts`, `src/data/pharmacies-hubs.ts` (exported shape FROZEN, zero hex, zero `neutral-*`, no prose change needed) and `src/config/service-tiers.ts` (zero hex, kit `ServiceTiers` already mounted and left as is, `featuredBadge="Most popular"` unchanged per T13 and the owner item).

---

## 2. Acceptance tests run

```
$ cd pharmacies/web && npx tsc --noEmit
(no output)
```

**`tsc` is CLEAN — zero errors.** The brief's baseline (§E.1 #11, V1 row V1) says ONE error at `src/app/research/pharmacy-openings-closures-index/page.tsx:69`, owned by W6. It is not present on the tree as of this run, so either W6 closed it concurrently or the premise moved. **Flagged, not fixed** (that file is W6's).

```
$ cd pharmacies/web && npx vitest run
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Duration  7.43s
```
Baseline in the brief was "5 test files"; the tree has 6 (P1-F added `src/tests/focus-ring.test.ts`). 40/40 green.

```
$ python scripts/check_dependency_closure.py
dependency closure OK across 19 sites
```

Greps over the eight OWNED paths:

| check | result |
|---|---|
| `grep -rnoE '#[0-9a-fA-F]{3,8}'` | **0** (was 22) |
| `grep -rc '#0f3a4a\|#1a5c6e\|#071f28' src/app/services src/app/for` | **0** |
| `grep -rno 'neutral-[0-9]\{2,3\}'` | 0 (P1-D held, nothing re-swept) |
| `grep -rn 'section-label'` | 0 |
| `grep -rn '<main\|<header\|<footer'` | 0 |
| `grep -rn 'outline-none'` | 0 |
| `grep -rn 'data-cta'` | 0 attributes (3 hits, all inside the prose comment explaining why none was added) |
| `grep -rn $'—\|–'` | 0 em/en dashes |
| `grep -rnoE 'focus-visible:outline-\[[^]]*\]'` | 2 hits, both `focus-visible:outline-[var(--focus-ring)]` |

**Hex notation note for reviewers:** the contrast rows written at the call sites spell colours as `` `hex 0f3a4a` `` rather than `#0f3a4a`, so the wave's hex grep reads a true zero instead of counting prose. No colour literal survives in any class string (`grep -rn 'className' <owned> | grep -E '#[0-9a-fA-F]{3}'` = 0).

**Twin proof.** With comments stripped and the entity nouns normalised, `services/[slug]/page.tsx` and `for/[slug]/page.tsx` differ ONLY in: the data module and accessor, the crumb parent label, the two `hub.title` interpolations the copy already carried, the `noLeadForm` conditional and its signpost band, and `btnPrimary` (used only in that band). Structure, adoptions, props and class strings are otherwise identical line for line.

---

## 3. Adoptions, with how each was fed

| kit file | mounted on | props |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | all 4 routes (13 detail URLs + 2 hubs) | `tone="onBrand"`, `siteUrl={siteConfig.url}`; emits the only `BreadcrumbList` on the URL |
| `design/primitives/page-blocks.tsx` `Eyebrow` | both detail heroes | `onDark`, fed `service.title` / `hub.title` |
| `design/primitives/FaqSection.tsx` | both detail templates | `eyebrow=""`, `title="Common questions"`, `html`, `alwaysRenderAnswers`, `className={`bg-white ${sectionY}`}`, same array `buildFaqJsonLd` is fed |
| `design/marketing/StatsCounter.tsx` | both detail stats bands | `tone="dark"`, `columns={3}`, every stat `{target: 0, value, label}` |
| `design/marketing/ScrollGlowGroup.tsx` | both card grids on both detail templates, and `/for`'s hub grid | wrapper only, no copy or markup change |
| `design/marketing/LeadCTAPanel.tsx` | `/services`, `/services/[slug]`, `/for`, `/for/[slug]` = **4 call sites, every one `eyebrow=""` and `formTitle=""`** | existing strings byte-identical, `proofPoints={[]}`, `form={<LeadForm submitLabel="Send enquiry" />}`, `backdrop={<PharmaciesBackdrop/>}` |
| `design/marketing/CoverageCards.tsx` | `/services` hub grid | `columns={2}`, `tone="slate"`, `items` = 8 services with `href`; no `icon`, no `outcome`, no `html` (bodies are plain), `glow` declined |
| `components/ServiceTiers` | `/services` | pre-existing mount, unchanged |
| `src/components/layout/PharmaciesBackdrop.tsx` | 4 heroes + 4 panels (+ the dead signpost band) | `patternId` distinct per instance; never edited |

**Stale declines ADOPTED, as the brief required:** `CoverageItem.href` (`CoverageCards.tsx:31`) and the optional `icon` (`:23`) — both confirmed at source, the hospitality-era decline is dead on the `/services` hub. `StatItem.value` + `tone` + `columns`, `FaqSection html`/`alwaysRenderAnswers`, `Breadcrumb tone="onBrand"`, `CardStack html`, `ProcessTimeline html`, `SlimHero sectionClassName` — all verified present today, and no decline below rests on any of them.

**K3 is CLOSED.** `accordion.tsx:39` already reads `focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]`. `globals.css` binds `--kit-focus-ring`, including inside `.ground-dark`. No call-site override needed and no kit change required.

---

## 4. Declines, each written AT the call site naming the kit path

| kit file:line | where | reason (all re-measured today) |
|---|---|---|
| `design/primitives/SlimHero.tsx:53-56` (+ `:8-12`) | all 4 heroes | FIXED CHILD ORDER: `Eyebrow`, `h1`, then `children`. No slot above the `h1`, and this phase's job on these templates is to put a visible trail where the `BreadcrumbList` already is, which belongs above the heading (house order: `charities/web/src/components/hubs/HubParts.tsx:101-109`). Passing the trail through `children` prints it under the `h1`. **`sectionClassName` is NOT the reason: it ships at `:47` and does splice at `:50`. K1 is correctly closed; this is a different, testable gap.** |
| `design/primitives/page-blocks.tsx:43` `Eyebrow` | `/services`, `/for` hubs only | the only label each hub publishes is the words of its own `h1`; an Eyebrow fed that prints the heading twice, anything else is authored prose. Adopted on the two detail heroes where `service.title` / `hub.title` is a published label distinct from the h1 headline. |
| `design/primitives/page-blocks.tsx:112,120` `CardStack` | both detail card grids | `columns` is `1 \| 2`, so it cannot lay out the three-up "How we help" grid; and the body is one fixed `text-slate-700 <p>` with no hook for anchor colour or focus ring. 14 of 35 hub bodies carry real `<a>` anchors (and 0 of 56 service bodies do today, see §7): they would paint UA-default blue with no visible ring. Accessibility regression, not a restyle. `html` is NOT the reason (it ships at `:108,115`). |
| `design/marketing/CoverageCards.tsx:119-134` | both detail card grids only | same fixed body paragraph, same missing anchor hook. `href` and optional `icon` are stale halves and are not the reason. ADOPTED on the `/services` hub where the bodies are plain. |
| `design/marketing/CoverageCards.tsx:118` (`<h3>`) | `/for` hub grid | hardcoded `h3` with no heading-level prop. `/services` has an intervening `h2`; `/for` has none and its cards are `h2`s today, so adopting produces an `h1 -> h3` skip. Phase 0 tracks heading skips as defects (P0-B #9) and authoring a bridging heading is prose. |
| `design/marketing/CoverageCards.tsx:88` `glow` | `/services` hub | the glow surface hardcodes `rgba(5,150,105,0.28)` / `rgba(5,150,105,0.4)`, a green shadow that is not this brand and that no call site can repoint. |
| `design/marketing/ProcessTimeline.tsx:29` | both detail templates | neither data file publishes numbered staged steps; inventing the `n` labels authors copy. (`html` at `:33` means the escaped-markup half is stale, stated at the call site.) |
| `design/marketing/ComparisonTable.tsx:32-47` | both detail templates | forces a general-vs-specialist row shape and a "Most recommended" pill; `challenges` / `howWeHelp` are single-column `{title, body}` lists, so the "general" column would be authored. |
| `design/marketing/ProblemStatement.tsx:33-56` | not mounted | hardcodes Property's landlord copy and a CTA button with no copy props. |
| `design/marketing/WhatToExpectCard.tsx:22-27` | both detail templates | `DEFAULT_ITEMS` publish a fixed-fee line these pages do not. The only candidate list is `howWeHelp[].title`, which is three service descriptions, not expectations. Feeding it would mean authoring the sentence **"What happens after you enquire"** — named, as the locked block requires. |
| `design/marketing/DrawnTickList.tsx` | both detail templates | these templates render no list of short claims at all. Nothing to feed it. |

---

## 5. Contrast rows for every ground this package paints

| ground | where | measured |
|---|---|---|
| `bg-primary-950` (`0f3a4a`) + `PharmaciesBackdrop` | 4 heroes. **NEW GROUND for the backdrop** | bare: white 12.18. Composited with 0.10 of the motif's `45cdff` = `14495c`: white **9.78**, white/80 (trail links + chevron) **7.08**, slate-300 (`Eyebrow onDark`) **6.58**. Text floor 4.5 and graphic floor 3.0: all PASS. `.ground-dark` on the section, so the trail link and hero CTA rings paint white, not primary-950 on primary-950 (1.0). |
| `bg-slate-800` (`1e293b`) | both detail stats bands | white figure **14.63**, slate-300 label (`tone="dark"`) **9.85**. PASS. `.ground-dark` added pre-emptively; no focusable element in the band today (no `href` passed). |
| `bg-slate-900` (kit `LeadCTAPanel`) + backdrop | 4 panels | bare white 17.85, slate-200 description 13.59; composited `14293f` white 14.80, slate-300 9.97 — the row `PharmaciesBackdrop.tsx:38-42` already measured on this same ground. PASS. `.ground-dark` bound on a wrapper `div` because the section class belongs to the kit. |
| `bg-slate-50` replaces `#fafaf7` | "How we help" band on both detail templates | the ramp declares no warm off-white and `globals.css:118` already names `#f8fafc` (slate-50) as this site's `--surface`. Same role, one declared colour. Body text slate-600 on slate-50 clears 4.5. |
| `text-primary-700` authored anchors | every `dangerouslySetInnerHTML` body and FAQ answer | `177392` measures **5.37** on white and **5.16** on slate-50. Ring scoped to descendant anchors, value `var(--focus-ring)`. |

---

## 6. Link floors

Derived from source, because no build was run (every floor is a V1 row against the served HTML).

| route | floor | derivation | expected delta |
|---|---|---|---|
| `/services` | 18 | 8 `CoverageCards href` (one per slug, preserved exactly) + 3 `ServiceTiers ctaHref="/contact"` + chrome. Breadcrumb adds `href="/"`, already emitted by the kit header wordmark and footer on every page, so the UNIQUE set does not change. | 0 |
| `/services/[slug]` x8 | 10 | trail `/` + `/services` + hero `/contact` + authored anchors in bodies and FAQ answers. The back link that gave `/services` is replaced by the crumb that gives the same href, and `/` was already in chrome. | 0, no drop |
| `/for` | 15 | 5 card `href`s, untouched inside the `ScrollGlowGroup` wrapper. New `LeadCTAPanel` adds a form, not a link. | 0 |
| `/for/[slug]` x5 (16/15/13/17/13) | as listed | trail `/` + `/for` + hero `/contact` + authored anchors (14 of 35 bodies, 5 of 29 answers). | 0, no drop |

**The one place a floor could have dropped, and why it does not:** the hand-rolled `<details>` kept every FAQ answer, and its anchors, in the server HTML. `FaqSection` without `alwaysRenderAnswers` would unmount closed answers and delete those anchors from the HTML. `alwaysRenderAnswers` is on at both call sites, so Radix `forceMount` keeps all of them (`accordion.tsx:67-68`). V1 should assert this on a detail URL carrying an anchor in an answer, e.g. `/for/locum-pharmacists`.

---

## 7. K9 — the exact `lib/schema.ts` diff for the MANAGER

`lib/schema.ts` is OFF LIMITS to this package. `buildFaqJsonLd(service.faqs)` / `buildFaqJsonLd(hub.faqs)` are still fed answers containing raw HTML, so `acceptedAnswer.text` carries markup on the affected URLs.

**Scope, re-derived today. The brief's premise "the answers ARE authored HTML" is WRONG as stated, and the obvious grep is also wrong:** `grep -n 'answer:' <file> | grep '<'` counts the `faqs: Array<{ question: string; answer: string }>` interface line as markup. Counted instead with a quoted-string parser over the actual string values:

| file | answers | with markup | bodies | with markup | intros | with markup |
|---|---|---|---|---|---|---|
| `src/data/pharmacies-services.ts` | 32 | **0** | 56 | **0** | 8 | 0 |
| `src/data/pharmacies-hubs.ts` | 29 | **5** | 35 | **14** | 5 | 0 |

So **5 answer strings of 61 carry markup, all of them `<a href="...">` cross-references, and all 5 are in `pharmacies-hubs.ts` (`:149,212,287,346,358`)**. The services data file carries no anchor anywhere today.

Consequences, both stated at the call sites:
- `html` on `FaqSection` is **required on `/for/[slug]`** (those 5 answers must keep their anchors) and is a **no-op on `/services/[slug]`** today. It is passed on both because the two templates are one shape by rule and a writer adding one cross-reference to a service record must not silently ship escaped markup.
- the `linkOnLight` anchor colour + ring recipe is likewise live on `/for/[slug]` (14 bodies + 5 answers) and precautionary on `/services/[slug]`.
- the K9 strip below is therefore load-bearing for the **5 `/for` answers** and harmless everywhere else.

**The one-line diff, matching `blog/[category]/[slug]/page.tsx:96`:**

```diff
--- a/pharmacies/web/src/lib/schema.ts
+++ b/pharmacies/web/src/lib/schema.ts
@@ -67,7 +67,11 @@
 export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
   return JSON.stringify({
     "@context": "https://schema.org",
     "@type": "FAQPage",
     mainEntity: faqs.map((faq) => ({
       "@type": "Question",
       name: faq.question,
-      acceptedAnswer: { "@type": "Answer", text: faq.answer },
+      // Answers in src/data/pharmacies-services.ts and pharmacies-hubs.ts are
+      // authored HTML (5 of 61 carry <a> anchors); acceptedAnswer.text must be
+      // text. Same strip the blog post template applied inline at
+      // blog/[category]/[slug]/page.tsx:96, moved here so both detail
+      // templates and the blog share one place.
+      acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]+>/g, "") },
     })),
   });
 }
```

Applying it in `buildFaqJsonLd` fixes `/services/[slug]` (8 URLs), `/for/[slug]` (5), and leaves the blog template's own inline strip harmless (a second strip over already-stripped text is a no-op). **Manager decision: apply once in `lib/schema.ts`, not at the two call sites.** V1 should re-check the W3 acceptance row "every FAQ answer string in the JSON-LD is present in the served HTML, normalised to alphanumerics with entities decoded" AFTER the strip lands, since the strip changes the JSON-LD side of that comparison.

---

## 8. `NextStepOffer` mount target for M1 (W7 builds it, mounts it nowhere)

Both targets are immediately after the `FaqSection` block closes and before the closing `LeadCTAPanel`, which is where a "next step" offer sits without competing with the panel's form:

- **`pharmacies/web/src/app/services/[slug]/page.tsx:248`** — insert on the line after `    )}` (the FaqSection conditional's closing brace, `:248`), before the `LeadCTAPanel` comment that opens at `:249`.
- **`pharmacies/web/src/app/for/[slug]/page.tsx:152`** — insert on the line after `    )}` (same position, `:152`), before the `noLeadForm` comment that opens at `:153`. On this template the mount belongs inside the `!hub.noLeadForm` path or above both branches; a hub flagged `noLeadForm` must not gain a capture surface by the back door.

Line numbers are against the post-W3 files in this receipt; re-grep `FaqSection` before inserting if any later package edits these two files.

---

## 9. Defects seen and NOT reachable from this package (M1's input)

1. **`pharmacies/web/src/lib/schema.ts:67-77`** — raw HTML in `acceptedAnswer.text`. Diff in §7. Manager-direct.
2. **`pharmacies/web/src/app/layout.tsx` `<noscript>` (K4)** — `alwaysRenderAnswers` adds `data-[state=closed]:hidden` (`accordion.tsx:68`) and Radix SSRs every item closed, so with JS off every FAQ answer this package moved into the accordion is invisible. 13 of this package's URLs are affected. Manager-direct, one line, V30 is the proof. **This package made that surface larger; it cannot fix it.**
3. **`packages/web-shared/design/primitives/SlimHero.tsx:53-56`** — kit gap candidate: no slot above the `h1` for a breadcrumb trail. A `crumbs?: ReactNode` rendered before the `Eyebrow`, defaulting to nothing, would be additive and byte-identical for every existing caller, and would let four heroes on this site and the same shape on sibling sites adopt the primitive. Not required for this wave.
4. **`packages/web-shared/design/primitives/page-blocks.tsx:120` and `CoverageCards.tsx:119-134`** — kit gap candidate: no hook for anchor colour / focus ring inside the card body, which is what declines both components wherever a body carries authored HTML. A `bodyClassName?` appended to the existing `bodyClass`, defaulting to `""`, would be additive. The same decline is live on startups-tech, so this is an estate-wide blocker on two components, not a pharmacies quirk.
5. **`packages/web-shared/design/marketing/CoverageCards.tsx:88`** — the `glow` surface hardcodes `rgba(5,150,105,...)`, a green drop shadow, so `glow` is unusable on any site whose brand is not green.
6. **`packages/web-shared/design/marketing/LeadCTAPanel.tsx:103`** — the non-contained variant hardcodes `bg-slate-900` and exposes no class hook, so adopting it **changes the ground** of 15 routes' closing band from the brand `0f3a4a` to slate-900. Measured and PASSing (§5), but it is a visible change the owner will see on the walk, and it is the reason `.ground-dark` had to go on a wrapper `div` instead of the section. Declared, not hidden.
7. **Plan §E.1 #3 is wrong.** `components/ui/Breadcrumb.tsx` has **three** consumers, not one: `src/app/privacy-policy/page.tsx:5`, `src/app/cookie-policy/page.tsx:5`, `src/app/terms/page.tsx:5`. All three are W6's files, so the module could not be deleted; it is a delegation shim over the kit instead, with the prop signature preserved. **W6 / M1 may now switch those three imports straight to the kit and delete the shim** — nothing else references it.
8. **`tsc` baseline is 0, not 1.** The brief's single expected error (`research/pharmacy-openings-closures-index/page.tsx:69`) is absent on the tree. V1 row V1 still expects zero, so this is not a blocker, but W6's receipt should say whether it closed it.
9. **`src/data/pharmacies-hubs.ts` sets `noLeadForm` on no record** (`grep` = the interface line only, `:7`). The `for/[slug]` signpost branch at `:173-182` is therefore dead code on all 5 live URLs. Kept, because the flag is part of the FROZEN exported shape and the brief requires it respected. Owner/manager call whether to delete the branch.
10. **`StatsCounter` is `grid-cols-2` on mobile** (`:142`) where the hand-rolled band was one column, and this site's stat `label` strings are full sentences of 15 to 30 words. At 390px that is two very narrow columns of uppercase prose. No overflow expected (the grid wraps), but it wants an eye at 390 — a V1/R2 screenshot row, not a code change this package can make without a layout prop the kit does not have.
11. **`for/[slug]` signpost band uses `btnPrimary` on `bg-slate-900`.** The button ground is the brand-950 token, so the button sits on a near-identical dark ground; the white label is 12.18 on the button itself, so it is legible, but the control's EDGE against the band is low. Pre-existing and unreachable today (dead branch, see #9).

---

## 10. Checks that need the build, listed for V1

- Exactly ONE `BreadcrumbList` per URL on all 13 detail URLs and both hubs (the page-level script was removed at both detail templates; the kit component is now the only emitter).
- `json.loads` every `ld+json` block on all 15 URLs: `Service` + `BreadcrumbList` on all 15, `FAQPage` wherever `faqs.length > 0`.
- Every FAQ answer string in the `FAQPage` JSON-LD present in the SERVED HTML, normalised to alphanumerics with entities decoded, on all 13 detail URLs — **run this after K9 lands**, see §7.
- 8 service slugs and 5 hub slugs still generate (`generateStaticParams` counts unchanged in source; prove it from the build output).
- Link floors per §6, counted as unique `href="/..."` in the server HTML.
- T15: the stats bands' TRUE values in the server frame — `curl | grep` for e.g. `0.5% vs up to 5%` and `ESM4270` on their URLs, and assert no `0` figure anywhere in those bands.
- V30: FAQ answers visible with JS off, after K4.
- 390px: no horizontal overflow on any of the 15 URLs (baseline 0), and the `StatsCounter` mobile grid above.
- `grep -o "primary-950" .next/static/css/*.css | wc -l` non-zero (the ramp step this package paints with compiled).
