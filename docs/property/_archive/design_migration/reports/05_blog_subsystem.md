# Report 05 — Blog subsystem

Written 2026-08-22. Agent brief 05. Everything below is **verified** (file read, command
run, or live URL fetched) unless explicitly labelled **inferred**.

Sides: **ours** = `Accounting/Property/web/`, **theirs** = `Accounting/tmp/design_migration/Property_zip/web/`.
Snapshot base = `1d68a570`, designer work = `8041183..eb745e1`.

---

## VERDICT FIRST — three live production bugs, only one of which the designer found

| # | Bug | Live? | Blast radius | Found by |
|---|---|---|---|---|
| 1 | **Invisible form labels** on every article's enquiry form | **YES, verified in production HTML** | ~783 Property articles, the site's primary blog conversion point; **plus the identical bug live on generalist (×2) and digital-agency (×1)** | designer |
| 2 | **`/blog/property-accountant-services` hub 301s away** and never renders | **YES, verified 301 live** | 1 hub page + 63 crawlable article links lost | designer |
| 3 | **57 posts get the wrong (generic) enquiry CTA** because `CTA_BY_CATEGORY` is keyed on raw frontmatter with divergent spellings | **YES, verified live, causation proven** | 57 posts; plus 7 MTD posts lose `MTDCountdown` | **us, this report** |

All three are fixable independently of the port. #1 and #3 are one-line-ish. Recommend
shipping them as a standalone hot fix, not gated on the redesign.

There is also one **regression the port would introduce if taken as-written**: the
designer's `HubArticleList` cuts the nine hubs from 749 server-rendered crawlable article
links to 108. See §4.

---

## 1. `BlogPostRenderer` — hunk by hunk, and the merged target

### 1a. What WE changed (`+17 / -86`)

`git diff 1d68a570 HEAD -- Property/web/src/components/blog/BlogPostRenderer.tsx`

Our -86 lines are **entirely non-visual**. Four changes, none of which touch markup:

1. **Three split helpers extracted to the shared package.** `splitContentAtMidScroll`,
   `splitContentEarly`, `splitRemainderForGate` (were `BlogPostRenderer.tsx:90-156` at the
   snapshot) moved to
   `@accounting-network/web-shared/content/blog-splits`, now imported at
   `Property/web/src/components/blog/BlogPostRenderer.tsx:19`.
   Commit `ec38f821` "Step 2.5b: extract conversion stack to web-shared".
   **That is where 76 of the 86 deleted lines went.** Behaviour identical.
2. **`GateOrForm` prop signature simplified.** Was
   `<GateOrForm topic copy={gateCopy(topic, post.title)} placement="blog" category={categorySlug} />`;
   now `<GateOrForm topic={topic} />` (`BlogPostRenderer.tsx:257`, `:264`). The
   `gateCopy` import was dropped.
3. **Packages-mode CTA fork** (`BlogPostRenderer.tsx:126-138`): `isPackagesMode(niche)`
   + `getActiveCta(niche)` replaced direct `niche.blog.*` reads. From `7ab42441`
   (packages experiment) and survived its revert `7f7eae12`.
4. Import line updated accordingly (`:7`).

**Consequence: our renderer and theirs have a clean, non-overlapping diff.** Ours changed
logic and imports; theirs changed markup and styling. There is no line-level conflict
except in the `ctaCopy` block and the import header.

### 1b. What THEY changed (`+96 / -68`)

Verified against `git -C Property_zip diff 8041183 eb745e1 -- web/src/components/blog/BlogPostRenderer.tsx`.
Twelve hunks:

| Hunk | Theirs | Verdict |
|---|---|---|
| imports | adds `lucide-react` icons, `Eyebrow`, `HeroBrickBackdrop`, `Accordion*`, `BlogSidebarCta` | take, but see §1c prerequisites |
| `hasUpdate` + `metaPill` consts | new locals above `return` | take |
| header shell | `border-l-4 border-emerald-600 bg-slate-50 p-8` → `rounded-xl bg-slate-50 p-8` | take |
| category label | raw `<p class="text-xs...">{post.category}</p>` → `<Eyebrow>{post.category}</Eyebrow>` | take, **but pass `categoryDisplayName(categorySlug, post.category)`** (§5) |
| meta row | dot-separated text run → four icon pills (CalendarDays / History-emerald "Updated" / UserRound / Clock). `<time>` preserved in each | take |
| standfirst | `mt-4 text-lg text-slate-700 leading-relaxed` → `mt-5 text-base leading-7 text-slate-600` | take |
| skip link | adds `data-cta="blog_skip_to_form"`, `data-cta-placement="article_header"`, `data-cta-goal="form"`, `py-0.5` | take (analytics gain) |
| hero image | adds `rounded-xl` | take |
| **enquiry section** | adds `relative overflow-hidden rounded-xl`, `<HeroBrickBackdrop />`, `<div className="relative z-10">`, and **wraps `LeadForm` in `<div className="mt-8 rounded-xl bg-white p-6 sm:p-8">`** | **take — this is the bug fix, §2** |
| FAQ | `<dl>` of static `<div>`s → `<Accordion type="single" collapsible>` with `AccordionItem/Trigger/Content` | take; FAQPage JSON-LD is emitted separately so no SEO cost (verified: `buildBlogPostingJsonLd` in `src/lib/schema.ts`, independent of this markup) |
| author box | `rounded-lg`→`rounded-xl`; fixes real CSS bug `hidden sm:block ... flex` → `hidden sm:flex ...` (conflicting display) | take |
| related | `<ul class="space-y-4">` of left-border cards → `grid gap-4 sm:grid-cols-2`, `h-full rounded-xl`, `font-bold! tracking-normal! leading-snug!` title, `line-clamp-3` summary | take (Tailwind v4 confirmed in `package.json:46`, so `!` modifier syntax is valid) |
| sidebar | `<div className="sticky top-24">` → `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` containing `<BlogSidebarCta copy={ctaCopy} />` then `<TableOfContents>` | take; paired with the `TableOfContents.tsx` hunk that removes its own nested sticky |

`TableOfContents.tsx` (theirs, `+4/-2`): removes `sticky top-24 max-h-[calc(100vh-8rem)]
overflow-y-auto` from the desktop block, `rounded-lg`→`rounded-xl`, adds `py-0.5` to the
mobile summary. We did not touch this file since the snapshot. **Theirs wins outright.**

