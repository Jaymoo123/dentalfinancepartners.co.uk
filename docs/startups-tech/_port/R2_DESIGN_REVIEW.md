# R2: independent adversarial fidelity review, DESIGN track, phases 2 to 6

Reviewer: independent, did not build this wave. Read-only.
Date: 2026-09-29.
Tree: phase 1 tag `port-startups-tech-phase1` (`6e02711e`) plus the uncommitted phases 2 to 6 wave.
Server: `next start` on http://localhost:3201, built from that tree.
Identity asserted before any number was quoted:
`curl -s localhost:3201 | grep -o '<title>[^<]*'` -> `<title>Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.

Instrument self-test, every browser run: Tailwind v4 `slate-500` `#62748e` on white = **4.764**,
`slate-400` `#90a1b9` on white = **2.630**. Both match the v4 calibration in the plan (W5R block).
Compositing walks the ancestor chain through a 1x1 canvas, so `oklab()` and `oklch()` are read
correctly; rings are read against the PARENT ground because every ring on this site is
`outline-offset-2`; every focus read is taken after a 340ms settle, reached by a real
`keyboard.press('Tab')`, never `.focus()`.

---

## A. VERDICT

**FAIL.**

| severity | count |
|---|---|
| blocker | 3 |
| gap | 3 |
| nit | 4 |

The wave did the large things well. Every contrast failure phase 0 deferred is closed, there is
no horizontal overflow at any width on any route, no prose sentence was rewritten, no capture
surface was added or removed, no interruptive surface exists, the brand ramp did not move, the
playbook 9.1 gate passes all eight rows, and the phase-1 S2 ring defect (hero CTA 1.89, gov.uk
stat links 1.67) is fixed and now measures 15.99 and 11.42.

It fails on one class of defect, and the same class three times: **a focus ring that the source
says is there and the rendered DOM says is not.** Every text input, select and textarea in the
site's three lead forms paints no ring at all when focused, on 43 routes. Every related-article
link on 30 blog posts paints no ring at all. And the kit calculator result headline renders at
2.84:1 on all four tools, exactly where W4's own receipt said it would.

---

## B. GAPS, most severe first

### BLOCKER 1. Every lead-form field paints NO focus ring. `outline-none` kills the token ring.

`startups-tech/web/src/components/forms/LeadForm.tsx:31`
`startups-tech/web/src/components/forms/DetailsForm.tsx:29`
`startups-tech/web/src/components/calculators/MiniCapture.tsx:22`

**What the spec says.** Playbook 9.1 row 6 and the shared acceptance tests: every ring is
`var(--focus-ring)`, and the ring floor is 3:1. W6's brief: "restyle fields, labels, spacing,
buttons and the ring".

**What actually renders.** All three field recipes are `... outline-none ${focusRing}`. In
Tailwind v4 the bare (unvariant) `outline-none` utility sets `--tw-outline-style: none` AND
`outline-style: none` on the element unconditionally; `focus-visible:outline` then resolves its
style from that same custom property. Measured with a real Tab and a 340ms settle on `/`:

```
SELECT   name=role     :focus-visible=true  outline = rgb(79,70,229) none 2px   box-shadow: none
TEXTAREA name=message  :focus-visible=true  outline = rgb(79,70,229) none 2px   box-shadow: none
```

`outline-width` is 2px and `outline-color` is the brand indigo, and `outline-style` is **none**,
so nothing is painted. `LeadForm` and `DetailsForm` have no other affordance: the contrast of the
focus indicator is **not low, it is absent**.

`MiniCapture` also carries `focus:ring-2 focus:ring-primary-600/25`, so it has a shadow ring, and
that measures **1.46:1** (composited ring `rgb(206,205,246)` against the `rgb(248,250,252)` card).
Floor 3:1.

The comment added by this wave at `MiniCapture.tsx:17` states the opposite of the measurement:
"`outline-none` stays: it kills the UA outline that the focus-visible outline replaces, and it is
not a ring removal." It is a ring removal.

**Blast radius.** `LeadForm`: `/`, `/contact`, and four research index pages. `DetailsForm`:
`/complete`. `MiniCapture`: four calculator pages (two forms each) and all 32 blog posts, via
`components/blog/InlineMiniLeadForm.tsx`. That is the entire conversion surface of the site.

**Severity: blocker.** This is the site's lead capture, and it is keyboard-invisible.

**Exact minimal fix.** In all three files, change the bare `outline-none` to the focus-scoped form
the kit itself uses (`packages/web-shared/design/blog/BlogListWithSearch.tsx:123` writes it
`focus:outline-none`), or simply delete `outline-none`: `focusRing`'s `focus-visible:outline`
already replaces the UA ring.

```
- ... transition-colors focus:border-primary-600 outline-none ${focusRing}
+ ... transition-colors focus:border-primary-600 focus:outline-none ${focusRing}
```

