# Report 04 — files with heavy churn on both sides

Written 2026-08-22. Scope: the ~22 files named in brief 04.

Method (all diffs below were run, not inferred):

```
ours:   git -C Accounting                                   diff 1d68a570 HEAD -- Property/web/<path>
theirs: git -C Accounting/tmp/design_migration/Property_zip  diff 8041183 eb745e1 -- web/<path>
```

Line citations are **current-file** line numbers unless the text says "diff hunk".
Everything labelled VERIFIED was read in the file or produced by a script run
against the file. Everything labelled INFERRED is reasoning I did not execute.

Paths: `M/` = `Accounting/Property/web/`, `D/` = `Property_zip/web/`.
`niche.config.json` lives one level up on both sides: `Accounting/Property/niche.config.json`
and `Property_zip/niche.config.json` (there is **no** `web/niche.config.json` on
either side — the brief's path is wrong; corrected here).

---

## 0. Headline

| # | Thing | Verdict |
|---|---|---|
| 1 | **Middleware shadowing bug is live in our tree.** `M/src/middleware.ts:165` + `:423`. `/blog/property-accountant-services` — a real hub route at `M/src/app/blog/property-accountant-services/page.tsx` — is 301'd away and can never render. | Fix now, independent of the port |
| 2 | **PageShell `/embed` bug is live in our tree**, and our own commit `0c57b7bd` made it worse by setting `robots: {index:true}` on a page that renders with no header, no logo and no footer. `M/src/components/layout/PageShell.tsx:17`. | Fix now, independent of the port |
| 3 | Nav: both sides built a dropdown header independently. **Ours carries the CTA-variant machinery (load-bearing, analytics-instrumented); theirs carries registry-derived Calculators groups (architecturally better).** Merge, do not pick. | MANUAL MERGE |
| 4 | `niche.config.json` / `site.ts`: **ours wins on every key that differs except one** (`site.ts` needs their `NavItem` type). Their `partner` block is a stale DJH-era snapshot and must not come back. | KEEP OURS + 1 type |
| 5 | Their `SiteFooter` assumes `footer_links` is **legal-only**. Ours has 18 entries. Taking their footer without re-scoping `footer_links` produces an 18-link legal row. | Named below |
| 6 | Their `layout.tsx` still passes `clarityProjectId` to `ConsentedScripts`. We killed Clarity estate-wide (`bf8f83dc`). **Do not reintroduce.** | Hard flag |

---

## 1. `src/middleware.ts` — SPECIAL ATTENTION

**Ours** `+101/-28`, 598 lines. **Theirs** `+6/-2`, 529 lines.

### 1.1 What we changed and why

`git log --oneline 1d68a570..HEAD -- Property/web/src/middleware.ts` → 11 commits.
Four distinct changes (VERIFIED, read the diff):

| Hunk | Change | Commit |
|---|---|---|
| A | `+BLOG_TO_LOCATION` map (5 city slugs) at lines 6-14, spread into `DUPLICATE_REDIRECTS` at line 535 (`...BLOG_TO_LOCATION`). **Reverses** the old `LOCATION_TO_BLOG` direction. | `bbfe0437` city consolidation |
| B | ~60 new `SLUG_TO_CATEGORY_MAP` entries in labelled cluster blocks at lines 17-70 (agents1, Wave 12, rural, CGT, Wave 11, rental). | `6960986e`, `000429c1`, `631d71ef`, `0c57b7bd`, `701a2d53`, `7df4426c` |
| C | 12 `DUPLICATE_REDIRECTS` targets repointed from `/blog/property-accountant-services/<city>-property-accountant` to `/locations/<city>`. | `bbfe0437` |
| D | Deleted `LOCATION_TO_BLOG` + its handler; added the **canonical-host 308** (lines 543-553) and broadened `matcher` from `["/blog/:path*","/locations/:path*"]` to site-wide `["/((?!_next/static|_next/image|favicon.ico).*)"]` (line 597). Added the **recategorisation 301** at lines 584-588. | `c31b02d7`, `0107a8b8`, `2cf1bc2f` |

### 1.2 What they changed and why

Two deletions only, both documented in `Property_zip/CONTEXT_SUMMARY_SESSION11.md:147-149`
and `:262`: remove the key `"property-accountant-services"` from **both**
`SLUG_TO_CATEGORY_MAP` and `DUPLICATE_REDIRECTS`, replacing each with a comment.
Their reasoning, verbatim from the diff comment: *"it is the CATEGORY hub slug,
not an article slug (no such content file exists). Listing it here shadowed
/blog/property-accountant-services so the hub page could never render."*

Session 2 (`CONTEXT_SUMMARY_SESSION2.md:180`) separately flagged
`LOCATION_TO_BLOG` 301-ing `/locations/london` away. **We already fixed that**
in the opposite direction (hunk A/D), independently. No action.

### 1.3 Same lines? — YES, but tiny

Their two deletions land at our lines 165 and 423. Our hunks A-D never touch
those two lines. **Orthogonal in practice.**

### 1.4 The bug: CONFIRMED live in our tree

VERIFIED by script + file read:

- `M/src/middleware.ts:165` — `"property-accountant-services": "property-accountant-services",` inside `SLUG_TO_CATEGORY_MAP` (lines 16-406).
- `M/src/middleware.ts:423` — `"property-accountant-services": "/blog/property-accountant-services/what-does-a-property-accountant-do",` inside `DUPLICATE_REDIRECTS` (lines 408-536).
- `M/src/app/blog/property-accountant-services/page.tsx` **exists** — it is a real static hub route (VERIFIED: directory listing of `M/src/app/blog/` returns 10 hub directories plus `[category]` and `page.tsx`).

Execution path (VERIFIED by reading `M/src/middleware.ts:555-567`):

```
GET /blog/property-accountant-services
  → matcher now matches everything (line 597), so middleware runs
  → line 556 oldBlogMatch = /^\/blog\/([^\/]+)$/  → slug = "property-accountant-services"
  → line 559 DUPLICATE_REDIRECTS[slug] hits line 423
  → line 561 301 → /blog/property-accountant-services/what-does-a-property-accountant-do
```

The hub page is unreachable. Line 165 never even executes (line 559 short-circuits
first), so it is dead weight, not a second cause — but it must go too, otherwise a
later refactor that reorders the two lookups re-arms the bug.

**Note our matcher broadening made this strictly worse.** Before `0107a8b8` the
matcher was `["/blog/:path*", ...]`, which still covered this path — so the bug
predates us and is not a regression we introduced. But the site-wide matcher means
every future map key now runs against every URL shape. INFERRED: no other route
class is currently affected because the handlers only act on `^/blog/…` patterns.

### 1.5 The CLASS, not the instance

I enumerated it. Script run against `M/src/middleware.ts` (VERIFIED):

**Class definition: any key in either map that collides with a live route.**
Under `/blog/`, the live routes are the 10 category-hub directories.

Cross-referencing the 10 live hub directory names against both maps:

```
capital-gains-tax                     — clean
incorporation-and-company-structures  — clean
landlord-tax-essentials               — clean
making-tax-digital-mtd                — clean
non-resident-landlord-tax             — clean
portfolio-management                  — clean
property-accountant-services          — SHADOWED at :165 and :423   ← the only instance
property-finance                      — clean
property-types-and-specialist-tax     — clean
section-24-and-tax-relief             — clean
```

**Result: exactly one instance of the fatal subclass.** The designer found the only
one there is. Their two-line fix is complete as a fix.

Two adjacent findings from the same sweep, neither fatal:

- **95 keys appear in BOTH maps.** `DUPLICATE_REDIRECTS` is checked first in both
  handlers (`:559` before `:563`, `:580` before `:585`), so the
  `SLUG_TO_CATEGORY_MAP` entry for all 95 is **unreachable dead code**. Harmless
  today. It is the mechanism that hid the bug: nobody noticed line 165 because it
  never ran. Examples: `accountant-accounting-services` (:73 / :425),
  `property-accountant-vs-general-accountant` (:167 / :424), and 93 more.
- **5 `DUPLICATE_REDIRECTS` targets point at a nested slug that is absent from
  `SLUG_TO_CATEGORY_MAP`.** Not a bug (the nested route resolves from the content
  file, not the map), listed for completeness: `:445`, `:446`, `:447`, `:523`, `:526`.
- **Zero redirect chains** — no `DUPLICATE_REDIRECTS` target lands on a slug whose
  `SLUG_TO_CATEGORY_MAP` category differs from the target's own category segment.
  (This one genuinely could have bitten given our line 584-588 recategorisation
  branch. It does not.)

### 1.6 Merge verdict

**KEEP OURS + apply their two deletions verbatim.** Two-line change:

1. Delete `M/src/middleware.ts:165`.
2. Delete `M/src/middleware.ts:423`.

Keep their explanatory comments — the comment is why this stays fixed.

**Class fix, recommended on top** (small, ponytail-sized): a dev-only assertion at
module scope that neither map contains a key equal to any category value, so the
next bulk slug import cannot re-arm it. One `if (process.env.NODE_ENV !== "production")`
block, ~6 lines. Cheaper than a test file and it fails at first import in dev.

**Behaviour hiding in their diff:** none. Two deletions, both intended.

---

## 2. `niche.config.json` — SPECIAL ATTENTION, key by key

Ours `+210/-16`. Theirs `+56/-12`. Both sides edited the same file top-level keys.
Six keys differ (VERIFIED by JSON compare): `company`, `content_strategy`, `cta`,
`footer_links`, `navigation`, `partner`.

| Key | Ours | Theirs | WINNER | Why |
|---|---|---|---|---|
| `company.enquiry_retention_months` | `24` | `3` | **OURS** | `36b2628f` "Property retention to 24mo" is a legal/DSA decision. Theirs is the stale snapshot value. |
| `partner.name` | `"regulated firms in our specialist partner network"` | `"DJH Business Advisers Limited"` | **OURS** | Theirs is the pre-`4107b377` DJH snapshot. Reintroducing it would name a firm we are out of terms with, at the point of collection, in the rendered consent text. **Hard flag.** |
| `partner.descriptor` | `""` | `"(part of the DJH group of companies)"` | **OURS** | same |
| `partner.privacy_policy_url` | `null` | `"https://www.djh.co.uk/privacy-policy/"` | **OURS** | same |
| `content_strategy.categories` | 9 + `"Property Finance"` | 9 | **OURS** | `/blog/property-finance` is a live hub we built after the snapshot. |
| `cta` | `variant: "leadgen"` + full `variants.{packages,leadgen}` block + legacy `sticky_*` | legacy `sticky_*` only | **OURS** | `1c066426` / `7ab42441` / `7f7eae12`. The variant switch is a one-flag reversible experiment the header, homepage and contact page all read. Theirs has no equivalent. |
| `navigation` | 4 items, Services(5 children) + Resources(10 children) + Calculators + About | 5 items, Services(6 children incl. "All services") + Resources(6 children) + Calculators + About + Contact | **MERGE** — see §2.1 |
| `footer_links` | 18 entries (14 content + Locations + 3 legal) | 3 entries (legal only) | **DEPENDS on the footer decision** — see §9 |

### 2.1 Merged navigation tree (proposal)

Ours is the superset on Resources (10 vs 6) because Waves 11/12, landed1 and
agents1 shipped pillars the designer never saw. Theirs contributes three ideas
worth keeping: a self-referential first child ("All services"), `Landlord tax index`
in Resources, and `Contact` restored as a top-level item.

Two of those three are contested by our own history:

- **`Contact` in top-level nav**: we deliberately removed it in `05264d8a`
  ("nav overflow - drop redundant Contact nav item") and again in `e8de0325`
  ("Property/CIS nav overflow"). Their answer to the same overflow problem was
  the `md:`→`lg:` breakpoint move plus `siteContainerXl`, which buys back the
  room. **Recommendation: restore Contact top-level only if the `lg:` +
  `siteContainerXl` header change is also taken.** They are one decision, not two.
- **"All services" as a child**: needed only if the dropdown parent is not itself
  a link. Ours makes the desktop parent a `<button>` (§8), so the parent is NOT
  navigable and a self-referential child is **required**. Their parent is a
  `<Link>`, so theirs is belt-and-braces. Since the merged header keeps our button
  (§8.4), we need the self-referential child in every group.

Proposed merged `navigation`:

```
Services            /services
  All services              /services                     ← from theirs (required by our button trigger)
  Property accountant       /services/property-accountant
  Landlord accountant       /services/landlord-accountant
  Property tax advice       /services/property-tax-advice
  Non-resident landlords    /services/non-resident-landlord
  Incorporation             /incorporation

Resources           /landlord-tax
  Landlord tax guide        /landlord-tax                 ← self-referential, same reason
  Section 24 explained      /section-24
  Making Tax Digital        /making-tax-digital-landlords
  Leasehold                 /leasehold                    ← ours (Wave 11)
  Landlord compliance       /landlord-compliance          ← ours (Wave 11)
  Landed estates            /landed-estates               ← ours (landed1)
  Cost of selling a property /cost-of-selling-a-property   ← ours (Wave 12)
  For letting agents        /for-letting-agents           ← ours (agents1)
  Property tax rates        /property-tax-rates
  Landlord tax index        /research/landlord-tax-index  ← from theirs (route VERIFIED to exist)
  Blog                      /blog

Calculators         /calculators   (groups injected at runtime — see §8)

About               /about

Contact             /contact       ← from theirs, CONDITIONAL on taking lg: + siteContainerXl
```

Resources is now 11 children. VERIFIED: that is fine in their flat 1-column
`w-64` panel (theirs renders `/services` at 6 without scroll); 11 at `py-2.5`
≈ 440px, which fits a 700px viewport. INFERRED: no scroll needed, but worth an
eye at 1366×768.

One dead key: `getActiveNav()` (`M/src/config/niche-loader.ts:135-138`) filters
on `item.hide_in_packages`, which appears **0 times** in `niche.config.json`
(VERIFIED by grep count). Harmless; leave it or delete it, not a port decision.

---

## 3. `src/config/site.ts`

Ours `+17/-35`. Theirs `+15/-1`.

**Ours** (`36b2628f`, `4107b377`, `d8b8b118`, `0ca10782`, `346f0924`): deleted the
entire `PARTNER_DISCLOSURE_PAUSED` flag machinery and the DJH conditional, replaced
`leadConsentText` with the category-routing wording, and made `partner` derive
straight from `niche.partner` with a null fallback. This is the legal-compliance
core of the site and is not negotiable.

**Theirs**: added `export type NavItem = { label; href; children?; groups? }` at the
top of the file and changed `nav: niche.navigation` → `nav: niche.navigation as NavItem[]`.
Nothing else. (One incidental em-dash removal in a comment, which we also did.)

**Same lines?** No. Theirs is at the top of the file (imports/type block) and at
the single `nav:` line. Ours is all in the partner/consent block below.

**Verdict: KEEP OURS + cherry-pick their `NavItem` type + the `as NavItem[]` cast.**
Literally two hunks, zero conflict. The `groups` member is what makes §8 possible.

**Behaviour hiding in their diff:** none.

---

## 4. `src/middleware.ts` … see §1. `src/app/layout.tsx`

Ours `+1/-4`. Theirs `+17/-1`.

- **Ours** (`bf8f83dc`): dropped `clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_ID}`
  from `<ConsentedScripts>`. Estate-wide Clarity removal; a PECR decision.
- **Theirs**, two hunks:
  1. a `<noscript><style>` block inside `<body>` releasing 9 scroll-reveal
     animation classes when JS is off (diff hunk `@@ -84,6 +85,21 @@`). Pure
     progressive-enhancement. Take it **only if** the animation classes it names
     (`eyebrow-rule`, `tick-draw`, `penalty-ladder-*`, `rate-wedge-fill`,
     `profit-stack-*`, `story-numeral*`) actually ship — they are part of the
     design system, so this arrives with the clean 171.
  2. `<PageShell>` → `<PageShell nav={buildPrimaryNav()}>` + the `buildPrimaryNav`
     import. Required by §8.

**Same lines?** The `<ConsentedScripts>` call is the exact line theirs preserves
with `clarityProjectId` intact. **This is the one true line-level collision in
this file.**

**Verdict: MANUAL LINE-LEVEL MERGE.** Take both of their hunks; keep our
one-argument `<ConsentedScripts gaMeasurementId={...} />`.

**Behaviour hiding: YES, HARD FLAG.** Their file still reads
`process.env.NEXT_PUBLIC_CLARITY_ID`. A careless take-theirs re-arms Microsoft
Clarity on Property. See memory `clarity_removed_pecr_decision`.

---

## 5. `src/app/page.tsx` (homepage)

Ours `+63/-12`. Theirs `+193/-336` — a net **143-line deletion**; the biggest
restructure of the set.

**Ours** (`57568a1b`, `1c066426`, `7ab42441`, `7f7eae12`, `c218d7a6`), four hunks:
- `+import { niche, getActiveCta, isPackagesMode }` and `+import { locationHref }`.
- `const activeCta` / `const packagesMode` at the top of `HomePage()` (diff `@@ -288,6 +290,9 @@`).
- Hero primary CTA: hard-coded `href="/contact"` + label "Book free consultation" →
  `activeCta.hero_primary.{href,label}` with `data-cta-goal` computed and
  `data-cta-variant` added (diff `@@ -323,8 +328,8 @@`).
- Closing CTA + form heading forked on `packagesMode`, ~50 lines
  (diff `@@ -666,13 +671,50 @@` and `@@ -705,7 +747,16 @@`).
- `href={`/locations/${loc.slug}`}` → `href={locationHref(loc.slug)}`
  (diff `@@ -522,7 +527,7 @@`). `M/src/lib/locations.ts` exists and is the
  single source for city URL resolution after the 08-05 reversal.

**Theirs**: replaced the Unsplash hero image with `<HeroBrickBackdrop>` on
`bg-slate-900` (and `h-[500px]` → `min-h-[500px] flex items-center py-*`), added
`StatsCounter` fed by the new `siteStats`, `CalculatorTabs`, `LocationChips`,
`WhyUsList`, `ProblemStatement`, `TestimonialsSection`, regrouped
`essentialGuides` by `guideGroups`, replaced the `services` array's audience
tiers ("Individual Landlords" / "Portfolio Owners" / "Large Portfolios") with
value props ("Property-only focus" / "UK-wide coverage" / "Fixed fees" /
"24hr response"), removed `next/dynamic` and several whole sections, and
normalised every `h2` from `sm:text-4xl lg:text-5xl` down to `sm:text-4xl`.

**Same lines? MOSTLY YES.** Their `-336` deletes whole sections; our `+50`
packagesMode fork sits in the closing-CTA section, which theirs rewrites
(diff `@@ -649,24 +521,14 @@`: the closing section becomes
`bg-slate-900` + `HeroBrickBackdrop`). Our hero CTA hunk is inside their rewritten
hero. This is the worst file in the set for automatic merging.

**Verdict: TAKE THEIRS + reapply our delta, hunk by hunk.** Named:
1. Re-add both imports.
2. Re-add `activeCta` / `packagesMode` at the top of `HomePage()`.
3. Re-wire the hero primary CTA to `activeCta.hero_primary` + `data-cta-variant`.
4. Re-apply the `packagesMode ?` fork onto their new closing CTA block and their
   new lead-form heading — the copy inside their block replaces our `leadgen`
   branch text; the `packages` branch text is unchanged.
5. Re-apply `locationHref(loc.slug)` wherever their `LocationChips` builds city
   hrefs (**note: `LocationChips` is a new component of theirs — check it does
   not hardcode `/locations/${slug}`**).
6. Keep our shortened `metadata.description`.

**Behaviour hiding in theirs:** the hero closer is still the designer's
placeholder ("Property tax sorted, your way, with ease.") — CONTEXT.md §7 says
the owner writes it himself. Remind him. `StatsCounter` figures (100+ landlords,
£2.4M+ savings) are a marketing claim now centralised in `D/src/lib/site-stats.ts`;
designer session 9 §1.1 has an open asterisk question on it.

---

## 6. `src/app/services/page.tsx`

Ours `+92/-9`. Theirs `+232/-119`.

**Ours** (`bbfe0437`, `1c066426`/`7f7eae12`, `0107a8b8`, `c218d7a6`): retitled the
page ("Property Accountant Services UK | …" → "Property Accounting Services", part
of the `0107a8b8` brand-suffix dedupe), rewrote all three meta descriptions, and
**added a whole new "Where to start" hub section**: a `hub[]` array of 6 cards
linking the four `/services/*` sub-pages plus `/incorporation` and `/calculators`,
a matching `ItemList` + `BreadcrumbList` JSON-LD block, and the card grid. Also
renamed the "What we specialise in" h2 to "What the work covers".

**Theirs**: cream hero (`heroCreamSurface` + `HeroBrickBackdrop tone="cream"`,
h1 white → `text-slate-900`), `StatsCounter`, `ScrollGlowGroup`,
`TestimonialsSection`, `CTASection` → `LeadCTAPanel`, dropped `ServiceTiers`,
added a 4-item "why us" array, h2 sizes normalised to `sm:text-4xl`.

**Same lines?** Partially. Both sides insert new sections into the body between
the hero and the closing CTA, at different anchors. Their `-119` removes the
`ServiceTiers` block and the old `CTASection`, neither of which we touched. Our
hub section is additive and self-contained.

**Verdict: TAKE THEIRS + reapply our delta.** Named hunks:
1. Our `metadata` block wholesale (title + 3 descriptions) — theirs did not
   change metadata at all, so this is a clean overwrite.
2. Our `hub[]` array + `jsonLd` const + `<script type="application/ld+json">` +
   the "Where to start" `<section>`, restyled into their card idiom.
3. Our "What the work covers" h2 rename.

**Behaviour hiding:** the `/services` sub-page links in our `hub[]` are cluster-
coverage internal links. If the hub section is dropped, four monitored pages lose
their only sitewide entry point outside the nav dropdown. Do not drop it.

---

## 7. `src/app/incorporation/page.tsx`, `calculators/stamp-duty-calculator/page.tsx`, `calculators/[slug]/page.tsx`, `about`, `contact`, `property-tax-rates`, `locations/*`, `embed`, `sitemap.ts`, `lib/blog.ts`

These share one shape: **our delta is content + schema + config; their delta is
the design system.** Handled together, then per-file exceptions.

### 7.1 `incorporation/page.tsx` — ours `+179/-3`, theirs `+215/-96`

Ours (`82b66a32` completeness pass, `5e288f5b` em-dash repairs, `c218d7a6`): added
an `incorporationFaqs` array (5 Q&As on SDLT market value, s.162 relief, the
Ramsay hours test, no advance clearance, LBTT/LTT divergence), two whole new
prose sections ("Stamp duty when you incorporate", "Connected-party and clearance
points"), and two em-dash repairs in existing copy.

Theirs: cream hero, `ProcessTimeline`, `CoverageCards`, `PromptMarquee`,
`TestimonialsSection`, `StatsCounter`, `CTASection`→`LeadCTAPanel`,
`btnSecondary`→`btnOnCream`, h2 normalisation. Notably their "What you get"
section flips `bg-white`→`bg-slate-900 text-white`.

Same lines? **No collision on our two new sections** (pure insertions between
existing sections). Our em-dash repairs are inside `processSteps[]` and the hero
paragraph, both of which theirs also touches for styling — line-level, resolvable.

**Verdict: TAKE THEIRS + reapply our delta.** Hunks: the `incorporationFaqs`
array (and render it through their `FaqSection`, not our bespoke markup), the two
prose `<section>`s, and the two em-dash repairs. Our copy is 2026/27-current
(5% surcharge, MDR abolished 1 Jun 2024, £2.5m BR/APR era) and must survive verbatim.

### 7.2 `calculators/stamp-duty-calculator/page.tsx` — ours `+260/-25`, theirs `+63/-50`

Ours (`f7794767` SDLT cluster batch): retitled to the search-intent formula
("Stamp Duty Calculator UK (2026/27): How Much You Pay"), added `bandRows` derived
from `STANDARD_SDLT_BANDS` (`M/src/lib/sdlt.ts`) so copy and tool cannot disagree,
an 8-entry `faqs` array with a `FAQPage` JSON-LD block, and a rate table.
This is a **subject-match answer-block rewrite** — a ranking asset, not decoration.

Theirs: swapped the trailing `LeadForm` card for `LeadCTAPanel`, h2 `sm:text-3xl`
→ `sm:text-4xl`, one `id` preserved.

Same lines? Only at the trailing CTA card, which we did not touch.

**Verdict: KEEP OURS + apply their styling.** Two hunks from theirs:
`LeadForm` block → `LeadCTAPanel`, and the h2 size bump. Everything else stays.
This is the cleanest file in the set.

### 7.3 `calculators/[slug]/page.tsx` — ours `+57/-0`, theirs `+54/-42`

Ours (`c38bb7f5` Wave 11): two purely additive render blocks —
`tool.workedExamples` (with a `"title" in ex` / `"heading" in ex` shape union) and
`tool.related`. Both guarded on presence, so they no-op for tools without them.

Theirs: `Breadcrumb onDark`, removed the `max-w-5xl` and `max-w-3xl` inner clamps,
`explainer.paragraphs` → `<Prose>`, bespoke FAQ markup → `<FaqSection>`, bare
`LeadForm` card → `<LeadCTAPanel>` moved **above** the FAQ, and
`intro` clamp `max-w-2xl`→`max-w-3xl`.

**Same lines? YES.** Both sides edit the same `bg-white` body section: ours inserts
two blocks inside the `max-w-3xl` div, theirs deletes that div.

**Verdict: TAKE THEIRS + reapply our two blocks** as siblings inside their
un-clamped `siteContainerLg`, between `<Prose>` and the `LeadCTAPanel`.

**BEHAVIOUR HIDING — FLAG:** `D/src/app/calculators/[slug]/page.tsx` calls
`<CalculatorPageResources slug={tool.slug} />`, dropping the `pageTitle` prop.
Our component signature is `M/src/components/resources/CalculatorPageResources.tsx:29-35`
— `pageTitle?: string`, optional, so it typechecks — but the designer rewrote that
component (session 10 §315: *"CalculatorPageResources (rewritten)"*). If we take
their page but keep our component, `pageTitle` silently becomes undefined on every
calculator page. **Verify what our component renders with `pageTitle` absent
before taking their call site.**

Second flag: their comment at their line ~111 says the `FaqSection` is
unconditional because *"every generic tool in the registry currently defines
faqs"*. We have shipped tools since (lease-extension premium calculator,
cost-of-selling-calculator). **Verify every tool in our registry defines `faqs`,
or make their `FaqSection` conditional.** Not verified here.

Third: their ordering rationale (LeadCTAPanel above FAQ, so navy does not abut the
navy footer) is load-bearing for their footer. If we do not take their footer,
re-check.

### 7.4 `about/page.tsx` — ours `+2/-2`, theirs `+144/-83`

Ours (`c218d7a6`): metadata title `About ${siteConfig.name}` → `About Us`, and a
shorter description. That is the entire delta.

Theirs: full design-system rebuild — `HeroBrickBackdrop`, `StatsCounter`,
`NumberedReasons`, `TestimonialsSection`, `CTASection`→`LeadCTAPanel`, the
`bg-emerald-600` stats band → `bg-slate-50`, h2 normalisation, and a new
`whyWeExist` array.

**Verdict: TAKE THEIRS + reapply our 2-line metadata change.** Trivial.

### 7.5 `contact/page.tsx` — ours `+24/-5`, theirs `+18/-19`

Ours (`7ab42441`, `c218d7a6`): metadata retitle/rewrite, plus a `packagesMode`
fork — a "See plans and pricing" link block with full `data-cta-*` instrumentation,
and the h2 switching between "Send your enquiry" and "Book your free consultation".

Theirs: Unsplash hero → `HeroBrickBackdrop`, `✓` glyphs → `lucide` `<Check>`,
`border-l-4` → `rounded-xl`, `Eyebrow` labels, h2 `sm:text-2xl`→`sm:text-4xl`.
Theirs left metadata untouched.

**Same lines? YES, at the h2** — theirs restyles the exact h2 our `packagesMode`
ternary wraps.

**Verdict: TAKE THEIRS + reapply our delta.** Hunks: metadata block (clean),
the `isPackagesMode` import + pricing link block into their `rounded-xl bg-slate-50`
card, and the h2 ternary re-wrapped around their new h2 classes.

### 7.6 `property-tax-rates/page.tsx` — ours `+1/-1`, theirs `+173/-32`

Ours: one metadata description shortened. Theirs: cream hero, `StatsCounter`,
`CalculatorTabs` in a new `#free-tools` section, `TestimonialsSection`,
`FaqSection`, `ExampleFigureNote`, `buildBreadcrumbJsonLd`, `LeadForm` card →
`LeadCTAPanel`.

**Verdict: TAKE THEIRS + reapply our one-line description.**
**Flag:** theirs adds `buildBreadcrumbJsonLd` — confirm it does not duplicate
schema we already emit on this page.

### 7.7 `locations/page.tsx` — ours `+5/-4`, theirs `+24/-23`

Ours (`82b66a32`, `c218d7a6`): three em-dash removals in metadata, and
`href={`/locations/${loc.slug}`}` → `href={locationHref(loc.slug)}`.

Theirs: identical em-dash removals (independently), `HeroBrickBackdrop`,
`border-l-4`→`border border-transparent`, `CTASection`→`LeadCTAPanel contained`
with new copy ("Tell us where you are based and what you own…").

**Same lines? YES — and they made the same edit.** The em-dash hunks are
byte-identical in outcome.

**Verdict: TAKE THEIRS + one hunk back**: re-apply `locationHref(loc.slug)` at
their line ~54. Theirs still has the raw template literal. Low stakes today
(`locationHref` is currently the identity function per
`M/src/lib/locations.ts:9`), but it is the single point of control for the 08-05
reversal and must not be bypassed.

### 7.8 `locations/[slug]/page.tsx` — ours `+766/-111`, theirs `+29/-33`

**The size asymmetry is misleading.** Ours is almost entirely data:
`c218d7a6` + `bbfe0437` + `82b66a32` rewrote `cityContent` to add per-city
`metaDescription`, `sections: {h2, paras?, bullets?}[]` and `faqs: {q,a}[]`
(VERIFIED: London alone gets 6 sections and 12 FAQs), added `generateMetadata`
using `metaDescription`, and **stripped the LocalBusiness JSON-LD** of
`address`, `priceRange`, `openingHoursSpecification` and `organizationType` so
the markup makes no NAP claim we cannot stand behind. The file is now 995 lines,
with the render skeleton at 851-993.

Theirs is 100% styling on that skeleton: `Image`+overlay hero →
`HeroBrickBackdrop`, `Breadcrumb onDark`, six h2s `text-3xl` → `text-2xl sm:text-4xl`,
service cards `border-l-4 border-emerald-600` → plain, `CTASection` →
`LeadCTAPanel contained`, one em-dash removal in the London `areas` string.

**Same lines? YES, all of them — but mechanically.** Every one of their edits
lands on a line that still exists in our file at a shifted offset. Our two new
render blocks (`content.sections.map` at `M/…/page.tsx:908`, FAQs at `:935`) sit
between h2s that theirs restyles, so they inherit whatever h2 convention we pick.

**Verdict: KEEP OURS + apply their styling.** Named hunks to port onto our file:
1. `M/…/page.tsx:851-862` hero `<section>` + `<Image>` → their `relative flex
   items-center py-10 … bg-slate-900` + `<HeroBrickBackdrop />`. Drop the
   `next/image` import.
2. `:863` `<Breadcrumb` → add `onDark`.
3. All h2s (`:887, :899, :908, :924, :935, :948, :965`) → `text-2xl … sm:text-4xl`,
   **including our two new blocks' h2s** so the page is internally consistent.
4. Service cards `:~890` — drop `border-l-4 border-emerald-600`.
5. `:985-990` `<section>` + `CTASection` → `<LeadCTAPanel contained …>` with their
   three `proofPoints` and `footnote`.
6. Their London `areas` em-dash removal — check whether `82b66a32` already did it.

**Behaviour hiding:** none. Their `LeadCTAPanel` swap changes the page from a
link-out CTA to an inline form; that is a conversion decision, not a bug, and it
is the same soft-gate question CONTEXT.md §7 already has open with the owner.

### 7.9 `embed/page.tsx` — ours `+5/-2`, theirs `+37/-14`

Ours (`0c57b7bd`): shortened title/description and **added
`robots: { index: true, follow: true }`** with a comment saying the hub is
indexable while `/embed/[slug]` stays noindexed.

Theirs: `HeroBrickBackdrop`, `Breadcrumb onDark`, `max-w-2xl`→`max-w-3xl`,
`rounded-2xl`→`rounded-xl`, a new hero partnership CTA with `data-cta` attributes,
`data-cta` on the footer CTA, copy rewrites on the closing block, and a
`py-0.5` tap-target fix on the "Preview the full page" links.

**Verdict: TAKE THEIRS + reapply our metadata hunk** (title, description, `robots`).

**THE REAL FINDING IS IN `PageShell`, NOT THIS FILE — see §9.2.**

### 7.10 `sitemap.ts` — ours `+15/-0`, theirs `+7/-0`

Both sides added static paths. **Ours is a strict superset**: theirs adds 7
(`/services/*` ×4, `/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`);
ours adds those same 7 **plus** `/landlord-compliance`, `/leasehold`,
`/landed-estates`, `/cost-of-selling-a-property`, `/for-letting-agents`.
Ours also adds `if (post.noindex) continue;` in the post loop and a comment on
the locations loop.

**Verdict: KEEP OURS. Discard theirs entirely.** Nothing to port.

### 7.11 `lib/blog.ts` — ours `+1/-0`, theirs `+25/-1`

Ours (`c31b02d7`): `noindex: fm.noindex` added to `parsePostFile` — feeds the
sitemap guard above.

Theirs: a `CANONICAL_CATEGORY_NAMES` record + `categoryDisplayName(slug, fallback)`,
used in `getAllCategories()` so cards stop rendering whichever frontmatter variant
a post happens to carry ("Incorporation & Company Structures" vs "… and …").

**Same lines?** No. Different functions.

**Verdict: KEEP OURS + take theirs wholesale.** Both apply.
**Flag:** their `CANONICAL_CATEGORY_NAMES` has **9** entries. We have **10** live
hub routes (`property-finance` is missing from their map, because they never saw
it). Add `"property-finance": "Property Finance"` or the fallback silently kicks
in for that hub.

---

## 8. `src/components/layout/SiteHeader.tsx` — SPECIAL ATTENTION

Ours `+170/-16`. Theirs `+197/-23`. **Both sides built a dropdown nav from the
same 26-line starting file.** This is the single most contested file.

### 8.1 What we built (`05264d8a`, `57568a1b`, `7ab42441`, `e8de0325`)

- Module-scope `const activeCta = getActiveCta(niche)`, `activeNav = getActiveNav(niche)`,
  `ctaVariant = niche.cta.variant`.
- `type NavItem = (typeof siteConfig.nav)[number]` — inferred, not declared.
- `itemActive(pathname, item)` helper covering children.
- `DesktopDropdown`: **click-toggled `<button>`**, closes on Escape, on
  outside `mousedown`, and on `pathname` change (three `useEffect`s).
- Header CTA pair driven by `activeCta.header_secondary` (hidden below `xl:`) and
  `activeCta.header_primary`, both with `data-cta-goal` computed from the href and
  `data-cta-variant` emitted.
- Mobile: groups render as an **uppercase non-link section label** + children;
  a **hardcoded `/contact` link is appended** after the loop (because Contact was
  removed from nav config); mobile footer CTA driven by `activeCta.header_primary`.
- Kept `md:` breakpoint and `siteContainer`. Padding tightened `px-4`→`px-3`.

### 8.2 What they built (`CONTEXT_SUMMARY.md:107`, `SESSION2.md:86-89`, `SESSION3.md:208-211`)

- `SiteHeader({ nav }: { nav?: NavItem[] } = {})` — nav arrives **as props**,
  falls back to `siteConfig.nav`.
- Supports both `children` (flat `w-64` panel) and **`groups`** (a `w-[38rem]`
  two-column panel with category headers, `max-h-[70vh] overflow-y-auto`, and a
  "View all calculators" footer link).
- `groups` for Calculators is derived **from the tool registry** at
  `D/src/lib/calculators/nav.ts` via `D/src/lib/nav.ts:buildPrimaryNav()`, called
  in the server layout so the registry never reaches the client bundle. Their
  stated reason: a hand-listed JSON duplicate would drift the moment someone adds
  a calculator.
- `active` computed across the item href **plus every child and group href**.
- Dropdown trigger is a `<Link>`, opens on `onMouseEnter` / `onFocus`, closes on
  `onMouseLeave` / `onBlur`-outside / Escape.
- **Breakpoint `md:` → `lg:`** everywhere (nav, hamburger, mobile overlay) and
  `siteContainer` → `siteContainerXl`. That is how they afforded 5 top-level items.
- Mobile: parent stays a link, children indent under a left rule, self-referential
  child filtered out; groups render stacked with category headers.

### 8.3 Same lines? — YES, comprehensively

Both rewrote the desktop `nav.map`, the CTA block, and the mobile `nav.map`.
There is no hunk in either diff that the other side leaves untouched. **Neither
"take theirs" nor "keep ours" is viable.**

### 8.4 Verdict: MANUAL LINE-LEVEL MERGE — base = OURS

Base on ours, because the CTA-variant machinery is live, instrumented and
reversible-by-one-flag, and reimplementing it inside their component is a larger
diff than adding `groups` to ours. Port in, from theirs:

| Take from theirs | Into ours | Note |
|---|---|---|
| `groups` rendering branch (the `w-[38rem]` two-column panel + "View all calculators") | new branch in `DesktopDropdown` | needs `NavItem.groups` from `site.ts` §3 |
| `nav?: NavItem[]` prop + `navItems = nav ?? siteConfig.nav` | replaces module-scope `activeNav` **only if** we keep `getActiveNav` filtering — see below | |
| `D/src/lib/calculators/nav.ts` + `D/src/lib/nav.ts` | new files, unchanged | both are new-on-their-side, zero conflict |
| `layout.tsx` `nav={buildPrimaryNav()}` + `PageShell` `nav` prop | §4, §9 | |
| `md:` → `lg:` on nav, hamburger, overlay | 3 class strings | conditional on restoring Contact (§2.1) |
| `siteContainer` → `siteContainerXl` | 1 class string | `siteContainerXl` does **not** exist in `M/src/components/ui/layout-utils.ts` (VERIFIED) — arrives with the design system |
| `active` across children + group hrefs | replaces our `itemActive` | strictly better |
| mobile group rendering (stacked, category headers) | new branch | |
| `whitespace-nowrap` on nav links | | |

Keep from ours, do not let theirs overwrite:
- `getActiveCta` / `getActiveNav` / `ctaVariant` and every `data-cta-*` attribute,
  including `data-cta-variant` and the computed `data-cta-goal`. Theirs hardcodes
  `href="/contact"` and the label "Book consultation".
- **Click-toggle `<button>` trigger, not hover-`<Link>`.** Their hover-only
  desktop dropdown is a touch-device trap: on a tablet at ≥`lg` there is no hover,
  so tapping "Services" navigates to `/services` and the children are unreachable
  from desktop layout. Ours opens the menu. (INFERRED from the code; not
  device-tested.)
- Close-on-route-change and close-on-outside-`mousedown` (theirs has neither).
- The `/contact` handling — replaced by restoring Contact to nav config (§2.1),
  which deletes our hardcoded mobile append.

**Reconciling `getActiveNav` with `nav` props:** `buildPrimaryNav()` should call
`getActiveNav(niche)` rather than `siteConfig.nav`, so the packages-mode filter
survives the move to server-built nav. One-line change to their new
`D/src/lib/nav.ts`.

### 8.5 Behaviour hiding in their diff — FLAG

1. **`md:` → `lg:` is a behaviour change, not styling.** Every viewport
   768-1023px loses the desktop nav and gets the hamburger. Intentional on their
   side (it buys room for 5 items + wider dropdowns); it must be a conscious
   decision on ours, and it is coupled to restoring Contact.
2. **`SiteHeader` gains a prop.** Any route that mounts it outside `PageShell`
   silently falls back to unfiltered `siteConfig.nav` — i.e. no calculator groups
   and no packages filtering. Their fallback comment acknowledges this.
3. **The tool registry becomes a nav dependency.** Adding a calculator now changes
   the header on every page. That is the point, but it means a broken registry
   entry breaks the header site-wide, not just `/calculators`.
4. Their dropdown trigger `<Link>` carries `aria-expanded` on a link, which is
   the wrong role pairing. Ours uses `<button aria-expanded aria-haspopup>`.
   Keeping ours resolves it.

---

## 9. `src/components/layout/SiteFooter.tsx` and `PageShell.tsx`

Neither is in our diff at all: `git log --oneline 1d68a570..HEAD --
Property/web/src/components/layout/SiteFooter.tsx` returns **empty** (VERIFIED).
`PageShell.tsx` likewise. So these are **clean take-theirs on the code** — but
both carry consequences.

### 9.1 `SiteFooter.tsx` — theirs `+134/-28`

They replaced the flat `siteConfig.footer` list with `buildFooterColumns(nav)`,
deriving four columns (Services / Resources / Calculators / Company) from the
**nav**, and demoted `siteConfig.footer` to a legal-only secondary row. Plus a
brand lockup, `HeroBrickBackdrop`, and two documented WCAG 2.5.8 tap-target fixes
(`space-y-2` + `py-0.5` on links, `inline-block py-1` on `ConsentToggle`).

**Verdict: TAKE THEIRS — but `footer_links` must be re-scoped in the same change.**
Our `footer_links` has **18** entries (VERIFIED). Their legal row renders
`siteConfig.footer` flat with `gap-x-6`. Taking their footer with our config
produces an 18-item legal strip.

Resolution, and it is clean: their `buildFooterColumns` reads
`childrenOf("/services")` and `childrenOf("/landlord-tax")` — with the merged nav
from §2.1 that is 6 + 11 = 17 links, which **is** 13 of our 14 content
`footer_links` plus more. So:

- Trim `footer_links` to the 3 legal entries (Privacy policy, Terms, Cookie policy).
- `Locations` is preserved: their Company column hardcodes it.
- `Landlord tax index` is preserved: §2.1 adds it to Resources children.
- Net loss: **zero** internal links. Net gain: the footer can no longer drift
  from the nav.

**Behaviour hiding — two flags:**
1. Their Company column hardcodes `{ label: "Book a consultation", href: "/book" }`.
   VERIFIED: `M/src/app/book/page.tsx` exists, so this resolves. Confirm it is the
   route we want in the footer.
2. **The "Built by Double Wired Creative" credit link to `doublewiredcreative.com`
   is inside this component.** `DESIGN_GUIDELINES.md` §1.1 makes it a spec
   requirement. It is an owner decision (CONTEXT.md §7) and it is an outbound
   dofollow link from every page on the site. Do not ship it by accident.

### 9.2 `PageShell.tsx` — theirs `+18/-6`. **LIVE BUG ON OUR SIDE.**

VERIFIED, `M/src/components/layout/PageShell.tsx:17`:

```
if (pathname?.startsWith("/embed")) {
```

`"/embed".startsWith("/embed")` is `true`. So `/embed` — the **public gallery**
where partners come to find the embed codes — renders with no header, no logo,
no footer and no way back into the site. The chrome-free branch was meant for
`/embed/<slug>` iframes only. Their fix is one character-class: `"/embed/"`.

**This is materially worse than it looks on our side.** Commit `0c57b7bd` set
`robots: { index: true, follow: true }` on `M/src/app/embed/page.tsx` with the
comment *"The hub page is indexable (its audience is agents searching for
embeddable tools)"*. We deliberately drove organic traffic to a page that has no
navigation. INFERRED (not measured): every organic session on `/embed` is a
forced bounce.

