# pharmacies design port, phases 2 to 6: build plan and package list

Read-only planning pass, 2026-10-07. Site `pharmacies/web`, brand "Pharmacy Tax", brand hex `#0f3a4a`, Plus Jakarta Sans, storage prefix **`pfp`** (P0-E §0.1 — never `phfp`). Reference `Property/web`. Worked examples: `docs/hospitality/_port/PHASE2-6_PACKAGES.md` (the shape this file copies) and `docs/startups-tech/_port/PHASE2-6_PACKAGES.md`. Shared kit `packages/web-shared/design/`, `.../support/`, `.../tools/`, `.../leads/`.

**ONE WAVE, SIX BUILDER PACKAGES (W2..W7), THEN V1 → R2+R3 → M1 → R4.** Phase 1 was in flight during this pass: receipts `P1A_RECEIPT.md` through `P1F_RECEIPT.md` plus `P1F2_RINGFIX_RECEIPT.md` all exist untracked, so the six builders have reported, R1 may not have run, and nothing is committed. **Read those receipts, and re-derive against the working tree — do not take this plan's phase-1 statements on trust.** P1-A/B/C/D/E/F were editing `globals.css`, `layout.tsx`, `components/ui/layout-utils.ts`, `components/layout/*` and swapping `neutral-*` to `slate-*` across `src`. Every path and count below was re-derived from source on the working tree on 2026-10-07. **Where a phase-0 or phase-1 document disagrees with the source, the source wins** and the disagreement is in section E.

This site starts from **zero `web-shared/design` imports**. Every kit mount in phases 2-6 is a FIRST adoption on this site, which is why there is no separate uplift round inside this wave: the uplift is depth on top (`port-pharmacies-uplift`), and gate row 2 moves from 0 here.

---

## THE LOCKED BLOCK — paste verbatim into every builder brief