and correct the comment at `MiniCapture.tsx:16-18`. Then extend `src/tests/focus-ring.test.ts`
with an assertion that no field recipe carries a bare `outline-none` alongside `focusRing`, and
prove the guard bites by reintroducing the regression (T9).

---

### BLOCKER 2. Related-article links have no focus indicator at all, on 30 blog posts.

`packages/web-shared/design/blog/RelatedArticles.tsx:106` (kit, rendered by
`startups-tech/web/src/app/blog/[category]/[slug]/page.tsx`)
`startups-tech/web/src/app/globals.css` (the missing import; phase-1 file, manager-direct)

**What the spec says.** W2 adopts `RelatedArticles`. Ring floor 3:1 on every focusable element.

**What actually renders.** The kit link is `after:absolute after:inset-0 after:content-['']
focus-visible:outline-none`: a stretched link that deliberately suppresses its own ring and
delegates the affordance to `.related-card:focus-within`, which is defined only in
`packages/web-shared/design/globals-standard.css:243`. This site does not import that file
(`startups-tech/web/src/app/globals.css` imports `tailwindcss` and
`packages/site-styles/prose-standard.css`, nothing else). Measured in the served stylesheet:

```
curl -s localhost:3201/_next/static/css/6ca97a5afcad91ae.css | grep -c '\.related-card'   -> 0
curl -s localhost:3201/_next/static/css/6ca97a5afcad91ae.css | grep -c '\.prose[ {,:.]'   -> 35
```

Real Tab to the first related card on
`/blog/saas-and-tech-finance/founder-salary-vs-dividends-2026-27`:

```
{ text: 'SaaS Revenue Recognition and Deferred Re', fv: true,
  outline: 'rgb(16, 16, 16) none 1px', shadow: 'none',
  cardShadow: 'none', cardBorder: 'oklch(0.929 0.013 255.508)'   <- unchanged from resting }
```

Zero indicator. W2 reported the missing CSS and the wave shipped the component anyway.

**Severity: blocker.** Three focusable links per post, 30 posts, no way to see where focus is.

**Exact minimal fix.** Manager-direct, because `globals.css` is phase 1's: add
`@import "../../../../packages/web-shared/design/globals-standard.css";` next to the
`prose-standard.css` import; or, if that file brings more than is wanted, copy the
`.related-card`, `:hover` and `:focus-within` rules into `globals.css` under a comment naming
`packages/web-shared/design/globals-standard.css:227-254` as the source. Then measure the
resulting focus-within box-shadow against the white card and state the ratio.

---

### BLOCKER 3. Kit calculator result headline renders 2.84:1 on all four tools.

`packages/web-shared/tools/components/Calculator.tsx:157` (kit, manager carve-out)

**What the spec says.** Check 4 of the review brief, and W4's own receipt, predicted it. Floor
4.5:1 for text.

**What actually renders.** Measured after triggering a result on each tool with its prefilled
realistic inputs, composited against the panel ground:

| tool | label | measured |
|---|---|---|
| `/calculators/rd-relief-estimator` | "Estimated merged-scheme net benefit" | `rgb(79,70,229)` on `rgb(15,23,43)` = **2.84** |
| `/calculators/seis-eis-relief-calculator` | "Worst-case net loss (capital genuinely at risk)" | **2.84** |
| `/calculators/emi-vs-unapproved-calculator` | "EMI vs unapproved: employee tax saving" | **2.84** |
| `/calculators/founder-dividend-vs-salary-calculator` | "Combined tax: salary + dividend route" | **2.84** |

Present at 390, 768, 1024 and 1440 on every tool. The warn-tone branch IS reachable (set target
extraction 200000 and company profit 30000 on the dividend tool) and measures **10.68** on the
same ground, so only the normal branch fails.

**Severity: blocker**, but it is a KIT file (trap 12 carve-out): no package in this wave was
allowed to touch it, so the blocker is against the wave's close, not against a builder.

**Exact minimal fix.** Manager-direct on the kit: at `Calculator.tsx:157` swap
`text-[var(--brand-primary)]` for `text-[var(--brand-primary-text,var(--brand-primary))]`, and
declare `--brand-primary-text` on this site at a step clearing 4.5 on `slate-900`. That is the
exact token the plan's section D row 7 says exists for this case, and this is the live consumer
that row assumed did not exist. Re-measure before closing; do NOT shift the 600 step (ruling 6).

---

### GAP 4. The mobile table of contents never sticks, and its offset is short of the header anyway.

`startups-tech/web/src/app/blog/[category]/[slug]/page.tsx` (the `lg:hidden sticky top-16 z-30`
wrapper and its `mt-8 lg:hidden` parent)

**What the spec says.** W2 owns the sticky and the clamp; the `design/blog/` `TableOfContents` has
no `stickyDesktop` prop and expects the host to own it (field notes 12, playbook T32).

