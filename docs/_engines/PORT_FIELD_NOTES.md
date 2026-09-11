# Port field notes: what each site's port taught the next one

**Read this before you start a port. Add to it before you finish one.**

Several sites are being ported to the Property design standard at the same time, by
different agents, in the same working tree. This file is how they teach each other. The
playbook (`DESIGN_PORT_PLAYBOOK.md`) is the METHOD and changes rarely. This file is the
running log of what actually bit, and it changes every session.

If a lesson is durable and general, promote it into the playbook as a numbered trap and
leave a one-line pointer here. If it is specific to one site, it belongs in that site's
`docs/<site>/STATE.md`, not here.

## How to add an entry

Append to the bottom of the relevant section. One entry is one lesson. Every entry carries:

- **the date and the site** it came from,
- **what actually happened**, not what you feared might happen,
- **the deriving command or the file:line**, so the next agent can re-check rather than
  trust you,
- **the rule** that prevents it.

Do not write an entry for something you did not personally observe. A claim with no
command beside it is a rumour, and this file is read by agents who will act on it.

Correct an entry in place if it turns out to be wrong, and say so; a field note that is
quietly deleted teaches nothing, and one that is wrong is worse than one that is missing.

---

## 1. Live-analytics hazards (the class that costs the most)

**2026-09-10, Solicitors and generalist. Adopting the kit chrome rewrites CTA
segmentation.** `data-cta-goal` flipped `contact` to `form` and `data-cta-placement`
flipped `header_mobile` to `mobile_menu`, on every route, for the same button pointing at
the same destination. Both are live `vw_cta_performance` values sent in the same
`cta_click` payload by `packages/web-shared/analytics/autoCapture.ts`.
Why it matters: the site's funnel history splits at the cutover, so the before-and-after
read you take to justify the port is against a broken baseline. It reads as a drop that
never happened.
Deriving command: crawl the pre-port build and the ported build and diff the full
attribute set, not just ids:
`curl -s $URL | grep -o 'data-cta="[^"]*"[^>]*data-cta-goal="[^"]*"'`
RULE: pass `ctaContactGoal` and `ctaMobilePlacement` from your own call site with your
site's pre-port values. Playbook trap T22.

**2026-09-10, Solicitors. Fifteen of twenty-two `data-cta` ids had never fired.** The
funnel pull found only 5 live, 2 dormant, 15 never-fired, and the never-fired set included
every hero, header and homepage CTA. Three further ids fire from JS with no `data-cta`
attribute at all.
Why it matters: you cannot read a conversion lift on a surface that was never instrumented,
and the port is the cheapest moment to fix it because you are already in those files.
RULE: inventory `data-cta` against recorded events in Stage 0, not at the end. Classify
each id live / dormant / never-fired before you touch a single component.


**2026-09-11, Trade (construction-cis). `web_events.is_bot` does not inherit
`web_sessions.is_bot`, so every "post bot-gate" figure in the programme is two different
numbers.** 45 of Trade's 247 nominal sessions (18.2%) and 460 of Property's 5,089 (9.0%) are
flagged bot on the session row and clean on the event rows, all `bot_reason='ua_pattern'`.
This is not academic: the loose read manufactured an 11-click `assistant_contact` cluster on
one glossary page where all 11 sessions loaded `/contact` and none started a form, and all 11
were fingerprint-identical (desktop Chrome Windows, 1366x768, `engaged_ms=0`, self-referrer,
click 1s after load). A textbook fake leak that would have sent a phase at the wrong surface.
RULE: filter on BOTH flags, state which definition you used, and never compare a strict number
against a loose one. Medical's `_port/FUNNEL_BASELINE.md` is loose-definition and its figures
are inflated; corrected here rather than in that file, which belongs to that port.

**2026-09-11, Trade. A CTA can be invisible to the estate's analytics because of the attribute
NAME, not the absence of instrumentation.** `src/components/ui/StickyCTA.tsx:147` ships
`data-cta-id`, and `packages/web-shared/analytics/autoCapture.ts:100` matches `data-cta`. The
site's only persistent site-wide CTA has therefore never emitted a single `cta_click`, and its
dismiss control carries no id at all. It reads as a dead surface in the data when it is in fact
an unmeasured one.
RULE: in the Stage 0 CTA inventory, grep the attribute the capture code actually matches, not
the concept. An id that returns zero rows is a question, not a finding: check the spelling of
the attribute before concluding the surface is dead.

**2026-09-11, Trade. Phase 0 queried the wrong event and concluded a modal had no denominator.**
The first funnel pass reported that `deep_scroll_modal` had never fired, so the modal's value was
unmeasurable. It was querying `cta_click`, where that id is the id of the offer LINK; the modal's
open fires `personalization_shown` with `surface='deep_scroll_modal'`. Nothing needed building.
RULE: before proposing instrumentation to fix an absence, find the event the component actually
emits and query that. Caught by a sibling slice agent reading the code path, not by the data.

**2026-09-11, Trade. A CTA COUNT cannot detect trap 22, so there is now an instrument that records
the triple.** `docs/_engines/instruments/cta_snapshot.mjs`, new this session. Trap 22 flips
`data-cta-goal` and `data-cta-placement` for the same button and the same destination, so the count
is identical before and after and `sweep_baseline.json`'s CTA count proves nothing. What splits the
live funnel at cutover, and reads as a drop that never happened, is the triple. The instrument
records `(id, placement, goal, href)` per route, asserts the served page title before measuring
anything (section 5), and also picks up `data-cta-id`, the misspelling that exists in the wild.
On Trade: 5 distinct triples over 246 routes and 620 tags
(`docs/construction-cis/_port/cta_baseline.json`, `distinct_triples`), and the identical set
re-derived after the chrome rewrite, which is how trap 22 was cleared by measurement rather than by
assumption.
RULE: snapshot the triples BEFORE the first chrome commit; diff after every phase touching chrome or
CTAs. Also worth recording: the source declares 16 `data-cta` ids
(`grep -rohE 'data-cta="[a-z0-9_]+"' <site>/web/src | sort -u | wc -l`) and only 5 render, because
several sit in config branches this site does not use. A guard pinning only the rendered set leaves
11 unprotected.
PROMOTED: folded into playbook trap T22. Kept here for the instrument and the Trade numbers.

**2026-09-11, Medical phase 3. Renaming an analytics dimension HALFWAY is worse than not
renaming it.** The `data-cta-placement` values in the blog subsystem were made consistent on
`/blog` only, which left all eight category hubs emitting a bare `hero`. That is the value the
HOMEPAGE already emits on a live series, so hub clicks would have merged into the homepage's
series with no way to separate them afterwards. Caught in review, before any commit shipped.
Deriving command: `git diff -U0 | grep -E '^[+-].*data-cta-placement'`, then compare the value
set against what other route families already emit.
RULE: rename every surface in one pass, or none. A net-new series is free to rename before its
first click and impossible after.

---

## 2. The shared kit (`packages/web-shared/design/`)

**2026-09-10. Property is NOT a consumer of the kit chrome.** `Property/web` imports
`./SiteHeader` and `./SiteFooter`, its own local copies. The kit chrome is imported by the
PORTED sites only.
Deriving command: `grep -rn "web-shared/design/chrome" --include=*.tsx . | grep import`
Why it matters: a fix justified as "the default protects Property" is reasoning about the
wrong set. The first Solicitors fix did exactly that, wired one consumer and left the other
broken. Playbook trap T23.
RULE: derive the consumer list, fix every consumer in the same commit.