`InlineMiniLeadForm.tsx` (theirs, `+1/-1`): drops `border-l-4 border-emerald-600` from the
wrapper. We did not touch it. **Theirs wins outright.** It sits on `bg-slate-50`, so it is
not a §2 candidate.

### 1c. MERGED TARGET for `BlogPostRenderer.tsx`

**Take theirs wholesale, then re-apply our four changes.** Concretely:

1. Start from `Property_zip/web/src/components/blog/BlogPostRenderer.tsx`.
2. Replace its import header line for `niche-loader` with ours:
   `import { niche, getActiveCta, isPackagesMode } from "@/config/niche-loader";`
3. Add our shared-package import:
   `import { splitContentEarly, splitRemainderForGate, splitContentAtMidScroll } from "@accounting-network/web-shared/content/blog-splits";`
   and **delete their three local copies of those functions** (they still carry the
   pre-extraction versions — porting theirs verbatim would reintroduce 76 lines of dead
   duplicate logic and a silent fork of the split behaviour). This is the single most
   likely thing to be got wrong in the port.
4. Replace their `ctaCopy` block with ours (`isPackagesMode` fork,
   `BlogPostRenderer.tsx:126-138`).
5. Replace their two `<GateOrForm ... copy placement category />` call sites with our
   one-prop form, and do not re-add the `gateCopy` import.
6. **Additionally fix, beyond either side (§5):** key `CTA_BY_CATEGORY` and `isMTDPost` on
   `categorySlug`, not raw `post.category`, and render
   `<Eyebrow>{categoryDisplayName(categorySlug, post.category)}</Eyebrow>`.

**Prerequisites that do not exist in the monorepo yet** (all four are in the designer's
171 no-conflict clean files, so they port without argument, but the renderer will not
compile without them):

| Needed | Ours |
|---|---|
| `src/components/ui/page-blocks.tsx` (`Eyebrow`) | **MISSING** |
| `src/components/layout/HeroBrickBackdrop.tsx` | **MISSING** |
| `src/components/blog/BlogSidebarCta.tsx` | **MISSING** |
| `src/components/property/LeadCTAPanel.tsx` (needed for hubs + /blog) | **MISSING** |
| `src/components/ui/accordion.tsx` | **present**, and exports exactly `Accordion, AccordionItem, AccordionTrigger, AccordionContent` (`accordion.tsx:65`) — signature-compatible |
| `lucide-react` | present, `package.json:25` |
| Tailwind v4 (for `font-bold!`) | present, `package.json:46` |

---

## 2. THE INVISIBLE LABELS BUG — verified, live, ship the fix now

### The mechanism

- `Property/web/src/components/forms/LeadForm.tsx` renders every field label as
  `className="block text-sm font-semibold text-slate-900"` — lines **197, 226, 249, 273,
  296, 320, 358, 381** (eight labels).
- `Property/web/src/components/blog/BlogPostRenderer.tsx:290-304` renders
  `<section id="enquiry-form" className="mt-16 bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24">`
  and drops `<LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />` bare
  inside it at **line 302**.
- `text-slate-900` on `bg-slate-900` = identical colour. Labels invisible.
- The inputs themselves survive: `fieldClass` (`LeadForm.tsx:16`) sets `bg-white`. So the
  form looks like an unlabelled stack of white boxes. The consent/privacy microcopy at
  `LeadForm.tsx:406` and `:436` is `text-slate-500`, which on slate-900 is legible but
  well below AA.

### Is it live right now on propertytaxpartners.co.uk? YES.

Fetched 2026-08-22, HTTP 200:
`https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/average-london-estate-agent-fees`

Rendered HTML contains, with nothing between the section and the form:

```html
<section id="enquiry-form" class="mt-16 bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" ...>
  <h2 ...>Selling a property? Get the CGT position checked first</h2>
  <p class="mt-4 text-base leading-relaxed text-slate-200">...</p>
  <div class="mt-8"><form class="space-y-5" ...>
    ...<label for="role" class="block text-sm font-semibold text-slate-900">I am a...</label>
```

`class="block text-sm font-semibold text-slate-900"` appears **17 times** in that one
page's HTML (8 in the enquiry form, the rest in the in-article capture island, which sits
on a light surface and is fine).

Every article route renders through this one component (`[category]/[slug]` is the only
article route), so this is live on all ~783 articles.

### Recommendation: STANDALONE HOT FIX, do not wait for the port

The designer's fix is the right one and is portable on its own with zero design-system
dependencies. It is a two-line change:

```diff
-                <div className="mt-8">
+                <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                   <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                 </div>
```

Blast radius: every article's enquiry panel gains a white card. Revert path: revert the
one line. Nothing else in the port is required.

### Root-cause question: fix the class or the instance?

The designer's answer was a **standing rule** ("`LeadForm` must always sit on a
white/light surface") plus a per-call-site white card. That is a convention, not an
enforced fix, and conventions do not survive the next person who drops a `LeadForm` on a
navy panel.

The genuinely lazy root-cause fix, if the estate-wide audit (below) finds more than one
dark call site, is to make the form own its surface: give `LeadForm` a wrapping
`bg-white`/light container inside the component itself, so no call site can get it wrong.
The counter-argument is that `LeadForm` also sits on already-white surfaces (contact page,
homepage), where a nested white card is a no-op visually but adds padding. See the audit
result in §2b for the call-site count that decides this.

### 2b. Estate-wide dark-surface form audit — the answer is (a), wrap the call site

**21 `<LeadForm>` render sites in Property. 20 SAFE, 1 BROKEN** (the one above). All 21
verified by reading the file and tracing the wrapper up.

The 20 safe ones use three wrapper patterns, all light:
emerald gradient card `border-2 border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-teal-50`
(`app/property-tax-rates/page.tsx:296`, `app/research/landlord-tax-index/page.tsx:357`,
`app/calculators/[slug]/page.tsx:167`, `app/calculators/mtd-checker/page.tsx:97`,
`app/calculators/incorporation-cost-calculator/page.tsx:106`,
`app/calculators/section-24-calculator/page.tsx:104`,
`app/calculators/portfolio-profitability-calculator/page.tsx:279`,
`app/calculators/stamp-duty-calculator/page.tsx:279`, and all ten blog hub pages at
`:179-183` in each); explicit white card (`app/contact/page.tsx:103`, `app/page.tsx:749`).

