# contractors-ir35 design port, phase plan (phases 1 to 6)

Written 2026-09-12. Planning only. No code and no content changed by this document.

Site key `contractors-ir35`. Display name "Contractor Tax Accountants". Brand primary
`#0e7490` (`contractors-ir35/niche.config.json:22`). Family B. 62 posts, 34 page files,
LIVE. Production SHA `18b4f25f` (`P0B_DEPLOY_BASELINE.md`).

Companion docs, do not duplicate them here: `P0A_INVENTORY.md` (routes, components,
capture surfaces), `P0B_DEPLOY_BASELINE.md` + `sweep_baseline.json` (link floor),
`P0C1/C2/C3` (claims ledgers), `P0D_CSS_A11Y.md` (unlayered CSS, contrast, breakpoints),
`P0E_CRAWL_INTEGRITY.md` (server-HTML href counts, dead links, data-cta inventory).
`DESIGN_DELTA.md` is being authored by another agent and is the authority on visual
target; where this plan and that document disagree about what a surface should look
like, that document wins and this one is corrected.

---

## A. Phase numbering, stated explicitly

**This site uses the PLAYBOOK numbering, unmodified. Chrome is ONE phase.**

| Phase | Scope on this site |
|---|---|
| 0 | Baseline + claims audit. DONE. |
| 1 | Chrome: tokens, header, footer, shell, sticky CTA, backdrop |
| 2 | Blog subsystem: renderer, index, category projection |
| 3 | Article templates, hubs, indexes |
| 4 | Calculators |
| 5 | Homepage, pillars, locations |
| 6 | The rest: contact, post-submit, about, research, magnets, legal, interruptive restyle |

Tags: `port-contractors-ir35-phase1` through `port-contractors-ir35-phase6`.

**Do NOT copy the Medical exception.** Medical split chrome into "1 tokens, 2 chrome"
and every later phase on that site sits one ahead of the table above, so Medical's
`phase3` tag is the blog phase, not the templates phase. That split is recorded so
nobody reads a Medical artefact as if it used the default numbering. This site does not
split, because the phase-0 CSS audit found only 3 unlayered blocks and none hazardous
(`P0D_CSS_A11Y.md`), so the token work is small enough to ride inside phase 1 and there
is nothing to gain from a second tag. **If any agent proposes splitting a phase
mid-port, the split must be written into this table in the same commit, or the next
agent reads a tag number that means something different from what it says.**

---

## B. The kit gap

Kit enumerated by `ls -R packages/web-shared/design/` (2026-09-12): 7 blog components,
4 chrome files, 15 marketing components, 9 primitives, 4 guard pairs.

### B.1 The adoption precedent, and the one place it bites on this site

Adopting a kit component is not automatically safe. On a sibling site the kit
`FaqSection` would have STRIPPED answer text out of the server HTML of 196 posts,
because that site already rendered its answers in a plain list that WAS in the server
HTML. **This site has exactly that shape, and it is worse.**

What this site emits today, `src/components/blog/BlogPostRenderer.tsx:276-286`:

```
<section aria-labelledby="faq-heading"> ... <dl>
  <dt>{faq.question}</dt>
  <dd><span dangerouslySetInnerHTML={{ __html: faq.answer }} /></dd>
```

A `<dl>/<dt>/<dd>`, fully server-rendered, answers included, answers carrying raw HTML.

What the kit `FaqSection` would emit
(`packages/web-shared/design/primitives/FaqSection.tsx:33-44`): a Radix
`Accordion type="single" collapsible`, whose `AccordionContent` has no `forceMount`
(`packages/web-shared/design/primitives/accordion.tsx:49-63`, `@radix-ui/react-accordion`).
Closed content is not in the document.

Two independent regressions if adopted on the blog:

1. **62 posts lose their FAQ answer text from server HTML.** Command that shows the
   blast radius: `grep -c "^faqs:" contractors-ir35/web/content/blog/*.md | grep -vc ":0"`.
2. **3 posts would render their answer markup as visible literal text**, because the kit
   renders `<p>{faq.answer}</p>` (escaped) where this site renders
   `dangerouslySetInnerHTML`. Command:
   `grep -lE '^\s+answer: .*<(strong|a |em|ul|li|br|p)' contractors-ir35/web/content/blog/*.md | wc -l` = 3.

**Ruling: the kit `FaqSection` is BANNED on the blog post template.** It may be adopted
on marketing pages that author their FAQ entries as plain strings in page source, and
only after the adopting package confirms by `curl` that the pre-port page did not already
put those answers in server HTML. That confirmation is a line in the package receipt, not
an assumption.

### B.2 Classification of every template this site needs

Classes: **AS-IS** = kit component adopted unchanged. **PROP** = kit component adopted
with a documented prop (props are the playbook §8 supported hooks; do not invent rivals).
**LOCAL** = site-local component, kit cannot serve it.