**What actually renders.** Two separate defects in the same element.

1. It does not stick. Its immediate parent is `<div class="mt-8 lg:hidden">`, measured **50px
   tall** at 390, the same height as the sticky child, so the sticky has zero travel inside its
   containing block. Scrolling `/blog/seis-and-eis/eis3-certificate-explained` at 390:

   ```
   y=1100  headerBottom=73  tocTop=-85
   y=1500  headerBottom=73  tocTop=-485
   y=2500  headerBottom=73  tocTop=-1485
   ```
   The bar scrolls off the top with the page and never pins.

2. Even if it pinned, `top-16` is 64px and the header is **73px** tall at 390 (65px at 1280), so
   9px of the bar would sit behind the header.

The desktop aside is correct: `lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto`
pins at 96px with `max-height: 772px`, and there is exactly **ONE** scroll box (0 elements with
`overflow-y: auto|scroll` inside it). No double clamp.

**Severity: gap.** A sticky that does not stick is dead markup on 30 mobile article pages, not a
broken page.

**Exact minimal fix.** Hoist `sticky top-16` onto an ancestor that spans the article (the
`max-w-3xl lg:order-1` column, measured 12,106px tall), or drop the sticky and render the mobile
TOC as a plain inline block. Whichever is chosen, set the offset from the measured header height
rather than 16.

---

### GAP 5. 286 in-article anchor targets across 30 posts have `scroll-margin-top: 0`.

`startups-tech/web/src/lib/markdown-utils.ts` (`addHeadingIds`), consumed by
`startups-tech/web/src/app/blog/[category]/[slug]/page.tsx`

**What the spec says.** `browser_check.mjs` assertion 3: every element addressed by an in-page
`#anchor` must carry `scroll-mt-24` or the sticky header eats the heading on jump. Phase 0 fixed
eight of these; this wave created 286 new ones.

**What actually renders.** The wave wired `addHeadingIds` plus `TableOfContents` for the first
time, so every `<h2>` and `<h3>` in the authored body is now an anchor target, and none carries a
scroll margin.

```
node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201
  -> 152 page-loads, 10 with NEW problems   (every one an [anchor] row, on blog posts)
own sweep over all 30 sampled posts:
  -> blog posts with anchor scroll-margin gaps: 30 of 30, total gaps 286
```

This is the ONLY new class of finding `browser_check.mjs` reports for the wave.

**Severity: gap.** Every TOC click lands with the heading under the sticky header.

**Exact minimal fix.** One line in `addHeadingIds`: emit `class="scroll-mt-24"` on the heading it
stamps an id onto; or add `.prose :is(h2,h3)[id]{scroll-margin-top:6rem}` to `globals.css`, which
is manager-direct. Re-run `browser_check.mjs` and expect 0 routes with NEW problems.

---

### GAP 6. Five hardcoded hex survivors on the homepage carry no written reason at the line.

`startups-tech/web/src/app/page.tsx:527, 569, 629, 738, 835` (all `bg-[#fafaf9]`)

**What the spec says.** Owner ruling: no hardcoded hex in markup except declared exceptions.
Playbook 9.1 row 6's principle and W5's brief: `#fafaf9` is kept deliberately because it is not a
ramp step, and a deliberate survivor is legitimate only when the reason is written at the line.
The review brief's KNOWN AND ACCEPTED list accepts the six homepage survivors **"if commented"**.

**What actually renders in source.** Comment-stripped census over the whole site:

```
for f in $(grep -rl '#[0-9a-fA-F]\{6\}' src --include=*.tsx); do
  perl -0pe 's{/\*.*?\*/}{}gs; s{\{/\*.*?\*/\}}{}gs; s{//[^\n]*}{}g' "$f" \
  | grep -noE '#[0-9a-fA-F]{6}' | sed "s|^|$f:|"; done
```