**Verdict: TAKE THEIRS, and take the `/embed/` fix immediately, ahead of the
port.** It is a one-character change with no design dependency.

---

## 10. `src/lib/*` — no conflict, four clean takes

`git log --oneline 1d68a570..HEAD` returns **empty** for `essential-guides.ts`,
`nav.ts`, `site-stats.ts` and `calculators/nav.ts` (VERIFIED). `nav.ts`,
`site-stats.ts` and `calculators/nav.ts` are **new files on their side**.
`essential-guides.ts` they modified (`+49/-1`: added `guideGroups`, and `icon` +
`group` on all 12 guides).

**Verdict: TAKE THEIRS, all four, wholesale.** These are not conflicts and should
be moved out of this brief's bucket into the clean-171 wave.

One dependency to check before taking `essential-guides.ts`: it now imports
`LucideIcon` and 12 icons from `lucide-react`. Confirm `lucide-react` is a
dependency in `Property/web/package.json` — several other of their files import
it too, so this is a whole-port precondition, not a per-file one. **Not verified here.**

---

## 11. Do-first list (independent of the port)

Three fixes here are live bugs with no design dependency. They can ship on their
own, before any design work, and each is a few lines:

1. **`M/src/middleware.ts`** — delete lines 165 and 423. Restores
   `/blog/property-accountant-services`. (Optional: add the dev-only category-collision
   assertion so the class cannot return.)