**2026-09-10. The kit footer ships Property's designer credit to whatever site adopts it.**
A followed outbound link to the design studio, in their indigo/orange gradient, on every
page. Two sites shipped it without anyone deciding to.
~~RULE: pass `showBuilderCredit={false}` unless the studio designed your site.~~
**CORRECTED 2026-09-11, owner decision (commit `6966c1f1`): the credit is wanted estate-wide,
on every ported site. Pass `true`, which is also the kit default.** The rest of the entry
stands. RULE: audit any adopted component for outward-facing content generally: external
links, third-party assets, brand names, `rel` attributes. Playbook trap T27.

**Standing rule for kit edits.** Additive only. Every new prop defaults to Property's exact
current behaviour. Record the prop in playbook section 8 item 11 in the SAME commit, so the
next port inherits it instead of inventing a rival with a different name. Check
`git log --oneline -5 -- packages/web-shared/` before you touch it, because another port
may have just changed it.

**Known kit gaps, do not rediscover these:**
- `design/blog/BlogCategoryHub.tsx` defaults Property's `proofPoints` and standfirst.
- `design/chrome/SiteFooter.tsx` defaults `resourcesHref` to Property's `/landlord-tax`,
  which renders an empty Resources column on any other site, and its default Company column
  includes `/book`.
- `design/marketing/ProblemStatement.tsx` and `ComparisonTable.tsx` hardcode Property's
  copy with no copy props. Mirror them locally; do not edit the kit to fix it.
- The kit drawer has no secondary-link slot.
- `design/primitives/FaqSection.tsx` is a Radix collapsible whose closed answers are NOT in
  the server HTML, and it renders answers as escaped text. See section 4.
- `design/blog/HubArticleList.tsx:85` hardcodes Property's NESTED blog href
  (``/blog/${post.categorySlug ?? categorySlug}/${post.slug}``), and `BlogCategoryHub` mounts
  it internally with no override, no render slot and no opt-out. `BlogListWithSearch` has the
  same href and additionally `slice()`s off-page cards out of the server HTML.

**2026-09-11, Medical phase 3. The kit's BLOG components are unusable on a FLAT-URL site, and
the failure mode is a dead link on every hub.** On Medical `/blog/<category>/<slug>` returns
404 and `/blog/<slug>` returns 200, so adopting `BlogCategoryHub` as the disposition instructed
would have published every hub article link dead. Three agents hit it independently, and
`construction-cis`, the estate's other flat site, had already reached the same conclusion and
points its shared crawl-path guard at its own local list. Medical mirrors the kit markup
locally with flat hrefs; the cost is eight similar hub layouts instead of eight data files, and
no pagination control on the hubs.
Deriving command: `grep -n "href={\`/blog" packages/web-shared/design/blog/*.tsx`, then
`curl -s -o /dev/null -w "%{http_code}" <base>/blog/<category>/<slug>`.
RULE: before adopting any kit component that BUILDS a URL, check whether it builds YOUR site's
URL shape. The additive fix, deferred not dropped, is an `href`/`hrefFor` override prop on
`HubArticleList`; the first flat site that needs pagination should add it rather than fork
again.

---

## 3. Dependencies and the build

**2026-09-10, Solicitors, twice in one phase.** `tw-animate-css` and then `lucide-react`
both resolved only because sibling sites had hoisted them to the root `node_modules`. Each
built locally and would have failed on a clean install. This is the shape that made the
estate undeployable for nine days.
Deriving command: `python scripts/check_dependency_closure.py`
RULE: the closure check belongs in EVERY builder brief's acceptance tests, not only the
pre-deploy gate. A new import gets its declaration in the same commit. Playbook trap T24.

**2026-09-11, Solicitors phase 4. TWO ROUTES CAN CLAIM ONE URL, and the build is a coin
toss.** `/calculators/law-firm-sale-cgt` has a bespoke page AND was still emitted by the
generic `[slug]` route's `generateStaticParams`, because its config is `kind: "generic"`. Both
prerender to the SAME file, `.next/server/app/calculators/law-firm-sale-cgt.html`, and
whichever renders last wins. The generic render has no `dataCta`, so the page silently lost
`data-cta="see_result"`, a LIVE id with 73 recorded events, while the bespoke source was
correct all along.
Why it is nasty: it is NON-DETERMINISTIC. One build showed the bespoke render with the id
present, the next showed the generic one without it, with no source change in between, which
sent me hunting a stale cache that was not the cause. Its baseline floor was 3 and the page
still emitted 3, so every per-route gate stayed green. It surfaced ONLY as a one-unit drop in
the sweep's TOTAL data-cta count.
Deriving commands, in order:
`grep -c "<a section only the bespoke page has>" .next/server/app/<route>.html` -> 0 means the
generic route won.
`grep -n "kind:" src/lib/tools/configs/<slug>.ts` -> `generic` while a static page exists.
RULE: any site with BOTH a `[slug]` catch-all and static sibling pages must exclude the static
slugs from `generateStaticParams`, and needs a guard test asserting it. Solicitors now has
`src/tests/calculator-route-collision.test.ts`, which also asserts the exclusion list equals
the on-disk directories, so the next bespoke page cannot reintroduce it.
COROLLARY for the CTA gate: a per-route floor cannot see this class at all. Diff the TOTAL as
well as the per-route counts, and when the total moves, find the route before moving on.

**2026-09-11, Solicitors phase 4. A NEWER BUILD_ID does not mean a fresh artefact: Next's
incremental cache served a stale prerender.** Playbook trap T2 says to check `BUILD_ID` mtime
against the newest source file before trusting a build. That check PASSED here and the build
was still wrong: `/calculators/law-firm-sale-cgt` rendered the generic gate wording and had
LOST `data-cta="see_result"`, a live id with 73 recorded events, even though the source passed
its own label and id correctly. It looked exactly like a builder regression and was not.
How it surfaced: the sweep's total `data-cta` count fell by one while NO route fell below its
baseline, so the gate stayed green. Diffing my own two sweep runs found the single route.
Deriving command, which is the point of the note:
`grep -o "<a string you changed in this build>" .next/server/app/<route>.html`
`rm -rf .next/cache && npx next build` then re-grep; the string appeared.
RULE: T2's mtime check is necessary and NOT sufficient. Prove the ARTEFACT contains a string
you changed in this build, not merely that the build is younger than the source. When a
rendered page contradicts source you have just read, suspect the cache before the builder.

**A real build is part of verification, not an optional extra.** `tsc` and the test suite
both pass a server/client boundary error; only a production build catches it.

---

## 4. Things that differ per site, so never assume

**Check, do not inherit, the previous port's premise.** Each of these was found by an agent
told to correct the brief if its premise was false. All were correct to push back.

