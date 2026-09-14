# Handoff: port the next estate site to the Property design standard

Port the next estate site to the Property design standard.

FIRST, in this order, before anything else:
1. Load the `standard_terms` skill. It governs everything and wins on conflict.
2. Run `python scripts/port_preflight.py`. It must exit 0 before you plan or measure
   anything. It checks for stray dev servers, a STATE.md that contradicts its git tags,
   uncommitted port artefacts, and the instrument fixture test. If it fails, fix what it
   names first. Every one of those has failed on a previous port, including at the end,
   when three servers were left listening and a pickup block claimed phase 2 while git
   had tags to phase 6.
3. Read the STOP block on screen one of `docs/_engines/DESIGN_PORT_PLAYBOOK.md`, then
   section 2.1, then section 8 item 11 (the SIX kit-chrome props), then section 13. Read
   `docs/_engines/PORT_FIELD_NOTES.md` sections 4, 5, 6, 10, 11 and **12**. Section 12 is
   the newest (charities) and carries three estate-wide defects plus two counting
   corrections to commands our own docs got wrong.

STATE OF PLAY. **Seven sites are ported: generalist, solicitors, dentists, medical,
construction-cis, contractors-ir35 and charities.** All phases built, independently
reviewed, gap-fixed and tagged. Verify with `git tag -l 'port-*'`, which is the only
authority; STATE.md files narrate, tags record. **NOTHING IS PUSHED AND NOTHING IS
DEPLOYED. Production serves the pre-port SHA on every site, and 119 commits sit
unpushed** (`git log --oneline origin/main..HEAD | wc -l`). Push and deploy are both
owner-triggered, and the walk happens at the end once everything is done.

**charities is genuinely finished, and it ran in ONE session for all seven phases:**
phase 0 alone and gated (`78dcd3a5`), then phases 1 to 6 as **seven packages running
concurrently on disjoint file sets**, one build at wave close, every written verification
list executed against that build (`ce37721f`, one commit, six tags), then two independent
adversarial reviews against the rendered DOM and a gap-fix wave (`922d1105`). That shape
works. Phases do NOT have to run sequentially. **"One SITE at a time" still stands**; it
is concurrency across sites that cost us, never concurrency within one.

WHICH SITE. Derive it, do not read it from a doc. Run `git tag -l 'port-*'` for what is
done, take the order from `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`, and confirm with
the owner in one plain-language message. **Ten sites remain** and are mostly small.
`digital-agency` is the outlier at 90 routes and 306 posts: leave it late. Two sites
(`wills-probate`, `divorce-finances`) have never launched, so they carry no cutover risk.

THE ONE CHANGE THAT MATTERS MOST. Phase 0 is baseline capture AND a claims and
ground-truth audit, gated, with the serious tier fixed and committed BEFORE phase 1
starts. It worked again on charities: **26 serious rows, 26 of 26 confirmed against the
rendered build, none overstated and none false, plus 8 further serious rows that only a
rendered-HTML sweep could find** (config-injected copy, `priceRange "££"` on 68 nodes,
FAQ pairs with no on-page counterpart). Serious total 26 to 34, the same undercount ratio
as every prior port. Still budget a third of the port for live defects that are not
design work: on charities that included a hero CTA that had rendered white on white since
launch, two hub routes publishing raw escaped HTML as visible body text, calculator
result panels at 1.49 and 2.63, three posts publishing `[object Object]` as their
JSON-LD, and 161 unstyled article pages across ten deployed sites.

## RULES THAT ARE NOT NEGOTIABLE

- **ONE SITE AT A TIME.** Within that site, parallel packages on disjoint file sets are
  fine and fast.
- **SWEEP BY THE RULE AND THE WHOLE SITE, never by the list you were handed.** Every list
  has undercounted: a canonical defect reported on 1 route family was on 5; an
  unlayered-CSS audit reported 3 rules where there were 26; a claims ledger's 26 serious
  rows became 34. Search frontmatter and `schema:` JSON-LD, search the arithmetic as well
  as the words, and check the VALUE not the presence of a key. **Also verify the list's
  POSITIVES**: on charities four rows were understated in scale, one was mis-located and
  one minor was mis-graded, and on the port before it a ledger called a CORRECT figure
  wrong.