2. **`M/src/components/layout/PageShell.tsx:17`** — `"/embed"` → `"/embed/"`.
   Restores site chrome on an indexable page.
3. **`M/src/lib/blog.ts`** — take their `categoryDisplayName` + `CANONICAL_CATEGORY_NAMES`,
   **and add the missing `"property-finance"` entry**.

CONTEXT.md §6.1 (invisible `LeadForm` labels on `bg-slate-900` in
`BlogPostRenderer`) is the same shape of problem but is outside this brief's file
list; it was not verified here.

---

## 12. Verified vs inferred — index

**Verified** (ran the diff, read the file, or ran a script against it): every
numstat; every `git log` per file; both middleware maps parsed and cross-referenced
against the 10 live `/blog/<x>` route directories; `M/src/middleware.ts:165`,
`:423`, `:555-598`; `M/src/components/layout/PageShell.tsx:17`;
`M/src/config/niche-loader.ts:125-138`; both `niche.config.json` files parsed and
compared key by key; `M/src/lib/locations.ts`;
`M/src/components/resources/CalculatorPageResources.tsx:29-35`; absence of
`onDark` in `M/src/components/ui/Breadcrumb.tsx`; absence of `siteContainerXl` /
`heroCreamSurface` / `btnOnCream` in `M/src/components/ui/layout-utils.ts`;
existence of `M/src/app/book/`, `M/src/app/research/landlord-tax-index/` and the
four `M/src/app/services/*` sub-pages; `hide_in_packages` count = 0.

**Inferred** (reasoned, not executed): the touch-device consequence of their
hover-only dropdown; that an 11-item Resources panel does not need scroll; that
`/embed` organic traffic bounces; that no non-`/blog` route is affected by the
broadened matcher.

**Not checked, flagged for the plan**: whether every tool in our registry defines
`faqs`; what our `CalculatorPageResources` renders when `pageTitle` is undefined;
whether `lucide-react` is in `Property/web/package.json`; whether their new
`LocationChips` hardcodes `/locations/${slug}`; whether their
`buildBreadcrumbJsonLd` on `/property-tax-rates` duplicates schema we already emit.