**Every other form component in Property is SAFE.** Verified individually:
`InlineMiniLeadForm.tsx:19` (`bg-slate-50`), `resources/GateOrForm.tsx:26` (`bg-slate-50`),
`forms/DetailsForm.tsx` (rendered on `bg-white` at `app/complete/page.tsx:111`),
`forms/BookingPicker.tsx` (`bg-white` at both call sites), all five calculators
(`bg-white` roots; the dark blocks are results-only and hold no inputs),
`calculators/premium/PremiumCalculator.tsx:560-562` (`bg-white`), and
`support/SpecialistWidget.tsx` (only the header strip `:506` is `bg-slate-900` and it holds
no fields; inputs at `:603-605, 658, 690, 717` sit on `bg-white p-3` panels at `:574, 587, 629`).

In `packages/web-shared/`: `leads/MiniCapture.tsx` hardcodes `text-slate-900` labels
(`:481, 506, 526, 553, 572, 590, 631, 647, 662, 678`) but its default `className` is
`bg-slate-50` (`:94`) and every Property call site passes a light class.
`leads/ResultGateModal.tsx:61` is `bg-white p-6` on a `bg-slate-900/60` backdrop (the
backdrop is the overlay, the form is on the white dialog). `leads/CalcResultCta.tsx:34` and
`leads/MobileToolSlot.tsx:35` are `bg-slate-50`.
**Conclusion: do NOT touch the shared package. There is no estate-wide bug there, and a
change would hit 15 sites for zero benefit.**

`ResourceGate` does not exist any more — deleted 2026-08-16, documented at
`components/resources/GateOrForm.tsx:5-12`. `LeadCTAPanel` does not exist in ours yet
(it arrives with the port).

**Inverse problem (light text on light surface): none found.** Every
`text-white`/`text-slate-200`/`text-slate-300` in the form and CTA layer sits inside an
explicitly dark parent.

#### The same bug is duplicated on two sibling sites

`LeadForm` is **not** shared — each site owns a copy. The identical pattern is live on:

- `generalist/web/src/components/blog/BlogPostRenderer.tsx:323` and
  `generalist/web/src/components/.../FundamentalsRenderer.tsx:176` — `bg-slate-900 ... text-white`
  with a bare `LeadForm` whose `labelClass` is `"block text-sm font-medium text-neutral-900"`
  (`generalist/web/src/components/forms/LeadForm.tsx:16`). **BROKEN.**
- `digital-agency/web/src/components/blog/BlogPostRenderer.tsx:290` — same pattern, 8
  `text-slate-900` labels. **BROKEN.**

Five further call sites carry the same dark class string but were not traced to a nearby
`LeadForm` (**inferred, needs a 5-minute check**): `generalist/.../calculators/[slug]/page.tsx:122`,
`generalist/.../calculators/employer-ni-calculator/page.tsx:114`,
`generalist|digital-agency/.../guides/[slug]/download/page.tsx:74`,
`digital-agency/.../founder-stories/[slug]/page.tsx:103`,
`digital-agency/.../calculators/[slug]/page.tsx:137`.

#### Why (a) wrap the call site beats (b) fix the component

1. **20 of 21 Property call sites are already light.** The component's assumption (dark
   labels, white fields) is right for 95% of its use. Changing the component to serve one
   caller regresses the other twenty.
2. **Inheritance would not actually fix the section.** Even with `text-current` labels, the
   consent microcopy at `LeadForm.tsx:406` and `:436` is hardcoded `text-slate-500`
   (about 2.2:1 on slate-900, still failing), the situation hint at `:346` likewise, and the
   `emerald-700` privacy link at `:408` is unreadable on slate-900. That is four more edits
   inside the component. The white card fixes all of them with one class.
3. **The white fields already break the dark section visually.** `fieldClass`
   (`LeadForm.tsx:16`) is `bg-white border-slate-300` — nine white boxes floating on
   slate-900 with no container looks unfinished whatever colour the labels are. The card is
   the design fix as well as the contrast fix, which is why the designer arrived at it.

**The fix, three files, one line each** (plus the two inferred sites if they check out):

```diff
- <div className="mt-8">
+ <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
    <LeadForm ... />
  </div>
```

at `Property/web/src/components/blog/BlogPostRenderer.tsx:301`,
`generalist/web/src/components/blog/BlogPostRenderer.tsx:~331`,
`generalist/web/src/components/.../FundamentalsRenderer.tsx:~184`,
`digital-agency/web/src/components/blog/BlogPostRenderer.tsx:~298`
(sibling line numbers ±2 — it is the `<div className="mt-8">` immediately above each
`<LeadForm>`). The section heading and blurb stay white on slate-900; that contrast is
deliberate and correct.

**Guard against recurrence, laziest version:** one comment beside `fieldClass` at
`LeadForm.tsx:15` stating the invariant. Cheaper than a lint rule or a runtime check, and
it is where the next person will look.

Note this is a 3-4 site change, so it counts as an estate-wide sweep, not a Property-only
fix. Blast radius: four blog article templates gain a white card. Revert: revert four lines.

---

## 3. The nine topic hubs — copy fidelity

**The designer's copy-verbatim claim is essentially TRUE for prose and FALSE in two
material respects.** Verified by exact text comparison across all nine, four of them
sentence by sentence (capital-gains-tax, section-24-and-tax-relief,
incorporation-and-company-structures, non-resident-landlord-tax) plus portfolio-management
in full.

### What survived

- **Every essay paragraph.** Paragraph counts match on all nine (10/10 on seven hubs, 9/9
  on non-resident-landlord-tax and property-types-and-specialist-tax). All five sections
  survive on all nine. Intro/standfirst, CTA heading, CTA body, submit label all verbatim.
- **Entities correctly decoded** (`&apos;`→`'`, `&ldquo;`/`&rdquo;`→curly quotes, e.g.
  `Property_zip/.../property-types-and-specialist-tax/page.tsx:61`).
- **JSON-LD graph shape preserved**: the same two-node `@graph` (BreadcrumbList +
  CollectionPage). Ours at e.g. `Property/web/src/app/blog/capital-gains-tax/page.tsx:36-61`,
  theirs at `BlogCategoryHub.tsx:64-89`.
- **`alternates.canonical`, `openGraph`, `twitter`** byte-identical to our pre-edit state
  on all nine.
- **No FAQ blocks and no internal links existed inside our essay copy**, so the "nothing
  was dropped" claim holds for those. Verified by grep across all nine.

### What was actually dropped or altered

1. **One undeclared heading reword.** Ours
   `non-resident-landlord-tax/page.tsx:121` "ATED and the Overseas Entities Register" →
   theirs `:59` "ATED and the Register of Overseas Entities". Arguably a correction (our
   own body copy at `:126` says "Register of Overseas Entities"), but it is not
   sentence-casing and was not declared. Accept it.