| Assumption from an earlier port | What was actually true |
|---|---|
| The site has a `firstSentence` excerpt helper | Solicitors has none. Every excerpt is frontmatter `summary`. Guard the real mechanism. |
| Premium calculators are routes and belong in the nav | Solicitors' 5 premium tools have NO routes. Listing them would emit 5 dead links. |
| The pound sign is stored as a unicode escape | True on generalist's location data, FALSE on Solicitors, where it is literal. Check the representation before searching for the symbol. |
| The kit's FAQ component is a safe adoption | On generalist yes; on Solicitors it would have STRIPPED answer text from 196 posts, because that site already renders answers in a plain list that IS in the server HTML, and 7 of 1,245 answers contain real HTML the kit would escape. |
| The site's own STATE.md counts are current | Solicitors' said 149 posts and 6 guides; disk had 196 and 10. Re-measure every number you use. |


**2026-09-11, Solicitors phase 2, five more of the same shape.** Every agent corrected the
brief again; the corrections changed the build each time.

| Assumption carried into the phase | What was actually true |
|---|---|
| The site has four turnaround promises, all on `/contact` | Eleven across ten files, including the homepage closing ask, both calculator result panels, the support widget and a support FAQ whose QUESTION was "How quickly will a specialist reply?" so the answer could not be de-timed in place. Sweep by rule, site-wide, before a phase touches those files. |
| The dead blog links live in `content/blog/` | Nine dead URLs over ten occurrences, and six of the seven two-segment ones were in a SOLICITOR GUIDE, not the blog. Resolve every href in `content/` against real frontmatter, not against the directory you expect. |
| `/blog` renders its category list twice | It does not. The local list component accepted `categories` and `activeCategory` and never read either, exactly like the kit copy it was extracted from. Read the component body before reporting a duplicate. |
| The local `BlogListWithSearch` must be kept because the kit copy ignores the category props | Both ignore them, and the two are feature-identical (same search, sort, pagination, read-time props). The local copy was deleted and both consumers repointed at the kit. Compare before you fork. |
| Three renderer features are load-bearing (hero image, photo credit, updated date) | All 196 posts have `image: ""`, none has `imageCredit` and none has `updatedDate`. The branches are correct and inert. Deleting the photographic hero removed nothing a reader could see. |

**The lesson under all five:** the previous port's blueprint is a starting hypothesis, not
a specification. Phase 0 re-derives.


**2026-09-11, Trade. Six more "assumed from a previous port" premises that were false here.**
Every one was caught by an agent told to contradict the brief, and every one was right.

| assumption carried in | what was actually true on Trade |
|---|---|
| `StatsCounter` SSRs a fraction of its value (generalist) | Trade renders the kit `StatsBar`, a 27-line pure server component printing a literal string. No counter, no animation, defect structurally impossible. Do not "fix" it. |
| research charts collapse the a11y subtree via `role="img"` (generalist) | Trade's 4 research pages are recharts with NO `role="img"` and NO `aria-hidden` wrapper. The defect that DOES exist is `PremiumBarChart.tsx`, byte-identical on Trade and Medical. |
| anchors site-wide lack a scroll offset (Solicitors: 428 across 80 routes) | 31 unoffset targets across 10 routes; `scroll-mt-24` is already on the research pages, `/services`, `/calculators/[slug]` and the shared blog chrome. A separate and real defect: `#main` has `scroll-margin-top: 0px` on every route. |
| the pound sign is stored as an entity or an escape (generalist) | Literal UTF-8 on this site, 112 files, zero `&pound;` and zero `\u00a3`. The representation that DOES hide money here is `ExcelPreview.tsx` writing ASCII `GBP 1,908.20` on 11 lines, invisible to any pound-sign grep. |
| premium calculators have no routes, so listing them emits dead links (Solicitors) | All 12 registry tools return 200; `BESPOKE` is genuinely empty. `PremiumCalculator` IS reachable, but only from the blog renderer, desktop-only and client-only. Tested, not assumed. |
| `ServiceTiers` is a dead component, do not scaffold it (rollout doc section 302) | The SHARED component is live on 16 sites including this one. Only PROPERTY'S LOCAL copy is dead, which is what the doc means at its line 147 and contradicts at line 302. |

RULE unchanged, now with eleven instances behind it: the previous port's blueprint is a
hypothesis. Phase 0 re-derives. An agent that never contradicts the brief is not reading it.


**2026-09-11, Medical. The biggest find of that port, and it is a site-level CSS hazard the
kit chrome silently assumes away: an UNLAYERED element rule beats every Tailwind utility.**
`Medical/web/src/app/globals.css` carried `a { color: var(--navy) }` outside any CSS layer.
Tailwind v4 emits every utility into a layer, and an unlayered rule wins over a layered one
whatever the specificity, so that one declaration beat `text-slate-300`, `text-white` and
every other colour utility on every `<a>` on the site. Two visible consequences: the footer's
navy-on-navy links at ratio 1.00, which had been mis-filed for a phase as a footer defect,
and the header's primary CTA label painted navy on the copper ground at 3.49. Moving the
block inside `@layer base` fixed both. **Property carries no bare `a` rule at all, which is
exactly why the kit chrome is written assuming the utility wins.**
Deriving command, run it in Phase 0 on any site:
`grep -nE "^[a-zA-Z][^{]*\{" <site>/web/src/app/globals.css` lists every unlayered element
rule. Unlayered CLASS rules (Medical has `.hero-brand`) carry the same hazard and that regex
does catch them.
Also worth knowing: the hazard is not only colour. Medical's unlayered
`input, textarea, select` sets `border-radius: 8px`, so it silently beats the radius system
the token phase had just shipped.
RULE: audit `globals.css` for unlayered rules BEFORE blaming a ported component for a
contrast or radius defect, and before patching the component. The fix is one `@layer base`
wrapper, and patching the symptom leaves every other `<a>` on the site still wrong.

**2026-09-11, Medical. Fixing that layer bug UNCOVERS defects it was hiding, including a
legal one.** The consent notice's "Privacy Policy" link in the shared
`packages/web-shared/leads/MiniCapture.tsx`, i.e. the required data-sharing disclosure, had
been readable only because the bug forced it navy. With the bug gone it rendered the brand
copper `#b87333` at 3.79 on white, under the 4.5 floor, on 98 of 138 routes. The featured
tier CTA in the shared `ServiceTiers`, the site's primary conversion button, went from
navy-on-copper to white-on-copper at the same 3.79. Neither was caught by an instrument;
three adversarial reviews caught them.
RULE: after removing a global colour override, re-measure every surface that was inheriting
it, shared kit components first. And the general rule both fixes encode: **a mid-tone brand
hex can clear the 3:1 graphics floor and fail the 4.5:1 text floor, so one brand token
cannot serve graphic, text-on-white and ground-under-white-text roles at once.** Medical
mints `--brand-primary-text` and `--brand-primary-ground` for the other two roles; see
playbook section 8 item 11.

**2026-09-11, Medical phase 3. The second half of the same lesson: a base element rule also
beats an INHERITED value.** Phase 2 moved Medical's bare `a { color: var(--navy) }` into
`@layer base`, which is correct and fixed the footer. Phase 3 then found that an anchor with no
colour utility of its own still renders navy no matter what colour its parent sets, because a
base element rule is still a declaration and inheritance is not. That put the `/blog` hero
breadcrumb at ratio 1.04, navy on navy, on a component that looked correct in source because the
parent was `text-white`.
Deriving command, unchanged from the phase-2 entry:
`grep -nE "^[a-zA-Z][^{]*\{" <site>/web/src/app/globals.css`.
RULE: fix it at the COMPONENT. Give the link its own colour class per variant and never rely on
inheritance to colour an anchor. Layering the rule makes utilities win; it does not make
inheritance win.

