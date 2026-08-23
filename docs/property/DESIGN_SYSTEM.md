# Property design system: shared components and conventions

The rules a change to a shared Property surface has to respect, and the contract
every page on the site is built to. This is the component-level companion to
`Property/web/CLASS_NAMING_CONVENTIONS.md` (which covers class strings) and to
`docs/property/STATE.md` (which covers programme state, not design).

**This file is binding on every existing page and on every page added from now
on.** It is not a record of what the redesign happened to do. A new page that
does not satisfy §0 is not finished, whatever it looks like in isolation, and
the failure mode is always the same: it reads as a different site the moment a
reader arrives on it from anywhere else.

Everything here is **live and shipping on `design/property-redesign-port`**, not
proposed. Where a rule exists because something went wrong, the incident is
recorded with it, because the incident is what stops it being undone.

The designer's own `DESIGN_GUIDELINES.md` lives in gitignored
`tmp/design_migration/Property_zip/web/` and is the authority on the visual
language it shipped (type scale, heading rhythm, brick backdrop, section
grounds). This file is the authority on what we built **on top of** that, after
the port closed.

**Contents.** §0 the page contract (start here, it is the checklist) · §1
blast radius · §2 related reading · §3 page summaries · §4 `TopicSection` ·
§4a every section carries a visual · §4b the page skeleton · §4c shared
marketing bands · §4d the three post-submit surfaces · §4e hub pagination · §5 page
figures · §6 calculators on a page · §6a calculator body width · §7 CTAs · §8
accessibility floors · §9 section grounds · §10 copy rules.

---

## 0. The page contract

Every page. Existing, new, and the one you are about to write. Each line links
to the section that carries the detail and the incident behind it.

### 0.1 Structure

- [ ] **The page follows the shipped skeleton**: hero, alternating body
      sections, closing ask, FAQ. §4b.
- [ ] **The body uses `siteContainerLg`.** No `max-w-3xl`, `max-w-4xl` or
      `max-w-5xl` wrapper round a page body, a table, an FAQ or a link list. The
      container IS the measure. §4b, §6a.
- [ ] **The only narrow measure is hero copy.** `max-w-3xl` on the hero block
      and on a section standfirst above a full-width grid. Nowhere else. If a
      form or tool looks lost at full width, the fix is a two-column section
      with something useful beside it, never a clamp. §4d.
- [ ] **Grounds oscillate and are set explicitly per section.** Two touching
      sections never share a ground. Never let a component count for you. §9.
- [ ] **Navy never touches navy.** The footer is `slate-900`, so a full-bleed
      navy band can never be the last thing on the page. Canonical tail: panel,
      FAQ, footer. §9.
- [ ] **A card's ground is the opposite of its section's.** White cards on
      `bg-slate-50`, `bg-slate-50` cards on white. A white card on a white
      section has no edge. Invisible in the source, obvious on the page. §4a.
- [ ] **Radii and edges are `rounded-xl` with `ring-1 ring-slate-200/70`.**
      `rounded-2xl` and `border border-slate-200` are the pre-redesign recipe.

### 0.2 Every section carries a visual

- [ ] **No section ships as prose alone.** Every body section gets a figure, a
      visualisation, a status set, a card grid, a rail, a table or a tool. A
      wall of paragraphs is the pre-redesign template. §4a.
- [ ] **The shape comes from the claim, not from convenience.** A grid says "N
      equivalent things" and actively contradicts a sequence, a cumulative test
      or an escalation. Pick from the table in §5.
- [ ] **The figure re-presents the section's own copy and invents nothing.** If
      the copy has no numbers, the figure has no numbers. §4a, §5 rule 1.
- [ ] **Derive, never type.** If an engine can produce the number, the figure
      reads it from the engine. Better still, the table and the figure beside it
      read the same array, so they cannot disagree. §4a, §5 rule 2.
- [ ] **A section whose whole content is a tool or a deliverables band already
      satisfies this** and needs nothing further.

### 0.3 Money and figures

- [ ] **`ExampleFigureNote` goes on every visual carrying figures**, including
      statutory ones (rates, thresholds, deadlines, penalty amounts). Owner
      decision, do not re-split it into illustrative-only. It renders
      "\* Example figures displayed" at 11px slate-500. §5 rule 6.
- [ ] The one exception is `StatsCounter`, the firm's own proof strip. Those are
      claims about us, not tax figures, and captioning them would read as an
      admission they are invented.
- [ ] **Colour is meaning, never decoration.** Emerald for relief, satisfied or
      money kept. Amber where a duty bites. Red for no relief or a criminal
      track. Slate for neutral or does-not-apply. §5 rule 3.
- [ ] **Every value is direct-labelled**, so nothing rests on hue and the bars
      can be `aria-hidden`. §5 rule 4.
- [ ] **Every published number must be re-derivable**, and if
      `house_positions.md` does not carry it, it does not get published. §10.

### 0.4 Calculators on a page

- [ ] **On-page calculators are `CalculatorTabs`, never link cards.** A card is
      the wrong affordance for something the reader can use where they are
      standing. §2, §6.
- [ ] **A calculator never gets a related-reading card.** Where a card would
      point at `/calculators/<slug>`, render the tool as a tabs block instead.
      Standing rule. §2.
- [ ] **Pass an explicit `tabs` list** so the page renders exactly the tools it
      is about. Every listed panel mounts and downloads, so do not pad it. §6.
- [ ] **Never write a second copy of a calculator.** A generic registry tool
      becomes a tab: add a key, a `TABS` row, a line in the panel switch. §6.