- **GREP THE RENDERED HTML OF A SERVED BUILD, not only the repo.** A fee claim sat in
  `niche.config.json` and rendered in the footer and the Organization JSON-LD on every
  URL while appearing in no page's source.
- **PUT THE PUSHBACK CLAUSE IN EVERY AGENT BRIEF, VERBATIM** (playbook 10.1): "Verify
  against source. If this brief is wrong, say so and trust the source." It keeps earning
  its place: on charities it caught two wrong expected values in the manager's own briefs
  (a phrase counted twice that occurs once, and a route listed as a known carrier that was
  already clean), and a `return` query param that is actually `rt`.
- **THE MANAGER IS THE ONLY ONE WHO BUILDS.** Four agents running `next build` in one site
  directory share one `.next` and produced a phantom `pages-manifest.json ENOENT` that
  read as a real defect. Ban builds and servers in every agent brief; require each agent
  to return a WRITTEN VERIFICATION LIST instead (URL, command, expected result), then run
  ONE build at wave close and **execute every list against it BEFORE tagging.** On
  charities that step found the `[object Object]` JSON-LD and a leaked pipeline artefact
  "(HP14)" published in a stats strip; on the port before it, skipping it until after
  tagging let a site-wide regression through.
- **PROVE A SERVER'S IDENTITY AND ITS AGE before quoting it.** Assert the served page
  title, then diff a string whose commit date you know. A reviewer correctly rejected a
  server 11 minutes older than the working tree.
- **DEFAULT TO WHAT PROPERTY DOES, unless Property is evidently wrong.** Copy Property's
  ANSWER, not its DEFECTS. Known defects not to copy: `WhatToExpectCard` default props
  publish a fee line no page authored; `FaqSection` is a Radix accordion with no
  `forceMount`; `NumberedReasons` animates off keyframe classes its siblings lack; and its
  `LeadCTAPanel` call site passes "Fixed fees, quoted upfront" and "24-hour response".
  Pass `proofPoints={[]}` and never invent replacements.
- **NEVER CHANGE PROPERTY, including indirectly via `packages/web-shared/`** (trap 12).
- **POSITIONING: match what the site's own terms page already says.** The first-person "we
  do the work" voice STAYS. "Free call" STAYS (owner ruling: Property uses it in 61
  places). What goes is any claim to a qualification, a regulator, professional indemnity
  insurance, or performing regulated work.
- **Write the phase's work-package list down before you launch it and tick it off at close.**
- **Cap agent fan-out sensibly and say in every brief whether that agent may delegate.**
  The default line is "Do NOT launch subagents."
- No new monitor, alert, cron, email, digest, popup, modal or banner, and no change to an
  existing one's timing, trigger or cadence. Ask first, every time. This includes adding a
  capture surface to a page that had none, and changing when an existing interruption fires.

## TRAPS ADDED BY THE CHARITIES PORT, read these before phase 1

- **A COMPOSED OVERRIDE TIES ON SPECIFICITY AND LOSES ON SOURCE ORDER.** `btnPrimary`
  hardcodes `text-white` and its own ground (`packages/web-shared/design/layout-utils.ts`),
  so a call site appending a competing colour produces two single-class rules of equal
  specificity and the later one in the stylesheet wins, which depends on Tailwind's
  emission order and not on your class string. Two live estate defects are this same
  shape: the header CTA's `hidden` versus `lg:inline-flex`
  (`design/chrome/SiteHeader.tsx:473`) and the charities homepage hero button, which had
  rendered **white on white since launch** because the call site composed `text-primary-700`
  over the recipe. RULE: never invert a kit recipe by composition. Write the element out,
  or drive it from a token. Settle any suspected tie by byte offset in the served
  stylesheet, never from the class list: `curl -s <cssbundle> | grep -bo '<selector>'`.