**2026-09-11, Medical phase 3. Two viewport clamps in one column is worse than either alone, and
both wrong answers look right in source.** The article sidebar holds a CTA card and a table of
contents. Nest a sticky max-height wrapper around a component that already clamps itself and you
get a scroll box inside a shorter scroll box, two scrollbars, and the inner `sticky` sticking to
the wrapper rather than to the viewport. Remove the OUTER clamp instead and the sticky element's
containing block becomes a short static div, so it sticks for a couple of hundred pixels and
scrolls away: measured at 1440x900 on a 24,594px article, 440px of the contents list sat below
the fold with nothing able to scroll to it. The arrangement that works is ONE clamp, on the
element that is a direct child of the tall column, with the inner component's own clamp switched
off (Medical passes `stickyDesktop={false}`).
Deriving method: scroll 6,000px, then read the sticky element's `getBoundingClientRect()` and
count scroll containers in the column. Medical's passing read is top 96, bottom 884 in a 900px
viewport, one scroll container.
RULE: measure the sticky element's bounding rect after scrolling. Reading the classes proves
nothing here, because both broken arrangements read as correct.

**2026-09-11, Trade. Third instance of the unlayered-beats-utility trap in one file, and the first
fix made it worse.** `construction-cis/web/src/app/globals.css:209-225` carries the whole incident in
its comment. `.eyebrow` was declared unlayered, so its `color` silently beat `text-orange-400` on its
own consumers (`/about` and `/contact`, both `className="eyebrow text-orange-400"` on
`bg-neutral-900`), which had correctly chosen the on-dark step. A first fix pass recoloured the
unlayered rule toward the light-ground reading, which fixes the one white consumer and regresses both
dark ones. The correct fix was to move the rule into `@layer components` so a consumer utility wins:
`#fb923c` on `#262626` = 6.69, and the light-ground consumer passes on the default at 5.18. Instance
two is the heading `line-height` rule in the same file, deliberately unlayered on the same mechanism
and documented as such.
RULE: before changing a colour on a shared class, enumerate its consumers and check what ground each
sits on AND whether any already declares its own utility. A class whose consumers disagree about
ground needs a layer, not a different hex. And the blast radius of moving a rule into a layer is
every utility it was beating, not the one you meant: list what is inside the block afterwards with
`awk '/^@layer components/,/^}$/' <file> | grep -E '^\s+\.'` (on Trade, exactly one selector).
PROMOTED: now playbook trap T30. Kept here for the three instances and the first-fix regression.

---

## 5. Instruments, and where they lie to you

**2026-09-10. `browser_check.mjs` cannot resolve `var()` colours.** On a site themed through
`text-[var(--primary)]` arbitrary values it reported 1,644 contrast findings, including
ratio 1.00 white-on-white, for combinations that actually measure 5.84:1 and pass. It falls
back to white when the chain does not resolve.
RULE: on a variable-themed site the contrast half of the browser baseline is unusable until
the port replaces those values with real ramp classes. The overflow and anchor halves are
sound. Hand-compute contrast instead, self-testing against slate-500 on white = 4.76 and
slate-400 on white = 2.56. Re-capture the baseline after phase 1. Playbook trap T25.

**2026-09-10. The sweep's dash count and a raw grep are different metrics.** `sweep.mjs`
counts dashes in visible body text after stripping scripts. A raw byte count of the same
page disagrees (script payloads), and a raw count of the source tree disagrees again (code
comments, which the rule exempts). On Solicitors these were 330, 11 on one page, and 393.
RULE: state which metric you mean, every time. And note the uncaught class: an em-dash in a
`metaTitle` or `metaDescription` never reaches body text but does reach users in search
results, so sweep frontmatter separately.

**2026-09-10. Default `--sample=30` measures a tenth of the corpus.** The baseline sweep
samples 30 articles unless told otherwise. A floor built from a sample cannot prove no harm
on the other 166 pages.
RULE: pass `--sample=9999` for a baseline.

**2026-09-11, Solicitors phase 2. A "before" server built from a stale worktree lies, and it
lies quietly.** Trap T22 needs the FULL `data-cta` attribute set diffed against the pre-port
page, but `link_baseline.json` stores only per-route CTA COUNTS, so the baseline alone cannot
catch a flipped placement or goal. The fix is to stand up the production SHA on a second port
and diff the rendered triples. That worked, and it also produced a false alarm: one calculator
route appeared to have newly hidden its result behind a gate. It had not. The worktree at
`C:/port-base` was serving a `.next` built before a July commit, so the component was not in
its bundle at all, and the same server still served a copy string that had been removed hours
earlier.
Deriving command, the one that settles it in a second:
`curl -s http://localhost:<preport>/<route> | grep -c "<a string you changed today>"`
A non-zero count means the "before" server is older than you think. Also compare the served
route's bundle for a symbol you know exists in the current source.
RULE: before trusting a pre-port server, prove its age with a string whose commit date you
know. A stale artefact is worse than no baseline, because it produces a confident wrong diff.
Rebuild it, or kill it so nobody quotes it.

**2026-09-11, Solicitors. `curl` without `-L` makes a component look like it never renders.**
`/blog/<slug>` 301s to the category-nested URL and returns a 62-byte body. A reviewer checking
"does the table of contents render" against that body concludes it does not.
RULE: `curl -L` on any route family that carries a redirect, and check the byte count before
you conclude anything from an empty grep.

**2026-09-11, Solicitors. Check the VALUE, not the presence of the key.** A phase-0 pass
reported that 181 of 196 posts carry BOTH a `schema` and a `faqs` frontmatter block, and
concluded the renderer's `post.schema?.trim() ||` bypass fired on 181 pages and that the
nested `FAQPage` was dead code. Every one of those 181 values is the EMPTY STRING
(`127 schema: ""`, `54 schema: ''`), so the bypass never fires and the schema is live on all
196. Acting on the first reading would have emitted a SECOND `FAQPage` on every post.
Deriving command:
`grep -h '^schema:' content/blog/*.md | grep -vE '^schema: *(""|'"''"'| *)$' | wc -l` -> 0
RULE: `grep -l 'key:'` proves a key exists, never that it holds anything. Print the values.

**THE BIG ONE, three times in one session: the instrument measured the wrong site.**
`next start` failed to bind because another session held the port, the error went to a log
nobody read, and the sweep crawled whatever WAS on that port and wrote a baseline from it.
Twice it was Medical, once generalist. Caught only by asserting the served page title.
RULE: read the bound port out of the server log and assert the title before trusting any
crawl. Playbook section 13.


**2026-09-11, Trade. T25 does NOT reproduce everywhere: `browser_check.mjs` resolved every
colour on this site.** 0 unparseable colours, self-test OK, and it independently reproduced the
hand-computed figures: 2.89 for the rendered button against a hand-computed 2.80 for the orange
ground, 2.80 for the orange tick, 3.58 and 3.43 for article links, 2.47 against a hand-computed
2.42 for the footer fine print. Trade themes through named Tailwind utilities and `oklch()`
literals rather than `text-[var(--x)]` arbitrary values, which is the case the instrument
actually chokes on.
RULE: T25 is conditional on HOW a site is themed, not on whether it uses variables. Run the
instrument, read its self-test line and its `unparseable colour(s)` count, and decide from those
two numbers. Two independent methods agreeing is worth far more than either alone, and it is
cheap: hand-compute the handful of load-bearing ratios anyway and use the agreement as the check.