That returns exactly the F6 expected survivor set. But of the six on `page.tsx`, only
`#0f0e2a` at `:463` has its reason written above it ("The gradient's terminal stop ... is NOT a
ramp step of its own"). The five `#fafaf9` lines carry only a section-name comment
(`{/* Intro strip */}`, `{/* Specialist services */}`, `{/* Free tools + research asset */}`,
`{/* Anonymised social proof */}`, `{/* Blog footer strip */}`). Nothing says why the hex is
there.

**Severity: gap** (documentation, and the exact thing that makes the next reviewer reopen it).

**Exact minimal fix.** One shared comment above the first occurrence, referenced by the other
four, for example: `/* #fafaf9 is the published section ground and is NOT a ramp step; snapping
it to neutral-50 is a visible colour change nobody asked for. See PHASE2-6_PACKAGES.md A7. */`

---

### NIT 7. `ReadingProgress` paints over the top 4px of the sticky header.

Measured on a post at 1280 and 390: the progress track is `fixed top-0 left-0 right-0 h-1 z-50`,
height 4px, full width; the header is `sticky top-0 z-40`, height 65px (1280) and 73px (390). The
bar is therefore **over** the header, not under it and not hidden. That is the kit's intended
behaviour and it is legible, so it is recorded, not raised.

### NIT 8. Hero grounds are not consistent between brand heroes.

`/services` breadcrumb hero composites to `rgb(67,56,202)` = `#4338ca` (the 700 step);
`/about` and `/calculators/[slug]` composite to `rgb(79,70,229)` = `#4f46e5` (the 600 step). Both
clear every floor (white crumb text 7.90 and 6.29; chevron 5.65 and 4.62), so nothing fails, but
two adjacent brand heroes ship two different indigos. Worth one owner glance on the walk.

### NIT 9. New structural labels introduced by the wave (reportable, not blockers).

No existing sentence changed anywhere (see check C7). These are new structural words:

- Breadcrumb crumbs on `/services`, `/for`, `/research`, `/about`, `/contact`, `/calculators`,
  `/blog` and every slug beneath them: "Home", plus the parent label. `/services/[slug]` and
  `/for/[slug]` reuse the retired back-link wording ("All services", "All company types") as the
  crumb label, so nothing is invented there.
- New eyebrows: "About", "Contact", "Cookie", "Privacy", "Terms", "Topics", "The library",
  "Keep exploring", "Calculator". (Also "Research asset", "Free tools", "Real outcomes",
  "Who we work with", "Why specialist matters", "Specialist services", "Guides and analysis",
  "The moments that bring founders here", which re-use existing `section-label` strings.)
- New `SlimHero` eyebrows on the funnel: "Your callback" (`/book`), "Your enquiry" (`/complete`
  and all three `/thank-you` branches).
- New headings on blog posts: "Frequently asked questions", "Related reading", "On this page".

### NIT 10. W5's acceptance test "`<Eyebrow` = 9" is unreachable as written.

Comment-stripped, `app/page.tsx` reports `<Eyebrow` = **8** and `section-label` = **0**. The ninth
eyebrow ("Get started") is now rendered by the kit `LeadCTAPanel` from its `eyebrow` prop, so it
is correctly no longer a local `<Eyebrow>` tag. Gate row 5 passes (`Eyebrow >= section-label`);
the package's own expected value is simply wrong. See false premise D3.

---

## C. CLEARED: one line per mandatory check, with the command and the decisive output

**Check 1 - every route 200, one `<main id="main">`, one header, one footer, embeds chrome-free,
no horizontal overflow at 390 and 1280.**
```
while read u; do curl -s -o b.html -w '%{http_code}' localhost:3201$u; ... done < <all routes>
-> every one of the 25 public routes + 5 blog categories + 32 posts: 200 main=1 allmain=1 header=1 footer=1
-> /book /complete /thank-you: 200 main=1 allmain=1 h1=1 header=1 footer=1        (F27)
-> all four /embed/<slug>:     200 main=0 allmain=0 header=0 footer=0             (F16 re-proved)
node ovf.mjs  (real mobile emulation: 390x844, isMobile, hasTouch, dSF 3, iPhone UA) over 69 routes x {390,1280}
-> overflow pages: 0
node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201
-> 152 page-loads, 0 overflow rows at 390/768/1024/1440
node docs/_engines/instruments/sweep.mjs --site=startups-tech --base=http://localhost:3201
-> 66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1796 links total),
   0 data-cta regressions (66 total), 0 dash regressions (0 total)
```
PASS. There is no `/embed` index route, by design; nothing was built.

**Check 2 - focus rings, real Tab, 340ms settle, composited against the parent ground.**
```
node rings.mjs /       (68 keyboard stops)
-> hero CTA "Speak to a startup specialist"  ring 15.99 on rgb(30,27,75)    (was 1.89)
-> hero CTA "R&D tax claims"                 ring 15.99 on rgb(30,27,75)
-> gov.uk stat links 20% / £250k / £250k / 18%   ring 11.42 on rgb(49,46,129)  (was 1.67)
   `.ground-dark` is applied on both sections; the builder's claim is confirmed.
-> chrome: skip link 19.03, wordmark 6.29, all seven nav items 6.29, "Get in touch" 6.29
-> homepage FAQ summaries 19.03; blog-strip links 6.02 to 18.22
-> LeadForm SELECT and TEXTAREA: NORING                                    -> BLOCKER 1
node rings2.mjs /calculators/rd-relief-estimator
-> kit Calculator inputs and selects: 6.29 each (5 controls)
-> MiniCapture inputs x8 (two forms): NORING, shadow only, measured 1.46   -> BLOCKER 1
node crumb.mjs /services /about
-> /services crumbs: link 7.90, chevron 5.65, current 7.90 on rgb(67,56,202)
-> /about    crumbs: link 6.29, chevron 4.62, current 6.29 on rgb(79,70,229)
node rings2.mjs /about footer
-> first 8 footer links: ring 17.83 on rgb(15,23,43), text 12.00 to 17.83  (B1 stays closed)
node rings2.mjs /services/rd-tax-claims main   (24 authored anchors; /for/[slug] is the same template)
-> 7.90 on the hero, 6.02 on the #fafaf9 bands, 6.29 on white; no stop below 6.01
node rings2.mjs /blog/seis-and-eis/eis3-certificate-explained main
-> authored body links 6.29 / 6.01; TOC links 6.01; three related-article links NORING -> BLOCKER 2
```
PASS except the two blockers above.

**Check 3 - contrast sweep at 390/768/1024/1440 on nine pages, every text node under 4.5.**
```
node contrast.mjs / /services/rd-tax-claims /for/saas-companies /calculators/rd-relief-estimator
node contrast.mjs /research/startup-formation-survival-index <one post> /contact /book /complete
-> /                                             fails=0 at all four widths
-> /services/rd-tax-claims                       fails=0
-> /for/saas-companies                           fails=0
-> /research/startup-formation-survival-index    fails=0 at 390/768/1024/1440   (was 16)
-> /blog/.../founder-salary-vs-dividends-2026-27 fails=0
-> /contact fails=0   /book fails=0   /complete fails=0
-> /calculators/rd-relief-estimator : 1 fail at every width,
   2.84 | 12-14px | 700 | rgb(79,70,229) on 15,23,43 | "Estimated merged-scheme net benefit"
```
`scrollWidth == clientWidth` on every page at every width. The `bg-clip-text` builder credit reads
1.18 through a computed-colour probe and is excluded: that is the R1 measurement trap, its visible
colours are `#818cf8` to `#fb923c`. PASS except blocker 3.

**Check 4 - kit result panel on all four calculators, plus the warn tone.**
```
node calc2.mjs   (result triggered on each tool with its prefilled realistic inputs)
-> all four: 2.84 on rgb(15,23,43). Confirms W4's receipt at Calculator.tsx:157 exactly.
node warn2.mjs   (dividend tool, targetExtraction=200000 companyProfit=30000)
-> warn branch reachable: "Low-profit warning" rgb(251,191,36) on rgb(15,23,43) = 10.68   PASS
```

**Check 5 - blog post at 1280 and 390.**
```
node blog.mjs /blog/saas-and-tech-finance/founder-salary-vs-dividends-2026-27
-> ReadingProgress: fixed top-0 h=4 w=viewport z=50; header sticky top-0 z-40 h=65 (1280) / 73 (390)
   => OVER the header, visible, not hidden.                                            (NIT 7)
-> mobile TOC: lg:hidden sticky top-16 z-30, computed top 64px, header 73px at 390     (GAP 4)
node toc2.mjs / toc3.mjs
-> it never pins: parent <div class="mt-8 lg:hidden"> is 50px tall, same as the child   (GAP 4)
-> desktop aside: sticky top 96px, max-height 772px, ONE scroll box (0 inner overflow boxes)  PASS
-> related cards: class `related-card` present on all three;
   curl .../6ca97a5afcad91ae.css | grep -c '\.related-card'  -> 0                      (BLOCKER 2)
```

**Check 6 - rendered FAQ `<details>` vs the FAQPage JSON-LD, on all 30 sampled posts.**
```
node faq2.mjs   (FAQ region scoped to the section holding the "Frequently asked questions" heading)
-> 30/30 routes: jsonld=N faqDetails=N answersMissingFromHTML=0 summaryFocusable=true
-> problem routes: 0
-> no escaped markup anywhere: /&lt;(p|a|strong|ul|li)&gt;/ is false on all 30
```
A naive page-wide `grep -c '<details'` reports N+3 on every post; the three extras are the
mini-form "Optional: a bit more detail" disclosure and the two TOC wrappers. Not a defect. PASS.

**Check 7 - the homepage LeadCTAPanel adoption.**
```
git show port-startups-tech-phase1:startups-tech/web/src/app/page.tsx | sed -n '735,790p'
then grep -c "<literal>" over the served / for every string in the phase-1 closing panel
-> "Get started" 1, "Talk to a startup specialist" 1, "in plain English, with no obligation" 1,
   "Get in touch" 1, "Funded and scaling companies only" 1, "24-hour response" 1,
   "Usually the same working day" 1, "All conversations are confidential" 1,
   "UK-wide (HMRC)" 1, "Scottish income tax has its own bands" 1
-> grep -o '<form' | wc -l on / = 1   (unchanged)
```
The kit panel authors nothing of its own: both defaulting props (`eyebrow`, `formTitle`) are
overridden, `footnote` and `formSubtitle` are omitted, and `PanelBody` emits no other copy. The
`backdrop` slot paints `bg-primary-950` plus the same `from-primary-900/20` gradient, and
`primary-950` IS `#1e1b4b`, the phase-1 ground. Colours and copy both survive. PASS.

A whole-site prose diff was run, not just this panel: for every one of the 34 changed files, all
JSX text runs and all prose-length string literals were extracted at `port-startups-tech-phase1`
and in the working tree and set-differenced. **Zero existing sentences changed.** Every removal is
a sentence now passed as a component prop, and each was re-confirmed in the served HTML:
`/thank-you?optout=1` still renders `<h1>You will not hear from us again about this enquiry`,
`/thank-you?confirmed=1` still renders `<h1>Confirmed`, `/thank-you` still renders
"Thanks, your enquiry is on its way." All additions are structural labels (NIT 9).

**Check 8 - breadcrumb adoption.**
```
node ld.mjs over all 69 URLs (json.loads on every ld+json block, not a tag-presence check)
-> every block on every URL parses; zero exceptions                                    (F5)
-> exactly ONE BreadcrumbList on /services, /for, /research, /about, /contact, /calculators,
   /blog, all 6 service slugs, all 5 audience slugs, all 5 research pages, all 4 tool pages,
   all 5 category hubs and all 30 posts. Zero pages emit two. Zero of those pages emit none.
   / , /privacy-policy, /terms, /cookie-policy, /book, /complete and /thank-you emit none,
   which matches their (absent) breadcrumbs.
-> crumb hrefs: sweep reports 0/6 internal links dead across 1796 links, so every crumb
   target is 200.
-> the `crumbOnBrand` override measured (see check 2): 7.90 / 5.65 / 7.90 on #4338ca and
   6.29 / 4.62 / 6.29 on #4f46e5. Both clear the 4.5 text and 3.0 graphic floors.
```
PASS.

**Check 9 - playbook 9.1 gate, corrected edition (lines 694 to 822), `DIR=startups-tech`.**
Run verbatim from the monorepo root. Eight rows as printed, then my reading of each:

```
1  layout-utils  : 6
2  kit adopted   : 5 distinct / 40 call sites
2a kit declined  : 113 comment references naming a kit path
2b homepage mktg : adopted=1 declined=7
3  webfont       : geist/font/sans
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=8 section-label=0
6  rings not the token:
     (no lines printed)
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/StartupsBackdrop.tsx
8  ring guard    : walks=1 guards-the-guard=1
--- four-marker row, comment-stripped:
ping=0 stats=0 backdrop=0 rounded-full=0
```

| row | my reading |
|---|---|
| 1 | PASS, 6 >= 1. `components/ui/layout-utils.ts` re-exports the kit recipes and keeps `focusRing` and `btnPrimary` local with the decline reason written above each, naming `packages/web-shared/design/layout-utils.ts`. **Adopted.** |
| 2 | PASS and reported: **5 distinct / 40 call sites**, against generalist 16/142 and uplifted crypto 6/18. **Adopted, not reimplemented.** |
| 2a | Reported, not graded: **113**, spread over 32 files, every one naming a `packages/web-shared/design/...` path, which is the countable shape the playbook demands. Highest: `services/[slug]` 9, `for/[slug]` 9, `page.tsx` 8, `calculators/[slug]` 8. |
| 2b | PASS. `adopted=1` (`LeadCTAPanel` on the closing panel) and `declined=7`, so not `0/0`. The seven declines (`StatsCounter`, `TestimonialsSection`, `ComparisonTable`, `StickyCTA`, `ProcessTimeline`, `ProblemStatement`, `FaqSection`) are written at `app/page.tsx:15-45` with the measured reason and the kit path. `src/components/marketing/` was NOT created; the row passes on the homepage alone. |
| 3 | PASS. `geist/font/sans` via `next/font`. |
| 4 | PASS. `StartupsBackdrop.tsx`. |
| 5 | PASS on the rule (8 >= 0), and `section-label` is fully retired site-wide. It misses W5's own stated `= 9`; the ninth eyebrow moved inside the kit panel. See NIT 10 / D3. |
| 6 | PASS, empty. Every ring on the site is `var(--focus-ring)`; not one coloured carve-out. Note this row cannot see BLOCKER 1, which is an `outline-style` defect, not a colour one. |
| 7 | Two files, both measured. `app/page.tsx`: the hero `from-primary-950 via-primary-900/70 to-[#0f0e2a]` measured stop by stop by reading the composited ground under each focus stop: CTA rings 15.99 on `rgb(30,27,75)`, stat-link rings 11.42 on `rgb(49,46,129)`, worst stop 11.42. `StartupsBackdrop.tsx`: mounted inside `<footer>`, worst footer ring 17.83 and worst footer text 12.00 on the composited `rgb(15,23,43)`. No stop below floor. |
| 8 | PASS. `walks=1 guards-the-guard=1`, `src/tests/focus-ring.test.ts`. The guard did NOT catch BLOCKER 1, because it asserts ring RECIPES rather than rendered `outline-style`; extending it is part of that fix. |

Every decline sampled has a measured reason at the call site naming the kit file path:
`FaqSection` (11 route files plus `page.tsx` plus the post template), `CoverageCards`,
`StatsCounter`, `TestimonialsSection`, `ComparisonTable`, `StickyCTA`, `ProcessTimeline`,
`ProblemStatement`, `BlogListWithSearch`, `WhatToExpectCard`, `web-shared/leads/MiniCapture`.
`CardStack` was opened rather than declined blind: `for/[slug]/page.tsx:108` and
`services/[slug]/page.tsx:127` record "`CardStack` DOES render HTML safely (`html?: boolean` at
:99, checked)". That is the plan's instruction followed literally.

