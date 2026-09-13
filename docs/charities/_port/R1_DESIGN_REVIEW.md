# R1 — Independent adversarial design review: `charities/web` (Trustee Tax)

Reviewer: independent (R1). Date: 2026-09-14.
Target: post-port production build served at `http://localhost:3133`.
Method: rendered DOM for all 71 routes (69 page routes + 2 `/embed/*`), plus the
single built stylesheet `_next/static/css/3ef3fc7c0cf69589.css` (78,786 bytes),
interrogated in **built byte order**. Reference: `Property/web` (the answer),
`generalist/web` and `Solicitors/web` (kit-consumption reference), including
their own built stylesheets.

No file in this repo was edited except this report. No server was started; no git
write command was run.

**Counts: 2 blocking, 5 should-fix, 6 notes.**

---

## BLOCKING

### B1 — The shared kit stylesheet is never imported, and it takes the only focus indicator on related-article cards with it

**Severity: blocking (WCAG 2.4.7 failure on 23 routes).**
**URL: every article, e.g. `http://localhost:3133/blog/gift-aid/gasds-rules` (23 pages carry `.related-card`).**

`charities/web/src/app/globals.css` does not import
`packages/web-shared/design/globals-standard.css`. Both ported siblings do.

```
$ grep -n '^@import' charities/web/src/app/globals.css
2:@import "tailwindcss" source("..");
6:@import "../../../../packages/site-styles/prose-standard.css";

$ grep -n '^@import' generalist/web/src/app/globals.css
2:@import "tailwindcss" source("..");
4:@import "tw-animate-css";
5:@import "@accounting-network/web-shared/design/globals-standard.css";

$ grep -n '^@import' Solicitors/web/src/app/globals.css
2:@import "tailwindcss" source("..");
4:@import "tw-animate-css";
5:@import "@accounting-network/web-shared/design/globals-standard.css";
```