- **AN UNDEFINED CSS CUSTOM PROPERTY INVALIDATES THE WHOLE DECLARATION,** so the element
  renders nothing with every test green. `bg-[var(--primary)]` with no `--primary` declared
  is not a fallback to black, it is no background at all. charities declared neither
  `--primary` nor `--accent-strong` while adopting components that paint from both, so the
  reading-progress bar was transparent with a clean `browser_check`. RULE: sweep every
  newly adopted kit component for bare reads BEFORE adopting it,
  `grep -rn 'var(--[a-z-]*)' <component>`, and check each name against the site's
  `globals.css`. Both kit families now ship `var(--primary,var(--brand-primary,#0f172a))`,
  so this specific instance cannot recur.
- **THERE ARE TWO COPIES OF SEVERAL KIT COMPONENTS.** `packages/web-shared/design/blog/`
  and `packages/web-shared/content/` both carry `ReadingProgress.tsx` and
  `TableOfContents.tsx`. A survey that checked only one family reached the wrong answer
  about a live site. RULE: `grep -rn "<component>" <site>/web/src` to establish which
  family the site imports before concluding a defect applies, and patch both when you
  patch one.
- **DENTISTS WAS FOUND CARRYING THAT DEFECT LIVE IN PRODUCTION:** 8 uses of
  `var(--primary)`, 0 declarations, confirmed against its served stylesheet, so its
  reading-progress bar filled with nothing. Fixed with one declaration at
  `Dentists/web/src/app/globals.css:72`. Every other ported site declares both. **Check
  your own site for this early**, in phase 0, not at review.
- **A KIT COMPONENT'S DEFAULT PROPS CAN SHIP DEAD LINKS.** `SiteFooter.companyItems`
  defaults to Property's four routes including `{ label: "Locations", href: "/locations" }`
  (`design/chrome/SiteFooter.tsx:84`), which 404s on any site without location routes, and
  `SiteFooter.resourcesHref` defaults to Property's own `/landlord-tax`. Playbook section 8
  item 11 now lists **SIX** props, not two. RULE: read every default object in a chrome
  component's signature, pass the prop, and probe every href you pass. A default is a claim
  about your site that nobody checked.
- **`wordmarkIcon` IS A COMPONENT FUNCTION AND CANNOT CROSS THE RSC BOUNDARY**
  (`design/chrome/SiteHeader.tsx:88` types it `WordmarkIcon`), which is why every ported
  site keeps a thin client shell wrapper around `PageShell`. generalist, Solicitors and
  charities all have one. RULE: the wrapper is the required pattern, not a bespoke
  deviation. Do not raise it as a port defect, do not delete it, and do not try to call the
  kit shell from a server layout.
- **A CLASS CAN NAME NOTHING, ESTATE-WIDE.** `prose` was emitted on **161 live article
  pages across TEN deployed sites** with zero `.prose` rules shipped anywhere and no
  typography plugin installed in the monorepo; five sites also emit `section-label` with no
  rule (the charities instance sat on `bg-[#0f2e24]` and measured 1.22). Fixed for all ten
  with one shared stylesheet, `packages/site-styles/prose-standard.css` (`51acda3b`).
  **It is deliberately NOT in `packages/web-shared/`: Property's `globals.css` carries an
  `@source` for that directory and Tailwind v4's scanner does not ignore `.css` files, so a
  new stylesheet there can add rules to Property's own output.** That reasoning generalises
  to anything new you put in the kit. Per-site check:
  `curl -s <domain>/_next/static/css/<hash>.css | grep -o '\.prose[ {,:]' | wc -l` (count
  the SELECTOR, not the substring; `prose-blog` and `not-prose` inflate a raw count).
- **BANNING A KIT STYLESHEET IMPORT IS THE WRONG REMEDY FOR WRONG-BRAND FALLBACKS.**
  charities banned `packages/web-shared/design/globals-standard.css` to stop Property's
  emerald and cream leaking in. The reasoning was right and the remedy was wrong: the cost
  was that `.related-card:focus-within` is the ONLY focus indicator on related-article
  links (which carry `focus-visible:outline-none`), so **keyboard focus was invisible on 23
  article pages**. RULE: import it AND declare the five tokens in the same change
  (`--brand-glow`, `--brand-glow-deep`, `--brand-glow-edge`, `--brand-glow-faint`,
  `--hero-cream`). Then add the `<noscript>` override Property carries, because the import
  activates collapsed `[data-draw="off"]` states that only an observer releases: without
  it, 64 pages show invisible eyebrow rules.