**Check 10 - hardcoded hex census, comment-stripped.**
```
for f in $(grep -rl '#[0-9a-fA-F]\{6\}' src --include=*.tsx); do
  perl -0pe 's{/\*.*?\*/}{}gs; s{\{/\*.*?\*/\}}{}gs; s{//[^\n]*}{}g' "$f" \
  | grep -noE '#[0-9a-fA-F]{6}' | sed "s|^|$f:|"; done
-> api/og/route.tsx:21,25,26,27  (#0f172a #4f46e5 #334155 #64748b)  - OG image, not markup
-> page.tsx:463 #0f0e2a (gradient stop, reason written)
-> page.tsx:527,569,629,738,835 #fafaf9 x5   NO reason written                  (GAP 6)
-> PageShell.tsx:59 #4f46e5   (wordmarkAccentColor, reason written, plan section D row 6)
-> StartupsBackdrop.tsx:26,41 #818cf8   (motif)
```
Matches F6's expected survivor set. Brand ramp intact: `globals.css:43`
`--color-primary-600: #4f46e5`, `:44 --color-primary-700: #4338ca`. Not shifted.
Em-dashes: `sweep.mjs` reports `0 dash regressions (0 total)`; the served HTML U+2014 count is 0
on `/`, `/services`, a post, `/contact` and `/complete`; the wave diff adds 0 em-dash lines.