**2026-09-11, Trade. Git Bash silently turned the instruments' route arguments into Windows
paths.** `node browser_check.mjs ... / /contact` ran against `C:/Program Files/Git/` and
`C:/Program Files/Git/contact`, producing `Protocol error (Page.navigate): Cannot navigate to
invalid URL` on every route and then `INSTRUMENT SELF-TEST FAILED: null`, which looks exactly
like a broken instrument rather than a mangled argument. MSYS path conversion rewrites any
argument that starts with `/`.
RULE: on Windows, prefix the command with `MSYS_NO_PATHCONV=1` and quote routes as `"//"` and
`"//contact"`. And read a self-test failure of `null` as "the instrument never got to run",
not as "the maths is wrong".

**2026-09-11, Trade. The sweep's dash count includes EN-dashes, so the acceptance target is not
always zero.** `sweep.mjs:72` matches em AND en dashes. Trade's 36 are 34 em plus 2 en, and both
en-dashes are legitimate numeric ranges in money figures that the site's own defect catalogue
protects. A builder told to "get the dash count to 0" would have corrupted two correct figures.
RULE: when you hand a builder a dash target, derive it from the protected set, state the target
as a number with its justification, and name which of the four metrics you mean: raw source,
user-facing source, rendered body, or sweep. On Trade those were 39, 35, 34 and 36.

**2026-09-11, Trade. A baseline without `--sha` is refused, and it tells you so.** `sweep.mjs`
prints `WARNING: no --sha given. Section 4.7 requires the baseline to embed the production SHA
and its deriving command; a baseline without them is invalid for link-floor purposes` and still
writes the file.
RULE: pass `--sha=<production sha>`. The warning is easy to scroll past, and the artefact it
leaves behind looks complete.

**2026-09-11, Medical. The committed instruments live at `docs/_engines/instruments/`, NOT in
`scripts/`, and a builder who cannot find them will write their own.** That is what happened:
a private crawler produced 5,786 links and a 122/52 dash pair against the committed
instrument's 5,234 and 59, and those numbers went into a phase report nobody could reproduce.
A reviewer caught it.
Deriving command: `ls docs/_engines/instruments/` (`sweep.mjs`, `browser_check.mjs`).
RULE: use the committed instrument, pass your own `--out` so you do not clobber a sibling
port's artefact, and never report a link, CTA or dash number from a hand-rolled crawler. If
an instrument seems to be missing, look in `docs/_engines/` before writing one.

**2026-09-11, Medical. Confirmation of the Trade MSYS finding, on a second site and a second
instrument.** Under git-bash on Windows, any argument beginning with `/` is rewritten into a
Windows path, so `browser_check.mjs / /services` silently crawls `C:/Program Files/Git/` and
`C:/Program Files/Git/services` and fails every navigation.
RULE unchanged and now twice-observed: prefix with `MSYS_NO_PATHCONV=1`.

**2026-09-11, Medical. A backgrounded `next start` can bind the port while the harness reports
the command as FAILED.** A later start then fails with EADDRINUSE against your own orphan,
which reads as another port's server holding the port.
Deriving and clearing commands: `netstat -ano | grep ":<PORT> "` for the PID, then
`taskkill //PID <pid> //F`, then re-check the port is free BEFORE starting again.
RULE: a failed-looking start is not proof that nothing is listening. Check the port, not the
exit code. This sits alongside the `pkill -f` note: on Windows neither the harness's exit
status nor `pkill` tells you the truth about a `next start`.

**2026-09-11, Medical. A contrast instrument that cannot resolve `oklch()` reports garbage,
and the committed one tells you whether it can.** It self-tests and prints the result
(slate-500 on white 4.76, slate-400 on white 2.56).
RULE: read the self-test line before quoting any ratio. If you write any colour check
yourself, convert by drawing the colour on a canvas and reading the pixel back, and self-test
against those two known values.

**2026-09-11, Medical. Never re-edit a `niche.config.json` by parsing and re-dumping the
JSON.** A round-trip rewrites every escaped character in the file: a pound sign stored as
`\u00c2\u00a3` comes back as mojibake, and a 36-line deletion showed up in the diff as 77
insertions and 55 deletions, which is unreviewable and hides whatever else changed.
RULE: edit the lines in place. The same applies to any hand-authored JSON in this repo.

**2026-09-11, Trade. Every DESIGN_DELTA in this programme computes contrast from Tailwind v3 hex
constants, and Tailwind v4 does not emit those colours.** v4 ships its ramps as `oklch()`
(`node_modules/tailwindcss/theme.css:26-29`), which resolves to materially different sRGB:
`orange-400` renders `#ff8904` not `#fb923c`, 69 summed RGB units of drift, and 500 and 600 drift 38
each. Across Trade's 17 binding contrast rows, 10 drifted, by at most 0.38, and **no verdict
changed**: every pass stayed a pass, every fail stayed a fail
(`docs/construction-cis/DESIGN_DELTA.md:136-151`). A precision problem, not a decision problem, but
that table is what five later phases measure against.
The sharp half: **a ramp UTILITY and a CSS custom property do not render the same colour.**
`bg-orange-500` renders the oklch value (`#ff6900`, 2.89 on white); `--accent: #f97316` renders the
literal hex (2.80). That is what reconciled an apparent disagreement between two instruments on this
port, where the hand computation said 2.80 and `browser_check.mjs` said 2.89 and both were right
about different subjects. Trade's pre-port button was the utility
(`git show HEAD~1:construction-cis/web/src/components/ui/layout-utils.ts`, `btnPrimary`,
`bg-orange-500`); the ported button is `bg-[var(--btn-ground)]`.
RULE: label every contrast row by SOURCE, utility or token. Measure a utility from the rendered DOM
or by converting the emitted `oklch()`, never from a v3 hex table, and self-test any converter
against a canvas read out of the running build.
PROMOTED: now playbook trap T28. Kept here for the drift figures and the two-instrument reconciliation.

**2026-09-11, Trade. A long `browser_check.mjs` run looks dead while it is working, and concluding
it died costs you the baseline.** It shows no browser process between page batches and buffers its
log, so one `ps` sample plus an empty log tail reads as a corpse. The manager read it that way,
started a second run, and two concurrent runs write the same `--baseline` path, which is the
collision the instrument's own docstring warns about (`browser_check.mjs:56`, `:91`, `:497`).
RULE: check for the OUTPUT FILE, not the process, and never start a second `--save-baseline` run.
Pass your own `--out` and `--baseline`.

**2026-09-11, Trade. Traps are numbered in the PLAYBOOK, and the rollout doc has a rival numbering
that does not mean the same thing.** A re-review reported "trap 27 does not exist" after checking
`PROPERTY_STANDARD_ROLLOUT.md`, whose section 7 carries its OWN incident list numbered 1 to 15. T27
is real and lives at `docs/_engines/DESIGN_PORT_PLAYBOOK.md:738`.
RULE: "T<n>" means the playbook, section 6 (T1-T21) and section 14 (T22-T27). Cite it with a line
number; an absence in the rollout doc proves nothing.
`grep -nE '^\*\*T[0-9]+\.' docs/_engines/DESIGN_PORT_PLAYBOOK.md` lists every one.