- [ ] **Tabs emit no crawlable link**, so a page rendering them owes one literal
      `<a href>` to a specific `/calculators/<slug>` or
      `calculator-tabs-crawl-path.test.ts` fails. The guard is a source scan and
      cannot see through a local constant, so spell the href out. §6.
- [ ] **The copy has to honour the affordance.** "Send one to your client" is
      not something a `<button role="tab">` can do. §2.

### 0.5 Conversion

Property is a lead-generation site. A page that informs and does not convert is
half-built.

- [ ] **The page runs a funnel, in this order**: hook (hero: who this is for and
      the promise), problem (what goes wrong without help), proof (figures,
      comparisons, anonymised social proof), scope (what we actually do), then
      the ask. Sections may be merged, never reordered into an ask-first page.
- [ ] **The hero carries a primary CTA to the on-page form.** A page a reader
      can scroll to the bottom of without meeting an ask is not finished.
      Research and reference surfaces are the ones this keeps happening to. §4b.
- [ ] **On-page primary CTAs scroll to the on-page form**, `href="#book"`. The
      anchor is `<div id="book" className="scroll-mt-24">`, and `scroll-mt-24`
      is load-bearing: without it the sticky header covers the form heading.
      Route-specific anchors: blog `#enquiry-form`, calculator pages
      `#get-expert-help`. §7.
- [ ] **Only the header CTA and the sticky banner leave for `/contact`.**
      Everything else stays on the page. `niche.config.json`
      `cta.variants.leadgen.hero_primary` is `#book` and is where the hero
      primary comes from. §7.
- [ ] **The closing ask is `LeadCTAPanel`**, the full-bleed navy brick panel.
      No bare `LeadForm` in a coloured card, ever. §4b.
- [ ] **A bare button is not a CTA block.** The mid-page pattern is a white card
      with a hairline ring, a specific statement on the left and the button on
      the right, stacking on mobile. The statement is the reason to click *now*
      and must be specific to its section. §7.
- [ ] **`FaqSection` plus `buildFaqPageJsonLd(faqs)` on the same array.** Never
      a hand-rolled `dl` or h3-and-paragraph pairs, and never a second copy of
      the questions for the schema. §4b.
- [ ] **Keep `data-cta`, `data-cta-placement` and `data-cta-goal` when you move
      a CTA.** They feed `vw_cta_performance`; dropping one silently kills a
      funnel row and nothing goes red. §7.