**Check 11 - the client bundle, what a curl cannot see.**
```
curl -s localhost:3201/_next/static/chunks/app/layout-3b78a07da01b97a4.js \
  | grep -o 'header_book_mobile\|mobile_menu\|header_book' | sort | uniq -c
-> 1 header_book, 1 header_book_mobile, 2 mobile_menu       (the drawer tuples survived)
node docs/_engines/instruments/cta_snapshot.mjs --site=startups-tech --base=http://localhost:3201
-> 66 routes, 66 cta tags, 1 distinct triple: header_book|header|form|data-cta -> 66
vs docs/startups-tech/_port/cta_baseline.json (sha eeb3dbef, PRE-PORT): every route count:0,
   so the baseline cannot be diffed for regressions (false premise D6). The only triple on the
   site is the one phase 1 introduced, and it is identical on all 66 routes.
`thankyou-return-article`: absent from the served /thank-you because it sits inside
{returnPath && ...} and no `rt` param was passed. Source is byte-identical to phase 1 on the id
and the data-cta-placement="thank_you" pair (thank-you/page.tsx:150-151 vs :107-108). T22 clean.
```
PASS.

**Also re-proved, outside the numbered checks:**
- No capture surface added or removed. Component-instance diff across all 34 changed files
  against phase 1: the only delta is `page.tsx` gaining `<LeadCTAPanel>`, which WRAPS the same
  single `<LeadForm>`. Served `/` still has exactly one `<form>`. Each tool page has exactly two
  (`calc_result` plus `calc_page_footer`), both of which exist at phase 1 (`CalcResultCta.tsx:8`,
  `calculators/[slug]/page.tsx:80`), so they predate the wave.