**2026-09-11, Medical phase 3. The instrument can be the thing that is wrong. Twice in one
phase.** A brief told a builder to count nested blog URLs with `grep -c '/.*/.*'`, which matches
flat hrefs too and therefore reported "everything is nested"; the builder re-derived it correctly
and got zero. Separately, the committed sweep counts `data-cta` OCCURRENCES per route and
compares with `<` only, so it cannot see an id, a placement or a goal whose VALUE changed, nor a
swap of one id for another.
Deriving command that closes the second one: `git diff -U0 | grep -E '^[+-].*data-cta'`.
RULE: a number that confirms the brief is the one to re-derive by a second method. And never let
"0 data-cta regressions" stand as proof of attribute continuity; it is a count, not a diff.

**2026-09-11, Medical phase 3. A guard test that checks the DATA and not the WIRING guards the
wrong half.** `src/tests/blog-cta.test.ts` proved `CTA_BY_CATEGORY` had all eight keys and no
orphans. It asserted nothing about consumption, so if the renderer stopped calling
`blogCtaFor()` every article would have fallen back to generic copy with every test still green,
which is exactly the Property incident the test was written for.
RULE: a guard test for a lookup table must assert at SOURCE level that each consumer imports and
calls the accessor. Derive the consumer list from the map itself, so a ninth category is covered
automatically rather than needing the test edited.

**2026-09-11, Trade phases 3 and 4. A guard that reads one file while the defect lives in
another.** `src/tests/design/penalty-figures.test.ts` was written in Phase 3 specifically to stop
two wrong tax figures coming back. It pinned a single data file. It stayed green while the same
figures shipped on 45 pages from a different file (`src/data/trade-types.ts`, which renders every
`/for/[slug]` route). The test was not wrong about its file; it was wrong about its corpus.
Deriving command: `git log -1 --format=%B 72fe3261`, and the rewritten guard is the file itself,
which now enumerates every `.ts`/`.tsx` under `src/` except tests, every `.md` under `content/`,
plus `niche.config.json`.
RULE: a guard against a CONTENT rule enumerates its corpus PROGRAMMATICALLY, never from a path
list, so a new page or data file is covered the day it is added. And it carries a
guards-the-guard assertion (`penalty-figures.test.ts:133-138`: corpus length, plus four known
strings that must be found) so a broken walk fails loudly instead of passing empty. An empty
corpus passes every assertion in the file.
PROMOTED: now playbook trap T33. Kept here for the 45-page corpus miss that exposed it.

**2026-09-11, Trade phases 3 and 4. A guard whose verdict depends on prose layout.** The same
guard windowed each match with a fixed +/-110 character pad. An identical wrong clause therefore
PASSED when its qualifying sentence happened to fall within 110 characters and FAILED when an
editor pushed it beyond. Two pages with the same defect got opposite verdicts, and neither verdict
was about the defect. File:line: `penalty-figures.test.ts:20-24` documents it; `sentenceAt()` at
`:71` is the replacement.
RULE: window a text guard to the containing SENTENCE or BLOCK, never to a character count. Split
on sentence and block boundaries and treat a match that straddles one as no match.

**2026-09-11, Trade phase 3. An acceptance test that is unsatisfiable on arrival gets quietly
substituted.** Every Phase 3 work package carried the acceptance line `totalDashes == 2`
(`docs/construction-cis/_port/PHASE3_PLAN.md:241`). All 36 dashes on the site sat on 6 calculator
pages, and the same plan scopes Phase 3 to `/for`, `/locations`, `/glossary` and `/resources` and
names the calculators as Phase 4's. No Phase 3 package could move the number. In practice it was
replaced with a no-regression assertion, silently, and the real move to 2 happened in Phase 4.
RULE: derive every acceptance number from the phase's OWN scope before you write it down. If the
phase cannot satisfy it, the number belongs to a different phase. A substituted acceptance test is
worse than a missing one, because the plan still reads as though it was met.
PROMOTED: now playbook trap T35. Kept here for the red-on-arrival-by-34 arithmetic.

---

## 5b. What the Solicitors port taught, in one block

**2026-09-11. A "no copy changes" rule does not only ban rewriting. Copy also arrives through a
component's DEFAULT PROPS.** Three builders were stopped from passing `LEAD_PROOF_POINTS`, then
`LeadCTAPanel` supplied its own `eyebrow` and `formTitle` and put new strings on three route
families anyway, and the homepage rendered one heading twice. RULE: on a site under a copy
freeze, pass EVERY visible prop explicitly from that route's own published strings, or suppress
it. Audit the component for defaults before adopting it.

**2026-09-11. sr-only text is published text.** Fixing three unreachable charts meant adding
column headers, invisible to sighted readers and fully indexable, on two indexed routes.
Challenged, the fixer found three of the four already appeared on the page as visible headers
or legend labels. RULE: accessibility text counts against a copy freeze; reuse an on-page
string before authoring one.

**2026-09-11. Adopting a component can destroy meaning while preserving words.** `/contact`'s
three numbered steps became three identical ticks. Every word survived; the ORDINAL did not, so
a sequence read as a set. A word-multiset diff passes this cleanly. RULE: diff GLYPHS and
semantics, not only words, and prefer `<ol>` where order is the point.

**2026-09-11. Sweep by RULE over the whole tree, never over the file list you were handed.**
Turnaround promises were declared closed three times and found live three times, the last on a
page nobody had listed. Our own published pricing was found on a comparison page that appears
in NO disposition slice, the same way. Both classes were only ever closed by a tree-wide
pattern sweep.

**2026-09-11. A per-route gate cannot see a route collision.** A page generated by BOTH a
bespoke route and a catch-all lost a live `data-cta` with 73 recorded events, non-deterministically,
while its per-route floor stayed green. It surfaced only as a ONE-UNIT drop in the site TOTAL.
RULE: diff totals as well as per-route counts, and when a total moves, find the route before
moving on.

## 6. What the ports keep finding that is not design work

Every port so far has spent roughly a third of its time on live defects nobody knew about.
Budget for it; do not treat it as scope creep, and record each one in the site's STATE.md
rather than quietly fixing it.

Recurring shapes, worth checking early on any site:

- **Our own pricing published**, against the standing rule. Solicitors had it in ~15 places
  including one fed to the homepage from a shared config file, invisible in the page source.
  Generalist had a cost band in a guide. Search by RULE, never by the pound symbol.
- **Unsourced statistics** presented as fact, absent from `house_positions.md`. Solicitors
  had two. One verified at source and was kept with a correction; the site had been
  publishing it without its denominator, which changed what it meant.
- **Turnaround promises** in capture copy, also banned. Solicitors had four on `/contact`,
  including in the metadata.
- **Compliance copy describing a different site.** Check every sentence against code that
  actually runs. Generalist named Google Analytics cookies on a site with no GA; Solicitors
  genuinely runs GA, so the SAME mirror operation has the opposite correct answer.