- **WARN EVERY PACKAGE ABOUT THE ACCORDION TRAP, NOT JUST THE BLOG ONE.** The hubs package
  adopted the kit's Radix accordion for FAQs on `/services/[slug]` and `/for/[slug]`, and
  **17 FAQPage answers across 7 pages were asserted to crawlers while absent from the
  server HTML.** Phase 0 of this very port had closed that exact defect on the blog, and
  the manager warned the blog package and not the hubs one. Fixed with a plain `<dl>` that
  is always in the DOM. GENERALISE: **every file assigned to a package needs an owner for
  EVERY defect class in it, not just the package's theme**, and **every path in an OFF
  LIMITS list must be proved to exist (`ls` it)** before the prompt ships. On charities one
  fence named `src/lib/charity-services.ts` when the file is `src/data/charity-services.ts`,
  so it guarded nothing, and the homepage was fenced off from the claims agent while
  assigned to an agent fixing links only, which is why its testimonials, client-base claim,
  regulated-work line and turnaround promise all survived the wave.
- **COUNTING TRAPS, IN BOTH DIRECTIONS.** Against built CSS, `grep -c` returns only 0 or 1
  because the file is one line (46,359 bytes on one line on charities):
  `grep -c primary-600 generalist/.../*.css` returns **1** for **42** occurrences, so use
  `grep -o ... | wc -l`. Against Next.js HTML, `grep -c` **OVER**counts, because the same
  text is serialised again into the RSC flight payload: a `section-label` count of 16 was
  really 8, and a phrase counted 2 occurs once. RULE: report rendered HTML as **per-page
  presence** (`grep -ql` per file, count files) and always say which of the two you
  measured. One of these errors reached an owner report.
- **A `ratio=1.00` ROW WITH `color=rgb(255, 255, 255)` IS USUALLY A WHITE-ON-GRADIENT
  INSTRUMENT ARTEFACT, AND ON CHARITIES ONE WAS A REAL WHITE-ON-WHITE BUTTON.**
  `browser_baseline.json` carried **64** such rows out of 164, and the homepage
  `a "Talk to a charity accountant"` row was the live hero CTA. RULE: never dismiss one as
  an artefact and never accept one as a defect without proof. Settle each against the
  served stylesheet's byte order, at the element the row names.
- **A SITE-LOCAL GREP PROVES NOTHING ABOUT AN ESTATE-CENTRAL MECHANISM.** Three times on
  charities an agent concluded a published privacy disclosure was false because it grepped
  one site, and all three were TRUE: the multi-firm lead pool
  (`Property/web/src/lib/leads/offer-send.ts`, DB-driven and source-agnostic), the
  Anthropic grading through the Vercel AI Gateway, and the Companies House enrichment all
  live in Property's code and are reached from every site through a shared handler and a
  database trigger. **Two of the three had to be restored after being wrongly removed.**
  RULE: before calling a site's copy false, (a) grep Property for the same string and
  (b) establish whether the mechanism is site-local or central. Consent text is also
  gate-load-bearing: `consentAllowsSharing` matches on the published wording and
  `Property/web/src/tests/consent-anchor-drift.test.ts` pins it.
- Still live from earlier ports, do not rediscover them: **never declare a custom property
  whose name collides with a Tailwind v4 theme variable outside `@theme`** (`--radius-*`,
  `--color-*`, `--font-*`, `--spacing-*`, `--text-*`, `--leading-*`, `--shadow-*`); the
  **calibration figures in circulation are v3** (v4 `slate-500` is **4.77**, `slate-400`
  **2.63**), and contrast is symmetric, so a hex has ONE ratio and THREE floors (3.0 as a
  graphic, 4.5 as text, 4.5 as a ground); **agreement between agents is not evidence**, only
  a measurement on the CURRENT build; **a site can be missing `@source` for
  `packages/web-shared`** and then no kit utility compiles at all (eight sites were, fixed
  in `51acda3b`); **the documented unlayered-CSS sweep must walk a character stream read
  `utf-8-sig`**, not lines, or it finds nothing in built output and trips over a BOM;
  `sr-only` on a `<table>` does not work; **a comment is a claim, never evidence**;
  canonical inheritance from a root layout; and **the instrument must assert the JSON-LD
  PARSES per URL**, because three charities posts published `[object Object]` while the
  `<script type="application/ld+json">` tag was present.