- No interruptive surface. `grep -rn 'Modal|Banner|Popup|StickyBar|ExitIntent|StickyCTA'` over
  `src/**/*.tsx` returns exactly two hits, both inside `ADOPTION DECLINED:` comments.
- The "a pub with 12 staff" placeholder is confirmed live in the served HTML of all four tool
  pages and all 30 posts (`MiniCapture.tsx:149`). Known defect, logged for the mop-up, not
  re-litigated here.

**Not run, and why:** `npx tsc --noEmit`, `npm test` and
`python scripts/check_dependency_closure.py` (F1 to F3) were skipped. This review is read-only
against a running build and the brief forbids running a build; those three are the manager's
wave-close rows, not a design-fidelity measurement. They are still owed before the wave closes.

---

## D. FALSE PREMISES

1. **This review's brief: "the breadcrumb links on the brand heroes ... `onDark` palette contrast
   on the indigo-700 heroes".** They are not all indigo-700. `/services` composites to `#4338ca`
   (the 700 step) but `/about` and `/calculators/[slug]` composite to `#4f46e5` (the 600 step).
   Both pass; the premise that there is one hero ground is wrong, and a reviewer measuring only
   one of them would report a number that does not describe the other. See NIT 8.

2. **`MiniCapture.tsx:16-18`, written by this wave: "`outline-none` stays: it kills the UA outline
   that the focus-visible outline replaces, and it is not a ring removal."** It is a ring removal.
   Measured `outline-style: none` at `:focus-visible`. This is the most expensive false claim in
   the wave, because it is written as a settled decision at the call site and would have stopped
   the next reviewer looking.