| Need | Kit component | Class | Why |
|---|---|---|---|
| Page shell | `design/chrome/PageShell` | PROP | replaces local `layout/PageShell.tsx` |
| Header | `design/chrome/SiteHeader` | PROP | see B.3, the props are NOT optional here |
| Footer | `design/chrome/SiteFooter` | PROP | `showBuilderCredit` defaults true, pass nothing |
| Sticky CTA | `design/marketing/StickyCTA` | PROP | local `ui/StickyCTA.tsx` carries `data-cta="sticky_cta"`, `data-cta-placement="sticky"`, conditional goal (`src/components/ui/StickyCTA.tsx:159-161`); those three must survive |
| Breadcrumb | `design/primitives/Breadcrumb` | AS-IS | local `ui/Breadcrumb.tsx` has 15 importers, swap at import site |
| Blog index list | `design/blog/BlogListWithSearch` | PROP | see B.4, the pagination defect is the reason |
| Category hub | `design/blog/BlogCategoryHub` | PROP | `heading` prop, 7 categories |
| Hub article list | `design/blog/HubArticleList` | AS-IS | |
| Related articles | `design/blog/RelatedArticles` | AS-IS | |
| Blog sidebar CTA | `design/blog/BlogSidebarCta` | PROP | `ctaPlacement`, `buttonLabel`, `buttonClassName` |
| Table of contents | `content/TableOfContents` | PROP | `stickyDesktop`; renderer already mounts it twice |
| Reading progress | `design/blog/ReadingProgress` | AS-IS | already mounted |
| Post FAQ block | `design/primitives/FaqSection` | **LOCAL, BANNED** | B.1 |
| Marketing FAQ block | `design/primitives/FaqSection` | AS-IS, gated | only after the per-page server-HTML check in B.1 |
| Hero | `design/primitives/SlimHero` | AS-IS | |
| Eyebrow rule | `design/primitives/EyebrowRule` | AS-IS | |
| Notice / callout | `design/primitives/NoticeCard` | AS-IS | candidate host for `keyTakeaways`, see D |
| Figure note | `design/primitives/ExampleFigureNote` | AS-IS | |
| Pagination | `design/primitives/NumberedPagination` | AS-IS | this is the fix for the blog crawl defect, B.4 |
| Page blocks | `design/primitives/page-blocks` | AS-IS | |
| Comparison table | `design/marketing/ComparisonTable` | AS-IS | umbrella-vs-limited surfaces |
| Coverage cards | `design/marketing/CoverageCards` | AS-IS | `/for`, `/locations` indexes |
| Process timeline | `design/marketing/ProcessTimeline` | AS-IS | |
| Problem statement | `design/marketing/ProblemStatement` | AS-IS | |
| Numbered reasons | `design/marketing/NumberedReasons` | AS-IS | |
| Why-us list | `design/marketing/WhyUsList` | AS-IS | |
| Drawn tick list | `design/marketing/DrawnTickList` | AS-IS | |
| Topic section | `design/marketing/TopicSection` | PROP | `bullets` where published prose carries lists |
| What to expect | `design/marketing/WhatToExpectCard` | AS-IS | |
| Lead CTA panel | `design/marketing/LeadCTAPanel` | AS-IS | |
| Stats counter | `design/marketing/StatsCounter` | AS-IS | |
| Prompt marquee | `design/marketing/PromptMarquee` | AS-IS | |
| Scroll glow group | `design/marketing/ScrollGlowGroup` | AS-IS | |
| Testimonials | `design/marketing/TestimonialsSection` | **LOCAL / OWNER-GATED** | P0C2 flagged the homepage testimonial heading; do not build a testimonial surface until that ledger row is closed |
| Lead form | `src/components/forms/LeadForm.tsx` | LOCAL | 12 importers, kit has no equivalent |
| Mini capture | `packages/web-shared/leads/MiniCapture` | PROP | consider `--brand-primary-text`, see B.5 |
| Calculator shell | `src/components/calculators/*` | LOCAL | kit has no calculator |
| Premium calc + gate | `src/components/calculators/premium/*` | LOCAL | |
| Research charts x3 | `src/components/research/*` | LOCAL | bespoke data journalism |
| Embed surfaces | `src/components/embed/*` | LOCAL | |
| Resource gate | `src/components/resources/ResourceGate.tsx` | LOCAL | consent string is unit-pinned, see D |
| Glossary entry body | LOCAL | LOCAL | raw-HTML bodies, same escaping hazard as B.1 |
| Booking picker | `src/components/forms/BookingPicker.tsx` | LOCAL | |
| Intent surfaces x4 | `src/components/intent/*`, `support/SpecialistWidget` | LOCAL | restyle only, phase 6 |
| Admin console | `web-shared/console/*` | AS-IS, NOT TOUCHED | out of port scope |

Tally: 22 AS-IS, 10 PROP, 12 LOCAL (1 of which is a ban, 1 owner-gated).

### B.3 The chrome props this site MUST pass, and the correction to the playbook

Playbook §8.11 says to pass "the site's own pre-port `data-cta-goal`" on
`SiteHeader.ctaContactGoal` and the site's own `data-cta-placement` on
`ctaMobilePlacement`, because the kit defaults are Property's literals and a silent
inherit splits the live funnel series.

**Verified against source: this site has NO pre-port header CTA attribute to preserve.**

```
grep -n "data-cta" contractors-ir35/web/src/components/layout/SiteHeader.tsx   # 0 hits
grep -rhoE 'data-cta-goal="[^"]*"' contractors-ir35/web/src           # 0 hits
grep -rhoE 'data-cta-placement="[^"]*"' contractors-ir35/web/src      # 1 hit, "sticky"
```

So the port does not preserve a header goal, it **introduces** one. Consequences that
the phase-1 package owns explicitly:

- The kit header will ADD `data-cta` attributes that the baseline does not have. The
  sweep's `data-cta` count will rise above the 219 baseline. **That is expected here and
  is not a regression**, unlike on a site that had header CTAs already. The package
  receipt records the new count and the ids that produced the delta.
- `ctaContactGoal` and `ctaMobilePlacement` are still passed EXPLICITLY, chosen
  deliberately and written into the receipt, rather than left to default to Property's
  `"form"` / `"mobile_menu"`. Defaulting would make this site's brand-new series
  indistinguishable from Property's convention by accident rather than by decision.
- `SiteHeader.wordmarkAccentColor`: brand `#0e7490` is Tailwind cyan-700 exactly, so it
  IS a ramp step and the prop is probably unnecessary. UNVERIFIED until phase 1 renders
  the header and the browser check reports the computed colours; if the wordmark and the
  CTA show two different cyans, pass it.