- **Dead internal links.** Solicitors had 10, plus a hub linked from 8 pages that had no
  route at all. Fix at the link or the target, never by deleting the link.
- **Accessibility defects that hide data**, such as a chart wrapper marked `aria-hidden` or
  `role="img"`, which removes every value from the accessibility tree.
- **Anchor targets with no scroll offset**, so every in-page jump hides its own heading
  under the sticky header. Solicitors: all 428 targets across 80 routes.


**2026-09-11, Trade. Two new recurring shapes, both found in Phase 0 and neither one design work.**

*A responsive breakpoint mismatch that makes navigation unreachable.* `SiteHeader.tsx:105` hides
the burger at `lg:hidden` while `:118` hides the drawer it opens at `md:hidden`. Between 768px and
1023px the burger renders and does nothing, so the site has no navigation at all on a tablet or a
large phone in landscape. Verified against the rendered DOM, not inferred.
RULE: diff the burger's breakpoint against its drawer's, and against the nav's and the primary
CTA's, as a single check. The header contract puts all four at `lg:` for exactly this reason, and
a one-token drift is invisible in source review and silent in every test.

*A paginated index that is not in the server HTML.* `/blog` carries 12 of 82 articles in its
rendered HTML because the list slices behind button pagination. This site's blog is 54% of its
traffic, so the highest-value family is 85% uncrawlable from its own index. Derive it with
`curl -s <base>/blog | grep -oE 'href="/blog/[a-z-]+/[a-z0-9-]+"' | sort -u | wc -l` against the
file count on disk.
RULE: for every index and hub, compare the count of article hrefs in SERVER HTML against the
corpus count. The link floor does not catch this, because the floor was captured from the same
broken page.

*And one correction to this section's own pricing guidance.* The rollout doc warns that Trade has
"128 amber/orange-6xx/7xx usages across 46 files; a reassignment is a sweep, price it." Re-measured
at 138 usages across 48 files, and on a broader regex including hex literals, 385 across 63. But
the count was measuring the BRAND doing brand work. Usages carrying genuine warning semantics:
ONE file, three lines. The ladder is net-new, and the sweep is nearly free.
RULE: when pricing a semantic-ramp reassignment, split the usage list into semantics, brand
furniture and exempt surfaces BEFORE quoting a cost. A raw colour-family count prices the wrong
thing by an order of magnitude, in both directions.

**2026-09-11, Trade. A blocking gate that names a check nobody can run decays into a deferral.** The
delta recorded a BLOCKING item requiring a "section-grounds scan" before the owner walk. No committed
instrument performed one: the scan behind the figure was a throwaway script that no longer existed.
Worse, it parsed colours textually, `oklch()` defeated it, and it scored every unresolved ground as
light, producing 102 breaching routes where the real figure is 79 and naming `/blog` and `/resources`
as in breach when neither is (`docs/construction-cis/DESIGN_DELTA.md:234-246`). Fixed by adding a
real `--grounds` mode to `docs/_engines/instruments/browser_check.mjs` (read the comment above
`const GROUNDS`, `:83-89`), which resolves colour through the browser and reproduces the corrected
finding: glossary and locations breach, blog and resources do not.
RULE: when you record a gate, name the committed command that satisfies it in the same edit. If that
command does not exist, building it is part of recording the gate. And never measure colour with a
parser while a browser is already open.
PROMOTED: now playbook trap T29. Kept here for the 102-against-79 miscount that exposed it.

**2026-09-11, Trade. An orchestrator keeping small work is how the manager's context goes.** The
manager did a contrast re-derivation, an instrument change and a set of document corrections inline,
because each one looked too small to delegate. Collectively they were not small, and the owner
corrected it.
RULE: the test is not "is this small enough to do myself", it is "is there a reason only the manager
can do this". The carve-outs are git, serialised builds, deploys, migrations, owner comms, and the
judgement at a gate. Everything else, audits and instrument work included, goes to an agent.

**2026-09-11, Medical. A 301'd slug whose file is still on disk is a listing defect nobody's gate
catches.** `sitemap.ts` had filtered `DUPLICATE_REDIRECTS` since commit `0abd26e7`, but the blog
index, the eight hubs and the related-articles rail had not. The incorporation hub therefore
rendered nine cards for eight destinations, and the sweep's dead-link check passed, because a 301
is not a dead link. One of Medical's sixteen redirected slugs has an `.md` on disk, so the fix cost
two internal links and one static page (163 to 162) and the route still 301s.
Deriving command: compare the redirect map against the corpus,
`grep -oE "'[a-z0-9-]+'" <site>/web/src/middleware.ts` against `ls <site>/web/content/blog/`.
RULE: filter the redirect map ONCE in `getAllPosts()` so every listing surface inherits it. Fixing
it per surface leaves the next new listing wrong, and no crawl-based instrument will tell you.

**2026-09-11, Trade phases 3 and 4. Ground truth that contradicts itself re-seeds the defect
forever.** The same CIS penalty error was corrected twice, in June and again in this port, and
returned twice. `docs/construction-cis/house_positions.md` carried corrected TABLES while both
"Practical writing rule for sessions" bullets underneath them still carried the OLD figures, and
the HP-LOCK header summary at `:11` carried them too. Those bullets and that header are the lines
a writing session actually follows; nobody writes a page off the table. All three now match their
own tables.
Deriving command: grep the ground-truth file for the retired figure itself, not for the sentence,
e.g. `grep -n '30%\|20% of the sums\|100%' docs/<site>/house_positions.md`.
RULE: when correcting a locked position, grep the WHOLE ground-truth file for the old figure and
fix every restatement in the same edit, headers and writing-rule summaries included. A corrected
table above an uncorrected bullet is not a correction, it is a slower re-seed.

**2026-09-11, Trade phases 3 and 4. A self-contradicting file defeats a text search.** The s.62B
error ("20% of the sums returned" where the statute charges the whole sum) was recorded as fixed by
a session in June. It was live. The definition SENTENCE had been corrected while the worked EXAMPLE
three lines below still calculated 20% of the figure, so a text search for the wrong wording found
nothing and the file disagreed with itself inside one section.
Deriving command: `git log -1 --format=%B 72fe3261`; the surviving guard is
`construction-cis/web/src/tests/design/penalty-figures.test.ts`.
RULE: when correcting a figure, search the same file for its ARITHMETIC as well as its words. A
worked example is a restatement of the rule in numbers, and it is the copy a reader trusts most.

**2026-09-11, Trade phase 4. A phase boundary is not a reason to leave a wrong published figure.**
The manager fenced one calculator file off from three separate sweeps because a later phase owned
it, having written himself that a phase boundary is no reason to leave a wrong tax figure
published. That fencing is the SOLE reason a director-penalty claim the ground truth bans in
capitals survived two passes and stayed live, in body copy AND in FAQPage structured data, where
Google could quote it. It was caught in Phase 4 only because Phase 4 finally owned the file.
Deriving command: `git log -1 --format=%B 72fe3261`, section "WHAT I GOT WRONG".
RULE: scope a CORRECTNESS sweep to the RULE and the WHOLE SITE, never to the phase's route list.
Phase ownership governs design work. It does not govern false statements, and a wrong figure does
not wait politely inside a file boundary.
PROMOTED: now playbook trap T34, which amends the playbook's own phase-ownership guidance.

---