3. **W5's acceptance test `grep -o '<Eyebrow' src/app/page.tsx | wc -l` = 9.** Unreachable, and
   should not be chased. Comment-stripped it is 8, because the ninth eyebrow ("Get started") is
   now the kit `LeadCTAPanel`'s `eyebrow` prop and is correctly no longer a local tag. The gate
   row it exists to satisfy (row 5, `Eyebrow >= section-label`) passes at 8/0.

4. **W5's acceptance test `grep -c 'ground-dark' src/app/page.tsx >= 2` reads as a test of the
   FIX.** It is a test of the CLASS BEING PRESENT. `.ground-dark` lives in `@layer components`
   and custom properties inherit, so the class sitting on the section is not evidence the ring
   changed; only a composited Tab read is. Both readings agree here (15.99 and 11.42), but the
   test as written would pass on a broken site.

5. **The review brief's KNOWN AND ACCEPTED list: "the six deliberate hex survivors on the homepage
   (five `#fafaf9` bands, `#0f0e2a` gradient stop) if commented".** Only one of the six is
   commented. The conditional was not met, so the five are reported (GAP 6).

6. **`docs/startups-tech/_port/cta_baseline.json` is named as the comparison for F28.** It was
   captured at `eeb3dbef` PRE-PORT and records `count: 0` on all 66 routes, so it cannot detect a
   trap-22 flip in anything phase 1 or this wave introduced. The plan's own section D row 2 says
   as much ("There is no pre-port value to preserve"). The useful baseline is the phase-1 snapshot
   R1 took from the client bundle, not this file. Whoever closes the wave should re-save this
   baseline at the phase-6 tag and say so in STATE.md, or F28 is a test with no fixture.

7. **The plan's section D row 7 concludes `--brand-primary-text` has no live consumer on this site
   ("Its only kit consumer is `packages/web-shared/leads/MiniCapture.tsx`, which this site does
   not import").** `packages/web-shared/tools/components/Calculator.tsx:157` is a live consumer of
   the fallback path, for exactly the case the token exists to solve, and it is imported by all
   four tool pages. Declaring the token is the cheapest fix for BLOCKER 3.

8. **W2's own report that `.related-card` CSS is not imported was treated as an observation.** It
   is the whole of BLOCKER 2: without that stylesheet the kit's stretched link has no focus
   indicator at all, because the component deliberately suppresses its own. A missing decorative
   hover would be a nit; a missing focus ring is not.

---

## E. OPEN QUESTIONS FOR THE OWNER

1. **The lead forms do not show a keyboard user where they are.** Tab through the enquiry form on
   the homepage, the contact page, a calculator or any article and nothing lights up around the
   box you are typing into. It is a small styling fix in three files, but it touches the lead
   forms, which are frozen unless you say otherwise. May we fix the highlight only, changing no
   field, no label, no wording and no plumbing?

2. **The "related reading" cards at the foot of every article have the same problem**, and the fix
   sits in a shared stylesheet the site does not currently load. Loading it would also switch on a
   hover glow on those cards, which is a small visible change on 30 article pages. Do you want the
   glow, or should we copy across only the focus highlight and leave the hover as it is today?

3. **The calculator result headline is hard to read.** The small purple label above the big number
   ("Estimated merged-scheme net benefit") sits on a near-black panel and does not meet the
   readability standard. Fixing it means picking a lighter purple for that one label on this site
   only. Your locked brand purple does not move and nothing else changes colour. Shall we?

4. **The contents list on articles, on a phone, was meant to stay pinned to the top of the screen
   as you scroll. It does not.** Two options: make it pin properly, or drop the pinning and leave
   it as a plain list at the top of the article. The second is simpler and nobody will miss it.
   Which do you prefer?

5. **Clicking an item in that contents list scrolls the heading under the top bar**, so you land
   one line below where you meant to. One-line fix, no other visible change. Confirming it is in
   scope for the mop-up rather than deferred.

6. **Nothing you wrote has been reworded.** The wave did add some new small labels: "Home /
   Services" style trails on most pages, and short words above headings such as "Topics",
   "Privacy" and "Your enquiry". The full list is in section B nit 9. Worth a glance on your walk
   in case any of them read wrong to you.