- [ ] **Never add anything interruptive** (modal, popup, toast, banner, or a
      change to the sticky CTA's cadence) without asking the owner first.

### 0.6 Links and crawl paths

- [ ] **Never delete a crawlable internal link to make a layout work.** If a
      component cannot emit `<a href>`, the page owes the link somewhere else in
      its own markup. This is carve-out 5 and it has its own tests.
- [ ] **Paginate by hiding, never by slicing**, anywhere the pager is client
      state. §4e.
- [ ] **One card component for related reading**, `RelatedArticles`. Do not
      write a fifth grid. Pills derive from the href so they cannot disagree
      with the destination. §2.
- [ ] **A non-article page's card sentence lives in `PAGE_SUMMARIES` once**, and
      the owning page imports it for its own hero. Do not type a second copy.
      §3.

### 0.7 Accessibility floors

- [ ] **4.5:1 for all text**, including 11px fine print and 14px bold. 14px bold
      is not WCAG large text; 3:1 does not apply. §8.
- [ ] **slate-500 on light grounds**, never slate-400. §8.
- [ ] **`DrawnTickList` needs `tickClassName="text-emerald-600"` on light.** Its
      default emerald-400 is tuned for navy and measures about 1.9:1 on white.
- [ ] **Motion sits behind `prefers-reduced-motion: no-preference`.** Reduced
      motion, no `IntersectionObserver` and no JavaScript must all land on
      "fully drawn and still", never on empty. §8.
- [ ] **`@media (hover: hover)` on any hover glow.** Without it a touch tap
      burns the state in until the next tap lands elsewhere. §2.
- [ ] Do not brighten a tuned colour ramp without re-measuring it by hand.
      `scripts/validate_palette.js` does not exist, whatever `RateWedge` and
      `SdltMarketValue` tell you to run. §8.

### 0.8 Copy

- [ ] **No em-dashes in user-facing copy.** Code comments, commits and PRs are
      exempt. §10.
- [ ] **No claim of clients, customers, or people served, advised or managed,
      and no count of them.** No client records exist anywhere in the estate.
      Enquiries are the only evidenced thing. §10.
- [ ] **Testimonials are anonymised.** No names, initials as a stand-in for a
      person, avatars or portfolio details that identify anyone. `PromptMarquee`
      prompts are self-identification cues, not testimonials, and the optional
      `detail` renders outside the quotation marks so it cannot read as an
      invented client quote. §10.

### 0.9 Reuse before you write

- [ ] **Look for the component before writing one.** Two pages needing the same
      band means one shared component, not two copies. `LocationChips`,
      `TestimonialsSection` and `MarketingSections` are all this pattern. §4c.
- [ ] **A page-specific visual goes in one `*-figures.tsx` beside its page**,
      not seven files and not in the shared tree. §5.
- [ ] **Know your blast radius before you edit.** §1.
- [ ] **Never restyle an estate-shared component to suit Property.** Add a token
      or a slot whose default is the current behaviour. §1.

### 0.10 Before you call it done

- [ ] Run the page in the dev server and look at it, on mobile width too.
- [ ] `npx tsc --noEmit`, `npx next lint`, `npx vitest run`, all green.
- [ ] Check both neighbours of every section you added or moved for ground
      collisions.
- [ ] If you made a decision this file does not cover, or made one it covers
      differently, **write it in here in the same session**, with the reason.
      That is the only thing keeping this document true.

---

## 1. The blast-radius rule, first

Three tiers, and knowing which one you are in decides everything else:

| Tier | Lives in | Blast radius |
|---|---|---|
| Estate-shared | `packages/web-shared/**` | **19 sites.** Never restyle in place. |
| Property-shared | `Property/web/src/components/**` | Every Property page rendering it. |
| Page figures | `*-figures.tsx` next to their page | One page. |

**Never restyle an estate-shared component to suit Property.** Two precedents,
both of which are the pattern to copy:

- **`btnPrimary` corner radius.** `packages/web-shared/components/ui/layout-utils.ts`
  hard-coded `rounded-full`, which is the generalist system's pill and is wrong on
  Property (whose `--radius` is `0`). Fixed by making the radius a token:
  `rounded-[var(--btn-radius,9999px)]`, with Property setting `--btn-radius:
  var(--radius-xl)` in `globals.css`. Sites that set nothing keep the pill.
- **The calculator pre-header.** `packages/web-shared/tools/components/Calculator.tsx`
  rendered a black `bg-slate-900` "Calculator" tag. Property's five bespoke
  calculators head themselves with `<Eyebrow>Calculator</Eyebrow>`, so a generic
  registry tool rendered beside them wore a different hat. Fixed with an optional
  `eyebrow?: React.ReactNode` slot, the same posture as the existing `resultCta`
  prop. Property's `CalculatorClient` passes its `<Eyebrow>`; the other 17 sites
  pass nothing and are untouched.

The shape of the fix is always the same: **add a token or a slot with the current
behaviour as the default.** Never change what the default renders.

---

## 2. Related reading: one card, everywhere

`src/components/blog/RelatedArticles.tsx` is the **only** article-card grid on
the site. Before it there were four, none matching, with three different hover
treatments. Do not write a fifth.

**Where it renders:** blog post foot, `/locations/[slug]`, `/calculators/[slug]`,
the service pages, and every `TopicSection` on the five topic pillars.

### The card

- Plain block with the title carrying the link and `after:absolute after:inset-0`
  stretching the hit area over the card. **Not** a `<Link>` wrapping everything:
  an anchor is inline by default, so a padded card built on one overlaps its
  neighbours. One link per card in the accessibility tree, whole card clickable.
- Hover: green glow only, `.related-card` in `globals.css`. The values are lifted
  from the `card-glow` keyframe's 40% peak so it reads as the same material as
  the scroll glow, not a second effect.
- **`@media (hover: hover)` is load-bearing.** Without it a touch tap burns the
  glow into the card until the next tap lands elsewhere. `:focus-within` is not
  gated, because it is the only way the card can show keyboard focus.
- Resting state has **no** shadow. A resting glow makes every card look hovered.

### The pill

Derived from the href by `kindFromHref`, never chosen per card, so it can never
disagree with the destination:

| Route shape | Pill |
|---|---|
| `/blog/<category>/<slug>` | Article |
| `/blog/<category>` (one segment: a hub) | Guide |
| `/calculators/<slug>` | Calculator |
| `/resources/<topic>` | Guide |
| `/services/<slug>` | Service |
| anything else | none |

**A calculator never gets a card.** Standing rule, owner 2026-08-23: where a
related-reading row would carry a `/calculators/<slug>` card, render the tool
itself as a `CalculatorTabs` block on the page instead. A card is the wrong
affordance for something the reader can use where they are standing. Live on
`/cost-of-selling-a-property` twice (its own tool, and stamp duty on the buying
side) and on `/for-letting-agents`, whose five-card `CalculatorLinkCards` block
became five tabs. The page still owes the crawl guard one literal `<a href>`, so
each tabs block carries a sentence with a real link in it.

The rule reaches the copy as well as the markup. `/for-letting-agents` said
"send one instead of doing the sum on the back of a viewing sheet", which a
`<button role="tab">` cannot honour, so it now says run it here and points at
the embed section for the agent who wants the tool on their own site.

`CalculatorLinkCards` now has **zero render consumers**. It is deliberately not
deleted: `calculator-tabs-crawl-path.test.ts` names it in its predicate and in
its failure message as the remedy for a page that has lost its links.

**No pill beats a wrong pill.** A grid mixing blog posts with calculators would
be actively misleading with a blanket "BLOG" label. Override with `kind` only
where the route genuinely cannot say what it is: `/landlord-tax` and
`/section-24` are pillar guides sitting at the top level.

### Where a related-reading block goes on the page

A card grid is not filler to close a section with. Put it where the reader has
just been given a reason to want more, not where it interrupts a run.

`/services/property-tax-advice`'s "Background reading before you book" box (its
eight blog deep links, carve-out 5) sat inside the **Scope** section, between
the coverage cards and the process timeline, where it broke the run from what
the advice covers into how an engagement works. Owner 2026-08-23: it moved down
under the changes table in **Moving parts**. A reader who has just met the rules
that are moving is the one who wants to read further.

It went `bg-white` in the same edit, because that section's ground is
`bg-slate-50` and a slate card on a slate section has no edge (§4a rule 3).
Check the ground every time one of these blocks moves.

### The excerpt

Resolved by `relatedItemsFromLinks` in `src/lib/blog.ts`, in this order:

1. `/blog/<cat>/<slug>` to `firstSentence(post.contentHtml, post.summary)`.
2. `/resources/<topic>` to `getGuideByTopic(topic).summary`, read live.
3. Anything else to `pageSummary(href)`.