- `SiteFooter.showBuilderCredit`: pass nothing. Default is `true` and the 2026-09-11
  owner ruling made the credit estate-wide.

### B.4 The blog index defect the kit fixes

`P0E_CRAWL_INTEGRITY.md`: `/blog` serves 12 of 62 articles (19.4%) in server HTML, the
rest behind client-side button pagination. `design/primitives/NumberedPagination` plus
`design/guards/hub-article-crawl-path.ts` exist precisely for this. **The phase-2 package
that adopts them must prove the fix, not assert it**: the receipt carries a before and
after of `curl -s http://localhost:3611/blog | grep -oE 'href="/blog/[^"]+"' | sort -u | wc -l`.
This is a link-floor INCREASE, which the sweep permits (only decreases block).

### B.5 Brand contrast tokens

`#0e7490` on white is a dark cyan and should clear the 4.5:1 text floor comfortably, so
`--brand-primary-text` and `--brand-primary-ground` are likely both unnecessary.
UNVERIFIED by measurement. The phase-1 gate is `browser_check.mjs`, whose contrast pass
is the deciding instrument; if it reports a breach at the MiniCapture consent link or the
ServiceTiers badge, define the token then and not before. Do not define a token
pre-emptively: a site that does not define them renders byte-identically.

---

## C. Template coverage census, all 34 page files

Command: `find contractors-ir35/web/src/app -name "page.tsx" | wc -l` = 34.
Of those, 5 are the admin console (`/admin/analytics/**`), entirely
`web-shared/console/*`, **out of port scope, not restyled, not swept**. Public routes: 29.

A comparable family-B site mapped 14 of 31 public route files to templates and ran 17 on
recorded anatomy. This site is close to that: **15 of 29 mapped, 14 on recorded anatomy,
coverage ratio 15/29 = 51.7%.** Coverage is about half, not most. Plan for it.

### C.1 Mapped to a template (15)

| Route | Instances | Template | Phase |
|---|---|---|---|
| `/blog` | 1 | kit blog index | 2 |
| `/blog/[category]` | 7 | `BlogCategoryHub` | 2 |
| `/blog/[category]/[slug]` | 62 | post template | 2 |
| `/calculators` | 1 | calculator index | 4 |
| `/calculators/[slug]` | 10 | calculator template | 4 |
| `/` | 1 | homepage composite | 5 |
| `/services` | 1 | pillar + `ServiceTiers` | 5 |
| `/ir35-status` | 1 | pillar | 5 |
| `/for` | 1 | `CoverageCards` index | 5 |
| `/for/[slug]` | 12 | pillar | 5 |
| `/locations` | 1 | `CoverageCards` index | 5 |
| `/locations/[slug]` | 10 | location | 5 |
| `/glossary` | 1 | index + `NumberedPagination` | 3 |
| `/glossary/[slug]` | 38 | glossary entry | 3 |
| `/contact` | 1 | `SlimHero` + `LeadCTAPanel` | 6 |

Counts derived: categories `grep -h "^category:" content/blog/*.md | sort -u | wc -l` = 7;
posts `ls content/blog/*.md | wc -l` = 62; `/for` slugs
`grep -c "slug:" src/data/contractor-types.ts` = 12; cities
`grep -cE '^\s{2}"[a-z0-9-]+":' src/app/locations/[slug]/data.ts` = 10; glossary
`grep -c "^    slug:" src/app/glossary/[slug]/data.ts` = 38; calculators
`ls src/lib/calculators/tools/*.ts | wc -l` = 10; resource topics
`ls content/resources/ | wc -l` = 3.

### C.2 No template, anatomy recorded in this plan (14)

Every route below gets its anatomy recorded BEFORE its build package starts, derived
from the named closest template plus the playbook §0 checklist. **The fidelity reviewer
reviews against that recorded anatomy, not against a template that does not exist.** A
route whose anatomy block is still empty when its package launches is a blocked package,
not a "use your judgement" package. That is the failure mode this section exists for.

| Route | Closest template | Anatomy recorded by | Phase |
|---|---|---|---|
| `/about` | pillar minus the lead panel | P6-1 | 6 |
| `/book` | capture page, `BookingPicker` is the body | P6-2 | 6 |
| `/complete` | post-submit confirmation | P6-2 | 6 |
| `/thank-you` | post-submit confirmation | P6-2 | 6 |
| `/embed` | tool index, no chrome CTA | P6-3 | 6 |
| `/embed/[slug]` | bare iframe document, chrome DELIBERATELY absent | P6-3 | 6 |
| `/research` | hub index over 3 children | P6-4 | 6 |
| `/research/uk-contractor-index` | data-journalism article | P6-4 | 6 |
| `/research/uk-contractor-insolvency-index` | data-journalism article | P6-4 | 6 |
| `/research/uk-contractor-survival-index` | data-journalism article | P6-4 | 6 |
| `/resources/[topic]` (x3) | gated long-form guide | P6-5 | 6 |
| `/privacy-policy` | legal prose | P6-6 | 6 |
| `/terms` | legal prose | P6-6 | 6 |
| `/cookie-policy` | legal prose | P6-6 | 6 |

All 14 land in phase 6. **Phase 6 is therefore the largest phase on this site, not the
smallest.** Budget it as such. The playbook calls phase 5 "the big one"; on this site
phase 5 is 28 routes across 6 templates and phase 6 is 14 routes with no template at all.

`/embed/[slug]` carries a standing warning: it renders inside a third party's iframe.
Adding kit chrome to it would ship this site's header into someone else's page. Its
recorded anatomy must state "no PageShell" as a positive requirement.

