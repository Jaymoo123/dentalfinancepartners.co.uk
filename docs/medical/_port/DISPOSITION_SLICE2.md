# PORT BLUEPRINT - MEDICAL SLICE 2: CALCULATORS, SERVICES, LOCATIONS, AUDIENCE/PILLARS

Site: `Medical/web`, Medical Accountants UK, `source_identifier: medical`. Reference: `Property/web`, always.

Sources read directly 2026-09-10: `docs/_engines/DESIGN_PORT_PLAYBOOK.md` (full, incl. T1-T20), `docs/property/DESIGN_SYSTEM.md` §0.1-§0.8, `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §4.1/§4.2/§4.6/F.5/F.6/G/H, `docs/solicitors/_port/DISPOSITION_SLICE2.md` (prior art, site 2), and Medical + Property + generalist source. **No dev server and no build was run** (brief prohibition), so every link count below is SOURCE-DERIVED, not measured; §E says what that costs and who must close it.

There is no `docs/medical/_port/link_baseline.json` and no `docs/medical/_port/` directory before this file. That is a Phase-0 dependency, not a slice-2 deliverable.

---

## 0. Findings that change the shape of the work

**F1. The "no email gate" promise is not one sentence on Medical, it is a positioning pillar on five surfaces including a homepage section headline.** Solicitors had one clause on `/calculators`. Medical has:

| File:line | Text | Surface |
|---|---|---|
| `src/app/page.tsx:179` | **"Free calculators, no email gate"** (a section TITLE) | homepage |
| `src/app/page.tsx:181` | "No sign-up, no email required." | homepage |
| `src/app/calculators/page.tsx:18` | "2026/27 rates, no sign-up." | meta description (SERP) |
| `src/app/calculators/page.tsx:49` | "**No email gate and no sign-up: every calculator gives you the figure on the page.**" | body |
| `src/app/services/page.tsx:225` | "No email gate, no sign-up." | body |
| `src/config/service-tiers.ts:16` | "No email gate or sign-up required" | ServiceTiers feature row, rendered on `/services` AND homepage |
| `src/components/audience/AudienceStageLayout.tsx:157` | "Instant estimates. **No email address required.**" | all four `/for-*` pages |
| `src/app/for-consultants/page.tsx:133` | "Instant, no sign-up." | card copy |

That is **eight strings across seven files, live on at least 8 routes**, and one of them is a `<title>`-adjacent meta description already indexed. A skippable ResultGate makes every one of them read false. This is **M-C1** and it is bigger than solicitors' S20: on solicitors the fix was a sentence, here it is a repositioning of a stated differentiator. Nothing in §A ships until it is decided.

**F1b. MEDICAL ALREADY HAS A RESULT GATE, and it is the busiest interaction on the site.** `src/components/tools/premium/ResultGateModal.tsx` (148 lines) is complete and working: `formId="calc_result_gate"` (`:122`), skip path firing `cta_click{cta_id:"result_gate_skip"}` (`:58`), four escape routes (X `:95`, "No thanks" `:140`, backdrop `:84`, Esc `:71`), `role="dialog" aria-modal` with focus management (`:64-66`), and an instrumentation contract written into its header (`:28-31`). It is mounted at `PremiumCalculator.tsx:676` behind the reveal button at `:658` (`data-cta="see_result"`). Manager's live window 2026-08-23 to 2026-09-10: `see_result` 13, `result_gate_skip` 11, a **54% skip rate**.

**So the gate exists on the 8 PREMIUM calculators and not on the 10 generic ones.** The slice-2 work is therefore EXTENSION, not a port: **do not port Property's `ResultGate.tsx` / `HeldResult.tsx` / `resultGateStorage.ts` wholesale.** §A is rewritten around what Medical already owns. What Property's version has that Medical's does not, and whether each gap matters, is answered in §A.2.

**F1c. LIVE DEFECT, recorded not fixed, on the exact component this slice extends to 10 more pages.** Manager's window: `calc_result_gate` shows **6 form starts, 6 `form_error`, 0 submits**. Six out of six. Diagnosed from source, and it is deterministic, not flaky:

- `ResultGateModal.tsx:133-134` passes `messageMinLength={40}` and `messageMinWords={8}` to `MiniCapture`.
- The estate defaults are `MINI_MESSAGE_MIN_CHARS = 20` and `MINI_MESSAGE_MIN_WORDS = 4` (`packages/web-shared/leads/capture-steps.ts:16-17`), applied at `MiniCapture.tsx:139-140`, and drop to `10 / 0` on the single-step flow.
- **`calc_result_gate` is the only call site on this site that raises the floor at all** (`grep -rn "messageMinLength\|messageMinWords" Medical/web/src` returns those two lines and nothing else). Every other Medical MiniCapture - `CalcResultCta.tsx`, the two blog mounts, the resource gate - takes the default.
- `validateStep1` (`capture-steps.ts:62-67`) rejects on `msg.length < minChars || wordCount < minWords`, and `emitStep1Floor` (`MiniCapture.tsx:227-238`) fires `form_error` with `field:"message"` and `kind:"min_length"` or `"min_words"`. The reader never reaches the contact step, so a submit is impossible.

**The reading: the gate asks a reader who pressed a button to see a number to first write at least 40 characters and 8 words of free prose about their situation, in a modal, at double the estate floor on both axes. Six people tried; six were bounced.** 0 submits against 11 skips is not a conversion rate, it is a broken form. `messagePlaceholder` (`:132`) even instructs "A couple of sentences is ideal", so the copy and the validator agree with each other and both disagree with what a person does in a modal. **M-C0.** Not fixed here, per instruction; but §A.4 must not extend this component to 10 more calculators before it is decided, or the defect ships to 18 surfaces.

**F2. Medical's premium fleet is blog-only and already fully gated.** Derived: `grep -rn "PremiumUpgrade\|PremiumCalculator" src --include=*.tsx | grep import` returns exactly one external importer, `src/components/blog/BlogPostRenderer.tsx:18`, which mounts it twice (`:216`, `:239`) both with `placement="blog"`. `PremiumCalculator.tsx:499` reads `const gated = placement === "blog" && !isConverted()`. **There is no `placement="calculator"` mount anywhere on this site.** Solicitors' S5 (two ungated premium calculator surfaces) has no Medical equivalent. `CalculatorPageResources` mounts `ResourceGate`, not `PremiumUpgrade`.

**F3. There is exactly ONE module-global gate flag, not two, and no bespoke calculator component at all.** `PremiumCalculator.tsx:43 let gateModalShownThisSession = false`. Medical has no `app/tools/*`, no static calculator route under `app/calculators/`, and no component importing `lib/tools/compute/*` outside the premium configs. The "a calculator exists twice" breach that was live on both prior sites **is not present on Medical**. `/nhs-pension/page.tsx:369` renders `<CalculatorClient slug="nhs-pension-annual-allowance" />` - that is the sanctioned single-copy shape (render the registry tool by slug), not a second copy.

**F4. `/nhs-pension` is the T7 surface on this site.** It is a 505-line pillar that mounts the fleet's flagship calculator at `:369` with the DEFAULT `variant="page"`. Wiring the gate at `CalculatorClient` gates it automatically; wiring it in `app/calculators/[slug]/page.tsx` would leave the site's most-linked pension surface ungated. This is the generalist phase-4 failure with a different filename. §A.1 is written around it.

**F5. Property's F.5 calculator page carries `LeadCTAPanel` + `RelatedArticles` + `FaqSection`; Medical carries none of the three.** Verified in `Property/web/src/app/calculators/[slug]/page.tsx:5,6,8` (imports), `:176` RelatedArticles, `:198` LeadCTAPanel, `:213` FaqSection. Medical's template ends in a hand-rolled `<dl>` (`:154`) and a navy box holding a bare `<Link href="/contact">` (`:167-188`). **And `tool.related` is dead data**: six of ten configs carry a `related[]` array and the template never reads it.

**F6. `/services`, `/medical-guides` and the four `/for-*` pages render 17 calculator LINK CARDS between them** (§0.4 breach x6 routes), and on `/services` that block is TEN cards carrying ten of the page's twenty body links. The naive "cards to tabs" conversion drops `/services` by 10 links. §B does the arithmetic per route before proposing anything.

**F7. Zero adoption of `packages/web-shared/design/`.** `grep -rn "web-shared/design" src | wc -l` = **0**. Medical does consume `web-shared/tools`, `/components` (ServiceTiers, StatsBar), `/schema`, `/leads`, `/analytics`. Per §4.6.3 the tools consumption is the target state and stays; the whole design kit is net-new.

**F8. Seven routes in this slice emit no page-level structured data at all.** `/medical-guides` and `/medical-guides/[slug]` x6 import no `JsonLd` and no schema builder (verified: neither file imports from `@/lib/schema`). They get a `BreadcrumbList` from the `Breadcrumb` component (`Breadcrumb.tsx:28`) and nothing else. No Article, no FAQPage, no HowTo. These are the site's named pillar guides.

**F9. Two of the traps the brief names do not bite on Medical, and one bites elsewhere.** No animated or derived counters exist anywhere in scope (T15 clean: `StatsBar` has no hooks; the only `animate-*` classes are skeleton pulses and a widget ping). No divergent FAQ arrays exist (T17 clean: every FAQ in scope already binds ONE array to both the render and the schema). The T6 pound-sign trap named in memory is a **Property** trait: `Medical/niche.config.json` stores real UTF-8 `£` (4) and a real em-dash (1), with zero `\u` escapes - verified by byte count, so a literal grep does find them here.

**F10. `--medical-teal` is a third brand colour in this slice.** `locations/[slug]/page.tsx:201` and `:273`. Owner decision 1 fixed the brand at navy + copper. Teal is neither brand nor warning ramp.

---

## 1. `/calculators/[slug]` - 10 pages, ONE file (194 lines)

Ten generic configs, all served by `src/app/calculators/[slug]/page.tsx`. `dynamicParams = false` (`:14`), params from `allTools().filter(kind === "generic")` (`:16-20`). Do not touch ten files.

Slugs (from `src/lib/tools/configs/*.ts`): `nhs-pension-annual-allowance`, `locum-tax-calculator`, `private-practice-incorporation`, `nhs-superannuation-tiered-contribution`, `nhs-pension-scheme-pays`, `gp-partner-drawings-planner`, `salaried-gp-vs-partner`, `salaried-doctor-take-home`, `doctor-expenses-tax-relief`, `consultant-private-vs-nhs`.

Link floor **17 on every one**, and **100% chrome**: the only body anchor is `/contact` (`:180`), which is already in the header CTA and nav. Breadcrumb items are `/` and `/calculators`, both chrome. **There is not one body link on any calculator page today.** Everything §1 adds is headroom; only a broken chrome link can fail this route.

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | `buildCalculatorJsonLd` + `buildFaqPageJsonLd` + **BreadcrumbList** | `:53-66` (WebApplication + FAQPage only) | KEEP-PAYLOAD-RESTYLE | F.5 names all three; the visible Breadcrumb already emits BreadcrumbList unsuppressed here, so confirm one node not two | Rename `buildWebApplication`/`buildFaqPage` at `:7` only if the kit names differ; the FAQ array must be the SAME `tool.faqs` binding the FaqSection gets |
| 2 | Navy motif hero `py-12 sm:py-16` | `:68` flat `bg-[var(--navy)]` slab | ADOPT-STANDARD | The ground is already navy and already the right rhythm; what is missing is the motif backdrop (slice 1 owns the file) | `relative overflow-hidden`, content `relative z-10` |
| 3 | Kit `Breadcrumb onDark` | `:70-77` local `Breadcrumb variant="light"` | ADOPT-STANDARD | Retires the local component estate-wide | Keep `suppressJsonLd` posture consistent with row 1 |
| 4 | Kit `Eyebrow onDark` "Free calculator · 2026/27 rates" | `:79-82` copper chip with a lucide icon | ADOPT-STANDARD | A square copper chip is the pre-redesign pill | The word "Free" survives; see M-C1 before adding any no-gate claim |
| 5 | h1 to the §4b scale | `:83` `text-3xl font-bold sm:text-4xl lg:text-5xl` | KEEP-PAYLOAD-RESTYLE | Already close; standard is `lg:text-6xl` | No `font-serif` here to retire (0 in this file) |
| 6 | Standfirst `max-w-3xl` | `:78`, `:84` | KEEP-PAYLOAD-RESTYLE | The one sanctioned clamp (§0.1) | |
| 7 | **NET-NEW hero CTA** `#get-expert-help` | none | ADOPT-STANDARD | §0.5: today the only ask is a bare button at the very foot | Label "Ask a medical accountant about your figure" |
| 8 | Tool section, **UNCLAMPED** | `:91` `max-w-4xl mx-auto` wrapping the ENTIRE body | ADOPT-STANDARD | §0.1/§6a body-clamp ban. This single wrapper clamps the tool, the explainer, the worked examples, the FAQ and the CTA | `CalculatorClient slug variant="page"` KEPT (`:93`) - §4.6.3, Medical is ahead of Property on shared consumption. **The gate goes inside `CalculatorClient`, not here** (§A) |
| 9 | Resources island, reduced | `:99` `CalculatorPageResources` | KEEP-PAYLOAD-RESTYLE | It is a SECOND capture form on a page that is about to get a gate and a `LeadCTAPanel`. One form per page | Retire the "Go deeper" navy/copper pill strip (`CalculatorPageResources.tsx:55-62`) and the `ResourceGate` mount (`:75-80`) on calculator pages ONLY. **Keep the `/resources/<topic>` link at `:63-74`** - it is the guide's only crawlable inbound link, and its own comment says so. **M-C4.** |
| 10 | White explainer at FULL container | `:101-110` `border-l-4 border-copper bg-slate-50` card | KEEP-PAYLOAD-RESTYLE | `border-l-4` is the sanctioned FIGURE recipe, not the section recipe | `h2 text-2xl sm:text-4xl` + kit `Prose`. All 10 configs carry `explainer` |
| 11 | Worked examples + `ExampleFigureNote` | `:112-149` | KEEP-PAYLOAD-RESTYLE | **1 of 10 configs carries `workedExamples`** (`gp-partner-drawings-planner.ts:213`). Nine render nothing | `humaniseKey`/`formatValue` from `lib/worked-example-format.ts` KEPT. §0.3 note required. Commission the nine: **M-C6** |
| 12 | **NET-NEW `RelatedArticles` from `tool.related`** | nothing renders it today | ADOPT-STANDARD | F.5 names it; six configs already carry the data | **6 of 10 have `related[]`** (consultant-private-vs-nhs, gp-partner-drawings-planner, nhs-pension-scheme-pays, nhs-superannuation-tiered-contribution, salaried-doctor-take-home, salaried-gp-vs-partner). Four have none: incorporation, locum-tax, nhs-pension, doctor-expenses. **All hrefs verified live** against the slug list; no dead slugs (unlike solicitors). **§2 standing rule: a `related` entry pointing at `/calculators/<slug>` renders as a tabs block or a plain link, never a card** - and 12 of the 15 related entries do exactly that. Practically this section carries **at most one card per page** (`/blog/nhs-pension-scheme-pays-doctors-deadlines`, `/nhs-pension`) |
| 13 | `#get-expert-help` `LeadCTAPanel` navy, `redirectOnSuccess={false}` | `:167-188` navy box + bare `<Link href="/contact">` | ADOPT-STANDARD | §0.5: the closing ask is never a bare button, and only the header and sticky leave for `/contact` | **Preserve `data-cta={\`calculator-page-cta-${slug}\`}`, `data-cta-goal`, `data-cta-placement` verbatim** (`:182-184`). The per-slug id is deliberate and its reason is written at `:174-178`; a shared id merges all ten calculators into one uninterpretable `vw_cta_performance` row |
| 14 | Kit `FaqSection tone="white"` on the same array | `:151-165` hand-rolled `<dl>` | ADOPT-STANDARD | §0.5. Also the light tail that keeps the navy panel off the navy footer | Same `tool.faqs` binding as row 1. Every config carries 4-9 FAQs |

`RETIRED:` the `max-w-4xl mx-auto` body clamp · the `<dl>` · the bare-button CTA box · `ResourceGate` on calculator pages · the "Go deeper" pill · local `Breadcrumb`.
`JSON-LD:` SoftwareApplication + FAQPage (same array) + BreadcrumbList.
`Wiring:` `calc_hero_help` net-new · `calc_see_result` / `calc_confirm_figure` emitted by `ResultGate` itself · `calculator-page-cta-<slug>` moves onto the panel submit surface, id unchanged.

---

## 2. `/calculators` index - 84 lines

Link floor **27** = 17 chrome + 10 tool cards. **The 10 cards cannot be replaced by tabs**: a tabs-only rebuild drops the route to 17 and fails by 10. Two tiers, per F.5.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero `min-h-[300px] sm:min-h-[350px]` + kit Breadcrumb + `Eyebrow onDark` | `:35-55` navy `py-16 sm:py-20`, copper chip, **no breadcrumb at all** | ADOPT-STANDARD | The index has no breadcrumb today | |
| 2 | **Copy: M-C1 blocker** | `:18` and `:49` | RETIRE (the claim) | See F1. `:49` is the strongest no-gate promise on the estate | Either the copy changes on all 8 surfaces or the gate does not ship |
| 3 | Tier 1 "Run one now": `CalculatorTabs tabs={INDEX_HEADLINE_TABS}` on white **+ one literal `<a href="/calculators/nhs-pension-annual-allowance">`** | none | ADOPT-STANDARD | F.5. The guard is a source scan and cannot see through a constant | See §B |
| 4 | Tier 2 directory, `bg-slate-50`, **all 10 cards retained**, `rounded-xl border-2 border-slate-200 bg-white p-3 sm:p-4` | `:57-81` `rounded-xl border` grid on white | KEEP-PAYLOAD-RESTYLE | The link floor requires all ten | **Categories: derive them.** `GenericTool.category` exists in the shared type; confirm each config populates it before writing a `CATEGORY_ORDER` constant, and if any is blank that is a data fix, not a template fix. Card ground flips to white on a slate-50 section (§0.1) |
| 5 | **NET-NEW tail link to `/embed`** | none | ADOPT-STANDARD | The embed gallery is orphaned: zero inbound links site-wide (verified: no `href="/embed"` anywhere in `src`) | "Run a medical site? Embed any of these calculators for free." |
| 6 | **NET-NEW `#get-expert-help` `LeadCTAPanel contained`** | none | ADOPT-STANDARD | §0.5: the index has zero ask today, on a page that is 100% link cards | Contained (`bg-slate-100 rounded-xl ring-1`), not full-bleed navy - nothing follows it and navy must not touch the navy footer |
| 7 | CollectionPage + BreadcrumbList JSON-LD | **none emitted today** | ADOPT-STANDARD | The index emits no structured data and no breadcrumb | `numberOfItems: 10` |

`data-cta`: `calculator-gallery-<slug>` on each card (`:64`) PRESERVED. New: `calc_index_help`.

---

## 3. `/embed` (70 lines) and `/embed/[slug]` (10 routes, 41 lines)

**Structurally unchanged, deliberately.** `robots: { index: false }` at `embed/[slug]:17`; the gallery is chrome-free. Not in the sitemap (verified: `sitemap.ts` has no `/embed` entry). **No link floor applies. Do not add one.**

- **Embeds are NEVER gated.** `embed/[slug]:32` already passes `variant="embed"`. §A derives `enabled` from that existing switch. **Do not add a second flag.**
- Gallery restyled to the standard scale, `rounded-xl ring-1`.
- **M-C7: the gallery mounts 10 live `<iframe>`s at once** (`embed/page.tsx:53-62`), each at `tool.embedHeight`. Lazy-load (`loading="lazy"`) or go snippet-only. One-line fix, but it is a real page-weight defect and it is the whole reason the gallery is unlinkable-from today.

---

## 4. `/services` - 302 lines, ONE file, no sub-pages

**PREMISE CORRECTION.** The brief scopes "`app/services/*`". `find Medical/web/src/app/services -type f` returns **one file**. There is no `/services/[slug]`, no `data.ts`, no five sub-pages. Six service areas live as an inline `sections` array (`:44-75`) rendered as an `<ol>`. Solicitors' §7 has no Medical counterpart, and neither does its sitemap defect: `sitemap.ts:42` lists `/services` and there is nothing else to list.

Link floor **37** = 17 chrome + 20 body: 5 blog guides (`:48,53,58,63,68`; "Consultant Tax Planning" `:73` has none), 5 location links (`:207`), 10 tool links (`:234`). Em-dashes in user-facing copy on this route: **0** (the only `—` in the file is a `ponytail:` comment in `service-tiers.ts`, exempt).

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Cream `TopicHero` `min-h-[360px] sm:min-h-[420px]` + motif + kit Breadcrumb, h1 to the pillar scale, hero primary -> **`#book`** | `:136-146` `contentNarrow`+`sectionY` with a bare h1, no hero section, no CTA | ADOPT-STANDARD | This is the site's commercial hub and it opens with a paragraph | `font-serif` x1 retires here |
| 2 | White `StatsCounter` strip `py-5 sm:py-7 border-b` | `:147-149` shared `StatsBar stats={siteStats}` | KEEP-PAYLOAD-RESTYLE | The kit's own strip is the standard | **Blocked on M-C5**: `service-tiers.ts:74` publishes "1 day / Response time", a turnaround promise, and `:62` publishes "6 / Service areas" which is a count the page also asserts in prose (`:151` "six areas") - both need a decision before the strip re-publishes them |
| 3 | Six service sections -> `CoverageCards columns={3}` on white, copy verbatim | `:157-191` numbered `<ol>` with a per-item "Ask about this service" `/contact` link | KEEP-PAYLOAD-RESTYLE | Six equivalent service areas IS a grid (§0.2 shape table). The numbering implies a sequence they do not have | **The six per-item `/contact` links (`:182`) are chrome duplicates and cost nothing to remove; the five blog "Related:" links (`:165-180`) are NOT and must survive the conversion.** Carry them into the card footer |
| 4 | "Where we help" -> keep, restyle | `:194-217` | KEEP-PAYLOAD-RESTYLE | Five real location links, and the page is prose-heavy without them | `rounded-xl ring-1`; card ground opposes section ground |
| 5 | **"Ten free calculators" block: keep all 10 links, ADD a tabs block** | `:220-244` ten `rounded-2xl` link cards | KEEP-PAYLOAD-RESTYLE | §0.4 says a calculator gets tabs, not cards; the link floor says these ten anchors cannot leave. **Both are satisfiable and neither alone is.** | See §B.2. Proposal: a 3-tab `CalculatorTabs` block ("run one here") ABOVE a plain, non-card **link list** of all ten. Cards become a list; the affordance objection is answered by the tabs; ten anchors survive. **Manager decision, recorded, not an owner gate.** `:225` no-gate clause is M-C1 |
| 6 | `ServiceTiers` KEPT | `:253-255` shared `ServiceTiers tiers={serviceTiers} featuredBadge="Most popular"` | KEEP-PAYLOAD-RESTYLE | Already the shared kit component; §4.6.3 | **`featuredBadge="Most popular"` is a client-behaviour assertion and comes out. Read T13: passing nothing leaves the shared DEFAULT rendering - pass `featuredBadge=""` explicitly.** `service-tiers.ts:16` is M-C1, `:30` "Responds within one working day" is M-C5. Medical's tiers carry **no prices** - the solicitors pricing problem does not exist here |
| 7 | Kit `FaqSection` on the same array | `:261-280` hand-rolled `<details>` accordion | ADOPT-STANDARD | §0.5 | `SERVICES_FAQS` already feeds `buildFaqPage` at `:112` - **one binding, T17 already satisfied.** Do not "fix" it into two |
| 8 | ONE `#book` `LeadCTAPanel` navy, `redirectOnSuccess` TRUE | `:282-298` **TWO stacked `CTASection`s** | ADOPT-STANDARD | Two asks at the foot, both bare-button pairs, is the §0.5 failure twice over | The second panel's "prefer to start with content?" links (`/blog`, `/about`) are chrome dupes; losing them costs zero unique links (T14) |
| 9 | Raw `<script type="application/ld+json">` -> kit `JsonLd` | `:130-133` `dangerouslySetInnerHTML` for the Organization node | ADOPT-STANDARD | The rest of the file already uses `JsonLd` (`:134`, `:135`) | Organization + Service/OfferCatalog + FAQPage + BreadcrumbList all already emit; keep `suppressJsonLd` on the Breadcrumb (`:138`) so only one BreadcrumbList ships. **Add no `offers`, no `priceRange`** |

`RETIRED:` `contentNarrow` · `sectionY` (superseded by explicit per-section `py-12 sm:py-16 lg:py-20`) · `CTASection` x2 · `font-serif` x6 · the `<details>` accordion · `featuredBadge="Most popular"`.

---

## 5. `/locations` index - 95 lines

Link floor **22** = 17 chrome + 5 city cards. **Em-dash: 1, at `:11`, inside the metadata description** (`${siteConfig.name} — specialist...`). It is user-facing (it is the SERP snippet). Fix the source; if a baseline records this route at 0 it will report a false regression until it is fixed.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero + kit Breadcrumb + `Eyebrow onDark` "UK-wide coverage" + **NET-NEW hero CTA `#book`** | `:44-56` `contentNarrow` block, no hero section | ADOPT-STANDARD | §0.5 | `font-serif` x3 retires |
| 2 | Body unclamped | `:44` `contentNarrow` = `max-w-3xl` on the whole page | ADOPT-STANDARD | §0.1 | |
| 3 | City cards restyled, all 5 retained | `:58-75` `card-premium rounded-xl` | KEEP-PAYLOAD-RESTYLE | Floor | `card-premium` retires. `loc.title` from `niche.config.json` already renders as the sub-line - correct, keep |
| 4 | "Remote service" box + a `ProcessTimeline` figure | `:77-84` prose-only `rounded-2xl border` box | KEEP-PAYLOAD-RESTYLE | §0.2: no section ships as prose alone | `rounded-xl ring-1`. Timeline copy = the remote engagement sequence (onboarding, secure document sharing, video review, year end) - it is already named in the prose at `:82`, so the figure re-presents the section's own copy and invents nothing |
| 5 | `#book` `LeadCTAPanel contained` | `:86-91` `CTASection` (defaults to `/contact` + `/services`, both chrome) | ADOPT-STANDARD | Property's recorded rationale: someone whose city has no page converts instead of bouncing off a list that excludes them | Removing the CTASection costs **zero** unique links (both destinations are chrome) - T14 arithmetic done |
| 6 | Kit `JsonLd` + BreadcrumbList + WebPage | `:40-43` raw `dangerouslySetInnerHTML` Organization only | ADOPT-STANDARD | | The Breadcrumb at `:45` is NOT suppressed, so BreadcrumbList already emits; do not add a second |

---

## 6. `/locations/[slug]` - 5 pages, ONE file (293 lines; Property's is 1006)

Cities from `siteConfig.locations` -> `niche.config.json`: `london, manchester, birmingham, leeds, bristol`. Content is a 100-line inline `cityContent` record (`:45-146`).

Link floor **24** each = 17 chrome + 3 blog posts + 4 sibling cities. Every page shows **the same three blog posts**: `getAllPosts().slice(0, 3)` at `:157`, unfiltered by city.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero: kit Breadcrumb, `Eyebrow onDark`, h1, standfirst `content.intro`, `DrawnTickList` trust row, **NET-NEW hero CTA "Speak to a medical accountant in {cityName}" -> `#book`** | `:186-199` | ADOPT-STANDARD | §0.5 | `btnPrimary` is imported at `:5` and **never used** - dead import, remove |
| 2 | Body unclamped | `:186` `contentNarrow` | ADOPT-STANDARD | §0.1 | Property's own template records that the inner clamp was deliberately deleted and `contained` used because the section above is light. Mirror both |
| 3 | "Areas we serve" -> white section, **chips** parsed from `content.areas` | `:201-208` prose paragraph in a **teal gradient** box | KEEP-PAYLOAD-RESTYLE | §0.2 (prose-only) and F10 | `rounded-full bg-white ring-1 ring-slate-200 text-xs font-semibold text-slate-600`. **`--medical-teal` retires here and at `:273`** |
| 4 | Services -> white `CoverageCards columns={3}`; `whyLocal` gets a figure | `:210-229` | KEEP-PAYLOAD-RESTYLE | §0.2 | **The three-service array is duplicated per city (15 near-identical objects) and duplicates `/services`' own service lines.** Lift the three titles to a module constant shared with `/services`; keep the per-city `desc` strings. **British English: `optimize`/`optimization` at `:62`, `:81`, `:85`, `:100`, `:123`, `:138`.** Sweep by RULE (the `-ize`/`-ization` pattern list), not by searching one word |
| 5 | `RelatedArticles columns={3}` | `:231-257` bespoke `<article>` cards | ADOPT-STANDARD | §0.6: one card component for related reading | **M-C8: `getAllPosts().slice(0,3)` gives all five cities the identical three posts, with a heading that implies local relevance.** Either filter by city (which on this corpus will likely return zero - measure first) or relabel the section honestly and pick a topical fallback. Do not silently keep three duplicate cards on five competing local pages |
| 6 | Sibling cities KEPT | `:259-282` | KEEP-PAYLOAD-RESTYLE | 4 unique links per page, load-bearing | `rounded-xl ring-1`; the `→` glyph becomes a real icon or nothing |
| 7 | ONE `#book` `LeadCTAPanel contained` | `:284-289` `CTASection` (defaults: `/contact`, `/services`, both chrome) | ADOPT-STANDARD | §0.5 | Zero link cost |
| 8 | Schema: `buildAccountingService` KEPT wholesale + **BreadcrumbList + FAQPage** | `:161-185` raw script tag | KEEP-PAYLOAD-RESTYLE | The `areaServed`/city enrichment is correct and the `telephone` omission is deliberate and documented at `:159-160` - do not "fix" it | Move to kit `JsonLd`. **Five city FAQs are net-new content (M-C9)**, and five city pages competing in local search may not share the first 60 characters of any answer. A light FAQ after the panel is also what keeps navy off the navy footer |

`RETIRED:` `contentNarrow` · `CTASection` · `font-serif` x7 · `--medical-teal` x2 · the dead `btnPrimary` import · six Americanisms.

---

## 7. The four `/for-*` pages - ONE shared layout (260 lines)

`src/components/audience/AudienceStageLayout.tsx` renders all four. The four `page.tsx` files (152-180 lines) are pure data (`AudienceStage`). **Edit the layout once; edit the data files only where copy breaches a rule.**

Link floors, source-derived:

| Route | Floor | = 17 chrome + | Body links |
|---|---|---|---|
| `/for-gps` | **21** | 4 | 1 calculator (`:154`) + 3 guides (`:161,166,171`) |
| `/for-consultants` | **22** | 5 | 2 calculators (`:126,131`) + 3 guides (`:138,143,148`) |
| `/for-locum-doctors` | **21** | 4 | 1 calculator (`:131`) + 3 guides (`:138,143,148`) |
| `/for-junior-doctors` | **21** | 4 | 1 calculator (`:126`) + 3 guides (`:133,138,143`) |

The "Browse all guides" button (`AudienceStageLayout:250` -> `/medical-guides`) is a chrome duplicate and counts zero. All six guide slugs resolve against `medical-guides-data.ts`; both calculator slugs resolve against the registry. **No dead links.**

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero, kit Breadcrumb, kit `Eyebrow onDark`, **NET-NEW hero CTA -> `#book`** | `:34-66`: a hand-rolled `<nav aria-label="Breadcrumb">` (`:43-53`), a `badge` pill (`:55-57`) AND an intro - two eyebrows stacked, and the breadcrumb **emits no BreadcrumbList** (it is raw markup, not the Breadcrumb component) | ADOPT-STANDARD | §0.5, §0.1 | `data.badge` becomes the kit Eyebrow; the trust content moves to a `DrawnTickList` |
| 2 | White `StatsCounter` strip `py-5 sm:py-7 border-b` | `:68-84` `bg-[var(--navy)]` band **immediately under a navy hero** | ADOPT-STANDARD | §0.1: two touching sections never share a ground | **Every value is a statutory figure, so `ExampleFigureNote` is REQUIRED** (§0.3; the StatsCounter exemption covers our own proof claims only, and these are not that). **T15 does not bite: these are static text nodes, not counters** (verified, no animation anywhere). **M-C10: re-derive all 16 stat values against `docs/medical/house_positions.md` before they republish** - a figure that is not re-derivable does not publish (§0.3) |
| 3 | Concerns grid -> `CoverageCards columns={3}` | `:86-119` | KEEP-PAYLOAD-RESTYLE | A grid of N equivalent concerns is correctly a grid | `rounded-2xl` -> `rounded-xl ring-1`; card ground opposes section ground |
| 4 | "How we work" -> **`ProcessTimeline`** | `:121-146` numbered `border-l-4` rows in a `max-w-4xl` clamp | ADOPT-STANDARD | §0.2: a numbered list of stages IS a sequence and a card stack contradicts it | Body clamp `:124` removed |
| 5 | **Calculator cards -> `CalculatorTabs` + one literal `<a href>` per page** | `:148-175` `relatedCalculators` link cards | ADOPT-STANDARD | §0.4 standing rule: a calculator never gets a card | **This is the link-floor edge. See §B.1 - each page must add its literal href in the SAME edit or it fails by 1 (by 2 on `/for-consultants`).** `:157` "Instant estimates. No email address required." is **M-C1** |
| 6 | `#book` `LeadCTAPanel` | `:177-197` `rounded-3xl` white card holding a bare `<LeadForm redirectOnSuccess={false}>` | ADOPT-STANDARD | §0.5: never a bare `LeadForm` in a coloured card | Ground is light today so labels render (D.1 satisfied) - **re-verify on the rendered DOM after it moves to navy.** `redirectOnSuccess` flips **TRUE**: **M-C11** |
| 7 | Kit `FaqSection` on the `data.faqs` binding | `:199-219` bespoke `border-l-4` cards | ADOPT-STANDARD | §0.5 | `buildAudiencePageSchema(data)` at `:32` already reads the same `data` object - **one binding, T17 already satisfied** |
| 8 | Related guides -> `RelatedArticles columns={2 or 3}` on `bg-slate-50` | `:221-257` navy full-bleed band of `bg-white/5` cards | ADOPT-STANDARD | The navy band is the last section before the navy footer (§0.1 "navy never touches navy") | Three guide cards each, all retained. "Browse all guides" button KEPT (chrome dupe, but it is the honest tail) |
| 9 | Add **Service** to the JSON-LD | `:32` `buildAudiencePageSchema` (BreadcrumbList + Service + FAQPage per its comment - **verify, the hero breadcrumb is hand-rolled so confirm the BreadcrumbList actually emits**) | KEEP-PAYLOAD-RESTYLE | | |

`RETIRED:` `font-serif` x10 · the navy stats band · `rounded-3xl` · the hand-rolled breadcrumb · four sets of calculator link cards · the bare `LeadForm` card.

---

## 8. `/nhs-pension` - 505 lines, the flagship pillar

Link floor **26** = 17 chrome + 9 body: `/medical-guides/nhs-pension-annual-allowance` (`:262`), `/calculators/nhs-pension-scheme-pays` (`:299`), four blog posts (`:303`, `:307`, `:404`, `:408`, `:428`), `/research/annual-allowance-pension-tax-index` (`:362`), `/resources/nhs-pension` (`:432`). Hero `/contact` (`:214`) is chrome.

Structurally this page is **already closest to the standard** in the whole slice: a `min-h` motif-shaped hero (`:190`), explicit oscillating `bg-white` / `bg-slate-50` grounds on canonical `py-12 sm:py-16 lg:py-20` rhythm, `font-serif` count **0**. The work is narrower than elsewhere.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Body unclamped | `max-w-4xl mx-auto` at `:227, :273, :318, :334, :376, :392, :419, :443, :466, :484` and `max-w-5xl` at `:368` | ADOPT-STANDARD | §0.1/§6a. Ten clamps, one rule | The `max-w-3xl` at `:199` (hero) and `:350` (section standfirst above a full-width block) are the two sanctioned survivors |
| 2 | **`CalculatorClient` gains the gate automatically** | `:369` `<CalculatorClient slug="nhs-pension-annual-allowance" />` (default `variant="page"`) | ADOPT-STANDARD | **F4 / T7. This is the surface a page-level gate would miss.** Gating at the component covers it with no edit here | No change to this line. It IS the acceptance test (§A.5) |
| 3 | Kit `FaqSection` on the same array | `:485-493` hand-rolled `<dl>` | ADOPT-STANDARD | §0.5 | `faqs` already feeds `buildFaqPage` at `:181` - one binding, T17 satisfied |
| 4 | `#book` `LeadCTAPanel` + hero CTA -> `#book` | `:498` `CTASection`; `:214` hero `<Link href="/contact">` | ADOPT-STANDARD | §0.5: only header and sticky leave for `/contact` | |
| 5 | Prose-only sections get figures | `:316-330` ("when do you need advice"), `:374-388`, `:417-439` | KEEP-PAYLOAD-RESTYLE | §0.2 | Derive each from its own copy; invent no numbers |
| 6 | `ExampleFigureNote` on every figure carrying figures | throughout | ADOPT-STANDARD | §0.3, statutory figures included | |
| 7 | Kit `Breadcrumb`, `Eyebrow`, `Prose` | `:201` local Breadcrumb (`suppressJsonLd`, correct - the ServicePage graph carries the BreadcrumbList) | ADOPT-STANDARD | | Keep the suppression |

---

## 9. `/medical-guides` (209 lines) and `/medical-guides/[slug]` (6 pages, 264 lines)

Six guides in `src/lib/medical-guides-data.ts` (`nhs-pension-annual-allowance`, `consultant-private-practice-tax`, `gp-partnership-accounts`, `locum-limited-company-vs-umbrella`, `medical-expenses-tax-treatment`, `ir35-for-locums`). All six in the sitemap (`sitemap.ts:147`).

**Both files emit ZERO page-level structured data** (F8): neither imports `@/lib/schema`. On seven routes. This is a live SEO defect found in slice 2, not design work; it belongs in the port because the templates are being rewritten anyway. **M-C12.**

`/medical-guides` index, link floor **26** = 17 chrome + 9 body: 6 guide cards (`:66`) + **3 calculator link cards** (`:127`, `:132`, `:137`). The four audience links (`:169-172`) and `/contact` / `/free-practice-health-check` (`:197`, `:200`) are all chrome duplicates.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero + kit Breadcrumb + `Eyebrow onDark` | `:41-58` | ADOPT-STANDARD | | `font-serif` x5 |
| 2 | Guide cards restyled, all 6 kept | `:60-113` | KEEP-PAYLOAD-RESTYLE | Floor | `rounded-xl ring-1` |
| 3 | **3 calculator cards -> `CalculatorTabs` + 1 literal `<a href>`** | `:115-156` | ADOPT-STANDARD | §0.4 | **Floor arithmetic: 26 -> 23 on conversion. One literal href recovers 1, leaving a 2-link deficit. See §B.1: this route needs THREE literal hrefs, or a plain link list beside the tabs.** |
| 4 | Audience block KEPT, restyled | `:158-185` | KEEP-PAYLOAD-RESTYLE | Chrome dupes, but the right IA | |
| 5 | `#book` `LeadCTAPanel` | `:187-205` navy band with two bare buttons | ADOPT-STANDARD | §0.5, and it is the last section before the navy footer | |
| 6 | **NET-NEW `CollectionPage` + `BreadcrumbList`** | none | ADOPT-STANDARD | F8 | |

`/medical-guides/[slug]`, floors: `nhs-pension-annual-allowance` **27** (17 + 7 relatedPosts + 3 relatedGuides), `consultant-private-practice-tax` **23**, `gp-partnership-accounts` **24**, `locum-limited-company-vs-umbrella` **24**, `medical-expenses-tax-treatment` **24**, `ir35-for-locums` **22**. (`/contact` `:216`, `/free-practice-health-check` `:219`, `/medical-guides` `:254` are chrome.)

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero + kit Breadcrumb | `:117-135` | ADOPT-STANDARD | | `font-serif` x7 |
| 2 | Body unclamped | `:154` `mx-auto max-w-3xl` round the whole guide body | ADOPT-STANDARD | §0.1 | |
| 3 | `guide.sections` get figures | `:158-168` prose + `border-l-4` h2s | KEEP-PAYLOAD-RESTYLE | §0.2: five to nine prose-only sections per guide, x6 guides | Derive each figure from its own section copy |
| 4 | `keyPoints` -> `DrawnTickList` | `:170-184` | ADOPT-STANDARD | | `tickClassName="text-emerald-600"` on light (§0.7) |
| 5 | `relatedPosts` -> keep as a link LIST | `:186-203` | KEEP-PAYLOAD-RESTYLE | These are 2-7 unique links per page and the floor's whole margin | Do not convert to cards; `RelatedArticles` is for the guide cards at `:230-250` |
| 6 | `#book` `LeadCTAPanel` | `:209-226` two bare buttons | ADOPT-STANDARD | §0.5 | |
| 7 | **NET-NEW `Article` + `BreadcrumbList`; `FAQPage` where a guide has Q&A** | none | ADOPT-STANDARD | F8, M-C12 | |

---

## 10. `/free-practice-health-check` - 243 lines + `MedicalHealthCheckWizard.tsx` (503 lines)

Link floor **20** = 17 chrome + 3 guide links (`:66`, `:71`, `:76`). It is in the header nav, so it is a chrome destination itself.

**This is an existing capture surface and the port does not change what it captures.** The wizard collects name + email at step 6 with an explicit consent gate (`:215`) and posts `captureMode: "email_only"` (`:249`). Leave the capture logic alone; §4.6.6 says the capture-surface SET is owner-scoped, and this one is already owned.

| # | New | Replaces | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Navy motif hero + kit Breadcrumb + `Eyebrow onDark` | `:127-150` (**no breadcrumb today**) | ADOPT-STANDARD | | `font-serif` x9 |
| 2 | Wizard section unclamped to a two-column | `:151-159` `mx-auto max-w-2xl` | ADOPT-STANDARD | §0.1: "if a form or tool looks lost at full width, the fix is a two-column section with something useful beside it, never a clamp" | Right column: `WhatToExpectCard` |
| 3 | Steps block -> `ProcessTimeline` | `:160-187` `max-w-4xl` + numbered circles | ADOPT-STANDARD | §0.2: five numbered steps are a sequence | |
| 4 | Kit `FaqSection` on the `FAQS` binding | `:188-208` `<dl>` in a `max-w-3xl` | ADOPT-STANDARD | | `FAQS` already feeds the schema at `:112` - **one array, two `.map()` calls off THE SAME binding. That is not T17.** T17 is two divergent arrays; there are none on this site. Swap the `<dl>` for `FaqSection`, keep the single array |
| 5 | Related guides -> `RelatedArticles columns={3}` | `:210-240` navy band of cards, last before the navy footer | ADOPT-STANDARD | §0.1 | 3 links, all retained |
| 6 | **`:138` em-dash** ("a follow-up email — no PDF wall") | | RETIRE | No em-dashes in user-facing copy | Rewrite the clause, do not swap the glyph for a hyphen mid-sentence |

---

## A. RESULT-GATE DECISION (capture-surface change, owner sign-off)

### A.1 The single edit point, and the T7 trap

**Wire the gate in `Medical/web/src/components/tools/CalculatorClient.tsx` and NOWHERE ELSE.** Deriving command and result:

```
grep -rn "CalculatorClient" Medical/web/src --include=*.tsx | grep import
  src/app/calculators/[slug]/page.tsx:8
  src/app/embed/[slug]/page.tsx:2
  src/app/nhs-pension/page.tsx:4
```

Three importers, one component, and **the third is the site's flagship pillar** (F4). A gate written into `app/calculators/[slug]/page.tsx` would gate ten calculator pages and leave `/nhs-pension` ungated - the generalist phase-4 failure, verbatim, with a different filename. Every future `CalculatorTabs` panel mounts `CalculatorClient` by slug and inherits the gate for free.

**The hook already exists and no shared-package edit is needed.** Verified: `packages/web-shared/tools/components/Calculator.tsx:42` declares `resultWrapper = (node) => node` (identity default), typed at `:69`, and applies it at `:122` **wrapping the RESULT column only** - inputs stay live. The brief's premise on this point is correct and I am stating it plainly because it removes the manager-direct `packages/web-shared/` carve-out from the critical path.

The change to `CalculatorClient.tsx` is four lines: add `resultWrapper={(node) => <ResultGate campaign={slug} enabled={variant !== "embed"}>{node}</ResultGate>}` and drop the `resultCta` prop (`:29`). `ResultGate` here is the **extraction of Medical's own gate orchestration** (§A.4), not a Property import. **Do not add a second flag** - `enabled` derives from the existing `variant === "embed"` switch that `embed/[slug]:32` already passes. The file's own header comment (`:11-13`) describes the `resultCta` behaviour and must be rewritten in the same edit or it becomes a lie.

### A.2 Every place a calculator renders, and its gate state

| Surface | File:line | Renders via | Gate after this slice |
|---|---|---|---|
| `/calculators/[slug]` x10 | `calculators/[slug]/page.tsx:93` | `CalculatorClient variant="page"` | **GATED** |
| `/nhs-pension` | `nhs-pension/page.tsx:369` | `CalculatorClient` (default variant) | **GATED** - the T7 surface |
| `/embed/[slug]` x10 | `embed/[slug]/page.tsx:32` | `CalculatorClient variant="embed"` | **NEVER** |
| `/embed` gallery x10 iframes | `embed/page.tsx:53-62` | iframes into `/embed/<slug>` | **NEVER** (inherits) |
| `CalculatorTabs` panels (net-new: `/calculators` Tier 1, `/services`, `/medical-guides`, 4x `/for-*`) | new `components/tools/CalculatorTabs.tsx` | `CalculatorClient` by slug | **GATED** automatically, via the same boundary |
| Blog premium island x2 | `BlogPostRenderer.tsx:216`, `:239` | `PremiumUpgrade placement="blog"` -> `PremiumCalculator` | **already gated**; behaviour CHANGES - per-calculator keys replace the once-per-session global (§A.4, M-C3a) |

**There is no ungated `placement="calculator"` premium surface on this site** (F2). Solicitors' S5 has no counterpart here.

### A.3 What Property's gate has that Medical's does not, and whether it matters

Medical's gate is a modal plus ~20 lines of orchestration living inside `PremiumCalculator.tsx` (`:43`, `:499-501`, `:653-676`). Property's is a reusable `ResultGate` wrapper plus `HeldResult` plus `resultGateStorage`. The differences, and the verdict on each:

| Property has | Medical has | Matters? |
|---|---|---|
| Per-campaign `sessionStorage` reveal memory (`resultGateStorage.ts:12`, `ptp_calc_revealed_${campaign}`) | **Nothing persisted.** `revealed` is component state; the only memory is `let gateModalShownThisSession` at module scope (`PremiumCalculator.tsx:43`) | **YES, and this is the whole of §A.4.** See below |
| "**Every** calculator gates. There is no once-per-session bypass" (`ResultGate.tsx:12-14`) | `onSeeResult` (`:653-660`): if the module flag is already true, **reveal directly with no gate** | **YES.** This IS "unlock one, unlock all", already live |
| `HeldResult`: the REAL result behind frosted glass | A placeholder panel: "Your figure is ready." + a button (`:648-668`) | Yes, but it is a conversion argument, not a correctness one. Port `HeldResult` only |
| A reopen CTA under a revealed result, firing `calc_confirm_figure` (`ResultGate.tsx:93-95`) | None | Minor. Cheap to add, gives "asked after seeing the number" as a separable series |
| An `enabled` prop so embeds are excluded structurally | `placement === "blog"` string comparison (`:499`) | Yes for the generic fleet: `enabled={variant !== "embed"}` is the switch that already exists on `CalculatorClient` |
| `isConverted()` exemption | Same (`:499`, shared `web-shared/analytics/visitMemory`) | No gap. Correct on both, stays shared |
| A `role="dialog"` modal with four escape routes and skip instrumentation | **Medical's is at least as good**, and carries `topicKey` threading Property has no equivalent of | No gap. **Medical's modal wins; keep it** |

**Verdict: reuse the modal, port only `HeldResult`, and write the missing persistence.** The reusable wrapper is an EXTRACTION of `PremiumCalculator.tsx:653-676`, not an import.

### A.4 The storage-key scheme, for 18 calculators

**Read what the current key is: there isn't one.** `PremiumCalculator.tsx:43` is `let gateModalShownThisSession = false` - a module-scope in-memory boolean, one for the entire premium fleet, keyed on nothing. Its semantics are "show the modal once per JS module lifetime", so today:

- First premium calculator a reader meets: gated.
- **Every other premium calculator in the same client session: revealed directly, no gate** (`:653-657`).
- A hard reload resets the module and re-gates; a soft client navigation does not.

That is the "unlock one, unlock all" bug, already live, at a fleet size of 8. **Extending this component to 10 more calculators without changing the flag makes 18 calculators share one boolean**, which is precisely the shape the brief warns about and precisely what solicitors found in two modules. The current low volume is the only reason it has not been noticed.

**The scheme for 18:**

- **One key per calculator, `sessionStorage`, `ma_calc_revealed_${campaign}`.** `ma` is the site's FROZEN storage prefix (`lib/tools/premium/registry.ts:11`: "Storage prefix: ma (FROZEN)... Never ptp: or dfp:"). `sessionStorage` not `localStorage`, for Property's recorded reason: a reveal should outlive navigation, not the browsing session.
- `campaign` is the generic tool `slug` on the generic fleet and `config.id` on the premium fleet. **Those two namespaces overlap on four ids** (`nhs-superannuation-tiered-contribution`, `gp-partner-drawings-planner`, `salaried-gp-vs-partner`, `consultant-private-vs-nhs` are both a generic slug and a premium `toolId`). A shared key would mean revealing the free NHS-superannuation calculator silently unlocks the premium one. **Prefix by tier: `ma_calc_revealed_generic_${slug}` and `ma_calc_revealed_premium_${toolId}`.** This is a real collision in the data today, not a hypothetical.
- **`gateModalShownThisSession` is deleted, not re-keyed.** Replacing "shown once ever" with "revealed, per calculator" is the fix; keeping a global alongside per-calculator keys reintroduces the bypass through the back door.
- **This changes premium behaviour**, so it is not silent: a reader who meets three premium calculators sees three gates instead of one. That is the documented Property semantics and the honest reading of a 54% skip rate (skipping is free and always works), but it is a funnel change on a live surface with real volume. **M-C3a.**
- `isConverted()` stays the single shared exemption across both tiers. A converted visitor is never re-asked anywhere.

### A.5 What to build, and where

| File | Verdict | Why |
|---|---|---|
| `src/components/tools/premium/ResultGateModal.tsx` | **REUSE AS-IS** | Already correct: four escape routes, skip instrumentation, `topicKey` prop, focus management. It needs `campaign`, `topicKey`, `onReveal` - all three available at the generic boundary (`topicKey` from `topicForCalcSlug(slug)`, already imported by `CalculatorPageResources.tsx:23`). **M-C0 must resolve before it is mounted on 10 more pages** |
| `src/components/tools/resultGateStorage.ts` | **NET-NEW, ~20 lines** | §A.4. `wasRevealed(key)` / `rememberRevealed(key)`, both `try/catch` (blocked storage degrades to "does not survive navigation", never throws) |
| `src/components/tools/ResultGate.tsx` | **EXTRACT from `PremiumCalculator.tsx:653-676`** | The wrapper both tiers use. `{campaign, enabled = true, children}`. Property's file is the reference for the semantics, not the source to copy |
| `src/components/tools/HeldResult.tsx` | **PORT from `Property/web/src/components/calculators/HeldResult.tsx`** | The one genuine capability gap: the real result behind frosted glass instead of "Your figure is ready." Medical copy: "Your figure is ready. Have a specialist medical accountant confirm it, or skip straight to the number." Buttons from `src/components/ui/layout-utils.ts` (`btnPrimary:20`, `btnSecondary:24`) |
| `PremiumCalculator.tsx` | **REFACTOR to consume the extracted `ResultGate`** | Deletes `:43`, `:499-501` and `:648-676`'s bespoke pre-reveal panel. Keeps `placement === "blog"` as its own `enabled` expression. Golden tests (`premium-tools.test.ts`) must still pass |

**The revealed CTA must live inside the same `div` as the result** (`Property/.../ResultGate.tsx:89-96`). It is a documented layout trap, not a style choice: without the wrapper the button becomes a sibling grid item and breaks the two-column result layout.

### A.6 The skip path, what the gate does NOT block, and the acceptance test

**Skip always reveals.** X (`ResultGateModal.tsx:95`), "No thanks" (`:140`), backdrop (`:84`), Esc (`:71`) - all four route through `skip()` (`:57-60`), which fires the diagnostic and calls `onReveal`. Verified in source, and the live 11 skips against 13 reveals prove the path works in production. The figure is never actually walled off; after `HeldResult` lands, the held state renders the REAL result behind frosted glass, which is what makes the ask worth answering and what keeps the copy honest.

**The gate does NOT block:** the inputs (the reader edits their numbers freely at all times), embeds, converted visitors, a calculator already revealed this session, or any of the ten calculator pages' explainer / worked examples / FAQ / schema content. Crawlers and LLM scrapes read the pre-hydration HTML, which is unchanged: `ResultGate` starts `revealed=false` on both server and first client render (`Property/.../ResultGate.tsx:53-56`), so there is no hydration mismatch and no result flash.

**Acceptance test that proves the tab strip and the pillar are gated too** (this is the whole point of the boundary rule):

```
grep -rn "<ResultGate" Medical/web/src/components/tools/CalculatorClient.tsx   # exactly 1
grep -rn "<ResultGate" Medical/web/src/app                                     # ZERO hits
grep -rn "gateModalShownThisSession" Medical/web/src                           # ZERO hits (A.4)
grep -rn "ma_calc_revealed_" Medical/web/src                                   # ONLY resultGateStorage.ts
```

Plus a rendered-DOM check on three surfaces, not one: `/calculators/nhs-pension-annual-allowance` (page), **`/nhs-pension` (pillar, the T7 surface)**, and one `CalculatorTabs` panel - each must show the held state; `/embed/nhs-pension-annual-allowance` must show the raw result with no gate and no CTA. A review that checks only the `/calculators/[slug]` route has not tested the thing that broke last time.

A fourth check, because the gate is now shared across tiers: **reveal a generic calculator, then open a second generic one and a premium one in the same session. Both must still gate.** That is the A.4 regression, and it is the one a single-page test cannot see.

### A.7 What retires

`src/components/tools/CalcResultCta.tsx` loses its only call site (`CalculatorClient.tsx:29`). Deriving command: `grep -rn "CalcResultCta" Medical/web/src` returns the component and that one import. **Unlike Property and solicitors, Medical's `CalcResultCta` has no second consumer, so the file is deleted outright, not kept for a blog island** (Medical's blog island is `MiniCapture` directly, `BlogPostRenderer.tsx:221`). Property's measured argument for removing it: an always-visible capture below an already-satisfied reader converts at roughly 4% of the gate's rate.

**Its copy is a live rule breach regardless of the gate decision:** `CalcResultCta.tsx:21` ends "we reply within one working day", and `ResultGateModal.tsx:130 successText` reads "we will be in touch within one working day". Both are turnaround promises. **M-C5.**

### A.8 The blockers

**M-C0, F1c: `calc_result_gate` is 6 starts / 6 errors / 0 submits, and this slice mounts it on 10 more calculators.** Extending a form that has never once been submitted is shipping a defect to 18 surfaces. Diagnosed at `ResultGateModal.tsx:133-134` (§0/F1c); not fixed here per instruction. Decide it before §G step 4.

**M-C1, F1: eight strings on seven files promise no email gate, no sign-up, no email address required** - including a homepage section headline and an indexed meta description. A modal asking for an email before a figure makes all eight false. Either the copy changes across all of them in the same commit, or the gate does not ship on this site. Owner decides. Everything else in §A is ready to build.

**Full capture sign-off list:** ResultGate on 10 generic calculators x11 rendering surfaces (10 pages + `/nhs-pension`) + every tabs panel · `CalcResultCta` deleted · `ResourceGate` removed from the calculator island (M-C4) · `gateModalShownThisSession` deleted and replaced by per-calculator keys, which re-gates the premium fleet (M-C3a) · `redirectOnSuccess` flips on 4x `/for-*` (M-C11) · **nine net-new `LeadCTAPanel` mounts** on routes that have no on-page form today (`/calculators`, `/calculators/[slug]`, `/locations`, `/locations/[slug]`, `/services`, `/nhs-pension`, `/medical-guides`, `/medical-guides/[slug]`, `/free-practice-health-check`).

---

## B. CALCULATOR-TABS ADOPTION MAP, with per-route link-floor arithmetic

Build LOCAL at `src/components/tools/CalculatorTabs.tsx`. **There is no shared twin**: `CalculatorTabs` is Property-local (`Property/web/src/components/calculators/CalculatorTabs.tsx`); generalist built its own. Medical imports zero from `web-shared/design` (F7).

Shape, from Property: WAI-ARIA tablist, roving tabindex, Arrow/Home/End, `#hash` deep link, `next/dynamic` panels with a sized `loading` placeholder (zero CLS), a **literal** `TABLIST_COLUMNS` map (Tailwind scans literals, never computed strings), tab `rounded-xl border-2 p-3 sm:p-4`, selected `border-copper bg-copper shadow-md`, panels `mt-6 sm:mt-8`. Every tab renders `CalculatorClient` by slug - **never a second copy of a tool.**

### B.1 The arithmetic, per route, before any conversion

A tabs block emits `<button role="tab">`, not `<a href>`. Converting N calculator link cards to tabs removes N anchors and the guard's remedy returns 1. On solicitors, four pages sat at exactly 14 with only 3 body links, so the conversion would have failed all four by one. Medical's numbers:

| Route | Floor | Body links | Calc cards today | After tabs | Literal `<a>` recovers | Net | Verdict |
|---|---|---|---|---|---|---|---|
| `/for-gps` | 21 | 4 | 1 | 20 | +1 | **21** | SAFE, exactly at floor. The literal href is mandatory |
| `/for-consultants` | 22 | 5 | 2 | 20 | +1 | **21 = FAILS BY 1** | **Needs TWO literal hrefs**, one per slug |
| `/for-locum-doctors` | 21 | 4 | 1 | 20 | +1 | **21** | SAFE, exactly at floor |
| `/for-junior-doctors` | 21 | 4 | 1 | 20 | +1 | **21** | SAFE, exactly at floor |
| `/medical-guides` | 26 | 9 | 3 | 23 | +1 | **24 = FAILS BY 2** | **Needs THREE literal hrefs**, or the tabs sit above a plain link list |
| `/services` | 37 | 20 | **10** | 27 | +1 | **28 = FAILS BY 9** | **DO NOT convert the ten to tabs.** See B.2 |
| `/calculators` (index) | 27 | 10 | 10 (the directory) | 17 | +1 | **18 = FAILS BY 9** | **The directory is not convertible.** Tabs are Tier 1, ADDITIVE, above the retained directory (F.5) |

Three of seven routes fail a naive conversion, and the two worst would each lose nine or ten unique internal links. **No conversion ships without its literal hrefs written in the same edit.** The guard is a source scan and cannot see through a constant, so spell every href out; a link to `/calculators` alone does not satisfy it.

### B.2 The `/services` resolution (manager decision, recorded, not an owner gate)

§0.4 says a calculator gets tabs, not cards. §0.6 says never delete a crawlable internal link to make a layout work. On `/services` those two rules collide over ten anchors, and only one arrangement satisfies both:

**A 3-tab `CalculatorTabs` block ("run one here") above a plain, non-card link LIST of all ten calculators.** The tabs answer the affordance objection (the reader can use the tool where they are standing). The list keeps all ten anchors. The forbidden artefact - a *card* pointing at a calculator - is gone in both halves. The list is not a second copy of a tool; it is a nav list.

Same shape resolves `/medical-guides` (3 tabs + a 3-item link line) and `/calculators` (Tier 1 tabs + Tier 2 directory, which is what F.5 already prescribes).

### B.3 `TabKey` union and the crawl-path obligation

| Key | Slug | Rendered on |
|---|---|---|
| `annualallowance` | `nhs-pension-annual-allowance` | `/calculators` T1, `/services`, `/medical-guides`, `/for-gps`, `/for-consultants` |
| `locumtax` | `locum-tax-calculator` | `/calculators` T1, `/services`, `/medical-guides`, `/for-locum-doctors`, `/for-junior-doctors` |
| `incorporation` | `private-practice-incorporation` | `/calculators` T1, `/medical-guides`, `/for-consultants` |
| `schemepays` | `nhs-pension-scheme-pays` | `/calculators` T1 |
| `gpdrawings` | `gp-partner-drawings-planner` | `/calculators` T1 |

`INDEX_HEADLINE_TABS` = those five. That is the bundle ceiling: every listed panel mounts and downloads, so do not pad it.

**Literal `<a href>` owed, per rendering page:**

| Page | Literal hrefs it owes |
|---|---|
| `/calculators` | `/calculators/nhs-pension-annual-allowance` |
| `/services` | (retains the ten-link list; no deficit) |
| `/medical-guides` | all three: `/calculators/nhs-pension-annual-allowance`, `/calculators/locum-tax-calculator`, `/calculators/private-practice-incorporation` |
| `/for-gps` | `/calculators/nhs-pension-annual-allowance` |
| `/for-consultants` | **both**: `/calculators/nhs-pension-annual-allowance`, `/calculators/private-practice-incorporation` |
| `/for-locum-doctors` | `/calculators/locum-tax-calculator` |
| `/for-junior-doctors` | `/calculators/locum-tax-calculator` |

### B.4 Guard test, net-new

`src/tests/calculator-tabs-crawl-path.test.ts`, consuming `@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path` with `appDir: join(__dirname, "..", "app")`, `tabsTag: "<CalculatorTabs"`, `linkCardsTag: "<CalculatorLinkCards"`, `toolRoutePrefix: "/calculators/"`, `toolIndexRoute: "/calculators"`, and **both exemption lists empty** - the template's own instruction (`:36-38`): entries are earned one recorded owner decision at a time, never because a page edit tripped the guard. Medical has `src/tests/` with five existing vitest files, so the harness is already there.

**No tabs on** `/calculators/[slug]` (the tool's own page), `/locations`, `/locations/[slug]`, `/free-practice-health-check`, `/medical-guides/[slug]`, or `/nhs-pension` (it already mounts the tool itself, which is better than tabs).

---

## C. KIT-VS-LOCAL (slice 2), with the reason

**ADOPT FROM KIT** - all net-new to this site (F7): `design/layout-utils.ts` (retires the divergent local `sectionY` `py-12 sm:py-16 md:py-20` / `sectionYLoose` / `contentNarrow`), `globals-standard.css`, `primitives/page-blocks`, `FaqSection`, `Breadcrumb` (retires `src/components/ui/Breadcrumb.tsx`), `EyebrowRule`, `ExampleFigureNote`, `NoticeCard`, `accordion`, `marketing/LeadCTAPanel` (retires the local `CTASection`), `CoverageCards`, `ProcessTimeline`, `DrawnTickList`, `StatsCounter`, `ComparisonTable`, `blog/RelatedArticles`, `guards/calculator-tabs-crawl-path`.

**KEEP, do not touch:** the shared `web-shared/tools` renderer and its `resultWrapper` prop - Medical is ahead of Property on shared consumption (§4.6.3) and nothing in this slice changes that · `web-shared/leads/MiniCapture` · `buildAccountingService` on the location pages (shared, correct, and its `telephone` omission is deliberate and documented) · `web-shared/analytics/visitMemory`.

**ADOPT AND FIX:** `packages/web-shared/components/ServiceTiers.tsx` on `/services` - already imported (`services/page.tsx:9`), keep it, but pass `featuredBadge=""` **explicitly**. T13: dropping the prop leaves the shared default rendering. **Never edit the kit component to fix a Medical problem** - it touches Property and 14 other sites (T12, manager-direct carve-out).

**MIRROR LOCALLY** (T12 - the kit hardcodes Property's copy): `ProblemStatement` (landlord copy, no copy props), `ComparisonTable` (forces a "Most recommended" pill). If either is wanted in this slice, mirror it into `src/components/medical/` and log the kit gap as an owner item.

**BUILD LOCAL:** `src/components/tools/CalculatorTabs.tsx` · `src/components/tools/resultGateStorage.ts` (net-new) · `src/components/tools/ResultGate.tsx` (**extracted from `PremiumCalculator.tsx:653-676`, not imported from Property**) · `src/components/tools/HeldResult.tsx` (the one file genuinely ported from Property) · `src/tests/calculator-tabs-crawl-path.test.ts` · the navy/cream motif backdrop (**slice 1 owns the file; slice 2 consumes it**).

**REUSE, DO NOT REBUILD:** `src/components/tools/premium/ResultGateModal.tsx`. Medical's gate modal is complete, live, instrumented and better than Property's on one axis (`topicKey` threading). §A.3 is the line-by-line comparison. Rebuilding it would be the reuse failure the ladder exists to prevent.

**KEEP-RESTYLE, do not rewrite:** the premium fleet (`PremiumCalculator` 680 lines, `PremiumUpgrade`, `PremiumBarChart`, `MobileToolSlot`, `ResultGateModal`) - tokens, radii, the storage re-key (§A.3) and the a11y fix (§D) only. It is blog-only, already gated, and has passing golden tests (`premium-tools.test.ts`).

**RETIRE:** `CalcResultCta.tsx` (deleted, no second consumer) · `CTASection.tsx` at all six slice call sites · `ResourceGate` on calculator pages only · local `Breadcrumb` · `card-premium` / `card-flat` CSS classes · `contentNarrow` · `sectionYLoose` · seven hand-rolled FAQ blocks (`<dl>` x4, `<details>` x1, bespoke card lists x2) · **60 of the site's 116 `font-serif` uses** (`services` 6, `locations` 3, `locations/[slug]` 7, `AudienceStageLayout` 10, `medical-guides` 5, `medical-guides/[slug]` 7, `free-practice-health-check` 9, plus 13 in `CTASection`/shared UI this slice retires; the calculator, embed and `/nhs-pension` templates carry **zero**) · `--medical-teal` x2.

---

## D. `PremiumBarChart` disposition (T16) - and the same correction as solicitors

**The brief's premise is half right, in exactly the way the brief predicted.** `src/components/tools/premium/PremiumBarChart.tsx:101` does set `role="img"` with `aria-label="Bar chart comparing values across groups"` (`:102`). But the **wrapping `<div>` at `:94` already carries `aria-hidden="true"`**. So the subtree is not collapsed to one label, it is removed from the accessibility tree entirely, and the `role="img"` is dead code inside an `aria-hidden` container. This is byte-for-byte the same defect shape found on solicitors.

The accurate finding: **the chart is deliberately decorative, and its series values exist as text nowhere a screen-reader user reaches without expanding a `<details>`.** `PremiumCalculator.tsx:638` renders it between the scenario tiles and the workings, and the workings sit inside a collapsed disclosure.

Disposition:

1. **Delete `role="img"` and `aria-label` (`:101-102`).** They do nothing under `aria-hidden` and their presence is what makes the file look already-handled.
2. **Keep `aria-hidden="true"` on the wrapper (`:94`)** and keep the bars decorative. That is the correct answer once the values are reachable elsewhere.
3. **Add a visually-hidden `<table>` sibling** emitting each group label and each series value as **text nodes**, using the component's existing `formatValue` helper so the accessible text and the drawn bars read the same source and cannot disagree. This is T16's "values as text nodes, decorative bars `aria-hidden`" applied where it actually bites.
4. `ExampleFigureNote` under the chart (§0.3).

`grep -rn 'role="img"' Medical/web/src` returns this one hit. There is no research or chart component elsewhere in slice-2 scope.

**Not an owner gate.** It is an accessibility floor (§0.7) and ships with the premium restyle.

---

## E. LINK FLOORS, AND WHAT IS WRONG WITH THEM

**Chrome floor = 17 unique internal destinations**, derived from `Medical/niche.config.json` `navigation[]` (6) + `footer_links[]` (11) + the wordmark `/` + `cta.variants.leadgen` header/sticky hrefs (`/contact`, `/free-practice-health-check`, both already in the set):

`/` · `/services` · `/medical-guides` · `/free-practice-health-check` · `/about` · `/blog` · `/contact` · `/for-gps` · `/for-consultants` · `/for-locum-doctors` · `/for-junior-doctors` · `/nhs-pension` · `/calculators` · `/locations` · `/privacy-policy` · `/terms` · `/cookie-policy`

`SpecialistWidget` (mounted in `PageShell.tsx:29`) emits `/calculators/${calcSlug}` at `:420` from **client state**, so it contributes no crawlable link on any route. Do not count it.

| Route | Floor | = 17 + | Note |
|---|---|---|---|
| `/calculators` | **27** | 10 tool cards | Directory not convertible to tabs |
| `/calculators/<slug>` x10 | **17** | 0 | 100% chrome. Zero body links exist today |
| `/services` | **37** | 5 blog + 5 locations + 10 tools | Highest in the slice; §B.2 protects it |
| `/locations` | **22** | 5 city cards | **Em-dash 1, at `:11` (meta description)** |
| `/locations/<city>` x5 | **24** | 3 blog + 4 siblings | Same 3 posts on all five (M-C8) |
| `/for-gps` | **21** | 1 calc + 3 guides | At floor after tabs; literal href mandatory |
| `/for-consultants` | **22** | 2 calc + 3 guides | **Fails by 1 without two literal hrefs** |
| `/for-locum-doctors` | **21** | 1 calc + 3 guides | |
| `/for-junior-doctors` | **21** | 1 calc + 3 guides | |
| `/nhs-pension` | **26** | 9 body links | The flagship pillar |
| `/medical-guides` | **26** | 6 guides + 3 calc cards | **Fails by 2 without three literal hrefs** |
| `/medical-guides/nhs-pension-annual-allowance` | **27** | 7 posts + 3 guides | |
| `/medical-guides/gp-partnership-accounts` | **24** | 4 posts + 3 guides | |
| `/medical-guides/locum-limited-company-vs-umbrella` | **24** | 4 posts + 3 guides | |
| `/medical-guides/medical-expenses-tax-treatment` | **24** | 4 posts + 3 guides | |
| `/medical-guides/consultant-private-practice-tax` | **23** | 3 posts + 3 guides | |
| `/medical-guides/ir35-for-locums` | **22** | 2 posts + 3 guides | Thinnest guide |
| `/free-practice-health-check` | **20** | 3 guide links | |
| `/embed`, `/embed/<slug>` x10 | **n/a** | | noindex, not in the sitemap, correctly no floor |

**What is wrong with this table, stated plainly: every number in it is counted from source, not measured on a rendered page, because the brief forbids running a build or a dev server.** It is therefore a *planning* floor and not a *safety net*. Two specific ways it can be wrong: a conditional render I read as unconditional, and any link the shared header/footer emits that is not in `niche.config.json`. **Phase 0 must produce `docs/medical/_port/link_baseline.json` against the deployed production SHA before any of this slice's link-losing edits ship.** Until that exists, no route in this slice may lose an anchor.

---

## F. OWNER GATES (M-C0 ... M-C12), most dangerous first

| # | Gate |
|---|---|
| **M-C0** | **LIVE DEFECT, and it outranks everything because this slice multiplies it by 10.** `calc_result_gate`: 6 form starts, 6 `form_error`, **0 submits** (2026-08-23 to 2026-09-10). Cause diagnosed at `ResultGateModal.tsx:133-134`, which sets `messageMinLength={40}` / `messageMinWords={8}` against estate defaults of 20/4 (`capture-steps.ts:16-17`) - the only call site on the site that raises the floor. Rejection is at `capture-steps.ts:62-67`, before the contact step, so a submit is impossible. **Not fixed here per instruction.** Decide before the gate mounts on 10 more calculators. |
| **M-C1** | **HIGHEST RISK.** Eight strings on seven files promise "no email gate" / "no sign-up" / "no email address required", including a homepage section HEADLINE (`page.tsx:179`) and an indexed meta description (`calculators/page.tsx:18`). A result gate makes all eight false. Change the copy everywhere in one commit, or the gate does not ship. Full list in §0/F1. |
| **M-C2** | Warning ramp sign-off. Owner decision 1 moves warning / duty / deadline semantics off copper onto a non-brand ramp that is not amber and not orange. **Until a ramp is named, nothing in this slice may colour a duty, a deadline or a penalty** - which blocks every `headline.tone`/`verdict.tone` in the 10 configs, the NHS-pension deadline copy, and the taper/charge figures on the `/for-*` stats strips. Slice 1 may own the token file; slice 2 cannot start colour work without it. |
| **M-C3** | Capture-surface scope (§4.6.6). This slice adds **nine `LeadCTAPanel` mounts** on routes with no on-page form today, plus a skippable modal on 11 calculator surfaces. That is the funnel change, and it needs the owner's explicit list sign-off, not an inference from "port the design". |
| **M-C3a** | Deleting `gateModalShownThisSession` (`PremiumCalculator.tsx:43`) and replacing it with per-calculator `sessionStorage` keys **re-gates the premium fleet**: a reader meeting three premium calculators now sees three gates instead of one. It is the correct semantics (§A.4) and the bug fix, but it is a measurable funnel change on the site's busiest interaction (13 reveals / 11 skips in 18 days). Owner call, not a silent side effect of the port. |
| **M-C4** | `ResourceGate` comes off the calculator pages (one form per page). It is a live email-capture surface with its own conversion history. Removing it is a funnel decision, not a layout decision. Note the `/resources/<topic>` link at `CalculatorPageResources.tsx:63-74` must survive - it is that guide's only crawlable inbound link. |
| **M-C5** | Turnaround promises in copy this slice touches: `CalcResultCta.tsx:21` and `ResultGateModal.tsx:130` ("within one working day"), `service-tiers.ts:30` ("Responds within one working day") and `:74` (a "1 day / Response time" STAT rendered under the `/services` h1). Removing them changes conversion copy on every capture surface; leaving them republishes a promise in a bigger typeface. |
| **M-C6** | **9 of 10 configs carry no `workedExamples`**; only `gp-partner-drawings-planner.ts:213` does. Nine content commissions, or the GEO field stays absent on nine calculator pages. |
| **M-C7** | `/embed` mounts 10 live iframes at once (`embed/page.tsx:53-62`). Lazy-load or go snippet-only. |
| **M-C8** | `/locations/[slug]:157` `getAllPosts().slice(0,3)` puts **the same three blog posts on all five city pages** under a heading that implies local relevance. Filter (and accept the section may render empty), or relabel and pick a topical fallback. Five competing local pages sharing a "related articles" block is a duplication signal. |
| **M-C9** | `/locations/[slug]` FAQs are net-new content x5, and five city pages competing in local search may not share the first 60 characters of any answer. |
| **M-C10** | The four `/for-*` stats strips publish 16 values, statutory ones included. §0.3: every published number must be re-derivable from `docs/medical/house_positions.md` or it does not publish. Re-derive all 16 before they move into `StatsCounter`, and add `ExampleFigureNote` (the StatsCounter exemption covers our own proof claims only). |
| **M-C11** | `redirectOnSuccess` flips `false` -> `true` on the four `/for-*` pages (`AudienceStageLayout.tsx:193`). Measurable funnel change on four routes: `false` currently costs the booking-picker step. |
| **M-C12** | `/medical-guides` and `/medical-guides/[slug]` x6 emit **no page-level structured data at all** (no Article, no FAQPage, no CollectionPage) on seven named pillar routes. Not design work; needs an owner call on whether it ships inside the port or as a separate fix. |

**Standing verifications, not gates:** re-verify the rendered ground of every `LeadForm` before and after it moves (D.1 invisible-label invariant; in scope: `AudienceStageLayout:193` and the nine net-new panels) · **`leadConsentText` is a carve-out and this slice does not touch it** (T19, and memory `consent_wording_conversion_incident`: a change to it cut mini-form leads from ~10/wk to 3.9/wk) · the em-dash at `locations/page.tsx:11` and `free-practice-health-check:138` are source fixes, never budget raises · re-run the full crawl after every content change, not once.

---

## G. EXECUTION ORDER FOR THE SLICE (retirements last)

Serial where a build is involved; parallel only on disjoint file sets.

1. **BLOCKED UNTIL M-C0, M-C1 AND M-C2 RESOLVE.** Nothing below starts. M-C0 is a live defect on the component step 4 extends; M-C2 also blocks colour work in slices 1 and 3. Raise all three in one turn.
2. **Phase 0 dependency:** `docs/medical/_port/link_baseline.json` against the deployed production SHA. §E's floors are source-derived and are not a safety net. No link-losing edit ships before this exists.
3. **`CalculatorTabs` + the guard test.** Build the component and `src/tests/calculator-tabs-crawl-path.test.ts` **first, with both exemption lists empty**, so every subsequent page edit is checked by a guard that already exists. The guard failing on a page you have not converted yet is correct behaviour.
4. **Extract `ResultGate` from `PremiumCalculator.tsx:653-676`, add `resultGateStorage.ts`, port `HeldResult`, refactor `PremiumCalculator` onto the extraction, and wire `CalculatorClient.tsx`** - one commit, because the storage change and the premium refactor are the same fix (§A.4). `ResultGateModal` is reused untouched. Delete `gateModalShownThisSession`. Run §A.6's four greps, the four-surface DOM check, the cross-tier reveal test, and `premium-tools.test.ts` before moving on.
5. **`/calculators/[slug]` + `/calculators` index.** The template that serves ten pages, then its index. Both are 100% chrome at the floor, so this is the lowest-risk pair to prove the new anatomy on.
6. **`/embed` lazy-load** (M-C7) - one line, rides here.
7. **`/for-*` via `AudienceStageLayout`.** One file, four routes, and the tightest link-floor edge in the slice. The literal hrefs go in the four `page.tsx` data files in the same commit as the tabs conversion, not after it.
8. **`/nhs-pension`.** Ten body clamps, the FAQ, the closing ask. The calculator line at `:369` is not edited.
9. **`/medical-guides` + `/medical-guides/[slug]`.** Three literal hrefs on the index (§B.1). Schema is M-C12 and may be deferred out of the port, but the templates are open here and reopening them later is the more expensive path.
10. **`/services`.** The heaviest single page in the slice and the one with the most rules colliding (§B.2). Do it after the tabs component has shipped on four easier routes.
11. **`/locations` + `/locations/[slug]`.** Shared service-line constant lands here; the Americanism sweep runs by RULE (`-ize`/`-ization` pattern list), not by searching one word.
12. **`/free-practice-health-check`.** The wizard's capture logic is not touched.
13. **RETIREMENTS, last, in one commit** once nothing imports them: delete `CalcResultCta.tsx` · delete `CTASection.tsx` · delete `src/components/ui/Breadcrumb.tsx` · drop `contentNarrow` / `sectionYLoose` from `layout-utils.ts` · remove `card-premium` / `card-flat` from `globals.css` · remove `--medical-teal` if slices 1 and 3 have also cleared it. **Verify by grep that each has zero importers before deleting, in this repo where a same-named file was once deleted on a false reading of its role (§4.6.2).**
14. Re-run the full crawl, diff against the Phase-0 baseline, and report the delta per route before tagging `port-medical-phase4`.

---

## H. FALSE PREMISES IN THE BRIEF

1. **"B. SERVICES: `app/services/*`"** implies a directory of routes. There is **one file**, `src/app/services/page.tsx` (302 lines). No `/services/[slug]`, no `data.ts`, no sub-pages. The six "service areas" are an inline `sections` array (`:44-75`). Solicitors' five-sub-page section has no Medical counterpart, and neither does its sitemap defect - `sitemap.ts` covers every route in this slice.
2. **"`role="img"` on a chart collapses every value to a screen reader (T16). Check `PremiumBarChart.tsx`."** Half true, and the brief's own hedge is the correct reading. `role="img"` is at `:101`, but `:94` already sets `aria-hidden="true"` on the wrapper, so the subtree is removed entirely rather than collapsed. The real defect is that the series values are text nowhere reachable. Rewritten in §D.
3. **"Port Property's `components/calculators/{ResultGate,ResultGateModal,resultGateStorage,HeldResult}.tsx`."** **Medical already has a working result gate** and it is the busiest interaction on the site (F1b): `ResultGateModal.tsx` complete and instrumented, mounted at `PremiumCalculator.tsx:676`, 13 reveals and 11 skips in 18 days. The work is EXTENSION of Medical's own gate from 8 premium calculators to all 18, not a port. Exactly one Property file earns its place (`HeldResult`); the modal is reused as-is and is better than Property's on `topicKey`. §A.3 is the comparison, §A.5 the file-by-file verdict. *(Corrected by the manager mid-task; recorded here because the same assumption will be made on site 4.)*
4. **"Check Medical's premium calculators for the same shape [two module-scope `gateModalShownThisSession` globals]."** Medical has **one**, at `PremiumCalculator.tsx:43`. The solicitors second copy lived in a bespoke calculator component; **Medical has no bespoke calculator component and no bespoke calculator route at all**. But the brief's *worry* is understated, not overstated: Medical's single flag is not a persistence key at all, it is one in-memory boolean for the whole fleet, so the "unlock one, unlock all" bug is **already live on 8 calculators today** and this slice would take it to 18. §A.4.
5. **"the 8 premium calculators"** - implied as calculator-page surfaces. They are **blog-only**. `PremiumUpgrade`'s only external importer is `BlogPostRenderer.tsx:18`, mounting it twice, both `placement="blog"`, and `PremiumCalculator.tsx:499` gates exactly that placement. **There is no ungated `placement="calculator"` premium surface on this site.** Solicitors' S5 has no Medical counterpart.
6. **"A calculator existing TWICE (a registry config and a bespoke route) was a live breach on both prior sites. Check Medical."** Checked; **not present**. No static route under `app/calculators/`, no `app/tools/`, and no component imports `lib/tools/compute/*` outside the premium configs. `/nhs-pension:369` renders `CalculatorClient` by slug, which is the sanctioned single-copy shape.
7. **"Animated or derived numbers must SSR their TRUE value (T15)."** No animated or derived numbers exist in this slice. The shared `StatsBar` has no hooks; the only `animate-*` classes in the codebase are skeleton pulses (`PremiumUpgrade.tsx:42-53`) and a widget ping. T15 is clean and needs no work.
8. **"FAQ arrays must feed the rendered FAQ and the JSON-LD from ONE binding, not two `.map()` calls (T17)."** **Zero instances of the defect.** Every FAQ in scope already binds one array to both: `calculators/[slug]` (`tool.faqs`, `:61` and `:155`), `/services` (`SERVICES_FAQS`, `:112` and `:266`), `/nhs-pension` (`faqs`, `:181` and `:485`), `/for-*` (`data`, `:32` and `:207`), `/free-practice-health-check` (`FAQS`, `:112` and `:195`). Two `.map()` calls over the SAME constant is not T17; T17 is two divergent arrays. **The real FAQ-adjacent defect is different and bigger:** seven `/medical-guides` routes emit no structured data whatsoever (M-C12).
9. **"Tools with no `workedExamples` and no `related[]` were commissionable gaps on both prior sites. Count them for Medical."** Counted, and they do not overlap the way the phrasing implies: **9 of 10 lack `workedExamples`; 4 of 10 lack `related[]`; and the intersection - tools with neither - is 4** (`private-practice-incorporation`, `locum-tax-calculator`, `nhs-pension-annual-allowance`, `doctor-expenses-tax-relief`). Separately, unlike solicitors, **every `related` href resolves to a live slug**; there are no dead links to fix before rendering the section.
10. **"The kit's `tools/components/Calculator.tsx` already carries the `resultWrapper` prop (identity default)... verify that yourself and cite the line."** **Correct.** `packages/web-shared/tools/components/Calculator.tsx:42` `resultWrapper = (node) => node`, typed `:69`, applied `:122` to the result column only. No shared-package edit is required for this slice, which removes the manager-direct carve-out from the critical path.
11. **"C. LOCATIONS: `app/locations/[slug]/page.tsx` (293 lines vs Property's 1006)."** Both counts confirmed. Worth stating what the gap is *made of*, because it is not 700 lines of design: Property's file carries per-city FAQs, a service-line grid, an areas parser and a `RelatedArticles` block that Medical's does not. The port closes anatomy, not line count.
12. **Implied by the memory index, not by this brief, but it would have cost a pass:** the T6 "pound sign stored as a unicode escape" trap is a **Property** trait. `Medical/niche.config.json` stores real UTF-8 `£` (4 occurrences) and a real em-dash (1), with **zero** `\u` escapes - verified by byte count. A literal grep works on Medical. Do not carry the workaround across and do not report a clean file on the strength of it.