2. **`CollectionPage.name` degraded.** Ours sets it to the full SEO title, e.g.
   `` `${categoryName} for Property Investors` `` (`capital-gains-tax/page.tsx:49`);
   the template hardcodes `name: categoryName` (`BlogCategoryHub.tsx:77`). Affects the
   seven hubs whose title carries a suffix. **Re-apply ours** — make `name` a prop.
3. **Per-article publication dates dropped from every hub.** Ours renders
   `<time dateTime={post.date}>` per card (`capital-gains-tax/page.tsx:154-158`);
   `HubArticleList` renders title + summary + read time only (`HubArticleList.tsx:65-79`).
4. **~641 crawlable article links dropped** — see §4, this is the big one.
5. **Added copy the owner has not signed off.** The template swaps our hand-rolled
   emerald-gradient `LeadForm` panel (`capital-gains-tax/page.tsx:183-193`) for
   `LeadCTAPanel` with three hardcoded proof points and a footnote
   (`BlogCategoryHub.tsx:182-193`): "Property tax only / Section 24, CGT and MTD every
   day", "Fixed fees, quoted upfront", "Same accountant every time", "No obligation and no
   hard sell. If your position is already right, we will say so." Needs owner sign-off,
   and needs factual QA against `docs/Property/house_positions.md`.

### Our post-snapshot edits, to re-apply on top of their template

Base `1d68a570` matches the designer snapshot exactly, so every item below is missing from
theirs. Two classes, present on all nine:

**(a) metadata title: drop the `| ${siteConfig.name}` suffix** (all nine):

- `capital-gains-tax`, `incorporation-and-company-structures`, `making-tax-digital-mtd`,
  `portfolio-management`, `section-24-and-tax-relief`:
  `` `${categoryName} for Property Investors | ${siteConfig.name}` `` → `` `${categoryName} for Property Investors` ``
- `landlord-tax-essentials`: → `` `${categoryName}` ``
- `property-accountant-services`: → `` `${categoryName}` ``, **and** description →
  `"Find and compare specialist property accountants across the UK. Pricing guides, service comparisons, location recommendations and career insights."`
- `property-types-and-specialist-tax`: → `` `${categoryName} for UK Landlords` ``, **and**
  description → `"Tax guidance for specialist property types: HMOs, commercial property, serviced accommodation, holiday lets, student housing and development."`
- `non-resident-landlord-tax`: title → literal `"Non-Resident Landlord Tax Guides"`,
  description → `"UK tax for non-resident landlords and overseas property investors: NRL scheme, withholding tax, non-resident CGT, double taxation, ATED and compliance."`

**(b) em-dash removal (house rule).** Both sides removed them; we chose a different mark in
seven places. Ours is canonical (house style prefers comma or full stop, not colon or
semicolon):

| file (theirs) : line | theirs | ours (keep) |
|---|---|---|
| capital-gains-tax:40 | "applies to the profit**:** the difference" | "applies to the profit**,** the difference" |
| capital-gains-tax:54 | "with your tenant**;** simply letting out" | "with your tenant**. S**imply letting out" |
| incorporation:61 | "a director's loan account**:** money the company owes you" | "a director's loan account**,** money the company owes you" |
| landlord-tax-essentials:40 | "critical for planning**:** even a modest portfolio" | "critical for planning**. E**ven a modest portfolio" |
| making-tax-digital-mtd:54 | "not sufficient**:** you need bridging software" | "not sufficient**. Y**ou need bridging software" |
| non-resident:41 | "remove the tax liability**;** it simply shifts" | "remove the tax liability**. I**t simply shifts" |
| property-types:47 | "held personally**:** full interest deductions remain" | "held personally**, so** full interest deductions remain" |

All other em-dash sites resolved identically on both sides. Conversely, **keep theirs** on
the en-dash rewrites in `portfolio-management` (`0.5–1%`→`0.5 to 1%`, `8–12%`→`8 to 12%`);
we still carry the en-dashes at ours `:109` and `:115` and theirs is better against house
style.

### The tenth hub the designer never saw

`Property/web/src/app/blog/property-finance/page.tsx` — 196 lines, 34 posts, 5 sections,
9 essay paragraphs, own BreadcrumbList + CollectionPage JSON-LD, CTA "Planning the Tax
Side of a Property Finance Decision?". No designer counterpart; convert by hand to
`BlogCategoryHub`. It already carries `&rsquo;` twice which needs decoding on conversion.
It will appear automatically in the template's "other topics" band on the other nine,
because that band is driven by `getAllCategories()`.

### Bonus: the middleware shadowing bug is real AND live in the monorepo

CONTEXT §6.3 asked us to confirm. Confirmed, and it is worse than "confirm the bug exists":

- `Property/web/src/middleware.ts:165` — `"property-accountant-services": "property-accountant-services"` in `SLUG_TO_CATEGORY_MAP`
- `Property/web/src/middleware.ts:423` — `"property-accountant-services": "/blog/property-accountant-services/what-does-a-property-accountant-do"` in `DUPLICATE_REDIRECTS`

Live behaviour verified 2026-08-22:

```
GET /blog/property-accountant-services  ->  301
Location: /blog/property-accountant-services/what-does-a-property-accountant-do  (200)
```

So a 197-line hub page indexing 63 articles has **never rendered in production**, and its
63 outbound links have never existed. The URL is also in `sitemap.xml`, which means we are
submitting a redirecting URL to Google. Fix = delete both map entries (designer's fix,
`middleware.ts`). Standalone, no port dependency, and a `DUPLICATE_REDIRECTS` deletion is
the safe direction (removing a 301, not adding one — consistent with the standing
never-collapse rule).

---

## 4. Pagination and client payload

### The designer's approach is compatible with our build. It does not threaten the 19 MB limit.

**Our constraint, restated from the code, not memory:** the /blog index once serialised
every article's `contentHtml` into the client payload and pushed the page past Vercel's
19 MB body limit (`FALLBACK_BODY_TOO_LARGE`). The fix is documented in place at
`Property/web/src/app/blog/page.tsx:35-47` and enforced by the projection type at
`Property/web/src/components/blog/BlogListWithSearch.tsx:11-14`
(`Pick<BlogPost, "title"|"summary"|"category"|"slug"|"date"> & { categorySlug: string }`).
Separately, `Property/web/src/app/blog/[category]/[slug]/page.tsx:18` sets
`export const dynamicParams = false`, which removes the article fallback shell entirely.