## 7. Conversion evidence, for the sites that have not measured it yet

Solicitors, 18 days post bot-gate, against Property on the same window: 1.16 leads per
1,000 sessions against 9.85, an 8.5x gap. The leak was NOT traffic and NOT form starts
alone; it was start-to-complete, 4.5% against 17.8%. Blog articles produced 40 form starts
and zero completions.

RULE: pull the funnel per template family in Stage 0, post bot-gate only (the gate landed
2026-08-23 and figures spanning it are inflated). It tells you which phase of the port
actually matters for that site, and it is the number the owner will judge the port by.


**2026-09-11, Trade (construction-cis), 19 days post bot-gate, strict both-flags-clean.** 203
sessions, 3 leads in the site's ENTIRE history, first on 2026-08-17. 4.93 leads per 1,000 sessions
against Property's 10.80 in the same window. The leak is one stage earlier than Solicitors':
sessions to form-START, 0.99% against Property's 6.16%, a 6.2x gap. Start-to-complete is
unreadable at n=2, and quoting its nominal 50% would have been meaningless.

| family | sessions | form starts | completions |
|---|---:|---:|---:|
| blog article | 110 | 1 | **0** |
| CIS template pages | 27 | 0 | 0 |
| trade pages `/for/[slug]` (45 pages) | 24 | 0 | 0 |
| homepage | **4** | 0 | 0 |
| the three service pillars combined | **1** | 0 | 0 |

Two lessons worth more than the numbers.

*The homepage is not automatically the big phase.* The programme's phase map calls phase 5
(homepage, a 15-16 section rebuild) "the big one". On this site the homepage drew 4 sessions in 19
days and the three pillars drew 1 between them, while the blog drew 110. The rebuild still happens,
because the standard requires it and it is the brand's front door, but sizing review effort by the
phase map rather than by the site's own traffic would have spent the most expensive review on the
least-read page.
RULE: pull the per-family funnel in Phase 0 and let it set review depth and sequence within the
phase map, not the phase map's own ordering.

*"No capture on this family" is usually false, and the real defect is worse.* Phase 0 reported that
the template pages and the 45 trade pages had no ask at all. Both were wrong: `/cis-invoice-template`
carries a full `LeadForm`, and so does the `/for/[slug]` template. The actual defect is that both
hero CTAs leave the page, there is no `#book` anchor to scroll to, and the form sits below the FAQ.
That is one template edit, not new capture on 46 pages.
RULE: before concluding a family has no capture surface, grep the template for the form component
and curl one rendered page. Then ask the better question, which is whether anything on the page
points AT the form.

---

## 8. Concurrency incidents (the rule exists and was still broken)

**2026-09-11, Dentists. A sibling agent's repo-wide `git add` swept 28 Dentists files into a
commit titled "feat(generalist): high-street mechanic wave 5" (`f75438bf`).** The Dentists port
had staged its own paths explicitly, ran `git diff --cached --name-only` to confirm the set was
clean, and in the seconds between that check and `git commit` a sibling staged and committed the
whole tree. The port's phase 1 gap-fix is therefore committed under another site's message, with
no Dentists commit to find it by.

Nothing was lost and nothing was corrupted: `git diff HEAD -- Dentists/` was empty afterwards and
`git show f75438bf:<file>` confirmed every fix intact and byte-identical to the verified build.
The damage is purely to the audit trail, which is the thing a six-phase port depends on.

Deriving commands, run in this order, because the second is the one that tells you what happened:
```
git diff --cached --name-only | grep -v "^<Site>/"     # foreign paths in YOUR index
for sha in $(git log --format=%h -4); do \
  echo "$sha $(git show --name-only --format='' $sha | grep -c '^<Site>/')"; done
git status --porcelain <Site>/                          # empty = someone committed your work
```

Why the existing rule did not prevent it: §13 rule 1 binds the agent READING it. It cannot bind the
sibling that never read it, and staging is a whole-repository operation on a shared index, so one
agent's `git add -A` captures every other agent's uncommitted work regardless of how carefully they
staged. **An explicit-path discipline protects the repo from you; it does not protect you from the
repo.**

RULE, in three parts:
1. **Treat the index as shared, hostile state.** Stage and commit as ONE command
   (`git add <paths> && git commit`), never as two steps with a check in between. The gap between
   them is the whole vulnerability, and it is seconds wide.
2. **After every commit, verify what YOU actually committed**, not that a commit happened:
   `git show --name-only --format="" HEAD | grep -c "^<Site>/"`. A clean `git status` afterwards
   proves your files are committed; it does NOT prove they are in YOUR commit.
3. **Never fix this by rewriting history.** With four ports live in one tree, a rebase or amend
   destroys siblings' work to tidy your own log. Record where the work actually landed, in the
   site's STATE.md, and move on. A misleading commit message is cheap; a corrupted sibling is not.

Also seen the same session, and handled correctly: `.git/index.lock` held by a sibling's in-flight
commit. It cleared in 3 seconds. NEVER delete that file to get past it; it belongs to another
agent's running commit, and removing it corrupts theirs to unblock yours. Poll for it to clear.

---

## 9. Two ways a contrast audit lies to you (2026-09-11, Dentists)

Both found in one phase, both by builders correcting the manager, and both will bite any port
that themes through CSS variables. Neither is exotic; both produce a clean-looking audit over a
live failure.

**A. An ALIAS token hides from the grep everyone is using.** `globals.css` defines
`--accent-strong: var(--gold-strong)`. So `text-[var(--accent-strong)]` IS gold text, and the
audit grep the whole port had been running, `grep "text-\[var(--gold"`, returns ZERO for it.
Dentists carried **21 such usages** on `/about` and the legal pages, on light grounds at 3.76,
invisible to every gold count this port quoted, including the manager's.
Deriving commands, and note the second is the one that finds the truth:
```
grep -rn 'text-\[var(--gold'   <site>/web/src --include=*.tsx | wc -l   # the number everyone quoted
grep -nE '^\s*--[a-z-]+:\s*var\(--' <site>/web/src/app/globals.css      # every alias in the file
grep -rn 'text-\[var(--accent' <site>/web/src --include=*.tsx | wc -l   # what the alias hides
```
RULE: before auditing a token by name, **enumerate the aliases of that token first** and search
the alias set, not the name. This is playbook T6 (search by RULE, not by symptom) in its
cheapest form: the symptom is the token's name, the rule is "gold-valued text on a light
ground". Any count taken by the naive grep is a FLOOR and must be reported as one.

**B. Alpha defeats a contrast fix that measured correctly.** Twice in one phase, a colour was
swapped to a passing step and then rendered semi-transparent, which composites it back under
the floor:
- chart bars recoloured to `--gold-strong` for **3.32** on the panel, then drawn at
  `opacity={0.9}`, compositing to **2.89**;
- an audience-page stat label using `text-[var(--gold)]/90` on `--navy-soft`, **4.24**, where the
  solid colour measures 5.29 and the plan had classed it with the passing group.
RULE: measure the COMPOSITED pixel, not the token. Any `/NN` alpha suffix or `opacity=` on or
above the element invalidates the swatch figure, and a contrast table that lists a token without
its alpha is not evidence. This is the same family as measuring a button against its own label
instead of the ground it sits on, which is how this port shipped an invisible hero CTA.