The result, measured in the built CSS of each site (`1` = selector present in the
site's own built stylesheet, `0` = absent):

```
$ for c in eyebrow-rule related-card tick-draw accordion-up logo-house; do \
    printf "%-16s gen=%s sol=%s cha=%s\n" "$c" \
    "$(grep -l "$c" generalist/web/.next/static/css/*.css | wc -l)" \
    "$(grep -l "$c" Solicitors/web/.next/static/css/*.css | wc -l)" \
    "$(grep -l "$c" charities/web/.next/static/css/*.css | wc -l)"; done
eyebrow-rule     gen=1 sol=1 cha=0
related-card     gen=1 sol=1 cha=0
tick-draw        gen=1 sol=1 cha=0
accordion-up     gen=1 sol=1 cha=0
logo-house       gen=0 sol=0 cha=0
```

charities is the only ported site where these resolve to nothing.

The one that is blocking rather than cosmetic is `.related-card`. The kit's
`RelatedArticles` gives the card body `class="related-card …"` and gives the
title link `focus-visible:outline-none`, on the explicit understanding that the
card supplies the focus ring via `.related-card:focus-within`. The site's own
code says so:

```
$ grep -n "related-card" charities/web/src/components/hubs/HubParts.tsx
23: *   - `RelatedArticles`: its only focus indicator is `.related-card:focus-within`,
```

Rendered DOM at `/blog/gift-aid/gasds-rules`:

```html
<div class="related-card relative flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
  …
  <a class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
     href="/blog/gift-aid/business-donations-to-charity-tax">…</a>
```

And in the built stylesheet:

```
$ grep -c 'related-card' <built css>
0
```

So the link explicitly suppresses its own outline, and the substitute ring does
not exist. **Keyboard focus on every related-article link on 23 pages is
completely invisible.** The `after:absolute after:inset-0` overlay also makes the
whole card the hit target, so there is no fallback affordance anywhere.

Same import also drops:
- `.eyebrow-rule` (64 pages) — the left-to-right draw-in. Degrades safely: the
  bar renders full width because `[data-draw="off"]{transform:scaleX(0)}` is the
  missing half. Animation lost, no visual break.
- `.tick-draw` (homepage) — `stroke-dasharray:24` is set inline and
  `stroke-dashoffset` defaults to `0`, so the ticks render drawn. Animation lost
  only.
- `@keyframes num-glow` / `.story-numeral` — see N5.

**Smallest correct fix:** add the one line the siblings have to
`charities/web/src/app/globals.css`, line 5:

```css
@import "@accounting-network/web-shared/design/globals-standard.css";
```

The file's own comment at globals.css:52 already argues the radius tokens are
byte-identical so "importing that file later is a no-op rather than a fight" —
it is, and it should be imported. Re-verify afterwards that `--radius: 0rem`
still wins (declared at globals.css:53, after the import, so it does).

---

### B2 — Four top-level routes never received the kit hero; they are still on their pre-port heroes

**Severity: blocking (fidelity — this is the port's core deliverable).**
**URLs: `/about`, `/contact`, `/blog`, `/calculators`, and `/calculators/{slug}` (3 pages).**

Rendered first `<section>` of `<main>` on each route, against the routes that
were ported:

```
services.html        <section class="relative flex min-h-[300px] items-center overflow-hidden py-10 sm:min-h-[350px] sm:py-12 lg:py-14 bg-[var(--hero-cream,#fbfaf7)]">
                H1   text-3xl font-bold leading-[1.15] text-balance sm:text-5xl lg:text-6xl text-slate-900
guides.html          (same kit recipe)
research.html        (same kit recipe)
for.html             (same kit recipe)
services__gift-aid.html  (same kit recipe, bg-slate-900 / text-white)

about.html           <section class="bg-primary-600 py-12 sm:py-16 lg:py-20">
                H1   text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl
contact.html         <section class="bg-primary-600 py-12 sm:py-16 lg:py-20">
                H1   text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl
blog.html            <section class="bg-slate-50 py-12 sm:py-16">
                H1   text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl
calculators.html     <section class="bg-slate-50 py-12 sm:py-16">
                H1   text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl
calculators__gift-aid-calculator.html  <section class="bg-slate-50 py-12 sm:py-16">
```

Source confirms the divide — `PageHero` is imported on the ported routes and
absent on these four:

```
$ grep -n "Hero" charities/web/src/app/{services,research,about,blog,calculators,contact}/page.tsx
charities/web/src/app/services/page.tsx:4:import { CtaBand, HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
charities/web/src/app/services/page.tsx:19:      <PageHero
charities/web/src/app/research/page.tsx:4:import { HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
charities/web/src/app/research/page.tsx:68:      <PageHero
```

(no match for about, blog, calculators, contact)

Both references put all four on the kit hero:

```
$ grep -o '<section[^>]*className="[^"]*"' generalist/web/src/app/about/page.tsx | head -1
<section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14"
$ grep -o '<section[^>]*className="[^"]*"' generalist/web/src/app/contact/page.tsx | head -1
<section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14"
$ grep -o '<section[^>]*className="[^"]*"' generalist/web/src/app/blog/page.tsx | head -1
<section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14"
$ grep -o '<section[^>]*className="[^"]*"' generalist/web/src/app/calculators/page.tsx | head -1
<section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14"
$ grep -n "<h1" generalist/web/src/app/calculators/\[slug\]/page.tsx
86:  <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
$ grep -n "<h1" Property/web/src/app/calculators/\[slug\]/page.tsx
77:  <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
```

Three separate hero systems now coexist on this site: the kit recipe
(hero-cream/slate-900, `min-h-[300px]`, `text-balance`, `sm:text-5xl lg:text-6xl`),
a `bg-primary-600` block on /about and /contact, and a `bg-slate-50` block on
/blog, /calculators and all three calculator detail pages. A visitor moving
Services → Blog → About sees the page masthead change ground, height and type
scale twice. This is exactly the thing a design port exists to remove.

`/for` and `/guides` are on the kit hero, so the hub set is internally
inconsistent too: /guides and /research get the kit hero, /blog and /calculators
do not.

**Smallest correct fix:** replace the first `<section>` on each of
`src/app/{about,contact,blog,calculators}/page.tsx` and
`src/app/calculators/[slug]/page.tsx` with the `PageHero` already in
`@/components/hubs/HubParts`, the way `services/page.tsx:19` does. Choose the
ground per the ported convention already in use here (hub = `hero-cream`, detail
= `slate-900`); do not invent a fourth.

---

## SHOULD-FIX

### S1 — `tw-animate-css` is not imported; the accordion has no keyframes on 7 pages

**URL: `http://localhost:3133/for/cics` (and 6 more pages with FAQ accordions).**

The built stylesheet contains **zero** `@keyframes` rules:

```
$ grep -o '@keyframes [a-z-]*' <built css> | sort -u
(no output)
```

while the DOM asks for two animations, 17 elements each:

```
$ grep -ho 'animate-[^" ]*' pages/*.html | sort | uniq -c | sort -rn
     17 animate-accordion-up
     17 animate-accordion-down
$ grep -c 'accordion-up' <built css>
0
```

Emitted by `packages/web-shared/design/primitives/accordion.tsx:55`. Both
siblings have the keyframes (`gen=1 sol=1`, table in B1). Degrades safely —
Radix sets `hidden=""` on closed content, so the panel opens and closes
instantly rather than breaking — but the animation the port specified is dead.

**Smallest correct fix:** `@import "tw-animate-css";` in
`charities/web/src/app/globals.css`, the line the siblings have at line 4.
(`tw-animate-css` is already a dependency of the ported siblings in this
monorepo; confirm it resolves from `charities/web` before committing.)

### S2 — Eyebrow-rule and tick-draw entrance animations are dead on 64 and 1 pages

Same root cause as B1, listed separately because it is a designed behaviour the
port spec asked for, not only a missing selector. Evidence and fix are in B1.
Rendered proof that it degrades rather than breaks (`/services`):

```html
<span aria-hidden="true" class="block h-0.5 w-6 flex-none overflow-hidden rounded-full">
  <span data-draw="off" class="eyebrow-rule block h-full w-full rounded-full bg-primary-600"></span>
</span>
```

`data-draw="off"` is inert because the rule that reads it is not loaded, so the
bar is simply always fully drawn.

### S3 — The footer renders 2 of its 4 columns; nothing in the footer links to any service or guide page

**URL: every page, e.g. `http://localhost:3133/`.**

Rendered footer nav:

```
$ (footer nav headings, rendered)
p | Calculators | text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4
p | Company    | text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4
$ (grid class on <nav aria-label="Footer">)
grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4
```

`SiteFooter.tsx:88-114` builds four columns — Services, Resources, Calculators,
Company — from `nav`, then `.filter(c => c.items.length > 0)`. Services and
Resources are built from `childrenOf("/services")` and
`childrenOf(resourcesHref)`. `charities/niche.config.json` gives no `children`
to any nav entry:

```
$ python -c "import json;print(json.load(open('charities/niche.config.json'))['navigation'])"
[{'label':'Services','href':'/services'}, {'label':'Calculators','href':'/calculators'},
 {'label':'Guides','href':'/guides'}, {'label':'Research','href':'/research/uk-small-charity-finance-index'},
 {'label':'Blog','href':'/blog'}, {'label':'About','href':'/about'}, {'label':'Contact','href':'/contact'}]
```

generalist gives its Resources entry four children, which is why its footer
fills. Two consequences: from 640px up, half the right-hand footer block is
empty whitespace inside a `sm:grid-cols-4` grid; and none of the five
`/services/*` pages or eight `/guides/*` pages has a single footer link.

Note the port *did* correctly override the two Property literals in this
component — `resourcesHref: "/guides"` (kit default `/landlord-tax`) and a
`companyItems` list without `/locations` (`PageShell.tsx:80-87`). The wiring is
right; the data feeding it is empty.

**Smallest correct fix:** add `children` to the `Services` and `Guides` entries
in `charities/niche.config.json` (the five service slugs, and the lead guides),
the way `generalist/niche.config.json` does. No component change.

### S4 — The primary nav's "Research" link bypasses the `/research` hub, orphaning it and `/for`

**URL: every page's header; target `/research/uk-small-charity-finance-index`.**

```
$ (rendered header nav hrefs)
/services                                     Services
/guides                                       Guides
/research/uk-small-charity-finance-index      Research
/blog                                         Blog
/about                                        About
/contact                                      Contact
```

`/research` exists, is in the sitemap, carries a kit hero, breadcrumbs and a
BreadcrumbList, and lists all four studies — but the nav points past it at one
study. Inbound internal link counts across all 71 rendered pages:

```
/research                      4
/for                           2
/services                     69
/guides                       69
/calculators                  69
/blog                         69
```

`/services`, `/guides`, `/calculators` and `/blog` get a link from every page
(the header). `/research` gets 4 and `/for` gets 2. Two built hubs are
effectively unreachable.

**Smallest correct fix:** in `charities/niche.config.json`, change the Research
href to `/research`. `/for` is a separate judgement — either add it to the nav
or accept it as a landing-page-only surface; flagging, not prescribing.

### S5 — Duplicate `Article` JSON-LD node on three blog posts

**URLs:** `/blog/charity-finance/how-much-should-a-charity-hold-in-reserves`,
`/blog/charity-finance/which-charitable-causes-earn-the-most`,
`/blog/charity-governance/how-long-do-uk-charities-last`.

```
$ for f in pages/*.html; do n=$(grep -o '"@type": *"Article"' $f | wc -l); \
    [ "$n" -gt 1 ] && echo "$f Article=$n"; done
blog__charity-finance__how-much-should-a-charity-hold-in-reserves.html Article=2
blog__charity-finance__which-charitable-causes-earn-the-most.html Article=2
blog__charity-governance__how-long-do-uk-charities-last.html Article=2
```

The page renders the full Article node (headline, description, url,
datePublished, publisher, mainEntityOfPage) and then a second, thinner one with
no `url` and no `@id`:

```json
{"@context":"https://schema.org","@type":"Article",
 "headline":"How Much Should a Charity Hold in Reserves? Reserves Health by Cause",
 "datePublished":"2026-07-20",
 "author":{"@type":"Organization","name":"Trustee Tax Editorial Team"}}
```

Source is a `schema:` key in the post frontmatter:

```
$ sed -n '30,37p' charities/web/content/blog/how-much-should-a-charity-hold-in-reserves.md
schema:
  "@type": "Article"
  "headline": "How Much Should a Charity Hold in Reserves? Reserves Health by Cause"
  "datePublished": "2026-07-20"
  "author":
    "@type": "Organization"
    "name": "Trustee Tax Editorial Team"
```

Two competing Article entities on one URL. A fourth post
(`charity-scrutiny-cliff-…`) has the same frontmatter key but renders only one
Article, so the renderer's handling is not even consistent between posts.

**Smallest correct fix:** delete the `schema:` block from the three post
frontmatters. The `author` is the only field it adds; if that is wanted it
belongs in the page-level Article node, not a second one.

---

## NOTES

**N1 — `.logo-house` is defined nowhere in the estate.** `SiteHeader.tsx:136`
emits it on the wordmark icon on all 69 pages. Only `Property/web/src/app/globals.css:428`
defines it; generalist and Solicitors do not have it in their built CSS either
(`gen=0 sol=0 cha=0`, table in B1). An orphan in the shared kit, not a charities
port miss. Filed so the manager can route it to the kit owner (trap 12).

**N2 — `prose-neutral` is a dead class unique to this site.**
`charities/web/src/app/blog/[category]/[slug]/page.tsx:216` emits
`className="prose prose-neutral mt-10 max-w-none"`. No Tailwind Typography
plugin is installed anywhere in the estate, so the modifier resolves to nothing
(`grep -c prose-neutral` = 0 in charities', generalist's and Solicitors' built
CSS). Neither sibling emits it. Harmless; delete the token.

**N3 — Second instance of the competing-display-utility pattern, 302 elements,
loser is `block`.** Table-of-contents links carry both `block` and `flex`
unmodified. Built byte order: `.block` at 16272, `.flex` at 16320 — `flex` wins,
which is the intent (`items-center` is on the same element), so it renders
correctly. But it is the same latent trap as the header CTA. It comes from the
kit and Property has it too, so it is not a charities miss:

```
$ grep -rn 'block min-h-\[44px\] flex' --include=*.tsx packages Property/web/src
packages/web-shared/content/TableOfContents.tsx:96
packages/web-shared/design/blog/TableOfContents.tsx:70
Property/web/src/components/blog/TableOfContents.tsx:70
```

A full sweep of every element in all 71 rendered pages found exactly two
elements carrying more than one unmodified display utility: this one and the
header CTA (B-verified below). No third instance.

**N4 — Calculator detail pages print the tool name and intro paragraph twice,
back to back.** `/calculators/gift-aid-calculator`:

```
h1 | Gift Aid Calculator || Gift Aid adds 25p to every £1 donated by a UK taxpayer, at no cost…
h3 | Gift Aid Calculator || Gift Aid adds 25p to every £1 donated by a UK taxpayer, at no cost…
```

The h3 is the kit `Calculator` card header (`Calculator.tsx:111-112`). Both
generalist (`calculators/[slug]/page.tsx:89`) and Solicitors (`:89`) print
`tool.intro` above the same component, so this is kit-wide, not a charities
regression. Downgraded to a note for that reason. It is still visibly wrong on
all three calculator pages and worth fixing where it is cheapest — dropping the
hero's `<p>{tool.intro}</p>` in `charities/web/src/app/calculators/[slug]/page.tsx:80`.

**N5 — `@keyframes num-glow` is generated-utility-without-keyframe, but nothing
mounts it.** The built CSS contains
`.animate-\[num-glow_1\.6s_ease-in-out_both\]{animation:num-glow 1.6s ease-in-out both}`
with no matching `@keyframes` (there are none at all — see S1). The keyframe
lives in `globals-standard.css:141`. Nothing in the rendered DOM uses it
(`grep animate-\[num-glow` across all 71 pages: 0 hits), because `WhyUsList` and
`NumberedReasons` are not mounted on this site. `story-numeral` likewise appears
in zero rendered pages. Fixed automatically by B1; latent until then — if anyone
mounts `WhyUsList`, its numerals would sit at `opacity-30` permanently.

**N6 — Homepage has a three-band white run (sections 10-12).** Rendered grounds
in order: `primary-900`, white, slate-50, white, slate-50, white, `primary-900`,
slate-50, white, slate-50, **white, white, white**, slate-50. Sections 10 and 11
are a deliberate pair (10 is `pt-12` with no bottom padding, feeding the CTA),
but section 12 (FAQ, "Common questions") makes it three. Property's own homepage
runs consecutive whites too (`page.tsx` lines 260, 279, 310, 328), so this is
within house tolerance — raising it only as a designer's read: the FAQ band would
land better on `slate-50`, which would also restore strict alternation into the
closing band.

---

## Verified CORRECT (coverage)

- **The header CTA visibility override wins, in built byte order.** This was the
  brief's headline suspicion and it holds up. The element carries both
  `inline-flex` (from `btnPrimary`) and `hidden`; in the built CSS
  `.hidden{display:none}` is at byte 16358 and `.inline-flex{display:inline-flex}`
  at 16437, so `hidden` would indeed lose. The site-local override
  (`globals.css:193-203`, layered in `@layer utilities`) compiles to:
  ```
  73675:header a[data-cta-placement=header][data-cta=header_book]{display:none}
  73771:@media (min-width:64rem){…{display:inline-flex}}
  ```
  Both land ~57,000 bytes *after* `.inline-flex`, and carry specificity (0,2,1)
  against the utilities' (0,1,0), so they win twice over. The selector matches
  the real DOM: `data-cta="header_book" data-cta-placement="header"` is present
  on all 69 non-embed pages, and the element count (69) equals the page count.
  The drawer CTA (`header_mobile`) is correctly untouched, and the burger
  correctly carries `lg:hidden`. **Correct at 390, 768 (hidden), 1024 and 1440
  (shown).**
- **Landmarks.** Exactly one `<main id="main">` on all 69 page routes; zero
  `<main>` and zero `id="main"` on both `/embed/*` routes. Exactly one `<h1>` per
  page route, zero on embeds. Skip link present and pointing at `#main`. One
  `<header>`, one `<footer>`, one `<nav aria-label="Primary">`, one
  `<nav aria-label="Footer">` per page. No nested landmarks anywhere.
- **JSON-LD parses.** Every `application/ld+json` block on all 71 routes parses
  as JSON — zero parse failures. Exactly one organisation node
  (`["ProfessionalService","AccountingService"]`, `@id …#organization`) per page.
  Exactly one BreadcrumbList per page on every route that should have one; `/`,
  `/contact`, `/thank-you`, `/book`, `/complete` and the embeds correctly have
  none. The `@type` choice is the open owner decision and is not reported.
- **Links.** All 71 distinct internal `href` targets across every rendered page
  return HTTP 200. Zero dead links. Every in-page `#anchor` link on every page
  resolves to an element with that `id` (zero orphans). Zero Property route
  literals in any rendered href — no `/locations`, no `/landlord-tax`, no
  `/cgt-calculator`. The two files matching `/landlord/i` are genuine charity-VAT
  copy about opted-to-tax landlords, not port leakage.
- **Property literals in chrome.** `SiteFooter`'s two Property defaults
  (`resourcesHref: "/landlord-tax"`, `companyItems` containing `/locations`) are
  both explicitly overridden in `PageShell.tsx:80-87` and neither appears in the
  rendered footer.
- **Anchor scroll-margin.** `:where([id]){scroll-margin-top:6rem}` is present in
  the built CSS and matches the sticky header height — the trap that bites
  in-page reference links under a sticky header is handled.
- **Responsive overflow.** Every `min-w-[…]`/`w-[…]` token ≥360px across all 71
  pages is exactly two (`min-w-[32rem]`, `min-w-[28rem]`, both homepage tables),
  and both sit inside an `overflow-x-auto` wrapper. No horizontal page scroll
  risk found at 390px.
- **Heading order.** Zero heading-level jumps on 68 of 71 routes. The three
  calculator detail pages jump h1→h3, which is the kit `Calculator` card's own
  `<h3>` and matches the siblings; noted under N4, not reported separately.
- **Undefined-class sweep.** All 567 distinct class tokens across all 71 rendered
  pages were checked against the built stylesheet. 24 resolve to nothing; 17 are
  `lucide-*` library markers (inert by design) plus `lucide`. The remaining 7 are
  the findings above (`eyebrow-rule`, `related-card`, `tick-draw`, `logo-house`,
  `prose-neutral`, and the two accordion animations). No other orphan.
- **Band structure.** Section grounds walked on 17 representative routes across
  all six families. Alternation is coherent everywhere except the homepage run in
  N6. Service and `/for` detail pages share one band rhythm
  (`slate-900 → white → slate-50 → white → slate-900 → slate-50`) and are
  internally consistent. Guide detail pages open and close dark with ~30KB of
  body between — correct, not a double band.
- **Wordmark.** The two-line typographic lockup with the primary-600 rule is the
  kit treatment the siblings use, and it is applied identically in header
  (`text-slate-900` on white) and footer (`text-white`, `primary-400` rule on
  slate-900). Given the site has no brand mark, this is the right call and it is
  coherent; the strings come from one source (`components/layout/wordmark.ts`).
  Its only defect is the inert `.logo-house` (N1), which is estate-wide.
- **Legal pages.** `/terms`, `/privacy-policy`, `/cookie-policy` render a narrow
  `max-w-3xl` column with breadcrumb + BreadcrumbList JSON-LD. Property's legal
  pages are equally plain. Not a port gap.
- **Embeds.** `/embed/gift-aid-calculator` and
  `/embed/gasds-small-donations-calculator` carry `noindex, nofollow`, no site
  chrome, no landmarks. The root-layout Organization/WebSite JSON-LD rides along,
  which is harmless under noindex and matches the siblings. Not reported.

---

## What in the brief I found to be FALSE

1. **"Known suspects on this site: `story-numeral`, `num-glow`."** Neither is
   emitted anywhere in the rendered DOM of any of the 71 routes. `story-numeral`
   has zero occurrences; the `animate-[num-glow_…]` utility is compiled into the
   stylesheet (because `@source` scans `packages/web-shared`) but no page mounts
   `WhyUsList` or `NumberedReasons`. The *underlying* gap the brief was pointing
   at is real and worse than stated — the built stylesheet contains **zero**
   `@keyframes` rules of any kind — but it bites `animate-accordion-up/down`
   (S1), not these two.
2. **"charities carries a site-local override for this. Verify it actually
   wins."** It does win, decisively, and the brief's framing invited a defect
   report where there is none. Reported under Verified CORRECT with the byte
   offsets.
3. **"`eyebrow-rule`, `tick-draw`… renders as nothing, silently."** Both classes
   are indeed undefined (B1/S2), but neither renders as nothing: the eyebrow bar
   and the tick marks both render fully because the missing rules are the
   *collapsed* states. What is lost is the entrance animation, not the element.

## What I could not check

- **Actual pixel rendering at 390/768/1024/1440.** No screenshot capability was
  available, so every width judgement here is derived from class strings plus the
  built stylesheet's media blocks and byte order, not from a rendered viewport.
  Cascade and specificity conclusions are sound; anything depending on measured
  text metrics — whether "CHARITY ACCOUNTANTS" at `tracking-[0.32em]` clears the
  wordmark's `max-w-[13rem]` cap at 390px (my arithmetic says ~171px against
  208px, so yes, but it is arithmetic) — is not verified visually.
- **Client-side behaviour.** The IntersectionObserver draw-in, the accordion
  open/close, the mobile drawer, the calculator compute paths and the consent
  toggle were read as SSR DOM and source only. No interaction was driven.
- **Hover and focus states as rendered.** B1's conclusion is drawn from the
  absence of the selector in the stylesheet plus the presence of
  `focus-visible:outline-none` in the DOM, which is decisive, but I could not
  tab through the page to observe it.
- **Colour contrast.** Out of my scope (P0D_CSS_CONTRAST.md covers it) and not
  independently re-measured. I did read the contrast reasoning in
  `globals.css` and `CalculatorClient.tsx` and found it internally coherent,
  including its own documented ceiling (the positive-verdict pill), but I did not
  re-derive the ratios.
- **The other 14 estate sites.** N1 (`logo-house`) and N3 (`block flex`) were
  checked against Property, generalist and Solicitors only.