**Their `HubArticleList` follows the same discipline**, explicitly and with the reason in a
comment: `HubArticleList.tsx:8-16` defines `HubArticle = {slug, title, summary?, readTime}`
and `BlogCategoryHub.tsx:53-61` precomputes `readTime` server-side via
`calculateReadTime(post.contentHtml)` so `contentHtml` never crosses the boundary.
**Verified — no `contentHtml` reaches any client component in their blog code.**

**Measured, not estimated.** I computed the exact serialised size of the
`{slug,title,summary,readTime}` projection for every category from the 783 markdown files:

| posts | payload | category |
|---|---|---|
| 163 | 145.0 KB | Landlord Tax Essentials |
| 160 | 170.5 KB | Incorporation & Company Structures (both spellings) |
| 156 | 168.3 KB | Property Types & Specialist Tax (both spellings) |
| 63 | 36.2 KB | Property Accountant Services |
| 54 | 33.3 KB | Capital Gains Tax |
| 47 | 50.0 KB | Non-Resident Landlord Tax |
| 46 | 28.1 KB | Section 24 & Tax Relief |
| 41 | 35.6 KB | Making Tax Digital (MTD) (both spellings) |
| 34 | 22.5 KB | Property Finance |
| 19 | 11.8 KB | Portfolio Management |
| **783** | **701.5 KB** | whole corpus |

Worst single hub is ~170 KB against a 19 MB ceiling — **0.9% of budget. No regression
risk.** The whole corpus at 701 KB would still be fine; the original blow-up was
`contentHtml`, which is roughly 100x larger per post.

### How to measure it, for the record

1. `cd Property/web && npm run build`, then read the "First Load JS" and the route table;
   `/blog/[category]` moving from a static server page to one carrying a client chunk will
   show there.
2. The authoritative number is the RSC flight payload: `curl` the deployed page and measure
   the `self.__next_f.push` payload size, or in DevTools take the `?_rsc=` response size on
   a client navigation.
3. The failure mode is a build/deploy-time error string, `FALLBACK_BODY_TOO_LARGE`, not a
   silent degradation — so `npm run build` locally is a sufficient gate.
4. Cheap standing check: the projection type. Keep `HubArticle` as an explicit field list
   (not `BlogPost`), so adding `contentHtml` requires someone to type it.

### But there IS a regression, and it is not payload size — it is crawlable links

Our hubs today render **every** post in the category as a server-rendered `<a>`.
Verified live, 2026-08-22, counting unique `href="/blog/<cat>/<slug>"` in the delivered
HTML:

| hub | ours, live today | theirs, as written |
|---|---|---|
| `/blog/landlord-tax-essentials` | **163** | 12 |
| `/blog/incorporation-and-company-structures` | **160** | 12 |
| `/blog/capital-gains-tax` | **54** | 12 |
| (nine hubs total) | **749** | **108** |

`HubArticleList` is `"use client"` with `postsPerPage = 12` (`HubArticleList.tsx:28`) and
slices at `:38-41`; `NumberedPagination` fires `onPageChange` state callbacks
(`HubArticleList.tsx:89`), not `<a href>`. So pages 2..N have no crawl path and there is
no `rel=next/prev`.

For context, our `/blog` archive **already** has this problem — it serves only 24 article
links (verified live) because `BlogListWithSearch` is client-paginated at 12/page. Which
means the nine hubs are currently the **only** full HTML crawl path to the 783 articles
apart from `sitemap.xml`. Taking `HubArticleList` as-written removes it.

Partially offsetting: the template adds ~10 chrome links per hub (an "other topics" band
linking every sibling hub, `BlogCategoryHub.tsx:203-214`, plus `/blog`, plus two hero jump
links). Chrome goes 4 → ~14; articles go N → 12. On the three big hubs that is a 90%+ net
loss.

**Recommendation:** port the template, but before it goes near production either
(a) set `postsPerPage` to the full category count on the hubs (keeps the design, keeps the
links, costs a long page — which is exactly what we have today and what the owner has been
ranking with), or (b) make pagination real routes (`/blog/<cat>/page/2`) so every page is
crawlable, or (c) keep client pagination for the visible grid but emit the full link list
server-side in a visually hidden `<nav>`. (a) is the laziest and reverses cleanly; (b) is
the correct one if the owner wants the shorter page. This is a decision for the owner
because it trades a UX improvement he asked for against ~640 internal links feeding the
cluster coverage programme.

---

## 5. `lib/blog.ts` category canonicalisation

### The 4-way divergence: real, but it is a 2-way divergence today, and there are now TEN categories

Enumerated directly from the frontmatter of all 783 files in
`Property/web/content/blog/*.md` (2026-08-22). **13 distinct `category:` strings across
10 slugs:**

| posts | `category:` string | slug |
|---|---|---|
| 163 | `Landlord Tax Essentials` | landlord-tax-essentials |
| 137 | `Incorporation & Company Structures` | incorporation-and-company-structures |
| **23** | **`Incorporation and Company Structures`** | same slug |
| 129 | `Property Types & Specialist Tax` | property-types-and-specialist-tax |
| **27** | **`Property Types and Specialist Tax`** | same slug |
| 63 | `Property Accountant Services` | property-accountant-services |
| 54 | `Capital Gains Tax` | capital-gains-tax |
| 47 | `Non-Resident Landlord Tax` | non-resident-landlord-tax |
| 46 | `Section 24 & Tax Relief` | section-24-and-tax-relief |
| 34 | `Making Tax Digital (MTD)` | making-tax-digital-mtd |
| **7** | **`Making Tax Digital MTD`** | same slug |
| 34 | `Property Finance` | **property-finance — NOT IN THEIR MAP** |
| 19 | `Portfolio Management` | portfolio-management |

So: three categories carry a **2-way** split (not 4-way) affecting **57 posts**, and every
variant does slugify to the same hub, as the designer said. Their `CANONICAL_CATEGORY_NAMES`
(`Property_zip/web/src/lib/blog.ts`, 9 entries) is correct for all nine it covers.

**It is missing `"property-finance": "Property Finance"`.** `categoryDisplayName()` falls
back to `post.category`, so this is safe rather than broken, but the map must be extended
on port or the tenth hub silently sits outside the canonicalisation guarantee.

### Does adopting `categoryDisplayName()` break any existing surface? No — but 5 of the 16 call sites must NOT be converted.

Every place we touch `post.category` today, and the correct disposition:

| file:line | use | disposition |
|---|---|---|
| `src/app/blog/page.tsx:44` | `category: post.category` into the client list projection | **convert** — this is exactly what the designer converted; the card eyebrows show the drift |
| `src/components/blog/BlogListWithSearch.tsx:152` | renders `{p.category}` on the card | **converted implicitly** by the above |
| `src/components/blog/BlogListWithSearch.tsx:45` | search filter `p.category.toLowerCase().includes(query)` | **converted implicitly**; a search for "and company structures" stops matching, but a search for "&" starts working consistently. Net improvement. |
| `src/components/blog/BlogPostRenderer.tsx:168` | renders `{post.category}` in the header eyebrow | **convert** |
| `src/lib/blog.ts:128` | `categoryMap.set(slug, { name: post.category, ... })` | **convert** — this is the designer's own change and is what makes `getAllCategories()` stable |
| `src/lib/blog.ts:106` | `slugifyCategory(post.category)` | **DO NOT convert.** This is the slug derivation and must keep reading raw frontmatter or it becomes circular. |
| `src/components/blog/BlogPostRenderer.tsx:134` | `CTA_BY_CATEGORY[post.category]` lookup | **DO NOT convert to display name — re-key the map on slug.** See below. |
| `src/components/blog/BlogPostRenderer.tsx:140` | `isMTDPost = post.category === "Making Tax Digital (MTD)"` | **DO NOT convert — compare `categorySlug === "making-tax-digital-mtd"`.** See below. |
| `src/components/blog/BlogPostRenderer.tsx:276` | `<InlineMiniLeadForm topic={post.category} />` | **DO NOT convert blindly.** This is a lead-attribution value that lands in the leads table. Changing it changes historical comparability. Owner/analytics call, not a drive-by. |
| `src/app/blog/[category]/[slug]/page.tsx:59,70` | `buildOgImageUrl(post.h1, post.category)` | cosmetic (OG image label). Convert if easy; harmless either way. |
| `src/app/blog/[category]/[slug]/page.tsx:88` | `getRelatedPosts(post.slug, post.category, 3)` | **DO NOT convert** unless `getRelatedPosts` is also slug-normalised — today it matches on the raw string, so the 23 "and" posts only relate to each other, never to the 137 "&" posts. See the sub-finding below. |
| `src/app/feed.xml/route.ts:39` | `<category>` in RSS | convert (cosmetic, consistency) |
| `src/app/page.tsx:626` | renders `{post.category}` on the homepage card | **convert** |
| `src/lib/schema.ts:31` | `buildOgImageUrl(post.h1, post.category)` | cosmetic |
| `src/lib/schema.ts:92` | `articleSection: post.category` in BlogPosting JSON-LD | **convert** — inconsistent `articleSection` across a category is a real structured-data smell |

**Nothing breaks.** `categoryDisplayName(slug, fallback)` is total (falls through to the
raw string), so worst case is no change. The risk is entirely in converting the three
lookup/identity sites, which must be re-keyed on slug rather than switched to the display
name.

### NEW FINDING — bug #3, live, that canonicalisation alone does NOT fix

`CTA_BY_CATEGORY` (`BlogPostRenderer.tsx:29-75`) is keyed on the **raw frontmatter string**.
The 57 divergent-spelling posts miss every key and fall through to the generic
`getActiveCta(niche).blog.*` copy at `:134-138`.

Verified live, 2026-08-22, causation proven by contrast on the same hub:

| URL | frontmatter `category:` | rendered `#enquiry-form-heading` |
|---|---|---|
| `/blog/incorporation-and-company-structures/family-investment-company-mechanics-share-classes-property` | `"Incorporation and Company Structures"` | **"Need help with your property tax?"** (generic) |
| `/blog/incorporation-and-company-structures/accountant-payroll-services` | `"Incorporation & Company Structures"` | "Considering incorporating your portfolio?" (correct) |
| `/blog/incorporation-and-company-structures/starting-property-business-sole-trader-vs-ltd-vs-partnership` | `"Incorporation & Company Structures"` | "Considering incorporating your portfolio?" (correct) |

**57 posts are serving the generic CTA instead of the category-specific one.** Same
mechanism costs the 7 `"Making Tax Digital MTD"` posts their `MTDCountdown` block, because
`isMTDPost` (`:140`) is an exact string equality against `"Making Tax Digital (MTD)"`
(verified by code read; not separately verified in a browser).

Separately, the 34 `Property Finance` posts have **no** `CTA_BY_CATEGORY` entry at all,
so all 34 serve the generic CTA. That looks like an omission from when the tenth category
was created, not a spelling bug.

**Fix (lazy, root-cause, one place):** re-key `CTA_BY_CATEGORY` on category **slug**, look
up with `categorySlug` (already a prop, `BlogPostRenderer.tsx:91`), and change `isMTDPost`
to `categorySlug === "making-tax-digital-mtd"`. That kills all three symptoms at once and
makes the map immune to any future frontmatter spelling. Add a `property-finance` entry
while there (copy needs writing). This is independent of the port and should ship with the
§2 hot fix.

**Sub-finding, unverified, flagged for the plan:** `getRelatedPosts(post.slug, post.category, 3)`
(`[category]/[slug]/page.tsx:88`, implemented `lib/blog.ts:65`) appears to match on the raw
category string, which would mean the 23 "and" posts and the 137 "&" posts form two
disconnected related-article pools inside one hub. **Inferred from the call signature; I
did not read the body of `getRelatedPosts` closely enough to state it as fact.** Worth
five minutes before the port.

---

## 6. Post-count delta: 697 theirs vs 783 ours

### The delta is not 86. It is +91 and -5.

Set difference computed over the two `content/blog/` directories:

- **91 posts exist in ours and not in theirs** (not ~86).
- **5 posts exist in theirs and not in ours** — the four city posts plus
  `leeds-property-accountant-specialist-tax-services.md`. See §7.

91 new, grouped by category:

| n | category |
|---|---|
| 34 | Property Finance (the whole bridging/BTL-mortgage cluster) |
| 29 | Property Types & Specialist Tax (capital allowances, leasehold, MEES/EPC) |
| 16 | Capital Gains Tax (estate-agent-fees / cost-of-selling cluster) |
| 12 | Landlord Tax Essentials (compliance certificates, licensing, RRA 2026) |

### Would any of the 91 break under their template? No crashes. One display bug.

Their template reads `post.date`, `post.dateModified`, `post.author`, `post.summary`,
`post.image`, `post.altText`, `post.h1`, `post.category`, `post.faqs`.