**Curated labels stay as card titles.** They are hand-written anchor text
carrying topical equity (carve-out 5); never replace them with the post's own
title.

`firstSentence` takes the article's opening line, not the frontmatter summary,
because summaries range from one line to a 1,000-character statute-citing block.
It accumulates a second sentence when the first is under 40 characters: twelve
posts open on a deliberate one-word answer ("No.", "Short answer.") which is good
writing and a useless card alone. Guarded corpus-wide by
`src/tests/first-sentence.test.ts`, which asserts every published post produces a
readable excerpt.

---

## 3. `lib/page-summaries.ts`: one sentence, two consumers

A card pointing at a non-article page needs a sentence. Typing it into the link
list creates a second copy of that page's standfirst that nothing keeps in sync:
edit the hero and the card silently keeps describing the old page.

So the sentence lives in `PAGE_SUMMARIES` **once**, and the owning page imports
it for its own hero. `/landlord-tax`, the two blog category hubs and
`/services/property-tax-advice` all do this today.

**Do not add a route whose summary can be read from live data.** Blog posts and
`/resources/<topic>` are resolved at render and must not be duplicated here.

---

## 4. `TopicSection`

`src/components/property/TopicSection.tsx`. One body band on a topic pillar,
shared by `/leasehold`, `/landed-estates`, `/landlord-compliance`,
`/cost-of-selling-a-property` and `/for-letting-agents`.

- **`linksAs` defaults to `"cards"`.** The old inline underlined list is still
  reachable as `"list"` but nothing passes it. There are now zero instances of
  the old recipe anywhere on the site; do not reintroduce one.
- **`figure`** renders between the prose and the links, for a section's
  visualisation. Where a figure belongs mid-prose instead, put it inline in
  `children` (`PremiumStack` on `/leasehold` does this).
- **`tone`** alternates per section and callers set it explicitly. Two touching
  sections must never share a ground.

---

## 4a. Every section carries a visual

Standing rule, owner 2026-08-23, given three times across three pages and then
generalised: **a body section on a topic or resource page does not ship as prose
alone.** Every section gets a figure, a visualisation, a status set, a rail or a
tool. A wall of paragraphs is the pre-redesign template, and the pages that were
still shipping it read as a different site from the seven pillars.

Applied to `/cost-of-selling-a-property` (9 sections, 9 figures),
`/for-letting-agents` (7 figures plus a navy deliverables band and the calculator
tabs), `/property-tax-rates` (7, one per rate table), `/landlord-tax` (6 new, on
top of the visuals it already carried) and `/research/landlord-tax-index`
(rebuilt on the standard skeleton, see 4b).

On a reference page the figure does not replace the table. `/property-tax-rates`
keeps every rate table, because the table is what makes the page citable, and
`rates-figures.tsx` holds the **single band source that the tables and the
ladders both read**. That is one step past `SdltMarketValue`: not just derived
from an engine, but the same array feeding both renderings, so a table and the
figure beside it cannot disagree.

What the figure adds on that page is the thing a table structurally cannot show,
which is how a rate is applied: main bands are marginal and surcharges are not,
corporation tax has a middle zone whose effective rate is higher than its top
rate, and the MTD threshold falls in steps rather than sitting still.

The rule has three parts and the third is the one that gets skipped:

1. **Pick the shape from the claim**, using the table in section 5. A grid says
   "N equivalent things" and is wrong for a sequence, a cumulative test or an
   escalation.
2. **The figure re-presents the section's own copy.** It never invents a fact to
   fill a shape out. If the copy has no numbers, the figure has no numbers.
3. **Ground alternation applies to the figure's own surface, not just the
   section's.** A white card on a white section has no edge. A figure on a
   `tone="white"` section takes `bg-slate-50`; on a `tone="slate"` section it
   takes `bg-white`. Check this every time, because it is invisible in the source
   and obvious on the page.

A section whose whole content is a tool (a `CalculatorTabs` block) or a
deliverables band already satisfies the rule and needs nothing further.

**Where the figure goes.** `TopicSection`'s `figure` slot renders after ALL
children, so it is only right when the figure closes the section. Where the
figure belongs mid-prose, or where a CTA block has to close, put the figure
inline in `children` instead. `PremiumStack` on `/leasehold`, `BillStack` on
`/cost-of-selling-a-property` and `ForwardTraits` on `/for-letting-agents` all do
this.

---

## 4b. The page skeleton every content page follows

Written out because `/research/landlord-tax-index` was still shipping a
pre-redesign skeleton on 2026-08-23 and nothing said what the shipped one is.
Every content page outside `/blog` and `/calculators` now looks like this, in
this order:

1. **Hero.** Navy with `<HeroBrickBackdrop />` (or `TopicHero`'s cream variant),
   `relative overflow-hidden` on the section and `relative z-10` on the content.
   Breadcrumb, `<Eyebrow onDark>`, h1, standfirst, then a CTA row.
2. **Body sections**, each a `TopicSection` (or a full-bleed section on the same
   recipe): `scroll-mt-24`, `py-12 sm:py-16 lg:py-20`, `Eyebrow`, the
   `text-2xl font-bold text-slate-900 sm:text-4xl` h2, `Prose`, then the figure.
3. **The closing ask**, `<div id="book" className="scroll-mt-24">` wrapping
   `LeadCTAPanel`.
4. **`FaqSection`**, which is also what keeps the navy panel off the navy footer.

The rules that were being broken, each now with a page that proves the fix:

- **The hero carries a primary CTA to `#book`.** A page a reader can scroll to
  the bottom of without meeting an ask is not finished, and research and
  reference surfaces are the ones this keeps happening to.
- **No bare `LeadForm` in a coloured card.** The form is `LeadCTAPanel`, the
  full-bleed navy brick panel, everywhere. The mint gradient card on the index
  page was the last survivor of the old treatment.
- **No hand-rolled FAQ.** `FaqSection` plus `buildFaqPageJsonLd(faqs)` on the
  same array, always. Four h3-and-paragraph pairs are not the FAQ pattern.
- **The body uses the full container.** `siteContainerLg` IS the measure. An
  inner `max-w-4xl` wrapper around a whole page body makes the content sit in a
  narrower column than every other page and reads as a different site. The one
  place a narrow measure is allowed is hero copy.
- **Grounds oscillate.** Consecutive sections never share a ground, and a page
  whose body is one long white block has no section boundaries at all. Set
  `tone` explicitly per section; do not let a component count for you.
- **Radii and edges are `rounded-xl` with `ring-1 ring-slate-200/70`.**
  `rounded-2xl` and `border border-slate-200` are the pre-redesign recipe.
- **Hero stat tiles belong in the section that explains them.** Four numbers
  floating in a hero are decoration; the same four above the sentences that
  source and caveat them are the argument.

---

## 4c. `MarketingSections.tsx`: the homepage bands `/contact` also carries

`src/components/property/MarketingSections.tsx` exports `WhoWeAreSection`,
`WhyChooseUsSection` and `WhatWeCoverSection`. Both the homepage and `/contact`
render them.

Owner 2026-08-23: `/contact` was a hero and a form, so a reader who was not
already sold met the ask having read none of the argument the homepage makes.
It now runs **hero, form, Who we are, Why choose us, Testimonials, What we
cover**.

**The form stays directly under the hero.** It was tried below the four bands
and moved back the same day: `/contact` is the page a reader arrives on already
intending to enquire, so making them scroll past the argument to reach the form
costs more than the argument wins. The bands are what they read if the form does
not close them on its own.

They were **lifted out of `app/page.tsx`, not copied into
`app/contact/page.tsx`**, the same posture as `LocationChips` and
`TestimonialsSection` before them. Two copies of `whoWeAre`, `whyUs` and the
`guideGroups` markup would drift the first time one page's copy was edited.

Two things this pulled with it:

- **`WhatWeCoverSection` takes `tone`.** Its neighbours differ between the two
  hosts, so it cannot hard-code a ground. `"slate"` (default, the homepage) puts
  white cards on `bg-slate-50`; `"white"` (`/contact`) puts `bg-slate-50` cards
  on white. Row hover flips with it. §9 and §4a rule 3 both apply.
- **`/contact`'s form section went `bg-slate-50` and gained
  `id="book" scroll-mt-24`.** Its "Speak to us" card went `bg-white` in the same
  edit, because a slate card on a slate section has no edge.

The full grounds run: navy hero, slate-50 form, white, slate-50, navy
testimonials, white. **Testimonials sits third rather than last** because the
footer is `slate-900` and navy must not touch navy, which is also why
`WhatWeCoverSection` closes the page on white. Check both before reordering.

---

## 4d. `/thank-you`, `/book` and `/complete`, the post-submit surfaces

Brought onto the skeleton 2026-08-23. They were the last pre-redesign pages on
the site: no hero, no brick backdrop, square corners throughout, a
`bg-emerald-600 p-6` block for the tick, and `btnSecondary` reimplemented inline
four times as `border-2 border-slate-300`.

**Treat the three as one set.** They are the token-gated pages a lead meets
after they have already acted, they share `BookingPicker` and the same outcome
cards, and doing one and leaving the others is what produced the drift in the
first place: `/complete`'s "needs the personal link" card was a hand-copy of
`/book`'s, so restyling `/book` alone silently made the pair disagree.

Two shared components carry the set, and a fourth page joining it should use
both rather than hand-rolling:

- **`components/ui/SlimHero.tsx`** is the shallow navy hero all three open on.
  It is deliberately not configurable into the content-page hero.
- **`components/ui/NoticeCard.tsx`** is the outcome card ("link expired", "you
  are all set", "callback booked", "we saved that"). There were **eight**
  near-copies across `/book`, `/complete`, `BookingPicker` and `DetailsForm`.
  `tone` is meaning, not decoration: `emerald` for a good outcome, `slate` for a
  neutral dead end. There is no red tone on purpose, because none of these
  states is the reader's fault.

- **`components/property/WhatToExpectCard.tsx`** is the navy reassurance card
  that sits beside the ask. Four consumers: `/contact` (where it was inline and
  from which it was lifted), plus all three of these.

### The two-column body, and the clamp that is no longer there

All three run their body as `lg:grid-cols-[1.6fr_1fr]`: the ask in the wide
column, `WhatToExpectCard` beside it. `/contact`'s anatomy, reused.

**There is no `max-w-2xl` on these pages.** A first pass put the picker and the
two-field form in a `max-w-2xl` column under a full-width heading and recorded
that here as a legitimate carve-out. It was not one. A lone narrow column leaves
half the container empty, which is the same defect §0.1 exists to stop, just
achieved by a different route. Putting something useful in the other column
fixes the layout AND the conversion, so **there is still no place on this site
where a body element is clamped.** If you find yourself wanting to clamp, the
question is what belongs beside it.

### Why these pages have reassurance at all

Expectation-setting IS the conversion work on a post-submit surface. The reader
has already acted. The only thing left to win is whether they answer the phone,
so the card says how long the call is, who is ringing, that the specialist has
read the enquiry, and that a fee quote only follows if they want one. That is
worth more here than another CTA.

**Every claim in those cards is checked against a live source before shipping.**
A first draft of `/complete`'s card promised "we never pass your details on
without telling you first" and "no marketing list". **Both are false.**
`/privacy-policy` §5 discloses that up to six firms may receive an enquiry,
three accountancy or tax and three in related professions. Reassurance copy
sitting next to a data-capture field is the very last place to write something
the privacy policy contradicts. The card now links to the policy instead of
paraphrasing it.

### `/thank-you` when there is no `bt`

The submit route mints the booking token, so in production `bt` is effectively
always present and the picker is the live path. The no-token branch only fires
when `LEAD_NURTURE_TOKEN_SECRET` is unset.

That branch used to offer "Ready to book a time that works for you?" pointing at
`/contact`, **which is the form the reader has just filled in.** A CTA whose
only destination is the thing the reader has already done is worse than no CTA.
It now states what is actually true (the enquiry is in, nothing else to do) in a
`NoticeCard`, and the reading row below carries the onward journey.

**Every branch was kept.** `/thank-you` has four states and all of them still
render: opted out (`?optout=1`), confirmed (`?confirmed=1`), the default
post-submit state, and the default state carrying the inline `BookingPicker`
(`?bt=<token>`). So is the `?rt=` return link, with its `data-cta` and
`data-cta-placement` intact (§7), and so is the `LEAD_NURTURE_ENABLED` copy
fork, which must not be collapsed: the "we have just messaged you" wording is
only truthful once nurture is armed.

`/complete` keeps its four branches too: no token, invalid or expired token,
token whose lead is already complete (offers a freshly minted `book` token), and
the `DetailsForm` asking only for the field or fields still below floor. It
never asks for email. `verifyLeadToken` catches a missing or short
`LEAD_NURTURE_TOKEN_SECRET` internally and returns `bad-signature`
(`tokens.ts:105-109`), so an unconfigured environment degrades to the
expired-link card rather than a 500. The page's own code does not look guarded,
which is why there is now a comment there saying it is.

Four departures from §4b, all deliberate and all owner calls:

- **No `LeadCTAPanel`.** The reader has just submitted the form. The closing ask
  on this page is the callback slot, not a second enquiry form.
- **No breadcrumb in the hero.** The page is `noindex` and is not a navigable
  destination, so a trail to it would be fiction.
- **The hero is shallow and carries no CTA.** `py-8 sm:py-10 lg:py-12`, no
  `min-h`, h1 at `text-2xl sm:text-4xl lg:text-5xl`, and eyebrow, h1 and
  standfirst only. §4b's "the hero carries a primary CTA to `#book`" exists to
  stop a reader reaching the foot without meeting an ask; here the ask is the
  picker one section down, and a hero button plus a tall hero pushed it under
  the fold. A first pass shipped both and they were removed the same day.
- **No tick badge above the h1.** Same reason. The tick still appears inside the
  progress row, where it means "this step is done" rather than decorating.

**§0.2 has exactly one recorded exemption on the whole site**, and it is the
opt-out branch of `/thank-you`: prose and two links, no visual. Putting a
reading grid in front of someone who has just asked us to stop contacting them
would be the wrong read. Every other section on all three pages carries a tool,
a card grid or the reassurance card.

The rule that did bind, and is the reason the two short branches are not just a
hero: **navy must never touch navy (§9)**, and the footer is `slate-900`. The
opted-out and confirmed branches therefore each carry a light section under the
hero. On the default branch the run is navy hero, white, slate-50.

`BookingPicker` is shared by `/thank-you` and `/book`, and its own docstring
said "house style: sharp corners". Its day and window chips are now
`rounded-xl`, its idle border is `slate-200` rather than `slate-300`, and its
done and expired panels are `rounded-xl` with a hairline ring. Restyling it was
not optional once the page around it moved: it was the only square-cornered
thing left inside a rounded card.

**The picker renders from any non-empty `bt`.** The token is verified server
side when the slot is posted to `/api/leads/book`, not at render, so
`?bt=demo123` is enough to see the component locally. Only booking a slot needs
a real signed token.

---

## 4e. Hub pagination: hide, never slice

The nine `/blog/<category>` hubs paginate their article grid at **12 per page**,
the same as `/blog`, using the same `NumberedPagination` bar. Turned on
2026-08-23; before that the reader scrolled past up to 150 cards to reach the
closing `LeadCTAPanel`.

**`HubArticleList` renders every post and hides the off-page ones with the
`hidden` attribute. It must never `slice()`.** This is the whole rule and it is
not a style preference:

- `NumberedPagination` renders `<button>`, not `<a href>`. Page state is client
  state, so a sliced grid puts cards 13..N outside the server HTML entirely.
- The hubs are the **only full HTML crawl path to the ~750-post corpus**.
  `/blog` is a searchable sliced list, so most posts are reachable from nowhere
  else. Slicing would have taken the nine hubs from 749 server-rendered article
  links to 108.

That conflict is why the hubs originally shipped with paging disabled
(`postsPerPage={articleItems.length}`), trading the reader's experience for the
crawl path. Hiding buys both: crawlers see every anchor on first render,
assistive tech skips what is off-screen because `hidden` drops it from the
accessibility tree, and the reader gets twelve at a time with the grid scrolling
back to its own top on a page change rather than the window jumping.

Guarded by `src/tests/hub-article-crawl-path.test.ts`, a source scan on both
halves: `HubArticleList` must map the full array and must not slice it, and
`BlogCategoryHub` must not go back to forcing one page. Verified live on the
largest hub, `landlord-tax-essentials`: 163 crawlable links, 12 visible, 151
hidden, "Page 1 of 14".

---

## 5. Page figures

Each heavy page keeps its figures in one `*-figures.tsx` beside its siblings in
`src/components/property/`: `leasehold-figures.tsx`,
`compliance-figures.tsx`, `estate-figures.tsx`. One file rather than seven,
because none of these is reusable off its page. Same reason `TopicSection.tsx`
exports its hero alongside it.

### The rules every figure follows

1. **A figure re-presents copy. It never invents a fact.** Every date, figure,
   statute and status must already exist in the page's prose or its data arrays.
   Where a figure and the prose carry the same number, the comment says to change
   them in the same edit.
2. **Derive, never type.** `SdltMarketValue` computes every figure from
   `lib/sdlt.ts`, the same engine behind the calculators the page links to, so it
   cannot drift. `AllowanceSplit` derives its whole worked example from two
   constants. **Never hard-code a total** that an engine can produce.
3. **Colour is meaning, never decoration.** Emerald for relief, satisfied or
   money kept; amber where a duty bites or a charge catches people out; red for
   no relief or a criminal track; slate for neutral or does-not-apply.
4. **Every value is direct-labelled**, so nothing rests on hue and bars can be
   `aria-hidden`.
5. **Neutral dash, never a red cross**, for the other side of a comparison where
   nobody is doing anything wrong. Follows `ComparisonTable` and `SchemeFlow`.
6. **`ExampleFigureNote` goes on every visual carrying figures**, including
   statutory ones. Owner decision, do not re-split it. The one exception is
   `StatsCounter`.

### Reusable figure shapes, and when each is right

| Shape | Use when | Example |
|---|---|---|
| Timeline rail | The claim is about WHEN, or about accretion over time | `CommencementTimeline`, `LeaseholdStatuteMap` |
| Hollow amber marker on the same rail | Not in force, not yet reached | `CommencementTimeline`, `HorizonList` |
| Two-column compare | A binary lookup ("does mine count") | `InvestmentLine`, `FireScope`, `CommercialSplit` |
| Badged status cards | Several states the copy warns get confused | `GroundRentStates` (Law / Unchanged / Not law) |
| Gate chain | Cumulative conditions, all must hold | `IncorporationReliefGates` |
| Figure chip on a card | A section a reader scans for one number | `LeaseholdTaxCards`, `FigureCard` |
| Split bar | Two quantities on one scale | `Section24Wedge`, `AllowanceSplit` |

**A grid says "N equivalent things".** If the copy's claim is a sequence, a
cumulative test, or an escalation, a grid actively contradicts it. That is why
`IncorporationReliefGates` is a chain and `LeaseholdStatuteMap` is a rail.

---

## 6. Calculators on a page

- **Tabs, not link cards.** `CalculatorTabs` takes an explicit `tabs` list, so a
  page renders exactly the tools it is about. `/leasehold` renders
  `["stampduty"]`, `/landed-estates` renders `["bprapr"]`,
  `/cost-of-selling-a-property` renders `["costofselling"]`.
- **A generic registry tool can be a tab.** `bprapr` was the first and
  `costofselling` the second, both backed by `CalculatorClient` by slug rather
  than a bespoke component. That is the route for any future registry tool: add a
  key, a `TABS` row, and a line in the panel switch. **Never write a second copy
  of a calculator.**
- **A hero secondary may point at the on-page tab** rather than out to
  `/calculators/<slug>`, which is what `/cost-of-selling-a-property` does
  (`#calculator`). It keeps the reader on the page and in front of the form at
  the foot. The page still owes the crawl guard one literal `<a href>`.
- **Tabs emit no crawlable link.** `CalculatorTabs` renders
  `<button role="tab">`, so a page rendering it must carry its own `<a href>` to
  a specific `/calculators/<slug>`, or `src/tests/calculator-tabs-crawl-path.test.ts`
  fails. That guard is a **source scan**: it cannot see through a local constant,
  which is why `/landed-estates` spells one href out literally with a comment
  saying so.
- **Two exemptions exist and both are recorded decisions**, not conveniences.
  `NO_PRIOR_INBODY_CALCULATOR_LINKS` (the homepage never had the equity) and
  `OWNER_REMOVED_INBODY_LINKS` (the owner chose to spend it). The correct
  response to a red test is still to restore the links unless the owner says
  otherwise.
- Property's `CalculatorClient` passes `<Eyebrow>Calculator</Eyebrow>`, see §1.

### 6a. A calculator page's body runs the full container

Standing rule, owner 2026-08-23. **Every `/calculators/*` page uses
`siteContainerLg` as the measure for its body, exactly like the service and
topic pages.** No `max-w-3xl`, `max-w-4xl` or `max-w-5xl` wrapper around the
explainer, the rate tables, the worked examples, the FAQ or the related links.
This is §4b's "the body uses the full container" rule, restated here because the
calculator routes are the ones that kept missing it.

The one narrow measure that stays is the **hero standfirst**, which is
`max-w-3xl` on all six routes and should remain so.

`/calculators/stamp-duty-calculator` was the last page still boxed: two
`max-w-3xl` wrappers, one round the whole explainer and one round the FAQ and
related-links block, which made it read as a narrower site than
`/calculators/[slug]` sitting beside it. Fixing it also took the two things the
box was hiding:

- Its h2s were `sm:text-3xl`, a size that exists nowhere else on the site. Now
  `text-2xl font-bold text-slate-900 sm:text-4xl`, the §4b heading.
- Its FAQ was a hand-rolled `dl` with its own inline `FAQPage` object over
  `q`/`a` keys. Now `FaqSection` plus `buildFaqPageJsonLd` on the same
  `{question, answer}` array, per §4b. It is `tone="white"` on its `bg-slate-50`
  section, and that light section is still what keeps the navy `LeadCTAPanel`
  above it off the navy footer.

The other four bespoke calculators and `/calculators/[slug]` already comply.
`/calculators` itself is an index, not a body page: its `max-w-3xl` blocks are
section standfirsts above full-width grids, which is the intro pattern, not a
body clamp.

**Site-wide audit, 2026-08-23.** Every `max-w-3xl`, `max-w-4xl` and `max-w-5xl`
in `src/app/**` was read in context after this fix. All remaining instances are
either hero copy blocks or the `Eyebrow` + h2 + standfirst block that sits above
a full-width grid. **There are now zero body clamps anywhere on the site.** If
you add one, you are the regression. The three previously-recorded offenders
are all closed: `/research/landlord-tax-index` (§4b), `/locations/[slug]` (its
`max-w-4xl mx-auto` 896px column) and `/incorporation` (its mid-page
`max-w-4xl`).

---

## 7. CTAs

- **On-page primary green CTAs scroll to the on-page form**, `href="#book"`.
  **Only** the header CTA and the sticky bottom banner leave for `/contact`.
  Every page with an on-page form carries `id="book" className="scroll-mt-24"`;
  the blog uses `#enquiry-form`, calculator pages `#get-expert-help`.
- The hero primary comes from `niche.config.json` `cta.variants.leadgen.hero_primary`,
  which is `#book`. The header and sticky entries stay `/contact`.
- **A bare button is not a CTA block.** The pattern is a white card with a
  hairline ring, a statement on the left and the button on the right, stacking on
  mobile: `mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex
  sm:items-center sm:justify-between sm:gap-6 sm:p-8`. Live on `/incorporation`,
  `/landlord-compliance`, `/landed-estates` and `/section-24`. The statement is
  the reason to click now and must be specific to its section.
- **Keep `data-cta`, `data-cta-placement` and `data-cta-goal` when moving a
  CTA.** They feed `vw_cta_performance`; changing one silently breaks a funnel
  row.

---

## 8. Accessibility floors that have already been fought for

- **4.5:1 for text**, including 11px fine print and 14px bold. 14px bold is not
  WCAG large text; 3:1 does not apply.
- Rule Zero (c): slate-500, never the designer's slate-400, on light grounds.
  `ExampleFigureNote`, `ComparisonTable` and `SchemeFlow` all took this swap.
- `PenaltyLadder`'s ramp is amber-700, orange-700, red-600, red-800: 5.02, 5.18,
  4.83 and 8.31:1. **The brighter options fail** (amber-600 at 3.19, orange-600
  at 3.56). Do not brighten without re-measuring.
- **The first step of an escalation stays fully saturated.** An earlier pass
  greyed it and it read as "inactive" when the £100 is a real penalty landing the
  day after the deadline.
- `DrawnTickList`'s default emerald-400 tick is tuned for navy and measures about
  1.9:1 on white. Pass `tickClassName="text-emerald-600"` (4.54:1) on a light
  ground.
- Motion sits behind `prefers-reduced-motion: no-preference`, the undrawn state
  is scoped to `[data-draw="off"]` in server HTML, and no-JS is released by the
  `<noscript>` override in the root layout. Reduced motion, no
  `IntersectionObserver` and no JavaScript must all land on "fully drawn and
  still".
- **`scripts/validate_palette.js` does not exist.** `RateWedge` and
  `SdltMarketValue` both instruct you to run it. Measure contrast by hand until
  someone writes it.

---

## 9. Section grounds

Consecutive sections must never share a ground, and **navy must never touch
navy**. The site footer is `slate-900` with the brick backdrop, so a full-bleed
`LeadCTAPanel` needs a light section between it and the foot of the page. The
canonical tail is **panel, FAQ, footer** (`/landlord-tax`,
`/calculators/[slug]`, `/incorporation`).

`LeadCTAPanel`'s `contained` prop is the light inset variant, for where a navy
band would collide. Dropping `contained` is only safe if the section above is
light too.

**A navy band mid-page is for a section addressed AT the reader**, not about a
topic: the hero, the closing panel, and a deliverables block. `EmbedDeliverables`
on `/for-letting-agents` is the pattern for the third case, added 2026-08-23 on
the owner's call that the embed offer is a deliverable and should look like one
rather than reading as a footnote to the calculators above it. The recipe is the
hero's: `relative overflow-hidden bg-slate-900`, `<HeroBrickBackdrop />`,
`relative z-10` on the content, `<Eyebrow onDark>`, white h2, `slate-200` body,
then cards on `bg-white/5 ring-1 ring-white/15` and a `btnOnDark` button. Check
both neighbours are light before adding one.

---

## 10. Copy rules that bind design work

- **No em-dashes in user-facing copy.** Code comments, commits and PRs exempt.
- **Property is lead-generation.** No client records exist anywhere in the
  estate, so no surface may claim clients, customers, or people served, advised
  or managed, or carry a count of them. Enquiries are the only evidenced thing.
  `StatsCounter` says "280+ Properties enquired about" and the SQL is in
  `src/lib/site-stats.ts`. DECISION M ("100+ Landlords served") is open for
  exactly this reason.
- **Prompts in `PromptMarquee` are unattributed self-identification cues, not
  testimonials.** No names, initials, avatars or portfolio details. The optional
  `detail` renders outside the quotation marks and out of italic, because folded
  into the quote it would read as an invented client quote.
- **Every published number must be re-derivable.** If an engine can produce it,
  derive it. If house positions does not carry it, do not publish it: the Section
  24 phase-in percentages were deliberately left out on that basis.