---

## D. Live URLs that must survive the port unchanged

**A URL is never broken for aesthetics.** Every path shape below survives byte-identical.
Any proposal to change one is an owner decision and a redirect workstream, not a port
package. Note `P0E_CRAWL_INTEGRITY.md`: this site has **no redirect map at all**, so
there is no safety net under a renamed route.

| Path shape | Count | Note |
|---|---|---|
| `/` | 1 | |
| `/about`, `/services`, `/ir35-status`, `/contact` | 4 | |
| `/blog` | 1 | |
| `/blog/[category]` | 7 | category slugs are derived from the `category:` frontmatter value; do not re-slug |
| `/blog/[category]/[slug]` | 62 | **3-segment article depth, hence `--article-depth=3` on every instrument run** |
| `/calculators`, `/calculators/[slug]` | 1 + 10 | |
| `/for`, `/for/[slug]` | 1 + 12 | |
| `/glossary`, `/glossary/[slug]` | 1 + 38 | |
| `/locations`, `/locations/[slug]` | 1 + 10 | remote/national site, no physical office; the copy must keep saying so |
| `/resources/[topic]` | 3 | `ir35`, `pay-planning`, `structure` |
| `/research`, + 3 index pages | 4 | each backed by its own `data/route.ts` |
| `/book`, `/complete`, `/thank-you` | 3 | |
| `/embed`, `/embed/[slug]` | 2 | |
| `/privacy-policy`, `/terms`, `/cookie-policy` | 3 | |
| `/feed.xml`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt` | 4 | machine-facing, verified clean in `P0C3_PUBLIC_ASSETS.md` |

Enforcement: `sweep_baseline.json` holds 157 URLs and 2755 internal links. The sweep
blocks on any per-URL unique-internal-link decrease. That is the mechanical guard; this
table is the human one, because the sweep cannot tell you that a 200 at a NEW path is a
broken old path.

---

## E. Carve-outs: renderer features to port in, never drop

These are rendered by the blog renderer off frontmatter. **They are not links, so no
crawl gate and no link floor catches their removal.** Dropping one is a silent fidelity
failure. Each is a named carve-out with an acceptance line.

Derived from `P0A_INVENTORY.md` §7 and
`grep -oE "post\.[a-zA-Z]+" src/components/blog/BlogPostRenderer.tsx | sort | uniq -c`.

| # | Feature | Source | Acceptance after the port |
|---|---|---|---|
| E1 | FAQ block | `post.faqs`, 62/62 non-empty | still a server-rendered `<dl>` with answers present and answer HTML unescaped. See B.1 |
| E2 | FAQ JSON-LD fallback | `post.schema?.trim() \|\| buildFaqJsonLd(...)`, renderer lines 57-61 | **`schema:` is present on 61/62 posts and EMPTY on all of them**, so every post's structured data comes from the fallback. If the `?.trim() \|\|` is ever simplified away, all 62 posts silently lose FAQ schema. Acceptance: JSON-LD with `@type: FAQPage` present on a sampled post |
| E3 | Key takeaways callout | `post.keyTakeaways`, 62/62 real list items | a visually equivalent callout, list semantics kept |
| E4 | Image credit line | `post.imageCredit.*`, 62/62, 10 references in the renderer | photographer/source attribution still under the hero |
| E5 | Sources-verified date | `post.sourcesVerifiedAt`, 62/62, via `formatUkDate` | still rendered |
| E6 | Published / updated dates | `post.date`, `post.updatedDate`, 62/62 | both still rendered |
| E7 | Category as topic | `post.category` feeds breadcrumb, heading, AND `InlineMiniLeadForm topic` | the form must still receive the category, or per-topic lead attribution flattens |
| E8 | `h1` / `summary` | 62/62 | heading and lede, distinct from `title` / `metaDescription` |
| E9 | Inline mini lead forms | `<InlineMiniLeadForm>` x3, renderer lines 230/241/257 | 3 slots per post, same 3 positions |
| E10 | Tool island | `<ToolIsland>` | in-body calculator embed survives |
| E11 | Next-step offer | `<NextStepOffer>` renderer line 308 | end-of-post offer survives |
| E12 | Premium upgrade slots | `<PremiumUpgrade>` x4 | all 4 slots survive |
| E13 | Table of contents | `<TableOfContents>` x2 mounts | both mounts survive; pass `stickyDesktop` deliberately |
| E14 | Reading progress | `<ReadingProgress>` | survives |
| E15 | Body HTML | `post.contentHtml` | rendered as HTML, never escaped |
| E16 | `primaryKeyword` | 13/62 posts | **UNVERIFIED whether anything consumes it.** `blog.ts` maps it through; the renderer does not appear to read it. P2-7 resolves this by reading `src/lib/blog.ts` and the schema builder in full. Do not delete the field on a guess |
| E17 | Glossary raw-HTML bodies | `src/app/glossary/[slug]/data.ts`, `body` is raw HTML by design | same escaping hazard as E1; any kit component put around it must not escape |
| E18 | ResourceGate consent string | pinned by `src/lib/resources/resources.test.ts` to equal `siteConfig.resourceConsentText` exactly | restyling the gate must not retype the string. The unit test is the guard, run it |

Carve-out total: **18**.

---

## F. Per-site data to author fresh

Keyed on THIS site's own category slugs and route data. **Never copied from a sibling
site.** A sibling's CTA copy map keyed on a sibling's categories produces text that is
wrong in a way no gate detects, because the shape is valid.

| # | Artefact | Count | Keyed on | Phase |
|---|---|---|---|---|
| F-1 | Blog CTA-copy map: heading, body, button label per category, feeding `BlogSidebarCta` | **7 entries** | the 7 `category:` values: IR35 Status (17 posts), Umbrella vs Limited Company (13), MTD and Compliance (9), Contractor Accounting Basics (7), Limited Company Tax (6), Pension and Dividends (5), Expenses and Deductions (5) | 2 |
| F-2 | Category hub copy: h1, intro, essentials bullets per hub | **7 hubs** | same 7 slugs; `BlogCategoryHub.heading` where the h1 should differ from the breadcrumb label | 3 |
| F-3 | Page summaries (lede per mapped route) | **15 routes** from C.1, plus 14 from C.2 = **29** | route, not template | per that route's phase |
| F-4 | Nav groups | **5 primary items, 9 footer items**, already flat in `niche.config.json` | `navigation` and `footer_links` | 1 |
| F-5 | Calculator index groupings and per-tool one-liners | **10 tools** | `src/lib/calculators/tools/*.ts` | 4 |
| F-6 | Location page copy blocks | **10 cities** | `locations/[slug]/data.ts`; must keep the remote/national framing | 5 |
| F-7 | `/for` persona copy blocks | **12 personas** | `src/data/contractor-types.ts` | 5 |
| F-8 | Glossary category ordering and index copy | **6 categories, 38 entries** | the canonical order in the `data.ts` header comment | 3 |

Authoring counts derived by the commands in C.1. Nav counts from
`P0A_INVENTORY.md` §6. All F items are content, therefore Opus-tier agents
(standard terms §3, content is Opus-only).

---

## G. Gates, per phase

**Every gate below names the committed command that satisfies it, in the same line.**
This is not decoration. On a previous port a BLOCKING gate named a check nobody could
run, the script behind it no longer existed, and the gate decayed into a deferral. Every
command below was executed or resolved on 2026-09-12 before this plan was written; the
ones executed are marked.

Run before every port session, once:

```
python scripts/port_preflight.py --site contractors-ir35
```

The same six gates run at the close of EVERY phase, 1 through 6. No phase is tagged
until all six are green.

| # | Gate | Command | Status of the command |
|---|---|---|---|
| G1 | Full eslint, zero errors | `npm run lint --workspace=contractors-ir35/web` | exists, `contractors-ir35/web/package.json:9` = `"lint": "eslint"` |
| G2 | `next build` exit 0, **page count recorded in the receipt** | `npm run build --workspace=contractors-ir35/web` | exists, `package.json:7`. Baseline build exit 0 at SHA `18b4f25f` (`P0B_DEPLOY_BASELINE.md`) |
| G3 | Dependency closure | `python scripts/check_dependency_closure.py` | file present at `scripts/check_dependency_closure.py` |
| G4 | Predeploy gate | `python scripts/predeploy_gate.py --site contractors-ir35` | **RUN 2026-09-12, RESULT: PASS**, 1 non-blocking warning (service pricing, `cheapest-umbrella-company-uk`). Note the flag is space-separated `--site <key>`, not `--site=<key>` (`scripts/predeploy_gate.py:62-67`) |
| G5 | Route sweep vs baseline | `node docs/_engines/instruments/sweep.mjs --site=contractors-ir35 --base=http://localhost:3611 --article-depth=3 --sample=9999 --out=tmp/sweep_cfp_phase<N>.json` | both flags exist: `--article-depth` and `SAMPLE = Number(flag("sample","30"))` at `sweep.mjs:58`. Baseline committed as `sweep_baseline.json` |
| G6 | Browser check, 4 widths | `node docs/_engines/instruments/browser_check.mjs --site=contractors-ir35 --base=http://localhost:3611 --article-depth=3 --sample=9999 --out=tmp/bc_cfp_phase<N>.json` | `--sample` exists at `browser_check.mjs:118`; `--widths` defaults to `390,768,1024,1440` |

Additional, not every phase:

| # | Gate | Command | When |
|---|---|---|---|
| G7 | CTA triple snapshot (trap 22: a button keeping its count while its goal or placement flips) | `node docs/_engines/instruments/cta_snapshot.mjs --site=contractors-ir35 --base=http://localhost:3611 --out=tmp/cta_cfp_phase<N>.json` | phases 1, 4, 6 and any phase touching a capture surface |
| G8 | Grounds mode (section-ground breaches) | `node docs/_engines/instruments/browser_check.mjs ... --grounds` | phases 5 and 6, the section-heavy ones |
| G9 | Grounds fixture self-test | `node docs/_engines/instruments/grounds_fixture_test.mjs` | only after an edit to `bandEls`, `groundOf`, `sameGround` or `SAME_GROUND`. Not expected this port |
| G10 | Unit tests incl. the pinned consent string and the tax library | `npm test --workspace=contractors-ir35/web` | phases 4 and 6. UNVERIFIED that a `test` script exists in that package; the P4 lead confirms before relying on it, and if it is absent the gate becomes the explicit vitest invocation, recorded here at that time |

**`--sample=9999` matters on this site**: the sweep defaults to 30 sampled articles and
the browser check to 2. With 62 posts, the default would leave 32 posts unswept and 60
unrendered, which is exactly how a per-template defect ships. `--article-depth=3` matters
because this site's articles are `/blog/<cat>/<slug>`; the Medical site is flat and uses
2, and inheriting that value here makes the instrument crawl nothing.

**Server discipline**: instruments run against `next start`, never `next dev` (dev
produces false CSP errors that read as defects). Port 3611 currently serves the PRE-PORT
build; asserted 2026-09-12 by
`curl -s http://localhost:3611/ | grep -oE "<title>[^<]*</title>"` returning
`<title>Specialist Contractor Accountants | IR35 Advice UK</title>`. **That server is the
BASELINE, not a phase build.** Phase builds serve on their own port, or the baseline is
rebuilt afterwards. Always pass `--out`; two concurrent runs without it clobber each
other, which happened twice on Property.

**Gate-decay rule for this port**: if any command in this table stops working, the fixing
commit updates this table in the same commit. A gate whose command no longer runs is a
FAILED gate, never a deferred one.

---

## H. Work packages, per phase

Every package has an ID, an owner tier, a file lease, and a receipt. **No two packages in
the same wave may list the same file.** The lease is the deconfliction mechanism; a file
appearing in two leases is a planning bug to fix before launch, not a merge to resolve
after.

Tick at close with a receipt per package (playbook T39). The list below is the launch
list. **A package that is not on this list did not get dropped by accident, it was never
planned.** A whole package was dropped on a previous port because the list was never
written down, and it surfaced only when a later agent noticed some routes were
byte-unchanged. If a route is byte-unchanged at the end of a phase, name the package that
owned it or open a new one.

### Phase 1: chrome (8 packages)

| # | Package | Tier | File lease |
|---|---|---|---|
| P1-1 | Tokens in `globals.css`: brand ramp off `#0e7490`, the 3 unlayered blocks from `P0D_CSS_A11Y.md` left intact or migrated with a note | Sonnet | `src/app/globals.css` |
| P1-2 | Adopt kit `SiteHeader` with EXPLICIT `ctaContactGoal` + `ctaMobilePlacement`; record the new `data-cta` ids (B.3) | Sonnet | `src/components/layout/SiteHeader.tsx` |
| P1-3 | Adopt kit `SiteFooter`; pass nothing for `showBuilderCredit`; keep the `ConsentToggle` mount | Sonnet | `src/components/layout/SiteFooter.tsx` |
| P1-4 | Adopt kit `PageShell`; keep all 4 global mounts (`StickyCTA`, `SpecialistWidget`, and the 2 root-layout surfaces stay where they are) | Sonnet | `src/components/layout/PageShell.tsx` |
| P1-5 | Sticky CTA: kit component, preserve `data-cta="sticky_cta"`, `data-cta-placement="sticky"`, conditional goal verbatim | Sonnet | `src/components/ui/StickyCTA.tsx` |
| P1-6 | Breadcrumb swap at all 15 import sites to `design/primitives/Breadcrumb` | Haiku (mechanical) | `src/components/ui/Breadcrumb.tsx` + the 15 importers |
| P1-7 | Fix the CTA breakpoint dead-zone 640-767px named in `P0D_CSS_A11Y.md` | Sonnet | `src/app/globals.css` is LEASED to P1-1; this package runs in wave 2, after P1-1 closes |
| P1-8 | Adversarial fidelity review of phase 1 against `DESIGN_DELTA.md` + `P0D` contrast findings | Opus | read-only |

Waves: {P1-1, P1-2, P1-3, P1-5, P1-6} concurrent; then {P1-4, P1-7}; then P1-8.
Agents: 5, then 2, then 1.

### Phase 2: blog subsystem (8 packages)

| # | Package | Tier | File lease |
|---|---|---|---|
| P2-1 | Post renderer restyle. **The FAQ block stays a server-rendered `<dl>` (B.1). The `?.trim() \|\|` schema fallback is preserved verbatim (E2).** Carve-outs E1-E15 all acceptance-checked | Opus | `src/components/blog/BlogPostRenderer.tsx` |
| P2-2 | Blog index: adopt kit list + `NumberedPagination`, prove the 12-of-62 to 62-of-62 server-HTML fix with the before/after curl (B.4) | Sonnet | `src/app/blog/page.tsx`, `src/components/blog/BlogListWithSearch.tsx` |
| P2-3 | Category projection: `BlogCategoryHub` across 7 categories, `heading` prop where the h1 differs from the breadcrumb | Sonnet | `src/app/blog/[category]/page.tsx` |
| P2-4 | **F-1: author the 7-entry CTA-copy map** and wire `BlogSidebarCta` with `ctaPlacement` + `buttonLabel` | Opus (content) | new `src/data/blog-cta-copy.ts` |
| P2-5 | `TableOfContents` + `ReadingProgress` adoption, `stickyDesktop` chosen deliberately (two viewport clamps in one column is the known defect) | Sonnet | `src/components/blog/` sidebar files, NOT the renderer (leased to P2-1) |
| P2-6 | Delete the dead `blog/ExitIntentModal.tsx` (0 importers, 0 mounts per P0A §2). Retirement, not a restyle. **Do NOT revive or mount it**: this site has no live exit-intent surface and adding one needs owner sign-off | Haiku | `src/components/blog/ExitIntentModal.tsx` |
| P2-7 | Resolve carve-out E16 (`primaryKeyword`, 13/62): read `src/lib/blog.ts` and the schema builder in full, report consumed or not. Report only, no edit | Haiku | read-only |
| P2-8 | Adversarial fidelity review of phase 2, **including a server-HTML diff of one post's FAQ answers before and after** | Opus | read-only |

P2-7 is report-only and does not restyle a surface, but it is a package and it is on the
list. Waves:
{P2-1, P2-2, P2-3, P2-5, P2-6, P2-7} concurrent; then P2-4 (needs the hub shape settled);
then P2-8. Agents: 6, then 1, then 1.

### Phase 3: article templates, hubs, indexes (6 packages)

| # | Package | Tier | File lease |
|---|---|---|---|
| P3-1 | Glossary index: `SlimHero` + `CoverageCards` or `NumberedPagination` over 38 entries, 6 canonical categories | Sonnet | `src/app/glossary/page.tsx` |
| P3-2 | Glossary entry template, 38 entries. **Raw-HTML bodies must not be escaped (E17)** | Sonnet | `src/app/glossary/[slug]/page.tsx` |
| P3-3 | **F-8: author glossary index copy + confirm the 6-category canonical order** | Opus (content) | `src/app/glossary/[slug]/data.ts` header region only, no entry bodies touched |
| P3-4 | **F-2: author the 7 category-hub copy blocks** (h1, intro, essentials bullets) | Opus (content) | new `src/data/blog-hub-copy.ts` |
| P3-5 | `HubArticleList` + `RelatedArticles` adoption across hubs; run `design/guards/hub-article-crawl-path.test.ts` | Sonnet | hub components only |
| P3-6 | Adversarial fidelity review of phase 3 | Opus | read-only |

Waves: {P3-1, P3-2, P3-5} then {P3-3, P3-4} then P3-6. Agents: 3, then 2, then 1.

### Phase 4: calculators (7 packages)

| # | Package | Tier | File lease |
|---|---|---|---|
| P4-1 | Calculator index restyle, 10 tools | Sonnet | `src/app/calculators/page.tsx` |
| P4-2 | Calculator detail template + `CalculatorClient` shell restyle | Sonnet | `src/app/calculators/[slug]/page.tsx`, `src/components/calculators/CalculatorClient.tsx` |
| P4-3 | Premium calculator + `PremiumBarChart` + `PremiumUpgrade` restyle. **9 charts hide their data behind `role="img"` (`P0D_CSS_A11Y.md`); the restyle does not make that worse and names it in the receipt** | Sonnet | `src/components/calculators/premium/PremiumCalculator.tsx`, `PremiumBarChart.tsx`, `PremiumUpgrade.tsx` |
| P4-4 | Capture-gate surfaces: `ResultGateModal`, `CalcResultCta`, `MobileToolSlot`. **Restyle only. The set of capture surfaces does not change; adding one needs owner sign-off** | Sonnet | those 3 files |
| P4-5 | `CalculatorPageResources` + `ResourceGate` restyle. **The consent string is pinned by `src/lib/resources/resources.test.ts` (E18); run that test in the receipt** | Sonnet | `src/components/resources/*.tsx` |
| P4-6 | **F-5: author the 10 per-tool one-liners and the index groupings** | Opus (content) | `src/lib/calculators/registry.ts` labels only. **`src/lib/calculators/tax2026.ts` is NOT leased to anyone this phase**: P0C1 proved it clean and matching house positions exactly, and every defect was in the prose around it. Do not touch the compute library during a design port |
| P4-7 | Adversarial fidelity review + G10 unit tests + G7 CTA snapshot | Opus | read-only |

Waves: {P4-1, P4-2, P4-3, P4-4, P4-5} then P4-6 then P4-7. Agents: 5, then 1, then 1.

### Phase 5: homepage, pillars, locations (9 packages)

28 routes. The largest mapped-template phase.

| # | Package | Tier | File lease |
|---|---|---|---|
| P5-1 | Homepage rebuild, 15-16 section composite. **No testimonial section until the P0C2 ledger row on the homepage testimonial heading is closed by the owner** | Opus | `src/app/page.tsx` |
| P5-2 | `/services` restyle + shared `ServiceTiers` / `StatsBar` adoption | Sonnet | `src/app/services/page.tsx` |
| P5-3 | `/ir35-status` pillar restyle | Sonnet | `src/app/ir35-status/page.tsx` |
| P5-4 | `/for` index, `CoverageCards` over 12 personas | Sonnet | `src/app/for/page.tsx` |
| P5-5 | `/for/[slug]` pillar template, 12 personas, `TopicSection.bullets` where the published prose carries lists | Sonnet | `src/app/for/[slug]/page.tsx` |
| P5-6 | `/locations` index + `/locations/[slug]`, 10 cities. **The remote/national framing stays; this site has no physical office and the copy says so** | Sonnet | `src/app/locations/page.tsx`, `src/app/locations/[slug]/page.tsx` |
| P5-7 | **F-7: author the 12 persona copy blocks** | Opus (content) | `src/data/contractor-types.ts` |
| P5-8 | **F-6: author the 10 location copy blocks** | Opus (content) | `src/app/locations/[slug]/data.ts` |
| P5-9 | Adversarial fidelity review + G8 grounds mode across all 28 routes | Opus | read-only |

Waves: {P5-2, P5-3, P5-4, P5-5, P5-6} then {P5-1, P5-7, P5-8} then P5-9.
Agents: 5, then 3, then 1. P5-5 and P5-7 lease different files by design; P5-6 and P5-8
likewise.

### Phase 6: the rest (10 packages)

14 routes with no template, plus the interruptive restyle. **This is the biggest phase on
this site.** Each of P6-1 to P6-6 records its routes' anatomy FIRST, from the closest
template named in C.2 plus the playbook §0 checklist, and hands that anatomy to the
reviewer.

| # | Package | Tier | File lease |
|---|---|---|---|
| P6-1 | `/about` anatomy + restyle. **The client-scale claim flagged in P0C2 must already be fixed by F3; verify, do not re-author** | Opus | `src/app/about/page.tsx` |
| P6-2 | `/book`, `/complete`, `/thank-you` anatomy + restyle, incl. `BookingPicker` and `DetailsForm` | Sonnet | those 3 page files + `src/components/forms/BookingPicker.tsx`, `DetailsForm.tsx` |
| P6-3 | `/embed`, `/embed/[slug]` anatomy + restyle. **`/embed/[slug]` gets NO PageShell**: it renders inside a third party's iframe | Sonnet | `src/app/embed/**`, `src/components/embed/*` |
| P6-4 | `/research` hub + 3 index pages + 3 chart components. Charts are LOCAL, restyle only, do not re-plot | Opus | `src/app/research/**`, `src/components/research/*` |
| P6-5 | `/resources/[topic]` x3 anatomy + restyle. **Token hardening already documented in that page's header comment; keep the cfp token set, do not reintroduce `var(--gold)`/`var(--navy)`.** F1 already fixed the figures here, verify only | Sonnet | `src/app/resources/[topic]/page.tsx` |
| P6-6 | `/privacy-policy`, `/terms`, `/cookie-policy` restyle. **F4 already removed the phantom GA opt-out section and the two phantom processors; verify they are gone, do not re-add boilerplate** | Sonnet | those 3 page files |
| P6-7 | `/contact` restyle, `SlimHero` + `LeadCTAPanel` + `LeadForm` (12 importers, do not change its signature) | Sonnet | `src/app/contact/page.tsx` |
| P6-8 | Interruptive surface restyle: `StickyCTA` (done P1-5), `SpecialistWidget`, `ReturningBar`, `DeepScrollModal`, `InlineMiniLeadForm`, `NextStepOffer`, `MiniCapture` theming. **Restyle only. Count in equals count out. No new surface, no cadence change, no threshold change** | Sonnet | `src/components/intent/*`, `src/components/support/SpecialistWidget.tsx` |
| P6-9 | **F-3 tail: the 14 anatomy-fallback page summaries** | Opus (content) | the 14 page files, sequenced AFTER P6-1..P6-7 close their leases |
| P6-10 | Final adversarial review: full sweep + browser check + grounds + CTA snapshot across all 29 public routes, byte-unchanged audit against this package list | Opus | read-only |

Waves: {P6-2, P6-3, P6-5, P6-6, P6-7, P6-8} then {P6-1, P6-4} then P6-9 then P6-10.
Agents: 6, then 2, then 1, then 1.

**The byte-unchanged audit in P6-10 is the specific defence against the failure this plan
exists for.** It diffs every one of the 29 public route files against SHA `18b4f25f` and
lists any that are unchanged. Each unchanged file must be matched to a package that
deliberately left it alone (`/embed/[slug]` chrome exclusion, the admin console) or it is
a dropped package.

---

## I. Delegation shape, summary

| Phase | Packages | Peak concurrent agents | Waves |
|---|---|---|---|
| 1 | 8 | 5 | 3 |
| 2 | 8 | 6 | 3 |
| 3 | 6 | 3 | 3 |
| 4 | 7 | 5 | 3 |
| 5 | 9 | 5 | 3 |
| 6 | 10 | 6 | 4 |
| **Total** | **48** | | **19** |

Standing rules that apply to every package:

- **One file, one lease, one wave.** Two agents never share a file. Where a second
  package needs a leased file, it goes in a later wave (P1-7 after P1-1; P6-9 after
  P6-1..P6-7).
- **Manager-only, never delegated**: git operations, serialised builds, the six gates,
  tags, owner comms, and any `packages/web-shared/` edit. If a package needs a kit prop
  added, it reports the need and the manager makes the kit edit.
- **No subagent runs a git command that changes state** (Medical batch-3 lesson).
- **Model tiering**: Haiku for mechanical sweeps and inventories, Sonnet for mechanical
  build, Opus for every content package and every review. Content is Opus-only.
- **Every agent prompt carries the playbook §10.1 preamble** and the verbatim pushback
  clause: verify against source, and if the brief is wrong, say so and trust the source.
- **Run ONE site at a time.** The five-site retrospective found concurrency was pure tax.
- **Budget a third of every phase for live defects that are not design work.** That was
  the measured share on the last five ports, and phase 0 here already produced 4 fix
  packages before a line of design code was written.

---

## J. Open items this plan does not decide

1. The P0C2 owner-decision rows (21) gate P5-1's testimonial section and P6-1's `/about`
   copy. Neither package starts until those rows are closed.
2. The downloadable workbook defects are report-only by owner ruling 2026-09-12 and are
   carried to the final report, not fixed in any phase.
3. `--brand-primary-text` and `--brand-primary-ground`: UNVERIFIED whether `#0e7490`
   needs either. Decided by the phase-1 `browser_check.mjs` contrast pass, not in advance.
4. `SiteHeader.wordmarkAccentColor`: UNVERIFIED, same instrument, same phase.
5. G10's `npm test` script existence is UNVERIFIED for this workspace. P4 confirms.
6. **Reconciliation with work landing in parallel, 2026-09-12.** `git status --short
   docs/contractors-ir35/_port/` at the moment this plan was written showed three
   untracked files that `PHASE0_PACKAGES.md` does not list: `F5_INDEXING_CRAWL_FIX.md`,
   `F6_CHART_A11Y_FIX.md`, `P1_SITE_DATA.md`. They overlap this plan and the lead
   reconciles before launching the affected packages:
   - **F5 indexing and crawl** overlaps P2-2. If F5 already serves 62 of 62 articles in
     server HTML, P2-2 becomes a restyle plus a verification of F5's fix, not the fix
     itself. The before/after curl in B.4 still runs; only its baseline moves.
   - **F6 chart accessibility** overlaps the `role="img"` note in P4-3. If F6 landed, P4-3
     verifies rather than flags.
   - **P1_SITE_DATA** overlaps F-1, F-2 and therefore P2-4 and P3-4. If those maps are
     already authored, P2-4 and P3-4 collapse to wiring packages. **They do not get
     deleted from the list**, because a deleted package is exactly the failure this plan
     guards against; they get re-scoped with a receipt saying so.
7. The instruments README's flag table does not document `--sample`, although both
   instruments read it (`sweep.mjs:58`, `browser_check.mjs:118`). Worth a one-line README
   fix; out of scope for this plan, and not a blocker because the flag works.