**Zero of the 91 are missing** `title`, `h1`, `category`, `summary`, `date`, `author`,
`altText` or `faqs`.

Three findings worth naming:

1. **`dateModified` is absent on 31 of the 91.** Their new "Updated {date}" emerald pill is
   guarded — `hasUpdate = !!(post.dateModified && post.dateModified !== post.date)`, and the
   pill only renders when `hasUpdate` — so **these 31 render correctly, they just never show
   the Updated pill.** Not a break. Named examples:
   `average-london-estate-agent-fees.md`, `can-you-sell-a-house-without-an-estate-agent.md`,
   `capital-allowances-for-{care-homes,dental-practices,gp-surgeries,hospitality,hotels,industrial-units,offices,pubs-and-restaurants,student-accommodation}.md`,
   `capital-allowances-furnished-holiday-lets.md`, `capital-allowances-on-cars-and-vehicles.md`,
   `cheapest-estate-agent-fees-uk.md`, `cost-of-moving-house-uk.md`,
   `embedded-capital-allowances-commercial-property.md`,
   `estate-agent-contract-tie-in-periods.md`, `estate-agent-fees-for-renting.md`,
   `full-expensing-and-first-year-allowances.md`,
   `how-much-do-estate-agents-charge-to-sell-a-house.md`, plus 11 more.
   **Note the asymmetry: the designer's design gives recency an emerald trust signal, and
   34% of our newest posts cannot display it.** Worth a frontmatter backfill as a separate
   item, not a blocker.
2. **`image: ""` and `schema: ""` on all 91** — the key is present with an empty string, not
   absent. This is the **existing corpus-wide pattern** (`schema: ""` on all 783,
   `image: ""` on 422/783), not something the new posts introduced. `post.image ? ... : null`
   in the renderer treats `""` as falsy, so the hero image block is correctly skipped. No
   regression.
3. **No `readTime` field exists in the corpus at all**, and none is needed — `readTime` is
   computed at runtime by `calculateReadTime()` (`lib/blog.ts:137`, word count / 238 wpm),
   which both templates call server-side. The brief's worry about a missing `readTime`
   frontmatter field is a non-issue. There is likewise no `heroImage`/`hero_image` field
   anywhere; the field is `image`.

**Named post that would break: none.** Verified.

### Type vs parser (answers the "required field" question properly)

`src/types/blog.ts`: non-optional = `title, slug, date, author, category, metaTitle,
metaDescription, h1, summary`. Optional = `altText, image, schema, canonical, faqs,
reviewedBy, reviewerCredentials, reviewedAt, dateModified, howToSteps, noindex`.

`parsePostFile()` (`src/lib/blog.ts:19-41`) defaults several of those supposedly-required
fields anyway: `date ?? ""`, `author ?? ""`, `category ?? "General"`,
`metaTitle ?? title!`, `metaDescription ?? ""`, `h1 ?? title!`, `summary ?? ""`.
That type/parser mismatch is **latent, not live**, because `parsePostFile` first calls
`assertFrontmatter(data, STANDARD_MANIFEST, filePath)`
(`packages/web-shared/lib/frontmatter.ts`), which throws at build time if `slug`, `title`,
`date`, `category` or `metaDescription` is missing or empty. All 783 pass. So the build is
already the gate — no new check is needed for the port.

Full key census, 783 posts, 32 distinct keys: 783 each of `title, slug, canonical, date,
author, category, metaTitle, metaDescription, altText, image, schema, faqs`; 782 `h1`;
782 `summary`; 612 `reviewedBy`; 612 `reviewerCredentials`; 597 `dateModified`;
582 `reviewedAt`; 351 `imageCredit`; 337 `editorialNote`; 82 `howToSteps`;
54 `metaTitle_prev`; 54 `metaDescription_prev`; 51 `generator`; 37 `sourcesVerifiedAt`;
37 `sourceDomains`; 3 `noindex`; 2 `metaTitle_prev_2`; 2 `metaDescription_prev_2`;
1 each `howTo`, `sources`, `sourceDomainsHint`.

One post estate-wide lacks `h1` and `summary`: `non-resident-landlord-scheme-uk-complete-guide.md`.
It is **not** one of the 91 new posts, so it is a pre-existing condition, and the parser
defaults `h1` to `title` so it renders. Flagged, not urgent.

---

## 7. The four city posts — ours wins, and it is not close

The brief's premise is slightly off: we did not shrink them, we **deleted them**.

| file | theirs | ours |
|---|---|---|
| `birmingham-property-accountant.md` | 237 lines | absent |
| `bristol-property-accountant.md` | 238 lines | absent |
| `london-property-accountant.md` | 315 lines | absent |
| `manchester-property-accountant.md` | 123 lines | absent |
| `leeds-property-accountant-specialist-tax-services.md` | 118 lines | absent |

`git diff 1d68a570 HEAD --stat` shows pure deletions, zero additions, all five landing in
one commit: **`bbfe0437` "feat(property): commercial money tier + hubs + city consolidation
+ demotion sweep"**, in the same commit that adds
`src/app/services/property-accountant/page.tsx` (+592). That is a deliberate consolidation:
five thin city blog posts folded into one service page plus the `/locations/*` pages.

The designer's edit on each is a **single link swap** — `/locations/<city>` →
`/services/property-accountant` (manchester → `/services/landlord-accountant`, plus one
body-paragraph mention removed). They were bringing the posts into line with the newer
service pages they had seen on the live site. Their working method, exactly as CONTEXT §4
describes it.

**Ours wins.** Three reasons, in order of weight:

1. **Their edit is a link fix on a page we have deliberately retired.** There is no content
   in it. Porting it would mean resurrecting five posts to apply one `href` change each.
2. **The consolidation is already live and correctly redirected.** Verified 2026-08-22:
   `/blog/birmingham-property-accountant` → **301** → `/locations/birmingham`, and
   `/blog/property-accountant-services/birmingham-property-accountant` → **301** →
   `/locations/birmingham`. Same for London. Equity is preserved and the destination is a
   better page. Reinstating the posts would strand five live 301s.
3. **Their link target argues for our side anyway.** They redirected the internal link from
   `/locations/<city>` to `/services/property-accountant` — the page our consolidation
   commit created. The designer was independently converging on the same information
   architecture.

**Action: ignore all four (five) designer content edits. No port, no back-patch.** This
matches CONTEXT §4's standing line ("Their four content edits are one-liners on city posts
we have since consolidated. Ignore theirs.") and is now verified rather than assumed.