1. **EXISTING WORDING STAYS (owner ruling 2026-09-28).** Builders **restructure and restyle; they do not rewrite prose**. Every kit component is fed the sentences the page already publishes. If a kit component cannot be fed without authoring a sentence, **DECLINE it and name the sentence you would have had to write.** Never invent a quote, a figure, a client or a statistic.
2. **ADOPT over DECLINE (playbook §9.1 is the gate).** A decline needs a reason a reviewer can TEST, written **at the call site, naming the kit FILE PATH and the line**. "It did not feel right" is not a reason. **A stale reason is worse than no reason** (T-H6): startups-tech shipped four and R5 caught them. Two of the hospitality-era declines are already stale — see §C.
3. **New labels are config strings.** Any genuinely new label is requested from the MANAGER as a `pharmacies/niche.config.json` key with exact key and value. Builders READ the config, never write it.
4. **Never change a designer-set colour.** `#0f3a4a` is the brand. P1-A pins the ramp; the brand hex sits on a specific step (P1-A §A1 — read its receipt, do not assume 600). Use ramp utilities, never hex.
5. **No hex outside `globals.css`.** Survivors permitted at wave close: `PharmaciesBackdrop.tsx` (P1-E's one reasoned literal), `PageShell.tsx`, `api/og/route.tsx`. Every other survivor needs a written reason AT the line. Counts to clear: **W3 22, W5 46, W6 77, W2 0, W4 0** (re-derived `grep -rhoE '#[0-9a-fA-F]{3,8}' --include=*.tsx`).
6. **`neutral-*` is already 0 in every package's owned files** (re-derived: 0 in all five page sets on the working tree — P1-D landed). **Do not re-run the swap. If you find a `neutral-*` hit, REPORT it; it means P1-D was reverted.** The one live exception is the dead `prose-neutral` class on `blog/[category]/[slug]/page.tsx:124` (P0-A: defined nowhere). W2 owns deleting it.
7. **`FaqSection alwaysRenderAnswers` on every page that emits FAQPage JSON-LD.** Add `html` wherever the answer carries authored markup — on this site `service.faqs` / `hub.faqs` answers ARE authored HTML (`services/[slug]/page.tsx:102` renders them through `dangerouslySetInnerHTML`).
8. **`alwaysRenderAnswers` + JS OFF hides every answer** (`accordion.tsx` sets `data-[state=closed]:hidden`; Radix SSRs closed). The fix is **one line in the `<noscript>` block in `layout.tsx`, which is a MANAGER edit** (K4, §C). No builder touches it. V1 row V30 is the proof.
9. **`LeadCTAPanel`'s default `eyebrow` is `"Free consultation"` and its default `formTitle` is `"Book your free consultation"`** (`LeadCTAPanel.tsx:18,27`). This site publishes neither. **Every mount passes `eyebrow=""` and `formTitle=""`** unless the page already publishes that exact heading (the homepage CTA band has its own `<h3>` at `page.tsx:845` — use that string).
10. **`WhatToExpectCard`'s default `items` publish a FEE LINE** (`"Fixed fee quote if you decide to proceed"`, `WhatToExpectCard.tsx:22-27`). **Always pass `items` explicitly from the page's own published copy.** Removing a prop does not remove its default.
11. **`TestimonialsSection` must be passed `showRating={false}`** (`:72`). The five-star row is a CLAIM and this site publishes no rating. **Do not pass `initials`**: deriving them from the attribution would invent an identity. The composite disclaimer at `page.tsx:740-743` stays byte-identical.
12. **`leadConsentText` in `src/config/site.ts` is FROZEN (T19).** It is byte-identical to Property's (P0-B #18). Do not touch it, do not re-word it, do not pass a different consent string to any form. A change to it cut mini-form leads from ~10/wk to 3.9/wk on another site.
13. **Exactly ONE form under each calculator result. No gate, no PDF.** The paid-PDF gate and `api/calc` are Property-only by ruling. `/calculators/[slug]/page.tsx:102` already carries the comment recording that the second duplicate capture was deleted — keep it at one.
14. **Chart values are TEXT NODES. No `role="img"`** (T16). Both research pages' charts must leave every figure readable as text; a `role="img"` wrapper hides the numbers from a screen reader and from an LLM scrape.
15. **The 12-post cap: 22 posts.** `BlogListWithSearch.tsx:43` hardcodes `postsPerPage = 12` and **slices** at `:91`. `/blog`'s link floor is **37**. `HubArticleList.tsx` does NOT slice (its docstring `:42-55`; off-page cards carry `hidden`). **Decision: DECLINE `BlogListWithSearch`, ADOPT `HubArticleList`.** The decline is written at the call site naming `packages/web-shared/design/blog/BlogListWithSearch.tsx:43,91`. Same cap is live on six sibling sites (memory `kit_blog_list_12_post_cap`).
16. **No em-dashes** in user-facing copy. Baseline `0` across 55 routes and 62 pages. Keep 0.
17. **No `<main>`, `<header>`, `<footer>` or skip link in any package's files.** `PageShell` owns all four. `grep -rn '<main\|<header\|<footer' <owned files>` = 0. Nested `<main>` was CLOSED by phase 0 (P1 §0: `grep -rn "<main" src` = 1 hit, in `PageShell`). **Do not re-sweep it; if you find one, report it.**
18. **The `/embed/[slug]` surface stays chrome-free and form-free and capture-free.** Already bare (P1 §0, verified by curl). No sticky bar, no widget, no modal, no `LeadCTAPanel`.
19. **Every builder greps its own owned files for, and reports zero of:** bare `outline-none` with no compensating ring on the same element; `data-cta` on a wrapper `<div>` rather than on the control; `@layer components` rules that lose to a utility; any UNLAYERED rule.
20. **The link floor per route from `sweep_baseline.json` never drops.** Each package's floors are listed in its section. Count unique `href="/..."` in the SERVER HTML and state how you derived it. Report the delta. **Never pad a page to hit a number.**
21. **Report every defect you can SEE but cannot REACH, with `file:line`.** That list is M1's input. A defect you saw and did not write down is the most expensive defect in the port.
22. **Correct the brief if its premise is false (T11).** Verify every path and count against source before using it. Three of the false premises in §E were found by builders on previous ports.
23. **Do NOT run `next build` or `next dev`. The manager builds, serially (T1).**
24. **Do NOT run any git write command. Read-only git from the monorepo ROOT only (T3).**
25. **Do NOT launch subagents (T39).**

---

## A. REALITY CHECK PER SURFACE — do not invent work, do not re-do a NONE row

### A0. What phases 0 and 1 already gave every surface

| thing | state | evidence | consequence for 2-6 |
|---|---|---|---|
| `@theme primary-50..950` ramp | P1-A declares it from `#0f3a4a` | `PHASE1_PACKAGES.md` §A1 | every `primary-*` utility compiles. Use ramp utilities, never hex. **Read P1-A's receipt for which step the brand hex sits on.** |
| `--calc-result-accent` | `#88cde7`, 10.14 on slate-900 | `globals.css:22` | do not touch, do not repoint, do not "fix" kit calculator headline contrast |
| focus ring / `.ground-dark` | P1-A declares `--focus-ring`, `--kit-focus-ring`, `.ground-dark` | P1-A §A4 | **any section a package paints DARK carries `.ground-dark` and the package MEASURES it.** This is the single most-repeated review finding on this programme. |
| motion layer | `globals-standard.css` imported, glow channels declared | P1-A §A6, §A7 | `ScrollGlowGroup`, `DrawnTickList`, `NumberedReasons`, `Eyebrow` rule all animate |
| `layout-utils.ts` | P1-B re-exports the kit; `focusRing`, `btnPrimary`, `btnSecondary`, `btnOnDark` local with written declines | P1-B | **import buttons and containers from `@/components/ui/layout-utils`, never from the kit directly, never hand-rolled** |
| kit chrome + skip link + one `<main>` + `/embed` bypass | P1-C, via `PageShell` | P1-C §C1 | locked rule 17 |
| `PharmaciesBackdrop` | P1-E builds it | P1-E | **mount it; never edit it.** Host contract: parent section `relative overflow-hidden`, content `relative z-10`. Every package mounting it on a NEW ground reports that ground's ratio to the manager. |
| nested `<main>` | CLOSED by phase 0 | P1 §0 | NONE |
| Organization JSON-LD | already the shared builder with `parentOrganization`; duplicate `@id` and `priceRange` both fixed | P0-G proofs 1,2 | NONE. Do not add `priceRange` back. |
| `/embed/*` chrome | already bare | P0-G proof 3 | NONE |
| titles, canonicals, noindex | fixed | P0-G proofs 5,6,7 | NONE |
| 29 research chart-caption contrast failures | **FIXED** (0) | P0-G part 1 | NONE. `P1-G`'s "report unchanged" row is superseded. |
| 8 SVG `<rect>` NaN errors on `/research/pharmacy-openings-closures-index` | **FIXED** (0) | P0-G part 1 | NONE |
| 8 anchor `scroll-margin-top` gaps on one blog route | **FIXED** (0) | P0-G part 1 | **W2 must keep it 0 when it mounts a TOC.** The post template already carries `<style>{'.prose [id]{scroll-margin-top:6rem}'}</style>` at `:149`. |
| em-dashes | 0 across 55 routes / 62 pages | `sweep_baseline.json`, P0-B #14 | keep 0 |
| horizontal overflow at 390 | 0, all four widths | `browser_baseline.json`, P0-G | keep 0 |
| `data-cta` census | **3 triples, identical on all 55 routes**: `header_contact\|header\|null`, `sticky_cta\|sticky\|null`, `sticky_cta_close\|sticky\|null`. 165 total hits. **Zero `data-cta-goal` anywhere.** | `cta_baseline.json`, P0-G | **every `data-cta` a package adds is NEW live segmentation.** Put it on the CONTROL, never on a wrapper `<div>`. Name every id in the receipt. W7 must PRESERVE `sticky_cta` / `sticky_cta_close`. |
| `.prose` / `.section-label` | both live in the built CSS (35 + 1 selectors) | P0-B #16 | keep `class="prose"` on article bodies. `.section-label` has **10 call sites, all on `app/page.tsx`** — W5 owns converting them to `<Eyebrow>`. |
| `prose-neutral` | **DEAD class, defined nowhere** | P0-A rule H | W2 deletes it (`[slug]/page.tsx:124`) |
| `addHeadingIds` / `extractHeadings` | exported from `lib/markdown-utils.ts`, **ZERO consumers** | re-derived grep | W2's TOC is already half-built |
| `getRelatedPosts(slug, category, limit)` | exported from `lib/blog.ts:64`, **ZERO consumers** | re-derived grep | W2's related rail is already half-built |
| `prose [id] scroll-margin-top` | one deliberate inline `<style>` in the post template | `[slug]/page.tsx:149` | keep it; it is what makes the TOC anchors legal |

### A1. Blog, `/blog` (37 lines), `/blog/[category]` (57), `/blog/[category]/[slug]` (152)

Index: bare `div`, `<h1>`, flat category row, a `<ul>` of all 22 posts as plain `<Link>`s, read time via `calculateReadTime`. **No kit component, no breadcrumb, no form, no hero.** Floor **37**. Hub: same shape. Floors 17/17/13/13/12. Post: 3 JSON-LD blocks (`post.schema`, `HowTo` on 3 posts, `FAQPage` with tags stripped at `:96`), body via `dangerouslySetInnerHTML` split at the second `<h2>` with `InlineMiniLeadForm` injected (`:128`), a closing `LeadForm` (`:142`). **Missing:** breadcrumb UI, TOC, `ReadingProgress`, `RelatedArticles`, `BlogSidebarCta`, a kit `FaqSection`, a skip-to-form anchor, a closing `LeadCTAPanel`. **No `BlogPosting`/`Article` type anywhere** (P0-B per-family notes) — `lib/schema.ts` is a manager carve-out, so W2 REPORTS the exact diff and the manager applies it. **T12 disposition for the post body: DECLINE any kit prose component that would take `post.contentHtml` as a text child.** The body stays `dangerouslySetInnerHTML` inside `<article className="prose">`. Not a kit gap and never will be.

### A2. `/services` (61) + 8 `/services/[slug]` (124); `/for` (25) + 5 `/for/[slug]` (137)

Detail: `Service` + `BreadcrumbList` + `FAQPage` JSON-LD, a brand hero with a hand-rolled "All services" back-link (`:43`), a stats band from `service.stats`, challenge/howWeHelp grids whose bodies are authored HTML, a **hand-rolled `<details>` FAQ** (`:95-102`, answers already rendered as HTML), and a closing `LeadForm` (`:118`). `/for/[slug]` is the same shape with a `hub.noLeadForm` branch (`:46`, `:112`, `:127`). Hubs: `/services` HAS a `LeadForm`; **`/for` has NONE, `/blog` has none, `/calculators` has none** (re-derived). **No `SlimHero`, no kit `Breadcrumb`, no `Eyebrow`, no backdrop, no kit FAQ, no `WhatToExpectCard`/`ProcessTimeline`/`DrawnTickList`/`NumberedReasons`/`CoverageCards` anywhere.** 22 hex survivors across the four files. Floors: `/services` 18, all 8 details 10; `/for` 15, details 16/15/13/17/13. **Live defect for W3 to report, not silently fix:** `buildFaqJsonLd(service.faqs)` at `:87` is fed answers containing **raw HTML**, so `acceptedAnswer.text` carries markup (R3 G5 shape). The blog template strips tags at `:96`; services and for do not. The strip belongs in `lib/schema.ts` (manager carve-out) or in the call — **W3 reports the exact one-line diff and the manager decides.**

### A3. `/calculators` (43) + 3 `/calculators/[slug]` (110) + 3 `/embed/[slug]` (49)

Index: bare `div`, `<h1>`, three cards. **Zero forms, zero kit components.** Floor 13. Tool: `WebApplication` + `FAQPage` JSON-LD, a brand hero with a hand-rolled trail, `CalculatorClient` → **kit `tools/components/Calculator` (already adopted)** with `CalcResultCta` → local `MiniCapture` as `resultCta` (`:74`), an explainer, and a flat `<h3>`/`<p>` FAQ (`:93`). Floors 11 each. **Phase 4 here is narrower than a first adoption**: it is kit `Breadcrumb`, `FaqSection`, `NoticeCard`, `ExampleFigureNote`, `MobileToolSlot` and the index enquiry panel. **Open pre-wave defect W4 owns:** heading skip `h1 → h3` on all three tool pages plus `h3→h2→h3` inside the widget (P0-B #9). `/embed/*` has **no `h1` at all** (P0-B #10) — W4 decides whether an `h1` belongs on a bare embed and writes the reason either way.

### A4. Homepage — `app/page.tsx` (884 lines). The page the owner judges.

**15 bands, all hand-rolled. 46 hex literals. 10 `.section-label` divs, 0 `<Eyebrow>`.** Floor **25**.

| # | band | line | today | disposition |
|---|---|---|---|---|
| 1 | hero | 249-288 | `bg-[#0f3a4a]` + a bare `bg-gradient-to-br` div; a SQUARE `bg-white/10` chip with `ShieldCheck` + `siteConfig.name`; H1 at `lg:text-6xl`, no `text-balance`; two hand-rolled buttons; a trust line | mount `PharmaciesBackdrop`; chip becomes a `rounded-full` pill with an `animate-ping` live dot (**shape only** — the chip text is `siteConfig.name`, unchanged); H1 to `lg:text-7xl` + `text-balance`; buttons to `btnPrimary` / `btnOnDark`; `.ground-dark` on the section. **Markers 1, 3 and 4 land here.** |
| 2 | key figures bar | 292-311 | four `<a>` to gov.uk on `bg-[#1a5c6e]`, `font-mono` | **kit `StatsCounter`.** Marker 2. **All four `keyStats[].value` are non-numeric strings** ("Zero-rated", "~2 months", "18%", "0.5% vs 5%") — so **pass `value` on all four and `target: 0`**; `StatValue` returns `<span>{stat.value}</span>` when `value` is defined (`StatsCounter.tsx:62`). Nothing counts up on this band and that is correct. Pass `href` (`:25`) so the four gov.uk links survive. `tone="dark"`, `.ground-dark`, and **measure the figure colour against the band's ground.** |
| 3 | intro strip | 313-325 | one `<p>` on `bg-[#fafaf9]` | keep the paragraph verbatim. **DECLINE `ProblemStatement`** (hardcodes Property's landlord copy, `:33-56`, no copy props). |
| 4 | who we work with | 327-356 | `.section-label` + h2 + p + a segment hub grid | `<Eyebrow>`. **`CoverageCards` now HAS `href?` on `CoverageItem` (`:31`) and `html?` (`:65`) — the hospitality-era decline is STALE.** Re-derive: if each card's body is a plain string, ADOPT with `href` + `columns`. If a body is JSX, decline on that. |
| 5 | NHS income band | 358-444 | dark `bg-[#0f3a4a]` band | `.ground-dark`, `<Eyebrow onDark>`, `ScrollGlowGroup` on the card grid |
| 6 | VAT on mixed supplies | 446-520 | `.section-label` + two-column | `<Eyebrow>`; `DrawnTickList` if the band already renders a list of short claims (`tickClassName="text-primary-600"` on a light ground — the kit default `primary-400` measures ~1.9 on white, its own docstring `:38-47` says so) |
| 7 | buying and selling | 522-595 | `.section-label` + card grid | `<Eyebrow>`, `ScrollGlowGroup` |
| 8 | moments that bring people to us | 597-616 | `.section-label` + cards | `<Eyebrow>`. **`ProcessTimeline` takes `{n,title,body}[]` and `html?` (`:33`).** These are not a numbered sequence; inventing the `n` labels would author copy. **DECLINE and say so** — unless the band already publishes an ordered list, in which case adopt with `html`. |
| 9 | free tools + data asset | 618-683 | two `.section-label` columns, three calculator links, one research link | two `<Eyebrow>`; `data-cta` on the four links |
| 10 | why specialist matters | 685-731 | `.section-label` + the 6-row `whySpecialist` array | `<Eyebrow>`. **`ComparisonTable` requires `generalLabel`/`generalCaption`/`ourCaption`/`tradingName` and a general-vs-specialist row shape (`:32-47`); `whySpecialist` is `{area, detail}`, a single-column list.** Mapping it would author the "general" column. **DECLINE.** `NumberedReasons` (`:27`, `{title,body}` strings) IS a clean fit for this array — adopt it or say why not. |
| 11 | testimonials | 733-763 | three composite quotes + the disclaimer at `:740-743` | **kit `TestimonialsSection items={...} showRating={false} footnote={<the existing disclaimer>} backdrop={<PharmaciesBackdrop/>}`.** Map `quote` → `quote`, `attribution` → `who`. **No `initials`.** Disclaimer stays, owner-ruled. |
| 12 | FAQ | 765-797 | hand-rolled `<details>` over the `faqs` array that also feeds `buildFaqJsonLd` at `:245` | **kit `FaqSection alwaysRenderAnswers`** on the SAME binding (T17: one binding, two consumers). Answers are plain text — check before adding `html`. |
| 13 | CTA with LeadForm | 799-853 | hand-rolled two-column dark band, `LeadForm` on the right (`:848`), its own `<h3>` at `:845` | **kit `LeadCTAPanel`** fed these exact strings, `backdrop={<PharmaciesBackdrop/>}`, `eyebrow=""`, `formTitle=` the existing `<h3>` string, `form={<LeadForm submitLabel="Send enquiry" />}`. Tick rows map to `proofPoints` `{title, detail}` one-for-one. |
| 14 | guides and resources | 855-884 | `.section-label` + heading + two buttons, **no posts** | **a real three-post band** from `getAllPosts()`. Raises the floor by 3 — report the delta. |
| 15/16 | closing | — | band 14 is last | band 13's `LeadCTAPanel` is the closing panel. **Do not add a second.** If the band count lands at 16, the 16th is the blog band split from the resources links — state which you built. |

**`PromptMarquee`** (`:23-36`, `{tag, text, icon: LucideIcon, detail?}`): this homepage publishes no prompt/question set. Mounting it would author the prompts. **DECLINE at the call site naming `packages/web-shared/design/marketing/PromptMarquee.tsx:23`** — unless the FAQ questions are reused verbatim as prompts, which is a legitimate adoption. Decide and write it down.

### A5. `/about` (54 lines)

Brand hero, paragraphs, an entity line, a `LeadForm`. Floor **10**. Pairs with W5: the only other page in first-person firm voice.

### A6. Research — 2 index pages (404 + 317) + `PharmacyIndexCharts.tsx` (347)

Each has `Dataset` + `FAQPage` JSON-LD, a brand hero, anchored sections, charts, authored-HTML sections. **Neither has a form** (re-derived: no `LeadForm`/`MiniCapture` import on either). Floors 18 and 14. `/research` as a hub route **does not exist** on this site — navigation points straight at `/research/pharmacy-openings-closures-index` (P0-E §2). **Do not create a `/research` index**; that is a route addition, owner-visible, and it is an owner question in §G. Residual W6 owns: `research/pharmacy-openings-closures-index/page.tsx:69` still reads `value: r["47730"] ?? (r as unknown as {count?: number}).count ?? 0` — P0-G part 3 renamed the type field to `count`, so this is now a `tsc` error. **One line: `value: r.count ?? 0`.** It is the only `tsc` error on the tree and W6 must close it.

### A7. `/contact` (17), `/book` (59), `/complete` (129), `/thank-you` (120), legal (241/141/165)

`/contact` is the thinnest page on the site: a div, an `<h1>`, one sentence, a `LeadForm`. Floor 10. `/book` and `/complete` are noindex funnel pages. `/thank-you` carries `data-cta-placement="thank_you"` at `:109`. Legal: 77 hex literals across this whole package set. Floors: `/contact` 10, `/privacy-policy` 10, `/cookie-policy` 10, `/terms` 10. `/book`, `/complete`, `/thank-you` are not in the sweep baseline and have no floor.

### A8. The forms

`LeadForm.tsx` (444), `DetailsForm.tsx` (218), `BookingPicker.tsx` (173), `MiniCapture.tsx` (177). `neutral-*` 0 in all four. **Phase 1 routed the rings through `focusRing`** — if W6 opens these files and the ring swap is NOT there, phase 1 was reverted: **REPORT it and stop, do not re-apply.** `MiniCapture`'s prop signature (`formId`, `messagePrefix`, `heading`, `blurb`, `submitLabel`, `className`) is **FROZEN**: W2's `InlineMiniLeadForm` and W4's `CalcResultCta` both mount it. The `MiniCapture` / `BookingPicker` / `DetailsForm` fork-vs-shared question against kit `leads/capture-steps` is **unresolved from P0-E and deferred by P1-G to phase 6. W6 answers it in writing** — adopt, or decline naming the kit file.

### A9. Owner items, NOT ASSIGNED to any package

- The nine serious P0-A rows the owner ruled on at the phase-0 checkpoint. Rows 8 (composite testimonials) and 9 (cookie policy vs AdSense, retention months) are **LEFT AS IS**, per the 2026-09-29 estate ruling re-applied here.
- P0-A "not serious" list, in full, **no package touches any of it**: the fixed-fee promise only this site makes; the three claims about who we do and do not act for; the "Most popular" badge; the currency rendering in `public/llms.txt:47-56`; the two pharmacy counts in one post drawn from two datasets; the five income-tax constants with no rates-ledger entry. The dead `prose-neutral` class is the one item from that list a package DOES own (W2, locked rule 6).
- `niche.config.json`: stale `brand.logo_path`, the 175-char `description`, the 7-vs-5 blog category drift. Config file, manager-written, owner-visible.
- `app/admin/analytics/login/page.tsx:39`, the one genuine ring defeat. Out of the port's lease.

---

## B. THE SEVEN WORK PACKAGES

### OFF LIMITS TO EVERY PACKAGE, WITHOUT EXCEPTION — paste verbatim

```
packages/web-shared/**                                  manager carve-out, 19 sites, trap 12
Property/**                                             trap 12: nothing in this wave changes Property
pharmacies/web/src/app/globals.css                      P1-A: ramp, tokens, rings, .ground-dark, motion
pharmacies/web/src/components/ui/layout-utils.ts        P1-B: kit re-export + declines
pharmacies/web/src/components/layout/PageShell.tsx      P1-C: kit-chrome props
pharmacies/web/src/components/layout/SiteHeader.tsx     P1-C deletes it
pharmacies/web/src/components/layout/SiteFooter.tsx     P1-C deletes it
pharmacies/web/src/components/layout/PharmaciesBackdrop.tsx  P1-E: mount it, never edit it
pharmacies/web/src/components/analytics/ConsentToggle.tsx    P1-C creates it
pharmacies/web/src/app/error.tsx, not-found.tsx         P1-D
pharmacies/web/src/tests/focus-ring.test.ts             P1-F
pharmacies/web/src/lib/schema.ts                        SHARED by W2/W3/W5/W6: MANAGER-DIRECT
pharmacies/web/src/config/site.ts                       leadConsentText is FROZEN (T19)
pharmacies/web/src/config/niche-loader.ts               config plumbing
pharmacies/niche.config.json                            builders READ it; the MANAGER writes it
pharmacies/web/src/app/admin/**                         staff-only, not in the port's lease
pharmacies/web/src/app/api/**                           lead plumbing; READ only, never write
pharmacies/web/content/blog/**                          22 posts: no frontmatter, no body, no faqs,
                                                        no keyTakeaways edits. Prose is frozen.
pharmacies/web/src/lib/calculators/registry.ts          read-only: layout + footer read TOOLS
pharmacies/web/src/lib/calculators/tools/**             calculator MATHS + its 3 unit tests
pharmacies/web/src/lib/research/**                      research data loaders (except W6's one line)
docs/pharmacies/_port/*.json                            baselines: read them, never rewrite them
```

Plus, for each package, **every other package's owned files, listed verbatim in its brief.**

### SHARED ACCEPTANCE TESTS, IN EVERY BRIEF

```bash
cd pharmacies/web && npx tsc --noEmit        # clean. BASELINE: ONE error, research page:69 (W6 owns it)
cd pharmacies/web && npm test                # GREEN, report N/N verbatim (baseline: 5 test files, vitest run)
python scripts/check_dependency_closure.py   # OK (T24: a new import declares itself in the same edit)
grep -rn $'—\|–' <owned files>               # 0 em/en dashes in user-facing strings
grep -rnoE '#[0-9a-fA-F]{3,8}' <owned .tsx>  # 0 (or each survivor reasoned AT the line)
grep -rno 'neutral-[0-9]\{2,3\}' <owned>     # 0 (already 0 — a hit means P1-D was reverted)
grep -rn 'section-label' <owned files>       # 0
grep -rn '<main\|<header\|<footer' <owned>   # 0 (PageShell owns all three)
grep -rnoE 'focus-visible:outline-\[[^]]*\]' <owned>  # every value is exactly var(--focus-ring)
grep -rn 'outline-none' <owned files>        # 0, or a compensating ring on the SAME element
grep -rn 'data-cta' <owned files>            # every hit is on an <a> or <button>, never a <div>
```

Plus, for any file emitting JSON-LD: `json.loads` EVERY `ld+json` block on every URL the file serves (playbook §5). **A tag-presence check passes the `[object Object]` defect straight through.**

---

### W2 — BLOG SUBSYSTEM (phase 2) — Opus

Composes markup on 28 routes a prospect reads (1 index + 5 hubs + 22 posts).

**OWNS (all verified to exist):**
```
pharmacies/web/src/app/blog/page.tsx                        (37 lines)
pharmacies/web/src/app/blog/[category]/page.tsx             (57)
pharmacies/web/src/app/blog/[category]/[slug]/page.tsx      (152)
pharmacies/web/src/lib/blog.ts                              (142)
pharmacies/web/src/lib/markdown-utils.ts                    (32, 2 exports, 0 consumers)
pharmacies/web/src/components/blog/InlineMiniLeadForm.tsx    (23)
```

**Port FROM:** `startups-tech/web/src/app/blog/[category]/[slug]/page.tsx` (the whole post template incl. the `ReadingProgress`/`TableOfContents`/`RelatedArticles` trio and its ONE-clamp sticky `<aside>`); `generalist/web/src/components/blog/BlogPostRenderer.tsx` (the skip-to-form anchor and the `BlogSidebarCta` mount); `ecommerce/web/src/app/blog/[category]/page.tsx` (`Breadcrumb` + `Eyebrow` + `HubArticleList` on a category hub); `Property/web/src/app/blog/page.tsx` and `Property/web/src/components/blog/` (card recipe, rail ordering).

**ADOPT:**

| kit path | where | how it is fed |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | all 3 routes | `items` + `siteUrl={siteConfig.url}`, `tone="default"` on light grounds. **It also emits `BreadcrumbList` JSON-LD. Blog routes emit none today, so this is a pure gain — but prove `grep -c BreadcrumbList` on a served post URL = 1, not 2.** |
| `design/primitives/page-blocks.tsx` `Eyebrow` | all 3 | existing category/section labels only |
| `design/blog/HubArticleList.tsx` | index + 5 hubs | **does NOT slice** (`:42-55`). Feed the lightweight `HubArticle` projection (`slug`, `title`, `summary`, `readTime`, `date`, `categorySlug`) — **never `contentHtml`** (memory `vercel_blog_fallback_size_limit`). |
| `design/blog/TableOfContents.tsx` | post | `headings={extractHeadings(post.contentHtml)}`, `stickyMobile={false}` (desktop-sticky only, per the session plan). **Also run `addHeadingIds` over the body so the ids exist.** |
| `design/blog/ReadingProgress.tsx` | post | no props. **Check its `z-index` and `top` against `PageShell`'s sticky header before mounting; if it collides, REPORT, do not edit the kit.** |
| `design/blog/RelatedArticles.tsx` | post | `items` from `getRelatedPosts(post.slug, post.category, 3)`, `kind` via `kindFromHref` (`:51`) |
| `design/blog/BlogSidebarCta.tsx` | post | `copy={{heading: niche.blog.cta_heading, body: niche.blog.cta_body}}`, `buttonLabel={niche.blog.cta_button}`. **All three strings already exist in `pharmacies/niche.config.json` `blog` (P0-E §2). Nothing is authored.** Its `note` default publishes "Free, no obligation. The form is just below." — this site already publishes "no obligation" in `MiniCapture` and `/book`, so it introduces no new claim. Adopt as-is; log it. |
| `design/primitives/FaqSection.tsx` | post | `faqs={post.faqs}`, `alwaysRenderAnswers`, **`html`** (answers carry markup — `:96` strips tags for the JSON-LD, which proves it). ONE binding feeds both the markup and `buildFaqJsonLd`. |
| `design/marketing/LeadCTAPanel.tsx` | post (closing), index, 5 hubs | `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`, `form={<LeadForm redirectOnSuccess={false} />}`, `backdrop={<PharmaciesBackdrop/>}` on the post. Title/description on the post = the two sentences already at `:134-140`; on index and hubs = the same `niche.blog` triple. |

**DECLINE, at the call site, naming the kit FILE PATH and line:**
- `design/blog/BlogListWithSearch.tsx:43,91` — locked rule 15 (12-post cap, 22 posts, floor 37).
- `design/primitives/NumberedPagination.tsx` — only reachable through that slice.
- `design/blog/BlogCategoryHub.tsx:75-152` — requires `sections: HubSection[]`, `intro`, `description`, `essentialsTitle`, `cta: HubCta`, `libraryNote` — **copy blocks this site does not author.** Adopting it would author new copy. This is a measured decline, not a stylistic one.
- Anything taking `post.contentHtml` as a text child (memory `blog_page_rendering_html_in_frontmatter`).

**Per-site data W2 authors (none of it prose).** The **blog CTA copy map keyed on category slug**: per playbook §8 these are authored fresh for THIS site's categories, and this site's five live category slugs are `buying-a-pharmacy`, `nhs-contract-and-income`, `selling-a-pharmacy`, `locum-pharmacists`, `vat-and-retail-schemes`. **The map's VALUES must be the strings `niche.config.json` `blog.cta_heading` / `cta_body` / `cta_button` already publish** unless the manager supplies per-category keys. **Do not write five new headings. If per-category copy is wanted, request it from the manager as config keys and ship the single shared triple meanwhile.** The 2 config categories with zero posts (`Pharmacy Payroll`, `Business Structure and Incorporation`) are config drift, logged not fixed.

**Sidebar arrangement (T32 — read twice).** ONE clamp, on the element that is a direct child of the tall column. The `<aside>` carries `lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto` and `TableOfContents` carries NONE of its own. Two clamps gives a scroll box inside a shorter scroll box; no clamp gives a sticky element that sticks for 200px. **Reading the classes cannot tell the two broken arrangements from the correct one — state which of the three you built and why.**

**Link floors — never drop.** `/blog` **37**. Hubs: `nhs-contract-and-income` 17, `buying-a-pharmacy` 17, `locum-pharmacists` 13, `selling-a-pharmacy` 13, `vat-and-retail-schemes`
12. Posts (all 22, from `sweep_baseline.json`): `how-do-pharmacies-make-money` 23, `cost-of-buying-a-pharmacy-investment` 22, `pharmacy-financial-due-diligence` 22, `reading-a-pharmacy-sale-listing` 22, `pharmacy-closures-independents-vs-multiples` 19, `pharmacy-business-loans-finance-mechanics` 17, `first-time-pharmacy-buyer-finance` 17, `share-vs-asset-purchase-pharmacy` 17, `pharmacy-exit-planning-timeline` 16, `buying-a-pharmacy-uk-checklist` 16, `pharmacy-goodwill-what-its-worth` 16, `pharmacy-dispensing-workload-and-density` 15, `locum-pharmacist-expenses-self-assessment` 15, `vat-on-private-services-pharmacy-first` 15, `are-locum-pharmacists-self-employed` 14, `category-m-clawbacks-explained` 14, `do-pharmacies-pay-vat` 14, `drug-tariff-changes-explained` 14, `how-fp34-payment-cycle-works` 14, `locum-pharmacist-limited-company-vs-umbrella` 14, `pharmacy-first-income-accounting` 14, `preparing-a-pharmacy-for-sale` 14. **A breadcrumb, a TOC and a related rail should LIFT every post route. Report the delta per route.**

**Package acceptance:**
- `grep -c 'dangerouslySetInnerHTML' 'src/app/blog/[category]/[slug]/page.tsx'` — the body, the FAQ answers and every JSON-LD block still interpolate. **No authored HTML became a text child.**
- `grep -n 'BlogListWithSearch\|BlogCategoryHub\|NumberedPagination' src/app/blog` — every hit is a decline comment naming `packages/web-shared/design/...`; **zero are `from "` imports.**
- **Exactly ONE scroll container** in the article column; `TableOfContents` carries no clamp. State the arrangement.
- `extractHeadings`, `addHeadingIds`, `getRelatedPosts` now have call sites (all three had zero).
- `grep -c 'prose-neutral' src` = **0** (dead class deleted).
- **Exactly ONE `BreadcrumbList`** per post URL.
- Capture surfaces on a post: exactly 3 — `BlogSidebarCta` (an anchor, not a form), `InlineMiniLeadForm`, the closing `LeadCTAPanel` form. **`grep -c '<form'` on a served post = 2.**
- Every anchor id the TOC targets exists exactly once and resolves through the `scroll-margin-top` rule at `:149`. **`browser_check` must still report `anchorGaps: []`** (baseline 0 after P0-G).
- `curl -s :3111/blog | grep -oE 'href="/[^"]*"' | sort -u | wc -l` **>= 37**.
- All 28 blog URLs' `ld+json` blocks `json.loads` without raising.
- If W2 wants `BlogPosting` added, it REPORTS the exact `lib/schema.ts` diff. **It does not edit that file.** If the manager applies it, `BlogPosting.headline` must equal the visible `<h1>` byte-for-byte on all 22 posts (R3 G1: it drifted on 19 of 32 on startups-tech).

**Hard constraint:** `lib/blog.ts`'s EXPORTED SHAPE is frozen. W5 imports `getAllPosts`.

**OFF LIMITS:** the shared block, plus W3/W4/W5/W6/W7's owned files, plus `pharmacies/web/content/blog/*.md` (22 files, prose frozen).

**Receipt:** `docs/pharmacies/_port/W2_RECEIPT.md`. **Do NOT launch subagents.**

---

### W3 — TEMPLATES AND HUBS (phase 3) — Opus

Fifteen prospect-facing template routes plus their two data files.

**OWNS:**
```
pharmacies/web/src/app/services/page.tsx           (61 lines)
pharmacies/web/src/app/services/[slug]/page.tsx    (124)
pharmacies/web/src/app/for/page.tsx                (25)
pharmacies/web/src/app/for/[slug]/page.tsx         (137)
pharmacies/web/src/data/pharmacies-services.ts     (254, 8 records)
pharmacies/web/src/data/pharmacies-hubs.ts         (366, 5 records)
pharmacies/web/src/components/ui/Breadcrumb.tsx    (59) — retire in favour of the kit
pharmacies/web/src/config/service-tiers.ts
```

**Port FROM:** `startups-tech/web/src/app/services/[slug]/page.tsx` and `for/[slug]/page.tsx` post-uplift (the `SlimHero` + backdrop + `Breadcrumb tone` + kit-FAQ shape on a brand hero); `Property/web/src/app/for/[slug]/page.tsx` (`CardStack`, `FaqSection html`, `LeadCTAPanel`); `ecommerce/web/src/app/services/page.tsx` (`Eyebrow`, `Breadcrumb`, `LeadCTAPanel`, `ServiceTiers` on a hub).

**ADOPT:**

| kit path | where | how it is fed |
|---|---|---|
| `design/primitives/SlimHero.tsx` | all 4 heroes | **`sectionClassName?` NOW EXISTS at `:47`. The hospitality-era K1 decline ("ground is hardcoded `bg-slate-900`") is STALE — the gap SHIPPED.** So ADOPT: `sectionClassName` set to this site's brand ground, `eyebrow` (required, `:29`) = the page's own existing label ("Services" / the service title; "Who we help" / the sector title), `title` = the existing `<h1>` text, `children` = the existing standfirst `<p>` **as a node, including its `dangerouslySetInnerHTML` where the standfirst is authored HTML — do not flatten it**, `backdrop={<PharmaciesBackdrop/>}`, `.ground-dark`. **Open the file and verify `sectionClassName` splices into the section class string before relying on it.** If it does not, decline and record K1 as still open. |
| `design/primitives/Breadcrumb.tsx` | all 4 | `tone="onBrand"` on the brand heroes (`:39`, `:68`). Replaces the hand-rolled "All services" back-link at `services/[slug]:43` and its `/for` twin. **A breadcrumb gives Home + Services + current = 2 links where the back-link gave 1, so the floor RISES.** The detail pages already emit a `BreadcrumbList` at `:34`; `Breadcrumb` emits one too — **keep exactly one per URL and prove it.** This also closes P0-B serious #4 (JSON-LD with no visible trail on 21 pages) on 13 of those 21. |
| `design/primitives/page-blocks.tsx` `Eyebrow` | all 4 | existing labels only, `onDark` on brand heroes |
| `design/primitives/FaqSection.tsx` | `services/[slug]`, `for/[slug]` | **`alwaysRenderAnswers` + `html`**, on the SAME array `buildFaqJsonLd` is fed (T17). Replaces the hand-rolled `<details>` at `services/[slug]:94-102` and the `/for` twin. The answers ARE authored HTML — that is why `html` is required, not optional. |
| `design/marketing/LeadCTAPanel.tsx` | all 4 | `/services` and both detail templates already carry a `LeadForm` — feed its existing strings byte-identical, add `backdrop`. **`/for` (the hub) has NO form today: add it**, fed the same strings `/services` uses. `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`. **Respect `hub.noLeadForm`** (`for/[slug]:46,112,127`): a hub flagged `noLeadForm` keeps no form. |
| `design/marketing/ScrollGlowGroup.tsx` | the `howWeHelp` grids and the service/sector card grids | a wrapper; changes no copy. `as` + `delay` at `:23-24`. |
| `design/marketing/StatsCounter.tsx` | the stats bands on both detail templates | `{target, value?, prefix?, suffix?, label, href?}`. **Open each `stat.value` string in both data files first.** Anything non-numeric or compound goes through `value` (a literal); only a genuinely numeric one may count up. **T15: the SSR frame must carry the TRUE value** — `StatValue` uses `useState(target)` (`:47`), which satisfies it, but prove it with `curl | grep`. The band is dark: `.ground-dark` + `slate-*`. |
| `design/primitives/page-blocks.tsx` `CardStack` | the `challenges` / `howWeHelp` grids | **`html?` exists at `:115`.** The bodies ARE authored HTML with real anchors, which is exactly why they go through `dangerouslySetInnerHTML` today. **The "would print escaped markup" decline is STALE. Adopt with `html`, or decline for a reason you measured today.** |
| `design/marketing/CoverageCards.tsx` | `/services` and `/for` hub card grids | **`href?` exists on `CoverageItem` at `:31` and `html?` at `:65`. BOTH halves of the hospitality-era decline are STALE.** On these hubs the cards ARE the link floors (18 and 15), and `href` now preserves them. **ADOPT**, `columns`, `glow`, `tone`. If a body is JSX rather than a string, decline on that half only and say which card. |
| `design/marketing/DrawnTickList.tsx` | where a page already renders a list of short claims | `tickClassName="text-primary-600"` on light, `text-primary-400` on dark (docstring `:38-47`) |
| `design/marketing/WhatToExpectCard.tsx` | **only if** a page already publishes a matching list | **pass `items` explicitly (locked rule 10).** `howWeHelp` titles are the closest candidate. If feeding it would author a sentence, DECLINE and name the sentence. |
| `config/service-tiers.ts` + kit `ServiceTiers` | `/services` | check whether this site mounts it today. **Do not remove `featuredBadge` and expect the badge to go (T13).** The "Most popular" badge is on P0-A's not-serious list and is an OWNER item — do not remove it, do not add it where it is not already. |

**DECLINE, at the call site:**
- `design/marketing/ProcessTimeline.tsx:29` — neither data file publishes numbered staged steps; inventing the `n` labels would author copy. (`html` exists at `:33`, so the escaped-markup half of the old decline is stale — say so.)
- `design/marketing/ProblemStatement.tsx:33-56` — hardcodes Property's landlord copy and a "Book your free first call" button with no copy props.
- `design/marketing/ComparisonTable.tsx:32-47` — forces a general-vs-specialist row shape and a "Most recommended" pill the pages do not publish.

**The raw-HTML-in-FAQPage report (A2).** `grep -n 'answer:' src/data/*.ts | grep '<'` before and after. W3 does not edit `lib/schema.ts`. It writes the one-line diff (`.replace(/<[^>]+>/g, "")` on the `buildFaqJsonLd` argument, matching `blog/[category]/[slug]/page.tsx:96`) into its receipt and the manager applies it once, in one place, for both templates.

**Mechanical work:** 22 hex literals across the four page files → ramp utilities. `neutral-*` is already 0.

**Link floors:** `/services` **18**; all 8 `/services/*` **10**. `/for` **15**; `/for/pharmacy-owners` 16, `/for/buying-a-pharmacy` 15, `/for/selling-a-pharmacy` 13, `/for/pharmacy-groups` 17, `/for/locum-pharmacists` 13.

**Package acceptance:**
- `grep -rc '#0f3a4a\|#1a5c6e\|#071f28' src/app/services src/app/for` = **0**.
- Every FAQ answer string in the `FAQPage` JSON-LD is present in the SERVED HTML on all 13 detail URLs, **normalised to alphanumerics with entities decoded.** (Stripping `<strong>` inserts a space before a comma and produces false absences — that cost crypto four false positives.)
- `buildFaqJsonLd` is still fed the SAME array the markup maps. One binding.
- **8 service slugs and 5 hub slugs still generate.** `generateStaticParams` counts unchanged, and the EXPORTED SHAPE of both data files is **FROZEN** — the homepage, the footer and `llms-full.txt` read them.
- `LeadCTAPanel` call sites in this package after the wave: **4** (`/services`, `/services/[slug]`, `/for`, `/for/[slug]`). Every one passes `eyebrow=""`.
- `Service` + `BreadcrumbList` + `FAQPage` all parse on all 15 URLs; **exactly one `BreadcrumbList` per URL.**
- **These two templates are the same shape. Whatever you do to one, do to the other, and `diff` them at the end to prove it.**

**Receipt:** `docs/pharmacies/_port/W3_RECEIPT.md`. **Do NOT launch subagents.**

---

### W4 — CALCULATORS AND THE EMBED SURFACE (phase 4) — Opus

The highest-intent surfaces and a partner-facing embed.

**OWNS:**
```
pharmacies/web/src/app/calculators/page.tsx            (43 lines)
pharmacies/web/src/app/calculators/[slug]/page.tsx     (110)
pharmacies/web/src/app/embed/[slug]/page.tsx           (49)  NO CHROME, NO PANEL, NO CAPTURE
pharmacies/web/src/components/calculators/CalculatorClient.tsx (18)
pharmacies/web/src/components/calculators/CalcResultCta.tsx    (18)
pharmacies/web/src/lib/calculators/schema.ts
pharmacies/web/src/lib/calculators/site.ts
```

`registry.ts` and everything under `lib/calculators/tools/` are **READ-ONLY to W4**: `layout.tsx` and the footer read `TOOLS`, and the three tool files carry the maths plus their own unit tests. **`components/calculators/MiniCapture.tsx` is W6's. W4 MOUNTS it and must not change its props.**

**Port FROM:** `startups-tech/web/src/app/calculators/[slug]/page.tsx` post-uplift; `generalist/web/src/app/calculators/page.tsx` (`LeadCTAPanel` + `data-cta` on an index).

**ADOPT:**
- `design/primitives/Breadcrumb.tsx` with **`tone="onBrand"`** on the brand hero, replacing the hand-rolled trail. The tool pages emit **no `BreadcrumbList` today** (P0-B per-family notes), so this is a pure gain. `/calculators` gets one too.
- `design/primitives/page-blocks.tsx` `Eyebrow` — the tool hero's `tool.category` string is the existing candidate. **Do not author a new label; if there is nothing to put in an `Eyebrow`, do not mount one.**
- `design/primitives/FaqSection.tsx` with **`alwaysRenderAnswers`** on all three tools, replacing the flat `<h3>`/`<p>` block at `:93`. The page already emits `FAQPage` from the same `tool.faqs` binding — keep it ONE binding (T17). Answers are plain text; check before adding `html`. **Mounting it also closes part of the heading-skip defect** (P0-B #9) because the kit accordion emits consistent levels — verify, do not assume.
- `design/primitives/NoticeCard.tsx` — for the "these are estimates / check your own figures" sentence each tool already publishes. `tone="slate"`, `ground` set to the section it sits on. **Feed the page's existing sentence. If a tool has no such sentence, do not mount one there.**
- `design/primitives/ExampleFigureNote.tsx` — under the calculator result on each tool. **Read its docstring (`:1-21`) first: the owner's explicit decision is that the note goes on EVERY visual carrying figures, statutory ones included; the ONE place it is deliberately not used is `StatsCounter`.** Default `label` is `"Example figures displayed"` — that is the intended string, not a leak.
- `design/marketing/LeadCTAPanel.tsx` on **`/calculators` (the index), which has no form today**. `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`, `form={<LeadForm submitLabel="Send enquiry" />}`, `data-cta="calc_index_help"` on the control.
- `leads/MobileToolSlot.tsx` (kit) — the session plan names it. **Open it, read its props, and either mount it on the tool pages or decline naming the file and the reason.** Do not skip the row silently.
- kit `tools/components/Calculator` is **already adopted** via `CalculatorClient:74`. Keep it. `headingLevel` (`:82`) is the lever for the `h3→h2→h3` jump inside the widget — set it deliberately and state the value.

**Locked for this package:**
- **Exactly ONE form under each tool result. No gate, no PDF** (locked rule 13). `grep -c '<form'` on each served tool URL = **1**.
- `WebApplication` JSON-LD stays byte-identical (`lib/calculators/schema.ts`).
- **`/embed/[slug]`: no chrome, no form, no `LeadCTAPanel`, no backdrop, no sticky, no widget.** Already bare. The missing `h1` (P0-B #10) is W4's call: add one, or write the reason a bare partner embed should not carry an `h1`. Either way, state it.
- The three calculator factual defects in P0-A serious 1-4 (Class 2 NIC, SDLT on goodwill, ignored FP34 delay, uncited lending range) live in `lib/calculators/tools/**`, which is OFF LIMITS. **If they are not fixed when W4 opens the pages, REPORT it — they were phase-0 serious-tier items.**

**Link floors:** `/calculators` **13**; all three tools **11**. `/embed/*` has no floor.

**Package acceptance:** heading order on each tool URL is `h1 → h2 → h3` with no jump (baseline `h1 → h3` on all three); `grep -o '"@type":"WebApplication"' | wc -l` = 1 per tool; `curl /embed/<slug> | grep -c '<header\|<footer\|<nav\|data-cta="sticky_cta"\|<form'` = **0**; all 7 URLs' `ld+json` parse.

**Receipt:** `docs/pharmacies/_port/W4_RECEIPT.md`. **Do NOT launch subagents.**

---

### W5 — HOMEPAGE AND `/about` (phase 5) — Opus

**The homepage is the page the owner judges.** The four-marker row is this package's verdict.

**OWNS:**
```
pharmacies/web/src/app/page.tsx      (884 lines, 15 bands, 46 hex, 10 .section-label)
pharmacies/web/src/app/about/page.tsx (54 lines)
```

**The judge — the four-marker row, measured on the RENDERED HTML of `/`:** `animate-ping`, `StatsCounter`, `Backdrop`, `rounded-full`. Property **1/2/3/4**. generalist **1/2/3/4**. startups-tech post-uplift **1/3/3/4**. **pharmacies today 0/0/0/0.** W5 owns moving it.

**Port FROM:** `generalist/web/src/app/page.tsx` (band depth, the level the owner likes); `Property/web/src/app/page.tsx` (marker shapes); `hospitality/web/src/app/page.tsx` post-uplift (the closest 15-band equivalent).

**Band-by-band disposition: section A4 above, all 15 rows. Build it from that table.**

**Adopt list, with the props to set:** `StatsCounter` (band 2: `stats` with `value` on all four, `target: 0`, `href`, `tone="dark"`, `columns={4}`); `TestimonialsSection` (band 11: `items`, `showRating={false}`, `footnote`, `backdrop`, `headingId="testimonials-heading"` to preserve the existing `aria-labelledby`); `FaqSection alwaysRenderAnswers` (band 12, same binding as `buildFaqJsonLd` at `:245`); `LeadCTAPanel` (band 13, `eyebrow=""`, `formTitle` = the existing `<h3>` string, `proofPoints` from the existing tick rows, `backdrop`); `ScrollGlowGroup` (bands 5, 7, and any other card grid); `DrawnTickList` (band 6 if a claims list exists); `Eyebrow` (all 10 `.section-label` sites); `PharmaciesBackdrop` (hero, testimonials, CTA band — 3 mounts); `CoverageCards` with `href` (band 4, **stale decline, re-derive**); `NumberedReasons` (band 10).

**Declines required in writing, naming the file and line:** `ProblemStatement.tsx:33-56` (band 3), `ComparisonTable.tsx:32-47` (band 10), `ProcessTimeline.tsx:29` (band 8 unless an ordered list exists), `PromptMarquee.tsx:23` (no published prompt set — unless the FAQ questions are reused verbatim).

**`/about`:** `SlimHero` with `sectionClassName` on the brand ground, `Breadcrumb tone="onBrand"`, `Eyebrow`, `LeadCTAPanel` wrapping the existing `LeadForm`, `WhatToExpectCard` **with explicit `items` from the page's own copy** or a written decline.

**Link floors:** `/` **25** (expect it to RISE by ~3 with the blog band — report the delta); `/about` **10**.

**Package acceptance:**
- `perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' src/app/page.tsx | grep -o '<Eyebrow' | wc -l` **>= 10**, and the same for `section-label` = **0**. **The raw grep is wrong in both directions.**
- `curl -s :3111/ | grep -c 'animate-ping'` >= 1; `grep -c 'rounded-full'` >= 1; `StatsCounter` and `Backdrop` counted from **comment-stripped source imports** (they are component names and never appear in HTML). **State which you counted where.**
- The four `keyStats` values appear VERBATIM in the pre-hydration HTML: `curl -s :3111/ | grep -c 'Zero-rated'`, `'~2 months'`, `'18%'`, `'0.5% vs 5%'` — **>= 1 each** (T15).
- Contrast of the `StatsCounter` band's figures against the band's actual ground, composited through a 1x1 canvas: **>= 4.5.** Do not accept an unmeasured pair.
- `.ground-dark` present on **every** section this package paints dark (hero, band 5, band 13), and the focus ring measured on each.
- `grep -rnoE '#[0-9a-fA-F]{3,8}' src/app/page.tsx src/app/about/page.tsx` = **0** (was 46).
- `grep -c 'Rated 5 out of 5'` on the served `/` = **0**; no `initials` on any testimonial; the three quotes and the disclaimer byte-identical to `page.tsx:185-201` and `:740-743`.
- The homepage's `FAQPage` JSON-LD still parses and every `acceptedAnswer.text` is present in the HTML.

**Receipt:** `docs/pharmacies/_port/W5_RECEIPT.md`. **Do NOT launch subagents.**

---

### W6 — CONTACT, FUNNEL, LEGAL, RESEARCH AND FORMS (phase 6) — Opus

The conversion surface, the compliance pages, and 721 lines of published research data.

**OWNS:**
```
pharmacies/web/src/app/contact/page.tsx          (17 lines — the thinnest page on the site)
pharmacies/web/src/app/book/page.tsx             (59)
pharmacies/web/src/app/complete/page.tsx         (129)
pharmacies/web/src/app/thank-you/page.tsx        (120)
pharmacies/web/src/app/privacy-policy/page.tsx   (241)
pharmacies/web/src/app/cookie-policy/page.tsx    (141)
pharmacies/web/src/app/terms/page.tsx            (165)
pharmacies/web/src/app/research/pharmacy-openings-closures-index/page.tsx   (404)
pharmacies/web/src/app/research/pharmacy-density-and-workload-index/page.tsx (317)
pharmacies/web/src/components/research/PharmacyIndexCharts.tsx (347)
pharmacies/web/src/components/forms/LeadForm.tsx       (444)
pharmacies/web/src/components/forms/DetailsForm.tsx    (218)
pharmacies/web/src/components/forms/BookingPicker.tsx  (173)
pharmacies/web/src/components/calculators/MiniCapture.tsx (177)
pharmacies/web/src/lib/research/pharmacy-openings-closures-index.ts  (the one-line fix only)
```

**ADOPT:**
- `LeadCTAPanel` on **`/contact`** (wrapping the existing `LeadForm`) and on **both research pages, which have NO form today**. `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`. That is **+2 forms on the two highest-authority surfaces on the site.**
- `WhatToExpectCard` on `/contact` and `/book` — **`items` passed explicitly** from each page's own published copy (locked rule 10). If the page publishes no such list, DECLINE and name it.
- `Breadcrumb` + `Eyebrow` + `SlimHero` (with `sectionClassName`) on the research pages and the three legal pages. The legal pages already emit `BreadcrumbList` — **exactly one per URL.**
- `NoticeCard` for the research pages' methodology / caveat sentences they already publish.
- `FaqSection alwaysRenderAnswers` on both research pages (each emits `FAQPage` today).
- `MiniCapture`: resolve the fork-vs-shared question against kit `leads/capture-steps` **in writing** (deferred here by P1-G). Adopt, or decline naming the kit file.

**Locked for this package:**
- **`leadConsentText` FROZEN.** `git diff` on the four form files must show **zero** changes to any line matching `formId|data-cta|leadConsent|redirectOnSuccess|submitLabel|name=|enquiry_ref`.
- **`MiniCapture`'s prop signature is FROZEN** (W2 and W4 both mount it).
- **Charts: values as text nodes, no `role="img"`** (locked rule 14). `grep -c 'role="img"'` on `PharmacyIndexCharts.tsx` and both research pages = **0**. The 29 caption-contrast failures and the 8 SVG NaN errors are **already fixed** (P0-G) — keep them at 0, do not re-fix.
- **The one `tsc` error:** `research/pharmacy-openings-closures-index/page.tsx:69` → `value: r.count ?? 0`. W6 closes it. That is the whole of its lease on `lib/research/**`.
- **`/book`, `/complete` and `/thank-you` are noindex funnel pages with no floor.** `/thank-you`'s `data-cta-placement="thank_you"` at `:109` is preserved byte-identical. The Aswatax post-submit intro is deliberate and verified live estate-wide — **never pre-submit, never removed.**
- **Compliance copy vs the code that runs (T18): REPORT drift, change nothing.** The cookie-policy-vs-AdSense row and the 24-month retention row are owner-ruled LEFT AS IS. Do not reopen them.
- **Do not create a `/research` index route.** Owner question §G.
- 77 hex literals across this package set → ramp utilities. `neutral-*` already 0.

**Link floors:** `/contact` 10, `/privacy-policy` 10, `/cookie-policy` 10, `/terms` 10, `/research/pharmacy-openings-closures-index` **18**, `/research/pharmacy-density-and-workload-index` **14**.

**Package acceptance:** `grep -c '<form'` on each of the two research URLs = **1** each (was 0); `grep -o '"@type":"Dataset"'` = 1 each; `curl /thank-you | grep -c '<main'` and `grep -c '<h1'` = **1 and 1**; `npx tsc --noEmit` **clean, zero errors** (this package is what makes that true); `grep -rnoE '#[0-9a-fA-F]{3,8}'` over the owned set = 0 or reasoned at the line.

**Receipt:** `docs/pharmacies/_port/W6_RECEIPT.md`. **Do NOT launch subagents.**

---

### W7 — CAPTURE SURFACES (phase 6, owner decision 1) — Opus

All four surfaces mount here. This is the largest net-new package in the wave and the only one creating a whole subsystem. **Read the dependency warning at the end before you start.**

**OWNS:**
```
pharmacies/web/src/app/layout.tsx                        HANDED FROM P1-C (chrome region only)
pharmacies/web/src/components/intent/IntentProvider.tsx  NEW
pharmacies/web/src/components/intent/ReturningBar.tsx    NEW
pharmacies/web/src/components/intent/DeepScrollModal.tsx NEW
pharmacies/web/src/components/intent/NextStepOffer.tsx   NEW
pharmacies/web/src/lib/intent/deriveTopic.ts             NEW
pharmacies/web/src/lib/intent/engine.ts                  NEW
pharmacies/web/src/lib/intent/taxonomy.ts                NEW
pharmacies/web/src/lib/intent/journeyModel.ts            NEW
pharmacies/web/src/lib/intent/labels.ts                  NEW
pharmacies/web/src/lib/intent/widget-config.ts           NEW
pharmacies/web/src/lib/assistant/opener.ts               NEW
pharmacies/web/src/components/support/SupportProvider.tsx NEW
pharmacies/web/src/components/ui/StickyCTA.tsx           (64 lines, EXISTS — restyle, do not retire)
```

**Copy sources, exactly:**
- **The intent trio + `NextStepOffer` + `lib/intent/*`: `construction-cis/web/src/components/intent/*` and `construction-cis/web/src/lib/intent/*`** — CANONICAL per `CRO_PARITY_TEMPLATE.md:55`. Sizes: `DeepScrollModal.tsx` 143, `IntentProvider.tsx` 113, `ReturningBar.tsx` 76, `NextStepOffer.tsx` 49; `engine.ts` 213, `journeyModel.ts` 251, `taxonomy.ts` 184, `labels.ts` 82, `deriveTopic.ts` 24. **`HeroOffer.tsx` is NOT in scope.** Mount `IntentProvider` + `ReturningBar` + `DeepScrollModal` in `layout.tsx` exactly as `construction-cis/web/src/app/layout.tsx:103-107` does. `NextStepOffer` mounts on page templates, as cis does at `for/[slug]/page.tsx:249` and `BlogPostRenderer.tsx:375` — **on this site that means W3's and W2's files, which W7 does not own. So W7 BUILDS `NextStepOffer`, mounts it NOWHERE itself, and hands the two mount points to M1 with exact file:line.**
- **`StickyCTA` restyled from `generalist/web/src/components/ui/StickyCTA.tsx`** (197 lines): the impression guard (`shownRuleRef` fires `personalization_shown` exactly once per rule and only while the bar is painted), `z-50`, `data-cta="sticky_cta"` + `data-cta-placement="sticky"`. **Storage key `pfp_sticky_dismissed`** (generalist's is `hd_sticky_dismissed` at `:27`). **The baseline triples `sticky_cta|sticky|null` and `sticky_cta_close|sticky|null` are PRESERVED on all 55 routes** (`cta_baseline.json`). Generalist emits `data-cta-goal` conditionally at `:169`; this site has **zero `data-cta-goal` today** (P0-B #17) — adding one is a declared, deliberate change, named in the receipt, or left off. **Decide and state which.**
- **`SpecialistWidget` from the kit**, `@accounting-network/web-shared/support/SpecialistWidget`, mounted as `startups-tech/web/src/app/layout.tsx:12-13,123-140` does: behind a local `SupportProvider` (6-line client boundary, copy `startups-tech/web/src/components/support/SupportProvider.tsx` verbatim) that hands the kit's `support/IntentProvider` this site's `widgetConfig`. **The kit version is the shared implementation; construction-cis's is the pre-kit fork — use the kit.**

**NAME COLLISION — read this twice.** There are TWO `IntentProvider`s and they are different components: `@/components/intent/IntentProvider` (the page-level trio's, from construction-cis) and `@accounting-network/web-shared/support/IntentProvider` (the widget's, which takes a `config` prop). Both get mounted. **Never import one where the other is meant.** The session plan names a `config/support.ts`; the worked example puts the config at `lib/intent/widget-config.ts` — **follow the worked example and say so in the receipt.**

**`WidgetConfig` is fully required** (`packages/web-shared/support/types.ts:260-295`): `storagePrefix`, `formId`, `ctaId`, `leadSource`, `hiddenOnPaths`, `routeRules`, `getTopic`, `journey`, `openers`, `engine`, `ruleLabel`, `calculatorHrefPrefix`, `contactHref`, `privacyHref`, `submitLead`, `classes`, `copy`. Values for this site:
- `storagePrefix: "pfp"` — matches `AnalyticsProvider`'s `storagePrefix` in `layout.tsx`. **Never `phfp`** (P0-E §0.1): a new prefix orphans existing local-storage state.
- `formId: "specialist_widget"`, `ctaId: "specialist_widget"` — **byte-identical to Property and generalist, because the estate analytics views key on them.**
- `leadSource: niche.content_strategy.source_identifier` = `"pharmacies"` — the same value `LeadForm.tsx:148` already sends. **No rival source key.**
- `hiddenOnPaths: ["/embed", "/admin"]`.
- `submitLead` → `submitSiteLead` from `@/lib/leads/submit-client` (**exists on this site**).
- `classes` from `defaultWidgetClasses` plus this site's `focusRing` from `@/components/ui/layout-utils` (the kit's `outline-primary-*` literals are banned by P1-F's ring guard test — check that test's corpus before you write a class string).
- `openers` → `@/lib/assistant/opener` must be CREATED (shape: `startups-tech/web/src/lib/assistant/opener.ts`). **Its strings are visitor-facing copy. Feed it the site's existing published sentences where they exist and request anything genuinely new from the manager as config.**

**`taxonomy.ts` is authored from CONTENT truth, not the config's stale list** (`CRO_PARITY_TEMPLATE.md:56`). This site's real route families: 5 blog category slugs (`buying-a-pharmacy`, `nhs-contract-and-income`, `selling-a-pharmacy`, `locum-pharmacists`, `vat-and-retail-schemes`), 8 service slugs, 5 hub slugs, 3 calculator slugs, 2 research slugs. **`niche.config.json` `content_strategy.categories` lists 7 names, two with zero posts — do not use it.**

**Property's suppression rules, copied AS DATA (read-only ground truth, `Property/web/src/components/intent/*` and `lib/intent/*`):**
- **One offer per page-load session**, across topics — a module-level flag (`Property/.../DeepScrollModal.tsx:32`).
- **30-day per-topic suppress** in `localStorage`, key `pfp_deepscroll_<topic>` (Property's is `ptp_deepscroll_<topic>`, `:14-27`).
- **Session-dismissible bar**: `sessionStorage`, key `pfp_returning_bar_dismissed` (Property's is `ptp_returning_bar_dismissed`, `ReturningBar.tsx:13`).
- Sticky dismissal: `sessionStorage`, key `pfp_sticky_dismissed`. **Copy the mechanism and the constants. Do not edit anything under `Property/` (T12).**

**No-op conditions, all four surfaces:** `/embed/*`, `/admin/*`, and consent `=== "denied"`. The trio's `IntentProvider` yields a null context (cis `:29-32`); the widget's yields null via `hiddenOnPaths`; `StickyCTA` returns null on the route prefixes (generalist `:95-97`). **Posture is `opt-out`** — do not change it, and do not add a new consent disclosure (memory `clarity_removed_pecr_decision`: never add disclosures to sites lacking them). The `ConsentToggle` P1-C adds is the opt-out affordance.

**Personalisation is hardcoded default-ON.** Strip any experiment-assign block; no `useExperiment` callers; no new experiments.

**T-H8 ACCEPTANCE — the keyboard walk. This is the row that fails if you skip it.** A widget that opens by itself can eat the keyboard. Required, in the **default state** (nothing dismissed, no storage seeded):
1. Real `keyboard.press("Tab")` from `document.body` on **`/`** and on **one calculator page**. Record the **Tab-press count** to reach the first page-content control, and the full focus order for the first 12 presses, on each route, at 1280 and at 390.
2. Compare against the SAME walk on the pre-W7 build. **A rise of more than one press before the skip link is a BLOCKER.**
3. With the widget OPEN: Tab must cycle inside it and **Escape must close it and return focus to the launcher.** Prove both.
4. With the modal shown: focus is trapped, Escape closes, focus returns.
5. `prefers-reduced-motion: reduce` — every surface still renders a finished mark, never an empty box beside a promise.
6. **JS off:** no surface renders, and nothing is hidden that was visible before.

**Package acceptance, beyond the walk:**
- `cta_snapshot.mjs` vs `cta_baseline.json`: `sticky_cta` and `sticky_cta_close` **unchanged on all 55 routes** (id AND placement AND goal AND href — T22). Every new id listed and named. **The widget launcher's `data-cta="specialist_widget"` renders only client-side, so an SSR crawl cannot see it: read the shipped client bundle** (T-H13 shape).
- `curl /embed/<slug> | grep -c 'sticky_cta\|specialist_widget\|deepscroll\|returning'` = **0** on all three embed routes.
- `python scripts/check_dependency_closure.py` = OK. **This package adds the most new imports of any in the wave; T24 bites here.**
- `npm test` green, and P1-F's ring guard test **still passes** with the new files in its corpus.
- Link floors on `/` and every route the bar paints on: **never drop** (a fixed bar adds a link).
- `grep -rn 'data-cta' <owned>` — every hit on an `<a>` or `<button>`.

**Hard constraint:** `layout.tsx` is handed from P1-C. **W7 must be the only package editing it after P1-C commits, and must not touch P1-A's font/noscript region or P1-C's chrome props.**

**Receipt:** `docs/pharmacies/_port/W7_RECEIPT.md`. **Do NOT launch subagents.**

---

### V1 — VERIFICATION EXECUTOR — Sonnet

One agent. **It runs commands and records decisive output lines; it exercises no judgement and fixes nothing.** It runs against the ONE `next start` build, after the manager's preflight. **Every row needs a decisive output line in the receipt, not a verdict.**

| # | pkg | command | expected decisive line |
|---|---|---|---|
| V1 | all | `cd pharmacies/web && npx tsc --noEmit` | **no output, exit 0.** Baseline is ONE error (research `:69`); W6 closes it. |
| V2 | all | `cd pharmacies/web && npm test` | all pass, report N/N verbatim (baseline 5 test files + P1-F's, `vitest run`) |
| V3 | all | `python scripts/check_dependency_closure.py` | `OK` |
| V4 | all | `node docs/_engines/instruments/sweep.mjs --site=pharmacies --base=http://localhost:3111 --out=<scratch>/sweep_after.json` vs `sweep_baseline.json` | **0 link-floor breaches, 0 dead internal links, 0 dash regressions.** Report the per-route link DELTA, positive nearly everywhere. **Run it twice: `--out` does not land alongside `--save-baseline`.** |
| V5 | all | `node docs/_engines/instruments/browser_check.mjs --site=pharmacies --base=http://localhost:3111 --shots=<scratch>/shots --grounds --out=<scratch>/browser_after.json` vs `browser_baseline.json` | overflow at 390 still **0**; `anchorGaps` still **[]**; contrast failures still **0**; SVG NaN still **0**. **Grounds: baseline is 64 darkOnDark + 9 adjacentSame (P0-G) — report the delta, do not grade.** Run `grounds_fixture_test.mjs` in preflight first (T29); its self-test line must print and its unparseable-colour count must be reported next to any zero. |
| V6 | all | per-URL `json.loads` on EVERY `ld+json` block on all 55 sitemap URLs + the 3 embeds + `/book`, `/complete`, `/thank-you` | no exception on any URL. **A tag-presence check is NOT sufficient.** |
| V7 | all | `node docs/_engines/instruments/cta_snapshot.mjs --site=pharmacies --base=http://localhost:3111` vs `cta_baseline.json` (**run from the repo ROOT** — its baseline lookup is cwd-relative, P0-G) | the three pre-port triples **unchanged on all 55 routes**. New ids listed, each named in a package receipt. **Diff id AND placement AND goal AND href.** Mobile and widget CTAs from the **shipped client bundle**. |
| V8 | all | **PROSE FREEZE.** For each of the 55 baseline routes: fetch the served HTML, extract the text of every `<p>` and `<li>` NOT inside `<script>/<style>/<nav>/<header>/<footer>`, normalise whitespace, one sorted line per node. Same against a worktree at the pre-wave SHA. `diff`. | **The ONLY permitted differences: (a) text NEWLY PRESENT because a kit component now renders copy the page already held elsewhere (every FAQ answer `alwaysRenderAnswers` moved into the HTML; every blog-post title in the new homepage band; every related-article title); (b) the new `LeadCTAPanel` title/description strings, each traceable to an existing line or a manager-supplied config key. Every diff line is classified BY HAND with the source line that produced it. An unclassified line is a FAILED prose freeze and a BLOCKER.** |
| V9 | all | the playbook §9.1 gate block, all 8 rows, **comment-stripped**, pasted verbatim into `docs/pharmacies/STATE.md` | row 1 **>= 2** (P1-B); row 2 report distinct/call-sites next to generalist 15/140 and startups-tech 5/40 pre-uplift (**no floor; report the number**); row 2a report, never grade — **a high 2a with a low 2 IS the plain-jane shape**; row 2b `adopted >= 1` (`0/0` is a FAIL); row 3 non-empty; row 4 **= 1**; row 5 `Eyebrow >= section-label`, expect **>=10 / 0** (phase-1 close was 0/10); row 6 every printed line reasoned AT that line — **never report row 6 empty as a pass without the bracketed-literal sentence**; row 7 every gradient file measured stop by stop; row 8 `walks >= 1`, `guards-the-guard = 1`. |
| V10 | W5 | **THE FOUR-MARKER ROW from the RENDERED HTML of `/`.** `curl -s :3111/ > home.html`, count `animate-ping` and `rounded-full` there; count `StatsCounter` and `Backdrop` from **comment-stripped source imports**. **State which you counted where.** | baseline **0/0/0/0**. Target each **>= 1**. Print beside Property 1/2/3/4, generalist 1/2/3/4, startups-tech 1/3/3/4. |
| V11 | W2 | `/blog` unique internal hrefs | **>= 37** |
| V12 | W2 | 5 category URLs | **>= 17, 17, 13, 13, 12** |
| V13 | W2 | all 22 post URLs | at or above the floors in W2's table; report the delta |
| V14 | W2 | on one post: count scroll containers in the article column; `getBoundingClientRect()` of the sticky element after scrolling 3000px at 1440x900 | **exactly ONE** clamp, sticky element still in the viewport (T32) |
| V15 | W2 | on one post: `grep -c '<form'`; `grep -c 'BreadcrumbList'`; `grep -c 'prose-neutral'` | **2**, **1**, **0** |
| V16 | W3 | 15 URLs | **>= 18, 10x8, 15, 16, 15, 13, 17, 13** |
| V17 | W3 | all 13 FAQ-bearing detail URLs: every `acceptedAnswer.text` present in the served HTML, **normalised to alphanumerics with entities decoded** | **100% present.** Normalise properly: stripping `<strong>` inserts a space before a comma and produces false absences. |
| V18 | W3 | `grep -c '&lt;a href'` on all 13 detail URLs | **0** — no authored anchor renders as escaped text |
| V19 | W4 | 4 URLs | **>= 13, 11, 11, 11** |
| V20 | W4 | `curl /embed/<slug> \| grep -c '<header\|<footer\|<nav\|<form\|sticky_cta\|specialist_widget'` x3 | **0** on all three |
| V21 | W4 | per tool URL: `grep -c '<form'`; `grep -o '"@type":"WebApplication"' \| wc -l`; heading-order scan | **1**, **1**, `h1 → h2 → h3` with no jump (baseline `h1 → h3` on all three) |
| V22 | W5 | `/` unique internal hrefs | **>= 25**, expected to RISE by ~3 |
| V23 | W5 | `curl -s :3111/ \| grep -c` each of `Zero-rated`, `~2 months`, `18%`, `0.5% vs 5%` | **>= 1 each** — the TRUE figures in the pre-hydration HTML (T15) |
| V24 | W5 | comment-stripped `<Eyebrow` count and `section-label` count in `app/page.tsx` | **>= 10 and 0** |
| V25 | W5 | contrast of the `StatsCounter` band figures against the band's ground, composited through a 1x1 canvas | **>= 4.5.** Do not accept an unmeasured pair. |
| V26 | W6 | 6 URLs | **>= 10, 10, 10, 10, 18, 14** |
| V27 | W6 | `curl /thank-you \| grep -c '<main'` and `grep -c '<h1'` | **1 and 1** |
| V28 | W6 | `git diff <pre-wave SHA> -- pharmacies/web/src/components/forms pharmacies/web/src/components/calculators/MiniCapture.tsx \| grep -E '^[-+].*(formId\|data-cta\|leadConsent\|redirectOnSuccess\|submitLabel\|name=\|enquiry_ref)'` | **empty** (T19) |
| V29 | W6 | `grep -o '"@type":"Dataset"'` and `grep -c '<form'` and `grep -c 'role="img"'` on both research URLs | **1**, **1** (was 0), **0** |
| V30 | all | **JS DISABLED.** Load one blog post, one `/services/*`, one tool and `/`; count visible FAQ answers | **every answer visible** (K4). If any is hidden, K4 was not applied and this is a BLOCKER on ~30 pages. |
| V31 | all | **tab-walk with a 420ms settle** at 1280 and 390 on `/`, one `/services/*`, one post, one tool, `/contact`, `/thank-you`: real `keyboard.press("Tab")`, read the composited outline colour against the **PARENT's** ground through a 1x1 canvas (Tailwind v4 returns `oklab()`) | every ring **>= 3.0** on light AND dark grounds. **Every section painted dark carries `.ground-dark`.** **A missing measurement is a FAIL, not a pass.** |
| V32 | W7 | **the T-H8 keyboard walk**, all six steps in W7's brief, Tab-press counts per route recorded | counts recorded for `/` and one calculator at both widths; Escape closes; focus returns; **a rise of more than one press before the skip link is a BLOCKER** |
| V33 | all | `grep -rnoE '#[0-9a-fA-F]{3,8}' pharmacies/web/src/app pharmacies/web/src/components --include=*.tsx` | only `PharmaciesBackdrop.tsx`, `PageShell.tsx`, `api/og/route.tsx` survive, **each with a written reason at the line.** Baseline across the wave's owned files: 145 (22+46+77). |
| V34 | all | `grep -rno 'neutral-[0-9]\{2,3\}' pharmacies/web/src` | **0 site-wide** |
| V35 | all | `grep -rn 'data-cta' pharmacies/web/src --include=*.tsx \| grep -B2 -A2 '<div'`, inspected by hand | **0 `data-cta` on a wrapper `<div>`** |
| V36 | all | `git diff --stat --diff-filter=A <pre-wave SHA> HEAD -- pharmacies/web/src` | **every ADDED file has a named owner in STATE.md or is assigned to M1.** W7 adds ~12 files; crypto shipped five unowned net-new files that reached nine route families. |
| V37 | all | full-page screenshots at 390 / 768 / 1440 of `/`, `/services`, one `/services/*`, one `/for/*`, `/blog`, one post, `/calculators`, one tool, both research pages, `/contact`, `/about` | saved to the scratchpad and handed to both reviewers. **The owner's verdict is visual; the reviewers need to see it, not read about it.** |

**Receipt:** `docs/pharmacies/_port/V1_RECEIPT.md`. **Sonnet. Do NOT launch subagents.**

---

### R2 — DESIGN FIDELITY REVIEW — Opus

Runs **concurrently with R3, after V1 completes**, against the running server and the V37 screenshots. Gets the KNOWN AND ACCEPTED list (§H). **"Finding nothing is a failed review."** May not edit a file. Returns `file:line` findings ranked BLOCKER / GAP / NIT, each with the command that proves it.

**The question:** would the owner, walking this site next to Property and generalist, say it is there? Not "does it pass the gates" — startups-tech passed every gate and he said plain jane.

1. **The four-marker row from the rendered HTML**, and all 8 §9.1 rows, comment-stripped, re-run independently of V9/V10. **Row 2a against row 2: a high decline count against a low adoption count IS the plain-jane shape.** Name every decline and say whether its reason is still true at today's kit SHA (T-H6). **Two were already stale at planning time — `SlimHero.sectionClassName` and `CoverageItem.href` both shipped. Check for more.**
2. **Rings, tab-walked with a 420ms settle**, light and dark grounds, composited against the parent's ground through a 1x1 canvas. **This wave adds a related rail on 22 posts and a sticky bar, a modal and a widget on 55 routes. Check every one of them.**
3. **Contrast**, `browser_check` at all four widths, against the **0**-failure baseline (P0-G, not P0-D's 29). **T-H2: the instrument cannot see text alpha.** T25: on any surface still themed through `var()`, the contrast half is unusable — say which, and take those decisions from a hand-computed table self-tested against the **TAILWIND V4** values (`slate-500 #62748e` on white = 4.77, `slate-400 #90a1b9` on white = 2.63; the 4.76/2.56 pair is v3 and is what the instrument's own self-test prints).
4. **Grounds and section rhythm:** `--grounds` **plus the arbitrary-value scan (`bg-\[#...\]`) that `--grounds` cannot see.** Did the `#fafaf9` bands survive as a deliberate ground or get normalised into `slate-50`? A normalisation nobody asked for is a finding.
5. **The sticky arrangement in the blog article column** (T32): count scroll containers, measure `getBoundingClientRect()` after scrolling. Reading classes is not enough.
6. **Overflow at 390 on every route** (baseline 0) and `anchorGaps` (baseline 0 after P0-G).
7. **Motion:** does the eyebrow rule draw, does `ScrollGlowGroup` fire, do the ticks draw? **And does each render CORRECTLY with `prefers-reduced-motion: reduce` and with JS off?** The failure mode must always be a finished mark, never an empty box beside a promise.
8. **`rounded-*` actually paints what `--radius` says** — verify the paint, not the class.
9. **Hardcoded hex survivors, each with a reason at the line.**
10. **`ReadingProgress` vs `PageShell`'s sticky header** — z-index and top.
11. **T-H4: do not measure a `display:none` element.** The header nav is `hidden lg:flex`.
12. **Screenshots, section by section, at 390 and 1440, next to generalist's equivalents. Say in plain words where this site still looks cheaper and why.**

---

### R3 — CONTENT AND CLAIMS REVIEW — Opus

**The question:** did the wave publish one sentence, one figure or one claim the site did not publish before? **Sweep by RULE, never by the list this brief hands you (T6). Every agent that swept by rule found more than its brief contained.**

1. **The prose freeze, independently re-derived** (do not take V8's word). Every `<p>` and `<li>` text node on all 55 routes, before and after. Classify every diff line.
2. **Kit-default copy that reached a page.** Grep the served HTML of all 55 routes for each of these exact strings and report the route count: `"Free consultation"` (LeadCTAPanel default eyebrow, `:18`), `"Book your free consultation"` (its default formTitle, `:27`), `"Fixed fee quote if you decide to proceed"` (WhatToExpectCard default, `:26`), `"Most recommended"` (ComparisonTable), `"Free, no obligation. The form is just below."` (BlogSidebarCta default note), `"Example figures displayed"` (ExampleFigureNote — **this one is INTENDED; report where it lands**), `"What landlords say"` / `"Your rent went up"` / `"Section 24"` (Property's own copy leaking through a kit default). **Expected: 0 for every string except `"Example figures displayed"` and the BlogSidebarCta note (adopted deliberately, W2).** R3 G6 on startups-tech was the LeadCTAPanel default reaching 14 pages, and on that site it was a fee claim.
3. **Star ratings:** `grep -c 'Rated 5 out of 5'` across all routes = **0**. `showRating={false}` must be passed.
4. **Invented identity:** no `initials` on any testimonial; the three quotes and the composite disclaimer byte-identical to `page.tsx:185-201` and `:740-743`; no fourth quote.
5. **Figures.** Every number on every changed surface re-derived against `docs/pharmacies/house_positions.md` (28 positions) and `docs/pharmacies/rates_ledger.json` (26 rows). **T15: check the PRE-HYDRATION HTML of the `StatsCounter` band.** **T6: search the ARITHMETIC and the CONCEPT, not only the string** — a corrected sentence above an uncorrected worked example defeats a text search. **T36: the three calculators are golden-tested and a test pinned a wrong figure here before (P0-A G1). Tests are not evidence.**
6. **Schema vs page (T17, T8).** Every FAQ-bearing URL: every `acceptedAnswer.text` present in the HTML, from ONE binding. **No raw HTML inside `acceptedAnswer.text`** — this was live on `/services/*` and `/for/*` at planning time (A2); say whether the manager's one-line strip landed. **Exactly one `BreadcrumbList` per URL**, its current crumb a short label not the page's full title sentence. If `BlogPosting` was added, `headline` equals the visible `<h1>` on all 22 posts, and `datePublished`/`author` are present and not confused with `dateModified`.
7. **Compliance copy against the code that actually runs (T18).** Cookie policy vs what `ConsentedScripts` loads (`adsenseClientId` is set, `gaMeasurementId` is empty); retention months vs `niche.config.json`; the consent sentence vs `site.ts`. **Report drift; change nothing** — both rows are owner-ruled LEFT AS IS. Do not reopen.
8. **Em-dashes:** 0 across all 55 routes — body text AND `metaTitle`/`metaDescription`/`summary`/ `keyTakeaways`/every JSON-LD string.
9. **The `data-cta` inventory:** every new id, its placement, its goal, its href, and whether it sits on a control or a `<div>`. **W7's widget and bar ids come from the client bundle, not the SSR HTML.**
10. **The capture-surface census per route family**, counted on the served HTML: how many forms, how many interruptive surfaces, and whether any route now carries two of the same thing.

---

### M1 — MOP-UP (gap-fix round, NOT concurrent) — Opus

Runs after both reviews. Owns the cross-seam defects nobody scoped: files the wave CREATED with no owner, the `git diff --stat --diff-filter=A port-pharmacies-phase0 HEAD -- pharmacies/web/src` list, and every "saw it but could not reach it" item the seven builders reported. **Explicitly includes W7's two `NextStepOffer` mount points** (`app/for/[slug]/page.tsx` and the blog post template), which W7 builds but does not own. Up to **three Sonnet gap-fixers** on disjoint, `file:line`-specified fixes may run alongside.

### R4 — RE-REVIEW — Opus

One pass over M1's diff. **T7: a fix pass introduced a blocker last time.** T-H15: a phase tag is not the end of a port, and neither is the first "final" check.

---

## C. KIT GAPS FOR THE MANAGER

Additive only. Every one defaults to byte-identical behaviour for every existing consumer. **Trap 12 binds: none may change Property, including indirectly. The wave is designed to complete with NONE of them.**

| # | component | state | verdict |
|---|---|---|---|
| **K1** | `design/primitives/SlimHero.tsx:47` | **`sectionClassName?` ALREADY SHIPPED.** The hospitality-era gap is closed. | **No gap.** W3/W5/W6 ADOPT. A decline on "hardcoded `bg-slate-900`" is STALE and R2 must catch it. |
| **K2** | `design/marketing/CoverageCards.tsx:31,65` | **`href?` on `CoverageItem` AND `html?` ALREADY SHIPPED.** | **No gap.** W3 and W5 ADOPT. Both halves of the old decline are stale. |
| **K3** | `design/primitives/accordion.tsx` | `AccordionTrigger`'s focus ring may be a hardcoded `outline-primary-600` literal a call site cannot override. **Open it and check before briefing.** If it is, the kit FAQ ring bypasses this site's `--focus-ring` / `.ground-dark` mechanism on every FAQ page. | **NOT required**, but it decides whether gate row 6 lists the kit FAQ trigger on ~30 pages. Proposed: `focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]` — identical paint on every site that does not declare the token. |
| **K4** | `design/primitives/accordion.tsx` + `layout.tsx` `<noscript>` | `alwaysRenderAnswers` sets `data-[state=closed]:hidden`; with JS off Radix SSRs every item closed, so **every FAQ answer is hidden** on ~30 pages after this wave. **NOT a kit change** (many consumers, trap 12). | **YES, REQUIRED, and it is a MANAGER edit to `layout.tsx`**, which is OFF LIMITS to every builder. One line in the existing `<noscript>` block releasing `[data-state="closed"]` scoped to the accordion content class. Do it in the same commit as W7's `layout.tsx` change or immediately after. **V30 is the proof.** |
| **K5** | `design/blog/BlogSidebarCta.tsx` `note` default | publishes "Free, no obligation. The form is just below." | **No action.** This site already publishes "no obligation" in `MiniCapture` and `/book`, so no new claim. Adopt; log it. |
| **K6** | `design/marketing/ProblemStatement.tsx:33-56` | hardcodes Property's landlord copy and a CTA button, no copy props | **NOT required.** W5 declines in writing. |
| **K7** | `design/marketing/WhatToExpectCard.tsx:22-27` | `DEFAULT_ITEMS` publish a fee line | **Not a gap, a RULE:** locked rule 10, always pass `items`. |
| **K8** | `design/marketing/LeadCTAPanel.tsx:18,27` | defaults `"Free consultation"` / `"Book your free consultation"` | **Not a gap, a RULE:** locked rule 9. |
| **K9** | `pharmacies/web/src/lib/schema.ts` | `buildFaqJsonLd` is fed raw-HTML answers by `services/[slug]` and `for/[slug]`; `BlogPosting`/`Article` is absent estate-wide on this site's posts | **MANAGER-DIRECT, one place, both templates.** W3 and W2 supply the exact diffs in their receipts. Not a kit edit. |

**Verified present and usable, so no builder may decline on a stale reason:** `FaqSection` `html`+`alwaysRenderAnswers`+`tone`; `StatsCounter` `StatItem.value`+`href`+`tone`+ `columns`; `TestimonialsSection` `items`+`showRating`+`footnote`+`headingId`; `Breadcrumb` `tone` with `"onBrand"`; `CardStack` `html`; `CoverageCards` `href`+`html`+`glow`+ `columns`; `ProcessTimeline` `html`; `SlimHero` `sectionClassName`; `HubArticleList` does **not** slice; `ScrollGlowGroup` `as`+`delay`; `DrawnTickList` `tickClassName`; `TableOfContents` `stickyMobile`; `BlogSidebarCta` `note`+`ctaPlacement`; `RelatedArticles` `kind`+`kindFromHref`; `Calculator` `headingLevel`+`resultWrapper`+`eyebrow`.

---

## D. DEPENDENCIES, CONCURRENCY AND LAUNCH ORDER

**W2, W3, W4, W5 and W6 are fully concurrent. W7 is NOT: it needs `layout.tsx` handed over from P1-C.** Derivation, not assertion:

- **Ramp, tokens, rings, motion, backdrop, chrome:** all phase 1's, all OFF LIMITS to all seven. No package waits on another for a colour, a ring or a motif. Prove the ramp compiled after the build with `grep -o "primary-600" pharmacies/web/.next/static/css/*.css | wc -l` being non-zero — **`-o ... | wc -l`, never `grep -c`: a built stylesheet is ONE line.**
- **`lib/blog.ts` / `markdown-utils.ts`:** W2 owns both. W5 imports `getAllPosts` for the blog band. **Contract: W2 must not change either file's EXPORTED SHAPE.**
- **`data/pharmacies-services.ts` / `pharmacies-hubs.ts`:** W3 owns them; `llms-full.txt/route.ts` and the footer read them. **Exported shape frozen.** Verify whether `app/page.tsx` imports them (hospitality's homepage did not; **re-derive before briefing W5**).
- **`lib/calculators/registry.ts`:** W4 owns the pages; the registry is read-only to it, and `layout.tsx` reads `TOOLS`. Exported shape frozen.
- **`components/calculators/MiniCapture.tsx`:** W6 owns it; W2 (`InlineMiniLeadForm`) and W4 (`CalcResultCta`) both MOUNT it. **Contract: W6 must not change its prop signature.** Say it in all three briefs.
- **`lib/schema.ts`:** imported by W2, W3, W5 and W6. **OFF LIMITS to all seven, manager-direct.** This is the one genuinely shared surface and fencing it is what keeps the packages disjoint.
- **`app/layout.tsx`:** P1-A owns the font/noscript region, P1-C the chrome region, **W7 the capture region. Serial, never concurrent.**
- **`config/site.ts` and `niche.config.json`:** read by everything, written by the manager only.
- **`NextStepOffer` mount points** live in W3's and W2's files. **W7 builds the component, mounts it nowhere, hands the two `file:line` targets to M1.**

**Launch: one message, FIVE tool calls — W2, W3, W4, W5, W6 at once.** Then W7 alone once P1-C's `layout.tsx` is committed. Cap is 6 concurrent (T39), and every brief says "Do NOT launch subagents", or five become twenty.

**Then, strictly serial and manager-direct:**
1. Preflight: `netstat -ano | grep ":3111"` and kill every orphan. **A `next start` has been running on :3111 on the phase-0 build throughout this planning pass — kill it before the wave build, or every measurement is against the old bundle** (T37: nineteen orphaned servers caused three wrong-site measurements). Run `grounds_fixture_test.mjs` (T29): an instrument with no test is not a gate.
2. ONE `next build` in `pharmacies/web`, nothing else building (T1).
3. `next start -p 3111`; **assert the served `<title>` reads "Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners" AND assert the server's age** before trusting a number (T2: a "verified green" build can predate the files it claims to cover).
4. V1 runs EVERY row against that ONE build. **Expect roughly 2 in 30 to fail on a wrong expected value in a brief rather than a site defect; that was the charities ratio. Settle each at the element, not by argument.**
5. Apply K4 (the `<noscript>` line) and K9 (the `lib/schema.ts` diffs) manager-direct.
6. Tag `port-pharmacies-phase2` .. `phase6`, **and `port-pharmacies-complete` on the final fix commit** — a checkout of a phase tag is missing every review fix (T-H15).
7. R2 and R3 concurrently. Each gets the running server, the V37 screenshots, §H, and **"finding nothing is a failed review".**
8. M1 plus up to three gap-fixers on disjoint files.
9. ONE re-review, R4.

---

## E. FALSE PREMISES FOUND, AND RISKS

### E.1 Corrections to the session plan and to the phase-0/1 documents

1. **Storage prefix is `pfp`, not `phfp`** (P0-E §0.1, confirmed in `layout.tsx`). The session plan says `phfp` twice, including `phfp_sticky_dismissed`. **All W7 keys are `pfp_*`.** A new prefix silently orphans the site's existing local-storage state.
2. **The session plan's "homepage 866 lines" is 884**, and "3 calculators ... 22 posts ... 26 page routes" are right. `/services` has **8** records and `/for` has **5** (a naive `grep -c "slug:"` over-counts; P0-E §0.6).
3. **The session plan says W3 owns `components/ui/Breadcrumb.tsx`** — correct, and it is 59 lines with coverage on **one** route only (`/privacy-policy`). Retiring it is cheap.
4. **The session plan says W6 owns `components/research/PharmacyIndexCharts.tsx`** — correct, 347 lines, and both research pages consume it.
5. **The session plan's W7 says "`config/support.ts`"**; the worked example (startups-tech) puts the widget config at **`lib/intent/widget-config.ts`**. Follow the worked example.
6. **The session plan's "no `/resources`"** is right, and so is the consequence: **this site has no `/research` hub route either.** Navigation points at a specific research page. Do not invent the hub.
7. **P1-G says "29 chart-caption contrast failures — P1-D must not fix them, report unchanged". They are already 0** (P0-G part 1). The P1-G row is superseded by the later document.
8. **P1-G says "8 missing `scroll-margin-top` anchors on one blog article. Phase 2."** They are already **0** (P0-G). W2's job is to KEEP them at 0 when it adds TOC anchors, not to fix them.
9. **P0-E §4 says "no `data-cta` on `LeadForm`"** — true, and the consequence the session plan misses: **the whole site has 3 `data-cta` ids and zero `data-cta-goal`.** Every id any package adds is new live segmentation, and `goal` is a declared addition or an omission, never a silent inheritance.
10. **P0-E §7 says nested `<main>` on 10 of 14 routes; P0-B #8 says 34 pages. Both are superseded: phase 0 CLOSED it** (P1 §0, `grep` = 1 hit). Do not re-sweep.
11. **The `tsc` baseline is NOT clean.** P0-E §8 says clean; P0-G part 3 introduced one error at `research/pharmacy-openings-closures-index/page.tsx:69`. **W6 closes it; V1 row V1 expects zero.** A builder that reports "tsc was already broken" and stops has mis-read the handover.
12. **`neutral-*` is already 0 in every package's owned files.** P1-D landed during this planning pass. The session plan and P1's §0 both still describe 457 occurrences in 30 files.

### E.2 Risks, with the recommended resolution

1. **W7 is oversized.** It creates ~12 new files including a 184-line taxonomy, a 251-line journey model, a 213-line engine and a fully-required `WidgetConfig`, and it authors opener copy. Every other package restyles existing pages. **Resolution: launch it alone, after the five, with the whole concurrency slot to itself, and give the manager the option to split it (W7a trio + sticky; W7b widget + config) if the first receipt runs long.** The agent budget has room: the wave is 7 builders + V1 + 2 reviewers + M1 + R4 = **12**, matching the session plan exactly.
2. **The two `IntentProvider`s.** Highest-probability W7 defect. **Resolution:** the brief names both import paths explicitly and requires the receipt to quote both import lines.
3. **The `<noscript>` FAQ hiding (K4) reaches ~30 pages** and no builder can fix it. **Resolution:** manager-direct, in writing, before tagging, with V30 as the proof. If it is skipped, every FAQ answer this wave moved into the HTML is invisible without JS and the wave has made accessibility worse while claiming the opposite.
4. **The prose freeze is the hardest gate in this wave** because every `LeadCTAPanel` has required `title` and `description` props and five surfaces have no such copy today (`/for`, `/blog`, `/calculators`, both research pages). **Resolution:** those five reuse the strings `/services` and `niche.blog` already publish; anything genuinely new is a manager-supplied config key, named in §G as an owner question, not written by a builder.
5. **Stale declines.** Two shipped between the hospitality port and today (`SlimHero sectionClassName`, `CoverageItem href`). **Resolution:** this plan names them; R2's row 1 re-checks every decline against the kit at review time (T-H6: a kit SHA in a ledger goes stale within the day).
6. **The homepage is the owner's verdict and W5 is a single agent on 884 lines.** **Resolution:** the band table in A4 is the spec, band by band, with the disposition pre-decided; W5 executes rather than designs. If the four-marker row still reads below 1/1/1/1 at V10, that is a BLOCKER, not a NIT.
7. **`StatsCounter` on the homepage animates nothing** (all four values are strings). **Resolution:** stated in A4 band 2 so a builder does not force numeric `target`s and publish a false figure, and so a reviewer does not file "the counter does not count" as a defect.

---

## F. KNOWN AND ACCEPTED — hand to both reviewers

Do not report these as new findings. Each is already decided.

1. The nine serious P0-A rows as the owner ruled them at the phase-0 checkpoint; rows 8 (composite testimonials) and 9 (cookie policy vs AdSense, 24-month retention) are **LEFT AS IS**.
2. The whole P0-A "not serious" list (A9 above). No package touches it.
3. The AdSense CSP `frame-src` console noise (**140 errors per `browser_check` run**, from `pagead2.googlesyndication.com`, refused by `packages/web-shared/lib/security-headers.ts`) is an open OWNER decision, estate-wide. Not a wave defect.
4. `niche.config.json` `brand.logo_path` points at a file that has never existed; the header renders a text wordmark. Owner question, not a defect.
5. `content_strategy.categories` (7 names) vs 5 live blog category slugs. Config drift, not consumed by routing. Logged, not fixed.
6. `app/admin/analytics/login/page.tsx:39` is the one real ring defeat and is out of the port's lease.
7. `--calc-result-accent` (`#88cde7`, 10.14 on slate-900) is already the answer to brand-on-dark text. Do not repoint it.
8. The `--grounds` baseline is **64 darkOnDark + 9 adjacentSame** across 17 + 3 routes (the dark CTA band meeting an equally dark footer). **Pre-existing, chrome-shaped, not introduced by this wave.** Report the delta only.
9. 3 to 7 scattered 60s navigation timeouts per `browser_check` run, no repeating route/width pair: local load contention, recorded in both P0-D and P0-G. Not a site defect.
10. `browser_check.mjs` gets moved to the background past 600s by the Bash tool regardless of the timeout parameter. Poll it; **never start a second run.**
11. `cta_snapshot.mjs` must be run from the **repo root** (its baseline lookup is cwd-relative).
12. `/book` and `/complete` are not in `robots.txt`'s disallow list while `/thank-you` is. Owner question (P0-B #12 shape).
13. The `&lt;` literals on `/research/pharmacy-density-and-workload-index` are correctly-escaped "less than" comparisons in body copy, not broken markup (P0-B #13).
14. `og:image` absent on 11 pages and 8 over-length meta descriptions (P0-B #6, #7) are phase-0 minors nobody was assigned. **If a package's file is one of them, fixing it is in scope and welcome; not fixing it is not a wave regression.**

---

## G. OWNER QUESTIONS, BUNDLED — one decision each, do not block on any

1. **Per-category blog CTA copy.** Every blog category currently shares one CTA heading and body from the config. We can write one per category (five categories), which is five new sentences we would author, or keep the shared one. **We recommend keeping the shared one.** Agree?
2. **A `/research` index page.** The site has two research pages and no hub; the footer and nav point straight at one of them. Adding a hub is a new route and a new page of copy. **We recommend not adding one this wave.** Agree?
3. **An `h1` on the three partner embed pages.** They are iframed into other people's pages and have no heading at all today. An `h1` helps a screen reader and may look wrong inside a partner's layout. **We recommend adding a visually-hidden one.** Agree?
4. **`data-cta-goal`.** The site has never emitted it. The shared sticky bar emits it on other sites. Adding it gives us goal-level funnel reporting but changes the shape of the live CTA series. **We recommend adding it only on the new surfaces and leaving the three existing ids exactly as they are.** Agree?
5. **The sticky bar and the help widget together.** After this wave a visitor can see a sticky bottom bar, a scroll-triggered panel, a returning-visitor bar and a floating widget. All four were your decision on 7 October. **We recommend you walk the local server before we go further, because four surfaces on one page is the thing that reads as pushy, and the suppression rules are the only thing stopping it.**
6. **The 10 homepage section labels.** They are the existing wording, moved into the shared label component unchanged. If any of them reads badly to you, say which and we change that one line.

---

## H. MODEL TIERING AND AGENT BUDGET

| role | count | model | why | status | result |
|---|---|---|---|---|---|
| W2 blog | 1 | **Opus** | composes markup on 28 prospect-facing routes | **DONE** | kit `Breadcrumb`/`HubArticleList`/`TableOfContents`/`ReadingProgress`/`RelatedArticles`/`BlogSidebarCta`/`FaqSection`/`LeadCTAPanel` adopted, nothing authored |
| W3 templates and hubs | 1 | **Opus** | 15 prospect-facing routes and two claims-adjacent data files | **DONE** | `SlimHero`/`Breadcrumb`/`FaqSection`/`LeadCTAPanel`/`ScrollGlowGroup`/`StatsCounter`/`CardStack`/`CoverageCards` adopted, `/for` gets its first form |
| W4 calculators | 1 | **Opus** | the highest-intent surfaces and a partner-facing embed | **DONE** | `Breadcrumb`/`Eyebrow`/`FaqSection`/`NoticeCard`/`ExampleFigureNote`/`LeadCTAPanel` adopted, embed stays bare |
| W5 homepage + about | 1 | **Opus** | the page the owner walks first, and the four-marker verdict | **DONE** | four-marker row 0/0/0/0 -> 1/2/4/3; one wording deletion found and restored by M1a |
| W6 flow, legal, forms, research | 1 | **Opus** | the conversion surface, the compliance pages, 721 lines of published data | **DONE** | +2 forms on `/contact` and both research pages, the one pre-existing `tsc` error closed, vitest 6 files/40 tests green |
| W7 capture surfaces | 1 | **Opus** | a whole new subsystem, ~12 new files, a required config, and the T-H8 walk | **DONE** | all four surfaces mounted with Property's suppression rules copied as data; added a focus trap/Escape/focus-return neither source had |
| V1 verification executor | 1 | **Sonnet** | mechanical: runs commands, records output, no judgement | **RUNNING** | not yet reported |
| R2 design reviewer | 1 | **Opus** | every review on this programme found real defects | **RUNNING** | not yet reported |
| R3 content reviewer | 1 | **Opus** | content review is Opus by standing rule | **RUNNING** | not yet reported |
| M1 mop-up | 1 | **Opus** | cross-seam, by definition the defects nobody scoped | **DONE** (as M1a) | `BlogPosting` JSON-LD wired, `NextStepOffer` mounted x3, W5's band-10 wording restored; residuals listed in `docs/pharmacies/STATE.md` |
| R4 re-review | 1 | **Opus** | T7: a fix pass introduced a blocker last time | **NOT YET RUN** | waits on R2/R3 |

**WAVE TOTAL: 11 agents**, plus **up to 3 optional Sonnet gap-fixers** on disjoint, `file:line` fixes if M1's finding count warrants. Worst case **14**. The session plan budgeted **12**; this is inside it.

**Sonnet composes no page markup a prospect sees.** No builder row is Sonnet because there is no registry-or-config-only package in this wave.

**Concurrency: 5 at launch, then 1 (W7), then 1 (V1), then 2 (R2+R3), then 1 (M1), then 1 (R4).**

**Spend to date on this port:** phase 0 used **9**; phase 1 is **7**. **Running total before the wave: 16.** The wave takes it to **27**, or 30 worst case. The uplift adds 7. **Report the ACTUAL count to the owner at wave close, and price the wave with him before launching it** — standard terms: a multi-agent wave is priced in the subscription window before it runs, not after.

---

## I. MANAGER BLOCK — build, test, instrument, tag

```
P1-C commits layout.tsx
      |
      +-- W2 blog ---------+
      +-- W3 templates ----+
      +-- W4 calculators --+  (FIVE CONCURRENT)
      +-- W5 homepage -----+
      +-- W6 flow/legal ---+
            |
            +--> W7 capture surfaces (ALONE: owns layout.tsx after P1-C)
                   |
                   +--> MANAGER: K4 noscript line + K9 schema diffs
                          |
                          +--> ONE BUILD --> next start :3111 --> V1
                                 |
                                 +--> R2 + R3 (concurrent)
                                        |
                                        +--> M1 (+ up to 3 Sonnet fixers)
                                               |
                                               +--> R4 --> tags
```

**Order, every step manager-direct:**
1. Kill the orphan server on :3111. `grounds_fixture_test.mjs`. `git tag -l 'port-pharmacies*'`.
2. `ls`-verify every package's OWNS and OFF-LIMITS list before its brief ships. **Disjointness is verified by listing, not asserted.**
3. Launch the five. Then W7.
4. Apply K4 and K9. **Both are manager-only and both are required before V1 can pass.**
5. ONE build, nothing else building. `npx tsc --noEmit` → `npm test` (report N/N against the baseline) → build → `next start -p 3111` → assert the `<title>` and the server age.
6. V1, all 37 rows. `sweep.mjs` twice (`--out` does not land alongside `--save-baseline`). `cta_snapshot.mjs` **from the repo root**. `browser_check.mjs` — poll it, never start a second.
7. `python scripts/check_dependency_closure.py`.
8. Tag, in this order, on the commits that carry each package: **`port-pharmacies-phase2`** (W2), **`phase3`** (W3), **`phase4`** (W4), **`phase5`** (W5), **`phase6`** (W6 + W7). Then R2/R3 → M1 → R4, and only then **`port-pharmacies-complete`** on the final fix commit.
9. Git from the monorepo ROOT, explicit paths, **never `git add -A`**; commit per round; `git status` for untracked scratch before each tag.
10. `docs/pharmacies/STATE.md` updated **in the same commit** as each phase, carrying the §9.1 gate table and the four-marker row. `HANDOFF_NEXT_PORT.md` next site = care. `PORT_FIELD_NOTES.md` appended last.
11. Dev server for the owner walk. **No push, no deploy, no IndexNow, no `monitored_pages` change.**
12. Count and report any CI noise created. Clean the scratchpad. Delete every temporary file.

---

## Close (2026-10-07, manager)

**What landed.** All seven builders (W2 through W7) and the mop-up (M1a) are done. Phases 1
through 6 were built as one concurrent wave on the owner's instruction (ultracode-style
parallelism, non-sequential phases, sites stay serial), so the tags `port-pharmacies-phase1`
through `phase6` all land on the same wave commit (commit: see tags
port-pharmacies-phase1..phase6). K4 (the `<noscript>` FAQ line) and K9 (the `lib/schema.ts`
diffs) were applied manager-direct as required.

**Gate result.** `tsc` clean. `vitest` 7 files / 72 tests green. Dependency closure OK across
19 sites. Build green, 72 static pages, `BUILD_ID LsrdJDbZT1Ws9SYqZ_m_c`. The full §9.1 gate
table (rows 1-8) and the four-marker thermometer (ping 1 / stats 3 / backdrop 5 /
rounded-full 3, was 0/0/0/0) are recorded verbatim in `docs/pharmacies/STATE.md`'s 2026-10-07
wave section.

**Residuals pending review.** V1 (wave verification), R2 (design fidelity) and R3 (content and
claims) are running now and have not reported back; R4 has not run and waits on them. M1a's own
residuals (M10, M11, M12, M14, M19, M20, and the Breadcrumb delegation shim) are listed in
`docs/pharmacies/STATE.md`'s "Residuals pending review" subsection, none of them blocking. No
push, no deploy, no IndexNow, no `monitored_pages` change has happened. Agent count for the
wave: 7 builders + G1 + G2 + G3 + K9 + the M1_INPUT compiler + M1a + 1 planner = 14; see
`docs/pharmacies/STATE.md` for the running port-wide total.