## OWNER DECISIONS ALREADY OPEN. Do not re-ask them and do not act on them

1. The shared header cascade defect above. Crosses 18 sites including Property.
2. `packages/web-shared/leads/MiniCapture.tsx` publishes a timed promise under six mounts
   per site.
3. ZeroBounce receives enquirer emails from the live submit path and is not disclosed in
   the privacy policy.
4. `packages/web-shared` hardcodes an `AccountingService` schema type and a local-business
   locality. Property uses plain `Organization` and is right. charities asserts
   `["ProfessionalService","AccountingService"]` site-locally as well.
5. The dormant `packages` CTA variant in six niche.config.json files. Cannot be removed
   per-site: the shared validator requires the key.
6. Site titles, H1s and meta still assert firm identity. That is the SEO surface, and on
   charities it sits on all 72 URLs in three independent layers while `/terms` §2 disclaims
   the relationship.
7. Solicitors IR35 size test: house_positions says £10.2m/£5.1m, three pages say £15m/£7.5m
   with the lag explained correctly. THE PAGES LOOK RIGHT. Do not "correct" them.
8. Estate-wide retention: privacy pages promise enquiry data is gone at 24 months and
   consent records kept up to six years. The purge cron is dry-run unless an env flag is
   set, and even armed it anonymises rather than deletes. One cron governs about twenty
   sites and arming it is irreversible across all of them. **Partly narrowed by charities,
   not closed:** the published wording there is now accurate about the mechanism
   (anonymisation, not deletion) and the reconciliation is written up in
   `docs/_engines/RETENTION_PROMISE_RECONCILIATION_2026-09-13.md`; the arming decision is
   untouched.
9. Property's own `niche.config.json` description publishes "Fixed fees, 24hr response",
   rendering in its footer and JSON-LD on every page.
10. Both umbrella workbooks on contractors-ir35 cite an "HMRC list" of compliant umbrella
    companies that does not exist. Report-only by owner ruling.
11. **NEW: deploy ordering.** charities, Dentists' one-line `--primary` fix and the ten
    sites carrying the new shared prose stylesheet are three separate blast radii riding
    one decision, and none of them is pushed.
12. **NEW: 43 blog FAQ answers on charities are asserted to Google in wording that does not
    match the page, 9 of them barely present.** Pre-existing, larger than the review
    reported, and it needs a content pass rather than a design one.
13. **NEW: fifteen sites publish that up to six firms may receive an enquiry, with a
    48-hour cascade to related professions. The coded cap is three and no adjacency step
    exists.** Copy versus code, found by this port and deliberately not changed.
14. **NEW: Property's own privacy policy claims a "published grading rubric" that does not
    exist** (there is a repo document only). charities now says "internal rubric".
    Property cannot be changed.
15. **NEW: `/calculators` and `/calculators/[slug]` on charities still run a pre-port hero**
    against the kit recipe used everywhere else. The exact swap is recorded in
    `922d1105` and `docs/charities/STATE.md`.
16. **NEW: `tw-animate-css` is absent from charities' and Dentists' `package.json`**, so the
    kit accordion's keyframes resolve to nothing on those sites. Ten sites already carry it;
    adding a dependency is an owner call (T24).
17. **NEW, from the charities review and not acted on:** the footer studio credit is a
    dofollow sitewide outbound link on every chromed page. The credit itself is settled; its
    follow status was decided silently by a port.

BACKGROUND: `docs/_engines/PORT_FIELD_NOTES.md` (section 12 is charities),
`docs/_engines/PROPERTY_REFERENCE_ANSWERS.md` for what the central lead machinery actually
does, `docs/_engines/ESTATE_PROSE_SWEEP_2026-09-13.md`, and
`docs/charities/_port/` for worked examples of every artefact, including the two
independent adversarial reviews (`R1_DESIGN_REVIEW.md`, `R2_CONTENT_REVIEW.md`) that are
now the template for review at wave close.

Report to the owner like he is the CEO: recommendation in the first three lines, one
decision at the end, plain language, no file paths in the question itself.