---

## 8. `font-serif` — their claim is true for their tree, false for ours

**Theirs: verified zero.** `grep -rn "font-serif" src/` in
`Property_zip/web/` returns nothing.

**Ours: 34 occurrences across 6 files** (verified, `grep -rn "font-serif" src/` in
`Property/web/`):

| file | count | notes |
|---|---|---|
| `src/app/terms/page.tsx` | 14 | lines 33, 40, 51, 59, 67, 78, 86, 91, 105, 110, 115, 120, 125, 130 |
| `src/app/privacy-policy/page.tsx` | 12 | lines 36, 47, 63, 93, 111, 139, 199, 206, 239, 246, 254, 260 |
| `src/app/cookie-policy/page.tsx` | 6 | lines 33, 40, 74, 86, 155, 160 |
| `src/app/not-found.tsx` | 1 | line 9 |
| `src/components/blog/BlogListWithSearch.tsx` | 1 | line 154, the archive card `<h2>` |
| `src/app/page.tsx` | 1 | **line 590** |

The designer's sweep covered exactly five of these six: the archive, `not-found`, and the
three legal pages. **`src/app/page.tsx:590` is not in their list and is not in their
"modified" manifest** — it is a decorative opening-quote glyph
(`<div className="text-4xl leading-none text-emerald-600 font-serif" aria-hidden="true">&ldquo;</div>`)
in a testimonial. Two possibilities: their homepage was rewritten so heavily the line no
longer exists, or they missed it. Either way, **if we adopt "font-serif is banned" as a
rule, `page.tsx:590` needs a decision** — it is a deliberate typographic flourish on a
quote mark, not accidental drift, and it is `aria-hidden` decoration. Recommend keeping it
and scoping the ban to headings and body copy, or replacing the glyph with an SVG.

All five files the designer did sweep come to us free: we have not modified any of them
since the snapshot except `BlogListWithSearch.tsx`, which is a take-theirs file anyway.

---

## 9. What to do, in order

### Ship now, independent of the port (three hot fixes, all reversible in one line each)

| # | Fix | Files | Revert |
|---|---|---|---|
| 1 | White card around `LeadForm` on the article enquiry section | `Property/.../BlogPostRenderer.tsx:301` + 3 sibling sites (generalist ×2, digital-agency ×1) | revert 4 lines |
| 2 | Delete the two shadowing map entries so `/blog/property-accountant-services` renders | `Property/web/src/middleware.ts:165` and `:423` | re-add 2 lines |
| 3 | Re-key `CTA_BY_CATEGORY` and `isMTDPost` on `categorySlug`, add a `property-finance` entry | `Property/.../BlogPostRenderer.tsx:29-75, 134, 140` | revert 1 file |

Together these touch four files, fix three live production defects across ~783 articles and
one unreachable hub, and carry no design-system dependency. **Deploy is owner-triggered;
this is a recommendation, not an action taken.**

### Then the port, in dependency order

1. Port the four missing design-system prerequisites first: `ui/page-blocks.tsx` (`Eyebrow`),
   `layout/HeroBrickBackdrop.tsx`, `property/LeadCTAPanel.tsx`, `blog/BlogSidebarCta.tsx`.
   All four are in the designer's 171 no-conflict files.
2. `TableOfContents.tsx` and `InlineMiniLeadForm.tsx`: take theirs wholesale, no conflict.
3. `BlogPostRenderer.tsx`: take theirs, then re-apply our four changes per §1c. **The trap is
   step 3 of that list** — their file still carries the three pre-extraction split
   functions locally; porting verbatim silently forks logic that now lives in
   `web-shared`.
4. `lib/blog.ts`: take `CANONICAL_CATEGORY_NAMES` + `categoryDisplayName`, **add the tenth
   entry** `"property-finance": "Property Finance"`, keep our `noindex` line
   (`lib/blog.ts:39`). Convert the call sites per §5, and leave the five that must not be
   converted alone.
5. `types/blog.ts`: ours wins outright (theirs is unchanged from base; we added `noindex`).
6. `blog/page.tsx` and `[category]/[slug]/page.tsx`: take theirs, re-apply our
   em-dash-free meta description and the `noindex` robots line.
7. Nine hub pages: take their `BlogCategoryHub` conversion, re-apply our metadata titles and
   the seven punctuation choices (§3), keep theirs on the two en-dash rewrites, restore
   `CollectionPage.name` as a prop, then hand-convert the tenth hub
   (`property-finance`).

### Owner decisions this report surfaces

1. **Hub pagination vs crawlable links (§4).** `HubArticleList` as written costs ~641
   internal links across the nine hubs, and the `/blog` archive already only exposes 24. The
   hubs are currently the only full HTML crawl path to 783 articles. Recommendation: keep
   the template, set `postsPerPage` to the full count, revisit if he wants shorter pages.
2. **`LeadCTAPanel`'s three proof points and footnote (§3)** are new copy the designer wrote.
   Needs sign-off and factual QA against `docs/Property/house_positions.md`.
3. **`font-serif` on `src/app/page.tsx:590` (§8)** — the one instance outside the designer's
   sweep. It is a decorative `aria-hidden` quote glyph. Keep, or replace with an SVG.
4. **`InlineMiniLeadForm topic={post.category}` (§5)** — canonicalising this changes a value
   that lands in the leads table and breaks historical comparability. Analytics call.
5. **`dateModified` backfill on 31 new posts (§6)** — needed before the designer's emerald
   "Updated" recency pill can do its job on the newest content.

---

## 10. Verified vs inferred, for the record

**Verified** (command run, file read end to end, or live URL fetched 2026-08-22):
every `file:line` citation in §1, §2, §2b (Property tree), §3, §4, §5, §6, §7, §8; the three
live-bug confirmations against production HTML; the 783-file category enumeration and
payload measurement; the live crawlable-link counts (163/160/54/24); the five city-post
301s; `font-serif` counts on both sides.

**Inferred, labelled as such:**
- `isMTDPost` costing the 7 `"Making Tax Digital MTD"` posts their `MTDCountdown` — read
  from the code, not confirmed in a browser.
- `getRelatedPosts` splitting each divergent category into two disconnected pools (§5) —
  inferred from the call signature; the function body was not traced.
- Five sibling-site call sites in generalist/digital-agency with the dark class string but
  no traced `LeadForm` within 15 lines (§2b).
- Whether `src/app/page.tsx:590`'s `font-serif` survives in the designer's rewritten
  homepage, or was simply missed (§8).
